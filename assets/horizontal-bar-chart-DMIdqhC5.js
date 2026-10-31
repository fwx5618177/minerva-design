import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{i as s,n as c,r as l,t as u}from"./Radio-D2wZ9q6z.js";import{n as d,t as f}from"./Tag-C33GIXr-.js";import{i as p,o as ee,t as m}from"./Select-BIYfjWQ3.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-CHJwIegD.js";import{m as h,u as g}from"./charts-JJDQ3gS7.js";function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>[{name:e(`developers`),data:se}],[e]),a=(0,_.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t/100)},[n]);return(0,oe.jsx)(g,{series:i,labels:!0,yAxis:{format:a},height:340,ariaLabel:e(`languagesAria`)})}var _,oe,se;function ce(){return(ce=e((()=>{_=t(),i(),h(),oe=n(),se=[[`JavaScript`,62.3],[`Python`,51],[`TypeScript`,43.4],[`Java`,30.3],[`C#`,27.1],[`Go`,17.7],[`Rust`,15.2],[`Kotlin`,10.1],[`Swift`,8.4],[`Ruby`,5.9]]})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,v.useMemo)(()=>{let t=y.map(t=>e(`statements.${t}`)),n=[{key:`stronglyDisagree`,sign:-1,index:0,color:`#dc2626`},{key:`disagree`,sign:-1,index:1,color:`#f87171`},{key:`agree`,sign:1,index:2,color:`#34d399`},{key:`stronglyAgree`,sign:1,index:3,color:`#059669`}];return[n[1],n[0],n[2],n[3]].map(n=>({name:e(`likert.${n.key}`),color:n.color,data:y.map((e,r)=>[t[r]??e,n.sign*de[e][n.index]])}))},[e]),a=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`});return t=>e.format(Math.abs(t)/100)},[n]);return(0,ue.jsx)(g,{series:i,stacked:!0,yAxis:{format:a},annotations:[{type:`line`,axis:`y`,value:0,dash:[]}],legend:{position:`bottom`},height:320,ariaLabel:e(`surveyAria`)})}var v,ue,y,de;function b(){return(b=e((()=>{v=t(),i(),h(),ue=n(),y=[`career`,`workload`,`tools`,`manager`,`pay`],de={career:[12,24,41,15],workload:[18,30,36,9],tools:[5,14,49,27],manager:[4,9,44,39],pay:[21,33,31,8]}})))()}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,[i,a]=(0,x.useState)(null),o=(0,x.useMemo)(()=>({percent:e=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}).format(e/100),precise:new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,maximumFractionDigits:3}),minutes:new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`long`,maximumFractionDigits:0})}),[n]),s=(0,x.useMemo)(()=>[{name:e(`budgetLeft`),data:T.map(e=>({x:e.name,y:e.left,color:e.left<0?`var(--danger-color)`:e.left<w?`var(--warning-color)`:`var(--success-color)`}))}],[e]),c=(0,x.useMemo)(()=>[{type:`line`,axis:`y`,value:w,dash:[4,4],color:`var(--warning-color)`,label:e(`releaseFreeze`)}],[e]),l=e=>{let t=e.items[0]?.index;t!==void 0&&a(t)},u=i===null?void 0:T[i],d=u?(1-u.slo)*C:0,f=u?(1-u.availability)*C:0;return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsx)(g,{series:s,labels:!0,legend:!1,annotations:c,onPointClick:l,onPlotClick:()=>a(null),yAxis:{format:o.percent},height:320,ariaLabel:e(`budgetAriaSlo`)}),(0,S.jsx)(`output`,{"aria-live":`polite`,style:{minHeight:`3em`},children:u?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(`strong`,{children:u.name}),` · `,e(`budgetDetails`,{slo:o.precise.format(u.slo),availability:o.precise.format(u.availability)}),(0,S.jsx)(`br`,{}),(0,S.jsx)(`span`,{style:{color:d-f<0?`var(--danger-color)`:`var(--text-secondary-color)`},children:d-f<0?e(`budgetOverspent`,{minutes:o.minutes.format(f-d)}):e(`budgetMinutesLeft`,{minutes:o.minutes.format(d-f),allowed:o.minutes.format(d)})})]}):(0,S.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`clickService`)})})]})}var x,S,pe,C,w,me,T;function he(){return(he=e((()=>{x=t(),i(),h(),S=n(),pe=[{name:`checkout-api`,slo:.999,availability:.99962},{name:`auth`,slo:.9995,availability:.99971},{name:`search`,slo:.995,availability:.99712},{name:`payments`,slo:.9999,availability:.99984},{name:`notifications`,slo:.99,availability:.99581},{name:`inventory`,slo:.999,availability:.99915},{name:`recommendations`,slo:.99,availability:.98874},{name:`media-cdn`,slo:.9995,availability:.99988}],C=43200,w=20,me=e=>(1-(1-e.availability)/(1-e.slo))*100,T=pe.map(e=>({...e,left:me(e)})).sort((e,t)=>e.left-t.left)})))()}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,E.useMemo)(()=>{let t=Object.keys(D);return[`budget`,`actual`].map((n,r)=>({name:e(n),data:t.map(t=>[e(`departments.${t}`),D[t][r]??0])}))},[e]),a=(0,E.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,_e.jsx)(g,{series:i,yAxis:{format:a},height:340,ariaLabel:e(`budgetAria`)})}var E,_e,D;function O(){return(O=e((()=>{E=t(),i(),h(),_e=n(),D={engineering:[1450,1520],marketing:[620,540],sales:[880,910],support:[310,295],finance:[240,228]}})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,k.useMemo)(()=>[{name:e(`votes`),color:`var(--chart-series-5, #0ea5e9)`,data:j.map(([t,n])=>[e(`features.${t}`),n])}],[e]),a=(0,k.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,A.jsx)(g,{series:i,labels:!0,yAxis:{format:e=>a.format(e),title:e(`votes`)},height:300,ariaLabel:e(`featuresAria`)})}var k,A,j;function M(){return(M=e((()=>{k=t(),i(),h(),A=n(),j=[[`darkMode`,1842],[`offlineMode`,1310],[`exportPdf`,1104],[`sso`,960],[`calendarSync`,712],[`bulkEdit`,655],[`customFields`,489]]})))()}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,N.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`});return t=>e.format(t/100)},[n]),a=(0,N.useMemo)(()=>[{name:e(`growth`),format:i,data:F.map(([t,n])=>({x:e(`regions.${t}`),y:n,color:n>=0?`var(--success-color, #16a34a)`:`var(--danger-color, #dc2626)`}))}],[e,i]);return(0,P.jsx)(g,{series:a,labels:!0,yAxis:{format:i},height:300,ariaLabel:e(`growthAria`)})}var N,P,F;function I(){return(I=e((()=>{N=t(),i(),h(),P=n(),F=[[`northAmerica`,6.4],[`europe`,3.1],[`asiaPacific`,11.8],[`latinAmerica`,-2.7],[`middleEast`,-5.2],[`africa`,8.9]]})))()}function be(){let{t:e}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),t=(0,L.useMemo)(()=>{let t=Object.keys(R);return[{key:`done`,color:`var(--success-color, #16a34a)`},{key:`review`,color:`var(--warning-color, #f59e0b)`},{key:`todo`,color:`var(--border-color, #cbd5e1)`}].map((n,r)=>({name:e(`status.${n.key}`),color:n.color,data:t.map(t=>[e(`teams.${t}`),R[t][r]??0])}))},[e]);return(0,xe.jsx)(g,{series:t,percent:!0,height:280,ariaLabel:e(`progressAria`)})}var L,xe,R;function Se(){return(Se=e((()=>{L=t(),i(),h(),xe=n(),R={platform:[42,6,12],payments:[18,9,21],mobile:[30,4,4],growth:[11,7,26],design:[24,2,3]}})))()}function Ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,[i,a]=(0,z.useState)(0),[s,c]=(0,z.useState)(!1),l=i>=W,u=s&&!l;(0,z.useEffect)(()=>{if(!u)return;let e=window.setInterval(()=>{a(e=>Math.min(e+1,W))},120);return()=>window.clearInterval(e)},[u]);let d=(0,z.useMemo)(()=>new Intl.DisplayNames(n,{type:`region`}),[n]),p=(0,z.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:0});return n=>e(`gigawatts`,{value:t.format(n)})},[n,e]),ee=(0,z.useMemo)(()=>{let t=Te.map((e,t)=>({code:e,i:t,value:De(e,i)})).sort((e,t)=>t.value-e.value).slice(0,Ee);return[{name:e(`solarCapacity`),data:t.map(e=>({x:d.of(e.code)??e.code,y:e.value,color:H[e.i%H.length]}))}]},[e,d,i]),m=we+Math.floor(i/U);return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[u?(0,B.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(!1),children:e(`pause`)}):(0,B.jsx)(o,{size:`small`,onClick:()=>{l&&a(0),c(!0)},children:e(l?`replay`:`play`)}),(0,B.jsx)(o,{size:`small`,variant:`outline`,disabled:i===0,onClick:()=>{c(!1),a(0)},children:e(`restart`)}),(0,B.jsx)(`output`,{"aria-live":`off`,style:{marginInlineStart:`auto`},children:(0,B.jsx)(f,{size:`large`,children:new Intl.NumberFormat(n,{useGrouping:!1}).format(m)})})]}),(0,B.jsx)(g,{series:ee,labels:!0,legend:!1,yAxis:{format:p},height:320,ariaLabel:e(`raceAria`,{year:new Intl.NumberFormat(n,{useGrouping:!1}).format(m)})})]})}var z,B,we,V,Te,H,U,W,Ee,De;function Oe(){return(Oe=e((()=>{z=t(),i(),a(),d(),h(),B=n(),we=2015,V={CN:[43,77,130,175,205,253,307,393,609,887],US:[26,41,51,62,75,95,123,142,175,225],JP:[34,42,49,56,63,71,74,79,87,92],DE:[39,41,42,45,49,54,59,67,82,99],IN:[5,10,18,27,35,39,49,63,73,98],IT:[19,19,20,20,21,22,23,25,30,37],AU:[6,7,7,11,16,20,25,29,33,37],ES:[5,5,5,5,9,13,17,24,31,38],BR:[0,0,1,2,5,8,13,24,37,52],FR:[7,7,8,9,9,11,13,16,19,24],NL:[2,2,3,5,7,11,15,19,23,27],KR:[4,5,6,8,11,15,18,21,24,27]},Te=Object.keys(V),H=[`var(--chart-series-1, #4f46e5)`,`var(--chart-series-2, #10b981)`,`var(--chart-series-3, #f59e0b)`,`var(--chart-series-4, #ef4444)`,`var(--chart-series-5, #0ea5e9)`,`var(--chart-series-6, #8b5cf6)`,`var(--chart-series-7, #14b8a6)`,`var(--chart-series-8, #f97316)`,`#ec4899`,`#84cc16`,`#64748b`,`#a16207`],U=10,W=90,Ee=8,De=(e,t)=>{let n=V[e]??[],r=Math.floor(t/U),i=t%U/U,a=n[r]??0;return a+((n[Math.min(r+1,9)]??a)-a)*i}})))()}function ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,[i,a]=(0,G.useState)(15e4),s=(0,G.useMemo)(()=>({usd:new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),compact:new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),list:new Intl.ListFormat(n,{type:`conjunction`})}),[n]),c=(0,G.useMemo)(()=>q.filter(e=>i>=e.min&&i<=e.max),[i]),l=(0,G.useMemo)(()=>[{name:e(`salaryBand`),data:q.map(t=>({x:e(`levels.${t.key}`),y0:t.min,y:t.max,color:c.includes(t)?`var(--success-color)`:`var(--border-strong-color)`}))}],[e,c]),u=(0,G.useMemo)(()=>[{type:`line`,axis:`y`,value:i,width:2,color:`var(--primary-color)`,label:e(`offer`)}],[e,i]);return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[(0,K.jsx)(o,{size:`small`,variant:`outline`,disabled:i<=Ae,onClick:()=>a(e=>e-J),children:e(`offerDown`,{step:s.compact.format(J)})}),(0,K.jsx)(o,{size:`small`,variant:`outline`,disabled:i>=je,onClick:()=>a(e=>e+J),children:e(`offerUp`,{step:s.compact.format(J)})}),(0,K.jsx)(`output`,{"aria-live":`polite`,children:c.length>0?e(`offerFits`,{offer:s.usd.format(i),levels:s.list.format(c.map(t=>e(`levels.${t.key}`)))}):e(`offerOutside`,{offer:s.usd.format(i)})})]}),(0,K.jsx)(g,{series:l,annotations:u,renderTooltip:t=>{let n=q[t.items[0]?.index??-1];if(!n)return null;let r=(n.min+n.max)/2,a=[[e(`bandMin`),n.min],[e(`bandMid`),r],[e(`bandMax`),n.max]];return(0,K.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr auto`,gap:`2px 16px`},children:[(0,K.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),a.map(([e,t])=>(0,K.jsxs)(`span`,{style:{display:`contents`},children:[(0,K.jsx)(`span`,{children:e}),(0,K.jsx)(`span`,{style:{textAlign:`end`},children:s.usd.format(t)})]},e)),(0,K.jsx)(`span`,{children:e(`compaRatio`)}),(0,K.jsx)(`strong`,{style:{textAlign:`end`},children:s.percent.format(i/r)})]})},legend:!1,yAxis:{zero:!1,min:5e4,max:28e4,format:e=>s.compact.format(e)},height:300,ariaLabel:e(`salaryAria`)})]})}var G,K,q,J,Ae,je;function Me(){return(Me=e((()=>{G=t(),i(),a(),h(),K=n(),q=[{key:`junior`,min:7e4,max:95e3},{key:`intermediate`,min:88e3,max:12e4},{key:`senior`,min:115e3,max:155e3},{key:`staff`,min:145e3,max:19e4},{key:`principal`,min:175e3,max:23e4},{key:`director`,min:19e4,max:26e4}],J=5e3,Ae=6e4,je=27e4})))()}function Ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,[i,a]=(0,Y.useState)(`revenue`),[o,c]=(0,Y.useState)(`5`),l=(0,Y.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),t=new Intl.NumberFormat(n);return n=>i===`revenue`?e.format(n):t.format(n)},[n,i]),d=(0,Y.useMemo)(()=>[...Q].sort((e,t)=>Z[t][i]-Z[e][i]).slice(0,Number(o)),[i,o]),f=(0,Y.useMemo)(()=>[{name:e(i===`revenue`?`revenue`:`unitsSold`),color:i===`revenue`?`var(--chart-series-1, #4f46e5)`:`var(--chart-series-3, #f59e0b)`,data:d.map(t=>[e(`products.${t}`),Z[t][i]])}],[e,i,d]),p=d.reduce((e,t)=>e+Z[t][i],0)/Q.reduce((e,t)=>e+Z[t][i],0);return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:16},children:[(0,X.jsxs)(s,{"aria-label":e(`rankBy`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,X.jsx)(u,{value:`revenue`,children:e(`revenue`)}),(0,X.jsx)(u,{value:`units`,children:e(`unitsSold`)})]}),(0,X.jsxs)(ee,{size:`small`,style:{width:140},"aria-label":e(`show`),value:o,onChange:c,children:[(0,X.jsx)(m,{value:`3`,children:e(`topN`,{n:3})}),(0,X.jsx)(m,{value:`5`,children:e(`topN`,{n:5})}),(0,X.jsx)(m,{value:String(Q.length),children:e(`allProducts`)})]})]}),(0,X.jsx)(g,{series:f,labels:!0,legend:!1,yAxis:{format:l},height:Math.max(160,48+d.length*30),ariaLabel:e(`topProductsAria`)}),(0,X.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`topShare`,{n:d.length,share:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}).format(p)})})]})}var Y,X,Z,Q;function Pe(){return(Pe=e((()=>{Y=t(),i(),c(),l(),p(),h(),X=n(),Z={headphones:{revenue:184200,units:921},smartwatch:{revenue:162800,units:592},speaker:{revenue:95400,units:1060},keyboard:{revenue:71300,units:713},charger:{revenue:48900,units:1956},webcam:{revenue:45200,units:502},mouse:{revenue:39800,units:995},tablet:{revenue:138500,units:277},cable:{revenue:21600,units:2160},stand:{revenue:33700,units:674}},Q=Object.keys(Z)})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Share of developers using each language (%), survey of 2026
const languages: [string, number][] = [
  ["JavaScript", 62.3],
  ["Python", 51.0],
  ["TypeScript", 43.4],
  ["Java", 30.3],
  ["C#", 27.1],
  ["Go", 17.7],
  ["Rust", 15.2],
  ["Kotlin", 10.1],
  ["Swift", 8.4],
  ["Ruby", 5.9],
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // ranked from the top: the first category is drawn at the top
  const series = useMemo(
    (): ChartSeries[] => [{ name: t("developers"), data: languages }],
    [t],
  );
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={340}
      ariaLabel={t("languagesAria")}
    />
  );
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Answers to an employee survey (% of respondents); disagreement is drawn
// to the left of zero, agreement to the right
const statements = ["career", "workload", "tools", "manager", "pay"] as const;
const answers: Record<
  (typeof statements)[number],
  [number, number, number, number]
> = {
  // strongly disagree, disagree, agree, strongly agree
  career: [12, 24, 41, 15],
  workload: [18, 30, 36, 9],
  tools: [5, 14, 49, 27],
  manager: [4, 9, 44, 39],
  pay: [21, 33, 31, 8],
};

export default function DivergingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const rows = statements.map((s) => t(\`statements.\${s}\`));
    const scale = [
      { key: "stronglyDisagree", sign: -1, index: 0, color: "#dc2626" },
      { key: "disagree", sign: -1, index: 1, color: "#f87171" },
      { key: "agree", sign: 1, index: 2, color: "#34d399" },
      { key: "stronglyAgree", sign: 1, index: 3, color: "#059669" },
    ] as const;
    // the inner answers first, so that they touch zero
    return [scale[1], scale[0], scale[2], scale[3]].map((level) => ({
      name: t(\`likert.\${level.key}\`),
      color: level.color,
      data: statements.map(
        (s, i) => [rows[i] ?? s, level.sign * answers[s][level.index]] as const,
      ),
    }));
  }, [t]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { style: "percent" });
    // both sides are positive shares
    return (value: number) => format.format(Math.abs(value) / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      stacked
      yAxis={{ format: percent }}
      annotations={[{ type: "line", axis: "y", value: 0, dash: [] }]}
      legend={{ position: "bottom" }}
      height={320}
      ariaLabel={t("surveyAria")}
    />
  );
}
`})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HorizontalBarChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Availability target (SLO) and measured availability of each service over
// the last 30 days; service names are identifiers and stay untranslated
const services = [
  { name: "checkout-api", slo: 0.999, availability: 0.99962 },
  { name: "auth", slo: 0.9995, availability: 0.99971 },
  { name: "search", slo: 0.995, availability: 0.99712 },
  { name: "payments", slo: 0.9999, availability: 0.99984 },
  { name: "notifications", slo: 0.99, availability: 0.99581 },
  { name: "inventory", slo: 0.999, availability: 0.99915 },
  { name: "recommendations", slo: 0.99, availability: 0.98874 },
  { name: "media-cdn", slo: 0.9995, availability: 0.99988 },
] as const;
const WINDOW_MINUTES = 30 * 24 * 60;
const FREEZE = 20; // below this share of budget left, releases are frozen

// share of the allowed downtime that is still left (negative: overspent)
const budgetLeft = (s: (typeof services)[number]) =>
  (1 - (1 - s.availability) / (1 - s.slo)) * 100;
const rows = services
  .map((service) => ({ ...service, left: budgetLeft(service) }))
  .sort((a, b) => a.left - b.left);

export default function ErrorBudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const formats = useMemo(
    () => ({
      percent: (value: number) =>
        new Intl.NumberFormat(locale, {
          style: "percent",
          maximumFractionDigits: 0,
        }).format(value / 100),
      precise: new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }),
      minutes: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "minute",
        unitDisplay: "long",
        maximumFractionDigits: 0,
      }),
    }),
    [locale],
  );

  // worst first; the color follows the remaining budget
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("budgetLeft"),
        data: rows.map((row) => ({
          x: row.name,
          y: row.left,
          color:
            row.left < 0
              ? "var(--danger-color)"
              : row.left < FREEZE
                ? "var(--warning-color)"
                : "var(--success-color)",
        })),
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: FREEZE,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("releaseFreeze"),
      },
    ],
    [t],
  );

  const onPointClick = (event: ChartHoverEvent) => {
    const index = event.items[0]?.index;
    if (index !== undefined) setSelected(index);
  };

  const row = selected === null ? undefined : rows[selected];
  const allowed = row ? (1 - row.slo) * WINDOW_MINUTES : 0;
  const used = row ? (1 - row.availability) * WINDOW_MINUTES : 0;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setSelected(null)}
        yAxis={{ format: formats.percent }}
        height={320}
        ariaLabel={t("budgetAriaSlo")}
      />
      <output aria-live="polite" style={{ minHeight: "3em" }}>
        {row ? (
          <>
            <strong>{row.name}</strong>
            {" · "}
            {t("budgetDetails", {
              slo: formats.precise.format(row.slo),
              availability: formats.precise.format(row.availability),
            })}
            <br />
            <span
              style={{
                color:
                  allowed - used < 0
                    ? "var(--danger-color)"
                    : "var(--text-secondary-color)",
              }}
            >
              {allowed - used < 0
                ? t("budgetOverspent", {
                    minutes: formats.minutes.format(used - allowed),
                  })
                : t("budgetMinutesLeft", {
                    minutes: formats.minutes.format(allowed - used),
                    allowed: formats.minutes.format(allowed),
                  })}
            </span>
          </>
        ) : (
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("clickService")}
          </span>
        )}
      </output>
    </div>
  );
}
`})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Yearly budget and actual spend per department (k€)
const departments = {
  engineering: [1450, 1520],
  marketing: [620, 540],
  sales: [880, 910],
  support: [310, 295],
  finance: [240, 228],
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(departments) as (keyof typeof departments)[];
    return (["budget", "actual"] as const).map((name, k) => ({
      name: t(name),
      data: keys.map(
        (d) => [t(\`departments.\${d}\`), departments[d][k] ?? 0] as const,
      ),
    }));
  }, [t]);
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      yAxis={{ format: euros }}
      height={340}
      ariaLabel={t("budgetAria")}
    />
  );
}
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Votes of the most requested features of a public roadmap
const requests = [
  ["darkMode", 1842],
  ["offlineMode", 1310],
  ["exportPdf", 1104],
  ["sso", 960],
  ["calendarSync", 712],
  ["bulkEdit", 655],
  ["customFields", 489],
] as const;

export default function LongLabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // long names read naturally on the left, without rotated labels
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("votes"),
        color: "var(--chart-series-5, #0ea5e9)",
        data: requests.map(
          ([key, votes]) => [t(\`features.\${key}\`), votes] as const,
        ),
      },
    ],
    [t],
  );
  const integer = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: (value) => integer.format(value), title: t("votes") }}
      height={300}
      ariaLabel={t("featuresAria")}
    />
  );
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Change of the monthly active users per region since last quarter (%)
const changes = [
  ["northAmerica", 6.4],
  ["europe", 3.1],
  ["asiaPacific", 11.8],
  ["latinAmerica", -2.7],
  ["middleEast", -5.2],
  ["africa", 8.9],
] as const;

export default function NegativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  // negative values grow to the left of zero; each bar sets its color
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("growth"),
        format: percent,
        data: changes.map(([region, value]) => ({
          x: t(\`regions.\${region}\`),
          y: value,
          color:
            value >= 0
              ? "var(--success-color, #16a34a)"
              : "var(--danger-color, #dc2626)",
        })),
      },
    ],
    [t, percent],
  );

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={300}
      ariaLabel={t("growthAria")}
    />
  );
}
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Issues of the current milestone per team: done, in review, to do
const teams = {
  platform: [42, 6, 12],
  payments: [18, 9, 21],
  mobile: [30, 4, 4],
  growth: [11, 7, 26],
  design: [24, 2, 3],
};

export default function ProgressDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(teams) as (keyof typeof teams)[];
    const status = [
      { key: "done", color: "var(--success-color, #16a34a)" },
      { key: "review", color: "var(--warning-color, #f59e0b)" },
      { key: "todo", color: "var(--border-color, #cbd5e1)" },
    ] as const;
    return status.map((s, k) => ({
      name: t(\`status.\${s.key}\`),
      color: s.color,
      data: keys.map(
        (team) => [t(\`teams.\${team}\`), teams[team][k] ?? 0] as const,
      ),
    }));
  }, [t]);

  // percent: every team fills the width; the tooltip keeps the counts
  return (
    <HorizontalBarChart
      series={series}
      percent
      height={280}
      ariaLabel={t("progressAria")}
    />
  );
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Cumulative installed solar capacity at the end of each year, in GW
// (rounded figures, 2015 to 2024)
const FIRST_YEAR = 2015;
const capacity: Record<string, number[]> = {
  CN: [43, 77, 130, 175, 205, 253, 307, 393, 609, 887],
  US: [26, 41, 51, 62, 75, 95, 123, 142, 175, 225],
  JP: [34, 42, 49, 56, 63, 71, 74, 79, 87, 92],
  DE: [39, 41, 42, 45, 49, 54, 59, 67, 82, 99],
  IN: [5, 10, 18, 27, 35, 39, 49, 63, 73, 98],
  IT: [19, 19, 20, 20, 21, 22, 23, 25, 30, 37],
  AU: [6, 7, 7, 11, 16, 20, 25, 29, 33, 37],
  ES: [5, 5, 5, 5, 9, 13, 17, 24, 31, 38],
  BR: [0, 0, 1, 2, 5, 8, 13, 24, 37, 52],
  FR: [7, 7, 8, 9, 9, 11, 13, 16, 19, 24],
  NL: [2, 2, 3, 5, 7, 11, 15, 19, 23, 27],
  KR: [4, 5, 6, 8, 11, 15, 18, 21, 24, 27],
};
const countries = Object.keys(capacity);
// one stable color per country: the 8 palette colors, then 4 more
const COLORS = [
  "var(--chart-series-1, #4f46e5)",
  "var(--chart-series-2, #10b981)",
  "var(--chart-series-3, #f59e0b)",
  "var(--chart-series-4, #ef4444)",
  "var(--chart-series-5, #0ea5e9)",
  "var(--chart-series-6, #8b5cf6)",
  "var(--chart-series-7, #14b8a6)",
  "var(--chart-series-8, #f97316)",
  "#ec4899",
  "#84cc16",
  "#64748b",
  "#a16207",
];
const YEARS = 10;
const STEPS_PER_YEAR = 10;
const LAST_FRAME = (YEARS - 1) * STEPS_PER_YEAR;
const SHOWN = 8;

// capacity of a country between two year ends, linearly interpolated
const valueAt = (country: string, frame: number) => {
  const values = capacity[country] ?? [];
  const year = Math.floor(frame / STEPS_PER_YEAR);
  const t = (frame % STEPS_PER_YEAR) / STEPS_PER_YEAR;
  const from = values[year] ?? 0;
  const to = values[Math.min(year + 1, YEARS - 1)] ?? from;
  return from + (to - from) * t;
};

export default function RaceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  const finished = frame >= LAST_FRAME;
  const running = playing && !finished;

  // one step every 120 ms; the interval stops at the last year and on unmount
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setFrame((current) => Math.min(current + 1, LAST_FRAME));
    }, 120);
    return () => window.clearInterval(id);
  }, [running]);

  const names = useMemo(
    () => new Intl.DisplayNames(locale, { type: "region" }),
    [locale],
  );
  const gw = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    return (value: number) => t("gigawatts", { value: format.format(value) });
  }, [locale, t]);

  // re-sorted every frame; each country keeps its palette color
  const series = useMemo((): ChartSeries[] => {
    const rows = countries
      .map((code, i) => ({ code, i, value: valueAt(code, frame) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, SHOWN);
    return [
      {
        name: t("solarCapacity"),
        data: rows.map((row) => ({
          x: names.of(row.code) ?? row.code,
          y: row.value,
          color: COLORS[row.i % COLORS.length],
        })),
      },
    ];
  }, [t, names, frame]);

  const year = FIRST_YEAR + Math.floor(frame / STEPS_PER_YEAR);
  const play = () => {
    if (finished) setFrame(0);
    setPlaying(true);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        {running ? (
          <Button
            size="small"
            variant="outline"
            onClick={() => setPlaying(false)}
          >
            {t("pause")}
          </Button>
        ) : (
          <Button size="small" onClick={play}>
            {finished ? t("replay") : t("play")}
          </Button>
        )}
        <Button
          size="small"
          variant="outline"
          disabled={frame === 0}
          onClick={() => {
            setPlaying(false);
            setFrame(0);
          }}
        >
          {t("restart")}
        </Button>
        <output aria-live="off" style={{ marginInlineStart: "auto" }}>
          <Tag size="large">
            {new Intl.NumberFormat(locale, { useGrouping: false }).format(year)}
          </Tag>
        </output>
      </div>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        yAxis={{ format: gw }}
        height={320}
        ariaLabel={t("raceAria", {
          year: new Intl.NumberFormat(locale, { useGrouping: false }).format(
            year,
          ),
        })}
      />
    </div>
  );
}
`})))()}var $;function Ze(){return(Ze=e((()=>{$=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  HorizontalBarChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Yearly base salary band of each job level, in dollars
const bands = [
  { key: "junior", min: 70000, max: 95000 },
  { key: "intermediate", min: 88000, max: 120000 },
  { key: "senior", min: 115000, max: 155000 },
  { key: "staff", min: 145000, max: 190000 },
  { key: "principal", min: 175000, max: 230000 },
  { key: "director", min: 190000, max: 260000 },
] as const;
const STEP = 5000;
const LOWEST = 60000;
const HIGHEST = 270000;

export default function SalaryBandsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [offer, setOffer] = useState(150000);

  const formats = useMemo(
    () => ({
      usd: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
      compact: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
      list: new Intl.ListFormat(locale, { type: "conjunction" }),
    }),
    [locale],
  );

  const fits = useMemo(
    () => bands.filter((band) => offer >= band.min && offer <= band.max),
    [offer],
  );
  // floating bars: y0 is the bottom of the band and y its top; the bands the
  // offer falls into are highlighted through their datum color
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("salaryBand"),
        data: bands.map((band) => ({
          x: t(\`levels.\${band.key}\`),
          y0: band.min,
          y: band.max,
          color: fits.includes(band)
            ? "var(--success-color)"
            : "var(--border-strong-color)",
        })),
      },
    ],
    [t, fits],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: offer,
        width: 2,
        color: "var(--primary-color)",
        label: t("offer"),
      },
    ],
    [t, offer],
  );

  const renderTooltip = (event: ChartHoverEvent) => {
    const band = bands[event.items[0]?.index ?? -1];
    if (!band) return null;
    const mid = (band.min + band.max) / 2;
    const rows = [
      [t("bandMin"), band.min],
      [t("bandMid"), mid],
      [t("bandMax"), band.max],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2px 16px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>
              {formats.usd.format(value)}
            </span>
          </span>
        ))}
        <span>{t("compaRatio")}</span>
        <strong style={{ textAlign: "end" }}>
          {formats.percent.format(offer / mid)}
        </strong>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          disabled={offer <= LOWEST}
          onClick={() => setOffer((value) => value - STEP)}
        >
          {t("offerDown", { step: formats.compact.format(STEP) })}
        </Button>
        <Button
          size="small"
          variant="outline"
          disabled={offer >= HIGHEST}
          onClick={() => setOffer((value) => value + STEP)}
        >
          {t("offerUp", { step: formats.compact.format(STEP) })}
        </Button>
        <output aria-live="polite">
          {fits.length > 0
            ? t("offerFits", {
                offer: formats.usd.format(offer),
                levels: formats.list.format(
                  fits.map((band) => t(\`levels.\${band.key}\`)),
                ),
              })
            : t("offerOutside", { offer: formats.usd.format(offer) })}
        </output>
      </div>
      <HorizontalBarChart
        series={series}
        annotations={annotations}
        renderTooltip={renderTooltip}
        legend={false}
        yAxis={{
          zero: false,
          min: 50000,
          max: 280000,
          format: (y) => formats.compact.format(y),
        }}
        height={300}
        ariaLabel={t("salaryAria")}
      />
    </div>
  );
}
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Select, SelectItem } from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

type Metric = "revenue" | "units";

// Sales of the online shop last month: revenue in dollars and units sold
const products = {
  headphones: { revenue: 184200, units: 921 },
  smartwatch: { revenue: 162800, units: 592 },
  speaker: { revenue: 95400, units: 1060 },
  keyboard: { revenue: 71300, units: 713 },
  charger: { revenue: 48900, units: 1956 },
  webcam: { revenue: 45200, units: 502 },
  mouse: { revenue: 39800, units: 995 },
  tablet: { revenue: 138500, units: 277 },
  cable: { revenue: 21600, units: 2160 },
  stand: { revenue: 33700, units: 674 },
} as const;
type Product = keyof typeof products;
const keys = Object.keys(products) as Product[];

export default function TopNDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");
  const [limit, setLimit] = useState("5");

  const format = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale);
    return (value: number) =>
      metric === "revenue" ? usd.format(value) : number.format(value);
  }, [locale, metric]);

  // sorted from the highest value, then cut: the first row is drawn at the top
  const ranked = useMemo(
    () =>
      [...keys]
        .sort((a, b) => products[b][metric] - products[a][metric])
        .slice(0, Number(limit)),
    [metric, limit],
  );
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: metric === "revenue" ? t("revenue") : t("unitsSold"),
        color:
          metric === "revenue"
            ? "var(--chart-series-1, #4f46e5)"
            : "var(--chart-series-3, #f59e0b)",
        data: ranked.map(
          (key) => [t(\`products.\${key}\`), products[key][metric]] as const,
        ),
      },
    ],
    [t, metric, ranked],
  );
  const share =
    ranked.reduce((sum, key) => sum + products[key][metric], 0) /
    keys.reduce((sum, key) => sum + products[key][metric], 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
        }}
      >
        <RadioGroup
          aria-label={t("rankBy")}
          direction="horizontal"
          value={metric}
          onChange={(value) => setMetric(value as Metric)}
        >
          <Radio value="revenue">{t("revenue")}</Radio>
          <Radio value="units">{t("unitsSold")}</Radio>
        </RadioGroup>
        <Select
          size="small"
          style={{ width: 140 }}
          aria-label={t("show")}
          value={limit}
          onChange={setLimit}
        >
          <SelectItem value="3">{t("topN", { n: 3 })}</SelectItem>
          <SelectItem value="5">{t("topN", { n: 5 })}</SelectItem>
          <SelectItem value={String(keys.length)}>
            {t("allProducts")}
          </SelectItem>
        </Select>
      </div>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        yAxis={{ format }}
        height={Math.max(160, 48 + ranked.length * 30)}
        ariaLabel={t("topProductsAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("topShare", {
          n: ranked.length,
          share: new Intl.NumberFormat(locale, {
            style: "percent",
            maximumFractionDigits: 0,
          }).format(share),
        })}
      </output>
    </div>
  );
}
`})))()}var et,tt,nt;function rt(){return(rt=e((()=>{ce(),b(),he(),O(),M(),I(),Se(),Oe(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),Je(),Xe(),Ze(),$e(),t(),ne(),ie(),et=n(),tt=te(Object.assign({"./demos/basic.tsx":ae,"./demos/diverging.tsx":le,"./demos/error-budget.tsx":fe,"./demos/grouped.tsx":ge,"./demos/long-labels.tsx":ve,"./demos/negative.tsx":ye,"./demos/progress.tsx":be,"./demos/race.tsx":Ce,"./demos/salary-bands.tsx":ke,"./demos/top-n.tsx":Ne}),Object.assign({"./demos/basic.tsx":Fe,"./demos/diverging.tsx":Le,"./demos/error-budget.tsx":ze,"./demos/grouped.tsx":Ve,"./demos/long-labels.tsx":Ue,"./demos/negative.tsx":Ge,"./demos/progress.tsx":qe,"./demos/race.tsx":Ye,"./demos/salary-bands.tsx":$,"./demos/top-n.tsx":Qe})),nt=()=>(0,et.jsx)(re,{id:`horizontal-bar-chart`,demos:tt})})))()}rt();export{nt as default};