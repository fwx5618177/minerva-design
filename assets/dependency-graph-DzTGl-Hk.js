import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{n as s,t as c}from"./Input-LfOOMgLE.js";import{i as l,n as u,r as d,t as f}from"./Radio-L-_0EAus.js";import{n as p,t as m}from"./Switch-CHbzff3y.js";import{i as h,r as g}from"./Stack-B3Kr9X_e.js";import{i as ee,r as _}from"./DemoBlock-CrPVu7R1.js";import{i as te,o as v,t as ne}from"./Select-CRoh0AwC.js";import{i as re,r as ie}from"./angular-preview-DXuT9H-w.js";import{l as ae,n as oe,t as se,u as ce}from"./DocPage-BdPOW9nQ.js";import{n as y,r as b}from"./graph-DD7vHvPa.js";function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[n,i]=(0,x.useState)(2),[a,s]=(0,x.useState)(0),[c,u]=(0,x.useState)(!1),d=(0,x.useMemo)(()=>fe(n),[n]),p=a>=d.makespan;(0,x.useEffect)(()=>{if(!c||p)return;let e=window.setInterval(()=>s(e=>e+1),250);return()=>window.clearInterval(e)},[c,p]);let m=e=>{let t=d.start.get(e);return a>=t+T.get(e)?`done`:a>=t?`running`:`queued`},g=(0,x.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`}),[t.language]),ee=C.map(([t,n])=>{let r=m(t),i=(a-d.start.get(t))/n;return{id:t,label:t,value:n,group:r,subtitle:r===`running`?e(`taskProgress`,{percent:g.format(i)}):e(`taskSeconds`,{seconds:n})}}),_=(0,x.useMemo)(()=>w.map(([e,t])=>({source:e,target:t})),[]),te=(0,x.useMemo)(()=>ue.map(t=>({id:t,name:e(`runStates.${t}`),color:de[t]})),[e]),v=C.filter(([e])=>m(e)===`running`).map(([e])=>e);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsxs)(h,{gap:12,wrap:!0,align:`center`,children:[(0,S.jsx)(l,{"aria-label":e(`workers`),direction:`horizontal`,value:String(n),onChange:e=>{i(Number(e)),s(0)},children:[1,2,4].map(t=>(0,S.jsx)(f,{value:String(t),label:e(`workerCount`,{n:t})},t))}),(0,S.jsx)(o,{size:`small`,onClick:()=>{p&&s(0),u(!c||p)},children:e(c&&!p?`pause`:`run`)}),(0,S.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>{u(!1),s(0)},children:e(`reset`)})]}),(0,S.jsx)(b,{nodes:ee,edges:_,groups:te,direction:`LR`,criticalPath:!0,animation:!1,height:400,ariaLabel:e(`schedulerAria`)}),(0,S.jsxs)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:[p?e(`schedulerDone`,{seconds:d.makespan,workers:n}):e(`schedulerStatus`,{elapsed:a,seconds:d.makespan,running:v.length?new Intl.ListFormat(t.language).format(v):e(`idle`)}),` `,e(`schedulerBound`,{seconds:Math.max(...E.values())})]})]})}var x,S,C,w,T,ue,de,E,fe;function pe(){return(pe=e((()=>{x=t(),i(),a(),g(),u(),d(),y(),S=n(),C=[[`tokens#build`,2],[`utils#build`,3],[`icons#build`,4],[`core#build`,6],[`charts#build`,8],[`react#build`,5],[`vue#build`,5],[`core#test`,7],[`charts#test`,9],[`react#test`,6],[`docs#build`,7],[`docs#deploy`,2]],w=[[`tokens#build`,`core#build`],[`utils#build`,`core#build`],[`utils#build`,`charts#build`],[`core#build`,`charts#build`],[`core#build`,`react#build`],[`core#build`,`vue#build`],[`icons#build`,`react#build`],[`icons#build`,`vue#build`],[`core#build`,`core#test`],[`charts#build`,`charts#test`],[`react#build`,`react#test`],[`charts#build`,`docs#build`],[`react#build`,`docs#build`],[`vue#build`,`docs#build`],[`docs#build`,`docs#deploy`],[`core#test`,`docs#deploy`],[`charts#test`,`docs#deploy`],[`react#test`,`docs#deploy`]],T=new Map(C),ue=[`done`,`running`,`queued`],de={done:`var(--success-color, #16a34a)`,running:`var(--primary-color, #4f46e5)`,queued:`var(--text-secondary-color, #9ca3af)`},E=(()=>{let e=new Map,t=n=>{if(e.has(n))return e.get(n);let r=w.filter(([e])=>e===n).map(([,e])=>t(e)),i=T.get(n)+Math.max(0,...r);return e.set(n,i),i};for(let[e]of C)t(e);return e})(),fe=e=>{let t=new Map,n=new Map;for(let r=0;t.size<C.length;r++){let i=[...t].filter(([e,t])=>t<=r&&r<t+T.get(e)).length,a=C.map(([e])=>e).filter(e=>!t.has(e)&&w.every(([t,i])=>i!==e||n.has(t)&&n.get(t)<=r)).sort((e,t)=>E.get(t)-E.get(e));for(let o of a.slice(0,Math.max(0,e-i)))t.set(o,r),n.set(o,r+T.get(o))}return{start:t,makespan:Math.max(...n.values())}}})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[n,i]=(0,D.useState)(`TB`),[a,o]=(0,D.useState)(`ml`),s=(0,D.useMemo)(()=>k.map(([t,n,r])=>({id:t,label:e(`courses.${t}`),subtitle:n,group:`year${r}`})),[e]),c=(0,D.useMemo)(()=>A.map(([e,t])=>({source:e,target:t})),[]),u=(0,D.useMemo)(()=>[1,2,3,4].map(t=>({id:`year${t}`,name:e(`yearLabel`,{n:t})})),[e]),d=ge(a),p=t=>e(`courses.${t}`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,O.jsx)(l,{"aria-label":e(`flowDirection`),direction:`horizontal`,value:n,onChange:e=>i(e),children:he.map(t=>(0,O.jsx)(f,{value:t,label:e(`directions.${t}`)},t))}),(0,O.jsx)(b,{nodes:s,edges:c,groups:u,direction:n,edgeStyle:`spline`,highlight:`lineage`,selected:[a],interaction:{select:!1},height:n===`TB`||n===`BT`?460:400,ariaLabel:e(`coursesAria`),onItemClick:e=>{e.type===`node`&&e.id&&o(e.id)}}),(0,O.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:d.length?e(`coursePath`,{course:p(a),total:d.length,list:new Intl.ListFormat(t.language).format(d.map(p))}):e(`courseNoPrerequisite`,{course:p(a)})})]})}var D,O,k,A,he,ge;function _e(){return(_e=e((()=>{D=t(),i(),u(),d(),y(),O=n(),k=[[`intro`,`CS 101`,1],[`discrete`,`MA 110`,1],[`calculus`,`MA 120`,1],[`dataStructures`,`CS 201`,2],[`architecture`,`CS 210`,2],[`linearAlgebra`,`MA 220`,2],[`probability`,`MA 230`,2],[`algorithms`,`CS 301`,3],[`os`,`CS 310`,3],[`databases`,`CS 320`,3],[`networks`,`CS 330`,3],[`ml`,`CS 340`,3],[`compilers`,`CS 401`,4],[`distributed`,`CS 410`,4],[`security`,`CS 420`,4],[`deepLearning`,`CS 440`,4],[`capstone`,`CS 490`,4]],A=[[`intro`,`dataStructures`],[`discrete`,`dataStructures`],[`intro`,`architecture`],[`calculus`,`linearAlgebra`],[`calculus`,`probability`],[`dataStructures`,`algorithms`],[`discrete`,`algorithms`],[`architecture`,`os`],[`dataStructures`,`os`],[`dataStructures`,`databases`],[`os`,`networks`],[`algorithms`,`ml`],[`linearAlgebra`,`ml`],[`probability`,`ml`],[`algorithms`,`compilers`],[`architecture`,`compilers`],[`os`,`distributed`],[`networks`,`distributed`],[`networks`,`security`],[`os`,`security`],[`ml`,`deepLearning`],[`algorithms`,`capstone`],[`databases`,`capstone`]],he=[`TB`,`LR`,`BT`,`RL`],ge=e=>{let t=new Set,n=[e];for(;n.length;){let e=n.shift();for(let[r,i]of A)i===e&&!t.has(r)&&(t.add(r),n.push(r))}return k.map(([e])=>e).filter(e=>t.has(e))}})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[n,i]=(0,j.useState)(`clean_users`),a=(0,j.useMemo)(()=>Se(n),[n]),o=(0,j.useMemo)(()=>N.map(t=>{let r=t===n?`failed`:a.has(t)?`blocked`:`success`;return{id:t,label:t,group:r,subtitle:e(`runStatuses.${r}`)}}),[e,n,a]),s=(0,j.useMemo)(()=>P.map(([e,t])=>({source:e,target:t,dashed:a.has(t)})),[a]),c=(0,j.useMemo)(()=>ye.map(t=>({id:t,name:e(`runStatuses.${t}`),color:be[t]})),[e]),l=xe.filter(e=>a.has(e)),u=new Intl.ListFormat(t.language);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsxs)(h,{gap:8,align:`center`,children:[(0,M.jsx)(`span`,{children:e(`failingTask`)}),(0,M.jsx)(v,{"aria-label":e(`failingTask`),size:`small`,value:n,onChange:i,children:N.map(e=>(0,M.jsx)(ne,{value:e,children:e},e))})]}),(0,M.jsx)(b,{nodes:o,edges:s,groups:c,direction:`LR`,highlight:`lineage`,selected:[n],interaction:{select:!1},height:440,ariaLabel:e(`impactAria`),onItemClick:e=>{e.type===`node`&&e.id&&i(e.id)}}),(0,M.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:l.length?e(`impactSummary`,{task:n,blocked:a.size,total:N.length,sinks:u.format(l)}):e(`impactNone`,{task:n})})]})}var j,M,N,P,ye,be,xe,Se;function Ce(){return(Ce=e((()=>{j=t(),i(),g(),te(),y(),M=n(),N=[`extract_orders`,`extract_users`,`extract_clicks`,`validate_orders`,`clean_users`,`sessionize`,`join_orders_users`,`daily_revenue`,`user_features`,`churn_model`,`load_warehouse`,`refresh_dashboard`,`email_report`,`export_crm`],P=[[`extract_orders`,`validate_orders`],[`extract_users`,`clean_users`],[`extract_clicks`,`sessionize`],[`validate_orders`,`join_orders_users`],[`clean_users`,`join_orders_users`],[`join_orders_users`,`daily_revenue`],[`join_orders_users`,`user_features`],[`sessionize`,`user_features`],[`user_features`,`churn_model`],[`daily_revenue`,`load_warehouse`],[`user_features`,`load_warehouse`],[`load_warehouse`,`refresh_dashboard`],[`daily_revenue`,`email_report`],[`churn_model`,`export_crm`],[`clean_users`,`export_crm`]],ye=[`success`,`failed`,`blocked`],be={success:`var(--success-color, #16a34a)`,failed:`var(--danger-color, #dc2626)`,blocked:`var(--warning-color, #d97706)`},xe=N.filter(e=>!P.some(([t])=>t===e)),Se=e=>{let t=new Set,n=[e];for(;n.length;){let e=n.shift();for(let[r,i]of P)r===e&&!t.has(i)&&(t.add(i),n.push(i))}return t}})))()}function we(){let{t:e}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[t,n]=(0,F.useState)([`fct_orders`]),i=(0,F.useMemo)(()=>Te.map(([t,n])=>({id:t,label:n===`dashboard`?e(`dashboards.${t}`):t,group:n})),[e]),a=(0,F.useMemo)(()=>L.map(([e,t])=>({source:e,target:t})),[]),o=(0,F.useMemo)(()=>Ee.map(t=>({id:t,name:e(`layers.${t}`)})),[e]),s=t[0],c=i.find(e=>e.id===s)?.label;return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,I.jsx)(b,{nodes:i,edges:a,groups:o,direction:`LR`,selected:t,highlight:`lineage`,height:420,ariaLabel:e(`lineageAria`),onSelectionChange:n}),(0,I.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:s?e(`lineageSummary`,{name:c,upstream:R(s,!1),downstream:R(s,!0)}):e(`lineageHint`)})]})}var F,I,Te,L,Ee,R;function De(){return(De=e((()=>{F=t(),i(),y(),I=n(),Te=[[`raw.orders`,`source`],[`raw.payments`,`source`],[`raw.customers`,`source`],[`raw.events`,`source`],[`stg_orders`,`staging`],[`stg_payments`,`staging`],[`stg_customers`,`staging`],[`stg_sessions`,`staging`],[`fct_orders`,`mart`],[`dim_customers`,`mart`],[`fct_revenue`,`mart`],[`fct_engagement`,`mart`],[`revenue`,`dashboard`],[`retention`,`dashboard`],[`growth`,`dashboard`]],L=[[`raw.orders`,`stg_orders`],[`raw.payments`,`stg_payments`],[`raw.customers`,`stg_customers`],[`raw.events`,`stg_sessions`],[`stg_orders`,`fct_orders`],[`stg_payments`,`fct_orders`],[`stg_customers`,`dim_customers`],[`stg_orders`,`dim_customers`],[`fct_orders`,`fct_revenue`],[`stg_payments`,`fct_revenue`],[`stg_sessions`,`fct_engagement`],[`dim_customers`,`fct_engagement`],[`fct_revenue`,`revenue`],[`dim_customers`,`retention`],[`fct_engagement`,`retention`],[`fct_revenue`,`growth`],[`fct_engagement`,`growth`]],Ee=[`source`,`staging`,`mart`,`dashboard`],R=(e,t)=>{let n=new Set([e]),r=[e];for(;r.length;){let e=r.shift();for(let[i,a]of L){let[o,s]=t?[i,a]:[a,i];o===e&&!n.has(s)&&(n.add(s),r.push(s))}}return n.size-1}})))()}function Oe(){let{t:e}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),t=(0,z.useMemo)(()=>Ae.map(([e,t,n])=>({id:e,label:e,subtitle:`v${n}`,group:t})),[]),n=(0,z.useMemo)(()=>[...je.map(([t,n,r])=>({source:t,target:n,dashed:!!r,label:r?e(`devDependency`):void 0})),{source:B[0],target:B[1],color:`var(--danger-color, #ef4444)`,label:e(`circularDependency`)}],[e]),i=(0,z.useMemo)(()=>Me.map(t=>({id:t,name:e(`kinds.${t}`)})),[e]);return(0,ke.jsx)(b,{nodes:t,edges:n,groups:i,height:520,edgeLabels:`hover`,ariaLabel:e(`packagesAria`)})}var z,ke,Ae,je,B,Me;function Ne(){return(Ne=e((()=>{z=t(),i(),y(),ke=n(),Ae=[[`docs`,`app`,`2.4.0`],[`playground`,`app`,`0.9.1`],[`admin-console`,`app`,`1.6.0`],[`react`,`framework`,`3.2.0`],[`vue`,`framework`,`3.2.0`],[`angular`,`framework`,`3.2.0`],[`web-components`,`framework`,`3.2.0`],[`charts`,`library`,`1.8.0`],[`core`,`library`,`3.2.0`],[`i18n`,`library`,`1.1.0`],[`icons`,`library`,`2.0.3`],[`tokens`,`library`,`1.4.2`],[`utils`,`library`,`1.0.7`],[`build-scripts`,`tooling`,`0.5.0`],[`eslint-config`,`tooling`,`4.1.0`],[`tsconfig`,`tooling`,`1.0.0`]],je=[[`docs`,`react`],[`docs`,`vue`],[`docs`,`angular`],[`docs`,`web-components`],[`docs`,`charts`],[`docs`,`i18n`],[`playground`,`react`],[`playground`,`charts`],[`admin-console`,`react`],[`admin-console`,`charts`],[`admin-console`,`i18n`],[`react`,`core`],[`vue`,`core`],[`angular`,`core`],[`web-components`,`core`],[`react`,`icons`],[`vue`,`icons`],[`web-components`,`icons`],[`charts`,`core`],[`charts`,`utils`],[`core`,`tokens`],[`core`,`utils`],[`icons`,`tokens`],[`i18n`,`utils`],[`core`,`build-scripts`,!0],[`charts`,`build-scripts`,!0],[`react`,`eslint-config`,!0],[`build-scripts`,`tsconfig`,!0],[`eslint-config`,`tsconfig`,!0]],B=[`utils`,`i18n`],Me=[`app`,`framework`,`library`,`tooling`]})))()}function Pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[n,i]=(0,V.useState)(!0),a=(0,V.useMemo)(()=>Fe.map(([t,n,r])=>({id:t,label:e(`tasks.${t}`),subtitle:e(`taskSubtitle`,{status:e(`statuses.${n}`),minutes:r}),group:n,value:r})),[e]),o=(0,V.useMemo)(()=>Ie.map(([t,n,r])=>({source:t,target:n,label:r?e(`edgeKinds.${r}`):void 0,dashed:r===`retry`})),[e]),s=(0,V.useMemo)(()=>Re.map(t=>({id:t,name:e(`statuses.${t}`),color:Le[t]})),[e]),c=(0,V.useMemo)(()=>re(a,o),[a,o]),l=e(`pathSeparator`);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsx)(m,{checked:n,onChange:i,label:e(`showCritical`)}),(0,H.jsx)(b,{nodes:a,edges:o,groups:s,direction:`LR`,edgeStyle:`orthogonal`,criticalPath:n,arrowStyle:`filled`,edgeLabels:`hover`,dag:{criticalColor:`var(--primary-color, #4f46e5)`,layerGap:48},height:420,ariaLabel:e(`pipelineAria`)}),(0,H.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e(`criticalSummary`,{minutes:new Intl.NumberFormat(t.language).format(c.length),path:c.nodes.map(t=>e(`tasks.${t}`)).join(l)})})]})}var V,H,Fe,Ie,Le,Re;function ze(){return(ze=e((()=>{V=t(),i(),p(),y(),ie(),H=n(),Fe=[[`install`,`success`,3],[`lint`,`success`,2],[`typecheck`,`success`,3],[`unit`,`success`,6],[`security`,`success`,3],[`buildWeb`,`success`,5],[`buildDocs`,`success`,4],[`e2e`,`running`,9],[`visual`,`failed`,5],[`package`,`pending`,2],[`staging`,`pending`,3],[`production`,`pending`,4]],Ie=[[`install`,`lint`],[`install`,`typecheck`],[`install`,`unit`],[`install`,`security`],[`typecheck`,`buildWeb`],[`install`,`buildDocs`],[`buildWeb`,`e2e`],[`buildWeb`,`visual`],[`buildDocs`,`visual`],[`unit`,`package`],[`buildWeb`,`package`,`bundle`],[`buildWeb`,`package`,`types`],[`lint`,`package`],[`package`,`staging`],[`e2e`,`staging`],[`security`,`staging`],[`visual`,`staging`],[`staging`,`production`],[`visual`,`visual`,`retry`]],Le={success:`var(--success-color, #16a34a)`,running:`var(--info-color, #0ea5e9)`,failed:`var(--danger-color, #ef4444)`,pending:`var(--text-secondary-color, #9ca3af)`},Re=[`success`,`running`,`failed`,`pending`]})))()}function Be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[n,i]=(0,U.useState)(null),a=J,o=(0,U.useMemo)(()=>new Intl.DateTimeFormat(t.language,{month:`short`,day:`numeric`,weekday:`short`,timeZone:`UTC`}),[t.language]),s=e=>{let t=a.early.get(e);return o.formatRange(q(t),q(t+a.duration.get(e)-1))},c=(0,U.useMemo)(()=>G.map(([t,n,r])=>{let i=J.early.get(t);return{id:t,label:e(`planTasks.${t}`),group:n,value:r,subtitle:o.formatRange(q(i),q(i+r-1))}}),[e,o]),l=(0,U.useMemo)(()=>K.map(([e,t])=>({source:e,target:t})),[]),u=(0,U.useMemo)(()=>Ve.map(t=>({id:t,name:e(`planPhases.${t}`)})),[e]),d=n?a.slack.get(n):0;return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,W.jsx)(b,{nodes:c,edges:l,groups:u,direction:`LR`,edgeStyle:`orthogonal`,criticalPath:a.chain,highlight:`none`,selected:n?[n]:[],interaction:{select:!1},height:420,ariaLabel:e(`planAria`),onItemClick:e=>{e.type===`node`&&e.id&&i(e.id===n?null:e.id)}}),(0,W.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:n?e(d===0?`planCriticalTask`:`planTask`,{name:e(`planTasks.${n}`),range:s(n),days:a.duration.get(n),slack:d}):e(`planSummary`,{days:a.end,date:o.format(q(a.end-1))})})]})}var U,W,G,K,Ve,He,q,Ue,J;function We(){return(We=e((()=>{U=t(),i(),y(),W=n(),G=[[`brief`,`discovery`,3],[`research`,`discovery`,5],[`sitemap`,`discovery`,2],[`wireframes`,`design`,4],[`visualDesign`,`design`,7],[`copy`,`design`,6],[`backend`,`build`,6],[`cms`,`build`,5],[`frontend`,`build`,8],[`content`,`build`,4],[`qa`,`launch`,4],[`seo`,`launch`,2],[`golive`,`launch`,1]],K=[[`brief`,`research`],[`brief`,`backend`],[`research`,`sitemap`],[`sitemap`,`wireframes`],[`sitemap`,`copy`],[`sitemap`,`cms`],[`backend`,`cms`],[`wireframes`,`visualDesign`],[`visualDesign`,`frontend`],[`copy`,`content`],[`cms`,`content`],[`frontend`,`qa`],[`content`,`qa`],[`content`,`seo`],[`qa`,`golive`],[`seo`,`golive`]],Ve=[`discovery`,`design`,`build`,`launch`],He=Date.UTC(2026,2,2),q=e=>{let t=new Date(He);for(let n=e;n>0;){t.setUTCDate(t.getUTCDate()+1);let e=t.getUTCDay();e!==0&&e!==6&&n--}return t},Ue=()=>{let e=new Map(G.map(([e,,t])=>[e,t])),t=new Map;for(let[n]of G){let r=K.filter(([,e])=>e===n).map(([n])=>t.get(n)+e.get(n));t.set(n,Math.max(0,...r))}let n=Math.max(...G.map(([e,,n])=>t.get(e)+n)),r=new Map;for(let[e,,t]of[...G].reverse()){let i=K.filter(([t])=>t===e).map(([,e])=>r.get(e));r.set(e,Math.min(n,...i)-t)}let i=new Map(G.map(([e])=>[e,r.get(e)-t.get(e)])),a=[G[0][0]];for(;;){let n=a[a.length-1],r=K.find(([r,a])=>r===n&&i.get(a)===0&&t.get(a)===t.get(r)+e.get(r));if(!r)break;a.push(r[1])}return{duration:e,early:t,slack:i,end:n,chain:a}},J=Ue()})))()}function Ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[n,i]=(0,Y.useState)({price:`42`,quantity:`12`,discountRate:`10`}),[a,o]=(0,Y.useState)(`discountRate`),c=Je(Number(n.price)||0,Number(n.quantity)||0,(Number(n.discountRate)||0)/100),l=(0,Y.useMemo)(()=>({currency:new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`}),percent:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}),integer:new Intl.NumberFormat(t.language)}),[t.language]),u=Ke.map(([t,n,r,i])=>({id:t,label:`${n} · ${e(`cells.${t}`)}`,subtitle:l[i].format(c[t]),group:r})),d=(0,Y.useMemo)(()=>Z.map(([e,t])=>({source:e,target:t})),[]),f=(0,Y.useMemo)(()=>qe.map(t=>({id:t,name:e(`cellKinds.${t}`)})),[e]),p=[...Ye(a)];return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,X.jsx)(h,{gap:12,wrap:!0,align:`end`,children:Q.map(t=>(0,X.jsxs)(`label`,{style:{display:`grid`,gap:4},children:[(0,X.jsx)(`span`,{children:e(`cells.${t}`)}),(0,X.jsx)(s,{type:`number`,min:0,step:t===`price`?.5:1,value:n[t],style:{width:120},onChange:e=>{i({...n,[t]:e.target.value}),o(t)}})]},t))}),(0,X.jsx)(b,{nodes:u,edges:d,groups:f,direction:`LR`,highlight:`lineage`,selected:[a],interaction:{select:!1},animation:!1,height:380,ariaLabel:e(`spreadsheetAria`),onItemClick:e=>{e.type===`node`&&Q.includes(e.id)&&o(e.id)}}),(0,X.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`recalculated`,{cell:e(`cells.${a}`),total:p.length,list:new Intl.ListFormat(t.language).format(p.map(t=>e(`cells.${t}`))),value:l.currency.format(c.total)})})]})}var Y,X,Ke,Z,qe,Q,Je,Ye;function Xe(){return(Xe=e((()=>{Y=t(),i(),g(),c(),y(),X=n(),Ke=[[`price`,`B1`,`input`,`currency`],[`quantity`,`B2`,`input`,`integer`],[`discountRate`,`B3`,`input`,`percent`],[`taxRate`,`B4`,`input`,`percent`],[`subtotal`,`C1`,`formula`,`currency`],[`discount`,`C2`,`formula`,`currency`],[`net`,`C3`,`formula`,`currency`],[`tax`,`C4`,`formula`,`currency`],[`shipping`,`C5`,`formula`,`currency`],[`total`,`D1`,`formula`,`currency`],[`unitCost`,`D2`,`formula`,`currency`]],Z=[[`price`,`subtotal`],[`quantity`,`subtotal`],[`subtotal`,`discount`],[`discountRate`,`discount`],[`subtotal`,`net`],[`discount`,`net`],[`net`,`tax`],[`taxRate`,`tax`],[`net`,`shipping`],[`net`,`total`],[`tax`,`total`],[`shipping`,`total`],[`total`,`unitCost`],[`quantity`,`unitCost`]],qe=[`input`,`formula`],Q=[`price`,`quantity`,`discountRate`],Je=(e,t,n)=>{let r=.08,i=e*t,a=i*n,o=i-a,s=o*r,c=o>=500?0:25,l=o+s+c;return{price:e,quantity:t,discountRate:n,taxRate:r,subtotal:i,discount:a,net:o,tax:s,shipping:c,total:l,unitCost:t>0?l/t:0}},Ye=e=>{let t=new Set,n=[e];for(;n.length;){let e=n.shift();for(let[r,i]of Z)r===e&&!t.has(i)&&(t.add(i),n.push(i))}return t}})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Radio, RadioGroup } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type State = "done" | "running" | "queued";

// monorepo tasks and their duration in seconds
const TASKS: [string, number][] = [
  ["tokens#build", 2],
  ["utils#build", 3],
  ["icons#build", 4],
  ["core#build", 6],
  ["charts#build", 8],
  ["react#build", 5],
  ["vue#build", 5],
  ["core#test", 7],
  ["charts#test", 9],
  ["react#test", 6],
  ["docs#build", 7],
  ["docs#deploy", 2],
];

// prerequisite → dependent
const NEEDS: [string, string][] = [
  ["tokens#build", "core#build"],
  ["utils#build", "core#build"],
  ["utils#build", "charts#build"],
  ["core#build", "charts#build"],
  ["core#build", "react#build"],
  ["core#build", "vue#build"],
  ["icons#build", "react#build"],
  ["icons#build", "vue#build"],
  ["core#build", "core#test"],
  ["charts#build", "charts#test"],
  ["react#build", "react#test"],
  ["charts#build", "docs#build"],
  ["react#build", "docs#build"],
  ["vue#build", "docs#build"],
  ["docs#build", "docs#deploy"],
  ["core#test", "docs#deploy"],
  ["charts#test", "docs#deploy"],
  ["react#test", "docs#deploy"],
];

const DURATION = new Map(TASKS);
const STATES: State[] = ["done", "running", "queued"];
const STATE_COLORS: Record<State, string> = {
  done: "var(--success-color, #16a34a)",
  running: "var(--primary-color, #4f46e5)",
  queued: "var(--text-secondary-color, #9ca3af)",
};

/** Longest remaining chain from each task: the scheduling priority */
const tail = (() => {
  const memo = new Map<string, number>();
  const visit = (id: string): number => {
    if (memo.has(id)) return memo.get(id)!;
    const next = NEEDS.filter(([a]) => a === id).map(([, b]) => visit(b));
    const value = DURATION.get(id)! + Math.max(0, ...next);
    memo.set(id, value);
    return value;
  };
  for (const [id] of TASKS) visit(id);
  return memo;
})();

/** List scheduling on \`workers\` slots: start time of every task, longest chain first */
const schedule = (workers: number) => {
  const start = new Map<string, number>();
  const finish = new Map<string, number>();
  for (let time = 0; start.size < TASKS.length; time++) {
    const busy = [...start].filter(
      ([id, s]) => s <= time && time < s + DURATION.get(id)!,
    ).length;
    const ready = TASKS.map(([id]) => id)
      .filter(
        (id) =>
          !start.has(id) &&
          NEEDS.every(
            ([a, b]) => b !== id || (finish.has(a) && finish.get(a)! <= time),
          ),
      )
      .sort((a, b) => tail.get(b)! - tail.get(a)!);
    for (const id of ready.slice(0, Math.max(0, workers - busy))) {
      start.set(id, time);
      finish.set(id, time + DURATION.get(id)!);
    }
  }
  return { start, makespan: Math.max(...finish.values()) };
};

export default function BuildSchedulerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [workers, setWorkers] = useState(2);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const plan = useMemo(() => schedule(workers), [workers]);
  const finished = elapsed >= plan.makespan;

  // one simulated second every 250 ms while playing
  useEffect(() => {
    if (!playing || finished) return;
    const timer = window.setInterval(
      () => setElapsed((value) => value + 1),
      250,
    );
    return () => window.clearInterval(timer);
  }, [playing, finished]);

  const stateOf = (id: string): State => {
    const start = plan.start.get(id)!;
    if (elapsed >= start + DURATION.get(id)!) return "done";
    return elapsed >= start ? "running" : "queued";
  };
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );

  const nodes = TASKS.map(([id, seconds]): GraphNode => {
    const state = stateOf(id);
    const done = (elapsed - plan.start.get(id)!) / seconds;
    return {
      id,
      label: id,
      value: seconds,
      group: state,
      subtitle:
        state === "running"
          ? t("taskProgress", { percent: percent.format(done) })
          : t("taskSeconds", { seconds }),
    };
  });
  const edges = useMemo(
    (): GraphEdge[] => NEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      STATES.map((id) => ({
        id,
        name: t(\`runStates.\${id}\`),
        color: STATE_COLORS[id],
      })),
    [t],
  );
  const running = TASKS.filter(([id]) => stateOf(id) === "running").map(
    ([id]) => id,
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        <RadioGroup
          aria-label={t("workers")}
          direction="horizontal"
          value={String(workers)}
          onChange={(value) => {
            setWorkers(Number(value));
            setElapsed(0);
          }}
        >
          {[1, 2, 4].map((n) => (
            <Radio key={n} value={String(n)} label={t("workerCount", { n })} />
          ))}
        </RadioGroup>
        <Button
          size="small"
          onClick={() => {
            if (finished) setElapsed(0);
            setPlaying(!playing || finished);
          }}
        >
          {playing && !finished ? t("pause") : t("run")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => {
            setPlaying(false);
            setElapsed(0);
          }}
        >
          {t("reset")}
        </Button>
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        criticalPath
        animation={false}
        height={400}
        ariaLabel={t("schedulerAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {finished
          ? t("schedulerDone", { seconds: plan.makespan, workers })
          : t("schedulerStatus", {
              elapsed,
              seconds: plan.makespan,
              running: running.length
                ? new Intl.ListFormat(i18n.language).format(running)
                : t("idle"),
            })}{" "}
        {t("schedulerBound", { seconds: Math.max(...tail.values()) })}
      </output>
    </div>
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Direction = "TB" | "LR" | "BT" | "RL";

// course, catalogue code, year of the curriculum
const COURSES: [string, string, number][] = [
  ["intro", "CS 101", 1],
  ["discrete", "MA 110", 1],
  ["calculus", "MA 120", 1],
  ["dataStructures", "CS 201", 2],
  ["architecture", "CS 210", 2],
  ["linearAlgebra", "MA 220", 2],
  ["probability", "MA 230", 2],
  ["algorithms", "CS 301", 3],
  ["os", "CS 310", 3],
  ["databases", "CS 320", 3],
  ["networks", "CS 330", 3],
  ["ml", "CS 340", 3],
  ["compilers", "CS 401", 4],
  ["distributed", "CS 410", 4],
  ["security", "CS 420", 4],
  ["deepLearning", "CS 440", 4],
  ["capstone", "CS 490", 4],
];

// prerequisite → course
const PREREQUISITES: [string, string][] = [
  ["intro", "dataStructures"],
  ["discrete", "dataStructures"],
  ["intro", "architecture"],
  ["calculus", "linearAlgebra"],
  ["calculus", "probability"],
  ["dataStructures", "algorithms"],
  ["discrete", "algorithms"],
  ["architecture", "os"],
  ["dataStructures", "os"],
  ["dataStructures", "databases"],
  ["os", "networks"],
  ["algorithms", "ml"],
  ["linearAlgebra", "ml"],
  ["probability", "ml"],
  ["algorithms", "compilers"],
  ["architecture", "compilers"],
  ["os", "distributed"],
  ["networks", "distributed"],
  ["networks", "security"],
  ["os", "security"],
  ["ml", "deepLearning"],
  ["algorithms", "capstone"],
  ["databases", "capstone"],
];

const DIRECTIONS: Direction[] = ["TB", "LR", "BT", "RL"];

/** Every prerequisite of \`id\`, direct or not, in catalogue (topological) order */
const ancestors = (id: string) => {
  const seen = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of PREREQUISITES) {
      if (b === current && !seen.has(a)) {
        seen.add(a);
        queue.push(a);
      }
    }
  }
  return COURSES.map(([course]) => course).filter((course) => seen.has(course));
};

export default function CoursePrerequisitesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [direction, setDirection] = useState<Direction>("TB");
  const [course, setCourse] = useState("ml");

  const nodes = useMemo(
    (): GraphNode[] =>
      COURSES.map(([id, code, year]) => ({
        id,
        label: t(\`courses.\${id}\`),
        subtitle: code,
        group: \`year\${year}\`,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      PREREQUISITES.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      [1, 2, 3, 4].map((n) => ({
        id: \`year\${n}\`,
        name: t("yearLabel", { n }),
      })),
    [t],
  );
  const before = ancestors(course);
  const name = (id: string) => t(\`courses.\${id}\`);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("flowDirection")}
        direction="horizontal"
        value={direction}
        onChange={(value) => setDirection(value as Direction)}
      >
        {DIRECTIONS.map((id) => (
          <Radio key={id} value={id} label={t(\`directions.\${id}\`)} />
        ))}
      </RadioGroup>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction={direction}
        edgeStyle="spline"
        highlight="lineage"
        selected={[course]}
        interaction={{ select: false }}
        height={direction === "TB" || direction === "BT" ? 460 : 400}
        ariaLabel={t("coursesAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setCourse(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {before.length
          ? t("coursePath", {
              course: name(course),
              total: before.length,
              list: new Intl.ListFormat(i18n.language).format(before.map(name)),
            })
          : t("courseNoPrerequisite", { course: name(course) })}
      </output>
    </div>
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "success" | "failed" | "blocked";

// nightly ETL run: extract → transform → load → publish
const TASKS = [
  "extract_orders",
  "extract_users",
  "extract_clicks",
  "validate_orders",
  "clean_users",
  "sessionize",
  "join_orders_users",
  "daily_revenue",
  "user_features",
  "churn_model",
  "load_warehouse",
  "refresh_dashboard",
  "email_report",
  "export_crm",
];

const UPSTREAM: [string, string][] = [
  ["extract_orders", "validate_orders"],
  ["extract_users", "clean_users"],
  ["extract_clicks", "sessionize"],
  ["validate_orders", "join_orders_users"],
  ["clean_users", "join_orders_users"],
  ["join_orders_users", "daily_revenue"],
  ["join_orders_users", "user_features"],
  ["sessionize", "user_features"],
  ["user_features", "churn_model"],
  ["daily_revenue", "load_warehouse"],
  ["user_features", "load_warehouse"],
  ["load_warehouse", "refresh_dashboard"],
  ["daily_revenue", "email_report"],
  ["churn_model", "export_crm"],
  ["clean_users", "export_crm"],
];

const STATUSES: Status[] = ["success", "failed", "blocked"];
const COLORS: Record<Status, string> = {
  success: "var(--success-color, #16a34a)",
  failed: "var(--danger-color, #dc2626)",
  blocked: "var(--warning-color, #d97706)",
};
const SINKS = TASKS.filter((id) => !UPSTREAM.some(([a]) => a === id));

/** Every task downstream of \`id\` */
const downstream = (id: string) => {
  const seen = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of UPSTREAM) {
      if (a === current && !seen.has(b)) {
        seen.add(b);
        queue.push(b);
      }
    }
  }
  return seen;
};

export default function ImpactAnalysisDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [failed, setFailed] = useState("clean_users");
  const blocked = useMemo(() => downstream(failed), [failed]);

  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map((id) => {
        const status: Status =
          id === failed ? "failed" : blocked.has(id) ? "blocked" : "success";
        return {
          id,
          label: id,
          group: status,
          subtitle: t(\`runStatuses.\${status}\`),
        };
      }),
    [t, failed, blocked],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      UPSTREAM.map(([source, target]) => ({
        source,
        target,
        dashed: blocked.has(target),
      })),
    [blocked],
  );
  const groups = useMemo(
    () =>
      STATUSES.map((id) => ({
        id,
        name: t(\`runStatuses.\${id}\`),
        color: COLORS[id],
      })),
    [t],
  );
  const sinks = SINKS.filter((id) => blocked.has(id));
  const list = new Intl.ListFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("failingTask")}</span>
        <Select
          aria-label={t("failingTask")}
          size="small"
          value={failed}
          onChange={setFailed}
        >
          {TASKS.map((id) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        highlight="lineage"
        selected={[failed]}
        interaction={{ select: false }}
        height={440}
        ariaLabel={t("impactAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setFailed(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {sinks.length
          ? t("impactSummary", {
              task: failed,
              blocked: blocked.size,
              total: TASKS.length,
              sinks: list.format(sinks),
            })
          : t("impactNone", { task: failed })}
      </output>
    </div>
  );
}
`})))()}var rt;function it(){return(it=e((()=>{rt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Layer = "source" | "staging" | "mart" | "dashboard";

const TABLES: [string, Layer][] = [
  ["raw.orders", "source"],
  ["raw.payments", "source"],
  ["raw.customers", "source"],
  ["raw.events", "source"],
  ["stg_orders", "staging"],
  ["stg_payments", "staging"],
  ["stg_customers", "staging"],
  ["stg_sessions", "staging"],
  ["fct_orders", "mart"],
  ["dim_customers", "mart"],
  ["fct_revenue", "mart"],
  ["fct_engagement", "mart"],
  ["revenue", "dashboard"],
  ["retention", "dashboard"],
  ["growth", "dashboard"],
];

const FEEDS: [string, string][] = [
  ["raw.orders", "stg_orders"],
  ["raw.payments", "stg_payments"],
  ["raw.customers", "stg_customers"],
  ["raw.events", "stg_sessions"],
  ["stg_orders", "fct_orders"],
  ["stg_payments", "fct_orders"],
  ["stg_customers", "dim_customers"],
  ["stg_orders", "dim_customers"],
  ["fct_orders", "fct_revenue"],
  ["stg_payments", "fct_revenue"],
  ["stg_sessions", "fct_engagement"],
  ["dim_customers", "fct_engagement"],
  ["fct_revenue", "revenue"],
  ["dim_customers", "retention"],
  ["fct_engagement", "retention"],
  ["fct_revenue", "growth"],
  ["fct_engagement", "growth"],
];

const LAYERS: Layer[] = ["source", "staging", "mart", "dashboard"];

/** Nodes reachable from \`id\` following the edges forward or backward */
const reach = (id: string, forward: boolean): number => {
  const seen = new Set([id]);
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of FEEDS) {
      const [from, to] = forward ? [a, b] : [b, a];
      if (from === current && !seen.has(to)) {
        seen.add(to);
        queue.push(to);
      }
    }
  }
  return seen.size - 1;
};

export default function LineageDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [selected, setSelected] = useState<string[]>(["fct_orders"]);
  const nodes = useMemo(
    (): GraphNode[] =>
      TABLES.map(([id, layer]) => ({
        id,
        label: layer === "dashboard" ? t(\`dashboards.\${id}\`) : id,
        group: layer,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] => FEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => LAYERS.map((id) => ({ id, name: t(\`layers.\${id}\`) })),
    [t],
  );
  const current = selected[0];
  const label = nodes.find((node) => node.id === current)?.label;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        selected={selected}
        highlight="lineage"
        height={420}
        ariaLabel={t("lineageAria")}
        onSelectionChange={setSelected}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {current
          ? t("lineageSummary", {
              name: label,
              upstream: reach(current, false),
              downstream: reach(current, true),
            })
          : t("lineageHint")}
      </span>
    </div>
  );
}
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "app" | "framework" | "library" | "tooling";

const PACKAGES: [string, Kind, string][] = [
  ["docs", "app", "2.4.0"],
  ["playground", "app", "0.9.1"],
  ["admin-console", "app", "1.6.0"],
  ["react", "framework", "3.2.0"],
  ["vue", "framework", "3.2.0"],
  ["angular", "framework", "3.2.0"],
  ["web-components", "framework", "3.2.0"],
  ["charts", "library", "1.8.0"],
  ["core", "library", "3.2.0"],
  ["i18n", "library", "1.1.0"],
  ["icons", "library", "2.0.3"],
  ["tokens", "library", "1.4.2"],
  ["utils", "library", "1.0.7"],
  ["build-scripts", "tooling", "0.5.0"],
  ["eslint-config", "tooling", "4.1.0"],
  ["tsconfig", "tooling", "1.0.0"],
];

// "a depends on b"; dev dependencies are dashed
const DEPENDS: [string, string, boolean?][] = [
  ["docs", "react"],
  ["docs", "vue"],
  ["docs", "angular"],
  ["docs", "web-components"],
  ["docs", "charts"],
  ["docs", "i18n"],
  ["playground", "react"],
  ["playground", "charts"],
  ["admin-console", "react"],
  ["admin-console", "charts"],
  ["admin-console", "i18n"],
  ["react", "core"],
  ["vue", "core"],
  ["angular", "core"],
  ["web-components", "core"],
  ["react", "icons"],
  ["vue", "icons"],
  ["web-components", "icons"],
  ["charts", "core"],
  ["charts", "utils"],
  ["core", "tokens"],
  ["core", "utils"],
  ["icons", "tokens"],
  ["i18n", "utils"],
  ["core", "build-scripts", true],
  ["charts", "build-scripts", true],
  ["react", "eslint-config", true],
  ["build-scripts", "tsconfig", true],
  ["eslint-config", "tsconfig", true],
];

// a circular dependency (both directions between two packages), drawn in red
const CYCLE: [string, string] = ["utils", "i18n"];

const KINDS: Kind[] = ["app", "framework", "library", "tooling"];

export default function PackagesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const nodes = useMemo(
    (): GraphNode[] =>
      PACKAGES.map(([id, kind, version]) => ({
        id,
        label: id,
        subtitle: \`v\${version}\`,
        group: kind,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] => [
      ...DEPENDS.map(([source, target, dev]) => ({
        source,
        target,
        dashed: !!dev,
        label: dev ? t("devDependency") : undefined,
      })),
      {
        source: CYCLE[0],
        target: CYCLE[1],
        color: "var(--danger-color, #ef4444)",
        label: t("circularDependency"),
      },
    ],
    [t],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(\`kinds.\${id}\`) })),
    [t],
  );

  return (
    <DependencyGraph
      nodes={nodes}
      edges={edges}
      groups={groups}
      height={520}
      edgeLabels="hover"
      ariaLabel={t("packagesAria")}
    />
  );
}
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  DependencyGraph,
  criticalPath,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "success" | "running" | "failed" | "pending";

// task, status, duration in minutes
const TASKS: [string, Status, number][] = [
  ["install", "success", 3],
  ["lint", "success", 2],
  ["typecheck", "success", 3],
  ["unit", "success", 6],
  ["security", "success", 3],
  ["buildWeb", "success", 5],
  ["buildDocs", "success", 4],
  ["e2e", "running", 9],
  ["visual", "failed", 5],
  ["package", "pending", 2],
  ["staging", "pending", 3],
  ["production", "pending", 4],
];

const NEEDS: [string, string, string?][] = [
  ["install", "lint"],
  ["install", "typecheck"],
  ["install", "unit"],
  ["install", "security"],
  ["typecheck", "buildWeb"],
  ["install", "buildDocs"],
  ["buildWeb", "e2e"],
  ["buildWeb", "visual"],
  ["buildDocs", "visual"],
  ["unit", "package"],
  // two artifacts between the same jobs: parallel routes
  ["buildWeb", "package", "bundle"],
  ["buildWeb", "package", "types"],
  ["lint", "package"],
  ["package", "staging"],
  ["e2e", "staging"],
  ["security", "staging"],
  ["visual", "staging"],
  ["staging", "production"],
  // a failed job retries itself: a self-loop
  ["visual", "visual", "retry"],
];

const STATUS_COLORS: Record<Status, string> = {
  success: "var(--success-color, #16a34a)",
  running: "var(--info-color, #0ea5e9)",
  failed: "var(--danger-color, #ef4444)",
  pending: "var(--text-secondary-color, #9ca3af)",
};

const STATUSES: Status[] = ["success", "running", "failed", "pending"];

export default function PipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [showCritical, setShowCritical] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map(([id, status, minutes]) => ({
        id,
        label: t(\`tasks.\${id}\`),
        subtitle: t("taskSubtitle", {
          status: t(\`statuses.\${status}\`),
          minutes,
        }),
        group: status,
        value: minutes,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      NEEDS.map(([source, target, kind]) => ({
        source,
        target,
        label: kind ? t(\`edgeKinds.\${kind}\`) : undefined,
        dashed: kind === "retry",
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      STATUSES.map((id) => ({
        id,
        name: t(\`statuses.\${id}\`),
        color: STATUS_COLORS[id],
      })),
    [t],
  );
  // the same longest path the chart highlights, for the summary below
  const path = useMemo(() => criticalPath(nodes, edges), [nodes, edges]);
  const separator = t("pathSeparator");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={showCritical}
        onChange={setShowCritical}
        label={t("showCritical")}
      />
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        edgeStyle="orthogonal"
        criticalPath={showCritical}
        arrowStyle="filled"
        edgeLabels="hover"
        dag={{ criticalColor: "var(--primary-color, #4f46e5)", layerGap: 48 }}
        height={420}
        ariaLabel={t("pipelineAria")}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t("criticalSummary", {
          minutes: new Intl.NumberFormat(i18n.language).format(path.length),
          path: path.nodes.map((id) => t(\`tasks.\${id}\`)).join(separator),
        })}
      </span>
    </div>
  );
}
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Phase = "discovery" | "design" | "build" | "launch";

// website launch: task, phase, duration in workdays
const TASKS: [string, Phase, number][] = [
  ["brief", "discovery", 3],
  ["research", "discovery", 5],
  ["sitemap", "discovery", 2],
  ["wireframes", "design", 4],
  ["visualDesign", "design", 7],
  ["copy", "design", 6],
  ["backend", "build", 6],
  ["cms", "build", 5],
  ["frontend", "build", 8],
  ["content", "build", 4],
  ["qa", "launch", 4],
  ["seo", "launch", 2],
  ["golive", "launch", 1],
];

const AFTER: [string, string][] = [
  ["brief", "research"],
  ["brief", "backend"],
  ["research", "sitemap"],
  ["sitemap", "wireframes"],
  ["sitemap", "copy"],
  ["sitemap", "cms"],
  ["backend", "cms"],
  ["wireframes", "visualDesign"],
  ["visualDesign", "frontend"],
  ["copy", "content"],
  ["cms", "content"],
  ["frontend", "qa"],
  ["content", "qa"],
  ["content", "seo"],
  ["qa", "golive"],
  ["seo", "golive"],
];

const PHASES: Phase[] = ["discovery", "design", "build", "launch"];
const KICKOFF = Date.UTC(2026, 2, 2); // Monday 2 March 2026

/** Date of the n-th workday (0-based) after the kickoff, skipping weekends */
const workday = (n: number) => {
  const date = new Date(KICKOFF);
  for (let left = n; left > 0;) {
    date.setUTCDate(date.getUTCDate() + 1);
    const day = date.getUTCDay();
    if (day !== 0 && day !== 6) left--;
  }
  return date;
};

/** Critical path method: earliest / latest start and the slack of every task */
const cpm = () => {
  const duration = new Map(TASKS.map(([id, , days]) => [id, days]));
  const early = new Map<string, number>();
  for (const [id] of TASKS) {
    const preds = AFTER.filter(([, b]) => b === id).map(
      ([a]) => early.get(a)! + duration.get(a)!,
    );
    early.set(id, Math.max(0, ...preds));
  }
  const end = Math.max(...TASKS.map(([id, , d]) => early.get(id)! + d));
  const late = new Map<string, number>();
  for (const [id, , days] of [...TASKS].reverse()) {
    const succs = AFTER.filter(([a]) => a === id).map(([, b]) => late.get(b)!);
    late.set(id, Math.min(end, ...succs) - days);
  }
  const slack = new Map(
    TASKS.map(([id]) => [id, late.get(id)! - early.get(id)!]),
  );
  // walk the zero-slack chain from the first task to the last one
  const chain = [TASKS[0][0]];
  for (;;) {
    const last = chain[chain.length - 1];
    const next = AFTER.find(
      ([a, b]) =>
        a === last &&
        slack.get(b) === 0 &&
        early.get(b) === early.get(a)! + duration.get(a)!,
    );
    if (!next) break;
    chain.push(next[1]);
  }
  return { duration, early, slack, end, chain };
};
const PLAN = cpm();

export default function ProjectPlanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [selected, setSelected] = useState<string | null>(null);
  const plan = PLAN;
  const dates = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        day: "numeric",
        weekday: "short",
        timeZone: "UTC",
      }),
    [i18n.language],
  );
  const rangeOf = (id: string) => {
    const start = plan.early.get(id)!;
    return dates.formatRange(
      workday(start),
      workday(start + plan.duration.get(id)! - 1),
    );
  };

  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map(([id, phase, days]) => {
        const start = PLAN.early.get(id)!;
        return {
          id,
          label: t(\`planTasks.\${id}\`),
          group: phase,
          value: days,
          subtitle: dates.formatRange(
            workday(start),
            workday(start + days - 1),
          ),
        };
      }),
    [t, dates],
  );
  const edges = useMemo(
    (): GraphEdge[] => AFTER.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => PHASES.map((id) => ({ id, name: t(\`planPhases.\${id}\`) })),
    [t],
  );

  const slack = selected ? plan.slack.get(selected)! : 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        edgeStyle="orthogonal"
        criticalPath={plan.chain}
        highlight="none"
        selected={selected ? [selected] : []}
        interaction={{ select: false }}
        height={420}
        ariaLabel={t("planAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) {
            setSelected(event.id === selected ? null : event.id);
          }
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {selected
          ? t(slack === 0 ? "planCriticalTask" : "planTask", {
              name: t(\`planTasks.\${selected}\`),
              range: rangeOf(selected),
              days: plan.duration.get(selected),
              slack,
            })
          : t("planSummary", {
              days: plan.end,
              date: dates.format(workday(plan.end - 1)),
            })}
      </output>
    </div>
  );
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type InputCell = "price" | "quantity" | "discountRate";
type Cell =
  | InputCell
  | "taxRate"
  | "subtotal"
  | "discount"
  | "net"
  | "tax"
  | "shipping"
  | "total"
  | "unitCost";
type Kind = "input" | "formula";

// cell, address, kind, display format
const CELLS: [Cell, string, Kind, "currency" | "percent" | "integer"][] = [
  ["price", "B1", "input", "currency"],
  ["quantity", "B2", "input", "integer"],
  ["discountRate", "B3", "input", "percent"],
  ["taxRate", "B4", "input", "percent"],
  ["subtotal", "C1", "formula", "currency"],
  ["discount", "C2", "formula", "currency"],
  ["net", "C3", "formula", "currency"],
  ["tax", "C4", "formula", "currency"],
  ["shipping", "C5", "formula", "currency"],
  ["total", "D1", "formula", "currency"],
  ["unitCost", "D2", "formula", "currency"],
];

// precedent → dependent cell
const REFERENCES: [Cell, Cell][] = [
  ["price", "subtotal"],
  ["quantity", "subtotal"],
  ["subtotal", "discount"],
  ["discountRate", "discount"],
  ["subtotal", "net"],
  ["discount", "net"],
  ["net", "tax"],
  ["taxRate", "tax"],
  ["net", "shipping"],
  ["net", "total"],
  ["tax", "total"],
  ["shipping", "total"],
  ["total", "unitCost"],
  ["quantity", "unitCost"],
];

const KINDS: Kind[] = ["input", "formula"];
const INPUTS: InputCell[] = ["price", "quantity", "discountRate"];

const evaluate = (price: number, quantity: number, discountRate: number) => {
  const taxRate = 0.08;
  const subtotal = price * quantity;
  const discount = subtotal * discountRate;
  const net = subtotal - discount;
  const tax = net * taxRate;
  const shipping = net >= 500 ? 0 : 25;
  const total = net + tax + shipping;
  const unitCost = quantity > 0 ? total / quantity : 0;
  return {
    price,
    quantity,
    discountRate,
    taxRate,
    subtotal,
    discount,
    net,
    tax,
    shipping,
    total,
    unitCost,
  } satisfies Record<Cell, number>;
};

/** Cells that depend on \`cell\`, directly or not */
const dependents = (cell: Cell) => {
  const seen = new Set<Cell>();
  const queue = [cell];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of REFERENCES) {
      if (a === current && !seen.has(b)) {
        seen.add(b);
        queue.push(b);
      }
    }
  }
  return seen;
};

export default function SpreadsheetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [inputs, setInputs] = useState<Record<InputCell, string>>({
    price: "42",
    quantity: "12",
    discountRate: "10",
  });
  const [changed, setChanged] = useState<InputCell>("discountRate");
  const values = evaluate(
    Number(inputs.price) || 0,
    Number(inputs.quantity) || 0,
    (Number(inputs.discountRate) || 0) / 100,
  );
  const formats = useMemo(
    () => ({
      currency: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const nodes = CELLS.map(([id, address, kind, format]): GraphNode => ({
    id,
    label: \`\${address} · \${t(\`cells.\${id}\`)}\`,
    subtitle: formats[format].format(values[id]),
    group: kind,
  }));
  const edges = useMemo(
    (): GraphEdge[] =>
      REFERENCES.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(\`cellKinds.\${id}\`) })),
    [t],
  );
  const recalculated = [...dependents(changed)];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="end">
        {INPUTS.map((id) => (
          <label key={id} style={{ display: "grid", gap: 4 }}>
            <span>{t(\`cells.\${id}\`)}</span>
            <Input
              type="number"
              min={0}
              step={id === "price" ? 0.5 : 1}
              value={inputs[id]}
              style={{ width: 120 }}
              onChange={(event) => {
                setInputs({ ...inputs, [id]: event.target.value });
                setChanged(id);
              }}
            />
          </label>
        ))}
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        highlight="lineage"
        selected={[changed]}
        interaction={{ select: false }}
        animation={false}
        height={380}
        ariaLabel={t("spreadsheetAria")}
        onItemClick={(event) => {
          if (event.type === "node" && INPUTS.includes(event.id as InputCell)) {
            setChanged(event.id as InputCell);
          }
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("recalculated", {
          cell: t(\`cells.\${changed}\`),
          total: recalculated.length,
          list: new Intl.ListFormat(i18n.language).format(
            recalculated.map((id) => t(\`cells.\${id}\`)),
          ),
          value: formats.currency.format(values.total),
        })}
      </output>
    </div>
  );
}
`})))()}var $,pt,mt,ht;function gt(){return(gt=e((()=>{pe(),_e(),Ce(),De(),Ne(),ze(),We(),Xe(),Qe(),et(),nt(),it(),ot(),ct(),ut(),ft(),t(),i(),oe(),ee(),ce(),$=n(),pt=ae(Object.assign({"./demos/build-scheduler.tsx":le,"./demos/course-prerequisites.tsx":me,"./demos/impact-analysis.tsx":ve,"./demos/lineage.tsx":we,"./demos/packages.tsx":Oe,"./demos/pipeline.tsx":Pe,"./demos/project-plan.tsx":Be,"./demos/spreadsheet.tsx":Ge}),Object.assign({"./demos/build-scheduler.tsx":Ze,"./demos/course-prerequisites.tsx":$e,"./demos/impact-analysis.tsx":tt,"./demos/lineage.tsx":rt,"./demos/packages.tsx":at,"./demos/pipeline.tsx":st,"./demos/project-plan.tsx":lt,"./demos/spreadsheet.tsx":dt})),mt=`import { DependencyGraph } from "minerva-design/charts";
// pure layered layout, crossing count and critical path (no DOM)
import { dagLayout, countCrossings, criticalPath } from "minerva-design/charts/core";`,ht=()=>{let{t:e}=r(),t=(0,$.jsxs)(`section`,{className:_.section,"aria-labelledby":`dag-overview`,children:[(0,$.jsx)(`h2`,{id:`dag-overview`,children:e(`docs.dependency-graph.intro.overview.title`)}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.dependency-graph.intro.overview.text`)}),(0,$.jsxs)(`ul`,{className:_.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.layers`)}),(0,$.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.crossings`)}),(0,$.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.coordinates`)}),(0,$.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.highlight`)})]})]});return(0,$.jsx)(se,{id:`dependency-graph`,demos:pt,intro:t,importCode:mt})}})))()}gt();export{ht as default};