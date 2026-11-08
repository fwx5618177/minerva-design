# 漏斗图

展示流程中逐级流失的各个阶段（注册、销售管道、结账），并显示每一阶段到下一阶段的转化率。悬停或使用方向键高亮阶段；点击图例项可将其隐藏。

Package: minerva-design@1.23.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

价格页

开始注册

验证邮箱

创建项目

邀请同事

升级为付费

{{users}} 位用户

占访客的 {{share}}

自“{{stage}}”以来流失 {{users}} 位

注册漏斗

告警

仪表板

集成

报表

开放 API

排序方式

降序

升序

数据顺序

每周 {{users}} 位用户

各功能的周活跃用户

访问

商品页

加入购物车

结账

支付

下单成功

阶段

访客

流失率

占第一阶段的 {{share}}

网店的结账漏斗

各阶段之间的流失率

投递

简历筛选

技术面试

现场面试

发放 Offer

录用

{{candidates}} 位候选人

该阶段典型耗时：{{days}}

工程岗位的招聘流程

{{stage}}：{{candidates}} 位候选人（占投递者的 {{share}}）

{{rate}} 的投递者被录用，平均耗时 {{days}}

桌面端

移动端

转化率 {{rate}}

{{device}}的结账漏斗

曝光

点击

线索

合格线索

客户

全部渠道

搜索广告

社交媒体

电子邮件

合作伙伴

渠道

上一阶段的 {{share}}

单次结果成本：{{cost}}

本月营销漏斗：{{channel}}

花费：{{spend}} · 客户：{{customers}} · 获客成本：每位客户 {{cac}}

访问

加入购物车

结账

已付款订单

根据转化率计算的月度结账漏斗

{{from}} → {{to}}

降低 {{step}} 的转化率

提高 {{step}} 的转化率

恢复为当前转化率

每月 {{orders}} 笔订单（{{ordersDelta}}）· 收入 {{revenue}}（{{revenueDelta}}）

访客

查看商品

加入购物车

结账

订单

实时更新的限时抢购漏斗

暂停

继续

重新开始

{{time}} · {{orders}} 笔订单 · 占访客的 {{rate}}

抢购已结束：共 {{orders}} 笔订单。

线索

已确认

演示

报价

谈判

{{deals}} 个商机 · {{amount}}

赢单概率：{{share}}

按管道阶段划分的未结商机金额

{{stage}}：{{deals}} 个未结商机

加权预测：{{amount}}

点击某个阶段列出其商机。

## FunnelChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "FunnelChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
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
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "conversion",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "sort",
    "typeText": "\"none\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"bar\" | \"trapezoid\" | undefined",
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
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
