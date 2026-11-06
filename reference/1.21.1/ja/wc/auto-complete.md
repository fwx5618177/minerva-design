# AutoComplete オートコンプリート

入力中に一致する候補を提示するテキスト入力です。

Package: minerva-design@1.21.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

↓ / ↑ キーで表示中の候補を移動します（端で折り返します）。

Enter でアクティブな選択肢を選びます（無効な選択肢はスキップ）。周囲のフォームは送信されません。

Escape でドロップダウンを閉じ、フォーカスは入力欄に残ります。ドロップダウンが閉じている状態で Escape を押すとテキストを消去します（onChange は "" を受け取ります）。Modal や Popover の中ではドロップダウンだけが閉じます。

入力欄は combobox ロールを持ち、aria-expanded・aria-controls・aria-activedescendant で listbox の候補と関連付けられます。

## AutoComplete

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/autocomplete",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
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
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "mode",
    "typeText": "\"basic\" | \"custom\"",
    "attribute": "mode",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"outline\" | \"filled\" | \"unstyled\"",
    "attribute": "variant",
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
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "placement",
    "typeText": "\"top\" | \"bottom\" | \"left\" | \"right\"",
    "attribute": "placement",
    "required": false
  },
  {
    "name": "noAnimation",
    "typeText": "boolean",
    "attribute": "no-animation",
    "required": false
  },
  {
    "name": "autoHighlight",
    "typeText": "boolean",
    "attribute": "auto-highlight",
    "required": false
  },
  {
    "name": "noFillOnSelect",
    "typeText": "boolean",
    "attribute": "no-fill-on-select",
    "required": false
  },
  {
    "name": "groupMode",
    "typeText": "\"first\" | \"adjacent\"",
    "attribute": "group-mode",
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
    "name": "value",
    "typeText": "string",
    "required": false
  },
  {
    "name": "options",
    "typeText": "AutoCompleteOption[]",
    "required": false
  },
  {
    "name": "offset",
    "typeText": "{ x: number; y: number }",
    "required": false
  },
  {
    "name": "filterOption",
    "typeText": "(inputValue: string, option: AutoCompleteOption) => boolean | undefined",
    "required": false
  },
  {
    "name": "sortOption",
    "typeText": "(a: AutoCompleteOption, b: AutoCompleteOption) => number | undefined",
    "required": false
  },
  {
    "name": "groupBy",
    "typeText": "(option: AutoCompleteOption) => string | undefined",
    "required": false
  },
  {
    "name": "renderOption",
    "typeText": "(option: AutoCompleteOption) => AutoCompleteRenderResult | undefined",
    "required": false
  },
  {
    "name": "renderEmpty",
    "typeText": "() => AutoCompleteRenderResult | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "Event"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:4a005fc48380dc779688"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The input text changed (typing, picking an option, Escape clearing) (`detail: { value }`)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:f039d359728c91dd7710"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The text was committed: an option filled it in, Escape cleared it, or the native change (blur) (`detail: { value }`)"
  },
  {
    "name": "minerva-select",
    "typeText": "CustomEvent<{ value: string | number; option: AutoCompleteOption; }>",
    "detailType": {
      "typeText": "{ value: string | number; option: AutoCompleteOption; }",
      "typeRef": "type:4a1b0e71c9bc41bb0e06"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "An option was picked with the mouse or the keyboard (`detail: { value, option }`)"
  },
  {
    "name": "minerva-submit",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:2638c63bc5fee0d65267"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Enter was pressed with no active option and non-blank text (`detail: { value }`, trimmed)"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:624bfece114287832788"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The dropdown opens / closes (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
  }
]
```

### slots

```json
[
  {
    "name": "prefix",
    "description": "Content before the text (icon)"
  },
  {
    "name": "suffix",
    "description": "Content after the text"
  }
]
```

## API

```json
{
  "wc:minerva-autocomplete": {
    "kind": "element",
    "source": "web-components/src/components/autocomplete/autocomplete.ts",
    "className": "MinervaAutocomplete",
    "summary": "Text input with a filtered suggestion list.",
    "description": "Text input (combobox) suggesting options from a list (`<AutoComplete>` of React): filtering, grouping, custom rendering and async loading. Focus stays in the input; the active option is exposed with `aria-activedescendant` (the listbox lives in the same shadow root). Keyboard (WAI-ARIA combobox): ArrowDown / ArrowUp open the list and move the active option (wrapping, disabled options skipped), Enter picks the active option (or fires `minerva-submit` with the typed text when none is active), Escape closes the open list (topmost layer only) and, on a closed list, clears the text (without closing an enclosing modal). Form-associated: submits the input text under `name`; `required` makes an empty text invalid; `form.reset()` restores the `value` attribute.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initial text, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the dropdown is open"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible label of the input (also names the listbox)"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string",
        "default": "\"\"",
        "description": "Placeholder of the input"
      },
      {
        "name": "mode",
        "attribute": "mode",
        "type": "\"basic\" | \"custom\"",
        "default": "\"basic\"",
        "description": "\"basic\" renders icon / label / description; \"custom\" uses `renderOption`"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Size of the input"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"outline\" | \"filled\" | \"unstyled\"",
        "default": "\"outline\"",
        "description": "Visual style of the input"
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
        "description": "Read-only: focusable and submitted, no dropdown"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a loading indicator instead of the options"
      },
      {
        "name": "placement",
        "attribute": "placement",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "default": "\"bottom\"",
        "description": "Preferred dropdown side (aligned with the input's start edge)"
      },
      {
        "name": "noAnimation",
        "attribute": "no-animation",
        "type": "boolean",
        "default": "false",
        "description": "Disables the opening animation"
      },
      {
        "name": "autoHighlight",
        "attribute": "auto-highlight",
        "type": "boolean",
        "default": "false",
        "description": "Makes the first enabled option active whenever the dropdown opens"
      },
      {
        "name": "noFillOnSelect",
        "attribute": "no-fill-on-select",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the typed text when an option is picked (no fill-in)"
      },
      {
        "name": "groupMode",
        "attribute": "group-mode",
        "type": "\"first\" | \"adjacent\"",
        "default": "\"first\"",
        "description": "How `groupBy` groups options: at first appearance, or runs of adjacent options"
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
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Input text (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "options",
        "type": "AutoCompleteOption[]",
        "default": "[]",
        "description": "Options to suggest"
      },
      {
        "name": "offset",
        "type": "{ x: number; y: number }",
        "default": "{ x: 0, y: 4 }",
        "description": "Dropdown offset in px: for top / bottom `y` is the gap and `x` the shift, for left / right the reverse"
      },
      {
        "name": "filterOption",
        "type": "(inputValue: string, option: AutoCompleteOption) => boolean | undefined",
        "description": "Custom filter (default: label contains the text, case-insensitive)"
      },
      {
        "name": "sortOption",
        "type": "(a: AutoCompleteOption, b: AutoCompleteOption) => number | undefined",
        "description": "Compare function sorting the filtered options"
      },
      {
        "name": "groupBy",
        "type": "(option: AutoCompleteOption) => string | undefined",
        "description": "Group name of an option; options are grouped under headings (\"\" = none)"
      },
      {
        "name": "renderOption",
        "type": "(option: AutoCompleteOption) => AutoCompleteRenderResult | undefined",
        "description": "Custom option renderer (used when `mode` is \"custom\")"
      },
      {
        "name": "renderEmpty",
        "type": "() => AutoCompleteRenderResult | undefined",
        "description": "Custom content shown when no option matches"
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
        "name": "change"
      },
      {
        "name": "minerva-input",
        "description": "The input text changed (typing, picking an option, Escape clearing) (`detail: { value }`)"
      },
      {
        "name": "minerva-change",
        "description": "The text was committed: an option filled it in, Escape cleared it, or the native change (blur) (`detail: { value }`)"
      },
      {
        "name": "minerva-select",
        "description": "An option was picked with the mouse or the keyboard (`detail: { value, option }`)"
      },
      {
        "name": "minerva-submit",
        "description": "Enter was pressed with no active option and non-blank text (`detail: { value }`, trimmed)"
      },
      {
        "name": "minerva-open-change",
        "description": "The dropdown opens / closes (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
      }
    ],
    "slots": [
      {
        "name": "prefix",
        "description": "Content before the text (icon)"
      },
      {
        "name": "suffix",
        "description": "Content after the text"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The root wrapper (label, field and anchor of the dropdown)"
      },
      {
        "name": "label",
        "description": "The visible label"
      },
      {
        "name": "field",
        "description": "The input box"
      },
      {
        "name": "input",
        "description": "The native `<input role=combobox>`"
      },
      {
        "name": "content",
        "description": "The positioned dropdown"
      },
      {
        "name": "list",
        "description": "The `role=listbox` list"
      },
      {
        "name": "item",
        "description": "An option"
      },
      {
        "name": "item--highlighted",
        "description": "Item state of `item`: highlighted"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "group-label",
        "description": "A group heading"
      },
      {
        "name": "empty",
        "description": "The empty state (no matching option)"
      },
      {
        "name": "loading",
        "description": "The loading state (while loading)"
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
        "name": "--auto-complete-dropdown-background",
        "description": "Background of the dropdown"
      },
      {
        "name": "--auto-complete-dropdown-radius",
        "description": "Corner radius of the dropdown (defaults to --radius-lg)"
      },
      {
        "name": "--auto-complete-dropdown-max-height",
        "description": "Maximum height of the option list before it scrolls"
      },
      {
        "name": "--auto-complete-font-size",
        "description": "Font size of the dropdown"
      },
      {
        "name": "--auto-complete-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--auto-complete-option-padding-x",
        "description": "Horizontal padding of an option and of a group label"
      },
      {
        "name": "--auto-complete-option-hover-background",
        "description": "Background of the hovered / keyboard-focused option"
      },
      {
        "name": "--auto-complete-option-highlight-background",
        "description": "Background of options with `highlight: true`"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:AutoComplete": {
    "kind": "cssVars",
    "source": "react/src/components/AutoComplete",
    "vars": [
      {
        "name": "--auto-complete-dropdown-background",
        "description": "Background of the dropdown"
      },
      {
        "name": "--auto-complete-dropdown-radius",
        "description": "Corner radius of the dropdown (defaults to --radius-lg)"
      },
      {
        "name": "--auto-complete-dropdown-max-height",
        "description": "Maximum height of the option list before it scrolls"
      },
      {
        "name": "--auto-complete-font-size",
        "description": "Font size of the dropdown"
      },
      {
        "name": "--auto-complete-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--auto-complete-option-padding-x",
        "description": "Horizontal padding of an option and of a group label"
      },
      {
        "name": "--auto-complete-option-hover-background",
        "description": "Background of the hovered / keyboard-focused option"
      },
      {
        "name": "--auto-complete-option-highlight-background",
        "description": "Background of options with `highlight: true`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 非同期読み込み

minerva-input を監視して入力中に候補を取得し、その間は loading を設定します。prefix スロットにアイコンを置き、minerva-change が確定したテキストを通知します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/wc/async-loading.html

```html
<div style="display: grid; gap: 12px; max-width: 360px">
  <minerva-autocomplete
    id="city"
    label="City"
    placeholder="Type at least 2 letters"
    no-animation
  >
    <span slot="prefix" aria-hidden="true">🔍</span>
  </minerva-autocomplete>
  <output id="log"></output>
</div>

```

### apps/docs/src/docs/pages/auto-complete/wc/async-loading.ts

```tsx
// minerva-input fires on every keystroke: fetch the matches (simulated
// here with a timer) and show `loading` meanwhile. The options are already
// filtered, so filterOption accepts everything.
type Option = { label: string; value: string };
type Autocomplete = HTMLElement & {
  options: Option[];
  loading: boolean;
  filterOption: () => boolean;
};

const CITIES = [
  "Paris",
  "Pau",
  "Perth",
  "Porto",
  "Prague",
  "Tokyo",
  "Toronto",
  "Turin",
];

export function setup(root: HTMLElement) {
  const input = root.querySelector<Autocomplete>("#city")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  input.filterOption = () => true;
  const onInput = (event: Event) => {
    const text = (event as CustomEvent<{ value: string }>).detail.value;
    clearTimeout(timer);
    input.options = [];
    input.loading = text.trim().length >= 2;
    if (!input.loading) return;
    timer = setTimeout(() => {
      const query = text.trim().toLowerCase();
      input.options = CITIES.filter((city) =>
        city.toLowerCase().startsWith(query),
      ).map((city) => ({ label: city, value: city.toLowerCase() }));
      input.loading = false;
    }, 600);
  };
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-change: ${value}`;
  };
  input.addEventListener("minerva-input", onInput);
  input.addEventListener("minerva-change", onChange);
  return () => {
    clearTimeout(timer);
    input.removeEventListener("minerva-input", onInput);
    input.removeEventListener("minerva-change", onChange);
  };
}

```

## Example: 基本的な使い方

JS プロパティ options を設定すると、入力に応じてラベルで絞り込まれます。選択肢を選ぶと入力欄に反映され minerva-select が発火し、アクティブな選択肢がない状態で Enter を押すと入力テキストとともに minerva-submit が発火します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/wc/basic.html

```html
<div style="display: grid; gap: 12px; max-width: 320px">
  <minerva-autocomplete
    id="fruit"
    label="Fruit"
    placeholder="Type a fruit, then Enter"
  ></minerva-autocomplete>
  <output id="log"></output>
</div>

```

### apps/docs/src/docs/pages/auto-complete/wc/basic.ts

```tsx
// `options` is a JS property. Typing filters the options (label contains
// the text); picking one fires minerva-select and fills the input, Enter
// with no active option fires minerva-submit with the trimmed text.
type Option = { label: string; value: string };

export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLElement & { options: Option[] }>(
    "#fruit",
  )!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  input.options = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry"].map(
    (label) => ({ label, value: label.toLowerCase() }),
  );
  const onSelect = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-select: ${value}`;
  };
  const onSubmit = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-submit: ${value}`;
  };
  input.addEventListener("minerva-select", onSelect);
  input.addEventListener("minerva-submit", onSubmit);
  return () => {
    input.removeEventListener("minerva-select", onSelect);
    input.removeEventListener("minerva-submit", onSubmit);
  };
}

