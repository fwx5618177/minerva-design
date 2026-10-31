import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{l as a,n as o,t as ee,u as te}from"./DocPage-BbPSunu1.js";import{l as s,m as c}from"./charts-D1JmjIcg.js";function ne(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,l.useMemo)(()=>{let t=ne(21),n=[],r=18e3;for(let e=0;e<90;e++){r*=1.004+(t()-.5)*.01;let i=1+.04*Math.sin(e/9),a=r*i*(.985+t()*.03);n.push([new Date(f+e*d),Math.round(a)])}return[{name:e(`dau`),data:n}]},[e]),a=(0,l.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),o=(0,l.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]);return(0,u.jsx)(s,{series:i,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>a.format(e)},height:280,ariaLabel:e(`dauAria`)})}var l,u,d,f;function p(){return(p=e((()=>{l=t(),i(),c(),u=n(),d=864e5,f=new Date(2026,3,1).getTime()})))()}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,m.useMemo)(()=>{let t=oe(n),r=t.map((e,t)=>[e,_[t]??null]),i=t.map((e,t)=>[e,Math.round(g*(t+1)/12)]);return[{name:e(`actual`),data:r},{name:e(`plan`),type:`line`,data:i,color:`var(--text-secondary-color)`,lineWidth:1.5}]},[e,n]),a=(0,m.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,ae.jsx)(s,{series:i,curve:`linear`,yAxis:{zero:!0,format:a},height:300,ariaLabel:e(`cumulativeAria`)})}var m,ae,h,g,_,oe;function v(){return(v=e((()=>{m=t(),i(),c(),ae=n(),h=[182,164,210,225,198,241,233,219,262,280],g=2700,_=h.map((e,t)=>h.slice(0,t+1).reduce((e,t)=>e+t,0)),oe=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,y.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{hour:`numeric`}),r=e=>t.format(new Date(2026,3,20,e)),i={nuclear:e(`energy.nuclear`),hydro:e(`energy.hydro`),wind:e(`energy.wind`),solar:e(`energy.solar`),gas:e(`energy.gas`)};return Object.keys(S).map(e=>({name:i[e],color:C[e],data:x.map(t=>[r(t),S[e][t]])}))},[e,n]),a=(0,y.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`gw`,{value:t.format(n)})},[e,n]);return(0,b.jsx)(s,{series:i,stacked:!0,yAxis:{format:a,title:e(`power`)},height:320,ariaLabel:e(`energyAria`)})}var y,b,x,S,C;function w(){return(w=e((()=>{y=t(),i(),c(),b=n(),x=Array.from({length:24},(e,t)=>t),S={nuclear:x.map(()=>38),hydro:x.map(e=>6+3*Math.exp(-((e-19)**2)/6)),wind:x.map(e=>9+4*Math.sin((e+3)/4)),solar:x.map(e=>Math.max(0,22*Math.sin((e-6)/14*Math.PI))),gas:x.map(e=>4+6*Math.exp(-((e-20)**2)/5))},C={nuclear:`#8b5cf6`,hydro:`#0ea5e9`,wind:`#14b8a6`,solar:`#f59e0b`,gas:`#94a3b8`}})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,T.useMemo)(()=>[{name:e(`download`),data:A},{name:e(`upload`),data:j}],[e]),a=(0,T.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`megabit-per-second`});return t=>e.format(Math.abs(t))},[n]),o=(0,T.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`}),[n]);return(0,E.jsx)(s,{series:i,curve:`linear`,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:a},annotations:[{type:`line`,axis:`y`,value:0}],height:300,ariaLabel:e(`bandwidthAria`)})}var T,E,D,O,k,A,j;function M(){return(M=e((()=>{T=t(),i(),c(),E=n(),D=6e4,O=new Date(2026,9,30,9).getTime(),k=Array.from({length:120},(e,t)=>t),A=k.map(e=>[O+e*D,Math.round(420+180*Math.sin(e/11)+90*Math.sin(e/2.3))]),j=k.map(e=>[O+e*D,-Math.round(160+60*Math.sin(e/7+1)+40*Math.cos(e/1.7))])})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,N.useMemo)(()=>{let t={aurora:`Aurora`,borealis:`Borealis`,cobalt:`Cobalt`,others:e(`others`)},r=new Intl.NumberFormat(n,{notation:`compact`});return Object.keys(I).map(e=>({name:t[e],format:e=>r.format(e*1e6),data:F.map((t,n)=>[t,I[e][n]])}))},[e,n]);return(0,P.jsx)(s,{series:i,percent:!0,height:300,ariaLabel:e(`shareAria`)})}var N,P,F,I;function L(){return(L=e((()=>{N=t(),i(),c(),P=n(),F=Array.from({length:11},(e,t)=>String(2016+t)),I={aurora:[38,41,47,52,58,66,71,74,79,83,88],borealis:[52,50,49,47,44,43,41,40,38,37,35],cobalt:[12,16,21,27,31,34,36,41,44,49,54],others:[44,42,39,36,33,30,28,25,23,21,19]}})))()}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,R.useMemo)(()=>{let t=V(n),r={organic:e(`sources.organic`),direct:e(`sources.direct`),referral:e(`sources.referral`),social:e(`sources.social`)};return Object.keys(B).map(e=>({name:r[e],data:t.map((t,n)=>[t,B[e][n]])}))},[e,n]),a=(0,R.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]);return(0,z.jsx)(s,{series:i,stacked:!0,yAxis:{format:e=>a.format(e)},height:300,ariaLabel:e(`visitsAria`)})}var R,z,B,V;function H(){return(H=e((()=>{R=t(),i(),c(),z=n(),B={organic:[42e3,44500,47800,46900,51200,54e3,52300,55800,60100,63400,66200,70500],direct:[21e3,21800,22400,23900,24100,25600,26e3,25200,27300,28800,29500,31200],referral:[9800,10400,12900,11700,12300,14800,13900,14200,15600,17400,16900,18300],social:[6200,7900,7100,8800,11400,10200,9600,12700,13100,12400,15800,17900]},V=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function de(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,U.useMemo)(()=>{let t=de(8),n=[],r=3;for(let e=0;e<96;e++){let i=e/4,a=3+9*Math.exp(-((i-14)**2)/18)+t()*2,o=Math.min(q,Math.max(2,Math.round(a)));o>r?r=o:o<r&&t()<.5&&--r,n.push([new Date(K+e*G),r])}return[{name:e(`instances`),data:n}]},[e]),a=(0,U.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`}),[n]);return(0,W.jsx)(s,{series:i,curve:`step`,xAxis:{type:`time`,format:e=>a.format(e)},yAxis:{zero:!0,max:16},annotations:[{type:`line`,axis:`y`,value:q,dash:[4,4],color:`var(--danger-color)`,label:e(`quota`)}],height:280,ariaLabel:e(`instancesAria`)})}var U,W,G,K,q;function J(){return(J=e((()=>{U=t(),i(),c(),W=n(),G=9e5,K=new Date(2026,5,15).getTime(),q=14})))()}var Y;function X(){return(X=e((()=>{Y=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

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
const START = new Date(2026, 3, 1).getTime();

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(21);
    const data: [Date, number][] = [];
    let level = 18_000;
    for (let i = 0; i < 90; i++) {
      level *= 1.004 + (random() - 0.5) * 0.01;
      const seasonal = 1 + 0.04 * Math.sin(i / 9);
      const value = level * seasonal * (0.985 + random() * 0.03);
      data.push([new Date(START + i * DAY), Math.round(value)]);
    }
    return [{ name: t("dau"), data }];
  }, [t]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const date = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => compact.format(value) }}
      height={280}
      ariaLabel={t("dauAria")}
    />
  );
}
`})))()}var Z;function pe(){return(pe=e((()=>{Z=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly sales (thousand USD) of the first 10 months, and the yearly plan
const sales = [182, 164, 210, 225, 198, 241, 233, 219, 262, 280];
const PLAN = 2_700;
// running total of the months already closed
const runningTotal = sales.map((_, i) =>
  sales.slice(0, i + 1).reduce((sum, value) => sum + value, 0),
);

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function CumulativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    // the remaining months are unknown (null)
    const actual = months.map(
      (month, i) => [month, runningTotal[i] ?? null] as const,
    );
    // the plan grows evenly through the year
    const plan = months.map(
      (month, i) => [month, Math.round((PLAN * (i + 1)) / 12)] as const,
    );
    return [
      { name: t("actual"), data: actual },
      {
        name: t("plan"),
        type: "line",
        data: plan,
        color: "var(--text-secondary-color)",
        lineWidth: 1.5,
      },
    ];
  }, [t, locale]);
  // values are in thousands of dollars
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <AreaChart
      series={series}
      curve="linear"
      yAxis={{ zero: true, format: usd }}
      height={300}
      ariaLabel={t("cumulativeAria")}
    />
  );
}
`})))()}var me;function he(){return(he=e((()=>{me=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const hours = Array.from({ length: 24 }, (_, hour) => hour);

// Electricity generation of a grid over one spring day, in gigawatts
const generation = {
  nuclear: hours.map(() => 38),
  hydro: hours.map((h) => 6 + 3 * Math.exp(-((h - 19) ** 2) / 6)),
  wind: hours.map((h) => 9 + 4 * Math.sin((h + 3) / 4)),
  solar: hours.map((h) => Math.max(0, 22 * Math.sin(((h - 6) / 14) * Math.PI))),
  gas: hours.map((h) => 4 + 6 * Math.exp(-((h - 20) ** 2) / 5)),
};
const colors = {
  nuclear: "#8b5cf6",
  hydro: "#0ea5e9",
  wind: "#14b8a6",
  solar: "#f59e0b",
  gas: "#94a3b8",
};

export default function EnergyMixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 3, 20, hour));
    const names = {
      nuclear: t("energy.nuclear"),
      hydro: t("energy.hydro"),
      wind: t("energy.wind"),
      solar: t("energy.solar"),
      gas: t("energy.gas"),
    };
    return (Object.keys(generation) as (keyof typeof generation)[]).map(
      (key) => ({
        name: names[key],
        color: colors[key],
        data: hours.map((h) => [label(h), generation[key][h]] as const),
      }),
    );
  }, [t, locale]);
  const gigawatts = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("gw", { value: number.format(value) });
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: gigawatts, title: t("power") }}
      height={320}
      ariaLabel={t("energyAria")}
    />
  );
}
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const MINUTE = 60 * 1000;
const START = new Date(2026, 9, 30, 9).getTime();

