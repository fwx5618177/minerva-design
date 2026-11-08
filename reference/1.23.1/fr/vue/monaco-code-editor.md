# MonacoCodeEditor

Éditeur Monaco étiqueté utilisant un moteur local (jamais de CDN) et suivant le thème de la page. Si le moteur ne se charge pas à temps, il se replie sur une zone de texte modifiable avec un bouton Réessayer. Importez-le depuis minerva-design/monaco ; @monaco-editor/react et monaco-editor sont des dépendances pairs optionnelles. Le Web Component <minerva-code-editor> est publié comme entrée optionnelle minerva-design/web-components/code-editor (hors de l'entrée tout-en-un et du bundle CDN), avec monaco-editor comme dépendance pair optionnelle.

Package: minerva-design@1.23.1

Renderer: vue

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

## CodeEditor

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MonacoCodeEditor

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue/monaco",
  "exports": [
    "MonacoCodeEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "monaco",
    "type": "typeof import(\"monaco-editor\")",
    "required": false,
    "description": "Local Monaco engine. Configure its workers in the host; never fetched from a CDN.",
    "typeText": "typeof import(\"monaco-editor\")"
  },
  {
    "name": "modelValue",
    "type": "string",
    "required": true,
    "description": "Controlled source text, used with v-model.",
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": true,
    "description": "Visible and accessible editor label.",
    "typeText": "string"
  },
  {
    "name": "language",
    "type": "string",
    "default": "\"plaintext\"",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "height",
    "type": "number",
    "default": "420",
    "required": false,
    "typeText": "number"
  },
  {
    "name": "minHeight",
    "type": "number",
    "default": "160",
    "required": false,
    "typeText": "number"
  },
  {
    "name": "maxHeight",
    "type": "number",
    "default": "800",
    "required": false,
    "typeText": "number"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "theme",
    "type": "\"light\" | \"dark\"",
    "required": false,
    "typeText": "\"light\" | \"dark\""
  },
  {
    "name": "loadTimeout",
    "type": "number",
    "default": "10000",
    "required": false,
    "description": "Time allowed for a late engine injection before showing the editable fallback.",
    "typeText": "number"
  },
  {
    "name": "unavailableText",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "retryText",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "retryLabel",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "loadingLabel",
    "type": "string",
    "required": false,
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: string]",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: string]",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  }
]
```

## CSS variables

```json
{
  "css:MonacoCodeEditor": {
    "kind": "cssVars",
    "source": "react/src/components/MonacoCodeEditor",
    "vars": [
      {
        "name": "--monaco-code-editor-radius",
        "description": "Corner radius of the editor surface (defaults to --radius-md)"
      },
      {
        "name": "--monaco-code-editor-border-color",
        "description": "Border color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-bg",
        "description": "Background color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-label-gap",
        "description": "Space between the label and the editor"
      },
      {
        "name": "--monaco-code-editor-font-size",
        "description": "Font size of the label, the messages and the plain-text fallback"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, monaco-editor, vue

Documentation context imports: none

### apps/docs/src/docs/pages/monaco-code-editor/vue/basic.vue

```vue
<script setup lang="ts">
import { onMounted, shallowRef, ref } from "vue";
import { MonacoCodeEditor } from "minerva-design/vue/monaco";
import { Alert, Switch, Stack } from "minerva-design/vue";

const code = ref("<h1>Hello, Minerva</h1>");
const disabled = ref(false);
const engine = shallowRef<typeof import("monaco-editor")>();
const loadError = ref("");
// The host configures MonacoEnvironment.getWorker. The docs use a bundled
// local worker; neither the editor nor its worker is fetched from a CDN.
onMounted(async () => {
  try {
    engine.value = (await import("../engine")).monaco;
  } catch (error) {
    loadError.value =
      error instanceof Error
        ? error.message
        : "The local editor engine could not be loaded.";
  }
});
</script>

<template>
  <Stack :gap="3" style="width: 100%">
    <Switch v-model="disabled" label="Read-only editor" />
    <Alert v-if="loadError" color="danger" title="Editor engine unavailable">{{
      loadError
    }}</Alert>
    <MonacoCodeEditor
      v-model="code"
      :monaco="engine"
      label="HTML source"
      language="html"
      :disabled="disabled"
      :height="280"
    />
    <output aria-live="polite">{{ code.length }} characters</output>
  </Stack>
</template>

```

### apps/docs/src/docs/pages/monaco-code-editor/engine.ts

```tsx
// Local Monaco engine for the docs demo (never fetched from a CDN). Loaded
// on demand by demos/basic.tsx, so it stays out of the docs page chunk.
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = { getWorker: () => new EditorWorker() };

export { monaco };

```

## Example: fallback

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, monaco-editor, vue

Documentation context imports: none

### apps/docs/src/docs/pages/monaco-code-editor/vue/fallback.vue

```vue
<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { MonacoCodeEditor } from "minerva-design/vue/monaco";
import { Alert, Button, Stack } from "minerva-design/vue";

const code = ref("Text stays editable while the engine is unavailable.");
const engine = shallowRef<typeof import("monaco-editor")>();
const loading = ref(false);
const loadError = ref("");
async function recover() {
  loading.value = true;
  loadError.value = "";
  try {
    engine.value = (await import("../engine")).monaco;
  } catch (error) {
    loadError.value =
      error instanceof Error
        ? error.message
        : "The local editor engine could not be loaded. Retry when it is available.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Stack :gap="3" style="width: 100%">
    <MonacoCodeEditor
      v-model="code"
      :monaco="engine"
      label="Recoverable editor"
      :load-timeout="1"
      :height="220"
    />
    <Button :loading="loading" @click="recover"
      >Load local editor engine</Button
    >
    <Alert v-if="loadError" color="danger" title="Editor engine unavailable">{{
      loadError
    }}</Alert>
    <output>{{ code }}</output>
  </Stack>
</template>

```

### apps/docs/src/docs/pages/monaco-code-editor/engine.ts

```tsx
// Local Monaco engine for the docs demo (never fetched from a CDN). Loaded
// on demand by demos/basic.tsx, so it stays out of the docs page chunk.
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = { getWorker: () => new EditorWorker() };

export { monaco };

```
