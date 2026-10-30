import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BzoVi22c.js";import{i as a,n as o,r as s,t as c}from"./Radio-DnNachfg.js";import{l,n as u,t as d,u as f}from"./DocPage-B2iACtLP.js";import{l as p,m,r as ee}from"./charts-eaEG_eJd.js";function te(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ne(e,t,n,r){let i=te(e),a=[],o=n;for(let e=Date.UTC(2026,2,2);a.length<t;e+=_){if(new Date(e).getUTCDay()%6==0)continue;let t=o*(1+(i()-.5)*.012);o=t*(1+(i()+i()-1)*.035+.001);let n=Math.max(t,o)*(1+i()*.012),s=Math.min(t,o)*(1-i()*.012);a.push({x:r.format(e),open:t,high:n,low:s,y:o})}return a}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,o]=(0,h.useState)(`green-up`),s=(0,h.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),l=(0,h.useMemo)(()=>ne(42,60,182,new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`})),[n]),u=(0,h.useMemo)(()=>[{name:`ACME`,data:l,...i===`red-up`?{upColor:`var(--danger-color)`,downColor:`var(--success-color)`}:{}}],[l,i]);return(0,g.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,g.jsxs)(a,{"aria-label":e(`candleColors`),direction:`horizontal`,value:i,onChange:e=>o(String(e)),children:[(0,g.jsx)(c,{value:`green-up`,label:e(`greenUp`)}),(0,g.jsx)(c,{value:`red-up`,label:e(`redUp`)})]}),(0,g.jsx)(p,{series:u,yAxis:{format:e=>s.format(e)},renderTooltip:t=>{let n=t.items[0];if(!n||n.open===void 0)return null;let r=[[e(`open`),n.open],[e(`high`),n.high??n.y],[e(`low`),n.low??n.y],[e(`close`),n.y]];return(0,g.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,g.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),r.map(([e,t])=>(0,g.jsxs)(`span`,{style:{display:`contents`},children:[(0,g.jsx)(`span`,{children:e}),(0,g.jsx)(`span`,{style:{textAlign:`end`},children:s.format(t)})]},e))]})},height:320,ariaLabel:e(`acmeAria`)})]})}var h,g,_;function v(){return(v=e((()=>{h=t(),i(),o(),s(),m(),g=n(),_=864e5})))()}function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,y.useMemo)(()=>[{name:`ORBT`,data:T},{name:e(`vwap`),type:`line`,data:E,lineWidth:1.5,color:`var(--warning-color)`}],[e]),a=(0,y.useMemo)(()=>[{type:`line`,axis:`x`,value:C,dash:[4,4],color:`var(--danger-color)`,label:e(`guidanceCut`)}],[e]),o=(0,y.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,timeZone:`America/New_York`}),[n]),s=(0,y.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]);return(0,b.jsx)(p,{series:i,annotations:a,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>s.format(e)},renderTooltip:t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,s.format(r.y)]):n.push([e(`open`),s.format(r.open)],[e(`high`),s.format(r.high??r.y)],[e(`low`),s.format(r.low??r.y)],[e(`close`),s.format(r.y)]);return(0,b.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,b.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:o.format(t.x)}),n.map(([e,t])=>(0,b.jsxs)(`span`,{style:{display:`contents`},children:[(0,b.jsx)(`span`,{children:e}),(0,b.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},height:340,ariaLabel:e(`intradayAria`)})}var y,b,x,S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{y=t(),i(),m(),b=n(),x=6e4,S=Date.UTC(2026,9,29,13,30),C=S+150*x,w=ie(23),T=[],E=[],D=212,O=0,k=0;for(let e=0;e<78;e++){let t=S+e*5*x,n=t===C?-.025:0,r=D,i=r*(1+(w()+w()-1)*.004+n),a=Math.max(r,i)*(1+w()*.002),o=Math.min(r,i)*(1-w()*.002),s=1+3*Math.exp(-e/6)+2*Math.exp((e-77)/6)+(t>=C&&t<C+30*x?3:0);O+=s,k+=s*((a+o+i)/3),T.push({x:t,open:r,high:a,low:o,y:i}),E.push([t,k/O]),D=i}})))()}function oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,a]=(0,j.useState)(null),o=(0,j.useMemo)(()=>{let e=oe(50),t=new Float64Array(N),n=new Float64Array(N),r=new Float64Array(N),i=new Float64Array(N),a=new Float64Array(N),o=3200,s=.0012;for(let c=0;c<N;c++){s=Math.min(.004,Math.max(5e-4,s*(1+(e()-.5)*.1)));let l=o,u=l*(1+(e()+e()-1)*s);t[c]=F+c*P,n[c]=l,a[c]=u,r[c]=Math.max(l,u)*(1+e()*s*.6),i[c]=Math.min(l,u)*(1-e()*s*.6),o=u}return[{name:`ETH / USD`,data:{x:t,open:n,high:r,low:i,y:a}}]},[]),s=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}),[n]),c=(0,j.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}),[n]);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,M.jsx)(p,{series:o,xAxis:{type:`time`},yAxis:{format:e=>s.format(e)},renderTooltip:t=>{let n=t.items[0];if(!n||n.open===void 0)return null;let r=[[e(`open`),n.open],[e(`high`),n.high??n.y],[e(`low`),n.low??n.y],[e(`close`),n.y]];return(0,M.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,M.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:c.format(n.x)}),r.map(([e,t])=>(0,M.jsxs)(`span`,{style:{display:`contents`},children:[(0,M.jsx)(`span`,{children:e}),(0,M.jsx)(`span`,{style:{textAlign:`end`},children:s.format(t)})]},e))]})},onRendererChange:a,height:340,ariaLabel:e(`candlesAria`)}),(0,M.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{candles:new Intl.NumberFormat(n).format(N),renderer:i??`…`})})]})}var j,M,N,P,F;function I(){return(I=e((()=>{j=t(),i(),m(),M=n(),N=5e4,P=6e4,F=new Date(2026,4,1).getTime()})))()}function ce(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function le(e,t,n,r){let i=ce(e),a=[],o=n;for(let e=Date.UTC(2026,0,5);a.length<t;e+=z){if(new Date(e).getUTCDay()%6==0)continue;let t=a.length,n=t<50?.004:t<80?-.005:.003,s=o*(1+(i()-.5)*.012);o=s*(1+(i()+i()-1)*.032+n);let c=Math.max(s,o)*(1+i()*.014),l=Math.min(s,o)*(1-i()*.014);a.push({x:r.format(e),open:s,high:c,low:l,y:o})}return a}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),a=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`exceptZero`}),[n]),o=(0,L.useMemo)(()=>{let t=le(7,120,64,new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`}));return[{name:`NOVA`,data:t},{name:e(`ma`,{days:5}),type:`line`,data:B(t,5),curve:`smooth`,lineWidth:1.5,color:`var(--warning-color)`},{name:e(`ma`,{days:20}),type:`line`,data:B(t,20),curve:`smooth`,lineWidth:2,color:`var(--primary-color)`}]},[e,n]);return(0,R.jsx)(p,{series:o,yAxis:{format:e=>i.format(e)},renderTooltip:t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,i.format(r.y)]):n.push([e(`open`),i.format(r.open)],[e(`high`),i.format(r.high??r.y)],[e(`low`),i.format(r.low??r.y)],[e(`close`),i.format(r.y)],[e(`change`),a.format(r.y/r.open-1)]);return(0,R.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,R.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),n.map(([e,t])=>(0,R.jsxs)(`span`,{style:{display:`contents`},children:[(0,R.jsx)(`span`,{children:e}),(0,R.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},height:360,ariaLabel:e(`novaAria`)})}var L,R,z,B;function V(){return(V=e((()=>{L=t(),i(),m(),R=n(),z=864e5,B=(e,t)=>e.map((n,r)=>{if(r<t-1)return[n.x,null];let i=0;for(let n=r-t+1;n<=r;n++)i+=e[n].y;return[n.x,i/t]})})))()}function de(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,H.useRef)(null),a=(0,H.useRef)(null),{candles:o,bars:s}=(0,H.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`});return{candles:[{name:`ORBT`,data:K.map(e=>({x:t.format(e.time),open:e.open,high:e.high,low:e.low,y:e.close}))}],bars:[{name:e(`volume`),data:K.map(e=>({x:t.format(e.time),y:e.volume,color:e.close>=e.open?`var(--success-color)`:`var(--danger-color)`}))}]}},[e,n]),c=(0,H.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),l=(0,H.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),u=t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,c.format(r.y)]):n.push([e(`open`),c.format(r.open)],[e(`high`),c.format(r.high??r.y)],[e(`low`),c.format(r.low??r.y)],[e(`close`),c.format(r.y)]);return(0,U.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,U.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),n.map(([e,t])=>(0,U.jsxs)(`span`,{style:{display:`contents`},children:[(0,U.jsx)(`span`,{children:e}),(0,U.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},[d,f]=(0,H.useState)({prices:0,volumes:0});return(0,H.useEffect)(()=>{let e=i.current?.getInstance(),t=a.current?.getInstance();if(!e||!t)return;let n=()=>{let n=e.getPlotRect(),r=t.getPlotRect();n&&r&&f(e=>{let t=n.x-e.prices,i=r.x-e.volumes,a=Math.max(t,i),o={prices:a-t,volumes:a-i};return o.prices===e.prices&&o.volumes===e.volumes?e:o})},r=[e.on(`layout`,n),t.on(`layout`,n)];return n(),()=>r.forEach(e=>e())},[]),(0,U.jsxs)(`div`,{style:{display:`grid`,gap:0,width:`100%`},children:[(0,U.jsx)(p,{ref:i,series:o,yAxis:{format:e=>c.format(e)},xAxis:{visible:!1},renderTooltip:u,onZoom:e=>a.current?.setView({x:e.x}),legend:!1,padding:{left:4+d.prices},height:260,ariaLabel:e(`pricesAria`)}),(0,U.jsx)(ee,{ref:a,series:s,yAxis:{format:e=>l.format(e),tickCount:2},onZoom:e=>i.current?.setView({x:e.x}),legend:!1,padding:{left:4+d.volumes},height:120,ariaLabel:e(`volumeAria`)})]})}var H,U,W,G,K,q;function J(){return(J=e((()=>{H=t(),i(),m(),U=n(),W=864e5,G=de(19),K=[],q=48;for(let e=Date.UTC(2026,5,1);K.length<90;e+=W){if(new Date(e).getUTCDay()%6==0)continue;let t=q*(1+(G()-.5)*.01),n=(G()+G()-1)*.04,r=t*(1+n),i=Math.max(t,r)*(1+G()*.015),a=Math.min(t,r)*(1-G()*.015),o=Math.round(2e6*(.6+G()*.6+Math.abs(n)*25));K.push({time:e,open:t,high:i,low:a,close:r,volume:o}),q=r}})))()}var Y;function X(){return(X=e((()=>{Y=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  CandlestickChart,
  type ChartHoverEvent,
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

