import { describe, expect, it } from "vitest";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  mergeMessages,
  messages,
} from ".";

// Merged message trees (index.json + groups/*.json)
const { en, fr, ja, zh } = messages;

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

describe("supported languages", () => {
  it("ships messages for exactly the supported languages", () => {
    expect(Object.keys(messages).sort()).toEqual(
      [...SUPPORTED_LANGUAGES].sort(),
    );
    expect(SUPPORTED_LANGUAGES).toContain(DEFAULT_LANGUAGE);
  });

  it("merges the component groups into each language", () => {
    // index.json strings and groups/*.json strings share one message tree
    for (const language of SUPPORTED_LANGUAGES) {
      expect(messages[language]).toHaveProperty("common");
      expect(messages[language]).toHaveProperty("table");
      expect(messages[language]).toHaveProperty("themeToggle");
    }
  });

  it("recognises supported languages", () => {
    expect(isSupportedLanguage("zh")).toBe(true);
    expect(isSupportedLanguage("de")).toBe(false);
    expect(isSupportedLanguage(undefined)).toBe(false);
  });
});

describe("translations", () => {
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
