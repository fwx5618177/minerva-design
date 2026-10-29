import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DmpxYJhU.js";import{i as s,o as c}from"./charts-BgMlJdRV.js";function l(){return(0,u.jsx)(s,{series:d,height:280,ariaLabel:`Support tickets closed per quarter`})}var u,d;function f(){return(f=e((()=>{c(),u=n(),d=[{name:`Tickets closed`,data:[[`Q1`,320],[`Q2`,410],[`Q3`,385],[`Q4`,470]]}]})))()}function p(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function m(){let e=(0,h.useMemo)(()=>{let e=p(5),t=Array.from({length:30},(t,n)=>Math.round(60+n*1.5+e()*40)),n=t.map((e,n)=>{let r=t.slice(Math.max(0,n-6),n+1);return Math.round(r.reduce((e,t)=>e+t,0)/r.length)});return[{name:`Orders`,data:t},{name:`7-day average`,type:`line`,data:n,lineWidth:3}]},[]);return(0,g.jsx)(s,{series:e,xAxis:{title:`Day`},height:300,ariaLabel:`Daily orders with their 7-day average`})}var h,g;function _(){return(_=e((()=>{h=t(),c(),g=n()})))()}function v(){return(0,y.jsx)(s,{series:x,labels:!0,yAxis:{format:e=>e===0?`$0`:`$${e}k`},height:300,ariaLabel:`Quarterly revenue, 2025 and 2026`})}var y,b,x;function S(){return(S=e((()=>{c(),y=n(),b=[`Q1`,`Q2`,`Q3`,`Q4`],x=Object.entries({2025:[312,348,365,421],2026:[356,402,431,488]}).map(([e,t])=>({name:e,data:b.map((e,n)=>[e,t[n]])}))})))()}function C(){return(0,w.jsx)(s,{series:E,percent:!0,height:300,ariaLabel:`Share of promoters, passives and detractors by region`})}var w,T,E;function D(){return(D=e((()=>{c(),w=n(),T=[`North America`,`Europe`,`Asia Pacific`,`Latin America`,`Middle East`],E=[{name:`Promoters`,color:`var(--success-color)`,values:[612,540,702,288,164]},{name:`Passives`,color:`var(--warning-color)`,values:[254,310,268,131,92]},{name:`Detractors`,color:`var(--danger-color)`,values:[134,196,118,97,61]}].map(({name:e,color:t,values:n})=>({name:e,color:t,data:T.map((e,t)=>[e,n[t]])}))})))()}function O(){return(0,k.jsx)(s,{series:j,stacked:!0,height:300,ariaLabel:`Monthly orders by channel, stacked`})}var k,A,j;function M(){return(M=e((()=>{c(),k=n(),A=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],j=Object.entries({Web:[120,135,150,148,170,190],Mobile:[80,95,110,125,140,160],Partners:[30,28,35,42,40,51]}).map(([e,t])=>({name:e,data:A.map((e,n)=>[e,t[n]])}))})))()}var N;function P(){return(P=e((()=>{N=`import { BarChart, type ChartSeries } from "minerva-design/charts";

const series: ChartSeries[] = [
  {
    name: "Tickets closed",
    data: [
      ["Q1", 320],
      ["Q2", 410],
      ["Q3", 385],
      ["Q4", 470],
    ],
  },
];

export default function BasicDemo() {
  return (
    <BarChart
      series={series}
      height={280}
      ariaLabel="Support tickets closed per quarter"
    />
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { useMemo } from "react";
import { BarChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ComboDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(5);
    const orders = Array.from({ length: 30 }, (_, day) =>
      Math.round(60 + day * 1.5 + random() * 40),
    );
    // trailing 7-day average of the bars
    const average = orders.map((_, day) => {
      const week = orders.slice(Math.max(0, day - 6), day + 1);
      return Math.round(week.reduce((sum, v) => sum + v, 0) / week.length);
    });
    return [
      { name: "Orders", data: orders },
      { name: "7-day average", type: "line", data: average, lineWidth: 3 },
    ];
  }, []);

  return (
    <BarChart
      series={series}
      xAxis={{ title: "Day" }}
      height={300}
      ariaLabel="Daily orders with their 7-day average"
    />
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { BarChart, type ChartSeries } from "minerva-design/charts";

const quarters = ["Q1", "Q2", "Q3", "Q4"];
// Revenue in thousands of dollars
const revenue = {
  "2025": [312, 348, 365, 421],
  "2026": [356, 402, 431, 488],
};

const series: ChartSeries[] = Object.entries(revenue).map(([name, values]) => ({
  name,
  data: quarters.map((quarter, i) => [quarter, values[i]] as const),
}));

export default function LabelsDemo() {
  return (
    <BarChart
      series={series}
      labels
      // the labels use the y axis format
      yAxis={{ format: (value) => (value === 0 ? "$0" : \`$\${value}k\`) }}
      height={300}
      ariaLabel="Quarterly revenue, 2025 and 2026"
    />
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { BarChart, type ChartSeries } from "minerva-design/charts";

const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East",
];

// Survey answers (respondents) grouped as Net Promoter Score categories
const answers = [
  {
    name: "Promoters",
    color: "var(--success-color)",
    values: [612, 540, 702, 288, 164],
  },
  {
    name: "Passives",
    color: "var(--warning-color)",
    values: [254, 310, 268, 131, 92],
  },
  {
    name: "Detractors",
    color: "var(--danger-color)",
    values: [134, 196, 118, 97, 61],
  },
];

const series: ChartSeries[] = answers.map(({ name, color, values }) => ({
  name,
  color,
  data: regions.map((region, i) => [region, values[i]] as const),
}));

export default function PercentDemo() {
  return (
    <BarChart
      series={series}
      percent
      height={300}
      ariaLabel="Share of promoters, passives and detractors by region"
    />
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { BarChart, type ChartSeries } from "minerva-design/charts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const byChannel = {
  Web: [120, 135, 150, 148, 170, 190],
  Mobile: [80, 95, 110, 125, 140, 160],
  Partners: [30, 28, 35, 42, 40, 51],
};

const series: ChartSeries[] = Object.entries(byChannel).map(
  ([name, values]) => ({
    name,
    data: months.map((month, i) => [month, values[i]] as const),
  }),
);

export default function StackedDemo() {
  return (
    <BarChart
      series={series}
      stacked
      height={300}
      ariaLabel="Monthly orders by channel, stacked"
    />
  );
}
`})))()}var U,W,G;function K(){return(K=e((()=>{f(),_(),S(),D(),M(),P(),I(),R(),B(),H(),t(),i(),o(),U=n(),W=r(Object.assign({"./demos/basic.tsx":l,"./demos/combo.tsx":m,"./demos/labels.tsx":v,"./demos/percent.tsx":C,"./demos/stacked.tsx":O}),Object.assign({"./demos/basic.tsx":N,"./demos/combo.tsx":F,"./demos/labels.tsx":L,"./demos/percent.tsx":z,"./demos/stacked.tsx":V})),G=()=>(0,U.jsx)(a,{id:`bar-chart`,demos:W})})))()}K();export{G as default};