import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-C5fVvh8v.js";import{R as a,z as o}from"./ProgressIndicator-BJJnPlYO.js";import{i as s,r as c}from"./DemoBlock-jmT22g-c.js";import{$ as l,F as u,G as d,H as f,I as p,K as m,Q as h,R as g,U as _,V as v,W as y,X as b,Y as x,Z as S,at as C,ct as w,ft as T,it as E,lt as D,nt as O,rt as k,st as ee,tt as A,z as te}from"./angular-preview-D8NdiKv9.js";import{G as j,J as ne,M,W as N,X as re,Y as ie,Z as P,_ as F,at as I,ct as ae,dt as oe,et as se,ft as ce,g as L,it as le,j as ue,lt as de,nt as fe,ot as pe,rt as R,st as me,tt as he,ut as ge}from"./angular-preview-CMr5kbWj.js";import{F as z,H as _e,I as ve,J as ye,L as B,Y as V,_ as be,a as H,c as U,d as xe,f as Se,g as Ce,h as we,l as W,m as Te,o as Ee,p as De,s as Oe,u as ke,v as Ae}from"./angular-preview-D8FeuFaJ.js";import{B as je,C as Me,O as Ne,S as Pe,U as Fe,W as Ie,b as Le,q as Re,v as ze,w as Be,x as Ve}from"./angular-preview-oIIlwHQq.js";import{l as He,n as Ue,t as We,u as Ge}from"./DocPage-CgHHNgAO.js";var G,Ke,qe,Je,K,Ye,Xe,Ze,q,Qe,$e;function et(){return(et=e((()=>{ye(),B(),Fe(),ee(),h(),_(),I(),Ae(),Te(),Se(),U(),Be(),Le(),G=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),Ke=6,qe=10,Je=320,K=20,Ye=e=>{let t=e.options,n=e.theme,r=Ne(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},f=!1,h=0,_=0,x=[],S=[],E=null,D=!0,ee=``,j=!1,M=null,N=new Map,P=null,F={time:0,x:0,y:0},I=(e,t)=>{o[e]?.forEach(e=>e(t))},L=()=>{D=!0,j||e.onInvalidate?.()},ue=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1,dropTargets:n.dropTargets??!1,dragLabel:n.dragLabel??!0}},R=(t,n=r.fontSize,i=400)=>e.measureText(t,A(r,n,i)),z=()=>{s=p(t,r,a,i);let{base:e,minSpan:n}=s;f?(c={x:s.zoom.x?ze(c.x,e.x,n.x):[...e.x],y:s.zoom.y?ze(c.y,e.y,n.y):[...e.y]},f=!Pe(c.x,e.x)||!Pe(c.y,e.y)):c=G(e),x=le(t.annotations,r,s.y.type===`log`?Math.log10:void 0,s.x.type===`log`?Math.log10:void 0),S=pe(t.dependencies,r),M&&(M.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||H(null)),L()},_e=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!ge(e,s,n))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=se(s);if(a){let e=a.labels[0]?.text??``,t=a.labels[a.labels.length-1]?.text??``,n=Math.max(60,Math.min(160,h*.32)),r=h-4-R(t,11)-8,o=r-n,s=(i===`bottom`?_-K:0)+K/2;return{entries:[],colors:{bar:{x:o,y:s-4,width:n,height:8},stops:a.stops,labels:[{text:e,x:o-8,y:s,align:`right`},{text:t,x:r+8,y:s,align:`left`}],ticks:a.labels.filter(e=>e.at>0&&e.at<1).map(e=>o+e.at*n),caret:null},position:i,toggle:!1,height:26}}let o=[],c=4,l=0;for(let e of s.series){let t=14+R(e.name,12)+8;c+t>h-4&&c>4&&(c=4,l++),o.push({id:e.id,name:e.name,color:e.colorCss,shape:he(e.type),hidden:e.hidden,box:{x:c,y:l*K,width:t,height:K}}),c+=t+10}let u=(l+1)*K+6;if(i===`bottom`)for(let e of o)e.box.y+=_-u+6;return{entries:o,colors:null,position:i,toggle:r.toggle??!0,height:u}},ve=(e,n,r,i)=>{let a=t.tooltip;if(a===!1)return null;let o=typeof a==`object`?a.render:void 0,c=null;if(o){let t=o(e);if(t===null||t===``)return null;typeof t==`string`&&(c=t.split(`
`))}let l=re(s,e,E?.layout.yTicks??null,E?.layout.y2Ticks??null),u=0,d,f=l.rows.some(e=>e.color)?14:0;if(c){for(let e of c)u=Math.max(u,R(e,12));d=c.length}else{u=R(l.title,12,600)+(l.titleColor?14:0),l.subtitle&&(u=Math.max(u,R(l.subtitle,11)+(l.titleColor?14:0)));let e=0,t=0;for(let n of l.rows)e=Math.max(e,R(n.name,12)),t=Math.max(t,R(n.value,12,600));l.rows.length&&(u=Math.max(u,f+e+16+t)),d=1+ +!!l.subtitle+l.rows.length}let p=Math.ceil(Math.max(u,96)+16+4),m=d*18+16,{x:g,y:v}=je({anchor:{x:n,y:r},avoid:we(s,i,e),obstacles:Ce(s,i),size:{width:p,height:m},stage:{width:h,height:_},prefer:i.horizontal?`vertical`:`side`});return{content:l,text:c,box:{x:g,y:v,width:p,height:m},lineHeight:18,padding:8,swatchWidth:f}},ye=()=>{if(h<=0||_<=0)return null;let e=_e(),n=e?.position===`top`?e.height:0,i=de({model:s,view:c,theme:r,width:h,height:_-(e?.height??0),padding:t.padding,top:n,measure:e=>R(e)}),a=ie(s,c,i.scales,i.yTicks,r.background,P?.kind===`point`&&P.moved?P.item:null),o=[],u=r.fontSize+4;for(let e of x){if(e.type===`text`&&e.text){o.push(O(e,i.scales,R(e.text,r.fontSize,e.weight),u));continue}if(e.type!==`rect`)continue;let t=l(e,b(e,i.scales),r.fontSize,R);t&&o.push(t.box)}let d=k(a,i.plot,e=>R(e),u-2,o),f={width:h,height:_,theme:r,model:s,view:G(c),layout:i,annotations:x,pointLabels:d,legend:e,hover:null,dragging:null,connectors:me(s,i.scales),arrows:oe(s,i.scales,S)};if(E=f,M){let n=ne(s,i.scales,M.event,t.crosshair),r=i.scales.horizontal;f.hover={event:M.event,marks:ce(s,i.scales,M.event),crosshairX:r?null:n,crosshairY:r?n:null,tooltip:P?.kind===`pan`||P?.kind===`point`?null:ve(M.event,M.x,M.y,i.scales)};let a=e?.colors,o=M.event.items[0],c=o?s.series[o.seriesIndex]:void 0;a&&o&&c?.type===`heatmap`&&o.value!==void 0&&(a.caret=a.bar.x+m(c,o.value)*a.bar.width)}P?.kind===`point`&&P.moved&&(f.dragging=be(s,i.scales,x,P.item,P.x,P.y,!!ue()?.dropTargets),ue()?.dragLabel===!1&&(f.dragging.label=null));let p=i.plot,g=`${p.x},${p.y},${p.width},${p.height}`;return g!==ee&&(ee=g,I(`layout`,{...p})),f},B=()=>((D||!E)&&(D=!1,E=ye()),E),V=()=>B()?.layout.scales??null,H=e=>{let t=!fe(M?.event??null,e?.event??null);M=e,L(),t&&I(`hover`,e?e.event:null)},U=(e,t,n)=>{let r=V();return r?ae(s,r,E?.layout.xTicks??null,e,t,n?8:0):null},xe=(e,t)=>{let n=V()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},Se=(e,t)=>{let n=V();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t)),o=w(n,i,a);return{x:g(s,o.x),y:u(s,o.y)}},W=(e,t)=>{let{base:n,minSpan:r}=s;c={x:ze(e.x,n.x,r.x),y:ze(e.y,n.y,r.y)},f=!Pe(c.x,n.x)||!Pe(c.y,n.y),t&&I(`zoom`,te(s,c)),L()},Te=(e,t,n)=>{let r=V();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=G(c),a=w(r,e,t);s.zoom.x&&(i.x=Me(c.x,a.x,n)),s.zoom.y&&(i.y=Me(c.y,a.y,n)),W(i,!0)},Ee=()=>{f&&W(G(s.base),!0)},De=(e,t)=>B()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,Oe=e=>{a.has(e)?a.delete(e):a.add(e),z()},ke=()=>{let[e,t]=[...N.values()];P={kind:`pinch`,view:G(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},H(null)};return s=p(t,r,a,i),z(),{setOptions(e){if(j)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=Ne(n,t.palette)),z()},setTheme(e){j||(n=e,r=Ne(n,t.palette),z())},setSize(e,t){(e!==h||t!==_)&&(h=Math.max(0,e),_=Math.max(0,t),L())},getScene:B,pointerDown:(e,t,n={})=>{if(j)return;let r=n.id??0,i=!!n.touch;N.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=ue();if(N.size===2){a&&(s.zoom.x||s.zoom.y)&&P?.kind!==`point`&&ke();return}if(N.size>2||!a){if(!a&&i){let n=U(e,t,!0);H(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=U(e,t,i)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){P={kind:`point`,item:n,x:e,y:t,moved:!1};return}}if(f&&a.pan&&xe(e,t)){P={kind:`pan`,view:G(c),x:e,y:t};return}if(P=null,i){let n=U(e,t,!0);H(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(j)return;let r=n.id??0,i=N.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?qe:Ke)&&(i.moved=!0)),P?.kind===`pinch`&&N.size>=2){let[e,t]=[...N.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=V();if(!a)return;let o=C(a.plot,P.view,s.x.reverse,s.y.reverse,s.horizontal),c=P.distance/n,l=G(P.view),u=w(o,P.midX,P.midY),d=w(o,r,i);s.zoom.x&&(l.x=Me(P.view.x,u.x,c),l.x=Ve(l.x,(u.x-d.x)*c)),s.zoom.y&&(l.y=Me(P.view.y,u.y,c),l.y=Ve(l.y,(u.y-d.y)*c)),W(l,!0);return}if(P?.kind===`point`&&i){if(!i.moved)return;let n=P;if(n.x=e,n.y=t,!n.moved){n.moved=!0,M&&H(null);let e=Se(i.startX,i.startY);e&&I(`dragStart`,{item:n.item,x:e.x,y:e.y})}let r=Se(e,t);L(),r&&I(`drag`,{item:n.item,x:r.x,y:r.y});return}if(P?.kind===`pan`&&i){if(!i.moved)return;let n=V();if(!n)return;let r=G(P.view),a=w(n,P.x,P.y),o=w(n,e,t);s.zoom.x&&(r.x=Ve(P.view.x,a.x-o.x)),s.zoom.y&&(r.y=Ve(P.view.y,a.y-o.y)),W(r,!0);return}if(!(N.size>1)&&(!i||i.touch||!n.touch)){let r=U(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&H(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(j)return;let r=n.id??0,i=N.get(r);N.delete(r);let a=P;if(a?.kind===`pinch`){N.size<2&&(P=null);return}if(P=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=Se(e,t);L(),n&&I(`drop`,{item:a.item,x:n.x,y:n.y}),a.moved&&I(`dragEnd`,{item:a.item,cancelled:!n});return}}else if(a?.kind===`pan`&&i.moved){L();return}if(i.moved){i.touch&&L();return}let o=Date.now();if(i.touch&&o-F.time<Je&&Math.hypot(e-F.x,t-F.y)<24&&f){F={time:0,x:e,y:t},Ee();return}F={time:o,x:e,y:t};let s=De(e,t);if(s){B()?.legend?.toggle&&Oe(s.id);return}let c=U(e,t,i.touch);if(c){i.touch&&H({event:c,x:e,y:t}),I(`click`,c);return}if(i.touch&&H(null),xe(e,t)){let n=Se(e,t);n&&I(`plotClick`,n)}},pointerCancel:(e={})=>{N.delete(e.id??0);let t=P;(t?.kind===`point`||N.size<2)&&(P=null),L(),t?.kind===`point`&&t.moved&&I(`dragEnd`,{item:t.item,cancelled:!0})},pointerLeave(){!P&&M&&H(null)},zoomAt:Te,resetZoom:Ee,getView:()=>te(s,c),setView(e){j||W(v(s,e,c),!1)},toggleSeries:Oe,clearHover(){M&&H(null)},getPlotRect(){let e=B()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=V();return n?T(n,y(s,e),d(s,t)):null},fromPixel(e,t){let n=V();if(!n)return null;let r=w(n,e,t);return{x:g(s,r.x),y:u(s,r.y)}},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){j=!0,N.clear();for(let e of Object.keys(o))delete o[e]}}},Xe=(e,t,n,r)=>{if(!n)return[0,t];let[i,a]=r[0]<=r[1]?r:[r[1],r[0]];return[Math.max(0,V(e,t,i)-1),Math.min(t,V(e,t,a)+1)]},Ze={heatmap:0,area:1,bar:2,boxplot:2,candlestick:3,line:4,scatter:5},q=(e,t)=>{if(!e.horizontal)return t;let n=Array(t.length);for(let e=0;e<t.length;e+=4)n[e]=t[e+1],n[e+1]=t[e],n[e+2]=t[e+3],n[e+3]=t[e+2];return n},Qe=(e,t={})=>{let{model:n,view:r,layout:i}=e,a=i.scales,{plot:o}=i,s=a.horizontal,c=t.maxDots??4e3,l=t.maxBars??2e3,u=Math.max(1,t.columnWidth??1),d=s?o.y:o.x,p=d+(s?o.height:o.width),m=[],h=n.series.filter(e=>!e.hidden&&e.cols.count>0).sort((e,t)=>Ze[e.type]-Ze[t.type]||e.index-t.index);for(let e of h){let{x:i,y:h,count:g,sorted:_}=e.cols;if(e.type===`line`||e.type===`area`){let[t,o]=Xe(i,g,_,r.x),c=e.stackTop??h,l=De(i,c,t,o,e.curve),f=e.stackBase?De(i,e.stackBase,t,o,e.curve).points:null,v=l.length,y=l.points,b=f;if(_&&v>(p-d)*2/u){if(f){let e=Oe(y,0,v,e=>a.xToPx(e)/u),t=new Float64Array(e.length*2),n=new Float64Array(e.length*2),r=0,i=0;for(let a=0;a<e.length;a++){let o=e.points[a*2];for(;i<v-1&&y[i*2]<o;)i++;t[r*2]=o,t[r*2+1]=e.points[a*2+1],n[r*2]=o,n[r*2+1]=f[i*2+1],r++}y=t,b=n,v=r}else{let e=Oe(y,0,v,e=>a.xToPx(e)/u);y=e.points,v=e.length}}let x=e.type===`area`&&!!e.cols.y0&&!!b,S=[],C=[],w=[],E=[],D=[],O=[],k=()=>{E.length&&(S.push(E),C.push(D),x&&w.push(O)),E=[],D=[],O=[]};for(let e=0;e<v;e++){let t=y[e*2],n=y[e*2+1],r=b?b[e*2+1]:0;if(!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(r)){k();continue}let i=T(a,t,n);if(E.push(i.x,i.y),b&&D.push(a.yToPx(r)),x){let e=T(a,t,r);O.push(e.x,e.y)}}if(k(),e.type===`area`&&m.push({kind:`area`,seriesIndex:e.index,color:e.colorCss,opacity:e.opacity,baseline:a.yToPx(n.baseline),segments:S,...b?{bottoms:C}:{},...s?{horizontal:!0}:{}}),e.lineWidth>0){let t=e.type===`area`?Math.min(e.lineWidth,2):e.lineWidth;m.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:S}),x&&m.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:w})}continue}if(e.type===`bar`&&e.barBase&&e.barTop){let[t,n]=Xe(i,g,_,r.x),o=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),.5),s=[],c=[],u=n-t>l,h=NaN;for(let r=t;r<n;r++){let t=e.barBase[r],n=e.barTop[r];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let l=a.xToPx(i[r]+e.barOffset);if(l+o<d||l-o>p)continue;let m=a.yToPx(t),g=a.yToPx(n),_=Math.min(m,g),v=Math.max(1,Math.abs(m-g)),y=Math.floor(l);if(u&&y===h&&s.length){let e=s.length-4,t=Math.max(s[e+1]+s[e+3],_+v);s[e+1]=Math.min(s[e+1],_),s[e+3]=t-s[e+1];continue}h=y,s.push(l-o,_,o*2,v);let b=e.pointColors?.[r];c.push(e.cols.opacities?z(b??e.color,f(e,r)):b?z(b):e.colorCss)}m.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:q(a,s),...e.pointColors||e.cols.opacities?{colors:c}:{},radius:e.radius,...e.opacity<1&&!e.cols.opacities?{opacity:e.opacity}:{}});continue}if(e.type===`boxplot`){m.push(...$e(e,a,r.x,d,p,l));continue}if(e.type===`candlestick`){let[t,n]=Xe(i,g,_,r.x),{open:o,high:s,low:c}=e.cols,u=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),1),f=z(e.upColor),v=z(e.downColor),y=[],b=[],x=[],S=[],C=Math.max(1,Math.ceil((n-t)/l));for(let e=t;e<n;e+=C){let t=h[e],n=o?o[e]:t;if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=a.xToPx(i[e]);if(r+u<d||r-u>p)continue;let l=t<n?v:f,m=a.yToPx(s?s[e]:Math.max(n,t)),g=a.yToPx(c?c[e]:Math.min(n,t));y.push(r-.5,Math.min(m,g),1,Math.abs(g-m)),x.push(l);let _=a.yToPx(n),C=a.yToPx(t);b.push(r-u,Math.min(_,C),u*2,Math.max(1,Math.abs(_-C))),S.push(l)}m.push({kind:`bars`,seriesIndex:e.index,color:f,rects:q(a,y),colors:x},{kind:`bars`,seriesIndex:e.index,color:f,rects:q(a,b),colors:S,radius:1});continue}if(e.type===`heatmap`){let t=Math.abs(e.cellHalf.x/a.xPerPx),n=Math.abs(e.cellHalf.y/a.yPerPx),r=[],s=[],c=D(t*2,n*2,e.radius),u=c.inset;for(let c=0;c<g&&r.length/4<l*4;c++){let l=e.cellColors?.[c];if(!l)continue;let d=E(a,a.xToPx(i[c])-t,a.xToPx(i[c])+t,a.yToPx(h[c])-n,a.yToPx(h[c])+n);d.x+d.width<o.x||d.x>o.x+o.width||d.y+d.height<o.y||d.y>o.y+o.height||(r.push(d.x+u,d.y+u,d.width-u*2,d.height-u*2),s.push(z(_e(l))))}m.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:r,colors:s,radius:c.radius});continue}let v=[],y=[],b=t=>{let n=e.pointColors?.[t];return n?z(n):e.colorCss},x=[],S=[];for(let e=0;e<g;e++){let t=i[e],n=h[e];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=T(a,t,n);r.x<o.x||r.x>o.x+o.width||r.y<o.y||r.y>o.y+o.height||(x.push(e),S.push(r.x,r.y))}if(x.length>c){let n=Math.max(2,t.dotCell??e.pointSize*.8),r=Math.ceil(o.width/n)+1,i=new Map;x.forEach((e,t)=>{let a=Math.floor((S[t*2]-o.x)/n),s=Math.floor((S[t*2+1]-o.y)/n);i.set(s*r+a,e)});for(let[e,t]of i)v.push(o.x+(e%r+.5)*n,o.y+(Math.floor(e/r)+.5)*n,n),y.push(b(t))}else x.forEach((t,n)=>{v.push(S[n*2],S[n*2+1],P(e,t)),y.push(b(t))});m.push({kind:`dots`,seriesIndex:e.index,opacity:e.opacity,dots:v,colors:y,...e.stroke===null?{}:{stroke:e.stroke}})}return m},$e=(e,t,n,r,i,a)=>{let{x:o,y:s,count:c,sorted:l,high:u,low:d,q1:f,q3:p,outliers:m}=e.cols,[h,g]=Xe(o,c,l,n),_=Math.max(e.barHalfWidth/Math.abs(t.xPerPx),1),v=Math.max(1,e.lineWidth),y=[],b=[],x=[],S=[],C=[],w=[],T=Math.max(1,Math.ceil((g-h)/a)),E=(e,t,n)=>{b.push(e-v/2,Math.min(t,n),v,Math.abs(t-n))},D=(e,t,n,r=v)=>{b.push(e-t,n-r/2,t*2,r)};for(let n=h;n<g;n+=T){let a=s[n];if(!Number.isFinite(a))continue;let c=t.xToPx(o[n]+e.barOffset);if(c+_<r||c-_>i)continue;let l=e.pointColors?.[n],h=l?z(l):e.colorCss,g=t.yToPx(d&&Number.isFinite(d[n])?d[n]:a),T=t.yToPx(u&&Number.isFinite(u[n])?u[n]:a),O=t.yToPx(f&&Number.isFinite(f[n])?f[n]:a),k=t.yToPx(p&&Number.isFinite(p[n])?p[n]:a),ee=b.length;y.push(c-_,Math.min(O,k),_*2,Math.abs(O-k)),x.push(h),E(c,g,O),E(c,k,T),E(c-_,O,k),E(c+_,O,k),D(c,_/2,g),D(c,_/2,T),D(c,_,O),D(c,_,k),D(c,_,t.yToPx(a),Math.max(2,v*1.6));for(let e=ee;e<b.length;e+=4)S.push(h);let A=m?.[n];if(A)for(let n of A){let r=t.horizontal?{x:t.yToPx(n),y:c}:{x:c,y:t.yToPx(n)};C.push(r.x,r.y,e.outlierSize),w.push(h)}}let O=[{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:q(t,y),colors:x,opacity:e.opacity},{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:q(t,b),colors:S}];return C.length&&O.push({kind:`dots`,seriesIndex:e.index,opacity:e.outlierShape===`hollow`?0:.85,dots:C,colors:w,stroke:1.25}),O}})))()}var tt,J,nt,rt,it,Y,at,ot,st,ct,lt,ut;function dt(){return(dt=e((()=>{B(),Fe(),h(),I(),W(),j(),ue(),et(),tt=e=>(e[0]+e[1])/2,J=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},nt=(e,t,n)=>{e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip(),e.lineJoin=`round`,e.lineCap=`round`;for(let n of t)if(n.kind===`area`)e.globalAlpha=n.opacity,e.fillStyle=n.color,n.segments.forEach((t,r)=>{let i=n.bottoms?.[r],a=t.length/2;if(!(a<2)){e.beginPath();for(let n=0;n<a;n++)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n*2],t[n*2+1]);for(let r=a-1;r>=0;r--){let a=i?i[r]:n.baseline;n.horizontal?e.lineTo(a,t[r*2+1]):e.lineTo(t[r*2],a)}e.closePath(),e.fill()}}),e.globalAlpha=1;else if(n.kind===`line`){e.strokeStyle=n.color,e.lineWidth=n.width,e.beginPath();for(let t of n.segments)for(let n=0;n<t.length;n+=2)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n],t[n+1]);e.stroke()}else if(n.kind===`bars`){e.globalAlpha=n.opacity??1;let t=n.radius??0;for(let r=0;r<n.rects.length;r+=4){let[i,a,o,s]=[n.rects[r],n.rects[r+1],n.rects[r+2],n.rects[r+3]];e.fillStyle=n.colors?.[r/4]??n.color;let c=Math.min(t,o/2,s/2);c>.5?(J(e,i,a,o,s,c),e.fill()):e.fillRect(i,a,o,s)}e.globalAlpha=1}else{let t=n.stroke??0;for(let r=0;r<n.dots.length;r+=3){let i=n.colors[r/3]??`#888`,a=n.dots[r+2]/2;e.beginPath(),e.arc(n.dots[r],n.dots[r+1],Math.max(0,a-t/2),0,Math.PI*2),n.opacity>0&&(e.globalAlpha=n.opacity,e.fillStyle=i,e.fill()),t>0&&(e.globalAlpha=1,e.lineWidth=t,e.strokeStyle=i,e.stroke())}e.globalAlpha=1}e.restore()},rt=(e,t,n)=>{let{theme:r}=n,{bar:i,stops:a}=t,o=a.length;if(typeof e.createLinearGradient==`function`){let t=e.createLinearGradient(i.x,0,i.x+i.width,0);a.forEach((e,n)=>t.addColorStop(n/Math.max(1,o-1),e)),e.fillStyle=t,J(e,i.x,i.y,i.width,i.height,i.height/2),e.fill()}else{let t=i.width/o;a.forEach((n,r)=>{e.fillStyle=n,e.fillRect(i.x+r*t,i.y,t+.5,i.height)})}e.fillStyle=z(r.text,.35);for(let n of t.ticks)e.fillRect(Math.round(n),i.y-2,1,i.height+4);e.font=A(r,11),e.textBaseline=`middle`,e.fillStyle=z(r.textMuted);for(let n of t.labels)e.textAlign=n.align,e.fillText(n.text,n.x,n.y);t.caret!==null&&(J(e,t.caret-2,i.y-3,4,i.height+6,2),e.fillStyle=z(r.text),e.fill(),e.lineWidth=1.5,e.strokeStyle=z(r.background),e.stroke())},it=1.16,Y=(e,t,n,r)=>{let i=Math.max(0,t.width+r*2),a=Math.max(0,t.height+r*2);J(e,t.x-r,t.y-r,i,a,Math.max(0,Math.min(n+r,i/2,a/2)))},at=(e,t,n,r,i,a,o,s,c)=>{let l=z(c.background);a?(e.save(),e.shadowColor=`rgba(15, 23, 42, 0.4)`,e.shadowBlur=14,e.shadowOffsetY=5,Y(e,t,n,o+(s?.width??0)),e.fillStyle=s?s.color:l,e.fill(),e.restore(),s&&(Y(e,t,n,o),e.fillStyle=l,e.fill())):i&&(Y(e,t,n,0),e.fillStyle=l,e.fill()),Y(e,t,n,0),e.fillStyle=r,e.fill(),a&&a.width>0&&(Y(e,t,n,-a.width/2),e.lineWidth=a.width,e.strokeStyle=a.color,e.stroke())},ot=(e,t,n,r)=>{for(let i of t)if(i.kind===`bar`){let t=R(i);e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip();let a=i.ring===null?null:{color:i.ring,width:Math.min(i.backdrop?2:1.5,Math.max(0,(Math.min(t.width,t.height)-2)/4))};at(e,t,i.radius,i.color,i.backdrop,a,1.5,null,r),e.restore()}else if(i.kind===`cell`){let t=i.width*it,n=i.height*it;at(e,{x:i.x+(i.width-t)/2,y:i.y+(i.height-n)/2,width:t,height:n},Math.max(2,i.radius)*it,i.color,!1,{color:i.ring,width:Math.min(2,Math.min(t,n)/5)},2,{color:z(r.primary,.6),width:1.5},r)}},st=(e,t)=>{let n=ve(e);return n?z(n,n[3]*t):e},ct=(e,t,n,r)=>{if(e.save(),t.origin){let n=(t.size-2)/2;e.beginPath(),e.arc(t.origin.x,t.origin.y,n,0,Math.PI*2),e.fillStyle=z(r.background,.62),e.fill(),e.setLineDash([3,3]),e.lineWidth=1.5,e.strokeStyle=t.color,e.stroke(),e.setLineDash([])}if(e.beginPath(),e.arc(t.x,t.y+3,t.size/2+2,0,Math.PI*2),e.fillStyle=`rgba(15, 23, 42, 0.18)`,e.shadowColor=`rgba(15, 23, 42, 0.35)`,e.shadowBlur=10,e.fill(),e.shadowColor=`transparent`,e.shadowBlur=0,e.beginPath(),e.arc(t.x,t.y,t.size/2+5,0,Math.PI*2),e.fillStyle=st(t.color,.24),e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=z(r.background),e.stroke(),t.label){e.font=A(r,12,600);let i=e.measureText(t.label).width+18,a=t.size/2+8,o=t.x+a+i<=n.x+n.width||t.x-a-i<n.x?t.x+a:t.x-a-i,s=t.y-11;e.shadowColor=`rgba(15, 23, 42, 0.2)`,e.shadowBlur=10,e.shadowOffsetY=3,J(e,o,s,i,22,11),e.fillStyle=z(r.background),e.fill(),e.shadowColor=`transparent`,e.shadowBlur=0,e.shadowOffsetY=0,e.lineWidth=1,e.strokeStyle=z(r.axis,.7),e.stroke(),e.fillStyle=z(r.text),e.textAlign=`left`,e.textBaseline=`middle`,e.fillText(t.label,o+9,t.y)}e.restore()},lt=(e,t,n,r,i,a=N(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),S(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,y2:l.y2,y2Ticks:d.y2Ticks,theme:c,annotations:t.annotations});let h=t.legend?.colors;if(h&&rt(e,h,t),t.legend){e.font=A(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=z(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}let g=t.hover?.marks.some(e=>e.kind===`bar`)??!1;for(let n of t.hover?.marks??[])n.kind===`band`&&(J(e,n.x,n.y,n.width,n.height,6),e.fillStyle=z(c.text,g?.04:.06),e.fill());let _=l.series.some(e=>!e.hidden&&(e.type===`line`||e.type===`area`));g&&_&&t.hover&&ot(e,t.hover.marks,f,c);let v=t.dragging?.target;v&&(e.save(),e.fillStyle=st(v.color,.12),e.fillRect(v.x,v.y,v.width,v.height),e.strokeStyle=st(v.color,.7),e.lineWidth=2,J(e,v.x+1,v.y+1,v.width-2,v.height-2,4),e.stroke(),e.restore()),p.horizontal?nt(e,Qe(t),f):y();function y(){let e=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[t,i]=e(u.x,r.x,l.x.reverse),[o,s]=e(u.y,r.y,l.y.reverse);a.paint(n,{transform:{xScale:t,xOffset:i,yScale:o,yOffset:s},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m))}e.setTransform(m,0,0,m,0,0);for(let n of t.hover?.marks??[])n.kind===`guide`&&(e.fillStyle=z(c.text,.06),e.fillRect(n.x,n.y,n.width,n.height));if(g&&!_&&(e.fillStyle=z(c.background,.42),e.fillRect(f.x,f.y,f.width,f.height)),t.hover&&!(g&&_)&&ot(e,t.hover.marks,f,c),x(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1,connectors:t.connectors,arrows:t.arrows}),t.pointLabels.length){e.save(),e.font=A(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=z(c.background,.9),e.fillStyle=z(c.text,.85);for(let{label:n,box:r}of t.pointLabels){let t=r.y+r.height/2;if(n.color){e.save(),e.fillStyle=n.color,e.fillText(n.text,r.x,t),e.restore();continue}e.strokeText(n.text,r.x,t),e.fillText(n.text,r.x,t)}e.restore()}let b=t.hover;if(b){if(b.crosshairX!==null){e.save(),e.strokeStyle=z(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(b.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}if(b.crosshairY!==null){e.save(),e.strokeStyle=z(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(b.crosshairY)+.5;e.moveTo(f.x,t),e.lineTo(f.x+f.width,t),e.stroke(),e.restore()}for(let t of b.marks)t.kind!==`band`&&t.kind!==`guide`&&t.kind!==`bar`&&t.kind!==`cell`&&(e.beginPath(),e.arc(t.x,t.y,t.size/2+8,0,Math.PI*2),e.fillStyle=t.halo,e.globalAlpha=.45,e.fill(),e.globalAlpha=1,e.beginPath(),e.arc(t.x,t.y,t.size/2+4,0,Math.PI*2),e.fillStyle=t.halo,e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=z(c.background),e.stroke())}t.dragging&&ct(e,t.dragging,f,c);let C=b?.tooltip;if(C){let{box:t,lineHeight:n,padding:r}=C,i=Ie(c,Re);e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,J(e,t.x,t.y,t.width,t.height,8),e.fillStyle=i.background,e.fill(),e.restore(),J(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=i.border,e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let a=t.y+r+n/2,o=t.x+r+2,s=t.x+t.width-r-2;if(C.text){e.font=A(c,12),e.fillStyle=z(c.text),e.textAlign=`left`;for(let t of C.text)e.fillText(t,o,a),a+=n}else{let{content:t}=C,r=o;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,a,4,0,Math.PI*2),e.fill(),r+=14),e.font=A(c,12,600),e.fillStyle=z(c.text),e.textAlign=`left`,e.fillText(t.title,r,a),a+=n,t.subtitle&&(e.font=A(c,11),e.fillStyle=z(c.textMuted),e.fillText(t.subtitle,r,a-2),a+=n);for(let i of t.rows)r=o,i.color&&(e.fillStyle=i.color,e.beginPath(),e.arc(r+4,a,4,0,Math.PI*2),e.fill()),r+=C.swatchWidth,e.font=A(c,12),e.textAlign=`left`,e.fillStyle=z(c.textMuted),e.fillText(i.name,r,a),e.font=A(c,12,600),e.textAlign=`right`,e.fillStyle=z(c.text),e.fillText(i.value,s,a),a+=n}}},ut=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u=``,d=``,f=e.options,p=new WeakMap,m=0,h=e=>{let t=p.get(e);return t===void 0&&p.set(e,t=++m),t},g={x:0,y:0},_=0,v=``,y=(e,t)=>n?(t!==v&&(n.font=t,v=t),n.measureText(e).width):e.length*6.5,b=n?N(n):null,x=globalThis,S=()=>{if(s=null,o||!n||!b)return;let e=w.getScene();if(!e)return;let p=Math.max(1,Math.round(r*a)),m=Math.max(1,Math.round(i*a));t.width!==p&&(t.width=p),t.height!==m&&(t.height=m),v=``,l!==e.model&&(l=e.model,u=M(e.model,h(e.theme),e=>f.series[e]?.stack));let y=e.layout.scales,x={x:1/Math.abs(y.xPerPx),y:1/Math.abs(y.yPerPx)},S=`${u}|${ke(e.model,x)}`;S!==d&&(d=S,g={x:tt(e.model.base.x),y:tt(e.model.base.y)},c=xe(e.model,g,++_,x)),lt(n,e,c,g,a,b),v=``},C=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(S):x.requestAnimationFrame?x.requestAnimationFrame(S):setTimeout(S,16))},w=Ye({options:e.options,theme:e.theme,measureText:y,onInvalidate:C});w.setSize(r,i);let T=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>{f=e,w.setOptions(e)},setTheme:e=>w.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),w.setSize(e,t),C()},render(){s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),S()},touchStart(e){e.forEach((e,t)=>w.pointerDown(e.x,e.y,T(e,t)))},touchMove(e){e.forEach((e,t)=>w.pointerMove(e.x,e.y,T(e,t)))},touchEnd(e){e.forEach((e,t)=>w.pointerUp(e.x,e.y,T(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>w.pointerCancel(T(e,t)))},pointerDown:(e,t,n)=>w.pointerDown(e,t,n),pointerMove:(e,t,n)=>w.pointerMove(e,t,n),pointerUp:(e,t,n)=>w.pointerUp(e,t,n),pointerLeave:()=>w.pointerLeave(),zoomAt:(e,t,n)=>w.zoomAt(e,t,n),resetZoom:()=>w.resetZoom(),getView:()=>w.getView(),setView:e=>w.setView(e),toggleSeries:e=>w.toggleSeries(e),clearHover:()=>w.clearHover(),getPlotRect:()=>w.getPlotRect(),toPixel:(e,t)=>w.toPixel(e,t),fromPixel:(e,t)=>w.fromPixel(e,t),getController:()=>w,on:(e,t)=>w.on(e,t),destroy(){o||(o=!0,s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),b?.destroy(),w.destroy())}}}})))()}function ft(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,pt.useRef)(null),[a,o]=(0,pt.useState)(`…`),[s,c]=(0,pt.useState)(null),l=new Intl.NumberFormat(n,{notation:`compact`});(0,pt.useEffect)(()=>{let t=i.current;if(!t)return;let r=new Intl.NumberFormat(n,{notation:`compact`}),a=H(t,{series:[{name:e(`downloads`),type:`bar`,data:ht.map((e,t)=>[e,gt[t]])}],yAxis:{format:e=>r.format(e)},ariaLabel:e(`downloadsAria`)}),s=!0;a.ready.then(t=>{s&&o(t??e(`unsupported`))});let l=a.on(`click`,c);return()=>{s=!1,l(),a.destroy()}},[e,n]);let u=s?.items[0],d=s&&u?e(`downloadsStatus`,{release:s.xLabel,downloads:l.format(u.y)}):e(`clickBar`);return(0,mt.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,mt.jsx)(`div`,{ref:i,style:{height:300}}),(0,mt.jsxs)(`p`,{role:`status`,children:[e(`rendererLabel`,{renderer:a}),` · `,d]})]})}var pt,mt,ht,gt;function _t(){return(_t=e((()=>{pt=t(),i(),Ee(),mt=n(),ht=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],gt=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function vt(){let e=(0,yt.useRef)(null),t=(0,yt.useRef)(null),{t:n,i18n:i}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),a=i.language,[o,s]=(0,yt.useState)(null);(0,yt.useEffect)(()=>{let r=e.current;if(!r)return;let i=new Intl.DateTimeFormat(a,{month:`short`}),o=xt.map((e,t)=>i.format(new Date(2026,t,1))),c=new Intl.NumberFormat(a,{notation:`compact`}),l=()=>r.getBoundingClientRect(),u=ut({canvas:r,width:l().width,height:l().height,pixelRatio:window.devicePixelRatio||1,theme:wt(r),options:{series:[{name:n(`visits`),type:`area`,data:o.map((e,t)=>[e,xt[t]])},{name:n(`signupsTimes10`),type:`line`,data:o.map((e,t)=>[e,St[t]*10])}],yAxis:{format:e=>c.format(e)},crosshair:!0,ariaLabel:n(`visitsAria`)}});t.current=u;let d=u.on(`click`,e=>{let t=e.items[0];t&&s(`${e.xLabel}: ${c.format(t.y)} (${t.seriesName})`)}),f=u.on(`plotClick`,()=>s(null)),p=new ResizeObserver(()=>{let{width:e,height:t}=l();u.resize(e,t,window.devicePixelRatio||1)});p.observe(r);let m=new MutationObserver(()=>u.setTheme(wt(r)));return m.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{d(),f(),p.disconnect(),m.disconnect(),u.destroy(),t.current=null}},[n,a]);let c=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,bt.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,bt.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":n(`visitsAria`),style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...c(e)),onPointerMove:e=>t.current?.pointerMove(...c(e)),onPointerUp:e=>t.current?.pointerUp(...c(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,bt.jsx)(`p`,{role:`status`,children:o??n(`clickPoint`)})]})}var yt,bt,xt,St,Ct,wt;function Tt(){return(Tt=e((()=>{yt=t(),i(),dt(),bt=n(),xt=[4200,5100,4800,6900,7400,8800,8100,9600],St=[310,420,380,560,610,790,720,880],Ct=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],wt=e=>{let t=getComputedStyle(e),n={};for(let e of Ct){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function Et(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,X.useRef)(null),a=(0,X.useRef)(null),[s,c]=(0,X.useState)(`pie`),[l,u]=(0,X.useState)(null),d=(0,X.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),p=(0,X.useMemo)(()=>{let t=new Intl.NumberFormat(n,{notation:`compact`}),r=Dt.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),i={format:e=>d.format(e),percentFormat:e=>f.format(e)};return{pie:{type:`pie`,data:r,ariaLabel:e(`sourcesAria`),...i},donut:{type:`pie`,data:r,innerRadius:.62,padAngle:2,cornerRadius:4,centerValue:t.format(9800),centerLabel:e(`visitsLabel`),labels:`none`,ariaLabel:e(`sourcesAria`),...i},funnel:{type:`funnel`,data:Ot.map(({key:t,value:n})=>({name:e(`stages.${t}`),value:n})),ariaLabel:e(`funnelAria`),...i}}},[e,n,d,f]),m=(0,X.useRef)(p);(0,X.useEffect)(()=>{m.current=p}),(0,X.useEffect)(()=>{let e=i.current;if(!e)return;let t=L(e,m.current.pie);a.current=t;let n=t.on(`click`,u);return()=>{n(),t.destroy(),a.current=null}},[]),(0,X.useEffect)(()=>{a.current?.setOptions(p[s])},[p,s]);let h=e=>{c(e),u(null)};return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(`div`,{style:{display:`flex`,gap:8},children:kt.map(t=>(0,Z.jsx)(o,{size:`small`,variant:s===t?`solid`:`outline`,"aria-pressed":s===t,onClick:()=>h(t),children:e(`views.${t}`)},t))}),(0,Z.jsx)(`div`,{ref:i,style:{height:300}}),(0,Z.jsx)(`p`,{role:`status`,children:l?e(`picked`,{name:l.name,value:d.format(l.value),share:f.format(l.percent)}):e(`clickShape`)})]})}var X,Z,Dt,Ot,kt;function At(){return(At=e((()=>{X=t(),i(),a(),F(),Z=n(),Dt=[{key:`search`,value:4200},{key:`direct`,value:2600},{key:`social`,value:1500},{key:`email`,value:900},{key:`referral`,value:600}],Ot=[{key:`visits`,value:9800},{key:`signups`,value:3100},{key:`trials`,value:1400},{key:`customers`,value:520}],kt=[`pie`,`donut`,`funnel`]})))()}function jt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Mt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,Q.useRef)(null),a=(0,Q.useRef)(null),s=(0,Q.useRef)([]),c=(0,Q.useRef)(jt(17)),[l,u]=(0,Q.useState)(!1),[d,f]=(0,Q.useState)(0),p=(0,Q.useRef)(null);(0,Q.useEffect)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`}),r={cpu:e(`cpu`),seconds:e(`seconds`),aria:e(`cpuAria`),percent:e=>t.format(e/100)};p.current=r,a.current?.setOptions(It(s.current,r))},[e,n]),(0,Q.useEffect)(()=>{let e=i.current;if(!e)return;let t=jt(17);c.current=t;let n=[];for(let e=0;e<20;e++)n.push(Ft(t,n[e-1]));s.current=n;let r=H(e,It(n,p.current??Pt));return a.current=r,f(n.length),()=>{r.destroy(),a.current=null}},[]),(0,Q.useEffect)(()=>{if(l)return;let e=setInterval(()=>{let e=s.current,t=[...e.slice(-119),Ft(c.current,e[e.length-1])];s.current=t,a.current?.setOptions(It(t,p.current??Pt)),f(e=>e+1)},500);return()=>clearInterval(e)},[l]);let m=new Intl.NumberFormat(n);return(0,Nt.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Nt.jsx)(`div`,{ref:i,style:{height:300,width:`100%`}}),(0,Nt.jsx)(o,{variant:`outline`,onClick:()=>u(e=>!e),children:e(l?`resume`:`pause`)}),(0,Nt.jsx)(`p`,{role:`status`,children:e(l?`pausedStatus`:`streamingStatus`,{points:m.format(d)})})]})}var Q,Nt,Pt,Ft,It;function Lt(){return(Lt=e((()=>{Q=t(),i(),a(),Ee(),Nt=n(),Pt={cpu:``,seconds:``,aria:``,percent:String},Ft=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},It=(e,t)=>({series:[{name:t.cpu,type:`area`,data:e,opacity:.2}],xAxis:{title:t.seconds},yAxis:{min:0,max:100,format:t.percent},interaction:!1,ariaLabel:t.aria})})))()}var Rt;function zt(){return(zt=e((()=>{Rt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Bt;function Vt(){return(Vt=e((()=>{Bt=`import { useEffect, useRef, useState, type PointerEvent } from "react";
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
`})))()}var Ht;function Ut(){return(Ut=e((()=>{Ht=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var Wt;function Gt(){return(Gt=e((()=>{Wt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var $,Kt,qt;function Jt(){return(Jt=e((()=>{_t(),Tt(),At(),Lt(),zt(),Vt(),Ut(),Gt(),t(),i(),Ue(),s(),Ge(),$=n(),Kt=He(Object.assign({"./demos/basic.tsx":ft,"./demos/canvas.tsx":vt,"./demos/shapes.tsx":Et,"./demos/streaming.tsx":Mt}),Object.assign({"./demos/basic.tsx":Rt,"./demos/canvas.tsx":Bt,"./demos/shapes.tsx":Ht,"./demos/streaming.tsx":Wt})),qt=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(We,{id:`chart-engine`,demos:Kt,intro:t})}})))()}Jt();export{qt as default};