# サンキー図

段階間の流れを示します：エネルギー収支、ユーザー動線、予算配分など。ノードは列に並び、リンクの太さは流量に比例します。ノードの並びは反復的な緩和で調整され、流れがまっすぐになり交差が減ります。ノードにホバーするとそのすべての流れが強調され、リンクにホバーすると流出元に対する割合を確認できます。矢印キーでノードとリンクを移動できます。

Package: minerva-design@1.19.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

太陽光

風力

水力

原子力

天然ガス

石炭

石油

電力

地域熱供給

石油製品

家庭

産業

業務

運輸

損失

{{value}} TWh

エネルギー収支：一次エネルギー、エネルギーキャリア、最終用途（テラワット時/年）

検索広告

自然検索

ニュースレター

ソーシャル

トップページ

料金ページ

ブログ

登録フォーム

離脱

トライアル開始

登録中断

有料プラン

トライアル終了

1 週間のセッション：流入チャネルから契約まで

{{source}} → {{target}}：{{value}} セッション（{{source}} の {{share}}%）

{{name}}：{{value}} セッション

ステップや経路をクリック（またはチャートにフォーカスして Enter）すると選択できます

ライセンス

サブスクリプション

サービス

助成金

年間予算

研究開発

営業・マーケティング

運用

管理部門

プラットフォーム

モバイルアプリ

AI 研究

キャンペーン

営業チーム

インフラ

カスタマーサポート

財務・法務

オフィス

年間予算：収益源、部門、プログラム

メール

チャット

電話

チャットボット

一次対応

二次対応

開発チーム

解決

返金

不具合登録

1 か月のサポートチケット：チャネルから結果まで

ノードの配置

両端揃え

左揃え

右揃え

中央

リンクの色

グラデーション

流出元

流入先

ニュートラル

ラベルに値を表示

クラウド

ライセンス

ハードウェア

サービス

売上高

売上原価

売上総利益

研究開発費

販売・マーケティング費

一般管理費

営業利益

法人税等

当期純利益

四半期の損益計算書：売上セグメント、コスト、利益

売上総利益率 {{gross}} ・ 営業利益率 {{operating}} ・ 純利益率 {{net}}

ブラジル

コロンビア

エチオピア

ベトナム

ハンブルク焙煎所

ロッテルダム焙煎所

北倉庫

中央倉庫

南倉庫

カフェ

スーパーマーケット

オンラインショップ

{{value}} t

1 か月に出荷されたコーヒー：産地から焙煎所と倉庫を経て販売チャネルまで

拠点をクリックするとそこを通るすべての流れを追跡し、出荷ルートをクリックするとそのルートを選択します

{{name}}：{{from}} 拠点から {{inbound}} を入荷、{{to}} 拠点へ {{outbound}} を出荷

{{source}} → {{target}}：{{value}}（{{source}} の出荷量の {{share}}）

選択を解除

社員紹介

求人サイト

ビジネス SNS

人材紹介会社

新卒採用

応募

書類選考で不合格

電話面談

電話面談で不合格

面接

面接で不合格

内定

内定辞退

入社

離脱を表示

1 年間の採用ファネル：応募経路から入社まで

応募 {{applied}} 件、採用 {{hired}} 名（{{rate}}）。電話面談を受けた候補者の {{interview}} が面接に進み、内定の {{accepted}} が承諾されています。

Web アプリ

iOS アプリ

Android アプリ

パートナー API

API ゲートウェイ

認証

カタログ

検索

決済

2xx 成功

4xx クライアントエラー

5xx サーバーエラー

{{value}} req/s

合計：{{total}}。

サーバーエラー率：{{rate}}

サーバーエラー率：{{rate}}、決済サービスで障害発生

一時停止

再開

リアルタイム API トラフィック（秒間リクエスト数）：クライアントからサービスとステータスコードまで

PET ボトル・トレー

HDPE 容器

PP カップ・キャップ

LDPE フィルム

その他のポリマー

市場に出た包装材

リサイクル回収

焼却

埋立

自然環境への流出

リサイクル

選別残渣

新しい包装材

低品位製品

{{value}} Mt

{{source}} の {{share}}

包装材全体の {{share}}

1 年間のプラスチック包装材（メガトン）：ポリマー、廃棄経路、リサイクル

## SankeyChart

Support: beta

Native Angular: MnSankeyChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSankeyChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "nodes",
    "typeText": "readonly SankeyNode[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "links",
    "typeText": "readonly SankeyLink[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "nodeWidth",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "nodePadding",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "align",
    "typeText": "\"right\" | \"left\" | \"center\" | \"justify\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "linkColor",
    "typeText": "\"neutral\" | \"gradient\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "linkOpacity",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: エネルギーフロー

国のエネルギー収支における一次エネルギー、エネルギーキャリア、最終用途。ノードごとに色があり、リンクは流出元の色から流入先の色へグラデーションします。format でラベルとツールチップに単位を付けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSankeyChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSankeyChart],
  template: `
@let n = names[language()];
<mn-sankey-chart
  [nodes]="[{ name: n[0] }, { name: n[1] }, { name: n[2] }, { name: n[3] }, { name: n[4] }, { name: n[5] }, { name: n[6] }, { name: n[7] }]"
  [links]="links"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  links = [
  {
    "source": 0,
    "target": 3,
    "value": 32
  },
  {
    "source": 1,
    "target": 3,
    "value": 48
  },
  {
    "source": 2,
    "target": 3,
    "value": 70
  },
  {
    "source": 3,
    "target": 4,
    "value": 52
  },
  {
    "source": 3,
    "target": 5,
    "value": 61
  },
  {
    "source": 3,
    "target": 6,
    "value": 22
  },
  {
    "source": 3,
    "target": 7,
    "value": 15
  }
];
  names = {
  "en": ["Solar", "Wind", "Gas", "Grid", "Homes", "Industry", "Transport", "Losses"],
  "zh": ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  "ja": ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  "fr": ["Solaire", "Éolien", "Gaz", "Réseau", "Foyers", "Industrie", "Transports", "Pertes"]
};
}

```

## Example: ユーザージャーニー

1 週間のセッションがどこから来て、どこで終わるか。align="left" で離脱したユーザーを離脱元のページの隣に置き、linkColor="source" で経路を流入チャネルの色で塗り、onClick でクリックしたノードやリンク（流出元と流入先を含む）を受け取ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSankeyChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSankeyChart],
  template: `
@let s = steps[language()];
<mn-sankey-chart
  [nodes]="[{ name: s[0] }, { name: s[1] }, { name: s[2] }, { name: s[3] }, { name: s[4] }, { name: s[5], color: 'var(--text-secondary-color, #9ca3af)' }]"
  [links]="links"
  align="left"
  linkColor="source"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  links = [
  {
    "source": 0,
    "target": 1,
    "value": 420
  },
  {
    "source": 0,
    "target": 2,
    "value": 310
  },
  {
    "source": 0,
    "target": 5,
    "value": 270
  },
  {
    "source": 1,
    "target": 2,
    "value": 330
  },
  {
    "source": 1,
    "target": 5,
    "value": 90
  },
  {
    "source": 2,
    "target": 3,
    "value": 380
  },
  {
    "source": 2,
    "target": 5,
    "value": 260
  },
  {
    "source": 3,
    "target": 4,
    "value": 240
  },
  {
    "source": 3,
    "target": 5,
    "value": 140
  }
];
  steps = {
  "en": ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  "zh": ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  "ja": ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  "fr": ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"]
};
}

```
