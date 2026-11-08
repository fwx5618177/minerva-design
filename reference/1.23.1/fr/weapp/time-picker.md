# TimePicker

Sélectionne une heure de la journée dans des colonnes heures / minutes / secondes, ou par saisie.

Package: minerva-design@1.23.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
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

Core strict/lenient typed parsing, controlled/default serialized time and null clear, seconds/format/12-hour mode, stepped hour/minute/second columns, bounds, labels/field flags, guarded opening and openchange. Native values use HH:mm[:ss] strings and null instead of Date/undefined; browser focus and keyboard panel navigation have native input equivalents. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/time-picker/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": false
  },
  {
    "name": "start",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "end",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": "Select time"
  },
  {
    "name": "defaultValue",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "format",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "use12Hours",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showSecond",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "hourStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "minuteStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "secondStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "minTime",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "maxTime",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": "time-picker"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "{ value: string | null }",
    "description": "Serialized HH:mm[:ss], or null on clear; Date is not transmitted across the native property boundary."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
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
