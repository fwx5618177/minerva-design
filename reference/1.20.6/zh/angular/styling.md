# 样式定制

用你自己的 CSS 重新设计任意 Minerva 组件：设计令牌与 CSS 变量、公开的 data-minerva / data-part / 状态钩子、Web Components 的 ::part() 与 :state()，以及 minerva 级联层。

Package: minerva-design@1.20.6

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### 三层公开的定制方式

Minerva 提供三种稳定的组件定制方式，从轻到重依次使用。它们都是公开 API：在 minor 版本之间保持可用，而内部类名和 DOM 结构则不保证。

设计令牌和组件 CSS 变量：颜色、圆角、间距、控件高度……设置在 :root、主题作用域或任意元素上。

样式钩子：React 中的 data-minerva（组件）、data-part（部件）与状态属性（data-state、data-disabled、data-size……）；Web Components 中的标签名、::part() 与 :state()。两个库使用相同的名字。

minerva 级联层：库的所有样式表都位于 @layer minerva 中，你未分层的 CSS 无需 !important 即可覆盖。

### CSS 变量

优先使用变量：它们会随主题变化，并让组件自身的状态（悬停、聚焦、禁用）保持一致。每个组件页列出了它的 ---* 变量，令牌说明见「主题」。变量可以与下方的钩子组合：只为某个变体、尺寸或状态设置变量，而不必重写声明。

### 样式钩子（React）

每个 React 组件都会在可样式化的元素上渲染 data-minerva="" 与 data-part=""，并以统一词汇的属性表示状态。组件的根元素为 data-part="root"；通过 portal 渲染的浮层部件（弹出层、对话框、通知）同样带有 data-minerva，因此无论渲染在哪里都能匹配。服务端渲染的值与客户端完全一致（不会产生水合不匹配）。

推荐写法：复合选择器 [data-minerva="x"][data-part="y"]（优先级 0,2,0），再加上状态属性。它不受嵌套影响（Modal 中的 Button 是它自己的组件），也不受 portal 影响。避免使用内部类名组成的后代选择器：它们属于内部实现，会在版本之间变化。如需限定范围，可加上你自己的容器类名前缀，或给组件传入 className（它会落在根元素或该属性所说明的部件上）。

### 状态词汇

所有组件使用相同的状态名称。在 React 中，它们是根元素（以及携带状态的部件，如浮层内容）上的 data-* 属性；在 Web Components 中，它们是宿主元素的自定义状态。

部件同样遵循统一词汇：root、label、description、icon、start-icon、end-icon、spinner、trigger、content、overlay、header、body、footer、title、close-button、list、item、item-indicator、group、separator、input、control、thumb、track、indicator……每个组件页的「样式钩子」一节列出了它在 React 与 Web Components 中的部件、选择器和状态。

### 条目及其状态的样式

组件中重复出现的元素（菜单项、选项、标签页、表格行与排序表头、页码、步骤、树节点、日历日期、通知、文件、星星……）拥有各自的公开状态：highlighted、selected、disabled、checked、current、expanded、sort、status……它们与组件状态使用同一套词汇，并与条目的 ARIA 状态（aria-selected、aria-checked、aria-current、aria-expanded、aria-sort）保持一致。

React：状态是条目元素自身的属性，与 data-minerva、data-part 并列：[data-minerva="menu"][data-part="item"][data-highlighted]。

Web Components，在 shadow root 中渲染的条目：每个条目状态都是与部件名并列的额外部件名 --（键值状态为 ---）。在 ::part() 中组合使用——它匹配同时带有所列全部名称的元素：minerva-menu::part(item item--highlighted)、minerva-data-table::part(header-cell header-cell--sort-ascending)。该约定沿用 Shoelace / Web Awesome（item--selected），且不依赖 :state() 支持。

Web Components，本身就是独立自定义元素的条目（、、、……）：其状态是条目元素的自定义状态，与任何组件相同：minerva-option:state(selected)::part(root)。你自己在这些元素上设置的属性（[closable]、[disabled]）同样是稳定的选择器。

条目钩子随交互变化：方向键让 [data-highlighted] / item--highlighted 在条目间移动，对列排序会切换 data-sort，关闭通知时在退出动画期间设置 data-state="closed"。shadow 部件名和自定义状态不会给宿主添加任何属性，因此服务端渲染的标记水合时不会出现不匹配。

下面的示例在 React 和 Web Components 中分别重设了高亮的菜单项、选择器的选中选项、当前页码、已排序的表头以及成功通知的样式。

### 级联层：@layer minerva

