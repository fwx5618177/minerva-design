# Icons core

minerva-design/icons/core: the icon set without a framework. SVG strings, Canvas2D drawing, GPU canvases, custom icons, the global renderer default and the geometry pipeline behind the GPU backends.

Package: minerva-design@1.20.2

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Framework-free

Importing the core has no side effects and touches no browser API until something is drawn, so it works in server code, workers, any framework and plain scripts. Icons are plain objects: { name, paths, category, tags }.

The React, Vue, Angular, Web Components, React Native (minerva-design/native/icons) and Taro (minerva-design/taro/icons) components are thin layers over this core; toSvg and createIconCanvas cover any other framework.

Drawn with {{backend}}

Starting the renderer…

Next icons

Thirty icons drawn by createIconCanvas

Icon

Tolerance

Triangles of the {{name}} icon

{{triangles}} triangles, {{points}} centerline points

```ts
// Any framework (or none): the core only needs an element
import { createIconCanvas, searchIcon, toSvg } from "minerva-design/icons/core";

// markup: a string of SVG for templates, innerHTML, server rendering
element.innerHTML = toSvg(searchIcon, { size: 20, title: "Search" });

// many icons on the GPU, following the global default renderer
const canvas = createIconCanvas(container, {
  items: [{ icon: searchIcon, x: 8, y: 8, size: 24 }],
});
canvas.setItems(nextItems); // redrawn on the next animation frame
canvas.destroy(); // releases the GPU context
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
