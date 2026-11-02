import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-6aaLoXIt.js";import{R as a,z as o}from"./ProgressIndicator-Har2Rnl4.js";import{i as s,r as c}from"./DemoBlock-oNTJ0QHK.js";import{$ as l,B as u,Ct as d,Dt as f,G as p,H as m,J as h,K as g,Kt as _,Lt as v,Q as y,R as b,St as x,U as S,V as C,W as w,Wt as T,Y as E,_t as D,at as O,bt as k,ct as A,dt as j,et as M,gt as ee,ht as N,it as P,mt as te,nt as ne,ot as re,pt as ie,q as F,qt as I,st as ae,tt as oe,ut as se,vt as ce,wt as le,yt as ue,z as L,zt as R}from"./angular-preview-Cqoe2qDv.js";import{$ as de,B as fe,F as pe,G as me,H as z,J as he,K as ge,L as _e,M as B,Q as ve,U as ye,V as be,W as xe,X as Se,Y as Ce,Z as we,i as Te,j as V,q as Ee,r as De,v as Oe,y as ke,z as Ae}from"./angular-preview-BuE164iF.js";import{C as je,G as Me,H as Ne,O as Pe,R as Fe,S as Ie,V as Le,b as Re,v as ze,w as Be,x as Ve}from"./angular-preview-CHdKY9M8.js";import{l as He,n as Ue,t as We,u as Ge}from"./DocPage-CmI5o3x2.js";var H,Ke,qe,Je,U,Ye,W,Xe,G,Ze,Qe;function $e(){return($e=e((()=>{_(),R(),Le(),x(),N(),oe(),ye(),F(),p(),C(),Be(),Re(),H=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),Ke=6,qe=10,Je=320,U=20,Ye=e=>{let t=e.options,n=e.theme,r=Pe(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},u=!1,p=0,m=0,g=[],_=[],v=null,y=!0,b=``,x=!1,S=null,C=new Map,w=null,T={time:0,x:0,y:0},M=(e,t)=>{o[e]?.forEach(e=>e(t))},N=()=>{y=!0,x||e.onInvalidate?.()},te=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1}},F=(t,n=r.fontSize,i=400)=>e.measureText(t,P(r,n,i)),I=()=>{s=A(t,r,a,i);let{base:e,minSpan:n}=s;u?(c={x:s.zoom.x?ze(c.x,e.x,n.x):[...e.x],y:s.zoom.y?ze(c.y,e.y,n.y):[...e.y]},u=!Ie(c.x,e.x)||!Ie(c.y,e.y)):c=H(e),g=Ce(t.annotations,r,s.y.type===`log`?Math.log10:void 0,s.x.type===`log`?Math.log10:void 0),_=ge(t.dependencies,r),S&&(S.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||z(null)),N()},oe=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!we(e,s,n))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=Ae(s);if(a){let e=a.labels[0]?.text??``,t=a.labels[a.labels.length-1]?.text??``,n=Math.max(60,Math.min(160,p*.32)),r=p-4-F(t,11)-8,o=r-n,s=(i===`bottom`?m-U:0)+U/2;return{entries:[],colors:{bar:{x:o,y:s-4,width:n,height:8},stops:a.stops,labels:[{text:e,x:o-8,y:s,align:`right`},{text:t,x:r+8,y:s,align:`left`}],ticks:a.labels.filter(e=>e.at>0&&e.at<1).map(e=>o+e.at*n),caret:null},position:i,toggle:!1,height:26}}let o=[],c=4,l=0;for(let e of s.series){let t=14+F(e.name,12)+8;c+t>p-4&&c>4&&(c=4,l++),o.push({id:e.id,name:e.name,color:e.colorCss,shape:fe(e.type),hidden:e.hidden,box:{x:c,y:l*U,width:t,height:U}}),c+=t+10}let u=(l+1)*U+6;if(i===`bottom`)for(let e of o)e.box.y+=m-u+6;return{entries:o,colors:null,position:i,toggle:r.toggle??!0,height:u}},le=(e,n,r,i)=>{let a=t.tooltip;if(a===!1)return null;let o=typeof a==`object`?a.render:void 0,c=null;if(o){let t=o(e);if(t===null||t===``)return null;typeof t==`string`&&(c=t.split(`
`))}let l=_e(s,e,v?.layout.yTicks??null,v?.layout.y2Ticks??null),u=0,d,f=l.rows.some(e=>e.color)?14:0;if(c){for(let e of c)u=Math.max(u,F(e,12));d=c.length}else{u=F(l.title,12,600)+(l.titleColor?14:0),l.subtitle&&(u=Math.max(u,F(l.subtitle,11)+(l.titleColor?14:0)));let e=0,t=0;for(let n of l.rows)e=Math.max(e,F(n.name,12)),t=Math.max(t,F(n.value,12,600));l.rows.length&&(u=Math.max(u,f+e+16+t)),d=1+ +!!l.subtitle+l.rows.length}let g=Math.ceil(Math.max(u,96)+16+4),_=d*18+16,{x:y,y:b}=Fe({anchor:{x:n,y:r},avoid:h(s,i,e),obstacles:E(s,i),size:{width:g,height:_},stage:{width:p,height:m},prefer:i.horizontal?`vertical`:`side`});return{content:l,text:c,box:{x:y,y:b,width:g,height:_},lineHeight:18,padding:8,swatchWidth:f}},ue=()=>{if(p<=0||m<=0)return null;let e=oe(),n=e?.position===`top`?e.height:0,i=Se({model:s,view:c,theme:r,width:p,height:m-(e?.height??0),padding:t.padding,top:n,measure:e=>F(e)}),a=he(s,c,i.scales,i.yTicks,r.background),o=[],u=r.fontSize+4;for(let e of g){if(e.type===`text`&&e.text){o.push(O(e,i.scales,F(e.text,r.fontSize,e.weight),u));continue}if(e.type!==`rect`)continue;let t=ne(e,l(e,i.scales),r.fontSize,F);t&&o.push(t.box)}let d=re(a,i.plot,e=>F(e),u-2,o),f={width:p,height:m,theme:r,model:s,view:H(c),layout:i,annotations:g,pointLabels:d,legend:e,hover:null,dragging:null,connectors:Ee(s,i.scales),arrows:ve(s,i.scales,_)};if(v=f,S){let n=pe(s,i.scales,S.event,t.crosshair),r=i.scales.horizontal;f.hover={event:S.event,marks:de(s,i.scales,S.event),crosshairX:r?null:n,crosshairY:r?n:null,tooltip:w?.kind===`pan`||w?.kind===`point`?null:le(S.event,S.x,S.y,i.scales)};let a=e?.colors,o=S.event.items[0],c=o?s.series[o.seriesIndex]:void 0;a&&o&&c?.type===`heatmap`&&o.value!==void 0&&(a.caret=a.bar.x+ce(c,o.value)*a.bar.width)}if(w?.kind===`point`){let e=s.series[w.item.seriesIndex];f.dragging={x:w.x,y:w.y,color:w.item.color,size:(e?xe(e,w.item.index):8)+6}}let h=i.plot,y=`${h.x},${h.y},${h.width},${h.height}`;return y!==b&&(b=y,M(`layout`,{...h})),f},L=()=>((y||!v)&&(y=!1,v=ue()),v),R=()=>L()?.layout.scales??null,z=e=>{let t=!me(S?.event??null,e?.event??null);S=e,N(),t&&M(`hover`,e?e.event:null)},B=(e,t,n)=>{let r=R();return r?be(s,r,v?.layout.xTicks??null,e,t,n?8:0):null},ye=(e,t)=>{let n=R()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},Te=(e,t)=>{let n=R();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t)),o=d(n,i,a);return{x:se(s,o.x),y:ae(s,o.y)}},V=(e,t)=>{let{base:n,minSpan:r}=s;c={x:ze(e.x,n.x,r.x),y:ze(e.y,n.y,r.y)},u=!Ie(c.x,n.x)||!Ie(c.y,n.y),t&&M(`zoom`,j(s,c)),N()},De=(e,t,n)=>{let r=R();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=H(c),a=d(r,e,t);s.zoom.x&&(i.x=je(c.x,a.x,n)),s.zoom.y&&(i.y=je(c.y,a.y,n)),V(i,!0)},Oe=()=>{u&&V(H(s.base),!0)},ke=(e,t)=>L()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,Me=e=>{a.has(e)?a.delete(e):a.add(e),I()},Ne=()=>{let[e,t]=[...C.values()];w={kind:`pinch`,view:H(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},z(null)};return s=A(t,r,a,i),I(),{setOptions(e){if(x)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=Pe(n,t.palette)),I()},setTheme(e){x||(n=e,r=Pe(n,t.palette),I())},setSize(e,t){(e!==p||t!==m)&&(p=Math.max(0,e),m=Math.max(0,t),N())},getScene:L,pointerDown:(e,t,n={})=>{if(x)return;let r=n.id??0,i=!!n.touch;C.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=te();if(C.size===2){a&&(s.zoom.x||s.zoom.y)&&w?.kind!==`point`&&Ne();return}if(C.size>2||!a){if(!a&&i){let n=B(e,t,!0);z(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=B(e,t,i)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){w={kind:`point`,item:n,x:e,y:t};return}}if(u&&a.pan&&ye(e,t)){w={kind:`pan`,view:H(c),x:e,y:t};return}if(w=null,i){let n=B(e,t,!0);z(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(x)return;let r=n.id??0,i=C.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?qe:Ke)&&(i.moved=!0)),w?.kind===`pinch`&&C.size>=2){let[e,t]=[...C.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=R();if(!a)return;let o=k(a.plot,w.view,s.x.reverse,s.y.reverse,s.horizontal),c=w.distance/n,l=H(w.view),u=d(o,w.midX,w.midY),f=d(o,r,i);s.zoom.x&&(l.x=je(w.view.x,u.x,c),l.x=Ve(l.x,(u.x-f.x)*c)),s.zoom.y&&(l.y=je(w.view.y,u.y,c),l.y=Ve(l.y,(u.y-f.y)*c)),V(l,!0);return}if(w?.kind===`point`&&i){if(!i.moved)return;w.x=e,w.y=t;let n=Te(e,t);N(),n&&M(`drag`,{item:w.item,x:n.x,y:n.y});return}if(w?.kind===`pan`&&i){if(!i.moved)return;let n=R();if(!n)return;let r=H(w.view),a=d(n,w.x,w.y),o=d(n,e,t);s.zoom.x&&(r.x=Ve(w.view.x,a.x-o.x)),s.zoom.y&&(r.y=Ve(w.view.y,a.y-o.y)),V(r,!0);return}if(!(C.size>1)&&(!i||i.touch||!n.touch)){let r=B(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&z(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(x)return;let r=n.id??0,i=C.get(r);C.delete(r);let a=w;if(a?.kind===`pinch`){C.size<2&&(w=null);return}if(w=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=Te(e,t);N(),n&&M(`drop`,{item:a.item,x:n.x,y:n.y});return}}else if(a?.kind===`pan`&&i.moved){N();return}if(i.moved){i.touch&&N();return}let o=Date.now();if(i.touch&&o-T.time<Je&&Math.hypot(e-T.x,t-T.y)<24&&u){T={time:0,x:e,y:t},Oe();return}T={time:o,x:e,y:t};let s=ke(e,t);if(s){L()?.legend?.toggle&&Me(s.id);return}let c=B(e,t,i.touch);if(c){i.touch&&z({event:c,x:e,y:t}),M(`click`,c);return}if(i.touch&&z(null),ye(e,t)){let n=Te(e,t);n&&M(`plotClick`,n)}},pointerCancel:(e={})=>{C.delete(e.id??0),(w?.kind===`point`||C.size<2)&&(w=null),N()},pointerLeave(){!w&&S&&z(null)},zoomAt:De,resetZoom:Oe,getView:()=>j(s,c),setView(e){x||V(ie(s,e,c),!1)},toggleSeries:Me,clearHover(){S&&z(null)},getPlotRect(){let e=L()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=R();return n?f(n,ee(s,e),D(s,t)):null},fromPixel(e,t){let n=R();if(!n)return null;let r=d(n,e,t);return{x:se(s,r.x),y:ae(s,r.y)}},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){x=!0,C.clear();for(let e of Object.keys(o))delete o[e]}}},W=(e,t,n,r)=>{if(!n)return[0,t];let[i,a]=r[0]<=r[1]?r:[r[1],r[0]];return[Math.max(0,I(e,t,i)-1),Math.min(t,I(e,t,a)+1)]},Xe={heatmap:0,area:1,bar:2,boxplot:2,candlestick:3,line:4,scatter:5},G=(e,t)=>{if(!e.horizontal)return t;let n=Array(t.length);for(let e=0;e<t.length;e+=4)n[e]=t[e+1],n[e+1]=t[e],n[e+2]=t[e+3],n[e+3]=t[e+2];return n},Ze=(e,t={})=>{let{model:n,view:r,layout:i}=e,a=i.scales,{plot:o}=i,s=a.horizontal,c=t.maxDots??4e3,l=t.maxBars??2e3,d=Math.max(1,t.columnWidth??1),p=s?o.y:o.x,m=p+(s?o.height:o.width),h=[],_=n.series.filter(e=>!e.hidden&&e.cols.count>0).sort((e,t)=>Xe[e.type]-Xe[t.type]||e.index-t.index);for(let e of _){let{x:i,y:_,count:y,sorted:b}=e.cols;if(e.type===`line`||e.type===`area`){let[t,o]=W(i,y,b,r.x),c=e.stackTop??_,l=g(i,c,t,o,e.curve),v=e.stackBase?g(i,e.stackBase,t,o,e.curve).points:null,x=l.length,S=l.points,C=v;if(b&&x>(m-p)*2/d){if(v){let e=u(S,0,x,e=>a.xToPx(e)/d),t=new Float64Array(e.length*2),n=new Float64Array(e.length*2),r=0,i=0;for(let a=0;a<e.length;a++){let o=e.points[a*2];for(;i<x-1&&S[i*2]<o;)i++;t[r*2]=o,t[r*2+1]=e.points[a*2+1],n[r*2]=o,n[r*2+1]=v[i*2+1],r++}S=t,C=n,x=r}else{let e=u(S,0,x,e=>a.xToPx(e)/d);S=e.points,x=e.length}}let w=e.type===`area`&&!!e.cols.y0&&!!C,T=[],E=[],D=[],O=[],k=[],A=[],j=()=>{O.length&&(T.push(O),E.push(k),w&&D.push(A)),O=[],k=[],A=[]};for(let e=0;e<x;e++){let t=S[e*2],n=S[e*2+1],r=C?C[e*2+1]:0;if(!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(r)){j();continue}let i=f(a,t,n);if(O.push(i.x,i.y),C&&k.push(a.yToPx(r)),w){let e=f(a,t,r);A.push(e.x,e.y)}}if(j(),e.type===`area`&&h.push({kind:`area`,seriesIndex:e.index,color:e.colorCss,opacity:e.opacity,baseline:a.yToPx(n.baseline),segments:T,...C?{bottoms:E}:{},...s?{horizontal:!0}:{}}),e.lineWidth>0){let t=e.type===`area`?Math.min(e.lineWidth,2):e.lineWidth;h.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:T}),w&&h.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:D})}continue}if(e.type===`bar`&&e.barBase&&e.barTop){let[t,n]=W(i,y,b,r.x),o=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),.5),s=[],c=[],u=n-t>l,d=NaN;for(let r=t;r<n;r++){let t=e.barBase[r],n=e.barTop[r];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let l=a.xToPx(i[r]+e.barOffset);if(l+o<p||l-o>m)continue;let f=a.yToPx(t),h=a.yToPx(n),g=Math.min(f,h),_=Math.max(1,Math.abs(f-h)),y=Math.floor(l);if(u&&y===d&&s.length){let e=s.length-4,t=Math.max(s[e+1]+s[e+3],g+_);s[e+1]=Math.min(s[e+1],g),s[e+3]=t-s[e+1];continue}d=y,s.push(l-o,g,o*2,_);let b=e.pointColors?.[r];c.push(e.cols.opacities?v(b??e.color,te(e,r)):b?v(b):e.colorCss)}h.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:G(a,s),...e.pointColors||e.cols.opacities?{colors:c}:{},radius:e.radius,...e.opacity<1&&!e.cols.opacities?{opacity:e.opacity}:{}});continue}if(e.type===`boxplot`){h.push(...Qe(e,a,r.x,p,m,l));continue}if(e.type===`candlestick`){let[t,n]=W(i,y,b,r.x),{open:o,high:s,low:c}=e.cols,u=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),1),d=v(e.upColor),f=v(e.downColor),g=[],x=[],S=[],C=[],w=Math.max(1,Math.ceil((n-t)/l));for(let e=t;e<n;e+=w){let t=_[e],n=o?o[e]:t;if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=a.xToPx(i[e]);if(r+u<p||r-u>m)continue;let l=t<n?f:d,h=a.yToPx(s?s[e]:Math.max(n,t)),v=a.yToPx(c?c[e]:Math.min(n,t));g.push(r-.5,Math.min(h,v),1,Math.abs(v-h)),S.push(l);let y=a.yToPx(n),b=a.yToPx(t);x.push(r-u,Math.min(y,b),u*2,Math.max(1,Math.abs(y-b))),C.push(l)}h.push({kind:`bars`,seriesIndex:e.index,color:d,rects:G(a,g),colors:S},{kind:`bars`,seriesIndex:e.index,color:d,rects:G(a,x),colors:C,radius:1});continue}if(e.type===`heatmap`){let t=Math.abs(e.cellHalf.x/a.xPerPx),n=Math.abs(e.cellHalf.y/a.yPerPx),r=[],s=[],c=le(t*2,n*2,e.radius),u=c.inset;for(let c=0;c<y&&r.length/4<l*4;c++){let l=e.cellColors?.[c];if(!l)continue;let d=ue(a,a.xToPx(i[c])-t,a.xToPx(i[c])+t,a.yToPx(_[c])-n,a.yToPx(_[c])+n);d.x+d.width<o.x||d.x>o.x+o.width||d.y+d.height<o.y||d.y>o.y+o.height||(r.push(d.x+u,d.y+u,d.width-u*2,d.height-u*2),s.push(v(T(l))))}h.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:r,colors:s,radius:c.radius});continue}let x=[],S=[],C=t=>{let n=e.pointColors?.[t];return n?v(n):e.colorCss},w=[],E=[];for(let e=0;e<y;e++){let t=i[e],n=_[e];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=f(a,t,n);r.x<o.x||r.x>o.x+o.width||r.y<o.y||r.y>o.y+o.height||(w.push(e),E.push(r.x,r.y))}if(w.length>c){let n=Math.max(2,t.dotCell??e.pointSize*.8),r=Math.ceil(o.width/n)+1,i=new Map;w.forEach((e,t)=>{let a=Math.floor((E[t*2]-o.x)/n),s=Math.floor((E[t*2+1]-o.y)/n);i.set(s*r+a,e)});for(let[e,t]of i)x.push(o.x+(e%r+.5)*n,o.y+(Math.floor(e/r)+.5)*n,n),S.push(C(t))}else w.forEach((t,n)=>{x.push(E[n*2],E[n*2+1],xe(e,t)),S.push(C(t))});h.push({kind:`dots`,seriesIndex:e.index,opacity:e.opacity,dots:x,colors:S,...e.stroke===null?{}:{stroke:e.stroke}})}return h},Qe=(e,t,n,r,i,a)=>{let{x:o,y:s,count:c,sorted:l,high:u,low:d,q1:f,q3:p,outliers:m}=e.cols,[h,g]=W(o,c,l,n),_=Math.max(e.barHalfWidth/Math.abs(t.xPerPx),1),y=Math.max(1,e.lineWidth),b=[],x=[],S=[],C=[],w=[],T=[],E=Math.max(1,Math.ceil((g-h)/a)),D=(e,t,n)=>{x.push(e-y/2,Math.min(t,n),y,Math.abs(t-n))},O=(e,t,n,r=y)=>{x.push(e-t,n-r/2,t*2,r)};for(let n=h;n<g;n+=E){let a=s[n];if(!Number.isFinite(a))continue;let c=t.xToPx(o[n]+e.barOffset);if(c+_<r||c-_>i)continue;let l=e.pointColors?.[n],h=l?v(l):e.colorCss,g=t.yToPx(d&&Number.isFinite(d[n])?d[n]:a),E=t.yToPx(u&&Number.isFinite(u[n])?u[n]:a),k=t.yToPx(f&&Number.isFinite(f[n])?f[n]:a),A=t.yToPx(p&&Number.isFinite(p[n])?p[n]:a),j=x.length;b.push(c-_,Math.min(k,A),_*2,Math.abs(k-A)),S.push(h),D(c,g,k),D(c,A,E),D(c-_,k,A),D(c+_,k,A),O(c,_/2,g),O(c,_/2,E),O(c,_,k),O(c,_,A),O(c,_,t.yToPx(a),Math.max(2,y*1.6));for(let e=j;e<x.length;e+=4)C.push(h);let M=m?.[n];if(M)for(let n of M){let r=t.horizontal?{x:t.yToPx(n),y:c}:{x:c,y:t.yToPx(n)};w.push(r.x,r.y,e.outlierSize),T.push(h)}}let k=[{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:G(t,b),colors:S,opacity:e.opacity},{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:G(t,x),colors:C}];return w.length&&k.push({kind:`dots`,seriesIndex:e.index,opacity:e.outlierShape===`hollow`?0:.85,dots:w,colors:T,stroke:1.25}),k}})))()}var et,K,tt,nt,rt,q,it,at,ot,st;function ct(){return(ct=e((()=>{R(),Le(),oe(),ye(),m(),B(),Oe(),$e(),et=e=>(e[0]+e[1])/2,K=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},tt=(e,t,n)=>{e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip(),e.lineJoin=`round`,e.lineCap=`round`;for(let n of t)if(n.kind===`area`)e.globalAlpha=n.opacity,e.fillStyle=n.color,n.segments.forEach((t,r)=>{let i=n.bottoms?.[r],a=t.length/2;if(!(a<2)){e.beginPath();for(let n=0;n<a;n++)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n*2],t[n*2+1]);for(let r=a-1;r>=0;r--){let a=i?i[r]:n.baseline;n.horizontal?e.lineTo(a,t[r*2+1]):e.lineTo(t[r*2],a)}e.closePath(),e.fill()}}),e.globalAlpha=1;else if(n.kind===`line`){e.strokeStyle=n.color,e.lineWidth=n.width,e.beginPath();for(let t of n.segments)for(let n=0;n<t.length;n+=2)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n],t[n+1]);e.stroke()}else if(n.kind===`bars`){e.globalAlpha=n.opacity??1;let t=n.radius??0;for(let r=0;r<n.rects.length;r+=4){let[i,a,o,s]=[n.rects[r],n.rects[r+1],n.rects[r+2],n.rects[r+3]];e.fillStyle=n.colors?.[r/4]??n.color;let c=Math.min(t,o/2,s/2);c>.5?(K(e,i,a,o,s,c),e.fill()):e.fillRect(i,a,o,s)}e.globalAlpha=1}else{let t=n.stroke??0;for(let r=0;r<n.dots.length;r+=3){let i=n.colors[r/3]??`#888`,a=n.dots[r+2]/2;e.beginPath(),e.arc(n.dots[r],n.dots[r+1],Math.max(0,a-t/2),0,Math.PI*2),n.opacity>0&&(e.globalAlpha=n.opacity,e.fillStyle=i,e.fill()),t>0&&(e.globalAlpha=1,e.lineWidth=t,e.strokeStyle=i,e.stroke())}e.globalAlpha=1}e.restore()},nt=(e,t,n)=>{let{theme:r}=n,{bar:i,stops:a}=t,o=a.length;if(typeof e.createLinearGradient==`function`){let t=e.createLinearGradient(i.x,0,i.x+i.width,0);a.forEach((e,n)=>t.addColorStop(n/Math.max(1,o-1),e)),e.fillStyle=t,K(e,i.x,i.y,i.width,i.height,i.height/2),e.fill()}else{let t=i.width/o;a.forEach((n,r)=>{e.fillStyle=n,e.fillRect(i.x+r*t,i.y,t+.5,i.height)})}e.fillStyle=v(r.text,.35);for(let n of t.ticks)e.fillRect(Math.round(n),i.y-2,1,i.height+4);e.font=P(r,11),e.textBaseline=`middle`,e.fillStyle=v(r.textMuted);for(let n of t.labels)e.textAlign=n.align,e.fillText(n.text,n.x,n.y);t.caret!==null&&(K(e,t.caret-2,i.y-3,4,i.height+6,2),e.fillStyle=v(r.text),e.fill(),e.lineWidth=1.5,e.strokeStyle=v(r.background),e.stroke())},rt=1.16,q=(e,t,n,r)=>{let i=Math.max(0,t.width+r*2),a=Math.max(0,t.height+r*2);K(e,t.x-r,t.y-r,i,a,Math.max(0,Math.min(n+r,i/2,a/2)))},it=(e,t,n,r,i,a,o,s,c)=>{let l=v(c.background);a?(e.save(),e.shadowColor=`rgba(15, 23, 42, 0.4)`,e.shadowBlur=14,e.shadowOffsetY=5,q(e,t,n,o+(s?.width??0)),e.fillStyle=s?s.color:l,e.fill(),e.restore(),s&&(q(e,t,n,o),e.fillStyle=l,e.fill())):i&&(q(e,t,n,0),e.fillStyle=l,e.fill()),q(e,t,n,0),e.fillStyle=r,e.fill(),a&&a.width>0&&(q(e,t,n,-a.width/2),e.lineWidth=a.width,e.strokeStyle=a.color,e.stroke())},at=(e,t,n,r)=>{for(let i of t)if(i.kind===`bar`){let t=z(i);e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip();let a=i.ring===null?null:{color:i.ring,width:Math.min(i.backdrop?2:1.5,Math.max(0,(Math.min(t.width,t.height)-2)/4))};it(e,t,i.radius,i.color,i.backdrop,a,1.5,null,r),e.restore()}else if(i.kind===`cell`){let t=i.width*rt,n=i.height*rt;it(e,{x:i.x+(i.width-t)/2,y:i.y+(i.height-n)/2,width:t,height:n},Math.max(2,i.radius)*rt,i.color,!1,{color:i.ring,width:Math.min(2,Math.min(t,n)/5)},2,{color:v(r.primary,.6),width:1.5},r)}},ot=(e,t,n,r,i,a=V(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),M(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,y2:l.y2,y2Ticks:d.y2Ticks,theme:c,annotations:t.annotations});let h=t.legend?.colors;if(h&&nt(e,h,t),t.legend){e.font=P(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=v(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}let g=t.hover?.marks.some(e=>e.kind===`bar`)??!1;for(let n of t.hover?.marks??[])n.kind===`band`&&(K(e,n.x,n.y,n.width,n.height,6),e.fillStyle=v(c.text,g?.04:.06),e.fill());p.horizontal?tt(e,Ze(t),f):_();function _(){let e=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[t,i]=e(u.x,r.x,l.x.reverse),[o,s]=e(u.y,r.y,l.y.reverse);a.paint(n,{transform:{xScale:t,xOffset:i,yScale:o,yOffset:s},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m))}e.setTransform(m,0,0,m,0,0);for(let n of t.hover?.marks??[])n.kind===`guide`&&(e.fillStyle=v(c.text,.06),e.fillRect(n.x,n.y,n.width,n.height));if(g&&(e.fillStyle=v(c.background,.42),e.fillRect(f.x,f.y,f.width,f.height)),t.hover&&at(e,t.hover.marks,f,c),y(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1,connectors:t.connectors,arrows:t.arrows}),t.pointLabels.length){e.save(),e.font=P(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=v(c.background,.9),e.fillStyle=v(c.text,.85);for(let{label:n,box:r}of t.pointLabels){let t=r.y+r.height/2;if(n.color){e.save(),e.fillStyle=n.color,e.fillText(n.text,r.x,t),e.restore();continue}e.strokeText(n.text,r.x,t),e.fillText(n.text,r.x,t)}e.restore()}let b=t.hover;if(b){if(b.crosshairX!==null){e.save(),e.strokeStyle=v(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(b.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}if(b.crosshairY!==null){e.save(),e.strokeStyle=v(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(b.crosshairY)+.5;e.moveTo(f.x,t),e.lineTo(f.x+f.width,t),e.stroke(),e.restore()}for(let t of b.marks)t.kind!==`band`&&t.kind!==`guide`&&t.kind!==`bar`&&t.kind!==`cell`&&(e.beginPath(),e.arc(t.x,t.y,t.size/2+4,0,Math.PI*2),e.fillStyle=t.halo,e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=v(c.background),e.stroke())}if(t.dragging){let n=t.dragging;e.beginPath(),e.arc(n.x,n.y,n.size/2,0,Math.PI*2),e.fillStyle=n.color,e.globalAlpha=.85,e.fill(),e.globalAlpha=1,e.lineWidth=2,e.strokeStyle=v(c.background),e.stroke()}let x=b?.tooltip;if(x){let{box:t,lineHeight:n,padding:r}=x,i=Ne(c,Me);e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,K(e,t.x,t.y,t.width,t.height,8),e.fillStyle=i.background,e.fill(),e.restore(),K(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=i.border,e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let a=t.y+r+n/2,o=t.x+r+2,s=t.x+t.width-r-2;if(x.text){e.font=P(c,12),e.fillStyle=v(c.text),e.textAlign=`left`;for(let t of x.text)e.fillText(t,o,a),a+=n}else{let{content:t}=x,r=o;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,a,4,0,Math.PI*2),e.fill(),r+=14),e.font=P(c,12,600),e.fillStyle=v(c.text),e.textAlign=`left`,e.fillText(t.title,r,a),a+=n,t.subtitle&&(e.font=P(c,11),e.fillStyle=v(c.textMuted),e.fillText(t.subtitle,r,a-2),a+=n);for(let i of t.rows)r=o,i.color&&(e.fillStyle=i.color,e.beginPath(),e.arc(r+4,a,4,0,Math.PI*2),e.fill()),r+=x.swatchWidth,e.font=P(c,12),e.textAlign=`left`,e.fillStyle=v(c.textMuted),e.fillText(i.name,r,a),e.font=P(c,12,600),e.textAlign=`right`,e.fillStyle=v(c.text),e.fillText(i.value,s,a),a+=n}}},st=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u=``,d=``,f=e.options,p=new WeakMap,m=0,h=e=>{let t=p.get(e);return t===void 0&&p.set(e,t=++m),t},g={x:0,y:0},_=0,v=``,y=(e,t)=>n?(t!==v&&(n.font=t,v=t),n.measureText(e).width):e.length*6.5,b=n?V(n):null,x=globalThis,C=()=>{if(s=null,o||!n||!b)return;let e=E.getScene();if(!e)return;let p=Math.max(1,Math.round(r*a)),m=Math.max(1,Math.round(i*a));t.width!==p&&(t.width=p),t.height!==m&&(t.height=m),v=``,l!==e.model&&(l=e.model,u=ke(e.model,h(e.theme),e=>f.series[e]?.stack));let y=e.layout.scales,x={x:1/Math.abs(y.xPerPx),y:1/Math.abs(y.yPerPx)},C=`${u}|${S(e.model,x)}`;C!==d&&(d=C,g={x:et(e.model.base.x),y:et(e.model.base.y)},c=w(e.model,g,++_,x)),ot(n,e,c,g,a,b),v=``},T=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(C):x.requestAnimationFrame?x.requestAnimationFrame(C):setTimeout(C,16))},E=Ye({options:e.options,theme:e.theme,measureText:y,onInvalidate:T});E.setSize(r,i);let D=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>{f=e,E.setOptions(e)},setTheme:e=>E.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),E.setSize(e,t),T()},render(){s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),C()},touchStart(e){e.forEach((e,t)=>E.pointerDown(e.x,e.y,D(e,t)))},touchMove(e){e.forEach((e,t)=>E.pointerMove(e.x,e.y,D(e,t)))},touchEnd(e){e.forEach((e,t)=>E.pointerUp(e.x,e.y,D(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>E.pointerCancel(D(e,t)))},pointerDown:(e,t,n)=>E.pointerDown(e,t,n),pointerMove:(e,t,n)=>E.pointerMove(e,t,n),pointerUp:(e,t,n)=>E.pointerUp(e,t,n),pointerLeave:()=>E.pointerLeave(),zoomAt:(e,t,n)=>E.zoomAt(e,t,n),resetZoom:()=>E.resetZoom(),getView:()=>E.getView(),setView:e=>E.setView(e),toggleSeries:e=>E.toggleSeries(e),clearHover:()=>E.clearHover(),getPlotRect:()=>E.getPlotRect(),toPixel:(e,t)=>E.toPixel(e,t),fromPixel:(e,t)=>E.fromPixel(e,t),getController:()=>E,on:(e,t)=>E.on(e,t),destroy(){o||(o=!0,s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),b?.destroy(),E.destroy())}}}})))()}function lt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,J.useRef)(null),[a,o]=(0,J.useState)(`…`),[s,c]=(0,J.useState)(null),l=new Intl.NumberFormat(n,{notation:`compact`});(0,J.useEffect)(()=>{let t=i.current;if(!t)return;let r=new Intl.NumberFormat(n,{notation:`compact`}),a=b(t,{series:[{name:e(`downloads`),type:`bar`,data:dt.map((e,t)=>[e,ft[t]])}],yAxis:{format:e=>r.format(e)},ariaLabel:e(`downloadsAria`)}),s=!0;a.ready.then(t=>{s&&o(t??e(`unsupported`))});let l=a.on(`click`,c);return()=>{s=!1,l(),a.destroy()}},[e,n]);let u=s?.items[0],d=s&&u?e(`downloadsStatus`,{release:s.xLabel,downloads:l.format(u.y)}):e(`clickBar`);return(0,ut.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,ut.jsx)(`div`,{ref:i,style:{height:300}}),(0,ut.jsxs)(`p`,{role:`status`,children:[e(`rendererLabel`,{renderer:a}),` · `,d]})]})}var J,ut,dt,ft;function pt(){return(pt=e((()=>{J=t(),i(),L(),ut=n(),dt=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],ft=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function mt(){let e=(0,Y.useRef)(null),t=(0,Y.useRef)(null),{t:n,i18n:i}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),a=i.language,[o,s]=(0,Y.useState)(null);(0,Y.useEffect)(()=>{let r=e.current;if(!r)return;let i=new Intl.DateTimeFormat(a,{month:`short`}),o=gt.map((e,t)=>i.format(new Date(2026,t,1))),c=new Intl.NumberFormat(a,{notation:`compact`}),l=()=>r.getBoundingClientRect(),u=st({canvas:r,width:l().width,height:l().height,pixelRatio:window.devicePixelRatio||1,theme:yt(r),options:{series:[{name:n(`visits`),type:`area`,data:o.map((e,t)=>[e,gt[t]])},{name:n(`signupsTimes10`),type:`line`,data:o.map((e,t)=>[e,_t[t]*10])}],yAxis:{format:e=>c.format(e)},crosshair:!0,ariaLabel:n(`visitsAria`)}});t.current=u;let d=u.on(`click`,e=>{let t=e.items[0];t&&s(`${e.xLabel}: ${c.format(t.y)} (${t.seriesName})`)}),f=u.on(`plotClick`,()=>s(null)),p=new ResizeObserver(()=>{let{width:e,height:t}=l();u.resize(e,t,window.devicePixelRatio||1)});p.observe(r);let m=new MutationObserver(()=>u.setTheme(yt(r)));return m.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{d(),f(),p.disconnect(),m.disconnect(),u.destroy(),t.current=null}},[n,a]);let c=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,ht.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,ht.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":n(`visitsAria`),style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...c(e)),onPointerMove:e=>t.current?.pointerMove(...c(e)),onPointerUp:e=>t.current?.pointerUp(...c(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,ht.jsx)(`p`,{role:`status`,children:o??n(`clickPoint`)})]})}var Y,ht,gt,_t,vt,yt;function bt(){return(bt=e((()=>{Y=t(),i(),ct(),ht=n(),gt=[4200,5100,4800,6900,7400,8800,8100,9600],_t=[310,420,380,560,610,790,720,880],vt=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],yt=e=>{let t=getComputedStyle(e),n={};for(let e of vt){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function xt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,X.useRef)(null),a=(0,X.useRef)(null),[s,c]=(0,X.useState)(`pie`),[l,u]=(0,X.useState)(null),d=(0,X.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),p=(0,X.useMemo)(()=>{let t=new Intl.NumberFormat(n,{notation:`compact`}),r=St.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),i={format:e=>d.format(e),percentFormat:e=>f.format(e)};return{pie:{type:`pie`,data:r,ariaLabel:e(`sourcesAria`),...i},donut:{type:`pie`,data:r,innerRadius:.62,padAngle:2,cornerRadius:4,centerValue:t.format(9800),centerLabel:e(`visitsLabel`),labels:`none`,ariaLabel:e(`sourcesAria`),...i},funnel:{type:`funnel`,data:Ct.map(({key:t,value:n})=>({name:e(`stages.${t}`),value:n})),ariaLabel:e(`funnelAria`),...i}}},[e,n,d,f]),m=(0,X.useRef)(p);(0,X.useEffect)(()=>{m.current=p}),(0,X.useEffect)(()=>{let e=i.current;if(!e)return;let t=De(e,m.current.pie);a.current=t;let n=t.on(`click`,u);return()=>{n(),t.destroy(),a.current=null}},[]),(0,X.useEffect)(()=>{a.current?.setOptions(p[s])},[p,s]);let h=e=>{c(e),u(null)};return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(`div`,{style:{display:`flex`,gap:8},children:wt.map(t=>(0,Z.jsx)(o,{size:`small`,variant:s===t?`solid`:`outline`,"aria-pressed":s===t,onClick:()=>h(t),children:e(`views.${t}`)},t))}),(0,Z.jsx)(`div`,{ref:i,style:{height:300}}),(0,Z.jsx)(`p`,{role:`status`,children:l?e(`picked`,{name:l.name,value:d.format(l.value),share:f.format(l.percent)}):e(`clickShape`)})]})}var X,Z,St,Ct,wt;function Tt(){return(Tt=e((()=>{X=t(),i(),a(),Te(),Z=n(),St=[{key:`search`,value:4200},{key:`direct`,value:2600},{key:`social`,value:1500},{key:`email`,value:900},{key:`referral`,value:600}],Ct=[{key:`visits`,value:9800},{key:`signups`,value:3100},{key:`trials`,value:1400},{key:`customers`,value:520}],wt=[`pie`,`donut`,`funnel`]})))()}function Et(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Dt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,Q.useRef)(null),a=(0,Q.useRef)(null),s=(0,Q.useRef)([]),c=(0,Q.useRef)(Et(17)),[l,u]=(0,Q.useState)(!1),[d,f]=(0,Q.useState)(0),p=(0,Q.useRef)(null);(0,Q.useEffect)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`}),r={cpu:e(`cpu`),seconds:e(`seconds`),aria:e(`cpuAria`),percent:e=>t.format(e/100)};p.current=r,a.current?.setOptions(jt(s.current,r))},[e,n]),(0,Q.useEffect)(()=>{let e=i.current;if(!e)return;let t=Et(17);c.current=t;let n=[];for(let e=0;e<20;e++)n.push(At(t,n[e-1]));s.current=n;let r=b(e,jt(n,p.current??kt));return a.current=r,f(n.length),()=>{r.destroy(),a.current=null}},[]),(0,Q.useEffect)(()=>{if(l)return;let e=setInterval(()=>{let e=s.current,t=[...e.slice(-119),At(c.current,e[e.length-1])];s.current=t,a.current?.setOptions(jt(t,p.current??kt)),f(e=>e+1)},500);return()=>clearInterval(e)},[l]);let m=new Intl.NumberFormat(n);return(0,Ot.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Ot.jsx)(`div`,{ref:i,style:{height:300,width:`100%`}}),(0,Ot.jsx)(o,{variant:`outline`,onClick:()=>u(e=>!e),children:e(l?`resume`:`pause`)}),(0,Ot.jsx)(`p`,{role:`status`,children:e(l?`pausedStatus`:`streamingStatus`,{points:m.format(d)})})]})}var Q,Ot,kt,At,jt;function Mt(){return(Mt=e((()=>{Q=t(),i(),a(),L(),Ot=n(),kt={cpu:``,seconds:``,aria:``,percent:String},At=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},jt=(e,t)=>({series:[{name:t.cpu,type:`area`,data:e,opacity:.2}],xAxis:{title:t.seconds},yAxis:{min:0,max:100,format:t.percent},interaction:!1,ariaLabel:t.aria})})))()}var Nt;function Pt(){return(Pt=e((()=>{Nt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Ft;function It(){return(It=e((()=>{Ft=`import { useEffect, useRef, useState, type PointerEvent } from "react";
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
`})))()}var Lt;function Rt(){return(Rt=e((()=>{Lt=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var zt;function Bt(){return(Bt=e((()=>{zt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var $,Vt,Ht;function Ut(){return(Ut=e((()=>{pt(),bt(),Tt(),Mt(),Pt(),It(),Rt(),Bt(),t(),i(),Ue(),s(),Ge(),$=n(),Vt=He(Object.assign({"./demos/basic.tsx":lt,"./demos/canvas.tsx":mt,"./demos/shapes.tsx":xt,"./demos/streaming.tsx":Dt}),Object.assign({"./demos/basic.tsx":Nt,"./demos/canvas.tsx":Ft,"./demos/shapes.tsx":Lt,"./demos/streaming.tsx":zt})),Ht=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(We,{id:`chart-engine`,demos:Vt,intro:t})}})))()}Ut();export{Ht as default};