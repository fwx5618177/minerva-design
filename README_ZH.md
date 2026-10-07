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
- **Web Components**：基于 Lit 的自定义元素，可在任意框架中使用，也可不依赖框架
- **ESM + CommonJS**：同时提供两种模块格式
- **TypeScript**：自带类型定义
- **主题**：light / dark / system 模式，以及 `editorial`、`tech`、`graphite`、`cool` 四种配色，基于 CSS 自定义属性；支持 cookie 持久化，SSR 下用 `THEME_INIT_SCRIPT` 避免闪烁（`@minerva/lib-core/theme-utils`，服务端安全）
- **入口**：`@minerva/lib-core`、`/theme-utils`、`/monaco`、`style.css`、`prose.scss`
- **国际化**：内置英文、中文和法文语言包

## 📦 包

| 包                            | 说明                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `@minerva/lib-core`           | React 19 组件库。ESM + CJS，包含 TypeScript 类型。Peer 依赖：`react`、`react-dom` `^19.0.0`。 |
| `@minerva/lib-web-components` | 基于 Lit 的 Web Components。目前提供 `<minerva-button>` 自定义元素。                          |
| `@minerva/sample`（私有）     | 基于 Vite 的文档/演示站点，部署在 GitHub Pages。                                              |

### 组件（`@minerva/lib-core`）

| 分类     | 组件                                                                                                                                                                                                                                                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 主题     | `ConfigProvider`、`ThemeProvider` / `useTheme`、`ThemeToggle`、`PaletteToggle`                                                                                                                                                                                                                                                    |
| 通用     | `Button`、`IconButton`、`InteractiveIconButton`、`SearchButton`                                                                                                                                                                                                                                                                   |
| 布局     | `Box`、`Stack` / `HStack` / `VStack`、`Space`、`ResponsiveGrid` / `GridItem`、`SplitLayout`、`Page` / `PageHeader` / `PageSection` / `StatCard` / `Toolbar`、`AppShell`、`Card`（含子组件）、`Divider`、`VirtualList`                                                                                                             |
| 表单     | `FormControl` / `FormField` / `FormLabel` / `FormHelperText` / `FormErrorMessage`、`FormLayout`、`Input`、`TextField`、`Textarea`、`NumberInput`、`JsonField`、`KeyValueEditor`、`TagInput`、`AutoComplete`、`Select`、`Cascader`、`Checkbox`、`Radio` / `RadioGroup`、`Switch`、`TimePicker`、`Rating` / `RatingScale`、`Upload` |
| 数据展示 | `Avatar` / `AvatarGroup`、`Badge`、`Chip`、`Tag`、`Empty`、`StatusIndicator`、`Table` / `DataTable`（含子组件）、`DescriptionList`、`List` / `ListItem`、`TextLink`、`CodeBlock`、`Prose`、`HtmlPreview`、`MonthCalendar`、`Tooltip` / `TooltipProvider`                                                                          |
| 反馈     | `Alert`、`message` / `useMessage`、`toast` / `ToastProvider`、`ProgressIndicator`、`Spinner`、`Skeleton` / `SkeletonText`、`LoadingState`                                                                                                                                                                                         |
| 浮层     | `Modal`、`Drawer`、`ConfirmDialog` / `confirm()` / `useConfirm`、`CommandDialog`、`Popover`、`Popper`、`Menu` / `ContextMenu`、`Dropdown`                                                                                                                                                                                         |
| 导航     | `Tabs`、`PageTabs`、`NavTree`、`Pagination`、`Steps`                                                                                                                                                                                                                                                                              |
| 编辑器   | `MonacoCodeEditor`（`@minerva/lib-core/monaco`）                                                                                                                                                                                                                                                                                  |

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

需要 React 19（`react`、`react-dom` `^19.0.0`）。`@minerva/lib-core` 1.x 版本支持 React 18。包入口带有 `"use client"` 指令，可直接在 React Server Components 框架（如 Next.js App Router）中引入，无需额外包装。

### 基础用法

先引入一次样式文件（例如在入口文件中），然后即可使用组件：

```tsx
import { useState } from "react";
import {
  Alert,
  Button,
  ConfigProvider,
  Space,
  Switch,
  TextField,
  message,
} from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function App() {
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ConfigProvider>
      <Space direction="vertical" size="medium">
        <Alert variant="info" title="Welcome" closable>
          Minerva is ready.
        </Alert>
        <TextField
          name="username"
          label="Username"
          placeholder="Enter username"
          value={name}
          onChange={setName}
          clearable
        />
        <Switch
          label="Subscribe"
          checked={subscribed}
          onChange={(checked) => setSubscribed(checked)}
        />
        <Button
          variant="primary"
          onClick={() => message.success(`Hello, ${name}`)}
        >
          Submit
        </Button>
      </Space>
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

### Message API

```tsx
import { Button, message, useMessage } from "@minerva/lib-core";

