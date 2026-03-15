---
"notebooklm-sdk": patch
---

feat: add sources.addDrive, chat.configure, and artifact list helpers

- `sources.addDrive(notebookId, fileId, title, mimeType?)` — add a Google Drive file as a source; new `DriveMimeType` enum
- `chat.configure(notebookId, goal, length, customPrompt?)` — low-level chat config with new `ChatGoal` and `ChatResponseLength` enums
- `artifacts.listAudio/Video/Reports/Quizzes/Flashcards/Infographics/SlideDecks/DataTables` — type-filtered list helpers
