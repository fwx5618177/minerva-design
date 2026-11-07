# 关系图

展示人物、组织、服务等实体之间的关系网络。节点由力导向布局（Barnes–Hut 算法，大图在 Web Worker 中计算）、环形布局或弧线图排布；节点和边由 GPU 绘制（WebGPU、WebGL2、WebGL，并可回退到 Canvas2D），数万个节点也能流畅交互。悬停节点高亮其邻居，可拖动节点、在图例中切换分组，也可以用键盘在图中漫游。

Package: minerva-design@1.22.0

Renderer: react

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
  "specifier": "minerva-design/charts",
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
    "name": "layout",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "arc",
      "circular",
      "dag",
      "force",
      "mindmap",
      "none",
      "org",
      "radial",
      "tree"
    ],
    "typeText": "GraphLayoutType | undefined",
    "typeRef": "type:9f4c5f81daeecd1158dc",
    "default": "force",
    "required": false,
    "description": "Placement of the nodes"
  },
  {
    "name": "direction",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "BT",
      "LR",
      "RL",
      "TB"
    ],
    "typeText": "GraphDirection | undefined",
    "typeRef": "type:e2282a023de588fdd830",
    "required": false,
    "description": "Direction of the `dag` and `tree` layouts"
  },
  {
    "name": "force",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "GraphForceOptions | undefined",
    "typeRef": "type:8b3296588bce07c348c5",
    "required": false,
    "description": "Force layout settings (Barnes–Hut, worker for large graphs)"
  },
  {
    "name": "circular",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "GraphCircularOptions | undefined",
    "typeRef": "type:93a5748191458ba57fc5",
    "required": false,
    "description": "Circular / arc layout settings"
  },
  {
    "name": "dag",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "GraphDagOptions | undefined",
    "typeRef": "type:9812c43f612183b6c13d",
    "required": false,
    "description": "Layered layout settings (`layout=\"dag\"`)"
  },
  {
    "name": "tree",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "GraphTreeOptions | undefined",
    "typeRef": "type:8786e91b2b5f9ba54696",
    "required": false,
    "description": "Tree layout settings (tree layouts)"
  },
  {
    "name": "nodes",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphNode[]",
    "typeRef": "type:d043e153cf195b5b2e2b",
    "required": true,
    "description": "The nodes"
  },
  {
    "name": "edges",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphEdge[]",
    "typeRef": "type:75a5208fa228dd1e0528",
    "required": true,
    "description": "The edges (parent → child in trees, prerequisite → dependent in DAGs)"
  },
  {
    "name": "groups",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphGroup[] | undefined",
    "typeRef": "type:b8f1cf5e37f0c33f5bad",
    "required": false,
    "description": "Groups: legend order, names and colors"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 480,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "nodeShape",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "box",
      "circle"
    ],
    "typeText": "GraphNodeShape | undefined",
    "typeRef": "type:1091b2c2c15e447b147f",
    "required": false,
    "description": "Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise)"
  },
  {
    "name": "nodeSize",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | readonly [number, number] | undefined",
    "typeRef": "type:750314f5aee769294737",
    "required": false,
    "description": "Circle diameter in layout units, or `[min, max]` scaled by the node `value`"
  },
  {
    "name": "edgeStyle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "curve",
      "orthogonal",
      "spline",
      "straight"
    ],
    "typeText": "GraphEdgeStyle | undefined",
    "typeRef": "type:8c4d9692eea81edaa9b2",
    "required": false,
    "description": "Edge shape; depends on the layout when omitted"
  },
  {
    "name": "edgeWidth",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | readonly [number, number] | undefined",
    "typeRef": "type:750314f5aee769294737",
    "required": false,
    "description": "Edge width in CSS pixels, or `[min, max]` scaled by the edge `value`"
  },
  {
    "name": "edgeColor",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"source\" | undefined",
    "typeRef": "type:12fe953650573b302791",
    "default": "neutral",
    "required": false,
    "description": "Edge colors: neutral or tinted with the source / target node"
  },
  {
    "name": "arrows",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Arrowheads on the edges without `directed`"
  },
  {
    "name": "arrowStyle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "filled",
      "open"
    ],
    "typeText": "\"filled\" | \"open\" | undefined",
    "typeRef": "type:d74ec6d9774e9b198b93",
    "default": "open",
    "required": false,
    "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color, which follows the theme and the highlight)"
  },
  {
    "name": "nodeLabels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | \"auto\" | undefined",
    "typeRef": "type:54793a2f0bb416543bfd",
    "default": "auto",
    "required": false,
    "description": "Node labels; `auto` hides minor and overlapping labels when zoomed out. Text inside boxes keeps a readable minimum size and is shortened with an ellipsis; it is hidden only when the box is too small for any text, or with `false`"
  },
  {
    "name": "edgeLabels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | \"hover\" | \"auto\" | undefined",
    "typeRef": "type:266dfa648b484f073d6f",
    "default": "auto",
    "required": false,
    "description": "Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never"
  },
  {
    "name": "highlight",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "lineage",
      "neighbors",
      "none"
    ],
    "typeText": "\"none\" | \"neighbors\" | \"lineage\" | undefined",
    "typeRef": "type:b5de00c7c3625629f010",
    "required": false,
    "description": "What hovering / selecting a node highlights"
  },
  {
    "name": "selected",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Ids of the selected nodes (changing it updates the selection)"
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | boolean | undefined",
    "typeRef": "type:11d9d08024b0b84c460e",
    "default": true,
    "required": false,
    "description": "Animates layout and data changes; a number is the duration in ms"
  },
  {
    "name": "fitPadding",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 24,
    "required": false,
    "description": "Padding around the graph when fitting it, in CSS pixels"
  },
  {
    "name": "controls",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Zoom buttons (zoom in, zoom out, fit)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphLegendOptions | undefined",
    "typeRef": "type:a6752c0a6f36341f0589",
    "required": false,
    "description": "Legend of the groups; shown by default with several groups"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphTooltipOptions | undefined",
    "typeRef": "type:43b64af2877567c9edca",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphInteractionOptions | undefined",
    "typeRef": "type:a8c334ec55cb37fe3733",
    "default": true,
    "required": false,
    "description": "Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged (force, circular), click selects, arrow keys move between nodes; `false` makes the chart static"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Language of the built-in texts (summary, announcements, tooltip, buttons); built-in texts in English, Chinese, Japanese and French"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "Partial<GraphChartLabels> | undefined",
    "typeRef": "type:dae2a71254652403a618",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphHoverEvent | null) => void) | undefined",
    "typeRef": "type:ac5e1baf28ad49ba06c3",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphHoverEvent | null",
        "typeRef": "type:888c98d6309fe4d4eaed"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) node / edge changes"
  },
  {
    "name": "onItemClick",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphHoverEvent) => void) | undefined",
    "typeRef": "type:51acd588b4a8583a3df7",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphHoverEvent",
        "typeRef": "type:a459780626c7d631683c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a node or an edge is clicked (or a node activated with Enter)"
  },
  {
    "name": "onSelectionChange",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((ids: string[]) => void) | undefined",
    "typeRef": "type:e21311d79e7bf99e04a2",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the ids of the selected nodes when the selection changes"
  },
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphToggleEvent) => void) | undefined",
    "typeRef": "type:5637f42cbc0ffe182065",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphToggleEvent",
        "typeRef": "type:f64c00a6c651b3baee92"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a tree node is collapsed or expanded"
  },
  {
    "name": "onGroupToggle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphGroupToggleEvent) => void) | undefined",
    "typeRef": "type:19db777e1f40d3438872",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphGroupToggleEvent",
        "typeRef": "type:530e796c884bafc1408c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the legend shows / hides a group"
  },
  {
    "name": "onLayoutEnd",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphLayoutEndEvent) => void) | undefined",
    "typeRef": "type:def0e4d2c65fe68907cf",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphLayoutEndEvent",
        "typeRef": "type:55967c5fef8c1466ed7d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the layout is done (the force simulation cooled down)"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:5797a13f9f213080fe55",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and after a fallback)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "GraphChartProps": {
    "source": "charts/src/react/graph.tsx",
    "description": "Props of `GraphChart`",
    "kind": "interface",
    "extends": [
      "GraphCommonProps"
    ],
    "props": [
      {
        "name": "layout",
        "type": "GraphLayoutType",
        "required": false,
        "default": "\"force\"",
        "description": "Placement of the nodes"
      },
      {
        "name": "direction",
        "type": "GraphDirection",
        "required": false,
        "description": "Direction of the `dag` and `tree` layouts"
      },
      {
        "name": "force",
        "type": "GraphForceOptions",
        "required": false,
        "description": "Force layout settings (Barnes–Hut, worker for large graphs)"
      },
      {
        "name": "circular",
        "type": "GraphCircularOptions",
        "required": false,
        "description": "Circular / arc layout settings"
      },
      {
        "name": "dag",
        "type": "GraphDagOptions",
        "required": false,
        "description": "Layered layout settings (`layout=\"dag\"`)"
      },
      {
        "name": "tree",
        "type": "GraphTreeOptions",
        "required": false,
        "description": "Tree layout settings (tree layouts)"
      }
    ]
  },
  "GraphCommonProps": {
    "source": "charts/src/react/graph.tsx",
    "description": "Props shared by `GraphChart`, `DependencyGraph` and `TreeChart`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "nodes",
        "type": "readonly GraphNode[]",
        "required": true,
        "description": "The nodes"
      },
      {
        "name": "edges",
        "type": "readonly GraphEdge[]",
        "required": true,
        "description": "The edges (parent → child in trees, prerequisite → dependent in DAGs)"
      },
      {
        "name": "groups",
        "type": "readonly GraphGroup[]",
        "required": false,
        "description": "Groups: legend order, names and colors"
      },
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "default": "480",
        "description": "Height of the chart (the legend included); numbers are pixels"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "\"100%\"",
        "description": "Width of the chart; numbers are pixels"
      },
      {
        "name": "nodeShape",
        "type": "GraphNodeShape",
        "required": false,
        "description": "Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise)"
      },
      {
        "name": "nodeSize",
        "type": "number | readonly [number, number]",
        "required": false,
        "description": "Circle diameter in layout units, or `[min, max]` scaled by the node `value`"
      },
      {
        "name": "edgeStyle",
        "type": "GraphEdgeStyle",
        "required": false,
        "description": "Edge shape; depends on the layout when omitted"
      },
      {
        "name": "edgeWidth",
        "type": "number | readonly [number, number]",
        "required": false,
        "description": "Edge width in CSS pixels, or `[min, max]` scaled by the edge `value`"
      },
      {
        "name": "edgeColor",
        "type": "\"neutral\" | \"source\" | \"target\"",
        "required": false,
        "default": "\"neutral\"",
        "description": "Edge colors: neutral or tinted with the source / target node"
      },
      {
        "name": "arrows",
        "type": "boolean",
        "required": false,
        "description": "Arrowheads on the edges without `directed`"
      },
      {
        "name": "arrowStyle",
        "type": "\"open\" | \"filled\"",
        "required": false,
        "default": "\"open\"",
        "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color, which follows the theme and the highlight)"
      },
      {
        "name": "nodeLabels",
        "type": "boolean | \"auto\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Node labels; `auto` hides minor and overlapping labels when zoomed out. Text inside boxes keeps a readable minimum size and is shortened with an ellipsis; it is hidden only when the box is too small for any text, or with `false`"
      },
      {
        "name": "edgeLabels",
        "type": "boolean | \"auto\" | \"hover\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never"
      },
      {
        "name": "highlight",
        "type": "\"neighbors\" | \"lineage\" | \"none\"",
        "required": false,
        "description": "What hovering / selecting a node highlights"
      },
      {
        "name": "selected",
        "type": "readonly string[]",
        "required": false,
        "description": "Ids of the selected nodes (changing it updates the selection)"
      },
      {
        "name": "animation",
        "type": "boolean | number",
        "required": false,
        "default": "true",
        "description": "Animates layout and data changes; a number is the duration in ms"
      },
      {
        "name": "fitPadding",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Padding around the graph when fitting it, in CSS pixels"
      },
      {
        "name": "controls",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Zoom buttons (zoom in, zoom out, fit)"
      },
      {
        "name": "legend",
        "type": "boolean | GraphLegendOptions",
        "required": false,
        "description": "Legend of the groups; shown by default with several groups"
      },
      {
        "name": "tooltip",
        "type": "boolean | GraphTooltipOptions",
        "required": false,
        "description": "Tooltip; `false` disables it"
      },
      {
        "name": "interaction",
        "type": "boolean | GraphInteractionOptions",
        "required": false,
        "default": "true",
        "description": "Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged (force, circular), click selects, arrow keys move between nodes; `false` makes the chart static"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Accessible name of the chart"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language (`<html lang>`), then the browser language",
        "description": "Language of the built-in texts (summary, announcements, tooltip, buttons); built-in texts in English, Chinese, Japanese and French"
      },
      {
        "name": "labels",
        "type": "Partial<GraphChartLabels>",
        "required": false,
        "description": "Overrides of the built-in texts of the `locale`"
      },
      {
        "name": "onHover",
        "type": "(event: GraphHoverEvent | null) => void",
        "required": false,
        "description": "Called when the hovered (or keyboard-focused) node / edge changes"
      },
      {
        "name": "onItemClick",
        "type": "(event: GraphHoverEvent) => void",
        "required": false,
        "description": "Called when a node or an edge is clicked (or a node activated with Enter)"
      },
      {
        "name": "onSelectionChange",
        "type": "(ids: string[]) => void",
        "required": false,
        "description": "Called with the ids of the selected nodes when the selection changes"
      },
      {
        "name": "onToggle",
        "type": "(event: GraphToggleEvent) => void",
        "required": false,
        "description": "Called when a tree node is collapsed or expanded"
      },
      {
        "name": "onGroupToggle",
        "type": "(event: GraphGroupToggleEvent) => void",
        "required": false,
        "description": "Called when the legend shows / hides a group"
      },
      {
        "name": "onLayoutEnd",
        "type": "(event: GraphLayoutEndEvent) => void",
        "required": false,
        "description": "Called when the layout is done (the force simulation cooled down)"
      },
      {
        "name": "onRendererChange",
        "type": "(renderer: ChartRendererKind) => void",
        "required": false,
        "description": "Called with the backend once it is ready (and after a fallback)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class of the outer element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Style of the outer element"
      },
      {
        "name": "ref",
        "type": "Ref<GraphChartHandle>",
        "required": false,
        "description": "Imperative handle"
      }
    ]
  },
  "GraphChartHandle": {
    "source": "charts/src/react/graph.tsx",
    "description": "Imperative handle of the graph components (`ref`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "fit",
        "type": "(animate?: boolean) => void",
        "required": true,
        "description": "Fits the visible nodes in the view"
      },
      {
        "name": "focusNode",
        "type": "(id: string, options?: { zoom?: number; animate?: boolean }) => void",
        "required": true,
        "description": "Centers a node (expanding its collapsed ancestors), optionally zooming"
      },
      {
        "name": "setData",
        "type": "(data: GraphData) => void",
        "required": true,
        "description": "Replaces the data until the next render with new props"
      },
      {
        "name": "select",
        "type": "(ids: readonly string[] | string | null) => void",
        "required": true,
        "description": "Selects nodes (`null` clears the selection)"
      },
      {
        "name": "getSelection",
        "type": "() => string[]",
        "required": true,
        "description": "Ids of the selected nodes"
      },
      {
        "name": "expand",
        "type": "(id?: string) => void",
        "required": true,
        "description": "Expands a node (all nodes without an id)"
      },
      {
        "name": "collapse",
        "type": "(id?: string) => void",
        "required": true,
        "description": "Collapses a node (all nodes with children without an id)"
      },
      {
        "name": "toggle",
        "type": "(id: string) => void",
        "required": true,
        "description": "Collapses / expands a node"
      },
      {
        "name": "getPositions",
        "type": "() => Record<string, GraphPoint>",
        "required": true,
        "description": "Current positions of the nodes in layout units"
      },
      {
        "name": "relayout",
        "type": "() => void",
        "required": true,
        "description": "Computes the layout again"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend in use, `null` until ready"
      },
      {
        "name": "getInstance",
        "type": "() => GraphChartInstance | null",
        "required": true,
        "description": "The underlying engine instance (minerva-design/charts/core)"
      }
    ]
  },
  "GraphNode": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "A node (entity, person, package, task, tree item)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Unique identifier, referenced by the edges"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text shown next to / inside the node (the id when omitted)"
      },
      {
        "name": "subtitle",
        "type": "string",
        "required": false,
        "description": "Second line of boxes and org chart cards (job title, version, status)"
      },
      {
        "name": "group",
        "type": "string",
        "required": false,
        "description": "Group (category) id: color, legend entry"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Weight of the node: sizes circles (area) and ranks labels; the duration of a task for the critical path"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color (any CSS color, `var(--x)` included); wins over the group color"
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "description": "Diameter of a circle / height of a box in layout units (the zoom scales it)"
      },
      {
        "name": "shape",
        "type": "GraphNodeShape",
        "required": false,
        "description": "Shape; the `nodeShape` option when omitted"
      },
      {
        "name": "x",
        "type": "number",
        "required": false,
        "description": "Position (layout `none`, initial position of `force`)"
      },
      {
        "name": "y",
        "type": "number",
        "required": false
      },
      {
        "name": "fixed",
        "type": "boolean",
        "required": false,
        "description": "The force layout does not move the node (pinned at `x` / `y`)"
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "required": false,
        "description": "Tree layouts: the children of the node start hidden"
      },
      {
        "name": "data",
        "type": "unknown",
        "required": false,
        "description": "Any data, passed back in the events"
      }
    ]
  },
  "GraphEdge": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "A relationship / dependency between two nodes",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Id of the source node (the parent in tree layouts, the prerequisite in a DAG)"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Id of the target node"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Weight: line width (and the link strength of the force layout)"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text drawn on the edge (relationship name)"
      },
      {
        "name": "directed",
        "type": "boolean",
        "required": false,
        "description": "Draws an arrowhead at the target; the `arrows` option when omitted"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color (any CSS color)"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "description": "Line width in CSS pixels; derived from `value` when omitted"
      },
      {
        "name": "dashed",
        "type": "boolean",
        "required": false,
        "description": "Dashed line (optional / weak relationship)"
      },
      {
        "name": "data",
        "type": "unknown",
        "required": false,
        "description": "Any data, passed back in the events"
      }
    ]
  },
  "GraphGroup": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "A group (category) of nodes: legend entry and color",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Id referenced by `GraphNode.group`"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name in the legend and the tooltip (the id when omitted)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the nodes of the group (any CSS color); the palette when omitted"
      },
      {
        "name": "hidden",
        "type": "boolean",
        "required": false,
        "description": "Starts hidden (the legend can show it)"
      }
    ]
  },
  "GraphForceOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Settings of the force-directed layout",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "linkDistance",
        "type": "number",
        "required": false,
        "default": "60",
        "description": "Rest length of the edges, in layout units"
      },
      {
        "name": "linkStrength",
        "type": "number",
        "required": false,
        "description": "Stiffness of the edges, 0-1; `1 / min(degree)` per edge when omitted (d3 semantics)"
      },
      {
        "name": "charge",
        "type": "number",
        "required": false,
        "default": "-160",
        "description": "Many-body strength: negative values repel the nodes"
      },
      {
        "name": "theta",
        "type": "number",
        "required": false,
        "default": "0.9",
        "description": "Barnes–Hut accuracy: larger values are faster and less accurate"
      },
      {
        "name": "gravity",
        "type": "number",
        "required": false,
        "default": "0.04",
        "description": "Pull of every node towards the center (keeps disconnected parts together)"
      },
      {
        "name": "collide",
        "type": "boolean | number",
        "required": false,
        "default": "true",
        "description": "Prevents overlapping nodes; a number is the extra spacing in layout units"
      },
      {
        "name": "velocityDecay",
        "type": "number",
        "required": false,
        "default": "0.4",
        "description": "Velocity damping per tick, 0-1"
      },
      {
        "name": "iterations",
        "type": "number",
        "required": false,
        "default": "300",
        "description": "Number of ticks of a full cooling (alpha 1 → 0.001)"
      },
      {
        "name": "seed",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Seed of the pseudo-random jitter: the same data always gives the same layout"
      },
      {
        "name": "worker",
        "type": "\"auto\" | boolean",
        "required": false,
        "default": "\"auto\"",
        "description": "Runs the simulation in a Web Worker (created from a Blob URL): `auto` uses one above 2,000 nodes; falls back to time-sliced ticks on the main thread when workers are unavailable"
      },
      {
        "name": "animate",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the simulation while it runs; `false` computes it first and shows the result"
      },
      {
        "name": "multilevel",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Multilevel start of large graphs (400+ nodes without known positions): the layout of a coarsened graph (merged neighbors) seeds a short refinement, several times faster than a full cooling; `false` always runs the full cooling"
      }
    ]
  },
  "GraphCircularOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Settings of the `circular` and `arc` layouts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "order",
        "type": "\"group\" | \"degree\" | \"none\"",
        "required": false,
        "default": "\"group\"",
        "description": "Orders the nodes by group, then by degree (fewer crossings); `none` keeps the data order"
      },
      {
        "name": "tension",
        "type": "number",
        "required": false,
        "default": "0.8",
        "description": "Pull of the circular edges towards the center, 0 (straight chords) - 1"
      }
    ]
  },
  "GraphInteractionOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Pan / zoom / drag / keyboard options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "pan",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Dragging the background pans the view"
      },
      {
        "name": "zoom",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Wheel and pinch zoom"
      },
      {
        "name": "wheel",
        "type": "\"modifier\" | \"always\"",
        "required": false,
        "default": "\"modifier\"",
        "description": "Wheel zoom: only with Ctrl / ⌘ (and trackpad pinch, a hint explains it) or always"
      },
      {
        "name": "drag",
        "type": "boolean",
        "required": false,
        "description": "Nodes can be dragged; on by default for the force, circular and free layouts"
      },
      {
        "name": "select",
        "type": "boolean | \"multiple\"",
        "required": false,
        "default": "true",
        "description": "Clicking selects nodes (Ctrl / ⌘ + click adds to the selection); `multiple` without modifier"
      },
      {
        "name": "keyboard",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Arrow keys move between nodes, Enter selects / expands, +/- zoom, 0 fits, Esc clears"
      },
      {
        "name": "zoomRange",
        "type": "readonly [number, number]",
        "required": false,
        "default": "[0.02, 8]",
        "description": "Zoom limits (scale of the layout units)"
      }
    ]
  },
  "GraphLegendOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Legend options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "position",
        "type": "\"top\" | \"bottom\"",
        "required": false,
        "default": "\"top\"",
        "description": "Legend position"
      },
      {
        "name": "toggle",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clicking an item shows / hides the nodes of the group"
      }
    ]
  },
  "GraphTooltipOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Tooltip options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "render",
        "type": "(event: GraphHoverEvent) => string | Node | null",
        "required": false,
        "description": "Renders the tooltip content (a string is set as text, `null` hides it)"
      }
    ]
  },
  "GraphHoverEvent": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "The node or edge under the pointer (or focused with the keyboard)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"node\" | \"edge\"",
        "required": true,
        "description": "Kind of item"
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Node id, or `source→target` for an edge"
      },
      {
        "name": "node",
        "type": "GraphNode",
        "required": false,
        "description": "The node (node events)"
      },
      {
        "name": "edge",
        "type": "GraphEdge",
        "required": false,
        "description": "The edge (edge events)"
      },
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Index of the node / edge in the data"
      },
      {
        "name": "group",
        "type": "string",
        "required": false,
        "description": "Group id of the node"
      },
      {
        "name": "color",
        "type": "string",
        "required": true,
        "description": "Resolved color of the node / edge"
      },
      {
        "name": "degree",
        "type": "number",
        "required": false,
        "description": "Number of links of the node"
      },
      {
        "name": "clientX",
        "type": "number",
        "required": true,
        "description": "Position in CSS pixels, relative to the chart's container"
      },
      {
        "name": "clientY",
        "type": "number",
        "required": true
      }
    ]
  },
  "GraphChartLabels": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Built-in texts of the graph charts. Templates replace `{name}`-style placeholders.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "chart",
        "type": "string",
        "required": true,
        "default": "\"Network graph\"",
        "description": "Role description and accessible name of an unnamed chart"
      },
      {
        "name": "tree",
        "type": "string",
        "required": true,
        "default": "\"Tree diagram\"",
        "description": "Accessible name of a tree layout"
      },
      {
        "name": "dag",
        "type": "string",
        "required": true,
        "default": "\"Dependency graph\"",
        "description": "Accessible name of a layered layout"
      },
      {
        "name": "summary",
        "type": "string",
        "required": true,
        "default": "\"{nodes} nodes, {edges} links.\"",
        "description": "Summary; `{nodes}`, `{edges}`"
      },
      {
        "name": "groupsSummary",
        "type": "string",
        "required": true,
        "default": "\"Groups: {groups}.\"",
        "description": "Summary of the groups; `{groups}`"
      },
      {
        "name": "keyboardHelp",
        "type": "string",
        "required": true,
        "default": "\"Use the arrow keys to move between nodes, Enter to select, + and - to zoom, 0 to fit.\"",
        "description": "Keyboard help in the summary"
      },
      {
        "name": "nodeFocus",
        "type": "string",
        "required": true,
        "default": "\"{name}, {degree} links\"",
        "description": "Announcement of a focused node; `{name}`, `{degree}`"
      },
      {
        "name": "nodeFocusGroup",
        "type": "string",
        "required": true,
        "default": "\"{name} ({group}), {degree} links\"",
        "description": "Announcement of a focused node in a group; `{name}`, `{group}`, `{degree}`"
      },
      {
        "name": "selected",
        "type": "string",
        "required": true,
        "default": "\"{count} selected\"",
        "description": "Announcement of the selection; `{count}`"
      },
      {
        "name": "selectionCleared",
        "type": "string",
        "required": true,
        "default": "\"Selection cleared\"",
        "description": "Announcement when the selection is cleared"
      },
      {
        "name": "expanded",
        "type": "string",
        "required": true,
        "default": "\"{name} expanded\"",
        "description": "Announcement of an expanded node; `{name}`"
      },
      {
        "name": "collapsed",
        "type": "string",
        "required": true,
        "default": "\"{name} collapsed, {count} hidden\"",
        "description": "Announcement of a collapsed node; `{name}`, `{count}`"
      },
      {
        "name": "shown",
        "type": "string",
        "required": true,
        "default": "\"{name}: shown\"",
        "description": "Announcement when the legend shows a group; `{name}`"
      },
      {
        "name": "hidden",
        "type": "string",
        "required": true,
        "default": "\"{name}: hidden\"",
        "description": "Announcement when the legend hides a group; `{name}`"
      },
      {
        "name": "degree",
        "type": "string",
        "required": true,
        "default": "\"Links\"",
        "description": "Tooltip row: number of links"
      },
      {
        "name": "incoming",
        "type": "string",
        "required": true,
        "default": "\"Incoming\"",
        "description": "Tooltip row: incoming links"
      },
      {
        "name": "outgoing",
        "type": "string",
        "required": true,
        "default": "\"Outgoing\"",
        "description": "Tooltip row: outgoing links"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "default": "\"Value\"",
        "description": "Tooltip row: node / edge value"
      },
      {
        "name": "group",
        "type": "string",
        "required": true,
        "default": "\"Group\"",
        "description": "Tooltip row: group"
      },
      {
        "name": "hiddenChildren",
        "type": "string",
        "required": true,
        "default": "\"Hidden\"",
        "description": "Tooltip row: hidden descendants of a collapsed node"
      },
      {
        "name": "critical",
        "type": "string",
        "required": true,
        "default": "\"Critical path\"",
        "description": "Tooltip of a node on the critical path"
      },
      {
        "name": "zoomIn",
        "type": "string",
        "required": true,
        "default": "\"Zoom in\"",
        "description": "Zoom in button"
      },
      {
        "name": "zoomOut",
        "type": "string",
        "required": true,
        "default": "\"Zoom out\"",
        "description": "Zoom out button"
      },
      {
        "name": "fit",
        "type": "string",
        "required": true,
        "default": "\"Fit to view\"",
        "description": "Fit button"
      },
      {
        "name": "zoomHint",
        "type": "string",
        "required": true,
        "default": "\"Use {key} + scroll to zoom\"",
        "description": "Hint of a plain wheel; `{key}` is Ctrl or ⌘"
      },
      {
        "name": "listSeparator",
        "type": "string",
        "required": true,
        "default": "\", \"",
        "description": "Separator of the lists"
      }
    ]
  },
  "GraphChartOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Options of `createGraphChart`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "nodes",
        "type": "readonly GraphNode[]",
        "required": true,
        "description": "The nodes"
      },
      {
        "name": "edges",
        "type": "readonly GraphEdge[]",
        "required": true,
        "description": "The edges (unknown node ids are ignored)"
      },
      {
        "name": "groups",
        "type": "readonly GraphGroup[]",
        "required": false,
        "description": "Groups: legend order, names and colors (groups of the nodes are added)"
      },
      {
        "name": "layout",
        "type": "GraphLayoutType",
        "required": false,
        "default": "\"force\"",
        "description": "Placement of the nodes"
      },
      {
        "name": "direction",
        "type": "GraphDirection",
        "required": false,
        "description": "Direction of `dag` (default `TB`) and `tree` (default `LR`)"
      },
      {
        "name": "force",
        "type": "GraphForceOptions",
        "required": false,
        "description": "Force layout settings"
      },
      {
        "name": "dag",
        "type": "GraphDagOptions",
        "required": false,
        "description": "Layered layout settings"
      },
      {
        "name": "tree",
        "type": "GraphTreeOptions",
        "required": false,
        "description": "Tree layout settings"
      },
      {
        "name": "circular",
        "type": "GraphCircularOptions",
        "required": false,
        "description": "Circular / arc layout settings"
      },
      {
        "name": "nodeShape",
        "type": "GraphNodeShape",
        "required": false,
        "description": "Shape of the nodes without `shape`; boxes for `dag`, `org` and `mindmap`, circles otherwise"
      },
      {
        "name": "nodeSize",
        "type": "number | readonly [number, number]",
        "required": false,
        "default": "12, or [8, 36] when nodes have values",
        "description": "Circle diameter in layout units; `[min, max]` scales the area with the node `value`"
      },
      {
        "name": "edgeStyle",
        "type": "GraphEdgeStyle",
        "required": false,
        "description": "Edge shape; depends on the layout when omitted"
      },
      {
        "name": "edgeWidth",
        "type": "number | readonly [number, number]",
        "required": false,
        "default": "1.25, or [1, 5] when edges have values",
        "description": "Edge width in CSS pixels; `[min, max]` scales it with the edge `value`"
      },
      {
        "name": "edgeColor",
        "type": "\"neutral\" | \"source\" | \"target\"",
        "required": false,
        "default": "\"neutral\"",
        "description": "Edge colors: neutral, or tinted with the color of the source / target node"
      },
      {
        "name": "arrows",
        "type": "boolean",
        "required": false,
        "description": "Arrowheads on the edges without `directed`; on for `dag`, off otherwise"
      },
      {
        "name": "arrowStyle",
        "type": "\"open\" | \"filled\"",
        "required": false,
        "default": "\"open\"",
        "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color, which follows the theme and the highlight)"
      },
      {
        "name": "nodeLabels",
        "type": "boolean | \"auto\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Node labels: `auto` hides minor labels when zoomed out and labels that would overlap. Text inside boxes keeps a readable minimum size and is shortened with an ellipsis; it is hidden only when the box is too small for any text, or with `false`"
      },
      {
        "name": "edgeLabels",
        "type": "boolean | \"auto\" | \"hover\"",
        "required": false,
        "default": "\"auto\" (shown when zoomed in or highlighted)",
        "description": "Edge labels: always, only for the highlighted edges, or never"
      },
      {
        "name": "highlight",
        "type": "\"neighbors\" | \"lineage\" | \"none\"",
        "required": false,
        "description": "Hovering / focusing a node highlights its neighbors (`lineage`: all ancestors and descendants); `lineage` for `dag`"
      },
      {
        "name": "selected",
        "type": "readonly string[]",
        "required": false,
        "description": "Ids of the selected nodes (initial selection; `select()` changes it)"
      },
      {
        "name": "animation",
        "type": "boolean | number",
        "required": false,
        "default": "true (450 ms)",
        "description": "Animates layout and data changes (expand / collapse, new data); a number is the duration in ms"
      },
      {
        "name": "fitPadding",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Padding around the graph when fitting it in the view, in CSS pixels"
      },
      {
        "name": "controls",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Zoom buttons (zoom in, zoom out, fit) in a corner"
      },
      {
        "name": "legend",
        "type": "boolean | GraphLegendOptions",
        "required": false,
        "description": "Legend of the groups; shown by default when there are several groups"
      },
      {
        "name": "tooltip",
        "type": "boolean | GraphTooltipOptions",
        "required": false,
        "description": "Tooltip; `false` disables it"
      },
      {
        "name": "interaction",
        "type": "boolean | GraphInteractionOptions",
        "required": false,
        "description": "Pan / zoom / drag / select / keyboard; `false` makes the chart static"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D and skips GPUs running in software"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the groups without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Accessible name of the chart"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language (`<html lang>`), then the browser language",
        "description": "Language of the built-in texts (accessible summary, announcements, tooltip, buttons) and of the number formatting. Built-in texts exist in English, Chinese, Japanese and French; other languages fall back to English."
      },
      {
        "name": "labels",
        "type": "Partial<GraphChartLabels>",
        "required": false,
        "description": "Overrides of the built-in texts of the `locale`"
      }
    ]
  },
  "GraphChartInstance": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Chart created by `createGraphChart`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setOptions",
        "type": "(options: GraphChartOptions) => void",
        "required": true,
        "description": "Replaces the options (positions of the remaining nodes are kept and animated)"
      },
      {
        "name": "setData",
        "type": "(data: GraphData) => void",
        "required": true,
        "description": "Replaces the nodes, edges and groups"
      },
      {
        "name": "fit",
        "type": "(animate?: boolean) => void",
        "required": true,
        "description": "Fits the visible nodes in the view (animated by default)"
      },
      {
        "name": "focusNode",
        "type": "(id: string, options?: { zoom?: number; animate?: boolean }) => void",
        "required": true,
        "description": "Centers a node (and zooms to `zoom` when given); expands its collapsed ancestors"
      },
      {
        "name": "select",
        "type": "(ids: readonly string[] | string | null) => void",
        "required": true,
        "description": "Selects nodes (`null` / `[]` clears the selection)"
      },
      {
        "name": "getSelection",
        "type": "() => string[]",
        "required": true,
        "description": "Ids of the selected nodes"
      },
      {
        "name": "expand",
        "type": "(id?: string) => void",
        "required": true,
        "description": "Expands a node (all nodes without an id)"
      },
      {
        "name": "collapse",
        "type": "(id?: string) => void",
        "required": true,
        "description": "Collapses a node (all nodes with children without an id)"
      },
      {
        "name": "toggle",
        "type": "(id: string) => void",
        "required": true,
        "description": "Collapses an expanded node, expands a collapsed one"
      },
      {
        "name": "getPositions",
        "type": "() => Record<string, GraphPoint>",
        "required": true,
        "description": "Current positions of the nodes in layout units"
      },
      {
        "name": "relayout",
        "type": "() => void",
        "required": true,
        "description": "Computes the layout again (restarts the force simulation)"
      },
      {
        "name": "resize",
        "type": "() => void",
        "required": true,
        "description": "Measures the container again (a ResizeObserver does it automatically)"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend in use, `null` until ready"
      },
      {
        "name": "ready",
        "type": "Promise<ChartRendererKind | null>",
        "required": true,
        "description": "Resolves with the backend once the first frame can be drawn (`null` without canvas support)"
      },
      {
        "name": "refreshTheme",
        "type": "() => void",
        "required": true,
        "description": "Reads the CSS variables again (theme changes on `<html>` / `<body>` are detected automatically)"
      },
      {
        "name": "on",
        "type": "(type: K, listener: (event: GraphChartEventMap[K]) => void) => () => void",
        "required": true,
        "description": "Subscribes to an event; returns the unsubscribe function"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Removes the DOM, stops the simulation and frees the GPU resources"
      }
    ]
  },
  "GraphChartEventMap": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Events of a graph chart instance",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "hover",
        "type": "GraphHoverEvent | null",
        "required": true
      },
      {
        "name": "click",
        "type": "GraphHoverEvent",
        "required": true
      },
      {
        "name": "select",
        "type": "GraphSelectEvent",
        "required": true
      },
      {
        "name": "toggle",
        "type": "GraphToggleEvent",
        "required": true
      },
      {
        "name": "groupToggle",
        "type": "GraphGroupToggleEvent",
        "required": true
      },
      {
        "name": "layoutEnd",
        "type": "GraphLayoutEndEvent",
        "required": true
      },
      {
        "name": "renderer",
        "type": "ChartRendererKind",
        "required": true
      }
    ]
  },
  "GraphForceLayoutOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Options of `forceLayout` / `createForceSimulation`",
    "kind": "interface",
    "extends": [
      "GraphForceOptions"
    ],
    "props": [
      {
        "name": "radius",
        "type": "(node: GraphNode, index: number) => number",
        "required": false,
        "description": "Radius of each node (collisions); 6 when omitted"
      }
    ]
  },
  "GraphForceSimulation": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "A force simulation stepped by the caller",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "Float64Array",
        "required": true,
        "description": "Positions (updated in place)"
      },
      {
        "name": "y",
        "type": "Float64Array",
        "required": true
      },
      {
        "name": "tick",
        "type": "(count?: number) => boolean",
        "required": true,
        "description": "Runs `count` ticks (1 by default); returns whether the simulation is still hot"
      },
      {
        "name": "alpha",
        "type": "() => number",
        "required": true,
        "description": "Current alpha (temperature)"
      },
      {
        "name": "reheat",
        "type": "(alpha?: number) => void",
        "required": true,
        "description": "Restarts the cooling from `alpha` (0.3 by default)"
      },
      {
        "name": "drag",
        "type": "(index: number, x: number, y: number) => void",
        "required": true,
        "description": "Pins a node at a position (dragging) and keeps the simulation warm"
      },
      {
        "name": "release",
        "type": "(index: number, keep?: boolean) => void",
        "required": true,
        "description": "Releases a dragged node (`keep` leaves it pinned)"
      },
      {
        "name": "done",
        "type": "() => boolean",
        "required": true,
        "description": "Whether the simulation has cooled down"
      },
      {
        "name": "settle",
        "type": "() => void",
        "required": true,
        "description": "Pushes overlapping nodes apart (run after the last tick)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 弧线图

编程语言之间的影响关系：节点按语言家族排列在一条直线上，每个影响关系是其上方的一条弧线。悬停某种语言可查看它的上下游。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/arc.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Family = "systems" | "functional" | "objects" | "scripting";

const LANGUAGES: [string, Family, number][] = [
  ["Fortran", "systems", 1957],
  ["C", "systems", 1972],
  ["C++", "systems", 1985],
  ["Go", "systems", 2009],
  ["Rust", "systems", 2010],
  ["Lisp", "functional", 1958],
  ["ML", "functional", 1973],
  ["Scheme", "functional", 1975],
  ["Haskell", "functional", 1990],
  ["OCaml", "functional", 1996],
  ["Elixir", "functional", 2012],
  ["Simula", "objects", 1967],
  ["Smalltalk", "objects", 1972],
  ["Java", "objects", 1995],
  ["C#", "objects", 2000],
  ["Scala", "objects", 2004],
  ["Kotlin", "objects", 2011],
  ["Swift", "objects", 2014],
  ["Perl", "scripting", 1987],
  ["Python", "scripting", 1991],
  ["Ruby", "scripting", 1995],
  ["JavaScript", "scripting", 1995],
  ["TypeScript", "scripting", 2012],
];

// "a influenced b"
const INFLUENCES: [string, string][] = [
  ["Fortran", "C"],
  ["C", "C++"],
  ["C", "Go"],
  ["C++", "Rust"],
  ["C++", "Java"],
  ["C++", "C#"],
  ["Simula", "C++"],
  ["Simula", "Smalltalk"],
  ["Smalltalk", "Ruby"],
  ["Smalltalk", "Java"],
  ["Lisp", "Scheme"],
  ["Lisp", "Smalltalk"],
  ["Scheme", "JavaScript"],
  ["ML", "Haskell"],
  ["ML", "OCaml"],
  ["OCaml", "Rust"],
  ["Haskell", "Rust"],
  ["Haskell", "Scala"],
  ["Haskell", "Swift"],
  ["Java", "Scala"],
  ["Java", "Kotlin"],
  ["Java", "C#"],
  ["Scala", "Kotlin"],
  ["C#", "TypeScript"],
  ["JavaScript", "TypeScript"],
  ["Perl", "Ruby"],
  ["Perl", "Python"],
  ["Ruby", "Elixir"],
  ["Python", "Swift"],
  ["Ruby", "Swift"],
  ["Rust", "Swift"],
  ["C", "Python"],
  ["Lisp", "Python"],
];

const FAMILIES: Family[] = ["systems", "functional", "objects", "scripting"];

export default function ArcDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const nodes = useMemo(
    (): GraphNode[] =>
      LANGUAGES.map(([id, family, year]) => ({
        id,
        group: family,
        value: INFLUENCES.filter(([a]) => a === id).length + 1,
        subtitle: String(year),
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      INFLUENCES.map(([source, target]) => ({
        source,
        target,
        label: t("influenced"),
      })),
    [t],
  );
  const groups = useMemo(
    () => FAMILIES.map((id) => ({ id, name: t(`families.${id}`) })),
    [t],
  );

  return (
    <GraphChart
      nodes={nodes}
      edges={edges}
      groups={groups}
      layout="arc"
      edgeColor="source"
      edgeLabels="hover"
      height={420}
      ariaLabel={t("arcAria")}
    />
  );
}

```

## Example: 人物关系图

《三国演义》人物关系：按阵营着色、按重要程度决定大小，每条边标注关系。悬停人物查看其关系圈，悬停连线阅读关系，点击选中，并可在图例中切换阵营。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/characters.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphChart, type GraphHoverEvent } from "minerva-design/charts";
import { characterGraph } from "../data";

export default function CharactersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const data = useMemo(() => characterGraph(t), [t]);
  const [selected, setSelected] = useState<string[]>([]);
  const [hovered, setHovered] = useState<GraphHoverEvent | null>(null);

  const name = (id: string) =>
    data.nodes.find((node) => node.id === id)?.label ?? id;
  const status = hovered?.edge
    ? t("relationHint", {
        source: name(hovered.edge.source),
        target: name(hovered.edge.target),
        relation: hovered.edge.label,
      })
    : selected.length
      ? t("selectedHint", { name: selected.map(name).join(t("separator")) })
      : t("charactersHint");

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GraphChart
        nodes={data.nodes}
        edges={data.edges}
        groups={data.groups}
        height={520}
        nodeSize={[10, 34]}
        edgeColor="source"
        force={{ linkDistance: 80, charge: -420 }}
        ariaLabel={t("charactersAria")}
        onSelectionChange={setSelected}
        onHover={setHovered}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {status}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/graph-chart/data.ts

```tsx
// Data of the graph-chart demos: characters of Romance of the Three Kingdoms
// (三国演义), their factions and relationships, and a generated community
// network. Names and relation labels come from the page's locale file.

import type { GraphEdge, GraphGroup, GraphNode } from "minerva-design/charts";

export type Faction = "shu" | "wei" | "wu" | "qun";

/** id, faction, importance (node size) */
export const CHARACTERS: [string, Faction, number][] = [
  ["liubei", "shu", 10],
  ["guanyu", "shu", 9],
  ["zhangfei", "shu", 8],
  ["zhugeliang", "shu", 10],
  ["zhaoyun", "shu", 8],
  ["machao", "shu", 6],
  ["huangzhong", "shu", 6],
  ["pangtong", "shu", 5],
  ["jiangwei", "shu", 6],
  ["liushan", "shu", 5],
  ["weiyan", "shu", 5],
  ["fazheng", "shu", 4],
  ["caocao", "wei", 10],
  ["caopi", "wei", 7],
  ["simayi", "wei", 9],
  ["xiahoudun", "wei", 6],
  ["xiahouyuan", "wei", 5],
  ["zhangliao", "wei", 6],
  ["xuchu", "wei", 5],
  ["guojia", "wei", 5],
  ["xunyu", "wei", 5],
  ["dianwei", "wei", 4],
  ["caozhi", "wei", 4],
  ["simazhao", "wei", 5],
  ["dengai", "wei", 5],
  ["sunquan", "wu", 9],
  ["sunce", "wu", 7],
  ["sunjian", "wu", 6],
  ["zhouyu", "wu", 8],
  ["lusu", "wu", 6],
  ["lumeng", "wu", 6],
  ["luxun", "wu", 7],
  ["ganning", "wu", 5],
  ["huanggai", "wu", 4],
  ["xiaoqiao", "wu", 3],
  ["daqiao", "wu", 3],
  ["sunshangxiang", "wu", 4],
  ["lvbu", "qun", 8],
  ["dongzhuo", "qun", 6],
  ["diaochan", "qun", 5],
  ["yuanshao", "qun", 6],
  ["xiandi", "qun", 5],
  ["wangyun", "qun", 3],
];

export type Relation =
  | "brothers"
  | "serves"
  | "father"
  | "spouse"
  | "siblings"
  | "rival"
  | "mentor"
  | "adoptive"
  | "ally"
  | "defeated"
  | "friends";

/** source, target, relation; `serves` points from the vassal to the lord */
export const RELATIONS: [string, string, Relation][] = [
  ["liubei", "guanyu", "brothers"],
  ["liubei", "zhangfei", "brothers"],
  ["guanyu", "zhangfei", "brothers"],
  ["zhugeliang", "liubei", "serves"],
  ["zhaoyun", "liubei", "serves"],
  ["machao", "liubei", "serves"],
  ["huangzhong", "liubei", "serves"],
  ["pangtong", "liubei", "serves"],
  ["weiyan", "liubei", "serves"],
  ["fazheng", "liubei", "serves"],
  ["liubei", "liushan", "father"],
  ["liubei", "sunshangxiang", "spouse"],
  ["sunquan", "sunshangxiang", "siblings"],
  ["zhugeliang", "jiangwei", "mentor"],
  ["zhugeliang", "simayi", "rival"],
  ["zhugeliang", "zhouyu", "rival"],
  ["jiangwei", "dengai", "rival"],
  ["jiangwei", "liushan", "serves"],
  ["zhugeliang", "liushan", "serves"],
  ["caocao", "caopi", "father"],
  ["caocao", "caozhi", "father"],
  ["caopi", "caozhi", "siblings"],
  ["simayi", "caocao", "serves"],
  ["simayi", "caopi", "serves"],
  ["simayi", "simazhao", "father"],
  ["xiahoudun", "caocao", "serves"],
  ["xiahouyuan", "caocao", "serves"],
  ["zhangliao", "caocao", "serves"],
  ["xuchu", "caocao", "serves"],
  ["dianwei", "caocao", "serves"],
  ["guojia", "caocao", "serves"],
  ["xunyu", "caocao", "serves"],
  ["dengai", "simazhao", "serves"],
  ["caocao", "liubei", "rival"],
  ["caocao", "yuanshao", "defeated"],
  ["caocao", "lvbu", "defeated"],
  ["huangzhong", "xiahouyuan", "defeated"],
  ["zhangliao", "sunquan", "defeated"],
  ["lumeng", "guanyu", "defeated"],
  ["luxun", "liubei", "defeated"],
  ["zhouyu", "caocao", "defeated"],
  ["sunjian", "sunce", "father"],
  ["sunjian", "sunquan", "father"],
  ["sunce", "sunquan", "siblings"],
  ["sunce", "daqiao", "spouse"],
  ["zhouyu", "xiaoqiao", "spouse"],
  ["daqiao", "xiaoqiao", "siblings"],
  ["sunce", "zhouyu", "friends"],
  ["zhouyu", "sunquan", "serves"],
  ["lusu", "sunquan", "serves"],
  ["lumeng", "sunquan", "serves"],
  ["luxun", "sunquan", "serves"],
  ["ganning", "sunquan", "serves"],
  ["huanggai", "sunquan", "serves"],
  ["huanggai", "zhouyu", "serves"],
  ["liubei", "sunquan", "ally"],
  ["lusu", "zhugeliang", "ally"],
  ["lvbu", "dongzhuo", "adoptive"],
  ["lvbu", "diaochan", "spouse"],
  ["wangyun", "diaochan", "adoptive"],
  ["dongzhuo", "xiandi", "serves"],
  ["caocao", "xiandi", "serves"],
  ["yuanshao", "dongzhuo", "rival"],
  ["lvbu", "liubei", "rival"],
];

export const FACTIONS: Faction[] = ["shu", "wei", "wu", "qun"];

/** Faction colors (Shu green, Wei blue, Wu red, warlords amber) */
export const FACTION_COLORS: Record<Faction, string> = {
  shu: "var(--success-color, #16a34a)",
  wei: "var(--info-color, #0ea5e9)",
  wu: "var(--danger-color, #ef4444)",
  qun: "var(--warning-color, #f59e0b)",
};

type Translate = (key: string, options?: Record<string, unknown>) => string;

/** Nodes, edges and groups of the character network in the reader's language */
export const characterGraph = (
  t: Translate,
): { nodes: GraphNode[]; edges: GraphEdge[]; groups: GraphGroup[] } => ({
  nodes: CHARACTERS.map(([id, faction, importance]) => ({
    id,
    label: t(`characters.${id}`),
    group: faction,
    value: importance,
  })),
  edges: RELATIONS.map(([source, target, relation]) => ({
    source,
    target,
    label: t(`relations.${relation}`),
    directed: relation === "serves" || relation === "defeated",
    dashed: relation === "rival",
    data: relation,
  })),
  groups: FACTIONS.map((id) => ({
    id,
    name: t(`factions.${id}`),
    color: FACTION_COLORS[id],
  })),
});

/**
 * A large network: `communities` groups of `size` nodes, each a random
 * tree plus extra links inside the group and a few between groups
 * (seeded: the same graph on every render)
 */
export const communityGraph = (
  communities: number,
  size: number,
): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  for (let c = 0; c < communities; c++) {
    const base = c * size;
    for (let i = 0; i < size; i++) {
      const id = base + i;
      nodes.push({ id: String(id), group: `c${c % 8}` });
      if (i > 0) {
        // preferential attachment: hubs inside each community
        const parent = base + Math.floor(Math.pow(random(), 2.2) * i);
        edges.push({ source: String(parent), target: String(id) });
        const other = base + Math.floor(random() * size);
        if (other !== id)
          edges.push({ source: String(id), target: String(other) });
        if (random() < 0.12) {
          const third = base + Math.floor(random() * size);
          if (third !== id)
            edges.push({ source: String(id), target: String(third) });
        }
      }
    }
    // bridges to other communities
    for (let k = 0; k < 4; k++) {
      const a = base + Math.floor(random() * size);
      const b =
        Math.floor(random() * communities) * size + Math.floor(random() * size);
      if (Math.floor(b / size) !== c)
        edges.push({ source: String(a), target: String(b) });
    }
  }
  return { nodes, edges };
};

```

## Example: 环形布局

微服务之间的调用关系，按业务域沿圆周分组。边的粗细表示调用量，edgeColor="source" 以调用方的颜色着色，tension 让边经圆心汇聚成束。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/circular.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Domain = "edge" | "commerce" | "identity" | "data";

const SERVICES: [string, Domain][] = [
  ["gateway", "edge"],
  ["web-bff", "edge"],
  ["mobile-bff", "edge"],
  ["cdn-purge", "edge"],
  ["catalog", "commerce"],
  ["cart", "commerce"],
  ["checkout", "commerce"],
  ["pricing", "commerce"],
  ["inventory", "commerce"],
  ["shipping", "commerce"],
  ["auth", "identity"],
  ["users", "identity"],
  ["sessions", "identity"],
  ["permissions", "identity"],
  ["search", "data"],
  ["recommend", "data"],
  ["events", "data"],
  ["analytics", "data"],
  ["billing", "commerce"],
  ["notify", "data"],
];

// calls per minute between services (thousands)
const CALLS: [string, string, number][] = [
  ["gateway", "web-bff", 42],
  ["gateway", "mobile-bff", 31],
  ["gateway", "auth", 55],
  ["web-bff", "catalog", 24],
  ["web-bff", "cart", 12],
  ["web-bff", "search", 18],
  ["web-bff", "recommend", 9],
  ["mobile-bff", "catalog", 16],
  ["mobile-bff", "cart", 8],
  ["mobile-bff", "users", 6],
  ["cart", "pricing", 14],
  ["cart", "inventory", 9],
  ["checkout", "cart", 5],
  ["checkout", "billing", 4],
  ["checkout", "shipping", 3],
  ["checkout", "notify", 3],
  ["catalog", "pricing", 20],
  ["catalog", "inventory", 11],
  ["catalog", "cdn-purge", 1],
  ["auth", "users", 22],
  ["auth", "sessions", 38],
  ["auth", "permissions", 19],
  ["search", "catalog", 7],
  ["recommend", "analytics", 4],
  ["recommend", "catalog", 6],
  ["events", "analytics", 26],
  ["checkout", "events", 3],
  ["cart", "events", 6],
  ["billing", "users", 2],
  ["billing", "notify", 2],
  ["shipping", "notify", 2],
  ["users", "events", 3],
];

const DOMAINS: Domain[] = ["edge", "commerce", "identity", "data"];

export default function CircularDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [bundled, setBundled] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      SERVICES.map(([id, domain]) => ({
        id,
        group: domain,
        value: CALLS.filter(([a, b]) => a === id || b === id).reduce(
          (sum, [, , v]) => sum + v,
          0,
        ),
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      CALLS.map(([source, target, value]) => ({
        source,
        target,
        value,
        directed: true,
      })),
    [],
  );
  const groups = useMemo(
    () => DOMAINS.map((id) => ({ id, name: t(`domains.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={bundled}
        onChange={setBundled}
        label={t("bundleEdges")}
      />
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="circular"
        circular={{ tension: bundled ? 0.85 : 0 }}
        edgeColor="source"
        edgeWidth={[1, 6]}
        height={480}
        ariaLabel={t("circularAria")}
      />
    </div>
  );
}

