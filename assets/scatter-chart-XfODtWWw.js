import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{l as a,n as o,t as ee,u as te}from"./DocPage-4JD4uRu8.js";import{h as s,m as c}from"./charts-BHPM8b2-.js";function ne(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,l.useMemo)(()=>[{name:e(`starter`),data:p},{name:e(`business`),data:m}],[e]),a=(0,l.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),[n]);return(0,u.jsx)(s,{series:i,xAxis:{title:e(`seats`)},yAxis:{title:e(`monthlyBill`),format:e=>a.format(e)},height:300,ariaLabel:e(`billAria`)})}var l,u,d,f,p,m;function h(){return(h=e((()=>{l=t(),i(),c(),u=n(),d=ne(9),f=(e,t)=>Array.from({length:40},()=>{let n=1+Math.round(d()*49);return[n,Math.round(e+n*t*(.8+d()*.4))]}),p=f(20,9),m=f(60,14)})))()}function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,g.useMemo)(()=>[{name:e(`penguins.adelie`),data:x,opacity:.8},{name:e(`penguins.chinstrap`),data:S,opacity:.8},{name:e(`penguins.gentoo`),data:C,opacity:.8}],[e]),a=(0,g.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`}),[n]),o=(0,g.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`kilogram`,maximumFractionDigits:1}),[n]);return(0,_.jsx)(s,{series:i,xAxis:{title:e(`flipper`),format:e=>a.format(e)},yAxis:{title:e(`mass`),format:e=>o.format(e/1e3)},height:320,ariaLabel:e(`penguinsAria`)})}var g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{g=t(),i(),c(),_=n(),v=ie(3),y=()=>Math.sqrt(-2*Math.log(1-v()))*Math.cos(2*Math.PI*v()),b=(e,t,n)=>Array.from({length:n},()=>{let n=y();return[Math.round(e+n*6+y()*2),Math.round(t+n*380+y()*160)]}),x=b(190,3700,70),S=b(196,3730,45),C=b(217,5080,60)})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,T.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`});return[{name:e(`countries`),showLabels:!0,opacity:.7,data:E.map(([e,n,r,i])=>({x:n,y:r,label:t.of(e)??e,size:6+Math.sqrt(i)*.6}))}]},[e,n]),a=(0,T.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),o=(0,T.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`year`,maximumFractionDigits:1}),[n]);return(0,se.jsx)(s,{series:i,xAxis:{title:e(`gdp`),format:e=>a.format(e*1e3)},yAxis:{title:e(`lifeExpectancy`),format:e=>o.format(e)},height:320,ariaLabel:e(`countriesAria`)})}var T,se,E;function D(){return(D=e((()=>{T=t(),i(),c(),se=n(),E=[[`JP`,34,84.5,124],[`DE`,52,81.2,84],[`FR`,44,82.5,68],[`US`,80,78.4,335],[`BR`,10,75.9,216],[`IN`,2.5,70.8,1430],[`CN`,12.6,78.6,1410],[`NG`,1.6,54.5,224],[`MX`,13.9,75.1,128],[`ID`,4.9,71.9,278]]})))()}function ce(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),[n,i]=(0,O.useState)(null),a=(0,O.useMemo)(()=>{let t=ce(1),n=()=>Math.sqrt(-2*Math.log(1-t()))*Math.cos(2*Math.PI*t()),r=(e,t,r,i)=>{let a=new Float64Array(A),o=new Float64Array(A);for(let e=0;e<A;e++)a[e]=t+n()*i,o[e]=r+n()*i;return{name:e,data:{x:a,y:o},pointSize:3,opacity:.5}};return[r(e(`cluster`,{name:`A`}),-2,-1,1.2),r(e(`cluster`,{name:`B`}),2.5,1.5,.9)]},[e]);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,k.jsx)(s,{series:a,onRendererChange:i,height:320,ariaLabel:e(`clustersAria`)}),(0,k.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{points:new Intl.NumberFormat(t.language).format(A*2),renderer:n??`…`})})]})}var O,k,A;function j(){return(j=e((()=>{O=t(),i(),c(),k=n(),A=1e5})))()}function ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>[{name:e(`requests`),data:L.map(t=>R(t)?{x:t.size,y:t.time,color:`var(--danger-color)`,size:11,label:e(`outlier`)}:{x:t.size,y:t.time}),opacity:.6,pointSize:6},{name:e(`expected`),type:`line`,lineWidth:1.5,color:`var(--text-secondary-color)`,data:[[0,P(0)],[500,P(500)]]}],[e]),a=(0,M.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`kilobyte`}),[n]),o=(0,M.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`}),[n]);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,N.jsx)(s,{series:i,xAxis:{title:e(`payload`),format:e=>a.format(e)},yAxis:{title:e(`responseTime`),format:e=>o.format(e)},height:320,ariaLabel:e(`outliersAria`)}),(0,N.jsx)(`p`,{children:e(`outliersSummary`,{slow:z,total:L.length})})]})}var M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{M=t(),i(),c(),N=n(),P=e=>40+e*.6,F=2,I=ue(17),L=Array.from({length:300},(e,t)=>{let n=Math.round(5+I()*495),r=t%37==0?2.4+I()*2:1,i=P(n)*(.75+I()*.5)*r;return{size:n,time:Math.round(i)}}),R=({size:e,time:t})=>t>P(e)*F,z=L.filter(R).length})))()}function fe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,V.useMemo)(()=>[{name:e(`campaigns`),data:W,opacity:.75},{name:e(`trend`),type:`line`,lineWidth:2,color:`var(--danger-color)`,data:[[0,Q],[32,Q+Z*32]]}],[e]),a=(0,V.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),o=new Intl.NumberFormat(n,{maximumFractionDigits:2});return(0,H.jsx)(s,{series:i,xAxis:{title:e(`adSpend`),min:0,max:32,format:a},yAxis:{title:e(`revenue`),format:a},annotations:[{type:`text`,x:1,y:me,anchor:`left`,text:e(`fit`,{r2:o.format($),slope:o.format(Z)})}],height:320,ariaLabel:e(`trendAria`)})}var V,H,U,W,G,K,q,J,Y,X,Z,Q,$,me;function he(){return(he=e((()=>{V=t(),i(),c(),H=n(),U=fe(42),W=Array.from({length:60},()=>{let e=2+U()*28;return[e,15+e*3.1+(U()-.5)*30]}),G=W.length,K=W.reduce((e,[t])=>e+t,0)/G,q=W.reduce((e,[,t])=>e+t,0)/G,J=W.reduce((e,[t,n])=>e+(t-K)*(n-q),0),Y=W.reduce((e,[t])=>e+(t-K)**2,0),X=W.reduce((e,[,t])=>e+(t-q)**2,0),Z=J/Y,Q=q-Z*K,$=J*J/(Y*X),me=Math.max(...W.map(([,e])=>e))})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Customers of two plans: seats against monthly bill (USD)
const random = mulberry32(9);
const plan = (price: number, slope: number) =>
  Array.from({ length: 40 }, () => {
    const seats = 1 + Math.round(random() * 49);
    return [
      seats,
      Math.round(price + seats * slope * (0.8 + random() * 0.4)),
    ] as const;
  });
const starter = plan(20, 9);
const business = plan(60, 14);

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("starter"), data: starter },
      { name: t("business"), data: business },
    ],
    [t],
  );
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("seats") }}
      yAxis={{ title: t("monthlyBill"), format: (value) => usd.format(value) }}
      height={300}
      ariaLabel={t("billAria")}
    />
  );
}
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(3);
const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());

// Flipper length (mm) and body mass (g) of three penguin species
const species = (flipper: number, mass: number, count: number) =>
  Array.from({ length: count }, () => {
    const size = gaussian();
    return [
      Math.round(flipper + size * 6 + gaussian() * 2),
      Math.round(mass + size * 380 + gaussian() * 160),
    ] as const;
  });
const adelie = species(190, 3700, 70);
const chinstrap = species(196, 3730, 45);
const gentoo = species(217, 5080, 60);

export default function CategoriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  // one series per category: its own color, legend entry and toggle
  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("penguins.adelie"), data: adelie, opacity: 0.8 },
      { name: t("penguins.chinstrap"), data: chinstrap, opacity: 0.8 },
      { name: t("penguins.gentoo"), data: gentoo, opacity: 0.8 },
    ],
    [t],
  );
  const mm = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );
  const kg = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "kilogram",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("flipper"), format: (value) => mm.format(value) }}
      yAxis={{ title: t("mass"), format: (value) => kg.format(value / 1000) }}
      height={320}
      ariaLabel={t("penguinsAria")}
    />
  );
}
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// Country code, GDP per capita (k$), life expectancy (years), population (millions)
const countries: [string, number, number, number][] = [
  ["JP", 34, 84.5, 124],
  ["DE", 52, 81.2, 84],
  ["FR", 44, 82.5, 68],
  ["US", 80, 78.4, 335],
  ["BR", 10, 75.9, 216],
  ["IN", 2.5, 70.8, 1430],
  ["CN", 12.6, 78.6, 1410],
  ["NG", 1.6, 54.5, 224],
  ["MX", 13.9, 75.1, 128],
  ["ID", 4.9, 71.9, 278],
];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return [
      {
        name: t("countries"),
        showLabels: true,
        opacity: 0.7,
        data: countries.map(([code, x, y, population]) => ({
          x,
          y,
          label: names.of(code) ?? code,
          size: 6 + Math.sqrt(population) * 0.6,
        })),
      },
    ];
  }, [t, locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );
  const years = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "year",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{
        title: t("gdp"),
        format: (value) => usd.format(value * 1000),
      }}
      yAxis={{
        title: t("lifeExpectancy"),
        format: (value) => years.format(value),
      }}
      height={320}
      ariaLabel={t("countriesAria")}
    />
  );
}
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScatterChart,
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

const PER_CLUSTER = 100_000;

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(1);
    // Box-Muller: normally distributed values
    const gaussian = () =>
      Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
    const cluster = (name: string, cx: number, cy: number, spread: number) => {
      const x = new Float64Array(PER_CLUSTER);
      const y = new Float64Array(PER_CLUSTER);
      for (let i = 0; i < PER_CLUSTER; i++) {
        x[i] = cx + gaussian() * spread;
        y[i] = cy + gaussian() * spread;
      }
      return { name, data: { x, y }, pointSize: 3, opacity: 0.5 };
    };
    return [
      cluster(t("cluster", { name: "A" }), -2, -1, 1.2),
      cluster(t("cluster", { name: "B" }), 2.5, 1.5, 0.9),
    ];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        onRendererChange={setRenderer}
        height={320}
        ariaLabel={t("clustersAria")}
      />
      <p role="status">
        {t("largeStatus", {
          points: new Intl.NumberFormat(i18n.language).format(PER_CLUSTER * 2),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Expected response time (ms) for a payload size (KB)
const expected = (size: number) => 40 + size * 0.6;
const TOLERANCE = 2; // slower than 2× the expected time = outlier

const random = mulberry32(17);
const requests = Array.from({ length: 300 }, (_, i) => {
  const size = Math.round(5 + random() * 495);
  const slow = i % 37 === 0 ? 2.4 + random() * 2 : 1;
  const time = expected(size) * (0.75 + random() * 0.5) * slow;
  return { size, time: Math.round(time) };
});
const isOutlier = ({ size, time }: { size: number; time: number }) =>
  time > expected(size) * TOLERANCE;
const outlierCount = requests.filter(isOutlier).length;

export default function OutliersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("requests"),
        // outliers are bigger and red
        data: requests.map((request) =>
          isOutlier(request)
            ? {
                x: request.size,
                y: request.time,
                color: "var(--danger-color)",
                size: 11,
                label: t("outlier"),
              }
            : { x: request.size, y: request.time },
        ),
        opacity: 0.6,
        pointSize: 6,
      },
      {
        name: t("expected"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        data: [
          [0, expected(0)],
          [500, expected(500)],
        ],
      },
    ],
    [t],
  );
  const kb = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte" }),
    [locale],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        xAxis={{ title: t("payload"), format: (value) => kb.format(value) }}
        yAxis={{
          title: t("responseTime"),
          format: (value) => ms.format(value),
        }}
        height={320}
        ariaLabel={t("outliersAria")}
      />
      <p>
        {t("outliersSummary", { slow: outlierCount, total: requests.length })}
      </p>
    </div>
  );
}
`})))()}var Ee;function De(){return(De=e((()=>{Ee=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Weekly ad spend against revenue (thousand USD) for 60 campaigns
const random = mulberry32(42);
const campaigns = Array.from({ length: 60 }, () => {
  const spend = 2 + random() * 28;
  return [spend, 15 + spend * 3.1 + (random() - 0.5) * 30] as const;
});

// Least-squares fit y = a + b·x and the coefficient of determination
const n = campaigns.length;
const meanX = campaigns.reduce((sum, [x]) => sum + x, 0) / n;
const meanY = campaigns.reduce((sum, [, y]) => sum + y, 0) / n;
const sxy = campaigns.reduce((s, [x, y]) => s + (x - meanX) * (y - meanY), 0);
const sxx = campaigns.reduce((s, [x]) => s + (x - meanX) ** 2, 0);
const syy = campaigns.reduce((s, [, y]) => s + (y - meanY) ** 2, 0);
const slope = sxy / sxx;
const intercept = meanY - slope * meanX;
const r2 = (sxy * sxy) / (sxx * syy);
const top = Math.max(...campaigns.map(([, y]) => y));

export default function TrendDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("campaigns"), data: campaigns, opacity: 0.75 },
      {
        name: t("trend"),
        type: "line",
        lineWidth: 2,
        color: "var(--danger-color)",
        data: [
          [0, intercept],
          [32, intercept + slope * 32],
        ],
      },
    ],
    [t],
  );
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("adSpend"), min: 0, max: 32, format: usd }}
      yAxis={{ title: t("revenue"), format: usd }}
      annotations={[
        {
          type: "text",
          x: 1,
          y: top,
          anchor: "left",
          text: t("fit", {
            r2: decimal.format(r2),
            slope: decimal.format(slope),
          }),
        },
      ]}
      height={320}
      ariaLabel={t("trendAria")}
    />
  );
}
`})))()}var Oe,ke,Ae;function je(){return(je=e((()=>{h(),w(),D(),j(),B(),he(),_e(),ye(),xe(),Ce(),Te(),De(),t(),o(),te(),Oe=n(),ke=a(Object.assign({"./demos/basic.tsx":re,"./demos/categories.tsx":ae,"./demos/labels.tsx":oe,"./demos/large-data.tsx":le,"./demos/outliers.tsx":de,"./demos/trend.tsx":pe}),Object.assign({"./demos/basic.tsx":ge,"./demos/categories.tsx":ve,"./demos/labels.tsx":be,"./demos/large-data.tsx":Se,"./demos/outliers.tsx":we,"./demos/trend.tsx":Ee})),Ae=()=>(0,Oe.jsx)(ee,{id:`scatter-chart`,demos:ke})})))()}je();export{Ae as default};