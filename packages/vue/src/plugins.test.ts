// The two global plugins of the Vue renderer: `MinervaVue` (every component
// but the charts, without loading any chart code) and the opt-in
// `MinervaVueCharts` of `minerva-design/vue/charts`, checked against their
// generated Volar typings (src/global.ts, src/charts-global.ts).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createApp } from "vue";
import { describe, expect, it, vi } from "vitest";

/** Which chart modules were evaluated (the real modules, only observed) */
const loaded = vi.hoisted(() => ({ engine: false, charts: false }));
vi.mock("minerva-design/charts/core", async (importOriginal) => {
  loaded.engine = true;
  return importOriginal();
});
vi.mock("./components/Chart", async (importOriginal) => {
  loaded.charts = true;
  return importOriginal();
});

/** The `Mn*` names declared by a generated typings file */
const typedNames = (file: string) =>
  [
    ...readFileSync(
      fileURLToPath(new URL(file, import.meta.url)),
      "utf8",
    ).matchAll(/^\s+Mn(\w+): typeof Minerva\.(\w+);$/gm),
  ].map(([, name, exported]) => {
    expect(exported).toBe(name);
    return name;
  });

describe("MinervaVue (default plugin)", () => {
  it("loads no chart code: neither the chart components nor the engine", async () => {
    const plugin = await import("./plugin");
    expect(plugin.MinervaVue).toBeDefined();
    expect(loaded).toEqual({ engine: false, charts: false });
  });

  it("registers every component but the charts", async () => {
    const { MinervaVue, allComponents } = await import("./plugin");
    const app = createApp({});
    app.use(MinervaVue);
    expect(app.component("MnButton")).toBe(allComponents().Button);
    expect(app.component("MnModal")).toBeDefined();
    for (const name of ["MnChart", "MnLineChart", "MnPieChart"])
      expect(app.component(name), name).toBeUndefined();
    expect(Object.keys(allComponents())).not.toContain("LineChart");
    expect(loaded).toEqual({ engine: false, charts: false });
  });

  it("honours the prefix", async () => {
    const { MinervaVue } = await import("./plugin");
    const app = createApp({});
    app.use(MinervaVue, { prefix: "Ui" });
    expect(app.component("UiButton")).toBeDefined();
    expect(app.component("MnButton")).toBeUndefined();
  });

  it("is typed by minerva-design/vue/global (no chart)", async () => {
    const { allComponents } = await import("./plugin");
    expect(typedNames("./global.ts").sort()).toEqual(
      Object.keys(allComponents()).sort(),
    );
  });
});

describe("MinervaVueIcons (minerva-design/vue/icons)", () => {
  it("registers Icon, IconCanvas and DynamicIcon, with the prefix", async () => {
    const { MinervaVueIcons, Icon, IconCanvas, DynamicIcon } =
      await import("./icons");
    const app = createApp({});
    app.use(MinervaVueIcons);
    expect(app.component("MnIcon")).toBe(Icon);
    expect(app.component("MnIconCanvas")).toBe(IconCanvas);
    expect(app.component("MnDynamicIcon")).toBe(DynamicIcon);
    // the named icons are imported, never registered
    expect(app.component("MnSearchIcon")).toBeUndefined();
    expect(app.component("MnButton")).toBeUndefined();
    const prefixed = createApp({});
    prefixed.use(MinervaVueIcons, { prefix: "Ui" });
    expect(prefixed.component("UiIcon")).toBe(Icon);
  });

  it("is the default export, and is not part of minerva-design/vue", async () => {
    const icons = await import("./icons");
    const main = await import("./index");
    expect(icons.default).toBe(icons.MinervaVueIcons);
    for (const name of ["Icon", "IconCanvas", "DynamicIcon", "SearchIcon"])
      expect(name in main, name).toBe(false);
  });

  it("is typed by minerva-design/vue/icons-global", async () => {
    const { iconComponents } = await import("./icons");
    expect(typedNames("./icons-global.ts").sort()).toEqual(
      Object.keys(iconComponents()).sort(),
    );
  });
});

describe("MinervaVueCharts (minerva-design/vue/charts)", () => {
  it("registers every chart component, with the prefix", async () => {
    const { MinervaVueCharts, chartComponents, LineChart, TradingChart } =
      await import("./charts");
    expect(loaded).toEqual({ engine: true, charts: true });
    const app = createApp({});
    app.use(MinervaVueCharts);
    expect(app.component("MnLineChart")).toBe(LineChart);
    expect(app.component("MnTradingChart")).toBe(TradingChart);
    expect(app.component("MnButton")).toBeUndefined();
    expect(Object.keys(chartComponents()).length).toBeGreaterThan(30);
    for (const name of Object.keys(chartComponents()))
      expect(app.component(`Mn${name}`), name).toBeDefined();

    const prefixed = createApp({});
    prefixed.use(MinervaVueCharts, { prefix: "Ui" });
    expect(prefixed.component("UiPieChart")).toBeDefined();
    expect(prefixed.component("MnPieChart")).toBeUndefined();
  });

  it("is the default export, and both plugins compose", async () => {
    const charts = await import("./charts");
    const { MinervaVue } = await import("./plugin");
    expect(charts.default).toBe(charts.MinervaVueCharts);
    const app = createApp({});
    app.use(MinervaVue).use(charts.MinervaVueCharts);
    expect(app.component("MnButton")).toBeDefined();
    expect(app.component("MnLineChart")).toBe(charts.LineChart);
  });

  it("keeps the named chart exports of minerva-design/vue", async () => {
    const main = await import("./index");
    const charts = await import("./charts");
    for (const name of Object.keys(charts.chartComponents()))
      expect(main[name as keyof typeof main], name).toBe(
        charts[name as keyof typeof charts],
      );
    expect("MinervaVueCharts" in main).toBe(false);
  });

  it("is typed by minerva-design/vue/charts-global", async () => {
    const { chartComponents } = await import("./charts");
    expect(typedNames("./charts-global.ts").sort()).toEqual(
      Object.keys(chartComponents()).sort(),
    );
  });
});
