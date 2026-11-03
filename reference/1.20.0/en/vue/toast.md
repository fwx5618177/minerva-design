# Toast

Temporary notifications with a title, a description and a semantic color, shown with toast() from anywhere (no React context needed) and rendered by a ToastProvider inside your app tree, so they inherit your app's context (theme, locale). Loading toasts, promise tracking, in-place updates, actions and a maximum count are built in. Server rendering is safe.

Package: minerva-design@1.20.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### When to use which: useToast() or toast()

Inside components, call useToast(): the toasts it shows follow the nearest ConfigProvider scope. Under a nested provider they are rendered into its portal host, with its theme, palette and tokens, and their built-in labels use its language. The owning ToastProvider still renders them, with its position, max and labels.

Outside React (event buses, API clients, stores and other non-component modules), import toast() directly: no hook is available there, and its toasts use the scope of the ToastProvider, usually the root theme and language.

While a modal dialog is open (Modal, Drawer, ConfirmDialog, Command, a modal Popover or Menu), its hide-others treatment covers the toast viewport like the rest of the page: the viewport gets aria-hidden="true" and assistive technologies only see the dialog until it closes.  behaves the same way (opt out on a region with data-minerva-keep-visible).

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function SaveButton() {
  const toast = useToast();
  return <Button onClick={() => toast.success("Saved")}>Save</Button>;
}

