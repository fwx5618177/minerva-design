import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Brqbw4xk.js";import{R as a,z as o}from"./ProgressIndicator-Ve8Z1qBV.js";import{i as s,r as c}from"./DemoBlock-DGsFTIMr.js";import{$ as l,F as u,G as d,H as f,I as p,K as m,Q as h,R as g,U as _,V as v,W as y,X as b,Y as x,Z as S,at as C,ct as w,et as T,ft as E,it as D,lt as O,nt as k,rt as ee,st as te,z as ne}from"./angular-preview-DyofmVcl.js";import{F as A,J as j,P as M,Q as re,Z as ie,_ as N,at as ae,ct as oe,et as P,ft as se,g as F,gt as ce,ht as le,it as ue,lt as de,mt as fe,nt as pe,ot as me,pt as I,q as L,rt as he,st as ge,tt as _e,ut as R}from"./angular-preview-G1DaIToT.js";import{F as z,H as ve,I as ye,J as be,L as B,Y as V,_ as xe,a as H,c as U,d as Se,f as Ce,g as we,h as Te,l as W,m as Ee,o as De,p as Oe,s as ke,u as Ae,v as je}from"./angular-preview-Diz05jiC.js";import{F as Me,M as Ne,N as Pe,P as Fe,Z as Ie,et as Le,it as Re,j as ze,k as Be,tt as Ve,z as He}from"./angular-preview-B6uLInL7.js";import{l as Ue,n as We,t as Ge,u as Ke}from"./DocPage-CLRVLliF.js";function qe(e,t,n){let r=globalThis.MutationObserver;if(typeof r!=`function`||typeof e?.nodeType!=`number`)return{own(){},disconnect(){}};let i=0,a=new r(e=>{let r=e.length>i;i=0,(r||t())&&n()});return a.observe(e,{attributes:!0,attributeFilter:[`width`,`height`]}),{own(e=1){i+=e},disconnect(){a.disconnect(),i=0}}}var G,Je,Ye,Xe,K,Ze,Qe,$e,q,et,tt;function nt(){return(nt=e((()=>{be(),B(),Le(),te(),l(),_(),R(),je(),Ee(),Ce(),U(),Me(),ze(),G=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),Je=6,Ye=10,Xe=320,K=20,Ze=e=>{let t=e.options,n=e.theme,r=He(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},l=!1,f=0,h=0,_=[],x=[],D=null,O=!0,te=``,A=!1,j=null,M=new Map,N=null,P={time:0,x:0,y:0},F=(e,t)=>{o[e]?.forEach(e=>e(t))},I=()=>{O=!0,A||e.onInvalidate?.()},L=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1,dropTargets:n.dropTargets??!1,dragLabel:n.dragLabel??!0}},R=(t,n=r.fontSize,i=400)=>e.measureText(t,k(r,n,i)),z=()=>{s=p(t,r,a,i);let{base:e,minSpan:n}=s;l?(c={x:s.zoom.x?Be(c.x,e.x,n.x):[...e.x],y:s.zoom.y?Be(c.y,e.y,n.y):[...e.y]},l=!Pe(c.x,e.x)||!Pe(c.y,e.y)):c=G(e),_=he(t.annotations,r,s.y.type===`log`?Math.log10:void 0,s.x.type===`log`?Math.log10:void 0),x=oe(t.dependencies,r),j&&(j.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||H(null)),I()},ve=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!ie(e,s,n))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=_e(s);if(a){let e=a.labels[0]?.text??``,t=a.labels[a.labels.length-1]?.text??``,n=Math.max(60,Math.min(160,f*.32)),r=f-4-R(t,11)-8,o=r-n,s=(i===`bottom`?h-K:0)+K/2;return{entries:[],colors:{bar:{x:o,y:s-4,width:n,height:8},stops:a.stops,labels:[{text:e,x:o-8,y:s,align:`right`},{text:t,x:r+8,y:s,align:`left`}],ticks:a.labels.filter(e=>e.at>0&&e.at<1).map(e=>o+e.at*n),caret:null},position:i,toggle:!1,height:26}}let o=[],c=4,l=0;for(let e of s.series){let t=14+R(e.name,12)+8;c+t>f-4&&c>4&&(c=4,l++),o.push({id:e.id,name:e.name,color:e.colorCss,shape:le(e.type),hidden:e.hidden,box:{x:c,y:l*K,width:t,height:K}}),c+=t+10}let u=(l+1)*K+6;if(i===`bottom`)for(let e of o)e.box.y+=h-u+6;return{entries:o,colors:null,position:i,toggle:r.toggle??!0,height:u}},ye=(e,n,r,i)=>{let a=t.tooltip;if(a===!1)return null;let o=typeof a==`object`?a.render:void 0,c=null;if(o){let t=o(e);if(t===null||t===``)return null;typeof t==`string`&&(c=t.split(`
`))}let l=ce(s,e,D?.layout.yTicks??null,D?.layout.y2Ticks??null),u=0,d,p=l.rows.some(e=>e.color)?14:0;if(c){for(let e of c)u=Math.max(u,R(e,12));d=c.length}else{u=R(l.title,12,600)+(l.titleColor?14:0),l.subtitle&&(u=Math.max(u,R(l.subtitle,11)+(l.titleColor?14:0)));let e=0,t=0;for(let n of l.rows)e=Math.max(e,R(n.name,12)),t=Math.max(t,R(n.value,12,600));l.rows.length&&(u=Math.max(u,p+e+16+t)),d=1+ +!!l.subtitle+l.rows.length}let m=Math.ceil(Math.max(u,96)+16+4),g=d*18+16,{x:_,y:v}=Ie({anchor:{x:n,y:r},avoid:Te(s,i,e),obstacles:we(s,i),size:{width:m,height:g},stage:{width:f,height:h},prefer:i.horizontal?`vertical`:`side`});return{content:l,text:c,box:{x:_,y:v,width:m,height:g},lineHeight:18,padding:8,swatchWidth:p}},be=()=>{if(f<=0||h<=0)return null;let e=ve(),n=e?.position===`top`?e.height:0,i=ge({model:s,view:c,theme:r,width:f,height:h-(e?.height??0),padding:t.padding,top:n,measure:e=>R(e)}),a=re(s,c,i.scales,i.yTicks,r.background,N?.kind===`point`&&N.moved?N.item:null),o=[],l=r.fontSize+4;for(let e of _){if(e.type===`text`&&e.text){o.push(ee(e,i.scales,R(e.text,r.fontSize,e.weight),l));continue}if(e.type!==`rect`)continue;let t=T(e,S(e,i.scales),r.fontSize,R);t&&o.push(t.box)}let u=b(a,i.plot,e=>R(e),l-2,o),d={width:f,height:h,theme:r,model:s,view:G(c),layout:i,annotations:_,pointLabels:u,legend:e,hover:null,dragging:null,connectors:de(s,i.scales),arrows:pe(s,i.scales,x)};if(D=d,j){let n=ue(s,i.scales,j.event,t.crosshair),r=i.scales.horizontal;d.hover={event:j.event,marks:ae(s,i.scales,j.event),crosshairX:r?null:n,crosshairY:r?n:null,tooltip:N?.kind===`pan`||N?.kind===`point`?null:ye(j.event,j.x,j.y,i.scales)};let a=e?.colors,o=j.event.items[0],c=o?s.series[o.seriesIndex]:void 0;a&&o&&c?.type===`heatmap`&&o.value!==void 0&&(a.caret=a.bar.x+m(c,o.value)*a.bar.width)}N?.kind===`point`&&N.moved&&(d.dragging=xe(s,i.scales,_,N.item,N.x,N.y,!!L()?.dropTargets),L()?.dragLabel===!1&&(d.dragging.label=null));let p=i.plot,g=`${p.x},${p.y},${p.width},${p.height}`;return g!==te&&(te=g,F(`layout`,{...p})),d},B=()=>((O||!D)&&(O=!1,D=be()),D),V=()=>B()?.layout.scales??null,H=e=>{let t=!se(j?.event??null,e?.event??null);j=e,I(),t&&F(`hover`,e?e.event:null)},U=(e,t,n,r=!0)=>{let i=V();return i?me(s,i,D?.layout.xTicks??null,e,t,n?8:0)??(r?fe(s,i,D?.layout.xTicks??null,D?.pointLabels??[],e,t,n?8:2):null):null},Se=(e,t)=>{let n=V()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},Ce=(e,t)=>{let n=V();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t)),o=w(n,i,a);return{x:g(s,o.x),y:u(s,o.y)}},W=(e,t)=>{let{base:n,minSpan:r}=s;c={x:Be(e.x,n.x,r.x),y:Be(e.y,n.y,r.y)},l=!Pe(c.x,n.x)||!Pe(c.y,n.y),t&&F(`zoom`,ne(s,c)),I()},Ee=(e,t,n)=>{let r=V();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=G(c),a=w(r,e,t);s.zoom.x&&(i.x=Fe(c.x,a.x,n)),s.zoom.y&&(i.y=Fe(c.y,a.y,n)),W(i,!0)},De=()=>{l&&W(G(s.base),!0)},Oe=(e,t)=>B()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,ke=e=>{a.has(e)?a.delete(e):a.add(e),z()},Ae=()=>{let[e,t]=[...M.values()];N={kind:`pinch`,view:G(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},H(null)};return s=p(t,r,a,i),z(),{setOptions(e){if(A)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=He(n,t.palette)),z()},setTheme(e){A||(n=e,r=He(n,t.palette),z())},setSize(e,t){(e!==f||t!==h)&&(f=Math.max(0,e),h=Math.max(0,t),I())},getScene:B,pointerDown:(e,t,n={})=>{if(A)return;let r=n.id??0,i=!!n.touch;M.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=L();if(M.size===2){a&&(s.zoom.x||s.zoom.y)&&N?.kind!==`point`&&Ae();return}if(M.size>2||!a){if(!a&&i){let n=U(e,t,!0);H(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=U(e,t,i,!1)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){N={kind:`point`,item:n,x:e,y:t,moved:!1};return}}if(l&&a.pan&&Se(e,t)){N={kind:`pan`,view:G(c),x:e,y:t};return}if(N=null,i){let n=U(e,t,!0);H(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(A)return;let r=n.id??0,i=M.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?Ye:Je)&&(i.moved=!0)),N?.kind===`pinch`&&M.size>=2){let[e,t]=[...M.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=V();if(!a)return;let o=C(a.plot,N.view,s.x.reverse,s.y.reverse,s.horizontal),c=N.distance/n,l=G(N.view),u=w(o,N.midX,N.midY),d=w(o,r,i);s.zoom.x&&(l.x=Fe(N.view.x,u.x,c),l.x=Ne(l.x,(u.x-d.x)*c)),s.zoom.y&&(l.y=Fe(N.view.y,u.y,c),l.y=Ne(l.y,(u.y-d.y)*c)),W(l,!0);return}if(N?.kind===`point`&&i){if(!i.moved)return;let n=N;if(n.x=e,n.y=t,!n.moved){n.moved=!0,j&&H(null);let e=Ce(i.startX,i.startY);e&&F(`dragStart`,{item:n.item,x:e.x,y:e.y})}let r=Ce(e,t);I(),r&&F(`drag`,{item:n.item,x:r.x,y:r.y});return}if(N?.kind===`pan`&&i){if(!i.moved)return;let n=V();if(!n)return;let r=G(N.view),a=w(n,N.x,N.y),o=w(n,e,t);s.zoom.x&&(r.x=Ne(N.view.x,a.x-o.x)),s.zoom.y&&(r.y=Ne(N.view.y,a.y-o.y)),W(r,!0);return}if(!(M.size>1)&&(!i||i.touch||!n.touch)){let r=U(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&H(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(A)return;let r=n.id??0,i=M.get(r);M.delete(r);let a=N;if(a?.kind===`pinch`){M.size<2&&(N=null);return}if(N=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=Ce(e,t);I(),n&&F(`drop`,{item:a.item,x:n.x,y:n.y}),a.moved&&F(`dragEnd`,{item:a.item,cancelled:!n});return}}else if(a?.kind===`pan`&&i.moved){I();return}if(i.moved){i.touch&&I();return}let o=Date.now();if(i.touch&&o-P.time<Xe&&Math.hypot(e-P.x,t-P.y)<24&&l){P={time:0,x:e,y:t},De();return}P={time:o,x:e,y:t};let s=Oe(e,t);if(s){B()?.legend?.toggle&&ke(s.id);return}let c=U(e,t,i.touch);if(c){i.touch&&H({event:c,x:e,y:t}),F(`click`,c);return}if(i.touch&&H(null),Se(e,t)){let n=Ce(e,t);n&&F(`plotClick`,n)}},pointerCancel:(e={})=>{M.delete(e.id??0);let t=N;(t?.kind===`point`||M.size<2)&&(N=null),I(),t?.kind===`point`&&t.moved&&F(`dragEnd`,{item:t.item,cancelled:!0})},pointerLeave(){!N&&j&&H(null)},zoomAt:Ee,resetZoom:De,getView:()=>ne(s,c),setView(e){A||W(v(s,e,c),!1)},toggleSeries:ke,clearHover(){j&&H(null)},getPlotRect(){let e=B()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=V();return n?E(n,y(s,e),d(s,t)):null},fromPixel(e,t){let n=V();if(!n)return null;let r=w(n,e,t);return{x:g(s,r.x),y:u(s,r.y)}},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){A=!0,M.clear();for(let e of Object.keys(o))delete o[e]}}},Qe=(e,t,n,r)=>{if(!n)return[0,t];let[i,a]=r[0]<=r[1]?r:[r[1],r[0]];return[Math.max(0,V(e,t,i)-1),Math.min(t,V(e,t,a)+1)]},$e={heatmap:0,area:1,bar:2,boxplot:2,candlestick:3,line:4,scatter:5},q=(e,t)=>{if(!e.horizontal)return t;let n=Array(t.length);for(let e=0;e<t.length;e+=4)n[e]=t[e+1],n[e+1]=t[e],n[e+2]=t[e+3],n[e+3]=t[e+2];return n},et=(e,t={})=>{let{model:n,view:r,layout:i}=e,a=i.scales,{plot:o}=i,s=a.horizontal,c=t.maxDots??4e3,l=t.maxBars??2e3,u=Math.max(1,t.columnWidth??1),d=s?o.y:o.x,p=d+(s?o.height:o.width),m=[],h=n.series.filter(e=>!e.hidden&&e.cols.count>0).sort((e,t)=>$e[e.type]-$e[t.type]||e.index-t.index);for(let e of h){let{x:i,y:h,count:g,sorted:_}=e.cols;if(e.type===`line`||e.type===`area`){let[t,o]=Qe(i,g,_,r.x),c=e.stackTop??h,l=Oe(i,c,t,o,e.curve),f=e.stackBase?Oe(i,e.stackBase,t,o,e.curve).points:null,v=l.length,y=l.points,b=f;if(_&&v>(p-d)*2/u){if(f){let e=ke(y,0,v,e=>a.xToPx(e)/u),t=new Float64Array(e.length*2),n=new Float64Array(e.length*2),r=0,i=0;for(let a=0;a<e.length;a++){let o=e.points[a*2];for(;i<v-1&&y[i*2]<o;)i++;t[r*2]=o,t[r*2+1]=e.points[a*2+1],n[r*2]=o,n[r*2+1]=f[i*2+1],r++}y=t,b=n,v=r}else{let e=ke(y,0,v,e=>a.xToPx(e)/u);y=e.points,v=e.length}}let x=e.type===`area`&&!!e.cols.y0&&!!b,S=[],C=[],w=[],T=[],D=[],O=[],k=()=>{T.length&&(S.push(T),C.push(D),x&&w.push(O)),T=[],D=[],O=[]};for(let e=0;e<v;e++){let t=y[e*2],n=y[e*2+1],r=b?b[e*2+1]:0;if(!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(r)){k();continue}let i=E(a,t,n);if(T.push(i.x,i.y),b&&D.push(a.yToPx(r)),x){let e=E(a,t,r);O.push(e.x,e.y)}}if(k(),e.type===`area`&&m.push({kind:`area`,seriesIndex:e.index,color:e.colorCss,opacity:e.opacity,baseline:a.yToPx(n.baseline),segments:S,...b?{bottoms:C}:{},...s?{horizontal:!0}:{}}),e.lineWidth>0){let t=e.type===`area`?Math.min(e.lineWidth,2):e.lineWidth;m.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:S}),x&&m.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:w})}continue}if(e.type===`bar`&&e.barBase&&e.barTop){let[t,n]=Qe(i,g,_,r.x),o=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),.5),s=[],c=[],u=n-t>l,h=NaN;for(let r=t;r<n;r++){let t=e.barBase[r],n=e.barTop[r];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let l=a.xToPx(i[r]+e.barOffset);if(l+o<d||l-o>p)continue;let m=a.yToPx(t),g=a.yToPx(n),_=Math.min(m,g),v=Math.max(1,Math.abs(m-g)),y=Math.floor(l);if(u&&y===h&&s.length){let e=s.length-4,t=Math.max(s[e+1]+s[e+3],_+v);s[e+1]=Math.min(s[e+1],_),s[e+3]=t-s[e+1];continue}h=y,s.push(l-o,_,o*2,v);let b=e.pointColors?.[r];c.push(e.cols.opacities?z(b??e.color,f(e,r)):b?z(b):e.colorCss)}m.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:q(a,s),...e.pointColors||e.cols.opacities?{colors:c}:{},radius:e.radius,...e.opacity<1&&!e.cols.opacities?{opacity:e.opacity}:{}});continue}if(e.type===`boxplot`){m.push(...tt(e,a,r.x,d,p,l));continue}if(e.type===`candlestick`){let[t,n]=Qe(i,g,_,r.x),{open:o,high:s,low:c}=e.cols,u=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),1),f=z(e.upColor),v=z(e.downColor),y=[],b=[],x=[],S=[],C=Math.max(1,Math.ceil((n-t)/l));for(let e=t;e<n;e+=C){let t=h[e],n=o?o[e]:t;if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=a.xToPx(i[e]);if(r+u<d||r-u>p)continue;let l=t<n?v:f,m=a.yToPx(s?s[e]:Math.max(n,t)),g=a.yToPx(c?c[e]:Math.min(n,t));y.push(r-.5,Math.min(m,g),1,Math.abs(g-m)),x.push(l);let _=a.yToPx(n),C=a.yToPx(t);b.push(r-u,Math.min(_,C),u*2,Math.max(1,Math.abs(_-C))),S.push(l)}m.push({kind:`bars`,seriesIndex:e.index,color:f,rects:q(a,y),colors:x},{kind:`bars`,seriesIndex:e.index,color:f,rects:q(a,b),colors:S,radius:1});continue}if(e.type===`heatmap`){let t=Math.abs(e.cellHalf.x/a.xPerPx),n=Math.abs(e.cellHalf.y/a.yPerPx),r=[],s=[],c=O(t*2,n*2,e.radius),u=c.inset;for(let c=0;c<g&&r.length/4<l*4;c++){let l=e.cellColors?.[c];if(!l)continue;let d=D(a,a.xToPx(i[c])-t,a.xToPx(i[c])+t,a.yToPx(h[c])-n,a.yToPx(h[c])+n);d.x+d.width<o.x||d.x>o.x+o.width||d.y+d.height<o.y||d.y>o.y+o.height||(r.push(d.x+u,d.y+u,d.width-u*2,d.height-u*2),s.push(z(ve(l))))}m.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:r,colors:s,radius:c.radius});continue}let v=[],y=[],b=t=>{let n=e.pointColors?.[t];return n?z(n):e.colorCss},x=[],S=[];for(let e=0;e<g;e++){let t=i[e],n=h[e];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=E(a,t,n);r.x<o.x||r.x>o.x+o.width||r.y<o.y||r.y>o.y+o.height||(x.push(e),S.push(r.x,r.y))}if(x.length>c){let n=Math.max(2,t.dotCell??e.pointSize*.8),r=Math.ceil(o.width/n)+1,i=new Map;x.forEach((e,t)=>{let a=Math.floor((S[t*2]-o.x)/n),s=Math.floor((S[t*2+1]-o.y)/n);i.set(s*r+a,e)});for(let[e,t]of i)v.push(o.x+(e%r+.5)*n,o.y+(Math.floor(e/r)+.5)*n,n),y.push(b(t))}else x.forEach((t,n)=>{v.push(S[n*2],S[n*2+1],P(e,t)),y.push(b(t))});m.push({kind:`dots`,seriesIndex:e.index,opacity:e.opacity,dots:v,colors:y,...e.stroke===null?{}:{stroke:e.stroke}})}return m},tt=(e,t,n,r,i,a)=>{let{x:o,y:s,count:c,sorted:l,high:u,low:d,q1:f,q3:p,outliers:m}=e.cols,[h,g]=Qe(o,c,l,n),_=Math.max(e.barHalfWidth/Math.abs(t.xPerPx),1),v=Math.max(1,e.lineWidth),y=[],b=[],x=[],S=[],C=[],w=[],T=Math.max(1,Math.ceil((g-h)/a)),E=(e,t,n)=>{b.push(e-v/2,Math.min(t,n),v,Math.abs(t-n))},D=(e,t,n,r=v)=>{b.push(e-t,n-r/2,t*2,r)};for(let n=h;n<g;n+=T){let a=s[n];if(!Number.isFinite(a))continue;let c=t.xToPx(o[n]+e.barOffset);if(c+_<r||c-_>i)continue;let l=e.pointColors?.[n],h=l?z(l):e.colorCss,g=t.yToPx(d&&Number.isFinite(d[n])?d[n]:a),T=t.yToPx(u&&Number.isFinite(u[n])?u[n]:a),O=t.yToPx(f&&Number.isFinite(f[n])?f[n]:a),k=t.yToPx(p&&Number.isFinite(p[n])?p[n]:a),ee=b.length;y.push(c-_,Math.min(O,k),_*2,Math.abs(O-k)),x.push(h),E(c,g,O),E(c,k,T),E(c-_,O,k),E(c+_,O,k),D(c,_/2,g),D(c,_/2,T),D(c,_,O),D(c,_,k),D(c,_,t.yToPx(a),Math.max(2,v*1.6));for(let e=ee;e<b.length;e+=4)S.push(h);let te=m?.[n];if(te)for(let n of te){let r=t.horizontal?{x:t.yToPx(n),y:c}:{x:c,y:t.yToPx(n)};C.push(r.x,r.y,e.outlierSize),w.push(h)}}let O=[{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:q(t,y),colors:x,opacity:e.opacity},{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:q(t,b),colors:S}];return C.length&&O.push({kind:`dots`,seriesIndex:e.index,opacity:e.outlierShape===`hollow`?0:.85,dots:C,colors:w,stroke:1.25}),O}})))()}var rt,J,it,at,ot,Y,st,ct,lt,ut,dt,ft;function pt(){return(pt=e((()=>{B(),Le(),l(),R(),W(),j(),M(),nt(),rt=e=>(e[0]+e[1])/2,J=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},it=(e,t,n)=>{e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip(),e.lineJoin=`round`,e.lineCap=`round`;for(let n of t)if(n.kind===`area`)e.globalAlpha=n.opacity,e.fillStyle=n.color,n.segments.forEach((t,r)=>{let i=n.bottoms?.[r],a=t.length/2;if(!(a<2)){e.beginPath();for(let n=0;n<a;n++)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n*2],t[n*2+1]);for(let r=a-1;r>=0;r--){let a=i?i[r]:n.baseline;n.horizontal?e.lineTo(a,t[r*2+1]):e.lineTo(t[r*2],a)}e.closePath(),e.fill()}}),e.globalAlpha=1;else if(n.kind===`line`){e.strokeStyle=n.color,e.lineWidth=n.width,e.beginPath();for(let t of n.segments)for(let n=0;n<t.length;n+=2)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n],t[n+1]);e.stroke()}else if(n.kind===`bars`){e.globalAlpha=n.opacity??1;let t=n.radius??0;for(let r=0;r<n.rects.length;r+=4){let[i,a,o,s]=[n.rects[r],n.rects[r+1],n.rects[r+2],n.rects[r+3]];e.fillStyle=n.colors?.[r/4]??n.color;let c=Math.min(t,o/2,s/2);c>.5?(J(e,i,a,o,s,c),e.fill()):e.fillRect(i,a,o,s)}e.globalAlpha=1}else{let t=n.stroke??0;for(let r=0;r<n.dots.length;r+=3){let i=n.colors[r/3]??`#888`,a=n.dots[r+2]/2;e.beginPath(),e.arc(n.dots[r],n.dots[r+1],Math.max(0,a-t/2),0,Math.PI*2),n.opacity>0&&(e.globalAlpha=n.opacity,e.fillStyle=i,e.fill()),t>0&&(e.globalAlpha=1,e.lineWidth=t,e.strokeStyle=i,e.stroke())}e.globalAlpha=1}e.restore()},at=(e,t,n)=>{let{theme:r}=n,{bar:i,stops:a}=t,o=a.length;if(typeof e.createLinearGradient==`function`){let t=e.createLinearGradient(i.x,0,i.x+i.width,0);a.forEach((e,n)=>t.addColorStop(n/Math.max(1,o-1),e)),e.fillStyle=t,J(e,i.x,i.y,i.width,i.height,i.height/2),e.fill()}else{let t=i.width/o;a.forEach((n,r)=>{e.fillStyle=n,e.fillRect(i.x+r*t,i.y,t+.5,i.height)})}e.fillStyle=z(r.text,.35);for(let n of t.ticks)e.fillRect(Math.round(n),i.y-2,1,i.height+4);e.font=k(r,11),e.textBaseline=`middle`,e.fillStyle=z(r.textMuted);for(let n of t.labels)e.textAlign=n.align,e.fillText(n.text,n.x,n.y);t.caret!==null&&(J(e,t.caret-2,i.y-3,4,i.height+6,2),e.fillStyle=z(r.text),e.fill(),e.lineWidth=1.5,e.strokeStyle=z(r.background),e.stroke())},ot=1.16,Y=(e,t,n,r)=>{let i=Math.max(0,t.width+r*2),a=Math.max(0,t.height+r*2);J(e,t.x-r,t.y-r,i,a,Math.max(0,Math.min(n+r,i/2,a/2)))},st=(e,t,n,r,i,a,o,s,c)=>{let l=z(c.background);a?(e.save(),e.shadowColor=`rgba(15, 23, 42, 0.4)`,e.shadowBlur=14,e.shadowOffsetY=5,Y(e,t,n,o+(s?.width??0)),e.fillStyle=s?s.color:l,e.fill(),e.restore(),s&&(Y(e,t,n,o),e.fillStyle=l,e.fill())):i&&(Y(e,t,n,0),e.fillStyle=l,e.fill()),Y(e,t,n,0),e.fillStyle=r,e.fill(),a&&a.width>0&&(Y(e,t,n,-a.width/2),e.lineWidth=a.width,e.strokeStyle=a.color,e.stroke())},ct=(e,t,n,r)=>{for(let i of t)if(i.kind===`bar`){let t=I(i);e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip();let a=i.ring===null?null:{color:i.ring,width:Math.min(i.backdrop?2:1.5,Math.max(0,(Math.min(t.width,t.height)-2)/4))};st(e,t,i.radius,i.color,i.backdrop,a,1.5,null,r),e.restore()}else if(i.kind===`cell`){let t=i.width*ot,n=i.height*ot;st(e,{x:i.x+(i.width-t)/2,y:i.y+(i.height-n)/2,width:t,height:n},Math.max(2,i.radius)*ot,i.color,!1,{color:i.ring,width:Math.min(2,Math.min(t,n)/5)},2,{color:z(r.primary,.6),width:1.5},r)}},lt=(e,t)=>{let n=ye(e);return n?z(n,n[3]*t):e},ut=(e,t,n,r)=>{if(e.save(),t.origin){let n=(t.size-2)/2;e.beginPath(),e.arc(t.origin.x,t.origin.y,n,0,Math.PI*2),e.fillStyle=z(r.background,.62),e.fill(),e.setLineDash([3,3]),e.lineWidth=1.5,e.strokeStyle=t.color,e.stroke(),e.setLineDash([])}if(e.beginPath(),e.arc(t.x,t.y+3,t.size/2+2,0,Math.PI*2),e.fillStyle=`rgba(15, 23, 42, 0.18)`,e.shadowColor=`rgba(15, 23, 42, 0.35)`,e.shadowBlur=10,e.fill(),e.shadowColor=`transparent`,e.shadowBlur=0,e.beginPath(),e.arc(t.x,t.y,t.size/2+5,0,Math.PI*2),e.fillStyle=lt(t.color,.24),e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=z(r.background),e.stroke(),t.label){e.font=k(r,12,600);let i=e.measureText(t.label).width+18,a=t.size/2+8,o=t.x+a+i<=n.x+n.width||t.x-a-i<n.x?t.x+a:t.x-a-i,s=t.y-11;e.shadowColor=`rgba(15, 23, 42, 0.2)`,e.shadowBlur=10,e.shadowOffsetY=3,J(e,o,s,i,22,11),e.fillStyle=z(r.background),e.fill(),e.shadowColor=`transparent`,e.shadowBlur=0,e.shadowOffsetY=0,e.lineWidth=1,e.strokeStyle=z(r.axis,.7),e.stroke(),e.fillStyle=z(r.text),e.textAlign=`left`,e.textBaseline=`middle`,e.fillText(t.label,o+9,t.y)}e.restore()},dt=(e,t,n,r,i,a=L(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),h(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,y2:l.y2,y2Ticks:d.y2Ticks,theme:c,annotations:t.annotations});let g=t.legend?.colors;if(g&&at(e,g,t),t.legend){e.font=k(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=z(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}let _=t.hover?.marks.some(e=>e.kind===`bar`)??!1;for(let n of t.hover?.marks??[])n.kind===`band`&&(J(e,n.x,n.y,n.width,n.height,6),e.fillStyle=z(c.text,_?.04:.06),e.fill());let v=l.series.some(e=>!e.hidden&&(e.type===`line`||e.type===`area`));_&&v&&t.hover&&ct(e,t.hover.marks,f,c);let y=t.dragging?.target;y&&(e.save(),e.fillStyle=lt(y.color,.12),e.fillRect(y.x,y.y,y.width,y.height),e.strokeStyle=lt(y.color,.7),e.lineWidth=2,J(e,y.x+1,y.y+1,y.width-2,y.height-2,4),e.stroke(),e.restore()),p.horizontal?it(e,et(t),f):b();function b(){let e=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[t,i]=e(u.x,r.x,l.x.reverse),[o,s]=e(u.y,r.y,l.y.reverse);a.paint(n,{transform:{xScale:t,xOffset:i,yScale:o,yOffset:s},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m))}e.setTransform(m,0,0,m,0,0);for(let n of t.hover?.marks??[])n.kind===`guide`&&(e.fillStyle=z(c.text,.06),e.fillRect(n.x,n.y,n.width,n.height));if(_&&!v&&(e.fillStyle=z(c.background,.42),e.fillRect(f.x,f.y,f.width,f.height)),t.hover&&!(_&&v)&&ct(e,t.hover.marks,f,c),x(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1,connectors:t.connectors,arrows:t.arrows}),t.pointLabels.length){e.save(),e.font=k(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=z(c.background,.9),e.fillStyle=z(c.text,.85);for(let{label:n,box:r}of t.pointLabels){let t=r.y+r.height/2;if(n.color){e.save(),e.fillStyle=n.color,e.fillText(n.text,r.x,t),e.restore();continue}e.strokeText(n.text,r.x,t),e.fillText(n.text,r.x,t)}e.restore()}let S=t.hover;if(S){if(S.crosshairX!==null){e.save(),e.strokeStyle=z(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(S.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}if(S.crosshairY!==null){e.save(),e.strokeStyle=z(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(S.crosshairY)+.5;e.moveTo(f.x,t),e.lineTo(f.x+f.width,t),e.stroke(),e.restore()}for(let t of S.marks)t.kind!==`band`&&t.kind!==`guide`&&t.kind!==`bar`&&t.kind!==`cell`&&(e.beginPath(),e.arc(t.x,t.y,t.size/2+8,0,Math.PI*2),e.fillStyle=t.halo,e.globalAlpha=.45,e.fill(),e.globalAlpha=1,e.beginPath(),e.arc(t.x,t.y,t.size/2+4,0,Math.PI*2),e.fillStyle=t.halo,e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=z(c.background),e.stroke())}t.dragging&&ut(e,t.dragging,f,c);let C=S?.tooltip;if(C){let{box:t,lineHeight:n,padding:r}=C,i=Ve(c,Re);e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,J(e,t.x,t.y,t.width,t.height,8),e.fillStyle=i.background,e.fill(),e.restore(),J(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=i.border,e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let a=t.y+r+n/2,o=t.x+r+2,s=t.x+t.width-r-2;if(C.text){e.font=k(c,12),e.fillStyle=z(c.text),e.textAlign=`left`;for(let t of C.text)e.fillText(t,o,a),a+=n}else{let{content:t}=C,r=o;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,a,4,0,Math.PI*2),e.fill(),r+=14),e.font=k(c,12,600),e.fillStyle=z(c.text),e.textAlign=`left`,e.fillText(t.title,r,a),a+=n,t.subtitle&&(e.font=k(c,11),e.fillStyle=z(c.textMuted),e.fillText(t.subtitle,r,a-2),a+=n);for(let i of t.rows)r=o,i.color&&(e.fillStyle=i.color,e.beginPath(),e.arc(r+4,a,4,0,Math.PI*2),e.fill()),r+=C.swatchWidth,e.font=k(c,12),e.textAlign=`left`,e.fillStyle=z(c.textMuted),e.fillText(i.name,r,a),e.font=k(c,12,600),e.textAlign=`right`,e.fillStyle=z(c.text),e.fillText(i.value,s,a),a+=n}}},ft=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u=``,d=``,f=e.options,p=new WeakMap,m=0,h=e=>{let t=p.get(e);return t===void 0&&p.set(e,t=++m),t},g={x:0,y:0},_=0,v=``,y=(e,t)=>n?(t!==v&&(n.font=t,v=t),n.measureText(e).width):e.length*6.5,b=n?L(n):null,x=globalThis,S=()=>{if(s=null,o||!n||!b)return;let e=D.getScene();if(!e)return;let p=Math.max(1,Math.round(r*a)),m=Math.max(1,Math.round(i*a));t.width!==p&&(E.own(),t.width=p),t.height!==m&&(E.own(),t.height=m),v=``,l!==e.model&&(l=e.model,u=A(e.model,h(e.theme),e=>f.series[e]?.stack));let y=e.layout.scales,x={x:1/Math.abs(y.xPerPx),y:1/Math.abs(y.yPerPx)},S=`${u}|${Ae(e.model,x)}`;S!==d&&(d=S,g={x:rt(e.model.base.x),y:rt(e.model.base.y)},c=Se(e.model,g,++_,x)),dt(n,e,c,g,a,b),v=``},C=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(S):x.requestAnimationFrame?x.requestAnimationFrame(S):setTimeout(S,16))},w=()=>{s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s),s=null)},T=()=>{w(),S()},E=qe(t,()=>t.width!==Math.max(1,Math.round(r*a))||t.height!==Math.max(1,Math.round(i*a)),T),D=Ze({options:e.options,theme:e.theme,measureText:y,onInvalidate:C});D.setSize(r,i);let O=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>{f=e,D.setOptions(e)},setTheme:e=>D.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),D.setSize(e,t),C()},render:T,touchStart(e){e.forEach((e,t)=>D.pointerDown(e.x,e.y,O(e,t)))},touchMove(e){e.forEach((e,t)=>D.pointerMove(e.x,e.y,O(e,t)))},touchEnd(e){e.forEach((e,t)=>D.pointerUp(e.x,e.y,O(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>D.pointerCancel(O(e,t)))},pointerDown:(e,t,n)=>D.pointerDown(e,t,n),pointerMove:(e,t,n)=>D.pointerMove(e,t,n),pointerUp:(e,t,n)=>D.pointerUp(e,t,n),pointerLeave:()=>D.pointerLeave(),zoomAt:(e,t,n)=>D.zoomAt(e,t,n),resetZoom:()=>D.resetZoom(),getView:()=>D.getView(),setView:e=>D.setView(e),toggleSeries:e=>D.toggleSeries(e),clearHover:()=>D.clearHover(),getPlotRect:()=>D.getPlotRect(),toPixel:(e,t)=>D.toPixel(e,t),fromPixel:(e,t)=>D.fromPixel(e,t),getController:()=>D,on:(e,t)=>D.on(e,t),destroy(){o||(o=!0,w(),E.disconnect(),b?.destroy(),D.destroy())}}}})))()}function mt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,ht.useRef)(null),[a,o]=(0,ht.useState)(`…`),[s,c]=(0,ht.useState)(null),l=new Intl.NumberFormat(n,{notation:`compact`});(0,ht.useEffect)(()=>{let t=i.current;if(!t)return;let r=new Intl.NumberFormat(n,{notation:`compact`}),a=De(t,{series:[{name:e(`downloads`),type:`bar`,data:_t.map((e,t)=>[e,vt[t]])}],yAxis:{format:e=>r.format(e)},ariaLabel:e(`downloadsAria`)}),s=!0;a.ready.then(t=>{s&&o(t??e(`unsupported`))});let l=a.on(`click`,c);return()=>{s=!1,l(),a.destroy()}},[e,n]);let u=s?.items[0],d=s&&u?e(`downloadsStatus`,{release:s.xLabel,downloads:l.format(u.y)}):e(`clickBar`);return(0,gt.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,gt.jsx)(`div`,{ref:i,style:{height:300}}),(0,gt.jsxs)(`p`,{role:`status`,children:[e(`rendererLabel`,{renderer:a}),` · `,d]})]})}var ht,gt,_t,vt;function yt(){return(yt=e((()=>{ht=t(),i(),H(),gt=n(),_t=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],vt=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function bt(){let e=(0,xt.useRef)(null),t=(0,xt.useRef)(null),{t:n,i18n:i}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),a=i.language,[o,s]=(0,xt.useState)(null);(0,xt.useEffect)(()=>{let r=e.current;if(!r)return;let i=new Intl.DateTimeFormat(a,{month:`short`}),o=Ct.map((e,t)=>i.format(new Date(2026,t,1))),c=new Intl.NumberFormat(a,{notation:`compact`}),l=()=>r.getBoundingClientRect(),u=ft({canvas:r,width:l().width,height:l().height,pixelRatio:window.devicePixelRatio||1,theme:Et(r),options:{series:[{name:n(`visits`),type:`area`,data:o.map((e,t)=>[e,Ct[t]])},{name:n(`signupsTimes10`),type:`line`,data:o.map((e,t)=>[e,wt[t]*10])}],yAxis:{format:e=>c.format(e)},crosshair:!0,ariaLabel:n(`visitsAria`)}});t.current=u;let d=u.on(`click`,e=>{let t=e.items[0];t&&s(`${e.xLabel}: ${c.format(t.y)} (${t.seriesName})`)}),f=u.on(`plotClick`,()=>s(null)),p=new ResizeObserver(()=>{let{width:e,height:t}=l();u.resize(e,t,window.devicePixelRatio||1)});p.observe(r);let m=new MutationObserver(()=>u.setTheme(Et(r)));return m.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{d(),f(),p.disconnect(),m.disconnect(),u.destroy(),t.current=null}},[n,a]);let c=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,St.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,St.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":n(`visitsAria`),style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...c(e)),onPointerMove:e=>t.current?.pointerMove(...c(e)),onPointerUp:e=>t.current?.pointerUp(...c(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,St.jsx)(`p`,{role:`status`,children:o??n(`clickPoint`)})]})}var xt,St,Ct,wt,Tt,Et;function Dt(){return(Dt=e((()=>{xt=t(),i(),pt(),St=n(),Ct=[4200,5100,4800,6900,7400,8800,8100,9600],wt=[310,420,380,560,610,790,720,880],Tt=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],Et=e=>{let t=getComputedStyle(e),n={};for(let e of Tt){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function Ot(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,X.useRef)(null),a=(0,X.useRef)(null),[s,c]=(0,X.useState)(`pie`),[l,u]=(0,X.useState)(null),d=(0,X.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),p=(0,X.useMemo)(()=>{let t=new Intl.NumberFormat(n,{notation:`compact`}),r=kt.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),i={format:e=>d.format(e),percentFormat:e=>f.format(e)};return{pie:{type:`pie`,data:r,ariaLabel:e(`sourcesAria`),...i},donut:{type:`pie`,data:r,innerRadius:.62,padAngle:2,cornerRadius:4,centerValue:t.format(9800),centerLabel:e(`visitsLabel`),labels:`none`,ariaLabel:e(`sourcesAria`),...i},funnel:{type:`funnel`,data:At.map(({key:t,value:n})=>({name:e(`stages.${t}`),value:n})),ariaLabel:e(`funnelAria`),...i}}},[e,n,d,f]),m=(0,X.useRef)(p);(0,X.useEffect)(()=>{m.current=p}),(0,X.useEffect)(()=>{let e=i.current;if(!e)return;let t=F(e,m.current.pie);a.current=t;let n=t.on(`click`,u);return()=>{n(),t.destroy(),a.current=null}},[]),(0,X.useEffect)(()=>{a.current?.setOptions(p[s])},[p,s]);let h=e=>{c(e),u(null)};return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(`div`,{style:{display:`flex`,gap:8},children:jt.map(t=>(0,Z.jsx)(o,{size:`small`,variant:s===t?`solid`:`outline`,"aria-pressed":s===t,onClick:()=>h(t),children:e(`views.${t}`)},t))}),(0,Z.jsx)(`div`,{ref:i,style:{height:300}}),(0,Z.jsx)(`p`,{role:`status`,children:l?e(`picked`,{name:l.name,value:d.format(l.value),share:f.format(l.percent)}):e(`clickShape`)})]})}var X,Z,kt,At,jt;function Mt(){return(Mt=e((()=>{X=t(),i(),a(),N(),Z=n(),kt=[{key:`search`,value:4200},{key:`direct`,value:2600},{key:`social`,value:1500},{key:`email`,value:900},{key:`referral`,value:600}],At=[{key:`visits`,value:9800},{key:`signups`,value:3100},{key:`trials`,value:1400},{key:`customers`,value:520}],jt=[`pie`,`donut`,`funnel`]})))()}function Nt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Pt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,Q.useRef)(null),a=(0,Q.useRef)(null),s=(0,Q.useRef)([]),c=(0,Q.useRef)(Nt(17)),[l,u]=(0,Q.useState)(!1),[d,f]=(0,Q.useState)(0),p=(0,Q.useRef)(null);(0,Q.useEffect)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`}),r={cpu:e(`cpu`),seconds:e(`seconds`),aria:e(`cpuAria`),percent:e=>t.format(e/100)};p.current=r,a.current?.setOptions(Rt(s.current,r))},[e,n]),(0,Q.useEffect)(()=>{let e=i.current;if(!e)return;let t=Nt(17);c.current=t;let n=[];for(let e=0;e<20;e++)n.push(Lt(t,n[e-1]));s.current=n;let r=De(e,Rt(n,p.current??It));return a.current=r,f(n.length),()=>{r.destroy(),a.current=null}},[]),(0,Q.useEffect)(()=>{if(l)return;let e=setInterval(()=>{let e=s.current,t=[...e.slice(-119),Lt(c.current,e[e.length-1])];s.current=t,a.current?.setOptions(Rt(t,p.current??It)),f(e=>e+1)},500);return()=>clearInterval(e)},[l]);let m=new Intl.NumberFormat(n);return(0,Ft.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Ft.jsx)(`div`,{ref:i,style:{height:300,width:`100%`}}),(0,Ft.jsx)(o,{variant:`outline`,onClick:()=>u(e=>!e),children:e(l?`resume`:`pause`)}),(0,Ft.jsx)(`p`,{role:`status`,children:e(l?`pausedStatus`:`streamingStatus`,{points:m.format(d)})})]})}var Q,Ft,It,Lt,Rt;function zt(){return(zt=e((()=>{Q=t(),i(),a(),H(),Ft=n(),It={cpu:``,seconds:``,aria:``,percent:String},Lt=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},Rt=(e,t)=>({series:[{name:t.cpu,type:`area`,data:e,opacity:.2}],xAxis:{title:t.seconds},yAxis:{min:0,max:100,format:t.percent},interaction:!1,ariaLabel:t.aria})})))()}var Bt;function Vt(){return(Vt=e((()=>{Bt=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createChart, type ChartHoverEvent } from "minerva-design/charts/core";

