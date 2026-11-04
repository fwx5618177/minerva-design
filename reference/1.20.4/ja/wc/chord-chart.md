# コードダイアグラム

円周上に並べたグループ間のフローを表します。各グループはフローの量に応じた長さの弧、各フローは 2 つの弧を結ぶリボンです。無向の場合、リボンはグループの組を結び、幅は両方向のフローの合計です（対称行列では各関係を 1 回だけ数えます）。そのため流入だけのグループにも弧があります。有向の場合は方向ごとに矢印付きのリボンを描きます。グループにホバーするとそのリボンを強調し、リボンにホバーすると双方向の値を表示します。凡例でグループを表示 / 非表示にでき、矢印キーでグループ、続いてリボンを順に移動します。

Package: minerva-design@1.20.4

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/chord-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "directed",
    "typeText": "boolean",
    "attribute": "directed",
    "required": false
  },
  {
    "name": "ribbonColor",
    "typeText": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
    "attribute": "ribbon-color",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "required": false
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false
  },
  {
    "name": "tickFormat",
    "typeText": "(value: number) => string | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<ChordChartOptions, \"type\">> | undefined",
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

## Example: 双方向の有向フロー

地域間の移動をリンクのリストで表し、方向ごとに矢印付きのリボンを描きます。ホバーイベントはリボンの両方向（value と reverseValue）を返します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/wc/migration.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-chord-chart
    id="migration"
    directed
    ribbon-color="source"
  ></minerva-chord-chart>
  <output id="flow" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/chord-chart/wc/migration.ts

```tsx
// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; minerva-hover reads both directions of a
// ribbon (`value` and `reverseValue`).
import type {
  MinervaChordChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    regions: ["North", "South", "East", "West", "Center"],
    hint: "Hover a ribbon to compare both directions",
    flow: "{source} → {target}: {value}k · back: {reverse}k",
    group: "{name}: {value}k",
  },
  zh: {
    regions: ["北部", "南部", "东部", "西部", "中部"],
    hint: "悬停在流带上以比较两个方向",
    flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    group: "{name}：{value} 千人",
  },
  ja: {
    regions: ["北部", "南部", "東部", "西部", "中部"],
    hint: "リボンにカーソルを合わせると両方向を比較できます",
    flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    group: "{name}: {value} 千人",
  },
  fr: {
    regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
    hint: "Survolez un ruban pour comparer les deux sens",
    flow: "{source} → {target} : {value} k · retour : {reverse} k",
    group: "{name} : {value} k",
  },
};
// from, to (indexes in TEXT.regions), thousands of people
const MOVES = [
  [0, 1, 32],
  [1, 0, 18],
  [0, 4, 45],
  [4, 0, 22],
  [1, 4, 38],
  [4, 1, 30],
  [2, 4, 51],
  [4, 2, 26],
  [3, 4, 29],
  [4, 3, 35],
  [2, 3, 14],
  [3, 2, 21],
  [1, 2, 12],
  [2, 1, 9],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaChordChart>("#migration")!;
  const output = root.querySelector<HTMLOutputElement>("#flow")!;
  chart.groups = text.regions;
  chart.links = MOVES.map(([from, to, value]) => ({
    source: from,
    target: to,
    value,
  }));
  output.textContent = text.hint;
  const onHover = (event: Event) => {
    const hovered = (event as CustomEvent<ShapeHoverEvent | null>).detail;
    if (!hovered) output.textContent = text.hint;
    else if (hovered.source === undefined)
      output.textContent = text.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    else
      output.textContent = text.flow
        .replace("{source}", hovered.source)
        .replace("{target}", hovered.target ?? "")
        .replace("{value}", String(hovered.value))
        .replace("{reverse}", String(hovered.reverseValue ?? 0));
  };
  chart.addEventListener("minerva-hover", onHover);
  return () => chart.removeEventListener("minerva-hover", onHover);
}

```

## Example: チーム間のメッセージ

1 週間に送られたメッセージの正方行列（行：送信者、列：受信者）。チームにカーソルを合わせるとそのリボンが強調表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/wc/teams.html

```html
<minerva-chord-chart id="teams"></minerva-chord-chart>

```

### apps/docs/src/docs/pages/chord-chart/wc/teams.ts

```tsx
// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import type { MinervaChordChart } from "minerva-design/web-components/chart";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export function setup(root: HTMLElement) {
  const chart = root.querySelector<MinervaChordChart>("#teams")!;
  chart.groups =
    TEAMS[document.documentElement.lang as keyof typeof TEAMS] ?? TEAMS.en;
  chart.matrix = MATRIX;
}

```
