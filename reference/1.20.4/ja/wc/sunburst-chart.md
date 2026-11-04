# サンバースト図

階層を同心円のリングで描きます：リングが階層、扇形が親に対する割合です。親をクリック（または Enter）するとズームインし、中心をクリック（または Backspace）すると 1 つ上に戻ります。切り替え時は角度とリングがアニメーションします。扇形にホバーすると祖先と子孫が強調され、ラベルは円弧方向か半径方向のうち収まる方で描かれます。

Package: minerva-design@1.20.4

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Macintosh HD

アプリケーション

書類

プロジェクト

アーカイブ

PDF

スプレッドシート

写真

開発

パッケージキャッシュ

シミュレータ

システム

ミュージック

その他のアプリ

{{value}} GB

フォルダ別のディスク使用量（GB）

{{path}} を表示中。中心をクリックすると戻ります。

フォルダをクリックするとズームインします。

エンジニアリング

プラットフォーム

インフラ

セキュリティ

開発者ツール

プロダクト開発

Web

モバイル

決済

データ

分析

機械学習

営業

EMEA

米州

アジア太平洋

カスタマーサクセス

サポート

オンボーディング

マーケティング

ブランド

グロース

コンテンツ

管理

経理

人事

法務

情報システム

{{value}} 人

部門・グループ・チームごとの人数

すべての商品

家電・デジタル

スマートフォン

ハイエンド

ミドルレンジ

アクセサリ

ノートパソコン

オーディオ

ヘッドホン

スピーカー

ホーム

キッチン

家具

インテリア小物

ファッション

メンズ

レディース

キッズ

スポーツ

アウトドア

フィットネス

カテゴリのパス

商品カテゴリ別の四半期売上

アジア

アフリカ

ヨーロッパ

南北アメリカ

オセアニア

その他の国

{{value}} 百万人

ラベルの方式

自動

円弧方向

半径方向

なし

大陸・国別の世界人口（百万人）

教育

保健医療

交通

治安・防災

環境

行政

学校

大学

図書館

病院

予防

公共交通

道路

自転車道

警察

消防

公園

ごみ収集

水道

{{path}}：{{amount}}（予算の {{share}}、{{area}}の {{areaShare}}）。

{{path}}：{{amount}}（予算の {{share}}）。

政策分野・事業別の市の年間予算

年間予算：{{total}}。セクターをクリックすると割合を表示します。

ベーカリーチェーン

歯科医院

語学学校

社内

ウェブサイト

ブランディング

予約システム

モバイルアプリ

事務

研修

デザイン

開発

会議

レビュー

サポート

学習

期間

今週

今月

{{hours}} · 記録時間の {{share}}

クライアント・プロジェクト・作業別の記録時間（{{period}}）

請求可能：{{total}} 中 {{billable}}（{{share}}）。

購入手続き

検索

アカウント

カタログ

カート

決済

配送

検索クエリ

候補表示

ログイン

プロフィール

商品ページ

レビュー

{{value}} 件/分

サービス・エンドポイント別の毎分 API リクエスト数（ライブ更新）

一時停止

再開

合計：{{value}}

最も負荷の高いサービス：{{service}}

再生可能エネルギー

原子力

化石燃料

風力

太陽光

水力

バイオマス

天然ガス

石炭

石油

{{value}} TWh

化石燃料を非表示

電源・燃料別の年間発電量

再生可能エネルギーは非表示：{{total}} を表示中。

再生可能エネルギー：表示中の {{total}} の {{share}}。

## SunburstChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/sunburst-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "noDrill",
    "typeText": "boolean",
    "attribute": "no-drill",
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
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<SunburstChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-drill",
    "typeText": "CustomEvent",
    "description": "A parent or the center was clicked (or `drill()` called); detail: { path }"
  },
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

## Example: ディスク使用量

内側のリングがフォルダ、外側がその中身です。フォルダをクリックで拡大、中央で戻ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/wc/disk-usage.html

```html
<minerva-sunburst-chart id="disk"></minerva-sunburst-chart>

```

### apps/docs/src/docs/pages/sunburst-chart/wc/disk-usage.ts

```tsx
// Disk usage as rings: folders inside, their content outside; click a
// folder to zoom into it, the center to go back up.
import type { MinervaSunburstChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    folders: ["Documents", "Photos", "Music", "Apps"],
    files: [
      "Work",
      "Taxes",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Tools",
      "Games",
    ],
  },
  zh: {
    folders: ["文档", "照片", "音乐", "应用"],
    files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
  },
  ja: {
    folders: ["書類", "写真", "ミュージック", "アプリ"],
    files: [
      "仕事",
      "税金",
      "2025",
      "2026",
      "アルバム",
      "ポッドキャスト",
      "ツール",
      "ゲーム",
    ],
  },
  fr: {
    folders: ["Documents", "Photos", "Musique", "Applications"],
    files: [
      "Travail",
      "Impôts",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Outils",
      "Jeux",
    ],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSunburstChart>("#disk")!;
  chart.data = [
    {
      name: text.folders[0],
      children: [
        { name: text.files[0], value: 12 },
        { name: text.files[1], value: 3 },
      ],
    },
    {
      name: text.folders[1],
      children: [
        { name: text.files[2], value: 46 },
        { name: text.files[3], value: 21 },
      ],
    },
    {
      name: text.folders[2],
      children: [
        { name: text.files[4], value: 18 },
        { name: text.files[5], value: 7 },
      ],
    },
    {
      name: text.folders[3],
      children: [
        { name: text.files[6], value: 9 },
        { name: text.files[7], value: 32 },
      ],
    },
  ];
  chart.options = { format: (value) => `${value} GB` };
}

```

## Example: ドリルダウンのパンくず

drill イベントでルートから注目ノードまでのパスを受け取り、チャートの外にパンくずを表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/wc/drill-down.html

```html
<div style="display: grid; gap: 8px">
  <minerva-sunburst-chart id="org" inner-radius="0.32"></minerva-sunburst-chart>
  <output id="path" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/sunburst-chart/wc/drill-down.ts

```tsx
// minerva-drill reports the path from the root to the focused node:
// a breadcrumb outside of the chart.
import type {
  MinervaSunburstChart,
  ShapeDrillEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSunburstChart>("#org")!;
  const path = root.querySelector<HTMLOutputElement>("#path")!;
  chart.data = [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
  path.textContent = `${text.root} · ${text.hint}`;
  const onDrill = (event: Event) => {
    const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
    path.textContent = [text.root, ...names].join(" › ");
  };
  chart.addEventListener("minerva-drill", onDrill);
  return () => chart.removeEventListener("minerva-drill", onDrill);
}

```