```

## Example: 深色主题下的欺诈团伙

账户与其使用过的设备和银行卡相连；节点的 shape 把设备和银行卡画成方框。点击任意节点即可选中整个关联簇并评估风险。图表放在嵌套的 ConfigProvider 中，创建时读取其深色或浅色主题。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/fraud-ring.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "account" | "flagged" | "device" | "card";
type Risk = "low" | "medium" | "high";

// accounts and the devices / cards they used; two rings share them
const FLAGGED = new Set(["2101", "2102", "2103", "2104", "2105", "3301"]);
const USES: [string, string][] = [
  // ring 1: five accounts on two phones, three of them on the same card
  ["2101", "d:9F3C"],
  ["2102", "d:9F3C"],
  ["2103", "d:9F3C"],
  ["2104", "d:51AE"],
  ["2105", "d:51AE"],
  ["2103", "d:51AE"],
  ["2101", "c:4417"],
  ["2102", "c:4417"],
  ["2104", "c:4417"],
  // ring 2: four accounts paying with one card
  ["3301", "c:0932"],
  ["3302", "c:0932"],
  ["3303", "c:0932"],
  ["3304", "c:0932"],
  ["3301", "d:C7D0"],
  ["3302", "d:C7D0"],
  // regular customers; a couple shares a tablet
  ["1001", "d:0A11"],
  ["1001", "c:1188"],
  ["1002", "d:0B22"],
  ["1002", "c:2290"],
  ["1003", "d:0C33"],
  ["1004", "d:0C33"],
  ["1003", "c:3315"],
  ["1004", "c:3342"],
  ["1005", "d:0D44"],
  ["1005", "c:5561"],
  ["1006", "d:0E55"],
  ["1006", "c:6604"],
  ["1007", "d:0F66"],
  ["1007", "c:7719"],
  ["1008", "d:1A77"],
  ["1008", "c:8823"],
];

const KINDS: Kind[] = ["account", "flagged", "device", "card"];
const KIND_COLORS: Partial<Record<Kind, string>> = {
  flagged: "var(--danger-color, #ef4444)",
};

const kindOf = (id: string): Kind =>
  id.startsWith("d:")
    ? "device"
    : id.startsWith("c:")
      ? "card"
      : FLAGGED.has(id)
        ? "flagged"
        : "account";

/** Every node connected to `id` (accounts, devices and cards of its cluster) */
const clusterOf = (id: string) => {
  const seen = new Set([id]);
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of USES) {
      const next = a === current ? b : b === current ? a : null;
      if (next && !seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return [...seen];
};

export default function FraudRingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [dark, setDark] = useState(true);
  const [cluster, setCluster] = useState<string[]>([]);

  const nodes = useMemo((): GraphNode[] => {
    const ids = [...new Set(USES.flat())];
    return ids.map((id): GraphNode => {
      const kind = kindOf(id);
      const code = id.slice(2);
      return {
        id,
        group: kind,
        shape: kind === "device" || kind === "card" ? "box" : "circle",
        label:
          kind === "device"
            ? t("deviceLabel", { id: code })
            : kind === "card"
              ? t("cardLabel", { last4: code })
              : t("accountLabel", { id }),
      };
    });
  }, [t]);
  const edges = useMemo(
    (): GraphEdge[] =>
      USES.map(([source, target]) => ({
        source,
        target,
        label: t(target.startsWith("d:") ? "loggedInFrom" : "paidWith"),
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      KINDS.map((id) => ({
        id,
        name: t(`fraudKinds.${id}`),
        color: KIND_COLORS[id],
      })),
    [t],
  );

  const accounts = cluster.filter((id) => /^\d/.test(id)).length;
  const risk: Risk = accounts >= 4 ? "high" : accounts >= 2 ? "medium" : "low";

  return (
    <ConfigProvider theme={dark ? "dark" : "light"}>
      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <Switch checked={dark} onChange={setDark} label={t("darkTheme")} />
        <GraphChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          nodes={nodes}
          edges={edges}
          groups={groups}
          selected={cluster}
          interaction={{ select: false }}
          nodeSize={16}
          edgeLabels="hover"
          force={{ linkDistance: 40, charge: -220, seed: 11 }}
          height={460}
          ariaLabel={t("fraudAria")}
          onItemClick={(event) => {
            if (event.type === "node") setCluster(clusterOf(event.id));
          }}
        />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {cluster.length
            ? t("clusterReadout", {
                accounts,
                devices: cluster.filter((id) => id.startsWith("d:")).length,
                cards: cluster.filter((id) => id.startsWith("c:")).length,
                risk: t(`risk.${risk}`),
              })
            : t("fraudHint")}
        </output>
      </div>
    </ConfigProvider>
  );
}

```

