import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/types/enums.ts
var enums_exports = {};
__export(enums_exports, {
  ArtifactStatusCode: () => ArtifactStatusCode,
  ArtifactTypeCode: () => ArtifactTypeCode,
  AudioFormat: () => AudioFormat,
  AudioLength: () => AudioLength,
  ChatGoal: () => ChatGoal,
  ChatMode: () => ChatMode,
  ChatResponseLength: () => ChatResponseLength,
  DriveMimeType: () => DriveMimeType,
  ExportType: () => ExportType,
  InfographicDetail: () => InfographicDetail,
  InfographicOrientation: () => InfographicOrientation,
  InfographicStyle: () => InfographicStyle,
  QuizDifficulty: () => QuizDifficulty,
  QuizQuantity: () => QuizQuantity,
  RPCMethod: () => RPCMethod,
  ShareAccess: () => ShareAccess,
  SharePermission: () => SharePermission,
  ShareViewLevel: () => ShareViewLevel,
  SlideDeckFormat: () => SlideDeckFormat,
  SlideDeckLength: () => SlideDeckLength,
  SourceStatusCode: () => SourceStatusCode,
  VideoFormat: () => VideoFormat,
  VideoStyle: () => VideoStyle,
  artifactStatusFromCode: () => artifactStatusFromCode,
  artifactTypeFromCode: () => artifactTypeFromCode,
  chatModeToParams: () => chatModeToParams,
  sourceStatusFromCode: () => sourceStatusFromCode,
  sourceTypeFromCode: () => sourceTypeFromCode
});
function sourceTypeFromCode(code) {
  if (code == null) return "unknown";
  return SOURCE_TYPE_MAP[code] ?? "unknown";
}
function artifactTypeFromCode(typeCode, variant) {
  if (typeCode === 4) {
    if (variant === 1) return "flashcards";
    if (variant === 2) return "quiz";
    return "unknown";
  }
  return ARTIFACT_TYPE_MAP[typeCode] ?? "unknown";
}
function artifactStatusFromCode(code) {
  return ARTIFACT_STATUS_MAP[code] ?? "unknown";
}
function sourceStatusFromCode(code) {
  return SOURCE_STATUS_MAP[code] ?? "unknown";
}
function chatModeToParams(mode) {
  return CHAT_MODE_PARAMS[mode];
}
var RPCMethod, ArtifactTypeCode, ArtifactStatusCode, SourceStatusCode, AudioFormat, AudioLength, VideoFormat, VideoStyle, QuizQuantity, QuizDifficulty, InfographicOrientation, InfographicDetail, InfographicStyle, SlideDeckFormat, SlideDeckLength, ExportType, DriveMimeType, SOURCE_TYPE_MAP, ARTIFACT_TYPE_MAP, ARTIFACT_STATUS_MAP, SOURCE_STATUS_MAP, ChatMode, CHAT_MODE_PARAMS, ChatGoal, ChatResponseLength, ShareAccess, ShareViewLevel, SharePermission;
var init_enums = __esm({
  "src/types/enums.ts"() {
    RPCMethod = {
      // Notebook
      LIST_NOTEBOOKS: "wXbhsf",
      CREATE_NOTEBOOK: "CCqFvf",
      GET_NOTEBOOK: "rLM1Ne",
      RENAME_NOTEBOOK: "s0tc2d",
      DELETE_NOTEBOOK: "WWINqb",
      // Sources
      ADD_SOURCE: "izAoDd",
      ADD_SOURCE_FILE: "o4cbdc",
      DELETE_SOURCE: "tGMBJ",
      GET_SOURCE: "hizoJc",
      REFRESH_SOURCE: "FLmJqe",
      CHECK_SOURCE_FRESHNESS: "yR9Yof",
      UPDATE_SOURCE: "b7Wfje",
      // Summary
      SUMMARIZE: "VfAZjd",
      GET_SOURCE_GUIDE: "tr032e",
      GET_SUGGESTED_REPORTS: "ciyUvf",
      // Artifacts
      CREATE_ARTIFACT: "R7cb6c",
      LIST_ARTIFACTS: "gArtLc",
      DELETE_ARTIFACT: "V5N4be",
      RENAME_ARTIFACT: "rc3d8d",
      EXPORT_ARTIFACT: "Krh3pd",
      SHARE_ARTIFACT: "RGP97b",
      GET_INTERACTIVE_HTML: "v9rmvd",
      REVISE_SLIDE: "KmcKPe",
      // Research
      START_FAST_RESEARCH: "Ljjv0c",
      START_DEEP_RESEARCH: "QA9ei",
      POLL_RESEARCH: "e3bVqc",
      IMPORT_RESEARCH: "LBwxtb",
      // Notes / Mind Maps
      GENERATE_MIND_MAP: "yyryJe",
      CREATE_NOTE: "CYK0Xb",
      GET_NOTES_AND_MIND_MAPS: "cFji9",
      UPDATE_NOTE: "cYAfTb",
      DELETE_NOTE: "AH0mwd",
      // Conversation
      GET_LAST_CONVERSATION_ID: "hPTbtc",
      GET_CONVERSATION_TURNS: "khqZz",
      // Sharing
      SHARE_NOTEBOOK: "QDyure",
      GET_SHARE_STATUS: "JFMDGd",
      // Misc
      REMOVE_RECENTLY_VIEWED: "fejl7e",
      GET_USER_SETTINGS: "ZwVcOc",
      SET_USER_SETTINGS: "hT54vc"
    };
    ArtifactTypeCode = {
      AUDIO: 1,
      REPORT: 2,
      VIDEO: 3,
      QUIZ: 4,
      MIND_MAP: 5,
      INFOGRAPHIC: 7,
      SLIDE_DECK: 8,
      DATA_TABLE: 9
    };
    ArtifactStatusCode = {
      PROCESSING: 1,
      PENDING: 2,
      COMPLETED: 3,
      FAILED: 4
    };
    SourceStatusCode = {
      PROCESSING: 1,
      READY: 2,
      ERROR: 3,
      PREPARING: 5
    };
    AudioFormat = {
      DEEP_DIVE: 1,
      BRIEF: 2,
      CRITIQUE: 3,
      DEBATE: 4
    };
    AudioLength = {
      SHORT: 1,
      DEFAULT: 2,
      LONG: 3
    };
    VideoFormat = {
      EXPLAINER: 1,
      BRIEF: 2,
      CINEMATIC: 3
    };
    VideoStyle = {
      AUTO_SELECT: 1,
      CUSTOM: 2,
      CLASSIC: 3,
      WHITEBOARD: 4,
      KAWAII: 5,
      ANIME: 6,
      WATERCOLOR: 7,
      RETRO_PRINT: 8,
      HERITAGE: 9,
      PAPER_CRAFT: 10
    };
    QuizQuantity = {
      FEWER: 1,
      STANDARD: 2,
      MORE: 2
      // API limitation: same as STANDARD
    };
    QuizDifficulty = {
      EASY: 1,
      MEDIUM: 2,
      HARD: 3
    };
    InfographicOrientation = {
      LANDSCAPE: 1,
      PORTRAIT: 2,
      SQUARE: 3
    };
    InfographicDetail = {
      CONCISE: 1,
      STANDARD: 2,
      DETAILED: 3
    };
    InfographicStyle = {
      AUTO_SELECT: 1,
      SKETCH_NOTE: 2,
      PROFESSIONAL: 3,
      BENTO_GRID: 4,
      EDITORIAL: 5,
      INSTRUCTIONAL: 6,
      BRICKS: 7,
      CLAY: 8,
      ANIME: 9,
      KAWAII: 10,
      SCIENTIFIC: 11
    };
    SlideDeckFormat = {
      DETAILED_DECK: 1,
      PRESENTER_SLIDES: 2
    };
    SlideDeckLength = {
      DEFAULT: 1,
      SHORT: 2
    };
    ExportType = {
      DOCS: 1,
      SHEETS: 2
    };
    DriveMimeType = {
      GOOGLE_DOC: "application/vnd.google-apps.document",
      GOOGLE_SLIDES: "application/vnd.google-apps.presentation",
      GOOGLE_SHEETS: "application/vnd.google-apps.spreadsheet",
      PDF: "application/pdf"
    };
    SOURCE_TYPE_MAP = {
      1: "google_docs",
      2: "google_slides",
      3: "pdf",
      4: "pasted_text",
      5: "web_page",
      8: "markdown",
      9: "youtube",
      10: "media",
      11: "docx",
      13: "image",
      14: "google_spreadsheet",
      16: "csv"
    };
    ARTIFACT_TYPE_MAP = {
      1: "audio",
      2: "report",
      3: "video",
      5: "mind_map",
      7: "infographic",
      8: "slide_deck",
      9: "data_table"
    };
    ARTIFACT_STATUS_MAP = {
      1: "in_progress",
      2: "pending",
      3: "completed",
      4: "failed"
    };
    SOURCE_STATUS_MAP = {
      1: "processing",
      2: "ready",
      3: "error",
      5: "preparing"
    };
    ChatMode = {
      /** General purpose — balanced length and style. */
      DEFAULT: "default",
      /** Educational focus with longer, learning-oriented responses. */
      LEARNING_GUIDE: "learning_guide",
      /** Short, concise answers. */
      CONCISE: "concise",
      /** Verbose, detailed answers. */
      DETAILED: "detailed"
    };
    CHAT_MODE_PARAMS = {
      default: [1, 1],
      learning_guide: [3, 4],
      concise: [1, 5],
      detailed: [1, 4]
    };
    ChatGoal = {
      /** General purpose research and brainstorming. */
      DEFAULT: 1,
      /** Custom instructions (up to 10,000 characters). */
      CUSTOM: 2,
      /** Educational focus with learning-oriented responses. */
      LEARNING_GUIDE: 3
    };
    ChatResponseLength = {
      /** Standard response length. */
      DEFAULT: 1,
      /** Verbose, detailed responses. */
      LONGER: 4,
      /** Concise, brief responses. */
      SHORTER: 5
    };
    ShareAccess = {
      /** Only explicitly shared users can access */
      RESTRICTED: 0,
      /** Anyone with the link can access */
      ANYONE_WITH_LINK: 1
    };
    ShareViewLevel = {
      /** Chat + sources + notes */
      FULL_NOTEBOOK: 0,
      /** Chat interface only */
      CHAT_ONLY: 1
    };
    SharePermission = {
      OWNER: 1,
      EDITOR: 2,
      VIEWER: 3,
      /** Internal: remove user from share list */
      _REMOVE: 4
    };
  }
});

// src/api/artifacts.ts
init_enums();

