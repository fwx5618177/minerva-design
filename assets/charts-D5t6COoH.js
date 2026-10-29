import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Dt as r,Ot as i}from"./io5-CvrBnF9y.js";import{i as a,n as o,r as s,t as c}from"./Radio-C6j7YqhD.js";import{i as l,r as u}from"./DemoBlock-3GMi3Uss.js";import{l as d,n as f,t as p,u as m}from"./DocPage-DCMfehF7.js";import{n as h,t as g}from"./Chart-C4uPta0B.js";function _(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function v(){let e=(0,y.useMemo)(()=>{let e=_(42);return[{name:`p95 latency (ms)`,data:Array.from({length:120},(t,n)=>{let r=n>=70&&n<=82?90:0;return[n,105+e()*40+r]})}]},[]);return(0,b.jsx)(g,{series:e,annotations:x,xAxis:{title:`Minutes`},yAxis:{min:0,max:260},height:300,ariaLabel:`p95 latency with the SLO and the normal range`})}var y,b,x;function S(){return(S=e((()=>{y=t(),h(),b=n(),x=[{type:`rect`,y0:80,y1:150,color:`var(--success-color)`,label:`Normal range`},{type:`rect`,x0:70,x1:82,color:`var(--warning-color)`,opacity:.12,label:`Deploy`,labelPosition:`top-right`},{type:`line`,axis:`y`,value:200,color:`var(--danger-color)`,dash:[4,4],label:`SLO 200 ms`}]})))()}function C(){return(0,w.jsx)(g,{series:O,legend:{position:`bottom`},height:300,ariaLabel:`Monthly revenue against target`})}var w,T,E,D,O;function k(){return(k=e((()=>{h(),w=n(),T=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],E=[42,48,51,47,58,63,61,70,74,69,81,92],D=[45,47,50,53,56,59,62,65,68,71,74,77],O=[{name:`Revenue (k$)`,type:`bar`,data:T.map((e,t)=>[e,E[t]])},{name:`Target (k$)`,type:`line`,data:T.map((e,t)=>[e,D[t]])}]})))()}function A(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function j(){let[e,t]=(0,M.useState)(`auto`),[n,r]=(0,M.useState)(null),i=(0,M.useMemo)(()=>{let e=A(7),t=new Float64Array(P),n=0;for(let r=0;r<P;r++)n+=e()-.5,t[r]=n;return[{name:`Random walk`,data:{y:t}}]},[]);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsxs)(a,{"aria-label":`Renderer`,direction:`horizontal`,value:e,onChange:e=>t(e),children:[(0,N.jsx)(c,{value:`auto`,label:`auto`}),(0,N.jsx)(c,{value:`webgpu`,label:`webgpu`}),(0,N.jsx)(c,{value:`webgl2`,label:`webgl2`}),(0,N.jsx)(c,{value:`canvas2d`,label:`canvas2d`})]}),(0,N.jsx)(g,{series:i,renderer:e,onRendererChange:r,height:280,ariaLabel:`Random walk of 50,000 points`}),(0,N.jsxs)(`p`,{role:`status`,children:[`Requested: `,e,` · drawn with: `,n??`…`]})]})}var M,N,P;function F(){return(F=e((()=>{M=t(),o(),s(),h(),N=n(),P=5e4})))()}var I;function L(){return(L=e((()=>{I=`import { useMemo } from "react";
import {
  Chart,
  type ChartAnnotation,
  type ChartSeries,
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

const annotations: ChartAnnotation[] = [
  {
    type: "rect",
    y0: 80,
    y1: 150,
    color: "var(--success-color)",
    label: "Normal range",
  },
  {
    type: "rect",
    x0: 70,
    x1: 82,
    color: "var(--warning-color)",
    opacity: 0.12,
    label: "Deploy",
    labelPosition: "top-right",
  },
  {
    type: "line",
    axis: "y",
    value: 200,
    color: "var(--danger-color)",
    dash: [4, 4],
    label: "SLO 200 ms",
  },
];

export default function AnnotationsDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(42);
    const data = Array.from({ length: 120 }, (_, minute) => {
      const incident = minute >= 70 && minute <= 82 ? 90 : 0;
      return [minute, 105 + random() * 40 + incident] as const;
    });
    return [{ name: "p95 latency (ms)", data }];
  }, []);

  return (
    <Chart
      series={series}
      annotations={annotations}
      xAxis={{ title: "Minutes" }}
      yAxis={{ min: 0, max: 260 }}
      height={300}
      ariaLabel="p95 latency with the SLO and the normal range"
    />
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { Chart, type ChartSeries } from "minerva-design/charts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const revenue = [42, 48, 51, 47, 58, 63, 61, 70, 74, 69, 81, 92];
const target = [45, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77];

const series: ChartSeries[] = [
  {
    name: "Revenue (k$)",
    type: "bar",
    data: months.map((month, i) => [month, revenue[i]] as const),
  },
  {
    name: "Target (k$)",
    type: "line",
    data: months.map((month, i) => [month, target[i]] as const),
  },
];

export default function MixedDemo() {
  return (
    <Chart
      series={series}
      legend={{ position: "bottom" }}
      height={300}
      ariaLabel="Monthly revenue against target"
    />
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo, useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartRendererKind,
  type ChartRendererPreference,
  type ChartSeries,
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

const COUNT = 50_000;

export default function RenderersDemo() {
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [active, setActive] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(7);
    const y = new Float64Array(COUNT);
    let value = 0;
    for (let i = 0; i < COUNT; i++) {
      value += random() - 0.5;
      y[i] = value;
    }
    return [{ name: "Random walk", data: { y } }];
  }, []);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Renderer"
        direction="horizontal"
        value={renderer}
        onChange={(value) => setRenderer(value as ChartRendererPreference)}
      >
        <Radio value="auto" label="auto" />
        <Radio value="webgpu" label="webgpu" />
        <Radio value="webgl2" label="webgl2" />
        <Radio value="canvas2d" label="canvas2d" />
      </RadioGroup>
      <Chart
        series={series}
        renderer={renderer}
        onRendererChange={setActive}
        height={280}
        ariaLabel="Random walk of 50,000 points"
      />
      <p role="status">
        Requested: {renderer} · drawn with: {active ?? "…"}
      </p>
    </div>
  );
}
`})))()}var H,U,W;function G(){return(G=e((()=>{S(),k(),F(),L(),z(),V(),t(),r(),f(),l(),m(),H=n(),U=d(Object.assign({"./demos/annotations.tsx":v,"./demos/mixed.tsx":C,"./demos/renderers.tsx":j}),Object.assign({"./demos/annotations.tsx":I,"./demos/mixed.tsx":R,"./demos/renderers.tsx":B})),W=()=>{let{t:e}=i(),t=(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`section`,{className:u.section,"aria-labelledby":`chart-rendering`,children:[(0,H.jsx)(`h2`,{id:`chart-rendering`,children:e(`docs.charts.intro.rendering.title`)}),(0,H.jsx)(`p`,{className:u.prose,children:e(`docs.charts.intro.rendering.text`)}),(0,H.jsxs)(`ul`,{className:u.prose,children:[(0,H.jsx)(`li`,{children:e(`docs.charts.intro.rendering.background`)}),(0,H.jsx)(`li`,{children:e(`docs.charts.intro.rendering.data`)}),(0,H.jsx)(`li`,{children:e(`docs.charts.intro.rendering.labels`)}),(0,H.jsx)(`li`,{children:e(`docs.charts.intro.rendering.dom`)})]})]}),(0,H.jsxs)(`section`,{className:u.section,"aria-labelledby":`chart-large-data`,children:[(0,H.jsx)(`h2`,{id:`chart-large-data`,children:e(`docs.charts.intro.largeData.title`)}),(0,H.jsx)(`p`,{className:u.prose,children:e(`docs.charts.intro.largeData.text`)})]}),(0,H.jsxs)(`section`,{className:u.section,"aria-labelledby":`chart-interaction`,children:[(0,H.jsx)(`h2`,{id:`chart-interaction`,children:e(`docs.charts.intro.interaction.title`)}),(0,H.jsx)(`p`,{className:u.prose,children:e(`docs.charts.intro.interaction.pointer`)}),(0,H.jsx)(`p`,{className:u.prose,children:e(`docs.charts.intro.interaction.keyboard`)})]}),(0,H.jsxs)(`section`,{className:u.section,"aria-labelledby":`chart-theming`,children:[(0,H.jsx)(`h2`,{id:`chart-theming`,children:e(`docs.charts.intro.theming.title`)}),(0,H.jsx)(`p`,{className:u.prose,children:e(`docs.charts.intro.theming.text`)}),(0,H.jsx)(`p`,{className:u.prose,children:e(`docs.charts.intro.theming.core`)})]})]});return(0,H.jsx)(p,{id:`charts`,demos:U,intro:t})}})))()}G();export{W as default};