import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { type BrowserContext, chromium, type Page } from "playwright";
import { type CookieMap, loadCookiesFromObject } from "../auth.js";

/** Default directory for storing NotebookLM session files (~/.notebooklm). */
export const DEFAULT_SESSION_DIR = join(homedir(), ".notebooklm");
/** Default session file path (~/.notebooklm/session.json). */
export const DEFAULT_SESSION_FILE = join(DEFAULT_SESSION_DIR, "session.json");

export interface LoginOptions {
  /**
   * Path to a directory for a persistent browser profile.
   * Defaults to ~/.notebooklm/.auth_profile.
   */
  persistFolder?: string;
  /**
   * Browser type to use. Default is "chromium".
   */
  browserType?: "chromium" | "msedge";
  /**
   * Whether to run the browser in headless mode. Default is false.
   * Headless login is usually blocked by Google, so this is mostly for testing or refreshes.
   */
  headless?: boolean;
}

const NOTEBOOKLM_URL = "https://notebook.google.com/";
const GOOGLE_ACCOUNTS_URL = "https://accounts.google.com/";
const LOGIN_URL = `https://accounts.google.com/ServiceLogin?continue=${encodeURIComponent(NOTEBOOKLM_URL)}`;

async function hasAuthCookie(context: BrowserContext): Promise<boolean> {
  const cookies = await context.cookies(["https://notebook.google.com", "https://accounts.google.com"]);
  return cookies.some((c) => c.name === "SID" && c.value);
}

/** Wait (no timeout) until the user has signed in and is back on NotebookLM. */
async function waitForLogin(context: BrowserContext, page: Page): Promise<void> {
  let closed = false;
  context.on("close", () => {
    closed = true;
  });

  while (true) {
    if (closed || page.isClosed()) {
      throw new Error("Browser was closed before login completed.");
    }
    const host = new URL(page.url()).hostname;
    if (
      (host === "notebook.google.com" || host === "notebooklm.google.com") &&
      (await hasAuthCookie(context))
    ) {
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

/**
 * Log in to NotebookLM via a headful browser window.
 *
 * Flow:
 * 1. Opens browser to NotebookLM.
 * 2. If already logged in (via persistFolder), it proceeds.
 * 3. If not, it waits for the user to reach the home page.
 * 4. Captures cookies and returns them.
 */
export async function login(opts: LoginOptions = {}): Promise<{
  cookies: CookieMap;
  storageState: any;
  cookieHeader: string;
}> {
  const {
    persistFolder = join(DEFAULT_SESSION_DIR, ".auth_profile"),
    headless = false,
    browserType = "chromium",
  } = opts;

  // Pre-flight: verify Playwright browser is installed
  try {
    chromium.executablePath();
  } catch {
    throw new Error("Playwright browser not found. Run: npx playwright install chromium");
  }

  // Ensure the session directory exists
  if (!existsSync(DEFAULT_SESSION_DIR)) {
    mkdirSync(DEFAULT_SESSION_DIR, { recursive: true });
  }

  let context: BrowserContext;

  const launchOptions = {
    headless,
    args: ["--disable-blink-features=AutomationControlled"],
  };

  context = await chromium.launchPersistentContext(persistFolder, {
    ...launchOptions,
    channel: browserType === "msedge" ? "msedge" : undefined,
  });

  const page = context.pages()[0] || (await context.newPage());
  await page.goto(NOTEBOOKLM_URL);

  // Unauthenticated visits to notebook.google.com land on a marketing page (HTTP 200)
  // instead of redirecting to accounts.google.com, so detect login state via the SID cookie.
  if (!(await hasAuthCookie(context))) {
    console.log("Please log in to Google in the browser window...");
    await page.goto(LOGIN_URL);
    await waitForLogin(context, page);
  }

  // Ensure we are fully loaded on the accounts domain too to capture those cookies
  await page.goto(GOOGLE_ACCOUNTS_URL, { waitUntil: "load" });
  await page.goto(NOTEBOOKLM_URL, { waitUntil: "load" });

  const storageState = await context.storageState();
  const cookies = loadCookiesFromObject(storageState as any);

  await context.close();

  return {
    cookies,
    storageState,
    cookieHeader: Object.entries(cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join("; "),
  };
}
