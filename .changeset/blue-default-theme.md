---
"minerva-design": patch
---

Remove violet and indigo from the default themes so they share one blue hue:

- Dark theme `primary-color` is now blue-400 `#60a5fa` (was indigo `#818cf8`), with a matching `focus-ring-color`. It keeps a contrast of at least 4.5:1 on the dark surfaces and under inverse text.
- `primary-gradient-start` / `primary-gradient-end` are now `#2563eb` → `#1d4ed8` in light and `#60a5fa` → `#2563eb` in dark (were violet `#6a11cb` → `#2575fc`). No component uses these tokens.
- Code block function names (`code-token-function-color`) are now orange (`#953800` light, `#ffa657` dark) instead of purple. They still meet 4.5:1 on every palette.

Apps that pass their own `primaryColor` or theme overrides are not affected.
