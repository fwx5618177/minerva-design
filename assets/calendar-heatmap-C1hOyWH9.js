import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-DFfJWCfl.js";import{R as a,z as o}from"./ProgressIndicator-CLQ5GhV8.js";import{i as s,n as c,r as l,t as u}from"./Radio-y1-55x53.js";import{a as d,c as f}from"./shapes-wZNdoyOi.js";import{l as p,n as ee,t as te,u as ne}from"./DocPage-CkWG9x5k.js";function re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,m.useState)(null),a=(0,m.useMemo)(()=>_.reduce((e,t)=>e+t.value,0),[]);return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,h.jsx)(`p`,{style:{margin:0},children:e(`commitsTotal`,{total:a})}),(0,h.jsx)(d,{data:_,locale:t.language,color:`#2da44e`,onClick:i,ariaLabel:e(`commitsAria`)}),(0,h.jsx)(`p`,{role:`status`,style:{margin:0},children:n?e(`commitsDay`,{date:n.name,value:n.value}):e(`commitsHint`)})]})}var m,h,ae,oe,g,se,_;function ce(){return(ce=e((()=>{m=t(),i(),f(),h=n(),ae=864e5,oe=e=>new Date(e).toISOString().slice(0,10),g=re(7),se=Date.UTC(2026,9,24),_=[];for(let e=364;e>=0;e--){let t=se-e*ae,n=new Date(t).getUTCDay(),r=n===0||n===6,i=e>290&&e<305,a=e%61<6,o=i?.05:r?.2:.82;g()<o&&_.push({date:oe(t),value:Math.max(1,Math.round(g()*(r?4:9)*(a?2.2:1)))})}})))()}function le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),n=t.language,[i,a]=(0,v.useState)([]),s=(0,v.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`kwh`,{value:t.format(n)})},[n,e]),c=(0,v.useMemo)(()=>x.filter(e=>!i.includes(he(e.value))),[i]),l=c.reduce((e,t)=>e+t.value,0),u=x.reduce((e,t)=>e+t.value,0),f=new Intl.NumberFormat(n),p=new Intl.NumberFormat(n,{style:`percent`});return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[(0,y.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>a([0,1]),children:e(`highUseOnly`)}),(0,y.jsx)(o,{size:`small`,variant:`ghost`,disabled:!i.length,onClick:()=>a([]),children:e(`showAll`)})]}),(0,y.jsx)(d,{data:x,range:2025,colors:fe,thresholds:b,format:s,locale:n,legend:{position:`top`},hidden:i,onToggle:e=>a(e.hiddenIndexes),ariaLabel:e(`energyAria`)}),(0,y.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`visibleDays`,{days:f.format(c.length),value:s(l),share:p.format(l/u)})})]})}var v,y,de,b,fe,pe,me,x,he;function ge(){return(ge=e((()=>{v=t(),i(),a(),f(),y=n(),de=864e5,b=[8,14,20],fe=[`var(--success-color)`,`var(--primary-color)`,`var(--warning-color)`,`var(--danger-color)`],pe=le(55),me=Date.UTC(2025,0,1),x=Array.from({length:365},(e,t)=>{let n=me+t*de,r=new Date(n).getUTCDay(),i=9*Math.max(0,Math.cos(2*Math.PI*(t-15)/365)),a=t>180&&t<196||t>216&&t<226?9:0,o=r===0||r===6?2.5:0,s=5+i+a+o+pe()*4;return{date:new Date(n).toISOString().slice(0,10),value:Math.round(s*10)/10}}),he=e=>{let t=b.findIndex(t=>e<=t);return t<0?b.length:t}})))()}function _e(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),n=t.language,[i,a]=(0,S.useState)(()=>new Set(O)),[s,c]=(0,S.useState)(null),l=(0,S.useMemo)(()=>[...i].map(e=>({date:e,value:1})),[i]),u=e=>{let t=e.date;if(!t)return;let n=new Set(i),r=!n.has(t);r?n.add(t):n.delete(t),a(n),c({name:e.name,done:r})},f=new Intl.NumberFormat(n),p=new Intl.NumberFormat(n,{style:`percent`});return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,C.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,C.jsx)(`span`,{children:e(`habitSummary`,{done:f.format(i.size),share:p.format(i.size/D.length),streak:f.format(be(i))})}),(0,C.jsx)(o,{size:`small`,variant:`ghost`,onClick:()=>{a(new Set(O)),c(null)},children:e(`reset`)})]}),(0,C.jsx)(d,{data:l,range:[E(w),E(T)],layout:`months`,levels:1,color:`var(--success-color)`,legend:!1,format:t=>e(t?`workoutDone`:`workoutMissed`),locale:n,onClick:u,height:280,ariaLabel:e(`habitAria`)}),(0,C.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:s?s.done?e(`markedDone`,{date:s.name}):e(`markedMissed`,{date:s.name}):e(`habitHint`)})]})}var S,C,ye,w,T,E,D,O,be;function xe(){return(xe=e((()=>{S=t(),i(),a(),f(),C=n(),ye=864e5,w=Date.UTC(2026,7,1),T=Date.UTC(2026,9,31),E=e=>new Date(e).toISOString().slice(0,10),D=[];for(let e=w;e<=T;e+=ye)D.push(E(e));O=(()=>{let e=_e(31);return D.filter(()=>e()<.6)})(),be=e=>{let t=0;for(let n=D.length-1;n>=0&&e.has(D[n]??``);n--)t++;return t}})))()}function Se(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),n=t.language,[i,a]=(0,k.useState)(2026),[o,c]=(0,k.useState)(null),l=(0,k.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,k.useMemo)(()=>{let e=new Intl.NumberFormat(n,{useGrouping:!1});return t=>e.format(t)},[n]),p=(0,k.useMemo)(()=>M.filter(e=>String(e.date).startsWith(`${i}-`)),[i]),ee=p.reduce((e,t)=>e+t.value,0),te=(i===2026?304:i===2024?366:365)-p.length;return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,A.jsx)(s,{"aria-label":e(`year`),direction:`horizontal`,value:String(i),onChange:e=>{a(Number(e)),c(null)},children:we.map(e=>(0,A.jsx)(u,{value:String(e),label:f(e)},e))}),(0,A.jsx)(`p`,{style:{margin:0},children:e(`incidentsYear`,{year:f(i),total:l.format(ee),quiet:l.format(te)})}),(0,A.jsx)(d,{data:M,range:i,thresholds:[1,2,4],color:`var(--danger-color)`,format:t=>e(`incidentsN`,{value:l.format(t)}),locale:n,onHover:c,ariaLabel:e(`incidentsAria`,{year:f(i)})}),(0,A.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:o?(o.date??``)>Te?e(`futureDay`,{date:o.name}):o.value?e(`incidentsDay`,{date:o.name,value:l.format(o.value)}):e(`quietDay`,{date:o.name}):e(`hoverDay`)})]})}var k,A,j,we,Te,Ee,M;function De(){return(De=e((()=>{k=t(),i(),c(),l(),f(),A=n(),j=864e5,we=[2024,2025,2026],Te=`2026-10-31`,Ee=Se(404),M=[];for(let e=Date.UTC(2024,0,1);e<=Date.UTC(2026,9,31);e+=j){let t=new Date(e).getUTCFullYear(),n=t===2024?.55:t===2025?.35:.2,r=Math.floor((e-Date.UTC(t,0,1))/j)%91<5?3:1,i=0;for(;Ee()<n*r*.6&&i<8;)i++;i&&M.push({date:new Date(e).toISOString().slice(0,10),value:i})}})))()}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,N.useState)(`en-US`),a=(0,N.useMemo)(()=>new Intl.DisplayNames([t.language],{type:`language`}),[t.language]);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(s,{"aria-label":e(`localeLabel`),direction:`horizontal`,value:n,onChange:e=>i(String(e)),children:Ae.map(e=>(0,P.jsx)(u,{value:e,label:a.of(e)??e},e))}),(0,P.jsx)(d,{data:F,range:[`2026-01-01`,`2026-06-30`],locale:n,color:`#0ea5e9`,maxCellSize:20,legend:!1,ariaLabel:e(`deploysAria`)})]})}var N,P,ke,F,Ae;function je(){return(je=e((()=>{N=t(),i(),c(),l(),f(),P=n(),ke=864e5,F=[];for(let e=Date.UTC(2026,0,1);e<=Date.UTC(2026,5,30);e+=ke){let t=new Date(e),n=t.getUTCDay();if(n===0||n===6)continue;let r=t.getUTCDate();F.push({date:t.toISOString().slice(0,10),value:(r*7+n*3)%9})}Ae=[`en-US`,`fr-FR`,`de-DE`,`ja-JP`,`zh-CN`,`ar-EG`]})))()}function Me(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,I.useState)(`locale`),a=t.language,o=(0,I.useMemo)(()=>{let e=new Intl.DateTimeFormat(a,{weekday:`long`,timeZone:`UTC`});return t=>e.format(Date.UTC(2026,2,1+t))},[a]);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsx)(s,{"aria-label":e(`weekStartLabel`),direction:`horizontal`,value:n,onChange:e=>i(e),children:Ie.map(t=>(0,L.jsx)(u,{value:t,label:t===`locale`?e(`fromLocale`):o(Number(t))},t))}),(0,L.jsx)(d,{data:R,range:2026,layout:`months`,weekStart:n===`locale`?void 0:Number(n),locale:a,color:`#d97706`,levels:5,height:600,ariaLabel:e(`ordersAria`)})]})}var I,L,Pe,Fe,R,Ie;function Le(){return(Le=e((()=>{I=t(),i(),c(),l(),f(),L=n(),Pe=864e5,Fe=Me(11),R=[];for(let e=Date.UTC(2026,0,1);e<=Date.UTC(2026,11,31);e+=Pe){let t=new Date(e),n=t.getUTCDay(),r=t.getUTCMonth(),i=n===0||n===6,a=n===1,o=r===11||r===1&&t.getUTCDate()<=14;a||R.push({date:t.toISOString().slice(0,10),value:Math.round((12+Fe()*18)*(i?1.8:1)*(o?1.6:1))})}Ie=[`locale`,`0`,`1`,`6`]})))()}function Re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ze(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),n=t.language,i=(0,z.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:1}),[n]),a=(0,z.useMemo)(()=>t=>e(`km`,{value:i.format(t)}),[i,e]);return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,B.jsx)(d,{data:H,range:[`2024-01-01`,`2026-12-31`],thresholds:[6,10,16],color:`#f97316`,format:a,locale:n,ariaLabel:e(`runsAria`)}),(0,B.jsx)(`p`,{style:{margin:0},children:Object.entries(Ve).map(([t,n])=>e(`runsYear`,{year:t,value:a(n)})).join(` · `)})]})}var z,B,Be,V,H,Ve;function He(){return(He=e((()=>{z=t(),i(),f(),B=n(),Be=864e5,V=Re(42),H=[];for(let e=Date.UTC(2024,0,1);e<=Date.UTC(2026,11,31);e+=Be){let t=new Date(e),n=t.getUTCMonth(),r=t.getUTCDay()===0,i=n===0||n===11?.25:n>=6&&n<=7?.5:.65,a=t.getUTCFullYear()===2025&&n>=7&&n<=9;V()<i+(a?.2:0)&&H.push({date:t.toISOString().slice(0,10),value:Math.round((r?14+V()*14:4+V()*8)*(a?1.3:1)*10)/10})}Ve=H.reduce((e,t)=>{let n=String(t.date).slice(0,4);return e[n]=(e[n]??0)+t.value,e},{})})))()}function Ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function We(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),n=t.language,i=(0,U.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,unitDisplay:`short`,maximumFractionDigits:2});return t=>e.format(t)},[n]),a=(0,U.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,unitDisplay:`short`,maximumFractionDigits:2,signDisplay:`exceptZero`});return t=>e.format(t)},[n]),o=q.reduce((e,t)=>e+t.value,0)/q.length,s=q.filter(e=>e.value>=G).length;return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,W.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`sleepSummary`,{average:i(Math.round(o*10)/10),reached:new Intl.NumberFormat(n).format(s),nights:new Intl.NumberFormat(n).format(q.length),goal:i(G)})}),(0,W.jsx)(d,{data:q,range:[Ke,qe],thresholds:[6,7,7.75],color:`var(--chart-series-3)`,format:i,locale:n,renderTooltip:t=>{if(!t.value)return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,W.jsx)(`strong`,{children:t.name}),(0,W.jsx)(`span`,{children:e(`noRecord`)})]});let n=t.value-G;return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,W.jsx)(`strong`,{children:t.name}),(0,W.jsx)(`span`,{children:i(t.value)}),(0,W.jsx)(`span`,{style:{color:n>=0?`var(--success-color)`:`var(--danger-color)`},children:e(`vsGoal`,{value:a(n),goal:i(G)})})]})},ariaLabel:e(`sleepAria`)})]})}var U,W,Ge,G,Ke,qe,K,Je,q;function Ye(){return(Ye=e((()=>{U=t(),i(),f(),W=n(),Ge=864e5,G=8,Ke=`2026-05-01`,qe=`2026-10-31`,K=Ue(88),Je=Date.UTC(2026,4,1),q=[];for(let e=0;e<184;e++){let t=Je+e*Ge,n=new Date(t).getUTCDay();if(K()<.06)continue;let r=(n===0||n===6?8.2:6.9)+(K()-.5)*1.8;q.push({date:new Date(t).toISOString().slice(0,10),value:Math.round(r*4)/4})}})))()}function Xe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ze(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.calendar-heatmap.data`}),[n,i]=(0,J.useState)(null),{longest:a,current:o}=(0,J.useMemo)(()=>tt(Q),[]),s=(0,J.useMemo)(()=>t=>e(`minutes`,{value:t}),[e]);return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Y.jsx)(`p`,{style:{margin:0},children:e(`streaks`,{current:o,longest:a})}),(0,Y.jsx)(d,{data:et,range:2026,thresholds:nt,color:`#8b5cf6`,format:s,locale:t.language,legend:{position:`top`},onClick:i,ariaLabel:e(`lessonsAria`)}),(0,Y.jsx)(`p`,{role:`status`,style:{margin:0},children:n?n.value>0?e(`lessonDay`,{date:n.name,value:s(n.value)}):e(`missedDay`,{date:n.name}):e(`lessonsHint`)})]})}var J,Y,Qe,X,$e,Z,Q,et,tt,nt;function rt(){return(rt=e((()=>{J=t(),i(),f(),Y=n(),Qe=864e5,X=Xe(2026),$e=Date.UTC(2026,0,1),Z=297,Q=[];for(let e=0;e<Z;e++){let t=.55+.4*e/Z;Q.push(X()<t?Math.round(5+X()*(20+e/4)):0)}et=Q.map((e,t)=>({date:new Date($e+t*Qe).toISOString().slice(0,10),value:e})),tt=e=>{let t=0,n=0;for(let r of e)n=r>0?n+1:0,t=Math.max(t,n);return{longest:t,current:n}},nt=[15,30,60]})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo, useState } from "react";
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
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
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
// kWh: up to 8, 8-14, 14-20, more than 20
const THRESHOLDS = [8, 14, 20];
const COLORS = [
  "var(--success-color)",
  "var(--primary-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

// Electricity used by a home each day of 2025 (kWh): heating in winter, air
// conditioning in the summer heat waves, more at weekends
const random = mulberry32(55);
const START = Date.UTC(2025, 0, 1);
const USAGE: CalendarDatum[] = Array.from({ length: 365 }, (_, i) => {
  const time = START + i * DAY;
  const weekday = new Date(time).getUTCDay();
  const winter = 9 * Math.max(0, Math.cos((2 * Math.PI * (i - 15)) / 365));
  const heatWave = (i > 180 && i < 196) || (i > 216 && i < 226) ? 9 : 0;
  const weekend = weekday === 0 || weekday === 6 ? 2.5 : 0;
  const value = 5 + winter + heatWave + weekend + random() * 4;
  return {
    date: new Date(time).toISOString().slice(0, 10),
    value: Math.round(value * 10) / 10,
  };
});

/** Level of a value, as the chart computes it from THRESHOLDS */
const levelOf = (value: number) => {
  const k = THRESHOLDS.findIndex((bound) => value <= bound);
  return k < 0 ? THRESHOLDS.length : k;
};

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  // controlled legend: the hidden levels live in the state
  const [hidden, setHidden] = useState<number[]>([]);

  const kwh = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("kwh", { value: format.format(value) });
  }, [locale, t]);
  const visible = useMemo(
    () => USAGE.filter((d) => !hidden.includes(levelOf(d.value))),
    [hidden],
  );
  const used = visible.reduce((sum, d) => sum + d.value, 0);
  const total = USAGE.reduce((sum, d) => sum + d.value, 0);
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
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
          onClick={() => setHidden([0, 1])}
        >
          {t("highUseOnly")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          disabled={!hidden.length}
          onClick={() => setHidden([])}
        >
          {t("showAll")}
        </Button>
      </div>
      <CalendarHeatmap
        data={USAGE}
        range={2025}
        colors={COLORS}
        thresholds={THRESHOLDS}
        format={kwh}
        locale={locale}
        legend={{ position: "top" }}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        ariaLabel={t("energyAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("visibleDays", {
          days: number.format(visible.length),
          value: kwh(used),
          share: percent.format(used / total),
        })}
      </output>
    </div>
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
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
const FIRST = Date.UTC(2026, 7, 1);
const LAST = Date.UTC(2026, 9, 31);
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);
const ALL_DAYS: string[] = [];
for (let time = FIRST; time <= LAST; time += DAY) ALL_DAYS.push(iso(time));

