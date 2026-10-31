---
"minerva-design": minor
---

New icon set: `minerva-design/icons` and `minerva-design/icons/core`. 202 original icons drawn for Minerva on a 24×24 grid (2px strokes, round caps and joins) in 10 categories. Each icon is a tree-shakeable constant (`searchIcon`) and a React component (`SearchIcon`). `Icon` renders inline SVG by default, server-rendered and colored by `currentColor`; with `renderer="auto" | "webgpu" | "webgl2" | "webgl" | "canvas2d"` it draws on a canvas through a backend shared by the page. `IconCanvas` draws thousands of icons in a few instanced GPU draws (4× MSAA, one blend per icon), falling back WebGPU -> WebGL2 -> WebGL -> Canvas2D like the charts. `createIcon`, `defineIcon` and `DynamicIcon` cover custom icons and icons chosen by name. The framework-free core adds `toSvg`, `toSvgDataUri`, `drawIcon`, `createIconCanvas`, `createIconSurface`, `setDefaultIconRenderer` and the geometry helpers (`parseIconPath`, `flattenIconPath`, `tessellateIcon`).
