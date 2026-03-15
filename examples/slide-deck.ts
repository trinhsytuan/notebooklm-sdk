import * as fs from "node:fs/promises";
import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

const { artifactId } = await client.artifacts.createSlideDeck(nb.id);
console.log(`Generating slide deck... (${artifactId})`);

await client.artifacts.waitUntilReady(nb.id, artifactId!);

await fs.mkdir("downloads", { recursive: true });

const pdf = await client.artifacts.downloadSlideDeck(nb.id, artifactId!, "pdf");
await fs.writeFile(`downloads/${artifactId}.pdf`, pdf);
console.log(`Saved PDF (${(pdf.length / 1024).toFixed(0)} KB)`);

const pptx = await client.artifacts.downloadSlideDeck(nb.id, artifactId!, "pptx");
await fs.writeFile(`downloads/${artifactId}.pptx`, pptx);
console.log(`Saved PPTX (${(pptx.length / 1024).toFixed(0)} KB)`);

// Revise slide 0 (zero-based index)
const revision = await client.artifacts.reviseSlide(nb.id, artifactId!, 0, "Move the title to the top");
console.log(`Revision started: ${revision.artifactId} (${revision.status})`);
