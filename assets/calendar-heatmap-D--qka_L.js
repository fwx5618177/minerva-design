import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BzoVi22c.js";import{i as a,n as o,r as s,t as c}from"./Radio-DnNachfg.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-B2iACtLP.js";import{i as l,s as u}from"./shapes-s9T5lCRi.js";function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,d.useState)(null),a=(0,d.useMemo)(()=>_.reduce((e,t)=>e+t.value,0),[]);return(0,f.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,f.jsx)(`p`,{style:{margin:0},children:e(`commitsTotal`,{total:a})}),(0,f.jsx)(l,{data:_,locale:t.language,color:`#2da44e`,onClick:i,ariaLabel:e(`commitsAria`)}),(0,f.jsx)(`p`,{role:`status`,style:{margin:0},children:n?e(`commitsDay`,{date:n.name,value:n.value}):e(`commitsHint`)})]})}var d,f,p,m,h,g,_;function v(){return(v=e((()=>{d=t(),i(),u(),f=n(),p=864e5,m=e=>new Date(e).toISOString().slice(0,10),h=ie(7),g=Date.UTC(2026,9,24),_=[];for(let e=364;e>=0;e--){let t=g-e*p,n=new Date(t).getUTCDay(),r=n===0||n===6,i=e>290&&e<305,a=e%61<6,o=i?.05:r?.2:.82;h()<o&&_.push({date:m(t),value:Math.max(1,Math.round(h()*(r?4:9)*(a?2.2:1)))})}})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,y.useState)(`en-US`),o=(0,y.useMemo)(()=>new Intl.DisplayNames([t.language],{type:`language`}),[t.language]);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,b.jsx)(a,{"aria-label":e(`localeLabel`),direction:`horizontal`,value:n,onChange:e=>i(String(e)),children:se.map(e=>(0,b.jsx)(c,{value:e,label:o.of(e)??e},e))}),(0,b.jsx)(l,{data:S,range:[`2026-01-01`,`2026-06-30`],locale:n,color:`#0ea5e9`,maxCellSize:20,legend:!1,ariaLabel:e(`deploysAria`)})]})}var y,b,x,S,se;function C(){return(C=e((()=>{y=t(),i(),o(),s(),u(),b=n(),x=864e5,S=[];for(let e=Date.UTC(2026,0,1);e<=Date.UTC(2026,5,30);e+=x){let t=new Date(e),n=t.getUTCDay();if(n===0||n===6)continue;let r=t.getUTCDate();S.push({date:t.toISOString().slice(0,10),value:(r*7+n*3)%9})}se=[`en-US`,`fr-FR`,`de-DE`,`ja-JP`,`zh-CN`,`ar-EG`]})))()}function ce(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,w.useState)(`locale`),o=t.language,s=(0,w.useMemo)(()=>{let e=new Intl.DateTimeFormat(o,{weekday:`long`,timeZone:`UTC`});return t=>e.format(Date.UTC(2026,2,1+t))},[o]);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsx)(a,{"aria-label":e(`weekStartLabel`),direction:`horizontal`,value:n,onChange:e=>i(e),children:k.map(t=>(0,T.jsx)(c,{value:t,label:t===`locale`?e(`fromLocale`):s(Number(t))},t))}),(0,T.jsx)(l,{data:O,range:2026,layout:`months`,weekStart:n===`locale`?void 0:Number(n),locale:o,color:`#d97706`,levels:5,height:600,ariaLabel:e(`ordersAria`)})]})}var w,T,E,D,O,k;function A(){return(A=e((()=>{w=t(),i(),o(),s(),u(),T=n(),E=864e5,D=ce(11),O=[];for(let e=Date.UTC(2026,0,1);e<=Date.UTC(2026,11,31);e+=E){let t=new Date(e),n=t.getUTCDay(),r=t.getUTCMonth(),i=n===0||n===6,a=n===1,o=r===11||r===1&&t.getUTCDate()<=14;a||O.push({date:t.toISOString().slice(0,10),value:Math.round((12+D()*18)*(i?1.8:1)*(o?1.6:1))})}k=[`locale`,`0`,`1`,`6`]})))()}function ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),n=t.language,i=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:1}),[n]),a=(0,j.useMemo)(()=>t=>e(`km`,{value:i.format(t)}),[i,e]);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,M.jsx)(l,{data:F,range:[`2024-01-01`,`2026-12-31`],thresholds:[6,10,16],color:`#f97316`,format:a,locale:n,ariaLabel:e(`runsAria`)}),(0,M.jsx)(`p`,{style:{margin:0},children:Object.entries(I).map(([t,n])=>e(`runsYear`,{year:t,value:a(n)})).join(` · `)})]})}var j,M,N,P,F,I;function L(){return(L=e((()=>{j=t(),i(),u(),M=n(),N=864e5,P=ue(42),F=[];for(let e=Date.UTC(2024,0,1);e<=Date.UTC(2026,11,31);e+=N){let t=new Date(e),n=t.getUTCMonth(),r=t.getUTCDay()===0,i=n===0||n===11?.25:n>=6&&n<=7?.5:.65,a=t.getUTCFullYear()===2025&&n>=7&&n<=9;P()<i+(a?.2:0)&&F.push({date:t.toISOString().slice(0,10),value:Math.round((r?14+P()*14:4+P()*8)*(a?1.3:1)*10)/10})}I=F.reduce((e,t)=>{let n=String(t.date).slice(0,4);return e[n]=(e[n]??0)+t.value,e},{})})))()}function fe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,R.useState)(null),{longest:a,current:o}=(0,R.useMemo)(()=>K(W),[]),s=(0,R.useMemo)(()=>t=>e(`minutes`,{value:t}),[e]);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,z.jsx)(`p`,{style:{margin:0},children:e(`streaks`,{current:o,longest:a})}),(0,z.jsx)(l,{data:G,range:2026,thresholds:q,color:`#8b5cf6`,format:s,locale:t.language,legend:{position:`top`},onClick:i,ariaLabel:e(`lessonsAria`)}),(0,z.jsx)(`p`,{role:`status`,style:{margin:0},children:n?n.value>0?e(`lessonDay`,{date:n.name,value:s(n.value)}):e(`missedDay`,{date:n.name}):e(`lessonsHint`)})]})}var R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{R=t(),i(),u(),z=n(),B=864e5,V=fe(2026),H=Date.UTC(2026,0,1),U=297,W=[];for(let e=0;e<U;e++){let t=.55+.4*e/U;W.push(V()<t?Math.round(5+V()*(20+e/4)):0)}G=W.map((e,t)=>({date:new Date(H+t*B).toISOString().slice(0,10),value:e})),K=e=>{let t=0,n=0;for(let r of e)n=r>0?n+1:0,t=Math.max(t,n);return{longest:t,current:n}},q=[15,30,60]})))()}var Y;function X(){return(X=e((()=>{Y=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
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
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);

