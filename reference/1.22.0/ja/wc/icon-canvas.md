# IconCanvas アイコンキャンバス

1 つのキャンバスに多数のアイコンを、WebGPU、WebGL2、WebGL による数回のインスタンス描画、または Canvas2D で描画します。密度の高い図、地図、パーティクル、数千個のアイコンのアニメーションに。

Package: minerva-design@1.22.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 描画のしくみ

IconCanvas は位置、サイズ、回転、色、不透明度を CSS ピクセルで指定してアイコンを配置し、利用できる最適なバックエンド（WebGPU -> WebGL2 -> WebGL -> Canvas2D）で 1 つのキャンバスにまとめて描画します。

ジオメトリ：各アイコンをデバイスピクセルの 4 分の 1 以内の精度で平坦化し、ストロークを三角形に変換します（セグメントごとに四角形 1 つ、結合部と線端には円形のファン）。アイコン、線幅、詳細度の組み合わせごとに 1 回だけ行います。

バッチ処理：すべてのメッシュは 1 つの頂点バッファーに置かれ、各アイコンは 1 つのインスタンス（位置、サイズ、回転、色）です。同じアイコンが連続すれば 1 回のインスタンス描画呼び出しになります。

品質：4× MSAA でエッジを滑らかにし、アイコンごとの深度テストでアイコンの各ピクセルを 1 回だけ描くため、半透明のアイコンも SVG のストロークとまったく同じように合成されます。

堅牢性：auto はソフトウェア GPU をスキップし、GPU コンテキストが失われるとバックエンドを再起動します（2 回失われたバックエンドはスキップ）。キャンバスのルート要素は data-renderer でバックエンドを示します。

インターフェース内のアイコンには Icon を使ってください。SVG のほうが軽く、アクセシブルで、サーバーで描画できます。アイコンそのものが絵になる場合に IconCanvas を使います。

アイコン数

一時停止

再生

一時停止中

{{fps}} フレーム/秒

{{backend}} で描画

レンダラーを起動中…

アニメーションする {{n}} 個のアイコン

{{backend}} で描画した 40 個のアイコン

{{backend}} で描画

{{backend}} にフォールバック

## IconCanvas

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon-canvas",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "renderer",
    "typeText": "\"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
    "attribute": "renderer",
    "required": false
  },
  {
    "name": "width",
    "typeText": "number | string",
    "attribute": "width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "number | string",
    "attribute": "height",
    "required": false
  },
  {
    "name": "pixelRatio",
    "typeText": "number | undefined",
    "attribute": "pixel-ratio",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "items",
    "typeText": "readonly IconCanvasItem[]",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend started (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## API

```json
{
  "wc:minerva-icon-canvas": {
    "kind": "element",
    "source": "web-components/src/components/icon/icon-canvas.ts",
    "className": "MinervaIconCanvas",
    "summary": "Thousands of icons on one GPU canvas.",
    "description": "Many icons of minerva-design/icons on one canvas (the `<IconCanvas>` of React): one instanced GPU draw per run of identical icons (WebGPU, WebGL2, WebGL) or Canvas2D, for dense pictures, maps, particles or animations of thousands of icons; for icons in the UI use `<minerva-icon>`. Set the icons (`IconCanvasItem`: `icon`, `x`, `y`, `size`, `color`, `rotation`, `opacity`...) as the `items` property; replace the array to redraw. The canvas fills a box of `width` × `height` (100% × 240 pixels by default; a number is in pixels, any CSS size works) and follows its size. With `renderer` `auto` it follows the page default (`setDefaultIconRenderer`) live. The host gets `data-renderer` with the backend drawing. Published as the optional entry `minerva-design/web-components/icon`.",
    "properties": [
      {
        "name": "renderer",
        "attribute": "renderer",
        "type": "\"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
        "default": "\"auto\"",
        "description": "Backend preference (`auto` follows the page default)"
      },
      {
        "name": "width",
        "attribute": "width",
        "type": "number | string",
        "default": "\"100%\"",
        "description": "Width of the canvas box: a number is in pixels, or any CSS size"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "number | string",
        "default": "240",
        "description": "Height of the canvas box: a number is in pixels, or any CSS size"
      },
      {
        "name": "pixelRatio",
        "attribute": "pixel-ratio",
        "type": "number | undefined",
        "description": "Device pixel ratio of the canvas; by default the screen's"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name of the picture (role=img); without it the canvas is hidden from assistive technologies"
      },
      {
        "name": "items",
        "type": "readonly IconCanvasItem[]",
        "default": "[]",
        "description": "Icons to draw, in painting order (later ones on top); replace the array to redraw; property only"
      },
      {
        "name": "canvas",
        "type": "HTMLCanvasElement | null",
        "readonly": true,
        "description": "The `<canvas>` drawn into, `null` until the element is rendered and connected"
      }
    ],
    "methods": [
      {
        "name": "getRenderer",
        "signature": "() => IconRendererKind | null",
        "description": "Backend drawing (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until it started"
      },
      {
        "name": "ready",
        "signature": "() => Promise<IconRendererKind>",
        "description": "Resolves with the backend once it started and the current items are drawn; rejects when the element is not connected or no backend can start"
      }
    ],
    "events": [
      {
        "name": "minerva-renderer-change",
        "description": "The backend started (or fell back after a GPU loss); detail: { renderer }"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "surface",
        "description": "The box the canvas is drawn in (role=img when labelled)"
      }
    ],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

items は JavaScript プロパティです。アイコンを CSS ピクセルで配置し、サイズ・色・回転・線幅・不透明度を個別に指定して、1 つのキャンバスに描画します。minerva-renderer-change が使用中のバックエンドを通知します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/wc/basic.html

```html
<div style="display: grid; gap: 8px">
  <minerva-icon-canvas
    id="icons"
    height="160"
    label="Six icons, three ways"
  ></minerva-icon-canvas>
  <small id="status" role="status">…</small>
</div>

```

### apps/docs/src/docs/pages/icon-canvas/wc/basic.ts

```tsx
// `items` is a JS property (positions in CSS px); one canvas, one GPU draw per
// run of identical icons. The backend follows setDefaultIconRenderer.
import {
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
} from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

export function setup(root: HTMLElement) {
  const canvas = root.querySelector<MinervaIconCanvas>("#icons")!;
  const status = root.querySelector<HTMLElement>("#status")!;
  canvas.items = [
    ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: "var(--primary-color)",
      rotation: i * 15,
    })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
  const onChange = (event: Event) => {
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    status.textContent = `Drawn with ${renderer}`;
  };
  canvas.addEventListener("minerva-renderer-change", onChange);
  return () => canvas.removeEventListener("minerva-renderer-change", onChange);
}

```
