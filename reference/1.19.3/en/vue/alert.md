# Alert

Displays an important message inline, such as system notices or the result of an action.

Package: minerva-design@1.19.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Alert

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Alert"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Alert title (or the `title` slot)",
    "typeText": "string"
  },
  {
    "name": "color",
    "type": "\"info\" | \"success\" | \"warning\" | \"danger\"",
    "default": "\"info\"",
    "required": false,
    "description": "Semantic (status) color, which also sets the default icon and the role",
    "typeText": "\"info\" | \"success\" | \"warning\" | \"danger\""
  },
  {
    "name": "variant",
    "type": "\"subtle\" | \"outline\" | \"solid\"",
    "default": "\"subtle\"",
    "required": false,
    "description": "Visual style: `subtle` (tinted background), `outline` (transparent\nbackground with a colored border) or `solid` (filled with the color)",
    "typeText": "\"subtle\" | \"outline\" | \"solid\""
  },
  {
    "name": "size",
    "type": "AlertSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Alert size",
    "typeText": "AlertSize"
  },
  {
    "name": "showIcon",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows the status icon of the color (or the `icon` slot)",
    "typeText": "boolean"
  },
  {
    "name": "closable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a close button",
    "typeText": "boolean"
  },
  {
    "name": "animation",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Plays an entrance animation",
    "typeText": "boolean"
  },
  {
    "name": "animationName",
    "type": "\"slideIn\" | \"fadeIn\" | \"bounce\" | \"zoom\"",
    "default": "\"slideIn\"",
    "required": false,
    "description": "Entrance animation name",
    "typeText": "\"slideIn\" | \"fadeIn\" | \"bounce\" | \"zoom\""
  },
  {
    "name": "banner",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Banner mode, suited to page-level notices at the top of a page",
    "typeText": "boolean"
  },
  {
    "name": "elevation",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Adds a drop shadow",
    "typeText": "boolean"
  },
  {
    "name": "rounded",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Rounds the corners",
    "typeText": "boolean"
  },
  {
    "name": "borderRadius",
    "type": "string | number",
    "required": false,
    "description": "Custom corner radius (a number is in px)",
    "typeText": "string | number"
  },
  {
    "name": "collapsible",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Lets the content be expanded and collapsed (requires a title)",
    "typeText": "boolean"
  },
  {
    "name": "expanded",
    "type": "boolean",
    "required": false,
    "description": "Whether the content is expanded (controlled, `v-model:expanded`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultExpanded",
    "type": "boolean",
    "required": false,
    "description": "Whether the content is initially expanded (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "closeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the close button",
    "typeText": "string"
  },
  {
    "name": "expandLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the toggle while the content is collapsed",
    "typeText": "string"
  },
  {
    "name": "collapseLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the toggle while the content is expanded",
    "typeText": "string"
  },
  {
    "name": "iconLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the status icon",
    "typeText": "string"
  },
  {
    "name": "returnFocus",
    "type": "FocusTarget",
    "required": false,
    "description": "Element receiving focus after the alert is closed with its close button:\nan element, a ref or a getter. Without it focus moves to the next\nfocusable element after the alert (else the previous one, else its\ncontainer), never to <body>",
    "typeText": "FocusTarget"
  },
  {
    "name": "role",
    "type": "string",
    "required": false,
    "description": "ARIA role of the alert. Danger and warning interrupt (\"alert\"), info\nand success are polite (\"status\")",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "close",
    "type": "[event: MouseEvent]",
    "typeText": "[event: MouseEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "MouseEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expand",
    "type": "[expanded: boolean]",
    "typeText": "[expanded: boolean]",
    "parameters": [
      {
        "name": "expanded",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:expanded",
    "type": "[expanded: boolean]",
    "typeText": "[expanded: boolean]",
    "parameters": [
      {
        "name": "expanded",
        "position": 0,
        "typeText": "boolean",
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
    "name": "default",
    "type": "any",
    "description": "Alert content",
    "typeText": "any"
  },
  {
    "name": "title",
    "type": "any",
    "description": "Alert title (the `title` prop)",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Custom icon, replacing the status icon",
    "typeText": "any"
  },
  {
    "name": "action",
    "type": "any",
    "description": "Action area rendered on the right, e.g. buttons",
    "typeText": "any"
  },
  {
    "name": "close-icon",
    "type": "any",
    "description": "Custom close icon",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "update:expanded",
    "syntax": "v-model:expanded"
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/vue/basic.vue

```vue
<script setup lang="ts">
import { Alert } from "minerva-design/vue";
</script>
<template>
  <Alert title="Changes saved" color="success"
    >Your settings are up to date.</Alert
  >
</template>

```

## Example: closable

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/alert/vue/closable.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Alert, Button, VStack } from "minerva-design/vue";
const visible = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Alert
      v-if="visible"
      closable
      title="Scheduled maintenance"
      @close="visible = false"
      >Service will restart tonight.</Alert
    ><Button v-else @click="visible = true">Restore notice</Button></VStack
  >
</template>

```

## Example: collapsible

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/alert/vue/collapsible.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Alert, VStack } from "minerva-design/vue";
const expanded = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Alert v-model:expanded="expanded" collapsible title="Release details"
      >New components and accessibility improvements are available.</Alert
    ><output>{{ expanded ? "Expanded" : "Collapsed" }}</output></VStack
  >
</template>

```

## Example: variants-sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/vue/variants-sizes.vue

```vue
<script setup lang="ts">
import { Alert, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Alert color="info" variant="subtle" size="small" title="Tip"
      >Use keyboard shortcuts to move faster.</Alert
    ><Alert color="warning" variant="outline" title="Storage almost full"
      >Archive unused files.</Alert
    ><Alert color="danger" variant="solid" size="large" title="Connection lost"
      >Reconnect to continue.</Alert
    ></VStack
  >
</template>

```
