# 迷你图

没有坐标轴和图例、只有文字大小的迷你图，在数字旁展示趋势走向：用于 KPI 卡片、表格单元格或列表中。悬停即可读取数值。

Package: minerva-design@1.19.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

订单

每周订单，{{variant}}

收入

活跃用户

注册数

p95 延迟

{{metric}}，最近 30 天

服务

API 网关

身份认证

搜索

支付

通知

请求数 / 分钟

p95 延迟（30 天）

{{service}}最近 30 天的 p95 延迟

今日

变化

服务延迟

代码

Acme 集团

Nova 生物科技

Orbit 航天

Kite 机器人

Luma 能源

{{symbol}} 今日价格

价格

自选股

最近 14 天的访问量：

访问量

最近 14 天的访问量

第 7 天部署后错误数激增，随后恢复正常：

错误

最近 14 天每天的错误数

这两周的午后气温：

气温

最近 14 天的午后气温

CPU

{{server}} 的 CPU 使用率

告警

正常

日活跃用户

最近一天：{{date}}

{{date}} · 自 9 月 1 日以来 {{change}}

9 月 1 日至 10 月 31 日的日活跃用户

{{value}} 步

完成目标的 {{value}}

{{days}} 天中有 {{reached}} 天达到 {{goal}} 步的目标

步数

四周内每天的步数及每日目标

雷克雅未克

蒙特利尔

东京

开罗

新加坡

悉尼

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} 每月平均日最高气温

时段

7 天

30 天

90 天

后半段对比前半段

对比上一时段

最近 {{period}} 的每日营收

## Sparkline

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "Sparkline"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 48,
    "required": false,
    "description": "Height of the sparkline; numbers are pixels"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
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
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "data",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "ChartSeriesData",
    "typeRef": "type:7e744c1b22c10b05a750",
    "required": true,
    "description": "Values (or `[x, y]` pairs, typed arrays, ...)"
  },
  {
    "name": "type",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "enum",
    "values": [
      "area",
      "bar",
      "line"
    ],
    "typeText": "\"area\" | \"line\" | \"bar\" | undefined",
    "typeRef": "type:971367311ab960469c5a",
    "default": "line",
    "required": false,
    "description": "How the values are drawn"
  },
  {
    "name": "color",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color (any CSS color); the first palette color by default"
  },
  {
    "name": "curve",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "enum",
    "values": [
      "linear",
      "smooth",
      "step"
    ],
    "typeText": "ChartCurve | undefined",
    "typeRef": "type:9a03680a65f827285385",
    "default": "smooth",
    "required": false,
    "description": "Shape of the line"
  },
  {
    "name": "name",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name shown in the tooltip"
  },
  {
    "name": "reference",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Draws a reference line at this value (e.g. a target or the average)"
  },
  {
    "name": "format",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:a39c56c2ba27c58de674",
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
    "description": "Formats the value in the tooltip"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
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
    "description": "Called when the hovered (or keyboard-focused) points change"
  }
]
```

## API

```json
{
  "SparklineProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of Sparkline",
    "kind": "interface",
    "extends": [
      "Pick<ChartCommonProps, | \"width\" | \"renderer\" | \"tooltip\" | \"palette\" | \"ariaLabel\" | \"locale\" | \"labels\" | \"onHover\" | \"renderTooltip\" | \"className\" | \"style\" | \"ref\">",
      "SparklineConfig"
    ],
    "props": [
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "default": "48",
        "description": "Height of the sparkline; numbers are pixels"
      }
    ]
  },
  "SparklineConfig": {
    "source": "charts/src/engine/presets.ts",
    "description": "Settings of a sparkline (the props of Sparkline)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "data",
        "type": "ChartSeries[\"data\"]",
        "required": true,
        "description": "Values (or `[x, y]` pairs, typed arrays, ...)"
      },
      {
        "name": "type",
        "type": "\"line\" | \"area\" | \"bar\"",
        "required": false,
        "default": "\"line\"",
        "description": "How the values are drawn"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color (any CSS color); the first palette color by default"
      },
      {
        "name": "curve",
        "type": "ChartCurve",
        "required": false,
        "default": "\"smooth\"",
        "description": "Shape of the line"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name shown in the tooltip"
      },
      {
        "name": "reference",
        "type": "number",
        "required": false,
        "description": "Draws a reference line at this value (e.g. a target or the average)"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats the value in the tooltip"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

同一组数据分别绘制为平滑折线、面积和柱；reference 在指定值处画一条虚线，例如平均值或目标值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/basic.tsx

```tsx
import { useTranslation } from "react-i18next";
import { Sparkline } from "minerva-design/charts";

const weekly = [
  42, 47, 45, 52, 49, 58, 61, 57, 64, 60, 68, 73, 70, 76, 74, 81, 79, 85, 88,
  84,
];
const average = weekly.reduce((sum, v) => sum + v, 0) / weekly.length;

const variants = [
  { caption: 'type="line"', props: {} },
  { caption: 'type="area"', props: { type: "area" as const } },
  { caption: 'type="bar"', props: { type: "bar" as const } },
  {
    caption: "reference={average}",
    props: { reference: average, color: "var(--success-color)" },
  },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.sparkline.data" });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 24,
        width: "100%",
      }}
    >
      {variants.map(({ caption, props }) => (
        <figure key={caption} style={{ margin: 0 }}>
          <Sparkline
            data={weekly}
            name={t("orders")}
            ariaLabel={t("ordersAria", { variant: caption })}
            {...props}
          />
          <figcaption
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "var(--text-secondary-color)",
            }}
          >
            <code>{caption}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

```

## Example: 悬停读数

onHover 接收悬停的点（指针离开时为 null）：其索引驱动上方的大数字和日期，没有悬停时回到最近一天。tooltip={false} 隐藏被读数取代的提示框。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/hover-value.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkline, type ChartHoverEvent } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const START = Date.UTC(2026, 8, 1);

