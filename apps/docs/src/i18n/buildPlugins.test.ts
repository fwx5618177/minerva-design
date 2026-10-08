// Build guards of the docs site (scripts/build-plugins.mjs): the per-language
// page metadata module and the chunk size budget.
import { describe, expect, it, vi } from "vitest";
import {
  DEFAULT_BUDGET,
  KB,
  LOCALE_BUDGET,
  bundleBudgetPlugin,
  docsMetaPlugin,
  overBudget,
  readDocsMeta,
} from "../../scripts/build-plugins.mjs";
import { docPages } from "@/docs/registry";

type Hook = (this: unknown, ...args: unknown[]) => unknown;
const hook = (plugin: unknown, name: string) =>
  (plugin as Record<string, Hook>)[name];

describe("docs meta module", () => {
  it("holds only the title and description of every page", () => {
    for (const lng of ["en", "zh", "ja", "fr"]) {
      const { meta } = readDocsMeta(lng);
      for (const page of docPages) {
        expect(Object.keys(meta[page.id] ?? {}).sort(), page.id).toEqual([
          "description",
          "title",
        ]);
      }
      // a small fraction of the full strings
      expect(JSON.stringify(meta).length).toBeLessThan(LOCALE_BUDGET / 4);
    }
  });

  it("resolves virtual:docs-meta/<lng> and watches the source files", () => {
    const plugin = docsMetaPlugin();
    const resolveId = hook(plugin, "resolveId");
    const load = hook(plugin, "load");
    expect(resolveId.call({}, "virtual:docs-meta/fr")).toBe(
      "\0virtual:docs-meta/fr",
    );
    expect(resolveId.call({}, "./other")).toBeUndefined();
    expect(load.call({}, "/src/other.ts")).toBeUndefined();

    const ctx = { addWatchFile: vi.fn(), error: vi.fn() };
    const code = load.call(ctx, "\0virtual:docs-meta/fr") as string;
    const meta = new Function(
      `return ${code.replace(/^export default /, "")}`,
    )() as Record<string, { title: string }>;
    expect(meta.button.title).toBe("Button");
    expect(ctx.addWatchFile).toHaveBeenCalled();

    const failing = {
      addWatchFile: vi.fn(),
      error: vi.fn((message: string) => {
        throw new Error(message);
      }),
    };
    expect(() => load.call(failing, "\0virtual:docs-meta/../x")).toThrow(
      /Unknown docs language/,
    );
  });
});

describe("bundle budget", () => {
  const chunk = (fileName: string, size: number, moduleIds: string[]) => ({
    fileName,
    code: "x".repeat(size),
    moduleIds,
  });

  it("caps locale chunks at 250 kB and every other chunk at 500 kB", () => {
    expect(LOCALE_BUDGET).toBe(250 * KB);
    expect(DEFAULT_BUDGET).toBe(500 * KB);
    expect(
      overBudget([
        chunk("button.js", 200 * KB, ["/src/i18n/locales/ja/docs/button.json"]),
        chunk("meta.js", 10 * KB, ["\0virtual:docs-meta/ja"]),
        chunk("vendor.js", 400 * KB, ["/node_modules/react/index.js"]),
      ]),
    ).toEqual([]);
    expect(
      overBudget([
        chunk("docs-ja.js", 300 * KB, ["/src/i18n/locales/ja/docs/a.json"]),
        chunk("big.js", 501 * KB, ["/src/big.ts"]),
      ]),
    ).toEqual([
      "docs-ja.js: 300.0 kB > 250 kB (locale strings)",
      "big.js: 501.0 kB > 500 kB",
    ]);
  });

  it("fails the build when a chunk is over budget", () => {
    const generateBundle = hook(bundleBudgetPlugin(), "generateBundle");
    const error = vi.fn();
    generateBundle.call(
      { error },
      {},
      {
        "ok.js": { type: "chunk", ...chunk("ok.js", 10, ["/src/a.ts"]) },
        "style.css": { type: "asset", fileName: "style.css" },
      },
    );
    expect(error).not.toHaveBeenCalled();
    generateBundle.call(
      { error },
      {},
      {
        "big.js": {
          type: "chunk",
          ...chunk("big.js", 501 * KB, ["/src/a.ts"]),
        },
      },
    );
    expect(error).toHaveBeenCalledWith(expect.stringMatching(/big\.js/));
  });
});
