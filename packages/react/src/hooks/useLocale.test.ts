import { createElement, type ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useLocale from "./useLocale";
import useI18n from "./useI18n";
import i18n, { messages } from "../config/i18n";
import { ConfigProvider } from "../contexts/ConfigProvider";

describe("useLocale / useI18n", () => {
  it('defaults to English ("en")', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current[0].language).toBe("en");
    expect(i18n.language).toBe("en");
  });

  it("switches the library language and translations", () => {
    const { result } = renderHook(() => {
      const [locale, setLocale] = useLocale({ language: "en" });
      const { t } = useI18n();
      return { locale, setLocale, t };
    });
    expect(result.current.t("avatar.default")).toBe("avatar");

    act(() => result.current.setLocale({ language: "zh" }));
    expect(i18n.language).toBe("zh");
    expect(result.current.t("avatar.default")).toBe("头像");
  });

  it("ships a translation for every supported language", () => {
    for (const language of ["en", "zh", "ja", "fr"]) {
      expect(messages).toHaveProperty(language);
    }
  });

  it("leaves the global language to the root ConfigProvider when inside one", () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ConfigProvider, { locale: { language: "ja" }, children });
    const { result } = renderHook(
      () => {
        const [locale, setLocale] = useLocale({ language: "fr" });
        const { t } = useI18n();
        return { locale, setLocale, t };
      },
      { wrapper },
    );
    expect(result.current.locale.language).toBe("fr");
    expect(i18n.language).toBe("ja");
    expect(result.current.t("empty.description")).toBe("データがありません");
    act(() => result.current.setLocale({ language: "zh" }));
    expect(i18n.language).toBe("ja");
  });
});
