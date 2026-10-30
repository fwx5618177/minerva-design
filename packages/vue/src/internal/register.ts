// Global registration shared by the `MinervaVue` and `MinervaVueCharts`
// plugins. Free of component imports: each plugin brings its own modules.
import type { App, Component } from "vue";

/** Whether an export is a Vue component (SFC / defineComponent object) */
export const isComponent = (value: unknown): value is Component =>
  !!value &&
  typeof value === "object" &&
  ("setup" in value || "render" in value || "__name" in value);

/** The component exports of the given modules, by export name */
export function collectComponents(
  modules: readonly object[],
): Record<string, Component> {
  const result: Record<string, Component> = {};
  for (const module of modules) {
    for (const [name, value] of Object.entries(module)) {
      if (isComponent(value)) result[name] = value;
    }
  }
  return result;
}

/** Registers each component as `${prefix}${name}` */
export function registerComponents(
  app: App,
  components: Record<string, Component>,
  prefix = "Mn",
): void {
  for (const [name, component] of Object.entries(components)) {
    app.component(`${prefix}${name}`, component);
  }
}
