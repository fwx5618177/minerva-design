# NumberInput

Numeric field (spinbutton) with arrow-key stepping, an optional stepper, min / max clamping and fixed precision; values are committed on blur or Enter.

Package: minerva-design@1.22.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## NumberInput

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "required": false,
    "description": "Current value (controlled); `null` is an empty field. Omit for an uncontrolled field"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "default": null,
    "required": false,
    "description": "Initial value of an uncontrolled field"
  },
  {
    "name": "min",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Smallest allowed value; committed values are clamped to it"
  },
  {
    "name": "max",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Largest allowed value; committed values are clamped to it"
  },
  {
    "name": "step",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Amount added / removed by ArrowUp / ArrowDown and the stepper"
  },
  {
    "name": "precision",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Decimal places of the value; inferred from step when omitted (step 0.01 -> 2)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NumberInputSize | undefined",
    "typeRef": "type:b42d95dfa51dce99470c",
    "default": "medium",
    "required": false,
    "description": "Field size"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state (also set by an invalid FormControl or an out-of-range draft)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the field (also set by FormControl)"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Focusable and copyable, but typing and stepping do not change the value (also set by FormControl)"
  },
  {
    "name": "showStepper",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows increment / decrement buttons; the arrow keys always work"
  },
  {
    "name": "allowEmpty",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Clearing the field commits `null`; otherwise it falls back to min (or 0)"
  },
  {
    "name": "incrementLabel",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the increment button"
  },
  {
    "name": "decrementLabel",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the decrement button"
  },
  {
    "name": "notANumberMessage",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Hint shown (as the wrapper title) while the draft is not a number"
  },
  {
    "name": "belowMinMessage",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Hint shown while the draft is below min"
  },
  {
    "name": "aboveMaxMessage",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Hint shown while the draft is above max"
  },
  {
    "name": "defaultChecked",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "autoFocus",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Identifies the element (or elements) that describes the object."
  },
  {
    "name": "aria-label",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Defines a string value that labels the current element."
  },
  {
    "name": "form",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "name",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "pattern",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accept",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "autoComplete",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "HTMLInputAutoCompleteAttribute | undefined",
    "typeRef": "type:097f18cefc39c00ec4f9",
    "required": false
  },
  {
    "name": "checked",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "maxLength",
    "inherited": true,
    "source": "react",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "minLength",
    "inherited": true,
    "source": "react",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "multiple",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "placeholder",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "required",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/NumberInput/types.ts",
    "kind": "function",
    "typeText": "((value: number | null) => void) | undefined",
    "typeRef": "type:0d3f11f23e66681463ea",
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
    "description": "Called with the committed value (on blur / Enter, stepping and stepper clicks), never while typing; `null` when the field is cleared"
  },
  {
    "name": "onFocus",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "FocusEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:6284782b01edc0ec9aeb",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLInputElement, Element>",
        "typeRef": "type:20a1b75c939d080fd107"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onBlur",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "FocusEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:6284782b01edc0ec9aeb",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLInputElement, Element>",
        "typeRef": "type:20a1b75c939d080fd107"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onInput",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "InputEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:c45b6e80d6c8f01c0ae2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "InputEvent<HTMLInputElement>",
        "typeRef": "type:c0b0762b46fe28f4edad"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onKeyDown",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "KeyboardEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:a829ca15387965668126",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent<HTMLInputElement>",
        "typeRef": "type:bb2eb244cd23c9a1b2fa"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onKeyUp",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "KeyboardEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:a829ca15387965668126",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent<HTMLInputElement>",
        "typeRef": "type:bb2eb244cd23c9a1b2fa"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onClick",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "MouseEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:e951285332632d910fc7",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLInputElement, MouseEvent>",
        "typeRef": "type:69803e823cc5b5d06844"
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
  "NumberInputProps": {
    "source": "react/src/components/NumberInput/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<InputHTMLAttributes<HTMLInputElement>, | \"value\" | \"defaultValue\" | \"onChange\" | \"size\" | \"type\" | \"min\" | \"max\" | \"step\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "number | null",
        "required": false,
        "description": "Current value (controlled); `null` is an empty field. Omit for an uncontrolled field"
      },
      {
        "name": "defaultValue",
        "type": "number | null",
        "required": false,
        "default": "null",
        "description": "Initial value of an uncontrolled field"
      },
      {
        "name": "onChange",
        "type": "(value: number | null) => void",
        "required": false,
        "description": "Called with the committed value (on blur / Enter, stepping and stepper clicks), never while typing; `null` when the field is cleared"
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
        "description": "Amount added / removed by ArrowUp / ArrowDown and the stepper"
      },
      {
        "name": "precision",
        "type": "number",
        "required": false,
        "description": "Decimal places of the value; inferred from step when omitted (step 0.01 -> 2)"
      },
      {
        "name": "size",
        "type": "NumberInputSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Field size"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Error state (also set by an invalid FormControl or an out-of-range draft)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the field (also set by FormControl)"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Focusable and copyable, but typing and stepping do not change the value (also set by FormControl)"
      },
      {
        "name": "showStepper",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows increment / decrement buttons; the arrow keys always work"
      },
      {
        "name": "allowEmpty",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clearing the field commits `null`; otherwise it falls back to min (or 0)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class name of the wrapper"
      },
      {
        "name": "incrementLabel",
        "type": "string",
        "required": false,
        "default": "\"Increase\" (localized)",
        "description": "Accessible label of the increment button"
      },
      {
        "name": "decrementLabel",
        "type": "string",
        "required": false,
        "default": "\"Decrease\" (localized)",
        "description": "Accessible label of the decrement button"
      },
      {
        "name": "notANumberMessage",
        "type": "string",
        "required": false,
        "default": "\"Enter a number\" (localized)",
        "description": "Hint shown (as the wrapper title) while the draft is not a number"
      },
      {
        "name": "belowMinMessage",
        "type": "string",
        "required": false,
        "default": "\"Minimum {min}\" (localized)",
        "description": "Hint shown while the draft is below min"
      },
      {
        "name": "aboveMaxMessage",
        "type": "string",
        "required": false,
        "default": "\"Maximum {max}\" (localized)",
        "description": "Hint shown while the draft is above max"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the <input> element"
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

## Example: Basic usage

Out-of-range or non-numeric drafts are flagged and clamped / reverted when committed; clearing gives null.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/demos/basic.tsx

```tsx
import { NumberInput } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [quantity, setQuantity] = useState<number | null>(1);
  return (
    <>
      <NumberInput
        aria-label="Quantity"
        min={0}
        max={10}
        value={quantity}
        onChange={setQuantity}
      />
      <p>Value: {quantity === null ? "empty" : quantity}</p>
    </>
  );
}

```

## Example: With FormField

The field provides the label, state and description; readOnly blocks typing and stepping.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/demos/form-control.tsx

```tsx
import { FormField, NumberInput } from "minerva-design";

export default function FormControlDemo() {
  return (
    <>
      <FormField label="HTTP status" helperText="Between 100 and 599." required>
        <NumberInput defaultValue={200} min={100} max={599} />
      </FormField>
      <FormField label="Retries" readOnly>
        <NumberInput defaultValue={3} />
      </FormField>
    </>
  );
}

```

## Example: Stepper and precision

showStepper adds buttons; precision is inferred from step unless set; allowEmpty={false} falls back to min.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/demos/stepper-precision.tsx

```tsx
import { NumberInput } from "minerva-design";

export default function StepperPrecisionDemo() {
  return (
    <>
      <NumberInput
        aria-label="Rate"
        defaultValue={0.5}
        min={0}
        max={1}
        step={0.01}
        showStepper
      />
      <NumberInput
        aria-label="Price"
        defaultValue={9.9}
        precision={2}
        size="large"
      />
      <NumberInput
        aria-label="Latency"
        defaultValue={100}
        step={50}
        allowEmpty={false}
        size="small"
      />
    </>
  );
}

```
