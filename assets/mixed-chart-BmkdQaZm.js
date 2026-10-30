import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BzoVi22c.js";import{l as a,n as o,t as s,u as c}from"./DocPage-B2iACtLP.js";import{c as l,m as u}from"./charts-eaEG_eJd.js";function d(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,f.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`});return t=>e.format(t)},[n]),a=(0,f.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,f.useMemo)(()=>{let t=Array.from({length:12},(e,t)=>new Intl.DateTimeFormat(n,{month:`short`}).format(new Date(2026,t,1)));return[{name:e(`rainfall`),type:`bar`,color:`var(--chart-series-5, #0ea5e9)`,format:i,data:t.map((e,t)=>[e,m[t]??0])},{name:e(`temperature`),type:`line`,curve:`smooth`,yAxis:`right`,color:`var(--chart-series-4, #ef4444)`,data:t.map((e,t)=>[e,h[t]??0])}]},[e,n,i]);return(0,p.jsx)(l,{series:o,yAxis:{format:i},yAxis2:{format:a,zero:!0},height:300,ariaLabel:e(`climateAria`)})}var f,p,m,h;function g(){return(g=e((()=>{f=t(),i(),u(),p=n(),m=[52,56,118,125,138,168,154,168,210,198,93,51],h=[5.4,6.1,9.4,14.3,18.8,21.9,25.7,26.9,23.3,18,12.5,7.7]})))()}function ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t)},[n]),a=(0,_.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,_.useMemo)(()=>[{name:e(`sessions`),type:`area`,curve:`smooth`,data:y.map(e=>[e.x,e.sessions])},{name:e(`conversionRate`),type:`line`,yAxis:`right`,color:`var(--chart-series-2, #10b981)`,data:y.map(e=>[e.x,e.rate])}],[e]);return(0,v.jsx)(l,{series:o,yAxis:{format:i},yAxis2:{format:a,zero:!0},annotations:[{type:`rect`,x0:new Date(2026,4,1).getTime(),x1:new Date(2026,4,8).getTime(),label:e(`campaign`),color:`var(--warning-color, #f59e0b)`}],height:320,ariaLabel:e(`conversionAria`)})}var _,v,y;function b(){return(b=e((()=>{_=t(),i(),u(),v=n(),y=Array.from({length:61},(e,t)=>{let n=[0,6].includes(new Date(2026,3,1+t).getDay()),r=+(t>=30&&t<37);return{x:new Date(2026,3,1+t),sessions:Math.round((n?21e3:15500)*(1+t/400)*(1+r*.6)),rate:(n?.031:.024)+r*.009+Math.sin(t*1.7)*.0015}})})))()}function x(){let{t:e}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),t=(0,S.useMemo)(()=>[{name:e(`pageViews`),type:`bar`,data:E.map(e=>({x:e.x,y:e.views}))},{name:e(`conversionRate`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2,data:E.map(e=>({x:e.x,y:e.rate}))}],[e]);return(0,C.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16,width:`100%`},children:D.map(({locale:n,key:r})=>(0,C.jsxs)(`figure`,{style:{margin:0,minWidth:0},children:[(0,C.jsx)(`figcaption`,{style:{marginBottom:4,fontSize:13,color:`var(--text-secondary-color)`},children:e(`locales.${r}`)}),(0,C.jsx)(l,{locale:n,series:t,xAxis:{type:`time`},yAxis2:{zero:!0},legend:{position:`bottom`},height:280,ariaLabel:e(`localeAria`,{locale:e(`locales.${r}`)})})]},n))})}var S,C,w,T,E,D;function O(){return(O=e((()=>{S=t(),i(),u(),C=n(),w=864e5,T=new Date(2026,0,1).getTime(),E=Array.from({length:90},(e,t)=>{let n=Math.sin(t/7*Math.PI*2)*.12,r=1+t/120;return{x:T+t*w,views:Math.round(186e3*r*(1+n)+t*7919%21e3),rate:Number((2.4+Math.sin(t/11)*.45+t*31%7/25).toFixed(2))}}),D=[{locale:`zh-CN`,key:`chinese`},{locale:`fr-FR`,key:`french`}]})))()}function k(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,A.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`});return t=>e.format(t/100)},[n]),a=(0,A.useMemo)(()=>{let t=M.reduce((e,[,t])=>e+t,0),n=M.map((e,n)=>M.slice(0,n+1).reduce((e,[,t])=>e+t,0)/t*100);return[{name:e(`returns`),type:`bar`,color:`var(--primary-color, #4f46e5)`,data:M.map(([t,r],i)=>({x:e(`causes.${t}`),y:r,color:(n[i-1]??0)<80?`var(--primary-color, #4f46e5)`:`var(--border-color, #cbd5e1)`}))},{name:e(`cumulative`),type:`line`,yAxis:`right`,color:`var(--chart-series-4, #ef4444)`,format:i,data:M.map(([t],r)=>[e(`causes.${t}`),n[r]??0])}]},[e,i]);return(0,j.jsx)(l,{series:a,yAxis2:{min:0,max:100,nice:!1,format:i},height:320,ariaLabel:e(`paretoAria`)})}var A,j,M;function N(){return(N=e((()=>{A=t(),i(),u(),j=n(),M=[[`wrongSize`,412],[`damaged`,236],[`notAsDescribed`,151],[`late`,88],[`changedMind`,61],[`wrongItem`,37],[`other`,23]]})))()}function P(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,F.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,F.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,F.useMemo)(()=>{let t=L.map((t,n)=>e(`quarter`,{n:n%4+1,year:2025+Math.floor(n/4)}));return[{name:e(`revenue`),type:`bar`,format:i,data:t.map((e,t)=>[e,L[t]??0])},{name:e(`growth`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2.5,data:t.map((e,t)=>[e,R[t]??null])}]},[e,i]);return(0,I.jsx)(l,{series:o,yAxis:{format:i,title:e(`revenue`)},yAxis2:{format:a,title:e(`growth`)},height:320,ariaLabel:e(`revenueAria`)})}var F,I,L,R;function z(){return(z=e((()=>{F=t(),i(),u(),I=n(),L=[18.2,19.5,21.1,26.8,21.4,23.9,25.2,31.6],R=L.map((e,t)=>t>=4?e/(L[t-4]??e)-1:null)})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Climate of Tokyo: average rainfall (mm) and temperature (°C) per month
const rainfall = [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51];
const temperature = [
  5.4, 6.1, 9.4, 14.3, 18.8, 21.9, 25.7, 26.9, 23.3, 18.0, 12.5, 7.7,
];