// Daily active users of an app over 61 days (Sept 1 to Oct 31): growing,
// with quieter weekends
const users = (() => {
  const random = mulberry32(61);
  return Array.from({ length: 61 }, (_, i) => {
    const weekday = new Date(START + i * DAY).getUTCDay();
    const weekend = weekday === 0 || weekday === 6 ? 0.82 : 1;
    return Math.round((18_000 + i * 120) * weekend * (0.96 + random() * 0.08));
  });
})();

export default function HoverValueDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;
  // index of the hovered day, null when the pointer is outside
  const [hovered, setHovered] = useState<number | null>(null);

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  // the readout shows the hovered day, and falls back to the latest one
  const index = hovered ?? users.length - 1;
  const value = users[index] ?? 0;
  const first = users[0] ?? 1;

  return (
    <div style={{ display: "grid", gap: 4, width: "100%", maxWidth: 420 }}>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {t("dailyActiveUsers")}
      </span>
      <output aria-live="polite" style={{ display: "grid", gap: 2 }}>
        <span style={{ fontSize: 28, fontWeight: 600 }}>
          {number.format(value)}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {hovered === null
            ? t("latestDay", { date: date.format(START + index * DAY) })
            : t("hoveredDay", {
                date: date.format(START + index * DAY),
                change: percent.format(value / first - 1),
              })}
        </span>
      </output>
      <Sparkline
        data={users}
        type="area"
        name={t("dailyActiveUsers")}
        format={(v) => number.format(v)}
        // the readout replaces the tooltip
        tooltip={false}
        onHover={(event: ChartHoverEvent | null) =>
          setHovered(event?.items[0]?.index ?? null)
        }
        height={64}
        ariaLabel={t("dauAria")}
      />
    </div>
  );
}

```

## Example: 嵌入句子

迷你图以固定宽高和 display: inline-block 嵌入文字中，这正是迷你图最初的用法。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/inline.tsx

```tsx
import { useTranslation } from "react-i18next";
import { Sparkline } from "minerva-design/charts";

// Last 14 days
const visits = [
  820, 870, 910, 860, 990, 1040, 1010, 1120, 1180, 1150, 1260, 1310, 1290, 1380,
];
const errors = [12, 9, 14, 11, 10, 8, 26, 31, 18, 9, 7, 8, 6, 7];
const temperature = [14, 15, 13, 12, 16, 18, 19, 21, 20, 18, 17, 19, 22, 23];

// A sparkline inside a sentence: inline-block, about the height of a line
const inline = {
  display: "inline-block",
  verticalAlign: "middle",
  margin: "0 4px",
};

export default function InlineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const celsius = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "celsius",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", lineHeight: 1.8 }}>
      <div>
        {t("inlineVisits")}
        <Sparkline
          data={visits}
          name={t("visits")}
          format={(value) => number.format(value)}
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("visitsAria")}
        />
        <strong>{number.format(visits[visits.length - 1])}</strong>
      </div>
      <div>
        {t("inlineErrors")}
        <Sparkline
          data={errors}
          type="bar"
          name={t("errors")}
          color="var(--danger-color)"
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("errorsAria")}
        />
      </div>
      <div>
        {t("inlineTemperature")}
        <Sparkline
          data={temperature}
          type="area"
          name={t("temperature")}
          format={(value) => celsius.format(value)}
          color="var(--warning-color)"
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("temperatureAria")}
        />
        <strong>{celsius.format(temperature[temperature.length - 1])}</strong>
      </div>
    </div>
  );
}

