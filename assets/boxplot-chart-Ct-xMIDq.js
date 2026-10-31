import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{D as p,T as m,v as h}from"./angular-preview-DXuT9H-w.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-BNEhhzRL.js";import{d as g,m as _}from"./charts-JJDQ3gS7.js";function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,[i,a]=(0,v.useState)(!0),o=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`kilobyte`,maximumSignificantDigits:3}),t=new Intl.NumberFormat(n,{style:`unit`,unit:`megabyte`,maximumSignificantDigits:3});return n=>n>=1e3?t.format(n/1e3):e.format(n)},[n]),s=(0,v.useMemo)(()=>x.map(([t],n)=>({x:e(`assetTypes.${t}`),values:S[n]??[]})),[e]),c=(0,v.useMemo)(()=>S.flatMap(e=>[...e]).filter(e=>e>b).length,[]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,y.jsx)(f,{checked:i,onChange:a,label:e(`logScale`)}),(0,y.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`overBudget`,{value:new Intl.NumberFormat(n).format(c),budget:o(b)})})]}),(0,y.jsx)(g,{groups:s,name:e(`fileSize`),yAxis:i?{type:`log`,min:.5,max:1e5,format:o}:{min:0,format:o},annotations:[{type:`line`,axis:`y`,value:b,color:`var(--warning-color)`,dash:[4,4],label:e(`budget`)}],height:340,ariaLabel:e(`assetsAria`)})]})}var v,y,b,x,S;function C(){return(C=e((()=>{v=t(),i(),d(),_(),y=n(),b=500,x=[[`styles`,18,.9],[`scripts`,45,1.1],[`fonts`,60,.5],[`images`,140,1.2],[`videos`,6e3,.9]],S=x.map(([,e,t],n)=>{let r=ie(300+n);return Float64Array.from({length:250},()=>{let n=Math.sqrt(-2*Math.log(r()||1e-12))*Math.cos(2*Math.PI*r());return e*Math.exp(t*n)})})})))()}function oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,[i,a]=(0,w.useState)(`tukey`),[o,c]=(0,w.useState)(`hollow`),l=(0,w.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`short`,maximumFractionDigits:1});return t=>e.format(t)},[n]),d=(0,w.useMemo)(()=>E.map(([t],n)=>({x:e(`pipelines.${t}`),values:D[n]??[]})),[e]),f=(0,w.useMemo)(()=>D.reduce((e,t)=>e+h(t,{whisker:O[i]}).outliers.length,0),[i]);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,T.jsxs)(s,{"aria-label":e(`whiskerRule`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,T.jsx)(u,{value:`tukey`,label:e(`whiskers.tukey`)}),(0,T.jsx)(u,{value:`wide`,label:e(`whiskers.wide`)}),(0,T.jsx)(u,{value:`minmax`,label:e(`whiskers.minmax`)})]}),(0,T.jsxs)(s,{"aria-label":e(`outlierShape`),direction:`horizontal`,value:o,onChange:e=>c(e),children:[(0,T.jsx)(u,{value:`hollow`,label:e(`shapes.hollow`)}),(0,T.jsx)(u,{value:`filled`,label:e(`shapes.filled`)})]}),(0,T.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`outlierRuns`,{value:new Intl.NumberFormat(n).format(f)})}),(0,T.jsx)(g,{groups:d,name:e(`buildTime`),whisker:O[i],outlierShape:o,outlierSize:o===`filled`?5:8,yAxis:{format:l,min:0},height:340,ariaLabel:e(`buildsAria`)})]})}var w,T,E,D,O;function ce(){return(ce=e((()=>{w=t(),i(),c(),l(),_(),m(),T=n(),E=[[`lint`,2.1,.3,.02],[`unit`,6.5,.9,.04],[`integration`,14,2.2,.06],[`e2e`,22,4,.08],[`release`,11,1.2,.12]],D=E.map(([,e,t,n],r)=>{let i=oe(500+r);return Float64Array.from({length:300},()=>{let r=Math.sqrt(-2*Math.log(i()||1e-12))*Math.cos(2*Math.PI*i()),a=i()<n?e*(.8+i()):0;return Math.max(.5,e+t*r+a)})}),O={tukey:1.5,wide:3,minmax:`minmax`}})))()}function le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,k.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,maximumFractionDigits:1});return t=>e.format(t)},[n]),a=(0,k.useMemo)(()=>[`weekdays`,`weekends`].map((t,n)=>({name:e(`periods.${t}`),format:i,data:p(fe.map((t,r)=>({x:e(`cities.${t}`),values:A(r*10+n,n?31:22+r*3)})))})),[e,i]);return(0,de.jsx)(g,{series:a,yAxis:{title:e(`hours`),zero:!0},height:320,ariaLabel:e(`deliveryAria`)})}var k,de,fe,A;function j(){return(j=e((()=>{k=t(),i(),_(),m(),de=n(),fe=[`paris`,`lyon`,`marseille`,`lille`],A=(e,t)=>{let n=le(e);return Array.from({length:400},()=>t*(.5+n()+n()**6*1.5))}})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0});return t=>e.format(t*1e3)},[n]),a=(0,M.useMemo)(()=>[{name:e(`salary`),color:`var(--chart-series-6, #8b5cf6)`,format:i,data:P.map(([t,n,r,i,a,o,s])=>({x:e(`roles.${t}`),low:n,q1:r,y:i,q3:a,high:o,outliers:s}))}],[e,i]);return(0,N.jsx)(g,{series:a,orientation:`horizontal`,yAxis:{format:i},height:300,ariaLabel:e(`salariesAria`)})}var M,N,P;function F(){return(F=e((()=>{M=t(),i(),_(),N=n(),P=[[`junior`,38,42,46,51,58,[66,71]],[`developer`,45,52,58,64,76,[88]],[`senior`,58,66,72,80,95,[110,118]],[`lead`,70,78,86,95,112,[]],[`manager`,72,84,92,104,128,[145]]]})))()}function me(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function he(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,[i,a]=(0,I.useState)(0),[s,c]=(0,I.useState)(!0);(0,I.useEffect)(()=>{if(!s)return;let e=setInterval(()=>a(e=>e+1),1e3);return()=>clearInterval(e)},[s]);let l=(0,I.useMemo)(()=>{let e=R+i*z;return V.map((t,n)=>Float64Array.from({length:R},(t,r)=>H(n,e-R+r)))},[i]),u=(0,I.useMemo)(()=>l.map(e=>h(e).q3>B),[l]),d=(0,I.useMemo)(()=>V.map(([t],n)=>({x:e(`regions.${t}`),values:l[n]??[],color:u[n]?`var(--danger-color)`:void 0})),[e,l,u]),f=(0,I.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0});return t=>e.format(t)},[n]),p=V.filter((e,t)=>u[t]).map(([t])=>e(`regions.${t}`)),m=new Intl.ListFormat(n,{type:`conjunction`});return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,L.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,L.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(e=>!e),children:e(s?`pause`:`resume`)}),(0,L.jsx)(`output`,{"aria-live":`polite`,style:{color:p.length?`var(--danger-color)`:`var(--text-secondary-color)`},children:p.length?e(`slaBreached`,{regions:m.format(p)}):e(`slaOk`)})]}),(0,L.jsx)(g,{groups:d,name:e(`latency`),yAxis:{format:f,min:0,max:1200},annotations:[{type:`line`,axis:`y`,value:B,color:`var(--danger-color)`,dash:[4,4],label:e(`sla`)}],height:340,ariaLabel:e(`regionsAria`)})]})}var I,L,R,z,B,V,H;function U(){return(U=e((()=>{I=t(),i(),a(),_(),m(),L=n(),R=200,z=20,B=300,V=[[`usEast`,120],[`usWest`,140],[`euWest`,110],[`apSouth`,190],[`saEast`,170]],H=(e,t)=>{let n=me(e*1000003+t*7919),r=Math.sqrt(-2*Math.log(n()||1e-12))*Math.cos(2*Math.PI*n());return(V[e]?.[1]??100)*(Math.sin(t/90+e*1.7)>.8?2.4:1)*Math.exp(.35*r)}})))()}function ge(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,W.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0});return t=>e.format(t)},[n]),a=(0,W.useMemo)(()=>K.map(([t],n)=>({x:e(`services.${t}`),values:q[n]??[]})),[e]);return(0,G.jsx)(g,{groups:a,name:e(`responseTime`),yAxis:{format:i},tooltip:{labels:{max:e(`stats.max`),q3:e(`stats.q3`),median:e(`stats.median`),q1:e(`stats.q1`),min:e(`stats.min`),outliers:e(`stats.outliers`)}},height:340,ariaLabel:e(`servicesAria`)})}var W,G,K,q;function J(){return(J=e((()=>{W=t(),i(),_(),G=n(),K=[[`gateway`,18,.35],[`auth`,32,.3],[`search`,95,.45],[`checkout`,140,.38],[`recommendations`,210,.5],[`images`,60,.6]],q=K.map(([,e,t],n)=>{let r=ge(100+n);return Float64Array.from({length:2e3},()=>{let n=Math.sqrt(-2*Math.log(r()||1e-12))*Math.cos(2*Math.PI*r());return e*Math.exp(t*n)})})})))()}function ve(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,i=(0,Y.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),a=(0,Y.useMemo)(()=>{let t=Array.from({length:12},(e,t)=>new Intl.DateTimeFormat(n,{month:`short`}).format(new Date(2026,t,1))),r=xe.map(e=>h(e,{whisker:`minmax`}));return[{name:e(`dailyHigh`),color:`var(--chart-series-4, #ef4444)`,format:i,data:r.map((e,n)=>({x:t[n],low:e.low,q1:e.q1,y:e.median,q3:e.q3,high:e.high}))},{name:e(`mean`),type:`line`,curve:`smooth`,color:`var(--text-secondary-color, #6b7280)`,lineWidth:1.5,format:i,data:r.map((e,n)=>[t[n]??``,e.mean])}]},[e,n,i]);return(0,be.jsx)(g,{series:a,yAxis:{format:i},height:320,ariaLabel:e(`temperaturesAria`)})}var Y,be,xe;function Se(){return(Se=e((()=>{Y=t(),i(),_(),m(),be=n(),xe=Array.from({length:12},(e,t)=>{let n=ve(t+1),r=13-9*Math.cos((t+.5)/12*Math.PI*2);return Array.from({length:900},()=>r+(n()+n()+n()-1.5)*6)})})))()}function Ce(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function we(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.boxplot-chart.data`}),n=t.language,[i,a]=(0,X.useState)(null),o=(0,X.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`short`,maximumFractionDigits:0});return t=>e.format(t)},[n]),s=(0,X.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{weekday:`long`,timeZone:`UTC`});return Te.map((t,n)=>({x:e.format(Date.UTC(2024,0,1+n)),values:t}))},[n]),c=e=>{let t=e.items[0];t&&a({day:Math.round(e.x),outlier:t.outlier,median:t.y,q1:t.q1??t.y,q3:t.q3??t.y,outliers:t.outliers??0})},l=i?String(s[i.day]?.x??``):``,u=i?i.outlier===void 0?e(`boxClicked`,{day:l,median:o(i.median),q1:o(i.q1),q3:o(i.q3),outliers:new Intl.NumberFormat(n).format(i.outliers)}):e(`outlierClicked`,{day:l,value:o(i.outlier)}):e(`clickBox`);return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:u}),(0,Z.jsx)(g,{groups:s,name:e(`wait`),outlierShape:`filled`,yAxis:{format:o,min:0,title:e(`wait`)},annotations:[{type:`rect`,y0:Q,color:`var(--danger-color)`,opacity:.06},{type:`line`,axis:`y`,value:Q,color:`var(--danger-color)`,dash:[4,4],label:e(`fourHours`)}],onPointClick:c,onPlotClick:()=>a(null),height:340,ariaLabel:e(`waitsAria`)})]})}var X,Z,Q,Te;function Ee(){return(Ee=e((()=>{X=t(),i(),_(),Z=n(),Q=240,Te=[150,120,110,115,125,140,160].map((e,t)=>{let n=Ce(900+t);return Float64Array.from({length:400},()=>{let t=Math.sqrt(-2*Math.log(n()||1e-12))*Math.cos(2*Math.PI*n());return Math.round(e*Math.exp(.42*t))})})})))()}var De;function Oe(){return(Oe=e((()=>{De=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
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

const BUDGET = 500; // kB per file

// Size (kB) of the files a website serves, by type: from 1 kB icons to
// 40 MB videos, log-normal in every type
const types = [
  ["styles", 18, 0.9],
  ["scripts", 45, 1.1],
  ["fonts", 60, 0.5],
  ["images", 140, 1.2],
  ["videos", 6000, 0.9],
] as const;
const sizes = types.map(([, median, spread], i) => {
  const random = mulberry32(300 + i);
  return Float64Array.from({ length: 250 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function AssetSizesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [log, setLog] = useState(true);

  // kilobytes below 1,000 kB, megabytes above
  const bytes = useMemo(() => {
    const kb = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "kilobyte",
      maximumSignificantDigits: 3,
    });
    const mb = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabyte",
      maximumSignificantDigits: 3,
    });
    return (value: number) =>
      value >= 1000 ? mb.format(value / 1000) : kb.format(value);
  }, [locale]);
  const groups = useMemo(
    (): BoxplotGroup[] =>
      types.map(([key], i) => ({
        x: t(\`assetTypes.\${key}\`),
        values: sizes[i] ?? [],
      })),
    [t],
  );
  const overBudget = useMemo(
    () =>
      sizes.flatMap((values) => [...values]).filter((v) => v > BUDGET).length,
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Switch checked={log} onChange={setLog} label={t("logScale")} />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("overBudget", {
            value: new Intl.NumberFormat(locale).format(overBudget),
            budget: bytes(BUDGET),
          })}
        </output>
      </div>
      <BoxPlotChart
        groups={groups}
        name={t("fileSize")}
        // on a linear axis the small files are crushed against zero
        yAxis={
          log
            ? { type: "log", min: 0.5, max: 100_000, format: bytes }
            : { min: 0, format: bytes }
        }
        annotations={[
          {
            type: "line",
            axis: "y",
            value: BUDGET,
            color: "var(--warning-color)",
            dash: [4, 4],
            label: t("budget"),
          },
        ]}
        height={340}
        ariaLabel={t("assetsAria")}
      />
    </div>
  );
}
`})))()}var ke;function Ae(){return(Ae=e((()=>{ke=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  BoxPlotChart,
  boxplotStats,
  type BoxplotGroup,
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

// 300 CI runs (minutes) of every pipeline over a month: a typical duration,
// a spread, and a share of runs that miss the cache and take much longer
const pipelines = [
  ["lint", 2.1, 0.3, 0.02],
  ["unit", 6.5, 0.9, 0.04],
  ["integration", 14, 2.2, 0.06],
  ["e2e", 22, 4, 0.08],
  ["release", 11, 1.2, 0.12],
] as const;
const runs = pipelines.map(([, typical, spread, misses], p) => {
  const random = mulberry32(500 + p);
  return Float64Array.from({ length: 300 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const miss = random() < misses ? typical * (0.8 + random()) : 0;
    return Math.max(0.5, typical + spread * z + miss);
  });
});

const whiskers = { tukey: 1.5, wide: 3, minmax: "minmax" } as const;
type Whisker = keyof typeof whiskers;

export default function BuildTimesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [whisker, setWhisker] = useState<Whisker>("tukey");
  const [shape, setShape] = useState<"hollow" | "filled">("hollow");

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const groups = useMemo(
    (): BoxplotGroup[] =>
      pipelines.map(([key], i) => ({
        x: t(\`pipelines.\${key}\`),
        values: runs[i] ?? [],
      })),
    [t],
  );
  // the same rule as the chart, to count the runs drawn as outliers
  const outliers = useMemo(
    () =>
      runs.reduce(
        (n, values) =>
          n +
          boxplotStats(values, { whisker: whiskers[whisker] }).outliers.length,
        0,
      ),
    [whisker],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("whiskerRule")}
        direction="horizontal"
        value={whisker}
        onChange={(value) => setWhisker(value as Whisker)}
      >
        <Radio value="tukey" label={t("whiskers.tukey")} />
        <Radio value="wide" label={t("whiskers.wide")} />
        <Radio value="minmax" label={t("whiskers.minmax")} />
      </RadioGroup>
      <RadioGroup
        aria-label={t("outlierShape")}
        direction="horizontal"
        value={shape}
        onChange={(value) => setShape(value as "hollow" | "filled")}
      >
        <Radio value="hollow" label={t("shapes.hollow")} />
        <Radio value="filled" label={t("shapes.filled")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("outlierRuns", {
          value: new Intl.NumberFormat(locale).format(outliers),
        })}
      </output>
      <BoxPlotChart
        groups={groups}
        name={t("buildTime")}
        whisker={whiskers[whisker]}
        outlierShape={shape}
        outlierSize={shape === "filled" ? 5 : 8}
        yAxis={{ format: minutes, min: 0 }}
        height={340}
        ariaLabel={t("buildsAria")}
      />
    </div>
  );
}
`})))()}var je;function Me(){return(Me=e((()=>{je=`import { useMemo } from "react";
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
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useMemo } from "react";
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
`})))()}var $;function Fe(){return(Fe=e((()=>{$=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  BoxPlotChart,
  boxplotStats,
  type BoxplotGroup,
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

const WINDOW = 200; // requests kept per region
const PER_TICK = 20; // requests per region every second
const SLA = 300; // ms

const regions = [
  ["usEast", 120],
  ["usWest", 140],
  ["euWest", 110],
  ["apSouth", 190],
  ["saEast", 170],
] as const;

/**
 * Latency (ms) of request \`n\` of region \`r\`, derived from both alone so the
 * stream is deterministic; every region has a slow period now and then
 */
const latencyOf = (r: number, n: number) => {
  const random = mulberry32(r * 1_000_003 + n * 7919);
  const z =
    Math.sqrt(-2 * Math.log(random() || 1e-12)) *
    Math.cos(2 * Math.PI * random());
  const base = regions[r]?.[1] ?? 100;
  const degraded = Math.sin(n / 90 + r * 1.7) > 0.8 ? 2.4 : 1;
  return base * degraded * Math.exp(0.35 * z);
};

export default function LiveRegionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  // the last WINDOW requests of every region
  const samples = useMemo(() => {
    const last = WINDOW + tick * PER_TICK;
    return regions.map((_, r) =>
      Float64Array.from({ length: WINDOW }, (_, i) =>
        latencyOf(r, last - WINDOW + i),
      ),
    );
  }, [tick]);
  const breaching = useMemo(
    () =>
      samples.map((values) => {
        const stats = boxplotStats(values);
        return stats.q3 > SLA;
      }),
    [samples],
  );
  // a region turns red when a quarter of its requests exceed the SLA
  const groups = useMemo(
    (): BoxplotGroup[] =>
      regions.map(([key], r) => ({
        x: t(\`regions.\${key}\`),
        values: samples[r] ?? [],
        color: breaching[r] ? "var(--danger-color)" : undefined,
      })),
    [t, samples, breaching],
  );
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const names = regions
    .filter((_, r) => breaching[r])
    .map(([key]) => t(\`regions.\${key}\`));
  const list = new Intl.ListFormat(locale, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <output
          aria-live="polite"
          style={{
            color: names.length
              ? "var(--danger-color)"
              : "var(--text-secondary-color)",
          }}
        >
          {names.length
            ? t("slaBreached", { regions: list.format(names) })
            : t("slaOk")}
        </output>
      </div>
      <BoxPlotChart
        groups={groups}
        name={t("latency")}
        // a fixed range keeps the boxes comparable from one second to the next
        yAxis={{ format: ms, min: 0, max: 1200 }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: SLA,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("sla"),
          },
        ]}
        height={340}
        ariaLabel={t("regionsAria")}
      />
    </div>
  );
}
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useMemo } from "react";
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
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useMemo } from "react";
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
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  type BoxplotGroup,
  type ChartHoverEvent,
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

const TARGET = 240; // minutes: the four-hour standard of the emergency room

// Emergency room waits (minutes) over a quarter, Monday to Sunday: busier
// on Mondays and weekend nights, with a few very long waits
const typical = [150, 120, 110, 115, 125, 140, 160];
const waits = typical.map((median, day) => {
  const random = mulberry32(900 + day);
  return Float64Array.from({ length: 400 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return Math.round(median * Math.exp(0.42 * z));
  });
});

export default function WaitTimesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [clicked, setClicked] = useState<{
    day: number;
    outlier?: number;
    median: number;
    q1: number;
    q3: number;
    outliers: number;
  } | null>(null);

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const groups = useMemo((): BoxplotGroup[] => {
    // 1 January 2024 is a Monday
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    });
    return waits.map((values, day) => ({
      x: weekday.format(Date.UTC(2024, 0, 1 + day)),
      values,
    }));
  }, [locale]);

  // a click on a box gives its statistics, a click on an outlier its value;
  // on the category axis, x is the index of the day
  const click = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setClicked({
      day: Math.round(event.x),
      outlier: item.outlier,
      median: item.y,
      q1: item.q1 ?? item.y,
      q3: item.q3 ?? item.y,
      outliers: item.outliers ?? 0,
    });
  };
  const day = clicked ? String(groups[clicked.day]?.x ?? "") : "";
  const status = !clicked
    ? t("clickBox")
    : clicked.outlier !== undefined
      ? t("outlierClicked", { day, value: minutes(clicked.outlier) })
      : t("boxClicked", {
          day,
          median: minutes(clicked.median),
          q1: minutes(clicked.q1),
          q3: minutes(clicked.q3),
          outliers: new Intl.NumberFormat(locale).format(clicked.outliers),
        });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {status}
      </output>
      <BoxPlotChart
        groups={groups}
        name={t("wait")}
        outlierShape="filled"
        yAxis={{ format: minutes, min: 0, title: t("wait") }}
        annotations={[
          {
            type: "rect",
            y0: TARGET,
            color: "var(--danger-color)",
            opacity: 0.06,
          },
          {
            type: "line",
            axis: "y",
            value: TARGET,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("fourHours"),
          },
        ]}
        onPointClick={click}
        onPlotClick={() => setClicked(null)}
        height={340}
        ariaLabel={t("waitsAria")}
      />
    </div>
  );
}
`})))()}var He,Ue,We;function Ge(){return(Ge=e((()=>{C(),ce(),j(),F(),U(),J(),Se(),Ee(),Oe(),Ae(),Me(),Pe(),Fe(),Le(),ze(),Ve(),t(),te(),re(),He=n(),Ue=ee(Object.assign({"./demos/asset-sizes.tsx":ae,"./demos/build-times.tsx":se,"./demos/grouped.tsx":ue,"./demos/horizontal.tsx":pe,"./demos/live-regions.tsx":he,"./demos/services.tsx":_e,"./demos/temperatures.tsx":ye,"./demos/wait-times.tsx":we}),Object.assign({"./demos/asset-sizes.tsx":De,"./demos/build-times.tsx":ke,"./demos/grouped.tsx":je,"./demos/horizontal.tsx":Ne,"./demos/live-regions.tsx":$,"./demos/services.tsx":Ie,"./demos/temperatures.tsx":Re,"./demos/wait-times.tsx":Be})),We=()=>(0,He.jsx)(ne,{id:`boxplot-chart`,demos:Ue})})))()}Ge();export{We as default};