# ブレットグラフ

コンパクトな KPI バー（Stephen Few）：各行は実績をバーで示し、背後に定性的な範囲（悪いほど濃いグレー）、目標をマーカーで示します。行ごとに独自の目盛りを持ちます。行ごとに単位が異なってもよいため、ダッシュボードで多くの KPI を小さなスペースに収められます。行にホバーするか矢印キーで、値・目標・範囲を確認できます。

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

売上

千米ドル

利益率

売上に対する %

平均注文額

米ドル

新規顧客

人数

満足度

5 点満点

悪い

普通

良い

違反

要注意

正常

今四半期累計の営業 KPI と目標の比較

決済

検索

モバイル

プラットフォーム

グロース

データ

各チームが達成したストーリーポイントとコミットの比較

可用性

リクエストの %

Apdex

スコア（0–1）

スループット

リクエスト / 秒

エラーバジェット

残り %

今月の API のサービスレベル目標

訪問者

千人

登録

アカウント数

アクティベーション

登録に対する %

MRR

千米ドル

月

選択した月のグロース KPI と目標の比較

契約後 30 日以内にオンボーディングを完了した法人顧客の割合

新規アカウントの %

1 営業時間以内に初回回答した優先サポートチケットの割合

チケットの %

顧客に影響する障害を起こさなかった本番デプロイの割合

デプロイの %

年間サブスクリプション契約の売上維持率（拡張・解約を含む）

比率

長い名前の運用 KPI と目標の比較

マーケティング

エンジニアリング

営業

人事

総務・施設

出張

年間予算：{{budget}}

余裕あり

ぎりぎり

計画超過

{{over}} 部門が計画より速く支出しています。行をクリックすると差額を表示します。

{{department}}は計画超過：第 3 四半期末で {{variance}}、年間予算の {{share}} を使用、残り {{left}}。

{{department}}は計画内：第 3 四半期末で {{variance}}、年間予算の {{share}} を使用、残り {{left}}。

第 3 四半期末の部門別支出とその時点の計画予算

吸気温度

湿度

消費電力

ファン回転数

°C

相対湿度 %

ラックあたり kW

最大回転数の %

正常

警告

危険

ライブ読み取り

サーバールームのセンサー値と設定値・しきい値

要確認：{{sensors}}

すべてのセンサーが範囲内です。

週間走行距離

ロング走

獲得標高

練習回数

睡眠

計画：{{plan}}

計画未満

計画どおり

計画以上

ランナー

アマラ

ルーカス

メイ

{{value}}（計画 {{plan}}、{{share}}）

{{runner}} の週間トレーニングと計画

{{runner}} は週間目標 {{metrics}} 項目中 {{met}} 項目を達成しました。

エンジニアリング

営業

サポート

マーケティング

プロダクト

財務

今年の計画 {{plan}} 人

遅れ

追い上げ中

順調

並び順

計画順

遅れの大きい順

進みの大きい順

チーム別の採用数と年間人員計画

表示中の {{teams}} チームで計画 {{planned}} 人中 {{hired}} 人を採用（{{share}}）。

表示中のチームはありません。

## BulletChart

Support: beta

Native Angular: MnBulletChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBulletChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly BulletDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeColors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: KPIs against targets

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let t = labels[language()];
<mn-bullet-chart
  [data]="[
    { name: t.kpis[0], value: 270, target: 250, ranges: [150, 225, 300] },
    { name: t.kpis[1], value: 22.5, target: 26, ranges: [20, 25, 30] },
    { name: t.kpis[2], value: 1650, target: 2100, ranges: [1000, 2000, 2500] },
    { name: t.kpis[3], value: 4.4, target: 4.5, ranges: [3.5, 4.25, 5] }
  ]"
  [rangeLabels]="t.ranges"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "kpis": ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    "ranges": ["Poor", "Fair", "Good"]
  },
  "zh": {
    "kpis": ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    "ranges": ["差", "一般", "良好"]
  },
  "ja": {
    "kpis": ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    "ranges": ["不良", "普通", "良好"]
  },
  "fr": {
    "kpis": ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    "ranges": ["Faible", "Correct", "Bon"]
  }
};
}

```

## Example: 縦向き

orientation="vertical" で行を列にします。ここでは各チームが達成したストーリーポイントとコミットを比べます。チャートの ranges で全列に共通の範囲を指定し、barSize でバーを太くします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let q = quarters[language()];
<mn-bullet-chart
  [data]="[
    { name: q[0], value: 82, target: 90 },
    { name: q[1], value: 95, target: 90 },
    { name: q[2], value: 71, target: 100 },
    { name: q[3], value: 104, target: 100 }
  ]"
  orientation="vertical"
  [ranges]="[60, 90, 120]"
  targetColor="var(--danger-color, #dc2626)"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  quarters = {
  "en": ["Q1", "Q2", "Q3", "Q4"],
  "zh": ["第一季度", "第二季度", "第三季度", "第四季度"],
  "ja": ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  "fr": ["T1", "T2", "T3", "T4"]
};
}

```
