# Web Components

以标准自定义元素形式提供完整的 Minerva 组件集，可用于纯 HTML、Vue、Angular、Svelte、Solid、React 或任何其他框架。

Package: minerva-design@1.20.6

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### 它是什么

minerva-design/web-components 基于 Lit，把每个 Minerva 组件实现为标准的自定义元素（、、……）。注册之后，这些元素就像内置的 HTML 标签一样：可用于静态页面、服务端渲染的模板，以及任何渲染 HTML 的框架。

它们并不是 React 组件的包装：它们渲染相同的 DOM 结构，并把相同的样式表编译进自己的 shadow root，因此外观完全一致、读取相同的设计令牌，并暴露相同的 ---* CSS 变量。键盘与焦点行为（焦点范围、可关闭浮层栈、漫游焦点、输入即查找、定位）来自同一套 minerva-design/core 基础原语，ARIA 角色和状态也完全相同。

API 沿用 React 版本的术语：color、variant、size、disabled、open、value……成为 attribute 和 property，ReactNode 类型的属性变为插槽（slot），回调变为 minerva-* 事件，表单控件可参与原生 。

### 安装

该包仅提供 ESM，且没有 peer 依赖：Lit、minerva-design/core（含 Floating UI）、DOMPurify 和 jsonc-parser 都是普通依赖。不需要 React。

### 加载元素

使用构建工具时，引入一次该包（例如在入口文件中）即可注册所有元素：

也可以按元素引入各自的入口，以减小打包体积。每个入口只注册对应的元素、它的子部件以及它内部渲染的 Minerva 元素，不做其他事；除此之外模块没有副作用，因此未使用的元素永远不会被打包。重复引入同一元素（或之后再引入完整入口）不会有任何问题。

无需任何构建步骤时，可以用 module 脚本从 CDN 加载自包含的模块包。它包含所有元素、Lit 和 minerva-design/core，并已压缩：

生产环境中请在 CDN 地址里固定版本。如果想自行托管，该模块包也以 ./cdn 导出（minerva-design/web-components/cdn）发布。

### 设计令牌

元素会自行处理样式（CSS 位于其 shadow root 中），但设计令牌（--primary-color、--radius-md、--space-2……）从页面读取。请以样式表链接或 CSS 导入的方式引入一次 minerva-design/tokens.css。它与 minerva-design/tokens.css 是同一个文件：如果页面已经引入了 minerva-design/style.css（React 与 Web Components 并存），令牌就已经存在了。主题、调色板和组件级变量请参阅主题定制。

### Attribute 与 property

每个选项都是一个 property（camelCase，可为任意 JavaScript 值）；当它是字符串、数字或布尔值时，同时也是一个 attribute（kebab-case：full-width、close-label、activation-mode）。布尔 attribute 只要存在即为开启；在 React 中默认值为 true 的选项会取反（hide-close-button、no-loop）。表示状态的 attribute（open、disabled、variant、size、color、checked……）会被反射，因此可以用 CSS 选择。数组、对象和函数（options、items、columns、渲染回调）只能作为 property 设置。

表单控件遵循原生输入框的行为：value（或 checked）attribute 是初始值，form.reset() 会恢复到该值；而 value / checked property 是当前值。如需通过脚本修改，请设置 property。

### 事件

元素通过名为 minerva- 的 CustomEvent 告知用户执行了什么操作。这些事件会冒泡并且是 composed 的（可以穿越 shadow root），新状态放在 event.detail 中：

minerva-change：值的变更已提交（{ value }；复选框和开关为 { checked, value }）。

minerva-input：用户输入过程中值正在变化（{ value }）。

minerva-open-change：用户请求打开或关闭弹出层（{ open, ... }）。它可以取消：调用 preventDefault() 会保持当前状态，相当于 React 中受控的 open 属性。标签页的选中变化同样可以取消。

