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

const shapesExample = `import { useRef } from "react";
import Taro, { useReady, useUnload } from "@tarojs/taro";
import { Canvas } from "@tarojs/components";
import {
  createCanvasShapeChart,
  type CanvasShapeChartInstance,
} from "minerva-design/charts/core";

export default function Plans() {
  const chart = useRef<CanvasShapeChartInstance | null>(null);

  useReady(() => {
    Taro.createSelectorQuery()
      .select("#plans")
      .fields({ node: true, size: true })
      .exec(([res]) => {
        chart.current = createCanvasShapeChart({
          canvas: res.node,
          width: res.width,
          height: res.height,
          pixelRatio: Taro.getWindowInfo().pixelRatio,
          options: {
            type: "pie",
            innerRadius: 0.62,
            centerValue: "8.4k",
            centerLabel: "users",
            data: [
              { name: "Free", value: 5400 },
              { name: "Pro", value: 2100 },
              { name: "Team", value: 860 },
            ],
          },
          // plain values of the Minerva CSS variables
          theme: { variables: { "--primary-color": "#4f46e5" } },
        });
        chart.current.on("click", (slice) =>
          Taro.showToast({ title: slice.name, icon: "none" }),
        );
      });
  });
  useUnload(() => chart.current?.destroy());

  // mini-program canvas touches carry x / y relative to the canvas
  return (
    <Canvas
      type="2d"
      id="plans"
      style={{ width: "100%", height: "260px" }}
      onTouchStart={(e) => chart.current?.touchStart(e.changedTouches)}
      onTouchMove={(e) => chart.current?.touchMove(e.touches)}
      onTouchEnd={(e) => chart.current?.touchEnd(e.changedTouches)}
      onTouchCancel={(e) => chart.current?.touchCancel(e.changedTouches)}
    />
  );
}`;

export default function MiniProgramChartsDoc() {
  const { t } = useTranslation();
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
        <CodeBlock language="tsx" title="Plans.tsx" code={shapesExample} />
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.touches")}
        </p>
        <p className={styles.prose}>
          {t("docs.mini-program-charts.shapes.weapp")}
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
