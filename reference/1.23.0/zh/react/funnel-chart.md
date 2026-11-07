# 漏斗图

展示流程中逐级流失的各个阶段（注册、销售管道、结账），并显示每一阶段到下一阶段的转化率。悬停或使用方向键高亮阶段；点击图例项可将其隐藏。

Package: minerva-design@1.23.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "data",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly ShapeDatum[]",
    "typeRef": "type:f31ad238ea16881a8684",
    "required": true,
    "description": "Stages: a name, a value and an optional color"
  },
  {
    "name": "sort",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "ascending",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "typeRef": "type:36d9ac8380d45cabf9fa",
    "required": false,
    "description": "Order of the stages"
  },
  {
    "name": "gap",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Vertical gap between the stages, in pixels"
  },
  {
    "name": "conversion",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the conversion rate from the previous stage"
  },
  {
    "name": "shape",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "bar",
      "trapezoid"
    ],
    "typeText": "\"bar\" | \"trapezoid\" | undefined",
    "typeRef": "type:3cf8fefedd16fc6bf54f",
    "default": "trapezoid",
    "required": false,
    "description": "Shape of the stages: trapezoids that narrow to the next stage, or centered bars"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/shapes.tsx",
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
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:f12d9d0b7c053d4d65a6",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:5bfc1184b082171dcbfd",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
  },
  {
    "name": "texts",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "hidden",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the user prefers reduced motion)"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:599537a71f6aca3767b8",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:c5e11f23fbce8c1aa9a2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:4d7c0df4667f26938fe6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) mark changes"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:e40dbbb538ff7cd7dda5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is clicked, tapped or activated with Enter"
  }
]
```

## API

```json
{
  "FunnelChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of FunnelChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly ShapeDatum[]",
        "required": true,
        "description": "Stages: a name, a value and an optional color"
      },
      {
        "name": "sort",
        "type": "\"descending\" | \"ascending\" | \"none\"",
        "required": false,
        "default": "\"none\" (data order)",
        "description": "Order of the stages"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Vertical gap between the stages, in pixels"
      },
      {
        "name": "conversion",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the conversion rate from the previous stage"
      },
      {
        "name": "shape",
        "type": "\"trapezoid\" | \"bar\"",
        "required": false,
        "default": "\"trapezoid\"",
        "description": "Shape of the stages: trapezoids that narrow to the next stage, or centered bars"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 条形与排序

shape="bar" 为非顺序流程的数值绘制居中条形；sort 对其排序（带动画），conversion={false} 隐藏转化率。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/bars.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

type Sort = "descending" | "ascending" | "none";
const SORTS: Sort[] = ["descending", "ascending", "none"];

// Weekly active users of each feature (not a sequential process)
const features = [
  { key: "alerts", value: 3900 },
  { key: "dashboards", value: 8400 },
  { key: "integrations", value: 1600 },
  { key: "reports", value: 5200 },
  { key: "api", value: 2100 },
];

export default function BarsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const [sort, setSort] = useState<Sort>("descending");

  const data = useMemo(
    (): ShapeDatum[] =>
      features.map(({ key, value }) => ({ name: t(`features.${key}`), value })),
    [t],
  );
  const number = new Intl.NumberFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sortOrder")}
        direction="horizontal"
        value={sort}
        onChange={(value) => setSort(value as Sort)}
      >
        {SORTS.map((value) => (
          <Radio key={value} value={value} label={t(`sorts.${value}`)} />
        ))}
      </RadioGroup>
      <FunnelChart
        data={data}
        shape="bar"
        sort={sort}
        conversion={false}
        gap={6}
        legend={false}
        format={(value) => number.format(value)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>
              {t("weeklyUsers", { users: number.format(event.value) })}
            </span>
          </div>
        )}
        height={300}
        ariaLabel={t("featuresAria")}
      />
    </div>
  );
}

