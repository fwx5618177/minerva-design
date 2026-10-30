import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,r as i}from"./DemoBlock-BJ0_y9F8.js";import{n as a,t as o}from"./useTranslation-BzoVi22c.js";import{R as s,z as c}from"./ProgressIndicator-BhPa7d9i.js";import{$ as l,B as u,Dt as d,F as f,G as p,H as m,I as h,It as g,J as _,K as v,L as y,Lt as b,P as x,Q as S,R as C,Tt as w,U as T,V as E,W as D,Z as O,at as k,bt as A,ct as ee,dt as te,et as j,ft as ne,gt as M,ht as N,it as re,jt as ie,l as ae,lt as P,mt as oe,nt as F,ot as I,pt as L,q as se,rt as ce,st as R,tt as le,u as z,ut as ue,yt as de,z as fe}from"./angular-preview-CuqFtkb7.js";import{_ as B,b as V,g as pe,m as me,v as he,w as ge,y as _e}from"./angular-preview-B5skLbni.js";import{l as ve,n as ye,t as be,u as xe}from"./DocPage-B2iACtLP.js";var H,Se,Ce,we,Te,Ee,U,De,W,Oe,ke;function Ae(){return(Ae=e((()=>{g(),d(),de(),ne(),P(),re(),j(),v(),V(),pe(),H=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),Se=6,Ce=10,we=320,Te=20,Ee=e=>{let t=e.options,n=e.theme,r=ge(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},l=!1,d=0,f=0,h=[],g=null,v=!0,y=``,b=!1,x=null,S=new Map,w=null,O={time:0,x:0,y:0},A=(e,t)=>{o[e]?.forEach(e=>e(t))},j=()=>{v=!0,b||e.onInvalidate?.()},ne=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1}},M=(t,n=r.fontSize,i=400)=>e.measureText(t,R(r,n,i)),N=()=>{s=ee(t,r,a,i);let{base:e,minSpan:n}=s;l?(c={x:s.zoom.x?me(c.x,e.x,n.x):[...e.x],y:s.zoom.y?me(c.y,e.y,n.y):[...e.y]},l=!he(c.x,e.x)||!he(c.y,e.y)):c=H(e),h=se(t.annotations,r),x&&(x.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||I(null)),j()},re=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!(e===void 0?n>1:e))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=[],o=4,c=0;for(let e of s.series){let t=14+M(e.name,12)+8;o+t>d-4&&o>4&&(o=4,c++),a.push({id:e.id,name:e.name,color:e.colorCss,shape:fe(e.type),hidden:e.hidden,box:{x:o,y:c*Te,width:t,height:Te}}),o+=t+10}let l=(c+1)*Te+6;if(i===`bottom`)for(let e of a)e.box.y+=f-l+6;return{entries:a,position:i,toggle:r.toggle??!0,height:l}},ie=(e,n,r)=>{let i=t.tooltip;if(i===!1)return null;let a=typeof i==`object`?i.render:void 0,o=null;if(a){let t=a(e);if(t===null||t===``)return null;typeof t==`string`&&(o=t.split(`
`))}let c=_(s,e,g?.layout.yTicks??null,g?.layout.y2Ticks??null),l=0,u;if(o){for(let e of o)l=Math.max(l,M(e,12));u=o.length}else{l=M(c.title,12,600)+(c.titleColor?14:0);for(let e of c.rows)l=Math.max(l,(e.color?14:0)+M(e.name,12)+16+M(e.value,12,600));u=1+c.rows.length}let p=Math.ceil(Math.max(l,96)+16+4),m=u*18+16,h=n+14;h+p>d-4&&(h=n-14-p),h=Math.max(4,Math.min(h,d-p-4));let v=Math.max(4,Math.min(r-m/2,f-m-4));return{content:c,text:o,box:{x:h,y:v,width:p,height:m},lineHeight:18,padding:8}},ae=()=>{if(d<=0||f<=0)return null;let e=re(),n=e?.position===`top`?e.height:0,i=p({model:s,view:c,theme:r,width:d,height:f-(e?.height??0),padding:t.padding,top:n,measure:e=>M(e)}),a=C(s,c,i.scales,i.yTicks),o=[],l=r.fontSize+4;for(let e of h){if(e.type===`text`&&e.text){o.push(le(e,i.scales,M(e.text,r.fontSize,e.weight),l));continue}if(e.type!==`rect`||!e.label)continue;let t=k(e,i.scales);if(t.width<=0||t.height<=0)continue;let n=M(e.label,r.fontSize+1,600),a=e.labelPosition;o.push({x:a.endsWith(`left`)?t.x+10:a.endsWith(`right`)?t.x+t.width-10-n:t.x+(t.width-n)/2,y:a.startsWith(`top`)?t.y+10:a.startsWith(`bottom`)?t.y+t.height-10-l:t.y+(t.height-l)/2,width:n,height:l})}let u=ce(a,i.plot,e=>M(e),l-2,o),_={width:d,height:f,theme:r,model:s,view:H(c),layout:i,annotations:h,pointLabels:u,legend:e,hover:null,dragging:null};if(g=_,x){let e=D(s,i.scales,x.event,t.crosshair),n=i.scales.horizontal;_.hover={event:x.event,marks:T(s,i.scales,x.event),crosshairX:n?null:e,crosshairY:n?e:null,tooltip:w?.kind===`pan`||w?.kind===`point`?null:ie(x.event,x.x,x.y)}}if(w?.kind===`point`){let e=s.series[w.item.seriesIndex];_.dragging={x:w.x,y:w.y,color:w.item.color,size:(e?m(e,w.item.index):8)+6}}let v=i.plot,b=`${v.x},${v.y},${v.width},${v.height}`;return b!==y&&(y=b,A(`layout`,{...v})),_},P=()=>((v||!g)&&(v=!1,g=ae()),g),F=()=>P()?.layout.scales??null,I=e=>{let t=!E(x?.event??null,e?.event??null);x=e,j(),t&&A(`hover`,e?e.event:null)},z=(e,t,n)=>{let r=F();return r?u(s,r,g?.layout.xTicks??null,e,t,n?8:0):null},ue=(e,t)=>{let n=F()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},de=(e,t)=>{let n=F();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t));return L(n,i,a)},V=(e,t)=>{let{base:n,minSpan:r}=s;c={x:me(e.x,n.x,r.x),y:me(e.y,n.y,r.y)},l=!he(c.x,n.x)||!he(c.y,n.y),t&&A(`zoom`,H(c)),j()},pe=(e,t,n)=>{let r=F();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=H(c),a=L(r,e,t);s.zoom.x&&(i.x=_e(c.x,a.x,n)),s.zoom.y&&(i.y=_e(c.y,a.y,n)),V(i,!0)},ve=()=>{l&&V(H(s.base),!0)},ye=(e,t)=>P()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,be=e=>{a.has(e)?a.delete(e):a.add(e),N()},xe=()=>{let[e,t]=[...S.values()];w={kind:`pinch`,view:H(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},I(null)};return s=ee(t,r,a,i),N(),{setOptions(e){if(b)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=ge(n,t.palette)),N()},setTheme(e){b||(n=e,r=ge(n,t.palette),N())},setSize(e,t){(e!==d||t!==f)&&(d=Math.max(0,e),f=Math.max(0,t),j())},getScene:P,pointerDown:(e,t,n={})=>{if(b)return;let r=n.id??0,i=!!n.touch;S.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=ne();if(S.size===2){a&&(s.zoom.x||s.zoom.y)&&w?.kind!==`point`&&xe();return}if(S.size>2||!a){if(!a&&i){let n=z(e,t,!0);I(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=z(e,t,i)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){w={kind:`point`,item:n,x:e,y:t};return}}if(l&&a.pan&&ue(e,t)){w={kind:`pan`,view:H(c),x:e,y:t};return}if(w=null,i){let n=z(e,t,!0);I(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(b)return;let r=n.id??0,i=S.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?Ce:Se)&&(i.moved=!0)),w?.kind===`pinch`&&S.size>=2){let[e,t]=[...S.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=F();if(!a)return;let o=te(a.plot,w.view,s.x.reverse,s.y.reverse,s.horizontal),c=w.distance/n,l=H(w.view),u=L(o,w.midX,w.midY),d=L(o,r,i);s.zoom.x&&(l.x=_e(w.view.x,u.x,c),l.x=B(l.x,(u.x-d.x)*c)),s.zoom.y&&(l.y=_e(w.view.y,u.y,c),l.y=B(l.y,(u.y-d.y)*c)),V(l,!0);return}if(w?.kind===`point`&&i){if(!i.moved)return;w.x=e,w.y=t;let n=de(e,t);j(),n&&A(`drag`,{item:w.item,x:n.x,y:n.y});return}if(w?.kind===`pan`&&i){if(!i.moved)return;let n=F();if(!n)return;let r=H(w.view),a=L(n,w.x,w.y),o=L(n,e,t);s.zoom.x&&(r.x=B(w.view.x,a.x-o.x)),s.zoom.y&&(r.y=B(w.view.y,a.y-o.y)),V(r,!0);return}if(!(S.size>1)&&(!i||i.touch||!n.touch)){let r=z(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&I(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(b)return;let r=n.id??0,i=S.get(r);S.delete(r);let a=w;if(a?.kind===`pinch`){S.size<2&&(w=null);return}if(w=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=de(e,t);j(),n&&A(`drop`,{item:a.item,x:n.x,y:n.y});return}}else if(a?.kind===`pan`&&i.moved){j();return}if(i.moved){i.touch&&j();return}let o=Date.now();if(i.touch&&o-O.time<we&&Math.hypot(e-O.x,t-O.y)<24&&l){O={time:0,x:e,y:t},ve();return}O={time:o,x:e,y:t};let s=ye(e,t);if(s){P()?.legend?.toggle&&be(s.id);return}let c=z(e,t,i.touch);if(c){i.touch&&I({event:c,x:e,y:t}),A(`click`,c);return}if(i.touch&&I(null),ue(e,t)){let n=de(e,t);n&&A(`plotClick`,n)}},pointerCancel:(e={})=>{S.delete(e.id??0),(w?.kind===`point`||S.size<2)&&(w=null),j()},pointerLeave(){!w&&x&&I(null)},zoomAt:pe,resetZoom:ve,getView:()=>H(c),setView(e){b||V({x:e.x??c.x,y:e.y??c.y},!1)},toggleSeries:be,clearHover(){x&&I(null)},getPlotRect(){let e=P()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=F();return n?oe(n,e,t):null},fromPixel(e,t){let n=F();return n?L(n,e,t):null},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){b=!0,S.clear();for(let e of Object.keys(o))delete o[e]}}},U=(e,t,n,r)=>{if(!n)return[0,t];let[i,a]=r[0]<=r[1]?r:[r[1],r[0]];return[Math.max(0,b(e,t,i)-1),Math.min(t,b(e,t,a)+1)]},De={heatmap:0,area:1,bar:2,boxplot:2,candlestick:3,line:4,scatter:5},W=(e,t)=>{if(!e.horizontal)return t;let n=Array(t.length);for(let e=0;e<t.length;e+=4)n[e]=t[e+1],n[e+1]=t[e],n[e+2]=t[e+3],n[e+3]=t[e+2];return n},Oe=(e,t={})=>{let{model:n,view:r,layout:i}=e,a=i.scales,{plot:o}=i,s=a.horizontal,c=t.maxDots??4e3,u=t.maxBars??2e3,d=Math.max(1,t.columnWidth??1),f=s?o.y:o.x,p=f+(s?o.height:o.width),h=[],g=n.series.filter(e=>!e.hidden&&e.cols.count>0).sort((e,t)=>De[e.type]-De[t.type]||e.index-t.index);for(let e of g){let{x:i,y:g,count:_,sorted:v}=e.cols;if(e.type===`line`||e.type===`area`){let[t,o]=U(i,_,v,r.x),c=e.stackTop??g,u=A(i,c,t,o,e.curve),m=e.stackBase?A(i,e.stackBase,t,o,e.curve).points:null,y=u.length,b=u.points,x=m;if(v&&y>(p-f)*2/d){if(m){let e=l(b,0,y,e=>a.xToPx(e)/d),t=new Float64Array(e.length*2),n=new Float64Array(e.length*2),r=0,i=0;for(let a=0;a<e.length;a++){let o=e.points[a*2];for(;i<y-1&&b[i*2]<o;)i++;t[r*2]=o,t[r*2+1]=e.points[a*2+1],n[r*2]=o,n[r*2+1]=m[i*2+1],r++}b=t,x=n,y=r}else{let e=l(b,0,y,e=>a.xToPx(e)/d);b=e.points,y=e.length}}let S=e.type===`area`&&!!e.cols.y0&&!!x,C=[],w=[],T=[],E=[],D=[],O=[],k=()=>{E.length&&(C.push(E),w.push(D),S&&T.push(O)),E=[],D=[],O=[]};for(let e=0;e<y;e++){let t=b[e*2],n=b[e*2+1],r=x?x[e*2+1]:0;if(!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(r)){k();continue}let i=oe(a,t,n);if(E.push(i.x,i.y),x&&D.push(a.yToPx(r)),S){let e=oe(a,t,r);O.push(e.x,e.y)}}if(k(),e.type===`area`&&h.push({kind:`area`,seriesIndex:e.index,color:e.colorCss,opacity:e.opacity,baseline:a.yToPx(n.baseline),segments:C,...x?{bottoms:w}:{},...s?{horizontal:!0}:{}}),e.lineWidth>0){let t=e.type===`area`?Math.min(e.lineWidth,2):e.lineWidth;h.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:C}),S&&h.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:T})}continue}if(e.type===`bar`&&e.barBase&&e.barTop){let[t,n]=U(i,_,v,r.x),o=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),.5),s=[],c=[],l=n-t>u,d=NaN;for(let r=t;r<n;r++){let t=e.barBase[r],n=e.barTop[r];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let u=a.xToPx(i[r]+e.barOffset);if(u+o<f||u-o>p)continue;let m=a.yToPx(t),h=a.yToPx(n),g=Math.min(m,h),_=Math.max(1,Math.abs(m-h)),v=Math.floor(u);if(l&&v===d&&s.length){let e=s.length-4,t=Math.max(s[e+1]+s[e+3],g+_);s[e+1]=Math.min(s[e+1],g),s[e+3]=t-s[e+1];continue}d=v,s.push(u-o,g,o*2,_);let y=e.pointColors?.[r];c.push(y?w(y):e.colorCss)}h.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:W(a,s),...e.pointColors?{colors:c}:{},radius:e.radius,...e.opacity<1?{opacity:e.opacity}:{}});continue}if(e.type===`boxplot`){h.push(...ke(e,a,r.x,f,p,u));continue}if(e.type===`candlestick`){let[t,n]=U(i,_,v,r.x),{open:o,high:s,low:c}=e.cols,l=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),1),d=w(e.upColor),m=w(e.downColor),y=[],b=[],x=[],S=[],C=Math.max(1,Math.ceil((n-t)/u));for(let e=t;e<n;e+=C){let t=g[e],n=o?o[e]:t;if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=a.xToPx(i[e]);if(r+l<f||r-l>p)continue;let u=t<n?m:d,h=a.yToPx(s?s[e]:Math.max(n,t)),_=a.yToPx(c?c[e]:Math.min(n,t));y.push(r-.5,Math.min(h,_),1,Math.abs(_-h)),x.push(u);let v=a.yToPx(n),C=a.yToPx(t);b.push(r-l,Math.min(v,C),l*2,Math.max(1,Math.abs(v-C))),S.push(u)}h.push({kind:`bars`,seriesIndex:e.index,color:d,rects:W(a,y),colors:x},{kind:`bars`,seriesIndex:e.index,color:d,rects:W(a,b),colors:S,radius:1});continue}if(e.type===`heatmap`){let t=Math.abs(e.cellHalf.x/a.xPerPx),n=Math.abs(e.cellHalf.y/a.yPerPx),r=[],s=[],c=+(t>3&&n>3);for(let l=0;l<_&&r.length/4<u*4;l++){let u=e.cellColors?.[l];if(!u)continue;let d=ue(a,a.xToPx(i[l])-t,a.xToPx(i[l])+t,a.yToPx(g[l])-n,a.yToPx(g[l])+n);d.x+d.width<o.x||d.x>o.x+o.width||d.y+d.height<o.y||d.y>o.y+o.height||(r.push(d.x+c,d.y+c,d.width-c*2,d.height-c*2),s.push(w(ie(u))))}h.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:r,colors:s,radius:e.radius});continue}let y=[],b=[],x=t=>{let n=e.pointColors?.[t];return n?w(n):e.colorCss},S=[],C=[];for(let e=0;e<_;e++){let t=i[e],n=g[e];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=oe(a,t,n);r.x<o.x||r.x>o.x+o.width||r.y<o.y||r.y>o.y+o.height||(S.push(e),C.push(r.x,r.y))}if(S.length>c){let n=Math.max(2,t.dotCell??e.pointSize*.8),r=Math.ceil(o.width/n)+1,i=new Map;S.forEach((e,t)=>{let a=Math.floor((C[t*2]-o.x)/n),s=Math.floor((C[t*2+1]-o.y)/n);i.set(s*r+a,e)});for(let[e,t]of i)y.push(o.x+(e%r+.5)*n,o.y+(Math.floor(e/r)+.5)*n,n),b.push(x(t))}else S.forEach((t,n)=>{y.push(C[n*2],C[n*2+1],m(e,t)),b.push(x(t))});h.push({kind:`dots`,seriesIndex:e.index,opacity:e.opacity,dots:y,colors:b})}return h},ke=(e,t,n,r,i,a)=>{let{x:o,y:s,count:c,sorted:l,high:u,low:d,q1:f,q3:p,outliers:m}=e.cols,[h,g]=U(o,c,l,n),_=Math.max(e.barHalfWidth/Math.abs(t.xPerPx),1),v=Math.max(1,e.lineWidth),y=[],b=[],x=[],S=[],C=[],T=[],E=Math.max(1,Math.ceil((g-h)/a)),D=(e,t,n)=>{b.push(e-v/2,Math.min(t,n),v,Math.abs(t-n))},O=(e,t,n,r=v)=>{b.push(e-t,n-r/2,t*2,r)};for(let n=h;n<g;n+=E){let a=s[n];if(!Number.isFinite(a))continue;let c=t.xToPx(o[n]+e.barOffset);if(c+_<r||c-_>i)continue;let l=e.pointColors?.[n],h=l?w(l):e.colorCss,g=t.yToPx(d&&Number.isFinite(d[n])?d[n]:a),E=t.yToPx(u&&Number.isFinite(u[n])?u[n]:a),k=t.yToPx(f&&Number.isFinite(f[n])?f[n]:a),A=t.yToPx(p&&Number.isFinite(p[n])?p[n]:a),ee=b.length;y.push(c-_,Math.min(k,A),_*2,Math.abs(k-A)),x.push(h),D(c,g,k),D(c,A,E),D(c-_,k,A),D(c+_,k,A),O(c,_/2,g),O(c,_/2,E),O(c,_,k),O(c,_,A),O(c,_,t.yToPx(a),Math.max(2,v*1.6));for(let e=ee;e<b.length;e+=4)S.push(h);let te=m?.[n];if(te)for(let n of te){let r=t.horizontal?{x:t.yToPx(n),y:c}:{x:c,y:t.yToPx(n)};C.push(r.x,r.y,e.pointSize),T.push(h)}}let k=[{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:W(t,y),colors:x,opacity:e.opacity},{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:W(t,b),colors:S}];return C.length&&k.push({kind:`dots`,seriesIndex:e.index,opacity:.85,dots:C,colors:T}),k}})))()}var je,G,Me,Ne,Pe;function Fe(){return(Fe=e((()=>{d(),N(),re(),S(),h(),Ae(),je=e=>(e[0]+e[1])/2,G=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},Me=(e,t,n)=>{e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip(),e.lineJoin=`round`,e.lineCap=`round`;for(let n of t)if(n.kind===`area`)e.globalAlpha=n.opacity,e.fillStyle=n.color,n.segments.forEach((t,r)=>{let i=n.bottoms?.[r],a=t.length/2;if(!(a<2)){e.beginPath();for(let n=0;n<a;n++)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n*2],t[n*2+1]);for(let r=a-1;r>=0;r--){let a=i?i[r]:n.baseline;n.horizontal?e.lineTo(a,t[r*2+1]):e.lineTo(t[r*2],a)}e.closePath(),e.fill()}}),e.globalAlpha=1;else if(n.kind===`line`){e.strokeStyle=n.color,e.lineWidth=n.width,e.beginPath();for(let t of n.segments)for(let n=0;n<t.length;n+=2)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n],t[n+1]);e.stroke()}else if(n.kind===`bars`){e.globalAlpha=n.opacity??1;let t=n.radius??0;for(let r=0;r<n.rects.length;r+=4){let[i,a,o,s]=[n.rects[r],n.rects[r+1],n.rects[r+2],n.rects[r+3]];e.fillStyle=n.colors?.[r/4]??n.color;let c=Math.min(t,o/2,s/2);c>.5?(G(e,i,a,o,s,c),e.fill()):e.fillRect(i,a,o,s)}e.globalAlpha=1}else{e.globalAlpha=n.opacity;for(let t=0;t<n.dots.length;t+=3)e.fillStyle=n.colors[t/3]??`#888`,e.beginPath(),e.arc(n.dots[t],n.dots[t+1],n.dots[t+2]/2,0,Math.PI*2),e.fill();e.globalAlpha=1}e.restore()},Ne=(e,t,n,r,i,a=O(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;if(e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),F(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,y2:l.y2,y2Ticks:d.y2Ticks,theme:c,annotations:t.annotations}),t.legend){e.font=R(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=w(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}for(let n of t.hover?.marks??[])n.kind===`band`&&(G(e,n.x,n.y,n.width,n.height,6),e.fillStyle=w(c.text,.06),e.fill());p.horizontal?Me(e,Oe(t),f):h();function h(){let e=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[t,i]=e(u.x,r.x,l.x.reverse),[o,s]=e(u.y,r.y,l.y.reverse);a.paint(n,{transform:{xScale:t,xOffset:i,yScale:o,yOffset:s},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m))}if(e.setTransform(m,0,0,m,0,0),I(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1}),t.pointLabels.length){e.save(),e.font=R(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=w(c.background,.9),e.fillStyle=w(c.text,.85);for(let{label:n,box:r}of t.pointLabels)e.strokeText(n.text,r.x,r.y+r.height/2),e.fillText(n.text,r.x,r.y+r.height/2);e.restore()}let g=t.hover;if(g){if(g.crosshairX!==null){e.save(),e.strokeStyle=w(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(g.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}if(g.crosshairY!==null){e.save(),e.strokeStyle=w(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(g.crosshairY)+.5;e.moveTo(f.x,t),e.lineTo(f.x+f.width,t),e.stroke(),e.restore()}for(let t of g.marks)if(t.kind!==`band`){if(t.kind===`cell`){G(e,t.x,t.y,t.width,t.height,3),e.lineWidth=3,e.strokeStyle=w(c.background),e.stroke(),e.lineWidth=1.5,e.strokeStyle=w(c.text,.55),e.stroke();continue}e.beginPath(),e.arc(t.x,t.y,t.size/2+4,0,Math.PI*2),e.fillStyle=t.halo,e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=w(c.background),e.stroke()}}if(t.dragging){let n=t.dragging;e.beginPath(),e.arc(n.x,n.y,n.size/2,0,Math.PI*2),e.fillStyle=n.color,e.globalAlpha=.85,e.fill(),e.globalAlpha=1,e.lineWidth=2,e.strokeStyle=w(c.background),e.stroke()}let _=g?.tooltip;if(_){let{box:t,lineHeight:n,padding:r}=_;e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,G(e,t.x,t.y,t.width,t.height,8),e.fillStyle=w(c.background),e.fill(),e.restore(),G(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=w(c.axis,.6),e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let i=t.y+r+n/2,a=t.x+r+2,o=t.x+t.width-r-2;if(_.text){e.font=R(c,12),e.fillStyle=w(c.text),e.textAlign=`left`;for(let t of _.text)e.fillText(t,a,i),i+=n}else{let{content:t}=_,r=a;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=R(c,12,600),e.fillStyle=w(c.text),e.textAlign=`left`,e.fillText(t.title,r,i),i+=n;for(let s of t.rows)r=a,s.color&&(e.fillStyle=s.color,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=R(c,12),e.textAlign=`left`,e.fillStyle=w(c.textMuted),e.fillText(s.name,r,i),e.font=R(c,12,600),e.textAlign=`right`,e.fillStyle=w(c.text),e.fillText(s.value,o,i),i+=n}}},Pe=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u=``,d=e.options,f=new WeakMap,p=0,m=e=>{let t=f.get(e);return t===void 0&&f.set(e,t=++p),t},h={x:0,y:0},g=0,_=``,v=(e,t)=>n?(t!==_&&(n.font=t,_=t),n.measureText(e).width):e.length*6.5,b=n?O(n):null,x=globalThis,S=()=>{if(s=null,o||!n||!b)return;let e=w.getScene();if(!e)return;let f=Math.max(1,Math.round(r*a)),p=Math.max(1,Math.round(i*a));if(t.width!==f&&(t.width=f),t.height!==p&&(t.height=p),_=``,l!==e.model){l=e.model;let t=y(e.model,m(e.theme),e=>d.series[e]?.stack);t!==u&&(u=t,h={x:je(e.model.base.x),y:je(e.model.base.y)},c=M(e.model,h,++g))}Ne(n,e,c,h,a,b),_=``},C=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(S):x.requestAnimationFrame?x.requestAnimationFrame(S):setTimeout(S,16))},w=Ee({options:e.options,theme:e.theme,measureText:v,onInvalidate:C});w.setSize(r,i);let T=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>{d=e,w.setOptions(e)},setTheme:e=>w.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),w.setSize(e,t),C()},render(){s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),S()},touchStart(e){e.forEach((e,t)=>w.pointerDown(e.x,e.y,T(e,t)))},touchMove(e){e.forEach((e,t)=>w.pointerMove(e.x,e.y,T(e,t)))},touchEnd(e){e.forEach((e,t)=>w.pointerUp(e.x,e.y,T(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>w.pointerCancel(T(e,t)))},pointerDown:(e,t,n)=>w.pointerDown(e,t,n),pointerMove:(e,t,n)=>w.pointerMove(e,t,n),pointerUp:(e,t,n)=>w.pointerUp(e,t,n),pointerLeave:()=>w.pointerLeave(),zoomAt:(e,t,n)=>w.zoomAt(e,t,n),resetZoom:()=>w.resetZoom(),getView:()=>w.getView(),setView:e=>w.setView(e),toggleSeries:e=>w.toggleSeries(e),clearHover:()=>w.clearHover(),getPlotRect:()=>w.getPlotRect(),toPixel:(e,t)=>w.toPixel(e,t),fromPixel:(e,t)=>w.fromPixel(e,t),getController:()=>w,on:(e,t)=>w.on(e,t),destroy(){o||(o=!0,s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),b?.destroy(),w.destroy())}}}})))()}function Ie(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,r=(0,K.useRef)(null),[i,o]=(0,K.useState)(`…`),[s,c]=(0,K.useState)(null),l=new Intl.NumberFormat(n,{notation:`compact`});(0,K.useEffect)(()=>{let t=r.current;if(!t)return;let i=new Intl.NumberFormat(n,{notation:`compact`}),a=f(t,{series:[{name:e(`downloads`),type:`bar`,data:Re.map((e,t)=>[e,ze[t]])}],yAxis:{format:e=>i.format(e)},ariaLabel:e(`downloadsAria`)}),s=!0;a.ready.then(t=>{s&&o(t??e(`unsupported`))});let l=a.on(`click`,c);return()=>{s=!1,l(),a.destroy()}},[e,n]);let u=s?.items[0],d=s&&u?e(`downloadsStatus`,{release:s.xLabel,downloads:l.format(u.y)}):e(`clickBar`);return(0,Le.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Le.jsx)(`div`,{ref:r,style:{height:300}}),(0,Le.jsxs)(`p`,{role:`status`,children:[e(`rendererLabel`,{renderer:i}),` · `,d]})]})}var K,Le,Re,ze;function Be(){return(Be=e((()=>{K=t(),o(),x(),Le=n(),Re=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],ze=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function Ve(){let e=(0,q.useRef)(null),t=(0,q.useRef)(null),{t:n,i18n:r}=a(`common`,{keyPrefix:`docs.chart-engine.data`}),i=r.language,[o,s]=(0,q.useState)(null);(0,q.useEffect)(()=>{let r=e.current;if(!r)return;let a=new Intl.DateTimeFormat(i,{month:`short`}),o=Ue.map((e,t)=>a.format(new Date(2026,t,1))),c=new Intl.NumberFormat(i,{notation:`compact`}),l=()=>r.getBoundingClientRect(),u=Pe({canvas:r,width:l().width,height:l().height,pixelRatio:window.devicePixelRatio||1,theme:Ke(r),options:{series:[{name:n(`visits`),type:`area`,data:o.map((e,t)=>[e,Ue[t]])},{name:n(`signupsTimes10`),type:`line`,data:o.map((e,t)=>[e,We[t]*10])}],yAxis:{format:e=>c.format(e)},crosshair:!0,ariaLabel:n(`visitsAria`)}});t.current=u;let d=u.on(`click`,e=>{let t=e.items[0];t&&s(`${e.xLabel}: ${c.format(t.y)} (${t.seriesName})`)}),f=u.on(`plotClick`,()=>s(null)),p=new ResizeObserver(()=>{let{width:e,height:t}=l();u.resize(e,t,window.devicePixelRatio||1)});p.observe(r);let m=new MutationObserver(()=>u.setTheme(Ke(r)));return m.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{d(),f(),p.disconnect(),m.disconnect(),u.destroy(),t.current=null}},[n,i]);let c=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,He.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,He.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":n(`visitsAria`),style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...c(e)),onPointerMove:e=>t.current?.pointerMove(...c(e)),onPointerUp:e=>t.current?.pointerUp(...c(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,He.jsx)(`p`,{role:`status`,children:o??n(`clickPoint`)})]})}var q,He,Ue,We,Ge,Ke;function qe(){return(qe=e((()=>{q=t(),o(),Fe(),He=n(),Ue=[4200,5100,4800,6900,7400,8800,8100,9600],We=[310,420,380,560,610,790,720,880],Ge=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],Ke=e=>{let t=getComputedStyle(e),n={};for(let e of Ge){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function Je(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,r=(0,J.useRef)(null),i=(0,J.useRef)(null),[o,s]=(0,J.useState)(`pie`),[l,u]=(0,J.useState)(null),d=(0,J.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,J.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),p=(0,J.useMemo)(()=>{let t=new Intl.NumberFormat(n,{notation:`compact`}),r=Ye.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),i={format:e=>d.format(e),percentFormat:e=>f.format(e)};return{pie:{type:`pie`,data:r,ariaLabel:e(`sourcesAria`),...i},donut:{type:`pie`,data:r,innerRadius:.62,padAngle:2,cornerRadius:4,centerValue:t.format(9800),centerLabel:e(`visitsLabel`),labels:`none`,ariaLabel:e(`sourcesAria`),...i},funnel:{type:`funnel`,data:Xe.map(({key:t,value:n})=>({name:e(`stages.${t}`),value:n})),ariaLabel:e(`funnelAria`),...i}}},[e,n,d,f]),m=(0,J.useRef)(p);(0,J.useEffect)(()=>{m.current=p}),(0,J.useEffect)(()=>{let e=r.current;if(!e)return;let t=ae(e,m.current.pie);i.current=t;let n=t.on(`click`,u);return()=>{n(),t.destroy(),i.current=null}},[]),(0,J.useEffect)(()=>{i.current?.setOptions(p[o])},[p,o]);let h=e=>{s(e),u(null)};return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Y.jsx)(`div`,{style:{display:`flex`,gap:8},children:Ze.map(t=>(0,Y.jsx)(c,{size:`small`,variant:o===t?`solid`:`outline`,"aria-pressed":o===t,onClick:()=>h(t),children:e(`views.${t}`)},t))}),(0,Y.jsx)(`div`,{ref:r,style:{height:300}}),(0,Y.jsx)(`p`,{role:`status`,children:l?e(`picked`,{name:l.name,value:d.format(l.value),share:f.format(l.percent)}):e(`clickShape`)})]})}var J,Y,Ye,Xe,Ze;function Qe(){return(Qe=e((()=>{J=t(),o(),s(),z(),Y=n(),Ye=[{key:`search`,value:4200},{key:`direct`,value:2600},{key:`social`,value:1500},{key:`email`,value:900},{key:`referral`,value:600}],Xe=[{key:`visits`,value:9800},{key:`signups`,value:3100},{key:`trials`,value:1400},{key:`customers`,value:520}],Ze=[`pie`,`donut`,`funnel`]})))()}function $e(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function et(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,r=(0,X.useRef)(null),i=(0,X.useRef)(null),o=(0,X.useRef)([]),s=(0,X.useRef)($e(17)),[l,u]=(0,X.useState)(!1),[d,p]=(0,X.useState)(0),m=(0,X.useRef)(null);(0,X.useEffect)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`}),r={cpu:e(`cpu`),seconds:e(`seconds`),aria:e(`cpuAria`),percent:e=>t.format(e/100)};m.current=r,i.current?.setOptions(Q(o.current,r))},[e,n]),(0,X.useEffect)(()=>{let e=r.current;if(!e)return;let t=$e(17);s.current=t;let n=[];for(let e=0;e<20;e++)n.push(nt(t,n[e-1]));o.current=n;let a=f(e,Q(n,m.current??tt));return i.current=a,p(n.length),()=>{a.destroy(),i.current=null}},[]),(0,X.useEffect)(()=>{if(l)return;let e=setInterval(()=>{let e=o.current,t=[...e.slice(-119),nt(s.current,e[e.length-1])];o.current=t,i.current?.setOptions(Q(t,m.current??tt)),p(e=>e+1)},500);return()=>clearInterval(e)},[l]);let h=new Intl.NumberFormat(n);return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Z.jsx)(`div`,{ref:r,style:{height:300,width:`100%`}}),(0,Z.jsx)(c,{variant:`outline`,onClick:()=>u(e=>!e),children:e(l?`resume`:`pause`)}),(0,Z.jsx)(`p`,{role:`status`,children:e(l?`pausedStatus`:`streamingStatus`,{points:h.format(d)})})]})}var X,Z,tt,nt,Q;function rt(){return(rt=e((()=>{X=t(),o(),s(),x(),Z=n(),tt={cpu:``,seconds:``,aria:``,percent:String},nt=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},Q=(e,t)=>({series:[{name:t.cpu,type:`area`,data:e,opacity:.2}],xAxis:{title:t.seconds},yAxis:{min:0,max:100,format:t.percent},interaction:!1,ariaLabel:t.aria})})))()}var it;function at(){return(at=e((()=>{it=`import { useEffect, useRef, useState } from "react";
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
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useEffect, useRef, useState, type PointerEvent } from "react";
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
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useEffect, useRef, useState } from "react";
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
`})))()}var $,ft,pt;function mt(){return(mt=e((()=>{Be(),qe(),Qe(),rt(),at(),st(),lt(),dt(),t(),o(),ye(),r(),xe(),$=n(),ft=ve(Object.assign({"./demos/basic.tsx":Ie,"./demos/canvas.tsx":Ve,"./demos/shapes.tsx":Je,"./demos/streaming.tsx":et}),Object.assign({"./demos/basic.tsx":it,"./demos/canvas.tsx":ot,"./demos/shapes.tsx":ct,"./demos/streaming.tsx":ut})),pt=()=>{let{t:e}=a(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:i.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:i.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:i.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:i.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:i.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(be,{id:`chart-engine`,demos:ft,intro:t})}})))()}mt();export{pt as default};