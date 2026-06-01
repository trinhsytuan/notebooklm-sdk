import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { ChatAPI } from "../../src/api/chat.js";
import { ChatGoal, ChatResponseLength, RPCMethod } from "../../src/types/enums.js";

const auth = {
  sessionId: "mock-session",
  csrfToken: "mock-csrf",
  cookieHeader: "mock-cookie",
  googleCookieHeader: "mock-cookie",
  cookies: {},
};

describe("ChatAPI", () => {
  it("getHistory() returns question-answer pairs", async () => {
    const rpc = {
      call: vi.fn().mockResolvedValue([
        [
          [null, null, 2, null, [["Answer 2"]]],
          [null, null, 1, "Question 2"],
          [null, null, 2, null, [["Answer 1"]]],
          [null, null, 1, "Question 1"],
        ],
      ]),
      getSourceIds: vi.fn(),
    };
    const api = new ChatAPI(rpc as never, auth);

    const history = await api.getHistory("nb-id", 100, "conv-id");
    expect(history).toEqual([
      ["Question 1", "Answer 1"],
      ["Question 2", "Answer 2"],
    ]);
  });

  it("getCachedTurns() returns locally cached conversation turns", async () => {
    const rpc = {
      call: vi.fn(),
      getSourceIds: vi.fn().mockResolvedValue(["src-id"]),
    };
    const api = new ChatAPI(rpc as never, auth);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          ')]}\'\n[["wrb.fr",null,"[[\\"Answer\\",null,[\\"server-conv\\"],null,[null,null,null,[[\\"src-id\\"]],1]]]"]]',
          {
            status: 200,
          },
        ),
      ),
    );

    await api.ask("nb-id", "Question?");
    expect(api.getCachedTurns("server-conv")).toEqual([
      { query: "Question?", answer: "Answer", turnNumber: 1 },
    ]);
    vi.unstubAllGlobals();
  });

  it("getHistory() fetches the last conversation ID when omitted", async () => {
    const rpc = {
      call: vi.fn().mockImplementation(async (methodId: string) => {
        if (methodId === RPCMethod.GET_LAST_CONVERSATION_ID) return [[["conv-id"]]];
        return [
          [
            [null, null, 2, null, [["Answer"]]],
            [null, null, 1, "Question"],
          ],
        ];
      }),
      getSourceIds: vi.fn(),
    };
    const api = new ChatAPI(rpc as never, auth);

    const history = await api.getHistory("nb-id");
    expect(history).toEqual([["Question", "Answer"]]);
  });

  it("ask() refreshes auth once and retries on 401", async () => {
    const rpc = {
      call: vi.fn(),
      getSourceIds: vi.fn().mockResolvedValue(["src-id"]),
    };
    const refreshAuth = vi.fn();
    const api = new ChatAPI(rpc as never, auth, refreshAuth);

    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(new Response("unauthorized", { status: 401 }))
        .mockResolvedValueOnce(
          new Response(
            ')]}\'\n[["wrb.fr",null,"[[\\"Answer\\",null,[\\"server-conv\\"],null,[null,null,null,[[\\"src-id\\"]],1]]]"]]',
            { status: 200 },
          ),
        ),
    );

    const result = await api.ask("nb-id", "Question?");
    expect(refreshAuth).toHaveBeenCalledTimes(1);
    expect(result.answer).toBe("Answer");
    vi.unstubAllGlobals();
  });

  it("ask() maps citation references to source ids", async () => {
    const rpc = {
      call: vi.fn(),
      getSourceIds: vi.fn().mockResolvedValue(["src-id"]),
    };
    const api = new ChatAPI(rpc as never, auth);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(readFileSync("tests/fixtures/responses/chat_ask_with_references.txt"), {
          status: 200,
        }),
      ),
    );

    const result = await api.ask("nb-id", "Question?");

    expect(result.references).toHaveLength(48);
    expect(result.references[0]).toMatchObject({
      index: 1,
      citationId: "b7e19cd2-f008-4419-a9a8-3f9953adf7e8",
      sourceId: "51c16a20-1423-4491-a49f-735737776dd9",
    });
    expect(result.references[1]).toMatchObject({
      index: 2,
      citationId: "2b03d0b5-8739-456e-ae14-42bca683fb65",
      sourceId: "5663cdfd-266c-4d46-a37b-fa15fb72dc1d",
    });
    vi.unstubAllGlobals();
  });

  it("configure() uses default goal and length", async () => {
    const rpc = {
      call: vi.fn().mockResolvedValue(null),
      getSourceIds: vi.fn(),
    };
    const api = new ChatAPI(rpc as never, auth);

    await api.configure("nb-id");

    expect(rpc.call).toHaveBeenCalledWith(
      RPCMethod.RENAME_NOTEBOOK,
      [
        "nb-id",
        [
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            [[ChatGoal.DEFAULT], [ChatResponseLength.DEFAULT]],
          ],
        ],
      ],
      { sourcePath: "/notebook/nb-id", allowNull: true },
    );
  });
});
