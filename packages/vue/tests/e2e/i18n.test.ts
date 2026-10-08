// Built-in texts in every language: the root ConfigProvider's locale (also
// on the server), nested locale overrides, and the global language set by
// useLocale outside of a provider.
import { describe, expect, it } from "vitest";
import { createSSRApp, defineComponent, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { SUPPORTED_LANGUAGES, messages } from "@minerva/core";
import {
  ConfigProvider,
  Modal,
  Pagination,
  getLanguage,
  setLanguage,
  useLocale,
} from "../../src";
import { renderApp, settle } from "./utils";

type Tree = Record<string, Record<string, string>>;

describe("i18n of the built-in texts", () => {
  it.each(SUPPORTED_LANGUAGES)(
    "%s: modal close button and pagination",
    async (language) => {
      const texts = messages[language] as unknown as Tree;
      renderApp(() =>
        h(ConfigProvider, { locale: { language } }, () => [
          h(Pagination, { total: 50, current: 2 }),
          h(Modal, { open: true, title: "T" }),
        ]),
      );
      await settle(10);
      expect(
        document.querySelector(`nav[aria-label="${texts.pagination.nav}"]`),
      ).not.toBeNull();
      expect(
        document.querySelector(`button[aria-label="${texts.pagination.next}"]`),
      ).not.toBeNull();
      expect(
        document
          .querySelector('[data-part="close-button"]')!
          .getAttribute("aria-label"),
      ).toBe(texts.modal.close);
    },
  );

  it("a nested locale overrides its subtree only", async () => {
    renderApp(() =>
      h(ConfigProvider, { locale: { language: "ja" } }, () => [
        h("div", { id: "outer" }, h(Pagination, { total: 30 })),
        h(ConfigProvider, { locale: { language: "fr" } }, () =>
          h("div", { id: "inner" }, h(Pagination, { total: 30 })),
        ),
      ]),
    );
    await settle();
    const nav = (id: string) =>
      document.querySelector(`#${id} nav`)!.getAttribute("aria-label");
    expect(nav("outer")).toBe((messages.ja as unknown as Tree).pagination.nav);
    expect(nav("inner")).toBe((messages.fr as unknown as Tree).pagination.nav);
    // the root provider also sets the global language (imperative APIs)
    expect(getLanguage()).toBe("ja");
  });

  it("renders the provider's language on the server", async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(ConfigProvider, { locale: { language: "zh" } }, () =>
            h(Pagination, { total: 30 }),
          ),
      }),
    );
    expect(html).toContain(
      `aria-label="${(messages.zh as unknown as Tree).pagination.nav}"`,
    );
  });

  it("useLocale switches the global language outside of a provider", async () => {
    let set: ((language: "fr" | "en") => void) | undefined;
    const Picker = defineComponent(() => {
      const locale = useLocale();
      set = (language) => (locale.value = { language });
      return () => h(Pagination, { total: 30 });
    });
    renderApp(() => h(Picker));
    await settle();
    set!("fr");
    await settle();
    expect(getLanguage()).toBe("fr");
    expect(document.querySelector("nav")!.getAttribute("aria-label")).toBe(
      (messages.fr as unknown as Tree).pagination.nav,
    );
    setLanguage("en");
  });
});
