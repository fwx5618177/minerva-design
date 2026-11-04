# AppShell

Cadre d'application : barre latérale repliable ou flottante, en-tête collant et un unique repère main ; la navigation passe dans un tiroir à 768px et moins.

Package: minerva-design@1.20.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## AppShell

Support: beta

Controlled/default expanded/compact/floating modes, mobile drawer/backdrop, navigationKey close, explicit pin/expand controls, brand/header/page navigation/footer slots and navigationstate events. Floating rail expands by explicit tap instead of mouse hover; native accessibility replaces DOM skip-link focus. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/app-shell/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "sidebarWidth",
    "typeText": "number",
    "required": false,
    "default": 240
  },
  {
    "name": "brand",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "brandIcon",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "sidebarMode",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultSidebarMode",
    "typeText": "string",
    "required": false,
    "default": "expanded"
  },
  {
    "name": "navigationLabel",
    "typeText": "string",
    "required": false,
    "default": "Navigation"
  },
  {
    "name": "navigationKey",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "sidebarmodechange",
    "typeText": "{ mode: 'expanded' | 'compact' | 'floating' }",
    "description": "Requested desktop sidebar mode."
  },
  {
    "name": "navigationstate",
    "typeText": "{ mode: string; collapsed: boolean; isMobile: boolean; open: boolean }",
    "description": "Current native navigation state for the navigation slot owner."
  }
]
```

### slots

```json
[
  {
    "name": "brandIcon"
  },
  {
    "name": "brand"
  },
  {
    "name": "navigation"
  },
  {
    "name": "sidebar"
  },
  {
    "name": "header"
  },
  {
    "name": "headerActions"
  },
  {
    "name": "pageNavigation"
  },
  {
    "name": "default"
  },
  {
    "name": "footer"
  }
]
```

## CSS variables

```json
{
  "css:AppShell": {
    "kind": "cssVars",
    "source": "react/src/components/AppShell",
    "vars": [
      {
        "name": "--app-shell-sidebar-width",
        "description": "Width of the expanded sidebar"
      },
      {
        "name": "--app-shell-rail-width",
        "description": "Width of the compact / floating rail"
      },
      {
        "name": "--app-shell-header-height",
        "description": "Minimum height of the header and the sidebar brand row"
      },
      {
        "name": "--app-shell-background",
        "description": "Background of the page area"
      },
      {
        "name": "--app-shell-sidebar-background",
        "description": "Background of the sidebar and the mobile navigation drawer"
      },
      {
        "name": "--app-shell-header-background",
        "description": "Background of the sticky header"
      },
      {
        "name": "--app-shell-drawer-width",
        "description": "Width of the mobile navigation drawer"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
