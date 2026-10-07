// @vitest-environment node
// Generated / derived files must be up to date with the sources:
// - custom-elements.json  (pnpm --filter @minerva/lib-web-components manifest)
// - package.json "exports" (node scripts/sync-package.mjs)
// - src/internal/icons.ts (node scripts/generate-icons.mjs, from lib-core)
// - src/index.ts re-exports every define entry (registers every element)
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  MANIFEST,
  OPTIONAL_ENTRIES,
  elementsOf,
  generateManifest,
  serializeManifest,
} from "../../scripts/manifest.mjs";
import { expectedExports } from "../../scripts/sync-package.mjs";
import { generateIcons } from "../../scripts/generate-icons.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("generated files", () => {
  it("custom-elements.json is up to date", () => {
    expect(readFileSync(MANIFEST, "utf8")).toBe(
      serializeManifest(generateManifest()),
    );
  });

  it("package.json exports list every element entry", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    expect(pkg.exports).toEqual(expectedExports());
  });

  it("icons match lib-core's icon set", async () => {
    expect(readFileSync(join(root, "src/internal/icons.ts"), "utf8")).toBe(
      await generateIcons(),
    );
  });

  it("the all-in-one entry re-exports every define entry but the optional ones", () => {
    const index = readFileSync(join(root, "src/index.ts"), "utf8");
    const entries = readdirSync(join(root, "src/elements"))
      .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
      .map((f) => f.replace(/\.ts$/, ""));
    expect(
      entries.filter(
        (e) =>
          !OPTIONAL_ENTRIES.includes(e) &&
          !index.includes(`from "./elements/${e}"`),
      ),
    ).toEqual([]);
    // optional entries (optional peer dependencies) stay out of it
    for (const entry of OPTIONAL_ENTRIES) {
      expect(index).not.toContain(`./elements/${entry}`);
    }
  });

  it("every element is documented with a tag, a summary and described attributes", () => {
    const manifest = generateManifest();
    const problems: string[] = [];
    for (const el of elementsOf(manifest) as Array<{
      tagName: string;
      summary?: string;
      attributes?: { name: string; description?: string }[];
    }>) {
      if (!el.summary) problems.push(`${el.tagName}: no @summary`);
      // a JSDoc line starting with "@scope/package" becomes a bogus tag and
      // silently truncates the description
      if (
        /\b(from|by|in|of)$/.test(
          (el as { description?: string }).description ?? "",
        )
      ) {
        problems.push(`${el.tagName}: truncated description`);
      }
      for (const attr of el.attributes ?? []) {
        if (!attr.description) {
          problems.push(`${el.tagName}[${attr.name}]: no description`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});
