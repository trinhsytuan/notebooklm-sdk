import { describe, expect, it, vi } from "vitest";
import { NotesAPI } from "../../src/api/notes.js";
import { RPCMethod } from "../../src/types/enums.js";

describe("NotesAPI", () => {
  it("get() returns a specific note", async () => {
    const rpc = {
      call: vi.fn().mockResolvedValue([
        [
          ["note-1", ["note-1", "Hello", [], null, "Greeting"], null, [1_700_000_000]],
          ["note-2", ["note-2", "World", [], null, "Planet"], null, [1_700_000_001]],
        ],
      ]),
    };
    const api = new NotesAPI(rpc as never);

    const note = await api.get("nb-id", "note-2");
    expect(note?.id).toBe("note-2");
    expect(note?.title).toBe("Planet");
  });

  it("deleteMindMap() delegates to DELETE_NOTE", async () => {
    const rpc = {
      call: vi.fn().mockResolvedValue(null),
    };
    const api = new NotesAPI(rpc as never);

    await expect(api.deleteMindMap("nb-id", "mind-map-id")).resolves.toBe(true);
    expect(rpc.call).toHaveBeenCalledWith(RPCMethod.DELETE_NOTE, ["nb-id", null, ["mind-map-id"]], {
      sourcePath: "/notebook/nb-id",
      allowNull: true,
    });
  });
});
