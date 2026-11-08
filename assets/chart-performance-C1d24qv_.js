import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-DxNxqLAt.js";import{n as a,t as o}from"./Trans-_n4xj9U7.js";import{n as s,t as c}from"./useTranslation-SSQHWt-r.js";import{R as l,z as u}from"./ProgressIndicator-Ve8Z1qBV.js";import{i as d,n as f,r as p,t as ee}from"./Radio-DZ0GJqPj.js";import{n as m,t as h}from"./Switch-DyiiEE7x.js";import{n as te,t as g}from"./CodeBlock-BldhNkPz.js";import{n as ne,t as re}from"./LoadingState-03XUNvy7.js";import{i as _,r as v}from"./DemoBlock-DUZKk1Ys.js";import{a as y,o as b}from"./angular-preview-Diz05jiC.js";import{f as x,m as S,p as C,t as w,v as T,y as E}from"./charts-BUBIiDTe.js";import{o as D,r as ie}from"./renderer.module-BXvewIut.js";import{l as O,n as ae,t as oe,u as k}from"./DocPage-D3s4i75Z.js";import{n as A,r as se,t as ce}from"./support-Byt-y1lb.js";function j(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function M(e){let t=NaN;return()=>{if(!Number.isNaN(t)){let e=t;return t=NaN,e}let n=Math.sqrt(-2*Math.log(1-e())),r=2*Math.PI*e();return t=n*Math.sin(r),n*Math.cos(r)}}function le(e,t){let n=e[0]?.length??0,r=Math.ceil(n/P),i=new Float64Array(r).fill(1/0),a=new Float64Array(r).fill(-1/0);for(let t of e)for(let e=0;e<n;e++){let n=e/P|0;t[e]<i[n]&&(i[n]=t[e])}for(let e of t)for(let t=0;t<n;t++){let n=t/P|0;e[t]>a[n]&&(a[n]=e[t])}return(r,o)=>{let s=Math.max(0,Math.floor(r)),c=Math.min(n-1,Math.ceil(o));if(s>c)return null;let l=1/0,u=-1/0,d=n=>{for(let t of e)t[n]<l&&(l=t[n]);for(let e of t)e[n]>u&&(u=e[n])};for(;s<=c&&s%P;s++)d(s);for(;s+P-1<=c;s+=P){let e=s/P;i[e]<l&&(l=i[e]),a[e]>u&&(u=a[e])}for(;s<=c;s++)d(s);return l<=u?[l,u]:null}}var N,P,ue,F,I,L,R,de,fe,z,pe,B,me,he,ge,_e,ve,ye,be,xe,Se,Ce;function V(){return(V=e((()=>{N=e=>{let t=null;return()=>(t||=new Promise(t=>{let n=()=>setTimeout(()=>t(e()),0);typeof requestAnimationFrame==`function`?requestAnimationFrame(n):n()}),t)},P=512,ue=(e,t)=>{let n=e.range((t[0]-e.start)/e.step-1,(t[1]-e.start)/e.step+1);if(!n)return null;let r=(n[1]-n[0])*.08||1;return[n[0]-r,n[1]+r]},F=({zoom:e,period:t=12,targets:n,y:r=!1})=>(i,a)=>{let o=Math.floor(i/t),s=i%t/t,c=(1-Math.cos(2*Math.PI*s))/2,l=n[o%n.length]??[NaN,NaN],u=(1/e)**c,d=(e,t,n)=>{let r=(e[1]-e[0])*u,i=(e[0]+e[1])/2,a=i+((Number.isFinite(t)?t:i)-i)*c+r*.25*n*c,o=Math.min(Math.max(a-r/2,e[0]),e[1]-r);return[o,o+r]},f=d(a.x,l[0],Math.sin(i*.7));return r?{x:f,y:d(a.y,l[1],Math.cos(i*.6))}:{x:f}},I=25e4,L=Date.UTC(2026,0,1),R=1e3,de=N(()=>{let e=M(j(2026)),t=new Float64Array(I);for(let e=0;e<I;e++)t[e]=L+e*R;let n=[];for(let t=0;t<4;t++){let r=new Float64Array(I),i=18+t*14,a=3+t*1.5,o=0;for(let n=0;n<I;n++){o=o*.9995+e()*.06;let s=Math.sin(2*Math.PI*n/86400+t*1.3),c=Math.sin(2*Math.PI*n/(600+t*170));r[n]=i+s*a+c*.6+o+e()*.25}n.push(r)}return{x:t,y:n,start:L,step:R,range:le(n,n)}}),fe=[.22,.68,.41,.87].map(e=>[L+e*I*R,NaN]),z=1e5,pe=N(()=>{let e=j(42),t=M(e),n=[],r=[];for(let i=0;i<10;i++){let a=2*Math.PI*i/10+e()*.4,o=i%3==0?14:34,s=50+Math.cos(a)*o,c=50+Math.sin(a)*o,l=2+e()*4,u=1.5+e()*3,d=e()*Math.PI,f=Math.cos(d),p=Math.sin(d),ee=new Float64Array(z),m=new Float64Array(z);for(let n=0;n<z;n++){let r,a;if(i%3==1){let n=e()*2*Math.PI,i=5+t()*.6;r=Math.cos(n)*i,a=Math.sin(n)*i}else if(i%3==2){let n=e()*3*Math.PI;r=Math.cos(n)*n*.9+t()*.35,a=Math.sin(n)*n*.9+t()*.35}else r=t()*l,a=t()*u;ee[n]=s+r*f-a*p,m[n]=c+r*p+a*f}n.push({x:ee,y:m}),r.push([s,c])}return{clusters:n,centers:r}}),B=2e5,me=Date.UTC(2026,0,5),he=6e4,ge=N(()=>{let e=M(j(7)),t=new Float64Array(B),n=new Float64Array(B),r=new Float64Array(B),i=new Float64Array(B),a=new Float64Array(B),o=120;for(let s=0;s<B;s++){let c=.0012*(1+.7*Math.sin(s/9e3)**2),l=o,u=l*Math.exp(e()*c+2e-6);t[s]=me+s*he,n[s]=l,a[s]=u,r[s]=Math.max(l,u)*(1+Math.abs(e())*c*.7),i[s]=Math.min(l,u)*(1-Math.abs(e())*c*.7),o=u}return{x:t,open:n,high:r,low:i,close:a,start:me,step:he,range:le([i],[r])}}),_e=[.31,.74,.12,.55].map(e=>[me+e*B*he,NaN]),ve=1e3,ye=1e3,be=.02,xe=8,Se=N(()=>{let e=M(j(1e3)),t=ve*ye,n=new Float64Array(t),r=new Float64Array(t),i=new Float64Array(t),a=ve*be,o=[];for(let t=0;t<ve;t++){let s=t*be,c=400+s/a*1500+250*Math.sin(s*.9);o.length=0;for(let e=1;e<=4;e++)o.push([c*e,40*e,1/e**1.6]);o.push([5200+700*Math.sin(2*Math.PI*s/4),60,.35]);let l=Math.exp(-((s%2.5-1.2)**2)/.002)*.08;for(let a=0;a<ye;a++){let c=a*xe,u=1e-7/(1+c/300)+l/(1+c/4e3);for(let[e,t,n]of o){let r=(c-e)/t;r>-5&&r<5&&(u+=n*Math.exp(-r*r))}let d=t*ye+a;n[d]=s,r[d]=c,i[d]=10*Math.log10(u)+e()*1.5}}return{x:n,y:r,value:i}}),Ce=[[6,1200],[3,5200],[12.2,2500],[17,3900]]})))()}function we(e,t=`0px`){let[n,r]=(0,H.useState)(()=>typeof IntersectionObserver>`u`);return(0,H.useEffect)(()=>{let n=e.current;if(!n||typeof IntersectionObserver>`u`)return;let i=new IntersectionObserver(([e])=>r(!!e?.isIntersecting),{rootMargin:t});return i.observe(n),()=>i.disconnect()},[e,t]),n}function Te(e,t={}){let[n,r]=(0,H.useState)(null),i=(0,H.useRef)(t);return(0,H.useEffect)(()=>{i.current=t}),(0,H.useEffect)(()=>{if(!e)return;let t=0,n=0,a=0,o=0,s=0,c=new MessageChannel;c.port1.onmessage=e=>{let t=performance.now()-e.data;o+=t,s++,i.current.onWork?.(t)};let l=e=>{t=requestAnimationFrame(l),c.port2.postMessage(e),n?a++:n=e,i.current.onFrame?.(e);let u=e-n;if(u>=500&&a>0){let t={fps:a*1e3/u,frame:u/a,work:s?o/s:0};r(t),i.current.onStats?.(t),n=e,a=0,o=0,s=0}};return t=requestAnimationFrame(l),()=>{cancelAnimationFrame(t),c.port1.close(),c.port2.close()}},[e]),n}function Ee(e){requestAnimationFrame(()=>setTimeout(e,0))}var H,De;function Oe(){return(Oe=e((()=>{H=t(),De=()=>typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches})))()}var ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,U;function $e(){return($e=e((()=>{ke=`_stage_185s0_1`,Ae=`_toolbar_185s0_10`,je=`_hud_185s0_20`,Me=`_stat_185s0_29`,Ne=`_good_185s0_55`,Pe=`_fair_185s0_59`,Fe=`_poor_185s0_63`,Ie=`_chart_185s0_67`,Le=`_loading_185s0_72`,Re=`_footer_185s0_78`,ze=`_fallback_185s0_92`,Be=`_hint_185s0_96`,Ve=`_compareGrid_185s0_100`,He=`_panel_185s0_107`,Ue=`_panelActive_185s0_113`,We=`_panelNote_185s0_117`,Ge=`_panelHeader_185s0_129`,Ke=`_result_185s0_143`,qe=`_results_185s0_149`,Je=`_bars_185s0_154`,Ye=`_barsTitle_185s0_163`,Xe=`_bar_185s0_154`,Ze=`_barTrack_185s0_177`,Qe=`_barFill_185s0_185`,U={stage:ke,toolbar:Ae,hud:je,stat:Me,good:Ne,fair:Pe,poor:Fe,chart:Ie,loading:Le,footer:Re,fallback:ze,hint:Be,compareGrid:Ve,panel:He,panelActive:Ue,panelNote:We,panelHeader:Ge,result:Ke,results:qe,bars:Je,barsTitle:Ye,bar:Xe,barTrack:Ze,barFill:Qe}})))()}var et,tt,nt;function rt(){return(rt=e((()=>{c(),$e(),et=[`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`],tt=e=>e>=50?U.good:e>=25?U.fair:U.poor,nt=()=>{let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),n=new Intl.NumberFormat(t.language),r=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:1}),i=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1});return{count:e=>n.format(Math.round(e)),compact:e=>r.format(e),ms:t=>e(`ms`,{value:t<100?i.format(t):n.format(Math.round(t))}),renderer:t=>e(`renderers.${t}`)}}})))()}function it({load:e,chart:t,count:n,countLabel:r,height:i,motionLabel:a,hint:o,tour:c,fit:l,extra:u}){let{t:f}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),p=nt(),m=(0,W.useRef)(null),te=(0,W.useRef)(null),g=(0,W.useRef)(null),re=we(m,`300px`),_=we(m),[v,y]=(0,W.useState)(null),[b,x]=(0,W.useState)(`auto`),[S,C]=(0,W.useState)(null),[w,T]=(0,W.useState)(()=>!De()),[E,D]=(0,W.useState)(null),[O,ae]=(0,W.useState)(null),oe=(0,W.useRef)(0),k=(0,W.useRef)(null),A=(0,W.useRef)(0),j=(0,W.useContext)(ie)??`auto`,[M,le]=(0,W.useState)(null);(0,W.useEffect)(()=>{let e=!1;return se().then(t=>{e||le(t)}),()=>{e=!0}},[]);let N=j!==`auto`&&M?.[j]===`software`,P=j!==`auto`&&j!==`canvas2d`&&!M,ue=b===`auto`&&N&&M?ce(M):b,F=b===`auto`?j:b;(0,W.useEffect)(()=>{if(!re||v)return;let t=!1;return e().then(e=>{t||(oe.current=performance.now(),y({value:e}))}),()=>{t=!0}},[re,v,e]),(0,W.useEffect)(()=>{let e=te.current;if(!e)return;let t=()=>T(!1),n=e=>{(e.ctrlKey||e.metaKey)&&t()},r=e=>{/^(Arrow|\+|-|=|0|Home|End)/.test(e.key)&&t()};return e.addEventListener(`pointerdown`,t),e.addEventListener(`wheel`,n,{passive:!0}),e.addEventListener(`keydown`,r),()=>{e.removeEventListener(`pointerdown`,t),e.removeEventListener(`wheel`,n),e.removeEventListener(`keydown`,r)}},[]);let I=w&&E===null,L=_&&!!v,R=Te(L,{onFrame:e=>{let t=g.current?.getInstance();if(!c||!I||!v||O===null||!t){k.current=null;return}let n=k.current;n||(t.resetZoom(),n={start:e,base:t.getView()},k.current=n,A.current=0);let r=c(v.value,(e-n.start)/1e3,n.base);if(l&&r.x&&!r.y){let e=l(v.value,r.x);e&&(r.y=e)}t.setView(r)},onWork:e=>{k.current&&(A.current=e>at?A.current+1:0,(A.current>=2||e>1e3)&&(k.current=null,D(e)))}}),de=e=>{C(e),Ee(()=>ae(performance.now()-oe.current))},fe=e=>{if(!l||!v)return;let t=l(v.value,e.x);t&&g.current?.setView({y:t})},z=f(`status.starting`);return E===null?S&&b===`auto`&&N?z=(0,G.jsx)(`span`,{className:U.fallback,children:f(`status.pageSoftware`,{requested:p.renderer(j),backend:p.renderer(S)})}):S&&F===`auto`?z=f(S===`canvas2d`?`status.autoCanvas`:`status.auto`,{backend:p.renderer(S)}):S&&S===F?z=f(b===`auto`?`status.page`:`status.forced`,{backend:p.renderer(S)}):S&&(z=(0,G.jsx)(`span`,{className:U.fallback,children:f(`status.fallback`,{requested:p.renderer(F),backend:p.renderer(S)})})):z=(0,G.jsx)(`span`,{className:U.fallback,children:f(`status.slow`,{ms:p.ms(E)})}),(0,G.jsxs)(`div`,{ref:m,className:U.stage,children:[(0,G.jsxs)(`div`,{className:U.toolbar,children:[(0,G.jsx)(d,{"aria-label":f(`renderer`),direction:`horizontal`,size:`small`,value:b,onChange:e=>{oe.current=performance.now(),x(e),C(null),ae(null),D(null)},children:et.map(e=>(0,G.jsx)(ee,{value:e,label:e===`auto`&&j!==`auto`?f(`renderers.page`,{backend:p.renderer(j)}):p.renderer(e)},e))}),(0,G.jsx)(h,{size:`small`,checked:w,label:a,onChange:e=>{T(e),D(null)}})]}),(0,G.jsxs)(`dl`,{className:U.hud,children:[(0,G.jsxs)(`div`,{className:U.stat,children:[(0,G.jsx)(`dt`,{children:f(`stats.renderer`)}),(0,G.jsx)(`dd`,{children:S?p.renderer(S):`…`})]}),(0,G.jsxs)(`div`,{className:U.stat,children:[(0,G.jsx)(`dt`,{children:f(`stats.fps`)}),(0,G.jsx)(`dd`,{className:R?tt(R.fps):void 0,children:R?p.count(R.fps):`–`})]}),(0,G.jsxs)(`div`,{className:U.stat,children:[(0,G.jsx)(`dt`,{children:f(`stats.frame`)}),(0,G.jsx)(`dd`,{children:R?p.ms(R.frame):`–`})]}),(0,G.jsxs)(`div`,{className:U.stat,children:[(0,G.jsx)(`dt`,{children:f(`stats.work`)}),(0,G.jsx)(`dd`,{children:R?p.ms(R.work):`–`})]}),(0,G.jsxs)(`div`,{className:U.stat,children:[(0,G.jsx)(`dt`,{children:r}),(0,G.jsx)(`dd`,{title:p.count(n),children:p.compact(n)})]}),u&&(0,G.jsxs)(`div`,{className:U.stat,children:[(0,G.jsx)(`dt`,{children:u.label}),(0,G.jsx)(`dd`,{children:u.value})]}),(0,G.jsxs)(`div`,{className:U.stat,children:[(0,G.jsx)(`dt`,{children:f(`stats.startup`)}),(0,G.jsx)(`dd`,{children:O===null?`–`:p.ms(O)})]})]}),(0,G.jsx)(`div`,{ref:te,className:U.chart,children:v&&!P?(0,G.jsx)(t,{data:v.value,chartRef:g,renderer:ue,onRendererChange:de,onZoom:fe,running:L&&w}):(0,G.jsx)(ne,{className:U.loading,style:{height:i},size:`small`,label:f(`loading`,{value:p.count(n)})})}),(0,G.jsxs)(`div`,{className:U.footer,children:[(0,G.jsx)(`p`,{role:`status`,children:z}),(0,G.jsx)(`p`,{className:U.hint,children:o})]})]})}var W,G,at;function K(){return(K=e((()=>{W=t(),c(),re(),f(),p(),m(),D(),A(),Oe(),rt(),$e(),G=n(),at=250})))()}function ot({data:e,chartRef:t,renderer:n,onRendererChange:r,onZoom:i}){let{t:a}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),o=(0,ct.useMemo)(()=>[{id:`candles`,name:a(`market`),data:{x:e.x,y:e.close,open:e.open,high:e.high,low:e.low}}],[e,a]);return(0,lt.jsx)(S,{ref:t,series:o,renderer:n,onRendererChange:r,onZoom:i,xAxis:{type:`time`},yAxis:{title:a(`price`)},interaction:{zoom:`x`},legend:!1,height:380,ariaLabel:a(`candlesAria`)})}function st(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,lt.jsx)(it,{load:ge,chart:ot,count:B,countLabel:e(`stats.candles`),height:380,motionLabel:e(`tour`),hint:e(`hintX`),tour:(e,t,n)=>ut(t,n),fit:ue})}var ct,lt,ut;function dt(){return(dt=e((()=>{ct=t(),c(),C(),V(),K(),lt=n(),ut=F({zoom:1600,period:14,targets:_e})})))()}function ft(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),t=nt(),n=(0,q.useRef)(null),r=(0,q.useId)(),i=we(n,`300px`),a=we(n),[o,c]=(0,q.useState)(`line`),[l,f]=(0,q.useState)(null),[p,m]=(0,q.useState)(null),[h,te]=(0,q.useState)(null),[g,re]=(0,q.useState)({}),[_,v]=(0,q.useState)({}),[y,b]=(0,q.useState)([]),[x,S]=(0,q.useState)(null),C=(0,q.useRef)({}),w=(0,q.useRef)(null);(0,q.useEffect)(()=>{if(!i)return;let e=!1;return o===`line`?de().then(t=>!e&&f(t)):pe().then(t=>!e&&m(t)),()=>{e=!0}},[i,o]),(0,q.useEffect)(()=>{if(!i)return;let e=!1;return se().then(t=>!e&&te(t)),()=>{e=!0}},[i]);let[T,D]=(0,q.useMemo)(()=>{let t=t=>{let n=t?yt:e=>e;return o===`line`?l?.y.map((t,r)=>({id:`sensor-${r}`,name:e(`sensor`,{index:r+1}),data:{x:n(l.x),y:n(t)},lineWidth:1}))??null:p?.clusters.map(({x:r,y:i},a)=>({id:`cluster-${a}`,name:e(`cluster`,{index:a+1}),type:`scatter`,data:{x:n(r),y:n(i)},pointSize:2,opacity:t?.7:.55}))??null};return[t(!1),t(!0)]},[o,l,p,e]),ie=o===`line`?(l?.y.length??0)*Math.ceil((l?.x.length??0)/gt):(p?.clusters??[]).reduce((e,{x:t})=>e+Math.ceil(t.length/gt),0),O=(e,t,n)=>{n&&v(e=>({...e,[t]:n}));let r=e.queue[e.index+1];w.current=r?_t(e.queue,e.index+1):null,S(r??null)};Te(a&&x!==null,{onFrame:e=>{let t=w.current,n=t?.queue[t.index];if(!t||!n)return;t.created||=e;let r=C.current[n]?.getInstance();if(!t.ready||!r){e-t.created>ht&&O(t,n,null);return}if(t.warmup<1){t.warmup++;return}if(!t.base){r.resetZoom(),t.base=r.getView(),t.start=e;return}let i=e-t.start;t.frames++;let a=vt(o,l)(i/1e3,t.base);if(o===`line`&&l&&a.x){let e=ue(l,a.x);e&&(a.y=e)}r.setView(a),!(i<mt)&&O(t,n,{fps:t.frames*1e3/i,work:t.works?t.work/t.works:0})},onWork:e=>{let t=w.current;t?.base&&(t.work+=e,t.works++)}});let ae=()=>{if(!h)return;let e=pt.filter(e=>h[e]!==`software`);b(pt.filter(e=>h[e]===`software`)),v({}),w.current=_t(e),S(e[0]??null)},oe=e=>{b(t=>t.filter(t=>t!==e)),w.current=_t([e]),S(e)},k=Math.max(1,...Object.values(_).map(e=>e.work)),A=n=>{let r=g[n];return r&&r!==n?e(`compare.fellBack`,{requested:t.renderer(n),backend:t.renderer(r)}):t.renderer(n)},ce=Object.keys(_).length>0||y.length>0;return(0,J.jsxs)(`div`,{ref:n,className:U.stage,children:[(0,J.jsxs)(`div`,{className:U.toolbar,children:[(0,J.jsxs)(d,{"aria-label":e(`compare.dataset`),direction:`horizontal`,size:`small`,value:o,disabled:x!==null,onChange:e=>{c(e),v({}),b([])},children:[(0,J.jsx)(ee,{value:`line`,label:e(`compare.line`)}),(0,J.jsx)(ee,{value:`scatter`,label:e(`compare.scatter`)})]}),(0,J.jsx)(u,{size:`small`,disabled:!T||!h||x!==null,onClick:ae,children:e(`compare.run`)})]}),T&&D?(0,J.jsx)(`div`,{className:U.compareGrid,children:pt.map(n=>{let r=_[n],i=g[n],a=h?.[n]===`software`;return(0,J.jsxs)(`div`,{className:`${U.panel} ${x===n?U.panelActive:``}`,children:[(0,J.jsxs)(`div`,{className:U.panelHeader,children:[(0,J.jsxs)(`span`,{children:[(0,J.jsx)(`strong`,{children:t.renderer(n)}),i&&i!==n&&(0,J.jsxs)(`span`,{className:U.fallback,children:[` `,e(`compare.fallback`,{backend:t.renderer(i)})]})]}),(0,J.jsx)(`span`,{className:U.result,children:r?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`span`,{className:tt(r.fps),children:e(`fps`,{value:t.count(r.fps)})}),` · `,t.ms(r.work)]}):x===n?e(`compare.measuring`):y.includes(n)?e(`compare.skipped`):`–`})]}),x===n?(0,J.jsx)(E,{ref:e=>{e?C.current[n]=e:delete C.current[n]},series:T,renderer:n,onRendererChange:e=>{let t=w.current;t&&t.queue[t.index]===n&&(t.ready=!0),re(t=>({...t,[n]:e}))},legend:!1,xAxis:o===`line`?{type:`time`}:void 0,height:220,ariaLabel:e(`compareAria`,{backend:t.renderer(n)})},`run`):(0,J.jsx)(E,{series:D,renderer:`canvas2d`,legend:!1,xAxis:o===`line`?{type:`time`}:void 0,height:220,ariaLabel:e(`compare.previewAria`,{backend:t.renderer(n)})},`preview`),(0,J.jsx)(`div`,{className:U.panelNote,children:x===n?(0,J.jsx)(`span`,{children:e(`compare.live`,{backend:t.renderer(i??n),value:t.compact(1e6)})}):a&&!r?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`span`,{className:U.fallback,children:e(`compare.software`)}),(0,J.jsx)(u,{size:`xsmall`,variant:`outline`,disabled:x!==null,onClick:()=>oe(n),children:e(`compare.runAnyway`)})]}):(0,J.jsx)(`span`,{className:U.hint,children:e(`compare.preview`,{value:t.compact(ie)})})})]},n)})}):(0,J.jsx)(ne,{className:U.loading,style:{height:480},size:`small`,label:e(`loading`,{value:t.count(1e6)})}),Object.keys(_).length>0&&(0,J.jsxs)(`div`,{className:U.results,children:[(0,J.jsx)(`p`,{className:U.barsTitle,id:r,children:e(`compare.results`)}),(0,J.jsx)(`ol`,{className:U.bars,"aria-labelledby":r,children:pt.map(n=>{let r=_[n];return r?(0,J.jsxs)(`li`,{className:U.bar,children:[(0,J.jsx)(`span`,{children:A(n)}),(0,J.jsx)(`span`,{className:U.barTrack,children:(0,J.jsx)(`span`,{className:U.barFill,style:{width:`${r.work/k*100}%`}})}),(0,J.jsxs)(`span`,{className:U.result,children:[t.ms(r.work),` ·`,` `,(0,J.jsx)(`span`,{className:tt(r.fps),children:e(`fps`,{value:t.count(r.fps)})})]})]},n):null})})]}),(0,J.jsxs)(`div`,{className:U.footer,children:[(0,J.jsx)(`p`,{role:`status`,children:x?e(`compare.running`,{backend:t.renderer(x)}):ce?y.length?`${e(`compare.done`)} ${e(`compare.skippedNote`,{backends:y.map(t.renderer).join(`, `)})}`:e(`compare.done`):e(`compare.idle`)}),(0,J.jsx)(`p`,{className:U.hint,children:e(`compare.hint`)})]})]})}var q,J,pt,mt,ht,gt,_t,vt,yt;function bt(){return(bt=e((()=>{q=t(),c(),l(),re(),f(),p(),T(),V(),A(),Oe(),rt(),$e(),J=n(),pt=[`webgpu`,`webgl2`,`webgl`,`canvas2d`],mt=3e3,ht=15e3,gt=100,_t=(e,t=0)=>({queue:e,index:t,ready:!1,warmup:0,created:0,start:0,frames:0,work:0,works:0,base:null}),vt=(e,t)=>F(e===`line`?{zoom:400,period:mt/1e3,targets:[[t?.x[t.x.length>>1]??NaN,NaN]]}:{zoom:20,period:mt/1e3,targets:[[50,50]],y:!0}),yt=e=>{let t=new Float64Array(Math.ceil(e.length/gt));for(let n=0,r=0;n<e.length;n+=gt,r++)t[r]=e[n]??NaN;return t}})))()}function xt({data:e,chartRef:t,renderer:n,onRendererChange:r}){let{t:i}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),a=(0,Ct.useMemo)(()=>[{id:`spectrogram`,name:i(`level`),type:`heatmap`,data:{x:e.x,y:e.y,value:e.value},colorScale:Tt,valueRange:[-70,0],radius:0,format:e=>i(`db`,{value:e.toFixed(1)})}],[e,i]);return(0,wt.jsx)(E,{ref:t,series:a,renderer:n,onRendererChange:r,xAxis:{title:i(`time`)},yAxis:{type:`linear`,title:i(`frequency`)},interaction:{zoom:`xy`},legend:!1,height:420,ariaLabel:i(`heatmapAria`)})}function St(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,wt.jsx)(it,{load:Se,chart:xt,count:ve*ye,countLabel:e(`stats.cells`),height:420,motionLabel:e(`tour`),hint:e(`hintXY`),tour:(e,t,n)=>Et(t,n)})}var Ct,wt,Tt,Et;function Dt(){return(Dt=e((()=>{Ct=t(),c(),T(),V(),K(),wt=n(),Tt=[`#000004`,`#2c115f`,`#721f81`,`#b73779`,`#f1605d`,`#feb078`,`#fcfdbf`],Et=F({zoom:40,period:12,targets:Ce,y:!0})})))()}function Ot(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-performance.hoverBurst`}),t=(0,Y.useRef)(null),n=(0,Y.useRef)(null),r=(0,Y.useRef)(null),i=(0,Y.useRef)(0),[a,o]=(0,Y.useState)(!1),[c,l]=(0,Y.useState)(null);return(0,Y.useEffect)(()=>{let a=b(t.current,{renderer:`canvas2d`,ariaLabel:e(`aria`),xAxis:{min:0,max:10},yAxis:{min:0,max:10},series:[{type:`scatter`,data:[{x:2,y:2},{x:8,y:8}]}],tooltip:{render(e){return r.current&&r.current.tooltipRenders++,String((e.items[0]?.index??0)+1)}}});return n.current=a,a.on(`hover`,e=>{r.current&&e&&(r.current.hitNotifications++,r.current.lastPoint=(e.items[0]?.index??0)+1)}),a.ready.then(()=>{n.current===a&&(i.current=requestAnimationFrame(()=>{n.current===a&&o(!0)}))}),()=>{cancelAnimationFrame(i.current),r.current=null,n.current=null,a.destroy()}},[e]),(0,X.jsxs)(`div`,{"data-testid":`chart-hover-burst`,children:[(0,X.jsx)(`p`,{children:e(`description`)}),(0,X.jsx)(`div`,{ref:t,style:{width:`100%`,height:280}}),(0,X.jsx)(u,{"data-testid":`chart-hover-burst-run`,disabled:!a,onClick:()=>{let e=n.current,s=t.current?.querySelector(`.minerva-chart-stage`);if(!e||!s||!a)return;s.dispatchEvent(new PointerEvent(`pointerleave`));let c=s.getBoundingClientRect(),u=[e.toPixel(2,2),e.toPixel(8,8)];if(u.some(e=>!e))return;let d={moves:240,hitNotifications:0,tooltipRenders:0,elapsed:0,lastPoint:null};r.current=d,l(null),o(!1);let f=performance.now();for(let e=0;e<d.moves;e++){let t=u[e%2];s.dispatchEvent(new PointerEvent(`pointermove`,{bubbles:!0,pointerId:1,clientX:c.left+t.x,clientY:c.top+t.y}))}i.current=requestAnimationFrame(()=>{d.elapsed=performance.now()-f,r.current=null,l({...d}),o(!0)})},children:e(`run`)}),c&&(0,X.jsx)(`output`,{"data-testid":`chart-hover-burst-result`,"data-moves":c.moves,"data-hit-notifications":c.hitNotifications,"data-tooltip-renders":c.tooltipRenders,"data-elapsed":c.elapsed,"data-last-point":c.lastPoint??``,"aria-live":`polite`,children:(0,X.jsxs)(`dl`,{children:[(0,X.jsx)(`dt`,{children:e(`moves`)}),(0,X.jsx)(`dd`,{children:c.moves}),(0,X.jsx)(`dt`,{children:e(`hitNotifications`)}),(0,X.jsx)(`dd`,{children:c.hitNotifications}),(0,X.jsx)(`dt`,{children:e(`tooltipRenders`)}),(0,X.jsx)(`dd`,{children:c.tooltipRenders}),(0,X.jsx)(`dt`,{children:e(`elapsed`)}),(0,X.jsxs)(`dd`,{children:[c.elapsed.toFixed(2),` ms`]}),(0,X.jsx)(`dt`,{children:e(`lastPoint`)}),(0,X.jsx)(`dd`,{children:c.lastPoint})]})})]})}var Y,X;function kt(){return(kt=e((()=>{Y=t(),c(),l(),y(),X=n()})))()}function At({data:e,chartRef:t,renderer:n,onRendererChange:r,onZoom:i}){let{t:a}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),o=(0,Mt.useMemo)(()=>e.y.map((t,n)=>({id:`sensor-${n}`,name:a(`sensor`,{index:n+1}),data:{x:e.x,y:t},lineWidth:1})),[e,a]);return(0,Nt.jsx)(x,{ref:t,series:o,renderer:n,onRendererChange:r,onZoom:i,xAxis:{type:`time`},yAxis:{title:a(`temperature`)},interaction:{zoom:`x`},height:360,ariaLabel:a(`lineAria`)})}function jt(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,Nt.jsx)(it,{load:de,chart:At,count:4*I,countLabel:e(`stats.points`),height:360,motionLabel:e(`tour`),hint:e(`hintX`),tour:(e,t,n)=>Pt(t,n),fit:ue})}var Mt,Nt,Pt;function Ft(){return(Ft=e((()=>{Mt=t(),c(),C(),V(),K(),Nt=n(),Pt=F({zoom:1200,period:14,targets:fe})})))()}function It({data:e,chartRef:t,renderer:n,onRendererChange:r}){let{t:i}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),a=(0,Rt.useMemo)(()=>e.clusters.map((e,t)=>({id:`cluster-${t}`,name:i(`cluster`,{index:t+1}),data:e,pointSize:2,opacity:.55})),[e,i]);return(0,zt.jsx)(w,{ref:t,series:a,palette:Bt,renderer:n,onRendererChange:r,legend:{position:`bottom`},height:420,ariaLabel:i(`scatterAria`)})}function Lt(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-performance.data`});return(0,zt.jsx)(it,{load:pe,chart:It,count:10*z,countLabel:e(`stats.points`),height:420,motionLabel:e(`tour`),hint:e(`hintXY`),tour:(e,t,n)=>F({zoom:12,period:10,targets:e.centers,y:!0})(t,n)})}var Rt,zt,Bt;function Vt(){return(Vt=e((()=>{Rt=t(),c(),C(),V(),K(),zt=n(),Bt=[`#4f6bed`,`#e8590c`,`#2f9e44`,`#c2255c`,`#0c8599`,`#f59f00`,`#7048e8`,`#5c940d`,`#d6336c`,`#1971c2`]})))()}function Ht(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ut(e,t){let{x:n,y:r,random:i}=e;if(e.end+t>Zt){let t=e.end-Q;n.copyWithin(0,t,e.end);for(let n of r)n.copyWithin(0,t,e.end);e.end=Q}for(let r=0;r<t;r++)n[e.end+r]=e.start+(e.samples+r)*Qt;r.forEach((n,r)=>{for(let a=0;a<t;a++){let t=(e.samples+a)/Xt,o=Math.sin(t*.7+r)>.85?2.4:0;n[e.end+a]=(11-r)*10+Math.sin(2*Math.PI*(1.5+r*.6)*t)*2.2+Math.sin(2*Math.PI*.25*t+r)*1.2+Math.sin(2*Math.PI*23*t)*o+(i()-.5)*1.6}}),e.end+=t,e.samples+=t}function Wt(){let e={x:new Float64Array(Zt),y:Array.from({length:Yt},()=>new Float64Array(Zt)),end:0,samples:0,start:Date.now()-Q*Qt,random:Ht(12)};return Ut(e,Q),e}function Gt(e,t,n){let r=Math.max(0,e.end-Q),i=e.x.subarray(r,e.end);return{series:e.y.map((t,a)=>({id:`channel-${a}`,name:n.channel(a+1),data:{x:i,y:t.subarray(r,e.end)},lineWidth:1})),renderer:t,xAxis:{type:`time`},yAxis:{min:-6,max:116,visible:!1},legend:!1,tooltip:{mode:`nearest`},interaction:!1,ariaLabel:n.aria}}function Kt({renderer:e,running:t,onRendererChange:n}){let{t:r}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),i=(0,Z.useRef)(null),a=(0,Z.useRef)(null),o=(0,Z.useRef)(null),c={channel:e=>r(`channel`,{index:e}),aria:r(`streamAria`,{value:Yt})},l=(0,Z.useRef)({labels:c,renderer:e,onRendererChange:n});return(0,Z.useEffect)(()=>{l.current={labels:c,renderer:e,onRendererChange:n}}),(0,Z.useEffect)(()=>{let e=i.current;if(!e)return;let t=Wt();o.current=t;let{renderer:n,labels:r}=l.current,s=b(e,Gt(t,n,r));a.current=s;let c=s.on(`renderer`,e=>l.current.onRendererChange(e));return()=>{c(),s.destroy(),a.current=null,o.current=null}},[]),(0,Z.useEffect)(()=>{let t=o.current;t&&a.current?.setOptions(Gt(t,e,l.current.labels))},[e]),(0,Z.useEffect)(()=>{if(!t)return;let e=0,n=0,r=0,i=t=>{e=requestAnimationFrame(i);let s=o.current,c=a.current;if(!s||!c)return;r+=Math.min(100,n?t-n:16)*Xt/1e3,n=t;let u=Math.floor(r);if(!u)return;r-=u,Ut(s,u);let{renderer:d,labels:f}=l.current;c.setOptions(Gt(s,d,f))};return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)},[t]),(0,Jt.jsx)(`div`,{ref:i,style:{height:400,width:`100%`}})}function qt(){let{t:e}=s(`common`,{keyPrefix:`docs.chart-performance.data`}),{compact:t}=nt();return(0,Jt.jsx)(it,{load:$t,chart:Kt,count:Yt*Q,countLabel:e(`stats.points`),height:400,motionLabel:e(`stream`),hint:e(`hintStream`),extra:{label:e(`stats.ingest`),value:e(`perSecond`,{value:t(Yt*Xt)})}})}var Z,Jt,Yt,Xt,Q,Zt,Qt,$t;function en(){return(en=e((()=>{Z=t(),c(),y(),K(),rt(),Jt=n(),Yt=12,Xt=2e3,Q=2e4,Zt=Q*4,Qt=1e3/Xt,$t=()=>Promise.resolve(!0)})))()}var tn;function nn(){return(nn=e((()=>{tn=`import { useMemo } from "react";
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
`})))()}var rn;function an(){return(an=e((()=>{rn=`import { useEffect, useId, useMemo, useRef, useState } from "react";
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
import { probeBackends, type BackendsSupport } from "../../../renderer/support";
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
`})))()}var on;function sn(){return(sn=e((()=>{on=`import { useMemo } from "react";
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
`})))()}var cn;function ln(){return(ln=e((()=>{cn=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { createChart, type ChartInstance } from "minerva-design/charts/core";

interface Measurement {
  moves: number;
  hitNotifications: number;
  tooltipRenders: number;
  elapsed: number;
  lastPoint: number | null;
}

export default function HoverBurstDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.hoverBurst",
  });
  const host = useRef<HTMLDivElement>(null);
  const chart = useRef<ChartInstance | null>(null);
  const active = useRef<Measurement | null>(null);
  const frame = useRef(0);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<Measurement | null>(null);

  useEffect(() => {
    const instance = createChart(host.current!, {
      renderer: "canvas2d",
      ariaLabel: t("aria"),
      xAxis: { min: 0, max: 10 },
      yAxis: { min: 0, max: 10 },
      series: [
        {
          type: "scatter",
          data: [
            { x: 2, y: 2 },
            { x: 8, y: 8 },
          ],
        },
      ],
      tooltip: {
        render(event) {
          if (active.current) active.current.tooltipRenders++;
          return String((event.items[0]?.index ?? 0) + 1);
        },
      },
    });
    chart.current = instance;
    instance.on("hover", (event) => {
      if (!active.current || !event) return;
      active.current.hitNotifications++;
      active.current.lastPoint = (event.items[0]?.index ?? 0) + 1;
    });
    void instance.ready.then(() => {
      if (chart.current !== instance) return;
      frame.current = requestAnimationFrame(() => {
        if (chart.current === instance) setReady(true);
      });
    });
    return () => {
      cancelAnimationFrame(frame.current);
      active.current = null;
      chart.current = null;
      instance.destroy();
    };
  }, [t]);

  const run = () => {
    const instance = chart.current;
    const stage = host.current?.querySelector<HTMLElement>(
      ".minerva-chart-stage",
    );
    if (!instance || !stage || !ready) return;
    // Clear prior hover so repeated runs measure the same work.
    stage.dispatchEvent(new PointerEvent("pointerleave"));
    const rect = stage.getBoundingClientRect();
    const points = [instance.toPixel(2, 2), instance.toPixel(8, 8)];
    if (points.some((point) => !point)) return;
    const measurement: Measurement = {
      moves: 240,
      hitNotifications: 0,
      tooltipRenders: 0,
      elapsed: 0,
      lastPoint: null,
    };
    active.current = measurement;
    setResult(null);
    setReady(false);
    const start = performance.now();
    for (let i = 0; i < measurement.moves; i++) {
      const point = points[i % 2]!;
      stage.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          pointerId: 1,
          clientX: rect.left + point.x,
          clientY: rect.top + point.y,
        }),
      );
    }
    frame.current = requestAnimationFrame(() => {
      measurement.elapsed = performance.now() - start;
      active.current = null;
      setResult({ ...measurement });
      setReady(true);
    });
  };

  return (
    <div data-testid="chart-hover-burst">
      <p>{t("description")}</p>
      <div ref={host} style={{ width: "100%", height: 280 }} />
      <Button
        data-testid="chart-hover-burst-run"
        disabled={!ready}
        onClick={run}
      >
        {t("run")}
      </Button>
      {result && (
        <output
          data-testid="chart-hover-burst-result"
          data-moves={result.moves}
          data-hit-notifications={result.hitNotifications}
          data-tooltip-renders={result.tooltipRenders}
          data-elapsed={result.elapsed}
          data-last-point={result.lastPoint ?? ""}
          aria-live="polite"
        >
          <dl>
            <dt>{t("moves")}</dt>
            <dd>{result.moves}</dd>
            <dt>{t("hitNotifications")}</dt>
            <dd>{result.hitNotifications}</dd>
            <dt>{t("tooltipRenders")}</dt>
            <dd>{result.tooltipRenders}</dd>
            <dt>{t("elapsed")}</dt>
            <dd>{result.elapsed.toFixed(2)} ms</dd>
            <dt>{t("lastPoint")}</dt>
            <dd>{result.lastPoint}</dd>
          </dl>
        </output>
      )}
    </div>
  );
}
`})))()}var un;function dn(){return(dn=e((()=>{un=`import { useMemo } from "react";
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
`})))()}var fn;function pn(){return(pn=e((()=>{fn=`import { useMemo } from "react";
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
`})))()}var mn;function hn(){return(hn=e((()=>{mn=`import { useEffect, useRef } from "react";
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
`})))()}function gn(){let{t:e}=s(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-intro`,children:[(0,$.jsx)(`h2`,{id:`perf-intro`,children:e(`docs.chart-performance.intro.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.intro.text`)}),(0,$.jsx)(`p`,{className:v.prose,children:(0,$.jsx)(o,{i18nKey:`docs.chart-performance.intro.pages`,components:{charts:(0,$.jsx)(i,{to:`/charts`}),engine:(0,$.jsx)(i,{to:`/chart-engine`}),renderers:(0,$.jsx)(i,{to:`/chart-renderers`})}})})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-renderers`,children:[(0,$.jsx)(`h2`,{id:`perf-renderers`,children:e(`docs.chart-performance.renderers.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.renderers.text`)}),(0,$.jsxs)(`ul`,{className:v.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.auto`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.webgl`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.software`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.forced`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.renderers.lost`)})]}),(0,$.jsx)(g,{language:`ts`,code:vn})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-global`,children:[(0,$.jsx)(`h2`,{id:`perf-global`,children:e(`docs.chart-performance.global.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.global.text`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.global.rules`)}),(0,$.jsx)(g,{language:`ts`,code:yn}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.global.docs`)})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-showcase`,children:[(0,$.jsx)(`h2`,{id:`perf-showcase`,children:e(`docs.chart-performance.showcase.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.showcase.text`)}),(0,$.jsxs)(`ul`,{className:v.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.showcase.fps`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.showcase.work`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.showcase.startup`)})]})]})]});return(0,$.jsxs)(oe,{id:`chart-performance`,demos:_n,intro:t,children:[(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-data`,children:[(0,$.jsx)(`h2`,{id:`perf-data`,children:e(`docs.chart-performance.formats.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.formats.text`)}),(0,$.jsxs)(`ol`,{className:v.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.typed`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.columns`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.tuples`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.formats.objects`)})]}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.formats.identity`)}),(0,$.jsx)(g,{language:`ts`,code:bn})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-visible`,children:[(0,$.jsx)(`h2`,{id:`perf-visible`,children:e(`docs.chart-performance.visible.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.visible.text`)}),(0,$.jsxs)(`ul`,{className:v.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.sorted`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.unsorted`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.decimation`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.scatter`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.hit`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.visible.dom`)})]})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-zoom`,children:[(0,$.jsx)(`h2`,{id:`perf-zoom`,children:e(`docs.chart-performance.zoom.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.zoom.gpu`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.zoom.canvas`)})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-scale`,children:[(0,$.jsx)(`h2`,{id:`perf-scale`,children:e(`docs.chart-performance.scale.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.scale.text`)}),(0,$.jsxs)(`ul`,{className:v.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.scale.line`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.scale.scatter`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.scale.update`)})]}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.scale.guidance`)})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-react`,children:[(0,$.jsx)(`h2`,{id:`perf-react`,children:e(`docs.chart-performance.react.title`)}),(0,$.jsxs)(`ul`,{className:v.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.memo`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.shallow`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.typed`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.react.shapes`)})]}),(0,$.jsx)(g,{language:`tsx`,code:xn})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-streaming`,children:[(0,$.jsx)(`h2`,{id:`perf-streaming`,children:e(`docs.chart-performance.streaming.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.streaming.text`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.streaming.batch`)}),(0,$.jsx)(g,{language:`ts`,code:Sn})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-shapes`,children:[(0,$.jsx)(`h2`,{id:`perf-shapes`,children:e(`docs.chart-performance.shapes.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.shapes.text`)}),(0,$.jsxs)(`ul`,{className:v.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-performance.shapes.gpu`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-performance.shapes.canvas`)})]})]}),(0,$.jsxs)(`section`,{className:v.section,"aria-labelledby":`perf-platforms`,children:[(0,$.jsx)(`h2`,{id:`perf-platforms`,children:e(`docs.chart-performance.platforms.title`)}),(0,$.jsx)(`p`,{className:v.prose,children:(0,$.jsx)(o,{i18nKey:`docs.chart-performance.platforms.mini`,components:{mini:(0,$.jsx)(i,{to:`/mini-program-charts`})}})}),(0,$.jsx)(`p`,{className:v.prose,children:(0,$.jsx)(o,{i18nKey:`docs.chart-performance.platforms.native`,components:{native:(0,$.jsx)(i,{to:`/react-native`})}})}),(0,$.jsx)(`p`,{className:v.prose,children:e(`docs.chart-performance.platforms.primitives`)}),(0,$.jsx)(g,{language:`ts`,code:Cn})]})]})}var $,_n,vn,yn,bn,xn,Sn,Cn;function wn(){return(wn=e((()=>{dt(),bt(),Dt(),kt(),Ft(),Vt(),en(),nn(),an(),sn(),ln(),dn(),pn(),hn(),t(),a(),c(),r(),te(),ae(),_(),k(),$=n(),_n=O(Object.assign({"./demos/candles.tsx":st,"./demos/compare.tsx":ft,"./demos/heatmap.tsx":St,"./demos/hover-burst.tsx":Ot,"./demos/line.tsx":jt,"./demos/scatter.tsx":Lt,"./demos/streaming.tsx":qt}),Object.assign({"./demos/candles.tsx":tn,"./demos/compare.tsx":rn,"./demos/heatmap.tsx":on,"./demos/hover-burst.tsx":cn,"./demos/line.tsx":un,"./demos/scatter.tsx":fn,"./demos/streaming.tsx":mn})),vn=`import { createChart } from "minerva-design/charts/core";

// "auto" (default): WebGPU, then WebGL2, then WebGL, then Canvas2D
const chart = createChart(container, { series, renderer: "auto" });
chart.ready.then((kind) => showRenderer(kind)); // "webgpu" | "webgl2" | "webgl" | "canvas2d" | null
// fired again when the GPU is lost and the chart falls back
chart.on("renderer", (kind) => showRenderer(kind));

// force a backend (also accepted on every React chart: renderer="webgl")
createChart(other, { series, renderer: "canvas2d" });`,yn=`import {
  createChart,
  getDefaultChartRenderer,
  setDefaultChartRenderer,
  subscribeDefaultChartRenderer,
} from "minerva-design/charts/core";

// every chart with renderer unset or "auto" (React, Vue, Angular,
// Web Components) switches to WebGL2, including the charts on screen
setDefaultChartRenderer("webgl2");
getDefaultChartRenderer(); // "webgl2"

// e.g. keep a renderer picker in sync
const unsubscribe = subscribeDefaultChartRenderer((preference) => {
  picker.value = preference;
});

// a chart's own option still wins
createChart(container, { series, renderer: "canvas2d" });

setDefaultChartRenderer("auto"); // back to WebGPU -> WebGL2 -> WebGL -> Canvas2D`,bn=`const n = 1_000_000;
const x = new Float64Array(n); // timestamps or indexes, sorted
const y = new Float32Array(n);
// ...fill x and y once

// fastest: typed-array columns, copied in one go (no per-point conversion)
const fast = [{ id: "signal", name: "Signal", data: { x, y } }];

// slower: plain arrays in columns, then [x, y] tuples,
// then { x, y } objects (converted point by point)
const slow = [{ name: "Signal", data: points.map((p) => ({ x: p.t, y: p.v })) }];`,xn=`import { useMemo } from "react";
import { LineChart } from "minerva-design/charts";

function Telemetry({ samples }: { samples: Samples }) {
  // build the columns once per data set, not on every render
  const series = useMemo(
    () => [{ id: "cpu", name: "CPU", data: { x: samples.time, y: samples.cpu } }],
    [samples],
  );
  // inline props are fine: they are compared shallowly and skip setOptions
  return <LineChart series={series} yAxis={{ min: 0, max: 100 }} height={320} />;
}`,Sn=`let data: [number, number][] = [];
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
requestAnimationFrame(flush);`,Cn=`import {
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
}`})))()}wn();export{gn as default};