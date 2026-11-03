import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CWCxzQgp.js";import{R as a,z as o}from"./ProgressIndicator-CLQ5GhV8.js";import{n as s,t as c}from"./Switch-BYZUj6dh.js";import{i as l,o as u,t as ee}from"./Select-CFOiLa6C.js";import{o as d,p as f}from"./charts-BBsJ2KND.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-LV3ZFKzU.js";function ae(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,oe.useMemo)(()=>[{name:e(`ticketsClosed`),data:ce.map((t,n)=>[e(`quarter`,{n:n+1}),t])}],[e]);return(0,se.jsx)(d,{series:t,height:280,ariaLabel:e(`ticketsAria`)})}var oe,se,ce;function le(){return(le=e((()=>{oe=t(),i(),f(),se=n(),ce=[320,410,385,470]})))()}function ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function de(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,p.useMemo)(()=>[{name:e(`orders`),data:g},{name:e(`average7`),type:`line`,data:fe,lineWidth:3}],[e]);return(0,m.jsx)(d,{series:t,xAxis:{title:e(`day`)},height:300,ariaLabel:e(`ordersAria`)})}var p,m,h,g,fe;function pe(){return(pe=e((()=>{p=t(),i(),f(),m=n(),h=ue(5),g=Array.from({length:30},(e,t)=>Math.round(60+t*1.5+h()*40)),fe=g.map((e,t)=>{let n=g.slice(Math.max(0,t-6),t+1);return Math.round(n.reduce((e,t)=>e+t,0)/n.length)})})))()}function me(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function he(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>[{name:e(`deploysOk`),color:`var(--success-color)`,data:C.map(e=>[e.time,e.ok])},{name:e(`deploysFailed`),color:`var(--danger-color)`,data:C.map(e=>[e.time,e.failed])}],[e]),a=(0,_.useMemo)(()=>[...C.filter(e=>new Date(e.time).getDay()===6).map(e=>({type:`rect`,x0:e.time-y/2,x1:e.time+3*y/2,color:`var(--text-secondary-color)`,opacity:.07})),{type:`rect`,x0:b+x[0]*y-y/2,x1:b+x[1]*y+y/2,color:`var(--warning-color)`,opacity:.14,label:e(`changeFreeze`),labelPosition:`top-right`}],[e]),o=(0,_.useMemo)(()=>({decimal:new Intl.NumberFormat(n,{maximumFractionDigits:1}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),tick:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`})}),[n]);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,v.jsx)(d,{series:i,stacked:!0,annotations:a,xAxis:{type:`time`,format:e=>o.tick.format(e)},tooltip:{mode:`axis`},height:300,ariaLabel:e(`deploysAria`)}),(0,v.jsx)(`p`,{style:{margin:0},children:e(`deploysSummary`,{perDay:o.decimal.format(w/_e),failure:o.percent.format(ve/w)})})]})}var _,v,y,b,ge,x,S,C,_e,w,ve;function ye(){return(ye=e((()=>{_=t(),i(),f(),v=n(),y=864e5,b=new Date(2026,8,7).getTime(),ge=56,x=[38,43],S=me(42),C=Array.from({length:ge},(e,t)=>{let n=b+t*y,r=[0,6].includes(new Date(n).getDay()),i=t>=x[0]&&t<=x[1],a=r||i?+(S()<.15):Math.round(4+S()*6+t/14),o=a>0&&S()<.35?S()<.8?1:2:0;return{time:n,weekend:r,ok:a-Math.min(o,a),failed:o}}),_e=C.filter(e=>!e.weekend).length,w=C.reduce((e,t)=>e+t.ok+t.failed,0),ve=C.reduce((e,t)=>e+t.failed,0)})))()}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,[i,a]=(0,T.useState)(null),[s,c]=(0,T.useState)(null),l=(0,T.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e3)},[n]),u=(0,T.useMemo)(()=>{if(i===null)return[{name:e(`revenue`),data:[0,1,2,3].map(t=>[e(`quarter`,{n:t+1}),O(t)])}];let t=new Intl.DateTimeFormat(n,{month:`long`});return[{name:e(`revenue`),color:`var(--chart-series-2, #10b981)`,data:[0,1,2].map(e=>{let n=i*3+e;return[t.format(new Date(2026,n,1)),D[n]??0]})}]},[e,n,i]);return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,E.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,minHeight:32},children:[i!==null&&(0,E.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{a(null),c(null)},children:e(`backToQuarters`)}),(0,E.jsx)(`output`,{"aria-live":`polite`,children:i===null?e(`drillHint`):s??e(`quarterDetail`,{quarter:e(`quarter`,{n:i+1}),value:l(O(i))})})]}),(0,E.jsx)(d,{series:u,labels:!0,onPointClick:t=>{let n=t.items[0];n&&(i===null?(a(n.index),c(null)):c(e(`pickedMonth`,{month:t.xLabel,value:l(n.y)})))},tooltip:{mode:`item`},yAxis:{format:l},legend:!1,height:300,ariaLabel:i===null?e(`quartersAria`):e(`monthsAria`,{quarter:e(`quarter`,{n:i+1})})})]})}var T,E,D,O;function k(){return(k=e((()=>{T=t(),i(),a(),f(),E=n(),D=[412,389,455,470,498,463,441,429,517,552,648,731],O=e=>D.slice(e*3,e*3+3).reduce((e,t)=>e+t,0)})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,[i,a]=(0,A.useState)(3),o=(0,A.useMemo)(()=>{let e=0;for(let t=1;t+i<=M.length;t++)R(t,i)<R(e,i)&&(e=t);return e},[i]),s=(0,A.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`});return{hour:t=>e.format(new Date(2026,10,1,t)),price:new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}),cost:new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`})}},[n]),c=(0,A.useMemo)(()=>[{name:e(`offPeak`),color:`var(--success-color)`,test:e=>e<=P},{name:e(`standard`),color:`var(--primary-color)`,test:e=>e>P&&e<F},{name:e(`peak`),color:`var(--danger-color)`,test:e=>e>=F}].map(e=>({name:e.name,color:e.color,data:M.map((t,n)=>[s.hour(n),e.test(t)?t:0])})),[e,s]),l=(0,A.useMemo)(()=>[{type:`rect`,x0:o-.5,x1:o+i-.5,color:`var(--success-color)`,opacity:.12,label:e(`chargeHere`),labelPosition:`top-left`},{type:`line`,axis:`y`,value:Se,dash:[4,4],color:`var(--text-secondary-color)`,label:e(`dailyAverage`)}],[e,o,i]),f=R(o,i),te=R(L,i);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,j.jsx)(u,{size:`small`,style:{width:200},"aria-label":e(`chargingTime`),value:String(i),onChange:e=>a(Number(e)),children:[2,3,4,5].map(t=>(0,j.jsx)(ee,{value:String(t),children:e(`chargeFor`,{energy:new Intl.NumberFormat(n).format(t*I),duration:new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,unitDisplay:`long`}).format(t)})},t))}),(0,j.jsx)(`output`,{"aria-live":`polite`,children:e(`chargeAdvice`,{start:s.hour(o),end:s.hour((o+i)%24),cost:s.cost.format(f),saving:s.cost.format(te-f),plugIn:s.hour(L)})})]}),(0,j.jsx)(d,{series:c,stacked:!0,annotations:l,tooltip:{mode:`item`},yAxis:{title:e(`pricePerMwh`),format:e=>s.price.format(e)},height:300,ariaLabel:e(`pricesAria`)})]})}var A,j,M,N,P,F,Se,I,L,R;function Ce(){return(Ce=e((()=>{A=t(),i(),l(),f(),j=n(),M=Array.from({length:24},(e,t)=>{let n=38*Math.exp(-((t-8)**2)/4),r=62*Math.exp(-((t-19)**2)/5),i=-46*Math.exp(-((t-13)**2)/6);return Math.round((72+n+r+i+6*Math.sin(t))*10)/10}),N=[...M].sort((e,t)=>e-t),P=N[5]??0,F=N[18]??0,Se=M.reduce((e,t)=>e+t,0)/M.length,I=11,L=18,R=(e,t)=>M.slice(e,e+t).reduce((e,t)=>e+t/1e3*I,0)})))()}function we(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,z.useMemo)(()=>{let t=Ee(n);return Object.keys(B).map(n=>({name:e(`cities.${n}`),data:t.map((e,t)=>[e,B[n][t]])}))},[e,n]),a=(0,z.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`}),[n]);return(0,Te.jsx)(d,{series:i,yAxis:{format:e=>a.format(e)},height:300,ariaLabel:e(`rainfallAria`)})}var z,Te,B,Ee;function De(){return(De=e((()=>{z=t(),i(),f(),Te=n(),B={london:[55,41,41,44,49,45,45,50,49,69,59,55],tokyo:[52,56,118,125,138,168,154,168,210,198,93,51],paris:[51,41,48,52,63,50,63,53,48,61,51,58]},Ee=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,V.useMemo)(()=>Object.entries(Ae).map(([t,n])=>({name:t,data:n.map((t,n)=>[e(`quarter`,{n:n+1}),t])})),[e]),a=(0,V.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,ke.jsx)(d,{series:i,labels:!0,yAxis:{format:a},height:300,ariaLabel:e(`revenueAria`)})}var V,ke,Ae;function je(){return(je=e((()=>{V=t(),i(),f(),ke=n(),Ae={2025:[312,348,365,421],2026:[356,402,431,488]}})))()}function Me(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),t=(0,Ne.useMemo)(()=>Ie.map(({key:t,color:n,values:r})=>({name:e(`nps.${t}`),color:n,data:Fe.map((t,n)=>[e(`regions.${t}`),r[n]])})),[e]);return(0,Pe.jsx)(d,{series:t,percent:!0,height:300,ariaLabel:e(`npsAria`)})}var Ne,Pe,Fe,Ie;function Le(){return(Le=e((()=>{Ne=t(),i(),f(),Pe=n(),Fe=[`northAmerica`,`europe`,`asiaPacific`,`latinAmerica`,`middleEast`],Ie=[{key:`promoters`,color:`var(--success-color)`,values:[612,540,702,288,164]},{key:`passives`,color:`var(--warning-color)`,values:[254,310,268,131,92]},{key:`detractors`,color:`var(--danger-color)`,values:[134,196,118,97,61]}]})))()}function Re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,[i,a]=(0,H.useState)(!0),o=(0,H.useMemo)(()=>{let t=G.map(t=>e(`hiringDepartments.${t}`));return[{id:`previous`,name:e(`previousYear`),color:`var(--border-strong-color)`,hidden:!i,data:G.map((e,n)=>[t[n]??e,W[e][0]])},{id:`current`,name:e(`currentYear`),color:`var(--primary-color)`,data:G.map((e,n)=>[t[n]??e,W[e][1]])}]},[e,i]),s=(0,H.useMemo)(()=>({number:new Intl.NumberFormat(n),change:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0,signDisplay:`exceptZero`})}),[n]);return(0,U.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,U.jsx)(c,{checked:i,onChange:a,label:e(`compareLastYear`)}),(0,U.jsx)(d,{series:o,renderTooltip:t=>{let n=G[t.items[0]?.index??-1];if(!n)return null;let[r,i]=W[n],a=i/r-1;return(0,U.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr auto`,gap:`2px 16px`},children:[(0,U.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),(0,U.jsx)(`span`,{children:e(`currentYear`)}),(0,U.jsx)(`strong`,{style:{textAlign:`end`},children:s.number.format(i)}),(0,U.jsx)(`span`,{children:e(`previousYear`)}),(0,U.jsx)(`span`,{style:{textAlign:`end`},children:s.number.format(r)}),(0,U.jsx)(`span`,{children:e(`change`)}),(0,U.jsx)(`span`,{style:{textAlign:`end`,color:a>=0?`var(--success-color)`:`var(--danger-color)`},children:s.change.format(a)})]})},yAxis:{format:e=>s.number.format(e)},height:300,ariaLabel:e(`hiresAria`)})]})}var H,U,W,G;function ze(){return(ze=e((()=>{H=t(),i(),s(),f(),U=n(),W={engineering:[64,81],product:[12,15],design:[9,7],sales:[38,52],marketing:[17,13],support:[26,31]},G=Object.keys(W)})))()}function Be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,K.useMemo)(()=>{let t=Ue(n);return[{name:e(`netResult`),data:He.map((e,n)=>({x:t[n],y:e,color:e>=0?`var(--success-color)`:`var(--danger-color)`}))}]},[e,n]),a=(0,K.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,signDisplay:`exceptZero`});return t=>e.format(t*1e3)},[n]);return(0,Ve.jsx)(d,{series:i,yAxis:{format:a},annotations:[{type:`line`,axis:`y`,value:0}],legend:!1,height:300,ariaLabel:e(`profitAria`)})}var K,Ve,He,Ue;function We(){return(We=e((()=>{K=t(),i(),f(),Ve=n(),He=[-42,-18,12,35,28,-9,41,66,58,73,49,92],Ue=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function Ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,q.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=[...qe].sort((e,t)=>t[1]-e[1]);return[{name:e(`unitsSold`),showLabels:!0,data:r.map(([e,n])=>[t.of(e)??e,n])}]},[e,n]),a=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,Ke.jsx)(d,{series:i,yAxis:{format:a},height:320,ariaLabel:e(`rankingAria`)})}var q,Ke,qe;function Je(){return(Je=e((()=>{q=t(),i(),f(),Ke=n(),qe=[[`FR`,182],[`US`,541],[`JP`,326],[`DE`,248],[`BR`,97],[`CN`,463],[`GB`,205],[`IN`,151],[`CA`,118],[`KR`,134]]})))()}function Ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,Xe.useMemo)(()=>{let t=Qe(n,6);return Object.keys(J).map(n=>({name:e(`channels.${n}`),data:t.map((e,t)=>[e,J[n][t]])}))},[e,n]);return(0,Ze.jsx)(d,{series:i,stacked:!0,height:300,ariaLabel:e(`channelsAria`)})}var Xe,Ze,J,Qe;function $e(){return($e=e((()=>{Xe=t(),i(),f(),Ze=n(),J={web:[120,135,150,148,170,190],mobile:[80,95,110,125,140,160],partners:[30,28,35,42,40,51]},Qe=(e,t)=>{let n=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:t},(e,t)=>n.format(new Date(2026,t,1)))}})))()}function et(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-chart.data`}),n=t.language,i=(0,tt.useMemo)(()=>[{name:e(`newCustomers`),data:Z.map((t,n)=>({x:e(`week`,{n:n+1}),y:t,color:t>=X?`var(--primary-color)`:`var(--border-strong-color)`}))}],[e]),a=Z.filter(e=>e>=X).length,o=new Intl.NumberFormat(n,{style:`percent`});return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Y.jsx)(d,{series:i,annotations:[{type:`line`,axis:`y`,value:X,color:`var(--warning-color)`,dash:[6,4],width:2,label:e(`weeklyTarget`)}],legend:!1,height:300,ariaLabel:e(`targetAria`)}),(0,Y.jsx)(`p`,{children:e(`targetSummary`,{reached:a,total:Z.length,rate:o.format(a/Z.length)})})]})}var tt,Y,X,Z;function nt(){return(nt=e((()=>{tt=t(),i(),f(),Y=n(),X=120,Z=[96,104,131,118,142,125,109,137,151,128,146,163]})))()}var rt;function it(){return(it=e((()=>{rt=`import { useMemo } from "react";
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
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useMemo } from "react";
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
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useMemo } from "react";
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
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useMemo, useState } from "react";
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
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useMemo, useState } from "react";
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
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { useMemo } from "react";
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
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { useMemo } from "react";
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
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useMemo } from "react";
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
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useMemo, useState } from "react";
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
`})))()}var Q;function xt(){return(xt=e((()=>{Q=`import { useMemo } from "react";
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
`})))()}var St;function Ct(){return(Ct=e((()=>{St=`import { useMemo } from "react";
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
`})))()}var wt;function Tt(){return(Tt=e((()=>{wt=`import { useMemo } from "react";
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
`})))()}var Et;function Dt(){return(Dt=e((()=>{Et=`import { useMemo } from "react";
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
`})))()}var Ot,kt,At;function $(){return($=e((()=>{le(),pe(),ye(),k(),Ce(),De(),je(),Le(),ze(),We(),Je(),$e(),nt(),it(),ot(),ct(),ut(),ft(),mt(),gt(),vt(),bt(),xt(),Ct(),Tt(),Dt(),t(),ne(),ie(),Ot=n(),kt=te(Object.assign({"./demos/basic.tsx":ae,"./demos/combo.tsx":de,"./demos/deployments.tsx":he,"./demos/drilldown.tsx":be,"./demos/ev-charging.tsx":xe,"./demos/grouped.tsx":we,"./demos/labels.tsx":Oe,"./demos/percent.tsx":Me,"./demos/period-compare.tsx":Re,"./demos/profit-loss.tsx":Be,"./demos/ranking.tsx":Ge,"./demos/stacked.tsx":Ye,"./demos/target.tsx":et}),Object.assign({"./demos/basic.tsx":rt,"./demos/combo.tsx":at,"./demos/deployments.tsx":st,"./demos/drilldown.tsx":lt,"./demos/ev-charging.tsx":dt,"./demos/grouped.tsx":pt,"./demos/labels.tsx":ht,"./demos/percent.tsx":_t,"./demos/period-compare.tsx":yt,"./demos/profit-loss.tsx":Q,"./demos/ranking.tsx":St,"./demos/stacked.tsx":wt,"./demos/target.tsx":Et})),At=()=>(0,Ot.jsx)(re,{id:`bar-chart`,demos:kt})})))()}$();export{At as default};