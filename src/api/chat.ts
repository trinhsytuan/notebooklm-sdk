import type { AuthTokens } from "../auth.js";
import type { RPCCore } from "../rpc/core.js";
import type { ChatGoalValue, ChatModeValue, ChatResponseLengthValue } from "../types/enums.js";
import { ChatGoal, ChatResponseLength, chatModeToParams, RPCMethod } from "../types/enums.js";
import { ChatError } from "../types/errors.js";
import type { AskResult, ChatReference, ConversationTurn } from "../types/models.js";

const QUERY_URL =
  "https://notebooklm.google.com/_/LabsTailwindUi/data/google.internal.labs.tailwind.orchestration.v1.LabsTailwindOrchestrationService/GenerateFreeFormStreamed";

const DEFAULT_BL = "boq_labs-tailwind-frontend_20260301.03_p0";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface AskOptions {
  conversationId?: string;
  sourceIds?: string[];
  onChunk?: (chunk: AskStreamChunk) => void | Promise<void>;
}

interface CachedTurn {
  query: string;
  answer: string;
  turnNumber: number;
}

export interface AskStreamChunk {
  /** Newly received answer text. Append this for simple typing UIs. */
  text: string;
  /** Full answer accumulated so far. Prefer this for exact UI snapshots. */
  answer: string;
  conversationId: string | null;
  references: ChatReference[];
  /** True when the server revised previous text instead of only appending. */
  isReplacement: boolean;
}

export type ChatStreamOptions = Omit<AskOptions, "onChunk">;

export type ChatStreamEvent =
  | ({ type: "text" } & AskStreamChunk)
  | { type: "done"; result: AskResult };

export class ChatAPI {
  private readonly conversationCache = new Map<string, CachedTurn[]>();
  private reqid = Math.floor(Math.random() * 900_000) + 100_000;

  constructor(
    private readonly rpc: RPCCore,
    private readonly auth: AuthTokens,
    private readonly refreshAuth?: () => Promise<void>,
  ) {}

  async ask(notebookId: string, query: string, opts: AskOptions = {}): Promise<AskResult> {
    const { onChunk, ...streamOpts } = opts;
    let result: AskResult | null = null;

    for await (const event of this.stream(notebookId, query, streamOpts)) {
      if (event.type === "text") {
        await onChunk?.({
          text: event.text,
          answer: event.answer,
          conversationId: event.conversationId,
          references: event.references,
          isReplacement: event.isReplacement,
        });
      } else {
        result = event.result;
      }
    }

    if (!result) throw new ChatError("Chat request completed without a result");
    return result;
  }

  async *stream(
    notebookId: string,
    query: string,
    opts: ChatStreamOptions = {},
  ): AsyncGenerator<ChatStreamEvent> {
    const sourceIds = opts.sourceIds ?? (await this.rpc.getSourceIds(notebookId));
    const isNew = !opts.conversationId;
    const conversationId = opts.conversationId ?? randomUUID();

    const history = isNew ? null : this._buildHistory(conversationId);
    // Sources are triple-nested: [[[sid]], [[sid]], ...]
    const sourcesArray = sourceIds.map((sid) => [[sid]]);

    const params = [
      sourcesArray,
      query,
      history,
      [2, null, [1], [1]],
      conversationId,
      null,
      null,
      notebookId,
      1,
    ];

    const paramsJson = JSON.stringify(params, null, 0);
    const fReq = JSON.stringify([null, paramsJson]);

    this.reqid += 100_000;
    const bl = (typeof process !== "undefined" && process.env["NOTEBOOKLM_BL"]) || DEFAULT_BL;

    const urlParams = new URLSearchParams({ bl, hl: "en", _reqid: String(this.reqid), rt: "c" });
    if (this.auth.sessionId) urlParams.set("f.sid", this.auth.sessionId);

    const bodyParts = [`f.req=${encodeURIComponent(fReq)}`];
    if (this.auth.csrfToken) bodyParts.push(`at=${encodeURIComponent(this.auth.csrfToken)}`);
    const body = bodyParts.join("&") + "&";

    const response = await this._postChatRequest(`${QUERY_URL}?${urlParams.toString()}`, body);

    const parser = new StreamingChatResponseParser();
    for await (const textChunk of readResponseText(response)) {
      for (const chunk of parser.feed(textChunk)) {
        yield { type: "text", ...chunk };
      }
    }

    for (const chunk of parser.finish()) {
      yield { type: "text", ...chunk };
    }

    const { answer, conversationId: serverConvId, references } = parser.result();

    const finalConvId = serverConvId ?? conversationId;
    const cached = this.conversationCache.get(finalConvId) ?? [];
    const turnNumber = cached.length + 1;
    cached.push({ query, answer, turnNumber });
    this.conversationCache.set(finalConvId, cached);

    yield {
      type: "done",
      result: { answer, conversationId: finalConvId, turnNumber, references },
    };
  }

