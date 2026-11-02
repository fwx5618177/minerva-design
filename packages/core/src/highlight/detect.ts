// Language detection of unlabelled code (EPUB `<pre>` without a class,
// Markdown fences without an info string, HTML extracts…).
//
// `detectCodeLanguage(code)` scores the first ~4 KB / 200 lines against
// hand-picked features of each supported language (a line rule adds its
// points for each matching line, up to a few lines, so no single feature
// dominates) and returns the best one, or "plain" when no score reaches the
// threshold. Unambiguous markers (a shebang, a doctype, valid JSON) decide
// directly. Pure, deterministic (ties follow a fixed order) and roughly
// linear: every regular expression is tried on one line of at most 400
// characters, without nested quantifiers.
import type { CodeLanguage } from "./types";

const SAMPLE_CHARS = 4096;
const SAMPLE_LINES = 200;
const LINE_CHARS = 400;
/** Lowest winning score: below it the code stays plain */
const THRESHOLD = 3;

type Bucket =
  | "js"
  | "ts"
  | "jsx"
  | "json"
  | "css"
  | "html"
  | "bash"
  | "python"
  | "yaml"
  | "sql"
  | "diff"
  | "markdown";

/** Points added for each matching line, for at most `cap` lines (default 4) */
type LineRule = readonly [
  bucket: Bucket,
  pattern: RegExp,
  points: number,
  cap?: number,
];

const CSS_TAGS =
  "html|body|main|header|footer|nav|section|article|aside|div|span|a|p|h[1-6]|ul|ol|li|dl|dt|dd|img|button|input|select|textarea|label|form|fieldset|table|thead|tbody|tr|td|th|pre|code|blockquote|figure|figcaption|strong|em|small|svg|canvas|video|audio|iframe|hr";
const CSS_PROPS =
  "color|background(-color|-image|-size|-position|-repeat)?|margin(-top|-right|-bottom|-left|-inline|-block)?|padding(-top|-right|-bottom|-left|-inline|-block)?|display|position|top|right|bottom|left|inset|width|height|min-width|min-height|max-width|max-height|border(-top|-right|-bottom|-left|-radius|-color|-width|-style)?|outline|font(-family|-size|-weight|-style)?|line-height|letter-spacing|text-(align|decoration|transform|overflow|shadow)|white-space|word-break|overflow(-x|-y|-wrap)?|z-index|opacity|transform|transition|animation|box-shadow|box-sizing|cursor|flex(-direction|-wrap|-grow|-shrink|-basis)?|justify-content|align-(items|self|content)|gap|grid(-template-columns|-template-rows|-area|-column|-row)?|content|visibility|vertical-align|list-style|filter|fill|stroke";
const SHELL_COMMANDS =
  "apt|apt-get|brew|npm|npx|pnpm|yarn|bun|pip|pip3|git|cd|ls|mkdir|rm|cp|mv|curl|wget|chmod|chown|echo|source|docker|kubectl|cat|grep|sed|awk|tar|make|ssh|scp|touch|unzip|systemctl|cargo|rustup|python|python3|node|deno|sudo";