// Outside React (API client, event bus, store...): root scope
import { toast } from "minerva-design";
apiClient.onError((error) => toast.danger(error.message));
```

## ToastProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ToastProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "position",
    "type": "ToastPosition",
    "default": "\"top-right\"",
    "required": false,
    "description": "Where the toasts are stacked",
    "typeText": "ToastPosition"
  },
  {
    "name": "max",
    "type": "number",
    "default": "Infinity",
    "required": false,
    "description": "Maximum number of toasts shown at once; when exceeded the oldest close\nfirst",
    "typeText": "number"
  },
  {
    "name": "pauseOnHover",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Pauses the auto-close timer while a toast is hovered or focused",
    "typeText": "boolean"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the toast region (used as is; the default one\nincludes the hotkey). Set with the `aria-label` attribute",
    "typeText": "string"
  },
  {
    "name": "closeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the close buttons",
    "typeText": "string"
  },
  {
    "name": "hotkey",
    "type": "string[]",
    "default": "[\"F8\"]",
    "required": false,
    "description": "Keys pressed together to move focus to the toast region (the first one\nholding toasts): key codes (`\"F8\"`, `\"KeyT\"`), keys or modifiers\n(`\"altKey\"`, `\"ctrlKey\"`, `\"metaKey\"`, `\"shiftKey\"`). Shown in the\ndefault region label, e.g. \"Notifications (F8)\". An empty array\ndisables it",
    "typeText": "string[]"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Application content; the toast viewport is rendered after it",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Toast": {
    "kind": "cssVars",
    "source": "react/src/components/Toast",
    "vars": [
      {
        "name": "--toast-width",
        "description": "Width of the toast stack (capped by the viewport)"
      },
      {
        "name": "--toast-gap",
        "description": "Space between stacked toasts"
      },
      {
        "name": "--toast-offset",
        "description": "Distance between the stack and the viewport edges"
      },
      {
        "name": "--toast-padding",
        "description": "Padding of a toast"
      },
      {
        "name": "--toast-radius",
        "description": "Corner radius of a toast (defaults to --radius-md)"
      },
      {
        "name": "--toast-shadow",
        "description": "Shadow of a toast (defaults to --shadow-lg)"
      },
      {
        "name": "--toast-background",
        "description": "Base background of a toast (under the color tint)"
      },
      {
        "name": "--toast-z-index",
        "description": "Stacking order of the stack (defaults to --z-toast)"
      },
      {
        "name": "--toast-icon-background",
        "description": "Background of the round chip behind the status icon (defaults to the color's accent at 14%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: action

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/toast/vue/action.vue

```vue
<script setup lang="ts">
import { ref, h } from "vue";
import { ToastProvider, Button, toast } from "minerva-design/vue";
const result = ref("");
function archive() {
  toast.info("Conversation archived", {
    duration: 8000,
    action: {
      label: "Undo",
      onClick: () => {
        result.value = "Conversation restored";
        toast.success("Conversation restored");
      },
    },
  });
}
</script>
<template>
  <ToastProvider
    ><div style="display: flex; gap: 12px; flex-wrap: wrap">
      <Button @click="archive">Archive with Undo</Button
      ><Button
        variant="outline"
        @click="
          toast.info('Reminder set for 09:00', {
            icon: h('span', { 'aria-hidden': true }, '●'),
            closable: false,
          })
        "
        >Custom icon, no close button</Button
      ><Button
        variant="outline"
        @click="
          toast.success('Exported', {
            onClose: () => (result = 'Export toast closed'),
          })
        "
        >Observe close</Button
      ><output>{{ result }}</output>
    </div></ToastProvider
  >
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/toast/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  HStack,
  VStack,
  ToastProvider,
  toast,
  type ToastPosition,
} from "minerva-design/vue";
const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const position = ref<ToastPosition>("top-right");
</script>
<template>
  <ToastProvider :position="position" :max="3"
    ><VStack :gap="4" align="start"
      ><HStack :gap="2" wrap
        ><Button color="success" @click="toast.success('Saved')">Success</Button
        ><Button color="danger" @click="toast.danger('Request failed')"
          >Danger</Button
        ><Button color="warning" @click="toast.warning('Unsaved changes')"
          >Warning</Button
        ><Button
          color="neutral"
          variant="outline"
          @click="toast.info('New version')"
          >Info</Button
        ></HStack
      ><HStack attached wrap aria-label="Position"
        ><Button
          v-for="name in positions"
          :key="name"
          size="small"
          :color="name === position ? 'primary' : 'neutral'"
          :variant="name === position ? 'solid' : 'outline'"
          :aria-pressed="name === position"
          @click="position = name"
          >{{ name }}</Button
        ></HStack
      ></VStack
    ></ToastProvider
  >
</template>

```

## Example: dedupe

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/toast/vue/dedupe.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ToastProvider, Button, toast } from "minerva-design/vue";
const attempts = ref(0);
function fail() {
  attempts.value++;
  toast.danger(`Sync failed, attempt ${attempts.value}`, {
    id: "vue-sync-error",
    duration: 0,
  });
}
</script>
<template>
  <ToastProvider
    ><div style="display: flex; gap: 12px">
      <Button @click="fail">Fail again</Button
      ><Button variant="outline" @click="toast.dismiss('vue-sync-error')"
        >Dismiss sync error</Button
      ><output>{{ attempts }} attempts, one notification ID</output>
    </div></ToastProvider
  >
</template>

```

## Example: keyboard

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/toast/vue/keyboard.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ToastProvider, Button, toast } from "minerva-design/vue";
const details = ref(false);
function show() {
  toast.info("Build started", { duration: 0 });
  toast.success("Tests passed", { duration: 0 });
  toast.warning("Coverage dropped by 2%", {
    duration: 0,
    action: { label: "Details", onClick: () => (details.value = true) },
  });
}
</script>
<template>
  <ToastProvider :hotkey="['F8']"
    ><div style="display: grid; gap: 12px">
      <p>
        Show notifications, press F8 to focus them, Tab between actions, and
        Escape to close.
      </p>
      <Button @click="show">Show three notifications</Button
      ><Button variant="outline" @click="toast.dismiss()">Dismiss all</Button
      ><output v-if="details"
        >Coverage changed from 94% to 92%; add tests for the new export
        path.</output
      >
    </div></ToastProvider
  >
</template>

```

## Example: loading

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/toast/vue/loading.vue

```vue
<script setup lang="ts">
import { ToastProvider, Button, toast } from "minerva-design/vue";
function save() {
  void toast.promise(
    new Promise<string>((resolve) =>
      setTimeout(() => resolve("Saved changes"), 700),
    ),
    {
      loading: "Saving…",
      success: (message) => message,
      error: "Unable to save",
    },
  );
}
</script>
<template>
  <ToastProvider
    ><Button @click="save">Save changes with progress</Button></ToastProvider
  >
</template>

```

## Example: options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/toast/vue/options.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ToastProvider, Button, toast, HStack } from "minerva-design/vue";
const result = ref("");
function notify() {
  toast({
    id: "undo",
    title: "Item archived",
    description: "Undo to restore it",
    duration: 0,
    action: { label: "Undo", onClick: () => (result.value = "Restored") },
  });
}
</script>
<template>
  <ToastProvider :max="3" position="bottom-right"
    ><HStack :gap="3"
      ><Button @click="notify">Persistent notification</Button
      ><Button variant="outline" @click="toast.dismiss()">Dismiss all</Button
      ><output>{{ result }}</output></HStack
    ></ToastProvider
  >
</template>

```

## Example: scoped

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/toast/vue/scoped.vue

```vue
<script setup lang="ts">
import { defineComponent, h } from "vue";
import {
  ConfigProvider,
  ToastProvider,
  Button,
  toast,
  useToast,
} from "minerva-design/vue";
const ScopedActions = defineComponent({
  setup() {
    const scoped = useToast();
    return () =>
      h("div", { style: { display: "flex", gap: "12px" } }, [
        h(
          Button,
          {
            onClick: () =>
              scoped.success(
                "Saved with the local dark theme and Chinese locale",
              ),
          },
          () => "Scoped notification",
        ),
        h(
          Button,
          {
            variant: "outline",
            onClick: () => toast.info("Synced with the outer provider scope"),
          },
          () => "Global notification",
        ),
      ]);
  },
});
</script>
<template>
  <ToastProvider
    ><ConfigProvider theme="dark" palette="tech" :locale="{ language: 'zh' }"
      ><ScopedActions /></ConfigProvider
  ></ToastProvider>
</template>

```