export function SaveButton() {
  const msg = useMessage();

  const save = () => {
    msg
      .loading({ content: "Saving...", duration: 1000 })
      .then(() => message.success("Saved"));
  };

  return <Button onClick={save}>Save</Button>;
}
```

### Web Components

```bash
pnpm add @minerva/lib-web-components
```

注册一次自定义元素：

```ts
import "@minerva/lib-web-components";
```

之后即可在任意 HTML 中使用：

```html
<minerva-button variant="primary" size="medium" shape="pill">
  Click me
</minerva-button>
<minerva-button variant="ghost" loading>Loading</minerva-button>
<minerva-button variant="error" disabled aria-label="Delete">
  Delete
</minerva-button>
```

`<minerva-button>` 属性：

| 属性                            | 取值                                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `variant`                       | `primary`、`secondary`、`success`、`warning`、`error`、`info`、`ghost`、`retry`、`back` |
| `size`                          | `tiny`、`small`、`medium`、`large`                                                      |
| `shape`                         | `square`、`rounded`、`circle`、`pill`                                                   |
| `loading`、`disabled`、`active` | 布尔值                                                                                  |
| `aria-label`                    | 字符串                                                                                  |

在 React 项目中如需 JSX 类型提示，请添加：

```ts
/// <reference types="@minerva/lib-web-components/react" />
```

## 🧑‍💻 开发者快速开始

环境要求：本地开发需要 Node.js >= 22.12（见 `.nvmrc`）和 pnpm 11。构建各个包和文档站点在 Node.js 20.19+ 上同样可用（GitHub Pages 部署工作流使用的就是 Node 20）。

```bash
git clone https://github.com/fwx5618177/minerva.git
cd minerva
pnpm install
pnpm dev
```

### 脚本

| 命令                                | 说明                                                      |
| ----------------------------------- | --------------------------------------------------------- |
| `pnpm dev`                          | 构建组件库，然后启动文档/演示站点                         |
| `pnpm build`                        | 按顺序构建所有包：lib-core → lib-web-components → sample  |
| `pnpm test`                         | 运行全部测试：单元测试（所有包、文档校验）与 e2e 用户流程 |
| `pnpm test:unit` / `pnpm test:e2e`  | 只运行单元测试 / 只运行 e2e 用户流程（`tests/e2e`）       |
| `pnpm test:dist`                    | 对构建后的 `@minerva/lib-core` 做冒烟测试（构建后运行）   |
| `pnpm test:coverage`                | 运行全部测试并生成覆盖率报告（带覆盖率阈值）              |
| `pnpm lint`                         | 运行 ESLint（flat config）                                |
| `pnpm typecheck`                    | 对所有包进行类型检查                                      |
| `pnpm format` / `pnpm format:check` | 使用 Prettier 格式化 / 检查格式                           |
| `pnpm clean`                        | 清理构建产物                                              |
| `pnpm changeset`                    | 添加描述本次改动的 changeset                              |
| `pnpm version-packages`             | 应用待发布的 changeset：更新版本号并生成 CHANGELOG        |
| `pnpm release`                      | 构建组件库并发布到 npm                                    |

### 工具链

- 构建：Vite 8
- 测试：Vitest、Testing Library、happy-dom
- 代码检查与格式化：ESLint 10 + typescript-eslint、Prettier
- Git Hooks：Husky、lint-staged、commitlint（Conventional Commits）
- 文档部署：`.github/workflows/deploy.yml` 在每次推送到 `main` 时构建文档站点并发布到 GitHub Pages

### 发布

版本与变更日志由 [Changesets](https://github.com/changesets/changesets) 管理，发布由维护者在本地手动完成：

```bash
# 1. 在 PR 中：描述改动（选择包和语义化版本级别）
pnpm changeset

# 2. 发布时，在最新的 main 分支上：
pnpm version-packages   # 更新版本号、写入 CHANGELOG.md，并消费 .changeset/*.md
pnpm install            # 若内部依赖版本变化，刷新 lockfile
git commit -am "chore: release" && git push

# 3. 发布（需要已 `npm login` 且拥有 @minerva scope 的发布权限）
pnpm release            # 构建 lib-core 与 lib-web-components，然后执行 `changeset publish`
git push --follow-tags  # 推送 changeset publish 创建的 tag
```

发布前请确认 `pnpm lint && pnpm typecheck && pnpm test && pnpm build` 全部通过。

## 🤝 贡献

我们欢迎贡献！请查看我们的 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 📧 联系方式

如有任何问题或反馈，请联系我们：

- 邮箱：[fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues：[https://github.com/fwx5618177/minerva/issues](https://github.com/fwx5618177/minerva/issues)
- GitHub Pull Requests：[https://github.com/fwx5618177/minerva/pulls](https://github.com/fwx5618177/minerva/pulls)
