import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,r as i}from"./DemoBlock-BJ0_y9F8.js";import{n as a,t as o}from"./useTranslation-BzoVi22c.js";import{R as s,z as c}from"./ProgressIndicator-BhPa7d9i.js";import{i as l,n as u,r as ee,t as d}from"./Radio-DnNachfg.js";import{n as te,t as ne}from"./Switch-DyBWzlhy.js";import{i as re,o as ie,t as ae}from"./Select-BfUcg0dC.js";import{l as oe,u as se}from"./angular-preview-B5skLbni.js";import{l as ce,n as le,t as ue,u as de}from"./DocPage-B2iACtLP.js";import{a as f,c as p,i as fe,l as m,n as pe,o as me,r as h,s as g,t as he}from"./data-CPr3f9Xw.js";function ge(){let{t:e}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,_e.useState)(`hollowCandles`);return(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,_.jsx)(l,{"aria-label":e(`chartStyle`),direction:`horizontal`,value:t,onChange:e=>n(e),children:ye.map(t=>(0,_.jsx)(d,{value:t,label:e(`styles.${t}`)},t))}),(0,_.jsx)(p,{bars:ve,timeframe:`1D`,symbol:e(`aapl`),chartStyle:t,barSpacing:7,ariaLabel:e(`stylesAria`),height:400})]})}var _e,_,ve,ye;function be(){return(be=e((()=>{_e=t(),o(),u(),ee(),m(),g(),_=n(),ve=f({count:260,timeframe:he,seed:11,price:182,volatility:.014,volume:5e7,market:`stock`}),ye=[`candles`,`hollowCandles`,`heikinAshi`,`bars`,`line`,`area`,`baseline`]})))()}function xe(){let{t:e}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,v.useState)(`percent`),r=(0,v.useMemo)(()=>[{id:`eth`,name:e(`eth`),data:x(Ce)},{id:`sol`,name:e(`sol`),data:x(we)}],[e]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsxs)(l,{"aria-label":e(`priceScale`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,y.jsx)(d,{value:`percent`,label:e(`scaleNames.percent`)}),(0,y.jsx)(d,{value:`log`,label:e(`scaleNames.log`)}),(0,y.jsx)(d,{value:`linear`,label:e(`scaleNames.linear`)})]}),(0,y.jsx)(p,{bars:Se,timeframe:`1D`,symbol:e(`btc`),chartStyle:`line`,scaleMode:t,compare:r,barSpacing:3,ariaLabel:e(`compareAria`),height:400})]})}var v,y,b,Se,Ce,we,x;function Te(){return(Te=e((()=>{v=t(),o(),u(),ee(),m(),g(),y=n(),b=(e,t,n)=>f({count:365,timeframe:he,seed:e,price:t,volatility:n,volume:1e4}),Se=b(31,42e3,.026),Ce=b(32,2300,.032),we=b(33,98,.045),x=e=>e.map(e=>({time:e.time,value:e.close}))})))()}function Ee(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),n=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),r=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:2}),i=(T-E)/E,o=[[e(`change24h`),`${i>=0?`+`:``}${(i*100).toFixed(2)}%`,i>=0?`var(--success-color)`:`var(--danger-color)`],[e(`high24h`),n.format(De)],[e(`low24h`),n.format(Oe)],[e(`volume24h`),r.format(ke)]];return(0,S.jsxs)(`div`,{style:Ae,children:[(0,S.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:24,flexWrap:`wrap`,padding:`12px 16px`,borderBottom:`1px solid var(--border-color)`},children:[(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`div`,{style:{fontWeight:600,fontSize:15},children:e(`btcPerp`)}),(0,S.jsx)(`div`,{style:{fontSize:22,fontWeight:600,fontVariantNumeric:`tabular-nums`,color:i>=0?`var(--success-color)`:`var(--danger-color)`},children:n.format(T)})]}),o.map(([e,t,n])=>(0,S.jsxs)(`div`,{style:{fontSize:12},children:[(0,S.jsx)(`div`,{style:{color:`var(--text-secondary-color)`},children:e}),(0,S.jsx)(`div`,{style:{fontVariantNumeric:`tabular-nums`,fontWeight:500,color:n},children:t})]},e))]}),(0,S.jsx)(p,{bars:C,timeframe:`15m`,symbol:e(`btcPerp`),indicators:[{type:`ema`,period:20},{type:`ema`,period:50},{type:`boll`,fill:!0},{type:`volume`,overlay:!0},{type:`rsi`,height:100}],watermark:e(`btcPerp`),ariaLabel:e(`darkAria`),height:520})]})}var S,C,w,T,E,De,Oe,ke,Ae;function je(){return(je=e((()=>{o(),m(),g(),S=n(),C=f({count:900,timeframe:15*h,seed:77,price:66420,volatility:.0028,volume:420}),w=C.slice(-96),T=w[w.length-1].close,E=w[0].open,De=Math.max(...w.map(e=>e.high)),Oe=Math.min(...w.map(e=>e.low)),ke=w.reduce((e,t)=>e+(t.volume??0),0),Ae={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1e2329`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--warning-color":`#f0b90b`,"--info-color":`#3d8bfd`,"--primary-color":`#f0b90b`,color:`#eaecef`,background:`#0b0e11`,borderRadius:12,overflow:`hidden`,width:`100%`,border:`1px solid #2b3139`}})))()}function Me(){let{t:e}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,D.useState)(`cursor`),[r,i]=(0,D.useState)(!1),[o,s]=(0,D.useState)(Ne);return(0,O.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`},children:[(0,O.jsx)(`div`,{role:`toolbar`,"aria-label":e(`drawingTools`),"aria-orientation":`vertical`,style:{display:`flex`,flexDirection:`column`,gap:2,padding:6,borderRight:`1px solid var(--border-color)`},children:Fe.map(r=>(0,O.jsx)(c,{size:`small`,variant:`ghost`,shape:`square`,active:t===r,"aria-pressed":t===r,"aria-label":e(`tools.${r}`),title:e(`tools.${r}`),onClick:()=>n(r),children:(0,O.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 18 18`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,O.jsx)(`path`,{d:Pe[r]})})},r))}),(0,O.jsxs)(`div`,{style:{minWidth:0},children:[(0,O.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,flexWrap:`wrap`,padding:`6px 10px`,fontSize:13,borderBottom:`1px solid var(--border-color)`},children:[(0,O.jsx)(ne,{size:`small`,checked:r,onChange:i,label:e(`keepDrawing`)}),(0,O.jsx)(c,{size:`small`,variant:`ghost`,color:`danger`,disabled:!o.length,onClick:()=>s([]),children:e(`clearDrawings`)}),(0,O.jsx)(`span`,{role:`status`,style:{marginInlineStart:`auto`,color:`var(--text-secondary-color)`},children:e(`drawingsStatus`,{count:o.length})})]}),(0,O.jsx)(p,{bars:k,timeframe:`4H`,symbol:e(`eth`),drawings:o,onDrawingsChange:s,drawingMode:t,keepDrawingMode:r,onDrawingToolChange:n,indicators:[{type:`ema`,period:50}],ariaLabel:e(`drawingAria`),height:460})]})]})}var D,O,k,A,j,M,Ne,Pe,Fe;function Ie(){return(Ie=e((()=>{D=t(),o(),s(),te(),m(),g(),O=n(),k=f({count:420,timeframe:4*pe,seed:23,price:2480,volatility:.009,volume:900}),A=k.slice(-100),j=A.reduce((e,t)=>t.low<e.low?t:e),M=A.slice(A.indexOf(j)).reduce((e,t)=>t.high>e.high?t:e),Ne=[{id:`fib`,type:`fibRetracement`,points:[{time:j.time,price:j.low},{time:M.time,price:M.high}]},{id:`support`,type:`horizontalLine`,points:[{time:j.time,price:Math.round(j.low)}],color:`var(--success-color)`,lineStyle:`dashed`}],Pe={cursor:`M4 3l10 5-4.5 1.5L8 14z`,trendLine:`M3 15L15 3M3 15h0M15 3h0`,ray:`M3 14L16 4M3 14h0`,extendedLine:`M1 16L17 2`,horizontalLine:`M1 9h16`,verticalLine:`M9 1v16`,rectangle:`M3 4h12v10H3z`,fibRetracement:`M2 3h14M2 7h14M2 10h14M2 15h14`,measure:`M9 2v14M5 6l4-4 4 4M5 12l4 4 4-4`},Fe=Object.keys(Pe)})))()}function Le(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,N.useRef)(null),[r]=(0,N.useState)(()=>F.slice(-200)),[i,o]=(0,N.useState)(Re),[s,c]=(0,N.useState)(!1),l=(0,N.useRef)(!1);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,P.jsx)(p,{ref:n,bars:r,timeframe:`1H`,symbol:e(`eurusd`),indicators:[{type:`ma`,period:50},{type:`atr`,height:80}],onHistoryRequest:({count:e})=>{l.current||e>=F.length||(l.current=!0,c(!0),setTimeout(()=>{let t=F.slice(Math.max(0,F.length-e-Re),F.length-e);n.current?.prependBars(t),l.current=!1,c(!1),o(e+t.length)},600))},ariaLabel:e(`historyAria`),height:400}),(0,P.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:s?e(`historyLoading`):e(`historyStatus`,{loaded:new Intl.NumberFormat(t.language).format(i),total:new Intl.NumberFormat(t.language).format(F.length)})})]})}var N,P,F,Re;function ze(){return(ze=e((()=>{N=t(),o(),m(),g(),P=n(),F=f({count:3e3,timeframe:pe,seed:57,price:1.0842,volatility:.0011,volume:3e3},5),Re=200})))()}function Be(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,I.useRef)(null),[r]=(0,I.useState)(()=>me({count:Ve,timeframe:h,seed:99,price:21e3,volatility:6e-4,volume:40,start:Date.UTC(2023,0,2)})),[i,o]=(0,I.useState)(null);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`,flexWrap:`wrap`},children:[(0,L.jsx)(c,{size:`small`,variant:`outline`,onClick:()=>n.current?.fitContent(),children:e(`showAll`)}),(0,L.jsx)(c,{size:`small`,variant:`outline`,onClick:()=>n.current?.scrollToRealtime(),children:e(`latest`)}),(0,L.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e(`millionStatus`,{bars:new Intl.NumberFormat(t.language).format(Ve),renderer:i??`…`})})]}),(0,L.jsx)(p,{ref:n,bars:r,timeframe:`1m`,precision:2,symbol:e(`nq`),indicators:[{type:`ema`,period:200},{type:`volume`,height:80}],onRendererChange:o,ariaLabel:e(`millionAria`),height:440})]})}var I,L,Ve;function He(){return(He=e((()=>{I=t(),o(),s(),m(),g(),L=n(),Ve=1e6})))()}function Ue(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),[n,r]=(0,R.useState)(Ke),[i,o]=(0,R.useState)(null),s=(0,R.useMemo)(()=>Ge.map(({label:t,...r})=>({...r,price:n[r.id],title:e(`lines.${t}`)})),[n,e]),c=(0,R.useMemo)(()=>We.map(([t,n,r])=>{let i=B[t];return{time:i.time,side:n,price:Math.round(n===`buy`?(i.low+i.close)/2:(i.high+i.close)/2),text:e(n===`buy`?`buyMarker`:`sellMarker`,{quantity:r})}}),[e]),l=new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,maximumFractionDigits:0});return(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,width:`100%`},children:[(0,z.jsx)(`div`,{style:{flex:`1 1 520px`,minWidth:0},children:(0,z.jsx)(p,{bars:B,timeframe:`1H`,symbol:e(`btc`),priceLines:s,markers:c,onOrderMove:e=>{r(t=>({...t,[e.id]:e.price})),o(e)},precision:0,ariaLabel:e(`ordersAria`),height:460})}),(0,z.jsxs)(`div`,{style:{flex:`1 1 200px`,display:`grid`,alignContent:`start`,gap:8,fontSize:13},children:[(0,z.jsx)(`strong`,{children:e(`openOrders`)}),(0,z.jsx)(`table`,{style:{borderCollapse:`collapse`,width:`100%`,fontVariantNumeric:`tabular-nums`},children:(0,z.jsx)(`tbody`,{children:s.map(e=>(0,z.jsxs)(`tr`,{style:{borderTop:`1px solid var(--border-color)`},children:[(0,z.jsx)(`td`,{style:{padding:`6px 0`},children:e.title}),(0,z.jsx)(`td`,{style:{padding:`6px 0`,textAlign:`end`,color:`var(--text-secondary-color)`},children:e.quantity??``}),(0,z.jsx)(`td`,{style:{padding:`6px 0`,textAlign:`end`},children:l.format(e.price)})]},e.id))})}),(0,z.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:i?e(`orderMoved`,{name:s.find(e=>e.id===i.id)?.title??i.id,from:l.format(i.previousPrice),to:l.format(i.price)}):e(`dragHint`)})]})]})}var R,z,B,V,H,U,We,W,Ge,Ke;function qe(){return(qe=e((()=>{R=t(),o(),m(),g(),z=n(),B=f({count:320,timeframe:pe,seed:5,price:63200,volatility:.0045,volume:260}),V=B[B.length-1].close,H=B[B.length-70],U=Math.round(H.low+(H.close-H.low)/2),We=[[60,`buy`,.4],[95,`sell`,.4],[150,`buy`,1.2],[205,`sell`,1.2],[B.length-70,`buy`,.75]],W=e=>Math.round(e/10)*10,Ge=[{id:`position`,kind:`position`,side:`buy`,quantity:.75,label:`position`},{id:`tp`,kind:`takeProfit`,quantity:.75,draggable:!0,label:`takeProfit`},{id:`sl`,kind:`stopLoss`,quantity:.75,draggable:!0,label:`stopLoss`},{id:`buy`,kind:`order`,side:`buy`,quantity:.5,draggable:!0,label:`limitBuy`},{id:`sell`,kind:`order`,side:`sell`,quantity:.3,draggable:!0,label:`limitSell`},{id:`alert`,kind:`alert`,label:`alert`}],Ke={position:U,tp:W(U*1.045),sl:W(U*.975),buy:W(V*.985),sell:W(V*1.02),alert:W(V*1.035)}})))()}function Je(){let{t:e}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,G.useState)(`15m`),[r,i]=(0,G.useState)(`candles`),[o,s]=(0,G.useState)(`linear`),[l,u]=(0,G.useState)([`ma`,`vol`,`macd`,`rsi`]),ee=(0,G.useMemo)(()=>t===`1m`?Ye:se(Ye,t),[t]),d=(0,G.useMemo)(()=>Object.keys(q).flatMap(e=>l.includes(e)?q[e]:[]),[l]),te=e=>u(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,K.jsxs)(`div`,{style:{width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`,background:`var(--surface-color)`},children:[(0,K.jsxs)(`div`,{style:Qe,role:`toolbar`,"aria-label":e(`toolbar`),children:[(0,K.jsx)(`strong`,{style:{padding:`0 8px 0 4px`,fontSize:14},children:e(`btc`)}),Xe.map(r=>(0,K.jsx)(c,{size:`small`,variant:`ghost`,active:r===t,"aria-pressed":r===t,onClick:()=>n(r),children:e(`timeframes.${r}`)},r)),(0,K.jsx)(`span`,{style:$e}),(0,K.jsx)(ie,{size:`small`,style:{width:150},"aria-label":e(`chartStyle`),value:r,onChange:e=>i(e),children:Ze.map(t=>(0,K.jsx)(ae,{value:t,children:e(`styles.${t}`)},t))}),(0,K.jsx)(`span`,{style:$e}),Object.keys(q).map(t=>(0,K.jsx)(c,{size:`small`,variant:`ghost`,active:l.includes(t),"aria-pressed":l.includes(t),onClick:()=>te(t),children:e(`studies.${t}`)},t)),(0,K.jsx)(`span`,{style:{flex:1}}),[`linear`,`percent`,`log`].map(t=>(0,K.jsx)(c,{size:`small`,variant:`ghost`,active:o===t,"aria-pressed":o===t,onClick:()=>s(t),children:e(`scales.${t}`)},t))]}),(0,K.jsx)(p,{bars:ee,timeframe:t,symbol:e(`btc`),chartStyle:r,scaleMode:o,indicators:d,watermark:`${e(`btc`)} · ${e(`timeframes.${t}`)}`,labels:{timeframe:e(`timeframes.${t}`)},ariaLabel:e(`terminalAria`),height:600})]})}var G,K,Ye,Xe,Ze,q,Qe,$e;function et(){return(et=e((()=>{G=t(),o(),s(),re(),m(),oe(),g(),K=n(),Ye=f({count:129600,timeframe:h,seed:42,price:61850,volatility:.0011,volume:14},1),Xe=[`1m`,`5m`,`15m`,`1H`,`4H`,`1D`,`1W`],Ze=[`candles`,`hollowCandles`,`heikinAshi`,`bars`,`line`,`area`,`baseline`],q={ma:[{type:`ma`,period:7},{type:`ma`,period:25},{type:`ma`,period:99}],boll:[{type:`boll`}],vol:[{type:`volume`,maPeriod:20,height:90}],macd:[{type:`macd`}],rsi:[{type:`rsi`}],kdj:[{type:`kdj`}]},Qe={display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:4,padding:`6px 8px`,borderBottom:`1px solid var(--border-color)`},$e={width:1,height:20,margin:`0 6px`,background:`var(--border-color)`}})))()}function tt(){let{t:e}=a(`common`,{keyPrefix:`docs.trading-chart.data`});return(0,nt.jsx)(p,{bars:rt,timeframe:`1D`,symbol:e(`moutai`),colorConvention:`redUp`,utcOffset:480,indicators:[{type:`ma`,period:5},{type:`ma`,period:10},{type:`ma`,period:20},{type:`ma`,period:60},{type:`volume`,maPeriod:5,height:90},{type:`kdj`,height:100}],barSpacing:7,ariaLabel:e(`redUpAria`),height:540})}var nt,rt;function it(){return(it=e((()=>{o(),m(),g(),nt=n(),rt=f({count:300,timeframe:he,seed:600519,price:1688,volatility:.017,volume:32e5,market:`stock`,start:Date.UTC(2024,8,2)})})))()}function at(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,J.useRef)(null),[r]=(0,J.useState)(st),[i,o]=(0,J.useState)(!0),[s,l]=(0,J.useState)({rate:0,price:0});(0,J.useEffect)(()=>{if(!i)return;let e=n.current?.getBar((n.current?.getBarCount()??0)-1),t=e?{...e}:{...r[r.length-1]},a=fe(Date.now()%1e3,t.close,12e-5),o=0,s=performance.now(),c=setInterval(()=>{let e=a(),r=Math.floor(Date.now()/h)*h,i=Math.round(e.price*100)/100;t=r===t.time?{...t,high:Math.max(t.high,i),low:Math.min(t.low,i),close:i,volume:(t.volume??0)+e.size}:{time:r,open:t.close,high:i,low:i,close:i,volume:e.size},n.current?.update(t),o++},ot),u=setInterval(()=>{let e=performance.now();l({rate:o*1e3/(e-s),price:t.close}),o=0,s=e},1e3);return()=>{clearInterval(c),clearInterval(u)}},[i,r]);let u=new Intl.NumberFormat(t.language,{minimumFractionDigits:2,maximumFractionDigits:2});return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,flexWrap:`wrap`},children:[(0,Y.jsx)(c,{size:`small`,variant:`outline`,onClick:()=>o(e=>!e),children:e(i?`pause`:`resume`)}),(0,Y.jsx)(`span`,{role:`status`,style:{fontVariantNumeric:`tabular-nums`,color:`var(--text-secondary-color)`},children:i?e(`streamStatus`,{rate:Math.round(s.rate),price:s.price?u.format(s.price):`–`}):e(`paused`)})]}),(0,Y.jsx)(p,{ref:n,bars:r,timeframe:`1m`,symbol:e(`eth`),indicators:[{type:`ema`,period:9},{type:`ema`,period:21},{type:`volume`,height:90}],countdown:!0,barSpacing:9,ariaLabel:e(`streamAria`),height:440})]})}var J,Y,ot,st;function ct(){return(ct=e((()=>{J=t(),o(),s(),m(),g(),Y=n(),ot=20,st=()=>{let e=Math.floor(Date.now()/h)*h;return f({count:400,timeframe:h,seed:7,price:3420,volatility:.0012,volume:120,start:e-399*h})}})))()}function lt(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,X.useRef)(null),[{bars:r,next:i}]=(0,X.useState)(ut),[o,s]=(0,X.useState)(r.length);return(0,X.useEffect)(()=>{let e=r[r.length-1],t=r.length,a=setInterval(()=>{let r=1+Math.floor(Math.random()*2);for(let a=0;a<r;a++){let r=i(),a=Math.max(Date.now(),e.time+1),o=Math.round(r.price*100)/100;e=Q(a,e.close,o,r.size*40),n.current?.update(e),t++}},15),o=setInterval(()=>s(t),500);return()=>{clearInterval(a),clearInterval(o)}},[r,i]),(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(p,{ref:n,bars:r,symbol:e(`sol`),chartStyle:`area`,indicators:[{type:`vwap`,reset:`none`},{type:`volume`,height:80}],barSpacing:4,rightOffset:12,highLowMarkers:!1,ariaLabel:e(`tickAria`),height:380}),(0,Z.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:e(`tickStatus`,{trades:new Intl.NumberFormat(t.language).format(o)})})]})}var X,Z,Q,ut;function dt(){return(dt=e((()=>{X=t(),o(),m(),g(),Z=n(),Q=(e,t,n,r)=>({time:e,open:t,high:Math.max(t,n),low:Math.min(t,n),close:n,volume:r}),ut=()=>{let e=fe(3,172.4,18e-5),t=[],n=Date.now()-6e3,r=172.4;for(let i=0;i<600;i++){let i=e();n+=10;let a=Math.round(i.price*100)/100;t.push(Q(n,r,a,i.size*40)),r=a}return{bars:t,next:e}}})))()}var ft;function pt(){return(pt=e((()=>{ft=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingChartStyle } from "minerva-design/charts";
import { DAY, generateBars } from "../data";

// a year of daily bars of a stock: weekends leave no gap on the axis
const bars = generateBars({
  count: 260,
  timeframe: DAY,
  seed: 11,
  price: 182,
  volatility: 0.014,
  volume: 5e7,
  market: "stock",
});

const STYLES: TradingChartStyle[] = [
  "candles",
  "hollowCandles",
  "heikinAshi",
  "bars",
  "line",
  "area",
  "baseline",
];

export default function ChartStylesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [chartStyle, setChartStyle] =
    useState<TradingChartStyle>("hollowCandles");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("chartStyle")}
        direction="horizontal"
        value={chartStyle}
        onChange={(value) => setChartStyle(value as TradingChartStyle)}
      >
        {STYLES.map((style) => (
          <Radio key={style} value={style} label={t(\`styles.\${style}\`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("aapl")}
        chartStyle={chartStyle}
        barSpacing={7}
        ariaLabel={t("stylesAria")}
        height={400}
      />
    </div>
  );
}
`})))()}var mt;function ht(){return(ht=e((()=>{mt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TradingChart,
  type TradingCompareSeries,
  type TradingScaleMode,
} from "minerva-design/charts";
import { DAY, generateBars } from "../data";

// a year of daily closes of three coins, from the same day
const daily = (seed: number, price: number, volatility: number) =>
  generateBars({
    count: 365,
    timeframe: DAY,
    seed,
    price,
    volatility,
    volume: 1e4,
  });

const btc = daily(31, 42_000, 0.026);
const eth = daily(32, 2_300, 0.032);
const sol = daily(33, 98, 0.045);

const values = (bars: typeof btc) =>
  bars.map((bar) => ({ time: bar.time, value: bar.close }));

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [scaleMode, setScaleMode] = useState<TradingScaleMode>("percent");
  const compare = useMemo(
    (): TradingCompareSeries[] => [
      { id: "eth", name: t("eth"), data: values(eth) },
      { id: "sol", name: t("sol"), data: values(sol) },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("priceScale")}
        direction="horizontal"
        value={scaleMode}
        onChange={(value) => setScaleMode(value as TradingScaleMode)}
      >
        <Radio value="percent" label={t("scaleNames.percent")} />
        <Radio value="log" label={t("scaleNames.log")} />
        <Radio value="linear" label={t("scaleNames.linear")} />
      </RadioGroup>
      <TradingChart
        bars={btc}
        timeframe="1D"
        symbol={t("btc")}
        chartStyle="line"
        scaleMode={scaleMode}
        compare={compare}
        barSpacing={3}
        ariaLabel={t("compareAria")}
        height={400}
      />
    </div>
  );
}
`})))()}var gt;function _t(){return(_t=e((()=>{gt=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

const bars = generateBars({
  count: 900,
  timeframe: 15 * MINUTE,
  seed: 77,
  price: 66_420,
  volatility: 0.0028,
  volume: 420,
});

// 24 hours of 15-minute bars for the ticker header
const day = bars.slice(-96);
const last = day[day.length - 1].close;
const open = day[0].open;
const high = Math.max(...day.map((bar) => bar.high));
const low = Math.min(...day.map((bar) => bar.low));
const volume = day.reduce((sum, bar) => sum + (bar.volume ?? 0), 0);

// a terminal palette: the chart reads its colors from these CSS variables
const terminal = {
  "--background-color": "#0b0e11",
  "--surface-color": "#0b0e11",
  "--surface-elevated-color": "#1e2329",
  "--text-color": "#eaecef",
  "--text-secondary-color": "#848e9c",
  "--border-color": "#2b3139",
  "--success-color": "#0ecb81",
  "--danger-color": "#f6465d",
  "--warning-color": "#f0b90b",
  "--info-color": "#3d8bfd",
  "--primary-color": "#f0b90b",
  color: "#eaecef",
  background: "#0b0e11",
  borderRadius: 12,
  overflow: "hidden",
  width: "100%",
  border: "1px solid #2b3139",
} as React.CSSProperties;

export default function DarkTerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const change = (last - open) / open;
  const stats: [string, string, string?][] = [
    [
      t("change24h"),
      \`\${change >= 0 ? "+" : ""}\${(change * 100).toFixed(2)}%\`,
      change >= 0 ? "var(--success-color)" : "var(--danger-color)",
    ],
    [t("high24h"), price.format(high)],
    [t("low24h"), price.format(low)],
    [t("volume24h"), compact.format(volume)],
  ];

  return (
    <div style={terminal}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          flexWrap: "wrap",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{t("btcPerp")}</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              color:
                change >= 0 ? "var(--success-color)" : "var(--danger-color)",
            }}
          >
            {price.format(last)}
          </div>
        </div>
        {stats.map(([label, value, color]) => (
          <div key={label} style={{ fontSize: 12 }}>
            <div style={{ color: "var(--text-secondary-color)" }}>{label}</div>
            <div
              style={{
                fontVariantNumeric: "tabular-nums",
                fontWeight: 500,
                color,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      <TradingChart
        bars={bars}
        timeframe="15m"
        symbol={t("btcPerp")}
        indicators={[
          { type: "ema", period: 20 },
          { type: "ema", period: 50 },
          { type: "boll", fill: true },
          { type: "volume", overlay: true },
          { type: "rsi", height: 100 },
        ]}
        watermark={t("btcPerp")}
        ariaLabel={t("darkAria")}
        height={520}
      />
    </div>
  );
}
`})))()}var vt;function yt(){return(yt=e((()=>{vt=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Switch } from "minerva-design";
import {
  TradingChart,
  type TradingDrawing,
  type TradingDrawingTool,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

const bars = generateBars({
  count: 420,
  timeframe: 4 * HOUR,
  seed: 23,
  price: 2_480,
  volatility: 0.009,
  volume: 900,
});

// a Fibonacci retracement of the last rally and a support line, from the data
const recent = bars.slice(-100);
const bottom = recent.reduce((a, b) => (b.low < a.low ? b : a));
const rally = recent.slice(recent.indexOf(bottom));
const top = rally.reduce((a, b) => (b.high > a.high ? b : a));
const initialDrawings: TradingDrawing[] = [
  {
    id: "fib",
    type: "fibRetracement",
    points: [
      { time: bottom.time, price: bottom.low },
      { time: top.time, price: top.high },
    ],
  },
  {
    id: "support",
    type: "horizontalLine",
    points: [{ time: bottom.time, price: Math.round(bottom.low) }],
    color: "var(--success-color)",
    lineStyle: "dashed",
  },
];

/** 18 px icons of the tools */
const ICONS: Record<TradingDrawingTool, string> = {
  cursor: "M4 3l10 5-4.5 1.5L8 14z",
  trendLine: "M3 15L15 3M3 15h0M15 3h0",
  ray: "M3 14L16 4M3 14h0",
  extendedLine: "M1 16L17 2",
  horizontalLine: "M1 9h16",
  verticalLine: "M9 1v16",
  rectangle: "M3 4h12v10H3z",
  fibRetracement: "M2 3h14M2 7h14M2 10h14M2 15h14",
  measure: "M9 2v14M5 6l4-4 4 4M5 12l4 4 4-4",
};

const TOOLS = Object.keys(ICONS) as TradingDrawingTool[];

export default function DrawingToolsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [tool, setTool] = useState<TradingDrawingTool>("cursor");
  const [keep, setKeep] = useState(false);
  const [drawings, setDrawings] =
    useState<readonly TradingDrawing[]>(initialDrawings);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        width: "100%",
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div
        role="toolbar"
        aria-label={t("drawingTools")}
        aria-orientation="vertical"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 6,
          borderRight: "1px solid var(--border-color)",
        }}
      >
        {TOOLS.map((name) => (
          <Button
            key={name}
            size="small"
            variant="ghost"
            shape="square"
            active={tool === name}
            aria-pressed={tool === name}
            aria-label={t(\`tools.\${name}\`)}
            title={t(\`tools.\${name}\`)}
            onClick={() => setTool(name)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={ICONS[name]} />
            </svg>
          </Button>
        ))}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            padding: "6px 10px",
            fontSize: 13,
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <Switch
            size="small"
            checked={keep}
            onChange={setKeep}
            label={t("keepDrawing")}
          />
          <Button
            size="small"
            variant="ghost"
            color="danger"
            disabled={!drawings.length}
            onClick={() => setDrawings([])}
          >
            {t("clearDrawings")}
          </Button>
          <span
            role="status"
            style={{
              marginInlineStart: "auto",
              color: "var(--text-secondary-color)",
            }}
          >
            {t("drawingsStatus", { count: drawings.length })}
          </span>
        </div>
        <TradingChart
          bars={bars}
          timeframe="4H"
          symbol={t("eth")}
          drawings={drawings}
          onDrawingsChange={setDrawings}
          drawingMode={tool}
          keepDrawingMode={keep}
          onDrawingToolChange={setTool}
          indicators={[{ type: "ema", period: 50 }]}
          ariaLabel={t("drawingAria")}
          height={460}
        />
      </div>
    </div>
  );
}
`})))()}var bt;function xt(){return(xt=e((()=>{bt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingHistoryRequestEvent,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

// the server holds 3,000 hourly bars; the chart starts with the last 200
const all = generateBars(
  {
    count: 3_000,
    timeframe: HOUR,
    seed: 57,
    price: 1.0842,
    volatility: 0.0011,
    volume: 3_000,
  },
  5,
);
const PAGE = 200;

export default function HistoryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [initial] = useState(() => all.slice(-PAGE));
  const [loaded, setLoaded] = useState(PAGE);
  const [loading, setLoading] = useState(false);
  const busy = useRef(false);

  // the oldest bar came into view: fetch the page before it
  const onHistoryRequest = ({ count }: TradingHistoryRequestEvent) => {
    if (busy.current || count >= all.length) return;
    busy.current = true;
    setLoading(true);
    setTimeout(() => {
      const older = all.slice(
        Math.max(0, all.length - count - PAGE),
        all.length - count,
      );
      chart.current?.prependBars(older);
      busy.current = false;
      setLoading(false);
      setLoaded(count + older.length);
    }, 600);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TradingChart
        ref={chart}
        bars={initial}
        timeframe="1H"
        symbol={t("eurusd")}
        indicators={[
          { type: "ma", period: 50 },
          { type: "atr", height: 80 },
        ]}
        onHistoryRequest={onHistoryRequest}
        ariaLabel={t("historyAria")}
        height={400}
      />
      <span
        role="status"
        style={{
          color: "var(--text-secondary-color)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {loading
          ? t("historyLoading")
          : t("historyStatus", {
              loaded: new Intl.NumberFormat(i18n.language).format(loaded),
              total: new Intl.NumberFormat(i18n.language).format(all.length),
            })}
      </span>
    </div>
  );
}
`})))()}var St;function Ct(){return(Ct=e((()=>{St=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type ChartRendererKind,
  type TradingChartHandle,
} from "minerva-design/charts";
import { MINUTE, generateColumns } from "../data";

const COUNT = 1_000_000;

export default function MillionBarsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  // about two years of one-minute bars, as Float64Array columns
  const [bars] = useState(() =>
    generateColumns({
      count: COUNT,
      timeframe: MINUTE,
      seed: 99,
      price: 21_000,
      volatility: 0.0006,
      volume: 40,
      start: Date.UTC(2023, 0, 2),
    }),
  );
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => chart.current?.fitContent()}
        >
          {t("showAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => chart.current?.scrollToRealtime()}
        >
          {t("latest")}
        </Button>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {t("millionStatus", {
            bars: new Intl.NumberFormat(i18n.language).format(COUNT),
            renderer: renderer ?? "…",
          })}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1m"
        precision={2}
        symbol={t("nq")}
        indicators={[
          { type: "ema", period: 200 },
          { type: "volume", height: 80 },
        ]}
        onRendererChange={setRenderer}
        ariaLabel={t("millionAria")}
        height={440}
      />
    </div>
  );
}
`})))()}var wt;function Tt(){return(Tt=e((()=>{wt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingMarker,
  type TradingOrderMoveEvent,
  type TradingPriceLine,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

const bars = generateBars({
  count: 320,
  timeframe: HOUR,
  seed: 5,
  price: 63_200,
  volatility: 0.0045,
  volume: 260,
});

const last = bars[bars.length - 1].close;
const entryBar = bars[bars.length - 70];
const entry = Math.round(entryBar.low + (entryBar.close - entryBar.low) / 2);

/** Round trips of a trade history, as buy / sell bars */
const history: [number, "buy" | "sell", number][] = [
  [60, "buy", 0.4],
  [95, "sell", 0.4],
  [150, "buy", 1.2],
  [205, "sell", 1.2],
  [bars.length - 70, "buy", 0.75],
];

const round = (value: number) => Math.round(value / 10) * 10;

/** The lines; their prices are state (orders can be dragged) */
const LINES: (Omit<TradingPriceLine, "price" | "title"> & { label: string })[] =
  [
    {
      id: "position",
      kind: "position",
      side: "buy",
      quantity: 0.75,
      label: "position",
    },
    {
      id: "tp",
      kind: "takeProfit",
      quantity: 0.75,
      draggable: true,
      label: "takeProfit",
    },
    {
      id: "sl",
      kind: "stopLoss",
      quantity: 0.75,
      draggable: true,
      label: "stopLoss",
    },
    {
      id: "buy",
      kind: "order",
      side: "buy",
      quantity: 0.5,
      draggable: true,
      label: "limitBuy",
    },
    {
      id: "sell",
      kind: "order",
      side: "sell",
      quantity: 0.3,
      draggable: true,
      label: "limitSell",
    },
    { id: "alert", kind: "alert", label: "alert" },
  ];

const INITIAL_PRICES: Record<string, number> = {
  position: entry,
  tp: round(entry * 1.045),
  sl: round(entry * 0.975),
  buy: round(last * 0.985),
  sell: round(last * 1.02),
  alert: round(last * 1.035),
};

export default function OrdersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [prices, setPrices] = useState(INITIAL_PRICES);
  const [moved, setMoved] = useState<TradingOrderMoveEvent | null>(null);

  const lines = useMemo(
    (): TradingPriceLine[] =>
      LINES.map(({ label, ...line }) => ({
        ...line,
        price: prices[line.id],
        title: t(\`lines.\${label}\`),
      })),
    [prices, t],
  );

  const markers = useMemo(
    (): TradingMarker[] =>
      history.map(([index, side, quantity]) => {
        const bar = bars[index];
        return {
          time: bar.time,
          side,
          price:
            side === "buy"
              ? Math.round((bar.low + bar.close) / 2)
              : Math.round((bar.high + bar.close) / 2),
          text: t(side === "buy" ? "buyMarker" : "sellMarker", { quantity }),
        };
      }),
    [t],
  );

  const usd = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const onOrderMove = (event: TradingOrderMoveEvent) => {
    setPrices((current) => ({ ...current, [event.id]: event.price }));
    setMoved(event);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: "100%" }}>
      <div style={{ flex: "1 1 520px", minWidth: 0 }}>
        <TradingChart
          bars={bars}
          timeframe="1H"
          symbol={t("btc")}
          priceLines={lines}
          markers={markers}
          onOrderMove={onOrderMove}
          precision={0}
          ariaLabel={t("ordersAria")}
          height={460}
        />
      </div>
      <div
        style={{
          flex: "1 1 200px",
          display: "grid",
          alignContent: "start",
          gap: 8,
          fontSize: 13,
        }}
      >
        <strong>{t("openOrders")}</strong>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <tbody>
            {lines.map((line) => (
              <tr
                key={line.id}
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                <td style={{ padding: "6px 0" }}>{line.title}</td>
                <td
                  style={{
                    padding: "6px 0",
                    textAlign: "end",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {line.quantity ?? ""}
                </td>
                <td style={{ padding: "6px 0", textAlign: "end" }}>
                  {usd.format(line.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {moved
            ? t("orderMoved", {
                name:
                  lines.find((line) => line.id === moved.id)?.title ?? moved.id,
                from: usd.format(moved.previousPrice),
                to: usd.format(moved.price),
              })
            : t("dragHint")}
        </span>
      </div>
    </div>
  );
}
`})))()}var Et;function Dt(){return(Dt=e((()=>{Et=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select, SelectItem } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingChartStyle,
  type TradingIndicator,
  type TradingScaleMode,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

// 90 days of 1-minute bars (129,600), aggregated for the longer timeframes
const minutes = generateBars(
  {
    count: 90 * 24 * 60,
    timeframe: MINUTE,
    seed: 42,
    price: 61_850,
    volatility: 0.0011,
    volume: 14,
  },
  1,
);

const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

const STYLES: TradingChartStyle[] = [
  "candles",
  "hollowCandles",
  "heikinAshi",
  "bars",
  "line",
  "area",
  "baseline",
];

const STUDIES: Record<string, TradingIndicator[]> = {
  ma: [
    { type: "ma", period: 7 },
    { type: "ma", period: 25 },
    { type: "ma", period: 99 },
  ],
  boll: [{ type: "boll" }],
  vol: [{ type: "volume", maPeriod: 20, height: 90 }],
  macd: [{ type: "macd" }],
  rsi: [{ type: "rsi" }],
  kdj: [{ type: "kdj" }],
};

const bar: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 4,
  padding: "6px 8px",
  borderBottom: "1px solid var(--border-color)",
};

const divider: React.CSSProperties = {
  width: 1,
  height: 20,
  margin: "0 6px",
  background: "var(--border-color)",
};

export default function ProTerminalDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [timeframe, setTimeframe] = useState<Timeframe>("15m");
  const [chartStyle, setChartStyle] = useState<TradingChartStyle>("candles");
  const [scaleMode, setScaleMode] = useState<TradingScaleMode>("linear");
  const [studies, setStudies] = useState(["ma", "vol", "macd", "rsi"]);

  const bars = useMemo(
    () => (timeframe === "1m" ? minutes : resampleBars(minutes, timeframe)),
    [timeframe],
  );
  const indicators = useMemo(
    () =>
      Object.keys(STUDIES).flatMap((key) =>
        studies.includes(key) ? STUDIES[key] : [],
      ),
    [studies],
  );
  const toggle = (key: string) =>
    setStudies((list) =>
      list.includes(key) ? list.filter((k) => k !== key) : [...list, key],
    );

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        overflow: "hidden",
        background: "var(--surface-color)",
      }}
    >
      <div style={bar} role="toolbar" aria-label={t("toolbar")}>
        <strong style={{ padding: "0 8px 0 4px", fontSize: 14 }}>
          {t("btc")}
        </strong>
        {TIMEFRAMES.map((tf) => (
          <Button
            key={tf}
            size="small"
            variant="ghost"
            active={tf === timeframe}
            aria-pressed={tf === timeframe}
            onClick={() => setTimeframe(tf)}
          >
            {t(\`timeframes.\${tf}\`)}
          </Button>
        ))}
        <span style={divider} />
        <Select
          size="small"
          style={{ width: 150 }}
          aria-label={t("chartStyle")}
          value={chartStyle}
          onChange={(value) => setChartStyle(value as TradingChartStyle)}
        >
          {STYLES.map((style) => (
            <SelectItem key={style} value={style}>
              {t(\`styles.\${style}\`)}
            </SelectItem>
          ))}
        </Select>
        <span style={divider} />
        {Object.keys(STUDIES).map((key) => (
          <Button
            key={key}
            size="small"
            variant="ghost"
            active={studies.includes(key)}
            aria-pressed={studies.includes(key)}
            onClick={() => toggle(key)}
          >
            {t(\`studies.\${key}\`)}
          </Button>
        ))}
        <span style={{ flex: 1 }} />
        {(["linear", "percent", "log"] as const).map((mode) => (
          <Button
            key={mode}
            size="small"
            variant="ghost"
            active={scaleMode === mode}
            aria-pressed={scaleMode === mode}
            onClick={() => setScaleMode(mode)}
          >
            {t(\`scales.\${mode}\`)}
          </Button>
        ))}
      </div>
      <TradingChart
        bars={bars}
        timeframe={timeframe}
        symbol={t("btc")}
        chartStyle={chartStyle}
        scaleMode={scaleMode}
        indicators={indicators}
        watermark={\`\${t("btc")} · \${t(\`timeframes.\${timeframe}\`)}\`}
        labels={{ timeframe: t(\`timeframes.\${timeframe}\`) }}
        ariaLabel={t("terminalAria")}
        height={600}
      />
    </div>
  );
}
`})))()}var Ot;function kt(){return(kt=e((()=>{Ot=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../data";

// daily bars of a Shanghai-listed stock (no trading on weekends)
const bars = generateBars({
  count: 300,
  timeframe: DAY,
  seed: 600_519,
  price: 1_688,
  volatility: 0.017,
  volume: 3.2e6,
  market: "stock",
  start: Date.UTC(2024, 8, 2),
});

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("moutai")}
      // rising bars in red, falling bars in green
      colorConvention="redUp"
      // China Standard Time (UTC+8)
      utcOffset={480}
      indicators={[
        { type: "ma", period: 5 },
        { type: "ma", period: 10 },
        { type: "ma", period: 20 },
        { type: "ma", period: 60 },
        { type: "volume", maPeriod: 5, height: 90 },
        { type: "kdj", height: 100 },
      ]}
      barSpacing={7}
      ariaLabel={t("redUpAria")}
      height={540}
    />
  );
}
`})))()}var At;function jt(){return(jt=e((()=>{At=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/charts";
import { MINUTE, createTradeFeed, generateBars } from "../data";

const TICK_MS = 20; // 50 updates a second

/** 400 one-minute bars ending at the current minute */
const history = () => {
  const now = Math.floor(Date.now() / MINUTE) * MINUTE;
  return generateBars({
    count: 400,
    timeframe: MINUTE,
    seed: 7,
    price: 3_420,
    volatility: 0.0012,
    volume: 120,
    start: now - 399 * MINUTE,
  });
};

export default function StreamingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [bars] = useState(history);
  const [running, setRunning] = useState(true);
  const [status, setStatus] = useState({ rate: 0, price: 0 });

  useEffect(() => {
    if (!running) return;
    // a simulated WebSocket: one trade every 20 ms
    const last = chart.current?.getBar((chart.current?.getBarCount() ?? 0) - 1);
    let bar: TradingBar = last ? { ...last } : { ...bars[bars.length - 1] };
    const next = createTradeFeed(Date.now() % 1000, bar.close, 0.00012);
    let count = 0;
    let started = performance.now();
    const feed = setInterval(() => {
      const trade = next();
      const time = Math.floor(Date.now() / MINUTE) * MINUTE;
      const price = Math.round(trade.price * 100) / 100;
      bar =
        time === bar.time
          ? {
              ...bar,
              high: Math.max(bar.high, price),
              low: Math.min(bar.low, price),
              close: price,
              volume: (bar.volume ?? 0) + trade.size,
            }
          : {
              time,
              open: bar.close,
              high: price,
              low: price,
              close: price,
              volume: trade.size,
            };
      chart.current?.update(bar);
      count++;
    }, TICK_MS);
    const report = setInterval(() => {
      const now = performance.now();
      setStatus({ rate: (count * 1000) / (now - started), price: bar.close });
      count = 0;
      started = now;
    }, 1000);
    return () => {
      clearInterval(feed);
      clearInterval(report);
    };
  }, [running, bars]);

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <span
          role="status"
          style={{
            fontVariantNumeric: "tabular-nums",
            color: "var(--text-secondary-color)",
          }}
        >
          {running
            ? t("streamStatus", {
                rate: Math.round(status.rate),
                price: status.price ? price.format(status.price) : "–",
              })
            : t("paused")}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1m"
        symbol={t("eth")}
        indicators={[
          { type: "ema", period: 9 },
          { type: "ema", period: 21 },
          { type: "volume", height: 90 },
        ]}
        countdown
        barSpacing={9}
        ariaLabel={t("streamAria")}
        height={440}
      />
    </div>
  );
}
`})))()}var Mt;function Nt(){return(Nt=e((()=>{Mt=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/charts";
import { createTradeFeed } from "../data";

/** Every trade is a bar: open = previous price, so the volume shows the direction */
const tradeBar = (
  time: number,
  previous: number,
  price: number,
  size: number,
): TradingBar => ({
  time,
  open: previous,
  high: Math.max(previous, price),
  low: Math.min(previous, price),
  close: price,
  volume: size,
});

const initialTrades = () => {
  const next = createTradeFeed(3, 172.4, 0.00018);
  const bars: TradingBar[] = [];
  let time = Date.now() - 6_000;
  let previous = 172.4;
  for (let i = 0; i < 600; i++) {
    const trade = next();
    time += 10;
    const price = Math.round(trade.price * 100) / 100;
    bars.push(tradeBar(time, previous, price, trade.size * 40));
    previous = price;
  }
  return { bars, next };
};

export default function TickChartDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [{ bars, next }] = useState(initialTrades);
  const [trades, setTrades] = useState(bars.length);

  useEffect(() => {
    let last = bars[bars.length - 1];
    let total = bars.length;
    // about 100 trades a second, in bursts
    const feed = setInterval(() => {
      const burst = 1 + Math.floor(Math.random() * 2);
      for (let k = 0; k < burst; k++) {
        const trade = next();
        const time = Math.max(Date.now(), last.time + 1);
        const price = Math.round(trade.price * 100) / 100;
        last = tradeBar(time, last.close, price, trade.size * 40);
        chart.current?.update(last);
        total++;
      }
    }, 15);
    const report = setInterval(() => setTrades(total), 500);
    return () => {
      clearInterval(feed);
      clearInterval(report);
    };
  }, [bars, next]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TradingChart
        ref={chart}
        bars={bars}
        symbol={t("sol")}
        chartStyle="area"
        indicators={[
          { type: "vwap", reset: "none" },
          { type: "volume", height: 80 },
        ]}
        barSpacing={4}
        rightOffset={12}
        highLowMarkers={false}
        ariaLabel={t("tickAria")}
        height={380}
      />
      <span
        role="status"
        style={{
          color: "var(--text-secondary-color)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("tickStatus", {
          trades: new Intl.NumberFormat(i18n.language).format(trades),
        })}
      </span>
    </div>
  );
}
`})))()}var $,Pt,Ft,It;function Lt(){return(Lt=e((()=>{be(),Te(),je(),Ie(),ze(),He(),qe(),et(),it(),ct(),dt(),pt(),ht(),_t(),yt(),xt(),Ct(),Tt(),Dt(),kt(),jt(),Nt(),t(),o(),le(),r(),de(),$=n(),Pt=ce(Object.assign({"./demos/chart-styles.tsx":ge,"./demos/compare.tsx":xe,"./demos/dark-terminal.tsx":Ee,"./demos/drawing-tools.tsx":Me,"./demos/history.tsx":Le,"./demos/million-bars.tsx":Be,"./demos/orders.tsx":Ue,"./demos/pro-terminal.tsx":Je,"./demos/red-up.tsx":tt,"./demos/streaming.tsx":at,"./demos/tick-chart.tsx":lt}),Object.assign({"./demos/chart-styles.tsx":ft,"./demos/compare.tsx":mt,"./demos/dark-terminal.tsx":gt,"./demos/drawing-tools.tsx":vt,"./demos/history.tsx":bt,"./demos/million-bars.tsx":St,"./demos/orders.tsx":wt,"./demos/pro-terminal.tsx":Et,"./demos/red-up.tsx":Ot,"./demos/streaming.tsx":At,"./demos/tick-chart.tsx":Mt})),Ft=`import { TradingChart } from "minerva-design/charts";
// framework-free engine and pure indicator functions
import { createTradingChart, resampleBars, ema } from "minerva-design/charts/core";`,It=()=>{let{t:e}=a(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:i.section,"aria-labelledby":`trading-overview`,children:[(0,$.jsx)(`h2`,{id:`trading-overview`,children:e(`docs.trading-chart.intro.overview.title`)}),(0,$.jsx)(`p`,{className:i.prose,children:e(`docs.trading-chart.intro.overview.text`)}),(0,$.jsxs)(`ul`,{className:i.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.axis`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.panes`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.trading`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.drawings`)})]})]}),(0,$.jsxs)(`section`,{className:i.section,"aria-labelledby":`trading-streaming`,children:[(0,$.jsx)(`h2`,{id:`trading-streaming`,children:e(`docs.trading-chart.intro.streaming.title`)}),(0,$.jsx)(`p`,{className:i.prose,children:e(`docs.trading-chart.intro.streaming.text`)}),(0,$.jsx)(`p`,{className:i.prose,children:e(`docs.trading-chart.intro.streaming.performance`)})]}),(0,$.jsxs)(`section`,{className:i.section,"aria-labelledby":`trading-controls`,children:[(0,$.jsx)(`h2`,{id:`trading-controls`,children:e(`docs.trading-chart.intro.controls.title`)}),(0,$.jsxs)(`ul`,{className:i.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.pointer`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.axes`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.keyboard`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.touch`)})]})]}),(0,$.jsxs)(`section`,{className:i.section,"aria-labelledby":`trading-languages`,children:[(0,$.jsx)(`h2`,{id:`trading-languages`,children:e(`docs.trading-chart.intro.languages.title`)}),(0,$.jsx)(`p`,{className:i.prose,children:e(`docs.trading-chart.intro.languages.text`)}),(0,$.jsx)(`p`,{className:i.prose,children:e(`docs.trading-chart.intro.languages.colors`)})]})]});return(0,$.jsx)(ue,{id:`trading-chart`,demos:Pt,intro:t,importCode:Ft})}})))()}Lt();export{It as default};