import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,n as i,r as a,t as o}from"./Radio-DKdkHhxv.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-DmpxYJhU.js";import{A as s,k as c}from"./theme-BtADPb1U.js";import{o as l,s as u}from"./charts-BgMlJdRV.js";function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let e=(0,d.useMemo)(()=>{let e=ie(3),t=[],n=120;for(let r=0;r<60;r++)n+=e()*12,t.push(Math.round(n));return[{name:`Storage used (GB)`,data:t,opacity:.25}]},[]);return(0,f.jsx)(u,{series:e,area:!0,xAxis:{title:`Day`},yAxis:{zero:!0},height:280,ariaLabel:`Storage used over 60 days`})}var d,f;function p(){return(p=e((()=>{d=t(),l(),f=n()})))()}function oe(){return(0,m.jsx)(u,{series:v,height:280,ariaLabel:`Daily visitors, this week and last week`})}var m,h,g,_,v;function y(){return(y=e((()=>{l(),m=n(),h=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],g=[1200,1350,1280,1490,1610,980,870],_=[1100,1180,1250,1300,1420,1010,760],v=[{name:`This week`,data:h.map((e,t)=>[e,g[t]])},{name:`Last week`,data:h.map((e,t)=>[e,_[t]])}]})))()}function se(){let[e,t]=(0,b.useState)(`smooth`);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsxs)(r,{"aria-label":`Curve`,direction:`horizontal`,value:e,onChange:e=>t(e),children:[(0,x.jsx)(o,{value:`linear`,label:`linear`}),(0,x.jsx)(o,{value:`smooth`,label:`smooth`}),(0,x.jsx)(o,{value:`step`,label:`step`})]}),(0,x.jsx)(u,{series:T,curve:e,yAxis:{format:e=>`${e} °C`},height:280,ariaLabel:`Average monthly temperature in Lisbon and Oslo`})]})}var b,x,S,C,w,T;function E(){return(E=e((()=>{b=t(),i(),a(),l(),x=n(),S=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],C=[11.6,12.6,14.9,16.2,18.8,21.9,23.6,24,22.6,19.4,15.3,12.7],w=[-4.3,-4,-.2,4.5,10.8,15.2,16.4,15.2,10.8,5,.6,-3.2],T=[{name:`Lisbon`,data:S.map((e,t)=>[e,C[t]])},{name:`Oslo`,data:S.map((e,t)=>[e,w[t]])}]})))()}function ce(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function le(){let[e,t]=(0,D.useState)(null),n=(0,D.useMemo)(()=>{let e=ce(2026),t=new Float64Array(k),n=new Float64Array(k),r=100;for(let i=0;i<k;i++)r+=(e()-.5)*.4,t[i]=A+i*1e3,n[i]=r;return[{name:`Sensor`,data:{x:t,y:n},lineWidth:1}]},[]);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,O.jsx)(u,{series:n,xAxis:{type:`time`},onRendererChange:t,height:300,ariaLabel:`One million sensor readings`}),(0,O.jsxs)(`p`,{role:`status`,children:[k.toLocaleString(`en`),` points · drawn with `,e??`…`,` · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset`]})]})}var D,O,k,A;function j(){return(j=e((()=>{D=t(),l(),O=n(),k=1e6,A=Date.UTC(2026,0,1)})))()}function ue(){let[e,t]=(0,de.useState)(`stacked`),n=e===`percent`;return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsxs)(r,{"aria-label":`Stack mode`,direction:`horizontal`,value:e,onChange:e=>t(String(e)),children:[(0,M.jsx)(o,{value:`stacked`,label:`Stacked`}),(0,M.jsx)(o,{value:`percent`,label:`100%`})]}),(0,M.jsx)(u,{series:P,area:!0,stacked:!0,percent:n,yAxis:n?void 0:{format:e=>`$${s(e)}`},height:300,ariaLabel:`Monthly cloud spend by service, stacked`})]})}var de,M,N,P;function F(){return(F=e((()=>{de=t(),i(),a(),l(),c(),M=n(),N=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],P=Object.entries({Compute:[18400,19100,20600,21e3,22800,24100,23500,25900,27200,28e3,29400,31800],Storage:[6200,6500,6900,7400,7800,8300,8900,9400,9800,10500,11100,11900],Network:[3100,2900,3600,4200,3800,4600,5300,4900,5200,5800,6400,7100],Databases:[9800,9900,10200,10100,10800,11200,11e3,11600,12100,12400,12300,12900]}).map(([e,t])=>({name:e,data:N.map((e,n)=>[e,t[n]])}))})))()}function fe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pe(){let e=(0,I.useMemo)(()=>{let e=fe(11),t=t=>Array.from({length:180},(n,r)=>{let i=new Date(z+r*R).getUTCDay()%6==0,a=t*(1+r/300)*(i?.6:1)*(.9+e()*.2);return[new Date(z+r*R),Math.round(a)]});return[{name:`Page views`,data:t(42e3)},{name:`Sessions`,data:t(18e3)}]},[]);return(0,L.jsx)(u,{series:e,yAxis:{format:e=>s(e)},height:300,ariaLabel:`Daily page views and sessions, first half of 2026`})}var I,L,R,z;function B(){return(B=e((()=>{I=t(),l(),c(),L=n(),R=864e5,z=Date.UTC(2026,0,1)})))()}var V;function H(){return(H=e((()=>{V=`import { useMemo } from "react";
import { LineChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AreaDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(3);
    const data: number[] = [];
    let used = 120;
    for (let day = 0; day < 60; day++) {
      used += random() * 12;
      data.push(Math.round(used));
    }
    return [{ name: "Storage used (GB)", data, opacity: 0.25 }];
  }, []);

  return (
    <LineChart
      series={series}
      area
      xAxis={{ title: "Day" }}
      yAxis={{ zero: true }}
      height={280}
      ariaLabel="Storage used over 60 days"
    />
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { LineChart, type ChartSeries } from "minerva-design/charts";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const thisWeek = [1200, 1350, 1280, 1490, 1610, 980, 870];
const lastWeek = [1100, 1180, 1250, 1300, 1420, 1010, 760];

const series: ChartSeries[] = [
  {
    name: "This week",
    data: days.map((day, i) => [day, thisWeek[i]] as const),
  },
  {
    name: "Last week",
    data: days.map((day, i) => [day, lastWeek[i]] as const),
  },
];

export default function BasicDemo() {
  return (
    <LineChart
      series={series}
      height={280}
      ariaLabel="Daily visitors, this week and last week"
    />
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartCurve,
  type ChartSeries,
} from "minerva-design/charts";

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
// Average monthly temperatures (°C)
const lisbon = [
  11.6, 12.6, 14.9, 16.2, 18.8, 21.9, 23.6, 24.0, 22.6, 19.4, 15.3, 12.7,
];
const oslo = [
  -4.3, -4.0, -0.2, 4.5, 10.8, 15.2, 16.4, 15.2, 10.8, 5.0, 0.6, -3.2,
];

const series: ChartSeries[] = [
  { name: "Lisbon", data: months.map((m, i) => [m, lisbon[i]] as const) },
  { name: "Oslo", data: months.map((m, i) => [m, oslo[i]] as const) },
];

export default function CurvesDemo() {
  const [curve, setCurve] = useState<ChartCurve>("smooth");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Curve"
        direction="horizontal"
        value={curve}
        onChange={(value) => setCurve(value as ChartCurve)}
      >
        <Radio value="linear" label="linear" />
        <Radio value="smooth" label="smooth" />
        <Radio value="step" label="step" />
      </RadioGroup>
      <LineChart
        series={series}
        curve={curve}
        yAxis={{ format: (value) => \`\${value} °C\` }}
        height={280}
        ariaLabel="Average monthly temperature in Lisbon and Oslo"
      />
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useMemo, useState } from "react";
import {
  LineChart,
  type ChartRendererKind,
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

const COUNT = 1_000_000;
const START = Date.UTC(2026, 0, 1);

export default function LargeDataDemo() {
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Columns of typed arrays: no per-point objects, sorted x (one sample per second)
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(2026);
    const x = new Float64Array(COUNT);
    const y = new Float64Array(COUNT);
    let value = 100;
    for (let i = 0; i < COUNT; i++) {
      value += (random() - 0.5) * 0.4;
      x[i] = START + i * 1000;
      y[i] = value;
    }
    return [{ name: "Sensor", data: { x, y }, lineWidth: 1 }];
  }, []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        xAxis={{ type: "time" }}
        onRendererChange={setRenderer}
        height={300}
        ariaLabel="One million sensor readings"
      />
      <p role="status">
        {COUNT.toLocaleString("en")} points · drawn with {renderer ?? "…"} ·
        Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset
      </p>
    </div>
  );
}
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  formatCompact,
  type ChartSeries,
} from "minerva-design/charts";

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

// Monthly cloud spend by service (USD)
const spend = {
  Compute: [
    18_400, 19_100, 20_600, 21_000, 22_800, 24_100, 23_500, 25_900, 27_200,
    28_000, 29_400, 31_800,
  ],
  Storage: [
    6_200, 6_500, 6_900, 7_400, 7_800, 8_300, 8_900, 9_400, 9_800, 10_500,
    11_100, 11_900,
  ],
  Network: [
    3_100, 2_900, 3_600, 4_200, 3_800, 4_600, 5_300, 4_900, 5_200, 5_800, 6_400,
    7_100,
  ],
  Databases: [
    9_800, 9_900, 10_200, 10_100, 10_800, 11_200, 11_000, 11_600, 12_100,
    12_400, 12_300, 12_900,
  ],
};

const series: ChartSeries[] = Object.entries(spend).map(([name, values]) => ({
  name,
  data: months.map((month, i) => [month, values[i]] as const),
}));

export default function StackedDemo() {
  const [mode, setMode] = useState("stacked");
  const percent = mode === "percent";

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Stack mode"
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(String(value))}
      >
        <Radio value="stacked" label="Stacked" />
        <Radio value="percent" label="100%" />
      </RadioGroup>
      <LineChart
        series={series}
        area
        stacked
        percent={percent}
        // a y format replaces the percent ticks: only set it for amounts
        yAxis={percent ? undefined : { format: (v) => \`$\${formatCompact(v)}\` }}
        height={300}
        ariaLabel="Monthly cloud spend by service, stacked"
      />
    </div>
  );
}
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useMemo } from "react";
import {
  LineChart,
  formatCompact,
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

const DAY = 24 * 60 * 60 * 1000;
const START = Date.UTC(2026, 0, 1);

export default function TimeSeriesDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(11);
    const daily = (base: number) =>
      Array.from({ length: 180 }, (_, i) => {
        const weekend = new Date(START + i * DAY).getUTCDay() % 6 === 0;
        const trend = base * (1 + i / 300);
        const value = trend * (weekend ? 0.6 : 1) * (0.9 + random() * 0.2);
        return [new Date(START + i * DAY), Math.round(value)] as const;
      });
    return [
      { name: "Page views", data: daily(42_000) },
      { name: "Sessions", data: daily(18_000) },
    ];
  }, []);

  return (
    <LineChart
      series={series}
      yAxis={{ format: (value) => formatCompact(value) }}
      height={300}
      ariaLabel="Daily page views and sessions, first half of 2026"
    />
  );
}
`})))()}var me,he,ge;function $(){return($=e((()=>{p(),y(),E(),j(),F(),B(),H(),W(),K(),J(),X(),Q(),t(),te(),re(),me=n(),he=ee(Object.assign({"./demos/area.tsx":ae,"./demos/basic.tsx":oe,"./demos/curves.tsx":se,"./demos/large-data.tsx":le,"./demos/stacked.tsx":ue,"./demos/time-series.tsx":pe}),Object.assign({"./demos/area.tsx":V,"./demos/basic.tsx":U,"./demos/curves.tsx":G,"./demos/large-data.tsx":q,"./demos/stacked.tsx":Y,"./demos/time-series.tsx":Z})),ge=()=>(0,me.jsx)(ne,{id:`line-chart`,demos:he})})))()}$();export{ge as default};