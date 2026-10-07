---
"@minerva/core": minor
---

Shadow DOM and slot support for the Web Components, and validation messages.

- `contains()` also follows the flat tree: light DOM content slotted into a shadow tree is inside its host (e.g. the body of a custom element dialog), so dismissable layers and focus scopes treat slotted content as inside.
- `getTabbables()` / `getFocusables()` walk the flat tree: open shadow roots replace their host's light children, a `<slot>` contributes its assigned elements (or its fallback content), unslotted light children are skipped, and `hidden` / `display: none` are checked through slots and shadow roots, matching the browser's sequential focus navigation.
- `createRovingFocus()` finds the item of an event with the flat-tree aware `contains()`, so items whose content is rendered through slots or shadow roots work.
- New `validation` message group in every locale (`valueMissing`, `selectMissing`, `checkMissing`, `radioMissing`, `fileMissing`, `tooShort`, `tooLong`, `rangeUnderflow`, `rangeOverflow`, `badInput`), used by the form-associated custom elements.
