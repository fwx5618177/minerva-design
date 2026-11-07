# 主题与调色板

两个相互独立的维度：浅色 / 深色 / 跟随系统的模式，以及配色调色板；支持 Cookie 持久化和无闪烁的服务端渲染。

Package: minerva-design@1.22.3

Renderer: vue

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

### 两个维度：模式与调色板

模式决定浅色还是深色；调色板决定整体风格：颜色、表面、阴影和字体栈。任意调色板都能与任意模式组合，因此四个调色板提供八套完整主题；不设置调色板时则使用 Minerva 的默认外观。

取值

模式：始终为浅色或始终为深色。

模式：跟随 prefers-color-scheme，操作系统设置变化时实时更新。ConfigProvider 也接受 "auto"，它是为兼容而保留的别名。

调色板：暖色纸张背景、墨蓝主色和铁锈色强调色，适合内容为主的页面。

调色板：干净的中性表面搭配明亮的蓝色主色，适合仪表盘和开发者工具。

调色板：单色灰阶加克制的强调色，适合信息密集的专业界面。

调色板：冷调蓝灰表面搭配青蓝主色，沉静而通透。

无调色板：Minerva 的默认外观（内置的浅色和深色主题，以内联变量形式写入）。

### ThemeProvider 与 useTheme

ThemeProvider 是同时获得两个维度的最简方式：它以给定的模式和调色板渲染一个 ConfigProvider，把变更持久化到 Cookie，并通过 useTheme() 暴露全部状态。ThemeToggle 和 PaletteToggle 是绑定到最近 Provider 的现成切换器。

ThemeProvider 是 ConfigProvider 的预设，两者共享同一个数据源。如果还需要 github-dark 等内置主题、自定义主题对象或受控的 theme 属性，请直接使用 ConfigProvider：

useTheme() 返回用户选择的模式、实际应用的模式、调色板以及对应的设置函数。它在 ThemeProvider 和 ConfigProvider 下都可用，在两者之外调用会抛出错误。

### 主题如何生效

Provider 总会把解析后的模式写入  的 data-theme 和 color-scheme。当设置了调色板且主题为 light、dark 或 system 时，还会设置 data-palette，此时令牌来自 style.css 中打包的调色板样式块，内联的主题变量会被移除。没有调色板、或使用 github-dark 及自定义主题对象时，主题令牌仍像以前一样以内联 CSS 变量的形式写到  上。

当多个来源定义了同一个令牌时，优先级最高者生效：

 上的内联 CSS 变量（自定义主题对象、github-dark 或无调色板时）优先于样式表中的任何声明。

调色板样式块（[data-palette][data-theme]）优先于 :root 上的默认值。

没有其他来源匹配时，使用 style.css 中 :root 的默认值，包括由 color-mix() 派生的令牌。

对于 github-dark 和自定义主题对象，palette 属性会被忽略：这些主题自带完整的令牌。

只有最外层的 Provider 会写入  和 Cookie。嵌套的 ThemeProvider 或 ConfigProvider 继承父级的模式和配色，并将自己的 defaultTheme / defaultPalette（或 theme / palette）只作用于其子树以及从中打开的浮层，不会修改 （见下方“局部调色板”）。

### Cookie 持久化

ThemeProvider（以及开启 persist 的 ConfigProvider）会把选择写入两个 Cookie：theme（"light"、"dark" 或 "system"）和 palette（调色板名称；选择默认外观时会被删除）。它们有效期一年，使用 path=/ 和 SameSite=Lax，并且可以在服务端读取，这正是无闪烁 SSR 的基础。水合完成后，Provider 会恢复一次 Cookie 中的值。给 ThemeProvider 传入 disableStorage（或不开启 persist）即可只在内存中保存选择。你自己的服务端代码也可以使用同样的辅助函数：

### 无闪烁的服务端渲染

服务端无法得知访客的系统配色，而 React 只会在水合之后应用主题。两步即可弥补这一差距：在服务端读取 Cookie 并作为默认值传给 Provider；在  中内联 THEME_INIT_SCRIPT。这段很小的阻塞渲染脚本会读取 Cookie（回退到 prefers-color-scheme），并在首次绘制前设置 data-theme、data-palette 和 color-scheme，因此页面永远不会闪现错误的主题。

Next.js App Router

其他任意 SSR 方案

初始化脚本会在 React 水合之前修改  的属性，因此服务端标记与 DOM 的差异是有意为之。请给  和  元素加上 suppressHydrationWarning；它只会屏蔽该元素自身的属性警告，不影响其子元素。服务端所需的一切都从 minerva-design/theme-utils 导入：该入口没有 "use client" 声明，可以在 Server Component 中调用。

