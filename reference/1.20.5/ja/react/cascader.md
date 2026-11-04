# Cascader カスケード選択

階層化された選択肢から段階的に値を選択します（例：国 / 地域 / 都市）。

Package: minerva-design@1.20.5

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で Enter、Space、下矢印キーを押すとパネルが開き、フォーカスがパネル内へ移ります。入力欄にフォーカスするだけでは開きません。

上下矢印キー、Home、End で列内を移動します。

右矢印キーまたは Enter で次の列を展開し（遅延読み込み後も同様）、Enter で末端の選択肢を選びます。左矢印キーで前の列に戻ります。

Escape でパネルを閉じてフォーカスを入力欄に戻します。Tab でも閉じます。

入力欄は combobox ロールを持ちます。既定のプレースホルダーと "Clear selection"（選択をクリア）ボタンのラベルは React 版のロケールに従います。

## Cascader

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "label",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Label of the input"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Name of the input"
  },
  {
    "name": "options",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "array",
    "typeText": "CascaderOption[]",
    "typeRef": "type:fb01bf79af86c266acb1",
    "required": true,
    "description": "Option tree"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false,
    "description": "Selected path of values (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false,
    "description": "Initially selected path of values (uncontrolled)"
  },
  {
    "name": "displayRender",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((labels: string[], selectedOptions: CascaderOption[]) => string) | undefined",
    "typeRef": "type:5d520cc4099ed6070916",
    "parameters": [
      {
        "name": "labels",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      },
      {
        "name": "selectedOptions",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the text shown in the input; by default labels are joined with \" / \""
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the cascader; defaults to the enclosing FormControl's state"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the input"
  },
  {
    "name": "allowClear",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows a clear button when a value is selected"
  },
  {
    "name": "expandTrigger",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "enum",
    "values": [
      "click",
      "hover"
    ],
    "typeText": "\"click\" | \"hover\" | undefined",
    "typeRef": "type:00a6c9839f5572025301",
    "default": "click",
    "required": false,
    "description": "How sub-menus are expanded"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the input; overrides `label` and the label of an enclosing FormControl"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the input; defaults to the id of an enclosing FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as required (aria-required); defaults to the enclosing FormControl's state"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value without allowing changes (the dropdown does not open); defaults to the enclosing FormControl's state"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
  },
  {
    "name": "showSearch",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Allows typing to search all paths"
  },
  {
    "name": "filter",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((inputValue: string, path: CascaderOption[]) => boolean) | undefined",
    "typeRef": "type:22976bcc35782cae0650",
    "parameters": [
      {
        "name": "inputValue",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "path",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false,
    "description": "Custom search predicate; by default paths whose labels contain the input match"
  },
  {
    "name": "loadData",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((selectedOptions: CascaderOption[]) => void) | undefined",
    "typeRef": "type:697054a38914863f2613",
    "parameters": [
      {
        "name": "selectedOptions",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Loads children lazily: clicking an option that has no children and is not isLeaf expands it and calls loadData with its path (instead of selecting it). Add the children to `options` yourself; set `loading` on the option meanwhile"
  },
  {
    "name": "dropdownClassName",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Additional class name of the dropdown"
  },
  {
    "name": "optionRender",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "node",
    "typeText": "((option: CascaderOption, level: number) => ReactNode) | undefined",
    "typeRef": "type:221c09633fe99cfd9da3",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption",
        "typeRef": "type:d475b7caa061b4ecc3dc"
      },
      {
        "name": "level",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Custom option renderer"
  },
  {
    "name": "width",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 240,
    "required": false,
    "description": "Width of the component"
  },
  {
    "name": "maxLevel",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 6,
    "required": false,
    "description": "Maximum number of levels shown"
  },
  {
    "name": "dropdownStyle",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:40d68ed00bb536ce8766",
    "required": false,
    "description": "Inline styles of the dropdown"
  },
  {
    "name": "optionStyle",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:40d68ed00bb536ce8766",
    "required": false,
    "description": "Inline styles of every option"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((value: (string | number)[], selectedOptions: CascaderOption[]) => void) | undefined",
    "typeRef": "type:92f5df597f431330bdae",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "(string | number)[]",
        "typeRef": "type:6a8218963ce603035852"
      },
      {
        "name": "selectedOptions",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a leaf option is selected or the value is cleared"
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
  "CascaderProps": {
    "source": "react/src/components/Cascader/types.ts",
    "description": "Props of Cascader; `data-*` attributes are forwarded to the root element",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the inner <input> element"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Label of the input"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of the input"
      },
      {
        "name": "options",
        "type": "CascaderOption[]",
        "required": true,
        "default": "[]",
        "description": "Option tree"
      },
      {
        "name": "value",
        "type": "(string | number)[]",
        "required": false,
        "description": "Selected path of values (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "(string | number)[]",
        "required": false,
        "description": "Initially selected path of values (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: (string | number)[], selectedOptions: CascaderOption[]) => void",
        "required": false,
        "description": "Called when a leaf option is selected or the value is cleared"
      },
      {
        "name": "displayRender",
        "type": "(labels: string[], selectedOptions: CascaderOption[]) => string",
        "required": false,
        "description": "Formats the text shown in the input; by default labels are joined with \" / \""
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the cascader; defaults to the enclosing FormControl's state"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Please select\" (localized)",
        "description": "Placeholder of the input"
      },
      {
        "name": "allowClear",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows a clear button when a value is selected"
      },
      {
        "name": "expandTrigger",
        "type": "\"click\" | \"hover\"",
        "required": false,
        "default": "\"click\"",
        "description": "How sub-menus are expanded"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the input; overrides `label` and the label of an enclosing FormControl"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) labelling the input"
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
        "description": "Marks the input as required (aria-required); defaults to the enclosing FormControl's state"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "description": "Shows the value without allowing changes (the dropdown does not open); defaults to the enclosing FormControl's state"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
      },
      {
        "name": "showSearch",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Allows typing to search all paths"
      },
      {
        "name": "filter",
        "type": "(inputValue: string, path: CascaderOption[]) => boolean",
        "required": false,
        "description": "Custom search predicate; by default paths whose labels contain the input match"
      },
      {
        "name": "loadData",
        "type": "(selectedOptions: CascaderOption[]) => void",
        "required": false,
        "description": "Loads children lazily: clicking an option that has no children and is not isLeaf expands it and calls loadData with its path (instead of selecting it). Add the children to `options` yourself; set `loading` on the option meanwhile"
      },
      {
        "name": "dropdownClassName",
        "type": "string",
        "required": false,
        "description": "Additional class name of the dropdown"
      },
      {
        "name": "optionRender",
        "type": "(option: CascaderOption, level: number) => ReactNode",
        "required": false,
        "description": "Custom option renderer"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "240",
        "description": "Width of the component"
      },
      {
        "name": "maxLevel",
        "type": "number",
        "required": false,
        "default": "6",
        "description": "Maximum number of levels shown"
      },
      {
        "name": "dropdownStyle",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the dropdown"
      },
      {
        "name": "optionStyle",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of every option"
      }
    ]
  },
  "CascaderOption": {
    "source": "react/src/components/Cascader/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string | number",
        "required": true,
        "description": "Value of the option, unique among its siblings"
      },
      {
        "name": "label",
        "type": "string | number",
        "required": true,
        "description": "Text displayed for the option"
      },
      {
        "name": "children",
        "type": "CascaderOption[]",
        "required": false,
        "description": "Options of the next level"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Prevents the option from being selected"
      },
      {
        "name": "isLeaf",
        "type": "boolean",
        "required": false,
        "description": "Marks the option as a leaf (no children to load) when using loadData"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": "Shows a loading indicator while its children are being loaded"
      }
    ]
  }
}
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

## Example: 基本的な使い方

入力欄をクリック（または Enter、Space、下矢印キー）してパネルを開き、選択肢をクリックして次の階層を開きます。末端の選択肢を選ぶと選択が完了します。ドロップダウンは列の数に応じて広がります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/basic.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function BasicDemo() {
  return <Cascader name="city" label="City" options={options} />;
}

```

## Example: 制御モード

value を渡して onChange で更新します。クリア時は空配列で onChange が呼ばれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function ControlledDemo() {
  const [value, setValue] = useState<(string | number)[]>([
    "fr",
    "idf",
    "paris",
  ]);

  return (
    <div>
      <Cascader
        name="city-controlled"
        label="City"
        options={options}
        value={value}
        onChange={(next) => setValue(next)}
        width={300}
      />
      <p>Value: {value.length ? JSON.stringify(value) : "(empty)"}</p>
    </div>
  );
}

```

## Example: 項目と階層のカスタマイズ

optionRender は各選択肢を階層とともに描画し、maxLevel は深さを制限し（最後の階層の選択肢は選択されます）、dropdownStyle / optionStyle でメニューを調整します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/custom-option.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";
import { FaGlobeEurope, FaMapMarkerAlt } from "react-icons/fa";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function CustomOptionDemo() {
  return (
    <Cascader
      name="region"
      label="Region (2 levels)"
      options={options}
      maxLevel={2}
      optionRender={(option, level) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {level === 0 ? <FaGlobeEurope /> : <FaMapMarkerAlt />}
          {option.label}
        </span>
      )}
      dropdownStyle={{ minWidth: 360 }}
      optionStyle={{ fontWeight: 500 }}
    />
  );
}

```

## Example: 初期値

defaultValue には各階層の値を並べたパスを指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/default-value.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function DefaultValueDemo() {
  return (
    <Cascader
      name="city-default"
      label="City"
      options={options}
      defaultValue={["jp", "kansai", "kyoto"]}
      width={300}
    />
  );
}

```

## Example: 無効状態

option.disabled で個別の項目を、disabled でコンポーネント全体を無効にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/disabled.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "a",
    label: "Warehouse A",
    children: [
      { value: "a1", label: "Shelf 1" },
      { value: "a2", label: "Shelf 2 (full)", disabled: true },
    ],
  },
  { value: "b", label: "Warehouse B (closed)", disabled: true },
];

