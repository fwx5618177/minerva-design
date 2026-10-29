import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DCMfehF7.js";import{i as s,n as c}from"./charts-CejCSz4V.js";function l(){return(0,u.jsx)(s,{series:d,height:280,ariaLabel:`Support tickets closed per quarter`})}var u,d;function f(){return(f=e((()=>{c(),u=n(),d=[{name:`Tickets closed`,data:[[`Q1`,320],[`Q2`,410],[`Q3`,385],[`Q4`,470]]}]})))()}function p(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function m(){let e=(0,h.useMemo)(()=>{let e=p(5),t=Array.from({length:30},(t,n)=>Math.round(60+n*1.5+e()*40)),n=t.map((e,n)=>{let r=t.slice(Math.max(0,n-6),n+1);return Math.round(r.reduce((e,t)=>e+t,0)/r.length)});return[{name:`Orders`,data:t},{name:`7-day average`,type:`line`,data:n,lineWidth:3}]},[]);return(0,g.jsx)(s,{series:e,xAxis:{title:`Day`},height:300,ariaLabel:`Daily orders with their 7-day average`})}var h,g;function _(){return(_=e((()=>{h=t(),c(),g=n()})))()}function v(){return(0,y.jsx)(s,{series:x,stacked:!0,height:300,ariaLabel:`Monthly orders by channel, stacked`})}var y,b,x;function S(){return(S=e((()=>{c(),y=n(),b=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],x=Object.entries({Web:[120,135,150,148,170,190],Mobile:[80,95,110,125,140,160],Partners:[30,28,35,42,40,51]}).map(([e,t])=>({name:e,data:b.map((e,n)=>[e,t[n]])}))})))()}var C;function w(){return(w=e((()=>{C=`import { BarChart, type ChartSeries } from "minerva-design/charts";

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
`})))()}var T;function E(){return(E=e((()=>{T=`import { useMemo } from "react";
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
`})))()}var D;function O(){return(O=e((()=>{D=`import { BarChart, type ChartSeries } from "minerva-design/charts";

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
`})))()}var k,A,j;function M(){return(M=e((()=>{f(),_(),S(),w(),E(),O(),t(),i(),o(),k=n(),A=r(Object.assign({"./demos/basic.tsx":l,"./demos/combo.tsx":m,"./demos/stacked.tsx":v}),Object.assign({"./demos/basic.tsx":C,"./demos/combo.tsx":T,"./demos/stacked.tsx":D})),j=()=>(0,k.jsx)(a,{id:`bar-chart`,demos:A})})))()}M();export{j as default};