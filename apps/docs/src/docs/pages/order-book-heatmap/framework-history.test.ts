import { describe, expect, it } from "vitest";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "./framework-history";

describe("framework heatmap supplied history", () => {
  it("aggregates 30 bounded candles from explicit executions and aligns books", () => {
    const data = createFrameworkHistory(60_123);
    expect(data.bars).toHaveLength(30);
    expect(data.books).toHaveLength(120);
    expect(data.trades).toHaveLength(120);
    expect(data.end - data.start).toBe(30_000);
    for (const [index, bar] of data.bars.entries()) {
      const trades = data.trades.slice(index * 4, index * 4 + 4);
      expect(bar).toEqual({
        time: data.start + index * 1000,
        open: trades[0].price,
        close: trades[3].price,
        high: Math.max(...trades.map((t) => t.price)),
        low: Math.min(...trades.map((t) => t.price)),
        volume: trades.reduce((n, t) => n + t.size, 0),
      });
    }
    expect(data.books[0].time).toBe(data.start);
    expect(data.books[119].time).toBe(data.end - 250);
    expect(createFrameworkHistory(60_999)).toEqual(data);
  });
});

it("resolves the four configured languages and falls back for unknown locales", () => {
  expect(getFrameworkLabels("zh-CN").latest).toBe("最近 10 秒");
  expect(getFrameworkLabels("ja-JP").follow).toBe("相場に追従");
  expect(getFrameworkLabels("fr-FR").full).toBe("30 s complètes");
  expect(getFrameworkLabels("de")).toEqual(getFrameworkLabels("en-US"));
  expect(
    new Set(
      ["en", "zh", "ja", "fr"].map(
        (locale) => getFrameworkLabels(locale).source,
      ),
    ).size,
  ).toBe(4);
});
