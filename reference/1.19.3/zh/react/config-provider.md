# ConfigProvider 全局配置

为应用提供 React 版的主题和语言，并通过 useConfig() 读取它们。

Package: minerva-design@1.19.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 用法

在应用根部渲染一个 ConfigProvider。它会把主题以 CSS 变量的形式写到  上，设置 React 版内置文案的语言，并通过 useConfig() 提供这两者。

两个属性都是响应式的：把它们存放在 state 中，即可让用户在运行时切换主题或语言。

只有最外层的 ConfigProvider 会修改全局状态：它在  上写入 data-theme、data-palette 和主题变量，持久化 Cookie，并设置 React 版的全局语言。嵌套的 Provider 从不这样做，它只把自己的设置作用于其子树（见“嵌套 Provider”）。

### 调色板、持久化与回调

palette 在 light、dark 或 system 主题之上叠加一套配色调色板（"editorial"、"tech"、"graphite" 或 "cool"）。persist 会把主题和调色板的变更保存到 theme 与 palette Cookie 中，并在水合后恢复。setTheme 和 setPalette 改变取值后会调用 onThemeChange 和 onPaletteChange。

useConfig() 还会返回 mode、resolvedMode、palette 以及 setTheme 和 setPalette 两个设置函数，任何组件都能切换主题，无需提升状态。服务端渲染、Cookie 和防闪烁初始化脚本详见

### 品牌色

primaryColor 用于设置品牌色，无需手动覆盖 --primary-color：传入一个 CSS 颜色（"#4f46e5"、rgb()、颜色名）同时用于两种模式，或传入 { light, dark } 对。主题仍保持显式：theme 依旧是 "light"、"dark" 或 "system"，因此 data-theme、useConfig().mode 和 ThemeToggle 照常工作。

派生变量：所有由 primary-color 派生的变量（hover、active、subtle、border、text、焦点环、选中色，以及在配色没有自己的强调色时的 accent 变量）都会用默认主题的公式基于品牌色重新计算。单个颜色在暗色模式下会在 OKLab 空间向白色混合，直到在深色表面上达到 4.5:1 的对比度（#4f46e5 变为 #7b85f2）；本身已达标的颜色保持不变。

优先级：primaryColor 优先于配色和主题自带的主色；配色的其他变量保持不变。无效颜色会被忽略，并在开发环境给出警告。

嵌套：嵌套 Provider 会继承品牌色，嵌套的 primaryColor 只作用于其子树（包括其浮层）；null 恢复主题自身的主色。

服务端渲染：根 Provider 会把亮色和暗色两组品牌色渲染到以 data-theme 区分的  中，因此服务端标记在水合前就带有品牌色（配合主题初始化脚本不会闪烁）。React Native（MinervaProvider）、Taro、uni-app 与微信小程序的 Provider（ConfigProvider / ThemeProvider）、Vue（ConfigProvider / ThemeProvider）、Angular（、provideMinerva({ primaryColor })）以及  都支持同样的值，语义一致。

### ConfigContext

当上层没有 ConfigProvider 时，useConfig() 会抛出错误，便于尽早发现配置问题。如果 Provider 是可选的，请直接读取 ConfigContext：它会返回 undefined 而不是抛错。

### 嵌套 Provider

位于另一个 ConfigProvider 内部的 ConfigProvider 称为嵌套 Provider。可以用它为页面的某个区域、预览或示例设置不同的主题、配色或语言，而不影响页面其余部分。

继承：它从上方最近的 Provider 继承 theme、palette 和 locale，只覆盖你显式设置的属性，其下的 useConfig() 返回合并后的值。继承的设置会随父级变化而更新。

作用域主题：覆盖的 theme 或 palette 只作用于其子树。Provider 会渲染一个 display: contents 的包裹元素（不影响布局），其上带有 data-theme、data-palette 和主题变量。未覆盖 theme 或 palette 时不会渲染包裹元素。

