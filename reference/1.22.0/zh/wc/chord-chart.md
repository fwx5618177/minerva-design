# 弦图

展示围绕圆周排列的各组之间的流量：每组是一段弧，长度取决于其流量；每条流量是连接两段弧的弦带。无向模式下，一条弦带连接一对组，宽度为两组之间双向流量之和（对称矩阵中每个关系只计一次），因此只有流入的组也有自己的弧；有向模式下，每个方向各有一条带箭头的弦带。悬停某组可高亮其弦带，悬停弦带可查看双向数值；图例可隐藏 / 显示组，方向键依次遍历各组和弦带。

Package: minerva-design@1.22.0

Renderer: wc

Locale: zh

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

设计

研发

产品

市场

四个团队一周内互发的消息数

北美

拉丁美洲

欧洲

非洲

西亚

南亚

东亚

大洋洲

{{value}} 百万人

五年间世界各地区之间的人口迁移

app

router

store

ui-kit

api-client

auth

i18n

utils

代码库各模块之间的导入关系

美国

中国

欧盟

墨西哥

加拿大

日本

韩国

主要经济体一年内的货物贸易

首页

搜索

分类

商品

购物车

结算

{{value}} 千次访问

悬停页面或弦带查看详情

{{source}} → {{target}}：{{value}}（反向：{{reverse}}）

{{name}}：流入与流出共 {{value}}

购物应用一天内各页面之间的跳转

美国东部

美国西部

欧洲中部

亚太东南

亚太东北

南美

{{value}} Gbit/s

数据中心之间的复制流量

标签

自动

切向

径向

无

组的顺序

数据顺序

从大到小

从小到大

弦带颜色

渐变

源

目标

中性

有向

刻度

其他运营商

年份

{{year}} 年

{{name}} {{value}}

{{name}} 赢得的用户最多（净增 {{value}}）。净变化：{{list}}。

{{year}} 年移动运营商之间的用户转网

物理

化学

生物

医学

计算机科学

数学

经济

工程

点击某个学院聚焦其合作关系，或点击一条带查看这一对学院

{{name}}：合著论文 {{total}} 篇，主要合作方为 {{partners}}

{{name}}（{{value}}）

{{a}}与{{b}}：合著论文 {{value}} 篇

清除

一所大学各学院五年间合著的论文

咖啡

牛奶

面包

糕点

水果

麦片

酸奶

果汁

{{a}} + {{b}}

在 {{value}} 个购物篮中一起购买（占全部购物篮的 {{share}}）

与其他品类组合 {{value}} 次

一个月内在同一购物篮中一起购买的商品品类

网关

用户

订单

库存

支付

通知

{{value}} 次/秒

总计：{{total}}。最繁忙：{{from}} → {{to}}（{{value}}）

暂停

继续

微服务之间的实时每秒调用次数

伦敦

巴黎

法兰克福

伊斯坦布尔

迪拜

新加坡

东京

纽约

{{value}} 百万人次

显示全部枢纽

东部枢纽

西部枢纽

至少显示两个枢纽才能看到它们之间的航线

显示 {{total}} 个枢纽中的 {{shown}} 个：{{routes}} 条航线，每年 {{passengers}}

主要机场枢纽之间的年旅客量

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

## Example: 双向的有向流动

以连线列表表示地区之间的迁移，每个方向一条带箭头的流带；悬停事件同时给出流带的两个方向（value 与 reverseValue）。

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

## Example: 团队之间的消息

一周内发送消息的方阵（行：发送方，列：接收方）；悬停在团队上会高亮其流带。

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
