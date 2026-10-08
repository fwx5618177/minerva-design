// @vitest-environment happy-dom
// Documentation strings are split per page: every route only needs the
// titles / descriptions of all pages, plus the full strings of its own page.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import i18n, {
  PAGE_STRING_DEPS,
  changeLanguage,
  loadLanguage,
  loadPageStrings,
} from "./config";

const here = dirname(fileURLToPath(import.meta.url));
const PAGES = join(here, "../docs/pages");

const has = (key: string, lng: string) =>
  i18n.exists(key, { lng, fallbackLng: false });

describe("documentation strings", () => {
  it("loads the titles and descriptions of every page with the language", async () => {
    await loadLanguage("ja");
    expect(has("docs.button.title", "ja")).toBe(true);
    expect(has("docs.button.description", "ja")).toBe(true);
    expect(has("docs.button.title", "en")).toBe(true);
    // the rest of a page's strings come with the page
    expect(has("docs.button.demos.basic.title", "ja")).toBe(false);
    expect(has("docs.button.demos.basic.title", "en")).toBe(false);
  });

  it("loads a page's strings (and its English fallback) with the page", async () => {
    await loadPageStrings("button", "ja");
    expect(has("docs.button.demos.basic.title", "ja")).toBe(true);
    expect(has("docs.button.demos.basic.title", "en")).toBe(true);
    expect(has("docs.card.demos.basic.title", "ja")).toBe(false);
    // unknown pages are ignored
    await expect(loadPageStrings("does-not-exist", "ja")).resolves.toBe(
      undefined,
    );
  });

  it("loads the pages a page depends on", async () => {
    await loadPageStrings("theming", "en");
    expect(PAGE_STRING_DEPS.theming).toContain("theme-utils");
    expect(i18n.exists("docs.theme-utils.api", { lng: "en" })).toBe(true);
  });

  it("reloads the pages displayed so far when the language changes", async () => {
    expect(has("docs.button.demos.basic.title", "fr")).toBe(false);
    await changeLanguage("fr");
    expect(i18n.language).toBe("fr");
    expect(has("docs.button.title", "fr")).toBe(true);
    expect(has("docs.button.demos.basic.title", "fr")).toBe(true);
    await changeLanguage("en");
  });

  it("declares every cross-page string a page renders in PAGE_STRING_DEPS", () => {
    const sources = (dir: string): string[] =>
      readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return sources(path);
        return /\.tsx?$/.test(name) ? [path] : [];
      });
    const missing: string[] = [];
    for (const page of readdirSync(PAGES)) {
      const allowed = new Set([page, ...(PAGE_STRING_DEPS[page] ?? [])]);
      for (const file of sources(join(PAGES, page))) {
        const code = readFileSync(file, "utf8");
        for (const [, other, rest] of code.matchAll(
          /docs\.([a-z0-9-]+)\.([A-Za-z][\w.$-]*)/g,
        )) {
          // "docs.module.scss" imports; titles / descriptions are always loaded
          if (other === "module" || allowed.has(other)) continue;
          if (rest === "title" || rest === "description") continue;
          missing.push(`${page} -> docs.${other}.${rest}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });
});