// Bandwidth of a server every minute for two hours (Mbit/s)
const minutes = Array.from({ length: 120 }, (_, i) => i);
const download = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      Math.round(420 + 180 * Math.sin(i / 11) + 90 * Math.sin(i / 2.3)),
    ] as const,
);
// upload is drawn below zero: same scale, mirrored
const upload = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      -Math.round(160 + 60 * Math.sin(i / 7 + 1) + 40 * Math.cos(i / 1.7)),
    ] as const,
);

export default function MirroredDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("download"), data: download },
      { name: t("upload"), data: upload },
    ],
    [t],
  );
  // "420 Mb/s", "420 Mbit/s"...: the sign only says the direction
  const bandwidth = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabit-per-second",
    });
    return (value: number) => format.format(Math.abs(value));
  }, [locale]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="linear"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ format: bandwidth }}
      annotations={[{ type: "line", axis: "y", value: 0 }]}
      height={300}
      ariaLabel={t("bandwidthAria")}
    />
  );
}
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const years = Array.from({ length: 11 }, (_, i) => String(2016 + i));

// Units shipped (millions) by vendor; \`percent\` turns them into shares
const vendors = {
  aurora: [38, 41, 47, 52, 58, 66, 71, 74, 79, 83, 88],
  borealis: [52, 50, 49, 47, 44, 43, 41, 40, 38, 37, 35],
  cobalt: [12, 16, 21, 27, 31, 34, 36, 41, 44, 49, 54],
  others: [44, 42, 39, 36, 33, 30, 28, 25, 23, 21, 19],
};

