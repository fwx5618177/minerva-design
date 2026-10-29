import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{a as r,i,n as a,r as o,s,t as c}from"./Card-BqfTCY3r.js";import{n as l,t as u}from"./Tag-vE6Ajh98.js";import{c as d,o as f}from"./DemoBlock-HPs0QNwO.js";import{l as p,n as m,t as h,u as g}from"./DocPage-DmpxYJhU.js";import{l as _,o as v}from"./charts-BgMlJdRV.js";function y(){return(0,b.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(160px, 1fr))`,gap:24,width:`100%`},children:S.map(({caption:e,props:t})=>(0,b.jsxs)(`figure`,{style:{margin:0},children:[(0,b.jsx)(_,{data:x,name:`Orders`,ariaLabel:`Weekly orders, ${e}`,...t}),(0,b.jsx)(`figcaption`,{style:{marginTop:6,fontSize:12,color:`var(--text-secondary-color)`},children:(0,b.jsx)(`code`,{children:e})})]},e))})}var b,x,S;function C(){return(C=e((()=>{v(),b=n(),x=[42,47,45,52,49,58,61,57,64,60,68,73,70,76,74,81,79,85,88,84],S=[{caption:`type="line"`,props:{}},{caption:`type="area"`,props:{type:`area`}},{caption:`type="bar"`,props:{type:`bar`}},{caption:`reference = average`,props:{reference:x.reduce((e,t)=>e+t,0)/x.length,color:`var(--success-color)`}}]})))()}function w(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function T(){let e=(0,E.useMemo)(()=>[{label:`Revenue`,value:`$128.4k`,delta:`+12.5%`,good:!0,spark:{data:O(1,3600,4400,.12),type:`area`,name:`Revenue ($)`}},{label:`Active users`,value:`24,310`,delta:`+4.1%`,good:!0,spark:{data:O(2,23e3,24300,.04),name:`Users`}},{label:`Signups`,value:`1,842`,delta:`−3.2%`,good:!1,spark:{data:O(3,66,58,.3),type:`bar`,name:`Signups`,color:`var(--warning-color)`}},{label:`p95 latency`,value:`182 ms`,delta:`−8.0%`,good:!0,spark:{data:O(4,205,180,.08),name:`p95 (ms)`,reference:200,color:`var(--success-color)`}}],[]);return(0,D.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(200px, 1fr))`,gap:16,width:`100%`},children:e.map(e=>(0,D.jsxs)(c,{padding:`medium`,children:[(0,D.jsxs)(r,{children:[(0,D.jsx)(a,{children:e.label}),(0,D.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:8},children:[(0,D.jsx)(s,{style:{fontSize:24},children:e.value}),(0,D.jsx)(u,{size:`small`,color:e.good?`success`:`danger`,children:e.delta})]})]}),(0,D.jsx)(o,{children:(0,D.jsx)(_,{...e.spark,height:56,ariaLabel:`${e.label}, last 30 days`})})]},e.label))})}var E,D,O;function k(){return(k=e((()=>{E=t(),i(),l(),v(),D=n(),O=(e,t,n,r)=>{let i=w(e),a=[],o=0;for(let e=0;e<30;e++)o=o*.6+(i()-.5)*r,a.push(Math.round((t+(n-t)*e/29)*(1+o)));return a}})))()}function A(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function j(){let e=(0,M.useMemo)(()=>{let e=A(30);return P.map(([t,n,r,i])=>{let a=Array.from({length:30},(t,n)=>{let a=r+(i-r)*n/29;return Math.round(a*(1+(e()-.5)*.14))});return a[0]=r,a[29]=i,{id:t,name:t,requests:n,latency:a}})},[]);return(0,N.jsx)(f,{"aria-label":`Service latency`,columns:I,data:e,rowKey:e=>e.id,hoverable:!0})}var M,N,P,F,I;function L(){return(L=e((()=>{M=t(),d(),l(),v(),N=n(),P=[[`API gateway`,48200,96,88],[`Auth`,12900,64,71],[`Search`,8400,210,162],[`Payments`,2150,320,395],[`Notifications`,5600,140,138]],F=e=>(e[e.length-1]/e[0]-1)*100,I=[{key:`name`,header:`Service`},{key:`requests`,header:`Requests / min`,align:`right`,render:e=>e.requests.toLocaleString(`en`)},{key:`trend`,header:`p95 latency, 30 days`,width:180,render:e=>(0,N.jsx)(_,{data:e.latency,name:`p95 (ms)`,color:F(e.latency)>0?`var(--danger-color)`:`var(--success-color)`,width:150,height:32,ariaLabel:`${e.name} p95 latency over 30 days`})},{key:`latency`,header:`Today`,align:`right`,render:e=>`${e.latency[e.latency.length-1]} ms`},{key:`change`,header:`Change`,align:`right`,render:e=>{let t=F(e.latency);return(0,N.jsxs)(u,{size:`small`,color:t>0?`danger`:`success`,children:[t>0?`+`:`−`,Math.abs(t).toFixed(1),`%`]})}}]})))()}var R;function z(){return(z=e((()=>{R=`import { Sparkline } from "minerva-design/charts";

const weekly = [
  42, 47, 45, 52, 49, 58, 61, 57, 64, 60, 68, 73, 70, 76, 74, 81, 79, 85, 88,
  84,
];
const average = weekly.reduce((sum, v) => sum + v, 0) / weekly.length;

const variants = [
  { caption: 'type="line"', props: {} },
  { caption: 'type="area"', props: { type: "area" as const } },
  { caption: 'type="bar"', props: { type: "bar" as const } },
  {
    caption: "reference = average",
    props: { reference: average, color: "var(--success-color)" },
  },
];

export default function BasicDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 24,
        width: "100%",
      }}
    >
      {variants.map(({ caption, props }) => (
        <figure key={caption} style={{ margin: 0 }}>
          <Sparkline
            data={weekly}
            name="Orders"
            ariaLabel={\`Weekly orders, \${caption}\`}
            {...props}
          />
          <figcaption
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "var(--text-secondary-color)",
            }}
          >
            <code>{caption}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tag,
} from "minerva-design";
import { Sparkline, type SparklineConfig } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 30 daily values drifting from \`from\` to \`to\`, with some day-to-day wobble */
const trend = (seed: number, from: number, to: number, noise: number) => {
  const random = mulberry32(seed);
  const values: number[] = [];
  let wobble = 0;
  for (let i = 0; i < 30; i++) {
    wobble = wobble * 0.6 + (random() - 0.5) * noise;
    values.push(Math.round((from + ((to - from) * i) / 29) * (1 + wobble)));
  }
  return values;
};

interface Kpi {
  label: string;
  value: string;
  delta: string;
  /** The change is good news (an increase is not always one) */
  good: boolean;
  spark: SparklineConfig;
}

export default function KpiCardsDemo() {
  const kpis = useMemo(
    (): Kpi[] => [
      {
        label: "Revenue",
        value: "$128.4k",
        delta: "+12.5%",
        good: true,
        spark: {
          data: trend(1, 3600, 4400, 0.12),
          type: "area",
          name: "Revenue ($)",
        },
      },
      {
        label: "Active users",
        value: "24,310",
        delta: "+4.1%",
        good: true,
        spark: { data: trend(2, 23_000, 24_300, 0.04), name: "Users" },
      },
      {
        label: "Signups",
        value: "1,842",
        delta: "−3.2%",
        good: false,
        spark: {
          data: trend(3, 66, 58, 0.3),
          type: "bar",
          name: "Signups",
          color: "var(--warning-color)",
        },
      },
      {
        label: "p95 latency",
        value: "182 ms",
        delta: "−8.0%",
        good: true,
        spark: {
          data: trend(4, 205, 180, 0.08),
          name: "p95 (ms)",
          reference: 200,
          color: "var(--success-color)",
        },
      },
    ],
    [],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {kpis.map((kpi) => (
        <Card key={kpi.label} padding="medium">
          <CardHeader>
            <CardDescription>{kpi.label}</CardDescription>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <CardTitle style={{ fontSize: 24 }}>{kpi.value}</CardTitle>
              <Tag size="small" color={kpi.good ? "success" : "danger"}>
                {kpi.delta}
              </Tag>
            </div>
          </CardHeader>
          <CardContent>
            <Sparkline
              {...kpi.spark}
              height={56}
              ariaLabel={\`\${kpi.label}, last 30 days\`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { Table, Tag, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Service {
  id: string;
  name: string;
  requests: number;
  /** p95 latency of the last 30 days, in ms */
  latency: number[];
}

const services: [string, number, number, number][] = [
  // name, requests / min, latency 30 days ago, latency today
  ["API gateway", 48_200, 96, 88],
  ["Auth", 12_900, 64, 71],
  ["Search", 8_400, 210, 162],
  ["Payments", 2_150, 320, 395],
  ["Notifications", 5_600, 140, 138],
];

const change = (latency: number[]) =>
  (latency[latency.length - 1] / latency[0] - 1) * 100;

const columns: TableColumn<Service>[] = [
  { key: "name", header: "Service" },
  {
    key: "requests",
    header: "Requests / min",
    align: "right",
    render: (row) => row.requests.toLocaleString("en"),
  },
  {
    key: "trend",
    header: "p95 latency, 30 days",
    width: 180,
    render: (row) => (
      <Sparkline
        data={row.latency}
        name="p95 (ms)"
        // rising latency is bad news
        color={
          change(row.latency) > 0
            ? "var(--danger-color)"
            : "var(--success-color)"
        }
        width={150}
        height={32}
        ariaLabel={\`\${row.name} p95 latency over 30 days\`}
      />
    ),
  },
  {
    key: "latency",
    header: "Today",
    align: "right",
    render: (row) => \`\${row.latency[row.latency.length - 1]} ms\`,
  },
  {
    key: "change",
    header: "Change",
    align: "right",
    render: (row) => {
      const value = change(row.latency);
      return (
        <Tag size="small" color={value > 0 ? "danger" : "success"}>
          {value > 0 ? "+" : "−"}
          {Math.abs(value).toFixed(1)}%
        </Tag>
      );
    },
  },
];

export default function TableDemo() {
  const data = useMemo((): Service[] => {
    const random = mulberry32(30);
    return services.map(([name, requests, from, to]) => {
      const latency = Array.from({ length: 30 }, (_, i) => {
        const value = from + ((to - from) * i) / 29;
        return Math.round(value * (1 + (random() - 0.5) * 0.14));
      });
      latency[0] = from;
      latency[29] = to;
      return { id: name, name, requests, latency };
    });
  }, []);

  return (
    <Table
      aria-label="Service latency"
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      hoverable
    />
  );
}
`})))()}var W,G,K;function q(){return(q=e((()=>{C(),k(),L(),z(),V(),U(),t(),m(),g(),W=n(),G=p(Object.assign({"./demos/basic.tsx":y,"./demos/kpi-cards.tsx":T,"./demos/table.tsx":j}),Object.assign({"./demos/basic.tsx":R,"./demos/kpi-cards.tsx":B,"./demos/table.tsx":H})),K=()=>(0,W.jsx)(h,{id:`sparkline`,demos:G})})))()}q();export{K as default};