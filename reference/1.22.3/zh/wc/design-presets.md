# 设计预设

只需几个属性即可切换整个应用（或其中一部分）的外观：使用预设（minerva、editorial、compact、touch），或单独设置设计维度：密度、圆角、阴影和字号比例。支持 SSR 与嵌套作用域。

Package: minerva-design@1.22.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 设计维度

属性

设计维度与颜色模式（theme）和调色板相互独立。每个维度通过一个 data 属性选择一组设计令牌；组件读取这些令牌（控件高度、内边距、圆角、阴影、字号），因此整个组件库都会随之变化。预设是四个维度加一个默认调色板的命名组合；显式设置的维度和调色板优先于预设。

minerva：Minerva 默认外观。editorial：克制、以阅读为主（editorial 调色板、宽松密度、小圆角、柔和阴影、大号字体）。compact：信息密集的界面（紧凑密度、小圆角、小号字体）。touch：面向消费者的移动应用（宽松密度、最小 44px 的触控目标、大圆角）。

控件高度与水平内边距（--control-height-*、--control-padding-x-*），以及菜单项、选项、表格单元格等行的内边距（--row-padding-y / --row-padding-x），以及触控目标的最小尺寸（--touch-target-min：compact 为 24px，standard 为 32px，comfortable 为 44px）。

圆角比例：--radius-sm、--radius-md、--radius-lg、--radius-xl 和 --radius-2xl。

层级阴影 --shadow-sm 至 --shadow-xl。standard 保留主题或调色板的阴影。

字号比例：--font-size-* 以及基础 / 宽松行高。large 适合阅读。

### 整个应用

在根 ConfigProvider 上设置这些属性：它会把非标准的维度作为 data 属性写到  上（预设的调色板写为 data-palette），并在卸载时恢复 。useConfig().design 返回解析后的各维度。

### 服务端渲染

根 provider 在水合之后才应用这些属性。若要首屏即呈现正确外观，可使用服务端安全入口 minerva-design/theme-utils 中的 designAttributes() 将属性渲染到服务端 HTML 中，并/或把同样的设计传给 createThemeInitScript({ design })，它还会把预设的调色板作为默认调色板。

### 嵌套作用域

嵌套的 ConfigProvider 继承父级的设计，并只把覆盖应用到其子树：一个 display: contents 包裹元素和该作用域的 portal 容器都带有全部设计属性，因此从子树中渲染的弹窗、气泡卡片和通知也会获得相同外观。嵌套的预设会重置它未设置的所有维度。

### 在自己的 CSS 中使用令牌

设计维度只改变设计令牌，因此你自己的样式可以使用同样的变量，与组件保持一致。针对单个组件的微调可通过各组件的 CSS 变量完成（见每个组件页面的“CSS 变量”部分）。

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // The whole app gets the editorial look: editorial palette, comfortable
  // density, small radius, subtle shadows and a reading-oriented type scale.
  return (
    <ConfigProvider preset="editorial" density="standard">
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
// app/layout.tsx (React Server Component, e.g. Next.js App Router)
import {
  createThemeInitScript,
  designAttributes,
} from "minerva-design/theme-utils";
import { Providers } from "./providers"; // "use client": <ConfigProvider preset="editorial">

const design = { preset: "editorial" } as const;
const themeScript = createThemeInitScript({ design });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-density / data-radius / data-shadow / data-font-scale in the HTML:
    // the first paint already has the right look
    <html lang="en" suppressHydrationWarning {...designAttributes(design)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
<ConfigProvider preset="compact">
  {/* dense admin screens */}
  <ConfigProvider preset="editorial">
    {/* an article preview: editorial look, portals (Modal, Popover...) included */}
  </ConfigProvider>
  <ConfigProvider radius="none">
    {/* inherits compact, only the radius changes */}
  </ConfigProvider>
</ConfigProvider>
```

```css
/* The axes only set design tokens, so your own CSS can use them too */
.panel {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--row-padding-y) var(--row-padding-x);
  font-size: var(--font-size-md);
}

/* ...or react to the active design */
[data-density="compact"] .panel {
  gap: var(--space-1);
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
