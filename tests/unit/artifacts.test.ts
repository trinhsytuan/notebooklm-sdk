import * as fs from "fs";
import * as path from "path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ArtifactsAPI } from "../../src/api/artifacts.js";
import { NotesAPI } from "../../src/api/notes.js";
import { RPCCore } from "../../src/rpc/core.js";

function getFixture(filename: string): string {
  return fs.readFileSync(path.join(__dirname, `../fixtures/responses/${filename}`), "utf-8");
}

describe("ArtifactsAPI", () => {
  let api: ArtifactsAPI;
  let notesApi: NotesAPI;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    const auth = {
      sessionId: "mock-session",
      csrfToken: "mock-csrf",
      cookieHeader: "mock-cookie",
      cookies: {},
    };
    const realCore = new RPCCore(auth);
    notesApi = new NotesAPI(realCore);
    api = new ArtifactsAPI(realCore, auth, notesApi);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mockFetchWithFixture(fixtureName: string, status: number = 200) {
    const fixture = getFixture(`${fixtureName}.txt`);
    vi.mocked(fetch).mockImplementation(async () => new Response(fixture, { status }));
  }

  it("list() returns artifacts", async () => {
    mockFetchWithFixture("artifacts_list_1");
    const result = await api.list("nb-id");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("id");
  });

  it("get() returns a specific artifact", async () => {
    mockFetchWithFixture("artifacts_list_1");
    const result = await api.list("nb-id");
    const firstId = result[0].id;

    // get() calls list() internally, so the same fixture works
    const art = await api.get("nb-id", firstId);
    expect(art).toBeDefined();
    expect(art?.id).toBe(firstId);
  });

  it("delete() succeeds", async () => {
    mockFetchWithFixture("artifacts_delete");
    await expect(api.delete("nb-id", "art-id")).resolves.toBe(true);
  });

  it("rename() succeeds", async () => {
    mockFetchWithFixture("artifacts_rename");
    await expect(api.rename("nb-id", "art-id", "New Title")).resolves.toBe(true);
  });

  // We explicitly provide sourceIds to avoid the internal getSourceIds call
  // which would require a multi-fetch mock setup for getNotebook -> createArtifact

  it("createQuiz() generates a quiz", async () => {
    mockFetchWithFixture("artifacts_generate_quiz");
    const result = await api.createQuiz("nb-id", { sourceIds: ["src-id"] });
    expect(result).toHaveProperty("artifactId");
    expect(result).toHaveProperty("status");
  });

  it("createFlashcards() generates flashcards", async () => {
    mockFetchWithFixture("artifacts_generate_flashcards");
    const result = await api.createFlashcards("nb-id", { sourceIds: ["src-id"] });
    expect(result).toHaveProperty("artifactId");
    expect(result).toHaveProperty("status");
  });

  it("createReport() generates a report", async () => {
    mockFetchWithFixture("artifacts_generate_report");
    const result = await api.createReport("nb-id", { sourceIds: ["src-id"] });
    expect(result).toHaveProperty("artifactId");
    expect(result).toHaveProperty("status");
  });

  it("createMindMap() generates a mind map and returns a Note", async () => {
    // createMindMap calls GENERATE_MIND_MAP then notes.create (CREATE_NOTE + UPDATE_NOTE)
    const mindMapFixture = getFixture("artifacts_generate_mind_map.txt");
    const createNoteFixture = getFixture("notes_create_1.txt");
    const updateNoteFixture = getFixture("notes_delete_1.txt"); // UPDATE_NOTE returns null — reuse any null fixture
    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response(mindMapFixture, { status: 200 }))
      .mockResolvedValueOnce(new Response(createNoteFixture, { status: 200 }))
      .mockResolvedValueOnce(new Response(updateNoteFixture, { status: 200 }));
    const result = await api.createMindMap("nb-id", ["src-id"]);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("content");
    expect(JSON.parse(result.content)).toHaveProperty("name");
  });
});
