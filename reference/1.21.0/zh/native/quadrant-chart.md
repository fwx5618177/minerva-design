# 四象限图

四象限矩阵（优先级、艾森豪威尔、BCG……），象限带底色和标题，点带标签。

Package: minerva-design@1.21.0

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

深色模式

单点登录

CSV 导出

离线同步

新图标

插件 API

自定义字体

提示框

重写

搜索

速赢

大投入

填空

耗时项

无底洞

投入

影响

功能

按投入和影响排列的功能

{{feature}}：投入 {{effort}}，影响 {{impact}}

点按一个功能

修复登录故障

报税

季度规划

辅导新人

预订差旅

大部分会议

清空收件箱

社交媒体

立即做

计划做

委派

删除

紧急程度

重要程度

任务

任务的艾森豪威尔矩阵

{{task}}：紧急程度 {{urgency}}，重要程度 {{importance}}

点击一个任务

任务 {{n}}

已将{{task}}添加到“{{quadrant}}”

向“{{quadrant}}”添加任务

重要

不重要

紧急

不紧急

已将{{task}}移到“{{quadrant}}”

正在将{{task}}移到“{{quadrant}}”

已保存{{task}}，位于“{{quadrant}}”

已删除{{task}}

编辑{{task}}

任务名称

象限

保存

取消

删除

紧急程度 {{urgency}} · 重要程度 {{importance}}

任务矩阵：在象限之间拖动任务

把任务拖到另一个象限，双击编辑，或点击空白处添加任务

点按了“{{quadrant}}”

把任务拖到另一个象限

立即做

安排时间

交给别人

不做

{{count}} 项 · {{time}}

{{count}} 项 · {{time}}

已选中：{{task}}

点击任务即可选中，也可以拖动。键盘：Tab 到任务后按 Shift + 方向键移到其他象限

点击 + 向象限添加任务，点击任务即可选中

今日任务的艾森豪威尔矩阵（含预估时长）

云托管

数据分析

移动 SDK

本地部署许可

支持服务

硬件

培训

明星

问题

金牛

瘦狗

相对市场份额

市场增长率（%）

产品

产品组合的波士顿矩阵

关键人员离职

供应商延期

数据泄露

范围蔓延

预算削减

新法规

云服务中断

办公室搬迁

监控

立即处理

接受

缓解

可能性

影响

风险

已选中：{{risk}}

点击一个风险

按可能性和影响排列的项目风险矩阵

{{name}}（我们）

高性价比

高端

低价

定价过高

高质量

低质量

低价格

高价格

品牌

按价格和感知质量排列的品牌

批量编辑

SAML 单点登录

离线模式

新手引导

AI 摘要

配色主题

审计日志

聊天提醒

公开 API v2

CSV 导入

按信心度加权

工作量（人月）

覆盖人数 × 影响力（千用户）

覆盖 {{reach}} 千 · 影响力 {{impact}} · 信心度 {{confidence}} · 工作量 {{effort}} 人月

RICE 得分：{{score}}

RICE 得分前三：{{list}}

按 RICE 排序的待办事项：工作量与覆盖人数 × 影响力

优势

劣势

机会

威胁

内部

外部

有利

不利

忠实客户

自研平台

低流失率

销售团队规模小

老旧计费系统

仅覆盖单一地区

中小企业市场增长

经销商合作

AI 功能

资金雄厚的新进入者

新的数据法规

价格战

{{n}} 个因素

{{quadrant}}：{{items}}

{{factor}}（{{quadrant}}）

点击象限列出其中的因素，或点击某个因素将其选中

SWOT 分析：优势、劣势、机会与威胁

价格亲民度

功能深度

易用性

支持质量

集成能力

横轴

纵轴

{{name}}（我们）

两项都强

两项都弱

{{dimension}} {{score}}

{{name}}：{{scores}}。在 {{total}} 个维度中有 {{ahead}} 个领先我们。

{{name}}（我们）：{{scores}}。

选择两个维度，然后点击某个厂商查看其画像

按{{x}}和{{y}}比较的竞品

后端负责人

产品设计师

数据分析师

测试工程师

移动端开发

产品经理

客服主管

初级开发

未来领导者

璞玉

稳健贡献者

需要支持

绩效

潜力

{{person}}：绩效 {{performance}}，潜力 {{potential}} → {{quadrant}}

{{person}} 已放入“{{quadrant}}”

{{person}} 已恢复初始评级

所有评级已恢复初始值

全部重置

已校准 {{n}} / {{total}} 人

拖动某人以重新校准，双击撤销

人才校准：绩效与潜力

认证

搜索

结算

商品目录

支付

通知

推荐