更具体的事件采用相同的命名方式：minerva-select、minerva-close、minerva-clear、minerva-page-change、minerva-sort-change、minerva-selection-change、minerva-after-open、minerva-after-close……每个组件页面都列出了其元素的事件。

当元素对应某个原生控件时，原生事件保持原有含义：click、focus、blur、input 和 change（在宿主元素上重新派发）。

通过脚本设置 property 永远不会触发事件：事件始终表示用户做了某件事，因此把状态同步到元素中不会造成循环。

### 插槽与部件

富内容放在插槽中：默认插槽用于主要内容，在 React 组件接受 ReactNode 的位置则使用具名插槽（slot="footer"、"prefix"、"start"、"icon"……）。元素把关键的内部结构暴露为 CSS 部件（base、control、panel、item、label、icon……），你可以在页面中用 ::part() 为其设置样式，而无需依赖内部类名。每个组件页面都列出了插槽和部件。

### TypeScript 与编辑器支持

每个元素类都会把自己加入 HTMLElementTagNameMap，因此 document.querySelector 和 createElement 会返回正确的类型。元素类及其字符串字面量联合类型均从包中导出。

框架模板的类型声明由 Custom Elements Manifest（custom-elements.json，同样随包发布）生成：在 React、Vue、Svelte 和 Solid 模板中，attribute、property 和事件都会进行类型检查。请引用一次与你的框架对应的文件：

```tsx
对于纯 HTML 文件，让 VS Code 指向随包提供的 HTML custom data，即可获得带文档说明的标签和属性补全：
```

### 在 React 19 中使用

React 19 原生支持自定义元素：元素上存在的 prop 会以 property 的形式设置（因此布尔值、数组和对象都能直接使用），而以 on + 事件名命名的 prop 会订阅自定义事件，例如 onminerva-change。onClick 和其他标准事件与原生元素上的用法相同。

在 React 应用中，minerva-design 的 React 组件通常更合适。当同一套组件需要与非 React 代码共享时（微前端、CMS 内容、服务端模板），自定义元素才更有用。

### 服务端渲染

这些模块可以在 Node 中引入（Next.js、Nuxt、SvelteKit、Angular SSR、Astro……）：引入时不会访问 DOM，并且 defineElement() 是幂等的，在没有 customElements 注册表的环境中不执行任何操作。元素不会被预渲染（不使用声明式 shadow DOM）：服务端发送带有 attribute 和 light DOM 内容的标签，浏览器在定义加载后再升级它们。

服务端渲染的标记在水合时不会出现不匹配，即使在 hydrateRoot() 之前就注册了元素：复合子项（标签页与面板、单选框、选项）会把它们自己写入的宿主属性（roving tabindex、生成的 id、aria-controls / aria-labelledby、slot、hidden、data-state）推迟到下一个动画帧和空闲时段之后。由脚本创建的元素会立即写入。

使用 :not(:defined) 隐藏尚未定义的元素，以避免出现无样式内容闪烁。

### 开发警告

无效的 attribute 组合和常见错误（值不匹配任何选项、min 大于 max、纯图标按钮缺少 aria-label、包被加载了两次……）会通过 console.error 报告（与 React 组件的警告以及 React 自身的 prop 警告使用同一通道），每条消息只报告一次，格式与 React 版相同："[minerva] : message"。这些检查受 process.env.NODE_ENV !== "production" 保护，构建工具会替换该表达式：生产构建会移除这些检查。没有构建工具时（CDN 构建，或在不存在 process 的环境中加载模块），警告处于关闭状态。

### 编写你自己的元素

Minerva 元素的构建模块均已导出，因此你自己的自定义元素可以共享它们的约定、主题作用域和无障碍行为：

defineElement(Class)：注册一个元素及其静态依赖；幂等，开发环境下若该标签已被其他类占用会发出警告，没有 customElements 时不执行任何操作。

emit(target, name, detail, { cancelable })：派发一个冒泡且 composed 的 minerva-* CustomEvent；若有监听器调用了 preventDefault() 则返回 false。

