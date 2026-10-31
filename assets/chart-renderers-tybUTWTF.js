import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{c as a,s as o}from"./renderer.module-BadIvTUR.js";import{n as s,t as c}from"./useTranslation-eGG0J4pK.js";import{R as l,z as u}from"./ProgressIndicator-CQZAxIX3.js";import{i as d,n as f,r as p,t as m}from"./Radio-D2wZ9q6z.js";import{n as h,t as g}from"./Tag-C33GIXr-.js";import{n as _,t as v}from"./Switch-BCh7GKwc.js";import{n as y,t as b}from"./CodeBlock-C_riYUGn.js";import{n as x,t as S}from"./LoadingState-BQS_M-qo.js";import{c as C,i as ee,o as te,r as w}from"./DemoBlock-BXdX6oLT.js";import{i as T,o as ne,t as re}from"./Select-BIYfjWQ3.js";import{l as ie,n as E,t as D,u as ae}from"./DocPage-CHJwIegD.js";import{m as oe,r as se,u as ce,v as le,y as ue}from"./charts-JJDQ3gS7.js";import{n as de,r as fe,t as pe}from"./support-Byt-y1lb.js";var O,k,me,A,he,ge,_e,ve;function j(){return(j=e((()=>{O=[`webgpu`,`webgl2`,`webgl`,`canvas2d`],k={smooth:.4,stability:.2,headroom:.25,startup:.15},me=1e3,A=e=>Number.isFinite(e)?Math.min(1,Math.max(0,e)):0,he=(e,t)=>{let n=1e3/t,r={smooth:A(e.fps/t),stability:A(n/e.p95),headroom:A(1-e.work/n),startup:A(1-e.startup/me)},i=r.smooth*k.smooth+r.stability*k.stability+r.headroom*k.headroom+r.startup*k.startup;return{...r,total:Math.round(i*100)}},ge=e=>e>=85?`excellent`:e>=65?`good`:e>=40?`fair`:`poor`,_e=()=>new Promise(e=>{let t=[],n=r=>{if(t.push(r),t.length<25){requestAnimationFrame(n);return}let i=t.slice(1).map((e,n)=>e-t[n]).sort((e,t)=>e-t),a=i[i.length>>1]??1e3/60;e(Math.min(240,Math.max(30,Math.round(1e3/a))))};requestAnimationFrame(n)}),ve=(e,t)=>e[Math.min(e.length-1,Math.floor(e.length*t))]??0})))()}var ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,M;function N(){return(N=e((()=>{ye=`_stage_1997c_1`,be=`_toolbar_1997c_10`,xe=`_spacer_1997c_19`,Se=`_body_1997c_23`,Ce=`_live_1997c_29`,we=`_placeholder_1997c_34`,Te=`_footer_1997c_46`,Ee=`_hint_1997c_61`,De=`_mono_1997c_65`,Oe=`_excellent_1997c_70`,ke=`_good_1997c_75`,Ae=`_fair_1997c_79`,je=`_poor_1997c_83`,Me=`_fallback_1997c_87`,Ne=`_cards_1997c_91`,Pe=`_card_1997c_91`,Fe=`_cardBest_1997c_123`,Ie=`_log_1997c_127`,Le=`_wrap_1997c_143`,M={stage:ye,toolbar:be,spacer:xe,body:Se,live:Ce,placeholder:we,footer:Te,hint:Ee,mono:De,excellent:Oe,good:ke,fair:Ae,poor:je,fallback:Me,cards:Ne,card:Pe,cardBest:Fe,log:Ie,wrap:Le}})))()}var Re,ze,P;function F(){return(F=e((()=>{c(),j(),N(),Re=e=>({excellent:M.excellent,good:M.good,fair:M.fair,poor:M.poor})[ge(e)],ze=e=>e>=50?M.good:e>=25?M.fair:M.poor,P=()=>{let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.chart-renderers.data`}),n=new Intl.NumberFormat(t.language),r=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:1}),i=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),a=new Intl.NumberFormat(t.language,{style:`unit`,unit:`gigabyte`,maximumFractionDigits:1}),o=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:0});return{count:e=>n.format(Math.round(e)),compact:e=>r.format(e),decimal:e=>i.format(e),ms:t=>e(`ms`,{value:t<100?i.format(t):n.format(Math.round(t))}),fps:t=>e(`fps`,{value:n.format(Math.round(t))}),gigabytes:e=>a.format(e/1024**3),percent:e=>o.format(e),renderer:t=>e(`renderers.${t}`)}}})))()}function Be(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Ve,I,He,L,Ue,We,Ge,Ke,R,qe,Je;function z(){return(z=e((()=>{Ve=[`line`,`scatter`,`bars`],I={line:[1e4,1e5,1e6,2e6],scatter:[1e4,1e5,1e6,2e6],bars:[1e3,1e4,1e5,2e5]},He=4,L=8,Ue=Date.UTC(2026,0,1),We=(e,t)=>{let n=Math.max(2,Math.round(e/He)),r=Be(11),i=new Float64Array(n);for(let e=0;e<n;e++)i[e]=Ue+e*1e3;return Array.from({length:He},(e,a)=>{let o=new Float64Array(n),s=0;for(let e=0;e<n;e++)s+=(r()-.5)*.6,s*=.999,o[e]=20+a*12+s+4*Math.sin(e/n*18+a);return{id:`signal-${a}`,name:t(a+1),data:{x:i,y:o},lineWidth:1}})},Ge=(e,t)=>{let n=Be(23),r=()=>Math.sqrt(-2*Math.log(1-n()))*Math.cos(2*Math.PI*n()),i=Math.max(1,Math.round(e/L)),a=e>2e5?2:e>2e4?3:5;return Array.from({length:L},(e,n)=>{let o=n/L*2*Math.PI,s=50+28*Math.cos(o),c=50+28*Math.sin(o),l=4+n%3*2,u=new Float64Array(i),d=new Float64Array(i);for(let e=0;e<i;e++)u[e]=s+r()*l,d[e]=c+r()*l;return{id:`cluster-${n}`,name:t(n+1),type:`scatter`,data:{x:u,y:d},pointSize:a,opacity:.6}})},Ke=(e,t)=>{let n=Be(37),r=new Float64Array(e),i=new Float64Array(e);for(let t=0;t<e;t++)r[t]=t,i[t]=40+30*Math.sin(t/e*12)+n()*25;return[{id:`bars`,name:t(1),type:`bar`,data:{x:r,y:i}}]},R=(e,t,n)=>e===`line`?We(t,n):e===`scatter`?Ge(t,n):Ke(t,n),qe={line:200,scatter:20,bars:100},Je=(e,t,n,r)=>{let i=t/n*2*Math.PI,a=1+(qe[e]-1)*(1-Math.cos(i))/2,o=([e,t],n)=>{let r=(t-e)/a,i=(t-e-r)/2,o=(e+t)/2+i*.8*n;return[o-r/2,o+r/2]};return{x:o(r.x,Math.sin(i*1.5)),y:e===`scatter`?o(r.y,Math.cos(i*1.5)):r.y}}})))()}function Ye(e){let[t,n]=(0,B.useState)(null),[r,i]=(0,B.useState)([]),[a,o]=(0,B.useState)(60),[s,c]=(0,B.useState)(!1),[l,u]=(0,B.useState)(0),d=(0,B.useRef)([]),f=(0,B.useRef)(new Map),p=(0,B.useRef)(0),m=(0,B.useRef)(void 0),h=(0,B.useRef)(e);(0,B.useEffect)(()=>{h.current=e}),(0,B.useEffect)(()=>()=>{clearTimeout(m.current),d.current=[]},[]);let g=(0,B.useCallback)(()=>{let e=d.current.shift();if(!e){n(null),c(!1);return}let t=`${e.workload}:${e.count}`,r=f.current.get(t);r||(r=R(e.workload,e.count,t=>h.current(e.workload,t)),f.current.set(t,r)),n({job:e,series:r,startedAt:performance.now(),run:++p.current})},[]);return{active:t,results:r,refresh:a,running:s,planned:l,start:(0,B.useCallback)(async e=>{clearTimeout(m.current),i([]),c(!0),u(e.length),d.current=[...e],o(await _e()),g()},[g]),stop:(0,B.useCallback)(()=>{clearTimeout(m.current),d.current=[],n(null),c(!1)},[]),onDone:(0,B.useCallback)(e=>{i(t=>[...t,e]),n(null),m.current=setTimeout(g,300)},[g])}}var B;function Xe(){return(Xe=e((()=>{B=t(),j(),z()})))()}function Ze({job:e,series:t,startedAt:n,refresh:r,height:i,ariaLabel:a,onDrawn:o,onDone:s}){let c=(0,V.useRef)(null),l=(0,V.useRef)(null),u=(0,V.useRef)(s);return(0,V.useEffect)(()=>{u.current=s}),(0,V.useEffect)(()=>{let t=0,i=!1,a=0,o=0,s=null,d=0,f=0,p=[],m=0,h=0,g=new MessageChannel;g.port1.onmessage=e=>{let[t,r]=e.data,i=performance.now();r?a=i-n:(m+=i-t,h++)};let _=n=>{if(i)return;i=!0,cancelAnimationFrame(t);let o=f-d,s=[...p].sort((e,t)=>e-t),c={startup:a,fps:o>0?p.length*1e3/o:0,p50:ve(s,.5),p95:ve(s,.95),work:h?m/h:0,frames:p.length};setTimeout(()=>{u.current({...c,job:e,drawn:l.current,status:n,refresh:r,score:n===`timeout`?{smooth:0,stability:0,headroom:0,startup:0,total:0}:he(c,r)})},0)},v=r=>{t=requestAnimationFrame(v);let i=c.current?.getInstance();if(!l.current||!i){performance.now()-n>$e&&_(`timeout`);return}if(!a&&o===0){g.port2.postMessage([r,!0]),o++;return}if(o<et){o++;return}if(!s){i.resetZoom(),s=i.getView(),d=r,f=r;return}p.push(r-f);let u=r-f>tt;f=r,g.port2.postMessage([r,!1]),i.setView(Je(e.workload,(r-d)/1e3,e.duration/1e3,s)),u?_(`slow`):r-d>=e.duration&&_(`ok`)};return t=requestAnimationFrame(v),()=>{i=!0,cancelAnimationFrame(t),g.port1.close(),g.port2.close()}},[e,n,r]),(0,Qe.jsx)(ue,{ref:c,series:t,renderer:e.backend,onRendererChange:e=>{l.current=e,o?.(e)},legend:!1,tooltip:!1,interaction:!1,xAxis:e.workload===`line`?{type:`time`}:void 0,height:i,ariaLabel:a})}var V,Qe,$e,et,tt;function nt(){return(nt=e((()=>{V=t(),le(),j(),z(),Qe=n(),$e=15e3,et=5,tt=2e3})))()}function rt(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-renderers.data`}),t=P(),[n,r]=(0,H.useState)(`line`),[i,a]=(0,H.useState)(1e6),[o,c]=(0,H.useState)(3e3),[l,f]=(0,H.useState)(!1),[p,h]=(0,H.useState)([]),[g,_]=(0,H.useState)(!1),y=Ye((t,n)=>e(`series.${t}`,{index:n})),{active:b,results:x,refresh:S,running:C,planned:ee}=y,w=async()=>{let e=await fe(),r=l?[]:O.filter(t=>e[t]===`software`);h(r.map(t.renderer)),_(!1),y.start(O.filter(e=>!r.includes(e)).map(e=>({backend:e,workload:n,count:i,duration:o})))},T=n=>n.drawn&&n.drawn!==n.job.backend?e(`fellBack`,{requested:t.renderer(n.job.backend),backend:t.renderer(n.drawn)}):t.renderer(n.job.backend),ie=x.reduce((e,t)=>!e||t.score.total>e.score.total?t:e,null),E=x.find(e=>e.job.backend===`canvas2d`&&e.status===`ok`),D=[{key:`backend`,header:e(`col.backend`),render:e=>T(e)},{key:`score`,header:e(`col.score`),align:`right`,render:e=>(0,U.jsx)(`span`,{className:`${M.mono} ${Re(e.score.total)}`,children:e.score.total})},{key:`fps`,header:e(`col.fps`),align:`right`,render:e=>(0,U.jsx)(`span`,{className:`${M.mono} ${ze(e.fps)}`,children:t.count(e.fps)})},{key:`p50`,header:e(`col.p50`),align:`right`,render:e=>(0,U.jsx)(`span`,{className:M.mono,children:t.ms(e.p50)})},{key:`p95`,header:e(`col.p95`),align:`right`,render:e=>(0,U.jsx)(`span`,{className:M.mono,children:t.ms(e.p95)})},{key:`work`,header:e(`col.work`),align:`right`,render:e=>(0,U.jsx)(`span`,{className:M.mono,children:t.ms(e.work)})},{key:`startup`,header:e(`col.startup`),align:`right`,render:e=>(0,U.jsx)(`span`,{className:M.mono,children:t.ms(e.startup)})},{key:`status`,header:e(`col.status`),render:t=>e(`status.${t.status}`)}],ae=at.map(t=>({name:e(`parts.${t}`,{weight:k[t]*100}),data:x.map(e=>[T(e),Math.round(e.score[t]*k[t]*1e3)/10])}));return(0,U.jsxs)(`div`,{className:M.stage,children:[(0,U.jsxs)(`div`,{className:M.toolbar,children:[(0,U.jsx)(d,{"aria-label":e(`workload`),direction:`horizontal`,size:`small`,value:n,disabled:C,onChange:e=>{let t=e;r(t),a(I[t][2]??I[t][0])},children:Ve.map(t=>(0,U.jsx)(m,{value:t,label:e(`workloads.${t}`)},t))}),(0,U.jsx)(ne,{size:`small`,style:{width:150},"aria-label":e(`points`),value:String(i),disabled:C,onChange:e=>a(Number(e)),children:I[n].map(n=>(0,U.jsx)(re,{value:String(n),children:e(`pointsValue`,{value:t.compact(n)})},n))}),(0,U.jsx)(ne,{size:`small`,style:{width:120},"aria-label":e(`duration`),value:String(o),disabled:C,onChange:e=>c(Number(e)),children:it.map(t=>(0,U.jsx)(re,{value:String(t),children:e(`seconds`,{value:t/1e3})},t))}),(0,U.jsx)(v,{size:`small`,checked:l,disabled:C,onChange:f,label:e(`includeSoftware`)}),(0,U.jsx)(`span`,{className:M.spacer}),C?(0,U.jsx)(u,{size:`small`,variant:`outline`,onClick:y.stop,children:e(`stop`)}):(0,U.jsx)(u,{size:`small`,onClick:()=>void w(),children:e(`runAll`)})]}),(0,U.jsxs)(`div`,{className:M.body,children:[(0,U.jsx)(`div`,{className:M.live,children:b?(0,U.jsx)(Ze,{job:b.job,series:b.series,startedAt:b.startedAt,refresh:S,height:260,ariaLabel:e(`liveAria`,{backend:t.renderer(b.job.backend),count:t.compact(b.job.count)}),onDone:y.onDone},b.run):(0,U.jsx)(`div`,{className:M.placeholder,children:C?e(`between`):x.length?e(`doneHint`):e(`idle`)})}),x.length>0&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`dl`,{className:M.cards,children:x.map(n=>(0,U.jsxs)(`div`,{className:`${M.card} ${!C&&n===ie?M.cardBest:``}`,children:[(0,U.jsx)(`dt`,{children:T(n)}),(0,U.jsx)(`dd`,{className:Re(n.score.total),children:e(`scoreValue`,{value:n.score.total})}),(0,U.jsxs)(`small`,{children:[e(`grades.${ge(n.score.total)}`),E&&n!==E&&n.work>0?` · ${e(`vsCanvas`,{value:t.percent(n.work/E.work)})}`:``]})]},n.job.backend))}),(0,U.jsx)(te,{"aria-label":e(`tableAria`),size:`small`,columns:D,data:x,rowKey:e=>e.job.backend}),!C&&(0,U.jsx)(ce,{series:ae,stacked:!0,renderer:`canvas2d`,yAxis:{min:0,max:100},height:60+x.length*44,ariaLabel:e(`breakdownAria`)})]})]}),(0,U.jsxs)(`div`,{className:M.footer,children:[(0,U.jsxs)(`p`,{role:`status`,children:[b?e(`measuring`,{backend:t.renderer(b.job.backend),index:x.length+1,total:ee}):C?e(`preparing`):x.length?e(g?`copied`:`done`):e(`ready`),p.length>0&&` ${e(`skippedNote`,{backends:p.join(`, `)})}`]}),(0,U.jsx)(`p`,{className:M.hint,children:e(`refreshNote`,{value:S,budget:t.decimal(1e3/S)})}),!C&&x.length>0&&(0,U.jsx)(u,{size:`xsmall`,variant:`outline`,onClick:()=>{let r=`| ${D.map(e=>e.header).join(` | `)} |`,a=`|${D.map(()=>` --- |`).join(``)}`,o=x.map(n=>`| ${T(n)} | ${n.score.total} | ${t.count(n.fps)} | ${t.ms(n.p50)} | ${t.ms(n.p95)} | ${t.ms(n.work)} | ${t.ms(n.startup)} | ${e(`status.${n.status}`)} |`),s=e(`copyTitle`,{workload:e(`workloads.${n}`),count:t.compact(i),refresh:S});navigator.clipboard?.writeText([s,``,r,a,...o].join(`
`)).then(()=>_(!0))},children:e(`copy`)})]})]})}var H,U,it,at;function ot(){return(ot=e((()=>{H=t(),c(),l(),f(),p(),T(),_(),C(),oe(),de(),F(),Xe(),j(),nt(),z(),N(),U=n(),it=[2e3,3e3,5e3],at=[`smooth`,`stability`,`headroom`,`startup`]})))()}var W,st,ct,lt,ut;function dt(){return(dt=e((()=>{W={device:null,version:null,maxTexture:null,maxBuffer:null,instancing:null},st=e=>{let t;try{let n=document.createElement(`canvas`);t=e===`webgl2`?n.getContext(`webgl2`):n.getContext(`webgl`)}catch{t=null}if(!t)return null;let n=t.getExtension(`WEBGL_debug_renderer_info`),r=n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER),i={...W,device:r?String(r):null,version:`${String(t.getParameter(t.VERSION))} · ${String(t.getParameter(t.SHADING_LANGUAGE_VERSION))}`,maxTexture:Number(t.getParameter(t.MAX_TEXTURE_SIZE))||null,instancing:e!==`webgl`||!!t.getExtension(`ANGLE_instanced_arrays`)};return t.getExtension(`WEBGL_lose_context`)?.loseContext(),i},ct=async()=>{let e=navigator.gpu;if(!e)return null;let t;try{t=await e.requestAdapter()}catch{t=null}if(!t)return null;let{vendor:n,architecture:r,description:i}=t.info??{},a=[n,r].filter(Boolean).join(` · `);return{...W,device:i||a||null,version:`WebGPU · WGSL`,maxTexture:t.limits?.maxTextureDimension2D??null,maxBuffer:t.limits?.maxBufferSize??null}},lt=null,ut=()=>(lt||=ct().then(e=>({webgpu:e,webgl2:st(`webgl2`),webgl:st(`webgl`),canvas2d:{...W,version:`CanvasRenderingContext2D`}})),lt)})))()}function ft(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-renderers.data`}),t=P(),[n,r]=(0,G.useState)(null),[i,a]=(0,G.useState)(null);if((0,G.useEffect)(()=>{let e=!1;return Promise.all([fe(),ut()]).then(([t,n])=>{e||(r(t),a(n))}),()=>{e=!0}},[]),!n||!i)return(0,K.jsx)(x,{size:`small`,style:{height:240},label:e(`env.probing`)});let o=pe(n),c=O.map(e=>({kind:e,support:n[e]})),l=[{key:`backend`,header:e(`env.backend`),render:n=>(0,K.jsxs)(`span`,{style:{display:`inline-flex`,gap:6,alignItems:`center`},children:[(0,K.jsx)(`strong`,{children:t.renderer(n.kind)}),n.kind===o&&(0,K.jsx)(g,{size:`small`,color:`primary`,variant:`solid`,children:e(`env.autoTag`)})]})},{key:`status`,header:e(`env.status`),render:t=>(0,K.jsx)(g,{size:`small`,color:pt[t.support],children:t.kind===`canvas2d`?e(`env.cpu`):e(`env.support.${t.support}`)})},{key:`device`,header:e(`env.device`),render:t=>(0,K.jsx)(`span`,{className:M.wrap,children:t.kind===`canvas2d`?e(`env.cpuDevice`):i[t.kind]?.device??`–`})},{key:`version`,header:e(`env.version`),render:e=>(0,K.jsx)(`span`,{className:M.wrap,children:i[e.kind]?.version??`–`})},{key:`limits`,header:e(`env.limits`),render:n=>{let r=i[n.kind];if(!r)return`–`;let a=[];return r.maxTexture&&a.push(e(`env.maxTexture`,{value:t.count(r.maxTexture)})),r.maxBuffer&&a.push(e(`env.maxBuffer`,{value:t.gigabytes(r.maxBuffer)})),r.instancing===!1&&a.push(e(`env.noInstancing`)),a.length?a.join(` · `):`–`}}],u=typeof isSecureContext==`boolean`&&isSecureContext;return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(`dl`,{className:M.cards,children:[(0,K.jsxs)(`div`,{className:`${M.card} ${M.cardBest}`,children:[(0,K.jsx)(`dt`,{children:e(`env.autoPick`)}),(0,K.jsx)(`dd`,{children:t.renderer(o)}),(0,K.jsx)(`small`,{children:e(`env.autoWhy.${o}`)})]}),(0,K.jsxs)(`div`,{className:M.card,children:[(0,K.jsx)(`dt`,{children:e(`env.secure`)}),(0,K.jsx)(`dd`,{children:e(u?`env.yes`:`env.no`)}),(0,K.jsx)(`small`,{children:e(`env.secureNote`)})]}),(0,K.jsxs)(`div`,{className:M.card,children:[(0,K.jsx)(`dt`,{children:e(`env.dpr`)}),(0,K.jsx)(`dd`,{children:t.decimal(window.devicePixelRatio||1)}),(0,K.jsx)(`small`,{children:e(`env.dprNote`)})]}),(0,K.jsxs)(`div`,{className:M.card,children:[(0,K.jsx)(`dt`,{children:e(`env.threads`)}),(0,K.jsx)(`dd`,{children:navigator.hardwareConcurrency||`–`}),(0,K.jsx)(`small`,{children:e(`env.threadsNote`)})]})]}),(0,K.jsx)(te,{"aria-label":e(`env.tableAria`),size:`small`,columns:l,data:c,rowKey:e=>e.kind}),(0,K.jsx)(`p`,{className:M.hint,style:{margin:0,fontSize:13},children:e(`env.note`)})]})}var G,K,pt;function mt(){return(mt=e((()=>{G=t(),c(),S(),C(),h(),de(),dt(),F(),j(),N(),K=n(),pt={hardware:`success`,software:`warning`,missing:`neutral`}})))()}function ht(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-renderers.data`}),t=P(),n=(0,q.useRef)(null),[r,i]=(0,q.useState)(0),[a,o]=(0,q.useState)(null),[c,l]=(0,q.useState)([]),[d,f]=(0,q.useState)([]),[p,m]=(0,q.useState)(!1),h=(0,q.useRef)(0),_=(0,q.useMemo)(()=>R(`line`,gt,t=>e(`series.line`,{index:t})),[e]),v=e=>f(t=>[{id:(t[0]?.id??0)+1,text:e},...t].slice(0,8));return(0,J.jsxs)(`div`,{className:M.stage,ref:n,children:[(0,J.jsxs)(`div`,{className:M.toolbar,children:[(0,J.jsx)(`span`,{style:{display:`flex`,flexWrap:`wrap`,gap:6},children:O.map(n=>(0,J.jsx)(g,{size:`small`,color:n===a?`success`:c.includes(n)?`danger`:`neutral`,variant:n===a?`solid`:`subtle`,children:c.includes(n)?e(`chainLost`,{backend:t.renderer(n)}):t.renderer(n)},n))}),(0,J.jsx)(`span`,{className:M.spacer}),(0,J.jsx)(u,{size:`small`,disabled:!a||a===`canvas2d`,onClick:()=>{if(a&&a!==`canvas2d`){if(h.current=performance.now(),!_t(n.current,a)){m(!0);return}l(e=>[...e,a]),v(e(`lostEntry`,{backend:t.renderer(a)}))}},children:e(`loseGpu`)}),(0,J.jsx)(u,{size:`small`,variant:`outline`,onClick:()=>{i(e=>e+1),o(null),l([]),f([]),m(!1)},children:e(`restart`)})]}),(0,J.jsxs)(`div`,{className:M.body,children:[(0,J.jsx)(ue,{series:_,renderer:`webgpu`,onRendererChange:n=>{o(n),v(h.current?e(`fallbackEntry`,{backend:t.renderer(n),ms:t.ms(performance.now()-h.current)}):e(`startEntry`,{backend:t.renderer(n)})),h.current=0},legend:!1,xAxis:{type:`time`},height:240,ariaLabel:e(`fallbackAria`,{count:t.compact(gt)})},r),(0,J.jsx)(`ol`,{className:M.log,"aria-label":e(`fallbackLog`),children:d.map(e=>(0,J.jsx)(`li`,{children:e.text},e.id))})]}),(0,J.jsxs)(`div`,{className:M.footer,children:[(0,J.jsx)(`p`,{role:`status`,children:p?e(`cannotLose`,{backend:a?t.renderer(a):``}):a===`canvas2d`?e(`chainEnd`):a?e(`fallbackStatus`,{backend:t.renderer(a)}):e(`starting`)}),(0,J.jsx)(`p`,{className:M.hint,children:e(`fallbackHint`)})]})]})}var q,J,gt,_t;function vt(){return(vt=e((()=>{q=t(),c(),l(),h(),le(),F(),j(),z(),N(),J=n(),gt=1e5,_t=(e,t)=>{let n=e?.querySelector(`canvas.minerva-chart-data`);if(!n)return!1;if(t===`webgpu`){let e=n.getContext(`webgpu`)?.getConfiguration?.()?.device;return e?(e.destroy(),!0):!1}if(t===`webgl2`||t===`webgl`){let e=n.getContext(t)?.getExtension(`WEBGL_lose_context`);return e?(e.loseContext(),!0):!1}return!1}})))()}function yt(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-renderers.data`}),t=P(),[n,r]=(0,bt.useState)(`line`),[i,a]=(0,bt.useState)(`line`),o=Ye((t,n)=>e(`series.${t}`,{index:n})),{active:c,results:l,running:f,planned:p}=o,h=async()=>{let e=await fe(),t=O.filter(t=>e[t]!==`software`);a(n),o.start(t.flatMap(e=>I[n].map(t=>({backend:e,workload:n,count:t,duration:xt}))))},g=e=>O.map(n=>{let r=l.filter(e=>e.job.backend===n&&e.status!==`timeout`);return r.length?{id:n,name:t.renderer(n),data:r.map(t=>[t.job.count,e(t.fps,t.work)])}:null}).filter(e=>e!==null),_={type:`log`,title:e(`pointsAxis`),format:e=>t.compact(e)};return(0,Y.jsxs)(`div`,{className:M.stage,children:[(0,Y.jsxs)(`div`,{className:M.toolbar,children:[(0,Y.jsxs)(d,{"aria-label":e(`workload`),direction:`horizontal`,size:`small`,value:n,disabled:f,onChange:e=>r(e),children:[(0,Y.jsx)(m,{value:`line`,label:e(`workloads.line`)}),(0,Y.jsx)(m,{value:`scatter`,label:e(`workloads.scatter`)})]}),(0,Y.jsx)(`span`,{className:M.spacer}),f?(0,Y.jsx)(u,{size:`small`,variant:`outline`,onClick:o.stop,children:e(`stop`)}):(0,Y.jsx)(u,{size:`small`,onClick:()=>void h(),children:e(`runScaling`)})]}),(0,Y.jsxs)(`div`,{className:M.body,children:[f&&(0,Y.jsx)(`div`,{className:M.live,style:{minHeight:180},children:c?(0,Y.jsx)(Ze,{job:c.job,series:c.series,startedAt:c.startedAt,refresh:o.refresh,height:180,ariaLabel:e(`liveAria`,{backend:t.renderer(c.job.backend),count:t.compact(c.job.count)}),onDone:o.onDone},c.run):(0,Y.jsx)(`div`,{className:M.placeholder,style:{height:180},children:e(`between`)})}),!f&&l.length===0&&(0,Y.jsx)(`div`,{className:M.placeholder,children:e(`scalingIdle`)}),l.length>0&&(0,Y.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:12},children:[(0,Y.jsx)(se,{series:g(e=>Math.round(e)),renderer:`canvas2d`,xAxis:_,yAxis:{min:0,title:e(`fpsAxis`)},height:260,ariaLabel:e(`scalingFpsAria`,{workload:e(`workloads.${i}`)})}),(0,Y.jsx)(se,{series:g((e,t)=>Math.max(.1,t)),renderer:`canvas2d`,xAxis:_,yAxis:{type:`log`,title:e(`workAxis`),format:e=>t.ms(e)},height:260,ariaLabel:e(`scalingWorkAria`,{workload:e(`workloads.${i}`)})})]})]}),(0,Y.jsxs)(`div`,{className:M.footer,children:[(0,Y.jsx)(`p`,{role:`status`,children:c?e(`scalingMeasuring`,{backend:t.renderer(c.job.backend),count:t.compact(c.job.count),index:l.length+1,total:p}):f?e(`preparing`):l.length?e(`scalingDone`):e(`ready`)}),(0,Y.jsx)(`p`,{className:M.hint,children:e(`scalingHint`)})]})]})}var bt,Y,xt;function St(){return(St=e((()=>{bt=t(),c(),l(),f(),p(),oe(),de(),F(),Xe(),j(),nt(),z(),N(),Y=n(),xt=1500})))()}function Ct(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-renderers.data`}),t=P(),[n,r]=(0,X.useState)(`auto`),[i,a]=(0,X.useState)(null),[o,c]=(0,X.useState)([]),l=(0,X.useRef)({requested:`auto`,at:0}),u=(0,X.useMemo)(()=>R(`line`,Tt,t=>e(`series.line`,{index:t})),[e]);return(0,X.useEffect)(()=>{l.current.at=performance.now()},[]),(0,Z.jsxs)(`div`,{className:M.stage,children:[(0,Z.jsx)(`div`,{className:M.toolbar,children:(0,Z.jsx)(d,{"aria-label":e(`preference`),direction:`horizontal`,size:`small`,value:n,onChange:e=>{let t=e;l.current={requested:t,at:performance.now()},r(t)},children:wt.map(e=>(0,Z.jsx)(m,{value:e,label:t.renderer(e)},e))})}),(0,Z.jsxs)(`div`,{className:M.body,children:[(0,Z.jsx)(ue,{series:u,renderer:n,onRendererChange:e=>{let{requested:t,at:n}=l.current;a(e),c(r=>[{id:(r[0]?.id??0)+1,requested:t,drawn:e,ms:performance.now()-n},...r].slice(0,8))},legend:!1,xAxis:{type:`time`},height:240,ariaLabel:e(`switchAria`,{count:t.compact(Tt)})}),(0,Z.jsx)(`ol`,{className:M.log,"aria-label":e(`switchLog`),children:o.map(n=>(0,Z.jsx)(`li`,{children:n.requested===n.drawn?e(`switchEntry`,{backend:t.renderer(n.drawn),ms:t.ms(n.ms)}):e(`switchEntryOther`,{requested:t.renderer(n.requested),backend:t.renderer(n.drawn),ms:t.ms(n.ms)})},n.id))})]}),(0,Z.jsxs)(`div`,{className:M.footer,children:[(0,Z.jsx)(`p`,{role:`status`,children:i?e(`switchStatus`,{backend:t.renderer(i)}):e(`starting`)}),(0,Z.jsx)(`p`,{className:M.hint,children:e(`switchHint`)})]})]})}var X,Z,wt,Tt;function Et(){return(Et=e((()=>{X=t(),c(),f(),p(),le(),F(),z(),N(),Z=n(),wt=[`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`],Tt=2e5})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Table,
  type TableColumn,
} from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";
import { probeBackends, type BackendsSupport } from "../../../renderer/support";
import { fpsClass, scoreClass, useBenchFormat } from "../bench/format";
import { useBenchQueue } from "../bench/queue";
import { BACKENDS, WEIGHTS, gradeOf, type BenchResult } from "../bench/score";
import { BenchStage } from "../bench/stage";
import { COUNTS, WORKLOADS, type Workload } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const DURATIONS = [2000, 3000, 5000];
const PARTS = ["smooth", "stability", "headroom", "startup"] as const;

export default function BenchmarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [workload, setWorkload] = useState<Workload>("line");
  const [count, setCount] = useState(1_000_000);
  const [duration, setDuration] = useState(3000);
  const [software, setSoftware] = useState(false);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const bench = useBenchQueue((kind, index) => t(\`series.\${kind}\`, { index }));
  const { active, results, refresh, running, planned } = bench;

  const run = async () => {
    const support: BackendsSupport = await probeBackends();
    const skip = software
      ? []
      : BACKENDS.filter((kind) => support[kind] === "software");
    setSkipped(skip.map(text.renderer));
    setCopied(false);
    void bench.start(
      BACKENDS.filter((kind) => !skip.includes(kind)).map((backend) => ({
        backend,
        workload,
        count,
        duration,
      })),
    );
  };

  const name = (result: BenchResult) =>
    result.drawn && result.drawn !== result.job.backend
      ? t("fellBack", {
          requested: text.renderer(result.job.backend),
          backend: text.renderer(result.drawn),
        })
      : text.renderer(result.job.backend);

  const best = results.reduce<BenchResult | null>(
    (top, result) =>
      !top || result.score.total > top.score.total ? result : top,
    null,
  );
  const canvas = results.find(
    (result) => result.job.backend === "canvas2d" && result.status === "ok",
  );

  const columns: TableColumn<BenchResult>[] = [
    { key: "backend", header: t("col.backend"), render: (r) => name(r) },
    {
      key: "score",
      header: t("col.score"),
      align: "right",
      render: (r) => (
        <span className={\`\${styles.mono} \${scoreClass(r.score.total)}\`}>
          {r.score.total}
        </span>
      ),
    },
    {
      key: "fps",
      header: t("col.fps"),
      align: "right",
      render: (r) => (
        <span className={\`\${styles.mono} \${fpsClass(r.fps)}\`}>
          {text.count(r.fps)}
        </span>
      ),
    },
    {
      key: "p50",
      header: t("col.p50"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.p50)}</span>,
    },
    {
      key: "p95",
      header: t("col.p95"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.p95)}</span>,
    },
    {
      key: "work",
      header: t("col.work"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.work)}</span>,
    },
    {
      key: "startup",
      header: t("col.startup"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.startup)}</span>,
    },
    {
      key: "status",
      header: t("col.status"),
      render: (r) => t(\`status.\${r.status}\`),
    },
  ];

  // the score of each backend, split into its weighted parts
  const breakdown: ChartSeries[] = PARTS.map((part) => ({
    name: t(\`parts.\${part}\`, { weight: WEIGHTS[part] * 100 }),
    data: results.map(
      (r) =>
        [
          name(r),
          Math.round(r.score[part] * WEIGHTS[part] * 1000) / 10,
        ] as const,
    ),
  }));

  const copy = () => {
    const header = \`| \${columns.map((c) => c.header).join(" | ")} |\`;
    const rule = \`|\${columns.map(() => " --- |").join("")}\`;
    const lines = results.map(
      (r) =>
        \`| \${name(r)} | \${r.score.total} | \${text.count(r.fps)} | \${text.ms(r.p50)} | \${text.ms(r.p95)} | \${text.ms(r.work)} | \${text.ms(r.startup)} | \${t(\`status.\${r.status}\`)} |\`,
    );
    const title = t("copyTitle", {
      workload: t(\`workloads.\${workload}\`),
      count: text.compact(count),
      refresh,
    });
    void navigator.clipboard
      ?.writeText([title, "", header, rule, ...lines].join("\\n"))
      .then(() => setCopied(true));
  };

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("workload")}
          direction="horizontal"
          size="small"
          value={workload}
          disabled={running}
          onChange={(value) => {
            const next = value as Workload;
            setWorkload(next);
            setCount(COUNTS[next][2] ?? COUNTS[next][0]!);
          }}
        >
          {WORKLOADS.map((kind) => (
            <Radio key={kind} value={kind} label={t(\`workloads.\${kind}\`)} />
          ))}
        </RadioGroup>
        <Select
          size="small"
          style={{ width: 150 }}
          aria-label={t("points")}
          value={String(count)}
          disabled={running}
          onChange={(value) => setCount(Number(value))}
        >
          {COUNTS[workload].map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("pointsValue", { value: text.compact(value) })}
            </SelectItem>
          ))}
        </Select>
        <Select
          size="small"
          style={{ width: 120 }}
          aria-label={t("duration")}
          value={String(duration)}
          disabled={running}
          onChange={(value) => setDuration(Number(value))}
        >
          {DURATIONS.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("seconds", { value: value / 1000 })}
            </SelectItem>
          ))}
        </Select>
        <Switch
          size="small"
          checked={software}
          disabled={running}
          onChange={setSoftware}
          label={t("includeSoftware")}
        />
        <span className={styles.spacer} />
        {running ? (
          <Button size="small" variant="outline" onClick={bench.stop}>
            {t("stop")}
          </Button>
        ) : (
          <Button size="small" onClick={() => void run()}>
            {t("runAll")}
          </Button>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.live}>
          {active ? (
            <BenchStage
              key={active.run}
              job={active.job}
              series={active.series}
              startedAt={active.startedAt}
              refresh={refresh}
              height={260}
              ariaLabel={t("liveAria", {
                backend: text.renderer(active.job.backend),
                count: text.compact(active.job.count),
              })}
              onDone={bench.onDone}
            />
          ) : (
            <div className={styles.placeholder}>
              {running
                ? t("between")
                : results.length
                  ? t("doneHint")
                  : t("idle")}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <>
            <dl className={styles.cards}>
              {results.map((r) => (
                <div
                  key={r.job.backend}
                  className={\`\${styles.card} \${!running && r === best ? styles.cardBest : ""}\`}
                >
                  <dt>{name(r)}</dt>
                  <dd className={scoreClass(r.score.total)}>
                    {t("scoreValue", { value: r.score.total })}
                  </dd>
                  <small>
                    {t(\`grades.\${gradeOf(r.score.total)}\`)}
                    {canvas && r !== canvas && r.work > 0
                      ? \` · \${t("vsCanvas", { value: text.percent(r.work / canvas.work) })}\`
                      : ""}
                  </small>
                </div>
              ))}
            </dl>
            <Table
              aria-label={t("tableAria")}
              size="small"
              columns={columns}
              data={results}
              rowKey={(r) => r.job.backend}
            />
            {!running && (
              <HorizontalBarChart
                series={breakdown}
                stacked
                renderer="canvas2d"
                yAxis={{ min: 0, max: 100 }}
                height={60 + results.length * 44}
                ariaLabel={t("breakdownAria")}
              />
            )}
          </>
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">
          {active
            ? t("measuring", {
                backend: text.renderer(active.job.backend),
                index: results.length + 1,
                total: planned,
              })
            : running
              ? t("preparing")
              : results.length
                ? copied
                  ? t("copied")
                  : t("done")
                : t("ready")}
          {skipped.length > 0 &&
            \` \${t("skippedNote", { backends: skipped.join(", ") })}\`}
        </p>
        <p className={styles.hint}>
          {t("refreshNote", {
            value: refresh,
            budget: text.decimal(1000 / refresh),
          })}
        </p>
        {!running && results.length > 0 && (
          <Button size="xsmall" variant="outline" onClick={copy}>
            {t("copy")}
          </Button>
        )}
      </div>
    </div>
  );
}
`})))()}var kt;function At(){return(At=e((()=>{kt=`import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Table, Tag, type TableColumn } from "minerva-design";
import type { ChartRendererKind } from "minerva-design/charts";
import {
  autoPick,
  probeBackends,
  type BackendSupport,
  type BackendsSupport,
} from "../../../renderer/support";
import { probeDetails, type DetailsByBackend } from "../bench/detect";
import { useBenchFormat } from "../bench/format";
import { BACKENDS } from "../bench/score";
import styles from "../bench/bench.module.scss";

interface Row {
  kind: ChartRendererKind;
  support: BackendSupport;
}

const TAG_COLOR = {
  hardware: "success",
  software: "warning",
  missing: "neutral",
} as const;

export default function EnvironmentDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [support, setSupport] = useState<BackendsSupport | null>(null);
  const [details, setDetails] = useState<DetailsByBackend | null>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([probeBackends(), probeDetails()]).then(
      ([probed, found]) => {
        if (cancelled) return;
        setSupport(probed);
        setDetails(found);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  if (!support || !details) {
    return (
      <LoadingState
        size="small"
        style={{ height: 240 }}
        label={t("env.probing")}
      />
    );
  }

  const auto = autoPick(support);
  const rows: Row[] = BACKENDS.map((kind) => ({
    kind,
    support: support[kind],
  }));
  const columns: TableColumn<Row>[] = [
    {
      key: "backend",
      header: t("env.backend"),
      render: (row) => (
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <strong>{text.renderer(row.kind)}</strong>
          {row.kind === auto && (
            <Tag size="small" color="primary" variant="solid">
              {t("env.autoTag")}
            </Tag>
          )}
        </span>
      ),
    },
    {
      key: "status",
      header: t("env.status"),
      render: (row) => (
        <Tag size="small" color={TAG_COLOR[row.support]}>
          {row.kind === "canvas2d"
            ? t("env.cpu")
            : t(\`env.support.\${row.support}\`)}
        </Tag>
      ),
    },
    {
      key: "device",
      header: t("env.device"),
      render: (row) => (
        <span className={styles.wrap}>
          {row.kind === "canvas2d"
            ? t("env.cpuDevice")
            : (details[row.kind]?.device ?? "–")}
        </span>
      ),
    },
    {
      key: "version",
      header: t("env.version"),
      render: (row) => (
        <span className={styles.wrap}>{details[row.kind]?.version ?? "–"}</span>
      ),
    },
    {
      key: "limits",
      header: t("env.limits"),
      render: (row) => {
        const found = details[row.kind];
        if (!found) return "–";
        const parts: string[] = [];
        if (found.maxTexture)
          parts.push(
            t("env.maxTexture", { value: text.count(found.maxTexture) }),
          );
        if (found.maxBuffer)
          parts.push(
            t("env.maxBuffer", { value: text.gigabytes(found.maxBuffer) }),
          );
        if (found.instancing === false) parts.push(t("env.noInstancing"));
        return parts.length ? parts.join(" · ") : "–";
      },
    },
  ];

  const secure = typeof isSecureContext === "boolean" ? isSecureContext : false;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <dl className={styles.cards}>
        <div className={\`\${styles.card} \${styles.cardBest}\`}>
          <dt>{t("env.autoPick")}</dt>
          <dd>{text.renderer(auto)}</dd>
          <small>{t(\`env.autoWhy.\${auto}\`)}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.secure")}</dt>
          <dd>{secure ? t("env.yes") : t("env.no")}</dd>
          <small>{t("env.secureNote")}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.dpr")}</dt>
          <dd>{text.decimal(window.devicePixelRatio || 1)}</dd>
          <small>{t("env.dprNote")}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.threads")}</dt>
          <dd>{navigator.hardwareConcurrency || "–"}</dd>
          <small>{t("env.threadsNote")}</small>
        </div>
      </dl>
      <Table
        aria-label={t("env.tableAria")}
        size="small"
        columns={columns}
        data={rows}
        rowKey={(row) => row.kind}
      />
      <p className={styles.hint} style={{ margin: 0, fontSize: 13 }}>
        {t("env.note")}
      </p>
    </div>
  );
}
`})))()}var jt;function Mt(){return(Mt=e((()=>{jt=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import { Chart, type ChartRendererKind } from "minerva-design/charts";
import { useBenchFormat } from "../bench/format";
import { BACKENDS } from "../bench/score";
import { makeSeries } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const POINTS = 100_000;

interface Entry {
  id: number;
  text: string;
}

interface ConfiguredContext {
  getConfiguration?: () => { device?: { destroy(): void } } | null;
}

/**
 * Loses the GPU of the chart's data canvas the way a driver reset would:
 * WEBGL_lose_context for WebGL, destroying the device for WebGPU
 */
const loseGpu = (root: HTMLElement | null, kind: ChartRendererKind) => {
  const canvas = root?.querySelector<HTMLCanvasElement>(
    "canvas.minerva-chart-data",
  );
  if (!canvas) return false;
  if (kind === "webgpu") {
    // returns the context the chart configured (getConfiguration: recent browsers)
    const context = canvas.getContext("webgpu") as ConfiguredContext | null;
    const device = context?.getConfiguration?.()?.device;
    if (!device) return false;
    device.destroy();
    return true;
  }
  if (kind === "webgl2" || kind === "webgl") {
    const gl = canvas.getContext(kind) as WebGLRenderingContext | null;
    const ext = gl?.getExtension("WEBGL_lose_context");
    if (!ext) return false;
    ext.loseContext();
    return true;
  }
  return false;
};

export default function FallbackDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const [drawn, setDrawn] = useState<ChartRendererKind | null>(null);
  const [lost, setLost] = useState<ChartRendererKind[]>([]);
  const [log, setLog] = useState<Entry[]>([]);
  const [blocked, setBlocked] = useState(false);
  const lostAt = useRef(0);

  const series = useMemo(
    () => makeSeries("line", POINTS, (index) => t("series.line", { index })),
    [t],
  );

  const add = (line: string) =>
    setLog((previous) =>
      [{ id: (previous[0]?.id ?? 0) + 1, text: line }, ...previous].slice(0, 8),
    );

  const lose = () => {
    if (!drawn || drawn === "canvas2d") return;
    lostAt.current = performance.now();
    if (!loseGpu(rootRef.current, drawn)) {
      setBlocked(true);
      return;
    }
    setLost((previous) => [...previous, drawn]);
    add(t("lostEntry", { backend: text.renderer(drawn) }));
  };

  const restart = () => {
    setRun((value) => value + 1);
    setDrawn(null);
    setLost([]);
    setLog([]);
    setBlocked(false);
  };

  return (
    <div className={styles.stage} ref={rootRef}>
      <div className={styles.toolbar}>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {BACKENDS.map((kind) => (
            <Tag
              key={kind}
              size="small"
              color={
                kind === drawn
                  ? "success"
                  : lost.includes(kind)
                    ? "danger"
                    : "neutral"
              }
              variant={kind === drawn ? "solid" : "subtle"}
            >
              {lost.includes(kind)
                ? t("chainLost", { backend: text.renderer(kind) })
                : text.renderer(kind)}
            </Tag>
          ))}
        </span>
        <span className={styles.spacer} />
        <Button
          size="small"
          disabled={!drawn || drawn === "canvas2d"}
          onClick={lose}
        >
          {t("loseGpu")}
        </Button>
        <Button size="small" variant="outline" onClick={restart}>
          {t("restart")}
        </Button>
      </div>
      <div className={styles.body}>
        <Chart
          key={run}
          series={series}
          // forced: the chain starts at WebGPU and only moves down
          renderer="webgpu"
          onRendererChange={(kind) => {
            setDrawn(kind);
            add(
              lostAt.current
                ? t("fallbackEntry", {
                    backend: text.renderer(kind),
                    ms: text.ms(performance.now() - lostAt.current),
                  })
                : t("startEntry", { backend: text.renderer(kind) }),
            );
            lostAt.current = 0;
          }}
          legend={false}
          xAxis={{ type: "time" }}
          height={240}
          ariaLabel={t("fallbackAria", { count: text.compact(POINTS) })}
        />
        <ol className={styles.log} aria-label={t("fallbackLog")}>
          {log.map((entry) => (
            <li key={entry.id}>{entry.text}</li>
          ))}
        </ol>
      </div>
      <div className={styles.footer}>
        <p role="status">
          {blocked
            ? t("cannotLose", { backend: drawn ? text.renderer(drawn) : "" })
            : drawn === "canvas2d"
              ? t("chainEnd")
              : drawn
                ? t("fallbackStatus", { backend: text.renderer(drawn) })
                : t("starting")}
        </p>
        <p className={styles.hint}>{t("fallbackHint")}</p>
      </div>
    </div>
  );
}
`})))()}var Nt;function Pt(){return(Pt=e((()=>{Nt=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup } from "minerva-design";
import { LineChart, type ChartSeries } from "minerva-design/charts";
import { probeBackends } from "../../../renderer/support";
import { useBenchFormat } from "../bench/format";
import { useBenchQueue } from "../bench/queue";
import { BACKENDS } from "../bench/score";
import { BenchStage } from "../bench/stage";
import { COUNTS, type Workload } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

/** Shorter runs: four sizes per backend */
const DURATION = 1500;

export default function ScalingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [workload, setWorkload] = useState<Workload>("line");
  const [measured, setMeasured] = useState<Workload>("line");
  const bench = useBenchQueue((kind, index) => t(\`series.\${kind}\`, { index }));
  const { active, results, running, planned } = bench;

  const run = async () => {
    const support = await probeBackends();
    const backends = BACKENDS.filter((kind) => support[kind] !== "software");
    setMeasured(workload);
    void bench.start(
      backends.flatMap((backend) =>
        COUNTS[workload].map((count) => ({
          backend,
          workload,
          count,
          duration: DURATION,
        })),
      ),
    );
  };

  /** One line per backend, one point per size */
  const curve = (value: (fps: number, work: number) => number) =>
    BACKENDS.map((kind): ChartSeries | null => {
      const runs = results.filter(
        (r) => r.job.backend === kind && r.status !== "timeout",
      );
      if (!runs.length) return null;
      return {
        id: kind,
        name: text.renderer(kind),
        data: runs.map((r) => [r.job.count, value(r.fps, r.work)] as const),
      };
    }).filter((series): series is ChartSeries => series !== null);

  const xAxis = {
    type: "log" as const,
    title: t("pointsAxis"),
    format: (value: number) => text.compact(value),
  };

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("workload")}
          direction="horizontal"
          size="small"
          value={workload}
          disabled={running}
          onChange={(value) => setWorkload(value as Workload)}
        >
          <Radio value="line" label={t("workloads.line")} />
          <Radio value="scatter" label={t("workloads.scatter")} />
        </RadioGroup>
        <span className={styles.spacer} />
        {running ? (
          <Button size="small" variant="outline" onClick={bench.stop}>
            {t("stop")}
          </Button>
        ) : (
          <Button size="small" onClick={() => void run()}>
            {t("runScaling")}
          </Button>
        )}
      </div>

      <div className={styles.body}>
        {running && (
          <div className={styles.live} style={{ minHeight: 180 }}>
            {active ? (
              <BenchStage
                key={active.run}
                job={active.job}
                series={active.series}
                startedAt={active.startedAt}
                refresh={bench.refresh}
                height={180}
                ariaLabel={t("liveAria", {
                  backend: text.renderer(active.job.backend),
                  count: text.compact(active.job.count),
                })}
                onDone={bench.onDone}
              />
            ) : (
              <div className={styles.placeholder} style={{ height: 180 }}>
                {t("between")}
              </div>
            )}
          </div>
        )}
        {!running && results.length === 0 && (
          <div className={styles.placeholder}>{t("scalingIdle")}</div>
        )}
        {results.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            <LineChart
              series={curve((fps) => Math.round(fps))}
              renderer="canvas2d"
              xAxis={xAxis}
              yAxis={{ min: 0, title: t("fpsAxis") }}
              height={260}
              ariaLabel={t("scalingFpsAria", {
                workload: t(\`workloads.\${measured}\`),
              })}
            />
            <LineChart
              series={curve((_, work) => Math.max(0.1, work))}
              renderer="canvas2d"
              xAxis={xAxis}
              yAxis={{
                type: "log",
                title: t("workAxis"),
                format: (value) => text.ms(value),
              }}
              height={260}
              ariaLabel={t("scalingWorkAria", {
                workload: t(\`workloads.\${measured}\`),
              })}
            />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">
          {active
            ? t("scalingMeasuring", {
                backend: text.renderer(active.job.backend),
                count: text.compact(active.job.count),
                index: results.length + 1,
                total: planned,
              })
            : running
              ? t("preparing")
              : results.length
                ? t("scalingDone")
                : t("ready")}
        </p>
        <p className={styles.hint}>{t("scalingHint")}</p>
      </div>
    </div>
  );
}
`})))()}var Ft;function It(){return(It=e((()=>{Ft=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartRendererKind,
  type ChartRendererPreference,
} from "minerva-design/charts";
import { useBenchFormat } from "../bench/format";
import { makeSeries } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const PREFERENCES: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
const POINTS = 200_000;

interface Entry {
  id: number;
  requested: ChartRendererPreference;
  drawn: ChartRendererKind;
  ms: number;
}

export default function SwitchingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [preference, setPreference] = useState<ChartRendererPreference>("auto");
  const [drawn, setDrawn] = useState<ChartRendererKind | null>(null);
  const [log, setLog] = useState<Entry[]>([]);
  // when the current preference was asked for (performance.now())
  const asked = useRef<{ requested: ChartRendererPreference; at: number }>({
    requested: "auto",
    at: 0,
  });

  const series = useMemo(
    () => makeSeries("line", POINTS, (index) => t("series.line", { index })),
    [t],
  );
  // the first backend is timed from the mount (renderers start asynchronously)
  useEffect(() => {
    asked.current.at = performance.now();
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("preference")}
          direction="horizontal"
          size="small"
          value={preference}
          onChange={(value) => {
            const next = value as ChartRendererPreference;
            asked.current = { requested: next, at: performance.now() };
            setPreference(next);
          }}
        >
          {PREFERENCES.map((kind) => (
            <Radio key={kind} value={kind} label={text.renderer(kind)} />
          ))}
        </RadioGroup>
      </div>
      <div className={styles.body}>
        <Chart
          series={series}
          renderer={preference}
          onRendererChange={(kind) => {
            const { requested, at } = asked.current;
            setDrawn(kind);
            setLog((previous) =>
              [
                {
                  id: (previous[0]?.id ?? 0) + 1,
                  requested,
                  drawn: kind,
                  ms: performance.now() - at,
                },
                ...previous,
              ].slice(0, 8),
            );
          }}
          legend={false}
          xAxis={{ type: "time" }}
          height={240}
          ariaLabel={t("switchAria", { count: text.compact(POINTS) })}
        />
        <ol className={styles.log} aria-label={t("switchLog")}>
          {log.map((entry) => (
            <li key={entry.id}>
              {entry.requested === entry.drawn
                ? t("switchEntry", {
                    backend: text.renderer(entry.drawn),
                    ms: text.ms(entry.ms),
                  })
                : t("switchEntryOther", {
                    requested: text.renderer(entry.requested),
                    backend: text.renderer(entry.drawn),
                    ms: text.ms(entry.ms),
                  })}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.footer}>
        <p role="status">
          {drawn
            ? t("switchStatus", { backend: text.renderer(drawn) })
            : t("starting")}
        </p>
        <p className={styles.hint}>{t("switchHint")}</p>
      </div>
    </div>
  );
}
`})))()}function Lt(){let{t:e,i18n:t}=s(),n=new Intl.NumberFormat(t.language,{notation:`compact`}),r=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1});return(0,Q.jsx)(`div`,{className:w.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.chart-renderers.sample.title`),children:(0,Q.jsxs)(`table`,{className:w.propsTable,children:[(0,Q.jsx)(`thead`,{children:(0,Q.jsxs)(`tr`,{children:[(0,Q.jsx)(`th`,{scope:`col`,children:e(`docs.chart-renderers.sample.corner`)}),$.map(t=>(0,Q.jsx)(`th`,{scope:`col`,children:e(`docs.chart-renderers.data.renderers.${t}`)},t))]})}),(0,Q.jsx)(`tbody`,{children:Kt.map(({workload:t,count:i,results:a})=>(0,Q.jsxs)(`tr`,{children:[(0,Q.jsx)(`th`,{scope:`row`,className:w.propName,children:e(`docs.chart-renderers.sample.workload`,{workload:e(`docs.chart-renderers.data.workloads.${t}`),count:n.format(i)})}),$.map(t=>{let[n,i,o]=a[t];return(0,Q.jsxs)(`td`,{children:[(0,Q.jsx)(`strong`,{children:n}),` · `,e(`docs.chart-renderers.data.ms`,{value:r.format(i)}),o<59&&` · ${e(`docs.chart-renderers.data.fps`,{value:o})}`]},t)})]},`${t}-${i}`))})]})})}function Rt({prefix:e,rows:t,label:n}){let{t:r}=s();return(0,Q.jsx)(`div`,{className:w.tableWrapper,tabIndex:0,role:`region`,"aria-label":n,children:(0,Q.jsxs)(`table`,{className:w.propsTable,children:[(0,Q.jsx)(`thead`,{children:(0,Q.jsxs)(`tr`,{children:[(0,Q.jsx)(`th`,{scope:`col`,children:r(`${e}.corner`)}),$.map(e=>(0,Q.jsx)(`th`,{scope:`col`,children:r(`docs.chart-renderers.data.renderers.${e}`)},e))]})}),(0,Q.jsx)(`tbody`,{children:t.map(t=>(0,Q.jsxs)(`tr`,{children:[(0,Q.jsx)(`th`,{scope:`row`,className:w.propName,children:r(`${e}.rows.${t}.label`)}),$.map(n=>(0,Q.jsx)(`td`,{children:r(`${e}.rows.${t}.${n}`)},n))]},t))})]})})}function zt(){let{t:e}=s(),t=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-chain`,children:[(0,Q.jsx)(`h2`,{id:`renderers-chain`,children:e(`docs.chart-renderers.chain.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.chain.text`)}),(0,Q.jsxs)(`ul`,{className:w.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.chain.auto`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.chain.software`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.chain.forced`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.chain.lost`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.chain.global`)})]}),(0,Q.jsx)(b,{language:`tsx`,code:Ht})]}),(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-matrix`,children:[(0,Q.jsx)(`h2`,{id:`renderers-matrix`,children:e(`docs.chart-renderers.matrix.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.matrix.text`)}),(0,Q.jsx)(Rt,{prefix:`docs.chart-renderers.matrix`,rows:Wt,label:e(`docs.chart-renderers.matrix.title`)})]}),(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-expect`,children:[(0,Q.jsx)(`h2`,{id:`renderers-expect`,children:e(`docs.chart-renderers.expect.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.expect.text`)}),(0,Q.jsxs)(`ul`,{className:w.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.expect.small`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.expect.medium`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.expect.large`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.expect.bars`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.expect.gpus`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.expect.startup`)})]})]}),(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-sample`,children:[(0,Q.jsx)(`h2`,{id:`renderers-sample`,children:e(`docs.chart-renderers.sample.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.sample.text`)}),(0,Q.jsx)(Lt,{}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.sample.note`)})]})]});return(0,Q.jsxs)(D,{id:`chart-renderers`,demos:Bt,intro:t,importCode:Vt,children:[(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-score`,children:[(0,Q.jsx)(`h2`,{id:`renderers-score`,children:e(`docs.chart-renderers.score.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.score.text`)}),(0,Q.jsxs)(`ul`,{className:w.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.score.smooth`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.score.stability`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.score.headroom`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.score.startup`)})]}),(0,Q.jsx)(b,{language:`ts`,code:Ut}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.score.grades`)})]}),(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-method`,children:[(0,Q.jsx)(`h2`,{id:`renderers-method`,children:e(`docs.chart-renderers.method.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.method.text`)}),(0,Q.jsxs)(`ul`,{className:w.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.method.same`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.method.work`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.method.vsync`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.method.gpu`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.method.noise`)})]})]}),(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-browsers`,children:[(0,Q.jsx)(`h2`,{id:`renderers-browsers`,children:e(`docs.chart-renderers.browsers.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.browsers.text`)}),(0,Q.jsx)(Rt,{prefix:`docs.chart-renderers.browsers`,rows:Gt,label:e(`docs.chart-renderers.browsers.title`)}),(0,Q.jsx)(`p`,{className:w.prose,children:e(`docs.chart-renderers.browsers.note`)})]}),(0,Q.jsxs)(`section`,{className:w.section,"aria-labelledby":`renderers-choose`,children:[(0,Q.jsx)(`h2`,{id:`renderers-choose`,children:e(`docs.chart-renderers.choose.title`)}),(0,Q.jsxs)(`ul`,{className:w.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.choose.auto`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.choose.webgpu`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.choose.webgl2`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.choose.webgl`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.choose.canvas2d`)}),(0,Q.jsx)(`li`,{children:e(`docs.chart-renderers.choose.many`)})]}),(0,Q.jsx)(`p`,{className:w.prose,children:(0,Q.jsx)(o,{i18nKey:`docs.chart-renderers.choose.more`,components:{performance:(0,Q.jsx)(i,{to:`/chart-performance`}),engine:(0,Q.jsx)(i,{to:`/chart-engine`})}})})]})]})}var Q,Bt,Vt,Ht,Ut,$,Wt,Gt,Kt;function qt(){return(qt=e((()=>{ot(),mt(),vt(),St(),Et(),Ot(),At(),Mt(),Pt(),It(),t(),a(),c(),r(),y(),E(),ee(),ae(),Q=n(),Bt=ie(Object.assign({"./demos/benchmark.tsx":rt,"./demos/environment.tsx":ft,"./demos/fallback.tsx":ht,"./demos/scaling.tsx":yt,"./demos/switching.tsx":Ct}),Object.assign({"./demos/benchmark.tsx":Dt,"./demos/environment.tsx":kt,"./demos/fallback.tsx":jt,"./demos/scaling.tsx":Nt,"./demos/switching.tsx":Ft})),Vt=`import { Chart } from "minerva-design/charts";
import {
  setDefaultChartRenderer,
  type ChartRendererKind,
} from "minerva-design/charts/core";`,Ht=`// default: the first backend that starts, best first
<LineChart series={series} />                     // renderer="auto"

// a forced backend; if it cannot start, the next one in the chain
<LineChart series={series} renderer="webgl2" />

// which backend is drawing (again after a fallback)
<LineChart
  series={series}
  onRendererChange={(kind: ChartRendererKind) => setBackend(kind)}
/>

// every chart whose renderer is unset or "auto", in every framework
setDefaultChartRenderer("canvas2d");`,Ut=`const budget = 1000 / refreshRate; // ms per frame: 16.7 at 60 Hz

const smooth = clamp(fps / refreshRate); // keeps up with the display
const stability = clamp(budget / p95FrameTime); // no long frames
const headroom = clamp(1 - mainThreadPerFrame / budget); // CPU left for the app
const startup = clamp(1 - timeToFirstFrame / 1000); // chart on screen quickly

const score = Math.round(
  100 * (0.4 * smooth + 0.2 * stability + 0.25 * headroom + 0.15 * startup),
); // clamp: between 0 and 1`,$=[`webgpu`,`webgl2`,`webgl`,`canvas2d`],Wt=[`api`,`shaders`,`draw`,`zoom`,`lines`,`scatter`,`antialias`,`contexts`,`loss`,`start`,`fit`],Gt=[`chrome`,`firefox`,`safari`,`ios`,`android`,`linux`],Kt=[{workload:`line`,count:1e6,results:{webgpu:[96,2,60],webgl2:[96,2,60],webgl:[96,2,60],canvas2d:[96,2.3,60]}},{workload:`line`,count:2e6,results:{webgpu:[96,2,60],webgl2:[97,.9,60],webgl:[97,1.1,60],canvas2d:[96,1.7,60]}},{workload:`scatter`,count:1e5,results:{webgpu:[98,1.1,60],webgl2:[92,3.4,60],webgl:[94,3.4,60],canvas2d:[87,8.2,60]}},{workload:`scatter`,count:1e6,results:{webgpu:[96,2.1,60],webgl2:[96,2.2,60],webgl:[96,2.1,60],canvas2d:[69,11.7,57]}},{workload:`scatter`,count:2e6,results:{webgpu:[95,2.3,60],webgl2:[96,1.5,60],webgl:[97,.8,60],canvas2d:[55,20.6,49]}},{workload:`bars`,count:2e5,results:{webgpu:[96,2.1,60],webgl2:[98,1.1,60],webgl:[98,.6,60],canvas2d:[96,1.8,60]}}]})))()}qt();export{zt as default};