媒体

健康

缓慢

报错

严重

p95 延迟（毫秒）

错误率（%）

p95 {{latency}} · 错误率 {{errors}}

同时超出两项 SLO：{{list}}

没有服务同时超出两项 SLO

暂停

继续

实时服务健康度：p95 延迟与错误率

## QuadrantChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "QuadrantChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:69bd7b8ae3861328f291",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip of a point"
  },
  {
    "name": "quadrantContent",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "Partial<Record<keyof QuadrantRegions, ReactNode>> | undefined",
    "typeRef": "type:771baa9ee9c2890c3c21",
    "required": false,
    "description": "React content placed over each quadrant (e.g. an add button); the content receives touches, the rest of the quadrant does not"
  },
  {
    "name": "renderQuadrantHeader",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((corner: keyof QuadrantRegions, info: QuadrantHeaderInfo) => ReactNode) | undefined",
    "typeRef": "type:a0e014fd9b39e3c4ab89",
    "parameters": [
      {
        "name": "corner",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "keyof QuadrantRegions",
        "typeRef": "type:3619c943e5fcb3ed927b"
      },
      {
        "name": "info",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "QuadrantHeaderInfo",
        "typeRef": "type:57043c2f527242a4f04e"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React header of each quadrant, in its outer corner (top edge for the top quadrants, bottom edge for the bottom ones, aligned to the outer side); replaces the drawn title, badge, description and count. The header receives touches (e.g. an add button)"
  },
  {
    "name": "renderPointActions",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:c698917b2dd9224285d1",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content shown next to the selected point (`selectedIndex`), e.g. edit / delete buttons: above the dot (below it near the top edge), kept inside the plot area so that it receives touches"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Exposes every point to the screen readers (VoiceOver, TalkBack) as a button over its dot, labelled with its name, quadrant and values; with `onPointDrop`, its accessibility actions (\"Move to …\") move it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "crosshair",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  }
]
```

### events

```json
[
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:92675943891fcd1135a4",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the tapped point and its index"
  },
  {
    "name": "onQuadrantClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((quadrant: keyof QuadrantRegions, position: { x: number; y: number; }) => void) | undefined",
    "typeRef": "type:a4a51738528b5d04d3d9",
    "parameters": [
      {
        "name": "quadrant",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "keyof QuadrantRegions",
        "typeRef": "type:3619c943e5fcb3ed927b"
      },
      {
        "name": "position",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "{ x: number; y: number; }",
        "typeRef": "type:ede1d5412e129e3eab28"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the empty area of a quadrant is tapped"
  },
  {
    "name": "onPointDrop",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void) | undefined",
    "typeRef": "type:6c7fb89868015b78083f",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "target",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "QuadrantDropTarget",
        "typeRef": "type:f976ba9466af368cfc73"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a dragged point is released; the dots become draggable when it is set (the chart does not move them: update `points`)"
  },
  {
    "name": "onHover",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  }
]
```

## API

```json
{
  "native:QuadrantChartProps": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Props of QuadrantChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"onPointClick\" | \"onPlotClick\" | \"renderTooltip\" | \"xAxis\" | \"yAxis\">",
      "QuadrantConfig"
    ],
    "props": [
      {
        "name": "onPointClick",
        "type": "(point: QuadrantPoint, index: number) => void",
        "required": false,
        "description": "Called with the tapped point and its index"
      },
      {
        "name": "onQuadrantClick",
        "type": "(quadrant: QuadrantCorner, position: { x: number; y: number }) => void",
        "required": false,
        "description": "Called when the empty area of a quadrant is tapped"
      },
      {
        "name": "onPointDrop",
        "type": "(point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void",
        "required": false,
        "description": "Called when a dragged point is released; the dots become draggable when it is set (the chart does not move them: update `points`)"
      },
      {
        "name": "renderTooltip",
        "type": "(point: QuadrantPoint, index: number) => ReactNode",
        "required": false,
        "description": "React content of the tooltip of a point"
      },
      {
        "name": "quadrantContent",
        "type": "Partial<Record<QuadrantCorner, ReactNode>>",
        "required": false,
        "description": "React content placed over each quadrant (e.g. an add button); the content receives touches, the rest of the quadrant does not"
      },
      {
        "name": "renderQuadrantHeader",
        "type": "(corner: QuadrantCorner, info: QuadrantHeaderInfo) => ReactNode",
        "required": false,
        "description": "React header of each quadrant, in its outer corner (top edge for the top quadrants, bottom edge for the bottom ones, aligned to the outer side); replaces the drawn title, badge, description and count. The header receives touches (e.g. an add button)"
      },
      {
        "name": "renderPointActions",
        "type": "(point: QuadrantPoint, index: number) => ReactNode",
        "required": false,
        "description": "React content shown next to the selected point (`selectedIndex`), e.g. edit / delete buttons: above the dot (below it near the top edge), kept inside the plot area so that it receives touches"
      },
      {
        "name": "accessiblePoints",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Exposes every point to the screen readers (VoiceOver, TalkBack) as a button over its dot, labelled with its name, quadrant and values; with `onPointDrop`, its accessibility actions (\"Move to …\") move it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
      }
    ]
  },
  "native:QuadrantConfig": {
    "source": "charts/src/engine/presets.ts",
    "description": "Settings of a quadrant matrix (the props of QuadrantChart)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "points",
        "type": "readonly QuadrantPoint[]",
        "required": true,
        "description": "Points to place"
      },
      {
        "name": "xDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the horizontal axis"
      },
      {
        "name": "yDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the vertical axis"
      },
      {
        "name": "xSplit",
        "type": "number",
        "required": false,
        "description": "X value of the vertical divider (the middle of `xDomain` by default)"
      },
      {
        "name": "ySplit",
        "type": "number",
        "required": false,
        "description": "Y value of the horizontal divider (the middle of `yDomain` by default)"
      },
      {
        "name": "quadrants",
        "type": "QuadrantRegions",
        "required": false,
        "description": "Titles and colors of the quadrants"
      },
      {
        "name": "xLabel",
        "type": "string",
        "required": false,
        "description": "Title of the horizontal axis"
      },
      {
        "name": "yLabel",
        "type": "string",
        "required": false,
        "description": "Title of the vertical axis"
      },
      {
        "name": "axisLabels",
        "type": "QuadrantAxisLabels",
        "required": false,
        "description": "Texts at the ends of the dividers, drawn inside the plot (e.g. \"Important\" at the top)"
      },
      {
        "name": "showTicks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the numeric ticks of the axes; `false` keeps only the matrix"
      },
      {
        "name": "reverseX",
        "type": "boolean",
        "required": false,
        "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)"
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the labels next to the dots (overlapping labels are skipped)"
      },
      {
        "name": "pointSize",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Dot diameter in pixels"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the points in the tooltip"
      },
      {
        "name": "draggable",
        "type": "boolean",
        "required": false,
        "description": "Lets the user drag the dots (`drag` / `drop` events)"
      },
      {
        "name": "showCounts",
        "type": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)",
        "required": false,
        "default": "false",
        "description": "Shows the number of points of each quadrant after its title; a function returns the text instead (e.g. `(n) => `${n} tasks``)"
      },
      {
        "name": "selectedIndex",
        "type": "number | null",
        "required": false,
        "description": "Index of the selected point: drawn with a ring of its color (`null`: none)"
      },
      {
        "name": "selectedIndices",
        "type": "readonly number[]",
        "required": false,
        "description": "Indices of the selected points (several selected points)"
      }
    ]
  },
  "native:QuadrantDropTarget": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Where a dragged QuadrantChart point was dropped",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Data coordinates of the drop"
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      },
      {
        "name": "quadrant",
        "type": "QuadrantCorner",
        "required": true,
        "description": "Quadrant of the drop, as seen on screen"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

投入 / 影响矩阵：点使用所在象限的颜色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/native/basic.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  QuadrantChart,
  useTheme,
  type QuadrantPoint,
} from "minerva-design/native";

