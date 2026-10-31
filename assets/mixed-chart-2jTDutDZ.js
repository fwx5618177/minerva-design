import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{n as a,t as o}from"./Checkbox-Xe4Vj-fa.js";import{n as s,t as c}from"./Switch-CHbzff3y.js";import{l,n as u,t as d,u as f}from"./DocPage-BNEhhzRL.js";import{m as p,n as m}from"./charts-JJDQ3gS7.js";function ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,h.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return{points:n=>e(`points`,{value:t.format(n)}),day:new Intl.DateTimeFormat(n,{weekday:`short`,day:`numeric`})}},[n,e]),a=(0,h.useMemo)(()=>[e(`sprintStart`),...te.map(e=>i.day.format(e))],[e,i]),o=(0,h.useMemo)(()=>[{name:e(`remainingWork`),type:`area`,color:`var(--chart-series-1, #4f46e5)`,opacity:.18,format:i.points,data:x.map((e,t)=>[a[t]??``,e])},{name:e(`completedPerDay`),type:`bar`,color:`var(--success-color)`,format:i.points,data:y.map((e,t)=>[a[t]??``,e])},{name:e(`idealBurn`),type:`line`,color:`var(--text-secondary-color)`,lineWidth:1.5,format:i.points,data:a.map((e,t)=>[e,S(t)])}],[e,i,a]),s=b.findIndex(e=>e>0),c=(0,h.useMemo)(()=>[{type:`text`,x:s,y:(x[s]??0)+6,anchor:`bottom`,text:e(`scopeAdded`,{value:i.points(b[s]??0)}),color:`var(--warning-color)`,weight:600}],[e,i,s]),l=t=>{let n=t.items[0]?.index??-1,r=x[n],o=a[n];if(o===void 0)return null;if(r===void 0)return(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`strong`,{children:o}),(0,g.jsx)(`div`,{children:e(`idealLeft`,{value:i.points(S(n))})})]});let s=r-S(n);return(0,g.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,g.jsx)(`strong`,{children:o}),(0,g.jsx)(`span`,{children:e(`remainingLeft`,{value:i.points(r)})}),(0,g.jsx)(`span`,{children:e(`doneThatDay`,{value:i.points(y[n]??0)})}),(0,g.jsx)(`span`,{style:{color:s>0?`var(--danger-color)`:`var(--success-color)`},children:s>0?e(`behindBy`,{value:i.points(s)}):e(`aheadBy`,{value:i.points(-s)})})]})},u=x.length-1,d=y.slice(1).reduce((e,t)=>e+t,0)/u,f=x[u]??0,p=f-d*(v-u);return(0,g.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,g.jsx)(m,{series:o,annotations:c,renderTooltip:l,xAxis:{type:`category`,categories:a},yAxis:{title:e(`storyPoints`),format:i.points},height:320,ariaLabel:e(`burndownAria`)}),(0,g.jsx)(`p`,{style:{margin:0},children:p>0?e(`burndownLate`,{left:i.points(f),velocity:i.points(d),forecast:i.points(p)}):e(`burndownOnTrack`,{left:i.points(f),velocity:i.points(d)})})]})}var h,g,_,v,y,b,x,S,te;function ne(){return(ne=e((()=>{h=t(),i(),p(),g=n(),_=80,v=10,y=[0,5,8,3,6,9,4,11],b=[0,0,0,0,8,0,0,0],x=y.reduce((e,t,n)=>{let r=e[n-1]??_;return[...e,r-t+(b[n]??0)]},[]),S=e=>_*(1-e/v),te=Array.from({length:v},(e,t)=>new Date(2026,9,19+t+(t>=5?2:0)))})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,C.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`});return t=>e.format(t)},[n]),a=(0,C.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,C.useMemo)(()=>{let t=Array.from({length:12},(e,t)=>new Intl.DateTimeFormat(n,{month:`short`}).format(new Date(2026,t,1)));return[{name:e(`rainfall`),type:`bar`,color:`var(--chart-series-5, #0ea5e9)`,format:i,data:t.map((e,t)=>[e,ae[t]??0])},{name:e(`temperature`),type:`line`,curve:`smooth`,yAxis:`right`,color:`var(--chart-series-4, #ef4444)`,data:t.map((e,t)=>[e,oe[t]??0])}]},[e,n,i]);return(0,ie.jsx)(m,{series:o,yAxis:{format:i},yAxis2:{format:a,zero:!0},height:300,ariaLabel:e(`climateAria`)})}var C,ie,ae,oe;function se(){return(se=e((()=>{C=t(),i(),p(),ie=n(),ae=[52,56,118,125,138,168,154,168,210,198,93,51],oe=[5.4,6.1,9.4,14.3,18.8,21.9,25.7,26.9,23.3,18,12.5,7.7]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,w.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t)},[n]),a=(0,w.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,w.useMemo)(()=>[{name:e(`sessions`),type:`area`,curve:`smooth`,data:T.map(e=>[e.x,e.sessions])},{name:e(`conversionRate`),type:`line`,yAxis:`right`,color:`var(--chart-series-2, #10b981)`,data:T.map(e=>[e.x,e.rate])}],[e]);return(0,le.jsx)(m,{series:o,yAxis:{format:i},yAxis2:{format:a,zero:!0},annotations:[{type:`rect`,x0:new Date(2026,4,1).getTime(),x1:new Date(2026,4,8).getTime(),label:e(`campaign`),color:`var(--warning-color, #f59e0b)`}],height:320,ariaLabel:e(`conversionAria`)})}var w,le,T;function ue(){return(ue=e((()=>{w=t(),i(),p(),le=n(),T=Array.from({length:61},(e,t)=>{let n=[0,6].includes(new Date(2026,3,1+t).getDay()),r=+(t>=30&&t<37);return{x:new Date(2026,3,1+t),sessions:Math.round((n?21e3:15500)*(1+t/400)*(1+r*.6)),rate:(n?.031:.024)+r*.009+Math.sin(t*1.7)*.0015}})})))()}function de(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,[i,a]=(0,E.useState)(null),o=(0,E.useMemo)(()=>({units:new Intl.NumberFormat(n),date:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),days:new Intl.NumberFormat(n,{style:`unit`,unit:`day`,unitDisplay:`long`})}),[n]),s=(0,E.useMemo)(()=>[{id:`stock`,name:e(`stockLevel`),type:`area`,curve:`step`,color:`var(--chart-series-1, #4f46e5)`,opacity:.18,data:j.map((e,t)=>[N(t),e])},{id:`deliveries`,name:e(`deliveries`),type:`bar`,color:`var(--success-color)`,data:M.map(e=>[N(e.arrives),e.quantity])}],[e]),c=(0,E.useMemo)(()=>{let t={type:`rect`,x0:N(k[0]),x1:N(k[1]),color:`var(--warning-color)`,opacity:.1,label:e(`promotion`),labelPosition:`top-right`};return[{type:`rect`,y0:0,y1:ge,color:`var(--danger-color)`,opacity:.08,label:e(`safetyStock`),labelPosition:`bottom-right`},{type:`line`,axis:`y`,value:he,dash:[4,4],color:`var(--warning-color)`,label:e(`reorderPoint`)},t,...i===null?[]:[{type:`line`,axis:`x`,value:N(i),color:`var(--primary-color)`}]]},[e,i]);return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,D.jsx)(m,{series:s,annotations:c,onPointClick:e=>{let t=e.items[0];t&&a(Math.round((t.x-pe)/O))},onPlotClick:()=>a(null),tooltip:{mode:`axis`},xAxis:{type:`time`},yAxis:{title:e(`unitsInStock`),format:e=>o.units.format(e)},locale:n,height:320,ariaLabel:e(`inventoryAria`)}),(0,D.jsx)(`output`,{"aria-live":`polite`,children:(()=>{if(i===null)return e(`inventoryHint`);let t=M.find(e=>e.arrives===i);if(t)return e(`deliveryDetails`,{id:t.id,quantity:o.units.format(t.quantity),ordered:o.date.format(N(t.ordered)),arrived:o.date.format(N(t.arrives)),lead:o.days.format(t.arrives-t.ordered)});let n=j[i]??0,r={date:o.date.format(N(i)),units:o.units.format(n)};return e(n<=ge?`stockLow`:`stockOn`,r)})()})]})}var E,D,O,pe,me,he,ge,_e,k,A,j,M,N;function ve(){return(ve=e((()=>{E=t(),i(),p(),D=n(),O=864e5,pe=new Date(2026,6,1).getTime(),me=90,he=520,ge=200,_e=1400,k=[52,58],A=de(7),{stock:j,orders:M}=(()=>{let e=[],t=[],n=1250;for(let r=0;r<me;r++){let i=r>=k[0]&&r<=k[1],a=Math.round((i?95:48)*(.7+A()*.6));n+=t.filter(e=>e.arrives===r).reduce((e,t)=>e+t.quantity,0),n=Math.max(0,n-a);let o=t.some(e=>e.arrives>r);n<=he&&!o&&t.push({id:`PO-${4180+t.length*7}`,ordered:r,arrives:r+5+Math.floor(A()*5),quantity:_e}),e.push(n)}return{stock:e,orders:t.filter(e=>e.arrives<me)}})(),N=e=>pe+e*O})))()}function ye(){let{t:e}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),t=(0,be.useMemo)(()=>[{name:e(`pageViews`),type:`bar`,data:F.map(e=>({x:e.x,y:e.views}))},{name:e(`conversionRate`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2,data:F.map(e=>({x:e.x,y:e.rate}))}],[e]);return(0,P.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16,width:`100%`},children:Ce.map(({locale:n,key:r})=>(0,P.jsxs)(`figure`,{style:{margin:0,minWidth:0},children:[(0,P.jsx)(`figcaption`,{style:{marginBottom:4,fontSize:13,color:`var(--text-secondary-color)`},children:e(`locales.${r}`)}),(0,P.jsx)(m,{locale:n,series:t,xAxis:{type:`time`},yAxis2:{zero:!0},legend:{position:`bottom`},height:280,ariaLabel:e(`localeAria`,{locale:e(`locales.${r}`)})})]},n))})}var be,P,xe,Se,F,Ce;function we(){return(we=e((()=>{be=t(),i(),p(),P=n(),xe=864e5,Se=new Date(2026,0,1).getTime(),F=Array.from({length:90},(e,t)=>{let n=Math.sin(t/7*Math.PI*2)*.12,r=1+t/120;return{x:Se+t*xe,views:Math.round(186e3*r*(1+n)+t*7919%21e3),rate:Number((2.4+Math.sin(t/11)*.45+t*31%7/25).toFixed(2))}}),Ce=[{locale:`zh-CN`,key:`chinese`},{locale:`fr-FR`,key:`french`}]})))()}function Te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,I.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,I.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t)},[n]),o=(0,I.useMemo)(()=>new Intl.NumberFormat(n),[n]),s=(0,I.useMemo)(()=>[{name:e(`yearlyRevenue`),type:`bar`,format:i,data:L.map((e,t)=>[e,De[t]??0])},{name:e(`users`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2.5,format:e=>o.format(e),data:L.map((e,t)=>[e,Oe[t]??null])}],[e,i,o]);return(0,Ee.jsx)(m,{series:s,yAxis:{format:i,title:e(`yearlyRevenue`)},yAxis2:{type:`log`,format:a,title:e(`usersLog`)},height:320,ariaLabel:e(`logAria`)})}var I,Ee,L,De,Oe;function ke(){return(ke=e((()=>{I=t(),i(),p(),Ee=n(),L=Array.from({length:10},(e,t)=>String(2016+t)),De=[.4,1.1,2.6,5.2,9.8,17,26,38,51,66],Oe=[1200,6800,31e3,12e4,41e4,11e5,23e5,39e5,56e5,74e5]})))()}function Ae(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,[i,a]=(0,R.useState)({requests:!0,errors:!0,deploys:!0}),s=(0,R.useMemo)(()=>({requests:new Intl.NumberFormat(n,{notation:`compact`}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),time:new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`})}),[n]),c=(0,R.useMemo)(()=>{let t=e=>s.requests.format(e*1e3),n=e=>s.percent.format(e);return[{id:`requests`,name:e(`requests`),type:`bar`,color:`var(--chart-series-1, #4f46e5)`,opacity:.6,hidden:!i.requests,format:t,data:U.map(e=>[e.time,e.requests])},{id:`errors`,name:e(`errorRate`),type:`line`,yAxis:`right`,color:`var(--danger-color)`,lineWidth:2,hidden:!i.errors,format:n,data:U.map(e=>[e.time,e.errors])},{id:`deploys`,name:e(`releases`),type:`scatter`,yAxis:`right`,color:`var(--text-color, #1f2937)`,pointSize:9,showLabels:!0,hidden:!i.deploys,format:n,data:V.map(e=>({x:U[e.slot]?.time??B,y:U[e.slot]?.errors??0,label:e.version}))}]},[e,s,i]),l=U.reduce((e,t)=>t.errors>e.errors?t:e),u=e=>t=>a(n=>({...n,[e]:t}));return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,z.jsx)(o,{checked:i.requests,onChange:u(`requests`),label:e(`requests`)}),(0,z.jsx)(o,{checked:i.errors,onChange:u(`errors`),label:e(`errorRate`)}),(0,z.jsx)(o,{checked:i.deploys,onChange:u(`deploys`),label:e(`releases`)})]}),(0,z.jsx)(m,{series:c,legend:!1,tooltip:{mode:`axis`},xAxis:{type:`time`,format:e=>s.time.format(e)},yAxis:{title:e(`requestsPerHalfHour`),format:e=>s.requests.format(e*1e3)},yAxis2:{title:e(`errorRate`),min:0,format:e=>s.percent.format(e)},height:320,ariaLabel:e(`opsAria`)}),(0,z.jsx)(`p`,{style:{margin:0,color:`var(--text-secondary-color)`},children:e(`incidentSummary`,{peak:s.percent.format(l.errors),time:s.time.format(l.time),version:V[0]?.version??``,rollback:V[1]?.version??``})})]})}var R,z,Me,B,Ne,V,H,U;function Pe(){return(Pe=e((()=>{R=t(),i(),a(),p(),z=n(),Me=18e5,B=new Date(2026,9,29).getTime(),Ne=48,V=[{slot:20,version:`v2.14.0`},{slot:22,version:`v2.13.2`},{slot:31,version:`v2.14.1`}],H=Ae(503),U=Array.from({length:Ne},(e,t)=>{let n=t/2,r=40+260*Math.max(0,Math.sin((n-6)/24*2*Math.PI))+H()*25,i=t===20?.048:t===21?.031:0,a=.002+H()*.0015+i;return{time:B+t*Me,requests:r,errors:a}})})))()}function Fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,W.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`});return t=>e.format(t/100)},[n]),a=(0,W.useMemo)(()=>{let t=G.reduce((e,[,t])=>e+t,0),n=G.map((e,n)=>G.slice(0,n+1).reduce((e,[,t])=>e+t,0)/t*100);return[{name:e(`returns`),type:`bar`,color:`var(--primary-color, #4f46e5)`,data:G.map(([t,r],i)=>({x:e(`causes.${t}`),y:r,color:(n[i-1]??0)<80?`var(--primary-color, #4f46e5)`:`var(--border-color, #cbd5e1)`}))},{name:e(`cumulative`),type:`line`,yAxis:`right`,color:`var(--chart-series-4, #ef4444)`,format:i,data:G.map(([t],r)=>[e(`causes.${t}`),n[r]??0])}]},[e,i]);return(0,Ie.jsx)(m,{series:a,yAxis2:{min:0,max:100,nice:!1,format:i},height:320,ariaLabel:e(`paretoAria`)})}var W,Ie,G;function Le(){return(Le=e((()=>{W=t(),i(),p(),Ie=n(),G=[[`wrongSize`,412],[`damaged`,236],[`notAsDescribed`,151],[`late`,88],[`changedMind`,61],[`wrongItem`,37],[`other`,23]]})))()}function Re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,i=(0,K.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,K.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t)},[n]),o=(0,K.useMemo)(()=>{let t=q.map((t,n)=>e(`quarter`,{n:n%4+1,year:2025+Math.floor(n/4)}));return[{name:e(`revenue`),type:`bar`,format:i,data:t.map((e,t)=>[e,q[t]??0])},{name:e(`growth`),type:`line`,yAxis:`right`,color:`var(--chart-series-3, #f59e0b)`,lineWidth:2.5,data:t.map((e,t)=>[e,Be[t]??null])}]},[e,i]);return(0,ze.jsx)(m,{series:o,yAxis:{format:i,title:e(`revenue`)},yAxis2:{format:a,title:e(`growth`)},height:320,ariaLabel:e(`revenueAria`)})}var K,ze,q,Be;function Ve(){return(Ve=e((()=>{K=t(),i(),p(),ze=n(),q=[18.2,19.5,21.1,26.8,21.4,23.9,25.2,31.6],Be=q.map((e,t)=>t>=4?e/(q[t-4]??e)-1:null)})))()}function He(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.mixed-chart.data`}),n=t.language,[i,a]=(0,J.useState)(!0),o=(0,J.useMemo)(()=>qe(i),[i]),s=(0,J.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return{kwh:n=>e(`kwh`,{value:t.format(n)}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0})}},[n,e]),l=(0,J.useMemo)(()=>[{name:e(`solarProduction`),type:`bar`,color:`var(--warning-color)`,format:s.kwh,data:$.map(e=>[e.time,e.solar])},{name:e(`consumption`),type:`line`,color:`var(--text-color, #1f2937)`,format:s.kwh,data:$.map(e=>[e.time,e.load])},{name:e(`batteryCharge`),type:`area`,yAxis:`right`,color:`var(--success-color)`,opacity:.15,hidden:!i,format:e=>s.percent.format(e/100),data:$.map((e,t)=>[e.time,o.soc[t]??0])}],[e,s,i,o]),u=(0,J.useMemo)(()=>{let t=Z-X/2,n=Z+47.5*X;return[-1,0,1].map(r=>({type:`rect`,x0:Math.max(t,Z+(r*24+Ke)*X),x1:Math.min(n,Z+((r+1)*24+Ge)*X),color:`var(--text-secondary-color)`,opacity:.08,...r===0?{label:e(`night`)}:{}}))},[e]);return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:16},children:[(0,Y.jsx)(c,{checked:i,onChange:a,label:e(`withBattery`,{value:s.kwh(Q)})}),(0,Y.jsx)(`output`,{"aria-live":`polite`,children:e(`selfSufficiency`,{share:s.percent.format(1-o.imported/Je),imported:s.kwh(o.imported)})})]}),(0,Y.jsx)(m,{series:l,annotations:u,tooltip:{mode:`axis`},xAxis:{type:`time`},yAxis:{title:e(`energyPerHour`),format:s.kwh},yAxis2:{title:e(`batteryCharge`),min:0,max:100,nice:!1,format:e=>s.percent.format(e/100)},locale:n,height:340,ariaLabel:e(`solarAria`)})]})}var J,Y,X,Z,Ue,Q,We,Ge,Ke,$,qe,Je;function Ye(){return(Ye=e((()=>{J=t(),i(),s(),p(),Y=n(),X=36e5,Z=new Date(2026,5,20).getTime(),Ue=48,Q=10,We=4,Ge=5.5,Ke=21.5,$=Array.from({length:Ue},(e,t)=>{let n=t%24,r=Math.floor(t/24),i=Math.max(0,Math.sin((n-Ge)/16*Math.PI)),a=r===1?.4+.15*Math.sin(t*1.7):1,o=5.2*i**1.3*a,s=.35+.9*Math.exp(-((n-7.5)**2)/1.5)+1.6*Math.exp(-((n-19)**2)/3)+.5*Math.exp(-((n-12.5)**2)/2);return{time:Z+t*X,solar:o,load:s}}),qe=e=>{let t=Q*.3,n=0;return{soc:$.map(r=>{let i=r.solar-r.load;if(!e)return n+=Math.max(0,-i),0;if(i>0)t+=Math.min(i,We,Q-t);else{let e=Math.min(-i,We,t);t-=e,n+=-i-e}return t/Q*100}),imported:n}},Je=$.reduce((e,t)=>e+t.load,0)})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// A two-week sprint of 10 working days, 7 of them done: story points
// completed each day and a scope change on day 4
const COMMITTED = 80;
const SPRINT_DAYS = 10;
const completed = [0, 5, 8, 3, 6, 9, 4, 11];
const added = [0, 0, 0, 0, 8, 0, 0, 0];
const remaining = completed.reduce<number[]>((list, done, day) => {
  const before = list[day - 1] ?? COMMITTED;
  return [...list, before - done + (added[day] ?? 0)];
}, []);
const ideal = (day: number) => COMMITTED * (1 - day / SPRINT_DAYS);
// end of each working day: Monday 19 October 2026, weekends skipped
const workingDays = Array.from(
  { length: SPRINT_DAYS },
  (_, k) => new Date(2026, 9, 19 + k + (k >= 5 ? 2 : 0)),
);

export default function BurndownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      points: (value: number) => t("points", { value: number.format(value) }),
      day: new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "numeric",
      }),
    };
  }, [locale, t]);
  const labels = useMemo(
    () => [t("sprintStart"), ...workingDays.map((d) => formats.day.format(d))],
    [t, formats],
  );

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("remainingWork"),
        type: "area",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        format: formats.points,
        data: remaining.map((y, day) => [labels[day] ?? "", y] as const),
      },
      {
        name: t("completedPerDay"),
        type: "bar",
        color: "var(--success-color)",
        format: formats.points,
        data: completed.map((y, day) => [labels[day] ?? "", y] as const),
      },
      {
        name: t("idealBurn"),
        type: "line",
        color: "var(--text-secondary-color)",
        lineWidth: 1.5,
        format: formats.points,
        data: labels.map((label, day) => [label, ideal(day)] as const),
      },
    ],
    [t, formats, labels],
  );
  const scopeDay = added.findIndex((points) => points > 0);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "text",
        x: scopeDay,
        y: (remaining[scopeDay] ?? 0) + 6,
        anchor: "bottom",
        text: t("scopeAdded", {
          value: formats.points(added[scopeDay] ?? 0),
        }),
        color: "var(--warning-color)",
        weight: 600,
      },
    ],
    [t, formats, scopeDay],
  );

  // where the sprint stands on the hovered day compared with the ideal line
  const renderTooltip = (event: ChartHoverEvent) => {
    const day = event.items[0]?.index ?? -1;
    const left = remaining[day];
    const label = labels[day];
    if (label === undefined) return null;
    if (left === undefined) {
      return (
        <div>
          <strong>{label}</strong>
          <div>{t("idealLeft", { value: formats.points(ideal(day)) })}</div>
        </div>
      );
    }
    const gap = left - ideal(day);
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{label}</strong>
        <span>{t("remainingLeft", { value: formats.points(left) })}</span>
        <span>
          {t("doneThatDay", { value: formats.points(completed[day] ?? 0) })}
        </span>
        <span
          style={{
            color: gap > 0 ? "var(--danger-color)" : "var(--success-color)",
          }}
        >
          {gap > 0
            ? t("behindBy", { value: formats.points(gap) })
            : t("aheadBy", { value: formats.points(-gap) })}
        </span>
      </div>
    );
  };

  const today = remaining.length - 1;
  const velocity = completed.slice(1).reduce((sum, p) => sum + p, 0) / today;
  const left = remaining[today] ?? 0;
  const forecast = left - velocity * (SPRINT_DAYS - today);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <MixedChart
        series={series}
        annotations={annotations}
        renderTooltip={renderTooltip}
        xAxis={{ type: "category", categories: labels }}
        yAxis={{ title: t("storyPoints"), format: formats.points }}
        height={320}
        ariaLabel={t("burndownAria")}
      />
      <p style={{ margin: 0 }}>
        {forecast > 0
          ? t("burndownLate", {
              left: formats.points(left),
              velocity: formats.points(velocity),
              forecast: formats.points(forecast),
            })
          : t("burndownOnTrack", {
              left: formats.points(left),
              velocity: formats.points(velocity),
            })}
      </p>
    </div>
  );
}
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Climate of Tokyo: average rainfall (mm) and temperature (°C) per month
const rainfall = [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51];
const temperature = [
  5.4, 6.1, 9.4, 14.3, 18.8, 21.9, 25.7, 26.9, 23.3, 18.0, 12.5, 7.7,
];