作用域语言：覆盖的 locale 只改变其子树中的内置文案。只设置 locale 的 Provider 完全不会影响主题。

浮层：从作用域子树中通过 Portal 渲染的内容（Modal、Drawer、Popover、Select、Menu、Tooltip、Toast 等）会挂载到  上一个带有相同作用域的容器中，因此浮层也会使用作用域主题。在 React 树之外渲染的命令式 API（如独立的 confirm()）使用根主题。

全局状态：嵌套 Provider 从不写入 ，从不读写 Cookie（persist 会被忽略），也从不修改 React 版的全局语言。卸载它后页面保持根 Provider 设置的状态不变；卸载根 Provider 时会还原它所做的修改。嵌套 Provider 的 setTheme 和 setPalette 修改它自己的覆盖值；对于未覆盖的设置，则修改父级的值。

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      <App />
    </ConfigProvider>
  );
}
```

```tsx
import { useState } from "react";
import { Button, ConfigProvider, type Theme } from "minerva-design";

export default function Root() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ConfigProvider theme={theme}>
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </Button>
    </ConfigProvider>
  );
}
```

```tsx
import { Button, ConfigProvider, useConfig } from "minerva-design";

export default function Root() {
  return (
    // "system" is an alias of "auto". palette applies with light / dark / system.
    <ConfigProvider
      theme="system"
      palette="editorial"
      persist // restore / save the "theme" and "palette" cookies
      onThemeChange={(theme) => analytics.track("theme", theme)}
      onPaletteChange={(palette) => analytics.track("palette", palette)}
    >
      <App />
    </ConfigProvider>
  );
}

function Settings() {
  const { mode, resolvedMode, palette, setTheme, setPalette } = useConfig();
  // mode: "light" | "dark" | "system"; resolvedMode: "light" | "dark"
  return (
    <>
      <Button onClick={() => setTheme(resolvedMode === "dark" ? "light" : "dark")}>
        {mode}
      </Button>
      <Button onClick={() => setPalette(palette === "tech" ? null : "tech")}>
        {palette ?? "default"}
      </Button>
    </>
  );
}
```

```tsx
import { ConfigProvider, ThemeToggle } from "minerva-design";

// Indigo brand: no --primary-color overrides, no !important.
// theme stays "light" | "dark" | "system", so data-theme and ThemeToggle work.
export default function Root() {
  return (
    <ConfigProvider theme="system" persist primaryColor="#4f46e5">
      {/* dark mode derives #7b85f2 from #4f46e5 */}
      <ThemeToggle />
      <App />
    </ConfigProvider>
  );
}

// Or pick both values:
<ConfigProvider theme="light" primaryColor={{ light: "#4f46e5", dark: "#818cf8" }} />

// The palette keeps its surfaces and text colors, primaryColor wins:
<ConfigProvider palette="tech" primaryColor="#4f46e5" />
```

```tsx
import { ConfigProvider } from "minerva-design";

export default function Root() {
  return (
    // root provider: owns <html>, the cookies and the React library's global language
    <ConfigProvider theme="system" palette="editorial" persist>
      <App />

      {/* inherits theme + palette, only this subtree is in Japanese */}
      <ConfigProvider locale={{ language: "ja" }}>
        <Sidebar />
      </ConfigProvider>

      {/* dark + inherited palette for this card and its overlays only */}
      <ConfigProvider theme="dark">
        <PreviewCard />
      </ConfigProvider>
    </ConfigProvider>
  );
}
```

```tsx
import { useContext } from "react";
import { ConfigContext } from "minerva-design";

