import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const taroExample = `import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type QuadrantPoint,
} from "minerva-design/taro";
import "minerva-design/tokens.mini.css";
import "minerva-design/taro/style.css";

export default function Dashboard() {
  const [picked, setPicked] = useState("");
  const [tasks, setTasks] = useState<QuadrantPoint[]>([
    { x: 8, y: 9, label: "Release" },
    { x: 3, y: 7, label: "Planning" },
  ]);

  return (
    <View className={miniTokenClassNames()}>
      <LineChart
        height={240}
        series={[{ name: "Sales", data: [12, 18, 9, 24] }]}
        xAxis={{ title: "Month" }}
        tooltip={{ render: (event) => \`Sales: \${event.items[0]?.y}\` }}
        onPointClick={(event) => setPicked(event.xLabel)}
      />
      <Text>{picked}</Text>
      <QuadrantChart
        points={tasks}
        reverseX
        showTicks={false}
        quadrants={{ topLeft: { label: "Do first" } }}
        axisLabels={{ top: "Important", left: "Urgent" }}
        onQuadrantClick={(quadrant, at) =>
          setTasks((list) => [...list, { ...at, label: "New task" }])
        }
        onPointDrop={(task, index, target) =>
          setTasks((list) =>
            list.map((p, i) => (i === index ? { ...p, x: target.x, y: target.y } : p)),
          )
        }
      />
    </View>
  );
}`;

const uniExample = `<script setup lang="ts">
import { ref } from "vue";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type ChartHandle,
  type ChartHoverEvent,
  type QuadrantDropTarget,
  type QuadrantPoint,
} from "minerva-design/uni";
import "minerva-design/tokens.mini.css";
import "minerva-design/uni/style.css";

const series = ref([{ name: "Sales", data: [12, 18, 9, 24] }]);
const tasks = ref<QuadrantPoint[]>([{ x: 8, y: 9, label: "Release" }]);
const picked = ref("");
const chart = ref<ChartHandle>(); // chart.value?.resize(), resetZoom()...

const show = (event: ChartHoverEvent) => (picked.value = event.xLabel);
function move(point: QuadrantPoint, index: number, target: QuadrantDropTarget) {
  // replace the array: arrays mutated in place are not read again
  tasks.value = tasks.value.map((p, i) =>
    i === index ? { ...p, x: target.x, y: target.y } : p,
  );
}
function add() {
  tasks.value = [...tasks.value, { x: 7.5, y: 7.5, label: "New task" }];
}
</script>

<template>
  <view :class="miniTokenClassNames()">
    <LineChart ref="chart" :series="series" height="480rpx" area @point-click="show" />
    <text>{{ picked }}</text>
    <QuadrantChart
      :points="tasks"
      :quadrants="{ topRight: { label: 'Do first' } }"
      :axis-labels="{ top: 'Important' }"
      @point-drop="move"
    >
      <template #topRight>
        <button size="mini" @click="add">+</button>
      </template>
    </QuadrantChart>
  </view>
</template>`;

const weappJson = `{
  "usingComponents": {
    "mn-line-chart": "minerva-design/line-chart/index",
    "mn-quadrant-chart": "minerva-design/quadrant-chart/index"
  }
}`;

const weappWxml = `<mn-line-chart
  id="visits"
  series="{{series}}"
  x-axis="{{xAxis}}"
  area
  height="240"
  bind:pointclick="onPoint"
/>
<mn-quadrant-chart
  points="{{tasks}}"
  quadrants="{{regions}}"
  axis-labels="{{ends}}"
  draggable
  disable-scroll
  bind:pointdrop="onDrop"
  bind:quadrantclick="onQuadrant"
/>`;

