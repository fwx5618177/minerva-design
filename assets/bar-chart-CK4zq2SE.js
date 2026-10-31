import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{n as s,t as c}from"./Switch-BCh7GKwc.js";import{i as l,o as ee,t as te}from"./Select-BIYfjWQ3.js";import{l as u,n as d,t as ne,u as re}from"./DocPage-CHJwIegD.js";import{g as f,m as p}from"./charts-JJDQ3gS7.js";function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,ae.useMemo)(()=>[{name:e(`ticketsClosed`),data:se.map((t,n)=>[e(`quarter`,{n:n+1}),t])}],[e]);return(0,oe.jsx)(f,{series:t,height:280,ariaLabel:e(`ticketsAria`)})}var ae,oe,se;function ce(){return(ce=e((()=>{ae=t(),i(),p(),oe=n(),se=[320,410,385,470]})))()}function le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ue(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,de.useMemo)(()=>[{name:e(`orders`),data:g},{name:e(`average7`),type:`line`,data:_,lineWidth:3}],[e]);return(0,m.jsx)(f,{series:t,xAxis:{title:e(`day`)},height:300,ariaLabel:e(`ordersAria`)})}var de,m,h,g,_;function fe(){return(fe=e((()=>{de=t(),i(),p(),m=n(),h=le(5),g=Array.from({length:30},(e,t)=>Math.round(60+t*1.5+h()*40)),_=g.map((e,t)=>{let n=g.slice(Math.max(0,t-6),t+1);return Math.round(n.reduce((e,t)=>e+t,0)/n.length)})})))()}function pe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,v.useMemo)(()=>[{name:e(`deploysOk`),color:`var(--success-color)`,data:w.map(e=>[e.time,e.ok])},{name:e(`deploysFailed`),color:`var(--danger-color)`,data:w.map(e=>[e.time,e.failed])}],[e]),a=(0,v.useMemo)(()=>[...w.filter(e=>new Date(e.time).getDay()===6).map(e=>({type:`rect`,x0:e.time-b/2,x1:e.time+3*b/2,color:`var(--text-secondary-color)`,opacity:.07})),{type:`rect`,x0:x+S[0]*b-b/2,x1:x+S[1]*b+b/2,color:`var(--warning-color)`,opacity:.14,label:e(`changeFreeze`),labelPosition:`top-right`}],[e]),o=(0,v.useMemo)(()=>({decimal:new Intl.NumberFormat(n,{maximumFractionDigits:1}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),tick:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`})}),[n]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,y.jsx)(f,{series:i,stacked:!0,annotations:a,xAxis:{type:`time`,format:e=>o.tick.format(e)},tooltip:{mode:`axis`},height:300,ariaLabel:e(`deploysAria`)}),(0,y.jsx)(`p`,{style:{margin:0},children:e(`deploysSummary`,{perDay:o.decimal.format(T/ge),failure:o.percent.format(_e/T)})})]})}var v,y,b,x,he,S,C,w,ge,T,_e;function ve(){return(ve=e((()=>{v=t(),i(),p(),y=n(),b=864e5,x=new Date(2026,8,7).getTime(),he=56,S=[38,43],C=pe(42),w=Array.from({length:he},(e,t)=>{let n=x+t*b,r=[0,6].includes(new Date(n).getDay()),i=t>=S[0]&&t<=S[1],a=r||i?+(C()<.15):Math.round(4+C()*6+t/14),o=a>0&&C()<.35?C()<.8?1:2:0;return{time:n,weekend:r,ok:a-Math.min(o,a),failed:o}}),ge=w.filter(e=>!e.weekend).length,T=w.reduce((e,t)=>e+t.ok+t.failed,0),_e=w.reduce((e,t)=>e+t.failed,0)})))()}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,[i,a]=(0,E.useState)(null),[s,c]=(0,E.useState)(null),l=(0,E.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e3)},[n]),ee=(0,E.useMemo)(()=>{if(i===null)return[{name:e(`revenue`),data:[0,1,2,3].map(t=>[e(`quarter`,{n:t+1}),k(t)])}];let t=new Intl.DateTimeFormat(n,{month:`long`});return[{name:e(`revenue`),color:`var(--chart-series-2, #10b981)`,data:[0,1,2].map(e=>{let n=i*3+e;return[t.format(new Date(2026,n,1)),O[n]??0]})}]},[e,n,i]);return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,D.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,minHeight:32},children:[i!==null&&(0,D.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{a(null),c(null)},children:e(`backToQuarters`)}),(0,D.jsx)(`output`,{"aria-live":`polite`,children:i===null?e(`drillHint`):s??e(`quarterDetail`,{quarter:e(`quarter`,{n:i+1}),value:l(k(i))})})]}),(0,D.jsx)(f,{series:ee,labels:!0,onPointClick:t=>{let n=t.items[0];n&&(i===null?(a(n.index),c(null)):c(e(`pickedMonth`,{month:t.xLabel,value:l(n.y)})))},tooltip:{mode:`item`},yAxis:{format:l},legend:!1,height:300,ariaLabel:i===null?e(`quartersAria`):e(`monthsAria`,{quarter:e(`quarter`,{n:i+1})})})]})}var E,D,O,k;function A(){return(A=e((()=>{E=t(),i(),a(),p(),D=n(),O=[412,389,455,470,498,463,441,429,517,552,648,731],k=e=>O.slice(e*3,e*3+3).reduce((e,t)=>e+t,0)})))()}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,[i,a]=(0,j.useState)(3),o=(0,j.useMemo)(()=>{let e=0;for(let t=1;t+i<=N.length;t++)z(t,i)<z(e,i)&&(e=t);return e},[i]),s=(0,j.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`});return{hour:t=>e.format(new Date(2026,10,1,t)),price:new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}),cost:new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`})}},[n]),c=(0,j.useMemo)(()=>[{name:e(`offPeak`),color:`var(--success-color)`,test:e=>e<=F},{name:e(`standard`),color:`var(--primary-color)`,test:e=>e>F&&e<I},{name:e(`peak`),color:`var(--danger-color)`,test:e=>e>=I}].map(e=>({name:e.name,color:e.color,data:N.map((t,n)=>[s.hour(n),e.test(t)?t:0])})),[e,s]),l=(0,j.useMemo)(()=>[{type:`rect`,x0:o-.5,x1:o+i-.5,color:`var(--success-color)`,opacity:.12,label:e(`chargeHere`),labelPosition:`top-left`},{type:`line`,axis:`y`,value:xe,dash:[4,4],color:`var(--text-secondary-color)`,label:e(`dailyAverage`)}],[e,o,i]),u=z(o,i),d=z(R,i);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,M.jsx)(ee,{size:`small`,style:{width:200},"aria-label":e(`chargingTime`),value:String(i),onChange:e=>a(Number(e)),children:[2,3,4,5].map(t=>(0,M.jsx)(te,{value:String(t),children:e(`chargeFor`,{energy:new Intl.NumberFormat(n).format(t*L),duration:new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,unitDisplay:`long`}).format(t)})},t))}),(0,M.jsx)(`output`,{"aria-live":`polite`,children:e(`chargeAdvice`,{start:s.hour(o),end:s.hour((o+i)%24),cost:s.cost.format(u),saving:s.cost.format(d-u),plugIn:s.hour(R)})})]}),(0,M.jsx)(f,{series:c,stacked:!0,annotations:l,tooltip:{mode:`item`},yAxis:{title:e(`pricePerMwh`),format:e=>s.price.format(e)},height:300,ariaLabel:e(`pricesAria`)})]})}var j,M,N,P,F,I,xe,L,R,z;function Se(){return(Se=e((()=>{j=t(),i(),l(),p(),M=n(),N=Array.from({length:24},(e,t)=>{let n=38*Math.exp(-((t-8)**2)/4),r=62*Math.exp(-((t-19)**2)/5),i=-46*Math.exp(-((t-13)**2)/6);return Math.round((72+n+r+i+6*Math.sin(t))*10)/10}),P=[...N].sort((e,t)=>e-t),F=P[5]??0,I=P[18]??0,xe=N.reduce((e,t)=>e+t,0)/N.length,L=11,R=18,z=(e,t)=>N.slice(e,e+t).reduce((e,t)=>e+t/1e3*L,0)})))()}function Ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,B.useMemo)(()=>{let t=Te(n);return Object.keys(V).map(n=>({name:e(`cities.${n}`),data:t.map((e,t)=>[e,V[n][t]])}))},[e,n]),a=(0,B.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`}),[n]);return(0,we.jsx)(f,{series:i,yAxis:{format:e=>a.format(e)},height:300,ariaLabel:e(`rainfallAria`)})}var B,we,V,Te;function Ee(){return(Ee=e((()=>{B=t(),i(),p(),we=n(),V={london:[55,41,41,44,49,45,45,50,49,69,59,55],tokyo:[52,56,118,125,138,168,154,168,210,198,93,51],paris:[51,41,48,52,63,50,63,53,48,61,51,58]},Te=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function De(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,H.useMemo)(()=>Object.entries(ke).map(([t,n])=>({name:t,data:n.map((t,n)=>[e(`quarter`,{n:n+1}),t])})),[e]),a=(0,H.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,Oe.jsx)(f,{series:i,labels:!0,yAxis:{format:a},height:300,ariaLabel:e(`revenueAria`)})}var H,Oe,ke;function Ae(){return(Ae=e((()=>{H=t(),i(),p(),Oe=n(),ke={2025:[312,348,365,421],2026:[356,402,431,488]}})))()}function je(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,Me.useMemo)(()=>Fe.map(({key:t,color:n,values:r})=>({name:e(`nps.${t}`),color:n,data:Pe.map((t,n)=>[e(`regions.${t}`),r[n]])})),[e]);return(0,Ne.jsx)(f,{series:t,percent:!0,height:300,ariaLabel:e(`npsAria`)})}var Me,Ne,Pe,Fe;function Ie(){return(Ie=e((()=>{Me=t(),i(),p(),Ne=n(),Pe=[`northAmerica`,`europe`,`asiaPacific`,`latinAmerica`,`middleEast`],Fe=[{key:`promoters`,color:`var(--success-color)`,values:[612,540,702,288,164]},{key:`passives`,color:`var(--warning-color)`,values:[254,310,268,131,92]},{key:`detractors`,color:`var(--danger-color)`,values:[134,196,118,97,61]}]})))()}function Le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,[i,a]=(0,U.useState)(!0),o=(0,U.useMemo)(()=>{let t=K.map(t=>e(`hiringDepartments.${t}`));return[{id:`previous`,name:e(`previousYear`),color:`var(--border-strong-color)`,hidden:!i,data:K.map((e,n)=>[t[n]??e,G[e][0]])},{id:`current`,name:e(`currentYear`),color:`var(--primary-color)`,data:K.map((e,n)=>[t[n]??e,G[e][1]])}]},[e,i]),s=(0,U.useMemo)(()=>({number:new Intl.NumberFormat(n),change:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0,signDisplay:`exceptZero`})}),[n]);return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsx)(c,{checked:i,onChange:a,label:e(`compareLastYear`)}),(0,W.jsx)(f,{series:o,renderTooltip:t=>{let n=K[t.items[0]?.index??-1];if(!n)return null;let[r,i]=G[n],a=i/r-1;return(0,W.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr auto`,gap:`2px 16px`},children:[(0,W.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),(0,W.jsx)(`span`,{children:e(`currentYear`)}),(0,W.jsx)(`strong`,{style:{textAlign:`end`},children:s.number.format(i)}),(0,W.jsx)(`span`,{children:e(`previousYear`)}),(0,W.jsx)(`span`,{style:{textAlign:`end`},children:s.number.format(r)}),(0,W.jsx)(`span`,{children:e(`change`)}),(0,W.jsx)(`span`,{style:{textAlign:`end`,color:a>=0?`var(--success-color)`:`var(--danger-color)`},children:s.change.format(a)})]})},yAxis:{format:e=>s.number.format(e)},height:300,ariaLabel:e(`hiresAria`)})]})}var U,W,G,K;function Re(){return(Re=e((()=>{U=t(),i(),s(),p(),W=n(),G={engineering:[64,81],product:[12,15],design:[9,7],sales:[38,52],marketing:[17,13],support:[26,31]},K=Object.keys(G)})))()}function ze(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,q.useMemo)(()=>{let t=He(n);return[{name:e(`netResult`),data:Ve.map((e,n)=>({x:t[n],y:e,color:e>=0?`var(--success-color)`:`var(--danger-color)`}))}]},[e,n]),a=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,signDisplay:`exceptZero`});return t=>e.format(t*1e3)},[n]);return(0,Be.jsx)(f,{series:i,yAxis:{format:a},annotations:[{type:`line`,axis:`y`,value:0}],legend:!1,height:300,ariaLabel:e(`profitAria`)})}var q,Be,Ve,He;function Ue(){return(Ue=e((()=>{q=t(),i(),p(),Be=n(),Ve=[-42,-18,12,35,28,-9,41,66,58,73,49,92],He=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function We(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,J.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=[...Ke].sort((e,t)=>t[1]-e[1]);return[{name:e(`unitsSold`),showLabels:!0,data:r.map(([e,n])=>[t.of(e)??e,n])}]},[e,n]),a=(0,J.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,Ge.jsx)(f,{series:i,yAxis:{format:a},height:320,ariaLabel:e(`rankingAria`)})}var J,Ge,Ke;function qe(){return(qe=e((()=>{J=t(),i(),p(),Ge=n(),Ke=[[`FR`,182],[`US`,541],[`JP`,326],[`DE`,248],[`BR`,97],[`CN`,463],[`GB`,205],[`IN`,151],[`CA`,118],[`KR`,134]]})))()}function Je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,Ye.useMemo)(()=>{let t=Ze(n,6);return Object.keys(Y).map(n=>({name:e(`channels.${n}`),data:t.map((e,t)=>[e,Y[n][t]])}))},[e,n]);return(0,Xe.jsx)(f,{series:i,stacked:!0,height:300,ariaLabel:e(`channelsAria`)})}var Ye,Xe,Y,Ze;function Qe(){return(Qe=e((()=>{Ye=t(),i(),p(),Xe=n(),Y={web:[120,135,150,148,170,190],mobile:[80,95,110,125,140,160],partners:[30,28,35,42,40,51]},Ze=(e,t)=>{let n=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:t},(e,t)=>n.format(new Date(2026,t,1)))}})))()}function $e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,et.useMemo)(()=>[{name:e(`newCustomers`),data:Q.map((t,n)=>({x:e(`week`,{n:n+1}),y:t,color:t>=Z?`var(--primary-color)`:`var(--border-strong-color)`}))}],[e]),a=Q.filter(e=>e>=Z).length,o=new Intl.NumberFormat(n,{style:`percent`});return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,X.jsx)(f,{series:i,annotations:[{type:`line`,axis:`y`,value:Z,color:`var(--warning-color)`,dash:[6,4],width:2,label:e(`weeklyTarget`)}],legend:!1,height:300,ariaLabel:e(`targetAria`)}),(0,X.jsx)(`p`,{children:e(`targetSummary`,{reached:a,total:Q.length,rate:o.format(a/Q.length)})})]})}var et,X,Z,Q;function tt(){return(tt=e((()=>{et=t(),i(),p(),X=n(),Z=120,Q=[96,104,131,118,142,125,109,137,151,128,146,163]})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useMemo } from "react";
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
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo } from "react";
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
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  type ChartAnnotation,
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
// a Monday, local midnight: the time axis places its ticks in local time
const START = new Date(2026, 8, 7).getTime();
const DAYS = 56;
const FREEZE = [38, 43] as const; // a change freeze before a big launch

// Production deployments per day, and the ones that were rolled back
const random = mulberry32(42);
const days = Array.from({ length: DAYS }, (_, i) => {
  const time = START + i * DAY;
  const weekend = [0, 6].includes(new Date(time).getDay());
  const frozen = i >= FREEZE[0] && i <= FREEZE[1];
  const total =
    weekend || frozen
      ? random() < 0.15
        ? 1
        : 0
      : Math.round(4 + random() * 6 + i / 14);
  const failed = total > 0 && random() < 0.35 ? (random() < 0.8 ? 1 : 2) : 0;
  return { time, weekend, ok: total - Math.min(failed, total), failed };
});
const workingDays = days.filter((d) => !d.weekend).length;
const deployed = days.reduce((sum, d) => sum + d.ok + d.failed, 0);
const rolledBack = days.reduce((sum, d) => sum + d.failed, 0);

export default function DeploymentsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("deploysOk"),
        color: "var(--success-color)",
        data: days.map((d) => [d.time, d.ok] as const),
      },
      {
        name: t("deploysFailed"),
        color: "var(--danger-color)",
        data: days.map((d) => [d.time, d.failed] as const),
      },
    ],
    [t],
  );
  // every weekend, from Saturday to Monday (bars are centered on midnight)
  const annotations = useMemo((): ChartAnnotation[] => {
    const weekends: ChartAnnotation[] = days
      .filter((d) => new Date(d.time).getDay() === 6)
      .map((d) => ({
        type: "rect",
        x0: d.time - DAY / 2,
        x1: d.time + (3 * DAY) / 2,
        color: "var(--text-secondary-color)",
        opacity: 0.07,
      }));
    return [
      ...weekends,
      {
        type: "rect",
        x0: START + FREEZE[0] * DAY - DAY / 2,
        x1: START + FREEZE[1] * DAY + DAY / 2,
        color: "var(--warning-color)",
        opacity: 0.14,
        label: t("changeFreeze"),
        labelPosition: "top-right",
      },
    ];
  }, [t]);
  const formats = useMemo(
    () => ({
      decimal: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),

      tick: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        xAxis={{ type: "time", format: (x) => formats.tick.format(x) }}
        tooltip={{ mode: "axis" }}
        height={300}
        ariaLabel={t("deploysAria")}
      />
      <p style={{ margin: 0 }}>
        {t("deploysSummary", {
          perDay: formats.decimal.format(deployed / workingDays),
          failure: formats.percent.format(rolledBack / deployed),
        })}
      </p>
    </div>
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Monthly revenue of 2026 in thousands of dollars, January to December
const monthly = [412, 389, 455, 470, 498, 463, 441, 429, 517, 552, 648, 731];
const quarterTotal = (q: number) =>
  monthly.slice(q * 3, q * 3 + 3).reduce((sum, value) => sum + value, 0);

export default function DrilldownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  // \`null\`: the four quarters; a number: the months of that quarter
  const [quarter, setQuarter] = useState<number | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const series = useMemo((): ChartSeries[] => {
    if (quarter === null) {
      return [
        {
          name: t("revenue"),
          data: [0, 1, 2, 3].map(
            (q) => [t("quarter", { n: q + 1 }), quarterTotal(q)] as const,
          ),
        },
      ];
    }
    const month = new Intl.DateTimeFormat(locale, { month: "long" });
    return [
      {
        name: t("revenue"),
        color: "var(--chart-series-2, #10b981)",
        data: [0, 1, 2].map((m) => {
          const index = quarter * 3 + m;
          return [
            month.format(new Date(2026, index, 1)),
            monthly[index] ?? 0,
          ] as const;
        }),
      },
    ];
  }, [t, locale, quarter]);

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    if (quarter === null) {
      setQuarter(item.index);
      setPicked(null);
    } else {
      setPicked(t("pickedMonth", { month: event.xLabel, value: usd(item.y) }));
    }
  };
  const back = () => {
    setQuarter(null);
    setPicked(null);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          minHeight: 32,
        }}
      >
        {quarter !== null && (
          <Button size="small" variant="outline" onClick={back}>
            {t("backToQuarters")}
          </Button>
        )}
        <output aria-live="polite">
          {quarter === null
            ? t("drillHint")
            : (picked ??
              t("quarterDetail", {
                quarter: t("quarter", { n: quarter + 1 }),
                value: usd(quarterTotal(quarter)),
              }))}
        </output>
      </div>
      <BarChart
        series={series}
        labels
        onPointClick={onPointClick}
        tooltip={{ mode: "item" }}
        yAxis={{ format: usd }}
        legend={false}
        height={300}
        ariaLabel={
          quarter === null
            ? t("quartersAria")
            : t("monthsAria", { quarter: t("quarter", { n: quarter + 1 }) })
        }
      />
    </div>
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  BarChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

