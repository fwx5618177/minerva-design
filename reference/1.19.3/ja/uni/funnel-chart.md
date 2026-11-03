# ファネルチャート

途中で数が減っていくプロセスの各段階（登録、営業パイプライン、購入手続き）を、段階ごとのコンバージョン率とともに示します。ホバーまたは矢印キーでステージをハイライトし、凡例の項目をクリックすると非表示にできます。

Package: minerva-design@1.19.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "FunnelChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "conversion",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "sort",
    "typeText": "\"none\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"bar\" | \"trapezoid\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
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
