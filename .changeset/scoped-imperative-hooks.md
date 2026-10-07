---
"@minerva/lib-core": minor
---

`useToast()` and `useConfirm()` render in the calling component's ConfigProvider scope.

- `useToast()` returns a toast API bound to the caller's scope: inside a nested `ConfigProvider` (theme / palette / locale override), its toasts are rendered into that scope's portal host, so the scoped theme, palette and tokens apply and the built-in labels (close button, region) use the scoped language. The owning `ToastProvider` still renders every toast (provider de-duplication, ids, `update` / `dismiss` / `promise`, `max`, `pauseOnHover` and SSR safety are unchanged), with one viewport per scope container at the same position. Outside a nested scope `useToast()` returns the `toast` export itself.
- `useConfirm()` returns a confirm function bound to the caller's scope: the dialog (rendered by the nearest `ConfirmProvider`, or by the standalone host without one) portals into the scoped host and uses the scoped language.
- Module-level `toast()` / `confirm()` keep the root (or owning provider's) theme and language: use them outside React (event buses, API clients, non-component modules), and the hooks inside components.
