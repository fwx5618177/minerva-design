# TimePicker

Picks a time of day from hour, minute and second columns, or by typing it.

Package: minerva-design@1.22.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down on the input opens the panel; clicking outside closes it.

Each column (Hours, Minutes, Seconds, AM/PM) is a listbox: Arrow Up / Arrow Down, Home and End move within it, Arrow Left / Arrow Right switch columns.

Enter or Space picks the focused option.

Escape closes the panel and returns focus to the input. Tab past the last column closes it and moves on to the next field; Shift+Tab before the first column closes it and returns to the input.

Typed text is committed only once it is a complete, valid time. On blur a more lenient parse is applied; empty text clears the value and unparsable text restores the previous one.

## TimePicker

Support: beta

Native Angular: MnTimePicker. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTimePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "Date | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "Date | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "format",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "use12Hours",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "size",
    "typeText": "TimePickerSize",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "minTime",
    "typeText": "Date | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "maxTime",
    "typeText": "Date | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "showSecond",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "hourStep",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "minuteStep",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "secondStep",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "Date | null | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean",
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
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## CSS variables

```json
{
  "css:TimePicker": {
    "kind": "cssVars",
    "source": "react/src/components/TimePicker",
    "vars": [
      {
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Choose a time

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTimePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimePicker],
  template: `
<mn-time-picker label="Start time" [(value)]="time"/><output>{{time}}</output>
  `,
})
export class Example {
  time = null;
}

```

## Example: Disabled time

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTimePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimePicker],
  template: `
<mn-time-picker label="Unavailable time" disabled/>
  `,
})
export class Example {

}

```
