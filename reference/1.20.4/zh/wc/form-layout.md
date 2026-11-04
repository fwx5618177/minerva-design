# FormLayout 表单布局

原生 form，字段排布在响应式网格上；提交、重置和校验保持原生行为。

Package: minerva-design@1.20.4

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormLayout

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/form-layout",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "columns",
    "typeText": "ResponsiveGridColumns",
    "attribute": "columns",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "rowGap",
    "typeText": "string | number | undefined",
    "attribute": "row-gap",
    "required": false
  },
  {
    "name": "columnGap",
    "typeText": "string | number | undefined",
    "attribute": "column-gap",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Fields"
  }
]
```

## API

```json
{
  "wc:minerva-form-layout": {
    "kind": "element",
    "source": "web-components/src/components/form-layout/form-layout.ts",
    "className": "MinervaFormLayout",
    "summary": "Responsive column grid for form fields.",
    "description": "Lays the fields of a form out on a responsive column grid (`<FormLayout>` of React): the same container-query grid as `<minerva-responsive-grid>`, with the form's width / margin / padding variables. Difference from React: the React library's FormLayout renders the `<form>` itself. A `<form>` inside a shadow root cannot own the light DOM fields, so this element is the layout only: place it inside a native `<form>` (`<form><minerva-form-layout columns=\"1 2\">...</minerva-form-layout></form>`), which keeps submit, reset and validation native. Wrap a field in `<minerva-grid-item full-width>` to span a row.",
    "properties": [
      {
        "name": "columns",
        "attribute": "columns",
        "type": "ResponsiveGridColumns",
        "default": "1",
        "description": "Column counts (integers 1-12): a number, `\"1 2 3 4\"` (base sm md lg) or `{ base, sm, md, lg }` (container widths 480 / 768 / 1200px)"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number",
        "default": "4",
        "description": "Gap between fields (spacing token number or CSS value)"
      },
      {
        "name": "rowGap",
        "attribute": "row-gap",
        "type": "string | number | undefined",
        "description": "Gap between rows; defaults to `gap`"
      },
      {
        "name": "columnGap",
        "attribute": "column-gap",
        "type": "string | number | undefined",
        "description": "Gap between columns; defaults to `gap`"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Fields"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The form layout box (React: the native <form>; web components: the grid's query container, inside your own <form>)"
      },
      {
        "name": "layout",
        "description": "The grid. Web components only: React renders a nested ResponsiveGrid (style its `responsive-grid` hooks)"
      }
    ],
    "cssProperties": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      },
      {
        "name": "--form-layout-max-width",
        "description": "Maximum width of the form (none by default)"
      },
      {
        "name": "--form-layout-margin-inline",
        "description": "Inline margin of the form (set auto with a max width to center it)"
      },
      {
        "name": "--form-layout-padding",
        "description": "Inner padding of the form"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:FormLayout": {
    "kind": "cssVars",
    "source": "react/src/components/FormLayout",
    "vars": [
      {
        "name": "--form-layout-max-width",
        "description": "Maximum width of the form (none by default)"
      },
      {
        "name": "--form-layout-margin-inline",
        "description": "Inline margin of the form (set auto with a max width to center it)"
      },
      {
        "name": "--form-layout-padding",
        "description": "Inner padding of the form"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

将布局放在原生 <form> 内：提交、重置和校验保持原生行为。columns="1 2" 在窄容器中为一列，480px 起为两列；minerva-grid-item full-width 占满一整行。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/form-layout/wc/basic.html

```html
<form id="profile">
  <minerva-form-layout columns="1 2" gap="4">
    <minerva-form-control label="First name" required>
      <minerva-input name="first" autocomplete="given-name"></minerva-input>
    </minerva-form-control>
    <minerva-form-control label="Last name" required>
      <minerva-input name="last" autocomplete="family-name"></minerva-input>
    </minerva-form-control>
    <minerva-form-control label="Email" helper-text="We never share it.">
      <minerva-input name="email" type="email"></minerva-input>
    </minerva-form-control>
    <minerva-form-control label="Phone">
      <minerva-input name="phone" type="tel"></minerva-input>
    </minerva-form-control>
    <minerva-grid-item full-width>
      <minerva-form-control label="About you">
        <minerva-textarea name="about" rows="3"></minerva-textarea>
      </minerva-form-control>
    </minerva-grid-item>
    <minerva-grid-item full-width>
      <div style="display: flex; gap: 8px; align-items: center">
        <minerva-button type="submit">Save</minerva-button>
        <minerva-button type="reset" variant="ghost" color="neutral"
          >Reset</minerva-button
        >
        <output id="result"></output>
      </div>
    </minerva-grid-item>
  </minerva-form-layout>
</form>

```

### apps/docs/src/docs/pages/form-layout/wc/basic.ts

```tsx
// The layout sits inside a native <form>: submit, reset and validation stay
// native. One column on narrow containers, two from 480px.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#profile")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(form);
    result.value = `Saved ${data.get("first")} ${data.get("last")}`;
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

## Example: 列与间距

gap 同时设置两个方向的间距；row-gap 和 column-gap 可分别覆盖（间距令牌数字或 CSS 长度）。同样适用于原生字段。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/form-layout/wc/gaps.html

```html
<form style="display: grid; gap: 24px">
  <minerva-form-layout columns="1 2 3" row-gap="6" column-gap="2">
    <label style="display: grid; gap: 4px">
      City
      <input name="city" />
    </label>
    <label style="display: grid; gap: 4px">
      State
      <input name="state" />
    </label>
    <label style="display: grid; gap: 4px">
      ZIP
      <input name="zip" inputmode="numeric" />
    </label>
  </minerva-form-layout>
  <minerva-form-layout columns="2" gap="24px">
    <label style="display: grid; gap: 4px">
      Start date
      <input name="start" type="date" />
    </label>
    <label style="display: grid; gap: 4px">
      End date
      <input name="end" type="date" />
    </label>
  </minerva-form-layout>
</form>

```