const LINE_RULES: readonly LineRule[] = [
  // JavaScript (shared by TypeScript / JSX / TSX)
  ["js", /^\s*(export\s+)?(const|let|var)\s+[\w$[{][^=]*=[^=>]/, 3],
  ["js", /^\s*(export\s+)?(const|let|var)\s+[\w$[{][^=]*$/, 2],
  ["js", /=>/, 1.5],
  ["js", /\bfunction\b\s*\*?\s*[\w$]*\s*\(/, 2.5],
  ["js", /\brequire\(\s*['"]/, 3],
  ["js", /^\s*import\s+[\w$*{][^'"]*\s+from\s+['"][^'"]+['"]/, 3],
  ["js", /^\s*import\s+['"][^'"]+['"]\s*;/, 2],
  ["js", /\b(module\.exports|exports\.[\w$]+)\s*=/, 3],
  ["js", /^\s*export\s+(default\b|async\b|function\b|class\b|\{|\*)/, 2.5],
  ["js", /\bconsole\.(log|error|warn|info|debug)\(/, 3],
  ["js", /[!=]==/, 1.5],
  ["js", /\b(document|window|globalThis)\.\w/, 2],
  ["js", /\bawait\s+[\w$.]+\(|\basync\s*(\(|function\b|[\w$]+\s*=>)/, 1.5],
  ["js", /\bnew\s+[A-Z][\w$]*\(/, 1],
  ["js", /\bthis\.[\w$]/, 1.5],
  ["js", /`[^`]*\$\{/, 1.5],
  ["js", /^\s*(if|for|while|switch)\s*\(.*\)\s*\{\s*$/, 1],
  ["js", /^\s*\}\s*(else|catch|finally)\b/, 1.5],
  ["js", /;\s*$/, 0.25, 8],
  ["js", /(^|\s)\/\/\s/, 0.5],
  // TypeScript (on top of JavaScript)
  [
    "ts",
    /^\s*(export\s+)?(declare\s+)?(interface|type)\s+[A-Z][\w$]*\s*(<[^>]*>)?\s*(=|\{|extends\b)/,
    5,
    3,
  ],
  ["ts", /^\s*(export\s+)?(declare\s+)?(const\s+)?enum\s+[A-Z][\w$]*\s*\{/, 5],
  ["ts", /\bas\s+const\b/, 4],
  ["ts", /^\s*import\s+type\b/, 4],
  // not at the line end: `type: string` is YAML too
  [
    "ts",
    /[\w$?)\]]\s*:\s*(string|number|boolean|void|any|unknown|never|bigint)(\[\])?\s*[;,)=|>{}\]]/,
    2.5,
  ],
  [
    "ts",
    /\)\s*:\s*(Promise\b|[A-Z][\w$]*|string|number|boolean|void)[^{=;]*(\{|=>)\s*$/,
    3,
  ],
  ["ts", /^\s*(export\s+)?(const|let|var)\s+[\w$]+\s*:\s*[\w$<[{(]/, 3],
  ["ts", /\b(private|public|protected|readonly)\s+[\w$]+\s*[:;=(?]/, 2],
  [
    "ts",
    /\b(implements\s+[A-Z]|keyof\s|satisfies\s|abstract\s+class\b|declare\s+(module|global|const|function))/,
    2,
  ],
  ["ts", /[\w$]<\s*[A-Z][\w$]*(\[\])?(\s*,\s*[A-Z][\w$]*(\[\])?)*\s*>\s*\(/, 2],
  // JSX (markup inside JavaScript)
  ["jsx", /(\breturn|=>|[=(?:,&|])\s*\(?\s*<([A-Za-z][\w.]*|>)[\s/>]/, 3],
  // not after an identifier: `Promise<Book>` is a generic
  ["jsx", /(^|[^\w$.])<\/?[A-Z][\w.]*[\s/>]/, 1.5],
  ["jsx", /\s(className|htmlFor|on[A-Z]\w*)=/, 2],
  ["jsx", /\s[\w-]+=\{/, 2],
  ["jsx", /<>|<\/>/, 3],
  // HTML / XML
  ["html", /<\/[a-zA-Z][\w:-]*\s*>/, 1.5, 6],
  [
    "html",
    /(^|[^\w$.])<[a-zA-Z][\w:-]*(\s+[\w:@.-]+(\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>/,
    1,
    6,
  ],
  ["html", /<!--/, 2, 2],
  ["html", /<\/?(script|style|head|body|meta|link)\b/i, 2, 2],
  ["html", /&([a-z]+|#\d+);/, 1, 2],
  // CSS
  [
    "css",
    /^\s*@(media|supports|font-face|keyframes|import|layer|container|page|charset)\b/,
    3,
    3,
  ],
  [
    "css",
    new RegExp(
      `^\\s*([.#][\\w-]+|[*&]|::?[\\w-]+|\\[[\\w-]+|(${CSS_TAGS})\\b)[^{};=]*\\{\\s*$`,
    ),
    2,
  ],
  [
    "css",
    new RegExp(
      `^\\s*([.#][\\w-]+|::?[\\w-]+|(${CSS_TAGS})\\b)[^{};=]*\\{[^{}]*:[^{}]*\\}\\s*$`,
    ),
    3,
  ],
  [
    "css",
    new RegExp(
      `^\\s*(--[\\w-]+|-(webkit|moz|ms)-[\\w-]+|${CSS_PROPS})\\s*:\\s*[^;{}]+;\\s*$`,
    ),
    1.5,
    8,
  ],
  [
    "css",
    /^\s*[a-z-]+\s*:[^;{}]*(\d(px|rem|em|vh|vw|ms|deg|fr)\b|#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|var|calc)\()[^;{}]*;\s*$/,
    1.5,
  ],
  ["css", /!important\s*;/, 1, 2],
  // Python
  ["python", /^\s*(async\s+)?def\s+\w+\s*\(.*\)\s*(->[^:]+)?:\s*(#.*)?$/, 4, 3],
  ["python", /^>>> /, 3],
  ["python", /^\s*class\s+\w+(\s*\(.*\))?\s*:\s*$/, 4, 2],
  [
    "python",
    /^\s*(import\s+[\w.]+(\s+as\s+\w+)?(\s*,\s*[\w.]+)*|from\s+[.\w]+\s+import\s+(\(|\*|[\w, ]+))\s*$/,
    3,
    3,
  ],
  ["python", /\bself\.\w/, 1.5, 3],
  ["python", /^\s*elif\b.*:\s*$/, 3, 1],
  [
    "python",
    /^\s*(if|for|while|with|try|except|else|finally)\b[^{};]*:\s*(#.*)?$/,
    1.5,
  ],
  ["python", /^\s*print\(/, 1, 2],
  ["python", /\b(None|True|False)\b/, 1, 2],
  ["python", /__\w+__/, 2, 2],
  [
    "python",
    /\b(lambda\s|nonlocal\s|yield\s+from\b|not\s+in\b|is\s+not\b|is\s+None\b)/,
    1.5,
  ],
  ["python", /^\s*(pass|raise\b.*)\s*$/, 1.5, 2],
  ["python", /\bf"[^"]*\{|\bf'[^']*\{/, 1, 2],
  ["python", /^\s*@[\w.]+(\(.*\))?\s*$/, 0.5, 2],
  // Bash / shell sessions
  ["bash", /^\s*\$\s+\S/, 3],
  [
    "bash",
    new RegExp(
      `^\\s*(\\$\\s+)?(sudo\\s+)?(${SHELL_COMMANDS})(\\s+[^\\s=:(.]|\\s*$)`,
    ),
    3,
    5,
  ],
  [
    "bash",
    /^\s*(\$\s+)?(sudo\s+)?(npm|pnpm|yarn|npx|pip3?|brew|apt(-get)?|git|docker|cargo|gem|composer|kubectl)\s+(install|i|add|run|exec|init|clone|commit|push|pull|checkout|build|test|start|get|update|upgrade|remove|uninstall|status|log|diff|compose|apply|create|ci|dlx)\b/,
    2,
    3,
  ],
  ["bash", /\s--?[a-zA-Z][\w-]*(=\S+)?(\s|$)/, 0.5],
  ["bash", /^\s*export\s+[A-Za-z_]\w*=/, 3],
  ["bash", /^\s*[A-Za-z_]\w*=("|'|\$|[^\s=])/, 1, 3],
  ["bash", /&&|\|\||\s\|\s/, 0.5, 2],
  ["bash", /\$\{?[A-Za-z_]\w*\}?|\$\(|\$[0-9@#?]/, 0.5, 3],
  [
    "bash",
    /^\s*(if\s+\[|then\s*$|fi\s*$|do\s*$|done\b|esac\b|case\s+.+\s+in\s*$|while\s+\[|elif\s+\[|for\s+\w+\s+in\s+[^:]*$)/,
    3,
  ],
  [
    "bash",
    /2>&1|>\s*\/dev\/null|\|\s*(grep|xargs|sort|head|tail|wc|tee|less)\b/,
    2,
    2,
  ],
  // SQL (statements at a line start, any case; clauses in capitals)
  ["sql", /^\s*SELECT\s*$/, 2, 1],
  [
    "sql",
    /^\s*(select\s+(\*|distinct\b|top\s+\d|count\(|[\w.]+\s*,|[\w.]+\s+as\s|[\w.]+\s+from\s)|insert\s+into\s+[\w."`[]|update\s+[\w."`]+\s+set\s|delete\s+from\s+[\w."`[]|create\s+(or\s+replace\s+)?(temp(orary)?\s+)?(table|index|unique\s+index|view|database|schema|function|trigger|sequence)\b|alter\s+table\s|drop\s+(table|index|view|database|schema)\b|with\s+(recursive\s+)?\w+\s+as\s*\()/i,
    4,
    3,
  ],
  [
    "sql",
    /^\s*(FROM|WHERE|JOIN|LEFT JOIN|INNER JOIN|RIGHT JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|VALUES|SET|UNION|ON|AND|OR)\b/,
    1,
  ],
  [
    "sql",
    /\b(VARCHAR|INTEGER|PRIMARY KEY|NOT NULL|FOREIGN KEY|REFERENCES|AUTO_INCREMENT|BIGINT|TIMESTAMP|primary key|not null|varchar|foreign key)\b/,
    1,
    3,
  ],
  ["sql", /^\s*--\s/, 0.5, 2],
  // diff
  ["diff", /^@@ -\d+(,\d+)? \+\d+(,\d+)? @@/, 5, 3],
  ["diff", /^diff --git /, 5, 1],
  ["diff", /^index [0-9a-f]+\.\.[0-9a-f]+/, 3, 1],
  // Markdown
  ["markdown", /^#\s+\S/, 1.5, 3],
  ["markdown", /^#{2,6}\s+\S/, 2.5, 3],
  ["markdown", /^\s*[-*+]\s+\S/, 0.75],
  ["markdown", /^\s*\d+[.)]\s+\S/, 1, 3],
  [
    "markdown",
    /\[[^\]\n]+\]\((https?:\/\/|mailto:|\.{0,2}\/|#)[^)\s]*\)|\[[^\]\n]+\]\([\w./-]+\.(md|html?|png|jpe?g|gif|svg)\)/,
    2,
    3,
  ],
  ["markdown", /!\[[^\]]*\]\([^)\s]+\)/, 2, 2],
  ["markdown", /^\s{0,3}(```|~~~)/, 4],
  ["markdown", /^>\s?\S/, 1, 2],
  ["markdown", /\*\*[^*\n]+\*\*/, 1, 2],
  ["markdown", /(^|[^`])`[^`\n]+`/, 0.5, 2],
  ["markdown", /^\s*\|.+\|\s*$/, 0.5],
  ["markdown", /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/, 3, 1],
  ["markdown", /^=+\s*$/, 2, 1],
];

/** A prose sentence (Markdown paragraphs): words, no code punctuation */
const isProse = (line: string) =>
  /^[A-Z]/.test(line) &&
  /[.!?:]$/.test(line) &&
  !/[{};=<>()]/.test(line) &&
  line.split(/\s+/).length >= 6;

/** A line of a JSON document (keys and values, brackets, commas) */
const JSON_LINE =
  /^\s*("([^"\\]|\\.)*"\s*:\s*)?([[{]|"([^"\\]|\\.)*"|-?\d[\d.eE+-]*|true|false|null)?\s*[\]},]*\s*,?\s*$/;
const YAML_KEY_VALUE = /^\s*(-\s+)?[A-Za-z_"'][\w"' ./-]*:\s+\S/;
const YAML_KEY = /^\s*(-\s+)?[A-Za-z_"'][\w"'./-]*:\s*$/;
const YAML_ITEM = /^\s*-\s+\S/;
const YAML_DOCUMENT = /^(---|\.\.\.)\s*$/;

/** Preference among equal scores: the more specific languages first */
const ORDER: readonly CodeLanguage[] = [
  "diff",
  "json",
  "html",
  "tsx",
  "jsx",
  "typescript",
  "javascript",
  "python",
  "sql",
  "css",
  "yaml",
  "bash",
  "markdown",
];

/** The analysed head of the code: ~4 KB, cut at a line break, ≤ 200 lines */
function sample(code: string): { text: string; whole: boolean } {
  let text = code.slice(0, SAMPLE_CHARS);
  const whole = text.length === code.length;
  if (!whole) {
    const cut = text.lastIndexOf("\n");
    if (cut > 0) text = text.slice(0, cut);
  }
  const lines = text.split("\n");
  if (lines.length > SAMPLE_LINES) {
    return { text: lines.slice(0, SAMPLE_LINES).join("\n"), whole: false };
  }
  return { text, whole };
}

/** Language decided by an unambiguous marker, else undefined */
function marker(text: string, whole: boolean): CodeLanguage | undefined {
  const end = text.indexOf("\n");
  const first = (end < 0 ? text : text.slice(0, end)).trim();
  if (first.startsWith("#!")) {
    if (/\b(ba|z|k|da)?sh\b/.test(first)) return "bash";
    if (/\bpython[\d.]*\b/.test(first)) return "python";
    if (/\b(node|deno|bun)\b/.test(first)) return "javascript";
  }
  if (/^(<!doctype\s+html|<\?xml\s|<html[\s>])/i.test(first)) return "html";
  if (whole && /^[[{]/.test(text) && /["\d]/.test(text)) {
    try {
      const value: unknown = JSON.parse(text);
      if (value !== null && typeof value === "object") return "json";
    } catch {
      // not strict JSON: scored below
    }
  }
  return undefined;
}

/**
 * Guesses the language of unlabelled code: one of the canonical names of
 * `supportedCodeLanguages`, `"plain"` when nothing is convincing (empty,
 * very short or ambiguous text, prose). Fast heuristic scoring of the
 * first ~4 KB / 200 lines: shebangs, doctypes and valid JSON decide
 * directly; otherwise keywords, declarations and the shape of the lines
 * (`key: value`, `prop: value;`, `+` / `-` hunks, tags inside JavaScript…)
 * are weighed and the best score above a threshold wins. Deterministic and
 * dependency-free; a guess, so pass the language when it is known.
 */
export function detectCodeLanguage(code: string): CodeLanguage {
  if (typeof code !== "string") return "plain";
  const { text: head, whole } = sample(code.replace(/\r\n?/g, "\n"));
  const text = head.trim();
  if (text.length < 4) return "plain";

  const decided = marker(text, whole);
  if (decided) return decided;

  const score: Record<Bucket, number> = {
    js: 0,
    ts: 0,
    jsx: 0,
    json: 0,
    css: 0,
    html: 0,
    bash: 0,
    python: 0,
    yaml: 0,
    sql: 0,
    diff: 0,
    markdown: 0,
  };
  const hits = new Array<number>(LINE_RULES.length).fill(0);
  const lines = text
    .split("\n")
    .map((line) => line.slice(0, LINE_CHARS).replace(/\s+$/, ""));
  let nonBlank = 0;
  let jsonLines = 0;
  let yamlLines = 0;
  let yamlKeys = 0;
  let yamlItems = 0;
  let yamlDocuments = 0;
  let yamlNested = false;
  let yamlParent = false;
  let plus = 0;
  let minus = 0;
  let hunkLike = 0;
  let prose = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    nonBlank++;
    LINE_RULES.forEach(([bucket, pattern, points, cap = 4], r) => {
      if (hits[r] < cap && pattern.test(line)) {
        hits[r]++;
        score[bucket] += points;
      }
    });
    if (JSON_LINE.test(line) || /^\s*\/\/ /.test(line)) jsonLines++;
    if (prose < 4 && isProse(line)) {
      prose++;
      score.markdown += 0.25;
    }
    // a `--- a/file` line followed by `+++ b/file`
    if (/^--- \S/.test(line) && /^\+\+\+ \S/.test(lines[i + 1] ?? "")) {
      score.diff += 5;
    }
    if (/^[+-]/.test(line)) {
      if (line[0] === "+") plus++;
      else minus++;
      hunkLike++;
    } else if (/^( |@@|\\ No newline|diff |index |--- |\+\+\+ )/.test(line)) {
      hunkLike++;
    }
    if (/^\s*#/.test(line)) {
      yamlLines++; // a comment does not break the YAML shape
    } else if (YAML_DOCUMENT.test(line)) {
      yamlLines++;
      yamlDocuments++;
    } else if (
      (YAML_KEY_VALUE.test(line) || YAML_KEY.test(line)) &&
      !/[;,{(]$/.test(line)
    ) {
      yamlLines++;
      yamlKeys++;
      if (yamlParent && /^\s+/.test(line)) yamlNested = true;
      yamlParent = YAML_KEY.test(line);
    } else if (YAML_ITEM.test(line) && !/[;{]$/.test(line)) {
      yamlLines++;
      yamlItems++;
    } else if (/^\s+\S/.test(line) && yamlKeys) {
      yamlLines += 0.5; // continuation of a block scalar or a flow value
    }
  }

  // JSON that is not strictly valid (truncated, trailing commas): its shape
  if (/^[[{]/.test(text)) {
    if (nonBlank >= 2 && jsonLines >= nonBlank * 0.9) score.json += 6;
    if (/^(\[\s*)?\{\s*"[^"\n]*"\s*:/.test(text)) score.json += 4;
  }
  // headerless diff: only +, - and context lines, both + and -
  if (plus && minus && hunkLike === nonBlank) {
    score.diff += 3 + Math.min(nonBlank, 6) * 0.5;
  }
  if (text.startsWith("<")) score.html += 2;
  // YAML: mostly `key: value` / `- item` lines
  if (yamlKeys >= 2 && yamlLines >= nonBlank * 0.75) {
    score.yaml +=
      yamlKeys +
      Math.min(yamlItems, 6) * 0.5 +
      yamlDocuments +
      (yamlNested ? 1 : 0);
  }

  const candidates: Partial<Record<CodeLanguage, number>> = {
    json: score.json,
    css: score.css,
    html: score.html,
    bash: score.bash,
    python: score.python,
    yaml: score.yaml,
    sql: score.sql,
    diff: score.diff,
    markdown: score.markdown,
  };
  const typed = score.ts >= THRESHOLD;
  if (score.jsx >= THRESHOLD && score.js + score.ts + score.jsx >= 5) {
    candidates[typed ? "tsx" : "jsx"] = score.js + score.ts + score.jsx;
  } else if (typed) {
    candidates.typescript = score.js + score.ts;
  } else {
    candidates.javascript = score.js;
  }

  let best: CodeLanguage = "plain";
  let bestScore = 0;
  for (const language of ORDER) {
    const value = candidates[language] ?? 0;
    if (value >= THRESHOLD && value > bestScore) {
      best = language;
      bestScore = value;
    }
  }
  return best;
}
