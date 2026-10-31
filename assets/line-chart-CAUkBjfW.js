import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CsvLrYUR.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{l,n as u,t as ee,u as te}from"./DocPage-CmQtD5jg.js";import{f as d,m as f}from"./charts-BgGG_T8i.js";function ne(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,p.useMemo)(()=>{let t=ne(3),n=[],r=120;for(let e=0;e<60;e++)r+=t()*12,n.push(Math.round(r));return[{name:e(`storage`),data:n,opacity:.25}]},[e]),a=(0,p.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`gigabyte`}),[n]);return(0,m.jsx)(d,{series:i,area:!0,xAxis:{title:e(`day`)},yAxis:{zero:!0,format:e=>a.format(e)},height:280,ariaLabel:e(`storageAria`)})}var p,m;function h(){return(h=e((()=>{p=t(),i(),f(),m=n()})))()}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,g.useMemo)(()=>{let t=ce(n);return[{name:e(`thisWeek`),data:t.map((e,t)=>[e,oe[t]])},{name:e(`lastWeek`),data:t.map((e,t)=>[e,se[t]])}]},[e,n]),a=(0,g.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,ae.jsx)(d,{series:i,yAxis:{format:e=>a.format(e)},height:280,ariaLabel:e(`visitorsAria`)})}var g,ae,oe,se,ce;function le(){return(le=e((()=>{g=t(),i(),f(),ae=n(),oe=[1200,1350,1280,1490,1610,980,870],se=[1100,1180,1250,1300,1420,1010,760],ce=e=>{let t=new Intl.DateTimeFormat(e,{weekday:`short`});return Array.from({length:7},(e,n)=>t.format(new Date(2026,0,5+n)))}})))()}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,[i,o]=(0,_.useState)(`smooth`),s=(0,_.useMemo)(()=>{let t=y(n);return[{name:e(`lisbon`),data:t.map((e,t)=>[e,de[t]])},{name:e(`oslo`),data:t.map((e,t)=>[e,fe[t]])}]},[e,n]),l=(0,_.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1}),[n]);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,v.jsx)(a,{"aria-label":e(`curve`),direction:`horizontal`,value:i,onChange:e=>o(e),children:pe.map(t=>(0,v.jsx)(c,{value:t,label:e(`curves.${t}`)},t))}),(0,v.jsx)(d,{series:s,curve:i,yAxis:{format:e=>l.format(e)},height:280,ariaLabel:e(`temperatureAria`)})]})}var _,v,de,fe,y,pe;function me(){return(me=e((()=>{_=t(),i(),o(),s(),f(),v=n(),de=[11.6,12.6,14.9,16.2,18.8,21.9,23.6,24,22.6,19.4,15.3,12.7],fe=[-4.3,-4,-.2,4.5,10.8,15.2,16.4,15.2,10.8,5,.6,-3.2],y=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))},pe=[`linear`,`smooth`,`step`]})))()}function he(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,b.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{hour:`numeric`}),r=e=>t.format(new Date(2026,0,1,e));return[{name:e(`indoor`),data:S.map(e=>[r(e),ge[e]])},{name:e(`outdoor`),data:S.map(e=>[r(e),_e[e]])}]},[e,n]),a=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1}),[n]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(d,{series:i,curve:`smooth`,yAxis:{format:e=>a.format(e)},height:280,ariaLabel:e(`gapsAria`)}),(0,x.jsx)(`p`,{children:e(`gapsNote`)})]})}var b,x,ge,_e,S;function ve(){return(ve=e((()=>{b=t(),i(),f(),x=n(),ge=[20.8,20.6,20.4,20.3,20.1,20,20.4,21,21.6,21.9,null,null,null,22.8,23,23.1,22.9,22.6,22.3,22,21.7,21.4,21.2,21],_e=[9.1,8.7,8.2,7.9,7.6,7.4,8,9.3,11.2,13,14.6,15.9,16.8,17.4,17.6,17.2,null,null,14.1,12.8,11.7,10.9,10.2,9.6],S=Array.from({length:24},(e,t)=>t)})))()}function ye(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),[n,i]=(0,C.useState)(null),a=(0,C.useMemo)(()=>{let t=ye(2026),n=new Float64Array(T),r=new Float64Array(T),i=100;for(let e=0;e<T;e++)i+=(t()-.5)*.4,n[e]=E+e*1e3,r[e]=i;return[{name:e(`sensor`),data:{x:n,y:r},lineWidth:1}]},[e]);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,w.jsx)(d,{series:a,xAxis:{type:`time`},onRendererChange:i,height:300,ariaLabel:e(`sensorAria`)}),(0,w.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{points:new Intl.NumberFormat(t.language).format(T),renderer:n??`…`})})]})}var C,w,T,E;function D(){return(D=e((()=>{C=t(),i(),f(),w=n(),T=1e6,E=Date.UTC(2026,0,1)})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,[i,o]=(0,O.useState)(`stacked`),s=i===`percent`,l=(0,O.useMemo)(()=>{let t=j(n),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),i={compute:e(`services.compute`),storage:e(`services.storage`),network:e(`services.network`),databases:e(`services.databases`)};return Object.keys(A).map(e=>({name:i[e],format:e=>r.format(e),data:t.map((t,n)=>[t,A[e][n]])}))},[e,n]),u=(0,O.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,k.jsxs)(a,{"aria-label":e(`stackMode`),direction:`horizontal`,value:i,onChange:e=>o(String(e)),children:[(0,k.jsx)(c,{value:`stacked`,label:e(`stacked`)}),(0,k.jsx)(c,{value:`percent`,label:`100%`})]}),(0,k.jsx)(d,{series:l,area:!0,stacked:!0,percent:s,yAxis:s?void 0:{format:e=>u.format(e)},height:300,ariaLabel:e(`spendAria`)})]})}var O,k,A,j;function M(){return(M=e((()=>{O=t(),i(),o(),s(),f(),k=n(),A={compute:[18400,19100,20600,21e3,22800,24100,23500,25900,27200,28e3,29400,31800],storage:[6200,6500,6900,7400,7800,8300,8900,9400,9800,10500,11100,11900],network:[3100,2900,3600,4200,3800,4600,5300,4900,5200,5800,6400,7100],databases:[9800,9900,10200,10100,10800,11200,11e3,11600,12100,12400,12300,12900]},j=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,N.useMemo)(()=>[{name:e(`median`),data:Te},{name:e(`p95`),data:Ee}],[e]),a=(0,N.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`}),[n]),o=(0,N.useMemo)(()=>[{type:`rect`,y0:we,color:`var(--danger-color)`,opacity:.1,label:e(`critical`)},{type:`line`,axis:`y`,value:I,color:`var(--warning-color)`,dash:[6,4],label:e(`target`,{value:a.format(I)})}],[e,a]),s=(0,N.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`}),[n]);return(0,P.jsx)(d,{series:i,annotations:o,crosshair:!0,xAxis:{type:`time`,format:e=>s.format(e)},yAxis:{min:0,max:700,format:e=>a.format(e)},height:300,ariaLabel:e(`latencyAria`)})}var N,P,F,Ce,I,we,L,Te,Ee;function De(){return(De=e((()=>{N=t(),i(),f(),P=n(),F=6e4,Ce=new Date(2026,9,12,8).getTime(),I=300,we=450,L=(e,t)=>Array.from({length:72},(n,r)=>{let i=Math.max(0,1-Math.abs(r-36)/6),a=Math.sin(r*1.3)*.08+Math.cos(r*.7)*.05;return[Ce+r*5*F,Math.round(e*(1+a)+t*i)]}),Te=L(120,140),Ee=L(240,330)})))()}function Oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,R.useMemo)(()=>{let t=Oe(11),n=e=>Array.from({length:180},(n,r)=>{let i=new Date(B+r*z).getDay()%6==0,a=e*(1+r/300)*(i?.6:1)*(.9+t()*.2);return[new Date(B+r*z),Math.round(a)]});return[{name:e(`pageViews`),data:n(42e3)},{name:e(`sessions`),data:n(18e3)}]},[e]),a=(0,R.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),o=(0,R.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]);return(0,Ae.jsx)(d,{series:i,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>a.format(e)},height:300,ariaLabel:e(`trafficAria`)})}var R,Ae,z,B;function je(){return(je=e((()=>{R=t(),i(),f(),Ae=n(),z=864e5,B=new Date(2026,0,1).getTime()})))()}function Me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,V.useMemo)(()=>[{name:e(`visitors`),data:Pe}],[e]),a=(0,V.useMemo)(()=>[{type:`line`,axis:`x`,value:W,color:`var(--success-color)`,dash:[4,4],label:e(`launch`)},{type:`rect`,x0:G[0],x1:G[1],color:`var(--danger-color)`,opacity:.12,label:e(`outage`),labelPosition:`top-right`}],[e]),o=(0,V.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]),s=(0,V.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,Ne.jsx)(d,{series:i,annotations:a,area:!0,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>s.format(e)},height:300,ariaLabel:e(`eventsAria`)})}var V,Ne,H,U,W,G,Pe;function Fe(){return(Fe=e((()=>{V=t(),i(),f(),Ne=n(),H=864e5,U=new Date(2026,2,1).getTime(),W=U+34*H,G=[U+61*H,U+64*H],Pe=Array.from({length:90},(e,t)=>{let n=U+t*H,r=new Date(n).getDay(),i=r===0||r===6?.7:1,a=t>=34?1.35+1.4*Math.exp(-(t-34)/3):1,o=n>=G[0]&&n<G[1]?.35:1,s=8200*i*a*o*(1+Math.sin(t*1.7)/20);return[n,Math.round(s)]})})))()}function Ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,K.useRef)(null),[o,s]=(0,K.useState)(`all`),l=(0,K.useMemo)(()=>[{name:e(`close`),data:X}],[e]),u=(0,K.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),ee=(0,K.useMemo)(()=>new Intl.DateTimeFormat(n,{year:`numeric`,month:`short`,day:`numeric`}),[n]),te=e=>{s(e);let t=Y-(Q[e]-1)*J,n=X.filter(([e])=>e>=t).map(([,e])=>e),r=Math.min(...n),a=Math.max(...n),o=(a-r)*.08;i.current?.setView({x:[t,Y],y:[r-o,a+o]})};return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsx)(a,{"aria-label":e(`period`),direction:`horizontal`,value:o,onChange:e=>te(e),children:Object.keys(Q).map(t=>(0,q.jsx)(c,{value:t,label:e(`ranges.${t}`)},t))}),(0,q.jsx)(d,{ref:i,series:l,area:!0,xAxis:{type:`time`,format:e=>ee.format(e)},yAxis:{format:e=>u.format(e)},height:300,ariaLabel:e(`priceAria`)})]})}var K,q,J,Y,Re,ze,X,Z,Q;function Be(){return(Be=e((()=>{K=t(),i(),o(),s(),f(),q=n(),J=864e5,Y=new Date(2026,9,30).getTime(),Re=730,ze=Ie(7),X=[],Z=84;for(let e=729;e>=0;e--)Z*=1+(ze()-.48)*.035,X.push([Y-e*J,Math.round(Z*100)/100]);Q={"1m":30,"3m":91,"6m":182,"1y":365,all:Re}})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AreaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(3);
    const data: number[] = [];
    let used = 120;
    for (let day = 0; day < 60; day++) {
      used += random() * 12;
      data.push(Math.round(used));
    }
    return [{ name: t("storage"), data, opacity: 0.25 }];
  }, [t]);
  // "512 GB", "512 Go", ...
  const gigabytes = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "gigabyte" }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      area
      xAxis={{ title: t("day") }}
      yAxis={{ zero: true, format: (value) => gigabytes.format(value) }}
      height={280}
      ariaLabel={t("storageAria")}
    />
  );
}
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

