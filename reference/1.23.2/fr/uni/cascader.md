# Cascader

Sélectionne une valeur dans une hiérarchie d'options, niveau par niveau (ex. pays / région / ville).

Package: minerva-design@1.23.2

Renderer: uni

Locale: fr

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

### Clavier et accessibilité

Entrée, Espace ou Flèche bas sur le champ ouvre le panneau et y déplace le focus ; donner simplement le focus au champ ne l'ouvre pas.

Flèche haut / Flèche bas, Début et Fin se déplacent dans une colonne.

Flèche droite ou Entrée déplie la colonne suivante (aussi après un chargement différé) et Entrée sélectionne une feuille ; Flèche gauche revient à la colonne précédente.

Échap ferme le panneau et rend le focus au champ ; Tab le ferme aussi.

Le champ a le rôle combobox. Son texte indicatif par défaut et le libellé du bouton "Clear selection" (effacer la sélection) suivent la langue de la bibliothèque React.

## Cascader

Support: beta

Shared core path resolution/search excluding disabled ancestors; controlled selection separate from intermediate expansion; defaults/model, custom filter/display, clear, lazy loadData, loading suppression, maxLevel, option slots, H5 column navigation and native confirm. Form state and numeric values are preserved. Option rendering uses native scoped slots instead of ReactNode callbacks. H5 hover/keys are supported; touch hosts use activation and keep keyboard focus in the input. Inline popup is not a DOM portal. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Cascader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "typeText": "Option[] | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "(string | number)[] | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "(string | number)[] | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "(string | number)[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabelledby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaDescribedby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "changeOnSelect",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showSearch",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "allowClear",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "maxLevel",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "displayRender",
    "typeText": "((labels: string[], options: Option[]) => string) | undefined",
    "required": false
  },
  {
    "name": "filter",
    "typeText": "((input: string, path: Option[]) => boolean) | undefined",
    "required": false
  },
  {
    "name": "loadData",
    "typeText": "((path: Option[]) => void) | undefined",
    "required": false
  },
  {
    "name": "expandTrigger",
    "typeText": "\"click\" | \"hover\" | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dropdownStyle",
    "typeText": "CSSProperties | undefined",
    "required": false
  },
  {
    "name": "optionStyle",
    "typeText": "CSSProperties | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: (string | number)[], options: Option[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "(string | number)[]",
        "required": true,
        "rest": false
      },
      {
        "name": "options",
        "position": 1,
        "typeText": "Option[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: (string | number)[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "(string | number)[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
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
    "name": "search-option",
    "typeText": "{ path: Option[]; }"
  },
  {
    "name": "option",
    "typeText": "{ option: Option; level: number; }"
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  }
]
```

## CSS variables

```json
{
  "css:Cascader": {
    "kind": "cssVars",
    "source": "react/src/components/Cascader",
    "vars": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
