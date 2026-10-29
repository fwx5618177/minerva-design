import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Dt as r,Ot as i}from"./io5-CsJcK0E2.js";import{R as a,z as o}from"./ProgressIndicator-BhPa7d9i.js";import{i as s,r as c}from"./DemoBlock-BlhGv9r1.js";import{l,n as u,t as d,u as f}from"./DocPage-PfpTBKws.js";import{A as p,C as m,D as h,E as g,F as _,I as v,L as y,M as b,N as x,O as S,P as C,S as w,T,_ as ee,a as E,b as te,c as D,d as ne,f as re,g as ie,h as ae,i as O,j as oe,k as se,l as k,m as ce,n as A,o as j,p as le,r as M,s as N,t as P,u as ue,v as de,w as fe,x as F,y as pe}from"./chart-CA6LdI0f.js";var I,me,he,ge,L,R;function z(){return(z=e((()=>{oe(),S(),m(),ce(),D(),O(),I=e=>({x:[e.x[0],e.x[1]],y:[e.y[0],e.y[1]]}),me=6,he=10,ge=320,L=20,R=e=>{let t=e.options,n=e.theme,r=k(n,t.palette),i=new Map,a=new Set,o={},s,c={x:[0,1],y:[0,1]},l=!1,u=0,d=0,f=[],m=null,h=!0,_=``,v=!1,y=null,b=new Map,x=null,S={time:0,x:0,y:0},C=(e,t)=>{o[e]?.forEach(e=>e(t))},w=()=>{h=!0,v||e.onInvalidate?.()},te=()=>{let e=t.interaction;if(e===!1)return null;let n=typeof e==`object`?e:{};return{pan:n.pan??!0,dragPoints:n.dragPoints??!1}},D=(t,n=r.fontSize,i=400)=>e.measureText(t,g(r,n,i)),O=()=>{s=se(t,r,a,i);let{base:e,minSpan:n}=s;l?(c={x:s.zoom.x?M(c.x,e.x,n.x):[...e.x],y:s.zoom.y?M(c.y,e.y,n.y):[...e.y]},l=!j(c.x,e.x)||!j(c.y,e.y)):c=I(e),f=ae(t.annotations,r),y&&(y.event.items.every(e=>s.series[e.seriesIndex]&&!s.series[e.seriesIndex].hidden&&e.index<s.series[e.seriesIndex].cols.count)||R(null)),w()},oe=()=>{let e=t.legend,n=t.series.filter(e=>e.name).length;if(!(e===void 0?n>1:e))return null;let r=typeof e==`object`?e:{},i=r.position===`bottom`?`bottom`:`top`,a=[],o=4,c=0;for(let e of s.series){let t=14+D(e.name,12)+8;o+t>u-4&&o>4&&(o=4,c++),a.push({id:e.id,name:e.name,color:e.colorCss,shape:e.type===`scatter`?`dot`:e.type===`line`?`line`:`square`,hidden:e.hidden,box:{x:o,y:c*L,width:t,height:L}}),o+=t+10}let l=(c+1)*L+6;if(i===`bottom`)for(let e of a)e.box.y+=d-l+6;return{entries:a,position:i,toggle:r.toggle??!0,height:l}},ce=(e,n,r)=>{let i=t.tooltip;if(i===!1)return null;let a=typeof i==`object`?i.render:void 0,o=null;if(a){let t=a(e);if(t===null||t===``)return null;typeof t==`string`&&(o=t.split(`
`))}let c=de(s,e,m?.layout.yTicks??null),l=0,f;if(o){for(let e of o)l=Math.max(l,D(e,12));f=o.length}else{l=D(c.title,12,600)+(c.titleColor?14:0);for(let e of c.rows)l=Math.max(l,(e.color?14:0)+D(e.name,12)+16+D(e.value,12,600));f=1+c.rows.length}let p=Math.ceil(Math.max(l,96)+16+4),h=f*18+16,g=n+14;g+p>u-4&&(g=n-14-p),g=Math.max(4,Math.min(g,u-p-4));let _=Math.max(4,Math.min(r-h/2,d-h-4));return{content:c,text:o,box:{x:g,y:_,width:p,height:h},lineHeight:18,padding:8}},A=()=>{if(u<=0||d<=0)return null;let e=oe(),n=e?.position===`top`?e.height:0,i=ee({model:s,view:c,theme:r,width:u,height:d-(e?.height??0),padding:t.padding,top:n,measure:e=>D(e)}),a=le(s,c,i.scales),o=[],l=r.fontSize+4;for(let e of f){if(e.type===`text`&&e.text){o.push(T(e,i.scales,D(e.text,r.fontSize,e.weight),l));continue}if(e.type!==`rect`||!e.label)continue;let t=i.scales,n=e.x0===void 0?i.plot.x:t.xToPx(e.x0),a=e.x1===void 0?i.plot.x+i.plot.width:t.xToPx(e.x1),s=e.y0===void 0?i.plot.y+i.plot.height:t.yToPx(e.y0),c=e.y1===void 0?i.plot.y:t.yToPx(e.y1),u=D(e.label,r.fontSize+1,600),d=Math.min(n,a),f=Math.max(n,a),p=Math.min(s,c),m=Math.max(s,c),h=e.labelPosition;o.push({x:h.endsWith(`left`)?d+10:h.endsWith(`right`)?f-10-u:(d+f-u)/2,y:h.startsWith(`top`)?p+10:h.startsWith(`bottom`)?m-10-l:(p+m-l)/2,width:u,height:l})}let p=fe(a,i.plot,e=>D(e),l-2,o),h={width:u,height:d,theme:r,model:s,view:I(c),layout:i,annotations:f,pointLabels:p,legend:e,hover:null,dragging:null};if(m=h,y){let e=ue(s,y.event,t.crosshair),n=i.scales.xToPx(y.event.items[0].x);h.hover={event:y.event,marks:ne(s,i.scales,y.event),crosshairX:e&&n>=i.plot.x&&n<=i.plot.x+i.plot.width?n:null,tooltip:x?.kind===`pan`||x?.kind===`point`?null:ce(y.event,y.x,y.y)}}if(x?.kind===`point`){let e=s.series[x.item.seriesIndex];h.dragging={x:x.x,y:x.y,color:x.item.color,size:(e?ie(e,x.item.index):8)+6}}let g=i.plot,v=`${g.x},${g.y},${g.width},${g.height}`;return v!==_&&(_=v,C(`layout`,{...g})),h},P=()=>((h||!m)&&(h=!1,m=A()),m),F=()=>P()?.layout.scales??null,R=e=>{let t=!re(y?.event??null,e?.event??null);y=e,w(),t&&C(`hover`,e?e.event:null)},z=(e,t,n)=>{let r=F();return r?pe(s,r,m?.layout.xTicks??null,e,t,n?8:0):null},B=(e,t)=>{let n=F()?.plot;return!!n&&e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height},V=(e,t)=>{let n=F();if(!n)return null;let{plot:r}=n,i=Math.max(r.x,Math.min(r.x+r.width,e)),a=Math.max(r.y,Math.min(r.y+r.height,t));return{x:n.pxToX(i),y:n.pxToY(a)}},H=(e,t)=>{let{base:n,minSpan:r}=s;c={x:M(e.x,n.x,r.x),y:M(e.y,n.y,r.y)},l=!j(c.x,n.x)||!j(c.y,n.y),t&&C(`zoom`,I(c)),w()},U=(e,t,n)=>{let r=F();if(!r||!s.zoom.x&&!s.zoom.y)return;let i=I(c);s.zoom.x&&(i.x=N(c.x,r.pxToX(e),n)),s.zoom.y&&(i.y=N(c.y,r.pxToY(t),n)),H(i,!0)},W=()=>{l&&H(I(s.base),!0)},_e=(e,t)=>P()?.legend?.entries.find(n=>e>=n.box.x&&e<=n.box.x+n.box.width&&t>=n.box.y&&t<=n.box.y+n.box.height)??null,G=e=>{a.has(e)?a.delete(e):a.add(e),O()},K=()=>{let[e,t]=[...b.values()];x={kind:`pinch`,view:I(c),distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2},R(null)};return s=se(t,r,a,i),O(),{setOptions(e){if(v)return;let i=(e.palette??[]).join()!==(t.palette??[]).join();t=e,i&&(r=k(n,t.palette)),O()},setTheme(e){v||(n=e,r=k(n,t.palette),O())},setSize(e,t){(e!==u||t!==d)&&(u=Math.max(0,e),d=Math.max(0,t),w())},getScene:P,pointerDown:(e,t,n={})=>{if(v)return;let r=n.id??0,i=!!n.touch;b.set(r,{x:e,y:t,startX:e,startY:t,touch:i,moved:!1});let a=te();if(b.size===2){a&&(s.zoom.x||s.zoom.y)&&x?.kind!==`point`&&K();return}if(b.size>2||!a){if(!a&&i){let n=z(e,t,!0);R(n?{event:n,x:e,y:t}:null)}return}if(a.dragPoints){let n=z(e,t,i)?.items.find(e=>s.series[e.seriesIndex].type===`scatter`);if(n){x={kind:`point`,item:n,x:e,y:t};return}}if(l&&a.pan&&B(e,t)){x={kind:`pan`,view:I(c),x:e,y:t};return}if(x=null,i){let n=z(e,t,!0);R(n?{event:n,x:e,y:t}:null)}},pointerMove:(e,t,n={})=>{if(v)return;let r=n.id??0,i=b.get(r);if(i&&(i.x=e,i.y=t,!i.moved&&Math.hypot(e-i.startX,t-i.startY)>(i.touch?he:me)&&(i.moved=!0)),x?.kind===`pinch`&&b.size>=2){let[e,t]=[...b.values()],n=Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),r=(e.x+t.x)/2,i=(e.y+t.y)/2,a=F();if(!a)return;let o=p(a.plot,x.view,s.x.reverse,s.y.reverse),c=x.distance/n,l=I(x.view);if(s.zoom.x){l.x=N(x.view.x,o.pxToX(x.midX),c);let e=(r-x.midX)*o.xPerPx*c;l.x=E(l.x,s.x.reverse?e:-e)}if(s.zoom.y){l.y=N(x.view.y,o.pxToY(x.midY),c);let e=(i-x.midY)*o.yPerPx*c;l.y=E(l.y,s.y.reverse?-e:e)}H(l,!0);return}if(x?.kind===`point`&&i){if(!i.moved)return;x.x=e,x.y=t;let n=V(e,t);w(),n&&C(`drag`,{item:x.item,x:n.x,y:n.y});return}if(x?.kind===`pan`&&i){if(!i.moved)return;let n=F();if(!n)return;let r=e-x.x,a=t-x.y,o=I(x.view);s.zoom.x&&(o.x=E(x.view.x,-r*n.xPerPx*(s.x.reverse?-1:1))),s.zoom.y&&(o.y=E(x.view.y,a*n.yPerPx*(s.y.reverse?-1:1))),H(o,!0);return}if(!(b.size>1)&&(!i||i.touch||!n.touch)){let r=z(e,t,!!i?.touch||!!n.touch);(r||!i?.touch)&&R(r?{event:r,x:e,y:t}:null)}},pointerUp:(e,t,n={})=>{if(v)return;let r=n.id??0,i=b.get(r);b.delete(r);let a=x;if(a?.kind===`pinch`){b.size<2&&(x=null);return}if(x=null,!i)return;if(a?.kind===`point`){if(i.moved){let n=V(e,t);w(),n&&C(`drop`,{item:a.item,x:n.x,y:n.y});return}}else if(a?.kind===`pan`&&i.moved){w();return}if(i.moved){i.touch&&w();return}let o=Date.now();if(i.touch&&o-S.time<ge&&Math.hypot(e-S.x,t-S.y)<24&&l){S={time:0,x:e,y:t},W();return}S={time:o,x:e,y:t};let s=_e(e,t);if(s){P()?.legend?.toggle&&G(s.id);return}let c=z(e,t,i.touch);if(c){i.touch&&R({event:c,x:e,y:t}),C(`click`,c);return}if(i.touch&&R(null),B(e,t)){let n=V(e,t);n&&C(`plotClick`,n)}},pointerCancel:(e={})=>{b.delete(e.id??0),(x?.kind===`point`||b.size<2)&&(x=null),w()},pointerLeave(){!x&&y&&R(null)},zoomAt:U,resetZoom:W,getView:()=>I(c),setView(e){v||H({x:e.x??c.x,y:e.y??c.y},!1)},toggleSeries:G,clearHover(){y&&R(null)},getPlotRect(){let e=P()?.layout.plot;return e?{...e}:null},toPixel(e,t){let n=F();return n?{x:n.xToPx(e),y:n.yToPx(t)}:null},fromPixel(e,t){let n=F();return n?{x:n.pxToX(e),y:n.pxToY(t)}:null},on(e,t){let n=o[e];return n||(n=new Set,o[e]=n),n.add(t),()=>{n.delete(t)}},destroy(){v=!0,b.clear();for(let e of Object.keys(o))delete o[e]}}}})))()}var B,V,H,U;function W(){return(W=e((()=>{_(),x(),m(),te(),z(),B=e=>(e[0]+e[1])/2,V=(e,t,n,r,i,a)=>{e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i-a),e.arcTo(t+r,n+i,t+r-a,n+i,a),e.lineTo(t+a,n+i),e.arcTo(t,n+i,t,n+i-a,a),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath()},H=(e,t,n,r,i,a=F(e))=>{let{width:o,height:s,theme:c,model:l,view:u,layout:d}=t,{plot:f,scales:p}=d,m=i;if(e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,Math.ceil(o*m),Math.ceil(s*m)),e.setTransform(m,0,0,m,0,0),w(e,{width:o,height:s,scales:p,x:l.x,y:l.y,xTicks:d.xTicks,yTicks:d.yTicks,theme:c,annotations:t.annotations}),t.legend){e.font=g(c,12),e.textBaseline=`middle`,e.textAlign=`left`;for(let n of t.legend.entries){let t=n.box.y+n.box.height/2;if(e.globalAlpha=n.hidden?.45:1,e.fillStyle=n.color,n.shape===`dot`?(e.beginPath(),e.arc(n.box.x+5,t,4,0,Math.PI*2),e.fill()):n.shape===`line`?e.fillRect(n.box.x,t-1,10,2):e.fillRect(n.box.x+1,t-4,8,8),e.fillStyle=C(c.textMuted),e.fillText(n.name,n.box.x+14,t),n.hidden){let r=n.box.width-22;e.fillRect(n.box.x+14,t,r,1)}}e.globalAlpha=1}let _=(e,t,n)=>{let r=2/(e[1]-e[0]),i=(t-e[0])*r-1;return n?[-r,-i]:[r,i]},[v,y]=_(u.x,r.x,l.x.reverse),[b,x]=_(u.y,r.y,l.y.reverse);if(a.paint(n,{transform:{xScale:v,xOffset:y,yScale:b,yOffset:x},width:Math.max(1,Math.round(f.width*m)),height:Math.max(1,Math.round(f.height*m)),dpr:m},Math.round(f.x*m),Math.round(f.y*m)),e.setTransform(m,0,0,m,0,0),h(e,{width:o,height:s,scales:p,theme:c,annotations:t.annotations,pointLabels:[],clear:!1}),t.pointLabels.length){e.save(),e.font=g(c),e.textAlign=`left`,e.textBaseline=`middle`,e.lineWidth=3,e.lineJoin=`round`,e.strokeStyle=C(c.background,.9),e.fillStyle=C(c.text,.85);for(let{label:n,box:r}of t.pointLabels)e.strokeText(n.text,r.x,r.y+r.height/2),e.fillText(n.text,r.x,r.y+r.height/2);e.restore()}let S=t.hover;if(S){if(S.crosshairX!==null){e.save(),e.strokeStyle=C(c.textMuted,.55),e.lineWidth=1,e.setLineDash([3,3]),e.beginPath();let t=Math.round(S.crosshairX)+.5;e.moveTo(t,f.y),e.lineTo(t,f.y+f.height),e.stroke(),e.restore()}for(let t of S.marks){if(t.kind===`bar`){e.fillStyle=C(c.text,.08),e.fillRect(t.x-2,t.y-2,t.width+4,t.height+2);continue}e.beginPath(),e.arc(t.x,t.y,t.size/2,0,Math.PI*2),e.fillStyle=t.color,e.fill(),e.lineWidth=2,e.strokeStyle=C(c.background),e.stroke()}}if(t.dragging){let n=t.dragging;e.beginPath(),e.arc(n.x,n.y,n.size/2,0,Math.PI*2),e.fillStyle=n.color,e.globalAlpha=.85,e.fill(),e.globalAlpha=1,e.lineWidth=2,e.strokeStyle=C(c.background),e.stroke()}let T=S?.tooltip;if(T){let{box:t,lineHeight:n,padding:r}=T;e.save(),e.shadowColor=`rgba(15, 23, 42, 0.18)`,e.shadowBlur=16,e.shadowOffsetY=6,V(e,t.x,t.y,t.width,t.height,8),e.fillStyle=C(c.background),e.fill(),e.restore(),V(e,t.x+.5,t.y+.5,t.width-1,t.height-1,8),e.strokeStyle=C(c.axis),e.lineWidth=1,e.stroke(),e.textBaseline=`middle`;let i=t.y+r+n/2,a=t.x+r+2,o=t.x+t.width-r-2;if(T.text){e.font=g(c,12),e.fillStyle=C(c.text),e.textAlign=`left`;for(let t of T.text)e.fillText(t,a,i),i+=n}else{let{content:t}=T,r=a;t.titleColor&&(e.fillStyle=t.titleColor,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=g(c,12,600),e.fillStyle=C(c.text),e.textAlign=`left`,e.fillText(t.title,r,i),i+=n;for(let s of t.rows)r=a,s.color&&(e.fillStyle=s.color,e.beginPath(),e.arc(r+4,i,4,0,Math.PI*2),e.fill(),r+=14),e.font=g(c,12),e.textAlign=`left`,e.fillStyle=C(c.textMuted),e.fillText(s.name,r,i),e.font=g(c,12,600),e.textAlign=`right`,e.fillStyle=C(c.text),e.fillText(s.value,o,i),i+=n}}},U=e=>{let{canvas:t}=e,n=t.getContext(`2d`),r=e.width,i=e.height,a=e.pixelRatio??1,o=!1,s=null,c=[],l=null,u={x:0,y:0},d=0,f=``,p=(e,t)=>n?(t!==f&&(n.font=t,f=t),n.measureText(e).width):e.length*6.5,m=n?F(n):null,h=globalThis,g=()=>{if(s=null,o||!n||!m)return;let e=v.getScene();if(!e)return;let p=Math.max(1,Math.round(r*a)),h=Math.max(1,Math.round(i*a));t.width!==p&&(t.width=p),t.height!==h&&(t.height=h),f=``,l!==e.model&&(l=e.model,u={x:B(e.model.base.x),y:B(e.model.base.y)},c=b(e.model,u,++d)),H(n,e,c,u,a,m),f=``},_=()=>{o||s!==null||(s=t.requestAnimationFrame?t.requestAnimationFrame(g):h.requestAnimationFrame?h.requestAnimationFrame(g):setTimeout(g,16))},v=R({options:e.options,theme:e.theme,measureText:p,onInvalidate:_});v.setSize(r,i);let y=(e,t)=>({id:e.identifier??t,touch:!0});return{setOptions:e=>v.setOptions(e),setTheme:e=>v.setTheme(e),resize(e,t,n){r=e,i=t,n&&(a=n),v.setSize(e,t),_()},render(){s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):h.cancelAnimationFrame?h.cancelAnimationFrame(s):clearTimeout(s)),g()},touchStart(e){e.forEach((e,t)=>v.pointerDown(e.x,e.y,y(e,t)))},touchMove(e){e.forEach((e,t)=>v.pointerMove(e.x,e.y,y(e,t)))},touchEnd(e){e.forEach((e,t)=>v.pointerUp(e.x,e.y,y(e,t)))},touchCancel(e=[{x:0,y:0}]){e.forEach((e,t)=>v.pointerCancel(y(e,t)))},pointerDown:(e,t,n)=>v.pointerDown(e,t,n),pointerMove:(e,t,n)=>v.pointerMove(e,t,n),pointerUp:(e,t,n)=>v.pointerUp(e,t,n),pointerLeave:()=>v.pointerLeave(),zoomAt:(e,t,n)=>v.zoomAt(e,t,n),resetZoom:()=>v.resetZoom(),getView:()=>v.getView(),setView:e=>v.setView(e),toggleSeries:e=>v.toggleSeries(e),clearHover:()=>v.clearHover(),getPlotRect:()=>v.getPlotRect(),toPixel:(e,t)=>v.toPixel(e,t),fromPixel:(e,t)=>v.fromPixel(e,t),getController:()=>v,on:(e,t)=>v.on(e,t),destroy(){o||(o=!0,s!==null&&(t.cancelAnimationFrame?t.cancelAnimationFrame(s):h.cancelAnimationFrame?h.cancelAnimationFrame(s):clearTimeout(s)),m?.destroy(),v.destroy())}}}})))()}function _e(){let e=(0,G.useRef)(null),[t,n]=(0,G.useState)(`…`),[r,i]=(0,G.useState)(null);(0,G.useEffect)(()=>{let t=e.current;if(!t)return;let r=A(t,{series:[{name:`Downloads`,type:`bar`,data:ve.map((e,t)=>[e,ye[t]])}],yAxis:{format:e=>y(e)},ariaLabel:`Downloads per release`}),a=!0;r.ready.then(e=>{a&&n(e??`unsupported`)});let o=r.on(`click`,i);return()=>{a=!1,o(),r.destroy()}},[]);let a=r?.items[0],o=r&&a?`${r.xLabel}: ${y(a.y)} downloads`:`Click a bar`;return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,K.jsx)(`div`,{ref:e,style:{height:300}}),(0,K.jsxs)(`p`,{role:`status`,children:[`Renderer: `,t,` · `,o]})]})}var G,K,ve,ye;function be(){return(be=e((()=>{G=t(),P(),v(),K=n(),ve=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],ye=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function xe(){let e=(0,q.useRef)(null),t=(0,q.useRef)(null),[n,r]=(0,q.useState)(`Click a point`);(0,q.useEffect)(()=>{let n=e.current;if(!n)return;let i=()=>n.getBoundingClientRect(),a=U({canvas:n,width:i().width,height:i().height,pixelRatio:window.devicePixelRatio||1,theme:X(n),options:{series:[{name:`Visits`,type:`area`,data:Y.map((e,t)=>[e,Se[t]])},{name:`Sign-ups`,type:`line`,data:Y.map((e,t)=>[e,Ce[t]*10])}],yAxis:{format:e=>y(e)},crosshair:!0,ariaLabel:`Visits and sign-ups per month`}});t.current=a;let o=a.on(`click`,e=>{let t=e.items[0];t&&r(`${e.xLabel}: ${y(t.y)}`)}),s=a.on(`plotClick`,()=>r(`Click a point`)),c=new ResizeObserver(()=>{let{width:e,height:t}=i();a.resize(e,t,window.devicePixelRatio||1)});c.observe(n);let l=new MutationObserver(()=>a.setTheme(X(n)));return l.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`,`style`]}),()=>{o(),s(),c.disconnect(),l.disconnect(),a.destroy(),t.current=null}},[]);let i=e=>[e.nativeEvent.offsetX,e.nativeEvent.offsetY,{id:e.pointerId,touch:e.pointerType===`touch`}];return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,J.jsx)(`canvas`,{ref:e,role:`img`,"aria-label":`Visits and sign-ups per month`,style:{width:`100%`,height:280,touchAction:`none`},onPointerDown:e=>t.current?.pointerDown(...i(e)),onPointerMove:e=>t.current?.pointerMove(...i(e)),onPointerUp:e=>t.current?.pointerUp(...i(e)),onPointerLeave:()=>t.current?.pointerLeave()}),(0,J.jsx)(`p`,{role:`status`,children:n})]})}var q,J,Y,Se,Ce,we,X;function Te(){return(Te=e((()=>{q=t(),W(),v(),J=n(),Y=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`],Se=[4200,5100,4800,6900,7400,8800,8100,9600],Ce=[310,420,380,560,610,790,720,880],we=[`--primary-color`,`--success-color`,`--warning-color`,`--danger-color`,`--info-color`,`--text-color`,`--text-secondary-color`,`--border-color`,`--surface-color`,`--background-color`,`--font-family-sans`],X=e=>{let t=getComputedStyle(e),n={};for(let e of we){let r=t.getPropertyValue(e).trim();r&&(n[e]=r)}return{variables:n}}})))()}function Ee(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function De(){let e=(0,Z.useRef)(null),t=(0,Z.useRef)(null),n=(0,Z.useRef)([]),r=(0,Z.useRef)(Ee(17)),[i,a]=(0,Z.useState)(!1),[s,c]=(0,Z.useState)(0);return(0,Z.useEffect)(()=>{let i=e.current;if(!i)return;let a=Ee(17);r.current=a;let o=[];for(let e=0;e<20;e++)o.push(Oe(a,o[e-1]));n.current=o;let s=A(i,ke(o));return t.current=s,c(o.length),()=>{s.destroy(),t.current=null}},[]),(0,Z.useEffect)(()=>{if(i)return;let e=setInterval(()=>{let e=n.current,i=[...e.slice(-119),Oe(r.current,e[e.length-1])];n.current=i,t.current?.setOptions(ke(i)),c(e=>e+1)},500);return()=>clearInterval(e)},[i]),(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,Q.jsx)(`div`,{ref:e,style:{height:300,width:`100%`}}),(0,Q.jsx)(o,{variant:`outline`,onClick:()=>a(e=>!e),children:i?`Resume`:`Pause`}),(0,Q.jsxs)(`p`,{role:`status`,children:[i?`Paused`:`Streaming`,` · `,s,` points received`]})]})}var Z,Q,Oe,ke;function Ae(){return(Ae=e((()=>{Z=t(),a(),P(),Q=n(),Oe=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},ke=e=>({series:[{name:`CPU (%)`,type:`area`,data:e,opacity:.2}],xAxis:{title:`Seconds`},yAxis:{min:0,max:100},interaction:!1,ariaLabel:`Live CPU usage`})})))()}var je;function Me(){return(Me=e((()=>{je=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useEffect, useRef, useState, type PointerEvent } from "react";
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
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useEffect, useRef, useState } from "react";
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
`})))()}var $,Le,Re;function ze(){return(ze=e((()=>{be(),Te(),Ae(),Me(),Pe(),Ie(),t(),r(),u(),s(),f(),$=n(),Le=l(Object.assign({"./demos/basic.tsx":_e,"./demos/canvas.tsx":xe,"./demos/streaming.tsx":De}),Object.assign({"./demos/basic.tsx":je,"./demos/canvas.tsx":Ne,"./demos/streaming.tsx":Fe})),Re=()=>{let{t:e}=i(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-entry-points`,children:[(0,$.jsx)(`h2`,{id:`engine-entry-points`,children:e(`docs.chart-engine.intro.choose.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.choose.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createCanvasChart`)}),(0,$.jsx)(`li`,{children:e(`docs.chart-engine.intro.choose.createChartController`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`engine-quadrant`,children:[(0,$.jsx)(`h2`,{id:`engine-quadrant`,children:e(`docs.chart-engine.intro.quadrant.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.chart-engine.intro.quadrant.text`)})]})]});return(0,$.jsx)(d,{id:`chart-engine`,demos:Le,intro:t})}})))()}ze();export{Re as default};