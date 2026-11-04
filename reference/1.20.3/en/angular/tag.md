# Tag

Small labels for marking and categorizing content; can be closable or clickable.

Package: minerva-design@1.20.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Accessibility

With clickable, the tag gets role="button" and tabIndex=0, and Enter or Space trigger onClick just like a mouse click. Use it for actions or toggles, not for navigation (use a link instead).

The close button is a native  with its own tab stop. Its accessible name defaults to "Close"; set closeLabel (e.g. "Remove React") so screen-reader users know which tag it removes.

A disabled clickable tag keeps role="button" with aria-disabled="true" and is skipped by Tab. When the selected state matters, also convey it in text or with aria attributes, not only with color.

## Tag

Support: beta

Native Angular: MnTag. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTag"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "avatar",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "clickable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "closable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "active",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"neutral\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"square\" | \"rounded\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "activeChange",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "removed",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

### bindings

```json
[
  {
    "prop": "active",
    "event": "activeChange",
    "syntax": "[(active)]"
  }
]
```

## CSS variables

```json
{
  "css:Tag": {
    "kind": "cssVars",
    "source": "react/src/components/Tag",
    "vars": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Toggle and remove

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTag } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTag],
  template: `
@if(visible){<mn-tag label="Design" clickable closable [(active)]="active" (removed)="visible=false"/>}<output>{{active?'Filter selected':'Filter not selected'}}</output><button type="button" (click)="visible=true">Restore tag</button>
  `,
})
export class Example {
  active = false;
  visible = true;
}

```

## Example: Semantic variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTag, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTag, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-tag label="Success" color="success"/><mn-tag label="Warning" color="warning" variant="outline"/><mn-tag label="Loading" loading/><mn-tag label="Disabled" disabled/></mn-stack>
  `,
})
export class Example {

}

```
