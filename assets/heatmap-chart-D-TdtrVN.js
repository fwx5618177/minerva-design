import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{l as d,n as f,t as p,u as m}from"./DocPage-BdPOW9nQ.js";import{h,m as g}from"./charts-JJDQ3gS7.js";function ee(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>ae(n),[n]),a=(0,_.useMemo)(()=>b.map(({week:e,day:t,count:n})=>({x:e,y:i[t],value:n})),[i]),o=(0,_.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,year:`2-digit`,timeZone:`UTC`}),[n]),s=b.reduce((e,{count:t})=>e+t,0);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,v.jsx)(h,{data:a,yCategories:[...i].reverse(),palette:[`var(--success-color)`],valueRange:[0,12],name:e(`contributions`),xAxis:{format:e=>o.format(ie+Math.round(e)*7*ne),tickCount:12},radius:2,height:200,ariaLabel:e(`activityAria`)}),(0,v.jsx)(`p`,{children:e(`activityTotal`,{total:new Intl.NumberFormat(n).format(s)})})]})}var _,v,ne,re,ie,y,b,ae;function oe(){return(oe=e((()=>{_=t(),i(),g(),v=n(),ne=864e5,re=52,ie=Date.UTC(2025,10,3),y=ee(52),b=[];for(let e=0;e<re;e++){let t=e>=7&&e<=8,n=e%13>8;for(let r=0;r<7;r++){let i=(r>=5?.15:.7)*(t?.1:1)*(n?1.8:1),a=y()<i?Math.round(y()*12*i):0;b.push({week:e,day:r,count:a})}}ae=e=>{let t=new Intl.DateTimeFormat(e,{weekday:`short`});return Array.from({length:7},(e,n)=>t.format(new Date(2026,0,5+n)))}})))()}function se(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,x.useMemo)(()=>ue(n),[n]),a=(0,x.useMemo)(()=>de(n),[n]),o=(0,x.useMemo)(()=>{let e=se(24);return i.flatMap((t,n)=>{let r=n>=5;return a.map((n,i)=>{let a=r?.55*S(i,13,4)+.3*S(i,21,2):S(i,10.5,1.8)+.9*S(i,15,2)-.25*S(i,12.5,.8)+.35*S(i,21,1.5),o=Math.max(0,a)*1200+40+e()*90;return{x:n,y:t,value:Math.round(o)}})})},[i,a]),s=(0,x.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,le.jsx)(h,{data:o,xCategories:a,yCategories:[...i].reverse(),name:e(`sessions`),format:e=>s.format(e),height:280,ariaLabel:e(`sessionsAria`)})}var x,le,ue,de,S;function fe(){return(fe=e((()=>{x=t(),i(),g(),le=n(),ue=e=>{let t=new Intl.DateTimeFormat(e,{weekday:`short`});return Array.from({length:7},(e,n)=>t.format(new Date(2026,0,5+n)))},de=e=>{let t=new Intl.DateTimeFormat(e,{hour:`numeric`});return Array.from({length:24},(e,n)=>t.format(new Date(2026,0,5,n)))},S=(e,t,n)=>Math.exp(-((e-t)**2)/(2*n**2))})))()}function pe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,C.useMemo)(()=>ge(n),[n]),a=(0,C.useMemo)(()=>{let e=pe(1995);return w.flatMap((t,n)=>i.map(r=>{let i=-.75+n*.07+(e()+e()-1)*.7+(_e[t]??0);return{x:t,y:r,value:Math.round(i*100)/100}}))},[i]),o=(0,C.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,minimumFractionDigits:2,maximumFractionDigits:2,signDisplay:`exceptZero`}),[n]);return(0,he.jsx)(h,{data:a,xCategories:w,yCategories:[...i].reverse(),colorScale:ve,valueRange:[-2,2],name:e(`anomaly`),format:e=>o.format(e),radius:1,height:340,ariaLabel:e(`anomalyAria`)})}var C,he,ge,w,_e,ve;function ye(){return(ye=e((()=>{C=t(),i(),g(),he=n(),ge=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))},w=Array.from({length:30},(e,t)=>String(1995+t)),_e={1998:.5,2016:.45,2024:.4},ve=[`#2166ac`,`#67a9cf`,`var(--background-color)`,`#ef8a62`,`#b2182b`]})))()}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,T.useMemo)(()=>D.map(t=>e(`classes.${t}`)),[e]),a=(0,T.useMemo)(()=>j.map(({actual:e,predicted:t,n})=>({x:i[t]??``,y:i[e]??``,value:n/(k[e]??1)})),[i]),o=(0,T.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),s=(0,T.useMemo)(()=>new Intl.NumberFormat(n),[n]),c=t=>{let n=t.items[0],r=n?j[n.index]:void 0;if(!r)return null;let{actual:a,predicted:c,n:l}=r,u=a===c;return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,E.jsx)(`strong`,{children:e(`actualPredicted`,{actual:i[a],predicted:i[c]})}),(0,E.jsx)(`span`,{children:e(`imagesShare`,{value:s.format(l),share:o.format(l/(k[a]??1))})}),u?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`span`,{style:{color:`var(--success-color)`},children:e(`recall`,{value:o.format(l/(k[a]??1))})}),(0,E.jsx)(`span`,{style:{color:`var(--success-color)`},children:e(`precision`,{value:o.format(l/(xe[c]??1))})})]}):(0,E.jsx)(`span`,{style:{color:`var(--danger-color)`},children:e(`misclassified`)})]})};return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,E.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`accuracy`,{value:o.format(Se/A),images:s.format(A)})}),(0,E.jsx)(h,{data:a,xCategories:i,yCategories:[...i].reverse(),valueRange:[0,1],name:e(`shareOfClass`),format:e=>o.format(e),xAxis:{title:e(`predicted`)},yAxis:{title:e(`actual`)},renderTooltip:c,height:360,ariaLabel:e(`confusionAria`)})]})}var T,E,D,O,k,xe,A,Se,j;function Ce(){return(Ce=e((()=>{T=t(),i(),g(),E=n(),D=[`cat`,`dog`,`bird`,`car`,`truck`],O=[[412,61,18,2,1],[48,431,9,4,3],[22,14,455,6,2],[1,2,3,447,52],[2,1,1,71,418]],k=O.map(e=>e.reduce((e,t)=>e+t,0)),xe=D.map((e,t)=>O.reduce((e,n)=>e+(n[t]??0),0)),A=k.reduce((e,t)=>e+t,0),Se=O.reduce((e,t,n)=>e+(t[n]??0),0),j=O.flatMap((e,t)=>e.map((e,n)=>({actual:t,predicted:n,n:e})))})))()}function we(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,[i,a]=(0,M.useState)(null),o=(0,M.useMemo)(()=>R.map(t=>({x:e(`devices.${t.device}`),y:e(`sources.${t.source}`),value:t.orders/t.sessions})),[e]),s=(0,M.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,maximumFractionDigits:1}),[n]),c=(0,M.useMemo)(()=>new Intl.NumberFormat(n),[n]),l=e=>{let t=e.items[0];t&&a(t.index)},u=i===null?void 0:R[i],d=u?u.orders/u.sessions:0;return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,N.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:u?(0,N.jsxs)(N.Fragment,{children:[e(`cellStatus`,{source:e(`sources.${u.source}`),device:e(`devices.${u.device}`),orders:c.format(u.orders),sessions:c.format(u.sessions),rate:s.format(d)}),` `,(0,N.jsx)(`strong`,{style:{color:d>=z?`var(--success-color)`:`var(--danger-color)`},children:e(d>=z?`aboveAverage`:`belowAverage`,{value:s.format(z)})})]}):e(`clickCell`)}),(0,N.jsx)(h,{data:o,xCategories:F.map(t=>e(`devices.${t}`)),yCategories:[...P].reverse().map(t=>e(`sources.${t}`)),name:e(`conversionRate`),format:e=>s.format(e),radius:4,onPointClick:l,onPlotClick:()=>a(null),height:340,ariaLabel:e(`conversionAria`)})]})}var M,N,P,F,I,L,R,z;function Te(){return(Te=e((()=>{M=t(),i(),g(),N=n(),P=[`organic`,`paid`,`social`,`email`,`referral`,`direct`],F=[`desktop`,`mobile`,`tablet`],I=[[42e3,61e3,6100],[18500,33e3,2400],[7200,39e3,1900],[9800,12400,1300],[5600,4100,700],[21e3,15500,2800]],L=[[1390,1160,150],[520,560,41],[101,470,21],[560,430,52],[230,92,19],[880,420,84]],R=P.flatMap((e,t)=>F.map((n,r)=>({source:e,device:n,sessions:I[t]?.[r]??0,orders:L[t]?.[r]??0}))),z=L.flat().reduce((e,t)=>e+t,0)/I.flat().reduce((e,t)=>e+t,0)})))()}function Ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,i=(0,B.useMemo)(()=>Oe.map(t=>e(`metrics.${t}`)),[e]),a=(0,B.useMemo)(()=>ke.flatMap((e,t)=>e.map((e,n)=>({x:i[n],y:i[t],value:e}))),[i]),o=(0,B.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2,signDisplay:`exceptZero`}),[n]);return(0,De.jsx)(h,{data:a,xCategories:i,yCategories:[...i].reverse(),colorScale:`diverging`,colorMidpoint:0,valueRange:[-1,1],name:e(`correlation`),format:e=>o.format(e),height:360,ariaLabel:e(`correlationAria`)})}var B,De,Oe,ke;function Ae(){return(Ae=e((()=>{B=t(),i(),g(),De=n(),Oe=[`sessions`,`pageViews`,`signups`,`revenue`,`churn`,`tickets`],ke=[[1,.92,.71,.64,-.18,.35],[.92,1,.66,.58,-.12,.31],[.71,.66,1,.83,-.41,.22],[.64,.58,.83,1,-.57,.08],[-.18,-.12,-.41,-.57,1,.46],[.35,.31,.22,.08,.46,1]]})))()}function je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,[i,a]=(0,V.useState)(null),o=(0,V.useMemo)(()=>{let e=je(200),t=[];for(let n=0;n<Pe;n++)for(let r=0;r<Ne;r++){let i=-100;for(let e of Fe){let t=Math.hypot(r-e.x,n-e.y)+1,a=Ie.filter(t=>r<t!=e.x<t).length;i=Math.max(i,-32-22*Math.log10(t)-7*a)}t.push({x:r,y:n,value:i+(e()-.5)*2})}return t},[]),s=(0,V.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`meter`}),[n]),c=(0,V.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,H.jsx)(h,{data:o,colorScale:Le,valueRange:[-90,-30],name:e(`signal`),format:e=>`${c.format(Math.round(e))} dBm`,radius:0,xAxis:{format:e=>s.format(e)},yAxis:{format:e=>s.format(e)},interaction:{zoom:`xy`},onRendererChange:a,height:340,ariaLabel:e(`wifiAria`)}),(0,H.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{cells:c.format(2e4),renderer:i??`…`})})]})}var V,H,Ne,Pe,Fe,Ie,Le;function Re(){return(Re=e((()=>{V=t(),i(),g(),H=n(),Ne=200,Pe=100,Fe=[{x:30,y:70},{x:105,y:25},{x:170,y:65}],Ie=[70,140],Le=[`#0d0887`,`#7e03a8`,`#cc4778`,`#f89540`,`#f0f921`]})))()}function ze(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,[i,a]=(0,U.useState)(0),[s,c]=(0,U.useState)(!0);(0,U.useEffect)(()=>{if(!s)return;let e=setInterval(()=>a(e=>e+1),1500);return()=>clearInterval(e)},[s]);let l=(0,U.useMemo)(()=>Array.from({length:G},(t,n)=>e(`rackN`,{n:n+1})),[e]),u=(0,U.useMemo)(()=>Array.from({length:K},(t,n)=>e(`sensorN`,{n:n+1})),[e]),d=(0,U.useMemo)(()=>Ve(i),[i]),f=(0,U.useMemo)(()=>d.map((e,t)=>({x:l[Math.floor(t/K)]??``,y:u[t%K]??``,value:e})),[d,l,u]),p=(0,U.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),m=d.reduce((e,t,n)=>t>(d[e]??-1/0)?n:e,0),g=d.filter(e=>e>q).length;return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,W.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,W.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(e=>!e),children:e(s?`pause`:`resume`)}),(0,W.jsx)(`output`,{"aria-live":`polite`,style:{color:g?`var(--danger-color)`:`var(--text-secondary-color)`},children:e(`rackStatus`,{rack:l[Math.floor(m/K)],sensor:u[m%K],value:p(d[m]??0),alarms:new Intl.NumberFormat(n).format(g),limit:p(q)})})]}),(0,W.jsx)(h,{data:f,xCategories:l,yCategories:u,valueRange:[18,40],colorScale:[`var(--primary-color)`,`var(--success-color)`,`var(--warning-color)`,`var(--danger-color)`],name:e(`inletTemperature`),format:p,radius:2,height:340,ariaLabel:e(`racksAria`)})]})}var U,W,G,K,q,Ve;function He(){return(He=e((()=>{U=t(),i(),a(),g(),W=n(),G=10,K=8,q=32,Ve=e=>{let t=ze(e*7919+3),n=Math.floor(e/12)%G,r=Math.max(0,Math.sin(e%12/3.8))*12,i=[];for(let e=0;e<G;e++)for(let a=0;a<K;a++){let o=Math.abs(e-n),s=o<2?r*(1-o*.5):0;i.push(20+a*.9+s*(.5+a/K)+t()*1.5)}return i}})))()}function Ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,{cohorts:i,periods:a,data:o}=(0,J.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`,year:`numeric`}),r=Array.from({length:Y},(e,n)=>t.format(new Date(2026,n,1))),i=Array.from({length:Ge},(t,n)=>e(`monthN`,{n}));return{cohorts:r,periods:i,data:r.flatMap((e,t)=>i.map((n,r)=>({x:n,y:e,value:Ke(t,r)})))}},[e,n]),s=(0,J.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]);return(0,We.jsx)(h,{data:o,xCategories:a,yCategories:[...i].reverse(),valueRange:[0,1],name:e(`retained`),format:e=>s.format(e),height:340,ariaLabel:e(`retentionAria`)})}var J,We,Y,Ge,Ke;function qe(){return(qe=e((()=>{J=t(),i(),g(),We=n(),Y=9,Ge=9,Ke=(e,t)=>{if(t===0)return 1;if(e+t>=Y)return null;let n=.18+e*.015;return n+(1-n)*Math.exp(-t/1.6)*.62}})))()}function Je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.heatmap-chart.data`}),n=t.language,[i,a]=(0,X.useState)(`revenue`),o=(0,X.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,maximumFractionDigits:1}),t=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`}),r=new Intl.NumberFormat(n,{style:`percent`}),a=(e,t)=>{let n=Ye[e]?.[t]??0,r=Xe[e]?.[t]??0;return i===`growth`?r/n-1:i===`margin`?(Ze[e]?.[t]??0)/100:r},o=Q.flatMap((e,t)=>$.map((e,n)=>a(t,n)));return i===`growth`?{values:o,colorScale:`diverging`,valueRange:[-.3,.3],format:e=>t.format(e)}:i===`margin`?{values:o,colorScale:[`var(--danger-color)`,`var(--warning-color)`,`var(--success-color)`],valueRange:[.15,.4],format:e=>r.format(e)}:{values:o,colorScale:`sequential`,valueRange:void 0,format:t=>e.format(t*1e6)}},[i,n]),c=(0,X.useMemo)(()=>Q.map(t=>e(`regions.${t}`)),[e]),l=(0,X.useMemo)(()=>$.map(t=>e(`quarterN`,{n:t})),[e]),d=(0,X.useMemo)(()=>Q.flatMap((e,t)=>$.map((e,n)=>({x:l[n]??``,y:c[t]??``,value:o.values[t*$.length+n]??null}))),[o,c,l]),f=o.values.indexOf(Math.max(...o.values)),p=o.values.indexOf(Math.min(...o.values)),m=t=>e(`regionQuarter`,{region:c[Math.floor(t/$.length)],quarter:l[t%$.length]});return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsxs)(s,{"aria-label":e(`metric`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,Z.jsx)(u,{value:`revenue`,label:e(`salesMetrics.revenue`)}),(0,Z.jsx)(u,{value:`growth`,label:e(`salesMetrics.growth`)}),(0,Z.jsx)(u,{value:`margin`,label:e(`salesMetrics.margin`)})]}),(0,Z.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`bestWorst`,{best:m(f),bestValue:o.format(o.values[f]??0),worst:m(p),worstValue:o.format(o.values[p]??0)})}),(0,Z.jsx)(h,{data:d,xCategories:l,yCategories:[...c].reverse(),colorScale:o.colorScale,valueRange:o.valueRange,name:e(`salesMetrics.${i}`),format:o.format,radius:4,height:320,ariaLabel:e(`salesAria`)})]})}var X,Z,Q,$,Ye,Xe,Ze;function Qe(){return(Qe=e((()=>{X=t(),i(),c(),l(),g(),Z=n(),Q=[`north`,`south`,`east`,`west`,`central`],$=[1,2,3,4],Ye=[[4.1,4.4,4,5.2],[3.2,3.6,3.9,4.4],[5.6,5.1,4.8,6],[2.4,2.6,2.9,3.3],[6.8,7,6.6,7.9]],Xe=[[4.5,4.9,4.6,5.9],[3,3.3,3.5,4],[6.4,6,5.9,7.3],[3.1,3.5,3.9,4.6],[6.7,6.8,6.3,7.4]],Ze=[[31,33,30,35],[24,26,27,29],[38,36,35,40],[19,22,25,27],[34,33,31,36]]})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

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
const WEEKS = 52;
// first Monday of the year shown
const START = Date.UTC(2025, 10, 3);

// Contributions per day: weekdays busier, a quiet holiday period, a few streaks
const random = mulberry32(52);
const contributions: { week: number; day: number; count: number }[] = [];
for (let week = 0; week < WEEKS; week++) {
  const holiday = week >= 7 && week <= 8;
  const streak = week % 13 > 8;
  for (let day = 0; day < 7; day++) {
    const weekend = day >= 5;
    const busy =
      (weekend ? 0.15 : 0.7) * (holiday ? 0.1 : 1) * (streak ? 1.8 : 1);
    const count = random() < busy ? Math.round(random() * 12 * busy) : 0;
    contributions.push({ week, day, count });
  }
}

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function ActivityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => weekdays(locale), [locale]);

  // columns are weeks (numbers), rows are weekdays (categories)
  const data = useMemo(
    (): HeatmapCell[] =>
      contributions.map(({ week, day, count }) => ({
        x: week,
        y: days[day],
        value: count,
      })),
    [days],
  );
  // the x ticks show the month of the week
  const month = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
    [locale],
  );
  const total = contributions.reduce((sum, { count }) => sum + count, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        yCategories={[...days].reverse()}
        // a ramp of the success color, readable in light and dark themes
        palette={["var(--success-color)"]}
        valueRange={[0, 12]}
        name={t("contributions")}
        xAxis={{
          format: (week) => month.format(START + Math.round(week) * 7 * DAY),
          tickCount: 12,
        }}
        radius={2}
        height={200}
        ariaLabel={t("activityAria")}
      />
      <p>
        {t("activityTotal", {
          total: new Intl.NumberFormat(locale).format(total),
        })}
      </p>
    </div>
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

/** Hours of the day: "9 AM", "9時", "09 h"... */
const hoursOfDay = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { hour: "numeric" });
  return Array.from({ length: 24 }, (_, h) =>
    format.format(new Date(2026, 0, 5, h)),
  );
};

const bump = (hour: number, center: number, width: number) =>
  Math.exp(-((hour - center) ** 2) / (2 * width ** 2));

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => weekdays(locale), [locale]);
  const hours = useMemo(() => hoursOfDay(locale), [locale]);

  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(24);
    return days.flatMap((day, d) => {
      const weekend = d >= 5;
      return hours.map((hour, h) => {
        // office hours with a lunch dip on weekdays, late mornings at weekends
        const activity = weekend
          ? 0.55 * bump(h, 13, 4) + 0.3 * bump(h, 21, 2)
          : bump(h, 10.5, 1.8) +
            0.9 * bump(h, 15, 2) -
            0.25 * bump(h, 12.5, 0.8) +
            0.35 * bump(h, 21, 1.5);
        const value = Math.max(0, activity) * 1200 + 40 + random() * 90;
        return { x: hour, y: day, value: Math.round(value) };
      });
    });
  }, [days, hours]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <HeatmapChart
      data={data}
      xCategories={hours}
      // rows go from bottom to top: reverse them to read Monday first
      yCategories={[...days].reverse()}
      name={t("sessions")}
      format={(value) => number.format(value)}
      height={280}
      ariaLabel={t("sessionsAria")}
    />
  );
}
`})))()}var rt;function it(){return(it=e((()=>{rt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};
const years = Array.from({ length: 30 }, (_, i) => String(1995 + i));
// warm years of strong El Niño events
const elNino: Record<string, number> = {
  "1998": 0.5,
  "2016": 0.45,
  "2024": 0.4,
};

// Blue below the reference period, the page background at 0, red above
const diverging = [
  "#2166ac",
  "#67a9cf",
  "var(--background-color)",
  "#ef8a62",
  "#b2182b",
];

export default function ColorScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const months = useMemo(() => monthNames(locale), [locale]);

  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(1995);
    return years.flatMap((year, i) =>
      months.map((month) => {
        const trend = -0.75 + i * 0.07;
        const noise = (random() + random() - 1) * 0.7;
        const value = trend + noise + (elNino[year] ?? 0);
        return { x: year, y: month, value: Math.round(value * 100) / 100 };
      }),
    );
  }, [months]);
  // "+0.42 °C", "+0,42 °C"...
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={years}
      yCategories={[...months].reverse()}
      colorScale={diverging}
      // symmetric range: 0 stays in the middle of the scale
      valueRange={[-2, 2]}
      name={t("anomaly")}
      format={(value) => celsius.format(value)}
      radius={1}
      height={340}
      ariaLabel={t("anomalyAria")}
    />
  );
}
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartHoverEvent,
  type HeatmapCell,
} from "minerva-design/charts";

