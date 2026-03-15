/**
 * download.ts — List all artifacts in a notebook and download completed ones.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { NotebookLMClient } from "../src/index.js";
import type { Artifact } from "../src/types/models.js";

const DOWNLOAD_DIR = path.join(process.cwd(), "downloads");

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}\n`);

await fs.mkdir(DOWNLOAD_DIR, { recursive: true });

const artifacts = await client.artifacts.list(nb.id);
console.log(`Found ${artifacts.length} artifact(s):`);
for (const a of artifacts) {
  console.log(`  [${a.kind.padEnd(12)}] ${a.status.padEnd(12)} ${a.id}  ${a.title ?? ""}`);
}
console.log();

const completed = artifacts.filter((a) => a.status === "completed");
if (!completed.length) {
  console.log("No completed artifacts found.");
  process.exit(0);
}

for (const a of completed) {
  try {
    const file = await downloadArtifact(client, a);
    if (file) console.log(`  Saved → ${path.relative(process.cwd(), file)}`);
  } catch (err) {
    console.error(`  Failed ${a.kind} ${a.id}: ${err}`);
  }
}

// Also download mind maps from notes
const { mindMaps } = await client.notes.list(nb.id);
for (const mm of mindMaps) {
  const json = await client.notes.getMindMapContent(nb.id, mm.id);
  if (json) {
    const file = path.join(DOWNLOAD_DIR, `${mm.id}.json`);
    await fs.writeFile(file, JSON.stringify(json, null, 2));
    console.log(`  Saved → downloads/${mm.id}.json  (mind_map)`);
  }
}

function slugify(a: Artifact): string {
  const base = a.title ? a.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-|-$/g, "") : a.id;
  return `${base}`;
}

async function downloadArtifact(
  client: Awaited<ReturnType<typeof NotebookLMClient.connect>>,
  a: Artifact,
): Promise<string | null> {
  const { notebookId: nbId, id } = a;
  const name = slugify(a);

  switch (a.kind) {
    case "audio": {
      const buf = await client.artifacts.downloadAudio(nbId, id);
      const file = path.join(DOWNLOAD_DIR, `${name}.mp3`);
      await fs.writeFile(file, buf);
      return file;
    }
    case "video": {
      const buf = await client.artifacts.downloadVideo(nbId, id);
      const file = path.join(DOWNLOAD_DIR, `${name}.mp4`);
      await fs.writeFile(file, buf);
      return file;
    }
    case "slide_deck": {
      const buf = await client.artifacts.downloadSlideDeck(nbId, id, "pdf");
      const file = path.join(DOWNLOAD_DIR, `${name}.pdf`);
      await fs.writeFile(file, buf);
      return file;
    }
    case "infographic": {
      const buf = await client.artifacts.downloadInfographic(nbId, id);
      const file = path.join(DOWNLOAD_DIR, `${name}.png`);
      await fs.writeFile(file, buf);
      return file;
    }
    case "report": {
      const md = await client.artifacts.getReportMarkdown(nbId, id);
      if (!md) return null;
      const file = path.join(DOWNLOAD_DIR, `${name}.md`);
      await fs.writeFile(file, md);
      return file;
    }
    case "quiz":
    case "flashcards": {
      const html = await client.artifacts.getInteractiveHtml(nbId, id);
      if (!html) return null;
      const file = path.join(DOWNLOAD_DIR, `${name}.html`);
      await fs.writeFile(file, html);
      return file;
    }
    case "data_table": {
      const table = await client.artifacts.getDataTableContent(nbId, id);
      if (!table) return null;
      const csv = [table.headers, ...table.rows].map((r) => r.join(",")).join("\n");
      const file = path.join(DOWNLOAD_DIR, `${name}.csv`);
      await fs.writeFile(file, csv);
      return file;
    }
    default:
      return null;
  }
}
