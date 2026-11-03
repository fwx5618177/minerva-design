# 主题

内置的浅色与深色主题、以 CSS 变量形式存在的设计令牌，以及如何创建你自己的主题。

Package: minerva-design@1.20.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 内置主题

React 版内置三套主题：light、dark 和 github-dark。通过 ConfigProvider 的 theme 属性选择其一，或保留默认值 "auto"——它会跟随操作系统的配色方案，并在其变化时实时更新。

### 动手试试

这个切换器控制整个文档站点的主题。下方的组件以及每个页面都会立即更新，因为它们只读取 CSS 变量。

当前应用的主题：

组件无需重新渲染即可切换主题：变化的只是  上的 CSS 变量。

### 可接受的主题值

ConfigProvider 的 theme 属性（以及 useAutoTheme / applyThemeStyles）接受：

取值

默认值。根据 prefers-color-scheme 使用 light 或 dark，并跟随其变化。

内置浅色主题。

内置深色主题。

基于 GitHub 深色配色的深色主题。

完整的主题对象（包含所有基础令牌，以及可选的语义令牌和组件令牌）。通常通过展开一个内置主题来创建。

两个主题对象；会应用与系统配色方案匹配的那一个，并自动切换。

### 工作原理

主题是一个由令牌名到 CSS 值组成的扁平映射。ConfigProvider 会把每一项写成名为 -- 的 CSS 自定义属性，放在  元素的内联样式中：

组件样式只引用这些变量（例如 background: var(--primary-color)），因此切换主题永远不会重新渲染 React 组件。样式表还在 :root 上声明了所有令牌，所以即使在 ConfigProvider 生效之前（或没有使用它）组件也会以浅色主题的值呈现。

### 自定义主题

展开一个内置主题并覆盖所需的令牌来创建主题，然后传给 ConfigProvider。传入 { light, dark } 组合可继续跟随系统配色。悬停、浅色背景、焦点环等语义令牌由基础令牌派生，因此通常只需覆盖 primary-color。

### 颜色与变体属性

所有组件都通过同一个 color 属性选择语义颜色，其类型来自共享的 ColorScheme：primary、neutral、success、warning、danger 或 info（部分组件只接受文档中说明的子集）。它始终是主题角色，而不是原始 CSS 颜色：如需修改组件颜色，请修改主题令牌或组件的 CSS 自定义属性。

variant 只用于选择视觉样式，并且在所有组件中含义一致：solid（以该颜色填充，反色文字）、subtle（浅色着色背景）、outline（透明背景，彩色边框和文字）以及 ghost（透明且无边框）。组件可在需要时提供自有样式（Tabs 的 line / enclosed、Input 的 filled 等）。

### 用 CSS 覆盖令牌

你也可以在普通样式表中设置令牌。请注意每个值是在哪里定义的：

ConfigProvider 会把当前主题以内联样式写在  上，其优先级高于样式表中的 :root 规则。由主题设置的令牌需要 !important 才能被全局覆盖；组件令牌（btn-*、card-*、avatar-*）不会被内置主题设置，可以正常定义。

### 令牌参考

每个令牌都可以通过 var(--) 使用。色块显示的是当前主题中的值。

CSS 变量

基础令牌

每个主题对象都必须提供（ThemeProps）。

语义令牌

可选（SemanticThemeProps）。默认值由基础令牌通过 color-mix() 派生；内置深色主题会显式设置其中一部分。

角色令牌

每种角色颜色都会派生出 hover、active、subtle（着色背景）、border 和 text 令牌，例如 --primary-color-hover 或 --danger-color-subtle。

角色

组件令牌

可选的组件级覆盖（ComponentThemeProps）。未设置时组件会回退到语义令牌。

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // "auto" (default) follows the operating system's color scheme
  return <ConfigProvider theme="github-dark">{/* your app */}</ConfigProvider>;
}
```

```html
<!-- what ConfigProvider writes on the document root -->
<html style="--primary-color: #58a6ff; --background-color: #0d1117; ...">
```

```tsx
import { ConfigProvider, themes, type ComponentTheme } from "minerva-design";

