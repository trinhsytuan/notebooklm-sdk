---
"notebooklm-sdk": minor
---

Add 7 new API methods reaching parity with the Python SDK

**New artifact methods:**
- `artifacts.reviseSlide(notebookId, artifactId, slideIndex, prompt)` — edit an individual slide in a completed slide deck
- `artifacts.suggestReports(notebookId)` — get AI-suggested report formats based on notebook content

**New source methods:**
- `sources.getGuide(notebookId, sourceId)` — get the AI-generated Source Guide (summary + keywords)
- `sources.getFulltext(notebookId, sourceId)` — get the full indexed text content of a source
- `sources.checkFreshness(notebookId, sourceId)` — check if a URL source has newer content available

**New notebook method:**
- `notebooks.removeFromRecent(notebookId)` — remove a notebook from the recently viewed list

**New chat method:**
- `chat.setMode(notebookId, mode)` — set chat response style with `ChatMode` enum (`DEFAULT`, `CONCISE`, `DETAILED`, `LEARNING_GUIDE`)

**New exported types:** `ReportSuggestion`, `SourceGuide`, `SourceFulltext` (expanded), `ChatMode`, `ChatModeValue`
