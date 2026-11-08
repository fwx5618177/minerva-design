# Modal 模态框

打断页面、聚焦单一任务的对话框。焦点被锁定在内部，Escape 和点击遮罩可关闭，关闭后焦点回到打开它的元素。窄屏下以底部弹层呈现。

Package: minerva-design@1.23.0

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Modal

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Modal"
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
    "description": "Controlled open state (`v-model:open`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultOpen",
    "type": "boolean",
    "required": false,
    "description": "Initial open state while uncontrolled.",
    "typeText": "boolean"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Title (or the `title` slot); the dialog's accessible name",
    "typeText": "string"
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "Description (or the `description` slot)",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "ModalSize",
    "default": "\"medium\"",
    "required": false,
    "typeText": "ModalSize"
  },
  {
    "name": "hideCloseButton",
    "type": "boolean",
    "default": "false",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "closeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the close button (default: translated \"Close\")",
    "typeText": "string"
  },
  {
    "name": "role",
    "type": "\"dialog\" | \"alertdialog\"",
    "default": "\"dialog\"",
    "required": false,
    "typeText": "\"dialog\" | \"alertdialog\""
  }
]
```

### events

```json
[
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
    "name": "default",
    "type": "any",
    "description": "Body",
    "typeText": "any"
  },
  {
    "name": "trigger",
    "type": "any",
    "description": "Element opening the modal (its single child gets the trigger props)",
    "typeText": "any"
  },
  {
    "name": "title",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "description",
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

## ModalBody

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ModalBody"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## ModalClose

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ModalClose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## ModalContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ModalContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "size",
    "type": "ModalSize",
    "default": "\"medium\"",
    "required": false,
    "typeText": "ModalSize"
  },
  {
    "name": "hideCloseButton",
    "type": "boolean",
    "default": "false",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "closeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the close button (default: translated \"Close\")",
    "typeText": "string"
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "Description under the title (or the `description` slot)",
    "typeText": "string"
  },
  {
    "name": "role",
    "type": "\"dialog\" | \"alertdialog\"",
    "default": "\"dialog\"",
    "required": false,
    "typeText": "\"dialog\" | \"alertdialog\""
  },
  {
    "name": "forceMount",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Keep mounted while closed",
    "typeText": "boolean"
  },
  {
    "name": "overlayClass",
    "type": "ClassValue",
    "required": false,
    "description": "Class of the overlay",
    "typeText": "ClassValue"
  }
]
```

### events

```json
[
  {
    "name": "openAutoFocus",
    "type": "[event: Event]",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "closeAutoFocus",
    "type": "[event: Event]",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "escapeKeyDown",
    "type": "[event: KeyboardEvent]",
    "typeText": "[event: KeyboardEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "KeyboardEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointerDownOutside",
    "type": "[event: PointerEvent]",
    "typeText": "[event: PointerEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "PointerEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "interactOutside",
    "type": "[event: PointerEvent | FocusEvent]",
    "typeText": "[event: PointerEvent | FocusEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "PointerEvent | FocusEvent",
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
    "name": "description",
    "type": "{}",
    "typeText": "{}"
  },
  {
    "name": "default",
    "type": "{}",
    "typeText": "{}"
  }
]
```

## ModalFooter

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ModalFooter"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## ModalHeader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ModalHeader"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## ModalRoot

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ModalRoot"
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
    "description": "Controlled open state (`v-model:open`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultOpen",
    "type": "boolean",
    "required": false,
    "description": "Initial open state while uncontrolled.",
    "typeText": "boolean"
  },
  {
    "name": "modal",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Focus trap, scroll lock, overlay, page hidden from AT.",
    "typeText": "boolean"
  }
]
```

### events

```json
[
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
    "name": "default",
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

## ModalTrigger

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ModalTrigger"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Modal": {
    "kind": "cssVars",
    "source": "react/src/components/Modal",
    "vars": [
      {
        "name": "--modal-width",
        "description": "Width of the panel (every size; defaults to the width of the size, capped by the viewport)"
      },
      {
        "name": "--modal-max-height",
        "description": "Maximum height of the panel (the body scrolls beyond)"
      },
      {
        "name": "--modal-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--modal-radius",
        "description": "Corner radius of the panel (defaults to --radius-xl)"
      },
      {
        "name": "--modal-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--modal-background",
        "description": "Background of the panel"
      },
      {
        "name": "--modal-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
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

### apps/docs/src/docs/pages/modal/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  VStack,
} from "minerva-design/vue";
const open = ref(false);
const deleted = ref(false);
function remove() {
  deleted.value = true;
  open.value = false;
}
</script>
<template>
  <VStack align="start" :gap="3"
    ><Button @click="open = true">Delete record</Button>
    <p v-if="deleted" role="status">Record deleted</p>
    <Modal
      v-model:open="open"
      title="Delete this record?"
      description="The record and its history are removed permanently."
      size="small"
      ><ModalBody>Other team members lose access immediately.</ModalBody
      ><ModalFooter
        ><Button color="neutral" variant="outline" @click="open = false"
          >Cancel</Button
        ><Button color="danger" @click="remove">Delete</Button></ModalFooter
      ></Modal
    ></VStack
  >
</template>

```

## Example: events

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/modal/vue/events.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Modal, ModalBody, Button } from "minerva-design/vue";
const open = ref(false);
const last = ref("");
</script>
<template>
  <Button @click="open = true">Open tracked dialog</Button
  ><Modal
    v-model:open="open"
    title="Dialog events"
    @open-change="(value) => (last = value ? 'Opened' : 'Closed')"
    ><ModalBody
      ><p>
        Escape, the close button, or the backdrop closes this dialog.
      </p></ModalBody
    ></Modal
  ><output>{{ last }}</output>
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/modal/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Input,
  FormField,
  Modal,
  ModalBody,
  ModalFooter,
} from "minerva-design/vue";
const open = ref(false);
const name = ref("Quarterly report");
const draft = ref(name.value);
function edit() {
  draft.value = name.value;
  open.value = true;
}
function save() {
  name.value = draft.value;
  open.value = false;
}
</script>
<template>
  <Button @click="edit">Rename “{{ name }}”</Button
  ><Modal v-model:open="open" title="Rename document"
    ><form @submit.prevent="save">
      <ModalBody
        ><FormField label="Name"
          ><Input v-model="draft" name="name" /></FormField></ModalBody
      ><ModalFooter><Button type="submit">Save</Button></ModalFooter>
    </form></Modal
  >
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/modal/vue/sizes.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Modal, ModalBody, Button, HStack } from "minerva-design/vue";
const sizes = ["small", "medium", "large", "full"] as const;
const size = ref<(typeof sizes)[number]>("medium");
const open = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><Button
      v-for="item in sizes"
      :key="item"
      variant="outline"
      @click="
        size = item;
        open = true;
      "
      >{{ item }}</Button
    ></HStack
  ><Modal v-model:open="open" :size="size" :title="`${size} dialog`"
    ><ModalBody
      ><p>Choose a size appropriate for your content.</p></ModalBody
    ></Modal
  >
</template>

```
