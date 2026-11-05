---
"minerva-design": patch
---

Bring the Web Components closer to the React components.

- These hosts now fill their container like the React roots (`width: 100%`), so they no longer shrink inside flex or grid parents: `app-shell`, `code-editor`, `data-table`, `form-control`, `form-layout`, `html-preview`, `nav-tree`, `page`, `responsive-grid`, `skeleton-text`, `slider`, `split-layout`, `tabs` and `tag-input`.
- Exceptions: a non-decorative `skeleton` fills its container, and a vertical `slider` keeps its own width.
- `date-picker` follows `--date-picker-width` (100% by default).
- A `primary`/`label` fallback now shows when the markup only has whitespace inside the element. This applies to `list-item`, `table-cell-content` and `loading-state`.
- The card title and description no longer pick up browser margins.
- The avatar group's "+N" badge stays next to the avatars when the group is stretched.
- A read-only `unstyled` input (such as the Cascader value) no longer gets the read-only grey surface.