```

## Example: カスタム描画と絞り込み

mode="custom" のとき、renderOption が各選択肢の内容（文字列、DOM ノード、Lit テンプレート）を返します。ここでは filterOption がメールアドレスにも一致し、sortOption が名前順に並べ、renderEmpty が空の状態を置き換えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/wc/custom-render.html

```html
<div style="display: grid; gap: 12px; max-width: 360px">
  <minerva-autocomplete
    id="user"
    label="Assignee"
    placeholder="Search by name or email"
    mode="custom"
  ></minerva-autocomplete>
</div>

```

### apps/docs/src/docs/pages/auto-complete/wc/custom-render.ts

```tsx
// mode="custom" renders options with renderOption (a string, a DOM node or
// a Lit template); filterOption / sortOption replace the default filtering
// and order; renderEmpty replaces the empty state.
type User = { label: string; value: string; description: string };
type Autocomplete = HTMLElement & {
  options: User[];
  filterOption: (text: string, option: User) => boolean;
  sortOption: (a: User, b: User) => number;
  renderOption: (option: User) => Node;
  renderEmpty: () => string;
};

export function setup(root: HTMLElement) {
  const input = root.querySelector<Autocomplete>("#user")!;
  input.options = [
    { label: "Ada Lovelace", value: "ada", description: "ada@example.com" },
    { label: "Grace Hopper", value: "grace", description: "grace@example.com" },
    { label: "Alan Turing", value: "alan", description: "turing@example.com" },
    {
      label: "Linus Torvalds",
      value: "linus",
      description: "linus@example.com",
    },
  ];
  input.filterOption = (text, option) => {
    const query = text.trim().toLowerCase();
    return (
      option.label.toLowerCase().includes(query) ||
      option.description.includes(query)
    );
  };
  input.sortOption = (a, b) => a.label.localeCompare(b.label);
  input.renderOption = (option) => {
    const row = document.createElement("div");
    row.style.cssText = "display: flex; gap: 8px; align-items: center";
    const avatar = document.createElement("span");
    avatar.textContent = option.label
      .split(" ")
      .map((word) => word[0])
      .join("");
    avatar.style.cssText =
      "display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--primary-color, #4f46e5); color: #fff; font-size: 12px";
    const text = document.createElement("span");
    text.innerHTML = `<strong></strong><br /><small style="opacity: 0.7"></small>`;
    text.querySelector("strong")!.textContent = option.label;
    text.querySelector("small")!.textContent = option.description;
    row.append(avatar, text);
    return row;
  };
  input.renderEmpty = () => "Nobody matches — try another name.";
}

