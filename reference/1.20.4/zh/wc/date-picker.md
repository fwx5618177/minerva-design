# DatePicker 日期选择器

从弹出式周一始月历网格中选择日期，或直接输入 YYYY-MM-DD 格式日期。

Package: minerva-design@1.20.4

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

在输入框上按向下箭头可打开弹出日历并将焦点移至当前活动日期单元格；点击外部关闭日历。

方向键、Home / End 与 PageUp / PageDown（按住 Shift 为一年）在日历网格中移动焦点。

Enter 或 Space 选择当前聚焦的日期并关闭弹出层。

Escape 关闭弹出日历并把焦点还给输入框。

输入的文本在构成完整且在范围内的 YYYY-MM-DD 日期时会立即提交；失焦时会自动规范化 YYYY/M/D 等宽松格式。

## DatePicker

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/date-picker",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "attribute": "invalid",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "hideClearButton",
    "typeText": "boolean",
    "attribute": "hide-clear-button",
    "required": false
  },
  {
    "name": "minDate",
    "typeText": "string | undefined",
    "attribute": "min-date",
    "required": false
  },
  {
    "name": "maxDate",
    "typeText": "string | undefined",
    "attribute": "max-date",
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
    "name": "value",
    "typeText": "string",
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
    "description": "Native-like bubbling change after a committed date"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:19f1649eaf65f9362ad4"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Committed date, detail: { value }; empty string when cleared"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:2d6a7c8cd5b4d6c17662"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Draft input text, detail: { value }"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:a810bf94cc3fbb57cdc4"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "Cancelable popup change, detail: { open }"
  },
  {
    "name": "minerva-clear",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Cleared date"
  }
]
```

## API

```json
{
  "wc:minerva-date-picker": {
    "kind": "element",
    "source": "web-components/src/components/date-picker/date-picker.ts",
    "className": "MinervaDatePicker",
    "summary": "Date field with a keyboard-accessible popup calendar and inclusive date bounds.",
    "description": "Type a calendar date or choose it from an accessible popup month grid. Form-associated: submits YYYY-MM-DD, supports required, reset and disabled fieldsets.",
    "properties": [
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"date-picker\"",
        "description": "Name submitted with form data."
      },
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initial date, restored by form reset."
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the calendar is open."
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible field and popup label."
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string | undefined",
        "description": "Input placeholder; localized by default."
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "string | undefined",
        "description": "Calendar heading locale."
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Input control size."
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state."
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents typing, selection and clearing."
      },
      {
        "name": "hideClearButton",
        "attribute": "hide-clear-button",
        "type": "boolean",
        "default": "false",
        "description": "Hides the clear action."
      },
      {
        "name": "minDate",
        "attribute": "min-date",
        "type": "string | undefined",
        "description": "Earliest selectable date, inclusive (YYYY-MM-DD)."
      },
      {
        "name": "maxDate",
        "attribute": "max-date",
        "type": "string | undefined",
        "description": "Latest selectable date, inclusive (YYYY-MM-DD)."
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
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Current date (YYYY-MM-DD), or empty; property assignment controls the current value."
      },
      {
        "name": "valueAsDate",
        "readonly": true,
        "description": "Current date as a local Date, null when empty or invalid."
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
        "description": "Native-like bubbling change after a committed date"
      },
      {
        "name": "minerva-change",
        "description": "Committed date, detail: { value }; empty string when cleared"
      },
      {
        "name": "minerva-input",
        "description": "Draft input text, detail: { value }"
      },
      {
        "name": "minerva-open-change",
        "description": "Cancelable popup change, detail: { open }"
      },
      {
        "name": "minerva-clear",
        "description": "Cleared date"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "Field wrapper"
      },
      {
        "name": "control",
        "description": "Input box"
      },
      {
        "name": "input",
        "description": "Native text input"
      },
      {
        "name": "clear-button",
        "description": "Clear action"
      },
      {
        "name": "icon",
        "description": "Calendar icon"
      },
      {
        "name": "content",
        "description": "Popup dialog"
      },
      {
        "name": "day",
        "description": "Calendar day cell"
      }
    ],
    "cssProperties": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      },
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
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:DatePicker": {
    "kind": "cssVars",
    "source": "react/src/components/DatePicker",
    "vars": [
      {
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 日期选择与范围

输入 YYYY-MM-DD 或选择 10 月 10 日至 20 日的日期。minerva-change 返回 { value }，清空时为空字符串。value 属性设置初始值，表单重置恢复该值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/wc/basic.html

```html
<minerva-date-picker
  id="delivery-date"
  label="Delivery date"
  value="2026-10-15"
  min-date="2026-10-10"
  max-date="2026-10-20"
></minerva-date-picker>
<output id="date-result" aria-live="polite">2026-10-15</output>

```

### apps/docs/src/docs/pages/date-picker/wc/basic.ts

```tsx
export function setup(root: HTMLElement) {
  const picker = root.querySelector("#delivery-date")!;
  const result = root.querySelector<HTMLOutputElement>("#date-result")!;
  const onChange = (event: Event) => {
    result.value =
      (event as CustomEvent<{ value: string }>).detail.value || "Cleared";
  };
  picker.addEventListener("minerva-change", onChange);
  return () => picker.removeEventListener("minerva-change", onChange);
}

```