  async getConversationTurns(
    notebookId: string,
    conversationId: string,
  ): Promise<ConversationTurn[]> {
    // params: [[], null, null, conversation_id, limit]
    const params = [[], null, null, conversationId, 100];
    const result = await this.rpc.call(RPCMethod.GET_CONVERSATION_TURNS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });

    if (!Array.isArray(result) || !Array.isArray(result[0])) return [];

    // API returns individual turns newest-first; reverse to chronological
    const rawTurns = [...(result[0] as unknown[])].reverse();
    const turns: ConversationTurn[] = [];

    let i = 0;
    while (i < rawTurns.length) {
      const turn = rawTurns[i];
      if (!Array.isArray(turn) || turn.length < 3) {
        i++;
        continue;
      }
      if (turn[2] === 1 && turn.length > 3) {
        const q = typeof turn[3] === "string" ? (turn[3] as string) : "";
        let a = "";
        const next = rawTurns[i + 1];
        if (Array.isArray(next) && next.length > 4 && next[2] === 2) {
          try {
            a = String(((next[4] as unknown[][])[0] as unknown[])[0] ?? "");
          } catch {
            /* ignore */
          }
          i++;
        }
        turns.push({ query: q, answer: a, turnNumber: turns.length + 1 });
      }
      i++;
    }
    return turns;
  }

  async getLastConversationId(notebookId: string): Promise<string | null> {
    // params: [[], null, notebook_id, 1]
    const params = [[], null, notebookId, 1];
    const result = await this.rpc.call(RPCMethod.GET_LAST_CONVERSATION_ID, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });
    // Response structure: [[[conv_id]]]
    if (!Array.isArray(result)) return null;
    for (const group of result as unknown[]) {
      if (!Array.isArray(group)) continue;
      for (const conv of group as unknown[]) {
        if (Array.isArray(conv) && typeof (conv as unknown[])[0] === "string") {
          return (conv as unknown[])[0] as string;
        }
      }
    }
    return null;
  }

  async getHistory(
    notebookId: string,
    limit = 100,
    conversationId?: string,
  ): Promise<Array<[string, string]>> {
    const convId = conversationId ?? (await this.getLastConversationId(notebookId));
    if (!convId) return [];

    const params = [[], null, null, convId, limit];
    const result = await this.rpc.call(RPCMethod.GET_CONVERSATION_TURNS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });

    if (!Array.isArray(result) || !Array.isArray(result[0])) return [];

    const rawTurns = [...(result[0] as unknown[])].reverse();
    const history: Array<[string, string]> = [];

    let i = 0;
    while (i < rawTurns.length) {
      const turn = rawTurns[i];
      if (!Array.isArray(turn) || turn.length < 3) {
        i++;
        continue;
      }
      if (turn[2] === 1 && turn.length > 3) {
        const query = typeof turn[3] === "string" ? (turn[3] as string) : "";
        let answer = "";
        const next = rawTurns[i + 1];
        if (Array.isArray(next) && next.length > 4 && next[2] === 2) {
          try {
            answer = String(((next[4] as unknown[][])[0] as unknown[])[0] ?? "");
          } catch {
            /* ignore */
          }
          i++;
        }
        history.push([query, answer]);
      }
      i++;
    }

    return history;
  }

  /**
   * Low-level chat configuration. Set goal, response length, and optional
   * custom instructions directly. Persists on the server per notebook.
   * Use `setMode()` for preset combinations instead.
   */
  async configure(
    notebookId: string,
    goal: ChatGoalValue = ChatGoal.DEFAULT,
    length: ChatResponseLengthValue = ChatResponseLength.DEFAULT,
    customPrompt?: string,
  ): Promise<void> {
    if (goal === ChatGoal.CUSTOM && !customPrompt) {
      throw new Error("customPrompt is required when goal is ChatGoal.CUSTOM");
    }
    const goalArray = goal === ChatGoal.CUSTOM ? [goal, customPrompt] : [goal];
    const chatSettings = [goalArray, [length]];
    const params = [notebookId, [[null, null, null, null, null, null, null, chatSettings]]];
    await this.rpc.call(RPCMethod.RENAME_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });
  }

  /**
   * Set the chat mode for a notebook. Persists on the server — affects all
   * subsequent `ask()` calls until changed.
   */
  async setMode(notebookId: string, mode: ChatModeValue): Promise<void> {
    const [goal, length] = chatModeToParams(mode);
    const chatSettings = [[goal], [length]];
    const params = [notebookId, [[null, null, null, null, null, null, null, chatSettings]]];
    await this.rpc.call(RPCMethod.RENAME_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });
  }

  clearCache(conversationId?: string): void {
    if (conversationId) {
      this.conversationCache.delete(conversationId);
    } else {
      this.conversationCache.clear();
    }
  }

  getCachedTurns(conversationId: string): ConversationTurn[] {
    const turns = this.conversationCache.get(conversationId) ?? [];
    return turns.map((turn) => ({
      query: turn.query,
      answer: turn.answer,
      turnNumber: turn.turnNumber,
    }));
  }

  private _buildHistory(conversationId: string): unknown[] | null {
    const turns = this.conversationCache.get(conversationId) ?? [];
    if (!turns.length) return null;
    const history: unknown[] = [];
    for (const turn of turns) {
      history.push([turn.answer, null, 2]);
      history.push([turn.query, null, 1]);
    }
    return history;
  }

  private async _postChatRequest(url: string, body: string, retried = false): Promise<Response> {
    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Cookie: this.auth.cookieHeader,
        },
        body,
      });
    } catch (e) {
      throw new ChatError(`Chat request failed: ${String(e)}`);
    }

    if ((response.status === 401 || response.status === 403) && !retried && this.refreshAuth) {
      await this.refreshAuth();
      return this._postChatRequest(url, body, true);
    }

    if (!response.ok) throw new ChatError(`Chat request failed: HTTP ${response.status}`);
    return response;
  }
}

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