export default function ClimateDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const mm = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millimeter",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const months = Array.from({ length: 12 }, (_, m) =>
      new Intl.DateTimeFormat(locale, { month: "short" }).format(
        new Date(2026, m, 1),
      ),
    );
    return [
      {
        name: t("rainfall"),
        type: "bar",
        color: "var(--chart-series-5, #0ea5e9)",
        format: mm,
        data: months.map((m, i) => [m, rainfall[i] ?? 0] as const),
      },
      {
        name: t("temperature"),
        type: "line",
        curve: "smooth",
        yAxis: "right",
        color: "var(--chart-series-4, #ef4444)",
        data: months.map((m, i) => [m, temperature[i] ?? 0] as const),
      },
    ];
  }, [t, locale, mm]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: mm }}
      yAxis2={{ format: celsius, zero: true }}
      height={300}
      ariaLabel={t("climateAria")}
    />
  );
}
`})))()}var et;function tt(){return(tt=e((()=>{et=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Daily sessions of an online shop over two months, and the share of them
// ending with an order: the weekly rhythm and a campaign in the middle
const days = Array.from({ length: 61 }, (_, d) => {
  const weekend = [0, 6].includes(new Date(2026, 3, 1 + d).getDay());
  const campaign = d >= 30 && d < 37 ? 1 : 0;
  return {
    x: new Date(2026, 3, 1 + d),
    sessions: Math.round(
      (weekend ? 21000 : 15500) * (1 + d / 400) * (1 + campaign * 0.6),
    ),
    rate:
      (weekend ? 0.031 : 0.024) + campaign * 0.009 + Math.sin(d * 1.7) * 0.0015,
  };
});

export default function ConversionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("sessions"),
        type: "area",
        curve: "smooth",
        data: days.map((d) => [d.x, d.sessions] as const),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-2, #10b981)",
        data: days.map((d) => [d.x, d.rate] as const),
      },
    ],
    [t],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: compact }}
      yAxis2={{ format: percent, zero: true }}
      annotations={[
        {
          type: "rect",
          x0: new Date(2026, 4, 1).getTime(),
          x1: new Date(2026, 4, 8).getTime(),
          label: t("campaign"),
          color: "var(--warning-color, #f59e0b)",
        },
      ]}
      height={320}
      ariaLabel={t("conversionAria")}
    />
  );
}
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartHoverEvent,
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
const START = new Date(2026, 6, 1).getTime();
const DAYS = 90;
const REORDER_POINT = 520;
const SAFETY_STOCK = 200;
const ORDER_QUANTITY = 1400;
const PROMO = [52, 58] as const; // a promotion doubles the demand

interface PurchaseOrder {
  id: string;
  ordered: number;
  arrives: number;
  quantity: number;
}

// Stock of one item at the end of each day: the warehouse orders a fixed
// quantity when the stock falls under the reorder point, and the supplier
// delivers after a lead time of 5 to 9 days
const random = mulberry32(7);
const { stock, orders } = (() => {
  const levels: number[] = [];
  const placed: PurchaseOrder[] = [];
  let level = 1250;
  for (let day = 0; day < DAYS; day++) {
    const promo = day >= PROMO[0] && day <= PROMO[1];
    const demand = Math.round((promo ? 95 : 48) * (0.7 + random() * 0.6));
    level += placed
      .filter((po) => po.arrives === day)
      .reduce((sum, po) => sum + po.quantity, 0);
    level = Math.max(0, level - demand);
    const pending = placed.some((po) => po.arrives > day);
    if (level <= REORDER_POINT && !pending) {
      placed.push({
        id: \`PO-\${4180 + placed.length * 7}\`,
        ordered: day,
        arrives: day + 5 + Math.floor(random() * 5),
        quantity: ORDER_QUANTITY,
      });
    }
    levels.push(level);
  }
  return {
    stock: levels,
    orders: placed.filter((po) => po.arrives < DAYS),
  };
})();
const time = (day: number) => START + day * DAY;

export default function InventoryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [picked, setPicked] = useState<number | null>(null);

  const formats = useMemo(
    () => ({
      units: new Intl.NumberFormat(locale),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
    }),
    [locale],
  );

  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "stock",
        name: t("stockLevel"),
        type: "area",
        curve: "step",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        data: stock.map((units, day) => [time(day), units] as const),
      },
      {
        id: "deliveries",
        name: t("deliveries"),
        type: "bar",
        color: "var(--success-color)",
        data: orders.map((po) => [time(po.arrives), po.quantity] as const),
      },
    ],
    [t],
  );
  const annotations = useMemo((): ChartAnnotation[] => {
    const promo: ChartAnnotation = {
      type: "rect",
      x0: time(PROMO[0]),
      x1: time(PROMO[1]),
      color: "var(--warning-color)",
      opacity: 0.1,
      label: t("promotion"),
      labelPosition: "top-right",
    };
    return [
      {
        type: "rect",
        y0: 0,
        y1: SAFETY_STOCK,
        color: "var(--danger-color)",
        opacity: 0.08,
        label: t("safetyStock"),
        labelPosition: "bottom-right",
      },
      {
        type: "line",
        axis: "y",
        value: REORDER_POINT,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("reorderPoint"),
      },
      promo,
      ...(picked === null
        ? []
        : [
            {
              type: "line" as const,
              axis: "x" as const,
              value: time(picked),
              color: "var(--primary-color)",
            },
          ]),
    ];
  }, [t, picked]);

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setPicked(Math.round((item.x - START) / DAY));
  };

  const readout = () => {
    if (picked === null) return t("inventoryHint");
    const delivery = orders.find((po) => po.arrives === picked);
    if (delivery) {
      return t("deliveryDetails", {
        id: delivery.id,
        quantity: formats.units.format(delivery.quantity),
        ordered: formats.date.format(time(delivery.ordered)),
        arrived: formats.date.format(time(delivery.arrives)),
        lead: formats.days.format(delivery.arrives - delivery.ordered),
      });
    }
    const units = stock[picked] ?? 0;
    const values = {
      date: formats.date.format(time(picked)),
      units: formats.units.format(units),
    };
    return units <= SAFETY_STOCK ? t("stockLow", values) : t("stockOn", values);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <MixedChart
        series={series}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setPicked(null)}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{
          title: t("unitsInStock"),
          format: (y) => formats.units.format(y),
        }}
        locale={locale}
        height={320}
        ariaLabel={t("inventoryAria")}
      />
      <output aria-live="polite">{readout()}</output>
    </div>
  );
}
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// 90 days of page views (hundreds of thousands) and the conversion rate (%)
const DAY = 86_400_000;
const start = new Date(2026, 0, 1).getTime();
const days = Array.from({ length: 90 }, (_, i) => {
  const weekly = Math.sin((i / 7) * Math.PI * 2) * 0.12;
  const trend = 1 + i / 120;
  return {
    x: start + i * DAY,
    views: Math.round(186_000 * trend * (1 + weekly) + ((i * 7919) % 21_000)),
    rate: Number(
      (2.4 + Math.sin(i / 11) * 0.45 + ((i * 31) % 7) / 25).toFixed(2),
    ),
  };
});

// The same chart in two locales: compact units (万 / k), separators and dates
const LOCALES = [
  { locale: "zh-CN", key: "chinese" },
  { locale: "fr-FR", key: "french" },
] as const;

export default function LocaleDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("pageViews"),
        type: "bar",
        data: days.map((d) => ({ x: d.x, y: d.views })),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2,
        data: days.map((d) => ({ x: d.x, y: d.rate })),
      },
    ],
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {LOCALES.map(({ locale, key }) => (
        <figure key={locale} style={{ margin: 0, minWidth: 0 }}>
          <figcaption
            style={{
              marginBottom: 4,
              fontSize: 13,
              color: "var(--text-secondary-color)",
            }}
          >
            {t(\`locales.\${key}\`)}
          </figcaption>
          <MixedChart
            locale={locale}
            series={series}
            xAxis={{ type: "time" }}
            yAxis2={{ zero: true }}
            legend={{ position: "bottom" }}
            height={280}
            ariaLabel={t("localeAria", { locale: t(\`locales.\${key}\`) })}
          />
        </figure>
      ))}
    </div>
  );
}
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Ten years of a software company: yearly revenue (M$) grows 160-fold, its
// users 6,000-fold; a log right axis keeps both the first years and the last
// ones readable
const years = Array.from({ length: 10 }, (_, i) => String(2016 + i));
const revenue = [0.4, 1.1, 2.6, 5.2, 9.8, 17, 26, 38, 51, 66];
const users = [
  1_200, 6_800, 31_000, 120_000, 410_000, 1_100_000, 2_300_000, 3_900_000,
  5_600_000, 7_400_000,
];

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("yearlyRevenue"),
        type: "bar",
        format: usd,
        data: years.map((year, i) => [year, revenue[i] ?? 0] as const),
      },
      {
        name: t("users"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        format: (value) => number.format(value),
        data: years.map((year, i) => [year, users[i] ?? null] as const),
      },
    ],
    [t, usd, number],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("yearlyRevenue") }}
      // decades: 1k, 10k, 100k, 1M, 10M
      yAxis2={{ type: "log", format: compact, title: t("usersLog") }}
      height={320}
      ariaLabel={t("logAria")}
    />
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "minerva-design";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SLOT = 30 * 60 * 1000;
const START = new Date(2026, 9, 29).getTime(); // local midnight
const SLOTS = 48;
// releases of the day (slot index and version); the first one was rolled back
const DEPLOYS = [
  { slot: 20, version: "v2.14.0" },
  { slot: 22, version: "v2.13.2" },
  { slot: 31, version: "v2.14.1" },
];

// Requests (thousands per half hour) and share of 5xx answers of a web API
const random = mulberry32(503);
const slots = Array.from({ length: SLOTS }, (_, i) => {
  const hour = i / 2;
  const daily = Math.max(0, Math.sin(((hour - 6) / 24) * 2 * Math.PI));
  const requests = 40 + 260 * daily + random() * 25;
  // the faulty release (slots 20 and 21) makes the error rate jump
  const incident = i === 20 ? 0.048 : i === 21 ? 0.031 : 0;
  const errors = 0.002 + random() * 0.0015 + incident;
  return { time: START + i * SLOT, requests, errors };
});

type SeriesKey = "requests" | "errors" | "deploys";

export default function OpsOverviewDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({
    requests: true,
    errors: true,
    deploys: true,
  });

  const formats = useMemo(
    () => ({
      requests: new Intl.NumberFormat(locale, { notation: "compact" }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),
    [locale],
  );

  const series = useMemo((): ChartSeries[] => {
    const requests = (y: number) => formats.requests.format(y * 1000);
    const percent = (y: number) => formats.percent.format(y);
    return [
      {
        id: "requests",
        name: t("requests"),
        type: "bar",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.6,
        hidden: !visible.requests,
        format: requests,
        data: slots.map((s) => [s.time, s.requests] as const),
      },
      {
        id: "errors",
        name: t("errorRate"),
        type: "line",
        yAxis: "right",
        color: "var(--danger-color)",
        lineWidth: 2,
        hidden: !visible.errors,
        format: percent,
        data: slots.map((s) => [s.time, s.errors] as const),
      },
      {
        // one dot per release on the error rate, its version written next to it
        id: "deploys",
        name: t("releases"),
        type: "scatter",
        yAxis: "right",
        color: "var(--text-color, #1f2937)",
        pointSize: 9,
        showLabels: true,
        hidden: !visible.deploys,
        format: percent,
        data: DEPLOYS.map((d) => ({
          x: slots[d.slot]?.time ?? START,
          y: slots[d.slot]?.errors ?? 0,
          label: d.version,
        })),
      },
    ];
  }, [t, formats, visible]);

  const peak = slots.reduce((max, s) => (s.errors > max.errors ? s : max));
  const toggle = (key: SeriesKey) => (checked: boolean) =>
    setVisible((current) => ({ ...current, [key]: checked }));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Checkbox
          checked={visible.requests}
          onChange={toggle("requests")}
          label={t("requests")}
        />
        <Checkbox
          checked={visible.errors}
          onChange={toggle("errors")}
          label={t("errorRate")}
        />
        <Checkbox
          checked={visible.deploys}
          onChange={toggle("deploys")}
          label={t("releases")}
        />
      </div>
      <MixedChart
        series={series}
        legend={false}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time", format: (x) => formats.time.format(x) }}
        yAxis={{
          title: t("requestsPerHalfHour"),
          format: (y) => formats.requests.format(y * 1000),
        }}
        yAxis2={{
          title: t("errorRate"),
          min: 0,
          format: (y) => formats.percent.format(y),
        }}
        height={320}
        ariaLabel={t("opsAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("incidentSummary", {
          peak: formats.percent.format(peak.errors),
          time: formats.time.format(peak.time),
          version: DEPLOYS[0]?.version ?? "",
          rollback: DEPLOYS[1]?.version ?? "",
        })}
      </p>
    </div>
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Returns of the last quarter by cause: a Pareto chart sorts the causes and
// adds their cumulative share, the few causes behind 80% stand out
const causes = [
  ["wrongSize", 412],
  ["damaged", 236],
  ["notAsDescribed", 151],
  ["late", 88],
  ["changedMind", 61],
  ["wrongItem", 37],
  ["other", 23],
] as const;

export default function ParetoDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { style: "percent" });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const total = causes.reduce((sum, [, n]) => sum + n, 0);
    const cumulative = causes.map(
      (_, i) =>
        (causes.slice(0, i + 1).reduce((sum, [, n]) => sum + n, 0) / total) *
        100,
    );
    return [
      {
        name: t("returns"),
        type: "bar",
        color: "var(--primary-color, #4f46e5)",
        data: causes.map(([key, n], i) => ({
          x: t(\`causes.\${key}\`),
          y: n,
          // the vital few: the causes reaching 80% together
          color:
            (cumulative[i - 1] ?? 0) < 80
              ? "var(--primary-color, #4f46e5)"
              : "var(--border-color, #cbd5e1)",
        })),
      },
      {
        name: t("cumulative"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-4, #ef4444)",
        format: percent,
        data: causes.map(
          ([key], i) => [t(\`causes.\${key}\`), cumulative[i] ?? 0] as const,
        ),
      },
    ];
  }, [t, percent]);

  return (
    <MixedChart
      series={series}
      yAxis2={{ min: 0, max: 100, nice: false, format: percent }}
      height={320}
      ariaLabel={t("paretoAria")}
    />
  );
}
`})))()}var ft;function pt(){return(pt=e((()=>{ft=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Quarterly revenue (M$) and its growth over the same quarter of last year
const revenue = [18.2, 19.5, 21.1, 26.8, 21.4, 23.9, 25.2, 31.6];
const growth = revenue.map((value, i) =>
  i >= 4 ? value / (revenue[i - 4] ?? value) - 1 : null,
);

export default function RevenueGrowthDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const quarters = revenue.map((_, i) =>
      t("quarter", { n: (i % 4) + 1, year: 2025 + Math.floor(i / 4) }),
    );
    return [
      {
        name: t("revenue"),
        type: "bar",
        format: usd,
        data: quarters.map((q, i) => [q, revenue[i] ?? 0] as const),
      },
      {
        name: t("growth"),
        type: "line",
        // plotted against yAxis2, formatted with its own format
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        data: quarters.map((q, i) => [q, growth[i] ?? null] as const),
      },
    ];
  }, [t, usd]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("revenue") }}
      yAxis2={{ format: percent, title: t("growth") }}
      height={320}
      ariaLabel={t("revenueAria")}
    />
  );
}
`})))()}var mt;function ht(){return(ht=e((()=>{mt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const HOUR = 60 * 60 * 1000;
const START = new Date(2026, 5, 20).getTime(); // local midnight
const HOURS = 48;
const CAPACITY = 10; // kWh of the home battery
const MAX_RATE = 4; // kW of charge or discharge
const SUNRISE = 5.5;
const SUNSET = 21.5;

// A house with 6 kWp of solar panels over two days, the second one cloudy:
// production and consumption in kWh per hour
const hours = Array.from({ length: HOURS }, (_, i) => {
  const hour = i % 24;
  const day = Math.floor(i / 24);
  const sun = Math.max(
    0,
    Math.sin(((hour - SUNRISE) / (SUNSET - SUNRISE)) * Math.PI),
  );
  const clouds = day === 1 ? 0.4 + 0.15 * Math.sin(i * 1.7) : 1;
  const solar = 5.2 * sun ** 1.3 * clouds;
  // base load, breakfast, cooking and evening peaks
  const load =
    0.35 +
    0.9 * Math.exp(-((hour - 7.5) ** 2) / 1.5) +
    1.6 * Math.exp(-((hour - 19) ** 2) / 3) +
    0.5 * Math.exp(-((hour - 12.5) ** 2) / 2);
  return { time: START + i * HOUR, solar, load };
});

// state of charge hour by hour: surplus charges the battery, deficit drains it
const simulate = (battery: boolean) => {
  let charge = CAPACITY * 0.3;
  let imported = 0;
  const soc = hours.map((h) => {
    const balance = h.solar - h.load;
    if (!battery) {
      imported += Math.max(0, -balance);
      return 0;
    }
    if (balance > 0) {
      charge += Math.min(balance, MAX_RATE, CAPACITY - charge);
    } else {
      const drawn = Math.min(-balance, MAX_RATE, charge);
      charge -= drawn;
      imported += -balance - drawn;
    }
    return (charge / CAPACITY) * 100;
  });
  return { soc, imported };
};
const consumed = hours.reduce((sum, h) => sum + h.load, 0);

export default function SolarBatteryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [battery, setBattery] = useState(true);

  const result = useMemo(() => simulate(battery), [battery]);
  const formats = useMemo(() => {
    const kwh = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      kwh: (value: number) => t("kwh", { value: kwh.format(value) }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    };
  }, [locale, t]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("solarProduction"),
        type: "bar",
        color: "var(--warning-color)",
        format: formats.kwh,
        data: hours.map((h) => [h.time, h.solar] as const),
      },
      {
        name: t("consumption"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        format: formats.kwh,
        data: hours.map((h) => [h.time, h.load] as const),
      },
      {
        name: t("batteryCharge"),
        type: "area",
        yAxis: "right",
        color: "var(--success-color)",
        opacity: 0.15,
        // without a battery the series stays in the legend, greyed out
        hidden: !battery,
        format: (y) => formats.percent.format(y / 100),
        data: hours.map((h, i) => [h.time, result.soc[i] ?? 0] as const),
      },
    ],
    [t, formats, battery, result],
  );
  // the nights, from sunset to the next sunrise, cut to the data range
  const annotations = useMemo((): ChartAnnotation[] => {
    const first = START - HOUR / 2;
    const last = START + (HOURS - 0.5) * HOUR;
    return [-1, 0, 1].map((day) => ({
      type: "rect" as const,
      x0: Math.max(first, START + (day * 24 + SUNSET) * HOUR),
      x1: Math.min(last, START + ((day + 1) * 24 + SUNRISE) * HOUR),
      color: "var(--text-secondary-color)",
      opacity: 0.08,
      ...(day === 0 ? { label: t("night") } : {}),
    }));
  }, [t]);

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
        <Switch
          checked={battery}
          onChange={setBattery}
          label={t("withBattery", { value: formats.kwh(CAPACITY) })}
        />
        <output aria-live="polite">
          {t("selfSufficiency", {
            share: formats.percent.format(1 - result.imported / consumed),
            imported: formats.kwh(result.imported),
          })}
        </output>
      </div>
      <MixedChart
        series={series}
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{ title: t("energyPerHour"), format: formats.kwh }}
        yAxis2={{
          title: t("batteryCharge"),
          min: 0,
          max: 100,
          nice: false,
          format: (y) => formats.percent.format(y / 100),
        }}
        locale={locale}
        height={340}
        ariaLabel={t("solarAria")}
      />
    </div>
  );
}
`})))()}var gt,_t,vt;function yt(){return(yt=e((()=>{ne(),se(),ue(),ve(),we(),ke(),Pe(),Le(),Ve(),Ye(),Ze(),$e(),tt(),rt(),at(),st(),lt(),dt(),pt(),ht(),t(),u(),f(),gt=n(),_t=l(Object.assign({"./demos/burndown.tsx":ee,"./demos/climate.tsx":re,"./demos/conversion.tsx":ce,"./demos/inventory.tsx":fe,"./demos/locale.tsx":ye,"./demos/log-scale.tsx":Te,"./demos/ops-overview.tsx":je,"./demos/pareto.tsx":Fe,"./demos/revenue-growth.tsx":Re,"./demos/solar-battery.tsx":He}),Object.assign({"./demos/burndown.tsx":Xe,"./demos/climate.tsx":Qe,"./demos/conversion.tsx":et,"./demos/inventory.tsx":nt,"./demos/locale.tsx":it,"./demos/log-scale.tsx":ot,"./demos/ops-overview.tsx":ct,"./demos/pareto.tsx":ut,"./demos/revenue-growth.tsx":ft,"./demos/solar-battery.tsx":mt})),vt=()=>(0,gt.jsx)(d,{id:`mixed-chart`,demos:_t})})))()}yt();export{vt as default};