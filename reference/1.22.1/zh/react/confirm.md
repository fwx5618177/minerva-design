# Confirm 确认框

请用户确认某个操作，可替代 window.confirm 并跟随主题。可使用声明式的 ConfirmDialog，或在任意位置 await confirm()：挂载了 ConfirmProvider 时弹窗渲染在应用树内，没有时按需挂载独立宿主，服务端调用 confirm() 恒定返回 false。

Package: minerva-design@1.22.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 如何选择：useConfirm() 还是 confirm()

在组件内调用 useConfirm()：它的对话框跟随最近的 ConfigProvider 作用域。在嵌套 Provider 下，模态框渲染到该作用域的 portal 容器中，使用其主题、配色方案和 token，默认按钮文案使用其语言。存在 ConfirmProvider 时仍由它渲染。

在 React 之外（事件总线、API 客户端、路由守卫等非组件模块）直接导入 confirm()：那里无法使用 hook，其对话框使用根主题和根语言。

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "boolean",
    "typeText": "boolean",
    "typeRef": "type:7087acd01ef7dd9f1d5c",
    "required": true,
    "description": "Whether the dialog is open (controlled)."
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Title (the dialog's accessible name)."
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Explanation below the title (the dialog's accessible description)."
  },
  {
    "name": "confirmLabel",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the confirm button; defaults to the localized \"Confirm\", or \"Delete\" for `color=\"danger\"`."
  },
  {
    "name": "cancelLabel",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the cancel button; defaults to the localized \"Cancel\"."
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close (×) button; defaults to the localized \"Close\"."
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "warning"
    ],
    "typeText": "\"primary\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:ea01c2fe738cc1655d61",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the confirm button; `danger` marks a destructive action (and defaults its label to \"Delete\")"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner on the confirm button and disables cancel (e.g. while an async `onConfirm` runs)"
  },
  {
    "name": "confirmDisabled",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Natively disables the confirm button (removes it from the tab order). While `loading` alone it stays focusable but cannot be activated again"
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "function",
    "typeText": "(open: boolean) => void",
    "typeRef": "type:67c80af2081fe4d9df82",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true,
    "description": "Called with `false` when the user cancels (cancel button, close, Escape, overlay click)."
  },
  {
    "name": "onConfirm",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "function",
    "typeText": "() => void | Promise<void>",
    "typeRef": "type:a9703415be5393478909",
    "parameters": [],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": true,
    "description": "Called when the confirm button is pressed. The dialog does not close by itself."
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## ConfirmProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "children"
  }
]
```

## API

```json
{
  "ConfirmDialogProps": {
    "source": "react/src/components/Confirm/types.ts",
    "description": "Props of the declarative `ConfirmDialog`.",
    "kind": "interface",
    "extends": [
      "ConfirmOptions"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": true,
        "description": "Whether the dialog is open (controlled)."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": true,
        "description": "Called with `false` when the user cancels (cancel button, close, Escape, overlay click)."
      },
      {
        "name": "onConfirm",
        "type": "() => void | Promise<void>",
        "required": true,
        "description": "Called when the confirm button is pressed. The dialog does not close by itself."
      }
    ]
  },
  "ConfirmOptions": {
    "source": "react/src/components/Confirm/types.ts",
    "description": "Content of a confirmation, shared by `ConfirmDialog` and `confirm()`.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": true,
        "description": "Title (the dialog's accessible name)."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Explanation below the title (the dialog's accessible description)."
      },
      {
        "name": "confirmLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Label of the confirm button; defaults to the localized \"Confirm\", or \"Delete\" for `color=\"danger\"`."
      },
      {
        "name": "cancelLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Label of the cancel button; defaults to the localized \"Cancel\"."
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the close (×) button; defaults to the localized \"Close\"."
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"primary\" | \"danger\" | \"warning\">",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the confirm button; `danger` marks a destructive action (and defaults its label to \"Delete\")"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner on the confirm button and disables cancel (e.g. while an async `onConfirm` runs)"
      },
      {
        "name": "confirmDisabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Natively disables the confirm button (removes it from the tab order). While `loading` alone it stays focusable but cannot be activated again"
      }
    ]
  },
  "ConfirmProviderProps": {
    "source": "react/src/components/Confirm/types.ts",
    "description": "Props of `ConfirmProvider`.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application subtree; `useConfirm()` / `confirm()` render their dialogs here (`useConfirm()` dialogs inside the caller's ConfigProvider scope)."
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 颜色

color 设置确认按钮的色调：primary（默认）、warning，或用于危险操作的 danger（此时默认文案为“删除”）。取消按钮始终为 neutral 描边按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/colors.tsx

```tsx
import { useState } from "react";
import { Button, confirm, type ConfirmOptions } from "minerva-design";

const examples: Array<{ label: string; options: ConfirmOptions }> = [
  {
    label: "Publish",
    options: { title: "Publish this chapter?", color: "primary" },
  },
  {
    label: "Reset",
    options: {
      title: "Reset all settings?",
      description: "Your preferences go back to their defaults.",
      color: "warning",
      confirmLabel: "Reset",
    },
  },
  {
    // color="danger" defaults the confirm label to "Delete"
    label: "Delete",
    options: { title: "Delete this draft?", color: "danger" },
  },
];

export default function ColorsDemo() {
  const [result, setResult] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {examples.map(({ label, options }) => (
        <Button
          key={label}
          color={options.color}
          variant="outline"
          onClick={async () => {
            const ok = await confirm(options);
            setResult(`${label}: ${ok ? "confirmed" : "cancelled"}`);
          }}
        >
          {label}
        </Button>
      ))}
      <span>Result: {result}</span>
    </div>
  );
}

```

## Example: 声明式 ConfirmDialog

受控弹窗；loading 在 onConfirm 执行期间显示加载动画并禁用取消。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/declarative.tsx

```tsx
import { useState } from "react";
import { Button, ConfirmDialog } from "minerva-design";

export default function DeclarativeDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const archive = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setOpen(false);
  };
  return (
    <>
      <Button color="warning" onClick={() => setOpen(true)}>
        Archive project
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={archive}
        loading={loading}
        color="warning"
        title="Archive this project?"
        description="It becomes read-only for everyone."
        confirmLabel="Archive"
      />
    </>
  );
}

```

## Example: 命令式 confirm()

await confirm({...}) 确认时返回 true，取消（按钮、Escape 或遮罩）时返回 false。无需 Provider。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/imperative.tsx

```tsx
import { useState } from "react";
import { Button, confirm } from "minerva-design";

export default function ImperativeDemo() {
  const [result, setResult] = useState("—");
  const remove = async () => {
    const ok = await confirm({
      title: "Delete this book?",
      description: "Reviews and ratings are deleted too.",
      color: "danger",
    });
    setResult(ok ? "Deleted" : "Cancelled");
  };
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button color="danger" onClick={remove}>
        Delete book
      </Button>
      <span>Result: {result}</span>
    </div>
  );
}

```

## Example: 配合 ConfirmProvider

useConfirm() 返回由该 Provider 渲染的 confirm（位于调用方的 ConfigProvider 作用域中），弹窗共享应用的 context。并发请求按顺序逐个显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/provider.tsx

```tsx
import {
  Button,
  ConfirmProvider,
  ToastProvider,
  toast,
  useConfirm,
} from "minerva-design";

function PublishButton() {
  const ask = useConfirm();
  return (
    <Button
      onClick={async () => {
        if (await ask({ title: "Publish chapter?", confirmLabel: "Publish" })) {
          toast.success("Published");
        }
      }}
    >
      Publish
    </Button>
  );
}

export default function ProviderDemo() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <PublishButton />
      </ConfirmProvider>
    </ToastProvider>
  );
}

```

## Example: 作用域：useConfirm() 与 confirm()

两个按钮都位于嵌套的 ConfigProvider 中（暗色主题、tech 配色、中文）。useConfirm() 在该作用域中打开对话框（暗色 token、中文按钮文案）；confirm() 在根部打开，使用页面的主题和语言。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/scoped.tsx

```tsx
import { useState } from "react";
import { Button, ConfigProvider, confirm, useConfirm } from "minerva-design";

// Code outside React (API client, event bus...): no hook available, so it
// uses confirm(), rendered with the root theme and language.
const askToRetry = () =>
  confirm({ title: "Retry the upload? (confirm(): root scope)" });

function Actions() {
  // Inside a component: bound to the nearest ConfigProvider scope
  const ask = useConfirm();
  const [answer, setAnswer] = useState<string>("—");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        color="danger"
        onClick={async () => {
          const ok = await ask({
            title: "Delete this chapter? (useConfirm(): dark, tech, 中文)",
            color: "danger",
          });
          setAnswer(String(ok));
        }}
      >
        useConfirm()
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={async () => setAnswer(String(await askToRetry()))}
      >
        confirm()
      </Button>
      <output style={{ alignSelf: "center" }}>{answer}</output>
    </div>
  );
}

export default function ScopedDemo() {
  return (
    <ConfigProvider theme="dark" palette="tech" locale={{ language: "zh" }}>
      <Actions />
    </ConfigProvider>
  );
}

```
