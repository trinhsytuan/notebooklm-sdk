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