```

## Example: 基础

梯形逐级收窄并显示转化率；renderTooltip 用 React 补充访客占比和流失人数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Sign-up funnel of a SaaS product over one month
const stages = [
  { key: "pricing", value: 24000 },
  { key: "started", value: 9600 },
  { key: "verified", value: 6850 },
  { key: "project", value: 4100 },
  { key: "invited", value: 1720 },
  { key: "upgraded", value: 640 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): ShapeDatum[] =>
      stages.map(({ key, value }) => ({ name: t(`signup.${key}`), value })),
    [t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  // The data is not sorted by the chart (sort="none"), so the event index
  // is also the index in `data`
  const tooltip = (event: ShapeHoverEvent) => {
    const previous = event.index > 0 ? data[event.index - 1] : null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>{t("users", { users: number.format(event.value) })}</span>
        <span>{t("ofVisitors", { share: percent.format(event.percent) })}</span>
        {previous && (
          <span>
            {t("droppedSince", {
              users: number.format(previous.value - event.value),
              stage: previous.name,
            })}
          </span>
        )}
      </div>
    );
  };

  return (
    <FunnelChart
      data={data}
      format={(value) => number.format(value)}
      percentFormat={(share) => percent.format(share)}
      renderTooltip={tooltip}
      height={360}
      ariaLabel={t("signupAria")}
    />
  );
}

```

## Example: 按渠道划分的营销漏斗

通过 Select 将漏斗筛选为单个获客渠道，各阶段以动画过渡到新的数量。renderTooltip 根据该渠道的花费补充相对上一阶段的转化率和单次结果成本；下方文字给出获客成本。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/campaigns.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Channel = "search" | "social" | "email" | "partners";

// Marketing funnel of one month per acquisition channel, with its spend (USD)
const STAGES = ["impressions", "clicks", "leads", "qualified", "customers"];
const CHANNELS: Record<Channel, { values: number[]; spend: number }> = {
  search: { values: [420_000, 18_900, 2_270, 910, 182], spend: 48_000 },
  social: { values: [1_250_000, 21_300, 1_490, 450, 63], spend: 36_000 },
  email: { values: [86_000, 9_460, 1_700, 820, 148], spend: 6_500 },
  partners: { values: [64_000, 3_840, 960, 510, 121], spend: 21_000 },
};
const KEYS = Object.keys(CHANNELS) as Channel[];
const ALL = {
  values: STAGES.map((_, i) =>
    KEYS.reduce((sum, key) => sum + CHANNELS[key].values[i], 0),
  ),
  spend: KEYS.reduce((sum, key) => sum + CHANNELS[key].spend, 0),
};

