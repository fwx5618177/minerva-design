import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{l as d,n as ee,t as te,u as ne}from"./DocPage-4JD4uRu8.js";import{l as f,m as p,r as re}from"./charts-BHPM8b2-.js";import{a as m,c as h,i as ie,l as g,n as ae,r as oe,s as _,t as v}from"./data-OJRIyQ69.js";function se(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,ce.jsx)(h,{bars:le,timeframe:`1D`,symbol:e(`catl`),colorConvention:`redUp`,indicators:[{type:`ma`,period:5},{type:`ma`,period:10},{type:`ma`,period:20},{type:`ma`,period:60},{type:`volume`,maPeriod:5,height:90},{type:`macd`,height:110}],ariaLabel:e(`aShareAria`),height:540})}var ce,le;function ue(){return(ue=e((()=>{i(),g(),_(),ce=n(),le=m({count:240,timeframe:v,seed:300750,price:186,volatility:.019,volume:26e6,market:`stock`})})))()}function de(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,y.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`,gap:12,width:`100%`},children:pe.map(t=>(0,y.jsxs)(`figure`,{style:{margin:0,display:`grid`,gap:6},children:[(0,y.jsx)(h,{bars:fe,timeframe:`1D`,chartStyle:t,legend:!1,highLowMarkers:!1,barSpacing:7,rightOffset:2,ariaLabel:e(`styleAria.${t}`),height:240}),(0,y.jsxs)(`figcaption`,{style:{fontSize:13},children:[(0,y.jsx)(`strong`,{children:e(`styleNames.${t}`)}),(0,y.jsxs)(`span`,{style:{color:`var(--text-secondary-color)`},children:[` · `,e(`styleHints.${t}`)]})]})]},t))})}var y,fe,pe;function me(){return(me=e((()=>{i(),g(),_(),y=n(),fe=m({count:70,timeframe:v,seed:128,price:96,volatility:.02,volume:1e6,market:`stock`}),pe=[`bars`,`candles`,`hollowCandles`]})))()}function he(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ge(e,t,n,r){let i=he(e),a=[],o=n;for(let e=Date.UTC(2026,2,2);a.length<t;e+=ve){if(new Date(e).getUTCDay()%6==0)continue;let t=o*(1+(i()-.5)*.012);o=t*(1+(i()+i()-1)*.035+.001);let n=Math.max(t,o)*(1+i()*.012),s=Math.min(t,o)*(1-i()*.012);a.push({x:r.format(e),open:t,high:n,low:s,y:o})}return a}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,a]=(0,b.useState)(`green-up`),o=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),c=(0,b.useMemo)(()=>ge(42,60,182,new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`})),[n]),l=(0,b.useMemo)(()=>[{name:`ACME`,data:c,...i===`red-up`?{upColor:`var(--danger-color)`,downColor:`var(--success-color)`}:{}}],[c,i]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsxs)(s,{"aria-label":e(`candleColors`),direction:`horizontal`,value:i,onChange:e=>a(String(e)),children:[(0,x.jsx)(u,{value:`green-up`,label:e(`greenUp`)}),(0,x.jsx)(u,{value:`red-up`,label:e(`redUp`)})]}),(0,x.jsx)(f,{series:l,yAxis:{format:e=>o.format(e)},renderTooltip:t=>{let n=t.items[0];if(!n||n.open===void 0)return null;let r=[[e(`open`),n.open],[e(`high`),n.high??n.y],[e(`low`),n.low??n.y],[e(`close`),n.y]];return(0,x.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,x.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),r.map(([e,t])=>(0,x.jsxs)(`span`,{style:{display:`contents`},children:[(0,x.jsx)(`span`,{children:e}),(0,x.jsx)(`span`,{style:{textAlign:`end`},children:o.format(t)})]},e))]})},height:320,ariaLabel:e(`acmeAria`)})]})}var b,x,ve;function ye(){return(ye=e((()=>{b=t(),i(),c(),l(),p(),x=n(),ve=864e5})))()}function be(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,S.jsx)(`div`,{style:Se,children:(0,S.jsx)(h,{bars:xe,timeframe:`30m`,symbol:e(`nasdaq`),chartStyle:`hollowCandles`,indicators:[{type:`ema`,period:21,color:`#7c8cff`},{type:`volume`,overlay:!0}],watermark:e(`nasdaq`),ariaLabel:e(`darkAria`),height:420})})}var S,xe,Se;function Ce(){return(Ce=e((()=>{i(),g(),_(),S=n(),xe=m({count:300,timeframe:30*oe,seed:1999,price:18420,volatility:.0032,volume:3200},1),Se={"--background-color":`#0f1424`,"--surface-color":`#0f1424`,"--surface-elevated-color":`#1a2136`,"--text-color":`#dbe1f1`,"--text-secondary-color":`#7d87a3`,"--border-color":`#242c44`,"--success-color":`#26c6da`,"--danger-color":`#ff5c8a`,"--warning-color":`#ffb74d`,"--primary-color":`#7c8cff`,color:`#dbe1f1`,background:`#0f1424`,border:`1px solid #242c44`,borderRadius:12,overflow:`hidden`,width:`100%`}})))()}function we(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),t=(0,Te.useMemo)(()=>Ee.map(([t,n])=>({id:`${n}-${t}`,time:w[t].time,side:n===`guidance`?`buy`:`sell`,color:T[n],text:e(`events.${n}`)})),[e]);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:10,width:`100%`},children:[(0,C.jsx)(h,{bars:w,timeframe:`1D`,symbol:e(`orbt`),markers:t,indicators:[{type:`ma`,period:50}],ariaLabel:e(`eventsAria`),height:420}),(0,C.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,fontSize:13,color:`var(--text-secondary-color)`},children:Object.keys(T).map(t=>(0,C.jsxs)(`span`,{style:{display:`inline-flex`,gap:6},children:[(0,C.jsx)(`span`,{"aria-hidden":`true`,style:{width:10,height:10,marginTop:4,borderRadius:2,background:T[t]}}),e(`eventNames.${t}`)]},t))})]})}var Te,C,w,Ee,T;function De(){return(De=e((()=>{Te=t(),i(),g(),_(),C=n(),w=m({count:260,timeframe:v,seed:2026,price:182,volatility:.015,volume:5e7,market:`stock`}),Ee=[[38,`earnings`],[64,`dividend`],[101,`earnings`],[128,`dividend`],[150,`split`],[164,`earnings`],[192,`dividend`],[226,`earnings`],[240,`guidance`]],T={earnings:`var(--primary-color)`,dividend:`#a855f7`,split:`var(--warning-color)`,guidance:`var(--danger-color)`}})))()}function Oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,E.useMemo)(()=>[{name:`ORBT`,data:M},{name:e(`vwap`),type:`line`,data:N,lineWidth:1.5,color:`var(--warning-color)`}],[e]),a=(0,E.useMemo)(()=>[{type:`line`,axis:`x`,value:A,dash:[4,4],color:`var(--danger-color)`,label:e(`guidanceCut`)}],[e]),o=(0,E.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,timeZone:`America/New_York`}),[n]),s=(0,E.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]);return(0,D.jsx)(f,{series:i,annotations:a,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>s.format(e)},renderTooltip:t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,s.format(r.y)]):n.push([e(`open`),s.format(r.open)],[e(`high`),s.format(r.high??r.y)],[e(`low`),s.format(r.low??r.y)],[e(`close`),s.format(r.y)]);return(0,D.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,D.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:o.format(t.x)}),n.map(([e,t])=>(0,D.jsxs)(`span`,{style:{display:`contents`},children:[(0,D.jsx)(`span`,{children:e}),(0,D.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},height:340,ariaLabel:e(`intradayAria`)})}var E,D,O,k,A,j,M,N,P,F,I;function Ae(){return(Ae=e((()=>{E=t(),i(),p(),D=n(),O=6e4,k=Date.UTC(2026,9,29,13,30),A=k+150*O,j=Oe(23),M=[],N=[],P=212,F=0,I=0;for(let e=0;e<78;e++){let t=k+e*5*O,n=t===A?-.025:0,r=P,i=r*(1+(j()+j()-1)*.004+n),a=Math.max(r,i)*(1+j()*.002),o=Math.min(r,i)*(1-j()*.002),s=1+3*Math.exp(-e/6)+2*Math.exp((e-77)/6)+(t>=A&&t<A+30*O?3:0);F+=s,I+=s*((a+o+i)/3),M.push({x:t,open:r,high:a,low:o,y:i}),N.push([t,I/F]),P=i}})))()}function je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,a]=(0,L.useState)(null),o=(0,L.useMemo)(()=>{let e=je(50),t=new Float64Array(z),n=new Float64Array(z),r=new Float64Array(z),i=new Float64Array(z),a=new Float64Array(z),o=3200,s=.0012;for(let c=0;c<z;c++){s=Math.min(.004,Math.max(5e-4,s*(1+(e()-.5)*.1)));let l=o,u=l*(1+(e()+e()-1)*s);t[c]=Pe+c*Ne,n[c]=l,a[c]=u,r[c]=Math.max(l,u)*(1+e()*s*.6),i[c]=Math.min(l,u)*(1-e()*s*.6),o=u}return[{name:`ETH / USD`,data:{x:t,open:n,high:r,low:i,y:a}}]},[]),s=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}),[n]),c=(0,L.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}),[n]);return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,R.jsx)(f,{series:o,xAxis:{type:`time`},yAxis:{format:e=>s.format(e)},renderTooltip:t=>{let n=t.items[0];if(!n||n.open===void 0)return null;let r=[[e(`open`),n.open],[e(`high`),n.high??n.y],[e(`low`),n.low??n.y],[e(`close`),n.y]];return(0,R.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,R.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:c.format(n.x)}),r.map(([e,t])=>(0,R.jsxs)(`span`,{style:{display:`contents`},children:[(0,R.jsx)(`span`,{children:e}),(0,R.jsx)(`span`,{style:{textAlign:`end`},children:s.format(t)})]},e))]})},onRendererChange:a,height:340,ariaLabel:e(`candlesAria`)}),(0,R.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{candles:new Intl.NumberFormat(n).format(z),renderer:i??`…`})})]})}var L,R,z,Ne,Pe;function Fe(){return(Fe=e((()=>{L=t(),i(),p(),R=n(),z=5e4,Ne=6e4,Pe=new Date(2026,4,1).getTime()})))()}function Ie(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),t=(0,B.useRef)(null),[n]=(0,B.useState)(Le),[i,a]=(0,B.useState)(!0);return(0,B.useEffect)(()=>{if(!i)return;let e=t.current?.getBarCount()??0,r=t.current?.getBar(e-1)??{...n[n.length-1]},a=ie(Date.now()%997,r.close,2e-4),o=setInterval(()=>{let e=a(),n=Math.floor(Date.now()/H)*H,i=Math.round(e.price*1e4)/1e4,o=e.size*4e3;r=n===r.time?{...r,high:Math.max(r.high,i),low:Math.min(r.low,i),close:i,volume:(r.volume??0)+o}:{time:n,open:r.close,high:i,low:i,close:i,volume:o},t.current?.update(r)},100);return()=>clearInterval(o)},[i,n]),(0,V.jsxs)(`div`,{style:{display:`grid`,gap:10,width:`100%`},children:[(0,V.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,V.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>a(e=>!e),children:e(i?`pause`:`resume`)}),(0,V.jsx)(`span`,{role:`status`,style:{fontSize:13,color:`var(--text-secondary-color)`},children:e(i?`liveStatus`:`livePaused`)})]}),(0,V.jsx)(h,{ref:t,bars:n,timeframe:H,symbol:e(`ada`),labels:{timeframe:e(`fiveSeconds`)},countdown:!0,indicators:[{type:`volume`,overlay:!0}],barSpacing:9,ariaLabel:e(`liveAria`),height:380})]})}var B,V,H,Le;function Re(){return(Re=e((()=>{B=t(),i(),a(),g(),_(),V=n(),H=5e3,Le=()=>{let e=Math.floor(Date.now()/H)*H;return m({count:240,timeframe:H,seed:99,price:.6245,volatility:6e-4,volume:14e3,start:e-239*H},4)}})))()}function ze(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,Be.jsx)(h,{bars:Ve,timeframe:`4H`,symbol:e(`eth`),indicators:He,ariaLabel:e(`ribbonAria`),height:440})}var Be,Ve,He;function Ue(){return(Ue=e((()=>{i(),g(),_(),Be=n(),Ve=m({count:360,timeframe:4*ae,seed:3141,price:2480,volatility:.008,volume:900}),He=[`#f97316`,`#f59e0b`,`#eab308`,`#84cc16`,`#22c55e`,`#14b8a6`,`#0ea5e9`,`#6366f1`].map((e,t)=>({type:`ema`,period:10+t*10,color:e,lineWidth:1.25}))})))()}function We(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ge(e,t,n,r){let i=We(e),a=[],o=n;for(let e=Date.UTC(2026,0,5);a.length<t;e+=qe){if(new Date(e).getUTCDay()%6==0)continue;let t=a.length,n=t<50?.004:t<80?-.005:.003,s=o*(1+(i()-.5)*.012);o=s*(1+(i()+i()-1)*.032+n);let c=Math.max(s,o)*(1+i()*.014),l=Math.min(s,o)*(1-i()*.014);a.push({x:r.format(e),open:s,high:c,low:l,y:o})}return a}function Ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,U.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),a=(0,U.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`exceptZero`}),[n]),o=(0,U.useMemo)(()=>{let t=Ge(7,120,64,new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`}));return[{name:`NOVA`,data:t},{name:e(`ma`,{days:5}),type:`line`,data:G(t,5),curve:`smooth`,lineWidth:1.5,color:`var(--warning-color)`},{name:e(`ma`,{days:20}),type:`line`,data:G(t,20),curve:`smooth`,lineWidth:2,color:`var(--primary-color)`}]},[e,n]);return(0,W.jsx)(f,{series:o,yAxis:{format:e=>i.format(e)},renderTooltip:t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,i.format(r.y)]):n.push([e(`open`),i.format(r.open)],[e(`high`),i.format(r.high??r.y)],[e(`low`),i.format(r.low??r.y)],[e(`close`),i.format(r.y)],[e(`change`),a.format(r.y/r.open-1)]);return(0,W.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,W.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),n.map(([e,t])=>(0,W.jsxs)(`span`,{style:{display:`contents`},children:[(0,W.jsx)(`span`,{children:e}),(0,W.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},height:360,ariaLabel:e(`novaAria`)})}var U,W,qe,G;function Je(){return(Je=e((()=>{U=t(),i(),p(),W=n(),qe=864e5,G=(e,t)=>e.map((n,r)=>{if(r<t-1)return[n.x,null];let i=0;for(let n=r-t+1;n<=r;n++)i+=e[n].y;return[n.x,i/t]})})))()}function Ye(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),[t,n]=(0,Xe.useState)(`pane`);return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(s,{label:e(`volumeLayout`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[(0,K.jsx)(u,{value:`pane`,label:e(`volumePane`)}),(0,K.jsx)(u,{value:`overlay`,label:e(`volumeOverlay`)})]}),(0,K.jsx)(h,{bars:Ze,timeframe:`1H`,symbol:e(`btc`),indicators:[{type:`volume`,maPeriod:20,overlay:t===`overlay`,height:110}],ariaLabel:e(`volumeColorsAria`),height:420})]})}var Xe,K,Ze;function Qe(){return(Qe=e((()=>{Xe=t(),i(),c(),l(),g(),_(),K=n(),Ze=m({count:240,timeframe:ae,seed:4096,price:63200,volatility:.0045,volume:260})})))()}function $e(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function et(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,q.useRef)(null),a=(0,q.useRef)(null),{candles:o,bars:s}=(0,q.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`});return{candles:[{name:`ORBT`,data:X.map(e=>({x:t.format(e.time),open:e.open,high:e.high,low:e.low,y:e.close}))}],bars:[{name:e(`volume`),data:X.map(e=>({x:t.format(e.time),y:e.volume,color:e.close>=e.open?`var(--success-color)`:`var(--danger-color)`}))}]}},[e,n]),c=(0,q.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),l=(0,q.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),u=t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,c.format(r.y)]):n.push([e(`open`),c.format(r.open)],[e(`high`),c.format(r.high??r.y)],[e(`low`),c.format(r.low??r.y)],[e(`close`),c.format(r.y)]);return(0,J.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,J.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),n.map(([e,t])=>(0,J.jsxs)(`span`,{style:{display:`contents`},children:[(0,J.jsx)(`span`,{children:e}),(0,J.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},[d,ee]=(0,q.useState)({prices:0,volumes:0});return(0,q.useEffect)(()=>{let e=i.current?.getInstance(),t=a.current?.getInstance();if(!e||!t)return;let n=()=>{let n=e.getPlotRect(),r=t.getPlotRect();n&&r&&ee(e=>{let t=n.x-e.prices,i=r.x-e.volumes,a=Math.max(t,i),o={prices:a-t,volumes:a-i};return o.prices===e.prices&&o.volumes===e.volumes?e:o})},r=[e.on(`layout`,n),t.on(`layout`,n)];return n(),()=>r.forEach(e=>e())},[]),(0,J.jsxs)(`div`,{style:{display:`grid`,gap:0,width:`100%`},children:[(0,J.jsx)(f,{ref:i,series:o,yAxis:{format:e=>c.format(e)},xAxis:{visible:!1},renderTooltip:u,onZoom:e=>a.current?.setView({x:e.x}),legend:!1,padding:{left:4+d.prices},height:260,ariaLabel:e(`pricesAria`)}),(0,J.jsx)(re,{ref:a,series:s,yAxis:{format:e=>l.format(e),tickCount:2},onZoom:e=>i.current?.setView({x:e.x}),legend:!1,padding:{left:4+d.volumes},height:120,ariaLabel:e(`volumeAria`)})]})}var q,J,tt,Y,X,Z;function nt(){return(nt=e((()=>{q=t(),i(),p(),J=n(),tt=864e5,Y=$e(19),X=[],Z=48;for(let e=Date.UTC(2026,5,1);X.length<90;e+=tt){if(new Date(e).getUTCDay()%6==0)continue;let t=Z*(1+(Y()-.5)*.01),n=(Y()+Y()-1)*.04,r=t*(1+n),i=Math.max(t,r)*(1+Y()*.015),a=Math.min(t,r)*(1-Y()*.015),o=Math.round(2e6*(.6+Y()*.6+Math.abs(n)*25));X.push({time:e,open:t,high:i,low:a,close:r,volume:o}),Z=r}})))()}var rt;function it(){return(it=e((()=>{rt=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 240,
  timeframe: DAY,
  seed: 300_750,
  price: 186,
  volatility: 0.019,
  volume: 2.6e7,
  market: "stock",
});

export default function AShareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  // the defaults of Chinese terminals: MA 5 / 10 / 20 / 60, volume and MACD
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("catl")}
      colorConvention="redUp"
      indicators={[
        { type: "ma", period: 5 },
        { type: "ma", period: 10 },
        { type: "ma", period: 20 },
        { type: "ma", period: 60 },
        { type: "volume", maPeriod: 5, height: 90 },
        { type: "macd", height: 110 },
      ]}
      ariaLabel={t("aShareAria")}
      height={540}
    />
  );
}
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useTranslation } from "react-i18next";
import { TradingChart, type TradingChartStyle } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 70,
  timeframe: DAY,
  seed: 128,
  price: 96,
  volatility: 0.02,
  volume: 1e6,
  market: "stock",
});

