# Vue

minerva-design/vue 的原生 Vue 3 组件：安装、全局样式表、按需导入或插件、v-model 与事件、通过嵌套 ConfigProvider 作用域定制主题、Nuxt / SSR 以及 Volar 类型。

Package: minerva-design@1.20.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 安装

与 Vue 3.5 或更高版本一起安装本包（vue 为可选的对等依赖）。minerva-design/vue 提供 ES 模块和类型声明；组件是基于与 React 相同的无头核心构建的 Vue 单文件组件。

在入口文件中导入一次全局样式表。它与 React 使用的是同一个文件：Vue 组件渲染相同的类名和样式钩子，因此设计令牌、主题、调色板和 CSS 变量均可直接生效。

### 使用组件

按名称导入组件；打包工具只会保留你用到的组件（所有导出都没有副作用）。

值通过 v-model（modelValue / update:modelValue）绑定，非受控用法使用 defaultValue / defaultChecked；浮层使用 v-model:open（defaultOpen），其他受控属性使用 v-model:名称（v-model:current、v-model:expanded）。

事件是有类型的 emit，名称为去掉 "on" 的 React 回调名：onChange → @change，onOpenChange → @open-change，参数相同。

富内容通过插槽传入（#trigger、#title、#start-icon 等）；简单文本仍是属性（title、description、label）。

### 全局注册

推荐使用具名导入。如果希望在所有模板中无需导入即可使用组件，可安装插件：组件将注册为 、 等（前缀可配置）。

全局组件的类型由 minerva-design/vue/global 提供，支持 Vue - Official（Volar）和 vue-tsc：

#### 图表

MinervaVue 不会注册图表组件，因此不使用图表的应用永远不会加载图表引擎。推荐从 minerva-design/vue/charts 按名称导入图表（minerva-design/vue 目前也仍然导出它们），或安装 minerva-design/vue/charts 中按需启用的 MinervaVueCharts 插件：它以相同的 prefix 选项注册 、、 等组件，类型由 minerva-design/vue/charts-global 提供。

##### 从 1.4 升级

从 1.5 起，app.use(MinervaVue) 不再注册 、 及其他图表组件。如果你的模板在未导入的情况下使用了它们，请添加来自 minerva-design/vue/charts 的 app.use(MinervaVueCharts)（如果修改过前缀，请使用与 MinervaVue 相同的 prefix），并将 minerva-design/vue/charts-global 加入 tsconfig.json 的 types。具名导入保持不变。

##### 图表与 Vite 开发服务器

生产构建会对图表进行 tree-shaking：从不导入图表的应用不会包含任何图表代码，无论是否使用 app.use(MinervaVue)。但在开发环境中，Vite 会把 minerva-design/vue 的全部导出预构建为单个文件，因此即使没有使用任何图表，图表封装组件和图表引擎（未压缩约 0.7 MB）也会包含在其中。预构建结果缓存在 node_modules/.vite 中，所以只会在整页加载时增加解析时间。如果应用使用了图表，请从 minerva-design/vue/charts 导入，并在 optimizeDeps.include 中同时列出两个入口，让 Vite 在启动时一起预构建，而不是在首次导入图表时重新优化依赖并刷新页面：

在 optimizeDeps 中排除 minerva-design/charts/core 没有效果：Vue 组件是通过包内的相对路径引用引擎的。排除 minerva-design/vue 也没有帮助：浏览器会改为加载数百个未打包的模块，其中仍包括图表。

在下一个主版本之前，minerva-design/vue 会继续导出图表组件，因为移除它们会破坏现有的具名导入。在 2.0 中，它们将只由 minerva-design/vue/charts 导出，届时也会从开发预构建中移除。现在就从 minerva-design/vue/charts 导入图表，升级时无需任何改动。

### 主题与国际化

ConfigProvider 设置主题、调色板、设计维度以及内置文本的语言。根 Provider 掌管 ；嵌套 Provider 会把覆盖范围限定在其子树内，包括浮层（浮层会被传送到对应的作用域容器中）。

组合式函数读取最近的 Provider：

### Nuxt 与服务端渲染

组件可通过 vue/server-renderer 在服务端渲染，并且水合时不会出现不匹配：浮层（模态框、弹出层、消息提示）在客户端挂载，id 来自 Vue 的 useId()，setup 期间不会访问 DOM。在 Nuxt 中，把样式表加入 css，并可选地添加一个插件来注册全局组件（全局图表则再加上 MinervaVueCharts）。

