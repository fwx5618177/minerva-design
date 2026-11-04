# ネットワーク図

人物、組織、サービスなどのエンティティとその関係を表すネットワーク図です。ノードは力学モデル（Barnes–Hut 法、大きなグラフは Web Worker で計算）、円形レイアウト、アークダイアグラムで配置され、ノードとエッジは GPU（WebGPU、WebGL2、WebGL、Canvas2D へのフォールバック）で描画されるため、数万ノードでも滑らかに操作できます。ノードにホバーすると隣接ノードを強調し、ドラッグ、凡例でのグループ切り替え、キーボードでの移動ができます。

Package: minerva-design@1.20.6

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "GraphChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "number | boolean",
    "required": false,
    "description": "Animates layout and data changes; a number is the duration in ms (default `true`)",
    "typeText": "number | boolean"
  },
  {
    "name": "layout",
    "type": "GraphLayoutType",
    "default": "\"force\"",
    "required": false,
    "description": "Placement of the nodes (default `force`)",
    "typeText": "GraphLayoutType"
  },
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | GraphLegendOptions",
    "required": false,
    "description": "Legend of the groups; shown by default with several groups",
    "typeText": "boolean | GraphLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | GraphTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | GraphTooltipOptions"
  },
  {
    "name": "interaction",
    "type": "boolean | GraphInteractionOptions",
    "required": false,
    "description": "Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged, click selects, arrow keys move; `false` makes the chart static (default `true`)",
    "typeText": "boolean | GraphInteractionOptions"
  },
  {
    "name": "arrows",
    "type": "boolean",
    "required": false,
    "description": "Arrowheads on the edges without `directed` (on for DAGs)",
    "typeText": "boolean"
  },
  {
    "name": "nodeLabels",
    "type": "boolean | \"auto\"",
    "required": false,
    "description": "Node labels; `auto` hides minor and overlapping labels when zoomed out (default `auto`)",
    "typeText": "boolean | \"auto\""
  },
  {
    "name": "edgeLabels",
    "type": "boolean | \"auto\" | \"hover\"",
    "required": false,
    "description": "Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never (default `auto`)",
    "typeText": "boolean | \"auto\" | \"hover\""
  },
  {
    "name": "controls",
    "type": "boolean",
    "required": false,
    "description": "Zoom buttons (zoom in, zoom out, fit; default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "groups",
    "type": "readonly GraphGroup[]",
    "required": false,
    "description": "Groups: legend order, names and colors",
    "typeText": "readonly GraphGroup[]"
  },
  {
    "name": "labels",
    "type": "Partial<GraphChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<GraphChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Language of the built-in texts (summary, announcements, tooltip, buttons); the page language by default",
    "typeText": "string"
  },
  {
    "name": "highlight",
    "type": "\"none\" | \"neighbors\" | \"lineage\"",
    "required": false,
    "description": "What hovering / selecting a node highlights",
    "typeText": "\"none\" | \"neighbors\" | \"lineage\""
  },
  {
    "name": "direction",
    "type": "GraphDirection",
    "required": false,
    "description": "Direction of the `dag` and `tree` layouts",
    "typeText": "GraphDirection"
  },
  {
    "name": "nodes",
    "type": "readonly GraphNode[]",
    "required": true,
    "description": "The nodes (a new array re-runs the layout; an array rebuilt with the same node objects does not)",
    "typeText": "readonly GraphNode[]"
  },
  {
    "name": "edges",
    "type": "readonly GraphEdge[]",
    "required": true,
    "description": "The edges (parent → child in trees, prerequisite → dependent in DAGs)",
    "typeText": "readonly GraphEdge[]"
  },
  {
    "name": "dag",
    "type": "GraphDagOptions",
    "required": false,
    "description": "Layered layout settings (`layout=\"dag\"`)",
    "typeText": "GraphDagOptions"
  },
  {
    "name": "nodeShape",
    "type": "GraphNodeShape",
    "required": false,
    "description": "Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise)",
    "typeText": "GraphNodeShape"
  },
  {
    "name": "nodeSize",
    "type": "number | readonly [number, number]",
    "required": false,
    "description": "Circle diameter in layout units, or `[min, max]` scaled by the node `value`",
    "typeText": "number | readonly [number, number]"
  },
  {
    "name": "edgeStyle",
    "type": "GraphEdgeStyle",
    "required": false,
    "description": "Edge shape; depends on the layout when omitted",
    "typeText": "GraphEdgeStyle"
  },
  {
    "name": "edgeWidth",
    "type": "number | readonly [number, number]",
    "required": false,
    "description": "Edge width in CSS pixels, or `[min, max]` scaled by the edge `value`",
    "typeText": "number | readonly [number, number]"
  },
  {
    "name": "edgeColor",
    "type": "\"neutral\" | \"target\" | \"source\"",
    "required": false,
    "description": "Edge colors: neutral or tinted with the source / target node (default `neutral`)",
    "typeText": "\"neutral\" | \"target\" | \"source\""
  },
  {
    "name": "arrowStyle",
    "type": "\"open\" | \"filled\"",
    "required": false,
    "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color; default `open`)",
    "typeText": "\"open\" | \"filled\""
  },
  {
    "name": "selected",
    "type": "readonly string[]",
    "required": false,
    "description": "Ids of the selected nodes (changing it updates the selection)",
    "typeText": "readonly string[]"
  },
  {
    "name": "fitPadding",
    "type": "number",
    "required": false,
    "description": "Padding around the graph when fitting it, in CSS pixels (default 24)",
    "typeText": "number"
  },
  {
    "name": "tree",
    "type": "GraphTreeOptions",
    "required": false,
    "description": "Tree layout settings (tree layouts)",
    "typeText": "GraphTreeOptions"
  },
  {
    "name": "force",
    "type": "GraphForceOptions",
    "required": false,
    "description": "Force layout settings (Barnes–Hut, worker for large graphs)",
    "typeText": "GraphForceOptions"
  },
  {
    "name": "circular",
    "type": "GraphCircularOptions",
    "required": false,
    "description": "Circular / arc layout settings",
    "typeText": "GraphCircularOptions"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: GraphHoverEvent | null]",
    "typeText": "[event: GraphHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "type": "[event: GraphToggleEvent]",
    "typeText": "[event: GraphToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "type": "[ids: string[]]",
    "typeText": "[ids: string[]]",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "groupToggle",
    "type": "[event: GraphGroupToggleEvent]",
    "typeText": "[event: GraphGroupToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphGroupToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "layoutEnd",
    "type": "[event: GraphLayoutEndEvent]",
    "typeText": "[event: GraphLayoutEndEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphLayoutEndEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "type": "[event: GraphHoverEvent]",
    "typeText": "[event: GraphHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: circular

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/vue/circular.vue