```

## Example: リッチな選択肢とグループ

選択肢にはアイコン・説明・ハイライトを付けたり、無効にしたりできます。groupBy で見出しごとにまとめます。auto-highlight は最初の有効な選択肢をアクティブにするので Enter ですぐ選べます。variant と size で入力欄の見た目を指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/wc/rich-options.html

```html
<div style="display: grid; gap: 12px; max-width: 360px">
  <minerva-autocomplete
    id="framework"
    label="Framework"
    placeholder="Search a framework"
    auto-highlight
  ></minerva-autocomplete>
  <minerva-autocomplete
    id="framework-filled"
    aria-label="Framework (filled, small)"
    placeholder="Filled, small"
    variant="filled"
    size="small"
  ></minerva-autocomplete>
</div>

```

### apps/docs/src/docs/pages/auto-complete/wc/rich-options.ts

```tsx
// Basic mode renders each option's icon, label and description; highlight
// marks recommended options, disabled ones are skipped by the keyboard.
// groupBy puts options under headings; auto-highlight makes the first
// enabled option active, so Enter picks it right away.
type Option = {
  label: string;
  value: string;
  icon?: string;
  description?: string;
  highlight?: boolean;
  disabled?: boolean;
  group?: string;
};
type Autocomplete = HTMLElement & {
  options: Option[];
  groupBy?: (option: Option) => string;
};

const OPTIONS: Option[] = [
  {
    label: "React",
    value: "react",
    icon: "⚛️",
    group: "UI libraries",
    description: "Component-based UI library",
    highlight: true,
  },
  {
    label: "Vue",
    value: "vue",
    icon: "🟩",
    group: "UI libraries",
    description: "Progressive framework",
  },
  {
    label: "Lit",
    value: "lit",
    icon: "🔥",
    group: "UI libraries",
    description: "Web Components base class",
  },
  {
    label: "Next.js",
    value: "next",
    icon: "▲",
    group: "Meta-frameworks",
    description: "React framework",
  },
  {
    label: "Nuxt",
    value: "nuxt",
    icon: "⛰️",
    group: "Meta-frameworks",
    description: "Vue framework",
  },
  {
    label: "Gatsby",
    value: "gatsby",
    icon: "🟣",
    group: "Meta-frameworks",
    description: "Deprecated in this project",
    disabled: true,
  },
];

export function setup(root: HTMLElement) {
  root.querySelectorAll<Autocomplete>("minerva-autocomplete").forEach((el) => {
    el.options = OPTIONS;
    el.groupBy = (option) => option.group ?? "";
  });
}

```