### Vue 岛

要在主题由其他框架掌管的页面中挂载 Vue 应用（微前端、React 页面中的 Vue 小部件）？在挂载前调用 provideEmbeddedScope：其中的 Provider 将作为嵌套 Provider 工作，绝不会修改 。本文档的每个 Vue 示例都使用了它。

```bash
pnpm add minerva-design vue
# or: npm install minerva-design vue
```

```ts
// src/main.ts
import { createApp } from "vue";
import "minerva-design/style.css"; // once: the same stylesheet as React
import App from "./App.vue";

createApp(App).mount("#app");
```

```html
<script setup lang="ts">
import { ref } from "vue";
// named imports: only what you use ends up in the bundle
import { Button, Input, Modal, Switch } from "minerva-design/vue";

const name = ref("");
const notify = ref(true);
const open = ref(false);
</script>

<template>
  <Input v-model="name" placeholder="Name" />
  <Switch v-model="notify" label="Email notifications" />
  <Button :disabled="!name" @click="open = true">Save</Button>

  <Modal v-model:open="open" title="Saved" description="Your profile is up to date.">
    <Button @click="open = false">Close</Button>
  </Modal>
</template>
```

```ts
// src/main.ts: register every component globally (<MnButton>, <MnModal>...)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App).use(MinervaVue).mount("#app");
// another prefix: app.use(MinervaVue, { prefix: "Ui" }) -> <UiButton>
```

```json
// tsconfig.json: Volar typings of the global <Mn*> components
{
  "compilerOptions": {
    "types": ["minerva-design/vue/global"]
  }
}
```

```ts
// src/main.ts: the global chart components are opt-in (they load the chart engine)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import { MinervaVueCharts } from "minerva-design/vue/charts";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App)
  .use(MinervaVue) // <MnButton>, <MnModal>...
  .use(MinervaVueCharts) // <MnLineChart>, <MnPieChart>... (same prefix option)
  .mount("#app");

// tsconfig.json: "types": ["minerva-design/vue/global", "minerva-design/vue/charts-global"]
// without a plugin: import { LineChart } from "minerva-design/vue/charts";
```

```ts
// vite.config.ts: pre-bundle both entries together at startup
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["minerva-design/vue", "minerva-design/vue/charts"],
  },
});

// components: charts from their own entry (the only one from 2.0)
import { Button } from "minerva-design/vue";
import { LineChart, PieChart } from "minerva-design/vue/charts";
```

```html
<script setup lang="ts">
import { ConfigProvider, ThemeToggle, useTheme } from "minerva-design/vue";
</script>

<template>
  <!-- root provider: owns <html> (theme, palette, design) and the language -->
  <ConfigProvider theme="system" palette="ocean" :locale="{ language: 'fr' }" persist>
    <ThemeToggle />
    <RouterView />

    <!-- nested provider: scoped to its subtree (and its overlays) -->
    <ConfigProvider theme="dark" density="compact">
      <AdminPanel />
    </ConfigProvider>
  </ConfigProvider>
</template>
```

```ts
import { useConfirm, useI18n, useTheme, useToast } from "minerva-design/vue";

const theme = useTheme(); // theme.theme, theme.resolvedTheme, theme.setTheme("dark")
const { t } = useI18n(); // t(closeKey) in the provider's language
const toast = useToast(); // toast.success("Saved")
const confirm = useConfirm(); // await confirm({ title: "Delete?" }) -> boolean
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/style.css"],
  build: { transpile: [] }, // nothing to transpile: the package ships ESM
});

// plugins/minerva.ts (optional: global <Mn*> components, SSR-safe)
import MinervaVue from "minerva-design/vue";
import { MinervaVueCharts } from "minerva-design/vue/charts";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MinervaVue);
  nuxtApp.vueApp.use(MinervaVueCharts); // only if templates use <Mn*Chart>
});
```

```ts
// a Vue island inside a page whose theme is owned by another framework
import { createApp } from "vue";
import { provideEmbeddedScope } from "minerva-design/vue";

const app = createApp(Island);
provideEmbeddedScope(app, { language: "ja" }); // providers never touch <html>
app.mount("#island");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