// A developer's commits over the last year: busy weekdays, quiet weekends,
// a two-week holiday and a few release crunches
const random = mulberry32(7);
const END = Date.UTC(2026, 9, 24);
const COMMITS: CalendarDatum[] = [];
for (let i = 364; i >= 0; i--) {
  const time = END - i * DAY;
  const weekday = new Date(time).getUTCDay();
  const weekend = weekday === 0 || weekday === 6;
  const holiday = i > 290 && i < 305;
  const crunch = i % 61 < 6;
  const chance = holiday ? 0.05 : weekend ? 0.2 : 0.82;
  if (random() < chance)
    COMMITS.push({
      date: iso(time),
      value: Math.max(
        1,
        Math.round(random() * (weekend ? 4 : 9) * (crunch ? 2.2 : 1)),
      ),
    });
}

export default function ContributionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const total = useMemo(() => COMMITS.reduce((sum, d) => sum + d.value, 0), []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <p style={{ margin: 0 }}>{t("commitsTotal", { total })}</p>
      <CalendarHeatmap
        data={COMMITS}
        locale={i18n.language}
        color="#2da44e"
        onClick={setSelected}
        ariaLabel={t("commitsAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? t("commitsDay", { date: selected.name, value: selected.value })
          : t("commitsHint")}
      </p>
    </div>
  );
}
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

