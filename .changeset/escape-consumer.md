---
"@minerva/core": minor
"@minerva/lib-core": patch
---

`ESCAPE_CONSUMER_ATTRIBUTE` (`data-minerva-escape-consumer`): Escape pressed inside an element carrying it does not dismiss the topmost dismissable layer. AutoComplete sets it while its list is closed and the input has text, so Escape clears the text inside a Modal / Drawer / Popover instead of closing it (a second Escape closes the overlay).
