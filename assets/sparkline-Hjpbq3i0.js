import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{a,i as o,n as s,r as c,s as l,t as u}from"./Card-Cm83NXvy.js";import{i as d,n as f,r as p,t as m}from"./Radio-L-_0EAus.js";import{n as h,t as g}from"./Tag-D6SUzaZT.js";import{c as ee,o as te}from"./DemoBlock-CrPVu7R1.js";import{l as ne,n as re,t as ie,u as ae}from"./DocPage-BdPOW9nQ.js";import{m as _,s as v}from"./charts-JJDQ3gS7.js";function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.sparkline.data`});return(0,y.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(160px, 1fr))`,gap:24,width:`100%`},children:se.map(({caption:t,props:n})=>(0,y.jsxs)(`figure`,{style:{margin:0},children:[(0,y.jsx)(v,{data:b,name:e(`orders`),ariaLabel:e(`ordersAria`,{variant:t}),...n}),(0,y.jsx)(`figcaption`,{style:{marginTop:6,fontSize:12,color:`var(--text-secondary-color)`},children:(0,y.jsx)(`code`,{children:t})})]},t))})}var y,b,se;function ce(){return(ce=e((()=>{i(),_(),y=n(),b=[42,47,45,52,49,58,61,57,64,60,68,73,70,76,74,81,79,85,88,84],se=[{caption:`type="line"`,props:{}},{caption:`type="area"`,props:{type:`area`}},{caption:`type="bar"`,props:{type:`bar`}},{caption:`reference={average}`,props:{reference:b.reduce((e,t)=>e+t,0)/b.length,color:`var(--success-color)`}}]})))()}function le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,[i,a]=(0,x.useState)(null),o=(0,x.useMemo)(()=>new Intl.NumberFormat(n),[n]),s=(0,x.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`short`,month:`long`,day:`numeric`,timeZone:`UTC`}),[n]),c=(0,x.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`}),[n]),l=i??T.length-1,u=T[l]??0,d=T[0]??1;return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:4,width:`100%`,maxWidth:420},children:[(0,S.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`dailyActiveUsers`)}),(0,S.jsxs)(`output`,{"aria-live":`polite`,style:{display:`grid`,gap:2},children:[(0,S.jsx)(`span`,{style:{fontSize:28,fontWeight:600},children:o.format(u)}),(0,S.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:i===null?e(`latestDay`,{date:s.format(w+l*C)}):e(`hoveredDay`,{date:s.format(w+l*C),change:c.format(u/d-1)})})]}),(0,S.jsx)(v,{data:T,type:`area`,name:e(`dailyActiveUsers`),format:e=>o.format(e),tooltip:!1,onHover:e=>a(e?.items[0]?.index??null),height:64,ariaLabel:e(`dauAria`)})]})}var x,S,C,w,T;function de(){return(de=e((()=>{x=t(),i(),_(),S=n(),C=864e5,w=Date.UTC(2026,8,1),T=(()=>{let e=le(61);return Array.from({length:61},(t,n)=>{let r=new Date(w+n*C).getUTCDay(),i=r===0||r===6?.82:1;return Math.round((18e3+n*120)*i*(.96+e()*.08))})})()})))()}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=new Intl.NumberFormat(t.language),i=new Intl.NumberFormat(t.language,{style:`unit`,unit:`celsius`});return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,lineHeight:1.8},children:[(0,E.jsxs)(`div`,{children:[e(`inlineVisits`),(0,E.jsx)(v,{data:D,name:e(`visits`),format:e=>n.format(e),width:80,height:20,style:k,ariaLabel:e(`visitsAria`)}),(0,E.jsx)(`strong`,{children:n.format(D[D.length-1])})]}),(0,E.jsxs)(`div`,{children:[e(`inlineErrors`),(0,E.jsx)(v,{data:pe,type:`bar`,name:e(`errors`),color:`var(--danger-color)`,width:80,height:20,style:k,ariaLabel:e(`errorsAria`)})]}),(0,E.jsxs)(`div`,{children:[e(`inlineTemperature`),(0,E.jsx)(v,{data:O,type:`area`,name:e(`temperature`),format:e=>i.format(e),color:`var(--warning-color)`,width:80,height:20,style:k,ariaLabel:e(`temperatureAria`)}),(0,E.jsx)(`strong`,{children:i.format(O[O.length-1])})]})]})}var E,D,pe,O,k;function me(){return(me=e((()=>{i(),_(),E=n(),D=[820,870,910,860,990,1040,1010,1120,1180,1150,1260,1310,1290,1380],pe=[12,9,14,11,10,8,26,31,18,9,7,8,6,7],O=[14,15,13,12,16,18,19,21,20,18,17,19,22,23],k={display:`inline-block`,verticalAlign:`middle`,margin:`0 4px`}})))()}function he(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,i=(0,A.useMemo)(()=>{let t=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),i=new Intl.NumberFormat(n),a=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`});return[{label:e(`revenue`),value:r.format(128400),delta:.125,good:!0,spark:{data:M(1,3600,4400,.12),type:`area`,name:e(`revenue`),format:e=>t.format(e)}},{label:e(`activeUsers`),value:i.format(24310),delta:.041,good:!0,spark:{data:M(2,23e3,24300,.04),name:e(`activeUsers`),format:e=>i.format(e)}},{label:e(`signups`),value:i.format(1842),delta:-.032,good:!1,spark:{data:M(3,66,58,.3),type:`bar`,name:e(`signups`),color:`var(--warning-color)`}},{label:e(`p95`),value:a.format(182),delta:-.08,good:!0,spark:{data:M(4,205,180,.08),name:e(`p95`),format:e=>a.format(e),reference:200,color:`var(--success-color)`}}]},[e,n]),o=(0,A.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,signDisplay:`exceptZero`}),[n]);return(0,j.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(200px, 1fr))`,gap:16,width:`100%`},children:i.map(t=>(0,j.jsxs)(u,{padding:`medium`,children:[(0,j.jsxs)(a,{children:[(0,j.jsx)(s,{children:t.label}),(0,j.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:8},children:[(0,j.jsx)(l,{style:{fontSize:24},children:t.value}),(0,j.jsx)(g,{size:`small`,color:t.good?`success`:`danger`,children:o.format(t.delta)})]})]}),(0,j.jsx)(c,{children:(0,j.jsx)(v,{...t.spark,height:56,ariaLabel:e(`last30Aria`,{metric:t.label})})})]},t.label))})}var A,j,M;function _e(){return(_e=e((()=>{A=t(),i(),o(),h(),_(),j=n(),M=(e,t,n,r)=>{let i=he(e),a=[],o=0;for(let e=0;e<30;e++)o=o*.6+(i()-.5)*r,a.push(Math.round((t+(n-t)*e/29)*(1+o)));return a}})))()}function ve(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,[i,a]=(0,N.useState)(`month`),o=(0,N.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0});return t=>e.format(t)},[n]),s=(0,N.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`}),[n]),{values:c,total:l,change:u,average:f}=(0,N.useMemo)(()=>{let e=be[i],t=F.slice(-e),n=e=>e.reduce((e,t)=>e+t,0),r=n(t);return{values:t,total:r,change:e<F.length?r/n(F.slice(-2*e,-e))-1:n(F.slice(45))/n(F.slice(0,45))-1,average:r/e}},[i]),p=u>=0;return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,maxWidth:480},children:[(0,P.jsxs)(d,{"aria-label":e(`period`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,P.jsx)(m,{value:`week`,label:e(`periods.week`)}),(0,P.jsx)(m,{value:`month`,label:e(`periods.month`)}),(0,P.jsx)(m,{value:`quarter`,label:e(`periods.quarter`)})]}),(0,P.jsxs)(`output`,{"aria-live":`polite`,style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,P.jsx)(`span`,{style:{fontSize:24,fontWeight:600},children:o(l)}),(0,P.jsx)(g,{size:`small`,color:p?`success`:`danger`,children:s.format(u)}),(0,P.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(i===`quarter`?`vsFirstHalf`:`vsPrevious`)})]}),(0,P.jsx)(v,{data:c,type:i===`week`?`bar`:`line`,color:p?`var(--success-color)`:`var(--danger-color)`,name:e(`revenue`),format:o,reference:f,height:64,ariaLabel:e(`periodAria`,{period:e(`periods.${i}`)})})]})}var N,P,F,be;function xe(){return(xe=e((()=>{N=t(),i(),f(),p(),h(),_(),P=n(),F=(()=>{let e=ve(90);return Array.from({length:90},(t,n)=>{let r=n<40?5200:5200+(n-40)*45;return Math.round(r*(n>=83?.82:1)*(.88+e()*.24))})})(),be={week:7,month:30,quarter:90}})))()}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),[n,i]=(0,I.useState)(Ee);(0,I.useEffect)(()=>{let e=setInterval(()=>{i(e=>e.map((e,t)=>[...e.slice(1),Te(e[e.length-1],R[t].base)]))},1e3);return()=>clearInterval(e)},[]);let a=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:0});return(0,L.jsx)(`ul`,{style:{listStyle:`none`,margin:0,padding:0,display:`grid`,gap:8,width:`100%`},children:R.map((t,r)=>{let i=n[r],o=i[i.length-1],s=o>=Ce;return(0,L.jsxs)(`li`,{style:{display:`grid`,gridTemplateColumns:`110px 1fr 64px 90px`,alignItems:`center`,gap:12},children:[(0,L.jsx)(`code`,{children:t.name}),(0,L.jsx)(v,{data:i,type:`bar`,name:e(`cpu`),format:e=>a.format(e/100),color:s?`var(--danger-color)`:`var(--primary-color)`,height:28,ariaLabel:e(`cpuAria`,{server:t.name})}),(0,L.jsx)(`span`,{style:{textAlign:`end`,fontVariantNumeric:`tabular-nums`},children:a.format(o/100)}),(0,L.jsx)(g,{size:`small`,color:s?`danger`:`success`,children:e(s?`alert`:`healthy`)})]},t.name)})})}var I,L,Ce,we,R,Te,Ee;function De(){return(De=e((()=>{I=t(),i(),h(),_(),L=n(),Ce=80,we=40,R=[{name:`web-01`,base:35},{name:`web-02`,base:42},{name:`db-primary`,base:66},{name:`worker-01`,base:55}],Te=(e,t)=>{let n=Math.random()<.05?30:0,r=e+(t-e)*.3+(Math.random()-.5)*14+n;return Math.max(2,Math.min(100,r))},Ee=()=>R.map(({base:e})=>Array.from({length:we},()=>e))})))()}function Oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,i=(0,z.useMemo)(()=>new Intl.NumberFormat(n),[n]),a=(0,z.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),o=(0,z.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`long`,month:`short`,day:`numeric`,timeZone:`UTC`}),[n]),s=(0,z.useMemo)(()=>W.map((e,t)=>({x:t,y:e,color:e>=U?`var(--success-color)`:`var(--chart-series-1)`})),[]),c=W.filter(e=>e>=U).length;return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:4,width:`100%`,maxWidth:480},children:[(0,B.jsx)(`span`,{children:e(`goalSummary`,{reached:i.format(c),days:i.format(W.length),goal:i.format(U)})}),(0,B.jsx)(v,{data:s,type:`bar`,name:e(`steps`),reference:U,renderTooltip:t=>{let n=t.items[0];if(!n)return null;let r=n.y/U;return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,B.jsx)(`strong`,{children:o.format(H+n.index*V)}),(0,B.jsx)(`span`,{children:e(`stepsN`,{value:i.format(n.y)})}),(0,B.jsx)(`span`,{style:{color:r>=1?`var(--success-color)`:`var(--text-secondary-color)`},children:e(`ofGoal`,{value:a.format(r)})})]})},height:72,ariaLabel:e(`stepsAria`)})]})}var z,B,V,H,U,W;function Ae(){return(Ae=e((()=>{z=t(),i(),_(),B=n(),V=864e5,H=Date.UTC(2026,9,4),U=1e4,W=(()=>{let e=Oe(10);return Array.from({length:28},(t,n)=>{let r=new Date(H+n*V).getUTCDay();return Math.round((n>=12&&n<=15?2500:r===0||r===6?12500:8800)*(.75+e()*.5))})})()})))()}function je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,i=(0,Ne.useMemo)(()=>{let t=new Intl.NumberFormat(n),r=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`}),i=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,signDisplay:`exceptZero`});return[{key:`name`,header:e(`service`),render:t=>e(`services.${t.id}`)},{key:`requests`,header:e(`requestsPerMin`),align:`right`,render:e=>t.format(e.requests)},{key:`trend`,header:e(`latency30`),width:180,render:t=>(0,G.jsx)(v,{data:t.latency,name:e(`p95`),format:e=>r.format(e),color:K(t.latency)>0?`var(--danger-color)`:`var(--success-color)`,width:150,height:32,ariaLabel:e(`latencyAria`,{service:e(`services.${t.id}`)})})},{key:`latency`,header:e(`today`),align:`right`,render:e=>r.format(e.latency[e.latency.length-1])},{key:`change`,header:e(`change`),align:`right`,render:e=>{let t=K(e.latency);return(0,G.jsx)(g,{size:`small`,color:t>0?`danger`:`success`,children:i.format(t)})}}]},[e,n]);return(0,G.jsx)(te,{"aria-label":e(`serviceLatency`),columns:i,data:Ie,rowKey:e=>e.id,hoverable:!0})}var Ne,G,Pe,Fe,Ie,K;function Le(){return(Le=e((()=>{Ne=t(),i(),ee(),h(),_(),G=n(),Pe=[[`gateway`,48200,96,88],[`auth`,12900,64,71],[`search`,8400,210,162],[`payments`,2150,320,395],[`notifications`,5600,140,138]],Fe=je(30),Ie=Pe.map(([e,t,n,r])=>{let i=Array.from({length:30},(e,t)=>{let i=n+(r-n)*t/29;return Math.round(i*(1+(Fe()-.5)*.14))});return i[0]=n,i[29]=r,{id:e,requests:t,latency:i}}),K=e=>e[e.length-1]/e[0]-1})))()}function Re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ze(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,i=(0,Be.useMemo)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`exceptZero`}),r=e=>new Intl.NumberFormat(n,{style:`currency`,currency:e}),i=e=>Y(e)>=0?`var(--success-color)`:`var(--danger-color)`;return[{key:`symbol`,header:e(`symbol`),render:t=>(0,q.jsxs)(`div`,{style:{display:`grid`},children:[(0,q.jsx)(`strong`,{children:t.symbol}),(0,q.jsx)(`small`,{style:{color:`var(--text-secondary-color)`},children:e(`companies.${t.symbol}`)})]})},{key:`chart`,header:e(`today`),width:140,render:t=>(0,q.jsx)(v,{data:t.prices,type:`area`,color:i(t),reference:t.previous,name:t.symbol,format:e=>r(t.currency).format(e),width:120,height:36,ariaLabel:e(`intradayAria`,{symbol:t.symbol})})},{key:`price`,header:e(`price`),align:`right`,render:e=>r(e.currency).format(J(e))},{key:`change`,header:e(`change`),align:`right`,render:e=>(0,q.jsx)(`span`,{style:{color:i(e),fontWeight:600},children:t.format(Y(e))})}]},[e,n]);return(0,q.jsx)(te,{"aria-label":e(`watchlist`),columns:i,data:Ue,rowKey:e=>e.symbol,hoverable:!0})}var Be,q,Ve,He,Ue,J,Y;function We(){return(We=e((()=>{Be=t(),i(),ee(),_(),q=n(),Ve=[[`ACME`,`USD`,182.4,.021],[`NOVA`,`USD`,64.15,-.034],[`ORBT`,`EUR`,47.9,.006],[`KITE`,`JPY`,2845,-.012],[`LUMA`,`USD`,312.7,.047]],He=Re(78),Ue=Ve.map(([e,t,n,r])=>{let i=n;return{symbol:e,currency:t,previous:n,prices:Array.from({length:78},(e,t)=>(i*=1+r/78+(He()-.5)*.006,t===0?n:i))}}),J=e=>e.prices[e.prices.length-1],Y=e=>J(e)/e.previous-1})))()}function Ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,i=(0,X.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:0});return t=>e.format(t)},[n]),o=(0,X.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{month:`short`,timeZone:`UTC`}),t=new Intl.DateTimeFormat(n,{month:`long`,timeZone:`UTC`});return Array.from({length:12},(n,r)=>({short:e.format(Date.UTC(2026,r,1)),long:t.format(Date.UTC(2026,r,1))}))},[n]),d=e=>{let t=e.items[0];return t?(0,Z.jsxs)(`span`,{children:[o[t.index]?.long,`: `,(0,Z.jsx)(`strong`,{children:i(t.y)})]}):null};return(0,Z.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`,gap:12,width:`100%`},children:Object.keys(Q).map((t,n)=>{let r=Q[t],f=Math.max(...r),p=Math.min(...r),m=e(`cities.${t}`);return(0,Z.jsxs)(u,{padding:`medium`,children:[(0,Z.jsxs)(a,{children:[(0,Z.jsx)(l,{children:m}),(0,Z.jsx)(s,{children:e(`warmestColdest`,{max:i(f),maxMonth:o[r.indexOf(f)]?.short,min:i(p),minMonth:o[r.indexOf(p)]?.short})})]}),(0,Z.jsx)(c,{children:(0,Z.jsx)(v,{data:r,type:`area`,color:`var(--chart-series-${n%6+1})`,reference:p<0?0:void 0,renderTooltip:d,height:48,ariaLabel:e(`weatherAria`,{city:m})})})]},t)})})}var X,Z,Q;function Ke(){return(Ke=e((()=>{X=t(),i(),o(),_(),Z=n(),Q={reykjavik:[3,3,4,6,10,12,14,14,11,7,4,3],montreal:[-5,-3,2,11,19,24,26,25,20,13,6,-2],tokyo:[10,10,14,19,23,26,30,31,27,22,17,12],cairo:[19,21,24,28,32,34,35,35,33,30,25,21],singapore:[31,32,32,32,32,31,31,31,31,31,31,30],sydney:[26,26,25,23,20,18,17,18,20,22,24,25]}})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useTranslation } from "react-i18next";
import { Sparkline } from "minerva-design/charts";

const weekly = [
  42, 47, 45, 52, 49, 58, 61, 57, 64, 60, 68, 73, 70, 76, 74, 81, 79, 85, 88,
  84,
];
const average = weekly.reduce((sum, v) => sum + v, 0) / weekly.length;

const variants = [
  { caption: 'type="line"', props: {} },
  { caption: 'type="area"', props: { type: "area" as const } },
  { caption: 'type="bar"', props: { type: "bar" as const } },
  {
    caption: "reference={average}",
    props: { reference: average, color: "var(--success-color)" },
  },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.sparkline.data" });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 24,
        width: "100%",
      }}
    >
      {variants.map(({ caption, props }) => (
        <figure key={caption} style={{ margin: 0 }}>
          <Sparkline
            data={weekly}
            name={t("orders")}
            ariaLabel={t("ordersAria", { variant: caption })}
            {...props}
          />
          <figcaption
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "var(--text-secondary-color)",
            }}
          >
            <code>{caption}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkline, type ChartHoverEvent } from "minerva-design/charts";

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
const START = Date.UTC(2026, 8, 1);

// Daily active users of an app over 61 days (Sept 1 to Oct 31): growing,
// with quieter weekends
const users = (() => {
  const random = mulberry32(61);
  return Array.from({ length: 61 }, (_, i) => {
    const weekday = new Date(START + i * DAY).getUTCDay();
    const weekend = weekday === 0 || weekday === 6 ? 0.82 : 1;
    return Math.round((18_000 + i * 120) * weekend * (0.96 + random() * 0.08));
  });
})();

export default function HoverValueDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;
  // index of the hovered day, null when the pointer is outside
  const [hovered, setHovered] = useState<number | null>(null);

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  // the readout shows the hovered day, and falls back to the latest one
  const index = hovered ?? users.length - 1;
  const value = users[index] ?? 0;
  const first = users[0] ?? 1;

  return (
    <div style={{ display: "grid", gap: 4, width: "100%", maxWidth: 420 }}>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {t("dailyActiveUsers")}
      </span>
      <output aria-live="polite" style={{ display: "grid", gap: 2 }}>
        <span style={{ fontSize: 28, fontWeight: 600 }}>
          {number.format(value)}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {hovered === null
            ? t("latestDay", { date: date.format(START + index * DAY) })
            : t("hoveredDay", {
                date: date.format(START + index * DAY),
                change: percent.format(value / first - 1),
              })}
        </span>
      </output>
      <Sparkline
        data={users}
        type="area"
        name={t("dailyActiveUsers")}
        format={(v) => number.format(v)}
        // the readout replaces the tooltip
        tooltip={false}
        onHover={(event: ChartHoverEvent | null) =>
          setHovered(event?.items[0]?.index ?? null)
        }
        height={64}
        ariaLabel={t("dauAria")}
      />
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useTranslation } from "react-i18next";
import { Sparkline } from "minerva-design/charts";

// Last 14 days
const visits = [
  820, 870, 910, 860, 990, 1040, 1010, 1120, 1180, 1150, 1260, 1310, 1290, 1380,
];
const errors = [12, 9, 14, 11, 10, 8, 26, 31, 18, 9, 7, 8, 6, 7];
const temperature = [14, 15, 13, 12, 16, 18, 19, 21, 20, 18, 17, 19, 22, 23];

// A sparkline inside a sentence: inline-block, about the height of a line
const inline = {
  display: "inline-block",
  verticalAlign: "middle",
  margin: "0 4px",
};

export default function InlineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const celsius = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "celsius",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", lineHeight: 1.8 }}>
      <div>
        {t("inlineVisits")}
        <Sparkline
          data={visits}
          name={t("visits")}
          format={(value) => number.format(value)}
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("visitsAria")}
        />
        <strong>{number.format(visits[visits.length - 1])}</strong>
      </div>
      <div>
        {t("inlineErrors")}
        <Sparkline
          data={errors}
          type="bar"
          name={t("errors")}
          color="var(--danger-color)"
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("errorsAria")}
        />
      </div>
      <div>
        {t("inlineTemperature")}
        <Sparkline
          data={temperature}
          type="area"
          name={t("temperature")}
          format={(value) => celsius.format(value)}
          color="var(--warning-color)"
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("temperatureAria")}
        />
        <strong>{celsius.format(temperature[temperature.length - 1])}</strong>
      </div>
    </div>
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tag,
} from "minerva-design";
import { Sparkline, type SparklineConfig } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 30 daily values drifting from \`from\` to \`to\`, with some day-to-day wobble */
const trend = (seed: number, from: number, to: number, noise: number) => {
  const random = mulberry32(seed);
  const values: number[] = [];
  let wobble = 0;
  for (let i = 0; i < 30; i++) {
    wobble = wobble * 0.6 + (random() - 0.5) * noise;
    values.push(Math.round((from + ((to - from) * i) / 29) * (1 + wobble)));
  }
  return values;
};

interface Kpi {
  label: string;
  value: string;
  /** Change over the period, 0.125 = +12.5% */
  delta: number;
  /** The change is good news (an increase is not always one) */
  good: boolean;
  spark: SparklineConfig;
}

export default function KpiCardsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const kpis = useMemo((): Kpi[] => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const compactUsd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    return [
      {
        label: t("revenue"),
        value: compactUsd.format(128_400),
        delta: 0.125,
        good: true,
        spark: {
          data: trend(1, 3600, 4400, 0.12),
          type: "area",
          name: t("revenue"),
          format: (v) => usd.format(v),
        },
      },
      {
        label: t("activeUsers"),
        value: number.format(24_310),
        delta: 0.041,
        good: true,
        spark: {
          data: trend(2, 23_000, 24_300, 0.04),
          name: t("activeUsers"),
          format: (v) => number.format(v),
        },
      },
      {
        label: t("signups"),
        value: number.format(1_842),
        delta: -0.032,
        good: false,
        spark: {
          data: trend(3, 66, 58, 0.3),
          type: "bar",
          name: t("signups"),
          color: "var(--warning-color)",
        },
      },
      {
        label: t("p95"),
        value: ms.format(182),
        delta: -0.08,
        good: true,
        spark: {
          data: trend(4, 205, 180, 0.08),
          name: t("p95"),
          format: (v) => ms.format(v),
          reference: 200,
          color: "var(--success-color)",
        },
      },
    ];
  }, [t, locale]);
  // "+12.5%", "-3.2 %"...
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {kpis.map((kpi) => (
        <Card key={kpi.label} padding="medium">
          <CardHeader>
            <CardDescription>{kpi.label}</CardDescription>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <CardTitle style={{ fontSize: 24 }}>{kpi.value}</CardTitle>
              <Tag size="small" color={kpi.good ? "success" : "danger"}>
                {percent.format(kpi.delta)}
              </Tag>
            </div>
          </CardHeader>
          <CardContent>
            <Sparkline
              {...kpi.spark}
              height={56}
              ariaLabel={t("last30Aria", { metric: kpi.label })}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`})))()}var tt;function $(){return($=e((()=>{tt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Tag } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Daily revenue (€) of an online shop over the last 90 days: a slow
// summer, a back-to-school rise, then a dip in the last week
const revenue = (() => {
  const random = mulberry32(90);
  return Array.from({ length: 90 }, (_, i) => {
    const season = i < 40 ? 5200 : 5200 + (i - 40) * 45;
    const dip = i >= 83 ? 0.82 : 1;
    return Math.round(season * dip * (0.88 + random() * 0.24));
  });
})();

const periods = { week: 7, month: 30, quarter: 90 } as const;
type Period = keyof typeof periods;

export default function PeriodsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;
  const [period, setPeriod] = useState<Period>("month");

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  // the last N days, compared with the N days before (or, for the whole
  // quarter, its first half with its second)
  const { values, total, change, average } = useMemo(() => {
    const days = periods[period];
    const values = revenue.slice(-days);
    const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);
    const total = sum(values);
    const change =
      days < revenue.length
        ? total / sum(revenue.slice(-2 * days, -days)) - 1
        : sum(revenue.slice(45)) / sum(revenue.slice(0, 45)) - 1;
    return { values, total, change, average: total / days };
  }, [period]);
  const up = change >= 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%", maxWidth: 480 }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(value as Period)}
      >
        <Radio value="week" label={t("periods.week")} />
        <Radio value="month" label={t("periods.month")} />
        <Radio value="quarter" label={t("periods.quarter")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontSize: 24, fontWeight: 600 }}>{euros(total)}</span>
        <Tag size="small" color={up ? "success" : "danger"}>
          {percent.format(change)}
        </Tag>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {period === "quarter" ? t("vsFirstHalf") : t("vsPrevious")}
        </span>
      </output>
      <Sparkline
        data={values}
        type={period === "week" ? "bar" : "line"}
        color={up ? "var(--success-color)" : "var(--danger-color)"}
        name={t("revenue")}
        format={euros}
        // dashed line at the daily average of the period
        reference={average}
        height={64}
        ariaLabel={t("periodAria", { period: t(\`periods.\${period}\`) })}
      />
    </div>
  );
}
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

const LIMIT = 80; // % CPU before the alert
const POINTS = 40;

const servers = [
  { name: "web-01", base: 35 },
  { name: "web-02", base: 42 },
  { name: "db-primary", base: 66 },
  { name: "worker-01", base: 55 },
];

/** Next CPU sample: a random walk around \`base\`, with occasional spikes */
const next = (previous: number, base: number) => {
  const spike = Math.random() < 0.05 ? 30 : 0;
  const value =
    previous + (base - previous) * 0.3 + (Math.random() - 0.5) * 14 + spike;
  return Math.max(2, Math.min(100, value));
};

const initial = () =>
  servers.map(({ base }) => Array.from({ length: POINTS }, () => base));

export default function ServersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const [cpu, setCpu] = useState(initial);

  // a new sample per server every second, the oldest one drops out
  useEffect(() => {
    const timer = setInterval(() => {
      setCpu((current) =>
        current.map((samples, i) => [
          ...samples.slice(1),
          next(samples[samples.length - 1], servers[i].base),
        ]),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gap: 8,
        width: "100%",
      }}
    >
      {servers.map((server, i) => {
        const samples = cpu[i];
        const current = samples[samples.length - 1];
        const hot = current >= LIMIT;
        return (
          <li
            key={server.name}
            style={{
              display: "grid",
              gridTemplateColumns: "110px 1fr 64px 90px",
              alignItems: "center",
              gap: 12,
            }}
          >
            <code>{server.name}</code>
            <Sparkline
              data={samples}
              type="bar"
              name={t("cpu")}
              format={(value) => percent.format(value / 100)}
              // red while the server is above the alert threshold
              color={hot ? "var(--danger-color)" : "var(--primary-color)"}
              height={28}
              ariaLabel={t("cpuAria", { server: server.name })}
            />
            <span
              style={{ textAlign: "end", fontVariantNumeric: "tabular-nums" }}
            >
              {percent.format(current / 100)}
            </span>
            <Tag size="small" color={hot ? "danger" : "success"}>
              {hot ? t("alert") : t("healthy")}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkline,
  type ChartHoverEvent,
  type ChartPointDatum,
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
const START = Date.UTC(2026, 9, 4);
const GOAL = 10_000;

// Steps counted by a phone over four weeks: long walks at weekends, a
// sick week in the middle
const steps = (() => {
  const random = mulberry32(10);
  return Array.from({ length: 28 }, (_, i) => {
    const weekday = new Date(START + i * DAY).getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    const sick = i >= 12 && i <= 15;
    const base = sick ? 2_500 : weekend ? 12_500 : 8_800;
    return Math.round(base * (0.75 + random() * 0.5));
  });
})();

export default function StepGoalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );
  // the days reaching the goal are green
  const data = useMemo(
    (): ChartPointDatum[] =>
      steps.map((y, x) => ({
        x,
        y,
        color: y >= GOAL ? "var(--success-color)" : "var(--chart-series-1)",
      })),
    [],
  );
  const reached = steps.filter((value) => value >= GOAL).length;

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    const share = item.y / GOAL;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{date.format(START + item.index * DAY)}</strong>
        <span>{t("stepsN", { value: number.format(item.y) })}</span>
        <span
          style={{
            color:
              share >= 1
                ? "var(--success-color)"
                : "var(--text-secondary-color)",
          }}
        >
          {t("ofGoal", { value: percent.format(share) })}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 4, width: "100%", maxWidth: 480 }}>
      <span>
        {t("goalSummary", {
          reached: number.format(reached),
          days: number.format(steps.length),
          goal: number.format(GOAL),
        })}
      </span>
      <Sparkline
        data={data}
        type="bar"
        name={t("steps")}
        // dashed line at the daily goal
        reference={GOAL}
        renderTooltip={tooltip}
        height={72}
        ariaLabel={t("stepsAria")}
      />
    </div>
  );
}
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, Tag, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Service {
  id: string;
  requests: number;
  /** p95 latency of the last 30 days, in ms */
  latency: number[];
}

const services: [string, number, number, number][] = [
  // translation key, requests / min, latency 30 days ago, latency today
  ["gateway", 48_200, 96, 88],
  ["auth", 12_900, 64, 71],
  ["search", 8_400, 210, 162],
  ["payments", 2_150, 320, 395],
  ["notifications", 5_600, 140, 138],
];

const random = mulberry32(30);
const data: Service[] = services.map(([id, requests, from, to]) => {
  const latency = Array.from({ length: 30 }, (_, i) => {
    const value = from + ((to - from) * i) / 29;
    return Math.round(value * (1 + (random() - 0.5) * 0.14));
  });
  latency[0] = from;
  latency[29] = to;
  return { id, requests, latency };
});

const change = (latency: number[]) =>
  latency[latency.length - 1] / latency[0] - 1;

export default function TableDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const columns = useMemo((): TableColumn<Service>[] => {
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return [
      {
        key: "name",
        header: t("service"),
        render: (row) => t(\`services.\${row.id}\`),
      },
      {
        key: "requests",
        header: t("requestsPerMin"),
        align: "right",
        render: (row) => number.format(row.requests),
      },
      {
        key: "trend",
        header: t("latency30"),
        width: 180,
        render: (row) => (
          <Sparkline
            data={row.latency}
            name={t("p95")}
            format={(value) => ms.format(value)}
            // rising latency is bad news
            color={
              change(row.latency) > 0
                ? "var(--danger-color)"
                : "var(--success-color)"
            }
            width={150}
            height={32}
            ariaLabel={t("latencyAria", { service: t(\`services.\${row.id}\`) })}
          />
        ),
      },
      {
        key: "latency",
        header: t("today"),
        align: "right",
        render: (row) => ms.format(row.latency[row.latency.length - 1]),
      },
      {
        key: "change",
        header: t("change"),
        align: "right",
        render: (row) => {
          const value = change(row.latency);
          return (
            <Tag size="small" color={value > 0 ? "danger" : "success"}>
              {percent.format(value)}
            </Tag>
          );
        },
      },
    ];
  }, [t, locale]);

  return (
    <Table
      aria-label={t("serviceLatency")}
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      hoverable
    />
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Quote {
  symbol: string;
  currency: string;
  /** Previous close, then one price every 5 minutes of the session */
  previous: number;
  prices: number[];
}

// symbol, currency, previous close, drift over the session
const symbols: [string, string, number, number][] = [
  ["ACME", "USD", 182.4, 0.021],
  ["NOVA", "USD", 64.15, -0.034],
  ["ORBT", "EUR", 47.9, 0.006],
  ["KITE", "JPY", 2_845, -0.012],
  ["LUMA", "USD", 312.7, 0.047],
];

const random = mulberry32(78);
const quotes: Quote[] = symbols.map(([symbol, currency, previous, drift]) => {
  let price = previous;
  const prices = Array.from({ length: 78 }, (_, i) => {
    price *= 1 + drift / 78 + (random() - 0.5) * 0.006;
    return i === 0 ? previous : price;
  });
  return { symbol, currency, previous, prices };
});

const last = (quote: Quote) => quote.prices[quote.prices.length - 1];
const change = (quote: Quote) => last(quote) / quote.previous - 1;

export default function WatchlistDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const columns = useMemo((): TableColumn<Quote>[] => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 2,
      signDisplay: "exceptZero",
    });
    const money = (currency: string) =>
      new Intl.NumberFormat(locale, { style: "currency", currency });
    // green or red, like the trading apps
    const color = (quote: Quote) =>
      change(quote) >= 0 ? "var(--success-color)" : "var(--danger-color)";
    return [
      {
        key: "symbol",
        header: t("symbol"),
        render: (quote) => (
          <div style={{ display: "grid" }}>
            <strong>{quote.symbol}</strong>
            <small style={{ color: "var(--text-secondary-color)" }}>
              {t(\`companies.\${quote.symbol}\`)}
            </small>
          </div>
        ),
      },
      {
        key: "chart",
        header: t("today"),
        width: 140,
        render: (quote) => (
          <Sparkline
            data={quote.prices}
            type="area"
            color={color(quote)}
            // dashed line at the previous close
            reference={quote.previous}
            name={quote.symbol}
            format={(value) => money(quote.currency).format(value)}
            width={120}
            height={36}
            ariaLabel={t("intradayAria", { symbol: quote.symbol })}
          />
        ),
      },
      {
        key: "price",
        header: t("price"),
        align: "right",
        render: (quote) => money(quote.currency).format(last(quote)),
      },
      {
        key: "change",
        header: t("change"),
        align: "right",
        render: (quote) => (
          <span style={{ color: color(quote), fontWeight: 600 }}>
            {percent.format(change(quote))}
          </span>
        ),
      },
    ];
  }, [t, locale]);

  return (
    <Table
      aria-label={t("watchlist")}
      columns={columns}
      data={quotes}
      rowKey={(quote) => quote.symbol}
      hoverable
    />
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "minerva-design";
import { Sparkline, type ChartHoverEvent } from "minerva-design/charts";

// Average daily high (°C) of each month, January first
const cities = {
  reykjavik: [3, 3, 4, 6, 10, 12, 14, 14, 11, 7, 4, 3],
  montreal: [-5, -3, 2, 11, 19, 24, 26, 25, 20, 13, 6, -2],
  tokyo: [10, 10, 14, 19, 23, 26, 30, 31, 27, 22, 17, 12],
  cairo: [19, 21, 24, 28, 32, 34, 35, 35, 33, 30, 25, 21],
  singapore: [31, 32, 32, 32, 32, 31, 31, 31, 31, 31, 31, 30],
  sydney: [26, 26, 25, 23, 20, 18, 17, 18, 20, 22, 24, 25],
} as const;
type City = keyof typeof cities;

export default function WeatherDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const months = useMemo(() => {
    const short = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    const long = new Intl.DateTimeFormat(locale, {
      month: "long",
      timeZone: "UTC",
    });
    return Array.from({ length: 12 }, (_, m) => ({
      short: short.format(Date.UTC(2026, m, 1)),
      long: long.format(Date.UTC(2026, m, 1)),
    }));
  }, [locale]);

  // the hovered month by name instead of its index
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <span>
        {months[item.index]?.long}: <strong>{celsius(item.y)}</strong>
      </span>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
        width: "100%",
      }}
    >
      {(Object.keys(cities) as City[]).map((city, i) => {
        const values: readonly number[] = cities[city];
        const max = Math.max(...values);
        const min = Math.min(...values);
        const name = t(\`cities.\${city}\`);
        return (
          <Card key={city} padding="medium">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                {t("warmestColdest", {
                  max: celsius(max),
                  maxMonth: months[values.indexOf(max)]?.short,
                  min: celsius(min),
                  minMonth: months[values.indexOf(min)]?.short,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* every sparkline is scaled to its own range: compare the
                  shapes, and read the levels in the text above */}
              <Sparkline
                data={values}
                type="area"
                color={\`var(--chart-series-\${(i % 6) + 1})\`}
                // freezing point, when the city goes below it
                reference={min < 0 ? 0 : undefined}
                renderTooltip={tooltip}
                height={48}
                ariaLabel={t("weatherAria", { city: name })}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
`})))()}var ft,pt,mt;function ht(){return(ht=e((()=>{ce(),de(),me(),_e(),xe(),De(),Ae(),Le(),We(),Ke(),Je(),Xe(),Qe(),et(),$(),rt(),at(),st(),lt(),dt(),t(),re(),ae(),ft=n(),pt=ne(Object.assign({"./demos/basic.tsx":oe,"./demos/hover-value.tsx":ue,"./demos/inline.tsx":fe,"./demos/kpi-cards.tsx":ge,"./demos/periods.tsx":ye,"./demos/servers.tsx":Se,"./demos/step-goal.tsx":ke,"./demos/table.tsx":Me,"./demos/watchlist.tsx":ze,"./demos/weather.tsx":Ge}),Object.assign({"./demos/basic.tsx":qe,"./demos/hover-value.tsx":Ye,"./demos/inline.tsx":Ze,"./demos/kpi-cards.tsx":$e,"./demos/periods.tsx":tt,"./demos/servers.tsx":nt,"./demos/step-goal.tsx":it,"./demos/table.tsx":ot,"./demos/watchlist.tsx":ct,"./demos/weather.tsx":ut})),mt=()=>(0,ft.jsx)(ie,{id:`sparkline`,demos:pt})})))()}ht();export{mt as default};