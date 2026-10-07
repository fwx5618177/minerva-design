---
"@minerva/lib-core": minor
---

Table: sortable columns, row selection and a keyboard-scrollable region.

- `column.sortable` (`true` or a compare function `(a, b) => number`) turns the header into a `<button>` cycling ascending → descending → unsorted, with `aria-sort` on the `<th>` and a sort indicator. Sort state is uncontrolled (`defaultSortState`) or controlled (`sortState` + `onSortChange`); `manualSort` skips local sorting for server-side data.
- `rowSelection` (`selectedRowKeys` / `defaultSelectedRowKeys`, `onChange(keys, rows)`, `getCheckboxProps`, `getRowLabel`) adds a leading checkbox column with a localized "Select row …" label per row and an indeterminate "Select all rows" checkbox that skips disabled rows; selected rows get `aria-selected="true"` and the `--table-selected-bg` background.
- A scrolling table wrapper (`scroll.x` / `scroll.y` set, or overflowing content) is now a focusable `role="region"` named after the table's `aria-label` / `aria-labelledby` (default: localized "Scrollable table"), with a focus-visible outline (`--table-focus-ring-color`).
- New types: `TableSortState`, `TableSortOrder`, `TableSortCompare`, `TableRowSelection`, `TableRowKey`.
