---
"@minerva/core": minor
"@minerva/lib-core": minor
"@minerva/lib-web-components": minor
---

Visual rules, focus treatment and richer components (part of the initial release).

- **No one-sided borders**: decorative single-side borders and one-sided inset shadows are gone from every component stylesheet (React and web components share them). Accents are fills, full rings or rounded pills (Tabs line indicator, Command items, Prose blockquote, TextLink actions...); structural lines are separator pseudo-elements (new `separator()` mixin) or full borders. A CSS scan test enforces the rule, with a documented allowlist (Divider, table grid lines, tooltip arrow).
- **Focus on text-like controls**: Input, Textarea, Select trigger, NumberInput, TagInput, AutoComplete, TimePicker, Cascader, JsonField, KeyValueEditor, Command search and the Pagination fields no longer show the native outline; they change their border color and draw a box-shadow ring, with `outline: 2px solid transparent` so focus stays visible in forced-colors mode. New global variables `--minerva-focus-ring-color`, `--minerva-focus-ring-width`, `--minerva-focus-border-color`.
- **MonthCalendar**: polished header (title, previous / today / next buttons), weekday row, today ring, selected fill, outside-month dimming, event badges, hover and focus states, a `size` prop / attribute (`small`, `medium`, `large`; styling-hooks state `size`) and display-only `rangeStart` / `rangeEnd` (`range-start` / `range-end`), with new `--month-calendar-*` variables. The element fills its container.
- **List**: `bordered` (card frame, row hover / focus-within fill) and a `comfortable` density. **DescriptionList**: `bordered` and `striped`. Both in React and as reflected attributes on the web components.
- **Richer styling**, each with documented CSS variables: Steps (connector, completed check, current halo), Badge (ring, tabular numbers), Empty (icon tile), Tag (ring, tint hover that works in dark mode), Upload (dropzone, rows, error row), Toast (icon chip), Skeleton, NavTree (indent guide, active branch), Pagination (fill hover, press, ghost current pill) and Rating (tinted empty stars, clearer half stars).
