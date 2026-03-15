#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { DEFAULT_SESSION_DIR, DEFAULT_SESSION_FILE, login } from "./auth/browser.js";
import { connect } from "./auth.js";

async function run() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "login") {
    console.log("Starting browser login flow...");
    console.log("A browser window will open. Please log in to your Google account.");

    try {
      const authResult = await login();

      writeFileSync(DEFAULT_SESSION_FILE, JSON.stringify(authResult.storageState, null, 2));

      console.log("\nLogin successful!");
      console.log(`Session saved to: ${DEFAULT_SESSION_FILE}`);
      console.log("\nIn your code:");
      console.log("  const client = await NotebookLMClient.connect();");
    } catch (error) {
      console.error("Login failed:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  } else if (command === "whoami") {
    try {
      const auth = await connect();
      console.log("Session valid");
      console.log(`Session file: ${DEFAULT_SESSION_FILE}`);
      console.log(`CSRF token:   ${auth.csrfToken.slice(0, 8)}...`);
    } catch (error) {
      console.error("Not authenticated:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  } else {
    console.log("NotebookLM SDK CLI");
    console.log("\nUsage:");
    console.log("  npx notebooklm-sdk login     Authenticate via browser");
    console.log("  npx notebooklm-sdk whoami    Check current session");
    process.exit(command ? 1 : 0);
  }
}

run();