export default function DisabledDemo() {
  return (
    <>
      <Cascader name="location" label="Location" options={options} />
      <Cascader
        name="location-disabled"
        label="Disabled"
        options={options}
        defaultValue={["a", "a1"]}
        disabled
      />
    </>
  );
}

```

## Example: 表示のカスタマイズ

displayRender で入力欄の表示テキストを整形します。この例では最後の階層のみを表示し、allowClear を無効にしています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/display-render.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function DisplayRenderDemo() {
  return (
    <Cascader
      name="city-display"
      label="City (last level only)"
      options={options}
      defaultValue={["fr", "ara", "lyon"]}
      displayRender={(labels) => labels[labels.length - 1] ?? ""}
      allowClear={false}
    />
  );
}

```

## Example: ホバーで展開

expandTrigger="hover" では、親項目にポインターを重ねるとサブメニューが開きます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/hover.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function HoverDemo() {
  return (
    <Cascader
      name="city-hover"
      label="City"
      options={options}
      expandTrigger="hover"
    />
  );
}

```

## Example: 遅延読み込み

子を持たず isLeaf でもない選択肢をクリックすると、選択する代わりに展開して loadData を呼びます。その選択肢に loading を設定し、届いた子を options に追加し、読み込んだ末端の選択肢には isLeaf: true を付けて選択できるようにします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/lazy-load.tsx

```tsx
import { useState } from "react";
import { Cascader, type CascaderOption } from "minerva-design";

