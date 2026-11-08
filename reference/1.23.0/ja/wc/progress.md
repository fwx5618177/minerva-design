# ProgressIndicator プログレスインジケーター

進捗を示します。スピナー、サークル、ウェーブ、バー、ドットバーで描かれる不確定の progressbar、または value を指定した確定的なバー／サークルです。

Package: minerva-design@1.23.0

Renderer: wc

Locale: ja

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

## ProgressIndicator

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/progress",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"spinner\" | \"bar\" | \"wave\" | \"circle\" | \"dottedBar\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | \"xlarge\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"current\"",
    "attribute": "color",
    "required": false
  },
  {
    "name": "value",
    "typeText": "number | undefined",
    "attribute": "value",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "showValue",
    "typeText": "boolean",
    "attribute": "show-value",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "decorative",
    "typeText": "boolean",
    "attribute": "decorative",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | undefined",
    "attribute": "width",
    "required": false
  },
  {
    "name": "full",
    "typeText": "boolean",
    "attribute": "full",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number, max: number) => string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "icon",
    "description": "Icon displayed before the indicator"
  },
  {
    "name": "label",
    "description": "Visible label (alternative to the `label` attribute)"
  }
]
```

## API

```json
{
  "wc:minerva-progress": {
    "kind": "element",
    "source": "web-components/src/components/progress/progress.ts",
    "className": "MinervaProgress",
    "summary": "Loading indicator (spinner, circle, wave, bars), determinate or not.",
    "description": "Loading indicator: spinner, circle, wave, bar or dotted bar (`<ProgressIndicator>` of React). Without `value` it is a `progressbar` without a value, named by `aria-label`, its visible `label`, or the localized \"Loading\". With `value`, the bar and circle variants become determinate (filled bar / arc, aria-valuenow, optional `show-value`); the other variants ignore it. Never focusable, so it can sit inside buttons. Set `decorative` when a surrounding element already announces the loading state.",
    "properties": [
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"spinner\" | \"bar\" | \"wave\" | \"circle\" | \"dottedBar\"",
        "default": "\"spinner\"",
        "description": "Indicator style"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | \"xlarge\"",
        "default": "\"medium\"",
        "description": "Indicator size"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"current\"",
        "default": "\"primary\"",
        "description": "Indicator color (\"current\" follows the text color)"
      },
      {
        "name": "value",
        "attribute": "value",
        "type": "number | undefined",
        "description": "Current progress: switches the bar and circle variants to determinate mode (clamped between 0 and max); other variants ignore it"
      },
      {
        "name": "max",
        "attribute": "max",
        "type": "number",
        "default": "100",
        "description": "Value that represents completion (non-positive values fall back to 100)"
      },
      {
        "name": "showValue",
        "attribute": "show-value",
        "type": "boolean",
        "default": "false",
        "description": "Shows the formatted value (a percentage by default)"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible text next to the indicator; also names the progressbar"
      },
      {
        "name": "decorative",
        "attribute": "decorative",
        "type": "boolean",
        "default": "false",
        "description": "Purely visual: no progressbar role, hidden from assistive technologies"
      },
      {
        "name": "width",
        "attribute": "width",
        "type": "string | undefined",
        "description": "Custom width (CSS value; ignored with `full`). Bars default to 200px"
      },
      {
        "name": "full",
        "attribute": "full",
        "type": "boolean",
        "default": "false",
        "description": "Stretches the indicator to the full width of its container"
      },
      {
        "name": "format",
        "type": "(value: number, max: number) => string | undefined",
        "description": "Formats the shown value (JS property); the result is also used as aria-valuetext"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "icon",
        "description": "Icon displayed before the indicator"
      },
      {
        "name": "label",
        "description": "Visible label (alternative to the `label` attribute)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The indicator (role=progressbar unless decorative); color current follows the text color"
      },
      {
        "name": "icon",
        "description": "The icon before the indicator"
      },
      {
        "name": "indicator",
        "description": "The indicator (ring, wave or bar; a filled bar or arc when determinate)"
      },
      {
        "name": "value",
        "description": "The formatted value of a determinate indicator"
      },
      {
        "name": "label",
        "description": "The visible label"
      }
    ],
    "cssProperties": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:ProgressIndicator": {
    "kind": "cssVars",
    "source": "react/src/components/ProgressIndicator",
    "vars": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

5 種類の不確定インジケーター。それぞれ label またはローカライズされた「読み込み中」で名前が付いた progressbar です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/progress/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center">
  <minerva-progress></minerva-progress>
  <minerva-progress variant="circle"></minerva-progress>
  <minerva-progress variant="wave"></minerva-progress>
  <minerva-progress variant="bar"></minerva-progress>
  <minerva-progress variant="dottedBar"></minerva-progress>
</div>

```

## Example: 確定的な進捗

value、max、show-value でバーとサークルが確定的なインジケーターになります。format JS プロパティで表示を変更できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/progress/wc/determinate.html

```html
<div style="display: grid; gap: 16px">
  <minerva-progress
    variant="bar"
    full
    value="2"
    max="5"
    show-value
    label="Lessons completed"
  ></minerva-progress>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
    <minerva-progress
      variant="circle"
      size="xlarge"
      value="40"
      show-value
      aria-label="Course progress"
    ></minerva-progress>
    <minerva-progress
      variant="bar"
      color="success"
      value="100"
      show-value
      aria-label="Done"
    ></minerva-progress>
    <minerva-progress
      variant="bar"
      color="danger"
      value="15"
      show-value
      aria-label="Overdue"
    ></minerva-progress>
  </div>
</div>

```

## Example: ラベル・アイコン・幅

表示ラベル（属性またはスロット）、icon スロット、カスタム幅、全幅、ボタン内の装飾用インジケーター。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/progress/wc/label-width.html

```html
<div style="display: grid; gap: 16px">
  <minerva-progress label="Uploading files…"></minerva-progress>
  <minerva-progress variant="bar" width="320px">
    <span slot="label">Importing <strong>contacts.csv</strong></span>
  </minerva-progress>
  <minerva-progress variant="wave" label="Syncing">
    <span slot="icon" aria-hidden="true">☁</span>
  </minerva-progress>
  <minerva-progress
    variant="dottedBar"
    full
    aria-label="Loading results"
  ></minerva-progress>
  <minerva-button disabled>
    <minerva-progress
      slot="start"
      decorative
      size="xsmall"
      color="current"
    ></minerva-progress>
    Saving…
  </minerva-button>
</div>

```

## Example: サイズと色

5 種類のサイズ。color="current" は周囲のテキスト色に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/progress/wc/sizes-colors.html

```html
<div style="display: grid; gap: 16px">
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
    <minerva-progress size="xsmall"></minerva-progress>
    <minerva-progress size="small"></minerva-progress>
    <minerva-progress size="medium"></minerva-progress>
    <minerva-progress size="large"></minerva-progress>
    <minerva-progress size="xlarge"></minerva-progress>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
    <minerva-progress color="primary" variant="circle"></minerva-progress>
    <minerva-progress color="neutral" variant="circle"></minerva-progress>
    <span style="color: var(--danger-color)">
      <minerva-progress color="current" variant="circle"></minerva-progress>
      current
    </span>
  </div>
</div>

```