// days a workout was logged since August, before any click
const INITIAL = (() => {
  const random = mulberry32(31);
  return ALL_DAYS.filter(() => random() < 0.6);
})();

/** Days in a row up to the last day */
const currentStreak = (done: ReadonlySet<string>) => {
  let run = 0;
  for (let i = ALL_DAYS.length - 1; i >= 0 && done.has(ALL_DAYS[i] ?? ""); i--)
    run++;
  return run;
};

export default function HabitToggleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const [done, setDone] = useState<ReadonlySet<string>>(() => new Set(INITIAL));
  const [last, setLast] = useState<{ name: string; done: boolean } | null>(
    null,
  );

  // the chart only draws the data it gets: a click updates the state
  const data = useMemo(
    (): CalendarDatum[] => [...done].map((date) => ({ date, value: 1 })),
    [done],
  );
  const toggle = (event: ShapeHoverEvent) => {
    const date = event.date;
    if (!date) return;
    const next = new Set(done);
    const nowDone = !next.has(date);
    if (nowDone) next.add(date);
    else next.delete(date);
    setDone(next);
    setLast({ name: event.name, done: nowDone });
  };
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

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
        <span>
          {t("habitSummary", {
            done: number.format(done.size),
            share: percent.format(done.size / ALL_DAYS.length),
            streak: number.format(currentStreak(done)),
          })}
        </span>
        <Button
          size="small"
          variant="ghost"
          onClick={() => {
            setDone(new Set(INITIAL));
            setLast(null);
          }}
        >
          {t("reset")}
        </Button>
      </div>
      <CalendarHeatmap
        data={data}
        range={[iso(FIRST), iso(LAST)]}
        layout="months"
        levels={1}
        color="var(--success-color)"
        legend={false}
        format={(value) => (value ? t("workoutDone") : t("workoutMissed"))}
        locale={locale}
        onClick={toggle}
        height={280}
        ariaLabel={t("habitAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {last
          ? last.done
            ? t("markedDone", { date: last.name })
            : t("markedMissed", { date: last.name })
          : t("habitHint")}
      </output>
    </div>
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
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
const YEARS = [2024, 2025, 2026] as const;
const LAST_DAY = "2026-10-31";
type Year = (typeof YEARS)[number];

// Production incidents per day, from 2024 to Oct 31, 2026: fewer every year
// as the on-call team automates, with bad weeks after big releases
const random = mulberry32(404);
const INCIDENTS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2024, 0, 1);
  time <= Date.UTC(2026, 9, 31);
  time += DAY
) {
  const year = new Date(time).getUTCFullYear();
  const rate = year === 2024 ? 0.55 : year === 2025 ? 0.35 : 0.2;
  const dayOfYear = Math.floor((time - Date.UTC(year, 0, 1)) / DAY);
  const release = dayOfYear % 91 < 5 ? 3 : 1;
  let n = 0;
  while (random() < rate * release * 0.6 && n < 8) n++;
  if (n)
    INCIDENTS.push({
      date: new Date(time).toISOString().slice(0, 10),
      value: n,
    });
}

