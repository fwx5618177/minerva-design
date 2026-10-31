import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Tag-D6SUzaZT.js";import{n as ee,t as p}from"./Switch-CHbzff3y.js";import{l as m,n as te,t as ne,u as re}from"./DocPage-BdPOW9nQ.js";import{m as h,r as g}from"./charts-JJDQ3gS7.js";function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,oe.useMemo)(()=>{let t=ie(3),n=[],r=120;for(let e=0;e<60;e++)r+=t()*12,n.push(Math.round(r));return[{name:e(`storage`),data:n,opacity:.25}]},[e]),a=(0,oe.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`gigabyte`}),[n]);return(0,se.jsx)(g,{series:i,area:!0,xAxis:{title:e(`day`)},yAxis:{zero:!0,format:e=>a.format(e)},height:280,ariaLabel:e(`storageAria`)})}var oe,se;function ce(){return(ce=e((()=>{oe=t(),i(),h(),se=n()})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>{let t=pe(n);return[{name:e(`thisWeek`),data:t.map((e,t)=>[e,de[t]])},{name:e(`lastWeek`),data:t.map((e,t)=>[e,fe[t]])}]},[e,n]),a=(0,_.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,ue.jsx)(g,{series:i,yAxis:{format:e=>a.format(e)},height:280,ariaLabel:e(`visitorsAria`)})}var _,ue,de,fe,pe;function me(){return(me=e((()=>{_=t(),i(),h(),ue=n(),de=[1200,1350,1280,1490,1610,980,870],fe=[1100,1180,1250,1300,1420,1010,760],pe=e=>{let t=new Intl.DateTimeFormat(e,{weekday:`short`});return Array.from({length:7},(e,n)=>t.format(new Date(2026,0,5+n)))}})))()}function he(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,[i,a]=(0,v.useState)(`smooth`),o=(0,v.useMemo)(()=>{let t=ve(n);return[{name:e(`lisbon`),data:t.map((e,t)=>[e,ge[t]])},{name:e(`oslo`),data:t.map((e,t)=>[e,_e[t]])}]},[e,n]),c=(0,v.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1}),[n]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsx)(s,{"aria-label":e(`curve`),direction:`horizontal`,value:i,onChange:e=>a(e),children:ye.map(t=>(0,y.jsx)(u,{value:t,label:e(`curves.${t}`)},t))}),(0,y.jsx)(g,{series:o,curve:i,yAxis:{format:e=>c.format(e)},height:280,ariaLabel:e(`temperatureAria`)})]})}var v,y,ge,_e,ve,ye;function be(){return(be=e((()=>{v=t(),i(),c(),l(),h(),y=n(),ge=[11.6,12.6,14.9,16.2,18.8,21.9,23.6,24,22.6,19.4,15.3,12.7],_e=[-4.3,-4,-.2,4.5,10.8,15.2,16.4,15.2,10.8,5,.6,-3.2],ve=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))},ye=[`linear`,`smooth`,`step`]})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,b.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{hour:`numeric`}),r=e=>t.format(new Date(2026,0,1,e));return[{name:e(`indoor`),data:we.map(e=>[r(e),Se[e]])},{name:e(`outdoor`),data:we.map(e=>[r(e),Ce[e]])}]},[e,n]),a=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1}),[n]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(g,{series:i,curve:`smooth`,yAxis:{format:e=>a.format(e)},height:280,ariaLabel:e(`gapsAria`)}),(0,x.jsx)(`p`,{children:e(`gapsNote`)})]})}var b,x,Se,Ce,we;function Te(){return(Te=e((()=>{b=t(),i(),h(),x=n(),Se=[20.8,20.6,20.4,20.3,20.1,20,20.4,21,21.6,21.9,null,null,null,22.8,23,23.1,22.9,22.6,22.3,22,21.7,21.4,21.2,21],Ce=[9.1,8.7,8.2,7.9,7.6,7.4,8,9.3,11.2,13,14.6,15.9,16.8,17.4,17.6,17.2,null,null,14.1,12.8,11.7,10.9,10.2,9.6],we=Array.from({length:24},(e,t)=>t)})))()}function Ee(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function De(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,Oe.useMemo)(()=>{let t={equities:e(`assets.equities`),bonds:e(`assets.bonds`),gold:e(`assets.gold`),realEstate:e(`assets.realEstate`)};return Object.keys(w).map(e=>({name:t[e],data:w[e]}))},[e]),a=(0,Oe.useMemo)(()=>({index:new Intl.NumberFormat(n,{maximumFractionDigits:1}),change:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`}),month:new Intl.DateTimeFormat(n,{year:`numeric`,month:`short`})}),[n]);return(0,S.jsx)(g,{series:i,renderTooltip:e=>{let t=[...e.items].sort((e,t)=>t.y-e.y);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:4,minWidth:200},children:[(0,S.jsx)(`strong`,{children:a.month.format(e.x)}),t.map((e,t)=>(0,S.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr auto auto`,alignItems:`center`,gap:8},children:[(0,S.jsx)(`span`,{"aria-hidden":!0,style:{width:8,height:8,borderRadius:`50%`,background:e.color}}),(0,S.jsx)(`span`,{style:{fontWeight:t===0?600:void 0},children:e.seriesName}),(0,S.jsx)(`span`,{style:{textAlign:`end`},children:a.index.format(e.y)}),(0,S.jsx)(`span`,{style:{textAlign:`end`,color:e.y>=100?`var(--success-color)`:`var(--danger-color)`},children:a.change.format(e.y/100-1)})]},e.seriesId))]})},crosshair:!0,annotations:[{type:`line`,axis:`y`,value:100,dash:[4,4],label:e(`baseIndex`)}],xAxis:{type:`time`,format:e=>a.month.format(e)},yAxis:{format:e=>a.index.format(e)},height:320,ariaLabel:e(`assetsAria`)})}var Oe,S,ke,Ae,C,w;function je(){return(je=e((()=>{Oe=t(),i(),h(),S=n(),ke=61,Ae=e=>new Date(2021,e,1).getTime(),C=(e,t,n)=>{let r=Ee(e),i=100;return Array.from({length:ke},(e,a)=>(a>0&&(i*=1+t+(r()-.5)*n),[Ae(a),Math.round(i*10)/10]))},w={equities:C(3,.008,.09),bonds:C(8,-5e-4,.03),gold:C(12,.009,.07),realEstate:C(21,.002,.06)}})))()}function Me(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),[n,i]=(0,Pe.useState)(null),a=(0,Pe.useMemo)(()=>{let t=Me(2026),n=new Float64Array(E),r=new Float64Array(E),i=100;for(let e=0;e<E;e++)i+=(t()-.5)*.4,n[e]=Fe+e*1e3,r[e]=i;return[{name:e(`sensor`),data:{x:n,y:r},lineWidth:1}]},[e]);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,T.jsx)(g,{series:a,xAxis:{type:`time`},onRendererChange:i,height:300,ariaLabel:e(`sensorAria`)}),(0,T.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{points:new Intl.NumberFormat(t.language).format(E),renderer:n??`…`})})]})}var Pe,T,E,Fe;function Ie(){return(Ie=e((()=>{Pe=t(),i(),h(),T=n(),E=1e6,Fe=Date.UTC(2026,0,1)})))()}function Le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,[i,a]=(0,D.useState)(!0),[s,c]=(0,D.useState)(Ve);(0,D.useEffect)(()=>{if(!i)return;let e=setInterval(()=>{c(({tick:e,points:t})=>{let n=t[t.length-1]?.[0]??Date.now();return{tick:e+1,points:[...t.slice(1),[n+k,Be(e)]]}})},k);return()=>clearInterval(e)},[i]);let l=(0,D.useMemo)(()=>[{name:e(`freezer`),data:s.points}],[e,s.points]),u=(0,D.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1}),[n]),d=(0,D.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),[n]),ee=(0,D.useMemo)(()=>[{type:`rect`,y0:A,color:`var(--danger-color)`,opacity:.08},{type:`line`,axis:`y`,value:A,color:`var(--danger-color)`,dash:[4,4],label:e(`alarmLimit`,{value:u.format(A)})}],[e,u]),[p,m]=s.points[s.points.length-1]??[0,0],te=s.points.filter(([,e])=>e>A).length,ne=m>A;return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:10,width:`100%`},children:[(0,O.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,O.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>a(e=>!e),children:e(i?`pause`:`resume`)}),(0,O.jsx)(`output`,{"aria-live":`polite`,children:(0,O.jsx)(f,{color:ne?`danger`:`success`,size:`small`,children:e(ne?`sensorAlarm`:`sensorNormal`)})}),(0,O.jsxs)(`span`,{style:{fontSize:13,color:`var(--text-secondary-color)`},children:[e(`lastReading`,{value:u.format(m),time:d.format(p)}),` · `,e(`aboveLimit`,{readings:te})]})]}),(0,O.jsx)(g,{series:l,annotations:ee,curve:`smooth`,xAxis:{type:`time`,format:e=>d.format(e)},yAxis:{min:-22,max:-10,format:e=>u.format(e)},legend:!1,height:280,ariaLabel:e(`freezerAria`)})]})}var D,O,k,ze,A,Be,Ve;function He(){return(He=e((()=>{D=t(),i(),a(),d(),h(),O=n(),k=1e3,ze=60,A=-15,Be=e=>{let t=e%45,n=t<12?5.6*Math.sin(t/12*Math.PI):0,r=(Le(e*7919)()-.5)*.6;return Math.round((-18.6+.4*Math.sin(e/7)+n+r)*10)/10},Ve=()=>{let e=Math.floor(Date.now()/k)*k;return{tick:80,points:Array.from({length:ze},(t,n)=>[e-(59-n)*k,Be(n+20)])}}})))()}function Ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,[i,a]=(0,j.useState)(!0),o=(0,j.useMemo)(()=>{let t={wild:e(`strains.wild`),mutant:e(`strains.mutant`),antibiotic:e(`strains.antibiotic`)};return Object.keys(N).map(e=>{let{capacity:n,rate:r,lag:i}=N[e];return{name:t[e],data:Ge.map(e=>[e,We(e,Ke,n,r,i)])}})},[e]),s=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{notation:`scientific`,maximumFractionDigits:1}),[n]),c=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,unitDisplay:`narrow`,maximumFractionDigits:1}),[n]),l=(0,j.useMemo)(()=>[{type:`rect`,x0:3,x1:12,color:`var(--primary-color)`,opacity:.06,label:e(`exponentialPhase`)}],[e]),u=Math.LN2/N.wild.rate*60,d=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`long`,maximumFractionDigits:0});return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsx)(p,{checked:i,onChange:a,label:e(`logScale`)}),(0,M.jsx)(g,{series:o,annotations:l,curve:`smooth`,xAxis:{title:e(`elapsed`),format:e=>c.format(e)},yAxis:{type:i?`log`:`linear`,title:e(`cfu`),format:e=>s.format(e)},height:320,ariaLabel:e(`growthAria`)}),(0,M.jsx)(`p`,{style:{margin:0,color:`var(--text-secondary-color)`},children:i?e(`logNote`,{minutes:d.format(u)}):e(`linearNote`)})]})}var j,M,We,Ge,N,Ke;function qe(){return(qe=e((()=>{j=t(),i(),ee(),h(),M=n(),We=(e,t,n,r,i)=>e<=i?t:n/(1+(n/t-1)*Math.exp(-r*(e-i))),Ge=Array.from({length:49},(e,t)=>t/2),N={wild:{capacity:2e9,rate:1.4,lag:2},mutant:{capacity:6e8,rate:.9,lag:3},antibiotic:{capacity:4e5,rate:.55,lag:5}},Ke=1e3})))()}function Je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,[i,a]=(0,P.useState)([]),s=(0,P.useMemo)(()=>[{name:e(`portfolio`),data:Qe}],[e]),c=(0,P.useMemo)(()=>({eur:new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}),compact:new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`}),change:new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0,signDisplay:`exceptZero`}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:2,signDisplay:`exceptZero`}),days:new Intl.NumberFormat(n,{style:`unit`,unit:`day`,unitDisplay:`long`}),date:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`})}),[n]),l=e=>{let t=e.items[0];t&&a(e=>[...e.length>=2?[]:e,{x:t.x,y:t.y}])},[u,d]=[...i].sort((e,t)=>e.x-t.x),f=u&&d?d.y>=u.y:!0,ee=(0,P.useMemo)(()=>{let e=i.map(e=>({type:`line`,axis:`x`,value:e.x,color:`var(--primary-color)`,dash:[4,4],label:c.date.format(e.x)}));return!u||!d?e:[{type:`rect`,x0:u.x,x1:d.x,color:f?`var(--success-color)`:`var(--danger-color)`,opacity:.1},...e]},[i,u,d,f,c]),p=e(`measureHint`);return u&&d?p=e(`measureResult`,{from:c.date.format(u.x),to:c.date.format(d.x),change:c.change.format(d.y-u.y),percent:c.percent.format(d.y/u.y-1),days:c.days.format(Math.round((d.x-u.x)/I))}):u&&(p=e(`measureStart`,{date:c.date.format(u.x),value:c.eur.format(u.y)})),(0,F.jsxs)(`div`,{style:{display:`grid`,gap:10,width:`100%`},children:[(0,F.jsx)(g,{series:s,annotations:ee,onPointClick:l,onPlotClick:()=>a([]),tooltip:{mode:`nearest`},crosshair:!0,xAxis:{type:`time`,format:e=>c.date.format(e)},yAxis:{format:e=>c.compact.format(e)},legend:!1,height:300,ariaLabel:e(`portfolioAria`)}),(0,F.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,F.jsx)(o,{size:`small`,variant:`outline`,disabled:i.length===0,onClick:()=>a([]),children:e(`clear`)}),(0,F.jsx)(`output`,{"aria-live":`polite`,style:{color:u&&d?f?`var(--success-color)`:`var(--danger-color)`:void 0},children:p})]})]})}var P,F,I,Xe,Ze,L,Qe;function $e(){return($e=e((()=>{P=t(),i(),a(),h(),F=n(),I=864e5,Xe=new Date(2026,0,1).getTime(),Ze=Je(64),L=25e4,Qe=Array.from({length:300},(e,t)=>(L*=1+(Ze()-.47)*.018+Math.sin(t/40)*.002,[Xe+t*I,Math.round(L)]))})))()}function et(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function tt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,R.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]),a=(0,R.useMemo)(()=>new Intl.NumberFormat(n),[n]),o=(0,R.useMemo)(()=>t=>e(`micrograms`,{value:a.format(t)}),[e,a]),s=(0,R.useMemo)(()=>at.map(({key:t,data:n})=>{let r=e(`cities.${t}`);return{key:t,name:r,series:[{name:r,data:n,opacity:.18,format:o}],above:n.filter(([,e])=>e>B).length}}),[e,o]),c=(0,R.useMemo)(()=>[{type:`line`,axis:`y`,value:B,color:`var(--warning-color)`,dash:[3,3]}],[]);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsx)(`p`,{style:{margin:0,color:`var(--text-secondary-color)`},children:e(`guidelineNote`,{value:o(B)})}),(0,z.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:16},children:s.map(t=>(0,z.jsxs)(`figure`,{style:{margin:0,minWidth:0},children:[(0,z.jsxs)(`figcaption`,{style:{display:`flex`,justifyContent:`space-between`,gap:8,fontSize:13},children:[(0,z.jsx)(`strong`,{children:t.name}),(0,z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`daysAbove`,{days:t.above,total:30})})]}),(0,z.jsx)(g,{series:t.series,area:!0,curve:`smooth`,annotations:c,interaction:!1,legend:!1,xAxis:{type:`time`,tickCount:3,format:e=>i.format(e)},yAxis:{min:0,max:it,tickCount:3,format:e=>a.format(e)},height:150,ariaLabel:e(`pmAria`,{city:t.name})})]},t.key))})]})}var R,z,nt,rt,B,it,at;function ot(){return(ot=e((()=>{R=t(),i(),h(),z=n(),nt=864e5,rt=new Date(2026,10,1).getTime(),B=15,it=120,at=[{key:`delhi`,base:78,swing:30},{key:`beijing`,base:42,swing:28},{key:`paris`,base:14,swing:8},{key:`mexicoCity`,base:24,swing:10},{key:`tokyo`,base:10,swing:5},{key:`saoPaulo`,base:17,swing:7}].map(({key:e,base:t,swing:n},r)=>{let i=et(100+r);return{key:e,data:Array.from({length:30},(e,a)=>{let o=Math.sin(a/3.2+r)*.6+(i()-.5)*.8,s=Math.max(3,t+n*o);return[rt+a*nt,Math.round(s)]})}})})))()}function st(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,[i,a]=(0,V.useState)(`stacked`),o=i===`percent`,c=(0,V.useMemo)(()=>{let t=ct(n),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),i={compute:e(`services.compute`),storage:e(`services.storage`),network:e(`services.network`),databases:e(`services.databases`)};return Object.keys(U).map(e=>({name:i[e],format:e=>r.format(e),data:t.map((t,n)=>[t,U[e][n]])}))},[e,n]),l=(0,V.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsxs)(s,{"aria-label":e(`stackMode`),direction:`horizontal`,value:i,onChange:e=>a(String(e)),children:[(0,H.jsx)(u,{value:`stacked`,label:e(`stacked`)}),(0,H.jsx)(u,{value:`percent`,label:`100%`})]}),(0,H.jsx)(g,{series:c,area:!0,stacked:!0,percent:o,yAxis:o?void 0:{format:e=>l.format(e)},height:300,ariaLabel:e(`spendAria`)})]})}var V,H,U,ct;function lt(){return(lt=e((()=>{V=t(),i(),c(),l(),h(),H=n(),U={compute:[18400,19100,20600,21e3,22800,24100,23500,25900,27200,28e3,29400,31800],storage:[6200,6500,6900,7400,7800,8300,8900,9400,9800,10500,11100,11900],network:[3100,2900,3600,4200,3800,4600,5300,4900,5200,5800,6400,7100],databases:[9800,9900,10200,10100,10800,11200,11e3,11600,12100,12400,12300,12900]},ct=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function ut(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,W.useMemo)(()=>[{name:e(`median`),data:_t},{name:e(`p95`),data:vt}],[e]),a=(0,W.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`}),[n]),o=(0,W.useMemo)(()=>[{type:`rect`,y0:ht,color:`var(--danger-color)`,opacity:.1,label:e(`critical`)},{type:`line`,axis:`y`,value:mt,color:`var(--warning-color)`,dash:[6,4],label:e(`target`,{value:a.format(mt)})}],[e,a]),s=(0,W.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`}),[n]);return(0,dt.jsx)(g,{series:i,annotations:o,crosshair:!0,xAxis:{type:`time`,format:e=>s.format(e)},yAxis:{min:0,max:700,format:e=>a.format(e)},height:300,ariaLabel:e(`latencyAria`)})}var W,dt,ft,pt,mt,ht,gt,_t,vt;function yt(){return(yt=e((()=>{W=t(),i(),h(),dt=n(),ft=6e4,pt=new Date(2026,9,12,8).getTime(),mt=300,ht=450,gt=(e,t)=>Array.from({length:72},(n,r)=>{let i=Math.max(0,1-Math.abs(r-36)/6),a=Math.sin(r*1.3)*.08+Math.cos(r*.7)*.05;return[pt+r*5*ft,Math.round(e*(1+a)+t*i)]}),_t=gt(120,140),vt=gt(240,330)})))()}function bt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function xt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,G.useMemo)(()=>{let t=bt(11),n=e=>Array.from({length:180},(n,r)=>{let i=new Date(wt+r*Ct).getDay()%6==0,a=e*(1+r/300)*(i?.6:1)*(.9+t()*.2);return[new Date(wt+r*Ct),Math.round(a)]});return[{name:e(`pageViews`),data:n(42e3)},{name:e(`sessions`),data:n(18e3)}]},[e]),a=(0,G.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),o=(0,G.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]);return(0,St.jsx)(g,{series:i,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>a.format(e)},height:300,ariaLabel:e(`trafficAria`)})}var G,St,Ct,wt;function Tt(){return(Tt=e((()=>{G=t(),i(),h(),St=n(),Ct=864e5,wt=new Date(2026,0,1).getTime()})))()}function Et(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,K.useMemo)(()=>[{name:e(`visitors`),data:kt}],[e]),a=(0,K.useMemo)(()=>[{type:`line`,axis:`x`,value:Ot,color:`var(--success-color)`,dash:[4,4],label:e(`launch`)},{type:`rect`,x0:Y[0],x1:Y[1],color:`var(--danger-color)`,opacity:.12,label:e(`outage`),labelPosition:`top-right`}],[e]),o=(0,K.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]),s=(0,K.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,Dt.jsx)(g,{series:i,annotations:a,area:!0,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>s.format(e)},height:300,ariaLabel:e(`eventsAria`)})}var K,Dt,q,J,Ot,Y,kt;function At(){return(At=e((()=>{K=t(),i(),h(),Dt=n(),q=864e5,J=new Date(2026,2,1).getTime(),Ot=J+34*q,Y=[J+61*q,J+64*q],kt=Array.from({length:90},(e,t)=>{let n=J+t*q,r=new Date(n).getDay(),i=r===0||r===6?.7:1,a=t>=34?1.35+1.4*Math.exp(-(t-34)/3):1,o=n>=Y[0]&&n<Y[1]?.35:1,s=8200*i*a*o*(1+Math.sin(t*1.7)/20);return[n,Math.round(s)]})})))()}function jt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Mt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.line-chart.data`}),n=t.language,i=(0,X.useRef)(null),[a,o]=(0,X.useState)(`all`),c=(0,X.useMemo)(()=>[{name:e(`close`),data:$}],[e]),l=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),d=(0,X.useMemo)(()=>new Intl.DateTimeFormat(n,{year:`numeric`,month:`short`,day:`numeric`}),[n]),f=e=>{o(e);let t=Q-(Lt[e]-1)*Nt,n=$.filter(([e])=>e>=t).map(([,e])=>e),r=Math.min(...n),a=Math.max(...n),s=(a-r)*.08;i.current?.setView({x:[t,Q],y:[r-s,a+s]})};return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsx)(s,{"aria-label":e(`period`),direction:`horizontal`,value:a,onChange:e=>f(e),children:Object.keys(Lt).map(t=>(0,Z.jsx)(u,{value:t,label:e(`ranges.${t}`)},t))}),(0,Z.jsx)(g,{ref:i,series:c,area:!0,xAxis:{type:`time`,format:e=>d.format(e)},yAxis:{format:e=>l.format(e)},height:300,ariaLabel:e(`priceAria`)})]})}var X,Z,Nt,Q,Pt,Ft,$,It,Lt;function Rt(){return(Rt=e((()=>{X=t(),i(),c(),l(),h(),Z=n(),Nt=864e5,Q=new Date(2026,9,30).getTime(),Pt=730,Ft=jt(7),$=[],It=84;for(let e=729;e>=0;e--)It*=1+(Ft()-.48)*.035,$.push([Q-e*Nt,Math.round(It*100)/100]);Lt={"1m":30,"3m":91,"6m":182,"1y":365,all:Pt}})))()}var zt;function Bt(){return(Bt=e((()=>{zt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AreaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(3);
    const data: number[] = [];
    let used = 120;
    for (let day = 0; day < 60; day++) {
      used += random() * 12;
      data.push(Math.round(used));
    }
    return [{ name: t("storage"), data, opacity: 0.25 }];
  }, [t]);
  // "512 GB", "512 Go", ...
  const gigabytes = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "gigabyte" }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      area
      xAxis={{ title: t("day") }}
      yAxis={{ zero: true, format: (value) => gigabytes.format(value) }}
      height={280}
      ariaLabel={t("storageAria")}
    />
  );
}
`})))()}var Vt;function Ht(){return(Ht=e((()=>{Vt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

const thisWeek = [1200, 1350, 1280, 1490, 1610, 980, 870];
const lastWeek = [1100, 1180, 1250, 1300, 1420, 1010, 760];

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const days = weekdays(locale);
    return [
      {
        name: t("thisWeek"),
        data: days.map((day, i) => [day, thisWeek[i]] as const),
      },
      {
        name: t("lastWeek"),
        data: days.map((day, i) => [day, lastWeek[i]] as const),
      },
    ];
  }, [t, locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      yAxis={{ format: (value) => number.format(value) }}
      height={280}
      ariaLabel={t("visitorsAria")}
    />
  );
}
`})))()}var Ut;function Wt(){return(Wt=e((()=>{Ut=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartCurve,
  type ChartSeries,
} from "minerva-design/charts";

// Average monthly temperatures (°C), January to December
const lisbon = [
  11.6, 12.6, 14.9, 16.2, 18.8, 21.9, 23.6, 24.0, 22.6, 19.4, 15.3, 12.7,
];
const oslo = [
  -4.3, -4.0, -0.2, 4.5, 10.8, 15.2, 16.4, 15.2, 10.8, 5.0, 0.6, -3.2,
];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

const CURVES: ChartCurve[] = ["linear", "smooth", "step"];

export default function CurvesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [curve, setCurve] = useState<ChartCurve>("smooth");

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("lisbon"),
        data: months.map((m, i) => [m, lisbon[i]] as const),
      },
      { name: t("oslo"), data: months.map((m, i) => [m, oslo[i]] as const) },
    ];
  }, [t, locale]);
  // "12 °C" with the reader's decimal separator
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("curve")}
        direction="horizontal"
        value={curve}
        onChange={(value) => setCurve(value as ChartCurve)}
      >
        {CURVES.map((value) => (
          <Radio key={value} value={value} label={t(\`curves.\${value}\`)} />
        ))}
      </RadioGroup>
      <LineChart
        series={series}
        curve={curve}
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("temperatureAria")}
      />
    </div>
  );
}
`})))()}var Gt;function Kt(){return(Kt=e((()=>{Gt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

// Hourly temperatures (°C); \`null\` = no reading, the line is interrupted
const indoor = [
  20.8,
  20.6,
  20.4,
  20.3,
  20.1,
  20.0,
  20.4,
  21.0,
  21.6,
  21.9,
  null,
  null,
  null,
  22.8,
  23.0,
  23.1,
  22.9,
  22.6,
  22.3,
  22.0,
  21.7,
  21.4,
  21.2,
  21.0,
];
const outdoor = [
  9.1,
  8.7,
  8.2,
  7.9,
  7.6,
  7.4,
  8.0,
  9.3,
  11.2,
  13.0,
  14.6,
  15.9,
  16.8,
  17.4,
  17.6,
  17.2,
  null,
  null,
  14.1,
  12.8,
  11.7,
  10.9,
  10.2,
  9.6,
];
const hours = Array.from({ length: 24 }, (_, hour) => hour);

export default function GapsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // the time of day in the reader's language: "14:00", "2 PM"...
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 0, 1, hour));
    return [
      {
        name: t("indoor"),
        data: hours.map((hour) => [label(hour), indoor[hour]] as const),
      },
      {
        name: t("outdoor"),
        data: hours.map((hour) => [label(hour), outdoor[hour]] as const),
      },
    ];
  }, [t, locale]);
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        curve="smooth"
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("gapsAria")}
      />
      <p>{t("gapsNote")}</p>
    </div>
  );
}
`})))()}var qt;function Jt(){return(Jt=e((()=>{qt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
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

const MONTHS = 61; // January 2021 to January 2026
const month = (i: number) => new Date(2021, i, 1).getTime();

/** Monthly random walk rebased to 100 at the first month */
const rebased = (seed: number, drift: number, volatility: number) => {
  const random = mulberry32(seed);
  let level = 100;
  return Array.from({ length: MONTHS }, (_, i) => {
    if (i > 0) level *= 1 + drift + (random() - 0.5) * volatility;
    return [month(i), Math.round(level * 10) / 10] as const;
  });
};

const assets = {
  equities: rebased(3, 0.008, 0.09),
  bonds: rebased(8, -0.0005, 0.03),
  gold: rebased(12, 0.009, 0.07),
  realEstate: rebased(21, 0.002, 0.06),
};

export default function IndexTooltipDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = {
      equities: t("assets.equities"),
      bonds: t("assets.bonds"),
      gold: t("assets.gold"),
      realEstate: t("assets.realEstate"),
    };
    return (Object.keys(assets) as (keyof typeof assets)[]).map((key) => ({
      name: names[key],
      data: assets[key],
    }));
  }, [t]);
  const formats = useMemo(
    () => ({
      index: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      month: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
      }),
    }),
    [locale],
  );

  // every asset at the hovered month, best performer first
  const renderTooltip = (event: ChartHoverEvent) => {
    const items = [...event.items].sort((a, b) => b.y - a.y);
    return (
      <div style={{ display: "grid", gap: 4, minWidth: 200 }}>
        <strong>{formats.month.format(event.x)}</strong>
        {items.map((item, rank) => (
          <div
            key={item.seriesId}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.color,
              }}
            />
            <span style={{ fontWeight: rank === 0 ? 600 : undefined }}>
              {item.seriesName}
            </span>
            <span style={{ textAlign: "end" }}>
              {formats.index.format(item.y)}
            </span>
            <span
              style={{
                textAlign: "end",
                color:
                  item.y >= 100
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {formats.change.format(item.y / 100 - 1)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <LineChart
      series={series}
      renderTooltip={renderTooltip}
      crosshair
      annotations={[
        {
          type: "line",
          axis: "y",
          value: 100,
          dash: [4, 4],
          label: t("baseIndex"),
        },
      ]}
      xAxis={{ type: "time", format: (x) => formats.month.format(x) }}
      yAxis={{ format: (y) => formats.index.format(y) }}
      height={320}
      ariaLabel={t("assetsAria")}
    />
  );
}
`})))()}var Yt;function Xt(){return(Xt=e((()=>{Yt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartRendererKind,
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

const COUNT = 1_000_000;
const START = Date.UTC(2026, 0, 1);

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Columns of typed arrays: no per-point objects, sorted x (one sample per second)
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(2026);
    const x = new Float64Array(COUNT);
    const y = new Float64Array(COUNT);
    let value = 100;
    for (let i = 0; i < COUNT; i++) {
      value += (random() - 0.5) * 0.4;
      x[i] = START + i * 1000;
      y[i] = value;
    }
    return [{ name: t("sensor"), data: { x, y }, lineWidth: 1 }];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        xAxis={{ type: "time" }}
        onRendererChange={setRenderer}
        height={300}
        ariaLabel={t("sensorAria")}
      />
      <p role="status">
        {t("largeStatus", {
          points: new Intl.NumberFormat(i18n.language).format(COUNT),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var Zt;function Qt(){return(Qt=e((()=>{Zt=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import {
  LineChart,
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

const SECOND = 1000;
const WINDOW = 60; // one minute of readings
const ALARM = -15; // °C

/** Freezer temperature of reading \`i\`: sensor noise and a door opened every 45 s */
const reading = (i: number) => {
  const phase = i % 45;
  const door = phase < 12 ? 5.6 * Math.sin((phase / 12) * Math.PI) : 0;
  const noise = (mulberry32(i * 7919)() - 0.5) * 0.6;
  return Math.round((-18.6 + 0.4 * Math.sin(i / 7) + door + noise) * 10) / 10;
};

type Point = readonly [number, number];

/** The last minute of readings, ending now */
const initial = () => {
  const now = Math.floor(Date.now() / SECOND) * SECOND;
  const points: Point[] = Array.from({ length: WINDOW }, (_, i) => [
    now - (WINDOW - 1 - i) * SECOND,
    reading(i + 20),
  ]);
  return { tick: WINDOW + 20, points };
};

export default function LiveSensorDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [running, setRunning] = useState(true);
  const [feed, setFeed] = useState(initial);

  // one reading a second; the oldest one leaves the window
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setFeed(({ tick, points }) => {
        const last = points[points.length - 1]?.[0] ?? Date.now();
        return {
          tick: tick + 1,
          points: [...points.slice(1), [last + SECOND, reading(tick)]],
        };
      });
    }, SECOND);
    return () => clearInterval(timer);
  }, [running]);

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("freezer"), data: feed.points }],
    [t, feed.points],
  );
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: ALARM,
        color: "var(--danger-color)",
        opacity: 0.08,
      },
      {
        type: "line",
        axis: "y",
        value: ALARM,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("alarmLimit", { value: celsius.format(ALARM) }),
      },
    ],
    [t, celsius],
  );

  const [lastTime, lastValue] = feed.points[feed.points.length - 1] ?? [0, 0];
  const above = feed.points.filter(([, value]) => value > ALARM).length;
  const alarm = lastValue > ALARM;

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
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
        {/* only the state is announced, not every reading */}
        <output aria-live="polite">
          <Tag color={alarm ? "danger" : "success"} size="small">
            {alarm ? t("sensorAlarm") : t("sensorNormal")}
          </Tag>
        </output>
        <span style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
          {t("lastReading", {
            value: celsius.format(lastValue),
            time: time.format(lastTime),
          })}
          {" · "}
          {t("aboveLimit", { readings: above })}
        </span>
      </div>
      <LineChart
        series={series}
        annotations={annotations}
        curve="smooth"
        xAxis={{ type: "time", format: (value) => time.format(value) }}
        yAxis={{ min: -22, max: -10, format: (value) => celsius.format(value) }}
        legend={false}
        height={280}
        ariaLabel={t("freezerAria")}
      />
    </div>
  );
}
`})))()}var $t;function en(){return(en=e((()=>{$t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

/**
 * Bacteria (colony-forming units per mL) after \`hour\` hours: a lag phase,
 * then logistic growth from \`start\` up to the \`capacity\` of the medium
 */
const growth = (
  hour: number,
  start: number,
  capacity: number,
  rate: number,
  lag: number,
) =>
  hour <= lag
    ? start
    : capacity / (1 + (capacity / start - 1) * Math.exp(-rate * (hour - lag)));

const hours = Array.from({ length: 49 }, (_, i) => i / 2);
const strains = {
  wild: { capacity: 2e9, rate: 1.4, lag: 2 },
  mutant: { capacity: 6e8, rate: 0.9, lag: 3 },
  antibiotic: { capacity: 4e5, rate: 0.55, lag: 5 },
};
const START = 1e3;

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [log, setLog] = useState(true);

  const series = useMemo((): ChartSeries[] => {
    const names = {
      wild: t("strains.wild"),
      mutant: t("strains.mutant"),
      antibiotic: t("strains.antibiotic"),
    };
    return (Object.keys(strains) as (keyof typeof strains)[]).map((key) => {
      const { capacity, rate, lag } = strains[key];
      return {
        name: names[key],
        data: hours.map(
          (hour) => [hour, growth(hour, START, capacity, rate, lag)] as const,
        ),
      };
    });
  }, [t]);
  // "1E9", "1E3"...: the same notation on both scales
  const scientific = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        notation: "scientific",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const hourUnit = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "narrow",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: 3,
        x1: 12,
        color: "var(--primary-color)",
        opacity: 0.06,
        label: t("exponentialPhase"),
      },
    ],
    [t],
  );
  // doubling time of the wild type while it grows exponentially
  const doubling = (Math.LN2 / strains.wild.rate) * 60;
  const minutes = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
    maximumFractionDigits: 0,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={log} onChange={setLog} label={t("logScale")} />
      <LineChart
        series={series}
        annotations={annotations}
        curve="smooth"
        xAxis={{
          title: t("elapsed"),
          format: (value) => hourUnit.format(value),
        }}
        yAxis={{
          type: log ? "log" : "linear",
          title: t("cfu"),
          format: (value) => scientific.format(value),
        }}
        height={320}
        ariaLabel={t("growthAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {log
          ? t("logNote", { minutes: minutes.format(doubling) })
          : t("linearNote")}
      </p>
    </div>
  );
}
`})))()}var tn;function nn(){return(nn=e((()=>{tn=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  LineChart,
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
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 0, 1).getTime();

// Value of a portfolio (EUR) at the end of every day of 2026
const random = mulberry32(64);
let value = 250_000;
const portfolio = Array.from({ length: 300 }, (_, i) => {
  value *= 1 + (random() - 0.47) * 0.018 + Math.sin(i / 40) * 0.002;
  return [START + i * DAY, Math.round(value)] as const;
});

interface Pin {
  x: number;
  y: number;
}

export default function MeasureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  // up to two clicked points; a third click starts a new measurement
  const [pins, setPins] = useState<Pin[]>([]);

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("portfolio"), data: portfolio }],
    [t],
  );
  const formats = useMemo(
    () => ({
      eur: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      compact: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
      }),
      change: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
      date: new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    }),
    [locale],
  );

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setPins((current) => [
      ...(current.length >= 2 ? [] : current),
      { x: item.x, y: item.y },
    ]);
  };

  // the two pins in time order
  const [from, to] = [...pins].sort((a, b) => a.x - b.x);
  const rising = from && to ? to.y >= from.y : true;
  const annotations = useMemo((): ChartAnnotation[] => {
    const lines: ChartAnnotation[] = pins.map((pin) => ({
      type: "line",
      axis: "x",
      value: pin.x,
      color: "var(--primary-color)",
      dash: [4, 4],
      label: formats.date.format(pin.x),
    }));
    if (!from || !to) return lines;
    return [
      {
        type: "rect",
        x0: from.x,
        x1: to.x,
        color: rising ? "var(--success-color)" : "var(--danger-color)",
        opacity: 0.1,
      },
      ...lines,
    ];
  }, [pins, from, to, rising, formats]);

  let summary = t("measureHint");
  if (from && to) {
    summary = t("measureResult", {
      from: formats.date.format(from.x),
      to: formats.date.format(to.x),
      change: formats.change.format(to.y - from.y),
      percent: formats.percent.format(to.y / from.y - 1),
      days: formats.days.format(Math.round((to.x - from.x) / DAY)),
    });
  } else if (from) {
    summary = t("measureStart", {
      date: formats.date.format(from.x),
      value: formats.eur.format(from.y),
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <LineChart
        series={series}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setPins([])}
        tooltip={{ mode: "nearest" }}
        crosshair
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: (y) => formats.compact.format(y) }}
        legend={false}
        height={300}
        ariaLabel={t("portfolioAria")}
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
          disabled={pins.length === 0}
          onClick={() => setPins([])}
        >
          {t("clear")}
        </Button>
        <output
          aria-live="polite"
          style={{
            color:
              from && to
                ? rising
                  ? "var(--success-color)"
                  : "var(--danger-color)"
                : undefined,
          }}
        >
          {summary}
        </output>
      </div>
    </div>
  );
}
`})))()}var rn;function an(){return(an=e((()=>{rn=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
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
const START = new Date(2026, 10, 1).getTime();
const GUIDELINE = 15; // µg/m³, daily guideline of the World Health Organization
const MAX = 120; // one y range for every panel, so they compare at a glance

// Daily mean of fine particles (PM2.5) over 30 days in six cities
const cities = [
  { key: "delhi", base: 78, swing: 30 },
  { key: "beijing", base: 42, swing: 28 },
  { key: "paris", base: 14, swing: 8 },
  { key: "mexicoCity", base: 24, swing: 10 },
  { key: "tokyo", base: 10, swing: 5 },
  { key: "saoPaulo", base: 17, swing: 7 },
] as const;
const readings = cities.map(({ key, base, swing }, c) => {
  const random = mulberry32(100 + c);
  const data = Array.from({ length: 30 }, (_, i) => {
    const weather = Math.sin(i / 3.2 + c) * 0.6 + (random() - 0.5) * 0.8;
    const value = Math.max(3, base + swing * weather);
    return [START + i * DAY, Math.round(value)] as const;
  });
  return { key, data };
});

export default function SmallMultiplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const date = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const micrograms = useMemo(
    () => (value: number) => t("micrograms", { value: number.format(value) }),
    [t, number],
  );

  const panels = useMemo(
    () =>
      readings.map(({ key, data }) => {
        const name = t(\`cities.\${key}\`);
        // the unit in the tooltip, bare numbers on the small axes
        const series: ChartSeries[] = [
          { name, data, opacity: 0.18, format: micrograms },
        ];
        const above = data.filter(([, value]) => value > GUIDELINE).length;
        return { key, name, series, above };
      }),
    [t, micrograms],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: GUIDELINE,
        color: "var(--warning-color)",
        dash: [3, 3],
      },
    ],
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("guidelineNote", { value: micrograms(GUIDELINE) })}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {panels.map((panel) => (
          <figure key={panel.key} style={{ margin: 0, minWidth: 0 }}>
            <figcaption
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                fontSize: 13,
              }}
            >
              <strong>{panel.name}</strong>
              <span style={{ color: "var(--text-secondary-color)" }}>
                {t("daysAbove", { days: panel.above, total: 30 })}
              </span>
            </figcaption>
            <LineChart
              series={panel.series}
              area
              curve="smooth"
              annotations={annotations}
              interaction={false}
              legend={false}
              xAxis={{
                type: "time",
                tickCount: 3,
                format: (x) => date.format(x),
              }}
              yAxis={{
                min: 0,
                max: MAX,
                tickCount: 3,
                format: (y) => number.format(y),
              }}
              height={150}
              ariaLabel={t("pmAria", { city: panel.name })}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
`})))()}var on;function sn(){return(sn=e((()=>{on=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { LineChart, type ChartSeries } from "minerva-design/charts";

// Monthly cloud spend by service (USD), January to December
const spend = {
  compute: [
    18_400, 19_100, 20_600, 21_000, 22_800, 24_100, 23_500, 25_900, 27_200,
    28_000, 29_400, 31_800,
  ],
  storage: [
    6_200, 6_500, 6_900, 7_400, 7_800, 8_300, 8_900, 9_400, 9_800, 10_500,
    11_100, 11_900,
  ],
  network: [
    3_100, 2_900, 3_600, 4_200, 3_800, 4_600, 5_300, 4_900, 5_200, 5_800, 6_400,
    7_100,
  ],
  databases: [
    9_800, 9_900, 10_200, 10_100, 10_800, 11_200, 11_000, 11_600, 12_100,
    12_400, 12_300, 12_900,
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
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [mode, setMode] = useState("stacked");
  const percent = mode === "percent";

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    // full amounts in the tooltip, also in 100% mode
    const amount = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const names = {
      compute: t("services.compute"),
      storage: t("services.storage"),
      network: t("services.network"),
      databases: t("services.databases"),
    };
    return (Object.keys(spend) as (keyof typeof spend)[]).map((key) => ({
      name: names[key],
      format: (value: number) => amount.format(value),
      data: months.map((month, i) => [month, spend[key][i]] as const),
    }));
  }, [t, locale]);
  // "$32K", "32 k $US", "3.2万 US$"... depending on the language
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("stackMode")}
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(String(value))}
      >
        <Radio value="stacked" label={t("stacked")} />
        <Radio value="percent" label="100%" />
      </RadioGroup>
      <LineChart
        series={series}
        area
        stacked
        percent={percent}
        // a y format replaces the percent ticks: only set it for amounts
        yAxis={percent ? undefined : { format: (v) => usd.format(v) }}
        height={300}
        ariaLabel={t("spendAria")}
      />
    </div>
  );
}
`})))()}var cn;function ln(){return(ln=e((()=>{cn=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const MINUTE = 60 * 1000;
// 08:00 local time: the time axis places its ticks in local time
const START = new Date(2026, 9, 12, 8).getTime();
const TARGET = 300; // ms, p95 objective
const CRITICAL = 450; // ms

// API latency every 5 minutes over 6 hours, with an incident around 11:00
const latency = (base: number, spread: number) =>
  Array.from({ length: 72 }, (_, i) => {
    const incident = Math.max(0, 1 - Math.abs(i - 36) / 6);
    const noise = Math.sin(i * 1.3) * 0.08 + Math.cos(i * 0.7) * 0.05;
    return [
      START + i * 5 * MINUTE,
      Math.round(base * (1 + noise) + spread * incident),
    ] as const;
  });
const p50 = latency(120, 140);
const p95 = latency(240, 330);

export default function ThresholdsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("median"), data: p50 },
      { name: t("p95"), data: p95 },
    ],
    [t],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: CRITICAL,
        color: "var(--danger-color)",
        opacity: 0.1,
        label: t("critical"),
      },
      {
        type: "line",
        axis: "y",
        value: TARGET,
        color: "var(--warning-color)",
        dash: [6, 4],
        label: t("target", { value: ms.format(TARGET) }),
      },
    ],
    [t, ms],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      annotations={annotations}
      crosshair
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ min: 0, max: 700, format: (value) => ms.format(value) }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
`})))()}var un;function dn(){return(dn=e((()=>{un=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

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

export default function TimeSeriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(11);
    const daily = (base: number) =>
      Array.from({ length: 180 }, (_, i) => {
        const weekend = new Date(START + i * DAY).getDay() % 6 === 0;
        const trend = base * (1 + i / 300);
        const value = trend * (weekend ? 0.6 : 1) * (0.9 + random() * 0.2);
        return [new Date(START + i * DAY), Math.round(value)] as const;
      });
    return [
      { name: t("pageViews"), data: daily(42_000) },
      { name: t("sessions"), data: daily(18_000) },
    ];
  }, [t]);

  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  // "12 Mar", "3月12日", "12 mars"...: used by the ticks and the tooltip
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => compact.format(value) }}
      height={300}
      ariaLabel={t("trafficAria")}
    />
  );
}
`})))()}var fn;function pn(){return(pn=e((()=>{fn=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const DAY = 24 * 60 * 60 * 1000;
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 2, 1).getTime();
const LAUNCH = START + 34 * DAY;
const OUTAGE = [START + 61 * DAY, START + 64 * DAY] as const;

// Daily unique visitors over 90 days: weekly rhythm, a launch spike and an outage
const visitors = Array.from({ length: 90 }, (_, i) => {
  const time = START + i * DAY;
  const weekday = new Date(time).getDay();
  const weekly = weekday === 0 || weekday === 6 ? 0.7 : 1;
  const launch = i >= 34 ? 1.35 + 1.4 * Math.exp(-(i - 34) / 3) : 1;
  const outage = time >= OUTAGE[0] && time < OUTAGE[1] ? 0.35 : 1;
  const value = 8200 * weekly * launch * outage * (1 + Math.sin(i * 1.7) / 20);
  return [time, Math.round(value)] as const;
});

export default function TrafficEventsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("visitors"), data: visitors }],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "x",
        value: LAUNCH,
        color: "var(--success-color)",
        dash: [4, 4],
        label: t("launch"),
      },
      {
        type: "rect",
        x0: OUTAGE[0],
        x1: OUTAGE[1],
        color: "var(--danger-color)",
        opacity: 0.12,
        label: t("outage"),
        labelPosition: "top-right",
      },
    ],
    [t],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      annotations={annotations}
      area
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => number.format(value) }}
      height={300}
      ariaLabel={t("eventsAria")}
    />
  );
}
`})))()}var mn;function hn(){return(hn=e((()=>{mn=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartHandle,
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
// local midnight: the time axis places its ticks in local time
const END = new Date(2026, 9, 30).getTime();
const DAYS = 2 * 365;

// Two years of daily closing prices (a random walk with a slight upward drift)
const random = mulberry32(7);
const closes: [number, number][] = [];
let price = 84;
for (let i = DAYS - 1; i >= 0; i--) {
  price *= 1 + (random() - 0.48) * 0.035;
  closes.push([END - i * DAY, Math.round(price * 100) / 100]);
}

const RANGES = { "1m": 30, "3m": 91, "6m": 182, "1y": 365, all: DAYS } as const;
type Range = keyof typeof RANGES;

export default function ZoomDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [range, setRange] = useState<Range>("all");

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("close"), data: closes }],
    [t],
  );
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  const select = (next: Range) => {
    setRange(next);
    // the visible window, with the y range fitted to the prices inside it
    const from = END - (RANGES[next] - 1) * DAY;
    const visible = closes.filter(([time]) => time >= from).map(([, y]) => y);
    const low = Math.min(...visible);
    const high = Math.max(...visible);
    const margin = (high - low) * 0.08;
    chart.current?.setView({
      x: [from, END],
      y: [low - margin, high + margin],
    });
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={range}
        onChange={(value) => select(value as Range)}
      >
        {(Object.keys(RANGES) as Range[]).map((key) => (
          <Radio key={key} value={key} label={t(\`ranges.\${key}\`)} />
        ))}
      </RadioGroup>
      <LineChart
        ref={chart}
        series={series}
        area
        xAxis={{ type: "time", format: (value) => date.format(value) }}
        yAxis={{ format: (value) => usd.format(value) }}

        height={300}
        ariaLabel={t("priceAria")}
      />
    </div>
  );
}
`})))()}var gn,_n,vn;function yn(){return(yn=e((()=>{ce(),me(),be(),Te(),je(),Ie(),He(),qe(),$e(),ot(),lt(),yt(),Tt(),At(),Rt(),Bt(),Ht(),Wt(),Kt(),Jt(),Xt(),Qt(),en(),nn(),an(),sn(),ln(),dn(),pn(),hn(),t(),te(),re(),gn=n(),_n=m(Object.assign({"./demos/area.tsx":ae,"./demos/basic.tsx":le,"./demos/curves.tsx":he,"./demos/gaps.tsx":xe,"./demos/index-tooltip.tsx":De,"./demos/large-data.tsx":Ne,"./demos/live-sensor.tsx":Re,"./demos/log-scale.tsx":Ue,"./demos/measure.tsx":Ye,"./demos/small-multiples.tsx":tt,"./demos/stacked.tsx":st,"./demos/thresholds.tsx":ut,"./demos/time-series.tsx":xt,"./demos/traffic-events.tsx":Et,"./demos/zoom.tsx":Mt}),Object.assign({"./demos/area.tsx":zt,"./demos/basic.tsx":Vt,"./demos/curves.tsx":Ut,"./demos/gaps.tsx":Gt,"./demos/index-tooltip.tsx":qt,"./demos/large-data.tsx":Yt,"./demos/live-sensor.tsx":Zt,"./demos/log-scale.tsx":$t,"./demos/measure.tsx":tn,"./demos/small-multiples.tsx":rn,"./demos/stacked.tsx":on,"./demos/thresholds.tsx":cn,"./demos/time-series.tsx":un,"./demos/traffic-events.tsx":fn,"./demos/zoom.tsx":mn})),vn=()=>(0,gn.jsx)(ne,{id:`line-chart`,demos:_n})})))()}yn();export{vn as default};