MinervaElement：LitElement 基类（static tagName、static dependencies、this.emit()）。

hostStyles：共享的 :host 规则（box-sizing、hidden 属性、.visually-hidden 辅助类）。

FormAssociatedElement：基于 ElementInternals 的表单控件基类（name、disabled、required、有效性、自定义有效性、重置、fieldset 以及状态恢复）。

LocaleController：通过 core 翻译器提供内置文案（this.locale.t("modal.close")），跟随 lang 和 。

resolveLanguage(element)：元素所在作用域中受支持的语言。

AriaController：把宿主元素上的 aria-label / aria-labelledby / aria-describedby 和  转发到内部控件（id 无法穿越 shadow root）。

HasSlotController：判断具名插槽是否有内容，以便去掉空的包裹元素。

基于 core 基础原语的 Lit 控制器：FloatingLayerController（锚定弹出层：定位、可关闭浮层、可选的焦点范围）、AnchoredPositionController、DismissableLayerController、FocusScopeController、ModalController（滚动锁定与隐藏其他内容）、RovingFocusController 和 TypeaheadController。

popoverResetStyles：重置在顶层（top layer）中渲染的 popover="manual" 面板的浏览器默认样式。

### 一个页面，所有框架

每个组件页面都有框架选择器（React、Vue、Angular、Svelte、Solid、HTML），选择会在整个站点以及 ?framework= 链接中保留。Vue、Angular、Svelte、Solid 和 HTML 示例运行的是真实的自定义元素；它们的源码在构建时由一个确定性的转换器根据页面的 Web Component 示例（HTML 及其 setup 脚本）生成，因此每个框架始终展示同一个经过测试的示例：

root.querySelector("#id") → 元素引用：Vue 中的 ref()、Angular 中的 #ref + @ViewChild、Svelte 中的 bind:this、Solid 中的 ref={el}。

el.addEventListener("minerva-change", handler) → 模板事件监听：@minerva-change、(minerva-change)、onminerva-change、on:minerva-change；对应的 removeEventListener 会被去掉，由框架负责移除。

setup 中的 el.items = [...] → 属性绑定：:items.prop、[items]、items={…}、prop:items={…}。

只通过 textContent（或  的 value）写入的元素 → 在模板中渲染的响应式状态（ref、字段、$state、signal）。

其他声明变为组件状态和函数，其他语句在挂载时执行（onMounted、ngAfterViewInit、onMount），清理函数的其余部分在卸载时执行。纯 HTML 保留原脚本，用 document 代替示例根元素。

规则无法表达的代码会保留原始的 setup 函数，并在挂载时以容器引用调用，因此生成的示例始终正确。

### 指南

```ts
// main.ts: every element (Vite, webpack, Rspack, esbuild...)
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```ts
// only what you use: each entry registers one element (and its parts,
// e.g. <minerva-option> with <minerva-select>) plus the Minerva elements it renders
import "minerva-design/web-components/button";
import "minerva-design/web-components/select";
import "minerva-design/web-components/modal";
```

```html
<!-- no build step: a self-contained ES module (Lit and minerva-design/core included) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/minerva-design@1.20.6/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@1.20.6/dist/web-components/cdn/minerva.js"
></script>
<!-- unpkg works too: https://unpkg.com/minerva-design@1.20.6/dist/web-components/cdn/minerva.js -->
```

```html
<!-- attributes: strings, kebab-case; booleans are on when present -->
<minerva-input name="email" type="email" placeholder="you@example.com" clearable required></minerva-input>
<minerva-button color="danger" variant="outline" full-width>Delete</minerva-button>

<script type="module">
  const input = document.querySelector("minerva-input");
  input.value = "ada@example.com"; // properties: camelCase, any type
  input.disabled = true;

  // data (arrays, objects, functions) is set as a property only
  document.querySelector("minerva-select").options = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>
```

```ts
const select = document.querySelector("minerva-select");
const output = document.querySelector("#plan-output");

