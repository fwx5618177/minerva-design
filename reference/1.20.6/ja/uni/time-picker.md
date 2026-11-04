# TimePicker 時刻選択

時・分・秒の列から時刻を選択するか、直接入力します。

Package: minerva-design@1.20.6

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で下矢印キーを押すとパネルが開きます。外側をクリックすると閉じます。

各列（時・分・秒・午前/午後）は listbox です。上下矢印キー、Home、End で列内を移動し、左右矢印キーで列を切り替えます。

Enter または Space でフォーカス中の選択肢を選びます。

Escape でパネルを閉じてフォーカスを入力欄に戻します。最後の列で Tab を押すとパネルが閉じて次のフィールドへ、最初の列で Shift+Tab を押すとパネルが閉じて入力欄に戻ります。

入力したテキストは、完全で有効な時刻になったときだけ確定されます。フォーカスが外れると緩やかな解析が行われ、空のテキストは値をクリアし、解析できないテキストは元の値に戻ります。

## TimePicker

Support: beta

Typed HH:mm or HH:mm:ss, hour/minute/second steps, normalized constraints, locale labels, clear, keyboard time columns, original string change and open-change notifications; measured collision-aware popup. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TimePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | Date | null | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | Date | null | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | Date | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "use12Hours",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showSecond",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "hourStep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "minuteStep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "secondStep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "minTime",
    "typeText": "Date | undefined",
    "required": false
  },
  {
    "name": "maxTime",
    "typeText": "Date | undefined",
    "required": false
  },
  {
    "name": "start",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "end",
    "typeText": "string | undefined",
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
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "clearable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "name",
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
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: Date | undefined]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "Date | undefined",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: Date | undefined]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "Date | undefined",
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
  "css:TimePicker": {
    "kind": "cssVars",
    "source": "react/src/components/TimePicker",
    "vars": [
      {
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