// Unlike useConfig(), reading the context directly does not throw outside a
// provider: it returns undefined, which is handy for optional integrations.
function useOptionalConfig() {
  return useContext(ConfigContext);
}
```

## ConfigProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ConfigProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "theme",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "ConfigProviderThemeProps | undefined",
    "typeRef": "type:7e53e5511cbf3537893a",
    "required": false,
    "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
  },
  {
    "name": "palette",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "cool",
      "editorial",
      "graphite",
      "tech"
    ],
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "typeRef": "type:b7f5e4f1c686e6b76ccf",
    "required": false,
    "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
  },
  {
    "name": "primaryColor",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
  },
  {
    "name": "persist",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
  },
  {
    "name": "locale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "object",
    "typeText": "Locale | undefined",
    "typeRef": "type:faa2d1cac8abe6cb7ce4",
    "required": false,
    "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
  },
  {
    "name": "preset",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"compact\" | \"minerva\" | \"touch\" | undefined",
    "typeRef": "type:57c71898ce4900e4be17",
    "required": false,
    "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
  },
  {
    "name": "density",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"comfortable\" | \"standard\" | undefined",
    "typeRef": "type:6c4c4181cf4b702c1892",
    "required": false,
    "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
  },
  {
    "name": "radius",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | \"none\" | undefined",
    "typeRef": "type:81d0cef3201cfa049ee4",
    "required": false,
    "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
  },
  {
    "name": "shadow",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"subtle\" | \"none\" | \"standard\" | undefined",
    "typeRef": "type:24a43819632837de5021",
    "required": false,
    "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
  },
  {
    "name": "fontScale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"small\" | \"large\" | \"standard\" | undefined",
    "typeRef": "type:4fdefa306ab8f9ff4574",
    "required": false,
    "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((theme: ConfigProviderThemeProps) => void) | undefined",
    "typeRef": "type:2f3ee82ad197e9845fea",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ConfigProviderThemeProps",
        "typeRef": "type:73ae73d9b67b72d0bab6"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after `setTheme` changes the theme"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:413c6a7bb82a25e28be4",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "typeRef": "type:918077d2a22b5f20e063"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after `setPalette` changes the palette"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

### bindings

```json
[
  {
    "prop": "theme",
    "event": "onThemeChange",
    "syntax": "theme={theme} onThemeChange={handler}"
  },
  {
    "prop": "palette",
    "event": "onPaletteChange",
    "syntax": "palette={palette} onPaletteChange={handler}"
  }
]
```

## API

```json
{
  "ConfigContextProviderProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Props of `ConfigProvider`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "default": "\"auto\" (nested: the parent's theme)",
        "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "null (nested: the parent's palette)",
        "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "null (nested: the parent's brand color)",
        "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
      },
      {
        "name": "persist",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Called after `setTheme` changes the theme"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called after `setPalette` changes the palette"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "default": "{ language: \"en\" } (nested: the parent's locale)",
        "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"minerva\" (nested: the parent's design)",
        "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "\"medium\" (or the preset's)",
        "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Application content"
      }
    ]
  },
  "ConfigContextProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Value of `ConfigContext`, returned by `useConfig()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "description": "Theme as configured (may be \"auto\" or a light/dark pair)"
      },
      {
        "name": "resolvedTheme",
        "type": "ThemeName | ComponentTheme",
        "required": false,
        "description": "Theme that is currently applied after resolving \"auto\" / light-dark pairs"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Current locale of the React library's built-in texts"
      },
      {
        "name": "mode",
        "type": "ThemeMode",
        "required": false,
        "description": "Color mode of the theme: \"light\" / \"dark\" for those themes, \"system\" for \"auto\" / \"system\" / `{ light, dark }` pairs, `undefined` for other themes"
      },
      {
        "name": "resolvedMode",
        "type": "ResolvedThemeMode",
        "required": false,
        "description": "Applied color mode (`data-theme` on `<html>`, or on the scope element of a nested provider), when it can be determined"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "description": "Active palette (`data-palette` on `<html>`, or on the scope element of a nested provider), `null` for Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColorPair | null",
        "required": false,
        "description": "Brand color in effect (normalized light / dark pair, see `ConfigProvider`'s `primaryColor`), `null` when the theme / palette primary color applies"
      },
      {
        "name": "design",
        "type": "ResolvedDesign",
        "required": false,
        "description": "Applied design axes (`data-density` / `data-radius` / `data-shadow` / `data-font-scale`) and the preset they come from"
      },
      {
        "name": "setTheme",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Change the theme (persisted to the `theme` cookie when `persist` is on)"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Change the palette (persisted to the `palette` cookie when `persist` is on)"
      }
    ]
  },
  "Locale": {
    "source": "react/src/contexts/types.ts",
    "description": "Locale settings of the React library's built-in texts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": false,
        "default": "\"en\"",
        "description": "Language of the React library's built-in texts"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 品牌色

在站点当前模式下使用 primaryColor 的嵌套 ConfigProvider：单个靛蓝色（自动派生暗色值）、{ light, dark } 对，以及青色。切换站点主题即可对比派生的暗色值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/brand-color.tsx

```tsx
import { Button, ConfigProvider, Switch, useConfig } from "minerva-design";

// A brand color without overriding --primary-color by hand: each card is a
// nested <ConfigProvider primaryColor> in the site's current light / dark mode.
// A single color gets a lighter dark-mode value (contrast on dark surfaces);
// a { light, dark } pair sets both. Hover, active, subtle, border, text and
// focus ring colors are all derived from it.
const brands = [
  { label: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    label: 'primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}',
    primaryColor: { light: "#4f46e5", dark: "#818cf8" },
  },
  { label: 'primaryColor="#0d9488"', primaryColor: "#0d9488" },
];

function Swatch() {
  const { resolvedMode = "light", primaryColor } = useConfig();
  return (
    <code style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
      {resolvedMode}: {primaryColor?.[resolvedMode]}
    </code>
  );
}

export default function BrandColorDemo() {
  const { resolvedMode = "light" } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {brands.map(({ label, primaryColor }) => (
        <ConfigProvider
          key={label}
          theme={resolvedMode}
          primaryColor={primaryColor}
        >
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <code style={{ fontSize: 12, overflowWrap: "anywhere" }}>
              {label}
            </code>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Button size="small" color="primary">
                Primary
              </Button>
              <Button size="small" color="primary" variant="outline">
                Outline
              </Button>
              <Switch defaultChecked aria-label="Brand switch" />
            </div>
            <Swatch />
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: 自定义主题

基于 themes.light 构建的自定义主题，传给嵌套的 ConfigProvider：只有这个容器会切换主题，包括通过 Portal 渲染的 Select 菜单。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/custom-theme.tsx

```tsx
import {
  Button,
  ConfigProvider,
  HStack,
  Select,
  SelectItem,
  Switch,
  themes,
  type ComponentTheme,
  VStack,
} from "minerva-design";

// A custom theme: start from a built-in one and override tokens.
const sepia: ComponentTheme = {
  ...themes.light,
  "primary-color": "#9a3412",
  "primary-color-hover": "#7c2d12",
  "primary-color-active": "#6c2710",
  "background-color": "#fbf5e9",
  "foreground-color": "#3b2f2a",
  "border-color": "#e0d2b8",
  "text-gray": "#6b5b4e",
  "focus-ring-color": "rgba(154, 52, 18, 0.45)",
};

// A nested ConfigProvider applies its theme to its own subtree only (the
// site's root provider keeps <html>). Portalled content opened from inside,
// like the Select menu below, gets the same theme.
export default function CustomThemeDemo() {
  return (
    <ConfigProvider theme={sepia}>
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--surface-color)",
          color: "var(--text-color)",
        }}
      >
        <VStack gap={4} align="start">
          <strong>Sepia theme</strong>
          <span>Only this container uses the custom theme.</span>
          <HStack gap={4} wrap>
            <Button color="primary">Primary</Button>
            <Button color="primary" disabled>
              Disabled
            </Button>
            <Switch label="Reading mode" defaultChecked />
            <Select aria-label="Paper" defaultValue="cream">
              <SelectItem value="cream">Cream</SelectItem>
              <SelectItem value="ivory">Ivory</SelectItem>
              <SelectItem value="kraft">Kraft</SelectItem>
            </Select>
          </HStack>
        </VStack>
      </div>
    </ConfigProvider>
  );
}

