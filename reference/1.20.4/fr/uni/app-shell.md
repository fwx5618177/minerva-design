# AppShell

Cadre d'application : barre latérale repliable ou flottante, en-tête collant et un unique repère main ; la navigation passe dans un tiroir à 768px et moins.

Package: minerva-design@1.20.4

Renderer: uni

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
