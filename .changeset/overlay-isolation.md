---
"minerva-design": patch
---

Fix overlay state shared across documents and copies of the package, and the uni-app / Taro AutoComplete highlight.

- Overlays (#11): the scroll lock, dismissable layers, focus scopes, `aria-hidden` siblings and the applied theme now keep one shared state per page, even when two copies of `minerva-design` are loaded (micro-frontends, duplicated dependencies). Layers and focus scopes are tracked per document, so a dialog in an iframe no longer blocks or closes a dialog in the main page (Escape, outside clicks, focus trapping).
- AutoComplete on uni-app (#14): the keyboard highlight now follows the option, not its position, like the other renderers. When the options change, the highlight stays on the same option or falls back as documented. The input now sets `aria-activedescendant`, and nothing hidden by `loading` can be picked.
- AutoComplete on Taro (#14): Enter no longer picks an option while `loading` hides the options or while the dropdown is closed.