export default function CampaignsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [channel, setChannel] = useState<Channel | "all">("all");

  const { values, spend } = channel === "all" ? ALL : CHANNELS[channel];
  const data = useMemo(
    (): ShapeDatum[] =>
      STAGES.map((stage, i) => ({
        name: t(`campaigns.stages.${stage}`),
        value: values[i],
      })),
    [t, values],
  );
  const formats = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2,
    });
    const budget = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return {
      number: (value: number) => compact.format(value),
      money: (value: number) => money.format(value),
      budget: (value: number) => budget.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  // conversion from the previous stage and cost of each result
  const tooltip = (event: ShapeHoverEvent) => (
    <div style={{ display: "grid", gap: 2 }}>
      <strong>{event.name}</strong>
      <span>{formats.number(event.value)}</span>
      {event.index > 0 && (
        <span>
          {t("campaigns.fromPrevious", {
            share: formats.percent(event.value / values[event.index - 1]),
          })}
        </span>
      )}
      <span>
        {t("campaigns.costPer", { cost: formats.money(spend / event.value) })}
      </span>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("campaigns.channel")}
        value={channel}
        onChange={(value) => setChannel(value as Channel | "all")}
      >
        <SelectItem value="all">{t("campaigns.channels.all")}</SelectItem>
        {KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`campaigns.channels.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <FunnelChart
        data={data}
        legend={false}
        format={formats.number}
        percentFormat={formats.percent}
        renderTooltip={tooltip}
        height={340}
        ariaLabel={t("campaigns.aria", {
          channel: t(`campaigns.channels.${channel}`),
        })}
      />
      <output aria-live="polite">
        {t("campaigns.summary", {
          spend: formats.budget(spend),
          customers: formats.number(values[values.length - 1]),
          cac: formats.money(spend / values[values.length - 1]),
        })}
      </output>
    </div>
  );
}

```

## Example: 分群对比

按设备拆分的同一漏斗并排显示，阶段相同、每个分群一种颜色，便于看出移动端用户在哪里流失。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/compare.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// The same checkout funnel split by device: where does mobile lose people?
const stages = ["product", "cart", "checkout", "order"];
const devices = [
  { key: "desktop", values: [42_000, 12_600, 7_900, 5_300], color: "#0ea5e9" },
  { key: "mobile", values: [61_000, 13_400, 5_200, 2_700], color: "#f97316" },
];

export default function CompareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const number = useMemo(
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

  // one color per funnel, the stages in the same order
  const funnels = useMemo(
    () =>
      devices.map((device) => ({
        ...device,
        data: stages.map((stage, i): ShapeDatum => ({
          name: t(`shop.${stage}`),
          value: device.values[i],
          color: device.color,
        })),
      })),
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {funnels.map((funnel) => (
        <figure key={funnel.key} style={{ margin: 0 }}>
          <figcaption style={{ fontWeight: 600, marginBottom: 4 }}>
            {t(`devices.${funnel.key}`)} ·{" "}
            {t("conversionRate", {
              rate: percent.format(funnel.values[3] / funnel.values[0]),
            })}
          </figcaption>
          <FunnelChart
            data={funnel.data}
            legend={false}
            format={(value) => number.format(value)}
            percentFormat={(share) => percent.format(share)}
            renderTooltip={(event) => (
              <div style={{ display: "grid", gap: 2 }}>
                <strong>{event.name}</strong>
                <span>{number.format(event.value)}</span>
                <span>
                  {t("conversionOverall", {
                    share: percent.format(event.percent),
                  })}
                </span>
              </div>
            )}
            height={280}
            ariaLabel={t("deviceFunnelAria", {
              device: t(`devices.${funnel.key}`),
            })}
          />
        </figure>
      ))}
    </div>
  );
}

```

## Example: 电商结账

网店的结账漏斗，旁边的 Table 列出各阶段之间的流失率；流失最多的阶段在两处都以红色突出显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/ecommerce.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// Checkout funnel of an online shop over one week
const stages = [
  { key: "visits", value: 182_400 },
  { key: "product", value: 96_300 },
  { key: "cart", value: 21_700 },
  { key: "checkout", value: 11_900 },
  { key: "payment", value: 8_350 },
  { key: "order", value: 7_480 },
];

interface Step {
  key: string;
  value: number;
  /** Visitors lost since the previous stage, 0-1 */
  dropOff: number;
}

const steps: Step[] = stages.map((stage, i) => ({
  ...stage,
  dropOff: i === 0 ? 0 : 1 - stage.value / stages[i - 1].value,
}));
// the stage that loses the most visitors
const worst = steps.reduce((a, b) => (b.dropOff > a.dropOff ? b : a));

export default function EcommerceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const number = useMemo(
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

  // the stage with the biggest drop-off is highlighted in red
  const data = useMemo(
    (): ShapeDatum[] =>
      steps.map((step) => ({
        name: t(`shop.${step.key}`),
        value: step.value,
        color: step === worst ? "var(--danger-color)" : undefined,
      })),
    [t],
  );
  const columns = useMemo(
    (): TableColumn<Step>[] => [
      { key: "stage", header: t("stage"), render: (s) => t(`shop.${s.key}`) },
      {
        key: "value",
        header: t("visitors"),
        align: "right",
        render: (s) => number.format(s.value),
      },
      {
        key: "dropOff",
        header: t("dropOff"),
        align: "right",
        render: (s) =>
          s.dropOff === 0 ? (
            "–"
          ) : (
            <span
              style={{
                color: s === worst ? "var(--danger-color)" : undefined,
                fontWeight: s === worst ? 600 : undefined,
              }}
            >
              {percent.format(-s.dropOff)}
            </span>
          ),
      },
    ],
    [t, number, percent],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <FunnelChart
        data={data}
        legend={false}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{number.format(event.value)}</span>
            <span>
              {t("conversionOverall", { share: percent.format(event.percent) })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("shopAria")}
      />
      <Table
        aria-label={t("dropOffTable")}
        columns={columns}
        data={steps}
        rowKey={(s) => s.key}
        size="small"
      />
    </div>
  );
}

```

## Example: 实时限时抢购

以 30 次刷新回放一小时的抢购（setInterval，在暂停、结束和卸载时清除）：新访客不断到来，并借助带种子的随机数生成器逐级向下流动。状态行随时钟更新，只播报抢购结束。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/live-sale.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

/** Small seeded random generator: the same "sale" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A one-hour flash sale, replayed fast: one tick is two minutes of the
// sale. Each tick brings new visitors, and a share of each stage's
// newcomers moves on to the next stage
const STAGES = ["visitors", "product", "cart", "checkout", "orders"];
const RATES = [0.62, 0.28, 0.6, 0.78];
const TICKS = 30;
const MINUTES_PER_TICK = 2;
const SEED = 2026;
// the first minutes of the sale, before the replay starts
const START = [420, 260, 74, 45, 35];

export default function LiveSaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [counts, setCounts] = useState(START);
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));
  const ended = tick >= TICKS;

  useEffect(() => {
    if (!running || ended) return;
    const timer = window.setInterval(() => {
      // draw the newcomers outside the state updaters
      const added: number[] = [];
      added[0] = Math.round(300 + random.current() * 500);
      for (let i = 1; i < STAGES.length; i++) {
        const rate = RATES[i - 1] * (0.85 + random.current() * 0.3);
        added[i] = Math.round(added[i - 1] * rate);
      }
      setCounts((current) => current.map((value, i) => value + added[i]));
      setTick((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, ended]);

  const data = useMemo(
    (): ShapeDatum[] =>
      STAGES.map((stage, i) => ({
        name: t(`sale.stages.${stage}`),
        value: counts[i],
      })),
    [counts, t],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    const time = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
    return {
      number: (value: number) => number.format(value),
      percent: (share: number) => percent.format(share),
      // the sale starts at 10:00
      clock: (ticks: number) =>
        time.format(Date.UTC(2026, 10, 27, 10, ticks * MINUTES_PER_TICK)),
    };
  }, [locale]);

  const restart = () => {
    random.current = mulberry32(SEED);
    setCounts(START);
    setTick(0);
    setRunning(true);
  };
  const orders = counts[counts.length - 1];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <FunnelChart
        data={data}
        format={formats.number}
        percentFormat={formats.percent}
        legend={false}
        height={320}
        ariaLabel={t("sale.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          disabled={ended}
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("sale.pause") : t("sale.resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={restart}>
          {t("sale.restart")}
        </Button>
        <span>
          {t("sale.status", {
            time: formats.clock(tick),
            orders: formats.number(orders),
            rate: formats.percent(orders / counts[0]),
          })}
        </span>
      </HStack>
      {/* announced once, when the sale is over */}
      <output aria-live="polite">
        {ended && t("sale.ended", { orders: formats.number(orders) })}
      </output>
    </div>
  );
}

