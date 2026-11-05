# LoadingState 読み込み状態

ページ・ルート・セクションの読み込み表示。装飾用の ProgressIndicator スピナーと表示ラベルを 1 つの polite なステータス領域にまとめます。

Package: minerva-design@1.21.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## LoadingState

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/loading-state",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label (alternative to the `label` attribute)"
  }
]
```

## API

```json
{
  "wc:minerva-loading-state": {
    "kind": "element",
    "source": "web-components/src/components/loading-state/loading-state.ts",
    "className": "MinervaLoadingState",
    "summary": "Loading placeholder for a page, route or section.",
    "description": "Page / route / section loading presentation (`<LoadingState>` of React): a decorative spinner next to a visible label, inside a single polite status region. It does not set `aria-busy`: mark the content container busy yourself.",
    "properties": [
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Visible text, also announced by the status region (default: localized \"Loading...\")"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Minimum height: small (section), medium (page / route) or large"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label (alternative to the `label` attribute)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The status region"
      },
      {
        "name": "spinner",
        "description": "The decorative spinner (wraps a ProgressIndicator in React; the <minerva-progress> element in the web components)"
      },
      {
        "name": "label",
        "description": "The label"
      }
    ],
    "cssProperties": [
      {
        "name": "--loading-state-gap",
        "description": "Space between the spinner and the label"
      },
      {
        "name": "--loading-state-padding",
        "description": "Padding"
      },
      {
        "name": "--loading-state-min-height",
        "description": "Minimum height (every size; defaults to the height of the size)"
      },
      {
        "name": "--loading-state-color",
        "description": "Color of the label and the spinner"
      },
      {
        "name": "--loading-state-font-size",
        "description": "Font size of the label"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:LoadingState": {
    "kind": "cssVars",
    "source": "react/src/components/LoadingState",
    "vars": [
      {
        "name": "--loading-state-gap",
        "description": "Space between the spinner and the label"
      },
      {
        "name": "--loading-state-padding",
        "description": "Padding"
      },
      {
        "name": "--loading-state-min-height",
        "description": "Minimum height (every size; defaults to the height of the size)"
      },
      {
        "name": "--loading-state-color",
        "description": "Color of the label and the spinner"
      },
      {
        "name": "--loading-state-font-size",
        "description": "Font size of the label"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

控えめな status 領域の中で、スピナーの横に表示ラベル（既定はローカライズされた「読み込み中...」）を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/wc/basic.html

```html
<div style="display: grid; gap: 16px">
  <minerva-loading-state></minerva-loading-state>
  <minerva-loading-state
    label="Loading your dashboard…"
  ></minerva-loading-state>
</div>

```

## Example: セクションの読み込み

この要素は aria-busy を設定しません。読み込み中はコンテナーをビジーにし、完了したらプレースホルダーをコンテンツに置き換えてください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/wc/section.html

```html
<div style="display: grid; gap: 12px">
  <div>
    <minerva-button id="refresh" size="small" variant="outline"
      >Refresh</minerva-button
    >
  </div>
  <section id="orders" aria-label="Recent orders" aria-busy="true">
    <minerva-loading-state
      id="spinner"
      size="small"
      label="Loading orders…"
    ></minerva-loading-state>
    <ul id="content" hidden style="margin: 0">
      <li>#1042 · Keyboard · shipped</li>
      <li>#1041 · Monitor · delivered</li>
      <li>#1040 · Headset · delivered</li>
    </ul>
  </section>
</div>

```

### apps/docs/src/docs/pages/loading-state/wc/section.ts

```tsx
// The loading state does not set aria-busy: mark the content container busy
// yourself while it loads, then swap the placeholder for the content.
export function setup(root: HTMLElement) {
  const orders = root.querySelector<HTMLElement>("#orders")!;
  const spinner = root.querySelector<HTMLElement>("#spinner")!;
  const content = root.querySelector<HTMLElement>("#content")!;
  const refresh = root.querySelector<HTMLElement>("#refresh")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const setBusy = (busy: boolean) => {
    orders.setAttribute("aria-busy", String(busy));
    spinner.hidden = !busy;
    content.hidden = busy;
  };
  const load = () => {
    setBusy(true);
    clearTimeout(timer);
    timer = setTimeout(() => setBusy(false), 1500);
  };
  load();
  refresh.addEventListener("click", load);
  return () => {
    clearTimeout(timer);
    refresh.removeEventListener("click", load);
  };
}

```

## Example: サイズ

small・medium・large で最小の高さを設定します。デフォルトスロットにリッチなラベルを置けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/wc/sizes.html

```html
<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  "
>
  <minerva-loading-state
    size="small"
    label="Section"
    style="border: 1px dashed var(--border-color)"
  ></minerva-loading-state>
  <minerva-loading-state
    size="medium"
    label="Page"
    style="border: 1px dashed var(--border-color)"
  ></minerva-loading-state>
  <minerva-loading-state
    size="large"
    style="border: 1px dashed var(--border-color)"
    >Loading <strong>reports</strong>…</minerva-loading-state
  >
</div>

```