/** Daily candles on trading days (weekends skipped), labelled with \`date\` */
function dailyCandles(
  seed: number,
  count: number,
  price: number,
  date: Intl.DateTimeFormat,
) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 2, 2); candles.length < count; t += DAY) {
    if (new Date(t).getUTCDay() % 6 === 0) continue;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.035 + 0.001);
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    candles.push({ x: date.format(t), open, high, low, y: close });
  }
  return candles;
}

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [convention, setConvention] = useState("green-up");

  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const candles = useMemo(() => {
    // "Mar 3", "3月3日", "3 mars"...
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return dailyCandles(42, 60, 182, date);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: "ACME",
        data: candles,
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

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item || item.open === undefined) return null;
    const rows = [
      [t("open"), item.open],
      [t("high"), item.high ?? item.y],
      [t("low"), item.low ?? item.y],
      [t("close"), item.y],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{usd.format(value)}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("candleColors")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(String(value))}
      >
        <Radio value="green-up" label={t("greenUp")} />
        <Radio value="red-up" label={t("redUp")} />
      </RadioGroup>
      <CandlestickChart
        series={series}
        yAxis={{ format: (value) => usd.format(value) }}
        renderTooltip={tooltip}
        height={320}
        ariaLabel={t("acmeAria")}
      />
    </div>
  );
}
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartAnnotation,
  type ChartHoverEvent,
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

