import { act, render, renderHook, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import useI18n from "./useI18n";
import { DEFAULT_LANGUAGE, setLanguage } from "../config/i18n";
import { ConfigProvider } from "../contexts/ConfigProvider";

const Probe = () => {
  const { t, language } = useI18n();
  return (
    <span data-testid="probe" data-language={language}>
      {t("common.loading")}
    </span>
  );
};

describe("useI18n", () => {
  afterEach(() => setLanguage(DEFAULT_LANGUAGE));

  it("returns only `t` and `language`", () => {
    const { result } = renderHook(() => useI18n());
    expect(Object.keys(result.current).sort()).toEqual(["language", "t"]);
    expect(result.current.language).toBe("en");
  });

  it("re-renders when the global language changes", () => {
    render(<Probe />);
    const probe = screen.getByTestId("probe");
    expect(probe).toHaveTextContent("Loading");

    act(() => setLanguage("zh"));
    expect(probe).toHaveTextContent("加载中");
    expect(probe).toHaveAttribute("data-language", "zh");

    act(() => setLanguage("en"));
    expect(probe).toHaveTextContent("Loading");
  });

  it("interpolates and pluralizes", () => {
    const { result } = renderHook(() => useI18n());
    const { t } = result.current;
    expect(t("pagination.page", { page: 3 })).toBe("Page 3");
    expect(t("monthCalendar.dayWithEvents", { date: "May 1", count: 1 })).toBe(
      "May 1, 1 event",
    );
    expect(t("monthCalendar.dayWithEvents", { date: "May 1", count: 2 })).toBe(
      "May 1, 2 events",
    );
    expect(t("does.not.exist", { defaultValue: "Fallback" })).toBe("Fallback");
    expect(t("does.not.exist")).toBe("does.not.exist");
  });

  it("keeps a stable `t` until the language changes", () => {
    const { result, rerender } = renderHook(() => useI18n());
    const first = result.current.t;
    rerender();
    expect(result.current.t).toBe(first);
    act(() => setLanguage("fr"));
    expect(result.current.t).not.toBe(first);
  });

  it("reports unsupported global languages as the default one", () => {
    setLanguage("de");
    const { result } = renderHook(() => useI18n());
    expect(result.current.language).toBe("en");
    expect(result.current.t("common.loading")).toBe("Loading");
  });

  it("follows the locale of a nested ConfigProvider", () => {
    render(
      <ConfigProvider locale={{ language: "en" }}>
        <ConfigProvider locale={{ language: "ja" }}>
          <Probe />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("probe")).toHaveAttribute("data-language", "ja");
  });

  it("renders the default language on the server (SSR snapshot)", () => {
    setLanguage("zh");
    const html = renderToString(<Probe />);
    expect(html).toContain("Loading");
    expect(html).toContain('data-language="en"');
  });
});