```

## Example: 招聘流程

某个岗位从投递到录用的候选人，以条形显示，每个阶段一种颜色；提示框补充该阶段的典型耗时，点击可选中阶段。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/recruiting.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Hiring pipeline of one engineering role, with the typical time per stage
const pipeline = [
  { key: "applied", value: 640, days: 0 },
  { key: "screened", value: 212, days: 4 },
  { key: "technical", value: 74, days: 9 },
  { key: "onsite", value: 21, days: 12 },
  { key: "offer", value: 6, days: 5 },
  { key: "hired", value: 4, days: 7 },
];
// cool to warm colors along the process
const colors = [
  "#64748b",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#f43f5e",
  "#16a34a",
];

export default function RecruitingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      pipeline.map(({ key, value }, i) => ({
        name: t(`hiring.${key}`),
        value,
        color: colors[i],
      })),
    [t],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });
  const days = new Intl.NumberFormat(locale, { style: "unit", unit: "day" });
  const totalDays = pipeline.reduce((sum, stage) => sum + stage.days, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <FunnelChart
        data={data}
        shape="bar"
        gap={6}
        legend={false}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{t("candidates", { candidates: event.value })}</span>
            <span>
              {t("stageTime", {
                days: days.format(pipeline[event.index].days),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={340}
        ariaLabel={t("hiringAria")}
      />
      <p role="status">
        {selected
          ? t("hiringSelected", {
              stage: selected.name,
              candidates: selected.value,
              share: percent.format(selected.percent),
            })
          : t("hiringSummary", {
              rate: percent.format(pipeline[5].value / pipeline[0].value),
              days: days.format(totalDays),
            })}
      </p>
    </div>
  );
}

```