## Example: 你可能认识的人

由四个圈子组成的社交网络。点击某人：按共同好友数对好友的好友排序，并通过受控的 selected 属性高亮此人及推荐对象；interaction={{ select: false }} 让点击只交给 onItemClick 处理。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/friend-suggestions.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphChart, type GraphNode } from "minerva-design/charts";

type Circle = "university" | "work" | "climbing" | "books";

const CIRCLES: Record<Circle, string[]> = {
  university: ["ana", "ben", "chen", "dara", "eli", "farah"],
  work: ["gus", "hana", "ivan", "jules", "kai", "lena"],
  climbing: ["mo", "nina", "omar", "priya", "quinn", "rosa"],
  books: ["sam", "tariq", "uma", "vik", "wen", "yuki"],
};

const FRIENDSHIPS: [string, string][] = [
  ["ana", "ben"],
  ["ana", "chen"],
  ["ana", "dara"],
  ["ben", "chen"],
  ["ben", "eli"],
  ["chen", "farah"],
  ["dara", "eli"],
  ["eli", "farah"],
  ["dara", "farah"],
  ["gus", "hana"],
  ["gus", "ivan"],
  ["hana", "jules"],
  ["ivan", "jules"],
  ["ivan", "kai"],
  ["jules", "lena"],
  ["kai", "lena"],
  ["hana", "kai"],
  ["mo", "nina"],
  ["mo", "omar"],
  ["nina", "priya"],
  ["omar", "priya"],
  ["omar", "quinn"],
  ["priya", "rosa"],
  ["quinn", "rosa"],
  ["nina", "quinn"],
  ["sam", "tariq"],
  ["sam", "uma"],
  ["tariq", "vik"],
  ["uma", "wen"],
  ["vik", "yuki"],
  ["wen", "yuki"],
  ["uma", "vik"],
  ["sam", "wen"],
  // friendships across circles
  ["ana", "gus"],
  ["ben", "hana"],
  ["eli", "mo"],
  ["farah", "nina"],
  ["lena", "sam"],
  ["kai", "omar"],
  ["rosa", "yuki"],
  ["chen", "uma"],
  ["jules", "priya"],
  ["dara", "tariq"],
];

