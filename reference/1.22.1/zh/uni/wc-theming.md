# Web Components 主题定制

通过 <minerva-config> 或普通属性使用设计令牌、主题、调色板和设计预设，以及嵌套作用域、组件级 CSS 变量、::part() 和语言设置。

Package: minerva-design@1.22.1

Renderer: uni

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

### 设计令牌

每个元素都以 CSS 自定义属性的形式读取设计令牌（颜色、间距、圆角、阴影、字体、控件高度），这些属性会继承进 shadow root。请引入一次 tokens.css：它在 :root 上定义了浅色主题，以及根据下列属性切换令牌的规则。它与 minerva-design/tokens.css 是同一个文件，并已包含在 minerva-design/style.css 中，因此同一页面中的 React 组件和 Web Components 共享同一个主题。

### 主题属性

主题通过属性设置，由 tokens.css 读取：data-theme（light 或 dark）、data-palette、data-density、data-radius、data-shadow 和 data-font-scale。设置在  上时完全不需要脚本，因此也很容易在服务端渲染：

在  以下的元素上使用时，还需要在携带这些属性的元素上添加 data-minerva-theme-scope：派生令牌（悬停、浅色和边框色调、焦点环……）是在声明基础颜色的位置计算的，该属性会让这个作用域重新计算它们。 会自动为你完成这一步。

### <minerva-config>

 是 ConfigProvider 在 Web Components 中的对应物。它以 display: contents 渲染，并把主题属性写在自身上（为其内容形成一个作用域），或者在设置 root 时写在  上。作用域可以嵌套，离得最近的作用域生效：

属性

取值

浅色、深色、跟随操作系统，或 github-dark 主题。未设置时继承外层作用域。

调色板，包含浅色和深色两种变体。

设计预设：同时设置密度、圆角、阴影和字号缩放（未设置 palette 时还会设置其调色板）。

间距与控件高度；会覆盖预设。

圆角尺寸等级；会覆盖预设。

层级阴影；会覆盖预设。

字号等级；会覆盖预设。

内部元素内置文案（关闭按钮、空状态、校验消息……）的语言。

把所有设置应用到 （整个页面，包括 lang），而不是该元素的子树。

当解析后的浅色 / 深色模式发生变化时（包括 theme="system" 下操作系统切换时）会触发 minerva-theme-change；resolvedMode 返回当前模式：

### 深色模式

theme="system" 会跟随 prefers-color-scheme 并实时更新。若要让用户自行选择，请通过你自己的控件把 theme 设置为 light、dark 或 system，并持久化该选择。不使用  时，在  上切换 data-theme="dark" 即可切换到默认深色主题；为避免闪现浅色主题，请在服务端或在页面渲染前通过内联脚本写入该属性。

### 用 ::part() 与 :state() 设置内部样式

元素把关键的内部结构暴露为 CSS 部件（root、label、content、overlay、list、item、input、control……），把状态暴露为自定义状态（:state(open)、:state(disabled)、:state(size-small)……），名字与 React 组件的 data-part 和 data-* 钩子相同。它们是公开 API，而内部类名不是。每个组件页的「样式钩子」一节列出了它们，完整词汇见「样式定制」。

### 浮层保留在其作用域内

弹出层（选择器的列表框、气泡卡片、文字提示、菜单）和对话框渲染在元素自己的 shadow root 中，并通过 Popover API 显示在顶层（top layer），而不是被移动到  末尾。它们保留在你编写它们的 DOM 树位置中，因此会继承令牌、主题作用域、语言和你的 CSS 变量，祖先元素上的 overflow: hidden 或 z-index 也无法裁剪或遮挡它们。不支持 Popover API 的浏览器会回退为固定定位。

### 语言

内置文案和校验消息会跟随最近的 ，其次是最近的 lang 属性（可穿越 shadow root），否则使用英文。支持英文、中文、日文和法文；带地区的语言标签会被归约为其语言（fr-CA 使用法文）。修改 lang 或 locale 会立即更新元素。元素通过属性显示的文本（标签、占位符、close-label……）需要由你自行翻译。

### 下一步

内置主题、所有设计令牌与自定义主题。

调色板与设计预设详解。

```html
<link rel="stylesheet" href="/node_modules/minerva-design/dist/core/tokens.css" />
<!-- or, with a bundler -->
<script type="module">
  import "minerva-design/tokens.css";
</script>
```

```html
<!-- the attributes work on <html> (whole page) without any script -->
<html lang="fr" data-theme="dark" data-palette="cool" data-density="compact" data-radius="large">
```

```html
<minerva-config theme="system" palette="tech" design="editorial" locale="ja" root>
  <!-- root: the attributes go on <html>, for the whole page -->
</minerva-config>

<!-- nested scopes: the closest one wins -->
<minerva-config theme="light">
  <minerva-button>Light</minerva-button>

  <minerva-config theme="dark" palette="graphite" density="compact">
    <minerva-button>Dark, graphite, compact</minerva-button>
  </minerva-config>
</minerva-config>
```

```ts
const config = document.querySelector("minerva-config");
const status = document.querySelector("#theme-status");
config.addEventListener("minerva-theme-change", (event) => {
  // "light" | "dark", e.g. when the OS switches
  status.textContent = `${event.detail.mode} mode`;
});
config.resolvedMode; // the mode currently applied
```

```css
/* the same --<component>-* variables as the React components,
   on the element, any ancestor or :root */
.toolbar minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}

minerva-input {
  --input-radius: 6px;
}

/* theme tokens for one area: data-minerva-theme-scope recomputes the
   derived tokens (hover, subtle, focus ring...) from the new base colors */
.brand {
  --primary-color: #7c3aed;
}
```

```html
<section class="brand" data-minerva-theme-scope>
  <minerva-button>Violet</minerva-button>
</section>
```

```css
/* ::part() reaches the parts an element exposes, :state() its states
   (both listed in the "Styling hooks" section of each component page) */
minerva-select::part(content) {
  max-height: 240px;
}

minerva-modal:state(open)::part(overlay) {
  backdrop-filter: blur(4px);
}

minerva-tabs:state(variant-pills)::part(list) {
  gap: var(--space-1);
}

minerva-button:state(loading)::part(label) {
  opacity: 0.6;
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
