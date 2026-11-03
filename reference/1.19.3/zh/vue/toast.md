# Toast 通知

带标题、描述和语义色的临时通知，可在任意位置通过 toast() 调用（无需 React 上下文），并由应用树中的 ToastProvider 渲染，因此会继承应用的上下文（主题、语言）。内置加载状态、Promise 跟踪、原地更新、操作按钮和最大数量限制。支持服务端渲染。

Package: minerva-design@1.19.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 如何选择：useToast() 还是 toast()

在组件内调用 useToast()：它显示的通知跟随最近的 ConfigProvider 作用域。在嵌套 Provider 下，通知渲染到该作用域的 portal 容器中，使用其主题、配色方案和 token，内置文案使用其语言。通知仍由持有者 ToastProvider 渲染，沿用它的 position、max 和文案。

在 React 之外（事件总线、API 客户端、store 等非组件模块）直接导入 toast()：那里无法使用 hook，其通知使用 ToastProvider 的作用域，通常即根主题和根语言。

当模态对话框打开时（Modal、Drawer、ConfirmDialog、Command、模态 Popover 或 Menu），它的 hide-others 处理会像页面其余部分一样覆盖 Toast 视口：视口会获得 aria-hidden="true"，在对话框关闭之前辅助技术只能看到对话框。 的行为相同（可在某个区域上用 data-minerva-keep-visible 退出）。

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
