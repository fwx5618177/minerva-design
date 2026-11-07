import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-DDU89y4T.js";import{R as a,z as o}from"./ProgressIndicator-Ve8Z1qBV.js";import{n as s,t as c}from"./Switch-DyiiEE7x.js";import{i as l,r as u}from"./Stack-9U3ZPLnH.js";import{i as d,o as f,t as p}from"./Select-Bx8KKx4S.js";import{h as m,p as h}from"./charts-BUBIiDTe.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-HJVoVnnH.js";function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,ae.useMemo)(()=>[...se.map(([t,n,r,i,a,o])=>({id:t,name:e(`works.${t}`),row:e(`crews.${n}`),group:e(`site.${r}`),start:i,end:a,dependencies:[...o]})),{id:`inspectFootings`,name:e(`works.inspectFootings`),row:e(`crews.inspector`),start:g(3,27),milestone:!0,dependencies:[`footings`]},{id:`inspectFrame`,name:e(`works.inspectFrame`),row:e(`crews.inspector`),start:g(5,12),milestone:!0,dependencies:[`frame2`,`deck`]}],[e]);return(0,oe.jsx)(m,{tasks:t,milestoneName:e(`inspections`),height:300,ariaLabel:e(`crewsAria`)})}var ae,oe,g,se;function ce(){return(ce=e((()=>{ae=t(),i(),h(),oe=n(),g=(e,t)=>new Date(2026,e-1,t),se=[[`clearing`,`excavation`,`groundwork`,g(3,2),g(3,6),[]],[`dig`,`excavation`,`groundwork`,g(3,9),g(3,16),[`clearing`]],[`rebar`,`steel`,`groundwork`,g(3,10),g(3,21),[]],[`footings`,`concrete`,`groundwork`,g(3,18),g(3,25),[`dig`]],[`backfill`,`excavation`,`groundwork`,g(3,30),g(4,7),[`footings`]],[`slab`,`concrete`,`structure`,g(4,1),g(4,10),[`inspectFootings`]],[`frame1`,`steel`,`structure`,g(4,13),g(4,24),[`slab`]],[`deck`,`concrete`,`structure`,g(4,27),g(5,5),[`frame1`]],[`frame2`,`steel`,`structure`,g(4,27),g(5,8),[`frame1`]]]})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),n=t.language,[i,a]=(0,_.useState)(!0),[o,s]=(0,_.useState)(null),l=(0,_.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`day`,unitDisplay:`long`});return t=>e.format(t)},[n]),u=(0,_.useMemo)(()=>[...S.map(t=>({id:t.key,name:e(`cpm.tasks.${t.key}`),start:y+t.start*b,end:y+(t.start+t.days)*b,...i?{group:t.slack===0?e(`cpm.critical`):e(`cpm.slack`)}:{},dependencies:[...t.after]})),{id:`goLive`,name:e(`cpm.tasks.goLive`),start:y+C*b,milestone:!0,dependencies:[`testRun`]}],[e,i]),d=new Intl.ListFormat(n,{type:`unit`}).format(S.filter(e=>e.slack===0).map(t=>e(`cpm.tasks.${t.key}`))),f=S.find(e=>e.key===o);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,v.jsx)(c,{checked:i,onChange:a,label:e(`cpm.highlight`)}),(0,v.jsx)(m,{tasks:u,colors:i?[`var(--danger-color, #dc2626)`,`var(--text-secondary-color, #64748b)`]:void 0,milestoneName:e(`milestones`),onPointClick:t=>{let n=S.find(n=>e(`cpm.tasks.${n.key}`)===t.xLabel);s(n?.key??null)},height:340,ariaLabel:e(`cpm.aria`)}),(0,v.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-muted-color)`},children:f?f.slack===0?e(`cpm.taskCritical`,{task:e(`cpm.tasks.${f.key}`)}):e(`cpm.taskSlack`,{task:e(`cpm.tasks.${f.key}`),slack:l(f.slack)}):e(`cpm.summary`,{days:l(C),path:d})})]})}var _,v,y,b,x,ue,S,C;function de(){return(de=e((()=>{_=t(),i(),s(),h(),v=n(),y=new Date(2026,1,2).getTime(),b=864e5,x=[[`lease`,5,[]],[`fitOut`,20,[`lease`]],[`racking`,8,[`fitOut`]],[`wms`,15,[`lease`]],[`hiring`,25,[`lease`]],[`training`,6,[`hiring`,`wms`]],[`testRun`,4,[`racking`,`training`]]],ue=()=>{let e=new Map;for(let[t,,n]of x)e.set(t,Math.max(0,...n.map(t=>e.get(t)+x.find(([e])=>e===t)[1])));let t=Math.max(...x.map(([t,n])=>e.get(t)+n)),n=new Map;for(let[e,r]of[...x].reverse()){let i=x.filter(([,,t])=>t.includes(e));n.set(e,Math.min(t,...i.map(([e])=>n.get(e)))-r)}return x.map(([t,r,i])=>({key:t,days:r,after:i,start:e.get(t),slack:n.get(t)-e.get(t)}))},S=ue(),C=Math.max(...S.map(e=>e.start+e.days))})))()}function fe(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,pe.useMemo)(()=>he.map(([t,n,r,i,a])=>({id:t,name:e(`daily.tasks.${t}`),row:e(`daily.lanes.${n}`),group:e(`daily.groups.${r}`),start:i,end:a,progress:ge[t]})),[e]);return(0,me.jsx)(m,{tasks:t,barLabels:`auto`,today:w(14,30),todayLabel:e(`daily.now`),legend:{position:`bottom`},height:260,ariaLabel:e(`daily.aria`)})}var pe,me,w,he,ge;function _e(){return(_e=e((()=>{pe=t(),i(),h(),me=n(),w=(e,t=0)=>new Date(2026,10,2,e,t),he=[[`standup`,`high`,`work`,w(9),w(9,30)],[`deepWork`,`high`,`work`,w(10),w(12)],[`exam`,`high`,`study`,w(16),w(17,30)],[`email`,`medium`,`work`,w(8),w(8,45)],[`review`,`medium`,`work`,w(13,30),w(15)],[`flashcards`,`medium`,`study`,w(20),w(21)],[`lunch`,`low`,`life`,w(12),w(13)],[`gym`,`low`,`life`,w(18),w(19,30)],[`reading`,`low`,`study`,w(21,15),w(22)]],ge={review:.6}})))()}function ve(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),[t,n]=(0,T.useState)(!0),i=(0,T.useMemo)(()=>[{name:e(`pipeline.kickoff`),start:D(9,1),milestone:!0},...ye.map(([t,n,r,i,a])=>({name:e(`pipeline.${t}`),group:e(`streams.${n}`),start:r,end:i,dependencies:a.map(t=>e(`pipeline.${t}`))})),{name:e(`pipeline.release`),start:D(11,9),milestone:!0,dependencies:[e(`pipeline.beta`),e(`pipeline.storeAssets`)]}],[e]);return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,E.jsx)(c,{checked:t,onChange:n,label:e(`showDependencies`)}),(0,E.jsx)(m,{tasks:i,dependencyArrows:t,milestoneName:e(`milestones`),height:380,ariaLabel:e(`pipelineAria`)})]})}var T,E,D,ye;function be(){return(be=e((()=>{T=t(),i(),s(),h(),E=n(),D=(e,t)=>new Date(2026,e-1,t),ye=[[`spec`,`product`,D(9,4),D(9,14),[`kickoff`]],[`api`,`backend`,D(9,11),D(10,2),[`spec`]],[`ui`,`mobile`,D(9,16),D(10,9),[`spec`]],[`integration`,`mobile`,D(10,5),D(10,20),[`api`,`ui`]],[`security`,`backend`,D(10,5),D(10,16),[`api`]],[`storeAssets`,`product`,D(10,12),D(10,23),[`ui`]],[`beta`,`mobile`,D(10,21),D(11,4),[`integration`,`security`]]]})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),n=t.language,[i,a]=(0,O.useState)(0),[s,c]=(0,O.useState)(!0),u=i>=N;(0,O.useEffect)(()=>{if(!s||u)return;let e=window.setInterval(()=>{a(e=>Math.min(N,e+1))},600);return()=>window.clearInterval(e)},[s,u]);let d=(0,O.useMemo)(()=>M.map(([t,n,r,a,o])=>({id:t,name:e(`deploy.stages.${t}`),group:e(`deploy.groups.${n}`),start:A+r*j,end:A+a*j,progress:Math.min(1,Math.max(0,(i-r)/(a-r))),dependencies:[...o]})),[e,i]),f=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`long`}).format(i),p=M.filter(([,,e,t])=>e<=i&&i<t).map(([t])=>e(`deploy.stages.${t}`));return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,k.jsx)(m,{tasks:d,today:A+i*j,todayLabel:e(`deploy.now`),progressName:e(`progress`),dependencyArrows:!1,yAxis:{min:A,max:A+N*j},interaction:!1,legend:{position:`bottom`},height:340,ariaLabel:e(`deploy.aria`)}),(0,k.jsxs)(l,{gap:12,wrap:!0,align:`center`,justify:`between`,children:[(0,k.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-muted-color)`},children:u?e(`deploy.done`,{elapsed:f}):e(`deploy.running`,{stages:new Intl.ListFormat(n).format(p),elapsed:f})}),(0,k.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>{u?(a(0),c(!0)):c(e=>!e)},children:e(u?`deploy.restart`:s?`deploy.pause`:`deploy.resume`)})]})]})}var O,k,A,j,M,N;function Se(){return(Se=e((()=>{O=t(),i(),a(),u(),h(),k=n(),A=new Date(2026,9,30,14,0).getTime(),j=6e4,M=[[`checkout`,`build`,0,1,[]],[`compile`,`build`,1,7,[`checkout`]],[`unit`,`test`,7,15,[`compile`]],[`lint`,`test`,7,10,[`compile`]],[`integration`,`test`,15,24,[`unit`,`lint`]],[`staging`,`release`,24,28,[`integration`]],[`smoke`,`test`,28,31,[`staging`]],[`canary`,`release`,31,37,[`smoke`]],[`production`,`release`,37,41,[`canary`]]],N=41})))()}function Ce(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,we.useMemo)(()=>[...Te.map(([t,n,r,i])=>({name:e(`release.${t}`),start:n,end:r,progress:i})),{name:e(`release.launch`),start:F(3,10),milestone:!0}],[e]);return(0,P.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:16,width:`100%`},children:Ee.map(({locale:n,key:r})=>(0,P.jsxs)(`figure`,{style:{margin:0,minWidth:0},children:[(0,P.jsx)(`figcaption`,{style:{marginBottom:4,fontSize:13,color:`var(--text-secondary-color)`},children:e(`locales.${r}`)}),(0,P.jsx)(m,{locale:n,tasks:t,yAxis:{timeZone:`utc`},legend:{position:`bottom`},height:260,ariaLabel:e(`localeAria`,{locale:e(`locales.${r}`)})})]},n))})}var we,P,F,Te,Ee;function De(){return(De=e((()=>{we=t(),i(),h(),P=n(),F=(e,t)=>Date.UTC(2026,e-1,t),Te=[[`specs`,F(1,5),F(1,16),1],[`build`,F(1,12),F(2,13),.7],[`translation`,F(2,2),F(2,20),.35],[`beta`,F(2,16),F(3,6),0]],Ee=[{locale:`zh-CN`,key:`chinese`},{locale:`fr-FR`,key:`french`}]})))()}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),n=t.language,i=(0,I.useMemo)(()=>[...je.map(([t,n,r,i])=>({name:e(`onboard.tasks.${t}`),group:e(`onboard.owners.${n}`),start:R(r),end:R(i)})),...Me.map(([t,n])=>({name:e(`onboard.tasks.${t}`),start:R(n),milestone:!0}))],[e]),a=(0,I.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`}),[n]),o=(e,t)=>{if(e===`gantt:milestones`)return i.filter(e=>e.milestone)[t];let n=e.slice(6);return i.filter(e=>!e.milestone&&e.group===n)[t]};return(0,L.jsx)(m,{tasks:i,today:z,todayLabel:e(`today`),milestoneName:e(`onboard.checkIns`),legend:{position:`bottom`},renderTooltip:t=>{let n=t.items[0],r=n&&o(n.seriesId,n.index);if(!r)return null;let i=Number(r.start),s=Number(r.end??r.start),c=s<z?`done`:i<=z?`inProgress`:`upcoming`;return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,L.jsx)(`strong`,{children:r.name}),r.group&&(0,L.jsx)(`span`,{children:e(`onboard.owner`,{owner:r.group})}),(0,L.jsx)(`span`,{children:r.milestone?a.format(i):a.formatRange(i,s)}),(0,L.jsx)(`span`,{style:{color:Ne[c]},children:e(`onboard.status.${c}`)})]})},height:380,ariaLabel:e(`onboard.aria`)})}var I,L,ke,Ae,R,z,je,Me,Ne;function Pe(){return(Pe=e((()=>{I=t(),i(),h(),L=n(),ke=new Date(2026,3,6).getTime(),Ae=864e5,R=e=>ke+e*Ae,z=R(9),je=[[`contract`,`hr`,-14,-10],[`laptop`,`it`,-7,-2],[`accounts`,`it`,-3,0],[`welcome`,`manager`,0,1],[`orientation`,`hr`,0,3],[`buddyLunch`,`buddy`,1,2],[`codebase`,`buddy`,1,10],[`firstTicket`,`manager`,3,12],[`training`,`hr`,7,21],[`firstProject`,`manager`,14,45]],Me=[[`firstDay`,0],[`checkIn30`,30],[`review60`,60]],Ne={done:`var(--success-color, #16a34a)`,inProgress:`var(--primary-color, #4f46e5)`,upcoming:`var(--text-muted-color, #64748b)`}})))()}function Fe(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,Ie.useMemo)(()=>Re.map(([t,n,r,i,a,o])=>n===null?{name:e(`tasks.${t}`),start:r,milestone:!0}:{name:e(`tasks.${t}`),group:e(`phases.${n}`),start:r,end:i??r,progress:a,dependencies:o.map(t=>e(`tasks.${t}`))}),[e]);return(0,Le.jsx)(m,{tasks:t,today:B(4,22),todayLabel:e(`today`),progressName:e(`progress`),milestoneName:e(`milestones`),height:420,ariaLabel:e(`projectAria`)})}var Ie,Le,B,Re;function ze(){return(ze=e((()=>{Ie=t(),i(),h(),Le=n(),B=(e,t)=>new Date(2026,e-1,t),Re=[[`research`,`discovery`,B(3,2),B(3,13),1,[]],[`interviews`,`discovery`,B(3,9),B(3,20),1,[]],[`kickoff`,null,B(3,23),null,0,[]],[`wireframes`,`design`,B(3,23),B(4,7),1,[`research`,`interviews`]],[`visualDesign`,`design`,B(4,1),B(4,24),.7,[`wireframes`]],[`designSystem`,`design`,B(4,13),B(5,8),.35,[`visualDesign`]],[`frontend`,`build`,B(4,20),B(5,29),.2,[`designSystem`]],[`backend`,`build`,B(4,13),B(5,22),.3,[`wireframes`]],[`contentMigration`,`build`,B(5,11),B(6,5),0,[`backend`]],[`qa`,`launch`,B(5,25),B(6,12),0,[`frontend`,`backend`]],[`launch`,null,B(6,15),null,0,[]]]})))()}function Be(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,V.useMemo)(()=>[...We.map(([t,n,r,i,a,o])=>({id:t,name:e(`train.features.${t}`),row:e(`train.teams.${n}`),group:e(`train.kinds.${r}`),start:U(i),end:U(a,11),progress:o})),...[1,3].map(t=>({id:`demo${t}`,name:e(`train.demo`,{n:(t+1)/2}),row:e(`train.events`),start:U(t,11),milestone:!0}))],[e]),n=(0,V.useMemo)(()=>[0,1,2,3,4].map(t=>({type:`rect`,y0:U(t).getTime(),y1:U(t+1).getTime(),color:t===4?`var(--warning-color, #f59e0b)`:`var(--text-secondary-color, #64748b)`,opacity:t===4?.12:t%2?0:.06,label:t===4?e(`train.ip`):e(`train.iteration`,{n:t+1}),labelPosition:`top-left`})),[e]);return(0,Ve.jsx)(m,{tasks:t,annotations:n,yAxis:{min:U(0).getTime(),max:U(5).getTime()},milestoneName:e(`train.demos`),progressName:e(`progress`),legend:{position:`bottom`},height:340,ariaLabel:e(`train.aria`)})}var V,Ve,He,H,Ue,U,We;function Ge(){return(Ge=e((()=>{V=t(),i(),h(),Ve=n(),He=new Date(2026,0,5).getTime(),H=864e5,Ue=14*H,U=(e,t=0)=>new Date(He+e*Ue+t*H),We=[[`checkout`,`atlas`,`feature`,0,1,1],[`paymentRetries`,`atlas`,`enabler`,2,2,.6],[`wallet`,`atlas`,`feature`,3,3,0],[`searchFilters`,`borealis`,`feature`,0,0,1],[`indexing`,`borealis`,`enabler`,1,2,.5],[`recommendations`,`borealis`,`feature`,3,3,0],[`observability`,`comet`,`enabler`,0,1,1],[`push`,`comet`,`feature`,2,3,.3]]})))()}function Ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),n=t.language,[i,a]=(0,W.useState)(`all`),[o,s]=(0,W.useState)(null),c=(0,W.useMemo)(()=>J.filter(([,e])=>i===`all`||e===i||e===`vacation`),[i]),l=(0,W.useMemo)(()=>c.map(([t,n,r,i])=>({name:e(`res.projects.${n}`),row:e(`res.people.${t}`),group:e(`res.projects.${n}`),start:K+r*q,end:K+i*q})),[e,c]),u=(0,W.useMemo)(()=>[...new Set(c.map(([,e])=>e))].map(e=>Xe[e]),[c]),d=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0});return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsxs)(f,{"aria-label":e(`res.projectLabel`),value:i,onChange:e=>a(e),style:{maxWidth:240},children:[(0,G.jsx)(p,{value:`all`,children:e(`res.all`)}),Ye.filter(e=>e!==`vacation`).map(t=>(0,G.jsx)(p,{value:t,children:e(`res.projects.${t}`)},t))]}),(0,G.jsx)(m,{tasks:l,colors:u,yAxis:{min:K,max:K+42*q},legend:{position:`bottom`},onHover:t=>{let n=Je.find(n=>e(`res.people.${n}`)===t?.xLabel);n&&s(n)},height:320,ariaLabel:e(`res.aria`)}),(0,G.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-muted-color)`},children:o?e(Y(o)>1?`res.overbooked`:`res.load`,{person:e(`res.people.${o}`),share:d.format(Y(o)),weeks:qe}):e(`res.hint`)})]})}var W,G,K,q,qe,Je,Ye,Xe,J,Y;function Ze(){return(Ze=e((()=>{W=t(),i(),d(),h(),G=n(),K=new Date(2026,2,2).getTime(),q=864e5,qe=6,Je=[`ana`,`ben`,`chen`,`dara`,`eli`],Ye=[`apollo`,`borealis`,`cassini`,`vacation`],Xe={apollo:`var(--chart-series-1, #4f46e5)`,borealis:`var(--chart-series-2, #10b981)`,cassini:`var(--chart-series-5, #0ea5e9)`,vacation:`var(--text-secondary-color, #64748b)`},J=[[`ana`,`apollo`,0,19],[`ana`,`borealis`,21,42],[`ben`,`apollo`,0,26],[`ben`,`cassini`,14,33],[`ben`,`vacation`,35,42],[`chen`,`borealis`,0,12],[`chen`,`vacation`,14,21],[`chen`,`cassini`,21,42],[`dara`,`cassini`,3,17],[`dara`,`apollo`,28,40],[`eli`,`borealis`,7,35]],Y=e=>J.filter(([t,n])=>t===e&&n!==`vacation`).reduce((e,[,,t,n])=>e+(n-t),0)/42})))()}function Qe(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,$e.useMemo)(()=>tt.map(([t,n,[r,i],[a,o]])=>({name:e(`roadmap.${t}`),group:e(`teams.${n}`),start:new Date(2026,r-1,i),end:new Date(2026,a-1,o)})),[e]);return(0,et.jsx)(m,{tasks:t,today:new Date(2026,5,15),todayLabel:e(`today`),yAxis:{min:new Date(2026,0,1).getTime(),max:new Date(2026,11,31).getTime()},legend:{position:`bottom`},height:360,ariaLabel:e(`roadmapAria`)})}var $e,et,tt;function nt(){return(nt=e((()=>{$e=t(),i(),h(),et=n(),tt=[[`mobileRedesign`,`mobile`,[1,5],[4,30]],[`offlineSync`,`mobile`,[5,4],[8,28]],[`widgets`,`mobile`,[9,1],[11,20]],[`searchV2`,`platform`,[1,12],[3,27]],[`multiRegion`,`platform`,[3,2],[7,31]],[`publicApi`,`platform`,[8,3],[12,18]],[`onboarding`,`growth`,[2,2],[4,10]],[`referrals`,`growth`,[4,20],[6,30]],[`pricingPage`,`growth`,[7,6],[9,25]]]})))()}function rt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),n=t.language,[i,a]=(0,X.useState)(null),o=(0,X.useMemo)(()=>$.map(([t,n,r,i,a])=>({name:e(`sprint.${t}`),group:e(`people.${n}`),start:r,end:i,progress:a})),[e]),s=(0,X.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`short`,day:`numeric`}),[n]);return(0,Z.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,width:`100%`},children:[(0,Z.jsx)(m,{tasks:o,today:Q(5,12),todayLabel:e(`today`),progressName:e(`progress`),legend:{position:`bottom`},onPointClick:t=>{let n=$.find(([n])=>e(`sprint.${n}`)===t.xLabel);if(!n)return;let[,r,i,o,c]=n;a(e(`taskStatus`,{task:t.xLabel,owner:e(`people.${r}`),start:s.format(i),end:s.format(o),progress:Math.round(c*100)}))},height:320,ariaLabel:e(`sprintAria`)}),(0,Z.jsx)(`div`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:i??e(`clickTask`)})]})}var X,Z,Q,$;function it(){return(it=e((()=>{X=t(),i(),h(),Z=n(),Q=(e,t=9)=>new Date(2026,5,e,t),$=[[`loginPage`,`ana`,Q(1),Q(3,18),1],[`passwordReset`,`ana`,Q(4),Q(5,18),.6],[`profileApi`,`ben`,Q(1),Q(4,18),1],[`avatarUpload`,`ben`,Q(5),Q(9,18),.25],[`emailTemplates`,`chen`,Q(2),Q(8,13),.5],[`notifications`,`chen`,Q(8,14),Q(12,18),0],[`e2eTests`,`dara`,Q(3),Q(11,18),.4]]})))()}var at;function ot(){return(ot=e((()=>{at=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Construction schedule by crew: one row per crew with several tasks in it,
// so the dependencies use task ids. The arrow from the dig to the footings
// crosses the busy steel row: it jogs through the gap between the rows
// instead of drawing over the rebar task.
const works = [
  ["clearing", "excavation", "groundwork", day(3, 2), day(3, 6), []],
  ["dig", "excavation", "groundwork", day(3, 9), day(3, 16), ["clearing"]],
  ["rebar", "steel", "groundwork", day(3, 10), day(3, 21), []],
  ["footings", "concrete", "groundwork", day(3, 18), day(3, 25), ["dig"]],
  ["backfill", "excavation", "groundwork", day(3, 30), day(4, 7), ["footings"]],
  ["slab", "concrete", "structure", day(4, 1), day(4, 10), ["inspectFootings"]],
  ["frame1", "steel", "structure", day(4, 13), day(4, 24), ["slab"]],
  ["deck", "concrete", "structure", day(4, 27), day(5, 5), ["frame1"]],
  ["frame2", "steel", "structure", day(4, 27), day(5, 8), ["frame1"]],
] as const;

