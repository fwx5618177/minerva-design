import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DCMfehF7.js";import{i as s,r as c}from"./chart-DhK1qY0T.js";import{n as l,r as u}from"./charts-CejCSz4V.js";function d(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function f(){let e=(0,p.useMemo)(()=>{let e=d(3),t=[],n=120;for(let r=0;r<60;r++)n+=e()*12,t.push(Math.round(n));return[{name:`Storage used (GB)`,data:t,opacity:.25}]},[]);return(0,m.jsx)(u,{series:e,area:!0,xAxis:{title:`Day`},yAxis:{zero:!0},height:280,ariaLabel:`Storage used over 60 days`})}var p,m;function h(){return(h=e((()=>{p=t(),l(),m=n()})))()}function g(){return(0,_.jsx)(u,{series:x,height:280,ariaLabel:`Daily visitors, this week and last week`})}var _,v,y,b,x;function S(){return(S=e((()=>{l(),_=n(),v=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],y=[1200,1350,1280,1490,1610,980,870],b=[1100,1180,1250,1300,1420,1010,760],x=[{name:`This week`,data:v.map((e,t)=>[e,y[t]])},{name:`Last week`,data:v.map((e,t)=>[e,b[t]])}]})))()}function C(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function w(){let[e,t]=(0,T.useState)(null),n=(0,T.useMemo)(()=>{let e=C(2026),t=new Float64Array(D),n=new Float64Array(D),r=100;for(let i=0;i<D;i++)r+=(e()-.5)*.4,t[i]=O+i*1e3,n[i]=r;return[{name:`Sensor`,data:{x:t,y:n},lineWidth:1}]},[]);return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,E.jsx)(u,{series:n,xAxis:{type:`time`},onRendererChange:t,height:300,ariaLabel:`One million sensor readings`}),(0,E.jsxs)(`p`,{role:`status`,children:[D.toLocaleString(`en`),` points · drawn with `,e??`…`,` · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset`]})]})}var T,E,D,O;function k(){return(k=e((()=>{T=t(),l(),E=n(),D=1e6,O=Date.UTC(2026,0,1)})))()}function A(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function j(){let e=(0,M.useMemo)(()=>{let e=A(11),t=t=>Array.from({length:180},(n,r)=>{let i=new Date(F+r*P).getUTCDay()%6==0,a=t*(1+r/300)*(i?.6:1)*(.9+e()*.2);return[new Date(F+r*P),Math.round(a)]});return[{name:`Page views`,data:t(42e3)},{name:`Sessions`,data:t(18e3)}]},[]);return(0,N.jsx)(u,{series:e,yAxis:{format:e=>s(e)},height:300,ariaLabel:`Daily page views and sessions, first half of 2026`})}var M,N,P,F;function I(){return(I=e((()=>{M=t(),l(),c(),N=n(),P=864e5,F=Date.UTC(2026,0,1)})))()}var L;function R(){return(R=e((()=>{L=`import { useMemo } from "react";
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
`})))()}var z;function B(){return(B=e((()=>{z=`import { LineChart, type ChartSeries } from "minerva-design/charts";

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
`})))()}var V;function H(){return(H=e((()=>{V=`import { useMemo, useState } from "react";
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { useMemo } from "react";
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
`})))()}var G,K,q;function J(){return(J=e((()=>{h(),S(),k(),I(),R(),B(),H(),W(),t(),i(),o(),G=n(),K=r(Object.assign({"./demos/area.tsx":f,"./demos/basic.tsx":g,"./demos/large-data.tsx":w,"./demos/time-series.tsx":j}),Object.assign({"./demos/area.tsx":L,"./demos/basic.tsx":z,"./demos/large-data.tsx":V,"./demos/time-series.tsx":U})),q=()=>(0,G.jsx)(a,{id:`line-chart`,demos:K})})))()}J();export{q as default};