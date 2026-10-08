# Minerva 组件库

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/fwx5618177/minerva.svg?style=social&label=Stars)](https://github.com/fwx5618177/minerva)
[![GitHub issues](https://img.shields.io/github/issues/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/issues)
[![GitHub license](https://img.shields.io/github/license/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/blob/main/LICENSE)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/graphs/contributors)

[English](./README.md) | [简体中文](./README_ZH.md) | [日本語](./README_JP.md)

</div>

Minerva 是一个面向 Web 的 UI 组件库：包含一个 React 组件库和一组与框架无关的 Web Components，统一在一个 pnpm monorepo 中开发。

## 🌟 演示和文档

文档与在线演示：[https://fwx5618177.github.io/minerva/](https://fwx5618177.github.io/minerva/)

## ✨ 特性

- **React 组件**：100+ 个组件，基于 React 19（`ref` 作为普通 prop；客户端入口带 `"use client"`，可用于 React Server Components）
- **Web Components**：以标准自定义元素（Lit）提供完整组件集，可用于纯 HTML、Vue、Angular、Svelte、Solid 或 React：外观、令牌、键盘与 ARIA 行为一致，表单控件支持原生表单关联，并提供 CDN 包和自动生成的框架类型声明
- **ESM + CommonJS**：React 组件库同时提供两种模块格式（Web Components 仅提供 ESM）
- **TypeScript**：自带类型定义
- **主题**：light / dark / system 模式，以及 `editorial`、`tech`、`graphite`、`cool` 四种配色，基于 CSS 自定义属性；支持 cookie 持久化，SSR 下用 `THEME_INIT_SCRIPT` 避免闪烁（`@minerva/lib-core/theme-utils`，服务端安全）
- **设计预设**：通过 `<ConfigProvider preset="editorial">`（克制、以阅读为主）或 `density` / `radius` / `shadow` / `fontScale` 维度切换整个应用的外观；支持 SSR（`designAttributes()`、`createThemeInitScript({ design })`），并可由嵌套 provider 限定作用域
- **定制**：每个组件都文档化了一组稳定的 CSS 自定义属性（`--button-height`、`--modal-width`……）
- **入口**：`@minerva/lib-core`、`/theme-utils`、`/monaco`、`style.css`（或按组件引入 `styles/<component>.css` + `styles/tokens.css`）、`prose.scss`；按组件 tree-shaking，无图标 / i18n 运行时依赖
- **国际化**：内置英文、中文、日文和法文语言包
- **无 headless 依赖**：浮层、菜单、选择器、标签页和 `asChild` 都基于 `@minerva/core` 自主实现；Floating UI 是唯一的第三方交互依赖

## 📦 包

| 包                            | 说明                                                                                                                                                                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@minerva/core`               | 框架无关的交互原语（焦点作用域、可关闭层、滚动锁定、漫游焦点、定位等）、主题工具、设计令牌和 i18n 文案。随 lib-core 一起安装。                                                                                                      |
| `@minerva/lib-core`           | React 19 组件库。ESM + CJS，包含 TypeScript 类型。Peer 依赖：`react`、`react-dom` `^19.0.0`。                                                                                                                                       |
| `@minerva/lib-web-components` | 与框架无关的 Web Components（Lit）：每个 Minerva 组件都有对应的自定义元素（`<minerva-button>`、`<minerva-select>`、`<minerva-modal>`……）。仅 ESM；提供按元素入口、CDN 包、`tokens.css`，以及 React、Vue、Svelte、Solid 的类型声明。 |
| `@minerva/sample`（私有）     | 基于 Vite 的文档/演示站点，部署在 GitHub Pages。                                                                                                                                                                                    |

### 架构

```
@minerva/core            framework-agnostic TypeScript (DOM only)
  interaction primitives · positioning (@floating-ui/dom) · theme · tokens · i18n
        ▲ React hooks                    ▲ Lit controllers
@minerva/lib-core               @minerva/lib-web-components
```

`@minerva/lib-core` 的所有浮层（Modal、Drawer、Popover、Tooltip、Menu、ContextMenu、Select、AutoComplete、Cascader、TimePicker）都构建在同一套核心原语之上：同一个层栈（Escape 先关闭最内层浮层）、同一套焦点处理（焦点回到触发元素）和同一个定位引擎。详见文档站的[架构](https://fwx5618177.github.io/minerva/#/architecture)页面。

### 组件（`@minerva/lib-core`）

| 分类     | 组件                                                                                                                                                                                                                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 主题     | `ConfigProvider`、`ThemeProvider` / `useTheme`、`ThemeToggle`、`PaletteToggle`                                                                                                                                                                                                                                       |
| 通用     | `Button`、`IconButton`                                                                                                                                                                                                                                                                                               |
| 布局     | `Box`、`Stack` / `HStack` / `VStack`、`ResponsiveGrid` / `GridItem`、`SplitLayout`、`Page` / `PageHeader` / `PageSection` / `StatCard` / `Toolbar`、`AppShell`、`Card`（含子组件）、`Divider`、`VirtualList`                                                                                                         |
| 表单     | `FormControl` / `FormField` / `FormLabel` / `FormHelperText` / `FormErrorMessage`、`FormLayout`、`Input`、`Textarea`、`NumberInput`、`JsonField`、`KeyValueEditor`、`TagInput`、`AutoComplete`、`Select`、`Cascader`、`Checkbox`、`Radio` / `RadioGroup`、`Switch`、`TimePicker`、`Rating` / `RatingScale`、`Upload` |
| 数据展示 | `Avatar` / `AvatarGroup`、`Badge`、`Tag`、`Empty`、`Table` / `DataTable`（含子组件）、`DescriptionList`、`List` / `ListItem`、`TextLink`、`CodeBlock`、`Prose`、`HtmlPreview`、`MonthCalendar`、`Tooltip` / `TooltipProvider`                                                                                        |
| 反馈     | `Alert`、`toast` / `ToastProvider`、`ProgressIndicator`、`Skeleton` / `SkeletonText`、`LoadingState`                                                                                                                                                                                                                 |
| 浮层     | `Modal`、`Drawer`、`ConfirmDialog` / `confirm()` / `useConfirm`、`CommandDialog`、`Popover`、`Menu` / `ContextMenu`                                                                                                                                                                                                  |
| 导航     | `Tabs`、`PageTabs`、`NavTree`、`Pagination`、`Steps`                                                                                                                                                                                                                                                                 |
| 编辑器   | `MonacoCodeEditor`（`@minerva/lib-core/monaco`）                                                                                                                                                                                                                                                                     |

除组件外，`@minerva/lib-core` 还导出 `ConfigProvider`、`useConfig`，Hooks `useAutoTheme`、`useLocale`、`useI18n`，工具函数 `applyThemeStyles`、`generateCSSVariables`，以及内置主题集合 `themes`（`light`、`dark`、`github-dark`）。

## 🚀 快速开始

### 安装

```bash
pnpm add @minerva/lib-core react react-dom
```

或

```bash
npm install @minerva/lib-core react react-dom
```

或

```bash
yarn add @minerva/lib-core react react-dom
```

需要 React 19（`react`、`react-dom` `^19.0.0`）。不支持 React 18（组件使用了把 `ref` 作为普通属性等 React 19 API）。所有客户端模块都带有 `"use client"` 指令，可直接在 React Server Components 框架（如 Next.js App Router）中引入，无需额外包装。

### 基础用法

先引入一次样式文件（例如在入口文件中），然后即可使用组件：

```tsx
import { useState } from "react";
import {
  Alert,
  Button,
  ConfigProvider,
  Switch,
  FormField,
  Input,
  ToastProvider,
  VStack,
  toast,
} from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function App() {
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ConfigProvider>
      <ToastProvider>
        <VStack gap={4} align="start">
          <Alert color="info" title="Welcome" closable>
            Minerva is ready.
          </Alert>
          <FormField label="Username">
            <Input
              name="username"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              clearable
            />
          </FormField>
          <Switch
            label="Subscribe"
            checked={subscribed}
            onChange={(checked) => setSubscribed(checked)}
          />
          <Button
            color="primary"
            onClick={() => toast.success(`Hello, ${name}`)}
          >
            Submit
          </Button>
        </VStack>
      </ToastProvider>
    </ConfigProvider>
  );
}
```

### 主题与语言

`ConfigProvider` 通过在 `document.documentElement` 上设置 CSS 自定义属性（如 `--primary-color`、`--background-color`、`--text-gray`）来应用主题。

- `theme`：`"auto"`（默认，跟随 `prefers-color-scheme`）、`"light"`、`"dark"`、`"github-dark"`、完整的主题对象，或 `{ light, dark }` 组合
- `locale`：`{ language: "en" | "zh" | "fr" }`（默认 `"en"`）

```tsx
import { ConfigProvider, themes, useConfig } from "@minerva/lib-core";

const brandTheme = {
  light: { ...themes.light, "primary-color": "#6750a4" },
  dark: { ...themes.dark, "primary-color": "#d0bcff" },
};

function CurrentTheme() {
  const { theme, locale } = useConfig();
  return <pre>{JSON.stringify({ theme, locale })}</pre>;
}

export function Root() {
  return (
    <ConfigProvider theme={brandTheme} locale={{ language: "fr" }}>
      <CurrentTheme />
    </ConfigProvider>
  );
}
```

传入 `theme="github-dark"`（或 `"light"` / `"dark"`）即可直接使用内置主题。

### 主题、配色与 SSR

服务端组件中用 `@minerva/lib-core/theme-utils` 的 `parseThemeCookies` 读取 cookie，并在 `<head>` 中内联 `THEME_INIT_SCRIPT`，再用 `ThemeProvider`（`defaultTheme` / `defaultPalette`）包裹应用即可避免首屏闪烁。详见文档站「主题与配色」页面。

### Toast API

```tsx
import { Button, toast } from "@minerva/lib-core";

// Rendered by the <ToastProvider> mounted near the root of the app
export function SaveButton() {
  const save = () =>
    toast.promise(fetch("/api/save", { method: "POST" }), {
      loading: "Saving...",
      success: "Saved",
      error: "Could not save",
    });

  return <Button onClick={save}>Save</Button>;
}
```

### Web Components

以标准自定义元素提供同一套组件，可用于任意框架，也可不依赖框架。它们在 shadow root 中渲染与 lib-core 相同的 DOM 和样式，并复用 `@minerva/core` 的原语，因此外观和行为与 React 组件一致。

```bash
pnpm add @minerva/lib-web-components
```

```ts
// every element...
import "@minerva/lib-web-components";
// ...or only the ones you use (one entry per element)
import "@minerva/lib-web-components/select";

// design tokens, once (already included in @minerva/lib-core/style.css)
import "@minerva/lib-web-components/tokens.css";
```

无需构建步骤时，也可以从 CDN 加载：

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/cdn/minerva.js"
></script>
```

之后像原生元素一样使用这些标签。表单控件支持表单关联（`name`、`required`、`FormData`、`form.reset()`），事件是会冒泡并穿过 shadow root 的 `minerva-*` CustomEvent（`minerva-change`、`minerva-open-change`……）：

```html
<minerva-config theme="system" locale="en">
  <form>
    <label for="plan">Plan</label>
    <minerva-select id="plan" name="plan" value="pro" required>
      <minerva-option value="free">Free</minerva-option>
      <minerva-option value="pro">Pro</minerva-option>
    </minerva-select>
    <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>
    <minerva-button type="submit">Save</minerva-button>
  </form>
</minerva-config>

<script type="module">
  document
    .querySelector("minerva-select")
    .addEventListener("minerva-change", (event) => {
      console.log(event.detail.value);
    });
</script>
```

类型：所有元素都已声明在 `HTMLElementTagNameMap` 中；模板类型可通过以下方式启用：

```ts
/// <reference types="@minerva/lib-web-components/react" />  // React 19 JSX
/// <reference types="@minerva/lib-web-components/svelte" /> // Svelte 5
/// <reference types="@minerva/lib-web-components/solid" />  // Solid
// Vue (Volar): add "@minerva/lib-web-components/vue" to compilerOptions.types
// VS Code: "html.customData": ["./node_modules/@minerva/lib-web-components/dist/html-custom-data.json"]
```

纯 HTML、Vue、Angular、Svelte、表单和主题的使用指南见 [Web Components](https://fwx5618177.github.io/minerva/#/web-components)。

### 样式定制

三层公开、稳定的定制方式，从轻到重：

1. **设计令牌与组件 CSS 变量**（`--primary-color`、`--radius-md`、`--button-radius`、`--input-height`……）：设置在 `:root`、主题作用域或任意元素上。
2. **样式钩子**：每个 React 组件在其可样式化的元素上渲染 `data-minerva="<组件>"` 和 `data-part="<部件>"`，以及统一词汇的状态属性（`data-state="open|closed|checked|unchecked|indeterminate|active|inactive"`、`data-disabled`、`data-invalid`、`data-readonly`、`data-loading`、`data-size`、`data-variant`、`data-color`、`data-orientation`、`data-side`、`data-align`、`data-placement`……）。Web Components 以标签名、`::part()` 和自定义状态（`:state()`）暴露同样的名字。
3. **级联层**：库的全部 CSS 都放在 `@layer minerva` 中，你未分层的 CSS 无需 `!important` 即可覆盖。

| 钩子     | React                                        | Web Components                     |
| -------- | -------------------------------------------- | ---------------------------------- |
| 组件     | `[data-minerva="button"]`                    | `minerva-button`                   |
| 部件     | `[data-minerva="button"][data-part="label"]` | `minerva-button::part(label)`      |
| 状态     | `[data-state="open"]`、`[data-disabled]`     | `:state(open)`、`:state(disabled)` |
| 键值状态 | `[data-size="small"]`                        | `:state(size-small)`               |

```css
/* React */
[data-minerva="button"][data-part="root"][data-variant="solid"] {
  --button-radius: 999px; /* CSS 变量与钩子组合使用 */
  letter-spacing: 0.01em;
}
[data-minerva="modal"][data-part="content"][data-state="open"] {
  border: 1px solid var(--border-color);
}

/* Web Components：同样的名字 */
minerva-button:state(variant-solid) {
  --button-radius: 999px;
}
minerva-modal:state(open)::part(content) {
  border: 1px solid var(--border-color);
}

/* 分层的应用 CSS：把 minerva 放进你的层顺序 */
@layer reset, minerva, app;
```

推荐使用复合选择器 `[data-minerva="x"][data-part="y"]`（对弹层、对话框等通过 portal 渲染的部件同样有效）；类名和没有钩子的 DOM 结构属于内部实现。每个组件的钩子列在其文档页和 `@minerva/core/styling-hooks`（机器可读清单）中，并由 `packages/core/styling-hooks.lock.json` 锁定：新增钩子为 minor 变更，删除或重命名为 major 变更。指南：[样式定制](https://fwx5618177.github.io/minerva/#/styling)。

## 🌐 浏览器支持

面向常青浏览器。**完整支持**（下列特性均原生可用，无需回退）：**Chrome / Edge 120+、Firefox 125+、Safari 17+**（含 iOS Safari 17+）。更旧的引擎（低至 Chrome / Edge 111、Firefox 113、Safari 16.4）可以使用，但有以下降级：

- `color-mix()`（111 / 113 / 16.2）：阴影与悬停色变平；容器查询（105 / 110 / 16）：`ResponsiveGrid`、`SplitLayout`、`KeyValueEditor` 保持单列；`:has()`（105 / 121 / 15.4）：`Input`、`Modal` / `Drawer` 内边距略有差异；`:dir()`（120 / 49 / 16.4）：RTL 下 `Rating` 半星与 `Cascader` 箭头不镜像。
- Web Components：Popover API（114 / 125 / 17）缺失时浮层回退为 `position: fixed` + `z-index`；`ElementInternals`（77 / 98 / 16.4）缺失时表单控件可用但不参与表单（可用 `element-internals-polyfill`）；`adoptedStyleSheets` 缺失时 Lit 回退为 `<style>`；自定义状态 `:state()`（125 / 126 / 17.4）用于样式钩子，Chromium 90-124 使用旧语法 `:--open`，更旧的引擎可改用宿主属性（`[open]`、`[disabled]`）。
- 级联层 `@layer`（99 / 97 / 15.4）：所有发布的样式表都位于 `@layer minerva` 中。
- 剪贴板（`CodeBlock` 复制）需要安全上下文（HTTPS / localhost），不可用时提示复制失败。
- SSR 需要 Node `^20.19.0 || >=22.12.0`，导入时不访问 `window` / `document`。

完整的特性矩阵见 [英文 README](./README.md#-browser-support)。

## 🧑‍💻 开发者快速开始

环境要求：本地开发需要 Node.js >= 22.12（见 `.nvmrc`）和 pnpm 11。构建各个包和文档站点在 Node.js 20.19+ 上同样可用（GitHub Pages 部署工作流使用的就是 Node 20）。

```bash
git clone https://github.com/fwx5618177/minerva.git
cd minerva
pnpm install
pnpm dev
```

### 脚本

| 命令                                | 说明                                                            |
| ----------------------------------- | --------------------------------------------------------------- |
| `pnpm dev`                          | 构建组件库，然后启动文档/演示站点                               |
| `pnpm build`                        | 按顺序构建所有包：core → lib-core → lib-web-components → sample |
| `pnpm test`                         | 运行全部测试：单元测试（所有包、文档校验）与 e2e 用户流程       |
| `pnpm test:unit` / `pnpm test:e2e`  | 只运行单元测试 / 只运行 e2e 用户流程（`tests/e2e`）             |
| `pnpm test:dist`                    | 测试构建产物（lib-core 与 lib-web-components，构建后运行）      |
| `pnpm test:coverage`                | 运行全部测试并生成覆盖率报告（带覆盖率阈值）                    |
| `pnpm lint`                         | 运行 ESLint（flat config）                                      |
| `pnpm typecheck`                    | 对所有包进行类型检查                                            |
| `pnpm format` / `pnpm format:check` | 使用 Prettier 格式化 / 检查格式                                 |
| `pnpm clean`                        | 清理构建产物                                                    |
| `pnpm changeset`                    | 添加描述本次改动的 changeset                                    |
| `pnpm version-packages`             | 应用待发布的 changeset：更新版本号并生成 CHANGELOG              |
| `pnpm release`                      | 构建组件库并发布到 npm                                          |

### 工具链

- 构建：Vite 8
- 测试：Vitest、Testing Library、happy-dom
- 代码检查与格式化：ESLint 10 + typescript-eslint、Prettier
- Git Hooks：Husky、lint-staged、commitlint（Conventional Commits）
- CI：`.github/workflows/ci.yml` 在每次推送到 `main` 和每个 Pull Request 时，于 Node 22 下运行 lint、类型检查、格式检查、带覆盖率的测试、构建、构建产物测试和包检查
- 文档部署：`.github/workflows/deploy.yml` 在每次推送到 `main` 时构建文档站点并发布到 GitHub Pages

### 发布（手动发布到 npm）

版本与变更日志由 [Changesets](https://github.com/changesets/changesets) 管理。发布是**手动**的，由维护者在本机完成：CI 中没有发布流程（`.github/workflows/ci.yml` 只做校验，`deploy.yml` 只部署文档站点）。

1. **为每个改动写 changeset**（在对应 PR 中）：`pnpm changeset`，选择包和语义化版本级别，并提交生成的 `.changeset/*.md`。
2. **更新版本**（在最新的 `main` 上，工作区干净）：

   ```bash
   pnpm version-packages   # changeset version：更新版本号、写入 CHANGELOG.md，并消费 .changeset/*.md
   pnpm install            # 刷新 lockfile（内部依赖范围可能已变化）
   ```

3. **审查**，确认无误后再发布：`git diff`（版本号、CHANGELOG 条目、lib-core / lib-web-components 中的 `@minerva/core` 版本范围），然后在 Node 22（`.nvmrc`）下运行与 CI 相同的检查：

   ```bash
   pnpm lint && pnpm typecheck && pnpm format:check && pnpm test:coverage
   pnpm build && pnpm test:dist && pnpm check:package
   pnpm -r publish --dry-run --no-git-checks   # 查看将发布的内容，不会上传任何东西
   git commit -am "chore: release" && git push
   ```

4. **登录 npm**：使用拥有 `@minerva` scope 发布权限、并已开启双重验证（2FA）的账号：

   ```bash
   npm login --registry https://registry.npmjs.org/
   npm whoami --registry https://registry.npmjs.org/
   ```

   每个包的 `publishConfig.registry` 都指向 `https://registry.npmjs.org/`，因此即使 `~/.npmrc` 配置了镜像（如 npmmirror），发布也不会走镜像。

5. **发布**：

   ```bash
   pnpm release            # 构建 core、lib-core 与 lib-web-components，然后执行 `changeset publish`
   git push --follow-tags  # 推送 changeset publish 创建的 <包名>@<版本> tag
   ```

   `changeset publish` 只发布 npm 上尚不存在该版本的包，并按依赖顺序发布（先 `@minerva/core`，再 `@minerva/lib-core` 与 `@minerva/lib-web-components`），同时把 `workspace:*` 替换为实际版本号。开启写操作 2FA 时，npm 会提示输入一次性密码（也可以直接传入：`pnpm release --otp <code>`，该参数会转发给 `changeset publish`）。

各包发布的内容（由各自 `package.json` 的 `files` 决定；测试、源码和文档站点不会被发布）：

| 包                            | 内容                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@minerva/core`               | `dist/`（ESM + CJS、`.d.ts` / `.d.cts`、`tokens.css`）、`README.md`、`LICENSE`                                                                                                                         |
| `@minerva/lib-core`           | `dist/`（按模块的 ESM + CJS、类型、`style.css`、按组件的 `styles/*.css`、`prose.scss`、`./monaco` 与 `./theme-utils` 入口）、`README.md`、`LICENSE`                                                    |
| `@minerva/lib-web-components` | `dist/`（每个元素的 ESM、`elements/*` 入口（含可选的 `code-editor`）、`cdn/minerva.js`、`tokens.css`、`types/` 中的框架类型、`html-custom-data.json`）、`custom-elements.json`、`README.md`、`LICENSE` |

`@minerva/sample`（文档站点）是私有包，永远不会发布。

## 🤝 贡献

我们欢迎贡献！请查看我们的 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 📧 联系方式

如有任何问题或反馈，请联系我们：

- 邮箱：[fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues：[https://github.com/fwx5618177/minerva/issues](https://github.com/fwx5618177/minerva/issues)
- GitHub Pull Requests：[https://github.com/fwx5618177/minerva/pulls](https://github.com/fwx5618177/minerva/pulls)
