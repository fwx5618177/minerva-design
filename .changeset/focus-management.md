---
"@minerva/lib-core": minor
---

Focus management and accessibility improvements:

- Alert: closing with the close button no longer drops focus to `<body>`; new `returnFocus` prop (element, ref or getter), otherwise focus moves to the next focusable element after the alert (else the previous one, else its container).
- Toast: closing a toast with its close / action button moves focus to the next toast's close button, else back to where focus was before entering the toasts; Escape dismisses the focused toast; new `hotkey` prop on `ToastProvider` (default `["F8"]`) focuses the toast region, whose default label includes it ("Notifications (F8)", localized).
- IconButton: while `loading` the button stays focusable (`aria-disabled` + `aria-busy` instead of `disabled`) and ignores clicks, Enter / Space and form submission.
- VirtualList: forwards native `<div>` attributes (id, data-*, aria-*, handlers) to the root; new `onItemClick` makes rows clickable (pointer cursor only then, focusable, Enter / Space).
- Tag: the close button is named after the tag ("Remove {label}", localized); `closeLabel` also accepts a function of the label.
- AppShell: "Skip to content" link as the first focusable element (visible on focus) that moves focus to `main` (now `tabindex="-1"` with an id); `skipLink` customizes its text or disables it.