const thisWeek = [1200, 1350, 1280, 1490, 1610, 980, 870];
const lastWeek = [1100, 1180, 1250, 1300, 1420, 1010, 760];

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const days = weekdays(locale);
    return [
      {
        name: t("thisWeek"),
        data: days.map((day, i) => [day, thisWeek[i]] as const),
      },
      {
        name: t("lastWeek"),
        data: days.map((day, i) => [day, lastWeek[i]] as const),
      },
    ];
  }, [t, locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      yAxis={{ format: (value) => number.format(value) }}
      height={280}
      ariaLabel={t("visitorsAria")}
    />
  );
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartCurve,
  type ChartSeries,
} from "minerva-design/charts";

// Average monthly temperatures (°C), January to December
const lisbon = [
  11.6, 12.6, 14.9, 16.2, 18.8, 21.9, 23.6, 24.0, 22.6, 19.4, 15.3, 12.7,
];
const oslo = [
  -4.3, -4.0, -0.2, 4.5, 10.8, 15.2, 16.4, 15.2, 10.8, 5.0, 0.6, -3.2,
];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

const CURVES: ChartCurve[] = ["linear", "smooth", "step"];

export default function CurvesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [curve, setCurve] = useState<ChartCurve>("smooth");

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("lisbon"),
        data: months.map((m, i) => [m, lisbon[i]] as const),
      },
      { name: t("oslo"), data: months.map((m, i) => [m, oslo[i]] as const) },
    ];
  }, [t, locale]);
  // "12 °C" with the reader's decimal separator
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("curve")}
        direction="horizontal"
        value={curve}
        onChange={(value) => setCurve(value as ChartCurve)}
      >
        {CURVES.map((value) => (
          <Radio key={value} value={value} label={t(\`curves.\${value}\`)} />
        ))}
      </RadioGroup>
      <LineChart
        series={series}
        curve={curve}
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("temperatureAria")}
      />
    </div>
  );
}
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

// Hourly temperatures (°C); \`null\` = no reading, the line is interrupted
const indoor = [
  20.8,
  20.6,
  20.4,
  20.3,
  20.1,
  20.0,
  20.4,
  21.0,
  21.6,
  21.9,
  null,
  null,
  null,
  22.8,
  23.0,
  23.1,
  22.9,
  22.6,
  22.3,
  22.0,
  21.7,
  21.4,
  21.2,
  21.0,
];
const outdoor = [
  9.1,
  8.7,
  8.2,
  7.9,
  7.6,
  7.4,
  8.0,
  9.3,
  11.2,
  13.0,
  14.6,
  15.9,
  16.8,
  17.4,
  17.6,
  17.2,
  null,
  null,
  14.1,
  12.8,
  11.7,
  10.9,
  10.2,
  9.6,
];
const hours = Array.from({ length: 24 }, (_, hour) => hour);

export default function GapsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // the time of day in the reader's language: "14:00", "2 PM"...
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 0, 1, hour));
    return [
      {
        name: t("indoor"),
        data: hours.map((hour) => [label(hour), indoor[hour]] as const),
      },
      {
        name: t("outdoor"),
        data: hours.map((hour) => [label(hour), outdoor[hour]] as const),
      },
    ];
  }, [t, locale]);
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        curve="smooth"
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("gapsAria")}
      />
      <p>{t("gapsNote")}</p>
    </div>
  );
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
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

const COUNT = 1_000_000;
const START = Date.UTC(2026, 0, 1);

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Columns of typed arrays: no per-point objects, sorted x (one sample per second)
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(2026);
    const x = new Float64Array(COUNT);
    const y = new Float64Array(COUNT);
    let value = 100;
    for (let i = 0; i < COUNT; i++) {
      value += (random() - 0.5) * 0.4;
      x[i] = START + i * 1000;
      y[i] = value;
    }
    return [{ name: t("sensor"), data: { x, y }, lineWidth: 1 }];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        xAxis={{ type: "time" }}
        onRendererChange={setRenderer}
        height={300}
        ariaLabel={t("sensorAria")}
      />
      <p role="status">
        {t("largeStatus", {
          points: new Intl.NumberFormat(i18n.language).format(COUNT),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { LineChart, type ChartSeries } from "minerva-design/charts";

// Monthly cloud spend by service (USD), January to December
const spend = {
  compute: [
    18_400, 19_100, 20_600, 21_000, 22_800, 24_100, 23_500, 25_900, 27_200,
    28_000, 29_400, 31_800,
  ],
  storage: [
    6_200, 6_500, 6_900, 7_400, 7_800, 8_300, 8_900, 9_400, 9_800, 10_500,
    11_100, 11_900,
  ],
  network: [
    3_100, 2_900, 3_600, 4_200, 3_800, 4_600, 5_300, 4_900, 5_200, 5_800, 6_400,
    7_100,
  ],
  databases: [
    9_800, 9_900, 10_200, 10_100, 10_800, 11_200, 11_000, 11_600, 12_100,
    12_400, 12_300, 12_900,
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
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [mode, setMode] = useState("stacked");
  const percent = mode === "percent";

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    // full amounts in the tooltip, also in 100% mode
    const amount = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const names = {
      compute: t("services.compute"),
      storage: t("services.storage"),
      network: t("services.network"),
      databases: t("services.databases"),
    };
    return (Object.keys(spend) as (keyof typeof spend)[]).map((key) => ({
      name: names[key],
      format: (value: number) => amount.format(value),
      data: months.map((month, i) => [month, spend[key][i]] as const),
    }));
  }, [t, locale]);
  // "$32K", "32 k $US", "3.2万 US$"... depending on the language
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("stackMode")}
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(String(value))}
      >
        <Radio value="stacked" label={t("stacked")} />
        <Radio value="percent" label="100%" />
      </RadioGroup>
      <LineChart
        series={series}
        area
        stacked
        percent={percent}
        // a y format replaces the percent ticks: only set it for amounts
        yAxis={percent ? undefined : { format: (v) => usd.format(v) }}
        height={300}
        ariaLabel={t("spendAria")}
      />
    </div>
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const MINUTE = 60 * 1000;
// 08:00 local time: the time axis places its ticks in local time
const START = new Date(2026, 9, 12, 8).getTime();
const TARGET = 300; // ms, p95 objective
const CRITICAL = 450; // ms

// API latency every 5 minutes over 6 hours, with an incident around 11:00
const latency = (base: number, spread: number) =>
  Array.from({ length: 72 }, (_, i) => {
    const incident = Math.max(0, 1 - Math.abs(i - 36) / 6);
    const noise = Math.sin(i * 1.3) * 0.08 + Math.cos(i * 0.7) * 0.05;
    return [
      START + i * 5 * MINUTE,
      Math.round(base * (1 + noise) + spread * incident),
    ] as const;
  });
const p50 = latency(120, 140);
const p95 = latency(240, 330);

export default function ThresholdsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("median"), data: p50 },
      { name: t("p95"), data: p95 },
    ],
    [t],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: CRITICAL,
        color: "var(--danger-color)",
        opacity: 0.1,
        label: t("critical"),
      },
      {
        type: "line",
        axis: "y",
        value: TARGET,
        color: "var(--warning-color)",
        dash: [6, 4],
        label: t("target", { value: ms.format(TARGET) }),
      },
    ],
    [t, ms],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      annotations={annotations}
      crosshair
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ min: 0, max: 700, format: (value) => ms.format(value) }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

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
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 0, 1).getTime();

export default function TimeSeriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(11);
    const daily = (base: number) =>
      Array.from({ length: 180 }, (_, i) => {
        const weekend = new Date(START + i * DAY).getDay() % 6 === 0;
        const trend = base * (1 + i / 300);
        const value = trend * (weekend ? 0.6 : 1) * (0.9 + random() * 0.2);
        return [new Date(START + i * DAY), Math.round(value)] as const;
      });
    return [
      { name: t("pageViews"), data: daily(42_000) },
      { name: t("sessions"), data: daily(18_000) },
    ];
  }, [t]);

  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  // "12 Mar", "3月12日", "12 mars"...: used by the ticks and the tooltip
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => compact.format(value) }}
      height={300}
      ariaLabel={t("trafficAria")}
    />
  );
}
`})))()}var rt;function it(){return(it=e((()=>{rt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const DAY = 24 * 60 * 60 * 1000;
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 2, 1).getTime();
const LAUNCH = START + 34 * DAY;
const OUTAGE = [START + 61 * DAY, START + 64 * DAY] as const;

// Daily unique visitors over 90 days: weekly rhythm, a launch spike and an outage
const visitors = Array.from({ length: 90 }, (_, i) => {
  const time = START + i * DAY;
  const weekday = new Date(time).getDay();
  const weekly = weekday === 0 || weekday === 6 ? 0.7 : 1;
  const launch = i >= 34 ? 1.35 + 1.4 * Math.exp(-(i - 34) / 3) : 1;
  const outage = time >= OUTAGE[0] && time < OUTAGE[1] ? 0.35 : 1;
  const value = 8200 * weekly * launch * outage * (1 + Math.sin(i * 1.7) / 20);
  return [time, Math.round(value)] as const;
});

export default function TrafficEventsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("visitors"), data: visitors }],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "x",
        value: LAUNCH,
        color: "var(--success-color)",
        dash: [4, 4],
        label: t("launch"),
      },
      {
        type: "rect",
        x0: OUTAGE[0],
        x1: OUTAGE[1],
        color: "var(--danger-color)",
        opacity: 0.12,
        label: t("outage"),
        labelPosition: "top-right",
      },
    ],
    [t],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      annotations={annotations}
      area
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => number.format(value) }}
      height={300}
      ariaLabel={t("eventsAria")}
    />
  );
}
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartHandle,
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
// local midnight: the time axis places its ticks in local time
const END = new Date(2026, 9, 30).getTime();
const DAYS = 2 * 365;