```

## Example: KPI 卡片

放在 Card 中、位于指标数值及其变化下方的迷你图：趋势为数字提供了上下文。每张卡片选用与指标相符的类型和颜色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/kpi-cards.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tag,
} from "minerva-design";
import { Sparkline, type SparklineConfig } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 30 daily values drifting from `from` to `to`, with some day-to-day wobble */
const trend = (seed: number, from: number, to: number, noise: number) => {
  const random = mulberry32(seed);
  const values: number[] = [];
  let wobble = 0;
  for (let i = 0; i < 30; i++) {
    wobble = wobble * 0.6 + (random() - 0.5) * noise;
    values.push(Math.round((from + ((to - from) * i) / 29) * (1 + wobble)));
  }
  return values;
};

interface Kpi {
  label: string;
  value: string;
  /** Change over the period, 0.125 = +12.5% */
  delta: number;
  /** The change is good news (an increase is not always one) */
  good: boolean;
  spark: SparklineConfig;
}

export default function KpiCardsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const kpis = useMemo((): Kpi[] => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const compactUsd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    return [
      {
        label: t("revenue"),
        value: compactUsd.format(128_400),
        delta: 0.125,
        good: true,
        spark: {
          data: trend(1, 3600, 4400, 0.12),
          type: "area",
          name: t("revenue"),
          format: (v) => usd.format(v),
        },
      },
      {
        label: t("activeUsers"),
        value: number.format(24_310),
        delta: 0.041,
        good: true,
        spark: {
          data: trend(2, 23_000, 24_300, 0.04),
          name: t("activeUsers"),
          format: (v) => number.format(v),
        },
      },
      {
        label: t("signups"),
        value: number.format(1_842),
        delta: -0.032,
        good: false,
        spark: {
          data: trend(3, 66, 58, 0.3),
          type: "bar",
          name: t("signups"),
          color: "var(--warning-color)",
        },
      },
      {
        label: t("p95"),
        value: ms.format(182),
        delta: -0.08,
        good: true,
        spark: {
          data: trend(4, 205, 180, 0.08),
          name: t("p95"),
          format: (v) => ms.format(v),
          reference: 200,
          color: "var(--success-color)",
        },
      },
    ];
  }, [t, locale]);
  // "+12.5%", "-3.2 %"...
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {kpis.map((kpi) => (
        <Card key={kpi.label} padding="medium">
          <CardHeader>
            <CardDescription>{kpi.label}</CardDescription>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <CardTitle style={{ fontSize: 24 }}>{kpi.value}</CardTitle>
              <Tag size="small" color={kpi.good ? "success" : "danger"}>
                {percent.format(kpi.delta)}
              </Tag>
            </div>
          </CardHeader>
          <CardContent>
            <Sparkline
              {...kpi.spark}
              height={56}
              ariaLabel={t("last30Aria", { metric: kpi.label })}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

```

## Example: 切换时段

RadioGroup 选择最近 7、30 或 90 天：总额、相对上一时段的变化和颜色都由同一组数值计算，reference 标出该时段的日均值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/periods.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Tag } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Daily revenue (€) of an online shop over the last 90 days: a slow
// summer, a back-to-school rise, then a dip in the last week
const revenue = (() => {
  const random = mulberry32(90);
  return Array.from({ length: 90 }, (_, i) => {
    const season = i < 40 ? 5200 : 5200 + (i - 40) * 45;
    const dip = i >= 83 ? 0.82 : 1;
    return Math.round(season * dip * (0.88 + random() * 0.24));
  });
})();

const periods = { week: 7, month: 30, quarter: 90 } as const;
type Period = keyof typeof periods;