// src/types/errors.ts
var NotebookLMError = class extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};
var NetworkError = class extends NotebookLMError {
  methodId;
  originalError;
  constructor(message, opts = {}) {
    super(message);
    this.methodId = opts.methodId;
    this.originalError = opts.originalError;
  }
};
var RPCTimeoutError = class extends NetworkError {
};
var RPCError = class extends NotebookLMError {
  methodId;
  rawResponse;
  rpcCode;
  foundIds;
  constructor(message, opts = {}) {
    super(message);
    this.methodId = opts.methodId;
    this.rawResponse = opts.rawResponse ? opts.rawResponse.slice(0, 500) : void 0;
    this.rpcCode = opts.rpcCode;
    this.foundIds = opts.foundIds ?? [];
  }
};
var AuthError = class extends RPCError {
};
var RateLimitError = class extends RPCError {
  retryAfter;
  constructor(message, opts = {}) {
    super(message, opts);
    this.retryAfter = opts.retryAfter;
  }
};
var ServerError = class extends RPCError {
  statusCode;
  constructor(message, opts = {}) {
    super(message, opts);
    this.statusCode = opts.statusCode;
  }
};
var ClientError = class extends RPCError {
  statusCode;
  constructor(message, opts = {}) {
    super(message, opts);
    this.statusCode = opts.statusCode;
  }
};
var NotebookError = class extends NotebookLMError {
};
var NotebookNotFoundError = class extends NotebookError {
  notebookId;
  constructor(notebookId) {
    super(`Notebook not found: ${notebookId}`);
    this.notebookId = notebookId;
  }
};
var SourceError = class extends NotebookLMError {
};
var SourceNotFoundError = class extends SourceError {
  sourceId;
  constructor(sourceId) {
    super(`Source not found: ${sourceId}`);
    this.sourceId = sourceId;
  }
};
var SourceAddError = class extends SourceError {
  url;
  cause;
  constructor(url, opts = {}) {
    super(
      opts.message ?? `Failed to add source: ${url}
Possible causes:
  - URL is invalid or inaccessible
  - Content is behind a paywall or requires authentication
  - Rate limiting or quota exceeded`
    );
    this.url = url;
    this.cause = opts.cause;
  }
};
var SourceProcessingError = class extends SourceError {
  sourceId;
  status;
  constructor(sourceId, status = 3, message) {
    super(message ?? `Source ${sourceId} failed to process`);
    this.sourceId = sourceId;
    this.status = status;
  }
};
var SourceTimeoutError = class extends SourceError {
  sourceId;
  timeout;
  lastStatus;
  constructor(sourceId, timeout, lastStatus) {
    const statusInfo = lastStatus != null ? ` (last status: ${lastStatus})` : "";
    super(`Source ${sourceId} not ready after ${timeout.toFixed(1)}s${statusInfo}`);
    this.sourceId = sourceId;
    this.timeout = timeout;
    this.lastStatus = lastStatus;
  }
};
var ArtifactError = class extends NotebookLMError {
};
var ArtifactNotFoundError = class extends ArtifactError {
  artifactId;
  artifactType;
  constructor(artifactId, artifactType) {
    const typeInfo = artifactType ? ` ${artifactType}` : "";
    super(`${typeInfo.trim() || "Artifact"} ${artifactId} not found`);
    this.artifactId = artifactId;
    this.artifactType = artifactType;
  }
};
var ArtifactNotReadyError = class extends ArtifactError {
  artifactType;
  artifactId;
  status;
  constructor(artifactType, opts = {}) {
    const base = opts.artifactId ? `${artifactType} artifact ${opts.artifactId} is not ready` : `No completed ${artifactType} found`;
    const statusInfo = opts.status ? ` (status: ${opts.status})` : "";
    super(`${base}${statusInfo}`);
    this.artifactType = artifactType;
    this.artifactId = opts.artifactId;
    this.status = opts.status;
  }
};
var ArtifactParseError = class extends ArtifactError {
  artifactType;
  artifactId;
  details;
  cause;
  constructor(artifactType, opts = {}) {
    let msg = `Failed to parse ${artifactType} artifact`;
    if (opts.artifactId) msg += ` ${opts.artifactId}`;
    if (opts.details) msg += `: ${opts.details}`;
    super(msg);
    this.artifactType = artifactType;
    this.artifactId = opts.artifactId;
    this.details = opts.details;
    this.cause = opts.cause;
  }
};
var ArtifactDownloadError = class extends ArtifactError {
  artifactType;
  artifactId;
  details;
  cause;
  constructor(artifactType, opts = {}) {
    let msg = `Failed to download ${artifactType} artifact`;
    if (opts.artifactId) msg += ` ${opts.artifactId}`;
    if (opts.details) msg += `: ${opts.details}`;
    super(msg);
    this.artifactType = artifactType;
    this.artifactId = opts.artifactId;
    this.details = opts.details;
    this.cause = opts.cause;
  }
};
var ChatError = class extends NotebookLMError {
};

// src/types/models.ts
init_enums();
function parseNotebook(data) {
  const rawTitle = typeof data[0] === "string" ? data[0] : "";
  const title = rawTitle.replace("thought\n", "").trim();
  const id = typeof data[2] === "string" ? data[2] : "";
  let createdAt = null;
  if (Array.isArray(data[5]) && Array.isArray(data[5][5]) && data[5][5].length > 0) {
    try {
      createdAt = new Date(data[5][5][0] * 1e3);
    } catch {
    }
  }
  const isOwner = !(Array.isArray(data[5]) && data[5][1] === true);
  return { id, title, createdAt, sourcesCount: 0, isOwner };
}
function parseSource(src) {
  const srcId = Array.isArray(src[0]) ? src[0][0] : src[0];
  const title = typeof src[1] === "string" ? src[1] : null;
  let url = null;
  if (Array.isArray(src[2]) && Array.isArray(src[2][7]) && src[2][7].length > 0) {
    url = typeof src[2][7][0] === "string" ? src[2][7][0] : null;
  }
  let createdAt = null;
  if (Array.isArray(src[2]) && Array.isArray(src[2][2]) && typeof src[2][2][0] === "number") {
    try {
      createdAt = new Date(src[2][2][0] * 1e3);
    } catch {
    }
  }
  let statusCode = 2;
  if (Array.isArray(src[3]) && typeof src[3][1] === "number") {
    statusCode = src[3][1];
  }
  let typeCode = null;
  if (Array.isArray(src[2]) && typeof src[2][4] === "number") {
    typeCode = src[2][4];
  }
  return {
    id: String(srcId),
    title,
    url,
    kind: sourceTypeFromCode(typeCode),
    createdAt,
    status: sourceStatusFromCode(statusCode),
    _typeCode: typeCode
  };
}
function parseArtifact(data, notebookId) {
  const id = typeof data[0] === "string" ? data[0] : "";
  const title = typeof data[1] === "string" ? data[1] : null;
  const typeCode = typeof data[2] === "number" ? data[2] : 0;
  const statusCode = typeof data[4] === "number" ? data[4] : 0;
  let variant = null;
  if (typeCode === 4 && Array.isArray(data[9]) && Array.isArray(data[9][1]) && typeof data[9][1][0] === "number") {
    variant = data[9][1][0];
  }
  let audioUrl = null;
  const meta6 = data[6];
  if (Array.isArray(meta6) && Array.isArray(meta6[5])) {
    const mediaList = meta6[5];
    for (const item of mediaList) {
      if (Array.isArray(item) && item[2] === "audio/mp4" && typeof item[0] === "string") {
        audioUrl = item[0];
        break;
      }
    }
    if (!audioUrl && Array.isArray(mediaList[0]) && typeof mediaList[0][0] === "string") {
      audioUrl = mediaList[0][0];
    }
  }
  let videoUrl = null;
  if (Array.isArray(data[8])) {
    const meta8 = data[8];
    for (const item of meta8) {
      if (Array.isArray(item) && Array.isArray(item[0]) && typeof item[0][0] === "string" && item[0][0].startsWith("http")) {
        const mediaList = item;
        let best = null;
        for (const m of mediaList) {
          if (Array.isArray(m) && m[2] === "video/mp4" && typeof m[0] === "string") {
            best = m[0];
            if (m[1] === 4) break;
          }
        }
        videoUrl = best ?? (Array.isArray(mediaList[0]) && typeof mediaList[0][0] === "string" ? mediaList[0][0] : null);
        break;
      }
    }
  }
  let content = null;
  if (Array.isArray(data[7]) && typeof data[7][0] === "string") {
    content = data[7][0];
  } else if (typeof data[7] === "string") {
    content = data[7];
  }
  return {
    id,
    title,
    kind: artifactTypeFromCode(typeCode, variant),
    status: artifactStatusFromCode(statusCode),
    notebookId,
    audioUrl,
    videoUrl,
    exportUrl: null,
    shareUrl: null,
    content,
    _raw: Array.isArray(data) ? data : []
  };
}