// x: effort, y: impact (0-10)
const features = [
  { key: "darkMode", x: 2, y: 8 },
  { key: "offlineSync", x: 8, y: 9 },
  { key: "newIcons", x: 2.5, y: 3 },
  { key: "rewrite", x: 8.5, y: 2.5 },
  { key: "search", x: 6, y: 7 },
];

export default function Basic() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const points: QuadrantPoint[] = features.map(({ key, x, y }) => ({
    label: t(`features.${key}`),
    x,
    y,
  }));
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={300}
        points={points}
        xLabel={t("effort")}
        yLabel={t("impact")}
        quadrants={{
          topLeft: { label: t("quickWins") },
          topRight: { label: t("bigBets") },
          bottomLeft: { label: t("fillIns") },
          bottomRight: { label: t("moneyPits") },
        }}
        ariaLabel={t("featuresAria")}
        onPointClick={(point) =>
          setStatus(
            t("featureStatus", {
              feature: point.label,
              effort: point.x,
              impact: point.y,
            }),
          )
        }
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapFeature")}
      </Text>
    </View>
  );
}

```

## Example: 可拖动的任务矩阵

showTicks={false} 和 axisLabels 把图表变成任务看板：拖动时状态栏实时显示目标象限（onPointDrag），松开后更新其位置（onPointDrop）；双击任务可改名或换象限（onPointDoubleClick）；点击空白区域或 + 按钮（quadrantContent）添加任务；renderTooltip 自定义任务卡片的内容。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/native/draggable.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  IconButton,
  QuadrantChart,
  useTheme,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/native";

// translation keys of the quadrant titles
const titleKeys: Record<QuadrantCorner, string> = {
  topLeft: "doFirst",
  topRight: "schedule",
  bottomLeft: "delegate",
  bottomRight: "eliminate",
};

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left,
// so the top-left quadrant holds high x values
const centers: Record<QuadrantCorner, { x: number; y: number }> = {
  topLeft: { x: 7.5, y: 7.5 },
  topRight: { x: 2.5, y: 7.5 },
  bottomLeft: { x: 7.5, y: 2.5 },
  bottomRight: { x: 2.5, y: 2.5 },
};

// task names are translated when rendered (`key`), added tasks are numbered
type Task = { key?: string; n?: number; x: number; y: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function Draggable() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: QuadrantCorner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.key ? t(`tasks.${task.key}`) : t("newTask", { n: task.n });
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const add = (corner: QuadrantCorner) => {
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: clamp(centers[corner].x + jitter),
      y: clamp(centers[corner].y + jitter),
    };
    setTasks((current) => [...current, task]);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  const tint: Record<QuadrantCorner, string> = {
    topLeft: colors["danger-color"],
    topRight: colors["primary-color"],
    bottomLeft: colors["warning-color"],
    bottomRight: colors["text-secondary-color"],
  };

  // Title + add button in the outer corner of each quadrant
  const header = (corner: QuadrantCorner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <View
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 2,
          [right ? "right" : "left"]: 6,
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Text style={{ color: tint[corner], fontSize: 12, fontWeight: "600" }}>
          {title(corner)}
        </Text>
        <IconButton
          size="small"
          label={t("addTask", { quadrant: title(corner) })}
          onPress={() => add(corner)}
        >
          <Text style={{ color: tint[corner], fontSize: 16 }}>+</Text>
        </IconButton>
      </View>
    );
  };

  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={320}
        points={points}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        ariaLabel={t("boardAria")}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onQuadrantClick={(corner) =>
          setStatus(t("quadrantTapped", { quadrant: title(corner) }))
        }
        renderTooltip={(point) => (
          <View>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              {point.label}
            </Text>
            <Text style={{ color: colors["text-secondary-color"] }}>
              {t("taskScores", {
                urgency: decimal.format(point.x),
                importance: decimal.format(point.y),
              })}
            </Text>
          </View>
        )}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("dragHintNative")}
      </Text>
    </View>
  );
}

```

