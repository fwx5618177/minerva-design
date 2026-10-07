import { afterEach, describe, expect, it } from "vitest";
import { SUPPORTED_LANGUAGES, messages } from "@minerva/core";
import i18n, { DEFAULT_LANGUAGE, resources } from ".";

// The message bundles themselves are tested in @minerva/core; this covers how
// lib-core loads them into its private i18next instance.
describe("lib-core i18next instance", () => {
  afterEach(() => i18n.changeLanguage(DEFAULT_LANGUAGE));

  it("loads @minerva/core's messages of every language as the index namespace", () => {
    expect(Object.keys(resources).sort()).toEqual(
      [...SUPPORTED_LANGUAGES].sort(),
    );
    for (const language of SUPPORTED_LANGUAGES) {
      expect(resources[language].index).toBe(messages[language]);
      expect(i18n.getResourceBundle(language, "index")).toEqual(
        messages[language],
      );
    }
  });

  it("starts in the default language and switches languages", async () => {
    expect(DEFAULT_LANGUAGE).toBe("en");
    expect(i18n.language).toBe("en");
    expect(i18n.t("common.loading")).toBe("Loading");
    // group strings (groups/*.json) are merged into the same namespace
    expect(i18n.t("themeToggle.light")).not.toBe("themeToggle.light");

    await i18n.changeLanguage("zh");
    expect(i18n.t("common.loading")).toBe("加载中");
  });

  it("falls back to the default language for unknown languages", async () => {
    await i18n.changeLanguage("de");
    expect(i18n.t("common.loading")).toBe("Loading");
  });

  it("is private: does not touch the global i18next instance", async () => {
    const { default: globalI18next } = await import("i18next");
    expect(i18n).not.toBe(globalI18next);
  });
});
