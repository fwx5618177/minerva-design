import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{E as a,v as o,w as s}from"./angular-preview-CRBX9cKI.js";import{l as c,n as l,t as u,u as d}from"./DocPage-JhXgs5p-.js";import{m as f,n as p}from"./charts-D2ZjxGuy.js";function m(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function h(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,g.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,maximumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,g.useMemo)(()=>[`weekdays`,`weekends`].map((t,n)=>({name:e(`periods.${t}`),format:i,data:a(v.map((t,r)=>({x:e(`cities.${t}`),values:y(r*10+n,n?31:22+r*3)})))})),[e,i]);return(0,_.jsx)(p,{series:o,yAxis:{title:e(`hours`),zero:!0},height:320,ariaLabel:e(`deliveryAria`)})}var g,_,v,y;function b(){return(b=e((()=>{g=t(),i(),f(),s(),_=n(),v=[`paris`,`lyon`,`marseille`,`lille`],y=(e,t)=>{let n=m(e);return Array.from({length:400},()=>t*(.5+n()+n()**6*1.5))}})))()}function x(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,S.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0});return t=>e.format(t*1e3)},[n]),a=(0,S.useMemo)(()=>[{name:e(`salary`),color:`var(--chart-series-6, #8b5cf6)`,format:i,data:w.map(([t,n,r,i,a,o,s])=>({x:e(`roles.${t}`),low:n,q1:r,y:i,q3:a,high:o,outliers:s}))}],[e,i]);return(0,C.jsx)(p,{series:a,orientation:`horizontal`,yAxis:{format:i},height:300,ariaLabel:e(`salariesAria`)})}var S,C,w;function T(){return(T=e((()=>{S=t(),i(),f(),C=n(),w=[[`junior`,38,42,46,51,58,[66,71]],[`developer`,45,52,58,64,76,[88]],[`senior`,58,66,72,80,95,[110,118]],[`lead`,70,78,86,95,112,[]],[`manager`,72,84,92,104,128,[145]]]})))()}function E(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function D(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,O.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0});return t=>e.format(t)},[n]),a=(0,O.useMemo)(()=>A.map(([t],n)=>({x:e(`services.${t}`),values:j[n]??[]})),[e]);return(0,k.jsx)(p,{groups:a,name:e(`responseTime`),yAxis:{format:i},tooltip:{labels:{max:e(`stats.max`),q3:e(`stats.q3`),median:e(`stats.median`),q1:e(`stats.q1`),min:e(`stats.min`),outliers:e(`stats.outliers`)}},height:340,ariaLabel:e(`servicesAria`)})}var O,k,A,j;function M(){return(M=e((()=>{O=t(),i(),f(),k=n(),A=[[`gateway`,18,.35],[`auth`,32,.3],[`search`,95,.45],[`checkout`,140,.38],[`recommendations`,210,.5],[`images`,60,.6]],j=A.map(([,e,t],n)=>{let r=E(100+n);return Float64Array.from({length:2e3},()=>{let n=Math.sqrt(-2*Math.log(r()||1e-12))*Math.cos(2*Math.PI*r());return e*Math.exp(t*n)})})})))()}function N(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function P(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,F.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),a=(0,F.useMemo)(()=>{let t=Array.from({length:12},(e,t)=>new Intl.DateTimeFormat(n,{month:`short`}).format(new Date(2026,t,1))),r=L.map(e=>o(e,{whisker:`minmax`}));return[{name:e(`dailyHigh`),color:`var(--chart-series-4, #ef4444)`,format:i,data:r.map((e,n)=>({x:t[n],low:e.low,q1:e.q1,y:e.median,q3:e.q3,high:e.high}))},{name:e(`mean`),type:`line`,curve:`smooth`,color:`var(--text-secondary-color, #6b7280)`,lineWidth:1.5,format:i,data:r.map((e,n)=>[t[n]??``,e.mean])}]},[e,n,i]);return(0,I.jsx)(p,{series:a,yAxis:{format:i},height:320,ariaLabel:e(`temperaturesAria`)})}var F,I,L;function R(){return(R=e((()=>{F=t(),i(),f(),s(),I=n(),L=Array.from({length:12},(e,t)=>{let n=N(t+1),r=13-9*Math.cos((t+.5)/12*Math.PI*2);return Array.from({length:900},()=>r+(n()+n()+n()-1.5)*6)})})))()}var z;function B(){return(B=e((()=>{z=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  boxplotData,
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

// Delivery times (hours) per city, on weekdays and on weekends
const cities = ["paris", "lyon", "marseille", "lille"] as const;
const sample = (seed: number, mean: number) => {
  const random = mulberry32(seed);
  return Array.from(
    { length: 400 },
    () => mean * (0.5 + random() + random() ** 6 * 1.5),
  );
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const hours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // boxplotData turns raw samples into box plot data: one series per period
  const series = useMemo(
    (): ChartSeries[] =>
      (["weekdays", "weekends"] as const).map((period, p) => ({
        name: t(\`periods.\${period}\`),
        format: hours,
        data: boxplotData(
          cities.map((city, c) => ({
            x: t(\`cities.\${city}\`),
            values: sample(c * 10 + p, p ? 31 : 22 + c * 3),
          })),
        ),
      })),
    [t, hours],
  );

  return (
    <BoxPlotChart
      series={series}
      yAxis={{ title: t("hours"), zero: true }}
      height={320}
      ariaLabel={t("deliveryAria")}
    />
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart, type ChartSeries } from "minerva-design/charts";

// Yearly salaries (k€) per role, from a public salary survey: the summary
// statistics are already computed, one datum per box
const roles = [
  ["junior", 38, 42, 46, 51, 58, [66, 71]],
  ["developer", 45, 52, 58, 64, 76, [88]],
  ["senior", 58, 66, 72, 80, 95, [110, 118]],
  ["lead", 70, 78, 86, 95, 112, []],
  ["manager", 72, 84, 92, 104, 128, [145]],
] as const;

export default function HorizontalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("salary"),
        color: "var(--chart-series-6, #8b5cf6)",
        format: euros,
        data: roles.map(([key, low, q1, median, q3, high, outliers]) => ({
          x: t(\`roles.\${key}\`),
          low,
          q1,
          y: median,
          q3,
          high,
          outliers,
        })),
      },
    ],
    [t, euros],
  );

  // orientation="horizontal": one row per role, the values along the bottom
  return (
    <BoxPlotChart
      series={series}
      orientation="horizontal"
      yAxis={{ format: euros }}
      height={300}
      ariaLabel={t("salariesAria")}
    />
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart, type BoxplotGroup } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 2,000 response times (ms) of each service over the last hour
const services = [
  ["gateway", 18, 0.35],
  ["auth", 32, 0.3],
  ["search", 95, 0.45],
  ["checkout", 140, 0.38],
  ["recommendations", 210, 0.5],
  ["images", 60, 0.6],
] as const;
const samples = services.map(([, median, spread], s) => {
  const random = mulberry32(100 + s);
  return Float64Array.from({ length: 2000 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function ServicesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
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

  // raw samples: the quartiles, whiskers (1.5 IQR) and outliers are computed
  const groups = useMemo(
    (): BoxplotGroup[] =>
      services.map(([key], i) => ({
        x: t(\`services.\${key}\`),
        values: samples[i] ?? [],
      })),
    [t],
  );

  return (
    <BoxPlotChart
      groups={groups}
      name={t("responseTime")}
      yAxis={{ format: ms }}
      tooltip={{
        labels: {
          max: t("stats.max"),
          q3: t("stats.q3"),
          median: t("stats.median"),
          q1: t("stats.q1"),
          min: t("stats.min"),
          outliers: t("stats.outliers"),
        },
      }}
      height={340}
      ariaLabel={t("servicesAria")}
    />
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  boxplotStats,
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

// 30 years of daily maximum temperatures (°C) per month
const months = Array.from({ length: 12 }, (_, m) => {
  const random = mulberry32(m + 1);
  const normal = 13 - 9 * Math.cos(((m + 0.5) / 12) * Math.PI * 2);
  return Array.from(
    { length: 900 },
    () => normal + (random() + random() + random() - 1.5) * 6,
  );
});

export default function TemperaturesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
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

  // boxplotStats gives the five numbers and the mean: the whiskers reach the
  // extremes ("minmax", no outliers) and a line joins the means
  const series = useMemo((): ChartSeries[] => {
    const names = Array.from({ length: 12 }, (_, m) =>
      new Intl.DateTimeFormat(locale, { month: "short" }).format(
        new Date(2026, m, 1),
      ),
    );
    const stats = months.map((values) =>
      boxplotStats(values, { whisker: "minmax" }),
    );
    return [
      {
        name: t("dailyHigh"),
        color: "var(--chart-series-4, #ef4444)",
        format: celsius,
        data: stats.map((s, m) => ({
          x: names[m],
          low: s.low,
          q1: s.q1,
          y: s.median,
          q3: s.q3,
          high: s.high,
        })),
      },
      {
        name: t("mean"),
        type: "line",
        curve: "smooth",
        color: "var(--text-secondary-color, #6b7280)",
        lineWidth: 1.5,
        format: celsius,
        data: stats.map((s, m) => [names[m] ?? "", s.mean] as const),
      },
    ];
  }, [t, locale, celsius]);

  return (
    <BoxPlotChart
      series={series}
      yAxis={{ format: celsius }}
      height={320}
      ariaLabel={t("temperaturesAria")}
    />
  );
}
`})))()}var q,J,Y;function X(){return(X=e((()=>{b(),T(),M(),R(),B(),H(),W(),K(),t(),l(),d(),q=n(),J=c(Object.assign({"./demos/grouped.tsx":h,"./demos/horizontal.tsx":x,"./demos/services.tsx":D,"./demos/temperatures.tsx":P}),Object.assign({"./demos/grouped.tsx":z,"./demos/horizontal.tsx":V,"./demos/services.tsx":U,"./demos/temperatures.tsx":G})),Y=()=>(0,q.jsx)(u,{id:`boxplot-chart`,demos:J})})))()}X();export{Y as default};