# Textarea 多行输入

多行文本输入，与 Input 共享尺寸和变体；禁用手动拖拽调整大小，请使用 rows。

Package: minerva-design@1.24.4

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Textarea

Support: beta

Native Angular: MnTextarea. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTextarea"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "variant",
    "typeText": "TextareaVariant",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "size",
    "typeText": "TextareaSize",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  }
]
```

## CSS variables

```json
{
  "css:Textarea": {
    "kind": "cssVars",
    "source": "react/src/components/Textarea",
    "vars": [
      {
        "name": "--textarea-min-height",
        "description": "Minimum height (every size)"
      },
      {
        "name": "--textarea-padding-y",
        "description": "Vertical padding of the text"
      },
      {
        "name": "--textarea-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--textarea-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--textarea-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--textarea-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--textarea-border-color",
        "description": "Border color at rest"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Message input

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTextarea } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTextarea],
  template: `
<textarea mnTextarea aria-label="Message" [(value)]="value" rows="4" placeholder="Write a message"></textarea><output>{{value.length}} characters</output>
  `,
})
export class Example {
  value = "";
}

```

## Example: Read-only content

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTextarea } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTextarea],
  template: `
<textarea mnTextarea aria-label="Terms" value="Your published message appears here." readOnly rows="3"></textarea>
  `,
})
export class Example {

}

```
