# notebooklm-sdk

[![npm version](https://img.shields.io/npm/v/notebooklm-sdk?style=flat-square)](https://www.npmjs.com/package/notebooklm-sdk)
![types](https://img.shields.io/npm/types/notebooklm-sdk?style=flat-square)
![license](https://img.shields.io/npm/l/notebooklm-sdk?style=flat-square)

Unofficial TypeScript SDK for [NotebookLM](https://notebooklm.google.com). Manage notebooks, add sources, generate podcasts and reports, and chat with your sources — all from Node.js, Bun, or Deno.

> **Unofficial.** This SDK reverse-engineers the NotebookLM internal API. It may break when Google updates their service. Not affiliated with Google.

---

## Install

```bash
npm install notebooklm-sdk
# or
bun add notebooklm-sdk
```

## Quickstart

```ts
import { NotebookLMClient } from "notebooklm-sdk";

const client = await NotebookLMClient.connect(); // uses ~/.notebooklm/session.json

// Create a notebook and add a source
const { id } = await client.notebooks.create("My Research");
await client.sources.addUrl(id, "https://en.wikipedia.org/wiki/TypeScript");

// Generate a podcast and download it
const { artifactId } = await client.artifacts.createAudio(id, { format: "deep_dive" });
const audio = await client.artifacts.waitUntilReady(id, artifactId);
const mp3 = await client.artifacts.downloadAudio(id, audio.id);

// Chat with the sources
const res = await client.chat.ask(id, "Summarize the key points.");
console.log(res.answer);
```

---

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

---

## What you can build

| API | What it does |
|---|---|
| `notebooks` | Create, rename, delete, list notebooks |
| `sources` | Add URLs, text, files; wait for processing |
| `artifacts` | Generate podcasts, videos, reports, quizzes, flashcards |
| `chat` | Ask questions, follow-up conversations |
| `research` | Run web research, import results as sources |
| `notes` | Create and manage saved notes |
| `sharing` | Control public access and per-user permissions |
| `settings` | Get/set output language |

→ [Full API reference](./DOCS.md)

---

## Examples

```bash
npx notebooklm-sdk login

bun run examples/basic.ts
bun run examples/chat.ts
bun run examples/audio.ts
bun run examples/research.ts
bun run examples/download.ts
```

---

## License

MIT · TypeScript port of [notebooklm-py](https://github.com/teng-lin/notebooklm-py)