const initialOptions: CascaderOption[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "docs", label: "Documentation", isLeaf: true },
];

export default function LazyLoadDemo() {
  const [options, setOptions] = useState(initialOptions);

  const loadData = (path: CascaderOption[]) => {
    const target = path[path.length - 1];
    const update = (patch: Partial<CascaderOption>) =>
      setOptions((prev) =>
        prev.map((option) =>
          option.value === target.value ? { ...option, ...patch } : option,
        ),
      );

    update({ loading: true });
    // Simulate a request
    setTimeout(() => {
      update({
        loading: false,
        // isLeaf: true marks the loaded options as selectable leaves;
        // without it, clicking them would call loadData again
        children: [
          {
            value: `${target.value}-team-a`,
            label: `${target.label} team A`,
            isLeaf: true,
          },
          {
            value: `${target.value}-team-b`,
            label: `${target.label} team B`,
            isLeaf: true,
          },
        ],
      });
    }, 800);
  };

  return (
    <Cascader
      name="team"
      label="Team"
      options={options}
      loadData={loadData}
      width={300}
    />
  );
}

```

## Example: 検索

showSearch で入力によりすべてのパスを絞り込めます。filter で一致条件をカスタマイズします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/search.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function SearchDemo() {
  return (
    <Cascader
      name="city-search"
      label="City"
      placeholder="Type to search"
      options={options}
      showSearch
      filter={(input, path) =>
        path.some((option) =>
          String(option.label).toLowerCase().includes(input.toLowerCase()),
        )
      }
      width={300}
    />
  );
}

```
