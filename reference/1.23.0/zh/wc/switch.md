# Switch 开关

用于在开启和关闭两种状态之间切换，操作即时生效。

Package: minerva-design@1.23.0

Renderer: wc

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

## Switch

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/switch",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultChecked",
    "typeText": "boolean",
    "attribute": "checked",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "offLabel",
    "typeText": "string",
    "attribute": "off-label",
    "required": false
  },
  {
    "name": "onLabel",
    "typeText": "string",
    "attribute": "on-label",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"slider\" | \"segmented\"",
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
    "name": "color",
    "typeText": "SwitchColor",
    "attribute": "color",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"round\" | \"square\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "labelPlacement",
    "typeText": "\"start\" | \"end\" | \"top\" | \"bottom\"",
    "attribute": "label-placement",
    "required": false
  },
  {
    "name": "iconPlacement",
    "typeText": "\"start\" | \"end\"",
    "attribute": "icon-placement",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "noRipple",
    "typeText": "boolean",
    "attribute": "no-ripple",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "attribute": "invalid",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean",
    "attribute": "required",
    "required": false
  },
  {
    "name": "checked",
    "typeText": "boolean",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "Event",
    "description": "The state changed (re-dispatched from the inner input)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ checked: boolean; value: string; }>",
    "detailType": {
      "typeText": "{ checked: boolean; value: string; }",
      "typeRef": "type:3746ff127f94612742d5"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user toggled the switch; `detail: { checked, value }`"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label content (alternative to the `label` attribute)"
  },
  {
    "name": "icon",
    "description": "Icon inside the thumb (`icon-placement=\"start\"`) or after the switch (\"end\")"
  }
]
```

## API

```json
{
  "wc:minerva-switch": {
    "kind": "element",
    "source": "web-components/src/components/switch/switch.ts",
    "className": "MinervaSwitch",
    "summary": "On / off switch (slider, side labels or segmented).",
    "description": "Toggles between two mutually exclusive states (`<Switch>` of React): a native checkbox with `role=\"switch\"` (Space and Enter toggle it). `off-label` + `on-label` add clickable labels on both sides of the slider, or build a two-segment control with `variant=\"segmented\"`. Form-associated like a checkbox: when on, submits `value` (default `\"on\"`) under `name`; `required` makes it invalid until on (`valueMissing`); supports `form.reset()` (restores the `checked` attribute), `<fieldset disabled>` and state restoration.",
    "properties": [
      {
        "name": "defaultChecked",
        "attribute": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Initial state, restored by `form.reset()` (the `checked` attribute)"
      },
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"on\"",
        "description": "Value submitted with the form when on"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Label text (alternative to the default slot)"
      },
      {
        "name": "offLabel",
        "attribute": "off-label",
        "type": "string",
        "default": "\"\"",
        "description": "Label of the \"off\" state; with `on-label`, rendered as side buttons or segments"
      },
      {
        "name": "onLabel",
        "attribute": "on-label",
        "type": "string",
        "default": "\"\"",
        "description": "Label of the \"on\" state (see `off-label`)"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"slider\" | \"segmented\"",
        "default": "\"slider\"",
        "description": "\"slider\" (track + thumb) or \"segmented\" (needs off-label and on-label)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Switch size"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "SwitchColor",
        "default": "\"primary\"",
        "description": "Semantic color of the \"on\" state"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"round\" | \"square\"",
        "default": "\"round\"",
        "description": "Shape of the track and thumb"
      },
      {
        "name": "labelPlacement",
        "attribute": "label-placement",
        "type": "\"start\" | \"end\" | \"top\" | \"bottom\"",
        "default": "\"end\"",
        "description": "Position of the label relative to the switch"
      },
      {
        "name": "iconPlacement",
        "attribute": "icon-placement",
        "type": "\"start\" | \"end\"",
        "default": "\"start\"",
        "description": "Icon position: inside the thumb (\"start\") or after the switch (\"end\")"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a loading state and blocks interaction (aria-busy)"
      },
      {
        "name": "noRipple",
        "attribute": "no-ripple",
        "type": "boolean",
        "default": "false",
        "description": "Disables the ripple effect on click"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Read-only: focusable and submitted, but the user cannot toggle it"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state (aria-invalid)"
      },
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Name submitted with the form data"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control (not focusable, not submitted, not validated)"
      },
      {
        "name": "required",
        "attribute": "required",
        "type": "boolean",
        "default": "false",
        "description": "The control must have a value for the form to be submitted"
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Whether the switch is on (property; the `checked` attribute sets `defaultChecked`)"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the control is disabled (itself or by a disabled fieldset)."
      },
      {
        "name": "form",
        "type": "HTMLFormElement | null",
        "readonly": true,
        "description": "The form owning the element"
      },
      {
        "name": "labels",
        "type": "NodeList | null",
        "readonly": true,
        "description": "`<label>` elements associated with the element"
      },
      {
        "name": "validity",
        "type": "ValidityState | undefined",
        "readonly": true,
        "description": "Validity state (same as `<input>.validity`)"
      },
      {
        "name": "validationMessage",
        "type": "string",
        "readonly": true,
        "description": "Message describing the current validation error (empty when valid)"
      },
      {
        "name": "willValidate",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the element is a candidate for constraint validation"
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
      },
      {
        "name": "checkValidity",
        "signature": "() => boolean",
        "description": "Checks validity; fires `invalid` when invalid."
      },
      {
        "name": "reportValidity",
        "signature": "() => boolean",
        "description": "Checks validity and shows the browser's validation message."
      },
      {
        "name": "setCustomValidity",
        "signature": "(message: string) => void",
        "description": "Sets (or clears, with `\"\"`) a custom validation error."
      },
      {
        "name": "formResetCallback",
        "signature": "() => void"
      },
      {
        "name": "formDisabledCallback",
        "signature": "(disabled: boolean) => void"
      },
      {
        "name": "formStateRestoreCallback",
        "signature": "(state: string | File | FormData | null) => void"
      }
    ],
    "events": [
      {
        "name": "change",
        "description": "The state changed (re-dispatched from the inner input)"
      },
      {
        "name": "minerva-change",
        "description": "The user toggled the switch; `detail: { checked, value }`"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Label content (alternative to the `label` attribute)"
      },
      {
        "name": "icon",
        "description": "Icon inside the thumb (`icon-placement=\"start\"`) or after the switch (\"end\")"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The outer element (<label>; a <span> with side labels; the group of segments)"
      },
      {
        "name": "input",
        "description": "The native `<input type=\"checkbox\" role=\"switch\">`"
      },
      {
        "name": "control",
        "description": "The slider box (wraps the track and the thumb)"
      },
      {
        "name": "track",
        "description": "The track"
      },
      {
        "name": "thumb",
        "description": "The thumb"
      },
      {
        "name": "icon",
        "description": "The icon (in the thumb or after the slider)"
      },
      {
        "name": "label",
        "description": "The label text"
      },
      {
        "name": "side",
        "description": "The off / on side labels (buttons)"
      },
      {
        "name": "segment",
        "description": "The off / on segments (buttons, variant=\"segmented\")"
      }
    ],
    "cssProperties": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Switch": {
    "kind": "cssVars",
    "source": "react/src/components/Switch",
    "vars": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

