import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CsvLrYUR.js";import{l as a,n as o,t as s,u as ee}from"./DocPage-CmQtD5jg.js";import{c,m as l}from"./charts-BgGG_T8i.js";function te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,u.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`});return t=>e.format(t)},[n]),a=(0,u.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,u.useMemo)(()=>{let t=Array.from({length:12},(e,t)=>new Intl.DateTimeFormat(n,{month:`short`}).format(new Date(2026,t,1)));return[{name:e(`rainfall`),type:`bar`,color:`var(--chart-series-5, #0ea5e9)`,format:i,data:t.map((e,t)=>[e,f[t]??0])},{name:e(`temperature`),type:`line`,curve:`smooth`,yAxis:`right`,color:`var(--chart-series-4, #ef4444)`,data:t.map((e,t)=>[e,p[t]??0])}]},[e,n,i]);return(0,d.jsx)(c,{series:o,yAxis:{format:i},yAxis2:{format:a,zero:!0},height:300,ariaLabel:e(`climateAria`)})}var u,d,f,p;function m(){return(m=e((()=>{u=t(),i(),l(),d=n(),f=[52,56,118,125,138,168,154,168,210,198,93,51],p=[5.4,6.1,9.4,14.3,18.8,21.9,25.7,26.9,23.3,18,12.5,7.7]})))()}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,h.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t)},[n]),a=(0,h.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,h.useMemo)(()=>[{name:e(`sessions`),type:`area`,curve:`smooth`,data:_.map(e=>[e.x,e.sessions])},{name:e(`conversionRate`),type:`line`,yAxis:`right`,color:`var(--chart-series-2, #10b981)`,data:_.map(e=>[e.x,e.rate])}],[e]);return(0,g.jsx)(c,{series:o,yAxis:{format:i},yAxis2:{format:a,zero:!0},annotations:[{type:`rect`,x0:new Date(2026,4,1).getTime(),x1:new Date(2026,4,8).getTime(),label:e(`campaign`),color:`var(--warning-color, #f59e0b)`}],height:320,ariaLabel:e(`conversionAria`)})}var h,g,_;function v(){return(v=e((()=>{h=t(),i(),l(),g=n(),_=Array.from({length:61},(e,t)=>{let n=[0,6].includes(new Date(2026,3,1+t).getDay()),r=+(t>=30&&t<37);return{x:new Date(2026,3,1+t),sessions:Math.round((n?21e3:15500)*(1+t/400)*(1+r*.6)),rate:(n?.031:.024)+r*.009+Math.sin(t*1.7)*.0015}})})))()}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),t=(0,y.useMemo)(()=>[{name:e(`pageViews`),type:`bar`,data:C.map(e=>({x:e.x,y:e.views}))},{name:e(`conversionRate`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2,data:C.map(e=>({x:e.x,y:e.rate}))}],[e]);return(0,b.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16,width:`100%`},children:w.map(({locale:n,key:r})=>(0,b.jsxs)(`figure`,{style:{margin:0,minWidth:0},children:[(0,b.jsx)(`figcaption`,{style:{marginBottom:4,fontSize:13,color:`var(--text-secondary-color)`},children:e(`locales.${r}`)}),(0,b.jsx)(c,{locale:n,series:t,xAxis:{type:`time`},yAxis2:{zero:!0},legend:{position:`bottom`},height:280,ariaLabel:e(`localeAria`,{locale:e(`locales.${r}`)})})]},n))})}var y,b,x,S,C,w;function T(){return(T=e((()=>{y=t(),i(),l(),b=n(),x=864e5,S=new Date(2026,0,1).getTime(),C=Array.from({length:90},(e,t)=>{let n=Math.sin(t/7*Math.PI*2)*.12,r=1+t/120;return{x:S+t*x,views:Math.round(186e3*r*(1+n)+t*7919%21e3),rate:Number((2.4+Math.sin(t/11)*.45+t*31%7/25).toFixed(2))}}),w=[{locale:`zh-CN`,key:`chinese`},{locale:`fr-FR`,key:`french`}]})))()}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,E.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,E.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t)},[n]),o=(0,E.useMemo)(()=>new Intl.NumberFormat(n),[n]),s=(0,E.useMemo)(()=>[{name:e(`yearlyRevenue`),type:`bar`,format:i,data:O.map((e,t)=>[e,k[t]??0])},{name:e(`users`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2.5,format:e=>o.format(e),data:O.map((e,t)=>[e,A[t]??null])}],[e,i,o]);return(0,D.jsx)(c,{series:s,yAxis:{format:i,title:e(`yearlyRevenue`)},yAxis2:{type:`log`,format:a,title:e(`usersLog`)},height:320,ariaLabel:e(`logAria`)})}var E,D,O,k,A;function j(){return(j=e((()=>{E=t(),i(),l(),D=n(),O=Array.from({length:10},(e,t)=>String(2016+t)),k=[.4,1.1,2.6,5.2,9.8,17,26,38,51,66],A=[1200,6800,31e3,12e4,41e4,11e5,23e5,39e5,56e5,74e5]})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`});return t=>e.format(t/100)},[n]),a=(0,M.useMemo)(()=>{let t=P.reduce((e,[,t])=>e+t,0),n=P.map((e,n)=>P.slice(0,n+1).reduce((e,[,t])=>e+t,0)/t*100);return[{name:e(`returns`),type:`bar`,color:`var(--primary-color, #4f46e5)`,data:P.map(([t,r],i)=>({x:e(`causes.${t}`),y:r,color:(n[i-1]??0)<80?`var(--primary-color, #4f46e5)`:`var(--border-color, #cbd5e1)`}))},{name:e(`cumulative`),type:`line`,yAxis:`right`,color:`var(--chart-series-4, #ef4444)`,format:i,data:P.map(([t],r)=>[e(`causes.${t}`),n[r]??0])}]},[e,i]);return(0,N.jsx)(c,{series:a,yAxis2:{min:0,max:100,nice:!1,format:i},height:320,ariaLabel:e(`paretoAria`)})}var M,N,P;function oe(){return(oe=e((()=>{M=t(),i(),l(),N=n(),P=[[`wrongSize`,412],[`damaged`,236],[`notAsDescribed`,151],[`late`,88],[`changedMind`,61],[`wrongItem`,37],[`other`,23]]})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,F.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,F.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,F.useMemo)(()=>{let t=L.map((t,n)=>e(`quarter`,{n:n%4+1,year:2025+Math.floor(n/4)}));return[{name:e(`revenue`),type:`bar`,format:i,data:t.map((e,t)=>[e,L[t]??0])},{name:e(`growth`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2.5,data:t.map((e,t)=>[e,R[t]??null])}]},[e,i]);return(0,I.jsx)(c,{series:o,yAxis:{format:i,title:e(`revenue`)},yAxis2:{format:a,title:e(`growth`)},height:320,ariaLabel:e(`revenueAria`)})}var F,I,L,R;function z(){return(z=e((()=>{F=t(),i(),l(),I=n(),L=[18.2,19.5,21.1,26.8,21.4,23.9,25.2,31.6],R=L.map((e,t)=>t>=4?e/(L[t-4]??e)-1:null)})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
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

