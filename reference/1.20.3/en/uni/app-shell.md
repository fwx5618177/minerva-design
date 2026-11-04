# AppShell

Application chrome: a collapsible or floating sidebar, a sticky header and a single main landmark; navigation moves into a drawer at 768px and below.

Package: minerva-design@1.20.3

Renderer: uni

Locale: en

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

Controlled/default expanded/compact/floating sidebar modes; floating overlay rail; responsive mobile drawer; one navigation slot instance; committed-route close; labels and skip action. Native navigation uses scoped slots. H5 mobile drawers trap focus, mark outside content inert, lock scrolling and return focus; native devices require host validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "AppShell"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "brand",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "brandIcon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "navigationLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "navigationKey",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "sidebarMode",
    "typeText": "Mode | undefined",
    "required": false
  },
  {
    "name": "defaultSidebarMode",
    "typeText": "Mode | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<Record<\"expand\" | \"collapse\" | \"enableFloating\" | \"disableFloating\" | \"openNavigation\" | \"closeNavigation\", string>> | undefined",
    "required": false
  },
  {
    "name": "skipLink",
    "typeText": "string | boolean | undefined",
    "required": false
  },
  {
    "name": "sidebarWidth",
    "typeText": "number | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "sidebarModeChange",
    "typeText": "[mode: Mode]",
    "parameters": [
      {
        "name": "mode",
        "position": 0,
        "typeText": "Mode",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:sidebarMode",
    "typeText": "[mode: Mode]",
    "parameters": [
      {
        "name": "mode",
        "position": 0,
        "typeText": "Mode",
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
    "name": "brand-icon",
    "typeText": "{}"
  },
  {
    "name": "brand",
    "typeText": "{}"
  },
  {
    "name": "navigation",
    "typeText": "{ collapsed: boolean; isMobile: boolean; closeNavigation: () => void; expandNavigation: () => void; }"
  },
  {
    "name": "sidebar",
    "typeText": "{ collapsed: boolean; isMobile: boolean; closeNavigation: () => void; expandNavigation: () => void; }"
  },
  {
    "name": "header-actions",
    "typeText": "{}"
  },
  {
    "name": "header",
    "typeText": "{}"
  },
  {
    "name": "page-navigation",
    "typeText": "{}"
  },
  {
    "name": "default",
    "typeText": "{}"
  },
  {
    "name": "footer",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "sidebarMode",
    "event": "update:sidebarMode",
    "syntax": "v-model:sidebarMode"
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
