# FormControl

Conteneur de champ qui relie un libellé, un contrôle, un texte d’aide et un message d’erreur, et partage l’état invalide / obligatoire / désactivé / lecture seule avec le contrôle.

Package: minerva-design@1.21.0

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormControl

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "disabled",
    "source": "packages/native/src/components/FormControl/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/FormControl/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/FormControl/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "required",
    "source": "packages/native/src/components/FormControl/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "id",
    "source": "packages/native/src/components/FormControl/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Used to reference react managed views from native code."
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

With Form / useForm: validation on the core field machine

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "name",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the field in the Form values (required inside a Form)"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the field"
  },
  {
    "name": "helperText",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Help text below the control (hidden while the field is invalid)"
  },
  {
    "name": "errorMessage",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Error message; makes the field invalid unless `invalid` is set"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Forces the invalid state on / off (unset: invalid while a rule fails or `errorMessage` is set)"
  },
  {
    "name": "required",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the field as required (indicator on the label, \"required\" for screen readers) and adds the `required` rule"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control (also set by a disabled Form)"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Makes the control read-only (also set by a read-only Form)"
  },
  {
    "name": "rules",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "object",
    "typeText": "FormFieldRules | undefined",
    "typeRef": "type:e2dd4ec2572c9985813f",
    "required": false,
    "description": "Validation rules"
  },
  {
    "name": "validateOn",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "enum",
    "values": [
      "blur",
      "change",
      "submit"
    ],
    "typeText": "FieldValidateOn | undefined",
    "typeRef": "type:637fbe050cfc97f69b8b",
    "default": "blur",
    "required": false,
    "description": "First validation on every change, on blur or only on submit (then every change re-validates)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "object",
    "typeText": "unknown",
    "typeRef": "type:dc96c0cac9f2d6c9a926",
    "required": false,
    "description": "Initial value"
  },
  {
    "name": "valuePropName",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Prop of the control holding the value"
  },
  {
    "name": "trigger",
    "source": "packages/native/src/components/Form/FormField.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "onChange",
    "required": false,
    "description": "Change callback of the control (first argument = new value)"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "FormLabel"
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

## API

```json
{
  "native:FormControlProps": {
    "source": "native/src/components/FormControl/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
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
        "default": "false"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "id",
        "type": "string",
        "required": false
      }
    ]
  },
  "native:FormFieldProps": {
    "source": "native/src/components/Form/FormField.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the field in the Form values (required inside a Form)"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
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
        "description": "Error message; makes the field invalid unless `invalid` is set"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Forces the invalid state on / off (unset: invalid while a rule fails or `errorMessage` is set)"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the field as required (indicator on the label, \"required\" for screen readers) and adds the `required` rule"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the control (also set by a disabled Form)"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the control read-only (also set by a read-only Form)"
      },
      {
        "name": "rules",
        "type": "FormFieldRules",
        "required": false,
        "description": "Validation rules"
      },
      {
        "name": "validateOn",
        "type": "FieldValidateOn",
        "required": false,
        "default": "\"blur\"",
        "description": "First validation on every change, on blur or only on submit (then every change re-validates)"
      },
      {
        "name": "defaultValue",
        "type": "unknown",
        "required": false,
        "default": "the Form's `initialValues[name]`, else the control's empty value (\"\", `false` for checked controls, `null` for NumberInput / RadioGroup, `[]` for CheckboxGroup)",
        "description": "Initial value"
      },
      {
        "name": "valuePropName",
        "type": "string",
        "required": false,
        "default": "the control's (\"value\" / \"checked\")",
        "description": "Prop of the control holding the value"
      },
      {
        "name": "trigger",
        "type": "string",
        "required": false,
        "default": "\"onChange\"",
        "description": "Change callback of the control (first argument = new value)"
      },
      {
        "name": "children",
        "type": "ReactElement | ((control: FormFieldControlProps, meta: FormFieldMeta) => ReactNode)",
        "required": true,
        "description": "The control: one element (wired automatically: value, onChange, onBlur, invalid, disabled, accessibility label) or a render function receiving the control props and the field state"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
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

## Example: Utilisation de base

FormLabel cible le contrôle, l’aide le décrit et le message d’erreur remplace l’aide quand le champ est invalide.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/native/basic.tsx

```tsx
import { View } from "react-native";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
} from "minerva-design/native";
export default function Basic() {
  return (
    <View style={{ gap: 12 }}>
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input placeholder="you@example.com" />
        <FormHelperText>Used for order updates.</FormHelperText>
      </FormControl>
      <FormControl invalid>
        <FormLabel>Reference</FormLabel>
        <Input />
        <FormErrorMessage>A reference is required.</FormErrorMessage>
      </FormControl>
    </View>
  );
}

```