// Two years of daily closing prices (a random walk with a slight upward drift)
const random = mulberry32(7);
const closes: [number, number][] = [];
let price = 84;
for (let i = DAYS - 1; i >= 0; i--) {
  price *= 1 + (random() - 0.48) * 0.035;
  closes.push([END - i * DAY, Math.round(price * 100) / 100]);
}

const RANGES = { "1m": 30, "3m": 91, "6m": 182, "1y": 365, all: DAYS } as const;
type Range = keyof typeof RANGES;

export default function ZoomDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [range, setRange] = useState<Range>("all");

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("close"), data: closes }],
    [t],
  );
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  const select = (next: Range) => {
    setRange(next);
    // the visible window, with the y range fitted to the prices inside it
    const from = END - (RANGES[next] - 1) * DAY;
    const visible = closes.filter(([time]) => time >= from).map(([, y]) => y);
    const low = Math.min(...visible);
    const high = Math.max(...visible);
    const margin = (high - low) * 0.08;
    chart.current?.setView({
      x: [from, END],
      y: [low - margin, high + margin],
    });
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={range}
        onChange={(value) => select(value as Range)}
      >
        {(Object.keys(RANGES) as Range[]).map((key) => (
          <Radio key={key} value={key} label={t(\`ranges.\${key}\`)} />
        ))}
      </RadioGroup>
      <LineChart
        ref={chart}
        series={series}
        area
        xAxis={{ type: "time", format: (value) => date.format(value) }}
        yAxis={{ format: (value) => usd.format(value) }}

        height={300}
        ariaLabel={t("priceAria")}
      />
    </div>
  );
}
`})))()}var st,ct,lt;function $(){return($=e((()=>{h(),le(),me(),ve(),D(),M(),De(),je(),Fe(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),it(),ot(),t(),u(),te(),st=n(),ct=l(Object.assign({"./demos/area.tsx":re,"./demos/basic.tsx":ie,"./demos/curves.tsx":ue,"./demos/gaps.tsx":he,"./demos/large-data.tsx":be,"./demos/stacked.tsx":xe,"./demos/thresholds.tsx":Se,"./demos/time-series.tsx":ke,"./demos/traffic-events.tsx":Me,"./demos/zoom.tsx":Le}),Object.assign({"./demos/area.tsx":Ve,"./demos/basic.tsx":Ue,"./demos/curves.tsx":Ge,"./demos/gaps.tsx":qe,"./demos/large-data.tsx":Ye,"./demos/stacked.tsx":Ze,"./demos/thresholds.tsx":$e,"./demos/time-series.tsx":tt,"./demos/traffic-events.tsx":rt,"./demos/zoom.tsx":at})),lt=()=>(0,st.jsx)(ee,{id:`line-chart`,demos:ct})})))()}$();export{lt as default};