带 role="switch" 的原生复选框：空格和回车均可切换，minerva-change 报告新状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/switch/wc/basic.html

```html
<div style="display: grid; gap: 12px; justify-items: start">
  <minerva-switch id="sw-wifi" checked label="Wi-Fi"></minerva-switch>
  <minerva-switch label="Bluetooth"></minerva-switch>
  <minerva-switch disabled label="Airplane mode"></minerva-switch>
  <output id="sw-wifi-state">Wi-Fi is on</output>
</div>

```

### apps/docs/src/docs/pages/switch/wc/basic.ts

```tsx
// Space and Enter toggle the focused switch; `minerva-change` reports the
// new state in detail.checked.
export function setup(root: HTMLElement) {
  const wifi = root.querySelector<HTMLElement>("#sw-wifi")!;
  const output = root.querySelector<HTMLOutputElement>("#sw-wifi-state")!;
  const onChange = (event: Event) => {
    const { checked } = (event as CustomEvent<{ checked: boolean }>).detail;
    output.value = `Wi-Fi is ${checked ? "on" : "off"}`;
  };
  wifi.addEventListener("minerva-change", onChange);
  return () => wifi.removeEventListener("minerva-change", onChange);
}

```

## Example: 在表单中

与复选框相同：开启时提交 value，required 在开启前使表单无效，reset 恢复 checked 属性。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/switch/wc/form.html

