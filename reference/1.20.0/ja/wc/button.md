# Button ボタン

フォーム送信やダイアログを開くなど、アクションやイベントを実行します。

Package: minerva-design@1.20.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Button

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/button",
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
    "typeText": "\"solid\" | \"outline\" | \"ghost\" | \"link\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | \"xlarge\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "borderRadius",
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | \"circle\" | \"square\" | number | undefined",
    "attribute": "border-radius",
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
    "name": "fullWidth",
    "typeText": "boolean",
    "attribute": "full-width",
    "required": false
  },
  {
    "name": "active",
    "typeText": "boolean",
    "attribute": "active",
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

### slots

```json
[
  {
    "name": "default",
    "description": "Label"
  },
  {
    "name": "start",
    "description": "Icon before the label"
  },
  {
    "name": "end",
    "description": "Icon after the label"
  },
  {
    "name": "loading",
    "description": "Text shown instead of the label while `loading`"
  }
]
```

## API

```json
{
  "wc:minerva-button": {
    "kind": "element",
    "source": "web-components/src/components/button/button.ts",
    "className": "MinervaButton",
    "summary": "Button with colors, variants, sizes, icons and a loading state.",
    "description": "A button with a semantic `color`, a visual `variant`, sizes, shapes, icons and a loading state (`<Button>` of React). Renders a native `<button>` in its shadow root; `type=\"submit\"` / `\"reset\"` act on the owning form (the element is form-associated).",
    "properties": [
      {
        "name": "color",
        "attribute": "color",
        "type": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "default": "\"primary\"",
        "description": "Semantic color"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"solid\" | \"outline\" | \"ghost\" | \"link\"",
        "default": "\"solid\"",
        "description": "Visual style: solid (filled), outline, ghost or link"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | \"xlarge\"",
        "default": "\"medium\"",
        "description": "Button size"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"square\" | \"rounded\" | \"circle\" | undefined",
        "description": "Preset shape"
      },
      {
        "name": "borderRadius",
        "attribute": "border-radius",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\" | \"circle\" | \"square\" | number | undefined",
        "description": "Corner radius preset, or a number of pixels"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the button"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a spinner and blocks activation (aria-busy / aria-disabled); the button stays focusable"
      },
      {
        "name": "fullWidth",
        "attribute": "full-width",
        "type": "boolean",
        "default": "false",
        "description": "Stretches the button to the full width of its container"
      },
      {
        "name": "active",
        "attribute": "active",
        "type": "boolean",
        "default": "false",
        "description": "Renders the button in its pressed / active state"
      },
      {
        "name": "type",
        "attribute": "type",
        "type": "\"button\" | \"submit\" | \"reset\"",
        "default": "\"button\"",
        "description": "What the button does in its form: nothing (\"button\"), submit it (through `requestSubmit()`, so validation runs) or reset it"
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
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label"
      },
      {
        "name": "start",
        "description": "Icon before the label"
      },
      {
        "name": "end",
        "description": "Icon after the label"
      },
      {
        "name": "loading",
        "description": "Text shown instead of the label while `loading`"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The native `<button>`"
      },
      {
        "name": "label",
        "description": "The label wrapper"
      },
      {
        "name": "start-icon",
        "description": "The icon before the label"
      },
      {
        "name": "end-icon",
        "description": "The icon after the label"
      },
      {
        "name": "spinner",
        "description": "The loading spinner (while loading)"
      }
    ],
    "cssProperties": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Button": {
    "kind": "cssVars",
    "source": "react/src/components/Button",
    "vars": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

ボタンを押すたびに表示される回数が 1 増えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/button/wc/basic.html

```html
<minerva-hstack gap="3" wrap>
  <minerva-button>Click me</minerva-button>
  <output aria-live="polite">Clicked 0 times</output>
</minerva-hstack>

```

### apps/docs/src/docs/pages/button/wc/basic.ts

```tsx
export function setup(root: HTMLElement) {
  const button = root.querySelector("minerva-button")!;
  const output = root.querySelector("output")!;
  let count = 0;
  const click = () => {
    output.textContent = `Clicked ${++count} times`;
  };
  button.addEventListener("click", click);
  return () => button.removeEventListener("click", click);
}

```

## Example: 色とバリアント

color は意味的な色（共通の ColorScheme）、variant は見た目のスタイルを指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/button/wc/colors-variants.html

```html
<div style="display: grid; gap: 12px">
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-button color="primary">Primary</minerva-button>
    <minerva-button color="success">Success</minerva-button>
    <minerva-button color="warning">Warning</minerva-button>
    <minerva-button color="danger">Danger</minerva-button>
    <minerva-button color="info">Info</minerva-button>
    <minerva-button color="neutral">Neutral</minerva-button>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-button variant="solid">Solid</minerva-button>
    <minerva-button variant="outline">Outline</minerva-button>
    <minerva-button variant="ghost">Ghost</minerva-button>
    <minerva-button variant="link">Link</minerva-button>
  </div>
</div>

```

## Example: フォーム内

この要素はフォーム関連要素です。type="submit" はフォームを検証して送信し、type="reset" はリセットします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/button/wc/form.html

```html
<form
  id="newsletter"
  style="display: flex; flex-wrap: wrap; gap: 8px; align-items: end"
>
  <label style="display: grid; gap: 4px">
    Email
    <input name="email" type="email" required placeholder="you@example.com" />
  </label>
  <minerva-button type="submit">Subscribe</minerva-button>
  <minerva-button type="reset" variant="ghost" color="neutral"
    >Reset</minerva-button
  >
  <output id="result" style="flex-basis: 100%"></output>
</form>

```

### apps/docs/src/docs/pages/button/wc/form.ts

```tsx
// type="submit" submits the owning form through requestSubmit(), so the
// browser validates it first; type="reset" resets it.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#newsletter")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = `Subscribed ${new FormData(form).get("email")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}

```

## Example: サイズと形

5 つのサイズと 3 つの形。アイコンのみの円形ボタンには aria-label が必要で、内部のボタンに転送されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/button/wc/sizes-shapes.html

```html
<minerva-button size="xsmall">XS</minerva-button>
<minerva-button size="small">Small</minerva-button>
<minerva-button size="medium">Medium</minerva-button>
<minerva-button size="large">Large</minerva-button>
<minerva-button size="xlarge">XL</minerva-button>
<minerva-button shape="rounded">Rounded</minerva-button>
<minerva-button shape="square" variant="outline">Square</minerva-button>
<minerva-button shape="circle" aria-label="Add item">+</minerva-button>

```

## Example: 状態・アイコン・読み込み

start / end スロットにアイコン、loading スロットは読み込み中にラベルを置き換えます。「保存」をクリックすると読み込み状態を確認できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/button/wc/states.html

```html
<minerva-button id="save" color="success">
  <span slot="start" aria-hidden="true">✓</span>
  Save changes
  <span slot="loading">Saving…</span>
</minerva-button>
<minerva-button disabled>Disabled</minerva-button>
<minerva-button active variant="outline">Active</minerva-button>
<minerva-button full-width variant="outline">Full width</minerva-button>

```

### apps/docs/src/docs/pages/button/wc/states.ts

```tsx
// `loading` keeps the button focusable (aria-busy / aria-disabled) and
// blocks clicks; the `loading` slot replaces the label meanwhile.
export function setup(root: HTMLElement) {
  const save = root.querySelector<HTMLElement & { loading: boolean }>("#save")!;
  const onClick = () => {
    save.loading = true;
    setTimeout(() => (save.loading = false), 1500);
  };
  save.addEventListener("click", onClick);
  return () => save.removeEventListener("click", onClick);
}

```
