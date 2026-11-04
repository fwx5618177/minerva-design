# サンバースト図

階層を同心円のリングで描きます：リングが階層、扇形が親に対する割合です。親をクリック（または Enter）するとズームインし、中心をクリック（または Backspace）すると 1 つ上に戻ります。切り替え時は角度とリングがアニメーションします。扇形にホバーすると祖先と子孫が強調され、ラベルは円弧方向か半径方向のうち収まる方で描かれます。

Package: minerva-design@1.20.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnSunburstChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSunburstChart"
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
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillDown",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

### events

```json
[
  {
    "name": "drillChange",
    "typeText": "ShapeDrillEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ディスク使用量

ノートパソコンのフォルダとアプリの使用量（GB）。フォルダをクリックするとズームインし、中心をクリックすると戻ります。onDrill はフォーカス中のパスを返し、チャートの下に表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.folders[0], children: [{ name: t.files[0], value: 12 }, { name: t.files[1], value: 3 }] },
    { name: t.folders[1], children: [{ name: t.files[2], value: 46 }, { name: t.files[3], value: 21 }] },
    { name: t.folders[2], children: [{ name: t.files[4], value: 18 }, { name: t.files[5], value: 7 }] },
    { name: t.folders[3], children: [{ name: t.files[6], value: 9 }, { name: t.files[7], value: 32 }] }
  ]"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "folders": ["Documents", "Photos", "Music", "Apps"],
    "files": ["Work", "Taxes", "2025", "2026", "Albums", "Podcasts", "Tools", "Games"]
  },
  "zh": {
    "folders": ["文档", "照片", "音乐", "应用"],
    "files": ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"]
  },
  "ja": {
    "folders": ["書類", "写真", "ミュージック", "アプリ"],
    "files": ["仕事", "税金", "2025", "2026", "アルバム", "ポッドキャスト", "ツール", "ゲーム"]
  },
  "fr": {
    "folders": ["Documents", "Photos", "Musique", "Applications"],
    "files": ["Travail", "Impôts", "2025", "2026", "Albums", "Podcasts", "Outils", "Jeux"]
  }
};
}

```

## Example: パンくずリスト付きの制御されたドリルダウン

drillPath でフォーカスを制御します：クリックは onDrill を呼ぶだけで、パスはパンくずリストが管理するため、任意の階層へ移動できます。cornerRadius と padAngle で扇形を丸め、間隔をあけます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.teams[0], children: [{ name: t.groups[0], value: 18 }, { name: t.groups[1], value: 11 }, { name: t.groups[2], value: 14 }] },
    { name: t.teams[1], children: [{ name: t.groups[3], value: 16 }, { name: t.groups[4], value: 12 }] },
    { name: t.teams[2], children: [{ name: t.groups[5], value: 20 }, { name: t.groups[6], value: 8 }] }
  ]"
  [innerRadius]="0.32"
  (drillChange)="path = $event.path"
/>
<output aria-live="polite">{{ t.root }}@for (name of path; track $index) { › {{ name }} }</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  path: string[] = [];
  labels = {
  "en": {
    "root": "Company",
    "teams": ["Engineering", "Sales", "Support"],
    "groups": ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    "hint": "Click a team"
  },
  "zh": {
    "root": "公司",
    "teams": ["研发", "销售", "客服"],
    "groups": ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    "hint": "点击一个团队"
  },
  "ja": {
    "root": "会社",
    "teams": ["エンジニアリング", "営業", "サポート"],
    "groups": ["Web", "モバイル", "プラットフォーム", "ヨーロッパ", "アジア", "一次対応", "二次対応"],
    "hint": "チームをクリックします"
  },
  "fr": {
    "root": "Entreprise",
    "teams": ["Ingénierie", "Ventes", "Support"],
    "groups": ["Web", "Mobile", "Plateforme", "Europe", "Asie", "Niveau 1", "Niveau 2"],
    "hint": "Cliquez sur une équipe"
  }
};
}

```