```vue
<script setup lang="ts">
// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// @selection-change lists the selection.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { GraphChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const names = computed(() => CITIES[language.value] ?? CITIES.en);
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  names.value.map((label, i) => ({
    id: `c${i}`,
    label,
    group: `r${REGION_OF[i]}`,
  })),
);
const groups = computed(() =>
  (REGIONS[language.value] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  })),
);
const edges = ROUTES.map(([a, b, flights]) => ({
  source: `c${a}`,
  target: `c${b}`,
  value: flights,
}));
const selection = ref<string[]>([]);
const status = computed(() =>
  selection.value.length
    ? text.value.selected +
      selection.value.map((id) => names.value[Number(id.slice(1))]).join(", ")
    : text.value.hint,
);
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <GraphChart
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      layout="circular"
      edge-color="source"
      :height="440"
      @selection-change="selection = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```

## Example: routes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/vue/routes.vue

```vue
<script setup lang="ts">
// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GraphChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const nodes = computed(() => {
  const names = CITIES[language.value] ?? CITIES.en;
  return HUBS.map(([region, size], i) => ({
    id: `c${i}`,
    label: names[i],
    group: `r${region}`,
    value: size,
  }));
});
const groups = computed(() =>
  (REGIONS[language.value] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  })),
);
const edges = ROUTES.map(([a, b, flights]) => ({
  source: `c${a}`,
  target: `c${b}`,
  value: flights,
}));
</script>

<template>
  <GraphChart
    :nodes="nodes"
    :edges="edges"
    :groups="groups"
    :node-size="[10, 34]"
    :height="440"
  />
</template>

```
