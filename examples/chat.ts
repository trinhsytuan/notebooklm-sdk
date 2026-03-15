import { ChatGoal, ChatMode, ChatResponseLength, NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();
const nb = (await client.notebooks.list())[0];
console.log(`Notebook: ${nb.title}`);

// Set chat mode (persists on server) — preset combinations
await client.chat.setMode(nb.id, ChatMode.CONCISE);

// Or use configure() for custom instructions / fine-grained control:
// await client.chat.configure(nb.id, ChatGoal.CUSTOM, ChatResponseLength.DEFAULT,
//   "You are a concise summarizer. Always respond in bullet points.");
// await client.chat.configure(nb.id, ChatGoal.LEARNING_GUIDE, ChatResponseLength.LONGER);

const result = await client.chat.ask(
  nb.id,
  "What is this notebook about? Give a 1-sentence summary.",
);
console.log(`Answer: ${result.answer}`);
console.log(`References: ${result.references.length}`);

// Follow-up in the same conversation
const result2 = await client.chat.ask(nb.id, "What's the main topic in one word?", {
  conversationId: result.conversationId,
});
console.log(`Follow-up: ${result2.answer}`);
