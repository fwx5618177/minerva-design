# Confirm 確認

操作の確認をユーザーに求めます。テーマに合わせた window.confirm の代替です。宣言的な ConfirmDialog を使うか、どこからでも confirm() を await できます。ConfirmProvider があればダイアログはアプリのツリー内に描画され、なければ独立したホストを必要に応じてマウントし、サーバーでは confirm() は false を返します。

Package: minerva-design@1.23.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 使い分け：useConfirm() か confirm() か

コンポーネント内では useConfirm() を呼びます。ダイアログは最も近い ConfigProvider のスコープに従います。ネストしたプロバイダーの下では、モーダルがそのホストにテーマ・パレット・トークン付きでポータルされ、既定のボタンラベルはその言語になります。ConfirmProvider があれば引き続きそれが描画します。

React の外（イベントバス、API クライアント、ルーターガードなどコンポーネント以外のモジュール）では confirm() を直接インポートします。そこではフックが使えず、ダイアログはルートのテーマと言語を使います。

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button onClick={async () => (await confirm({ title: "Delete?" })) && remove()}>
      Delete
    </Button>
  );
}

// Outside React (API client, event bus, router guard...): root scope
import { confirm } from "minerva-design";
router.beforeLeave(() => confirm({ title: "Discard changes?" }));
```

## ConfirmDialog

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ConfirmDialog"
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
    "required": true,
    "description": "Whether the dialog is open (controlled, `v-model:open`).",
    "typeText": "boolean"
  },
  {
    "name": "title",
    "type": "ConfirmContent",
    "required": false,
    "description": "Title (the dialog's accessible name), or the `title` slot.",
    "typeText": "ConfirmContent"
  },
  {
    "name": "color",
    "type": "\"primary\" | \"warning\" | \"danger\"",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color of the confirm button; `danger` marks a destructive\naction (and defaults its label to \"Delete\")",
    "typeText": "\"primary\" | \"warning\" | \"danger\""
  },
  {
    "name": "closeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the close (×) button; defaults to the localized \"Close\".",
    "typeText": "string"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a spinner on the confirm button and disables cancel (e.g. while an async `confirm` handler runs)",
    "typeText": "boolean"
  },
  {
    "name": "description",
    "type": "ConfirmContent",
    "required": false,
    "description": "Explanation below the title (the dialog's accessible description).",
    "typeText": "ConfirmContent"
  },
  {
    "name": "confirmLabel",
    "type": "ConfirmContent",
    "required": false,
    "description": "Label of the confirm button; defaults to the localized \"Confirm\", or \"Delete\" for `color=\"danger\"`.",
    "typeText": "ConfirmContent"
  },
  {
    "name": "cancelLabel",
    "type": "ConfirmContent",
    "required": false,
    "description": "Label of the cancel button; defaults to the localized \"Cancel\".",
    "typeText": "ConfirmContent"
  },
  {
    "name": "confirmDisabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Natively disables the confirm button (removes it from the tab order). While\n`loading` alone it stays focusable but cannot be activated again",
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
  },
  {
    "name": "confirm",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Extra content (in the body)",
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
  },
  {
    "name": "confirm-label",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "cancel-label",
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

## ConfirmProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ConfirmProvider"
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
    "description": "Application subtree; `useConfirm()` / `confirm()` dialogs render here",
    "typeText": "any"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: async

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/vue/async.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ConfirmDialog, Button, VStack } from "minerva-design/vue";
const open = ref(false);
const loading = ref(false);
const result = ref("");
async function publish() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  loading.value = false;
  open.value = false;
  result.value = "Release published";
}
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="open = true">Publish release</Button
    ><ConfirmDialog
      v-model:open="open"
      :loading="loading"
      title="Publish this release?"
      description="The release will become available to your team."
      confirm-label="Publish"
      @confirm="publish"
    /><output>{{ result }}</output></VStack
  >
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ConfirmDialog, Button, VStack } from "minerva-design/vue";
const open = ref(false);
const result = ref("");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button color="danger" @click="open = true">Delete project</Button
    ><ConfirmDialog
      v-model:open="open"
      title="Delete this project?"
      description="This action cannot be undone."
      color="danger"
      @confirm="
        open = false;
        result = 'Project deleted';
      "
    /><output>{{ result }}</output></VStack
  >
</template>

```

## Example: colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/vue/colors.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  ConfirmProvider,
  Button,
  confirm,
  type ConfirmOptions,
} from "minerva-design/vue";
const result = ref("No decision yet");
const examples: { label: string; options: ConfirmOptions }[] = [
  {
    label: "Publish",
    options: { title: "Publish this chapter?", color: "primary" },
  },
  {
    label: "Reset",
    options: {
      title: "Reset all settings?",
      description: "Your preferences return to their defaults.",
      color: "warning",
      confirmLabel: "Reset",
    },
  },
  {
    label: "Delete",
    options: { title: "Delete this draft?", color: "danger" },
  },
];
async function ask(example: (typeof examples)[number]) {
  result.value = `${example.label}: ${(await confirm(example.options)) ? "confirmed" : "cancelled"}`;
}
</script>
<template>
  <ConfirmProvider
    ><div style="display: flex; gap: 12px; flex-wrap: wrap">
      <Button
        v-for="example in examples"
        :key="example.label"
        :color="example.options.color"
        variant="outline"
        @click="ask(example)"
        >{{ example.label }}</Button
      ><output>{{ result }}</output>
    </div></ConfirmProvider
  >
</template>

```

## Example: imperative

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/vue/imperative.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ConfirmProvider, Button, confirm } from "minerva-design/vue";
const result = ref("");
async function ask() {
  result.value = (await confirm({
    title: "Archive workspace?",
    description: "You can restore it later.",
  }))
    ? "Archived"
    : "Cancelled";
}
</script>
<template>
  <ConfirmProvider
    ><Button @click="ask">Archive workspace</Button
    ><output>{{ result }}</output></ConfirmProvider
  >
</template>

```

## Example: scoped

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/vue/scoped.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  ConfirmProvider,
  Button,
  useConfirm,
} from "minerva-design/vue";
import { defineComponent, h } from "vue";
const ScopedAction = defineComponent({
  setup() {
    const ask = useConfirm();
    const result = ref("");
    return () =>
      h("div", [
        h(
          Button,
          {
            onClick: async () => {
              result.value = (await ask({
                title: "确认保存？",
                description: "对话框继承局部主题和语言。",
              }))
                ? "已保存"
                : "已取消";
            },
          },
          () => "保存更改",
        ),
        h("output", result.value),
      ]);
  },
});
</script>
<template>
  <ConfigProvider theme="dark" :locale="{ language: 'zh' }"
    ><ConfirmProvider><ScopedAction /></ConfirmProvider
  ></ConfigProvider>
</template>

```