```

## Example: 语言

只设置 locale（en、zh、ja 或 fr）的嵌套 ConfigProvider：其子树的内置文案会改变，而主题和配色继承自站点，<html> 不受影响。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/locale.tsx

```tsx
import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Pagination,
  Tag,
  useConfig,
  useI18n,
  type SupportedLanguage,
} from "minerva-design";

// a key from the React library's built-in translations
const AVATAR_KEY = "avatar.default";
const LANGUAGES: SupportedLanguage[] = ["en", "zh", "ja", "fr"];

function Preview() {
  const { locale, palette } = useConfig();
  const { t } = useI18n();
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        locale: <Tag color="primary">{locale?.language}</Tag> {AVATAR_KEY}:{" "}
        <Tag color="info">{t(AVATAR_KEY)}</Tag> palette:{" "}
        <Tag color="success">{palette ?? "default"}</Tag>
      </div>
      <Pagination total={50} defaultCurrent={2} showTotal />
    </div>
  );
}

export default function LocaleDemo() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // A nested provider that only sets `locale`: theme and palette are
  // inherited from the site's provider, <html> is left alone, and the
  // language only applies to this subtree.
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Language"
        style={{ display: "flex", gap: 8 }}
      >
        {LANGUAGES.map((lng) => (
          <Button
            key={lng}
            size="small"
            color={lng === language ? "primary" : "neutral"}
            variant={lng === language ? "solid" : "outline"}
            aria-pressed={lng === language}
            onClick={() => setLanguage(lng)}
          >
            {lng}
          </Button>
        ))}
      </div>
      <ConfigProvider locale={{ language }}>
        <Preview />
      </ConfigProvider>
    </div>
  );
}