// src/api/artifacts.ts
function tripleNest(ids) {
  return ids.map((id) => [[id]]);
}
function doubleNest(ids) {
  return ids.map((id) => [id]);
}
var ArtifactsAPI = class {
  constructor(rpc, auth, notes) {
    this.rpc = rpc;
    this.auth = auth;
    this.notes = notes;
  }
  rpc;
  auth;
  notes;
  async list(notebookId) {
    const rawList = await this._listRaw(notebookId);
    const artifacts = [];
    for (const item of rawList) {
      if (Array.isArray(item)) {
        try {
          artifacts.push(parseArtifact(item, notebookId));
        } catch {
        }
      }
    }
    return artifacts;
  }
  async _listRaw(notebookId) {
    const params = [[2], notebookId, 'NOT artifact.status = "ARTIFACT_STATUS_SUGGESTED"'];
    const result = await this.rpc.call(RPCMethod.LIST_ARTIFACTS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result) || !result.length) return [];
    return Array.isArray(result[0]) ? result[0] : result;
  }
  async get(notebookId, artifactId) {
    const artifacts = await this.list(notebookId);
    return artifacts.find((a) => a.id === artifactId) ?? null;
  }
  async listAudio(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "audio");
  }
  async listVideo(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "video");
  }
  async listReports(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "report");
  }
  async listQuizzes(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "quiz");
  }
  async listFlashcards(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "flashcards");
  }
  async listInfographics(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "infographic");
  }
  async listSlideDecks(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "slide_deck");
  }
  async listDataTables(notebookId) {
    return (await this.list(notebookId)).filter((a) => a.kind === "data_table");
  }
  async delete(notebookId, artifactId) {
    const params = [[2], notebookId, artifactId];
    await this.rpc.call(RPCMethod.DELETE_ARTIFACT, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return true;
  }
  async rename(notebookId, artifactId, newTitle) {
    const params = [[2], notebookId, artifactId, newTitle];
    await this.rpc.call(RPCMethod.RENAME_ARTIFACT, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return true;
  }
  // ---------------------------------------------------------------------------
  // Generation
  // ---------------------------------------------------------------------------
  async createAudio(notebookId, opts = {}) {
    const format = opts.format ?? null;
    const length = opts.length ?? null;
    const language = opts.language ?? "en";
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const double = doubleNest(sourceIds);
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.AUDIO,
        triple,
        null,
        null,
        [null, [opts.instructions ?? null, length, null, double, language, null, format]]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createVideo(notebookId, opts = {}) {
    const format = opts.format ?? null;
    const style = opts.style ?? null;
    const language = opts.language ?? "en";
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const double = doubleNest(sourceIds);
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.VIDEO,
        triple,
        null,
        null,
        null,
        null,
        [null, null, [double, language, opts.instructions ?? null, null, format, style]]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createQuiz(notebookId, opts = {}) {
    const quantity = opts.quantity ?? null;
    const difficulty = opts.difficulty ?? null;
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.QUIZ,
        triple,
        null,
        null,
        null,
        null,
        null,
        [
          null,
          [2, null, opts.instructions ?? null, null, null, null, null, [quantity, difficulty]]
        ]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createFlashcards(notebookId, opts = {}) {
    const quantity = opts.quantity ?? null;
    const difficulty = opts.difficulty ?? null;
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.QUIZ,
        triple,
        null,
        null,
        null,
        null,
        null,
        [null, [1, null, opts.instructions ?? null, null, null, null, [difficulty, quantity]]]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createInfographic(notebookId, opts = {}) {
    const orientation = opts.orientation ?? null;
    const detail = opts.detail ?? null;
    const style = opts.style ?? null;
    const language = opts.language ?? "en";
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.INFOGRAPHIC,
        triple,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [[opts.instructions ?? null, language, null, orientation, detail, style]]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createSlideDeck(notebookId, opts = {}) {
    const format = opts.format ?? null;
    const length = opts.length ?? null;
    const language = opts.language ?? "en";
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.SLIDE_DECK,
        triple,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [[opts.instructions ?? null, language, format, length]]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createDataTable(notebookId, opts = {}) {
    const language = opts.language ?? "en";
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.DATA_TABLE,
        triple,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [null, [opts.instructions ?? null, language]]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createReport(notebookId, opts = {}) {
    const format = opts.format ?? "briefing_doc";
    const language = opts.language ?? "en";
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(sourceIds);
    const double = doubleNest(sourceIds);
    const configs = {
      briefing_doc: {
        title: "Briefing Doc",
        description: "Key insights and important quotes",
        prompt: "Create a comprehensive briefing document that includes an Executive Summary, detailed analysis of key themes, important quotes with context, and actionable insights."
      },
      study_guide: {
        title: "Study Guide",
        description: "Short-answer quiz, essay questions, glossary",
        prompt: "Create a comprehensive study guide that includes key concepts, short-answer practice questions, essay prompts for deeper exploration, and a glossary of important terms."
      },
      blog_post: {
        title: "Blog Post",
        description: "Insightful takeaways in readable article format",
        prompt: "Write an engaging blog post that presents the key insights in an accessible, reader-friendly format with an attention-grabbing introduction and compelling conclusion."
      },
      custom: {
        title: "Custom Report",
        description: "Custom format",
        prompt: opts.customPrompt ?? "Create a report based on the provided sources."
      }
    };
    const cfg = configs[format] ?? configs["briefing_doc"];
    const prompt = opts.extraInstructions && format !== "custom" ? `${cfg.prompt}

${opts.extraInstructions}` : cfg.prompt;
    const params = [
      [2],
      notebookId,
      [
        null,
        null,
        ArtifactTypeCode.REPORT,
        triple,
        null,
        null,
        null,
        [null, [cfg.title, cfg.description, null, double, language, prompt, null, true]]
      ]
    ];
    return this._callGenerate(notebookId, params);
  }
  async createMindMap(notebookId, sourceIds) {
    const ids = sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const triple = tripleNest(ids);
    const params = [
      triple,
      null,
      null,
      null,
      null,
      ["interactive_mindmap", [["[CONTEXT]", ""]], ""],
      null,
      [2, null, [1]]
    ];
    const result = await this.rpc.call(RPCMethod.GENERATE_MIND_MAP, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    const mindMapJson = Array.isArray(result) && Array.isArray(result[0]) && typeof result[0][0] === "string" ? result[0][0] : null;
    if (!mindMapJson) throw new Error("Mind map generation returned no content");
    let title = "Mind Map";
    try {
      const parsed = JSON.parse(mindMapJson);
      if (typeof parsed["name"] === "string") title = parsed["name"];
    } catch {
    }
    return this.notes.create(notebookId, mindMapJson, title);
  }
  // ---------------------------------------------------------------------------
  // Polling / download
  // ---------------------------------------------------------------------------
  /** Poll until artifact reaches completed/failed status. */
  async waitUntilReady(notebookId, artifactId, timeout = 1800, pollInterval = 3) {
    return this.pollUntilReady(notebookId, artifactId, {
      timeoutSecs: timeout,
      intervalSecs: pollInterval
    });
  }
  /** Poll until artifact is fully ready, with optional progress hooks and cancellation. */
  async pollUntilReady(notebookId, artifactId, opts = {}) {
    const timeout = opts.timeoutSecs ?? 1800;
    const pollInterval = opts.intervalSecs ?? 3;
    const deadline = Date.now() + timeout * 1e3;
    let lastStatus = null;
    while (Date.now() < deadline) {
      this.throwIfAborted(opts.signal);
      const status = await this.pollStatus(notebookId, artifactId);
      lastStatus = status;
      if (opts.onTick) await opts.onTick(status);
      const artifact = await this.get(notebookId, artifactId);
      if (artifact?.status === "completed") {
        if (artifact.kind === "audio" && !artifact.audioUrl || artifact.kind === "video" && !artifact.videoUrl) {
          await sleep(pollInterval * 1e3);
          continue;
        }
        return artifact;
      }
      if (artifact?.status === "failed" || status.status === "failed") {
        throw new ArtifactNotReadyError(artifact?.kind ?? "artifact", {
          artifactId,
          status: "failed"
        });
      }
      await sleep(pollInterval * 1e3);
    }
    throw new ArtifactNotReadyError("artifact", {
      artifactId,
      status: lastStatus?.status ?? "timeout"
    });
  }
  throwIfAborted(signal) {
    if (!signal?.aborted) return;
    throw new Error("Artifact polling aborted");
  }
  /** Get the current status of a generated artifact without waiting. */
  async pollStatus(notebookId, artifactId) {
    const rawList = await this._listRaw(notebookId);
    for (const item of rawList) {
      if (!Array.isArray(item) || item[0] !== artifactId) continue;
      const statusCode = typeof item[4] === "number" ? item[4] : null;
      return {
        artifactId,
        status: statusCode != null ? artifactStatusFromCode(statusCode) : "pending"
      };
    }
    return { artifactId, status: "pending" };
  }
  /** Download audio content as a Buffer. */
  async downloadAudio(notebookId, artifactId) {
    const artifact = await this.get(notebookId, artifactId);
    if (!artifact || artifact.status !== "completed") {
      throw new ArtifactNotReadyError("audio", { artifactId, status: artifact?.status });
    }
    if (!artifact.audioUrl) throw new ArtifactNotReadyError("audio", { artifactId });
    return this._fetchMediaWithCookies(artifact.audioUrl);
  }
  /** Download video content as a Buffer. */
  async downloadVideo(notebookId, artifactId) {
    const artifact = await this.get(notebookId, artifactId);
    if (!artifact || artifact.status !== "completed") {
      throw new ArtifactNotReadyError("video", { artifactId, status: artifact?.status });
    }
    if (!artifact.videoUrl) throw new ArtifactNotReadyError("video", { artifactId });
    return this._fetchMediaWithCookies(artifact.videoUrl);
  }
  /** Get markdown content for a completed report artifact. */
  async getReportMarkdown(notebookId, artifactId) {
    const artifact = await this.get(notebookId, artifactId);
    return artifact?.content ?? null;
  }
  /** Get interactive HTML for quiz/flashcard artifacts. */
  async getInteractiveHtml(notebookId, artifactId) {
    const params = [artifactId];
    const result = await this.rpc.call(RPCMethod.GET_INTERACTIVE_HTML, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (Array.isArray(result) && Array.isArray(result[0])) {
      const data = result[0];
      if (Array.isArray(data[9]) && typeof data[9][0] === "string") {
        return data[9][0];
      }
    }
    return null;
  }
  /** Download a completed slide deck as PDF or PPTX. Returns a Buffer. */
  async downloadSlideDeck(notebookId, artifactId, format = "pdf") {
    const rawList = await this._listRaw(notebookId);
    const raw = rawList.find(
      (a) => a[0] === artifactId && a[2] === ArtifactTypeCode.SLIDE_DECK
    );
    if (!raw) throw new ArtifactNotReadyError("slide_deck", { artifactId });
    const metadata = raw[16];
    if (!Array.isArray(metadata)) throw new ArtifactNotReadyError("slide_deck", { artifactId });
    const url = format === "pptx" ? metadata[4] : metadata[3];
    if (typeof url !== "string" || !url.startsWith("http")) {
      throw new ArtifactNotReadyError("slide_deck", { artifactId, status: `no ${format} url` });
    }
    return this._fetchMediaWithCookies(url);
  }
  /** Download a completed infographic as PNG. Returns a Buffer. */
  async downloadInfographic(notebookId, artifactId) {
    const rawList = await this._listRaw(notebookId);
    const raw = rawList.find(
      (a) => a[0] === artifactId && a[2] === ArtifactTypeCode.INFOGRAPHIC
    );
    if (!raw) throw new ArtifactNotReadyError("infographic", { artifactId });
    let url = null;
    for (let i = raw.length - 1; i >= 0; i--) {
      const item = raw[i];
      if (Array.isArray(item) && Array.isArray(item[2]) && Array.isArray(item[2][0]) && Array.isArray(item[2][0][1]) && typeof item[2][0][1][0] === "string" && item[2][0][1][0].startsWith("http")) {
        url = item[2][0][1][0];
        break;
      }
    }
    if (!url) throw new ArtifactNotReadyError("infographic", { artifactId });
    return this._fetchMediaWithCookies(url);
  }
  /** Get AI-suggested report formats based on notebook content. */
  async suggestReports(notebookId) {
    const params = [[2], notebookId];
    const result = await this.rpc.call(RPCMethod.GET_SUGGESTED_REPORTS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
      timeoutMs: 12e4
    });
    if (!Array.isArray(result) || !result.length) return [];
    const items = Array.isArray(result[0]) ? result[0] : result;
    const suggestions = [];
    for (const item of items) {
      if (Array.isArray(item) && item.length >= 5) {
        suggestions.push({
          title: typeof item[0] === "string" ? item[0] : "",
          description: typeof item[1] === "string" ? item[1] : "",
          prompt: typeof item[4] === "string" ? item[4] : "",
          audienceLevel: typeof item[5] === "number" ? item[5] : 2
        });
      }
    }
    return suggestions;
  }
  /** Revise an individual slide in a completed slide deck using a prompt. */
  async reviseSlide(notebookId, artifactId, slideIndex, prompt) {
    if (slideIndex < 0) throw new Error("slideIndex must be >= 0");
    const params = [[2], artifactId, [[[slideIndex, prompt]]]];
    const result = await this.rpc.call(RPCMethod.REVISE_SLIDE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return this._parseGenerationResult(result);
  }
  /** Get parsed headers and rows from a completed data table artifact. */
  async getDataTableContent(notebookId, artifactId) {
    const artifacts = await this._listRaw(notebookId);
    const raw = artifacts.find(
      (a) => Array.isArray(a) && a[0] === artifactId && a[2] === ArtifactTypeCode.DATA_TABLE
    );
    if (!raw || !Array.isArray(raw) || !Array.isArray(raw[18])) return null;
    return parseDataTable(raw[18]);
  }
  // ---------------------------------------------------------------------------
  // Internal
  /** Export a completed report artifact to Google Docs. Returns the created document URL. */
  async exportReport(notebookId, artifactId, title) {
    const params = [null, artifactId, null, title, ExportType.DOCS];
    const result = await this.rpc.call(RPCMethod.EXPORT_ARTIFACT, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return extractExportUrl(result);
  }
  /** Export a completed data table artifact to Google Sheets. Returns the created spreadsheet URL. */
  async exportDataTable(notebookId, artifactId, title) {
    const params = [null, artifactId, null, title, ExportType.SHEETS];
    const result = await this.rpc.call(RPCMethod.EXPORT_ARTIFACT, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return extractExportUrl(result);
  }
  // ---------------------------------------------------------------------------
  /**
   * Fetch a Google-hosted media URL, manually following redirects to ensure
   * cookies are included on every hop. Node/Bun fetch strips the Cookie header
   * on cross-origin redirects (e.g. googleusercontent.com → lh3.google.com).
   */
  async _fetchMediaWithCookies(url, maxRedirects = 10) {
    let current = url;
    for (let i = 0; i < maxRedirects; i++) {
      if (!isTrustedDomain(current)) {
        throw new Error(`Untrusted redirect target: ${new URL(current).hostname}`);
      }
      const response = await fetch(current, {
        headers: { Cookie: this.auth.googleCookieHeader },
        redirect: "manual"
      });
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location)
          throw new Error(`Redirect with no Location header (status ${response.status})`);
        current = location.startsWith("http") ? location : new URL(location, current).href;
        continue;
      }
      if (!response.ok) throw new Error(`Media download failed: HTTP ${response.status}`);
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("text/html")) {
        throw new Error("Media download returned HTML \u2014 authentication cookies may be expired.");
      }
      return Buffer.from(await response.arrayBuffer());
    }
    throw new Error("Too many redirects fetching media URL");
  }
  async _callGenerate(notebookId, params) {
    const result = await this.rpc.call(RPCMethod.CREATE_ARTIFACT, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return this._parseGenerationResult(result);
  }
  _parseGenerationResult(result) {
    if (Array.isArray(result) && result.length > 0) {
      const artifactData = result[0];
      const artifactId = Array.isArray(artifactData) && artifactData.length > 0 && typeof artifactData[0] === "string" ? artifactData[0] : null;
      const statusCode = Array.isArray(artifactData) && artifactData.length > 4 && typeof artifactData[4] === "number" ? artifactData[4] : null;
      if (artifactId) {
        return {
          artifactId,
          status: statusCode != null ? artifactStatusFromCode(statusCode) : "pending"
        };
      }
    }
    return { artifactId: null, status: "failed" };
  }
};
function extractCellText(cell) {
  if (typeof cell === "string") return cell;
  if (typeof cell === "number") return "";
  if (Array.isArray(cell)) return cell.map(extractCellText).join("");
  return "";
}
function parseDataTable(rawData) {
  try {
    const nav = rawData;
    const rowsArray = nav[0][0][0][0][4][2];
    if (!rowsArray?.length) throw new Error("Empty data table");
    const headers = [];
    const rows = [];
    for (let i = 0; i < rowsArray.length; i++) {
      const rowSection = rowsArray[i];
      if (!Array.isArray(rowSection) || rowSection.length < 3) continue;
      const cellArray = rowSection[2];
      if (!Array.isArray(cellArray)) continue;
      const values = cellArray.map(extractCellText);
      if (i === 0) headers.push(...values);
      else rows.push(values);
    }
    if (!headers.length) throw new Error("No headers found");
    return { headers, rows };
  } catch (e) {
    throw new Error(`Failed to parse data table: ${e}`);
  }
}
function extractExportUrl(result) {
  if (!Array.isArray(result)) return null;
  function findUrl(data, depth = 5) {
    if (depth <= 0 || data == null) return null;
    if (typeof data === "string" && data.startsWith("https://")) return data;
    if (Array.isArray(data)) {
      for (const item of data) {
        const found = findUrl(item, depth - 1);
        if (found) return found;
      }
    }
    return null;
  }
  return findUrl(result);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var TRUSTED_MEDIA_DOMAINS = [
  ".google.com",
  ".googleusercontent.com",
  ".googleapis.com",
  ".usercontent.google.com"
];
function isTrustedDomain(url) {
  try {
    const host = new URL(url).hostname;
    return TRUSTED_MEDIA_DOMAINS.some((d) => host === d.slice(1) || host.endsWith(d));
  } catch {
    return false;
  }
}

// src/api/chat.ts
init_enums();
var QUERY_URL = "https://notebooklm.google.com/_/LabsTailwindUi/data/google.internal.labs.tailwind.orchestration.v1.LabsTailwindOrchestrationService/GenerateFreeFormStreamed";
var DEFAULT_BL = "boq_labs-tailwind-frontend_20260301.03_p0";
var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
var ChatAPI = class {
  constructor(rpc, auth, refreshAuth) {
    this.rpc = rpc;
    this.auth = auth;
    this.refreshAuth = refreshAuth;
  }
  rpc;
  auth;
  refreshAuth;
  conversationCache = /* @__PURE__ */ new Map();
  reqid = Math.floor(Math.random() * 9e5) + 1e5;
  async ask(notebookId, query, opts = {}) {
    const { onChunk, ...streamOpts } = opts;
    let result = null;
    for await (const event of this.stream(notebookId, query, streamOpts)) {
      if (event.type === "text") {
        await onChunk?.({
          text: event.text,
          answer: event.answer,
          conversationId: event.conversationId,
          references: event.references,
          isReplacement: event.isReplacement
        });
      } else {
        result = event.result;
      }
    }
    if (!result) throw new ChatError("Chat request completed without a result");
    return result;
  }
  async *stream(notebookId, query, opts = {}) {
    const sourceIds = opts.sourceIds ?? await this.rpc.getSourceIds(notebookId);
    const isNew = !opts.conversationId;
    const conversationId = opts.conversationId ?? randomUUID();
    const history = isNew ? null : this._buildHistory(conversationId);
    const sourcesArray = sourceIds.map((sid) => [[sid]]);
    const params = [
      sourcesArray,
      query,
      history,
      [2, null, [1], [1]],
      conversationId,
      null,
      null,
      notebookId,
      1
    ];
    const paramsJson = JSON.stringify(params, null, 0);
    const fReq = JSON.stringify([null, paramsJson]);
    this.reqid += 1e5;
    const bl = typeof process !== "undefined" && process.env["NOTEBOOKLM_BL"] || DEFAULT_BL;
    const urlParams = new URLSearchParams({ bl, hl: "en", _reqid: String(this.reqid), rt: "c" });
    if (this.auth.sessionId) urlParams.set("f.sid", this.auth.sessionId);
    const bodyParts = [`f.req=${encodeURIComponent(fReq)}`];
    if (this.auth.csrfToken) bodyParts.push(`at=${encodeURIComponent(this.auth.csrfToken)}`);
    const body = bodyParts.join("&") + "&";
    const response = await this._postChatRequest(`${QUERY_URL}?${urlParams.toString()}`, body);
    const parser = new StreamingChatResponseParser();
    for await (const textChunk of readResponseText(response)) {
      for (const chunk of parser.feed(textChunk)) {
        yield { type: "text", ...chunk };
      }
    }
    for (const chunk of parser.finish()) {
      yield { type: "text", ...chunk };
    }
    const { answer, conversationId: serverConvId, references } = parser.result();
    const finalConvId = serverConvId ?? conversationId;
    const cached = this.conversationCache.get(finalConvId) ?? [];
    const turnNumber = cached.length + 1;
    cached.push({ query, answer, turnNumber });
    this.conversationCache.set(finalConvId, cached);
    yield {
      type: "done",
      result: { answer, conversationId: finalConvId, turnNumber, references }
    };
  }
  async getConversationTurns(notebookId, conversationId) {
    const params = [[], null, null, conversationId, 100];
    const result = await this.rpc.call(RPCMethod.GET_CONVERSATION_TURNS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result) || !Array.isArray(result[0])) return [];
    const rawTurns = [...result[0]].reverse();
    const turns = [];
    let i = 0;
    while (i < rawTurns.length) {
      const turn = rawTurns[i];
      if (!Array.isArray(turn) || turn.length < 3) {
        i++;
        continue;
      }
      if (turn[2] === 1 && turn.length > 3) {
        const q = typeof turn[3] === "string" ? turn[3] : "";
        let a = "";
        const next = rawTurns[i + 1];
        if (Array.isArray(next) && next.length > 4 && next[2] === 2) {
          try {
            a = String(next[4][0][0] ?? "");
          } catch {
          }
          i++;
        }
        turns.push({ query: q, answer: a, turnNumber: turns.length + 1 });
      }
      i++;
    }
    return turns;
  }
  async getLastConversationId(notebookId) {
    const params = [[], null, notebookId, 1];
    const result = await this.rpc.call(RPCMethod.GET_LAST_CONVERSATION_ID, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result)) return null;
    for (const group of result) {
      if (!Array.isArray(group)) continue;
      for (const conv of group) {
        if (Array.isArray(conv) && typeof conv[0] === "string") {
          return conv[0];
        }
      }
    }
    return null;
  }
  async getHistory(notebookId, limit = 100, conversationId) {
    const convId = conversationId ?? await this.getLastConversationId(notebookId);
    if (!convId) return [];
    const params = [[], null, null, convId, limit];
    const result = await this.rpc.call(RPCMethod.GET_CONVERSATION_TURNS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result) || !Array.isArray(result[0])) return [];
    const rawTurns = [...result[0]].reverse();
    const history = [];
    let i = 0;
    while (i < rawTurns.length) {
      const turn = rawTurns[i];
      if (!Array.isArray(turn) || turn.length < 3) {
        i++;
        continue;
      }
      if (turn[2] === 1 && turn.length > 3) {
        const query = typeof turn[3] === "string" ? turn[3] : "";
        let answer = "";
        const next = rawTurns[i + 1];
        if (Array.isArray(next) && next.length > 4 && next[2] === 2) {
          try {
            answer = String(next[4][0][0] ?? "");
          } catch {
          }
          i++;
        }
        history.push([query, answer]);
      }
      i++;
    }
    return history;
  }
  /**
   * Low-level chat configuration. Set goal, response length, and optional
   * custom instructions directly. Persists on the server per notebook.
   * Use `setMode()` for preset combinations instead.
   */
  async configure(notebookId, goal = ChatGoal.DEFAULT, length = ChatResponseLength.DEFAULT, customPrompt) {
    if (goal === ChatGoal.CUSTOM && !customPrompt) {
      throw new Error("customPrompt is required when goal is ChatGoal.CUSTOM");
    }
    const goalArray = goal === ChatGoal.CUSTOM ? [goal, customPrompt] : [goal];
    const chatSettings = [goalArray, [length]];
    const params = [notebookId, [[null, null, null, null, null, null, null, chatSettings]]];
    await this.rpc.call(RPCMethod.RENAME_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
  }
  /**
   * Set the chat mode for a notebook. Persists on the server — affects all
   * subsequent `ask()` calls until changed.
   */
  async setMode(notebookId, mode) {
    const [goal, length] = chatModeToParams(mode);
    const chatSettings = [[goal], [length]];
    const params = [notebookId, [[null, null, null, null, null, null, null, chatSettings]]];
    await this.rpc.call(RPCMethod.RENAME_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
  }
  clearCache(conversationId) {
    if (conversationId) {
      this.conversationCache.delete(conversationId);
    } else {
      this.conversationCache.clear();
    }
  }
  getCachedTurns(conversationId) {
    const turns = this.conversationCache.get(conversationId) ?? [];
    return turns.map((turn) => ({
      query: turn.query,
      answer: turn.answer,
      turnNumber: turn.turnNumber
    }));
  }
  _buildHistory(conversationId) {
    const turns = this.conversationCache.get(conversationId) ?? [];
    if (!turns.length) return null;
    const history = [];
    for (const turn of turns) {
      history.push([turn.answer, null, 2]);
      history.push([turn.query, null, 1]);
    }
    return history;
  }
  async _postChatRequest(url, body, retried = false) {
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Cookie: this.auth.cookieHeader
        },
        body
      });
    } catch (e) {
      throw new ChatError(`Chat request failed: ${String(e)}`);
    }
    if ((response.status === 401 || response.status === 403) && !retried && this.refreshAuth) {
      await this.refreshAuth();
      return this._postChatRequest(url, body, true);
    }
    if (!response.ok) throw new ChatError(`Chat request failed: HTTP ${response.status}`);
    return response;
  }
};
var StreamingChatResponseParser = class {
  lineBuffer = "";
  prefixChecked = false;
  expectingPayload = false;
  bestMarkedAnswer = "";
  bestUnmarkedAnswer = "";
  streamedAnswer = "";
  serverConvId = null;
  references = [];
  feed(text) {
    this.lineBuffer += text;
    if (!this.stripPrefixIfReady()) return [];
    return this.drainCompleteLines();
  }
  finish() {
    if (!this.prefixChecked) {
      if (this.lineBuffer.startsWith(")]}'")) this.lineBuffer = this.lineBuffer.slice(4);
      this.prefixChecked = true;
    }
    const chunks = this.drainCompleteLines();
    const finalLine = this.lineBuffer.trim();
    if (finalLine) chunks.push(...this.processLine(finalLine));
    this.lineBuffer = "";
    return chunks;
  }
  result() {
    return {
      answer: this.bestMarkedAnswer || this.bestUnmarkedAnswer,
      conversationId: this.serverConvId,
      references: this.references
    };
  }
  stripPrefixIfReady() {
    if (this.prefixChecked) return true;
    if (this.lineBuffer.startsWith(")]}'")) {
      const match = /^\)\]\}'\r?\n/.exec(this.lineBuffer);
      if (!match) return false;
      this.lineBuffer = this.lineBuffer.slice(match[0].length);
    } else if (this.lineBuffer.length < 4 && ")]}'".startsWith(this.lineBuffer)) {
      return false;
    }
    this.prefixChecked = true;
    return true;
  }
  drainCompleteLines() {
    const chunks = [];
    let newlineIndex = this.lineBuffer.indexOf("\n");
    while (newlineIndex !== -1) {
      const line = this.lineBuffer.slice(0, newlineIndex).trim();
      this.lineBuffer = this.lineBuffer.slice(newlineIndex + 1);
      chunks.push(...this.processLine(line));
      newlineIndex = this.lineBuffer.indexOf("\n");
    }
    return chunks;
  }
  processLine(line) {
    if (!line) return [];
    if (this.expectingPayload) {
      this.expectingPayload = false;
      return this.processPayload(line);
    }
    if (/^\d+$/.test(line)) {
      this.expectingPayload = true;
      return [];
    }
    return this.processPayload(line);
  }
  processPayload(jsonStr) {
    let data;
    try {
      data = JSON.parse(jsonStr);
    } catch {
      return [];
    }
    if (!Array.isArray(data)) return [];
    const chunks = [];
    for (const item of data) {
      if (!Array.isArray(item) || item.length < 3 || item[0] !== "wrb.fr") continue;
      const innerJson = item[2];
      if (typeof innerJson !== "string") continue;
      let innerData;
      try {
        innerData = JSON.parse(innerJson);
      } catch {
        continue;
      }
      if (!Array.isArray(innerData) || !innerData.length) continue;
      const first = innerData[0];
      if (!Array.isArray(first) || !first.length) continue;
      const answerText = first[0];
      if (typeof answerText !== "string" || !answerText) continue;
      const typeInfo = first[4];
      const isAnswer = Array.isArray(typeInfo) && typeInfo.length > 0 && typeInfo[typeInfo.length - 1] === 1;
      const convData = first[2];
      if (!this.serverConvId && Array.isArray(convData) && convData.length > 0 && typeof convData[0] === "string") {
        this.serverConvId = convData[0];
      }
      if (Array.isArray(typeInfo) && typeInfo.length > 3) {
        const citations = typeInfo[3];
        if (Array.isArray(citations)) {
          const nextReferences = citations.map((cite, index) => extractCitationReference(cite, index + 1)).filter((ref) => Boolean(ref));
          if (nextReferences.length > 0) {
            this.references = nextReferences;
          }
        }
      }
      if (isAnswer && answerText.length > this.bestMarkedAnswer.length) {
        this.bestMarkedAnswer = answerText;
        const chunk = this.buildTextChunk(answerText);
        if (chunk) chunks.push(chunk);
      } else if (!isAnswer && answerText.length > this.bestUnmarkedAnswer.length) {
        this.bestUnmarkedAnswer = answerText;
      }
    }
    return chunks;
  }
  buildTextChunk(answerText) {
    if (answerText === this.streamedAnswer) return null;
    const isReplacement = this.streamedAnswer.length > 0 && !answerText.startsWith(this.streamedAnswer);
    const text = isReplacement ? answerText : answerText.slice(this.streamedAnswer.length);
    this.streamedAnswer = answerText;
    if (!text) return null;
    return {
      text,
      answer: answerText,
      conversationId: this.serverConvId,
      references: [...this.references],
      isReplacement
    };
  }
};
async function* readResponseText(response) {
  if (!response.body) {
    yield await response.text();
    return;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let completed = false;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        completed = true;
        break;
      }
      if (value) yield decoder.decode(value, { stream: true });
    }
    const tail = decoder.decode();
    if (tail) yield tail;
  } finally {
    if (!completed) {
      try {
        await reader.cancel();
      } catch {
      }
    }
    reader.releaseLock();
  }
}
function extractUuid(data, depth = 8) {
  if (depth <= 0 || data == null) return null;
  if (typeof data === "string") return UUID_RE.test(data) ? data : null;
  if (Array.isArray(data)) {
    for (const item of data) {
      const found = extractUuid(item, depth - 1);
      if (found) return found;
    }
  }
  return null;
}
function extractCitationReference(data, index) {
  if (!Array.isArray(data)) return null;
  const citationId = extractUuid(data[0]);
  const detail = Array.isArray(data[1]) ? data[1] : null;
  const sourcePointers = Array.isArray(detail?.[5]) ? detail[5] : [];
  if (citationId && !detail) {
    return {
      index,
      citationId: null,
      sourceId: citationId,
      title: null,
      url: null
    };
  }
  for (const pointer of sourcePointers) {
    if (!Array.isArray(pointer)) continue;
    const sourceGroup = pointer[0];
    if (!Array.isArray(sourceGroup)) continue;
    const sourceId = extractUuid(sourceGroup[0]);
    if (sourceId) {
      return {
        index,
        citationId,
        sourceId,
        title: null,
        url: null
      };
    }
  }
  const fallbackSourceId = extractUuid(data);
  if (!fallbackSourceId || fallbackSourceId === citationId) return null;
  return {
    index,
    citationId,
    sourceId: fallbackSourceId,
    title: null,
    url: null
  };
}
function randomUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
}

