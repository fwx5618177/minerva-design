// minerva-design/vue: the native Vue 3 renderer of Minerva. Single-file
// components and composables on the shared headless core (@minerva/core
// machines, @minerva/dom primitives), styled by the same stylesheet as React
// (`import "minerva-design/style.css"` once). Every export is side-effect
// free: import what you use (tree-shaking), or install every component
// globally with `app.use(MinervaVue)`.
export * from "./components/Button";
export * from "./groups/forms-basic";
export * from "./groups/forms-pickers";
export * from "./groups/overlays";
export * from "./groups/navigation";
export * from "./groups/display";
export * from "./groups/config";
export { themes, light, dark, githubDark, palettes, cn } from "@minerva/core";
export type {
  ColorScheme,
  Palette,
  SupportedLanguage,
  ThemeMode,
  DesignPreset,
  Density,
  RadiusScale,
  ShadowScale,
  FontScale,
} from "@minerva/core";
export { MinervaVue, MinervaVue as default } from "./plugin";
export type { MinervaVueOptions } from "./plugin";
