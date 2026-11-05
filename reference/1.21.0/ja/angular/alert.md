# Alert アラート

システム通知や操作結果など、重要なメッセージをページ内に表示します。

Package: minerva-design@1.21.0

Renderer: angular

Locale: ja

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

## Alert

Support: beta

Native Angular: MnAlert. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAlert"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"success\" | \"warning\" | \"danger\" | \"info\"",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\"",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "collapsible",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "closable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "expandedChange",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "closed",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
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
  },
  {
    "name": "[mnAction]"
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  }
]
```

## CSS variables

```json
{
  "css:Alert": {
    "kind": "cssVars",
    "source": "react/src/components/Alert",
    "vars": [
      {
        "name": "--alert-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--alert-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg when rounded)"
      },
      {
        "name": "--alert-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--alert-icon-size",
        "description": "Size of the status icon (every size)"
      },
      {
        "name": "--alert-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--alert-shadow",
        "description": "Shadow of the elevated alert (defaults to --shadow-sm)"
      },
      {
        "name": "--alert-margin-bottom",
        "description": "Space below the alert"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Expandable and dismissible

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAlert } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAlert],
  template: `
<mn-alert title="Scheduled maintenance" description="The workspace will be unavailable for a few minutes tonight." color="warning" collapsible closable/>
  `,
})
export class Example {

}

```

## Example: Semantic colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAlert } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAlert],
  template: `
<mn-alert title="Changes saved" color="success"/><mn-alert title="Connection interrupted" description="Check your network and try again." color="danger"/>
  `,
})
export class Example {

}

```