const friendsOf = (id: string) =>
  new Set(
    FRIENDSHIPS.flatMap(([a, b]) => (a === id ? [b] : b === id ? [a] : [])),
  );

/** People you may know: friends of friends, ranked by the number of mutual friends */
const suggest = (id: string) => {
  const friends = friendsOf(id);
  const mutual = new Map<string, number>();
  for (const friend of friends)
    for (const candidate of friendsOf(friend))
      if (candidate !== id && !friends.has(candidate))
        mutual.set(candidate, (mutual.get(candidate) ?? 0) + 1);
  return [...mutual]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3);
};

export default function FriendSuggestionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [person, setPerson] = useState("ana");

  const nodes = useMemo(
    (): GraphNode[] =>
      (Object.keys(CIRCLES) as Circle[]).flatMap((circle) =>
        CIRCLES[circle].map((id) => ({
          id,
          label: `@${id}`,
          group: circle,
          value: friendsOf(id).size,
        })),
      ),
    [],
  );
  const edges = useMemo(
    () => FRIENDSHIPS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      (Object.keys(CIRCLES) as Circle[]).map((id) => ({
        id,
        name: t(`circles.${id}`),
      })),
    [t],
  );

  const suggestions = useMemo(() => suggest(person), [person]);
  // the person and the suggestions stay selected (highlighted)
  const selected = useMemo(
    () => [person, ...suggestions.map(([id]) => id)],
    [person, suggestions],
  );
  const list = new Intl.ListFormat(i18n.language, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        selected={selected}
        interaction={{ select: false }}
        nodeSize={[10, 24]}
        edgeColor="source"
        force={{ linkDistance: 50, charge: -260, seed: 4 }}
        height={460}
        ariaLabel={t("friendsAria")}
        onItemClick={(event) => {
          if (event.type === "node") setPerson(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {suggestions.length
          ? t("suggestions", {
              name: `@${person}`,
              list: list.format(
                suggestions.map(([id, count]) =>
                  t("suggestion", { name: `@${id}`, mutual: count }),
                ),
              ),
            })
          : t("noSuggestions", { name: `@${person}` })}{" "}
        {t("friendsHint")}
      </output>
    </div>
  );
}

```

## Example: 知识图谱搜索

物理学家、地点、机构和理论通过带名称的有向关系相连。在搜索框中输入并选择匹配项：selected 属性与 ref 上的 focusNode 会选中并居中该实体，相关事实用 Intl.ListFormat 列出。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/knowledge-graph.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input, Tag } from "minerva-design";
import {
  GraphChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "person" | "place" | "institution" | "concept";

const ENTITIES: [string, Kind][] = [
  ["curie", "person"],
  ["pierre", "person"],
  ["einstein", "person"],
  ["planck", "person"],
  ["bohr", "person"],
  ["heisenberg", "person"],
  ["meitner", "person"],
  ["hahn", "person"],
  ["noether", "person"],
  ["paris", "place"],
  ["warsaw", "place"],
  ["vienna", "place"],
  ["berlin", "place"],
  ["zurich", "place"],
  ["copenhagen", "place"],
  ["sorbonne", "institution"],
  ["kwg", "institution"],
  ["eth", "institution"],
  ["nbi", "institution"],
  ["radioactivity", "concept"],
  ["relativity", "concept"],
  ["quantum", "concept"],
  ["uncertainty", "concept"],
  ["fission", "concept"],
  ["symmetry", "concept"],
];

// subject, object, predicate: the triples of the knowledge graph
const TRIPLES: [string, string, string][] = [
  ["curie", "warsaw", "bornIn"],
  ["curie", "sorbonne", "workedAt"],
  ["curie", "pierre", "marriedTo"],
  ["curie", "radioactivity", "contributedTo"],
  ["pierre", "sorbonne", "workedAt"],
  ["pierre", "radioactivity", "contributedTo"],
  ["sorbonne", "paris", "locatedIn"],
  ["einstein", "eth", "studiedAt"],
  ["einstein", "kwg", "workedAt"],
  ["einstein", "relativity", "contributedTo"],
  ["einstein", "quantum", "contributedTo"],
  ["planck", "kwg", "workedAt"],
  ["planck", "quantum", "contributedTo"],
  ["planck", "einstein", "influenced"],
  ["eth", "zurich", "locatedIn"],
  ["kwg", "berlin", "locatedIn"],
  ["bohr", "nbi", "workedAt"],
  ["bohr", "quantum", "contributedTo"],
  ["bohr", "heisenberg", "influenced"],
  ["heisenberg", "nbi", "workedAt"],
  ["heisenberg", "uncertainty", "contributedTo"],
  ["uncertainty", "quantum", "partOf"],
  ["nbi", "copenhagen", "locatedIn"],
  ["meitner", "vienna", "bornIn"],
  ["meitner", "kwg", "workedAt"],
  ["meitner", "hahn", "collaborated"],
  ["meitner", "fission", "contributedTo"],
  ["hahn", "kwg", "workedAt"],
  ["hahn", "fission", "contributedTo"],
  ["noether", "symmetry", "contributedTo"],
  ["symmetry", "relativity", "relatedTo"],
];

const KINDS: Kind[] = ["person", "place", "institution", "concept"];

export default function KnowledgeGraphDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<GraphChartHandle>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const nodes = useMemo(
    (): GraphNode[] =>
      ENTITIES.map(([id, kind]) => ({
        id,
        label: t(`entities.${id}`),
        group: kind,
        value: TRIPLES.filter(([s, o]) => s === id || o === id).length,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      TRIPLES.map(([source, target, predicate]) => ({
        source,
        target,
        directed: true,
        label: t(`predicates.${predicate}`),
      })),
    [t],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`entityKinds.${id}`) })),
    [t],
  );

  const name = (id: string) => nodes.find((node) => node.id === id)?.label;
  const needle = query.trim().toLocaleLowerCase(locale);
  const matches = needle
    ? nodes.filter((node) =>
        node.label!.toLocaleLowerCase(locale).includes(needle),
      )
    : [];

  // select the entity and center it in the view
  const focus = (id: string) => {
    setSelected([id]);
    chart.current?.focusNode(id, { zoom: 1.6 });
  };

  const current = selected[0];
  const list = new Intl.ListFormat(locale, { style: "narrow", type: "unit" });
  const facts = current
    ? TRIPLES.filter(([s, o]) => s === current || o === current).map(
        ([s, o, predicate]) =>
          s === current
            ? t("factOut", {
                relation: t(`predicates.${predicate}`),
                name: name(o),
              })
            : t("factIn", {
                relation: t(`predicates.${predicate}`),
                name: name(s),
              }),
      )
    : [];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Input
        value={query}
        clearable
        onClear={() => setQuery("")}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && matches[0]) focus(matches[0].id);
        }}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchLabel")}
        style={{ maxWidth: 320 }}
      />
      {needle && (
        <HStack gap={6} wrap>
          {matches.length ? (
            matches.slice(0, 8).map((node) => (
              <Tag
                key={node.id}
                size="small"
                clickable
                pressed={current === node.id}
                onClick={() => focus(node.id)}
              >
                {node.label}
              </Tag>
            ))
          ) : (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("noMatch")}
            </span>
          )}
        </HStack>
      )}
      <GraphChart
        ref={chart}
        nodes={nodes}
        edges={edges}
        groups={groups}
        selected={selected}
        nodeSize={[12, 32]}
        arrows
        edgeLabels="auto"
        force={{ linkDistance: 70, charge: -520, seed: 7 }}
        height={500}
        ariaLabel={t("knowledgeAria")}
        onSelectionChange={setSelected}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {current
          ? t("factsReadout", {
              name: name(current),
              total: facts.length,
              facts: list.format(facts),
            })
          : t("knowledgeHint")}
      </output>
    </div>
  );
}

```

## Example: GPU 绘制一万个节点

40 个生成的社区：10,000 个节点、约 20,000 条连线。模拟在 Web Worker 中运行（worker="auto" 时超过 2,000 个节点即启用），GPU 每帧绘制；在你平移或缩放之前，视图会自动跟随布局。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/large-network.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphChart, type GraphNode } from "minerva-design/charts";
import { communityGraph } from "../data";

// 40 communities of 250 people: 10,000 nodes and about 20,000 links
const NETWORK = communityGraph(40, 250);

export default function LargeNetworkDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [renderer, setRenderer] = useState<string>("…");
  const [done, setDone] = useState(false);
  const [started] = useState(() => performance.now());
  const [seconds, setSeconds] = useState(0);

  const nodes = useMemo(
    (): GraphNode[] =>
      NETWORK.nodes.map((node) => ({
        ...node,
        label: t("member", { id: node.id }),
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: `c${i}`,
        name: t("community", { n: i + 1 }),
      })),
    [t],
  );
  const format = new Intl.NumberFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GraphChart
        nodes={nodes}
        edges={NETWORK.edges}
        groups={groups}
        height={540}
        nodeSize={6}
        edgeWidth={0.6}
        legend={false}
        force={{ linkDistance: 14, charge: -40, gravity: 0.06, worker: "auto" }}
        ariaLabel={t("largeAria")}
        onRendererChange={setRenderer}
        onLayoutEnd={() => {
          setDone(true);
          setSeconds((performance.now() - started) / 1000);
        }}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t("largeStatus", {
          nodes: format.format(NETWORK.nodes.length),
          edges: format.format(NETWORK.edges.length),
          renderer,
        })}{" "}
        {done
          ? t("largeDone", {
              seconds: new Intl.NumberFormat(i18n.language, {
                maximumFractionDigits: 1,
              }).format(seconds),
            })
          : t("largeRunning")}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/graph-chart/data.ts

