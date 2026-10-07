---
"@minerva/lib-core": minor
---

Drop the `react-icons` dependency: components now render their icons from a small internal inline-SVG icon set (decorative by default, `1em` sized, colored with `currentColor`). Icon sizes, colors and animations are unchanged; the icon set is internal and not part of the public API.
