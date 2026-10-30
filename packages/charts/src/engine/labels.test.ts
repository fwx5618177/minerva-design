import { describe, expect, it } from "vitest";
import { describeChart } from "../canvas";
import { chartAriaLabel, chartLabels } from "./labels";

const series = [{ name: "A" }, { name: "B" }];

describe("chartAriaLabel", () => {
  it("names the chart with its series or the generic word", () => {
    const labels = chartLabels("en");
    expect(chartAriaLabel({ labels, locale: "en", series })).toBe(
      "Chart: A, B",
    );
    expect(chartAriaLabel({ labels, locale: "en", series: [] })).toBe("Chart");
  });
});

describe("describeChart", () => {
  it("defaults to English", () => {
    expect(describeChart({})).toBe("Chart");
    expect(describeChart({ series })).toBe("Chart: A, B");
  });

  it("localizes the description in en/zh/ja/fr", () => {
    expect(describeChart({ locale: "en-US", series })).toBe("Chart: A, B");
    expect(describeChart({ locale: "zh-CN", series })).toBe("图表：A、B");
    expect(describeChart({ locale: "ja", series })).toBe("グラフ：A、B");
    expect(describeChart({ locale: "fr-FR", series })).toMatch(
      /^Graphique\s:\sA, B$/,
    );
    expect(describeChart({ locale: "zh" })).toBe("图表");
    expect(describeChart({ locale: "ja" })).toBe("グラフ");
    expect(describeChart({ locale: "fr" })).toBe("Graphique");
  });

  it("puts the title in place of the generic word", () => {
    expect(describeChart({ title: "Revenue", series })).toBe("Revenue: A, B");
    expect(describeChart({ title: "营收", locale: "zh", series })).toBe(
      "营收：A、B",
    );
    expect(describeChart({ title: "売上", locale: "ja", series })).toBe(
      "売上：A、B",
    );
    expect(describeChart({ title: "Ventes", locale: "fr", series })).toMatch(
      /^Ventes\s:\sA, B$/,
    );
  });

  it("returns the bare title without series", () => {
    expect(describeChart({ title: "  Revenue " })).toBe("Revenue");
    expect(describeChart({ title: "营收", locale: "zh", series: [] })).toBe(
      "营收",
    );
  });

  it("keeps special characters of titles and names verbatim", () => {
    expect(
      describeChart({ title: "$& {series}", series: [{ name: "$1" }] }),
    ).toBe("$& {series}: $1");
  });

  it("honours label overrides", () => {
    expect(
      describeChart({
        series,
        labels: { chart: "Plot", chartOf: "Plot of {series}" },
      }),
    ).toBe("Plot of A, B");
    expect(
      describeChart({
        series,
        labels: { chart: "Plot", chartOf: "Plot of {series}" },
        title: "Sales",
      }),
    ).toBe("Sales of A, B");
    expect(
      describeChart({
        series,
        labels: { chartOf: "Series {series}" },
        title: "Sales",
      }),
    ).toBe("Sales. Series A, B");
  });
});
