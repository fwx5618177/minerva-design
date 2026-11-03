# 样式定制

用你自己的 CSS 重新设计任意 Minerva 组件：设计令牌与 CSS 变量、公开的 data-minerva / data-part / 状态钩子、Web Components 的 ::part() 与 :state()，以及 minerva 级联层。

Package: minerva-design@1.20.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

## Example: 高亮的菜单项

打开菜单并用方向键移动：高亮项获得着色背景和竖条，选中的项加粗，禁用项加删除线。React 面板通过菜单的 className 限定作用域；Web Component 使用 ::part(item item--highlighted)。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-menu.tsx

```tsx
import { Button, HStack, Menu } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
}
/* checked checkbox / radio items, disabled items */
.accent-menu [data-minerva="menu"][data-part="item"][data-state="checked"],
minerva-menu.accent-menu::part(item item--checked) {
  font-weight: 600;
}
.accent-menu [data-minerva="menu"][data-part="item"][data-disabled],
minerva-menu.accent-menu::part(item item--disabled) {
  text-decoration: line-through;
}
`;

export default function ItemsMenu() {
  return (
    <HStack gap={16} wrap className="accent-menu-demo">
      <style>{css}</style>
      <Menu
        className="accent-menu"
        items={[
          { key: "edit", label: "Edit", shortcut: "⌘E" },
          { key: "copy", label: "Duplicate", shortcut: "⌘D" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            defaultChecked: true,
          },
          { key: "delete", label: "Delete", disabled: true },
        ]}
      >
        <Button color="neutral" variant="outline">
          React menu
        </Button>
      </Menu>
      <minerva-menu class="accent-menu">
        <minerva-button slot="trigger" color="neutral" variant="outline">
          Web Component menu
        </minerva-button>
        <minerva-menu-item value="edit" shortcut="⌘E">
          Edit
        </minerva-menu-item>
        <minerva-menu-item value="copy" shortcut="⌘D">
          Duplicate
        </minerva-menu-item>
        <minerva-menu-checkbox-item value="pin" checked>
          Pinned
        </minerva-menu-checkbox-item>
        <minerva-menu-item value="delete" disabled>
          Delete
        </minerva-menu-item>
      </minerva-menu>
    </HStack>
  );
}

