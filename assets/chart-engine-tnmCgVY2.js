import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,r as c}from"./DemoBlock-DWXf3cPy.js";import{B as l,Et as u,F as d,Ft as f,G as p,H as m,It as h,J as g,K as _,P as v,Q as y,R as b,St as x,Tt as S,U as C,V as w,W as T,X as E,Y as D,Z as O,at as k,ct as A,et as ee,ht as j,it as M,kt as te,nt as ne,ot as N,pt as P,q as re,st as ie,tt as F,wt as I,xt as ae,yt as oe,z as se}from"./angular-preview-B1BAcKsg.js";import{C as ce,I as L,L as R,S as le,_ as ue,a as z,b as de,c as fe,d as pe,g as me,h as he,m as ge,n as B,o as _e,p as ve,s as ye,t as be,u as xe,v as Se,w as Ce,x as we,y as V}from"./angular-preview-drjFdhsq.js";import{C as Te,O as Ee,S as De,b as Oe,v as ke,w as Ae,x as je}from"./angular-preview-BOXOhc0i.js";import{l as Me,n as Ne,t as Pe,u as Fe}from"./DocPage-4JD4uRu8.js";var H,Ie,Le,Re,U,ze,W,Be,G,Ve,He;function Ue(){return(Ue=e((()=>{f(),j(),ie(),I(),F(),C(),se(),V(),Ae(),Oe(),H=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),Ie=6,Le=10,Re=320,U=20,ze=e=>{let t=e.options,n=e.theme,r=Ee(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},u=!1,d=0,f=0,h=[],v=[],b=null,C=!0,w=``,T=!1,k=null,A=new Map,j=null,M={time:0,x:0,y:0},N=(e,t)=>{o[e]?.forEach(e=>e(t))},P=()=>{C=!0,T||e.onInvalidate?.()},ie=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1}},F=(t,n=r.fontSize,i=400)=>e.measureText(t,_(r,n,i)),I=()=>{s=D(t,r,a,i);let{base:e,minSpan:n}=s;u?(c={x:s.zoom.x?ke(c.x,e.x,n.x):[...e.x],y:s.zoom.y?ke(c.y,e.y,n.y):[...e.y]},u=!De(c.x,e.x)||!De(c.y,e.y)):c=H(e),h=ue(t.annotations,r,s.y.type===`log`?Math.log10:void 0,s.x.type===`log`?Math.log10:void 0),v=xe(t.dependencies,r),k&&(k.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||z(null)),P()},ae=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!Se(e,s,n))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=ve(s);if(a){let e=a.labels[0]?.text??``,t=a.labels[a.labels.length-1]?.text??``,n=Math.max(60,Math.min(160,d*.32)),r=d-4-F(t,11)-8,o=r-n,s=(i===`bottom`?f-U:0)+U/2;return{entries:[],colors:{bar:{x:o,y:s-4,width:n,height:8},stops:a.stops,labels:[{text:e,x:o-8,y:s,align:`right`},{text:t,x:r+8,y:s,align:`left`}],ticks:a.labels.filter(e=>e.at>0&&e.at<1).map(e=>o+e.at*n),caret:null},position:i,toggle:!1,height:26}}let o=[],c=4,l=0;for(let e of s.series){let t=14+F(e.name,12)+8;c+t>d-4&&c>4&&(c=4,l++),o.push({id:e.id,name:e.name,color:e.colorCss,shape:le(e.type),hidden:e.hidden,box:{x:c,y:l*U,width:t,height:U}}),c+=t+10}let u=(l+1)*U+6;if(i===`bottom`)for(let e of o)e.box.y+=f-u+6;return{entries:o,colors:null,position:i,toggle:r.toggle??!0,height:u}},oe=(e,n,r)=>{let i=t.tooltip;if(i===!1)return null;let a=typeof i==`object`?i.render:void 0,o=null;if(a){let t=a(e);if(t===null||t===``)return null;typeof t==`string`&&(o=t.split(`
`))}let c=Ce(s,e,b?.layout.yTicks??null,b?.layout.y2Ticks??null),l=0,u,p=c.rows.some(e=>e.color)?14:0;if(o){for(let e of o)l=Math.max(l,F(e,12));u=o.length}else{l=F(c.title,12,600)+(c.titleColor?14:0),c.subtitle&&(l=Math.max(l,F(c.subtitle,11)+(c.titleColor?14:0)));let e=0,t=0;for(let n of c.rows)e=Math.max(e,F(n.name,12)),t=Math.max(t,F(n.value,12,600));c.rows.length&&(l=Math.max(l,p+e+16+t)),u=1+ +!!c.subtitle+c.rows.length}let m=Math.ceil(Math.max(l,96)+16+4),h=u*18+16,g=n+14;g+m>d-4&&(g=n-14-m),g=Math.max(4,Math.min(g,d-m-4));let _=Math.max(4,Math.min(r-h/2,f-h-4));return{content:c,text:o,box:{x:g,y:_,width:m,height:h},lineHeight:18,padding:8,swatchWidth:p}},se=()=>{if(d<=0||f<=0)return null;let e=ae(),n=e?.position===`top`?e.height:0,i=fe({model:s,view:c,theme:r,width:d,height:f-(e?.height??0),padding:t.padding,top:n,measure:e=>F(e)}),a=we(s,c,i.scales,i.yTicks),o=[],u=r.fontSize+4;for(let e of h){if(e.type===`text`&&e.text){o.push(l(e,i.scales,F(e.text,r.fontSize,e.weight),u));continue}if(e.type!==`rect`||!e.label)continue;let t=p(e,i.scales);if(t.width<=0||t.height<=0)continue;let n=F(e.label,r.fontSize+1,600),a=e.labelPosition;o.push({x:a.endsWith(`left`)?t.x+10:a.endsWith(`right`)?t.x+t.width-10-n:t.x+(t.width-n)/2,y:a.startsWith(`top`)?t.y+10:a.startsWith(`bottom`)?t.y+t.height-10-u:t.y+(t.height-u)/2,width:n,height:u})}let g=m(a,i.plot,e=>F(e),u-2,o),_={width:d,height:f,theme:r,model:s,view:H(c),layout:i,annotations:h,pointLabels:g,legend:e,hover:null,dragging:null,connectors:he(s,i.scales),arrows:ce(s,i.scales,v)};if(b=_,k){let n=de(s,i.scales,k.event,t.crosshair),r=i.scales.horizontal;_.hover={event:k.event,marks:ge(s,i.scales,k.event),crosshairX:r?null:n,crosshairY:r?n:null,tooltip:j?.kind===`pan`||j?.kind===`point`?null:oe(k.event,k.x,k.y)};let a=e?.colors,o=k.event.items[0],c=o?s.series[o.seriesIndex]:void 0;a&&o&&c?.type===`heatmap`&&o.value!==void 0&&(a.caret=a.bar.x+ee(c,o.value)*a.bar.width)}if(j?.kind===`point`){let e=s.series[j.item.seriesIndex];_.dragging={x:j.x,y:j.y,color:j.item.color,size:(e?ye(e,j.item.index):8)+6}}let y=i.plot,x=`${y.x},${y.y},${y.width},${y.height}`;return x!==w&&(w=x,N(`layout`,{...y})),_},L=()=>((C||!b)&&(C=!1,b=se()),b),R=()=>L()?.layout.scales??null,z=e=>{let t=!pe(k?.event??null,e?.event??null);k=e,P(),t&&N(`hover`,e?e.event:null)},B=(e,t,n)=>{let r=R();return r?me(s,r,b?.layout.xTicks??null,e,t,n?8:0):null},_e=(e,t)=>{let n=R()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},be=(e,t)=>{let n=R();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t)),o=S(n,i,a);return{x:O(s,o.x),y:ne(s,o.y)}},V=(e,t)=>{let{base:n,minSpan:r}=s;c={x:ke(e.x,n.x,r.x),y:ke(e.y,n.y,r.y)},u=!De(c.x,n.x)||!De(c.y,n.y),t&&N(`zoom`,y(s,c)),P()},Oe=(e,t,n)=>{let r=R();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=H(c),a=S(r,e,t);s.zoom.x&&(i.x=Te(c.x,a.x,n)),s.zoom.y&&(i.y=Te(c.y,a.y,n)),V(i,!0)},Ae=()=>{u&&V(H(s.base),!0)},Me=(e,t)=>L()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,Ne=e=>{a.has(e)?a.delete(e):a.add(e),I()},Pe=()=>{let[e,t]=[...A.values()];j={kind:`pinch`,view:H(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},z(null)};return s=D(t,r,a,i),I(),{setOptions(e){if(T)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=Ee(n,t.palette)),I()},setTheme(e){T||(n=e,r=Ee(n,t.palette),I())},setSize(e,t){(e!==d||t!==f)&&(d=Math.max(0,e),f=Math.max(0,t),P())},getScene:L,pointerDown:(e,t,n={})=>{if(T)return;let r=n.id??0,i=!!n.touch;A.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=ie();if(A.size===2){a&&(s.zoom.x||s.zoom.y)&&j?.kind!==`point`&&Pe();return}if(A.size>2||!a){if(!a&&i){let n=B(e,t,!0);z(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=B(e,t,i)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){j={kind:`point`,item:n,x:e,y:t};return}}if(u&&a.pan&&_e(e,t)){j={kind:`pan`,view:H(c),x:e,y:t};return}if(j=null,i){let n=B(e,t,!0);z(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(T)return;let r=n.id??0,i=A.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?Le:Ie)&&(i.moved=!0)),j?.kind===`pinch`&&A.size>=2){let[e,t]=[...A.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=R();if(!a)return;let o=x(a.plot,j.view,s.x.reverse,s.y.reverse,s.horizontal),c=j.distance/n,l=H(j.view),u=S(o,j.midX,j.midY),d=S(o,r,i);s.zoom.x&&(l.x=Te(j.view.x,u.x,c),l.x=je(l.x,(u.x-d.x)*c)),s.zoom.y&&(l.y=Te(j.view.y,u.y,c),l.y=je(l.y,(u.y-d.y)*c)),V(l,!0);return}if(j?.kind===`point`&&i){if(!i.moved)return;j.x=e,j.y=t;let n=be(e,t);P(),n&&N(`drag`,{item:j.item,x:n.x,y:n.y});return}if(j?.kind===`pan`&&i){if(!i.moved)return;let n=R();if(!n)return;let r=H(j.view),a=S(n,j.x,j.y),o=S(n,e,t);s.zoom.x&&(r.x=je(j.view.x,a.x-o.x)),s.zoom.y&&(r.y=je(j.view.y,a.y-o.y)),V(r,!0);return}if(!(A.size>1)&&(!i||i.touch||!n.touch)){let r=B(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&z(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(T)return;let r=n.id??0,i=A.get(r);A.delete(r);let a=j;if(a?.kind===`pinch`){A.size<2&&(j=null);return}if(j=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=be(e,t);P(),n&&N(`drop`,{item:a.item,x:n.x,y:n.y});return}}else if(a?.kind===`pan`&&i.moved){P();return}if(i.moved){i.touch&&P();return}let o=Date.now();if(i.touch&&o-M.time<Re&&Math.hypot(e-M.x,t-M.y)<24&&u){M={time:0,x:e,y:t},Ae();return}M={time:o,x:e,y:t};let s=Me(e,t);if(s){L()?.legend?.toggle&&Ne(s.id);return}let c=B(e,t,i.touch);if(c){i.touch&&z({event:c,x:e,y:t}),N(`click`,c);return}if(i.touch&&z(null),_e(e,t)){let n=be(e,t);n&&N(`plotClick`,n)}},pointerCancel:(e={})=>{A.delete(e.id??0),(j?.kind===`point`||A.size<2)&&(j=null),P()},pointerLeave(){!j&&k&&z(null)},zoomAt:Oe,resetZoom:Ae,getView:()=>y(s,c),setView(e){T||V(g(s,e,c),!1)},toggleSeries:Ne,clearHover(){k&&z(null)},getPlotRect(){let e=L()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=R();return n?te(n,E(s,e),re(s,t)):null},fromPixel(e,t){let n=R();if(!n)return null;let r=S(n,e,t);return{x:O(s,r.x),y:ne(s,r.y)}},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){T=!0,A.clear();for(let e of Object.keys(o))delete o[e]}}},W=(e,t,n,r)=>{if(!n)return[0,t];let[i,a]=r[0]<=r[1]?r:[r[1],r[0]];return[Math.max(0,h(e,t,i)-1),Math.min(t,h(e,t,a)+1)]},Be={heatmap:0,area:1,bar:2,boxplot:2,candlestick:3,line:4,scatter:5},G=(e,t)=>{if(!e.horizontal)return t;let n=Array(t.length);for(let e=0;e<t.length;e+=4)n[e]=t[e+1],n[e+1]=t[e],n[e+2]=t[e+3],n[e+3]=t[e+2];return n},Ve=(e,t={})=>{let{model:n,view:r,layout:i}=e,a=i.scales,{plot:o}=i,s=a.horizontal,c=t.maxDots??4e3,l=t.maxBars??2e3,d=Math.max(1,t.columnWidth??1),f=s?o.y:o.x,p=f+(s?o.height:o.width),m=[],h=n.series.filter(e=>!e.hidden&&e.cols.count>0).sort((e,t)=>Be[e.type]-Be[t.type]||e.index-t.index);for(let e of h){let{x:i,y:h,count:g,sorted:_}=e.cols;if(e.type===`line`||e.type===`area`){let[t,o]=W(i,g,_,r.x),c=e.stackTop??h,l=A(i,c,t,o,e.curve),u=e.stackBase?A(i,e.stackBase,t,o,e.curve).points:null,v=l.length,y=l.points,x=u;if(_&&v>(p-f)*2/d){if(u){let e=b(y,0,v,e=>a.xToPx(e)/d),t=new Float64Array(e.length*2),n=new Float64Array(e.length*2),r=0,i=0;for(let a=0;a<e.length;a++){let o=e.points[a*2];for(;i<v-1&&y[i*2]<o;)i++;t[r*2]=o,t[r*2+1]=e.points[a*2+1],n[r*2]=o,n[r*2+1]=u[i*2+1],r++}y=t,x=n,v=r}else{let e=b(y,0,v,e=>a.xToPx(e)/d);y=e.points,v=e.length}}let S=e.type===`area`&&!!e.cols.y0&&!!x,C=[],w=[],T=[],E=[],D=[],O=[],k=()=>{E.length&&(C.push(E),w.push(D),S&&T.push(O)),E=[],D=[],O=[]};for(let e=0;e<v;e++){let t=y[e*2],n=y[e*2+1],r=x?x[e*2+1]:0;if(!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(r)){k();continue}let i=te(a,t,n);if(E.push(i.x,i.y),x&&D.push(a.yToPx(r)),S){let e=te(a,t,r);O.push(e.x,e.y)}}if(k(),e.type===`area`&&m.push({kind:`area`,seriesIndex:e.index,color:e.colorCss,opacity:e.opacity,baseline:a.yToPx(n.baseline),segments:C,...x?{bottoms:w}:{},...s?{horizontal:!0}:{}}),e.lineWidth>0){let t=e.type===`area`?Math.min(e.lineWidth,2):e.lineWidth;m.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:C}),S&&m.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:T})}continue}if(e.type===`bar`&&e.barBase&&e.barTop){let[t,n]=W(i,g,_,r.x),o=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),.5),s=[],c=[],u=n-t>l,d=NaN;for(let r=t;r<n;r++){let t=e.barBase[r],n=e.barTop[r];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let l=a.xToPx(i[r]+e.barOffset);if(l+o<f||l-o>p)continue;let m=a.yToPx(t),h=a.yToPx(n),g=Math.min(m,h),_=Math.max(1,Math.abs(m-h)),v=Math.floor(l);if(u&&v===d&&s.length){let e=s.length-4,t=Math.max(s[e+1]+s[e+3],g+_);s[e+1]=Math.min(s[e+1],g),s[e+3]=t-s[e+1];continue}d=v,s.push(l-o,g,o*2,_);let y=e.pointColors?.[r];c.push(y?P(y):e.colorCss)}m.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:G(a,s),...e.pointColors?{colors:c}:{},radius:e.radius,...e.opacity<1?{opacity:e.opacity}:{}});continue}if(e.type===`boxplot`){m.push(...He(e,a,r.x,f,p,l));continue}if(e.type===`candlestick`){let[t,n]=W(i,g,_,r.x),{open:o,high:s,low:c}=e.cols,u=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),1),d=P(e.upColor),v=P(e.downColor),y=[],b=[],x=[],S=[],C=Math.max(1,Math.ceil((n-t)/l));for(let e=t;e<n;e+=C){let t=h[e],n=o?o[e]:t;if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=a.xToPx(i[e]);if(r+u<f||r-u>p)continue;let l=t<n?v:d,m=a.yToPx(s?s[e]:Math.max(n,t)),g=a.yToPx(c?c[e]:Math.min(n,t));y.push(r-.5,Math.min(m,g),1,Math.abs(g-m)),x.push(l);let _=a.yToPx(n),C=a.yToPx(t);b.push(r-u,Math.min(_,C),u*2,Math.max(1,Math.abs(_-C))),S.push(l)}m.push({kind:`bars`,seriesIndex:e.index,color:d,rects:G(a,y),colors:x},{kind:`bars`,seriesIndex:e.index,color:d,rects:G(a,b),colors:S,radius:1});continue}if(e.type===`heatmap`){let t=Math.abs(e.cellHalf.x/a.xPerPx),n=Math.abs(e.cellHalf.y/a.yPerPx),r=[],s=[],c=u(t*2,n*2,e.radius),d=c.inset;for(let c=0;c<g&&r.length/4<l*4;c++){let l=e.cellColors?.[c];if(!l)continue;let u=ae(a,a.xToPx(i[c])-t,a.xToPx(i[c])+t,a.yToPx(h[c])-n,a.yToPx(h[c])+n);u.x+u.width<o.x||u.x>o.x+o.width||u.y+u.height<o.y||u.y>o.y+o.height||(r.push(u.x+d,u.y+d,u.width-d*2,u.height-d*2),s.push(P(oe(l))))}m.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:r,colors:s,radius:c.radius});continue}let v=[],y=[],x=t=>{let n=e.pointColors?.[t];return n?P(n):e.colorCss},S=[],C=[];for(let e=0;e<g;e++){let t=i[e],n=h[e];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=te(a,t,n);r.x<o.x||r.x>o.x+o.width||r.y<o.y||r.y>o.y+o.height||(S.push(e),C.push(r.x,r.y))}if(S.length>c){let n=Math.max(2,t.dotCell??e.pointSize*.8),r=Math.ceil(o.width/n)+1,i=new Map;S.forEach((e,t)=>{let a=Math.floor((C[t*2]-o.x)/n),s=Math.floor((C[t*2+1]-o.y)/n);i.set(s*r+a,e)});for(let[e,t]of i)v.push(o.x+(e%r+.5)*n,o.y+(Math.floor(e/r)+.5)*n,n),y.push(x(t))}else S.forEach((t,n)=>{v.push(C[n*2],C[n*2+1],ye(e,t)),y.push(x(t))});m.push({kind:`dots`,seriesIndex:e.index,opacity:e.opacity,dots:v,colors:y})}return m},He=(e,t,n,r,i,a)=>{let{x:o,y:s,count:c,sorted:l,high:u,low:d,q1:f,q3:p,outliers:m}=e.cols,[h,g]=W(o,c,l,n),_=Math.max(e.barHalfWidth/Math.abs(t.xPerPx),1),v=Math.max(1,e.lineWidth),y=[],b=[],x=[],S=[],C=[],w=[],T=Math.max(1,Math.ceil((g-h)/a)),E=(e,t,n)=>{b.push(e-v/2,Math.min(t,n),v,Math.abs(t-n))},D=(e,t,n,r=v)=>{b.push(e-t,n-r/2,t*2,r)};for(let n=h;n<g;n+=T){let a=s[n];if(!Number.isFinite(a))continue;let c=t.xToPx(o[n]+e.barOffset);if(c+_<r||c-_>i)continue;let l=e.pointColors?.[n],h=l?P(l):e.colorCss,g=t.yToPx(d&&Number.isFinite(d[n])?d[n]:a),T=t.yToPx(u&&Number.isFinite(u[n])?u[n]:a),O=t.yToPx(f&&Number.isFinite(f[n])?f[n]:a),k=t.yToPx(p&&Number.isFinite(p[n])?p[n]:a),A=b.length;y.push(c-_,Math.min(O,k),_*2,Math.abs(O-k)),x.push(h),E(c,g,O),E(c,k,T),E(c-_,O,k),E(c+_,O,k),D(c,_/2,g),D(c,_/2,T),D(c,_,O),D(c,_,k),D(c,_,t.yToPx(a),Math.max(2,v*1.6));for(let e=A;e<b.length;e+=4)S.push(h);let ee=m?.[n];if(ee)for(let n of ee){let r=t.horizontal?{x:t.yToPx(n),y:c}:{x:c,y:t.yToPx(n)};C.push(r.x,r.y,e.outlierSize),w.push(h)}}let O=[{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:G(t,y),colors:x,opacity:e.opacity},{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:G(t,b),colors:S}];return C.length&&O.push({kind:`dots`,seriesIndex:e.index,opacity:e.outlierShape===`hollow`?0:.85,dots:C,colors:w,stroke:1.25}),O}})))()}var We,K,Ge,Ke,qe,Je;function Ye(){return(Ye=e((()=>{j(),M(),C(),R(),z(),Ue(),We=e=>(e[0]+e[1])/2,K=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},Ge=(e,t,n)=>{e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip(),e.lineJoin=`round`,e.lineCap=`round`;for(let n of t)if(n.kind===`area`)e.globalAlpha=n.opacity,e.fillStyle=n.color,n.segments.forEach((t,r)=>{let i=n.bottoms?.[r],a=t.length/2;if(!(a<2)){e.beginPath();for(let n=0;n<a;n++)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n*2],t[n*2+1]);for(let r=a-1;r>=0;r--){let a=i?i[r]:n.baseline;n.horizontal?e.lineTo(a,t[r*2+1]):e.lineTo(t[r*2],a)}e.closePath(),e.fill()}}),e.globalAlpha=1;else if(n.kind===`line`){e.strokeStyle=n.color,e.lineWidth=n.width,e.beginPath();for(let t of n.segments)for(let n=0;n<t.length;n+=2)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n],t[n+1]);e.stroke()}else if(n.kind===`bars`){e.globalAlpha=n.opacity??1;let t=n.radius??0;for(let r=0;r<n.rects.length;r+=4){let[i,a,o,s]=[n.rects[r],n.rects[r+1],n.rects[r+2],n.rects[r+3]];e.fillStyle=n.colors?.[r/4]??n.color;let c=Math.min(t,o/2,s/2);c>.5?(K(e,i,a,o,s,c),e.fill()):e.fillRect(i,a,o,s)}e.globalAlpha=1}else{let t=n.stroke??0;for(let r=0;r<n.dots.length;r+=3){let i=n.colors[r/3]??`#888`,a=n.dots[r+2]/2;e.beginPath(),e.arc(n.dots[r],n.dots[r+1],Math.max(0,a-t/2),0,Math.PI*2),n.opacity>0&&(e.globalAlpha=n.opacity,e.fillStyle=i,e.fill()),t>0&&(e.globalAlpha=1,e.lineWidth=t,e.strokeStyle=i,e.stroke())}e.globalAlpha=1}e.restore()},Ke=(e,t,n)=>{let{theme:r}=n,{bar:i,stops:a}=t,o=a.length;if(typeof e.createLinearGradient==`function`){let t=e.createLinearGradient(i.x,0,i.x+i.width,0);a.forEach((e,n)=>t.addColorStop(n/Math.max(1,o-1),e)),e.fillStyle=t,K(e,i.x,i.y,i.width,i.height,i.height/2),e.fill()}else{let t=i.width/o;a.forEach((n,r)=>{e.fillStyle=n,e.fillRect(i.x+r*t,i.y,t+.5,i.height)})}e.fillStyle=P(r.text,.35);for(let n of t.ticks)e.fillRect(Math.round(n),i.y-2,1,i.height+4);e.font=_(r,11),e.textBaseline=`middle`,e.fillStyle=P(r.textMuted);for(let n of t.labels)e.textAlign=n.align,e.fillText(n.text,n.x,n.y);t.caret!==null&&(K(e,t.caret-2,i.y-3,4,i.height+6,2),e.fillStyle=P(r.text),e.fill(),e.lineWidth=1.5,e.strokeStyle=P(r.background),e.stroke())},qe=(e,t,n,r,i,a=L(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),w(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,y2:l.y2,y2Ticks:d.y2Ticks,theme:c,annotations:t.annotations});let h=t.legend?.colors;if(h&&Ke(e,h,t),t.legend){e.font=_(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=P(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}for(let n of t.hover?.marks??[])n.kind===`band`&&(K(e,n.x,n.y,n.width,n.height,6),e.fillStyle=P(c.text,.06),e.fill());p.horizontal?Ge(e,Ve(t),f):g();function g(){let e=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[t,i]=e(u.x,r.x,l.x.reverse),[o,s]=e(u.y,r.y,l.y.reverse);a.paint(n,{transform:{xScale:t,xOffset:i,yScale:o,yOffset:s},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m))}e.setTransform(m,0,0,m,0,0);for(let n of t.hover?.marks??[])n.kind===`guide`&&(e.fillStyle=P(c.text,.06),e.fillRect(n.x,n.y,n.width,n.height));if(T(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1,connectors:t.connectors,arrows:t.arrows}),t.pointLabels.length){e.save(),e.font=_(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=P(c.background,.9),e.fillStyle=P(c.text,.85);for(let{label:n,box:r}of t.pointLabels)e.strokeText(n.text,r.x,r.y+r.height/2),e.fillText(n.text,r.x,r.y+r.height/2);e.restore()}let v=t.hover;if(v){if(v.crosshairX!==null){e.save(),e.strokeStyle=P(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(v.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}if(v.crosshairY!==null){e.save(),e.strokeStyle=P(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(v.crosshairY)+.5;e.moveTo(f.x,t),e.lineTo(f.x+f.width,t),e.stroke(),e.restore()}for(let t of v.marks)if(t.kind!==`band`&&t.kind!==`guide`){if(t.kind===`cell`){let n=Math.min(3,t.width*.06,t.height*.06),r=Math.max(2,t.radius);e.save(),e.shadowColor=`rgba(15, 23, 42, 0.4)`,e.shadowBlur=12,e.shadowOffsetY=4,K(e,t.x-n,t.y-n,t.width+n*2,t.height+n*2,r),e.fillStyle=t.color,e.fill(),e.restore();let i=Math.min(2.75,t.width/5,t.height/5);t.width>8&&t.height>8&&(K(e,t.x+i,t.y+i,t.width-i*2,t.height-i*2,Math.max(1,r-i/2)),e.lineWidth=1.5,e.strokeStyle=t.ring,e.stroke());continue}e.beginPath(),e.arc(t.x,t.y,t.size/2+4,0,Math.PI*2),e.fillStyle=t.halo,e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=P(c.background),e.stroke()}}if(t.dragging){let n=t.dragging;e.beginPath(),e.arc(n.x,n.y,n.size/2,0,Math.PI*2),e.fillStyle=n.color,e.globalAlpha=.85,e.fill(),e.globalAlpha=1,e.lineWidth=2,e.strokeStyle=P(c.background),e.stroke()}let y=v?.tooltip;if(y){let{box:t,lineHeight:n,padding:r}=y;e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,K(e,t.x,t.y,t.width,t.height,8),e.fillStyle=P(c.background),e.fill(),e.restore(),K(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=P(c.axis,.6),e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let i=t.y+r+n/2,a=t.x+r+2,o=t.x+t.width-r-2;if(y.text){e.font=_(c,12),e.fillStyle=P(c.text),e.textAlign=`left`;for(let t of y.text)e.fillText(t,a,i),i+=n}else{let{content:t}=y,r=a;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=_(c,12,600),e.fillStyle=P(c.text),e.textAlign=`left`,e.fillText(t.title,r,i),i+=n,t.subtitle&&(e.font=_(c,11),e.fillStyle=P(c.textMuted),e.fillText(t.subtitle,r,i-2),i+=n);for(let s of t.rows)r=a,s.color&&(e.fillStyle=s.color,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill()),r+=y.swatchWidth,e.font=_(c,12),e.textAlign=`left`,e.fillStyle=P(c.textMuted),e.fillText(s.name,r,i),e.font=_(c,12,600),e.textAlign=`right`,e.fillStyle=P(c.text),e.fillText(s.value,o,i),i+=n}}},Je=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u=``,d=``,f=e.options,p=new WeakMap,m=0,h=e=>{let t=p.get(e);return t===void 0&&p.set(e,t=++m),t},g={x:0,y:0},_=0,v=``,y=(e,t)=>n?(t!==v&&(n.font=t,v=t),n.measureText(e).width):e.length*6.5,b=n?L(n):null,x=globalThis,S=()=>{if(s=null,o||!n||!b)return;let e=w.getScene();if(!e)return;let p=Math.max(1,Math.round(r*a)),m=Math.max(1,Math.round(i*a));t.width!==p&&(t.width=p),t.height!==m&&(t.height=m),v=``,l!==e.model&&(l=e.model,u=_e(e.model,h(e.theme),e=>f.series[e]?.stack));let y=e.layout.scales,x={x:1/Math.abs(y.xPerPx),y:1/Math.abs(y.yPerPx)},S=`${u}|${k(e.model,x)}`;S!==d&&(d=S,g={x:We(e.model.base.x),y:We(e.model.base.y)},c=N(e.model,g,++_,x)),qe(n,e,c,g,a,b),v=``},C=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(S):x.requestAnimationFrame?x.requestAnimationFrame(S):setTimeout(S,16))},w=ze({options:e.options,theme:e.theme,measureText:y,onInvalidate:C});w.setSize(r,i);let T=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>{f=e,w.setOptions(e)},setTheme:e=>w.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),w.setSize(e,t),C()},render(){s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),S()},touchStart(e){e.forEach((e,t)=>w.pointerDown(e.x,e.y,T(e,t)))},touchMove(e){e.forEach((e,t)=>w.pointerMove(e.x,e.y,T(e,t)))},touchEnd(e){e.forEach((e,t)=>w.pointerUp(e.x,e.y,T(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>w.pointerCancel(T(e,t)))},pointerDown:(e,t,n)=>w.pointerDown(e,t,n),pointerMove:(e,t,n)=>w.pointerMove(e,t,n),pointerUp:(e,t,n)=>w.pointerUp(e,t,n),pointerLeave:()=>w.pointerLeave(),zoomAt:(e,t,n)=>w.zoomAt(e,t,n),resetZoom:()=>w.resetZoom(),getView:()=>w.getView(),setView:e=>w.setView(e),toggleSeries:e=>w.toggleSeries(e),clearHover:()=>w.clearHover(),getPlotRect:()=>w.getPlotRect(),toPixel:(e,t)=>w.toPixel(e,t),fromPixel:(e,t)=>w.fromPixel(e,t),getController:()=>w,on:(e,t)=>w.on(e,t),destroy(){o||(o=!0,s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):x.cancelAnimationFrame?x.cancelAnimationFrame(s):clearTimeout(s)),b?.destroy(),w.destroy())}}}})))()}function Xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,q.useRef)(null),[a,o]=(0,q.useState)(`…`),[s,c]=(0,q.useState)(null),l=new Intl.NumberFormat(n,{notation:`compact`});(0,q.useEffect)(()=>{let t=i.current;if(!t)return;let r=new Intl.NumberFormat(n,{notation:`compact`}),a=v(t,{series:[{name:e(`downloads`),type:`bar`,data:Qe.map((e,t)=>[e,$e[t]])}],yAxis:{format:e=>r.format(e)},ariaLabel:e(`downloadsAria`)}),s=!0;a.ready.then(t=>{s&&o(t??e(`unsupported`))});let l=a.on(`click`,c);return()=>{s=!1,l(),a.destroy()}},[e,n]);let u=s?.items[0],d=s&&u?e(`downloadsStatus`,{release:s.xLabel,downloads:l.format(u.y)}):e(`clickBar`);return(0,Ze.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Ze.jsx)(`div`,{ref:i,style:{height:300}}),(0,Ze.jsxs)(`p`,{role:`status`,children:[e(`rendererLabel`,{renderer:a}),` · `,d]})]})}var q,Ze,Qe,$e;function et(){return(et=e((()=>{q=t(),i(),d(),Ze=n(),Qe=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],$e=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function tt(){let e=(0,J.useRef)(null),t=(0,J.useRef)(null),{t:n,i18n:i}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),a=i.language,[o,s]=(0,J.useState)(null);(0,J.useEffect)(()=>{let r=e.current;if(!r)return;let i=new Intl.DateTimeFormat(a,{month:`short`}),o=rt.map((e,t)=>i.format(new Date(2026,t,1))),c=new Intl.NumberFormat(a,{notation:`compact`}),l=()=>r.getBoundingClientRect(),u=Je({canvas:r,width:l().width,height:l().height,pixelRatio:window.devicePixelRatio||1,theme:ot(r),options:{series:[{name:n(`visits`),type:`area`,data:o.map((e,t)=>[e,rt[t]])},{name:n(`signupsTimes10`),type:`line`,data:o.map((e,t)=>[e,it[t]*10])}],yAxis:{format:e=>c.format(e)},crosshair:!0,ariaLabel:n(`visitsAria`)}});t.current=u;let d=u.on(`click`,e=>{let t=e.items[0];t&&s(`${e.xLabel}: ${c.format(t.y)} (${t.seriesName})`)}),f=u.on(`plotClick`,()=>s(null)),p=new ResizeObserver(()=>{let{width:e,height:t}=l();u.resize(e,t,window.devicePixelRatio||1)});p.observe(r);let m=new MutationObserver(()=>u.setTheme(ot(r)));return m.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{d(),f(),p.disconnect(),m.disconnect(),u.destroy(),t.current=null}},[n,a]);let c=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,nt.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,nt.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":n(`visitsAria`),style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...c(e)),onPointerMove:e=>t.current?.pointerMove(...c(e)),onPointerUp:e=>t.current?.pointerUp(...c(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,nt.jsx)(`p`,{role:`status`,children:o??n(`clickPoint`)})]})}var J,nt,rt,it,at,ot;function st(){return(st=e((()=>{J=t(),i(),Ye(),nt=n(),rt=[4200,5100,4800,6900,7400,8800,8100,9600],it=[310,420,380,560,610,790,720,880],at=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],ot=e=>{let t=getComputedStyle(e),n={};for(let e of at){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function ct(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,Y.useRef)(null),a=(0,Y.useRef)(null),[s,c]=(0,Y.useState)(`pie`),[l,u]=(0,Y.useState)(null),d=(0,Y.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,Y.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),p=(0,Y.useMemo)(()=>{let t=new Intl.NumberFormat(n,{notation:`compact`}),r=lt.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),i={format:e=>d.format(e),percentFormat:e=>f.format(e)};return{pie:{type:`pie`,data:r,ariaLabel:e(`sourcesAria`),...i},donut:{type:`pie`,data:r,innerRadius:.62,padAngle:2,cornerRadius:4,centerValue:t.format(9800),centerLabel:e(`visitsLabel`),labels:`none`,ariaLabel:e(`sourcesAria`),...i},funnel:{type:`funnel`,data:ut.map(({key:t,value:n})=>({name:e(`stages.${t}`),value:n})),ariaLabel:e(`funnelAria`),...i}}},[e,n,d,f]),m=(0,Y.useRef)(p);(0,Y.useEffect)(()=>{m.current=p}),(0,Y.useEffect)(()=>{let e=i.current;if(!e)return;let t=be(e,m.current.pie);a.current=t;let n=t.on(`click`,u);return()=>{n(),t.destroy(),a.current=null}},[]),(0,Y.useEffect)(()=>{a.current?.setOptions(p[s])},[p,s]);let h=e=>{c(e),u(null)};return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,X.jsx)(`div`,{style:{display:`flex`,gap:8},children:dt.map(t=>(0,X.jsx)(o,{size:`small`,variant:s===t?`solid`:`outline`,"aria-pressed":s===t,onClick:()=>h(t),children:e(`views.${t}`)},t))}),(0,X.jsx)(`div`,{ref:i,style:{height:300}}),(0,X.jsx)(`p`,{role:`status`,children:l?e(`picked`,{name:l.name,value:d.format(l.value),share:f.format(l.percent)}):e(`clickShape`)})]})}var Y,X,lt,ut,dt;function ft(){return(ft=e((()=>{Y=t(),i(),a(),B(),X=n(),lt=[{key:`search`,value:4200},{key:`direct`,value:2600},{key:`social`,value:1500},{key:`email`,value:900},{key:`referral`,value:600}],ut=[{key:`visits`,value:9800},{key:`signups`,value:3100},{key:`trials`,value:1400},{key:`customers`,value:520}],dt=[`pie`,`donut`,`funnel`]})))()}function pt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function mt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,Z.useRef)(null),a=(0,Z.useRef)(null),s=(0,Z.useRef)([]),c=(0,Z.useRef)(pt(17)),[l,u]=(0,Z.useState)(!1),[d,f]=(0,Z.useState)(0),p=(0,Z.useRef)(null);(0,Z.useEffect)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`}),r={cpu:e(`cpu`),seconds:e(`seconds`),aria:e(`cpuAria`),percent:e=>t.format(e/100)};p.current=r,a.current?.setOptions(_t(s.current,r))},[e,n]),(0,Z.useEffect)(()=>{let e=i.current;if(!e)return;let t=pt(17);c.current=t;let n=[];for(let e=0;e<20;e++)n.push(gt(t,n[e-1]));s.current=n;let r=v(e,_t(n,p.current??ht));return a.current=r,f(n.length),()=>{r.destroy(),a.current=null}},[]),(0,Z.useEffect)(()=>{if(l)return;let e=setInterval(()=>{let e=s.current,t=[...e.slice(-119),gt(c.current,e[e.length-1])];s.current=t,a.current?.setOptions(_t(t,p.current??ht)),f(e=>e+1)},500);return()=>clearInterval(e)},[l]);let m=new Intl.NumberFormat(n);return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Q.jsx)(`div`,{ref:i,style:{height:300,width:`100%`}}),(0,Q.jsx)(o,{variant:`outline`,onClick:()=>u(e=>!e),children:e(l?`resume`:`pause`)}),(0,Q.jsx)(`p`,{role:`status`,children:e(l?`pausedStatus`:`streamingStatus`,{points:m.format(d)})})]})}var Z,Q,ht,gt,_t;function vt(){return(vt=e((()=>{Z=t(),i(),a(),d(),Q=n(),ht={cpu:``,seconds:``,aria:``,percent:String},gt=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},_t=(e,t)=>({series:[{name:t.cpu,type:`area`,data:e,opacity:.2}],xAxis:{title:t.seconds},yAxis:{min:0,max:100,format:t.percent},interaction:!1,ariaLabel:t.aria})})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var xt;function St(){return(St=e((()=>{xt=`import { useEffect, useRef, useState, type PointerEvent } from "react";
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
`})))()}var Ct;function wt(){return(wt=e((()=>{Ct=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var Tt;function Et(){return(Et=e((()=>{Tt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var $,Dt,Ot;function kt(){return(kt=e((()=>{et(),st(),ft(),vt(),bt(),St(),wt(),Et(),t(),i(),Ne(),s(),Fe(),$=n(),Dt=Me(Object.assign({"./demos/basic.tsx":Xe,"./demos/canvas.tsx":tt,"./demos/shapes.tsx":ct,"./demos/streaming.tsx":mt}),Object.assign({"./demos/basic.tsx":yt,"./demos/canvas.tsx":xt,"./demos/shapes.tsx":Ct,"./demos/streaming.tsx":Tt})),Ot=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(Pe,{id:`chart-engine`,demos:Dt,intro:t})}})))()}kt();export{Ot as default};