```tsx
// Data of the graph-chart demos: characters of Romance of the Three Kingdoms
// (三国演义), their factions and relationships, and a generated community
// network. Names and relation labels come from the page's locale file.

import type { GraphEdge, GraphGroup, GraphNode } from "minerva-design/charts";

export type Faction = "shu" | "wei" | "wu" | "qun";

/** id, faction, importance (node size) */
export const CHARACTERS: [string, Faction, number][] = [
  ["liubei", "shu", 10],
  ["guanyu", "shu", 9],
  ["zhangfei", "shu", 8],
  ["zhugeliang", "shu", 10],
  ["zhaoyun", "shu", 8],
  ["machao", "shu", 6],
  ["huangzhong", "shu", 6],
  ["pangtong", "shu", 5],
  ["jiangwei", "shu", 6],
  ["liushan", "shu", 5],
  ["weiyan", "shu", 5],
  ["fazheng", "shu", 4],
  ["caocao", "wei", 10],
  ["caopi", "wei", 7],
  ["simayi", "wei", 9],
  ["xiahoudun", "wei", 6],
  ["xiahouyuan", "wei", 5],
  ["zhangliao", "wei", 6],
  ["xuchu", "wei", 5],
  ["guojia", "wei", 5],
  ["xunyu", "wei", 5],
  ["dianwei", "wei", 4],
  ["caozhi", "wei", 4],
  ["simazhao", "wei", 5],
  ["dengai", "wei", 5],
  ["sunquan", "wu", 9],
  ["sunce", "wu", 7],
  ["sunjian", "wu", 6],
  ["zhouyu", "wu", 8],
  ["lusu", "wu", 6],
  ["lumeng", "wu", 6],
  ["luxun", "wu", 7],
  ["ganning", "wu", 5],
  ["huanggai", "wu", 4],
  ["xiaoqiao", "wu", 3],
  ["daqiao", "wu", 3],
  ["sunshangxiang", "wu", 4],
  ["lvbu", "qun", 8],
  ["dongzhuo", "qun", 6],
  ["diaochan", "qun", 5],
  ["yuanshao", "qun", 6],
  ["xiandi", "qun", 5],
  ["wangyun", "qun", 3],
];

export type Relation =
  | "brothers"
  | "serves"
  | "father"
  | "spouse"
  | "siblings"
  | "rival"
  | "mentor"
  | "adoptive"
  | "ally"
  | "defeated"
  | "friends";

/** source, target, relation; `serves` points from the vassal to the lord */
export const RELATIONS: [string, string, Relation][] = [
  ["liubei", "guanyu", "brothers"],
  ["liubei", "zhangfei", "brothers"],
  ["guanyu", "zhangfei", "brothers"],
  ["zhugeliang", "liubei", "serves"],
  ["zhaoyun", "liubei", "serves"],
  ["machao", "liubei", "serves"],
  ["huangzhong", "liubei", "serves"],
  ["pangtong", "liubei", "serves"],
  ["weiyan", "liubei", "serves"],
  ["fazheng", "liubei", "serves"],
  ["liubei", "liushan", "father"],
  ["liubei", "sunshangxiang", "spouse"],
  ["sunquan", "sunshangxiang", "siblings"],
  ["zhugeliang", "jiangwei", "mentor"],
  ["zhugeliang", "simayi", "rival"],
  ["zhugeliang", "zhouyu", "rival"],
  ["jiangwei", "dengai", "rival"],
  ["jiangwei", "liushan", "serves"],
  ["zhugeliang", "liushan", "serves"],
  ["caocao", "caopi", "father"],
  ["caocao", "caozhi", "father"],
  ["caopi", "caozhi", "siblings"],
  ["simayi", "caocao", "serves"],
  ["simayi", "caopi", "serves"],
  ["simayi", "simazhao", "father"],
  ["xiahoudun", "caocao", "serves"],
  ["xiahouyuan", "caocao", "serves"],
  ["zhangliao", "caocao", "serves"],
  ["xuchu", "caocao", "serves"],
  ["dianwei", "caocao", "serves"],
  ["guojia", "caocao", "serves"],
  ["xunyu", "caocao", "serves"],
  ["dengai", "simazhao", "serves"],
  ["caocao", "liubei", "rival"],
  ["caocao", "yuanshao", "defeated"],
  ["caocao", "lvbu", "defeated"],
  ["huangzhong", "xiahouyuan", "defeated"],
  ["zhangliao", "sunquan", "defeated"],
  ["lumeng", "guanyu", "defeated"],
  ["luxun", "liubei", "defeated"],
  ["zhouyu", "caocao", "defeated"],
  ["sunjian", "sunce", "father"],
  ["sunjian", "sunquan", "father"],
  ["sunce", "sunquan", "siblings"],
  ["sunce", "daqiao", "spouse"],
  ["zhouyu", "xiaoqiao", "spouse"],
  ["daqiao", "xiaoqiao", "siblings"],
  ["sunce", "zhouyu", "friends"],
  ["zhouyu", "sunquan", "serves"],
  ["lusu", "sunquan", "serves"],
  ["lumeng", "sunquan", "serves"],
  ["luxun", "sunquan", "serves"],
  ["ganning", "sunquan", "serves"],
  ["huanggai", "sunquan", "serves"],
  ["huanggai", "zhouyu", "serves"],
  ["liubei", "sunquan", "ally"],
  ["lusu", "zhugeliang", "ally"],
  ["lvbu", "dongzhuo", "adoptive"],
  ["lvbu", "diaochan", "spouse"],
  ["wangyun", "diaochan", "adoptive"],
  ["dongzhuo", "xiandi", "serves"],
  ["caocao", "xiandi", "serves"],
  ["yuanshao", "dongzhuo", "rival"],
  ["lvbu", "liubei", "rival"],
];

export const FACTIONS: Faction[] = ["shu", "wei", "wu", "qun"];

/** Faction colors (Shu green, Wei blue, Wu red, warlords amber) */
export const FACTION_COLORS: Record<Faction, string> = {
  shu: "var(--success-color, #16a34a)",
  wei: "var(--info-color, #0ea5e9)",
  wu: "var(--danger-color, #ef4444)",
  qun: "var(--warning-color, #f59e0b)",
};

type Translate = (key: string, options?: Record<string, unknown>) => string;

/** Nodes, edges and groups of the character network in the reader's language */
export const characterGraph = (
  t: Translate,
): { nodes: GraphNode[]; edges: GraphEdge[]; groups: GraphGroup[] } => ({
  nodes: CHARACTERS.map(([id, faction, importance]) => ({
    id,
    label: t(`characters.${id}`),
    group: faction,
    value: importance,
  })),
  edges: RELATIONS.map(([source, target, relation]) => ({
    source,
    target,
    label: t(`relations.${relation}`),
    directed: relation === "serves" || relation === "defeated",
    dashed: relation === "rival",
    data: relation,
  })),
  groups: FACTIONS.map((id) => ({
    id,
    name: t(`factions.${id}`),
    color: FACTION_COLORS[id],
  })),
});

/**
 * A large network: `communities` groups of `size` nodes, each a random
 * tree plus extra links inside the group and a few between groups
 * (seeded: the same graph on every render)
 */
export const communityGraph = (
  communities: number,
  size: number,
): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  for (let c = 0; c < communities; c++) {
    const base = c * size;
    for (let i = 0; i < size; i++) {
      const id = base + i;
      nodes.push({ id: String(id), group: `c${c % 8}` });
      if (i > 0) {
        // preferential attachment: hubs inside each community
        const parent = base + Math.floor(Math.pow(random(), 2.2) * i);
        edges.push({ source: String(parent), target: String(id) });
        const other = base + Math.floor(random() * size);
        if (other !== id)
          edges.push({ source: String(id), target: String(other) });
        if (random() < 0.12) {
          const third = base + Math.floor(random() * size);
          if (third !== id)
            edges.push({ source: String(id), target: String(third) });
        }
      }
    }
    // bridges to other communities
    for (let k = 0; k < 4; k++) {
      const a = base + Math.floor(random() * size);
      const b =
        Math.floor(random() * communities) * size + Math.floor(random() * size);
      if (Math.floor(b / size) !== c)
        edges.push({ source: String(a), target: String(b) });
    }
  }
  return { nodes, edges };
};

```

