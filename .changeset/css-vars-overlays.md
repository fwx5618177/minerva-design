---
"@minerva/lib-core": minor
---

Public CSS custom properties for Alert, Command, Drawer, Menu, Modal, Popover, Tooltip, Toast, Pagination, PageTabs, Tabs, NavTree, Steps, ProgressIndicator, Skeleton, LoadingState, Empty, ThemeToggle and AppShell (e.g. `--modal-width`, `--popover-shadow`, `--toast-width`, `--tabs-gap`, `--app-shell-sidebar-width`), documented on each page. These components now follow the global design tokens (density control heights / row paddings, radius, shadow and font scales) and gain accessibility CSS: logical properties and mirrored chevrons for RTL, forced-colors outlines for selection and overlay boundaries, reduced-motion handling and print rules (overlays hidden, AppShell navigation dropped). Pagination's `size` (small / large) and `shape` (circle / square) props now have styles. AppShell's `--shell-*` variables still work as fallbacks of the new `--app-shell-*` names; the internal Popover theme variables were renamed to `--_popover-*`.
