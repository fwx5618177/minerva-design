import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DepthChart,
  OrderBook,
  OrderBookHeatmap,
  TimeAndSales,
  type DepthChartHandle,
  type OrderBookHandle,
  type MarketTrade,
  type TimeAndSalesHandle,
} from "../index";

const flush = () =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, 40)));

const texts: string[] = [];

beforeEach(() => {
  texts.length = 0;
  const ctx = new Proxy({} as Record<string, unknown>, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      if (key === "fillText") return (text: string) => texts.push(text);
      return () => {};
    },
    set(target, key: string, value) {
      target[key] = value;
      return true;
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) => (kind === "2d" ? ctx : null)) as never);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(400);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const BOOK = {
  bids: [
    [100, 1],
    [99.9, 2],
  ] as [number, number][],
  asks: [
    [100.1, 1.5],
    [100.2, 4],
  ] as [number, number][],
};

const trade = (i: number): MarketTrade => ({
  time: 1000 + i,
  price: 100 + (i % 3) * 0.1,
  size: 1 + (i % 2),
  side: i % 2 ? "sell" : "buy",
});

describe("order book components", () => {
  it("mounts a sized depth chart, applies the book and the ref handle", async () => {
    const ref = createRef<DepthChartHandle>();
    const { container, unmount } = render(
      <DepthChart ref={ref} book={BOOK} height={240} ariaLabel="Depth" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.height).toBe("240px");
    expect(root.style.width).toBe("100%");
    expect(container.querySelector('[aria-label="Depth"]')).not.toBeNull();
    await flush();
    expect(ref.current?.getInstance()?.getStore().bestBid()).toBe(100);
    act(() => ref.current?.applyDeltas({ bids: [[100, 0]] }));
    expect(ref.current?.getInstance()?.getStore().bestBid()).toBe(99.9);
    unmount();
    expect(container.querySelector(".minerva-depth-chart")).toBeNull();
  });

  it("forwards option changes without remounting", async () => {
    const ref = createRef<OrderBookHandle>();
    const { container, rerender } = render(
      <OrderBook ref={ref} book={BOOK} labels={{ price: "Prix" }} />,
    );
    const instance = ref.current?.getInstance();
    await flush();
    expect(texts).toContain("Prix");
    texts.length = 0;
    rerender(<OrderBook ref={ref} book={BOOK} labels={{ price: "Preis" }} />);
    await flush();
    expect(ref.current?.getInstance()).toBe(instance);
    expect(texts).toContain("Preis");
    expect(container.querySelectorAll("canvas")).toHaveLength(1);
  });

  it("follows a page language switch on the next render", async () => {
    document.documentElement.lang = "en";
    try {
      const { container, rerender } = render(<OrderBook book={BOOK} />);
      await flush();
      expect(texts).toContain("Price");
      expect(
        container.querySelector('[aria-label="Order book"]'),
      ).not.toBeNull();
      texts.length = 0;
      document.documentElement.lang = "zh-CN";
      rerender(<OrderBook book={BOOK} />);
      await flush();
      expect(texts).toContain("价格");
      expect(container.querySelector('[aria-label="订单簿"]')).not.toBeNull();
    } finally {
      document.documentElement.lang = "";
    }
  });

  it("appends the trades added to the array", async () => {
    const ref = createRef<TimeAndSalesHandle>();
    const first = [trade(0), trade(1)];
    const { rerender } = render(<TimeAndSales ref={ref} trades={first} />);
    expect(ref.current?.getInstance()?.getCount()).toBe(2);
    const add = vi.spyOn(ref.current!.getInstance()!, "addTrades");
    rerender(<TimeAndSales ref={ref} trades={[...first, trade(2)]} />);
    expect(add).toHaveBeenCalledWith([trade(2)]);
    expect(ref.current?.getInstance()?.getCount()).toBe(3);
    rerender(<TimeAndSales ref={ref} trades={[trade(5)]} />);
    expect(ref.current?.getInstance()?.getCount()).toBe(1);
  });

  it("mounts the heatmap", async () => {
    const onRenderer = vi.fn();
    const { unmount } = render(
      <OrderBookHeatmap
        book={BOOK}
        trades={[trade(0)]}
        renderer="canvas2d"
        onRendererChange={onRenderer}
      />,
    );
    await flush();
    expect(onRenderer).toHaveBeenCalledWith("canvas2d");
    unmount();
  });
});
