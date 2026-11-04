# Angular

minerva-design/angular 原生独立组件、signals 和 Angular Forms 接入。

Package: minerva-design@1.20.5

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

原生 Angular 包已可用，已实现组件及平台差异以支持矩阵为准。

平台支持

### 安装与配置

安装 minerva-design 及包声明的 Angular peer 版本。统一样式只需导入一次，启动时通过 provideMinerva 配置主题与语言。

### Signals 与原生导入

直接导入独立指令和组件。MnButton 增强原生 button，MnInput 和 MnUpload 提供有类型的 value 模型，无需 CUSTOM_ELEMENTS_SCHEMA。

### Angular Forms

原生输入框和上传组件已内置 ControlValueAccessor，可直接使用 ReactiveFormsModule 或 FormsModule，无需额外编写值访问器。disabled、touched 和值更新会同步到 Angular 表单。

Upload 负责选择与校验本地文件。网络上传由应用处理：监听 filesSelected 并随传输进度更新各 UploadItem 的状态。

各组件页的 Angular 标签展示可交互的原生 standalone Angular 组件，包含真实输入绑定和输出事件。示例在构建时预编译并通过严格模板检查，展示的源码与实时预览一致。若要使用自定义元素集成，可阅读独立的 Web Components 指南。

Angular 中的 Web Components

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
