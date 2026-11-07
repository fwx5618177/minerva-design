# ツリー図

整列ツリー、放射状ツリー、マインドマップ、組織図で階層構造を表します：組織、ファイルシステム、分類、計画。整列ツリー（Buchheim / Reingold–Tilford）はノードを重ねず、各親を子の中央に配置します。サブツリーはクリック、キーボード、API からアニメーション付きで折りたたみ・展開できます。

Package: minerva-design@1.22.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概要

TreeChart はノードと親 → 子のエッジを受け取ります。親を持たないノードがルートです（tree.root で指定可能）。閉路や 2 つ目の親を作るエッジは無視されます。

整列ツリーは線形時間で動作し、各ノードの大きさを考慮します。ラベルは重ならず、親は子の中央に置かれ、同じ形のサブツリーは同じように描かれます。

layout="tree"（既定は左から右、任意の向き）、"radial"（ルートを囲む同心円、ラベルは半径方向）、"mindmap"（枝を左右にバランスよく配置し、枝ごとに色分け）、"org"（タイトルとサブタイトル付きのカード、直交線、末端のチームは縦に積む）。

子を持つノードをクリックするか、Enter を押すか、expand / collapse / toggle を呼ぶと、サブツリーがアニメーションでノードに畳まれ、バッジが非表示のノード数を示します。ノードに collapsed を指定すると最初から畳まれます。

佐藤 美咲

鈴木 健太

高橋 由美

田中 誠

伊藤 彩

渡辺 翔

山本 大輔

小林 陽菜

加藤 蓮

吉田 拓海

山田 さくら

佐々木 悠斗

山口 恵

松本 亮

井上 結衣

木村 剛

林 真由

清水 達也

最高経営責任者

最高技術責任者

最高財務責任者

最高執行責任者

最高マーケティング責任者

フロントエンドリード

バックエンドリード

フロントエンドエンジニア

フロントエンドエンジニア

バックエンドエンジニア

バックエンドエンジニア

SRE

経理部長

財務アナリスト

サポートマネージャー

物流マネージャー

ブランドマネージャー

グロースマネージャー

経営陣

エンジニアリング

財務

オペレーション

マーケティング

会社の組織図

マネージャーをクリックするとチームを開閉できます。

{{name}} のチームを折りたたみました

{{name}} のチームを展開しました

製品ローンチ

目標

有料ユーザー 1 万人

ブランド認知

継続率 90%

ターゲット

プロダクトチーム

フリーランス

学生

チャネル

発表イベント

ニュースレター

パートナー

SNS

スケジュール

クローズドベータ

プレスキット

ローンチ日

リスク

遅延

価格への反応

予算

広告

イベント

製品ローンチ計画のマインドマップ

入力

ナビゲーション

フィードバック

データ表示

レイアウト

チャート

カテゴリ別のデザインシステムのコンポーネント

フォルダ

```tsx
コード
```

スタイル

データ

ドキュメント

すべて展開

すべて折りたたむ

全体表示

プロジェクトのファイル

信用スコア

収入 ≥ 返済額 × 3？

勤続 2 年以上？

返済負担率 < 35%？

承認

承認（減額）

承認（金利上乗せ）

個別審査

否決

700 以上

600〜699

600 未満

はい

いいえ

質問

承認

審査

否決

現在の申込者の経路を強調したローン審査の決定木

結論: {{outcome}}（{{questions}} 問で判定）。

すべての商品

家電・デジタル

ホーム

ファッション

スポーツ

パソコン

スマートフォン関連

オーディオ

ノートパソコン

デスクトップ

タブレット

スマートフォン

スマホケース

充電器

ヘッドホン

スピーカー

キッチン

家具

ガーデン

調理器具

コーヒーメーカー

包丁

ソファ

デスク

オフィスチェア

園芸用品

観葉植物

衣類

靴

アクセサリー

ジャケット

ワンピース

スニーカー

ブーツ

バッグ

腕時計

アウトドア

フィットネス

サイクリング

テント

登山靴

ヨガマット

ダンベル

自転車

ヘルメット

 › 

カテゴリを検索