const MINUTE = 60 * 1000;
// one session, 09:30 to 16:00 New York time, written in UTC
const OPEN = Date.UTC(2026, 9, 29, 13, 30);
const NEWS = OPEN + 150 * MINUTE;

// 5-minute candles and the volume-weighted average price (VWAP)
const random = mulberry32(23);
const candles: {
  x: number;
  open: number;
  high: number;
  low: number;
  y: number;
}[] = [];
const vwap: [number, number][] = [];
let price = 212;
let volumeSum = 0;
let valueSum = 0;
for (let i = 0; i < 78; i++) {
  const time = OPEN + i * 5 * MINUTE;
  const shock = time === NEWS ? -0.025 : 0;
  const open = price;
  const close = open * (1 + (random() + random() - 1) * 0.004 + shock);
  const high = Math.max(open, close) * (1 + random() * 0.002);
  const low = Math.min(open, close) * (1 - random() * 0.002);
  // more volume at the open, the close and after the news
  const volume =
    1 +
    3 * Math.exp(-i / 6) +
    2 * Math.exp((i - 77) / 6) +
    (time >= NEWS && time < NEWS + 30 * MINUTE ? 3 : 0);
  volumeSum += volume;
  valueSum += volume * ((high + low + close) / 3);
  candles.push({ x: time, open, high, low, y: close });
  vwap.push([time, valueSum / volumeSum]);
  price = close;
}

