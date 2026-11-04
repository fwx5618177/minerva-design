# 3D サーフェスチャート

規則格子上のサーフェス z = f(x, y)：ライティング、組み込みのカラーマップ（viridis、plasma、terrain…）、ワイヤーフレーム、床面に投影した等高線、透明度。ドラッグで回転、Ctrl / ⌘ + ホイールでズーム。

Package: minerva-design@1.21.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

鞍点面

関数

{{name}} 関数の 3D サーフェス

x

y

z

島

{{value}} km

{{value}} m

東

北

標高

幅 20 km の島の地形

インプライド・ボラティリティ

{{value}}%

権利行使価格（現値比 %）

満期までの日数

{{value}} 日

権利行使価格と満期ごとのインプライド・ボラティリティ・サーフェス

面

ワイヤーフレーム

床面の等高線

サーフェス上の等高線

ワイヤーフレームと等高線付きの peaks サーフェス

お椀

傾いた平面

透明なお椀と交わる透明な傾いた平面

波

アニメーション

振幅

中心から広がるアニメーションの波紋

金属板

リセット

cm

温度

点熱源で加熱された金属板の温度

熱源: {{sources}} · 最高 {{max}} · 平均 {{mean}}。板をクリックすると熱源を追加・削除できます。

国債利回り

年限

月

利回り

24 か月間の年限別国債利回り

{{date}}の {{maturity}} 利回り: {{yield}}。

曲面にホバーすると利回りを表示します。

{{date}}は逆イールドです（10 年 − 2 年: {{spread}}）。

{{date}}は右肩上がりの曲線です（10 年 − 2 年: {{spread}}）。

損失

({{x}}, {{y}})

カラースケール

Viridis

Plasma

Magma

Cividis

Turbo

重み 1

重み 2

log₁₀(1 + 損失)

4 つの極小値を持つ Himmelblau 関数の損失地形

{{start}}（損失 {{loss}}）から勾配降下法で {{steps}} ステップ後、{{minimum}} にある極小値 {{n}} に到達しました。

曲面をクリックすると、そこから勾配降下法を開始します。

{{value}} dBm

信号

アクセスポイント

ロビー

オープンスペース

会議室

キッチン

3D 表示

真上から

メートル

オフィスフロアの Wi-Fi 信号強度

フロアの {{good}} が {{goodLevel}} 以上（ビデオ通話可）、{{usable}} が {{usableLevel}} 以上です。

すべてのアクセスポイントがオフです。カバレッジはありません。

## Surface3DChart

Support: beta

Native Angular: MnSurface3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSurface3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wireframe",
    "typeText": "boolean | Surface3DWireframeOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "contours",
    "typeText": "boolean | Surface3DContourOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "series",
    "typeText": "readonly S[]",
    "required": true,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "xAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "yAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "zAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "camera",
    "typeText": "Chart3DCameraOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "autoRotate",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorScale",
    "typeText": "Chart3DColorScale | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorBar",
    "typeText": "boolean | Chart3DColorBarOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | Chart3DLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | Chart3DTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<Chart3DOptions, \"series\">> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "Chart3DHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "Chart3DHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cameraChange",
    "typeText": "Chart3DCameraState",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: A ripple with contour lines

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSurface3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSurface3DChart],
  template: `
@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: wave }]"
  [contours]="{ count: 10, floor: true }"
  colorScale="viridis"
  [zAxis]="{ title: t.height }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  wave = (() => {
  // z = sin(r) / r over a 60 × 60 grid from -10 to 10
  const N = 60;
  const WAVE = {
    rows: N,
    cols: N,
    x: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    y: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    z: Array.from({ length: N * N }, (_, k) => {
      const x = -10 + (20 * (k % N)) / (N - 1);
      const y = -10 + (20 * Math.floor(k / N)) / (N - 1);
      const r = Math.hypot(x, y) || 1e-6;
      return Math.sin(r) / r;
    }),
  };
  return WAVE;
})();
  labels = {
  "en": {
    "name": "Ripple",
    "height": "Height"
  },
  "zh": {
    "name": "波纹",
    "height": "高度"
  },
  "ja": {
    "name": "波紋",
    "height": "高さ"
  },
  "fr": {
    "name": "Onde",
    "height": "Hauteur"
  }
};
}

```

## Example: 地形

フラクタルな島の 180 × 180 の高さマップ。terrain カラーマップ、平たいボックス（aspect）、強めの平行光を使用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSurface3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSurface3DChart],
  template: `
@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: terrain }]"
  [wireframe]="{ step: 2 }"
  colorScale="terrain"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  terrain = (() => {
  // two hills and a valley on a 40 × 40 grid (heights in meters)
  const N = 40;
  const TERRAIN = {
    rows: N,
    cols: N,
    z: Array.from({ length: N * N }, (_, k) => {
      const x = (k % N) / 4;
      const y = Math.floor(k / N) / 4;
      return Math.round(
        900 * Math.exp(-((x - 3) ** 2 + (y - 4) ** 2) / 6) +
          600 * Math.exp(-((x - 7) ** 2 + (y - 7) ** 2) / 4) -
          200 * Math.exp(-((x - 6) ** 2 + (y - 2) ** 2) / 3) +
          300,
      );
    }),
  };
  return TERRAIN;
})();
  labels = {
  "en": {
    "name": "Terrain",
    "axes": ["East (km)", "North (km)", "Elevation (m)"]
  },
  "zh": {
    "name": "地形",
    "axes": ["东（公里）", "北（公里）", "海拔（米）"]
  },
  "ja": {
    "name": "地形",
    "axes": ["東（km）", "北（km）", "標高（m）"]
  },
  "fr": {
    "name": "Relief",
    "axes": ["Est (km)", "Nord (km)", "Altitude (m)"]
  }
};
}

```
