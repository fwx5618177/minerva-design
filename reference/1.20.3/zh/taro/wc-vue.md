# Vue（Web Components）

在 Vue 3 和 Nuxt 中使用 Minerva 自定义元素：编译器配置、property 与事件绑定、受控模式以及 Volar 类型声明。

Package: minerva-design@1.20.3

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 配置

Vue 开箱即支持自定义元素。告诉它的模板编译器 minerva-* 标签是自定义元素，这样它就不会尝试把它们解析为 Vue 组件（也不会因此发出警告）：

然后在入口文件中注册元素并引入一次设计令牌：

### 绑定 property 与事件

与原生元素一样，用 :prop 绑定，用 @minerva-* 监听。类似 v-model 的双向绑定就是一个 :value（或 :checked）绑定加上对应的事件：

当元素上存在同名 property 时，Vue 会把绑定值设置为 DOM property，否则设置为 attribute。请在挂载应用之前注册元素，确保 Vue 渲染它们时已经定义，这样数组、对象和函数（options、items、渲染回调）才能原样传递给元素。

布尔值就是普通的布尔值（:disabled="busy"）；静态布尔属性不写值（clearable、required）。添加 .attr 修饰符可强制设置为 attribute，添加 .prop 可强制设置为 property。

事件名为 kebab-case，按原样使用：@minerva-change、@minerva-open-change。$event 是 CustomEvent；从 $event.detail 读取新状态。原生事件（@click、@focus、@input、@change）同样可用。

v-model 是为原生输入框和 Vue 组件设计的，因此请使用显式的组合：文本字段使用 :value + @minerva-input（每次按键）或 @minerva-change（已提交的值），复选框和开关使用 :checked + @minerva-change。

### 受控的打开状态

用户操作时，元素会先更新自身状态，再触发事件。用于告知用户所请求变化的事件（minerva-open-change、标签页选中）可以取消：调用 preventDefault() 保持当前状态，否则更新你的 ref：

### 类型声明（Volar）

该包附带了由其 Custom Elements Manifest 生成的 Vue GlobalComponents 类型声明：Vue - Official（Volar）和 vue-tsc 会在模板中对每个  标签的 attribute、property 和事件进行类型检查与补全。请把它们添加到 tsconfig 的 types 中：

### Nuxt

在 nuxt.config 中配置编译器，并在仅客户端运行的插件中注册元素。这些标签会在服务端渲染为带有 attribute 的普通 HTML，并在插件运行后由浏览器升级（在服务端引入该包同样安全：模块加载时不会访问 DOM）。

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // <minerva-*> tags are custom elements, not Vue components
          isCustomElement: (tag) => tag.startsWith("minerva-"),
        },
      },
    }),
  ],
});
```

```ts
// main.ts
import { createApp } from "vue";
import "minerva-design/web-components"; // or per element: ".../select", ".../switch"
import "minerva-design/tokens.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

```html
<script setup lang="ts">
import { ref } from "vue";

const name = ref("Ada");
const plan = ref("pro");
const notify = ref(true);
const saving = ref(false);
const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];
</script>

<template>
  <!-- :value is set as a property; the event carries the new value -->
  <minerva-input
    aria-label="Name"
    :value="name"
    @minerva-input="name = $event.detail.value"
  />

  <!-- arrays and objects are properties too -->
  <minerva-select
    aria-label="Plan"
    :options="plans"
    :value="plan"
    @minerva-change="plan = $event.detail.value"
  />

  <minerva-switch
    label="Email notifications"
    :checked="notify"
    @minerva-change="notify = $event.detail.checked"
  />

  <!-- booleans: a plain boolean, set as a property -->
  <minerva-button :loading="saving" :disabled="!name" @click="saving = true">
    Save
  </minerva-button>
</template>
```

```html
<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
const dirty = ref(true);

// the user asked to close: keep the modal open while there are changes
function onOpenChange(event: CustomEvent<{ open: boolean }>) {
  if (!event.detail.open && dirty.value) event.preventDefault();
  else open.value = event.detail.open;
}
</script>

<template>
  <minerva-modal label="Edit profile" :open="open" @minerva-open-change="onOpenChange">
    ...
  </minerva-modal>
</template>
```

```json
// tsconfig.json (or tsconfig.app.json)
{
  "compilerOptions": {
    "types": ["minerva-design/web-components/vue"]
  }
}
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/tokens.css"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("minerva-"),
    },
  },
});

// plugins/minerva.client.ts: the .client suffix runs it in the browser only
import "minerva-design/web-components";

export default defineNuxtPlugin(() => {});
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
