# Tag

Small labels for marking and categorizing content; can be closable or clickable.

Package: minerva-design@1.23.0

Renderer: weapp

Locale: en

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

### Accessibility

With clickable, the tag gets role="button" and tabIndex=0, and Enter or Space trigger onClick just like a mouse click. Use it for actions or toggles, not for navigation (use a link instead).

The close button is a native  with its own tab stop. Its accessible name defaults to "Close"; set closeLabel (e.g. "Remove React") so screen-reader users know which tag it removes.

A disabled clickable tag keeps role="button" with aria-disabled="true" and is skipped by Tab. When the selected state matters, also convey it in text or with aria attributes, not only with color.

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
