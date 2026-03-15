import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();

const notebooks = await client.notebooks.list();
console.log(
  "Notebooks:",
  notebooks.map((nb) => nb.title),
);

const first = notebooks[0];
const sources = await client.sources.list(first.id);
console.log(
  "Sources:",
  sources.map((s) => s.title),
);

if (sources[0]) {
  const guide = await client.sources.getGuide(first.id, sources[0].id);
  console.log("Source guide summary:", guide.summary);
  console.log("Keywords:", guide.keywords);

  const fulltext = await client.sources.getFulltext(first.id, sources[0].id);
  console.log(`Fulltext: ${fulltext.charCount} chars, title: "${fulltext.title}"`);
}
