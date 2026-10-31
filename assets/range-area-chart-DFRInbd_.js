import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{l as a,n as o,t as s,u as c}from"./DocPage-BbPSunu1.js";import{_ as l,m as u}from"./charts-D1JmjIcg.js";function d(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,f.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0});return t=>e.format(t)},[n]),a=(0,f.useMemo)(()=>[{name:e(`p5p95`),color:`var(--chart-series-5, #0ea5e9)`,opacity:.16,lineWidth:0,format:i,data:m.map(e=>({x:e.x,y0:e.p5,y:e.p95}))},{name:e(`p25p75`),color:`var(--chart-series-5, #0ea5e9)`,opacity:.32,lineWidth:0,format:i,data:m.map(e=>({x:e.x,y0:e.p25,y:e.p75}))},{name:e(`median`),type:`line`,color:`var(--chart-series-5, #0ea5e9)`,format:i,data:m.map(e=>[e.x,e.p50])}],[e,i]);return(0,p.jsx)(l,{series:a,yAxis:{format:i,zero:!0},height:300,ariaLabel:e(`latencyAria`)})}var f,p,m;function h(){return(h=e((()=>{f=t(),i(),u(),p=n(),m=Array.from({length:144},(e,t)=>{let n=t/6,r=Math.exp(-((n-11)**2)/8)+.7*Math.exp(-((n-19)**2)/5),i=42+30*r+2*Math.sin(t/2.3);return{x:new Date(2026,2,12,0,t*10),p5:i*.55,p25:i*.8,p50:i,p75:i*(1.3+.2*r),p95:i*(2+1.4*r)}})})))()}function g(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>{let t=y.length-1,n=Array.from({length:13},(e,n)=>{let r=t+n;return{i:r,mean:n===0?y[t]??0:(y[r-12]??0)*1.12,sd:2.4*Math.sqrt(n)}});return[{name:e(`interval95`),color:`var(--chart-series-1, #4f46e5)`,opacity:.14,lineWidth:0,data:n.map(e=>({x:b(e.i),y0:e.mean-1.96*e.sd,y:e.mean+1.96*e.sd}))},{name:e(`interval80`),color:`var(--chart-series-1, #4f46e5)`,opacity:.22,lineWidth:0,data:n.map(e=>({x:b(e.i),y0:e.mean-1.28*e.sd,y:e.mean+1.28*e.sd}))},{name:e(`actual`),type:`line`,color:`var(--text-color, #1f2937)`,data:y.map((e,t)=>[b(t),e])},{name:e(`forecast`),type:`line`,color:`var(--chart-series-1, #4f46e5)`,data:n.map(e=>[b(e.i),e.mean])}]},[e]),a=(0,_.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(Math.round(t)*1e3)},[n]);return(0,v.jsx)(l,{series:i,curve:`linear`,yAxis:{format:a,title:e(`orders`)},annotations:[{type:`line`,axis:`x`,value:b(y.length-1).getTime(),label:e(`today`)}],height:320,ariaLabel:e(`forecastAria`)})}var _,v,y,b;function x(){return(x=e((()=>{_=t(),i(),u(),v=n(),y=[41,39,44,47,52,55,53,51,56,60,68,74,49,46,52,55,61,64,62,60,66,71,79,86],b=e=>new Date(2024,e,1)})))()}function S(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function C(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,w.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`});return t=>e.format(t)},[n]),a=(0,w.useMemo)(()=>[{name:e(`dayRange`),color:`var(--chart-series-2, #10b981)`,lineWidth:0,opacity:.3,format:i,data:E.map(e=>({x:e.x,y0:e.low,y:e.high}))},{name:e(`close`),type:`line`,color:`var(--chart-series-2, #10b981)`,format:i,data:E.map(e=>[e.x,e.close])}],[e,i]);return(0,T.jsx)(l,{series:a,curve:`linear`,yAxis:{format:i},height:300,ariaLabel:e(`priceAria`)})}var w,T,E;function D(){return(D=e((()=>{w=t(),i(),u(),T=n(),E=(()=>{let e=S(42),t=[],n=182;for(let r=0;t.length<126;r++){let i=new Date(2026,0,2+r);if(i.getDay()===0||i.getDay()===6)continue;let a=n;n=Math.max(120,a*(1+(e()-.48)*.035));let o=Math.max(a,n)*(1+e()*.012),s=Math.min(a,n)*(1-e()*.012);t.push({x:i,low:s,high:o,close:n})}return t})()})))()}function O(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function k(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,A.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),a=(0,A.useMemo)(()=>[{name:e(`dailyRange`),color:`var(--chart-series-4, #ef4444)`,lineWidth:0,opacity:.45,format:i,data:M.map(e=>({x:e.x,y0:e.low,y:e.high}))},{name:e(`normal`),type:`line`,curve:`smooth`,color:`var(--text-secondary-color, #6b7280)`,lineWidth:1.5,format:i,data:M.map(e=>[e.x,e.normal])}],[e,i]);return(0,j.jsx)(l,{series:a,curve:`linear`,yAxis:{format:i},height:300,ariaLabel:e(`temperatureAria`)})}var A,j,M;function N(){return(N=e((()=>{A=t(),i(),u(),j=n(),M=(()=>{let e=O(7);return Array.from({length:365},(t,n)=>{let r=-Math.cos((n-18)/365*Math.PI*2),i=(e()-.5)*6,a=11.5+r*8.5+i,o=6+r*2.5+e()*3;return{x:new Date(2025,0,n+1),low:a-o/2,high:a+o/2,normal:11.5+r*8.5}})})()})))()}var P;function F(){return(F=e((()=>{P=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Percentiles of the response time of an API (ms) every 10 minutes over a
// day: busy hours widen the distribution
const points = Array.from({ length: 144 }, (_, i) => {
  const hour = i / 6;
  const load =
    Math.exp(-((hour - 11) ** 2) / 8) + 0.7 * Math.exp(-((hour - 19) ** 2) / 5);
  const p50 = 42 + 30 * load + 2 * Math.sin(i / 2.3);
  return {
    x: new Date(2026, 2, 12, 0, i * 10),
    p5: p50 * 0.55,
    p25: p50 * 0.8,
    p50,
    p75: p50 * (1.3 + 0.2 * load),
    p95: p50 * (2 + 1.4 * load),
  };
});

export default function FanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // nested bands: the outer one first, the median line on top
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("p5p95"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.16,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p5, y: p.p95 })),
      },
      {
        name: t("p25p75"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.32,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p25, y: p.p75 })),
      },
      {
        name: t("median"),
        type: "line",
        color: "var(--chart-series-5, #0ea5e9)",
        format: ms,
        data: points.map((p) => [p.x, p.p50] as const),
      },
    ],
    [t, ms],
  );

  return (
    <RangeAreaChart
      series={series}
      yAxis={{ format: ms, zero: true }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly orders (thousands): two years of history, then a 12-month
// forecast whose uncertainty widens with the horizon
const history = [
  41, 39, 44, 47, 52, 55, 53, 51, 56, 60, 68, 74, 49, 46, 52, 55, 61, 64, 62,
  60, 66, 71, 79, 86,
];
const month = (i: number) => new Date(2024, i, 1);

export default function ForecastDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const last = history.length - 1;
    const forecast = Array.from({ length: 13 }, (_, k) => {
      const i = last + k;
      // the same month of last year, plus 12% of growth
      const mean =
        k === 0 ? (history[last] ?? 0) : (history[i - 12] ?? 0) * 1.12;
      // standard error growing like √horizon
      const sd = 2.4 * Math.sqrt(k);
      return { i, mean, sd };
    });
    return [
      {
        name: t("interval95"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.14,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.96 * f.sd,
          y: f.mean + 1.96 * f.sd,
        })),
      },
      {
        name: t("interval80"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.22,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.28 * f.sd,
          y: f.mean + 1.28 * f.sd,
        })),
      },
      {
        name: t("actual"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        data: history.map((y, i) => [month(i), y] as const),
      },
      {
        name: t("forecast"),
        type: "line",
        color: "var(--chart-series-1, #4f46e5)",
        data: forecast.map((f) => [month(f.i), f.mean] as const),
      },
    ];
  }, [t]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(Math.round(value) * 1000);
  }, [locale]);

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: thousands, title: t("orders") }}
      annotations={[
        {
          type: "line",
          axis: "x",
          value: month(history.length - 1).getTime(),
          label: t("today"),
        },
      ]}
      height={320}
      ariaLabel={t("forecastAria")}
    />
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Six months of daily trading: the low-high range of each day and the close
const days = (() => {
  const random = mulberry32(42);
  const out: { x: Date; low: number; high: number; close: number }[] = [];
  let close = 182;
  for (let d = 0; out.length < 126; d++) {
    const date = new Date(2026, 0, 2 + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const open = close;
    close = Math.max(120, open * (1 + (random() - 0.48) * 0.035));
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    out.push({ x: date, low, high, close });
  }
  return out;
})();

export default function PriceRangeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dayRange"),
        color: "var(--chart-series-2, #10b981)",
        lineWidth: 0,
        opacity: 0.3,
        format: usd,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("close"),
        type: "line",
        color: "var(--chart-series-2, #10b981)",
        format: usd,
        data: days.map((d) => [d.x, d.close] as const),
      },
    ],
    [t, usd],
  );

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: usd }}
      height={300}
      ariaLabel={t("priceAria")}
    />
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A year of daily minimum and maximum temperatures (°C) of a temperate city
const days = (() => {
  const random = mulberry32(7);
  return Array.from({ length: 365 }, (_, d) => {
    const season = -Math.cos(((d - 18) / 365) * Math.PI * 2);
    const weather = (random() - 0.5) * 6;
    const mean = 11.5 + season * 8.5 + weather;
    const spread = 6 + season * 2.5 + random() * 3;
    return {
      x: new Date(2025, 0, d + 1),
      low: mean - spread / 2,
      high: mean + spread / 2,
      normal: 11.5 + season * 8.5,
    };
  });
})();

export default function TemperatureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dailyRange"),
        color: "var(--chart-series-4, #ef4444)",
        // many narrow days: a filled band without edges reads better
        lineWidth: 0,
        opacity: 0.45,
        format: celsius,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("normal"),
        type: "line",
        curve: "smooth",
        color: "var(--text-secondary-color, #6b7280)",
        lineWidth: 1.5,
        format: celsius,
        data: days.map((d) => [d.x, d.normal] as const),
      },
    ],
    [t, celsius],
  );

  // zoom with Ctrl / ⌘ + wheel to read single days
  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: celsius }}
      height={300}
      ariaLabel={t("temperatureAria")}
    />
  );
}
`})))()}var H,U,W;function G(){return(G=e((()=>{h(),x(),D(),N(),F(),L(),z(),V(),t(),o(),c(),H=n(),U=a(Object.assign({"./demos/fan.tsx":d,"./demos/forecast.tsx":g,"./demos/price-range.tsx":C,"./demos/temperature.tsx":k}),Object.assign({"./demos/fan.tsx":P,"./demos/forecast.tsx":I,"./demos/price-range.tsx":R,"./demos/temperature.tsx":B})),W=()=>(0,H.jsx)(s,{id:`range-area-chart`,demos:U})})))()}G();export{W as default};