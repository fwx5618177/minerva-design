# 架构

React、Vue、Angular、Web Components、React Native、Taro、微信原生和 uni-app 共享平台无关核心，Web 渲染器额外使用 DOM 原语。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 包

Minerva 是一个 pnpm monorepo，只发布一个包 minerva-design，每个渲染器对应一个入口。行为（无头状态机）、组件契约、设计令牌、主题数据和翻译只在核心中编写一次；各渲染器只负责渲染。

包

Web 端核心 API：完整的平台无关核心层（dist/core），加上 DOM 层（dist/dom）的 DOM 原语：焦点作用域、可关闭层栈、滚动锁定、隐藏其他内容、漫游焦点、定位、Portal 容器、主题 Cookie 与防闪烁初始化脚本。API 与拆分前相同。

React 19 组件库。组件通过 src/internal 中对核心原语的轻量 Hook 实现，所有浮层共享同一套实现。它重新导出公共 API 中的主题工具与类型，并把核心令牌打包进 style.css。

基于 Lit 的自定义元素，实现完整的组件集，可用于任意框架或不用框架。它们通过 Lit 控制器复用同样的核心原语，并将 React 版的样式表编译进 shadow root，因此两个库的外观和行为一致。

它由两个内部层实现，分别构建自私有工作区包。原生渲染器（React Native、小程序）只使用第一个，因此不会引入任何 DOM 代码。

内部层

平台无关的 TypeScript，不访问 DOM（由 lint 规则和一个在没有 Intl.PluralRules 的 Node 环境中运行的测试保证）：无头状态机、组件契约、设计令牌（TypeScript 源数据，生成 tokens.css / tokens.mini.css，以及返回具体值的 resolveTokens）、主题类型、调色板与设计预设、i18n 文案与翻译器、键盘导航与按键查找算法、id、受控状态、校验和 URL 安全处理。

供 Web 渲染器使用的 DOM 部分：焦点作用域、可关闭层、滚动锁定、隐藏其他内容、漫游焦点的 DOM 绑定、基于 @floating-ui/dom 的定位、Portal 容器、指针安全区、presence（退出动画）、阅读方向，以及主题的 DOM / Cookie 工具。

### 平台

各渲染器使用 minerva-design 的独立入口。Web 宿主使用 DOM 原语，React Native 使用解析后的原生样式值，小程序使用类作用域 CSS 令牌。下表状态由组件支持矩阵汇总生成。

平台

入口

渲染方式

共享层

状态

稳定

规划中

各组件的支持情况：参见“平台支持”。

React（Web）

React 19 DOM 组件，支持 SSR / RSC

Web Components

Lit 自定义元素，可用于任意框架或不用框架

Vue 3

原生单文件组件（在此之前使用 Web Components）

Angular

基于 signals 的原生独立组件（在此之前使用 Web Components）

React Native + Expo

React Native 组件，令牌由 resolveTokens 解析

Taro

面向小程序和 H5 的 React 语法组件，使用 tokens.mini.css

微信小程序

原生自定义组件（WXML / WXSS），使用 tokens.mini.css

uni-app

使用 uni-app 内置组件的 Vue 3 组件，使用 tokens.mini.css

Beta

### 共享的无头层

共享契约、令牌与状态逻辑减少差异；各渲染器负责渲染和宿主接入。

状态机（core/machines）：框架无关的 { getState, send, subscribe } store，覆盖展开收起与 presence、Toast 队列、选择、标签页、选择器列、表单字段与校验、分页、评分、数字步进器和开关类控件。React 与 Web Components 的 Toast、Tabs、Pagination 和 Rating 已经基于它们运行。

组件契约（core/contracts）：每个组件的运行时元数据（含枚举值与默认值的属性、事件、插槽、业务方向、各平台的支持状态），并与 React 类型和 custom-elements.json 进行一致性校验。

设计令牌：由 TypeScript 数据生成 tokens.css（与之前的 Sass 输出逐字节一致）、面向小程序的基于类名的 tokens.mini.css（按调色板拆分），以及带有与 CSS 一致的 sRGB color-mix 实现的 resolveTokens()。

共享契约测试、各渲染器单测和浏览器测试验证文档中的 API。SDK、模拟器和实机验收范围见平台支持页。

### DOM 原语

DOM 原语（dist/dom）是作用于 DOM 元素的小函数，返回清理函数或控制器对象。它们支持嵌套：由一个栈决定哪个浮层先响应。其中与平台无关的部分（键盘导航、按键查找、受控状态）位于核心层（dist/core）。

createFocusScope：打开时聚焦、Tab 循环约束焦点、关闭时把焦点还给触发元素；嵌套作用域会暂停外层。

createDismissableLayer：Escape、外部指针按下和焦点移出只关闭最上层；在子层（子菜单、Modal 中的 Select）内点击不会关闭父层。

lockScroll：带引用计数的页面滚动锁定，并补偿滚动条宽度。

