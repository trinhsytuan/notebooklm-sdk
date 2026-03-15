/**
 * full-lifecycle.ts — Create a notebook, add sources, chat, then clean up.
 */
import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();

// Create
const { id } = await client.notebooks.create("Temp Notebook");
await client.notebooks.rename(id, "My Test Notebook");
console.log(`Created: ${id}`);

// Add sources
const text = await client.sources.addText(
  id,
  "The mitochondria is the powerhouse of the cell.",
  "Biology Fact",
);
const url = await client.sources.addUrl(id, "https://en.wikipedia.org/wiki/NotebookLM");
const file = await client.sources.addFileBuffer(
  id,
  Buffer.from("# Hello\n\nThis is a test file."),
  "test.md",
  "text/markdown",
);

// Wait for all sources
await Promise.all([
  client.sources.waitUntilReady(id, text.id),
  client.sources.waitUntilReady(id, url.id),
  client.sources.waitUntilReady(id, file.id),
]);
console.log("Sources ready");

// Chat
const { answer } = await client.chat.ask(id, "Summarize all sources in one sentence each.");
console.log(`\nAnswer: ${answer}`);

// Clean up
await new Promise((r) => setTimeout(r, 5000));
await client.notebooks.delete(id);
console.log("Notebook deleted");
