# 3D 散布図

周囲を回転できる 3D ボックス内の点群：数十万〜数百万の点を GPU で描画し、系列ごと・点ごと・カラースケールで色分け。ホバー選択、凡例、カラーバー付き。Line3DChart は 3D の軌跡を描きます。

Package: minerva-design@1.21.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

セトサ

バーシカラー

バージニカ

がく片の長さ（cm）

がく片の幅（cm）

花びらの長さ（cm）

がく片の長さ・幅と花びらの長さによる 3 品種の花の 3D 散布図

バルジとバー

古い円盤

若い星

HII 領域

ハロー

{{value}} kpc

100 万個の星の棒渦巻銀河：バルジ、若い星の渦巻腕、HII 領域と塵の帯、円盤とハロー

露出

露出 ×{{value}}

センサー

センサー {{id}} · 湿度 {{humidity}}%

{{value}} °C

長さ（m）

幅（m）

高さ（m）

温度

倉庫内の 300 個のセンサーの位置と高さごとの温度

骨格 1

骨格 2

塩基対

自動回転

投影

透視

平行投影

回転する DNA の二重らせん

トーラス結び目

高さで色分けしたトーラス結び目の周りの 200,000 点

バックエンド

自動

WebGPU

WebGL2

WebGL

Canvas2D

起動中…

使用中のバックエンド：{{backend}}

ここでは {{requested}} を使えないため {{backend}} で描画しています

軌跡

時間

{{value}} 秒

時間で色分けしたローレンツアトラクターの軌跡

スイスロール

ロール上の位置

正面

側面

上面

リセット

方位角 {{azimuth}}°、仰角 {{elevation}}°、ズーム ×{{zoom}}

ドラッグで回転、Shift + ドラッグでパン、Ctrl / ⌘ + ホイールでズーム、ダブルクリックでリセット。

ロール上の位置で色分けしたスイスロールの点群

スポーツ

政治

テクノロジー

健康

金融

旅行

{{topic}}の記事 #{{n}}

最近傍

第 {{n}} 主成分（{{variance}}）

第 1〜第 3 主成分上のニュース記事の埋め込み（トピック別）

{{doc}} に最も近い記事: {{list}}。

{{doc}}（{{distance}}）

記事をクリックすると最も近い記事を探します。

LiDAR 反射

色分けの基準

高さ

反射強度

ダークテーマ

建物・街路樹・駐車車両がある街路の LiDAR 点群

{{points}} 点。点群にホバーすると反射を読み取れます。

高さ {{height}}、反射強度 {{intensity}}。

{{shell}} {{n}}

ブロードバンド（低軌道）

地球観測（極軌道）

測位（中軌道）

静止軌道

地球

再生

千 km

地球を周回する 4 つの軌道殻の衛星

{{shell}}: 高度 {{altitude}}、速度 {{speed}}、周期 {{period}}。

衛星にホバーすると軌道を表示します。

テクノロジー

ヘルスケア

エネルギー

金融

消費財

{{ticker}} · {{cap}}

正射影ビュー

ボラティリティ

ベータ

年間リターン

ボラティリティ・ベータ・年間リターンで配置した銘柄（大きさは時価総額）

{{ticker}}（{{sector}}）: リターン {{ret}}、ボラティリティ {{volatility}}、ベータ {{beta}}、シャープレシオ {{sharpe}}、時価総額 {{cap}}。

銘柄をクリックすると数値を固定表示します。

## Line3DChart

Support: beta

Native Angular: MnLine3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnLine3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## Scatter3DChart

Support: beta

Native Angular: MnScatter3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatter3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## Example: クラスター

アヤメに似たデータセットの 3 品種を 3 つの特徴で測定：クラスごとに 1 系列で、凡例で切り替えられます。ドラッグで回転、Shift + ドラッグでパン、ダブルクリックでリセット。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatter3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatter3DChart],
  template: `
@let t = labels[language()];
<mn-scatter-3d-chart
  [series]="[
    { name: t.segments[0], data: clouds[0], pointSize: 5 },
    { name: t.segments[1], data: clouds[1], pointSize: 5 },
    { name: t.segments[2], data: clouds[2], pointSize: 5 }
  ]"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  clouds = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  // a cloud of 400 customers around a center (age, income, spending),
  // generated deterministically, as columns
  const cloud = (age: number, income: number, spending: number, seed: number) => {
    const noise = (i: number, k: number) =>
      fraction(Math.sin((i + seed * 1000) * (12.9898 + k)) * 43758.5453) - 0.5;
    return {
      x: Array.from({ length: 400 }, (_, i) => age + noise(i, 0) * 12),
      y: Array.from({ length: 400 }, (_, i) => income + noise(i, 1) * 20),
      z: Array.from({ length: 400 }, (_, i) => spending + noise(i, 2) * 10),
    };
  };
  const CLOUDS = [cloud(22, 18, 9, 1), cloud(40, 62, 24, 2), cloud(70, 35, 15, 3)];
  return CLOUDS;
})();
  labels = {
  "en": {
    "segments": ["Students", "Professionals", "Retirees"],
    "axes": ["Age", "Income (k€)", "Spending (k€)"]
  },
  "zh": {
    "segments": ["学生", "职场人士", "退休人员"],
    "axes": ["年龄", "收入（千欧元）", "消费（千欧元）"]
  },
  "ja": {
    "segments": ["学生", "社会人", "退職者"],
    "axes": ["年齢", "収入（千ユーロ）", "支出（千ユーロ）"]
  },
  "fr": {
    "segments": ["Étudiants", "Actifs", "Retraités"],
    "axes": ["Âge", "Revenu (k€)", "Dépenses (k€)"]
  }
};
}

```

## Example: 3D の軌跡

Line3DChart でローレンツアトラクター（12,000 ステップ）を描き、value 列と colorScale "plasma" で時間ごとに色分けしています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLine3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLine3DChart],
  template: `
@let t = labels[language()];
<mn-line-3d-chart
  [series]="[{ name: t.path, data: path, colorBy: 'z', lineWidth: 3 }]"
  colorScale="turbo"
  [autoRotate]="true"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  path = (() => {
  // a climbing spiral of 600 points, as columns
  const t = Array.from({ length: 600 }, (_, i) => i / 30);
  const PATH = {
    x: t.map((a) => Math.cos(a) * (4 + a / 4)),
    y: t.map((a) => Math.sin(a) * (4 + a / 4)),
    z: t.map((a) => a / 2),
  };
  return PATH;
})();
  labels = {
  "en": {
    "path": "Flight path",
    "axes": ["East (km)", "North (km)", "Altitude (km)"]
  },
  "zh": {
    "path": "飞行轨迹",
    "axes": ["东（公里）", "北（公里）", "高度（公里）"]
  },
  "ja": {
    "path": "飛行経路",
    "axes": ["東（km）", "北（km）", "高度（km）"]
  },
  "fr": {
    "path": "Trajectoire",
    "axes": ["Est (km)", "Nord (km)", "Altitude (km)"]
  }
};
}

```