interface ParsedResponse {
  answer: string;
  conversationId: string | null;
  references: ChatReference[];
}

function parseStreamingResponse(rawText: string): ParsedResponse {
  const parser = new StreamingChatResponseParser();
  parser.feed(rawText);
  parser.finish();
  return parser.result();
}

class StreamingChatResponseParser {
  private lineBuffer = "";
  private prefixChecked = false;
  private expectingPayload = false;
  private bestMarkedAnswer = "";
  private bestUnmarkedAnswer = "";
  private streamedAnswer = "";
  private serverConvId: string | null = null;
  private references: ChatReference[] = [];

  feed(text: string): AskStreamChunk[] {
    this.lineBuffer += text;
    if (!this.stripPrefixIfReady()) return [];

    return this.drainCompleteLines();
  }

  finish(): AskStreamChunk[] {
    if (!this.prefixChecked) {
      if (this.lineBuffer.startsWith(")]}'")) this.lineBuffer = this.lineBuffer.slice(4);
      this.prefixChecked = true;
    }

    const chunks = this.drainCompleteLines();
    const finalLine = this.lineBuffer.trim();
    if (finalLine) chunks.push(...this.processLine(finalLine));
    this.lineBuffer = "";
    return chunks;
  }

  result(): ParsedResponse {
    return {
      answer: this.bestMarkedAnswer || this.bestUnmarkedAnswer,
      conversationId: this.serverConvId,
      references: this.references,
    };
  }