## Example: B2B 销售管道

各阶段按其未结商机的金额确定大小，由于每个阶段包含不同的商机，设置 conversion={false}。onClick 在漏斗旁列出该阶段的商机，renderTooltip 显示商机数量和赢单概率。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/sales-pipeline.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// Open B2B deals by pipeline stage (amounts in USD) and the win
// probability of each stage, used for the weighted forecast
const PIPELINE: {
  key: string;
  probability: number;
  deals: [string, number][];
}[] = [
  {
    key: "lead",
    probability: 0.1,
    deals: [
      ["Acme Corp", 12_000],
      ["Brightline", 8_000],
      ["Cobalt Labs", 15_000],
      ["Dunmore", 6_000],
      ["Evergreen", 9_000],
      ["Fieldstone", 11_000],
      ["Granite & Co", 7_000],
    ],
  },
  {
    key: "qualified",
    probability: 0.25,
    deals: [
      ["Harbor Health", 14_000],
      ["Ironwood", 18_000],
      ["Juniper", 9_000],
      ["Keystone", 12_000],
      ["Lakeside", 7_000],
    ],
  },
  {
    key: "demo",
    probability: 0.4,
    deals: [
      ["Meridian", 21_000],
      ["Northwind", 16_000],
      ["Oakridge", 11_000],
    ],
  },
  {
    key: "proposal",
    probability: 0.6,
    deals: [
      ["Pinnacle", 24_000],
      ["Quarry Works", 13_000],
    ],
  },
  {
    key: "negotiation",
    probability: 0.8,
    deals: [
      ["Redwood", 19_000],
      ["Summit Bank", 9_000],
    ],
  },
];

const amountOf = (deals: [string, number][]) =>
  deals.reduce((sum, [, amount]) => sum + amount, 0);
const FORECAST = PIPELINE.reduce(
  (sum, stage) => sum + amountOf(stage.deals) * stage.probability,
  0,
);

export default function SalesPipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [stage, setStage] = useState<number | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      PIPELINE.map(({ key, deals }) => ({
        name: t(`pipeline.stages.${key}`),
        value: amountOf(deals),
      })),
    [t],
  );
  const formats = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const full = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      compact: (value: number) => compact.format(value),
      full: (value: number) => full.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const open = stage === null ? null : PIPELINE[stage];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "start",
        width: "100%",
      }}
    >
      {/* the stages hold different deals: a conversion rate between them
          would be misleading, so it is hidden */}
      <FunnelChart
        data={data}
        conversion={false}
        legend={false}
        format={formats.compact}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>
              {t("pipeline.dealsAmount", {
                deals: PIPELINE[event.index].deals.length,
                amount: formats.full(event.value),
              })}
            </span>
            <span>
              {t("pipeline.probability", {
                share: formats.percent(PIPELINE[event.index].probability),
              })}
            </span>
          </div>
        )}
        onClick={(event) => setStage(event.index)}
        height={320}
        ariaLabel={t("pipeline.aria")}
      />
      <section aria-live="polite" style={{ display: "grid", gap: 8 }}>
        <strong>
          {open && stage !== null
            ? t("pipeline.stageTitle", {
                stage: data[stage].name,
                deals: open.deals.length,
              })
            : t("pipeline.forecast", { amount: formats.full(FORECAST) })}
        </strong>
        {open ? (
          <ul style={{ margin: 0, paddingInlineStart: 20 }}>
            {[...open.deals]
              .sort((a, b) => b[1] - a[1])
              .map(([company, amount]) => (
                <li key={company}>
                  {company} · {formats.full(amount)}
                </li>
              ))}
          </ul>
        ) : (
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("pipeline.hint")}
          </span>
        )}
      </section>
    </div>
  );
}

