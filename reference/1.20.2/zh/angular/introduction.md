# 介绍

Minerva 背后的设计理念、如何阅读组件页面，以及所有组件共同遵循的约定。

Package: minerva-design@1.20.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### 设计原则

#### 令牌驱动

颜色、圆角和阴影都来自 CSS 自定义属性，因此每个组件都会跟随当前主题，包括你自定义的主题。

#### 默认无障碍

组件渲染原生语义化元素，支持键盘操作，显示清晰的焦点环，并在可能缺少可见标签时提供 aria-label。

#### 可预期的 API

相同的属性名（variant、size、shape、disabled、loading 等）在不同组件中含义一致。

#### 小而可组合

组件职责单一，并接受 className 和 style，便于与你自己的布局和样式组合。

### 如何阅读组件页面

每个组件页面都采用相同的结构：

组件准确的导入语句。全局样式表不会在这里重复：它只需在应用入口引入一次（参见“安装”）。

覆盖各项功能的在线示例。点击“显示代码”可查看完整源码；每个示例都是独立的，可以直接复制使用。示例通过 Minerva 自己的组件（Toast、对话框或内联结果）在页面上反馈操作结果，从不使用浏览器弹窗或控制台。

根据组件的 TypeScript 类型生成的表格，列出每个属性的类型、默认值和说明。

### 约定

#### 受控与非受控

表单组件可以自行管理状态（传入 defaultChecked / defaultValue，或不传），也可以受控（同时传入 checked / value 和 onChange）。不要在组件生命周期内切换这两种模式。

#### className 与 style

组件在根元素上接受 className（通常也接受 style）。封装原生元素的组件（例如 Button）还会透传原生属性（type、name、data-*、aria-* 等）。

#### 无障碍名称

当控件没有可见文本时（图标按钮、搜索按钮、关闭图标等），请通过 aria-label 属性为其提供无障碍名称。它会直接传递给可交互元素。

### 浏览器支持

Minerva 面向当前的常青浏览器：Chrome 与 Edge 111+、Firefox 113+、Safari 16.2+。主题依赖 CSS 自定义属性和 color-mix()；不支持 Internet Explorer。支持服务端渲染，主题会在 React 挂载后于客户端应用。

### 参与贡献

Minerva 基于 MIT 许可证开源。欢迎在 GitHub 上提交问题反馈、想法和 Pull Request：

```tsx
import { useState } from "react";
import { Switch } from "minerva-design";

// Uncontrolled: the component keeps its own state
<Switch label="Wi-Fi" defaultChecked />;

// Controlled: you own the state and update it in onChange
function Controlled() {
  const [on, setOn] = useState(false);
  return <Switch label="Bluetooth" checked={on} onChange={setOn} />;
}
```

```tsx
import { Button, IconButton } from "minerva-design";
import { IoTrashOutline } from "react-icons/io5";

<Button className="my-button" style={{ minWidth: 120 }} type="submit">
  Save
</Button>;

// icon-only controls need an accessible name
<IconButton icon={<IoTrashOutline />} aria-label="Delete item" />;
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
