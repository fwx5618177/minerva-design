import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Dt as r,Ot as i}from"./io5-cgJxWOM4.js";import{R as a,z as o}from"./ProgressIndicator-BhPa7d9i.js";import{i as s,r as c}from"./DemoBlock-HPs0QNwO.js";import{l,n as u,t as d,u as f}from"./DocPage-DmpxYJhU.js";import{A as p,a as m,c as h,d as g,g as _,k as v,l as y,m as b,o as x,s as S,t as C,u as w}from"./theme-BtADPb1U.js";import{C as T,D as E,E as ee,O as D,S as O,T as te,_ as ne,a as k,b as re,c as ie,d as ae,f as oe,g as se,h as ce,i as le,l as A,m as ue,n as j,o as M,p as de,r as N,s as P,t as F,u as fe,v as pe,w as me,x as I,y as he}from"./chart-B6Gh_UJN.js";import{n as ge,t as L}from"./chart-DJOQ2gzZ.js";var R,_e,ve,ye,z,B;function be(){return(be=e((()=>{ee(),T(),S(),se(),C(),le(),R=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),_e=6,ve=10,ye=320,z=20,B=e=>{let t=e.options,n=e.theme,r=m(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},l=!1,u=0,d=0,f=[],p=null,g=!0,_=``,v=!1,b=null,x=new Map,S=null,C={time:0,x:0,y:0},T=(e,t)=>{o[e]?.forEach(e=>e(t))},E=()=>{g=!0,v||e.onInvalidate?.()},ee=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1}},D=(t,n=r.fontSize,i=400)=>e.measureText(t,w(r,n,i)),O=()=>{s=me(t,r,a,i);let{base:e,minSpan:n}=s;l?(c={x:s.zoom.x?N(c.x,e.x,n.x):[...e.x],y:s.zoom.y?N(c.y,e.y,n.y):[...e.y]},l=!M(c.x,e.x)||!M(c.y,e.y)):c=R(e),f=ce(t.annotations,r),b&&(b.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||F(null)),E()},ie=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!(e===void 0?n>1:e))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=[],o=4,c=0;for(let e of s.series){let t=14+D(e.name,12)+8;o+t>u-4&&o>4&&(o=4,c++),a.push({id:e.id,name:e.name,color:e.colorCss,shape:oe(e.type),hidden:e.hidden,box:{x:o,y:c*z,width:t,height:z}}),o+=t+10}let l=(c+1)*z+6;if(i===`bottom`)for(let e of a)e.box.y+=d-l+6;return{entries:a,position:i,toggle:r.toggle??!0,height:l}},se=(e,n,r)=>{let i=t.tooltip;if(i===!1)return null;let a=typeof i==`object`?i.render:void 0,o=null;if(a){let t=a(e);if(t===null||t===``)return null;typeof t==`string`&&(o=t.split(`
`))}let c=de(s,e,p?.layout.yTicks??null),l=0,f;if(o){for(let e of o)l=Math.max(l,D(e,12));f=o.length}else{l=D(c.title,12,600)+(c.titleColor?14:0);for(let e of c.rows)l=Math.max(l,(e.color?14:0)+D(e.name,12)+16+D(e.value,12,600));f=1+c.rows.length}let m=Math.ceil(Math.max(l,96)+16+4),h=f*18+16,g=n+14;g+m>u-4&&(g=n-14-m),g=Math.max(4,Math.min(g,u-m-4));let _=Math.max(4,Math.min(r-h/2,d-h-4));return{content:c,text:o,box:{x:g,y:_,width:m,height:h},lineHeight:18,padding:8}},le=()=>{if(u<=0||d<=0)return null;let e=ie(),n=e?.position===`top`?e.height:0,i=he({model:s,view:c,theme:r,width:u,height:d-(e?.height??0),padding:t.padding,top:n,measure:e=>D(e)}),a=pe(s,c,i.scales,i.yTicks),o=[],l=r.fontSize+4;for(let e of f){if(e.type===`text`&&e.text){o.push(y(e,i.scales,D(e.text,r.fontSize,e.weight),l));continue}if(e.type!==`rect`||!e.label)continue;let t=i.scales,n=e.x0===void 0?i.plot.x:t.xToPx(e.x0),a=e.x1===void 0?i.plot.x+i.plot.width:t.xToPx(e.x1),s=e.y0===void 0?i.plot.y+i.plot.height:t.yToPx(e.y0),c=e.y1===void 0?i.plot.y:t.yToPx(e.y1),u=D(e.label,r.fontSize+1,600),d=Math.min(n,a),f=Math.max(n,a),p=Math.min(s,c),m=Math.max(s,c),h=e.labelPosition;o.push({x:h.endsWith(`left`)?d+10:h.endsWith(`right`)?f-10-u:(d+f-u)/2,y:h.startsWith(`top`)?p+10:h.startsWith(`bottom`)?m-10-l:(p+m-l)/2,width:u,height:l})}let m=h(a,i.plot,e=>D(e),l-2,o),g={width:u,height:d,theme:r,model:s,view:R(c),layout:i,annotations:f,pointLabels:m,legend:e,hover:null,dragging:null};if(p=g,b){let e=ne(s,b.event,t.crosshair),n=i.scales.xToPx(b.event.items[0].x);g.hover={event:b.event,marks:ae(s,i.scales,b.event),crosshairX:e&&n>=i.plot.x&&n<=i.plot.x+i.plot.width?n:null,tooltip:S?.kind===`pan`||S?.kind===`point`?null:se(b.event,b.x,b.y)}}if(S?.kind===`point`){let e=s.series[S.item.seriesIndex];g.dragging={x:S.x,y:S.y,color:S.item.color,size:(e?ue(e,S.item.index):8)+6}}let v=i.plot,x=`${v.x},${v.y},${v.width},${v.height}`;return x!==_&&(_=x,T(`layout`,{...v})),g},A=()=>((g||!p)&&(g=!1,p=le()),p),j=()=>A()?.layout.scales??null,F=e=>{let t=!re(b?.event??null,e?.event??null);b=e,E(),t&&T(`hover`,e?e.event:null)},I=(e,t,n)=>{let r=j();return r?fe(s,r,p?.layout.xTicks??null,e,t,n?8:0):null},ge=(e,t)=>{let n=j()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},L=(e,t)=>{let n=j();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t));return{x:n.pxToX(i),y:n.pxToY(a)}},B=(e,t)=>{let{base:n,minSpan:r}=s;c={x:N(e.x,n.x,r.x),y:N(e.y,n.y,r.y)},l=!M(c.x,n.x)||!M(c.y,n.y),t&&T(`zoom`,R(c)),E()},be=(e,t,n)=>{let r=j();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=R(c);s.zoom.x&&(i.x=P(c.x,r.pxToX(e),n)),s.zoom.y&&(i.y=P(c.y,r.pxToY(t),n)),B(i,!0)},V=()=>{l&&B(R(s.base),!0)},H=(e,t)=>A()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,U=e=>{a.has(e)?a.delete(e):a.add(e),O()},xe=()=>{let[e,t]=[...x.values()];S={kind:`pinch`,view:R(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},F(null)};return s=me(t,r,a,i),O(),{setOptions(e){if(v)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=m(n,t.palette)),O()},setTheme(e){v||(n=e,r=m(n,t.palette),O())},setSize(e,t){(e!==u||t!==d)&&(u=Math.max(0,e),d=Math.max(0,t),E())},getScene:A,pointerDown:(e,t,n={})=>{if(v)return;let r=n.id??0,i=!!n.touch;x.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=ee();if(x.size===2){a&&(s.zoom.x||s.zoom.y)&&S?.kind!==`point`&&xe();return}if(x.size>2||!a){if(!a&&i){let n=I(e,t,!0);F(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=I(e,t,i)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){S={kind:`point`,item:n,x:e,y:t};return}}if(l&&a.pan&&ge(e,t)){S={kind:`pan`,view:R(c),x:e,y:t};return}if(S=null,i){let n=I(e,t,!0);F(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(v)return;let r=n.id??0,i=x.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?ve:_e)&&(i.moved=!0)),S?.kind===`pinch`&&x.size>=2){let[e,t]=[...x.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=j();if(!a)return;let o=te(a.plot,S.view,s.x.reverse,s.y.reverse),c=S.distance/n,l=R(S.view);if(s.zoom.x){l.x=P(S.view.x,o.pxToX(S.midX),c);let e=(r-S.midX)*o.xPerPx*c;l.x=k(l.x,s.x.reverse?e:-e)}if(s.zoom.y){l.y=P(S.view.y,o.pxToY(S.midY),c);let e=(i-S.midY)*o.yPerPx*c;l.y=k(l.y,s.y.reverse?-e:e)}B(l,!0);return}if(S?.kind===`point`&&i){if(!i.moved)return;S.x=e,S.y=t;let n=L(e,t);E(),n&&T(`drag`,{item:S.item,x:n.x,y:n.y});return}if(S?.kind===`pan`&&i){if(!i.moved)return;let n=j();if(!n)return;let r=e-S.x,a=t-S.y,o=R(S.view);s.zoom.x&&(o.x=k(S.view.x,-r*n.xPerPx*(s.x.reverse?-1:1))),s.zoom.y&&(o.y=k(S.view.y,a*n.yPerPx*(s.y.reverse?-1:1))),B(o,!0);return}if(!(x.size>1)&&(!i||i.touch||!n.touch)){let r=I(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&F(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(v)return;let r=n.id??0,i=x.get(r);x.delete(r);let a=S;if(a?.kind===`pinch`){x.size<2&&(S=null);return}if(S=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=L(e,t);E(),n&&T(`drop`,{item:a.item,x:n.x,y:n.y});return}}else if(a?.kind===`pan`&&i.moved){E();return}if(i.moved){i.touch&&E();return}let o=Date.now();if(i.touch&&o-C.time<ye&&Math.hypot(e-C.x,t-C.y)<24&&l){C={time:0,x:e,y:t},V();return}C={time:o,x:e,y:t};let s=H(e,t);if(s){A()?.legend?.toggle&&U(s.id);return}let c=I(e,t,i.touch);if(c){i.touch&&F({event:c,x:e,y:t}),T(`click`,c);return}if(i.touch&&F(null),ge(e,t)){let n=L(e,t);n&&T(`plotClick`,n)}},pointerCancel:(e={})=>{x.delete(e.id??0),(S?.kind===`point`||x.size<2)&&(S=null),E()},pointerLeave(){!S&&b&&F(null)},zoomAt:be,resetZoom:V,getView:()=>R(c),setView(e){v||B({x:e.x??c.x,y:e.y??c.y},!1)},toggleSeries:U,clearHover(){b&&F(null)},getPlotRect(){let e=A()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=j();return n?{x:n.xToPx(e),y:n.yToPx(t)}:null},fromPixel(e,t){let n=j();return n?{x:n.pxToX(e),y:n.pxToY(t)}:null},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){v=!0,x.clear();for(let e of Object.keys(o))delete o[e]}}}})))()}var V,H,U,xe;function Se(){return(Se=e((()=>{_(),E(),S(),O(),ie(),be(),V=e=>(e[0]+e[1])/2,H=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},U=(e,t,n,r,i,a=I(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;if(e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),x(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,theme:c,annotations:t.annotations}),t.legend){e.font=w(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=b(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}for(let n of t.hover?.marks??[])n.kind===`band`&&(H(e,n.x,n.y,n.width,n.height,6),e.fillStyle=b(c.text,.06),e.fill());let h=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[_,v]=h(u.x,r.x,l.x.reverse),[y,S]=h(u.y,r.y,l.y.reverse);if(a.paint(n,{transform:{xScale:_,xOffset:v,yScale:y,yOffset:S},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m)),e.setTransform(m,0,0,m,0,0),g(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1}),t.pointLabels.length){e.save(),e.font=w(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=b(c.background,.9),e.fillStyle=b(c.text,.85);for(let{label:n,box:r}of t.pointLabels)e.strokeText(n.text,r.x,r.y+r.height/2),e.fillText(n.text,r.x,r.y+r.height/2);e.restore()}let C=t.hover;if(C){if(C.crosshairX!==null){e.save(),e.strokeStyle=b(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(C.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}for(let t of C.marks)if(t.kind!==`band`){if(t.kind===`cell`){H(e,t.x,t.y,t.width,t.height,3),e.lineWidth=3,e.strokeStyle=b(c.background),e.stroke(),e.lineWidth=1.5,e.strokeStyle=b(c.text,.55),e.stroke();continue}e.beginPath(),e.arc(t.x,t.y,t.size/2+4,0,Math.PI*2),e.fillStyle=t.halo,e.fill(),e.beginPath(),e.arc(t.x,t.y,t.size/2-1,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=b(c.background),e.stroke()}}if(t.dragging){let n=t.dragging;e.beginPath(),e.arc(n.x,n.y,n.size/2,0,Math.PI*2),e.fillStyle=n.color,e.globalAlpha=.85,e.fill(),e.globalAlpha=1,e.lineWidth=2,e.strokeStyle=b(c.background),e.stroke()}let T=C?.tooltip;if(T){let{box:t,lineHeight:n,padding:r}=T;e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,H(e,t.x,t.y,t.width,t.height,8),e.fillStyle=b(c.background),e.fill(),e.restore(),H(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=b(c.axis,.6),e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let i=t.y+r+n/2,a=t.x+r+2,o=t.x+t.width-r-2;if(T.text){e.font=w(c,12),e.fillStyle=b(c.text),e.textAlign=`left`;for(let t of T.text)e.fillText(t,a,i),i+=n}else{let{content:t}=T,r=a;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=w(c,12,600),e.fillStyle=b(c.text),e.textAlign=`left`,e.fillText(t.title,r,i),i+=n;for(let s of t.rows)r=a,s.color&&(e.fillStyle=s.color,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=w(c,12),e.textAlign=`left`,e.fillStyle=b(c.textMuted),e.fillText(s.name,r,i),e.font=w(c,12,600),e.textAlign=`right`,e.fillStyle=b(c.text),e.fillText(s.value,o,i),i+=n}}},xe=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u=``,d=e.options,f=new WeakMap,p=0,m=e=>{let t=f.get(e);return t===void 0&&f.set(e,t=++p),t},h={x:0,y:0},g=0,_=``,v=(e,t)=>n?(t!==_&&(n.font=t,_=t),n.measureText(e).width):e.length*6.5,y=n?I(n):null,b=globalThis,x=()=>{if(s=null,o||!n||!y)return;let e=C.getScene();if(!e)return;let f=Math.max(1,Math.round(r*a)),p=Math.max(1,Math.round(i*a));if(t.width!==f&&(t.width=f),t.height!==p&&(t.height=p),_=``,l!==e.model){l=e.model;let t=A(e.model,m(e.theme),e=>d.series[e]?.stack);t!==u&&(u=t,h={x:V(e.model.base.x),y:V(e.model.base.y)},c=D(e.model,h,++g))}U(n,e,c,h,a,y),_=``},S=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(x):b.requestAnimationFrame?b.requestAnimationFrame(x):setTimeout(x,16))},C=B({options:e.options,theme:e.theme,measureText:v,onInvalidate:S});C.setSize(r,i);let w=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>{d=e,C.setOptions(e)},setTheme:e=>C.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),C.setSize(e,t),S()},render(){s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):b.cancelAnimationFrame?b.cancelAnimationFrame(s):clearTimeout(s)),x()},touchStart(e){e.forEach((e,t)=>C.pointerDown(e.x,e.y,w(e,t)))},touchMove(e){e.forEach((e,t)=>C.pointerMove(e.x,e.y,w(e,t)))},touchEnd(e){e.forEach((e,t)=>C.pointerUp(e.x,e.y,w(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>C.pointerCancel(w(e,t)))},pointerDown:(e,t,n)=>C.pointerDown(e,t,n),pointerMove:(e,t,n)=>C.pointerMove(e,t,n),pointerUp:(e,t,n)=>C.pointerUp(e,t,n),pointerLeave:()=>C.pointerLeave(),zoomAt:(e,t,n)=>C.zoomAt(e,t,n),resetZoom:()=>C.resetZoom(),getView:()=>C.getView(),setView:e=>C.setView(e),toggleSeries:e=>C.toggleSeries(e),clearHover:()=>C.clearHover(),getPlotRect:()=>C.getPlotRect(),toPixel:(e,t)=>C.toPixel(e,t),fromPixel:(e,t)=>C.fromPixel(e,t),getController:()=>C,on:(e,t)=>C.on(e,t),destroy(){o||(o=!0,s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):b.cancelAnimationFrame?b.cancelAnimationFrame(s):clearTimeout(s)),y?.destroy(),C.destroy())}}}})))()}function Ce(){let e=(0,W.useRef)(null),[t,n]=(0,W.useState)(`…`),[r,i]=(0,W.useState)(null);(0,W.useEffect)(()=>{let t=e.current;if(!t)return;let r=j(t,{series:[{name:`Downloads`,type:`bar`,data:we.map((e,t)=>[e,Te[t]])}],yAxis:{format:e=>p(e)},ariaLabel:`Downloads per release`}),a=!0;r.ready.then(e=>{a&&n(e??`unsupported`)});let o=r.on(`click`,i);return()=>{a=!1,o(),r.destroy()}},[]);let a=r?.items[0],o=r&&a?`${r.xLabel}: ${p(a.y)} downloads`:`Click a bar`;return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,G.jsx)(`div`,{ref:e,style:{height:300}}),(0,G.jsxs)(`p`,{role:`status`,children:[`Renderer: `,t,` · `,o]})]})}var W,G,we,Te;function Ee(){return(Ee=e((()=>{W=t(),F(),v(),G=n(),we=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],Te=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function De(){let e=(0,K.useRef)(null),t=(0,K.useRef)(null),[n,r]=(0,K.useState)(`Click a point`);(0,K.useEffect)(()=>{let n=e.current;if(!n)return;let i=()=>n.getBoundingClientRect(),a=xe({canvas:n,width:i().width,height:i().height,pixelRatio:window.devicePixelRatio||1,theme:Me(n),options:{series:[{name:`Visits`,type:`area`,data:Oe.map((e,t)=>[e,ke[t]])},{name:`Sign-ups`,type:`line`,data:Oe.map((e,t)=>[e,Ae[t]*10])}],yAxis:{format:e=>p(e)},crosshair:!0,ariaLabel:`Visits and sign-ups per month`}});t.current=a;let o=a.on(`click`,e=>{let t=e.items[0];t&&r(`${e.xLabel}: ${p(t.y)}`)}),s=a.on(`plotClick`,()=>r(`Click a point`)),c=new ResizeObserver(()=>{let{width:e,height:t}=i();a.resize(e,t,window.devicePixelRatio||1)});c.observe(n);let l=new MutationObserver(()=>a.setTheme(Me(n)));return l.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{o(),s(),c.disconnect(),l.disconnect(),a.destroy(),t.current=null}},[]);let i=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,q.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":`Visits and sign-ups per month`,style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...i(e)),onPointerMove:e=>t.current?.pointerMove(...i(e)),onPointerUp:e=>t.current?.pointerUp(...i(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,q.jsx)(`p`,{role:`status`,children:n})]})}var K,q,Oe,ke,Ae,je,Me;function Ne(){return(Ne=e((()=>{K=t(),Se(),v(),q=n(),Oe=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`],ke=[4200,5100,4800,6900,7400,8800,8100,9600],Ae=[310,420,380,560,610,790,720,880],je=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],Me=e=>{let t=getComputedStyle(e),n={};for(let e of je){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function Pe(){let e=(0,J.useRef)(null),t=(0,J.useRef)(null),[n,r]=(0,J.useState)(`pie`),[i,a]=(0,J.useState)(null);(0,J.useEffect)(()=>{let n=e.current;if(!n)return;let r=L(n,X.pie);t.current=r;let i=r.on(`click`,a);return()=>{i(),r.destroy(),t.current=null}},[]);let s=e=>{r(e),a(null),t.current?.setOptions(X[e])};return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Y.jsx)(`div`,{style:{display:`flex`,gap:8},children:Object.keys(X).map(e=>(0,Y.jsx)(o,{size:`small`,variant:n===e?`solid`:`outline`,"aria-pressed":n===e,onClick:()=>s(e),children:e},e))}),(0,Y.jsx)(`div`,{ref:e,style:{height:300}}),(0,Y.jsx)(`p`,{role:`status`,children:i?`${i.name}: ${i.value} (${Math.round(i.percent*100)}%)`:`Click a slice or a stage`})]})}var J,Y,Fe,X;function Ie(){return(Ie=e((()=>{J=t(),a(),ge(),Y=n(),Fe=[{name:`Search`,value:4200},{name:`Direct`,value:2600},{name:`Social`,value:1500},{name:`Email`,value:900},{name:`Referral`,value:600}],X={pie:{type:`pie`,data:Fe,ariaLabel:`Visits per source`},donut:{type:`pie`,data:Fe,innerRadius:.62,padAngle:2,cornerRadius:4,centerValue:`9.8k`,centerLabel:`visits`,labels:`none`,ariaLabel:`Visits per source`},funnel:{type:`funnel`,data:[{name:`Visits`,value:9800},{name:`Sign-ups`,value:3100},{name:`Trials`,value:1400},{name:`Customers`,value:520}],ariaLabel:`Conversion funnel`}}})))()}function Le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Re(){let e=(0,Z.useRef)(null),t=(0,Z.useRef)(null),n=(0,Z.useRef)([]),r=(0,Z.useRef)(Le(17)),[i,a]=(0,Z.useState)(!1),[s,c]=(0,Z.useState)(0);return(0,Z.useEffect)(()=>{let i=e.current;if(!i)return;let a=Le(17);r.current=a;let o=[];for(let e=0;e<20;e++)o.push(ze(a,o[e-1]));n.current=o;let s=j(i,Be(o));return t.current=s,c(o.length),()=>{s.destroy(),t.current=null}},[]),(0,Z.useEffect)(()=>{if(i)return;let e=setInterval(()=>{let e=n.current,i=[...e.slice(-119),ze(r.current,e[e.length-1])];n.current=i,t.current?.setOptions(Be(i)),c(e=>e+1)},500);return()=>clearInterval(e)},[i]),(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Q.jsx)(`div`,{ref:e,style:{height:300,width:`100%`}}),(0,Q.jsx)(o,{variant:`outline`,onClick:()=>a(e=>!e),children:i?`Resume`:`Pause`}),(0,Q.jsxs)(`p`,{role:`status`,children:[i?`Paused`:`Streaming`,` · `,s,` points received`]})]})}var Z,Q,ze,Be;function Ve(){return(Ve=e((()=>{Z=t(),a(),F(),Q=n(),ze=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},Be=e=>({series:[{name:`CPU (%)`,type:`area`,data:e,opacity:.2}],xAxis:{title:`Seconds`},yAxis:{min:0,max:100},interaction:!1,ariaLabel:`Live CPU usage`})})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useEffect, useRef, useState } from "react";
import {
  createChart,
  formatCompact,
  type ChartHoverEvent,
} from "minerva-design/charts/core";

const releases = ["v1.0", "v1.1", "v1.2", "v2.0", "v2.1", "v2.2", "v3.0"];
const downloads = [120e3, 185e3, 240e3, 610e3, 720e3, 830e3, 1.42e6];

export default function BasicDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState("…");
  const [clicked, setClicked] = useState<ChartHoverEvent | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createChart(container, {
      series: [
        {
          name: "Downloads",
          type: "bar",
          data: releases.map((release, i) => [release, downloads[i]] as const),
        },
      ],
      yAxis: { format: (value) => formatCompact(value) },
      ariaLabel: "Downloads per release",
    });
    let active = true;
    void chart.ready.then((kind) => {
      if (active) setRenderer(kind ?? "unsupported");
    });
    const off = chart.on("click", setClicked);
    return () => {
      active = false;
      off();
      chart.destroy();
    };
  }, []);

  const item = clicked?.items[0];
  const result =
    clicked && item
      ? \`\${clicked.xLabel}: \${formatCompact(item.y)} downloads\`
      : "Click a bar";
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        Renderer: {renderer} · {result}
      </p>
    </div>
  );
}
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  createCanvasChart,
  formatCompact,
  type ChartThemeInput,
} from "minerva-design/charts/core";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
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
  const [status, setStatus] = useState("Click a point");

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
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
            name: "Visits",
            type: "area",
            data: months.map((month, i) => [month, visits[i]] as const),
          },
          {
            name: "Sign-ups",
            type: "line",
            data: months.map((month, i) => [month, signups[i] * 10] as const),
          },
        ],
        yAxis: { format: (value) => formatCompact(value) },
        crosshair: true,
        ariaLabel: "Visits and sign-ups per month",
      },
    });
    chartRef.current = chart;

    const offClick = chart.on("click", (event) => {
      const item = event.items[0];
      if (item) setStatus(\`\${event.xLabel}: \${formatCompact(item.y)}\`);
    });
    const offPlot = chart.on("plotClick", () => setStatus("Click a point"));

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
  }, []);

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
        aria-label="Visits and sign-ups per month"
        style={{ width: "100%", height: 280, touchAction: "none" }}
        onPointerDown={(event) => chartRef.current?.pointerDown(...at(event))}
        onPointerMove={(event) => chartRef.current?.pointerMove(...at(event))}
        onPointerUp={(event) => chartRef.current?.pointerUp(...at(event))}
        onPointerLeave={() => chartRef.current?.pointerLeave()}
      />
      <p role="status">{status}</p>
    </div>
  );
}
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { useEffect, useRef, useState } from "react";
import { Button } from "minerva-design";
import {
  createShapeChart,
  type ShapeChartInstance,
  type ShapeChartOptions,
  type ShapeHoverEvent,
} from "minerva-design/charts/core";

const traffic = [
  { name: "Search", value: 4200 },
  { name: "Direct", value: 2600 },
  { name: "Social", value: 1500 },
  { name: "Email", value: 900 },
  { name: "Referral", value: 600 },
];

const views: Record<"pie" | "donut" | "funnel", ShapeChartOptions> = {
  pie: {
    type: "pie",
    data: traffic,
    ariaLabel: "Visits per source",
  },
  donut: {
    type: "pie",
    data: traffic,
    innerRadius: 0.62,
    padAngle: 2,
    cornerRadius: 4,
    centerValue: "9.8k",
    centerLabel: "visits",
    labels: "none",
    ariaLabel: "Visits per source",
  },
  funnel: {
    type: "funnel",
    data: [
      { name: "Visits", value: 9800 },
      { name: "Sign-ups", value: 3100 },
      { name: "Trials", value: 1400 },
      { name: "Customers", value: 520 },
    ],
    ariaLabel: "Conversion funnel",
  },
};
type View = keyof typeof views;

export default function ShapesDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ShapeChartInstance | null>(null);
  const [view, setView] = useState<View>("pie");
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createShapeChart(container, views.pie);
    chartRef.current = chart;
    const off = chart.on("click", setPicked);
    return () => {
      off();
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  const show = (next: View) => {
    setView(next);
    setPicked(null);
    // animates from the previous values
    chartRef.current?.setOptions(views[next]);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {(Object.keys(views) as View[]).map((name) => (
          <Button
            key={name}
            size="small"
            variant={view === name ? "solid" : "outline"}
            aria-pressed={view === name}
            onClick={() => show(name)}
          >
            {name}
          </Button>
        ))}
      </div>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        {picked
          ? \`\${picked.name}: \${picked.value} (\${Math.round(picked.percent * 100)}%)\`
          : "Click a slice or a stage"}
      </p>
    </div>
  );
}
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { useEffect, useRef, useState } from "react";
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

const nextPoint = (random: () => number, previous?: Point): Point => {
  const [x, y] = previous ?? [0, 50];
  return [x + 0.5, Math.min(100, Math.max(0, y + (random() - 0.5) * 8))];
};

const optionsFor = (data: readonly Point[]): ChartOptions => ({
  series: [{ name: "CPU (%)", type: "area", data, opacity: 0.2 }],
  xAxis: { title: "Seconds" },
  yAxis: { min: 0, max: 100 },
  interaction: false,
  ariaLabel: "Live CPU usage",
});

export default function StreamingDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const dataRef = useRef<readonly Point[]>([]);
  const randomRef = useRef(mulberry32(17));
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);

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
    const chart = createChart(container, optionsFor(initial));
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
      chartRef.current?.setOptions(optionsFor(next));
      setCount((value) => value + 1);
    }, 500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      style={{ display: "grid", gap: 8, width: "100%", justifyItems: "start" }}
    >
      <div ref={ref} style={{ height: 300, width: "100%" }} />
      <Button variant="outline" onClick={() => setPaused((value) => !value)}>
        {paused ? "Resume" : "Pause"}
      </Button>
      <p role="status">
        {paused ? "Paused" : "Streaming"} · {count} points received
      </p>
    </div>
  );
}
`})))()}var $,Xe,Ze;function Qe(){return(Qe=e((()=>{Ee(),Ne(),Ie(),Ve(),Ue(),Ge(),qe(),Ye(),t(),r(),u(),s(),f(),$=n(),Xe=l(Object.assign({"./demos/basic.tsx":Ce,"./demos/canvas.tsx":De,"./demos/shapes.tsx":Pe,"./demos/streaming.tsx":Re}),Object.assign({"./demos/basic.tsx":He,"./demos/canvas.tsx":We,"./demos/shapes.tsx":Ke,"./demos/streaming.tsx":Je})),Ze=()=>{let{t:e}=i(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(d,{id:`chart-engine`,demos:Xe,intro:t})}})))()}Qe();export{Ze as default};