export default function ClimateDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const mm = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millimeter",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const months = Array.from({ length: 12 }, (_, m) =>
      new Intl.DateTimeFormat(locale, { month: "short" }).format(
        new Date(2026, m, 1),
      ),
    );
    return [
      {
        name: t("rainfall"),
        type: "bar",
        color: "var(--chart-series-5, #0ea5e9)",
        format: mm,
        data: months.map((m, i) => [m, rainfall[i] ?? 0] as const),
      },
      {
        name: t("temperature"),
        type: "line",
        curve: "smooth",
        yAxis: "right",
        color: "var(--chart-series-4, #ef4444)",
        data: months.map((m, i) => [m, temperature[i] ?? 0] as const),
      },
    ];
  }, [t, locale, mm]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: mm }}
      yAxis2={{ format: celsius, zero: true }}
      height={300}
      ariaLabel={t("climateAria")}
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Daily sessions of an online shop over two months, and the share of them
// ending with an order: the weekly rhythm and a campaign in the middle
const days = Array.from({ length: 61 }, (_, d) => {
  const weekend = [0, 6].includes(new Date(2026, 3, 1 + d).getDay());
  const campaign = d >= 30 && d < 37 ? 1 : 0;
  return {
    x: new Date(2026, 3, 1 + d),
    sessions: Math.round(
      (weekend ? 21000 : 15500) * (1 + d / 400) * (1 + campaign * 0.6),
    ),
    rate:
      (weekend ? 0.031 : 0.024) + campaign * 0.009 + Math.sin(d * 1.7) * 0.0015,
  };
});

export default function ConversionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("sessions"),
        type: "area",
        curve: "smooth",
        data: days.map((d) => [d.x, d.sessions] as const),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-2, #10b981)",
        data: days.map((d) => [d.x, d.rate] as const),
      },
    ],
    [t],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: compact }}
      yAxis2={{ format: percent, zero: true }}
      annotations={[
        {
          type: "rect",
          x0: new Date(2026, 4, 1).getTime(),
          x1: new Date(2026, 4, 8).getTime(),
          label: t("campaign"),
          color: "var(--warning-color, #f59e0b)",
        },
      ]}
      height={320}
      ariaLabel={t("conversionAria")}
    />
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// 90 days of page views (hundreds of thousands) and the conversion rate (%)
const DAY = 86_400_000;
const start = new Date(2026, 0, 1).getTime();
const days = Array.from({ length: 90 }, (_, i) => {
  const weekly = Math.sin((i / 7) * Math.PI * 2) * 0.12;
  const trend = 1 + i / 120;
  return {
    x: start + i * DAY,
    views: Math.round(186_000 * trend * (1 + weekly) + ((i * 7919) % 21_000)),
    rate: Number(
      (2.4 + Math.sin(i / 11) * 0.45 + ((i * 31) % 7) / 25).toFixed(2),
    ),
  };
});

