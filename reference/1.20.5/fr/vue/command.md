# Command

Une palette de commandes avec recherche dans une modale. Tapez pour filtrer par titre, description, groupe et mots-clés, déplacez-vous avec les flèches, choisissez avec Entrée ou un clic. Un raccourci global optionnel l'ouvre.

Package: minerva-design@1.20.5

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## CommandDialog

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CommandDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "type": "boolean",
    "required": false,
    "description": "Controlled open state (`v-model:open`); leave `undefined` for uncontrolled.",
    "typeText": "boolean"
  },
  {
    "name": "defaultOpen",
    "type": "boolean",
    "required": false,
    "description": "Initial open state while uncontrolled",
    "typeText": "boolean"
  },
  {
    "name": "items",
    "type": "CommandItem[]",
    "required": true,
    "description": "Commands to search. Disabled items are never shown.",
    "typeText": "CommandItem[]"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Title of the dialog; defaults to the localized \"Command palette\".",
    "typeText": "string"
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "Accessible description of the palette; defaults to a localized hint.",
    "typeText": "string"
  },
  {
    "name": "placeholder",
    "type": "string",
    "required": false,
    "description": "Placeholder of the search input; defaults to a localized hint.",
    "typeText": "string"
  },
  {
    "name": "emptyText",
    "type": "string",
    "required": false,
    "description": "Shown when nothing matches; defaults to the localized \"No matching results\".",
    "typeText": "string"
  },
  {
    "name": "shortcutLabel",
    "type": "string",
    "required": false,
    "description": "Shortcut hint rendered as `<kbd>` next to the title, e.g. \"⌘K\".",
    "typeText": "string"
  },
  {
    "name": "shortcut",
    "type": "string | string[]",
    "required": false,
    "description": "Global keyboard shortcut(s) that open the palette, e.g. \"mod+k\" (Cmd+K on\nmacOS, Ctrl+K elsewhere). Modifiers: mod, ctrl, meta/cmd, shift, alt/option.",
    "typeText": "string | string[]"
  },
  {
    "name": "maxResults",
    "type": "number",
    "default": "12",
    "required": false,
    "description": "Maximum number of results shown",
    "typeText": "number"
  },
  {
    "name": "filter",
    "type": "((items: CommandItem[], query: string) => CommandItem[])",
    "required": false,
    "description": "Custom search, e.g. to rank results by match quality. Receives the\nenabled items and the trimmed query (never empty) and returns the\nmatching items in display order (then capped at `maxResults`). By\ndefault, items whose group, title, description or keywords contain the\nquery (case-insensitive) are kept in `items` order.",
    "typeText": "((items: CommandItem[], query: string) => CommandItem[])"
  },
  {
    "name": "resultsLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the results list; defaults to the localized \"Command results\".",
    "typeText": "string"
  },
  {
    "name": "enterLabel",
    "type": "string",
    "required": false,
    "description": "Key hint shown at the end of the search input; defaults to the localized \"Enter\".",
    "typeText": "string"
  },
  {
    "name": "className",
    "type": "ClassValue",
    "required": false,
    "description": "Additional class of the dialog panel (a `class` attribute works too).",
    "typeText": "ClassValue"
  }
]
```

### events

```json
[
  {
    "name": "select",
    "type": "[item: CommandItem]",
    "typeText": "[item: CommandItem]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "CommandItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:open",
    "type": "[open: boolean]",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "type": "[open: boolean]",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
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
    "name": "title",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "empty-text",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "shortcut-label",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "enter-label",
    "type": "any",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "update:open",
    "syntax": "v-model:open"
  }
]
```

## CSS variables

```json
{
  "css:Command": {
    "kind": "cssVars",
    "source": "react/src/components/Command",
    "vars": [
      {
        "name": "--command-search-height",
        "description": "Minimum height of the search field (defaults to --control-height-md)"
      },
      {
        "name": "--command-results-max-height",
        "description": "Maximum height of the scrolling result list"
      },
      {
        "name": "--command-item-min-height",
        "description": "Minimum height of a result row"
      },
      {
        "name": "--command-item-padding-y",
        "description": "Vertical padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-padding-x",
        "description": "Horizontal padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-active-background",
        "description": "Background of the hovered / active row (defaults to a 10% primary tint)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/command/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { CommandDialog, Button, VStack } from "minerva-design/vue";
const open = ref(false);
const result = ref("");
const items = [
  {
    id: "new",
    title: "New project",
    description: "Start a new workspace",
    group: "Projects",
    keywords: "create",
  },
  {
    id: "settings",
    title: "Open settings",
    group: "Account",
    keywords: "preferences",
  },
  { id: "disabled", title: "Unavailable command", disabled: true },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="open = true">Open command palette</Button
    ><CommandDialog
      v-model:open="open"
      :items="items"
      @select="(item) => (result = item.title)"
    /><output>{{ result }}</output></VStack
  >
</template>

```

## Example: custom-filter

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/command/vue/custom-filter.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { CommandDialog, Button } from "minerva-design/vue";
const open = ref(false);
const result = ref("");
const items = [
  {
    id: "new",
    title: "New project",
    description: "Start a new workspace",
    group: "Projects",
    keywords: "create",
  },
  {
    id: "settings",
    title: "Open settings",
    group: "Account",
    keywords: "preferences",
  },
  { id: "disabled", title: "Unavailable command", disabled: true },
];
function filter(
  items: import("minerva-design/vue").CommandItem[],
  query: string,
) {
  return items.filter((item) =>
    item.title.toLowerCase().startsWith(query.toLowerCase()),
  );
}
</script>
<template>
  <Button @click="open = true">Search by title prefix</Button
  ><CommandDialog
    v-model:open="open"
    :items="items"
    :filter="filter"
    placeholder="Type the start of a title…"
    @select="(item) => (result = item.title)"
  /><output>{{ result }}</output>
</template>

```

## Example: shortcut

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/command/vue/shortcut.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { CommandDialog, Button } from "minerva-design/vue";
const open = ref(false);
const result = ref("");
const items = [
  {
    id: "new",
    title: "New project",
    description: "Start a new workspace",
    group: "Projects",
    keywords: "create",
  },
  {
    id: "settings",
    title: "Open settings",
    group: "Account",
    keywords: "preferences",
  },
  { id: "disabled", title: "Unavailable command", disabled: true },
];
</script>
<template>
  <Button @click="open = true">Commands (Ctrl/⌘ K)</Button
  ><CommandDialog
    v-model:open="open"
    :items="items"
    shortcut="mod+k"
    shortcut-label="⌘K"
    @select="(item) => (result = item.title)"
  /><output>{{ result }}</output>
</template>

```
