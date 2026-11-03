# DatePicker

Sélectionne une date dans une grille mensuelle surgissante commençant le lundi, ou par saisie au format AAAA-MM-JJ.

Package: minerva-design@1.20.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Clavier et accessibilité

Flèche bas sur le champ ouvre le calendrier surgissant et déplace le focus sur la cellule du jour actif ; un clic à l'extérieur le ferme.

Les touches fléchées, Début / Fin et Page préc. / suiv. (avec Maj : un an) déplacent le focus dans la grille du calendrier.

Entrée ou Espace choisit le jour qui a le focus et ferme le panneau.

Échap ferme le panneau et rend le focus au champ.

Le texte saisi est validé dès qu'il forme une date YYYY-MM-DD complète dans la plage ; à la perte du focus, les formats souples comme YYYY/M/D sont normalisés.

## DatePicker

Support: beta

Native Angular: MnDatePicker. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDatePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "size",
    "typeText": "DatePickerSize",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "minDate",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "maxDate",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
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
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## CSS variables

```json
{
  "css:DatePicker": {
    "kind": "cssVars",
    "source": "react/src/components/DatePicker",
    "vars": [
      {
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Choose a date

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker],
  template: `
<mn-date-picker label="Meeting date" [(value)]="date"/><output>{{date || 'No date selected'}}</output>
  `,
})
export class Example {
  date = null;
}

```

## Example: Date range

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker],
  template: `
<mn-date-picker label="October booking" [(value)]="date" minDate="2026-10-10" maxDate="2026-10-20"/><output>{{date}}</output>
  `,
})
export class Example {
  date = "2026-10-15";
}

```

## Example: Form field

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker, MnFormControl, MnFormLabel, MnFormHelperText } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker, MnFormControl, MnFormLabel, MnFormHelperText],
  template: `
<mn-form-control required><mn-form-label>Birthday</mn-form-label><mn-date-picker [(value)]="date"/><mn-form-helper-text>Type YYYY-MM-DD or choose a day from the calendar.</mn-form-helper-text></mn-form-control>
  `,
})
export class Example {
  date = null;
}

```

## Example: Disabled and read-only dates

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-date-picker label="Read-only date" defaultValue="2026-10-15" readOnly/><mn-date-picker label="Disabled date" defaultValue="2026-10-15" disabled/></mn-stack>
  `,
})
export class Example {

}

```
