# notebooklm-sdk

[![npm version](https://img.shields.io/npm/v/notebooklm-sdk?style=flat-square)](https://www.npmjs.com/package/notebooklm-sdk)
![types](https://img.shields.io/npm/types/notebooklm-sdk?style=flat-square)
![license](https://img.shields.io/npm/l/notebooklm-sdk?style=flat-square)

A lightweight, zero-dependency TypeScript SDK for the NotebookLM API.
Works in **Node.js, Bun, and Deno**.

> This SDK is a TypeScript port of [notebooklm-py](https://github.com/teng-lin/notebooklm-py).

---

## Installation

```bash
npm install notebooklm-sdk
# or
bun add notebooklm-sdk
```

## Authentication

### Quick Login (Recommended)

Install Playwright (one-time):

```bash
bun add -d playwright
bunx playwright install chromium
```

Authenticate:

```bash
npx notebooklm-sdk login
```

This opens a real browser for Google sign-in and saves your session to `~/.notebooklm/session.json`.

Then connect with no configuration:

```ts
import { NotebookLMClient } from "notebooklm-sdk";

const client = await NotebookLMClient.connect();
```

To verify your session at any time:

```bash
npx notebooklm-sdk whoami
```

<details>
<summary>Manual / CI Authentication</summary>

#### Cookie string

Copy the `Cookie` header from DevTools → Network and pass it directly or via env:

```ts
const client = await NotebookLMClient.connect({
  cookies: process.env.NOTEBOOKLM_COOKIES,
});
```

#### Cookie file

```ts
const client = await NotebookLMClient.connect({
  cookiesFile: "./session.json",
});
```

#### Auto-discovery order (when called with no args)

1. `~/.notebooklm/session.json` — written by `npx notebooklm-sdk login`
2. `NOTEBOOKLM_COOKIES` env var — raw cookie string

</details>

---

## Notebooks

```ts
const notebooks = await client.notebooks.list();
const nb = await client.notebooks.get(id);

const { id: newId } = await client.notebooks.create("My Notebook");

await client.notebooks.rename(newId, "New Title");
await client.notebooks.delete(newId);

const summary = await client.notebooks.getSummary(id);
const description = await client.notebooks.getDescription(id);
```

---

## Sources

```ts
const sources = await client.sources.list(notebookId);

const { sourceId } = await client.sources.addUrl(notebookId, "https://example.com");
const { sourceId } = await client.sources.addText(notebookId, "Text content", "Title");
const { sourceId } = await client.sources.addFile(notebookId, buffer, "file.pdf");

await client.sources.waitUntilReady(notebookId, sourceId);
await client.sources.delete(notebookId, sourceId);
```

---

## Artifacts

Generate AI outputs from notebook sources.

```ts
const { artifactId } = await client.artifacts.createAudio(notebookId, {
  format: AudioFormat.DEEP_DIVE,
  length: AudioLength.DEFAULT,
});

const { artifactId } = await client.artifacts.createVideo(notebookId, {
  format: VideoFormat.EXPLAINER,
});

const { artifactId } = await client.artifacts.createQuiz(notebookId);
const { artifactId } = await client.artifacts.createFlashcards(notebookId);

const { artifactId } = await client.artifacts.createReport(notebookId, {
  format: "briefing_doc",
});
```

Wait and download:

```ts
await client.artifacts.waitUntilReady(notebookId, artifactId);

const audio    = await client.artifacts.downloadAudio(notebookId, artifactId);
const video    = await client.artifacts.downloadVideo(notebookId, artifactId);
const markdown = await client.artifacts.getReportMarkdown(notebookId, artifactId);
const html     = await client.artifacts.getInteractiveHtml(notebookId, artifactId);
```

---

## Chat

```ts
const res = await client.chat.ask(notebookId, "What is this about?");
console.log(res.answer);

// Follow-up in the same conversation
const follow = await client.chat.ask(notebookId, "Tell me more.", {
  conversationId: res.conversationId,
});

const convId = await client.chat.getLastConversationId(notebookId);
const turns  = await client.chat.getConversationTurns(notebookId, convId);
```

---

## Research

Start a web research session and import results into a notebook:

```ts
const task = await client.research.start(
  notebookId,
  "Latest advances in quantum computing",
  "web",   // "web" | "notebook"
  "fast",  // "fast" | "deep"
);

let result = await client.research.poll(notebookId);
while (result.status === "in_progress") {
  await new Promise((r) => setTimeout(r, 3000));
  result = await client.research.poll(notebookId);
}

if (result.status === "completed") {
  await client.research.importSources(notebookId, result.taskId, result.sources.slice(0, 3));
}
```

---

## Notes

```ts
const { noteId } = await client.notes.create(notebookId, "# My Note");

await client.notes.update(notebookId, noteId, "Updated content");
await client.notes.delete(notebookId, noteId);
```

---

## Sharing

```ts
await client.sharing.setPublic(notebookId, true);

await client.sharing.addUser(notebookId, "user@example.com", SharePermission.VIEWER);
await client.sharing.updateUser(notebookId, "user@example.com", SharePermission.EDITOR);
await client.sharing.removeUser(notebookId, "user@example.com");

const status = await client.sharing.getStatus(notebookId);
```

---

## Settings

```ts
const lang = await client.settings.getOutputLanguage();
await client.settings.setOutputLanguage("ja");
```

---

## Examples

Runnable scripts are in [`examples/`](./examples).

```bash
# Authenticate once
npx notebooklm-sdk login

# Run any example
bun run examples/basic.ts
bun run examples/chat.ts
bun run examples/research.ts
bun run examples/audio.ts
bun run examples/download.ts
```

---

## Error Handling

All errors extend `NotebookLMError`.

```ts
import { ArtifactNotReadyError } from "notebooklm-sdk/errors";

try {
  await client.artifacts.downloadAudio(notebookId, artifactId);
} catch (err) {
  if (err instanceof ArtifactNotReadyError) {
    // still processing
  }
}
```

---

## License

MIT
