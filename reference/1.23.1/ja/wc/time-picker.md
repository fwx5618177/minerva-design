# TimePicker 時刻選択

時・分・秒の列から時刻を選択するか、直接入力します。

Package: minerva-design@1.23.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で下矢印キーを押すとパネルが開きます。外側をクリックすると閉じます。

各列（時・分・秒・午前/午後）は listbox です。上下矢印キー、Home、End で列内を移動し、左右矢印キーで列を切り替えます。

Enter または Space でフォーカス中の選択肢を選びます。

Escape でパネルを閉じてフォーカスを入力欄に戻します。最後の列で Tab を押すとパネルが閉じて次のフィールドへ、最初の列で Shift+Tab を押すとパネルが閉じて入力欄に戻ります。

入力したテキストは、完全で有効な時刻になったときだけ確定されます。フォーカスが外れると緩やかな解析が行われ、空のテキストは値をクリアし、解析できないテキストは元の値に戻ります。

## TimePicker

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/time-picker",
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
    "name": "format",
    "typeText": "TimePickerFormat",
    "attribute": "format",
    "required": false
  },
  {
    "name": "use12Hours",
    "typeText": "boolean",
    "attribute": "use-12-hours",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
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
    "name": "hideSecond",
    "typeText": "boolean",
    "attribute": "hide-second",
    "required": false
  },
  {
    "name": "minTime",
    "typeText": "string | undefined",
    "attribute": "min-time",
    "required": false
  },
  {
    "name": "maxTime",
    "typeText": "string | undefined",
    "attribute": "max-time",
    "required": false
  },
  {
    "name": "hourStep",
    "typeText": "number",
    "attribute": "hour-step",
    "required": false
  },
  {
    "name": "minuteStep",
    "typeText": "number",
    "attribute": "minute-step",
    "required": false
  },
  {
    "name": "secondStep",
    "typeText": "number",
    "attribute": "second-step",
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
    "description": "Same as `minerva-change` (native-like, bubbles)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:119baa886189b9c8bf6a"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The time was committed (picked, typed, normalized on blur or cleared), `detail: { value }` (`\"\"` when cleared)"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:905657910b1a1ef86a53"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The text of the input changed while typing, `detail: { value }` (the typed text)"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:59099120e3ebb6a4e2aa"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user opened / closed the panel, `detail: { open }`; cancelable: `preventDefault()` keeps the current state"
  },
  {
    "name": "minerva-clear",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The clear button emptied the field"
  }
]
```

## API

```json
{
  "wc:minerva-time-picker": {
    "kind": "element",
    "source": "web-components/src/components/time-picker/time-picker.ts",
    "className": "MinervaTimePicker",
    "summary": "Time field with a typable input and an hours / minutes / seconds panel.",
    "description": "Time field (`<TimePicker>` of React): type a time or pick hours / minutes / seconds (/ AM-PM) from a panel of listbox columns. The input toggles the panel on click; ArrowDown opens it and moves focus into the hours column (Up / Down / Home / End move, Enter / Space pick, Left / Right switch column, Tab past the last column leaves the field, Shift+Tab before the first returns to the input). Escape (topmost layer only) closes the panel and returns focus to the input; a pointer down or focus outside closes it too. Seconds have one source of truth, the format in use: `hide-second` removes the seconds token from `format` (\"HH:mm:ss\" -> \"HH:mm\"), and the seconds column is shown exactly when that format has seconds. Form-associated: submits the value (24-hour `HH:mm:ss`, or `HH:mm` when the format in use has no seconds) under `name`, supports `required`, `form.reset()` (restores the `value` attribute) and `<fieldset disabled>`. Name it with `label`, `<label for>`, `aria-label` or `aria-labelledby` (default: localized \"Time\").",
    "properties": [
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"time-picker\"",
        "description": "Name submitted with the form data (same default as the React TimePicker)"
      },
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initial value, restored by `form.reset()` (the `value` attribute, `HH:mm` or `HH:mm:ss`). Changing it also changes `value` until the user edits it"
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the panel is open"
      },
      {
        "name": "format",
        "attribute": "format",
        "type": "TimePickerFormat",
        "default": "\"HH:mm:ss\"",
        "description": "Display format (tokens HH / H / hh / h / mm / m / ss / s / a)"
      },
      {
        "name": "use12Hours",
        "attribute": "use-12-hours",
        "type": "boolean",
        "default": "false",
        "description": "Uses a 12-hour clock with an AM/PM column"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string | undefined",
        "description": "Placeholder of the input (default: localized \"Select time\")"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible label of the input and panel (default: aria-label, `<label>`, else localized \"Time\")"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Height and font size"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state; sets aria-invalid"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Shows the value without allowing changes (typing, panel, clearing)"
      },
      {
        "name": "hideClearButton",
        "attribute": "hide-clear-button",
        "type": "boolean",
        "default": "false",
        "description": "Hides the clear button (React: `clearable={false}`)"
      },
      {
        "name": "hideSecond",
        "attribute": "hide-second",
        "type": "boolean",
        "default": "false",
        "description": "Hides the seconds column (React: `showSecond={false}`)"
      },
      {
        "name": "minTime",
        "attribute": "min-time",
        "type": "string | undefined",
        "description": "Earliest selectable time (`HH:mm` / `HH:mm:ss`); earlier options are disabled"
      },
      {
        "name": "maxTime",
        "attribute": "max-time",
        "type": "string | undefined",
        "description": "Latest selectable time (`HH:mm` / `HH:mm:ss`); later options are disabled"
      },
      {
        "name": "hourStep",
        "attribute": "hour-step",
        "type": "number",
        "default": "1",
        "description": "Interval between hour options"
      },
      {
        "name": "minuteStep",
        "attribute": "minute-step",
        "type": "number",
        "default": "1",
        "description": "Interval between minute options"
      },
      {
        "name": "secondStep",
        "attribute": "second-step",
        "type": "number",
        "default": "1",
        "description": "Interval between second options"
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
        "description": "Current value: 24-hour `HH:mm:ss` / `HH:mm` (`\"\"` = no time). The `value` attribute sets `defaultValue`"
      },
      {
        "name": "valueAsDate",
        "type": "Date | null",
        "readonly": true,
        "description": "The value as a `Date` (today's date), `null` when empty or invalid"
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
        "name": "show",
        "signature": "() => void",
        "description": "Opens the panel (no event)"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the panel (no event)"
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
        "description": "Same as `minerva-change` (native-like, bubbles)"
      },
      {
        "name": "minerva-change",
        "description": "The time was committed (picked, typed, normalized on blur or cleared), `detail: { value }` (`\"\"` when cleared)"
      },
      {
        "name": "minerva-input",
        "description": "The text of the input changed while typing, `detail: { value }` (the typed text)"
      },
      {
        "name": "minerva-open-change",
        "description": "The user opened / closed the panel, `detail: { open }`; cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-clear",
        "description": "The clear button emptied the field"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The field wrapper (anchor of the panel)"
      },
      {
        "name": "control",
        "description": "The input box"
      },
      {
        "name": "input",
        "description": "The native `<input>`"
      },
      {
        "name": "clear-button",
        "description": "The clear button"
      },
      {
        "name": "icon",
        "description": "The clock icon (shown when there is no clear button)"
      },
      {
        "name": "content",
        "description": "The popup panel (`role=dialog`)"
      },
      {
        "name": "column",
        "description": "An hours / minutes / seconds / AM-PM column (`role=listbox`)"
      },
      {
        "name": "item",
        "description": "A time unit (`role=option`)"
      },
      {
        "name": "item--selected",
        "description": "Item state of `item`: selected"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
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
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:TimePicker": {
    "kind": "cssVars",
    "source": "react/src/components/TimePicker",
    "vars": [
      {
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

時刻を入力するか、パネルから選択します。value 属性で初期時刻を設定し、時刻が確定すると minerva-change が発火します。valueAsDate は Date として返します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/wc/basic.html

```html
<div style="display: grid; gap: 8px; justify-items: start">
  <minerva-time-picker id="alarm" label="Alarm" value="07:30:00">
  </minerva-time-picker>
  <output id="result"></output>
</div>

```

### apps/docs/src/docs/pages/time-picker/wc/basic.ts

```tsx
// minerva-change fires when a time is picked, typed (then normalized on
// blur) or cleared; valueAsDate gives it as today's Date.
type TimePicker = HTMLElement & { value: string; valueAsDate: Date | null };

export function setup(root: HTMLElement) {
  const picker = root.querySelector<TimePicker>("#alarm")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onChange = () => {
    const date = picker.valueAsDate;
    result.value = date
      ? `value = ${picker.value} (${date.toLocaleTimeString()})`
      : "Cleared";
  };
  picker.addEventListener("minerva-change", onChange);
  return () => picker.removeEventListener("minerva-change", onChange);
}

```

## Example: フォーム内での利用

この要素はフォーム関連要素です。24 時間制の値を name で送信し、required は空欄での送信を防ぎ、form.reset() は value 属性の時刻に戻します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/wc/form.html

```html
<form id="booking" style="display: grid; gap: 8px; justify-items: start">
  <label for="start">Start time</label>
  <minerva-time-picker
    id="start"
    name="start"
    format="HH:mm"
    hide-second
    minute-step="30"
    value="10:00"
    required
  ></minerva-time-picker>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Book</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="result"></output>
</form>

```

### apps/docs/src/docs/pages/time-picker/wc/form.ts

```tsx
// Submits a 24-hour value under `name`; `required` blocks an empty field and
// form.reset() restores the `value` attribute.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#booking")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = `start = ${new FormData(form).get("start")}`;
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

## Example: 形式・サイズ・状態

format と use-12-hours で表示を制御します（形式に秒がない場合、hide-second で秒の列を隠します）。3 つのサイズと、読み取り専用・無効・エラーの状態。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/wc/formats.html

```html
<div style="display: grid; gap: 12px; justify-items: start">
  <minerva-time-picker
    label="Meeting"
    format="HH:mm"
    hide-second
    value="14:00"
  ></minerva-time-picker>
  <minerva-time-picker
    label="Pickup"
    format="hh:mm a"
    use-12-hours
    hide-second
    value="18:45"
  ></minerva-time-picker>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-time-picker size="small" label="Small"></minerva-time-picker>
    <minerva-time-picker size="medium" label="Medium"></minerva-time-picker>
    <minerva-time-picker size="large" label="Large"></minerva-time-picker>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-time-picker value="09:00:00" readonly label="Read-only">
    </minerva-time-picker>
    <minerva-time-picker value="09:00:00" disabled label="Disabled">
    </minerva-time-picker>
    <minerva-time-picker invalid label="Invalid"></minerva-time-picker>
  </div>
</div>

```

## Example: 範囲とステップ

min-time と max-time で範囲外の選択肢を無効にし、hour-step・minute-step・second-step で選択肢の間隔を設定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/wc/range-steps.html

```html
<minerva-time-picker
  label="Opening hours slot"
  placeholder="09:00 – 18:00"
  format="HH:mm"
  hide-second
  min-time="09:00"
  max-time="18:00"
  minute-step="15"
></minerva-time-picker>

```
