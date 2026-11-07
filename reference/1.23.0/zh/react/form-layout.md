# FormLayout 表单布局

原生 form，字段排布在响应式网格上；提交、重置和校验保持原生行为。

Package: minerva-design@1.23.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormLayout

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "columns",
    "source": "packages/react/src/components/FormLayout/types.ts",
    "kind": "union",
    "typeText": "ResponsiveGridColumns | undefined",
    "typeRef": "type:6c395485ef74adec8007",
    "default": 1,
    "required": false,
    "description": "Column counts of the inner ResponsiveGrid: a number, or `{ base, sm, md, lg }` (container widths 480 / 768 / 1200px). Integers 1-12"
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/FormLayout/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 4,
    "required": false,
    "description": "Gap between fields: numbers and numeric strings select spacing tokens, other strings are CSS values"
  },
  {
    "name": "rowGap",
    "source": "packages/react/src/components/FormLayout/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Gap between rows; defaults to `gap`"
  },
  {
    "name": "columnGap",
    "source": "packages/react/src/components/FormLayout/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Gap between columns; defaults to `gap`"
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
  "FormLayoutProps": {
    "source": "react/src/components/FormLayout/types.ts",
    "kind": "interface",
    "extends": [
      "FormHTMLAttributes<HTMLFormElement>"
    ],
    "props": [
      {
        "name": "columns",
        "type": "ResponsiveGridColumns",
        "required": false,
        "default": "1",
        "description": "Column counts of the inner ResponsiveGrid: a number, or `{ base, sm, md, lg }` (container widths 480 / 768 / 1200px). Integers 1-12"
      },
      {
        "name": "gap",
        "type": "string | number",
        "required": false,
        "default": "4",
        "description": "Gap between fields: numbers and numeric strings select spacing tokens, other strings are CSS values"
      },
      {
        "name": "rowGap",
        "type": "string | number",
        "required": false,
        "description": "Gap between rows; defaults to `gap`"
      },
      {
        "name": "columnGap",
        "type": "string | number",
        "required": false,
        "description": "Gap between columns; defaults to `gap`"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLFormElement>",
        "required": false,
        "description": "Ref to the <form> element"
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

## Standalone recipes

- [React controlled project form](/minerva-design/reference/1.23.0/recipes/react-form/README.md) — react; verified package 1.23.0

## Example: 基础用法

columns 跟随表单自身宽度；GridItem fullWidth asChild 让 FormField 占满整行且不额外包裹。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/form-layout/demos/basic.tsx

```tsx
import { useState } from "react";
import {
  Alert,
  Button,
  FormField,
  FormLayout,
  GridItem,
  Input,
  Textarea,
} from "minerva-design";

export default function BasicDemo() {
  const [saved, setSaved] = useState<string | null>(null);
  return (
    <FormLayout
      columns={{ base: 1, sm: 2 }}
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(
          JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
        );
      }}
    >
      <GridItem fullWidth asChild>
        <FormField label="Title">
          <Input name="title" defaultValue="Draft" required />
        </FormField>
      </GridItem>
      <FormField label="Language">
        <Input name="language" />
      </FormField>
      <FormField label="Category">
        <Input name="category" />
      </FormField>
      <GridItem fullWidth asChild>
        <FormField label="Summary">
          <Textarea name="summary" rows={3} />
        </FormField>
      </GridItem>
      <GridItem fullWidth>
        <Button type="submit">Save</Button>
      </GridItem>
      {saved && (
        <GridItem fullWidth>
          <Alert color="success" title="Saved">
            <code>{saved}</code>
          </Alert>
        </GridItem>
      )}
    </FormLayout>
  );
}

```

## Example: 间距

gap、rowGap 和 columnGap 接受间距 token 或 CSS 值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-layout/demos/gaps.tsx

```tsx
import { FormField, FormLayout, Input } from "minerva-design";

export default function GapsDemo() {
  return (
    <FormLayout columns={3} rowGap={2} columnGap="24px">
      <FormField label="First name">
        <Input name="first" />
      </FormField>
      <FormField label="Last name">
        <Input name="last" />
      </FormField>
      <FormField label="Nickname">
        <Input name="nickname" />
      </FormField>
    </FormLayout>
  );
}

```
