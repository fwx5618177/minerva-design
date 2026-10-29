import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DmpxYJhU.js";import{c as s,o as c}from"./charts-BgMlJdRV.js";function l(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function u(){let e=(0,d.useMemo)(()=>{let e=l(24);return p.flatMap((t,n)=>{let r=n>=5;return m.map((n,i)=>{let a=r?.55*h(i,13,4)+.3*h(i,21,2):h(i,10.5,1.8)+.9*h(i,15,2)-.25*h(i,12.5,.8)+.35*h(i,21,1.5),o=Math.max(0,a)*1200+40+e()*90;return{x:n,y:t,value:Math.round(o)}})})},[]);return(0,f.jsx)(s,{data:e,xCategories:m,yCategories:[...p].reverse(),name:`Sessions`,format:e=>e.toLocaleString(`en`),height:280,ariaLabel:`Sessions by weekday and hour of the day`})}var d,f,p,m,h;function g(){return(g=e((()=>{d=t(),c(),f=n(),p=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],m=Array.from({length:24},(e,t)=>`${t}:00`),h=(e,t,n)=>Math.exp(-((e-t)**2)/(2*n**2))})))()}function _(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function v(){let e=(0,y.useMemo)(()=>{let e=_(1995);return S.flatMap((t,n)=>x.map(r=>{let i=-.75+n*.07+(e()+e()-1)*.7+(C[t]??0);return{x:t,y:r,value:Math.round(i*100)/100}}))},[]);return(0,b.jsx)(s,{data:e,xCategories:S,yCategories:[...x].reverse(),colorScale:w,valueRange:[-2,2],name:`Anomaly`,format:e=>`${e>0?`+`:``}${e.toFixed(2)} °C`,radius:1,height:340,ariaLabel:`Monthly temperature anomaly, 1995 to 2024`})}var y,b,x,S,C,w;function T(){return(T=e((()=>{y=t(),c(),b=n(),x=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],S=Array.from({length:30},(e,t)=>String(1995+t)),C={1998:.5,2016:.45,2024:.4},w=[`#2166ac`,`#67a9cf`,`var(--background-color)`,`#ef8a62`,`#b2182b`]})))()}function E(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function D(){let[e,t]=(0,O.useState)(null),n=(0,O.useMemo)(()=>{let e=E(200),t=[];for(let n=0;n<j;n++)for(let r=0;r<A;r++){let i=-100;for(let e of M){let t=Math.hypot(r-e.x,n-e.y)+1,a=N.filter(t=>r<t!=e.x<t).length;i=Math.max(i,-32-22*Math.log10(t)-7*a)}t.push({x:r,y:n,value:i+(e()-.5)*2})}return t},[]);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,k.jsx)(s,{data:n,colorScale:P,valueRange:[-90,-30],name:`Signal`,format:e=>`${e.toFixed(0)} dBm`,radius:0,xAxis:{title:`x (m)`},yAxis:{title:`y (m)`},interaction:{zoom:`xy`},onRendererChange:t,height:340,ariaLabel:`Wi-Fi signal strength over a 200 by 100 meter floor`}),(0,k.jsxs)(`p`,{role:`status`,children:[2e4.toLocaleString(`en`),` cells · drawn with`,` `,e??`…`,` · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset`]})]})}var O,k,A,j,M,N,P;function F(){return(F=e((()=>{O=t(),c(),k=n(),A=200,j=100,M=[{x:30,y:70},{x:105,y:25},{x:170,y:65}],N=[70,140],P=[`#0d0887`,`#7e03a8`,`#cc4778`,`#f89540`,`#f0f921`]})))()}var I;function L(){return(L=e((()=>{I=`import { useMemo } from "react";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, h) => \`\${h}:00\`);

const bump = (hour: number, center: number, width: number) =>
  Math.exp(-((hour - center) ** 2) / (2 * width ** 2));

