# Icons

The icon set of Minerva: original icons drawn for the library on a 24×24 grid, rendered as inline SVG by default and also drawn on Canvas2D, WebGL, WebGL2 or WebGPU canvases.

Package: minerva-design@1.23.2

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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