```

## Example: 当前页码

圆形页码按钮，当前页带描边环（[data-current] / item--current），禁用的上一页 / 下一页按钮变淡。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-pagination.tsx

```tsx
import { Pagination, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
.ring-pages [data-minerva="pagination"][data-part="item"],
.ring-pages minerva-pagination::part(item) {
  border-radius: 999px;
}
/* the current page: aria-current="page" mirrored as a public hook */
.ring-pages [data-minerva="pagination"][data-part="item"][data-current],
.ring-pages minerva-pagination::part(item item--current) {
  background: transparent;
  color: var(--primary-color);
  box-shadow: inset 0 0 0 2px var(--primary-color);
  font-weight: 700;
}
.ring-pages [data-minerva="pagination"][data-part="item"][data-disabled],
.ring-pages minerva-pagination::part(item item--disabled) {
  opacity: 0.3;
}
`;

export default function ItemsPagination() {
  return (
    <VStack className="ring-pages" gap={16}>
      <style>{css}</style>
      <Pagination defaultCurrent={1} total={50} aria-label="React pages" />
      <minerva-pagination
        current={1}
        total={50}
        aria-label="Web Component pages"
      />
    </VStack>
  );
}

```

## Example: 选择器的选中选项

选中的选项被填充，高亮的选项带虚线描边。React 选项是 SelectItem 组件（data-minerva="option"）；通过 options 属性渲染的 Web Component 暴露 ::part(item item--selected)，<minerva-option> 子元素则使用自身的 :state(selected)。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-select.tsx

```tsx
import { HStack, Select, SelectItem } from "minerva-design";
import "minerva-design/web-components";

const options = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese" },
  { value: "fr", label: "French" },
  { value: "ja", label: "Japanese", disabled: true },
];

const css = `
/* React options are SelectItem components: data-minerva="option" */
.bold-options [data-minerva="option"][data-selected],
minerva-select.bold-options::part(item item--selected),
minerva-option.bold-option:state(selected)::part(root) {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
}
.bold-options [data-minerva="option"][data-highlighted]:not([data-selected]),
minerva-select.bold-options::part(item item--highlighted),
minerva-option.bold-option:state(highlighted)::part(root) {
  outline: 2px dashed var(--primary-color);
  outline-offset: -2px;
}
`;

export default function ItemsSelect() {
  return (
    <HStack gap={16} wrap>
      <style>{css}</style>
      <div style={{ width: 200 }}>
        <Select
          aria-label="Language (React)"
          defaultValue="zh"
          contentClassName="bold-options"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ width: 200 }}>
        {/* options property: items rendered in the shadow root (::part) */}
        <minerva-select
          class="bold-options"
          aria-label="Language (options property)"
          value="zh"
          options={options}
        />
      </div>
      <div style={{ width: 200 }}>
        {/* <minerva-option> children: elements of their own (:state) */}
        <minerva-select aria-label="Language (minerva-option)" value="zh">
          {options.map((option) => (
            <minerva-option
              key={option.value}
              class="bold-option"
              value={option.value}
              disabled={option.disabled || undefined}
            >
              {option.label}
            </minerva-option>
          ))}
        </minerva-select>
      </div>
    </HStack>
  );
}

```

## Example: 已排序的表头

点击表头排序：已排序列的表头带下划线（data-sort / header-cell--sort-<direction>），未排序的可排序表头变淡，选中的行着色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Service {
  id: number;
  name: string;
  latency: number;
}

const services: Service[] = [
  { id: 1, name: "auth-api", latency: 42 },
  { id: 2, name: "billing", latency: 118 },
  { id: 3, name: "search", latency: 73 },
];

const columns: TableColumn<Service>[] = [
  { key: "name", header: "Service", sortable: true },
  {
    key: "latency",
    header: "Latency",
    align: "right",
    sortable: (a, b) => a.latency - b.latency,
  },
];

const css = `
/* sorted column header: data-sort / header-cell--sort-<direction> */
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"],
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="descending"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-ascending),
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-descending) {
  color: var(--primary-color);
  box-shadow: inset 0 -3px 0 var(--primary-color);
}
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="none"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-none) {
  color: var(--text-secondary-color);
}
/* selected rows */
.sorted-headers [data-minerva="data-table"][data-part="row"][data-selected] [data-part="cell"],
.sorted-headers minerva-data-table::part(row row--selected) {
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}
`;

export default function ItemsTable() {
  return (
    <VStack className="sorted-headers" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Services (React)"
        columns={columns}
        data={services}
        rowKey={(row) => row.id}
        defaultSortState={{ key: "latency", order: "ascend" }}
        rowSelection={{ defaultSelectedRowKeys: [2] }}
      />
      <minerva-data-table
        aria-label="Services (Web Component)"
        row-key="id"
        columns={columns}
        rows={services}
        sortState={{ key: "latency", order: "ascend" }}
        selectable
        selectedRowKeys={[2]}
      />
    </VStack>
  );
}

```

## Example: 成功通知

成功通知带绿色描边和背景，离开中的通知在 data-state="closed" / toast--closed 期间变淡。React 通知通过 portal 渲染：复合选择器依然能匹配。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-toast.tsx

```tsx
import { useRef } from "react";
import { Button, HStack, ToastProvider, toast } from "minerva-design";
import "minerva-design/web-components";

type Region = HTMLElement & {
  toast: { success: (title: string) => void; info: (title: string) => void };
};

const css = `
/* React toasts are portalled to the toast region: the compound selector
   matches them wherever they render */
[data-minerva="toast-region"][data-part="toast"][data-color="success"],
minerva-toast-region.success-toasts::part(toast toast--color-success) {
  /* a full outline, not a one-sided stripe */
  border-color: var(--success-color);
  box-shadow: inset 0 0 0 1px var(--success-color);
  background: var(--success-color-subtle);
}
/* leaving toast (data-state="closed" during its exit animation) */
[data-minerva="toast-region"][data-part="toast"][data-state="closed"],
minerva-toast-region.success-toasts::part(toast toast--closed) {
  opacity: 0.4;
}
`;

export default function ItemsToast() {
  const region = useRef<Region>(null);
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      {/* mount one ToastProvider near the root of an app */}
      <ToastProvider position="bottom-right" />
      <Button color="success" onClick={() => toast.success("Saved (React)")}>
        React success toast
      </Button>
      <Button
        color="success"
        variant="outline"
        onClick={() => region.current?.toast.success("Saved (Web Component)")}
      >
        Web Component success toast
      </Button>
      <minerva-toast-region
        ref={region}
        class="success-toasts"
        position="bottom-left"
      />
    </HStack>
  );
}