// Start from a built-in theme and override the tokens you need.
// Derived tokens (hover, subtle, focus ring...) follow automatically.
const brandLight: ComponentTheme = {
  ...themes.light,
  "primary-color": "#7c3aed",
  "link-color": "#6d28d9",
};

const brandDark: ComponentTheme = {
  ...themes.dark,
  "primary-color": "#a78bfa",
  "focus-ring-color": "rgba(167, 139, 250, 0.55)",
};

export default function App() {
  return (
    // a single object: always this theme
    // <ConfigProvider theme={brandLight}>
    // a { light, dark } pair: follows the system color scheme
    <ConfigProvider theme={{ light: brandLight, dark: brandDark }}>
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
import { Button, Badge, Alert, Tooltip, toast } from "minerva-design";
import type { ColorScheme } from "minerva-design";
// "primary" | "neutral" | "success" | "warning" | "danger" | "info"

<Button color="danger" variant="outline">Delete</Button>
<Badge color="success" variant="subtle" content="Live" />
<Alert color="warning" variant="solid" title="Quota almost reached" />
<Tooltip color="info" content="Synced"><Button>Status</Button></Tooltip>
toast.success("Saved"); // toast({ color: "success", title: "Saved" })
```

```scss
/* Component-level tokens are not set by the built-in themes,
   so a plain stylesheet can define them */
:root {
  --card-bg-color: #fdf6e3;
  --btn-bg-color-hover: #1e40af;
}

/* Theme tokens are written as inline styles on <html> by ConfigProvider,
   which beat :root rules: use !important to force a value globally... */
:root {
  --radius-md: 10px !important;
}

/* ...or override them for one part of the page */
.checkout {
  --primary-color: #16a34a;
  /* derived tokens are computed on :root: redeclare the ones you need */
  --primary-color-hover: color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color));
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 局部主题

令牌就是普通的 CSS 变量：在包裹元素上覆盖它们，即可只为页面的一部分换肤。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/theming/demos/scoped-theme.tsx

```tsx
import type React from "react";
import { useState } from "react";
import { Button, Checkbox, HStack, Switch, Tag, VStack } from "minerva-design";

const BRANDS = {
  violet: "#7c3aed",
  teal: "#0d9488",
  orange: "#c2410c",
};

type Brand = keyof typeof BRANDS;

// Theme tokens are plain CSS custom properties, so they can be overridden
// for a single subtree. Derived tokens (hover, subtle, focus ring...) are
// computed on :root, so redeclare them to make them follow the new value.
const brandStyle = (primary: string) =>
  ({
    "--primary-color": primary,
    "--primary-color-hover":
      "color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))",
    "--primary-color-active":
      "color-mix(in srgb, var(--primary-color) 72%, var(--foreground-color))",
    "--primary-color-subtle":
      "color-mix(in srgb, var(--primary-color) 12%, var(--surface-color))",
    "--primary-color-text":
      "color-mix(in srgb, var(--primary-color) 80%, var(--foreground-color))",
    "--focus-ring-color":
      "color-mix(in srgb, var(--primary-color) 45%, transparent)",
    padding: 16,
    borderRadius: 8,
    border: "1px dashed var(--border-color)",
  }) as React.CSSProperties;

export default function ScopedThemeDemo() {
  const [brand, setBrand] = useState<Brand>("violet");

  return (
    <VStack gap={4} align="start">
      <div
        role="group"
        aria-label="Brand color"
        style={{ display: "flex", gap: 8 }}
      >
        {(Object.keys(BRANDS) as Brand[]).map((name) => (
          <Button
            key={name}
            size="small"
            color={name === brand ? "primary" : "neutral"}
            variant={name === brand ? "solid" : "outline"}
            aria-pressed={name === brand}
            onClick={() => setBrand(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div style={brandStyle(BRANDS[brand])}>
        <HStack gap={4} wrap>
          <Button color="primary">Scoped primary</Button>
          <Switch label="Switch" defaultChecked />
          <Checkbox label="Checkbox" defaultChecked />
          <Tag color="primary">Tag</Tag>
        </HStack>
      </div>
    </VStack>
  );
}

```
