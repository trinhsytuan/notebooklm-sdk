import { readFileSync } from "node:fs";
import type { AuthTokens } from "../auth.js";
import type { RPCCore } from "../rpc/core.js";
import type { DriveMimeTypeValue } from "../types/enums.js";
import { DriveMimeType, RPCMethod } from "../types/enums.js";
import { SourceProcessingError, SourceTimeoutError } from "../types/errors.js";
import type { Source, SourceDownload, SourceFulltext, SourceGuide } from "../types/models.js";
import { parseSource } from "../types/models.js";

const UPLOAD_URL = "https://notebook.google.com/upload/_/";

export interface AddSourceOptions {
  waitUntilReady?: boolean;
  waitTimeout?: number;
}

export type SourceDownloadFormat = "markdown" | "text";

export interface SourceDownloadOptions {
  /** Defaults to markdown so metadata can be preserved cleanly. */
  format?: SourceDownloadFormat;
  /** Override the generated download file name. */
  fileName?: string;
  /** Include title/source metadata at the top of the downloaded text. Defaults to true. */
  includeMetadata?: boolean;
}

export class SourcesAPI {
  constructor(
    private readonly rpc: RPCCore,
    private readonly auth: AuthTokens,
  ) {}

  async list(notebookId: string): Promise<Source[]> {
    const params = [notebookId, null, [2], null, 0];
    const notebook = await this.rpc.call(RPCMethod.GET_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
    });

    if (!Array.isArray(notebook) || !notebook.length) return [];
    const nbInfo = notebook[0] as unknown[];
    if (!Array.isArray(nbInfo) || nbInfo.length <= 1) return [];
    const sourcesList = nbInfo[1] as unknown[][];
    if (!Array.isArray(sourcesList)) return [];

