import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{n as s,t as c}from"./Switch-BCh7GKwc.js";import{r as l,t as u}from"./ConfigProvider-Rv6qDpjk.js";import{i as d,r as f}from"./Stack-DOPoCF_W.js";import{i as p,o as m,t as ee}from"./Select-BIYfjWQ3.js";import{l as h,n as te,t as ne,u as re}from"./DocPage-CHJwIegD.js";import{i as g,t as _}from"./three-d-BJri8njm.js";function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),[n,i]=(0,v.useState)(`2025`),[a,o]=(0,v.useState)(null),s=(0,v.useMemo)(()=>ce(n),[n]),c=(0,v.useMemo)(()=>({usd:new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),variance:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`})}),[t.language]),l=(0,v.useMemo)(()=>{let t=s.map(e=>({x:e.quarter,y:e.department,z:e.actual,value:e.variance}));return[{name:e(`actualSpend`),data:t,colorBy:`value`,format:e=>c.variance.format(e)}]},[e,s,c]),u=t=>({department:e(`departments.${b[t.department]}`),quarter:e(`quarters.${x[t.quarter]}`)}),f=s.reduce((e,t)=>e+t.budget,0),p=s.reduce((e,t)=>e+t.actual,0),h=s.reduce((e,t)=>t.variance>e.variance?t:e);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsxs)(d,{gap:8,align:`center`,children:[(0,y.jsx)(`span`,{children:e(`fiscalYear`)}),(0,y.jsx)(m,{"aria-label":e(`fiscalYear`),size:`small`,value:n,onChange:e=>{i(e),o(null)},children:oe.map(e=>(0,y.jsx)(ee,{value:e,children:e},e))})]}),(0,y.jsx)(_,{series:l,xAxis:{title:e(`quarter`),categories:x.map(t=>e(`quarters.${t}`))},yAxis:{title:e(`department`),categories:b.map(t=>e(`departments.${t}`))},zAxis:{title:e(`actualSpend`),format:e=>c.usd.format(e)},colorScale:`coolwarm`,valueRange:[-.25,S],colorBar:{title:e(`varianceToBudget`),format:e=>c.variance.format(e)},camera:{azimuth:35,elevation:26},height:460,ariaLabel:e(`budgetAria`,{year:n}),onPointClick:e=>o(s[e.index]??null)}),(0,y.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:a?e(`varianceDetail`,{...u(a),actual:c.usd.format(a.actual),budget:c.usd.format(a.budget),variance:c.variance.format(a.variance)}):e(`budgetSummary`,{year:n,actual:c.usd.format(p),budget:c.usd.format(f),variance:c.variance.format((p-f)/f),...u(h),worst:c.variance.format(h.variance)})})]})}var v,y,b,x,oe,se,S,ce;function le(){return(le=e((()=>{v=t(),i(),f(),p(),g(),y=n(),b=[`engineering`,`sales`,`marketing`,`operations`,`support`,`finance`],x=[`q1`,`q2`,`q3`,`q4`],oe=[`2024`,`2025`,`2026`],se=[82e4,54e4,41e4,36e4,22e4,15e4],S=.25,ce=e=>{let t=ie(Number(e)),n=1+.06*(Number(e)-2024);return b.flatMap((e,r)=>x.map((e,i)=>{let a=se[r]*n,o=r===2?i*.04:r===4?-.06:0,s=Math.max(-.25,Math.min(S,o+(t()-.5)*.24));return{department:r,quarter:i,budget:a,actual:a*(1+s),variance:s}}))}})))()}function ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),[n,i]=(0,C.useState)(null),a=(0,C.useMemo)(()=>({cohort:new Intl.DateTimeFormat(t.language,{month:`short`,year:`2-digit`,timeZone:`UTC`}),longCohort:new Intl.DateTimeFormat(t.language,{month:`long`,year:`numeric`,timeZone:`UTC`}),percent:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}),integer:new Intl.NumberFormat(t.language)}),[t.language]),o=(0,C.useMemo)(()=>{let t=E.map(e=>({x:e.month,y:e.cohort,z:e.retention===null?null:e.retention*100}));return[{name:e(`retention`),data:t,colorBy:`z`,format:e=>a.percent.format(e/100)}]},[e,a]);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,w.jsx)(_,{series:o,xAxis:{title:e(`monthsSinceSignup`),categories:Array.from({length:T},(t,n)=>e(`monthIndex`,{n}))},yAxis:{title:e(`signupCohort`),categories:Array.from({length:T},(e,t)=>a.cohort.format(O(t)))},zAxis:{title:e(`retention`),min:0,max:100,format:e=>a.percent.format(e/100)},colorScale:`viridis`,colorBar:{title:e(`retention`),format:e=>a.percent.format(e/100)},barWidth:.75,camera:{azimuth:40,elevation:30},height:460,ariaLabel:e(`cohortAria`),onPointClick:e=>i(E[e.index]??null)}),(0,w.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:n&&n.retention!==null?e(`cohortReadout`,{cohort:a.longCohort.format(O(n.cohort)),n:n.month,retention:a.percent.format(n.retention),users:a.integer.format(Math.round(n.retention*D[n.cohort])),total:a.integer.format(D[n.cohort])}):e(`cohortHint`)})]})}var C,w,T,fe,pe,E,D,O;function me(){return(me=e((()=>{C=t(),i(),g(),w=n(),T=12,fe=Date.UTC(2025,10,1),pe=6,{CELLS:E,SIZES:D}=(()=>{let e=ue(12),t=Array.from({length:T},()=>Math.round(900+e()*700)),n=[];for(let t=0;t<T;t++){let r=t>=pe?.34:.24;for(let i=0;i<T;i++){let a=i<T-t,o=i===0?1:r+(1-r)*Math.exp(-i/2.2)+(e()-.5)*.03;n.push({cohort:t,month:i,retention:a?o:null})}}return{CELLS:n,SIZES:t}})(),O=e=>{let t=new Date(fe);return t.setUTCMonth(t.getUTCMonth()+e),t}})))()}function he(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=(0,k.useRef)(null),[i,a]=(0,k.useState)(!0),[s,l]=(0,k.useState)(!1),[f,p]=(0,k.useState)(null),m=(0,k.useMemo)(()=>{let n=new Intl.NumberFormat(t.language,{maximumFractionDigits:1});return{kw:{format:t=>e(`kw`,{value:n.format(t)})},celsius:new Intl.NumberFormat(t.language,{style:`unit`,unit:`celsius`,maximumFractionDigits:1})}},[e,t.language]),ee=(0,k.useMemo)(()=>{let t=P.map((e,t)=>({x:t%M,y:Math.floor(t/M),z:e.power,value:e.inlet,label:e.name}));return[{name:e(`inletTemperature`),data:t,colorBy:`value`,format:e=>m.celsius.format(e)}]},[e,m]),h=P.filter(e=>e.inlet>N);return(0,A.jsx)(u,{theme:i?`dark`:`light`,children:(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,padding:12,borderRadius:8,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`},children:[(0,A.jsxs)(d,{gap:16,wrap:!0,align:`center`,children:[(0,A.jsx)(c,{size:`small`,checked:i,label:e(`darkTheme`),onChange:e=>{a(e),l(!1)}}),(0,A.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>{s?n.current?.resetCamera():n.current?.setCamera({azimuth:0,elevation:89,zoom:1,pan:[0,0],projection:`orthographic`}),l(!s)},children:e(s?`perspectiveView`:`topView`)})]}),(0,A.jsx)(_,{ref:n,series:ee,xAxis:{title:e(`rackPosition`),categories:Array.from({length:M},(e,t)=>String(t+1))},yAxis:{title:e(`rackRow`),categories:j.map(t=>e(`rowLabel`,{id:t}))},zAxis:{title:e(`powerDraw`),format:e=>m.kw.format(e)},colorScale:`inferno`,valueRange:[18,32],colorBar:{title:e(`inletTemperature`),format:e=>m.celsius.format(e)},barWidth:.8,camera:{azimuth:30,elevation:32},height:440,ariaLabel:e(`datacenterAria`),onPointClick:e=>p(P[e.index]??null),onCameraChange:e=>l(e.projection===`orthographic`&&e.elevation>80)},i?`dark`:`light`),(0,A.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:f?e(f.inlet>N?`rackHot`:`rackOk`,{rack:f.name,power:m.kw.format(f.power),inlet:m.celsius.format(f.inlet),limit:m.celsius.format(N)}):e(`datacenterSummary`,{hot:h.length,total:P.length,limit:m.celsius.format(N),racks:new Intl.ListFormat(t.language).format(h.map(e=>e.name))})})]})})}var k,A,j,M,N,P;function _e(){return(_e=e((()=>{k=t(),i(),a(),l(),f(),s(),g(),A=n(),j=[`A`,`B`,`C`,`D`,`E`,`F`],M=10,N=27,P=(()=>{let e=he(77);return j.flatMap((t,n)=>Array.from({length:M},(r,i)=>{let a=(n===2||n===3)&&i>=6?11+e()*4:3+e()*5,o=18+i*.75+(a-3)*.35+ +(n===0)+e();return{name:`${t}${String(i+1).padStart(2,`0`)}`,power:Math.round(a*10)/10,inlet:Math.round(o*10)/10}}))})()})))()}function ve(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),[n,i]=(0,F.useState)(!0),[a,o]=(0,F.useState)(be),[s,l]=(0,F.useState)(0),u=(0,F.useRef)(ve(31));(0,F.useEffect)(()=>{if(!n)return;let e=window.setInterval(()=>{let e=u.current,t=Array.from({length:6},()=>{let t=Math.floor(e()*L.length),n=Math.floor(e()**1.6*R);return[t*R+n,1+Math.floor(e()*8)]});o(e=>{let n=[...e];for(let[e,r]of t)n[e]=Math.max(0,n[e]-r);return n})},1e3);return()=>window.clearInterval(e)},[n]),(0,F.useEffect)(()=>{if(!a.includes(0))return;let e=window.setTimeout(()=>{o(e=>e.map(e=>e===0?z:e)),l(e=>e+a.filter(e=>e===0).length)},1e3);return()=>window.clearTimeout(e)},[a]);let d=(0,F.useMemo)(()=>new Intl.NumberFormat(t.language),[t.language]),f=(0,F.useMemo)(()=>{let t=e=>a.map((t,n)=>({x:Math.floor(n/R),y:n%R,z:t<B===e?t:null})),n=t=>e(`unitsValue`,{value:d.format(t)});return[{name:e(`inStock`),data:t(!1),color:`var(--chart-series-1, #4f46e5)`,format:n},{name:e(`lowStock`),data:t(!0),color:`var(--danger-color, #dc2626)`,format:n}]},[e,a,d]),p=a.filter(e=>e<B).length;return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(c,{size:`small`,checked:n,label:e(`liveUpdates`),onChange:i}),(0,I.jsx)(_,{series:f,xAxis:{title:e(`aisle`),categories:L.map(t=>e(`aisleLabel`,{id:t}))},yAxis:{title:e(`shelf`),categories:Array.from({length:R},(t,n)=>e(`shelfLabel`,{n:n+1}))},zAxis:{title:e(`units`),min:0,max:z},barWidth:.6,camera:{azimuth:32,elevation:26},height:420,ariaLabel:e(`inventoryAria`)}),(0,I.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`inventoryStatus`,{total:d.format(a.reduce((e,t)=>e+t,0)),low:p,bins:a.length,restocked:s})})]})}var F,I,L,R,z,B,be;function xe(){return(xe=e((()=>{F=t(),i(),s(),g(),I=n(),L=[`A`,`B`,`C`,`D`,`E`,`F`],R=5,z=120,B=z*.2,be=()=>{let e=ve(8);return Array.from({length:L.length*R},()=>Math.round(z*(.35+e()*.65)))}})))()}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,i=(0,V.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),a=(0,V.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),[n]),o=(0,V.useMemo)(()=>{let t=H.flatMap((e,t)=>U.map((e,n)=>({x:t,y:n,z:we[t][n],value:Te[t][n]})));return[{name:e(`revenue`),data:t,colorBy:`value`,format:e=>a.format(e/100)}]},[e,a]);return(0,Ce.jsx)(_,{series:o,colorScale:`spectral`,xAxis:{title:e(`product`),categories:H.map(t=>e(`productNames.${t}`))},yAxis:{title:e(`market`),categories:U.map(t=>e(`markets.${t}`))},zAxis:{title:e(`revenue`),format:e=>i.format(e*1e6)},colorBar:{title:e(`margin`),format:e=>a.format(e/100)},camera:{azimuth:38,elevation:24},height:440,ariaLabel:e(`marginAria`)})}var V,Ce,H,U,we,Te;function Ee(){return(Ee=e((()=>{V=t(),i(),g(),Ce=n(),H=[`laptops`,`phones`,`tablets`,`watches`,`audio`],U=[`americas`,`europe`,`asia`,`oceania`],we=[[42,31,38,6],[55,40,61,8],[18,14,22,3],[12,11,9,2],[16,13,15,3]],Te=[[8,11,6,12],[21,24,17,25],[14,16,9,18],[34,31,28,36],[27,29,22,30]]})))()}function De(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),t=(0,Oe.useMemo)(()=>[{name:e(`women`),color:`var(--chart-series-5, #ec4899)`,data:W.flatMap((e,t)=>G.map((n,r)=>[r,t,K(e,n,!0)]))},{name:e(`men`),color:`var(--chart-series-1, #3b82f6)`,data:W.flatMap((e,t)=>G.map((n,r)=>[r,t,-K(e,n,!1)]))}],[e]),n=G.map((t,n)=>n===G.length-1?e(`ageOver`,{from:t}):e(`ageGroup`,{from:t,to:t+9}));return(0,ke.jsx)(_,{series:t,barWidth:.8,xAxis:{title:e(`age`),categories:n},yAxis:{title:e(`year`),categories:W.map(String)},zAxis:{title:e(`population`),format:t=>e(`millions`,{value:Math.abs(t)})},aspect:[1.2,.8,.8],camera:{azimuth:28,elevation:14},height:440,ariaLabel:e(`pyramidAria`)})}var Oe,ke,W,G,K;function Ae(){return(Ae=e((()=>{Oe=t(),i(),g(),ke=n(),W=[1960,1980,2e3,2020],G=[0,10,20,30,40,50,60,70,80],K=(e,t,n)=>{let r=4.2-(e-1960)*.025,i=Math.exp(-((t/(62+(e-1960)*.2))**4)),a=1+Math.max(0,.6-Math.abs(e-1960-t-10)/25),o=r*i*a*(n?1+t/400:1);return Math.round(o*100)/100}})))()}function je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,i=(0,q.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{month:`short`,timeZone:`UTC`});return Array.from({length:12},(t,n)=>e.format(Date.UTC(2026,n,1)))},[n]),a=(0,q.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),o=(0,q.useMemo)(()=>[{name:e(`sales`),data:Ie}],[e]);return(0,Ne.jsx)(_,{series:o,xAxis:{title:e(`region`),categories:J.map(t=>e(`regions.${t}`))},yAxis:{title:e(`month`),categories:i},zAxis:{title:e(`sales`),format:e=>a.format(e*1e3)},aspect:[.75,1.2,.6],camera:{azimuth:50,elevation:28},height:440,ariaLabel:e(`salesAria`)})}var q,Ne,J,Pe,Fe,Ie;function Le(){return(Le=e((()=>{q=t(),i(),g(),Ne=n(),J=[`north`,`south`,`east`,`west`,`central`],Pe=[1.3,.8,1.1,.95,.6],Fe=je(8),Ie=J.flatMap((e,t)=>Array.from({length:12},(e,n)=>{let r=1+.35*Math.cos((n-11)/12*Math.PI*2);return[t,n,Math.round(120*Pe[t]*r*(.85+Fe()*.3))]}))})))()}function Re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,i=(0,Y.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),a=(0,Y.useMemo)(()=>Object.keys(X).map(t=>({name:e(`products.${t}`),data:X[t].flatMap((e,t)=>e.map((e,n)=>[t,n,e]))})),[e]);return(0,ze.jsx)(_,{series:a,barWidth:.6,xAxis:{title:e(`quarter`),categories:Be.map(t=>e(`quarters.${t}`))},yAxis:{title:e(`market`),categories:Ve.map(t=>e(`markets.${t}`))},zAxis:{title:e(`revenue`),format:e=>i.format(e*1e6)},legend:{position:`bottom`},camera:{azimuth:40,elevation:26},height:440,ariaLabel:e(`stackedAria`)})}var Y,ze,Be,Ve,X;function He(){return(He=e((()=>{Y=t(),i(),g(),ze=n(),Be=[`q1`,`q2`,`q3`,`q4`],Ve=[`americas`,`europe`,`asia`,`oceania`],X={hardware:[[4.2,3.1,3.8,.9],[4.5,3,4.1,1],[4.1,2.8,4.6,1.1],[5.6,3.9,5.2,1.4]],software:[[2.8,2.2,1.6,.5],[3.1,2.4,1.9,.6],[3.4,2.5,2.3,.6],[3.9,2.9,2.6,.8]],services:[[1.2,1.4,.7,.3],[1.3,1.5,.8,.3],[1.5,1.6,.9,.4],[1.7,1.8,1.1,.4]]}})))()}function Ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function We(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,{days:i,hours:a}=(0,Z.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{weekday:`short`,timeZone:`UTC`}),t=new Intl.DateTimeFormat(n,{hour:`numeric`,timeZone:`UTC`});return{days:Array.from({length:7},(t,n)=>e.format(Date.UTC(2026,0,5+n))),hours:Array.from({length:24},(e,n)=>t.format(Date.UTC(2026,0,5,n)))}},[n]),o=(0,Z.useMemo)(()=>new Intl.NumberFormat(n),[n]),s=(0,Z.useMemo)(()=>[{name:e(`visits`),data:qe,colorBy:`z`,barWidth:.82}],[e]);return(0,Ge.jsx)(_,{series:s,colorScale:`plasma`,xAxis:{title:e(`hour`),categories:a},yAxis:{title:e(`weekday`),categories:i},zAxis:{title:e(`visits`),format:e=>o.format(e)},colorBar:{title:e(`visits`)},aspect:[1.6,.7,.45],camera:{azimuth:20,elevation:34},height:420,ariaLabel:e(`trafficAria`)})}var Z,Ge,Ke,qe;function Je(){return(Je=e((()=>{Z=t(),i(),g(),Ge=n(),Ke=Ue(14),qe=Array.from({length:7},(e,t)=>Array.from({length:24},(e,n)=>{let r=t>=5?1.35:1,i=Math.exp(-((n-10)**2)/8)*.6,a=Math.exp(-((n-20)**2)/6),o=n<6?.08:.2;return Math.round(1e3*r*(o+i+a)*(.9+Ke()*.2))})).flatMap((e,t)=>e.map((e,n)=>[n,t,e]))})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
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

const DEPARTMENTS = [
  "engineering",
  "sales",
  "marketing",
  "operations",
  "support",
  "finance",
] as const;
const QUARTERS = ["q1", "q2", "q3", "q4"] as const;
const YEARS = ["2024", "2025", "2026"] as const;
type Year = (typeof YEARS)[number];
// quarterly budget of each department, in USD
const BUDGET = [820e3, 540e3, 410e3, 360e3, 220e3, 150e3];
const LIMIT = 0.25;

interface Cell {
  department: number;
  quarter: number;
  budget: number;
  actual: number;
  variance: number; // (actual − budget) / budget
}

/** Budget and actual spend of a year: the budget grows, the variance is random */
const yearOf = (year: Year): Cell[] => {
  const random = mulberry32(Number(year));
  const growth = 1 + 0.06 * (Number(year) - 2024);
  return DEPARTMENTS.flatMap((_, department) =>
    QUARTERS.map((_, quarter) => {
      const budget = BUDGET[department]! * growth;
      // marketing overspends late in the year, support runs lean
      const bias =
        department === 2 ? quarter * 0.04 : department === 4 ? -0.06 : 0;
      const variance = Math.max(
        -LIMIT,
        Math.min(LIMIT, bias + (random() - 0.5) * 0.24),
      );
      return {
        department,
        quarter,
        budget,
        actual: budget * (1 + variance),
        variance,
      };
    }),
  );
};

export default function BudgetVarianceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [year, setYear] = useState<Year>("2025");
  const [picked, setPicked] = useState<Cell | null>(null);
  const cells = useMemo(() => yearOf(year), [year]);
  const formats = useMemo(
    () => ({
      usd: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      variance: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    }),
    [i18n.language],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = cells.map((cell) => ({
      x: cell.quarter,
      y: cell.department,
      z: cell.actual,
      value: cell.variance,
    }));
    return [
      {
        name: t("actualSpend"),
        data,
        colorBy: "value",
        format: (value) => formats.variance.format(value),
      },
    ];
  }, [t, cells, formats]);

  const name = (cell: Cell) => ({
    department: t(\`departments.\${DEPARTMENTS[cell.department]}\`),
    quarter: t(\`quarters.\${QUARTERS[cell.quarter]}\`),
  });
  const budget = cells.reduce((sum, cell) => sum + cell.budget, 0);
  const actual = cells.reduce((sum, cell) => sum + cell.actual, 0);
  const worst = cells.reduce((a, b) => (b.variance > a.variance ? b : a));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("fiscalYear")}</span>
        <Select
          aria-label={t("fiscalYear")}
          size="small"
          value={year}
          onChange={(value) => {
            setYear(value as Year);
            setPicked(null);
          }}
        >
          {YEARS.map((id) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("quarter"),
          categories: QUARTERS.map((id) => t(\`quarters.\${id}\`)),
        }}
        yAxis={{
          title: t("department"),
          categories: DEPARTMENTS.map((id) => t(\`departments.\${id}\`)),
        }}
        zAxis={{
          title: t("actualSpend"),
          format: (value) => formats.usd.format(value),
        }}
        colorScale="coolwarm"
        // symmetric around zero: on budget is the neutral middle color
        valueRange={[-LIMIT, LIMIT]}
        colorBar={{
          title: t("varianceToBudget"),
          format: (value) => formats.variance.format(value),
        }}
        camera={{ azimuth: 35, elevation: 26 }}
        height={460}
        ariaLabel={t("budgetAria", { year })}
        onPointClick={(event) => setPicked(cells[event.index] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked
          ? t("varianceDetail", {
              ...name(picked),
              actual: formats.usd.format(picked.actual),
              budget: formats.usd.format(picked.budget),
              variance: formats.variance.format(picked.variance),
            })
          : t("budgetSummary", {
              year,
              actual: formats.usd.format(actual),
              budget: formats.usd.format(budget),
              variance: formats.variance.format((actual - budget) / budget),
              ...name(worst),
              worst: formats.variance.format(worst.variance),
            })}
      </output>
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
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

// Monthly signup cohorts from November 2025 to October 2026 and the share
// of each cohort still active n months later. Recent cohorts have fewer
// months of history (empty cells), and retain better after an onboarding
// redesign in May 2026.
const COHORTS = 12;
const FIRST = Date.UTC(2025, 10, 1);
const REDESIGN = 6;

interface Cell {
  cohort: number;
  month: number;
  retention: number | null;
}

const { CELLS, SIZES } = (() => {
  const random = mulberry32(12);
  const sizes = Array.from({ length: COHORTS }, () =>
    Math.round(900 + random() * 700),
  );
  const cells: Cell[] = [];
  for (let cohort = 0; cohort < COHORTS; cohort++) {
    const floor = cohort >= REDESIGN ? 0.34 : 0.24;
    for (let month = 0; month < COHORTS; month++) {
      const observed = month < COHORTS - cohort;
      const share =
        month === 0
          ? 1
          : floor +
            (1 - floor) * Math.exp(-month / 2.2) +
            (random() - 0.5) * 0.03;
      cells.push({ cohort, month, retention: observed ? share : null });
    }
  }
  return { CELLS: cells, SIZES: sizes };
})();

const cohortDate = (cohort: number) => {
  const date = new Date(FIRST);
  date.setUTCMonth(date.getUTCMonth() + cohort);
  return date;
};

export default function CohortRetentionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [picked, setPicked] = useState<Cell | null>(null);
  const formats = useMemo(
    () => ({
      cohort: new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
      longCohort: new Intl.DateTimeFormat(i18n.language, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = CELLS.map((cell) => ({
      x: cell.month,
      y: cell.cohort,
      z: cell.retention === null ? null : cell.retention * 100,
    }));
    return [
      {
        name: t("retention"),
        data,
        colorBy: "z",
        format: (value) => formats.percent.format(value / 100),
      },
    ];
  }, [t, formats]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("monthsSinceSignup"),
          categories: Array.from({ length: COHORTS }, (_, n) =>
            t("monthIndex", { n }),
          ),
        }}
        yAxis={{
          title: t("signupCohort"),
          categories: Array.from({ length: COHORTS }, (_, n) =>
            formats.cohort.format(cohortDate(n)),
          ),
        }}
        zAxis={{
          title: t("retention"),
          min: 0,
          max: 100,
          format: (value) => formats.percent.format(value / 100),
        }}
        colorScale="viridis"
        colorBar={{
          title: t("retention"),
          format: (value) => formats.percent.format(value / 100),
        }}
        barWidth={0.75}
        camera={{ azimuth: 40, elevation: 30 }}
        height={460}
        ariaLabel={t("cohortAria")}
        onPointClick={(event) => setPicked(CELLS[event.index] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked && picked.retention !== null
          ? t("cohortReadout", {
              cohort: formats.longCohort.format(cohortDate(picked.cohort)),
              n: picked.month,
              retention: formats.percent.format(picked.retention),
              users: formats.integer.format(
                Math.round(picked.retention * SIZES[picked.cohort]!),
              ),
              total: formats.integer.format(SIZES[picked.cohort]!),
            })
          : t("cohortHint")}
      </output>
    </div>
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
  type Chart3DHandle,
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

// A server room of 6 rows × 10 racks: the bar height is the power draw,
// the color the inlet temperature. The cooling units stand at rack 1, so the
// far end of the room runs warmer, worst where dense GPU racks sit.
const ROWS = ["A", "B", "C", "D", "E", "F"];
const RACKS = 10;
const MAX_INLET = 27; // °C, upper end of the recommended inlet range

interface Rack {
  name: string;
  power: number; // kW
  inlet: number; // °C
}

const RACK_LIST: Rack[] = (() => {
  const random = mulberry32(77);
  return ROWS.flatMap((row, r) =>
    Array.from({ length: RACKS }, (_, c) => {
      const gpu = (r === 2 || r === 3) && c >= 6;
      const power = gpu ? 11 + random() * 4 : 3 + random() * 5;
      const inlet =
        18 + c * 0.75 + (power - 3) * 0.35 + (r === 0 ? 1 : 0) + random();
      return {
        name: \`\${row}\${String(c + 1).padStart(2, "0")}\`,
        power: Math.round(power * 10) / 10,
        inlet: Math.round(inlet * 10) / 10,
      };
    }),
  );
})();

export default function DatacenterDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const ref = useRef<Chart3DHandle>(null);
  const [dark, setDark] = useState(true);
  const [topView, setTopView] = useState(false);
  const [picked, setPicked] = useState<Rack | null>(null);
  const formats = useMemo(() => {
    const decimal = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 1,
    });
    return {
      // kilowatts are not an Intl unit: a translated template
      kw: {
        format: (value: number) => t("kw", { value: decimal.format(value) }),
      },
      celsius: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    };
  }, [t, i18n.language]);

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = RACK_LIST.map((rack, i) => ({
      x: i % RACKS,
      y: Math.floor(i / RACKS),
      z: rack.power,
      value: rack.inlet,
      label: rack.name,
    }));
    return [
      {
        name: t("inletTemperature"),
        data,
        colorBy: "value",
        format: (value) => formats.celsius.format(value),
      },
    ];
  }, [t, formats]);
  const hot = RACK_LIST.filter((rack) => rack.inlet > MAX_INLET);

  const switchView = () => {
    if (topView) ref.current?.resetCamera();
    else
      ref.current?.setCamera({
        azimuth: 0,
        elevation: 89,
        zoom: 1,
        pan: [0, 0],
        projection: "orthographic",
      });
    setTopView(!topView);
  };

  return (
    <ConfigProvider theme={dark ? "dark" : "light"}>
      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <HStack gap={16} wrap align="center">
          <Switch
            size="small"
            checked={dark}
            label={t("darkTheme")}
            onChange={(value) => {
              setDark(value);
              // the chart is created again with the camera of its props
              setTopView(false);
            }}
          />
          <Button
            size="small"
            variant="outline"
            color="neutral"
            onClick={switchView}
          >
            {topView ? t("perspectiveView") : t("topView")}
          </Button>
        </HStack>
        <Bar3DChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          ref={ref}
          series={series}
          xAxis={{
            title: t("rackPosition"),
            categories: Array.from({ length: RACKS }, (_, n) => String(n + 1)),
          }}
          yAxis={{
            title: t("rackRow"),
            categories: ROWS.map((id) => t("rowLabel", { id })),
          }}
          zAxis={{
            title: t("powerDraw"),
            format: (value) => formats.kw.format(value),
          }}
          colorScale="inferno"
          valueRange={[18, 32]}
          colorBar={{
            title: t("inletTemperature"),
            format: (value) => formats.celsius.format(value),
          }}
          barWidth={0.8}
          camera={{ azimuth: 30, elevation: 32 }}
          height={440}
          ariaLabel={t("datacenterAria")}
          onPointClick={(event) => setPicked(RACK_LIST[event.index] ?? null)}
          onCameraChange={(camera) =>
            setTopView(
              camera.projection === "orthographic" && camera.elevation > 80,
            )
          }
        />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {picked
            ? t(picked.inlet > MAX_INLET ? "rackHot" : "rackOk", {
                rack: picked.name,
                power: formats.kw.format(picked.power),
                inlet: formats.celsius.format(picked.inlet),
                limit: formats.celsius.format(MAX_INLET),
              })
            : t("datacenterSummary", {
                hot: hot.length,
                total: RACK_LIST.length,
                limit: formats.celsius.format(MAX_INLET),
                racks: new Intl.ListFormat(i18n.language).format(
                  hot.map((rack) => rack.name),
                ),
              })}
        </output>
      </div>
    </ConfigProvider>
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
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

// Units in the bins of a warehouse: 6 aisles × 5 shelf levels. Every
// second a few orders are picked; a bin below 20% of its capacity is low,
// and an empty bin is restocked.
const AISLES = ["A", "B", "C", "D", "E", "F"];
const SHELVES = 5;
const CAPACITY = 120;
const LOW = CAPACITY * 0.2;

const initialStock = () => {
  const random = mulberry32(8);
  return Array.from({ length: AISLES.length * SHELVES }, () =>
    Math.round(CAPACITY * (0.35 + random() * 0.65)),
  );
};

export default function InventoryLiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [stock, setStock] = useState(initialStock);
  const [restocked, setRestocked] = useState(0);
  // one generator for the whole session, so the picks follow a fixed sequence
  const random = useRef(mulberry32(31));

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const next = random.current;
      // draw the picks outside the state updater, which must stay pure
      const picks = Array.from({ length: 6 }, () => {
        // the lower shelves are picked more often
        const aisle = Math.floor(next() * AISLES.length);
        const shelf = Math.floor(next() ** 1.6 * SHELVES);
        return [aisle * SHELVES + shelf, 1 + Math.floor(next() * 8)] as const;
      });
      setStock((previous) => {
        const bins = [...previous];
        for (const [i, units] of picks) bins[i] = Math.max(0, bins[i]! - units);
        return bins;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  // empty bins are refilled on the next update
  useEffect(() => {
    if (!stock.includes(0)) return;
    const timer = window.setTimeout(() => {
      setStock((previous) =>
        previous.map((units) => (units === 0 ? CAPACITY : units)),
      );
      setRestocked((n) => n + stock.filter((units) => units === 0).length);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [stock]);

  const integer = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const series = useMemo((): Bar3DSeries[] => {
    // one series per state: a bin has a bar in exactly one of them
    const binsOf = (lowStock: boolean): Bar3DDatum[] =>
      stock.map((units, i) => ({
        x: Math.floor(i / SHELVES),
        y: i % SHELVES,
        z: units < LOW === lowStock ? units : null,
      }));
    const format = (value: number) =>
      t("unitsValue", { value: integer.format(value) });
    return [
      {
        name: t("inStock"),
        data: binsOf(false),
        color: "var(--chart-series-1, #4f46e5)",
        format,
      },
      {
        name: t("lowStock"),
        data: binsOf(true),
        color: "var(--danger-color, #dc2626)",
        format,
      },
    ];
  }, [t, stock, integer]);
  const low = stock.filter((units) => units < LOW).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={playing}
        label={t("liveUpdates")}
        onChange={setPlaying}
      />
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("aisle"),
          categories: AISLES.map((id) => t("aisleLabel", { id })),
        }}
        yAxis={{
          title: t("shelf"),
          categories: Array.from({ length: SHELVES }, (_, n) =>
            t("shelfLabel", { n: n + 1 }),
          ),
        }}
        zAxis={{ title: t("units"), min: 0, max: CAPACITY }}
        barWidth={0.6}
        camera={{ azimuth: 32, elevation: 26 }}
        height={420}
        ariaLabel={t("inventoryAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("inventoryStatus", {
          total: integer.format(stock.reduce((sum, units) => sum + units, 0)),
          low,
          bins: stock.length,
          restocked,
        })}
      </output>
    </div>
  );
}
`})))()}var rt;function it(){return(it=e((()=>{rt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

// Revenue (bar height) and margin (bar color) of five products in four
// markets: the tallest bars are not the most profitable ones
const PRODUCTS = ["laptops", "phones", "tablets", "watches", "audio"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = [
  [42, 31, 38, 6],
  [55, 40, 61, 8],
  [18, 14, 22, 3],
  [12, 11, 9, 2],
  [16, 13, 15, 3],
];
const MARGIN = [
  [8, 11, 6, 12],
  [21, 24, 17, 25],
  [14, 16, 9, 18],
  [34, 31, 28, 36],
  [27, 29, 22, 30],
];

export default function MarginDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = PRODUCTS.flatMap((_, p) =>
      MARKETS.map((_, m) => ({
        x: p,
        y: m,
        z: REVENUE[p]![m]!,
        value: MARGIN[p]![m]!,
      })),
    );
    return [
      {
        name: t("revenue"),
        data,
        colorBy: "value",
        format: (value) => percent.format(value / 100),
      },
    ];
  }, [t, percent]);

  return (
    <Bar3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("product"),
        categories: PRODUCTS.map((key) => t(\`productNames.\${key}\`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((key) => t(\`markets.\${key}\`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      colorBar={{
        title: t("margin"),
        format: (value) => percent.format(value / 100),
      }}
      camera={{ azimuth: 38, elevation: 24 }}
      height={440}
      ariaLabel={t("marginAria")}
    />
  );
}
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Population (millions) by age group in four census years: women above the
// floor, men below it (negative heights), like a population pyramid laid on
// its side and repeated over time
const YEARS = [1960, 1980, 2000, 2020];
const GROUPS = [0, 10, 20, 30, 40, 50, 60, 70, 80];
const population = (year: number, group: number, women: boolean) => {
  // births shrink over the decades while people live longer
  const birth = 4.2 - (year - 1960) * 0.025;
  const survival = Math.exp(-((group / (62 + (year - 1960) * 0.2)) ** 4));
  const shift = 1 + Math.max(0, 0.6 - Math.abs(year - 1960 - group - 10) / 25);
  const value = birth * survival * shift * (women ? 1 + group / 400 : 1);
  return Math.round(value * 100) / 100;
};

export default function PyramidDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });

  const series = useMemo(
    (): Bar3DSeries[] => [
      {
        name: t("women"),
        color: "var(--chart-series-5, #ec4899)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, population(year, group, true)] as const,
          ),
        ),
      },
      {
        name: t("men"),
        color: "var(--chart-series-1, #3b82f6)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, -population(year, group, false)] as const,
          ),
        ),
      },
    ],
    [t],
  );
  const ages = GROUPS.map((from, i) =>
    i === GROUPS.length - 1
      ? t("ageOver", { from })
      : t("ageGroup", { from, to: from + 9 }),
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.8}
      xAxis={{ title: t("age"), categories: ages }}
      yAxis={{ title: t("year"), categories: YEARS.map(String) }}
      zAxis={{
        title: t("population"),
        format: (value) => t("millions", { value: Math.abs(value) }),
      }}
      aspect={[1.2, 0.8, 0.8]}
      camera={{ azimuth: 28, elevation: 14 }}
      height={440}
      ariaLabel={t("pyramidAria")}
    />
  );
}
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const REGIONS = ["north", "south", "east", "west", "central"] as const;
// monthly sales in k$: a seasonal curve peaking in December, scaled per region
const SCALE = [1.3, 0.8, 1.1, 0.95, 0.6];
const random = mulberry32(8);
const sales = REGIONS.flatMap((_, r) =>
  Array.from({ length: 12 }, (_, month) => {
    const season = 1 + 0.35 * Math.cos(((month - 11) / 12) * Math.PI * 2);
    return [
      r,
      month,
      Math.round(120 * SCALE[r]! * season * (0.85 + random() * 0.3)),
    ] as const;
  }),
);

export default function SalesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // "Jan", "janv.", "1月", ...
  const months = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return Array.from({ length: 12 }, (_, m) =>
      format.format(Date.UTC(2026, m, 1)),
    );
  }, [locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] => [{ name: t("sales"), data: sales }],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      xAxis={{
        title: t("region"),
        categories: REGIONS.map((key) => t(\`regions.\${key}\`)),
      }}
      yAxis={{ title: t("month"), categories: months }}
      zAxis={{ title: t("sales"), format: (value) => usd.format(value * 1000) }}
      aspect={[0.75, 1.2, 0.6]}
      camera={{ azimuth: 50, elevation: 28 }}
      height={440}
      ariaLabel={t("salesAria")}
    />
  );
}
`})))()}var Q;function lt(){return(lt=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Quarterly revenue (M$) of three product lines in four markets: the bars of
// the same quarter and market are stacked
const QUARTERS = ["q1", "q2", "q3", "q4"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = {
  hardware: [
    [4.2, 3.1, 3.8, 0.9],
    [4.5, 3.0, 4.1, 1.0],
    [4.1, 2.8, 4.6, 1.1],
    [5.6, 3.9, 5.2, 1.4],
  ],
  software: [
    [2.8, 2.2, 1.6, 0.5],
    [3.1, 2.4, 1.9, 0.6],
    [3.4, 2.5, 2.3, 0.6],
    [3.9, 2.9, 2.6, 0.8],
  ],
  services: [
    [1.2, 1.4, 0.7, 0.3],
    [1.3, 1.5, 0.8, 0.3],
    [1.5, 1.6, 0.9, 0.4],
    [1.7, 1.8, 1.1, 0.4],
  ],
};
type Product = keyof typeof REVENUE;

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] =>
      (Object.keys(REVENUE) as Product[]).map((product) => ({
        name: t(\`products.\${product}\`),
        data: REVENUE[product].flatMap((row, q) =>
          row.map((value, m) => [q, m, value] as const),
        ),
      })),
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.6}
      xAxis={{
        title: t("quarter"),
        categories: QUARTERS.map((q) => t(\`quarters.\${q}\`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((m) => t(\`markets.\${m}\`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      legend={{ position: "bottom" }}
      camera={{ azimuth: 40, elevation: 26 }}
      height={440}
      ariaLabel={t("stackedAria")}
    />
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Visits per hour of the week on a shop website: a morning bump, an evening
// peak and busier weekends; heights and colors both show the visits
const random = mulberry32(14);
const visits = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const weekend = day >= 5 ? 1.35 : 1;
    const morning = Math.exp(-((hour - 10) ** 2) / 8) * 0.6;
    const evening = Math.exp(-((hour - 20) ** 2) / 6);
    const night = hour < 6 ? 0.08 : 0.2;
    return Math.round(
      1000 * weekend * (night + morning + evening) * (0.9 + random() * 0.2),
    );
  }),
).flatMap((hours, day) => hours.map((v, hour) => [hour, day, v] as const));

export default function TrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // localized weekday names (Monday first) and hours
  const { days, hours } = useMemo(() => {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      timeZone: "UTC",
    });
    return {
      // 2026-01-05 is a Monday
      days: Array.from({ length: 7 }, (_, d) =>
        weekday.format(Date.UTC(2026, 0, 5 + d)),
      ),
      hours: Array.from({ length: 24 }, (_, h) =>
        hour.format(Date.UTC(2026, 0, 5, h)),
      ),
    };
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): Bar3DSeries[] => [
      { name: t("visits"), data: visits, colorBy: "z", barWidth: 0.82 },
    ],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      colorScale="plasma"
      xAxis={{ title: t("hour"), categories: hours }}
      yAxis={{ title: t("weekday"), categories: days }}
      zAxis={{ title: t("visits"), format: (value) => number.format(value) }}
      colorBar={{ title: t("visits") }}
      aspect={[1.6, 0.7, 0.45]}
      camera={{ azimuth: 20, elevation: 34 }}
      height={420}
      ariaLabel={t("trafficAria")}
    />
  );
}
`})))()}var ft,pt,mt;function $(){return($=e((()=>{le(),me(),_e(),xe(),Ee(),Ae(),Le(),He(),Je(),Xe(),Qe(),et(),nt(),it(),ot(),ct(),lt(),dt(),t(),te(),re(),ft=n(),pt=h(Object.assign({"./demos/budget-variance.tsx":ae,"./demos/cohort-retention.tsx":de,"./demos/datacenter.tsx":ge,"./demos/inventory-live.tsx":ye,"./demos/margin.tsx":Se,"./demos/pyramid.tsx":De,"./demos/sales.tsx":Me,"./demos/stacked.tsx":Re,"./demos/traffic.tsx":We}),Object.assign({"./demos/budget-variance.tsx":Ye,"./demos/cohort-retention.tsx":Ze,"./demos/datacenter.tsx":$e,"./demos/inventory-live.tsx":tt,"./demos/margin.tsx":rt,"./demos/pyramid.tsx":at,"./demos/sales.tsx":st,"./demos/stacked.tsx":Q,"./demos/traffic.tsx":ut})),mt=()=>(0,ft.jsx)(ne,{id:`bar-3d-chart`,demos:pt})})))()}$();export{mt as default};