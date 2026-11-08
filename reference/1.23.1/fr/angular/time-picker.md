# TimePicker

Sélectionne une heure de la journée dans des colonnes heures / minutes / secondes, ou par saisie.

Package: minerva-design@1.23.1

Renderer: angular

Locale: fr

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

### Clavier et accessibilité

Flèche bas sur le champ ouvre le panneau ; un clic à l'extérieur le ferme.

Chaque colonne (heures, minutes, secondes, AM/PM) est une listbox : Flèche haut / Flèche bas, Début et Fin s'y déplacent, Flèche gauche / Flèche droite changent de colonne.

Entrée ou Espace choisit l'option qui a le focus.

Échap ferme le panneau et rend le focus au champ. Tab après la dernière colonne le ferme et passe au champ suivant ; Maj+Tab avant la première colonne le ferme et revient au champ.

Le texte saisi n'est validé qu'une fois qu'il forme une heure complète et valide. À la perte du focus, une analyse plus souple est appliquée ; un texte vide efface la valeur et un texte illisible restaure la précédente.

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
