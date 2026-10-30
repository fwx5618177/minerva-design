import { afterEach, describe, expect, it } from "vitest";
import { createTheme } from "../theme";
import { localeFormat, localePercent } from "./labels";
import {
  describeChart,
  describeScene,
  layoutShapeScene,
  tooltipContent,
} from "./layout";
import type { TextNode } from "./scene";
import type { ShapeChartOptions } from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;

const layout = (options: ShapeChartOptions) =>
  layoutShapeScene({ options, theme, width: 400, height: 300, measure });

const pie: ShapeChartOptions = {
  type: "pie",
  data: [
    { name: "A", value: 12500 },
    { name: "B", value: 37500 },
  ],
};

describe("shape chart locale", () => {
  const initial = document.documentElement.lang;
  afterEach(() => {
    document.documentElement.lang = initial;
  });

  it("formats compact numbers and percents per locale", () => {
    expect(localeFormat("en")(12500)).toBe("12.5k");
    expect(localeFormat("en")(0.0123)).toBe("0.0123");
    expect(localeFormat("en")(950)).toBe("950");
    expect(localeFormat("zh-CN")(12500)).toBe("1.25万");
    expect(localeFormat("ja")(250000000)).toBe("2.5億");
    expect(localeFormat("fr-FR")(12500)).toBe("12,5 k");
    expect(localePercent("en")(0.4)).toBe("40.0%");
    expect(localePercent("fr")(0.4)).toMatch(/^40,0\s%$/);
    expect(localePercent("en")(Number.NaN)).toBe("–");
  });

  it("writes the tooltip rows and names in the locale", () => {
    const scene = layout({ ...pie, locale: "zh-CN" });
    const tip = tooltipContent(scene, { index: 0 });
    expect(tip?.rows.map((r) => r.name)).toEqual(["数值", "占比"]);
    expect(tip?.rows[0]?.value).toBe("1.25万");
    expect(describeChart({ ...pie, locale: "zh" })).toBe("饼图");
    expect(describeChart({ ...pie, locale: "ja", innerRadius: 0.6 })).toBe(
      "ドーナツグラフ",
    );
    expect(
      describeChart({ type: "gauge", value: 3, label: "CPU", locale: "fr" }),
    ).toBe("Jauge : CPU");
  });

  it("follows the page language by default", () => {
    document.documentElement.lang = "fr";
    const scene = layout({ ...pie, data: [] });
    expect(scene.empty).toBe(true);
    expect(describeScene(scene)).toBe("Aucune donnée");
    const text = scene.nodes.find((n): n is TextNode => n.kind === "text");
    expect(text?.text).toBe("Aucune donnée");
    document.documentElement.lang = "en";
    expect(describeChart(pie)).toBe("Pie chart");
  });

  it("applies `texts` overrides and placeholders", () => {
    const sankey: ShapeChartOptions = {
      type: "sankey",
      locale: "en",
      texts: { ofName: "Share of {name}", sankeyChart: "Flows" },
      nodes: [{ name: "In" }, { name: "Out" }],
      links: [{ source: "In", target: "Out", value: 4 }],
    };
    expect(describeChart(sankey)).toBe("Flows");
    const scene = layout(sankey);
    const link = scene.items.find((it) => it.event?.source === "In");
    expect(link?.rows.map((r) => r.name)).toContain("Share of In");
  });

  it("names unnamed radar series in the locale", () => {
    const scene = layout({
      type: "radar",
      locale: "ja",
      indicators: [{ name: "a" }, { name: "b" }, { name: "c" }],
      series: [{ values: [1, 2, 3] }],
    });
    expect(scene.items[0]?.name).toBe("系列 1");
  });
});
