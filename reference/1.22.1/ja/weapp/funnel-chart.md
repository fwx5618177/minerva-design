# ファネルチャート

途中で数が減っていくプロセスの各段階（登録、営業パイプライン、購入手続き）を、段階ごとのコンバージョン率とともに示します。ホバーまたは矢印キーでステージをハイライトし、凡例の項目をクリックすると非表示にできます。

Package: minerva-design@1.22.1

Renderer: weapp

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

料金ページ

登録開始

メール確認

プロジェクト作成

メンバー招待

有料プランへ移行

{{users}} 人

訪問者の {{share}}

「{{stage}}」から {{users}} 人が離脱

登録ファネル

アラート

ダッシュボード

連携

レポート

公開 API

並び順

降順

昇順

データの順

週 {{users}} 人

機能別の週間アクティブユーザー

訪問

商品ページ

カート追加

購入手続き

支払い

注文完了

段階

訪問者

離脱率

最初の段階の {{share}}

ネットショップの購入ファネル

段階間の離脱率

応募

書類選考

技術面接

最終面接

内定

入社

{{candidates}} 人

この段階の標準的な所要時間：{{days}}

エンジニア職の採用パイプライン

{{stage}}：{{candidates}} 人（応募者の {{share}}）

応募者の {{rate}} が採用され、平均 {{days}} かかります

デスクトップ

モバイル

コンバージョン率 {{rate}}

{{device}}の購入ファネル

インプレッション

クリック

リード

有望リード

顧客

すべてのチャネル

検索広告

ソーシャルメディア

メール

パートナー

チャネル

前ステージの {{share}}

成果あたりのコスト：{{cost}}

今月のマーケティングファネル：{{channel}}

費用：{{spend}} · 顧客：{{customers}} · 獲得コスト：1 顧客あたり {{cac}}

訪問

カート追加

購入手続き

支払い済み注文

転換率から計算した月間の購入ファネル

{{from}} → {{to}}

{{step}} の転換率を下げる

{{step}} の転換率を上げる

現在の転換率に戻す

月 {{orders}} 件の注文（{{ordersDelta}}）· 売上 {{revenue}}（{{revenueDelta}}）

訪問者

商品を閲覧

カート追加

購入手続き

注文

ライブ更新されるタイムセールのファネル

一時停止

再開

最初から

{{time}} · 注文 {{orders}} 件 · 訪問者の {{rate}}

セールは終了しました：注文 {{orders}} 件。

リード

見込み確定

デモ

提案

交渉

{{deals}} 件 · {{amount}}

受注確率：{{share}}

パイプラインのステージ別オープン案件の金額

{{stage}}：オープン案件 {{deals}} 件

加重予測：{{amount}}

ステージをクリックすると案件を一覧表示します。

## FunnelChart

Support: beta

Funnel chart: trapezoid or bar stages, sort, gap, conversion rates, legend toggles. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/funnel-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "sort",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "conversion",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
