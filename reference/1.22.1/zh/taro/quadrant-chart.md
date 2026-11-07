# 四象限图

四象限矩阵（优先级、艾森豪威尔、BCG……），象限带底色和标题，点带标签。

Package: minerva-design@1.22.1

Renderer: taro

Locale: zh

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

Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize. No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text. QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "disableScroll",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Renders a visually hidden list of the points for the screen readers: one button per point (its name, quadrant and values; a tap is `onPointClick`) and, with `onPointDrop`, \"Move to …\" buttons moving it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  },
  {
    "name": "height",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "legend",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch zoom, pan (drag when zoomed) and double-tap reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "locale",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes). Mini-programs have no `<html lang>`: pass the app language"
  },
  {
    "name": "labels",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  }
]
```

### events

```json
[
  {
    "name": "onPointClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:b27cb5a6c62cedbcb19c",
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
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((quadrant: keyof QuadrantRegions, position: { x: number; y: number; }) => void) | undefined",
    "typeRef": "type:cb94967d1b76f3d5d1ef",
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
        "typeRef": "type:f25076a54fb3857c6296"
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
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void) | undefined",
    "typeRef": "type:998f2ad059dd3b686f96",
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
        "typeRef": "type:26428457314664a883f3"
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
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:980cbee566a575ab834d",
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
    "description": "Called when the touched (or hovered) points change"
  },
  {
    "name": "onZoom",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:6871f590139907a5872c",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
