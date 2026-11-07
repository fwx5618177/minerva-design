# Card

A container that groups related content and actions, composed of CardHeader, CardTitle, CardDescription, CardContent and CardFooter.

Package: minerva-design@1.22.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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
