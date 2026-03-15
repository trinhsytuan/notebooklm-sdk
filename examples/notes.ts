import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

// Create
const note = await client.notes.create(nb.id, "Hello from the SDK!", "My SDK Note");
console.log(`Created note: ${note.id}`);

// Update
await client.notes.update(nb.id, note.id, "Updated content from the SDK.", "My SDK Note (edited)");
console.log("Updated note.");

// List
const notes = await client.notes.list(nb.id);
console.log(`Notes in notebook: ${notes.length}`);
for (const n of notes) {
  console.log(`  - [${n.id}] ${n.title ?? "(no title)"}`);
}

// Delete
// await client.notes.delete(nb.id, note.id);
// console.log("Deleted note.");
