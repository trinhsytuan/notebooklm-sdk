import * as fs from "node:fs/promises";
import { NotebookLMClient, VideoFormat, VideoStyle } from "notebooklm-sdk";

const client = await NotebookLMClient.connect();

const { id } = await client.notebooks.create("Siargao Travel Video");

const query = "Siargao travel surfing geography island guide";
const task = await client.research.start(id, query, "web", "fast");
if (!task?.taskId) {
  throw new Error("Failed to start research");
}

let research = await client.research.poll(id);
while (research.status === "in_progress") {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  research = await client.research.poll(id);
}

const imported = await client.research.importSources(id, task.taskId, research.sources.slice(0, 3));

await client.sources.waitForSources(
  id,
  imported.map((source) => source.id),
  300,
);

const { artifactId } = await client.artifacts.createVideo(id, {
  format: VideoFormat.CINEMATIC,
  style: VideoStyle.CLASSIC,
  instructions:
    "Create a cinematic travel video about Siargao that highlights surfing, geography, island atmosphere, tradeoffs.",
});

const video = await client.artifacts.pollUntilReady(id, artifactId!, {
  timeoutSecs: 3600,
  intervalSecs: 15,
  onTick(status) {
    console.log(`Video status: ${status.status}`);
  },
});

await fs.mkdir("downloads", { recursive: true });
const mp4 = await client.artifacts.downloadVideo(id, video.id);
await fs.writeFile(`downloads/${video.id}.mp4`, mp4);
console.log(`Saved downloads/${video.id}.mp4`);