  private stripPrefixIfReady(): boolean {
    if (this.prefixChecked) return true;

    if (this.lineBuffer.startsWith(")]}'")) {
      const match = /^\)\]\}'\r?\n/.exec(this.lineBuffer);
      if (!match) return false;
      this.lineBuffer = this.lineBuffer.slice(match[0].length);
    } else if (this.lineBuffer.length < 4 && ")]}'".startsWith(this.lineBuffer)) {
      return false;
    }

    this.prefixChecked = true;
    return true;
  }

  private drainCompleteLines(): AskStreamChunk[] {
    const chunks: AskStreamChunk[] = [];
    let newlineIndex = this.lineBuffer.indexOf("\n");

    while (newlineIndex !== -1) {
      const line = this.lineBuffer.slice(0, newlineIndex).trim();
      this.lineBuffer = this.lineBuffer.slice(newlineIndex + 1);
      chunks.push(...this.processLine(line));
      newlineIndex = this.lineBuffer.indexOf("\n");
    }

    return chunks;
  }

  private processLine(line: string): AskStreamChunk[] {
    if (!line) return [];

    if (this.expectingPayload) {
      this.expectingPayload = false;
      return this.processPayload(line);
    }

    if (/^\d+$/.test(line)) {
      this.expectingPayload = true;
      return [];
    }

    return this.processPayload(line);
  }

  private processPayload(jsonStr: string): AskStreamChunk[] {
    let data: unknown;
    try {
      data = JSON.parse(jsonStr);
    } catch {
      return [];
    }
    if (!Array.isArray(data)) return [];

    const chunks: AskStreamChunk[] = [];
    for (const item of data as unknown[]) {
      if (!Array.isArray(item) || item.length < 3 || (item as unknown[])[0] !== "wrb.fr") continue;
      const innerJson = (item as unknown[])[2];
      if (typeof innerJson !== "string") continue;

      let innerData: unknown;
      try {
        innerData = JSON.parse(innerJson);
      } catch {
        continue;
      }
      if (!Array.isArray(innerData) || !innerData.length) continue;

      const first = (innerData as unknown[])[0];
      if (!Array.isArray(first) || !first.length) continue;

      const answerText = (first as unknown[])[0];
      if (typeof answerText !== "string" || !answerText) continue;

      const typeInfo = (first as unknown[])[4];
      const isAnswer =
        Array.isArray(typeInfo) && typeInfo.length > 0 && typeInfo[typeInfo.length - 1] === 1;

      const convData = (first as unknown[])[2];
      if (
        !this.serverConvId &&
        Array.isArray(convData) &&
        convData.length > 0 &&
        typeof (convData as unknown[])[0] === "string"
      ) {
        this.serverConvId = (convData as unknown[])[0] as string;
      }

      // Extract citation references from first[4][3]. Each citation entry
      // starts with a citation/chunk id; the document source id lives inside
      // the source pointer metadata at entry[1][5][*][0][0].
      if (Array.isArray(typeInfo) && typeInfo.length > 3) {
        const citations = typeInfo[3];
        if (Array.isArray(citations)) {
          const nextReferences = (citations as unknown[])
            .map((cite, index) => extractCitationReference(cite, index + 1))
            .filter((ref): ref is ChatReference => Boolean(ref));

          if (nextReferences.length > 0) {
            this.references = nextReferences;
          }
        }
      }

      if (isAnswer && answerText.length > this.bestMarkedAnswer.length) {
        this.bestMarkedAnswer = answerText;
        const chunk = this.buildTextChunk(answerText);
        if (chunk) chunks.push(chunk);
      } else if (!isAnswer && answerText.length > this.bestUnmarkedAnswer.length) {
        this.bestUnmarkedAnswer = answerText;
      }
    }

    return chunks;
  }

  private buildTextChunk(answerText: string): AskStreamChunk | null {
    if (answerText === this.streamedAnswer) return null;

    const isReplacement =
      this.streamedAnswer.length > 0 && !answerText.startsWith(this.streamedAnswer);
    const text = isReplacement ? answerText : answerText.slice(this.streamedAnswer.length);
    this.streamedAnswer = answerText;
    if (!text) return null;

    return {
      text,
      answer: answerText,
      conversationId: this.serverConvId,
      references: [...this.references],
      isReplacement,
    };
  }
}

async function* readResponseText(response: Response): AsyncGenerator<string> {
  if (!response.body) {
    yield await response.text();
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let completed = false;

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        completed = true;
        break;
      }
      if (value) yield decoder.decode(value, { stream: true });
    }

    const tail = decoder.decode();
    if (tail) yield tail;
  } finally {
    if (!completed) {
      try {
        await reader.cancel();
      } catch {
        // ignore cancellation errors
      }
    }
    reader.releaseLock();
  }
}

function extractUuid(data: unknown, depth = 8): string | null {
  if (depth <= 0 || data == null) return null;
  if (typeof data === "string") return UUID_RE.test(data) ? data : null;
  if (Array.isArray(data)) {
    for (const item of data) {
      const found = extractUuid(item, depth - 1);
      if (found) return found;
    }
  }
  return null;
}

function extractCitationReference(data: unknown, index: number): ChatReference | null {
  if (!Array.isArray(data)) return null;

  const citationId = extractUuid(data[0]);
  const detail = Array.isArray(data[1]) ? data[1] : null;
  const sourcePointers = Array.isArray(detail?.[5]) ? (detail[5] as unknown[]) : [];

  if (citationId && !detail) {
    return {
      index,
      citationId: null,
      sourceId: citationId,
      title: null,
      url: null,
    };
  }

  for (const pointer of sourcePointers) {
    if (!Array.isArray(pointer)) continue;
    const sourceGroup = pointer[0];
    if (!Array.isArray(sourceGroup)) continue;
    const sourceId = extractUuid(sourceGroup[0]);

    if (sourceId) {
      return {
        index,
        citationId,
        sourceId,
        title: null,
        url: null,
      };
    }
  }

  const fallbackSourceId = extractUuid(data);
  if (!fallbackSourceId || fallbackSourceId === citationId) return null;

  return {
    index,
    citationId,
    sourceId: fallbackSourceId,
    title: null,
    url: null,
  };
}

function randomUUID(): string {
  // Use Web Crypto API (available in Node 19+, Bun, Deno)
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: simple UUID v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
