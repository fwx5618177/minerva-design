# Tabs

Organise le contenu en panneaux affichés un par un. Onglets accessibles avec navigation aux flèches, variantes line / enclosed / soft / pills, couleurs sémantiques et orientation verticale.

Package: minerva-design@1.23.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tab

Support: beta

Native Angular: MnTab. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
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

## TabList

Support: n/a

Native Angular: MnTabs renders the role=tablist around projected MnTab controls; label, orientation and activationMode configure the list and keyboard interaction.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTabs",
    "MnTab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"line\" | \"enclosed\" | \"soft\" | \"pills\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"neutral\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "activationMode",
    "typeText": "\"automatic\" | \"manual\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "mn-tab, [mnTab]"
  },
  {
    "name": "default"
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

## TabPanel

Support: beta

Native Angular: MnTabPanel. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTabPanel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/navigation/index.ts"
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

## Tabs

Support: beta

Native Angular: MnTabs. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"line\" | \"enclosed\" | \"soft\" | \"pills\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"neutral\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "activationMode",
    "typeText": "\"automatic\" | \"manual\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "mn-tab, [mnTab]"
  },
  {
    "name": "default"
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
  "css:Tabs": {
    "kind": "cssVars",
    "source": "react/src/components/Tabs",
    "vars": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Switch between panels

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTabs, MnTab, MnTabPanel } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTabs, MnTab, MnTabPanel],
  template: `
<mn-tabs [(value)]="value"><mn-tab value="overview">Overview</mn-tab><mn-tab value="activity">Activity</mn-tab><mn-tab value="restricted" disabled>Restricted</mn-tab><mn-tab-panel value="overview">Project overview and summary.</mn-tab-panel><mn-tab-panel value="activity">Recent updates from the team.</mn-tab-panel></mn-tabs>
  `,
})
export class Example {
  value = "overview";
}

```

## Example: Vertical pill tabs

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTabs, MnTab, MnTabPanel } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTabs, MnTab, MnTabPanel],
  template: `
<mn-tabs value="general" orientation="vertical" variant="pills"><mn-tab value="general">General</mn-tab><mn-tab value="security">Security</mn-tab><mn-tab-panel value="general">General settings</mn-tab-panel><mn-tab-panel value="security">Security settings</mn-tab-panel></mn-tabs>
  `,
})
export class Example {

}

```
