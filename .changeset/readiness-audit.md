---
"@minerva/lib-core": patch
---

Production-readiness audit (keyboard, RTL, StrictMode, SSR / hydration).

**RTL.** Horizontal keyboard navigation now follows the reading direction inherited from the nearest `dir` attribute (or CSS `direction`) when no `dir` prop is given. In RTL, ArrowLeft and ArrowRight swap in Tabs, Rating (ArrowLeft increases), Pagination, MonthCalendar, the Cascader and TimePicker columns, NavTree (ArrowLeft expands, ArrowRight collapses / goes to the parent) and Menu / ContextMenu submenus. Menu and ContextMenu `dir` now defaults to the trigger's inherited direction instead of `"ltr"`; an explicit `dir` prop still wins. Portalled popups (Select, AutoComplete, Cascader, TimePicker, Tooltip, Popover, Menu) now get the anchor's `dir` when it differs from the portal container's, so their layout and arrow keys match the trigger. PageTabs scroll buttons handle RTL scroll offsets and stay on their physical sides.

**Fixes.** NavTree no longer spreads `key` into JSX props, which caused a React warning for every leaf link. Links from a custom `renderLink` are now keyed too.

**Tests.** Added WAI-ARIA keyboard tests per component (`*.keyboard.test.tsx`). Added RTL tests (`rtl.keyboard.test.tsx`). Added a StrictMode suite that checks every exported component for warnings, duplicated portals and leftover window / document listeners, and opens and closes each overlay (focus, scroll lock and `aria-hidden` are restored). Added a hydration suite that renders every exported component to a string and hydrates it with no mismatches. The SSR suite now also imports every source module, including the `monaco` entry, in a DOM-less Node environment.
