// minerva-design/vue/icons: the Vue components of the Minerva icon set
// (`Icon`, `IconCanvas`, `DynamicIcon`, `createIcon` and one component per
// icon: `SearchIcon`…), on top of the framework-free core
// (minerva-design/icons/core, re-exported here), and the opt-in
// `MinervaVueIcons` plugin. Kept out of `minerva-design/vue` so that apps
// without these icons never load the icon set.
import type { App, Component } from "vue";
import DynamicIcon from "./icon/DynamicIcon.vue";
import Icon from "./icon/Icon.vue";
import IconCanvas from "./icon/IconCanvas.vue";
import { registerComponents } from "./internal/register";
import type { MinervaVueOptions } from "./plugin";

export * from "./icon";
export * from "minerva-design/icons/core";

/** Options of the `MinervaVueIcons` plugin (same as `MinervaVue`) */
export type MinervaVueIconsOptions = MinervaVueOptions;

/** The components registered by `MinervaVueIcons`, by export name */
export function iconComponents(): Record<string, Component> {
  return { Icon, IconCanvas, DynamicIcon };
}

/**
 * Vue plugin registering `Icon`, `IconCanvas` and `DynamicIcon` globally:
 * `app.use(MinervaVueIcons)` -> `<MnIcon :icon="searchIcon" />`,
 * `<MnDynamicIcon name="search" />`… (add `"types":
 * ["minerva-design/vue/icons-global"]` to tsconfig for Volar typings).
 * `DynamicIcon` bundles the whole icon set; the named components
 * (`SearchIcon`…) are imported by name, not registered.
 */
export const MinervaVueIcons = {
  install(app: App, options: MinervaVueIconsOptions = {}): void {
    registerComponents(app, iconComponents(), options.prefix);
  },
};

export default MinervaVueIcons;
