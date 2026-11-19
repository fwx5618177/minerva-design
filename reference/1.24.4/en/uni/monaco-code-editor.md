# MonacoCodeEditor

A labelled Monaco editor running on a local engine (never a CDN) that follows the page theme. If the engine cannot load or mount in time, it degrades to an editable textarea with a retry button. Import it from minerva-design/monaco; @monaco-editor/react and monaco-editor are optional peer dependencies. The Web Component <minerva-code-editor> is published as the optional entry minerva-design/web-components/code-editor (outside the all-in-one entry and the CDN bundle), with monaco-editor as its optional peer dependency.

Package: minerva-design@1.24.4

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeEditor

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MonacoCodeEditor

Support: n/a

Optional uni/monaco H5 entry creates an injected local Monaco editor with controlled v-model, language/theme/readOnly updates, timeout/error fallback/retry and model/editor disposal. No native substitute is exported as equivalent. Monaco requires browser DOM/editor workers unavailable in native mini views. JsonField and CodeBlock are separate narrower components. Unsupported on this platform.

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
