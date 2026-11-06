# Icons

The icon set of Minerva: original icons drawn for the library on a 24×24 grid, rendered as inline SVG by default and also drawn on Canvas2D, WebGL, WebGL2 or WebGPU canvases.

Package: minerva-design@1.21.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Overview

minerva-design/icons ships {{count}} icons in {{categories}} categories, with no third-party icon set: every icon is SVG path data owned by the library, the same data for every renderer and every framework.

One visual language: a 24×24 grid with about 2px of padding, 2px strokes with round caps and joins, no fills, so icons sit well next to text and scale from 12 to 96 pixels. Some icons carry a color per stroke (colors); the others follow the color prop.

SVG by default: crisp at any size, server-rendered, colored by the text color (currentColor), hidden from assistive technologies unless given a title.

The same geometry on the GPU: Icon draws on a canvas with renderer="auto", "webgpu", "webgl2", "webgl" or "canvas2d", and IconCanvas draws thousands of icons in a few instanced draws, with the WebGPU -> WebGL2 -> WebGL -> Canvas2D fallback of the charts.

Pay for what you use: each icon is its own constant (searchIcon) and component (SearchIcon), and the canvas renderers load only with the first canvas icon.

Framework-free core: minerva-design/icons/core has the icon data, SVG strings, Canvas2D drawing and the GPU canvases for any framework; the React components are built on it.

See Icon for the component, IconCanvas for GPU batches, and Icons core for the framework-free API.

Search icons

Search by name or tag…

Category

All categories

Size

Stroke width

Rendering

SVG

Canvas

Copy {{code}}

Copied {{code}}

Could not copy {{code}}: the clipboard is unavailable

Kind

All kinds

Monochrome

Multicolor

Color

Text color

Primary

Success

Warning

Danger

{{n}} icons

No icon matches "{{query}}"

Arrows

Actions

Interface

Media

Files

Communication

Data and charts

Finance

Status

Devices

Weather

Nature

Food

People

Places

Shapes

Text

Education

Health

Shopping

Music

Tools

Sports

```tsx
import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