// src/api/notebooks.ts
init_enums();
var NotebooksAPI = class {
  constructor(rpc) {
    this.rpc = rpc;
  }
  rpc;
  async list() {
    const params = [null, 1, null, [2]];
    const result = await this.rpc.call(RPCMethod.LIST_NOTEBOOKS, params);
    if (!Array.isArray(result) || !result.length) return [];
    const raw = Array.isArray(result[0]) ? result[0] : result;
    return raw.map((nb) => parseNotebook(nb));
  }
  async create(title) {
    const params = [title, null, null, [2], [1]];
    const result = await this.rpc.call(RPCMethod.CREATE_NOTEBOOK, params);
    return parseNotebook(result);
  }
  async get(notebookId) {
    const params = [notebookId, null, [2], null, 0];
    const result = await this.rpc.call(RPCMethod.GET_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`
    });
    const data = Array.isArray(result) && result.length ? result[0] : result;
    return parseNotebook(data);
  }
  async delete(notebookId) {
    const params = [[notebookId], [2]];
    await this.rpc.call(RPCMethod.DELETE_NOTEBOOK, params);
    return true;
  }
  async rename(notebookId, newTitle) {
    const params = [notebookId, [[null, null, null, [null, newTitle]]]];
    await this.rpc.call(RPCMethod.RENAME_NOTEBOOK, params, {
      sourcePath: "/",
      allowNull: true
    });
    return this.get(notebookId);
  }
  async getSummary(notebookId) {
    const params = [notebookId, [2]];
    const result = await this.rpc.call(RPCMethod.SUMMARIZE, params, {
      sourcePath: `/notebook/${notebookId}`
    });
    try {
      if (Array.isArray(result)) {
        const val = result[0]?.[0]?.[0];
        return typeof val === "string" ? val : "";
      }
    } catch {
    }
    return "";
  }
  async removeFromRecent(notebookId) {
    await this.rpc.call(RPCMethod.REMOVE_RECENTLY_VIEWED, [notebookId], { allowNull: true });
  }
  async getRaw(notebookId) {
    const params = [notebookId, null, [2], null, 0];
    return this.rpc.call(RPCMethod.GET_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`
    });
  }
  async getDescription(notebookId) {
    const params = [notebookId, [2]];
    const result = await this.rpc.call(RPCMethod.SUMMARIZE, params, {
      sourcePath: `/notebook/${notebookId}`
    });
    let summary = "";
    const suggestedTopics = [];
    try {
      if (Array.isArray(result)) {
        const outer = result[0];
        if (Array.isArray(outer)) {
          const summaryVal = outer[0]?.[0];
          if (typeof summaryVal === "string") summary = summaryVal;
          const topicsList = outer[1]?.[0];
          if (Array.isArray(topicsList)) {
            for (const t of topicsList) {
              const question = typeof t[0] === "string" ? t[0] : "";
              const prompt = typeof t[1] === "string" ? t[1] : "";
              suggestedTopics.push({ question, prompt });
            }
          }
        }
      }
    } catch {
    }
    return { summary, suggestedTopics };
  }
  async share(notebookId, publicAccess = true, artifactId) {
    const shareOptions = publicAccess ? [1] : [0];
    const params = artifactId ? [shareOptions, notebookId, artifactId] : [shareOptions, notebookId];
    await this.rpc.call(RPCMethod.SHARE_ARTIFACT, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return {
      public: publicAccess,
      url: publicAccess ? this.getShareUrl(notebookId, artifactId) : null,
      artifactId: artifactId ?? null
    };
  }
  getShareUrl(notebookId, artifactId) {
    const baseUrl = `https://notebooklm.google.com/notebook/${notebookId}`;
    return artifactId ? `${baseUrl}?artifactId=${artifactId}` : baseUrl;
  }
  async getMetadata(notebookId) {
    const raw = await this.getRaw(notebookId);
    const notebookData = Array.isArray(raw) && raw.length > 0 && Array.isArray(raw[0]) ? raw[0] : [];
    const notebook = parseNotebook(notebookData);
    const sourcesRaw = Array.isArray(notebookData[1]) ? notebookData[1] : [];
    const sources = sourcesRaw.filter((source) => Array.isArray(source) && source.length > 0).map((source) => parseSource(source));
    return {
      id: notebook.id,
      title: notebook.title,
      createdAt: notebook.createdAt,
      isOwner: notebook.isOwner,
      sources: sources.map((source) => ({
        kind: source.kind,
        title: source.title,
        url: source.url
      }))
    };
  }
};

