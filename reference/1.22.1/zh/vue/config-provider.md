# ConfigProvider 全局配置

为应用提供 React 版的主题和语言，并通过 useConfig() 读取它们。

Package: minerva-design@1.22.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design/vue",
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
    "type": "ConfigProviderTheme",
    "required": false,
    "description": "Theme of the subtree (`v-model:theme`). Root default: `\"auto\"`",
    "typeText": "ConfigProviderTheme"
  },
  {
    "name": "palette",
    "type": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
    "required": false,
    "description": "Color palette (light / dark / system themes only); `null` for none",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null"
  },
  {
    "name": "primaryColor",
    "type": "PrimaryColor | null",
    "required": false,
    "description": "Brand color: a CSS color for both modes (the dark-mode value is\nderived for contrast on dark surfaces) or a `{ light, dark }` pair.\nRecomputes every token derived from `primary-color` and wins over the\npalette's primary color; the theme mode stays explicit. Unset: the\nparent provider's; `null`: the theme's own. Invalid colors are ignored\nwith a development warning.",
    "typeText": "PrimaryColor | null"
  },
  {
    "name": "persist",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Root only: persist theme and palette in cookies.",
    "typeText": "boolean"
  },
  {
    "name": "locale",
    "type": "Locale",
    "required": false,
    "description": "Language of the built-in texts",
    "typeText": "Locale"
  },
  {
    "name": "preset",
    "type": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\"",
    "required": false,
    "description": "Design preset (brings its palette unless `palette` is set)",
    "typeText": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\""
  },
  {
    "name": "density",
    "type": "\"compact\" | \"standard\" | \"comfortable\"",
    "required": false,
    "typeText": "\"compact\" | \"standard\" | \"comfortable\""
  },
  {
    "name": "radius",
    "type": "\"medium\" | \"small\" | \"large\" | \"none\"",
    "required": false,
    "typeText": "\"medium\" | \"small\" | \"large\" | \"none\""
  },
  {
    "name": "shadow",
    "type": "\"subtle\" | \"none\" | \"standard\"",
    "required": false,
    "typeText": "\"subtle\" | \"none\" | \"standard\""
  },
  {
    "name": "fontScale",
    "type": "\"small\" | \"large\" | \"standard\"",
    "required": false,
    "typeText": "\"small\" | \"large\" | \"standard\""
  }
]
```

### events

```json
[
  {
    "name": "update:theme",
    "type": "[theme: ConfigProviderTheme]",
    "typeText": "[theme: ConfigProviderTheme]",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "typeText": "ConfigProviderTheme",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:palette",
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
  },
  {
    "name": "themeChange",
    "type": "[theme: ConfigProviderTheme]",
    "typeText": "[theme: ConfigProviderTheme]",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "typeText": "ConfigProviderTheme",
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

### bindings

```json
[
  {
    "prop": "theme",
    "event": "update:theme",
    "syntax": "v-model:theme"
  },
  {
    "prop": "palette",
    "event": "update:palette",
    "syntax": "v-model:palette"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  Button,
  ThemeToggle,
  HStack,
} from "minerva-design/vue";
import type { ConfigProviderTheme } from "minerva-design/vue";
const theme = ref<ConfigProviderTheme>("light");
</script>
<template>
  <ConfigProvider v-model:theme="theme"
    ><HStack :gap="3"
      ><Button>Scoped action</Button><ThemeToggle /><output
        >Theme: {{ theme }}</output
      ></HStack
    ></ConfigProvider
  >
</template>

```

## Example: brand-color

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/brand-color.vue

```vue
<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  ResponsiveGrid,
} from "minerva-design/vue";

const scopes = [
  { title: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    title: "Indigo + dark (#7b85f2)",
    primaryColor: "#4f46e5",
    theme: "dark" as const,
  },
  {
    title: "{ light, dark } pair",
    primaryColor: { light: "#4f46e5", dark: "#a5b4fc" },
  },
  {
    title: 'Teal over palette="editorial"',
    primaryColor: "#0d9488",
    palette: "editorial" as const,
  },
];
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 2 }" :gap="3">
    <ConfigProvider
      v-for="scope in scopes"
      :key="scope.title"
      :primary-color="scope.primaryColor"
      :theme="scope.theme"
      :palette="scope.palette"
      ><Card variant="outline" padding="medium"
        ><CardHeader
          ><CardTitle>{{ scope.title }}</CardTitle></CardHeader
        ><CardContent
          ><HStack :gap="2"
            ><Button>Primary</Button
            ><Button variant="outline">Outline</Button></HStack
          ></CardContent
        ></Card
      ></ConfigProvider
    >
  </ResponsiveGrid>
</template>

```

## Example: locale

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/locale.vue

```vue
<script setup lang="ts">
import { ConfigProvider, Pagination, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ConfigProvider :locale="{ language: 'en' }"
      ><Pagination :total="100" /></ConfigProvider
    ><ConfigProvider :locale="{ language: 'zh' }"
      ><Pagination :total="100" /></ConfigProvider
  ></VStack>
</template>

```

## Example: nested

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/nested.vue

```vue
<script setup lang="ts">
import { ConfigProvider, Button, Box, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ConfigProvider theme="light"
      ><Box :p="4" bg="surface"
        ><Button>Light scope</Button
        ><ConfigProvider theme="dark"
          ><Box :p="4" :mt="3" bg="surface"
            ><Button>Nested dark scope</Button></Box
          ></ConfigProvider
        ></Box
      ></ConfigProvider
    ></VStack
  >
</template>

```

## Example: palette-design

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/palette-design.vue

```vue
<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Input,
  VStack,
  PaletteToggle,
} from "minerva-design/vue";
</script>
<template>
  <ConfigProvider palette="tech" density="compact" radius="small"
    ><VStack :gap="3"
      ><PaletteToggle /><Input
        aria-label="Compact input"
        placeholder="Compact input"
      /><Button>Configured appearance</Button></VStack
    ></ConfigProvider
  >
</template>

```