export default function IntradayDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: "ORBT", data: candles },
      {
        name: t("vwap"),
        type: "line",
        data: vwap,
        lineWidth: 1.5,
        color: "var(--warning-color)",
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "x",
        value: NEWS,
        dash: [4, 4],
        color: "var(--danger-color)",
        label: t("guidanceCut"),
      },
    ],
    [t],
  );
  // the exchange's local time, in the reader's language
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
      }),
    [locale],
  );
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{time.format(event.x)}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <CandlestickChart
      series={series}
      annotations={annotations}
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ format: (value) => usd.format(value) }}
      renderTooltip={tooltip}
      height={340}
      ariaLabel={t("intradayAria")}
    />
  );
}
`})))()}var pe;function $(){return($=e((()=>{pe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartHoverEvent,
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
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 4, 1).getTime();

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
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
      },
    ];
  }, []);

  const price = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale],
  );
  // OHLC tooltip in the reader's language, with the full date and time
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item || item.open === undefined) return null;
    const rows = [
      [t("open"), item.open],
      [t("high"), item.high ?? item.y],
      [t("low"), item.low ?? item.y],
      [t("close"), item.y],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{time.format(item.x)}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{price.format(value)}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CandlestickChart
        series={series}
        xAxis={{ type: "time" }}
        yAxis={{ format: (value) => price.format(value) }}
        renderTooltip={tooltip}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel={t("candlesAria")}
      />
      <p role="status">
        {t("largeStatus", {
          candles: new Intl.NumberFormat(locale).format(COUNT),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var me;function he(){return(he=e((()=>{me=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartHoverEvent,
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

/** Daily candles on trading days (weekends skipped), labelled with \`date\` */
function dailyCandles(
  seed: number,
  count: number,
  price: number,
  date: Intl.DateTimeFormat,
) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 0, 5); candles.length < count; t += DAY) {
    if (new Date(t).getUTCDay() % 6 === 0) continue;
    // a slow regime change: rally, pullback, recovery
    const day = candles.length;
    const drift = day < 50 ? 0.004 : day < 80 ? -0.005 : 0.003;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.032 + drift);
    const high = Math.max(open, close) * (1 + random() * 0.014);
    const low = Math.min(open, close) * (1 - random() * 0.014);
    candles.push({ x: date.format(t), open, high, low, y: close });
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

export default function MovingAverageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;

  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const change = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );
  const series = useMemo((): ChartSeries[] => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    const candles = dailyCandles(7, 120, 64, date);
    return [
      { name: "NOVA", data: candles },
      {
        name: t("ma", { days: 5 }),
        type: "line",
        data: movingAverage(candles, 5),
        curve: "smooth",
        lineWidth: 1.5,
        color: "var(--warning-color)",
      },
      {
        name: t("ma", { days: 20 }),
        type: "line",
        data: movingAverage(candles, 20),
        curve: "smooth",
        lineWidth: 2,
        color: "var(--primary-color)",
      },
    ];
  }, [t, locale]);

  // OHLC values, the change of the day and the averages
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
          [t("change"), change.format(item.y / item.open - 1)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <CandlestickChart
      series={series}
      yAxis={{ format: (value) => usd.format(value) }}
      renderTooltip={tooltip}
      height={360}
      ariaLabel={t("novaAria")}
    />
  );
}
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  CandlestickChart,
  type ChartHandle,
  type ChartHoverEvent,
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

// 90 trading days of prices and volumes (weekends skipped)
const random = mulberry32(19);
const days: {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}[] = [];
let last = 48;
for (let t = Date.UTC(2026, 5, 1); days.length < 90; t += DAY) {
  if (new Date(t).getUTCDay() % 6 === 0) continue;
  const open = last * (1 + (random() - 0.5) * 0.01);
  const move = (random() + random() - 1) * 0.04;
  const close = open * (1 + move);
  const high = Math.max(open, close) * (1 + random() * 0.015);
  const low = Math.min(open, close) * (1 - random() * 0.015);
  // big moves come with big volumes
  const volume = Math.round(2e6 * (0.6 + random() * 0.6 + Math.abs(move) * 25));
  days.push({ time: t, open, high, low, close, volume });
  last = close;
}

export default function VolumeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const prices = useRef<ChartHandle>(null);
  const volumes = useRef<ChartHandle>(null);

  const { candles, bars } = useMemo(() => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    const candles: ChartSeries[] = [
      {
        name: "ORBT",
        data: days.map((day): ChartPointDatum => ({
          x: date.format(day.time),
          open: day.open,
          high: day.high,
          low: day.low,
          y: day.close,
        })),
      },
    ];
    // each volume bar takes the color of its candle
    const bars: ChartSeries[] = [
      {
        name: t("volume"),
        data: days.map((day) => ({
          x: date.format(day.time),
          y: day.volume,
          color:
            day.close >= day.open
              ? "var(--success-color)"
              : "var(--danger-color)",
        })),
      },
    ];
    return { candles, bars };
  }, [t, locale]);
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  // The tick labels of the two y axes have different widths: pad the narrower
  // one so the plot areas (and the candles over their bars) line up
  const [shift, setShift] = useState({ prices: 0, volumes: 0 });
  useEffect(() => {
    const top = prices.current?.getInstance();
    const bottom = volumes.current?.getInstance();
    if (!top || !bottom) return;
    const align = () => {
      const a = top.getPlotRect();
      const b = bottom.getPlotRect();
      if (!a || !b) return;
      setShift((current) => {
        // where each plot would start without the extra padding
        const naturalTop = a.x - current.prices;
        const naturalBottom = b.x - current.volumes;
        const start = Math.max(naturalTop, naturalBottom);
        const next = {
          prices: start - naturalTop,
          volumes: start - naturalBottom,
        };
        return next.prices === current.prices &&
          next.volumes === current.volumes
          ? current
          : next;
      });
    };
    const offs = [top.on("layout", align), bottom.on("layout", align)];
    align();
    return () => offs.forEach((off) => off());
  }, []);

  return (
    <div style={{ display: "grid", gap: 0, width: "100%" }}>
      <CandlestickChart
        ref={prices}
        series={candles}
        yAxis={{ format: (value) => usd.format(value) }}
        xAxis={{ visible: false }}
        renderTooltip={tooltip}
        // both charts share the same categories: zooming one moves the other
        onZoom={(view) => volumes.current?.setView({ x: view.x })}
        legend={false}
        padding={{ left: 4 + shift.prices }}
        height={260}
        ariaLabel={t("pricesAria")}
      />
      <BarChart
        ref={volumes}
        series={bars}
        yAxis={{ format: (value) => compact.format(value), tickCount: 2 }}
        onZoom={(view) => prices.current?.setView({ x: view.x })}
        legend={false}
        padding={{ left: 4 + shift.volumes }}
        height={120}
        ariaLabel={t("volumeAria")}
      />
    </div>
  );
}
`})))()}var ve,ye,be;function xe(){return(xe=e((()=>{v(),A(),I(),V(),J(),X(),Q(),$(),he(),_e(),t(),u(),f(),ve=n(),ye=l(Object.assign({"./demos/basic.tsx":re,"./demos/intraday.tsx":ae,"./demos/large-data.tsx":se,"./demos/moving-average.tsx":ue,"./demos/volume.tsx":fe}),Object.assign({"./demos/basic.tsx":Y,"./demos/intraday.tsx":Z,"./demos/large-data.tsx":pe,"./demos/moving-average.tsx":me,"./demos/volume.tsx":ge})),be=()=>(0,ve.jsx)(d,{id:`candlestick-chart`,demos:ye})})))()}xe();export{be as default};