<div align="center">
<img src="https://cdn.worldvectorlogo.com/logos/google-notebooklm-logo-icon.svg" width="48" alt="NotebookLM SDK" />
<h1>notebooklm-sdk</h1>

<p>Automate NotebookLM from your code.</p>

<p>Generate AI podcasts, chat with documents, run web research, and manage notebooks programmatically — from Node.js, Bun, or Deno.</p>

[![npm version](https://img.shields.io/npm/v/notebooklm-sdk?style=flat-square)](https://www.npmjs.com/package/notebooklm-sdk)
![types](https://img.shields.io/npm/types/notebooklm-sdk?style=flat-square)
![license](https://img.shields.io/npm/l/notebooklm-sdk?style=flat-square)

</div>

> _**Unofficial.** This SDK reverse-engineers the NotebookLM internal API. It may break when Google updates their service. Not affiliated with Google._

TypeScript port of [notebooklm-py](https://github.com/teng-lin/notebooklm-py).

## Install

```bash
npm install notebooklm-sdk
# or
bun add notebooklm-sdk
```

## Quickstart

```bash
# Run once to authenticate
npx notebooklm-sdk login
```

```ts
import { NotebookLMClient } from "notebooklm-sdk";

const client = await NotebookLMClient.connect(); // uses ~/.notebooklm/session.json

// Create a notebook and add a source
const { id } = await client.notebooks.create("My Research");
await client.sources.addUrl(id, "https://en.wikipedia.org/wiki/TypeScript");

// Generate a podcast and download it
const { artifactId } = await client.artifacts.createAudio(id, {
  format: "deep_dive",
});
const audio = await client.artifacts.waitUntilReady(id, artifactId);
const mp3 = await client.artifacts.downloadAudio(id, audio.id);

// Chat with the sources
const res = await client.chat.ask(id, "Summarize the key points.");
console.log(res.answer);
```

## Use cases

- **Blog & content generation** — research a topic, import sources, generate a briefing doc automatically
- **Content pipelines** — ingest articles or reports, generate a podcast or briefing doc on a schedule
- **Research automation** — run web research, import results, and query them via chat
- **Document Q&A bots** — feed documents into a notebook and build a chat interface on top
- **Batch artifact generation** — generate quizzes, flashcards, or study guides from a library of sources
- **Notebook management** — create, organize, and share notebooks programmatically

## Authentication

### Login (recommended)

Install Playwright once:

```bash
bun add -d playwright
bunx playwright install chromium
```

Authenticate:

```bash
npx notebooklm-sdk login
```

Opens a real Chrome window for Google sign-in. Session is saved to `~/.notebooklm/session.json` and auto-discovered on every `connect()` — no config needed.

```bash
npx notebooklm-sdk whoami  # verify session is valid
```

### CI / Server

Pass cookies via environment variable:

```bash
NOTEBOOKLM_COOKIES="SID=...; HSID=..."
```

```ts
const client = await NotebookLMClient.connect({
  cookies: process.env.NOTEBOOKLM_COOKIES,
});
```

> To get cookie values: open NotebookLM in Chrome → DevTools → Network → any request → copy the `Cookie` header.

**API surface**

| API         | What it does                                            |
| ----------- | ------------------------------------------------------- |
| `notebooks` | Create, rename, delete, list notebooks                  |
| `sources`   | Add URLs, text, files; wait for processing              |
| `artifacts` | Generate and download AI outputs (see below)            |
| `chat`      | Ask questions, follow-up conversations                  |
| `research`  | Run web research, import results as sources             |
| `notes`     | Create and manage saved notes                           |
| `sharing`   | Control public access and per-user permissions          |
| `settings`  | Get/set output language                                 |

**Artifact types**

| Artifact       | Method               | Output            |
| -------------- | -------------------- | ----------------- |
| Audio Overview | `createAudio()`      | Downloadable MP3  |
| Video Overview | `createVideo()`      | Downloadable MP4  |
| Slide Deck     | `createSlideDeck()`  | PDF / PPTX download |
| Infographic    | `createInfographic()`| PNG download      |
| Mind Map       | `createMindMap()`    | JSON download     |
| Reports        | `createReport()`     | Markdown download |
| Flashcards     | `createFlashcards()` | Interactive HTML  |
| Quiz           | `createQuiz()`       | Interactive HTML  |
| Data Table     | `createDataTable()`  | CSV (headers + rows) |

[Full API reference →](./DOCS.md)

## Examples

```bash
npx notebooklm-sdk login

bun run examples/basic.ts           # list notebooks and sources
bun run examples/chat.ts            # ask questions, follow-up conversations
bun run examples/audio.ts           # generate and download a podcast
bun run examples/video.ts           # generate and download a cinematic video
bun run examples/report.ts          # generate and download a briefing doc
bun run examples/slide-deck.ts      # generate and download PDF / PPTX
bun run examples/infographic.ts     # generate and download a PNG infographic
bun run examples/mind-map.ts        # generate and download mind map JSON
bun run examples/data-table.ts      # generate and download a CSV data table
bun run examples/notes.ts           # create, update, list, and delete notes
bun run examples/research.ts        # web research and import sources
bun run examples/research-and-chat.ts  # research → import → chat
bun run examples/full-lifecycle.ts  # create, add sources, chat, delete
bun run examples/download.ts        # download all completed artifacts
```

## Requirements

- Node.js 18+ or Bun 1.0+
- A Google account with access to [NotebookLM](https://notebooklm.google.com)

## Contributing

Issues and PRs welcome. If the API breaks after a Google update, please open an issue with the error and request/response details.

## License

MIT
