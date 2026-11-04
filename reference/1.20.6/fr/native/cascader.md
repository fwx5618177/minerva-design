# Cascader

Sélectionne une valeur dans une hiérarchie d'options, niveau par niveau (ex. pays / région / ville).

Package: minerva-design@1.20.6

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### Clavier et accessibilité

Entrée, Espace ou Flèche bas sur le champ ouvre le panneau et y déplace le focus ; donner simplement le focus au champ ne l'ouvre pas.

Flèche haut / Flèche bas, Début et Fin se déplacent dans une colonne.

Flèche droite ou Entrée déplie la colonne suivante (aussi après un chargement différé) et Entrée sélectionne une feuille ; Flèche gauche revient à la colonne précédente.

Échap ferme le panneau et rend le focus au champ ; Tab le ferme aussi.

Le champ a le rôle combobox. Son texte indicatif par défaut et le libellé du bouton "Clear selection" (effacer la sélection) suivent la langue de la bibliothèque React.

## Cascader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "array",
    "typeText": "CascaderOption[]",
    "typeRef": "type:5479f79bddc002f83c85",
    "required": true
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "changeOnSelect",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "showSearch",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "filter",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((query: string, path: CascaderOption[]) => boolean) | undefined",
    "typeRef": "type:d8582f48bce41c8c43df",
    "parameters": [
      {
        "name": "query",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "path",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:5479f79bddc002f83c85"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false
  },
  {
    "name": "loadData",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((path: CascaderOption[]) => void) | undefined",
    "typeRef": "type:90b9e1471076206e819c",
    "parameters": [
      {
        "name": "path",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:5479f79bddc002f83c85"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "displayRender",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "node",
    "typeText": "((labels: string[], path: CascaderOption[]) => ReactNode) | undefined",
    "typeRef": "type:1c0ca9a5c727c7b72a75",
    "parameters": [
      {
        "name": "labels",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      },
      {
        "name": "path",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:5479f79bddc002f83c85"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false
  },
  {
    "name": "optionRender",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "node",
    "typeText": "((option: CascaderOption, level: number) => ReactNode) | undefined",
    "typeRef": "type:74eb69dd56fed4a8fe25",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption",
        "typeRef": "type:8a60099ae7e5d4d5dd4f"
      },
      {
        "name": "level",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false
  },
  {
    "name": "allowClear",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "maxLevel",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 6,
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((value: (string | number)[], options: CascaderOption[]) => void) | undefined",
    "typeRef": "type:2c94d76bc243324eb215",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "(string | number)[]",
        "typeRef": "type:6a8218963ce603035852"
      },
      {
        "name": "options",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:5479f79bddc002f83c85"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:171f26ef457895029d16",
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
    "required": false
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
  },
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## API

```json
{
  "native:CascaderProps": {
    "source": "native/src/components/Cascader/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "options",
        "type": "CascaderOption[]",
        "required": true
      },
      {
        "name": "value",
        "type": "(string | number)[]",
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "(string | number)[]",
        "required": false
      },
      {
        "name": "onChange",
        "type": "(value: (string | number)[], options: CascaderOption[]) => void",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "placeholder",
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
        "required": false
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false
      },
      {
        "name": "changeOnSelect",
        "type": "boolean",
        "required": false
      },
      {
        "name": "showSearch",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "filter",
        "type": "(query: string, path: CascaderOption[]) => boolean",
        "required": false
      },
      {
        "name": "loadData",
        "type": "(path: CascaderOption[]) => void",
        "required": false
      },
      {
        "name": "displayRender",
        "type": "(labels: string[], path: CascaderOption[]) => ReactNode",
        "required": false
      },
      {
        "name": "optionRender",
        "type": "(option: CascaderOption, level: number) => ReactNode",
        "required": false
      },
      {
        "name": "allowClear",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "maxLevel",
        "type": "number",
        "required": false,
        "default": "6"
      }
    ]
  }
}
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

## Example: Utilisation de base

Cliquez sur le champ (ou appuyez sur Entrée, Espace ou Flèche bas) pour ouvrir le panneau, puis cliquez sur une option pour ouvrir le niveau suivant ; choisir une feuille termine la sélection. La liste s'élargit avec ses colonnes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/native/basic.tsx

```tsx
import { Cascader } from "minerva-design/native";
export default function Basic() {
  return (
    <Cascader
      label="Region"
      showSearch
      allowClear
      options={[
        {
          value: "cn",
          label: "China",
          children: [
            { value: "sh", label: "Shanghai" },
            { value: "bj", label: "Beijing" },
          ],
        },
        {
          value: "fr",
          label: "France",
          children: [{ value: "paris", label: "Paris" }],
        },
      ]}
    />
  );
}

```
