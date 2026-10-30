import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TradingChart } from "../index";
import type { TradingBar } from "../engine/trading/types";
import type { TradingChartHandle } from "./trading";

const flush = () =>
  act(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
  );

const bars: TradingBar[] = Array.from({ length: 120 }, (_, i) => ({
  time: Date.UTC(2024, 0, 1) + i * 60_000,
  open: 100 + i,
  high: 102 + i,
  low: 99 + i,
  close: 101 + i,
  volume: 10,
}));

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(600);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(360);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("TradingChart", () => {
  it("renders a sized chart and exposes a streaming handle", async () => {
    const ref = createRef<TradingChartHandle>();
    const { container, unmount } = render(
      <TradingChart
        ref={ref}
        bars={bars}
        height={320}
        symbol="ETH"
        locale="en-US"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.height).toBe("320px");
    expect(root.style.width).toBe("100%");
    await flush();
    expect(ref.current?.getBarCount()).toBe(120);
    act(() =>
      ref.current?.update({ ...bars[119], time: bars[119].time + 60_000 }),
    );
    expect(ref.current?.getBarCount()).toBe(121);
    expect(ref.current?.getInstance()).not.toBeNull();
    expect(
      container.querySelector('[aria-label="ETH price chart"]'),
    ).not.toBeNull();
    unmount();
    expect(container.querySelector(".minerva-trading-chart")).toBeNull();
  });

  it("translates its texts when the locale prop changes", async () => {
    const { container, rerender } = render(
      <TradingChart bars={bars} symbol="ETH" locale="en" />,
    );
    await flush();
    rerender(<TradingChart bars={bars} symbol="ETH" locale="zh-CN" />);
    await flush();
    expect(
      container.querySelector('[aria-label="ETH 价格图表"]'),
    ).not.toBeNull();
  });

  it("applies new props without remounting and forwards events", async () => {
    const onIndicatorToggle = vi.fn();
    const { container, rerender } = render(
      <TradingChart
        bars={bars}
        indicators={[{ type: "ma", period: 7 }]}
        onIndicatorToggle={onIndicatorToggle}
      />,
    );
    await flush();
    const root = container.querySelector(".minerva-trading-chart");
    rerender(
      <TradingChart
        bars={bars}
        indicators={[{ type: "ma", period: 7 }, { type: "rsi" }]}
        onIndicatorToggle={onIndicatorToggle}
      />,
    );
    await flush();
    expect(container.querySelector(".minerva-trading-chart")).toBe(root);
    expect(container.textContent).toContain("RSI 14");
    const button = [...container.querySelectorAll("button")].find(
      (b) => b.textContent === "MA7",
    )!;
    act(() => button.click());
    expect(onIndicatorToggle).toHaveBeenCalledWith({
      id: "ma:7",
      visible: false,
    });
  });
});