## Example: 徽标、计数与键盘移动

象限显示徽标、说明与计数。悬停或聚焦任务时，在圆点旁显示一张独立的半透明卡片，展示名称、所在象限及操作。圆点保持原来的大小与坐标；卡片与圆点分离，空间不足时自动避让。原标签让位于卡片；指针离开、按 Escape 或点击任务以外的区域时卡片消失。选中的任务保留选中环。拖动任务时卡片跟随，并显示将要落入的象限。Tab 进入任务列表，Enter 选中，Shift + 方向键在象限之间移动任务，并实时播报。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/native/triage.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  QuadrantChart,
  useTheme,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/native";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const initial = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "taxFiling", x: 7, y: 8.8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8.5, y: 3 },
  { key: "meetings", x: 6.5, y: 1.8 },
  { key: "socialMedia", x: 1.5, y: 1.2 },
];

export default function Triage() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const points: QuadrantPoint[] = tasks.map(({ key, x, y }) => ({
    label: t(`tasks.${key}`),
    x,
    y,
  }));
  // badge pill, title and a second line, drawn by the chart
  const quadrants: QuadrantRegions = {
    topLeft: {
      badge: "Q1",
      label: t("doFirst"),
      description: t("triage.doNow"),
    },
    topRight: {
      badge: "Q2",
      label: t("schedule"),
      description: t("triage.plan"),
    },
    bottomLeft: {
      badge: "Q3",
      label: t("delegate"),
      description: t("triage.handOff"),
    },
    bottomRight: {
      badge: "Q4",
      label: t("eliminate"),
      description: t("triage.drop"),
    },
  };
  const title = (corner: QuadrantCorner) => quadrants[corner]?.label ?? "";

  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={340}
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        showCounts
        selectedIndex={selected}
        ariaLabel={t("triage.aria")}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setSelected(index);
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("dragHintNative")}
      </Text>
    </View>
  );
}

```
