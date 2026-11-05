# Switch

Toggles a single setting on or off, with immediate effect.

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

## Switch

Support: beta

Controlled/default checked state with real native widget rollback, slider/segmented variants, sizes/colors/shapes, dual labels/placement, loading, icon slots and custom track/thumb styles. Native switch supplies form/touch behavior beneath token-styled track/thumb; browser focus/ripple event geometry differs. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/switch/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "checked",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
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
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "primary"
  },
  {
    "name": "defaultChecked",
    "typeText": "boolean",
    "required": false,
    "default": false
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
    "default": "round"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "slider"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "offLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "onLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labelPlacement",
    "typeText": "string",
    "required": false,
    "default": "end"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "ripple",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "trackStyle",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "thumbStyle",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "iconPlacement",
    "typeText": "string",
    "required": false,
    "default": "start"
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": "on"
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
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
    "name": "focus"
  },
  {
    "name": "blur"
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

## CSS variables

```json
{
  "css:Switch": {
    "kind": "cssVars",
    "source": "react/src/components/Switch",
    "vars": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