ストアの商品カテゴリ体系

{{total}} 件のカテゴリが一致しました。Enter キーかタグで表示します。

カテゴリを検索してください（例:「ブーツ」「デスク」）。

Macintosh HD

システム

アプリケーション

メディア

書類

キャッシュとバックアップ

レイアウト

ツリー

放射状

フォルダー別のディスク使用量（ノードの大きさはバイト数）

{{name}}: {{size}} — {{parent}} の {{parentShare}}、ディスク全体の {{share}}。

{{name}}: {{size}} 使用中。

アプリ 2.0 リリース

オンボーディング

新規登録

メール認証

ソーシャルログイン

製品ツアー

ツアー画面

スキップと再開

決済

チェックアウト

カード入力フォーム

ウォレット決済

請求

請求書

返金

プラットフォーム

オフラインモード

同期キュー

競合の解決

品質

クラッシュレポート

パフォーマンス予算

{{points}} pt

{{points}} pt · {{done}} 完了

集約

完了

進行中

未着手

詳細レベル

成果物

機能

作業パッケージ

{{level}} まで表示しています。

ストーリーポイント付きのモバイルアプリリリースの作業分解構成図

{{name}} を折りたたみました: {{points}} pt、残り {{remaining}} pt。

{{name}} を展開しました: {{points}} pt、残り {{remaining}} pt。

合計 {{points}} ストーリーポイント、{{done}} 完了。項目をクリックすると折りたたみ・展開できます。

準々決勝

準決勝

決勝

未実施

{{winner}}–{{loser}}

第 {{n}} シード

未実施

勝者

勝ち残り

敗退

優勝

次のラウンド

最初から

再シミュレーション

準々決勝から決勝までのトーナメント表

{{team}} が優勝！

{{round}}の勝者: {{teams}}。

実力順にシードされた 8 チーム。次のラウンドを実施して結果を公開します。

## TreeChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TreeChart"
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
    "type": "\"radial\" | \"tree\" | \"mindmap\" | \"org\"",
    "default": "\"tree\"",
    "required": false,
    "description": "Kind of tree: tidy tree, radial tree, two-sided mind map or org chart (default `tree`)",
    "typeText": "\"radial\" | \"tree\" | \"mindmap\" | \"org\""
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
    "description": "Direction of `layout=\"tree\"` (default `LR`)",
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
    "description": "Root, spacing, collapsing, card size",
    "typeText": "GraphTreeOptions"
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

## Example: mind-map

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/vue/mind-map.vue

```vue
<script setup lang="ts">
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreeChart } from "minerva-design/vue/charts";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

const { language } = useI18n();
const nodes = computed(() =>
  (TOPICS[language.value] ?? TOPICS.en).map((label, i) => ({
    id: `t${i}`,
    label,
    group: `b${branchOf(i)}`,
  })),
);
const edges = PARENT.flatMap((parent, i) =>
  parent < 0 ? [] : [{ source: `t${parent}`, target: `t${i}` }],
);
</script>

<template>
  <TreeChart
    :nodes="nodes"
    :edges="edges"
    layout="mindmap"
    :legend="false"
    :height="420"
  />
</template>

```

## Example: org

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/vue/org.vue

```vue
<script setup lang="ts">
// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// @toggle reports it.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreeChart, type GraphToggleEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.roles.map((label, i) => ({
    id: `p${i}`,
    label,
    group: `d${PEOPLE[i][1]}`,
  })),
);
const groups = computed(() =>
  text.value.departments.map((name, i) => ({ id: `d${i}`, name })),
);
const edges = PEOPLE.flatMap(([manager], i) =>
  manager < 0 ? [] : [{ source: `p${manager}`, target: `p${i}` }],
);
const toggled = ref<GraphToggleEvent | null>(null);
const status = computed(() =>
  toggled.value
    ? text.value[toggled.value.collapsed ? "collapsed" : "expanded"].replace(
        "{name}",
        text.value.roles[Number(toggled.value.id.slice(1))],
      )
    : text.value.hint,
);
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <TreeChart
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      layout="org"
      :height="460"
      @toggle="toggled = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```