export default function BasicDemo() {
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(24);
    return days.flatMap((day, d) => {
      const weekend = d >= 5;
      return hours.map((hour, h) => {
        // office hours with a lunch dip on weekdays, late mornings at weekends
        const activity = weekend
          ? 0.55 * bump(h, 13, 4) + 0.3 * bump(h, 21, 2)
          : bump(h, 10.5, 1.8) +
            0.9 * bump(h, 15, 2) -
            0.25 * bump(h, 12.5, 0.8) +
            0.35 * bump(h, 21, 1.5);
        const value = Math.max(0, activity) * 1200 + 40 + random() * 90;
        return { x: hour, y: day, value: Math.round(value) };
      });
    });
  }, []);

  return (
    <HeatmapChart
      data={data}
      xCategories={hours}
      // rows go from bottom to top: reverse them to read Monday first
      yCategories={[...days].reverse()}
      name="Sessions"
      format={(value) => value.toLocaleString("en")}
      height={280}
      ariaLabel="Sessions by weekday and hour of the day"
    />
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { useMemo } from "react";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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
const years = Array.from({ length: 30 }, (_, i) => String(1995 + i));
// warm years of strong El Niño events
const elNino: Record<string, number> = {
  "1998": 0.5,
  "2016": 0.45,
  "2024": 0.4,
};

// Blue below the reference period, the page background at 0, red above
const diverging = [
  "#2166ac",
  "#67a9cf",
  "var(--background-color)",
  "#ef8a62",
  "#b2182b",
];

export default function ColorScaleDemo() {
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(1995);
    return years.flatMap((year, i) =>
      months.map((month) => {
        const trend = -0.75 + i * 0.07;
        const noise = (random() + random() - 1) * 0.7;
        const value = trend + noise + (elNino[year] ?? 0);
        return { x: year, y: month, value: Math.round(value * 100) / 100 };
      }),
    );
  }, []);

  return (
    <HeatmapChart
      data={data}
      xCategories={years}
      yCategories={[...months].reverse()}
      colorScale={diverging}
      // symmetric range: 0 stays in the middle of the scale
      valueRange={[-2, 2]}
      name="Anomaly"
      format={(value) => \`\${value > 0 ? "+" : ""}\${value.toFixed(2)} °C\`}
      radius={1}
      height={340}
      ariaLabel="Monthly temperature anomaly, 1995 to 2024"
    />
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo, useState } from "react";
import {
  HeatmapChart,
  type ChartRendererKind,
  type HeatmapCell,
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

const WIDTH = 200;
const DEPTH = 100;
const ACCESS_POINTS = [
  { x: 30, y: 70 },
  { x: 105, y: 25 },
  { x: 170, y: 65 },
];
// interior walls (x positions) that weaken the signal crossing them
const WALLS = [70, 140];

const plasma = ["#0d0887", "#7e03a8", "#cc4778", "#f89540", "#f0f921"];

export default function LargeGridDemo() {
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Wi-Fi signal strength on a 200 × 100 m floor, one cell per square meter
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(200);
    const cells: HeatmapCell[] = [];
    for (let y = 0; y < DEPTH; y++) {
      for (let x = 0; x < WIDTH; x++) {
        let best = -100;
        for (const ap of ACCESS_POINTS) {
          const distance = Math.hypot(x - ap.x, y - ap.y) + 1;
          const walls = WALLS.filter((wall) => x < wall !== ap.x < wall).length;
          best = Math.max(best, -32 - 22 * Math.log10(distance) - 7 * walls);
        }
        cells.push({ x, y, value: best + (random() - 0.5) * 2 });
      }
    }
    return cells;
  }, []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        colorScale={plasma}
        valueRange={[-90, -30]}
        name="Signal"
        format={(value) => \`\${value.toFixed(0)} dBm\`}
        radius={0}
        xAxis={{ title: "x (m)" }}
        yAxis={{ title: "y (m)" }}
        interaction={{ zoom: "xy" }}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel="Wi-Fi signal strength over a 200 by 100 meter floor"
      />
      <p role="status">
        {(WIDTH * DEPTH).toLocaleString("en")} cells · drawn with{" "}
        {renderer ?? "…"} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click
        to reset
      </p>
    </div>
  );
}
`})))()}var H,U,W;function G(){return(G=e((()=>{g(),T(),F(),L(),z(),V(),t(),i(),o(),H=n(),U=r(Object.assign({"./demos/basic.tsx":u,"./demos/color-scale.tsx":v,"./demos/large-grid.tsx":D}),Object.assign({"./demos/basic.tsx":I,"./demos/color-scale.tsx":R,"./demos/large-grid.tsx":B})),W=()=>(0,H.jsx)(a,{id:`heatmap-chart`,demos:U})})))()}G();export{W as default};