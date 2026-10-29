import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DmpxYJhU.js";import{A as s,k as c}from"./theme-BtADPb1U.js";import{a as l,o as u}from"./charts-BgMlJdRV.js";function d(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function f(){let e=(0,p.useMemo)(()=>{let e=d(21),t=[],n=18e3;for(let r=0;r<90;r++){n*=1.004+(e()-.5)*.01;let i=1+.04*Math.sin(r/9),a=n*i*(.985+e()*.03);t.push([new Date(g+r*h),Math.round(a)])}return[{name:`Daily active users`,data:t}]},[]);return(0,m.jsx)(l,{series:e,yAxis:{format:e=>s(e)},height:280,ariaLabel:`Daily active users, April to June 2026`})}var p,m,h,g;function _(){return(_=e((()=>{p=t(),u(),c(),m=n(),h=864e5,g=new Date(2026,3,1).getTime()})))()}function v(){return(0,y.jsx)(l,{series:x,percent:!0,height:300,ariaLabel:`Market share by vendor, 2016 to 2026`})}var y,b,x;function S(){return(S=e((()=>{u(),y=n(),b=[`2016`,`2017`,`2018`,`2019`,`2020`,`2021`,`2022`,`2023`,`2024`,`2025`,`2026`],x=Object.entries({Aurora:[38,41,47,52,58,66,71,74,79,83,88],Borealis:[52,50,49,47,44,43,41,40,38,37,35],Cobalt:[12,16,21,27,31,34,36,41,44,49,54],Others:[44,42,39,36,33,30,28,25,23,21,19]}).map(([e,t])=>({name:e,data:b.map((e,n)=>[e,t[n]])}))})))()}function C(){return(0,w.jsx)(l,{series:E,stacked:!0,yAxis:{format:e=>s(e)},height:300,ariaLabel:`Monthly visits by traffic source, stacked`})}var w,T,E;function D(){return(D=e((()=>{u(),c(),w=n(),T=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],E=Object.entries({Organic:[42e3,44500,47800,46900,51200,54e3,52300,55800,60100,63400,66200,70500],Direct:[21e3,21800,22400,23900,24100,25600,26e3,25200,27300,28800,29500,31200],Referral:[9800,10400,12900,11700,12300,14800,13900,14200,15600,17400,16900,18300],Social:[6200,7900,7100,8800,11400,10200,9600,12700,13100,12400,15800,17900]}).map(([e,t])=>({name:e,data:T.map((e,n)=>[e,t[n]])}))})))()}function O(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function k(){let e=(0,A.useMemo)(()=>{let e=O(8),t=[],n=3;for(let r=0;r<96;r++){let i=r/4,a=3+9*Math.exp(-((i-14)**2)/18)+e()*2,o=Math.min(P,Math.max(2,Math.round(a)));o>n?n=o:o<n&&e()<.5&&--n,t.push([new Date(N+r*M),n])}return[{name:`Running instances`,data:t}]},[]);return(0,j.jsx)(l,{series:e,curve:`step`,yAxis:{zero:!0,max:16},annotations:[{type:`line`,axis:`y`,value:P,dash:[4,4],color:`var(--danger-color)`,label:`Quota`}],height:280,ariaLabel:`Instances started by the autoscaler over one day`})}var A,j,M,N,P;function F(){return(F=e((()=>{A=t(),u(),j=n(),M=9e5,N=new Date(2026,5,15).getTime(),P=14})))()}var I;function L(){return(L=e((()=>{I=`import { useMemo } from "react";
import {
  AreaChart,
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
const START = new Date(2026, 3, 1).getTime();

export default function BasicDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(21);
    const data: [Date, number][] = [];
    let level = 18_000;
    for (let i = 0; i < 90; i++) {
      level *= 1.004 + (random() - 0.5) * 0.01;
      const seasonal = 1 + 0.04 * Math.sin(i / 9);
      const value = level * seasonal * (0.985 + random() * 0.03);
      data.push([new Date(START + i * DAY), Math.round(value)]);
    }
    return [{ name: "Daily active users", data }];
  }, []);

  return (
    <AreaChart
      series={series}
      yAxis={{ format: (value) => formatCompact(value) }}
      height={280}
      ariaLabel="Daily active users, April to June 2026"
    />
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { AreaChart, type ChartSeries } from "minerva-design/charts";

const years = [
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
];

// Units shipped (millions) by vendor; \`percent\` turns them into shares
const vendors = {
  Aurora: [38, 41, 47, 52, 58, 66, 71, 74, 79, 83, 88],
  Borealis: [52, 50, 49, 47, 44, 43, 41, 40, 38, 37, 35],
  Cobalt: [12, 16, 21, 27, 31, 34, 36, 41, 44, 49, 54],
  Others: [44, 42, 39, 36, 33, 30, 28, 25, 23, 21, 19],
};

const series: ChartSeries[] = Object.entries(vendors).map(([name, values]) => ({
  name,
  data: years.map((year, i) => [year, values[i]] as const),
}));

export default function PercentDemo() {
  return (
    <AreaChart
      series={series}
      percent
      height={300}
      ariaLabel="Market share by vendor, 2016 to 2026"
    />
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import {
  AreaChart,
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

// Monthly visits by traffic source
const sources = {
  Organic: [
    42_000, 44_500, 47_800, 46_900, 51_200, 54_000, 52_300, 55_800, 60_100,
    63_400, 66_200, 70_500,
  ],
  Direct: [
    21_000, 21_800, 22_400, 23_900, 24_100, 25_600, 26_000, 25_200, 27_300,
    28_800, 29_500, 31_200,
  ],
  Referral: [
    9_800, 10_400, 12_900, 11_700, 12_300, 14_800, 13_900, 14_200, 15_600,
    17_400, 16_900, 18_300,
  ],
  Social: [
    6_200, 7_900, 7_100, 8_800, 11_400, 10_200, 9_600, 12_700, 13_100, 12_400,
    15_800, 17_900,
  ],
};

const series: ChartSeries[] = Object.entries(sources).map(([name, values]) => ({
  name,
  data: months.map((month, i) => [month, values[i]] as const),
}));

export default function StackedDemo() {
  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: (value) => formatCompact(value) }}
      height={300}
      ariaLabel="Monthly visits by traffic source, stacked"
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const QUARTER_HOUR = 15 * 60 * 1000;
// local midnight, so the time axis reads 00:00 → 24:00 in every time zone
const START = new Date(2026, 5, 15).getTime();
const QUOTA = 14;

export default function StepDemo() {
  // Instances started by an autoscaler: the count holds until the next change
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(8);
    const data: [Date, number][] = [];
    let instances = 3;
    for (let i = 0; i < 96; i++) {
      const hour = i / 4;
      const load = 3 + 9 * Math.exp(-((hour - 14) ** 2) / 18) + random() * 2;
      const target = Math.min(QUOTA, Math.max(2, Math.round(load)));
      // scale out quickly, scale in one instance at a time
      if (target > instances) instances = target;
      else if (target < instances && random() < 0.5) instances -= 1;
      data.push([new Date(START + i * QUARTER_HOUR), instances]);
    }
    return [{ name: "Running instances", data }];
  }, []);

  return (
    <AreaChart
      series={series}
      curve="step"
      yAxis={{ zero: true, max: QUOTA + 2 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: QUOTA,
          dash: [4, 4],
          color: "var(--danger-color)",
          label: "Quota",
        },
      ]}
      height={280}
      ariaLabel="Instances started by the autoscaler over one day"
    />
  );
}
`})))()}var W,G,K;function q(){return(q=e((()=>{_(),S(),D(),F(),L(),z(),V(),U(),t(),i(),o(),W=n(),G=r(Object.assign({"./demos/basic.tsx":f,"./demos/percent.tsx":v,"./demos/stacked.tsx":C,"./demos/step.tsx":k}),Object.assign({"./demos/basic.tsx":I,"./demos/percent.tsx":R,"./demos/stacked.tsx":B,"./demos/step.tsx":H})),K=()=>(0,W.jsx)(a,{id:`area-chart`,demos:G})})))()}q();export{K as default};