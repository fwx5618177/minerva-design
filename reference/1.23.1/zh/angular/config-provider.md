# ConfigProvider 全局配置

为应用提供 React 版的主题和语言，并通过 useConfig() 读取它们。

Package: minerva-design@1.23.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnConfig (mn-config): nested theme, palette, locale and design scopes.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnConfig"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "theme",
    "typeText": "ConfigTheme | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "palette",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "persist",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "locale",
    "typeText": "Locale | SupportedLanguage | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "preset",
    "typeText": "\"editorial\" | \"minerva\" | \"compact\" | \"touch\" | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "density",
    "typeText": "\"compact\" | \"standard\" | \"comfortable\" | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "radius",
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "shadow",
    "typeText": "\"standard\" | \"none\" | \"subtle\" | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "fontScale",
    "typeText": "\"standard\" | \"small\" | \"large\" | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  },
  {
    "name": "primaryColor",
    "typeText": "PrimaryColor | null | undefined",
    "required": false,
    "source": "packages/angular/src/config/config.ts"
  }
]
```

### events

```json
[
  {
    "name": "themeChange",
    "typeText": "ConfigTheme",
    "required": false,
    "source": "packages/angular/src/config/config.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ConfigTheme",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "paletteChange",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
    "required": false,
    "source": "packages/angular/src/config/config.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Reactive nested configuration

MnConfig creates an inheritable subtree scope. themeChange/paletteChange write user toggles back to the parent; the inner explicit configuration remains independent. provideMinerva() supplies application-root defaults.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnConfig, MnButton, MnThemeToggle, MnPaletteToggle, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnConfig, MnButton, MnThemeToggle, MnPaletteToggle, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><button mnButton variant="outline" (click)="localTheme=localTheme==='dark'?'light':'dark'">Toggle scoped theme</button><button mnButton variant="ghost" (click)="localTheme='light';localPalette=null">Reset scope</button><output>Scope: {{localTheme}} / {{localPalette || 'default'}}</output></mn-stack><mn-config [theme]="localTheme" (themeChange)="localTheme=$event" [palette]="localPalette" (paletteChange)="localPalette=$event"><mn-stack gap="3"><mn-theme-toggle/><mn-palette-toggle/><button mnButton>Scoped button</button><mn-config theme="light" palette="tech"><button mnButton>Nested light tech button</button></mn-config></mn-stack></mn-config>
  `,
})
export class Example {
  localTheme: import('minerva-design/angular').ConfigTheme = "light";
  localPalette: 'editorial' | 'tech' | 'graphite' | 'cool' | null = null;
}

```

## Example: Scoped configuration

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnConfig, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnConfig, MnButton],
  template: `
<mn-config theme="dark"><div style="padding:20px;background:var(--surface-color);color:var(--text-color)"><button mnButton>Dark scoped button</button></div></mn-config>
  `,
})
export class Example {

}

```

## Example: Local language

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnConfig, MnEmpty } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnConfig, MnEmpty],
  template: `
<mn-config locale="zh"><mn-empty title="暂无项目" description="创建你的第一个项目。"/></mn-config>
  `,
})
export class Example {

}

```

## Example: 品牌色

在站点当前模式下使用 primaryColor 的嵌套 ConfigProvider：单个靛蓝色（自动派生暗色值）、{ light, dark } 对，以及青色。切换站点主题即可对比派生的暗色值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnConfig, MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnConfig, MnButton, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-config primaryColor="#4f46e5"><button mnButton>Indigo</button></mn-config><mn-config primaryColor="#4f46e5" theme="dark"><div style="padding:12px;background:var(--surface-color)"><button mnButton>Indigo, dark (#7b85f2)</button></div></mn-config><mn-config [primaryColor]="{ light: '#0d9488', dark: '#5eead4' }"><button mnButton variant="outline">Teal pair</button></mn-config></mn-stack>
  `,
})
export class Example {

}

```
