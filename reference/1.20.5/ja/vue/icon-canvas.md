# IconCanvas アイコンキャンバス

1 つのキャンバスに多数のアイコンを、WebGPU、WebGL2、WebGL による数回のインスタンス描画、または Canvas2D で描画します。密度の高い図、地図、パーティクル、数千個のアイコンのアニメーションに。

Package: minerva-design@1.20.5

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue/icons",
  "exports": [
    "IconCanvas"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "renderer",
    "type": "IconRendererPreference",
    "default": "\"auto\"",
    "required": false,
    "description": "Backend preference; `auto` follows the global default",
    "typeText": "IconRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "default": "\"100%\"",
    "required": false,
    "description": "Width (a number is in pixels)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "default": "240",
    "required": false,
    "description": "Height (a number is in pixels)",
    "typeText": "string | number"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Accessible name of the whole picture (`role=\"img\"`); without it the canvas is hidden from assistive technologies",
    "typeText": "string"
  },
  {
    "name": "items",
    "type": "readonly IconCanvasItem[]",
    "required": true,
    "description": "Icons to draw, in painting order (later ones on top), positions in CSS pixels",
    "typeText": "readonly IconCanvasItem[]"
  },
  {
    "name": "pixelRatio",
    "type": "number",
    "required": false,
    "description": "Device pixel ratio (`window.devicePixelRatio` by default)",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "rendererChange",
    "type": "[kind: IconRendererKind]",
    "typeText": "[kind: IconRendererKind]",
    "parameters": [
      {
        "name": "kind",
        "position": 0,
        "typeText": "IconRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/vue/basic.vue

```vue
<script setup lang="ts">
// One canvas, one GPU draw per run of identical icons; positions in CSS px.
// The backend follows the global default (setDefaultIconRenderer).
import { ref } from "vue";
import { VStack } from "minerva-design/vue";
import {
  IconCanvas,
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
  type IconCanvasItem,
  type IconRendererKind,
} from "minerva-design/vue/icons";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];
const items: IconCanvasItem[] = [
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
const drawn = ref<IconRendererKind | null>(null);
</script>

<template>
  <VStack :gap="2">
    <IconCanvas
      :items="items"
      :height="160"
      title="Six icons, three ways"
      @renderer-change="(kind: IconRendererKind) => (drawn = kind)"
    />
    <small role="status">{{ drawn ? `Drawn with ${drawn}` : "…" }}</small>
  </VStack>
</template>

```
