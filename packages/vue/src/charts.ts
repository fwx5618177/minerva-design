// minerva-design/vue/charts: the chart components of the Vue renderer
// (thin wrappers of the engine of minerva-design/charts/core) and the opt-in
// `MinervaVueCharts` plugin registering them globally. Kept out of the
// `MinervaVue` plugin so that apps without charts never load the engine.
import type { App, Component } from "vue";
import * as charts from "./groups/charts";
import { collectComponents, registerComponents } from "./internal/register";
import type { MinervaVueOptions } from "./plugin";

export * from "./groups/charts";

/** Options of the `MinervaVueCharts` plugin (same as `MinervaVue`) */
export type MinervaVueChartsOptions = MinervaVueOptions;

/** Every chart component registered by `MinervaVueCharts`, by export name */
export function chartComponents(): Record<string, Component> {
  return collectComponents([charts]);
}

/**
 * Vue plugin registering the chart components globally:
 * `app.use(MinervaVueCharts)` -> `<MnLineChart>`, `<MnPieChart>`... (add
 * `"types": ["minerva-design/vue/charts-global"]` to tsconfig for Volar
 * typings). Named imports (`import { LineChart } from
 * "minerva-design/vue/charts"`) need no plugin.
 */
export const MinervaVueCharts = {
  install(app: App, options: MinervaVueChartsOptions = {}): void {
    registerComponents(app, chartComponents(), options.prefix);
  },
};

export default MinervaVueCharts;
