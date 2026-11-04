# TimePicker 時刻選択

時・分・秒の列から時刻を選択するか、直接入力します。

Package: minerva-design@1.20.6

Renderer: native

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

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | null | undefined",
    "typeRef": "type:4b2ab921fe33ea9fd1a2",
    "required": false
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false
  },
  {
    "name": "format",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "HH:mm:ss",
    "required": false
  },
  {
    "name": "use12Hours",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "clearable",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "showSecond",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "hourStep",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false
  },
  {
    "name": "minuteStep",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false
  },
  {
    "name": "secondStep",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false
  },
  {
    "name": "minTime",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false
  },
  {
    "name": "maxTime",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "function",
    "typeText": "((date: Date | undefined) => void) | undefined",
    "typeRef": "type:b1ce96b0681b6b0a7162",
    "parameters": [
      {
        "name": "date",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Date | undefined",
        "typeRef": "type:007ea92938c0789e072e"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:6d012db6d3c560a434e6",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
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
  "native:TimePickerProps": {
    "source": "native/src/components/TimePicker/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "Date | null",
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "Date",
        "required": false
      },
      {
        "name": "onChange",
        "type": "(date: Date | undefined) => void",
        "required": false
      },
      {
        "name": "format",
        "type": "string",
        "required": false,
        "default": "\"HH:mm:ss\""
      },
      {
        "name": "use12Hours",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "showSecond",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "hourStep",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "minuteStep",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "secondStep",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "minTime",
        "type": "Date",
        "required": false
      },
      {
        "name": "maxTime",
        "type": "Date",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false
      }
    ]
  }
}
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

## Example: 基本的な使い方

入力欄をクリック（または下矢印キー）してパネルを開きます。onChange は Date を受け取り、クリア時は undefined を受け取ります。label を指定しない場合、入力欄の名前は "Time"（時刻）になります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/native/basic.tsx

```tsx
import { TimePicker } from "minerva-design/native";
export default function Basic() {
  return (
    <TimePicker
      label="Appointment"
      defaultValue={new Date(2026, 0, 1, 13, 30)}
      use12Hours
      minuteStep={15}
      clearable
    />
  );
}

```
