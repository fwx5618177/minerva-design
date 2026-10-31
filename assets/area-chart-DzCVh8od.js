import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,o as c,t as l}from"./Select-CRoh0AwC.js";import{l as u,n as d,t as ee,u as f}from"./DocPage-BdPOW9nQ.js";import{l as p,m}from"./charts-JJDQ3gS7.js";function te(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,h.useMemo)(()=>{let t=te(21),n=[],r=18e3;for(let e=0;e<90;e++){r*=1.004+(t()-.5)*.01;let i=1+.04*Math.sin(e/9),a=r*i*(.985+t()*.03);n.push([new Date(ae+e*ie),Math.round(a)])}return[{name:e(`dau`),data:n}]},[e]),a=(0,h.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),o=(0,h.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]);return(0,re.jsx)(p,{series:i,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>a.format(e)},height:280,ariaLabel:e(`dauAria`)})}var h,re,ie,ae;function oe(){return(oe=e((()=>{h=t(),i(),m(),re=n(),ie=864e5,ae=new Date(2026,3,1).getTime()})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,g.useMemo)(()=>{let t=fe(n),r=t.map((e,t)=>[e,de[t]??null]),i=t.map((e,t)=>[e,Math.round(ue*(t+1)/12)]);return[{name:e(`actual`),data:r},{name:e(`plan`),type:`line`,data:i,color:`var(--text-secondary-color)`,lineWidth:1.5}]},[e,n]),a=(0,g.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,ce.jsx)(p,{series:i,curve:`linear`,yAxis:{zero:!0,format:a},height:300,ariaLabel:e(`cumulativeAria`)})}var g,ce,le,ue,de,fe;function pe(){return(pe=e((()=>{g=t(),i(),m(),ce=n(),le=[182,164,210,225,198,241,233,219,262,280],ue=2700,de=le.map((e,t)=>le.slice(0,t+1).reduce((e,t)=>e+t,0)),fe=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function me(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function he(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,[i,a]=(0,_.useState)(`database`),{capacity:o}=C[i],s=(0,_.useMemo)(()=>{let e=_e(i),{slope:t,today:n}=ve(e),r=t>0?(o-n)/t:1/0,a=Math.min(b,Math.ceil(r));return{used:e,forecast:Array.from({length:a+1},(e,r)=>{let i=Math.min(o,n+t*r);return[S+r*y,Math.round(i*10)/10]}),daysLeft:r}},[i,o]),u=(0,_.useMemo)(()=>[{name:e(`diskUsed`),data:s.used.map((e,t)=>[x+t*y,e])},{name:e(`diskForecast`),type:`line`,lineWidth:1.5,color:`var(--text-secondary-color)`,data:s.forecast}],[e,s]),d=(0,_.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:0});return{gb:n=>e(`gb`,{value:t.format(n)}),days:new Intl.NumberFormat(n,{style:`unit`,unit:`day`,unitDisplay:`long`}),date:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),long:new Intl.DateTimeFormat(n,{dateStyle:`long`})}},[e,n]),ee=(0,_.useMemo)(()=>[{type:`rect`,x0:S,color:`var(--text-secondary-color)`,opacity:.05},{type:`line`,axis:`y`,value:o,color:`var(--danger-color)`,dash:[4,4],label:e(`capacity`,{value:d.gb(o)})}],[e,o,d]),f=s.daysLeft<=b,m=S+Math.ceil(s.daysLeft)*y;return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,v.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,v.jsx)(c,{size:`small`,style:{width:200},"aria-label":e(`volume`),value:i,onChange:e=>a(e),children:Object.keys(C).map(t=>(0,v.jsx)(l,{value:t,children:e(`volumes.${t}`)},t))}),(0,v.jsx)(`output`,{"aria-live":`polite`,style:{color:f?`var(--danger-color)`:void 0},children:f?e(`fullIn`,{days:d.days.format(Math.ceil(s.daysLeft)),date:d.long.format(m)}):e(`notFull`,{days:d.days.format(b)})})]}),(0,v.jsx)(p,{series:u,curve:`linear`,annotations:ee,xAxis:{type:`time`,format:e=>d.date.format(e)},yAxis:{zero:!0,max:o*1.1,format:d.gb},height:300,ariaLabel:e(`diskAria`)})]})}var _,v,y,ge,b,x,S,C,_e,ve;function ye(){return(ye=e((()=>{_=t(),i(),s(),m(),v=n(),y=864e5,ge=60,b=120,x=new Date(2026,8,1).getTime(),S=x+59*y,C={database:{capacity:500,start:310,growth:2.1,seed:1},logs:{capacity:200,start:120,growth:.6,seed:2},uploads:{capacity:1e3,start:420,growth:1.2,seed:3}},_e=e=>{let{start:t,growth:n,seed:r}=C[e],i=me(r);return Array.from({length:ge},(r,a)=>{let o=e===`logs`?(a%7-3)*4:0,s=t+n*a+o+(i()-.5)*6;return Math.round(s*10)/10})},ve=e=>{let t=e.slice(-30),n=t.length,r=(n-1)/2,i=t.reduce((e,t)=>e+t,0)/n,a=0,o=0;t.forEach((e,t)=>{a+=(t-r)*(e-i),o+=(t-r)**2});let s=a/o;return{slope:s,today:i+s*(n-1-r)}}})))()}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,w.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{hour:`numeric`}),r=e=>t.format(new Date(2026,3,20,e)),i={nuclear:e(`energy.nuclear`),hydro:e(`energy.hydro`),wind:e(`energy.wind`),solar:e(`energy.solar`),gas:e(`energy.gas`)};return Object.keys(E).map(e=>({name:i[e],color:Se[e],data:T.map(t=>[r(t),E[e][t]])}))},[e,n]),a=(0,w.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`gw`,{value:t.format(n)})},[e,n]);return(0,xe.jsx)(p,{series:i,stacked:!0,yAxis:{format:a,title:e(`power`)},height:320,ariaLabel:e(`energyAria`)})}var w,xe,T,E,Se;function Ce(){return(Ce=e((()=>{w=t(),i(),m(),xe=n(),T=Array.from({length:24},(e,t)=>t),E={nuclear:T.map(()=>38),hydro:T.map(e=>6+3*Math.exp(-((e-19)**2)/6)),wind:T.map(e=>9+4*Math.sin((e+3)/4)),solar:T.map(e=>Math.max(0,22*Math.sin((e-6)/14*Math.PI))),gas:T.map(e=>4+6*Math.exp(-((e-20)**2)/5))},Se={nuclear:`#8b5cf6`,hydro:`#0ea5e9`,wind:`#14b8a6`,solar:`#f59e0b`,gas:`#94a3b8`}})))()}function we(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,[i,a]=(0,D.useState)(null),o=(0,D.useMemo)(()=>A.map(({key:t,color:n},r)=>({name:e(`departments.${t}`),color:n,data:(j[r]??[]).map((e,t)=>[k(t),e])})),[e]),s=(0,D.useMemo)(()=>({number:new Intl.NumberFormat(n),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),month:new Intl.DateTimeFormat(n,{year:`numeric`,month:`long`}),tick:new Intl.DateTimeFormat(n,{year:`2-digit`,month:`short`})}),[n]),c=i?.x??k(23),l=i?i.items.map(e=>({name:e.seriesName,color:e.color,value:e.y})):o.map((e,t)=>({name:e.name??``,color:e.color??``,value:j[t]?.[23]??0}));l.sort((e,t)=>t.value-e.value);let u=l.reduce((e,t)=>e+t.value,0);return(0,O.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,width:`100%`},children:[(0,O.jsx)(`div`,{style:{flex:`1 1 420px`,minWidth:0},children:(0,O.jsx)(p,{series:o,stacked:!0,curve:`step`,tooltip:!1,crosshair:!0,onHover:a,xAxis:{type:`time`,format:e=>s.tick.format(e)},legend:!1,height:300,ariaLabel:e(`headcountAria`)})}),(0,O.jsxs)(`section`,{"aria-label":e(`headcountPanel`),style:{display:`grid`,alignContent:`start`,gap:8,flex:`0 1 240px`},children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{style:{fontSize:13,color:`var(--text-secondary-color)`},children:s.month.format(c)}),(0,O.jsx)(`strong`,{style:{fontSize:22},children:e(`employees`,{value:s.number.format(u)})})]}),l.map(e=>(0,O.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr auto auto`,alignItems:`center`,gap:8,fontSize:13},children:[(0,O.jsx)(`span`,{"aria-hidden":!0,style:{width:10,height:10,borderRadius:2,background:e.color}}),(0,O.jsx)(`span`,{children:e.name}),(0,O.jsx)(`strong`,{children:s.number.format(e.value)}),(0,O.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:s.percent.format(e.value/u)})]},e.name))]})]})}var D,O,Te,k,A,j;function Ee(){return(Ee=e((()=>{D=t(),i(),m(),O=n(),Te=24,k=e=>new Date(2025,e,1).getTime(),A=[{key:`engineering`,color:`var(--chart-series-1, #4f46e5)`,start:48,hires:2.6},{key:`sales`,color:`var(--chart-series-2, #10b981)`,start:22,hires:1.4},{key:`support`,color:`var(--chart-series-3, #f59e0b)`,start:14,hires:.9},{key:`operations`,color:`var(--chart-series-4, #ef4444)`,start:9,hires:.5},{key:`admin`,color:`var(--chart-series-5, #0ea5e9)`,start:7,hires:.25}],j=A.map(({start:e,hires:t},n)=>Array.from({length:Te},(r,i)=>Math.round(e+t*i-(i>5&&i<9?(i-5)*t:0)+n)))})))()}function De(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>[{name:e(`download`),data:Ae},{name:e(`upload`),data:je}],[e]),a=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`megabit-per-second`});return t=>e.format(Math.abs(t))},[n]),o=(0,M.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`}),[n]);return(0,Oe.jsx)(p,{series:i,curve:`linear`,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:a},annotations:[{type:`line`,axis:`y`,value:0}],height:300,ariaLabel:e(`bandwidthAria`)})}var M,Oe,ke,N,P,Ae,je;function Me(){return(Me=e((()=>{M=t(),i(),m(),Oe=n(),ke=6e4,N=new Date(2026,9,30,9).getTime(),P=Array.from({length:120},(e,t)=>t),Ae=P.map(e=>[N+e*ke,Math.round(420+180*Math.sin(e/11)+90*Math.sin(e/2.3))]),je=P.map(e=>[N+e*ke,-Math.round(160+60*Math.sin(e/7+1)+40*Math.cos(e/1.7))])})))()}function Ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,Pe.useMemo)(()=>{let t={aurora:`Aurora`,borealis:`Borealis`,cobalt:`Cobalt`,others:e(`others`)},r=new Intl.NumberFormat(n,{notation:`compact`});return Object.keys(F).map(e=>({name:t[e],format:e=>r.format(e*1e6),data:Ie.map((t,n)=>[t,F[e][n]])}))},[e,n]);return(0,Fe.jsx)(p,{series:i,percent:!0,height:300,ariaLabel:e(`shareAria`)})}var Pe,Fe,Ie,F;function Le(){return(Le=e((()=>{Pe=t(),i(),m(),Fe=n(),Ie=Array.from({length:11},(e,t)=>String(2016+t)),F={aurora:[38,41,47,52,58,66,71,74,79,83,88],borealis:[52,50,49,47,44,43,41,40,38,37,35],cobalt:[12,16,21,27,31,34,36,41,44,49,54],others:[44,42,39,36,33,30,28,25,23,21,19]}})))()}function Re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,I.useMemo)(()=>{let t=Be(n),r={organic:e(`sources.organic`),direct:e(`sources.direct`),referral:e(`sources.referral`),social:e(`sources.social`)};return Object.keys(L).map(e=>({name:r[e],data:t.map((t,n)=>[t,L[e][n]])}))},[e,n]),a=(0,I.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]);return(0,ze.jsx)(p,{series:i,stacked:!0,yAxis:{format:e=>a.format(e)},height:300,ariaLabel:e(`visitsAria`)})}var I,ze,L,Be;function Ve(){return(Ve=e((()=>{I=t(),i(),m(),ze=n(),L={organic:[42e3,44500,47800,46900,51200,54e3,52300,55800,60100,63400,66200,70500],direct:[21e3,21800,22400,23900,24100,25600,26e3,25200,27300,28800,29500,31200],referral:[9800,10400,12900,11700,12300,14800,13900,14200,15600,17400,16900,18300],social:[6200,7900,7100,8800,11400,10200,9600,12700,13100,12400,15800,17900]},Be=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function He(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,R.useMemo)(()=>{let t=He(8),n=[],r=3;for(let e=0;e<96;e++){let i=e/4,a=3+9*Math.exp(-((i-14)**2)/18)+t()*2,o=Math.min(z,Math.max(2,Math.round(a)));o>r?r=o:o<r&&t()<.5&&--r,n.push([new Date(Ke+e*Ge),r])}return[{name:e(`instances`),data:n}]},[e]),a=(0,R.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`}),[n]);return(0,We.jsx)(p,{series:i,curve:`step`,xAxis:{type:`time`,format:e=>a.format(e)},yAxis:{zero:!0,max:16},annotations:[{type:`line`,axis:`y`,value:z,dash:[4,4],color:`var(--danger-color)`,label:e(`quota`)}],height:280,ariaLabel:e(`instancesAria`)})}var R,We,Ge,Ke,z;function qe(){return(qe=e((()=>{R=t(),i(),m(),We=n(),Ge=9e5,Ke=new Date(2026,5,15).getTime(),z=14})))()}function Je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,B.useMemo)(()=>[{name:e(`lastYear`),color:`var(--text-secondary-color)`,opacity:.15,lineWidth:1,data:K.map((e,t)=>[H(t),e])},{name:e(`thisYear`),opacity:.3,data:G.map((e,t)=>[H(t),e])}],[e]),a=(0,B.useMemo)(()=>[{type:`text`,x:H(26),y:G[26],text:e(`blackFriday`),anchor:`right`,color:`var(--text-color)`},{type:`text`,x:H(29),y:G[29],text:e(`cyberMonday`),anchor:`left`,color:`var(--text-color)`},{type:`line`,axis:`x`,value:H(U),dash:[4,4],color:`var(--danger-color)`,label:e(`lastShipping`)}],[e]),o=(0,B.useMemo)(()=>({number:new Intl.NumberFormat(n),compact:new Intl.NumberFormat(n,{notation:`compact`}),change:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`}),date:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`})}),[n]),s=q(G);return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,V.jsx)(p,{series:i,annotations:a,curve:`linear`,crosshair:!0,xAxis:{type:`time`,format:e=>o.date.format(e)},yAxis:{format:e=>o.compact.format(e)},height:320,ariaLabel:e(`seasonAria`)}),(0,V.jsx)(`p`,{style:{margin:0},children:e(`seasonSummary`,{total:o.number.format(s),change:o.change.format(s/q(K)-1)})})]})}var B,V,Xe,H,U,W,G,K,q;function Ze(){return(Ze=e((()=>{B=t(),i(),m(),V=n(),Xe=61,H=e=>new Date(2026,10,1+e).getTime(),U=47,W=(e,t,n)=>{let r=Je(e);return Array.from({length:Xe},(e,i)=>{let a=(e,t)=>t*Math.exp(-Math.abs(i-e)/1.2),o=1+i/90+a(n,2.4)+a(n+3,1.5),s=i>U?.45:1,c=.92+r()*.16;return Math.round(1800*t*o*s*c)})},G=W(26,1.14,26),K=W(25,1,27),q=e=>e.reduce((e,t)=>e+t,0)})))()}function Qe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function $e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.area-chart.data`}),n=t.language,i=(0,J.useRef)(null),[a,s]=(0,J.useState)($),c=(0,J.useMemo)(()=>[{name:e(`solarProduction`),color:`var(--warning-color)`,data:Q}],[e]),l=(0,J.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return{kwh:n=>e(`kwh`,{value:t.format(n)}),date:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`})}},[e,n]);return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:10,width:`100%`},children:[(0,Y.jsx)(p,{ref:i,series:c,curve:`linear`,onZoom:e=>s(tt(e.x[0],e.x[1])),xAxis:{type:`time`,format:e=>l.date.format(e)},yAxis:{format:l.kwh},legend:!1,height:280,ariaLabel:e(`solarAria`)}),(0,Y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,Y.jsx)(o,{size:`small`,variant:`outline`,disabled:a===$,onClick:()=>{i.current?.resetZoom(),s($)},children:e(`resetZoom`)}),(0,Y.jsx)(`output`,{"aria-live":`polite`,children:e(`visibleTotal`,{from:l.date.format(a.from),to:l.date.format(a.to),total:l.kwh(a.total),average:l.kwh(a.average)})})]}),(0,Y.jsx)(`p`,{style:{margin:0,fontSize:13,color:`var(--text-secondary-color)`},children:e(`zoomHint`)})]})}var J,Y,X,Z,et,Q,tt,$;function nt(){return(nt=e((()=>{J=t(),i(),a(),m(),Y=n(),X=864e5,Z=new Date(2026,0,1).getTime(),et=Qe(365),Q=Array.from({length:365},(e,t)=>{let n=.55+.45*Math.sin((t-80)/365*2*Math.PI),r=.35+.65*et()**.5;return[Z+t*X,Math.round(32*n*r*10)/10]}),tt=(e,t)=>{let n=Q.filter(([n])=>n>=e&&n<=t),r=n.reduce((e,[,t])=>e+t,0);return{total:r,average:n.length?r/n.length:0,from:e,to:t}},$=tt(Z,Z+364*X)})))()}var rt;function it(){return(it=e((()=>{rt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

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
const START = new Date(2026, 3, 1).getTime();

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(21);
    const data: [Date, number][] = [];
    let level = 18_000;
    for (let i = 0; i < 90; i++) {
      level *= 1.004 + (random() - 0.5) * 0.01;
      const seasonal = 1 + 0.04 * Math.sin(i / 9);
      const value = level * seasonal * (0.985 + random() * 0.03);
      data.push([new Date(START + i * DAY), Math.round(value)]);
    }
    return [{ name: t("dau"), data }];
  }, [t]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const date = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => compact.format(value) }}
      height={280}
      ariaLabel={t("dauAria")}
    />
  );
}
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly sales (thousand USD) of the first 10 months, and the yearly plan
const sales = [182, 164, 210, 225, 198, 241, 233, 219, 262, 280];
const PLAN = 2_700;
// running total of the months already closed
const runningTotal = sales.map((_, i) =>
  sales.slice(0, i + 1).reduce((sum, value) => sum + value, 0),
);

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function CumulativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    // the remaining months are unknown (null)
    const actual = months.map(
      (month, i) => [month, runningTotal[i] ?? null] as const,
    );
    // the plan grows evenly through the year
    const plan = months.map(
      (month, i) => [month, Math.round((PLAN * (i + 1)) / 12)] as const,
    );
    return [
      { name: t("actual"), data: actual },
      {
        name: t("plan"),
        type: "line",
        data: plan,
        color: "var(--text-secondary-color)",
        lineWidth: 1.5,
      },
    ];
  }, [t, locale]);
  // values are in thousands of dollars
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <AreaChart
      series={series}
      curve="linear"
      yAxis={{ zero: true, format: usd }}
      height={300}
      ariaLabel={t("cumulativeAria")}
    />
  );
}
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  AreaChart,
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
const HISTORY = 60;
const HORIZON = 120; // days of forecast at most
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 8, 1).getTime();
const TODAY = START + (HISTORY - 1) * DAY;

