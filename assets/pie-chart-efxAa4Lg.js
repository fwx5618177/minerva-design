import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{n as s,t as c}from"./Checkbox-CbTtg99U.js";import{i as l,n as u,r as d,t as f}from"./Radio-D2wZ9q6z.js";import{n as p,t as m}from"./Tag-C33GIXr-.js";import{i as h,r as g}from"./Stack-DOPoCF_W.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-CHJwIegD.js";import{c as _,p as v,u as y}from"./shapes-B5QcpBlT.js";function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,b.useState)(null),o=(0,b.useMemo)(()=>ae.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),[e]),s=(0,b.useMemo)(()=>new Intl.NumberFormat(n),[n]),c=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(y,{data:o,format:e=>s.format(e),percentFormat:e=>c.format(e),renderTooltip:t=>(0,x.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,x.jsx)(`strong`,{children:t.name}),(0,x.jsx)(`span`,{children:e(`sessionsShare`,{sessions:s.format(t.value),share:c.format(t.percent)})})]}),onClick:a,height:320,ariaLabel:e(`sessionsAria`)}),(0,x.jsx)(`p`,{role:`status`,children:i?e(`selectedSource`,{source:i.name,sessions:s.format(i.value),share:c.format(i.percent)}):e(`clickSlice`)})]})}var b,x,ae;function oe(){return(oe=e((()=>{b=t(),i(),_(),x=n(),ae=[{key:`organic`,value:48200},{key:`direct`,value:23100},{key:`social`,value:16400},{key:`paid`,value:12700},{key:`referral`,value:9800},{key:`email`,value:6100}]})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,S.useState)(null),o=(0,S.useMemo)(()=>C.map(({key:t,value:n})=>({name:e(`plans.${t}`),value:n})),[e]),s=(0,S.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),[n]),c=new Intl.NumberFormat(n,{style:`percent`}),l=e=>s.format(e);return(0,ce.jsx)(v,{data:o,format:l,centerValue:l(i?i.value:le),centerLabel:i?`${i.name} · ${c.format(i.percent)}`:e(`monthlyRevenue`),onHover:a,tooltip:!1,legend:de,labelContent:ue,height:320,ariaLabel:e(`mrrAria`)})}var S,ce,C,le,ue,de;function fe(){return(fe=e((()=>{S=t(),i(),_(),ce=n(),C=[{key:`enterprise`,value:48200},{key:`business`,value:31500},{key:`pro`,value:22800},{key:`starter`,value:9400}],le=C.reduce((e,t)=>e+t.value,0),ue=[`name`,`value`],de={toggle:!1}})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,w.useState)(null),[s,c]=(0,w.useState)(null),l=(0,w.useMemo)(()=>{if(i===null)return E.map(t=>({name:e(`cloud.categories.${t.key}`),value:D(t.services),color:t.color}));let{color:t,services:n}=E[i];return n.map(([n,r],i)=>({name:e(`cloud.services.${n}`),value:r,color:he(t,i*.3)}))},[i,e]),u=(0,w.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0});return t=>e.format(t)},[n]),d=(0,w.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t)},[n]),f=e=>{a(e),c(null)},p=e=>i===null?f(e.index):c(e),m=i===null?null:e(`cloud.categories.${E[i].key}`),g=i===null?0:D(E[i].services);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,T.jsxs)(h,{gap:4,align:`center`,wrap:!0,as:`nav`,"aria-label":e(`cloud.breadcrumb`),children:[(0,T.jsx)(o,{size:`small`,variant:i===null?`solid`:`ghost`,"aria-current":i===null?`location`:void 0,onClick:()=>f(null),children:e(`cloud.all`)}),m&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`span`,{"aria-hidden":!0,children:`/`}),(0,T.jsx)(`strong`,{"aria-current":`location`,children:m})]})]}),(0,T.jsx)(y,{data:l,legend:!1,format:u,percentFormat:d,renderTooltip:t=>(0,T.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,T.jsx)(`strong`,{children:t.name}),(0,T.jsxs)(`span`,{children:[u(t.value),` · `,d(t.percent)]}),i===null&&(0,T.jsx)(`span`,{children:e(`cloud.clickToOpen`)})]}),onClick:p,height:320,ariaLabel:m?e(`cloud.servicesAria`,{category:m}):e(`cloud.aria`)}),(0,T.jsx)(`p`,{role:`status`,style:{margin:0},children:s&&m?e(`cloud.serviceLine`,{service:s.name,amount:u(s.value),share:d(s.percent),category:m}):m?e(`cloud.categoryLine`,{category:m,amount:u(g),share:d(g/me)}):e(`cloud.hint`,{total:u(me)})})]})}var w,T,E,D,me,he;function ge(){return(ge=e((()=>{w=t(),i(),a(),g(),_(),T=n(),E=[{key:`compute`,color:`#6366f1`,services:[[`vms`,8200],[`kubernetes`,5400],[`serverless`,1300]]},{key:`databases`,color:`#10b981`,services:[[`sql`,4300],[`nosql`,2100],[`cache`,900]]},{key:`storage`,color:`#0ea5e9`,services:[[`objects`,3100],[`blocks`,1900],[`backups`,800]]},{key:`network`,color:`#f59e0b`,services:[[`egress`,2600],[`cdn`,1400],[`loadBalancers`,600]]}],D=e=>e.reduce((e,[,t])=>e+t,0),me=E.reduce((e,t)=>e+D(t.services),0),he=(e,t)=>{let n=n=>{let r=parseInt(e.slice(n,n+2),16);return Math.round(r+(255-r)*t).toString(16).padStart(2,`0`)};return`#${n(1)}${n(3)}${n(5)}`}})))()}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,O.useState)(`outside`),[o,s]=(0,O.useState)([`name`,`percent`]),u=(0,O.useMemo)(()=>ve.map(({key:t,value:n})=>({name:e(`channels.${t}`),value:n})),[e]),d=(0,O.useMemo)(()=>A.filter(e=>o.includes(e)),[o]),p=(0,O.useMemo)(()=>new Intl.NumberFormat(n),[n]),m=(0,O.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),g=(e,t)=>s(n=>t?[...n,e]:n.filter(t=>t!==e));return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,k.jsx)(l,{"aria-label":e(`labelPlacement`),direction:`horizontal`,value:i,onChange:e=>a(e),children:ye.map(t=>(0,k.jsx)(f,{value:t,label:e(`placements.${t}`)},t))}),(0,k.jsx)(h,{gap:16,role:`group`,"aria-label":e(`labelContent`),children:A.map(t=>(0,k.jsx)(c,{label:e(`parts.${t}`),checked:o.includes(t),disabled:i===`none`||o.length===1&&o[0]===t,onChange:e=>g(t,e)},t))}),(0,k.jsx)(y,{data:u,labels:i,labelContent:d,format:e=>p.format(e),percentFormat:e=>m.format(e),renderTooltip:t=>(0,k.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,k.jsx)(`strong`,{children:t.name}),(0,k.jsx)(`span`,{children:e(`ticketsShare`,{tickets:p.format(t.value),share:m.format(t.percent)})})]}),height:340,ariaLabel:e(`ticketsAria`)})]})}var O,k,ve,A,ye;function be(){return(be=e((()=>{O=t(),i(),s(),g(),u(),d(),_(),k=n(),ve=[{key:`email`,value:1240},{key:`chat`,value:980},{key:`form`,value:610},{key:`phone`,value:430},{key:`social`,value:150},{key:`community`,value:90}],A=[`name`,`value`,`percent`],ye=[`outside`,`inside`,`none`]})))()}function xe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,j.useState)(F),[s,c]=(0,j.useState)(!0),l=(0,j.useRef)(xe(I));(0,j.useEffect)(()=>{if(!s)return;let e=window.setInterval(()=>{let e=N.map(()=>0),t=1+Math.floor(l.current()*4);for(let n=0;n<t;n++){let t=l.current(),n=0;for(;n<P.length-1&&t>=P[n];)t-=P[n],n++;e[n]+=1}a(t=>t.map((t,n)=>t+e[n]))},1200);return()=>window.clearInterval(e)},[s]);let u=(0,j.useMemo)(()=>N.map((t,n)=>({name:e(`poll.answers.${t}`),value:i[n]})),[e,i]),d=(0,j.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),p=i.reduce((e,t)=>e+t,0),m=i.indexOf(Math.max(...i));return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsx)(`strong`,{children:e(`poll.question`)}),(0,M.jsx)(v,{data:u,labelContent:Ce,legend:we,percentFormat:e=>f.format(e),centerValue:d.format(p),centerLabel:e(`poll.votes`),renderTooltip:t=>(0,M.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,M.jsx)(`strong`,{children:t.name}),(0,M.jsx)(`span`,{children:e(`poll.votesShare`,{votes:d.format(t.value),share:f.format(t.percent)})})]}),height:340,ariaLabel:e(`poll.aria`)}),(0,M.jsxs)(h,{gap:8,wrap:!0,align:`center`,children:[(0,M.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(e=>!e),children:e(s?`poll.pause`:`poll.resume`)}),(0,M.jsx)(o,{size:`small`,variant:`ghost`,onClick:()=>{l.current=xe(I),a(F)},children:e(`poll.reset`)}),(0,M.jsx)(`output`,{"aria-live":`polite`,children:e(`poll.leading`,{answer:u[m].name})})]})]})}var j,M,N,P,F,I,Ce,we;function Te(){return(Te=e((()=>{j=t(),i(),a(),g(),_(),M=n(),N=[`darkMode`,`offline`,`api`,`integrations`,`reports`],P=[.31,.18,.22,.17,.12],F=[42,25,31,22,16],I=7,Ce=[`percent`],we={toggle:!1}})))()}function Ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,i=(0,L.useMemo)(()=>{let t=[...z].sort((e,t)=>t[1]-e[1]),n=t.slice(B).reduce((e,[,t])=>e+t,0);return[...t.slice(0,B).map(([e,t])=>({name:e,value:t})),{name:e(`others`),value:n,color:`var(--border-strong-color)`}]},[e]),a=z.reduce((e,[,t])=>e+t,0),o=(0,L.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t*1e6)},[n]),s=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,R.jsx)(v,{data:i,format:o,percentFormat:e=>s.format(e),centerValue:o(a),centerLabel:e(`unitsShipped`),renderTooltip:t=>(0,R.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,R.jsx)(`strong`,{children:t.name}),(0,R.jsx)(`span`,{children:e(`unitsShare`,{units:o(t.value),share:s.format(t.percent)})})]}),height:340,ariaLabel:e(`marketAria`)})}var L,R,z,B;function De(){return(De=e((()=>{L=t(),i(),_(),R=n(),z=[[`Aurora`,231],[`Borealis`,226],[`Cobalt`,146],[`Dynamo`,92],[`Ember`,87],[`Flux`,38],[`Gale`,31],[`Halo`,22],[`Ion`,17],[`Juno`,12],[`Kepler`,9],[`Lumen`,6]],B=5})))()}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,V.useState)(null),{categories:o,items:s}=(0,V.useMemo)(()=>({categories:U.map(t=>({name:e(`budget.${t.key}`),value:t.items.reduce((e,[,t])=>e+t,0),color:t.color})),items:U.flatMap(t=>t.items.map(([n,r],i)=>({name:e(`budget.${n}`),value:r,color:ke(t.color,.1+i*.25)})))}),[e]),c=(0,V.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}),[n]),l=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,H.jsxs)(`div`,{style:{position:`relative`,height:je},children:[(0,H.jsx)(v,{data:s,innerRadius:.7,labels:`none`,legend:!1,tooltip:!1,onHover:a,height:je,ariaLabel:e(`itemsAria`)}),(0,H.jsx)(`div`,{style:{position:`absolute`,top:`50%`,left:`50%`,width:W,height:W,transform:`translate(-50%, -50%)`,clipPath:`circle(50%)`},children:(0,H.jsx)(y,{data:o,labels:`inside`,labelContent:Ae,legend:!1,tooltip:!1,onHover:a,height:W,ariaLabel:e(`categoriesAria`)})})]}),(0,H.jsx)(`p`,{role:`status`,children:i?e(`budgetLine`,{name:i.name,amount:c.format(i.value),share:l.format(i.percent)}):e(`hoverRing`)})]})}var V,H,U,ke,Ae,je,W;function Me(){return(Me=e((()=>{V=t(),i(),_(),H=n(),U=[{key:`housing`,color:`#6366f1`,items:[[`rent`,1150],[`energy`,140],[`insurance`,45]]},{key:`food`,color:`#f59e0b`,items:[[`groceries`,420],[`restaurants`,160]]},{key:`transport`,color:`#14b8a6`,items:[[`transit`,86],[`car`,210]]},{key:`leisure`,color:`#ec4899`,items:[[`travel`,180],[`subscriptions`,42],[`sport`,55]]}],ke=(e,t)=>{let n=n=>{let r=parseInt(e.slice(n,n+2),16);return Math.round(r+(255-r)*t).toString(16).padStart(2,`0`)};return`#${n(1)}${n(3)}${n(5)}`},Ae=[`name`],je=340,W=219})))()}function Ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,G.useState)([]),s=(0,G.useMemo)(()=>q.map(({key:t,value:n})=>({name:e(`portfolio.assets.${t}`),value:n})),[e]),c=(0,G.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t)},[n]),l=(0,G.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t)},[n]),u=q.reduce((e,t,n)=>i.includes(n)?e:e+t.value,0),d=e=>a(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e].sort((e,t)=>e-t));return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(h,{gap:8,wrap:!0,align:`center`,children:[(0,K.jsx)(h,{gap:8,wrap:!0,role:`group`,"aria-label":e(`portfolio.filter`),children:s.map((e,t)=>(0,K.jsx)(m,{clickable:!0,pressed:!i.includes(t),onClick:()=>d(t),children:e.name},e.name))}),(0,K.jsx)(o,{size:`small`,variant:`ghost`,disabled:i.length===0,onClick:()=>a([]),children:e(`portfolio.showAll`)})]}),(0,K.jsx)(v,{data:s,hidden:i,onToggle:e=>a(e.hiddenIndexes),format:c,percentFormat:l,centerValue:c(u),centerLabel:i.length?e(`portfolio.selection`):e(`portfolio.total`),renderTooltip:t=>(0,K.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,K.jsx)(`strong`,{children:t.name}),(0,K.jsx)(`span`,{children:c(t.value)}),(0,K.jsx)(`span`,{children:e(`portfolio.ofPortfolio`,{share:l(t.value/Pe)})})]}),height:340,ariaLabel:e(`portfolio.aria`)}),(0,K.jsx)(`output`,{"aria-live":`polite`,children:e(`portfolio.summary`,{shown:q.length-i.length,total:q.length,value:c(u),share:l(u/Pe)})})]})}var G,K,q,Pe;function Fe(){return(Fe=e((()=>{G=t(),i(),a(),g(),p(),_(),K=n(),q=[{key:`usEquities`,value:182400},{key:`intlEquities`,value:96300},{key:`bonds`,value:121500},{key:`realEstate`,value:48200},{key:`commodities`,value:21700},{key:`cash`,value:30900}],Pe=q.reduce((e,t)=>e+t.value,0)})))()}function Ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,i=(0,Le.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{month:`short`});return Re.map((t,n)=>({name:e.format(new Date(2026,n,1)),value:t,color:ze[Math.floor((n+1)%12/3)]}))},[n]),a=(0,Le.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`}),[n]);return(0,J.jsx)(y,{data:i,rose:!0,innerRadius:.18,padAngle:2,cornerRadius:4,labelContent:Be,legend:!1,format:e=>a.format(e),renderTooltip:e=>(0,J.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,J.jsx)(`strong`,{children:e.name}),(0,J.jsx)(`span`,{children:a.format(e.value)})]}),height:360,ariaLabel:e(`rainfallAria`)})}var Le,J,Re,ze,Be;function Ve(){return(Ve=e((()=>{Le=t(),i(),_(),J=n(),Re=[78,61,72,58,49,37,28,34,52,86,97,92],ze=[`var(--primary-color)`,`var(--success-color)`,`var(--warning-color)`,`var(--danger-color)`],Be=[`name`]})))()}function He(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=new Intl.NumberFormat(t.language,{style:`percent`}),i=(0,Ue.useMemo)(()=>Ke.map(([t,n])=>({region:e(`regions.${t}`),mobile:n[0]/100,data:We.map((t,r)=>({name:e(`devices.${t}`),value:n[r],color:Ge[r]}))})),[e]);return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsx)(`div`,{style:{display:`flex`,gap:16,flexWrap:`wrap`},children:We.map((t,n)=>(0,Y.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,Y.jsx)(`span`,{style:{width:10,height:10,borderRadius:5,background:Ge[n]}}),e(`devices.${t}`)]},t))}),(0,Y.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(150px, 1fr))`,gap:16},children:i.map(t=>(0,Y.jsx)(v,{data:t.data,labels:`none`,legend:!1,centerValue:n.format(t.mobile),centerLabel:t.region,percentFormat:e=>n.format(e),renderTooltip:e=>(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,Y.jsx)(`strong`,{children:e.name}),(0,Y.jsx)(`span`,{children:n.format(e.percent)})]}),height:170,ariaLabel:e(`devicesAria`,{region:t.region})},t.region))})]})}var Ue,Y,We,Ge,Ke;function qe(){return(qe=e((()=>{Ue=t(),i(),_(),Y=n(),We=[`mobile`,`desktop`,`tablet`],Ge=[`var(--primary-color)`,`#14b8a6`,`#f59e0b`],Ke=[[`asiaPacific`,[71,24,5]],[`europe`,[52,41,7]],[`northAmerica`,[48,44,8]],[`latinAmerica`,[66,29,5]]]})))()}function Je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,X.useState)(Q.length-1),o=Q[i],s=(0,X.useMemo)(()=>Ye.map((t,n)=>({name:e(`survey.levels.${t}`),value:o[n],color:Xe[n]})),[o,e]),c=(0,X.useMemo)(()=>new Intl.NumberFormat(n),[n]),u=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),d=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:1,signDisplay:`exceptZero`}),[n]),p=$(o),m=o.reduce((e,t)=>e+t,0),h=t=>e(`survey.quarter`,{n:t+1});return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsx)(l,{"aria-label":e(`survey.quarterLabel`),direction:`horizontal`,value:i,onChange:e=>a(Number(e)),children:Q.map((e,t)=>(0,Z.jsx)(f,{value:t,label:h(t)},t))}),(0,Z.jsx)(v,{data:s,startAngle:-90,labelContent:Ze,legend:Qe,percentFormat:e=>u.format(e),centerValue:u.format(p),centerLabel:e(`survey.csat`),renderTooltip:t=>(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,Z.jsx)(`strong`,{children:t.name}),(0,Z.jsx)(`span`,{children:e(`survey.answers`,{answers:c.format(t.value),share:u.format(t.percent)})})]}),height:340,ariaLabel:e(`survey.aria`,{quarter:h(i)})}),(0,Z.jsx)(`output`,{"aria-live":`polite`,children:i===0?e(`survey.first`,{csat:u.format(p),respondents:c.format(m)}):e(`survey.change`,{csat:u.format(p),delta:d.format((p-$(Q[i-1]))*100),previous:h(i-1),respondents:c.format(m)})})]})}var X,Z,Ye,Xe,Q,$,Ze,Qe;function $e(){return($e=e((()=>{X=t(),i(),u(),d(),_(),Z=n(),Ye=[`veryDissatisfied`,`dissatisfied`,`neutral`,`satisfied`,`verySatisfied`],Xe=[`#dc2626`,`#f97316`,`#a8a29e`,`#4ade80`,`#16a34a`],Q=[[62,118,240,410,170],[55,104,226,438,197],[48,96,214,452,230],[41,80,198,470,271]],$=e=>(e[3]+e[4])/e.reduce((e,t)=>e+t,0),Ze=[`percent`],Qe={toggle:!1}})))()}var et;function tt(){return(tt=e((()=>{et=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Website sessions over the last 30 days, by traffic source
const sessions = [
  { key: "organic", value: 48200 },
  { key: "direct", value: 23100 },
  { key: "social", value: 16400 },
  { key: "paid", value: 12700 },
  { key: "referral", value: 9800 },
  { key: "email", value: 6100 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      sessions.map(({ key, value }) => ({ name: t(\`sources.\${key}\`), value })),
    [t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
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
      <PieChart
        data={data}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("sessionsShare", {
                sessions: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={320}
        ariaLabel={t("sessionsAria")}
      />
      <p role="status">
        {selected
          ? t("selectedSource", {
              source: selected.name,
              sessions: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("clickSlice")}
      </p>
    </div>
  );
}
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly recurring revenue by plan, in US dollars
const revenue = [
  { key: "enterprise", value: 48200 },
  { key: "business", value: 31500 },
  { key: "pro", value: 22800 },
  { key: "starter", value: 9400 },
];
const total = revenue.reduce((sum, d) => sum + d.value, 0);

const labelContent = ["name", "value"] as const;
// The total in the hole always covers every plan, so slices stay visible
const legend = { toggle: false } as const;

export default function DonutDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // The hovered (or keyboard-highlighted) plan replaces the total in the hole
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      revenue.map(({ key, value }) => ({ name: t(\`plans.\${key}\`), value })),
    [t],
  );
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const format = (value: number) => currency.format(value);

  return (
    <DonutChart
      data={data}
      format={format}
      centerValue={format(hovered ? hovered.value : total)}
      centerLabel={
        hovered
          ? \`\${hovered.name} · \${percent.format(hovered.percent)}\`
          : t("monthlyRevenue")
      }
      onHover={setHovered}
      tooltip={false}
      legend={legend}
      labelContent={labelContent}
      height={320}
      ariaLabel={t("mrrAria")}
    />
  );
}
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly cloud bill (USD): categories, then the services of each
const BILL = [
  {
    key: "compute",
    color: "#6366f1",
    services: [
      ["vms", 8200],
      ["kubernetes", 5400],
      ["serverless", 1300],
    ],
  },
  {
    key: "databases",
    color: "#10b981",
    services: [
      ["sql", 4300],
      ["nosql", 2100],
      ["cache", 900],
    ],
  },
  {
    key: "storage",
    color: "#0ea5e9",
    services: [
      ["objects", 3100],
      ["blocks", 1900],
      ["backups", 800],
    ],
  },
  {
    key: "network",
    color: "#f59e0b",
    services: [
      ["egress", 2600],
      ["cdn", 1400],
      ["loadBalancers", 600],
    ],
  },
] as const;

const sumOf = (services: readonly (readonly [string, number])[]) =>
  services.reduce((sum, [, value]) => sum + value, 0);
const TOTAL = BILL.reduce((sum, category) => sum + sumOf(category.services), 0);

/** Mixes a #rrggbb color with white: 0 = unchanged, 1 = white */
const lighten = (hex: string, amount: number) => {
  const channel = (i: number) => {
    const value = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(value + (255 - value) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return \`#\${channel(1)}\${channel(3)}\${channel(5)}\`;
};

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // index of the opened category, null on the overview
  const [category, setCategory] = useState<number | null>(null);
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo((): ShapeDatum[] => {
    if (category === null)
      return BILL.map((c) => ({
        name: t(\`cloud.categories.\${c.key}\`),
        value: sumOf(c.services),
        color: c.color,
      }));
    // the services take shades of their category's color
    const { color, services } = BILL[category];
    return services.map(([key, value], i) => ({
      name: t(\`cloud.services.\${key}\`),
      value,
      color: lighten(color, i * 0.3),
    }));
  }, [category, t]);
  const format = useMemo(() => {
    const currency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return (value: number) => currency.format(value);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const open = (index: number | null) => {
    setCategory(index);
    setSelected(null);
  };
  const onClick = (event: ShapeHoverEvent) =>
    category === null ? open(event.index) : setSelected(event);

  const categoryName =
    category === null ? null : t(\`cloud.categories.\${BILL[category].key}\`);
  const categoryTotal = category === null ? 0 : sumOf(BILL[category].services);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack
        gap={4}
        align="center"
        wrap
        as="nav"
        aria-label={t("cloud.breadcrumb")}
      >
        <Button
          size="small"
          variant={category === null ? "solid" : "ghost"}
          aria-current={category === null ? "location" : undefined}
          onClick={() => open(null)}
        >
          {t("cloud.all")}
        </Button>
        {categoryName && (
          <>
            <span aria-hidden>/</span>
            <strong aria-current="location">{categoryName}</strong>
          </>
        )}
      </HStack>
      <PieChart
        data={data}
        legend={false}
        format={format}
        percentFormat={percentFormat}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {format(slice.value)} · {percentFormat(slice.percent)}
            </span>
            {category === null && <span>{t("cloud.clickToOpen")}</span>}
          </div>
        )}
        onClick={onClick}
        height={320}
        ariaLabel={
          categoryName
            ? t("cloud.servicesAria", { category: categoryName })
            : t("cloud.aria")
        }
      />
      <p role="status" style={{ margin: 0 }}>
        {selected && categoryName
          ? t("cloud.serviceLine", {
              service: selected.name,
              amount: format(selected.value),
              share: percentFormat(selected.percent),
              category: categoryName,
            })
          : categoryName
            ? t("cloud.categoryLine", {
                category: categoryName,
                amount: format(categoryTotal),
                share: percentFormat(categoryTotal / TOTAL),
              })
            : t("cloud.hint", { total: format(TOTAL) })}
      </p>
    </div>
  );
}
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack, Radio, RadioGroup } from "minerva-design";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

type Placement = "outside" | "inside" | "none";
type Part = "name" | "value" | "percent";

// Support tickets opened this quarter, by channel
const tickets = [
  { key: "email", value: 1240 },
  { key: "chat", value: 980 },
  { key: "form", value: 610 },
  { key: "phone", value: 430 },
  { key: "social", value: 150 },
  { key: "community", value: 90 },
];

const PARTS: Part[] = ["name", "value", "percent"];
const PLACEMENTS: Placement[] = ["outside", "inside", "none"];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [labels, setLabels] = useState<Placement>("outside");
  const [parts, setParts] = useState<Part[]>(["name", "percent"]);

  const data = useMemo(
    (): ShapeDatum[] =>
      tickets.map(({ key, value }) => ({ name: t(\`channels.\${key}\`), value })),
    [t],
  );
  // Keep the array stable between renders: a new one would redraw the labels
  const labelContent = useMemo(
    () => PARTS.filter((part) => parts.includes(part)),
    [parts],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const togglePart = (part: Part, checked: boolean) =>
    setParts((current) =>
      checked ? [...current, part] : current.filter((p) => p !== part),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("labelPlacement")}
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Placement)}
      >
        {PLACEMENTS.map((placement) => (
          <Radio
            key={placement}
            value={placement}
            label={t(\`placements.\${placement}\`)}
          />
        ))}
      </RadioGroup>
      <HStack gap={16} role="group" aria-label={t("labelContent")}>
        {PARTS.map((part) => (
          <Checkbox
            key={part}
            label={t(\`parts.\${part}\`)}
            checked={parts.includes(part)}
            // at least one part stays selected
            disabled={
              labels === "none" || (parts.length === 1 && parts[0] === part)
            }
            onChange={(checked) => togglePart(part, checked)}
          />
        ))}
      </HStack>
      <PieChart
        data={data}
        labels={labels}
        labelContent={labelContent}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("ticketsShare", {
                tickets: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("ticketsAria")}
      />
    </div>
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

/** Small seeded random generator: the same "votes" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Answers of a live product poll; each new vote picks an answer with
// these probabilities
const ANSWERS = ["darkMode", "offline", "api", "integrations", "reports"];
const WEIGHTS = [0.31, 0.18, 0.22, 0.17, 0.12];
const START = [42, 25, 31, 22, 16];
const SEED = 7;

const labelContent = ["percent"] as const;
const legend = { toggle: false } as const;

export default function LivePollDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [votes, setVotes] = useState(START);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // 1 to 4 new votes per tick, drawn outside the state updater
      const added = ANSWERS.map(() => 0);
      const batch = 1 + Math.floor(random.current() * 4);
      for (let n = 0; n < batch; n++) {
        let r = random.current();
        let i = 0;
        while (i < WEIGHTS.length - 1 && r >= WEIGHTS[i]) {
          r -= WEIGHTS[i];
          i++;
        }
        added[i] += 1;
      }
      setVotes((current) => current.map((value, i) => value + added[i]));
    }, 1200);
    return () => window.clearInterval(timer);
  }, [running]);

  const data = useMemo(
    (): ShapeDatum[] =>
      ANSWERS.map((key, i) => ({
        name: t(\`poll.answers.\${key}\`),
        value: votes[i],
      })),
    [t, votes],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const total = votes.reduce((sum, value) => sum + value, 0);
  const leader = votes.indexOf(Math.max(...votes));

  const reset = () => {
    random.current = mulberry32(SEED);
    setVotes(START);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <strong>{t("poll.question")}</strong>
      <DonutChart
        data={data}
        labelContent={labelContent}
        legend={legend}
        percentFormat={(share) => percent.format(share)}
        centerValue={number.format(total)}
        centerLabel={t("poll.votes")}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("poll.votesShare", {
                votes: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("poll.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("poll.pause") : t("poll.resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={reset}>
          {t("poll.reset")}
        </Button>
        {/* only the leader is announced, not every new vote */}
        <output aria-live="polite">
          {t("poll.leading", { answer: data[leader].name })}
        </output>
      </HStack>
    </div>
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Smartphone shipments by vendor (millions of units); the long tail is
// grouped into "Others" so the chart keeps a handful of readable slices
const shipments: [string, number][] = [
  ["Aurora", 231],
  ["Borealis", 226],
  ["Cobalt", 146],
  ["Dynamo", 92],
  ["Ember", 87],
  ["Flux", 38],
  ["Gale", 31],
  ["Halo", 22],
  ["Ion", 17],
  ["Juno", 12],
  ["Kepler", 9],
  ["Lumen", 6],
];
const TOP = 5;

export default function MarketShareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const sorted = [...shipments].sort((a, b) => b[1] - a[1]);
    const others = sorted.slice(TOP).reduce((sum, [, value]) => sum + value, 0);
    return [
      ...sorted.slice(0, TOP).map(([name, value]) => ({ name, value })),
      // a neutral color: "Others" is not a competitor
      { name: t("others"), value: others, color: "var(--border-strong-color)" },
    ];
  }, [t]);
  const total = shipments.reduce((sum, [, value]) => sum + value, 0);
  // values are in millions of units
  const units = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1_000_000);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <DonutChart
      data={data}
      format={units}
      percentFormat={(share) => percent.format(share)}
      centerValue={units(total)}
      centerLabel={t("unitsShipped")}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>
            {t("unitsShare", {
              units: units(slice.value),
              share: percent.format(slice.percent),
            })}
          </span>
        </div>
      )}
      height={340}
      ariaLabel={t("marketAria")}
    />
  );
}
`})))()}var ft;function pt(){return(pt=e((()=>{ft=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Household budget per month (EUR): categories inside, items outside
const budget = [
  {
    key: "housing",
    color: "#6366f1",
    items: [
      ["rent", 1150],
      ["energy", 140],
      ["insurance", 45],
    ],
  },
  {
    key: "food",
    color: "#f59e0b",
    items: [
      ["groceries", 420],
      ["restaurants", 160],
    ],
  },
  {
    key: "transport",
    color: "#14b8a6",
    items: [
      ["transit", 86],
      ["car", 210],
    ],
  },
  {
    key: "leisure",
    color: "#ec4899",
    items: [
      ["travel", 180],
      ["subscriptions", 42],
      ["sport", 55],
    ],
  },
] as const;

/** Mixes a #rrggbb color with white: 0 = unchanged, 1 = white */
const lighten = (hex: string, amount: number) => {
  const channel = (i: number) => {
    const value = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(value + (255 - value) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return \`#\${channel(1)}\${channel(3)}\${channel(5)}\`;
};

const nameOnly = ["name"] as const;
const HEIGHT = 340;
// the inner pie fills the hole of the outer donut (innerRadius 0.7)
const INNER = Math.round((HEIGHT - 16) * 0.7) - 8;

export default function NestedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const { categories, items } = useMemo(() => {
    const categories: ShapeDatum[] = budget.map((category) => ({
      name: t(\`budget.\${category.key}\`),
      value: category.items.reduce((sum, [, value]) => sum + value, 0),
      color: category.color,
    }));
    // the items of a category take lighter shades of its color
    const items: ShapeDatum[] = budget.flatMap((category) =>
      category.items.map(([key, value], i) => ({
        name: t(\`budget.\${key}\`),
        value,
        color: lighten(category.color, 0.1 + i * 0.25),
      })),
    );
    return { categories, items };
  }, [t]);
  const euros = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ position: "relative", height: HEIGHT }}>
        <DonutChart
          data={items}
          innerRadius={0.7}
          labels="none"
          legend={false}
          tooltip={false}
          onHover={setHovered}
          height={HEIGHT}
          ariaLabel={t("itemsAria")}
        />
        {/* the clip keeps the corners of the square free for the outer ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: INNER,
            height: INNER,
            transform: "translate(-50%, -50%)",
            clipPath: "circle(50%)",
          }}
        >
          <PieChart
            data={categories}
            labels="inside"
            labelContent={nameOnly}
            legend={false}
            tooltip={false}
            onHover={setHovered}
            height={INNER}
            ariaLabel={t("categoriesAria")}
          />
        </div>
      </div>
      <p role="status">
        {hovered
          ? t("budgetLine", {
              name: hovered.name,
              amount: euros.format(hovered.value),
              share: percent.format(hovered.percent),
            })
          : t("hoverRing")}
      </p>
    </div>
  );
}
`})))()}var mt;function ht(){return(ht=e((()=>{mt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Tag } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Investment portfolio by asset class, market value in US dollars
const HOLDINGS = [
  { key: "usEquities", value: 182_400 },
  { key: "intlEquities", value: 96_300 },
  { key: "bonds", value: 121_500 },
  { key: "realEstate", value: 48_200 },
  { key: "commodities", value: 21_700 },
  { key: "cash", value: 30_900 },
];
const TOTAL = HOLDINGS.reduce((sum, holding) => sum + holding.value, 0);

export default function PortfolioDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // controlled visibility: the filter chips and the legend share one state
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): ShapeDatum[] =>
      HOLDINGS.map(({ key, value }) => ({
        name: t(\`portfolio.assets.\${key}\`),
        value,
      })),
    [t],
  );
  const format = useMemo(() => {
    const currency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => currency.format(value);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const visible = HOLDINGS.reduce(
    (sum, holding, i) => (hidden.includes(i) ? sum : sum + holding.value),
    0,
  );
  const toggle = (index: number) =>
    setHidden((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index].sort((a, b) => a - b),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <HStack gap={8} wrap role="group" aria-label={t("portfolio.filter")}>
          {data.map((slice, index) => (
            <Tag
              key={slice.name}
              clickable
              pressed={!hidden.includes(index)}
              onClick={() => toggle(index)}
            >
              {slice.name}
            </Tag>
          ))}
        </HStack>
        <Button
          size="small"
          variant="ghost"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("portfolio.showAll")}
        </Button>
      </HStack>
      <DonutChart
        data={data}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        format={format}
        percentFormat={percentFormat}
        centerValue={format(visible)}
        centerLabel={
          hidden.length ? t("portfolio.selection") : t("portfolio.total")
        }
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>{format(slice.value)}</span>
            <span>
              {t("portfolio.ofPortfolio", {
                share: percentFormat(slice.value / TOTAL),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("portfolio.aria")}
      />
      <output aria-live="polite">
        {t("portfolio.summary", {
          shown: HOLDINGS.length - hidden.length,
          total: HOLDINGS.length,
          value: format(visible),
          share: percentFormat(visible / TOTAL),
        })}
      </output>
    </div>
  );
}
`})))()}var gt;function _t(){return(_t=e((()=>{gt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

// Average rainfall per month (January to December), in millimeters
const rainfall = [78, 61, 72, 58, 49, 37, 28, 34, 52, 86, 97, 92];

// One color per season (Dec-Feb, Mar-May, Jun-Aug, Sep-Nov)
const seasons = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

const labelContent = ["name"] as const;

export default function RoseDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const month = new Intl.DateTimeFormat(locale, { month: "short" });
    return rainfall.map((value, i) => ({
      name: month.format(new Date(2026, i, 1)),
      value,
      color: seasons[Math.floor(((i + 1) % 12) / 3)],
    }));
  }, [locale]);
  const millimeters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );

  return (
    <PieChart
      data={data}
      rose
      innerRadius={0.18}
      padAngle={2}
      cornerRadius={4}
      labelContent={labelContent}
      legend={false}
      format={(value) => millimeters.format(value)}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>{millimeters.format(slice.value)}</span>
        </div>
      )}
      height={360}
      ariaLabel={t("rainfallAria")}
    />
  );
}
`})))()}var vt;function yt(){return(yt=e((()=>{vt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Share of sessions by device, per region
const devices = ["mobile", "desktop", "tablet"] as const;
const colors = ["var(--primary-color)", "#14b8a6", "#f59e0b"];
const regions: [string, number[]][] = [
  ["asiaPacific", [71, 24, 5]],
  ["europe", [52, 41, 7]],
  ["northAmerica", [48, 44, 8]],
  ["latinAmerica", [66, 29, 5]],
];

export default function SmallMultiplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  // the same colors and order in every chart, so one legend serves them all
  const charts = useMemo(
    () =>
      regions.map(([region, values]) => ({
        region: t(\`regions.\${region}\`),
        mobile: values[0] / 100,
        data: devices.map((device, i): ShapeDatum => ({
          name: t(\`devices.\${device}\`),
          value: values[i],
          color: colors[i],
        })),
      })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {devices.map((device, i) => (
          <span
            key={device}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: colors[i],
              }}
            />
            {t(\`devices.\${device}\`)}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 16,
        }}
      >
        {charts.map((chart) => (
          <DonutChart
            key={chart.region}
            data={chart.data}
            labels="none"
            legend={false}
            centerValue={percent.format(chart.mobile)}
            centerLabel={chart.region}
            percentFormat={(share) => percent.format(share)}
            renderTooltip={(slice) => (
              <div style={{ display: "grid", gap: 2 }}>
                <strong>{slice.name}</strong>
                <span>{percent.format(slice.percent)}</span>
              </div>
            )}
            height={170}
            ariaLabel={t("devicesAria", { region: chart.region })}
          />
        ))}
      </div>
    </div>
  );
}
`})))()}var bt;function xt(){return(xt=e((()=>{bt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Customer satisfaction survey: answers per quarter, from "very
// dissatisfied" to "very satisfied"
const LEVELS = [
  "veryDissatisfied",
  "dissatisfied",
  "neutral",
  "satisfied",
  "verySatisfied",
];
// a diverging scale: red for the unhappy answers, green for the happy ones
const COLORS = ["#dc2626", "#f97316", "#a8a29e", "#4ade80", "#16a34a"];
const QUARTERS = [
  [62, 118, 240, 410, 170],
  [55, 104, 226, 438, 197],
  [48, 96, 214, 452, 230],
  [41, 80, 198, 470, 271],
];

/** Share of "satisfied" and "very satisfied" answers, 0-1 */
const csatOf = (answers: number[]) =>
  (answers[3] + answers[4]) / answers.reduce((sum, n) => sum + n, 0);

const labelContent = ["percent"] as const;
// the CSAT in the hole is computed on every answer
const legend = { toggle: false } as const;

export default function SurveyQuartersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [quarter, setQuarter] = useState(QUARTERS.length - 1);

  const answers = QUARTERS[quarter];
  // same order and colors every quarter, so the slices animate in place
  const data = useMemo(
    (): ShapeDatum[] =>
      LEVELS.map((level, i) => ({
        name: t(\`survey.levels.\${level}\`),
        value: answers[i],
        color: COLORS[i],
      })),
    [answers, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const points = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  const csat = csatOf(answers);
  const respondents = answers.reduce((sum, n) => sum + n, 0);
  const quarterName = (i: number) => t("survey.quarter", { n: i + 1 });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("survey.quarterLabel")}
        direction="horizontal"
        value={quarter}
        onChange={(value) => setQuarter(Number(value))}
      >
        {QUARTERS.map((_, i) => (
          <Radio key={i} value={i} label={quarterName(i)} />
        ))}
      </RadioGroup>
      <DonutChart
        data={data}
        startAngle={-90}
        labelContent={labelContent}
        legend={legend}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(csat)}
        centerLabel={t("survey.csat")}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("survey.answers", {
                answers: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("survey.aria", { quarter: quarterName(quarter) })}
      />
      <output aria-live="polite">
        {quarter === 0
          ? t("survey.first", {
              csat: percent.format(csat),
              respondents: number.format(respondents),
            })
          : t("survey.change", {
              csat: percent.format(csat),
              delta: points.format(
                (csat - csatOf(QUARTERS[quarter - 1])) * 100,
              ),
              previous: quarterName(quarter - 1),
              respondents: number.format(respondents),
            })}
      </output>
    </div>
  );
}
`})))()}var St,Ct,wt;function Tt(){return(Tt=e((()=>{oe(),fe(),ge(),be(),Te(),De(),Me(),Fe(),Ve(),qe(),$e(),tt(),rt(),at(),st(),lt(),dt(),pt(),ht(),_t(),yt(),xt(),t(),te(),re(),St=n(),Ct=ee(Object.assign({"./demos/basic.tsx":ie,"./demos/donut.tsx":se,"./demos/drill-down.tsx":pe,"./demos/labels.tsx":_e,"./demos/live-poll.tsx":Se,"./demos/market-share.tsx":Ee,"./demos/nested.tsx":Oe,"./demos/portfolio.tsx":Ne,"./demos/rose.tsx":Ie,"./demos/small-multiples.tsx":He,"./demos/survey-quarters.tsx":Je}),Object.assign({"./demos/basic.tsx":et,"./demos/donut.tsx":nt,"./demos/drill-down.tsx":it,"./demos/labels.tsx":ot,"./demos/live-poll.tsx":ct,"./demos/market-share.tsx":ut,"./demos/nested.tsx":ft,"./demos/portfolio.tsx":mt,"./demos/rose.tsx":gt,"./demos/small-multiples.tsx":vt,"./demos/survey-quarters.tsx":bt})),wt=()=>(0,St.jsx)(ne,{id:`pie-chart`,demos:Ct})})))()}Tt();export{wt as default};