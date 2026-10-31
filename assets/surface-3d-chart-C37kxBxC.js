import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as ee}from"./Tag-D6SUzaZT.js";import{n as f,t as p}from"./Switch-CHbzff3y.js";import{i as te,r as m}from"./Stack-B3Kr9X_e.js";import{i as ne,o as re,t as ie}from"./Select-CRoh0AwC.js";import{l as ae,n as oe,t as se,u as ce}from"./DocPage-BdPOW9nQ.js";import{i as h,n as g}from"./three-d-BJri8njm.js";function le(e,t,n){let r=Float64Array.from({length:t},(n,r)=>-e+2*e*r/(t-1)),i=new Float32Array(t*t);for(let e=0;e<t;e++)for(let a=0;a<t;a++)i[e*t+a]=n(r[a],r[e]);return{rows:t,cols:t,x:r,y:r,z:i}}function ue(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[t,n]=(0,de.useState)(`sinc`),i=(0,de.useMemo)(()=>[{name:e(`functions.${t}`),data:fe[t]}],[e,t]);return(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,_.jsx)(s,{"aria-label":e(`function`),direction:`horizontal`,size:`small`,value:t,onChange:e=>n(e),children:Object.keys(fe).map(t=>(0,_.jsx)(u,{value:t,label:e(`functions.${t}`)},t))}),(0,_.jsx)(g,{series:i,xAxis:{title:e(`x`)},yAxis:{title:e(`y`)},zAxis:{title:e(`z`)},height:420,ariaLabel:e(`functionsAria`,{name:e(`functions.${t}`)})})]})}var de,_,fe;function pe(){return(pe=e((()=>{de=t(),i(),c(),l(),h(),_=n(),fe={sinc:le(10,90,(e,t)=>{let n=Math.hypot(e,t);return n===0?1:Math.sin(n)/n}),peaks:le(3,90,(e,t)=>3*(1-e)**2*Math.exp(-(e**2)-(t+1)**2)-10*(e/5-e**3-t**5)*Math.exp(-(e**2)-t**2)-Math.exp(-((e+1)**2)-t**2)/3),saddle:le(1,60,(e,t)=>e*e-t*t)}})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[n,i]=(0,v.useState)(!0),[a,s]=(0,v.useState)(C.length),[c,l]=(0,v.useState)(()=>T(_e())),u=(0,v.useRef)(new Set(C.map(([e,t])=>w(e,t))));(0,v.useEffect)(()=>{if(!n)return;let e=window.setInterval(()=>{l(e=>T(ve(e.z,u.current,8)))},80);return()=>window.clearInterval(e)},[n]);let d=(0,v.useMemo)(()=>[{name:e(`plate`),data:c}],[e,c]),ee=(0,v.useMemo)(()=>{let e=-1/0,t=0;for(let n=0;n<c.z.length;n++)e=Math.max(e,c.z[n]),t+=c.z[n];return{max:e,mean:t/c.z.length}},[c]),f=(0,v.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`unit`,unit:`celsius`,maximumFractionDigits:1}),[t.language]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsxs)(te,{gap:12,wrap:!0,align:`center`,children:[(0,y.jsx)(p,{size:`small`,checked:n,label:e(`play`),onChange:i}),(0,y.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>{u.current=new Set(C.map(([e,t])=>w(e,t))),s(u.current.size),l(T(_e()))},children:e(`reset`)})]}),(0,y.jsx)(g,{series:d,xAxis:{title:e(`cm`)},yAxis:{title:e(`cm`)},zAxis:{min:x,max:S,title:e(`temperature`),format:e=>f.format(e)},valueRange:[x,S],colorScale:`inferno`,colorBar:{title:e(`temperature`),format:e=>f.format(e)},aspect:[1,1,.5],camera:{azimuth:30,elevation:38},height:440,ariaLabel:e(`heatAria`),onPointClick:e=>{if(e.row===void 0||e.col===void 0)return;let t=Math.min(39,Math.max(1,e.row)),n=Math.min(39,Math.max(1,e.col)),r=[...u.current].find(e=>Math.abs(Math.floor(e/b)-t)<=2&&Math.abs(e%b-n)<=2);r===void 0?u.current.add(w(t,n)):u.current.delete(r),s(u.current.size),i(!0)}}),(0,y.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`heatStatus`,{sources:a,max:f.format(ee.max),mean:f.format(ee.mean)})})]})}var v,y,b,x,S,he,ge,C,w,_e,ve,T;function ye(){return(ye=e((()=>{v=t(),i(),a(),m(),f(),h(),y=n(),b=41,x=20,S=100,he=.2,ge=Float64Array.from({length:b},(e,t)=>t),C=[[12,14]],w=(e,t)=>e*b+t,_e=()=>new Float32Array(1681).fill(x),ve=(e,t,n)=>{let r=e;for(let e=0;e<n;e++){let e=new Float32Array(r);for(let t=1;t<40;t++)for(let n=1;n<40;n++){let i=t*b+n;e[i]=r[i]+he*(r[i-1]+r[i+1]+r[i-b]+r[i+b]-4*r[i])}for(let n of t)e[n]=S;r=e}return r},T=e=>({rows:b,cols:b,x:ge,y:ge,z:e})})))()}function be(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[t,n]=(0,E.useState)(!0),[i,a]=(0,E.useState)(()=>Ce(0)),o=(0,E.useRef)(null);(0,E.useEffect)(()=>{let e=o.current;if(!t||!e)return;let n=0,r=!1,i=0,s=0,c=e=>{n=0,r&&!document.hidden&&(e-i>=33&&(s+=i?Math.min(.1,(e-i)/1e3):0,i=e,a(Ce(s))),n=requestAnimationFrame(c))},l=()=>{!n&&r&&!document.hidden&&(i=0,n=requestAnimationFrame(c))},u=new IntersectionObserver(([e])=>{r=!!e?.isIntersecting,l()});return u.observe(e),document.addEventListener(`visibilitychange`,l),()=>{u.disconnect(),document.removeEventListener(`visibilitychange`,l),cancelAnimationFrame(n)}},[t]);let s=(0,E.useMemo)(()=>[{name:e(`wave`),data:i}],[e,i]);return(0,xe.jsxs)(`div`,{ref:o,style:{display:`grid`,gap:12,width:`100%`},children:[(0,xe.jsx)(p,{size:`small`,checked:t,label:e(`play`),onChange:n}),(0,xe.jsx)(g,{series:s,zAxis:{min:-1,max:1,title:e(`amplitude`)},valueRange:[-1,1],colorScale:`coolwarm`,colorBar:!1,aspect:[1,1,.45],camera:{elevation:32},height:420,ariaLabel:e(`waveAria`)})]})}var E,xe,D,O,Se,Ce;function we(){return(we=e((()=>{E=t(),i(),f(),h(),xe=n(),D=100,O=Float64Array.from({length:D},(e,t)=>-6+12*t/99),Se=new Float32Array(1e4);for(let e=0;e<D;e++)for(let t=0;t<D;t++)Se[e*D+t]=Math.hypot(O[t],O[e]);Ce=e=>{let t=new Float32Array(1e4);for(let n=0;n<t.length;n++){let r=Se[n];t[n]=Math.sin(r*2.2-e*3)*Math.exp(-r*.22)}return{rows:D,cols:D,x:O,y:O,z:t}}})))()}function Te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[n,i]=(0,k.useState)(`viridis`),[a,o]=(0,k.useState)(null),s=(0,k.useMemo)(()=>({coordinate:new Intl.NumberFormat(t.language,{maximumFractionDigits:2}),loss:new Intl.NumberFormat(t.language,{maximumSignificantDigits:3}),integer:new Intl.NumberFormat(t.language)}),[t.language]),c=(0,k.useMemo)(()=>[{name:e(`loss`),data:Oe,contours:{count:14,floor:!0},format:e=>s.loss.format(10**e-1)}],[e,s]),l=(0,k.useMemo)(()=>a?ke(...a):null,[a]),u=(t,n)=>e(`point`,{x:s.coordinate.format(t),y:s.coordinate.format(n)});return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsxs)(te,{gap:8,align:`center`,children:[(0,A.jsx)(`span`,{children:e(`colorMap`)}),(0,A.jsx)(re,{"aria-label":e(`colorMap`),size:`small`,value:n,onChange:e=>i(e),children:Ae.map(t=>(0,A.jsx)(ie,{value:t,children:e(`colorMaps.${t}`)},t))})]}),(0,A.jsx)(g,{series:c,xAxis:{title:e(`weight1`)},yAxis:{title:e(`weight2`)},zAxis:{title:e(`logLoss`)},colorScale:n,colorBar:{title:e(`logLoss`)},aspect:[1,1,.55],camera:{azimuth:20,elevation:40},height:460,ariaLabel:e(`lossAria`),onPointClick:e=>o([e.x,e.y])}),(0,A.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:a&&l?e(`descentResult`,{start:u(...a),loss:s.loss.format(Ee(...a)),steps:s.integer.format(l.steps),n:l.minimum+1,minimum:u(...N[l.minimum])}):e(`lossHint`)})]})}var k,A,j,M,Ee,De,Oe,N,ke,Ae;function je(){return(je=e((()=>{k=t(),i(),m(),ne(),h(),A=n(),j=90,M=Float64Array.from({length:j},(e,t)=>-5+10*t/89),Ee=(e,t)=>(e*e+t-11)**2+(e+t*t-7)**2,De=(e,t)=>[4*e*(e*e+t-11)+2*(e+t*t-7),2*(e*e+t-11)+4*t*(e+t*t-7)],Oe=(()=>{let e=new Float32Array(8100);for(let t=0;t<j;t++)for(let n=0;n<j;n++)e[t*j+n]=Math.log10(1+Ee(M[n],M[t]));return{rows:j,cols:j,x:M,y:M,z:e}})(),N=[[3,2],[-2.805,3.131],[-3.779,-3.283],[3.584,-1.848]],ke=(e,t)=>{let[n,r]=[e,t],i=0;for(;i<5e3;i++){let[e,t]=De(n,r);if(Math.hypot(e,t)<1e-4)break;let i=Math.min(.01,.5/Math.hypot(e,t));n-=i*e,r-=i*t}return{minimum:N.reduce((e,t,i)=>Math.hypot(t[0]-n,t[1]-r)<Math.hypot(N[e][0]-n,N[e][1]-r)?i:e,0),steps:i}},Ae=[`viridis`,`plasma`,`magma`,`cividis`,`turbo`]})))()}function Me(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ne(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),t=(0,Pe.useMemo)(()=>[{name:e(`island`),data:We}],[e]),n=t=>e(`km`,{value:t}),i=t=>e(`meters`,{value:Math.round(t)});return(0,Fe.jsx)(g,{series:t,aspect:[1,1,.28],colorScale:`terrain`,xAxis:{title:e(`east`),format:n},yAxis:{title:e(`north`),format:n},zAxis:{title:e(`elevation`),format:i},colorBar:{title:e(`elevation`),format:i},lighting:{ambient:.35,diffuse:.8,specular:.08},camera:{azimuth:30,elevation:38},height:440,ariaLabel:e(`terrainAria`)})}var Pe,Fe,P,Ie,Le,Re,ze,Be,Ve,He,Ue,We;function Ge(){return(Ge=e((()=>{Pe=t(),i(),h(),Fe=n(),P=180,Ie=20,Le=Me(2026),Re=64,ze=Float64Array.from({length:4096},()=>Le()),Be=e=>e*e*(3-2*e),Ve=(e,t)=>{let n=Math.floor(e),r=Math.floor(t),i=Be(e-n),a=Be(t-r),o=(e,t)=>ze[(t&63)*Re+(e&63)|0],s=o(n,r)+(o(n+1,r)-o(n,r))*i;return s+(o(n,r+1)+(o(n+1,r+1)-o(n,r+1))*i-s)*a},He=Float64Array.from({length:P},(e,t)=>Math.round(t*Ie/179*100)/100),Ue=new Float32Array(32400);for(let e=0;e<P;e++)for(let t=0;t<P;t++){let n=0,r=1,i=5/P;for(let a=0;a<6;a++)n+=Ve(t*i,e*i)*r,r*=.5,i*=2;let a=t/179-.5,o=e/179-.5,s=1-Math.min(1,Math.hypot(a,o)*2.1);Ue[e*P+t]=Math.max(0,(n*.9-1+s*1.3)*1400)}We={rows:P,cols:P,x:He,y:He,z:Ue}})))()}function Ke(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),t=(0,qe.useMemo)(()=>[{name:e(`bowl`),data:Xe,colorBy:`series`,opacity:.7},{name:e(`plane`),data:Ze,colorBy:`series`,opacity:.55,wireframe:{step:6}}],[e]);return(0,Je.jsx)(g,{series:t,xAxis:{title:e(`x`)},yAxis:{title:e(`y`)},zAxis:{title:e(`z`)},camera:{azimuth:-30,elevation:22},height:420,ariaLabel:e(`transparencyAria`)})}var qe,Je,F,I,Ye,Xe,Ze;function Qe(){return(Qe=e((()=>{qe=t(),i(),h(),Je=n(),F=60,I=Float64Array.from({length:F},(e,t)=>-2+4*t/59),Ye=e=>{let t=new Float32Array(3600);for(let n=0;n<F;n++)for(let r=0;r<F;r++)t[n*F+r]=e(I[r],I[n]);return{rows:F,cols:F,x:I,y:I,z:t}},Xe=Ye((e,t)=>(e*e+t*t)/2),Ze=Ye((e,t)=>1.4+.6*e-.3*t)})))()}function $e(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),t=(0,et.useMemo)(()=>[{name:e(`impliedVol`),data:rt,wireframe:{width:.75}}],[e]);return(0,tt.jsx)(g,{series:t,colorScale:`spectral`,xAxis:{title:e(`strike`),format:t=>e(`percent`,{value:Math.round(t)})},yAxis:{title:e(`expiry`),format:t=>e(`days`,{value:Math.round(t)})},zAxis:{title:e(`impliedVol`),format:t=>e(`percent`,{value:t.toFixed(1)})},colorBar:{format:t=>e(`percent`,{value:t})},camera:{azimuth:-28,elevation:24},height:440,ariaLabel:e(`volatilityAria`)})}var et,tt,L,R,nt,rt;function it(){return(it=e((()=>{et=t(),i(),h(),tt=n(),L=Array.from({length:33},(e,t)=>60+t*2.5),R=[7,14,30,60,90,120,180,270,365,540,730],nt=new Float32Array(L.length*R.length),R.forEach((e,t)=>{let n=e/365,r=21-5*Math.exp(-n*1.4),i=-12/Math.sqrt(n+.25),a=25/Math.sqrt(n+.25);L.forEach((e,n)=>{let o=Math.log(e/100);nt[t*L.length+n]=r+i*o+a*o*o})}),rt={rows:R.length,cols:L.length,x:L,y:R,z:nt}})))()}function at(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),n=(0,z.useRef)(null),[i,a]=(0,z.useState)(()=>new Set([`lobby`,`openSpace`,`meetingRooms`])),[s,c]=(0,z.useState)(!1),l=(0,z.useMemo)(()=>ft(i),[i]),u=(0,z.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`}),[t.language]),d=(0,z.useMemo)(()=>{let n=new Intl.NumberFormat(t.language,{maximumFractionDigits:0});return t=>e(`dbm`,{value:n.format(t)})},[e,t.language]),f=(0,z.useMemo)(()=>[{name:e(`signal`),data:l,contours:{levels:[G,W],floor:!0,surface:!0,width:1.5},format:d}],[e,l,d]),p=e=>l.z.filter(t=>t>=e).length/l.z.length,m=e=>{let t=new Set(i);t.delete(e)||t.add(e),a(t)};return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsxs)(te,{gap:8,wrap:!0,align:`center`,children:[(0,B.jsx)(`span`,{children:e(`accessPoints`)}),lt.map(([t])=>(0,B.jsx)(ee,{size:`small`,clickable:!0,pressed:i.has(t),onClick:()=>m(t),children:e(`rooms.${t}`)},t)),(0,B.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>{s?n.current?.resetCamera():n.current?.setCamera({azimuth:0,elevation:89,zoom:1,pan:[0,0],projection:`orthographic`}),c(!s)},children:e(s?`perspectiveView`:`topView`)})]}),(0,B.jsx)(g,{ref:n,series:f,xAxis:{title:e(`distanceM`)},yAxis:{title:e(`distanceM`)},zAxis:{min:U,max:-30,title:e(`signal`),format:d},valueRange:[U,-30],colorScale:`spectral`,colorBar:{title:e(`signal`),format:d},aspect:[30,20,8],camera:{azimuth:25,elevation:40},height:440,ariaLabel:e(`wifiAria`),onCameraChange:e=>c(e.projection===`orthographic`&&e.elevation>80)}),(0,B.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:i.size?e(`wifiCoverage`,{good:u.format(p(W)),goodLevel:d(W),usable:u.format(p(G)),usableLevel:d(G)}):e(`wifiNone`)})]})}var z,B,V,H,ot,st,ct,U,W,G,lt,ut,dt,ft;function pt(){return(pt=e((()=>{z=t(),i(),a(),m(),d(),h(),B=n(),V=61,H=41,ot=.5,st=Float64Array.from({length:V},(e,t)=>t*ot),ct=Float64Array.from({length:H},(e,t)=>t*ot),U=-95,W=-67,G=-75,lt=[[`lobby`,4,4],[`openSpace`,16,12],[`meetingRooms`,26,16],[`kitchen`,25,3]],ut=[[10,0,10,8],[20,9,30,9],[21,9,21,20],[0,14,10,14],[18,0,18,6]],dt=(e,t,n,r,[i,a,o,s])=>{let c=(e,t,n,r,i,a)=>Math.sign((n-e)*(a-t)-(r-t)*(i-e));return c(e,t,n,r,i,a)!==c(e,t,n,r,o,s)&&c(i,a,o,s,e,t)!==c(i,a,o,s,n,r)},ft=e=>{let t=new Float32Array(2501);for(let n=0;n<H;n++)for(let r=0;r<V;r++){let i=U;for(let[t,a,o]of lt){if(!e.has(t))continue;let[s,c]=[st[r],ct[n]],l=ut.filter(e=>dt(a,o,s,c,e)).length,u=Math.max(1,Math.hypot(s-a,c-o));i=Math.max(i,-32-30*Math.log10(u)-6*l)}t[n*V+r]=i}return{rows:H,cols:V,x:st,y:ct,z:t}}})))()}function mt(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[t,n]=(0,K.useState)(!0),[i,a]=(0,K.useState)(!0),[o,s]=(0,K.useState)(!0),[c,l]=(0,K.useState)(!1),u=(0,K.useMemo)(()=>[{name:e(`functions.peaks`),data:gt,fill:t,opacity:.92,wireframe:i&&{step:4},contours:(o||c)&&{count:14,floor:o,surface:c,width:1.25}}],[e,t,i,o,c]);return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,q.jsx)(p,{size:`small`,checked:t,label:e(`fill`),onChange:n}),(0,q.jsx)(p,{size:`small`,checked:i,label:e(`wireframe`),onChange:a}),(0,q.jsx)(p,{size:`small`,checked:o,label:e(`floorContours`),onChange:s}),(0,q.jsx)(p,{size:`small`,checked:c,label:e(`surfaceContours`),onChange:l})]}),(0,q.jsx)(g,{series:u,colorScale:`viridis`,camera:{azimuth:-50,elevation:30},height:440,ariaLabel:e(`contoursAria`)})]})}var K,q,J,Y,ht,gt;function _t(){return(_t=e((()=>{K=t(),i(),f(),h(),q=n(),J=120,Y=Float64Array.from({length:J},(e,t)=>-3+6*t/119),ht=new Float32Array(14400);for(let e=0;e<J;e++)for(let t=0;t<J;t++){let n=Y[t],r=Y[e];ht[e*J+t]=3*(1-n)**2*Math.exp(-(n**2)-(r+1)**2)-10*(n/5-n**3-r**5)*Math.exp(-(n**2)-r**2)-Math.exp(-((n+1)**2)-r**2)/3}gt={rows:J,cols:J,x:Y,y:Y,z:ht}})))()}function vt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[n,i]=(0,X.useState)(null),a=(0,X.useMemo)(()=>({month:new Intl.DateTimeFormat(t.language,{month:`short`,year:`2-digit`,timeZone:`UTC`}),longMonth:new Intl.DateTimeFormat(t.language,{month:`long`,year:`numeric`,timeZone:`UTC`}),percent:new Intl.NumberFormat(t.language,{style:`percent`,minimumFractionDigits:2,maximumFractionDigits:2}),months:new Intl.NumberFormat(t.language,{style:`unit`,unit:`month`,unitDisplay:`short`}),years:new Intl.NumberFormat(t.language,{style:`unit`,unit:`year`,unitDisplay:`short`})}),[t.language]),o=e=>{let t=Q[Math.round(e)];return t===void 0?``:t<12?a.months.format(t):a.years.format(t/12)},s=(0,X.useMemo)(()=>[{name:e(`treasuryYield`),data:$,contours:{count:8,floor:!0},format:e=>a.percent.format(e/100)}],[e,a]),c=n?.row??23,l=$.z[c*Q.length+Q.indexOf(120)]-$.z[c*Q.length+Q.indexOf(24)];return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsx)(g,{series:s,xAxis:{title:e(`maturity`),format:o,tickCount:Q.length,nice:!1},yAxis:{title:e(`month`),format:e=>a.month.format(St(Math.round(e))),nice:!1},zAxis:{title:e(`yield`),format:e=>a.percent.format(e/100)},colorScale:`spectral`,colorBar:!1,aspect:[1,1.2,.55],camera:{azimuth:-40,elevation:28},height:460,ariaLabel:e(`yieldAria`),onHover:e=>i(e&&e.row!==void 0&&e.col!==void 0?{row:e.row,col:e.col}:null)}),(0,Z.jsxs)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:[n?e(`yieldHover`,{maturity:o(n.col),date:a.longMonth.format(St(n.row)),yield:a.percent.format($.z[n.row*Q.length+n.col]/100)}):e(`yieldHint`),` `,e(l<0?`spreadInverted`:`spreadNormal`,{date:a.longMonth.format(St(c)),spread:a.percent.format(l/100)})]})]})}var X,Z,Q,yt,bt,xt,$,St;function Ct(){return(Ct=e((()=>{X=t(),i(),h(),Z=n(),Q=[1,3,6,12,24,36,60,84,120,240,360],yt=24,bt=Date.UTC(2024,10,1),xt=(e,t)=>{let n=e/23,r=4.3+.25*Math.sin(e/3.5),i=.9-1.9*n,a=-.6+.4*Math.sin(e/5),o=2.2,s=t/12,c=(1-Math.exp(-s/o))/(s/o);return r+i*c+a*(c-Math.exp(-s/o))},$=(()=>{let e=new Float32Array(yt*Q.length);for(let t=0;t<yt;t++)Q.forEach((n,r)=>{e[t*Q.length+r]=xt(t,n)});return{rows:yt,cols:Q.length,z:e}})(),St=e=>{let t=new Date(bt);return t.setUTCMonth(t.getUTCMonth()+e),t}})))()}var wt;function Tt(){return(Tt=e((()=>{wt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

/** Samples z = f(x, y) on a size × size grid over [-extent, extent]² */
function sample(
  extent: number,
  size: number,
  f: (x: number, y: number) => number,
): Surface3DData {
  const axis = Float64Array.from(
    { length: size },
    (_, i) => -extent + (2 * extent * i) / (size - 1),
  );
  const z = new Float32Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) z[r * size + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: size, cols: size, x: axis, y: axis, z };
}

const FUNCTIONS = {
  // sin(r) / r: ripples fading away from a central peak
  sinc: sample(10, 90, (x, y) => {
    const r = Math.hypot(x, y);
    return r === 0 ? 1 : Math.sin(r) / r;
  }),
  // MATLAB's peaks: three peaks and two pits
  peaks: sample(
    3,
    90,
    (x, y) =>
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3,
  ),
  // a hyperbolic paraboloid
  saddle: sample(1, 60, (x, y) => x * x - y * y),
};
type FunctionKey = keyof typeof FUNCTIONS;

export default function FunctionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [key, setKey] = useState<FunctionKey>("sinc");
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t(\`functions.\${key}\`), data: FUNCTIONS[key] },
    ],
    [t, key],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("function")}
        direction="horizontal"
        size="small"
        value={key}
        onChange={(value) => setKey(value as FunctionKey)}
      >
        {(Object.keys(FUNCTIONS) as FunctionKey[]).map((name) => (
          <Radio key={name} value={name} label={t(\`functions.\${name}\`)} />
        ))}
      </RadioGroup>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("x") }}
        yAxis={{ title: t("y") }}
        zAxis={{ title: t("z") }}
        height={420}
        ariaLabel={t("functionsAria", { name: t(\`functions.\${key}\`) })}
      />
    </div>
  );
}
`})))()}var Et;function Dt(){return(Dt=e((()=>{Et=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Switch } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

// A 40 × 40 cm metal plate whose edges are kept at room temperature;
// heat sources hold their cell at 100 °C and the heat spreads by diffusion.
const SIZE = 41;
const AMBIENT = 20;
const SOURCE = 100;
const RATE = 0.2; // diffusion number of the explicit scheme (stable below 0.25)
const AXIS = Float64Array.from({ length: SIZE }, (_, i) => i);
const INITIAL_SOURCES = [[12, 14]];

const sourceKey = (row: number, col: number) => row * SIZE + col;

const ambient = () => new Float32Array(SIZE * SIZE).fill(AMBIENT);

/** Runs \`steps\` explicit finite-difference steps of the heat equation */
const diffuse = (grid: Float32Array, sources: Set<number>, steps: number) => {
  let current = grid;
  for (let step = 0; step < steps; step++) {
    const next = new Float32Array(current);
    for (let r = 1; r < SIZE - 1; r++) {
      for (let c = 1; c < SIZE - 1; c++) {
        const i = r * SIZE + c;
        next[i] =
          current[i]! +
          RATE *
            (current[i - 1]! +
              current[i + 1]! +
              current[i - SIZE]! +
              current[i + SIZE]! -
              4 * current[i]!);
      }
    }
    for (const i of sources) next[i] = SOURCE;
    current = next;
  }
  return current;
};

const toData = (z: Float32Array): Surface3DData => ({
  rows: SIZE,
  cols: SIZE,
  x: AXIS,
  y: AXIS,
  z,
});

export default function HeatDiffusionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [sourceCount, setSourceCount] = useState(INITIAL_SOURCES.length);
  const [data, setData] = useState(() => toData(ambient()));
  const sources = useRef(
    new Set(INITIAL_SOURCES.map(([r, c]) => sourceKey(r!, c!))),
  );

  // 8 diffusion steps every 80 ms, only while playing
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setData((previous) =>
        toData(diffuse(previous.z as Float32Array, sources.current, 8)),
      );
    }, 80);
    return () => window.clearInterval(timer);
  }, [playing]);

  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("plate"), data }],
    [t, data],
  );
  const stats = useMemo(() => {
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < data.z.length; i++) {
      max = Math.max(max, data.z[i]!);
      sum += data.z[i]!;
    }
    return { max, mean: sum / data.z.length };
  }, [data]);
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const reset = () => {
    sources.current = new Set(
      INITIAL_SOURCES.map(([r, c]) => sourceKey(r!, c!)),
    );
    setSourceCount(sources.current.size);
    setData(toData(ambient()));
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        <Switch
          size="small"
          checked={playing}
          label={t("play")}
          onChange={setPlaying}
        />
        <Button size="small" variant="outline" color="neutral" onClick={reset}>
          {t("reset")}
        </Button>
      </HStack>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("cm") }}
        yAxis={{ title: t("cm") }}
        zAxis={{
          min: AMBIENT,
          max: SOURCE,
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        valueRange={[AMBIENT, SOURCE]}
        colorScale="inferno"
        colorBar={{
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        aspect={[1, 1, 0.5]}
        camera={{ azimuth: 30, elevation: 38 }}
        height={440}
        ariaLabel={t("heatAria")}
        onPointClick={(event) => {
          if (event.row === undefined || event.col === undefined) return;
          // clicking near a source removes it, clicking elsewhere adds one
          const row = Math.min(SIZE - 2, Math.max(1, event.row));
          const col = Math.min(SIZE - 2, Math.max(1, event.col));
          const near = [...sources.current].find(
            (key) =>
              Math.abs(Math.floor(key / SIZE) - row) <= 2 &&
              Math.abs((key % SIZE) - col) <= 2,
          );
          if (near === undefined) sources.current.add(sourceKey(row, col));
          else sources.current.delete(near);
          setSourceCount(sources.current.size);
          setPlaying(true);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("heatStatus", {
          sources: sourceCount,
          max: celsius.format(stats.max),
          mean: celsius.format(stats.mean),
        })}
      </output>
    </div>
  );
}
`})))()}var Ot;function kt(){return(kt=e((()=>{Ot=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

// Ripples spreading from the center, recomputed ~30 times per second
const SIZE = 100;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -6 + (12 * i) / (SIZE - 1),
);
const radius = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++)
    radius[r * SIZE + c] = Math.hypot(axis[c]!, axis[r]!);
}
const wave = (time: number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < z.length; i++) {
    const d = radius[i]!;
    z[i] = Math.sin(d * 2.2 - time * 3) * Math.exp(-d * 0.22);
  }
  // a new object every frame: the chart only re-processes changed data
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};

export default function LiveWaveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [data, setData] = useState(() => wave(0));
  const host = useRef<HTMLDivElement>(null);

  // the animation runs only while playing, on-screen and in a visible tab
  useEffect(() => {
    const element = host.current;
    if (!playing || !element) return;
    let frame = 0;
    let visible = false;
    let last = 0;
    let time = 0;
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (now - last >= 33) {
        time += last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = now;
        setData(wave(time));
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      start();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", start);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
      cancelAnimationFrame(frame);
    };
  }, [playing]);

  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("wave"), data }],
    [t, data],
  );

  return (
    <div ref={host} style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={playing}
        label={t("play")}
        onChange={setPlaying}
      />
      <Surface3DChart
        series={series}
        zAxis={{ min: -1, max: 1, title: t("amplitude") }}
        valueRange={[-1, 1]}
        colorScale="coolwarm"
        colorBar={false}
        aspect={[1, 1, 0.45]}
        camera={{ elevation: 32 }}
        height={420}
        ariaLabel={t("waveAria")}
      />
    </div>
  );
}
`})))()}var At;function jt(){return(jt=e((()=>{At=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  Surface3DChart,
  type Chart3DColorMap,
  type Surface3DSeries,
} from "minerva-design/charts";

// Himmelblau's function: four global minima of equal depth, a classic
// test landscape for optimizers. The surface shows log10(1 + loss).
const SIZE = 90;
const RANGE = 5;
const AXIS = Float64Array.from(
  { length: SIZE },
  (_, i) => -RANGE + (2 * RANGE * i) / (SIZE - 1),
);
const loss = (x: number, y: number) =>
  (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2;
const gradient = (x: number, y: number): [number, number] => [
  4 * x * (x * x + y - 11) + 2 * (x + y * y - 7),
  2 * (x * x + y - 11) + 4 * y * (x + y * y - 7),
];

const DATA = (() => {
  const z = new Float32Array(SIZE * SIZE);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      z[r * SIZE + c] = Math.log10(1 + loss(AXIS[c]!, AXIS[r]!));
    }
  }
  return { rows: SIZE, cols: SIZE, x: AXIS, y: AXIS, z };
})();

const MINIMA: [number, number][] = [
  [3, 2],
  [-2.805, 3.131],
  [-3.779, -3.283],
  [3.584, -1.848],
];

/** Plain gradient descent from (x, y): the minimum it ends in and the steps */
const descend = (x0: number, y0: number) => {
  let [x, y] = [x0, y0];
  let steps = 0;
  for (; steps < 5000; steps++) {
    const [gx, gy] = gradient(x, y);
    if (Math.hypot(gx, gy) < 1e-4) break;
    // a small step with clipping keeps the descent stable on the steep walls
    const scale = Math.min(0.01, 0.5 / Math.hypot(gx, gy));
    x -= scale * gx;
    y -= scale * gy;
  }
  const minimum = MINIMA.reduce(
    (best, m, i) =>
      Math.hypot(m[0] - x, m[1] - y) <
      Math.hypot(MINIMA[best]![0] - x, MINIMA[best]![1] - y)
        ? i
        : best,
    0,
  );
  return { minimum, steps };
};

const COLOR_MAPS: Chart3DColorMap[] = [
  "viridis",
  "plasma",
  "magma",
  "cividis",
  "turbo",
];

export default function LossLandscapeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [colorMap, setColorMap] = useState<Chart3DColorMap>("viridis");
  const [start, setStart] = useState<[number, number] | null>(null);
  const formats = useMemo(
    () => ({
      coordinate: new Intl.NumberFormat(i18n.language, {
        maximumFractionDigits: 2,
      }),
      loss: new Intl.NumberFormat(i18n.language, {
        maximumSignificantDigits: 3,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );
  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("loss"),
        data: DATA,
        contours: { count: 14, floor: true },
        format: (value) => formats.loss.format(10 ** value - 1),
      },
    ],
    [t, formats],
  );
  const result = useMemo(() => (start ? descend(...start) : null), [start]);
  const point = (x: number, y: number) =>
    t("point", {
      x: formats.coordinate.format(x),
      y: formats.coordinate.format(y),
    });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("colorMap")}</span>
        <Select
          aria-label={t("colorMap")}
          size="small"
          value={colorMap}
          onChange={(value) => setColorMap(value as Chart3DColorMap)}
        >
          {COLOR_MAPS.map((id) => (
            <SelectItem key={id} value={id}>
              {t(\`colorMaps.\${id}\`)}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("weight1") }}
        yAxis={{ title: t("weight2") }}
        zAxis={{ title: t("logLoss") }}
        colorScale={colorMap}
        colorBar={{ title: t("logLoss") }}
        aspect={[1, 1, 0.55]}
        camera={{ azimuth: 20, elevation: 40 }}
        height={460}
        ariaLabel={t("lossAria")}
        onPointClick={(event) => setStart([event.x, event.y])}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {start && result
          ? t("descentResult", {
              start: point(...start),
              loss: formats.loss.format(loss(...start)),
              steps: formats.integer.format(result.steps),
              n: result.minimum + 1,
              minimum: point(...MINIMA[result.minimum]!),
            })
          : t("lossHint")}
      </output>
    </div>
  );
}
`})))()}var Mt;function Nt(){return(Nt=e((()=>{Mt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A 20 × 20 km island: fractal value noise (6 octaves) under a radial
// falloff, the sea clamped at 0 m
const SIZE = 180;
const KM = 20;
const random = mulberry32(2026);
const LATTICE = 64;
const lattice = Float64Array.from({ length: LATTICE * LATTICE }, () =>
  random(),
);
const smooth = (t: number) => t * t * (3 - 2 * t);
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = smooth(x - xi);
  const fy = smooth(y - yi);
  const at = (i: number, j: number) =>
    lattice[((j & (LATTICE - 1)) * LATTICE + (i & (LATTICE - 1))) | 0]!;
  const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * fx;
  const bottom = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * fx;
  return top + (bottom - top) * fy;
};
const coords = Float64Array.from(
  { length: SIZE },
  (_, i) => Math.round(((i * KM) / (SIZE - 1)) * 100) / 100,
);
const heights = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    let h = 0;
    let amplitude = 1;
    let frequency = 5 / SIZE;
    for (let octave = 0; octave < 6; octave++) {
      h += noise(c * frequency, r * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    const dx = c / (SIZE - 1) - 0.5;
    const dy = r / (SIZE - 1) - 0.5;
    const falloff = 1 - Math.min(1, Math.hypot(dx, dy) * 2.1);
    heights[r * SIZE + c] = Math.max(0, (h * 0.9 - 1.0 + falloff * 1.3) * 1400);
  }
}
const island = { rows: SIZE, cols: SIZE, x: coords, y: coords, z: heights };

export default function TerrainDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("island"), data: island }],
    [t],
  );
  const km = (value: number) => t("km", { value });
  const meters = (value: number) => t("meters", { value: Math.round(value) });

  return (
    <Surface3DChart
      series={series}
      aspect={[1, 1, 0.28]}
      colorScale="terrain"
      xAxis={{ title: t("east"), format: km }}
      yAxis={{ title: t("north"), format: km }}
      zAxis={{ title: t("elevation"), format: meters }}
      colorBar={{ title: t("elevation"), format: meters }}
      lighting={{ ambient: 0.35, diffuse: 0.8, specular: 0.08 }}
      camera={{ azimuth: 30, elevation: 38 }}
      height={440}
      ariaLabel={t("terrainAria")}
    />
  );
}
`})))()}var Pt;function Ft(){return(Ft=e((()=>{Pt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

const SIZE = 60;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -2 + (4 * i) / (SIZE - 1),
);
const grid = (f: (x: number, y: number) => number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) z[r * SIZE + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};
// a bowl crossed by a tilted plane: transparency shows where they meet
const bowl = grid((x, y) => (x * x + y * y) / 2);
const plane = grid((x, y) => 1.4 + 0.6 * x - 0.3 * y);

export default function TransparencyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t("bowl"), data: bowl, colorBy: "series", opacity: 0.7 },
      {
        name: t("plane"),
        data: plane,
        colorBy: "series",
        opacity: 0.55,
        wireframe: { step: 6 },
      },
    ],
    [t],
  );

  return (
    <Surface3DChart
      series={series}
      xAxis={{ title: t("x") }}
      yAxis={{ title: t("y") }}
      zAxis={{ title: t("z") }}
      camera={{ azimuth: -30, elevation: 22 }}
      height={420}
      ariaLabel={t("transparencyAria")}
    />
  );
}
`})))()}var It;function Lt(){return(Lt=e((()=>{It=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// Implied volatility of index options by strike (moneyness, % of spot) and
// time to expiry: a smile that is steepest for short expiries (skew towards
// low strikes) and a term structure rising from 16% to 21%
const STRIKES = Array.from({ length: 33 }, (_, i) => 60 + i * 2.5);
const EXPIRIES = [7, 14, 30, 60, 90, 120, 180, 270, 365, 540, 730];
const vol = new Float32Array(STRIKES.length * EXPIRIES.length);
EXPIRIES.forEach((days, r) => {
  const years = days / 365;
  const atm = 21 - 5 * Math.exp(-years * 1.4);
  const skew = -12 / Math.sqrt(years + 0.25);
  const smile = 25 / Math.sqrt(years + 0.25);
  STRIKES.forEach((strike, c) => {
    const k = Math.log(strike / 100);
    vol[r * STRIKES.length + c] = atm + skew * k + smile * k * k;
  });
});
const surface = {
  rows: EXPIRIES.length,
  cols: STRIKES.length,
  x: STRIKES,
  y: EXPIRIES,
  z: vol,
};

export default function VolatilityDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("impliedVol"),
        data: surface,
        wireframe: { width: 0.75 },
      },
    ],
    [t],
  );
  const percent = (value: number) => t("percent", { value: value.toFixed(1) });

  return (
    <Surface3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("strike"),
        format: (value) => t("percent", { value: Math.round(value) }),
      }}
      yAxis={{
        title: t("expiry"),
        format: (value) => t("days", { value: Math.round(value) }),
      }}
      zAxis={{ title: t("impliedVol"), format: percent }}
      colorBar={{ format: (value) => t("percent", { value }) }}
      camera={{ azimuth: -28, elevation: 24 }}
      height={440}
      ariaLabel={t("volatilityAria")}
    />
  );
}
`})))()}var Rt;function zt(){return(zt=e((()=>{Rt=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Tag } from "minerva-design";
import {
  Surface3DChart,
  type Chart3DHandle,
  type Surface3DSeries,
} from "minerva-design/charts";

// A 30 × 20 m office floor sampled every 0.5 m
const COLS = 61;
const ROWS = 41;
const STEP = 0.5;
const X = Float64Array.from({ length: COLS }, (_, i) => i * STEP);
const Y = Float64Array.from({ length: ROWS }, (_, i) => i * STEP);
const FLOOR = -95; // dBm, no usable signal
const GOOD = -67; // dBm, enough for video calls
const USABLE = -75;

type AccessPoint = "lobby" | "openSpace" | "meetingRooms" | "kitchen";
const ACCESS_POINTS: [AccessPoint, number, number][] = [
  ["lobby", 4, 4],
  ["openSpace", 16, 12],
  ["meetingRooms", 26, 16],
  ["kitchen", 25, 3],
];

// interior walls (x1, y1, x2, y2); each one crossed costs 6 dB
const WALLS: [number, number, number, number][] = [
  [10, 0, 10, 8],
  [20, 9, 30, 9],
  [21, 9, 21, 20],
  [0, 14, 10, 14],
  [18, 0, 18, 6],
];

const crosses = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  [cx, cy, dx, dy]: [number, number, number, number],
) => {
  const side = (
    px: number,
    py: number,
    qx: number,
    qy: number,
    rx: number,
    ry: number,
  ) => Math.sign((qx - px) * (ry - py) - (qy - py) * (rx - px));
  return (
    side(ax, ay, bx, by, cx, cy) !== side(ax, ay, bx, by, dx, dy) &&
    side(cx, cy, dx, dy, ax, ay) !== side(cx, cy, dx, dy, bx, by)
  );
};

/** Strongest signal over the floor, log-distance path loss plus wall losses */
const coverage = (enabled: ReadonlySet<AccessPoint>) => {
  const z = new Float32Array(ROWS * COLS);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let best = FLOOR;
      for (const [id, ax, ay] of ACCESS_POINTS) {
        if (!enabled.has(id)) continue;
        const [x, y] = [X[c]!, Y[r]!];
        const walls = WALLS.filter((wall) =>
          crosses(ax, ay, x, y, wall),
        ).length;
        const distance = Math.max(1, Math.hypot(x - ax, y - ay));
        best = Math.max(best, -32 - 30 * Math.log10(distance) - 6 * walls);
      }
      z[r * COLS + c] = best;
    }
  }
  return { rows: ROWS, cols: COLS, x: X, y: Y, z };
};

export default function WifiSignalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const ref = useRef<Chart3DHandle>(null);
  const [enabled, setEnabled] = useState<ReadonlySet<AccessPoint>>(
    () => new Set<AccessPoint>(["lobby", "openSpace", "meetingRooms"]),
  );
  const [topView, setTopView] = useState(false);
  const data = useMemo(() => coverage(enabled), [enabled]);
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const dbm = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    return (value: number) => t("dbm", { value: number.format(value) });
  }, [t, i18n.language]);

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("signal"),
        data,
        contours: {
          levels: [USABLE, GOOD],
          floor: true,
          surface: true,
          width: 1.5,
        },
        format: dbm,
      },
    ],
    [t, data, dbm],
  );
  const share = (threshold: number) =>
    data.z.filter((value) => value >= threshold).length / data.z.length;

  const toggle = (id: AccessPoint) => {
    const next = new Set(enabled);
    if (!next.delete(id)) next.add(id);
    setEnabled(next);
  };
  const switchView = () => {
    if (topView) ref.current?.resetCamera();
    else
      ref.current?.setCamera({
        azimuth: 0,
        elevation: 89,
        zoom: 1,
        pan: [0, 0],
        projection: "orthographic",
      });
    setTopView(!topView);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <span>{t("accessPoints")}</span>
        {ACCESS_POINTS.map(([id]) => (
          <Tag
            key={id}
            size="small"
            clickable
            pressed={enabled.has(id)}
            onClick={() => toggle(id)}
          >
            {t(\`rooms.\${id}\`)}
          </Tag>
        ))}
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={switchView}
        >
          {topView ? t("perspectiveView") : t("topView")}
        </Button>
      </HStack>
      <Surface3DChart
        ref={ref}
        series={series}
        xAxis={{ title: t("distanceM") }}
        yAxis={{ title: t("distanceM") }}
        zAxis={{ min: FLOOR, max: -30, title: t("signal"), format: dbm }}
        valueRange={[FLOOR, -30]}
        colorScale="spectral"
        colorBar={{ title: t("signal"), format: dbm }}
        aspect={[30, 20, 8]}
        camera={{ azimuth: 25, elevation: 40 }}
        height={440}
        ariaLabel={t("wifiAria")}
        onCameraChange={(camera) =>
          setTopView(
            camera.projection === "orthographic" && camera.elevation > 80,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {enabled.size
          ? t("wifiCoverage", {
              good: percent.format(share(GOOD)),
              goodLevel: dbm(GOOD),
              usable: percent.format(share(USABLE)),
              usableLevel: dbm(USABLE),
            })
          : t("wifiNone")}
      </output>
    </div>
  );
}
`})))()}var Bt;function Vt(){return(Vt=e((()=>{Bt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// MATLAB's peaks function on a 120 × 120 grid
const SIZE = 120;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -3 + (6 * i) / (SIZE - 1),
);
const z = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    const x = axis[c]!;
    const y = axis[r]!;
    z[r * SIZE + c] =
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3;
  }
}
const peaks = { rows: SIZE, cols: SIZE, x: axis, y: axis, z };

export default function WireframeContoursDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [fill, setFill] = useState(true);
  const [wireframe, setWireframe] = useState(true);
  const [floor, setFloor] = useState(true);
  const [onSurface, setOnSurface] = useState(false);

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("functions.peaks"),
        data: peaks,
        fill,
        opacity: 0.92,
        wireframe: wireframe && { step: 4 },
        contours: (floor || onSurface) && {
          count: 14,
          floor,
          surface: onSurface,
          width: 1.25,
        },
      },
    ],
    [t, fill, wireframe, floor, onSurface],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={fill}
          label={t("fill")}
          onChange={setFill}
        />
        <Switch
          size="small"
          checked={wireframe}
          label={t("wireframe")}
          onChange={setWireframe}
        />
        <Switch
          size="small"
          checked={floor}
          label={t("floorContours")}
          onChange={setFloor}
        />
        <Switch
          size="small"
          checked={onSurface}
          label={t("surfaceContours")}
          onChange={setOnSurface}
        />
      </div>
      <Surface3DChart
        series={series}
        colorScale="viridis"
        camera={{ azimuth: -50, elevation: 30 }}
        height={440}
        ariaLabel={t("contoursAria")}
      />
    </div>
  );
}
`})))()}var Ht;function Ut(){return(Ut=e((()=>{Ht=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// maturities of the curve in months, evenly spaced on the x axis
const MATURITIES = [1, 3, 6, 12, 24, 36, 60, 84, 120, 240, 360];
const MONTHS = 24;
const START = Date.UTC(2024, 10, 1); // November 2024

/**
 * Nelson-Siegel yields: the curve starts inverted (short rates above long
 * rates) and normalizes as the central bank cuts its rate month after month
 */
const yieldAt = (month: number, maturity: number) => {
  const progress = month / (MONTHS - 1);
  const level = 4.3 + 0.25 * Math.sin(month / 3.5);
  const slope = 0.9 - 1.9 * progress; // short end minus long end
  const curvature = -0.6 + 0.4 * Math.sin(month / 5);
  const tau = 2.2;
  const years = maturity / 12;
  const f = (1 - Math.exp(-years / tau)) / (years / tau);
  return level + slope * f + curvature * (f - Math.exp(-years / tau));
};

const DATA = (() => {
  const z = new Float32Array(MONTHS * MATURITIES.length);
  for (let r = 0; r < MONTHS; r++) {
    MATURITIES.forEach((maturity, c) => {
      z[r * MATURITIES.length + c] = yieldAt(r, maturity);
    });
  }
  return { rows: MONTHS, cols: MATURITIES.length, z };
})();

const dateOf = (month: number) => {
  const date = new Date(START);
  date.setUTCMonth(date.getUTCMonth() + month);
  return date;
};

export default function YieldCurveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null,
  );
  const formats = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
      longMonth: new Intl.DateTimeFormat(i18n.language, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      months: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "month",
        unitDisplay: "short",
      }),
      years: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "year",
        unitDisplay: "short",
      }),
    }),
    [i18n.language],
  );
  const maturity = (index: number) => {
    const months = MATURITIES[Math.round(index)];
    if (months === undefined) return "";
    return months < 12
      ? formats.months.format(months)
      : formats.years.format(months / 12);
  };

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("treasuryYield"),
        data: DATA,
        contours: { count: 8, floor: true },
        format: (value) => formats.percent.format(value / 100),
      },
    ],
    [t, formats],
  );

  // spread between the 10-year and the 2-year yields of the hovered month
  const row = hovered?.row ?? MONTHS - 1;
  const spread =
    DATA.z[row * MATURITIES.length + MATURITIES.indexOf(120)]! -
    DATA.z[row * MATURITIES.length + MATURITIES.indexOf(24)]!;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Surface3DChart
        series={series}
        xAxis={{
          title: t("maturity"),
          format: maturity,
          tickCount: MATURITIES.length,
          nice: false,
        }}
        yAxis={{
          title: t("month"),
          format: (value) => formats.month.format(dateOf(Math.round(value))),
          nice: false,
        }}
        zAxis={{
          title: t("yield"),
          format: (value) => formats.percent.format(value / 100),
        }}
        colorScale="spectral"
        colorBar={false}
        aspect={[1, 1.2, 0.55]}
        camera={{ azimuth: -40, elevation: 28 }}
        height={460}
        ariaLabel={t("yieldAria")}
        onHover={(event) =>
          setHovered(
            event && event.row !== undefined && event.col !== undefined
              ? { row: event.row, col: event.col }
              : null,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? t("yieldHover", {
              maturity: maturity(hovered.col),
              date: formats.longMonth.format(dateOf(hovered.row)),
              yield: formats.percent.format(
                DATA.z[hovered.row * MATURITIES.length + hovered.col]! / 100,
              ),
            })
          : t("yieldHint")}{" "}
        {t(spread < 0 ? "spreadInverted" : "spreadNormal", {
          date: formats.longMonth.format(dateOf(row)),
          spread: formats.percent.format(spread / 100),
        })}
      </output>
    </div>
  );
}
`})))()}var Wt,Gt,Kt;function qt(){return(qt=e((()=>{pe(),ye(),we(),je(),Ge(),Qe(),it(),pt(),_t(),Ct(),Tt(),Dt(),kt(),jt(),Nt(),Ft(),Lt(),zt(),Vt(),Ut(),t(),oe(),ce(),Wt=n(),Gt=ae(Object.assign({"./demos/functions.tsx":ue,"./demos/heat-diffusion.tsx":me,"./demos/live-wave.tsx":be,"./demos/loss-landscape.tsx":Te,"./demos/terrain.tsx":Ne,"./demos/transparency.tsx":Ke,"./demos/volatility.tsx":$e,"./demos/wifi-signal.tsx":at,"./demos/wireframe-contours.tsx":mt,"./demos/yield-curve.tsx":vt}),Object.assign({"./demos/functions.tsx":wt,"./demos/heat-diffusion.tsx":Et,"./demos/live-wave.tsx":Ot,"./demos/loss-landscape.tsx":At,"./demos/terrain.tsx":Mt,"./demos/transparency.tsx":Pt,"./demos/volatility.tsx":It,"./demos/wifi-signal.tsx":Rt,"./demos/wireframe-contours.tsx":Bt,"./demos/yield-curve.tsx":Ht})),Kt=()=>(0,Wt.jsx)(se,{id:`surface-3d-chart`,demos:Gt})})))()}qt();export{Kt as default};