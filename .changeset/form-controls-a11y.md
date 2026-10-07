---
"@minerva/lib-core": minor
---

Form control and content accessibility improvements:

- `Switch` (segmented variant): the segment group picks up the enclosing FormControl's label (`aria-labelledby`), helper / error text (`aria-describedby`), invalid and required states (`data-invalid` / `data-required`, since `aria-invalid` / `aria-required` are not supported on `role="group"`; the error message is announced through `aria-describedby`).
- `Cascader` and `TimePicker` consume the FormControl context like Input and Select: the field id, description, invalid, required, disabled and read-only state reach the input; explicit props win over the context.
- `TagInput`: new `separators` prop (default `[",", "Enter"]`). Typing a separator commits the tag, and pasting text such as `"a, b; c"` creates several tags at once, applying the existing trim / dedupe / disabled / read-only rules. Typing a comma now creates a tag by default.
- `Steps`: read-only steps (not clickable) render as an ordered list (`<ol>` / `<li>`) with `aria-current="step"` on the current step instead of disabled buttons; clickable steps keep buttons with `aria-current`.
- `CodeBlock`: new `copyable` prop rendering a localized "Copy code" button (`type="button"`) that copies with `navigator.clipboard.writeText`, shows "Copied" or "Copy failed", and announces the result in a polite live region.
