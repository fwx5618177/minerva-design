import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{l as a,n as o,t as s,u as c}from"./DocPage-4JD4uRu8.js";import{g as l,m as u}from"./charts-BHPM8b2-.js";function ee(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,d.useMemo)(()=>_(n),[n]),a=(0,d.useMemo)(()=>g.map(({week:e,day:t,count:n})=>({x:e,y:i[t],value:n})),[i]),o=(0,d.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,year:`2-digit`,timeZone:`UTC`}),[n]),s=g.reduce((e,{count:t})=>e+t,0);return(0,f.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,f.jsx)(l,{data:a,yCategories:[...i].reverse(),palette:[`var(--success-color)`],valueRange:[0,12],name:e(`contributions`),xAxis:{format:e=>o.format(m+Math.round(e)*7*ne),tickCount:12},radius:2,height:200,ariaLabel:e(`activityAria`)}),(0,f.jsx)(`p`,{children:e(`activityTotal`,{total:new Intl.NumberFormat(n).format(s)})})]})}var d,f,ne,p,m,h,g,_;function v(){return(v=e((()=>{d=t(),i(),u(),f=n(),ne=864e5,p=52,m=Date.UTC(2025,10,3),h=ee(52),g=[];for(let e=0;e<p;e++){let t=e>=7&&e<=8,n=e%13>8;for(let r=0;r<7;r++){let i=(r>=5?.15:.7)*(t?.1:1)*(n?1.8:1),a=h()<i?Math.round(h()*12*i):0;g.push({week:e,day:r,count:a})}}_=e=>{let t=new Intl.DateTimeFormat(e,{weekday:`short`});return Array.from({length:7},(e,n)=>t.format(new Date(2026,0,5+n)))}})))()}function re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,y.useMemo)(()=>x(n),[n]),a=(0,y.useMemo)(()=>S(n),[n]),o=(0,y.useMemo)(()=>{let e=re(24);return i.flatMap((t,n)=>{let r=n>=5;return a.map((n,i)=>{let a=r?.55*C(i,13,4)+.3*C(i,21,2):C(i,10.5,1.8)+.9*C(i,15,2)-.25*C(i,12.5,.8)+.35*C(i,21,1.5),o=Math.max(0,a)*1200+40+e()*90;return{x:n,y:t,value:Math.round(o)}})})},[i,a]),s=(0,y.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,b.jsx)(l,{data:o,xCategories:a,yCategories:[...i].reverse(),name:e(`sessions`),format:e=>s.format(e),height:280,ariaLabel:e(`sessionsAria`)})}var y,b,x,S,C;function w(){return(w=e((()=>{y=t(),i(),u(),b=n(),x=e=>{let t=new Intl.DateTimeFormat(e,{weekday:`short`});return Array.from({length:7},(e,n)=>t.format(new Date(2026,0,5+n)))},S=e=>{let t=new Intl.DateTimeFormat(e,{hour:`numeric`});return Array.from({length:24},(e,n)=>t.format(new Date(2026,0,5,n)))},C=(e,t,n)=>Math.exp(-((e-t)**2)/(2*n**2))})))()}function ae(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,T.useMemo)(()=>D(n),[n]),a=(0,T.useMemo)(()=>{let e=ae(1995);return O.flatMap((t,n)=>i.map(r=>{let i=-.75+n*.07+(e()+e()-1)*.7+(k[t]??0);return{x:t,y:r,value:Math.round(i*100)/100}}))},[i]),o=(0,T.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,minimumFractionDigits:2,maximumFractionDigits:2,signDisplay:`exceptZero`}),[n]);return(0,E.jsx)(l,{data:a,xCategories:O,yCategories:[...i].reverse(),colorScale:A,valueRange:[-2,2],name:e(`anomaly`),format:e=>o.format(e),radius:1,height:340,ariaLabel:e(`anomalyAria`)})}var T,E,D,O,k,A;function j(){return(j=e((()=>{T=t(),i(),u(),E=n(),D=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))},O=Array.from({length:30},(e,t)=>String(1995+t)),k={1998:.5,2016:.45,2024:.4},A=[`#2166ac`,`#67a9cf`,`var(--background-color)`,`#ef8a62`,`#b2182b`]})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>P.map(t=>e(`metrics.${t}`)),[e]),a=(0,M.useMemo)(()=>F.flatMap((e,t)=>e.map((e,n)=>({x:i[n],y:i[t],value:e}))),[i]),o=(0,M.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2,signDisplay:`exceptZero`}),[n]);return(0,N.jsx)(l,{data:a,xCategories:i,yCategories:[...i].reverse(),colorScale:`diverging`,colorMidpoint:0,valueRange:[-1,1],name:e(`correlation`),format:e=>o.format(e),height:360,ariaLabel:e(`correlationAria`)})}var M,N,P,F;function I(){return(I=e((()=>{M=t(),i(),u(),N=n(),P=[`sessions`,`pageViews`,`signups`,`revenue`,`churn`,`tickets`],F=[[1,.92,.71,.64,-.18,.35],[.92,1,.66,.58,-.12,.31],[.71,.66,1,.83,-.41,.22],[.64,.58,.83,1,-.57,.08],[-.18,-.12,-.41,-.57,1,.46],[.35,.31,.22,.08,.46,1]]})))()}function ce(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,[i,a]=(0,L.useState)(null),o=(0,L.useMemo)(()=>{let e=ce(200),t=[];for(let n=0;n<z;n++)for(let r=0;r<ue;r++){let i=-100;for(let e of B){let t=Math.hypot(r-e.x,n-e.y)+1,a=V.filter(t=>r<t!=e.x<t).length;i=Math.max(i,-32-22*Math.log10(t)-7*a)}t.push({x:r,y:n,value:i+(e()-.5)*2})}return t},[]),s=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`meter`}),[n]),c=(0,L.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,R.jsx)(l,{data:o,colorScale:H,valueRange:[-90,-30],name:e(`signal`),format:e=>`${c.format(Math.round(e))} dBm`,radius:0,xAxis:{format:e=>s.format(e)},yAxis:{format:e=>s.format(e)},interaction:{zoom:`xy`},onRendererChange:a,height:340,ariaLabel:e(`wifiAria`)}),(0,R.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{cells:c.format(2e4),renderer:i??`…`})})]})}var L,R,ue,z,B,V,H;function U(){return(U=e((()=>{L=t(),i(),u(),R=n(),ue=200,z=100,B=[{x:30,y:70},{x:105,y:25},{x:170,y:65}],V=[70,140],H=[`#0d0887`,`#7e03a8`,`#cc4778`,`#f89540`,`#f0f921`]})))()}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,{cohorts:i,periods:a,data:o}=(0,W.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`,year:`numeric`}),r=Array.from({length:K},(e,n)=>t.format(new Date(2026,n,1))),i=Array.from({length:q},(t,n)=>e(`monthN`,{n}));return{cohorts:r,periods:i,data:r.flatMap((e,t)=>i.map((n,r)=>({x:n,y:e,value:J(t,r)})))}},[e,n]),s=(0,W.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]);return(0,G.jsx)(l,{data:o,xCategories:a,yCategories:[...i].reverse(),valueRange:[0,1],name:e(`retained`),format:e=>s.format(e),height:340,ariaLabel:e(`retentionAria`)})}var W,G,K,q,J;function Y(){return(Y=e((()=>{W=t(),i(),u(),G=n(),K=9,q=9,J=(e,t)=>{if(t===0)return 1;if(e+t>=K)return null;let n=.18+e*.015;return n+(1-n)*Math.exp(-t/1.6)*.62}})))()}var X;function Z(){return(Z=e((()=>{X=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

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
const WEEKS = 52;
// first Monday of the year shown
const START = Date.UTC(2025, 10, 3);

// Contributions per day: weekdays busier, a quiet holiday period, a few streaks
const random = mulberry32(52);
const contributions: { week: number; day: number; count: number }[] = [];
for (let week = 0; week < WEEKS; week++) {
  const holiday = week >= 7 && week <= 8;
  const streak = week % 13 > 8;
  for (let day = 0; day < 7; day++) {
    const weekend = day >= 5;
    const busy =
      (weekend ? 0.15 : 0.7) * (holiday ? 0.1 : 1) * (streak ? 1.8 : 1);
    const count = random() < busy ? Math.round(random() * 12 * busy) : 0;
    contributions.push({ week, day, count });
  }
}

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function ActivityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => weekdays(locale), [locale]);

  // columns are weeks (numbers), rows are weekdays (categories)
  const data = useMemo(
    (): HeatmapCell[] =>
      contributions.map(({ week, day, count }) => ({
        x: week,
        y: days[day],
        value: count,
      })),
    [days],
  );
  // the x ticks show the month of the week
  const month = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
    [locale],
  );
  const total = contributions.reduce((sum, { count }) => sum + count, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        yCategories={[...days].reverse()}
        // a ramp of the success color, readable in light and dark themes
        palette={["var(--success-color)"]}
        valueRange={[0, 12]}
        name={t("contributions")}
        xAxis={{
          format: (week) => month.format(START + Math.round(week) * 7 * DAY),
          tickCount: 12,
        }}
        radius={2}
        height={200}
        ariaLabel={t("activityAria")}
      />
      <p>
        {t("activityTotal", {
          total: new Intl.NumberFormat(locale).format(total),
        })}
      </p>
    </div>
  );
}
`})))()}var Q;function fe(){return(fe=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

/** Hours of the day: "9 AM", "9時", "09 h"... */
const hoursOfDay = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { hour: "numeric" });
  return Array.from({ length: 24 }, (_, h) =>
    format.format(new Date(2026, 0, 5, h)),
  );
};

