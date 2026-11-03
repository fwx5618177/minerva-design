# DatePicker

Sélectionne une date dans une grille mensuelle surgissante commençant le lundi, ou par saisie au format AAAA-MM-JJ.

Package: minerva-design@1.20.0

Renderer: react

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | null | undefined",
    "typeRef": "type:5d93807f845ffb9259f1",
    "required": false,
    "description": "Selected date as `\"YYYY-MM-DD\"` (controlled; pair with `onChange`). `\"\"` or `null` means \"no date\" while staying controlled; `undefined` makes the picker uncontrolled."
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected date as `\"YYYY-MM-DD\"` (uncontrolled)"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the input"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label of the input; without it the input is labelled \"Date\" (localized)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the input when no visible label is shown"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the input; defaults to the id of an enclosing FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as required; defaults to the enclosing FormControl's state"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "date-picker",
    "required": false,
    "description": "Name of the input"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the picker; defaults to the enclosing FormControl's state"
  },
  {
    "name": "clearable",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Allows clearing the value with the suffix button"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false,
    "description": "Size of the input"
  },
  {
    "name": "minDate",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Earliest selectable date (`\"YYYY-MM-DD\"`); earlier days are disabled"
  },
  {
    "name": "maxDate",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Latest selectable date (`\"YYYY-MM-DD\"`); later days are disabled"
  },
  {
    "name": "locale",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the month heading (`Intl.DateTimeFormat`)"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:9ae0989a2dc6d4ff1d09",
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
    "description": "Called with the selected date (`\"YYYY-MM-DD\"`), or `\"\"` when the value is cleared"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:f1732a1ac5226db324f6",
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
    "description": "Called when the popup calendar opens or closes"
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
  "DatePickerProps": {
    "source": "react/src/components/DatePicker/types.ts",
    "description": "Props of DatePicker; `data-*` attributes are forwarded to the root element",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the <input> element"
      },
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "description": "Selected date as `\"YYYY-MM-DD\"` (controlled; pair with `onChange`). `\"\"` or `null` means \"no date\" while staying controlled; `undefined` makes the picker uncontrolled."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected date as `\"YYYY-MM-DD\"` (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the selected date (`\"YYYY-MM-DD\"`), or `\"\"` when the value is cleared"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Select date\" (localized)",
        "description": "Placeholder of the input"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Visible label of the input; without it the input is labelled \"Date\" (localized)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the input when no visible label is shown"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the input; defaults to the id of an enclosing FormControl"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as required; defaults to the enclosing FormControl's state"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"date-picker\"",
        "description": "Name of the input"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the popup calendar opens or closes"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the picker; defaults to the enclosing FormControl's state"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Allows clearing the value with the suffix button"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of the input"
      },
      {
        "name": "minDate",
        "type": "string",
        "required": false,
        "description": "Earliest selectable date (`\"YYYY-MM-DD\"`); earlier days are disabled"
      },
      {
        "name": "maxDate",
        "type": "string",
        "required": false,
        "description": "Latest selectable date (`\"YYYY-MM-DD\"`); later days are disabled"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the library language",
        "description": "Locale of the month heading (`Intl.DateTimeFormat`)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
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

### apps/docs/src/docs/pages/date-picker/demos/basic.tsx

```tsx
import { useState } from "react";
import { DatePicker } from "minerva-design";

export default function BasicDemo() {
  const [date, setDate] = useState("");

  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker onChange={setDate} />
      <p>Selected: {date || "none"}</p>
    </div>
  );
}

```

## Example: Contrôlé

Passez value et mettez-la à jour dans onChange. "" ou null garde le sélecteur contrôlé mais vide, tandis qu'undefined le rend non contrôlé.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Button, DatePicker } from "minerva-design";

export default function ControlledDemo() {
  const [date, setDate] = useState<string | null>("2026-04-17");

  return (
    <div
      style={{ display: "grid", gap: 12, justifyItems: "start", maxWidth: 280 }}
    >
      <DatePicker
        label="Target date"
        value={date}
        onChange={(next) => setDate(next || null)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="small" onClick={() => setDate("2026-05-01")}>
          Set to 2026-05-01
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setDate(null)}
        >
          Reset
        </Button>
      </div>
      <p>Value: {date ?? "null"}</p>
    </div>
  );
}

```

## Example: Valeur par défaut et effacement

defaultValue définit la date initiale. Le bouton d'effacement est libellé "Clear date" (effacer la date) ; utilisez clearable={false} pour le masquer.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/default-value.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}

```

## Example: Désactivé et lecture seule

Un sélecteur désactivé ou en lecture seule ne peut être ni ouvert ni modifié.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/disabled.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}

```

## Example: Avec FormField

Dans un FormControl / FormField, DatePicker hérite de l'id, du libellé, du texte d'aide / d'erreur et des états required, disabled, readOnly et invalid.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/form-control.tsx

```tsx
import { DatePicker, FormField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <FormField label="Start date" helperText="Format: YYYY-MM-DD" required>
        <DatePicker />
      </FormField>
      <FormField
        label="Deadline"
        errorMessage="Please choose a date in the future."
      >
        <DatePicker defaultValue="2026-01-01" />
      </FormField>
    </div>
  );
}

```

## Example: Plage de dates

minDate et maxDate ("YYYY-MM-DD") désactivent les dates hors de la plage autorisée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/min-max.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function MinMaxDemo() {
  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue="2026-04-15"
        minDate="2026-04-10"
        maxDate="2026-04-20"
        placeholder="2026-04-10 – 2026-04-20"
      />
    </div>
  );
}

```

## Example: Tailles

Trois tailles : small, medium (par défaut) et large.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/sizes.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}

```
