# Input

Champ de saisie sur une ligne avec tailles, variantes, contenu avant / après, bouton d'effacement, compteur de caractères et bascule de visibilité du mot de passe. Placez-le dans un FormField pour un libellé, une aide et un message d'erreur.

Package: minerva-design@1.23.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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
