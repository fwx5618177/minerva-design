# Tag

Petites étiquettes pour marquer et catégoriser du contenu ; elles peuvent être fermables ou cliquables.

Package: minerva-design@1.20.4

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### Accessibilité

Avec clickable, le tag reçoit role="button" et tabIndex=0, et Entrée ou Espace déclenchent onClick comme un clic. Réservez-le aux actions ou bascules, pas à la navigation (utilisez un lien).

Le bouton de fermeture est un  natif avec son propre arrêt de tabulation. Son nom accessible est « Close » par défaut ; définissez closeLabel (ex. « Remove React ») pour indiquer quel tag il supprime.

Un tag cliquable désactivé conserve role="button" avec aria-disabled="true" et est ignoré par Tab. Si l'état sélectionné compte, exprimez-le aussi par du texte ou des attributs aria, pas seulement par la couleur.

## Tag

Support: beta

Semantic roles/colors/variants/sizes, title/actions/custom icons, alert collapse/close/animations/banner/rounding/elevation and guarded tag actions/loading/shape/elevation and native measured touch-origin ripples. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Tag ripple coordinates use native touch/tap data and measured bounds, falling back to center for keyboard activation or hosts without coordinates. DOM focus-return behavior is not reproduced. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Tag"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "source": "packages/taro/src/display.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/display.tsx",
    "kind": "enum",
    "values": [
      "outline",
      "soft",
      "solid",
      "subtle"
    ],
    "typeText": "\"solid\" | \"outline\" | \"subtle\" | \"soft\" | undefined",
    "typeRef": "type:3ba043d969fe8a297d5d",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/display.tsx",
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
    "name": "shape",
    "source": "packages/taro/src/display.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "typeRef": "type:bc311df462bffff00236",
    "required": false
  },
  {
    "name": "closable",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "closeLabel",
    "source": "packages/taro/src/display.tsx",
    "kind": "union",
    "typeText": "string | ((label: string) => string) | undefined",
    "typeRef": "type:00d7ba7ef2048742b2b0",
    "parameters": [
      {
        "name": "label",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false
  },
  {
    "name": "closeIcon",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "clickable",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "pressed",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "icon",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "avatar",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "elevation",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "ripple",
    "source": "packages/taro/src/display.tsx",
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
  }
]
```

### events

```json
[
  {
    "name": "onClose",
    "source": "packages/taro/src/display.tsx",
    "kind": "function",
    "typeText": "((event: ITouchEvent) => void) | undefined",
    "typeRef": "type:f7b40babd9b6eccb005d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ITouchEvent",
        "typeRef": "type:7276d9ff893f9fea3df5"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onClick",
    "source": "packages/taro/src/display.tsx",
    "kind": "function",
    "typeText": "((event: ITouchEvent) => void) | undefined",
    "typeRef": "type:f7b40babd9b6eccb005d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ITouchEvent",
        "typeRef": "type:7276d9ff893f9fea3df5"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onPressedChange",
    "source": "packages/taro/src/display.tsx",
    "kind": "function",
    "typeText": "((pressed: boolean) => void) | undefined",
    "typeRef": "type:41adf7d71d70b15a6506",
    "parameters": [
      {
        "name": "pressed",
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
    "prop": "pressed",
    "event": "onPressedChange",
    "syntax": "pressed={pressed} onPressedChange={handler}"
  }
]
```

## CSS variables

```json
{
  "css:Tag": {
    "kind": "cssVars",
    "source": "react/src/components/Tag",
    "vars": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
