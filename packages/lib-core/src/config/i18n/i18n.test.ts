import { describe, expect, it } from "vitest";
import en from "./en/index.json";
import fr from "./fr/index.json";
import zh from "./zh/index.json";

/** Flattens nested translations into sorted dot-separated keys */
const flattenKeys = (value: unknown, prefix = ""): string[] => {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value as Record<string, unknown>)
    .flatMap(([key, child]) =>
      flattenKeys(child, prefix ? `${prefix}.${key}` : key),
    )
    .sort();
};

/** Interpolation placeholders used by a translation, e.g. ["count"] */
const placeholders = (text: string) =>
  [...text.matchAll(/\{\{\s*(\w+)\s*\}\}/g)].map((match) => match[1]).sort();

const lookup = (bundle: unknown, key: string) =>
  key
    .split(".")
    .reduce<unknown>(
      (node, part) => (node as Record<string, unknown>)[part],
      bundle,
    ) as string;

describe("lib-core translations", () => {
  const enKeys = flattenKeys(en);

  it.each([
    ["zh", zh],
    ["fr", fr],
  ])("%s has exactly the same keys as en", (_, bundle) => {
    expect(flattenKeys(bundle)).toEqual(enKeys);
  });

  it.each([
    ["zh", zh],
    ["fr", fr],
  ])("%s uses the same interpolation placeholders as en", (_, bundle) => {
    for (const key of enKeys) {
      expect(placeholders(lookup(bundle, key)), key).toEqual(
        placeholders(lookup(en, key)),
      );
    }
  });

  it("has no empty translation", () => {
    for (const bundle of [en, zh, fr]) {
      for (const key of flattenKeys(bundle)) {
        expect(lookup(bundle, key).trim(), key).not.toBe("");
      }
    }
  });
});