const weappJs = `Page({
  data: {
    series: [{ name: "Visits", data: [["Mon", 3], ["Tue", 5], ["Wed", 4]] }],
    xAxis: { type: "category" },
    tasks: [{ x: 8, y: 9, label: "Release" }],
    regions: { topRight: { label: "Do first" } },
    ends: { top: "Important" },
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#visits").configure({
      yAxis: { format: (value) => \`\${value}k\` },
      renderTooltip: (event) => \`\${event.xLabel}\\n\${event.items[0].y}k visits\`,
    });
  },
  onPoint(event) {
    wx.showToast({ title: event.detail.xLabel, icon: "none" });
  },
  onDrop(event) {
    const { index, target } = event.detail;
    // the chart does not move points: update them
    this.setData({
      [\`tasks[\${index}].x\`]: target.x,
      [\`tasks[\${index}].y\`]: target.y,
    });
  },
  onQuadrant(event) {
    const { x, y } = event.detail;
    this.setData({ tasks: [...this.data.tasks, { x, y, label: "New task" }] });
  },
});`;

const newTypesExample = `import { BarChart, Chart, LineChart } from "minerva-design/taro";
import { heatmapChartOptions } from "minerva-design/charts/core";

const prices = [
  {
    name: "ACME",
    type: "candlestick",
    data: [
      { x: 1, open: 102, high: 108, low: 99, y: 106 },
      { x: 2, open: 106, high: 107, low: 97, y: 98 },
      { x: 3, open: 98, high: 104, low: 96, y: 103 },
    ],
  },
] as const;

const load = heatmapChartOptions({
  data: [
    { x: "Mon", y: "AM", value: 12 },
    { x: "Mon", y: "PM", value: 30 },
    { x: "Tue", y: "AM", value: 18 },
    { x: "Tue", y: "PM", value: 26 },
  ],
});

export function Charts() {
  return (
    <>
      <Chart series={prices} height={220} />
      <Chart
        series={load.series}
        xAxis={load.xAxis}
        yAxis={load.yAxis}
        legend={load.legend}
        tooltip={load.tooltip}
        interaction={load.interaction}
        height={200}
      />
      {/* curve and stack are set on each series */}
      <LineChart
        area
        series={[
          { name: "Web", data: [20, 24, 30], curve: "smooth", stack: "users" },
          { name: "App", data: [12, 18, 17], curve: "smooth", stack: "users" },
        ]}
      />
      <BarChart
        series={[
          {
            name: "Orders",
            showLabels: true,
            data: [
              { x: "Q1", y: 128 },
              { x: "Q2", y: 212, color: "#16a34a" },
            ],
          },
        ]}
      />
    </>
  );
}`;

const CARTESIAN = [
  "Chart",
  "LineChart",
  "AreaChart",
  "BarChart",
  "HorizontalBarChart",
  "ScatterChart",
  "QuadrantChart",
  "CandlestickChart",
  "HeatmapChart",
  "Sparkline",
  "RangeAreaChart",
  "MixedChart",
  "BubbleChart",
  "HistogramChart",
  "BoxPlotChart",
  "WaterfallChart",
  "GanttChart",
];
const SHAPES = [
  "PieChart",
  "DonutChart",
  "RadarChart",
  "GaugeChart",
  "FunnelChart",
  "TreemapChart",
  "SankeyChart",
  "SunburstChart",
  "RadialBarChart",
  "CalendarHeatmap",
  "BulletChart",
  "ChordChart",
  "ShapeChart",
];
const DOM_ONLY = [
  "TradingChart",
  "DepthChart",
  "OrderBook",
  "OrderBookHeatmap",
  "TimeAndSales",
  "Scatter3DChart",
  "Surface3DChart",
  "Bar3DChart",
  "Line3DChart",
];
/** WeChat component folder of a component: AreaChart -> area-chart */
const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (c, i: number) => (i ? "-" : "") + c.toLowerCase());