hideOthers：对辅助技术隐藏模态框以外的内容（aria-hidden 或 inert），嵌套模态框时也能正确恢复。

getNextIndex 与 createTypeahead（核心）以及 createRovingFocus（DOM）：为菜单、列表框和标签页提供方向键、Home / End、循环、方向、从右到左和按键查找。

computeAnchoredPosition / autoPosition：带偏移、翻转、平移、尺寸和箭头的锚定定位，滚动和缩放时保持位置。

createPointerGrace：指针向子菜单移动时保持其打开的安全三角区。

getPortalContainer / createPortalHost：浮层的渲染位置；嵌套的 ConfigProvider 会为每个主题作用域创建一个 Portal 容器。

createId 与 createControllableState：无需框架的唯一 id 和受控 / 非受控状态。

主题工具：Cookie 解析、防闪烁初始化脚本、调色板和设计令牌。

### 所有浮层共用一套实现

Modal、Drawer、AppShell 移动端导航、Popover、Tooltip、Menu、ContextMenu、Select、AutoComplete、Cascader 和 TimePicker 都注册到同一个层栈，使用相同的焦点处理和定位。Escape 总是先关闭最内层的浮层，焦点会回到原来的位置。

它们都渲染到最近主题作用域的 Portal 容器中，因此带有独立主题的嵌套 ConfigProvider 也会让其弹出内容使用该主题。

### 依赖

Floating UI（@floating-ui/dom）是唯一的第三方交互依赖，只在 DOM 层（dist/dom）的定位模块中使用。不使用 Radix UI 或其他 headless 库：Slot / asChild、Tabs、对话框、菜单和选择器都在本仓库中开发，并用 Vitest、happy-dom、Testing Library 和 user-event 测试。

### 实现与验收进度

列出的渲染器包均包含实际实现。Beta 表示当前成熟度，不代表已完成实机或生产验收；组件级状态以平台支持矩阵为准。

共享核心与 DOM 层：状态机、契约、令牌、翻译和测试基础设施已实现。

Vue 3 与 Angular：原生渲染器及可运行文档示例已实现。

React Native 与 Expo：原生组件和模拟器检查已实现；实机与独立 Release 包验收尚未完成。

Taro、微信原生与 uni-app：已有实现、官方微信目标编译 fixture，以及文档注明的浏览器和模拟器检查。

触控预设与移动扩展：使用各平台文档中的 API，明确保留宿主限制和验收边界。

### 下一步

安装各个包并引入样式表。

在纯 HTML、Vue、Angular 或 Svelte 中使用自定义元素。

### 工具与 AI 使用的组件元数据

只读 contracts 入口提供各框架的导入、属性、事件、插槽和绑定信息。按需读取类型引用即可，无需把全部类型放入上下文。此入口不依赖 React、DOM 或原生渲染器。

```tsx
import { contractsMetadata, getRendererContract, getType } from "minerva-design/contracts";

const input = getRendererContract("Input", "vue");
console.log(input?.import, input?.bindings);
const value = input?.props?.find(prop => prop.name === "modelValue");
const type = value?.typeRef ? getType(value.typeRef) : undefined;
console.log(contractsMetadata.packageVersion, type);
```

schemaVersion 标识格式，packageVersion 对应包版本。sourceCommit 是生成基线，sourceDigest 标识实际源码快照。文本索引还提供静态 Markdown / JSON 和完整接入示例。

```text
core (dist/core)   platform-neutral TypeScript (no DOM): React Native, mini-programs, Node
  ├─ headless state machines (machines/): disclosure, toast queue, tabs, selection, field...
  ├─ component contracts (contracts/): props, events, slots, platform support
  ├─ tokens: TypeScript source → tokens.css, tokens.mini.css, resolveTokens()
  └─ theme data, design presets, i18n messages + translator, pure helpers
        ▲
        │                             web only
        │   dom (dist/dom)   focus scope, layers, scroll lock, roving focus,
        │        ▲         positioning (@floating-ui/dom), portal, theme DOM helpers
        │        │
 ┌──────┴────────┴──────────────┬─────────────────────────┬──────────────────────┐
 minerva-design         minerva-design/web-components   minerva-design/vue · /angular
 React 19 (DOM)         Lit custom elements             (native renderers)
        │
 minerva-design/native · /taro · /uni · miniprogram → dist/weapp   (native host renderers)

minerva-design/core = core + dom (the web API)
```

```ts
import { createDismissableLayer, createFocusScope, lockScroll } from "minerva-design/core";

// A framework-free modal: trap focus, dismiss on Escape / outside click,
// lock page scroll. Every React overlay is built from the same pieces.
const scope = createFocusScope(dialog, { trapped: true, loop: true });
const layer = createDismissableLayer(dialog, { onDismiss: close });
const unlock = lockScroll();
scope.activate();

function close() {
  layer.destroy();
  scope.deactivate(); // restores focus to the opener
  unlock();
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
