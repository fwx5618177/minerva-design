---
"@minerva/lib-core": major
"@minerva/lib-web-components": minor
---

**BREAKING (lib-core): `Button` defaults to `type="button"`.**

A `Button` (and `IconButton`) inside a `<form>` no longer submits it by accident (preview, "add row", "open dialog" buttons...). `type` is now a documented prop of `ButtonProps` (`"button" | "submit" | "reset"`, default `"button"`).

Migration: add `type="submit"` to every `Button` that should submit its form (and `type="reset"` to reset buttons). Enter in a text field still submits the form natively when it has a submit button.

Every button rendered internally by lib-core components already sets an explicit `type="button"`; a test now covers `Button` / `IconButton` too.

**lib-web-components:** `<minerva-button>` gets a `type` property / attribute (`"button"` by default). The inner `<button>` of the shadow root is always `type="button"`; `type="submit"` submits the enclosing light-DOM `<form>` through `requestSubmit()` (validation and `submit` listeners run) and `type="reset"` resets it. Disabled or loading buttons do neither. The default behaviour is unchanged (a shadow-root button could never submit an outer form), so this is not breaking.
