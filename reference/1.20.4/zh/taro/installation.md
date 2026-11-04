# 安装

在 React 项目中添加 Minerva、引入样式表，并可选地注册 Web Components。

Package: minerva-design@1.20.4

Renderer: taro

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

### 环境要求

React 组件需要 React 与 React DOM 19（minerva-design 的可选 peer 依赖：Web Components 不需要 React）。不支持 React 18：组件依赖 React 19 的 API（例如把 ref 作为普通属性），并在 StrictMode 与 React DOM 19 服务端渲染下测试。

支持 ES 模块和 CSS 导入的构建工具，例如 Vite、webpack、Rspack 或 Next.js。同时也提供 CommonJS 构建。

现代常青浏览器：主题令牌依赖 CSS 自定义属性和 color-mix()。

### 安装 React 组件

使用你的包管理器安装 minerva-design：一个包同时包含 React 组件、Web Components 和设计令牌。如果项目中还没有 react 和 react-dom，请一并安装。

react 和 react-dom 是可选的 peer 依赖（^19），以确保应用中只有一份 React。运行时依赖只有 @floating-ui/dom（定位）、DOMPurify（HtmlPreview）、jsonc-parser（JsonField）和 Lit（仅 Web Components 入口使用，React 应用不会打包它）：不会安装任何图标、类名或 i18n 库。图标均为内联 SVG。

### 只引入一次全局样式表

所有组件的样式和默认主题令牌都打包在一个全局样式表 minerva-design/style.css 中。请在应用入口处、在你自己的 CSS 之前只引入一次。之后组件文件只引入组件，不再引入任何 CSS。

缺少 minerva-design/style.css 时组件将没有样式。只需在入口引入一次；在组件文件中重复引入不会出错，但没有必要。

#### React + Vite：src/main.tsx

Vite 会打包从 JavaScript 中引入的 CSS：开发时由开发服务器注入样式，vite build 时输出为一个带哈希的 .css 文件并在 index.html 中链接。无需插件或额外配置。

#### Next.js（App Router）：app/layout.tsx

根 layout 是 Server Component，可以引入全局 CSS；之后所有路由都会获得这些样式。

#### Web Components：src/main.ts

自定义元素在各自的 shadow root 中自带样式；tokens.css 提供共享的设计令牌。请在 Vue、Angular、Svelte、Solid 或纯 HTML 应用的入口中各引入一次。如果同一页面也使用 React 组件，style.css 已包含这些令牌。

#### 在组件文件中

组件页面只展示组件的引入语句，它们都依赖上面引入的全局样式表：

可选：按组件引入样式表

只用到少数组件？可以不引入 style.css，而是引入一次设计令牌，再引入所用组件各自的样式表。每个文件包含该组件及其内部渲染的组件的样式（例如 confirm.css 包含 Button 与 Modal 的样式）；文件名为组件目录名的 kebab-case 形式（tag-input.css、time-picker.css……）。JavaScript 同样按组件 tree-shaking：每个模块单独发布，除 CSS 外整个包没有副作用。

同目录下还发布了一个可选的 Sass 文件：minerva-design/prose.scss 包含长文排版 mixin，可在你自己的 Sass 中通过 @use 引入。

### 可选入口与 peer 依赖

基于 Monaco 的代码编辑器作为独立入口 minerva-design/monaco 发布，因此主入口永远不会引入 Monaco。它的 peer 依赖 @monaco-editor/react 和 monaco-editor 是可选的：只有导入该入口时才需要安装。

使用 Next.js 或其他 React Server Components 框架？请参阅 Server Components，了解哪些入口是客户端边界。

### 第一个组件

用 ConfigProvider 包裹应用，然后开始使用组件：

渲染组件并不强制需要 ConfigProvider，但它会应用主题（默认跟随系统配色）、设置 React 版内置文案的语言，并使 useConfig() 可用。请在应用根部使用一个 Provider。

### Web Components（可选）

同一个包还在 minerva-design/web-components 下以与框架无关的自定义元素（基于 Lit）提供完整的组件集，设计、令牌和键盘行为与 React 版本一致，可用于纯 HTML、Vue、Angular、Svelte 或任何技术栈。Web Components 入口仅提供 ESM，且不需要 React；安装 minerva-design 即可：

引入一次包即可注册所有元素，也可以按元素引入各自的入口，只打包实际用到的元素。同样需要引入一次设计令牌：

无需构建步骤时，可从 CDN 加载令牌和自包含的模块包（包含所有元素、Lit 和 Minerva 核心）：

每个元素都已在 HTMLElementTagNameMap 中声明类型。若要在框架模板中进行类型检查，请引用一次为 React 19、Vue（Volar）、Svelte 或 Solid 生成的类型声明：

Web Components：快速上手、事件、类型和各框架指南

### TypeScript

minerva-design 自带类型声明，无需安装 @types 包。Props 类型（ButtonProps、TagProps 等）和主题类型（Theme、ComponentTheme、ThemeName 等）都从包的根入口导出：

### 下一步

了解设计原则以及所有组件遵循的约定。

内置主题、设计令牌与自定义主题。

从第一个组件页面及其在线示例开始。

### 迁移现有应用

仅替换包名不能完成旧版 API 迁移。请核对组件导出与属性：size 使用 small / medium / large，color 替代 colorScheme，loading 替代 isLoading，startIcon 替代 leftIcon。Alert 使用 color；toast.error 和部分旧组件需要另行替换。请逐页迁移，并运行应用的类型检查和交互测试。

```tsx
// src/main.tsx — the only place that imports Minerva's CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "minerva-design/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```tsx
// app/layout.tsx — global CSS belongs in the root layout
import type { ReactNode } from "react";
import "minerva-design/style.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```ts
// src/main.ts — register the elements and load the design tokens, once
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```tsx
// any component file: import the component only, no CSS
import { Tag } from "minerva-design";
```

```tsx
// src/main.tsx — optional, instead of "minerva-design/style.css":
import "minerva-design/styles/tokens.css"; // design tokens, once
import "minerva-design/styles/button.css";
import "minerva-design/styles/input.css";
import "minerva-design/styles/modal.css";
```

```scss
// optional, in your own .scss: long-form typography mixins
@use "minerva-design/prose.scss" as prose;
```

```bash
pnpm add @monaco-editor/react monaco-editor
```

```tsx
import { MonacoCodeEditor } from "minerva-design/monaco";
```

```tsx
import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, ToastProvider, toast } from "minerva-design";
import "minerva-design/style.css";

function App() {
  return (
    // theme: "auto" (default) | "light" | "dark" | "github-dark" | custom
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      {/* renders toast() calls inside the theme scope */}
      <ToastProvider>
        <Button color="primary" onClick={() => toast.success("Hello!")}>
          Say hello
        </Button>
      </ToastProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
```

```bash
# the same package: the Web Components need no React
pnpm add minerva-design
```

```ts
// every element at once...
import "minerva-design/web-components";
// ...or only the elements you use (each entry registers one element and its parts)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"></script>
```

```ts
// React 19 JSX (global.d.ts)
/// <reference types="minerva-design/web-components/react" />
// Svelte: ".../svelte", Solid: ".../solid"
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types
```

```tsx
import { themes } from "minerva-design";
import type { ButtonProps, ComponentTheme } from "minerva-design";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { color: "success", size: "large" };

// themes are typed too: missing or misspelled tokens are compile errors
const brand: ComponentTheme = { ...themes.light, "primary-color": "#7c3aed" };
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
