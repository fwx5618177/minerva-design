# Card

Un conteneur qui regroupe du contenu et des actions liés, composé de CardHeader, CardTitle, CardDescription, CardContent et CardFooter.

Package: minerva-design@1.20.6

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## Card

Support: beta

Header/content/footer slots, five variants, root and section padding, guarded interactive navigation and content animations. Native view/navigator behavior replaces polymorphic HTML tags. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/card/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "default"
  },
  {
    "name": "hoverable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "padding",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "headerPadding",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "contentPadding",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "footerPadding",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "interactive",
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
    "name": "href",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "animation",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "click"
  }
]
```

### slots

```json
[
  {
    "name": "header"
  },
  {
    "name": "default"
  },
  {
    "name": "footer"
  }
]
```

## CardContent

Support: n/a

Native composition uses Card: default content slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Card props/slots for the native equivalent.

## CardDescription

Support: n/a

Native composition uses Card: description prop. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Card props/slots for the native equivalent.

## CardFooter

Support: n/a

Native composition uses Card: footer slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Card props/slots for the native equivalent.

## CardHeader

Support: n/a

Native composition uses Card: title/description and header slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Card props/slots for the native equivalent.

## CardTitle

Support: n/a

Native composition uses Card: title prop. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Card props/slots for the native equivalent.

## CSS variables

```json
{
  "css:Card": {
    "kind": "cssVars",
    "source": "react/src/components/Card",
    "vars": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
