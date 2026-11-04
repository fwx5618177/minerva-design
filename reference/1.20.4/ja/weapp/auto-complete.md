# AutoComplete オートコンプリート

入力中に一致する候補を提示するテキスト入力です。

Package: minerva-design@1.20.4

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

↓ / ↑ キーで表示中の候補を移動します（端で折り返します）。

Enter でアクティブな選択肢を選びます（無効な選択肢はスキップ）。周囲のフォームは送信されません。

Escape でドロップダウンを閉じ、フォーカスは入力欄に残ります。ドロップダウンが閉じている状態で Escape を押すとテキストを消去します（onChange は "" を受け取ります）。Modal や Popover の中ではドロップダウンだけが閉じます。

入力欄は combobox ロールを持ち、aria-expanded・aria-controls・aria-activedescendant で listbox の候補と関連付けられます。

## AutoComplete

Support: beta

Controlled editable text, numeric/string option identity, label fill, disabled/loading guards, custom filtering/sorting/grouping via native instance configure(), native confirm selection, original option events. Function callbacks use selectComponent(...).configure({filterOption,groupBy,sortOption}) because WXML properties are serialized; option content supports label/description and empty slot instead of React render functions. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/auto-complete/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "options",
    "typeText": "array",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "groupMode",
    "typeText": "string",
    "required": false,
    "default": "first"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "fillOnSelect",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "autoHighlight",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "default": "No results"
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "openchange"
  }
]
```

### slots

```json
[
  {
    "name": "empty"
  }
]
```

## CSS variables

```json
{
  "css:AutoComplete": {
    "kind": "cssVars",
    "source": "react/src/components/AutoComplete",
    "vars": [
      {
        "name": "--auto-complete-dropdown-background",
        "description": "Background of the dropdown"
      },
      {
        "name": "--auto-complete-dropdown-radius",
        "description": "Corner radius of the dropdown (defaults to --radius-lg)"
      },
      {
        "name": "--auto-complete-dropdown-max-height",
        "description": "Maximum height of the option list before it scrolls"
      },
      {
        "name": "--auto-complete-font-size",
        "description": "Font size of the dropdown"
      },
      {
        "name": "--auto-complete-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--auto-complete-option-padding-x",
        "description": "Horizontal padding of an option and of a group label"
      },
      {
        "name": "--auto-complete-option-hover-background",
        "description": "Background of the hovered / keyboard-focused option"
      },
      {
        "name": "--auto-complete-option-highlight-background",
        "description": "Background of options with `highlight: true`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
