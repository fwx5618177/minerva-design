# IconCanvas

Many icons on one canvas, drawn by WebGPU, WebGL2 or WebGL in a few instanced draws, or by Canvas2D: dense pictures, maps, particles and animations of thousands of icons.

Package: minerva-design@1.22.3

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### How it draws

IconCanvas places icons by position, size, rotation, color and opacity in CSS pixels, and draws them all on one canvas with the best backend available (WebGPU -> WebGL2 -> WebGL -> Canvas2D).

Geometry: each icon is flattened within a quarter of a device pixel and its stroke turned into triangles (a quad per segment, round fans for joins and caps), once per icon, stroke width and level of detail.

Batching: all meshes live in one vertex buffer and every icon is an instance (position, size, rotation, color); consecutive identical icons are one instanced draw call.

Quality: 4× MSAA smooths the edges, and a per-icon depth test draws each pixel of an icon once, so translucent icons blend exactly like the SVG stroke.

Robustness: auto skips software GPUs, a lost GPU context restarts the backend (a backend lost twice is skipped), and the canvas root reports the backend in data-renderer.

For icons in the interface, use Icon: SVG is lighter, accessible and server-rendered. Use IconCanvas when the icons are the picture.

Number of icons

Pause

Play

Paused

{{fps}} frames per second

Drawn with {{backend}}

Starting the renderer…

{{n}} animated icons

40 icons drawn with {{backend}}

drawn by {{backend}}

fell back to {{backend}}

## IconCanvas

Support: n/a

Web icon component (inline SVG or a WebGPU / WebGL / Canvas2D canvas): no native counterpart yet; draw the same icon data of minerva-design/icons/core (iconPathData, toSvg, toSvgDataUri, toSvgBase64DataUri) with the platform's SVG or image support.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
