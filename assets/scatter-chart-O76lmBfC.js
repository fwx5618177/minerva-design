import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{l as s,n as c,t as l,u}from"./DocPage-CHJwIegD.js";import{c as d,m as f}from"./charts-JJDQ3gS7.js";function p(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function m(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,h.useMemo)(()=>[{name:e(`starter`),data:re},{name:e(`business`),data:ie}],[e]),a=(0,h.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),[n]);return(0,ee.jsx)(d,{series:i,xAxis:{title:e(`seats`)},yAxis:{title:e(`monthlyBill`),format:e=>a.format(e)},height:300,ariaLabel:e(`billAria`)})}var h,ee,te,ne,re,ie;function ae(){return(ae=e((()=>{h=t(),i(),f(),ee=n(),te=p(9),ne=(e,t)=>Array.from({length:40},()=>{let n=1+Math.round(te()*49);return[n,Math.round(e+n*t*(.8+te()*.4))]}),re=ne(20,9),ie=ne(60,14)})))()}function oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,g.useMemo)(()=>[{name:e(`penguins.adelie`),data:ue,opacity:.8},{name:e(`penguins.chinstrap`),data:de,opacity:.8},{name:e(`penguins.gentoo`),data:fe,opacity:.8}],[e]),a=(0,g.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`}),[n]),o=(0,g.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`kilogram`,maximumFractionDigits:1}),[n]);return(0,ce.jsx)(d,{series:i,xAxis:{title:e(`flipper`),format:e=>a.format(e)},yAxis:{title:e(`mass`),format:e=>o.format(e/1e3)},height:320,ariaLabel:e(`penguinsAria`)})}var g,ce,le,_,v,ue,de,fe;function pe(){return(pe=e((()=>{g=t(),i(),f(),ce=n(),le=oe(3),_=()=>Math.sqrt(-2*Math.log(1-le()))*Math.cos(2*Math.PI*le()),v=(e,t,n)=>Array.from({length:n},()=>{let n=_();return[Math.round(e+n*6+_()*2),Math.round(t+n*380+_()*160)]}),ue=v(190,3700,70),de=v(196,3730,45),fe=v(217,5080,60)})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,y.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`});return[{name:e(`countries`),showLabels:!0,opacity:.7,data:ge.map(([e,n,r,i])=>({x:n,y:r,label:t.of(e)??e,size:6+Math.sqrt(i)*.6}))}]},[e,n]),a=(0,y.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),o=(0,y.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`year`,maximumFractionDigits:1}),[n]);return(0,he.jsx)(d,{series:i,xAxis:{title:e(`gdp`),format:e=>a.format(e*1e3)},yAxis:{title:e(`lifeExpectancy`),format:e=>o.format(e)},height:320,ariaLabel:e(`countriesAria`)})}var y,he,ge;function _e(){return(_e=e((()=>{y=t(),i(),f(),he=n(),ge=[[`JP`,34,84.5,124],[`DE`,52,81.2,84],[`FR`,44,82.5,68],[`US`,80,78.4,335],[`BR`,10,75.9,216],[`IN`,2.5,70.8,1430],[`CN`,12.6,78.6,1410],[`NG`,1.6,54.5,224],[`MX`,13.9,75.1,128],[`ID`,4.9,71.9,278]]})))()}function ve(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),[n,i]=(0,b.useState)(null),a=(0,b.useMemo)(()=>{let t=ve(1),n=()=>Math.sqrt(-2*Math.log(1-t()))*Math.cos(2*Math.PI*t()),r=(e,t,r,i)=>{let a=new Float64Array(S),o=new Float64Array(S);for(let e=0;e<S;e++)a[e]=t+n()*i,o[e]=r+n()*i;return{name:e,data:{x:a,y:o},pointSize:3,opacity:.5}};return[r(e(`cluster`,{name:`A`}),-2,-1,1.2),r(e(`cluster`,{name:`B`}),2.5,1.5,.9)]},[e]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(d,{series:a,onRendererChange:i,height:320,ariaLabel:e(`clustersAria`)}),(0,x.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{points:new Intl.NumberFormat(t.language).format(S*2),renderer:n??`…`})})]})}var b,x,S;function be(){return(be=e((()=>{b=t(),i(),f(),x=n(),S=1e5})))()}function xe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,[i,a]=(0,C.useState)(T),[s,c]=(0,C.useState)(!0);(0,C.useEffect)(()=>{if(!s)return;let e=setInterval(()=>a(e=>e+1),400);return()=>clearInterval(e)},[s]);let l=(0,C.useMemo)(()=>Array.from({length:T},(e,t)=>Ce(i-T+t)),[i]),u=l[l.length-1],f=l.filter(e=>e.vibration>E).length,p=(0,C.useMemo)(()=>{let t=e=>[e.rpm,e.vibration];return[{name:e(`normal`),data:l.filter(e=>e.vibration<=E).map(t),pointSize:6,opacity:.55},{name:e(`alarm`),data:l.filter(e=>e.vibration>E).map(t),color:`var(--danger-color)`,pointSize:8},{name:e(`latest`),data:u?[t(u)]:[],color:`var(--text-color)`,pointSize:12,opacity:.35}]},[e,l,u]),m=(0,C.useMemo)(()=>new Intl.NumberFormat(n),[n]),h=(0,C.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`mmPerSecond`,{value:t.format(n)})},[n,e]);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,w.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,w.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(e=>!e),children:e(s?`pause`:`resume`)}),(0,w.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:u&&e(`vibrationStatus`,{rpm:m.format(u.rpm),value:h(u.vibration),alarms:m.format(f)})})]}),(0,w.jsx)(d,{series:p,xAxis:{title:e(`speed`),min:1e3,max:3200,format:e=>m.format(e)},yAxis:{title:e(`vibration`),min:0,max:14,format:h},annotations:[{type:`line`,axis:`y`,value:E,color:`var(--danger-color)`,dash:[4,4],label:e(`alarmLimit`)}],height:320,ariaLabel:e(`vibrationAria`)})]})}var C,w,T,E,Ce;function we(){return(we=e((()=>{C=t(),i(),a(),f(),w=n(),T=160,E=7.1,Ce=e=>{let t=xe(e*7919),n=2100+800*Math.sin(e/23)+(t()-.5)*300,r=e%90>80?4+t()*3:0,i=.8+n/1e3*1.4+(t()-.5)*1.6+r;return{rpm:Math.round(n),vibration:Math.round(i*100)/100}}})))()}function Te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,Ee.useMemo)(()=>[{name:e(`mammals`),showLabels:!0,pointSize:9,data:Oe.map(([t,n,r])=>({x:n,y:r,label:e(`animals.${t}`)}))},{name:e(`powerLaw`),type:`line`,lineWidth:1.5,color:`var(--text-secondary-color)`,tooltip:!1,data:[[.002,je(.002)],[8e3,je(8e3)]]}],[e]),a=(0,Ee.useMemo)(()=>new Intl.NumberFormat(n,{maximumSignificantDigits:3}),[n]);return(0,De.jsx)(d,{series:i,xAxis:{type:`log`,title:e(`bodyMass`),format:t=>e(`kg`,{value:a.format(t)}),grid:!0},yAxis:{type:`log`,title:e(`metabolicRate`),format:t=>e(`watts`,{value:a.format(t)})},annotations:[{type:`text`,x:.004,y:1e3,anchor:`left`,text:e(`kleiber`,{exponent:new Intl.NumberFormat(n,{maximumFractionDigits:2}).format(A)})}],height:360,ariaLabel:e(`kleiberAria`)})}var Ee,De,Oe,D,ke,O,k,A,Ae,je;function Me(){return(Me=e((()=>{Ee=t(),i(),f(),De=n(),Oe=[[`shrew`,.004,.06],[`mouse`,.025,.21],[`rat`,.3,1.45],[`rabbit`,2.5,6.7],[`cat`,4,9.8],[`dog`,20,35],[`human`,70,83],[`pig`,150,138],[`horse`,500,380],[`cow`,600,420],[`giraffe`,1200,640],[`elephant`,4e3,1700]],D=Oe.map(([,e,t])=>[Math.log10(e),Math.log10(t)]),ke=D.length,O=D.reduce((e,[t])=>e+t,0)/ke,k=D.reduce((e,[,t])=>e+t,0)/ke,A=D.reduce((e,[t,n])=>e+(t-O)*(n-k),0)/D.reduce((e,[t])=>e+(t-O)**2,0),Ae=10**(k-A*O),je=e=>Ae*e**A})))()}function Ne(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,j.useMemo)(()=>[{name:e(`requests`),data:F.map(t=>Ie(t)?{x:t.size,y:t.time,color:`var(--danger-color)`,size:11,label:e(`outlier`)}:{x:t.size,y:t.time}),opacity:.6,pointSize:6},{name:e(`expected`),type:`line`,lineWidth:1.5,color:`var(--text-secondary-color)`,data:[[0,N(0)],[500,N(500)]]}],[e]),a=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`kilobyte`}),[n]),o=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`}),[n]);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,M.jsx)(d,{series:i,xAxis:{title:e(`payload`),format:e=>a.format(e)},yAxis:{title:e(`responseTime`),format:e=>o.format(e)},height:320,ariaLabel:e(`outliersAria`)}),(0,M.jsx)(`p`,{children:e(`outliersSummary`,{slow:Le,total:F.length})})]})}var j,M,N,Fe,P,F,Ie,Le;function Re(){return(Re=e((()=>{j=t(),i(),f(),M=n(),N=e=>40+e*.6,Fe=2,P=Ne(17),F=Array.from({length:300},(e,t)=>{let n=Math.round(5+P()*495),r=t%37==0?2.4+P()*2:1,i=N(n)*(.75+P()*.5)*r;return{size:n,time:Math.round(i)}}),Ie=({size:e,time:t})=>t>N(e)*Fe,Le=F.filter(Ie).length})))()}function ze(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,I.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),[n]),a=(0,I.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,maximumFractionDigits:1});return t=>e.format(t/100)},[n]),o=(0,I.useMemo)(()=>[{name:e(`players`),showLabels:!0,data:Be.map(([e,t,n,r])=>({x:t,y:n,label:e,size:4+r/2.5})),opacity:.8}],[e]),s=(0,I.useMemo)(()=>[{type:`line`,axis:`x`,value:R,dash:[4,4]},{type:`line`,axis:`y`,value:z,dash:[4,4],label:e(`leagueAverage`)},{type:`rect`,x0:R,y0:z,color:`var(--success-color)`,opacity:.08,label:e(`efficientScorers`),labelPosition:`top-right`},{type:`rect`,x0:R,y1:z,color:`var(--warning-color)`,opacity:.08,label:e(`volumeShooters`),labelPosition:`bottom-right`}],[e]);return(0,L.jsx)(d,{series:o,annotations:s,xAxis:{title:e(`usageRate`),format:a,min:12,max:36},yAxis:{title:e(`trueShooting`),format:a,min:50,max:68},renderTooltip:t=>{let n=Be[t.items[0]?.index??-1];if(!n)return null;let[r,o,s,c]=n;return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,L.jsx)(`strong`,{children:r}),(0,L.jsx)(`span`,{children:e(`pointsPerGame`,{value:i.format(c)})}),(0,L.jsx)(`span`,{children:e(`usageRow`,{value:a(o)})}),(0,L.jsx)(`span`,{children:e(`trueShootingRow`,{value:a(s)})})]})},legend:!1,height:360,ariaLabel:e(`playersAria`)})}var I,L,Be,R,z;function Ve(){return(Ve=e((()=>{I=t(),i(),f(),L=n(),Be=[[`A. Okafor`,31.5,61.2,29.8],[`L. Moreau`,29.8,55.1,27.1],[`K. Tanaka`,27.2,63.4,24.6],[`D. Silva`,33.1,53.2,28.4],[`M. Novak`,18.4,66.8,14.2],[`J. Reyes`,21.6,59.7,17.9],[`T. Brooks`,24.9,52.4,19.6],[`S. Ivanov`,16.2,62.1,10.4],[`R. Chen`,22.8,57.3,18.1],[`P. Mensah`,14.9,54.8,8.7],[`E. Larsen`,26.4,58.9,22.3],[`H. Kim`,19.7,51.6,12.9],[`F. Rossi`,28.6,60.4,25.7],[`O. Haddad`,17.3,57.8,11.6],[`N. Dubois`,23.5,64.2,20.2],[`C. Walker`,30.2,57.9,26.8]],R=20,z=57.5})))()}function He(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,[i,a]=(0,B.useState)(null),o=(0,B.useMemo)(()=>H.map((t,n)=>({name:e(`departments.${t}`),showLabels:!0,opacity:.75,data:(U[n]??[]).map((e,t)=>i?.department===n&&i.index===t?{x:e.tenure,y:e.score,size:16,label:e.id}:{x:e.tenure,y:e.score})})),[e,i]),s=(0,B.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`year`,maximumFractionDigits:1}),[n]),c=(0,B.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:1}),[n]),l=(0,B.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),[n]),u=i?U[i.department]?.[i.index]:void 0;return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,V.jsx)(d,{series:o,xAxis:{title:e(`tenure`),format:e=>s.format(e)},yAxis:{title:e(`reviewScore`),min:1,max:5},annotations:[{type:`line`,axis:`y`,value:We,dash:[4,4],label:e(`companyAverage`)}],onPointClick:e=>{let t=e.items[0];t&&a({department:t.seriesIndex,index:t.index})},onPlotClick:()=>a(null),height:320,ariaLabel:e(`staffAria`)}),(0,V.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:u&&i?e(`employeeStatus`,{id:u.id,department:e(`departments.${H[i.department]}`),tenure:s.format(u.tenure),score:c.format(u.score),salary:l.format(u.salary)}):e(`employeeHint`)})]})}var B,V,H,U,W,We;function Ge(){return(Ge=e((()=>{B=t(),i(),f(),V=n(),H=[`engineering`,`sales`,`support`],U=H.map((e,t)=>{let n=He(300+t);return Array.from({length:30},(e,r)=>{let i=Math.round(n()**1.4*14*10)/10,a=Math.min(5,Math.max(1,2.6+i*.08+(n()-.4)*2));return{id:`E-${1e3+t*100+r}`,tenure:i,score:Math.round(a*10)/10,salary:Math.round((52+t*6+i*3.2+n()*18)*1e3)}})}),W=U.flat(),We=W.reduce((e,t)=>e+t.score,0)/W.length})))()}function Ke(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function qe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,Je.useMemo)(()=>[{name:e(`campaigns`),data:G,opacity:.75},{name:e(`trend`),type:`line`,lineWidth:2,color:`var(--danger-color)`,data:[[0,et],[32,et+Y*32]]}],[e]),a=(0,Je.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),o=new Intl.NumberFormat(n,{maximumFractionDigits:2});return(0,Ye.jsx)(d,{series:i,xAxis:{title:e(`adSpend`),min:0,max:32,format:a},yAxis:{title:e(`revenue`),format:a},annotations:[{type:`text`,x:1,y:nt,anchor:`left`,text:e(`fit`,{r2:o.format(tt),slope:o.format(Y)})}],height:320,ariaLabel:e(`trendAria`)})}var Je,Ye,Xe,G,Ze,K,q,J,Qe,$e,Y,et,tt,nt;function rt(){return(rt=e((()=>{Je=t(),i(),f(),Ye=n(),Xe=Ke(42),G=Array.from({length:60},()=>{let e=2+Xe()*28;return[e,15+e*3.1+(Xe()-.5)*30]}),Ze=G.length,K=G.reduce((e,[t])=>e+t,0)/Ze,q=G.reduce((e,[,t])=>e+t,0)/Ze,J=G.reduce((e,[t,n])=>e+(t-K)*(n-q),0),Qe=G.reduce((e,[t])=>e+(t-K)**2,0),$e=G.reduce((e,[,t])=>e+(t-q)**2,0),Y=J/Qe,et=q-Y*K,tt=J*J/(Qe*$e),nt=Math.max(...G.map(([,e])=>e))})))()}function it(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function at(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-chart.data`}),n=t.language,i=(0,X.useRef)(null),[a,s]=(0,X.useState)(null),c=(0,X.useMemo)(()=>[{name:e(`readings`),data:Q,pointSize:5,opacity:.55}],[e]),l=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1}),[n]),u=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),[n]),f=e=>{i.current?.setView($[e]),s(i.current?.getView()??$[e])},p=a?Q.filter(([e,t])=>e>=a.x[0]&&e<=a.x[1]&&t>=a.y[0]&&t<=a.y[1]).length:Q.length;return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[Object.keys($).map(t=>(0,Z.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>f(t),children:e(`zoomPresets.${t}`)},t)),(0,Z.jsx)(o,{size:`small`,variant:`ghost`,onClick:()=>i.current?.resetZoom(),children:e(`showAll`)})]}),(0,Z.jsx)(d,{ref:i,series:c,xAxis:{title:e(`temperature`),format:e=>l.format(e)},yAxis:{title:e(`humidity`),format:e=>u.format(e/100)},annotations:[{type:`rect`,...ct,color:`var(--success-color)`,opacity:.1,label:e(`growingRange`)}],onZoom:s,height:320,ariaLabel:e(`greenhouseAria`)}),(0,Z.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:a?e(`greenhouseView`,{t0:l.format(a.x[0]),t1:l.format(a.x[1]),h0:u.format(a.y[0]/100),h1:u.format(a.y[1]/100),points:new Intl.NumberFormat(n).format(p)}):e(`greenhouseHint`)})]})}var X,Z,ot,st,Q,ct,$;function lt(){return(lt=e((()=>{X=t(),i(),a(),f(),Z=n(),ot=it(64),st=()=>Math.sqrt(-2*Math.log(1-ot()))*Math.cos(2*Math.PI*ot()),Q=Array.from({length:900},(e,t)=>{let[n,r]=t%9==0?[33,38]:t%3==0?[15,84]:[23,63],i=n+st()*2.2,a=r-(i-n)*2+st()*5;return[Math.round(i*10)/10,Math.round(Math.min(100,Math.max(5,a))*10)/10]}),ct={x0:18,x1:28,y0:50,y1:75},$={night:{x:[8,22],y:[65,100]},comfort:{x:[16,30],y:[45,80]},heat:{x:[26,42],y:[15,60]}}})))()}var ut;function dt(){return(dt=e((()=>{ut=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Customers of two plans: seats against monthly bill (USD)
const random = mulberry32(9);
const plan = (price: number, slope: number) =>
  Array.from({ length: 40 }, () => {
    const seats = 1 + Math.round(random() * 49);
    return [
      seats,
      Math.round(price + seats * slope * (0.8 + random() * 0.4)),
    ] as const;
  });
const starter = plan(20, 9);
const business = plan(60, 14);

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("starter"), data: starter },
      { name: t("business"), data: business },
    ],
    [t],
  );
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("seats") }}
      yAxis={{ title: t("monthlyBill"), format: (value) => usd.format(value) }}
      height={300}
      ariaLabel={t("billAria")}
    />
  );
}
`})))()}var ft;function pt(){return(pt=e((()=>{ft=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(3);
const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());

// Flipper length (mm) and body mass (g) of three penguin species
const species = (flipper: number, mass: number, count: number) =>
  Array.from({ length: count }, () => {
    const size = gaussian();
    return [
      Math.round(flipper + size * 6 + gaussian() * 2),
      Math.round(mass + size * 380 + gaussian() * 160),
    ] as const;
  });
const adelie = species(190, 3700, 70);
const chinstrap = species(196, 3730, 45);
const gentoo = species(217, 5080, 60);

export default function CategoriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  // one series per category: its own color, legend entry and toggle
  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("penguins.adelie"), data: adelie, opacity: 0.8 },
      { name: t("penguins.chinstrap"), data: chinstrap, opacity: 0.8 },
      { name: t("penguins.gentoo"), data: gentoo, opacity: 0.8 },
    ],
    [t],
  );
  const mm = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );
  const kg = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "kilogram",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("flipper"), format: (value) => mm.format(value) }}
      yAxis={{ title: t("mass"), format: (value) => kg.format(value / 1000) }}
      height={320}
      ariaLabel={t("penguinsAria")}
    />
  );
}
`})))()}var mt;function ht(){return(ht=e((()=>{mt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// Country code, GDP per capita (k$), life expectancy (years), population (millions)
const countries: [string, number, number, number][] = [
  ["JP", 34, 84.5, 124],
  ["DE", 52, 81.2, 84],
  ["FR", 44, 82.5, 68],
  ["US", 80, 78.4, 335],
  ["BR", 10, 75.9, 216],
  ["IN", 2.5, 70.8, 1430],
  ["CN", 12.6, 78.6, 1410],
  ["NG", 1.6, 54.5, 224],
  ["MX", 13.9, 75.1, 128],
  ["ID", 4.9, 71.9, 278],
];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return [
      {
        name: t("countries"),
        showLabels: true,
        opacity: 0.7,
        data: countries.map(([code, x, y, population]) => ({
          x,
          y,
          label: names.of(code) ?? code,
          size: 6 + Math.sqrt(population) * 0.6,
        })),
      },
    ];
  }, [t, locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );
  const years = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "year",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{
        title: t("gdp"),
        format: (value) => usd.format(value * 1000),
      }}
      yAxis={{
        title: t("lifeExpectancy"),
        format: (value) => years.format(value),
      }}
      height={320}
      ariaLabel={t("countriesAria")}
    />
  );
}
`})))()}var gt;function _t(){return(_t=e((()=>{gt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScatterChart,
  type ChartRendererKind,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PER_CLUSTER = 100_000;

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(1);
    // Box-Muller: normally distributed values
    const gaussian = () =>
      Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
    const cluster = (name: string, cx: number, cy: number, spread: number) => {
      const x = new Float64Array(PER_CLUSTER);
      const y = new Float64Array(PER_CLUSTER);
      for (let i = 0; i < PER_CLUSTER; i++) {
        x[i] = cx + gaussian() * spread;
        y[i] = cy + gaussian() * spread;
      }
      return { name, data: { x, y }, pointSize: 3, opacity: 0.5 };
    };
    return [
      cluster(t("cluster", { name: "A" }), -2, -1, 1.2),
      cluster(t("cluster", { name: "B" }), 2.5, 1.5, 0.9),
    ];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        onRendererChange={setRenderer}
        height={320}
        ariaLabel={t("clustersAria")}
      />
      <p role="status">
        {t("largeStatus", {
          points: new Intl.NumberFormat(i18n.language).format(PER_CLUSTER * 2),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var vt;function yt(){return(yt=e((()=>{vt=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WINDOW = 160; // samples kept on screen
const LIMIT = 7.1; // mm/s, the alarm limit of the vibration velocity

/**
 * Sample number \`tick\` of a motor's sensor: speed (rpm) and vibration (mm/s).
 * Derived from the tick alone, so the stream is deterministic.
 */
const sampleAt = (tick: number) => {
  const random = mulberry32(tick * 7919);
  const rpm = 2100 + 800 * Math.sin(tick / 23) + (random() - 0.5) * 300;
  // a worn bearing: bursts of strong vibration every 90 samples
  const fault = tick % 90 > 80 ? 4 + random() * 3 : 0;
  const vibration = 0.8 + (rpm / 1000) * 1.4 + (random() - 0.5) * 1.6 + fault;
  return { rpm: Math.round(rpm), vibration: Math.round(vibration * 100) / 100 };
};

export default function LiveStreamDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(WINDOW);
  const [running, setRunning] = useState(true);

  // a new sample every 400 ms, the oldest one drops out
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 400);
    return () => clearInterval(timer);
  }, [running]);

  const samples = useMemo(
    () => Array.from({ length: WINDOW }, (_, i) => sampleAt(tick - WINDOW + i)),
    [tick],
  );
  const latest = samples[samples.length - 1];
  const alarms = samples.filter((s) => s.vibration > LIMIT).length;

  const series = useMemo((): ChartSeries[] => {
    const point = (s: { rpm: number; vibration: number }) =>
      [s.rpm, s.vibration] as const;
    return [
      {
        name: t("normal"),
        data: samples.filter((s) => s.vibration <= LIMIT).map(point),
        pointSize: 6,
        opacity: 0.55,
      },
      {
        name: t("alarm"),
        data: samples.filter((s) => s.vibration > LIMIT).map(point),
        color: "var(--danger-color)",
        pointSize: 8,
      },
      {
        // the newest sample, ringed by a bigger dot
        name: t("latest"),
        data: latest ? [point(latest)] : [],
        color: "var(--text-color)",
        pointSize: 12,
        opacity: 0.35,
      },
    ];
  }, [t, samples, latest]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const velocity = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("mmPerSecond", { value: format.format(value) });
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {latest &&
            t("vibrationStatus", {
              rpm: number.format(latest.rpm),
              value: velocity(latest.vibration),
              alarms: number.format(alarms),
            })}
        </output>
      </div>
      <ScatterChart
        series={series}
        // fixed ranges: the axes do not jump while the data streams in
        xAxis={{
          title: t("speed"),
          min: 1000,
          max: 3200,
          format: (value) => number.format(value),
        }}
        yAxis={{ title: t("vibration"), min: 0, max: 14, format: velocity }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: LIMIT,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("alarmLimit"),
          },
        ]}
        height={320}
        ariaLabel={t("vibrationAria")}
      />
    </div>
  );
}
`})))()}var bt;function xt(){return(xt=e((()=>{bt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// Body mass (kg) and basal metabolic rate (W) of mammals: six orders of
// magnitude of mass, only log axes show them all
const animals: [string, number, number][] = [
  ["shrew", 0.004, 0.06],
  ["mouse", 0.025, 0.21],
  ["rat", 0.3, 1.45],
  ["rabbit", 2.5, 6.7],
  ["cat", 4, 9.8],
  ["dog", 20, 35],
  ["human", 70, 83],
  ["pig", 150, 138],
  ["horse", 500, 380],
  ["cow", 600, 420],
  ["giraffe", 1_200, 640],
  ["elephant", 4_000, 1_700],
];

// Least-squares fit of log B = log a + b · log M: Kleiber's law, b ≈ 3/4
const logs = animals.map(([, m, b]) => [Math.log10(m), Math.log10(b)]);
const n = logs.length;
const mx = logs.reduce((s, [x]) => s + x, 0) / n;
const my = logs.reduce((s, [, y]) => s + y, 0) / n;
const exponent =
  logs.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0) /
  logs.reduce((s, [x]) => s + (x - mx) ** 2, 0);
const coefficient = 10 ** (my - exponent * mx);
const fit = (mass: number) => coefficient * mass ** exponent;

export default function LogLogDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("mammals"),
        showLabels: true,
        pointSize: 9,
        data: animals.map(([key, mass, rate]) => ({
          x: mass,
          y: rate,
          label: t(\`animals.\${key}\`),
        })),
      },
      {
        // a power law is a straight line on log-log axes: two points draw it
        name: t("powerLaw"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        tooltip: false,
        data: [
          [0.002, fit(0.002)],
          [8_000, fit(8_000)],
        ],
      },
    ],
    [t],
  );
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 }),
    [locale],
  );
  const kg = (value: number) => t("kg", { value: compact.format(value) });
  const watts = (value: number) => t("watts", { value: compact.format(value) });

  return (
    <ScatterChart
      series={series}
      xAxis={{ type: "log", title: t("bodyMass"), format: kg, grid: true }}
      yAxis={{ type: "log", title: t("metabolicRate"), format: watts }}
      annotations={[
        {
          type: "text",
          x: 0.004,
          y: 1_000,
          anchor: "left",
          text: t("kleiber", {
            exponent: new Intl.NumberFormat(locale, {
              maximumFractionDigits: 2,
            }).format(exponent),
          }),
        },
      ]}
      height={360}
      ariaLabel={t("kleiberAria")}
    />
  );
}
`})))()}var St;function Ct(){return(Ct=e((()=>{St=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Expected response time (ms) for a payload size (KB)
const expected = (size: number) => 40 + size * 0.6;
const TOLERANCE = 2; // slower than 2× the expected time = outlier

const random = mulberry32(17);
const requests = Array.from({ length: 300 }, (_, i) => {
  const size = Math.round(5 + random() * 495);
  const slow = i % 37 === 0 ? 2.4 + random() * 2 : 1;
  const time = expected(size) * (0.75 + random() * 0.5) * slow;
  return { size, time: Math.round(time) };
});
const isOutlier = ({ size, time }: { size: number; time: number }) =>
  time > expected(size) * TOLERANCE;
const outlierCount = requests.filter(isOutlier).length;

export default function OutliersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("requests"),
        // outliers are bigger and red
        data: requests.map((request) =>
          isOutlier(request)
            ? {
                x: request.size,
                y: request.time,
                color: "var(--danger-color)",
                size: 11,
                label: t("outlier"),
              }
            : { x: request.size, y: request.time },
        ),
        opacity: 0.6,
        pointSize: 6,
      },
      {
        name: t("expected"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        data: [
          [0, expected(0)],
          [500, expected(500)],
        ],
      },
    ],
    [t],
  );
  const kb = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte" }),
    [locale],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        xAxis={{ title: t("payload"), format: (value) => kb.format(value) }}
        yAxis={{
          title: t("responseTime"),
          format: (value) => ms.format(value),
        }}
        height={320}
        ariaLabel={t("outliersAria")}
      />
      <p>
        {t("outliersSummary", { slow: outlierCount, total: requests.length })}
      </p>
    </div>
  );
}
`})))()}var wt;function Tt(){return(Tt=e((()=>{wt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ScatterChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Basketball league: usage rate (% of the team's plays a player finishes),
// true shooting (%) and points per game of 16 (fictional) players
const players: [string, number, number, number][] = [
  ["A. Okafor", 31.5, 61.2, 29.8],
  ["L. Moreau", 29.8, 55.1, 27.1],
  ["K. Tanaka", 27.2, 63.4, 24.6],
  ["D. Silva", 33.1, 53.2, 28.4],
  ["M. Novak", 18.4, 66.8, 14.2],
  ["J. Reyes", 21.6, 59.7, 17.9],
  ["T. Brooks", 24.9, 52.4, 19.6],
  ["S. Ivanov", 16.2, 62.1, 10.4],
  ["R. Chen", 22.8, 57.3, 18.1],
  ["P. Mensah", 14.9, 54.8, 8.7],
  ["E. Larsen", 26.4, 58.9, 22.3],
  ["H. Kim", 19.7, 51.6, 12.9],
  ["F. Rossi", 28.6, 60.4, 25.7],
  ["O. Haddad", 17.3, 57.8, 11.6],
  ["N. Dubois", 23.5, 64.2, 20.2],
  ["C. Walker", 30.2, 57.9, 26.8],
];
const LEAGUE_USAGE = 20;
const LEAGUE_TS = 57.5;

export default function PlayersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("players"),
        showLabels: true,
        // the dot grows with the points per game
        data: players.map(([name, usage, ts, points]) => ({
          x: usage,
          y: ts,
          label: name,
          size: 4 + points / 2.5,
        })),
        opacity: 0.8,
      },
    ],
    [t],
  );
  // league averages split the plot; a caption names each corner
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      { type: "line", axis: "x", value: LEAGUE_USAGE, dash: [4, 4] },
      {
        type: "line",
        axis: "y",
        value: LEAGUE_TS,
        dash: [4, 4],
        label: t("leagueAverage"),
      },
      {
        type: "rect",
        x0: LEAGUE_USAGE,
        y0: LEAGUE_TS,
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("efficientScorers"),
        labelPosition: "top-right",
      },
      {
        type: "rect",
        x0: LEAGUE_USAGE,
        y1: LEAGUE_TS,
        color: "var(--warning-color)",
        opacity: 0.08,
        label: t("volumeShooters"),
        labelPosition: "bottom-right",
      },
    ],
    [t],
  );

  // a rich tooltip from the demo data (the hovered index is the player's)
  const tooltip = (event: ChartHoverEvent) => {
    const player = players[event.items[0]?.index ?? -1];
    if (!player) return null;
    const [name, usage, ts, points] = player;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{name}</strong>
        <span>{t("pointsPerGame", { value: decimal.format(points) })}</span>
        <span>{t("usageRow", { value: percent(usage) })}</span>
        <span>{t("trueShootingRow", { value: percent(ts) })}</span>
      </div>
    );
  };

  return (
    <ScatterChart
      series={series}
      annotations={annotations}
      xAxis={{ title: t("usageRate"), format: percent, min: 12, max: 36 }}
      yAxis={{ title: t("trueShooting"), format: percent, min: 50, max: 68 }}
      renderTooltip={tooltip}
      legend={false}
      height={360}
      ariaLabel={t("playersAria")}
    />
  );
}
`})))()}var Et;function Dt(){return(Dt=e((()=>{Et=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const departments = ["engineering", "sales", "support"] as const;

interface Employee {
  id: string;
  /** Years in the company */
  tenure: number;
  /** Last review, 1-5 */
  score: number;
  /** Yearly salary, USD */
  salary: number;
}

// 30 employees per department: tenure against the last performance review
const staff: Employee[][] = departments.map((_, d) => {
  const random = mulberry32(300 + d);
  return Array.from({ length: 30 }, (_, i) => {
    const tenure = Math.round(random() ** 1.4 * 14 * 10) / 10;
    const score = Math.min(
      5,
      Math.max(1, 2.6 + tenure * 0.08 + (random() - 0.4) * 2),
    );
    return {
      id: \`E-\${1000 + d * 100 + i}\`,
      tenure,
      score: Math.round(score * 10) / 10,
      salary: Math.round((52 + d * 6 + tenure * 3.2 + random() * 18) * 1000),
    };
  });
});
const all = staff.flat();
const averageScore = all.reduce((sum, e) => sum + e.score, 0) / all.length;

interface Selection {
  department: number;
  index: number;
}

export default function SelectionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<Selection | null>(null);

  // the selected dot is bigger and labelled (showLabels draws the points
  // that have a label)
  const series = useMemo(
    (): ChartSeries[] =>
      departments.map((key, d) => ({
        name: t(\`departments.\${key}\`),
        showLabels: true,
        opacity: 0.75,
        data: (staff[d] ?? []).map((e, i) =>
          selected?.department === d && selected.index === i
            ? { x: e.tenure, y: e.score, size: 16, label: e.id }
            : { x: e.tenure, y: e.score },
        ),
      })),
    [t, selected],
  );
  const years = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "year",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const decimal = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const employee = selected
    ? staff[selected.department]?.[selected.index]
    : undefined;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        xAxis={{ title: t("tenure"), format: (value) => years.format(value) }}
        yAxis={{ title: t("reviewScore"), min: 1, max: 5 }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: averageScore,
            dash: [4, 4],
            label: t("companyAverage"),
          },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setSelected({ department: item.seriesIndex, index: item.index });
        }}
        // a click on the empty plot clears the selection
        onPlotClick={() => setSelected(null)}
        height={320}
        ariaLabel={t("staffAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {employee && selected
          ? t("employeeStatus", {
              id: employee.id,
              department: t(\`departments.\${departments[selected.department]}\`),
              tenure: years.format(employee.tenure),
              score: decimal.format(employee.score),
              salary: usd.format(employee.salary),
            })
          : t("employeeHint")}
      </output>
    </div>
  );
}
`})))()}var Ot;function kt(){return(kt=e((()=>{Ot=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Weekly ad spend against revenue (thousand USD) for 60 campaigns
const random = mulberry32(42);
const campaigns = Array.from({ length: 60 }, () => {
  const spend = 2 + random() * 28;
  return [spend, 15 + spend * 3.1 + (random() - 0.5) * 30] as const;
});

// Least-squares fit y = a + b·x and the coefficient of determination
const n = campaigns.length;
const meanX = campaigns.reduce((sum, [x]) => sum + x, 0) / n;
const meanY = campaigns.reduce((sum, [, y]) => sum + y, 0) / n;
const sxy = campaigns.reduce((s, [x, y]) => s + (x - meanX) * (y - meanY), 0);
const sxx = campaigns.reduce((s, [x]) => s + (x - meanX) ** 2, 0);
const syy = campaigns.reduce((s, [, y]) => s + (y - meanY) ** 2, 0);
const slope = sxy / sxx;
const intercept = meanY - slope * meanX;
const r2 = (sxy * sxy) / (sxx * syy);
const top = Math.max(...campaigns.map(([, y]) => y));

export default function TrendDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("campaigns"), data: campaigns, opacity: 0.75 },
      {
        name: t("trend"),
        type: "line",
        lineWidth: 2,
        color: "var(--danger-color)",
        data: [
          [0, intercept],
          [32, intercept + slope * 32],
        ],
      },
    ],
    [t],
  );
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("adSpend"), min: 0, max: 32, format: usd }}
      yAxis={{ title: t("revenue"), format: usd }}
      annotations={[
        {
          type: "text",
          x: 1,
          y: top,
          anchor: "left",
          text: t("fit", {
            r2: decimal.format(r2),
            slope: decimal.format(slope),
          }),
        },
      ]}
      height={320}
      ariaLabel={t("trendAria")}
    />
  );
}
`})))()}var At;function jt(){return(jt=e((()=>{At=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  ScatterChart,
  type ChartHandle,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 900 readings of greenhouse sensors: temperature (°C) and relative humidity
// (%), in three regimes: cool humid nights, mild days, hot dry afternoons
const random = mulberry32(64);
const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
const readings = Array.from({ length: 900 }, (_, i) => {
  const [temp, humidity] =
    i % 9 === 0 ? [33, 38] : i % 3 === 0 ? [15, 84] : [23, 63];
  const t = temp + gaussian() * 2.2;
  const h = humidity - (t - temp) * 2 + gaussian() * 5;
  return [
    Math.round(t * 10) / 10,
    Math.round(Math.min(100, Math.max(5, h)) * 10) / 10,
  ] as const;
});

// the growing range of the crop
const COMFORT = { x0: 18, x1: 28, y0: 50, y1: 75 };

const PRESETS = {
  night: { x: [8, 22], y: [65, 100] },
  comfort: { x: [16, 30], y: [45, 80] },
  heat: { x: [26, 42], y: [15, 60] },
} satisfies Record<string, ChartView>;
type Preset = keyof typeof PRESETS;

export default function ZoomControlsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [view, setView] = useState<ChartView | null>(null);

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("readings"), data: readings, pointSize: 5, opacity: 0.55 },
    ],
    [t],
  );
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  // setView does not call onZoom: read the view back from the handle
  const zoomTo = (preset: Preset) => {
    chart.current?.setView(PRESETS[preset]);
    setView(chart.current?.getView() ?? PRESETS[preset]);
  };
  const inView = view
    ? readings.filter(
        ([x, y]) =>
          x >= view.x[0] && x <= view.x[1] && y >= view.y[0] && y <= view.y[1],
      ).length
    : readings.length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(PRESETS) as Preset[]).map((preset) => (
          <Button
            key={preset}
            size="small"
            variant="outline"
            onClick={() => zoomTo(preset)}
          >
            {t(\`zoomPresets.\${preset}\`)}
          </Button>
        ))}
        <Button
          size="small"
          variant="ghost"
          onClick={() => chart.current?.resetZoom()}
        >
          {t("showAll")}
        </Button>
      </div>
      <ScatterChart
        ref={chart}
        series={series}
        xAxis={{
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        yAxis={{
          title: t("humidity"),
          format: (value) => percent.format(value / 100),
        }}
        annotations={[
          {
            type: "rect",
            ...COMFORT,
            color: "var(--success-color)",
            opacity: 0.1,
            label: t("growingRange"),
          },
        ]}
        onZoom={setView}
        height={320}
        ariaLabel={t("greenhouseAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {view
          ? t("greenhouseView", {
              t0: celsius.format(view.x[0]),
              t1: celsius.format(view.x[1]),
              h0: percent.format(view.y[0] / 100),
              h1: percent.format(view.y[1] / 100),
              points: new Intl.NumberFormat(locale).format(inView),
            })
          : t("greenhouseHint")}
      </output>
    </div>
  );
}
`})))()}var Mt,Nt,Pt;function Ft(){return(Ft=e((()=>{ae(),pe(),_e(),be(),we(),Me(),Re(),Ve(),Ge(),rt(),lt(),dt(),pt(),ht(),_t(),yt(),xt(),Ct(),Tt(),Dt(),kt(),jt(),t(),c(),u(),Mt=n(),Nt=s(Object.assign({"./demos/basic.tsx":m,"./demos/categories.tsx":se,"./demos/labels.tsx":me,"./demos/large-data.tsx":ye,"./demos/live-stream.tsx":Se,"./demos/log-log.tsx":Te,"./demos/outliers.tsx":Pe,"./demos/players.tsx":ze,"./demos/selection.tsx":Ue,"./demos/trend.tsx":qe,"./demos/zoom-controls.tsx":at}),Object.assign({"./demos/basic.tsx":ut,"./demos/categories.tsx":ft,"./demos/labels.tsx":mt,"./demos/large-data.tsx":gt,"./demos/live-stream.tsx":vt,"./demos/log-log.tsx":bt,"./demos/outliers.tsx":St,"./demos/players.tsx":wt,"./demos/selection.tsx":Et,"./demos/trend.tsx":Ot,"./demos/zoom-controls.tsx":At})),Pt=()=>(0,Mt.jsx)(l,{id:`scatter-chart`,demos:Nt})})))()}Ft();export{Pt as default};