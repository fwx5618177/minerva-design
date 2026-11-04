# Radio ラジオボタン

複数の選択肢から 1 つだけを選択します。RadioGroup で複数のラジオボタンの選択状態をまとめて管理します。

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
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Radio

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Radio"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the radio is checked (controlled). Ignored inside a RadioGroup"
  },
  {
    "name": "defaultChecked",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Initial checked state (uncontrolled). Ignored inside a RadioGroup"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the radio. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Native name attribute. Inside a RadioGroup the group's name is used"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Value of the radio; identifies it within a RadioGroup"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Radio/types.ts",
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
    "description": "Radio size. Overridden by the RadioGroup size when the group sets one"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:56ead6e033d723e3d471",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the checked radio. Overridden by the RadioGroup color when the group sets one"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label displayed next to the radio"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label, required when there is no visible label"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) labelling the radio"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the native <input> (e.g. for an external <label htmlFor>)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra ids describing the radio (merged with its helper / error text)"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the input as required"
  },
  {
    "name": "error",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state (errorMessage replaces helperText and describes the radio)"
  },
  {
    "name": "errorIcon",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon shown before the error message"
  },
  {
    "name": "errorMessage",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Message shown below the radio when error is true (linked with aria-describedby)"
  },
  {
    "name": "helperText",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Helper text shown below the radio (linked with aria-describedby)"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "function",
    "typeText": "((checked: boolean, event: ChangeEvent<HTMLInputElement, Element>) => void) | undefined",
    "typeRef": "type:c00a39d6a94c644bdf9a",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "event",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "ChangeEvent<HTMLInputElement, Element>",
        "typeRef": "type:2c785b2d98c38377d501"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the checked state changes (standalone radios only; inside a group use RadioGroup's onChange)"
  }
]
```

### slots

```json
[
  {
    "name": "children"
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

## RadioGroup

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "RadioGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "union",
    "typeText": "string | number | null | undefined",
    "typeRef": "type:79b06841b89c21f1e8d0",
    "required": false,
    "description": "Value of the selected radio (controlled; `null` = controlled with no selection)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Initially selected value (uncontrolled)"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name shared by all radios of the group (a unique name is generated when omitted, so arrow-key navigation always works)"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible label of the group; also its accessible name"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the group when there is no visible label"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) labelling the group (takes precedence over the visible `label` and the enclosing FormControl label)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra ids describing the group (merged with its helper / error text)"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id of the element with role=\"radiogroup\""
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables every radio in the group (inherited from an enclosing FormControl when not set)"
  },
  {
    "name": "direction",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "typeRef": "type:4e4ac2a46972f482e8a6",
    "default": "vertical",
    "required": false,
    "description": "Layout direction of the radios"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false,
    "description": "Size applied to every radio in the group; when not set each radio uses its own size"
  },
  {
    "name": "error",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state (also set by an invalid enclosing FormControl)"
  },
  {
    "name": "helperText",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Helper text shown below the group (linked with aria-describedby)"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the group as required (aria-required; inherited from an enclosing FormControl)"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:56ead6e033d723e3d471",
    "required": false,
    "description": "Semantic color applied to every radio in the group (overrides the radios' own color); when not set each radio uses its own color"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Radio/types.ts",
    "kind": "function",
    "typeText": "((value: string | number, event: ChangeEvent<HTMLInputElement, Element>) => void) | undefined",
    "typeRef": "type:52fb4a6deef88a8350b2",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string | number",
        "typeRef": "type:db6728f51c2e69f0d2ca"
      },
      {
        "name": "event",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "ChangeEvent<HTMLInputElement, Element>",
        "typeRef": "type:2c785b2d98c38377d501"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the newly selected value"
  }
]
```

### slots

```json
[
  {
    "name": "children"
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
  "RadioProps": {
    "source": "react/src/components/Radio/types.ts",
    "description": "`className`, `style` and `data-*` attributes go to the root wrapper; `id`, `name` and `aria-*` go to the native <input>.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Whether the radio is checked (controlled). Ignored inside a RadioGroup"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "description": "Initial checked state (uncontrolled). Ignored inside a RadioGroup"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the radio. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Native name attribute. Inside a RadioGroup the group's name is used"
      },
      {
        "name": "value",
        "type": "string | number",
        "required": false,
        "description": "Value of the radio; identifies it within a RadioGroup"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Called when the checked state changes (standalone radios only; inside a group use RadioGroup's onChange)"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Radio size. Overridden by the RadioGroup size when the group sets one"
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"primary\" | \"success\" | \"warning\" | \"danger\">",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the checked radio. Overridden by the RadioGroup color when the group sets one"
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label displayed next to the radio"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label content (alternative to `label`; used when `label` is not set)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label, required when there is no visible label"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) labelling the radio"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the native <input> (e.g. for an external <label htmlFor>)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra ids describing the radio (merged with its helper / error text)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name of the root wrapper"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root wrapper"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the input as required"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the error state (errorMessage replaces helperText and describes the radio)"
      },
      {
        "name": "errorIcon",
        "type": "React.ReactNode",
        "required": false,
        "default": "a filled info-circle icon",
        "description": "Icon shown before the error message"
      },
      {
        "name": "errorMessage",
        "type": "string",
        "required": false,
        "description": "Message shown below the radio when error is true (linked with aria-describedby)"
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Helper text shown below the radio (linked with aria-describedby)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the native <input type=\"radio\"> element"
      }
    ]
  },
  "RadioGroupProps": {
    "source": "react/src/components/Radio/types.ts",
    "description": "`className`, `style` and `data-*` attributes go to the root wrapper; `id` and `aria-*` go to the element with role=\"radiogroup\".",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "value",
        "type": "string | number | null",
        "required": false,
        "description": "Value of the selected radio (controlled; `null` = controlled with no selection)"
      },
      {
        "name": "defaultValue",
        "type": "string | number",
        "required": false,
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name shared by all radios of the group (a unique name is generated when omitted, so arrow-key navigation always works)"
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "required": false,
        "description": "Visible label of the group; also its accessible name"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the group when there is no visible label"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) labelling the group (takes precedence over the visible `label` and the enclosing FormControl label)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra ids describing the group (merged with its helper / error text)"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "id of the element with role=\"radiogroup\""
      },
      {
        "name": "onChange",
        "type": "(value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Called with the newly selected value"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables every radio in the group (inherited from an enclosing FormControl when not set)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Radio elements"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name of the root wrapper"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root wrapper"
      },
      {
        "name": "direction",
        "type": "\"horizontal\" | \"vertical\"",
        "required": false,
        "default": "\"vertical\"",
        "description": "Layout direction of the radios"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "description": "Size applied to every radio in the group; when not set each radio uses its own size"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the error state (also set by an invalid enclosing FormControl)"
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Helper text shown below the group (linked with aria-describedby)"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the group as required (aria-required; inherited from an enclosing FormControl)"
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"primary\" | \"success\" | \"warning\" | \"danger\">",
        "required": false,
        "description": "Semantic color applied to every radio in the group (overrides the radios' own color); when not set each radio uses its own color"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root wrapper element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Radio": {
    "kind": "cssVars",
    "source": "react/src/components/Radio",
    "vars": [
      {
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

最初は Apple が選択され、Banana または Cherry を選ぶと切り替わります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/demos/basic.tsx

```tsx
import { Radio, RadioGroup } from "minerva-design";

export default function BasicDemo() {
  return (
    <RadioGroup name="fruit" label="Favourite fruit" defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="banana" label="Banana" />
      <Radio value="cherry" label="Cherry" />
    </RadioGroup>
  );
}

```

## Example: カラー

color でラジオボタンのセマンティックカラーを指定します：primary（既定）、success、warning、danger。RadioGroup の color はグループ内のすべてのラジオボタンに適用され、各ボタンの色を上書きします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/demos/colors.tsx

```tsx
import { Radio, RadioGroup } from "minerva-design";

const colors = ["primary", "success", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {colors.map((color) => (
          <Radio
            key={color}
            name={`color-${color}`}
            color={color}
            label={color}
            defaultChecked
          />
        ))}
      </div>
      <RadioGroup
        name="group-color"
        aria-label="Group color"
        defaultValue="approve"
        direction="horizontal"
        color="success"
      >
        <Radio value="approve" label="Approve" />
        <Radio value="later" label="Later" color="danger" />
      </RadioGroup>
    </div>
  );
}

```

## Example: 制御モード

最初は Pro が選択され、プランの変更は下の結果にも反映されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/radio/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";

export default function ControlledDemo() {
  const [plan, setPlan] = useState<string | number>("pro");

  return (
    <div>
      <RadioGroup
        name="plan"
        label="Plan"
        value={plan}
        onChange={(value) => setPlan(value)}
      >
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="team" label="Team" />
      </RadioGroup>
      <p>Selected plan: {plan}</p>
    </div>
  );
}

```

## Example: 無効状態

Sold out は無効で Available の選択を変えません。無効なグループは Option A を保持します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/demos/disabled.tsx

```tsx
import { Radio, RadioGroup } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <RadioGroup
        name="partly-disabled"
        label="Partly disabled"
        defaultValue="a"
        direction="horizontal"
      >
        <Radio value="a" label="Available" />
        <Radio value="b" label="Sold out" disabled />
      </RadioGroup>
      <RadioGroup
        name="all-disabled"
        label="Disabled group"
        defaultValue="a"
        direction="horizontal"
        disabled
      >
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </div>
  );
}

```

## Example: 横並び

既定では縦に並びます。direction="horizontal" で横一列に並べます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/demos/horizontal.tsx

```tsx
import { Radio, RadioGroup } from "minerva-design";

export default function HorizontalDemo() {
  return (
    <RadioGroup
      name="shipping"
      label="Shipping method"
      defaultValue="standard"
      direction="horizontal"
    >
      <Radio value="standard" label="Standard" />
      <Radio value="express" label="Express" />
      <Radio value="pickup" label="Store pickup" />
    </RadioGroup>
  );
}

```

## Example: サイズ

small、medium（既定）、large の 3 サイズ。グループの size はすべての子に適用されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/demos/sizes.tsx

```tsx
import { Radio, RadioGroup } from "minerva-design";

const sizes = ["small", "medium", "large"] as const;

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {sizes.map((size) => (
        <RadioGroup
          key={size}
          name={`size-${size}`}
          aria-label={`${size} options`}
          defaultValue="a"
          direction="horizontal"
          size={size}
        >
          <Radio value="a" label={`${size} A`} />
          <Radio value="b" label={`${size} B`} />
        </RadioGroup>
      ))}
    </div>
  );
}

```

## Example: バリデーションと補助テキスト

RadioGroup は required・error・helperText に対応します。単独の Radio は errorMessage（errorIcon 付き）または helperText を表示できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/radio/demos/validation.tsx

```tsx
import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";

export default function ValidationDemo() {
  const [size, setSize] = useState<string | number>();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <RadioGroup
        name="t-shirt"
        label="T-shirt size"
        value={size}
        onChange={(value) => setSize(value)}
        direction="horizontal"
        required
        error={size === undefined}
        helperText={
          size === undefined ? "Please choose a size" : `Size ${size} selected`
        }
      >
        <Radio value="S" label="S" />
        <Radio value="M" label="M" />
        <Radio value="L" label="L" />
      </RadioGroup>
      <Radio
        name="terms"
        label="I accept the terms"
        error
        errorMessage="You must accept the terms to continue"
      />
      <Radio
        name="newsletter"
        label="Subscribe to the newsletter"
        helperText="We send at most one email per month"
      />
    </div>
  );
}

```
