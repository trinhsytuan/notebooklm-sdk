import * as fs from "node:fs/promises";
import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

// List existing mind maps
const existing = await client.notes.listMindMaps(nb.id);
console.log(`\nExisting mind maps: ${existing.length}`);
for (const mm of existing) {
  console.log(`  - [${mm.id}] ${mm.title ?? "(no title)"}`);
}

// Generate a new mind map
console.log("\nGenerating mind map...");
const note = await client.artifacts.createMindMap(nb.id);
console.log(`Created: [${note.id}] ${note.title ?? "(no title)"}`);

const json = JSON.parse(note.content);
await fs.mkdir("downloads", { recursive: true });
const filename = (note.title ?? note.id).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
await fs.writeFile(`downloads/${filename}.json`, JSON.stringify(json, null, 2));
console.log(`Saved downloads/${filename}.json`);
