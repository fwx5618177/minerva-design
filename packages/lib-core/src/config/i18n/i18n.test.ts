import { describe, expect, it } from "vitest";
import enBundle from "./en";
import frBundle from "./fr";
import jaBundle from "./ja";
import zhBundle from "./zh";
import { mergeMessages } from "./merge";

// Merged "index" namespace (index.json + groups/*.json)
const en = enBundle.index;
const fr = frBundle.index;
const ja = jaBundle.index;
const zh = zhBundle.index;

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
    ["ja", ja],
  ])("%s has exactly the same keys as en", (_, bundle) => {
    expect(flattenKeys(bundle)).toEqual(enKeys);
  });

  it.each([
    ["zh", zh],
    ["fr", fr],
    ["ja", ja],
  ])("%s uses the same interpolation placeholders as en", (_, bundle) => {
    for (const key of enKeys) {
      expect(placeholders(lookup(bundle, key)), key).toEqual(
        placeholders(lookup(en, key)),
      );
    }
  });

  it("has no empty translation", () => {
    for (const bundle of [en, zh, fr, ja]) {
      for (const key of flattenKeys(bundle)) {
        expect(lookup(bundle, key).trim(), key).not.toBe("");
      }
    }
  });
});

describe("mergeMessages", () => {
  it("deep-merges nested namespaces, later sources win", () => {
    expect(
      mergeMessages(
        { a: { x: "1", y: "2" }, b: "b" },
        { a: { y: "3", z: "4" } },
        { c: "c" },
      ),
    ).toEqual({ a: { x: "1", y: "3", z: "4" }, b: "b", c: "c" });
  });

  it("replaces a string with an object and vice versa", () => {
    expect(mergeMessages({ a: "x" }, { a: { b: "y" } })).toEqual({
      a: { b: "y" },
    });
    expect(mergeMessages({ a: { b: "y" } }, { a: "x" })).toEqual({ a: "x" });
  });
});
