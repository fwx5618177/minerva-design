import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{i as p,r as m}from"./Stack-B3Kr9X_e.js";import{l as h,n as ee,t as te,u as ne}from"./DocPage-BdPOW9nQ.js";import{c as g,t as _}from"./shapes-B5QcpBlT.js";function re(){let{t:e}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),t=(0,ie.useMemo)(()=>oe.map(t=>e(`teams.${t}`)),[e]);return(0,ae.jsx)(_,{groups:t,matrix:se,ariaLabel:e(`teamsAria`)})}var ie,ae,oe,se;function ce(){return(ce=e((()=>{ie=t(),i(),g(),ae=n(),oe=[`design`,`engineering`,`product`,`marketing`],se=[[0,42,28,14],[36,0,54,8],[30,48,0,22],[12,6,26,0]]})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),[n,i]=(0,v.useState)(2025),a=x[n],o=(0,v.useMemo)(()=>[...ue,e(`switching.other`)],[e]),c=(0,v.useMemo)(()=>o.map((e,t)=>({name:e,color:b[t]})),[o]),l=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e3)},[t.language]),d=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:1,signDisplay:`exceptZero`});return t=>e.format(t*1e3)},[t.language]),f=o.map((e,t)=>({name:e,net:a.reduce((e,n)=>e+n[t],0)-a[t].reduce((e,t)=>e+t,0)})).sort((e,t)=>t.net-e.net),p=f[0];return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsx)(s,{"aria-label":e(`switching.yearLabel`),direction:`horizontal`,value:n,onChange:e=>i(Number(e)),children:de.map(t=>(0,y.jsx)(u,{value:t,label:e(`switching.year`,{year:t})},t))}),(0,y.jsx)(_,{groups:c,matrix:a,directed:!0,ribbonColor:`target`,format:l,padAngle:3,height:420,ariaLabel:e(`switching.aria`,{year:n})}),(0,y.jsx)(`output`,{"aria-live":`polite`,children:e(`switching.summary`,{name:p.name,value:d(p.net),list:new Intl.ListFormat(t.language,{type:`unit`}).format(f.map(t=>e(`switching.net`,{name:t.name,value:d(t.net)})))})})]})}var v,y,ue,b,x,de;function fe(){return(fe=e((()=>{v=t(),i(),c(),l(),g(),y=n(),ue=[`Telora`,`Vexa`,`Mobix`,`Airlink`],b=[`var(--chart-series-1)`,`var(--chart-series-2)`,`var(--chart-series-3)`,`var(--chart-series-4)`,`var(--text-muted-color)`],x={2023:[[0,84,52,31,12],[61,0,38,22,9],[44,41,0,18,7],[26,19,21,0,5],[10,8,9,4,0]],2024:[[0,112,48,35,14],[52,0,34,25,8],[40,58,0,21,6],[24,31,19,0,6],[9,12,8,5,0]],2025:[[0,96,41,62,13],[58,0,30,49,9],[37,44,0,38,7],[21,27,16,0,4],[8,10,7,11,0]]},de=Object.keys(x).map(Number)})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=(0,S.useMemo)(()=>w.map(t=>e(`basket.categories.${t}`)),[e]),i=(0,S.useMemo)(()=>he.map(([e,t,n])=>({source:w.indexOf(e),target:w.indexOf(t),value:n})),[]),{number:a,compact:o,percent:s}=(0,S.useMemo)(()=>({number:new Intl.NumberFormat(t.language),compact:new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:1}),percent:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1})}),[t.language]),c=(0,S.useMemo)(()=>e=>a.format(e),[a]),l=(0,S.useMemo)(()=>e=>o.format(e),[o]);return(0,C.jsx)(_,{groups:n,links:i,sortGroups:`descending`,sortSubgroups:`descending`,ticks:1e3,tickFormat:l,format:c,renderTooltip:t=>t.source&&t.target?(0,C.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,C.jsx)(`strong`,{children:e(`basket.pair`,{a:t.source,b:t.target})}),(0,C.jsx)(`span`,{children:e(`basket.together`,{value:a.format(t.value),share:s.format(t.value/me)})})]}):(0,C.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,C.jsx)(`strong`,{children:t.name}),(0,C.jsx)(`span`,{children:e(`basket.withOthers`,{value:a.format(t.value)})})]}),legend:!1,height:440,ariaLabel:e(`basket.aria`)})}var S,C,w,me,he;function ge(){return(ge=e((()=>{S=t(),i(),g(),C=n(),w=[`coffee`,`milk`,`bread`,`pastries`,`fruit`,`cereal`,`yogurt`,`juice`],me=48e3,he=[[`coffee`,`milk`,3120],[`coffee`,`pastries`,2460],[`coffee`,`bread`,980],[`milk`,`cereal`,2780],[`milk`,`bread`,1640],[`milk`,`yogurt`,920],[`bread`,`pastries`,610],[`bread`,`fruit`,740],[`fruit`,`yogurt`,1980],[`fruit`,`juice`,1210],[`fruit`,`cereal`,860],[`cereal`,`yogurt`,1130],[`juice`,`pastries`,540],[`juice`,`cereal`,420]]})))()}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,i=(0,T.useMemo)(()=>D.map(t=>e(`datacenters.${t}`)),[e]),a=(0,T.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`gbps`,{value:t.format(n)})},[n,e]);return(0,E.jsx)(`div`,{style:ve,children:(0,E.jsx)(_,{groups:i,matrix:O,palette:ye,format:a,padAngle:4,arcWidth:10,ribbonOpacity:.55,height:440,ariaLabel:e(`datacentersAria`)})})}var T,E,ve,ye,D,O;function k(){return(k=e((()=>{T=t(),i(),g(),E=n(),ve={"--background-color":`#0b1020`,"--surface-color":`#0b1020`,"--surface-elevated-color":`#141b2e`,"--text-color":`#e2e8f0`,"--text-secondary-color":`#8a94ad`,"--border-color":`#1f2a44`,background:`#0b1020`,color:`#e2e8f0`,borderRadius:12,padding:12,width:`100%`,boxSizing:`border-box`},ye=[`#22d3ee`,`#a78bfa`,`#f472b6`,`#facc15`,`#34d399`,`#fb923c`],D=[`usEast`,`usWest`,`euCentral`,`apSoutheast`,`apNortheast`,`saEast`],O=[[0,42,36,12,14,9],[38,0,11,18,22,3],[31,9,0,14,7,4],[10,16,12,0,26,1],[12,20,6,24,0,1],[8,2,3,1,1,0]]})))()}function be(){let{t:e}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),t=(0,A.useMemo)(()=>M.map(t=>e(`modules.${t}`)),[e]);return(0,j.jsx)(_,{groups:t,matrix:N,directed:!0,ribbonColor:`source`,sortGroups:`descending`,labels:`radial`,ticks:!1,height:440,ariaLabel:e(`modulesAria`)})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),i(),g(),j=n(),M=[`app`,`router`,`store`,`uiKit`,`apiClient`,`auth`,`i18n`,`utils`],N=[[0,12,9,24,6,5,7,10],[0,0,2,3,0,4,1,5],[0,0,0,0,14,3,0,8],[0,1,4,0,0,0,9,16],[0,0,2,0,0,7,0,11],[0,2,3,2,6,0,1,6],[0,0,0,0,0,0,0,4],[0,0,0,0,0,0,0,0]]})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,[i,a]=(0,F.useState)(null),o=(0,F.useMemo)(()=>Se.map(t=>e(`pages.${t}`)),[e]),s=(0,F.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`visits`,{value:t.format(n)})},[n,e]),c=i?i.source!==void 0&&i.target!==void 0?e(`navFlow`,{source:i.source,target:i.target,value:s(i.value),reverse:s(i.reverseValue??0)}):e(`navPage`,{name:i.name,value:s(i.value)}):e(`navHint`);return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,I.jsx)(_,{groups:o,matrix:Ce,directed:!0,format:s,ribbonOpacity:.7,padAngle:3,height:440,onHover:a,ariaLabel:e(`navAria`)}),(0,I.jsx)(`div`,{"aria-live":`polite`,style:{minHeight:22,textAlign:`center`,color:`var(--text-secondary-color)`,fontSize:13},children:c})]})}var F,I,Se,Ce;function we(){return(we=e((()=>{F=t(),i(),g(),I=n(),Se=[`home`,`search`,`category`,`product`,`cart`,`checkout`],Ce=[[0,18.4,12.6,6.2,1.4,0],[2.8,0,3.1,21.5,.6,0],[3.4,2.2,0,14.8,.4,0],[4.1,6.3,5.2,0,9.6,.8],[1.2,.5,.3,3.9,0,6.4],[.9,0,0,.2,1.6,0]]})))()}function Te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),[n,i]=(0,L.useState)(null),[a,s]=(0,L.useState)(null),c=(0,L.useMemo)(()=>new Intl.NumberFormat(t.language),[t.language]),l=(0,L.useMemo)(()=>e=>c.format(e),[c]),u=t=>e(`research.faculties.${t}`),d=(0,L.useMemo)(()=>z.map(t=>e(`research.faculties.${t}`)),[e]),f=(0,L.useMemo)(()=>B.map(([e,t,r])=>({source:z.indexOf(e),target:z.indexOf(t),value:r,...n&&e!==n&&t!==n?{color:`var(--border-color)`}:{}})),[n]),m=e=>{if(e.index<z.length){let t=z[e.index];i(e=>e===t?null:t),s(null)}else e.source&&e.target&&s([e.source,e.target,e.value])},h=e(`research.hint`);if(a)h=e(`research.pair`,{a:a[0],b:a[1],value:c.format(a[2])});else if(n){let r=B.filter(([e,t])=>e===n||t===n).map(([e,t,r])=>({partner:e===n?t:e,value:r})).sort((e,t)=>t.value-e.value);h=e(`research.focus`,{name:u(n),total:c.format(r.reduce((e,t)=>e+t.value,0)),partners:new Intl.ListFormat(t.language,{type:`conjunction`}).format(r.slice(0,3).map(t=>e(`research.partner`,{name:u(t.partner),value:c.format(t.value)})))})}return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,R.jsx)(_,{groups:d,links:f,format:l,legend:!1,onClick:m,height:440,ariaLabel:e(`research.aria`)}),(0,R.jsxs)(p,{gap:12,wrap:!0,align:`center`,justify:`between`,children:[(0,R.jsx)(`output`,{"aria-live":`polite`,children:h}),(0,R.jsx)(o,{variant:`outline`,size:`small`,disabled:!n&&!a,onClick:()=>{i(null),s(null)},children:e(`research.clear`)})]})]})}var L,R,z,B;function Ee(){return(Ee=e((()=>{L=t(),i(),a(),m(),g(),R=n(),z=[`physics`,`chemistry`,`biology`,`medicine`,`computing`,`mathematics`,`economics`,`engineering`],B=[[`physics`,`chemistry`,142],[`physics`,`mathematics`,118],[`physics`,`engineering`,164],[`physics`,`computing`,71],[`chemistry`,`biology`,96],[`chemistry`,`medicine`,58],[`chemistry`,`engineering`,83],[`biology`,`medicine`,186],[`biology`,`computing`,64],[`medicine`,`computing`,77],[`medicine`,`economics`,29],[`computing`,`mathematics`,132],[`computing`,`engineering`,121],[`computing`,`economics`,46],[`mathematics`,`economics`,54],[`engineering`,`economics`,18]]})))()}function De(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),[n,i]=(0,V.useState)([]),a=(0,V.useMemo)(()=>U.map(t=>e(`hubs.${t}`)),[e]),s=(0,V.useMemo)(()=>G.map(([e,t,n])=>({source:e,target:t,value:n})),[]),c=(0,V.useMemo)(()=>new Intl.NumberFormat(t.language,{maximumFractionDigits:1}),[t.language]),l=(0,V.useMemo)(()=>t=>e(`hubs.millions`,{value:c.format(t)}),[c,e]),u=e=>i(e.hiddenIndexes),d=U.length-n.length,f=G.filter(([e,t])=>!n.includes(e)&&!n.includes(t)),m=f.reduce((e,[,,t])=>e+t,0);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsxs)(p,{gap:8,wrap:!0,align:`center`,children:[(0,H.jsx)(o,{variant:`outline`,size:`small`,disabled:n.length===0,onClick:()=>i([]),children:e(`hubs.showAll`)}),(0,H.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>i(U.flatMap((e,t)=>W.has(e)?[]:[t])),children:e(`hubs.eastOnly`)}),(0,H.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>i(U.flatMap((e,t)=>W.has(e)?[t]:[])),children:e(`hubs.westOnly`)})]}),(0,H.jsx)(_,{groups:a,links:s,legend:{position:`top`},hidden:n,onToggle:u,format:l,padAngle:2,height:460,ariaLabel:e(`hubs.aria`)}),(0,H.jsx)(`output`,{"aria-live":`polite`,children:d<2?e(`hubs.tooFew`):e(`hubs.summary`,{shown:d,total:U.length,routes:f.length,passengers:l(m)})})]})}var V,H,U,W,G;function Oe(){return(Oe=e((()=>{V=t(),i(),a(),m(),g(),H=n(),U=[`london`,`paris`,`frankfurt`,`istanbul`,`dubai`,`singapore`,`tokyo`,`newYork`],W=new Set([`dubai`,`singapore`,`tokyo`,`istanbul`]),G=[[0,1,2.1],[0,2,1.6],[0,3,1.9],[0,4,3.4],[0,5,1.2],[0,6,.9],[0,7,3.9],[1,2,1.1],[1,3,1.4],[1,4,1.8],[1,5,.8],[1,6,1],[1,7,2.6],[2,3,1.7],[2,4,1.5],[2,5,.9],[2,6,.8],[2,7,1.9],[3,4,1.3],[3,7,.7],[4,5,1.6],[4,6,.9],[4,7,1.1],[5,6,1.4],[6,7,1.2]]})))()}function ke(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ae(e){let t=ke(e*2654435761),n=1+.25*Math.sin(e/4),r=e%12>=8;return Me.map(e=>e.map((e,i)=>{if(!e)return 0;let a=r&&(J[i]===`orders`||J[i]===`payments`)?2:1;return Math.round(e*n*a*(.85+.3*t()))}))}function je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),[n,i]=(0,K.useState)(0),[a,s]=(0,K.useState)(!0);(0,K.useEffect)(()=>{if(!a)return;let e=setInterval(()=>i(e=>e+1),2e3);return()=>clearInterval(e)},[a]);let c=(0,K.useMemo)(()=>Ae(n),[n]),l=(0,K.useMemo)(()=>J.map(t=>e(`calls.services.${t}`)),[e]),u=(0,K.useMemo)(()=>{let n=new Intl.NumberFormat(t.language);return t=>e(`calls.perSecond`,{value:n.format(t)})},[t.language,e]),d=0,f={from:0,to:0,value:0};return c.forEach((e,t)=>e.forEach((e,n)=>{d+=e,e>f.value&&(f={from:t,to:n,value:e})})),(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsxs)(p,{gap:12,wrap:!0,align:`center`,justify:`between`,children:[(0,q.jsx)(`output`,{"aria-live":`polite`,children:e(`calls.summary`,{total:u(d),from:l[f.from],to:l[f.to],value:u(f.value)})}),(0,q.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>s(e=>!e),children:e(a?`calls.pause`:`calls.resume`)})]}),(0,q.jsx)(_,{groups:l,matrix:c,directed:!0,ribbonColor:`source`,format:u,ticks:!1,legend:!1,height:420,ariaLabel:e(`calls.aria`)})]})}var K,q,J,Me;function Ne(){return(Ne=e((()=>{K=t(),i(),a(),m(),g(),q=n(),J=[`gateway`,`users`,`orders`,`inventory`,`payments`,`notifications`],Me=[[0,420,360,180,0,0],[0,0,40,0,0,90],[0,120,0,260,210,150],[0,0,30,0,0,20],[0,60,80,0,0,110],[0,30,0,0,0,0]]})))()}function Pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,i=(0,Y.useMemo)(()=>Ie.map(({key:t,color:n})=>({name:e(`regions.${t}`),color:n})),[e]),a=(0,Y.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`migrationValue`,{value:t.format(n)})},[n,e]);return(0,Fe.jsx)(_,{groups:i,matrix:Le,format:a,padAngle:3,height:460,ariaLabel:e(`migrationAria`)})}var Y,Fe,Ie,Le;function Re(){return(Re=e((()=>{Y=t(),i(),g(),Fe=n(),Ie=[{key:`northAmerica`,color:`#3b82f6`},{key:`latinAmerica`,color:`#10b981`},{key:`europe`,color:`#8b5cf6`},{key:`africa`,color:`#f59e0b`},{key:`westAsia`,color:`#ef4444`},{key:`southAsia`,color:`#ec4899`},{key:`eastAsia`,color:`#06b6d4`},{key:`oceania`,color:`#84cc16`}],Le=[[.4,.6,.5,.1,.1,.2,.4,.1],[3.2,.9,1.1,0,0,0,.1,.1],[.8,.3,2.6,.3,.4,.1,.2,.3],[.5,0,2.2,1.8,1.4,0,.1,.1],[.4,0,1.9,.2,1.2,.1,0,.1],[1.1,0,1,.1,4.6,.6,.2,.4],[1.2,.1,.6,.1,.2,.1,.9,.5],[.1,0,.2,0,0,0,.1,.1]]})))()}function ze(){let{t:e}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),[t,n]=(0,X.useState)(`auto`),[i,a]=(0,X.useState)(`none`),[o,c]=(0,X.useState)(`gradient`),[l,d]=(0,X.useState)(!1),[m,h]=(0,X.useState)(!0),ee=(0,X.useMemo)(()=>Be.map(t=>e(`teams.${t}`)),[e]);return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsxs)(p,{gap:16,wrap:!0,align:`center`,children:[(0,Z.jsx)(s,{"aria-label":e(`labelsLabel`),direction:`horizontal`,value:t,onChange:e=>n(e),children:He.map(t=>(0,Z.jsx)(u,{value:t,label:e(`labels.${t}`)},t))}),(0,Z.jsx)(s,{"aria-label":e(`sortLabel`),direction:`horizontal`,value:i,onChange:e=>a(e),children:Ue.map(t=>(0,Z.jsx)(u,{value:t,label:e(`sort.${t}`)},t))})]}),(0,Z.jsxs)(p,{gap:16,wrap:!0,align:`center`,children:[(0,Z.jsx)(s,{"aria-label":e(`ribbonColorLabel`),direction:`horizontal`,value:o,onChange:e=>c(e),children:We.map(t=>(0,Z.jsx)(u,{value:t,label:e(`ribbonColor.${t}`)},t))}),(0,Z.jsx)(f,{checked:l,onChange:d,label:e(`directed`)}),(0,Z.jsx)(f,{checked:m,onChange:h,label:e(`ticks`)})]}),(0,Z.jsx)(_,{groups:ee,matrix:Ve,labels:t,sortGroups:i,ribbonColor:o,directed:l,ticks:m,height:400,ariaLabel:e(`teamsAria`)})]})}var X,Z,Be,Ve,He,Ue,We;function Ge(){return(Ge=e((()=>{X=t(),i(),m(),c(),l(),d(),g(),Z=n(),Be=[`design`,`engineering`,`product`,`marketing`],Ve=[[0,42,28,14],[36,0,54,8],[30,48,0,22],[12,6,26,0]],He=[`auto`,`tangential`,`radial`,`none`],Ue=[`none`,`descending`,`ascending`],We=[`gradient`,`source`,`target`,`neutral`]})))()}function Ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,i=(0,Q.useMemo)(()=>$.map(t=>e(`economies.${t}`)),[e]),a=(0,Q.useMemo)(()=>Je.map(([e,t,n])=>({source:$.indexOf(e),target:$.indexOf(t),value:n})),[]),o=(0,Q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e9)},[n]);return(0,qe.jsx)(_,{groups:i,links:a,format:o,tickFormat:o,sortGroups:`descending`,height:460,ariaLabel:e(`tradeAria`)})}var Q,qe,$,Je;function Ye(){return(Ye=e((()=>{Q=t(),i(),g(),qe=n(),$=[`us`,`china`,`eu`,`mexico`,`canada`,`japan`,`korea`],Je=[[`us`,`china`,148],[`china`,`us`,427],[`us`,`eu`,368],[`eu`,`us`,576],[`us`,`mexico`,323],[`mexico`,`us`,475],[`us`,`canada`,354],[`canada`,`us`,421],[`us`,`japan`,76],[`japan`,`us`,148],[`us`,`korea`,65],[`korea`,`us`,116],[`china`,`eu`,550],[`eu`,`china`,245],[`china`,`japan`,158],[`japan`,`china`,135],[`china`,`korea`,149],[`korea`,`china`,125],[`china`,`mexico`,82],[`mexico`,`china`,10],[`canada`,`eu`,32],[`eu`,`canada`,52],[`japan`,`eu`,80],[`eu`,`japan`,75],[`korea`,`eu`,68],[`eu`,`korea`,57]]})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

const TEAMS = ["design", "engineering", "product", "marketing"] as const;

// Messages sent in a week: row = sender, column = recipient
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(() => TEAMS.map((team) => t(\`teams.\${team}\`)), [t]);

  return (
    <ChordChart groups={groups} matrix={MATRIX} ariaLabel={t("teamsAria")} />
  );
}
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { ChordChart, type ChordGroup } from "minerva-design/charts";

// Mobile operators (brand names are not translated) and the "other" bucket
const CARRIERS = ["Telora", "Vexa", "Mobix", "Airlink"] as const;
const COLORS = [
  "var(--chart-series-1)",
  "var(--chart-series-2)",
  "var(--chart-series-3)",
  "var(--chart-series-4)",
  "var(--text-muted-color)",
];

// Subscribers who switched operator, in thousands: row = operator left,
// column = operator joined
const YEARS: Record<number, number[][]> = {
  2023: [
    [0, 84, 52, 31, 12],
    [61, 0, 38, 22, 9],
    [44, 41, 0, 18, 7],
    [26, 19, 21, 0, 5],
    [10, 8, 9, 4, 0],
  ],
  2024: [
    [0, 112, 48, 35, 14],
    [52, 0, 34, 25, 8],
    [40, 58, 0, 21, 6],
    [24, 31, 19, 0, 6],
    [9, 12, 8, 5, 0],
  ],
  2025: [
    [0, 96, 41, 62, 13],
    [58, 0, 30, 49, 9],
    [37, 44, 0, 38, 7],
    [21, 27, 16, 0, 4],
    [8, 10, 7, 11, 0],
  ],
};
const YEAR_LIST = Object.keys(YEARS).map(Number);

export default function BrandSwitchingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [year, setYear] = useState(2025);
  const matrix = YEARS[year]!;

  const names = useMemo(() => [...CARRIERS, t("switching.other")], [t]);
  const groups = useMemo(
    (): ChordGroup[] => names.map((name, i) => ({ name, color: COLORS[i] })),
    [names],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => number.format(value * 1000);
  }, [i18n.language]);
  const signed = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      notation: "compact",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) => number.format(value * 1000);
  }, [i18n.language]);

  // net switchers: subscribers won minus subscribers lost
  const net = names
    .map((name, i) => {
      const won = matrix.reduce((sum, row) => sum + row[i]!, 0);
      const lost = matrix[i]!.reduce((sum, value) => sum + value, 0);
      return { name, net: won - lost };
    })
    .sort((a, b) => b.net - a.net);
  const winner = net[0]!;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("switching.yearLabel")}
        direction="horizontal"
        value={year}
        onChange={(value) => setYear(Number(value))}
      >
        {YEAR_LIST.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("switching.year", { year: value })}
          />
        ))}
      </RadioGroup>
      <ChordChart
        groups={groups}
        matrix={matrix}
        directed
        ribbonColor="target"
        format={format}
        padAngle={3}
        height={420}
        ariaLabel={t("switching.aria", { year })}
      />
      <output aria-live="polite">
        {t("switching.summary", {
          name: winner.name,
          value: signed(winner.net),
          list: new Intl.ListFormat(i18n.language, { type: "unit" }).format(
            net.map((item) =>
              t("switching.net", { name: item.name, value: signed(item.net) }),
            ),
          ),
        })}
      </output>
    </div>
  );
}
`})))()}var et;function tt(){return(tt=e((()=>{et=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ChordChart,
  type ChordLink,
  type ShapeHoverEvent,
} from "minerva-design/charts";

const CATEGORIES = [
  "coffee",
  "milk",
  "bread",
  "pastries",
  "fruit",
  "cereal",
  "yogurt",
  "juice",
] as const;
type Category = (typeof CATEGORIES)[number];

// Baskets of a month where two categories were bought together, out of
// 48,000 baskets
const BASKETS = 48000;
const TOGETHER: [Category, Category, number][] = [
  ["coffee", "milk", 3120],
  ["coffee", "pastries", 2460],
  ["coffee", "bread", 980],
  ["milk", "cereal", 2780],
  ["milk", "bread", 1640],
  ["milk", "yogurt", 920],
  ["bread", "pastries", 610],
  ["bread", "fruit", 740],
  ["fruit", "yogurt", 1980],
  ["fruit", "juice", 1210],
  ["fruit", "cereal", 860],
  ["cereal", "yogurt", 1130],
  ["juice", "pastries", 540],
  ["juice", "cereal", 420],
];

export default function CoPurchaseDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(
    () => CATEGORIES.map((category) => t(\`basket.categories.\${category}\`)),
    [t],
  );
  const links = useMemo(
    (): ChordLink[] =>
      TOGETHER.map(([a, b, value]) => ({
        source: CATEGORIES.indexOf(a),
        target: CATEGORIES.indexOf(b),
        value,
      })),
    [],
  );
  const { number, compact, percent } = useMemo(
    () => ({
      number: new Intl.NumberFormat(i18n.language),
      compact: new Intl.NumberFormat(i18n.language, {
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );
  const tickFormat = useMemo(
    () => (value: number) => compact.format(value),
    [compact],
  );

  const tooltip = (event: ShapeHoverEvent) =>
    event.source && event.target ? (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>
          {t("basket.pair", { a: event.source, b: event.target })}
        </strong>
        <span>
          {t("basket.together", {
            value: number.format(event.value),
            share: percent.format(event.value / BASKETS),
          })}
        </span>
      </div>
    ) : (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>
          {t("basket.withOthers", { value: number.format(event.value) })}
        </span>
      </div>
    );

  return (
    <ChordChart
      groups={groups}
      links={links}
      sortGroups="descending"
      sortSubgroups="descending"
      ticks={1000}
      tickFormat={tickFormat}
      format={format}
      renderTooltip={tooltip}
      legend={false}
      height={440}
      ariaLabel={t("basket.aria")}
    />
  );
}
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

// a dark operations-console palette, read by the chart from these variables
const CONSOLE = {
  "--background-color": "#0b1020",
  "--surface-color": "#0b1020",
  "--surface-elevated-color": "#141b2e",
  "--text-color": "#e2e8f0",
  "--text-secondary-color": "#8a94ad",
  "--border-color": "#1f2a44",
  background: "#0b1020",
  color: "#e2e8f0",
  borderRadius: 12,
  padding: 12,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

const NEON = ["#22d3ee", "#a78bfa", "#f472b6", "#facc15", "#34d399", "#fb923c"];

const REGIONS = [
  "usEast",
  "usWest",
  "euCentral",
  "apSoutheast",
  "apNortheast",
  "saEast",
] as const;

// Replication traffic between data centers, in Gbit/s (average of a day)
const TRAFFIC = [
  [0, 42, 36, 12, 14, 9],
  [38, 0, 11, 18, 22, 3],
  [31, 9, 0, 14, 7, 4],
  [10, 16, 12, 0, 26, 1],
  [12, 20, 6, 24, 0, 1],
  [8, 2, 3, 1, 1, 0],
];

export default function DarkDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    () => REGIONS.map((region) => t(\`datacenters.\${region}\`)),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("gbps", { value: number.format(value) });
  }, [locale, t]);

  return (
    <div style={CONSOLE}>
      <ChordChart
        groups={groups}
        matrix={TRAFFIC}
        palette={NEON}
        format={format}
        padAngle={4}
        arcWidth={10}
        ribbonOpacity={0.55}
        height={440}
        ariaLabel={t("datacentersAria")}
      />
    </div>
  );
}
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

const MODULES = [
  "app",
  "router",
  "store",
  "uiKit",
  "apiClient",
  "auth",
  "i18n",
  "utils",
] as const;

// Import statements of a front-end codebase: row = importing module,
// column = imported module. store ⇄ apiClient and auth ⇄ apiClient are
// import cycles: their ribbons have both a value and a reverse value.
const IMPORTS = [
  [0, 12, 9, 24, 6, 5, 7, 10],
  [0, 0, 2, 3, 0, 4, 1, 5],
  [0, 0, 0, 0, 14, 3, 0, 8],
  [0, 1, 4, 0, 0, 0, 9, 16],
  [0, 0, 2, 0, 0, 7, 0, 11],
  [0, 2, 3, 2, 6, 0, 1, 6],
  [0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export default function DependenciesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(
    () => MODULES.map((module) => t(\`modules.\${module}\`)),
    [t],
  );

  return (
    <ChordChart
      groups={groups}
      matrix={IMPORTS}
      directed
      ribbonColor="source"
      sortGroups="descending"
      labels="radial"
      ticks={false}
      height={440}
      ariaLabel={t("modulesAria")}
    />
  );
}
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ShapeHoverEvent } from "minerva-design/charts";

const PAGES = [
  "home",
  "search",
  "category",
  "product",
  "cart",
  "checkout",
] as const;

// Page-to-page navigations of a shop app in a day, in thousands: row = page
// left, column = page opened next
const NAVIGATIONS = [
  [0, 18.4, 12.6, 6.2, 1.4, 0],
  [2.8, 0, 3.1, 21.5, 0.6, 0],
  [3.4, 2.2, 0, 14.8, 0.4, 0],
  [4.1, 6.3, 5.2, 0, 9.6, 0.8],
  [1.2, 0.5, 0.3, 3.9, 0, 6.4],
  [0.9, 0, 0, 0.2, 1.6, 0],
];

export default function DirectedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const groups = useMemo(() => PAGES.map((page) => t(\`pages.\${page}\`)), [t]);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("visits", { value: number.format(value) });
  }, [locale, t]);

  const caption = !hovered
    ? t("navHint")
    : hovered.source !== undefined && hovered.target !== undefined
      ? t("navFlow", {
          source: hovered.source,
          target: hovered.target,
          value: format(hovered.value),
          reverse: format(hovered.reverseValue ?? 0),
        })
      : t("navPage", { name: hovered.name, value: format(hovered.value) });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ChordChart
        groups={groups}
        matrix={NAVIGATIONS}
        directed
        format={format}
        ribbonOpacity={0.7}
        padAngle={3}
        height={440}
        onHover={setHovered}
        ariaLabel={t("navAria")}
      />
      <div
        aria-live="polite"
        style={{
          minHeight: 22,
          textAlign: "center",
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        {caption}
      </div>
    </div>
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  ChordChart,
  type ChordLink,
  type ShapeHoverEvent,
} from "minerva-design/charts";

const FACULTIES = [
  "physics",
  "chemistry",
  "biology",
  "medicine",
  "computing",
  "mathematics",
  "economics",
  "engineering",
] as const;
type Faculty = (typeof FACULTIES)[number];

// Papers co-authored by two faculties over five years
const PAIRS: [Faculty, Faculty, number][] = [
  ["physics", "chemistry", 142],
  ["physics", "mathematics", 118],
  ["physics", "engineering", 164],
  ["physics", "computing", 71],
  ["chemistry", "biology", 96],
  ["chemistry", "medicine", 58],
  ["chemistry", "engineering", 83],
  ["biology", "medicine", 186],
  ["biology", "computing", 64],
  ["medicine", "computing", 77],
  ["medicine", "economics", 29],
  ["computing", "mathematics", 132],
  ["computing", "engineering", 121],
  ["computing", "economics", 46],
  ["mathematics", "economics", 54],
  ["engineering", "economics", 18],
];

export default function FocusDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [focus, setFocus] = useState<Faculty | null>(null);
  const [pair, setPair] = useState<[string, string, number] | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );
  const name = (faculty: Faculty) => t(\`research.faculties.\${faculty}\`);

  const groups = useMemo(
    () => FACULTIES.map((f) => t(\`research.faculties.\${f}\`)),
    [t],
  );
  // ribbons of the focused faculty keep their gradient, the others fade out
  const links = useMemo(
    (): ChordLink[] =>
      PAIRS.map(([a, b, value]) => ({
        source: FACULTIES.indexOf(a),
        target: FACULTIES.indexOf(b),
        value,
        ...(focus && a !== focus && b !== focus
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [focus],
  );

  const onClick = (event: ShapeHoverEvent) => {
    if (event.index < FACULTIES.length) {
      const faculty = FACULTIES[event.index]!;
      setFocus((current) => (current === faculty ? null : faculty));
      setPair(null);
    } else if (event.source && event.target) {
      setPair([event.source, event.target, event.value]);
    }
  };

  let readout = t("research.hint");
  if (pair) {
    readout = t("research.pair", {
      a: pair[0],
      b: pair[1],
      value: number.format(pair[2]),
    });
  } else if (focus) {
    const partners = PAIRS.filter(([a, b]) => a === focus || b === focus)
      .map(([a, b, value]) => ({ partner: a === focus ? b : a, value }))
      .sort((x, y) => y.value - x.value);
    readout = t("research.focus", {
      name: name(focus),
      total: number.format(partners.reduce((sum, p) => sum + p.value, 0)),
      partners: new Intl.ListFormat(i18n.language, {
        type: "conjunction",
      }).format(
        partners.slice(0, 3).map((p) =>
          t("research.partner", {
            name: name(p.partner),
            value: number.format(p.value),
          }),
        ),
      ),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ChordChart
        groups={groups}
        links={links}
        format={format}
        legend={false}
        onClick={onClick}
        height={440}
        ariaLabel={t("research.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{readout}</output>
        <Button
          variant="outline"
          size="small"
          disabled={!focus && !pair}
          onClick={() => {
            setFocus(null);
            setPair(null);
          }}
        >
          {t("research.clear")}
        </Button>
      </HStack>
    </div>
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { ChordChart, type ShapeToggleEvent } from "minerva-design/charts";

const HUBS = [
  "london",
  "paris",
  "frankfurt",
  "istanbul",
  "dubai",
  "singapore",
  "tokyo",
  "newYork",
] as const;
const EAST = new Set<string>(["dubai", "singapore", "tokyo", "istanbul"]);

// Yearly passengers between airport hubs, in millions (both directions)
const ROUTES: [number, number, number][] = [
  [0, 1, 2.1],
  [0, 2, 1.6],
  [0, 3, 1.9],
  [0, 4, 3.4],
  [0, 5, 1.2],
  [0, 6, 0.9],
  [0, 7, 3.9],
  [1, 2, 1.1],
  [1, 3, 1.4],
  [1, 4, 1.8],
  [1, 5, 0.8],
  [1, 6, 1.0],
  [1, 7, 2.6],
  [2, 3, 1.7],
  [2, 4, 1.5],
  [2, 5, 0.9],
  [2, 6, 0.8],
  [2, 7, 1.9],
  [3, 4, 1.3],
  [3, 7, 0.7],
  [4, 5, 1.6],
  [4, 6, 0.9],
  [4, 7, 1.1],
  [5, 6, 1.4],
  [6, 7, 1.2],
];

export default function LegendDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [hidden, setHidden] = useState<readonly number[]>([]);
  const groups = useMemo(() => HUBS.map((hub) => t(\`hubs.\${hub}\`)), [t]);
  const links = useMemo(
    () => ROUTES.map(([source, target, value]) => ({ source, target, value })),
    [],
  );
  const decimal = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) =>
      t("hubs.millions", { value: decimal.format(value) }),
    [decimal, t],
  );

  // the legend only reports the toggle: the hidden list lives here
  const onToggle = (event: ShapeToggleEvent) => setHidden(event.hiddenIndexes);

  const shown = HUBS.length - hidden.length;
  const visible = ROUTES.filter(
    ([a, b]) => !hidden.includes(a) && !hidden.includes(b),
  );
  const passengers = visible.reduce((sum, [, , value]) => sum + value, 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <Button
          variant="outline"
          size="small"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("hubs.showAll")}
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={() =>
            setHidden(HUBS.flatMap((hub, i) => (EAST.has(hub) ? [] : [i])))
          }
        >
          {t("hubs.eastOnly")}
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={() =>
            setHidden(HUBS.flatMap((hub, i) => (EAST.has(hub) ? [i] : [])))
          }
        >
          {t("hubs.westOnly")}
        </Button>
      </HStack>
      <ChordChart
        groups={groups}
        links={links}
        legend={{ position: "top" }}
        hidden={hidden}
        onToggle={onToggle}
        format={format}
        padAngle={2}
        height={460}
        ariaLabel={t("hubs.aria")}
      />
      <output aria-live="polite">
        {shown < 2
          ? t("hubs.tooFew")
          : t("hubs.summary", {
              shown,
              total: HUBS.length,
              routes: visible.length,
              passengers: format(passengers),
            })}
      </output>
    </div>
  );
}
`})))()}var ft;function pt(){return(pt=e((()=>{ft=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { ChordChart } from "minerva-design/charts";

const SERVICES = [
  "gateway",
  "users",
  "orders",
  "inventory",
  "payments",
  "notifications",
] as const;

// Typical calls per second: row = caller, column = callee
const BASE = [
  [0, 420, 360, 180, 0, 0],
  [0, 0, 40, 0, 0, 90],
  [0, 120, 0, 260, 210, 150],
  [0, 0, 30, 0, 0, 20],
  [0, 60, 80, 0, 0, 110],
  [0, 30, 0, 0, 0, 0],
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

// The call matrix at a given tick: a traffic wave plus seeded noise; every
// 12 ticks a checkout campaign doubles the order and payment calls for a while
function calls(tick: number) {
  const random = mulberry32(tick * 2654435761);
  const wave = 1 + 0.25 * Math.sin(tick / 4);
  const campaign = tick % 12 >= 8;
  return BASE.map((row) =>
    row.map((value, j) => {
      if (!value) return 0;
      const boost =
        campaign && (SERVICES[j] === "orders" || SERVICES[j] === "payments")
          ? 2
          : 1;
      return Math.round(value * wave * boost * (0.85 + 0.3 * random()));
    }),
  );
}

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(id);
  }, [running]);

  const matrix = useMemo(() => calls(tick), [tick]);
  const groups = useMemo(
    () => SERVICES.map((service) => t(\`calls.services.\${service}\`)),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language);
    return (value: number) =>
      t("calls.perSecond", { value: number.format(value) });
  }, [i18n.language, t]);

  let total = 0;
  let busiest = { from: 0, to: 0, value: 0 };
  matrix.forEach((row, i) =>
    row.forEach((value, j) => {
      total += value;
      if (value > busiest.value) busiest = { from: i, to: j, value };
    }),
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">
          {t("calls.summary", {
            total: format(total),
            from: groups[busiest.from],
            to: groups[busiest.to],
            value: format(busiest.value),
          })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("calls.pause") : t("calls.resume")}
        </Button>
      </HStack>
      <ChordChart
        groups={groups}
        matrix={matrix}
        directed
        ribbonColor="source"
        format={format}
        ticks={false}
        legend={false}
        height={420}
        ariaLabel={t("calls.aria")}
      />
    </div>
  );
}
`})))()}var mt;function ht(){return(ht=e((()=>{mt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ChordGroup } from "minerva-design/charts";

const REGIONS = [
  { key: "northAmerica", color: "#3b82f6" },
  { key: "latinAmerica", color: "#10b981" },
  { key: "europe", color: "#8b5cf6" },
  { key: "africa", color: "#f59e0b" },
  { key: "westAsia", color: "#ef4444" },
  { key: "southAsia", color: "#ec4899" },
  { key: "eastAsia", color: "#06b6d4" },
  { key: "oceania", color: "#84cc16" },
];

// Migrants over five years, in millions (rounded, illustrative): row = region
// of origin, column = region of destination; the diagonal is migration
// within a region, drawn as a loop
const MATRIX = [
  [0.4, 0.6, 0.5, 0.1, 0.1, 0.2, 0.4, 0.1],
  [3.2, 0.9, 1.1, 0, 0, 0, 0.1, 0.1],
  [0.8, 0.3, 2.6, 0.3, 0.4, 0.1, 0.2, 0.3],
  [0.5, 0, 2.2, 1.8, 1.4, 0, 0.1, 0.1],
  [0.4, 0, 1.9, 0.2, 1.2, 0.1, 0, 0.1],
  [1.1, 0, 1, 0.1, 4.6, 0.6, 0.2, 0.4],
  [1.2, 0.1, 0.6, 0.1, 0.2, 0.1, 0.9, 0.5],
  [0.1, 0, 0.2, 0, 0, 0, 0.1, 0.1],
];

export default function MigrationDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    (): ChordGroup[] =>
      REGIONS.map(({ key, color }) => ({
        name: t(\`regions.\${key}\`),
        color,
      })),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) =>
      t("migrationValue", { value: number.format(value) });
  }, [locale, t]);

  return (
    <ChordChart
      groups={groups}
      matrix={MATRIX}
      format={format}
      padAngle={3}
      height={460}
      ariaLabel={t("migrationAria")}
    />
  );
}
`})))()}var gt;function _t(){return(_t=e((()=>{gt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import { ChordChart, type ChordChartProps } from "minerva-design/charts";

type Labels = NonNullable<ChordChartProps["labels"]>;
type Sort = NonNullable<ChordChartProps["sortGroups"]>;
type RibbonColor = NonNullable<ChordChartProps["ribbonColor"]>;

const TEAMS = ["design", "engineering", "product", "marketing"] as const;
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

const LABELS: Labels[] = ["auto", "tangential", "radial", "none"];
const SORTS: Sort[] = ["none", "descending", "ascending"];
const COLORS: RibbonColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [labels, setLabels] = useState<Labels>("auto");
  const [sortGroups, setSortGroups] = useState<Sort>("none");
  const [ribbonColor, setRibbonColor] = useState<RibbonColor>("gradient");
  const [directed, setDirected] = useState(false);
  const [ticks, setTicks] = useState(true);

  const groups = useMemo(() => TEAMS.map((team) => t(\`teams.\${team}\`)), [t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("labelsLabel")}
          direction="horizontal"
          value={labels}
          onChange={(value) => setLabels(value as Labels)}
        >
          {LABELS.map((value) => (
            <Radio key={value} value={value} label={t(\`labels.\${value}\`)} />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("sortLabel")}
          direction="horizontal"
          value={sortGroups}
          onChange={(value) => setSortGroups(value as Sort)}
        >
          {SORTS.map((value) => (
            <Radio key={value} value={value} label={t(\`sort.\${value}\`)} />
          ))}
        </RadioGroup>
      </HStack>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("ribbonColorLabel")}
          direction="horizontal"
          value={ribbonColor}
          onChange={(value) => setRibbonColor(value as RibbonColor)}
        >
          {COLORS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t(\`ribbonColor.\${value}\`)}
            />
          ))}
        </RadioGroup>
        <Switch
          checked={directed}
          onChange={setDirected}
          label={t("directed")}
        />
        <Switch checked={ticks} onChange={setTicks} label={t("ticks")} />
      </HStack>
      <ChordChart
        groups={groups}
        matrix={MATRIX}
        labels={labels}
        sortGroups={sortGroups}
        ribbonColor={ribbonColor}
        directed={directed}
        ticks={ticks}
        height={400}
        ariaLabel={t("teamsAria")}
      />
    </div>
  );
}
`})))()}var vt;function yt(){return(yt=e((()=>{vt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ChordLink } from "minerva-design/charts";

type Economy = "us" | "china" | "eu" | "mexico" | "canada" | "japan" | "korea";

const ECONOMIES: Economy[] = [
  "us",
  "china",
  "eu",
  "mexico",
  "canada",
  "japan",
  "korea",
];

// Goods exports of a year, in billions of US$ (rounded, illustrative)
const EXPORTS: [Economy, Economy, number][] = [
  ["us", "china", 148],
  ["china", "us", 427],
  ["us", "eu", 368],
  ["eu", "us", 576],
  ["us", "mexico", 323],
  ["mexico", "us", 475],
  ["us", "canada", 354],
  ["canada", "us", 421],
  ["us", "japan", 76],
  ["japan", "us", 148],
  ["us", "korea", 65],
  ["korea", "us", 116],
  ["china", "eu", 550],
  ["eu", "china", 245],
  ["china", "japan", 158],
  ["japan", "china", 135],
  ["china", "korea", 149],
  ["korea", "china", 125],
  ["china", "mexico", 82],
  ["mexico", "china", 10],
  ["canada", "eu", 32],
  ["eu", "canada", 52],
  ["japan", "eu", 80],
  ["eu", "japan", 75],
  ["korea", "eu", 68],
  ["eu", "korea", 57],
];

export default function TradeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    () => ECONOMIES.map((economy) => t(\`economies.\${economy}\`)),
    [t],
  );
  const links = useMemo(
    (): ChordLink[] =>
      EXPORTS.map(([from, to, value]) => ({
        source: ECONOMIES.indexOf(from),
        target: ECONOMIES.indexOf(to),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => usd.format(value * 1e9);
  }, [locale]);

  return (
    <ChordChart
      groups={groups}
      links={links}
      format={format}
      tickFormat={format}
      sortGroups="descending"
      height={460}
      ariaLabel={t("tradeAria")}
    />
  );
}
`})))()}var bt,xt,St;function Ct(){return(Ct=e((()=>{ce(),fe(),ge(),k(),P(),we(),Ee(),Oe(),Ne(),Re(),Ge(),Ye(),Ze(),$e(),tt(),rt(),at(),st(),lt(),dt(),pt(),ht(),_t(),yt(),t(),ee(),ne(),bt=n(),xt=h(Object.assign({"./demos/basic.tsx":re,"./demos/brand-switching.tsx":le,"./demos/co-purchase.tsx":pe,"./demos/dark.tsx":_e,"./demos/dependencies.tsx":be,"./demos/directed.tsx":xe,"./demos/focus.tsx":Te,"./demos/legend.tsx":De,"./demos/live.tsx":je,"./demos/migration.tsx":Pe,"./demos/options.tsx":ze,"./demos/trade.tsx":Ke}),Object.assign({"./demos/basic.tsx":Xe,"./demos/brand-switching.tsx":Qe,"./demos/co-purchase.tsx":et,"./demos/dark.tsx":nt,"./demos/dependencies.tsx":it,"./demos/directed.tsx":ot,"./demos/focus.tsx":ct,"./demos/legend.tsx":ut,"./demos/live.tsx":ft,"./demos/migration.tsx":mt,"./demos/options.tsx":gt,"./demos/trade.tsx":vt})),St=()=>(0,bt.jsx)(te,{id:`chord-chart`,demos:xt})})))()}Ct();export{St as default};