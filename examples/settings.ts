import { NotebookLMClient } from "../src/index.js";

const client = await NotebookLMClient.connect();

const lang = await client.settings.getOutputLanguage();
console.log(`Output language: ${lang}`);

const nb = (await client.notebooks.list())[0];
const status = await client.sharing.getStatus(nb.id);
console.log(`Notebook: ${nb.title}`);
console.log(`  isPublic:    ${status.isPublic}`);
console.log(`  sharedUsers: ${status.sharedUsers.length}`);
console.log(`  shareUrl:    ${status.shareUrl ?? "(none)"}`);