const taroNamed = `import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  AreaChart,
  GanttChart,
  Sparkline,
  SunburstChart,
} from "minerva-design/taro";

const day = 86_400_000;
const start = Date.UTC(2026, 2, 2);

export default function Overview() {
  const [path, setPath] = useState<string[]>([]);
  return (
    <View>
      <Sparkline data={[42, 47, 45, 52, 58, 61]} type="area" />
      <AreaChart
        percent
        series={[
          { name: "Web", data: [["Q1", 42], ["Q2", 48], ["Q3", 51]] },
          { name: "App", data: [["Q1", 58], ["Q2", 52], ["Q3", 49]] },
        ]}
      />
      <GanttChart
        today={start + 10 * day}
        tasks={[
          { name: "Design", start, end: start + 12 * day, progress: 1 },
          { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
          { name: "Launch", start: start + 32 * day, milestone: true },
        ]}
      />
      <SunburstChart
        data={[
          { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
          { name: "Apps", value: 18 },
        ]}
        onDrill={(event) => setPath(event.path)}
      />
      <Text>{path.join(" / ")}</Text>
    </View>
  );
}`;

const uniNamed = `<script setup lang="ts">
import { ref } from "vue";
import {
  HeatmapChart,
  SankeyChart,
  SunburstChart,
  WaterfallChart,
  type ShapeDrillEvent,
} from "minerva-design/uni";

const cells = ref([
  { x: "Mon", y: "AM", value: 12 },
  { x: "Mon", y: "PM", value: 30 },
  { x: "Tue", y: "AM", value: 18 },
  { x: "Tue", y: "PM", value: 26 },
]);
const steps = ref([
  { label: "Revenue", value: 420 },
  { label: "Costs", value: -260 },
  { label: "Profit", kind: "total" as const },
]);
const links = ref([
  { source: "Ads", target: "Site", value: 60 },
  { source: "Search", target: "Site", value: 40 },
  { source: "Site", target: "Sign-up", value: 30 },
]);
const folders = ref([
  { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
  { name: "Apps", value: 18 },
]);
const path = ref<string[]>([]);
const onDrill = (event: ShapeDrillEvent) => (path.value = event.path);
</script>

<template>
  <HeatmapChart :data="cells" height="400rpx" />
  <WaterfallChart :steps="steps" orientation="horizontal" />
  <SankeyChart :links="links" />
  <SunburstChart :data="folders" @drill="onDrill" />
  <text>{{ path.join(" / ") }}</text>
</template>`;

const weappNamedJson = `{
  "usingComponents": {
    "mn-gantt-chart": "minerva-design/gantt-chart/index",
    "mn-sunburst-chart": "minerva-design/sunburst-chart/index",
    "mn-bullet-chart": "minerva-design/bullet-chart/index"
  }
}`;

const weappNamedWxml = `<mn-gantt-chart id="plan" tasks="{{tasks}}" today="{{today}}" />
<mn-sunburst-chart data="{{folders}}" bind:drill="onDrill" />
<text>{{path}}</text>
<mn-bullet-chart data="{{kpis}}" ranges="{{ranges}}" />`;

const weappNamedJs = `const day = 86400000;
const start = Date.UTC(2026, 2, 2);

Page({
  data: {
    // timestamps: Date objects do not survive setData
    tasks: [
      { name: "Design", start, end: start + 12 * day, progress: 1 },
      { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
    ],
    today: start + 10 * day,
    folders: [
      { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
      { name: "Apps", value: 18 },
    ],
    path: "",
    kpis: [{ name: "Revenue", value: 270, target: 250 }],
    ranges: [150, 225, 300],
  },
  onReady() {
    this.selectComponent("#plan").configure({
      formatProgress: (share) => \`\${Math.round(share * 100)}%\`,
    });
  },
  onDrill(event) {
    this.setData({ path: event.detail.path.join(" / ") });
  },
});`;

