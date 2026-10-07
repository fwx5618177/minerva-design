---
"@minerva/lib-core": major
---

**BREAKING: camelCase accessibility props are removed; use the native attribute names.**

Every lib-core component now takes `aria-label`, `aria-labelledby` and `aria-describedby` (plus `id`, `className`, `style` and `data-*`) under their standard names and forwards them to the right element. The camelCase aliases `ariaLabel` and `ariaDescribedBy` are gone from Avatar, AvatarGroup, Badge, Button, Checkbox, CodeBlock, ContextMenu, IconButton, Menu, MonthCalendar, NavTree, PageTabs, ProgressIndicator, Radio, RadioGroup, Rating, Select, Skeleton, Steps, Switch, TimePicker, Toast, Tooltip and VirtualList.

Migration: rename the props, e.g. `<IconButton ariaLabel="Delete" />` → `<IconButton aria-label="Delete" />` and `<Select ariaDescribedBy="hint" />` → `<Select aria-describedby="hint" />`.

Other API changes:

- `Switch`: `labelStyle` is renamed to `style` (inline styles of the root element).
- Form controls (Checkbox, Radio, Switch, Select, TagInput, Cascader, TimePicker) forward `id`, `name` and `aria-*` to the native control, and `className`, `style` and `data-*` to the root. Checkbox, Radio, RadioGroup, Switch, Select, NavTree, TagInput, Cascader and TimePicker gain `aria-labelledby` (and `aria-describedby` where it was missing). Components whose props do not extend the React HTML attribute types (for example Switch, Checkbox, Radio, Select, NavTree, HtmlPreview, MonacoCodeEditor) now forward `data-*` attributes to their root.