```html
<form id="sw-form" style="display: grid; gap: 12px; justify-items: start">
  <minerva-switch
    name="notifications"
    value="enabled"
    checked
    label="Notifications"
  ></minerva-switch>
  <minerva-switch
    name="consent"
    required
    label="I agree to the data policy"
  ></minerva-switch>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Save</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="sw-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/switch/wc/form.ts

```tsx
// Like a checkbox: a switch that is on submits its `value` (default "on"),
// `required` keeps the form invalid until it is on, and reset restores the
// `checked` attributes.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#sw-form")!;
  const result = root.querySelector<HTMLOutputElement>("#sw-form-result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const entries = [...new FormData(form)].map(
      ([key, value]) => `${key}=${value}`,
    );
    result.value = `FormData: ${entries.join(", ") || "(empty)"}`;
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

## Example: 两侧标签与分段

off-label 与 on-label 在滑块两侧添加可点击的标签；variant="segmented" 将其变为两段式控件。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/switch/wc/side-labels.html

```html
<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-switch
    off-label="Monthly"
    on-label="Yearly"
    aria-label="Yearly billing"
  ></minerva-switch>
  <minerva-switch
    variant="segmented"
    off-label="List"
    on-label="Grid"
    checked
    aria-label="View"
  ></minerva-switch>
  <minerva-switch
    variant="segmented"
    size="small"
    color="success"
    off-label="Draft"
    on-label="Published"
    aria-label="Publication status"
  ></minerva-switch>
</div>

```

## Example: 样式与状态

尺寸、方形、颜色、标签位置、滑块中的图标，以及只读、无效和无波纹效果。切换 Sync 可查看加载状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/switch/wc/styles-states.html

```html
<div style="display: grid; gap: 16px">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <minerva-switch size="small" checked label="Small"></minerva-switch>
    <minerva-switch size="medium" checked label="Medium"></minerva-switch>
    <minerva-switch size="large" checked label="Large"></minerva-switch>
    <minerva-switch shape="square" checked label="Square"></minerva-switch>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <minerva-switch color="success" checked label="Success"></minerva-switch>
    <minerva-switch color="warning" checked label="Warning"></minerva-switch>
    <minerva-switch color="danger" checked label="Danger"></minerva-switch>
    <minerva-switch
      color="info"
      checked
      label-placement="start"
      label="Label at start"
    ></minerva-switch>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <minerva-switch id="sw-sync" checked label="Sync (click me)"
      ><span slot="icon" aria-hidden="true">⟳</span></minerva-switch
    >
    <minerva-switch readonly checked label="Read-only"></minerva-switch>
    <minerva-switch invalid label="Invalid"></minerva-switch>
    <minerva-switch no-ripple label="No ripple"></minerva-switch>
  </div>
</div>

```

### apps/docs/src/docs/pages/switch/wc/styles-states.ts

```tsx
// `loading` blocks interaction (aria-busy) while a change is being saved.
export function setup(root: HTMLElement) {
  const sync = root.querySelector<HTMLElement & { loading: boolean }>(
    "#sw-sync",
  )!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onChange = () => {
    sync.loading = true;
    timer = setTimeout(() => (sync.loading = false), 1200);
  };
  sync.addEventListener("minerva-change", onChange);
  return () => {
    clearTimeout(timer);
    sync.removeEventListener("minerva-change", onChange);
  };
}

```
