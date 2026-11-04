# 平台支持

React、Web Components、Vue、Angular、React Native、Taro、微信和 uni-app 的源码实现覆盖情况。矩阵不代表 npm 已发布，也不代表 API、视觉或设备表现完全一致。

Package: minerva-design@1.21.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

平台

共享契约描述组件属性、事件与插槽，各渲染器使用平台原语实现行为。已有源码实现仍可能存在 API 与交互缺口；请结合矩阵备注和各平台 manifest 查看已测试范围。

平台

组件

React

面向 DOM 的 React 19 组件（minerva-design）。

Web Components

适用于 Web 框架的 Lit 自定义元素。Vue 与 Angular 也通过各自入口提供原生框架组件。

Vue

原生 Vue 3 SFC 组件（minerva-design/vue），含独立示例和 API 表。

Angular

原生 Angular 独立组件（minerva-design/angular）。各组件的实现状态见下方矩阵。

React Native

基于 Expo 的 iOS 与 Android 原生组件。已用 Expo Go 57.0.9 在 iOS 26.1 和 Android 16 模拟器验证输入、表格、菜单、WebView 与虚拟列表；Android 系统文件选择及剪贴板复制粘贴也已通过。真机与独立发行安装包仍未验证。

Taro

面向小程序与 H5 的 Taro 组件。主入口已通过官方 Taro 4.3 微信目标编译 fixture；H5 键盘、焦点、上传和沙箱预览由 happy-dom 测试覆盖（不运行真实浏览器）。minerva-design/taro/monaco 是可选 H5 入口，由应用提供 Monaco 引擎；小程序原生宿主无法运行 Monaco。

微信

微信原生组件定义；文档注明的组合部件通过父组件属性或插槽表达。已在微信开发者工具模拟器验证部分交互，不代表实机或全量 API 已验证。微信原生组件宿主无法运行 Monaco。

uni-app

分发源码 SFC，已通过官方 uni-app 5.31 Vue 3 编译器的微信目标编译；fixture 静态注册库内全部 SFC，H5 专用 Monaco 除外。H5 提供键盘、模态焦点、portal、文件输入、沙箱预览和可选 minerva-design/uni/monaco 入口。应用须提供 Monaco 引擎，原生小程序宿主无法运行它。

稳定

测试版

规划中

不适用

已实现，且文档注明范围有自动化验证；不表示 npm 已发布，也不表示跨平台完全一致。

已有实现，但存在平台范围限制、API 或验证缺口；使用前请阅读矩阵备注与 manifest。

已列入路线图，暂不可用。

按设计在该平台上不是独立组件：平台以其他方式提供（将鼠标悬停在标签上查看详情）。

在 React 中是数据对象：父组件 items / entries 属性中的一项。

仅 React 提供的组合部件或 Provider：自定义元素通过属性或父元素实现相同功能。

支持矩阵

按平台列出所有组件和自定义元素。可按产品方向筛选：企业后台应用（toB）或面向消费者的应用（toC）。

产品方向

全部

toB

toC

显示的组件数：{{count}}

组件

方向

组件契约

该矩阵由组件契约生成：契约是从 React 属性类型和 Custom Elements Manifest 中提取的元数据（属性及其类型、枚举值和默认值，事件及其 detail 字段，插槽，产品方向以及各平台的支持情况）。当属性、特性或事件发生变化而未重新生成契约，或 React 与自定义元素的枚举值或默认值不一致时，测试会失败。

共享契约测试与渲染器单元、集成测试（Vitest + happy-dom，不运行真实浏览器）覆盖文档注明的交互、翻译与设计令牌。独立 CI fixture 使用官方微信目标 SDK 编译 Taro 主入口与 uni-app SFC。微信开发者工具 2.01.2510280 / 基础库 3.17.2 模拟器记录了按钮与重试、禁用选项、选择回写、模态框打开和局部主题交互。复核已验证原生键盘输入 hello 与受控回写 HELLO，旧系统信息 API 和组件 WXSS 选择器警告已修复并在重新编译后消失。游客账号下 automator RPC 超时，安全信息接口仍报错。实机、其他平台目标和全量平台 API 仍未验证；模拟器证据不代表视觉与 API 完全一致。

原生框架和小程序接入

请导入目标平台入口，遵循 peerDependencies 和宿主适配器要求。uni-app 分发源码 SFC，由应用的平台编译器处理。可选 H5 Monaco 入口为 minerva-design/taro/monaco 和 minerva-design/uni/monaco，应用须提供本地安装的 Monaco 引擎并配置 worker；它们不是原生小程序编辑器。官方微信目标 SDK 编译、H5 浏览器测试和已记录的开发者工具模拟器交互分别验收，仍需实机验证。

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