    return sourcesList
      .filter((s) => Array.isArray(s) && s.length > 0)
      .map((s) => parseSource(s as unknown[]));
  }

  async get(notebookId: string, sourceId: string): Promise<Source | null> {
    const sources = await this.list(notebookId);
    return sources.find((s) => s.id === sourceId) ?? null;
  }

  async addUrl(notebookId: string, url: string, opts: AddSourceOptions = {}): Promise<Source> {
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    let params: unknown[];
    if (isYouTube) {
      params = [
        [[null, null, null, null, null, null, null, [url], null, null, 1]],
        notebookId,
        [2],
        [1, null, null, null, null, null, null, null, null, null, [1]],
      ];
    } else {
      params = [[[null, null, [url], null, null, null, null, null]], notebookId, [2], null, null];
    }

    const result = await this.rpc.call(RPCMethod.ADD_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: isYouTube,
    });

    const sourceId = extractSourceId(result);
    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }
    return {
      id: sourceId,
      title: url,
      url,
      kind: "web_page",
      createdAt: null,
      status: "processing",
      _typeCode: null,
    };
  }

  async addText(
    notebookId: string,
    text: string,
    title?: string,
    opts: AddSourceOptions = {},
  ): Promise<Source> {
    // Pasted text uses ADD_SOURCE with a special format
    const params = [
      [[null, [title ?? "", text], null, null, null, null, null, null]],
      notebookId,
      [2],
      null,
      null,
    ];

    const result = await this.rpc.call(RPCMethod.ADD_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
    });

    const sourceId = extractSourceId(result);
    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }
    return {
      id: sourceId,
      title: title ?? null,
      url: null,
      kind: "pasted_text",
      createdAt: null,
      status: "processing",
      _typeCode: null,
    };
  }

  async addDrive(
    notebookId: string,
    fileId: string,
    title: string,
    mimeType: DriveMimeTypeValue = DriveMimeType.GOOGLE_DOC,
    opts: AddSourceOptions = {},
  ): Promise<Source> {
    const sourceData = [
      [fileId, mimeType, 1, title],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      1,
    ];
    const params = [
      [sourceData],
      notebookId,
      [2],
      [1, null, null, null, null, null, null, null, null, null, [1]],
    ];
    const result = await this.rpc.call(RPCMethod.ADD_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });
    const sourceId = extractSourceId(result);
    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }
    return {
      id: sourceId,
      title,
      url: null,
      kind: "unknown",
      createdAt: null,
      status: "processing",
      _typeCode: null,
    };
  }

  async addFile(
    notebookId: string,
    filePath: string,
    mimeType: string,
    opts: AddSourceOptions = {},
  ): Promise<Source> {
    const fileData = readFileSync(filePath);
    const fileName = filePath.split("/").pop() ?? "file";
    return this.addFileBuffer(notebookId, fileData, fileName, mimeType, opts);
  }

  async addFileBuffer(
    notebookId: string,
    data: Buffer | Uint8Array,
    fileName: string,
    _mimeType: string,
    opts: AddSourceOptions = {},
  ): Promise<Source> {
    // Step 1: Register file source intent to get SOURCE_ID
    const params = [
      [[fileName]],
      notebookId,
      [2],
      [1, null, null, null, null, null, null, null, null, null, [1]],
    ];

    const result = await this.rpc.call(RPCMethod.ADD_SOURCE_FILE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });

    const sourceId = extractSourceId(result);

    // Step 2: Start resumable upload session
    const uploadUrl = await this.startResumableUpload(notebookId, fileName, data.length, sourceId);

    // Step 3: Stream/upload final file content
    await this.uploadFile(uploadUrl, data);

    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }

    return {
      id: sourceId,
      title: fileName,
      url: null,
      kind: "pdf", // Defaults to generic kind until ready
      createdAt: null,
      status: "processing",
      _typeCode: null,
    };
  }

  private async startResumableUpload(
    notebookId: string,
    fileName: string,
    fileSize: number,
    sourceId: string,
  ): Promise<string> {
    const startResp = await fetch(`${UPLOAD_URL}?authuser=0`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Cookie: this.auth.cookieHeader,
        Origin: "https://notebook.google.com",
        Referer: "https://notebook.google.com/",
        "x-goog-authuser": "0",
        "x-goog-upload-command": "start",
        "x-goog-upload-header-content-length": String(fileSize),
        "x-goog-upload-protocol": "resumable",
      },
      body: JSON.stringify({
        PROJECT_ID: notebookId,
        SOURCE_NAME: fileName,
        SOURCE_ID: sourceId,
      }),
    });

    if (!startResp.ok) {
      throw new Error(`Upload initiation failed: HTTP ${startResp.status}`);
    }

    const uploadSessionUrl = startResp.headers.get("x-goog-upload-url");
    if (!uploadSessionUrl) {
      throw new Error("Failed to get upload URL from response headers");
    }

    return uploadSessionUrl;
  }

  private async uploadFile(uploadUrl: string, data: Buffer | Uint8Array): Promise<string> {
    const uploadResp = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Cookie: this.auth.cookieHeader,
        Origin: "https://notebook.google.com",
        Referer: "https://notebook.google.com/",
        "X-Goog-Upload-Command": "upload, finalize",
        "X-Goog-Upload-Offset": "0",
      },
      body: new Uint8Array(data),
    });

    if (!uploadResp.ok) {
      throw new Error(`File upload failed: HTTP ${uploadResp.status}`);
    }

    const uploadResult = await uploadResp.text();
    return uploadResult.trim();
  }

  /** Get the AI-generated Source Guide (summary + keywords) for a source. */
  async getGuide(notebookId: string, sourceId: string): Promise<SourceGuide> {
    const params = [[[[sourceId]]]];
    const result = await this.rpc.call(RPCMethod.GET_SOURCE_GUIDE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
      timeoutMs: 120_000,
    });

    let summary = "";
    let keywords: string[] = [];

    if (Array.isArray(result) && result.length > 0) {
      const outer = result[0];
      if (Array.isArray(outer) && outer.length > 0) {
        const inner = outer[0] as unknown[];
        if (Array.isArray(inner)) {
          if (inner.length > 1 && Array.isArray(inner[1]) && typeof inner[1][0] === "string") {
            summary = inner[1][0];
          }
          if (inner.length > 2 && Array.isArray(inner[2]) && Array.isArray(inner[2][0])) {
            keywords = (inner[2][0] as unknown[]).filter((k) => typeof k === "string") as string[];
          }
        }
      }
    }

    return { summary, keywords };
  }

  /** Get the full indexed text content of a source. */
  async getFulltext(notebookId: string, sourceId: string): Promise<SourceFulltext> {
    const params = [[sourceId], [2], [2]];
    const result = await this.rpc.call(RPCMethod.GET_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });

    if (!Array.isArray(result) || !result.length) {
      throw new Error(`Source ${sourceId} not found in notebook ${notebookId}`);
    }

    let title = "";
    let url: string | null = null;

    if (Array.isArray(result[0]) && result[0].length > 1) {
      title = typeof result[0][1] === "string" ? result[0][1] : "";
      const meta = result[0][2] as unknown[];
      if (
        Array.isArray(meta) &&
        meta.length > 7 &&
        Array.isArray(meta[7]) &&
        typeof meta[7][0] === "string"
      ) {
        url = meta[7][0];
      }
    }

    let content = "";
    if (Array.isArray(result[3]) && result[3].length > 0) {
      const texts = extractAllText(result[3][0] as unknown[]);
      content = texts.join("\n");
    }

    return { sourceId, title, content, url, charCount: content.length };
  }

  /**
   * Build a downloadable text/markdown file from the indexed source content.
   * NotebookLM does not expose the original uploaded file for every source type,
   * so this returns the text NotebookLM indexed for chat and artifact generation.
   */
  async getDownload(
    notebookId: string,
    sourceId: string,
    opts: SourceDownloadOptions = {},
  ): Promise<SourceDownload> {
    const fulltext = await this.getFulltext(notebookId, sourceId);
    const format = opts.format ?? "markdown";
    const includeMetadata = opts.includeMetadata ?? true;
    const title = fulltext.title || sourceId;
    const extension = format === "markdown" ? "md" : "txt";
    const mimeType =
      format === "markdown" ? "text/markdown;charset=utf-8" : "text/plain;charset=utf-8";
    const content =
      format === "markdown"
        ? formatMarkdownDownload(fulltext, includeMetadata)
        : formatTextDownload(fulltext, includeMetadata);
    const fileName = opts.fileName ?? `${sanitizeFileName(title || sourceId)}.${extension}`;

    return {
      sourceId,
      title,
      fileName,
      mimeType,
      content,
      blob: new Blob([content], { type: mimeType }),
      url: fulltext.url,
      charCount: content.length,
    };
  }

  /** Check if a source has newer content available. Returns true if fresh, false if stale. */
  async checkFreshness(notebookId: string, sourceId: string): Promise<boolean> {
    const params = [null, [sourceId], [2]];
    const result = await this.rpc.call(RPCMethod.CHECK_SOURCE_FRESHNESS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });
    if (result === true) return true;
    if (result === false) return false;
    if (Array.isArray(result)) {
      if (result.length === 0) return true;
      const first = result[0];
      if (Array.isArray(first) && first.length > 1 && first[1] === true) return true;
    }
    return false;
  }

  async delete(notebookId: string, sourceId: string): Promise<boolean> {
    const params = [[[sourceId]], [2]];
    await this.rpc.call(RPCMethod.DELETE_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });
    return true;
  }

  async refresh(notebookId: string, sourceId: string): Promise<boolean> {
    const params = [notebookId, sourceId, [2]];
    await this.rpc.call(RPCMethod.REFRESH_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });
    return true;
  }

  async rename(notebookId: string, sourceId: string, newTitle: string): Promise<Source> {
    const params = [null, [sourceId], [[[newTitle]]]];
    const result = await this.rpc.call(RPCMethod.UPDATE_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
    });

    if (Array.isArray(result) && result.length > 0) {
      try {
        const parsed = parseSource(result as unknown[]);
        return parsed.title ? parsed : { ...parsed, title: newTitle };
      } catch {
        // fall through to synthetic response
      }
    }

    return {
      id: sourceId,
      title: newTitle,
      url: null,
      kind: "unknown",
      createdAt: null,
      status: "ready",
      _typeCode: null,
    };
  }

  async waitUntilReady(
    notebookId: string,
    sourceId: string,
    timeout = 120,
    initialInterval = 1,
    maxInterval = 10,
    backoffFactor = 1.5,
  ): Promise<Source> {
    const deadline = Date.now() + timeout * 1000;
    let interval = initialInterval;
    let lastStatus: number | undefined;

    while (Date.now() < deadline) {
      const source = await this.get(notebookId, sourceId);
      if (source) {
        if (source.status === "ready") return source;
        if (source.status === "error") {
          throw new SourceProcessingError(sourceId, 3);
        }
        lastStatus = source._typeCode ?? undefined;
      }

      await sleep(interval * 1000);
      interval = Math.min(interval * backoffFactor, maxInterval);
    }

    throw new SourceTimeoutError(sourceId, timeout, lastStatus);
  }

  async waitForSources(
    notebookId: string,
    sourceIds: string[],
    timeout = 120,
    initialInterval = 1,
    maxInterval = 10,
    backoffFactor = 1.5,
  ): Promise<Source[]> {
    return Promise.all(
      sourceIds.map((sourceId) =>
        this.waitUntilReady(
          notebookId,
          sourceId,
          timeout,
          initialInterval,
          maxInterval,
          backoffFactor,
        ),
      ),
    );
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ID_LIKE_RE = /^[A-Za-z0-9_-]{9,128}$/;
const SOURCE_ID_KEYS = ["sourceId", "source_id", "SOURCE_ID", "id"] as const;
// biome-ignore lint/complexity/useRegexLiterals: The literal form trips noControlCharactersInRegex.
const FILE_NAME_CONTROL_CHARS_RE = new RegExp("[\\u0000-\\u001f]", "g");

function extractSourceId(result: unknown): string {
  // Source ID appears in various positions depending on the RPC.
  const sourceTupleId = findSourceTupleId(result);
  if (sourceTupleId) return sourceTupleId;

  const keyedId = findKeyedSourceId(result);
  if (keyedId) return keyedId;

  const uuid = findString(result, isUuid);
  if (uuid) return uuid;

  const idLike = findString(result, isIdLike);
  if (idLike) return idLike;

  throw new Error("Could not extract source ID from API response");
}

function findSourceTupleId(value: unknown, depth = 0, seen = new Set<object>()): string | null {
  if (depth > 40) return null;

  if (Array.isArray(value)) {
    if (seen.has(value)) return null;
    seen.add(value);

    const id = sourceTupleId(value);
    if (id) return id;

    for (const item of value) {
      const nested = findSourceTupleId(item, depth + 1, seen);
      if (nested) return nested;
    }
    return null;
  }

  if (isRecord(value)) {
    if (seen.has(value)) return null;
    seen.add(value);

    for (const item of Object.values(value)) {
      const nested = findSourceTupleId(item, depth + 1, seen);
      if (nested) return nested;
    }
  }

  return null;
}

function sourceTupleId(value: unknown[]): string | null {
  const id = unwrapSourceId(value[0]);
  if (!id) return null;

  if (value.length === 1) return id;
  if (typeof value[1] === "string") return id;
  if (isUuid(id) && (Array.isArray(value[2]) || Array.isArray(value[3]))) return id;

  return null;
}

function unwrapSourceId(value: unknown): string | null {
  if (typeof value === "string") return normalizeSourceId(value);
  if (Array.isArray(value) && value.length > 0) return unwrapSourceId(value[0]);
  return null;
}

function findKeyedSourceId(value: unknown, depth = 0, seen = new Set<object>()): string | null {
  if (depth > 40 || !isRecord(value)) return null;
  if (seen.has(value)) return null;
  seen.add(value);

  for (const key of SOURCE_ID_KEYS) {
    const id = normalizeSourceId(value[key]);
    if (id) return id;
  }

  for (const item of Object.values(value)) {
    const nested = findKeyedSourceId(item, depth + 1, seen);
    if (nested) return nested;
  }

  return null;
}

function findString(
  value: unknown,
  predicate: (value: string) => boolean,
  depth = 0,
  seen = new Set<object>(),
): string | null {
  if (depth > 40) return null;

  if (typeof value === "string") {
    const normalized = value.trim();
    if (predicate(normalized)) return normalized;

    const parsed = parseNestedJson(normalized);
    if (parsed !== null) return findString(parsed, predicate, depth + 1, seen);
    return null;
  }

  if (Array.isArray(value)) {
    if (seen.has(value)) return null;
    seen.add(value);

    for (const item of value) {
      const nested = findString(item, predicate, depth + 1, seen);
      if (nested) return nested;
    }
    return null;
  }

  if (isRecord(value)) {
    if (seen.has(value)) return null;
    seen.add(value);

    for (const item of Object.values(value)) {
      const nested = findString(item, predicate, depth + 1, seen);
      if (nested) return nested;
    }
  }

  return null;
}

function normalizeSourceId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (isUuid(trimmed) || isIdLike(trimmed)) return trimmed;
  return null;
}