const DAY = 24 * 60 * 60 * 1000;

// Deploys of a team during the first half of 2026 (none on weekends)
const DEPLOYS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2026, 0, 1);
  time <= Date.UTC(2026, 5, 30);
  time += DAY
) {
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) continue;
  const day = date.getUTCDate();
  DEPLOYS.push({
    date: date.toISOString().slice(0, 10),
    value: (day * 7 + weekday * 3) % 9,
  });
}

const LOCALES = ["en-US", "fr-FR", "de-DE", "ja-JP", "zh-CN", "ar-EG"];

export default function LocaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [locale, setLocale] = useState("en-US");

  // locale names in the reader's language
  const names = useMemo(
    () => new Intl.DisplayNames([i18n.language], { type: "language" }),
    [i18n.language],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("localeLabel")}
        direction="horizontal"
        value={locale}
        onChange={(value) => setLocale(String(value))}
      >
        {LOCALES.map((tag) => (
          <Radio key={tag} value={tag} label={names.of(tag) ?? tag} />
        ))}
      </RadioGroup>
      <CalendarHeatmap
        data={DEPLOYS}
        range={["2026-01-01", "2026-06-30"]}
        locale={locale}
        color="#0ea5e9"
        maxCellSize={20}
        legend={false}
        ariaLabel={t("deploysAria")}
      />
    </div>
  );
}
`})))()}var $;function me(){return(me=e((()=>{$=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

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

// Orders of a bakery's online shop in 2026: busier weekends and holidays
const random = mulberry32(11);
const ORDERS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2026, 0, 1);
  time <= Date.UTC(2026, 11, 31);
  time += DAY
) {
  const date = new Date(time);
  const weekday = date.getUTCDay();
  const month = date.getUTCMonth();
  const weekend = weekday === 0 || weekday === 6;
  const closed = weekday === 1;
  const festive = month === 11 || (month === 1 && date.getUTCDate() <= 14);
  if (closed) continue;
  ORDERS.push({
    date: date.toISOString().slice(0, 10),
    value: Math.round(
      (12 + random() * 18) * (weekend ? 1.8 : 1) * (festive ? 1.6 : 1),
    ),
  });
}

type Start = "locale" | "0" | "1" | "6";
const STARTS: Start[] = ["locale", "0", "1", "6"];

export default function MonthsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [start, setStart] = useState<Start>("locale");
  const locale = i18n.language;

  // the reader's names of Sunday, Monday and Saturday (2026-03-01 is a Sunday)
  const names = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    });
    return (day: number) => format.format(Date.UTC(2026, 2, 1 + day));
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("weekStartLabel")}
        direction="horizontal"
        value={start}
        onChange={(value) => setStart(value as Start)}
      >
        {STARTS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={value === "locale" ? t("fromLocale") : names(Number(value))}
          />
        ))}
      </RadioGroup>
      <CalendarHeatmap
        data={ORDERS}
        range={2026}
        layout="months"
        weekStart={start === "locale" ? undefined : Number(start)}
        locale={locale}
        color="#d97706"
        levels={5}
        height={600}
        ariaLabel={t("ordersAria")}
      />
    </div>
  );
}
`})))()}var he;function ge(){return(ge=e((()=>{he=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

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

// Three years of running, in km per day: long runs on Sundays, more running
// in spring and autumn, a winter break and a marathon block in 2025
const random = mulberry32(42);
const RUNS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2024, 0, 1);
  time <= Date.UTC(2026, 11, 31);
  time += DAY
) {
  const date = new Date(time);
  const month = date.getUTCMonth();
  const sunday = date.getUTCDay() === 0;
  const season =
    month === 0 || month === 11 ? 0.25 : month >= 6 && month <= 7 ? 0.5 : 0.65;
  const marathon = date.getUTCFullYear() === 2025 && month >= 7 && month <= 9;
  if (random() < season + (marathon ? 0.2 : 0))
    RUNS.push({
      date: date.toISOString().slice(0, 10),
      value:
        Math.round(
          (sunday ? 14 + random() * 14 : 4 + random() * 8) *
            (marathon ? 1.3 : 1) *
            10,
        ) / 10,
    });
}

const TOTALS = RUNS.reduce<Record<string, number>>((totals, run) => {
  const year = String(run.date).slice(0, 4);
  totals[year] = (totals[year] ?? 0) + run.value;
  return totals;
}, {});

export default function MultiYearDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const format = useMemo(
    () => (value: number) => t("km", { value: number.format(value) }),
    [number, t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CalendarHeatmap
        data={RUNS}
        range={["2024-01-01", "2026-12-31"]}
        thresholds={[6, 10, 16]}
        color="#f97316"
        format={format}
        locale={locale}
        ariaLabel={t("runsAria")}
      />
      <p style={{ margin: 0 }}>
        {Object.entries(TOTALS)
          .map(([year, km]) => t("runsYear", { year, value: format(km) }))
          .join(" · ")}
      </p>
    </div>
  );
}
`})))()}var _e;function ve(){return(ve=e((()=>{_e=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
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

// Minutes spent learning a language each day of 2026, up to Oct 24: the
// habit gets stronger over the year, with a few missed days
const random = mulberry32(2026);
const START = Date.UTC(2026, 0, 1);
const DAYS = 297;
const minutes: number[] = [];
for (let i = 0; i < DAYS; i++) {
  const habit = 0.55 + (0.4 * i) / DAYS;
  minutes.push(random() < habit ? Math.round(5 + random() * (20 + i / 4)) : 0);
}
const LESSONS: CalendarDatum[] = minutes.map((value, i) => ({
  date: new Date(START + i * DAY).toISOString().slice(0, 10),
  value,
}));

/** Longest and current runs of days with some practice */
const streaks = (values: number[]) => {
  let longest = 0;
  let run = 0;
  for (const v of values) {
    run = v > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  return { longest, current: run };
};

// 1-15, 16-30, 31-60 and more than 60 minutes
const THRESHOLDS = [15, 30, 60];

export default function StreakDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const { longest, current } = useMemo(() => streaks(minutes), []);
  const format = useMemo(() => (value: number) => t("minutes", { value }), [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <p style={{ margin: 0 }}>{t("streaks", { current, longest })}</p>
      <CalendarHeatmap
        data={LESSONS}
        range={2026}
        thresholds={THRESHOLDS}
        color="#8b5cf6"
        format={format}
        locale={i18n.language}
        legend={{ position: "top" }}
        onClick={setSelected}
        ariaLabel={t("lessonsAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? selected.value > 0
            ? t("lessonDay", {
                date: selected.name,
                value: format(selected.value),
              })
            : t("missedDay", { date: selected.name })
          : t("lessonsHint")}
      </p>
    </div>
  );
}
`})))()}var ye,be,xe;function Se(){return(Se=e((()=>{v(),C(),A(),L(),J(),X(),Q(),me(),ge(),ve(),t(),te(),re(),ye=n(),be=ee(Object.assign({"./demos/contributions.tsx":ae,"./demos/locale.tsx":oe,"./demos/months.tsx":le,"./demos/multi-year.tsx":de,"./demos/streak.tsx":pe}),Object.assign({"./demos/contributions.tsx":Y,"./demos/locale.tsx":Z,"./demos/months.tsx":$,"./demos/multi-year.tsx":he,"./demos/streak.tsx":_e})),xe=()=>(0,ye.jsx)(ne,{id:`calendar-heatmap`,demos:be})})))()}Se();export{xe as default};