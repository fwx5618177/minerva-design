# ブレットグラフ

コンパクトな KPI バー（Stephen Few）：各行は実績をバーで示し、背後に定性的な範囲（悪いほど濃いグレー）、目標をマーカーで示します。行ごとに独自の目盛りを持ちます。行ごとに単位が異なってもよいため、ダッシュボードで多くの KPI を小さなスペースに収められます。行にホバーするか矢印キーで、値・目標・範囲を確認できます。

Package: minerva-design@1.22.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "BulletChart"
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
    "name": "ticks",
    "typeText": "boolean | undefined",
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
    "typeText": "readonly BulletDatum[]",
    "required": true
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\" | undefined",
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
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "rangeColors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "barSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
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