export default function PeriodsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;
  const [period, setPeriod] = useState<Period>("month");

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  // the last N days, compared with the N days before (or, for the whole
  // quarter, its first half with its second)
  const { values, total, change, average } = useMemo(() => {
    const days = periods[period];
    const values = revenue.slice(-days);
    const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);
    const total = sum(values);
    const change =
      days < revenue.length
        ? total / sum(revenue.slice(-2 * days, -days)) - 1
        : sum(revenue.slice(45)) / sum(revenue.slice(0, 45)) - 1;
    return { values, total, change, average: total / days };
  }, [period]);
  const up = change >= 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%", maxWidth: 480 }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(value as Period)}
      >
        <Radio value="week" label={t("periods.week")} />
        <Radio value="month" label={t("periods.month")} />
        <Radio value="quarter" label={t("periods.quarter")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontSize: 24, fontWeight: 600 }}>{euros(total)}</span>
        <Tag size="small" color={up ? "success" : "danger"}>
          {percent.format(change)}
        </Tag>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {period === "quarter" ? t("vsFirstHalf") : t("vsPrevious")}
        </span>
      </output>
      <Sparkline
        data={values}
        type={period === "week" ? "bar" : "line"}
        color={up ? "var(--success-color)" : "var(--danger-color)"}
        name={t("revenue")}
        format={euros}
        // dashed line at the daily average of the period
        reference={average}
        height={64}
        ariaLabel={t("periodAria", { period: t(`periods.${period}`) })}
      />
    </div>
  );
}

```

## Example: 服务器实时监控

柱状迷你图每秒加入一个新的 CPU 采样；超过告警阈值时，颜色和标签变为红色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/servers.tsx

```tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

const LIMIT = 80; // % CPU before the alert
const POINTS = 40;

const servers = [
  { name: "web-01", base: 35 },
  { name: "web-02", base: 42 },
  { name: "db-primary", base: 66 },
  { name: "worker-01", base: 55 },
];

/** Next CPU sample: a random walk around `base`, with occasional spikes */
const next = (previous: number, base: number) => {
  const spike = Math.random() < 0.05 ? 30 : 0;
  const value =
    previous + (base - previous) * 0.3 + (Math.random() - 0.5) * 14 + spike;
  return Math.max(2, Math.min(100, value));
};

const initial = () =>
  servers.map(({ base }) => Array.from({ length: POINTS }, () => base));

