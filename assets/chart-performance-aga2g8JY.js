import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{i as a,m as o,p as s,r as c}from"./DemoBlock-BJ0_y9F8.js";import{n as l,t as u}from"./useTranslation-BzoVi22c.js";import{R as d,z as f}from"./ProgressIndicator-BhPa7d9i.js";import{i as ee,n as p,r as m,t as te}from"./Radio-DnNachfg.js";import{n as h,t as ne}from"./Switch-DyBWzlhy.js";import{n as re,t as g}from"./CodeBlock-BXt_Axjy.js";import{n as ie,t as _}from"./LoadingState-x0aMXWEt.js";import{F as v,P as y}from"./angular-preview-CuqFtkb7.js";import{l as b,n as x,t as S,u as C}from"./DocPage-B2iACtLP.js";import{f as w,h as T,l as ae,m as E,v as oe,y as D}from"./charts-eaEG_eJd.js";function O(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function k(e){let t=NaN;return()=>{if(!Number.isNaN(t)){let e=t;return t=NaN,e}let n=Math.sqrt(-2*Math.log(1-e())),r=2*Math.PI*e();return t=n*Math.sin(r),n*Math.cos(r)}}function se(e,t){let n=e[0]?.length??0,r=Math.ceil(n/j),i=new Float64Array(r).fill(1/0),a=new Float64Array(r).fill(-1/0);for(let t of e)for(let e=0;e<n;e++){let n=e/j|0;t[e]<i[n]&&(i[n]=t[e])}for(let e of t)for(let t=0;t<n;t++){let n=t/j|0;e[t]>a[n]&&(a[n]=e[t])}return(r,o)=>{let s=Math.max(0,Math.floor(r)),c=Math.min(n-1,Math.ceil(o));if(s>c)return null;let l=1/0,u=-1/0,d=n=>{for(let t of e)t[n]<l&&(l=t[n]);for(let e of t)e[n]>u&&(u=e[n])};for(;s<=c&&s%j;s++)d(s);for(;s+j-1<=c;s+=j){let e=s/j;i[e]<l&&(l=i[e]),a[e]>u&&(u=a[e])}for(;s<=c;s++)d(s);return l<=u?[l,u]:null}}var A,j,M,N,P,ce,le,ue,de,F,fe,I,pe,me,he,ge,L,R,_e,ve,ye,be;function z(){return(z=e((()=>{A=e=>{let t=null;return()=>(t||=new Promise(t=>{let n=()=>setTimeout(()=>t(e()),0);typeof requestAnimationFrame==`function`?requestAnimationFrame(n):n()}),t)},j=512,M=(e,t)=>{let n=e.range((t[0]-e.start)/e.step-1,(t[1]-e.start)/e.step+1);if(!n)return null;let r=(n[1]-n[0])*.08||1;return[n[0]-r,n[1]+r]},N=({zoom:e,period:t=12,targets:n,y:r=!1})=>(i,a)=>{let o=Math.floor(i/t),s=i%t/t,c=(1-Math.cos(2*Math.PI*s))/2,l=n[o%n.length]??[NaN,NaN],u=(1/e)**c,d=(e,t,n)=>{let r=(e[1]-e[0])*u,i=(e[0]+e[1])/2,a=i+((Number.isFinite(t)?t:i)-i)*c+r*.25*n*c,o=Math.min(Math.max(a-r/2,e[0]),e[1]-r);return[o,o+r]},f=d(a.x,l[0],Math.sin(i*.7));return r?{x:f,y:d(a.y,l[1],Math.cos(i*.6))}:{x:f}},P=25e4,ce=Date.UTC(2026,0,1),le=1e3,ue=A(()=>{let e=k(O(2026)),t=new Float64Array(P);for(let e=0;e<P;e++)t[e]=ce+e*le;let n=[];for(let t=0;t<4;t++){let r=new Float64Array(P),i=18+t*14,a=3+t*1.5,o=0;for(let n=0;n<P;n++){o=o*.9995+e()*.06;let s=Math.sin(2*Math.PI*n/86400+t*1.3),c=Math.sin(2*Math.PI*n/(600+t*170));r[n]=i+s*a+c*.6+o+e()*.25}n.push(r)}return{x:t,y:n,start:ce,step:le,range:se(n,n)}}),de=[.22,.68,.41,.87].map(e=>[ce+e*P*le,NaN]),F=1e5,fe=A(()=>{let e=O(42),t=k(e),n=[],r=[];for(let i=0;i<10;i++){let a=2*Math.PI*i/10+e()*.4,o=i%3==0?14:34,s=50+Math.cos(a)*o,c=50+Math.sin(a)*o,l=2+e()*4,u=1.5+e()*3,d=e()*Math.PI,f=Math.cos(d),ee=Math.sin(d),p=new Float64Array(F),m=new Float64Array(F);for(let n=0;n<F;n++){let r,a;if(i%3==1){let n=e()*2*Math.PI,i=5+t()*.6;r=Math.cos(n)*i,a=Math.sin(n)*i}else if(i%3==2){let n=e()*3*Math.PI;r=Math.cos(n)*n*.9+t()*.35,a=Math.sin(n)*n*.9+t()*.35}else r=t()*l,a=t()*u;p[n]=s+r*f-a*ee,m[n]=c+r*ee+a*f}n.push({x:p,y:m}),r.push([s,c])}return{clusters:n,centers:r}}),I=2e5,pe=Date.UTC(2026,0,5),me=6e4,he=A(()=>{let e=k(O(7)),t=new Float64Array(I),n=new Float64Array(I),r=new Float64Array(I),i=new Float64Array(I),a=new Float64Array(I),o=120;for(let s=0;s<I;s++){let c=.0012*(1+.7*Math.sin(s/9e3)**2),l=o,u=l*Math.exp(e()*c+2e-6);t[s]=pe+s*me,n[s]=l,a[s]=u,r[s]=Math.max(l,u)*(1+Math.abs(e())*c*.7),i[s]=Math.min(l,u)*(1-Math.abs(e())*c*.7),o=u}return{x:t,open:n,high:r,low:i,close:a,start:pe,step:me,range:se([i],[r])}}),ge=[.31,.74,.12,.55].map(e=>[pe+e*I*me,NaN]),L=1e3,R=1e3,_e=.02,ve=8,ye=A(()=>{let e=k(O(1e3)),t=L*R,n=new Float64Array(t),r=new Float64Array(t),i=new Float64Array(t),a=L*_e,o=[];for(let t=0;t<L;t++){let s=t*_e,c=400+s/a*1500+250*Math.sin(s*.9);o.length=0;for(let e=1;e<=4;e++)o.push([c*e,40*e,1/e**1.6]);o.push([5200+700*Math.sin(2*Math.PI*s/4),60,.35]);let l=Math.exp(-((s%2.5-1.2)**2)/.002)*.08;for(let a=0;a<R;a++){let c=a*ve,u=1e-7/(1+c/300)+l/(1+c/4e3);for(let[e,t,n]of o){let r=(c-e)/t;r>-5&&r<5&&(u+=n*Math.exp(-r*r))}let d=t*R+a;n[d]=s,r[d]=c,i[d]=10*Math.log10(u)+e()*1.5}}return{x:n,y:r,value:i}}),be=[[6,1200],[3,5200],[12.2,2500],[17,3900]]})))()}function xe(e,t=`0px`){let[n,r]=(0,B.useState)(()=>typeof IntersectionObserver>`u`);return(0,B.useEffect)(()=>{let n=e.current;if(!n||typeof IntersectionObserver>`u`)return;let i=new IntersectionObserver(([e])=>r(!!e?.isIntersecting),{rootMargin:t});return i.observe(n),()=>i.disconnect()},[e,t]),n}function Se(e,t={}){let[n,r]=(0,B.useState)(null),i=(0,B.useRef)(t);return(0,B.useEffect)(()=>{i.current=t}),(0,B.useEffect)(()=>{if(!e)return;let t=0,n=0,a=0,o=0,s=0,c=new MessageChannel;c.port1.onmessage=e=>{let t=performance.now()-e.data;o+=t,s++,i.current.onWork?.(t)};let l=e=>{t=requestAnimationFrame(l),c.port2.postMessage(e),n?a++:n=e,i.current.onFrame?.(e);let u=e-n;if(u>=500&&a>0){let t={fps:a*1e3/u,frame:u/a,work:s?o/s:0};r(t),i.current.onStats?.(t),n=e,a=0,o=0,s=0}};return t=requestAnimationFrame(l),()=>{cancelAnimationFrame(t),c.port1.close(),c.port2.close()}},[e]),n}function Ce(e){requestAnimationFrame(()=>setTimeout(e,0))}var B,we;function Te(){return(Te=e((()=>{B=t(),we=()=>typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches})))()}var Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,V;function Xe(){return(Xe=e((()=>{Ee=`_stage_185s0_1`,De=`_toolbar_185s0_10`,Oe=`_hud_185s0_20`,ke=`_stat_185s0_29`,Ae=`_good_185s0_55`,je=`_fair_185s0_59`,Me=`_poor_185s0_63`,Ne=`_chart_185s0_67`,Pe=`_loading_185s0_72`,Fe=`_footer_185s0_78`,Ie=`_fallback_185s0_92`,Le=`_hint_185s0_96`,Re=`_compareGrid_185s0_100`,ze=`_panel_185s0_107`,Be=`_panelActive_185s0_113`,Ve=`_panelNote_185s0_117`,He=`_panelHeader_185s0_129`,Ue=`_result_185s0_143`,We=`_results_185s0_149`,Ge=`_bars_185s0_154`,Ke=`_barsTitle_185s0_163`,qe=`_bar_185s0_154`,Je=`_barTrack_185s0_177`,Ye=`_barFill_185s0_185`,V={stage:Ee,toolbar:De,hud:Oe,stat:ke,good:Ae,fair:je,poor:Me,chart:Ne,loading:Pe,footer:Fe,fallback:Ie,hint:Le,compareGrid:Re,panel:ze,panelActive:Be,panelNote:Ve,panelHeader:He,result:Ue,results:We,bars:Ge,barsTitle:Ke,bar:qe,barTrack:Je,barFill:Ye}})))()}var Ze,Qe,$e;function et(){return(et=e((()=>{u(),Xe(),Ze=[`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`],Qe=e=>e>=50?V.good:e>=25?V.fair:V.poor,$e=()=>{let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),n=new Intl.NumberFormat(t.language),r=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:1}),i=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1});return{count:e=>n.format(Math.round(e)),compact:e=>r.format(e),ms:t=>e(`ms`,{value:t<100?i.format(t):n.format(Math.round(t))}),renderer:t=>e(`renderers.${t}`)}}})))()}function H({load:e,chart:t,count:n,countLabel:r,height:i,motionLabel:a,hint:o,tour:s,fit:c,extra:u}){let{t:d}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),f=$e(),p=(0,U.useRef)(null),m=(0,U.useRef)(null),h=(0,U.useRef)(null),re=xe(p,`300px`),g=xe(p),[_,v]=(0,U.useState)(null),[y,b]=(0,U.useState)(`auto`),[x,S]=(0,U.useState)(null),[C,w]=(0,U.useState)(()=>!we()),[T,ae]=(0,U.useState)(null),[E,oe]=(0,U.useState)(null),D=(0,U.useRef)(0),O=(0,U.useRef)(null),k=(0,U.useRef)(0);(0,U.useEffect)(()=>{if(!re||_)return;let t=!1;return e().then(e=>{t||(D.current=performance.now(),v({value:e}))}),()=>{t=!0}},[re,_,e]),(0,U.useEffect)(()=>{let e=m.current;if(!e)return;let t=()=>w(!1),n=e=>{(e.ctrlKey||e.metaKey)&&t()},r=e=>{/^(Arrow|\+|-|=|0|Home|End)/.test(e.key)&&t()};return e.addEventListener(`pointerdown`,t),e.addEventListener(`wheel`,n,{passive:!0}),e.addEventListener(`keydown`,r),()=>{e.removeEventListener(`pointerdown`,t),e.removeEventListener(`wheel`,n),e.removeEventListener(`keydown`,r)}},[]);let se=C&&T===null,A=g&&!!_,j=Se(A,{onFrame:e=>{let t=h.current?.getInstance();if(!s||!se||!_||E===null||!t){O.current=null;return}let n=O.current;n||(t.resetZoom(),n={start:e,base:t.getView()},O.current=n,k.current=0);let r=s(_.value,(e-n.start)/1e3,n.base);if(c&&r.x&&!r.y){let e=c(_.value,r.x);e&&(r.y=e)}t.setView(r)},onWork:e=>{O.current&&(k.current=e>tt?k.current+1:0,(k.current>=2||e>1e3)&&(O.current=null,ae(e)))}}),M=e=>{S(e),Ce(()=>oe(performance.now()-D.current))},N=e=>{if(!c||!_)return;let t=c(_.value,e.x);t&&h.current?.setView({y:t})},P=d(`status.starting`);return T===null?x&&y===`auto`?P=d(x===`canvas2d`?`status.autoCanvas`:`status.auto`,{backend:f.renderer(x)}):x&&x===y?P=d(`status.forced`,{backend:f.renderer(x)}):x&&(P=(0,W.jsx)(`span`,{className:V.fallback,children:d(`status.fallback`,{requested:f.renderer(y),backend:f.renderer(x)})})):P=(0,W.jsx)(`span`,{className:V.fallback,children:d(`status.slow`,{ms:f.ms(T)})}),(0,W.jsxs)(`div`,{ref:p,className:V.stage,children:[(0,W.jsxs)(`div`,{className:V.toolbar,children:[(0,W.jsx)(ee,{"aria-label":d(`renderer`),direction:`horizontal`,size:`small`,value:y,onChange:e=>{D.current=performance.now(),b(e),S(null),oe(null),ae(null)},children:Ze.map(e=>(0,W.jsx)(te,{value:e,label:f.renderer(e)},e))}),(0,W.jsx)(ne,{size:`small`,checked:C,label:a,onChange:e=>{w(e),ae(null)}})]}),(0,W.jsxs)(`dl`,{className:V.hud,children:[(0,W.jsxs)(`div`,{className:V.stat,children:[(0,W.jsx)(`dt`,{children:d(`stats.renderer`)}),(0,W.jsx)(`dd`,{children:x?f.renderer(x):`…`})]}),(0,W.jsxs)(`div`,{className:V.stat,children:[(0,W.jsx)(`dt`,{children:d(`stats.fps`)}),(0,W.jsx)(`dd`,{className:j?Qe(j.fps):void 0,children:j?f.count(j.fps):`–`})]}),(0,W.jsxs)(`div`,{className:V.stat,children:[(0,W.jsx)(`dt`,{children:d(`stats.frame`)}),(0,W.jsx)(`dd`,{children:j?f.ms(j.frame):`–`})]}),(0,W.jsxs)(`div`,{className:V.stat,children:[(0,W.jsx)(`dt`,{children:d(`stats.work`)}),(0,W.jsx)(`dd`,{children:j?f.ms(j.work):`–`})]}),(0,W.jsxs)(`div`,{className:V.stat,children:[(0,W.jsx)(`dt`,{children:r}),(0,W.jsx)(`dd`,{title:f.count(n),children:f.compact(n)})]}),u&&(0,W.jsxs)(`div`,{className:V.stat,children:[(0,W.jsx)(`dt`,{children:u.label}),(0,W.jsx)(`dd`,{children:u.value})]}),(0,W.jsxs)(`div`,{className:V.stat,children:[(0,W.jsx)(`dt`,{children:d(`stats.startup`)}),(0,W.jsx)(`dd`,{children:E===null?`–`:f.ms(E)})]})]}),(0,W.jsx)(`div`,{ref:m,className:V.chart,children:_?(0,W.jsx)(t,{data:_.value,chartRef:h,renderer:y,onRendererChange:M,onZoom:N,running:A&&C}):(0,W.jsx)(ie,{className:V.loading,style:{height:i},size:`small`,label:d(`loading`,{value:f.count(n)})})}),(0,W.jsxs)(`div`,{className:V.footer,children:[(0,W.jsx)(`p`,{role:`status`,children:P}),(0,W.jsx)(`p`,{className:V.hint,children:o})]})]})}var U,W,tt;function G(){return(G=e((()=>{U=t(),u(),_(),p(),m(),h(),Te(),et(),Xe(),W=n(),tt=250})))()}function nt({data:e,chartRef:t,renderer:n,onRendererChange:r,onZoom:i}){let{t:a}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),o=(0,it.useMemo)(()=>[{id:`candles`,name:a(`market`),data:{x:e.x,y:e.close,open:e.open,high:e.high,low:e.low}}],[e,a]);return(0,at.jsx)(ae,{ref:t,series:o,renderer:n,onRendererChange:r,onZoom:i,xAxis:{type:`time`},yAxis:{title:a(`price`)},interaction:{zoom:`x`},legend:!1,height:380,ariaLabel:a(`candlesAria`)})}function rt(){let{t:e}=l(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,at.jsx)(H,{load:he,chart:nt,count:I,countLabel:e(`stats.candles`),height:380,motionLabel:e(`tour`),hint:e(`hintX`),tour:(e,t,n)=>ot(t,n),fit:M})}var it,at,ot;function st(){return(st=e((()=>{it=t(),u(),E(),z(),G(),at=n(),ot=N({zoom:1600,period:14,targets:ge})})))()}var ct,lt,ut,dt,ft;function pt(){return(pt=e((()=>{ct=/swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i,lt=e=>{if(typeof document>`u`)return`missing`;let t;try{let n=document.createElement(`canvas`);t=e===`webgl2`?n.getContext(`webgl2`):n.getContext(`webgl`)}catch{t=null}if(!t)return`missing`;let n=t.getExtension(`WEBGL_debug_renderer_info`),r=n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER);return t.getExtension(`WEBGL_lose_context`)?.loseContext(),ct.test(String(r??``))?`software`:`hardware`},ut=async()=>{let e=typeof navigator>`u`?void 0:navigator.gpu;if(!e)return`missing`;let t;try{t=await e.requestAdapter()}catch{t=null}if(!t)return`missing`;let n=t.info,r=[n?.vendor,n?.architecture,n?.description].join(` `);return t.isFallbackAdapter||n?.isFallbackAdapter||ct.test(r)?`software`:`hardware`},dt=null,ft=()=>(dt||=ut().then(e=>({webgpu:e,webgl2:lt(`webgl2`),webgl:lt(`webgl`),canvas2d:`hardware`})),dt)})))()}function mt(){let{t:e}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),t=$e(),n=(0,K.useRef)(null),r=(0,K.useId)(),i=xe(n,`300px`),a=xe(n),[o,s]=(0,K.useState)(`line`),[c,u]=(0,K.useState)(null),[d,p]=(0,K.useState)(null),[m,h]=(0,K.useState)(null),[ne,re]=(0,K.useState)({}),[g,_]=(0,K.useState)({}),[v,y]=(0,K.useState)([]),[b,x]=(0,K.useState)(null),S=(0,K.useRef)({}),C=(0,K.useRef)(null);(0,K.useEffect)(()=>{if(!i)return;let e=!1;return o===`line`?ue().then(t=>!e&&u(t)):fe().then(t=>!e&&p(t)),()=>{e=!0}},[i,o]),(0,K.useEffect)(()=>{if(!i)return;let e=!1;return ft().then(t=>!e&&h(t)),()=>{e=!0}},[i]);let[w,T]=(0,K.useMemo)(()=>{let t=t=>{let n=t?yt:e=>e;return o===`line`?c?.y.map((t,r)=>({id:`sensor-${r}`,name:e(`sensor`,{index:r+1}),data:{x:n(c.x),y:n(t)},lineWidth:1}))??null:d?.clusters.map(({x:r,y:i},a)=>({id:`cluster-${a}`,name:e(`cluster`,{index:a+1}),type:`scatter`,data:{x:n(r),y:n(i)},pointSize:2,opacity:t?.7:.55}))??null};return[t(!1),t(!0)]},[o,c,d,e]),ae=o===`line`?(c?.y.length??0)*Math.ceil((c?.x.length??0)/Y):(d?.clusters??[]).reduce((e,{x:t})=>e+Math.ceil(t.length/Y),0),E=(e,t,n)=>{n&&_(e=>({...e,[t]:n}));let r=e.queue[e.index+1];C.current=r?_t(e.queue,e.index+1):null,x(r??null)};Se(a&&b!==null,{onFrame:e=>{let t=C.current,n=t?.queue[t.index];if(!t||!n)return;t.created||=e;let r=S.current[n]?.getInstance();if(!t.ready||!r){e-t.created>gt&&E(t,n,null);return}if(t.warmup<1){t.warmup++;return}if(!t.base){r.resetZoom(),t.base=r.getView(),t.start=e;return}let i=e-t.start;t.frames++;let a=vt(o,c)(i/1e3,t.base);if(o===`line`&&c&&a.x){let e=M(c,a.x);e&&(a.y=e)}r.setView(a),!(i<ht)&&E(t,n,{fps:t.frames*1e3/i,work:t.works?t.work/t.works:0})},onWork:e=>{let t=C.current;t?.base&&(t.work+=e,t.works++)}});let oe=()=>{if(!m)return;let e=J.filter(e=>m[e]!==`software`);y(J.filter(e=>m[e]===`software`)),_({}),C.current=_t(e),x(e[0]??null)},O=e=>{y(t=>t.filter(t=>t!==e)),C.current=_t([e]),x(e)},k=Math.max(1,...Object.values(g).map(e=>e.work)),se=n=>{let r=ne[n];return r&&r!==n?e(`compare.fellBack`,{requested:t.renderer(n),backend:t.renderer(r)}):t.renderer(n)},A=Object.keys(g).length>0||v.length>0;return(0,q.jsxs)(`div`,{ref:n,className:V.stage,children:[(0,q.jsxs)(`div`,{className:V.toolbar,children:[(0,q.jsxs)(ee,{"aria-label":e(`compare.dataset`),direction:`horizontal`,size:`small`,value:o,disabled:b!==null,onChange:e=>{s(e),_({}),y([])},children:[(0,q.jsx)(te,{value:`line`,label:e(`compare.line`)}),(0,q.jsx)(te,{value:`scatter`,label:e(`compare.scatter`)})]}),(0,q.jsx)(f,{size:`small`,disabled:!w||!m||b!==null,onClick:oe,children:e(`compare.run`)})]}),w&&T?(0,q.jsx)(`div`,{className:V.compareGrid,children:J.map(n=>{let r=g[n],i=ne[n],a=m?.[n]===`software`;return(0,q.jsxs)(`div`,{className:`${V.panel} ${b===n?V.panelActive:``}`,children:[(0,q.jsxs)(`div`,{className:V.panelHeader,children:[(0,q.jsxs)(`span`,{children:[(0,q.jsx)(`strong`,{children:t.renderer(n)}),i&&i!==n&&(0,q.jsxs)(`span`,{className:V.fallback,children:[` `,e(`compare.fallback`,{backend:t.renderer(i)})]})]}),(0,q.jsx)(`span`,{className:V.result,children:r?(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(`span`,{className:Qe(r.fps),children:e(`fps`,{value:t.count(r.fps)})}),` · `,t.ms(r.work)]}):b===n?e(`compare.measuring`):v.includes(n)?e(`compare.skipped`):`–`})]}),b===n?(0,q.jsx)(D,{ref:e=>{e?S.current[n]=e:delete S.current[n]},series:w,renderer:n,onRendererChange:e=>{let t=C.current;t&&t.queue[t.index]===n&&(t.ready=!0),re(t=>({...t,[n]:e}))},legend:!1,xAxis:o===`line`?{type:`time`}:void 0,height:220,ariaLabel:e(`compareAria`,{backend:t.renderer(n)})},`run`):(0,q.jsx)(D,{series:T,renderer:`canvas2d`,legend:!1,xAxis:o===`line`?{type:`time`}:void 0,height:220,ariaLabel:e(`compare.previewAria`,{backend:t.renderer(n)})},`preview`),(0,q.jsx)(`div`,{className:V.panelNote,children:b===n?(0,q.jsx)(`span`,{children:e(`compare.live`,{backend:t.renderer(i??n),value:t.compact(1e6)})}):a&&!r?(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(`span`,{className:V.fallback,children:e(`compare.software`)}),(0,q.jsx)(f,{size:`xsmall`,variant:`outline`,disabled:b!==null,onClick:()=>O(n),children:e(`compare.runAnyway`)})]}):(0,q.jsx)(`span`,{className:V.hint,children:e(`compare.preview`,{value:t.compact(ae)})})})]},n)})}):(0,q.jsx)(ie,{className:V.loading,style:{height:480},size:`small`,label:e(`loading`,{value:t.count(1e6)})}),Object.keys(g).length>0&&(0,q.jsxs)(`div`,{className:V.results,children:[(0,q.jsx)(`p`,{className:V.barsTitle,id:r,children:e(`compare.results`)}),(0,q.jsx)(`ol`,{className:V.bars,"aria-labelledby":r,children:J.map(n=>{let r=g[n];return r?(0,q.jsxs)(`li`,{className:V.bar,children:[(0,q.jsx)(`span`,{children:se(n)}),(0,q.jsx)(`span`,{className:V.barTrack,children:(0,q.jsx)(`span`,{className:V.barFill,style:{width:`${r.work/k*100}%`}})}),(0,q.jsxs)(`span`,{className:V.result,children:[t.ms(r.work),` ·`,` `,(0,q.jsx)(`span`,{className:Qe(r.fps),children:e(`fps`,{value:t.count(r.fps)})})]})]},n):null})})]}),(0,q.jsxs)(`div`,{className:V.footer,children:[(0,q.jsx)(`p`,{role:`status`,children:b?e(`compare.running`,{backend:t.renderer(b)}):A?v.length?`${e(`compare.done`)} ${e(`compare.skippedNote`,{backends:v.map(t.renderer).join(`, `)})}`:e(`compare.done`):e(`compare.idle`)}),(0,q.jsx)(`p`,{className:V.hint,children:e(`compare.hint`)})]})]})}var K,q,J,ht,gt,Y,_t,vt,yt;function bt(){return(bt=e((()=>{K=t(),u(),d(),_(),p(),m(),oe(),z(),pt(),Te(),et(),Xe(),q=n(),J=[`webgpu`,`webgl2`,`webgl`,`canvas2d`],ht=3e3,gt=15e3,Y=100,_t=(e,t=0)=>({queue:e,index:t,ready:!1,warmup:0,created:0,start:0,frames:0,work:0,works:0,base:null}),vt=(e,t)=>N(e===`line`?{zoom:400,period:ht/1e3,targets:[[t?.x[t.x.length>>1]??NaN,NaN]]}:{zoom:20,period:ht/1e3,targets:[[50,50]],y:!0}),yt=e=>{let t=new Float64Array(Math.ceil(e.length/Y));for(let n=0,r=0;n<e.length;n+=Y,r++)t[r]=e[n]??NaN;return t}})))()}function xt({data:e,chartRef:t,renderer:n,onRendererChange:r}){let{t:i}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),a=(0,Ct.useMemo)(()=>[{id:`spectrogram`,name:i(`level`),type:`heatmap`,data:{x:e.x,y:e.y,value:e.value},colorScale:Tt,valueRange:[-70,0],radius:0,format:e=>i(`db`,{value:e.toFixed(1)})}],[e,i]);return(0,wt.jsx)(D,{ref:t,series:a,renderer:n,onRendererChange:r,xAxis:{title:i(`time`)},yAxis:{type:`linear`,title:i(`frequency`)},interaction:{zoom:`xy`},legend:!1,height:420,ariaLabel:i(`heatmapAria`)})}function St(){let{t:e}=l(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,wt.jsx)(H,{load:ye,chart:xt,count:L*R,countLabel:e(`stats.cells`),height:420,motionLabel:e(`tour`),hint:e(`hintXY`),tour:(e,t,n)=>Et(t,n)})}var Ct,wt,Tt,Et;function Dt(){return(Dt=e((()=>{Ct=t(),u(),oe(),z(),G(),wt=n(),Tt=[`#000004`,`#2c115f`,`#721f81`,`#b73779`,`#f1605d`,`#feb078`,`#fcfdbf`],Et=N({zoom:40,period:12,targets:be,y:!0})})))()}function Ot({data:e,chartRef:t,renderer:n,onRendererChange:r,onZoom:i}){let{t:a}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),o=(0,At.useMemo)(()=>e.y.map((t,n)=>({id:`sensor-${n}`,name:a(`sensor`,{index:n+1}),data:{x:e.x,y:t},lineWidth:1})),[e,a]);return(0,jt.jsx)(w,{ref:t,series:o,renderer:n,onRendererChange:r,onZoom:i,xAxis:{type:`time`},yAxis:{title:a(`temperature`)},interaction:{zoom:`x`},height:360,ariaLabel:a(`lineAria`)})}function kt(){let{t:e}=l(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,jt.jsx)(H,{load:ue,chart:Ot,count:4*P,countLabel:e(`stats.points`),height:360,motionLabel:e(`tour`),hint:e(`hintX`),tour:(e,t,n)=>Mt(t,n),fit:M})}var At,jt,Mt;function Nt(){return(Nt=e((()=>{At=t(),u(),E(),z(),G(),jt=n(),Mt=N({zoom:1200,period:14,targets:de})})))()}function Pt({data:e,chartRef:t,renderer:n,onRendererChange:r}){let{t:i}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),a=(0,It.useMemo)(()=>e.clusters.map((e,t)=>({id:`cluster-${t}`,name:i(`cluster`,{index:t+1}),data:e,pointSize:2,opacity:.55})),[e,i]);return(0,Lt.jsx)(T,{ref:t,series:a,palette:Rt,renderer:n,onRendererChange:r,legend:{position:`bottom`},height:420,ariaLabel:i(`scatterAria`)})}function Ft(){let{t:e}=l(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,Lt.jsx)(H,{load:fe,chart:Pt,count:10*F,countLabel:e(`stats.points`),height:420,motionLabel:e(`tour`),hint:e(`hintXY`),tour:(e,t,n)=>N({zoom:12,period:10,targets:e.centers,y:!0})(t,n)})}var It,Lt,Rt;function zt(){return(zt=e((()=>{It=t(),u(),E(),z(),G(),Lt=n(),Rt=[`#4f6bed`,`#e8590c`,`#2f9e44`,`#c2255c`,`#0c8599`,`#f59f00`,`#7048e8`,`#5c940d`,`#d6336c`,`#1971c2`]})))()}function Bt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Vt(e,t){let{x:n,y:r,random:i}=e;if(e.end+t>Jt){let t=e.end-Q;n.copyWithin(0,t,e.end);for(let n of r)n.copyWithin(0,t,e.end);e.end=Q}for(let r=0;r<t;r++)n[e.end+r]=e.start+(e.samples+r)*Yt;r.forEach((n,r)=>{for(let a=0;a<t;a++){let t=(e.samples+a)/qt,o=Math.sin(t*.7+r)>.85?2.4:0;n[e.end+a]=(11-r)*10+Math.sin(2*Math.PI*(1.5+r*.6)*t)*2.2+Math.sin(2*Math.PI*.25*t+r)*1.2+Math.sin(2*Math.PI*23*t)*o+(i()-.5)*1.6}}),e.end+=t,e.samples+=t}function Ht(){let e={x:new Float64Array(Jt),y:Array.from({length:Z},()=>new Float64Array(Jt)),end:0,samples:0,start:Date.now()-Q*Yt,random:Bt(12)};return Vt(e,Q),e}function Ut(e,t,n){let r=Math.max(0,e.end-Q),i=e.x.subarray(r,e.end);return{series:e.y.map((t,a)=>({id:`channel-${a}`,name:n.channel(a+1),data:{x:i,y:t.subarray(r,e.end)},lineWidth:1})),renderer:t,xAxis:{type:`time`},yAxis:{min:-6,max:116,visible:!1},legend:!1,tooltip:{mode:`nearest`},interaction:!1,ariaLabel:n.aria}}function Wt({renderer:e,running:t,onRendererChange:n}){let{t:r}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),i=(0,X.useRef)(null),a=(0,X.useRef)(null),o=(0,X.useRef)(null),s={channel:e=>r(`channel`,{index:e}),aria:r(`streamAria`,{value:Z})},c=(0,X.useRef)({labels:s,renderer:e,onRendererChange:n});return(0,X.useEffect)(()=>{c.current={labels:s,renderer:e,onRendererChange:n}}),(0,X.useEffect)(()=>{let e=i.current;if(!e)return;let t=Ht();o.current=t;let{renderer:n,labels:r}=c.current,s=v(e,Ut(t,n,r));a.current=s;let l=s.on(`renderer`,e=>c.current.onRendererChange(e));return()=>{l(),s.destroy(),a.current=null,o.current=null}},[]),(0,X.useEffect)(()=>{let t=o.current;t&&a.current?.setOptions(Ut(t,e,c.current.labels))},[e]),(0,X.useEffect)(()=>{if(!t)return;let e=0,n=0,r=0,i=t=>{e=requestAnimationFrame(i);let s=o.current,l=a.current;if(!s||!l)return;r+=Math.min(100,n?t-n:16)*qt/1e3,n=t;let u=Math.floor(r);if(!u)return;r-=u,Vt(s,u);let{renderer:d,labels:f}=c.current;l.setOptions(Ut(s,d,f))};return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)},[t]),(0,Kt.jsx)(`div`,{ref:i,style:{height:400,width:`100%`}})}function Gt(){let{t:e}=l(`common`,{keyPrefix:`docs.chart-performance.data`}),{compact:t}=$e();return(0,Kt.jsx)(H,{load:Xt,chart:Wt,count:Z*Q,countLabel:e(`stats.points`),height:400,motionLabel:e(`stream`),hint:e(`hintStream`),extra:{label:e(`stats.ingest`),value:e(`perSecond`,{value:t(Z*qt)})}})}var X,Kt,Z,qt,Q,Jt,Yt,Xt;function Zt(){return(Zt=e((()=>{X=t(),u(),y(),G(),et(),Kt=n(),Z=12,qt=2e3,Q=2e4,Jt=Q*4,Yt=1e3/qt,Xt=()=>Promise.resolve(!0)})))()}var Qt;function $t(){return($t=e((()=>{Qt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CandlestickChart, type ChartSeries } from "minerva-design/charts";
import {
  CANDLE_COUNT,
  CANDLE_TARGETS,
  fitY,
  loadCandles,
  tour,
  type Candles,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

// from 200,000 candles (about 140 days) down to two hours of one-minute candles
const candleTour = tour({ zoom: 1600, period: 14, targets: CANDLE_TARGETS });

function Market({
  data,
  chartRef,
  renderer,
  onRendererChange,
  onZoom,
}: ShowcaseChartProps<Candles>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // OHLC columns: y holds the closes
  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "candles",
        name: t("market"),
        data: {
          x: data.x,
          y: data.close,
          open: data.open,
          high: data.high,
          low: data.low,
        },
      },
    ],
    [data, t],
  );
  return (
    <CandlestickChart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      onZoom={onZoom}
      xAxis={{ type: "time" }}
      yAxis={{ title: t("price") }}
      interaction={{ zoom: "x" }}
      legend={false}
      height={380}
      ariaLabel={t("candlesAria")}
    />
  );
}

export default function CandlesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadCandles}
      chart={Market}
      count={CANDLE_COUNT}
      countLabel={t("stats.candles")}
      height={380}
      motionLabel={t("tour")}
      hint={t("hintX")}
      tour={(data, time, base) => candleTour(time, base)}
      fit={fitY}
    />
  );
}
`})))()}var en;function tn(){return(tn=e((()=>{en=`import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, LoadingState, Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartHandle,
  type ChartRendererKind,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";
