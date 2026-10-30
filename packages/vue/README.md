# @minerva/vue (private)

The native Vue 3 renderer of Minerva, published inside the single package as
`minerva-design/vue`. The optional `minerva-design/vue/monaco` entry provides
`MonacoCodeEditor`, with a host-supplied local Monaco engine and workers,
controlled `v-model`, inherited themes, a recoverable textarea fallback and
owned-model disposal. Its engine is not loaded by the main entry. Single-file components
(`<script setup lang="ts">`) and composables on the shared headless core:
`@minerva/core` (machines, contracts, tokens, i18n) and `@minerva/dom` (focus
scope, dismissable layers, scroll lock, positioning, presence...). Not a
wrapper around the Web Components.

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "minerva-design/style.css"; // once: the same stylesheet as React
import MinervaVue from "minerva-design/vue"; // optional: global <Mn*> components
// optional, opt-in: global <Mn*Chart> components (loads the chart engine)
import { MinervaVueCharts } from "minerva-design/vue/charts";
createApp(App).use(MinervaVue).use(MinervaVueCharts).mount("#app");
```

`MinervaVue` registers every component but the charts, and never loads chart
code (`src/plugins.test.ts`). The charts are registered by `MinervaVueCharts`
(`minerva-design/vue/charts`, typings `minerva-design/vue/charts-global`); their
named imports stay available from both `minerva-design/vue` and
`minerva-design/vue/charts`.

### Charts and the Vite dev server

Production builds tree-shake the charts (the package is side-effect free): an
app that never imports a chart ships no chart code, with or without
`app.use(MinervaVue)`. Vite's dev dependency optimizer, however, pre-bundles
every export of `minerva-design/vue` into one file, so the chart wrappers and
the engine (~0.7 MB unminified) are in the dev pre-bundle of the main entry
even when no chart is used. This cannot change before 2.0 without breaking the
named chart exports of `minerva-design/vue` (2.0 will export them only from
`minerva-design/vue/charts`). Meanwhile:

- import charts from `minerva-design/vue/charts` (the 2.0 entry);
- if the app uses charts, pre-bundle both entries at startup:
  `optimizeDeps: { include: ["minerva-design/vue", "minerva-design/vue/charts"] }`;
- excluding `minerva-design/charts/core` from `optimizeDeps` has no effect (the
  components reach the engine through a relative path inside the package), and
  excluding `minerva-design/vue` makes the browser load hundreds of unbundled
  modules, charts included.

```vue
<script setup lang="ts">
import { Button, Modal } from "minerva-design/vue"; // tree-shaken
</script>
```

## Layout

| Path                            | What                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `src/components/<Name>/`        | one folder per component family: `*.vue`, `types.ts`, `index.ts`, `*.test.ts`         |
| `src/groups/*.ts`               | barrels re-exported by `src/index.ts` (forms, pickers, overlays, navigation, display) |
| `src/internal/`                 | composables over `@minerva/dom` / `@minerva/core`, `Portal`, `Slot`, dialog, icons    |
| `src/config/`                   | `ConfigProvider` (nested scopes), `useConfig`, `useTheme`, `useI18n`, `useLocale`     |
| `src/plugin.ts`                 | `MinervaVue` plugin (`app.use`), every component but the charts                       |
| `src/charts.ts`                 | `minerva-design/vue/charts`: the charts and the opt-in `MinervaVueCharts` plugin      |
| `scripts/generate-global.mjs`   | Volar `GlobalComponents` typings: `src/global.ts`, `src/charts-global.ts`             |
| `src/test-utils/styling-hooks/` | scenarios of the styling hooks contract (`src/styling-hooks.contract.test.ts`)        |
| `scripts/generate-icons.mjs`    | `src/internal/icons.ts` from the shared icon set                                      |

## Conventions (same contract as React)

- **Styles**: import the React SCSS module
  (`import styles from "@react-styles/components/Button/button.module.scss"`)
  and use the same classes as the React component. The build turns that
  import into the class map already emitted by the React build
  (`dist/react/components/.../*.module.scss.js`): identical class names,
  styled by `minerva-design/style.css`. Never add Vue-only CSS.
- **Styling hooks**: `v-bind="hooks('button', 'root', { disabled, size })"`
  (`src/internal/hooks.ts`), with the same parts / states as React. Bind them
  after the fall-through attributes (`inheritAttrs: false` +
  `v-bind="{ ...$attrs, ...hooks(...) }"`) so they cannot be overridden.
- **Props** keep the React names, types and defaults (checked against
  `@minerva/core/contracts` by `src/contracts.parity.test.ts`), except:
  - the primary value is `v-model` (`modelValue` + `update:modelValue`;
    uncontrolled: `defaultValue` / `defaultChecked`), overlays use
    `v-model:open` (+ `defaultOpen`), other controlled values
    `v-model:<name>` (`useControllable`, `src/internal/controllable.ts`).
    Declare optional boolean models with `default: undefined`;
  - React callbacks are emits named without `on` (`onOpenChange` ->
    `openChange`, `onChange` -> `change`), with the same arguments;
  - `ReactNode` props become slots (kebab-case: `start-icon`); simple text
    props stay props too (`title`, `description`, `label`).
- **Behaviour** comes from the shared layer: `useMachine` for the core
  machines, `useDismissableLayer` / `useFocusScope` / `useScrollLock` /
  `useHideOthers` / `usePresence` / `useFloatingLayer` / `FloatingPanel`,
  `Portal` (SSR-safe teleport into the theme scope) and the dialog parts.
- **i18n**: built-in texts through `useI18n().t("modal.close")` (the same
  message keys as React).
- **SSR**: no `document` / `window` access during setup; DOM work happens in
  `onMounted` / post-flush watchers; ids from Vue's `useId()`.

## Tests

`pnpm vitest run --project vue` (Vue Test Utils + Testing Library under
happy-dom): unit tests next to the components, the styling hooks contract,
the contracts parity test, SSR / hydration tests (`tests/`). The shared
cross-platform suites run with the Vue driver (`tests/contracts/vue.test.ts`).
