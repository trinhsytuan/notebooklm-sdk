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

const artifact = await client.artifacts.pollUntilReady(nb.id, artifactId!, {
  timeoutSecs: 3600,
  intervalSecs: 15,
  onTick(status) {
    console.log(`Status: ${status.status}`);
  },
});

await fs.mkdir("downloads", { recursive: true });
const buffer = await client.artifacts.downloadAudio(nb.id, artifact.id);
await fs.writeFile(`downloads/${artifact.id}.mp3`, buffer);
console.log(`Saved downloads/${artifact.id}.mp3 (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
