# Cascader

Sélectionne une valeur dans une hiérarchie d'options, niveau par niveau (ex. pays / région / ville).

Package: minerva-design@1.21.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Clavier et accessibilité

Entrée, Espace ou Flèche bas sur le champ ouvre le panneau et y déplace le focus ; donner simplement le focus au champ ne l'ouvre pas.

Flèche haut / Flèche bas, Début et Fin se déplacent dans une colonne.

Flèche droite ou Entrée déplie la colonne suivante (aussi après un chargement différé) et Entrée sélectionne une feuille ; Flèche gauche revient à la colonne précédente.

Échap ferme le panneau et rend le focus au champ ; Tab le ferme aussi.

Le champ a le rôle combobox. Son texte indicatif par défaut et le libellé du bouton "Clear selection" (effacer la sélection) suivent la langue de la bibliothèque React.

## Cascader

Support: beta

Controlled/default nested paths, separate browsing, configure({filter,optionRender,loadData}), lazy-load coalescing/loading/errors/retry, maxLevel, disabled branches, search and clear. Function callbacks use the native instance configure() API. optionRender returns native text; ReactNode renderers and pointer-hover expansion have no native equivalent. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/cascader/index",
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
    "name": "options",
    "typeText": "array",
    "required": false
  },
  {
    "name": "maxLevel",
    "typeText": "number",
    "required": false,
    "default": 6
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultValue",
    "typeText": "array",
    "required": false
  },
  {
    "name": "changeOnSelect",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showSearch",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "allowClear",
    "typeText": "boolean",
    "required": false,
    "default": true
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
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
  },
  {
    "name": "load",
    "typeText": "{ selectedOptions: unknown[] }",
    "description": "Lazy branch expansion requested."
  },
  {
    "name": "loaderror",
    "typeText": "{ message: string; selectedOptions: unknown[] }",
    "description": "Lazy load failed; the branch can be retried."
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
