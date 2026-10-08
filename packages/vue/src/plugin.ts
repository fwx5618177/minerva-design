import type { App, Component } from "vue";
import * as Button from "./components/Button";
import * as formsBasic from "./groups/forms-basic";
import * as formsPickers from "./groups/forms-pickers";
import * as overlays from "./groups/overlays";
import * as navigation from "./groups/navigation";
import * as display from "./groups/display";
import * as config from "./groups/config";

/** Options of the `MinervaVue` plugin */
export interface MinervaVueOptions {
  /**
   * Prefix of the globally registered names (`<MnButton>`, `<MnModal>`...).
   * The typings of `minerva-design/vue/global` use the default.
   * @default "Mn"
   */
  prefix?: string;
}

/** Whether an export is a Vue component (SFC / defineComponent object) */
export const isComponent = (value: unknown): value is Component =>
  !!value &&
  typeof value === "object" &&
  ("setup" in value || "render" in value || "__name" in value);

/** Every component of the Vue renderer, by export name */
export function allComponents(): Record<string, Component> {
  const modules = [
    Button,
    formsBasic,
    formsPickers,
    overlays,
    navigation,
    display,
    config,
  ] as Record<string, unknown>[];
  const result: Record<string, Component> = {};
  for (const module of modules) {
    for (const [name, value] of Object.entries(module)) {
      if (isComponent(value)) result[name] = value;
    }
  }
  return result;
}

/**
 * Vue plugin registering every Minerva component globally:
 * `app.use(MinervaVue)` -> `<MnButton>`, `<MnModal>`... (add
 * `"types": ["minerva-design/vue/global"]` to tsconfig for Volar typings).
 * Optional: named imports (`import { Button } from "minerva-design/vue"`)
 * need no plugin and are tree-shaken.
 */
export const MinervaVue = {
  install(app: App, options: MinervaVueOptions = {}): void {
    const prefix = options.prefix ?? "Mn";
    for (const [name, component] of Object.entries(allComponents())) {
      app.component(`${prefix}${name}`, component);
    }
  },
};

export default MinervaVue;