// committed value change: bubbles and crosses shadow roots (composed)
select.addEventListener("minerva-change", (event) => {
  output.textContent = `Plan: ${event.detail.value}`;
});

// "controlled" pattern: open-change events are cancelable
const modal = document.querySelector("minerva-modal");
modal.addEventListener("minerva-open-change", (event) => {
  if (!event.detail.open && hasUnsavedChanges()) {
    event.preventDefault(); // the modal stays open
  }
});
```

```html
<minerva-modal label="Delete project?">
  <p>This cannot be undone.</p>
  <div slot="footer">
    <minerva-button variant="ghost">Cancel</minerva-button>
    <minerva-button color="danger">Delete</minerva-button>
  </div>
</minerva-modal>

<style>
  /* style the parts an element exposes (::part) in its states (:state) */
  minerva-modal:state(open)::part(content) {
    border-radius: 24px;
  }
  minerva-input::part(input) {
    font-variant-numeric: tabular-nums;
  }
</style>
```

```ts
// every element is in HTMLElementTagNameMap: querySelector is typed
const select = document.querySelector("minerva-select"); // MinervaSelect | null
const output = document.querySelector("output"); // HTMLOutputElement | null
select?.addEventListener("minerva-change", () => {
  if (output) output.value = select.value; // string
});

// element classes and their string-literal unions are exported
import type { MinervaButton, ButtonVariant } from "minerva-design/web-components";
```

```ts
// React 19 (global.d.ts)
/// <reference types="minerva-design/web-components/react" />

// Svelte 5 (src/app.d.ts)
/// <reference types="minerva-design/web-components/svelte" />

// Solid (global.d.ts)
/// <reference types="minerva-design/web-components/solid" />

// Vue / Volar (tsconfig.json)
{ "compilerOptions": { "types": ["minerva-design/web-components/vue"] } }
```

```json
// .vscode/settings.json: completion and hover docs in .html files
{
  "html.customData": [
    "./node_modules/minerva-design/dist/web-components/html-custom-data.json"
  ]
}
```

```tsx
// global.d.ts
/// <reference types="minerva-design/web-components/react" />

// Settings.tsx
import { useState } from "react";
import "minerva-design/web-components/switch";

export function Settings() {
  const [on, setOn] = useState(false);
  return (
    <minerva-switch
      label="Email notifications"
      checked={on} // a property: React 19 passes it as is
      onminerva-change={(e: CustomEvent<{ checked: boolean }>) =>
        setOn(e.detail.checked)
      }
    />
  );
}
```

```ts
// Safe on the server: nothing touches the DOM when the module loads, and
// defineElement() skips registration when there is no customElements registry.
import "minerva-design/web-components";

// The markup is sent as is and upgraded in the browser:
// :where(minerva-select, minerva-tabs):not(:defined) { visibility: hidden; }
```

```ts
// Logged in development only, once per message:
// [minerva] <minerva-tabs>: value "billing" does not match any <minerva-tab>.

// Vite, webpack, Rollup (+ replace) and esbuild (define) replace
// process.env.NODE_ENV: production bundles drop the checks and messages.
// The CDN bundle is built for production: no warnings.
```

```ts
import { html, css } from "lit";
import {
  MinervaElement,
  RovingFocusController,
  defineElement,
  hostStyles,
} from "minerva-design/web-components";

/** A toolbar: one Tab stop, arrow keys / Home / End move between buttons. */
export class AppToolbar extends MinervaElement {
  static override tagName = "app-toolbar";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-2, 8px);
      }
    `,
  ];

  // core's createRovingFocus, attached / destroyed with the element
  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => [...this.querySelectorAll<HTMLElement>("minerva-button")],
    orientation: "horizontal",
  }));

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "toolbar");
  }

  protected override firstUpdated() {
    this.roving.attach(this);
  }

  protected override render() {
    return html`<slot @slotchange=${() => this.roving.refresh()}></slot>`;
  }
}

defineElement(AppToolbar); // idempotent, no-op without customElements
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
