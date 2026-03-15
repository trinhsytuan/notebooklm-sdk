import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

await client.research.start(nb.id, "Latest AI models 2026", "web", "fast");
console.log("Researching...");

let result = await client.research.poll(nb.id);
while (result.status === "in_progress") {
  await new Promise((r) => setTimeout(r, 3000));
  result = await client.research.poll(nb.id);
}

console.log(`Found ${result.sources.length} sources`);
for (const src of result.sources.slice(0, 3)) {
  console.log(`  - ${src.title}`);
}

const imported = await client.research.importSources(nb.id, result.taskId!, result.sources.slice(0, 3));
console.log(`Imported ${imported.length} sources into notebook`);
