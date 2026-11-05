# NumberInput

Champ numérique (spinbutton) avec pas au clavier, boutons optionnels, bornes min / max et précision fixe ; la valeur est validée à la perte du focus ou sur Entrée.

Package: minerva-design@1.21.1

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## NumberInput

Support: beta

Stepper: the mobile stepper look (− / + buttons)

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "NumberInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "required": false,
    "description": "Current value (controlled); `null` is an empty field"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "default": null,
    "required": false,
    "description": "Initial value (uncontrolled); `null` is an empty field"
  },
  {
    "name": "min",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Smallest allowed value; committed values are clamped to it"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Largest allowed value; committed values are clamped to it"
  },
  {
    "name": "step",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Amount added / removed by the stepper buttons and the screen reader increment / decrement actions"
  },
  {
    "name": "precision",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Decimal places of the value"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Field size (`--control-height-*`)"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state (also shown while the draft is not a number or out of range)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the field"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Typing and stepping do not change the value"
  },
  {
    "name": "showStepper",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the decrement / increment buttons (`Stepper` always does)"
  },
  {
    "name": "stepperLayout",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "enum",
    "values": [
      "compact",
      "inline"
    ],
    "typeText": "NumberInputStepperLayout | undefined",
    "typeRef": "type:2603e210bf9e3b4f17f5",
    "default": "inline",
    "required": false,
    "description": "`inline`: the buttons sit inside the field frame; `compact`: separate tinted buttons around a narrow value (mobile stepper, `Stepper`)"
  },
  {
    "name": "allowEmpty",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Clearing the field commits `null`; otherwise it falls back to min (or 0)"
  },
  {
    "name": "incrementLabel",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the increment button"
  },
  {
    "name": "decrementLabel",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the decrement button"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible label above the field; a string label is also the field's accessible name (unless `accessibilityLabel` is set)"
  },
  {
    "name": "inputStyle",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the TextInput"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/NumberInput/NumberInput.tsx",
    "kind": "function",
    "typeText": "((value: number | null) => void) | undefined",
    "typeRef": "type:c04ca4f6b2cd96d69203",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number | null",
        "typeRef": "type:4ebff2838e5c7cb671be"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the committed value (`null`: emptied)"
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
  "native:NumberInputProps": {
    "source": "native/src/components/NumberInput/NumberInput.tsx",
    "kind": "interface",
    "extends": [
      "Omit<TextInputProps, | \"style\" | \"value\" | \"defaultValue\" | \"onChange\" | \"editable\" | \"readOnly\" | \"multiline\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "number | null",
        "required": false,
        "description": "Current value (controlled); `null` is an empty field"
      },
      {
        "name": "defaultValue",
        "type": "number | null",
        "required": false,
        "default": "null",
        "description": "Initial value (uncontrolled); `null` is an empty field"
      },
      {
        "name": "onChange",
        "type": "(value: number | null) => void",
        "required": false,
        "description": "Called with the committed value (`null`: emptied)"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "description": "Smallest allowed value; committed values are clamped to it"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Largest allowed value; committed values are clamped to it"
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Amount added / removed by the stepper buttons and the screen reader increment / decrement actions"
      },
      {
        "name": "precision",
        "type": "number",
        "required": false,
        "default": "inferred from step (0.01 -> 2)",
        "description": "Decimal places of the value"
      },
      {
        "name": "size",
        "type": "NumberInputSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Field size (`--control-height-*`)"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Error state (also shown while the draft is not a number or out of range)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the field"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Typing and stepping do not change the value"
      },
      {
        "name": "showStepper",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the decrement / increment buttons (`Stepper` always does)"
      },
      {
        "name": "stepperLayout",
        "type": "NumberInputStepperLayout",
        "required": false,
        "default": "\"inline\"",
        "description": "`inline`: the buttons sit inside the field frame; `compact`: separate tinted buttons around a narrow value (mobile stepper, `Stepper`)"
      },
      {
        "name": "allowEmpty",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clearing the field commits `null`; otherwise it falls back to min (or 0)"
      },
      {
        "name": "incrementLabel",
        "type": "string",
        "required": false,
        "default": "i18n \"numberInput.increment\"",
        "description": "Accessible label of the increment button"
      },
      {
        "name": "decrementLabel",
        "type": "string",
        "required": false,
        "default": "i18n \"numberInput.decrement\"",
        "description": "Accessible label of the decrement button"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Visible label above the field; a string label is also the field's accessible name (unless `accessibilityLabel` is set)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      },
      {
        "name": "inputStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the TextInput"
      },
      {
        "name": "ref",
        "type": "Ref<TextInput>",
        "required": false,
        "description": "Ref of the TextInput"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:NumberInput": {
    "kind": "cssVars",
    "source": "react/src/components/NumberInput",
    "vars": [
      {
        "name": "--number-input-height",
        "description": "Height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--number-input-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--number-input-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--number-input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--number-input-background",
        "description": "Background color"
      },
      {
        "name": "--number-input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--number-input-stepper-width",
        "description": "Width of the increment / decrement column"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Les saisies hors bornes ou non numériques sont signalées puis bornées / annulées à la validation ; vider donne null.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/native/basic.tsx

```tsx
import { NumberInput } from "minerva-design/native";
export default function Basic() {
  return (
    <NumberInput label="Quantity" defaultValue={2} min={0} max={10} step={1} />
  );
}

```
