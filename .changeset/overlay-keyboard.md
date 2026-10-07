---
"@minerva/lib-core": patch
---

Keyboard fixes for overlays and pickers:

- Popover (non-modal): Tab past the last tabbable / Shift+Tab before the first closes the panel and moves focus to the tabbable after / before the trigger (no looping inside the panel); modal popovers still trap and loop focus. The Tab-out helper is shared with Menu.
- TimePicker: Tab past the last column closes the panel and moves on to the next field (the clear button, then the rest of the page); Shift+Tab before the first column closes it and returns to the input.
- AutoComplete: Escape with the list closed clears the input (`onChange("")`, controlled mode respected); Escape with the list open still only closes it.
- Rating: PageUp / PageDown change the value by one whole star (`max / 5`, i.e. max(1, round(stars / 5)) stars), clamped; arrows keep stepping half a star and stay RTL-aware.
- MonthCalendar: each day is now a focusable `role="gridcell"` with `aria-selected` and a roving tabindex (no inner button / `aria-pressed`), so the selection is announced once. Day cells use `aria-disabled` when the calendar is disabled.
