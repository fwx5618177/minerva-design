# DatePicker

Sélectionne une date dans une grille mensuelle surgissante commençant le lundi, ou par saisie au format AAAA-MM-JJ.

Package: minerva-design@1.22.2

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Clavier et accessibilité

Flèche bas sur le champ ouvre le calendrier surgissant et déplace le focus sur la cellule du jour actif ; un clic à l'extérieur le ferme.

Les touches fléchées, Début / Fin et Page préc. / suiv. (avec Maj : un an) déplacent le focus dans la grille du calendrier.

Entrée ou Espace choisit le jour qui a le focus et ferme le panneau.

Échap ferme le panneau et rend le focus au champ.

Le texte saisi est validé dès qu'il forme une date YYYY-MM-DD complète dans la plage ; à la perte du focus, les formats souples comme YYYY/M/D sont normalisés.

## DatePicker

Support: beta

Native touch field with calendar dialog: local YYYY-MM-DD values, immediate day selection, bounds and clearing; no text entry or DOM keyboard grid.

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "DatePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | null | undefined",
    "typeRef": "type:5d93807f845ffb9259f1",
    "required": false,
    "description": "Selected local date, YYYY-MM-DD. null and \"\" remain controlled empty values."
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initial local date while uncontrolled."
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label and accessible name."
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accessibilityHint",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "nativeID",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Prevents opening, selection and clearing."
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "clearable",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "size",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false
  },
  {
    "name": "minDate",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Earliest selectable local day, YYYY-MM-DD, inclusive."
  },
  {
    "name": "maxDate",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Latest selectable local day, YYYY-MM-DD, inclusive."
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale for calendar month and date names; defaults to provider language."
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:c7af8cf7b3809b32005e",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Selected YYYY-MM-DD day, or \"\" when cleared."
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/DatePicker/DatePicker.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:2ae3dcdc5c09f89e15f2",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the calendar opens or closes."
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "native:DatePickerProps": {
    "source": "native/src/components/DatePicker/DatePicker.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "description": "Selected local date, YYYY-MM-DD. null and \"\" remain controlled empty values."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initial local date while uncontrolled."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Selected YYYY-MM-DD day, or \"\" when cleared."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the calendar opens or closes."
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Visible label and accessible name."
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "accessibilityHint",
        "type": "string",
        "required": false
      },
      {
        "name": "nativeID",
        "type": "string",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "description": "Prevents opening, selection and clearing."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\""
      },
      {
        "name": "minDate",
        "type": "string",
        "required": false,
        "description": "Earliest selectable local day, YYYY-MM-DD, inclusive."
      },
      {
        "name": "maxDate",
        "type": "string",
        "required": false,
        "description": "Latest selectable local day, YYYY-MM-DD, inclusive."
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "description": "Locale for calendar month and date names; defaults to provider language."
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false
      },
      {
        "name": "testID",
        "type": "string",
        "required": false
      }
    ]
  }
}
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

## Example: Utilisation de base

Cliquez sur le champ (ou appuyez sur Flèche bas) pour ouvrir le calendrier surgissant. onChange reçoit une chaîne "YYYY-MM-DD", ou "" après effacement. Sans label, le champ est nommé "Date".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/native/basic.tsx

```tsx
import { useState } from "react";
import { DatePicker } from "minerva-design/native";

export default function Basic() {
  const [date, setDate] = useState<string | null>("2026-01-15");
  return (
    <DatePicker
      label="Departure"
      value={date}
      onChange={setDate}
      minDate="2026-01-10"
      maxDate="2026-02-20"
      clearable
    />
  );
}

```
