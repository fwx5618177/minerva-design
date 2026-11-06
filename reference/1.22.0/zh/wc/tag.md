# Tag 标签

用于标记和分类内容的小标签，可关闭或可点击。

Package: minerva-design@1.22.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 无障碍

设置 clickable 后，标签具有 role="button" 和 tabIndex=0，Enter 或空格键会像鼠标点击一样触发 onClick。请用于操作或切换，而非页面跳转（跳转请使用链接）。

关闭按钮是原生 ，可单独聚焦。其无障碍名称默认为“Close”，请设置 closeLabel（如“Remove React”），让读屏用户知道移除的是哪个标签。

禁用的可点击标签保留 role="button" 并带有 aria-disabled="true"，Tab 键会跳过它。若选中状态很重要，请同时通过文字或 aria 属性表达，而不要只依赖颜色。

## Tag

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tag",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "color",
    "typeText": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
    "attribute": "color",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"square\" | \"rounded\" | \"circle\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "closable",
    "typeText": "boolean",
    "attribute": "closable",
    "required": false
  },
  {
    "name": "clickable",
    "typeText": "boolean",
    "attribute": "clickable",
    "required": false
  },
  {
    "name": "pressed",
    "typeText": "boolean | undefined",
    "attribute": "pressed",
    "required": false
  },
  {
    "name": "toggle",
    "typeText": "boolean",
    "attribute": "toggle",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "attribute": "elevation",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  },
  {
    "name": "noRipple",
    "typeText": "boolean",
    "attribute": "no-ripple",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-close",
    "typeText": "CustomEvent<{}>",
    "detailType": {
      "typeText": "{}",
      "typeRef": "type:436fa1028160295b25cf"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The close button was activated (`detail: {}`)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ pressed: boolean; }>",
    "detailType": {
      "typeText": "{ pressed: boolean; }",
      "typeRef": "type:54cf9ee20d418c7c41e0"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A `toggle` tag was toggled (`detail: { pressed }`)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label of the tag"
  },
  {
    "name": "icon",
    "description": "Icon displayed before the label"
  },
  {
    "name": "avatar",
    "description": "Avatar (small `<minerva-avatar>` or image) before the label"
  },
  {
    "name": "close-icon",
    "description": "Custom close icon"
  }
]
```

## API

```json
{
  "wc:minerva-tag": {
    "kind": "element",
    "source": "web-components/src/components/tag/tag.ts",
    "className": "MinervaTag",
    "summary": "Small label / chip, optionally clickable, toggleable or closable.",
    "description": "A small label for marking and categorizing (`<Tag>` of React). The root is a plain (non-interactive) element. With `clickable` the content is a native `<button>` (focusable, Enter / Space, ripple) whose clicks reach the host as regular `click` events; with `closable` the close control is a sibling `<button>` (never nested) that fires `minerva-close` (its clicks do not bubble as `click`, so they never trigger the tag's own action). A clickable tag with `pressed` (or `toggle`) is a toggle button (`aria-pressed`), e.g. a selectable filter; with `toggle` a click flips `pressed` itself and fires `minerva-change`.",
    "properties": [
      {
        "name": "color",
        "attribute": "color",
        "type": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "default": "\"neutral\"",
        "description": "Semantic color"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"subtle\" | \"outline\" | \"solid\"",
        "default": "\"subtle\"",
        "description": "Visual style: subtle (tinted), outline (tinted + border) or solid"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Tag size"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"square\" | \"rounded\" | \"circle\"",
        "default": "\"rounded\"",
        "description": "Tag shape"
      },
      {
        "name": "closable",
        "attribute": "closable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a close button (fires `minerva-close`)"
      },
      {
        "name": "clickable",
        "attribute": "clickable",
        "type": "boolean",
        "default": "false",
        "description": "Renders the content as a native button (focusable, Enter / Space)"
      },
      {
        "name": "pressed",
        "attribute": "pressed",
        "type": "boolean | undefined",
        "description": "Pressed (selected) state of a toggle tag (requires `clickable`); sets aria-pressed and the selected style"
      },
      {
        "name": "toggle",
        "attribute": "toggle",
        "type": "boolean",
        "default": "false",
        "description": "Makes a clickable tag a toggle: clicks flip `pressed` and fire `minerva-change`"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a spinner, marks the tag busy, blocks its action and hides the close button"
      },
      {
        "name": "elevation",
        "attribute": "elevation",
        "type": "boolean",
        "default": "false",
        "description": "Shows a shadow"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the tag and its close button"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close button (default: localized \"Remove {label}\" / \"Close\")"
      },
      {
        "name": "noRipple",
        "attribute": "no-ripple",
        "type": "boolean",
        "default": "false",
        "description": "Disables the ripple effect of clickable tags"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-close",
        "description": "The close button was activated (`detail: {}`)"
      },
      {
        "name": "minerva-change",
        "description": "A `toggle` tag was toggled (`detail: { pressed }`)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Label of the tag"
      },
      {
        "name": "icon",
        "description": "Icon displayed before the label"
      },
      {
        "name": "avatar",
        "description": "Avatar (small `<minerva-avatar>` or image) before the label"
      },
      {
        "name": "close-icon",
        "description": "Custom close icon"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The tag (a plain, non-interactive element); state active while a clickable tag is pressed, inactive otherwise"
      },
      {
        "name": "action",
        "description": "The native <button> of a clickable tag"
      },
      {
        "name": "label",
        "description": "The label wrapper"
      },
      {
        "name": "icon",
        "description": "The icon before the label"
      },
      {
        "name": "avatar",
        "description": "The avatar before the label"
      },
      {
        "name": "spinner",
        "description": "The loading spinner (while loading)"
      },
      {
        "name": "close-button",
        "description": "The close button"
      }
    ],
    "cssProperties": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Tag": {
    "kind": "cssVars",
    "source": "react/src/components/Tag",
    "vars": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

小型标签；color 设置其语义色调。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px">
  <minerva-tag>Neutral</minerva-tag>
  <minerva-tag color="primary">Primary</minerva-tag>
  <minerva-tag color="success">Success</minerva-tag>
  <minerva-tag color="warning">Warning</minerva-tag>
  <minerva-tag color="danger">Danger</minerva-tag>
  <minerva-tag color="info">Info</minerva-tag>
</div>

```

## Example: 可关闭

closable 添加一个触发 minerva-close 的关闭按钮：在监听器中移除标签，并将焦点移到相邻元素。close-label 和 close-icon 插槽可自定义该按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/closable.html

```html
<div style="display: grid; gap: 12px">
  <div id="tags" style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-tag closable color="primary">React</minerva-tag>
    <minerva-tag closable color="success">Vue</minerva-tag>
    <minerva-tag closable color="warning">Svelte</minerva-tag>
    <minerva-tag closable color="info" close-label="Remove Angular"
      >Angular
      <span slot="close-icon" aria-hidden="true">✕</span>
    </minerva-tag>
  </div>
  <div>
    <minerva-button id="restore" size="small" variant="outline"
      >Restore</minerva-button
    >
  </div>
</div>

```

### apps/docs/src/docs/pages/tag/wc/closable.ts

```tsx
// The close button fires `minerva-close`: remove (here: hide) the tag in the
// listener, and move focus to a neighbour so it is not lost.
export function setup(root: HTMLElement) {
  const tags = root.querySelector<HTMLElement>("#tags")!;
  const restore = root.querySelector<HTMLElement>("#restore")!;
  const all = () => [...tags.children] as HTMLElement[];
  const onClose = (event: Event) => {
    const tag = event.target as HTMLElement;
    const visible = all().filter((t) => !t.hidden);
    const index = visible.indexOf(tag);
    const next = visible[index + 1] ?? visible[index - 1] ?? restore;
    tag.hidden = true;
    next.focus();
  };
  const onRestore = () => all().forEach((tag) => (tag.hidden = false));
  tags.addEventListener("minerva-close", onClose);
  restore.addEventListener("click", onRestore);
  return () => {
    tags.removeEventListener("minerva-close", onClose);
    restore.removeEventListener("click", onRestore);
  };
}

```

## Example: 切换筛选

clickable toggle 标签是切换按钮（aria-pressed）：点击会翻转 pressed 并触发 minerva-change。普通可点击标签触发 click。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/toggle.html

```html
<div style="display: grid; gap: 12px">
  <div
    id="filters"
    role="group"
    aria-label="Filter by status"
    style="display: flex; flex-wrap: wrap; gap: 8px"
  >
    <minerva-tag clickable toggle pressed color="primary" data-status="open"
      >Open</minerva-tag
    >
    <minerva-tag clickable toggle color="primary" data-status="review"
      >In review</minerva-tag
    >
    <minerva-tag clickable toggle color="primary" data-status="done"
      >Done</minerva-tag
    >
    <minerva-tag clickable no-ripple color="neutral" id="clear"
      >Clear</minerva-tag
    >
  </div>
  <output id="active">Showing: open</output>
</div>

```

### apps/docs/src/docs/pages/tag/wc/toggle.ts

```tsx
// `clickable toggle` tags are toggle buttons (aria-pressed): a click flips
// `pressed` and fires `minerva-change`. A plain clickable tag fires `click`.
type Tag = HTMLElement & { pressed?: boolean };

export function setup(root: HTMLElement) {
  const filters = root.querySelector<HTMLElement>("#filters")!;
  const clear = root.querySelector<Tag>("#clear")!;
  const active = root.querySelector<HTMLOutputElement>("#active")!;
  const toggles = [...filters.querySelectorAll<Tag>("[toggle]")];
  const render = () => {
    const on = toggles.filter((t) => t.pressed).map((t) => t.dataset.status);
    active.value = `Showing: ${on.length ? on.join(", ") : "everything"}`;
  };
  const onClear = () => {
    toggles.forEach((t) => (t.pressed = false));
    render();
  };
  filters.addEventListener("minerva-change", render);
  clear.addEventListener("click", onClear);
  return () => {
    filters.removeEventListener("minerva-change", render);
    clear.removeEventListener("click", onClear);
  };
}

```

## Example: 变体、尺寸与内容

三种变体、尺寸和形状，elevation，icon 与 avatar 插槽，以及 loading 和 disabled 状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/variants-sizes.html

```html
<div style="display: grid; gap: 12px">
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-tag color="primary" variant="subtle">Subtle</minerva-tag>
    <minerva-tag color="primary" variant="outline">Outline</minerva-tag>
    <minerva-tag color="primary" variant="solid">Solid</minerva-tag>
    <minerva-tag color="primary" elevation>Elevation</minerva-tag>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-tag size="small">Small</minerva-tag>
    <minerva-tag size="medium">Medium</minerva-tag>
    <minerva-tag size="large">Large</minerva-tag>
    <minerva-tag shape="square">Square</minerva-tag>
    <minerva-tag shape="rounded">Rounded</minerva-tag>
    <minerva-tag shape="circle">Circle</minerva-tag>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-tag color="success">
      <span slot="icon" aria-hidden="true">✓</span>
      Deployed
    </minerva-tag>
    <minerva-tag variant="outline">
      <minerva-avatar
        slot="avatar"
        size="xsmall"
        name="Ada Lovelace"
      ></minerva-avatar>
      Ada Lovelace
    </minerva-tag>
    <minerva-tag loading>Syncing</minerva-tag>
    <minerva-tag disabled closable>Disabled</minerva-tag>
  </div>
</div>

```
