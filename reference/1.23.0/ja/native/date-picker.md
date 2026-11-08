# DatePicker 日付選択

ポップアップの月曜始まりカレンダーグリッドから日付を選択するか、YYYY-MM-DD 形式で直接入力します。

Package: minerva-design@1.23.0

Renderer: native

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

入力欄で下矢印キーを押すとポップアップカレンダーが開き、アクティブな日のセルにフォーカスが移動します。外側をクリックすると閉じます。

矢印キー、Home / End、PageUp / PageDown（Shift 併用で 1 年）でカレンダーグリッド内のフォーカスを移動します。

Enter または Space でフォーカス中の日を選択し、ポップアップを閉じます。

Escape でポップアップを閉じてフォーカスを入力欄に戻します。

入力したテキストが範囲内の完全な YYYY-MM-DD 日付になると即座に確定されます。フォーカスが外れると YYYY/M/D などの柔軟な形式も正規化されます。

## DatePicker

Support: beta

Native touch field with calendar dialog: local YYYY-MM-DD values, immediate day selection, bounds and clearing; no text entry or DOM keyboard grid.

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "DatePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | null | undefined",
    "typeRef": "type:5d93807f845ffb9259f1",
    "required": false,
    "description": "Selected local date, YYYY-MM-DD. null and \"\" remain controlled empty values."
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initial local date while uncontrolled."
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label and accessible name."
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accessibilityHint",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "nativeID",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Prevents opening, selection and clearing."
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "clearable",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "size",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false
  },
  {
    "name": "minDate",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Earliest selectable local day, YYYY-MM-DD, inclusive."
  },
  {
    "name": "maxDate",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Latest selectable local day, YYYY-MM-DD, inclusive."
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale for calendar month and date names; defaults to provider language."
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:c7af8cf7b3809b32005e",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Selected YYYY-MM-DD day, or \"\" when cleared."
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:2ae3dcdc5c09f89e15f2",
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
    "required": false,
    "description": "Called when the calendar opens or closes."
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
  "native:DatePickerProps": {
    "source": "native/src/components/DatePicker/DatePicker.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "description": "Selected local date, YYYY-MM-DD. null and \"\" remain controlled empty values."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initial local date while uncontrolled."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Selected YYYY-MM-DD day, or \"\" when cleared."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the calendar opens or closes."
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Visible label and accessible name."
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "accessibilityHint",
        "type": "string",
        "required": false
      },
      {
        "name": "nativeID",
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
        "required": false,
        "description": "Prevents opening, selection and clearing."
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
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\""
      },
      {
        "name": "minDate",
        "type": "string",
        "required": false,
        "description": "Earliest selectable local day, YYYY-MM-DD, inclusive."
      },
      {
        "name": "maxDate",
        "type": "string",
        "required": false,
        "description": "Latest selectable local day, YYYY-MM-DD, inclusive."
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "description": "Locale for calendar month and date names; defaults to provider language."
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false
      },
      {
        "name": "testID",
        "type": "string",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:DatePicker": {
    "kind": "cssVars",
    "source": "react/src/components/DatePicker",
    "vars": [
      {
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

入力欄をクリック（または下矢印キー）してポップアップカレンダーを開きます。onChange は "YYYY-MM-DD" 文字列を受け取り、クリア時は "" を受け取ります。label を指定しない場合、入力欄の名前は "Date"（日付）になります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/native/basic.tsx

```tsx
import { useState } from "react";
import { DatePicker } from "minerva-design/native";

export default function Basic() {
  const [date, setDate] = useState<string | null>("2026-01-15");
  return (
    <DatePicker
      label="Departure"
      value={date}
      onChange={setDate}
      minDate="2026-01-10"
      maxDate="2026-02-20"
      clearable
    />
  );
}

```
