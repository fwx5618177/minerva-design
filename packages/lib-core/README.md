# @minerva/lib-core

Minerva's React 19 component library: layout, forms, overlays, data display,
navigation, editors and theming, built on the framework-agnostic primitives of
[`@minerva/core`](https://www.npmjs.com/package/@minerva/core). The same
components are available as standard custom elements in
[`@minerva/lib-web-components`](https://www.npmjs.com/package/@minerva/lib-web-components).

```sh
pnpm add @minerva/lib-core react react-dom
```

Requires React 19 (`react` and `react-dom` `^19.0.0`).

```tsx
import {
  Button,
  ConfigProvider,
  ToastProvider,
  toast,
} from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function App() {
  return (
    <ConfigProvider>
      <ToastProvider>
        <Button onClick={() => toast.success("Saved")}>Save</Button>
      </ToastProvider>
    </ConfigProvider>
  );
}
```

| Entry                            | Contents                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `@minerva/lib-core`              | Every component, hook and theme utility (ESM + CJS, TypeScript types, `"use client"`)                       |
| `@minerva/lib-core/style.css`    | All component styles and the design tokens                                                                  |
| `@minerva/lib-core/styles/*.css` | Per-component stylesheets                                                                                   |
| `@minerva/lib-core/theme-utils`  | Server-safe theme helpers (`THEME_INIT_SCRIPT`, `THEME_INIT_SCRIPT_HASH`, cookie parsing)                   |
| `@minerva/lib-core/utils`        | Server-safe non-component utilities (`cn`, `themes`, `palettes`, `resolveTheme`, ...) for Server Components |
| `@minerva/lib-core/monaco`       | `MonacoCodeEditor` (optional peers `@monaco-editor/react` and `monaco-editor`)                              |
| `@minerva/lib-core/prose.scss`   | The typography mixins of `Prose`                                                                            |

Every stylesheet ships inside `@layer minerva`: your unlayered CSS overrides
the library without `!important` (layered apps: `@layer reset, minerva, app;`).

Styling hooks (public API): each component renders `data-minerva="<component>"`,
`data-part="<part>"` and state attributes (`data-state`, `data-disabled`,
`data-size`, `data-variant`...), e.g.
`[data-minerva="button"][data-part="label"]`. The hooks of every component are
listed on its docs page and in `@minerva/core/styling-hooks`.

Documentation and live demos: https://fwx5618177.github.io/minerva/

## Browser support

React 19 on evergreen browsers (fully supported: Chrome / Edge 120+, Firefox 125+, Safari 17+; down to Chrome 111, Firefox 113, Safari 16.4 with minor styling degradations: `color-mix()`, `:has()`, `:dir()`, container queries). Overlays render in a portal (no Popover API needed). The feature matrix and fallbacks are in the [repository README](https://github.com/fwx5618177/minerva#-browser-support).

## License

MIT
