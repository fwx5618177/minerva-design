# Radio 单选框

用于在一组选项中选择唯一的一项。使用 RadioGroup 统一管理多个单选框的选中状态。

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

## Radio

Support: beta

Controlled/default selection, semantic size/color, name, label, required/error/helper/error-icon state and readonly guards. Standalone native view choices do not reproduce browser same-name radio grouping; use RadioGroup options for native exclusive selection. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radio/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "checked",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultChecked",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "primary"
  },
  {
    "name": "error",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "errorMessage",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "helperText",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "errorIcon",
    "typeText": "string",
    "required": false,
    "default": "!"
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "change"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  },
  {
    "name": "errorIcon"
  }
]
```

## RadioGroup

Support: beta

Exclusive options with controlled value including null/no-selection, defaultValue, direction, group size/color override, name/label/required/error/helper and disabled/readonly guards. Native options represent React Radio children; browser keyboard grouping/serialization differs. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radio-group/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "options",
    "typeText": "array",
    "required": false
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": false
  },
  {
    "name": "direction",
    "typeText": "string",
    "required": false,
    "default": "vertical"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultValue",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "error",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "helperText",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "change"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:Radio": {
    "kind": "cssVars",
    "source": "react/src/components/Radio",
    "vars": [
      {
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