// src/api/notes.ts
init_enums();
var NotesAPI = class {
  constructor(rpc) {
    this.rpc = rpc;
  }
  rpc;
  async list(notebookId) {
    const all = await this._fetchAll(notebookId);
    return all.filter((n) => !this._isMindMap(n.content));
  }
  async get(notebookId, noteId) {
    const all = await this._fetchAll(notebookId);
    return all.find((note) => note.id === noteId) ?? null;
  }
  async listMindMaps(notebookId) {
    const all = await this._fetchAll(notebookId);
    return all.filter((n) => this._isMindMap(n.content));
  }
  async create(notebookId, content, title) {
    const createParams = [notebookId, "", [1], null, "New Note"];
    const result = await this.rpc.call(RPCMethod.CREATE_NOTE, createParams, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    const noteId = Array.isArray(result) && Array.isArray(result[0]) && typeof result[0][0] === "string" ? result[0][0] : Array.isArray(result) && typeof result[0] === "string" ? result[0] : null;
    if (!noteId) throw new Error("CREATE_NOTE did not return a note ID");
    await this.update(notebookId, noteId, content, title ?? "New Note");
    return { id: noteId, title: title ?? null, content, createdAt: null, updatedAt: /* @__PURE__ */ new Date() };
  }
  async update(notebookId, noteId, content, title) {
    const params = [notebookId, noteId, [[[content, title ?? "New Note", [], 0]]]];
    await this.rpc.call(RPCMethod.UPDATE_NOTE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return { id: noteId, title: title ?? null, content, createdAt: null, updatedAt: /* @__PURE__ */ new Date() };
  }
  async delete(notebookId, noteId) {
    const params = [notebookId, null, [noteId]];
    await this.rpc.call(RPCMethod.DELETE_NOTE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return true;
  }
  async deleteMindMap(notebookId, mindMapId) {
    return this.delete(notebookId, mindMapId);
  }
  async _fetchAll(notebookId) {
    const result = await this.rpc.call(RPCMethod.GET_NOTES_AND_MIND_MAPS, [notebookId], {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result) || !Array.isArray(result[0])) return [];
    const notes = [];
    for (const item of result[0]) {
      if (!Array.isArray(item) || typeof item[0] !== "string") continue;
      if (item[1] === null && item[2] === 2) continue;
      const content = this._extractContent(item);
      notes.push(this._parseItem(item, notebookId, content));
    }
    return notes;
  }
  _isMindMap(content) {
    return content.includes('"children":') || content.includes('"nodes":');
  }
  _extractContent(item) {
    if (typeof item[1] === "string") return item[1];
    if (Array.isArray(item[1]) && typeof item[1][1] === "string") return item[1][1];
    return "";
  }
  _parseItem(item, _notebookId, content) {
    const inner = Array.isArray(item[1]) ? item[1] : null;
    const title = inner && typeof inner[4] === "string" && inner[4] ? inner[4] : null;
    const createdAt = Array.isArray(item[3]) && typeof item[3][0] === "number" ? new Date(item[3][0] * 1e3) : null;
    return { id: item[0], title, content, createdAt, updatedAt: null };
  }
};

// src/api/research.ts
init_enums();
var ResearchAPI = class {
  constructor(rpc) {
    this.rpc = rpc;
  }
  rpc;
  /**
   * Start a research session.
   * @param source "web" or "drive"
   * @param mode "fast" or "deep" (deep only available for web)
   */
  async start(notebookId, query, source = "web", mode = "fast") {
    if (mode === "deep" && source === "drive") {
      throw new Error("Deep research only supports web sources.");
    }
    const sourceType = source === "web" ? 1 : 2;
    let rpcId;
    let params;
    if (mode === "fast") {
      rpcId = RPCMethod.START_FAST_RESEARCH;
      params = [[query, sourceType], null, 1, notebookId];
    } else {
      rpcId = RPCMethod.START_DEEP_RESEARCH;
      params = [null, [1], [query, sourceType], 5, notebookId];
    }
    const result = await this.rpc.call(rpcId, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (Array.isArray(result) && result.length > 0) {
      return {
        taskId: result[0],
        reportId: result.length > 1 ? result[1] : null,
        notebookId,
        query,
        mode
      };
    }
    return null;
  }
  /** Poll for current research results in a notebook. */
  async poll(notebookId) {
    const params = [null, null, notebookId];
    let result = await this.rpc.call(RPCMethod.POLL_RESEARCH, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result) || !result.length) {
      return emptyResult();
    }
    if (Array.isArray(result[0]) && Array.isArray(result[0][0])) {
      result = result[0];
    }
    const parsedTasks = [];
    for (const taskData of result) {
      if (!Array.isArray(taskData) || taskData.length < 2) continue;
      const taskId = taskData[0];
      const taskInfo = taskData[1];
      if (typeof taskId !== "string" || !Array.isArray(taskInfo)) continue;
      const queryText = Array.isArray(taskInfo[1]) ? taskInfo[1][0] ?? "" : "";
      const sourcesAndSummary = Array.isArray(taskInfo[3]) ? taskInfo[3] : [];
      const statusCode = typeof taskInfo[4] === "number" ? taskInfo[4] : null;
      const sourcesData = Array.isArray(sourcesAndSummary[0]) ? sourcesAndSummary[0] : [];
      const summary = typeof sourcesAndSummary[1] === "string" ? sourcesAndSummary[1] : "";
      const parsedSources = [];
      let report = "";
      for (const src of sourcesData) {
        if (!Array.isArray(src) || src.length < 2) continue;
        let url = "";
        let title = "";
        let sourceReport = "";
        let resultType = parseResultType(src.length > 3 ? src[3] : 1);
        if (src[0] === null) {
          if (Array.isArray(src[1]) && src[1].length >= 2 && typeof src[1][0] === "string" && typeof src[1][1] === "string") {
            title = src[1][0];
            sourceReport = src[1][1];
            if (resultType === 1) resultType = 5;
          } else if (typeof src[1] === "string") {
            title = src[1];
            if (resultType === 1) resultType = 5;
          }
        } else {
          url = typeof src[0] === "string" ? src[0] : "";
          title = src.length > 1 && typeof src[1] === "string" ? src[1] : "";
        }
        if (title || url) {
          const parsed = { url, title, resultType, researchTaskId: taskId };
          if (sourceReport) parsed.reportMarkdown = sourceReport;
          parsedSources.push(parsed);
          if (!report && sourceReport) {
            report = sourceReport;
          } else if (!report) {
            const legacyReport = extractLegacyReport(src);
            if (legacyReport) {
              report = legacyReport;
              parsed.reportMarkdown = legacyReport;
            }
          }
        }
      }
      const status = statusCode === 2 || statusCode === 6 ? "completed" : "in_progress";
      parsedTasks.push({
        taskId,
        status,
        query: queryText,
        sources: parsedSources,
        summary,
        report,
        tasks: []
      });
    }
    if (parsedTasks.length > 0) {
      return { ...parsedTasks[0], tasks: parsedTasks };
    }
    return emptyResult();
  }
  /**
   * Import selected research sources into the notebook.
   * Pass sources from poll() — web sources need `url`, deep research report entries
   * need `reportMarkdown` (resultType=5).
   *
   * Note: The API may return fewer items than imported. Use sources.list() to verify.
   */
  async importSources(notebookId, taskId, sources) {
    if (!sources.length) return [];
    const taskIds = new Set(sources.map((s) => s.researchTaskId).filter(Boolean));
    if (taskIds.size > 1)
      throw new Error("Cannot import sources from multiple research tasks in one batch.");
    const effectiveTaskId = taskIds.size === 1 ? [...taskIds][0] : taskId;
    const reportSources = sources.filter((s) => s.resultType === 5 && s.title && s.reportMarkdown);
    const reportSourceSet = new Set(reportSources);
    const webSources = sources.filter((s) => s.url && !reportSourceSet.has(s));
    if (!webSources.length && !reportSources.length) return [];
    const sourceArray = [
      ...reportSources.filter((s) => s.reportMarkdown).map((s) => buildReportEntry(s.title, s.reportMarkdown)),
      ...webSources.map((s) => buildWebEntry(s.url, s.title))
    ];
    const params = [null, [1], effectiveTaskId, notebookId, sourceArray];
    let result = await this.rpc.call(RPCMethod.IMPORT_RESEARCH, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result)) return [];
    if (result.length > 0 && Array.isArray(result[0]) && Array.isArray(result[0][0])) {
      result = result[0];
    }
    const imported = [];
    for (const srcData of result) {
      if (!Array.isArray(srcData) || srcData.length < 2) continue;
      const first = srcData[0];
      const srcId = Array.isArray(first) && first.length > 0 ? first[0] : null;
      if (srcId) imported.push({ id: srcId, title: srcData[1] });
    }
    return imported;
  }
};
function parseResultType(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const aliases = { web: 1, drive: 2, report: 5 };
    return aliases[value.toLowerCase()] ?? 1;
  }
  return 1;
}
function extractLegacyReport(src) {
  if (src.length <= 6 || !Array.isArray(src[6])) return "";
  return src[6].filter((c) => typeof c === "string" && !!c).join("\n\n");
}
function buildReportEntry(title, markdown) {
  return [null, [title, markdown], null, 3, null, null, null, null, null, null, 3];
}
function buildWebEntry(url, title) {
  return [null, null, [url, title], null, null, null, null, null, null, null, 2];
}
function emptyResult() {
  return {
    taskId: null,
    status: "no_research",
    query: "",
    sources: [],
    summary: "",
    report: "",
    tasks: []
  };
}

// src/api/settings.ts
init_enums();
var SettingsAPI = class {
  constructor(rpc) {
    this.rpc = rpc;
  }
  rpc;
  /** Get the current output language setting (e.g. "en", "ja", "zh_Hans"). */
  async getOutputLanguage() {
    const params = [null, [1, null, null, null, null, null, null, null, null, null, [1]]];
    const result = await this.rpc.call(RPCMethod.GET_USER_SETTINGS, params, {
      sourcePath: "/",
      allowNull: true
    });
    return extractNested(result, [0, 2, 4, 0]);
  }
  /**
   * Set the output language for artifact generation.
   * Pass a BCP-47 language code, e.g. "en", "ja", "zh_Hans".
   * Returns the language that was set, or null if the response couldn't be parsed.
   */
  async setOutputLanguage(language) {
    if (!language) return null;
    const params = [[[null, [[null, null, null, null, [language]]]]]];
    const result = await this.rpc.call(RPCMethod.SET_USER_SETTINGS, params, {
      sourcePath: "/",
      allowNull: true
    });
    return extractNested(result, [2, 4, 0]);
  }
};
function extractNested(data, path) {
  try {
    let cur = data;
    for (const idx of path) {
      if (!Array.isArray(cur)) return null;
      cur = cur[idx];
    }
    return typeof cur === "string" && cur ? cur : null;
  } catch {
    return null;
  }
}

// src/api/sharing.ts
init_enums();
var SharingAPI = class {
  constructor(rpc) {
    this.rpc = rpc;
  }
  rpc;
  /** Get current sharing configuration for a notebook. */
  async getStatus(notebookId) {
    const params = [notebookId, [2]];
    const result = await this.rpc.call(RPCMethod.GET_SHARE_STATUS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return parseShareStatus(result, notebookId);
  }
  /** Enable or disable public link sharing. Returns updated status. */
  async setPublic(notebookId, isPublic) {
    const access = isPublic ? ShareAccess.ANYONE_WITH_LINK : ShareAccess.RESTRICTED;
    const params = [[[notebookId, null, [access], [access, ""]]], 1, null, [2]];
    await this.rpc.call(RPCMethod.SHARE_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return this.getStatus(notebookId);
  }
  /**
   * Set what viewers can access: full notebook or chat only.
   * Note: GET_SHARE_STATUS doesn't return view_level, so it's inferred from what was set.
   */
  async setViewLevel(notebookId, level) {
    const params = [notebookId, [[null, null, null, null, null, null, null, null, [[level]]]]];
    await this.rpc.call(RPCMethod.RENAME_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    const status = await this.getStatus(notebookId);
    return { ...status, viewLevel: level };
  }
  /** Share notebook with a user. Returns updated status. */
  async addUser(notebookId, email, permission = SharePermission.VIEWER, opts = {}) {
    if (permission === SharePermission.OWNER) throw new Error("Cannot assign OWNER permission");
    if (permission === SharePermission._REMOVE) throw new Error("Use removeUser() instead");
    const { notify = true, welcomeMessage = "" } = opts;
    const messageFlag = welcomeMessage ? 0 : 1;
    const notifyFlag = notify ? 1 : 0;
    const params = [
      [[notebookId, [[email, null, permission]], null, [messageFlag, welcomeMessage]]],
      notifyFlag,
      null,
      [2]
    ];
    await this.rpc.call(RPCMethod.SHARE_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return this.getStatus(notebookId);
  }
  /** Update an existing user's permission level. Returns updated status. */
  async updateUser(notebookId, email, permission) {
    return this.addUser(notebookId, email, permission, { notify: false });
  }
  /** Remove a user's access to the notebook. Returns updated status. */
  async removeUser(notebookId, email) {
    const params = [
      [[notebookId, [[email, null, SharePermission._REMOVE]], null, [0, ""]]],
      0,
      null,
      [2]
    ];
    await this.rpc.call(RPCMethod.SHARE_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return this.getStatus(notebookId);
  }
};
var PERM_MAP = {
  1: "owner",
  2: "editor",
  3: "viewer"
};
function parseSharedUser(data) {
  const email = typeof data[0] === "string" ? data[0] : "";
  const permCode = typeof data[1] === "number" ? data[1] : 3;
  const permission = PERM_MAP[permCode] ?? "viewer";
  let displayName = null;
  let avatarUrl = null;
  if (Array.isArray(data[3])) {
    const info = data[3];
    displayName = typeof info[0] === "string" ? info[0] : null;
    avatarUrl = typeof info[1] === "string" ? info[1] : null;
  }
  return { email, permission, displayName, avatarUrl };
}
function parseShareStatus(data, notebookId) {
  const users = [];
  if (Array.isArray(data[0])) {
    for (const entry of data[0]) {
      if (Array.isArray(entry)) users.push(parseSharedUser(entry));
    }
  }
  const isPublic = Array.isArray(data[1]) && data[1][0] === true;
  const access = isPublic ? ShareAccess.ANYONE_WITH_LINK : ShareAccess.RESTRICTED;
  const shareUrl = isPublic ? `https://notebooklm.google.com/notebook/${notebookId}` : null;
  return {
    notebookId,
    isPublic,
    access,
    viewLevel: ShareViewLevel.FULL_NOTEBOOK,
    sharedUsers: users,
    shareUrl
  };
}

// src/api/sources.ts
init_enums();
var UPLOAD_URL = "https://notebooklm.google.com/upload/_/";
var SourcesAPI = class {
  constructor(rpc, auth) {
    this.rpc = rpc;
    this.auth = auth;
  }
  rpc;
  auth;
  async list(notebookId) {
    const params = [notebookId, null, [2], null, 0];
    const notebook = await this.rpc.call(RPCMethod.GET_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`
    });
    if (!Array.isArray(notebook) || !notebook.length) return [];
    const nbInfo = notebook[0];
    if (!Array.isArray(nbInfo) || nbInfo.length <= 1) return [];
    const sourcesList = nbInfo[1];
    if (!Array.isArray(sourcesList)) return [];
    return sourcesList.filter((s) => Array.isArray(s) && s.length > 0).map((s) => parseSource(s));
  }
  async get(notebookId, sourceId) {
    const sources = await this.list(notebookId);
    return sources.find((s) => s.id === sourceId) ?? null;
  }
  async addUrl(notebookId, url, opts = {}) {
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    let params;
    if (isYouTube) {
      params = [
        [[null, null, null, null, null, null, null, [url], null, null, 1]],
        notebookId,
        [2],
        [1, null, null, null, null, null, null, null, null, null, [1]]
      ];
    } else {
      params = [[[null, null, [url], null, null, null, null, null]], notebookId, [2], null, null];
    }
    const result = await this.rpc.call(RPCMethod.ADD_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: isYouTube
    });
    const sourceId = extractSourceId(result);
    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }
    return {
      id: sourceId,
      title: url,
      url,
      kind: "web_page",
      createdAt: null,
      status: "processing",
      _typeCode: null
    };
  }
  async addText(notebookId, text, title, opts = {}) {
    const params = [
      [[null, [title ?? "", text], null, null, null, null, null, null]],
      notebookId,
      [2],
      null,
      null
    ];
    const result = await this.rpc.call(RPCMethod.ADD_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`
    });
    const sourceId = extractSourceId(result);
    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }
    return {
      id: sourceId,
      title: title ?? null,
      url: null,
      kind: "pasted_text",
      createdAt: null,
      status: "processing",
      _typeCode: null
    };
  }
  async addDrive(notebookId, fileId, title, mimeType = DriveMimeType.GOOGLE_DOC, opts = {}) {
    const sourceData = [
      [fileId, mimeType, 1, title],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      1
    ];
    const params = [
      [sourceData],
      notebookId,
      [2],
      [1, null, null, null, null, null, null, null, null, null, [1]]
    ];
    const result = await this.rpc.call(RPCMethod.ADD_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    const sourceId = extractSourceId(result);
    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }
    return {
      id: sourceId,
      title,
      url: null,
      kind: "unknown",
      createdAt: null,
      status: "processing",
      _typeCode: null
    };
  }
  async addFile(notebookId, filePath, mimeType, opts = {}) {
    const fileData = readFileSync(filePath);
    const fileName = filePath.split("/").pop() ?? "file";
    return this.addFileBuffer(notebookId, fileData, fileName, mimeType, opts);
  }
  async addFileBuffer(notebookId, data, fileName, _mimeType, opts = {}) {
    const params = [
      [[fileName]],
      notebookId,
      [2],
      [1, null, null, null, null, null, null, null, null, null, [1]]
    ];
    const result = await this.rpc.call(RPCMethod.ADD_SOURCE_FILE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    const sourceId = extractSourceId(result);
    const uploadUrl = await this.startResumableUpload(notebookId, fileName, data.length, sourceId);
    await this.uploadFile(uploadUrl, data);
    if (opts.waitUntilReady) {
      return this.waitUntilReady(notebookId, sourceId, opts.waitTimeout);
    }
    return {
      id: sourceId,
      title: fileName,
      url: null,
      kind: "pdf",
      // Defaults to generic kind until ready
      createdAt: null,
      status: "processing",
      _typeCode: null
    };
  }
  async startResumableUpload(notebookId, fileName, fileSize, sourceId) {
    const startResp = await fetch(`${UPLOAD_URL}?authuser=0`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Cookie: this.auth.cookieHeader,
        Origin: "https://notebooklm.google.com",
        Referer: "https://notebooklm.google.com/",
        "x-goog-authuser": "0",
        "x-goog-upload-command": "start",
        "x-goog-upload-header-content-length": String(fileSize),
        "x-goog-upload-protocol": "resumable"
      },
      body: JSON.stringify({
        PROJECT_ID: notebookId,
        SOURCE_NAME: fileName,
        SOURCE_ID: sourceId
      })
    });
    if (!startResp.ok) {
      throw new Error(`Upload initiation failed: HTTP ${startResp.status}`);
    }
    const uploadSessionUrl = startResp.headers.get("x-goog-upload-url");
    if (!uploadSessionUrl) {
      throw new Error("Failed to get upload URL from response headers");
    }
    return uploadSessionUrl;
  }
  async uploadFile(uploadUrl, data) {
    const uploadResp = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Cookie: this.auth.cookieHeader,
        Origin: "https://notebooklm.google.com",
        Referer: "https://notebooklm.google.com/",
        "X-Goog-Upload-Command": "upload, finalize",
        "X-Goog-Upload-Offset": "0"
      },
      body: new Uint8Array(data)
    });
    if (!uploadResp.ok) {
      throw new Error(`File upload failed: HTTP ${uploadResp.status}`);
    }
    const uploadResult = await uploadResp.text();
    return uploadResult.trim();
  }
  /** Get the AI-generated Source Guide (summary + keywords) for a source. */
  async getGuide(notebookId, sourceId) {
    const params = [[[[sourceId]]]];
    const result = await this.rpc.call(RPCMethod.GET_SOURCE_GUIDE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true,
      timeoutMs: 12e4
    });
    let summary = "";
    let keywords = [];
    if (Array.isArray(result) && result.length > 0) {
      const outer = result[0];
      if (Array.isArray(outer) && outer.length > 0) {
        const inner = outer[0];
        if (Array.isArray(inner)) {
          if (inner.length > 1 && Array.isArray(inner[1]) && typeof inner[1][0] === "string") {
            summary = inner[1][0];
          }
          if (inner.length > 2 && Array.isArray(inner[2]) && Array.isArray(inner[2][0])) {
            keywords = inner[2][0].filter((k) => typeof k === "string");
          }
        }
      }
    }
    return { summary, keywords };
  }
  /** Get the full indexed text content of a source. */
  async getFulltext(notebookId, sourceId) {
    const params = [[sourceId], [2], [2]];
    const result = await this.rpc.call(RPCMethod.GET_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (!Array.isArray(result) || !result.length) {
      throw new Error(`Source ${sourceId} not found in notebook ${notebookId}`);
    }
    let title = "";
    let url = null;
    if (Array.isArray(result[0]) && result[0].length > 1) {
      title = typeof result[0][1] === "string" ? result[0][1] : "";
      const meta = result[0][2];
      if (Array.isArray(meta) && meta.length > 7 && Array.isArray(meta[7]) && typeof meta[7][0] === "string") {
        url = meta[7][0];
      }
    }
    let content = "";
    if (Array.isArray(result[3]) && result[3].length > 0) {
      const texts = extractAllText(result[3][0]);
      content = texts.join("\n");
    }
    return { sourceId, title, content, url, charCount: content.length };
  }
  /**
   * Build a downloadable text/markdown file from the indexed source content.
   * NotebookLM does not expose the original uploaded file for every source type,
   * so this returns the text NotebookLM indexed for chat and artifact generation.
   */
  async getDownload(notebookId, sourceId, opts = {}) {
    const fulltext = await this.getFulltext(notebookId, sourceId);
    const format = opts.format ?? "markdown";
    const includeMetadata = opts.includeMetadata ?? true;
    const title = fulltext.title || sourceId;
    const extension = format === "markdown" ? "md" : "txt";
    const mimeType = format === "markdown" ? "text/markdown;charset=utf-8" : "text/plain;charset=utf-8";
    const content = format === "markdown" ? formatMarkdownDownload(fulltext, includeMetadata) : formatTextDownload(fulltext, includeMetadata);
    const fileName = opts.fileName ?? `${sanitizeFileName(title || sourceId)}.${extension}`;
    return {
      sourceId,
      title,
      fileName,
      mimeType,
      content,
      blob: new Blob([content], { type: mimeType }),
      url: fulltext.url,
      charCount: content.length
    };
  }
  /** Check if a source has newer content available. Returns true if fresh, false if stale. */
  async checkFreshness(notebookId, sourceId) {
    const params = [null, [sourceId], [2]];
    const result = await this.rpc.call(RPCMethod.CHECK_SOURCE_FRESHNESS, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (result === true) return true;
    if (result === false) return false;
    if (Array.isArray(result)) {
      if (result.length === 0) return true;
      const first = result[0];
      if (Array.isArray(first) && first.length > 1 && first[1] === true) return true;
    }
    return false;
  }
  async delete(notebookId, sourceId) {
    const params = [notebookId, [sourceId], [2]];
    await this.rpc.call(RPCMethod.DELETE_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return true;
  }
  async refresh(notebookId, sourceId) {
    const params = [notebookId, sourceId, [2]];
    await this.rpc.call(RPCMethod.REFRESH_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    return true;
  }
  async rename(notebookId, sourceId, newTitle) {
    const params = [null, [sourceId], [[[newTitle]]]];
    const result = await this.rpc.call(RPCMethod.UPDATE_SOURCE, params, {
      sourcePath: `/notebook/${notebookId}`,
      allowNull: true
    });
    if (Array.isArray(result) && result.length > 0) {
      try {
        const parsed = parseSource(result);
        return parsed.title ? parsed : { ...parsed, title: newTitle };
      } catch {
      }
    }
    return {
      id: sourceId,
      title: newTitle,
      url: null,
      kind: "unknown",
      createdAt: null,
      status: "ready",
      _typeCode: null
    };
  }
  async waitUntilReady(notebookId, sourceId, timeout = 120, initialInterval = 1, maxInterval = 10, backoffFactor = 1.5) {
    const deadline = Date.now() + timeout * 1e3;
    let interval = initialInterval;
    let lastStatus;
    while (Date.now() < deadline) {
      const source = await this.get(notebookId, sourceId);
      if (source) {
        if (source.status === "ready") return source;
        if (source.status === "error") {
          throw new SourceProcessingError(sourceId, 3);
        }
        lastStatus = source._typeCode ?? void 0;
      }
      await sleep2(interval * 1e3);
      interval = Math.min(interval * backoffFactor, maxInterval);
    }
    throw new SourceTimeoutError(sourceId, timeout, lastStatus);
  }
  async waitForSources(notebookId, sourceIds, timeout = 120, initialInterval = 1, maxInterval = 10, backoffFactor = 1.5) {
    return Promise.all(
      sourceIds.map(
        (sourceId) => this.waitUntilReady(
          notebookId,
          sourceId,
          timeout,
          initialInterval,
          maxInterval,
          backoffFactor
        )
      )
    );
  }
};
function extractSourceId(result) {
  if (Array.isArray(result)) {
    let current = result;
    while (Array.isArray(current) && current.length > 0) {
      if (typeof current[0] === "string") {
        if (current[0].length > 8) {
          return current[0];
        }
      }
      current = current[0];
    }
    for (const item of result) {
      if (typeof item === "string" && item.length > 8) return item;
    }
  }
  if (typeof result === "string") return result;
  console.log("extractSourceId debug info: could not parse:", JSON.stringify(result, null, 2));
  throw new Error("Could not extract source ID from API response");
}
function extractAllText(data, maxDepth = 100) {
  if (maxDepth <= 0) return [];
  const texts = [];
  for (const item of data) {
    if (typeof item === "string" && item.length > 0) texts.push(item);
    else if (Array.isArray(item)) texts.push(...extractAllText(item, maxDepth - 1));
  }
  return texts;
}
function formatMarkdownDownload(source, includeMetadata) {
  if (!includeMetadata) return source.content;
  const lines = [`# ${source.title || source.sourceId}`, "", `Source ID: ${source.sourceId}`];
  if (source.url) lines.push(`Original URL: ${source.url}`);
  lines.push("", "---", "", source.content);
  return lines.join("\n");
}
function formatTextDownload(source, includeMetadata) {
  if (!includeMetadata) return source.content;
  const lines = [source.title || source.sourceId, `Source ID: ${source.sourceId}`];
  if (source.url) lines.push(`Original URL: ${source.url}`);
  lines.push("", source.content);
  return lines.join("\n");
}
function sanitizeFileName(name) {
  const sanitized = name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").replace(/\s+/g, " ").trim().replace(/^\.+/, "").slice(0, 120);
  return sanitized || "notebooklm-source";
}
function sleep2(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var DEFAULT_SESSION_FILE = join(homedir(), ".notebooklm", "session.json");
function loadCookiesFromFile(filePath) {
  let raw;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch {
    throw new AuthError(`Session file not found: ${filePath}
Run: npx notebooklm-sdk login`);
  }
  return extractCookiesFromStorageState(JSON.parse(raw));
}
function loadCookiesFromObject(storageState) {
  return extractCookiesFromStorageState(storageState);
}
function buildGoogleCookieHeader(storageState) {
  const map = {};
  for (const c of storageState.cookies ?? []) {
    if (c.domain === ".google.com" && c.name && c.value) {
      map[c.name] = map[c.name] ?? c.value;
    }
  }
  return buildCookieHeader(map);
}
function loadCookiesFromMap(map) {
  return { ...map };
}
function loadCookiesFromString(cookieStr) {
  const map = {};
  for (const part of cookieStr.split(/;\s*/)) {
    const idx = part.indexOf("=");
    if (idx > 0) {
      const name = part.slice(0, idx).trim();
      const value = part.slice(idx + 1).trim();
      if (name) map[name] = value;
    }
  }
  return map;
}
function extractCookiesFromStorageState(storageState) {
  const cookies = {};
  for (const cookie of storageState.cookies ?? []) {
    const { domain, name, value } = cookie;
    if (!isAllowedDomain(domain) || !name) continue;
    const isBase = domain === ".google.com";
    if (!(name in cookies) || isBase) {
      cookies[name] = value;
    }
  }
  if (!cookies["SID"]) {
    throw new AuthError(
      "Missing required cookie: SID. Session may be invalid or expired.\nRun: npx notebooklm-sdk login"
    );
  }
  return cookies;
}
function isAllowedDomain(domain) {
  if (domain === ".google.com" || domain === "notebooklm.google.com" || domain === ".googleusercontent.com") {
    return true;
  }
  if (domain.startsWith(".google.")) {
    return true;
  }
  return false;
}
function buildCookieHeader(cookies) {
  return Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join("; ");
}
var NOTEBOOKLM_URL = "https://notebooklm.google.com/";
async function fetchTokens(cookies) {
  const cookieHeader = buildCookieHeader(cookies);
  const response = await fetch(NOTEBOOKLM_URL, {
    headers: { Cookie: cookieHeader },
    redirect: "follow"
  });
  if (!response.ok) {
    throw new AuthError(`Failed to fetch NotebookLM page: HTTP ${response.status}`);
  }
  const finalUrl = response.url;
  if (isGoogleAuthRedirect(finalUrl)) {
    throw new AuthError(`Redirected to login page: ${finalUrl}. Cookies may be expired.`);
  }
  const html = await response.text();
  const csrfToken = extractCsrfToken(html, finalUrl);
  const sessionId = extractSessionId(html, finalUrl);
  return { csrfToken, sessionId };
}
async function refreshAuthTokens(auth) {
  const { csrfToken, sessionId } = await fetchTokens(auth.cookies);
  auth.csrfToken = csrfToken;
  auth.sessionId = sessionId;
  return auth;
}
function extractCsrfToken(html, finalUrl) {
  const match = /"SNlM0e"\s*:\s*"([^"]+)"/.exec(html);
  if (!match?.[1]) {
    if (isGoogleAuthRedirect(finalUrl) || html.includes("accounts.google.com")) {
      throw new AuthError("Session expired or invalid.\nRun: npx notebooklm-sdk login");
    }
    throw new AuthError("CSRF token (SNlM0e) not found in NotebookLM page HTML.");
  }
  return match[1];
}
function extractSessionId(html, finalUrl) {
  const match = /"FdrFJe"\s*:\s*"([^"]+)"/.exec(html);
  if (!match?.[1]) {
    if (isGoogleAuthRedirect(finalUrl) || html.includes("accounts.google.com")) {
      throw new AuthError("Session expired or invalid.\nRun: npx notebooklm-sdk login");
    }
    throw new AuthError("Session ID (FdrFJe) not found in NotebookLM page HTML.");
  }
  return match[1];
}
function isGoogleAuthRedirect(url) {
  return url.includes("accounts.google.com") || url.includes("signin");
}
async function connect(opts = {}) {
  let cookieMap;
  let googleCookieHeader = null;
  if (opts.cookies) {
    cookieMap = loadCookiesFromString(opts.cookies);
  } else if (opts.cookiesFile) {
    cookieMap = loadCookiesFromFile(opts.cookiesFile);
  } else if (opts.cookiesObject) {
    if ("cookies" in opts.cookiesObject && Array.isArray(opts.cookiesObject.cookies)) {
      const storageState = opts.cookiesObject;
      cookieMap = loadCookiesFromObject(storageState);
      googleCookieHeader = buildGoogleCookieHeader(storageState);
    } else {
      cookieMap = loadCookiesFromMap(opts.cookiesObject);
    }
  } else {
    const envCookies = process.env["NOTEBOOKLM_COOKIES"];
    const envFile = process.env["NOTEBOOKLM_COOKIES_FILE"];
    if (envFile) {
      cookieMap = loadCookiesFromFile(envFile);
    } else if (existsSync(DEFAULT_SESSION_FILE)) {
      const raw = readFileSync(DEFAULT_SESSION_FILE, "utf-8");
      const storageState = JSON.parse(raw);
      cookieMap = loadCookiesFromObject(storageState);
      googleCookieHeader = buildGoogleCookieHeader(storageState);
    } else if (existsSync("storage_state.json")) {
      const raw = readFileSync("storage_state.json", "utf-8");
      const storageState = JSON.parse(raw);
      cookieMap = loadCookiesFromObject(storageState);
      googleCookieHeader = buildGoogleCookieHeader(storageState);
    } else if (envCookies) {
      cookieMap = loadCookiesFromString(envCookies);
    } else {
      throw new AuthError("No session found. Run: npx notebooklm-sdk login");
    }
  }
  const { csrfToken, sessionId } = await fetchTokens(cookieMap);
  const cookieHeader = buildCookieHeader(cookieMap);
  return {
    cookies: cookieMap,
    csrfToken,
    sessionId,
    cookieHeader,
    googleCookieHeader: googleCookieHeader ?? cookieHeader
  };
}

