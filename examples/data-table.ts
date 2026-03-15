import * as fs from "node:fs/promises";
import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

const { artifactId } = await client.artifacts.createDataTable(nb.id);
console.log(`Generating data table... (${artifactId})`);

await client.artifacts.waitUntilReady(nb.id, artifactId!);

const table = await client.artifacts.getDataTableContent(nb.id, artifactId!);
if (!table) {
  console.log("No table content found.");
  process.exit(1);
}

console.log(`Headers: ${table.headers.join(", ")}`);
console.log(`Rows: ${table.rows.length}`);

// Save as CSV
const csv = [table.headers, ...table.rows].map((r) => r.join(",")).join("\n");
await fs.mkdir("downloads", { recursive: true });
await fs.writeFile(`downloads/${artifactId}.csv`, csv);
console.log(`Saved downloads/${artifactId}.csv`);
