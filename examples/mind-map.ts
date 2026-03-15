import * as fs from "node:fs/promises";
import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

await client.artifacts.createMindMap(nb.id);
console.log("Generating mind map...");

// Mind maps are stored in the notes system — poll until it appears
let json = null;
for (let i = 0; i < 20; i++) {
  await new Promise((r) => setTimeout(r, 3000));
  json = await client.notes.getMindMapContent(nb.id);
  if (json) break;
}

if (!json) {
  console.log("Mind map not ready.");
  process.exit(1);
}

await fs.mkdir("downloads", { recursive: true });
await fs.writeFile("downloads/mind-map.json", JSON.stringify(json, null, 2));
console.log("Saved downloads/mind-map.json");
