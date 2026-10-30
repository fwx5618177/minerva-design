import type { App, Component } from "vue";
import * as Button from "./components/Button";
import * as formsBasic from "./groups/forms-basic";
import * as formsPickers from "./groups/forms-pickers";
import * as overlays from "./groups/overlays";
import * as navigation from "./groups/navigation";
import * as display from "./groups/display";
import * as config from "./groups/config";
import { collectComponents, registerComponents } from "./internal/register";

/** Options of the `MinervaVue` and `MinervaVueCharts` plugins */
export interface MinervaVueOptions {
  /**
   * Prefix of the globally registered names (`<MnButton>`, `<MnModal>`...).
   * The typings of `minerva-design/vue/global` use the default.
   * @default "Mn"
   */
  prefix?: string;
}

/**
 * Every component registered by `MinervaVue`, by export name. The charts
 * are not included: they belong to `MinervaVueCharts`
 * (`minerva-design/vue/charts`), so that the plugin does not load the chart
 * engine.
 */
export function allComponents(): Record<string, Component> {
  return collectComponents([
    Button,
    formsBasic,
    formsPickers,
    overlays,
    navigation,
    display,
    config,
  ]);
}

/**
 * Vue plugin registering every Minerva component globally:
 * `app.use(MinervaVue)` -> `<MnButton>`, `<MnModal>`... (add
 * `"types": ["minerva-design/vue/global"]` to tsconfig for Volar typings).
 * The charts are opt-in: `app.use(MinervaVueCharts)` from
 * `minerva-design/vue/charts`.
 * Optional: named imports (`import { Button } from "minerva-design/vue"`)
 * need no plugin and are tree-shaken.
 */
export const MinervaVue = {
  install(app: App, options: MinervaVueOptions = {}): void {
    registerComponents(app, allComponents(), options.prefix);
  },
};

export default MinervaVue;
