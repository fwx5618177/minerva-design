import { describe, expect, it, vi } from "vitest";
import {
  createTranslator,
  getPluralCategory,
  interpolate,
  messages,
  translate,
  type Messages,
} from ".";

const bundles: Record<string, Messages> = {
  en: {
    greeting: "Hello {{name}}",
    nested: { deep: { key: "Deep value" } },
    item_one: "{{count}} item",
    item_other: "{{count}} items",
    onlyEn: "English only",
    plain: "Plain",
    group: { child: "Child" },
  },
  fr: {
    greeting: "Bonjour {{name}}",
    item_one: "{{count}} élément",
    item_other: "{{count}} éléments",
    plain: "Simple",
  },
  ar: {
    file_zero: "zero files",
    file_one: "one file",
    file_two: "two files",
    file_few: "{{count}} files (few)",
    file_many: "{{count}} files (many)",
    file_other: "{{count}} files (other)",
  },
  pl: {
    apple_one: "{{count}} jabłko",
    apple_few: "{{count}} jabłka",
    apple_many: "{{count}} jabłek",
    apple_other: "{{count}} jabłka (other)",
  },
  zh: { item_other: "{{count}} 项" },
  de: { greeting: "Hallo {{name}}" },
};

describe("translate", () => {
  it("resolves nested dot-separated keys", () => {
    const t = createTranslator({ messages: bundles, language: "en" });
    expect(t("nested.deep.key")).toBe("Deep value");
    expect(t("plain")).toBe("Plain");
  });

  it("returns the key when nothing matches, or for non-string nodes", () => {
    const t = createTranslator({ messages: bundles, language: "en" });
    expect(t("missing.key")).toBe("missing.key");
    expect(t("group")).toBe("group");
    expect(t("nested.deep.key.tooFar")).toBe("nested.deep.key.tooFar");
    // prototype properties are not messages
    expect(t("toString")).toBe("toString");
    expect(t("plain.length")).toBe("plain.length");
  });

  it("interpolates {{placeholders}} without escaping", () => {
    const t = createTranslator({ messages: bundles, language: "fr" });
    expect(t("greeting", { name: "<b>Ana</b>" })).toBe("Bonjour <b>Ana</b>");
  });

  it("falls back to the fallback language, then to defaultValue, then to the key", () => {
    const t = createTranslator({ messages: bundles, language: "fr" });
    expect(t("onlyEn")).toBe("English only");
    expect(t("nope", { defaultValue: "Default {{x}}", x: 1 })).toBe(
      "Default 1",
    );
    expect(t("nope")).toBe("nope");
  });

  it("uses a custom fallback language", () => {
    const t = createTranslator({
      messages: bundles,
      language: "ja",
      fallbackLanguage: "fr",
    });
    expect(t("plain")).toBe("Simple");
    expect(t("onlyEn")).toBe("onlyEn");
  });

  it("tries the base language of a regional tag", () => {
    expect(translate({ messages: bundles, language: "fr-CA" }, "plain")).toBe(
      "Simple",
    );
  });

  it("falls back for unknown languages", () => {
    const t = createTranslator({ messages: bundles, language: "xx" });
    expect(t("plain")).toBe("Plain");
  });

  it("selects plural forms by count (one / other)", () => {
    const en = createTranslator({ messages: bundles, language: "en" });
    expect(en("item", { count: 1 })).toBe("1 item");
    expect(en("item", { count: 0 })).toBe("0 items");
    expect(en("item", { count: 5 })).toBe("5 items");

    const fr = createTranslator({ messages: bundles, language: "fr" });
    // French: 0 and 1 are both "one"
    expect(fr("item", { count: 0 })).toBe("0 élément");
    expect(fr("item", { count: 2 })).toBe("2 éléments");

    const zh = createTranslator({ messages: bundles, language: "zh" });
    expect(zh("item", { count: 1 })).toBe("1 项");
  });

  it("supports zero / two / few / many per the language's plural rules", () => {
    const ar = createTranslator({ messages: bundles, language: "ar" });
    expect(ar("file", { count: 0 })).toBe("zero files");
    expect(ar("file", { count: 1 })).toBe("one file");
    expect(ar("file", { count: 2 })).toBe("two files");
    expect(ar("file", { count: 3 })).toBe("3 files (few)");
    expect(ar("file", { count: 11 })).toBe("11 files (many)");
    expect(ar("file", { count: 100 })).toBe("100 files (other)");

    const pl = createTranslator({ messages: bundles, language: "pl" });
    expect(pl("apple", { count: 1 })).toBe("1 jabłko");
    expect(pl("apple", { count: 3 })).toBe("3 jabłka");
    expect(pl("apple", { count: 5 })).toBe("5 jabłek");
  });

  it("uses the plural rules of the language the message is found in", () => {
    // "de" has no `item_*` key: the English form is chosen by English rules
    const de = createTranslator({ messages: bundles, language: "de" });
    expect(de("item", { count: 1 })).toBe("1 item");
    expect(de("greeting", { name: "Bo" })).toBe("Hallo Bo");
  });

  it("uses the plain key when no plural form exists", () => {
    const t = createTranslator({ messages: bundles, language: "en" });
    expect(t("greeting", { count: 2, name: "Al" })).toBe("Hello Al");
  });

  it("does not mutate the configuration it was created with", () => {
    const config = { messages: bundles, language: "en" };
    const t = createTranslator(config);
    config.language = "fr";
    expect(t("plain")).toBe("Plain");
  });

  it("translates the built-in bundles", () => {
    const fr = createTranslator({ messages, language: "fr" });
    expect(fr("monthCalendar.dayWithEvents", { date: "1 mai", count: 2 })).toBe(
      "1 mai, 2 événements",
    );
    const en = createTranslator({ messages, language: "en" });
    expect(en("monthCalendar.dayWithEvents", { date: "May 1", count: 1 })).toBe(
      "May 1, 1 event",
    );
    expect(en("common.loading")).toBe("Loading");
  });
});

describe("interpolate", () => {
  it("replaces placeholders, tolerating whitespace and dotted paths", () => {
    expect(
      interpolate("{{ a }}-{{b.c}}-{{n}}", { a: "x", b: { c: "y" }, n: 0 }),
    ).toBe("x-y-0");
    expect(interpolate("{{user.name}}", { "user.name": "flat" })).toBe("flat");
  });

  it("keeps placeholders without a value", () => {
    expect(interpolate("Hi {{name}} {{other}}", { other: null })).toBe(
      "Hi {{name}} {{other}}",
    );
    expect(interpolate("Hi {{name}}")).toBe("Hi {{name}}");
  });
});

describe("getPluralCategory", () => {
  it("returns CLDR categories and caches the rules per language", () => {
    const spy = vi.spyOn(Intl, "PluralRules");
    expect(getPluralCategory("cy", 2)).toBe("two");
    expect(getPluralCategory("cy", 3)).toBe("few");
    expect(getPluralCategory("cy", 1)).toBe("one");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('gives "other" for invalid language tags', () => {
    expect(getPluralCategory("not a tag!", 1)).toBe("other");
  });
});
