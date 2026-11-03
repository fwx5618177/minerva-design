# IconCanvas

Many icons on one canvas, drawn by WebGPU, WebGL2 or WebGL in a few instanced draws, or by Canvas2D: dense pictures, maps, particles and animations of thousands of icons.

Package: minerva-design@1.20.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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