// The same chart in two locales: compact units (万 / k), separators and dates
const LOCALES = [
  { locale: "zh-CN", key: "chinese" },
  { locale: "fr-FR", key: "french" },
] as const;

export default function LocaleDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("pageViews"),
        type: "bar",
        data: days.map((d) => ({ x: d.x, y: d.views })),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2,
        data: days.map((d) => ({ x: d.x, y: d.rate })),
      },
    ],
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {LOCALES.map(({ locale, key }) => (
        <figure key={locale} style={{ margin: 0, minWidth: 0 }}>
          <figcaption
            style={{
              marginBottom: 4,
              fontSize: 13,
              color: "var(--text-secondary-color)",
            }}
          >
            {t(\`locales.\${key}\`)}
          </figcaption>
          <MixedChart
            locale={locale}
            series={series}
            xAxis={{ type: "time" }}
            yAxis2={{ zero: true }}
            legend={{ position: "bottom" }}
            height={280}
            ariaLabel={t("localeAria", { locale: t(\`locales.\${key}\`) })}
          />
        </figure>
      ))}
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Returns of the last quarter by cause: a Pareto chart sorts the causes and
// adds their cumulative share, the few causes behind 80% stand out
const causes = [
  ["wrongSize", 412],
  ["damaged", 236],
  ["notAsDescribed", 151],
  ["late", 88],
  ["changedMind", 61],
  ["wrongItem", 37],
  ["other", 23],
] as const;

export default function ParetoDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { style: "percent" });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const total = causes.reduce((sum, [, n]) => sum + n, 0);
    const cumulative = causes.map(
      (_, i) =>
        (causes.slice(0, i + 1).reduce((sum, [, n]) => sum + n, 0) / total) *
        100,
    );
    return [
      {
        name: t("returns"),
        type: "bar",
        color: "var(--primary-color, #4f46e5)",
        data: causes.map(([key, n], i) => ({
          x: t(\`causes.\${key}\`),
          y: n,
          // the vital few: the causes reaching 80% together
          color:
            (cumulative[i - 1] ?? 0) < 80
              ? "var(--primary-color, #4f46e5)"
              : "var(--border-color, #cbd5e1)",
        })),
      },
      {
        name: t("cumulative"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-4, #ef4444)",
        format: percent,
        data: causes.map(
          ([key], i) => [t(\`causes.\${key}\`), cumulative[i] ?? 0] as const,
        ),
      },
    ];
  }, [t, percent]);

  return (
    <MixedChart
      series={series}
      yAxis2={{ min: 0, max: 100, nice: false, format: percent }}
      height={320}
      ariaLabel={t("paretoAria")}
    />
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Quarterly revenue (M$) and its growth over the same quarter of last year
const revenue = [18.2, 19.5, 21.1, 26.8, 21.4, 23.9, 25.2, 31.6];
const growth = revenue.map((value, i) =>
  i >= 4 ? value / (revenue[i - 4] ?? value) - 1 : null,
);

export default function RevenueGrowthDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const quarters = revenue.map((_, i) =>
      t("quarter", { n: (i % 4) + 1, year: 2025 + Math.floor(i / 4) }),
    );
    return [
      {
        name: t("revenue"),
        type: "bar",
        format: usd,
        data: quarters.map((q, i) => [q, revenue[i] ?? 0] as const),
      },
      {
        name: t("growth"),
        type: "line",
        // plotted against yAxis2, formatted with its own format
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        data: quarters.map((q, i) => [q, growth[i] ?? null] as const),
      },
    ];
  }, [t, usd]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("revenue") }}
      yAxis2={{ format: percent, title: t("growth") }}
      height={320}
      ariaLabel={t("revenueAria")}
    />
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{g(),b(),O(),N(),z(),V(),U(),G(),q(),Y(),t(),o(),c(),X=n(),Z=a(Object.assign({"./demos/climate.tsx":d,"./demos/conversion.tsx":ee,"./demos/locale.tsx":x,"./demos/pareto.tsx":k,"./demos/revenue-growth.tsx":P}),Object.assign({"./demos/climate.tsx":B,"./demos/conversion.tsx":H,"./demos/locale.tsx":W,"./demos/pareto.tsx":K,"./demos/revenue-growth.tsx":J})),Q=()=>(0,X.jsx)(s,{id:`mixed-chart`,demos:Z})})))()}$();export{Q as default};