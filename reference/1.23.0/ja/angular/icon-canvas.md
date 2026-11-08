# IconCanvas アイコンキャンバス

1 つのキャンバスに多数のアイコンを、WebGPU、WebGL2、WebGL による数回のインスタンス描画、または Canvas2D で描画します。密度の高い図、地図、パーティクル、数千個のアイコンのアニメーションに。

Package: minerva-design@1.23.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnIconCanvas. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnIconCanvas"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly IconCanvasItem[]",
    "required": true,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "renderer",
    "typeText": "IconRendererPreference",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "width",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "height",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "pixelRatio",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  }
]
```

### events

```json
[
  {
    "name": "rendererChange",
    "typeText": "IconRendererKind",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: 基本的な使い方

CSS ピクセルで配置したアイコン。それぞれにサイズ、色（テーマ変数を含む）、回転、線幅、不透明度を指定しています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIconCanvas, MnStack } from 'minerva-design/angular';
import { homeIcon, searchIcon, mailIcon, bellIcon, userIcon, settingsIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIconCanvas, MnStack],
  template: `
<mn-stack gap="2">
  <mn-icon-canvas
    [items]="items"
    [height]="160"
    title="Six icons, three ways"
    (rendererChange)="drawn = $event"
  />
  <small role="status">{{ drawn ? 'Drawn with ' + drawn : '…' }}</small>
</mn-stack>
  `,
})
export class Example {
  items = (() => {
  const row = [homeIcon, searchIcon, mailIcon, bellIcon, userIcon, settingsIcon];
  return [
    ...row.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: 'var(--primary-color)',
      rotation: i * 15,
    })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
})();
  drawn = "";
}

```

## Example: Every backend

A forced backend that cannot start falls back to the next one (WebGPU, WebGL2, WebGL, Canvas2D); rendererChange tells which one drew.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIconCanvas, MnStack } from 'minerva-design/angular';
import { icons } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIconCanvas, MnStack],
  template: `
<mn-stack direction="row" wrap gap="4">
  @for (renderer of renderers; track renderer) {
    <figure style="margin: 0">
      <mn-icon-canvas
        [items]="items"
        [renderer]="renderer"
        [width]="256"
        [height]="160"
        [title]="'Icons drawn with ' + renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <figcaption>
        <code>renderer="{{ renderer }}"</code>
        <small>{{
          !drawn[renderer]
            ? 'Starting…'
            : drawn[renderer] === renderer
              ? 'Drawn by ' + drawn[renderer]
              : 'Fell back to ' + drawn[renderer]
        }}</small>
      </figcaption>
    </figure>
  }
</mn-stack>
  `,
})
export class Example {
  renderers: import('minerva-design/icons/core').IconRendererPreference[] = ["webgpu", "webgl2", "webgl", "canvas2d"];
  items = icons.slice(0, 40).map((icon, i) => ({
  icon,
  x: 8 + (i % 8) * 30,
  y: 8 + Math.floor(i / 8) * 30,
  size: 24,
}));
  drawn: Partial<Record<string, string>> = {};
}

```