minerva-design/tokens.css、minerva-design/style.css、styles/*.css 和 minerva-design/tokens.css 都包裹在 @layer minerva 中。未分层的 CSS 无论优先级或先后顺序都会胜过任何层，因此你的规则无需 !important 即可覆盖库样式。如果你的应用使用了级联层，请在所有样式表之前声明一次层顺序。

注意：未分层的全局重置样式（button { background: none }、normalize.css……）现在同样会覆盖 Minerva 的样式。请像上面那样把它们导入到排在 minerva 之前的层中（layer(reset)）。

### 视觉规则：边框与焦点

不使用单边边框：Minerva 从不用某一侧的色条表示状态（高亮项没有左侧强调条，选中的标签没有下划线边框，提示框和引用块没有侧边色条，也没有单边的 inset 阴影）。指示器都是完整形状：背景填充、完整描边环、圆角胶囊或圆点。行与区块之间的分隔线是分隔形状（由伪元素或分隔元素绘制的 1px 线条），而不是行的 border-bottom。自定义样式时请遵循同一规则；表格网格线和 Divider 元素本身是仅有的已记录例外。

文本类控件（Input、Textarea、Select 触发器、NumberInput、TagInput、AutoComplete、TimePicker、Cascader、JsonField、KeyValueEditor、Command 搜索框、Pagination 输入框）的焦点样式取代了浏览器原生轮廓：边框变为焦点色，并由 box-shadow 绘制环绕控件的焦点环。文本输入框在任何聚焦方式下（包括鼠标）都会显示（:focus / :focus-within）；按钮类触发器使用 :focus-visible。焦点环颜色来自主题的 --focus-ring-color，按调色板分别为浅色和深色调校。可在 :root、主题作用域或单个控件上用下列变量自定义。

强制颜色模式（Windows 高对比度）：该模式不绘制 box-shadow，因此每条焦点规则还会设置 outline: 2px solid transparent。系统会把这条轮廓渲染为可见的系统颜色，焦点不会消失。重新设计焦点环时请保留它。

### 稳定性策略

钩子接口是机器可读的：minerva-design/styling-hooks 导出清单（组件 → 部件 → 状态及其取值），文档即由它生成。契约测试会在各种状态下渲染每个 React 组件和每个自定义元素，只要缺少已文档化的钩子或出现未文档化的部件就会失败；锁定文件（styling-hooks.lock.json）会让任何接口变更导致构建失败，直到有意更新它。

次版本：新增组件、部件、状态（组件状态或条目状态）或状态值。

major 版本：删除或重命名其中任何一项，或把状态移到另一个部件上。

不在保证范围内：类名、没有钩子的元素的 DOM 结构，以及用 !important 覆盖内部样式。

### 下一步

主题、配色与设计令牌。

Web Components 的令牌、主题与语言。

```css
/* 1. Design tokens: the whole app (or a theme scope) */
:root {
  --primary-color: #7c3aed;
  --radius-md: 10px;
}

/* 2. Component variables (listed on each component page)... */
.toolbar {
  --button-height: 32px;
}

/* 3. ...combined with hooks: variables for one variant / state */
[data-minerva="button"][data-variant="ghost"] {
  --button-radius: 999px;
}
minerva-button:state(variant-ghost) {
  --button-radius: 999px; /* variables inherit into the shadow root */
}
```

```css
/* component root */
[data-minerva="tabs"] { }
/* a part (also matches portalled parts: popups, dialogs) */
[data-minerva="select"][data-part="content"] { }
/* a part in a state */
[data-minerva="modal"][data-part="content"][data-state="open"] { }
/* a part of a component in a state (state on the root) */
[data-minerva="button"][data-loading] [data-part="spinner"] { }
```

```css
/* component: the tag */
minerva-tabs { }
/* a part: ::part() */
minerva-select::part(content) { }
/* states are custom states of the host: :state() */
minerva-modal:state(open)::part(content) { }
minerva-button:state(loading)::part(spinner) { }
minerva-button:state(size-small):state(variant-ghost) { }
```

```css
/* React: item states are attributes of the item element itself */
[data-minerva="menu"][data-part="item"][data-highlighted] { }
[data-minerva="menu"][data-part="item"][data-state="checked"] { }
[data-minerva="option"][data-selected] { }
[data-minerva="pagination"][data-part="item"][data-current] { }
[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"] { }
[data-minerva="toast-region"][data-part="toast"][data-color="success"] { }
/* the trigger of a menu (a native element child) while the menu is open */
[data-minerva="menu"][data-part="trigger"][data-state="open"] { }

/* Web components, items in the shadow root: <part>--<state> part names */
minerva-menu::part(item item--highlighted) { }
minerva-menu::part(item item--checked) { }
minerva-select::part(item item--selected) { }
minerva-pagination::part(item item--current) { }
minerva-data-table::part(header-cell header-cell--sort-ascending) { }
minerva-toast-region::part(toast toast--color-success) { }
minerva-upload::part(item item--status-error) { }

/* Web components, items that are elements of their own: :state() */
minerva-option:state(selected)::part(root) { }
minerva-tab:state(active)::part(root) { }
minerva-page-tab:state(current) { }
/* your slotted trigger, from the states of its host */
minerva-menu:state(open) > [slot="trigger"] { }
```

```css
/* The library ships inside @layer minerva: unlayered rules win,
   whatever their specificity or order */
.my-button {
  border-radius: 0; /* beats the library, no !important */
}

/* Layered app? Declare the order once, before any stylesheet */
@layer reset, minerva, app;

/* Tailwind CSS v4 */
@layer theme, base, minerva, components, utilities;

/* Unlayered resets now beat the library too: layer them */
@import url("modern-normalize.css") layer(reset);
```

```css
/* The focus ring of every text-like control. Unset by default: the
   ring falls back to the theme's --focus-ring-color (per palette, light
   and dark), a 3px width and --primary-color for the border */
:root {
  --minerva-focus-ring-width: 4px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* One control: component variables still win for the border */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: color-mix(in srgb, var(--success-color) 45%, transparent);
}

/* Restyling the ring yourself? Keep the transparent outline:
   forced colors (High Contrast) paint it, box-shadows are dropped */
[data-minerva="input"][data-part="root"]:focus-within {
  box-shadow: 0 0 0 2px var(--primary-color);
  outline: 2px solid transparent;
}
```

```ts
import { stylingHooks, wcSelector } from "minerva-design/styling-hooks";

stylingHooks.modal.parts; // overlay, content, header, description, body, footer, close-button
stylingHooks.modal.states; // { state: ["open", "closed"], size: [...] }
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
