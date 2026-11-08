# ツリーマップ

値に比例した面積の入れ子の長方形で階層データを表し、どこが最も大きいかをひと目で示します（ディスク使用量、予算、ポートフォリオ）。ホバーまたは矢印キーでセルをハイライトすると、ツールチップにそのパスが表示されます。

Package: minerva-design@1.23.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/treemap-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "gap",
    "typeText": "number",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "hideHeaders",
    "typeText": "boolean",
    "attribute": "hide-headers",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly TreemapNode[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<TreemapChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: フラットなリスト

地域ごとに 1 つの長方形で、面積は人口に比例します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/wc/flat.html

```html
<minerva-treemap-chart
  id="markets"
  gap="4"
  height="300"
></minerva-treemap-chart>

```

### apps/docs/src/docs/pages/treemap-chart/wc/flat.ts

```tsx
// A flat list: one rectangle per node, its area proportional to the value.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

export function setup(root: HTMLElement) {
  const regions =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreemapChart>("#markets")!;
  chart.data = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: regions[i],
    value,
  }));
  chart.options = { format: (millions) => `${millions}M` };
}

```

## Example: 入れ子のノード

フォルダー別のディスク使用量。親ノードは子ノードを合計し、その上に名前を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/wc/nested.html

```html
<minerva-treemap-chart id="disk" height="320"></minerva-treemap-chart>

```

### apps/docs/src/docs/pages/treemap-chart/wc/nested.ts

```tsx
// Parents sum their children and draw their name above them.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    media: "Media",
    documents: "Documents",
    apps: "Apps",
    photos: "Photos",
    videos: "Videos",
    music: "Music",
    work: "Work",
    personal: "Personal",
    tools: "Tools",
    games: "Games",
  },
  zh: {
    media: "媒体",
    documents: "文档",
    apps: "应用",
    photos: "照片",
    videos: "视频",
    music: "音乐",
    work: "工作",
    personal: "个人",
    tools: "工具",
    games: "游戏",
  },
  ja: {
    media: "メディア",
    documents: "書類",
    apps: "アプリ",
    photos: "写真",
    videos: "動画",
    music: "音楽",
    work: "仕事",
    personal: "個人",
    tools: "ツール",
    games: "ゲーム",
  },
  fr: {
    media: "Médias",
    documents: "Documents",
    apps: "Applications",
    photos: "Photos",
    videos: "Vidéos",
    music: "Musique",
    work: "Travail",
    personal: "Personnel",
    tools: "Outils",
    games: "Jeux",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreemapChart>("#disk")!;
  chart.data = [
    {
      name: text.media,
      children: [
        { name: text.photos, value: 48 },
        { name: text.videos, value: 96 },
        { name: text.music, value: 22 },
      ],
    },
    {
      name: text.documents,
      children: [
        { name: text.work, value: 31 },
        { name: text.personal, value: 12 },
      ],
    },
    {
      name: text.apps,
      children: [
        { name: text.tools, value: 40 },
        { name: text.games, value: 64 },
      ],
    },
  ];
  chart.options = { format: (gb) => `${gb} GB` };
}

```
