# Cascader

Sélectionne une valeur dans une hiérarchie d'options, niveau par niveau (ex. pays / région / ville).

Package: minerva-design@1.23.0

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Clavier et accessibilité

Entrée, Espace ou Flèche bas sur le champ ouvre le panneau et y déplace le focus ; donner simplement le focus au champ ne l'ouvre pas.

Flèche haut / Flèche bas, Début et Fin se déplacent dans une colonne.

Flèche droite ou Entrée déplie la colonne suivante (aussi après un chargement différé) et Entrée sélectionne une feuille ; Flèche gauche revient à la colonne précédente.

Échap ferme le panneau et rend le focus au champ ; Tab le ferme aussi.

Le champ a le rôle combobox. Son texte indicatif par défaut et le libellé du bouton "Clear selection" (effacer la sélection) suivent la langue de la bibliothèque React.

## Cascader

Support: beta

Hierarchical numeric/string paths, original option callbacks, concurrent horizontally scrolling columns, searchable enabled leaves/custom filter, max depth, clear, controlled refusal, live children, retryable asynchronous loading and measured viewport-fitting popup placement. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. expandTrigger=hover maps to native long press; native scroll panes replace browser hover; positioned popups remain in the native view hierarchy instead of a browser portal. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "value",
    "source": "packages/taro/src/forms.tsx",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false
  },
  {
    "name": "defaultValue",
    "source": "packages/taro/src/forms.tsx",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false
  },
  {
    "name": "options",
    "source": "packages/taro/src/forms.tsx",
    "kind": "array",
    "typeText": "CascaderOption[]",
    "typeRef": "type:0a0dd99a2907ba8f10a1",
    "required": true
  },
  {
    "name": "label",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "allowClear",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "showSearch",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "filter",
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((input: string, path: CascaderOption[]) => boolean) | undefined",
    "typeRef": "type:6941f846c1bbc7af1b95",
    "parameters": [
      {
        "name": "input",
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
        "typeRef": "type:0a0dd99a2907ba8f10a1"
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
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((path: CascaderOption[]) => void | Promise<void>) | undefined",
    "typeRef": "type:6f67df9ae82b94208765",
    "parameters": [
      {
        "name": "path",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:0a0dd99a2907ba8f10a1"
      }
    ],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": false
  },
  {
    "name": "displayRender",
    "source": "packages/taro/src/forms.tsx",
    "kind": "node",
    "typeText": "((labels: string[], path: CascaderOption[]) => ReactNode) | undefined",
    "typeRef": "type:896a59ebe2714742ad21",
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
        "typeRef": "type:0a0dd99a2907ba8f10a1"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false
  },
  {
    "name": "optionRender",
    "source": "packages/taro/src/forms.tsx",
    "kind": "node",
    "typeText": "((option: CascaderOption, level: number) => ReactNode) | undefined",
    "typeRef": "type:42e603275ddad4ed131d",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption",
        "typeRef": "type:d321d49c86ce9e3c8867"
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
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false
  },
  {
    "name": "maxLevel",
    "source": "packages/taro/src/forms.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "expandTrigger",
    "source": "packages/taro/src/forms.tsx",
    "kind": "enum",
    "values": [
      "click",
      "hover"
    ],
    "typeText": "\"click\" | \"hover\" | undefined",
    "typeRef": "type:00a6c9839f5572025301",
    "required": false
  },
  {
    "name": "width",
    "source": "packages/taro/src/forms.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false
  },
  {
    "name": "dropdownClassName",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "dropdownStyle",
    "source": "packages/taro/src/forms.tsx",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:953c30e5c14e6cc907b6",
    "required": false
  },
  {
    "name": "optionStyle",
    "source": "packages/taro/src/forms.tsx",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:953c30e5c14e6cc907b6",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/forms.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "placeholder",
    "source": "packages/taro/src/forms.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "name",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "invalid",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "required",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "contentClassName",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "open",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((value: (string | number)[], selectedOptions: CascaderOption[]) => void) | undefined",
    "typeRef": "type:dbf2d1fc2e6268735e01",
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
        "name": "selectedOptions",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:0a0dd99a2907ba8f10a1"
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
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:5722c29850834cdead8e",
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

### slots

```json
[
  {
    "name": "children"
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
