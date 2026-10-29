import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,n as i,r as a,t as o}from"./Radio-DKdkHhxv.js";import{l as s,n as c,t as l,u}from"./DocPage-DmpxYJhU.js";import{n as d,o as f}from"./charts-BgMlJdRV.js";function p(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function m(e,t,n){let r=p(e),i=[],a=n;for(let e=Date.UTC(2026,2,2);i.length<t;e+=v){let t=new Date(e);if(t.getUTCDay()%6==0)continue;let n=a*(1+(r()-.5)*.012);a=n*(1+(r()+r()-1)*.035+.001);let o=Math.max(n,a)*(1+r()*.012),s=Math.min(n,a)*(1-r()*.012);i.push({x:t.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,timeZone:`UTC`}),open:n,high:o,low:s,y:a})}return i}function h(){let[e,t]=(0,g.useState)(`green-up`),n=(0,g.useMemo)(()=>m(42,60,182),[]),i=(0,g.useMemo)(()=>[{name:`ACME`,data:n,format:y,...e===`red-up`?{upColor:`var(--danger-color)`,downColor:`var(--success-color)`}:{}}],[n,e]);return(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,_.jsxs)(r,{"aria-label":`Candle colors`,direction:`horizontal`,value:e,onChange:e=>t(String(e)),children:[(0,_.jsx)(o,{value:`green-up`,label:`Green up, red down`}),(0,_.jsx)(o,{value:`red-up`,label:`Red up, green down`})]}),(0,_.jsx)(d,{series:i,yAxis:{format:e=>`$${e}`},height:320,ariaLabel:`ACME daily prices over 60 trading days`})]})}var g,_,v,y;function b(){return(b=e((()=>{g=t(),i(),a(),f(),_=n(),v=864e5,y=e=>`$${e.toFixed(2)}`})))()}function x(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function S(){let[e,t]=(0,C.useState)(null),n=(0,C.useMemo)(()=>{let e=x(50),t=new Float64Array(T),n=new Float64Array(T),r=new Float64Array(T),i=new Float64Array(T),a=new Float64Array(T),o=3200,s=.0012;for(let c=0;c<T;c++){s=Math.min(.004,Math.max(5e-4,s*(1+(e()-.5)*.1)));let l=o,u=l*(1+(e()+e()-1)*s);t[c]=D+c*E,n[c]=l,a[c]=u,r[c]=Math.max(l,u)*(1+e()*s*.6),i[c]=Math.min(l,u)*(1-e()*s*.6),o=u}return[{name:`ETH / USD`,data:{x:t,open:n,high:r,low:i,y:a},format:e=>e.toFixed(2)}]},[]);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,w.jsx)(d,{series:n,xAxis:{type:`time`},onRendererChange:t,height:340,ariaLabel:`50,000 one-minute candles`}),(0,w.jsxs)(`p`,{role:`status`,children:[T.toLocaleString(`en`),` candles · drawn with `,e??`…`,` · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset`]})]})}var C,w,T,E,D;function O(){return(O=e((()=>{C=t(),f(),w=n(),T=5e4,E=6e4,D=Date.UTC(2026,4,1)})))()}function k(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function A(e,t,n){let r=k(e),i=[],a=n;for(let e=Date.UTC(2026,0,5);i.length<t;e+=P){let t=new Date(e);if(t.getUTCDay()%6==0)continue;let n=i.length,o=n<50?.004:n<80?-.005:.003,s=a*(1+(r()-.5)*.012);a=s*(1+(r()+r()-1)*.032+o);let c=Math.max(s,a)*(1+r()*.014),l=Math.min(s,a)*(1-r()*.014);i.push({x:t.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,timeZone:`UTC`}),open:s,high:c,low:l,y:a})}return i}function j(){let e=(0,M.useMemo)(()=>{let e=A(7,120,64);return[{name:`NOVA`,data:e,format:I},{name:`MA 5`,type:`line`,data:F(e,5),curve:`smooth`,lineWidth:1.5,color:`var(--warning-color)`,format:I},{name:`MA 20`,type:`line`,data:F(e,20),curve:`smooth`,lineWidth:2,color:`var(--primary-color)`,format:I}]},[]);return(0,N.jsx)(d,{series:e,yAxis:{format:e=>`$${e}`},height:360,ariaLabel:`NOVA daily prices over 120 trading days with 5 and 20 day moving averages`})}var M,N,P,F,I;function L(){return(L=e((()=>{M=t(),f(),N=n(),P=864e5,F=(e,t)=>e.map((n,r)=>{if(r<t-1)return[n.x,null];let i=0;for(let n=r-t+1;n<=r;n++)i+=e[n].y;return[n.x,i/t]}),I=e=>`$${e.toFixed(2)}`})))()}var R;function z(){return(z=e((()=>{R=`import { useMemo, useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import {
  CandlestickChart,
  type ChartPointDatum,
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

/** Daily candles on trading days (weekends skipped), labelled "Mar 3" */
function dailyCandles(seed: number, count: number, price: number) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 2, 2); candles.length < count; t += DAY) {
    const date = new Date(t);
    if (date.getUTCDay() % 6 === 0) continue;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.035 + 0.001);
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    candles.push({
      x: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      open,
      high,
      low,
      y: close,
    });
  }
  return candles;
}

const usd = (value: number) => \`$\${value.toFixed(2)}\`;

export default function BasicDemo() {
  const [convention, setConvention] = useState("green-up");
  const candles = useMemo(() => dailyCandles(42, 60, 182), []);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: "ACME",
        data: candles,
        format: usd,
        // the defaults are --success-color up and --danger-color down
        ...(convention === "red-up"
          ? {
              upColor: "var(--danger-color)",
              downColor: "var(--success-color)",
            }
          : {}),
      },
    ],
    [candles, convention],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Candle colors"
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(String(value))}
      >
        <Radio value="green-up" label="Green up, red down" />
        <Radio value="red-up" label="Red up, green down" />
      </RadioGroup>
      <CandlestickChart
        series={series}
        yAxis={{ format: (value) => \`$\${value}\` }}
        height={320}
        ariaLabel="ACME daily prices over 60 trading days"
      />
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo, useState } from "react";
import {
  CandlestickChart,
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

const COUNT = 50_000;
const MINUTE = 60 * 1000;
const START = Date.UTC(2026, 4, 1);

export default function LargeDataDemo() {
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // One-minute candles of a market that never closes, as typed-array columns
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(50);
    const x = new Float64Array(COUNT);
    const open = new Float64Array(COUNT);
    const high = new Float64Array(COUNT);
    const low = new Float64Array(COUNT);
    const close = new Float64Array(COUNT);
    let price = 3200;
    let volatility = 0.0012;
    for (let i = 0; i < COUNT; i++) {
      // calm and busy periods alternate
      volatility = Math.min(
        0.004,
        Math.max(0.0005, volatility * (1 + (random() - 0.5) * 0.1)),
      );
      const o = price;
      const c = o * (1 + (random() + random() - 1) * volatility);
      x[i] = START + i * MINUTE;
      open[i] = o;
      close[i] = c;
      high[i] = Math.max(o, c) * (1 + random() * volatility * 0.6);
      low[i] = Math.min(o, c) * (1 - random() * volatility * 0.6);
      price = c;
    }
    return [
      {
        name: "ETH / USD",
        data: { x, open, high, low, y: close },
        format: (value) => value.toFixed(2),
      },
    ];
  }, []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CandlestickChart
        series={series}
        xAxis={{ type: "time" }}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel="50,000 one-minute candles"
      />
      <p role="status">
        {COUNT.toLocaleString("en")} candles · drawn with {renderer ?? "…"} ·
        Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset
      </p>
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import {
  CandlestickChart,
  type ChartPointDatum,
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

/** Daily candles on trading days (weekends skipped), labelled "Mar 3" */
function dailyCandles(seed: number, count: number, price: number) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 0, 5); candles.length < count; t += DAY) {
    const date = new Date(t);
    if (date.getUTCDay() % 6 === 0) continue;
    // a slow regime change: rally, pullback, recovery
    const day = candles.length;
    const drift = day < 50 ? 0.004 : day < 80 ? -0.005 : 0.003;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.032 + drift);
    const high = Math.max(open, close) * (1 + random() * 0.014);
    const low = Math.min(open, close) * (1 - random() * 0.014);
    candles.push({
      x: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      open,
      high,
      low,
      y: close,
    });
  }
  return candles;
}

/** Simple moving average of the closes; \`null\` until the window is full */
const movingAverage = (candles: ChartPointDatum[], window: number) =>
  candles.map((candle, i) => {
    if (i < window - 1) return [candle.x as string, null] as const;
    let sum = 0;
    for (let k = i - window + 1; k <= i; k++) sum += candles[k].y as number;
    return [candle.x as string, sum / window] as const;
  });

const usd = (value: number) => \`$\${value.toFixed(2)}\`;

export default function MovingAverageDemo() {
  const series = useMemo((): ChartSeries[] => {
    const candles = dailyCandles(7, 120, 64);
    return [
      { name: "NOVA", data: candles, format: usd },
      {
        name: "MA 5",
        type: "line",
        data: movingAverage(candles, 5),
        curve: "smooth",
        lineWidth: 1.5,
        color: "var(--warning-color)",
        format: usd,
      },
      {
        name: "MA 20",
        type: "line",
        data: movingAverage(candles, 20),
        curve: "smooth",
        lineWidth: 2,
        color: "var(--primary-color)",
        format: usd,
      },
    ];
  }, []);

  return (
    <CandlestickChart
      series={series}
      yAxis={{ format: (value) => \`$\${value}\` }}
      height={360}
      ariaLabel="NOVA daily prices over 120 trading days with 5 and 20 day moving averages"
    />
  );
}
`})))()}var W,G,K;function q(){return(q=e((()=>{b(),O(),L(),z(),V(),U(),t(),c(),u(),W=n(),G=s(Object.assign({"./demos/basic.tsx":h,"./demos/large-data.tsx":S,"./demos/moving-average.tsx":j}),Object.assign({"./demos/basic.tsx":R,"./demos/large-data.tsx":B,"./demos/moving-average.tsx":H})),K=()=>(0,W.jsx)(l,{id:`candlestick-chart`,demos:G})})))()}q();export{K as default};