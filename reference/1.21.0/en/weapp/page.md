# Page

Page scaffolding: Page, PageHeader, PageSection, StatCard and Toolbar for consistent screens.

Package: minerva-design@1.21.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Page

Support: beta

Page title, description, actions and constrained content; uni PageHeader/PageSection/StatCard/Toolbar. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/page/index",
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
    "name": "maxWidth",
    "typeText": "number",
    "required": false,
    "default": 1200
  }
]
```

### slots

```json
[
  {
    "name": "actions"
  },
  {
    "name": "default"
  }
]
```

## PageHeader

Support: n/a

Native composition uses Page: title/description/actions slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Page props/slots for the native equivalent.

## PageSection

Support: n/a

Native composition uses Page: default slot containing native view sections. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Page props/slots for the native equivalent.

## StatCard

Support: beta

Metric label/value including zero, description, icon prop/native icon slot and decorative icon semantics. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/stat-card/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "trend",
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
    "name": "icon",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### slots

```json
[
  {
    "name": "icon"
  },
  {
    "name": "default"
  }
]
```

## Toolbar

Support: n/a

Native composition uses Stack: horizontal actions slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Stack props/slots for the native equivalent.

## CSS variables

```json
{
  "css:Page": {
    "kind": "cssVars",
    "source": "react/src/components/Page",
    "vars": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
