import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{l as a,n as o,t as ee,u as te}from"./DocPage-6WUEs69-.js";import{m as s,r as c}from"./charts-D752pe3-.js";function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,l.useMemo)(()=>[{name:e(`ticketsClosed`),data:d.map((t,n)=>[e(`quarter`,{n:n+1}),t])}],[e]);return(0,u.jsx)(c,{series:t,height:280,ariaLabel:e(`ticketsAria`)})}var l,u,d;function f(){return(f=e((()=>{l=t(),i(),s(),u=n(),d=[320,410,385,470]})))()}function re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,ae.useMemo)(()=>[{name:e(`orders`),data:h},{name:e(`average7`),type:`line`,data:g,lineWidth:3}],[e]);return(0,p.jsx)(c,{series:t,xAxis:{title:e(`day`)},height:300,ariaLabel:e(`ordersAria`)})}var ae,p,m,h,g;function _(){return(_=e((()=>{ae=t(),i(),s(),p=n(),m=re(5),h=Array.from({length:30},(e,t)=>Math.round(60+t*1.5+m()*40)),g=h.map((e,t)=>{let n=h.slice(Math.max(0,t-6),t+1);return Math.round(n.reduce((e,t)=>e+t,0)/n.length)})})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,v.useMemo)(()=>{let t=x(n);return Object.keys(b).map(n=>({name:e(`cities.${n}`),data:t.map((e,t)=>[e,b[n][t]])}))},[e,n]),a=(0,v.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`}),[n]);return(0,y.jsx)(c,{series:i,yAxis:{format:e=>a.format(e)},height:300,ariaLabel:e(`rainfallAria`)})}var v,y,b,x;function S(){return(S=e((()=>{v=t(),i(),s(),y=n(),b={london:[55,41,41,44,49,45,45,50,49,69,59,55],tokyo:[52,56,118,125,138,168,154,168,210,198,93,51],paris:[51,41,48,52,63,50,63,53,48,61,51,58]},x=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,C.useMemo)(()=>Object.entries(T).map(([t,n])=>({name:t,data:n.map((t,n)=>[e(`quarter`,{n:n+1}),t])})),[e]),a=(0,C.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,w.jsx)(c,{series:i,labels:!0,yAxis:{format:a},height:300,ariaLabel:e(`revenueAria`)})}var C,w,T;function E(){return(E=e((()=>{C=t(),i(),s(),w=n(),T={2025:[312,348,365,421],2026:[356,402,431,488]}})))()}function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,D.useMemo)(()=>A.map(({key:t,color:n,values:r})=>({name:e(`nps.${t}`),color:n,data:k.map((t,n)=>[e(`regions.${t}`),r[n]])})),[e]);return(0,O.jsx)(c,{series:t,percent:!0,height:300,ariaLabel:e(`npsAria`)})}var D,O,k,A;function j(){return(j=e((()=>{D=t(),i(),s(),O=n(),k=[`northAmerica`,`europe`,`asiaPacific`,`latinAmerica`,`middleEast`],A=[{key:`promoters`,color:`var(--success-color)`,values:[612,540,702,288,164]},{key:`passives`,color:`var(--warning-color)`,values:[254,310,268,131,92]},{key:`detractors`,color:`var(--danger-color)`,values:[134,196,118,97,61]}]})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>{let t=F(n);return[{name:e(`netResult`),data:P.map((e,n)=>({x:t[n],y:e,color:e>=0?`var(--success-color)`:`var(--danger-color)`}))}]},[e,n]),a=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,signDisplay:`exceptZero`});return t=>e.format(t*1e3)},[n]);return(0,N.jsx)(c,{series:i,yAxis:{format:a},annotations:[{type:`line`,axis:`y`,value:0}],legend:!1,height:300,ariaLabel:e(`profitAria`)})}var M,N,P,F;function I(){return(I=e((()=>{M=t(),i(),s(),N=n(),P=[-42,-18,12,35,28,-9,41,66,58,73,49,92],F=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,L.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=[...z].sort((e,t)=>t[1]-e[1]);return[{name:e(`unitsSold`),showLabels:!0,data:r.map(([e,n])=>[t.of(e)??e,n])}]},[e,n]),a=(0,L.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,R.jsx)(c,{series:i,yAxis:{format:a},height:320,ariaLabel:e(`rankingAria`)})}var L,R,z;function de(){return(de=e((()=>{L=t(),i(),s(),R=n(),z=[[`FR`,182],[`US`,541],[`JP`,326],[`DE`,248],[`BR`,97],[`CN`,463],[`GB`,205],[`IN`,151],[`CA`,118],[`KR`,134]]})))()}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,B.useMemo)(()=>{let t=U(n,6);return Object.keys(H).map(n=>({name:e(`channels.${n}`),data:t.map((e,t)=>[e,H[n][t]])}))},[e,n]);return(0,V.jsx)(c,{series:i,stacked:!0,height:300,ariaLabel:e(`channelsAria`)})}var B,V,H,U;function W(){return(W=e((()=>{B=t(),i(),s(),V=n(),H={web:[120,135,150,148,170,190],mobile:[80,95,110,125,140,160],partners:[30,28,35,42,40,51]},U=(e,t)=>{let n=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:t},(e,t)=>n.format(new Date(2026,t,1)))}})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,G.useMemo)(()=>[{name:e(`newCustomers`),data:J.map((t,n)=>({x:e(`week`,{n:n+1}),y:t,color:t>=q?`var(--primary-color)`:`var(--border-strong-color)`}))}],[e]),a=J.filter(e=>e>=q).length,o=new Intl.NumberFormat(n,{style:`percent`});return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,K.jsx)(c,{series:i,annotations:[{type:`line`,axis:`y`,value:q,color:`var(--warning-color)`,dash:[6,4],width:2,label:e(`weeklyTarget`)}],legend:!1,height:300,ariaLabel:e(`targetAria`)}),(0,K.jsx)(`p`,{children:e(`targetSummary`,{reached:a,total:J.length,rate:o.format(a/J.length)})})]})}var G,K,q,J;function Y(){return(Y=e((()=>{G=t(),i(),s(),K=n(),q=120,J=[96,104,131,118,142,125,109,137,151,128,146,163]})))()}var X;function Z(){return(Z=e((()=>{X=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const closed = [320, 410, 385, 470];

export default function BasicDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("ticketsClosed"),
        // "Q1", "第1季度", "T1"...
        data: closed.map(
          (value, i) => [t("quarter", { n: i + 1 }), value] as const,
        ),
      },
    ],
    [t],
  );

  return <BarChart series={series} height={280} ariaLabel={t("ticketsAria")} />;
}
`})))()}var Q;function me(){return(me=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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

const random = mulberry32(5);
const orders = Array.from({ length: 30 }, (_, day) =>
  Math.round(60 + day * 1.5 + random() * 40),
);
// trailing 7-day average of the bars
const average = orders.map((_, day) => {
  const week = orders.slice(Math.max(0, day - 6), day + 1);
  return Math.round(week.reduce((sum, v) => sum + v, 0) / week.length);
});

export default function ComboDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("orders"), data: orders },
      { name: t("average7"), type: "line", data: average, lineWidth: 3 },
    ],
    [t],
  );

  return (
    <BarChart
      series={series}
      xAxis={{ title: t("day") }}
      height={300}
      ariaLabel={t("ordersAria")}
    />
  );
}
`})))()}var he;function ge(){return(ge=e((()=>{he=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Average monthly rainfall (mm), January to December
const rainfall = {
  london: [55, 41, 41, 44, 49, 45, 45, 50, 49, 69, 59, 55],
  tokyo: [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51],
  paris: [51, 41, 48, 52, 63, 50, 63, 53, 48, 61, 51, 58],
};

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // several series without \`stacked\`: the bars of each month sit side by side
  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return (Object.keys(rainfall) as (keyof typeof rainfall)[]).map((key) => ({
      name: t(\`cities.\${key}\`),
      data: months.map((month, i) => [month, rainfall[key][i]] as const),
    }));
  }, [t, locale]);
  const millimeters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );

  return (
    <BarChart
      series={series}
      yAxis={{ format: (value) => millimeters.format(value) }}
      height={300}
      ariaLabel={t("rainfallAria")}
    />
  );
}
`})))()}var _e;function ve(){return(ve=e((()=>{_e=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Revenue in thousands of dollars, Q1 to Q4
const revenue = {
  "2025": [312, 348, 365, 421],
  "2026": [356, 402, 431, 488],
};

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] =>
      Object.entries(revenue).map(([year, values]) => ({
        name: year,
        data: values.map(
          (value, i) => [t("quarter", { n: i + 1 }), value] as const,
        ),
      })),
    [t],
  );
  // "$356K", "35.6万 US$", "356 k $US"...
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      labels
      // the labels use the y axis format
      yAxis={{ format: usd }}
      height={300}
      ariaLabel={t("revenueAria")}
    />
  );
}
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const regions = [
  "northAmerica",
  "europe",
  "asiaPacific",
  "latinAmerica",
  "middleEast",
];

// Survey answers (respondents) grouped as Net Promoter Score categories
const answers = [
  {
    key: "promoters",
    color: "var(--success-color)",
    values: [612, 540, 702, 288, 164],
  },
  {
    key: "passives",
    color: "var(--warning-color)",
    values: [254, 310, 268, 131, 92],
  },
  {
    key: "detractors",
    color: "var(--danger-color)",
    values: [134, 196, 118, 97, 61],
  },
];

export default function PercentDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] =>
      answers.map(({ key, color, values }) => ({
        name: t(\`nps.\${key}\`),
        color,
        data: regions.map(
          (region, i) => [t(\`regions.\${region}\`), values[i]] as const,
        ),
      })),
    [t],
  );

  return (
    <BarChart series={series} percent height={300} ariaLabel={t("npsAria")} />
  );
}
`})))()}var $;function xe(){return(xe=e((()=>{$=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Net result per month (thousand EUR): losses are negative
const results = [-42, -18, 12, 35, 28, -9, 41, 66, 58, 73, 49, 92];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function ProfitLossDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // one color per bar: green above zero, red below
  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("netResult"),
        data: results.map((y, i) => ({
          x: months[i],
          y,
          color: y >= 0 ? "var(--success-color)" : "var(--danger-color)",
        })),
      },
    ];
  }, [t, locale]);
  // "+€92K", "-42 k€"...: the sign is part of the information
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      yAxis={{ format: euros }}
      annotations={[{ type: "line", axis: "y", value: 0 }]}
      legend={false}
      height={300}
      ariaLabel={t("profitAria")}
    />
  );
}
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Online sales by country (thousand units), in no particular order
const salesByCountry: [string, number][] = [
  ["FR", 182],
  ["US", 541],
  ["JP", 326],
  ["DE", 248],
  ["BR", 97],
  ["CN", 463],
  ["GB", 205],
  ["IN", 151],
  ["CA", 118],
  ["KR", 134],
];