```

## Example: 重新设计 Button

通过 --button-* 变量实现胶囊形按钮，加粗 outline 变体的边框、标签大写，并在加载时为加载指示器着色：第一行是 React（data-* 钩子），第二行是 <minerva-button>（::part() / :state()）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-button.tsx

```tsx
import { Button, HStack, VStack } from "minerva-design";
import "minerva-design/web-components";

// Plain, unlayered CSS: it wins over the library (inside @layer minerva)
// without !important. Variables and hooks combine.
const css = `
.pill-buttons [data-minerva="button"][data-part="root"],
.pill-buttons minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}
.pill-buttons [data-minerva="button"][data-part="root"][data-variant="outline"] {
  border-width: 2px;
}
.pill-buttons minerva-button:state(variant-outline)::part(root) {
  border-width: 2px;
}
.pill-buttons [data-minerva="button"][data-part="label"],
.pill-buttons minerva-button::part(label) {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.pill-buttons [data-minerva="button"][data-loading] [data-part="spinner"],
.pill-buttons minerva-button:state(loading)::part(spinner) {
  color: var(--warning-color);
}
`;

export default function RestyleButton() {
  return (
    <VStack className="pill-buttons" gap={12}>
      <style>{css}</style>
      <HStack gap={8} wrap>
        <Button>React</Button>
        <Button variant="outline">Outline</Button>
        <Button loading variant="ghost">
          Saving
        </Button>
      </HStack>
      <HStack gap={8} wrap>
        <minerva-button>Web Component</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
        <minerva-button loading variant="ghost">
          Saving
        </minerva-button>
      </HStack>
    </VStack>
  );
}

```

## Example: 重新设计 Modal

模糊的遮罩层、带边框的面板，以及打开时着色的标题。React 面板通过 portal 渲染到 <body>，复合选择器 [data-minerva][data-part] 依然能匹配。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-modal.tsx

```tsx
import {
  Button,
  HStack,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "minerva-design";
import "minerva-design/web-components";

// The React content is portalled to <body>: the compound selector
// [data-minerva][data-part] matches it wherever it renders (a class on the
// trigger's container would not).
const css = `
[data-minerva="modal"][data-part="overlay"].glass-overlay,
minerva-modal.glass::part(overlay) {
  backdrop-filter: blur(6px);
}
[data-minerva="modal"][data-part="content"].glass-content,
minerva-modal.glass::part(content) {
  border: 1px solid var(--primary-color);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--primary-color) 25%, transparent);
}
[data-minerva="modal"][data-part="content"][data-state="open"].glass-content [data-part="header"],
minerva-modal.glass:state(open)::part(header) {
  color: var(--primary-color);
}
`;

export default function RestyleModal() {
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      <ModalRoot>
        <ModalTrigger asChild>
          <Button variant="outline">React modal</Button>
        </ModalTrigger>
        <ModalContent
          className="glass-content"
          overlayClassName="glass-overlay"
        >
          <ModalHeader>Restyled with hooks</ModalHeader>
          <ModalBody>
            The overlay, panel and title are styled from the page.
          </ModalBody>
        </ModalContent>
      </ModalRoot>
      <minerva-modal class="glass" label="Restyled with hooks">
        <minerva-button slot="trigger" variant="outline">
          Web Component modal
        </minerva-button>
        The overlay, panel and title are styled from the page.
      </minerva-modal>
    </HStack>
  );
}

