/**
 * Login example — run this once to authenticate:
 *   npx notebooklm-sdk login
 *
 * After that, connect with no arguments:
 *   const client = await NotebookLMClient.connect();
 */
import { NotebookLMClient } from "../src/index.js";

async function main() {
  // Zero-config: auto-discovers ~/.notebooklm/session.json
  const client = await NotebookLMClient.connect();

  console.log("Session valid. Last 3 notebooks:");
  const notebooks = await client.notebooks.list();
  for (const nb of notebooks.slice(0, 3)) {
    console.log(`- ${nb.title} (${nb.id})`);
  }
}

main().catch(console.error);
