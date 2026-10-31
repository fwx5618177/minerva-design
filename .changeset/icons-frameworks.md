---
"minerva-design": minor
---

The icon set for Vue, Angular and Web Components. `minerva-design/vue/icons` has `Icon`, `IconCanvas`, `DynamicIcon`, `createIcon`, one component per icon (`SearchIcon`…) and the opt-in `MinervaVueIcons` plugin (`<MnIcon>`, `<MnIconCanvas>`, `<MnDynamicIcon>`, typed by `minerva-design/vue/icons-global`). `minerva-design/angular` adds `MnIcon`, `MnIconCanvas` and `MnDynamicIcon`. The optional entry `minerva-design/web-components/icon` registers `<minerva-icon name="search">` and `<minerva-icon-canvas>` (not in the all-in-one entry or the CDN bundle). Each binding renders inline SVG by default and accepts the same `renderer` values as React; in Vue and Angular, as in React, the canvas renderers load with the first canvas icon. All of them share the single copy of `minerva-design/icons/core`.