## Example: 实时服务拓扑

在线商城的各个服务通过 layout="none"（节点 x / y）手动摆放，实时更新时位置不会变化。每 1.5 秒生成一次新采样：服务按健康状态分组重新着色，副标题中的 p95 延迟随之更新；edgeColor="target" 让调用故障服务的连线带上其颜色。点击服务可查看指标。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/service-map.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Health = "healthy" | "degraded" | "critical";

// service, column, row, typical p95 latency (ms): hand-placed with layout="none"
const SERVICES: [string, number, number, number][] = [
  ["ingress", 0, 1.5, 12],
  ["web", 1, 0.5, 45],
  ["mobile-api", 1, 2.5, 50],
  ["orders", 2, 0, 80],
  ["payments", 2, 1, 110],
  ["search", 2, 2, 60],
  ["accounts", 2, 3, 35],
  ["postgres", 3, 0.5, 8],
  ["kafka", 3, 1.5, 5],
  ["elastic", 3, 2.5, 25],
  ["redis", 3, 3.5, 2],
];

// caller, callee, requests per second
const CALLS: [string, string, number][] = [
  ["ingress", "web", 1800],
  ["ingress", "mobile-api", 1200],
  ["web", "orders", 420],
  ["web", "search", 900],
  ["web", "accounts", 380],
  ["mobile-api", "orders", 310],
  ["mobile-api", "payments", 160],
  ["mobile-api", "accounts", 290],
  ["mobile-api", "search", 400],
  ["orders", "payments", 240],
  ["orders", "postgres", 650],
  ["orders", "kafka", 240],
  ["payments", "postgres", 310],
  ["payments", "kafka", 150],
  ["search", "elastic", 1300],
  ["accounts", "redis", 900],
  ["accounts", "postgres", 120],
];

