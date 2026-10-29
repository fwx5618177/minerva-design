import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Dt as r,Ot as i}from"./io5-cgJxWOM4.js";import{a as ee,i as te,n as ne,r as re,s as ie,t as ae}from"./Card-BqfTCY3r.js";import{i as oe,n as se,r as ce,t as a}from"./Radio-DKdkHhxv.js";import{n as le,t as ue}from"./TextLink-CeEsii-h.js";import{i as de,r as o}from"./DemoBlock-HPs0QNwO.js";import{l as fe,n as pe,t as me,u as he}from"./DocPage-DmpxYJhU.js";import{a as ge,c as _e,f as s,i as ve,l as c,n as ye,o as be,p as l,r as xe,s as Se,t as Ce}from"./charts-BgMlJdRV.js";import{a as we,i as Te,n as Ee,o as De,r as Oe,s as ke,t as Ae}from"./shapes-BpdzBut9.js";function je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Me(){let e=(0,u.useMemo)(()=>{let e=je(42);return[{name:`p95 latency (ms)`,data:Array.from({length:120},(t,n)=>{let r=n>=70&&n<=82?90:0;return[n,105+e()*40+r]})}]},[]);return(0,d.jsx)(l,{series:e,annotations:f,xAxis:{title:`Minutes`},yAxis:{min:0,max:260},height:300,ariaLabel:`p95 latency with the SLO and the normal range`})}var u,d,f;function p(){return(p=e((()=>{u=t(),s(),d=n(),f=[{type:`rect`,y0:80,y1:150,color:`var(--success-color)`,label:`Normal range`},{type:`rect`,x0:70,x1:82,color:`var(--warning-color)`,opacity:.12,label:`Deploy`,labelPosition:`top-right`},{type:`line`,axis:`y`,value:200,color:`var(--danger-color)`,dash:[4,4],label:`SLO 200 ms`}]})))()}function m({title:e,page:t,description:n,children:r}){return(0,h.jsxs)(ae,{padding:`small`,style:{minWidth:0},children:[(0,h.jsxs)(ee,{children:[(0,h.jsx)(ie,{children:(0,h.jsx)(le,{href:`#/${t}`,children:e})}),(0,h.jsx)(ne,{children:n})]}),(0,h.jsx)(re,{children:r})]})}function Ne(){return(0,h.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(260px, 1fr))`,gap:16,width:`100%`},children:[(0,h.jsx)(m,{title:`LineChart`,page:`line-chart`,description:`Trends`,children:(0,h.jsx)(Se,{series:y,height:L,legend:!1,ariaLabel:`Visits and sign-ups per month`})}),(0,h.jsx)(m,{title:`AreaChart`,page:`area-chart`,description:`Smooth, stacked`,children:(0,h.jsx)(ge,{series:b,stacked:!0,height:L,legend:!1,ariaLabel:`Users per platform, stacked`})}),(0,h.jsx)(m,{title:`BarChart`,page:`bar-chart`,description:`Value labels, per-bar color`,children:(0,h.jsx)(ve,{series:x,labels:!0,height:L,legend:!1,ariaLabel:`Orders per quarter`})}),(0,h.jsx)(m,{title:`ScatterChart`,page:`scatter-chart`,description:`Correlations, clusters`,children:(0,h.jsx)(xe,{series:S,height:L,legend:!1,ariaLabel:`Two clusters of measurements`})}),(0,h.jsx)(m,{title:`CandlestickChart`,page:`candlestick-chart`,description:`Open, high, low, close`,children:(0,h.jsx)(ye,{series:C,height:L,legend:!1,ariaLabel:`Daily ACME prices`})}),(0,h.jsx)(m,{title:`HeatmapChart`,page:`heatmap-chart`,description:`Values on a grid`,children:(0,h.jsx)(_e,{data:E,xCategories:w,yCategories:T,name:`Load`,radius:2,height:L,ariaLabel:`Load by weekday and hour`})}),(0,h.jsx)(m,{title:`Sparkline`,page:`sparkline`,description:`Word-sized trends`,children:(0,h.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`strong`,{style:{fontSize:22},children:`$46k`}),` revenue`,(0,h.jsx)(c,{data:D,type:`area`,reference:30,name:`Revenue`,ariaLabel:`Revenue trend`})]}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`strong`,{style:{fontSize:22},children:`2`}),` errors`,(0,h.jsx)(c,{data:Pe,type:`bar`,name:`Errors`,color:`var(--danger-color)`,ariaLabel:`Errors trend`})]})]})}),(0,h.jsx)(m,{title:`PieChart`,page:`pie-chart`,description:`Shares`,children:(0,h.jsx)(we,{data:O,height:L,legend:!1,format:R,ariaLabel:`Browser share`})}),(0,h.jsx)(m,{title:`DonutChart`,page:`pie-chart`,description:`Shares with a total`,children:(0,h.jsx)(Te,{data:k,height:L,labels:`none`,centerValue:`8.4k`,centerLabel:`users`,legend:{position:`bottom`},ariaLabel:`Users per plan`})}),(0,h.jsx)(m,{title:`RadarChart`,page:`radar-chart`,description:`Profiles over several axes`,children:(0,h.jsx)(Ee,{indicators:A,series:j,height:L,legend:!1,ariaLabel:`Vendor comparison`})}),(0,h.jsx)(m,{title:`GaugeChart`,page:`gauge-chart`,description:`One value against a target`,children:(0,h.jsx)(Ae,{value:78,label:`Uptime score`,bands:M,height:L,ariaLabel:`Uptime score`})}),(0,h.jsx)(m,{title:`FunnelChart`,page:`funnel-chart`,description:`Stages and conversion`,children:(0,h.jsx)(De,{data:N,height:L,legend:!1,ariaLabel:`Sign-up funnel`})}),(0,h.jsx)(m,{title:`TreemapChart`,page:`treemap-chart`,description:`Hierarchical parts of a whole`,children:(0,h.jsx)(ke,{data:P,height:L,ariaLabel:`Budget per department`})}),(0,h.jsx)(m,{title:`QuadrantChart`,page:`quadrant-chart`,description:`Priority matrix`,children:(0,h.jsx)(Ce,{points:F,quadrants:I,showTicks:!1,height:L,ariaLabel:`Tasks by urgency and importance`})})]})}var h,g,_,v,y,b,x,S,C,w,T,E,D,Pe,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{te(),ue(),be(),Oe(),h=n(),g=e=>()=>(e=e*16807%2147483647,(e-1)/2147483646),_=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`],v=e=>e.map((e,t)=>[_[t],e]),y=[{name:`Visits`,data:v([32,41,38,52,49,61,66,72])},{name:`Sign-ups`,data:v([12,15,19,18,24,27,26,34])}],b=[{name:`Web`,data:v([20,24,22,30,34,31,38,42])},{name:`iOS`,data:v([12,14,18,17,20,24,23,27])},{name:`Android`,data:v([8,11,10,14,16,15,19,22])}],x=[{name:`Orders`,data:[{x:`Q1`,y:128},{x:`Q2`,y:164},{x:`Q3`,y:212,color:`var(--success-color)`},{x:`Q4`,y:187}]}],S=(()=>{let e=g(7),t=(t,n,r)=>({name:t,data:Array.from({length:40},()=>({x:n+(e()-.5)*30,y:r+(e()-.5)*30,size:4+e()*6}))});return[t(`Team A`,35,60),t(`Team B`,65,35)]})(),C=(()=>{let e=g(42),t=100;return[{name:`ACME`,data:Array.from({length:36},(n,r)=>{let i=t;return t=Math.max(60,i+(e()-.48)*8),{x:r,open:i,high:Math.max(i,t)+e()*3,low:Math.min(i,t)-e()*3,y:t}})}]})(),w=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],T=[`0h`,`4h`,`8h`,`12h`,`16h`,`20h`],E=(()=>{let e=g(3);return w.flatMap((t,n)=>T.map((r,i)=>({x:t,y:r,value:Math.round((n<5?40:15)+(i>=2&&i<=4?40:0)+e()*20)})))})(),D=[18,22,19,26,24,31,29,35,33,41,38,46],Pe=[9,7,8,5,6,4,5,3,4,2,3,2],O=[{name:`Chrome`,value:64},{name:`Safari`,value:19},{name:`Edge`,value:9},{name:`Firefox`,value:8}],k=[{name:`Free`,value:5400},{name:`Pro`,value:2100},{name:`Team`,value:860}],A=[{name:`Speed`,max:10},{name:`Quality`,max:10},{name:`Cost`,max:10},{name:`Support`,max:10},{name:`Scale`,max:10}],j=[{name:`Vendor A`,values:[8,6,7,5,9]},{name:`Vendor B`,values:[5,9,6,8,6]}],M=[{to:60,color:`var(--danger-color)`},{to:85,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}],N=[{name:`Visited`,value:12e3},{name:`Signed up`,value:4800},{name:`Activated`,value:2600},{name:`Paid`,value:900}],P=[{name:`Product`,children:[{name:`Design`,value:18},{name:`Engineering`,value:42}]},{name:`Go to market`,children:[{name:`Sales`,value:24},{name:`Marketing`,value:16}]}],F=[{x:8,y:8.5,label:`Release`},{x:3,y:7.5,label:`Roadmap`},{x:7,y:3,label:`Emails`},{x:2,y:2,label:`Cleanup`}],I={topLeft:{label:`Plan`},topRight:{label:`Do first`},bottomLeft:{label:`Drop`},bottomRight:{label:`Delegate`}},L=180,R=e=>`${Math.round(e)}%`})))()}function Fe(){return(0,B.jsx)(l,{series:W,legend:{position:`bottom`},height:300,ariaLabel:`Monthly revenue against target`})}var B,V,H,U,W;function G(){return(G=e((()=>{s(),B=n(),V=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],H=[42,48,51,47,58,63,61,70,74,69,81,92],U=[45,47,50,53,56,59,62,65,68,71,74,77],W=[{name:`Revenue (k$)`,type:`bar`,data:V.map((e,t)=>[e,H[t]])},{name:`Target (k$)`,type:`line`,data:V.map((e,t)=>[e,U[t]])}]})))()}function Ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Le(){let[e,t]=(0,K.useState)(`auto`),[n,r]=(0,K.useState)(null),i=(0,K.useMemo)(()=>{let e=Ie(7),t=new Float64Array(J),n=0;for(let r=0;r<J;r++)n+=e()-.5,t[r]=n;return[{name:`Random walk`,data:{y:t}}]},[]);return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsxs)(oe,{"aria-label":`Renderer`,direction:`horizontal`,value:e,onChange:e=>t(e),children:[(0,q.jsx)(a,{value:`auto`,label:`auto`}),(0,q.jsx)(a,{value:`webgpu`,label:`webgpu`}),(0,q.jsx)(a,{value:`webgl2`,label:`webgl2`}),(0,q.jsx)(a,{value:`canvas2d`,label:`canvas2d`})]}),(0,q.jsx)(l,{series:i,renderer:e,onRendererChange:r,height:280,ariaLabel:`Random walk of 50,000 points`}),(0,q.jsxs)(`p`,{role:`status`,children:[`Requested: `,e,` · drawn with: `,n??`…`]})]})}var K,q,J;function Y(){return(Y=e((()=>{K=t(),se(),ce(),s(),q=n(),J=5e4})))()}var X;function Re(){return(Re=e((()=>{X=`import { useMemo } from "react";
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
`})))()}var ze;function Z(){return(Z=e((()=>{ze=`import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TextLink,
} from "minerva-design";
import {
  AreaChart,
  BarChart,
  CandlestickChart,
  DonutChart,
  FunnelChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  PieChart,
  QuadrantChart,
  RadarChart,
  ScatterChart,
  Sparkline,
  TreemapChart,
  type ChartSeries,
  type HeatmapCell,
  type QuadrantPoint,
  type RadarIndicator,
  type RadarSeries,
  type ShapeDatum,
  type TreemapNode,
} from "minerva-design/charts";

// Every data set lives at module level: stable references never trigger updates.

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const pairs = (values: readonly number[]) =>
  values.map((value, i) => [months[i], value] as const);

const lineSeries: ChartSeries[] = [
  { name: "Visits", data: pairs([32, 41, 38, 52, 49, 61, 66, 72]) },
  { name: "Sign-ups", data: pairs([12, 15, 19, 18, 24, 27, 26, 34]) },
];

const areaSeries: ChartSeries[] = [
  { name: "Web", data: pairs([20, 24, 22, 30, 34, 31, 38, 42]) },
  { name: "iOS", data: pairs([12, 14, 18, 17, 20, 24, 23, 27]) },
  { name: "Android", data: pairs([8, 11, 10, 14, 16, 15, 19, 22]) },
];

const barSeries: ChartSeries[] = [
  {
    name: "Orders",
    data: [
      { x: "Q1", y: 128 },
      { x: "Q2", y: 164 },
      { x: "Q3", y: 212, color: "var(--success-color)" },
      { x: "Q4", y: 187 },
    ],
  },
];

const scatterSeries: ChartSeries[] = (() => {
  const next = random(7);
  const group = (name: string, cx: number, cy: number) => ({
    name,
    data: Array.from({ length: 40 }, () => ({
      x: cx + (next() - 0.5) * 30,
      y: cy + (next() - 0.5) * 30,
      size: 4 + next() * 6,
    })),
  });
  return [group("Team A", 35, 60), group("Team B", 65, 35)];
})();

const candleSeries: ChartSeries[] = (() => {
  const next = random(42);
  let close = 100;
  const data = Array.from({ length: 36 }, (_, x) => {
    const open = close;
    close = Math.max(60, open + (next() - 0.48) * 8);
    const high = Math.max(open, close) + next() * 3;
    const low = Math.min(open, close) - next() * 3;
    return { x, open, high, low, y: close };
  });
  return [{ name: "ACME", data }];
})();

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = ["0h", "4h", "8h", "12h", "16h", "20h"];
const heatmapCells: HeatmapCell[] = (() => {
  const next = random(3);
  return days.flatMap((day, d) =>
    slots.map((slot, s) => ({
      x: day,
      y: slot,
      value: Math.round(
        (d < 5 ? 40 : 15) + (s >= 2 && s <= 4 ? 40 : 0) + next() * 20,
      ),
    })),
  );
})();

const revenueTrend = [18, 22, 19, 26, 24, 31, 29, 35, 33, 41, 38, 46];
const errorTrend = [9, 7, 8, 5, 6, 4, 5, 3, 4, 2, 3, 2];

const browsers: ShapeDatum[] = [
  { name: "Chrome", value: 64 },
  { name: "Safari", value: 19 },
  { name: "Edge", value: 9 },
  { name: "Firefox", value: 8 },
];

const plans: ShapeDatum[] = [
  { name: "Free", value: 5400 },
  { name: "Pro", value: 2100 },
  { name: "Team", value: 860 },
];

const skills: RadarIndicator[] = [
  { name: "Speed", max: 10 },
  { name: "Quality", max: 10 },
  { name: "Cost", max: 10 },
  { name: "Support", max: 10 },
  { name: "Scale", max: 10 },
];
const vendors: RadarSeries[] = [
  { name: "Vendor A", values: [8, 6, 7, 5, 9] },
  { name: "Vendor B", values: [5, 9, 6, 8, 6] },
];

const gaugeBands = [
  { to: 60, color: "var(--danger-color)" },
  { to: 85, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

const stages: ShapeDatum[] = [
  { name: "Visited", value: 12000 },
  { name: "Signed up", value: 4800 },
  { name: "Activated", value: 2600 },
  { name: "Paid", value: 900 },
];

const budget: TreemapNode[] = [
  {
    name: "Product",
    children: [
      { name: "Design", value: 18 },
      { name: "Engineering", value: 42 },
    ],
  },
  {
    name: "Go to market",
    children: [
      { name: "Sales", value: 24 },
      { name: "Marketing", value: 16 },
    ],
  },
];

const tasks: QuadrantPoint[] = [
  { x: 8, y: 8.5, label: "Release" },
  { x: 3, y: 7.5, label: "Roadmap" },
  { x: 7, y: 3, label: "Emails" },
  { x: 2, y: 2, label: "Cleanup" },
];
const regions = {
  topLeft: { label: "Plan" },
  topRight: { label: "Do first" },
  bottomLeft: { label: "Drop" },
  bottomRight: { label: "Delegate" },
};

const HEIGHT = 180;
const compactPercent = (value: number) => \`\${Math.round(value)}%\`;

function GalleryCard({
  title,
  page,
  description,
  children,
}: {
  title: string;
  page: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink href={\`#/\${page}\`}>{title}</TextLink>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function GalleryDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      <GalleryCard title="LineChart" page="line-chart" description="Trends">
        <LineChart
          series={lineSeries}
          height={HEIGHT}
          legend={false}
          ariaLabel="Visits and sign-ups per month"
        />
      </GalleryCard>

      <GalleryCard
        title="AreaChart"
        page="area-chart"
        description="Smooth, stacked"
      >
        <AreaChart
          series={areaSeries}
          stacked
          height={HEIGHT}
          legend={false}
          ariaLabel="Users per platform, stacked"
        />
      </GalleryCard>

      <GalleryCard
        title="BarChart"
        page="bar-chart"
        description="Value labels, per-bar color"
      >
        <BarChart
          series={barSeries}
          labels
          height={HEIGHT}
          legend={false}
          ariaLabel="Orders per quarter"
        />
      </GalleryCard>

      <GalleryCard
        title="ScatterChart"
        page="scatter-chart"
        description="Correlations, clusters"
      >
        <ScatterChart
          series={scatterSeries}
          height={HEIGHT}
          legend={false}
          ariaLabel="Two clusters of measurements"
        />
      </GalleryCard>

      <GalleryCard
        title="CandlestickChart"
        page="candlestick-chart"
        description="Open, high, low, close"
      >
        <CandlestickChart
          series={candleSeries}
          height={HEIGHT}
          legend={false}
          ariaLabel="Daily ACME prices"
        />
      </GalleryCard>

      <GalleryCard
        title="HeatmapChart"
        page="heatmap-chart"
        description="Values on a grid"
      >
        <HeatmapChart
          data={heatmapCells}
          xCategories={days}
          yCategories={slots}
          name="Load"
          radius={2}
          height={HEIGHT}
          ariaLabel="Load by weekday and hour"
        />
      </GalleryCard>

      <GalleryCard
        title="Sparkline"
        page="sparkline"
        description="Word-sized trends"
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <strong style={{ fontSize: 22 }}>$46k</strong> revenue
            <Sparkline
              data={revenueTrend}
              type="area"
              reference={30}
              name="Revenue"
              ariaLabel="Revenue trend"
            />
          </div>
          <div>
            <strong style={{ fontSize: 22 }}>2</strong> errors
            <Sparkline
              data={errorTrend}
              type="bar"
              name="Errors"
              color="var(--danger-color)"
              ariaLabel="Errors trend"
            />
          </div>
        </div>
      </GalleryCard>

      <GalleryCard title="PieChart" page="pie-chart" description="Shares">
        <PieChart
          data={browsers}
          height={HEIGHT}
          legend={false}
          format={compactPercent}
          ariaLabel="Browser share"
        />
      </GalleryCard>

      <GalleryCard
        title="DonutChart"
        page="pie-chart"
        description="Shares with a total"
      >
        <DonutChart
          data={plans}
          height={HEIGHT}
          labels="none"
          centerValue="8.4k"
          centerLabel="users"
          legend={{ position: "bottom" }}
          ariaLabel="Users per plan"
        />
      </GalleryCard>

      <GalleryCard
        title="RadarChart"
        page="radar-chart"
        description="Profiles over several axes"
      >
        <RadarChart
          indicators={skills}
          series={vendors}
          height={HEIGHT}
          legend={false}
          ariaLabel="Vendor comparison"
        />
      </GalleryCard>

      <GalleryCard
        title="GaugeChart"
        page="gauge-chart"
        description="One value against a target"
      >
        <GaugeChart
          value={78}
          label="Uptime score"
          bands={gaugeBands}
          height={HEIGHT}
          ariaLabel="Uptime score"
        />
      </GalleryCard>

      <GalleryCard
        title="FunnelChart"
        page="funnel-chart"
        description="Stages and conversion"
      >
        <FunnelChart
          data={stages}
          height={HEIGHT}
          legend={false}
          ariaLabel="Sign-up funnel"
        />
      </GalleryCard>

      <GalleryCard
        title="TreemapChart"
        page="treemap-chart"
        description="Hierarchical parts of a whole"
      >
        <TreemapChart
          data={budget}
          height={HEIGHT}
          ariaLabel="Budget per department"
        />
      </GalleryCard>

      <GalleryCard
        title="QuadrantChart"
        page="quadrant-chart"
        description="Priority matrix"
      >
        <QuadrantChart
          points={tasks}
          quadrants={regions}
          showTicks={false}
          height={HEIGHT}
          ariaLabel="Tasks by urgency and importance"
        />
      </GalleryCard>
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { Chart, type ChartSeries } from "minerva-design/charts";

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
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useMemo, useState } from "react";
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
`})))()}var Q,We,Ge;function $(){return($=e((()=>{p(),z(),G(),Y(),Re(),Z(),Ve(),Ue(),t(),r(),pe(),de(),he(),Q=n(),We=fe(Object.assign({"./demos/annotations.tsx":Me,"./demos/gallery.tsx":Ne,"./demos/mixed.tsx":Fe,"./demos/renderers.tsx":Le}),Object.assign({"./demos/annotations.tsx":X,"./demos/gallery.tsx":ze,"./demos/mixed.tsx":Be,"./demos/renderers.tsx":He})),Ge=()=>{let{t:e}=i(),t=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`section`,{className:o.section,"aria-labelledby":`chart-rendering`,children:[(0,Q.jsx)(`h2`,{id:`chart-rendering`,children:e(`docs.charts.intro.rendering.title`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.charts.intro.rendering.text`)}),(0,Q.jsxs)(`ul`,{className:o.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.charts.intro.rendering.background`)}),(0,Q.jsx)(`li`,{children:e(`docs.charts.intro.rendering.data`)}),(0,Q.jsx)(`li`,{children:e(`docs.charts.intro.rendering.labels`)}),(0,Q.jsx)(`li`,{children:e(`docs.charts.intro.rendering.dom`)})]})]}),(0,Q.jsxs)(`section`,{className:o.section,"aria-labelledby":`chart-large-data`,children:[(0,Q.jsx)(`h2`,{id:`chart-large-data`,children:e(`docs.charts.intro.largeData.title`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.charts.intro.largeData.text`)})]}),(0,Q.jsxs)(`section`,{className:o.section,"aria-labelledby":`chart-interaction`,children:[(0,Q.jsx)(`h2`,{id:`chart-interaction`,children:e(`docs.charts.intro.interaction.title`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.charts.intro.interaction.pointer`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.charts.intro.interaction.keyboard`)})]}),(0,Q.jsxs)(`section`,{className:o.section,"aria-labelledby":`chart-theming`,children:[(0,Q.jsx)(`h2`,{id:`chart-theming`,children:e(`docs.charts.intro.theming.title`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.charts.intro.theming.text`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.charts.intro.theming.core`)})]})]});return(0,Q.jsx)(me,{id:`charts`,demos:We,intro:t})}})))()}$();export{Ge as default};