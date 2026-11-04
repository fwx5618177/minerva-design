# TimePicker 時刻選択

時・分・秒の列から時刻を選択するか、直接入力します。

Package: minerva-design@1.20.2

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で下矢印キーを押すとパネルが開きます。外側をクリックすると閉じます。

各列（時・分・秒・午前/午後）は listbox です。上下矢印キー、Home、End で列内を移動し、左右矢印キーで列を切り替えます。

Enter または Space でフォーカス中の選択肢を選びます。

Escape でパネルを閉じてフォーカスを入力欄に戻します。最後の列で Tab を押すとパネルが閉じて次のフィールドへ、最初の列で Shift+Tab を押すとパネルが閉じて入力欄に戻ります。

入力したテキストは、完全で有効な時刻になったときだけ確定されます。フォーカスが外れると緩やかな解析が行われ、空のテキストは値をクリアし、解析できないテキストは元の値に戻ります。

## TimePicker

Support: beta

Core strict/lenient typed parsing, controlled/default serialized time and null clear, seconds/format/12-hour mode, stepped hour/minute/second columns, bounds, labels/field flags, guarded opening and openchange. Native values use HH:mm[:ss] strings and null instead of Date/undefined; browser focus and keyboard panel navigation have native input equivalents. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/time-picker/index",
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
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": false
  },
  {
    "name": "start",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "end",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": "Select time"
  },
  {
    "name": "defaultValue",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "format",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "use12Hours",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showSecond",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "hourStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "minuteStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "secondStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "minTime",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "maxTime",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": "time-picker"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
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
    "name": "change",
    "typeText": "{ value: string | null }",
    "description": "Serialized HH:mm[:ss], or null on clear; Date is not transmitted across the native property boundary."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
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
