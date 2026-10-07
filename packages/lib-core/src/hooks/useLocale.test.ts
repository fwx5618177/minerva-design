import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useLocale from "./useLocale";
import useI18n from "./useI18n";
import i18n from "../config/i18n";

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
    for (const language of ["en", "zh", "fr"]) {
      expect(i18n.hasResourceBundle(language, "index")).toBe(true);
    }
  });
});
