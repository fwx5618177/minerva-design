# LoadingState

Chargement de page, de route ou de section : un spinner ProgressIndicator décoratif à côté d'un libellé visible, dans une seule région de statut polie.

Package: minerva-design@1.23.1

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## LoadingState

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "LoadingState"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Visible text, which is also what the status region announces",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "LoadingStateSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Minimum height: small for a section, medium for a page or route, large for\ntall content such as a calendar",
    "typeText": "LoadingStateSize"
  }
]
```

## CSS variables

```json
{
  "css:LoadingState": {
    "kind": "cssVars",
    "source": "react/src/components/LoadingState",
    "vars": [
      {
        "name": "--loading-state-gap",
        "description": "Space between the spinner and the label"
      },
      {
        "name": "--loading-state-padding",
        "description": "Padding"
      },
      {
        "name": "--loading-state-min-height",
        "description": "Minimum height (every size; defaults to the height of the size)"
      },
      {
        "name": "--loading-state-color",
        "description": "Color of the label and the spinner"
      },
      {
        "name": "--loading-state-font-size",
        "description": "Font size of the label"
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

### apps/docs/src/docs/pages/loading-state/vue/basic.vue

```vue
<script setup lang="ts">
import { LoadingState } from "minerva-design/vue";
</script>
<template>
  <LoadingState label="Loading projects…" />
</template>

```

## Example: section

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/vue/section.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { LoadingState, Card, CardContent, Button } from "minerva-design/vue";
const loading = ref(true);
</script>
<template>
  <Card
    ><CardContent
      ><Button @click="loading = !loading">{{
        loading ? "Finish loading" : "Reload"
      }}</Button
      ><LoadingState v-if="loading" size="small" label="Fetching activity…" />
      <p v-else>All activity is up to date.</p></CardContent
    ></Card
  >
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/vue/sizes.vue

```vue
<script setup lang="ts">
import { LoadingState, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><LoadingState size="small" label="Loading section…" /><LoadingState
      size="large"
      label="Preparing calendar…"
  /></VStack>
</template>

```