const taroShapes = `import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  DonutChart,
  GaugeChart,
  ShapeChart,
  type ShapeHoverEvent,
} from "minerva-design/taro";

const plans = [
  { name: "Free", value: 5400 },
  { name: "Pro", value: 2100 },
  { name: "Team", value: 860 },
];

export default function Plans() {
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);
  const [hidden, setHidden] = useState<number[]>([]);
  return (
    <View>
      <DonutChart
        data={plans}
        height={260}
        centerValue="8.4k"
        centerLabel="users"
        percentFormat={(share) => \`\${Math.round(share * 100)}%\`}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        onClick={setPicked}
      />
      <Text>{picked ? \`\${picked.name}: \${picked.value}\` : "Tap a plan"}</Text>
      <GaugeChart value={72} label="Storage" height={200} />
      {/* any shape type of the engine, from its options */}
      <ShapeChart
        options={{
          type: "funnel",
          data: [
            { name: "Visit", value: 1200 },
            { name: "Sign up", value: 380 },
            { name: "Paid", value: 95 },
          ],
        }}
      />
    </View>
  );
}`;

const uniShapes = `<script setup lang="ts">
import { ref } from "vue";
import {
  PieChart,
  RadarChart,
  type ShapeChartHandle,
  type ShapeHoverEvent,
} from "minerva-design/uni";

const sources = ref([
  { name: "Search", value: 48 },
  { name: "Direct", value: 23 },
  { name: "Social", value: 16 },
]);
const picked = ref("");
const radar = ref<ShapeChartHandle>(); // radar.value?.getInstance()?.toggle(0)
const pick = (slice: ShapeHoverEvent) => (picked.value = slice.name);
</script>

<template>
  <PieChart :data="sources" labels="inside" height="520rpx" @click="pick" />
  <text>{{ picked }}</text>
  <RadarChart
    ref="radar"
    :indicators="[{ name: 'Speed' }, { name: 'Power' }, { name: 'Range' }]"
    :series="[{ name: 'Model A', values: [3, 4, 2] }]"
    shape="circle"
  />
</template>`;

const weappShapesJson = `{
  "usingComponents": {
    "mn-pie-chart": "minerva-design/pie-chart/index",
    "mn-gauge-chart": "minerva-design/gauge-chart/index",
    "mn-shape-chart": "minerva-design/shape-chart/index"
  }
}`;

const weappShapesWxml = `<mn-pie-chart
  id="sources"
  data="{{sources}}"
  inner-radius="{{0.6}}"
  center-value="87"
  bind:click="onSlice"
  bind:toggle="onToggle"
/>
<mn-gauge-chart value="{{cpu}}" label="CPU" bands="{{bands}}" needle />
<mn-shape-chart options="{{treemap}}" height="300" />`;

const weappShapesJs = `Page({
  data: {
    sources: [
      { name: "Search", value: 48 },
      { name: "Direct", value: 23 },
      { name: "Social", value: 16 },
    ],
    cpu: 64,
    bands: [
      { to: 70, color: "var(--success-color)" },
      { to: 100, color: "var(--danger-color)" },
    ],
    // shape-chart: any shape type, options without functions
    treemap: {
      type: "treemap",
      data: [
        { name: "Photos", value: 38 },
        { name: "Apps", children: [{ name: "Games", value: 14 }, { name: "Maps", value: 3 }] },
      ],
    },
    hiddenCount: 0,
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#sources").configure({
      percentFormat: (share) => \`\${Math.round(share * 100)}%\`,
      renderTooltip: (slice) => \`\${slice.name}\\n\${slice.value} visits\`,
    });
  },
  onSlice(event) {
    wx.showToast({ title: event.detail.name, icon: "none" });
  },
  onToggle(event) {
    this.setData({ hiddenCount: event.detail.hiddenIndexes.length });
  },
});`;

const weappCoreExample = `// pages/plans/index.js, with <canvas type="2d" id="plans" bindtouchstart="onTouchStart" ...>
const { createCanvasShapeChart } = require("minerva-design/charts/core");

Page({
  onReady() {
    wx.createSelectorQuery()
      .select("#plans")
      .fields({ node: true, size: true })
      .exec(([res]) => {
        this.chart = createCanvasShapeChart({
          canvas: res.node,
          width: res.width,
          height: res.height,
          pixelRatio: wx.getWindowInfo().pixelRatio,
          options: {
            type: "pie",
            innerRadius: 0.62,
            data: [
              { name: "Free", value: 5400 },
              { name: "Pro", value: 2100 },
            ],
          },
          // plain values of the Minerva CSS variables
          theme: { variables: { "--primary-color": "#4f46e5" } },
        });
        this.chart.on("click", (slice) =>
          wx.showToast({ title: slice.name, icon: "none" }),
        );
      });
  },
  // mini-program canvas touches carry x / y relative to the canvas
  onTouchStart(e) { this.chart?.touchStart(e.changedTouches); },
  onTouchMove(e) { this.chart?.touchMove(e.touches); },
  onTouchEnd(e) { this.chart?.touchEnd(e.changedTouches); },
  onTouchCancel(e) { this.chart?.touchCancel(e.changedTouches); },
  onUnload() { this.chart?.destroy(); },
});`;

