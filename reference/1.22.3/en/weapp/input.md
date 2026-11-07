# Input

A single-line text input with sizes, variants, prefix / suffix content, a clear button, a character count and a password visibility toggle. Wrap it in a FormField for a label, helper text and error message.

Package: minerva-design@1.22.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Input

Support: beta

Controlled/default text with rejected native input rollback; password visibility; clear/focus; character count; prefix/suffix slots; invalid/required/size/variant and native events. Native readonly prevents keyboard editing using disabled; FormControl/FormField flags now inherit through native relations. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/input/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "value",
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
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "type",
    "typeText": "string",
    "required": false,
    "default": "text"
  },
  {
    "name": "password",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "maxlength",
    "typeText": "number",
    "required": false,
    "default": -1
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "outline"
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "invalid",
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
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showCharCount",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "prefix",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "suffix",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "clearLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "showPasswordLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "hidePasswordLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultValue",
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
    "name": "change"
  },
  {
    "name": "clear"
  },
  {
    "name": "focus"
  },
  {
    "name": "blur"
  },
  {
    "name": "confirm"
  }
]
```

### slots

```json
[
  {
    "name": "prefix"
  },
  {
    "name": "suffix"
  }
]
```

## CSS variables

```json
{
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
