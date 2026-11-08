# Tag

Petites étiquettes pour marquer et catégoriser du contenu ; elles peuvent être fermables ou cliquables.

Package: minerva-design@1.23.1

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Accessibilité

Avec clickable, le tag reçoit role="button" et tabIndex=0, et Entrée ou Espace déclenchent onClick comme un clic. Réservez-le aux actions ou bascules, pas à la navigation (utilisez un lien).

Le bouton de fermeture est un  natif avec son propre arrêt de tabulation. Son nom accessible est « Close » par défaut ; définissez closeLabel (ex. « Remove React ») pour indiquer quel tag il supprime.

Un tag cliquable désactivé conserve role="button" avec aria-disabled="true" et est ignoré par Tab. Si l'état sélectionné compte, exprimez-le aussi par du texte ou des attributs aria, pas seulement par la couleur.

## Tag

Support: beta

Color, variant, size, shape and elevation; pressed/clickable actions, loading state, independent close action, custom icon/avatar/close-icon slots and labels. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "closable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\" | undefined",
    "required": false
  },
  {
    "name": "status",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"rounded\" | \"circle\" | \"square\" | undefined",
    "required": false
  },
  {
    "name": "clickable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "pressed",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "elevation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "closeIcon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | ((label: string) => string) | undefined",
    "required": false
  },
  {
    "name": "ripple",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "close",
    "typeText": "[event: unknown]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "typeText": "[event: unknown]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "unknown",
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
    "name": "avatar",
    "typeText": "{}"
  },
  {
    "name": "icon",
    "typeText": "{}"
  },
  {
    "name": "default",
    "typeText": "{}"
  },
  {
    "name": "close-icon",
    "typeText": "{}"
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