export default function RankingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language: "Japan", "日本", "Japon"...
    const countries = new Intl.DisplayNames([locale], { type: "region" });
    const ranked = [...salesByCountry].sort((a, b) => b[1] - a[1]);
    return [
      {
        name: t("unitsSold"),
        showLabels: true,
        data: ranked.map(
          ([code, value]) => [countries.of(code) ?? code, value] as const,
        ),
      },
    ];
  }, [t, locale]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      yAxis={{ format: thousands }}
      height={320}
      ariaLabel={t("rankingAria")}
    />
  );
}
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Orders per month (January to June) by channel
const byChannel = {
  web: [120, 135, 150, 148, 170, 190],
  mobile: [80, 95, 110, 125, 140, 160],
  partners: [30, 28, 35, 42, 40, 51],
};

/** Short month names in the reader's language */
const monthNames = (locale: string, count: number) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: count }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale, 6);
    return (Object.keys(byChannel) as (keyof typeof byChannel)[]).map(
      (key) => ({
        name: t(\`channels.\${key}\`),
        data: months.map((month, i) => [month, byChannel[key][i]] as const),
      }),
    );
  }, [t, locale]);

  return (
    <BarChart
      series={series}
      stacked
      height={300}
      ariaLabel={t("channelsAria")}
    />
  );
}
`})))()}var Ee;function De(){return(De=e((()=>{Ee=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const TARGET = 120; // new customers per week
const signups = [96, 104, 131, 118, 142, 125, 109, 137, 151, 128, 146, 163];

export default function TargetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // bars that reach the target are highlighted
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("newCustomers"),
        data: signups.map((y, i) => ({
          x: t("week", { n: i + 1 }),
          y,
          color:
            y >= TARGET ? "var(--primary-color)" : "var(--border-strong-color)",
        })),
      },
    ],
    [t],
  );
  const reached = signups.filter((value) => value >= TARGET).length;
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BarChart
        series={series}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: TARGET,
            color: "var(--warning-color)",
            dash: [6, 4],
            width: 2,
            label: t("weeklyTarget"),
          },
        ]}
        legend={false}
        height={300}
        ariaLabel={t("targetAria")}
      />
      <p>
        {t("targetSummary", {
          reached,
          total: signups.length,
          rate: percent.format(reached / signups.length),
        })}
      </p>
    </div>
  );
}
`})))()}var Oe,ke,Ae;function je(){return(je=e((()=>{f(),_(),S(),E(),j(),I(),de(),W(),Y(),Z(),me(),ge(),ve(),be(),xe(),Ce(),Te(),De(),t(),o(),te(),Oe=n(),ke=a(Object.assign({"./demos/basic.tsx":ne,"./demos/combo.tsx":ie,"./demos/grouped.tsx":oe,"./demos/labels.tsx":se,"./demos/percent.tsx":ce,"./demos/profit-loss.tsx":le,"./demos/ranking.tsx":ue,"./demos/stacked.tsx":fe,"./demos/target.tsx":pe}),Object.assign({"./demos/basic.tsx":X,"./demos/combo.tsx":Q,"./demos/grouped.tsx":he,"./demos/labels.tsx":_e,"./demos/percent.tsx":ye,"./demos/profit-loss.tsx":$,"./demos/ranking.tsx":Se,"./demos/stacked.tsx":we,"./demos/target.tsx":Ee})),Ae=()=>(0,Oe.jsx)(ee,{id:`bar-chart`,demos:ke})})))()}je();export{Ae as default};