// Day-ahead electricity price per hour of tomorrow, in euros per MWh: low at
// night, a morning and an evening peak, and a dip at noon when solar floods in
const prices = Array.from({ length: 24 }, (_, hour) => {
  const morning = 38 * Math.exp(-((hour - 8) ** 2) / 4);
  const evening = 62 * Math.exp(-((hour - 19) ** 2) / 5);
  const solar = -46 * Math.exp(-((hour - 13) ** 2) / 6);
  return (
    Math.round((72 + morning + evening + solar + 6 * Math.sin(hour)) * 10) / 10
  );
});
const sorted = [...prices].sort((a, b) => a - b);
const CHEAP = sorted[5] ?? 0; // the 6 cheapest hours
const PEAK = sorted[18] ?? 0; // the 6 most expensive hours
const AVERAGE = prices.reduce((sum, p) => sum + p, 0) / prices.length;
const POWER = 11; // kW, a home wallbox
const PLUG_IN = 18; // the car is plugged in when coming home

const windowCost = (start: number, hours: number) =>
  prices
    .slice(start, start + hours)
    .reduce((sum, price) => sum + (price / 1000) * POWER, 0);

export default function EvChargingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [hours, setHours] = useState(3);

  // the cheapest run of \`hours\` consecutive hours
  const best = useMemo(() => {
    let start = 0;
    for (let s = 1; s + hours <= prices.length; s++) {
      if (windowCost(s, hours) < windowCost(start, hours)) start = s;
    }
    return start;
  }, [hours]);

  const formats = useMemo(() => {
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      hour: (h: number) => hour.format(new Date(2026, 10, 1, h)),
      price: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      cost: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
      }),
    };
  }, [locale]);

  // one series per price tier, stacked so that each hour shows a single bar
  const series = useMemo((): ChartSeries[] => {
    const tiers = [
      {
        name: t("offPeak"),
        color: "var(--success-color)",
        test: (p: number) => p <= CHEAP,
      },
      {
        name: t("standard"),
        color: "var(--primary-color)",
        test: (p: number) => p > CHEAP && p < PEAK,
      },
      {
        name: t("peak"),
        color: "var(--danger-color)",
        test: (p: number) => p >= PEAK,
      },
    ];
    return tiers.map((tier) => ({
      name: tier.name,
      color: tier.color,
      data: prices.map(
        (price, h) => [formats.hour(h), tier.test(price) ? price : 0] as const,
      ),
    }));
  }, [t, formats]);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        // category axes place the bars at their index
        x0: best - 0.5,
        x1: best + hours - 0.5,
        color: "var(--success-color)",
        opacity: 0.12,
        label: t("chargeHere"),
        labelPosition: "top-left",
      },
      {
        type: "line",
        axis: "y",
        value: AVERAGE,
        dash: [4, 4],
        color: "var(--text-secondary-color)",
        label: t("dailyAverage"),
      },
    ],
    [t, best, hours],
  );

  const cost = windowCost(best, hours);
  const onArrival = windowCost(PLUG_IN, hours);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Select
          size="small"
          style={{ width: 200 }}
          aria-label={t("chargingTime")}
          value={String(hours)}
          onChange={(value) => setHours(Number(value))}
        >
          {[2, 3, 4, 5].map((h) => (
            <SelectItem key={h} value={String(h)}>
              {t("chargeFor", {
                energy: new Intl.NumberFormat(locale).format(h * POWER),
                duration: new Intl.NumberFormat(locale, {
                  style: "unit",
                  unit: "hour",
                  unitDisplay: "long",
                }).format(h),
              })}
            </SelectItem>
          ))}
        </Select>
        <output aria-live="polite">
          {t("chargeAdvice", {
            start: formats.hour(best),
            end: formats.hour((best + hours) % 24),
            cost: formats.cost.format(cost),
            saving: formats.cost.format(onArrival - cost),
            plugIn: formats.hour(PLUG_IN),
          })}
        </output>
      </div>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        tooltip={{ mode: "item" }}
        yAxis={{
          title: t("pricePerMwh"),
          format: (y) => formats.price.format(y),
        }}
        height={300}
        ariaLabel={t("pricesAria")}
      />
    </div>
  );
}
`})))()}var ft;function pt(){return(pt=e((()=>{ft=`import { useMemo } from "react";
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
`})))()}var mt;function ht(){return(ht=e((()=>{mt=`import { useMemo } from "react";
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
`})))()}var gt;function _t(){return(_t=e((()=>{gt=`import { useMemo } from "react";
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
`})))()}var vt;function yt(){return(yt=e((()=>{vt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Hires per department, last year and this year
const hires = {
  engineering: [64, 81],
  product: [12, 15],
  design: [9, 7],
  sales: [38, 52],
  marketing: [17, 13],
  support: [26, 31],
} as const;
type Department = keyof typeof hires;
const keys = Object.keys(hires) as Department[];

export default function PeriodCompareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [compare, setCompare] = useState(true);

  const series = useMemo((): ChartSeries[] => {
    const names = keys.map((key) => t(\`hiringDepartments.\${key}\`));
    return [
      {
        id: "previous",
        name: t("previousYear"),
        color: "var(--border-strong-color)",
        // hidden series keep their place in the legend and come back as is
        hidden: !compare,
        data: keys.map((key, i) => [names[i] ?? key, hires[key][0]] as const),
      },
      {
        id: "current",
        name: t("currentYear"),
        color: "var(--primary-color)",
        data: keys.map((key, i) => [names[i] ?? key, hires[key][1]] as const),
      },
    ];
  }, [t, compare]);
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }),
    }),
    [locale],
  );

  // both years of the hovered department and the change between them
  const renderTooltip = (event: ChartHoverEvent) => {
    const department = keys[event.items[0]?.index ?? -1];
    if (!department) return null;
    const [previous, current] = hires[department];
    const change = current / previous - 1;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2px 16px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        <span>{t("currentYear")}</span>
        <strong style={{ textAlign: "end" }}>
          {formats.number.format(current)}
        </strong>
        <span>{t("previousYear")}</span>
        <span style={{ textAlign: "end" }}>
          {formats.number.format(previous)}
        </span>
        <span>{t("change")}</span>
        <span
          style={{
            textAlign: "end",
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {formats.change.format(change)}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={compare}
        onChange={setCompare}
        label={t("compareLastYear")}
      />
      <BarChart
        series={series}
        renderTooltip={renderTooltip}
        yAxis={{ format: (y) => formats.number.format(y) }}
        height={300}
        ariaLabel={t("hiresAria")}
      />
    </div>
  );
}
`})))()}var $;function bt(){return(bt=e((()=>{$=`import { useMemo } from "react";
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
`})))()}var xt;function St(){return(St=e((()=>{xt=`import { useMemo } from "react";
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
`})))()}var Ct;function wt(){return(wt=e((()=>{Ct=`import { useMemo } from "react";
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
`})))()}var Tt;function Et(){return(Et=e((()=>{Tt=`import { useMemo } from "react";
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
`})))()}var Dt,Ot,kt;function At(){return(At=e((()=>{ce(),fe(),ve(),A(),Se(),Ee(),Ae(),Ie(),Re(),Ue(),qe(),Qe(),tt(),rt(),at(),st(),lt(),dt(),pt(),ht(),_t(),yt(),bt(),St(),wt(),Et(),t(),d(),re(),Dt=n(),Ot=u(Object.assign({"./demos/basic.tsx":ie,"./demos/combo.tsx":ue,"./demos/deployments.tsx":me,"./demos/drilldown.tsx":ye,"./demos/ev-charging.tsx":be,"./demos/grouped.tsx":Ce,"./demos/labels.tsx":De,"./demos/percent.tsx":je,"./demos/period-compare.tsx":Le,"./demos/profit-loss.tsx":ze,"./demos/ranking.tsx":We,"./demos/stacked.tsx":Je,"./demos/target.tsx":$e}),Object.assign({"./demos/basic.tsx":nt,"./demos/combo.tsx":it,"./demos/deployments.tsx":ot,"./demos/drilldown.tsx":ct,"./demos/ev-charging.tsx":ut,"./demos/grouped.tsx":ft,"./demos/labels.tsx":mt,"./demos/percent.tsx":gt,"./demos/period-compare.tsx":vt,"./demos/profit-loss.tsx":$,"./demos/ranking.tsx":xt,"./demos/stacked.tsx":Ct,"./demos/target.tsx":Tt})),kt=()=>(0,Dt.jsx)(ne,{id:`bar-chart`,demos:Ot})})))()}At();export{kt as default};