const HEALTH: Health[] = ["healthy", "degraded", "critical"];
const HEALTH_COLORS: Record<Health, string> = {
  healthy: "var(--success-color, #16a34a)",
  degraded: "var(--warning-color, #f59e0b)",
  critical: "var(--danger-color, #ef4444)",
};

interface Metrics {
  latency: number;
  /** error rate in percent */
  errors: number;
  health: Health;
}

/** Metrics of every service at sample `tick`: seeded jitter plus an incident on payments that comes and goes */
const sample = (tick: number): Record<string, Metrics> => {
  const random = mulberry32(1000 + tick);
  const incident = Math.max(0, Math.sin(tick / 3));
  const metrics: Record<string, Metrics> = {};
  for (const [id, , , base] of SERVICES) {
    const hit =
      id === "payments" ? incident : id === "orders" ? incident * 0.4 : 0;
    const latency = Math.round(base * (0.85 + random() * 0.3) * (1 + hit * 4));
    const errors = Math.round((0.1 + random() * 0.4 + hit * 9) * 10) / 10;
    const health: Health =
      errors >= 5 || latency >= 500
        ? "critical"
        : errors >= 1 || latency >= 200
          ? "degraded"
          : "healthy";
    metrics[id] = { latency, errors, health };
  }
  return metrics;
};

/** Requests per second handled by a service (the entry point: what it sends) */
const traffic = (id: string) => {
  const sum = (side: 0 | 1) =>
    CALLS.filter((call) => call[side] === id).reduce((s, c) => s + c[2], 0);
  return sum(1) || sum(0);
};

export default function ServiceMapDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [tick, setTick] = useState(0);
  const [updated, setUpdated] = useState(() => new Date());
  const [selected, setSelected] = useState<string | null>(null);

  // a new sample every 1.5 s while live; the interval stops on unmount
  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setTick((n) => n + 1);
      setUpdated(new Date());
    }, 1500);
    return () => window.clearInterval(timer);
  }, [live]);

  const metrics = useMemo(() => sample(tick), [tick]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const time = useMemo(
    () => new Intl.DateTimeFormat(locale, { timeStyle: "medium" }),
    [locale],
  );

  // positions never change: only the colors and subtitles follow the samples
  const nodes = useMemo(
    (): GraphNode[] =>
      SERVICES.map(([id, column, row]) => ({
        id,
        label: id,
        subtitle: t("latency", { value: number.format(metrics[id]!.latency) }),
        group: metrics[id]!.health,
        x: column * 220,
        y: row * 90,
      })),
    [t, number, metrics],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      CALLS.map(([source, target, rps]) => ({
        source,
        target,
        value: rps,
        label: t("rps", { value: compact.format(rps) }),
      })),
    [t, compact],
  );
  const groups = useMemo(
    () =>
      HEALTH.map((id) => ({
        id,
        name: t(`health.${id}`),
        color: HEALTH_COLORS[id],
      })),
    [t],
  );

  const counts = HEALTH.map(
    (h) => SERVICES.filter(([id]) => metrics[id]!.health === h).length,
  );
  const current = selected ? metrics[selected] : undefined;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("liveUpdates")} />
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="none"
        nodeShape="box"
        arrows
        arrowStyle="filled"
        edgeStyle="curve"
        edgeWidth={[1, 5]}
        edgeColor="target"
        edgeLabels="hover"
        animation={300}
        height={440}
        ariaLabel={t("serviceMapAria")}
        onSelectionChange={(ids) => setSelected(ids[0] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {selected && current
          ? t("serviceReadout", {
              name: selected,
              status: t(`health.${current.health}`),
              latency: number.format(current.latency),
              errors: percent.format(current.errors / 100),
              rps: compact.format(traffic(selected)),
            })
          : t("serviceHint")}{" "}
        {t("serviceCounts", {
          healthy: counts[0],
          degraded: counts[1],
          critical: counts[2],
          time: time.format(updated),
        })}
      </output>
    </div>
  );
}