/** Localized values of the locale samples */
interface LocaleSample {
  comment: string;
  ticks: string;
  open: string;
  close: string;
  noData: string;
  apps: string;
  web: string;
  store: string;
}

const taroLocale = (s: LocaleSample) => `import Taro from "@tarojs/taro";
import { CandlestickChart, ChordChart, type ChartSeries } from "minerva-design/taro";

// ${s.comment}
const locale = Taro.getAppBaseInfo().language.replace("_", "-");

export function Report({ candles }: { candles: ChartSeries[] }) {
  return (
    <>
      <CandlestickChart
        locale={locale}
        labels={{ open: "${s.open}", close: "${s.close}" }}
        series={candles}
      />
      <ChordChart
        locale={locale}
        texts={{ noData: "${s.noData}" }}
        groups={["${s.apps}", "${s.web}", "${s.store}"]}
        matrix={[
          [0, 5, 2],
          [3, 0, 4],
          [1, 2, 0],
        ]}
      />
    </>
  );
}`;

const uniLocale = (s: LocaleSample) => `<script setup lang="ts">
import { CandlestickChart, ChordChart } from "minerva-design/uni";

defineProps<{ candles: object[] }>();
// ${s.comment}
const locale = uni.getLocale();
const matrix = [
  [0, 5, 2],
  [3, 0, 4],
  [1, 2, 0],
];
</script>

<template>
  <CandlestickChart
    :series="candles"
    :locale="locale"
    :labels="{ open: '${s.open}', close: '${s.close}' }"
  />
  <ChordChart
    :groups="['${s.apps}', '${s.web}', '${s.store}']"
    :matrix="matrix"
    :locale="locale"
    :texts="{ noData: '${s.noData}' }"
  />
</template>`;

const weappLocaleJson = `{
  "usingComponents": {
    "mn-candlestick-chart": "minerva-design/candlestick-chart/index",
    "mn-chord-chart": "minerva-design/chord-chart/index"
  }
}`;

const weappLocaleWxml = `<mn-candlestick-chart series="{{candles}}" locale="{{locale}}" labels="{{labels}}" />
<mn-chord-chart
  id="flows"
  groups="{{groups}}"
  matrix="{{matrix}}"
  locale="{{locale}}"
  texts="{{texts}}"
/>`;

const weappLocaleJs = (s: LocaleSample) => `Page({
  data: {
    // ${s.comment}
    locale: wx.getAppBaseInfo().language.replace("_", "-"),
    labels: { open: "${s.open}", close: "${s.close}" },
    texts: { noData: "${s.noData}" },
    groups: ["${s.apps}", "${s.web}", "${s.store}"],
    matrix: [
      [0, 5, 2],
      [3, 0, 4],
      [1, 2, 0],
    ],
    candles: [],
  },
  onReady() {
    // ${s.ticks}
    const ticks = new Intl.NumberFormat(this.data.locale, { notation: "compact" });
    this.selectComponent("#flows").configure({
      tickFormat: (value) => ticks.format(value),
    });
  },
});`;

