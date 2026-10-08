// Single-file components of the Vue renderer, type-checked by vue-tsc in
// packages/vue (this project only needs them as modules).
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