const bump = (hour: number, center: number, width: number) =>
  Math.exp(-((hour - center) ** 2) / (2 * width ** 2));

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => weekdays(locale), [locale]);
  const hours = useMemo(() => hoursOfDay(locale), [locale]);

  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(24);
    return days.flatMap((day, d) => {
      const weekend = d >= 5;
      return hours.map((hour, h) => {
        // office hours with a lunch dip on weekdays, late mornings at weekends
        const activity = weekend
          ? 0.55 * bump(h, 13, 4) + 0.3 * bump(h, 21, 2)
          : bump(h, 10.5, 1.8) +
            0.9 * bump(h, 15, 2) -
            0.25 * bump(h, 12.5, 0.8) +
            0.35 * bump(h, 21, 1.5);
        const value = Math.max(0, activity) * 1200 + 40 + random() * 90;
        return { x: hour, y: day, value: Math.round(value) };
      });
    });
  }, [days, hours]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <HeatmapChart
      data={data}
      xCategories={hours}
      // rows go from bottom to top: reverse them to read Monday first
      yCategories={[...days].reverse()}
      name={t("sessions")}
      format={(value) => number.format(value)}
      height={280}
      ariaLabel={t("sessionsAria")}
    />
  );
}
`})))()}var pe;function $(){return($=e((()=>{pe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};
const years = Array.from({ length: 30 }, (_, i) => String(1995 + i));
// warm years of strong El Niño events
const elNino: Record<string, number> = {
  "1998": 0.5,
  "2016": 0.45,
  "2024": 0.4,
};

// Blue below the reference period, the page background at 0, red above
const diverging = [
  "#2166ac",
  "#67a9cf",
  "var(--background-color)",
  "#ef8a62",
  "#b2182b",
];

export default function ColorScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const months = useMemo(() => monthNames(locale), [locale]);

  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(1995);
    return years.flatMap((year, i) =>
      months.map((month) => {
        const trend = -0.75 + i * 0.07;
        const noise = (random() + random() - 1) * 0.7;
        const value = trend + noise + (elNino[year] ?? 0);
        return { x: year, y: month, value: Math.round(value * 100) / 100 };
      }),
    );
  }, [months]);
  // "+0.42 °C", "+0,42 °C"...
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={years}
      yCategories={[...months].reverse()}
      colorScale={diverging}
      // symmetric range: 0 stays in the middle of the scale
      valueRange={[-2, 2]}
      name={t("anomaly")}
      format={(value) => celsius.format(value)}
      radius={1}
      height={340}
      ariaLabel={t("anomalyAria")}
    />
  );
}
`})))()}var me;function he(){return(he=e((()=>{me=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

// Correlation between product metrics (symmetric, 1 on the diagonal)
const metrics = [
  "sessions",
  "pageViews",
  "signups",
  "revenue",
  "churn",
  "tickets",
];
const matrix = [
  [1, 0.92, 0.71, 0.64, -0.18, 0.35],
  [0.92, 1, 0.66, 0.58, -0.12, 0.31],
  [0.71, 0.66, 1, 0.83, -0.41, 0.22],
  [0.64, 0.58, 0.83, 1, -0.57, 0.08],
  [-0.18, -0.12, -0.41, -0.57, 1, 0.46],
  [0.35, 0.31, 0.22, 0.08, 0.46, 1],
];

export default function CorrelationDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const names = useMemo(() => metrics.map((key) => t(\`metrics.\${key}\`)), [t]);
  const data = useMemo(
    (): HeatmapCell[] =>
      matrix.flatMap((row, i) =>
        row.map((value, j) => ({ x: names[j], y: names[i], value })),
      ),
    [names],
  );
  const coefficient = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={names}
      // first metric at the top, like a table
      yCategories={[...names].reverse()}
      // built-in theme-aware ramp: danger color below 0, primary above
      colorScale="diverging"
      colorMidpoint={0}
      valueRange={[-1, 1]}
      name={t("correlation")}
      format={(value) => coefficient.format(value)}
      height={360}
      ariaLabel={t("correlationAria")}
    />
  );
}
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartRendererKind,
  type HeatmapCell,
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

const WIDTH = 200;
const DEPTH = 100;
const ACCESS_POINTS = [
  { x: 30, y: 70 },
  { x: 105, y: 25 },
  { x: 170, y: 65 },
];
// interior walls (x positions) that weaken the signal crossing them
const WALLS = [70, 140];

const plasma = ["#0d0887", "#7e03a8", "#cc4778", "#f89540", "#f0f921"];

export default function LargeGridDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Wi-Fi signal strength on a 200 × 100 m floor, one cell per square meter
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(200);
    const cells: HeatmapCell[] = [];
    for (let y = 0; y < DEPTH; y++) {
      for (let x = 0; x < WIDTH; x++) {
        let best = -100;
        for (const ap of ACCESS_POINTS) {
          const distance = Math.hypot(x - ap.x, y - ap.y) + 1;
          const walls = WALLS.filter((wall) => x < wall !== ap.x < wall).length;
          best = Math.max(best, -32 - 22 * Math.log10(distance) - 7 * walls);
        }
        cells.push({ x, y, value: best + (random() - 0.5) * 2 });
      }
    }
    return cells;
  }, []);
  const meters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "meter" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        colorScale={plasma}
        valueRange={[-90, -30]}
        name={t("signal")}
        format={(value) => \`\${number.format(Math.round(value))} dBm\`}
        radius={0}
        xAxis={{ format: (value) => meters.format(value) }}
        yAxis={{ format: (value) => meters.format(value) }}
        interaction={{ zoom: "xy" }}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel={t("wifiAria")}
      />
      <p role="status">
        {t("largeStatus", {
          cells: number.format(WIDTH * DEPTH),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

const COHORTS = 9;
const PERIODS = 9;

// Share of each monthly signup cohort still active N months later; the
// newest cohorts have fewer months (null leaves the cell empty)
const retention = (cohort: number, month: number) => {
  if (month === 0) return 1;
  if (cohort + month >= COHORTS) return null;
  // onboarding improvements: later cohorts keep more users
  const floor = 0.18 + cohort * 0.015;
  return floor + (1 - floor) * Math.exp(-month / 1.6) * 0.62;
};

export default function RetentionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const { cohorts, periods, data } = useMemo(() => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    });
    const cohorts = Array.from({ length: COHORTS }, (_, c) =>
      date.format(new Date(2026, c, 1)),
    );
    const periods = Array.from({ length: PERIODS }, (_, m) =>
      t("monthN", { n: m }),
    );
    const data: HeatmapCell[] = cohorts.flatMap((cohort, c) =>
      periods.map((period, m) => ({
        x: period,
        y: cohort,
        value: retention(c, m),
      })),
    );
    return { cohorts, periods, data };
  }, [t, locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={periods}
      // oldest cohort at the top
      yCategories={[...cohorts].reverse()}
      // the default ramp: a tint of the surface to a deep (light theme) or
      // bright (dark theme) primary color
      valueRange={[0, 1]}
      name={t("retained")}
      format={(value) => percent.format(value)}
      height={340}
      ariaLabel={t("retentionAria")}
    />
  );
}
`})))()}var be,xe,Se;function Ce(){return(Ce=e((()=>{v(),w(),j(),I(),U(),Y(),Z(),fe(),$(),he(),_e(),ye(),t(),o(),c(),be=n(),xe=a(Object.assign({"./demos/activity.tsx":te,"./demos/basic.tsx":ie,"./demos/color-scale.tsx":oe,"./demos/correlation.tsx":se,"./demos/large-grid.tsx":le,"./demos/retention.tsx":de}),Object.assign({"./demos/activity.tsx":X,"./demos/basic.tsx":Q,"./demos/color-scale.tsx":pe,"./demos/correlation.tsx":me,"./demos/large-grid.tsx":ge,"./demos/retention.tsx":ve})),Se=()=>(0,be.jsx)(s,{id:`heatmap-chart`,demos:xe})})))()}Ce();export{Se as default};