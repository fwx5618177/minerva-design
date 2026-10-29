import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-PfpTBKws.js";import{i as s,n as c}from"./charts-ZBjhhn3m.js";function l(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function u(){let e=(0,d.useMemo)(()=>{let e=l(9),t=(t,n,r)=>({name:t,data:Array.from({length:40},()=>{let t=1+Math.round(e()*49);return[t,Math.round(n+t*r*(.8+e()*.4))]})});return[t(`Starter`,20,9),t(`Business`,60,14)]},[]);return(0,f.jsx)(c,{series:e,xAxis:{title:`Seats`},yAxis:{title:`Monthly bill ($)`},height:300,ariaLabel:`Monthly bill by number of seats, per plan`})}var d,f;function p(){return(p=e((()=>{d=t(),s(),f=n()})))()}function m(){return(0,h.jsx)(c,{series:g,xAxis:{title:`GDP per capita (k$)`},yAxis:{title:`Life expectancy (years)`},height:320,ariaLabel:`Life expectancy by GDP per capita; dot size is the population`})}var h,g;function _(){return(_=e((()=>{s(),h=n(),g=[{name:`Countries`,showLabels:!0,opacity:.7,data:[[`Japan`,34,84.5,124],[`Germany`,52,81.2,84],[`France`,44,82.5,68],[`United States`,80,78.4,335],[`Brazil`,10,75.9,216],[`India`,2.5,70.8,1430],[`China`,12.6,78.6,1410],[`Nigeria`,1.6,54.5,224],[`Mexico`,13.9,75.1,128],[`Indonesia`,4.9,71.9,278]].map(([e,t,n,r])=>({x:t,y:n,label:e,size:6+Math.sqrt(r)*.6}))}]})))()}function v(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function y(){let[e,t]=(0,b.useState)(null),n=(0,b.useMemo)(()=>{let e=v(1),t=()=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e()),n=(e,n,r,i)=>{let a=new Float64Array(S),o=new Float64Array(S);for(let e=0;e<S;e++)a[e]=n+t()*i,o[e]=r+t()*i;return{name:e,data:{x:a,y:o},pointSize:3,opacity:.5}};return[n(`Cluster A`,-2,-1,1.2),n(`Cluster B`,2.5,1.5,.9)]},[]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(c,{series:n,onRendererChange:t,height:320,ariaLabel:`Two clusters of 100,000 points each`}),(0,x.jsxs)(`p`,{role:`status`,children:[(S*2).toLocaleString(`en`),` points · drawn with`,` `,e??`…`]})]})}var b,x,S;function C(){return(C=e((()=>{b=t(),s(),x=n(),S=1e5})))()}var w;function T(){return(T=e((()=>{w=`import { useMemo } from "react";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BasicDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(9);
    const plan = (name: string, price: number, slope: number) => ({
      name,
      data: Array.from({ length: 40 }, () => {
        const seats = 1 + Math.round(random() * 49);
        return [
          seats,
          Math.round(price + seats * slope * (0.8 + random() * 0.4)),
        ] as const;
      }),
    });
    return [plan("Starter", 20, 9), plan("Business", 60, 14)];
  }, []);

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: "Seats" }}
      yAxis={{ title: "Monthly bill ($)" }}
      height={300}
      ariaLabel="Monthly bill by number of seats, per plan"
    />
  );
}
`})))()}var E;function D(){return(D=e((()=>{E=`import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// GDP per capita (k$), life expectancy (years), population (millions)
const countries: [string, number, number, number][] = [
  ["Japan", 34, 84.5, 124],
  ["Germany", 52, 81.2, 84],
  ["France", 44, 82.5, 68],
  ["United States", 80, 78.4, 335],
  ["Brazil", 10, 75.9, 216],
  ["India", 2.5, 70.8, 1430],
  ["China", 12.6, 78.6, 1410],
  ["Nigeria", 1.6, 54.5, 224],
  ["Mexico", 13.9, 75.1, 128],
  ["Indonesia", 4.9, 71.9, 278],
];

const series: ChartSeries[] = [
  {
    name: "Countries",
    showLabels: true,
    opacity: 0.7,
    data: countries.map(([label, x, y, population]) => ({
      x,
      y,
      label,
      size: 6 + Math.sqrt(population) * 0.6,
    })),
  },
];

export default function LabelsDemo() {
  return (
    <ScatterChart
      series={series}
      xAxis={{ title: "GDP per capita (k$)" }}
      yAxis={{ title: "Life expectancy (years)" }}
      height={320}
      ariaLabel="Life expectancy by GDP per capita; dot size is the population"
    />
  );
}
`})))()}var O;function k(){return(k=e((()=>{O=`import { useMemo, useState } from "react";
import {
  ScatterChart,
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

const PER_CLUSTER = 100_000;

export default function LargeDataDemo() {
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(1);
    // Box-Muller: normally distributed values
    const gaussian = () =>
      Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
    const cluster = (name: string, cx: number, cy: number, spread: number) => {
      const x = new Float64Array(PER_CLUSTER);
      const y = new Float64Array(PER_CLUSTER);
      for (let i = 0; i < PER_CLUSTER; i++) {
        x[i] = cx + gaussian() * spread;
        y[i] = cy + gaussian() * spread;
      }
      return { name, data: { x, y }, pointSize: 3, opacity: 0.5 };
    };
    return [
      cluster("Cluster A", -2, -1, 1.2),
      cluster("Cluster B", 2.5, 1.5, 0.9),
    ];
  }, []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        onRendererChange={setRenderer}
        height={320}
        ariaLabel="Two clusters of 100,000 points each"
      />
      <p role="status">
        {(PER_CLUSTER * 2).toLocaleString("en")} points · drawn with{" "}
        {renderer ?? "…"}
      </p>
    </div>
  );
}
`})))()}var A,j,M;function N(){return(N=e((()=>{p(),_(),C(),T(),D(),k(),t(),i(),o(),A=n(),j=r(Object.assign({"./demos/basic.tsx":u,"./demos/labels.tsx":m,"./demos/large-data.tsx":y}),Object.assign({"./demos/basic.tsx":w,"./demos/labels.tsx":E,"./demos/large-data.tsx":O})),M=()=>(0,A.jsx)(a,{id:`scatter-chart`,demos:j})})))()}N();export{M as default};