export default function CrewsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] => [
      ...works.map(([id, crew, phase, start, end, after]) => ({
        id,
        name: t(\`works.\${id}\`),
        row: t(\`crews.\${crew}\`),
        group: t(\`site.\${phase}\`),
        start,
        end,
        dependencies: [...after],
      })),
      {
        id: "inspectFootings",
        name: t("works.inspectFootings"),
        row: t("crews.inspector"),
        start: day(3, 27),
        milestone: true,
        dependencies: ["footings"],
      },
      {
        id: "inspectFrame",
        name: t("works.inspectFrame"),
        row: t("crews.inspector"),
        start: day(5, 12),
        milestone: true,
        dependencies: ["frame2", "deck"],
      },
    ],
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      milestoneName={t("inspections")}
      height={300}
      ariaLabel={t("crewsAria")}
    />
  );
}
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const START = new Date(2026, 1, 2).getTime();
const DAY = 86_400_000;

// Opening of a warehouse: durations in days and what each task waits for
const ACTIVITIES = [
  ["lease", 5, []],
  ["fitOut", 20, ["lease"]],
  ["racking", 8, ["fitOut"]],
  ["wms", 15, ["lease"]],
  ["hiring", 25, ["lease"]],
  ["training", 6, ["hiring", "wms"]],
  ["testRun", 4, ["racking", "training"]],
] as const;
type Key = (typeof ACTIVITIES)[number][0];

// Critical path method: earliest starts forward, latest starts backward;
// the tasks without slack form the critical path
const schedule = () => {
  const early = new Map<Key, number>();
  for (const [key, , after] of ACTIVITIES) {
    early.set(
      key,
      Math.max(
        0,
        ...after.map(
          (k) => early.get(k)! + ACTIVITIES.find(([a]) => a === k)![1],
        ),
      ),
    );
  }
  const finish = Math.max(
    ...ACTIVITIES.map(([key, days]) => early.get(key)! + days),
  );
  const late = new Map<Key, number>();
  for (const [key, days] of [...ACTIVITIES].reverse()) {
    const next = ACTIVITIES.filter(([, , after]) =>
      (after as readonly Key[]).includes(key),
    );
    late.set(key, Math.min(finish, ...next.map(([k]) => late.get(k)!)) - days);
  }
  return ACTIVITIES.map(([key, days, after]) => ({
    key,
    days,
    after: after as readonly Key[],
    start: early.get(key)!,
    slack: late.get(key)! - early.get(key)!,
  }));
};
const PLAN = schedule();
const FINISH = Math.max(...PLAN.map((a) => a.start + a.days));

export default function CriticalPathDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [highlight, setHighlight] = useState(true);
  const [selected, setSelected] = useState<Key | null>(null);

  const days = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "day",
      unitDisplay: "long",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const tasks = useMemo(
    (): GanttTask[] => [
      ...PLAN.map((a) => ({
        id: a.key,
        name: t(\`cpm.tasks.\${a.key}\`),
        start: START + a.start * DAY,
        end: START + (a.start + a.days) * DAY,
        // the first task is critical: the critical group comes first
        ...(highlight
          ? { group: a.slack === 0 ? t("cpm.critical") : t("cpm.slack") }
          : {}),
        dependencies: [...a.after],
      })),
      {
        id: "goLive",
        name: t("cpm.tasks.goLive"),
        start: START + FINISH * DAY,
        milestone: true,
        dependencies: ["testRun"],
      },
    ],
    [t, highlight],
  );

  const path = new Intl.ListFormat(locale, { type: "unit" }).format(
    PLAN.filter((a) => a.slack === 0).map((a) => t(\`cpm.tasks.\${a.key}\`)),
  );
  const chosen = PLAN.find((a) => a.key === selected);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={highlight}
        onChange={setHighlight}
        label={t("cpm.highlight")}
      />
      <GanttChart
        tasks={tasks}
        colors={
          highlight
            ? [
                "var(--danger-color, #dc2626)",
                "var(--text-secondary-color, #64748b)",
              ]
            : undefined
        }

        milestoneName={t("milestones")}
        onPointClick={(event) => {
          const task = PLAN.find(
            (a) => t(\`cpm.tasks.\${a.key}\`) === event.xLabel,
          );
          setSelected(task?.key ?? null);
        }}
        height={340}
        ariaLabel={t("cpm.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {chosen
          ? chosen.slack === 0
            ? t("cpm.taskCritical", { task: t(\`cpm.tasks.\${chosen.key}\`) })
            : t("cpm.taskSlack", {
                task: t(\`cpm.tasks.\${chosen.key}\`),
                slack: days(chosen.slack),
              })
          : t("cpm.summary", { days: days(FINISH), path })}
      </output>
    </div>
  );
}
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const at = (hours: number, minutes = 0) =>
  new Date(2026, 10, 2, hours, minutes);

// A one-day schedule in priority lanes: several tasks share each row
// (\`row\`), the time axis switches to hours and minutes for an intra-day
// range, and \`today\` marks the current time. Tasks sharing a row get their
// name inside the bar (\`barLabels\`, "auto" by default); tasks without a
// \`progress\` are drawn solid, the one in progress shows what is left.
const plan = [
  ["standup", "high", "work", at(9), at(9, 30)],
  ["deepWork", "high", "work", at(10), at(12)],
  ["exam", "high", "study", at(16), at(17, 30)],
  ["email", "medium", "work", at(8), at(8, 45)],
  ["review", "medium", "work", at(13, 30), at(15)],
  ["flashcards", "medium", "study", at(20), at(21)],
  ["lunch", "low", "life", at(12), at(13)],
  ["gym", "low", "life", at(18), at(19, 30)],
  ["reading", "low", "study", at(21, 15), at(22)],
] as const;
const progress: Partial<Record<(typeof plan)[number][0], number>> = {
  review: 0.6,
};

export default function DailyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, lane, group, start, end]) => ({
        id: key,
        name: t(\`daily.tasks.\${key}\`),
        row: t(\`daily.lanes.\${lane}\`),
        group: t(\`daily.groups.\${group}\`),
        start,
        end,
        progress: progress[key],
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      barLabels="auto"
      today={at(14, 30)}
      todayLabel={t("daily.now")}
      legend={{ position: "bottom" }}
      height={260}
      ariaLabel={t("daily.aria")}
    />
  );
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Release of a mobile app: every task waits for the ones listed after it;
// the arrows go from the end of a task to the start of the next, and turn
// around when a task starts before the end of what it waits for
const plan = [
  ["spec", "product", day(9, 4), day(9, 14), ["kickoff"]],
  ["api", "backend", day(9, 11), day(10, 2), ["spec"]],
  ["ui", "mobile", day(9, 16), day(10, 9), ["spec"]],
  ["integration", "mobile", day(10, 5), day(10, 20), ["api", "ui"]],
  ["security", "backend", day(10, 5), day(10, 16), ["api"]],
  ["storeAssets", "product", day(10, 12), day(10, 23), ["ui"]],
  ["beta", "mobile", day(10, 21), day(11, 4), ["integration", "security"]],
] as const;

export default function DependenciesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const [arrows, setArrows] = useState(true);

  const tasks = useMemo(
    (): GanttTask[] => [
      { name: t("pipeline.kickoff"), start: day(9, 1), milestone: true },
      ...plan.map(([key, team, start, end, after]) => ({
        name: t(\`pipeline.\${key}\`),
        group: t(\`streams.\${team}\`),
        start,
        end,
        dependencies: after.map((task) => t(\`pipeline.\${task}\`)),
      })),
      {
        name: t("pipeline.release"),
        start: day(11, 9),
        milestone: true,
        dependencies: [t("pipeline.beta"), t("pipeline.storeAssets")],
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={arrows}
        onChange={setArrows}
        label={t("showDependencies")}
      />
      <GanttChart
        tasks={tasks}
        dependencyArrows={arrows}
        milestoneName={t("milestones")}
        height={380}
        ariaLabel={t("pipelineAria")}
      />
    </div>
  );
}
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// A deployment pipeline run: stages in minutes from the start of the run;
// the simulated clock moves one minute every 0.6 s
const RUN_START = new Date(2026, 9, 30, 14, 0).getTime();
const MINUTE = 60_000;
const STAGES = [
  ["checkout", "build", 0, 1, []],
  ["compile", "build", 1, 7, ["checkout"]],
  ["unit", "test", 7, 15, ["compile"]],
  ["lint", "test", 7, 10, ["compile"]],
  ["integration", "test", 15, 24, ["unit", "lint"]],
  ["staging", "release", 24, 28, ["integration"]],
  ["smoke", "test", 28, 31, ["staging"]],
  ["canary", "release", 31, 37, ["smoke"]],
  ["production", "release", 37, 41, ["canary"]],
] as const;
const END = 41;

export default function LiveDeployDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [minute, setMinute] = useState(0);
  const [running, setRunning] = useState(true);

  const done = minute >= END;

  useEffect(() => {
    if (!running || done) return;
    const timer = window.setInterval(() => {
      setMinute((m) => Math.min(END, m + 1));
    }, 600);
    return () => window.clearInterval(timer);
  }, [running, done]);

  // the progress of every stage follows the clock
  const tasks = useMemo(
    (): GanttTask[] =>
      STAGES.map(([key, group, from, to, after]) => ({
        id: key,
        name: t(\`deploy.stages.\${key}\`),
        group: t(\`deploy.groups.\${group}\`),
        start: RUN_START + from * MINUTE,
        end: RUN_START + to * MINUTE,
        progress: Math.min(1, Math.max(0, (minute - from) / (to - from))),
        dependencies: [...after],
      })),
    [t, minute],
  );

  const elapsed = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
  }).format(minute);
  const current = STAGES.filter(
    ([, , from, to]) => from <= minute && minute < to,
  ).map(([key]) => t(\`deploy.stages.\${key}\`));

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GanttChart
        tasks={tasks}
        today={RUN_START + minute * MINUTE}
        todayLabel={t("deploy.now")}
        progressName={t("progress")}
        dependencyArrows={false}
        yAxis={{ min: RUN_START, max: RUN_START + END * MINUTE }}
        interaction={false}
        legend={{ position: "bottom" }}
        height={340}
        ariaLabel={t("deploy.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
          {done
            ? t("deploy.done", { elapsed })
            : t("deploy.running", {
                stages: new Intl.ListFormat(locale).format(current),
                elapsed,
              })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => {
            if (done) {
              setMinute(0);
              setRunning(true);
            } else setRunning((r) => !r);
          }}
        >
          {done
            ? t("deploy.restart")
            : running
              ? t("deploy.pause")
              : t("deploy.resume")}
        </Button>
      </HStack>
    </div>
  );
}
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Release plan in UTC dates: \`yAxis.timeZone: "utc"\` aligns the ticks on
// UTC midnights wherever the reader is
const utc = (month: number, date: number) => Date.UTC(2026, month - 1, date);
const plan = [
  ["specs", utc(1, 5), utc(1, 16), 1],
  ["build", utc(1, 12), utc(2, 13), 0.7],
  ["translation", utc(2, 2), utc(2, 20), 0.35],
  ["beta", utc(2, 16), utc(3, 6), 0],
] as const;

const LOCALES = [
  { locale: "zh-CN", key: "chinese" },
  { locale: "fr-FR", key: "french" },
] as const;

export default function LocaleDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  // no group, progress or milestone names: the defaults of the locale
  const tasks = useMemo(
    (): GanttTask[] => [
      ...plan.map(([key, start, end, progress]) => ({
        name: t(\`release.\${key}\`),
        start,
        end,
        progress,
      })),
      { name: t("release.launch"), start: utc(3, 10), milestone: true },
    ],
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
          <GanttChart
            locale={locale}
            tasks={tasks}
            yAxis={{ timeZone: "utc" }}
            legend={{ position: "bottom" }}
            height={260}
            ariaLabel={t("localeAria", { locale: t(\`locales.\${key}\`) })}
          />
        </figure>
      ))}
    </div>
  );
}
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Onboarding plan of a new hire who starts on Monday, April 6: days relative
// to the first day, one color per owner, and the check-ins as milestones
const FIRST_DAY = new Date(2026, 3, 6).getTime();
const DAY = 86_400_000;
const day = (offset: number) => FIRST_DAY + offset * DAY;
const TODAY = day(9);

const STEPS = [
  ["contract", "hr", -14, -10],
  ["laptop", "it", -7, -2],
  ["accounts", "it", -3, 0],
  ["welcome", "manager", 0, 1],
  ["orientation", "hr", 0, 3],
  ["buddyLunch", "buddy", 1, 2],
  ["codebase", "buddy", 1, 10],
  ["firstTicket", "manager", 3, 12],
  ["training", "hr", 7, 21],
  ["firstProject", "manager", 14, 45],
] as const;
const CHECK_INS = [
  ["firstDay", 0],
  ["checkIn30", 30],
  ["review60", 60],
] as const;

type Status = "done" | "inProgress" | "upcoming";
const STATUS_COLORS: Record<Status, string> = {
  done: "var(--success-color, #16a34a)",
  inProgress: "var(--primary-color, #4f46e5)",
  upcoming: "var(--text-muted-color, #64748b)",
};

export default function OnboardingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;

  const tasks = useMemo(
    (): GanttTask[] => [
      ...STEPS.map(([key, owner, from, to]) => ({
        name: t(\`onboard.tasks.\${key}\`),
        group: t(\`onboard.owners.\${owner}\`),
        start: day(from),
        end: day(to),
      })),
      ...CHECK_INS.map(([key, offset]) => ({
        name: t(\`onboard.tasks.\${key}\`),
        start: day(offset),
        milestone: true,
      })),
    ],
    [t],
  );
  const dates = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );

  // the bars of a group are its tasks in order; the milestones are a series
  const taskOf = (seriesId: string, index: number) => {
    if (seriesId === "gantt:milestones")
      return tasks.filter((task) => task.milestone)[index];
    const group = seriesId.slice("gantt:".length);
    return tasks.filter((task) => !task.milestone && task.group === group)[
      index
    ];
  };

  return (
    <GanttChart
      tasks={tasks}
      today={TODAY}
      todayLabel={t("today")}
      milestoneName={t("onboard.checkIns")}
      legend={{ position: "bottom" }}
      renderTooltip={(event) => {
        const item = event.items[0];
        const task = item && taskOf(item.seriesId, item.index);
        if (!task) return null;
        const start = Number(task.start);
        const end = Number(task.end ?? task.start);
        const status: Status =
          end < TODAY ? "done" : start <= TODAY ? "inProgress" : "upcoming";
        return (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{task.name}</strong>
            {task.group && (
              <span>{t("onboard.owner", { owner: task.group })}</span>
            )}
            <span>
              {task.milestone
                ? dates.format(start)
                : dates.formatRange(start, end)}
            </span>
            <span style={{ color: STATUS_COLORS[status] }}>
              {t(\`onboard.status.\${status}\`)}
            </span>
          </div>
        );
      }}
      height={380}
      ariaLabel={t("onboard.aria")}
    />
  );
}
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Relaunch of a website: phases, tasks with their progress, what they wait
// for, and milestones
const plan = [
  ["research", "discovery", day(3, 2), day(3, 13), 1, []],
  ["interviews", "discovery", day(3, 9), day(3, 20), 1, []],
  ["kickoff", null, day(3, 23), null, 0, []],
  [
    "wireframes",
    "design",
    day(3, 23),
    day(4, 7),
    1,
    ["research", "interviews"],
  ],
  ["visualDesign", "design", day(4, 1), day(4, 24), 0.7, ["wireframes"]],
  ["designSystem", "design", day(4, 13), day(5, 8), 0.35, ["visualDesign"]],
  ["frontend", "build", day(4, 20), day(5, 29), 0.2, ["designSystem"]],
  ["backend", "build", day(4, 13), day(5, 22), 0.3, ["wireframes"]],
  ["contentMigration", "build", day(5, 11), day(6, 5), 0, ["backend"]],
  ["qa", "launch", day(5, 25), day(6, 12), 0, ["frontend", "backend"]],
  ["launch", null, day(6, 15), null, 0, []],
] as const;

export default function ProjectDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, phase, start, end, progress, after]) =>
        phase === null
          ? { name: t(\`tasks.\${key}\`), start, milestone: true }
          : {
              name: t(\`tasks.\${key}\`),
              group: t(\`phases.\${phase}\`),
              start,
              end: end ?? start,
              progress,
              // listed in the tooltip, drawn as arrows from their ends
              dependencies: after.map((task) => t(\`tasks.\${task}\`)),
            },
      ),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      today={day(4, 22)}
      todayLabel={t("today")}
      progressName={t("progress")}
      milestoneName={t("milestones")}
      height={420}
      ariaLabel={t("projectAria")}
    />
  );
}
`})))()}var xt;function St(){return(St=e((()=>{xt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  GanttChart,
  type ChartAnnotation,
  type GanttTask,
} from "minerva-design/charts";

// A program increment of an agile release train: four two-week iterations
// and an innovation & planning (IP) iteration, one row per team
const PI_START = new Date(2026, 0, 5).getTime();
const DAY = 86_400_000;
const ITERATION = 14 * DAY;
const at = (iteration: number, day = 0) =>
  new Date(PI_START + iteration * ITERATION + day * DAY);

// [feature, team, kind, first iteration, last iteration, progress]
const FEATURES = [
  ["checkout", "atlas", "feature", 0, 1, 1],
  ["paymentRetries", "atlas", "enabler", 2, 2, 0.6],
  ["wallet", "atlas", "feature", 3, 3, 0],
  ["searchFilters", "borealis", "feature", 0, 0, 1],
  ["indexing", "borealis", "enabler", 1, 2, 0.5],
  ["recommendations", "borealis", "feature", 3, 3, 0],
  ["observability", "comet", "enabler", 0, 1, 1],
  ["push", "comet", "feature", 2, 3, 0.3],
] as const;

export default function ReleaseTrainDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] => [
      ...FEATURES.map(([key, team, kind, first, last, progress]) => ({
        id: key,
        name: t(\`train.features.\${key}\`),
        row: t(\`train.teams.\${team}\`),
        group: t(\`train.kinds.\${kind}\`),
        start: at(first),
        // features end on the Friday of their last iteration
        end: at(last, 11),
        progress,
      })),
      ...[1, 3].map((iteration) => ({
        id: \`demo\${iteration}\`,
        name: t("train.demo", { n: (iteration + 1) / 2 }),
        row: t("train.events"),
        start: at(iteration, 11),
        milestone: true,
      })),
    ],
    [t],
  );

  // shaded iterations, the IP iteration tinted: background areas along
  // the time axis
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      [0, 1, 2, 3, 4].map((i) => ({
        type: "rect",
        y0: at(i).getTime(),
        y1: at(i + 1).getTime(),
        color:
          i === 4
            ? "var(--warning-color, #f59e0b)"
            : "var(--text-secondary-color, #64748b)",
        opacity: i === 4 ? 0.12 : i % 2 ? 0 : 0.06,
        label: i === 4 ? t("train.ip") : t("train.iteration", { n: i + 1 }),
        labelPosition: "top-left",
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      annotations={annotations}
      yAxis={{ min: at(0).getTime(), max: at(5).getTime() }}
      milestoneName={t("train.demos")}
      progressName={t("progress")}
      legend={{ position: "bottom" }}
      height={340}
      ariaLabel={t("train.aria")}
    />
  );
}
`})))()}var Ct;function wt(){return(wt=e((()=>{Ct=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const START = new Date(2026, 2, 2).getTime();
const DAY = 86_400_000;
const WEEKS = 6;

type Person = "ana" | "ben" | "chen" | "dara" | "eli";
type Project = "apollo" | "borealis" | "cassini" | "vacation";
const PEOPLE: Person[] = ["ana", "ben", "chen", "dara", "eli"];
const PROJECTS: Project[] = ["apollo", "borealis", "cassini", "vacation"];
const COLORS: Record<Project, string> = {
  apollo: "var(--chart-series-1, #4f46e5)",
  borealis: "var(--chart-series-2, #10b981)",
  cassini: "var(--chart-series-5, #0ea5e9)",
  vacation: "var(--text-secondary-color, #64748b)",
};

// Resource plan of six weeks: [person, project, first day, last day + 1]
const BOOKINGS: [Person, Project, number, number][] = [
  ["ana", "apollo", 0, 19],
  ["ana", "borealis", 21, 42],
  ["ben", "apollo", 0, 26],
  ["ben", "cassini", 14, 33],
  ["ben", "vacation", 35, 42],
  ["chen", "borealis", 0, 12],
  ["chen", "vacation", 14, 21],
  ["chen", "cassini", 21, 42],
  ["dara", "cassini", 3, 17],
  ["dara", "apollo", 28, 40],
  ["eli", "borealis", 7, 35],
];

// booked days over the window, overlapping bookings counted twice
const load = (person: Person) =>
  BOOKINGS.filter(
    ([p, project]) => p === person && project !== "vacation",
  ).reduce((sum, [, , from, to]) => sum + (to - from), 0) /
  (WEEKS * 7);

export default function ResourcesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [project, setProject] = useState<"all" | Project>("all");
  const [hovered, setHovered] = useState<Person | null>(null);

  const visible = useMemo(
    () =>
      BOOKINGS.filter(
        ([, p]) => project === "all" || p === project || p === "vacation",
      ),
    [project],
  );
  const tasks = useMemo(
    (): GanttTask[] =>
      visible.map(([person, p, from, to]) => ({
        name: t(\`res.projects.\${p}\`),
        row: t(\`res.people.\${person}\`),
        group: t(\`res.projects.\${p}\`),
        start: START + from * DAY,
        end: START + to * DAY,
      })),
    [t, visible],
  );
  // group colors in order of appearance, so that a project keeps its color
  const colors = useMemo(
    () => [...new Set(visible.map(([, p]) => p))].map((p) => COLORS[p]),
    [visible],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        aria-label={t("res.projectLabel")}
        value={project}
        onChange={(value) => setProject(value as "all" | Project)}
        style={{ maxWidth: 240 }}
      >
        <SelectItem value="all">{t("res.all")}</SelectItem>
        {PROJECTS.filter((p) => p !== "vacation").map((p) => (
          <SelectItem key={p} value={p}>
            {t(\`res.projects.\${p}\`)}
          </SelectItem>
        ))}
      </Select>
      <GanttChart
        tasks={tasks}
        colors={colors}
        yAxis={{ min: START, max: START + WEEKS * 7 * DAY }}
        legend={{ position: "bottom" }}
        onHover={(event) => {
          const person = PEOPLE.find(
            (p) => t(\`res.people.\${p}\`) === event?.xLabel,
          );
          if (person) setHovered(person);
        }}
        height={320}
        ariaLabel={t("res.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {hovered
          ? t(load(hovered) > 1 ? "res.overbooked" : "res.load", {
              person: t(\`res.people.\${hovered}\`),
              share: percent.format(load(hovered)),
              weeks: WEEKS,
            })
          : t("res.hint")}
      </output>
    </div>
  );
}
`})))()}var Tt;function Et(){return(Et=e((()=>{Tt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Product roadmap of 2026 by team; zoom along the time with Ctrl / ⌘ + wheel
// (or a pinch) and drag to pan
const items = [
  ["mobileRedesign", "mobile", [1, 5], [4, 30]],
  ["offlineSync", "mobile", [5, 4], [8, 28]],
  ["widgets", "mobile", [9, 1], [11, 20]],
  ["searchV2", "platform", [1, 12], [3, 27]],
  ["multiRegion", "platform", [3, 2], [7, 31]],
  ["publicApi", "platform", [8, 3], [12, 18]],
  ["onboarding", "growth", [2, 2], [4, 10]],
  ["referrals", "growth", [4, 20], [6, 30]],
  ["pricingPage", "growth", [7, 6], [9, 25]],
] as const;

export default function RoadmapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      items.map(([key, team, [m0, d0], [m1, d1]]) => ({
        name: t(\`roadmap.\${key}\`),
        group: t(\`teams.\${team}\`),
        start: new Date(2026, m0 - 1, d0),
        end: new Date(2026, m1 - 1, d1),
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      today={new Date(2026, 5, 15)}
      todayLabel={t("today")}
      yAxis={{
        min: new Date(2026, 0, 1).getTime(),
        max: new Date(2026, 11, 31).getTime(),
      }}
      legend={{ position: "bottom" }}
      height={360}
      ariaLabel={t("roadmapAria")}
    />
  );
}
`})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (date: number, hour = 9) => new Date(2026, 5, date, hour);

// Two-week sprint: one color per developer, click a task for its details
const sprint = [
  ["loginPage", "ana", day(1), day(3, 18), 1],
  ["passwordReset", "ana", day(4), day(5, 18), 0.6],
  ["profileApi", "ben", day(1), day(4, 18), 1],
  ["avatarUpload", "ben", day(5), day(9, 18), 0.25],
  ["emailTemplates", "chen", day(2), day(8, 13), 0.5],
  ["notifications", "chen", day(8, 14), day(12, 18), 0],
  ["e2eTests", "dara", day(3), day(11, 18), 0.4],
] as const;

export default function SprintDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<string | null>(null);

  const tasks = useMemo(
    (): GanttTask[] =>
      sprint.map(([key, dev, start, end, progress]) => ({
        name: t(\`sprint.\${key}\`),
        group: t(\`people.\${dev}\`),
        start,
        end,
        progress,
      })),
    [t],
  );
  const dates = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric" }),
    [locale],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <GanttChart
        tasks={tasks}
        today={day(5, 12)}
        todayLabel={t("today")}
        progressName={t("progress")}
        legend={{ position: "bottom" }}
        onPointClick={(event) => {
          const task = sprint.find(
            ([key]) => t(\`sprint.\${key}\`) === event.xLabel,
          );
          if (!task) return;
          const [, dev, start, end, progress] = task;
          setSelected(
            t("taskStatus", {
              task: event.xLabel,
              owner: t(\`people.\${dev}\`),
              start: dates.format(start),
              end: dates.format(end),
              progress: Math.round(progress * 100),
            }),
          );
        }}
        height={320}
        ariaLabel={t("sprintAria")}
      />
      <div role="status" style={{ color: "var(--text-secondary-color)" }}>
        {selected ?? t("clickTask")}
      </div>
    </div>
  );
}
`})))()}var kt,At,jt;function Mt(){return(Mt=e((()=>{ce(),de(),_e(),be(),Se(),De(),Pe(),ze(),Ge(),Ze(),nt(),it(),ot(),ct(),ut(),ft(),mt(),gt(),vt(),bt(),St(),wt(),Et(),Ot(),t(),te(),re(),kt=n(),At=ee(Object.assign({"./demos/crews.tsx":ie,"./demos/critical-path.tsx":le,"./demos/daily.tsx":fe,"./demos/dependencies.tsx":ve,"./demos/live-deploy.tsx":xe,"./demos/locale.tsx":Ce,"./demos/onboarding.tsx":Oe,"./demos/project.tsx":Fe,"./demos/release-train.tsx":Be,"./demos/resources.tsx":Ke,"./demos/roadmap.tsx":Qe,"./demos/sprint.tsx":rt}),Object.assign({"./demos/crews.tsx":at,"./demos/critical-path.tsx":st,"./demos/daily.tsx":lt,"./demos/dependencies.tsx":dt,"./demos/live-deploy.tsx":pt,"./demos/locale.tsx":ht,"./demos/onboarding.tsx":_t,"./demos/project.tsx":yt,"./demos/release-train.tsx":xt,"./demos/resources.tsx":Ct,"./demos/roadmap.tsx":Tt,"./demos/sprint.tsx":Dt})),jt=()=>(0,kt.jsx)(ne,{id:`gantt-chart`,demos:At})})))()}Mt();export{jt as default};