// Test set of an image classifier: rows are the actual classes, columns
// the predicted ones (cats and dogs, cars and trucks get confused)
const classes = ["cat", "dog", "bird", "car", "truck"];
const matrix = [
  [412, 61, 18, 2, 1],
  [48, 431, 9, 4, 3],
  [22, 14, 455, 6, 2],
  [1, 2, 3, 447, 52],
  [2, 1, 1, 71, 418],
];
const actualTotals = matrix.map((row) => row.reduce((a, b) => a + b, 0));
const predictedTotals = classes.map((_, j) =>
  matrix.reduce((sum, row) => sum + (row[j] ?? 0), 0),
);
const total = actualTotals.reduce((a, b) => a + b, 0);
const correct = matrix.reduce((sum, row, i) => sum + (row[i] ?? 0), 0);
// the cells in the order of \`data\`: row by row
const cells = matrix.flatMap((row, i) =>
  row.map((n, j) => ({ actual: i, predicted: j, n })),
);

export default function ConfusionMatrixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const names = useMemo(() => classes.map((key) => t(\`classes.\${key}\`)), [t]);
  // share of the actual class in each cell: rows add up to 100 %
  const data = useMemo(
    (): HeatmapCell[] =>
      cells.map(({ actual, predicted, n }) => ({
        x: names[predicted] ?? "",
        y: names[actual] ?? "",
        value: n / (actualTotals[actual] ?? 1),
      })),
    [names],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    const cell = item ? cells[item.index] : undefined;
    if (!cell) return null;
    const { actual, predicted, n } = cell;
    const hit = actual === predicted;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>
          {t("actualPredicted", {
            actual: names[actual],
            predicted: names[predicted],
          })}
        </strong>
        <span>
          {t("imagesShare", {
            value: number.format(n),
            share: percent.format(n / (actualTotals[actual] ?? 1)),
          })}
        </span>
        {hit ? (
          <>
            <span style={{ color: "var(--success-color)" }}>
              {t("recall", {
                value: percent.format(n / (actualTotals[actual] ?? 1)),
              })}
            </span>
            <span style={{ color: "var(--success-color)" }}>
              {t("precision", {
                value: percent.format(n / (predictedTotals[predicted] ?? 1)),
              })}
            </span>
          </>
        ) : (
          <span style={{ color: "var(--danger-color)" }}>
            {t("misclassified")}
          </span>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("accuracy", {
          value: percent.format(correct / total),
          images: number.format(total),
        })}
      </output>
      <HeatmapChart
        data={data}
        xCategories={names}
        // first class at the top, like a table
        yCategories={[...names].reverse()}
        valueRange={[0, 1]}
        name={t("shareOfClass")}
        format={(value) => percent.format(value)}
        xAxis={{ title: t("predicted") }}
        yAxis={{ title: t("actual") }}
        renderTooltip={tooltip}
        height={360}
        ariaLabel={t("confusionAria")}
      />
    </div>
  );
}
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartHoverEvent,
  type HeatmapCell,
} from "minerva-design/charts";

const sources = ["organic", "paid", "social", "email", "referral", "direct"];
const devices = ["desktop", "mobile", "tablet"];
// sessions and orders of last month, per source (rows) and device (columns)
const sessions = [
  [42_000, 61_000, 6_100],
  [18_500, 33_000, 2_400],
  [7_200, 39_000, 1_900],
  [9_800, 12_400, 1_300],
  [5_600, 4_100, 700],
  [21_000, 15_500, 2_800],
];
const orders = [
  [1_390, 1_160, 150],
  [520, 560, 41],
  [101, 470, 21],
  [560, 430, 52],
  [230, 92, 19],
  [880, 420, 84],
];
const cells = sources.flatMap((source, s) =>
  devices.map((device, d) => ({
    source,
    device,
    sessions: sessions[s]?.[d] ?? 0,
    orders: orders[s]?.[d] ?? 0,
  })),
);
const average =
  orders.flat().reduce((a, b) => a + b, 0) /
  sessions.flat().reduce((a, b) => a + b, 0);

export default function ConversionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const data = useMemo(
    (): HeatmapCell[] =>
      cells.map((cell) => ({
        x: t(\`devices.\${cell.device}\`),
        y: t(\`sources.\${cell.source}\`),
        value: cell.orders / cell.sessions,
      })),
    [t],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  // item.index is the index of the cell in \`data\` (and in \`cells\`)
  const click = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (item) setSelected(item.index);
  };
  const cell = selected === null ? undefined : cells[selected];
  const rate = cell ? cell.orders / cell.sessions : 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {cell ? (
          <>
            {t("cellStatus", {
              source: t(\`sources.\${cell.source}\`),
              device: t(\`devices.\${cell.device}\`),
              orders: number.format(cell.orders),
              sessions: number.format(cell.sessions),
              rate: percent.format(rate),
            })}{" "}
            <strong
              style={{
                color:
                  rate >= average
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {rate >= average
                ? t("aboveAverage", { value: percent.format(average) })
                : t("belowAverage", { value: percent.format(average) })}
            </strong>
          </>
        ) : (
          t("clickCell")
        )}
      </output>
      <HeatmapChart
        data={data}
        xCategories={devices.map((key) => t(\`devices.\${key}\`))}
        // first source at the top
        yCategories={[...sources].reverse().map((key) => t(\`sources.\${key}\`))}
        name={t("conversionRate")}
        format={(value) => percent.format(value)}
        radius={4}
        onPointClick={click}
        onPlotClick={() => setSelected(null)}
        height={340}
        ariaLabel={t("conversionAria")}
      />
    </div>
  );
}
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

// Correlation between product metrics (symmetric, 1 on the diagonal)
const metrics = [
  "sessions",
  "pageViews",
  "signups",
  "revenue",
  "churn",
  "tickets",
];
const matrix = [
  [1, 0.92, 0.71, 0.64, -0.18, 0.35],
  [0.92, 1, 0.66, 0.58, -0.12, 0.31],
  [0.71, 0.66, 1, 0.83, -0.41, 0.22],
  [0.64, 0.58, 0.83, 1, -0.57, 0.08],
  [-0.18, -0.12, -0.41, -0.57, 1, 0.46],
  [0.35, 0.31, 0.22, 0.08, 0.46, 1],
];

export default function CorrelationDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const names = useMemo(() => metrics.map((key) => t(\`metrics.\${key}\`)), [t]);
  const data = useMemo(
    (): HeatmapCell[] =>
      matrix.flatMap((row, i) =>
        row.map((value, j) => ({ x: names[j], y: names[i], value })),
      ),
    [names],
  );
  const coefficient = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={names}
      // first metric at the top, like a table
      yCategories={[...names].reverse()}
      // built-in theme-aware ramp: danger color below 0, primary above
      colorScale="diverging"
      colorMidpoint={0}
      valueRange={[-1, 1]}
      name={t("correlation")}
      format={(value) => coefficient.format(value)}
      height={360}
      ariaLabel={t("correlationAria")}
    />
  );
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartRendererKind,
  type HeatmapCell,
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

const WIDTH = 200;
const DEPTH = 100;
const ACCESS_POINTS = [
  { x: 30, y: 70 },
  { x: 105, y: 25 },
  { x: 170, y: 65 },
];
// interior walls (x positions) that weaken the signal crossing them
const WALLS = [70, 140];

const plasma = ["#0d0887", "#7e03a8", "#cc4778", "#f89540", "#f0f921"];

export default function LargeGridDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Wi-Fi signal strength on a 200 × 100 m floor, one cell per square meter
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(200);
    const cells: HeatmapCell[] = [];
    for (let y = 0; y < DEPTH; y++) {
      for (let x = 0; x < WIDTH; x++) {
        let best = -100;
        for (const ap of ACCESS_POINTS) {
          const distance = Math.hypot(x - ap.x, y - ap.y) + 1;
          const walls = WALLS.filter((wall) => x < wall !== ap.x < wall).length;
          best = Math.max(best, -32 - 22 * Math.log10(distance) - 7 * walls);
        }
        cells.push({ x, y, value: best + (random() - 0.5) * 2 });
      }
    }
    return cells;
  }, []);
  const meters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "meter" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        colorScale={plasma}
        valueRange={[-90, -30]}
        name={t("signal")}
        format={(value) => \`\${number.format(Math.round(value))} dBm\`}
        radius={0}
        xAxis={{ format: (value) => meters.format(value) }}
        yAxis={{ format: (value) => meters.format(value) }}
        interaction={{ zoom: "xy" }}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel={t("wifiAria")}
      />
      <p role="status">
        {t("largeStatus", {
          cells: number.format(WIDTH * DEPTH),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RACKS = 10;
const UNITS = 8; // sensors per rack, bottom to top
const LIMIT = 32; // °C, the inlet temperature alarm

/**
 * Inlet temperatures of the sensors at refresh \`tick\`, rack by rack: warmer
 * at the top of the racks, with a cooling unit failing now and then.
 * Derived from the tick alone, so the readings are deterministic.
 */
const readingsAt = (tick: number) => {
  const random = mulberry32(tick * 7919 + 3);
  // the failing cooling unit drifts along the aisle
  const failing = Math.floor(tick / 12) % RACKS;
  const heat = Math.max(0, Math.sin((tick % 12) / 3.8)) * 12;
  const values: number[] = [];
  for (let r = 0; r < RACKS; r++) {
    for (let u = 0; u < UNITS; u++) {
      const distance = Math.abs(r - failing);
      const hot = distance < 2 ? heat * (1 - distance * 0.5) : 0;
      values.push(20 + u * 0.9 + hot * (0.5 + u / UNITS) + random() * 1.5);
    }
  }
  return values;
};

export default function RackTemperaturesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  // the sensors are polled every 1.5 s
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1500);
    return () => clearInterval(timer);
  }, [running]);

  const racks = useMemo(
    () => Array.from({ length: RACKS }, (_, r) => t("rackN", { n: r + 1 })),
    [t],
  );
  const units = useMemo(
    () => Array.from({ length: UNITS }, (_, u) => t("sensorN", { n: u + 1 })),
    [t],
  );
  const readings = useMemo(() => readingsAt(tick), [tick]);
  const data = useMemo(
    (): HeatmapCell[] =>
      readings.map((value, i) => ({
        x: racks[Math.floor(i / UNITS)] ?? "",
        y: units[i % UNITS] ?? "",
        value,
      })),
    [readings, racks, units],
  );
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const hottest = readings.reduce(
    (best, value, i) => (value > (readings[best] ?? -Infinity) ? i : best),
    0,
  );
  const alarms = readings.filter((value) => value > LIMIT).length;

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
            color: alarms
              ? "var(--danger-color)"
              : "var(--text-secondary-color)",
          }}
        >
          {t("rackStatus", {
            rack: racks[Math.floor(hottest / UNITS)],
            sensor: units[hottest % UNITS],
            value: celsius(readings[hottest] ?? 0),
            alarms: new Intl.NumberFormat(locale).format(alarms),
            limit: celsius(LIMIT),
          })}
        </output>
      </div>
      <HeatmapChart
        data={data}
        xCategories={racks}
        yCategories={units}
        // a fixed range: the same color means the same temperature at every refresh
        valueRange={[18, 40]}
        colorScale={[
          "var(--primary-color)",
          "var(--success-color)",
          "var(--warning-color)",
          "var(--danger-color)",
        ]}
        name={t("inletTemperature")}
        format={celsius}
        radius={2}
        height={340}
        ariaLabel={t("racksAria")}
      />
    </div>
  );
}
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

const COHORTS = 9;
const PERIODS = 9;

// Share of each monthly signup cohort still active N months later; the
// newest cohorts have fewer months (null leaves the cell empty)
const retention = (cohort: number, month: number) => {
  if (month === 0) return 1;
  if (cohort + month >= COHORTS) return null;
  // onboarding improvements: later cohorts keep more users
  const floor = 0.18 + cohort * 0.015;
  return floor + (1 - floor) * Math.exp(-month / 1.6) * 0.62;
};

export default function RetentionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const { cohorts, periods, data } = useMemo(() => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    });
    const cohorts = Array.from({ length: COHORTS }, (_, c) =>
      date.format(new Date(2026, c, 1)),
    );
    const periods = Array.from({ length: PERIODS }, (_, m) =>
      t("monthN", { n: m }),
    );
    const data: HeatmapCell[] = cohorts.flatMap((cohort, c) =>
      periods.map((period, m) => ({
        x: period,
        y: cohort,
        value: retention(c, m),
      })),
    );
    return { cohorts, periods, data };
  }, [t, locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={periods}
      // oldest cohort at the top
      yCategories={[...cohorts].reverse()}
      // the default ramp: a tint of the surface to a deep (light theme) or
      // bright (dark theme) primary color
      valueRange={[0, 1]}
      name={t("retained")}
      format={(value) => percent.format(value)}
      height={340}
      ariaLabel={t("retentionAria")}
    />
  );
}
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

const regions = ["north", "south", "east", "west", "central"];
const quarters = [1, 2, 3, 4];
// revenue (M€) of 2025 and 2026 and gross margin (%) of 2026, per region
// (rows) and quarter (columns)
const revenue2025 = [
  [4.1, 4.4, 4.0, 5.2],
  [3.2, 3.6, 3.9, 4.4],
  [5.6, 5.1, 4.8, 6.0],
  [2.4, 2.6, 2.9, 3.3],
  [6.8, 7.0, 6.6, 7.9],
];
const revenue2026 = [
  [4.5, 4.9, 4.6, 5.9],
  [3.0, 3.3, 3.5, 4.0],
  [6.4, 6.0, 5.9, 7.3],
  [3.1, 3.5, 3.9, 4.6],
  [6.7, 6.8, 6.3, 7.4],
];
const margin2026 = [
  [31, 33, 30, 35],
  [24, 26, 27, 29],
  [38, 36, 35, 40],
  [19, 22, 25, 27],
  [34, 33, 31, 36],
];

type Metric = "revenue" | "growth" | "margin";

export default function SalesRegionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");

  // each metric brings its own values, color scale and format
  const settings = useMemo(() => {
    const euros = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const signed = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    const value = (r: number, q: number) => {
      const before = revenue2025[r]?.[q] ?? 0;
      const now = revenue2026[r]?.[q] ?? 0;
      if (metric === "growth") return now / before - 1;
      if (metric === "margin") return (margin2026[r]?.[q] ?? 0) / 100;
      return now;
    };
    const values = regions.flatMap((_, r) =>
      quarters.map((_, q) => value(r, q)),
    );
    if (metric === "growth") {
      // diverging around zero: red for a decline, primary for growth
      return {
        values,
        colorScale: "diverging" as const,
        valueRange: [-0.3, 0.3] as const,
        format: (v: number) => signed.format(v),
      };
    }
    if (metric === "margin") {
      return {
        values,
        colorScale: [
          "var(--danger-color)",
          "var(--warning-color)",
          "var(--success-color)",
        ],
        valueRange: [0.15, 0.4] as const,
        format: (v: number) => percent.format(v),
      };
    }
    return {
      values,
      colorScale: "sequential" as const,
      valueRange: undefined,
      format: (v: number) => euros.format(v * 1e6),
    };
  }, [metric, locale]);

  const regionNames = useMemo(
    () => regions.map((key) => t(\`regions.\${key}\`)),
    [t],
  );
  const quarterNames = useMemo(
    () => quarters.map((n) => t("quarterN", { n })),
    [t],
  );
  const data = useMemo(
    (): HeatmapCell[] =>
      regions.flatMap((_, r) =>
        quarters.map((_, q) => ({
          x: quarterNames[q] ?? "",
          y: regionNames[r] ?? "",
          value: settings.values[r * quarters.length + q] ?? null,
        })),
      ),
    [settings, regionNames, quarterNames],
  );
  const best = settings.values.indexOf(Math.max(...settings.values));
  const worst = settings.values.indexOf(Math.min(...settings.values));
  const cellName = (i: number) =>
    t("regionQuarter", {
      region: regionNames[Math.floor(i / quarters.length)],
      quarter: quarterNames[i % quarters.length],
    });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("metric")}
        direction="horizontal"
        value={metric}
        onChange={(value) => setMetric(value as Metric)}
      >
        <Radio value="revenue" label={t("salesMetrics.revenue")} />
        <Radio value="growth" label={t("salesMetrics.growth")} />
        <Radio value="margin" label={t("salesMetrics.margin")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("bestWorst", {
          best: cellName(best),
          bestValue: settings.format(settings.values[best] ?? 0),
          worst: cellName(worst),
          worstValue: settings.format(settings.values[worst] ?? 0),
        })}
      </output>
      <HeatmapChart
        data={data}
        xCategories={quarterNames}
        yCategories={[...regionNames].reverse()}
        colorScale={settings.colorScale}
        valueRange={settings.valueRange}
        name={t(\`salesMetrics.\${metric}\`)}
        format={settings.format}
        radius={4}
        height={320}
        ariaLabel={t("salesAria")}
      />
    </div>
  );
}
`})))()}var yt,bt,xt;function St(){return(St=e((()=>{oe(),fe(),ye(),Ce(),Te(),Ae(),Re(),He(),qe(),Qe(),et(),nt(),it(),ot(),ct(),ut(),ft(),mt(),gt(),vt(),t(),f(),m(),yt=n(),bt=d(Object.assign({"./demos/activity.tsx":te,"./demos/basic.tsx":ce,"./demos/color-scale.tsx":me,"./demos/confusion-matrix.tsx":be,"./demos/conversion.tsx":we,"./demos/correlation.tsx":Ee,"./demos/large-grid.tsx":Me,"./demos/rack-temperatures.tsx":Be,"./demos/retention.tsx":Ue,"./demos/sales-regions.tsx":Je}),Object.assign({"./demos/activity.tsx":$e,"./demos/basic.tsx":tt,"./demos/color-scale.tsx":rt,"./demos/confusion-matrix.tsx":at,"./demos/conversion.tsx":st,"./demos/correlation.tsx":lt,"./demos/large-grid.tsx":dt,"./demos/rack-temperatures.tsx":pt,"./demos/retention.tsx":ht,"./demos/sales-regions.tsx":_t})),xt=()=>(0,yt.jsx)(p,{id:`heatmap-chart`,demos:bt})})))()}St();export{xt as default};