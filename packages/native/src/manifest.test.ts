import { describe, expect, it } from "vitest";
import * as Native from "./index";
import { NATIVE_CHARTS, NATIVE_COMPONENTS } from "./manifest";

describe("component manifest", () => {
  it("every listed component and alias is exported", () => {
    const missing = [
      ...NATIVE_COMPONENTS.flatMap((c) => [c.name, ...(c.aliases ?? [])]),
      ...NATIVE_CHARTS,
    ].filter((name) => !(name in Native));
    expect(missing).toEqual([]);
  });

  it("every exported component is listed", () => {
    const listed = new Set([
      ...NATIVE_COMPONENTS.flatMap((c) => [c.name, ...(c.aliases ?? [])]),
      ...NATIVE_CHARTS,
    ]);
    // PascalCase values: components (hooks, helpers and the toast API are camelCase)
    const components = Object.entries(Native)
      .filter(([name, value]) => /^[A-Z]/.test(name) && value)
      .map(([name]) => name);
    expect(components.filter((name) => !listed.has(name))).toEqual([]);
  });

  it("names are unique", () => {
    const names = [
      ...NATIVE_COMPONENTS.flatMap((c) => [c.name, ...(c.aliases ?? [])]),
      ...NATIVE_CHARTS,
    ];
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("chart manifest", () => {
  it("lists the DOM-free charts of the engine, none of the DOM / GPU widgets", () => {
    for (const name of [
      "AreaChart",
      "GanttChart",
      "SankeyChart",
      "SunburstChart",
      "BulletChart",
    ])
      expect(NATIVE_CHARTS, name).toContain(name);
    for (const name of ["TradingChart", "OrderBook", "Scatter3DChart"]) {
      expect(NATIVE_CHARTS, name).not.toContain(name);
      expect(name in Native, name).toBe(false);
    }
  });
});