// Disk usage (GB) of three volumes over the last 60 days
const volumes = {
  database: { capacity: 500, start: 310, growth: 2.1, seed: 1 },
  logs: { capacity: 200, start: 120, growth: 0.6, seed: 2 },
  uploads: { capacity: 1000, start: 420, growth: 1.2, seed: 3 },
} as const;
type Volume = keyof typeof volumes;

const usage = (key: Volume) => {
  const { start, growth, seed } = volumes[key];
  const random = mulberry32(seed);
  return Array.from({ length: HISTORY }, (_, i) => {
    // logs are rotated every week: a sawtooth on top of the trend
    const rotation = key === "logs" ? ((i % 7) - 3) * 4 : 0;
    const value = start + growth * i + rotation + (random() - 0.5) * 6;
    return Math.round(value * 10) / 10;
  });
};

/** Least-squares line through the last 30 days */
const trend = (values: number[]) => {
  const recent = values.slice(-30);
  const n = recent.length;
  const mx = (n - 1) / 2;
  const my = recent.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  recent.forEach((y, i) => {
    num += (i - mx) * (y - my);
    den += (i - mx) ** 2;
  });
  const slope = num / den;
  // value of the line today (the last day)
  return { slope, today: my + slope * (n - 1 - mx) };
};

export default function DiskForecastDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  const [volume, setVolume] = useState<Volume>("database");
  const { capacity } = volumes[volume];

  const model = useMemo(() => {
    const used = usage(volume);
    const { slope, today } = trend(used);
    const daysLeft = slope > 0 ? (capacity - today) / slope : Infinity;
    const days = Math.min(HORIZON, Math.ceil(daysLeft));
    const forecast = Array.from({ length: days + 1 }, (_, k) => {
      const value = Math.min(capacity, today + slope * k);
      return [TODAY + k * DAY, Math.round(value * 10) / 10] as const;
    });
    return { used, forecast, daysLeft };
  }, [volume, capacity]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("diskUsed"),
        data: model.used.map((value, i) => [START + i * DAY, value] as const),
      },
      {
        name: t("diskForecast"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        data: model.forecast,
      },
    ],
    [t, model],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    return {
      gb: (value: number) => t("gb", { value: number.format(value) }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
      long: new Intl.DateTimeFormat(locale, { dateStyle: "long" }),
    };
  }, [t, locale]);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: TODAY,
        color: "var(--text-secondary-color)",
        opacity: 0.05,
      },
      {
        type: "line",
        axis: "y",
        value: capacity,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("capacity", { value: formats.gb(capacity) }),
      },
    ],
    [t, capacity, formats],
  );

  const full = model.daysLeft <= HORIZON;
  const fullDate = TODAY + Math.ceil(model.daysLeft) * DAY;

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
          aria-label={t("volume")}
          value={volume}
          onChange={(value) => setVolume(value as Volume)}
        >
          {(Object.keys(volumes) as Volume[]).map((key) => (
            <SelectItem key={key} value={key}>
              {t(\`volumes.\${key}\`)}
            </SelectItem>
          ))}
        </Select>
        <output
          aria-live="polite"
          style={{ color: full ? "var(--danger-color)" : undefined }}
        >
          {full
            ? t("fullIn", {
                days: formats.days.format(Math.ceil(model.daysLeft)),
                date: formats.long.format(fullDate),
              })
            : t("notFull", { days: formats.days.format(HORIZON) })}
        </output>
      </div>
      <AreaChart
        series={series}
        curve="linear"
        annotations={annotations}
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ zero: true, max: capacity * 1.1, format: formats.gb }}
        height={300}
        ariaLabel={t("diskAria")}
      />
    </div>
  );
}
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const hours = Array.from({ length: 24 }, (_, hour) => hour);

// Electricity generation of a grid over one spring day, in gigawatts
const generation = {
  nuclear: hours.map(() => 38),
  hydro: hours.map((h) => 6 + 3 * Math.exp(-((h - 19) ** 2) / 6)),
  wind: hours.map((h) => 9 + 4 * Math.sin((h + 3) / 4)),
  solar: hours.map((h) => Math.max(0, 22 * Math.sin(((h - 6) / 14) * Math.PI))),
  gas: hours.map((h) => 4 + 6 * Math.exp(-((h - 20) ** 2) / 5)),
};
const colors = {
  nuclear: "#8b5cf6",
  hydro: "#0ea5e9",
  wind: "#14b8a6",
  solar: "#f59e0b",
  gas: "#94a3b8",
};

export default function EnergyMixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 3, 20, hour));
    const names = {
      nuclear: t("energy.nuclear"),
      hydro: t("energy.hydro"),
      wind: t("energy.wind"),
      solar: t("energy.solar"),
      gas: t("energy.gas"),
    };
    return (Object.keys(generation) as (keyof typeof generation)[]).map(
      (key) => ({
        name: names[key],
        color: colors[key],
        data: hours.map((h) => [label(h), generation[key][h]] as const),
      }),
    );
  }, [t, locale]);
  const gigawatts = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("gw", { value: number.format(value) });
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: gigawatts, title: t("power") }}
      height={320}
      ariaLabel={t("energyAria")}
    />
  );
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

const MONTHS = 24;
const month = (i: number) => new Date(2025, i, 1).getTime();

// Headcount per department at the start of every month of a growing company
const departments = [
  {
    key: "engineering",
    color: "var(--chart-series-1, #4f46e5)",
    start: 48,
    hires: 2.6,
  },
  {
    key: "sales",
    color: "var(--chart-series-2, #10b981)",
    start: 22,
    hires: 1.4,
  },
  {
    key: "support",
    color: "var(--chart-series-3, #f59e0b)",
    start: 14,
    hires: 0.9,
  },
  {
    key: "operations",
    color: "var(--chart-series-4, #ef4444)",
    start: 9,
    hires: 0.5,
  },
  {
    key: "admin",
    color: "var(--chart-series-5, #0ea5e9)",
    start: 7,
    hires: 0.25,
  },
] as const;
const headcount = departments.map(({ start, hires }, d) =>
  Array.from({ length: MONTHS }, (_, i) =>
    // hiring slows down during a freeze in the summer of 2025
    Math.round(start + hires * i - (i > 5 && i < 9 ? (i - 5) * hires : 0) + d),
  ),
);

interface Row {
  name: string;
  color: string;
  value: number;
}

export default function HoverPanelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  // the hovered month, \`null\` shows the latest one
  const [hovered, setHovered] = useState<ChartHoverEvent | null>(null);

  const series = useMemo(
    (): ChartSeries[] =>
      departments.map(({ key, color }, d) => ({
        name: t(\`departments.\${key}\`),
        color,
        data: (headcount[d] ?? []).map(
          (value, i) => [month(i), value] as const,
        ),
      })),
    [t],
  );
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
      month: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
      }),
      tick: new Intl.DateTimeFormat(locale, {
        year: "2-digit",
        month: "short",
      }),
    }),
    [locale],
  );

  // the panel lists every department of the month, largest first
  const last = MONTHS - 1;
  const time = hovered?.x ?? month(last);
  const rows: Row[] = hovered
    ? hovered.items.map((item) => ({
        name: item.seriesName,
        color: item.color,
        value: item.y,
      }))
    : series.map((s, d) => ({
        name: s.name ?? "",
        color: s.color ?? "",
        value: headcount[d]?.[last] ?? 0,
      }));
  rows.sort((a, b) => b.value - a.value);
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        width: "100%",
      }}
    >
      <div style={{ flex: "1 1 420px", minWidth: 0 }}>
        <AreaChart
          series={series}
          stacked
          curve="step"
          tooltip={false}
          crosshair
          onHover={setHovered}
          xAxis={{ type: "time", format: (x) => formats.tick.format(x) }}
          legend={false}
          height={300}
          ariaLabel={t("headcountAria")}
        />
      </div>
      <section
        aria-label={t("headcountPanel")}
        style={{
          display: "grid",
          alignContent: "start",
          gap: 8,
          flex: "0 1 240px",
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
            {formats.month.format(time)}
          </div>
          <strong style={{ fontSize: 22 }}>
            {t("employees", { value: formats.number.format(total) })}
          </strong>
        </div>
        {rows.map((row) => (
          <div
            key={row.name}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: row.color,
              }}
            />
            <span>{row.name}</span>
            <strong>{formats.number.format(row.value)}</strong>
            <span style={{ color: "var(--text-secondary-color)" }}>
              {formats.percent.format(row.value / total)}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const MINUTE = 60 * 1000;
const START = new Date(2026, 9, 30, 9).getTime();

// Bandwidth of a server every minute for two hours (Mbit/s)
const minutes = Array.from({ length: 120 }, (_, i) => i);
const download = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      Math.round(420 + 180 * Math.sin(i / 11) + 90 * Math.sin(i / 2.3)),
    ] as const,
);
// upload is drawn below zero: same scale, mirrored
const upload = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      -Math.round(160 + 60 * Math.sin(i / 7 + 1) + 40 * Math.cos(i / 1.7)),
    ] as const,
);

export default function MirroredDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("download"), data: download },
      { name: t("upload"), data: upload },
    ],
    [t],
  );
  // "420 Mb/s", "420 Mbit/s"...: the sign only says the direction
  const bandwidth = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabit-per-second",
    });
    return (value: number) => format.format(Math.abs(value));
  }, [locale]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="linear"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ format: bandwidth }}
      annotations={[{ type: "line", axis: "y", value: 0 }]}
      height={300}
      ariaLabel={t("bandwidthAria")}
    />
  );
}
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const years = Array.from({ length: 11 }, (_, i) => String(2016 + i));

// Units shipped (millions) by vendor; \`percent\` turns them into shares
const vendors = {
  aurora: [38, 41, 47, 52, 58, 66, 71, 74, 79, 83, 88],
  borealis: [52, 50, 49, 47, 44, 43, 41, 40, 38, 37, 35],
  cobalt: [12, 16, 21, 27, 31, 34, 36, 41, 44, 49, 54],
  others: [44, 42, 39, 36, 33, 30, 28, 25, 23, 21, 19],
};

export default function PercentDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = {
      aurora: "Aurora",
      borealis: "Borealis",
      cobalt: "Cobalt",
      others: t("others"),
    };
    // "88 million units" in the tooltip
    const units = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(vendors) as (keyof typeof vendors)[]).map((key) => ({
      name: names[key],
      format: (value: number) => units.format(value * 1_000_000),
      data: years.map((year, i) => [year, vendors[key][i]] as const),
    }));
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      percent
      height={300}
      ariaLabel={t("shareAria")}
    />
  );
}
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly visits by traffic source, January to December
const sources = {
  organic: [
    42_000, 44_500, 47_800, 46_900, 51_200, 54_000, 52_300, 55_800, 60_100,
    63_400, 66_200, 70_500,
  ],
  direct: [
    21_000, 21_800, 22_400, 23_900, 24_100, 25_600, 26_000, 25_200, 27_300,
    28_800, 29_500, 31_200,
  ],
  referral: [
    9_800, 10_400, 12_900, 11_700, 12_300, 14_800, 13_900, 14_200, 15_600,
    17_400, 16_900, 18_300,
  ],
  social: [
    6_200, 7_900, 7_100, 8_800, 11_400, 10_200, 9_600, 12_700, 13_100, 12_400,
    15_800, 17_900,
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
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    const names = {
      organic: t("sources.organic"),
      direct: t("sources.direct"),
      referral: t("sources.referral"),
      social: t("sources.social"),
    };
    return (Object.keys(sources) as (keyof typeof sources)[]).map((key) => ({
      name: names[key],
      data: months.map((month, i) => [month, sources[key][i]] as const),
    }));
  }, [t, locale]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: (value) => compact.format(value) }}
      height={300}
      ariaLabel={t("visitsAria")}
    />
  );
}
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const QUARTER_HOUR = 15 * 60 * 1000;
// local midnight, so the time axis reads 00:00 → 24:00 in every time zone
const START = new Date(2026, 5, 15).getTime();
const QUOTA = 14;

export default function StepDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  // Instances started by an autoscaler: the count holds until the next change
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(8);
    const data: [Date, number][] = [];
    let instances = 3;
    for (let i = 0; i < 96; i++) {
      const hour = i / 4;
      const load = 3 + 9 * Math.exp(-((hour - 14) ** 2) / 18) + random() * 2;
      const target = Math.min(QUOTA, Math.max(2, Math.round(load)));
      // scale out quickly, scale in one instance at a time
      if (target > instances) instances = target;
      else if (target < instances && random() < 0.5) instances -= 1;
      data.push([new Date(START + i * QUARTER_HOUR), instances]);
    }
    return [{ name: t("instances"), data }];
  }, [t]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="step"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ zero: true, max: QUOTA + 2 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: QUOTA,
          dash: [4, 4],
          color: "var(--danger-color)",
          label: t("quota"),
        },
      ]}
      height={280}
      ariaLabel={t("instancesAria")}
    />
  );
}
`})))()}var xt;function St(){return(St=e((()=>{xt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
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

const DAYS = 61; // November and December
const day = (i: number) => new Date(2026, 10, 1 + i).getTime();
const LAST_SHIPPING = 47; // December 18

/**
 * Daily orders of an online shop during the holiday season: Black Friday
 * and Cyber Monday spikes, then a drop after the last shipping day
 */
const season = (seed: number, scale: number, blackFriday: number) => {
  const random = mulberry32(seed);
  return Array.from({ length: DAYS }, (_, i) => {
    const spike = (at: number, height: number) =>
      height * Math.exp(-Math.abs(i - at) / 1.2);
    const lift =
      1 + i / 90 + spike(blackFriday, 2.4) + spike(blackFriday + 3, 1.5);
    const after = i > LAST_SHIPPING ? 0.45 : 1;
    const noise = 0.92 + random() * 0.16;
    return Math.round(1800 * scale * lift * after * noise);
  });
};
// both years on the same calendar days: Black Friday moves by one day
const thisYear = season(26, 1.14, 26);
const lastYear = season(25, 1, 27);
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

export default function YearOverYearDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("lastYear"),
        color: "var(--text-secondary-color)",
        opacity: 0.15,
        lineWidth: 1,
        data: lastYear.map((value, i) => [day(i), value] as const),
      },
      {
        name: t("thisYear"),
        opacity: 0.3,
        data: thisYear.map((value, i) => [day(i), value] as const),
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "text",
        x: day(26),
        y: thisYear[26],
        text: t("blackFriday"),
        anchor: "right",
        color: "var(--text-color)",
      },
      {
        type: "text",
        x: day(29),
        y: thisYear[29],
        text: t("cyberMonday"),
        anchor: "left",
        color: "var(--text-color)",
      },
      {
        type: "line",
        axis: "x",
        value: day(LAST_SHIPPING),
        dash: [4, 4],
        color: "var(--danger-color)",
        label: t("lastShipping"),
      },
    ],
    [t],
  );
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      compact: new Intl.NumberFormat(locale, { notation: "compact" }),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );
  const total = sum(thisYear);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <AreaChart
        series={series}
        annotations={annotations}
        curve="linear"
        crosshair
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: (y) => formats.compact.format(y) }}
        height={320}
        ariaLabel={t("seasonAria")}
      />
      <p style={{ margin: 0 }}>
        {t("seasonSummary", {
          total: formats.number.format(total),
          change: formats.change.format(total / sum(lastYear) - 1),
        })}
      </p>
    </div>
  );
}
`})))()}var Ct;function wt(){return(wt=e((()=>{Ct=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  AreaChart,
  type ChartHandle,
  type ChartSeries,
  type ChartView,
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
const START = new Date(2026, 0, 1).getTime();

// Daily energy of a rooftop solar installation (kWh): long summer days,
// short winter days and cloudy spells
const random = mulberry32(365);
const production = Array.from({ length: 365 }, (_, day) => {
  const season = 0.55 + 0.45 * Math.sin(((day - 80) / 365) * 2 * Math.PI);
  const clouds = 0.35 + 0.65 * random() ** 0.5;
  return [
    START + day * DAY,
    Math.round(32 * season * clouds * 10) / 10,
  ] as const;
});

/** Total and daily average of the days inside [from, to] */
const stats = (from: number, to: number) => {
  const days = production.filter(([time]) => time >= from && time <= to);
  const total = days.reduce((sum, [, kwh]) => sum + kwh, 0);
  return { total, average: days.length ? total / days.length : 0, from, to };
};
const ALL = stats(START, START + 364 * DAY);

export default function ZoomTotalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [visible, setVisible] = useState(ALL);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("solarProduction"),
        color: "var(--warning-color)",
        data: production,
      },
    ],
    [t],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      kwh: (value: number) => t("kwh", { value: number.format(value) }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    };
  }, [t, locale]);

  // onZoom reports the visible x range after every zoom and pan
  const onZoom = (view: ChartView) => setVisible(stats(view.x[0], view.x[1]));
  const reset = () => {
    chart.current?.resetZoom();
    setVisible(ALL);
  };

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <AreaChart
        ref={chart}
        series={series}
        curve="linear"
        onZoom={onZoom}
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: formats.kwh }}
        legend={false}
        height={280}
        ariaLabel={t("solarAria")}
      />
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
          disabled={visible === ALL}
          onClick={reset}
        >
          {t("resetZoom")}
        </Button>
        <output aria-live="polite">
          {t("visibleTotal", {
            from: formats.date.format(visible.from),
            to: formats.date.format(visible.to),
            total: formats.kwh(visible.total),
            average: formats.kwh(visible.average),
          })}
        </output>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        {t("zoomHint")}
      </p>
    </div>
  );
}
`})))()}var Tt,Et,Dt;function Ot(){return(Ot=e((()=>{oe(),pe(),ye(),Ce(),Ee(),Me(),Le(),Ve(),qe(),Ze(),nt(),it(),ot(),ct(),ut(),ft(),mt(),gt(),vt(),bt(),St(),wt(),t(),d(),f(),Tt=n(),Et=u(Object.assign({"./demos/basic.tsx":ne,"./demos/cumulative.tsx":se,"./demos/disk-forecast.tsx":he,"./demos/energy-mix.tsx":be,"./demos/hover-panel.tsx":we,"./demos/mirrored.tsx":De,"./demos/percent.tsx":Ne,"./demos/stacked.tsx":Re,"./demos/step.tsx":Ue,"./demos/year-over-year.tsx":Ye,"./demos/zoom-total.tsx":$e}),Object.assign({"./demos/basic.tsx":rt,"./demos/cumulative.tsx":at,"./demos/disk-forecast.tsx":st,"./demos/energy-mix.tsx":lt,"./demos/hover-panel.tsx":dt,"./demos/mirrored.tsx":pt,"./demos/percent.tsx":ht,"./demos/stacked.tsx":_t,"./demos/step.tsx":yt,"./demos/year-over-year.tsx":xt,"./demos/zoom-total.tsx":Ct})),Dt=()=>(0,Tt.jsx)(ee,{id:`area-chart`,demos:Et})})))()}Ot();export{Dt as default};