export default function IncidentsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const [year, setYear] = useState<Year>(2026);
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const yearName = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { useGrouping: false });
    return (value: number) => format.format(value);
  }, [locale]);
  const days = useMemo(
    () => INCIDENTS.filter((d) => String(d.date).startsWith(\`\${year}-\`)),
    [year],
  );
  const total = days.reduce((sum, d) => sum + d.value, 0);
  const quiet = (year === 2026 ? 304 : year === 2024 ? 366 : 365) - days.length;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("year")}
        direction="horizontal"
        value={String(year)}
        onChange={(value) => {
          setYear(Number(value) as Year);
          setHovered(null);
        }}
      >
        {YEARS.map((y) => (
          <Radio key={y} value={String(y)} label={yearName(y)} />
        ))}
      </RadioGroup>
      <p style={{ margin: 0 }}>
        {t("incidentsYear", {
          year: yearName(year),
          total: number.format(total),
          quiet: number.format(quiet),
        })}
      </p>
      <CalendarHeatmap
        data={INCIDENTS}
        // the range picks the year shown out of the same data
        range={year}
        thresholds={[1, 2, 4]}
        color="var(--danger-color)"
        format={(value) => t("incidentsN", { value: number.format(value) })}
        locale={locale}
        onHover={setHovered}
        ariaLabel={t("incidentsAria", { year: yearName(year) })}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? (hovered.date ?? "") > LAST_DAY
            ? t("futureDay", { date: hovered.name })
            : hovered.value
              ? t("incidentsDay", {
                  date: hovered.name,
                  value: number.format(hovered.value),
                })
              : t("quietDay", { date: hovered.name })
          : t("hoverDay")}
      </output>
    </div>
  );
}
`})))()}var ft;function $(){return($=e((()=>{ft=`import { useMemo, useState } from "react";
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
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { useMemo, useState } from "react";
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
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { useMemo } from "react";
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
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useMemo } from "react";
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
const GOAL = 8; // hours
const FIRST = "2026-05-01";
const LAST = "2026-10-31";

// Hours of sleep recorded by a watch each night: shorter on weeknights,
// catching up at weekends, a few nights without the watch
const random = mulberry32(88);
const START = Date.UTC(2026, 4, 1);
const NIGHTS: CalendarDatum[] = [];
for (let i = 0; i < 184; i++) {
  const time = START + i * DAY;
  const weekday = new Date(time).getUTCDay();
  if (random() < 0.06) continue;
  const weekend = weekday === 0 || weekday === 6;
  const hours = (weekend ? 8.2 : 6.9) + (random() - 0.5) * 1.8;
  NIGHTS.push({
    date: new Date(time).toISOString().slice(0, 10),
    value: Math.round(hours * 4) / 4,
  });
}

export default function SleepDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;

  const hours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      unitDisplay: "short",
      maximumFractionDigits: 2,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const signedHours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      unitDisplay: "short",
      maximumFractionDigits: 2,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const average = NIGHTS.reduce((sum, d) => sum + d.value, 0) / NIGHTS.length;
  const reached = NIGHTS.filter((d) => d.value >= GOAL).length;

  // the date in \`name\` is already formatted in the locale; value is the
  // total of the day (0 for the nights without data)
  const tooltip = (event: ShapeHoverEvent) => {
    if (!event.value) {
      return (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{event.name}</strong>
          <span>{t("noRecord")}</span>
        </div>
      );
    }
    const delta = event.value - GOAL;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>{hours(event.value)}</span>
        <span
          style={{
            color: delta >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {t("vsGoal", { value: signedHours(delta), goal: hours(GOAL) })}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("sleepSummary", {
          average: hours(Math.round(average * 10) / 10),
          reached: new Intl.NumberFormat(locale).format(reached),
          nights: new Intl.NumberFormat(locale).format(NIGHTS.length),
          goal: hours(GOAL),
        })}
      </output>
      <CalendarHeatmap
        data={NIGHTS}
        range={[FIRST, LAST]}
        // under 6 h, 6-7 h, 7-8 h, 8 h or more
        thresholds={[6, 7, 7.75]}
        color="var(--chart-series-3)"
        format={hours}
        locale={locale}
        renderTooltip={tooltip}
        ariaLabel={t("sleepAria")}
      />
    </div>
  );
}
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useMemo, useState } from "react";
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
`})))()}var xt,St,Ct;function wt(){return(wt=e((()=>{ce(),ge(),xe(),De(),je(),Le(),He(),Ye(),rt(),at(),st(),lt(),dt(),$(),mt(),gt(),vt(),bt(),t(),ee(),ne(),xt=n(),St=p(Object.assign({"./demos/contributions.tsx":ie,"./demos/energy.tsx":ue,"./demos/habit-toggle.tsx":ve,"./demos/incidents.tsx":Ce,"./demos/locale.tsx":Oe,"./demos/months.tsx":Ne,"./demos/multi-year.tsx":ze,"./demos/sleep.tsx":We,"./demos/streak.tsx":Ze}),Object.assign({"./demos/contributions.tsx":it,"./demos/energy.tsx":ot,"./demos/habit-toggle.tsx":ct,"./demos/incidents.tsx":ut,"./demos/locale.tsx":ft,"./demos/months.tsx":pt,"./demos/multi-year.tsx":ht,"./demos/sleep.tsx":_t,"./demos/streak.tsx":yt})),Ct=()=>(0,xt.jsx)(te,{id:`calendar-heatmap`,demos:St})})))()}wt();export{Ct as default};