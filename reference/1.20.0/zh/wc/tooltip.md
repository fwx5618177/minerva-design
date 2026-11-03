# Tooltip 文字提示

当用户悬停或聚焦某个元素时显示的简短文字提示。靠近视口边缘时会翻转和平移以保持可见。

Package: minerva-design@1.20.0

Renderer: wc

Locale: zh

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

## Tooltip

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tooltip",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "content",
    "typeText": "string",
    "attribute": "content",
    "required": false
  },
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "placement",
    "typeText": "\"top\" | \"top-start\" | \"top-end\" | \"bottom\" | \"bottom-start\" | \"bottom-end\" | \"left\" | \"left-start\" | \"left-end\" | \"right\" | \"right-start\" | \"right-end\"",
    "attribute": "placement",
    "required": false
  },
  {
    "name": "color",
    "typeText": "TooltipColor",
    "attribute": "color",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"solid\" | \"subtle\" | \"glass\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"default\" | \"rounded\" | \"thought\" | \"square\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "\"fade\" | \"scale\" | \"shift-away\" | \"shift-toward\" | \"perspective\"",
    "attribute": "animation",
    "required": false
  },
  {
    "name": "arrow",
    "typeText": "boolean",
    "attribute": "arrow",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "enterDelay",
    "typeText": "number | undefined",
    "attribute": "enter-delay",
    "required": false
  },
  {
    "name": "leaveDelay",
    "typeText": "number | undefined",
    "attribute": "leave-delay",
    "required": false
  },
  {
    "name": "offset",
    "typeText": "[number, number] | undefined",
    "attribute": "offset",
    "required": false
  },
  {
    "name": "followCursor",
    "typeText": "boolean",
    "attribute": "follow-cursor",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:6f996af871815000d153"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "Hover, focus, blur, pointer leave or Escape asked to open / close (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The trigger; prefer a single focusable element (button, link...)"
  },
  {
    "name": "content",
    "description": "Rich tooltip content (alternative to the `content` attribute)"
  }
]
```

## TooltipProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tooltip-provider",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "enterDelay",
    "typeText": "number | undefined",
    "attribute": "enter-delay",
    "required": false
  },
  {
    "name": "leaveDelay",
    "typeText": "number | undefined",
    "attribute": "leave-delay",
    "required": false
  },
  {
    "name": "skipDelay",
    "typeText": "number",
    "attribute": "skip-delay",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Content containing tooltips"
  }
]
```

## API

