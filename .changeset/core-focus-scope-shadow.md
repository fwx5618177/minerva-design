---
"@minerva/core": patch
---

`createFocusScope`: a trapped scope inside a shadow root no longer pulls focus back to its container when focus moves into it from outside (`focusout` reports the retargeted shadow host as `relatedTarget`; the following `focusin` decides).
