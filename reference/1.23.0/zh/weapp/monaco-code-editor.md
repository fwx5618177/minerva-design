# MonacoCodeEditor Monaco 代码编辑器

带标签的 Monaco 编辑器，使用本地引擎（不走 CDN）并跟随页面主题。引擎无法及时加载或挂载时，降级为可编辑的文本框并提供重试按钮。从 minerva-design/monaco 引入；@monaco-editor/react 与 monaco-editor 为可选 peer 依赖。 Web Component <minerva-code-editor> 以可选入口 minerva-design/web-components/code-editor 发布（不在一体化入口和 CDN 包中），monaco-editor 是其可选 peer 依赖。

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

## CodeEditor

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MonacoCodeEditor

Support: n/a

Browser-only Monaco editor; no native substitute is exported as equivalent. Monaco requires browser DOM/editor workers unavailable in native mini views. JsonField and CodeBlock are separate narrower components. Unsupported on this platform.

## CSS variables

```json
{
  "css:MonacoCodeEditor": {
    "kind": "cssVars",
    "source": "react/src/components/MonacoCodeEditor",
    "vars": [
      {
        "name": "--monaco-code-editor-radius",
        "description": "Corner radius of the editor surface (defaults to --radius-md)"
      },
      {
        "name": "--monaco-code-editor-border-color",
        "description": "Border color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-bg",
        "description": "Background color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-label-gap",
        "description": "Space between the label and the editor"
      },
      {
        "name": "--monaco-code-editor-font-size",
        "description": "Font size of the label, the messages and the plain-text fallback"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
