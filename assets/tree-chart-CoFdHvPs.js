import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{n as s,t as c}from"./Input-LfOOMgLE.js";import{i as l,n as u,r as d,t as f}from"./Radio-L-_0EAus.js";import{n as p,t as m}from"./Tag-D6SUzaZT.js";import{i as h,r as g}from"./Stack-B3Kr9X_e.js";import{i as ee,r as _}from"./DemoBlock-CrPVu7R1.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-BdPOW9nQ.js";import{n as v,t as y}from"./graph-DD7vHvPa.js";function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),[n,i]=(0,b.useState)(2026),[a,s]=(0,b.useState)(0),c=(0,b.useMemo)(()=>le(n),[n]),l=(0,b.useMemo)(()=>new Intl.DisplayNames(t.language,{type:`region`}),[t.language]),u=(0,b.useMemo)(()=>new Intl.NumberFormat(t.language),[t.language]),d=e=>l.of(e)??e,f=(0,b.useMemo)(()=>{let t=e=>w.indexOf(e)<a,n=e=>l.of(e)??e,r=new Set(C.filter(([,e])=>t(e)).map(([e])=>c.get(e).loser));return[...C.map(([r,i])=>{let a=c.get(r);return t(i)?{id:r,label:n(a.winner),subtitle:e(`score`,{winner:u.format(a.goals[0]),loser:u.format(a.goals[1])}),group:i===`final`?`champion`:`played`}:{id:r,label:e(`rounds.${i}`),subtitle:e(`tbd`),group:`pending`}}),...S.map(([t,i])=>({id:t,label:n(t),subtitle:e(`seed`,{n:i}),group:r.has(t)?`out`:`alive`}))]},[e,c,a,l,u]),p=(0,b.useMemo)(()=>C.flatMap(([e,,t,n])=>[{source:e,target:t},{source:e,target:n}]),[]),m=(0,b.useMemo)(()=>se.map(t=>({id:t,name:e(`bracketStates.${t}`),color:ce[t]})),[e]),g=a>0?w[a-1]:null,ee=new Intl.ListFormat(t.language);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsxs)(h,{gap:8,wrap:!0,children:[(0,x.jsx)(o,{size:`small`,disabled:a===w.length,onClick:()=>s(a+1),children:e(`nextRound`)}),(0,x.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>s(0),children:e(`restart`)}),(0,x.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>{i(n+1),s(0)},children:e(`newSimulation`)})]}),(0,x.jsx)(y,{nodes:f,edges:p,groups:m,layout:`tree`,direction:`RL`,nodeShape:`box`,edgeStyle:`orthogonal`,tree:{collapsible:!1},height:440,ariaLabel:e(`bracketAria`)}),(0,x.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:g===`final`?e(`championResult`,{team:d(c.get(`final`).winner)}):g?e(`roundResult`,{round:e(`rounds.${g}`),teams:ee.format(C.filter(([,e])=>e===g).map(([e])=>d(c.get(e).winner)))}):e(`bracketHint`)})]})}var b,x,oe,S,C,w,T,se,ce,le;function ue(){return(ue=e((()=>{b=t(),i(),a(),g(),v(),x=n(),oe=e=>()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},S=[[`AR`,1,92],[`MA`,8,78],[`ES`,4,85],[`NL`,5,83],[`FR`,2,90],[`JP`,7,79],[`BR`,3,88],[`DE`,6,82]],C=[[`qf0`,`quarterFinal`,`AR`,`MA`],[`qf1`,`quarterFinal`,`ES`,`NL`],[`qf2`,`quarterFinal`,`FR`,`JP`],[`qf3`,`quarterFinal`,`BR`,`DE`],[`sf0`,`semiFinal`,`qf0`,`qf1`],[`sf1`,`semiFinal`,`qf2`,`qf3`],[`final`,`final`,`sf0`,`sf1`]],w=[`quarterFinal`,`semiFinal`,`final`],T=new Map(S.map(([e,,t])=>[e,t])),se=[`pending`,`played`,`alive`,`out`,`champion`],ce={pending:`var(--text-secondary-color, #9ca3af)`,played:`var(--primary-color, #4f46e5)`,alive:`var(--success-color, #16a34a)`,out:`var(--danger-color, #dc2626)`,champion:`var(--warning-color, #d97706)`},le=e=>{let t=oe(e),n=new Map,r=e=>n.get(e)?.winner??e;for(let[e,,i,a]of C){let[o,s]=[r(i),r(a)],c=T.get(o)/(T.get(o)+T.get(s)),l=t()<c,u=Math.floor(t()*3),d=u+1+Math.floor(t()*2);n.set(e,{winner:l?o:s,loser:l?s:o,goals:[d,u]})}return n}})))()}function de(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),[t,n]=(0,E.useState)({credit:`fair`,income:`yes`,debt:`yes`,employment:`yes`}),i=he(t),a=i[i.length-1],o=(0,E.useMemo)(()=>fe.map(([t,n,r])=>({id:t,label:e(`decision.${r}`),group:n})),[e]),s=(0,E.useMemo)(()=>O.map(([t,n,r])=>({source:t,target:n,label:e(`branches.${r}`)})),[e]),c=(0,E.useMemo)(()=>pe.map(t=>({id:t,name:e(`decisionKinds.${t}`),color:me[t]})),[e]),u=(e,r)=>n({...t,[e]:r});return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,D.jsxs)(h,{gap:16,wrap:!0,align:`center`,children:[(0,D.jsxs)(h,{gap:8,align:`center`,children:[(0,D.jsx)(`span`,{children:e(`decision.credit`)}),(0,D.jsx)(l,{"aria-label":e(`decision.credit`),direction:`horizontal`,value:t.credit,onChange:e=>u(`credit`,e),children:Object.keys(k).map(t=>(0,D.jsx)(f,{value:t,label:e(`branches.${k[t]}`)},t))})]}),[`income`,`debt`,`employment`].map(n=>(0,D.jsxs)(h,{gap:8,align:`center`,children:[(0,D.jsx)(`span`,{children:e(`decision.${n}`)}),(0,D.jsxs)(l,{"aria-label":e(`decision.${n}`),direction:`horizontal`,value:t[n],onChange:e=>u(n,e),children:[(0,D.jsx)(f,{value:`yes`,label:e(`branches.yes`)}),(0,D.jsx)(f,{value:`no`,label:e(`branches.no`)})]})]},n))]}),(0,D.jsx)(y,{nodes:o,edges:s,groups:c,layout:`org`,tree:{collapsible:!1,compact:!1,cardSize:[150,52]},edgeLabels:!0,highlight:`lineage`,selected:[a],interaction:{select:!1},height:460,ariaLabel:e(`decisionAria`)}),(0,D.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`decisionResult`,{outcome:e(`decision.${fe.find(([e])=>e===a)[2]}`),questions:i.length-1})})]})}var E,D,fe,O,k,pe,me,he;function ge(){return(ge=e((()=>{E=t(),i(),g(),u(),d(),v(),D=n(),fe=[[`credit`,`question`,`credit`],[`income`,`question`,`income`],[`employment`,`question`,`employment`],[`debtA`,`question`,`debt`],[`debtB`,`question`,`debt`],[`approve`,`approved`,`approved`],[`approveLower`,`approved`,`approvedLower`],[`approveRate`,`approved`,`approvedRate`],[`reviewA`,`review`,`review`],[`reviewB`,`review`,`review`],[`declineA`,`declined`,`declined`],[`declineB`,`declined`,`declined`]],O=[[`credit`,`income`,`creditHigh`],[`credit`,`employment`,`creditFair`],[`credit`,`declineB`,`creditPoor`],[`income`,`approve`,`yes`],[`income`,`debtA`,`no`],[`debtA`,`approveLower`,`yes`],[`debtA`,`reviewA`,`no`],[`employment`,`debtB`,`yes`],[`employment`,`reviewB`,`no`],[`debtB`,`approveRate`,`yes`],[`debtB`,`declineA`,`no`]],k={high:`creditHigh`,fair:`creditFair`,poor:`creditPoor`},pe=[`question`,`approved`,`review`,`declined`],me={question:`var(--chart-series-1, #4f46e5)`,approved:`var(--success-color, #16a34a)`,review:`var(--warning-color, #d97706)`,declined:`var(--danger-color, #dc2626)`},he=e=>{let t={credit:k[e.credit],income:e.income,debtA:e.debt,debtB:e.debt,employment:e.employment},n=[`credit`];for(;;){let e=n[n.length-1],r=O.find(([n,,r])=>n===e&&r===t[e]);if(!r)return n;n.push(r[1])}}})))()}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),[n,i]=(0,A.useState)(`tree`),[a,o]=(0,A.useState)(`/Users/alex/Pictures`),s=(0,A.useMemo)(()=>{let e=[`byte`,`kilobyte`,`megabyte`,`gigabyte`].map(e=>new Intl.NumberFormat(t.language,{style:`unit`,unit:e,unitDisplay:`short`,maximumFractionDigits:1}));return t=>{let n=Math.min(3,Math.max(0,Math.floor(Math.log10(Math.max(t,1))/3)));return e[n].format(t/1e3**n)}},[t.language]),c=(0,A.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}),[t.language]),u=(0,A.useMemo)(()=>P.map(([t,n])=>({id:t,label:t===`/`?e(`diskRoot`):t.split(`/`).pop(),subtitle:s(I.get(t)),value:I.get(t),group:n,collapsed:t===`/Users/alex/Developer`||t===`/Users/alex/Library`})),[e,s]),d=(0,A.useMemo)(()=>P.filter(([e])=>F(e)).map(([e])=>({source:F(e),target:e})),[]),p=(0,A.useMemo)(()=>ve.map(t=>({id:t,name:e(`diskKinds.${t}`)})),[e]),m=I.get(a),h=F(a);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsxs)(l,{"aria-label":e(`diskLayout`),direction:`horizontal`,value:n,onChange:e=>i(e),children:[(0,j.jsx)(f,{value:`tree`,label:e(`diskLayouts.tree`)}),(0,j.jsx)(f,{value:`radial`,label:e(`diskLayouts.radial`)})]}),(0,j.jsx)(y,{nodes:u,edges:d,groups:p,layout:n,direction:`LR`,nodeSize:[5,22],highlight:`lineage`,selected:[a],interaction:{select:!1},height:500,ariaLabel:e(`diskAria`),onItemClick:e=>{e.type===`node`&&e.id&&o(e.id)}}),(0,j.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(h?`diskShare`:`diskTotal`,{name:a,size:s(m),share:c.format(m/ye),parentShare:h?c.format(m/I.get(h)):void 0,parent:h})})]})}var A,j,M,N,P,ve,F,I,ye;function be(){return(be=e((()=>{A=t(),i(),u(),d(),v(),j=n(),M=1e9,N=1e6,P=[[`/`,`system`],[`/System`,`system`,14.2*M],[`/Applications`,`apps`],[`/Applications/Xcode.app`,`apps`,11.8*M],[`/Applications/Photoshop.app`,`apps`,4.6*M],[`/Applications/Chrome.app`,`apps`,1.3*M],[`/Applications/Slack.app`,`apps`,540*N],[`/Applications/Spotify.app`,`apps`,320*N],[`/Users`,`documents`],[`/Users/alex`,`documents`],[`/Users/alex/Movies`,`media`],[`/Users/alex/Movies/trip-2025.mov`,`media`,18.4*M],[`/Users/alex/Movies/screencasts`,`media`,6.2*M],[`/Users/alex/Pictures`,`media`],[`/Users/alex/Pictures/Photos Library`,`media`,42.7*M],[`/Users/alex/Pictures/exports`,`media`,3.1*M],[`/Users/alex/Music`,`media`,9.4*M],[`/Users/alex/Documents`,`documents`],[`/Users/alex/Documents/invoices`,`documents`,210*N],[`/Users/alex/Documents/thesis`,`documents`,1.7*M],[`/Users/alex/Documents/scans`,`documents`,2.4*M],[`/Users/alex/Developer`,`documents`],[`/Users/alex/Developer/node_modules`,`cache`,7.9*M],[`/Users/alex/Developer/docker`,`cache`,22.5*M],[`/Users/alex/Developer/repos`,`documents`,5.3*M],[`/Users/alex/Library`,`cache`],[`/Users/alex/Library/Caches`,`cache`,8.8*M],[`/Users/alex/Library/Mail`,`documents`,4.2*M],[`/Users/alex/Library/iOS Backups`,`cache`,16.1*M]],ve=[`system`,`apps`,`media`,`documents`,`cache`],F=e=>e===`/`?null:e.slice(0,e.lastIndexOf(`/`))||`/`,I=(()=>{let e=new Map(P.map(([e])=>[e,0]));for(let[t,,n]of P)if(n)for(let r=t;r;r=F(r))e.set(r,e.get(r)+n);return e})(),ye=I.get(`/`)})))()}function xe(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),t=(0,L.useRef)(null),n=(0,L.useMemo)(()=>z.map(e=>({id:e,label:e.replace(/\/$/,``).split(`/`).pop(),group:Se(e),collapsed:e.endsWith(`/`)&&e.split(`/`).length>4})),[]),i=(0,L.useMemo)(()=>z.filter(e=>Ce(e)).map(e=>({source:Ce(e),target:e})),[]),a=(0,L.useMemo)(()=>we.map(t=>({id:t,name:e(`fileKinds.${t}`)})),[e]);return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,R.jsxs)(h,{gap:8,wrap:!0,children:[(0,R.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t.current?.expand(),children:e(`expandAll`)}),(0,R.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t.current?.collapse(),children:e(`collapseAll`)}),(0,R.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t.current?.fit(),children:e(`fit`)})]}),(0,R.jsx)(y,{ref:t,nodes:n,edges:i,groups:a,layout:`tree`,direction:`LR`,nodeSize:9,height:480,ariaLabel:e(`filesAria`)})]})}var L,R,z,Se,Ce,we;function Te(){return(Te=e((()=>{L=t(),i(),a(),g(),v(),R=n(),z=`minerva-design/,minerva-design/packages/,minerva-design/packages/charts/,minerva-design/packages/charts/src/,minerva-design/packages/charts/src/core.ts,minerva-design/packages/charts/src/index.ts,minerva-design/packages/charts/src/engine/,minerva-design/packages/charts/src/engine/chart.ts,minerva-design/packages/charts/src/engine/theme.ts,minerva-design/packages/charts/src/engine/graph/,minerva-design/packages/charts/src/engine/graph/force.ts,minerva-design/packages/charts/src/engine/graph/dag.ts,minerva-design/packages/charts/src/engine/graph/tree.ts,minerva-design/packages/charts/package.json,minerva-design/packages/react/,minerva-design/packages/react/src/,minerva-design/packages/react/src/Button.tsx,minerva-design/packages/react/src/Button.module.scss,minerva-design/packages/react/src/Tree.tsx,minerva-design/packages/react/package.json,minerva-design/apps/,minerva-design/apps/docs/,minerva-design/apps/docs/src/,minerva-design/apps/docs/src/main.tsx,minerva-design/apps/docs/src/styles.css,minerva-design/apps/docs/README.md,minerva-design/package.json,minerva-design/README.md`.split(`,`),Se=e=>e.endsWith(`/`)?`folder`:/\.(tsx?|js)$/.test(e)?`code`:/\.(s?css)$/.test(e)?`style`:e.endsWith(`.json`)?`data`:`doc`,Ce=e=>{let t=e.replace(/\/$/,``),n=t.lastIndexOf(`/`);return n<0?null:`${t.slice(0,n)}/`},we=[`folder`,`code`,`style`,`data`,`doc`]})))()}function Ee(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),t=(0,De.useMemo)(()=>{let t=[{id:`launch`,label:e(`mind.launch`)}];for(let[n,r]of Object.entries(ke)){t.push({id:n,label:e(`mind.${n}`)});for(let n of r)t.push({id:n,label:e(`mind.${n}`)})}return t},[e]),n=(0,De.useMemo)(()=>{let e=[];for(let[t,n]of Object.entries(ke)){e.push({source:`launch`,target:t});for(let r of n)e.push({source:t,target:r})}return e},[]);return(0,Oe.jsx)(y,{nodes:t,edges:n,layout:`mindmap`,height:460,ariaLabel:e(`mindAria`)})}var De,Oe,ke;function Ae(){return(Ae=e((()=>{De=t(),i(),v(),Oe=n(),ke={goals:[`revenue`,`awareness`,`retention`],audience:[`teams`,`freelancers`,`students`],channels:[`launchEvent`,`newsletter`,`partners`,`social`],timeline:[`beta`,`pressKit`,`launchDay`],risks:[`delays`,`pricing`],budget:[`ads`,`events`]}})))()}function je(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),[t,n]=(0,B.useState)(``),i=(0,B.useMemo)(()=>Me.map(([t,n])=>({id:t,label:e(`people.${t}`),subtitle:e(`roles.${t}`),group:n,collapsed:t===`backend`})),[e]),a=(0,B.useMemo)(()=>Me.filter(([,,e])=>e).map(([e,,t])=>({source:t,target:e})),[]),o=(0,B.useMemo)(()=>Ne.map(t=>({id:t,name:e(`departments.${t}`)})),[e]);return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,V.jsx)(y,{nodes:i,edges:a,groups:o,layout:`org`,height:560,ariaLabel:e(`orgAria`),onToggle:t=>n(e(t.collapsed?`teamCollapsed`:`teamExpanded`,{name:e(`people.${t.id}`)}))}),(0,V.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:t||e(`orgHint`)})]})}var B,V,Me,Ne;function Pe(){return(Pe=e((()=>{B=t(),i(),v(),V=n(),Me=[[`ceo`,`executive`,null],[`cto`,`engineering`,`ceo`],[`cfo`,`finance`,`ceo`],[`coo`,`operations`,`ceo`],[`cmo`,`marketing`,`ceo`],[`frontend`,`engineering`,`cto`],[`backend`,`engineering`,`cto`],[`web1`,`engineering`,`frontend`],[`web2`,`engineering`,`frontend`],[`api1`,`engineering`,`backend`],[`api2`,`engineering`,`backend`],[`api3`,`engineering`,`backend`],[`controller`,`finance`,`cfo`],[`analyst`,`finance`,`cfo`],[`support`,`operations`,`coo`],[`logistics`,`operations`,`coo`],[`brand`,`marketing`,`cmo`],[`growth`,`marketing`,`cmo`]],Ne=[`executive`,`engineering`,`finance`,`operations`,`marketing`]})))()}function Fe(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),t=(0,H.useMemo)(()=>{let t=[{id:`root`,label:`Minerva`,size:16}];return Object.entries(U).forEach(([n,r])=>{t.push({id:n,label:e(`categories.${n}`),group:n,size:12});for(let e of r)t.push({id:e,label:e,group:n})}),t},[e]),n=(0,H.useMemo)(()=>{let e=[];for(let[t,n]of Object.entries(U)){e.push({source:`root`,target:t});for(let r of n)e.push({source:t,target:r})}return e},[]),i=(0,H.useMemo)(()=>Object.keys(U).map((t,n)=>({id:t,name:e(`categories.${t}`),color:Le[n]})),[e]);return(0,Ie.jsx)(y,{nodes:t,edges:n,groups:i,layout:`radial`,nodeSize:8,legend:!1,height:560,ariaLabel:e(`radialAria`)})}var H,Ie,U,Le;function Re(){return(Re=e((()=>{H=t(),i(),v(),Ie=n(),U={inputs:[`Button`,`Input`,`Select`,`Checkbox`,`Radio`,`Switch`,`Slider`,`DatePicker`,`Upload`],navigation:[`Tabs`,`Menu`,`Breadcrumb`,`Pagination`,`Steps`],feedback:[`Alert`,`Toast`,`Modal`,`Drawer`,`Progress`,`Skeleton`],display:[`Table`,`List`,`Card`,`Avatar`,`Badge`,`Tag`,`Tooltip`,`Tree`],layout:[`Grid`,`Stack`,`Divider`,`AppShell`],charts:[`LineChart`,`BarChart`,`PieChart`,`SankeyChart`,`TradingChart`,`GraphChart`,`TreeChart`]},Le=[`var(--chart-series-1, #4f46e5)`,`var(--chart-series-2, #10b981)`,`var(--chart-series-3, #f59e0b)`,`var(--chart-series-4, #ef4444)`,`var(--chart-series-5, #0ea5e9)`,`var(--chart-series-6, #8b5cf6)`]})))()}function ze(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),n=(0,W.useRef)(null),[i,a]=(0,W.useState)(``),[o,c]=(0,W.useState)(null),l=(0,W.useMemo)(()=>K.map(([t])=>({id:t,label:e(`taxonomy.${t}`),group:Ue(t),collapsed:He.has(t)&&q(t).length===3})),[e]),u=(0,W.useMemo)(()=>K.filter(([,e])=>e).map(([e,t])=>({source:t,target:e})),[]),d=(0,W.useMemo)(()=>[{id:`catalog`,name:e(`taxonomy.catalog`)},...Ve.map(t=>({id:t,name:e(`taxonomy.${t}`)}))],[e]),f=(0,W.useMemo)(()=>{let e=i.trim().toLocaleLowerCase(t.language);return e?l.filter(n=>String(n.label).toLocaleLowerCase(t.language).includes(e)):[]},[l,i,t.language]),p=(0,W.useMemo)(()=>f.map(e=>e.id),[f]),g=e=>{c(e),n.current?.focusNode(e,{zoom:1.2})};return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsx)(s,{value:i,clearable:!0,"aria-label":e(`taxonomySearch`),placeholder:e(`taxonomySearch`),onClear:()=>{a(``),c(null)},onChange:e=>{a(e.target.value),c(null)},onKeyDown:e=>{e.key===`Enter`&&f[0]&&g(f[0].id)}}),f.length>0&&(0,G.jsx)(h,{gap:6,wrap:!0,children:f.map(e=>(0,G.jsx)(m,{size:`small`,clickable:!0,pressed:e.id===o,onClick:()=>g(e.id),children:e.label},e.id))}),(0,G.jsx)(y,{ref:n,nodes:l,edges:u,groups:d,layout:`tree`,direction:`LR`,nodeSize:10,highlight:`lineage`,selected:p,interaction:{select:!1},height:460,ariaLabel:e(`taxonomyAria`),onItemClick:e=>{e.type===`node`&&e.id&&c(e.id)}}),(0,G.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:o?(t=>q(t).map(t=>e(`taxonomy.${t}`)).join(e(`breadcrumbSeparator`)))(o):i.trim()?e(`taxonomyMatches`,{total:f.length}):e(`taxonomyHint`)})]})}var W,G,K,Be,Ve,He,q,Ue;function We(){return(We=e((()=>{W=t(),i(),g(),c(),p(),v(),G=n(),K=[[`catalog`,null],[`electronics`,`catalog`],[`home`,`catalog`],[`fashion`,`catalog`],[`sports`,`catalog`],[`computers`,`electronics`],[`phones`,`electronics`],[`audio`,`electronics`],[`laptops`,`computers`],[`desktops`,`computers`],[`tablets`,`computers`],[`smartphones`,`phones`],[`phoneCases`,`phones`],[`chargers`,`phones`],[`headphones`,`audio`],[`speakers`,`audio`],[`kitchen`,`home`],[`furniture`,`home`],[`garden`,`home`],[`cookware`,`kitchen`],[`coffeeMachines`,`kitchen`],[`knives`,`kitchen`],[`sofas`,`furniture`],[`desks`,`furniture`],[`officeChairs`,`furniture`],[`gardenTools`,`garden`],[`plants`,`garden`],[`clothing`,`fashion`],[`shoes`,`fashion`],[`accessories`,`fashion`],[`jackets`,`clothing`],[`dresses`,`clothing`],[`sneakers`,`shoes`],[`boots`,`shoes`],[`bags`,`accessories`],[`watches`,`accessories`],[`outdoor`,`sports`],[`fitness`,`sports`],[`cycling`,`sports`],[`tents`,`outdoor`],[`hikingBoots`,`outdoor`],[`yogaMats`,`fitness`],[`dumbbells`,`fitness`],[`bikes`,`cycling`],[`helmets`,`cycling`]],Be=new Map(K),Ve=K.filter(([,e])=>e===`catalog`).map(([e])=>e),He=new Set(K.map(([,e])=>e)),q=e=>{let t=[];for(let n=e;n;n=Be.get(n))t.unshift(n);return t},Ue=e=>q(e)[1]??`catalog`})))()}function Ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),n=(0,J.useRef)(null),[i,a]=(0,J.useState)(`1`),[o,s]=(0,J.useState)(``),c=(0,J.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`}),[t.language]),u=(0,J.useMemo)(()=>X.map(([t,,n,r])=>{let i=Q.get(t);return{id:t,label:e(`wbsItems.${t}`),subtitle:n?e(`wbsPoints`,{points:n}):e(`wbsRollup`,{points:i.total,done:c.format(i.done/i.total)}),group:r??`summary`,collapsed:Xe.has(t)&&Z(t)===1}}),[e,c]),d=(0,J.useMemo)(()=>X.filter(([,e])=>e).map(([e,t])=>({source:t,target:e})),[]),p=(0,J.useMemo)(()=>[{id:`summary`,name:e(`wbsStatuses.summary`)},...Ke.map(t=>({id:t,name:e(`wbsStatuses.${t}`),color:Je[t]}))],[e]),m=t=>{a(t);let r=Number(t);n.current?.expand();for(let[e]of X)Xe.has(e)&&Z(e)===r&&n.current?.collapse(e);s(e(`wbsDepthStatus`,{level:e(`wbsLevels.${qe[r-1]}`)}))};return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsx)(l,{"aria-label":e(`wbsDepth`),direction:`horizontal`,value:i,onChange:e=>m(String(e)),children:qe.map((t,n)=>(0,Y.jsx)(f,{value:String(n+1),label:e(`wbsLevels.${t}`)},t))}),(0,Y.jsx)(y,{ref:n,nodes:u,edges:d,groups:p,layout:`org`,height:480,ariaLabel:e(`wbsAria`),onToggle:t=>{let n=Q.get(t.id);s(e(t.collapsed?`wbsCollapsed`:`wbsExpanded`,{name:e(`wbsItems.${t.id}`),points:n.total,remaining:n.total-n.done}))}}),(0,Y.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:o||e(`wbsSummary`,{points:Q.get(`release`).total,done:c.format(Q.get(`release`).done/Q.get(`release`).total)})})]})}var J,Y,X,Ke,qe,Je,Ye,Z,Q,Xe;function Ze(){return(Ze=e((()=>{J=t(),i(),u(),d(),v(),Y=n(),X=[[`release`,null],[`onboarding`,`release`],[`signup`,`onboarding`],[`emailVerify`,`signup`,3,`done`],[`socialLogin`,`signup`,5,`doing`],[`tour`,`onboarding`],[`tourScreens`,`tour`,3,`done`],[`tourSkip`,`tour`,1,`done`],[`payments`,`release`],[`checkout`,`payments`],[`cardForm`,`checkout`,5,`doing`],[`applePay`,`checkout`,8,`todo`],[`billing`,`payments`],[`invoices`,`billing`,3,`todo`],[`refunds`,`billing`,5,`todo`],[`platform`,`release`],[`offline`,`platform`],[`syncQueue`,`offline`,8,`doing`],[`conflicts`,`offline`,5,`todo`],[`quality`,`platform`],[`crashReports`,`quality`,2,`done`],[`perfBudget`,`quality`,3,`todo`]],Ke=[`done`,`doing`,`todo`],qe=[`deliverables`,`features`,`packages`],Je={done:`var(--success-color, #16a34a)`,doing:`var(--primary-color, #4f46e5)`,todo:`var(--text-secondary-color, #9ca3af)`},Ye=new Map(X.map(([e,t])=>[e,t])),Z=e=>{let t=Ye.get(e);return t?Z(t)+1:0},Q=(()=>{let e=new Map(X.map(([e])=>[e,{total:0,done:0}]));for(let[t,,n,r]of X)if(n)for(let i=t;i;i=Ye.get(i)){let t=e.get(i);t.total+=n,r===`done`&&(t.done+=n)}return e})(),Xe=new Set(X.map(([,e])=>e))})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type State = "pending" | "played" | "alive" | "out" | "champion";
type Round = "quarterFinal" | "semiFinal" | "final";

/** Small seeded PRNG so the results are the same on every render */
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
  return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
};

// region code and rating, in bracket order (seeds 1 v 8, 4 v 5, 2 v 7, 3 v 6)
const TEAMS: [string, number, number][] = [
  ["AR", 1, 92],
  ["MA", 8, 78],
  ["ES", 4, 85],
  ["NL", 5, 83],
  ["FR", 2, 90],
  ["JP", 7, 79],
  ["BR", 3, 88],
  ["DE", 6, 82],
];

// match, round, the two nodes it is played between
const MATCHES: [string, Round, string, string][] = [
  ["qf0", "quarterFinal", "AR", "MA"],
  ["qf1", "quarterFinal", "ES", "NL"],
  ["qf2", "quarterFinal", "FR", "JP"],
  ["qf3", "quarterFinal", "BR", "DE"],
  ["sf0", "semiFinal", "qf0", "qf1"],
  ["sf1", "semiFinal", "qf2", "qf3"],
  ["final", "final", "sf0", "sf1"],
];
const ROUNDS: Round[] = ["quarterFinal", "semiFinal", "final"];
const RATING = new Map(TEAMS.map(([code, , rating]) => [code, rating]));
const STATES: State[] = ["pending", "played", "alive", "out", "champion"];
const COLORS: Record<State, string> = {
  pending: "var(--text-secondary-color, #9ca3af)",
  played: "var(--primary-color, #4f46e5)",
  alive: "var(--success-color, #16a34a)",
  out: "var(--danger-color, #dc2626)",
  champion: "var(--warning-color, #d97706)",
};

interface Result {
  winner: string;
  loser: string;
  goals: [number, number];
}

/** Plays the whole tournament with a seed: the better rating wins more often */
const play = (seed: number) => {
  const random = mulberry32(seed);
  const results = new Map<string, Result>();
  const teamOf = (id: string) => results.get(id)?.winner ?? id;
  for (const [id, , a, b] of MATCHES) {
    const [home, away] = [teamOf(a), teamOf(b)];
    const odds = RATING.get(home)! / (RATING.get(home)! + RATING.get(away)!);
    const homeWins = random() < odds;
    const loserGoals = Math.floor(random() * 3);
    const winnerGoals = loserGoals + 1 + Math.floor(random() * 2);
    results.set(id, {
      winner: homeWins ? home : away,
      loser: homeWins ? away : home,
      goals: [winnerGoals, loserGoals],
    });
  }
  return results;
};

export default function BracketDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [seed, setSeed] = useState(2026);
  const [played, setPlayed] = useState(0);
  const results = useMemo(() => play(seed), [seed]);
  const names = useMemo(
    () => new Intl.DisplayNames(i18n.language, { type: "region" }),
    [i18n.language],
  );
  const integer = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const country = (code: string) => names.of(code) ?? code;

  const nodes = useMemo((): GraphNode[] => {
    const isPlayed = (round: Round) => ROUNDS.indexOf(round) < played;
    const nameOf = (code: string) => names.of(code) ?? code;
    const out = new Set(
      MATCHES.filter(([, round]) => isPlayed(round)).map(
        ([id]) => results.get(id)!.loser,
      ),
    );
    return [
      ...MATCHES.map(([id, round]): GraphNode => {
        const result = results.get(id)!;
        if (!isPlayed(round)) {
          return {
            id,
            label: t(\`rounds.\${round}\`),
            subtitle: t("tbd"),
            group: "pending",
          };
        }
        return {
          id,
          label: nameOf(result.winner),
          subtitle: t("score", {
            winner: integer.format(result.goals[0]),
            loser: integer.format(result.goals[1]),
          }),
          group: round === "final" ? "champion" : "played",
        };
      }),
      ...TEAMS.map(([code, seedNumber]): GraphNode => ({
        id: code,
        label: nameOf(code),
        subtitle: t("seed", { n: seedNumber }),
        group: out.has(code) ? "out" : "alive",
      })),
    ];
  }, [t, results, played, names, integer]);
  const edges = useMemo(
    (): GraphEdge[] =>
      MATCHES.flatMap(([id, , a, b]) => [
        { source: id, target: a },
        { source: id, target: b },
      ]),
    [],
  );
  const groups = useMemo(
    () =>
      STATES.map((id) => ({
        id,
        name: t(\`bracketStates.\${id}\`),
        color: COLORS[id],
      })),
    [t],
  );

  const lastRound = played > 0 ? ROUNDS[played - 1] : null;
  const list = new Intl.ListFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap>
        <Button
          size="small"
          disabled={played === ROUNDS.length}
          onClick={() => setPlayed(played + 1)}
        >
          {t("nextRound")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setPlayed(0)}
        >
          {t("restart")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => {
            setSeed(seed + 1);
            setPlayed(0);
          }}
        >
          {t("newSimulation")}
        </Button>
      </HStack>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="RL"
        nodeShape="box"
        edgeStyle="orthogonal"
        tree={{ collapsible: false }}
        height={440}
        ariaLabel={t("bracketAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {lastRound === "final"
          ? t("championResult", {
              team: country(results.get("final")!.winner),
            })
          : lastRound
            ? t("roundResult", {
                round: t(\`rounds.\${lastRound}\`),
                teams: list.format(
                  MATCHES.filter(([, round]) => round === lastRound).map(
                    ([id]) => country(results.get(id)!.winner),
                  ),
                ),
              })
            : t("bracketHint")}
      </output>
    </div>
  );
}
`})))()}var et;function tt(){return(tt=e((()=>{et=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "question" | "approved" | "review" | "declined";
type Credit = "high" | "fair" | "poor";
type Answer = "yes" | "no";

interface Applicant {
  credit: Credit;
  income: Answer;
  /** debt-to-income ratio below 35% */
  debt: Answer;
  employment: Answer;
}

// node, kind, translation key of its text
const NODES: [string, Kind, string][] = [
  ["credit", "question", "credit"],
  ["income", "question", "income"],
  ["employment", "question", "employment"],
  ["debtA", "question", "debt"],
  ["debtB", "question", "debt"],
  ["approve", "approved", "approved"],
  ["approveLower", "approved", "approvedLower"],
  ["approveRate", "approved", "approvedRate"],
  ["reviewA", "review", "review"],
  ["reviewB", "review", "review"],
  ["declineA", "declined", "declined"],
  ["declineB", "declined", "declined"],
];

// parent, child, translation key of the branch label
const BRANCHES: [string, string, string][] = [
  ["credit", "income", "creditHigh"],
  ["credit", "employment", "creditFair"],
  ["credit", "declineB", "creditPoor"],
  ["income", "approve", "yes"],
  ["income", "debtA", "no"],
  ["debtA", "approveLower", "yes"],
  ["debtA", "reviewA", "no"],
  ["employment", "debtB", "yes"],
  ["employment", "reviewB", "no"],
  ["debtB", "approveRate", "yes"],
  ["debtB", "declineA", "no"],
];

const CREDIT_BRANCH: Record<Credit, string> = {
  high: "creditHigh",
  fair: "creditFair",
  poor: "creditPoor",
};
const KINDS: Kind[] = ["question", "approved", "review", "declined"];
const COLORS: Record<Kind, string> = {
  question: "var(--chart-series-1, #4f46e5)",
  approved: "var(--success-color, #16a34a)",
  review: "var(--warning-color, #d97706)",
  declined: "var(--danger-color, #dc2626)",
};

/** Follows the branches that match the applicant, from the root to a leaf */
const decide = (applicant: Applicant) => {
  const answer: Record<string, string> = {
    credit: CREDIT_BRANCH[applicant.credit],
    income: applicant.income,
    debtA: applicant.debt,
    debtB: applicant.debt,
    employment: applicant.employment,
  };
  const path = ["credit"];
  for (;;) {
    const current = path[path.length - 1];
    const next = BRANCHES.find(
      ([parent, , label]) => parent === current && label === answer[current],
    );
    if (!next) return path;
    path.push(next[1]);
  }
};

export default function DecisionTreeDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [applicant, setApplicant] = useState<Applicant>({
    credit: "fair",
    income: "yes",
    debt: "yes",
    employment: "yes",
  });
  const path = decide(applicant);
  const leaf = path[path.length - 1];

  const nodes = useMemo(
    (): GraphNode[] =>
      NODES.map(([id, kind, text]) => ({
        id,
        label: t(\`decision.\${text}\`),
        group: kind,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      BRANCHES.map(([source, target, label]) => ({
        source,
        target,
        label: t(\`branches.\${label}\`),
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      KINDS.map((id) => ({
        id,
        name: t(\`decisionKinds.\${id}\`),
        color: COLORS[id],
      })),
    [t],
  );
  const set = <K extends keyof Applicant>(key: K, value: Applicant[K]) =>
    setApplicant({ ...applicant, [key]: value });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <HStack gap={8} align="center">
          <span>{t("decision.credit")}</span>
          <RadioGroup
            aria-label={t("decision.credit")}
            direction="horizontal"
            value={applicant.credit}
            onChange={(value) => set("credit", value as Credit)}
          >
            {(Object.keys(CREDIT_BRANCH) as Credit[]).map((id) => (
              <Radio
                key={id}
                value={id}
                label={t(\`branches.\${CREDIT_BRANCH[id]}\`)}
              />
            ))}
          </RadioGroup>
        </HStack>
        {(["income", "debt", "employment"] as const).map((key) => (
          <HStack key={key} gap={8} align="center">
            <span>{t(\`decision.\${key}\`)}</span>
            <RadioGroup
              aria-label={t(\`decision.\${key}\`)}
              direction="horizontal"
              value={applicant[key]}
              onChange={(value) => set(key, value as Answer)}
            >
              <Radio value="yes" label={t("branches.yes")} />
              <Radio value="no" label={t("branches.no")} />
            </RadioGroup>
          </HStack>
        ))}
      </HStack>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        tree={{ collapsible: false, compact: false, cardSize: [150, 52] }}
        edgeLabels
        highlight="lineage"
        selected={[leaf]}
        interaction={{ select: false }}
        height={460}
        ariaLabel={t("decisionAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("decisionResult", {
          outcome: t(\`decision.\${NODES.find(([id]) => id === leaf)![2]}\`),
          questions: path.length - 1,
        })}
      </output>
    </div>
  );
}
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "system" | "apps" | "media" | "documents" | "cache";
type Layout = "tree" | "radial";

const GB = 1e9;
const MB = 1e6;

// path, kind, size in bytes for files (folders add up their content)
const ENTRIES: [string, Kind, number?][] = [
  ["/", "system"],
  ["/System", "system", 14.2 * GB],
  ["/Applications", "apps"],
  ["/Applications/Xcode.app", "apps", 11.8 * GB],
  ["/Applications/Photoshop.app", "apps", 4.6 * GB],
  ["/Applications/Chrome.app", "apps", 1.3 * GB],
  ["/Applications/Slack.app", "apps", 540 * MB],
  ["/Applications/Spotify.app", "apps", 320 * MB],
  ["/Users", "documents"],
  ["/Users/alex", "documents"],
  ["/Users/alex/Movies", "media"],
  ["/Users/alex/Movies/trip-2025.mov", "media", 18.4 * GB],
  ["/Users/alex/Movies/screencasts", "media", 6.2 * GB],
  ["/Users/alex/Pictures", "media"],
  ["/Users/alex/Pictures/Photos Library", "media", 42.7 * GB],
  ["/Users/alex/Pictures/exports", "media", 3.1 * GB],
  ["/Users/alex/Music", "media", 9.4 * GB],
  ["/Users/alex/Documents", "documents"],
  ["/Users/alex/Documents/invoices", "documents", 210 * MB],
  ["/Users/alex/Documents/thesis", "documents", 1.7 * GB],
  ["/Users/alex/Documents/scans", "documents", 2.4 * GB],
  ["/Users/alex/Developer", "documents"],
  ["/Users/alex/Developer/node_modules", "cache", 7.9 * GB],
  ["/Users/alex/Developer/docker", "cache", 22.5 * GB],
  ["/Users/alex/Developer/repos", "documents", 5.3 * GB],
  ["/Users/alex/Library", "cache"],
  ["/Users/alex/Library/Caches", "cache", 8.8 * GB],
  ["/Users/alex/Library/Mail", "documents", 4.2 * GB],
  ["/Users/alex/Library/iOS Backups", "cache", 16.1 * GB],
];

const KINDS: Kind[] = ["system", "apps", "media", "documents", "cache"];
const parentOf = (path: string) =>
  path === "/" ? null : path.slice(0, path.lastIndexOf("/")) || "/";

/** Size of every entry, folders included */
const SIZES = (() => {
  const sizes = new Map<string, number>(ENTRIES.map(([path]) => [path, 0]));
  for (const [path, , bytes] of ENTRIES) {
    if (!bytes) continue;
    for (let at: string | null = path; at; at = parentOf(at)) {
      sizes.set(at, sizes.get(at)! + bytes);
    }
  }
  return sizes;
})();
const TOTAL = SIZES.get("/")!;

export default function DiskUsageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [layout, setLayout] = useState<Layout>("tree");
  const [current, setCurrent] = useState("/Users/alex/Pictures");

  const formatBytes = useMemo(() => {
    const units = ["byte", "kilobyte", "megabyte", "gigabyte"] as const;
    const formats = units.map(
      (unit) =>
        new Intl.NumberFormat(i18n.language, {
          style: "unit",
          unit,
          unitDisplay: "short",
          maximumFractionDigits: 1,
        }),
    );
    return (bytes: number) => {
      const step = Math.min(
        3,
        Math.max(0, Math.floor(Math.log10(Math.max(bytes, 1)) / 3)),
      );
      return formats[step].format(bytes / 1000 ** step);
    };
  }, [i18n.language]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): GraphNode[] =>
      ENTRIES.map(([path, kind]) => ({
        id: path,
        label: path === "/" ? t("diskRoot") : path.split("/").pop(),
        subtitle: formatBytes(SIZES.get(path)!),
        value: SIZES.get(path),
        group: kind,
        // big folders of the home directory start collapsed
        collapsed:
          path === "/Users/alex/Developer" || path === "/Users/alex/Library",
      })),
    [t, formatBytes],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      ENTRIES.filter(([path]) => parentOf(path)).map(([path]) => ({
        source: parentOf(path)!,
        target: path,
      })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(\`diskKinds.\${id}\`) })),
    [t],
  );
  const size = SIZES.get(current)!;
  const parent = parentOf(current);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("diskLayout")}
        direction="horizontal"
        value={layout}
        onChange={(value) => setLayout(value as Layout)}
      >
        <Radio value="tree" label={t("diskLayouts.tree")} />
        <Radio value="radial" label={t("diskLayouts.radial")} />
      </RadioGroup>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout={layout}
        direction="LR"
        nodeSize={[5, 22]}
        highlight="lineage"
        selected={[current]}
        interaction={{ select: false }}
        height={500}
        ariaLabel={t("diskAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setCurrent(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t(parent ? "diskShare" : "diskTotal", {
          name: current,
          size: formatBytes(size),
          share: percent.format(size / TOTAL),
          parentShare: parent
            ? percent.format(size / SIZES.get(parent)!)
            : undefined,
          parent,
        })}
      </output>
    </div>
  );
}
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "folder" | "code" | "style" | "data" | "doc";

// path → kind; folders end with "/"
const FILES: string[] = [
  "minerva-design/",
  "minerva-design/packages/",
  "minerva-design/packages/charts/",
  "minerva-design/packages/charts/src/",
  "minerva-design/packages/charts/src/core.ts",
  "minerva-design/packages/charts/src/index.ts",
  "minerva-design/packages/charts/src/engine/",
  "minerva-design/packages/charts/src/engine/chart.ts",
  "minerva-design/packages/charts/src/engine/theme.ts",
  "minerva-design/packages/charts/src/engine/graph/",
  "minerva-design/packages/charts/src/engine/graph/force.ts",
  "minerva-design/packages/charts/src/engine/graph/dag.ts",
  "minerva-design/packages/charts/src/engine/graph/tree.ts",
  "minerva-design/packages/charts/package.json",
  "minerva-design/packages/react/",
  "minerva-design/packages/react/src/",
  "minerva-design/packages/react/src/Button.tsx",
  "minerva-design/packages/react/src/Button.module.scss",
  "minerva-design/packages/react/src/Tree.tsx",
  "minerva-design/packages/react/package.json",
  "minerva-design/apps/",
  "minerva-design/apps/docs/",
  "minerva-design/apps/docs/src/",
  "minerva-design/apps/docs/src/main.tsx",
  "minerva-design/apps/docs/src/styles.css",
  "minerva-design/apps/docs/README.md",
  "minerva-design/package.json",
  "minerva-design/README.md",
];

const kindOf = (path: string): Kind =>
  path.endsWith("/")
    ? "folder"
    : /\\.(tsx?|js)$/.test(path)
      ? "code"
      : /\\.(s?css)$/.test(path)
        ? "style"
        : path.endsWith(".json")
          ? "data"
          : "doc";

const parentOf = (path: string) => {
  const trimmed = path.replace(/\\/$/, "");
  const cut = trimmed.lastIndexOf("/");
  return cut < 0 ? null : \`\${trimmed.slice(0, cut)}/\`;
};

const KINDS: Kind[] = ["folder", "code", "style", "data", "doc"];

export default function FileTreeDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const nodes = useMemo(
    (): GraphNode[] =>
      FILES.map((path) => ({
        id: path,
        label: path.replace(/\\/$/, "").split("/").pop(),
        group: kindOf(path),
        // deep folders start collapsed
        collapsed: path.endsWith("/") && path.split("/").length > 4,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      FILES.filter((path) => parentOf(path)).map((path) => ({
        source: parentOf(path)!,
        target: path,
      })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(\`fileKinds.\${id}\`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.expand()}
        >
          {t("expandAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.collapse()}
        >
          {t("collapseAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.fit()}
        >
          {t("fit")}
        </Button>
      </HStack>
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="LR"
        nodeSize={9}
        height={480}
        ariaLabel={t("filesAria")}
      />
    </div>
  );
}
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// branch → ideas (keys of the locale file)
const MAP: Record<string, string[]> = {
  goals: ["revenue", "awareness", "retention"],
  audience: ["teams", "freelancers", "students"],
  channels: ["launchEvent", "newsletter", "partners", "social"],
  timeline: ["beta", "pressKit", "launchDay"],
  risks: ["delays", "pricing"],
  budget: ["ads", "events"],
};

export default function MindMapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "launch", label: t("mind.launch") }];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ id: branch, label: t(\`mind.\${branch}\`) });
      for (const idea of ideas)
        list.push({ id: idea, label: t(\`mind.\${idea}\`) });
    }
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ source: "launch", target: branch });
      for (const idea of ideas) list.push({ source: branch, target: idea });
    }
    return list;
  }, []);

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      layout="mindmap"
      height={460}
      ariaLabel={t("mindAria")}
    />
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Department =
  "executive" | "engineering" | "finance" | "operations" | "marketing";

// person, department, manager
const PEOPLE: [string, Department, string | null][] = [
  ["ceo", "executive", null],
  ["cto", "engineering", "ceo"],
  ["cfo", "finance", "ceo"],
  ["coo", "operations", "ceo"],
  ["cmo", "marketing", "ceo"],
  ["frontend", "engineering", "cto"],
  ["backend", "engineering", "cto"],
  ["web1", "engineering", "frontend"],
  ["web2", "engineering", "frontend"],
  ["api1", "engineering", "backend"],
  ["api2", "engineering", "backend"],
  ["api3", "engineering", "backend"],
  ["controller", "finance", "cfo"],
  ["analyst", "finance", "cfo"],
  ["support", "operations", "coo"],
  ["logistics", "operations", "coo"],
  ["brand", "marketing", "cmo"],
  ["growth", "marketing", "cmo"],
];

const DEPARTMENTS: Department[] = [
  "executive",
  "engineering",
  "finance",
  "operations",
  "marketing",
];

export default function OrgChartDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [status, setStatus] = useState("");
  const nodes = useMemo(
    (): GraphNode[] =>
      PEOPLE.map(([id, department]) => ({
        id,
        label: t(\`people.\${id}\`),
        subtitle: t(\`roles.\${id}\`),
        group: department,
        // the backend team starts collapsed
        collapsed: id === "backend",
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      PEOPLE.filter(([, , manager]) => manager).map(([id, , manager]) => ({
        source: manager!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => DEPARTMENTS.map((id) => ({ id, name: t(\`departments.\${id}\`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        height={560}
        ariaLabel={t("orgAria")}
        onToggle={(event) =>
          setStatus(
            t(event.collapsed ? "teamCollapsed" : "teamExpanded", {
              name: t(\`people.\${event.id}\`),
            }),
          )
        }
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {status || t("orgHint")}
      </span>
    </div>
  );
}
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// the components of the library, by category
const CATEGORIES: Record<string, string[]> = {
  inputs: [
    "Button",
    "Input",
    "Select",
    "Checkbox",
    "Radio",
    "Switch",
    "Slider",
    "DatePicker",
    "Upload",
  ],
  navigation: ["Tabs", "Menu", "Breadcrumb", "Pagination", "Steps"],
  feedback: ["Alert", "Toast", "Modal", "Drawer", "Progress", "Skeleton"],
  display: [
    "Table",
    "List",
    "Card",
    "Avatar",
    "Badge",
    "Tag",
    "Tooltip",
    "Tree",
  ],
  layout: ["Grid", "Stack", "Divider", "AppShell"],
  charts: [
    "LineChart",
    "BarChart",
    "PieChart",
    "SankeyChart",
    "TradingChart",
    "GraphChart",
    "TreeChart",
  ],
};

const CATEGORY_COLORS = [
  "var(--chart-series-1, #4f46e5)",
  "var(--chart-series-2, #10b981)",
  "var(--chart-series-3, #f59e0b)",
  "var(--chart-series-4, #ef4444)",
  "var(--chart-series-5, #0ea5e9)",
  "var(--chart-series-6, #8b5cf6)",
];

export default function RadialDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "root", label: "Minerva", size: 16 }];
    Object.entries(CATEGORIES).forEach(([category, components]) => {
      list.push({
        id: category,
        label: t(\`categories.\${category}\`),
        group: category,
        size: 12,
      });
      for (const name of components)
        list.push({ id: name, label: name, group: category });
    });
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [category, components] of Object.entries(CATEGORIES)) {
      list.push({ source: "root", target: category });
      for (const name of components)
        list.push({ source: category, target: name });
    }
    return list;
  }, []);
  const groups = useMemo(
    () =>
      Object.keys(CATEGORIES).map((id, i) => ({
        id,
        name: t(\`categories.\${id}\`),
        color: CATEGORY_COLORS[i],
      })),
    [t],
  );

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      groups={groups}
      layout="radial"
      nodeSize={8}
      legend={false}
      height={560}
      ariaLabel={t("radialAria")}
    />
  );
}
`})))()}var ft;function pt(){return(pt=e((()=>{ft=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input, Tag } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// category → parent; "catalog" is the root
const CATEGORIES: [string, string | null][] = [
  ["catalog", null],
  ["electronics", "catalog"],
  ["home", "catalog"],
  ["fashion", "catalog"],
  ["sports", "catalog"],
  ["computers", "electronics"],
  ["phones", "electronics"],
  ["audio", "electronics"],
  ["laptops", "computers"],
  ["desktops", "computers"],
  ["tablets", "computers"],
  ["smartphones", "phones"],
  ["phoneCases", "phones"],
  ["chargers", "phones"],
  ["headphones", "audio"],
  ["speakers", "audio"],
  ["kitchen", "home"],
  ["furniture", "home"],
  ["garden", "home"],
  ["cookware", "kitchen"],
  ["coffeeMachines", "kitchen"],
  ["knives", "kitchen"],
  ["sofas", "furniture"],
  ["desks", "furniture"],
  ["officeChairs", "furniture"],
  ["gardenTools", "garden"],
  ["plants", "garden"],
  ["clothing", "fashion"],
  ["shoes", "fashion"],
  ["accessories", "fashion"],
  ["jackets", "clothing"],
  ["dresses", "clothing"],
  ["sneakers", "shoes"],
  ["boots", "shoes"],
  ["bags", "accessories"],
  ["watches", "accessories"],
  ["outdoor", "sports"],
  ["fitness", "sports"],
  ["cycling", "sports"],
  ["tents", "outdoor"],
  ["hikingBoots", "outdoor"],
  ["yogaMats", "fitness"],
  ["dumbbells", "fitness"],
  ["bikes", "cycling"],
  ["helmets", "cycling"],
];

const PARENT = new Map(CATEGORIES);
const DEPARTMENTS = CATEGORIES.filter(([, parent]) => parent === "catalog").map(
  ([id]) => id,
);
const HAS_CHILDREN = new Set(CATEGORIES.map(([, parent]) => parent));

/** The category and its ancestors, from the root down */
const pathTo = (id: string) => {
  const path: string[] = [];
  for (let at: string | null | undefined = id; at; at = PARENT.get(at)) {
    path.unshift(at);
  }
  return path;
};
const departmentOf = (id: string) => pathTo(id)[1] ?? "catalog";

export default function TaxonomySearchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const nodes = useMemo(
    (): GraphNode[] =>
      CATEGORIES.map(([id]) => ({
        id,
        label: t(\`taxonomy.\${id}\`),
        group: departmentOf(id),
        // second-level categories start collapsed
        collapsed: HAS_CHILDREN.has(id) && pathTo(id).length === 3,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      CATEGORIES.filter(([, parent]) => parent).map(([id, parent]) => ({
        source: parent!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => [
      { id: "catalog", name: t("taxonomy.catalog") },
      ...DEPARTMENTS.map((id) => ({ id, name: t(\`taxonomy.\${id}\`) })),
    ],
    [t],
  );

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(i18n.language);
    if (!needle) return [];
    return nodes.filter((node) =>
      String(node.label).toLocaleLowerCase(i18n.language).includes(needle),
    );
  }, [nodes, query, i18n.language]);
  const selected = useMemo(() => matches.map((node) => node.id), [matches]);

  const reveal = (id: string) => {
    setActive(id);
    // focusNode expands the collapsed ancestors before centering the node
    ref.current?.focusNode(id, { zoom: 1.2 });
  };
  const breadcrumb = (id: string) =>
    pathTo(id)
      .map((at) => t(\`taxonomy.\${at}\`))
      .join(t("breadcrumbSeparator"));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Input
        value={query}
        clearable
        aria-label={t("taxonomySearch")}
        placeholder={t("taxonomySearch")}
        onClear={() => {
          setQuery("");
          setActive(null);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && matches[0]) reveal(matches[0].id);
        }}
      />
      {matches.length > 0 && (
        <HStack gap={6} wrap>
          {matches.map((node) => (
            <Tag
              key={node.id}
              size="small"
              clickable
              pressed={node.id === active}
              onClick={() => reveal(node.id)}
            >
              {node.label}
            </Tag>
          ))}
        </HStack>
      )}
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="LR"
        nodeSize={10}
        highlight="lineage"
        selected={selected}
        interaction={{ select: false }}
        height={460}
        ariaLabel={t("taxonomyAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setActive(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {active
          ? breadcrumb(active)
          : query.trim()
            ? t("taxonomyMatches", { total: matches.length })
            : t("taxonomyHint")}
      </output>
    </div>
  );
}
`})))()}var mt;function ht(){return(ht=e((()=>{mt=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "done" | "doing" | "todo";

// work item, parent, story points and status of the work packages
const ITEMS: [string, string | null, number?, Status?][] = [
  ["release", null],
  ["onboarding", "release"],
  ["signup", "onboarding"],
  ["emailVerify", "signup", 3, "done"],
  ["socialLogin", "signup", 5, "doing"],
  ["tour", "onboarding"],
  ["tourScreens", "tour", 3, "done"],
  ["tourSkip", "tour", 1, "done"],
  ["payments", "release"],
  ["checkout", "payments"],
  ["cardForm", "checkout", 5, "doing"],
  ["applePay", "checkout", 8, "todo"],
  ["billing", "payments"],
  ["invoices", "billing", 3, "todo"],
  ["refunds", "billing", 5, "todo"],
  ["platform", "release"],
  ["offline", "platform"],
  ["syncQueue", "offline", 8, "doing"],
  ["conflicts", "offline", 5, "todo"],
  ["quality", "platform"],
  ["crashReports", "quality", 2, "done"],
  ["perfBudget", "quality", 3, "todo"],
];

const STATUSES: Status[] = ["done", "doing", "todo"];
const LEVELS = ["deliverables", "features", "packages"];
const COLORS: Record<Status, string> = {
  done: "var(--success-color, #16a34a)",
  doing: "var(--primary-color, #4f46e5)",
  todo: "var(--text-secondary-color, #9ca3af)",
};

const PARENT = new Map(ITEMS.map(([id, parent]) => [id, parent]));

const depthOf = (id: string): number => {
  const parent = PARENT.get(id);
  return parent ? depthOf(parent) + 1 : 0;
};

/** Total and done story points of every item, rolled up from the packages */
const ROLLUP = (() => {
  const points = new Map<string, { total: number; done: number }>(
    ITEMS.map(([id]) => [id, { total: 0, done: 0 }]),
  );
  for (const [id, , value, status] of ITEMS) {
    if (!value) continue;
    for (let at = id as string | null | undefined; at; at = PARENT.get(at)) {
      const sum = points.get(at)!;
      sum.total += value;
      if (status === "done") sum.done += value;
    }
  }
  return points;
})();
const PARENTS = new Set(ITEMS.map(([, parent]) => parent));

export default function WbsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const [depth, setDepth] = useState("1");
  const [status, setStatus] = useState("");
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): GraphNode[] =>
      ITEMS.map(([id, , points, state]) => {
        const sum = ROLLUP.get(id)!;
        return {
          id,
          label: t(\`wbsItems.\${id}\`),
          subtitle: points
            ? t("wbsPoints", { points })
            : t("wbsRollup", {
                points: sum.total,
                done: percent.format(sum.done / sum.total),
              }),
          group: state ?? "summary",
          // the plan opens on its three deliverables
          collapsed: PARENTS.has(id) && depthOf(id) === 1,
        };
      }),
    [t, percent],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      ITEMS.filter(([, parent]) => parent).map(([id, parent]) => ({
        source: parent!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => [
      { id: "summary", name: t("wbsStatuses.summary") },
      ...STATUSES.map((id) => ({
        id,
        name: t(\`wbsStatuses.\${id}\`),
        color: COLORS[id],
      })),
    ],
    [t],
  );

  const showDepth = (value: string) => {
    setDepth(value);
    const level = Number(value);
    ref.current?.expand();
    for (const [id] of ITEMS) {
      if (PARENTS.has(id) && depthOf(id) === level) ref.current?.collapse(id);
    }
    setStatus(
      t("wbsDepthStatus", { level: t(\`wbsLevels.\${LEVELS[level - 1]}\`) }),
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("wbsDepth")}
        direction="horizontal"
        value={depth}
        onChange={(value) => showDepth(String(value))}
      >
        {LEVELS.map((id, i) => (
          <Radio key={id} value={String(i + 1)} label={t(\`wbsLevels.\${id}\`)} />
        ))}
      </RadioGroup>
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        height={480}
        ariaLabel={t("wbsAria")}
        onToggle={(event) => {
          const sum = ROLLUP.get(event.id)!;
          setStatus(
            t(event.collapsed ? "wbsCollapsed" : "wbsExpanded", {
              name: t(\`wbsItems.\${event.id}\`),
              points: sum.total,
              remaining: sum.total - sum.done,
            }),
          );
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {status ||
          t("wbsSummary", {
            points: ROLLUP.get("release")!.total,
            done: percent.format(
              ROLLUP.get("release")!.done / ROLLUP.get("release")!.total,
            ),
          })}
      </output>
    </div>
  );
}
`})))()}var $,gt,_t,vt;function yt(){return(yt=e((()=>{ue(),ge(),be(),Te(),Ae(),Pe(),Re(),We(),Ze(),$e(),tt(),rt(),at(),st(),lt(),dt(),pt(),ht(),t(),i(),ne(),ee(),ie(),$=n(),gt=te(Object.assign({"./demos/bracket.tsx":ae,"./demos/decision-tree.tsx":de,"./demos/disk-usage.tsx":_e,"./demos/file-tree.tsx":xe,"./demos/mind-map.tsx":Ee,"./demos/org-chart.tsx":je,"./demos/radial.tsx":Fe,"./demos/taxonomy-search.tsx":ze,"./demos/wbs.tsx":Ge}),Object.assign({"./demos/bracket.tsx":Qe,"./demos/decision-tree.tsx":et,"./demos/disk-usage.tsx":nt,"./demos/file-tree.tsx":it,"./demos/mind-map.tsx":ot,"./demos/org-chart.tsx":ct,"./demos/radial.tsx":ut,"./demos/taxonomy-search.tsx":ft,"./demos/wbs.tsx":mt})),_t=`import { TreeChart } from "minerva-design/charts";
// pure tree layouts: tidy tree, radial, mind map, org chart (no DOM)
import { treeLayout } from "minerva-design/charts/core";`,vt=()=>{let{t:e}=r(),t=(0,$.jsxs)(`section`,{className:_.section,"aria-labelledby":`tree-overview`,children:[(0,$.jsx)(`h2`,{id:`tree-overview`,children:e(`docs.tree-chart.intro.overview.title`)}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.tree-chart.intro.overview.text`)}),(0,$.jsxs)(`ul`,{className:_.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.tree-chart.intro.overview.tidy`)}),(0,$.jsx)(`li`,{children:e(`docs.tree-chart.intro.overview.layouts`)}),(0,$.jsx)(`li`,{children:e(`docs.tree-chart.intro.overview.collapse`)})]})]});return(0,$.jsx)(re,{id:`tree-chart`,demos:gt,intro:t,importCode:_t})}})))()}yt();export{vt as default};