### createThemeInitScript

THEME_INIT_SCRIPT 就是使用默认选项调用 createThemeInitScript() 的结果。需要不同的默认值时，可以自行生成：

选项

默认值

theme Cookie 缺失或无效时使用的模式。"system" 会根据 prefers-color-scheme 解析为浅色或深色。

palette Cookie 缺失或无效、且  上还没有有效的 data-palette 时使用的调色板。null 表示不设置 data-palette（Minerva 默认外观）。

脚本的解析顺序：先取 theme Cookie，否则用 defaultTheme；先取 palette Cookie，否则用  上已渲染的有效 data-palette，再否则用 defaultPalette。请保持脚本内联（不要 async 或 defer），并放在样式表之前，确保它在首次绘制前执行。

### 服务端安全的辅助函数

以下内容均来自 minerva-design/theme-utils，这是一个不依赖 React、也没有 "use client" 的小型入口，可以安全地用于 Server Component、中间件和边缘函数。

导出

默认初始化脚本（字符串）：模式取自 Cookie（否则跟随系统），调色板取自 Cookie（否则取  上已有的 data-palette，再否则不设置）。请内联到  中。

使用其他默认值生成初始化脚本（见上方选项）。

从 Cookie 请求头中解析两个 Cookie，返回 { theme, palette }，可为缺失值提供默认值。

校验原始的 theme Cookie 值；无效或缺失时返回回退值（"system"）。

校验原始的 palette Cookie 值；无效或缺失时返回回退值（null）。

从 Cookie 请求头或 document.cookie 中读取并 URI 解码单个 Cookie；不存在时返回 undefined。

为主题或调色板值返回 Set-Cookie 格式的字符串（path=/、一年、SameSite=Lax）。

ThemeMode 与 Palette 值的类型守卫。

内置调色板名称，依次为：editorial、tech、graphite、cool。

Cookie 名称（"theme"、"palette"）及其有效期（秒，一年）。

### 局部调色板

style.css 中的配色块是属性选择器，因此可以匹配任意元素，而不仅是 。让某个子树使用不同配色或模式的最简单方式是嵌套 Provider： 或  会将其作用于子元素及其浮层。不使用 Provider 时，也可以自己在包裹元素上设置 data-palette 和 data-theme：请同时设置两个属性，并为包裹元素设置背景，因为变量虽然改变了，但只有元素使用它们时才会显示出来。

### 新增令牌

调色板引入了一些语义颜色令牌和一组尺度令牌。每个令牌在 style.css 中都有默认值，因此无论是否使用调色板、是否使用自定义主题都能正常工作。

语义颜色令牌

变量

非常柔和的背景，用于侧边栏、表头和代码块。

位于各表面之后的应用背景，例如应用外壳的画布。默认等于柔和表面色。

输入框、选择器等表单控件的背景。默认等于柔和表面色。

悬停行和条目的背景。默认等于弱化表面色。

选中行、条目和标签页的背景：主色的浅色调。

低强调文本，用于说明和辅助文字，介于次要文本与禁用文本之间。

次级强调色，用于行动号召、评分和高亮。默认等于主色；各调色板会设置自己的值。

accent 也是一个完整的颜色角色，与 primary、success 相同：--accent-color-hover、-active、-subtle、-border 和 -text 会自动派生。

尺度令牌

尺度令牌不随模式变化（调色板只可能替换字体栈）。组件通过 CSS 变量使用它们，数值型的 gap 或 padding 属性会解析为 var(--space-)。

分组

变量

间距

基于 4px 的 rem 尺度。小数步长用短横线表示：--space-0-5 即 0.125rem。

圆角

在 --radius-sm、-md、-lg 之外新增的圆角，后三者仍是主题令牌。

字号

从 0.75rem（xs）到 3.75rem（6xl）；md（0.875rem）是组件的正文字号。

字重与行高

400 到 700 的字重，以及三档行高。

字体族

正文、标题和等宽字体栈。调色板会覆盖它们。

层级

下拉菜单、吸顶元素、遮罩、模态框、弹出层和消息提示使用的 z-index 层级。

动效

过渡时长和缓动曲线。

节奏与高度

区块和段落之间的流式垂直间距，以及阴影令牌的高度别名。

焦点

焦点环的宽度和偏移。