export default function ServersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const [cpu, setCpu] = useState(initial);

  // a new sample per server every second, the oldest one drops out
  useEffect(() => {
    const timer = setInterval(() => {
      setCpu((current) =>
        current.map((samples, i) => [
          ...samples.slice(1),
          next(samples[samples.length - 1], servers[i].base),
        ]),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gap: 8,
        width: "100%",
      }}
    >
      {servers.map((server, i) => {
        const samples = cpu[i];
        const current = samples[samples.length - 1];
        const hot = current >= LIMIT;
        return (
          <li
            key={server.name}
            style={{
              display: "grid",
              gridTemplateColumns: "110px 1fr 64px 90px",
              alignItems: "center",
              gap: 12,
            }}
          >
            <code>{server.name}</code>
            <Sparkline
              data={samples}
              type="bar"
              name={t("cpu")}
              format={(value) => percent.format(value / 100)}
              // red while the server is above the alert threshold
              color={hot ? "var(--danger-color)" : "var(--primary-color)"}
              height={28}
              ariaLabel={t("cpuAria", { server: server.name })}
            />
            <span
              style={{ textAlign: "end", fontVariantNumeric: "tabular-nums" }}
            >
              {percent.format(current / 100)}
            </span>
            <Tag size="small" color={hot ? "danger" : "success"}>
              {hot ? t("alert") : t("healthy")}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}

```

## Example: 每日目标

以柱形显示四周的步数，达到目标的日子通过数据点的 color 着色；reference 绘制目标线，renderTooltip 显示日期和目标完成比例。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/step-goal.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkline,
  type ChartHoverEvent,
  type ChartPointDatum,
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

const DAY = 24 * 60 * 60 * 1000;
const START = Date.UTC(2026, 9, 4);
const GOAL = 10_000;

// Steps counted by a phone over four weeks: long walks at weekends, a
// sick week in the middle
const steps = (() => {
  const random = mulberry32(10);
  return Array.from({ length: 28 }, (_, i) => {
    const weekday = new Date(START + i * DAY).getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    const sick = i >= 12 && i <= 15;
    const base = sick ? 2_500 : weekend ? 12_500 : 8_800;
    return Math.round(base * (0.75 + random() * 0.5));
  });
})();

export default function StepGoalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );
  // the days reaching the goal are green
  const data = useMemo(
    (): ChartPointDatum[] =>
      steps.map((y, x) => ({
        x,
        y,
        color: y >= GOAL ? "var(--success-color)" : "var(--chart-series-1)",
      })),
    [],
  );
  const reached = steps.filter((value) => value >= GOAL).length;

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    const share = item.y / GOAL;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{date.format(START + item.index * DAY)}</strong>
        <span>{t("stepsN", { value: number.format(item.y) })}</span>
        <span
          style={{
            color:
              share >= 1
                ? "var(--success-color)"
                : "var(--text-secondary-color)",
          }}
        >
          {t("ofGoal", { value: percent.format(share) })}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 4, width: "100%", maxWidth: 480 }}>
      <span>
        {t("goalSummary", {
          reached: number.format(reached),
          days: number.format(steps.length),
          goal: number.format(GOAL),
        })}
      </span>
      <Sparkline
        data={data}
        type="bar"
        name={t("steps")}
        // dashed line at the daily goal
        reference={GOAL}
        renderTooltip={tooltip}
        height={72}
        ariaLabel={t("stepsAria")}
      />
    </div>
  );
}

```

## Example: 表格中

在 Table 的一列中为每行放置一个固定宽高的 Sparkline；颜色表示延迟是上升还是下降。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/table.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, Tag, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Service {
  id: string;
  requests: number;
  /** p95 latency of the last 30 days, in ms */
  latency: number[];
}

const services: [string, number, number, number][] = [
  // translation key, requests / min, latency 30 days ago, latency today
  ["gateway", 48_200, 96, 88],
  ["auth", 12_900, 64, 71],
  ["search", 8_400, 210, 162],
  ["payments", 2_150, 320, 395],
  ["notifications", 5_600, 140, 138],
];

const random = mulberry32(30);
const data: Service[] = services.map(([id, requests, from, to]) => {
  const latency = Array.from({ length: 30 }, (_, i) => {
    const value = from + ((to - from) * i) / 29;
    return Math.round(value * (1 + (random() - 0.5) * 0.14));
  });
  latency[0] = from;
  latency[29] = to;
  return { id, requests, latency };
});

const change = (latency: number[]) =>
  latency[latency.length - 1] / latency[0] - 1;

export default function TableDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const columns = useMemo((): TableColumn<Service>[] => {
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return [
      {
        key: "name",
        header: t("service"),
        render: (row) => t(`services.${row.id}`),
      },
      {
        key: "requests",
        header: t("requestsPerMin"),
        align: "right",
        render: (row) => number.format(row.requests),
      },
      {
        key: "trend",
        header: t("latency30"),
        width: 180,
        render: (row) => (
          <Sparkline
            data={row.latency}
            name={t("p95")}
            format={(value) => ms.format(value)}
            // rising latency is bad news
            color={
              change(row.latency) > 0
                ? "var(--danger-color)"
                : "var(--success-color)"
            }
            width={150}
            height={32}
            ariaLabel={t("latencyAria", { service: t(`services.${row.id}`) })}
          />
        ),
      },
      {
        key: "latency",
        header: t("today"),
        align: "right",
        render: (row) => ms.format(row.latency[row.latency.length - 1]),
      },
      {
        key: "change",
        header: t("change"),
        align: "right",
        render: (row) => {
          const value = change(row.latency);
          return (
            <Tag size="small" color={value > 0 ? "danger" : "success"}>
              {percent.format(value)}
            </Tag>
          );
        },
      },
    ];
  }, [t, locale]);

  return (
    <Table
      aria-label={t("serviceLatency")}
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      hoverable
    />
  );
}

```

## Example: 自选股列表

类似交易应用的自选股：每行一条日内面积迷你图，颜色取决于当日涨跌，虚线表示昨收价；价格使用 Intl.NumberFormat 和各股票的币种。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/watchlist.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Quote {
  symbol: string;
  currency: string;
  /** Previous close, then one price every 5 minutes of the session */
  previous: number;
  prices: number[];
}

// symbol, currency, previous close, drift over the session
const symbols: [string, string, number, number][] = [
  ["ACME", "USD", 182.4, 0.021],
  ["NOVA", "USD", 64.15, -0.034],
  ["ORBT", "EUR", 47.9, 0.006],
  ["KITE", "JPY", 2_845, -0.012],
  ["LUMA", "USD", 312.7, 0.047],
];

const random = mulberry32(78);
const quotes: Quote[] = symbols.map(([symbol, currency, previous, drift]) => {
  let price = previous;
  const prices = Array.from({ length: 78 }, (_, i) => {
    price *= 1 + drift / 78 + (random() - 0.5) * 0.006;
    return i === 0 ? previous : price;
  });
  return { symbol, currency, previous, prices };
});

const last = (quote: Quote) => quote.prices[quote.prices.length - 1];
const change = (quote: Quote) => last(quote) / quote.previous - 1;

export default function WatchlistDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const columns = useMemo((): TableColumn<Quote>[] => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 2,
      signDisplay: "exceptZero",
    });
    const money = (currency: string) =>
      new Intl.NumberFormat(locale, { style: "currency", currency });
    // green or red, like the trading apps
    const color = (quote: Quote) =>
      change(quote) >= 0 ? "var(--success-color)" : "var(--danger-color)";
    return [
      {
        key: "symbol",
        header: t("symbol"),
        render: (quote) => (
          <div style={{ display: "grid" }}>
            <strong>{quote.symbol}</strong>
            <small style={{ color: "var(--text-secondary-color)" }}>
              {t(`companies.${quote.symbol}`)}
            </small>
          </div>
        ),
      },
      {
        key: "chart",
        header: t("today"),
        width: 140,
        render: (quote) => (
          <Sparkline
            data={quote.prices}
            type="area"
            color={color(quote)}
            // dashed line at the previous close
            reference={quote.previous}
            name={quote.symbol}
            format={(value) => money(quote.currency).format(value)}
            width={120}
            height={36}
            ariaLabel={t("intradayAria", { symbol: quote.symbol })}
          />
        ),
      },
      {
        key: "price",
        header: t("price"),
        align: "right",
        render: (quote) => money(quote.currency).format(last(quote)),
      },
      {
        key: "change",
        header: t("change"),
        align: "right",
        render: (quote) => (
          <span style={{ color: color(quote), fontWeight: 600 }}>
            {percent.format(change(quote))}
          </span>
        ),
      },
    ];
  }, [t, locale]);

  return (
    <Table
      aria-label={t("watchlist")}
      columns={columns}
      data={quotes}
      rowKey={(quote) => quote.symbol}
      hoverable
    />
  );
}

```

## Example: 小多图

在 Card 网格中为每个城市放一个 Sparkline。每个图按自身范围缩放，因此在上方写出最热和最冷的月份；renderTooltip 显示悬停月份的名称，城市低于冰点时 reference 标出 0 °C。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/demos/weather.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "minerva-design";
import { Sparkline, type ChartHoverEvent } from "minerva-design/charts";

// Average daily high (°C) of each month, January first
const cities = {
  reykjavik: [3, 3, 4, 6, 10, 12, 14, 14, 11, 7, 4, 3],
  montreal: [-5, -3, 2, 11, 19, 24, 26, 25, 20, 13, 6, -2],
  tokyo: [10, 10, 14, 19, 23, 26, 30, 31, 27, 22, 17, 12],
  cairo: [19, 21, 24, 28, 32, 34, 35, 35, 33, 30, 25, 21],
  singapore: [31, 32, 32, 32, 32, 31, 31, 31, 31, 31, 31, 30],
  sydney: [26, 26, 25, 23, 20, 18, 17, 18, 20, 22, 24, 25],
} as const;
type City = keyof typeof cities;

export default function WeatherDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const months = useMemo(() => {
    const short = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    const long = new Intl.DateTimeFormat(locale, {
      month: "long",
      timeZone: "UTC",
    });
    return Array.from({ length: 12 }, (_, m) => ({
      short: short.format(Date.UTC(2026, m, 1)),
      long: long.format(Date.UTC(2026, m, 1)),
    }));
  }, [locale]);

  // the hovered month by name instead of its index
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <span>
        {months[item.index]?.long}: <strong>{celsius(item.y)}</strong>
      </span>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
        width: "100%",
      }}
    >
      {(Object.keys(cities) as City[]).map((city, i) => {
        const values: readonly number[] = cities[city];
        const max = Math.max(...values);
        const min = Math.min(...values);
        const name = t(`cities.${city}`);
        return (
          <Card key={city} padding="medium">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                {t("warmestColdest", {
                  max: celsius(max),
                  maxMonth: months[values.indexOf(max)]?.short,
                  min: celsius(min),
                  minMonth: months[values.indexOf(min)]?.short,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* every sparkline is scaled to its own range: compare the
                  shapes, and read the levels in the text above */}
              <Sparkline
                data={values}
                type="area"
                color={`var(--chart-series-${(i % 6) + 1})`}
                // freezing point, when the city goes below it
                reference={min < 0 ? 0 : undefined}
                renderTooltip={tooltip}
                height={48}
                ariaLabel={t("weatherAria", { city: name })}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

```
