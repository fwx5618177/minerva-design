# Tag

Petites étiquettes pour marquer et catégoriser du contenu ; elles peuvent être fermables ou cliquables.

Package: minerva-design@1.22.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Accessibilité

Avec clickable, le tag reçoit role="button" et tabIndex=0, et Entrée ou Espace déclenchent onClick comme un clic. Réservez-le aux actions ou bascules, pas à la navigation (utilisez un lien).

Le bouton de fermeture est un  natif avec son propre arrêt de tabulation. Son nom accessible est « Close » par défaut ; définissez closeLabel (ex. « Remove React ») pour indiquer quel tag il supprime.

Un tag cliquable désactivé conserve role="button" avec aria-disabled="true" et est ignoré par Tab. Si l'état sélectionné compte, exprimez-le aussi par du texte ou des attributs aria, pas seulement par la couleur.

## Tag

Support: beta

All semantic colors, sizes, variants and shapes; icon/avatar/close slots; pressed/elevation; click/close loading and disabled guards. Native tap replaces browser focus/hover ripple. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/tag/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "closable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "subtle"
  },
  {
    "name": "status",
    "typeText": "string",
    "required": false,
    "default": "info"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "neutral"
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": "rounded"
  },
  {
    "name": "clickable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "pressed",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "avatar",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "closeIcon",
    "typeText": "string",
    "required": false,
    "default": "×"
  },
  {
    "name": "closeLabel",
    "typeText": "string",
    "required": false,
    "default": "Remove"
  }
]
```

### events

```json
[
  {
    "name": "close"
  },
  {
    "name": "click"
  }
]
```

### slots

```json
[
  {
    "name": "avatar"
  },
  {
    "name": "icon"
  },
  {
    "name": "default"
  },
  {
    "name": "close"
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
