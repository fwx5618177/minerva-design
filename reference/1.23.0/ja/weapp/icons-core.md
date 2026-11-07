# アイコンコア

minerva-design/icons/core：フレームワークに依存しないアイコンセット。SVG 文字列、Canvas2D 描画、GPU キャンバス、カスタムアイコン、レンダラーのグローバル既定値、そして GPU バックエンドを支えるジオメトリパイプライン。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### フレームワーク非依存

コアのインポートには副作用がなく、何かを描画するまでブラウザー API に触れないため、サーバーコード、Worker、あらゆるフレームワーク、素のスクリプトで動作します。アイコンは { name, paths, category, tags } というプレーンなオブジェクトです。

React、Vue、Angular、Web Components、React Native（minerva-design/native/icons）、Taro（minerva-design/taro/icons）のコンポーネントはこのコアの上の薄いレイヤーです。その他のフレームワークには toSvg と createIconCanvas が使えます。

{{backend}} で描画

レンダラーを起動中…

次のアイコン

createIconCanvas で描画した 30 個のアイコン

アイコン

許容誤差

{{name}} アイコンの三角形

三角形 {{triangles}} 個、中心線の点 {{points}} 個

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
