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

| Entry                            | Contents                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `@minerva/lib-core`              | Every component, hook and theme utility (ESM + CJS, TypeScript types, `"use client"`) |
| `@minerva/lib-core/style.css`    | All component styles and the design tokens                                            |
| `@minerva/lib-core/styles/*.css` | Per-component stylesheets                                                             |
| `@minerva/lib-core/theme-utils`  | Server-safe theme helpers (`THEME_INIT_SCRIPT`, cookie parsing)                       |
| `@minerva/lib-core/monaco`       | `MonacoCodeEditor` (optional peers `@monaco-editor/react` and `monaco-editor`)        |
| `@minerva/lib-core/prose.scss`   | The typography mixins of `Prose`                                                      |

Documentation and live demos: https://fwx5618177.github.io/minerva/

## License

MIT