export default function MiniProgramChartsDoc() {
  const { t } = useTranslation();
  const sample: LocaleSample = {
    comment: t("docs.mini-program-charts.locale.sample.comment"),
    ticks: t("docs.mini-program-charts.locale.sample.ticks"),
    open: t("docs.mini-program-charts.locale.sample.open"),
    close: t("docs.mini-program-charts.locale.sample.close"),
    noData: t("docs.mini-program-charts.locale.sample.noData"),
    apps: t("docs.mini-program-charts.locale.sample.apps"),
    web: t("docs.mini-program-charts.locale.sample.web"),
    store: t("docs.mini-program-charts.locale.sample.store"),
  };
  return (
    <DocPage id="mini-program-charts">
      <section className={styles.section} aria-labelledby="mini-charts-intro">
        <h2 id="mini-charts-intro">
          {t("docs.mini-program-charts.intro.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.intro.text")}
        </p>
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.mini-program-charts.intro.engine"
            components={{ engine: <Link to="/chart-engine" /> }}
          />
        </p>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-taro">
        <h2 id="mini-charts-taro">
          {t("docs.mini-program-charts.taro.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.taro.text")}
        </p>
        <CodeBlock language="tsx" code={taroExample} />
        <p className={styles.prose}>{t("docs.mini-program-charts.taro.ref")}</p>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-uni">
        <h2 id="mini-charts-uni">{t("docs.mini-program-charts.uni.title")}</h2>
        <p className={styles.prose}>{t("docs.mini-program-charts.uni.text")}</p>
        <CodeBlock language="html" title="Dashboard.vue" code={uniExample} />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.uni.events")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-weapp">
        <h2 id="mini-charts-weapp">
          {t("docs.mini-program-charts.weapp.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.weapp.text")}
        </p>
        <CodeBlock language="json" title="index.json" code={weappJson} />
        <CodeBlock language="html" title="index.wxml" code={weappWxml} />
        <CodeBlock language="js" title="index.js" code={weappJs} />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.weapp.events")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.weapp.methods")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-named">
        <h2 id="mini-charts-named">
          {t("docs.mini-program-charts.named.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.named.text")}
        </p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={t("docs.mini-program-charts.named.title")}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">{t("docs.mini-program-charts.named.group")}</th>
                <th scope="col">
                  {t("docs.mini-program-charts.named.taroUni")}
                </th>
                <th scope="col">
                  {t("docs.mini-program-charts.named.weappColumn")}
                </th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["cartesian", CARTESIAN],
                  ["shape", SHAPES],
                ] as const
              ).map(([group, names]) => (
                <tr key={group}>
                  <th scope="row">
                    {t(`docs.mini-program-charts.named.${group}`)}
                  </th>
                  <td>
                    {names.map((name, i) => (
                      <span key={name}>
                        {i ? ", " : ""}
                        <code>{name}</code>
                      </span>
                    ))}
                  </td>
                  <td>
                    {names.map((name, i) => (
                      <span key={name}>
                        {i ? ", " : ""}
                        <code>{kebab(name)}</code>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">
                  {t("docs.mini-program-charts.named.domOnly")}
                </th>
                <td colSpan={2}>
                  {DOM_ONLY.map((name, i) => (
                    <span key={name}>
                      {i ? ", " : ""}
                      <code>{name}</code>
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.named.props")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.named.presets")}
        </p>
        <h3>{t("docs.mini-program-charts.taro.title")}</h3>
        <CodeBlock language="tsx" title="Overview.tsx" code={taroNamed} />
        <h3>{t("docs.mini-program-charts.uni.title")}</h3>
        <CodeBlock language="html" title="Overview.vue" code={uniNamed} />
        <h3>{t("docs.mini-program-charts.weapp.title")}</h3>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.named.weapp")}
        </p>
        <CodeBlock language="json" title="index.json" code={weappNamedJson} />
        <CodeBlock language="html" title="index.wxml" code={weappNamedWxml} />
        <CodeBlock language="js" title="index.js" code={weappNamedJs} />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.named.drill")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.named.domOnlyText")}
        </p>
      </section>

      <section
        className={styles.section}
        aria-labelledby="mini-charts-new-types"
      >
        <h2 id="mini-charts-new-types">
          {t("docs.mini-program-charts.newTypes.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.newTypes.text")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.newTypes.heatmap")}
        </p>
        <CodeBlock language="tsx" code={newTypesExample} />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.newTypes.limits")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-shapes">
        <h2 id="mini-charts-shapes">
          {t("docs.mini-program-charts.shapes.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.text")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.chord")}
        </p>
        <h3>{t("docs.mini-program-charts.taro.title")}</h3>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.taro")}
        </p>
        <CodeBlock language="tsx" title="Plans.tsx" code={taroShapes} />
        <h3>{t("docs.mini-program-charts.uni.title")}</h3>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.uni")}
        </p>
        <CodeBlock language="html" title="Traffic.vue" code={uniShapes} />
        <h3>{t("docs.mini-program-charts.weapp.title")}</h3>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.weapp")}
        </p>
        <CodeBlock language="json" title="index.json" code={weappShapesJson} />
        <CodeBlock language="html" title="index.wxml" code={weappShapesWxml} />
        <CodeBlock language="js" title="index.js" code={weappShapesJs} />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.events")}
        </p>
        <h3>{t("docs.mini-program-charts.shapes.coreTitle")}</h3>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.core")}
        </p>
        <CodeBlock language="js" title="index.js" code={weappCoreExample} />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.touches")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-props">
        <h2 id="mini-charts-props">
          {t("docs.mini-program-charts.props.title")}
        </h2>
        <ul className={styles.prose}>
          <li>{t("docs.mini-program-charts.props.shared")}</li>
          <li>{t("docs.mini-program-charts.props.series")}</li>
          <li>{t("docs.mini-program-charts.props.quadrant")}</li>
          <li>{t("docs.mini-program-charts.props.events")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-locale">
        <h2 id="mini-charts-locale">
          {t("docs.mini-program-charts.locale.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.locale.text")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.locale.labels")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.locale.provider")}
        </p>
        <h3>{t("docs.mini-program-charts.taro.title")}</h3>
        <CodeBlock
          language="tsx"
          title="Report.tsx"
          code={taroLocale(sample)}
        />
        <h3>{t("docs.mini-program-charts.uni.title")}</h3>
        <CodeBlock
          language="html"
          title="Report.vue"
          code={uniLocale(sample)}
        />
        <h3>{t("docs.mini-program-charts.weapp.title")}</h3>
        <CodeBlock language="json" title="index.json" code={weappLocaleJson} />
        <CodeBlock language="html" title="index.wxml" code={weappLocaleWxml} />
        <CodeBlock
          language="js"
          title="index.js"
          code={weappLocaleJs(sample)}
        />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.locale.update")}
        </p>
      </section>

      <section
        className={styles.section}
        aria-labelledby="mini-charts-gestures"
      >
        <h2 id="mini-charts-gestures">
          {t("docs.mini-program-charts.gestures.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.gestures.text")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="mini-charts-theming">
        <h2 id="mini-charts-theming">
          {t("docs.mini-program-charts.theming.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.theming.text")}
        </p>
      </section>

      <section
        className={styles.section}
        aria-labelledby="mini-charts-limitations"
      >
        <h2 id="mini-charts-limitations">
          {t("docs.mini-program-charts.limitations.title")}
        </h2>
        <ul className={styles.prose}>
          <li>{t("docs.mini-program-charts.limitations.canvas")}</li>
          <li>{t("docs.mini-program-charts.limitations.content")}</li>
          <li>{t("docs.mini-program-charts.limitations.input")}</li>
          <li>{t("docs.mini-program-charts.limitations.scroll")}</li>
          <li>{t("docs.mini-program-charts.limitations.data")}</li>
          <li>{t("docs.mini-program-charts.limitations.draggable")}</li>
          <li>{t("docs.mini-program-charts.limitations.hidden")}</li>
        </ul>
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.mini-program-charts.limitations.more"
            components={{
              support: <Link to="/platform-support" />,
              native: <Link to="/react-native" />,
            }}
          />
        </p>
      </section>
    </DocPage>
  );
}
