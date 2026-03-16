import * as fs from "node:fs/promises";
import { NotebookLMClient, VideoFormat, VideoStyle } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

const { artifactId } = await client.artifacts.createVideo(nb.id, {
  format: VideoFormat.CINEMATIC,
  style: VideoStyle.CLASSIC,
  instructions:
    "Create a cinematic explainer with a dramatic narrative arc, clear section transitions, and strong emphasis on the most important milestones.",
});
console.log(`Generating video... (${artifactId})`);

const artifact = await client.artifacts.pollUntilReady(nb.id, artifactId!, {
  timeoutSecs: 4000,
  intervalSecs: 15,
  onTick(status) {
    console.log(`Status: ${status.status}`);
  },
});

await fs.mkdir("downloads", { recursive: true });
const buffer = await client.artifacts.downloadVideo(nb.id, artifact.id);
await fs.writeFile(`downloads/${artifact.id}.mp4`, buffer);
console.log(`Saved downloads/${artifact.id}.mp4 (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