// src/rpc/decoder.ts
function stripAntiXSSI(response) {
  if (response.startsWith(")]}'")) {
    const match = /\)\]\}'\r?\n/.exec(response);
    if (match) return response.slice(match[0].length);
  }
  return response;
}
function parseChunkedResponse(response) {
  if (!response || !response.trim()) return [];
  const chunks = [];
  let skippedCount = 0;
  const lines = response.trim().split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = (lines[i] ?? "").trim();
    if (!line) {
      i++;
      continue;
    }
    if (/^\d+$/.test(line)) {
      i++;
      if (i < lines.length) {
        try {
          const chunk = JSON.parse(lines[i] ?? "");
          chunks.push(chunk);
        } catch {
          skippedCount++;
        }
      }
      i++;
    } else {
      try {
        const chunk = JSON.parse(line);
        chunks.push(chunk);
      } catch {
        skippedCount++;
      }
      i++;
    }
  }
  if (skippedCount > 0 && lines.length > 0) {
    const errorRate = skippedCount / lines.length;
    if (errorRate > 0.1) {
      throw new RPCError(
        `Response parsing failed: ${skippedCount} of ${lines.length} chunks malformed`,
        { rawResponse: response.slice(0, 500) }
      );
    }
  }
  return chunks;
}
function containsUserDisplayableError(obj) {
  if (typeof obj === "string") return obj.includes("UserDisplayableError");
  if (Array.isArray(obj)) return obj.some(containsUserDisplayableError);
  if (obj !== null && typeof obj === "object") {
    return Object.values(obj).some(containsUserDisplayableError);
  }
  return false;
}
function collectRPCIds(chunks) {
  const ids = [];
  for (const chunk of chunks) {
    if (!Array.isArray(chunk)) continue;
    const items = Array.isArray(chunk[0]) ? chunk : [chunk];
    for (const item of items) {
      if (!Array.isArray(item) || item.length < 2) continue;
      if ((item[0] === "wrb.fr" || item[0] === "er") && typeof item[1] === "string") {
        ids.push(item[1]);
      }
    }
  }
  return ids;
}
function extractRPCResult(chunks, rpcId) {
  for (const chunk of chunks) {
    if (!Array.isArray(chunk)) continue;
    const items = Array.isArray(chunk[0]) ? chunk : [chunk];
    for (const item of items) {
      if (!Array.isArray(item) || item.length < 3) continue;
      if (item[0] === "er" && item[1] === rpcId) {
        const code = item[2];
        let msg = "Unknown error";
        if (typeof code === "number") {
          if (code === 429) msg = "API rate limit exceeded. Please wait before retrying.";
          else if (code === 401 || code === 403) msg = "Authentication required or forbidden.";
          else if (code === 404) msg = "Resource not found.";
          else if (code >= 500) msg = `Server error ${code}. Try again later.`;
          else msg = `Error code: ${code}`;
        } else if (typeof code === "string") {
          msg = code;
        }
        throw new RPCError(msg, { methodId: rpcId, rpcCode: code });
      }
      if (item[0] === "wrb.fr" && item[1] === rpcId) {
        const resultData = item[2];
        if (resultData === null && item.length > 5 && item[5] != null) {
          if (containsUserDisplayableError(item[5])) {
            throw new RateLimitError(
              "API rate limit or quota exceeded. Please wait before retrying.",
              { methodId: rpcId, rpcCode: "USER_DISPLAYABLE_ERROR" }
            );
          }
        }
        if (typeof resultData === "string") {
          try {
            return JSON.parse(resultData);
          } catch {
            return resultData;
          }
        }
        if (resultData === null) {
          console.log(
            "decodeResponse debug info: resultData is exactly null. Full item Array:",
            JSON.stringify(item)
          );
        }
        return resultData;
      }
    }
  }
  return void 0;
}
function decodeResponse(rawResponse, rpcId, allowNull = false) {
  const cleaned = stripAntiXSSI(rawResponse);
  const chunks = parseChunkedResponse(cleaned);
  const responsePreview = cleaned.slice(0, 500);
  const foundIds = collectRPCIds(chunks);
  let result;
  try {
    result = extractRPCResult(chunks, rpcId);
  } catch (e) {
    if (e instanceof RPCError && e.foundIds.length === 0) {
      throw new RPCError(e.message, {
        methodId: e.methodId,
        rpcCode: e.rpcCode,
        foundIds,
        rawResponse: responsePreview
      });
    }
    throw e;
  }
  if (result === void 0 && !allowNull) {
    if (foundIds.length > 0 && !foundIds.includes(rpcId)) {
      throw new RPCError(
        `No result for RPC ID '${rpcId}'. Response has IDs: ${foundIds.join(", ")}. Method ID may have changed.`,
        { methodId: rpcId, foundIds, rawResponse: responsePreview }
      );
    }
    throw new RPCError(`No result found for RPC ID: ${rpcId} (${chunks.length} chunks parsed)`, {
      methodId: rpcId,
      foundIds,
      rawResponse: responsePreview
    });
  }
  return result ?? null;
}

