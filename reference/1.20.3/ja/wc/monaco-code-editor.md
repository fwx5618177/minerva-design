# MonacoCodeEditor Monaco コードエディター

ローカルエンジン（CDN は使いません）で動作し、ページのテーマに追従するラベル付き Monaco エディターです。エンジンが時間内に読み込めない場合は、再試行ボタン付きの編集可能なテキストエリアに切り替わります。minerva-design/monaco からインポートします。@monaco-editor/react と monaco-editor は任意の peer 依存です。 Web Component の <minerva-code-editor> はオプションのエントリ minerva-design/web-components/code-editor として公開され（オールインワンのエントリと CDN バンドルには含まれません）、monaco-editor がオプションの peer 依存関係です。

Package: minerva-design@1.20.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeEditor

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## MonacoCodeEditor

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/code-editor",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "language",
    "typeText": "string",
    "attribute": "language",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "height",
    "typeText": "number",
    "attribute": "height",
    "required": false
  },
  {
    "name": "minHeight",
    "typeText": "number",
    "attribute": "min-height",
    "required": false
  },
  {
    "name": "maxHeight",
    "typeText": "number",
    "attribute": "max-height",
    "required": false
  },
  {
    "name": "theme",
    "typeText": "\"light\" | \"dark\" | undefined",
    "attribute": "theme",
    "required": false
  },
  {
    "name": "loadTimeout",
    "typeText": "number",
    "attribute": "load-timeout",
    "required": false
  },
  {
    "name": "unavailableText",
    "typeText": "string | undefined",
    "attribute": "unavailable-text",
    "required": false
  },
  {
    "name": "retryText",
    "typeText": "string | undefined",
    "attribute": "retry-text",
    "required": false
  },
  {
    "name": "retryLabel",
    "typeText": "string | undefined",
    "attribute": "retry-label",
    "required": false
  },
  {
    "name": "loadingLabel",
    "typeText": "string | undefined",
    "attribute": "loading-label",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean",
    "attribute": "required",
    "required": false
  },
  {
    "name": "monaco",
    "typeText": "CodeEditorEngine | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "input",
    "typeText": "Event",
    "description": "The value changed (each edit; composed)"
  },
  {
    "name": "change",
    "typeText": "Event",
    "description": "The value was committed (the editor lost focus after an edit)"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent",
    "description": "Same as `input`, with `detail: { value }` (the React library's `onChange`)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent",
    "description": "Same as `change`, with `detail: { value }`"
  },
  {
    "name": "minerva-error",
    "typeText": "CustomEvent",
    "description": "The editor became unavailable and the textarea fallback is shown"
  }
]
```

### slots

```json
[
  {
    "name": "editor",
    "description": "Created by the element: the light DOM container Monaco renders into"
  }
]
```

## API

```json
{
  "wc:minerva-code-editor": {
    "kind": "element",
    "source": "web-components/src/components/code-editor/code-editor.ts",
    "className": "MinervaCodeEditor",
    "summary": "Monaco code editor (local engine) with theme sync and a textarea fallback.",
    "description": "A labelled Monaco code editor running on a local engine (never loaded from a CDN), following the theme of its scope (the React library's `MonacoCodeEditor`, published from `minerva-design/monaco`). When the engine is missing, cannot create the editor in time (`load-timeout`) or throws, it degrades to an editable `<textarea>` with a Retry button. Published as the optional entry `minerva-design/web-components/code-editor` (not part of the all-in-one entry nor the CDN bundle): it requires the optional peer dependency `monaco-editor`. Pass the engine as a property: `editor.monaco = monaco` (`import * as monaco from \"monaco-editor\"`; one engine per application, configure its workers in the host). Until it is set the element shows its loading state; without it after `load-timeout` it falls back to the textarea, and setting it later loads the editor. Monaco renders into a light DOM child (`<div slot=\"editor\">`, created by the element) so the stylesheets Monaco injects into the document apply. Theme: the `theme` attribute, else the closest `data-theme` (a `<minerva-config>` scope, then `<html>`), followed live. Monaco themes are global to the engine (as with React): the last editor to apply its theme wins for all editors of the page. Form-associated: submits `value` under `name`, supports `required`, `form.reset()` (back to the `value` attribute) and `<fieldset disabled>`.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initial source text, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "language",
        "attribute": "language",
        "type": "string",
        "default": "\"plaintext\"",
        "description": "Monaco language id"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible label, also the accessible name of the editor"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "number",
        "default": "420",
        "description": "Height of the editor in pixels, clamped to [min-height, max-height]"
      },
      {
        "name": "minHeight",
        "attribute": "min-height",
        "type": "number",
        "default": "160",
        "description": "Minimum height in pixels"
      },
      {
        "name": "maxHeight",
        "attribute": "max-height",
        "type": "number",
        "default": "800",
        "description": "Maximum height in pixels"
      },
      {
        "name": "theme",
        "attribute": "theme",
        "type": "\"light\" | \"dark\" | undefined",
        "description": "Color theme; defaults to the theme of the element's scope"
      },
      {
        "name": "loadTimeout",
        "attribute": "load-timeout",
        "type": "number",
        "default": "10000",
        "description": "Milliseconds to wait for the engine and the editor before showing the textarea fallback"
      },
      {
        "name": "unavailableText",
        "attribute": "unavailable-text",
        "type": "string | undefined",
        "description": "Message shown above the fallback (default: localized \"The editor is unavailable\")"
      },
      {
        "name": "retryText",
        "attribute": "retry-text",
        "type": "string | undefined",
        "description": "Text of the retry button (default: localized \"Retry\")"
      },
      {
        "name": "retryLabel",
        "attribute": "retry-label",
        "type": "string | undefined",
        "description": "Accessible label of the retry button (default: localized \"Retry editor\")"
      },
      {
        "name": "loadingLabel",
        "attribute": "loading-label",
        "type": "string | undefined",
        "description": "Accessible label of the loading indicator (default: localized \"Loading editor\")"
      },
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Name submitted with the form data"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control (not focusable, not submitted, not validated)"
      },
      {
        "name": "required",
        "attribute": "required",
        "type": "boolean",
        "default": "false",
        "description": "The control must have a value for the form to be submitted"
      },
      {
        "name": "monaco",
        "type": "CodeEditorEngine | undefined",
        "description": "Local Monaco engine (`import * as monaco from \"monaco-editor\"`); never loaded from a CDN"
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Source text (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "resolvedTheme",
        "type": "\"light\" | \"dark\"",
        "readonly": true,
        "description": "Theme actually applied: `theme`, else the scope's."
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the control is disabled (itself or by a disabled fieldset)."
      },
      {
        "name": "form",
        "type": "HTMLFormElement | null",
        "readonly": true,
        "description": "The form owning the element"
      },
      {
        "name": "labels",
        "type": "NodeList | null",
        "readonly": true,
        "description": "`<label>` elements associated with the element"
      },
      {
        "name": "validity",
        "type": "ValidityState | undefined",
        "readonly": true,
        "description": "Validity state (same as `<input>.validity`)"
      },
      {
        "name": "validationMessage",
        "type": "string",
        "readonly": true,
        "description": "Message describing the current validation error (empty when valid)"
      },
      {
        "name": "willValidate",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the element is a candidate for constraint validation"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "retry",
        "signature": "() => void",
        "description": "Tries to load the editor again (what the Retry button does)."
      },
      {
        "name": "checkValidity",
        "signature": "() => boolean",
        "description": "Checks validity; fires `invalid` when invalid."
      },
      {
        "name": "reportValidity",
        "signature": "() => boolean",
        "description": "Checks validity and shows the browser's validation message."
      },
      {
        "name": "setCustomValidity",
        "signature": "(message: string) => void",
        "description": "Sets (or clears, with `\"\"`) a custom validation error."
      },
      {
        "name": "formResetCallback",
        "signature": "() => void"
      },
      {
        "name": "formDisabledCallback",
        "signature": "(disabled: boolean) => void"
      },
      {
        "name": "formStateRestoreCallback",
        "signature": "(state: string | File | FormData | null) => void"
      }
    ],
    "events": [
      {
        "name": "input",
        "description": "The value changed (each edit; composed)"
      },
      {
        "name": "change",
        "description": "The value was committed (the editor lost focus after an edit)"
      },
      {
        "name": "minerva-input",
        "description": "Same as `input`, with `detail: { value }` (the React library's `onChange`)"
      },
      {
        "name": "minerva-change",
        "description": "Same as `change`, with `detail: { value }`"
      },
      {
        "name": "minerva-error",
        "description": "The editor became unavailable and the textarea fallback is shown"
      }
    ],
    "slots": [
      {
        "name": "editor",
        "description": "Created by the element: the light DOM container Monaco renders into"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The `role=\"group\"` root"
      },
      {
        "name": "label",
        "description": "The visible label"
      },
      {
        "name": "surface",
        "description": "The editor surface (sized by `height`)"
      },
      {
        "name": "loading",
        "description": "The loading indicator (while the editor loads)"
      },
      {
        "name": "error",
        "description": "The unavailable message and retry action (when the editor failed)"
      },
      {
        "name": "fallback",
        "description": "The fallback `<textarea>` (when the editor failed)"
      },
      {
        "name": "retry-button",
        "description": "The retry `<minerva-button>`"
      }
    ],
    "cssProperties": [
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

## Example: ローカルエンジン、テーマ、フォーム

オプションのエントリ minerva-design/web-components/code-editor とアプリ自身の Monaco エンジンを読み込み、monaco プロパティに設定します。エディターはページ / <minerva-config> のテーマに従い、編集ごとに minerva-input（React の onChange）を発火し、フォームと一緒に値を送信します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, monaco-editor

Documentation context imports: none

### apps/docs/src/docs/pages/monaco-code-editor/wc/basic.html

```html
<form id="source-form" style="display: grid; gap: 8px">
  <minerva-code-editor
    id="html-editor"
    name="source"
    label="HTML source"
    language="html"
    height="240"
    value="<h1>Hello</h1>&#10;<p>Edit me.</p>&#10;"
  ></minerva-code-editor>
  <p style="margin: 0">
    <minerva-button type="submit" size="small">Submit</minerva-button>
    <output id="html-length"></output>
  </p>
</form>

```

### apps/docs/src/docs/pages/monaco-code-editor/wc/basic.ts

```tsx
// The editor runs on the app's own Monaco engine (never a CDN): load the
// optional entry and the engine, then pass it as the `monaco` property. It
// follows the page / <minerva-config> theme and submits its value with the
// form. In an app:
//   import "minerva-design/web-components/code-editor";
//   import * as monaco from "monaco-editor"; // + workers (MonacoEnvironment)
//   editor.monaco = monaco;
import type { CodeEditorEngine } from "minerva-design/web-components/code-editor";

export function setup(root: HTMLElement) {
  const editor = root.querySelector<
    HTMLElement & { monaco?: CodeEditorEngine; value: string }
  >("#html-editor")!;
  const form = root.querySelector<HTMLFormElement>("#source-form")!;
  const output = root.querySelector<HTMLOutputElement>("#html-length")!;
  let cancelled = false;
  void Promise.all([
    import("minerva-design/web-components/code-editor"),
    // If the engine cannot load, the editor falls back to its textarea
    import("../engine").then(
      (m) => m.monaco,
      () => undefined,
    ),
  ]).then(([, engine]) => {
    if (!cancelled && engine) editor.monaco = engine;
  });
  const onInput = () => {
    output.value = `${editor.value.length} characters`;
  };
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const source = String(new FormData(form).get("source") ?? "");
    output.value = `Submitted ${source.length} characters`;
  };
  editor.addEventListener("minerva-input", onInput);
  form.addEventListener("submit", onSubmit);
  return () => {
    cancelled = true;
    editor.removeEventListener("minerva-input", onInput);
    form.removeEventListener("submit", onSubmit);
  };
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

## Example: 読み込み、フォールバック、後からのエンジン

エンジンがない間は読み込み状態を表示し、load-timeout 後に編集可能な textarea と再試行ボタンを表示します（minerva-error が発火）。後からエンジンを渡すと最新の値でエディターが読み込まれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, monaco-editor

Documentation context imports: none

### apps/docs/src/docs/pages/monaco-code-editor/wc/fallback.html

```html
<minerva-code-editor
  id="fallback-editor"
  label="JSON settings"
  language="json"
  height="180"
  load-timeout="1500"
  value='{ "theme": "dark" }'
></minerva-code-editor>
<p style="margin: 8px 0 0; display: flex; gap: 8px; align-items: center">
  <minerva-button
    id="load-engine"
    size="small"
    variant="outline"
    color="neutral"
    >Provide the engine</minerva-button
  >
  <output id="fallback-status">Waiting for an engine…</output>
</p>

```

### apps/docs/src/docs/pages/monaco-code-editor/wc/fallback.ts

```tsx
// Without an engine the editor shows its loading state, then (after
// load-timeout) an editable textarea with a Retry button: the value is kept
// and still submitted. Setting `monaco` later loads the editor with the
// latest value.
import type { CodeEditorEngine } from "minerva-design/web-components/code-editor";

export function setup(root: HTMLElement) {
  const editor = root.querySelector<
    HTMLElement & { monaco?: CodeEditorEngine }
  >("#fallback-editor")!;
  const button = root.querySelector<HTMLElement>("#load-engine")!;
  const status = root.querySelector<HTMLOutputElement>("#fallback-status")!;
  void import("minerva-design/web-components/code-editor");
  const onError = () => {
    status.value = "Engine unavailable: textarea fallback";
  };
  const onClick = async () => {
    const engine = await import("../engine").then(
      (m) => m.monaco,
      () => undefined,
    );
    if (!engine) return;
    editor.monaco = engine;
    status.value = "Engine provided";
  };
  editor.addEventListener("minerva-error", onError);
  button.addEventListener("click", onClick);
  return () => {
    editor.removeEventListener("minerva-error", onError);
    button.removeEventListener("click", onClick);
  };
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
