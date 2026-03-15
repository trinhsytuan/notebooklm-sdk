# API Reference

Full reference for `notebooklm-sdk`. For setup and quickstart see [README](./README.md).

---

## Table of Contents

- [Client](#client)
- [Notebooks](#notebooks)
- [Sources](#sources)
- [Artifacts](#artifacts)
- [Chat](#chat)
- [Research](#research)
- [Notes](#notes)
- [Sharing](#sharing)
- [Settings](#settings)
- [Error Handling](#error-handling)
- [Types](#types)

---

## Client

### `NotebookLMClient.connect(opts?, clientOpts?)`

Creates an authenticated client. Auto-discovers session if called with no arguments.

```ts
import { NotebookLMClient } from "notebooklm-sdk";

// Zero-config — reads ~/.notebooklm/session.json
const client = await NotebookLMClient.connect();

// Explicit cookie string
const client = await NotebookLMClient.connect({ cookies: "SID=...; HSID=..." });

// Explicit file path
const client = await NotebookLMClient.connect({ cookiesFile: "./session.json" });
```

**Auto-discovery order** (when called with no args):
1. `~/.notebooklm/session.json` — written by `npx notebooklm-sdk login`
2. `NOTEBOOKLM_COOKIES` env var — raw cookie string

**`ConnectOptions`**

| Option | Type | Description |
|---|---|---|
| `cookies` | `string` | Raw `Cookie` header string |
| `cookiesFile` | `string` | Path to a Playwright `storage_state.json` |
| `cookiesObject` | `object` | Pre-parsed cookie map or Playwright storage state |

**`ClientOptions`**

| Option | Type | Default | Description |
|---|---|---|---|
| `timeoutMs` | `number` | `30000` | HTTP request timeout in ms |

### `client.refreshTokens()`

Re-fetches CSRF and session tokens. Call this if you get auth errors mid-session without needing to re-login.

```ts
await client.refreshTokens();
```

---

## Notebooks

### `client.notebooks.list()`

Returns all notebooks for the authenticated user.

```ts
const notebooks = await client.notebooks.list();
// Notebook[]
```

### `client.notebooks.get(notebookId)`

```ts
const nb = await client.notebooks.get("notebook-id");
```

### `client.notebooks.create(title)`

```ts
const { id } = await client.notebooks.create("My Notebook");
```

### `client.notebooks.rename(notebookId, newTitle)`

```ts
await client.notebooks.rename(id, "New Title");
```

### `client.notebooks.delete(notebookId)`

```ts
await client.notebooks.delete(id);
```

### `client.notebooks.getSummary(notebookId)`

Returns a text summary of the notebook's sources.

```ts
const summary = await client.notebooks.getSummary(id);
// string
```

### `client.notebooks.getDescription(notebookId)`

Returns a structured description with suggested topics.

```ts
const desc = await client.notebooks.getDescription(id);
// NotebookDescription { summary, suggestedTopics }
```

---

## Sources

### `client.sources.list(notebookId)`

```ts
const sources = await client.sources.list(notebookId);
// Source[]
```

### `client.sources.addUrl(notebookId, url)`

Adds a URL (webpage or YouTube video) as a source.

```ts
const source = await client.sources.addUrl(notebookId, "https://example.com");
```

### `client.sources.addText(notebookId, text, title?)`

```ts
const source = await client.sources.addText(notebookId, "Plain text content", "My Doc");
```

### `client.sources.addFile(notebookId, buffer, filename, mimeType?)`

Upload a file buffer directly. Supports PDF, Markdown, plain text, etc.

```ts
const buf = await fs.readFile("document.pdf");
const source = await client.sources.addFile(notebookId, buf, "document.pdf", "application/pdf");
```

### `client.sources.waitUntilReady(notebookId, sourceId, timeoutSecs?, pollIntervalSecs?)`

Polls until the source finishes processing. Throws `SourceTimeoutError` or `SourceProcessingError` on failure.

```ts
await client.sources.waitUntilReady(notebookId, source.id);
await client.sources.waitUntilReady(notebookId, source.id, 120, 3); // 120s timeout, 3s interval
```

### `client.sources.delete(notebookId, sourceId)`

```ts
await client.sources.delete(notebookId, source.id);
```

---

## Artifacts

Artifacts are AI-generated outputs: podcasts, videos, reports, quizzes, and flashcards.

### Create (async — poll to completion)

Most artifact methods return a `GenerationStatus` with an `artifactId`. Use `waitUntilReady` to poll until done.

```ts
// Audio Overview (podcast)
const { artifactId } = await client.artifacts.createAudio(notebookId, {
  format: "deep_dive",   // "deep_dive" | "brief" | "critique" | "debate"
  length: "default",     // "default" | "short" | "long"
  language: "en",
});

// Video Overview
const { artifactId } = await client.artifacts.createVideo(notebookId, {
  format: "explainer",   // "explainer" | "brief" | "cinematic"
  style: "classic",      // "auto_select" | "classic" | "whiteboard" | "kawaii" | ...
});

// Report
const { artifactId } = await client.artifacts.createReport(notebookId, {
  format: "briefing_doc", // "briefing_doc" | "study_guide" | "blog_post" | "custom"
  customPrompt: "...",    // required when format is "custom"
  language: "en",
});

// Slide Deck
const { artifactId } = await client.artifacts.createSlideDeck(notebookId, {
  format: "detailed_deck", // "detailed_deck" | "presenter_slides"
  length: "default",       // "default" | "short"
});

// Infographic
const { artifactId } = await client.artifacts.createInfographic(notebookId, {
  orientation: "landscape", // "landscape" | "portrait" | "square"
  detail: "standard",       // "concise" | "standard" | "detailed"
  style: "professional",    // "auto_select" | "professional" | "bento_grid" | ...
});

// Data Table
const { artifactId } = await client.artifacts.createDataTable(notebookId);

// Quiz / Flashcards
const { artifactId } = await client.artifacts.createQuiz(notebookId);
const { artifactId } = await client.artifacts.createFlashcards(notebookId);
```

### `client.artifacts.createMindMap(notebookId, sourceIds?)`

Mind maps are **synchronous** — content is generated and returned immediately, then saved as a note. Returns the saved `Note`. Retrieve existing mind maps with `client.notes.listMindMaps()`.

```ts
const note = await client.artifacts.createMindMap(notebookId);
const json = JSON.parse(note.content);

// List previously generated mind maps
const mindMaps = await client.notes.listMindMaps(notebookId);
```

### `client.artifacts.list(notebookId)`

```ts
const artifacts = await client.artifacts.list(notebookId);
// Artifact[]
```

### `client.artifacts.waitUntilReady(notebookId, artifactId, timeoutSecs?, pollIntervalSecs?)`

Polls until artifact generation completes. Generation typically takes 1–10 minutes.

```ts
const artifact = await client.artifacts.waitUntilReady(notebookId, artifactId);
await client.artifacts.waitUntilReady(notebookId, artifactId, 600, 5); // 10min timeout
```

### Download

```ts
// Returns Buffer
const mp3  = await client.artifacts.downloadAudio(notebookId, artifactId);
const mp4  = await client.artifacts.downloadVideo(notebookId, artifactId);
const pdf  = await client.artifacts.downloadSlideDeck(notebookId, artifactId, "pdf");
const pptx = await client.artifacts.downloadSlideDeck(notebookId, artifactId, "pptx");
const png  = await client.artifacts.downloadInfographic(notebookId, artifactId);

// Returns string
const markdown = await client.artifacts.getReportMarkdown(notebookId, artifactId);
const html     = await client.artifacts.getInteractiveHtml(notebookId, artifactId); // quiz/flashcards

// Returns DataTableContent | null
const table = await client.artifacts.getDataTableContent(notebookId, artifactId);
// { headers: string[], rows: string[][] }
```

---

## Chat

### `client.chat.ask(notebookId, question, opts?)`

Asks a question grounded in the notebook's sources. Returns the answer with source references.

```ts
const res = await client.chat.ask(notebookId, "What is this notebook about?");
console.log(res.answer);
console.log(res.references); // ChatReference[]
console.log(res.conversationId);
```

**Continue a conversation:**

```ts
const follow = await client.chat.ask(notebookId, "Tell me more.", {
  conversationId: res.conversationId,
});
```

### `client.chat.getLastConversationId(notebookId)`

```ts
const convId = await client.chat.getLastConversationId(notebookId);
```

### `client.chat.getConversationTurns(notebookId, conversationId)`

Returns the full history of a conversation.

```ts
const turns = await client.chat.getConversationTurns(notebookId, convId);
// ConversationTurn[] — { query, answer, turnNumber }
```

---

## Research

Run a web research session and import the results as notebook sources.

### `client.research.start(notebookId, query, source?, mode?)`

| Param | Type | Default | Description |
|---|---|---|---|
| `source` | `"web" \| "notebook"` | `"web"` | Research source |
| `mode` | `"fast" \| "deep"` | `"fast"` | Research depth |

```ts
const task = await client.research.start(notebookId, "Latest AI models", "web", "fast");
```

### `client.research.poll(notebookId)`

Returns current research status. Poll until `status === "completed"`.

```ts
let result = await client.research.poll(notebookId);
while (result.status === "in_progress") {
  await new Promise((r) => setTimeout(r, 3000));
  result = await client.research.poll(notebookId);
}
// result.status, result.sources, result.summary, result.taskId
```

### `client.research.importSources(notebookId, taskId, sources)`

Imports selected research results into the notebook as sources.

```ts
if (result.status === "completed") {
  const imported = await client.research.importSources(
    notebookId,
    result.taskId,
    result.sources.slice(0, 3),
  );
}
```

---

## Notes

User-created text notes. Distinct from AI-generated artifacts — notes are written by the user via "Add note" in the UI.

### `client.notes.list(notebookId)`

Returns all user-created text notes. Mind maps are excluded.

```ts
const notes = await client.notes.list(notebookId);
// Note[] — { id, title, content, createdAt, updatedAt }
```

### `client.notes.listMindMaps(notebookId)`

Returns mind maps saved in the notebook. Mind maps are stored as notes internally but contain JSON with `children`/`nodes` keys.

```ts
const mindMaps = await client.notes.listMindMaps(notebookId);
for (const mm of mindMaps) {
  const json = JSON.parse(mm.content);
}
```

### `client.notes.create(notebookId, content, title?)`

```ts
const note = await client.notes.create(notebookId, "# My Note\n\nContent here.", "My Note");
console.log(note.id);
```

### `client.notes.update(notebookId, noteId, content, title?)`

```ts
await client.notes.update(notebookId, note.id, "Updated content.", "New Title");
```

### `client.notes.delete(notebookId, noteId)`

```ts
await client.notes.delete(notebookId, note.id);
```

---

## Sharing

### `client.sharing.getStatus(notebookId)`

Returns the current sharing state including public access and user list.

```ts
const status = await client.sharing.getStatus(notebookId);
// { isPublic, access, viewLevel, sharedUsers, shareUrl }
```

### `client.sharing.setPublic(notebookId, isPublic)`

```ts
await client.sharing.setPublic(notebookId, true);
```

### `client.sharing.addUser(notebookId, email, permission)`

```ts
import { SharePermission } from "notebooklm-sdk";

await client.sharing.addUser(notebookId, "user@example.com", SharePermission.VIEWER);
```

**`SharePermission`**

| Value | Description |
|---|---|
| `VIEWER` | Read-only access |
| `EDITOR` | Can edit sources and notes |
| `OWNER` | Full control |

### `client.sharing.updateUser(notebookId, email, permission)`

```ts
await client.sharing.updateUser(notebookId, "user@example.com", SharePermission.EDITOR);
```

### `client.sharing.removeUser(notebookId, email)`

```ts
await client.sharing.removeUser(notebookId, "user@example.com");
```

---

## Settings

### `client.settings.getOutputLanguage()`

```ts
const lang = await client.settings.getOutputLanguage();
// "en", "ja", "fr", etc.
```

### `client.settings.setOutputLanguage(languageCode)`

```ts
await client.settings.setOutputLanguage("ja");
```

---

## Error Handling

All errors extend `NotebookLMError` and can be imported from `notebooklm-sdk/errors`.

```ts
import {
  NotebookLMError,
  AuthError,
  ArtifactNotReadyError,
  SourceTimeoutError,
  RateLimitError,
} from "notebooklm-sdk/errors";

try {
  await client.artifacts.downloadAudio(notebookId, artifactId);
} catch (err) {
  if (err instanceof AuthError) {
    // Session expired — run: npx notebooklm-sdk login
  } else if (err instanceof ArtifactNotReadyError) {
    // Artifact still generating
  } else if (err instanceof RateLimitError) {
    // Too many requests
    console.log("Retry after:", err.retryAfter);
  } else if (err instanceof NotebookLMError) {
    // Any other SDK error
  }
}
```

**Error hierarchy**

```
NotebookLMError
├── NetworkError
│   └── RPCTimeoutError
├── RPCError
│   ├── AuthError
│   ├── RateLimitError
│   ├── ServerError
│   └── ClientError
├── NotebookError
│   └── NotebookNotFoundError
├── SourceError
│   ├── SourceNotFoundError
│   ├── SourceAddError
│   ├── SourceProcessingError
│   └── SourceTimeoutError
├── ArtifactError
│   ├── ArtifactNotFoundError
│   ├── ArtifactNotReadyError
│   ├── ArtifactParseError
│   └── ArtifactDownloadError
└── ChatError
```

---

## Types

Key types exported from `notebooklm-sdk`:

```ts
import type {
  Notebook,
  Source,
  Artifact,
  ArtifactStatus,
  ArtifactType,
  Note,
  ShareStatus,
  SharedUser,
  AskResult,
  ChatReference,
  ConversationTurn,
} from "notebooklm-sdk";
```

| Type | Description |
|---|---|
| `Notebook` | `{ id, title, createdAt, sourcesCount, isOwner }` |
| `Source` | `{ id, title, url, kind, status, createdAt }` |
| `Artifact` | `{ id, title, kind, status, notebookId, audioUrl, videoUrl, content }` |
| `AskResult` | `{ answer, conversationId, turnNumber, references }` |
| `ShareStatus` | `{ isPublic, access, viewLevel, sharedUsers, shareUrl }` |
