# SegmentedControl セグメントコントロール

モードやフィルターを切り替える単一選択のセグメントスイッチで、選択中のセグメントの下をサムがスライドします。各選択肢に独自のコンテンツパネルがある場合は Tabs を使用してください。

Package: minerva-design@1.23.2

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## SegmentedControl

Support: beta

Native Angular: MnSegmentedControl. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSegmentedControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "typeText": "readonly SegmentedControlOption[]",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "value",
    "typeText": "string | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "size",
    "typeText": "SegmentedControlSize",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "color",
    "typeText": "SegmentedControlColor",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "fullWidth",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | null | undefined",
    "required": false
  },
  {
    "name": "change",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/segmented-control/segmented-control.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
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
  "css:SegmentedControl": {
    "kind": "cssVars",
    "source": "react/src/components/SegmentedControl",
    "vars": [
      {
        "name": "--segmented-control-height",
        "description": "Height of the control (defaults to the density's control height)"
      },
      {
        "name": "--segmented-control-padding",
        "description": "Space between the track and the segments (defaults to 2px)"
      },
      {
        "name": "--segmented-control-radius",
        "description": "Corner radius of the track (defaults to --radius-md); the thumb follows it"
      },
      {
        "name": "--segmented-control-background",
        "description": "Background of the track (defaults to --surface-muted-color)"
      },
      {
        "name": "--segmented-control-color",
        "description": "Text color of the unselected segments"
      },
      {
        "name": "--segmented-control-item-padding-x",
        "description": "Inline padding of a segment"
      },
      {
        "name": "--segmented-control-thumb-background",
        "description": "Background of the thumb (defaults to --surface-elevated-color; --primary-color with color=\"primary\")"
      },
      {
        "name": "--segmented-control-thumb-shadow",
        "description": "Shadow of the thumb (defaults to --shadow-sm; none with color=\"primary\")"
      },
      {
        "name": "--segmented-control-selected-color",
        "description": "Text color of the selected segment"
      },
      {
        "name": "--segmented-control-duration",
        "description": "Duration of the thumb slide (defaults to --transition-base)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Pick a view

[(value)] holds the selected value; (change) reports user selections. One tab stop: the arrow keys move and select, Home / End jump to the ends.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSegmentedControl } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSegmentedControl],
  template: `
<mn-segmented-control aria-label="Calendar view" [options]="options" [(value)]="value"/><output>Showing the {{value}} view</output>
  `,
})
export class Example {
  value: string | null | undefined = "week";
  options = [
  {
    "value": "day",
    "label": "Day"
  },
  {
    "value": "week",
    "label": "Week"
  },
  {
    "value": "month",
    "label": "Month"
  }
];
}

```

## Example: Sizes, full width and colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSegmentedControl } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSegmentedControl],
  template: `
<mn-segmented-control size="small" aria-label="Small" [options]="periods" defaultValue="Daily"/><mn-segmented-control size="large" color="primary" aria-label="Large" [options]="periods" defaultValue="Weekly"/><mn-segmented-control fullWidth aria-label="Full width" [options]="periods" defaultValue="Monthly"/>
  `,
})
export class Example {
  periods = ["Daily", "Weekly", "Monthly"];
}

```

## Example: Change events and disabled segments

Disabled segments are skipped by the arrow keys; disabled blocks the whole control. The component is also a ControlValueAccessor (ngModel, formControl).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSegmentedControl } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSegmentedControl],
  template: `
<mn-segmented-control aria-label="Theme" [options]="themes" [(value)]="mode" (change)="changes = changes + 1"/><mn-segmented-control disabled aria-label="Theme (disabled)" [options]="themes" value="light"/><output>Theme: {{mode}} ({{changes}} changes)</output>
  `,
})
export class Example {
  mode = "dark";
  changes = 0;
  themes = [
  {
    "value": "light",
    "label": "Light"
  },
  {
    "value": "dark",
    "label": "Dark"
  },
  {
    "value": "system",
    "label": "System",
    "disabled": true
  }
];
}

```
