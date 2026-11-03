---
"minerva-design": patch
---

Fix five input bugs, on every renderer that has the component.

- NumberInput (#5): when `precision` is not set, it now keeps every decimal of `step`. `step={1.25}` steps to 1.25 instead of 1, and `step={0.0000001}` now steps instead of staying at 0.
- Slider (#9): a step written in scientific notation keeps the decimals of its coefficient. With `step={1.5e-7}`, one key press moves by 1.5e-7 instead of 1e-7, and snapping keeps valid ticks unchanged.
- AutoComplete (#6): while `loading` hides the options, the arrow keys and Enter no longer pick a hidden old option, and `aria-activedescendant` no longer points to an option that is not shown.
- AutoComplete (#7): the keyboard highlight now follows the option, not its position. When the options change, the highlight stays on the same option. If that option is gone or disabled, `autoHighlight` moves to the first enabled option, and otherwise nothing is highlighted, so Enter always picks a shown option.
- DatePicker (#8): in a month partly cut by `minDate` / `maxDate`, the day grid always keeps one enabled day that Tab can reach.
