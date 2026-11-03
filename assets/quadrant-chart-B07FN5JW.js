import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BV71gcWC.js";import{R as a,z as o}from"./ProgressIndicator-CLQ5GhV8.js";import{i as s,r as c}from"./CodeBlock-BfjU5DKs.js";import{n as l,t as u}from"./Input-B-_C7F3z.js";import{n as d,t as f}from"./Tag-DNW1VEd2.js";import{n as p,t as m}from"./Switch-BYZUj6dh.js";import{i as h,r as g}from"./Stack-CT6Vl4gN.js";import{i as _,o as ee,t as te}from"./Select-CFOiLa6C.js";import{E as v,u as ne,v as y}from"./angular-preview-BrYDyM0M.js";import{i as b,p as x}from"./charts-CfhbCDNc.js";import{l as re,n as ie,t as S,u as ae}from"./DocPage-BhzHP-B1.js";import{A as oe,y as se}from"./lu-BtHpX5rX.js";function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,le.useMemo)(()=>de.map(({key:t,x:n,y:r})=>({label:e(`features.${t}`),x:n,y:r})),[e]),n=(0,le.useMemo)(()=>({topLeft:{label:e(`quickWins`)},topRight:{label:e(`bigBets`)},bottomLeft:{label:e(`fillIns`)},bottomRight:{label:e(`timeSinks`)}}),[e]);return(0,ue.jsx)(b,{points:t,quadrants:n,xLabel:e(`effort`),yLabel:e(`impact`),name:e(`feature`),height:320,ariaLabel:e(`featuresAria`)})}var le,ue,de;function fe(){return(fe=e((()=>{le=t(),i(),x(),ue=n(),de=[{key:`darkMode`,x:2,y:7.5},{key:`sso`,x:6.5,y:9},{key:`csvExport`,x:1.5,y:6},{key:`offlineSync`,x:9,y:8},{key:`newIcons`,x:2.5,y:2},{key:`pluginApi`,x:8,y:6.5},{key:`customFonts`,x:7,y:2.5},{key:`tooltips`,x:1,y:3.5}]})))()}function pe(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,me.useMemo)(()=>ge.map(({key:t,share:n,growth:r,revenue:i})=>({label:e(`products.${t}`),x:n,y:r,size:8+Math.sqrt(i)*1.2})),[e]),n=(0,me.useMemo)(()=>({topLeft:{label:e(`stars`),color:`var(--success-color)`},topRight:{label:e(`questionMarks`),color:`var(--warning-color)`},bottomLeft:{label:e(`cashCows`),color:`var(--primary-color)`},bottomRight:{label:e(`dogs`),color:`var(--danger-color)`}}),[e]);return(0,he.jsx)(b,{points:t,quadrants:n,xDomain:[0,2],xSplit:1,yDomain:[-5,25],ySplit:10,reverseX:!0,xLabel:e(`relativeShare`),yLabel:e(`marketGrowth`),name:e(`product`),height:360,ariaLabel:e(`bcgAria`)})}var me,he,ge;function _e(){return(_e=e((()=>{me=t(),i(),x(),he=n(),ge=[{key:`cloud`,share:1.6,growth:18,revenue:420},{key:`analytics`,share:.45,growth:22,revenue:95},{key:`mobile`,share:.3,growth:14,revenue:60},{key:`licenses`,share:1.8,growth:3,revenue:610},{key:`support`,share:1.2,growth:5,revenue:280},{key:`hardware`,share:.4,growth:-2,revenue:70},{key:`training`,share:.6,growth:4,revenue:40}]})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,C.useState)(`ease`),[a,o]=(0,C.useState)(`features`),[s,c]=(0,C.useState)(null),l=(0,C.useMemo)(()=>new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),[t.language]),u=T.indexOf(n),d=T.indexOf(a),f=(0,C.useMemo)(()=>E.map(({name:t,ours:n,scores:r})=>({label:n?e(`comp.us`,{name:t}):t,x:r[u],y:r[d],...n?{color:`var(--primary-color)`,size:18}:{color:`var(--text-secondary-color)`}})),[u,d,e]),p=(t,n,r)=>(0,w.jsx)(ee,{"aria-label":t,value:n,onChange:e=>{r(e),c(null)},style:{minWidth:180},children:T.map(t=>(0,w.jsx)(te,{value:t,children:e(`comp.dimensions.${t}`)},t))}),m=e(`comp.hint`);if(s!==null){let n=E[s],r=E[0],i=n.scores.filter((e,t)=>e>r.scores[t]).length;m=e(n.ours?`comp.ourProfile`:`comp.profile`,{name:n.name,scores:new Intl.ListFormat(t.language,{type:`unit`}).format(T.map((t,r)=>e(`comp.score`,{dimension:e(`comp.dimensions.${t}`),score:l.format(n.scores[r])}))),ahead:i,total:T.length})}return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,w.jsxs)(h,{gap:12,wrap:!0,align:`center`,children:[p(e(`comp.xAxis`),n,i),p(e(`comp.yAxis`),a,o)]}),(0,w.jsx)(b,{points:f,quadrants:{topLeft:{color:`var(--chart-series-2)`},topRight:{label:e(`comp.strongBoth`),color:`var(--success-color)`},bottomLeft:{label:e(`comp.weakBoth`),color:`var(--text-muted-color)`},bottomRight:{color:`var(--chart-series-2)`}},xLabel:e(`comp.dimensions.${n}`),yLabel:e(`comp.dimensions.${a}`),onPointClick:(e,t)=>c(t),onQuadrantClick:()=>c(null),height:380,ariaLabel:e(`comp.aria`,{x:e(`comp.dimensions.${n}`),y:e(`comp.dimensions.${a}`)})}),(0,w.jsx)(`output`,{"aria-live":`polite`,children:m})]})}var C,w,T,E;function ye(){return(ye=e((()=>{C=t(),i(),g(),_(),x(),w=n(),T=[`price`,`features`,`ease`,`support`,`integrations`],E=[{name:`Northwind`,ours:!0,scores:[7.2,6.4,8.6,7.8,5.1]},{name:`Contoso`,scores:[3.1,9.2,5.4,8.1,8.8]},{name:`Fabrikam`,scores:[8.4,4.2,7.1,4.6,3.9]},{name:`Tailspin`,scores:[5.6,7.4,4.1,6.2,7.6]},{name:`Litware`,scores:[9.1,3.1,8.9,3.4,2.8]},{name:`Adatum`,scores:[2.4,8.1,6.6,9.1,9.3]},{name:`Proseware`,scores:[6.3,5.6,3.2,5.1,6.4]}]})))()}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,D.useState)(Ce),[a,s]=(0,D.useState)(null),[u,d]=(0,D.useState)({name:``,quadrant:`topLeft`}),[f,p]=(0,D.useState)(null),m=t=>e(Se[t]),h=t=>t.label??(t.key?e(`tasks.${t.key}`):e(`newTask`,{n:t.n})),g=n.map(e=>({label:h(e),x:e.x,y:e.y})),_=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),v=(t,r)=>{let a=ne(k,t),o=n.length%3-1,s={n:n.length+1,x:j(r?.x??a.x+o),y:j(r?.y??a.y+o)};i(e=>[...e,s]),p(e(`taskAdded`,{task:h(s),quadrant:m(t)}))},x=e=>{let t=n[e];s(e),d({name:h(t),quadrant:y(k,t.x,t.y)})},re=t=>{if(t.preventDefault(),a===null)return;let r=n[a],o=u.name.trim()||h(r),c=y(k,r.x,r.y)!==u.quadrant,l=ne(k,u.quadrant);i(e=>e.map((e,t)=>t===a?{...e,label:o,x:c?l.x:e.x,y:c?l.y:e.y}:e)),p(e(`taskSaved`,{task:o,quadrant:m(u.quadrant)})),s(null)},ie=t=>{let r=h(n[t]);i(e=>e.filter((e,n)=>n!==t)),s(null),p(e(`taskRemoved`,{task:r}))},S=t=>{let n=t.endsWith(`Right`),r=t.startsWith(`top`);return(0,O.jsxs)(`div`,{style:{position:`absolute`,[r?`top`:`bottom`]:6,[n?`right`:`left`]:8,display:`flex`,flexDirection:n?`row-reverse`:`row`,alignItems:`center`,gap:6,fontSize:12,fontWeight:600,color:A[t]},children:[(0,O.jsx)(`span`,{children:m(t)}),(0,O.jsx)(c,{size:`xsmall`,variant:`ghost`,label:e(`addTask`,{quadrant:m(t)}),icon:(0,O.jsx)(se,{}),onClick:()=>v(t),style:{pointerEvents:`auto`}})]})};return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,O.jsx)(b,{points:g,quadrants:{topLeft:{color:A.topLeft},topRight:{color:A.topRight},bottomLeft:{color:A.bottomLeft},bottomRight:{color:A.bottomRight}},reverseX:!0,showTicks:!1,axisLabels:{top:e(`important`),bottom:e(`notImportant`),left:e(`urgent`),right:e(`notUrgent`)},onPointDrag:(t,n,r)=>p(e(`taskMoving`,{task:t.label,quadrant:m(r.quadrant)})),onPointDrop:(t,n,r)=>{i(e=>e.map((e,t)=>t===n?{...e,x:j(r.x),y:j(r.y)}:e)),p(e(`taskMoved`,{task:t.label,quadrant:m(r.quadrant)}))},onPointDoubleClick:(e,t)=>x(t),onQuadrantClick:(e,t)=>v(e,t),quadrantContent:{topLeft:S(`topLeft`),topRight:S(`topRight`),bottomLeft:S(`bottomLeft`),bottomRight:S(`bottomRight`)},renderTooltip:t=>(0,O.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,O.jsx)(`strong`,{children:t.label}),(0,O.jsx)(`span`,{children:e(`taskScores`,{urgency:_.format(t.x),importance:_.format(t.y)})})]}),height:360,ariaLabel:e(`boardAria`)}),a!==null&&n[a]&&(0,O.jsxs)(`form`,{onSubmit:re,"aria-label":e(`editTaskAria`,{task:h(n[a])}),style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[(0,O.jsx)(l,{"aria-label":e(`taskName`),value:u.name,onChange:e=>d({...u,name:e.target.value})}),(0,O.jsx)(ee,{"aria-label":e(`taskQuadrant`),value:u.quadrant,onChange:e=>d({...u,quadrant:e}),children:xe.map(e=>(0,O.jsx)(te,{value:e,children:m(e)},e))}),(0,O.jsx)(o,{type:`submit`,children:e(`save`)}),(0,O.jsx)(o,{type:`button`,color:`neutral`,variant:`outline`,onClick:()=>s(null),children:e(`cancel`)}),(0,O.jsx)(o,{type:`button`,color:`danger`,variant:`outline`,onClick:()=>ie(a),children:e(`remove`)})]}),(0,O.jsx)(`p`,{role:`status`,children:f??e(`dragHint`)})]})}var D,O,k,xe,Se,A,Ce,j;function we(){return(we=e((()=>{D=t(),i(),a(),s(),u(),_(),x(),v(),oe(),O=n(),k={reverseX:!0},xe=[`topLeft`,`topRight`,`bottomLeft`,`bottomRight`],Se={topLeft:`doFirst`,topRight:`schedule`,bottomLeft:`delegate`,bottomRight:`eliminate`},A={topLeft:`var(--danger-color, #ef4444)`,topRight:`var(--primary-color, #4f46e5)`,bottomLeft:`var(--warning-color, #f59e0b)`,bottomRight:`var(--text-secondary-color, #64748b)`},Ce=[{key:`loginOutage`,x:9,y:8},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`bookTravel`,x:8,y:3},{key:`inboxZero`,x:2.5,y:2}],j=e=>Math.min(9.5,Math.max(.5,e))})))()}function Te(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,M.useState)(null),i=(0,M.useMemo)(()=>Ee.map(({key:t,x:n,y:r})=>({label:e(`tasks.${t}`),x:n,y:r})),[e]),a=(0,M.useMemo)(()=>({topLeft:{label:e(`doFirst`)},topRight:{label:e(`schedule`)},bottomLeft:{label:e(`delegate`)},bottomRight:{label:e(`eliminate`)}}),[e]);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,N.jsx)(b,{points:i,quadrants:a,reverseX:!0,xLabel:e(`urgency`),yLabel:e(`importance`),name:e(`task`),onPointClick:e=>n(e),height:320,ariaLabel:e(`eisenhowerAria`)}),(0,N.jsx)(`p`,{role:`status`,children:t?e(`taskStatus`,{task:t.label,urgency:t.x,importance:t.y}):e(`clickTask`)})]})}var M,N,Ee;function De(){return(De=e((()=>{M=t(),i(),x(),N=n(),Ee=[{key:`loginOutage`,x:9,y:7.2},{key:`taxFiling`,x:7.5,y:8.6},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`mentoring`,x:2,y:7},{key:`bookTravel`,x:8.5,y:3},{key:`meetings`,x:7,y:2},{key:`inboxZero`,x:3,y:2.5},{key:`socialMedia`,x:1.5,y:1}]})))()}function Oe(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,P.useState)(Ae),[a,s]=(0,P.useState)(!0),c=(0,P.useRef)(Oe(42));(0,P.useEffect)(()=>{if(!a)return;let e=setInterval(()=>{let e=c.current;i(t=>t.map((t,n)=>{let r=Ae[n];return{...t,latency:Me(t.latency+(e()-.5)*140+(r.latency-t.latency)*.15,40,980),errors:Me(t.errors+(e()-.5)*.006+(r.errors-t.errors)*.15,0,.039)}}))},1e3);return()=>clearInterval(e)},[a]);let l=(0,P.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`unit`,unit:`millisecond`,unitDisplay:`short`,maximumFractionDigits:0}),[t.language]),u=(0,P.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`,minimumFractionDigits:2,maximumFractionDigits:2}),[t.language]),d=(0,P.useMemo)(()=>n.map(t=>({label:e(`live.services.${t.key}`),x:t.latency,y:t.errors*100})),[n,e]),f=n.filter(e=>y(je,e.latency,e.errors*100)===`topRight`).map(t=>e(`live.services.${t.key}`));return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,F.jsx)(b,{points:d,...je,quadrants:{topLeft:{label:e(`live.erroring`),color:`var(--warning-color)`},topRight:{label:e(`live.critical`),color:`var(--danger-color)`},bottomLeft:{label:e(`live.healthy`),color:`var(--success-color)`},bottomRight:{label:e(`live.slow`),color:`var(--warning-color)`}},xLabel:e(`live.latency`),yLabel:e(`live.errorRate`),renderTooltip:(t,r)=>{let i=n[r];return i?(0,F.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,F.jsx)(`strong`,{children:t.label}),(0,F.jsx)(`span`,{children:e(`live.tooltip`,{latency:l.format(i.latency),errors:u.format(i.errors)})})]}):null},height:360,ariaLabel:e(`live.aria`)}),(0,F.jsxs)(h,{gap:12,wrap:!0,align:`center`,justify:`between`,children:[(0,F.jsx)(`output`,{"aria-live":`polite`,style:{color:f.length?`var(--danger-color)`:`var(--success-color)`},children:f.length?e(`live.criticalList`,{list:new Intl.ListFormat(t.language,{type:`conjunction`}).format(f)}):e(`live.allGood`)}),(0,F.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>s(e=>!e),children:e(a?`live.pause`:`live.resume`)})]})]})}var P,F,Ae,je,Me;function Ne(){return(Ne=e((()=>{P=t(),i(),a(),g(),x(),v(),F=n(),Ae=[{key:`auth`,latency:120,errors:.002},{key:`search`,latency:520,errors:.004},{key:`checkout`,latency:340,errors:.013},{key:`catalog`,latency:180,errors:.003},{key:`payments`,latency:610,errors:.016},{key:`notifications`,latency:260,errors:.007},{key:`recommendations`,latency:720,errors:.006},{key:`media`,latency:450,errors:.011}],je={xDomain:[0,1e3],yDomain:[0,4],xSplit:400,ySplit:1},Me=(e,t,n)=>Math.min(n,Math.max(t,e))})))()}function Pe(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,Fe.useMemo)(()=>Le.map(({name:t,x:n,y:r,ours:i})=>i?{label:e(`ourBrand`,{name:t}),x:n,y:r,color:`var(--primary-color)`,size:18}:{label:t,x:n,y:r,color:`var(--text-secondary-color)`}),[e]);return(0,Ie.jsx)(b,{points:t,quadrants:{topLeft:{label:e(`bestValue`)},topRight:{label:e(`premium`)},bottomLeft:{label:e(`budget`)},bottomRight:{label:e(`overpriced`)}},showTicks:!1,axisLabels:{top:e(`highQuality`),bottom:e(`lowQuality`),left:e(`lowPrice`),right:e(`highPrice`)},name:e(`brand`),height:340,ariaLabel:e(`positioningAria`)})}var Fe,Ie,Le;function Re(){return(Re=e((()=>{Fe=t(),i(),x(),Ie=n(),Le=[{name:`Northwind`,x:3.5,y:7.6,ours:!0},{name:`Contoso`,x:8,y:8.5},{name:`Fabrikam`,x:6.5,y:5.5},{name:`Tailspin`,x:2,y:3},{name:`Litware`,x:4.5,y:4},{name:`Adatum`,x:8.8,y:6.2},{name:`Proseware`,x:1.5,y:5.2}]})))()}function ze(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,I.useState)(Ve),[i,a]=(0,I.useState)(0),[o,s]=(0,I.useState)(null),l=t=>t.key?e(`tasks.${t.key}`):e(`newTask`,{n:t.n}),u=t=>e(R[t][0]),d=t.map(e=>({label:l(e),x:e.x,y:e.y})),f=r=>{let i=ne(Be,r),o=t.length%3-1,c={n:t.length+1,x:i.x+o,y:i.y+o/2,minutes:30};n(e=>[...e,c]),a(t.length),s(e(`taskAdded`,{task:l(c),quadrant:u(r)}))};return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,L.jsx)(b,{points:d,quadrants:He,reverseX:!0,showTicks:!1,selectedIndex:i,onPointClick:(t,n)=>{a(n),s(e(`triage.selected`,{task:t.label}))},onPointDrop:(t,r,i)=>{n(e=>e.map((e,t)=>t===r?{...e,x:i.x,y:i.y}:e)),s(e(`taskMoved`,{task:t.label,quadrant:u(i.quadrant)}))},renderQuadrantHeader:(n,{count:r,indices:i,region:a})=>{let o=n.endsWith(`Right`),s=i.reduce((e,n)=>e+t[n].minutes,0);return(0,L.jsxs)(`div`,{style:{display:`flex`,flexDirection:o?`row-reverse`:`row`,alignItems:`center`,gap:6,fontSize:12,color:`var(--text-secondary-color)`},children:[(0,L.jsx)(`span`,{style:{padding:`1px 6px`,borderRadius:999,fontWeight:700,color:a?.color,background:`color-mix(in srgb, ${a?.color} 16%, transparent)`},children:a?.badge}),(0,L.jsx)(`strong`,{style:{color:a?.color},children:u(n)}),(0,L.jsx)(`span`,{children:e(R[n][1])}),(0,L.jsx)(`span`,{children:e(Ue,{count:r,time:We(s)})}),(0,L.jsx)(c,{size:`xsmall`,variant:`ghost`,label:e(`addTask`,{quadrant:u(n)}),icon:(0,L.jsx)(se,{}),onClick:()=>f(n)})]})},getPointProps:(e,t)=>({"data-testid":`task-${t}`}),height:380,ariaLabel:e(`boardAria`)}),(0,L.jsx)(`p`,{role:`status`,children:o??e(`triage.headerHint`)})]})}var I,L,Be,Ve,He,R,Ue,We;function Ge(){return(Ge=e((()=>{I=t(),i(),s(),x(),v(),oe(),L=n(),Be={reverseX:!0},Ve=[{key:`loginOutage`,x:9,y:8,minutes:30},{key:`taxFiling`,x:7.2,y:7,minutes:45},{key:`quarterlyPlanning`,x:3,y:8.5,minutes:90},{key:`bookTravel`,x:8.5,y:3,minutes:15},{key:`inboxZero`,x:2.5,y:2,minutes:25}],He={topLeft:{badge:`Q1`,color:`var(--danger-color, #ef4444)`},topRight:{badge:`Q2`,color:`var(--primary-color, #4f46e5)`},bottomLeft:{badge:`Q3`,color:`var(--warning-color, #f59e0b)`},bottomRight:{badge:`Q4`,color:`var(--text-secondary-color, #64748b)`}},R={topLeft:[`doFirst`,`triage.doNow`],topRight:[`schedule`,`triage.plan`],bottomLeft:[`delegate`,`triage.handOff`],bottomRight:[`eliminate`,`triage.drop`]},Ue=`triage.count`,We=e=>e<60?`${e}m`:`${Math.floor(e/60)}h${e%60?` ${e%60}m`:``}`})))()}function Ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,z.useState)(!0),a=(0,z.useMemo)(()=>qe.map(([e,t,r,i,a])=>({key:e,reach:t,impact:r,confidence:i,effort:a,value:t*r*(n?i:1)})).map(e=>({...e,score:e.value/e.effort})),[n]),o=(0,z.useMemo)(()=>a.map(({key:t,effort:n,value:r,score:i})=>({label:e(`rice.items.${t}`),x:n,y:r,size:Math.round(8+6*Math.sqrt(i))})),[a,e]),s=(0,z.useMemo)(()=>new Intl.NumberFormat(t.language,{maximumFractionDigits:1}),[t.language]),c=(0,z.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`}),[t.language]),l=[...a].sort((e,t)=>t.score-e.score).slice(0,3).map(t=>e(`rice.items.${t.key}`));return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsx)(m,{checked:n,onChange:i,label:e(`rice.weighted`)}),(0,B.jsx)(b,{points:o,xDomain:[0,12],yDomain:[0,22],xSplit:4,ySplit:9,quadrants:{topLeft:{label:e(`quickWins`)},topRight:{label:e(`bigBets`)},bottomLeft:{label:e(`fillIns`)},bottomRight:{label:e(`moneyPits`)}},xLabel:e(`rice.effort`),yLabel:e(`rice.value`),renderTooltip:(t,n)=>{let r=a[n];return r?(0,B.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,B.jsx)(`strong`,{children:e(`rice.items.${r.key}`)}),(0,B.jsx)(`span`,{children:e(`rice.inputs`,{reach:s.format(r.reach),impact:s.format(r.impact),confidence:c.format(r.confidence),effort:s.format(r.effort)})}),(0,B.jsx)(`span`,{children:e(`rice.score`,{score:s.format(r.score)})})]}):null},height:380,ariaLabel:e(`rice.aria`)}),(0,B.jsx)(`output`,{"aria-live":`polite`,children:e(`rice.top`,{list:new Intl.ListFormat(t.language,{type:`conjunction`}).format(l)})})]})}var z,B,qe;function Je(){return(Je=e((()=>{z=t(),i(),p(),x(),B=n(),qe=[[`bulkEdit`,6,1,.8,1.5],[`sso`,2.5,3,.9,5],[`offlineMode`,8,2,.5,9],[`onboardingTour`,12,1,.8,2],[`aiSummary`,10,2,.5,3],[`themes`,9,.5,1,1],[`auditLog`,1.5,2,.8,3],[`chatAlerts`,5,1,1,1],[`apiV2`,3,3,.8,10],[`csvImport`,4,.5,1,.5]]})))()}function Ye(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,V.useState)(null),i=(0,V.useMemo)(()=>Xe.map(({key:t,likelihood:n,impact:r})=>({label:e(`risks.${t}`),x:n,y:r})),[e]),a=(0,V.useMemo)(()=>({topLeft:{label:e(`monitor`),color:`var(--warning-color)`},topRight:{label:e(`actNow`),color:`var(--danger-color)`},bottomLeft:{label:e(`accept`),color:`var(--success-color)`},bottomRight:{label:e(`mitigate`),color:`var(--warning-color)`}}),[e]);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,H.jsx)(b,{points:i,quadrants:a,xDomain:[1,5],yDomain:[1,5],xSplit:3,ySplit:3,xLabel:e(`likelihood`),yLabel:e(`severity`),name:e(`risk`),onPointClick:e=>n(e.label??null),onQuadrantClick:()=>n(null),height:340,ariaLabel:e(`riskAria`)}),(0,H.jsx)(`p`,{role:`status`,children:t?e(`riskSelected`,{risk:t}):e(`clickRisk`)})]})}var V,H,Xe;function Ze(){return(Ze=e((()=>{V=t(),i(),x(),H=n(),Xe=[{key:`keyPerson`,likelihood:2,impact:4.5},{key:`vendorDelay`,likelihood:4,impact:3.5},{key:`dataBreach`,likelihood:1.5,impact:5},{key:`scopeCreep`,likelihood:4.5,impact:2.5},{key:`budgetCut`,likelihood:2.5,impact:3.5},{key:`regulation`,likelihood:3.5,impact:4.2},{key:`outage`,likelihood:3,impact:2},{key:`turnover`,likelihood:1.5,impact:1.5}]})))()}function Qe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,U.useState)(null),[a,o]=(0,U.useState)(null),s=t=>e(`swot.${t}`),c=e=>new Intl.ListFormat(t.language,{type:`conjunction`}).format(e),l=(0,U.useMemo)(()=>{let e={topLeft:0,topRight:0,bottomLeft:0,bottomRight:0};for(let[,t,n]of G)e[q(t,n)]+=1;return e},[]),u=(0,U.useMemo)(()=>G.map(([t,r,i])=>({label:e(`swot.factors.${t}`),x:r,y:i,...n&&q(r,i)!==n?{color:`var(--border-color)`}:{}})),[n,e]),d=t=>{if(n===t){i(null),o(null);return}i(t),o(e(`swot.quadrantItems`,{quadrant:s(t),items:c(G.filter(([,e,n])=>q(e,n)===t).map(([t])=>e(`swot.factors.${t}`)))}))},p=t=>{let r=t.startsWith(`top`),i=t.endsWith(`Right`);return(0,W.jsx)(`div`,{style:{position:`absolute`,[r?`bottom`:`top`]:6,[i?`left`:`right`]:8},children:(0,W.jsx)(f,{size:`small`,color:n===t?`primary`:`neutral`,children:e(`swot.count`,{n:l[t]})})})};return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,W.jsx)(b,{points:u,quadrants:{topLeft:{label:s(`topLeft`),color:K.topLeft},topRight:{label:s(`topRight`),color:K.topRight},bottomLeft:{label:s(`bottomLeft`),color:K.bottomLeft},bottomRight:{label:s(`bottomRight`),color:K.bottomRight}},showTicks:!1,axisLabels:{top:e(`swot.internal`),bottom:e(`swot.external`),left:e(`swot.helpful`),right:e(`swot.harmful`)},quadrantContent:{topLeft:p(`topLeft`),topRight:p(`topRight`),bottomLeft:p(`bottomLeft`),bottomRight:p(`bottomRight`)},onQuadrantClick:d,onPointClick:t=>{let n=q(t.x,t.y);o(e(`swot.factor`,{factor:t.label,quadrant:s(n)}))},height:380,ariaLabel:e(`swot.aria`)}),(0,W.jsx)(`output`,{"aria-live":`polite`,children:a??e(`swot.hint`)})]})}var U,W,G,K,q;function $e(){return($e=e((()=>{U=t(),i(),d(),x(),v(),W=n(),G=[[`brandLoyalty`,2,8.5],[`ownPlatform`,3.6,6.8],[`lowChurn`,1.4,6.4],[`smallSalesTeam`,7.2,8.1],[`legacyBilling`,8.6,6.6],[`singleRegion`,6.1,7.4],[`smbMarket`,2.4,3.1],[`partnerships`,4,1.4],[`aiFeatures`,1.2,1.9],[`newEntrant`,7.6,2.6],[`regulation`,6.4,1.2],[`priceWar`,8.8,3.8]],K={topLeft:`var(--success-color)`,topRight:`var(--warning-color)`,bottomLeft:`var(--primary-color)`,bottomRight:`var(--danger-color)`},q=(e,t)=>y({},e,t)})))()}function et(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,J.useState)(X),[a,s]=(0,J.useState)(null),c=(0,J.useMemo)(()=>new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),[t.language]),l=t=>e(tt[t]),u=(0,J.useMemo)(()=>n.map((t,n)=>({label:e(`talent.roles.${t.role}`),x:t.x,y:t.y,size:nt(t,n)?16:11})),[n,e]),d=n.filter(nt).length;return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Y.jsx)(b,{points:u,xDomain:[1,9],yDomain:[1,9],quadrants:{topLeft:{label:l(`topLeft`),color:`var(--warning-color)`},topRight:{label:l(`topRight`),color:`var(--success-color)`},bottomLeft:{label:l(`bottomLeft`),color:`var(--danger-color)`},bottomRight:{label:l(`bottomRight`),color:`var(--primary-color)`}},xLabel:e(`talent.performance`),yLabel:e(`talent.potential`),onPointDrag:(t,n,r)=>s(e(`talent.moving`,{person:t.label,performance:c.format(Z(r.x)),potential:c.format(Z(r.y)),quadrant:l(r.quadrant)})),onPointDrop:(t,n,r)=>{i(e=>e.map((e,t)=>t===n?{...e,x:Z(r.x),y:Z(r.y)}:e)),s(e(`talent.moved`,{person:t.label,quadrant:l(r.quadrant)}))},onPointDoubleClick:(t,n)=>{i(e=>e.map((e,t)=>t===n?X[t]:e)),s(e(`talent.reset`,{person:t.label}))},height:380,ariaLabel:e(`talent.aria`)}),(0,Y.jsxs)(h,{gap:12,wrap:!0,align:`center`,justify:`between`,children:[(0,Y.jsx)(`output`,{"aria-live":`polite`,children:a??e(`talent.hint`)}),(0,Y.jsxs)(h,{gap:12,wrap:!0,align:`center`,children:[(0,Y.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`talent.changed`,{n:d,total:n.length})}),(0,Y.jsx)(o,{variant:`outline`,size:`small`,disabled:d===0,onClick:()=>{i(X),s(e(`talent.resetAll`))},children:e(`talent.resetButton`)})]})]})]})}var J,Y,X,tt,Z,nt;function rt(){return(rt=e((()=>{J=t(),i(),a(),g(),x(),Y=n(),X=[{role:`backendLead`,x:7.8,y:7.4},{role:`productDesigner`,x:6.1,y:3.2},{role:`dataAnalyst`,x:3.6,y:7.1},{role:`qaEngineer`,x:3.2,y:3.4},{role:`mobileDeveloper`,x:8.3,y:4.2},{role:`productManager`,x:5.6,y:8.1},{role:`supportLead`,x:7.1,y:2.4},{role:`juniorDeveloper`,x:2.6,y:6.2}],tt={topLeft:`talent.roughDiamonds`,topRight:`talent.futureLeaders`,bottomLeft:`talent.needsSupport`,bottomRight:`talent.solidPerformers`},Z=e=>Math.min(8.8,Math.max(1.2,e)),nt=(e,t)=>e.x!==X[t].x||e.y!==X[t].y})))()}function it(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,Q.useState)(at),[i,a]=(0,Q.useState)(null),[o,s]=(0,Q.useState)(null),c=t.map(({key:t,x:n,y:r})=>({label:e(`tasks.${t}`),x:n,y:r})),l=(0,Q.useMemo)(()=>({topLeft:{badge:`Q1`,label:e(`doFirst`),description:e(`triage.doNow`)},topRight:{badge:`Q2`,label:e(`schedule`),description:e(`triage.plan`)},bottomLeft:{badge:`Q3`,label:e(`delegate`),description:e(`triage.handOff`)},bottomRight:{badge:`Q4`,label:e(`eliminate`),description:e(`triage.drop`)}}),[e]),u=e=>l[e]?.label??``,d=e=>t[c.indexOf(e)]?.minutes??0;return(0,$.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,$.jsx)(b,{points:c,quadrants:l,reverseX:!0,showTicks:!1,axisLabels:{top:e(`important`),bottom:e(`notImportant`),left:e(`urgent`),right:e(`notUrgent`)},showCounts:(t,n)=>e(ot,{count:t,time:st(n.reduce((e,t)=>e+d(t),0))}),selectedIndex:i,onPointClick:(t,n)=>{a(n),s(e(`triage.selected`,{task:t.label}))},onPointDrop:(t,r,i)=>{n(e=>e.map((e,t)=>t===r?{...e,x:i.x,y:i.y}:e)),a(r),s(e(`taskMoved`,{task:t.label,quadrant:u(i.quadrant)}))},height:380,ariaLabel:e(`triage.aria`)}),(0,$.jsx)(`p`,{role:`status`,children:o??e(`triage.hint`)})]})}var Q,$,at,ot,st;function ct(){return(ct=e((()=>{Q=t(),i(),x(),$=n(),at=[{key:`loginOutage`,x:9,y:8,minutes:30},{key:`taxFiling`,x:7,y:8.8,minutes:45},{key:`quarterlyPlanning`,x:3,y:8.5,minutes:90},{key:`mentoring`,x:1.8,y:6.5,minutes:60},{key:`bookTravel`,x:8.5,y:3,minutes:15},{key:`meetings`,x:6.5,y:1.8,minutes:120},{key:`socialMedia`,x:1.5,y:1.2,minutes:20}],ot=`triage.count`,st=e=>e<60?`${e}m`:`${Math.floor(e/60)}h${e%60?` ${e%60}m`:``}`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: effort, y: impact (0-10)
const features = [
  { key: "darkMode", x: 2, y: 7.5 },
  { key: "sso", x: 6.5, y: 9 },
  { key: "csvExport", x: 1.5, y: 6 },
  { key: "offlineSync", x: 9, y: 8 },
  { key: "newIcons", x: 2.5, y: 2 },
  { key: "pluginApi", x: 8, y: 6.5 },
  { key: "customFonts", x: 7, y: 2.5 },
  { key: "tooltips", x: 1, y: 3.5 },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  const points = useMemo(
    (): QuadrantPoint[] =>
      features.map(({ key, x, y }) => ({ label: t(\`features.\${key}\`), x, y })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("quickWins") },
      topRight: { label: t("bigBets") },
      bottomLeft: { label: t("fillIns") },
      bottomRight: { label: t("timeSinks") },
    }),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={quadrants}
      xLabel={t("effort")}
      yLabel={t("impact")}
      name={t("feature")}
      height={320}
      ariaLabel={t("featuresAria")}
    />
  );
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// BCG matrix of a product portfolio. x: relative market share (our share /
// the leader's share, 1 = leader), y: market growth (% per year), revenue in
// million USD sets the size of the dots
const products = [
  { key: "cloud", share: 1.6, growth: 18, revenue: 420 },
  { key: "analytics", share: 0.45, growth: 22, revenue: 95 },
  { key: "mobile", share: 0.3, growth: 14, revenue: 60 },
  { key: "licenses", share: 1.8, growth: 3, revenue: 610 },
  { key: "support", share: 1.2, growth: 5, revenue: 280 },
  { key: "hardware", share: 0.4, growth: -2, revenue: 70 },
  { key: "training", share: 0.6, growth: 4, revenue: 40 },
];

export default function BcgDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  const points = useMemo(
    (): QuadrantPoint[] =>
      products.map(({ key, share, growth, revenue }) => ({
        label: t(\`products.\${key}\`),
        x: share,
        y: growth,
        size: 8 + Math.sqrt(revenue) * 1.2,
      })),
    [t],
  );
  // reverseX: by convention the high shares are on the left
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("stars"), color: "var(--success-color)" },
      topRight: { label: t("questionMarks"), color: "var(--warning-color)" },
      bottomLeft: { label: t("cashCows"), color: "var(--primary-color)" },
      bottomRight: { label: t("dogs"), color: "var(--danger-color)" },
    }),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={quadrants}
      xDomain={[0, 2]}
      xSplit={1}
      yDomain={[-5, 25]}
      ySplit={10}
      reverseX
      xLabel={t("relativeShare")}
      yLabel={t("marketGrowth")}
      name={t("product")}
      height={360}
      ariaLabel={t("bcgAria")}
    />
  );
}
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

type Dimension = "price" | "features" | "ease" | "support" | "integrations";

const DIMENSIONS: Dimension[] = [
  "price",
  "features",
  "ease",
  "support",
  "integrations",
];

// Analyst scores out of 10 (price: 10 = most affordable); the first row is us
const VENDORS: { name: string; ours?: boolean; scores: number[] }[] = [
  { name: "Northwind", ours: true, scores: [7.2, 6.4, 8.6, 7.8, 5.1] },
  { name: "Contoso", scores: [3.1, 9.2, 5.4, 8.1, 8.8] },
  { name: "Fabrikam", scores: [8.4, 4.2, 7.1, 4.6, 3.9] },
  { name: "Tailspin", scores: [5.6, 7.4, 4.1, 6.2, 7.6] },
  { name: "Litware", scores: [9.1, 3.1, 8.9, 3.4, 2.8] },
  { name: "Adatum", scores: [2.4, 8.1, 6.6, 9.1, 9.3] },
  { name: "Proseware", scores: [6.3, 5.6, 3.2, 5.1, 6.4] },
];

export default function CompetitorsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [x, setX] = useState<Dimension>("ease");
  const [y, setY] = useState<Dimension>("features");
  const [selected, setSelected] = useState<number | null>(null);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const xi = DIMENSIONS.indexOf(x);
  const yi = DIMENSIONS.indexOf(y);
  const points = useMemo(
    (): QuadrantPoint[] =>
      VENDORS.map(({ name, ours, scores }) => ({
        label: ours ? t("comp.us", { name }) : name,
        x: scores[xi]!,
        y: scores[yi]!,
        ...(ours
          ? { color: "var(--primary-color)", size: 18 }
          : { color: "var(--text-secondary-color)" }),
      })),
    [xi, yi, t],
  );

  const picker = (
    label: string,
    value: Dimension,
    onChange: (value: Dimension) => void,
  ) => (
    <Select
      aria-label={label}
      value={value}
      onChange={(next) => {
        onChange(next as Dimension);
        setSelected(null);
      }}
      style={{ minWidth: 180 }}
    >
      {DIMENSIONS.map((dimension) => (
        <SelectItem key={dimension} value={dimension}>
          {t(\`comp.dimensions.\${dimension}\`)}
        </SelectItem>
      ))}
    </Select>
  );

  let profile = t("comp.hint");
  if (selected !== null) {
    const vendor = VENDORS[selected]!;
    const us = VENDORS[0]!;
    const ahead = vendor.scores.filter((s, i) => s > us.scores[i]!).length;
    profile = t(vendor.ours ? "comp.ourProfile" : "comp.profile", {
      name: vendor.name,
      scores: new Intl.ListFormat(i18n.language, { type: "unit" }).format(
        DIMENSIONS.map((dimension, i) =>
          t("comp.score", {
            dimension: t(\`comp.dimensions.\${dimension}\`),
            score: decimal.format(vendor.scores[i]!),
          }),
        ),
      ),
      ahead,
      total: DIMENSIONS.length,
    });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        {picker(t("comp.xAxis"), x, setX)}
        {picker(t("comp.yAxis"), y, setY)}
      </HStack>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { color: "var(--chart-series-2)" },
          topRight: {
            label: t("comp.strongBoth"),
            color: "var(--success-color)",
          },
          bottomLeft: {
            label: t("comp.weakBoth"),
            color: "var(--text-muted-color)",
          },
          bottomRight: { color: "var(--chart-series-2)" },
        }}
        xLabel={t(\`comp.dimensions.\${x}\`)}
        yLabel={t(\`comp.dimensions.\${y}\`)}
        onPointClick={(_point, index) => setSelected(index)}
        onQuadrantClick={() => setSelected(null)}
        height={380}
        ariaLabel={t("comp.aria", {
          x: t(\`comp.dimensions.\${x}\`),
          y: t(\`comp.dimensions.\${y}\`),
        })}
      />
      <output aria-live="polite">{profile}</output>
    </div>
  );
}
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton, Input, Select, SelectItem } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  quadrantOf,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

type Corner = QuadrantCorner;

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

const corners: Corner[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

// translation keys of the quadrant titles
const titleKeys: Record<Corner, string> = {
  topLeft: "doFirst",
  topRight: "schedule",
  bottomLeft: "delegate",
  bottomRight: "eliminate",
};

// Same tints as the default quadrant colors
const colors: Record<Corner, string> = {
  topLeft: "var(--danger-color, #ef4444)",
  topRight: "var(--primary-color, #4f46e5)",
  bottomLeft: "var(--warning-color, #f59e0b)",
  bottomRight: "var(--text-secondary-color, #64748b)",
};

// task names are translated when rendered (\`key\`), added tasks are numbered
// (\`n\`) until they are renamed in the editor (\`label\`)
type Task = { key?: string; n?: number; label?: string; x: number; y: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function DraggableDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ name: string; quadrant: Corner }>({
    name: "",
    quadrant: "topLeft",
  });
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: Corner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.label ??
    (task.key ? t(\`tasks.\${task.key}\`) : t("newTask", { n: task.n }));
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const add = (corner: Corner, at?: { x: number; y: number }) => {
    const center = quadrantCenter(geometry, corner);
    // Offset new tasks a little so they do not stack on the same spot
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: clamp(at?.x ?? center.x + jitter),
      y: clamp(at?.y ?? center.y + jitter),
    };
    setTasks((current) => [...current, task]);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  const edit = (index: number) => {
    const task = tasks[index];
    setEditing(index);
    setDraft({
      name: name(task),
      quadrant: quadrantOf(geometry, task.x, task.y),
    });
  };

  // Moving a task to another quadrant puts it at that quadrant's center
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (editing === null) return;
    const task = tasks[editing];
    const label = draft.name.trim() || name(task);
    const moved = quadrantOf(geometry, task.x, task.y) !== draft.quadrant;
    const center = quadrantCenter(geometry, draft.quadrant);
    setTasks((current) =>
      current.map((item, i) =>
        i === editing
          ? {
              ...item,
              label,
              x: moved ? center.x : item.x,
              y: moved ? center.y : item.y,
            }
          : item,
      ),
    );
    setStatus(t("taskSaved", { task: label, quadrant: title(draft.quadrant) }));
    setEditing(null);
  };

  const remove = (index: number) => {
    const label = name(tasks[index]);
    setTasks((current) => current.filter((_, i) => i !== index));
    setEditing(null);
    setStatus(t("taskRemoved", { task: label }));
  };

  // Title + add button drawn over each quadrant, in its outer corner
  const header = (corner: Corner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 6,
          [right ? "right" : "left"]: 8,
          display: "flex",
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: colors[corner],
        }}
      >
        <span>{title(corner)}</span>
        <IconButton
          size="xsmall"
          variant="ghost"
          label={t("addTask", { quadrant: title(corner) })}
          icon={<LuPlus />}
          onClick={() => add(corner)}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { color: colors.topLeft },
          topRight: { color: colors.topRight },
          bottomLeft: { color: colors.bottomLeft },
          bottomRight: { color: colors.bottomRight },
        }}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        onPointDrag={(point, _index, target) =>
          setStatus(
            t("taskMoving", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          )
        }
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onPointDoubleClick={(_point, index) => edit(index)}
        onQuadrantClick={(corner, at) => add(corner, at)}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
        renderTooltip={(point) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{point.label}</strong>
            <span>
              {t("taskScores", {
                urgency: decimal.format(point.x),
                importance: decimal.format(point.y),
              })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("boardAria")}
      />
      {editing !== null && tasks[editing] && (
        <form
          onSubmit={save}
          aria-label={t("editTaskAria", { task: name(tasks[editing]) })}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Input
            aria-label={t("taskName")}
            value={draft.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          <Select
            aria-label={t("taskQuadrant")}
            value={draft.quadrant}
            onChange={(value) =>
              setDraft({ ...draft, quadrant: value as Corner })
            }
          >
            {corners.map((corner) => (
              <SelectItem key={corner} value={corner}>
                {title(corner)}
              </SelectItem>
            ))}
          </Select>
          <Button type="submit">{t("save")}</Button>
          <Button
            type="button"
            color="neutral"
            variant="outline"
            onClick={() => setEditing(null)}
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            color="danger"
            variant="outline"
            onClick={() => remove(editing)}
          >
            {t("remove")}
          </Button>
        </form>
      )}
      <p role="status">{status ?? t("dragHint")}</p>
    </div>
  );
}
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10)
const tasks = [
  { key: "loginOutage", x: 9, y: 7.2 },
  { key: "taxFiling", x: 7.5, y: 8.6 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "mentoring", x: 2, y: 7 },
  { key: "bookTravel", x: 8.5, y: 3 },
  { key: "meetings", x: 7, y: 2 },
  { key: "inboxZero", x: 3, y: 2.5 },
  { key: "socialMedia", x: 1.5, y: 1 },
];

export default function EisenhowerDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<QuadrantPoint | null>(null);

  const points = useMemo(
    (): QuadrantPoint[] =>
      tasks.map(({ key, x, y }) => ({ label: t(\`tasks.\${key}\`), x, y })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("doFirst") },
      topRight: { label: t("schedule") },
      bottomLeft: { label: t("delegate") },
      bottomRight: { label: t("eliminate") },
    }),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        xLabel={t("urgency")}
        yLabel={t("importance")}
        name={t("task")}
        onPointClick={(point) => setSelected(point)}
        height={320}
        ariaLabel={t("eisenhowerAria")}
      />
      <p role="status">
        {selected
          ? t("taskStatus", {
              task: selected.label,
              urgency: selected.x,
              importance: selected.y,
            })
          : t("clickTask")}
      </p>
    </div>
  );
}
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  QuadrantChart,
  quadrantOf,
  type QuadrantPoint,
} from "minerva-design/charts";

type Service = {
  key: string;
  latency: number; // p95, milliseconds
  errors: number; // share of failed requests, 0-0.05
};

const SERVICES: Service[] = [
  { key: "auth", latency: 120, errors: 0.002 },
  { key: "search", latency: 520, errors: 0.004 },
  { key: "checkout", latency: 340, errors: 0.013 },
  { key: "catalog", latency: 180, errors: 0.003 },
  { key: "payments", latency: 610, errors: 0.016 },
  { key: "notifications", latency: 260, errors: 0.007 },
  { key: "recommendations", latency: 720, errors: 0.006 },
  { key: "media", latency: 450, errors: 0.011 },
];

// x: p95 latency (ms), y: error rate (%); the splits are the SLO limits
const geometry = {
  xDomain: [0, 1000] as [number, number],
  yDomain: [0, 4] as [number, number],
  xSplit: 400,
  ySplit: 1,
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function LiveServicesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [services, setServices] = useState(SERVICES);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(42));

  // random walk every second, pulled back toward the starting values
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const next = random.current;
      setServices((current) =>
        current.map((service, i) => {
          const base = SERVICES[i]!;
          return {
            ...service,
            latency: clamp(
              service.latency +
                (next() - 0.5) * 140 +
                (base.latency - service.latency) * 0.15,
              40,
              980,
            ),
            errors: clamp(
              service.errors +
                (next() - 0.5) * 0.006 +
                (base.errors - service.errors) * 0.15,
              0,
              0.039,
            ),
          };
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const ms = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "millisecond",
        unitDisplay: "short",
        maximumFractionDigits: 0,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );

  const points = useMemo(
    (): QuadrantPoint[] =>
      services.map((service) => ({
        label: t(\`live.services.\${service.key}\`),
        x: service.latency,
        y: service.errors * 100,
      })),
    [services, t],
  );
  const critical = services
    .filter(
      (service) =>
        quadrantOf(geometry, service.latency, service.errors * 100) ===
        "topRight",
    )
    .map((service) => t(\`live.services.\${service.key}\`));

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        {...geometry}
        quadrants={{
          topLeft: {
            label: t("live.erroring"),
            color: "var(--warning-color)",
          },
          topRight: { label: t("live.critical"), color: "var(--danger-color)" },
          bottomLeft: {
            label: t("live.healthy"),
            color: "var(--success-color)",
          },
          bottomRight: { label: t("live.slow"), color: "var(--warning-color)" },
        }}
        xLabel={t("live.latency")}
        yLabel={t("live.errorRate")}
        renderTooltip={(point, index) => {
          const service = services[index];
          if (!service) return null;
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{point.label}</strong>
              <span>
                {t("live.tooltip", {
                  latency: ms.format(service.latency),
                  errors: percent.format(service.errors),
                })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("live.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output
          aria-live="polite"
          style={{
            color: critical.length
              ? "var(--danger-color)"
              : "var(--success-color)",
          }}
        >
          {critical.length
            ? t("live.criticalList", {
                list: new Intl.ListFormat(i18n.language, {
                  type: "conjunction",
                }).format(critical),
              })
            : t("live.allGood")}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("live.pause") : t("live.resume")}
        </Button>
      </HStack>
    </div>
  );
}
`})))()}var xt;function St(){return(St=e((()=>{xt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

// Perceptual map from a customer survey. x: price, y: perceived quality (0-10)
const brands = [
  { name: "Northwind", x: 3.5, y: 7.6, ours: true },
  { name: "Contoso", x: 8, y: 8.5 },
  { name: "Fabrikam", x: 6.5, y: 5.5 },
  { name: "Tailspin", x: 2, y: 3 },
  { name: "Litware", x: 4.5, y: 4 },
  { name: "Adatum", x: 8.8, y: 6.2 },
  { name: "Proseware", x: 1.5, y: 5.2 },
];

export default function PositioningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  // our brand gets its own color and a bigger dot
  const points = useMemo(
    (): QuadrantPoint[] =>
      brands.map(({ name, x, y, ours }) =>
        ours
          ? {
              label: t("ourBrand", { name }),
              x,
              y,
              color: "var(--primary-color)",
              size: 18,
            }
          : { label: name, x, y, color: "var(--text-secondary-color)" },
      ),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={{
        topLeft: { label: t("bestValue") },
        topRight: { label: t("premium") },
        bottomLeft: { label: t("budget") },
        bottomRight: { label: t("overpriced") },
      }}
      showTicks={false}
      axisLabels={{
        top: t("highQuality"),
        bottom: t("lowQuality"),
        left: t("lowPrice"),
        right: t("highPrice"),
      }}
      name={t("brand")}
      height={340}
      ariaLabel={t("positioningAria")}
    />
  );
}
`})))()}var Ct;function wt(){return(wt=e((()=>{Ct=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

type Task = { key?: string; n?: number; x: number; y: number; minutes: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8, minutes: 30 },
  { key: "taxFiling", x: 7.2, y: 7, minutes: 45 },
  { key: "quarterlyPlanning", x: 3, y: 8.5, minutes: 90 },
  { key: "bookTravel", x: 8.5, y: 3, minutes: 15 },
  { key: "inboxZero", x: 2.5, y: 2, minutes: 25 },
];

const quadrants: QuadrantRegions = {
  topLeft: { badge: "Q1", color: "var(--danger-color, #ef4444)" },
  topRight: { badge: "Q2", color: "var(--primary-color, #4f46e5)" },
  bottomLeft: { badge: "Q3", color: "var(--warning-color, #f59e0b)" },
  bottomRight: { badge: "Q4", color: "var(--text-secondary-color, #64748b)" },
};

// translation keys of the titles and of the action hints
const keys: Record<QuadrantCorner, [string, string]> = {
  topLeft: ["doFirst", "triage.doNow"],
  topRight: ["schedule", "triage.plan"],
  bottomLeft: ["delegate", "triage.handOff"],
  bottomRight: ["eliminate", "triage.drop"],
};

// i18next plural key ("count_one" / "count_other")
const COUNT = "triage.count";

const duration = (minutes: number) =>
  minutes < 60
    ? \`\${minutes}m\`
    : \`\${Math.floor(minutes / 60)}h\${minutes % 60 ? \` \${minutes % 60}m\` : ""}\`;

export default function QuadrantHeaderDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(0);
  const [status, setStatus] = useState<string | null>(null);
  const name = (task: Task) =>
    task.key ? t(\`tasks.\${task.key}\`) : t("newTask", { n: task.n });
  const title = (corner: QuadrantCorner) => t(keys[corner][0]);
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));

  const add = (corner: QuadrantCorner) => {
    const center = quadrantCenter(geometry, corner);
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: center.x + jitter,
      y: center.y + jitter / 2,
      minutes: 30,
    };
    setTasks((current) => [...current, task]);
    setSelected(tasks.length);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        selectedIndex={selected}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        // React header in the outer corner of each quadrant
        renderQuadrantHeader={(corner, { count, indices, region }) => {
          const right = corner.endsWith("Right");
          const minutes = indices.reduce((sum, i) => sum + tasks[i].minutes, 0);
          return (
            <div
              style={{
                display: "flex",
                flexDirection: right ? "row-reverse" : "row",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "var(--text-secondary-color)",
              }}
            >
              <span
                style={{
                  padding: "1px 6px",
                  borderRadius: 999,
                  fontWeight: 700,
                  color: region?.color,
                  background: \`color-mix(in srgb, \${region?.color} 16%, transparent)\`,
                }}
              >
                {region?.badge}
              </span>
              <strong style={{ color: region?.color }}>{title(corner)}</strong>
              <span>{t(keys[corner][1])}</span>
              <span>{t(COUNT, { count, time: duration(minutes) })}</span>
              <IconButton
                size="xsmall"
                variant="ghost"
                label={t("addTask", { quadrant: title(corner) })}
                icon={<LuPlus />}
                onClick={() => add(corner)}
              />
            </div>
          );
        }}
        // anchors on the dots for end-to-end tests: [data-testid="task-0"]
        getPointProps={(_point, index) => ({ "data-testid": \`task-\${index}\` })}
        height={380}
        ariaLabel={t("boardAria")}
      />
      <p role="status">{status ?? t("triage.headerHint")}</p>
    </div>
  );
}
`})))()}var Tt;function Et(){return(Et=e((()=>{Tt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

type Item =
  | "bulkEdit"
  | "sso"
  | "offlineMode"
  | "onboardingTour"
  | "aiSummary"
  | "themes"
  | "auditLog"
  | "chatAlerts"
  | "apiV2"
  | "csvImport";

// RICE inputs: reach (thousand users a quarter), impact (0.25 to 3),
// confidence (0 to 1) and effort (person-months)
const BACKLOG: [Item, number, number, number, number][] = [
  ["bulkEdit", 6, 1, 0.8, 1.5],
  ["sso", 2.5, 3, 0.9, 5],
  ["offlineMode", 8, 2, 0.5, 9],
  ["onboardingTour", 12, 1, 0.8, 2],
  ["aiSummary", 10, 2, 0.5, 3],
  ["themes", 9, 0.5, 1, 1],
  ["auditLog", 1.5, 2, 0.8, 3],
  ["chatAlerts", 5, 1, 1, 1],
  ["apiV2", 3, 3, 0.8, 10],
  ["csvImport", 4, 0.5, 1, 0.5],
];

export default function RiceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [weighted, setWeighted] = useState(true);

  // y: reach × impact (× confidence); RICE score = y / effort
  const scored = useMemo(
    () =>
      BACKLOG.map(([key, reach, impact, confidence, effort]) => {
        const value = reach * impact * (weighted ? confidence : 1);
        return { key, reach, impact, confidence, effort, value };
      }).map((item) => ({ ...item, score: item.value / item.effort })),
    [weighted],
  );
  const points = useMemo(
    (): QuadrantPoint[] =>
      scored.map(({ key, effort, value, score }) => ({
        label: t(\`rice.items.\${key}\`),
        x: effort,
        y: value,
        size: Math.round(8 + 6 * Math.sqrt(score)),
      })),
    [scored, t],
  );

  const decimal = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const top = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => t(\`rice.items.\${item.key}\`));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={weighted}
        onChange={setWeighted}
        label={t("rice.weighted")}
      />
      <QuadrantChart
        points={points}
        xDomain={[0, 12]}
        yDomain={[0, 22]}
        xSplit={4}
        ySplit={9}
        quadrants={{
          topLeft: { label: t("quickWins") },
          topRight: { label: t("bigBets") },
          bottomLeft: { label: t("fillIns") },
          bottomRight: { label: t("moneyPits") },
        }}
        xLabel={t("rice.effort")}
        yLabel={t("rice.value")}
        renderTooltip={(_point, index) => {
          const item = scored[index];
          if (!item) return null;
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{t(\`rice.items.\${item.key}\`)}</strong>
              <span>
                {t("rice.inputs", {
                  reach: decimal.format(item.reach),
                  impact: decimal.format(item.impact),
                  confidence: percent.format(item.confidence),
                  effort: decimal.format(item.effort),
                })}
              </span>
              <span>
                {t("rice.score", { score: decimal.format(item.score) })}
              </span>
            </div>
          );
        }}
        height={380}
        ariaLabel={t("rice.aria")}
      />
      <output aria-live="polite">
        {t("rice.top", {
          list: new Intl.ListFormat(i18n.language, {
            type: "conjunction",
          }).format(top),
        })}
      </output>
    </div>
  );
}
`})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// Project risks scored from 1 to 5. x: likelihood, y: impact
const risks = [
  { key: "keyPerson", likelihood: 2, impact: 4.5 },
  { key: "vendorDelay", likelihood: 4, impact: 3.5 },
  { key: "dataBreach", likelihood: 1.5, impact: 5 },
  { key: "scopeCreep", likelihood: 4.5, impact: 2.5 },
  { key: "budgetCut", likelihood: 2.5, impact: 3.5 },
  { key: "regulation", likelihood: 3.5, impact: 4.2 },
  { key: "outage", likelihood: 3, impact: 2 },
  { key: "turnover", likelihood: 1.5, impact: 1.5 },
];

export default function RiskDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<string | null>(null);

  const points = useMemo(
    (): QuadrantPoint[] =>
      risks.map(({ key, likelihood, impact }) => ({
        label: t(\`risks.\${key}\`),
        x: likelihood,
        y: impact,
      })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("monitor"), color: "var(--warning-color)" },
      topRight: { label: t("actNow"), color: "var(--danger-color)" },
      bottomLeft: { label: t("accept"), color: "var(--success-color)" },
      bottomRight: { label: t("mitigate"), color: "var(--warning-color)" },
    }),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        xDomain={[1, 5]}
        yDomain={[1, 5]}
        xSplit={3}
        ySplit={3}
        xLabel={t("likelihood")}
        yLabel={t("severity")}
        name={t("risk")}
        onPointClick={(point) => setSelected(point.label ?? null)}
        onQuadrantClick={() => setSelected(null)}
        height={340}
        ariaLabel={t("riskAria")}
      />
      <p role="status">
        {selected ? t("riskSelected", { risk: selected }) : t("clickRisk")}
      </p>
    </div>
  );
}
`})))()}var kt;function At(){return(At=e((()=>{kt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  QuadrantChart,
  quadrantOf,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";

type Corner = QuadrantCorner;

// x: helpful (0) to harmful (10), y: external (0) to internal (10); the
// farther from the center, the stronger the factor
const FACTORS: [string, number, number][] = [
  ["brandLoyalty", 2, 8.5],
  ["ownPlatform", 3.6, 6.8],
  ["lowChurn", 1.4, 6.4],
  ["smallSalesTeam", 7.2, 8.1],
  ["legacyBilling", 8.6, 6.6],
  ["singleRegion", 6.1, 7.4],
  ["smbMarket", 2.4, 3.1],
  ["partnerships", 4, 1.4],
  ["aiFeatures", 1.2, 1.9],
  ["newEntrant", 7.6, 2.6],
  ["regulation", 6.4, 1.2],
  ["priceWar", 8.8, 3.8],
];

const COLORS: Record<Corner, string> = {
  topLeft: "var(--success-color)",
  topRight: "var(--warning-color)",
  bottomLeft: "var(--primary-color)",
  bottomRight: "var(--danger-color)",
};
const corner = (x: number, y: number) => quadrantOf({}, x, y);

export default function SwotDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<Corner | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const title = (c: Corner) => t(\`swot.\${c}\`);
  const list = (items: string[]) =>
    new Intl.ListFormat(i18n.language, { type: "conjunction" }).format(items);

  const counts = useMemo(() => {
    const result: Record<Corner, number> = {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    };
    for (const [, x, y] of FACTORS) result[corner(x, y)] += 1;
    return result;
  }, []);

  // factors outside the selected quadrant fade to the border color
  const points = useMemo(
    (): QuadrantPoint[] =>
      FACTORS.map(([key, x, y]) => ({
        label: t(\`swot.factors.\${key}\`),
        x,
        y,
        ...(selected && corner(x, y) !== selected
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [selected, t],
  );

  const selectQuadrant = (c: Corner) => {
    if (selected === c) {
      setSelected(null);
      setStatus(null);
      return;
    }
    setSelected(c);
    setStatus(
      t("swot.quadrantItems", {
        quadrant: title(c),
        items: list(
          FACTORS.filter(([, x, y]) => corner(x, y) === c).map(([key]) =>
            t(\`swot.factors.\${key}\`),
          ),
        ),
      }),
    );
  };

  // count badge in the inner corner of each quadrant, next to the center
  const badge = (c: Corner) => {
    const top = c.startsWith("top");
    const right = c.endsWith("Right");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "bottom" : "top"]: 6,
          [right ? "left" : "right"]: 8,
        }}
      >
        <Tag size="small" color={selected === c ? "primary" : "neutral"}>
          {t("swot.count", { n: counts[c] })}
        </Tag>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { label: title("topLeft"), color: COLORS.topLeft },
          topRight: { label: title("topRight"), color: COLORS.topRight },
          bottomLeft: { label: title("bottomLeft"), color: COLORS.bottomLeft },
          bottomRight: {
            label: title("bottomRight"),
            color: COLORS.bottomRight,
          },
        }}
        showTicks={false}
        axisLabels={{
          top: t("swot.internal"),
          bottom: t("swot.external"),
          left: t("swot.helpful"),
          right: t("swot.harmful"),
        }}
        quadrantContent={{
          topLeft: badge("topLeft"),
          topRight: badge("topRight"),
          bottomLeft: badge("bottomLeft"),
          bottomRight: badge("bottomRight"),
        }}
        onQuadrantClick={selectQuadrant}
        onPointClick={(point) => {
          const c = corner(point.x, point.y);
          setStatus(
            t("swot.factor", { factor: point.label, quadrant: title(c) }),
          );
        }}
        height={380}
        ariaLabel={t("swot.aria")}
      />
      <output aria-live="polite">{status ?? t("swot.hint")}</output>
    </div>
  );
}
`})))()}var jt;function Mt(){return(Mt=e((()=>{jt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";

type Person = { role: string; x: number; y: number };

// x: performance this year, y: potential (1-9, calibration scale)
const INITIAL: Person[] = [
  { role: "backendLead", x: 7.8, y: 7.4 },
  { role: "productDesigner", x: 6.1, y: 3.2 },
  { role: "dataAnalyst", x: 3.6, y: 7.1 },
  { role: "qaEngineer", x: 3.2, y: 3.4 },
  { role: "mobileDeveloper", x: 8.3, y: 4.2 },
  { role: "productManager", x: 5.6, y: 8.1 },
  { role: "supportLead", x: 7.1, y: 2.4 },
  { role: "juniorDeveloper", x: 2.6, y: 6.2 },
];

const TITLES: Record<QuadrantCorner, string> = {
  topLeft: "talent.roughDiamonds",
  topRight: "talent.futureLeaders",
  bottomLeft: "talent.needsSupport",
  bottomRight: "talent.solidPerformers",
};

const clamp = (value: number) => Math.min(8.8, Math.max(1.2, value));
const moved = (person: Person, i: number) =>
  person.x !== INITIAL[i]!.x || person.y !== INITIAL[i]!.y;

export default function TalentDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [people, setPeople] = useState(INITIAL);
  const [status, setStatus] = useState<string | null>(null);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const title = (corner: QuadrantCorner) => t(TITLES[corner]);

  // recalibrated people get a bigger dot
  const points = useMemo(
    (): QuadrantPoint[] =>
      people.map((person, i) => ({
        label: t(\`talent.roles.\${person.role}\`),
        x: person.x,
        y: person.y,
        size: moved(person, i) ? 16 : 11,
      })),
    [people, t],
  );
  const changed = people.filter(moved).length;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        xDomain={[1, 9]}
        yDomain={[1, 9]}
        quadrants={{
          topLeft: {
            label: title("topLeft"),
            color: "var(--warning-color)",
          },
          topRight: {
            label: title("topRight"),
            color: "var(--success-color)",
          },
          bottomLeft: {
            label: title("bottomLeft"),
            color: "var(--danger-color)",
          },
          bottomRight: {
            label: title("bottomRight"),
            color: "var(--primary-color)",
          },
        }}
        xLabel={t("talent.performance")}
        yLabel={t("talent.potential")}
        onPointDrag={(point, _index, target) =>
          setStatus(
            t("talent.moving", {
              person: point.label,
              performance: decimal.format(clamp(target.x)),
              potential: decimal.format(clamp(target.y)),
              quadrant: title(target.quadrant),
            }),
          )
        }
        onPointDrop={(point, index, target) => {
          setPeople((current) =>
            current.map((person, i) =>
              i === index
                ? { ...person, x: clamp(target.x), y: clamp(target.y) }
                : person,
            ),
          );
          setStatus(
            t("talent.moved", {
              person: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onPointDoubleClick={(point, index) => {
          setPeople((current) =>
            current.map((person, i) => (i === index ? INITIAL[i]! : person)),
          );
          setStatus(t("talent.reset", { person: point.label }));
        }}
        height={380}
        ariaLabel={t("talent.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{status ?? t("talent.hint")}</output>
        <HStack gap={12} wrap align="center">
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("talent.changed", { n: changed, total: people.length })}
          </span>
          <Button
            variant="outline"
            size="small"
            disabled={changed === 0}
            onClick={() => {
              setPeople(INITIAL);
              setStatus(t("talent.resetAll"));
            }}
          >
            {t("talent.resetButton")}
          </Button>
        </HStack>
      </HStack>
    </div>
  );
}
`})))()}var Nt;function Pt(){return(Pt=e((()=>{Nt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10), with an estimate in minutes
const initial = [
  { key: "loginOutage", x: 9, y: 8, minutes: 30 },
  { key: "taxFiling", x: 7, y: 8.8, minutes: 45 },
  { key: "quarterlyPlanning", x: 3, y: 8.5, minutes: 90 },
  { key: "mentoring", x: 1.8, y: 6.5, minutes: 60 },
  { key: "bookTravel", x: 8.5, y: 3, minutes: 15 },
  { key: "meetings", x: 6.5, y: 1.8, minutes: 120 },
  { key: "socialMedia", x: 1.5, y: 1.2, minutes: 20 },
];

// i18next plural key ("count_one" / "count_other")
const COUNT = "triage.count";

const duration = (minutes: number) =>
  minutes < 60
    ? \`\${minutes}m\`
    : \`\${Math.floor(minutes / 60)}h\${minutes % 60 ? \` \${minutes % 60}m\` : ""}\`;

export default function TriageDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const points = tasks.map(({ key, x, y }): QuadrantPoint => ({
    label: t(\`tasks.\${key}\`),
    x,
    y,
  }));
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: {
        badge: "Q1",
        label: t("doFirst"),
        description: t("triage.doNow"),
      },
      topRight: {
        badge: "Q2",
        label: t("schedule"),
        description: t("triage.plan"),
      },
      bottomLeft: {
        badge: "Q3",
        label: t("delegate"),
        description: t("triage.handOff"),
      },
      bottomRight: {
        badge: "Q4",
        label: t("eliminate"),
        description: t("triage.drop"),
      },
    }),
    [t],
  );
  const title = (corner: QuadrantCorner) => quadrants[corner]?.label ?? "";
  const minutesOf = (point: QuadrantPoint) =>
    tasks[points.indexOf(point)]?.minutes ?? 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        // "3 tasks · 1h 15m" after each title
        showCounts={(count, inQuadrant) =>
          t(COUNT, {
            count,
            time: duration(
              inQuadrant.reduce((sum, point) => sum + minutesOf(point), 0),
            ),
          })
        }
        selectedIndex={selected}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        // drag, or Shift + arrow keys on the focused task
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setSelected(index);
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        height={380}
        ariaLabel={t("triage.aria")}
      />
      <p role="status">{status ?? t("triage.hint")}</p>
    </div>
  );
}
`})))()}var Ft,It,Lt;function Rt(){return(Rt=e((()=>{fe(),_e(),ye(),we(),De(),Ne(),Re(),Ge(),Je(),Ze(),$e(),rt(),ct(),ut(),ft(),mt(),gt(),vt(),bt(),St(),wt(),Et(),Ot(),At(),Mt(),Pt(),t(),ie(),ae(),Ft=n(),It=re(Object.assign({"./demos/basic.tsx":ce,"./demos/bcg.tsx":pe,"./demos/competitors.tsx":ve,"./demos/draggable.tsx":be,"./demos/eisenhower.tsx":Te,"./demos/live-services.tsx":ke,"./demos/positioning.tsx":Pe,"./demos/quadrant-header.tsx":ze,"./demos/rice.tsx":Ke,"./demos/risk.tsx":Ye,"./demos/swot.tsx":Qe,"./demos/talent.tsx":et,"./demos/triage.tsx":it}),Object.assign({"./demos/basic.tsx":lt,"./demos/bcg.tsx":dt,"./demos/competitors.tsx":pt,"./demos/draggable.tsx":ht,"./demos/eisenhower.tsx":_t,"./demos/live-services.tsx":yt,"./demos/positioning.tsx":xt,"./demos/quadrant-header.tsx":Ct,"./demos/rice.tsx":Tt,"./demos/risk.tsx":Dt,"./demos/swot.tsx":kt,"./demos/talent.tsx":jt,"./demos/triage.tsx":Nt})),Lt=()=>(0,Ft.jsx)(S,{id:`quadrant-chart`,demos:It})})))()}Rt();export{Lt as default};