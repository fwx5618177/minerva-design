# Cascader カスケード選択

階層化された選択肢から段階的に値を選択します（例：国 / 地域 / 都市）。

Package: minerva-design@1.23.0

Renderer: uni

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

### キーボードとアクセシビリティ

入力欄で Enter、Space、下矢印キーを押すとパネルが開き、フォーカスがパネル内へ移ります。入力欄にフォーカスするだけでは開きません。

上下矢印キー、Home、End で列内を移動します。

右矢印キーまたは Enter で次の列を展開し（遅延読み込み後も同様）、Enter で末端の選択肢を選びます。左矢印キーで前の列に戻ります。

Escape でパネルを閉じてフォーカスを入力欄に戻します。Tab でも閉じます。

入力欄は combobox ロールを持ちます。既定のプレースホルダーと "Clear selection"（選択をクリア）ボタンのラベルは React 版のロケールに従います。

## Cascader

Support: beta

Shared core path resolution/search excluding disabled ancestors; controlled selection separate from intermediate expansion; defaults/model, custom filter/display, clear, lazy loadData, loading suppression, maxLevel, option slots, H5 column navigation and native confirm. Form state and numeric values are preserved. Option rendering uses native scoped slots instead of ReactNode callbacks. H5 hover/keys are supported; touch hosts use activation and keep keyboard focus in the input. Inline popup is not a DOM portal. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Cascader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "typeText": "Option[] | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "(string | number)[] | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "(string | number)[] | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "(string | number)[] | undefined",
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
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
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
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabelledby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaDescribedby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "changeOnSelect",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showSearch",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "allowClear",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "maxLevel",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "displayRender",
    "typeText": "((labels: string[], options: Option[]) => string) | undefined",
    "required": false
  },
  {
    "name": "filter",
    "typeText": "((input: string, path: Option[]) => boolean) | undefined",
    "required": false
  },
  {
    "name": "loadData",
    "typeText": "((path: Option[]) => void) | undefined",
    "required": false
  },
  {
    "name": "expandTrigger",
    "typeText": "\"click\" | \"hover\" | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dropdownStyle",
    "typeText": "CSSProperties | undefined",
    "required": false
  },
  {
    "name": "optionStyle",
    "typeText": "CSSProperties | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: (string | number)[], options: Option[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "(string | number)[]",
        "required": true,
        "rest": false
      },
      {
        "name": "options",
        "position": 1,
        "typeText": "Option[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: (string | number)[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "(string | number)[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
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
  }
]
```

### slots

```json
[
  {
    "name": "search-option",
    "typeText": "{ path: Option[]; }"
  },
  {
    "name": "option",
    "typeText": "{ option: Option; level: number; }"
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
  "css:Cascader": {
    "kind": "cssVars",
    "source": "react/src/components/Cascader",
    "vars": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
