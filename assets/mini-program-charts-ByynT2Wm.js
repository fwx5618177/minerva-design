import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{r as t}from"./native-preview-BRFLbKzw.js";import{o as n,t as r}from"./react-vendor-CVmG4vV9.js";import{m as i,p as a}from"./PropsTable-DTM3g5QS.js";import{Dt as o,Ot as s}from"./io5-CsJcK0E2.js";import{n as c,t as l}from"./CodeBlock-BQgsMlY6.js";import{i as u,r as d}from"./DemoBlock-BlhGv9r1.js";import{n as f,t as p}from"./DocPage-PfpTBKws.js";function m(){let{t:e}=s();return(0,h.jsxs)(p,{id:`mini-program-charts`,children:[(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-intro`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-intro`,children:e(`docs.mini-program-charts.intro.title`)}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.intro.text`)}),(0,h.jsx)(`p`,{className:d.prose,children:(0,h.jsx)(a,{i18nKey:`docs.mini-program-charts.intro.engine`,components:{engine:(0,h.jsx)(r,{to:`/chart-engine`})}})})]}),(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-taro`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-taro`,children:e(`docs.mini-program-charts.taro.title`)}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.taro.text`)}),(0,h.jsx)(l,{language:`tsx`,code:g}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.taro.ref`)})]}),(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-uni`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-uni`,children:e(`docs.mini-program-charts.uni.title`)}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.uni.text`)}),(0,h.jsx)(l,{language:`html`,title:`Dashboard.vue`,code:_}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.uni.events`)})]}),(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-weapp`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-weapp`,children:e(`docs.mini-program-charts.weapp.title`)}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.weapp.text`)}),(0,h.jsx)(l,{language:`json`,title:`index.json`,code:v}),(0,h.jsx)(l,{language:`html`,title:`index.wxml`,code:y}),(0,h.jsx)(l,{language:`js`,title:`index.js`,code:b}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.weapp.events`)}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.weapp.methods`)})]}),(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-props`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-props`,children:e(`docs.mini-program-charts.props.title`)}),(0,h.jsxs)(`ul`,{className:d.prose,children:[(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.props.shared`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.props.series`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.props.quadrant`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.props.events`)})]})]}),(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-gestures`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-gestures`,children:e(`docs.mini-program-charts.gestures.title`)}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.gestures.text`)})]}),(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-theming`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-theming`,children:e(`docs.mini-program-charts.theming.title`)}),(0,h.jsx)(`p`,{className:d.prose,children:e(`docs.mini-program-charts.theming.text`)})]}),(0,h.jsxs)(`section`,{className:d.section,"aria-labelledby":`mini-charts-limitations`,children:[(0,h.jsx)(`h2`,{id:`mini-charts-limitations`,children:e(`docs.mini-program-charts.limitations.title`)}),(0,h.jsxs)(`ul`,{className:d.prose,children:[(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.limitations.canvas`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.limitations.content`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.limitations.input`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.limitations.scroll`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.limitations.data`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.limitations.draggable`)}),(0,h.jsx)(`li`,{children:e(`docs.mini-program-charts.limitations.hidden`)})]}),(0,h.jsx)(`p`,{className:d.prose,children:(0,h.jsx)(a,{i18nKey:`docs.mini-program-charts.limitations.more`,components:{support:(0,h.jsx)(r,{to:`/platform-support`}),native:(0,h.jsx)(r,{to:`/react-native`})}})})]})]})}var h,g,_,v,y,b;function x(){return(x=e((()=>{i(),o(),n(),c(),f(),u(),h=t(),g=`import { useState } from "react";
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
}`,_=`<script setup lang="ts">
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
<\/script>

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
</template>`,v=`{
  "usingComponents": {
    "mn-line-chart": "minerva-design/line-chart/index",
    "mn-quadrant-chart": "minerva-design/quadrant-chart/index"
  }
}`,y=`<mn-line-chart
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
/>`,b=`Page({
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
});`})))()}x();export{m as default};