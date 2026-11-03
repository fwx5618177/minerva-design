# ネットワーク図

人物、組織、サービスなどのエンティティとその関係を表すネットワーク図です。ノードは力学モデル（Barnes–Hut 法、大きなグラフは Web Worker で計算）、円形レイアウト、アークダイアグラムで配置され、ノードとエッジは GPU（WebGPU、WebGL2、WebGL、Canvas2D へのフォールバック）で描画されるため、数万ノードでも滑らかに操作できます。ノードにホバーすると隣接ノードを強調し、ドラッグ、凡例でのグループ切り替え、キーボードでの移動ができます。

Package: minerva-design@1.20.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概要

GraphChart はノード、エッジ、任意のグループを受け取ります。グループは色と凡例を決め、ノードの値は円の大きさを、エッジのラベルは関係の種類を表します。

レイアウト：力学モデル（デフォルト。リンク力、多体斥力、重力、衝突、決定的なシード）、円形（グループ順、エッジを中心に束ねる）、アークダイアグラム。dag とツリーのレイアウトも使えます（「依存関係グラフ」「ツリー図」を参照）。各レイアウトは純粋関数としてもエクスポートされ、Worker やミニプログラムで使えます。

描画は他のチャートと同じ GPU バックエンドを使い、WebGPU → WebGL2 → WebGL → Canvas2D の順に自動でフォールバックします。使用中のレンダラーは onRendererChange と data-renderer 属性で分かります。

ラベルは重ならないよう配置されます。縮小時は重要なノードのラベルだけが残り、エッジのラベルは拡大時や強調時に表示されます。

#### 操作とアクセシビリティ

背景をドラッグしてパン、Ctrl / ⌘ + ホイールまたはピンチでズーム、ノードをドラッグして移動（シミュレーションが追従）、クリックで選択（Ctrl / ⌘ + クリックで追加）、背景をダブルクリックで全体表示。隅のボタンでもズームと全体表示ができます。

チャートにフォーカスし、矢印キーでノード間を移動します。Enter で選択、+ と - でズーム、0 で全体表示、Esc で解除。フォーカスしたノードはグループとリンク数とともに読み上げられます。

組み込みテキスト（概要、読み上げ、ツールチップ、ボタン）は英語・中国語・日本語・フランス語に対応し、ページの言語に従います。色はライト / ダークテーマに追従します。

劉備

関羽

張飛

諸葛亮

趙雲

馬超

黄忠

龐統

姜維

劉禅

魏延

法正

曹操

曹丕

司馬懿

夏侯惇

夏侯淵

張遼

許褚

郭嘉

荀彧

典韋

曹植

司馬昭

鄧艾

孫権

孫策

孫堅

周瑜

魯粛

呂蒙

陸遜

甘寧

黄蓋

小喬

大喬

孫尚香

呂布

董卓

貂蝉

袁紹

献帝

王允

蜀漢

魏

呉

群雄と漢王室

義兄弟

仕える

父子

夫婦

兄弟姉妹

宿敵

師弟

義父

同盟

撃破

断金の交わり

『三国志演義』の人物相関図（勢力別）

人物や関係にホバー、クリックで選択。Ctrl / ⌘ + スクロールでズーム。

選択中：{{name}}

{{source}} → {{target}}：{{relation}}

、

メンバー {{id}}

コミュニティ {{n}}

40 のコミュニティからなる 10,000 人の生成ネットワーク

ノード {{nodes}} 個 · リンク {{edges}} 本 · レンダラー：{{renderer}} ·

Web Worker でシミュレーション中…

レイアウト完了（{{seconds}} 秒）

エッジ層

コマース

認証

データ

エッジを中心に束ねる

ドメイン別のマイクロサービス間の呼び出し

システム

関数型

オブジェクト指向

スクリプト

影響

プログラミング言語間の影響関係

力学モデル

円形

アークダイアグラム

レイアウト

人物をクリックすると中央に表示します。

{{name}}：関係 {{links}} 件

レイアウト：{{layout}}

カート

支払い待ち

支払い済み

発送済み

配達済み

返金済み

キャンセル

注文

カートを編集

支払い

支払いを再試行

タイムアウト

キャンセル

支払い取り消し

発送

返金

配送状況の更新

配達

差出人に返送

返品

レビュー

進行中

出荷処理

完了

塗りつぶした矢じり

注文の状態とその間のイベント

正常

低下

重大

p95 {{value}} ms

{{value}} 件/秒

ライブ更新

オンラインストアのサービスマップと各サービスのライブなヘルス状態

サービスをクリックするとメトリクスを表示します。

{{name}}：{{status}} · p95 {{latency}} ms · エラー率 {{errors}} · {{rps}} 件/秒。

正常 {{healthy}}・低下 {{degraded}}・重大 {{critical}} · {{time}} 更新

マリー・キュリー

ピエール・キュリー

アルベルト・アインシュタイン

マックス・プランク

ニールス・ボーア

ヴェルナー・ハイゼンベルク

リーゼ・マイトナー

オットー・ハーン

エミー・ネーター

パリ

ワルシャワ

ウィーン

ベルリン

チューリッヒ

コペンハーゲン

ソルボンヌ大学

カイザー・ヴィルヘルム協会

チューリッヒ工科大学

ニールス・ボーア研究所

放射能

相対性理論

量子論