// Ten years of a software company: yearly revenue (M$) grows 160-fold, its
// users 6,000-fold; a log right axis keeps both the first years and the last
// ones readable
const years = Array.from({ length: 10 }, (_, i) => String(2016 + i));
const revenue = [0.4, 1.1, 2.6, 5.2, 9.8, 17, 26, 38, 51, 66];
const users = [
  1_200, 6_800, 31_000, 120_000, 410_000, 1_100_000, 2_300_000, 3_900_000,
  5_600_000, 7_400_000,
];

export default function LogScaleDemo() {
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
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("yearlyRevenue"),
        type: "bar",
        format: usd,
        data: years.map((year, i) => [year, revenue[i] ?? 0] as const),
      },
      {
        name: t("users"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        format: (value) => number.format(value),
        data: years.map((year, i) => [year, users[i] ?? null] as const),
      },
    ],
    [t, usd, number],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("yearlyRevenue") }}
      // decades: 1k, 10k, 100k, 1M, 10M
      yAxis2={{ type: "log", format: compact, title: t("usersLog") }}
      height={320}
      ariaLabel={t("logAria")}
    />
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useMemo } from "react";
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
`})))()}var Q,ce,le;function $(){return($=e((()=>{m(),v(),T(),j(),oe(),z(),V(),U(),G(),q(),Y(),Z(),t(),o(),ee(),Q=n(),ce=a(Object.assign({"./demos/climate.tsx":te,"./demos/conversion.tsx":ne,"./demos/locale.tsx":re,"./demos/log-scale.tsx":ie,"./demos/pareto.tsx":ae,"./demos/revenue-growth.tsx":se}),Object.assign({"./demos/climate.tsx":B,"./demos/conversion.tsx":H,"./demos/locale.tsx":W,"./demos/log-scale.tsx":K,"./demos/pareto.tsx":J,"./demos/revenue-growth.tsx":X})),le=()=>(0,Q.jsx)(s,{id:`mixed-chart`,demos:ce})})))()}$();export{le as default};