export default function PercentDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = {
      aurora: "Aurora",
      borealis: "Borealis",
      cobalt: "Cobalt",
      others: t("others"),
    };
    // "88 million units" in the tooltip
    const units = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(vendors) as (keyof typeof vendors)[]).map((key) => ({
      name: names[key],
      format: (value: number) => units.format(value * 1_000_000),
      data: years.map((year, i) => [year, vendors[key][i]] as const),
    }));
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      percent
      height={300}
      ariaLabel={t("shareAria")}
    />
  );
}
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly visits by traffic source, January to December
const sources = {
  organic: [
    42_000, 44_500, 47_800, 46_900, 51_200, 54_000, 52_300, 55_800, 60_100,
    63_400, 66_200, 70_500,
  ],
  direct: [
    21_000, 21_800, 22_400, 23_900, 24_100, 25_600, 26_000, 25_200, 27_300,
    28_800, 29_500, 31_200,
  ],
  referral: [
    9_800, 10_400, 12_900, 11_700, 12_300, 14_800, 13_900, 14_200, 15_600,
    17_400, 16_900, 18_300,
  ],
  social: [
    6_200, 7_900, 7_100, 8_800, 11_400, 10_200, 9_600, 12_700, 13_100, 12_400,
    15_800, 17_900,
  ],
};

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    const names = {
      organic: t("sources.organic"),
      direct: t("sources.direct"),
      referral: t("sources.referral"),
      social: t("sources.social"),
    };
    return (Object.keys(sources) as (keyof typeof sources)[]).map((key) => ({
      name: names[key],
      data: months.map((month, i) => [month, sources[key][i]] as const),
    }));
  }, [t, locale]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: (value) => compact.format(value) }}
      height={300}
      ariaLabel={t("visitsAria")}
    />
  );
}
`})))()}var Q;function Se(){return(Se=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const QUARTER_HOUR = 15 * 60 * 1000;
// local midnight, so the time axis reads 00:00 → 24:00 in every time zone
const START = new Date(2026, 5, 15).getTime();
const QUOTA = 14;

export default function StepDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  // Instances started by an autoscaler: the count holds until the next change
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(8);
    const data: [Date, number][] = [];
    let instances = 3;
    for (let i = 0; i < 96; i++) {
      const hour = i / 4;
      const load = 3 + 9 * Math.exp(-((hour - 14) ** 2) / 18) + random() * 2;
      const target = Math.min(QUOTA, Math.max(2, Math.round(load)));
      // scale out quickly, scale in one instance at a time
      if (target > instances) instances = target;
      else if (target < instances && random() < 0.5) instances -= 1;
      data.push([new Date(START + i * QUARTER_HOUR), instances]);
    }
    return [{ name: t("instances"), data }];
  }, [t]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="step"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ zero: true, max: QUOTA + 2 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: QUOTA,
          dash: [4, 4],
          color: "var(--danger-color)",
          label: t("quota"),
        },
      ]}
      height={280}
      ariaLabel={t("instancesAria")}
    />
  );
}
`})))()}var Ce,we,Te;function $(){return($=e((()=>{p(),v(),w(),M(),L(),H(),J(),X(),pe(),he(),_e(),ye(),xe(),Se(),t(),o(),te(),Ce=n(),we=a(Object.assign({"./demos/basic.tsx":re,"./demos/cumulative.tsx":ie,"./demos/energy-mix.tsx":se,"./demos/mirrored.tsx":ce,"./demos/percent.tsx":le,"./demos/stacked.tsx":ue,"./demos/step.tsx":fe}),Object.assign({"./demos/basic.tsx":Y,"./demos/cumulative.tsx":Z,"./demos/energy-mix.tsx":me,"./demos/mirrored.tsx":ge,"./demos/percent.tsx":ve,"./demos/stacked.tsx":be,"./demos/step.tsx":Q})),Te=()=>(0,Ce.jsx)(ee,{id:`area-chart`,demos:we})})))()}$();export{Te as default};