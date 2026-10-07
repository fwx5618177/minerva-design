---
"@minerva/core": patch
---

`createDismissableLayer`: calling `event.preventDefault()` in `onFocusOutside` (or `onInteractOutside` for focus) now keeps the layer open. `focusin` is not cancelable, so the call used to be ignored and a modal dialog could close when focus was moved outside programmatically.
