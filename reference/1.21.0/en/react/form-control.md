# FormControl

Field container that links a label, a control, help text and an error message, and shares invalid / required / disabled / read-only state with the control.

Package: minerva-design@1.21.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormControl

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "FormControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "invalid",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the field as invalid: the control gets aria-invalid and the error message replaces the helper text"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the field as required (aria-required on the control, indicator on the label)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control inside the field"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Makes the control inside the field read-only"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the control; the label, helper and error ids derive from it (`${id}-label`, `${id}-helper`, `${id}-error`). Generated when omitted"
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

## FormErrorMessage

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "FormErrorMessage"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## FormField

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "FormField"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Label of the field"
  },
  {
    "name": "helperText",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Help text below the control (hidden while the field is invalid)"
  },
  {
    "name": "errorMessage",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Error message; makes the field invalid unless `invalid` is set explicitly"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the field as invalid: the control gets aria-invalid and the error message replaces the helper text"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the field as required (aria-required on the control, indicator on the label)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control inside the field"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Makes the control inside the field read-only"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the control; the label, helper and error ids derive from it (`${id}-label`, `${id}-helper`, `${id}-error`). Generated when omitted"
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

## FormHelperText

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "FormHelperText"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## FormLabel

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "FormLabel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "requiredIndicator",
    "source": "packages/react/src/components/FormControl/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "default": "*",
    "required": false,
    "description": "Indicator shown after the text when the field is required (hidden from assistive technology, which gets aria-required instead)"
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

## API

```json
{
  "FormControlProps": {
    "source": "react/src/components/FormControl/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the field as invalid: the control gets aria-invalid and the error message replaces the helper text"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the field as required (aria-required on the control, indicator on the label)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the control inside the field"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the control inside the field read-only"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the control; the label, helper and error ids derive from it (`${id}-label`, `${id}-helper`, `${id}-error`). Generated when omitted"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Field content: FormLabel, a control, FormHelperText, FormErrorMessage"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the container <div>"
      }
    ]
  },
  "FormLabelProps": {
    "source": "react/src/components/FormControl/types.ts",
    "kind": "interface",
    "extends": [
      "LabelHTMLAttributes<HTMLLabelElement>"
    ],
    "props": [
      {
        "name": "requiredIndicator",
        "type": "ReactNode",
        "required": false,
        "default": "\"*\"",
        "description": "Indicator shown after the text when the field is required (hidden from assistive technology, which gets aria-required instead)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLLabelElement>",
        "required": false,
        "description": "Ref to the <label> element"
      }
    ]
  },
  "FormFieldProps": {
    "source": "react/src/components/FormControl/types.ts",
    "kind": "interface",
    "extends": [
      "FormControlProps"
    ],
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Label of the field"
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false,
        "description": "Help text below the control (hidden while the field is invalid)"
      },
      {
        "name": "errorMessage",
        "type": "ReactNode",
        "required": false,
        "description": "Error message; makes the field invalid unless `invalid` is set explicitly"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:FormControl": {
    "kind": "cssVars",
    "source": "react/src/components/FormControl",
    "vars": [
      {
        "name": "--form-control-gap",
        "description": "Space between the label, the field and the helper / error text"
      },
      {
        "name": "--form-control-label-font-size",
        "description": "Font size of the label"
      },
      {
        "name": "--form-control-label-color",
        "description": "Color of the label"
      },
      {
        "name": "--form-control-helper-font-size",
        "description": "Font size of the helper and error texts"
      },
      {
        "name": "--form-control-required-color",
        "description": "Color of the required marker"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [React controlled project form](/minerva-design/reference/1.21.0/recipes/react-form/README.md) — react; verified package 1.21.0

## Example: Basic usage

FormLabel targets the control, the helper text describes it, and the error message replaces the helper while invalid.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/demos/basic.tsx

```tsx
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [email, setEmail] = useState("");
  const invalid = email !== "" && !email.includes("@");
  return (
    <FormControl invalid={invalid} required>
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormHelperText>Used to sign in.</FormHelperText>
      <FormErrorMessage>Enter a valid email address.</FormErrorMessage>
    </FormControl>
  );
}

```

## Example: Custom control

useFormControlProps wires any control (id, aria attributes, disabled, readOnly); useFormControlContext reads the field state.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/demos/custom-control.tsx

```tsx
import {
  FormField,
  useFormControlContext,
  useFormControlProps,
} from "minerva-design";

function ColorInput() {
  // id, aria-describedby, aria-invalid, aria-required, disabled, readOnly
  const props = useFormControlProps({});
  const field = useFormControlContext();
  return (
    <input
      type="color"
      defaultValue="#2563eb"
      {...props}
      style={{ outline: field?.invalid ? "2px solid red" : undefined }}
    />
  );
}

export default function CustomControlDemo() {
  return (
    <FormField label="Brand color" helperText="Wired by useFormControlProps.">
      <ColorInput />
    </FormField>
  );
}

```

## Example: FormField

FormField combines FormControl, FormLabel, helper text and error message; errorMessage makes the field invalid.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/demos/form-field.tsx

```tsx
import { FormField, Input, Textarea } from "minerva-design";

export default function FormFieldDemo() {
  return (
    <>
      <FormField label="Title" helperText="Shown on the public page.">
        <Input defaultValue="Draft" />
      </FormField>
      <FormField label="Summary" errorMessage="The summary is required.">
        <Textarea rows={3} />
      </FormField>
    </>
  );
}

```

## Example: States

required adds an indicator and aria-required; disabled and readOnly reach the control.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/demos/states.tsx

```tsx
import { FormField, Input } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <FormField label="Required" required>
        <Input />
      </FormField>
      <FormField label="Disabled" disabled>
        <Input defaultValue="Disabled value" />
      </FormField>
      <FormField label="Read-only" readOnly>
        <Input defaultValue="Read-only value" />
      </FormField>
    </>
  );
}

```
