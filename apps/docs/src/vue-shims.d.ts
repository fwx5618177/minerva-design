// Single-file components (the native Vue demos and the Vue renderer's
// sources, type-checked by vue-tsc in packages/vue): modules exporting a
// component for this project's tsc.
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