```

## Example: 重新设计 Table

通过数据表格的部件实现大写表头单元格和悬停行高亮，React 中另有斑马纹行（::part() 只接受 :hover 等用户操作伪类，不接受 :nth-child）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Book {
  id: number;
  title: string;
  author: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", author: "Frank Herbert", score: 9.1 },
  { id: 2, title: "Solaris", author: "Stanisław Lem", score: 8.7 },
  { id: 3, title: "Hyperion", author: "Dan Simmons", score: 8.9 },
];

const columns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "score", header: "Score", align: "right" },
];

const css = `
.ledger [data-minerva="data-table"][data-part="header-cell"],
.ledger minerva-data-table::part(header-cell) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--primary-color);
}
/* ::part() only takes user-action pseudo-classes (:hover, :focus-visible...):
   keep structural ones (:nth-child) in a React-only rule */
.ledger [data-minerva="data-table"][data-part="row"]:nth-child(even) [data-part="cell"] {
  background: color-mix(in srgb, var(--primary-color) 6%, transparent);
}
.ledger [data-minerva="data-table"][data-part="row"]:hover [data-part="cell"],
.ledger minerva-data-table::part(row):hover {
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}
`;

export default function RestyleTable() {
  return (
    <VStack className="ledger" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Books (React)"
        columns={columns}
        data={books}
        rowKey={(book) => book.id}
      />
      <minerva-data-table
        aria-label="Books (Web Component)"
        row-key="id"
        columns={columns}
        rows={books}
      />
    </VStack>
  );
}

```

## Example: 重新设计 Tabs

通过标签页组件的状态钩子实现圆角胶囊样式：当前标签带着色背景和完整描边，禁用标签变淡。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-tabs.tsx

```tsx
import { Tab, TabList, TabPanel, Tabs, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* Library rule: no one-sided borders. The active tab is a full shape (a
   tinted pill with a full ring), not an underline. */
.pill-tabs [data-minerva="tabs"][data-part="list"],
.pill-tabs minerva-tabs::part(list) {
  gap: 4px;
}
.pill-tabs [data-minerva="tab"][data-part="root"],
.pill-tabs minerva-tab::part(root) {
  border-radius: 999px;
  font-weight: 500;
}
.pill-tabs [data-minerva="tab"][data-state="active"],
.pill-tabs minerva-tab:state(active)::part(root) {
  color: var(--primary-color-text);
  background: var(--primary-color-subtle);
  box-shadow: inset 0 0 0 1px var(--primary-color);
}
.pill-tabs [data-minerva="tab"][data-disabled],
.pill-tabs minerva-tab:state(disabled)::part(root) {
  opacity: 0.4;
}
`;

export default function RestyleTabs() {
  return (
    <VStack className="pill-tabs" gap={24}>
      <style>{css}</style>
      <Tabs defaultValue="overview" variant="soft">
        <TabList aria-label="React tabs">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="archive" disabled>
            Archive
          </Tab>
        </TabList>
        <TabPanel value="overview">React: data-* hooks</TabPanel>
        <TabPanel value="activity">Activity</TabPanel>
        <TabPanel value="archive">Archive</TabPanel>
      </Tabs>
      <minerva-tabs value="overview" variant="soft" label="Web Component tabs">
        <minerva-tab value="overview">Overview</minerva-tab>
        <minerva-tab value="activity">Activity</minerva-tab>
        <minerva-tab value="archive" disabled>
          Archive
        </minerva-tab>
        <minerva-tab-panel value="overview">
          Web Components: ::part() and :state()
        </minerva-tab-panel>
        <minerva-tab-panel value="activity">Activity</minerva-tab-panel>
        <minerva-tab-panel value="archive">Archive</minerva-tab-panel>
      </minerva-tabs>
    </VStack>
  );
}

```
