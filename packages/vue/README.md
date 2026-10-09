# @minerva/vue (private)

The native Vue 3 renderer of Minerva, published inside the single package as
`minerva-design/vue`. The Monaco-specific entry remains unimplemented and is not exported. Single-file components
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
createApp(App).use(MinervaVue).mount("#app");
```

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
| `src/plugin.ts`                 | `MinervaVue` plugin (`app.use`), `src/global.d.ts`-style `GlobalComponents` typings   |
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
