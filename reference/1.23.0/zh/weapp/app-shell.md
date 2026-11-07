# AppShell 应用外壳

应用外壳：可折叠或浮动的侧边栏、吸顶头部和唯一的 main 地标；768px 及以下时导航移入抽屉。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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