不確定性原理

核分裂

ネーターの定理

出身地

所属

出身校

配偶者

貢献

所在地

影響を与えた

一部

共同研究者

関連

人物

場所

機関

理論

人物・場所・理論を検索…

ナレッジグラフを検索

一致するエンティティはありません。

物理学者と、関連する場所・機関・発見のナレッジグラフ

エンティティを検索するかノードをクリックすると、グラフにある事実を一覧表示します。

{{name}}：事実 {{total}} 件 — {{facts}}

→ {{name}}（{{relation}}）

← {{name}}（{{relation}}）

大学の友人

同僚

クライミングクラブ

読書会

4 つのグループに属する 24 人の友達関係

{{name}} さんの知り合いかも：{{list}}。

{{name}}（共通の友達 {{mutual}} 人）

{{name}} さんは友達の友達を全員知っています。

別の人をクリックすると候補を更新します。

端末 {{id}}

カード •••• {{last4}}

アカウント {{id}}

ログイン端末

支払いカード

アカウント

要注意アカウント

端末

カード

低

中

高

ダークテーマ

アカウント・端末・決済カードのグラフ。2 つの不正リングが端末とカードを共有しています

クラスタ：アカウント {{accounts}}・端末 {{devices}}・カード {{cards}} · リスク：{{risk}}

アカウント・端末・カードをクリックするとクラスタ全体を選択します。

## GraphChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/graph-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "GraphLayoutType",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "GraphDirection | undefined",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "attribute": "node-shape",
    "required": false
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "attribute": "edge-style",
    "required": false
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\"",
    "attribute": "edge-color",
    "required": false
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\"",
    "attribute": "arrow-style",
    "required": false
  },
  {
    "name": "highlight",
    "typeText": "\"neighbors\" | \"lineage\" | \"none\" | undefined",
    "attribute": "highlight",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[] | undefined",
    "required": false
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[] | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "GraphBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) node / edge changed; detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-item-click",
    "typeText": "CustomEvent",
    "description": "A node or an edge was clicked (or a node activated with Enter); detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }"
  },
  {
    "name": "minerva-selection-change",
    "typeText": "CustomEvent",
    "description": "The selection changed; detail: { ids }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A tree node was collapsed or expanded; detail: { id, collapsed }"
  },
  {
    "name": "minerva-group-toggle",
    "typeText": "CustomEvent",
    "description": "The legend showed / hid a group; detail: { group, hidden }"
  },
  {
    "name": "minerva-layout-end",
    "typeText": "CustomEvent",
    "description": "The layout is done (the force simulation cooled down); detail: { layout }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 円形レイアウトと選択

同じ路線を地域ごとに円周上に配置し、エッジは始点の色で表示します。都市をクリック（Ctrl / ⌘ + クリックで追加）すると選択内容が通知されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/wc/circular.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-graph-chart
    id="circle"
    layout="circular"
    edge-color="source"
    height="440"
  ></minerva-graph-chart>
  <output id="selection" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/graph-chart/wc/circular.ts

```tsx
// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// minerva-selection-change lists the selection.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
const TEXT = {
  en: { hint: "Click a city to see its routes", selected: "Selected: " },
  zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
  ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
  fr: {
    hint: "Cliquez sur une ville pour voir ses liaisons",
    selected: "Sélection : ",
  },
};
// region (index in REGIONS) of each city of CITIES
const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const text = TEXT[lang] ?? TEXT.en;
  const chart = root.querySelector<MinervaGraphChart>("#circle")!;
  const output = root.querySelector<HTMLOutputElement>("#selection")!;
  chart.nodes = names.map((label, i) => ({
    id: `c${i}`,
    label,
    group: `r${REGION_OF[i]}`,
  }));
  chart.edges = ROUTES.map(([a, b, flights]) => ({
    source: `c${a}`,
    target: `c${b}`,
    value: flights,
  }));
  chart.groups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  }));
  output.textContent = text.hint;
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    output.textContent = ids.length
      ? text.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
  return () => chart.removeEventListener("minerva-selection-change", onSelect);
}

```

## Example: ハブ都市間の航空路線

ハブ都市の力学モデルネットワーク：ノードの大きさはハブの規模、エッジの太さは週あたりの便数、色は地域を表します。都市名はページの言語に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/wc/routes.html

```html
<minerva-graph-chart id="routes" height="440"></minerva-graph-chart>

```

### apps/docs/src/docs/pages/graph-chart/wc/routes.ts

```tsx
// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
// region (index in REGIONS) and size of the hub, in the order of CITIES
const HUBS = [
  [0, 8],
  [0, 9],
  [0, 9],
  [0, 6],
  [0, 8],
  [0, 7],
  [1, 5],
  [2, 9],
  [2, 8],
  [2, 7],
  [3, 9],
  [3, 6],
  [3, 7],
  [3, 5],
];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const chart = root.querySelector<MinervaGraphChart>("#routes")!;
  chart.nodes = HUBS.map(([region, size], i) => ({
    id: `c${i}`,
    label: names[i],
    group: `r${region}`,
    value: size,
  }));
  chart.edges = ROUTES.map(([a, b, flights]) => ({
    source: `c${a}`,
    target: `c${b}`,
    value: flights,
  }));
  chart.groups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  }));
  chart.options = { nodeSize: [10, 34] };
}

```
