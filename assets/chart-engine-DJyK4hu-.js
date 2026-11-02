import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CjOVvDRm.js";import{R as a,z as o}from"./ProgressIndicator-DMdtmsv7.js";import{i as s,r as c}from"./DemoBlock-COfkti2e.js";import{$ as l,At as u,B as d,Ct as f,Ft as p,G as m,Gt as h,H as g,K as _,L as v,Nt as y,Ot as b,Pt as x,Q as S,R as C,Rt as w,U as T,V as E,W as D,Wt as O,X as k,Z as ee,at as te,ct as ne,dt as re,et as ie,ft as ae,gt as oe,ht as se,it as ce,jt as le,lt as ue,mt as de,nt as A,ot as fe,pt as pe,q as me,rt as he,xt as j,z as M}from"./angular-preview-DMnirm1d.js";import{A as N,B as ge,D as _e,E as ve,F as ye,I as be,L as xe,M as Se,N as Ce,O as we,P as Te,R as Ee,S as De,a as P,j as Oe,k as ke,n as F,o as I,t as Ae,v as L,w as je,y as Me,z as Ne}from"./angular-preview-CiMWovKr.js";import{C as R,F as z,N as Pe,O as Fe,R as Ie,S as Le,b as Re,v as ze,w as Be,x as Ve}from"./angular-preview-Cfs8ww4S.js";import{l as He,n as Ue,t as We,u as Ge}from"./DocPage-BetfypGI.js";var B,Ke,qe,Je,V,Ye,H,Xe,U,Ze,Qe;function $e(){return($e=e((()=>{O(),z(),f(),y(),pe(),l(),N(),_(),D(),d(),Be(),Re(),B=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),Ke=6,qe=10,Je=320,V=20,Ye=e=>{let t=e.options,n=e.theme,r=Fe(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},l=!1,u=0,d=0,f=[],p=[],m=null,h=!0,g=``,_=!1,v=null,y=new Map,b=null,S={time:0,x:0,y:0},C=(e,t)=>{o[e]?.forEach(e=>e(t))},T=()=>{h=!0,_||e.onInvalidate?.()},E=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1}},D=(t,n=r.fontSize,i=400)=>e.measureText(t,A(r,n,i)),O=()=>{s=fe(t,r,a,i);let{base:e,minSpan:n}=s;l?(c={x:s.zoom.x?ze(c.x,e.x,n.x):[...e.x],y:s.zoom.y?ze(c.y,e.y,n.y):[...e.y]},l=!Le(c.x,e.x)||!Le(c.y,e.y)):c=B(e),f=be(t.annotations,r,s.y.type===`log`?Math.log10:void 0,s.x.type===`log`?Math.log10:void 0),p=Ce(t.dependencies,r),v&&(v.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||N(null)),T()},k=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!Ee(e,s,n))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=ve(s);if(a){let e=a.labels[0]?.text??``,t=a.labels[a.labels.length-1]?.text??``,n=Math.max(60,Math.min(160,u*.32)),r=u-4-D(t,11)-8,o=r-n,s=(i===`bottom`?d-V:0)+V/2;return{entries:[],colors:{bar:{x:o,y:s-4,width:n,height:8},stops:a.stops,labels:[{text:e,x:o-8,y:s,align:`right`},{text:t,x:r+8,y:s,align:`left`}],ticks:a.labels.filter(e=>e.at>0&&e.at<1).map(e=>o+e.at*n),caret:null},position:i,toggle:!1,height:26}}let o=[],c=4,l=0;for(let e of s.series){let t=14+D(e.name,12)+8;c+t>u-4&&c>4&&(c=4,l++),o.push({id:e.id,name:e.name,color:e.colorCss,shape:_e(e.type),hidden:e.hidden,box:{x:c,y:l*V,width:t,height:V}}),c+=t+10}let f=(l+1)*V+6;if(i===`bottom`)for(let e of o)e.box.y+=d-f+6;return{entries:o,colors:null,position:i,toggle:r.toggle??!0,height:f}},ae=(e,n,r,i)=>{let a=t.tooltip;if(a===!1)return null;let o=typeof a==`object`?a.render:void 0,c=null;if(o){let t=o(e);if(t===null||t===``)return null;typeof t==`string`&&(c=t.split(`
`))}let l=je(s,e,m?.layout.yTicks??null,m?.layout.y2Ticks??null),f=0,p,h=l.rows.some(e=>e.color)?14:0;if(c){for(let e of c)f=Math.max(f,D(e,12));p=c.length}else{f=D(l.title,12,600)+(l.titleColor?14:0),l.subtitle&&(f=Math.max(f,D(l.subtitle,11)+(l.titleColor?14:0)));let e=0,t=0;for(let n of l.rows)e=Math.max(e,D(n.name,12)),t=Math.max(t,D(n.value,12,600));l.rows.length&&(f=Math.max(f,h+e+16+t)),p=1+ +!!l.subtitle+l.rows.length}let g=Math.ceil(Math.max(f,96)+16+4),_=p*18+16,{x:v,y}=Ie({anchor:{x:n,y:r},avoid:me(s,i,e),size:{width:g,height:_},stage:{width:u,height:d},prefer:i.horizontal?`vertical`:`side`});return{content:l,text:c,box:{x:v,y,width:g,height:_},lineHeight:18,padding:8,swatchWidth:h}},pe=()=>{if(u<=0||d<=0)return null;let e=k(),n=e?.position===`top`?e.height:0,i=xe({model:s,view:c,theme:r,width:u,height:d-(e?.height??0),padding:t.padding,top:n,measure:e=>D(e)}),a=ye(s,c,i.scales,i.yTicks,r.background),o=[],l=r.fontSize+4;for(let e of f){if(e.type===`text`&&e.text){o.push(he(e,i.scales,D(e.text,r.fontSize,e.weight),l));continue}if(e.type!==`rect`)continue;let t=ie(e,ee(e,i.scales),r.fontSize,D);t&&o.push(t.box)}let h=ce(a,i.plot,e=>D(e),l-2,o),_={width:u,height:d,theme:r,model:s,view:B(c),layout:i,annotations:f,pointLabels:h,legend:e,hover:null,dragging:null,connectors:Te(s,i.scales),arrows:Ne(s,i.scales,p)};if(m=_,v){let n=De(s,i.scales,v.event,t.crosshair),r=i.scales.horizontal;_.hover={event:v.event,marks:ge(s,i.scales,v.event),crosshairX:r?null:n,crosshairY:r?n:null,tooltip:b?.kind===`pan`||b?.kind===`point`?null:ae(v.event,v.x,v.y,i.scales)};let a=e?.colors,o=v.event.items[0],c=o?s.series[o.seriesIndex]:void 0;a&&o&&c?.type===`heatmap`&&o.value!==void 0&&(a.caret=a.bar.x+oe(c,o.value)*a.bar.width)}if(b?.kind===`point`){let e=s.series[b.item.seriesIndex];_.dragging={x:b.x,y:b.y,color:b.item.color,size:(e?Oe(e,b.item.index):8)+6}}let y=i.plot,x=`${y.x},${y.y},${y.width},${y.height}`;return x!==g&&(g=x,C(`layout`,{...y})),_},j=()=>((h||!m)&&(h=!1,m=pe()),m),M=()=>j()?.layout.scales??null,N=e=>{let t=!Se(v?.event??null,e?.event??null);v=e,T(),t&&C(`hover`,e?e.event:null)},P=(e,t,n)=>{let r=M();return r?we(s,r,m?.layout.xTicks??null,e,t,n?8:0):null},ke=(e,t)=>{let n=M()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},F=(e,t)=>{let n=M();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t)),o=x(n,i,a);return{x:ne(s,o.x),y:te(s,o.y)}},I=(e,t)=>{let{base:n,minSpan:r}=s;c={x:ze(e.x,n.x,r.x),y:ze(e.y,n.y,r.y)},l=!Le(c.x,n.x)||!Le(c.y,n.y),t&&C(`zoom`,ue(s,c)),T()},Ae=(e,t,n)=>{let r=M();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=B(c),a=x(r,e,t);s.zoom.x&&(i.x=R(c.x,a.x,n)),s.zoom.y&&(i.y=R(c.y,a.y,n)),I(i,!0)},L=()=>{l&&I(B(s.base),!0)},Me=(e,t)=>j()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,z=e=>{a.has(e)?a.delete(e):a.add(e),O()},Pe=()=>{let[e,t]=[...y.values()];b={kind:`pinch`,view:B(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},N(null)};return s=fe(t,r,a,i),O(),{setOptions(e){if(_)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=Fe(n,t.palette)),O()},setTheme(e){_||(n=e,r=Fe(n,t.palette),O())},setSize(e,t){(e!==u||t!==d)&&(u=Math.max(0,e),d=Math.max(0,t),T())},getScene:j,pointerDown:(e,t,n={})=>{if(_)return;let r=n.id??0,i=!!n.touch;y.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=E();if(y.size===2){a&&(s.zoom.x||s.zoom.y)&&b?.kind!==`point`&&Pe();return}if(y.size>2||!a){if(!a&&i){let n=P(e,t,!0);N(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=P(e,t,i)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){b={kind:`point`,item:n,x:e,y:t};return}}if(l&&a.pan&&ke(e,t)){b={kind:`pan`,view:B(c),x:e,y:t};return}if(b=null,i){let n=P(e,t,!0);N(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(_)return;let r=n.id??0,i=y.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?qe:Ke)&&(i.moved=!0)),b?.kind===`pinch`&&y.size>=2){let[e,t]=[...y.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=M();if(!a)return;let o=le(a.plot,b.view,s.x.reverse,s.y.reverse,s.horizontal),c=b.distance/n,l=B(b.view),u=x(o,b.midX,b.midY),d=x(o,r,i);s.zoom.x&&(l.x=R(b.view.x,u.x,c),l.x=Ve(l.x,(u.x-d.x)*c)),s.zoom.y&&(l.y=R(b.view.y,u.y,c),l.y=Ve(l.y,(u.y-d.y)*c)),I(l,!0);return}if(b?.kind===`point`&&i){if(!i.moved)return;b.x=e,b.y=t;let n=F(e,t);T(),n&&C(`drag`,{item:b.item,x:n.x,y:n.y});return}if(b?.kind===`pan`&&i){if(!i.moved)return;let n=M();if(!n)return;let r=B(b.view),a=x(n,b.x,b.y),o=x(n,e,t);s.zoom.x&&(r.x=Ve(b.view.x,a.x-o.x)),s.zoom.y&&(r.y=Ve(b.view.y,a.y-o.y)),I(r,!0);return}if(!(y.size>1)&&(!i||i.touch||!n.touch)){let r=P(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&N(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(_)return;let r=n.id??0,i=y.get(r);y.delete(r);let a=b;if(a?.kind===`pinch`){y.size<2&&(b=null);return}if(b=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=F(e,t);T(),n&&C(`drop`,{item:a.item,x:n.x,y:n.y});return}}else if(a?.kind===`pan`&&i.moved){T();return}if(i.moved){i.touch&&T();return}let o=Date.now();if(i.touch&&o-S.time<Je&&Math.hypot(e-S.x,t-S.y)<24&&l){S={time:0,x:e,y:t},L();return}S={time:o,x:e,y:t};let s=Me(e,t);if(s){j()?.legend?.toggle&&z(s.id);return}let c=P(e,t,i.touch);if(c){i.touch&&N({event:c,x:e,y:t}),C(`click`,c);return}if(i.touch&&N(null),ke(e,t)){let n=F(e,t);n&&C(`plotClick`,n)}},pointerCancel:(e={})=>{y.delete(e.id??0),(b?.kind===`point`||y.size<2)&&(b=null),T()},pointerLeave(){!b&&v&&N(null)},zoomAt:Ae,resetZoom:L,getView:()=>ue(s,c),setView(e){_||I(re(s,e,c),!1)},toggleSeries:z,clearHover(){v&&N(null)},getPlotRect(){let e=j()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=M();return n?w(n,de(s,e),se(s,t)):null},fromPixel(e,t){let n=M();if(!n)return null;let r=x(n,e,t);return{x:ne(s,r.x),y:te(s,r.y)}},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){_=!0,y.clear();for(let e of Object.keys(o))delete o[e]}}},H=(e,t,n,r)=>{if(!n)return[0,t];let[i,a]=r[0]<=r[1]?r:[r[1],r[0]];return[Math.max(0,h(e,t,i)-1),Math.min(t,h(e,t,a)+1)]},Xe={heatmap:0,area:1,bar:2,boxplot:2,candlestick:3,line:4,scatter:5},U=(e,t)=>{if(!e.horizontal)return t;let n=Array(t.length);for(let e=0;e<t.length;e+=4)n[e]=t[e+1],n[e+1]=t[e],n[e+2]=t[e+3],n[e+3]=t[e+2];return n},Ze=(e,t={})=>{let{model:n,view:r,layout:i}=e,a=i.scales,{plot:o}=i,s=a.horizontal,c=t.maxDots??4e3,l=t.maxBars??2e3,d=Math.max(1,t.columnWidth??1),f=s?o.y:o.x,h=f+(s?o.height:o.width),g=[],_=n.series.filter(e=>!e.hidden&&e.cols.count>0).sort((e,t)=>Xe[e.type]-Xe[t.type]||e.index-t.index);for(let e of _){let{x:i,y:_,count:v,sorted:y}=e.cols;if(e.type===`line`||e.type===`area`){let[t,o]=H(i,v,y,r.x),c=e.stackTop??_,l=m(i,c,t,o,e.curve),u=e.stackBase?m(i,e.stackBase,t,o,e.curve).points:null,p=l.length,b=l.points,x=u;if(y&&p>(h-f)*2/d){if(u){let e=M(b,0,p,e=>a.xToPx(e)/d),t=new Float64Array(e.length*2),n=new Float64Array(e.length*2),r=0,i=0;for(let a=0;a<e.length;a++){let o=e.points[a*2];for(;i<p-1&&b[i*2]<o;)i++;t[r*2]=o,t[r*2+1]=e.points[a*2+1],n[r*2]=o,n[r*2+1]=u[i*2+1],r++}b=t,x=n,p=r}else{let e=M(b,0,p,e=>a.xToPx(e)/d);b=e.points,p=e.length}}let S=e.type===`area`&&!!e.cols.y0&&!!x,C=[],T=[],E=[],D=[],O=[],k=[],ee=()=>{D.length&&(C.push(D),T.push(O),S&&E.push(k)),D=[],O=[],k=[]};for(let e=0;e<p;e++){let t=b[e*2],n=b[e*2+1],r=x?x[e*2+1]:0;if(!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(r)){ee();continue}let i=w(a,t,n);if(D.push(i.x,i.y),x&&O.push(a.yToPx(r)),S){let e=w(a,t,r);k.push(e.x,e.y)}}if(ee(),e.type===`area`&&g.push({kind:`area`,seriesIndex:e.index,color:e.colorCss,opacity:e.opacity,baseline:a.yToPx(n.baseline),segments:C,...x?{bottoms:T}:{},...s?{horizontal:!0}:{}}),e.lineWidth>0){let t=e.type===`area`?Math.min(e.lineWidth,2):e.lineWidth;g.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:C}),S&&g.push({kind:`line`,seriesIndex:e.index,color:e.colorCss,width:t,segments:E})}continue}if(e.type===`bar`&&e.barBase&&e.barTop){let[t,n]=H(i,v,y,r.x),o=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),.5),s=[],c=[],u=n-t>l,d=NaN;for(let r=t;r<n;r++){let t=e.barBase[r],n=e.barTop[r];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let l=a.xToPx(i[r]+e.barOffset);if(l+o<f||l-o>h)continue;let p=a.yToPx(t),m=a.yToPx(n),g=Math.min(p,m),_=Math.max(1,Math.abs(p-m)),v=Math.floor(l);if(u&&v===d&&s.length){let e=s.length-4,t=Math.max(s[e+1]+s[e+3],g+_);s[e+1]=Math.min(s[e+1],g),s[e+3]=t-s[e+1];continue}d=v,s.push(l-o,g,o*2,_);let y=e.pointColors?.[r];c.push(e.cols.opacities?j(y??e.color,ae(e,r)):y?j(y):e.colorCss)}g.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:U(a,s),...e.pointColors||e.cols.opacities?{colors:c}:{},radius:e.radius,...e.opacity<1&&!e.cols.opacities?{opacity:e.opacity}:{}});continue}if(e.type===`boxplot`){g.push(...Qe(e,a,r.x,f,h,l));continue}if(e.type===`candlestick`){let[t,n]=H(i,v,y,r.x),{open:o,high:s,low:c}=e.cols,u=Math.max(e.barHalfWidth/Math.abs(a.xPerPx),1),d=j(e.upColor),p=j(e.downColor),m=[],b=[],x=[],S=[],C=Math.max(1,Math.ceil((n-t)/l));for(let e=t;e<n;e+=C){let t=_[e],n=o?o[e]:t;if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=a.xToPx(i[e]);if(r+u<f||r-u>h)continue;let l=t<n?p:d,g=a.yToPx(s?s[e]:Math.max(n,t)),v=a.yToPx(c?c[e]:Math.min(n,t));m.push(r-.5,Math.min(g,v),1,Math.abs(v-g)),x.push(l);let y=a.yToPx(n),C=a.yToPx(t);b.push(r-u,Math.min(y,C),u*2,Math.max(1,Math.abs(y-C))),S.push(l)}g.push({kind:`bars`,seriesIndex:e.index,color:d,rects:U(a,m),colors:x},{kind:`bars`,seriesIndex:e.index,color:d,rects:U(a,b),colors:S,radius:1});continue}if(e.type===`heatmap`){let t=Math.abs(e.cellHalf.x/a.xPerPx),n=Math.abs(e.cellHalf.y/a.yPerPx),r=[],s=[],c=p(t*2,n*2,e.radius),d=c.inset;for(let c=0;c<v&&r.length/4<l*4;c++){let l=e.cellColors?.[c];if(!l)continue;let f=u(a,a.xToPx(i[c])-t,a.xToPx(i[c])+t,a.yToPx(_[c])-n,a.yToPx(_[c])+n);f.x+f.width<o.x||f.x>o.x+o.width||f.y+f.height<o.y||f.y>o.y+o.height||(r.push(f.x+d,f.y+d,f.width-d*2,f.height-d*2),s.push(j(b(l))))}g.push({kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:r,colors:s,radius:c.radius});continue}let x=[],S=[],C=t=>{let n=e.pointColors?.[t];return n?j(n):e.colorCss},T=[],E=[];for(let e=0;e<v;e++){let t=i[e],n=_[e];if(!Number.isFinite(t)||!Number.isFinite(n))continue;let r=w(a,t,n);r.x<o.x||r.x>o.x+o.width||r.y<o.y||r.y>o.y+o.height||(T.push(e),E.push(r.x,r.y))}if(T.length>c){let n=Math.max(2,t.dotCell??e.pointSize*.8),r=Math.ceil(o.width/n)+1,i=new Map;T.forEach((e,t)=>{let a=Math.floor((E[t*2]-o.x)/n),s=Math.floor((E[t*2+1]-o.y)/n);i.set(s*r+a,e)});for(let[e,t]of i)x.push(o.x+(e%r+.5)*n,o.y+(Math.floor(e/r)+.5)*n,n),S.push(C(t))}else T.forEach((t,n)=>{x.push(E[n*2],E[n*2+1],Oe(e,t)),S.push(C(t))});g.push({kind:`dots`,seriesIndex:e.index,opacity:e.opacity,dots:x,colors:S,...e.stroke===null?{}:{stroke:e.stroke}})}return g},Qe=(e,t,n,r,i,a)=>{let{x:o,y:s,count:c,sorted:l,high:u,low:d,q1:f,q3:p,outliers:m}=e.cols,[h,g]=H(o,c,l,n),_=Math.max(e.barHalfWidth/Math.abs(t.xPerPx),1),v=Math.max(1,e.lineWidth),y=[],b=[],x=[],S=[],C=[],w=[],T=Math.max(1,Math.ceil((g-h)/a)),E=(e,t,n)=>{b.push(e-v/2,Math.min(t,n),v,Math.abs(t-n))},D=(e,t,n,r=v)=>{b.push(e-t,n-r/2,t*2,r)};for(let n=h;n<g;n+=T){let a=s[n];if(!Number.isFinite(a))continue;let c=t.xToPx(o[n]+e.barOffset);if(c+_<r||c-_>i)continue;let l=e.pointColors?.[n],h=l?j(l):e.colorCss,g=t.yToPx(d&&Number.isFinite(d[n])?d[n]:a),T=t.yToPx(u&&Number.isFinite(u[n])?u[n]:a),O=t.yToPx(f&&Number.isFinite(f[n])?f[n]:a),k=t.yToPx(p&&Number.isFinite(p[n])?p[n]:a),ee=b.length;y.push(c-_,Math.min(O,k),_*2,Math.abs(O-k)),x.push(h),E(c,g,O),E(c,k,T),E(c-_,O,k),E(c+_,O,k),D(c,_/2,g),D(c,_/2,T),D(c,_,O),D(c,_,k),D(c,_,t.yToPx(a),Math.max(2,v*1.6));for(let e=ee;e<b.length;e+=4)S.push(h);let te=m?.[n];if(te)for(let n of te){let r=t.horizontal?{x:t.yToPx(n),y:c}:{x:c,y:t.yToPx(n)};C.push(r.x,r.y,e.outlierSize),w.push(h)}}let O=[{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:U(t,y),colors:x,opacity:e.opacity},{kind:`bars`,seriesIndex:e.index,color:e.colorCss,rects:U(t,b),colors:S}];return C.length&&O.push({kind:`dots`,seriesIndex:e.index,opacity:e.outlierShape===`hollow`?0:.85,dots:C,colors:w,stroke:1.25}),O}})))()}var et,W,tt,nt,rt,G,it,at,ot,st;function ct(){return(ct=e((()=>{z(),f(),l(),N(),E(),Me(),P(),$e(),et=e=>(e[0]+e[1])/2,W=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},tt=(e,t,n)=>{e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip(),e.lineJoin=`round`,e.lineCap=`round`;for(let n of t)if(n.kind===`area`)e.globalAlpha=n.opacity,e.fillStyle=n.color,n.segments.forEach((t,r)=>{let i=n.bottoms?.[r],a=t.length/2;if(!(a<2)){e.beginPath();for(let n=0;n<a;n++)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n*2],t[n*2+1]);for(let r=a-1;r>=0;r--){let a=i?i[r]:n.baseline;n.horizontal?e.lineTo(a,t[r*2+1]):e.lineTo(t[r*2],a)}e.closePath(),e.fill()}}),e.globalAlpha=1;else if(n.kind===`line`){e.strokeStyle=n.color,e.lineWidth=n.width,e.beginPath();for(let t of n.segments)for(let n=0;n<t.length;n+=2)n===0?e.moveTo(t[0],t[1]):e.lineTo(t[n],t[n+1]);e.stroke()}else if(n.kind===`bars`){e.globalAlpha=n.opacity??1;let t=n.radius??0;for(let r=0;r<n.rects.length;r+=4){let[i,a,o,s]=[n.rects[r],n.rects[r+1],n.rects[r+2],n.rects[r+3]];e.fillStyle=n.colors?.[r/4]??n.color;let c=Math.min(t,o/2,s/2);c>.5?(W(e,i,a,o,s,c),e.fill()):e.fillRect(i,a,o,s)}e.globalAlpha=1}else{let t=n.stroke??0;for(let r=0;r<n.dots.length;r+=3){let i=n.colors[r/3]??`#888`,a=n.dots[r+2]/2;e.beginPath(),e.arc(n.dots[r],n.dots[r+1],Math.max(0,a-t/2),0,Math.PI*2),n.opacity>0&&(e.globalAlpha=n.opacity,e.fillStyle=i,e.fill()),t>0&&(e.globalAlpha=1,e.lineWidth=t,e.strokeStyle=i,e.stroke())}e.globalAlpha=1}e.restore()},nt=(e,t,n)=>{let{theme:r}=n,{bar:i,stops:a}=t,o=a.length;if(typeof e.createLinearGradient==`function`){let t=e.createLinearGradient(i.x,0,i.x+i.width,0);a.forEach((e,n)=>t.addColorStop(n/Math.max(1,o-1),e)),e.fillStyle=t,W(e,i.x,i.y,i.width,i.height,i.height/2),e.fill()}else{let t=i.width/o;a.forEach((n,r)=>{e.fillStyle=n,e.fillRect(i.x+r*t,i.y,t+.5,i.height)})}e.fillStyle=j(r.text,.35);for(let n of t.ticks)e.fillRect(Math.round(n),i.y-2,1,i.height+4);e.font=A(r,11),e.textBaseline=`middle`,e.fillStyle=j(r.textMuted);for(let n of t.labels)e.textAlign=n.align,e.fillText(n.text,n.x,n.y);t.caret!==null&&(W(e,t.caret-2,i.y-3,4,i.height+6,2),e.fillStyle=j(r.text),e.fill(),e.lineWidth=1.5,e.strokeStyle=j(r.background),e.stroke())},rt=1.16,G=(e,t,n,r)=>{let i=Math.max(0,t.width+r*2),a=Math.max(0,t.height+r*2);W(e,t.x-r,t.y-r,i,a,Math.max(0,Math.min(n+r,i/2,a/2)))},it=(e,t,n,r,i,a,o,s,c)=>{let l=j(c.background);a?(e.save(),e.shadowColor=`rgba(15, 23, 42, 0.4)`,e.shadowBlur=14,e.shadowOffsetY=5,G(e,t,n,o+(s?.width??0)),e.fillStyle=s?s.color:l,e.fill(),e.restore(),s&&(G(e,t,n,o),e.fillStyle=l,e.fill())):i&&(G(e,t,n,0),e.fillStyle=l,e.fill()),G(e,t,n,0),e.fillStyle=r,e.fill(),a&&a.width>0&&(G(e,t,n,-a.width/2),e.lineWidth=a.width,e.strokeStyle=a.color,e.stroke())},at=(e,t,n,r)=>{for(let i of t)if(i.kind===`bar`){let t=ke(i);e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip();let a=i.ring===null?null:{color:i.ring,width:Math.min(i.backdrop?2:1.5,Math.max(0,(Math.min(t.width,t.height)-2)/4))};it(e,t,i.radius,i.color,i.backdrop,a,1.5,null,r),e.restore()}else if(i.kind===`cell`){let t=i.width*rt,n=i.height*rt;it(e,{x:i.x+(i.width-t)/2,y:i.y+(i.height-n)/2,width:t,height:n},Math.max(2,i.radius)*rt,i.color,!1,{color:i.ring,width:Math.min(2,Math.min(t,n)/5)},2,{color:j(r.primary,.6),width:1.5},r)}},ot=(e,t,n,r,i,a=L(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),S(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,y2:l.y2,y2Ticks:d.y2Ticks,theme:c,annotations:t.annotations});let h=t.legend?.colors;if(h&&nt(e,h,t),t.legend){e.font=A(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=j(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}let g=t.hover?.marks.some(e=>e.kind===`bar`)??!1;for(let n of t.hover?.marks??[])n.kind===`band`&&(W(e,n.x,n.y,n.width,n.height,6),e.fillStyle=j(c.text,g?.04:.06),e.fill());p.horizontal?tt(e,Ze(t),f):_();function _(){let e=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[t,i]=e(u.x,r.x,l.x.reverse),[o,s]=e(u.y,r.y,l.y.reverse);a.paint(n,{transform:{xScale:t,xOffset:i,yScale:o,yOffset:s},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m))}e.setTransform(m,0,0,m,0,0);for(let n of t.hover?.marks??[])n.kind===`guide`&&(e.fillStyle=j(c.text,.06),e.fillRect(n.x,n.y,n.width,n.height));if(g&&(e.fillStyle=j(c.background,.42),e.fillRect(f.x,f.y,f.width,f.height)),t.hover&&at(e,t.hover.marks,f,c),k(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1,connectors:t.connectors,arrows:t.arrows}),t.pointLabels.length){e.save(),e.font=A(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=j(c.background,.9),e.fillStyle=j(c.text,.85);for(let{label:n,box:r}of t.pointLabels){let t=r.y+r.height/2;if(n.color){e.save(),e.fillStyle=n.color,e.fillText(n.text,r.x,t),e.restore();continue}e.strokeText(n.text,r.x,t),e.fillText(n.text,r.x,t)}e.restore()}let v=t.hover;if(v){if(v.crosshairX!==null){e.save(),e.strokeStyle=j(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(v.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}if(v.crosshairY!==null){e.save(),e.strokeStyle=j(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(v.crosshairY)+.5;e.moveTo(f.x,t),e.lineTo(f.x+f.width,t),e.stroke(),e.restore()}for(let t of v.marks)t.kind!==`band`&&t.kind!==`guide`&&t.kind!==`bar`&&t.kind!==`cell`&&(e.beginPath(),e.arc(t.x,t.y,t.size/2+4,0,Math.PI*2),e.fillStyle=t.halo,e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=j(c.background),e.stroke())}if(t.dragging){let n=t.dragging;e.beginPath(),e.arc(n.x,n.y,n.size/2,0,Math.PI*2),e.fillStyle=n.color,e.globalAlpha=.85,e.fill(),e.globalAlpha=1,e.lineWidth=2,e.strokeStyle=j(c.background),e.stroke()}let y=v?.tooltip;if(y){let{box:t,lineHeight:n,padding:r}=y;e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,W(e,t.x,t.y,t.width,t.height,8),e.fillStyle=j(c.background,Pe),e.fill(),e.restore(),W(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=j(c.axis,.6),e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let i=t.y+r+n/2,a=t.x+r+2,o=t.x+t.width-r-2;if(y.text){e.font=A(c,12),e.fillStyle=j(c.text),e.textAlign=`left`;for(let t of y.text)e.fillText(t,a,i),i+=n}else{let{content:t}=y,r=a;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=A(c,12,600),e.fillStyle=j(c.text),e.textAlign=`left`,e.fillText(t.title,r,i),i+=n,t.subtitle&&(e.font=A(c,11),e.fillStyle=j(c.textMuted),e.fillText(t.subtitle,r,i-2),i+=n);for(let s of t.rows)r=a,s.color&&(e.fillStyle=s.color,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill()),r+=y.swatchWidth,e.font=A(c,12),e.textAlign=`left`,e.fillStyle=j(c.textMuted),e.fillText(s.name,r,i),e.font=A(c,12,600),e.textAlign=`right`,e.fillStyle=j(c.text),e.fillText(s.value,o,i),i+=n}}},st=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u=``,d=``,f=e.options,p=new WeakMap,m=0,h=e=>{let t=p.get(e);return t===void 0&&p.set(e,t=++m),t},_={x:0,y:0},v=0,y=``,b=(e,t)=>n?(t!==y&&(n.font=t,y=t),n.measureText(e).width):e.length*6.5,x=n?L(n):null,S=globalThis,C=()=>{if(s=null,o||!n||!x)return;let e=E.getScene();if(!e)return;let p=Math.max(1,Math.round(r*a)),m=Math.max(1,Math.round(i*a));t.width!==p&&(t.width=p),t.height!==m&&(t.height=m),y=``,l!==e.model&&(l=e.model,u=I(e.model,h(e.theme),e=>f.series[e]?.stack));let b=e.layout.scales,S={x:1/Math.abs(b.xPerPx),y:1/Math.abs(b.yPerPx)},C=`${u}|${g(e.model,S)}`;C!==d&&(d=C,_={x:et(e.model.base.x),y:et(e.model.base.y)},c=T(e.model,_,++v,S)),ot(n,e,c,_,a,x),y=``},w=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(C):S.requestAnimationFrame?S.requestAnimationFrame(C):setTimeout(C,16))},E=Ye({options:e.options,theme:e.theme,measureText:b,onInvalidate:w});E.setSize(r,i);let D=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>{f=e,E.setOptions(e)},setTheme:e=>E.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),E.setSize(e,t),w()},render(){s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):S.cancelAnimationFrame?S.cancelAnimationFrame(s):clearTimeout(s)),C()},touchStart(e){e.forEach((e,t)=>E.pointerDown(e.x,e.y,D(e,t)))},touchMove(e){e.forEach((e,t)=>E.pointerMove(e.x,e.y,D(e,t)))},touchEnd(e){e.forEach((e,t)=>E.pointerUp(e.x,e.y,D(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>E.pointerCancel(D(e,t)))},pointerDown:(e,t,n)=>E.pointerDown(e,t,n),pointerMove:(e,t,n)=>E.pointerMove(e,t,n),pointerUp:(e,t,n)=>E.pointerUp(e,t,n),pointerLeave:()=>E.pointerLeave(),zoomAt:(e,t,n)=>E.zoomAt(e,t,n),resetZoom:()=>E.resetZoom(),getView:()=>E.getView(),setView:e=>E.setView(e),toggleSeries:e=>E.toggleSeries(e),clearHover:()=>E.clearHover(),getPlotRect:()=>E.getPlotRect(),toPixel:(e,t)=>E.toPixel(e,t),fromPixel:(e,t)=>E.fromPixel(e,t),getController:()=>E,on:(e,t)=>E.on(e,t),destroy(){o||(o=!0,s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):S.cancelAnimationFrame?S.cancelAnimationFrame(s):clearTimeout(s)),x?.destroy(),E.destroy())}}}})))()}function lt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,K.useRef)(null),[a,o]=(0,K.useState)(`…`),[s,c]=(0,K.useState)(null),l=new Intl.NumberFormat(n,{notation:`compact`});(0,K.useEffect)(()=>{let t=i.current;if(!t)return;let r=new Intl.NumberFormat(n,{notation:`compact`}),a=v(t,{series:[{name:e(`downloads`),type:`bar`,data:dt.map((e,t)=>[e,ft[t]])}],yAxis:{format:e=>r.format(e)},ariaLabel:e(`downloadsAria`)}),s=!0;a.ready.then(t=>{s&&o(t??e(`unsupported`))});let l=a.on(`click`,c);return()=>{s=!1,l(),a.destroy()}},[e,n]);let u=s?.items[0],d=s&&u?e(`downloadsStatus`,{release:s.xLabel,downloads:l.format(u.y)}):e(`clickBar`);return(0,ut.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,ut.jsx)(`div`,{ref:i,style:{height:300}}),(0,ut.jsxs)(`p`,{role:`status`,children:[e(`rendererLabel`,{renderer:a}),` · `,d]})]})}var K,ut,dt,ft;function pt(){return(pt=e((()=>{K=t(),i(),C(),ut=n(),dt=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],ft=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function mt(){let e=(0,q.useRef)(null),t=(0,q.useRef)(null),{t:n,i18n:i}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),a=i.language,[o,s]=(0,q.useState)(null);(0,q.useEffect)(()=>{let r=e.current;if(!r)return;let i=new Intl.DateTimeFormat(a,{month:`short`}),o=gt.map((e,t)=>i.format(new Date(2026,t,1))),c=new Intl.NumberFormat(a,{notation:`compact`}),l=()=>r.getBoundingClientRect(),u=st({canvas:r,width:l().width,height:l().height,pixelRatio:window.devicePixelRatio||1,theme:yt(r),options:{series:[{name:n(`visits`),type:`area`,data:o.map((e,t)=>[e,gt[t]])},{name:n(`signupsTimes10`),type:`line`,data:o.map((e,t)=>[e,_t[t]*10])}],yAxis:{format:e=>c.format(e)},crosshair:!0,ariaLabel:n(`visitsAria`)}});t.current=u;let d=u.on(`click`,e=>{let t=e.items[0];t&&s(`${e.xLabel}: ${c.format(t.y)} (${t.seriesName})`)}),f=u.on(`plotClick`,()=>s(null)),p=new ResizeObserver(()=>{let{width:e,height:t}=l();u.resize(e,t,window.devicePixelRatio||1)});p.observe(r);let m=new MutationObserver(()=>u.setTheme(yt(r)));return m.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{d(),f(),p.disconnect(),m.disconnect(),u.destroy(),t.current=null}},[n,a]);let c=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,ht.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,ht.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":n(`visitsAria`),style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...c(e)),onPointerMove:e=>t.current?.pointerMove(...c(e)),onPointerUp:e=>t.current?.pointerUp(...c(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,ht.jsx)(`p`,{role:`status`,children:o??n(`clickPoint`)})]})}var q,ht,gt,_t,vt,yt;function bt(){return(bt=e((()=>{q=t(),i(),ct(),ht=n(),gt=[4200,5100,4800,6900,7400,8800,8100,9600],_t=[310,420,380,560,610,790,720,880],vt=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],yt=e=>{let t=getComputedStyle(e),n={};for(let e of vt){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function xt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,J.useRef)(null),a=(0,J.useRef)(null),[s,c]=(0,J.useState)(`pie`),[l,u]=(0,J.useState)(null),d=(0,J.useMemo)(()=>new Intl.NumberFormat(n),[n]),f=(0,J.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),p=(0,J.useMemo)(()=>{let t=new Intl.NumberFormat(n,{notation:`compact`}),r=St.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),i={format:e=>d.format(e),percentFormat:e=>f.format(e)};return{pie:{type:`pie`,data:r,ariaLabel:e(`sourcesAria`),...i},donut:{type:`pie`,data:r,innerRadius:.62,padAngle:2,cornerRadius:4,centerValue:t.format(9800),centerLabel:e(`visitsLabel`),labels:`none`,ariaLabel:e(`sourcesAria`),...i},funnel:{type:`funnel`,data:Ct.map(({key:t,value:n})=>({name:e(`stages.${t}`),value:n})),ariaLabel:e(`funnelAria`),...i}}},[e,n,d,f]),m=(0,J.useRef)(p);(0,J.useEffect)(()=>{m.current=p}),(0,J.useEffect)(()=>{let e=i.current;if(!e)return;let t=Ae(e,m.current.pie);a.current=t;let n=t.on(`click`,u);return()=>{n(),t.destroy(),a.current=null}},[]),(0,J.useEffect)(()=>{a.current?.setOptions(p[s])},[p,s]);let h=e=>{c(e),u(null)};return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Y.jsx)(`div`,{style:{display:`flex`,gap:8},children:wt.map(t=>(0,Y.jsx)(o,{size:`small`,variant:s===t?`solid`:`outline`,"aria-pressed":s===t,onClick:()=>h(t),children:e(`views.${t}`)},t))}),(0,Y.jsx)(`div`,{ref:i,style:{height:300}}),(0,Y.jsx)(`p`,{role:`status`,children:l?e(`picked`,{name:l.name,value:d.format(l.value),share:f.format(l.percent)}):e(`clickShape`)})]})}var J,Y,St,Ct,wt;function Tt(){return(Tt=e((()=>{J=t(),i(),a(),F(),Y=n(),St=[{key:`search`,value:4200},{key:`direct`,value:2600},{key:`social`,value:1500},{key:`email`,value:900},{key:`referral`,value:600}],Ct=[{key:`visits`,value:9800},{key:`signups`,value:3100},{key:`trials`,value:1400},{key:`customers`,value:520}],wt=[`pie`,`donut`,`funnel`]})))()}function Et(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Dt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chart-engine.data`}),n=t.language,i=(0,X.useRef)(null),a=(0,X.useRef)(null),s=(0,X.useRef)([]),c=(0,X.useRef)(Et(17)),[l,u]=(0,X.useState)(!1),[d,f]=(0,X.useState)(0),p=(0,X.useRef)(null);(0,X.useEffect)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`}),r={cpu:e(`cpu`),seconds:e(`seconds`),aria:e(`cpuAria`),percent:e=>t.format(e/100)};p.current=r,a.current?.setOptions(Q(s.current,r))},[e,n]),(0,X.useEffect)(()=>{let e=i.current;if(!e)return;let t=Et(17);c.current=t;let n=[];for(let e=0;e<20;e++)n.push(kt(t,n[e-1]));s.current=n;let r=v(e,Q(n,p.current??Ot));return a.current=r,f(n.length),()=>{r.destroy(),a.current=null}},[]),(0,X.useEffect)(()=>{if(l)return;let e=setInterval(()=>{let e=s.current,t=[...e.slice(-119),kt(c.current,e[e.length-1])];s.current=t,a.current?.setOptions(Q(t,p.current??Ot)),f(e=>e+1)},500);return()=>clearInterval(e)},[l]);let m=new Intl.NumberFormat(n);return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Z.jsx)(`div`,{ref:i,style:{height:300,width:`100%`}}),(0,Z.jsx)(o,{variant:`outline`,onClick:()=>u(e=>!e),children:e(l?`resume`:`pause`)}),(0,Z.jsx)(`p`,{role:`status`,children:e(l?`pausedStatus`:`streamingStatus`,{points:m.format(d)})})]})}var X,Z,Ot,kt,Q;function At(){return(At=e((()=>{X=t(),i(),a(),C(),Z=n(),Ot={cpu:``,seconds:``,aria:``,percent:String},kt=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},Q=(e,t)=>({series:[{name:t.cpu,type:`area`,data:e,opacity:.2}],xAxis:{title:t.seconds},yAxis:{min:0,max:100,format:t.percent},interaction:!1,ariaLabel:t.aria})})))()}var jt;function Mt(){return(Mt=e((()=>{jt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Nt;function Pt(){return(Pt=e((()=>{Nt=`import { useEffect, useRef, useState, type PointerEvent } from "react";
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
`})))()}var Ft;function It(){return(It=e((()=>{Ft=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var Lt;function Rt(){return(Rt=e((()=>{Lt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var $,zt,Bt;function Vt(){return(Vt=e((()=>{pt(),bt(),Tt(),At(),Mt(),Pt(),It(),Rt(),t(),i(),Ue(),s(),Ge(),$=n(),zt=He(Object.assign({"./demos/basic.tsx":lt,"./demos/canvas.tsx":mt,"./demos/shapes.tsx":xt,"./demos/streaming.tsx":Dt}),Object.assign({"./demos/basic.tsx":jt,"./demos/canvas.tsx":Nt,"./demos/shapes.tsx":Ft,"./demos/streaming.tsx":Lt})),Bt=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(We,{id:`chart-engine`,demos:zt,intro:t})}})))()}Vt();export{Bt as default};