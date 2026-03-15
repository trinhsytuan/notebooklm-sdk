import * as fs from "node:fs/promises";
import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

// Optionally get AI-suggested report formats before generating
const suggestions = await client.artifacts.suggestReports(nb.id);
if (suggestions.length) {
  console.log("Suggested reports:");
  for (const s of suggestions) console.log(`  - ${s.title}: ${s.description}`);
}

const { artifactId } = await client.artifacts.createReport(nb.id, { format: "briefing_doc" });
console.log(`Generating report... (${artifactId})`);

const artifact = await client.artifacts.waitUntilReady(nb.id, artifactId!, 600, 3);
const markdown = await client.artifacts.getReportMarkdown(nb.id, artifact.id);

await fs.mkdir("downloads", { recursive: true });
await fs.writeFile(`downloads/${artifact.id}.md`, markdown!);
console.log(`Saved downloads/${artifact.id}.md`);
