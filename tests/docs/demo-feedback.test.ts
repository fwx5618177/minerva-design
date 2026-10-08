// Docs demos give feedback with Minerva's own components (toast, Modal,
// ConfirmDialog, an inline result line...), never with the browser's
// blocking dialogs or the devtools console: a reader trying a demo must see
// what happened on the page. Scans every demo source (React demos, Web
// Components demos) and every code snippet embedded in a docs page.
//
// `confirm(` is fine when it is Minerva's own `confirm()` / `useConfirm()`
// (imported from minerva-design or minerva-design/web-components);
// `window.confirm` never is.
import { describe, expect, it } from "vitest";
import { read, walk } from "./utils";

const PAGES = "apps/docs/src/docs/pages";

type Rule = "alert" | "prompt" | "confirm" | "console";

/**
 * Files allowed to contain a forbidden pattern, with the reason. Each entry
 * must still be needed (a stale entry fails the suite).
 */
const ALLOWLIST: ReadonlyArray<{
  file: string;
  rule: Rule;
  reason: string;
}> = [
  {
    file: "html-preview/demos/basic.tsx",
    rule: "alert",
    reason:
      'sanitizer input: the `<script>alert("never runs")</script>` string is the untrusted HTML HtmlPreview strips; it is never executed',
  },
  {
    file: "html-preview/wc/sanitized.ts",
    rule: "alert",
    reason:
      "sanitizer input: `<script>alert()</script>`, `onerror=` and `onclick=` strings show what <minerva-html-preview> removes; they are never executed",
  },
];

/** Code of a demo source: <script> bodies and on* handlers for HTML files */
function codeOf(file: string, source: string): string {
  if (!file.endsWith(".html")) return source;
  const scripts = Array.from(
    source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi),
    (m) => m[1],
  );
  const handlers = Array.from(
    source.matchAll(/\son[a-z]+\s*=\s*("([^"]*)"|'([^']*)')/gi),
    (m) => m[2] ?? m[3] ?? "",
  );
  return [...scripts, ...handlers].join("\n");
}

/** Minerva's confirm() is bound in the file (import, dynamic import, hook) */
const hasMinervaConfirm = (code: string) =>
  /import\s*(?:type\s*)?\{[^}]*\bconfirm\b[^}]*\}\s*from\s*["']minerva-design[^"']*["']/.test(
    code,
  ) ||
  /\{[^}]*\bconfirm\b[^}]*\}\s*=\s*await\s+import\(\s*["']minerva-design/.test(
    code,
  ) ||
  /\b(?:const|let)\s+confirm\s*=\s*useConfirm\(/.test(code);

/** Forbidden feedback patterns found in a demo source */
function feedbackProblems(file: string, source: string): Rule[] {
  const code = codeOf(file, source);
  const found = new Set<Rule>();
  if (/(?:\bwindow\.|(?<![\w.$]))alert\s*\(/.test(code)) found.add("alert");
  if (/(?:\bwindow\.|(?<![\w.$]))prompt\s*\(/.test(code)) found.add("prompt");
  if (/\bconsole\.(?:log|info|debug|table|dir)\s*\(/.test(code)) {
    found.add("console");
  }
  if (
    /\bwindow\.confirm\s*\(/.test(code) ||
    (/(?<![\w.$])confirm\s*\(/.test(code) && !hasMinervaConfirm(code))
  ) {
    found.add("confirm");
  }
  return [...found];
}

const sources = walk(PAGES, (f) =>
  /\/(?:demos|wc)\/[^/]+\.(?:tsx?|html)$|\/index\.tsx$/.test(f),
).map((f) => f.slice(PAGES.length + 1));

const allowed = (file: string, rule: Rule) =>
  ALLOWLIST.some((entry) => entry.file === file && entry.rule === rule);

describe("docs demo feedback", () => {
  it("scans the React demos, the Web Components demos and the page snippets", () => {
    expect(sources.filter((f) => f.includes("/demos/")).length).toBeGreaterThan(
      100,
    );
    expect(sources.filter((f) => f.includes("/wc/")).length).toBeGreaterThan(
      100,
    );
    expect(
      sources.filter((f) => f.endsWith("/index.tsx")).length,
    ).toBeGreaterThan(50);
  });

  it("no demo uses alert / prompt / window.confirm / console.log as feedback", () => {
    const problems = sources.flatMap((file) =>
      feedbackProblems(file, read(PAGES, file))
        .filter((rule) => !allowed(file, rule))
        .map((rule) => `${file}: ${rule}`),
    );
    expect(problems).toEqual([]);
  });

  it("every allowlist entry is documented and still needed", () => {
    for (const entry of ALLOWLIST) {
      expect(entry.reason.length, entry.file).toBeGreaterThan(20);
      expect(sources, entry.file).toContain(entry.file);
      expect(
        feedbackProblems(entry.file, read(PAGES, entry.file)),
        `${entry.file} no longer needs its "${entry.rule}" allowlist entry`,
      ).toContain(entry.rule);
    }
  });

  describe("the scanner", () => {
    it.each([
      ["a.tsx", `onClick={() => alert("Hi")}`, ["alert"]],
      ["a.tsx", `window.alert("Hi")`, ["alert"]],
      ["a.ts", `const name = prompt("Name?")`, ["prompt"]],
      ["a.ts", `if (window.confirm("Sure?")) go()`, ["confirm"]],
      ["a.ts", `if (confirm("Sure?")) go()`, ["confirm"]],
      [
        "a.ts",
        `select.addEventListener("x", (e) => console.log(e))`,
        ["console"],
      ],
      [
        "a.html",
        `<button onclick="alert('x')">confirm()</button><script>console.log(1)</script>`,
        ["alert", "console"],
      ],
    ] as const)("flags %s: %s", (file, code, rules) => {
      expect(feedbackProblems(file, code).sort()).toEqual([...rules].sort());
    });

    it.each([
      [
        "a.tsx",
        `import { Button, confirm } from "minerva-design";\nawait confirm({ title: "Delete?" })`,
      ],
      [
        "a.ts",
        `const { confirm } = await import("minerva-design/web-components");\nawait confirm({ title: "x" })`,
      ],
      ["a.tsx", `const confirm = useConfirm();\nawait confirm({ title: "x" })`],
      ["a.html", `<minerva-button>confirm({ host })</minerva-button>`],
      [
        "a.tsx",
        `<Alert color="info" role="alert">Saved</Alert>; toast.success("Saved")`,
      ],
      ["a.ts", `region.toast.info("x"); store.alert(); console.error(err)`],
    ])("accepts %s: %s", (file, code) => {
      expect(feedbackProblems(file, code)).toEqual([]);
    });
  });
});
