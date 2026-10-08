---
"minerva-design": minor
---

Native Vue 3 renderer: `minerva-design/vue`.

```ts
import "minerva-design/style.css"; // the same stylesheet as React
import { Button, Modal, Select } from "minerva-design/vue";
// or every component globally: app.use(MinervaVue) -> <MnButton>...
```

- **Native components, not wrappers**: Vue single-file components and composables for the full component set of the React entry (forms, pickers, overlays, navigation and data, display and layout, theme toggles), built on the same headless core: the `@minerva/core` machines (disclosure, toast queue, selection, tabs, picker, field, pagination, rating, stepper, toggles) and the DOM primitives (focus scope, dismissable layers, scroll lock, hide-others, roving focus, anchored positioning, presence).
- **Same contract as React**: the same DOM, class names and styling hooks (`data-minerva` / `data-part` / state attributes, checked by the styling-hooks contract), the same ARIA and keyboard behaviour, built-in texts in en / zh / ja / fr, and the same defaults; the cross-platform contract suites run against Vue too. `minerva-design/style.css`, the design tokens, themes, palettes and CSS variables style both renderers.
- **Vue idioms**: `v-model` for values (`modelValue`, `defaultValue` / `defaultChecked` when uncontrolled), `v-model:open` for overlays, typed emits named like the React callbacks (`onOpenChange` → `@open-change`), slots for rich content, `ConfigProvider` with nested theme / palette / design / locale scopes through provide / inject, and the `useTheme`, `useConfig`, `useI18n`, `useLocale`, `useToast` and `useConfirm` composables.
- **SSR**: server rendering with `vue/server-renderer` and hydration without mismatches (Nuxt ready); `provideEmbeddedScope(app)` mounts Vue islands inside pages whose theme is owned by another framework.
- **Packaging**: ESM with type declarations, one module per component (tree-shaken), the optional `minerva-design/vue/monaco` entry (`MonacoCodeEditor`, optional `monaco-editor` peer) and Volar typings of the global components (`"types": ["minerva-design/vue/global"]`). `vue` (`^3.5`) is an optional peer dependency, only needed by the Vue entries.