```

## Example: 调色板

每张卡片都是一个带有自己配色的嵌套 ConfigProvider，使用站点当前的模式。站点的根 Provider 仍保留 <html> 上的 data-palette。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/palette.tsx

```tsx
import { Button, ConfigProvider, Tag, useConfig } from "minerva-design";
import { PALETTES } from "minerva-design/theme-utils";

// The site's root provider sets data-palette on <html>. Each card below is a
// nested <ConfigProvider palette={name}>: the palette (in the site's current
// light / dark mode) only applies inside the card.
export default function PaletteDemo() {
  const { resolvedMode = "light", palette } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.map((name) => (
        <ConfigProvider key={name} theme={resolvedMode} palette={name}>
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <strong>
              palette=&quot;{name}&quot;{" "}
              {palette === name && <Tag color="success">active</Tag>}
            </strong>
            <Button size="small" color="primary">
              Primary
            </Button>
            <span style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
              data-theme=&quot;{resolvedMode}&quot;
            </span>
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: 读取配置

useConfig() 返回最近的 Provider 所配置的主题、解析后的主题、配色和语言。在页头切换站点主题、配色或语言即可看到变化。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/use-config.tsx

```tsx
import { Tag, useConfig } from "minerva-design";

// useConfig() reads the nearest ConfigProvider. This site wraps every page in
// one, so the values below change when you pick another theme, palette or
// language in the header.
export default function UseConfigDemo() {
  const { theme, resolvedTheme, palette, locale } = useConfig();

  const describe = (value: unknown) =>
    typeof value === "string" ? value : "custom theme object";

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 16px",
        margin: 0,
      }}
    >
      <dt>theme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="primary">{describe(theme)}</Tag>
      </dd>
      <dt>resolvedTheme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="info">{describe(resolvedTheme)}</Tag>
      </dd>
      <dt>palette</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="warning">{palette ?? "null"}</Tag>
      </dd>
      <dt>locale.language</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="success">{locale?.language ?? "en"}</Tag>
      </dd>
    </dl>
  );
}

```