```

## Example: 状态机：箭头、平行边与自环

订单状态及其之间的事件。同一对状态之间可能有多个事件（方向任意），每条边各自弯出不同的弧度；不改变状态的事件以自环绘制在节点的空闲一侧。arrowStyle="filled" 以边的颜色绘制实心箭头，在所有渲染后端上都跟随主题与高亮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/transitions.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Stage = "open" | "fulfilment" | "closed";

const STATES: [string, Stage][] = [
  ["cart", "open"],
  ["pending", "open"],
  ["paid", "fulfilment"],
  ["shipped", "fulfilment"],
  ["delivered", "closed"],
  ["refunded", "closed"],
  ["cancelled", "closed"],
];

// several events can join the same two states (parallel edges, either
// direction), and some events keep the state (self-loops)
const EVENTS: [string, string, string][] = [
  ["cart", "pending", "checkout"],
  ["pending", "cart", "edit"],
  ["pending", "paid", "pay"],
  ["pending", "pending", "retry"],
  ["pending", "cancelled", "timeout"],
  ["pending", "cancelled", "cancel"],
  ["paid", "pending", "reverse"],
  ["paid", "shipped", "ship"],
  ["paid", "refunded", "refund"],
  ["shipped", "shipped", "track"],
  ["shipped", "delivered", "deliver"],
  ["shipped", "paid", "bounce"],
  ["delivered", "refunded", "return"],
  ["delivered", "delivered", "review"],
];

const STAGES: Stage[] = ["open", "fulfilment", "closed"];

export default function TransitionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [filled, setFilled] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      STATES.map(([id, stage]) => ({
        id,
        label: t(`states.${id}`),
        group: stage,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      EVENTS.map(([source, target, event]) => ({
        source,
        target,
        label: t(`events.${event}`),
      })),
    [t],
  );
  const groups = useMemo(
    () => STAGES.map((id) => ({ id, name: t(`stages.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={filled} onChange={setFilled} label={t("filledArrows")} />
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        height={460}
        nodeSize={22}
        arrows
        arrowStyle={filled ? "filled" : "open"}
        edgeWidth={1.5}
        edgeLabels
        force={{ linkDistance: 110, charge: -900, seed: 3 }}
        ariaLabel={t("transitionsAria")}
      />
    </div>
  );
}

```

## Example: 核心引擎

不依赖 React，直接使用 minerva-design/charts/core 的 createGraphChart：通过 setOptions 切换布局，监听 click 和 layoutEnd 事件，并用 focusNode 将点击的节点居中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/demos/vanilla.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  createGraphChart,
  type GraphChartInstance,
  type GraphChartOptions,
  type GraphLayoutType,
} from "minerva-design/charts/core";
import { characterGraph } from "../data";

const LAYOUTS: GraphLayoutType[] = ["force", "circular", "arc"];

export default function VanillaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<GraphChartInstance | null>(null);
  const status = useRef<HTMLSpanElement>(null);
  const [layout, setLayout] = useState<GraphLayoutType>("force");
  const layoutRef = useRef(layout);

  const optionsFor = (next: GraphLayoutType): GraphChartOptions => ({
    ...characterGraph(t),
    layout: next,
    nodeSize: [8, 28],
    edgeLabels: "hover",
    locale: i18n.language,
    ariaLabel: t("charactersAria"),
  });
  const optionsRef = useRef(optionsFor);

  useEffect(() => {
    layoutRef.current = layout;
    optionsRef.current = optionsFor;
  });

  useEffect(() => {
    if (!container.current) return;
    // the framework-free engine: a container, options, events, destroy
    const instance = createGraphChart(
      container.current,
      optionsRef.current(layoutRef.current),
    );
    chart.current = instance;
    const offs = [
      instance.on("click", (event) => {
        if (!status.current || event.type !== "node") return;
        status.current.textContent = t("vanillaClick", {
          name: event.node?.label ?? event.id,
          links: event.degree ?? 0,
        });
        instance.focusNode(event.id, { zoom: 1.4 });
      }),
      instance.on("layoutEnd", (event) => {
        if (status.current)
          status.current.textContent = t("vanillaLayout", {
            layout: t(`layouts.${event.layout}`),
          });
      }),
    ];
    return () => {
      offs.forEach((off) => off());
      instance.destroy();
      chart.current = null;
    };
  }, [t, i18n.language]);

  const change = (next: GraphLayoutType) => {
    setLayout(next);
    chart.current?.setOptions(optionsFor(next));
    chart.current?.fit();
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("layoutLabel")}
        direction="horizontal"
        value={layout}
        onChange={(value) => change(value as GraphLayoutType)}
      >
        {LAYOUTS.map((value) => (
          <Radio key={value} value={value} label={t(`layouts.${value}`)} />
        ))}
      </RadioGroup>
      <div ref={container} style={{ height: 440 }} />
      <span
        ref={status}
        role="status"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("vanillaHint")}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/graph-chart/data.ts

```tsx
// Data of the graph-chart demos: characters of Romance of the Three Kingdoms
// (三国演义), their factions and relationships, and a generated community
// network. Names and relation labels come from the page's locale file.

import type { GraphEdge, GraphGroup, GraphNode } from "minerva-design/charts";

export type Faction = "shu" | "wei" | "wu" | "qun";

/** id, faction, importance (node size) */
export const CHARACTERS: [string, Faction, number][] = [
  ["liubei", "shu", 10],
  ["guanyu", "shu", 9],
  ["zhangfei", "shu", 8],
  ["zhugeliang", "shu", 10],
  ["zhaoyun", "shu", 8],
  ["machao", "shu", 6],
  ["huangzhong", "shu", 6],
  ["pangtong", "shu", 5],
  ["jiangwei", "shu", 6],
  ["liushan", "shu", 5],
  ["weiyan", "shu", 5],
  ["fazheng", "shu", 4],
  ["caocao", "wei", 10],
  ["caopi", "wei", 7],
  ["simayi", "wei", 9],
  ["xiahoudun", "wei", 6],
  ["xiahouyuan", "wei", 5],
  ["zhangliao", "wei", 6],
  ["xuchu", "wei", 5],
  ["guojia", "wei", 5],
  ["xunyu", "wei", 5],
  ["dianwei", "wei", 4],
  ["caozhi", "wei", 4],
  ["simazhao", "wei", 5],
  ["dengai", "wei", 5],
  ["sunquan", "wu", 9],
  ["sunce", "wu", 7],
  ["sunjian", "wu", 6],
  ["zhouyu", "wu", 8],
  ["lusu", "wu", 6],
  ["lumeng", "wu", 6],
  ["luxun", "wu", 7],
  ["ganning", "wu", 5],
  ["huanggai", "wu", 4],
  ["xiaoqiao", "wu", 3],
  ["daqiao", "wu", 3],
  ["sunshangxiang", "wu", 4],
  ["lvbu", "qun", 8],
  ["dongzhuo", "qun", 6],
  ["diaochan", "qun", 5],
  ["yuanshao", "qun", 6],
  ["xiandi", "qun", 5],
  ["wangyun", "qun", 3],
];

export type Relation =
  | "brothers"
  | "serves"
  | "father"
  | "spouse"
  | "siblings"
  | "rival"
  | "mentor"
  | "adoptive"
  | "ally"
  | "defeated"
  | "friends";

/** source, target, relation; `serves` points from the vassal to the lord */
export const RELATIONS: [string, string, Relation][] = [
  ["liubei", "guanyu", "brothers"],
  ["liubei", "zhangfei", "brothers"],
  ["guanyu", "zhangfei", "brothers"],
  ["zhugeliang", "liubei", "serves"],
  ["zhaoyun", "liubei", "serves"],
  ["machao", "liubei", "serves"],
  ["huangzhong", "liubei", "serves"],
  ["pangtong", "liubei", "serves"],
  ["weiyan", "liubei", "serves"],
  ["fazheng", "liubei", "serves"],
  ["liubei", "liushan", "father"],
  ["liubei", "sunshangxiang", "spouse"],
  ["sunquan", "sunshangxiang", "siblings"],
  ["zhugeliang", "jiangwei", "mentor"],
  ["zhugeliang", "simayi", "rival"],
  ["zhugeliang", "zhouyu", "rival"],
  ["jiangwei", "dengai", "rival"],
  ["jiangwei", "liushan", "serves"],
  ["zhugeliang", "liushan", "serves"],
  ["caocao", "caopi", "father"],
  ["caocao", "caozhi", "father"],
  ["caopi", "caozhi", "siblings"],
  ["simayi", "caocao", "serves"],
  ["simayi", "caopi", "serves"],
  ["simayi", "simazhao", "father"],
  ["xiahoudun", "caocao", "serves"],
  ["xiahouyuan", "caocao", "serves"],
  ["zhangliao", "caocao", "serves"],
  ["xuchu", "caocao", "serves"],
  ["dianwei", "caocao", "serves"],
  ["guojia", "caocao", "serves"],
  ["xunyu", "caocao", "serves"],
  ["dengai", "simazhao", "serves"],
  ["caocao", "liubei", "rival"],
  ["caocao", "yuanshao", "defeated"],
  ["caocao", "lvbu", "defeated"],
  ["huangzhong", "xiahouyuan", "defeated"],
  ["zhangliao", "sunquan", "defeated"],
  ["lumeng", "guanyu", "defeated"],
  ["luxun", "liubei", "defeated"],
  ["zhouyu", "caocao", "defeated"],
  ["sunjian", "sunce", "father"],
  ["sunjian", "sunquan", "father"],
  ["sunce", "sunquan", "siblings"],
  ["sunce", "daqiao", "spouse"],
  ["zhouyu", "xiaoqiao", "spouse"],
  ["daqiao", "xiaoqiao", "siblings"],
  ["sunce", "zhouyu", "friends"],
  ["zhouyu", "sunquan", "serves"],
  ["lusu", "sunquan", "serves"],
  ["lumeng", "sunquan", "serves"],
  ["luxun", "sunquan", "serves"],
  ["ganning", "sunquan", "serves"],
  ["huanggai", "sunquan", "serves"],
  ["huanggai", "zhouyu", "serves"],
  ["liubei", "sunquan", "ally"],
  ["lusu", "zhugeliang", "ally"],
  ["lvbu", "dongzhuo", "adoptive"],
  ["lvbu", "diaochan", "spouse"],
  ["wangyun", "diaochan", "adoptive"],
  ["dongzhuo", "xiandi", "serves"],
  ["caocao", "xiandi", "serves"],
  ["yuanshao", "dongzhuo", "rival"],
  ["lvbu", "liubei", "rival"],
];

export const FACTIONS: Faction[] = ["shu", "wei", "wu", "qun"];

/** Faction colors (Shu green, Wei blue, Wu red, warlords amber) */
export const FACTION_COLORS: Record<Faction, string> = {
  shu: "var(--success-color, #16a34a)",
  wei: "var(--info-color, #0ea5e9)",
  wu: "var(--danger-color, #ef4444)",
  qun: "var(--warning-color, #f59e0b)",
};

type Translate = (key: string, options?: Record<string, unknown>) => string;

/** Nodes, edges and groups of the character network in the reader's language */
export const characterGraph = (
  t: Translate,
): { nodes: GraphNode[]; edges: GraphEdge[]; groups: GraphGroup[] } => ({
  nodes: CHARACTERS.map(([id, faction, importance]) => ({
    id,
    label: t(`characters.${id}`),
    group: faction,
    value: importance,
  })),
  edges: RELATIONS.map(([source, target, relation]) => ({
    source,
    target,
    label: t(`relations.${relation}`),
    directed: relation === "serves" || relation === "defeated",
    dashed: relation === "rival",
    data: relation,
  })),
  groups: FACTIONS.map((id) => ({
    id,
    name: t(`factions.${id}`),
    color: FACTION_COLORS[id],
  })),
});

/**
 * A large network: `communities` groups of `size` nodes, each a random
 * tree plus extra links inside the group and a few between groups
 * (seeded: the same graph on every render)
 */
export const communityGraph = (
  communities: number,
  size: number,
): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  for (let c = 0; c < communities; c++) {
    const base = c * size;
    for (let i = 0; i < size; i++) {
      const id = base + i;
      nodes.push({ id: String(id), group: `c${c % 8}` });
      if (i > 0) {
        // preferential attachment: hubs inside each community
        const parent = base + Math.floor(Math.pow(random(), 2.2) * i);
        edges.push({ source: String(parent), target: String(id) });
        const other = base + Math.floor(random() * size);
        if (other !== id)
          edges.push({ source: String(id), target: String(other) });
        if (random() < 0.12) {
          const third = base + Math.floor(random() * size);
          if (third !== id)
            edges.push({ source: String(id), target: String(third) });
        }
      }
    }
    // bridges to other communities
    for (let k = 0; k < 4; k++) {
      const a = base + Math.floor(random() * size);
      const b =
        Math.floor(random() * communities) * size + Math.floor(random() * size);
      if (Math.floor(b / size) !== c)
        edges.push({ source: String(a), target: String(b) });
    }
  }
  return { nodes, edges };
};

```