const releases = ["v1.0", "v1.1", "v1.2", "v2.0", "v2.1", "v2.2", "v3.0"];
const downloads = [120e3, 185e3, 240e3, 610e3, 720e3, 830e3, 1.42e6];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const ref = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState("…");
  const [clicked, setClicked] = useState<ChartHoverEvent | null>(null);
  const compact = new Intl.NumberFormat(locale, { notation: "compact" });

  // the chart is created again when the language changes
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    const chart = createChart(container, {
      series: [
        {
          name: t("downloads"),
          type: "bar",
          data: releases.map((release, i) => [release, downloads[i]] as const),
        },
      ],
      yAxis: { format: (value) => format.format(value) },
      ariaLabel: t("downloadsAria"),
    });
    let active = true;
    void chart.ready.then((kind) => {
      if (active) setRenderer(kind ?? t("unsupported"));
    });
    const off = chart.on("click", setClicked);
    return () => {
      active = false;
      off();
      chart.destroy();
    };
  }, [t, locale]);

  const item = clicked?.items[0];
  const result =
    clicked && item
      ? t("downloadsStatus", {
          release: clicked.xLabel,
          downloads: compact.format(item.y),
        })
      : t("clickBar");
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        {t("rendererLabel", { renderer })} · {result}
      </p>
    </div>
  );
}
`})))()}var Ht;function Ut(){return(Ut=e((()=>{Ht=`import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  createCanvasChart,
  type ChartThemeInput,
} from "minerva-design/charts/core";