const STYLES: TradingChartStyle[] = ["bars", "candles", "hollowCandles"];

export default function BarStylesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 12,
        width: "100%",
      }}
    >
      {STYLES.map((style) => (
        <figure key={style} style={{ margin: 0, display: "grid", gap: 6 }}>
          <TradingChart
            bars={bars}
            timeframe="1D"
            chartStyle={style}
            legend={false}
            highLowMarkers={false}
            barSpacing={7}
            rightOffset={2}
            ariaLabel={t(\`styleAria.\${style}\`)}
            height={240}
          />
          <figcaption style={{ fontSize: 13 }}>
            <strong>{t(\`styleNames.\${style}\`)}</strong>
            <span style={{ color: "var(--text-secondary-color)" }}>
              {" · "}
              {t(\`styleHints.\${style}\`)}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  CandlestickChart,
  type ChartHoverEvent,
  type ChartPointDatum,
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

const DAY = 24 * 60 * 60 * 1000;

/** Daily candles on trading days (weekends skipped), labelled with \`date\` */
function dailyCandles(
  seed: number,
  count: number,
  price: number,
  date: Intl.DateTimeFormat,
) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 2, 2); candles.length < count; t += DAY) {
    if (new Date(t).getUTCDay() % 6 === 0) continue;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.035 + 0.001);
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    candles.push({ x: date.format(t), open, high, low, y: close });
  }
  return candles;
}

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [convention, setConvention] = useState("green-up");

  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const candles = useMemo(() => {
    // "Mar 3", "3月3日", "3 mars"...
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return dailyCandles(42, 60, 182, date);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: "ACME",
        data: candles,
        // the defaults are --success-color up and --danger-color down
        ...(convention === "red-up"
          ? {
              upColor: "var(--danger-color)",
              downColor: "var(--success-color)",
            }
          : {}),
      },
    ],
    [candles, convention],
  );

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item || item.open === undefined) return null;
    const rows = [
      [t("open"), item.open],
      [t("high"), item.high ?? item.y],
      [t("low"), item.low ?? item.y],
      [t("close"), item.y],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{usd.format(value)}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("candleColors")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(String(value))}
      >
        <Radio value="green-up" label={t("greenUp")} />
        <Radio value="red-up" label={t("redUp")} />
      </RadioGroup>
      <CandlestickChart
        series={series}
        yAxis={{ format: (value) => usd.format(value) }}
        renderTooltip={tooltip}
        height={320}
        ariaLabel={t("acmeAria")}
      />
    </div>
  );
}
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { MINUTE, generateBars } from "../../trading-chart/data";

const bars = generateBars(
  {
    count: 300,
    timeframe: 30 * MINUTE,
    seed: 1_999,
    price: 18_420,
    volatility: 0.0032,
    volume: 3_200,
  },
  1,
);

// a night palette: the chart reads its colors from these CSS variables
const night = {
  "--background-color": "#0f1424",
  "--surface-color": "#0f1424",
  "--surface-elevated-color": "#1a2136",
  "--text-color": "#dbe1f1",
  "--text-secondary-color": "#7d87a3",
  "--border-color": "#242c44",
  "--success-color": "#26c6da",
  "--danger-color": "#ff5c8a",
  "--warning-color": "#ffb74d",
  "--primary-color": "#7c8cff",
  color: "#dbe1f1",
  background: "#0f1424",
  border: "1px solid #242c44",
  borderRadius: 12,
  overflow: "hidden",
  width: "100%",
} as React.CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  return (
    <div style={night}>
      <TradingChart
        bars={bars}
        timeframe="30m"
        symbol={t("nasdaq")}
        chartStyle="hollowCandles"
        indicators={[
          { type: "ema", period: 21, color: "#7c8cff" },
          { type: "volume", overlay: true },
        ]}
        watermark={t("nasdaq")}
        ariaLabel={t("darkAria")}
        height={420}
      />
    </div>
  );
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart, type TradingMarker } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 260,
  timeframe: DAY,
  seed: 2_026,
  price: 182,
  volatility: 0.015,
  volume: 5e7,
  market: "stock",
});

/** Corporate events: bar index, kind */
const EVENTS: [number, "earnings" | "dividend" | "split" | "guidance"][] = [
  [38, "earnings"],
  [64, "dividend"],
  [101, "earnings"],
  [128, "dividend"],
  [150, "split"],
  [164, "earnings"],
  [192, "dividend"],
  [226, "earnings"],
  [240, "guidance"],
];

const COLORS = {
  earnings: "var(--primary-color)",
  dividend: "#a855f7",
  split: "var(--warning-color)",
  guidance: "var(--danger-color)",
};

export default function EventsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const markers = useMemo(
    (): TradingMarker[] =>
      EVENTS.map(([index, kind]) => ({
        id: \`\${kind}-\${index}\`,
        time: bars[index].time,
        // events above the bars, the cut guidance below
        side: kind === "guidance" ? "buy" : "sell",
        color: COLORS[kind],
        text: t(\`events.\${kind}\`),
      })),
    [t],
  );
  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("orbt")}
        markers={markers}
        indicators={[{ type: "ma", period: 50 }]}
        ariaLabel={t("eventsAria")}
        height={420}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        {(Object.keys(COLORS) as (keyof typeof COLORS)[]).map((kind) => (
          <span key={kind} style={{ display: "inline-flex", gap: 6 }}>
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                marginTop: 4,
                borderRadius: 2,
                background: COLORS[kind],
              }}
            />
            {t(\`eventNames.\${kind}\`)}
          </span>
        ))}
      </div>
    </div>
  );
}
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartAnnotation,
  type ChartHoverEvent,
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

const MINUTE = 60 * 1000;
// one session, 09:30 to 16:00 New York time, written in UTC
const OPEN = Date.UTC(2026, 9, 29, 13, 30);
const NEWS = OPEN + 150 * MINUTE;

// 5-minute candles and the volume-weighted average price (VWAP)
const random = mulberry32(23);
const candles: {
  x: number;
  open: number;
  high: number;
  low: number;
  y: number;
}[] = [];
const vwap: [number, number][] = [];
let price = 212;
let volumeSum = 0;
let valueSum = 0;
for (let i = 0; i < 78; i++) {
  const time = OPEN + i * 5 * MINUTE;
  const shock = time === NEWS ? -0.025 : 0;
  const open = price;
  const close = open * (1 + (random() + random() - 1) * 0.004 + shock);
  const high = Math.max(open, close) * (1 + random() * 0.002);
  const low = Math.min(open, close) * (1 - random() * 0.002);
  // more volume at the open, the close and after the news
  const volume =
    1 +
    3 * Math.exp(-i / 6) +
    2 * Math.exp((i - 77) / 6) +
    (time >= NEWS && time < NEWS + 30 * MINUTE ? 3 : 0);
  volumeSum += volume;
  valueSum += volume * ((high + low + close) / 3);
  candles.push({ x: time, open, high, low, y: close });
  vwap.push([time, valueSum / volumeSum]);
  price = close;
}

export default function IntradayDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: "ORBT", data: candles },
      {
        name: t("vwap"),
        type: "line",
        data: vwap,
        lineWidth: 1.5,
        color: "var(--warning-color)",
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "x",
        value: NEWS,
        dash: [4, 4],
        color: "var(--danger-color)",
        label: t("guidanceCut"),
      },
    ],
    [t],
  );
  // the exchange's local time, in the reader's language
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
      }),
    [locale],
  );
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{time.format(event.x)}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <CandlestickChart
      series={series}
      annotations={annotations}
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ format: (value) => usd.format(value) }}
      renderTooltip={tooltip}
      height={340}
      ariaLabel={t("intradayAria")}
    />
  );
}
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartHoverEvent,
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

const COUNT = 50_000;
const MINUTE = 60 * 1000;
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 4, 1).getTime();

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // One-minute candles of a market that never closes, as typed-array columns
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(50);
    const x = new Float64Array(COUNT);
    const open = new Float64Array(COUNT);
    const high = new Float64Array(COUNT);
    const low = new Float64Array(COUNT);
    const close = new Float64Array(COUNT);
    let price = 3200;
    let volatility = 0.0012;
    for (let i = 0; i < COUNT; i++) {
      // calm and busy periods alternate
      volatility = Math.min(
        0.004,
        Math.max(0.0005, volatility * (1 + (random() - 0.5) * 0.1)),
      );
      const o = price;
      const c = o * (1 + (random() + random() - 1) * volatility);
      x[i] = START + i * MINUTE;
      open[i] = o;
      close[i] = c;
      high[i] = Math.max(o, c) * (1 + random() * volatility * 0.6);
      low[i] = Math.min(o, c) * (1 - random() * volatility * 0.6);
      price = c;
    }
    return [
      {
        name: "ETH / USD",
        data: { x, open, high, low, y: close },
      },
    ];
  }, []);

  const price = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale],
  );
  // OHLC tooltip in the reader's language, with the full date and time
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item || item.open === undefined) return null;
    const rows = [
      [t("open"), item.open],
      [t("high"), item.high ?? item.y],
      [t("low"), item.low ?? item.y],
      [t("close"), item.y],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{time.format(item.x)}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{price.format(value)}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CandlestickChart
        series={series}
        xAxis={{ type: "time" }}
        yAxis={{ format: (value) => price.format(value) }}
        renderTooltip={tooltip}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel={t("candlesAria")}
      />
      <p role="status">
        {t("largeStatus", {
          candles: new Intl.NumberFormat(locale).format(COUNT),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/charts";
import { createTradeFeed, generateBars } from "../../trading-chart/data";

const SECOND = 1000;
const FRAME = 5 * SECOND; // 5-second candles

/** 240 five-second candles ending now */
const history = () => {
  const now = Math.floor(Date.now() / FRAME) * FRAME;
  return generateBars(
    {
      count: 240,
      timeframe: FRAME,
      seed: 99,
      price: 0.6245,
      volatility: 0.0006,
      volume: 1.4e4,
      start: now - 239 * FRAME,
    },
    4,
  );
};

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [bars] = useState(history);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const count = chart.current?.getBarCount() ?? 0;
    let bar: TradingBar = chart.current?.getBar(count - 1) ?? {
      ...bars[bars.length - 1],
    };
    const next = createTradeFeed(Date.now() % 997, bar.close, 0.0002);
    // ten trades a second
    const feed = setInterval(() => {
      const trade = next();
      const time = Math.floor(Date.now() / FRAME) * FRAME;
      const price = Math.round(trade.price * 1e4) / 1e4;
      const volume = trade.size * 4e3;
      bar =
        time === bar.time
          ? {
              ...bar,
              high: Math.max(bar.high, price),
              low: Math.min(bar.low, price),
              close: price,
              volume: (bar.volume ?? 0) + volume,
            }
          : {
              time,
              open: bar.close,
              high: price,
              low: price,
              close: price,
              volume,
            };
      chart.current?.update(bar);
    }, 100);
    return () => clearInterval(feed);
  }, [running, bars]);

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <span
          role="status"
          style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
        >
          {running ? t("liveStatus") : t("livePaused")}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe={FRAME}
        symbol={t("ada")}
        labels={{ timeframe: t("fiveSeconds") }}
        countdown
        indicators={[{ type: "volume", overlay: true }]}
        barSpacing={9}
        ariaLabel={t("liveAria")}
        height={380}
      />
    </div>
  );
}
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useTranslation } from "react-i18next";
import { TradingChart, type TradingIndicator } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 360,
  timeframe: 4 * HOUR,
  seed: 3_141,
  price: 2_480,
  volatility: 0.008,
  volume: 900,
});

// eight exponential averages, warm (fast) to cool (slow)
const RIBBON = [
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#14b8a6",
  "#0ea5e9",
  "#6366f1",
];
const indicators: TradingIndicator[] = RIBBON.map((color, i) => ({
  type: "ema",
  period: 10 + i * 10,
  color,
  lineWidth: 1.25,
}));

export default function MaRibbonDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="4H"
      symbol={t("eth")}
      indicators={indicators}
      ariaLabel={t("ribbonAria")}
      height={440}
    />
  );
}
`})))()}var Q;function xt(){return(xt=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartHoverEvent,
  type ChartPointDatum,
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

const DAY = 24 * 60 * 60 * 1000;

/** Daily candles on trading days (weekends skipped), labelled with \`date\` */
function dailyCandles(
  seed: number,
  count: number,
  price: number,
  date: Intl.DateTimeFormat,
) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 0, 5); candles.length < count; t += DAY) {
    if (new Date(t).getUTCDay() % 6 === 0) continue;
    // a slow regime change: rally, pullback, recovery
    const day = candles.length;
    const drift = day < 50 ? 0.004 : day < 80 ? -0.005 : 0.003;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.032 + drift);
    const high = Math.max(open, close) * (1 + random() * 0.014);
    const low = Math.min(open, close) * (1 - random() * 0.014);
    candles.push({ x: date.format(t), open, high, low, y: close });
  }
  return candles;
}

