# ConfigProvider 全局配置

为应用提供 React 版的主题和语言，并通过 useConfig() 读取它们。

Package: minerva-design@1.20.0

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "ConfigProviderTheme | undefined",
    "typeRef": "type:b2d56bdaa4bed3c93033",
    "required": false
  },
  {
    "name": "palette",
    "source": "packages/taro/src/theme.tsx",
    "kind": "enum",
    "values": [
      "cool",
      "editorial",
      "graphite",
      "tech"
    ],
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "typeRef": "type:b7f5e4f1c686e6b76ccf",
    "required": false
  },
  {
    "name": "primaryColor",
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: a CSS color for both modes (the dark-mode value is derived for contrast on dark surfaces) or a `{ light, dark }` pair. Recomputes every token derived from `primary-color` and wins over the palette / custom theme's primary color. Unset: the parent provider's; `null`: the theme's own. Invalid colors are ignored with a development warning."
  },
  {
    "name": "locale",
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "string | Locale | undefined",
    "typeRef": "type:4bea4c2c61106ce459b7",
    "required": false
  },
  {
    "name": "design",
    "source": "packages/taro/src/theme.tsx",
    "kind": "object",
    "typeText": "DesignOptions | undefined",
    "typeRef": "type:0d1f6356a5ba2ecc4c1b",
    "required": false
  },
  {
    "name": "persist",
    "source": "packages/taro/src/theme.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "preset",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\" | undefined",
    "typeRef": "type:e89cc37da1adddd41a88",
    "default": "minerva",
    "required": false,
    "description": "Named combination of the axes below and a default palette: \"minerva\" (default look), \"editorial\" (restrained, reading-oriented), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density with 44px touch targets, large radius)"
  },
  {
    "name": "density",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"standard\" | \"comfortable\" | undefined",
    "typeRef": "type:5ea3bae44292e2cd25dd",
    "required": false,
    "description": "Spacing density of controls and rows"
  },
  {
    "name": "radius",
    "source": "packages/core/src/theme/design.ts",
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
    "description": "Corner radius scale"
  },
  {
    "name": "shadow",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"none\" | \"subtle\" | \"standard\" | undefined",
    "typeRef": "type:dfccc67a99cc75bd5e58",
    "required": false,
    "description": "Elevation shadow scale"
  },
  {
    "name": "fontScale",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"small\" | \"large\" | \"standard\" | undefined",
    "typeRef": "type:4fdefa306ab8f9ff4574",
    "required": false,
    "description": "Type scale"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/taro/src/theme.tsx",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:c6375db4d574c80ea3ef",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ThemeMode",
        "typeRef": "type:49e6b37018cf95b597ae"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onPaletteChange",
    "source": "packages/taro/src/theme.tsx",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:1dd3725f028e7f81bd97",
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
    "required": false
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
