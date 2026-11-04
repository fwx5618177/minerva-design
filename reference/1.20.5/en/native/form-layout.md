# FormLayout

A native form whose fields are laid out on a responsive grid; submit, reset and validation keep their native behaviour.

Package: minerva-design@1.20.5

Renderer: native

Locale: en

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

## FormLayout

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "FormLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "layout",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "typeRef": "type:4e4ac2a46972f482e8a6",
    "required": false
  },
  {
    "name": "columns",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "ResponsiveGridColumns | undefined",
    "typeRef": "type:1d3e65882e6ca5b766bb",
    "default": 1,
    "required": false
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "default": 4,
    "required": false
  },
  {
    "name": "rowGap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "columnGap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
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

## API

```json
{
  "native:FormLayoutProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ResponsiveGridProps"
    ],
    "props": [
      {
        "name": "layout",
        "type": "\"vertical\" | \"horizontal\"",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:FormLayout": {
    "kind": "cssVars",
    "source": "react/src/components/FormLayout",
    "vars": [
      {
        "name": "--form-layout-max-width",
        "description": "Maximum width of the form (none by default)"
      },
      {
        "name": "--form-layout-margin-inline",
        "description": "Inline margin of the form (set auto with a max width to center it)"
      },
      {
        "name": "--form-layout-padding",
        "description": "Inner padding of the form"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

columns follows the form's own width; GridItem fullWidth asChild spans a FormField across the row without a wrapper.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-layout/native/basic.tsx

```tsx
import {
  FormLayout,
  FormControl,
  FormLabel,
  Input,
} from "minerva-design/native";
export default function Basic() {
  return (
    <FormLayout columns={{ base: 1, md: 2 }}>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel>Last name</FormLabel>
        <Input />
      </FormControl>
    </FormLayout>
  );
}

```
