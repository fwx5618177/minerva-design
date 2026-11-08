# TextLink

A styled native anchor for inline links, quiet navigation and settings rows; asChild styles a router link without nesting anchors.

Package: minerva-design@1.23.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## TextLink

Support: beta

Native Angular: MnTextLink. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTextLink"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"action\" | \"default\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
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

## CSS variables

```json
{
  "css:TextLink": {
    "kind": "cssVars",
    "source": "react/src/components/TextLink",
    "vars": [
      {
        "name": "--text-link-color",
        "description": "Color of the default variant (falls back to --link-color, then --primary-color)"
      },
      {
        "name": "--text-link-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--text-link-text-decoration",
        "description": "Text decoration of the default variant (default: underline)"
      },
      {
        "name": "--text-link-underline-offset",
        "description": "Distance between the text and its underline"
      },
      {
        "name": "--text-link-action-min-height",
        "description": "Minimum height of the action variant"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Inline links

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTextLink } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTextLink],
  template: `
<p>Read the <a mnTextLink href="#installation">installation guide</a> to get started.</p>
  `,
})
export class Example {

}

```

## Example: Subtle and action links

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTextLink, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTextLink, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><a mnTextLink variant="subtle" href="#details">View details →</a><a mnTextLink variant="action" href="#settings">Workspace settings</a></mn-stack>
  `,
})
export class Example {

}

```
