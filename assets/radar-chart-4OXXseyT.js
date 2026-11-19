import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BuRShUHp.js";import{n as a,t as o}from"./Checkbox-BYSlQoZx.js";import{n as s,t as c}from"./Switch-D2VL1Zfg.js";import{a as l,n as u,o as d}from"./Select-VJRJGrLe.js";import{i as f,r as p}from"./Stack-NslbKtAY.js";import{c as m,f as h}from"./shapes-BsV_vu9c.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-B93OiV4a.js";function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),n=t.language,i=(0,g.useMemo)(()=>v.map(t=>({name:e(`skills.${t}`),max:10})),[e]),a=(0,g.useMemo)(()=>[{name:e(`candidate`),values:y}],[e]),o=(0,g.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,_.jsx)(h,{indicators:i,series:a,format:t=>e(`outOf`,{value:o.format(t),max:10}),height:340,ariaLabel:e(`scorecardAria`)})}var g,_,v,y;function b(){return(b=e((()=>{g=t(),i(),m(),_=n(),v=[`problemSolving`,`coding`,`systemDesign`,`communication`,`collaboration`,`ownership`],y=[8.5,9,6.5,7,8,9]})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),[n,i]=(0,x.useState)([]),a=(0,x.useMemo)(()=>oe.map(t=>({name:e(`capabilities.${t}`),min:0,max:5})),[e]),s=(0,x.useMemo)(()=>C.map(({key:t,values:n})=>({name:e(`products.${t}`),values:n,opacity:t===`market`?.05:.2})),[e]),c=new Intl.NumberFormat(t.language,{minimumFractionDigits:1}),l=(e,t)=>i(n=>t?n.filter(t=>t!==e):[...n,e]);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsx)(f,{gap:16,role:`group`,"aria-label":e(`compareWith`),children:s.map((e,t)=>(0,S.jsx)(o,{label:e.name,checked:!n.includes(t),onChange:e=>l(t,e)},e.name))}),(0,S.jsx)(h,{indicators:a,series:s,hidden:n,onToggle:e=>i([...e.hiddenIndexes]),format:e=>c.format(e),height:380,ariaLabel:e(`capabilitiesAria`)})]})}var x,S,oe,C;function se(){return(se=e((()=>{x=t(),i(),a(),p(),m(),S=n(),oe=[`security`,`integrations`,`reporting`,`mobile`,`automation`,`support`,`pricing`],C=[{key:`ours`,values:[4.5,3.8,4.2,3.1,4.6,4.4,3.5]},{key:`competitor`,values:[3.9,4.7,3.6,4.4,3.2,3.5,3.9]},{key:`market`,values:[3.5,3.6,3.4,3.5,3.3,3.6,3.7]}]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),n=t.language,i=(0,w.useMemo)(()=>ue.map(t=>({name:e(`flavor.${t}`),max:5})),[e]),a=(0,w.useMemo)(()=>T.map(({key:t,values:n})=>({name:e(`coffees.${t}`),values:n,opacity:.25})),[e]),o=(0,w.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,le.jsx)(h,{indicators:i,series:a,shape:`circle`,levels:5,dots:!1,format:e=>o.format(e),height:360,ariaLabel:e(`coffeeAria`)})}var w,le,ue,T;function E(){return(E=e((()=>{w=t(),i(),m(),le=n(),ue=[`aroma`,`acidity`,`sweetness`,`body`,`bitterness`,`aftertaste`],T=[{key:`ethiopia`,values:[4.6,4.4,3.8,2.4,1.6,3.9]},{key:`sumatra`,values:[3.6,1.8,3.1,4.7,3.9,4.2]}]})))()}function de(){let{t:e}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),[t,n]=(0,D.useState)(null),i=(0,D.useMemo)(()=>k.map(t=>({name:e(`criteria.${t}`),max:100})),[e]);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,O.jsx)(h,{indicators:i,series:A,onHover:n,height:380,ariaLabel:e(`phonesAria`)}),(0,O.jsx)(`p`,{role:`status`,children:t&&t.indicator!==void 0?`${t.name} · ${i[t.indicator].name}: ${e(`outOf`,{value:t.value,max:100})}`:e(`hoverPolygon`)})]})}var D,O,k,A;function j(){return(j=e((()=>{D=t(),i(),m(),O=n(),k=[`performance`,`battery`,`camera`,`display`,`value`,`build`],A=[{name:`Aurora X`,values:[92,68,88,90,55,86]},{name:`Nimbus 5`,values:[74,91,70,78,88,72]},{name:`Vertex Pro`,values:[85,80,94,84,66,93]}]})))()}function fe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),[n,i]=(0,M.useState)(!0),[a,o]=(0,M.useState)(F),s=(0,M.useRef)(fe(11));(0,M.useEffect)(()=>{if(!n)return;let e=window.setInterval(()=>{let e=P.map(()=>(s.current()-.45)*18);o(t=>t.map((t,n)=>Math.min(100,Math.max(0,t+e[n]+(F[n]-t)*.15))))},1500);return()=>window.clearInterval(e)},[n]);let l=(0,M.useMemo)(()=>P.map(t=>({name:e(`monitor.metrics.${t}`),max:100})),[e]),u=(0,M.useMemo)(()=>[{name:e(`monitor.baseline`),values:F,color:`var(--text-secondary-color)`,opacity:.04},{name:e(`monitor.now`),values:a,color:Math.max(...a)>=I?`var(--danger-color)`:`var(--primary-color)`,opacity:.22}],[a,e]),d=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(t.language,{style:`percent`});return t=>e.format(t/100)},[t.language]),f=a.indexOf(Math.max(...a)),p=a[f]>=I,m=p?e(`monitor.alert`,{metric:l[f].name,threshold:d(I)}):e(`monitor.peak`,{metric:l[f].name});return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsx)(c,{checked:n,onChange:i,label:e(`monitor.live`)}),(0,N.jsx)(h,{indicators:l,series:u,levels:4,format:d,height:360,ariaLabel:e(`monitor.aria`)}),(0,N.jsx)(`output`,{"aria-live":`polite`,style:{color:p?`var(--danger-color)`:void 0},children:m})]})}var M,N,P,F,I;function L(){return(L=e((()=>{M=t(),i(),s(),m(),N=n(),P=[`cpu`,`memory`,`diskIo`,`network`,`latency`,`errors`],F=[46,58,32,41,38,22],I=85})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),n=t.language,i=(0,R.useMemo)(()=>B.map(({key:t})=>({name:e(`nutrition.nutrients.${t}`),max:50})),[e]),a=(0,R.useMemo)(()=>V.map(({key:t,amounts:n,color:r})=>({name:e(`nutrition.meals.${t}`),values:n.map((e,t)=>e/B[t].daily*100),color:r,opacity:.12})),[e]),o=(0,R.useMemo)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),r=new Intl.NumberFormat(n),i=new Intl.NumberFormat(n,{style:`unit`,unit:`gram`}),a=B.map(({unit:e})=>e===`gram`?e=>i.format(e):e=>`${r.format(e)} mg`);return{dailyValue:n=>e(`nutrition.dailyValue`,{value:t.format(n/100)}),amount:(e,t)=>a[e](t)}},[n,e]);return(0,z.jsx)(h,{indicators:i,series:a,shape:`circle`,levels:5,format:o.dailyValue,renderTooltip:t=>{let n=t.indicator??0;return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,z.jsx)(`strong`,{children:i[n].name}),V.map((r,i)=>(0,z.jsx)(`span`,{style:{fontWeight:a[i].name===t.name?600:void 0},children:e(`nutrition.row`,{meal:a[i].name,amount:o.amount(n,r.amounts[n]),share:o.dailyValue(a[i].values[n])})},r.key))]})},height:380,ariaLabel:e(`nutrition.aria`)})}var R,z,B,V;function H(){return(H=e((()=>{R=t(),i(),m(),z=n(),B=[{key:`protein`,unit:`gram`,daily:50},{key:`fiber`,unit:`gram`,daily:28},{key:`sugar`,unit:`gram`,daily:50},{key:`fat`,unit:`gram`,daily:78},{key:`sodium`,unit:`mg`,daily:2300},{key:`calcium`,unit:`mg`,daily:1300}],V=[{key:`oatmeal`,amounts:[10,8,12,6,120,180],color:`#d97706`},{key:`eggs`,amounts:[19,3,2,15,520,110],color:`#2563eb`},{key:`yogurt`,amounts:[17,4,24,9,140,300],color:`#db2777`}]})))()}function he(){let{t:e}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),t=(0,U.useMemo)(()=>G.map(t=>({name:e(`football.${t}`),min:30,max:99})),[e]),n=(0,U.useMemo)(()=>ge.map(e=>({...e,opacity:.2})),[]);return(0,W.jsx)(h,{indicators:t,series:n,levels:3,height:360,ariaLabel:e(`playersAria`)})}var U,W,G,ge;function _e(){return(_e=e((()=>{U=t(),i(),m(),W=n(),G=[`pace`,`shooting`,`passing`,`dribbling`,`defending`,`physical`],ge=[{name:`L. Moreau`,values:[91,86,74,89,38,70],color:`#2563eb`},{name:`K. Adeyemi`,values:[78,90,82,80,52,86],color:`#dc2626`}]})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),n=t.language,[i,a]=(0,K.useState)(0),o=(0,K.useMemo)(()=>ye.map(t=>({name:e(`review.competencies.${t}`),min:1,max:5})),[e]),s=(0,K.useMemo)(()=>[{name:e(`review.team`),values:J,color:`var(--text-secondary-color)`,opacity:.06},{name:Y[i].name,values:Y[i].ratings,color:`var(--primary-color)`,opacity:.25}],[i,e]),c=(0,K.useMemo)(()=>{let e=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1});return t=>e.format(t)},[n]),l=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1,signDisplay:`exceptZero`}),f=Y[i].ratings.map((e,t)=>e-J[t]),p=f.indexOf(Math.max(...f)),m=f.indexOf(Math.min(...f));return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsx)(u,{size:`small`,style:{width:220},"aria-label":e(`review.person`),value:String(i),onChange:e=>a(Number(e)),children:Y.map((e,t)=>(0,q.jsx)(d,{value:String(t),children:e.name},e.name))}),(0,q.jsx)(h,{indicators:o,series:s,levels:4,format:c,height:360,ariaLabel:e(`review.aria`,{name:Y[i].name})}),(0,q.jsx)(`output`,{"aria-live":`polite`,children:e(`review.summary`,{strength:o[p].name,strengthGap:l.format(f[p]),growth:o[m].name,growthGap:l.format(f[m])})})]})}var K,q,ye,J,Y;function be(){return(be=e((()=>{K=t(),i(),l(),m(),q=n(),ye=[`communication`,`delivery`,`expertise`,`collaboration`,`mentoring`,`initiative`],J=[3.8,3.9,3.7,4,3.4,3.6],Y=[{name:`Amélie Laurent`,ratings:[4.4,3.7,4.1,4.5,4.2,3.5]},{name:`Marcus Chen`,ratings:[3.3,4.6,4.7,3.6,2.9,4.1]},{name:`Sade Okafor`,ratings:[4.1,4,3.4,4.3,3.8,4.4]},{name:`Jonas Romero`,ratings:[3.5,3.2,4.4,3.4,3.1,3]}]})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),n=t.language,[i,a]=(0,X.useState)(null),o=(0,X.useMemo)(()=>Q.map(({key:t,max:n})=>({name:e(`sales.kpis.${t}`),min:0,max:n})),[e]),s=(0,X.useMemo)(()=>[{name:e(`sales.target`),values:Q.map(e=>e.target),color:`var(--text-secondary-color)`,opacity:0},{name:e(`sales.actual`),values:Q.map(e=>e.actual),color:`var(--primary-color)`,opacity:.25}],[e]),c=(0,X.useMemo)(()=>{let e={currency:new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),count:new Intl.NumberFormat(n),percent:new Intl.NumberFormat(n,{style:`percent`}),score:new Intl.NumberFormat(n,{signDisplay:`exceptZero`})};return{value:(t,n)=>e[Q[t].kind].format(n),attainment:t=>e.percent.format(t)}},[n]),l=t=>e(`sales.line`,{kpi:o[t].name,actual:c.value(t,Q[t].actual),target:c.value(t,Q[t].target),attainment:c.attainment(Q[t].actual/Q[t].target)});return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(h,{indicators:o,series:s,renderTooltip:e=>e.indicator===void 0?null:(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,Z.jsx)(`strong`,{children:o[e.indicator].name}),(0,Z.jsx)(`span`,{children:l(e.indicator)})]}),onClick:a,height:380,ariaLabel:e(`sales.aria`)}),(0,Z.jsx)(`p`,{role:`status`,style:{margin:0},children:i?.indicator===void 0?e(`sales.hint`):l(i.indicator)})]})}var X,Z,Q;function Se(){return(Se=e((()=>{X=t(),i(),m(),Z=n(),Q=[{key:`revenue`,kind:`currency`,actual:412e3,target:45e4,max:5e5},{key:`deals`,kind:`count`,actual:18,target:20,max:25},{key:`winRate`,kind:`percent`,actual:.31,target:.3,max:.4},{key:`dealSize`,kind:`currency`,actual:22900,target:22500,max:3e4},{key:`calls`,kind:`count`,actual:240,target:300,max:350},{key:`nps`,kind:`score`,actual:46,target:50,max:70}]})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Interview scorecard of one candidate, each skill rated out of 10
const skills = [
  "problemSolving",
  "coding",
  "systemDesign",
  "communication",
  "collaboration",
  "ownership",
];
const scores = [8.5, 9, 6.5, 7, 8, 9];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      skills.map((skill) => ({ name: t(\`skills.\${skill}\`), max: 10 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [{ name: t("candidate"), values: scores }],
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      format={(value) => t("outOf", { value: decimal.format(value), max: 10 })}
      height={340}
      ariaLabel={t("scorecardAria")}
    />
  );
}
`})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Analyst ratings (1-5) of a product against a competitor and the market
const capabilities = [
  "security",
  "integrations",
  "reporting",
  "mobile",
  "automation",
  "support",
  "pricing",
];
const products = [
  { key: "ours", values: [4.5, 3.8, 4.2, 3.1, 4.6, 4.4, 3.5] },
  { key: "competitor", values: [3.9, 4.7, 3.6, 4.4, 3.2, 3.5, 3.9] },
  { key: "market", values: [3.5, 3.6, 3.4, 3.5, 3.3, 3.6, 3.7] },
];

export default function CapabilitiesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  // controlled visibility: the checkboxes and the legend share one state
  const [hidden, setHidden] = useState<number[]>([]);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      capabilities.map((key) => ({
        name: t(\`capabilities.\${key}\`),
        min: 0,
        max: 5,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      products.map(({ key, values }) => ({
        name: t(\`products.\${key}\`),
        values,
        opacity: key === "market" ? 0.05 : 0.2,
      })),
    [t],
  );
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
  });
  const toggle = (index: number, visible: boolean) =>
    setHidden((current) =>
      visible ? current.filter((i) => i !== index) : [...current, index],
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} role="group" aria-label={t("compareWith")}>
        {series.map((item, index) => (
          <Checkbox
            key={item.name}
            label={item.name}
            checked={!hidden.includes(index)}
            onChange={(checked) => toggle(index, checked)}
          />
        ))}
      </HStack>
      <RadarChart
        indicators={indicators}
        series={series}
        hidden={hidden}
        onToggle={(event) => setHidden([...event.hiddenIndexes])}
        format={(value) => decimal.format(value)}
        height={380}
        ariaLabel={t("capabilitiesAria")}
      />
    </div>
  );
}
`})))()}var De;function Oe(){return(Oe=e((()=>{De=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Cupping notes of two coffees, each attribute scored from 0 to 5
const attributes = [
  "aroma",
  "acidity",
  "sweetness",
  "body",
  "bitterness",
  "aftertaste",
];
const coffees = [
  { key: "ethiopia", values: [4.6, 4.4, 3.8, 2.4, 1.6, 3.9] },
  { key: "sumatra", values: [3.6, 1.8, 3.1, 4.7, 3.9, 4.2] },
];

export default function CircleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({ name: t(\`flavor.\${key}\`), max: 5 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      coffees.map(({ key, values }) => ({
        name: t(\`coffees.\${key}\`),
        values,
        opacity: 0.25,
      })),
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      dots={false}
      format={(value) => decimal.format(value)}
      height={360}
      ariaLabel={t("coffeeAria")}
    />
  );
}
`})))()}var ke;function Ae(){return(Ae=e((()=>{ke=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Review scores (0-100) of three phones
const criteria = [
  "performance",
  "battery",
  "camera",
  "display",
  "value",
  "build",
];
const series: RadarSeries[] = [
  { name: "Aurora X", values: [92, 68, 88, 90, 55, 86] },
  { name: "Nimbus 5", values: [74, 91, 70, 78, 88, 72] },
  { name: "Vertex Pro", values: [85, 80, 94, 84, 66, 93] },
];

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      criteria.map((key) => ({ name: t(\`criteria.\${key}\`), max: 100 })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        onHover={setHovered}
        height={380}
        ariaLabel={t("phonesAria")}
      />
      <p role="status">
        {hovered && hovered.indicator !== undefined
          ? \`\${hovered.name} · \${indicators[hovered.indicator].name}: \${t(
              "outOf",
              { value: hovered.value, max: 100 },
            )}\`
          : t("hoverPolygon")}
      </p>
    </div>
  );
}
`})))()}var je;function Me(){return(Me=e((()=>{je=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

/** Small seeded random generator: the same "load" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Load of a service, in percent of its capacity (latency and errors: of
// their objective); the baseline is the average of the last hour
const METRICS = ["cpu", "memory", "diskIo", "network", "latency", "errors"];
const BASELINE = [46, 58, 32, 41, 38, 22];
const ALERT = 85;

export default function LiveMonitorDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const [live, setLive] = useState(true);
  const [current, setCurrent] = useState(BASELINE);
  const random = useRef(mulberry32(11));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // a random walk per metric that drifts back toward its baseline
      const steps = METRICS.map(() => (random.current() - 0.45) * 18);
      setCurrent((values) =>
        values.map((value, i) =>
          Math.min(
            100,
            Math.max(0, value + steps[i] + (BASELINE[i] - value) * 0.15),
          ),
        ),
      );
    }, 1500);
    return () => window.clearInterval(timer);
  }, [live]);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      METRICS.map((key) => ({ name: t(\`monitor.metrics.\${key}\`), max: 100 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("monitor.baseline"),
        values: BASELINE,
        color: "var(--text-secondary-color)",
        opacity: 0.04,
      },
      {
        name: t("monitor.now"),
        values: current,
        color:
          Math.max(...current) >= ALERT
            ? "var(--danger-color)"
            : "var(--primary-color)",
        opacity: 0.22,
      },
    ],
    [current, t],
  );
  const format = useMemo(() => {
    const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
    return (value: number) => percent.format(value / 100);
  }, [i18n.language]);

  const peak = current.indexOf(Math.max(...current));
  const alert = current[peak] >= ALERT;
  // no value in the message: it is announced when the busiest metric or
  // the alert state changes, not on every tick
  const status = alert
    ? t("monitor.alert", {
        metric: indicators[peak].name,
        threshold: format(ALERT),
      })
    : t("monitor.peak", { metric: indicators[peak].name });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("monitor.live")} />
      <RadarChart
        indicators={indicators}
        series={series}
        levels={4}
        format={format}
        height={360}
        ariaLabel={t("monitor.aria")}
      />
      <output
        aria-live="polite"
        style={{ color: alert ? "var(--danger-color)" : undefined }}
      >
        {status}
      </output>
    </div>
  );
}
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Nutrients of three breakfasts, with the reference daily values: the axes
// show the percent of the daily value, the tooltip the amounts
const NUTRIENTS = [
  { key: "protein", unit: "gram", daily: 50 },
  { key: "fiber", unit: "gram", daily: 28 },
  { key: "sugar", unit: "gram", daily: 50 },
  { key: "fat", unit: "gram", daily: 78 },
  { key: "sodium", unit: "mg", daily: 2300 },
  { key: "calcium", unit: "mg", daily: 1300 },
] as const;
const MEALS = [
  { key: "oatmeal", amounts: [10, 8, 12, 6, 120, 180], color: "#d97706" },
  { key: "eggs", amounts: [19, 3, 2, 15, 520, 110], color: "#2563eb" },
  { key: "yogurt", amounts: [17, 4, 24, 9, 140, 300], color: "#db2777" },
];

export default function NutritionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  // every axis from 0 to 50% of the daily value
  const indicators = useMemo(
    (): RadarIndicator[] =>
      NUTRIENTS.map(({ key }) => ({
        name: t(\`nutrition.nutrients.\${key}\`),
        max: 50,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      MEALS.map(({ key, amounts, color }) => ({
        name: t(\`nutrition.meals.\${key}\`),
        values: amounts.map((amount, i) => (amount / NUTRIENTS[i].daily) * 100),
        color,
        opacity: 0.12,
      })),
    [t],
  );
  const formats = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    // Intl has no milligram unit: "mg" is the same symbol in every language
    const number = new Intl.NumberFormat(locale);
    const grams = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "gram",
    });
    const amounts = NUTRIENTS.map(({ unit }) =>
      unit === "gram"
        ? (value: number) => grams.format(value)
        : (value: number) => \`\${number.format(value)} mg\`,
    );
    return {
      dailyValue: (value: number) =>
        t("nutrition.dailyValue", { value: percent.format(value / 100) }),
      amount: (nutrient: number, value: number) => amounts[nutrient](value),
    };
  }, [locale, t]);

  // one row per breakfast for the nutrient under the pointer
  const tooltip = (event: ShapeHoverEvent) => {
    const nutrient = event.indicator ?? 0;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{indicators[nutrient].name}</strong>
        {MEALS.map((meal, i) => (
          <span
            key={meal.key}
            style={{
              fontWeight: series[i].name === event.name ? 600 : undefined,
            }}
          >
            {t("nutrition.row", {
              meal: series[i].name,
              amount: formats.amount(nutrient, meal.amounts[nutrient]),
              share: formats.dailyValue(series[i].values[nutrient]),
            })}
          </span>
        ))}
      </div>
    );
  };

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      format={formats.dailyValue}
      renderTooltip={tooltip}
      height={380}
      ariaLabel={t("nutrition.aria")}
    />
  );
}
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Season ratings (0-99) of two forwards, the way football games show them
const attributes = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physical",
];
const players = [
  { name: "L. Moreau", values: [91, 86, 74, 89, 38, 70], color: "#2563eb" },
  { name: "K. Adeyemi", values: [78, 90, 82, 80, 52, 86], color: "#dc2626" },
];

export default function PlayersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });

  // the same scale on every axis: 30 at the center, 99 at the rim
  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({
        name: t(\`football.\${key}\`),
        min: 30,
        max: 99,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => players.map((player) => ({ ...player, opacity: 0.2 })),
    [],
  );

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      levels={3}
      height={360}
      ariaLabel={t("playersAria")}
    />
  );
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// 360° review: average rating (1-5) of each person by their peers, manager
// and reports, against the average of the team
const COMPETENCIES = [
  "communication",
  "delivery",
  "expertise",
  "collaboration",
  "mentoring",
  "initiative",
];
const TEAM = [3.8, 3.9, 3.7, 4.0, 3.4, 3.6];
const PEOPLE: { name: string; ratings: number[] }[] = [
  { name: "Amélie Laurent", ratings: [4.4, 3.7, 4.1, 4.5, 4.2, 3.5] },
  { name: "Marcus Chen", ratings: [3.3, 4.6, 4.7, 3.6, 2.9, 4.1] },
  { name: "Sade Okafor", ratings: [4.1, 4.0, 3.4, 4.3, 3.8, 4.4] },
  { name: "Jonas Romero", ratings: [3.5, 3.2, 4.4, 3.4, 3.1, 3.0] },
];

export default function Review360Demo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;
  const [person, setPerson] = useState(0);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      COMPETENCIES.map((key) => ({
        name: t(\`review.competencies.\${key}\`),
        min: 1,
        max: 5,
      })),
    [t],
  );
  // the person always comes second, so their polygon animates in place
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("review.team"),
        values: TEAM,
        color: "var(--text-secondary-color)",
        opacity: 0.06,
      },
      {
        name: PEOPLE[person].name,
        values: PEOPLE[person].ratings,
        color: "var(--primary-color)",
        opacity: 0.25,
      },
    ],
    [person, t],
  );
  const format = useMemo(() => {
    const rating = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => rating.format(value);
  }, [locale]);
  const signed = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });

  // largest positive and negative gaps to the team average
  const gaps = PEOPLE[person].ratings.map((rating, i) => rating - TEAM[i]);
  const strength = gaps.indexOf(Math.max(...gaps));
  const growth = gaps.indexOf(Math.min(...gaps));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("review.person")}
        value={String(person)}
        onChange={(value) => setPerson(Number(value))}
      >
        {PEOPLE.map((p, i) => (
          <SelectItem key={p.name} value={String(i)}>
            {p.name}
          </SelectItem>
        ))}
      </Select>
      <RadarChart
        indicators={indicators}
        series={series}
        levels={4}
        format={format}
        height={360}
        ariaLabel={t("review.aria", { name: PEOPLE[person].name })}
      />
      <output aria-live="polite">
        {t("review.summary", {
          strength: indicators[strength].name,
          strengthGap: signed.format(gaps[strength]),
          growth: indicators[growth].name,
          growthGap: signed.format(gaps[growth]),
        })}
      </output>
    </div>
  );
}
`})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Kind = "currency" | "count" | "percent" | "score";

// Quarterly KPIs of a sales rep: every axis has its own unit and scale
// (min / max); the unfilled outline is the target
const KPIS: {
  key: string;
  kind: Kind;
  actual: number;
  target: number;
  max: number;
}[] = [
  {
    key: "revenue",
    kind: "currency",
    actual: 412_000,
    target: 450_000,
    max: 500_000,
  },
  { key: "deals", kind: "count", actual: 18, target: 20, max: 25 },
  { key: "winRate", kind: "percent", actual: 0.31, target: 0.3, max: 0.4 },
  {
    key: "dealSize",
    kind: "currency",
    actual: 22_900,
    target: 22_500,
    max: 30_000,
  },
  { key: "calls", kind: "count", actual: 240, target: 300, max: 350 },
  { key: "nps", kind: "score", actual: 46, target: 50, max: 70 },
];

export default function SalesTargetsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      KPIS.map(({ key, max }) => ({
        name: t(\`sales.kpis.\${key}\`),
        min: 0,
        max,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("sales.target"),
        values: KPIS.map((kpi) => kpi.target),
        color: "var(--text-secondary-color)",
        opacity: 0,
      },
      {
        name: t("sales.actual"),
        values: KPIS.map((kpi) => kpi.actual),
        color: "var(--primary-color)",
        opacity: 0.25,
      },
    ],
    [t],
  );
  const formats = useMemo(() => {
    const byKind: Record<Kind, Intl.NumberFormat> = {
      currency: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      count: new Intl.NumberFormat(locale),
      percent: new Intl.NumberFormat(locale, { style: "percent" }),
      score: new Intl.NumberFormat(locale, { signDisplay: "exceptZero" }),
    };
    return {
      value: (kpi: number, value: number) =>
        byKind[KPIS[kpi].kind].format(value),
      attainment: (share: number) => byKind.percent.format(share),
    };
  }, [locale]);

  const line = (kpi: number) =>
    t("sales.line", {
      kpi: indicators[kpi].name,
      actual: formats.value(kpi, KPIS[kpi].actual),
      target: formats.value(kpi, KPIS[kpi].target),
      attainment: formats.attainment(KPIS[kpi].actual / KPIS[kpi].target),
    });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        renderTooltip={(event) =>
          event.indicator === undefined ? null : (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{indicators[event.indicator].name}</strong>
              <span>{line(event.indicator)}</span>
            </div>
          )
        }
        onClick={setSelected}
        height={380}
        ariaLabel={t("sales.aria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected?.indicator !== undefined
          ? line(selected.indicator)
          : t("sales.hint")}
      </p>
    </div>
  );
}
`})))()}var Ve,He,Ue;function $(){return($=e((()=>{b(),se(),E(),j(),L(),H(),_e(),be(),Se(),we(),Ee(),Oe(),Ae(),Me(),Pe(),Ie(),Re(),Be(),t(),te(),re(),Ve=n(),He=ee(Object.assign({"./demos/basic.tsx":ie,"./demos/capabilities.tsx":ae,"./demos/circle.tsx":ce,"./demos/compare.tsx":de,"./demos/live-monitor.tsx":pe,"./demos/nutrition.tsx":me,"./demos/players.tsx":he,"./demos/review-360.tsx":ve,"./demos/sales-targets.tsx":xe}),Object.assign({"./demos/basic.tsx":Ce,"./demos/capabilities.tsx":Te,"./demos/circle.tsx":De,"./demos/compare.tsx":ke,"./demos/live-monitor.tsx":je,"./demos/nutrition.tsx":Ne,"./demos/players.tsx":Fe,"./demos/review-360.tsx":Le,"./demos/sales-targets.tsx":ze})),Ue=()=>(0,Ve.jsx)(ne,{id:`radar-chart`,demos:He})})))()}$();export{Ue as default};