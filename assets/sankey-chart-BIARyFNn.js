import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{i as p,r as m}from"./Stack-B3Kr9X_e.js";import{l as ee,n as h,t as te,u as ne}from"./DocPage-BNEhhzRL.js";import{c as g,s as _}from"./shapes-B5QcpBlT.js";function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),n=t.language,i=(0,v.useMemo)(()=>y.map(({key:t,color:n})=>({name:e(`budget.${t}`),...n?{color:n}:{}})),[e]),a=(0,v.useMemo)(()=>ae.map(([e,t,n])=>({source:b.indexOf(e),target:b.indexOf(t),value:n})),[]),o=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e6)},[n]);return(0,ie.jsx)(_,{nodes:i,links:a,format:o,linkColor:`target`,linkOpacity:.35,nodeWidth:10,height:440,ariaLabel:e(`budgetAria`)})}var v,ie,y,ae,b;function oe(){return(oe=e((()=>{v=t(),i(),g(),ie=n(),y=[{key:`licenses`},{key:`subscriptions`},{key:`services`},{key:`grants`},{key:`budget`,color:`#64748b`},{key:`rnd`,color:`#6366f1`},{key:`sales`,color:`#f59e0b`},{key:`operations`,color:`#10b981`},{key:`admin`,color:`#ec4899`},{key:`platform`,color:`#818cf8`},{key:`mobile`,color:`#818cf8`},{key:`ai`,color:`#818cf8`},{key:`campaigns`,color:`#fbbf24`},{key:`salesTeam`,color:`#fbbf24`},{key:`infrastructure`,color:`#34d399`},{key:`support`,color:`#34d399`},{key:`finance`,color:`#f472b6`},{key:`offices`,color:`#f472b6`}],ae=[[`licenses`,`budget`,18.4],[`subscriptions`,`budget`,42.6],[`services`,`budget`,9.2],[`grants`,`budget`,2.8],[`budget`,`rnd`,29.5],[`budget`,`sales`,21.3],[`budget`,`operations`,13.7],[`budget`,`admin`,8.5],[`rnd`,`platform`,12.8],[`rnd`,`mobile`,7.9],[`rnd`,`ai`,8.8],[`sales`,`campaigns`,9.6],[`sales`,`salesTeam`,11.7],[`operations`,`infrastructure`,8.1],[`operations`,`support`,5.6],[`admin`,`finance`,4.4],[`admin`,`offices`,4.1]],b=y.map(e=>e.key)})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),n=t.language,i=(0,x.useMemo)(()=>le.map(({key:t,color:n})=>({name:e(`energy.${t}`),color:n})),[e]),a=(0,x.useMemo)(()=>ue.map(([e,t,n])=>({source:de(e),target:de(t),value:n})),[]),o=(0,x.useMemo)(()=>{let t=new Intl.NumberFormat(n);return n=>e(`twh`,{value:t.format(n)})},[n,e]);return(0,ce.jsx)(_,{nodes:i,links:a,format:o,height:420,ariaLabel:e(`energyAria`)})}var x,ce,le,ue,de;function fe(){return(fe=e((()=>{x=t(),i(),g(),ce=n(),le=[{key:`solar`,color:`#f59e0b`},{key:`wind`,color:`#38bdf8`},{key:`hydro`,color:`#0284c7`},{key:`nuclear`,color:`#a855f7`},{key:`gas`,color:`#f97316`},{key:`coal`,color:`#64748b`},{key:`oil`,color:`#92400e`},{key:`electricity`,color:`#eab308`},{key:`heat`,color:`#ef4444`},{key:`fuels`,color:`#b45309`},{key:`homes`,color:`#10b981`},{key:`industry`,color:`#6366f1`},{key:`services`,color:`#14b8a6`},{key:`transport`,color:`#ec4899`},{key:`losses`,color:`#94a3b8`}],ue=[[`solar`,`electricity`,62],[`wind`,`electricity`,138],[`hydro`,`electricity`,54],[`nuclear`,`electricity`,182],[`gas`,`electricity`,96],[`coal`,`electricity`,48],[`gas`,`heat`,58],[`gas`,`homes`,142],[`gas`,`industry`,104],[`coal`,`industry`,36],[`oil`,`fuels`,420],[`electricity`,`homes`,168],[`electricity`,`industry`,152],[`electricity`,`services`,124],[`electricity`,`transport`,22],[`electricity`,`losses`,114],[`heat`,`homes`,36],[`heat`,`services`,22],[`fuels`,`transport`,348],[`fuels`,`industry`,42],[`fuels`,`losses`,30]],de=e=>le.findIndex(t=>t.key===e)})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),[n,i]=(0,S.useState)(!0),a=(0,S.useMemo)(()=>new Intl.NumberFormat(t.language),[t.language]),o=(0,S.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}),[t.language]),s=(0,S.useMemo)(()=>e=>a.format(e),[a]),c=(0,S.useMemo)(()=>w.filter(([,e])=>n||!me.has(e)),[n]),l=(0,S.useMemo)(()=>[...new Set(c.flatMap(([e,t])=>[e,t]))].map(t=>({name:e(`hiring.${t}`),...T[t]?{color:T[t]}:{}})),[c,e]),u=(0,S.useMemo)(()=>c.map(([t,n,r])=>({source:e(`hiring.${t}`),target:e(`hiring.${n}`),value:r})),[c,e]),d=he.reduce((e,t)=>e+E(t),0),p=w.find(([,e])=>e===`hired`)[2];return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,C.jsx)(f,{checked:n,onChange:i,label:e(`hiring.showDropOffs`)}),(0,C.jsx)(_,{nodes:l,links:u,format:s,align:`left`,linkColor:n?`target`:`source`,labelValues:!0,height:400,ariaLabel:e(`hiring.aria`)}),(0,C.jsx)(`output`,{"aria-live":`polite`,children:e(`hiring.summary`,{applied:a.format(d),hired:a.format(p),rate:o.format(p/d),interview:o.format(E(`interview`)/E(`screen`)),accepted:o.format(p/E(`offer`))})})]})}var S,C,me,he,w,T,E;function ge(){return(ge=e((()=>{S=t(),i(),d(),g(),C=n(),me=new Set([`cvRejected`,`screenOut`,`interviewOut`,`declined`]),he=[`referrals`,`jobBoards`,`linkedin`,`agencies`,`campus`],w=[[`referrals`,`applied`,210],[`jobBoards`,`applied`,1480],[`linkedin`,`applied`,860],[`agencies`,`applied`,190],[`campus`,`applied`,540],[`applied`,`cvRejected`,2150],[`applied`,`screen`,1130],[`screen`,`screenOut`,690],[`screen`,`interview`,440],[`interview`,`interviewOut`,362],[`interview`,`offer`,78],[`offer`,`declined`,14],[`offer`,`hired`,64]],T={hired:`var(--success-color)`,cvRejected:`var(--text-muted-color)`,screenOut:`var(--text-muted-color)`,interviewOut:`var(--text-muted-color)`,declined:`var(--text-muted-color)`},E=e=>w.filter(([t])=>t===e).reduce((e,[,,t])=>e+t,0)})))()}function _e(){let e=M.reduce((e,[,t])=>e+t,0),t=e-N,n=t-P.reduce((e,[,t])=>e+t,0),r=Math.round(n*ye),i=[...M.map(([e,t])=>[e,`revenue`,t,`in`]),[`revenue`,`cogs`,N,`cost`],[`revenue`,`gross`,t,`profit`],...P.map(([e,t])=>[`gross`,e,t,`cost`]),[`gross`,`operating`,n,`profit`],[`operating`,`tax`,r,`cost`],[`operating`,`net`,n-r,`profit`]];return{revenue:e,gross:t,operating:n,net:n-r,flows:i}}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),n=t.language,{revenue:i,gross:a,operating:o,net:s,flows:c}=be,l=(0,D.useMemo)(()=>j.map(({key:t,color:n})=>({name:e(`pnl.${t}`),color:n})),[e]),u=(0,D.useMemo)(()=>c.map(([e,t,n,r])=>({source:F.indexOf(e),target:F.indexOf(t),value:n,...r===`profit`?{color:k}:{},...r===`cost`?{color:A}:{}})),[c]),d=(0,D.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),[n]),f=(0,D.useMemo)(()=>e=>d.format(e*1e6),[d]),p=(0,D.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,O.jsx)(_,{nodes:l,links:u,format:f,linkColor:`source`,linkOpacity:.4,nodeWidth:14,height:420,ariaLabel:e(`pnl.aria`)}),(0,O.jsx)(`p`,{style:{margin:0,color:`var(--text-secondary-color)`,fontSize:14},children:e(`pnl.margins`,{gross:p.format(a/i),operating:p.format(o/i),net:p.format(s/i)})})]})}var D,O,k,A,j,M,N,P,ye,F,be;function xe(){return(xe=e((()=>{D=t(),i(),g(),O=n(),k=`var(--success-color)`,A=`var(--danger-color)`,j=[{key:`cloud`,color:`var(--chart-series-1)`},{key:`licenses`,color:`var(--chart-series-2)`},{key:`hardware`,color:`var(--chart-series-3)`},{key:`services`,color:`var(--chart-series-4)`},{key:`revenue`,color:`var(--text-secondary-color)`},{key:`cogs`,color:A},{key:`gross`,color:k},{key:`rnd`,color:A},{key:`sales`,color:A},{key:`admin`,color:A},{key:`operating`,color:k},{key:`tax`,color:A},{key:`net`,color:k}],M=[[`cloud`,412],[`licenses`,186],[`hardware`,94],[`services`,58]],N=268,P=[[`rnd`,141],[`sales`,98],[`admin`,47]],ye=.21,F=j.map(e=>e.key),be=_e()})))()}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),[n,i]=(0,I.useState)(null),a=(0,I.useMemo)(()=>new Intl.NumberFormat(t.language),[t.language]),o=(0,I.useMemo)(()=>e=>a.format(e),[a]),s=(0,I.useMemo)(()=>R.map(t=>({name:e(`journey.${t}`)})),[e]),c=(0,I.useMemo)(()=>Ce.map(([e,t,n])=>({source:R.indexOf(e),target:R.indexOf(t),value:n})),[]);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,L.jsx)(_,{nodes:s,links:c,align:`left`,linkColor:`source`,format:o,onClick:i,height:400,ariaLabel:e(`journeyAria`)}),(0,L.jsx)(`p`,{role:`status`,style:{margin:0},children:n?n.source&&n.target?e(`journeyLink`,{source:n.source,target:n.target,value:a.format(n.value),share:(n.percent*100).toFixed(1)}):e(`journeyNode`,{name:n.name,value:a.format(n.value)}):e(`journeyHint`)})]})}var I,L,R,Ce;function we(){return(we=e((()=>{I=t(),i(),g(),L=n(),R=[`searchAds`,`organic`,`newsletter`,`social`,`home`,`pricing`,`blog`,`signup`,`left`,`trial`,`abandoned`,`paid`,`expired`],Ce=[[`searchAds`,`home`,4200],[`searchAds`,`pricing`,2600],[`organic`,`home`,3800],[`organic`,`blog`,5200],[`newsletter`,`blog`,1900],[`newsletter`,`pricing`,900],[`social`,`blog`,2400],[`social`,`home`,1100],[`home`,`signup`,3100],[`home`,`left`,6e3],[`pricing`,`signup`,2100],[`pricing`,`left`,1400],[`blog`,`signup`,1300],[`blog`,`left`,8200],[`signup`,`trial`,4700],[`signup`,`abandoned`,1800],[`trial`,`paid`,1300],[`trial`,`expired`,3400]]})))()}function Te(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ee(e){let t=Te(e*7919+17),n=[],r=0;for(let[i,a]of V){let o=a*(1+.15*Math.sin(e/6+a)+.08*(t()-.5));n.push([`client.${i}`,`gateway`,o]),r+=o}let i=0;for(let[a,o]of H){let s=r*o*(1+.1*(t()-.5));n.push([`gateway`,`service.${a}`,s]);let c=s*(a===`checkout`&&e%20>=14?.12:.004+.006*t()),l=s*(.02+.03*t());n.push([`service.${a}`,`status.ok`,s-c-l]),n.push([`service.${a}`,`status.clientError`,l]),n.push([`service.${a}`,`status.serverError`,c]),i+=c}return{flows:n,total:n.filter(([e])=>e===`gateway`).reduce((e,[,,t])=>e+t,0),serverErrors:i}}function De(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),[n,i]=(0,z.useState)(0),[a,s]=(0,z.useState)(!0);(0,z.useEffect)(()=>{if(!a)return;let e=setInterval(()=>i(e=>e+1),1500);return()=>clearInterval(e)},[a]);let{flows:c,total:l,serverErrors:u}=(0,z.useMemo)(()=>Ee(n),[n]),d=(0,z.useMemo)(()=>{let n=new Intl.NumberFormat(t.language,{maximumFractionDigits:0});return t=>e(`traffic.rps`,{value:n.format(t)})},[t.language,e]),f=(0,z.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:2}),[t.language]),m=(0,z.useMemo)(()=>[...V.map(([t])=>({name:e(`traffic.client.${t}`)})),{name:e(`traffic.gateway`),color:`var(--text-secondary-color)`},...H.map(([t])=>({name:e(`traffic.service.${t}`)})),...Oe.map(([t,n])=>({name:e(`traffic.status.${t}`),color:n}))],[e]),ee=(0,z.useMemo)(()=>c.map(([t,n,r])=>({source:e(`traffic.${t}`),target:e(`traffic.${n}`),value:r})),[c,e]),h=u/l;return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsxs)(p,{gap:12,wrap:!0,align:`center`,justify:`between`,children:[(0,B.jsxs)(`output`,{"aria-live":`polite`,children:[e(`traffic.summary`,{total:d(l)}),` `,(0,B.jsx)(`span`,{style:{color:h>.01?`var(--danger-color)`:`var(--success-color)`},children:e(h>.01?`traffic.incident`:`traffic.healthy`,{rate:f.format(h)})})]}),(0,B.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>s(e=>!e),children:e(a?`traffic.pause`:`traffic.resume`)})]}),(0,B.jsx)(_,{nodes:m,links:ee,format:d,linkColor:`target`,linkOpacity:.35,iterations:0,height:380,ariaLabel:e(`traffic.aria`)})]})}var z,B,V,H,Oe;function ke(){return(ke=e((()=>{z=t(),i(),a(),m(),g(),B=n(),V=[[`web`,620],[`ios`,380],[`android`,310],[`partners`,140]],H=[[`auth`,.18],[`catalog`,.38],[`search`,.29],[`checkout`,.15]],Oe=[[`ok`,`var(--success-color)`],[`clientError`,`var(--warning-color)`],[`serverError`,`var(--danger-color)`]]})))()}function Ae(){let{t:e}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),[t,n]=(0,U.useState)(`justify`),[i,a]=(0,U.useState)(`gradient`),[o,c]=(0,U.useState)(!0),l=(0,U.useMemo)(()=>G.map(t=>({name:e(`support.${t}`)})),[e]),d=(0,U.useMemo)(()=>je.map(([e,t,n])=>({source:G.indexOf(e),target:G.indexOf(t),value:n})),[]);return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsx)(s,{"aria-label":e(`alignLabel`),direction:`horizontal`,value:t,onChange:e=>n(e),children:Me.map(t=>(0,W.jsx)(u,{value:t,label:e(`align.${t}`)},t))}),(0,W.jsxs)(p,{gap:16,wrap:!0,align:`center`,children:[(0,W.jsx)(s,{"aria-label":e(`linkColorLabel`),direction:`horizontal`,value:i,onChange:e=>a(e),children:Ne.map(t=>(0,W.jsx)(u,{value:t,label:e(`linkColor.${t}`)},t))}),(0,W.jsx)(f,{checked:o,onChange:c,label:e(`labelValues`)})]}),(0,W.jsx)(_,{nodes:l,links:d,align:t,linkColor:i,labelValues:o,height:340,ariaLabel:e(`supportAria`)})]})}var U,W,G,je,Me,Ne;function Pe(){return(Pe=e((()=>{U=t(),i(),m(),c(),l(),d(),g(),W=n(),G=[`email`,`chat`,`phone`,`bot`,`tier1`,`tier2`,`engineering`,`solved`,`refunded`,`escalated`],je=[[`email`,`tier1`,820],[`chat`,`bot`,1400],[`phone`,`tier1`,520],[`bot`,`solved`,760],[`bot`,`tier1`,640],[`tier1`,`solved`,1310],[`tier1`,`refunded`,210],[`tier1`,`tier2`,460],[`tier2`,`solved`,280],[`tier2`,`engineering`,180],[`engineering`,`escalated`,180]],Me=[`justify`,`left`,`right`,`center`],Ne=[`gradient`,`source`,`target`,`neutral`]})))()}function Fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),n=(0,K.useMemo)(()=>new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),[t.language]),i=(0,K.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}),[t.language]),a=(0,K.useMemo)(()=>t=>e(`plastic.mt`,{value:n.format(t)}),[n,e]),o=(0,K.useMemo)(()=>J.map(({key:t,color:n})=>({name:e(`plastic.${t}`),...n?{color:n}:{}})),[e]),s=(0,K.useMemo)(()=>Ie.map(([e,t,n])=>({source:Y.indexOf(e),target:Y.indexOf(t),value:n})),[]);return(0,q.jsx)(_,{nodes:o,links:s,format:a,renderTooltip:t=>(0,q.jsxs)(`div`,{style:{display:`grid`,gap:2,maxWidth:240},children:[(0,q.jsx)(`strong`,{children:t.source&&t.target?`${t.source} → ${t.target}`:t.name}),(0,q.jsx)(`span`,{children:a(t.value)}),(0,q.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:t.source?e(`plastic.shareOfSource`,{share:i.format(t.percent),source:t.source}):e(`plastic.shareOfTotal`,{share:i.format(t.percent)})})]}),linkColor:`target`,nodePadding:16,height:420,ariaLabel:e(`plastic.aria`)})}var K,q,J,Ie,Y;function Le(){return(Le=e((()=>{K=t(),i(),g(),q=n(),J=[{key:`pet`},{key:`hdpe`},{key:`pp`},{key:`film`},{key:`other`},{key:`market`,color:`var(--text-secondary-color)`},{key:`collected`,color:`var(--chart-series-1)`},{key:`incinerated`,color:`var(--warning-color)`},{key:`landfill`,color:`var(--text-muted-color)`},{key:`leaked`,color:`var(--danger-color)`},{key:`recycled`,color:`var(--success-color)`},{key:`rejected`,color:`var(--text-muted-color)`},{key:`closedLoop`,color:`var(--success-color)`},{key:`downcycled`,color:`var(--chart-series-3)`}],Ie=[[`pet`,`market`,4.1],[`hdpe`,`market`,2.6],[`pp`,`market`,3.4],[`film`,`market`,5.2],[`other`,`market`,1.7],[`market`,`collected`,6.8],[`market`,`incinerated`,5.1],[`market`,`landfill`,4.4],[`market`,`leaked`,.7],[`collected`,`recycled`,4.6],[`collected`,`rejected`,2.2],[`rejected`,`incinerated`,2.2],[`recycled`,`closedLoop`,1.3],[`recycled`,`downcycled`,3.3]],Y=J.map(e=>e.key)})))()}function Re(e){let t=new Set,n=(e,n)=>{let r=[e];for(;r.length;){let e=r.shift();$.forEach(([i,a],o)=>{Q.indexOf(n?a:i)!==e||t.has(o)||(t.add(o),r.push(Q.indexOf(n?i:a)))})}};return n(e,!0),n(e,!1),t}function ze(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),[n,i]=(0,X.useState)(null),a=(0,X.useMemo)(()=>new Intl.NumberFormat(t.language),[t.language]),s=(0,X.useMemo)(()=>t=>e(`supply.tonnes`,{value:a.format(t)}),[e,a]),c=(0,X.useMemo)(()=>n===null?null:n>=Q.length?new Set([n-Q.length]):Re(n),[n]),l=(0,X.useMemo)(()=>Q.map(t=>({name:e(`supply.${t}`)})),[e]),u=(0,X.useMemo)(()=>$.map(([e,t,n],r)=>({source:Q.indexOf(e),target:Q.indexOf(t),value:n,...c&&!c.has(r)?{color:`var(--border-color)`}:{}})),[c]),d=e=>i(t=>t===e.index?null:e.index),f=e(`supply.hint`);if(n!==null&&n<Q.length){let t=Q[n],r=$.filter(([,e])=>e===t),i=$.filter(([e])=>e===t),o=e=>e.reduce((e,[,,t])=>e+t,0);f=e(`supply.node`,{name:e(`supply.${t}`),inbound:s(o(r)),from:a.format(r.length),outbound:s(o(i)),to:a.format(i.length)})}else if(n!==null){let[r,i,a]=$[n-Q.length],o=$.filter(([e])=>e===r).reduce((e,[,,t])=>e+t,0);f=e(`supply.link`,{source:e(`supply.${r}`),target:e(`supply.${i}`),value:s(a),share:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:0}).format(a/o)})}return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(_,{nodes:l,links:u,format:s,linkColor:`source`,onClick:d,height:420,ariaLabel:e(`supply.aria`)}),(0,Z.jsxs)(p,{gap:12,wrap:!0,align:`center`,justify:`between`,children:[(0,Z.jsx)(`output`,{"aria-live":`polite`,children:f}),(0,Z.jsx)(o,{variant:`outline`,size:`small`,disabled:n===null,onClick:()=>i(null),children:e(`supply.clear`)})]})]})}var X,Z,Q,$;function Be(){return(Be=e((()=>{X=t(),i(),a(),m(),g(),Z=n(),Q=[`brazil`,`colombia`,`ethiopia`,`vietnam`,`hamburg`,`rotterdam`,`north`,`central`,`south`,`cafes`,`supermarkets`,`online`],$=[[`brazil`,`hamburg`,180],[`brazil`,`rotterdam`,140],[`colombia`,`hamburg`,95],[`colombia`,`rotterdam`,70],[`ethiopia`,`hamburg`,60],[`vietnam`,`rotterdam`,125],[`hamburg`,`north`,160],[`hamburg`,`central`,120],[`hamburg`,`south`,55],[`rotterdam`,`central`,150],[`rotterdam`,`south`,185],[`north`,`cafes`,70],[`north`,`supermarkets`,60],[`north`,`online`,30],[`central`,`cafes`,85],[`central`,`supermarkets`,140],[`central`,`online`,45],[`south`,`cafes`,60],[`south`,`supermarkets`,155],[`south`,`online`,25]]})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Item =
  | "licenses"
  | "subscriptions"
  | "services"
  | "grants"
  | "budget"
  | "rnd"
  | "sales"
  | "operations"
  | "admin"
  | "platform"
  | "mobile"
  | "ai"
  | "campaigns"
  | "salesTeam"
  | "infrastructure"
  | "support"
  | "finance"
  | "offices";

// Yearly budget of a software company, in millions of dollars: where the
// money comes from, then how it is split between departments and programs
const ITEMS: { key: Item; color?: string }[] = [
  { key: "licenses" },
  { key: "subscriptions" },
  { key: "services" },
  { key: "grants" },
  { key: "budget", color: "#64748b" },
  { key: "rnd", color: "#6366f1" },
  { key: "sales", color: "#f59e0b" },
  { key: "operations", color: "#10b981" },
  { key: "admin", color: "#ec4899" },
  { key: "platform", color: "#818cf8" },
  { key: "mobile", color: "#818cf8" },
  { key: "ai", color: "#818cf8" },
  { key: "campaigns", color: "#fbbf24" },
  { key: "salesTeam", color: "#fbbf24" },
  { key: "infrastructure", color: "#34d399" },
  { key: "support", color: "#34d399" },
  { key: "finance", color: "#f472b6" },
  { key: "offices", color: "#f472b6" },
];

const ALLOCATIONS: [Item, Item, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
  ["rnd", "platform", 12.8],
  ["rnd", "mobile", 7.9],
  ["rnd", "ai", 8.8],
  ["sales", "campaigns", 9.6],
  ["sales", "salesTeam", 11.7],
  ["operations", "infrastructure", 8.1],
  ["operations", "support", 5.6],
  ["admin", "finance", 4.4],
  ["admin", "offices", 4.1],
];

const keys = ITEMS.map((item) => item.key);

export default function BudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  const nodes = useMemo(
    (): SankeyNode[] =>
      ITEMS.map(({ key, color }) => ({
        name: t(\`budget.\${key}\`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );
  // millions of dollars, in the reader's number format
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1e6);
  }, [locale]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      linkColor="target"
      linkOpacity={0.35}
      nodeWidth={10}
      height={440}
      ariaLabel={t("budgetAria")}
    />
  );
}
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Key =
  | "solar"
  | "wind"
  | "hydro"
  | "nuclear"
  | "gas"
  | "coal"
  | "oil"
  | "electricity"
  | "heat"
  | "fuels"
  | "homes"
  | "industry"
  | "services"
  | "transport"
  | "losses";

// A national energy balance, in TWh per year (rounded): primary sources,
// carriers, then end uses. Every carrier gives out what it receives.
const NODES: { key: Key; color: string }[] = [
  { key: "solar", color: "#f59e0b" },
  { key: "wind", color: "#38bdf8" },
  { key: "hydro", color: "#0284c7" },
  { key: "nuclear", color: "#a855f7" },
  { key: "gas", color: "#f97316" },
  { key: "coal", color: "#64748b" },
  { key: "oil", color: "#92400e" },
  { key: "electricity", color: "#eab308" },
  { key: "heat", color: "#ef4444" },
  { key: "fuels", color: "#b45309" },
  { key: "homes", color: "#10b981" },
  { key: "industry", color: "#6366f1" },
  { key: "services", color: "#14b8a6" },
  { key: "transport", color: "#ec4899" },
  { key: "losses", color: "#94a3b8" },
];

const FLOWS: [Key, Key, number][] = [
  ["solar", "electricity", 62],
  ["wind", "electricity", 138],
  ["hydro", "electricity", 54],
  ["nuclear", "electricity", 182],
  ["gas", "electricity", 96],
  ["coal", "electricity", 48],
  ["gas", "heat", 58],
  ["gas", "homes", 142],
  ["gas", "industry", 104],
  ["coal", "industry", 36],
  ["oil", "fuels", 420],
  ["electricity", "homes", 168],
  ["electricity", "industry", 152],
  ["electricity", "services", 124],
  ["electricity", "transport", 22],
  ["electricity", "losses", 114],
  ["heat", "homes", 36],
  ["heat", "services", 22],
  ["fuels", "transport", 348],
  ["fuels", "industry", 42],
  ["fuels", "losses", 30],
];

const index = (key: Key) => NODES.findIndex((n) => n.key === key);

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  // translated names; the links refer to the nodes by index
  const nodes = useMemo(
    (): SankeyNode[] =>
      NODES.map(({ key, color }) => ({ name: t(\`energy.\${key}\`), color })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([source, target, value]) => ({
        source: index(source),
        target: index(target),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("twh", { value: number.format(value) });
  }, [locale, t]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      height={420}
      ariaLabel={t("energyAria")}
    />
  );
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { SankeyChart, type SankeyLink } from "minerva-design/charts";

type Stage =
  | "referrals"
  | "jobBoards"
  | "linkedin"
  | "agencies"
  | "campus"
  | "applied"
  | "cvRejected"
  | "screen"
  | "screenOut"
  | "interview"
  | "interviewOut"
  | "offer"
  | "declined"
  | "hired";

const DROP_OFFS = new Set<Stage>([
  "cvRejected",
  "screenOut",
  "interviewOut",
  "declined",
]);
const SOURCES: Stage[] = [
  "referrals",
  "jobBoards",
  "linkedin",
  "agencies",
  "campus",
];

// Candidates of one hiring year, from the source to the outcome
const MOVES: [Stage, Stage, number][] = [
  ["referrals", "applied", 210],
  ["jobBoards", "applied", 1480],
  ["linkedin", "applied", 860],
  ["agencies", "applied", 190],
  ["campus", "applied", 540],
  ["applied", "cvRejected", 2150],
  ["applied", "screen", 1130],
  ["screen", "screenOut", 690],
  ["screen", "interview", 440],
  ["interview", "interviewOut", 362],
  ["interview", "offer", 78],
  ["offer", "declined", 14],
  ["offer", "hired", 64],
];

const STAGE_COLOR: Partial<Record<Stage, string>> = {
  hired: "var(--success-color)",
  cvRejected: "var(--text-muted-color)",
  screenOut: "var(--text-muted-color)",
  interviewOut: "var(--text-muted-color)",
  declined: "var(--text-muted-color)",
};

const total = (from: Stage) =>
  MOVES.filter(([source]) => source === from).reduce(
    (sum, [, , value]) => sum + value,
    0,
  );

export default function HiringFunnelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [dropOffs, setDropOffs] = useState(true);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  // nodes and links refer to each other by name, so hiding the drop-offs
  // only means leaving them out of both lists
  const visible = useMemo(
    () => MOVES.filter(([, to]) => dropOffs || !DROP_OFFS.has(to)),
    [dropOffs],
  );
  const nodes = useMemo(() => {
    const stages = [...new Set(visible.flatMap(([from, to]) => [from, to]))];
    return stages.map((stage) => ({
      name: t(\`hiring.\${stage}\`),
      ...(STAGE_COLOR[stage] ? { color: STAGE_COLOR[stage] } : {}),
    }));
  }, [visible, t]);
  const links = useMemo(
    (): SankeyLink[] =>
      visible.map(([from, to, value]) => ({
        source: t(\`hiring.\${from}\`),
        target: t(\`hiring.\${to}\`),
        value,
      })),
    [visible, t],
  );

  const applied = SOURCES.reduce((sum, source) => sum + total(source), 0);
  const hired = MOVES.find(([, to]) => to === "hired")![2];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={dropOffs}
        onChange={setDropOffs}
        label={t("hiring.showDropOffs")}
      />
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        align="left"
        linkColor={dropOffs ? "target" : "source"}
        labelValues
        height={400}
        ariaLabel={t("hiring.aria")}
      />
      <output aria-live="polite">
        {t("hiring.summary", {
          applied: number.format(applied),
          hired: number.format(hired),
          rate: percent.format(hired / applied),
          interview: percent.format(total("interview") / total("screen")),
          accepted: percent.format(hired / total("offer")),
        })}
      </output>
    </div>
  );
}
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Line =
  | "cloud"
  | "licenses"
  | "hardware"
  | "services"
  | "revenue"
  | "cogs"
  | "gross"
  | "rnd"
  | "sales"
  | "admin"
  | "operating"
  | "tax"
  | "net";

const PROFIT = "var(--success-color)";
const COST = "var(--danger-color)";

// Quarterly income statement, in millions of dollars
const LINES: { key: Line; color?: string }[] = [
  { key: "cloud", color: "var(--chart-series-1)" },
  { key: "licenses", color: "var(--chart-series-2)" },
  { key: "hardware", color: "var(--chart-series-3)" },
  { key: "services", color: "var(--chart-series-4)" },
  { key: "revenue", color: "var(--text-secondary-color)" },
  { key: "cogs", color: COST },
  { key: "gross", color: PROFIT },
  { key: "rnd", color: COST },
  { key: "sales", color: COST },
  { key: "admin", color: COST },
  { key: "operating", color: PROFIT },
  { key: "tax", color: COST },
  { key: "net", color: PROFIT },
];

const SEGMENTS: [Line, number][] = [
  ["cloud", 412],
  ["licenses", 186],
  ["hardware", 94],
  ["services", 58],
];
const COGS = 268;
const OPEX: [Line, number][] = [
  ["rnd", 141],
  ["sales", 98],
  ["admin", 47],
];
const TAX_RATE = 0.21;

const keys = LINES.map((line) => line.key);

function statement() {
  const revenue = SEGMENTS.reduce((sum, [, value]) => sum + value, 0);
  const gross = revenue - COGS;
  const operating = gross - OPEX.reduce((sum, [, value]) => sum + value, 0);
  const tax = Math.round(operating * TAX_RATE);
  const flows: [Line, Line, number, "profit" | "cost" | "in"][] = [
    ...SEGMENTS.map(
      ([key, value]) =>
        [key, "revenue", value, "in"] as [Line, Line, number, "in"],
    ),
    ["revenue", "cogs", COGS, "cost"],
    ["revenue", "gross", gross, "profit"],
    ...OPEX.map(
      ([key, value]) =>
        ["gross", key, value, "cost"] as [Line, Line, number, "cost"],
    ),
    ["gross", "operating", operating, "profit"],
    ["operating", "tax", tax, "cost"],
    ["operating", "net", operating - tax, "profit"],
  ];
  return { revenue, gross, operating, net: operating - tax, flows };
}
const STATEMENT = statement();

export default function IncomeStatementDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;
  const { revenue, gross, operating, net, flows } = STATEMENT;

  const nodes = useMemo(
    (): SankeyNode[] =>
      LINES.map(({ key, color }) => ({ name: t(\`pnl.\${key}\`), color })),
    [t],
  );
  // profits are green and costs red; revenue streams keep their own color
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value, kind]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
        ...(kind === "profit" ? { color: PROFIT } : {}),
        ...(kind === "cost" ? { color: COST } : {}),
      })),
    [flows],
  );
  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const format = useMemo(
    () => (value: number) => money.format(value * 1e6),
    [money],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        linkOpacity={0.4}
        nodeWidth={14}
        height={420}
        ariaLabel={t("pnl.aria")}
      />
      <p
        style={{
          margin: 0,
          color: "var(--text-secondary-color)",
          fontSize: 14,
        }}
      >
        {t("pnl.margins", {
          gross: percent.format(gross / revenue),
          operating: percent.format(operating / revenue),
          net: percent.format(net / revenue),
        })}
      </p>
    </div>
  );
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Step =
  | "searchAds"
  | "organic"
  | "newsletter"
  | "social"
  | "home"
  | "pricing"
  | "blog"
  | "signup"
  | "left"
  | "trial"
  | "abandoned"
  | "paid"
  | "expired";

const STEPS: Step[] = [
  "searchAds",
  "organic",
  "newsletter",
  "social",
  "home",
  "pricing",
  "blog",
  "signup",
  "left",
  "trial",
  "abandoned",
  "paid",
  "expired",
];

// Sessions of one week, from the acquisition channel to the subscription
const PATHS: [Step, Step, number][] = [
  ["searchAds", "home", 4200],
  ["searchAds", "pricing", 2600],
  ["organic", "home", 3800],
  ["organic", "blog", 5200],
  ["newsletter", "blog", 1900],
  ["newsletter", "pricing", 900],
  ["social", "blog", 2400],
  ["social", "home", 1100],
  ["home", "signup", 3100],
  ["home", "left", 6000],
  ["pricing", "signup", 2100],
  ["pricing", "left", 1400],
  ["blog", "signup", 1300],
  ["blog", "left", 8200],
  ["signup", "trial", 4700],
  ["signup", "abandoned", 1800],
  ["trial", "paid", 1300],
  ["trial", "expired", 3400],
];

export default function JourneyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  const nodes = useMemo(
    (): SankeyNode[] => STEPS.map((step) => ({ name: t(\`journey.\${step}\`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      PATHS.map(([from, to, value]) => ({
        source: STEPS.indexOf(from),
        target: STEPS.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        align="left"
        linkColor="source"
        format={format}
        onClick={setSelected}
        height={400}
        ariaLabel={t("journeyAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? selected.source && selected.target
            ? t("journeyLink", {
                source: selected.source,
                target: selected.target,
                value: number.format(selected.value),
                share: (selected.percent * 100).toFixed(1),
              })
            : t("journeyNode", {
                name: selected.name,
                value: number.format(selected.value),
              })
          : t("journeyHint")}
      </p>
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Client = "web" | "ios" | "android" | "partners";
type Service = "auth" | "catalog" | "search" | "checkout";
type Status = "ok" | "clientError" | "serverError";

const CLIENTS: [Client, number][] = [
  ["web", 620],
  ["ios", 380],
  ["android", 310],
  ["partners", 140],
];
const SERVICES: [Service, number][] = [
  ["auth", 0.18],
  ["catalog", 0.38],
  ["search", 0.29],
  ["checkout", 0.15],
];
const STATUSES: [Status, string][] = [
  ["ok", "var(--success-color)"],
  ["clientError", "var(--warning-color)"],
  ["serverError", "var(--danger-color)"],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Requests per second at a given tick: a slow wave plus seeded noise, then
// split downstream so every node receives exactly what it sends
function traffic(tick: number) {
  const random = mulberry32(tick * 7919 + 17);
  const flows: [string, string, number][] = [];
  let total = 0;
  for (const [client, base] of CLIENTS) {
    const rps =
      base * (1 + 0.15 * Math.sin(tick / 6 + base) + 0.08 * (random() - 0.5));
    flows.push([\`client.\${client}\`, "gateway", rps]);
    total += rps;
  }
  let serverErrors = 0;
  for (const [service, share] of SERVICES) {
    const rps = total * share * (1 + 0.1 * (random() - 0.5));
    flows.push(["gateway", \`service.\${service}\`, rps]);
    // checkout has an incident every 20 ticks
    const incident = service === "checkout" && tick % 20 >= 14;
    const server = rps * (incident ? 0.12 : 0.004 + 0.006 * random());
    const client = rps * (0.02 + 0.03 * random());
    flows.push([\`service.\${service}\`, "status.ok", rps - server - client]);
    flows.push([\`service.\${service}\`, "status.clientError", client]);
    flows.push([\`service.\${service}\`, "status.serverError", server]);
    serverErrors += server;
  }
  const routed = flows
    .filter(([from]) => from === "gateway")
    .reduce((sum, [, , value]) => sum + value, 0);
  return { flows, total: routed, serverErrors };
}

export default function LiveTrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), 1500);
    return () => clearInterval(id);
  }, [running]);

  const { flows, total, serverErrors } = useMemo(() => traffic(tick), [tick]);
  const rps = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    return (value: number) => t("traffic.rps", { value: number.format(value) });
  }, [i18n.language, t]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): SankeyNode[] => [
      ...CLIENTS.map(([client]) => ({ name: t(\`traffic.client.\${client}\`) })),
      { name: t("traffic.gateway"), color: "var(--text-secondary-color)" },
      ...SERVICES.map(([service]) => ({
        name: t(\`traffic.service.\${service}\`),
      })),
      ...STATUSES.map(([status, color]) => ({
        name: t(\`traffic.status.\${status}\`),
        color,
      })),
    ],
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value]) => ({
        source: t(\`traffic.\${from}\`),
        target: t(\`traffic.\${to}\`),
        value,
      })),
    [flows, t],
  );
  const errorRate = serverErrors / total;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">
          {t("traffic.summary", { total: rps(total) })}{" "}
          <span
            style={{
              color:
                errorRate > 0.01
                  ? "var(--danger-color)"
                  : "var(--success-color)",
            }}
          >
            {t(errorRate > 0.01 ? "traffic.incident" : "traffic.healthy", {
              rate: percent.format(errorRate),
            })}
          </span>
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("traffic.pause") : t("traffic.resume")}
        </Button>
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={rps}
        linkColor="target"
        linkOpacity={0.35}
        // no relaxation: the nodes keep their order between updates
        iterations={0}
        height={380}
        ariaLabel={t("traffic.aria")}
      />
    </div>
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  SankeyChart,
  type SankeyChartProps,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Align = NonNullable<SankeyChartProps["align"]>;
type LinkColor = NonNullable<SankeyChartProps["linkColor"]>;
type Stage =
  | "email"
  | "chat"
  | "phone"
  | "bot"
  | "tier1"
  | "tier2"
  | "engineering"
  | "solved"
  | "refunded"
  | "escalated";

const STAGES: Stage[] = [
  "email",
  "chat",
  "phone",
  "bot",
  "tier1",
  "tier2",
  "engineering",
  "solved",
  "refunded",
  "escalated",
];

// Support tickets of a month: the chatbot solves some directly, which skips
// a column; that is where \`align\` makes a difference
const ROUTES: [Stage, Stage, number][] = [
  ["email", "tier1", 820],
  ["chat", "bot", 1400],
  ["phone", "tier1", 520],
  ["bot", "solved", 760],
  ["bot", "tier1", 640],
  ["tier1", "solved", 1310],
  ["tier1", "refunded", 210],
  ["tier1", "tier2", 460],
  ["tier2", "solved", 280],
  ["tier2", "engineering", 180],
  ["engineering", "escalated", 180],
];

const ALIGNS: Align[] = ["justify", "left", "right", "center"];
const COLORS: LinkColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [align, setAlign] = useState<Align>("justify");
  const [linkColor, setLinkColor] = useState<LinkColor>("gradient");
  const [labelValues, setLabelValues] = useState(true);

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map((stage) => ({ name: t(\`support.\${stage}\`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ROUTES.map(([from, to, value]) => ({
        source: STAGES.indexOf(from),
        target: STAGES.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("alignLabel")}
        direction="horizontal"
        value={align}
        onChange={(value) => setAlign(value as Align)}
      >
        {ALIGNS.map((value) => (
          <Radio key={value} value={value} label={t(\`align.\${value}\`)} />
        ))}
      </RadioGroup>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("linkColorLabel")}
          direction="horizontal"
          value={linkColor}
          onChange={(value) => setLinkColor(value as LinkColor)}
        >
          {COLORS.map((value) => (
            <Radio key={value} value={value} label={t(\`linkColor.\${value}\`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labelValues}
          onChange={setLabelValues}
          label={t("labelValues")}
        />
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        align={align}
        linkColor={linkColor}
        labelValues={labelValues}
        height={340}
        ariaLabel={t("supportAria")}
      />
    </div>
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Stage =
  | "pet"
  | "hdpe"
  | "pp"
  | "film"
  | "other"
  | "market"
  | "collected"
  | "incinerated"
  | "landfill"
  | "leaked"
  | "recycled"
  | "rejected"
  | "closedLoop"
  | "downcycled";

const STAGES: { key: Stage; color?: string }[] = [
  { key: "pet" },
  { key: "hdpe" },
  { key: "pp" },
  { key: "film" },
  { key: "other" },
  { key: "market", color: "var(--text-secondary-color)" },
  { key: "collected", color: "var(--chart-series-1)" },
  { key: "incinerated", color: "var(--warning-color)" },
  { key: "landfill", color: "var(--text-muted-color)" },
  { key: "leaked", color: "var(--danger-color)" },
  { key: "recycled", color: "var(--success-color)" },
  { key: "rejected", color: "var(--text-muted-color)" },
  { key: "closedLoop", color: "var(--success-color)" },
  { key: "downcycled", color: "var(--chart-series-3)" },
];

// Plastic packaging of a region over a year, in megatonnes
const FLOWS: [Stage, Stage, number][] = [
  ["pet", "market", 4.1],
  ["hdpe", "market", 2.6],
  ["pp", "market", 3.4],
  ["film", "market", 5.2],
  ["other", "market", 1.7],
  ["market", "collected", 6.8],
  ["market", "incinerated", 5.1],
  ["market", "landfill", 4.4],
  ["market", "leaked", 0.7],
  ["collected", "recycled", 4.6],
  ["collected", "rejected", 2.2],
  ["rejected", "incinerated", 2.2],
  ["recycled", "closedLoop", 1.3],
  ["recycled", "downcycled", 3.3],
];

const keys = STAGES.map((stage) => stage.key);

export default function PlasticDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const number = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => t("plastic.mt", { value: number.format(value) }),
    [number, t],
  );

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map(({ key, color }) => ({
        name: t(\`plastic.\${key}\`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );

  // links: percent is the share of the source node; nodes: of all the
  // packaging entering the diagram
  const tooltip = (event: ShapeHoverEvent) => (
    <div style={{ display: "grid", gap: 2, maxWidth: 240 }}>
      <strong>
        {event.source && event.target
          ? \`\${event.source} → \${event.target}\`
          : event.name}
      </strong>
      <span>{format(event.value)}</span>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {event.source
          ? t("plastic.shareOfSource", {
              share: percent.format(event.percent),
              source: event.source,
            })
          : t("plastic.shareOfTotal", { share: percent.format(event.percent) })}
      </span>
    </div>
  );

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      renderTooltip={tooltip}
      linkColor="target"
      nodePadding={16}
      height={420}
      ariaLabel={t("plastic.aria")}
    />
  );
}
`})))()}var rt;function it(){return(it=e((()=>{rt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Site =
  | "brazil"
  | "colombia"
  | "ethiopia"
  | "vietnam"
  | "hamburg"
  | "rotterdam"
  | "north"
  | "central"
  | "south"
  | "cafes"
  | "supermarkets"
  | "online";

const SITES: Site[] = [
  "brazil",
  "colombia",
  "ethiopia",
  "vietnam",
  "hamburg",
  "rotterdam",
  "north",
  "central",
  "south",
  "cafes",
  "supermarkets",
  "online",
];

// Green coffee shipped in a month, in tonnes: origins, roasteries,
// warehouses and sales channels
const SHIPMENTS: [Site, Site, number][] = [
  ["brazil", "hamburg", 180],
  ["brazil", "rotterdam", 140],
  ["colombia", "hamburg", 95],
  ["colombia", "rotterdam", 70],
  ["ethiopia", "hamburg", 60],
  ["vietnam", "rotterdam", 125],
  ["hamburg", "north", 160],
  ["hamburg", "central", 120],
  ["hamburg", "south", 55],
  ["rotterdam", "central", 150],
  ["rotterdam", "south", 185],
  ["north", "cafes", 70],
  ["north", "supermarkets", 60],
  ["north", "online", 30],
  ["central", "cafes", 85],
  ["central", "supermarkets", 140],
  ["central", "online", 45],
  ["south", "cafes", 60],
  ["south", "supermarkets", 155],
  ["south", "online", 25],
];

// event.index of the selected mark: a node, or SITES.length + link index
type Selection = number;

// Links on every path through a node: walks upstream and downstream
function pathThrough(site: number) {
  const on = new Set<number>();
  const walk = (start: number, up: boolean) => {
    const queue = [start];
    while (queue.length) {
      const current = queue.shift()!;
      SHIPMENTS.forEach(([from, to], i) => {
        const near = SITES.indexOf(up ? to : from);
        if (near !== current || on.has(i)) return;
        on.add(i);
        queue.push(SITES.indexOf(up ? from : to));
      });
    }
  };
  walk(site, true);
  walk(site, false);
  return on;
}

export default function SupplyChainDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  // tonnes are not an Intl unit: the number is localized, the unit translated
  const format = useMemo(
    () => (value: number) =>
      t("supply.tonnes", { value: number.format(value) }),
    [t, number],
  );

  const highlighted = useMemo(() => {
    if (selection === null) return null;
    if (selection >= SITES.length) return new Set([selection - SITES.length]);
    return pathThrough(selection);
  }, [selection]);

  const nodes = useMemo(
    (): SankeyNode[] => SITES.map((site) => ({ name: t(\`supply.\${site}\`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      SHIPMENTS.map(([from, to, value], i) => ({
        source: SITES.indexOf(from),
        target: SITES.indexOf(to),
        value,
        ...(highlighted && !highlighted.has(i)
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [highlighted],
  );

  const onClick = (event: ShapeHoverEvent) =>
    setSelection((current) => (current === event.index ? null : event.index));

  let readout = t("supply.hint");
  if (selection !== null && selection < SITES.length) {
    const site = SITES[selection]!;
    const inbound = SHIPMENTS.filter(([, to]) => to === site);
    const outbound = SHIPMENTS.filter(([from]) => from === site);
    const sum = (list: typeof SHIPMENTS) =>
      list.reduce((total, [, , value]) => total + value, 0);
    readout = t("supply.node", {
      name: t(\`supply.\${site}\`),
      inbound: format(sum(inbound)),
      from: number.format(inbound.length),
      outbound: format(sum(outbound)),
      to: number.format(outbound.length),
    });
  } else if (selection !== null) {
    const [from, to, value] = SHIPMENTS[selection - SITES.length]!;
    const sent = SHIPMENTS.filter(([source]) => source === from).reduce(
      (total, [, , v]) => total + v,
      0,
    );
    readout = t("supply.link", {
      source: t(\`supply.\${from}\`),
      target: t(\`supply.\${to}\`),
      value: format(value),
      share: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 0,
      }).format(value / sent),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        onClick={onClick}
        height={420}
        ariaLabel={t("supply.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{readout}</output>
        <Button
          variant="outline"
          size="small"
          disabled={selection === null}
          onClick={() => setSelection(null)}
        >
          {t("supply.clear")}
        </Button>
      </HStack>
    </div>
  );
}
`})))()}var at,ot,st;function ct(){return(ct=e((()=>{oe(),fe(),ge(),xe(),we(),ke(),Pe(),Le(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),it(),t(),h(),ne(),at=n(),ot=ee(Object.assign({"./demos/budget.tsx":re,"./demos/energy.tsx":se,"./demos/hiring-funnel.tsx":pe,"./demos/income-statement.tsx":ve,"./demos/journey.tsx":Se,"./demos/live-traffic.tsx":De,"./demos/options.tsx":Ae,"./demos/plastic.tsx":Fe,"./demos/supply-chain.tsx":ze}),Object.assign({"./demos/budget.tsx":Ve,"./demos/energy.tsx":Ue,"./demos/hiring-funnel.tsx":Ge,"./demos/income-statement.tsx":qe,"./demos/journey.tsx":Ye,"./demos/live-traffic.tsx":Ze,"./demos/options.tsx":$e,"./demos/plastic.tsx":tt,"./demos/supply-chain.tsx":rt})),st=()=>(0,at.jsx)(te,{id:`sankey-chart`,demos:ot})})))()}ct();export{st as default};