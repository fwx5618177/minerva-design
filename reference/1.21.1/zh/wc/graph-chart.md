# 关系图

展示人物、组织、服务等实体之间的关系网络。节点由力导向布局（Barnes–Hut 算法，大图在 Web Worker 中计算）、环形布局或弧线图排布；节点和边由 GPU 绘制（WebGPU、WebGL2、WebGL，并可回退到 Canvas2D），数万个节点也能流畅交互。悬停节点高亮其邻居，可拖动节点、在图例中切换分组，也可以用键盘在图中漫游。

Package: minerva-design@1.21.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概览

GraphChart 接收节点、边以及可选的分组。分组决定颜色和图例，节点的数值决定圆的大小，边的标签说明关系类型。

布局：力导向（默认），包含连接力、多体斥力、向心力和碰撞力，并使用确定性随机种子；环形布局（按分组排列，边经圆心汇聚）；弧线图；也支持 dag 和树形布局（见“依赖图”和“树图”）。各布局算法也以纯函数导出，可在 Worker 和小程序中使用。

渲染与其他图表共用 GPU 后端，自动按 WebGPU → WebGL2 → WebGL → Canvas2D 回退；当前使用的渲染器通过 onRendererChange 和 data-renderer 属性告知。

标签会自动避让：缩小视图时只保留最重要节点的标签，放大或高亮时显示边的标签。

#### 交互与无障碍

拖动背景平移，按住 Ctrl / ⌘ 滚动或双指捏合缩放，拖动节点移动它（力导向模拟会随之调整），点击选中（Ctrl / ⌘ + 点击可多选），双击背景适应视图。角落的按钮可缩放和适应视图。

聚焦图表后用方向键在节点间移动；Enter 选中，+ 和 - 缩放，0 适应视图，Esc 清除。聚焦的节点会连同其分组和关系数被朗读。

内置文案（摘要、朗读提示、提示框、按钮）提供英文、中文、日文和法文，并跟随页面语言；颜色跟随浅色和深色主题。

刘备

关羽

张飞

诸葛亮

赵云

马超

黄忠

庞统

姜维

刘禅

魏延

法正

曹操

曹丕

司马懿

夏侯惇

夏侯渊

张辽

许褚

郭嘉

荀彧

典韦

曹植

司马昭

邓艾

孙权

孙策

孙坚

周瑜

鲁肃

吕蒙

陆逊

甘宁

黄盖

小乔

大乔

孙尚香

吕布

董卓

貂蝉

袁绍

汉献帝

王允

蜀汉

曹魏

东吴

群雄与汉室

结义兄弟

效力

父子

夫妻

手足

宿敌

师徒

义父

同盟

击败

总角之好

《三国演义》人物关系，按阵营着色

悬停人物或关系，点击选中；按住 Ctrl / ⌘ 滚动可缩放。

已选中：{{name}}

{{source}} → {{target}}：{{relation}}

、

成员 {{id}}

社区 {{n}}

生成的网络：40 个社区共 10,000 名成员

{{nodes}} 个节点 · {{edges}} 条连线 · 渲染器：{{renderer}} ·

正在 Web Worker 中模拟…

布局用时 {{seconds}} 秒

接入层

交易

身份

数据

边经圆心汇聚成束

微服务之间的调用，按业务域分组

系统级

函数式

面向对象

脚本

影响

编程语言之间的影响关系

力导向

环形

弧线图

布局

点击人物使其居中。

{{name}}：{{links}} 条关系

布局：{{layout}}

购物车

待支付

已支付

已发货

已签收

已退款

已取消

下单

修改购物车

支付

重试支付

超时

取消

支付撤回

发货

退款

物流更新

签收

退回寄件人

退货

评价

进行中

履约

已结束

实心箭头

订单状态及其之间的事件

正常

降级

严重

p95 {{value}} ms

{{value}} 次/秒

实时更新

在线商城的服务拓扑及各服务的实时健康状态

点击服务查看其指标。

{{name}}：{{status}} · p95 {{latency}} ms · 错误率 {{errors}} · {{rps}} 次/秒。

正常 {{healthy}}、降级 {{degraded}}、严重 {{critical}} · 更新于 {{time}}

玛丽·居里

皮埃尔·居里

阿尔伯特·爱因斯坦

马克斯·普朗克

尼尔斯·玻尔

维尔纳·海森堡

莉泽·迈特纳

奥托·哈恩

埃米·诺特

巴黎

华沙

维也纳

柏林

苏黎世

哥本哈根

索邦大学

威廉皇帝学会

苏黎世联邦理工学院

尼尔斯·玻尔研究所

放射性

相对论

量子理论

不确定性原理

核裂变

诺特定理

出生于

任职于

就读于

配偶

贡献于

位于

影响了

属于

合作者

相关

人物

地点

机构

理论

搜索人物、地点或理论…

搜索知识图谱

没有匹配的实体。

物理学家及其相关地点、机构与发现的知识图谱

搜索实体或点击节点，列出图谱中关于它的事实。

{{name}}：{{total}} 条事实 — {{facts}}

→ {{name}}（{{relation}}）

← {{name}}（{{relation}}）

大学同学

同事

攀岩俱乐部

读书会

四个圈子中 24 人之间的好友关系

{{name}} 可能认识：{{list}}。

{{name}}（共同好友 {{mutual}} 位）

{{name}} 已经认识所有好友的好友。

点击其他人以更新推荐。

设备 {{id}}

银行卡 •••• {{last4}}

账户 {{id}}

登录设备

支付卡

账户

可疑账户

设备

银行卡

低

中

高

深色主题

账户、设备与银行卡，其中两个欺诈团伙共用设备和银行卡

关联簇：{{accounts}} 个账户、{{devices}} 台设备、{{cards}} 张银行卡 · 风险：{{risk}}

点击账户、设备或银行卡以选中整个关联簇。

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

## Example: 环形布局与选择

同一组航线按地区排列在圆环上，连线使用起点的颜色；点击城市（Ctrl / ⌘ + 点击可多选）会报告当前选择。

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

## Example: 枢纽城市之间的航线

枢纽城市的力导向网络：节点大小表示枢纽规模，连线粗细表示每周航班数，颜色按地区区分；城市名称跟随页面语言。

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