```tsx
import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    // mode: "light" | "dark" | "system" (default)
    // palette: "editorial" | "tech" | "graphite" | "cool" | null (default look)
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <header>
        <ThemeToggle />
        <PaletteToggle showDefault />
      </header>
      <App />
    </ThemeProvider>
  );
}
```

```tsx
import { ConfigProvider, ToastProvider, toast } from "minerva-design";

// The same thing with ConfigProvider (ThemeProvider is a preset over it):
// "system" is an alias of "auto"; persist turns on the cookies.
<ConfigProvider
  theme="system"
  palette="editorial"
  persist
  onThemeChange={(theme) => toast.info(`Theme: ${theme}`)}
  onPaletteChange={(palette) => toast.info(`Palette: ${palette}`)}
>
  <ToastProvider>
    <App />
  </ToastProvider>
</ConfigProvider>;
```

```tsx
import { Button, useTheme } from "minerva-design";

function Settings() {
  const { theme, resolvedTheme, palette, setTheme, setPalette } = useTheme();
  return (
    <>
      <p>{theme} → {resolvedTheme} · {palette ?? "default"}</p>
      <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        Toggle mode
      </Button>
      <Button onClick={() => setPalette("tech")}>Tech palette</Button>
    </>
  );
}
```

```html
<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">
```

```tsx
import {
  THEME_COOKIE_NAME,     // "theme"   -> "light" | "dark" | "system"
  PALETTE_COOKIE_NAME,   // "palette" -> "editorial" | "tech" | "graphite" | "cool"
  readCookieValue,
  parseThemeCookie,
  parsePaletteCookie,
  serializeThemeCookie,
} from "minerva-design/theme-utils";

// Read on the server (or from document.cookie)
const theme = parseThemeCookie(readCookieValue(cookieHeader, THEME_COOKIE_NAME));
const palette = parsePaletteCookie(readCookieValue(cookieHeader, PALETTE_COOKIE_NAME));

// Write from a route handler / server action (path=/, one year, SameSite=Lax)
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));
```

```tsx
// app/layout.tsx: a Server Component (no "use client")
import { headers } from "next/headers";
import { ThemeProvider } from "minerva-design";
import {
  THEME_INIT_SCRIPT,
  parseThemeCookies,
} from "minerva-design/theme-utils";
import "minerva-design/style.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, palette } = parseThemeCookies((await headers()).get("cookie"), {
    palette: "editorial",
  });

  return (
    // the init script changes <html> attributes before React hydrates
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={theme === "system" ? undefined : theme}
      data-palette={palette ?? undefined}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "minerva-design";
import { THEME_INIT_SCRIPT, parseThemeCookies } from "minerva-design/theme-utils";

app.get("*", (req, res) => {
  const { theme, palette } = parseThemeCookies(req.headers.cookie);
  const body = renderToString(
    <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
      <App url={req.url} />
    </ThemeProvider>,
  );
  res.send(`<!doctype html>
<html${palette ? ` data-palette="${palette}"` : ""}>
  <head>
    <script>${THEME_INIT_SCRIPT}</script>
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body><div id="root">${body}</div></body>
</html>`);
});
```

```tsx
import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});
```

```tsx
// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>
```

## PaletteToggle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PaletteToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "palettes",
    "type": "(\"editorial\" | \"tech\" | \"graphite\" | \"cool\")[]",
    "default": "[...PALETTES]",
    "required": false,
    "description": "Palettes offered, in order",
    "typeText": "(\"editorial\" | \"tech\" | \"graphite\" | \"cool\")[]"
  },
  {
    "name": "showDefault",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also offer Minerva's default look (no palette) as the first option",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<Record<\"default\" | \"editorial\" | \"tech\" | \"graphite\" | \"cool\", string>>",
    "required": false,
    "description": "Override the button labels (`default` labels the no-palette option)",
    "typeText": "Partial<Record<\"default\" | \"editorial\" | \"tech\" | \"graphite\" | \"cool\", string>>"
  }
]
```

## PresetToggle

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## ThemeProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ThemeProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "defaultTheme",
    "type": "ThemeMode",
    "required": false,
    "description": "Initial mode (root default: \"system\")",
    "typeText": "ThemeMode"
  },
  {
    "name": "defaultPalette",
    "type": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
    "required": false,
    "description": "Initial palette",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null"
  },
  {
    "name": "primaryColor",
    "type": "PrimaryColor | null",
    "required": false,
    "description": "Brand color (a CSS color, or a `{ light, dark }` pair): see\n`ConfigProvider` `primaryColor`",
    "typeText": "PrimaryColor | null"
  },
  {
    "name": "disableStorage",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Do not persist the choice in cookies.",
    "typeText": "boolean"
  },
  {
    "name": "locale",
    "type": "Locale",
    "required": false,
    "description": "Language of the built-in texts",
    "typeText": "Locale"
  }
]
```

