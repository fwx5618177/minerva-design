# ツリーマップ

値に比例した面積の入れ子の長方形で階層データを表し、どこが最も大きいかをひと目で示します（ディスク使用量、予算、ポートフォリオ）。ホバーまたは矢印キーでセルをハイライトすると、ツールチップにそのパスが表示されます。

Package: minerva-design@1.22.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

メディア

ビデオ

写真

ミュージック

アプリケーション

プロジェクト

システム

ライブラリ

キャッシュ

ログ

ダウンロード

インストーラー

アーカイブ

フォルダー別のディスク使用量

{{path}}：{{size}}（ディスクの {{share}}）

セルをクリックすると場所を表示します

エンジニアリング

営業

マーケティング

カスタマーサクセス

オペレーション

経理

人事

法務

部門別の年間予算

テクノロジー

金融

ヘルスケア

エネルギー

消費財

時価総額：{{value}}

セクター別・当日の騰落率で色分けした株式マーケットマップ

バンドルの {{share}}

モジュール別の JavaScript バンドルサイズ

合計 {{size}}。100 KB を超える依存関係：{{modules}}。

家電

ホーム

ファッション

スポーツ

スマートフォン

ノート PC

オーディオ

キッチン

家具

インテリア雑貨

レディース

メンズ

キッズ

アウトドア

フィットネス

カタログのパス

すべてのカテゴリ

カテゴリ・サブカテゴリ・ブランド別の四半期売上

サブカテゴリ・ブランド別の{{category}}の売上

{{path}}：{{revenue}}（カテゴリの {{share}}）。

カテゴリをクリックすると開きます。

ブランドをクリックすると売上を表示します。

コンピューティング

データベース

ストレージ

ネットワーク

オブザーバビリティ

請求の {{share}}

サービス・リソース別の月間クラウドコスト

表示中：{{visible}}（請求額 {{total}} の {{share}}）。

月間請求額：{{total}}。

すべて表示

ライブ更新

{{used}} / {{limit}}（{{share}}）

名前空間別のクラスタ Pod のメモリ使用量

メモリ上限の {{threshold}} を超えた Pod：{{pods}}

すべての Pod がメモリ上限の {{threshold}} 未満です。

ヨーロッパ

南北アメリカ

アジア太平洋

指標

売上

注文数

利益

合計の {{share}}（{{metric}}）

地域・国別の年間販売：{{metric}}

## TreemapChart

Support: beta

Native Angular: MnTreemapChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTreemapChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly TreemapNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "headers",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Nested nodes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTreemapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreemapChart],
  template: `
@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t.media, children: [
      { name: t.photos, value: 48 },
      { name: t.videos, value: 96 },
      { name: t.music, value: 22 }
    ] },
    { name: t.documents, children: [
      { name: t.work, value: 31 },
      { name: t.personal, value: 12 }
    ] },
    { name: t.apps, children: [
      { name: t.tools, value: 40 },
      { name: t.games, value: 64 }
    ] }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "media": "Media",
    "documents": "Documents",
    "apps": "Apps",
    "photos": "Photos",
    "videos": "Videos",
    "music": "Music",
    "work": "Work",
    "personal": "Personal",
    "tools": "Tools",
    "games": "Games"
  },
  "zh": {
    "media": "媒体",
    "documents": "文档",
    "apps": "应用",
    "photos": "照片",
    "videos": "视频",
    "music": "音乐",
    "work": "工作",
    "personal": "个人",
    "tools": "工具",
    "games": "游戏"
  },
  "ja": {
    "media": "メディア",
    "documents": "書類",
    "apps": "アプリ",
    "photos": "写真",
    "videos": "動画",
    "music": "音楽",
    "work": "仕事",
    "personal": "個人",
    "tools": "ツール",
    "games": "ゲーム"
  },
  "fr": {
    "media": "Médias",
    "documents": "Documents",
    "apps": "Applications",
    "photos": "Photos",
    "videos": "Vidéos",
    "music": "Musique",
    "work": "Travail",
    "personal": "Personnel",
    "tools": "Outils",
    "games": "Jeux"
  }
};
}

```

## Example: フラット

子がない場合はすべてのノードがリーフになります。gap でセル間の余白を広げています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTreemapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreemapChart],
  template: `
@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t[0], value: 4750 },
    { name: t[1], value: 745 },
    { name: t[2], value: 600 },
    { name: t[3], value: 440 },
    { name: t[4], value: 1460 },
    { name: t[5], value: 46 }
  ]"
  [gap]="4"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  "zh": ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  "ja": ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  "fr": ["Asie", "Europe", "Amérique du Nord", "Amérique du Sud", "Afrique", "Océanie"]
};
}

```
