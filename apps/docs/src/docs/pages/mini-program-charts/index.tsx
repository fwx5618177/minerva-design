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
