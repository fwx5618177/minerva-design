# MonacoCodeEditor

A labelled Monaco editor running on a local engine (never a CDN) that follows the page theme. If the engine cannot load or mount in time, it degrades to an editable textarea with a retry button. Import it from minerva-design/monaco; @monaco-editor/react and monaco-editor are optional peer dependencies. The Web Component <minerva-code-editor> is published as the optional entry minerva-design/web-components/code-editor (outside the all-in-one entry and the CDN bundle), with monaco-editor as its optional peer dependency.

Package: minerva-design@1.20.1

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeEditor

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## MonacoCodeEditor

Support: stable

### Import

```json
{
  "specifier": "minerva-design/monaco",
  "exports": [
    "MonacoCodeEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "monaco",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "object",
    "typeText": "typeof import(\"monaco-editor\")",
    "typeRef": "type:86876bf3c518b9353892",
    "required": true,
    "description": "Local Monaco engine (`import * as monaco from \"monaco-editor\"`). One engine per application; configure its workers in the host. The editor is never loaded from a CDN"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Source text (controlled)"
  },
  {
    "name": "language",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "plaintext",
    "required": false,
    "description": "Monaco language id"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Visible label, also the accessible name of the editor"
  },
  {
    "name": "height",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 420,
    "required": false,
    "description": "Height of the editor in pixels, clamped to [minHeight, maxHeight]"
  },
  {
    "name": "minHeight",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 160,
    "required": false,
    "description": "Minimum height in pixels"
  },
  {
    "name": "maxHeight",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 800,
    "required": false,
    "description": "Maximum height in pixels"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Makes the editor (and its fallback) read-only"
  },
  {
    "name": "theme",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "enum",
    "values": [
      "dark",
      "light"
    ],
    "typeText": "MonacoCodeEditorTheme | undefined",
    "typeRef": "type:00555609d19e3a07a261",
    "required": false,
    "description": "Color theme. Defaults to the page theme: `data-theme` on `<html>`, then the ConfigProvider theme, then light"
  },
  {
    "name": "loadTimeout",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10000,
    "required": false,
    "description": "Milliseconds to wait for the engine and the editor before showing the textarea fallback"
  },
  {
    "name": "unavailableText",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Message shown above the fallback textarea when the editor is unavailable"
  },
  {
    "name": "retryText",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the retry button"
  },
  {
    "name": "retryLabel",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the retry button"
  },
  {
    "name": "loadingLabel",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the loading indicator"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/MonacoCodeEditor/types.ts",
    "kind": "function",
    "typeText": "(value: string) => void",
    "typeRef": "type:5f47b77fbcbd0aeb06d1",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true,
    "description": "Called with the new source text"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "MonacoCodeEditorProps": {
    "source": "react/src/components/MonacoCodeEditor/types.ts",
    "description": "Props of `MonacoCodeEditor` (published from `minerva-design/monaco`)",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "monaco",
        "type": "Monaco",
        "required": true,
        "description": "Local Monaco engine (`import * as monaco from \"monaco-editor\"`). One engine per application; configure its workers in the host. The editor is never loaded from a CDN"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Source text (controlled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": true,
        "description": "Called with the new source text"
      },
      {
        "name": "language",
        "type": "string",
        "required": false,
        "default": "\"plaintext\"",
        "description": "Monaco language id"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Visible label, also the accessible name of the editor"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "default": "420",
        "description": "Height of the editor in pixels, clamped to [minHeight, maxHeight]"
      },
      {
        "name": "minHeight",
        "type": "number",
        "required": false,
        "default": "160",
        "description": "Minimum height in pixels"
      },
      {
        "name": "maxHeight",
        "type": "number",
        "required": false,
        "default": "800",
        "description": "Maximum height in pixels"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the editor (and its fallback) read-only"
      },
      {
        "name": "theme",
        "type": "MonacoCodeEditorTheme",
        "required": false,
        "description": "Color theme. Defaults to the page theme: `data-theme` on `<html>`, then the ConfigProvider theme, then light"
      },
      {
        "name": "loadTimeout",
        "type": "number",
        "required": false,
        "default": "10000",
        "description": "Milliseconds to wait for the engine and the editor before showing the textarea fallback"
      },
      {
        "name": "unavailableText",
        "type": "string",
        "required": false,
        "default": "\"The editor is unavailable\" (localized)",
        "description": "Message shown above the fallback textarea when the editor is unavailable"
      },
      {
        "name": "retryText",
        "type": "string",
        "required": false,
        "default": "\"Retry\" (localized)",
        "description": "Text of the retry button"
      },
      {
        "name": "retryLabel",
        "type": "string",
        "required": false,
        "default": "\"Retry editor\" (localized)",
        "description": "Accessible label of the retry button"
      },
      {
        "name": "loadingLabel",
        "type": "string",
        "required": false,
        "default": "\"Loading editor\" (localized)",
        "description": "Accessible label of the loading indicator"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the root element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      }
    ]
  }
}
```

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

## Example: Lazy-loaded editor

The editor and the local engine (with its worker configured by the host) are loaded on demand. Without the engine the textarea fallback is shown.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, monaco-editor, react

Documentation context imports: none

### apps/docs/src/docs/pages/monaco-code-editor/demos/basic.tsx

```tsx
import { lazy, Suspense, useState } from "react";
import type { MonacoCodeEditorProps } from "minerva-design/monaco";

type EditorProps = Omit<MonacoCodeEditorProps, "monaco">;

// The editor and the local Monaco engine load on demand, in their own chunks.
const Editor = lazy(async () => {
  const { MonacoCodeEditor } = await import("minerva-design/monaco");
  // (A failed chunk load rejects here; wrap the Suspense in an error
  // boundary in apps that must survive it.)
  // If the engine cannot load (offline build, blocked worker...), the editor
  // degrades to its editable textarea fallback.
  const engine = await import("../engine").then(
    (m) => m.monaco,
    () => undefined,
  );
  return {
    default: (props: EditorProps) => (
      <MonacoCodeEditor
        {...props}
        monaco={engine as unknown as MonacoCodeEditorProps["monaco"]}
      />
    ),
  };
});

export default function BasicDemo() {
  const [html, setHtml] = useState("<h1>Hello</h1>\n<p>Edit me.</p>\n");
  return (
    <Suspense fallback={<p>Loading editor…</p>}>
      <Editor
        label="HTML source"
        language="html"
        value={html}
        onChange={setHtml}
        height={240}
      />
    </Suspense>
  );
}

```

### apps/docs/src/docs/pages/monaco-code-editor/engine.ts

```tsx
// Local Monaco engine for the docs demo (never fetched from a CDN). Loaded
// on demand by demos/basic.tsx, so it stays out of the docs page chunk.
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = { getWorker: () => new EditorWorker() };

export { monaco };

```
