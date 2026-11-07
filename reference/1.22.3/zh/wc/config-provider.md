# ConfigProvider 全局配置

为应用提供 React 版的主题和语言，并通过 useConfig() 读取它们。

Package: minerva-design@1.22.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design/web-components/config",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "theme",
    "typeText": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
    "attribute": "theme",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "Palette | undefined",
    "attribute": "palette",
    "required": false
  },
  {
    "name": "design",
    "typeText": "DesignPreset | undefined",
    "attribute": "design",
    "required": false
  },
  {
    "name": "density",
    "typeText": "Density | undefined",
    "attribute": "density",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "RadiusScale | undefined",
    "attribute": "radius",
    "required": false
  },
  {
    "name": "shadow",
    "typeText": "ShadowScale | undefined",
    "attribute": "shadow",
    "required": false
  },
  {
    "name": "fontScale",
    "typeText": "FontScale | undefined",
    "attribute": "font-scale",
    "required": false
  },
  {
    "name": "primaryColor",
    "typeText": "PrimaryColor | undefined",
    "attribute": "primary-color",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "SupportedLanguage | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "root",
    "typeText": "boolean",
    "attribute": "root",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-theme-change",
    "typeText": "CustomEvent<{ mode: \"light\" | \"dark\"; }>",
    "detailType": {
      "typeText": "{ mode: \"light\" | \"dark\"; }",
      "typeRef": "type:9bfa840eb7f37b20f5e9"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Scoped content"
  }
]
```

## API

```json
{
  "wc:minerva-config": {
    "kind": "element",
    "source": "web-components/src/components/config/config.ts",
    "className": "MinervaConfig",
    "summary": "Theme / palette / design / locale scope (ConfigProvider for Web Components).",
    "description": "Theme, palette, design and language scope for the Minerva elements inside it (and any other content): the Web Component counterpart of the React library's `ConfigProvider`. It renders as `display: contents` and writes the same attributes as a nested `ConfigProvider` (`data-theme`, `data-palette`, `data-density` / `data-radius` / `data-shadow` / `data-font-scale`, `data-minerva-theme-scope`, `lang`), so the design tokens of `minerva-design/tokens.css` (also published as `minerva-design/tokens.css`) resolve for its subtree. Scopes nest: the closest one wins. Overlays opened inside stay in the scope (they use the top layer without being moved). With `root`, the attributes go on `<html>` instead (whole page). Without `<minerva-config>`, the same attributes set on any ancestor (e.g. `<html data-theme=\"dark\" lang=\"fr\">`) work too.",
    "properties": [
      {
        "name": "theme",
        "attribute": "theme",
        "type": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
        "description": "Light, dark, follow the system, or the github-dark theme"
      },
      {
        "name": "palette",
        "attribute": "palette",
        "type": "Palette | undefined",
        "description": "Color palette (light and dark variants)"
      },
      {
        "name": "design",
        "attribute": "design",
        "type": "DesignPreset | undefined",
        "description": "Design preset (its palette applies unless `palette` is set)"
      },
      {
        "name": "density",
        "attribute": "density",
        "type": "Density | undefined",
        "description": "Spacing density (overrides the preset)"
      },
      {
        "name": "radius",
        "attribute": "radius",
        "type": "RadiusScale | undefined",
        "description": "Corner radius scale (overrides the preset)"
      },
      {
        "name": "shadow",
        "attribute": "shadow",
        "type": "ShadowScale | undefined",
        "description": "Elevation shadow scale (overrides the preset)"
      },
      {
        "name": "fontScale",
        "attribute": "font-scale",
        "type": "FontScale | undefined",
        "description": "Type scale (overrides the preset)"
      },
      {
        "name": "primaryColor",
        "attribute": "primary-color",
        "type": "PrimaryColor | undefined",
        "description": "Brand color: a CSS color (`primary-color=\"#4f46e5\"`) whose dark-mode value is derived for contrast on dark surfaces, or (as a property) a `{ light, dark }` pair. Recomputes every token derived from `primary-color` and wins over the palette's. The value of the applied mode is written inline: without `theme`, the mode of the closest ancestor with `data-theme` when applied (light when the element scopes a palette, design or scale, whose tokens render light). A brand color alone does not scope the subtree."
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "SupportedLanguage | undefined",
        "description": "Language of the built-in texts of the elements inside"
      },
      {
        "name": "root",
        "attribute": "root",
        "type": "boolean",
        "default": "false",
        "description": "Apply to the whole document (`<html>`) instead of this subtree"
      },
      {
        "name": "resolvedMode",
        "type": "\"light\" | \"dark\" | null",
        "readonly": true,
        "description": "Light / dark mode currently applied (`null` when no theme is set)."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-theme-change",
        "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Scoped content"
      }
    ],
    "parts": [],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本用法

<minerva-config> 以 display: contents 渲染，为其内部所有内容限定主题作用域：这里并排展示一个浅色和一个深色作用域。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/basic.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config theme="light">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Light scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Dark scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: 品牌色

使用 primary-color 的作用域：单个靛蓝色（自动推导暗色值 #7b85f2）、暗色作用域中的靛蓝色，以及覆盖 editorial 调色板主色的青色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/brand-color.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config primary-color="#4f46e5">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#4f46e5" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#0d9488" palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Teal over palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: 语言

locale 设置内部元素内置文本的语言（分页总数、空状态）。切换语言即可实时看到更新。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/locale.html

```html
<label style="display: inline-flex; gap: 8px; align-items: center">
  Locale
  <select id="locale">
    <option value="en">English</option>
    <option value="fr">Français</option>
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
  </select>
</label>
<minerva-config id="scope" locale="en">
  <div style="display: grid; gap: 12px; margin-top: 12px">
    <minerva-pagination total="120" show-total></minerva-pagination>
    <minerva-empty></minerva-empty>
  </div>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/locale.ts

```tsx
// Built-in texts follow the `locale` of the closest <minerva-config>
// (or the closest `lang` attribute) and update live when it changes.
export function setup(root: HTMLElement) {
  const select = root.querySelector<HTMLSelectElement>("#locale")!;
  const scope = root.querySelector<HTMLElement & { locale: string }>("#scope")!;
  const onChange = () => (scope.locale = select.value);
  select.addEventListener("change", onChange);
  return () => select.removeEventListener("change", onChange);
}

```

## Example: 嵌套作用域与主题事件

作用域可以嵌套，最近的作用域生效：内层始终为浅色，外层跟随按钮切换。minerva-theme-change 报告解析后的模式，theme="system" 时同样适用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/nested.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
  <minerva-button
    id="outer-light"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: light</minerva-button
  >
  <minerva-button id="outer-dark" size="small" variant="outline" color="neutral"
    >Outer: dark</minerva-button
  >
  <minerva-button
    id="outer-system"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: system</minerva-button
  >
  <output id="mode" aria-live="polite"></output>
</div>
<minerva-config id="outer" theme="dark">
  <minerva-card variant="outline" padding="medium" style="margin-top: 12px">
    <minerva-card-header>
      <minerva-card-title>Outer scope</minerva-card-title>
      <minerva-card-description
        >Follows the buttons above.</minerva-card-description
      >
    </minerva-card-header>
    <minerva-card-content>
      <minerva-config theme="light" palette="cool">
        <minerva-card variant="elevated" padding="small">
          <minerva-card-content>
            Nested scope: always light with the cool palette (the closest scope
            wins).
            <minerva-button size="small" style="margin-top: 8px"
              >Nested button</minerva-button
            >
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
    </minerva-card-content>
  </minerva-card>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/nested.ts

```tsx
// minerva-theme-change reports the resolved mode of a scope, including the
// system preference when theme="system".
type Config = HTMLElement & {
  theme: string;
  resolvedMode: "light" | "dark" | null;
};

export function setup(root: HTMLElement) {
  const outer = root.querySelector<Config>("#outer")!;
  const mode = root.querySelector<HTMLOutputElement>("#mode")!;
  const show = () => (mode.value = `Resolved mode: ${outer.resolvedMode}`);
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id?.startsWith("outer-")) outer.theme = id.slice("outer-".length);
  };
  root.addEventListener("click", onClick);
  outer.addEventListener("minerva-theme-change", show);
  const frame = requestAnimationFrame(show);
  return () => {
    cancelAnimationFrame(frame);
    root.removeEventListener("click", onClick);
    outer.removeEventListener("minerva-theme-change", show);
  };
}

```

## Example: 调色板与设计

palette、design（预设）以及 density / radius / shadow / font-scale 覆盖项只作用于该子树。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/palette-design.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config palette="tech" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="tech" + dark</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config design="compact" radius="none">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>design="compact" radius="none"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config density="comfortable" radius="large" font-scale="large">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Comfortable, large</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```
