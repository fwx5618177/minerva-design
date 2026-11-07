# Alert アラート

システム通知や操作結果など、重要なメッセージをページ内に表示します。

Package: minerva-design@1.22.2

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Alert

Support: beta

Semantic colors/variants/sizes, status icons and custom icon/action/close slots, dismiss, controlled/default expansion, banner/elevation/radius and animation. ReactNode icon/action values use native slots; no DOM transition event objects. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/alert/index",
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
    "name": "status",
    "typeText": "string",
    "required": false,
    "default": "info"
  },
  {
    "name": "closable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "subtle"
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "showIcon",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "customIcon",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "customCloseIcon",
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
    "name": "closeIcon",
    "typeText": "string",
    "required": false,
    "default": "×"
  },
  {
    "name": "animation",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "animationName",
    "typeText": "string",
    "required": false,
    "default": "slideIn"
  },
  {
    "name": "banner",
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
    "name": "rounded",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "borderRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "collapsible",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "expanded",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultExpanded",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "closeLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "expandLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "collapseLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "iconLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "role",
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
    "name": "expand",
    "typeText": "{ expanded: boolean }",
    "description": "Controlled or local collapse request."
  },
  {
    "name": "close",
    "typeText": "{}",
    "description": "Dismissed alert."
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
  },
  {
    "name": "action"
  },
  {
    "name": "closeIcon"
  }
]
```

## CSS variables

```json
{
  "css:Alert": {
    "kind": "cssVars",
    "source": "react/src/components/Alert",
    "vars": [
      {
        "name": "--alert-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--alert-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg when rounded)"
      },
      {
        "name": "--alert-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--alert-icon-size",
        "description": "Size of the status icon (every size)"
      },
      {
        "name": "--alert-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--alert-shadow",
        "description": "Shadow of the elevated alert (defaults to --shadow-sm)"
      },
      {
        "name": "--alert-margin-bottom",
        "description": "Space below the alert"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
