# 概览

Minerva Design 提供 React、Vue、Angular、Web Components、React Native、Taro、微信原生和 uni-app 渲染器，共享组件契约与设计令牌。

Package: minerva-design@1.20.6

Renderer: uni

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

### Minerva 是什么

一个 minerva-design 包为各渲染器提供独立入口。已实现 API 和宿主对应实现以平台支持矩阵为准。

Web 和小程序使用 CSS 变量；React Native 将同一套令牌解析为原生样式值。各宿主的 Provider 管理主题、调色板和设计预设。

### 软件包

React 19 组件、ConfigProvider、主题工具与 Hooks，提供 ESM、CommonJS 和 TypeScript 声明。其他渲染器使用文档中的独立子路径入口。

基于 Lit 的自定义元素覆盖文档中的组件目录，可用于纯 HTML 和框架集成。

### 特性

#### 主题

支持 light、dark、system 模式、内置调色板和设计预设，以及通过 ConfigProvider 使用自定义主题。

#### 国际化

React 版自带英文、中文、日文和法文翻译，并内置轻量翻译器：不依赖任何 i18n 库，与应用自身的 i18n 配置完全隔离。

#### 无障碍

语义化元素、键盘支持、清晰可见的焦点环，以及为纯图标控件提供的 aria-label 属性。

#### TypeScript

使用 TypeScript 编写；每个组件都导出其 Props 类型，主题也是带类型的令牌映射。

#### 可摇树优化

按目标渲染器引入入口；各入口的构建格式、样式表和可选宿主依赖见安装及平台支持文档。

### 快速预览

引入一次样式表，用 ConfigProvider 包裹应用，然后使用组件：

### 浏览文档

每个页面都包含带源码的在线示例，以及根据组件类型自动生成的 API 表格。

```tsx
import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  return (
    <ConfigProvider theme="system">
      <HStack gap={4}>
        <Button color="primary">Save</Button>
        <Switch label="Notifications" defaultChecked />
      </HStack>
    </ConfigProvider>
  );
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
