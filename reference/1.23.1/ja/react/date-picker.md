# DatePicker 日付選択

ポップアップの月曜始まりカレンダーグリッドから日付を選択するか、YYYY-MM-DD 形式で直接入力します。

Package: minerva-design@1.23.1

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で下矢印キーを押すとポップアップカレンダーが開き、アクティブな日のセルにフォーカスが移動します。外側をクリックすると閉じます。

矢印キー、Home / End、PageUp / PageDown（Shift 併用で 1 年）でカレンダーグリッド内のフォーカスを移動します。

Enter または Space でフォーカス中の日を選択し、ポップアップを閉じます。

Escape でポップアップを閉じてフォーカスを入力欄に戻します。

入力したテキストが範囲内の完全な YYYY-MM-DD 日付になると即座に確定されます。フォーカスが外れると YYYY/M/D などの柔軟な形式も正規化されます。

## DatePicker

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | null | undefined",
    "typeRef": "type:5d93807f845ffb9259f1",
    "required": false,
    "description": "Selected date as `\"YYYY-MM-DD\"` (controlled; pair with `onChange`). `\"\"` or `null` means \"no date\" while staying controlled; `undefined` makes the picker uncontrolled."
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected date as `\"YYYY-MM-DD\"` (uncontrolled)"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the input"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label of the input; without it the input is labelled \"Date\" (localized)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the input when no visible label is shown"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the input; defaults to the id of an enclosing FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as required; defaults to the enclosing FormControl's state"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "date-picker",
    "required": false,
    "description": "Name of the input"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the picker; defaults to the enclosing FormControl's state"
  },
  {
    "name": "clearable",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Allows clearing the value with the suffix button"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false,
    "description": "Size of the input"
  },
  {
    "name": "minDate",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Earliest selectable date (`\"YYYY-MM-DD\"`); earlier days are disabled"
  },
  {
    "name": "maxDate",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Latest selectable date (`\"YYYY-MM-DD\"`); later days are disabled"
  },
  {
    "name": "locale",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the month heading (`Intl.DateTimeFormat`)"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:9ae0989a2dc6d4ff1d09",
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
    "description": "Called with the selected date (`\"YYYY-MM-DD\"`), or `\"\"` when the value is cleared"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:f1732a1ac5226db324f6",
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
    "description": "Called when the popup calendar opens or closes"
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
  "DatePickerProps": {
    "source": "react/src/components/DatePicker/types.ts",
    "description": "Props of DatePicker; `data-*` attributes are forwarded to the root element",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the <input> element"
      },
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "description": "Selected date as `\"YYYY-MM-DD\"` (controlled; pair with `onChange`). `\"\"` or `null` means \"no date\" while staying controlled; `undefined` makes the picker uncontrolled."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected date as `\"YYYY-MM-DD\"` (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the selected date (`\"YYYY-MM-DD\"`), or `\"\"` when the value is cleared"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Select date\" (localized)",
        "description": "Placeholder of the input"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Visible label of the input; without it the input is labelled \"Date\" (localized)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the input when no visible label is shown"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the input; defaults to the id of an enclosing FormControl"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as required; defaults to the enclosing FormControl's state"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"date-picker\"",
        "description": "Name of the input"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the popup calendar opens or closes"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the picker; defaults to the enclosing FormControl's state"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Allows clearing the value with the suffix button"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of the input"
      },
      {
        "name": "minDate",
        "type": "string",
        "required": false,
        "description": "Earliest selectable date (`\"YYYY-MM-DD\"`); earlier days are disabled"
      },
      {
        "name": "maxDate",
        "type": "string",
        "required": false,
        "description": "Latest selectable date (`\"YYYY-MM-DD\"`); later days are disabled"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the library language",
        "description": "Locale of the month heading (`Intl.DateTimeFormat`)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
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

### apps/docs/src/docs/pages/date-picker/demos/basic.tsx

```tsx
import { useState } from "react";
import { DatePicker } from "minerva-design";

export default function BasicDemo() {
  const [date, setDate] = useState("");

  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker onChange={setDate} />
      <p>Selected: {date || "none"}</p>
    </div>
  );
}

```

## Example: 制御モード

value を渡し、onChange で更新します。"" または null は制御モードのまま空の状態、undefined は非制御になります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Button, DatePicker } from "minerva-design";

export default function ControlledDemo() {
  const [date, setDate] = useState<string | null>("2026-04-17");

  return (
    <div
      style={{ display: "grid", gap: 12, justifyItems: "start", maxWidth: 280 }}
    >
      <DatePicker
        label="Target date"
        value={date}
        onChange={(next) => setDate(next || null)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="small" onClick={() => setDate("2026-05-01")}>
          Set to 2026-05-01
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setDate(null)}
        >
          Reset
        </Button>
      </div>
      <p>Value: {date ?? "null"}</p>
    </div>
  );
}

```

## Example: 初期値とクリア

defaultValue で初期日付を設定します。クリアボタンのラベルは "Clear date"（日付をクリア）です。clearable={false} で非表示にできます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/default-value.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}

```

## Example: 無効・読み取り専用

無効または読み取り専用の状態ではパネルを開いたり編集したりできません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/disabled.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}

```

## Example: FormField との連携

FormControl / FormField 内では、DatePicker は id、label、ヘルプ／エラーテキスト、required、disabled、readOnly、invalid の状態を引き継ぎます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/form-control.tsx

```tsx
import { DatePicker, FormField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <FormField label="Start date" helperText="Format: YYYY-MM-DD" required>
        <DatePicker />
      </FormField>
      <FormField
        label="Deadline"
        errorMessage="Please choose a date in the future."
      >
        <DatePicker defaultValue="2026-01-01" />
      </FormField>
    </div>
  );
}

```

## Example: 日付の範囲

minDate と maxDate（"YYYY-MM-DD"）で許可範囲外の日付を無効にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/min-max.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function MinMaxDemo() {
  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue="2026-04-15"
        minDate="2026-04-10"
        maxDate="2026-04-20"
        placeholder="2026-04-10 – 2026-04-20"
      />
    </div>
  );
}

```

## Example: サイズ

small、medium（既定）、large の 3 サイズ。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/sizes.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}

```
