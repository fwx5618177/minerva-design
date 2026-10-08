---
"@minerva/core": minor
"@minerva/lib-core": minor
"@minerva/lib-web-components": minor
---

Public item-state styling hooks (part of the initial release).

- **Item states**: repeated items now expose their own states with the shared vocabulary — menu / context menu items (`highlighted`, `disabled`, `checked` / `unchecked`, `expanded`), select options (`selected`, `highlighted`, `disabled`), autocomplete, command and tag input options (`highlighted`), cascader options (`selected`, `expanded`, `disabled`, `loading`), time picker units (`selected`, `disabled`), table rows (`selected`) and sortable headers (`sort="ascending|descending|none"`), pagination items (`current`, `disabled`), steps (`current`, `disabled`, `status="complete|current|upcoming"`), nav tree items (`current`, `expanded`, `disabled`), calendar days (`selected`, `today`, `outside`, `disabled`), toasts (`state="open|closed"`, `color`, `loading`), upload files (`status="uploading|done|error"`), rating stars (`fill="full|half|empty"`), key-value editor rows (`invalid`), theme / palette toggle options (`state="active|inactive"`).
- **React**: the state attributes are on the item element itself, next to `data-minerva` / `data-part`: `[data-minerva="menu"][data-part="item"][data-highlighted]`, `[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"]`. The private `data-menu-*` / `data-toast-*` attributes are removed (style the menu trigger with `[aria-expanded="true"]`).
- **Web components**: items rendered in a shadow root get one extra part name per state, `<part>--<state>` (`<part>--<key>-<value>` for keyed states), next to the part name — `minerva-menu::part(item item--highlighted)`, `minerva-data-table::part(header-cell header-cell--sort-ascending)`, `minerva-toast-region::part(toast toast--color-success)` (Shoelace / Web Awesome convention, no `:state()` support needed). Items that are elements of their own keep their custom states (`minerva-option:state(selected)`). No host attribute is added (hydration-safe).
- **Vocabulary**: new boolean states `selected`, `expanded`, `today`, `outside` and keyed states `sort`, `fill`. `<minerva-option>` / `SelectItem` use `selected` instead of `data-state="checked"`.
- **`@minerva/core/styling-hooks`**: `itemStates` on parts, `itemPartName()`, `wcItemParts()` and an `itemStates` argument for `reactSelector()` / `wcSelector()`; the lock file records item states. The docs list item states per component and the Styling guide has a "Styling items and their states" section.