import {
  fitY,
  loadClusters,
  loadSignals,
  tour,
  type Clusters,
  type Signals,
} from "../showcase/data";
import { probeBackends, type BackendsSupport } from "../showcase/gpu";
import { useFrameLoop, useInView } from "../showcase/meter";
import { fpsClass, useShowcaseFormat } from "../showcase/text";
import styles from "../showcase/showcase.module.scss";

const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
/** Duration of the run of each backend, in ms */
const RUN = 3000;
/** A backend that has not started after this long is given up, in ms */
const START_TIMEOUT = 15_000;
/** The previews draw one sample out of PREVIEW_STRIDE */
const PREVIEW_STRIDE = 100;

type Dataset = "line" | "scatter";

interface Result {
  fps: number;
  work: number;
}

interface Run {
  /** Backends of this run, in order */
  queue: readonly ChartRendererKind[];
  index: number;
  /** The chart under test has started its renderer */
  ready: boolean;
  /** Frames skipped after the start (the first draw uploads the data) */
  warmup: number;
  created: number;
  start: number;
  frames: number;
  work: number;
  works: number;
  base: ChartView | null;
}

const newRun = (queue: readonly ChartRendererKind[], index = 0): Run => ({
  queue,
  index,
  ready: false,
  warmup: 0,
  created: 0,
  start: 0,
  frames: 0,
  work: 0,
  works: 0,
  base: null,
});

