# FormControl 表单控件

字段容器：关联标签、控件、帮助文本和错误信息，并将无效 / 必填 / 禁用 / 只读状态共享给控件。

Package: minerva-design@1.23.0

Renderer: react

Locale: zh

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

- [React controlled project form](/minerva-design/reference/1.23.0/recipes/react-form/README.md) — react; verified package 1.23.0

## Example: 基础用法

FormLabel 指向控件，帮助文本描述它，无效时错误信息替换帮助文本。

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

## Example: 自定义控件

useFormControlProps 为任意控件接入 id、aria 属性、disabled、readOnly；useFormControlContext 读取字段状态。

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

FormField 组合了 FormControl、FormLabel、帮助文本和错误信息；errorMessage 会使字段无效。

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

## Example: 状态

required 添加标记和 aria-required；disabled 与 readOnly 会传递给控件。

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
