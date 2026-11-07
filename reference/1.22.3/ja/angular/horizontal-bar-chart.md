# 横棒グラフ

カテゴリを左側に並べ、左から伸びる横棒：ランキング、長い名前、発散型アンケート、進捗に最適です。

Package: minerva-design@1.22.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

開発者

各プログラミング言語を使う開発者の割合

ここでのキャリアパスが見える

仕事量は適切だ

必要なツールがそろっている

上司が支えてくれる

給与は公正だ

強く反対

反対

賛成

強く賛成

従業員アンケートの回答（左が反対、右が賛成）

完了

レビュー中

未着手

プラットフォーム

決済

モバイル

グロース

デザイン

各チームのマイルストーン課題の状態

票数

すべてのページとメールでダークモード

モバイル端末でのオフラインモード

グラフ付きレポートの PDF 出力

SAML と OIDC によるシングルサインオン

カレンダーの双方向同期

複数レコードの一括編集

すべてのオブジェクトにカスタム項目

要望の多い機能の票数

予算

実績

開発

マーケティング

営業

サポート

経理

部門ごとの予算と実績

増減

北米

ヨーロッパ

アジア太平洋

中南米

中東

アフリカ

地域ごとの月間アクティブユーザーの増減

ユーザー

メッセージ

写真

マップ

ミュージック

メモ

アプリごとの月間アクティブユーザー

{{app}}：{{users}} 百万ユーザー

棒をタップしてください

売上

販売数

ワイヤレスヘッドホン

スマートウォッチ

Bluetooth スピーカー

メカニカルキーボード

急速充電器

HD ウェブカメラ

ワイヤレスマウス

タブレット

USB-C ケーブル

ノートパソコンスタンド

ランキング基準

表示件数

上位 {{n}} 件

すべての商品

先月の売れ筋商品（多い順）

この {{n}} 商品で全体の {{share}} を占めます。

{{value}} GW

太陽光発電容量

再生

一時停止

もう一度再生

最初に戻る

{{year}} 年末時点で太陽光発電の設備容量が多い国

給与レンジ

ジュニア

ミドル

シニア

スタッフ

プリンシパル

ディレクター

オファー

最低額

中央値

最高額

オファー / 中央値

オファー −{{step}}

オファー +{{step}}

{{offer}} のオファーは {{levels}} のレンジに収まります。

{{offer}} のオファーはどのレンジにも収まりません。

各職位の年間給与レンジ。オファー額を縦線で表示

残りエラーバジェット

リリース凍結

過去 30 日間の各サービスの残りエラーバジェット（悪い順）

SLO {{slo}}、実測の可用性 {{availability}}

許容される {{allowed}} のうち、残りのダウンタイムは {{minutes}} です。

バジェットを {{minutes}} 超過しています。

サービスをクリックするとバジェットを表示します。

## HorizontalBarChart

Support: beta

Native Angular: MnHorizontalBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHorizontalBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Most visited pages

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[{ name: t.views, data: [
    { x: t.pages[0], y: 48200 },
    { x: t.pages[1], y: 31900 },
    { x: t.pages[2], y: 27400 },
    { x: t.pages[3], y: 15800 },
    { x: t.pages[4], y: 9100 },
    { x: t.pages[5], y: 4300 }
  ] }]"
  [xAxis]="{ type: 'category' }"
  labels
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "views": "Page views",
    "pages": ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"]
  },
  "zh": {
    "views": "浏览量",
    "pages": ["首页", "价格", "文档", "博客", "招聘", "联系我们"]
  },
  "ja": {
    "views": "ページビュー",
    "pages": ["ホーム", "料金", "ドキュメント", "ブログ", "採用情報", "お問い合わせ"]
  },
  "fr": {
    "views": "Pages vues",
    "pages": ["Accueil", "Tarifs", "Documentation", "Blog", "Carrières", "Contact"]
  }
};
}

```

## Example: Survey answers, 100 % stacked

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[
    { name: t.answers[0], data: [{ x: t.questions[0], y: 72 }, { x: t.questions[1], y: 58 }, { x: t.questions[2], y: 64 }, { x: t.questions[3], y: 81 }] },
    { name: t.answers[1], data: [{ x: t.questions[0], y: 18 }, { x: t.questions[1], y: 27 }, { x: t.questions[2], y: 21 }, { x: t.questions[3], y: 12 }] },
    { name: t.answers[2], data: [{ x: t.questions[0], y: 10 }, { x: t.questions[1], y: 15 }, { x: t.questions[2], y: 15 }, { x: t.questions[3], y: 7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [palette]="answerColors"
  stacked
  percent
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  answerColors = ["var(--success-color, #16a34a)", "var(--text-secondary-color, #9ca3af)", "var(--danger-color, #dc2626)"];
  labels = {
  "en": {
    "answers": ["Agree", "Neutral", "Disagree"],
    "questions": ["Easy to set up", "Good documentation", "Fast enough", "Would recommend"]
  },
  "zh": {
    "answers": ["同意", "中立", "不同意"],
    "questions": ["易于上手", "文档完善", "速度够快", "愿意推荐"]
  },
  "ja": {
    "answers": ["そう思う", "どちらでもない", "そう思わない"],
    "questions": ["導入が簡単", "ドキュメントが充実", "十分に速い", "人に勧めたい"]
  },
  "fr": {
    "answers": ["D’accord", "Neutre", "Pas d’accord"],
    "questions": ["Facile à installer", "Bonne documentation", "Assez rapide", "Je recommande"]
  }
};
}

```