function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

function isIdLike(value: string): boolean {
  return ID_LIKE_RE.test(value);
}

function parseNestedJson(value: string): unknown | null {
  if (!value || (value[0] !== "[" && value[0] !== "{")) return null;
  if (value.length > 50_000) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function extractAllText(data: unknown[], maxDepth = 100): string[] {
  if (maxDepth <= 0) return [];
  const texts: string[] = [];
  for (const item of data) {
    if (typeof item === "string" && item.length > 0) texts.push(item);
    else if (Array.isArray(item)) texts.push(...extractAllText(item, maxDepth - 1));
  }
  return texts;
}

function formatMarkdownDownload(source: SourceFulltext, includeMetadata: boolean): string {
  if (!includeMetadata) return source.content;

  const lines = [`# ${source.title || source.sourceId}`, "", `Source ID: ${source.sourceId}`];
  if (source.url) lines.push(`Original URL: ${source.url}`);
  lines.push("", "---", "", source.content);
  return lines.join("\n");
}

function formatTextDownload(source: SourceFulltext, includeMetadata: boolean): string {
  if (!includeMetadata) return source.content;

  const lines = [source.title || source.sourceId, `Source ID: ${source.sourceId}`];
  if (source.url) lines.push(`Original URL: ${source.url}`);
  lines.push("", source.content);
  return lines.join("\n");
}

function sanitizeFileName(name: string): string {
  const sanitized = name
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(FILE_NAME_CONTROL_CHARS_RE, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+/, "")
    .slice(0, 120);

  return sanitized || "notebooklm-source";
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