// src/rpc/encoder.ts
function encodeRPCRequest(methodId, params) {
  const paramsJson = JSON.stringify(params);
  return [[[methodId, paramsJson, null, "generic"]]];
}
function buildRequestBody(rpcRequest, csrfToken) {
  const fReq = encodeURIComponent(JSON.stringify(rpcRequest));
  const at = encodeURIComponent(csrfToken);
  return `f.req=${fReq}&at=${at}&`;
}
function buildUrlParams(methodId, sessionId, sourcePath = "/") {
  return new URLSearchParams({
    rpcids: methodId,
    "source-path": sourcePath,
    "f.sid": sessionId,
    hl: "en",
    rt: "c"
  });
}

// src/rpc/core.ts
var BATCHEXECUTE_URL = "https://notebooklm.google.com/_/LabsTailwindUi/data/batchexecute";
var DEFAULT_TIMEOUT_MS = 3e4;
var RPCCore = class {
  auth;
  timeoutMs;
  refreshAuth;
  constructor(auth, timeoutMs = DEFAULT_TIMEOUT_MS, refreshAuth) {
    this.auth = auth;
    this.timeoutMs = timeoutMs;
    this.refreshAuth = refreshAuth;
  }
  async call(methodId, params, opts = {}, retried = false) {
    const sourcePath = opts.sourcePath ?? "/";
    const allowNull = opts.allowNull ?? false;
    const timeoutMs = opts.timeoutMs ?? this.timeoutMs;
    const rpcRequest = encodeRPCRequest(methodId, params);
    const body = buildRequestBody(rpcRequest, this.auth.csrfToken);
    const urlParams = buildUrlParams(methodId, this.auth.sessionId, sourcePath);
    const url = `${BATCHEXECUTE_URL}?${urlParams.toString()}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Cookie: this.auth.cookieHeader
        },
        body,
        signal: controller.signal
      });
    } catch (e) {
      clearTimeout(timer);
      if (e instanceof Error && e.name === "AbortError") {
        throw new RPCTimeoutError(`Request timed out calling ${methodId}`, {
          methodId,
          originalError: e
        });
      }
      throw new NetworkError(`Request failed calling ${methodId}: ${String(e)}`, {
        methodId,
        originalError: e instanceof Error ? e : void 0
      });
    } finally {
      clearTimeout(timer);
    }
    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        const retryAfterHeader = response.headers.get("retry-after");
        const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : void 0;
        throw new RateLimitError(`API rate limit exceeded calling ${methodId}`, {
          methodId,
          retryAfter: isNaN(retryAfter ?? NaN) ? void 0 : retryAfter
        });
      }
      if (status === 401 || status === 403) {
        if (!retried && this.refreshAuth) {
          await this.refreshAuth();
          return this.call(methodId, params, opts, true);
        }
        throw new AuthError(`HTTP ${status} calling ${methodId}: authentication required`, {
          methodId
        });
      }
      if (status >= 500) {
        throw new ServerError(`Server error ${status} calling ${methodId}`, {
          methodId,
          statusCode: status
        });
      }
      if (status >= 400) {
        throw new ClientError(`Client error ${status} calling ${methodId}`, {
          methodId,
          statusCode: status
        });
      }
      throw new RPCError(`HTTP ${status} calling ${methodId}`, { methodId });
    }
    const text = await response.text();
    return decodeResponse(text, methodId, allowNull);
  }
  /** Extract source IDs from a notebook (used by chat/artifact APIs). */
  async getSourceIds(notebookId) {
    const params = [notebookId, null, [2], null, 0];
    const { RPCMethod: RPCMethod2 } = await Promise.resolve().then(() => (init_enums(), enums_exports));
    const data = await this.call(RPCMethod2.GET_NOTEBOOK, params, {
      sourcePath: `/notebook/${notebookId}`
    });
    const sourceIds = [];
    if (!Array.isArray(data) || !data.length) return sourceIds;
    try {
      const nbInfo = data[0];
      if (!Array.isArray(nbInfo) || nbInfo.length <= 1) return sourceIds;
      const sources = nbInfo[1];
      if (!Array.isArray(sources)) return sourceIds;
      for (const src of sources) {
        if (!Array.isArray(src) || !src.length) continue;
        const first = src[0];
        if (Array.isArray(first) && first.length > 0 && typeof first[0] === "string") {
          sourceIds.push(first[0]);
        }
      }
    } catch {
    }
    return sourceIds;
  }
};

// src/client.ts
var NotebookLMClient = class _NotebookLMClient {
  constructor(auth, opts = {}) {
    this.auth = auth;
    const refreshAuth = this.refreshTokens.bind(this);
    const rpc = new RPCCore(auth, opts.timeoutMs, refreshAuth);
    this.notebooks = new NotebooksAPI(rpc);
    this.sources = new SourcesAPI(rpc, auth);
    this.notes = new NotesAPI(rpc);
    this.artifacts = new ArtifactsAPI(rpc, auth, this.notes);
    this.chat = new ChatAPI(rpc, auth, refreshAuth);
    this.research = new ResearchAPI(rpc);
    this.settings = new SettingsAPI(rpc);
    this.sharing = new SharingAPI(rpc);
  }
  auth;
  notebooks;
  sources;
  artifacts;
  chat;
  notes;
  research;
  settings;
  sharing;
  refreshPromise = null;
  /**
   * Connect to NotebookLM using cookies.
   * Fetches CSRF and session tokens from the NotebookLM homepage.
   */
  static async connect(opts = {}, clientOpts = {}) {
    const auth = await connect(opts);
    return new _NotebookLMClient(auth, clientOpts);
  }
  /**
   * Refresh CSRF and session tokens (e.g. if they expire mid-session).
   */
  async refreshTokens() {
    if (!this.refreshPromise) {
      this.refreshPromise = refreshAuthTokens(this.auth).then(() => void 0).finally(() => {
        this.refreshPromise = null;
      });
    }
    await this.refreshPromise;
  }
};

// src/index.ts
init_enums();

export { ArtifactDownloadError, ArtifactError, ArtifactNotFoundError, ArtifactNotReadyError, ArtifactParseError, ArtifactTypeCode, ArtifactsAPI, AudioFormat, AudioLength, AuthError, ChatAPI, ChatError, ChatGoal, ChatMode, ChatResponseLength, ClientError, DriveMimeType, ExportType, InfographicDetail, InfographicOrientation, InfographicStyle, NetworkError, NotebookError, NotebookLMClient, NotebookLMError, NotebookNotFoundError, NotebooksAPI, NotesAPI, QuizDifficulty, QuizQuantity, RPCError, RPCMethod, RPCTimeoutError, RateLimitError, ResearchAPI, ServerError, SettingsAPI, ShareAccess, SharePermission, ShareViewLevel, SharingAPI, SlideDeckFormat, SlideDeckLength, SourceAddError, SourceError, SourceNotFoundError, SourceProcessingError, SourceTimeoutError, SourcesAPI, VideoFormat, VideoStyle, connect };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map