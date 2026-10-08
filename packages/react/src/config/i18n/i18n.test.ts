import { afterEach, describe, expect, it, vi } from "vitest";
import { SUPPORTED_LANGUAGES, messages as coreMessages } from "@minerva/core";
import i18n, {
  DEFAULT_LANGUAGE,
  getLanguage,
  getServerLanguage,
  messages,
  resolveLanguage,
  setLanguage,
  subscribeLanguage,
  translateMessage,
} from ".";

// The message bundles and the translator are tested in @minerva/core; this
// covers the React library's global language store.
describe("React language store", () => {
  afterEach(() => setLanguage(DEFAULT_LANGUAGE));

  it("uses @minerva/core's messages of every language", () => {
    expect(messages).toBe(coreMessages);
    for (const language of SUPPORTED_LANGUAGES) {
      expect(translateMessage("common.loading", undefined, language)).toBe(
        (coreMessages[language].common as Record<string, string>).loading,
      );
    }
  });

  it("starts in the default language and switches languages", () => {
    expect(DEFAULT_LANGUAGE).toBe("en");
    expect(getLanguage()).toBe("en");
    expect(i18n.language).toBe("en");
    expect(translateMessage("common.loading")).toBe("Loading");
    // group strings (groups/*.json) are merged into the same tree
    expect(i18n.t("themeToggle.light")).not.toBe("themeToggle.light");

    setLanguage("zh");
    expect(getLanguage()).toBe("zh");
    expect(translateMessage("common.loading")).toBe("加载中");

    i18n.changeLanguage("fr");
    expect(i18n.language).toBe("fr");
  });

  it("falls back to the default language for unknown languages", () => {
    setLanguage("de");
    expect(translateMessage("common.loading")).toBe("Loading");
    expect(resolveLanguage("de")).toBe("en");
    expect(resolveLanguage("ja")).toBe("ja");
  });

  it("notifies subscribers of actual changes only, until they unsubscribe", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeLanguage(listener);
    setLanguage("ja");
    expect(listener).toHaveBeenCalledTimes(1);
    setLanguage("ja");
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    setLanguage("fr");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("reports the default language as the server snapshot", () => {
    setLanguage("zh");
    expect(getServerLanguage()).toBe(DEFAULT_LANGUAGE);
  });

  it("does not touch globals", async () => {
    const before = new Set(Object.keys(globalThis));
    vi.resetModules();
    await import(".");
    const added = Object.keys(globalThis).filter((key) => !before.has(key));
    expect(added).toEqual([]);
    expect(document.documentElement.lang).toBe("");
  });
});
