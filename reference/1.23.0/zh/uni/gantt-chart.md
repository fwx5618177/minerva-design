# 甘特图

在时间轴上以条形表示任务，显示进度、分组、里程碑和今日线；可沿时间缩放和平移。

Package: minerva-design@1.23.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

用户研究

干系人访谈

项目启动

线框图

视觉设计

设计系统

前端开发

后端与 CMS

内容迁移

测试与无障碍

上线

调研

设计

开发

上线

今天

进度

里程碑

网站改版的项目计划

移动端改版

离线同步

桌面小组件

搜索 v2

多区域部署

开放 API

新版引导

推荐计划

价格页面

移动端

平台

增长

按团队划分的年度产品路线图

登录页

重置密码

个人资料 API

头像上传

邮件模板

通知

端到端测试

安娜

本

陈

达拉

{{task}}（{{owner}}）：{{start}} – {{end}}，已完成 {{progress}}%

点击一个任务

按开发者划分的迭代任务

需求规格

开发

翻译

公开测试

发布

中文（zh-CN）

法语（fr-FR）

发布计划，{{locale}}

启动

产品规格

同步 API

应用界面

联调集成

安全评审

应用商店素材

Beta 测试

上架发布

产品

后端

移动端

依赖箭头

移动应用发布计划及任务之间的依赖关系

场地清理

基坑开挖

钢筋笼加工

基础浇筑

回填

地坪

一层钢结构

楼承板

二层钢结构

基础验收

主体结构验收

土方队

钢结构队

混凝土队

质检员

基础工程

主体结构

验收

按施工队排列的施工计划及任务之间的依赖关系

Atlas 团队

Borealis 团队

Comet 团队

结账改版

支付重试

数字钱包

搜索筛选

索引升级

推荐

可观测性

推送通知

特性

使能项

迭代 {{n}}

IP 迭代

系统演示 {{n}}

系统演示

火车活动

按团队划分的发布火车项目增量

签订租约

装修工程

安装货架

部署 WMS

招聘员工

员工培训

试运行

正式启用

关键

有浮动时间

突出显示关键路径

{{days}}后正式启用；关键路径：{{path}}。点击任务查看其浮动时间。

{{task}}可以推迟{{slack}}而不影响启用

{{task}}是关键任务：任何延误都会推迟启用

带关键路径的仓库启用计划

Ana

Ben

Chen

Dara

Eli

Apollo

Borealis

Cassini

休假

项目

所有项目

{{person}}：{{weeks}} 周内已分配 {{share}}

{{person}}超额分配：{{weeks}} 周内 {{share}}

悬停在某一行上查看此人的负荷

按人员和项目划分的团队资源计划

检出代码

构建

单元测试

代码检查

集成测试

部署到预发布

冒烟测试

金丝雀发布

生产发布

构建

测试

发布

当前

运行中：{{stages}} · 已用 {{elapsed}}

流水线完成，用时 {{elapsed}}

重新运行

暂停

继续

部署流水线运行的各阶段，实时更新

合同与手续

订购笔记本电脑

创建账号

欢迎会

入职培训

与导师午餐

```tsx
代码库导览
```

第一个工单

合规培训

第一个项目

第一天

30 天面谈

60 天评估

人力资源

IT

经理

导师

负责人：{{owner}}

已完成

进行中

未开始

面谈

按负责人划分的新员工入职计划

高

中

低

工作

学习

生活

站会

专注工作

模拟考试

邮件

代码评审

背单词

午饭

健身

阅读

现在

按优先级排列的今日日程

## GanttChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "GanttChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "today",
    "typeText": "number | boolean | Date | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "dependencyArrows",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "barLabels",
    "typeText": "boolean | \"auto\" | \"inside\" | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "tasks",
    "typeText": "readonly GanttTask[]",
    "required": true
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "taskName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "progressName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "milestoneName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "formatProgress",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "dependenciesName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dependencyColor",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
