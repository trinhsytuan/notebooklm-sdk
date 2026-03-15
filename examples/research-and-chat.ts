import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();

const { id } = await client.notebooks.create("Solid-State Batteries Research");
console.log(`Created notebook: ${id}`);

// Research
const query = "Latest breakthroughs in solid-state batteries 2026";
await client.research.start(id, query, "web", "fast");
console.log("Researching...");

let result = await client.research.poll(id);
while (result.status === "in_progress") {
  await new Promise((r) => setTimeout(r, 3000));
  result = await client.research.poll(id);
}

const imported = await client.research.importSources(
  id,
  result.taskId!,
  result.sources.slice(0, 3),
);
console.log(`Imported ${imported.length} sources`);

// Wait for sources to be indexed
await new Promise((r) => setTimeout(r, 5000));

// Chat
const answer = await client.chat.ask(id, "Which companies are working on solid-state batteries?");
console.log(`\nAnswer: ${answer.answer}`);
