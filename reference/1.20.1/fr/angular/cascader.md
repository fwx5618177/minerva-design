# Cascader

Sélectionne une valeur dans une hiérarchie d'options, niveau par niveau (ex. pays / région / ville).

Package: minerva-design@1.20.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Clavier et accessibilité

Entrée, Espace ou Flèche bas sur le champ ouvre le panneau et y déplace le focus ; donner simplement le focus au champ ne l'ouvre pas.

Flèche haut / Flèche bas, Début et Fin se déplacent dans une colonne.

Flèche droite ou Entrée déplie la colonne suivante (aussi après un chargement différé) et Entrée sélectionne une feuille ; Flèche gauche revient à la colonne précédente.

Échap ferme le panneau et rend le focus au champ ; Tab le ferme aussi.

Le champ a le rôle combobox. Son texte indicatif par défaut et le libellé du bouton "Clear selection" (effacer la sélection) suivent la langue de la bibliothèque React.

## Cascader

Support: beta

Native Angular: MnCascader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCascader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "options",
    "typeText": "CascaderOption[]",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "value",
    "typeText": "CascaderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "CascaderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "displayRender",
    "typeText": "((labels: string[], selectedOptions: CascaderOption[]) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "allowClear",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "expandTrigger",
    "typeText": "\"click\" | \"hover\"",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "showSearch",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "filter",
    "typeText": "((inputValue: string, path: CascaderOption[]) => boolean) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "loadData",
    "typeText": "((selectedOptions: CascaderOption[]) => void) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "optionRender",
    "typeText": "TemplateRef<CascaderOptionContext> | null",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "width",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "maxLevel",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "dropdownStyle",
    "typeText": "CascaderStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "optionStyle",
    "typeText": "CascaderStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "CascaderValue | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "selectionChange",
    "typeText": "CascaderSelectionChange",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "CascaderSelectionChange",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "clear",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "search",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
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

## Example: Hierarchical selection

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCascader } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCascader],
  template: `
<mn-cascader name="region" label="Region" [options]="options" [(value)]="value"/><output>{{value}}</output>
  `,
})
export class Example {
  options = [
  {
    "value": "europe",
    "label": "Europe",
    "children": [
      {
        "value": "france",
        "label": "France"
      },
      {
        "value": "spain",
        "label": "Spain"
      }
    ]
  },
  {
    "value": "asia",
    "label": "Asia",
    "children": [
      {
        "value": "japan",
        "label": "Japan"
      }
    ]
  }
];
  value: string[] = [];
}

```

## Example: Disabled field

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCascader } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCascader],
  template: `
<mn-cascader name="region" label="Locked region" [options]="options" disabled/>
  `,
})
export class Example {
  options = [
  {
    "value": "global",
    "label": "Global"
  }
];
}

```
