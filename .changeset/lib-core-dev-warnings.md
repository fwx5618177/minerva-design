---
"@minerva/lib-core": minor
---

Development-only warnings (`console.error`, `[minerva] <Component>: ...`, once per message), guarded by `process.env.NODE_ENV !== "production"` so production bundles drop the checks and their messages:

- a component switching between controlled and uncontrolled during its lifetime (`value`, `checked`, `open`...), like React does for native inputs;
- a controlled prop together with its `default*` counterpart, or without its change handler (user changes would be ignored);
- invalid prop combinations, e.g. `min` greater than `max` (NumberInput), `minLength` greater than `maxLength`, a Tabs `value` matching no Tab, a Pagination page out of range, an invalid Rating `max` / `value`, an icon-only IconButton without an accessible name.

No runtime behaviour changes.