/** Simple moving average of the closes; \`null\` until the window is full */
const movingAverage = (candles: ChartPointDatum[], window: number) =>
  candles.map((candle, i) => {
    if (i < window - 1) return [candle.x as string, null] as const;
    let sum = 0;
    for (let k = i - window + 1; k <= i; k++) sum += candles[k].y as number;
    return [candle.x as string, sum / window] as const;
  });

export default function MovingAverageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;

  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const change = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );
  const series = useMemo((): ChartSeries[] => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    const candles = dailyCandles(7, 120, 64, date);
    return [
      { name: "NOVA", data: candles },
      {
        name: t("ma", { days: 5 }),
        type: "line",
        data: movingAverage(candles, 5),
        curve: "smooth",
        lineWidth: 1.5,
        color: "var(--warning-color)",
      },
      {
        name: t("ma", { days: 20 }),
        type: "line",
        data: movingAverage(candles, 20),
        curve: "smooth",
        lineWidth: 2,
        color: "var(--primary-color)",
      },
    ];
  }, [t, locale]);

  // OHLC values, the change of the day and the averages
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
          [t("change"), change.format(item.y / item.open - 1)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <CandlestickChart
      series={series}
      yAxis={{ format: (value) => usd.format(value) }}
      renderTooltip={tooltip}
      height={360}
      ariaLabel={t("novaAria")}
    />
  );
}
`})))()}var St;function Ct(){return(Ct=e((()=>{St=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 240,
  timeframe: HOUR,
  seed: 4_096,
  price: 63_200,
  volatility: 0.0045,
  volume: 260,
});

export default function VolumeColorsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const [layout, setLayout] = useState("pane");
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        label={t("volumeLayout")}
        direction="horizontal"
        value={layout}
        onChange={(value) => setLayout(String(value))}
      >
        <Radio value="pane" label={t("volumePane")} />
        <Radio value="overlay" label={t("volumeOverlay")} />
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("btc")}
        indicators={[
          {
            type: "volume",
            maPeriod: 20,
            overlay: layout === "overlay",
            height: 110,
          },
        ]}
        ariaLabel={t("volumeColorsAria")}
        height={420}
      />
    </div>
  );
}
`})))()}var wt;function Tt(){return(Tt=e((()=>{wt=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  CandlestickChart,
  type ChartHandle,
  type ChartHoverEvent,
  type ChartPointDatum,
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

const DAY = 24 * 60 * 60 * 1000;

// 90 trading days of prices and volumes (weekends skipped)
const random = mulberry32(19);
const days: {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}[] = [];
let last = 48;
for (let t = Date.UTC(2026, 5, 1); days.length < 90; t += DAY) {
  if (new Date(t).getUTCDay() % 6 === 0) continue;
  const open = last * (1 + (random() - 0.5) * 0.01);
  const move = (random() + random() - 1) * 0.04;
  const close = open * (1 + move);
  const high = Math.max(open, close) * (1 + random() * 0.015);
  const low = Math.min(open, close) * (1 - random() * 0.015);
  // big moves come with big volumes
  const volume = Math.round(2e6 * (0.6 + random() * 0.6 + Math.abs(move) * 25));
  days.push({ time: t, open, high, low, close, volume });
  last = close;
}

export default function VolumeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const prices = useRef<ChartHandle>(null);
  const volumes = useRef<ChartHandle>(null);

  const { candles, bars } = useMemo(() => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    const candles: ChartSeries[] = [
      {
        name: "ORBT",
        data: days.map((day): ChartPointDatum => ({
          x: date.format(day.time),
          open: day.open,
          high: day.high,
          low: day.low,
          y: day.close,
        })),
      },
    ];
    // each volume bar takes the color of its candle
    const bars: ChartSeries[] = [
      {
        name: t("volume"),
        data: days.map((day) => ({
          x: date.format(day.time),
          y: day.volume,
          color:
            day.close >= day.open
              ? "var(--success-color)"
              : "var(--danger-color)",
        })),
      },
    ];
    return { candles, bars };
  }, [t, locale]);
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  // The tick labels of the two y axes have different widths: pad the narrower
  // one so the plot areas (and the candles over their bars) line up
  const [shift, setShift] = useState({ prices: 0, volumes: 0 });
  useEffect(() => {
    const top = prices.current?.getInstance();
    const bottom = volumes.current?.getInstance();
    if (!top || !bottom) return;
    const align = () => {
      const a = top.getPlotRect();
      const b = bottom.getPlotRect();
      if (!a || !b) return;
      setShift((current) => {
        // where each plot would start without the extra padding
        const naturalTop = a.x - current.prices;
        const naturalBottom = b.x - current.volumes;
        const start = Math.max(naturalTop, naturalBottom);
        const next = {
          prices: start - naturalTop,
          volumes: start - naturalBottom,
        };
        return next.prices === current.prices &&
          next.volumes === current.volumes
          ? current
          : next;
      });
    };
    const offs = [top.on("layout", align), bottom.on("layout", align)];
    align();
    return () => offs.forEach((off) => off());
  }, []);

  return (
    <div style={{ display: "grid", gap: 0, width: "100%" }}>
      <CandlestickChart
        ref={prices}
        series={candles}
        yAxis={{ format: (value) => usd.format(value) }}
        xAxis={{ visible: false }}
        renderTooltip={tooltip}
        // both charts share the same categories: zooming one moves the other
        onZoom={(view) => volumes.current?.setView({ x: view.x })}
        legend={false}
        padding={{ left: 4 + shift.prices }}
        height={260}
        ariaLabel={t("pricesAria")}
      />
      <BarChart
        ref={volumes}
        series={bars}
        yAxis={{ format: (value) => compact.format(value), tickCount: 2 }}
        onZoom={(view) => prices.current?.setView({ x: view.x })}
        legend={false}
        padding={{ left: 4 + shift.volumes }}
        height={120}
        ariaLabel={t("volumeAria")}
      />
    </div>
  );
}
`})))()}var Et,Dt,Ot;function $(){return($=e((()=>{ue(),me(),ye(),Ce(),De(),Ae(),Fe(),Re(),Ue(),Je(),Qe(),nt(),it(),ot(),ct(),ut(),ft(),mt(),gt(),vt(),bt(),xt(),Ct(),Tt(),t(),ee(),ne(),Et=n(),Dt=d(Object.assign({"./demos/a-share.tsx":se,"./demos/bar-styles.tsx":de,"./demos/basic.tsx":_e,"./demos/dark.tsx":be,"./demos/events.tsx":we,"./demos/intraday.tsx":ke,"./demos/large-data.tsx":Me,"./demos/live.tsx":Ie,"./demos/ma-ribbon.tsx":ze,"./demos/moving-average.tsx":Ke,"./demos/volume-colors.tsx":Ye,"./demos/volume.tsx":et}),Object.assign({"./demos/a-share.tsx":rt,"./demos/bar-styles.tsx":at,"./demos/basic.tsx":st,"./demos/dark.tsx":lt,"./demos/events.tsx":dt,"./demos/intraday.tsx":pt,"./demos/large-data.tsx":ht,"./demos/live.tsx":_t,"./demos/ma-ribbon.tsx":yt,"./demos/moving-average.tsx":Q,"./demos/volume-colors.tsx":St,"./demos/volume.tsx":wt})),Ot=()=>(0,Et.jsx)(te,{id:`candlestick-chart`,demos:Dt})})))()}$();export{Ot as default};