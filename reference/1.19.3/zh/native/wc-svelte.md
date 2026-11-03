# Svelte

在 Svelte 5 和 SvelteKit 中使用 Minerva 自定义元素：property 与 attribute、onminerva-* 事件属性、bind:this、类型声明以及服务端渲染。

Package: minerva-design@1.19.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 配置

Svelte 使用自定义元素无需任何配置。在入口文件中（使用 SvelteKit 时在根布局中，见下文）注册元素并引入一次设计令牌：

### Property、事件与 bind:this

像原生元素一样在标记中书写标签：

当元素上存在同名 property 时（value、checked、disabled、options……），Svelte 会把 prop 设置为 DOM property，否则设置为 attribute。因此数组、对象和函数都能原样传递给元素；请在组件渲染之前注册元素。

Svelte 5 的事件属性区分大小写，并按原样使用事件名：onminerva-change、onminerva-input、onminerva-open-change。处理函数接收 CustomEvent，新状态位于 event.detail 中。onclick 和其他原生事件照常工作。

bind:this 可以拿到元素实例，用于调用其方法（show()、hide()、focus()）或读取其 property。它的类型就是导出的元素类。

bind:value 和 bind:checked 是为原生输入框设计的：请写入 value prop，并像上面那样通过事件更新状态（minerva-input 对应每次按键，minerva-change 对应已提交的值）。

### 类型声明

该包附带了由其 Custom Elements Manifest 生成的 svelte/elements 类型声明：每个标签的 attribute、property 和 onminerva-* 事件都会由 svelte-check 检查，并由 Svelte 扩展提供补全。引用一次即可：

### SvelteKit 与服务端渲染

页面会先在服务端渲染。在服务端引入这些元素是安全的（模块加载时不会访问 DOM），但它们只能在浏览器中工作，因此请在 onMount（永远不会在服务端运行）中或在 browser 标志判断之后注册它们。服务端发送带有 attribute 和插槽内容的标签；浏览器在导入完成后升级它们。

```ts
// src/main.ts (Svelte + Vite)
import { mount } from "svelte";
import "minerva-design/web-components";
import "minerva-design/tokens.css";
import App from "./App.svelte";

mount(App, { target: document.getElementById("app")! });
```

```html
<script lang="ts">
  import type { MinervaModal } from "minerva-design/web-components";

  let name = $state("Ada");
  let notify = $state(true);
  let modal: MinervaModal | undefined = $state();
  const plans = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>

<!-- props that exist on the element are set as properties -->
<minerva-input
  aria-label="Name"
  value={name}
  onminerva-input={(e: CustomEvent<{ value: string }>) => (name = e.detail.value)}
></minerva-input>

<minerva-select aria-label="Plan" options={plans} value="pro"></minerva-select>

<minerva-switch
  label="Email notifications"
  checked={notify}
  onminerva-change={(e: CustomEvent<{ checked: boolean }>) => (notify = e.detail.checked)}
></minerva-switch>

<minerva-button disabled={!name} onclick={() => modal?.show()}>Preview</minerva-button>

<!-- bind:this gives the element instance: properties and methods -->
<minerva-modal bind:this={modal} label="Preview">
  <p>{name} · {notify ? "emails on" : "emails off"}</p>
</minerva-modal>
```

```ts
// src/app.d.ts (SvelteKit) or src/vite-env.d.ts
/// <reference types="minerva-design/web-components/svelte" />
```

```html
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import "minerva-design/tokens.css";

  let { children } = $props();

  // onMount only runs in the browser
  onMount(async () => {
    await import("minerva-design/web-components");
  });
</script>

{@render children()}
```

```ts
// or anywhere, guarded by $app/environment
import { browser } from "$app/environment";

if (browser) await import("minerva-design/web-components/select");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
