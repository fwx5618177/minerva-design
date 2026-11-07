# ツリー図

整列ツリー、放射状ツリー、マインドマップ、組織図で階層構造を表します：組織、ファイルシステム、分類、計画。整列ツリー（Buchheim / Reingold–Tilford）はノードを重ねず、各親を子の中央に配置します。サブツリーはクリック、キーボード、API からアニメーション付きで折りたたみ・展開できます。

Package: minerva-design@1.22.1

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tree-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"tree\" | \"radial\" | \"mindmap\" | \"org\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "GraphDirection",
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

## Example: マインドマップ

製品ローンチの計画：中心トピックの両側に枝が広がり、枝ごとに色が分かれます。トピックはページの言語に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.html

```html
<minerva-tree-chart
  id="launch"
  layout="mindmap"
  height="420"
></minerva-tree-chart>

```

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.ts

```tsx
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import type { MinervaTreeChart } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const topics =
    TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
  const chart = root.querySelector<MinervaTreeChart>("#launch")!;
  chart.nodes = topics.map((label, i) => ({
    id: `t${i}`,
    label,
    group: `b${branchOf(i)}`,
  }));
  chart.edges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: `t${parent}`, target: `t${i}` }],
  );
  chart.options = { legend: false };
}

```

## Example: チームを折りたためる組織図

カードは部門ごとに色分けされ、末端のチームはマネージャーの下に積み重ねられます。マネージャーをクリックするとチームを折りたたみ / 展開し、そのイベントが下に表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/org.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-tree-chart id="org" layout="org" height="460"></minerva-tree-chart>
  <output id="org-status" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/tree-chart/wc/org.ts

```tsx
// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// minerva-toggle reports it.
import type {
  GraphToggleEvent,
  MinervaTreeChart,
} from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreeChart>("#org")!;
  const output = root.querySelector<HTMLOutputElement>("#org-status")!;
  chart.nodes = text.roles.map((label, i) => ({
    id: `p${i}`,
    label,
    group: `d${PEOPLE[i][1]}`,
  }));
  chart.edges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: `p${manager}`, target: `p${i}` }],
  );
  chart.groups = text.departments.map((name, i) => ({ id: `d${i}`, name }));
  output.textContent = text.hint;
  const onToggle = (event: Event) => {
    const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
    output.textContent = text[collapsed ? "collapsed" : "expanded"].replace(
      "{name}",
      text.roles[Number(id.slice(1))],
    );
  };
  chart.addEventListener("minerva-toggle", onToggle);
  return () => chart.removeEventListener("minerva-toggle", onToggle);
}

```