```

## Example: 转化假设模型

−1 / +1 按钮调整某个结账步骤的转化率，漏斗会根据访问量重新计算；摘要将订单数和收入与当前转化率下的结果对比。转化率以整数百分点保存，这样“重置”才能准确判断是否有变化。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/demos/what-if.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// What-if model of a checkout: monthly visits, today's conversion rate of
// each step and the average order value (USD)
const VISITS = 50_000;
const ORDER_VALUE = 68;
const STAGES = ["visits", "cart", "checkout", "paid"];
const BASE_RATES = [12, 55, 62]; // in percent, changed one point at a time

const ordersOf = (rates: number[]) =>
  rates.reduce((count, rate) => (count * rate) / 100, VISITS);

export default function WhatIfDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [rates, setRates] = useState(BASE_RATES);

  const data = useMemo((): ShapeDatum[] => {
    // each stage keeps its rate of the previous one
    const counts = [VISITS];
    for (let i = 1; i < STAGES.length; i++) {
      counts.push((counts[i - 1] * rates[i - 1]) / 100);
    }
    return STAGES.map((stage, i) => ({
      name: t(`whatIf.stages.${stage}`),
      value: Math.round(counts[i]),
    }));
  }, [rates, t]);
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const signed = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const signedMoney = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return {
      number: (value: number) => number.format(value),
      signed: (value: number) => signed.format(value),
      money: (value: number) => money.format(value),
      signedMoney: (value: number) => signedMoney.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const change = (step: number, delta: number) =>
    setRates((current) =>
      current.map((rate, i) =>
        i === step ? Math.min(95, Math.max(1, rate + delta)) : rate,
      ),
    );
  const orders = ordersOf(rates);
  const baseOrders = ordersOf(BASE_RATES);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <FunnelChart
        data={data}
        legend={false}
        format={formats.number}
        percentFormat={formats.percent}
        height={320}
        ariaLabel={t("whatIf.aria")}
      />
      <div style={{ display: "grid", gap: 12 }}>
        {rates.map((rate, i) => {
          const step = t("whatIf.step", {
            from: data[i].name,
            to: data[i + 1].name,
          });
          return (
            <HStack key={STAGES[i]} gap={8} align="center" justify="between">
              <span>
                {step}: <strong>{formats.percent(rate / 100)}</strong>
              </span>
              <HStack gap={4}>
                <Button
                  size="small"
                  variant="outline"
                  aria-label={t("whatIf.lower", { step })}
                  onClick={() => change(i, -1)}
                >
                  −1
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  aria-label={t("whatIf.raise", { step })}
                  onClick={() => change(i, 1)}
                >
                  +1
                </Button>
              </HStack>
            </HStack>
          );
        })}
        <Button
          size="small"
          variant="ghost"
          disabled={rates.every((rate, i) => rate === BASE_RATES[i])}
          onClick={() => setRates(BASE_RATES)}
        >
          {t("whatIf.reset")}
        </Button>
        <output aria-live="polite">
          {t("whatIf.summary", {
            orders: formats.number(orders),
            ordersDelta: formats.signed(orders - baseOrders),
            revenue: formats.money(orders * ORDER_VALUE),
            revenueDelta: formats.signedMoney(
              (orders - baseOrders) * ORDER_VALUE,
            ),
          })}
        </output>
      </div>
    </div>
  );
}

```
