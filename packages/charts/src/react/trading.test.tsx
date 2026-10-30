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

  it("forwards the keyboard order entry to onOrderCreate", async () => {
    const onOrderCreate = vi.fn();
    const { container } = render(
      <TradingChart
        bars={bars}
        orderEntry
        precision={2}
        locale="en-US"
        onOrderCreate={onOrderCreate}
      />,
    );
    await flush();
    const root = container.querySelector<HTMLElement>(
      ".minerva-trading-chart",
    )!;
    const key = (k: string) =>
      act(() => {
        root.dispatchEvent(
          new KeyboardEvent("keydown", { key: k, bubbles: true }),
        );
      });
    key("s");
    key("ArrowUp");
    key("Enter");
    expect(onOrderCreate).toHaveBeenCalledWith({ price: 220.01, side: "sell" });
  });

  it("forwards the drawing, replay and view methods of the handle", async () => {
    const ref = createRef<TradingChartHandle>();
    const onDrawingsChange = vi.fn();
    const onUndoChange = vi.fn();
    const onReplayChange = vi.fn();
    render(
      <TradingChart
        ref={ref}
        bars={bars}
        drawings={[
          {
            id: "h",
            type: "horizontalLine",
            points: [{ time: bars[10].time, price: 150 }],
          },
        ]}
        onDrawingsChange={onDrawingsChange}
        onUndoChange={onUndoChange}
        onReplayChange={onReplayChange}
        onOrderCreate={vi.fn()}
        onOrderCancel={vi.fn()}
        onFullscreenChange={vi.fn()}
      />,
    );
    await flush();
    const handle = ref.current!;
    act(() => handle.updateDrawing("h", { color: "#f00" }));
    expect(onDrawingsChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ id: "h", color: "#f00" }),
    ]);
    expect(handle.getUndoState()).toEqual({ canUndo: true, canRedo: false });
    act(() => handle.undo());
    expect(handle.getDrawings()[0].color).toBeUndefined();
    act(() => handle.redo());
    expect(onUndoChange).toHaveBeenCalled();

    act(() => handle.startReplay(bars[59].time));
    expect(handle.getBarCount()).toBe(60);
    act(() => handle.replayStep(2));
    expect(handle.getReplayState()?.index).toBe(62);
    act(() => handle.replayPlay(5));
    act(() => handle.replayPause());
    act(() => handle.stopReplay());
    expect(handle.getBarCount()).toBe(120);
    expect(onReplayChange).toHaveBeenCalled();

    act(() =>
      handle.setVisibleTimeRange({ from: bars[20].time, to: bars[80].time }),
    );
    await flush();
    expect(handle.getVisibleTimeRange()?.from).toBeCloseTo(bars[20].time, -3);
    act(() => handle.setCrosshair(bars[30].time));
    act(() => handle.setScaleMode("log"));
    expect(typeof handle.toDataURL()).toBe("string");
    await expect(handle.exitFullscreen()).resolves.toBeUndefined();

    // the rest of the handle reaches the instance
    act(() => {
      handle.appendBars([{ ...bars[119], time: bars[119].time + 60_000 }]);
      handle.prependBars([{ ...bars[0], time: bars[0].time - 60_000 }]);
      handle.fitContent();
      handle.scrollToRealtime(false);
      handle.setVisibleRange({ from: 10, to: 60 });
      handle.resetPriceScales();
      handle.setDrawingTool("rectangle");
      handle.selectDrawing("h");
      handle.setIndicatorVisible("volume", false);
    });
    expect(handle.getBarCount()).toBe(122);
    expect(handle.getBar(0)?.time).toBe(bars[0].time - 60_000);
    expect(handle.getVisibleRange()?.from).toBeCloseTo(10, 0);
    act(() => handle.removeDrawing("h"));
    expect(handle.getDrawings()).toEqual([]);
    act(() => handle.setBars(bars));
    expect(handle.getBarCount()).toBe(120);
    expect(handle.getRenderer()).toBeNull();
    await expect(handle.toBlob()).resolves.toBeNull();
  });
});