/** One zoom in / zoom out per run, into the middle of the data */
const runTour = (dataset: Dataset, signals: Signals | null) =>
  dataset === "line"
    ? tour({
        zoom: 400,
        period: RUN / 1000,
        targets: [[signals?.x[signals.x.length >> 1] ?? NaN, NaN]],
      })
    : tour({ zoom: 20, period: RUN / 1000, targets: [[50, 50]], y: true });

/** Every PREVIEW_STRIDE-th value of a column */
const decimate = (column: Float64Array) => {
  const out = new Float64Array(Math.ceil(column.length / PREVIEW_STRIDE));
  for (let i = 0, j = 0; i < column.length; i += PREVIEW_STRIDE, j++)
    out[j] = column[i] ?? NaN;
  return out;
};

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const resultsId = useId();
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [dataset, setDataset] = useState<Dataset>("line");
  const [signals, setSignals] = useState<Signals | null>(null);
  const [clusters, setClusters] = useState<Clusters | null>(null);
  const [support, setSupport] = useState<BackendsSupport | null>(null);
  const [actual, setActual] = useState<
    Partial<Record<ChartRendererKind, ChartRendererKind>>
  >({});
  const [results, setResults] = useState<
    Partial<Record<ChartRendererKind, Result>>
  >({});
  const [skipped, setSkipped] = useState<readonly ChartRendererKind[]>([]);
  const [testing, setTesting] = useState<ChartRendererKind | null>(null);
  const handles = useRef<Partial<Record<ChartRendererKind, ChartHandle>>>({});
  const runRef = useRef<Run | null>(null);

  // the same arrays as the demos above: generated once for the page
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    if (dataset === "line")
      void loadSignals().then((data) => !cancelled && setSignals(data));
    else void loadClusters().then((data) => !cancelled && setClusters(data));
    return () => {
      cancelled = true;
    };
  }, [near, dataset]);

  // which GPU backends would run in software (and block the page)
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    void probeBackends().then((probed) => !cancelled && setSupport(probed));
    return () => {
      cancelled = true;
    };
  }, [near]);

  const [series, preview] = useMemo(() => {
    const make = (light: boolean): ChartSeries[] | null => {
      const column = light ? decimate : (c: Float64Array) => c;
      if (dataset === "line")
        return (
          signals?.y.map((y, index) => ({
            id: \`sensor-\${index}\`,
            name: t("sensor", { index: index + 1 }),
            data: { x: column(signals.x), y: column(y) },
            lineWidth: 1,
          })) ?? null
        );
      return (
        clusters?.clusters.map(({ x, y }, index) => ({
          id: \`cluster-\${index}\`,
          name: t("cluster", { index: index + 1 }),
          type: "scatter",
          data: { x: column(x), y: column(y) },
          pointSize: 2,
          opacity: light ? 0.7 : 0.55,
        })) ?? null
      );
    };
    // the previews are a light copy, drawn with Canvas2D until a run
    return [make(false), make(true)];
  }, [dataset, signals, clusters, t]);
  const previewPoints =
    dataset === "line"
      ? (signals?.y.length ?? 0) *
        Math.ceil((signals?.x.length ?? 0) / PREVIEW_STRIDE)
      : (clusters?.clusters ?? []).reduce(
          (sum, { x }) => sum + Math.ceil(x.length / PREVIEW_STRIDE),
          0,
        );

  const finish = (run: Run, kind: ChartRendererKind, result: Result | null) => {
    if (result) setResults((previous) => ({ ...previous, [kind]: result }));
    const next = run.queue[run.index + 1];
    runRef.current = next ? newRun(run.queue, run.index + 1) : null;
    setTesting(next ?? null);
  };

  /** Every backend in turn: the same camera path for RUN ms */
  useFrameLoop(visible && testing !== null, {
    onFrame: (time) => {
      const run = runRef.current;
      const kind = run?.queue[run.index];
      if (!run || !kind) return;
      if (!run.created) run.created = time;
      const instance = handles.current[kind]?.getInstance();
      if (!run.ready || !instance) {
        if (time - run.created > START_TIMEOUT) finish(run, kind, null);
        return;
      }
      if (run.warmup < 1) {
        run.warmup++;
        return;
      }
      if (!run.base) {
        instance.resetZoom();
        run.base = instance.getView();
        run.start = time;
        return;
      }
      const elapsed = time - run.start;
      run.frames++;
      const view = runTour(dataset, signals)(elapsed / 1000, run.base);
      if (dataset === "line" && signals && view.x) {
        const y = fitY(signals, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
      if (elapsed < RUN) return;
      finish(run, kind, {
        fps: (run.frames * 1000) / elapsed,
        work: run.works ? run.work / run.works : 0,
      });
    },
    onWork: (ms) => {
      const run = runRef.current;
      if (run?.base) {
        run.work += ms;
        run.works++;
      }
    },
  });

  /** Runs the backends that have a hardware GPU (or none: they fall back) */
  const start = () => {
    if (!support) return;
    const queue = BACKENDS.filter((kind) => support[kind] !== "software");
    setSkipped(BACKENDS.filter((kind) => support[kind] === "software"));
    setResults({});
    runRef.current = newRun(queue);
    setTesting(queue[0] ?? null);
  };

  /** Runs a single backend, even on a software GPU */
  const runAnyway = (kind: ChartRendererKind) => {
    setSkipped((previous) => previous.filter((k) => k !== kind));
    runRef.current = newRun([kind]);
    setTesting(kind);
  };

  /** Bars are relative to the slowest backend (main-thread time) */
  const slowest = Math.max(1, ...Object.values(results).map((r) => r.work));
  const label = (kind: ChartRendererKind) => {
    const drawn = actual[kind];
    return drawn && drawn !== kind
      ? t("compare.fellBack", {
          requested: text.renderer(kind),
          backend: text.renderer(drawn),
        })
      : text.renderer(kind);
  };
  const ran = Object.keys(results).length > 0 || skipped.length > 0;

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("compare.dataset")}
          direction="horizontal"
          size="small"
          value={dataset}
          disabled={testing !== null}
          onChange={(value) => {
            setDataset(value as Dataset);
            setResults({});
            setSkipped([]);
          }}
        >
          <Radio value="line" label={t("compare.line")} />
          <Radio value="scatter" label={t("compare.scatter")} />
        </RadioGroup>
        <Button
          size="small"
          disabled={!series || !support || testing !== null}
          onClick={start}
        >
          {t("compare.run")}
        </Button>
      </div>

      {series && preview ? (
        <div className={styles.compareGrid}>
          {BACKENDS.map((kind) => {
            const result = results[kind];
            const drawn = actual[kind];
            const software = support?.[kind] === "software";
            return (
              <div
                key={kind}
                className={\`\${styles.panel} \${testing === kind ? styles.panelActive : ""}\`}
              >
                <div className={styles.panelHeader}>
                  <span>
                    <strong>{text.renderer(kind)}</strong>
                    {drawn && drawn !== kind && (
                      <span className={styles.fallback}>
                        {" "}
                        {t("compare.fallback", {
                          backend: text.renderer(drawn),
                        })}
                      </span>
                    )}
                  </span>
                  <span className={styles.result}>
                    {result ? (
                      <>
                        <span className={fpsClass(result.fps)}>
                          {t("fps", { value: text.count(result.fps) })}
                        </span>
                        {" · "}
                        {text.ms(result.work)}
                      </>
                    ) : testing === kind ? (
                      t("compare.measuring")
                    ) : skipped.includes(kind) ? (
                      t("compare.skipped")
                    ) : (
                      "–"
                    )}
                  </span>
                </div>
                {testing === kind ? (
                  // the full data set, only for the run of this backend
                  <Chart
                    key="run"
                    ref={(handle) => {
                      if (handle) handles.current[kind] = handle;
                      else delete handles.current[kind];
                    }}
                    series={series}
                    renderer={kind}
                    onRendererChange={(drawnWith) => {
                      const run = runRef.current;
                      if (run && run.queue[run.index] === kind)
                        run.ready = true;
                      setActual((previous) => ({
                        ...previous,
                        [kind]: drawnWith,
                      }));
                    }}
                    legend={false}
                    xAxis={dataset === "line" ? { type: "time" } : undefined}
                    height={220}
                    ariaLabel={t("compareAria", {
                      backend: text.renderer(kind),
                    })}
                  />
                ) : (
                  <Chart
                    key="preview"
                    series={preview}
                    renderer="canvas2d"
                    legend={false}
                    xAxis={dataset === "line" ? { type: "time" } : undefined}
                    height={220}
                    ariaLabel={t("compare.previewAria", {
                      backend: text.renderer(kind),
                    })}
                  />
                )}
                <div className={styles.panelNote}>
                  {testing === kind ? (
                    <span>
                      {t("compare.live", {
                        backend: text.renderer(drawn ?? kind),
                        value: text.compact(1_000_000),
                      })}
                    </span>
                  ) : software && !result ? (
                    <>
                      <span className={styles.fallback}>
                        {t("compare.software")}
                      </span>
                      <Button
                        size="xsmall"
                        variant="outline"
                        disabled={testing !== null}
                        onClick={() => runAnyway(kind)}
                      >
                        {t("compare.runAnyway")}
                      </Button>
                    </>
                  ) : (
                    <span className={styles.hint}>
                      {t("compare.preview", {
                        value: text.compact(previewPoints),
                      })}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingState
          className={styles.loading}
          style={{ height: 480 }}
          size="small"
          label={t("loading", { value: text.count(1_000_000) })}
        />
      )}

      {Object.keys(results).length > 0 && (
        <div className={styles.results}>
          <p className={styles.barsTitle} id={resultsId}>
            {t("compare.results")}
          </p>
          <ol className={styles.bars} aria-labelledby={resultsId}>
            {BACKENDS.map((kind) => {
              const result = results[kind];
              if (!result) return null;
              return (
                <li key={kind} className={styles.bar}>
                  <span>{label(kind)}</span>
                  <span className={styles.barTrack}>
                    <span
                      className={styles.barFill}
                      style={{ width: \`\${(result.work / slowest) * 100}%\` }}
                    />
                  </span>
                  <span className={styles.result}>
                    {text.ms(result.work)} ·{" "}
                    <span className={fpsClass(result.fps)}>
                      {t("fps", { value: text.count(result.fps) })}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className={styles.footer}>
        <p role="status">
          {testing
            ? t("compare.running", { backend: text.renderer(testing) })
            : ran
              ? skipped.length
                ? \`\${t("compare.done")} \${t("compare.skippedNote", {
                    backends: skipped.map(text.renderer).join(", "),
                  })}\`
                : t("compare.done")
              : t("compare.idle")}
        </p>
        <p className={styles.hint}>{t("compare.hint")}</p>
      </div>
    </div>
  );
}
`})))()}var nn;function rn(){return(rn=e((()=>{nn=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chart, type ChartSeries } from "minerva-design/charts";
import {
  SPECTRUM_BINS,
  SPECTRUM_STEPS,
  SPECTRUM_TARGETS,
  loadSpectrogram,
  tour,
  type Spectrogram,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

const MAGMA = [
  "#000004",
  "#2c115f",
  "#721f81",
  "#b73779",
  "#f1605d",
  "#feb078",
  "#fcfdbf",
];

// zooms until single cells (20 ms × 8 Hz) are a few pixels wide
const spectrumTour = tour({
  zoom: 40,
  period: 12,
  targets: SPECTRUM_TARGETS,
  y: true,
});

function Spectrum({
  data,
  chartRef,
  renderer,
  onRendererChange,
}: ShowcaseChartProps<Spectrogram>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // 1,000,000 cells in three typed-array columns: time, frequency, level
  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "spectrogram",
        name: t("level"),
        type: "heatmap",
        data: { x: data.x, y: data.y, value: data.value },
        colorScale: MAGMA,
        valueRange: [-70, 0],
        radius: 0,
        format: (value) => t("db", { value: value.toFixed(1) }),
      },
    ],
    [data, t],
  );
  return (
    <Chart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      xAxis={{ title: t("time") }}
      yAxis={{ type: "linear", title: t("frequency") }}
      interaction={{ zoom: "xy" }}
      legend={false}
      height={420}
      ariaLabel={t("heatmapAria")}
    />
  );
}

export default function HeatmapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadSpectrogram}
      chart={Spectrum}
      count={SPECTRUM_STEPS * SPECTRUM_BINS}
      countLabel={t("stats.cells")}
      height={420}
      motionLabel={t("tour")}
      hint={t("hintXY")}
      tour={(data, time, base) => spectrumTour(time, base)}
    />
  );
}
`})))()}var an;function on(){return(on=e((()=>{an=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";
import {
  SIGNAL_LENGTH,
  SIGNAL_SERIES,
  SIGNAL_TARGETS,
  fitY,
  loadSignals,
  tour,
  type Signals,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

// zooms from the 1,000,000 points down to ~3 minutes of one sensor
const lineTour = tour({ zoom: 1200, period: 14, targets: SIGNAL_TARGETS });

function Sensors({
  data,
  chartRef,
  renderer,
  onRendererChange,
  onZoom,
}: ShowcaseChartProps<Signals>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // typed-array columns sharing one x column: no per-point objects
  const series = useMemo(
    (): ChartSeries[] =>
      data.y.map((y, index) => ({
        id: \`sensor-\${index}\`,
        name: t("sensor", { index: index + 1 }),
        data: { x: data.x, y },
        lineWidth: 1,
      })),
    [data, t],
  );
  return (
    <LineChart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      onZoom={onZoom}
      xAxis={{ type: "time" }}
      yAxis={{ title: t("temperature") }}
      interaction={{ zoom: "x" }}
      height={360}
      ariaLabel={t("lineAria")}
    />
  );
}

export default function LineDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadSignals}
      chart={Sensors}
      count={SIGNAL_SERIES * SIGNAL_LENGTH}
      countLabel={t("stats.points")}
      height={360}
      motionLabel={t("tour")}
      hint={t("hintX")}
      tour={(data, time, base) => lineTour(time, base)}
      fit={fitY}
    />
  );
}
`})))()}var sn;function cn(){return(cn=e((()=>{sn=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";
import {
  CLUSTER_COUNT,
  CLUSTER_SIZE,
  loadClusters,
  tour,
  type Clusters,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

const PALETTE = [
  "#4f6bed",
  "#e8590c",
  "#2f9e44",
  "#c2255c",
  "#0c8599",
  "#f59f00",
  "#7048e8",
  "#5c940d",
  "#d6336c",
  "#1971c2",
];

function ClusterChart({
  data,
  chartRef,
  renderer,
  onRendererChange,
}: ShowcaseChartProps<Clusters>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // one series (one color) per cluster, 100,000 typed-array points each
  const series = useMemo(
    (): ChartSeries[] =>
      data.clusters.map((cluster, index) => ({
        id: \`cluster-\${index}\`,
        name: t("cluster", { index: index + 1 }),
        data: cluster,
        pointSize: 2,
        opacity: 0.55,
      })),
    [data, t],
  );
  return (
    <ScatterChart
      ref={chartRef}
      series={series}
      palette={PALETTE}
      renderer={renderer}
      onRendererChange={onRendererChange}
      legend={{ position: "bottom" }}
      height={420}
      ariaLabel={t("scatterAria")}
    />
  );
}

export default function ScatterDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadClusters}
      chart={ClusterChart}
      count={CLUSTER_COUNT * CLUSTER_SIZE}
      countLabel={t("stats.points")}
      height={420}
      motionLabel={t("tour")}
      hint={t("hintXY")}
      tour={(data, time, base) =>
        // zooms into one cluster after the other, on both axes
        tour({ zoom: 12, period: 10, targets: data.centers, y: true })(
          time,
          base,
        )
      }
    />
  );
}
`})))()}var ln;function un(){return(un=e((()=>{ln=`import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
  type ChartRendererPreference,
} from "minerva-design/charts/core";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";
import { useShowcaseFormat } from "../showcase/text";

const CHANNELS = 12;
/** Samples per channel and per second */
const RATE = 2_000;
/** Samples per channel on screen: a 10 s sliding window */
const WINDOW = 20_000;
/** Preallocated: the window slides inside, then is copied back to the start */
const CAPACITY = WINDOW * 4;
const STEP = 1000 / RATE;

interface Stream {
  x: Float64Array;
  y: Float64Array[];
  /** End of the filled part */
  end: number;
  /** Samples written so far */
  samples: number;
  start: number;
  random: () => number;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Appends \`count\` samples to every channel */
function append(stream: Stream, count: number) {
  const { x, y, random } = stream;
  if (stream.end + count > CAPACITY) {
    // slide: keep the last window, reuse the same memory
    const from = stream.end - WINDOW;
    x.copyWithin(0, from, stream.end);
    for (const column of y) column.copyWithin(0, from, stream.end);
    stream.end = WINDOW;
  }
  for (let i = 0; i < count; i++) {
    x[stream.end + i] = stream.start + (stream.samples + i) * STEP;
  }
  y.forEach((column, c) => {
    for (let i = 0; i < count; i++) {
      const t = (stream.samples + i) / RATE;
      const burst = Math.sin(t * 0.7 + c) > 0.85 ? 2.4 : 0;
      column[stream.end + i] =
        (CHANNELS - 1 - c) * 10 +
        Math.sin(2 * Math.PI * (1.5 + c * 0.6) * t) * 2.2 +
        Math.sin(2 * Math.PI * 0.25 * t + c) * 1.2 +
        Math.sin(2 * Math.PI * 23 * t) * burst +
        (random() - 0.5) * 1.6;
    }
  });
  stream.end += count;
  stream.samples += count;
}

function createStream(): Stream {
  const stream: Stream = {
    x: new Float64Array(CAPACITY),
    y: Array.from({ length: CHANNELS }, () => new Float64Array(CAPACITY)),
    end: 0,
    samples: 0,
    start: Date.now() - WINDOW * STEP,
    random: mulberry32(12),
  };
  append(stream, WINDOW);
  return stream;
}

interface Labels {
  channel: (index: number) => string;
  aria: string;
}

/** New subarray views of the filled part: a new identity, the same memory */
function optionsOf(
  stream: Stream,
  renderer: ChartRendererPreference,
  labels: Labels,
): ChartOptions {
  const from = Math.max(0, stream.end - WINDOW);
  const x = stream.x.subarray(from, stream.end);
  return {
    series: stream.y.map((column, c) => ({
      id: \`channel-\${c}\`,
      name: labels.channel(c + 1),
      data: { x, y: column.subarray(from, stream.end) },
      lineWidth: 1,
    })),
    renderer,
    xAxis: { type: "time" },
    yAxis: { min: -6, max: CHANNELS * 10 - 4, visible: false },
    legend: false,
    tooltip: { mode: "nearest" },
    interaction: false,
    ariaLabel: labels.aria,
  };
}

function Channels({
  renderer,
  running,
  onRendererChange,
}: ShowcaseChartProps<boolean>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ChartInstance | null>(null);
  const streamRef = useRef<Stream | null>(null);
  const labels: Labels = {
    channel: (index) => t("channel", { index }),
    aria: t("streamAria", { value: CHANNELS }),
  };
  const latest = useRef({ labels, renderer, onRendererChange });
  useEffect(() => {
    latest.current = { labels, renderer, onRendererChange };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const stream = createStream();
    streamRef.current = stream;
    const { renderer: initial, labels: initialLabels } = latest.current;
    const instance = createChart(
      container,
      optionsOf(stream, initial, initialLabels),
    );
    instanceRef.current = instance;
    const off = instance.on("renderer", (kind) =>
      latest.current.onRendererChange(kind),
    );
    return () => {
      off();
      instance.destroy();
      instanceRef.current = null;
      streamRef.current = null;
    };
  }, []);

  // a new backend: the chart starts it and redraws
  useEffect(() => {
    const stream = streamRef.current;
    if (stream)
      instanceRef.current?.setOptions(
        optionsOf(stream, renderer, latest.current.labels),
      );
  }, [renderer]);

  // one setOptions per frame, however many samples arrived
  useEffect(() => {
    if (!running) return;
    let id = 0;
    let last = 0;
    let pending = 0;
    const tick = (time: number) => {
      id = requestAnimationFrame(tick);
      const stream = streamRef.current;
      const instance = instanceRef.current;
      if (!stream || !instance) return;
      pending += (Math.min(100, last ? time - last : 16) * RATE) / 1000;
      last = time;
      const count = Math.floor(pending);
      if (!count) return;
      pending -= count;
      append(stream, count);
      const { renderer: current, labels: names } = latest.current;
      instance.setOptions(optionsOf(stream, current, names));
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [running]);

  return <div ref={containerRef} style={{ height: 400, width: "100%" }} />;
}

const ready = () => Promise.resolve(true);

export default function StreamingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const { compact } = useShowcaseFormat();
  return (
    <Showcase
      load={ready}
      chart={Channels}
      count={CHANNELS * WINDOW}
      countLabel={t("stats.points")}
      height={400}
      motionLabel={t("stream")}
      hint={t("hintStream")}
      extra={{
        label: t("stats.ingest"),
        value: t("perSecond", { value: compact(CHANNELS * RATE) }),
      }}
    />
  );
}
`})))()}function dn(){let{t:e}=l(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-intro`,children:[(0,$.jsx)(`h2`,{id:`perf-intro`,children:e(`docs.chart-performance.intro.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.intro.text`)}),(0,$.jsx)(`p`,{className:c.prose,children:(0,$.jsx)(s,{i18nKey:`docs.chart-performance.intro.pages`,components:{charts:(0,$.jsx)(i,{to:`/charts`}),engine:(0,$.jsx)(i,{to:`/chart-engine`})}})})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-renderers`,children:[(0,$.jsx)(`h2`,{id:`perf-renderers`,children:e(`docs.chart-performance.renderers.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.renderers.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.auto`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.webgl`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.software`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.forced`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.lost`)})]}),(0,$.jsx)(g,{language:`ts`,code:pn})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-showcase`,children:[(0,$.jsx)(`h2`,{id:`perf-showcase`,children:e(`docs.chart-performance.showcase.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.showcase.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.showcase.fps`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.showcase.work`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.showcase.startup`)})]})]})]});return(0,$.jsxs)(S,{id:`chart-performance`,demos:fn,intro:t,children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-data`,children:[(0,$.jsx)(`h2`,{id:`perf-data`,children:e(`docs.chart-performance.formats.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.formats.text`)}),(0,$.jsxs)(`ol`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.typed`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.columns`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.tuples`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.objects`)})]}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.formats.identity`)}),(0,$.jsx)(g,{language:`ts`,code:mn})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-visible`,children:[(0,$.jsx)(`h2`,{id:`perf-visible`,children:e(`docs.chart-performance.visible.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.visible.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.sorted`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.unsorted`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.decimation`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.scatter`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.hit`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.dom`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-zoom`,children:[(0,$.jsx)(`h2`,{id:`perf-zoom`,children:e(`docs.chart-performance.zoom.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.zoom.gpu`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.zoom.canvas`)})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-scale`,children:[(0,$.jsx)(`h2`,{id:`perf-scale`,children:e(`docs.chart-performance.scale.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.scale.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.scale.line`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.scale.scatter`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.scale.update`)})]}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.scale.guidance`)})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-react`,children:[(0,$.jsx)(`h2`,{id:`perf-react`,children:e(`docs.chart-performance.react.title`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.memo`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.shallow`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.typed`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.shapes`)})]}),(0,$.jsx)(g,{language:`tsx`,code:hn})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-streaming`,children:[(0,$.jsx)(`h2`,{id:`perf-streaming`,children:e(`docs.chart-performance.streaming.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.streaming.text`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.streaming.batch`)}),(0,$.jsx)(g,{language:`ts`,code:gn})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-shapes`,children:[(0,$.jsx)(`h2`,{id:`perf-shapes`,children:e(`docs.chart-performance.shapes.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.shapes.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.shapes.gpu`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.shapes.canvas`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`perf-platforms`,children:[(0,$.jsx)(`h2`,{id:`perf-platforms`,children:e(`docs.chart-performance.platforms.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:(0,$.jsx)(s,{i18nKey:`docs.chart-performance.platforms.mini`,components:{mini:(0,$.jsx)(i,{to:`/mini-program-charts`})}})}),(0,$.jsx)(`p`,{className:c.prose,children:(0,$.jsx)(s,{i18nKey:`docs.chart-performance.platforms.native`,components:{native:(0,$.jsx)(i,{to:`/react-native`})}})}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-performance.platforms.primitives`)}),(0,$.jsx)(g,{language:`ts`,code:_n})]})]})}var $,fn,pn,mn,hn,gn,_n;function vn(){return(vn=e((()=>{st(),bt(),Dt(),Nt(),zt(),Zt(),$t(),tn(),rn(),on(),cn(),un(),t(),o(),u(),r(),re(),x(),a(),C(),$=n(),fn=b(Object.assign({"./demos/candles.tsx":rt,"./demos/compare.tsx":mt,"./demos/heatmap.tsx":St,"./demos/line.tsx":kt,"./demos/scatter.tsx":Ft,"./demos/streaming.tsx":Gt}),Object.assign({"./demos/candles.tsx":Qt,"./demos/compare.tsx":en,"./demos/heatmap.tsx":nn,"./demos/line.tsx":an,"./demos/scatter.tsx":sn,"./demos/streaming.tsx":ln})),pn=`import { createChart } from "minerva-design/charts/core";

// "auto" (default): WebGPU, then WebGL2, then WebGL, then Canvas2D
const chart = createChart(container, { series, renderer: "auto" });
chart.ready.then((kind) => showRenderer(kind)); // "webgpu" | "webgl2" | "webgl" | "canvas2d" | null
// fired again when the GPU is lost and the chart falls back
chart.on("renderer", (kind) => showRenderer(kind));

// force a backend (also accepted on every React chart: renderer="webgl")
createChart(other, { series, renderer: "canvas2d" });`,mn=`const n = 1_000_000;
const x = new Float64Array(n); // timestamps or indexes, sorted
const y = new Float32Array(n);
// ...fill x and y once

// fastest: typed-array columns, copied in one go (no per-point conversion)
const fast = [{ id: "signal", name: "Signal", data: { x, y } }];

// slower: plain arrays in columns, then [x, y] tuples,
// then { x, y } objects (converted point by point)
const slow = [{ name: "Signal", data: points.map((p) => ({ x: p.t, y: p.v })) }];`,hn=`import { useMemo } from "react";
import { LineChart } from "minerva-design/charts";

function Telemetry({ samples }: { samples: Samples }) {
  // build the columns once per data set, not on every render
  const series = useMemo(
    () => [{ id: "cpu", name: "CPU", data: { x: samples.time, y: samples.cpu } }],
    [samples],
  );
  // inline props are fine: they are compared shallowly and skip setOptions
  return <LineChart series={series} yAxis={{ min: 0, max: 100 }} height={320} />;
}`,gn=`let data: [number, number][] = [];
let queued: [number, number][] = [];

socket.onmessage = (event) => {
  queued.push(JSON.parse(event.data));
};

// one update per frame, however many samples arrived
function flush() {
  if (queued.length) {
    // a new array: arrays mutated in place are not read again
    data = [...data, ...queued].slice(-50_000);
    queued = [];
    chart.setOptions({ ...base, series: [{ id: "cpu", name: "CPU", data }] });
  }
  requestAnimationFrame(flush);
}
requestAnimationFrame(flush);`,_n=`import {
  createChartController,
  scenePrimitives,
} from "minerva-design/charts/core";

const controller = createChartController({
  options,
  measureText: (text, font) => measure(text, font),
  onInvalidate: () => draw(),
});
controller.setSize(360, 240);

function draw() {
  const scene = controller.getScene();
  if (!scene) return;
  // fewer, coarser shapes for a slow host (e.g. one native view per shape)
  const shapes = scenePrimitives(scene, {
    maxDots: 1500, // per series: then merged per cell
    maxBars: 600, // per series: then merged per pixel column
    columnWidth: 3, // lines: at most 4 points per 3 px column
  });
  paint(shapes);
}`})))()}vn();export{dn as default};