// January to August
const visits = [4200, 5100, 4800, 6900, 7400, 8800, 8100, 9600];
const signups = [310, 420, 380, 560, 610, 790, 720, 880];

const THEME_VARIABLES = [
  "--primary-color",
  "--success-color",
  "--warning-color",
  "--danger-color",
  "--info-color",
  "--text-color",
  "--text-secondary-color",
  "--border-color",
  "--surface-color",
  "--background-color",
  "--font-family-sans",
];

// createCanvasChart never reads the DOM: hand it the variable values
const readTheme = (element: Element): ChartThemeInput => {
  const style = getComputedStyle(element);
  const variables: Record<string, string> = {};
  for (const name of THEME_VARIABLES) {
    const value = style.getPropertyValue(name).trim();
    if (value) variables[name] = value;
  }
  return { variables };
};

export default function CanvasDemo() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ReturnType<typeof createCanvasChart> | null>(null);
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const [status, setStatus] = useState<string | null>(null);

  // the chart is created again when the language changes
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const monthFormat = new Intl.DateTimeFormat(locale, { month: "short" });
    const months = visits.map((_, m) =>
      monthFormat.format(new Date(2026, m, 1)),
    );
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const size = () => canvas.getBoundingClientRect();
    const chart = createCanvasChart({
      canvas,
      width: size().width,
      height: size().height,
      pixelRatio: window.devicePixelRatio || 1,
      theme: readTheme(canvas),
      options: {
        series: [
          {
            name: t("visits"),
            type: "area",
            data: months.map((month, i) => [month, visits[i]] as const),
          },
          {
            name: t("signupsTimes10"),
            type: "line",
            data: months.map((month, i) => [month, signups[i] * 10] as const),
          },
        ],
        yAxis: { format: (value) => compact.format(value) },
        crosshair: true,
        ariaLabel: t("visitsAria"),
      },
    });
    chartRef.current = chart;

    const offClick = chart.on("click", (event) => {
      const item = event.items[0];
      if (item)
        setStatus(
          \`\${event.xLabel}: \${compact.format(item.y)} (\${item.seriesName})\`,
        );
    });
    const offPlot = chart.on("plotClick", () => setStatus(null));

    const resizer = new ResizeObserver(() => {
      const { width, height } = size();
      chart.resize(width, height, window.devicePixelRatio || 1);
    });
    resizer.observe(canvas);

    // The canvas chart does not watch the page: re-read the colors when
    // the docs switch between light and dark
    const themer = new MutationObserver(() =>
      chart.setTheme(readTheme(canvas)),
    );
    themer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => {
      offClick();
      offPlot();
      resizer.disconnect();
      themer.disconnect();
      chart.destroy();
      chartRef.current = null;
    };
  }, [t, locale]);

  // Pixel position and pointer kind of an event, as the chart expects them
  const at = (event: PointerEvent<HTMLCanvasElement>) =>
    [
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
      { id: event.pointerId, touch: event.pointerType === "touch" },
    ] as const;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <canvas
        ref={ref}
        role="img"
        aria-label={t("visitsAria")}
        style={{ width: "100%", height: 280, touchAction: "none" }}
        onPointerDown={(event) => chartRef.current?.pointerDown(...at(event))}
        onPointerMove={(event) => chartRef.current?.pointerMove(...at(event))}
        onPointerUp={(event) => chartRef.current?.pointerUp(...at(event))}
        onPointerLeave={() => chartRef.current?.pointerLeave()}
      />
      <p role="status">{status ?? t("clickPoint")}</p>
    </div>
  );
}
`})))()}var Wt;function Gt(){return(Gt=e((()=>{Wt=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createShapeChart,
  type ShapeChartInstance,
  type ShapeChartOptions,
  type ShapeHoverEvent,
} from "minerva-design/charts/core";

const traffic = [
  { key: "search", value: 4200 },
  { key: "direct", value: 2600 },
  { key: "social", value: 1500 },
  { key: "email", value: 900 },
  { key: "referral", value: 600 },
];
const funnel = [
  { key: "visits", value: 9800 },
  { key: "signups", value: 3100 },
  { key: "trials", value: 1400 },
  { key: "customers", value: 520 },
];
const VIEWS = ["pie", "donut", "funnel"] as const;
type View = (typeof VIEWS)[number];

export default function ShapesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ShapeChartInstance | null>(null);
  const [view, setView] = useState<View>("pie");
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  // the options of each view, in the reader's language
  const views = useMemo((): Record<View, ShapeChartOptions> => {
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const sources = traffic.map(({ key, value }) => ({
      name: t(\`sources.\${key}\`),
      value,
    }));
    const common = {
      format: (value: number) => number.format(value),
      percentFormat: (share: number) => percent.format(share),
    };
    return {
      pie: {
        type: "pie",
        data: sources,
        ariaLabel: t("sourcesAria"),
        ...common,
      },
      donut: {
        type: "pie",
        data: sources,
        innerRadius: 0.62,
        padAngle: 2,
        cornerRadius: 4,
        centerValue: compact.format(9800),
        centerLabel: t("visitsLabel"),
        labels: "none",
        ariaLabel: t("sourcesAria"),
        ...common,
      },
      funnel: {
        type: "funnel",
        data: funnel.map(({ key, value }) => ({
          name: t(\`stages.\${key}\`),
          value,
        })),
        ariaLabel: t("funnelAria"),
        ...common,
      },
    };
  }, [t, locale, number, percent]);

  // created once; reading the first options from an effect keeps them current
  const viewsRef = useRef(views);
  useEffect(() => {
    viewsRef.current = views;
  });

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createShapeChart(container, viewsRef.current.pie);
    chartRef.current = chart;
    const off = chart.on("click", setPicked);
    return () => {
      off();
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  // another view, or the language changed: animates from the previous values
  useEffect(() => {
    chartRef.current?.setOptions(views[view]);
  }, [views, view]);

  const show = (next: View) => {
    setView(next);
    setPicked(null);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {VIEWS.map((name) => (
          <Button
            key={name}
            size="small"
            variant={view === name ? "solid" : "outline"}
            aria-pressed={view === name}
            onClick={() => show(name)}
          >
            {t(\`views.\${name}\`)}
          </Button>
        ))}
      </div>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        {picked
          ? t("picked", {
              name: picked.name,
              value: number.format(picked.value),
              share: percent.format(picked.percent),
            })
          : t("clickShape")}
      </p>
    </div>
  );
}
`})))()}var Kt;function qt(){return(qt=e((()=>{Kt=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
} from "minerva-design/charts/core";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = readonly [number, number];

const WINDOW = 120;
// placeholder until the texts are set (the effect that sets them runs first)
const emptyLabels: Labels = {
  cpu: "",
  seconds: "",
  aria: "",
  percent: String,
};

const nextPoint = (random: () => number, previous?: Point): Point => {
  const [x, y] = previous ?? [0, 50];
  return [x + 0.5, Math.min(100, Math.max(0, y + (random() - 0.5) * 8))];
};

/** Translated texts of the chart */
interface Labels {
  cpu: string;
  seconds: string;
  aria: string;
  percent: (value: number) => string;
}

const optionsFor = (data: readonly Point[], labels: Labels): ChartOptions => ({
  series: [{ name: labels.cpu, type: "area", data, opacity: 0.2 }],
  xAxis: { title: labels.seconds },
  yAxis: { min: 0, max: 100, format: labels.percent },
  interaction: false,
  ariaLabel: labels.aria,
});

export default function StreamingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const dataRef = useRef<readonly Point[]>([]);
  const randomRef = useRef(mulberry32(17));
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);
  const labelsRef = useRef<Labels | null>(null);

  // texts in the reader's language, re-applied when it changes
  useEffect(() => {
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    const labels: Labels = {
      cpu: t("cpu"),
      seconds: t("seconds"),
      aria: t("cpuAria"),
      percent: (value) => percent.format(value / 100),
    };
    labelsRef.current = labels;
    chartRef.current?.setOptions(optionsFor(dataRef.current, labels));
  }, [t, locale]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    // same sequence on every mount
    const random = mulberry32(17);
    randomRef.current = random;
    const initial: Point[] = [];
    for (let i = 0; i < 20; i++)
      initial.push(nextPoint(random, initial[i - 1]));
    dataRef.current = initial;
    const chart = createChart(
      container,
      optionsFor(initial, labelsRef.current ?? emptyLabels),
    );
    chartRef.current = chart;
    setCount(initial.length);
    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const data = dataRef.current;
      // a new array each time: setOptions only reprocesses changed data
      const next = [
        ...data.slice(-(WINDOW - 1)),
        nextPoint(randomRef.current, data[data.length - 1]),
      ];
      dataRef.current = next;
      chartRef.current?.setOptions(
        optionsFor(next, labelsRef.current ?? emptyLabels),
      );
      setCount((value) => value + 1);
    }, 500);
    return () => clearInterval(id);
  }, [paused]);

  const number = new Intl.NumberFormat(locale);

  return (
    <div
      style={{ display: "grid", gap: 8, width: "100%", justifyItems: "start" }}
    >
      <div ref={ref} style={{ height: 300, width: "100%" }} />
      <Button variant="outline" onClick={() => setPaused((value) => !value)}>
        {paused ? t("resume") : t("pause")}
      </Button>
      <p role="status">
        {paused
          ? t("pausedStatus", { points: number.format(count) })
          : t("streamingStatus", { points: number.format(count) })}
      </p>
    </div>
  );
}
`})))()}var $,Jt,Yt;function Xt(){return(Xt=e((()=>{yt(),Dt(),Mt(),zt(),Vt(),Ut(),Gt(),qt(),t(),i(),We(),s(),Ke(),$=n(),Jt=Ue(Object.assign({"./demos/basic.tsx":mt,"./demos/canvas.tsx":bt,"./demos/shapes.tsx":Ot,"./demos/streaming.tsx":Pt}),Object.assign({"./demos/basic.tsx":Bt,"./demos/canvas.tsx":Ht,"./demos/shapes.tsx":Wt,"./demos/streaming.tsx":Kt})),Yt=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(Ge,{id:`chart-engine`,demos:Jt,intro:t})}})))()}Xt();export{Yt as default};