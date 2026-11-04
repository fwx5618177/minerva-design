# コードダイアグラム

円周上に並べたグループ間のフローを表します。各グループはフローの量に応じた長さの弧、各フローは 2 つの弧を結ぶリボンです。無向の場合、リボンはグループの組を結び、幅は両方向のフローの合計です（対称行列では各関係を 1 回だけ数えます）。そのため流入だけのグループにも弧があります。有向の場合は方向ごとに矢印付きのリボンを描きます。グループにホバーするとそのリボンを強調し、リボンにホバーすると双方向の値を表示します。凡例でグループを表示 / 非表示にでき、矢印キーでグループ、続いてリボンを順に移動します。

Package: minerva-design@1.20.3

Renderer: weapp

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

デザイン

開発

プロダクト

マーケティング

4 つのチームが 1 週間にやり取りしたメッセージ数

北米

中南米

ヨーロッパ

アフリカ

西アジア

南アジア

東アジア

オセアニア

{{value}} 百万人

5 年間の世界の地域間の人口移動

app

router

store

ui-kit

api-client

auth

i18n

utils

コードベースのモジュール間の import

アメリカ

中国

EU

メキシコ

カナダ

日本

韓国

主要経済圏の 1 年間の財貿易

ホーム

検索

カテゴリ

商品

カート

購入手続き

{{value}} 千回

ページまたはリボンにホバーしてください

{{source}} → {{target}}：{{value}}（逆方向：{{reverse}}）

{{name}}：流入と流出の合計 {{value}}

ショッピングアプリの 1 日のページ間遷移

米国東部

米国西部

欧州中部

アジア太平洋（南東）

アジア太平洋（北東）

南米

{{value}} Gbit/s

データセンター間のレプリケーション通信量

ラベル

自動

接線方向

半径方向

なし

グループの順序

データ順

大きい順

小さい順

リボンの色

グラデーション

ソース

ターゲット

ニュートラル

有向

目盛り

その他の事業者

年

{{year}} 年

{{name}} {{value}}

最も多く契約者を獲得したのは {{name}} です（純増 {{value}}）。純増減：{{list}}。

{{year}} 年の携帯電話事業者間の契約者の移動

物理学

化学

生物学

医学

情報科学

数学

経済学

工学

学部をクリックすると共同研究に注目し、リボンをクリックするとその組み合わせを表示します

{{name}}：共著論文 {{total}} 本、主な共同研究先は {{partners}}

{{name}}（{{value}}）

{{a}}と{{b}}：共著論文 {{value}} 本

クリア

大学の学部間で 5 年間に共著された論文

コーヒー

牛乳

パン

菓子パン

果物

シリアル

ヨーグルト

ジュース

{{a}} + {{b}}

{{value}} 件のバスケットで同時購入（全バスケットの {{share}}）

他カテゴリとの組み合わせ {{value}} 件

1 か月間に同じ買い物かごで一緒に購入された商品カテゴリ

ゲートウェイ

ユーザー

注文

在庫

決済

通知

{{value}} 回/秒

合計：{{total}}。最多：{{from}} → {{to}}（{{value}}）

一時停止

再開

マイクロサービス間の秒間呼び出し数のライブ表示

ロンドン

パリ

フランクフルト

イスタンブール

ドバイ

シンガポール

東京

ニューヨーク

{{value}} 百万人

すべてのハブを表示

東側のハブ

西側のハブ

路線を表示するには 2 つ以上のハブを表示してください

{{total}} ハブ中 {{shown}} を表示：{{routes}} 路線、年間 {{passengers}}

主要空港ハブ間の年間旅客数

## ChordChart

Support: beta

Chord diagram: group arcs and ribbons from a matrix or links, directed flows with arrows, sorting, ribbon colors, value ticks (configure({ tickFormat })), legend toggles. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/chord-chart/index",
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
    "name": "groups",
    "typeText": "array",
    "required": false
  },
  {
    "name": "matrix",
    "typeText": "array",
    "required": false
  },
  {
    "name": "links",
    "typeText": "array",
    "required": false
  },
  {
    "name": "directed",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "arrows",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sortGroups",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "sortSubgroups",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ribbonColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ribbonOpacity",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "arcWidth",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ticks",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
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