### events

```json
[
  {
    "name": "themeChange",
    "type": "[theme: ThemeMode]",
    "typeText": "[theme: ThemeMode]",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "typeText": "ThemeMode",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "paletteChange",
    "type": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "typeText": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "parameters": [
      {
        "name": "palette",
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
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## ThemeToggle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ThemeToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "showSystem",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Show the \"system\" (follow the OS) option",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<Record<ThemeMode, string>>",
    "required": false,
    "description": "Override the button labels (defaults come from the library's locale)",
    "typeText": "Partial<Record<ThemeMode, string>>"
  }
]
```

## CSS variables

```json
{
  "css:ThemeToggle": {
    "kind": "cssVars",
    "source": "react/src/components/ThemeToggle",
    "vars": [
      {
        "name": "--theme-toggle-gap",
        "description": "Space between the options"
      },
      {
        "name": "--theme-toggle-padding",
        "description": "Inner padding of the group"
      },
      {
        "name": "--theme-toggle-radius",
        "description": "Corner radius of the group (defaults to --radius-lg; options use --radius-md)"
      },
      {
        "name": "--theme-toggle-background",
        "description": "Background of the group"
      },
      {
        "name": "--theme-toggle-item-height",
        "description": "Minimum height of an option (follows the density's control height)"
      },
      {
        "name": "--theme-toggle-item-min-width",
        "description": "Minimum width of an option"
      },
      {
        "name": "--theme-toggle-active-background",
        "description": "Background of the selected option"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  ThemeToggle,
  Button,
  HStack,
} from "minerva-design/vue";
import type { ConfigProviderTheme } from "minerva-design/vue";
const theme = ref<ConfigProviderTheme>("light");
</script>
<template>
  <ConfigProvider v-model:theme="theme"
    ><HStack :gap="3"
      ><ThemeToggle /><Button>Theme-aware action</Button
      ><output>{{ theme }}</output></HStack
    ></ConfigProvider
  >
</template>

```

## Example: events

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/vue/events.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ConfigProvider, ThemeToggle, VStack } from "minerva-design/vue";
const result = ref("none");
</script>
<template>
  <ConfigProvider @theme-change="(theme) => (result = String(theme))"
    ><VStack :gap="3"
      ><ThemeToggle /><output>Last theme change: {{ result }}</output></VStack
    ></ConfigProvider
  >
</template>

```

## Example: palette

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/vue/palette.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  PaletteToggle,
  Button,
  HStack,
} from "minerva-design/vue";
const palette = ref<"editorial" | "tech" | "graphite" | "cool" | null>("tech");
</script>
<template>
  <ConfigProvider v-model:palette="palette"
    ><HStack :gap="3"
      ><PaletteToggle /><Button>Palette preview</Button
      ><output>{{ palette || "default" }}</output></HStack
    ></ConfigProvider
  >
</template>

```

## Example: toggles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/vue/toggles.vue

```vue
<script setup lang="ts">
import { defineComponent, h } from "vue";
import {
  Button,
  HStack,
  PaletteToggle,
  Switch,
  Tag,
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "minerva-design/vue";
const Preview = defineComponent({
  setup() {
    const theme = useTheme();
    return () =>
      h(
        "div",
        {
          style: {
            display: "grid",
            gap: "16px",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            background: "var(--background-color)",
            color: "var(--text-color)",
          },
        },
        [
          h(HStack, { gap: 4, wrap: true }, () => [
            h(ThemeToggle),
            h(PaletteToggle),
          ]),
          h(HStack, { gap: 4, wrap: true }, () => [
            h(Button, { color: "primary" }, () => "Primary"),
            h(
              Button,
              { color: "neutral", variant: "outline" },
              () => "Secondary",
            ),
            h(Tag, { color: "primary" }, () => theme.palette ?? "default"),
            h(Tag, { color: "info" }, () => theme.resolvedTheme),
            h(Switch, { label: "Switch", defaultChecked: true }),
          ]),
          h(
            "p",
            `Theme: ${theme.resolvedTheme}; palette: ${theme.palette ?? "default"}`,
          ),
        ],
      );
  },
});
</script>
<template>
  <ThemeProvider default-theme="system" default-palette="editorial"
    ><Preview
  /></ThemeProvider>
</template>

```
