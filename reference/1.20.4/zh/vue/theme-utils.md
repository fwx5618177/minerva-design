# 主题工具

用于在 ConfigProvider 之外解析、应用和查看主题的函数与主题对象。

Package: minerva-design@1.20.4

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### 参考

ConfigProvider 和 useAutoTheme 都基于这些工具函数构建。可用它们在不使用 React 的情况下应用主题、为单个元素设置主题，或读取令牌的值。

名称

签名

解析主题并以 CSS 变量的形式写到  上（全局生效）。上一个主题中有而新主题未定义的变量会被移除。

把主题对象的每个令牌以 -- 的形式写入给定的样式声明（例如 element.style），并移除过期的变量。可用于为单个元素设置主题。

把任意可接受的主题值转换为主题对象："auto" 和 { light, dark } 组合使用 systemTheme，名称会在 themes 中查找，对象原样返回。遇到未知名称会抛错。无副作用。

根据 prefers-color-scheme 返回操作系统的配色方案；matchMedia 不可用时（SSR、测试）返回 "light"。

类型守卫：对由主题对象组成的 { light, dark } 组合返回 true。

以 theme 属性可接受的名称为键的内置主题集合。

内置主题对象，也会单独导出；展开它们即可创建自定义主题。

全局应用主题

applyThemeStyles 正是 ConfigProvider 所调用的函数。可在非 React 代码中使用，或在首次渲染前应用主题，以避免默认颜色闪烁。

为单个元素设置主题

generateCSSVariables 接受任意 CSSStyleDeclaration，因此可以把令牌限定在某个元素上：其后代元素会继承这些值。

解析主题

resolveTheme、isBilingualTheme 和 getSystemTheme 没有副作用；可用它们计算令牌的值，例如为 canvas 或图表设置样式。

```tsx
import { applyThemeStyles, themes } from "minerva-design";

// Without React (or before the first render): write a theme on <html>
applyThemeStyles("dark");
applyThemeStyles({ ...themes.light, "primary-color": "#7c3aed" });

// "auto" and { light, dark } pairs need the scheme to resolve against
// (defaults to the current prefers-color-scheme)
applyThemeStyles("auto", "dark");
```

```tsx
import { generateCSSVariables, resolveTheme } from "minerva-design";

// Theme a single element (e.g. an embedded widget) instead of the page
const widget = document.querySelector<HTMLElement>("#widget")!;
generateCSSVariables(widget.style, resolveTheme("github-dark"));
```

```tsx
import {
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
} from "minerva-design";

getSystemTheme(); // "light" | "dark" ("light" during SSR)

const pair = { light: themes.light, dark: themes.dark };
isBilingualTheme(pair); // true
isBilingualTheme("dark"); // false

resolveTheme("auto", "dark") === themes.dark; // true
resolveTheme("github-dark")["background-color"]; // "#0d1117"
resolveTheme(pair, "light") === themes.light; // true
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
