# Server Components

在 React Server Components 中使用 Minerva：哪些入口是客户端边界、哪些内容可以在服务端运行，以及在哪里导入 CSS。

Package: minerva-design@1.21.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 入口与 "use client" 声明

minerva-design 以多个入口发布。包含组件的入口以 "use client" 指令开头；主题辅助函数的入口则没有，因此可以在 Server Component 中运行。

入口

"use client"

是

否

全部组件、Provider、Hooks 和工具函数。

基于 Monaco 的代码编辑器（可选 peer 依赖：@monaco-editor/react 和 monaco-editor）。

GPU 图表（WebGPU、WebGL2、WebGL、Canvas2D）：Chart、LineChart、BarChart、TradingChart、Scatter3DChart 等 40 多种图表组件。

不依赖框架的图表引擎：createChart 和 formatCompact。可在服务端安全导入，图表在浏览器中创建。

图标库：Icon、IconCanvas、DynamicIcon、createIcon，以及每个图标一个组件（SearchIcon…）。SVG 图标可在客户端组件中于服务端渲染。

不依赖框架的图标库：图标数据、toSvg、drawIcon 与 GPU 图标画布。可在服务端安全导入（toSvg 可在服务端运行）；画布在浏览器中创建。

服务端安全的主题辅助函数：THEME_INIT_SCRIPT、Cookie 解析与序列化、调色板名称。

服务端安全的工具函数：cn、themes、light、dark、githubDark、palettes、resolveTheme、generateCSSVariables、applyThemeStyles、getSystemTheme、isBilingualTheme、matchesShortcut、normalizeShortcuts、computeFixedColumnLayout。

### 为什么有些入口是客户端边界

Minerva 的每个组件都会用到 state、effect、context 或 portal，因此必须在浏览器中运行。由于主入口带有 "use client" 标记，导入它的 Server Component 拿到的不是组件代码，而是客户端引用：打包工具会把这些占位符解析到客户端包中。在 SSR 期间，这些组件仍会在服务端渲染为 HTML，并在浏览器中完成水合。

客户端引用在服务端不是可调用的函数。对于只需渲染的组件这没有问题，但这意味着客户端入口中的普通函数无法在 Server Component 中执行。因此，服务端需要的函数（例如解析主题 Cookie 或生成初始化脚本）放在一个没有该声明的独立入口中：minerva-design/theme-utils。

### 在 Server Component 中渲染组件

可以直接在 Server Component、layout 或 page 中从 minerva-design 导入组件：无需额外包装，因为该入口本身就是客户端边界。

从 Server Component 传给客户端组件的 props 必须可序列化：字符串、数字、布尔值、普通对象、数组和 JSX。函数不可序列化，因此 onClick 等事件处理函数、render props 和回调需要你自己写一个小的客户端组件：

### 在服务端调用函数

minerva-design/theme-utils 与 minerva-design/utils 中的辅助函数可以在服务端随意调用：layout、路由处理器、中间件或边缘函数中均可。不要在 Server Component 中调用主入口的函数（toast.success、Confirm、各种 Hooks……），也不要在那里读取主入口导出的数据（themes、palettes……）：它们只是客户端引用。请改从 minerva-design/utils 导入这些普通函数和数据。

命令式 API 在客户端组件的 SSR 过程中同样安全：没有 document 时它们什么也不做，而 Confirm 这类基于 Promise 的对话框在服务端会 resolve 为 false。请在只会在浏览器中运行的事件处理函数或 effect 中触发它们。

### 内容安全策略（CSP）

严格的 Content-Security-Policy（不含 'unsafe-inline'）会拦截内联的主题初始化脚本。可以在  元素上输出本次请求的 nonce，或按哈希放行该脚本：THEME_INIT_SCRIPT_HASH 是 THEME_INIT_SCRIPT 的 'sha256-…' 源表达式，cspHash() 可为 createThemeInitScript() 生成的脚本计算哈希。

### 在哪里导入 CSS

minerva-design/style.css 只需导入一次。在 Next.js App Router 中，全局 CSS 应放在根 layout 中，它是 Server Component，可以导入 CSS。在其他方案中，请在客户端入口文件中导入。prose.scss 是可选的附加样式，在你自己的 Sass 中以同样方式引入。

### 下一步

无主题闪烁的服务端渲染：THEME_INIT_SCRIPT 与主题 Cookie。

包、peer 依赖和样式表。

```tsx
// dist/index.js and dist/monaco.js start with
"use client";

// dist/theme-utils.js and dist/utils-entry.js do not: they hold plain
// functions and data, safe to run on the server
```

```tsx
// app/page.tsx: a Server Component (no "use client")
import { Card, Tag } from "minerva-design";
import { SaveButton } from "./save-button";

export default async function Page() {
  const posts = await getPosts(); // server-only data access

  return posts.map((post) => (
    // serializable props only: strings, numbers, booleans, JSX children...
    <Card key={post.id} padding="medium">
      <Tag color="info">{post.category}</Tag>
      <h2>{post.title}</h2>
      <SaveButton id={post.id} />
    </Card>
  ));
}
```

```tsx
// app/save-button.tsx
"use client";

import { Button, toast } from "minerva-design";

// Event handlers and imperative APIs live in a client component
export function SaveButton({ id }: { id: string }) {
  return (
    <Button
      color="primary"
      onClick={async () => {
        await fetch(`/api/save/${id}`, { method: "POST" });
        toast.success("Saved"); // shown by the ToastProvider in your layout
      }}
    >
      Save
    </Button>
  );
}
```

```tsx
// app/layout.tsx: a Server Component
import { cookies } from "next/headers";
import {
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  parseThemeCookie,
} from "minerva-design/theme-utils"; // server-safe: runs here
import { ThemeProvider } from "minerva-design"; // rendered, not called

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = parseThemeCookie((await cookies()).get(THEME_COOKIE_NAME)?.value);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// Plain functions and data (cn, themes, palettes, resolveTheme...):
// import them from the server-safe utils entry, not from the main entry
import { cn, themes } from "minerva-design/utils";

// Not on the server: main-entry functions are client references there
// import { toast } from "minerva-design";
// toast.success("Hi"); // call it from a client component instead
```

```tsx
// Strict CSP, option 1: a per-request nonce on the inline script
<script
  nonce={nonce}
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
/>
// Content-Security-Policy: script-src 'self' 'nonce-<nonce>'

// Option 2: allow the script by its hash (static HTML, CDN caching)
import {
  THEME_INIT_SCRIPT_HASH,
  createThemeInitScript,
  cspHash,
} from "minerva-design/theme-utils";

const csp = `script-src 'self' ${THEME_INIT_SCRIPT_HASH}`;
// a customised script has its own hash:
const script = createThemeInitScript({ defaultTheme: "dark" });
const customCsp = `script-src 'self' ${cspHash(script)}`;
```

```tsx
// Next.js App Router: import global CSS once, in the root layout
// app/layout.tsx
import "minerva-design/style.css";

// Vite / other setups: import it in the client entry file (main.tsx)
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
