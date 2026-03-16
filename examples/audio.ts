import * as fs from "node:fs/promises";
import { AudioFormat, AudioLength, NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

const { artifactId } = await client.artifacts.createAudio(nb.id, {
  format: AudioFormat.DEEP_DIVE,
  length: AudioLength.DEFAULT,
});
console.log(`Generating podcast... (${artifactId})`);

while (true) {
  const status = await client.artifacts.pollStatus(nb.id, artifactId!);
  console.log(`Status: ${status.status}`);
  if (status.status === "completed") break;
  if (status.status === "failed") {
    throw new Error(`Audio generation failed for ${artifactId}`);
  }
  await sleep(15_000);
}

const artifact = await client.artifacts.get(nb.id, artifactId!);
if (!artifact) {
  throw new Error(`Audio artifact not found: ${artifactId}`);
}

await fs.mkdir("downloads", { recursive: true });
const buffer = await client.artifacts.downloadAudio(nb.id, artifact.id);
await fs.writeFile(`downloads/${artifact.id}.mp3`, buffer);
console.log(`Saved downloads/${artifact.id}.mp3 (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
