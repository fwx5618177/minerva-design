# AutoComplete オートコンプリート

入力中に一致する候補を提示するテキスト入力です。

Package: minerva-design@1.20.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

↓ / ↑ キーで表示中の候補を移動します（端で折り返します）。

Enter でアクティブな選択肢を選びます（無効な選択肢はスキップ）。周囲のフォームは送信されません。

Escape でドロップダウンを閉じ、フォーカスは入力欄に残ります。ドロップダウンが閉じている状態で Escape を押すとテキストを消去します（onChange は "" を受け取ります）。Modal や Popover の中ではドロップダウンだけが閉じます。

入力欄は combobox ロールを持ち、aria-expanded・aria-controls・aria-activedescendant で listbox の候補と関連付けられます。

## AutoComplete

Support: beta

Controlled/model/default text and owner rejection; numeric option identities; selection returns the option and fills its label; fillOnSelect, filter/sort, first/adjacent groups, loading/empty/option slots, autoHighlight, native confirm, H5 keys, IME guards and dropdown visibility events. Reuses Input for field props. Custom content uses native scoped slots instead of React renderOption/renderEmpty functions. Measured native fixed dropdown flips/shifts within the viewport and can animate; it does not use a DOM portal. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "AutoComplete"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Option[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "autoHighlight",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "fillOnSelect",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "filterOption",
    "typeText": "((input: string, option: Option) => boolean) | undefined",
    "required": false
  },
  {
    "name": "sortOption",
    "typeText": "((a: Option, b: Option) => number) | undefined",
    "required": false
  },
  {
    "name": "groupBy",
    "typeText": "((option: Option) => string) | undefined",
    "required": false
  },
  {
    "name": "groupMode",
    "typeText": "\"first\" | \"adjacent\" | undefined",
    "required": false
  },
  {
    "name": "inputProps",
    "typeText": "Record<string, any> | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placement",
    "typeText": "\"bottom\" | \"top\" | \"left\" | \"right\" | undefined",
    "required": false
  },
  {
    "name": "offset",
    "typeText": "{ x: number; y: number; } | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "select",
    "typeText": "[option: Option]",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "typeText": "Option",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "optionClick",
    "typeText": "[option: Option]",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "typeText": "Option",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "dropdownVisibleChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "submit",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "loading",
    "typeText": "{}"
  },
  {
    "name": "empty",
    "typeText": "{}"
  },
  {
    "name": "option",
    "typeText": "{ option: Option; }"
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
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
