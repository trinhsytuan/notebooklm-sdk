import * as fs from "node:fs/promises";
import { NotebookLMClient } from "../src/index.js";
import { InfographicStyle, InfographicOrientation } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

const { artifactId } = await client.artifacts.createInfographic(nb.id, {
  orientation: InfographicOrientation.LANDSCAPE,
  style: InfographicStyle.PROFESSIONAL,
});
console.log(`Generating infographic... (${artifactId})`);

await client.artifacts.waitUntilReady(nb.id, artifactId!);

await fs.mkdir("downloads", { recursive: true });
const png = await client.artifacts.downloadInfographic(nb.id, artifactId!);
await fs.writeFile(`downloads/${artifactId}.png`, png);
console.log(`Saved PNG (${(png.length / 1024).toFixed(0)} KB)`);
