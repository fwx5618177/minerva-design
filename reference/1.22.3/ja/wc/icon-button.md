# IconButton アイコンボタン

アイコンのみを表示するコンパクトなボタン。pressed / defaultPressed を指定するとトグルボタン（お気に入り、いいね、ミュートなど）になります。

Package: minerva-design@1.22.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## IconButton

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon-button",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
    "attribute": "color",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"ghost\" | \"solid\" | \"outline\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"xsmall\" | \"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"square\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "toggle",
    "typeText": "boolean",
    "attribute": "toggle",
    "required": false
  },
  {
    "name": "pressed",
    "typeText": "boolean",
    "attribute": "pressed",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "string | undefined",
    "attribute": "tooltip",
    "required": false
  },
  {
    "name": "tooltipPlacement",
    "typeText": "Placement",
    "attribute": "tooltip-placement",
    "required": false
  },
  {
    "name": "noTooltip",
    "typeText": "boolean",
    "attribute": "no-tooltip",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"button\" | \"submit\" | \"reset\"",
    "attribute": "type",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-pressed-change",
    "typeText": "CustomEvent<{ pressed: boolean; }>",
    "detailType": {
      "typeText": "{ pressed: boolean; }",
      "typeRef": "type:bb59ebc1c083982ddc76"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "A toggle button was activated (`detail: { pressed }`, the new state); cancelable: `preventDefault()` keeps the current state"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The icon (hidden from assistive technologies)"
  }
]
```

## API

```json
{
  "wc:minerva-icon-button": {
    "kind": "element",
    "source": "web-components/src/components/icon-button/icon-button.ts",
    "className": "MinervaIconButton",
    "summary": "Icon-only button with a tooltip, toggle and loading states.",
    "description": "A button that only contains an icon (`<IconButton>` of React). - `label` (or `aria-label`) names the button; `label` is also shown as a tooltip on hover / focus (Escape closes it) unless `no-tooltip` is set. - `color` picks the semantic color (neutral by default), `variant` the visual style (ghost by default). - The icon is the default slot content, wrapped in an `aria-hidden` span (the button's name describes it). - `toggle` makes it a toggle button (`aria-pressed` from `pressed`): activation flips `pressed` and fires a cancelable `minerva-pressed-change`. - While `loading` it stays focusable (aria-disabled + aria-busy instead of the native disabled attribute) but ignores activation, including the form submission of `type=\"submit\"`. Differences from React: the tooltip is built in (React wraps the button in its `<Tooltip>`); it supports `tooltip` (content), `tooltip-placement` and `no-tooltip`, not the tooltip color / variant / shape / arrow options.",
    "properties": [
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name of the button, also shown as its tooltip (unless `no-tooltip`). Takes precedence over aria-label"
      },
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
        "type": "\"ghost\" | \"solid\" | \"outline\"",
        "default": "\"ghost\"",
        "description": "Visual style: ghost (transparent until hovered), solid or outline"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"xsmall\" | \"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Button size"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"circle\" | \"square\"",
        "default": "\"circle\"",
        "description": "Button shape"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the button and removes it from the tab order"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Replaces the icon with a spinner and ignores activation while staying focusable (aria-busy + aria-disabled)"
      },
      {
        "name": "toggle",
        "attribute": "toggle",
        "type": "boolean",
        "default": "false",
        "description": "Makes the button a toggle button (exposes `aria-pressed`)"
      },
      {
        "name": "pressed",
        "attribute": "pressed",
        "type": "boolean",
        "default": "false",
        "description": "Pressed state of a toggle button"
      },
      {
        "name": "tooltip",
        "attribute": "tooltip",
        "type": "string | undefined",
        "description": "Tooltip content (defaults to `label`)"
      },
      {
        "name": "tooltipPlacement",
        "attribute": "tooltip-placement",
        "type": "Placement",
        "default": "\"top\"",
        "description": "Preferred tooltip placement"
      },
      {
        "name": "noTooltip",
        "attribute": "no-tooltip",
        "type": "boolean",
        "default": "false",
        "description": "Does not show the tooltip (the label still names the button)"
      },
      {
        "name": "type",
        "attribute": "type",
        "type": "\"button\" | \"submit\" | \"reset\"",
        "default": "\"button\"",
        "description": "What the button does in its form: nothing, submit it or reset it"
      },
      {
        "name": "form",
        "type": "HTMLFormElement | null",
        "readonly": true,
        "description": "The form owning the button"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "blur",
        "signature": "() => void"
      },
      {
        "name": "click",
        "signature": "() => void"
      }
    ],
    "events": [
      {
        "name": "minerva-pressed-change",
        "description": "A toggle button was activated (`detail: { pressed }`, the new state); cancelable: `preventDefault()` keeps the current state"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "The icon (hidden from assistive technologies)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The native <button>; state active while a toggle button is pressed, inactive otherwise"
      },
      {
        "name": "icon",
        "description": "The icon wrapper (hidden from assistive technologies)"
      },
      {
        "name": "spinner",
        "description": "The loading indicator (while loading)"
      },
      {
        "name": "tooltip",
        "description": "The tooltip (role=tooltip). Web components only: React wraps the button in a <Tooltip> component, which has its own hooks"
      }
    ],
    "cssProperties": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      },
      {
        "name": "--tooltip-max-width",
        "description": "Maximum width (capped by the viewport)"
      },
      {
        "name": "--tooltip-padding",
        "description": "Padding (every shape)"
      },
      {
        "name": "--tooltip-radius",
        "description": "Corner radius (defaults to the radius of the shape)"
      },
      {
        "name": "--tooltip-font-size",
        "description": "Font size"
      },
      {
        "name": "--tooltip-bg",
        "description": "Background (gradients allowed; every variant)"
      },
      {
        "name": "--tooltip-color",
        "description": "Text color (every variant)"
      },
      {
        "name": "--tooltip-shadow",
        "description": "Shadow (defaults to --shadow-md, --shadow-lg for the glass variant)"
      },
      {
        "name": "--tooltip-z-index",
        "description": "Stacking order (defaults to --z-popover)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:IconButton": {
    "kind": "cssVars",
    "source": "react/src/components/IconButton",
    "vars": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

label はアイコンのみのボタンに名前を付け、ホバーやフォーカス時にツールチップとして表示されます（Escape で閉じる）。既定は ghost・neutral です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/wc/basic.html

```html
<minerva-icon-button label="Edit">✎</minerva-icon-button>
<minerva-icon-button label="Delete" color="danger">🗑</minerva-icon-button>
<minerva-icon-button label="Share" variant="outline">⤴</minerva-icon-button>
<minerva-icon-button label="Add" variant="solid" color="primary"
  >+</minerva-icon-button
>

```

## Example: サイズ・形状・色

4 つのサイズ、円形または四角形、共通のセマンティックカラーと solid / outline / ghost のバリアント。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/wc/sizes-shapes.html

```html
<div style="display: grid; gap: 12px">
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-icon-button
      label="Extra small"
      size="xsmall"
      variant="solid"
      color="primary"
      >★</minerva-icon-button
    >
    <minerva-icon-button
      label="Small"
      size="small"
      variant="solid"
      color="primary"
      >★</minerva-icon-button
    >
    <minerva-icon-button
      label="Medium"
      size="medium"
      variant="solid"
      color="primary"
      >★</minerva-icon-button
    >
    <minerva-icon-button
      label="Large"
      size="large"
      variant="solid"
      color="primary"
      >★</minerva-icon-button
    >
    <minerva-icon-button label="Square" shape="square" variant="outline"
      >★</minerva-icon-button
    >
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-icon-button label="Primary" color="primary" variant="solid"
      >★</minerva-icon-button
    >
    <minerva-icon-button label="Success" color="success" variant="solid"
      >✓</minerva-icon-button
    >
    <minerva-icon-button label="Warning" color="warning" variant="outline"
      >!</minerva-icon-button
    >
    <minerva-icon-button label="Danger" color="danger" variant="outline"
      >✕</minerva-icon-button
    >
    <minerva-icon-button label="Info" color="info">i</minerva-icon-button>
  </div>
</div>

```

## Example: 読み込み・無効・ツールチップ

更新をクリックすると読み込み状態になります（フォーカス可能なまま操作は無視）。tooltip はテキストを上書きし、tooltip-placement は位置を変え、no-tooltip は非表示にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/wc/states.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
  <minerva-icon-button id="refresh" label="Refresh" variant="outline"
    >⟳</minerva-icon-button
  >
  <minerva-icon-button label="Disabled" disabled>✎</minerva-icon-button>
  <minerva-icon-button label="Settings" tooltip-placement="bottom"
    >⚙</minerva-icon-button
  >
  <minerva-icon-button
    label="Help"
    tooltip="Open the help center (F1)"
    tooltip-placement="right"
    >?</minerva-icon-button
  >
  <minerva-icon-button label="Close" no-tooltip>✕</minerva-icon-button>
</div>

```

### apps/docs/src/docs/pages/icon-button/wc/states.ts

```tsx
// While loading the button shows a spinner, stays focusable
// (aria-busy / aria-disabled) and ignores clicks.
export function setup(root: HTMLElement) {
  const refresh = root.querySelector<HTMLElement & { loading: boolean }>(
    "#refresh",
  )!;
  const onClick = () => {
    refresh.loading = true;
    setTimeout(() => (refresh.loading = false), 1500);
  };
  refresh.addEventListener("click", onClick);
  return () => refresh.removeEventListener("click", onClick);
}

```

## Example: トグルボタン

toggle は aria-pressed を公開し、操作すると pressed を反転してキャンセル可能な minerva-pressed-change を発火します。ピンはオフにできません（preventDefault）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/wc/toggle.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
  <minerva-icon-button id="bold" toggle label="Bold">B</minerva-icon-button>
  <minerva-icon-button id="italic" toggle pressed label="Italic"
    >I</minerva-icon-button
  >
  <minerva-icon-button
    id="locked"
    toggle
    label="Pin (locked)"
    tooltip="Pinned items cannot be unpinned here"
    >📌</minerva-icon-button
  >
  <output id="log" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/icon-button/wc/toggle.ts

```tsx
// toggle buttons expose aria-pressed and fire a cancelable
// minerva-pressed-change; preventDefault() keeps the current state.
export function setup(root: HTMLElement) {
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onChange = (event: Event) => {
    const { pressed } = (event as CustomEvent<{ pressed: boolean }>).detail;
    const button = event.target as HTMLElement & { label?: string };
    if (button.id === "locked" && !pressed) {
      event.preventDefault();
      log.value = "Unpinning was prevented";
      return;
    }
    log.value = `${button.label}: ${pressed ? "on" : "off"}`;
  };
  root.addEventListener("minerva-pressed-change", onChange);
  return () => root.removeEventListener("minerva-pressed-change", onChange);
}

```
