# SegmentedControl セグメントコントロール

モードやフィルターを切り替える単一選択のセグメントスイッチで、選択中のセグメントの下をサムがスライドします。各選択肢に独自のコンテンツパネルがある場合は Tabs を使用してください。

Package: minerva-design@1.23.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## SegmentedControl

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/segmented-control",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "options",
    "typeText": "SegmentedControlOption[]",
    "attribute": "options",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"neutral\" | \"primary\"",
    "attribute": "color",
    "required": false
  },
  {
    "name": "fullWidth",
    "typeText": "boolean",
    "attribute": "full-width",
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
    "name": "change",
    "typeText": "Event",
    "description": "The user selected another segment (like native radios)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:82efde8fd8e2d65a6766"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user selected another segment; `detail: { value }`"
  }
]
```

## API

```json
{
  "wc:minerva-segmented-control": {
    "kind": "element",
    "source": "web-components/src/components/segmented-control/segmented-control.ts",
    "className": "MinervaSegmentedControl",
    "summary": "Single-choice segmented switch with a sliding thumb.",
    "description": "A single-choice segmented switch for modes and filters (`<SegmentedControl>` of React): a `radiogroup` of `radio` segments sharing the width equally, with a thumb sliding under the selected segment. Use `<minerva-tabs>` when each choice has a content panel. Keyboard: one Tab stop (the selected segment, else the first enabled one); the arrow keys move and select, skipping disabled segments and wrapping (RTL-aware); Home / End select the first / last enabled segment. Form-associated: submits `value` under `name`, `required` makes it invalid while nothing is selected, and it supports `form.reset()` (restores the `value` attribute), `<fieldset disabled>` and state restoration. Name it with `aria-label`, `aria-labelledby` or `<label for>`.",
    "properties": [
      {
        "name": "options",
        "attribute": "options",
        "type": "SegmentedControlOption[]",
        "default": "[]",
        "description": "The segments (property; the attribute takes a JSON array or comma-separated values)"
      },
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initially selected value, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Segment density"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "\"neutral\" | \"primary\"",
        "default": "\"neutral\"",
        "description": "Thumb color"
      },
      {
        "name": "fullWidth",
        "attribute": "full-width",
        "type": "boolean",
        "default": "false",
        "description": "Fills the width of the container (the segments always share the width equally)"
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
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Selected value (property; the `value` attribute sets `defaultValue`)"
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
        "signature": "(options?: FocusOptions) => void",
        "description": "Focuses the selected segment (else the first enabled one)"
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
        "name": "change",
        "description": "The user selected another segment (like native radios)"
      },
      {
        "name": "minerva-change",
        "description": "The user selected another segment; `detail: { value }`"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The element with role=\"radiogroup\" (the track)"
      },
      {
        "name": "indicator",
        "description": "The sliding thumb under the selected segment"
      },
      {
        "name": "item",
        "description": "A segment (`role=radio`)"
      },
      {
        "name": "item--selected",
        "description": "Item state of `item`: selected"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "icon",
        "description": "The icon of a segment"
      },
      {
        "name": "label",
        "description": "The text label of a segment"
      }
    ],
    "cssProperties": [
      {
        "name": "--segmented-control-height",
        "description": "Height of the control (defaults to the density's control height)"
      },
      {
        "name": "--segmented-control-padding",
        "description": "Space between the track and the segments (defaults to 2px)"
      },
      {
        "name": "--segmented-control-radius",
        "description": "Corner radius of the track (defaults to --radius-md); the thumb follows it"
      },
      {
        "name": "--segmented-control-background",
        "description": "Background of the track (defaults to --surface-muted-color)"
      },
      {
        "name": "--segmented-control-color",
        "description": "Text color of the unselected segments"
      },
      {
        "name": "--segmented-control-item-padding-x",
        "description": "Inline padding of a segment"
      },
      {
        "name": "--segmented-control-thumb-background",
        "description": "Background of the thumb (defaults to --surface-elevated-color; --primary-color with color=\"primary\")"
      },
      {
        "name": "--segmented-control-thumb-shadow",
        "description": "Shadow of the thumb (defaults to --shadow-sm; none with color=\"primary\")"
      },
      {
        "name": "--segmented-control-selected-color",
        "description": "Text color of the selected segment"
      },
      {
        "name": "--segmented-control-duration",
        "description": "Duration of the thumb slide (defaults to --transition-base)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:SegmentedControl": {
    "kind": "cssVars",
    "source": "react/src/components/SegmentedControl",
    "vars": [
      {
        "name": "--segmented-control-height",
        "description": "Height of the control (defaults to the density's control height)"
      },
      {
        "name": "--segmented-control-padding",
        "description": "Space between the track and the segments (defaults to 2px)"
      },
      {
        "name": "--segmented-control-radius",
        "description": "Corner radius of the track (defaults to --radius-md); the thumb follows it"
      },
      {
        "name": "--segmented-control-background",
        "description": "Background of the track (defaults to --surface-muted-color)"
      },
      {
        "name": "--segmented-control-color",
        "description": "Text color of the unselected segments"
      },
      {
        "name": "--segmented-control-item-padding-x",
        "description": "Inline padding of a segment"
      },
      {
        "name": "--segmented-control-thumb-background",
        "description": "Background of the thumb (defaults to --surface-elevated-color; --primary-color with color=\"primary\")"
      },
      {
        "name": "--segmented-control-thumb-shadow",
        "description": "Shadow of the thumb (defaults to --shadow-sm; none with color=\"primary\")"
      },
      {
        "name": "--segmented-control-selected-color",
        "description": "Text color of the selected segment"
      },
      {
        "name": "--segmented-control-duration",
        "description": "Duration of the thumb slide (defaults to --transition-base)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

options は JSON 配列（またはカンマ区切りの値）の属性、またはプロパティです。value は初期選択を設定し、minerva-change が選択された値を通知します。タブストップは 1 つで、矢印キーで移動と選択を行います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/wc/basic.html

```html
<div style="display: grid; gap: 12px; justify-items: start">
  <minerva-segmented-control
    id="view"
    aria-label="Calendar view"
    options='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"}]'
    value="week"
  ></minerva-segmented-control>
  <output id="selected">Showing the week view</output>
</div>

```

### apps/docs/src/docs/pages/segmented-control/wc/basic.ts

```tsx
// options is a JSON (or comma-separated) attribute; minerva-change reports
// the selected value. One tab stop: the arrow keys move and select.
export function setup(root: HTMLElement) {
  const control = root.querySelector<HTMLElement>("#view")!;
  const output = root.querySelector<HTMLOutputElement>("#selected")!;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Showing the ${value} view`;
  };
  control.addEventListener("minerva-change", onChange);
  return () => control.removeEventListener("minerva-change", onChange);
}

```

## Example: 色と無効化

color="primary" はプライマリカラーの塗りのサムを表示します。無効なオプションと disabled 属性は選択をブロックします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/wc/colors.html

```html
<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    aria-label="Theme (neutral)"
    options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
    value="light"
  ></minerva-segmented-control>
  <minerva-segmented-control
    color="primary"
    aria-label="Theme (primary)"
    options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
    value="dark"
  ></minerva-segmented-control>
  <minerva-segmented-control
    disabled
    aria-label="Theme (disabled)"
    options="light,dark,system"
    value="light"
  ></minerva-segmented-control>
</div>

```

## Example: 全幅とフォーム

full-width でコントロールを広げます。フォーム関連要素なので、name で値を送信し、required で検証し、form.reset() で value 属性に戻ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/wc/full-width.html

```html
<form id="billing-form" style="display: grid; gap: 12px; max-width: 420px">
  <minerva-segmented-control
    full-width
    name="billing"
    aria-label="Billing period"
    options='[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly (−20%)"}]'
    value="yearly"
  ></minerva-segmented-control>
  <minerva-segmented-control
    full-width
    aria-label="Status filter"
    options="all,open,closed,archived"
    value="all"
  ></minerva-segmented-control>
</form>

```

## Example: アイコン

オプションオブジェクトは icon（テキスト、またはプロパティ経由の Node / lit テンプレート）と、アイコンのみのセグメント用の aria-label を受け取ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/wc/icons.html

```html
<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    aria-label="Layout"
    options='[{"value":"list","label":"List","icon":"☰"},{"value":"grid","label":"Grid","icon":"▦"},{"value":"map","label":"Map","icon":"⌖"}]'
    value="list"
  ></minerva-segmented-control>
  <minerva-segmented-control
    aria-label="Layout (compact)"
    options='[{"value":"list","icon":"☰","aria-label":"List"},{"value":"grid","icon":"▦","aria-label":"Grid"},{"value":"map","icon":"⌖","aria-label":"Map"}]'
    value="grid"
  ></minerva-segmented-control>
</div>

```

## Example: サイズ

3 つの密度（:state(size-small) などのカスタムステートも提供）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/wc/sizes.html

```html
<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    size="small"
    aria-label="Small"
    options="Daily,Weekly,Monthly"
    value="Daily"
  ></minerva-segmented-control>
  <minerva-segmented-control
    aria-label="Medium"
    options="Daily,Weekly,Monthly"
    value="Weekly"
  ></minerva-segmented-control>
  <minerva-segmented-control
    size="large"
    aria-label="Large"
    options="Daily,Weekly,Monthly"
    value="Monthly"
  ></minerva-segmented-control>
</div>

```