```json
{
  "wc:minerva-tooltip-provider": {
    "kind": "element",
    "source": "web-components/src/components/tooltip/tooltip.ts",
    "className": "MinervaTooltipProvider",
    "summary": "Shared default delays for the tooltips inside.",
    "description": "Optional provider (`<TooltipProvider>` of React) giving every `<minerva-tooltip>` inside default delays. Moving from one tooltip to the next within `skip-delay` ms opens it immediately. Tooltips work without it.",
    "properties": [
      {
        "name": "enterDelay",
        "attribute": "enter-delay",
        "type": "number | undefined",
        "description": "Default delay before showing on hover (ms) for tooltips without `enter-delay`"
      },
      {
        "name": "leaveDelay",
        "attribute": "leave-delay",
        "type": "number | undefined",
        "description": "Default delay before hiding on pointer leave (ms) for tooltips without `leave-delay`"
      },
      {
        "name": "skipDelay",
        "attribute": "skip-delay",
        "type": "number",
        "default": "300",
        "description": "A tooltip closed less than this many ms ago makes the next one open without its enter delay"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Content containing tooltips"
      }
    ],
    "parts": [],
    "cssProperties": [
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
  },
  "wc:minerva-tooltip": {
    "kind": "element",
    "source": "web-components/src/components/tooltip/tooltip.ts",
    "className": "MinervaTooltip",
    "summary": "Hover / focus tooltip, dismissable with Escape and hoverable.",
    "description": "Tooltip (`<Tooltip>` of React): shows informative content when the wrapped element (default slot) is hovered (after `enter-delay`) or focused. Flips / shifts to stay inside the viewport. WCAG 1.4.13: dismissable with Escape (a non-modal core dismissable layer: only when it is the topmost one, so inside an open `<minerva-modal>` the first Escape closes the tooltip only), hoverable (the pointer can move from the trigger onto the tooltip through the gap between them — core pointer grace) and persistent. Enter / Space are never intercepted, so the wrapped control still activates. The panel (`role=\"tooltip\"`) lives in the shadow root and is shown in the top layer (Popover API). ID references cannot cross shadow roots, so instead of `aria-describedby` the tooltip sets `aria-description` (its text: `aria-label`, else the `content` attribute, else the text of the `content` slot) on the trigger — the first element of the default slot — while it is shown, appended to any `aria-description` the trigger already had; the previous value is restored when it hides, the trigger changes or the tooltip is removed. Plain-text triggers are described through the internal wrapper instead. Inside a `<minerva-tooltip-provider>`, the provider's delays apply when `enter-delay` / `leave-delay` are not set.",
    "properties": [
      {
        "name": "content",
        "attribute": "content",
        "type": "string",
        "default": "\"\"",
        "description": "Text of the tooltip (or use the `content` slot for rich content)"
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the tooltip is shown"
      },
      {
        "name": "placement",
        "attribute": "placement",
        "type": "\"top\" | \"top-start\" | \"top-end\" | \"bottom\" | \"bottom-start\" | \"bottom-end\" | \"left\" | \"left-start\" | \"left-end\" | \"right\" | \"right-start\" | \"right-end\"",
        "default": "\"top\"",
        "description": "Placement relative to the trigger (flips when it overflows)"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "TooltipColor",
        "default": "\"neutral\"",
        "description": "Semantic color"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"solid\" | \"subtle\" | \"glass\"",
        "default": "\"solid\"",
        "description": "Visual style"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"default\" | \"rounded\" | \"thought\" | \"square\"",
        "default": "\"default\"",
        "description": "Shape of the tooltip"
      },
      {
        "name": "animation",
        "attribute": "animation",
        "type": "\"fade\" | \"scale\" | \"shift-away\" | \"shift-toward\" | \"perspective\"",
        "default": "\"fade\"",
        "description": "Show / hide animation"
      },
      {
        "name": "arrow",
        "attribute": "arrow",
        "type": "boolean",
        "default": "false",
        "description": "Shows an arrow pointing at the trigger"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the tooltip (never opens)"
      },
      {
        "name": "enterDelay",
        "attribute": "enter-delay",
        "type": "number | undefined",
        "description": "Delay before showing on hover, in ms (default: the provider's, else 200)"
      },
      {
        "name": "leaveDelay",
        "attribute": "leave-delay",
        "type": "number | undefined",
        "description": "Delay before hiding on pointer leave, in ms (default: the provider's, else 0)"
      },
      {
        "name": "offset",
        "attribute": "offset",
        "type": "[number, number] | undefined",
        "description": "Offset `[x, y]` in px (attribute: `\"x y\"`). For top / bottom placements `y` is the gap to the trigger and `x` shifts along it; for left / right `x` is the gap and `y` the shift. Without it the tooltip sits 8px away."
      },
      {
        "name": "followCursor",
        "attribute": "follow-cursor",
        "type": "boolean",
        "default": "false",
        "description": "Makes the tooltip follow the mouse cursor"
      }
    ],
    "methods": [
      {
        "name": "show",
        "signature": "() => void",
        "description": "Shows the tooltip (does not fire `minerva-open-change`)"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Hides the tooltip (does not fire `minerva-open-change`)"
      },
      {
        "name": "toggle",
        "signature": "() => void",
        "description": "Toggles the tooltip (does not fire `minerva-open-change`)"
      }
    ],
    "events": [
      {
        "name": "minerva-open-change",
        "description": "Hover, focus, blur, pointer leave or Escape asked to open / close (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "The trigger; prefer a single focusable element (button, link...)"
      },
      {
        "name": "content",
        "description": "Rich tooltip content (alternative to the `content` attribute)"
      }
    ],
    "parts": [
      {
        "name": "trigger",
        "description": "The wrapper around the trigger (the slotted element)"
      },
      {
        "name": "content",
        "description": "The positioned tooltip (`role=\"tooltip\"`, while shown)"
      },
      {
        "name": "arrow",
        "description": "The arrow pointing at the trigger (with `arrow`)"
      }
    ],
    "cssProperties": [
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
  "css:Tooltip": {
    "kind": "cssVars",
    "source": "react/src/components/Tooltip",
    "vars": [
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

包裹一个可聚焦的触发器：悬停和聚焦时显示 content 属性。placement 支持 12 个位置，arrow 添加箭头，disabled 关闭提示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 32px 0">
  <minerva-tooltip content="Shown on top (default)">
    <minerva-button variant="outline">Top</minerva-button>
  </minerva-tooltip>
  <minerva-tooltip content="Right side" placement="right" arrow>
    <minerva-button variant="outline">Right</minerva-button>
  </minerva-tooltip>
  <minerva-tooltip
    content="Bottom, start aligned"
    placement="bottom-start"
    arrow
  >
    <minerva-button variant="outline">Bottom start</minerva-button>
  </minerva-tooltip>
  <minerva-tooltip content="Left side" placement="left" arrow>
    <minerva-button variant="outline">Left</minerva-button>
  </minerva-tooltip>
  <minerva-tooltip content="Disabled tooltips never open" disabled>
    <minerva-button variant="outline">Disabled tooltip</minerva-button>
  </minerva-tooltip>
</div>

```

## Example: 方法、事件与跟随指针

show()、hide() 和 toggle() 直接控制提示（不触发事件）；悬停和聚焦会触发可取消的 minerva-open-change。follow-cursor 让提示跟随指针，offset 设置间距。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/wc/controlled.html

```html
<div style="display: grid; gap: 12px; justify-items: start">
  <div style="display: flex; gap: 8px">
    <minerva-button id="tip-show" size="small" variant="outline"
      >show()</minerva-button
    >
    <minerva-button id="tip-hide" size="small" variant="outline"
      >hide()</minerva-button
    >
    <minerva-button id="tip-toggle" size="small" variant="outline"
      >toggle()</minerva-button
    >
  </div>
  <minerva-tooltip
    id="tip"
    content="Controlled tooltip"
    placement="right"
    arrow
  >
    <minerva-button>Target</minerva-button>
  </minerva-tooltip>
  <minerva-tooltip content="I follow the pointer" follow-cursor offset="12 12">
    <div
      style="
        display: grid;
        place-items: center;
        width: 260px;
        height: 80px;
        border: 1px dashed currentColor;
        border-radius: 8px;
      "
    >
      Move the pointer here
    </div>
  </minerva-tooltip>
  <p id="tip-log" style="margin: 0"></p>
</div>

```

### apps/docs/src/docs/pages/tooltip/wc/controlled.ts

```tsx
// show() / hide() / toggle() drive the tooltip directly; hover / focus
// fire the cancelable minerva-open-change (methods do not).
type Tooltip = HTMLElement & { show(): void; hide(): void; toggle(): void };
type OpenChange = CustomEvent<{ open: boolean }>;

export function setup(root: HTMLElement) {
  const tip = root.querySelector<Tooltip>("#tip")!;
  const showButton = root.querySelector<HTMLElement>("#tip-show")!;
  const hideButton = root.querySelector<HTMLElement>("#tip-hide")!;
  const toggleButton = root.querySelector<HTMLElement>("#tip-toggle")!;
  const log = root.querySelector<HTMLElement>("#tip-log")!;
  const onShow = () => tip.show();
  const onHide = () => tip.hide();
  const onToggle = () => tip.toggle();
  const onChange = (event: Event) =>
    (log.textContent = `minerva-open-change: open=${
      (event as OpenChange).detail.open
    }`);
  showButton.addEventListener("click", onShow);
  hideButton.addEventListener("click", onHide);
  toggleButton.addEventListener("click", onToggle);
  tip.addEventListener("minerva-open-change", onChange);
  return () => {
    showButton.removeEventListener("click", onShow);
    hideButton.removeEventListener("click", onHide);
    toggleButton.removeEventListener("click", onToggle);
    tip.removeEventListener("minerva-open-change", onChange);
  };
}

```

## Example: Provider 与富内容

<minerva-tooltip-provider> 为其中的提示提供统一的延迟；在 skip-delay 内移到下一个提示时会立即打开。content 插槽可放置富文本标记。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/wc/provider.html

```html
<minerva-tooltip-provider enter-delay="600" skip-delay="500">
  <div
    role="toolbar"
    aria-label="Formatting"
    style="display: flex; gap: 4px; padding: 32px 0"
  >
    <minerva-tooltip content="Bold (Ctrl+B)">
      <minerva-button variant="ghost" aria-label="Bold"
        ><b>B</b></minerva-button
      >
    </minerva-tooltip>
    <minerva-tooltip content="Italic (Ctrl+I)">
      <minerva-button variant="ghost" aria-label="Italic"
        ><i>I</i></minerva-button
      >
    </minerva-tooltip>
    <minerva-tooltip content="Underline (Ctrl+U)">
      <minerva-button variant="ghost" aria-label="Underline"
        ><u>U</u></minerva-button
      >
    </minerva-tooltip>
    <minerva-tooltip placement="bottom" arrow leave-delay="200">
      <minerva-button variant="ghost">Rich</minerva-button>
      <span slot="content"
        ><strong>Rich content</strong><br />Use the <code>content</code> slot
        for markup.</span
      >
    </minerva-tooltip>
  </div>
</minerva-tooltip-provider>

```

## Example: 颜色、变体、形状与动画

color 设置语义色调，variant 设置表面样式（solid、subtle、glass），shape 设置外形，animation 设置进入 / 退出过渡。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/wc/styles.html

```html
<div style="display: grid; gap: 12px; padding: 24px 0">
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-tooltip content="Neutral" arrow>
      <minerva-button color="neutral" variant="outline">neutral</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip content="Info" color="info" arrow>
      <minerva-button color="info" variant="outline">info</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip content="Success" color="success" arrow>
      <minerva-button color="success" variant="outline">success</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip content="Warning" color="warning" arrow>
      <minerva-button color="warning" variant="outline">warning</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip content="Danger" color="danger" arrow>
      <minerva-button color="danger" variant="outline">danger</minerva-button>
    </minerva-tooltip>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-tooltip content="Subtle variant" variant="subtle" color="info">
      <minerva-button variant="ghost">subtle</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip content="Glass variant" variant="glass">
      <minerva-button variant="ghost">glass</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip content="Rounded shape" shape="rounded" animation="scale">
      <minerva-button variant="ghost">rounded + scale</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip
      content="Thought bubble"
      shape="thought"
      animation="shift-away"
    >
      <minerva-button variant="ghost">thought + shift-away</minerva-button>
    </minerva-tooltip>
    <minerva-tooltip
      content="Square shape"
      shape="square"
      animation="perspective"
    >
      <minerva-button variant="ghost">square + perspective</minerva-button>
    </minerva-tooltip>
  </div>
</div>

```
