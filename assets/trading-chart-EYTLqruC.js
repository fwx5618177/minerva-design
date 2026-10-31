import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{n as d,t as f}from"./Switch-DL9RsLtd.js";import{i as p,r as m}from"./DemoBlock-DWXf3cPy.js";import{i as h,o as ee,t as te}from"./Select-DtAm90X-.js";import{a as ne,g as re,i as ie,m as ae,p as oe}from"./angular-preview-BOXOhc0i.js";import{l as se,n as ce,t as le,u as ue}from"./DocPage-4JD4uRu8.js";import{a as g,c as _,i as de,l as v,n as y,o as fe,r as b,s as x,t as pe}from"./data-OJRIyQ69.js";var me;function he(){return(he=e((()=>{ne(),me=(e,t={})=>{let n=[];for(let r of e){let i=e.filter(e=>e!==r);t.crosshair!==!1&&n.push(r.on(`crosshairMove`,e=>{for(let t of i)t.setCrosshair(e?e.time:null)})),t.timeRange!==!1&&n.push(r.on(`visibleRangeChange`,()=>{let e=r.getVisibleTimeRange();for(let t of i){let n=ie.get(t);n?n.setTimeRange(e):t.setVisibleTimeRange(e)}}))}return()=>{n.forEach(e=>e());for(let t of e)t.setCrosshair(null)}}})))()}function ge(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,_e.useState)(`hollowCandles`);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsx)(s,{"aria-label":e(`chartStyle`),direction:`horizontal`,value:t,onChange:e=>n(e),children:ye.map(t=>(0,S.jsx)(u,{value:t,label:e(`styles.${t}`)},t))}),(0,S.jsx)(_,{bars:ve,timeframe:`1D`,symbol:e(`aapl`),chartStyle:t,barSpacing:7,ariaLabel:e(`stylesAria`),height:400})]})}var _e,S,ve,ye;function be(){return(be=e((()=>{_e=t(),i(),c(),l(),v(),x(),S=n(),ve=g({count:260,timeframe:pe,seed:11,price:182,volatility:.014,volume:5e7,market:`stock`}),ye=[`candles`,`hollowCandles`,`heikinAshi`,`bars`,`line`,`area`,`baseline`]})))()}function xe(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,Se.useState)(`percent`),i=(0,Se.useMemo)(()=>[{id:`eth`,name:e(`eth`),data:De(Te)},{id:`sol`,name:e(`sol`),data:De(Ee)}],[e]);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,C.jsxs)(s,{"aria-label":e(`priceScale`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,C.jsx)(u,{value:`percent`,label:e(`scaleNames.percent`)}),(0,C.jsx)(u,{value:`log`,label:e(`scaleNames.log`)}),(0,C.jsx)(u,{value:`linear`,label:e(`scaleNames.linear`)})]}),(0,C.jsx)(_,{bars:we,timeframe:`1D`,symbol:e(`btc`),chartStyle:`line`,scaleMode:t,compare:i,barSpacing:3,ariaLabel:e(`compareAria`),height:400})]})}var Se,C,Ce,we,Te,Ee,De;function Oe(){return(Oe=e((()=>{Se=t(),i(),c(),l(),v(),x(),C=n(),Ce=(e,t,n)=>g({count:365,timeframe:pe,seed:e,price:t,volatility:n,volume:1e4}),we=Ce(31,42e3,.026),Te=Ce(32,2300,.032),Ee=Ce(33,98,.045),De=e=>e.map(e=>({time:e.time,value:e.close}))})))()}function ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),i=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:2}),a=(je-Me)/Me,o=[[e(`change24h`),`${a>=0?`+`:``}${(a*100).toFixed(2)}%`,a>=0?`var(--success-color)`:`var(--danger-color)`],[e(`high24h`),n.format(Ne)],[e(`low24h`),n.format(Pe)],[e(`volume24h`),i.format(Fe)]];return(0,w.jsxs)(`div`,{style:Ie,children:[(0,w.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:24,flexWrap:`wrap`,padding:`12px 16px`,background:`var(--surface-subtle-color)`},children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{fontWeight:600,fontSize:15},children:e(`btcPerp`)}),(0,w.jsx)(`div`,{style:{fontSize:22,fontWeight:600,fontVariantNumeric:`tabular-nums`,color:a>=0?`var(--success-color)`:`var(--danger-color)`},children:n.format(je)})]}),o.map(([e,t,n])=>(0,w.jsxs)(`div`,{style:{fontSize:12},children:[(0,w.jsx)(`div`,{style:{color:`var(--text-secondary-color)`},children:e}),(0,w.jsx)(`div`,{style:{fontVariantNumeric:`tabular-nums`,fontWeight:500,color:n},children:t})]},e))]}),(0,w.jsx)(_,{bars:Ae,timeframe:`15m`,symbol:e(`btcPerp`),indicators:[{type:`ema`,period:20},{type:`ema`,period:50},{type:`boll`,fill:!0},{type:`volume`,overlay:!0},{type:`rsi`,height:100}],watermark:e(`btcPerp`),ariaLabel:e(`darkAria`),height:520})]})}var w,Ae,T,je,Me,Ne,Pe,Fe,Ie;function Le(){return(Le=e((()=>{i(),v(),x(),w=n(),Ae=g({count:900,timeframe:15*b,seed:77,price:66420,volatility:.0028,volume:420}),T=Ae.slice(-96),je=T[T.length-1].close,Me=T[0].open,Ne=Math.max(...T.map(e=>e.high)),Pe=Math.min(...T.map(e=>e.low)),Fe=T.reduce((e,t)=>e+(t.volume??0),0),Ie={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1e2329`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--warning-color":`#f0b90b`,"--info-color":`#3d8bfd`,"--primary-color":`#f0b90b`,color:`#eaecef`,background:`#0b0e11`,borderRadius:12,overflow:`hidden`,width:`100%`,border:`1px solid #2b3139`}})))()}function Re(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,E.useRef)(null),[n,i]=(0,E.useState)(`cursor`),[a,s]=(0,E.useState)(!1),[c,l]=(0,E.useState)(!0),[u,d]=(0,E.useState)({canUndo:!1,canRedo:!1}),[p,m]=(0,E.useState)(()=>Ke(e(`noteText`)));return(0,D.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`},children:[(0,D.jsx)(`div`,{role:`toolbar`,"aria-label":e(`drawingTools`),"aria-orientation":`vertical`,style:{display:`flex`,flexDirection:`column`,gap:2,padding:6,background:`var(--surface-subtle-color)`},children:Je.map(t=>(0,D.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,active:n===t,"aria-pressed":n===t,"aria-label":e(`tools.${t}`),title:e(`tools.${t}`),onClick:()=>i(t),children:(0,D.jsx)(Ye,{d:qe[t]})},t))}),(0,D.jsxs)(`div`,{style:{minWidth:0},children:[(0,D.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,flexWrap:`wrap`,padding:`6px 10px`,fontSize:13,background:`var(--surface-subtle-color)`},children:[(0,D.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`undo`),title:e(`undo`),disabled:!u.canUndo,onClick:()=>t.current?.undo(),children:(0,D.jsx)(Ye,{d:`M7 4L3 8l4 4M3 8h8a4 4 0 0 1 0 8H9`})}),(0,D.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`redo`),title:e(`redo`),disabled:!u.canRedo,onClick:()=>t.current?.redo(),children:(0,D.jsx)(Ye,{d:`M11 4l4 4-4 4M15 8H7a4 4 0 0 0 0 8h2`})}),(0,D.jsx)(f,{size:`small`,checked:a,onChange:s,label:e(`keepDrawing`)}),(0,D.jsx)(f,{size:`small`,checked:c,onChange:l,label:e(`fitDrawings`)}),(0,D.jsx)(o,{size:`small`,variant:`ghost`,color:`danger`,disabled:!p.length,onClick:()=>m([]),children:e(`clearDrawings`)}),(0,D.jsx)(`span`,{role:`status`,style:{marginInlineStart:`auto`,color:`var(--text-secondary-color)`},children:e(`drawingsStatus`,{count:p.length})})]}),(0,D.jsx)(_,{ref:t,bars:O,timeframe:`4H`,symbol:e(`eth`),drawings:p,onDrawingsChange:m,onUndoChange:d,drawingMode:n,keepDrawingMode:a,autoscaleIncludesDrawings:c,onDrawingToolChange:i,indicators:[{type:`ema`,period:50},{type:`rsi`,height:100}],rightOffset:20,barSpacing:5,ariaLabel:e(`drawingAria`),height:560})]})]})}var E,D,O,ze,k,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye;function Xe(){return(Xe=e((()=>{E=t(),i(),a(),d(),v(),x(),D=n(),O=g({count:420,timeframe:4*y,seed:23,price:2480,volatility:.009,volume:900}),ze=O.slice(-100),k=ze.reduce((e,t)=>t.low<e.low?t:e),Be=ze.slice(ze.indexOf(k)),Ve=Be.reduce((e,t)=>t.high>e.high?t:e),He=Be.slice(Math.floor(Be.length/2)).reduce((e,t)=>t.low<e.low?t:e),Ue=O[O.length-1],We=Math.round(Ue.close),Ge=Ue.time+64*y,Ke=e=>[{id:`channel`,type:`parallelChannel`,color:`#a855f7`,points:[{time:k.time,price:k.low},{time:He.time,price:He.low},{time:Ve.time,price:Ve.high}]},{id:`long`,type:`longPosition`,quantity:2,points:[{time:Ue.time,price:We},{time:Ge,price:Math.round(We*1.035)},{time:Ge,price:Math.round(We*.9825)}]},{id:`note`,type:`text`,color:`#0ea5e9`,text:e,points:[{time:k.time,price:Ve.high}]},{id:`rsi-line`,type:`horizontalLine`,pane:`rsi:14`,color:`#f59e0b`,lineStyle:`dashed`,points:[{time:k.time,price:50}]}],qe={cursor:`M4 3l10 5-4.5 1.5L8 14z`,trendLine:`M3 15L15 3`,ray:`M3 14L16 4`,extendedLine:`M1 16L17 2`,arrow:`M3 15L14 4M8 4h6v6`,horizontalLine:`M1 9h16`,verticalLine:`M9 1v16`,parallelChannel:`M2 11L11 3M7 16l9-8`,pitchfork:`M2 9h5M7 9l9-6M7 9h9M7 9l9 6`,rectangle:`M3 4h12v10H3z`,fibRetracement:`M2 3h14M2 7h14M2 10h14M2 15h14`,text:`M4 4h10M9 4v11`,longPosition:`M3 10h12M9 15V4M5.5 7.5L9 4l3.5 3.5`,shortPosition:`M3 8h12M9 3v11M5.5 10.5L9 14l3.5-3.5`,measure:`M9 2v14M5 6l4-4 4 4M5 12l4 4 4-4`},Je=Object.keys(qe),Ye=({d:e})=>(0,D.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 18 18`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,D.jsx)(`path`,{d:e})})})))()}function Ze(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,Qe.useRef)(null),[n,i]=(0,Qe.useState)(``),a=async()=>{let e=await t.current?.toBlob();if(!e)return;let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=`nvda-1d.png`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)};return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[(0,A.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>i(t.current?.toDataURL()??``),startIcon:(0,A.jsx)(et,{d:`M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z`}),children:e(`snapshot`)}),(0,A.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>void a(),startIcon:(0,A.jsx)(et,{d:`M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10`}),children:e(`downloadImage`)}),(0,A.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>void t.current?.requestFullscreen(),startIcon:(0,A.jsx)(et,{d:`M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4`}),children:e(`fullscreen`)})]}),(0,A.jsx)(_,{ref:t,bars:$e,timeframe:`1D`,symbol:e(`nvda`),indicators:[{type:`ma`,period:50},{type:`ma`,period:200},{type:`volume`,height:80}],watermark:e(`nvda`),ariaLabel:e(`exportAria`),height:400}),n&&(0,A.jsxs)(`figure`,{style:{margin:0,display:`grid`,gap:6},children:[(0,A.jsx)(`img`,{src:n,alt:e(`snapshotAlt`),style:{width:`min(100%, 420px)`,border:`1px solid var(--border-color)`,borderRadius:8}}),(0,A.jsx)(`figcaption`,{style:{fontSize:13,color:`var(--text-secondary-color)`},children:e(`snapshotCaption`)})]})]})}var Qe,A,$e,et;function tt(){return(tt=e((()=>{Qe=t(),i(),a(),v(),x(),A=n(),$e=g({count:400,timeframe:pe,seed:2718,price:870,volatility:.021,volume:32e6,market:`stock`}),et=({d:e})=>(0,A.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,A.jsx)(`path`,{d:e})})})))()}function nt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,j.useRef)(null),[i]=(0,j.useState)(()=>M.slice(-200)),[a,o]=(0,j.useState)(it),[s,c]=(0,j.useState)(!1),l=(0,j.useRef)(!1);return(0,rt.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,rt.jsx)(_,{ref:n,bars:i,timeframe:`1H`,symbol:e(`eurusd`),indicators:[{type:`ma`,period:50},{type:`atr`,height:80}],onHistoryRequest:({count:e})=>{l.current||e>=M.length||(l.current=!0,c(!0),setTimeout(()=>{let t=M.slice(Math.max(0,M.length-e-it),M.length-e);n.current?.prependBars(t),l.current=!1,c(!1),o(e+t.length)},600))},ariaLabel:e(`historyAria`),height:400}),(0,rt.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:s?e(`historyLoading`):e(`historyStatus`,{loaded:new Intl.NumberFormat(t.language).format(a),total:new Intl.NumberFormat(t.language).format(M.length)})})]})}var j,rt,M,it;function at(){return(at=e((()=>{j=t(),i(),v(),x(),rt=n(),M=g({count:3e3,timeframe:y,seed:57,price:1.0842,volatility:.0011,volume:3e3},5),it=200})))()}function ot(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,st.useRef)(null),[i]=(0,st.useState)(()=>fe({count:ct,timeframe:b,seed:99,price:21e3,volatility:6e-4,volume:40,start:Date.UTC(2023,0,2)})),[a,s]=(0,st.useState)(null);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`,flexWrap:`wrap`},children:[(0,N.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>n.current?.fitContent(),children:e(`showAll`)}),(0,N.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>n.current?.scrollToRealtime(),children:e(`latest`)}),(0,N.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e(`millionStatus`,{bars:new Intl.NumberFormat(t.language).format(ct),renderer:a??`…`})})]}),(0,N.jsx)(_,{ref:n,bars:i,timeframe:`1m`,precision:2,symbol:e(`nq`),indicators:[{type:`ema`,period:200},{type:`volume`,height:80}],onRendererChange:s,ariaLabel:e(`millionAria`),height:440})]})}var st,N,ct;function lt(){return(lt=e((()=>{st=t(),i(),a(),v(),x(),N=n(),ct=1e6})))()}function ut(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,P.useRef)(null),n=(0,P.useRef)(null),i=(0,P.useRef)(null),a=(0,P.useRef)(null),[o,s]=(0,P.useState)(!0),[c,l]=(0,P.useState)(!0);(0,P.useEffect)(()=>{let e=[t,n,i,a].map(e=>e.current?.getInstance()).filter(e=>!!e);return me(e,{crosshair:o,timeRange:c})},[o,c]);let u=[t,n,i,a];return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:20},children:[(0,F.jsx)(f,{size:`small`,checked:o,onChange:s,label:e(`syncCrosshair`)}),(0,F.jsx)(f,{size:`small`,checked:c,onChange:l,label:e(`syncTime`)})]}),(0,F.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:1,background:`var(--border-color)`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`},children:pt.map((t,n)=>(0,F.jsx)(`div`,{style:{background:`var(--background-color)`},children:(0,F.jsx)(_,{ref:u[n],bars:t.bars,timeframe:t.timeframe,symbol:e(t.symbol),indicators:[{type:`ema`,period:21}],highLowMarkers:!1,barSpacing:t.timeframe===`4H`?9:5,precision:t.symbol===`sol`?2:0,ariaLabel:e(`layoutAria`,{symbol:e(t.symbol),timeframe:t.timeframe}),height:260})},n))})]})}var P,F,dt,ft,pt;function mt(){return(mt=e((()=>{P=t(),i(),d(),v(),ae(),he(),x(),F=n(),dt=(e,t,n)=>g({count:500,timeframe:y,seed:e,price:t,volatility:n,volume:400}),ft=dt(61,63200,.005),pt=[{symbol:`btc`,bars:ft,timeframe:`1H`},{symbol:`eth`,bars:dt(62,2480,.0065),timeframe:`1H`},{symbol:`sol`,bars:dt(63,142,.009),timeframe:`1H`},{symbol:`btc`,bars:re(ft,`4H`),timeframe:`4H`}]})))()}function ht(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[n,i]=(0,I.useState)(St),[a,o]=(0,I.useState)(``),s=new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,maximumFractionDigits:1}),c=(0,I.useMemo)(()=>n.map(t=>({id:t.id,kind:`order`,side:t.side,title:e(yt[t.side][t.type]),lineStyle:t.type===`stop`?`dotted`:`dashed`,price:t.price,quantity:t.quantity,draggable:!0,cancellable:!0})),[n,e]);return(0,L.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,width:`100%`},children:[(0,L.jsx)(`div`,{style:{flex:`1 1 520px`,minWidth:0},children:(0,L.jsx)(_,{bars:gt,timeframe:`5m`,symbol:e(`btcPerp`),orderEntry:!0,priceLines:c,onOrderCreate:t=>{let n={id:`order-${Date.now().toString(36)}`,side:t.side,type:t.orderType,price:t.price,quantity:.1};i(e=>[...e,n]),o(e(bt[t.side][t.orderType],{price:s.format(t.price)}))},onOrderMove:t=>{i(e=>e.map(e=>e.id===t.id?{...e,price:t.price}:e)),o(e(`orderModified`,{from:s.format(t.previousPrice),to:s.format(t.price)}))},onOrderCancel:t=>{i(e=>e.filter(e=>e.id!==t.id)),o(e(`orderCancelled`,{price:s.format(t.line.price)}))},ariaLabel:e(`orderEntryAria`),height:440})}),(0,L.jsxs)(`div`,{style:{flex:`1 1 220px`,display:`grid`,alignContent:`start`,gap:8,fontSize:13},children:[(0,L.jsx)(`strong`,{children:e(`ordersTitle`)}),(0,L.jsx)(`table`,{style:{borderCollapse:`collapse`,width:`100%`,fontVariantNumeric:`tabular-nums`},children:(0,L.jsx)(`tbody`,{children:n.map((t,n)=>(0,L.jsxs)(`tr`,{style:{background:n%2?void 0:`var(--surface-subtle-color)`},children:[(0,L.jsx)(`td`,{style:{padding:`6px 8px`,color:t.side===`buy`?`var(--success-color)`:`var(--danger-color)`},children:e(yt[t.side][t.type])}),(0,L.jsx)(`td`,{style:{padding:`6px 8px`,textAlign:`end`,color:`var(--text-secondary-color)`},children:t.quantity}),(0,L.jsx)(`td`,{style:{padding:`6px 8px`,textAlign:`end`},children:s.format(t.price)})]},t.id))})}),(0,L.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:a||e(`orderEntryHint`)}),(0,L.jsx)(`strong`,{style:{marginTop:8},children:e(`keyboard.title`)}),(0,L.jsx)(`dl`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,alignItems:`center`,gap:`6px 10px`,margin:0},children:vt.map(t=>(0,L.jsxs)(I.Fragment,{children:[(0,L.jsx)(`dt`,{style:{display:`flex`,gap:4},children:e(`keyboard.${t}Keys`).split(` `).map(e=>(0,L.jsx)(`kbd`,{style:xt,children:e},e))}),(0,L.jsx)(`dd`,{style:{margin:0,color:`var(--text-secondary-color)`},children:e(`keyboard.${t}`)})]},t))})]})]})}var I,L,gt,_t,vt,yt,bt,xt,St;function Ct(){return(Ct=e((()=>{I=t(),i(),v(),x(),L=n(),gt=g({count:360,timeframe:5*b,seed:909,price:63480,volatility:.0018,volume:40},1),_t=gt[gt.length-1].close,vt=[`arm`,`type`,`move`,`confirm`,`cancel`,`select`,`remove`],yt={buy:{limit:`lines.limitBuy`,stop:`lines.stopBuy`},sell:{limit:`lines.limitSell`,stop:`lines.stopSell`}},bt={buy:{limit:`orderPlacedBuy`,stop:`orderPlacedBuyStop`},sell:{limit:`orderPlacedSell`,stop:`orderPlacedSellStop`}},xt={minWidth:20,padding:`0 5px`,border:`1px solid var(--border-color)`,borderRadius:4,background:`var(--surface-subtle-color)`,font:`inherit`,fontSize:11,lineHeight:`18px`,textAlign:`center`},St=[{id:`o1`,side:`buy`,type:`limit`,price:Math.round(_t*.996),quantity:.25},{id:`o2`,side:`sell`,type:`limit`,price:Math.round(_t*1.006),quantity:.1},{id:`o3`,side:`sell`,type:`stop`,price:Math.round(_t*.991),quantity:.05}]})))()}function wt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[n,i]=(0,R.useState)(kt),[a,o]=(0,R.useState)(null),s=(0,R.useMemo)(()=>Ot.map(({label:t,...r})=>({...r,price:n[r.id],title:e(`lines.${t}`)})),[n,e]),c=(0,R.useMemo)(()=>Dt.map(([t,n,r])=>{let i=B[t];return{time:i.time,side:n,price:Math.round(n===`buy`?(i.low+i.close)/2:(i.high+i.close)/2),text:e(n===`buy`?`buyMarker`:`sellMarker`,{quantity:r})}}),[e]),l=new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,maximumFractionDigits:0});return(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,width:`100%`},children:[(0,z.jsx)(`div`,{style:{flex:`1 1 520px`,minWidth:0},children:(0,z.jsx)(_,{bars:B,timeframe:`1H`,symbol:e(`btc`),priceLines:s,markers:c,onOrderMove:e=>{i(t=>({...t,[e.id]:e.price})),o(e)},precision:0,ariaLabel:e(`ordersAria`),height:460})}),(0,z.jsxs)(`div`,{style:{flex:`1 1 200px`,display:`grid`,alignContent:`start`,gap:8,fontSize:13},children:[(0,z.jsx)(`strong`,{children:e(`openOrders`)}),(0,z.jsx)(`table`,{style:{borderCollapse:`collapse`,width:`100%`,fontVariantNumeric:`tabular-nums`},children:(0,z.jsx)(`tbody`,{children:s.map((e,t)=>(0,z.jsxs)(`tr`,{style:{background:t%2?void 0:`var(--surface-subtle-color)`},children:[(0,z.jsx)(`td`,{style:{padding:`6px 8px`},children:e.title}),(0,z.jsx)(`td`,{style:{padding:`6px 8px`,textAlign:`end`,color:`var(--text-secondary-color)`},children:e.quantity??``}),(0,z.jsx)(`td`,{style:{padding:`6px 8px`,textAlign:`end`},children:l.format(e.price)})]},e.id))})}),(0,z.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:a?e(`orderMoved`,{name:s.find(e=>e.id===a.id)?.title??a.id,from:l.format(a.previousPrice),to:l.format(a.price)}):e(`dragHint`)})]})]})}var R,z,B,Tt,V,Et,Dt,H,Ot,kt;function At(){return(At=e((()=>{R=t(),i(),v(),x(),z=n(),B=g({count:320,timeframe:y,seed:5,price:63200,volatility:.0045,volume:260}),Tt=B[B.length-1].close,V=B[B.length-70],Et=Math.round(V.low+(V.close-V.low)/2),Dt=[[60,`buy`,.4],[95,`sell`,.4],[150,`buy`,1.2],[205,`sell`,1.2],[B.length-70,`buy`,.75]],H=e=>Math.round(e/10)*10,Ot=[{id:`position`,kind:`position`,side:`buy`,quantity:.75,label:`position`},{id:`tp`,kind:`takeProfit`,quantity:.75,draggable:!0,label:`takeProfit`},{id:`sl`,kind:`stopLoss`,quantity:.75,draggable:!0,label:`stopLoss`},{id:`buy`,kind:`order`,side:`buy`,quantity:.5,draggable:!0,label:`limitBuy`},{id:`sell`,kind:`order`,side:`sell`,quantity:.3,draggable:!0,label:`limitSell`},{id:`alert`,kind:`alert`,label:`alert`}],kt={position:Et,tp:H(Et*1.045),sl:H(Et*.975),buy:H(Tt*.985),sell:H(Tt*1.02),alert:H(Tt*1.035)}})))()}function jt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,U.useState)(`15m`),[i,a]=(0,U.useState)(`candles`),[s,c]=(0,U.useState)(`linear`),[l,u]=(0,U.useState)([`ma`,`vpvr`,`vol`,`macd`,`rsi`]),d=(0,U.useRef)(null),f=async()=>{let e=await d.current?.toBlob();if(!e)return;let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=`btcusdt-${t}.png`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)},p=(0,U.useMemo)(()=>t===`1m`?Mt:re(Mt,t),[t]),m=(0,U.useMemo)(()=>Object.keys(Ft).flatMap(e=>l.includes(e)?Ft[e]:[]),[l]),h=e=>u(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,W.jsxs)(`div`,{style:{width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`,background:`var(--surface-color)`},children:[(0,W.jsxs)(`div`,{style:It,role:`toolbar`,"aria-label":e(`toolbar`),children:[(0,W.jsx)(`strong`,{style:{padding:`0 8px 0 4px`,fontSize:14},children:e(`btc`)}),Nt.map(r=>(0,W.jsx)(o,{size:`small`,variant:`ghost`,active:r===t,"aria-pressed":r===t,onClick:()=>n(r),children:e(`timeframes.${r}`)},r)),(0,W.jsx)(`span`,{style:Lt}),(0,W.jsx)(ee,{size:`small`,style:{width:150},"aria-label":e(`chartStyle`),value:i,onChange:e=>a(e),children:Pt.map(t=>(0,W.jsx)(te,{value:t,children:e(`styles.${t}`)},t))}),(0,W.jsx)(`span`,{style:Lt}),Object.keys(Ft).map(t=>(0,W.jsx)(o,{size:`small`,variant:`ghost`,active:l.includes(t),"aria-pressed":l.includes(t),onClick:()=>h(t),children:e(`studies.${t}`)},t)),(0,W.jsx)(`span`,{style:{flex:1}}),[`linear`,`percent`,`log`].map(t=>(0,W.jsx)(o,{size:`small`,variant:`ghost`,active:s===t,"aria-pressed":s===t,onClick:()=>c(t),children:e(`scales.${t}`)},t)),(0,W.jsx)(`span`,{style:Lt}),(0,W.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`downloadImage`),title:e(`downloadImage`),onClick:()=>void f(),children:(0,W.jsx)(Rt,{d:`M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z`})}),(0,W.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`fullscreen`),title:e(`fullscreen`),onClick:()=>void d.current?.requestFullscreen(),children:(0,W.jsx)(Rt,{d:`M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4`})})]}),(0,W.jsx)(_,{ref:d,bars:p,timeframe:t,symbol:e(`btc`),chartStyle:i,scaleMode:s,indicators:m,volumeProfile:l.includes(`vpvr`),sessionBreaks:!0,watermark:`${e(`btc`)} · ${e(`timeframes.${t}`)}`,labels:{timeframe:e(`timeframes.${t}`)},ariaLabel:e(`terminalAria`),height:600})]})}var U,W,Mt,Nt,Pt,Ft,It,Lt,Rt;function zt(){return(zt=e((()=>{U=t(),i(),a(),h(),v(),ae(),x(),W=n(),Mt=g({count:129600,timeframe:b,seed:42,price:61850,volatility:.0011,volume:14},1),Nt=[`1m`,`5m`,`15m`,`1H`,`4H`,`1D`,`1W`],Pt=[`candles`,`hollowCandles`,`heikinAshi`,`bars`,`line`,`area`,`baseline`],Ft={ma:[{type:`ma`,period:7},{type:`ma`,period:25},{type:`ma`,period:99}],boll:[{type:`boll`}],ichimoku:[{type:`ichimoku`}],st:[{type:`supertrend`}],vpvr:[],vol:[{type:`volume`,maPeriod:20,height:90}],macd:[{type:`macd`}],rsi:[{type:`rsi`}],kdj:[{type:`kdj`}]},It={display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:4,padding:`6px 8px`,background:`var(--surface-subtle-color)`},Lt={width:1,height:20,margin:`0 6px`,background:`var(--border-color)`},Rt=({d:e})=>(0,W.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,W.jsx)(`path`,{d:e})})})))()}function Bt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,Vt.useState)(`redUp`);return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsx)(s,{"aria-label":e(`colorConvention`),direction:`horizontal`,value:t,onChange:e=>n(e),children:Ut.map(t=>(0,G.jsx)(u,{value:t,label:e(`conventions.${t}`)},t))}),(0,G.jsx)(_,{bars:Ht,timeframe:`1D`,symbol:e(`moutai`),colorConvention:t,utcOffset:480,indicators:[{type:`ma`,period:5},{type:`ma`,period:10},{type:`ma`,period:20},{type:`ma`,period:60},{type:`volume`,maPeriod:5,height:90},{type:`kdj`,height:100}],barSpacing:7,ariaLabel:e(`redUpAria`),height:540})]})}var Vt,G,Ht,Ut;function Wt(){return(Wt=e((()=>{Vt=t(),i(),c(),l(),v(),x(),G=n(),Ht=g({count:300,timeframe:pe,seed:600519,price:1688,volatility:.017,volume:32e5,market:`stock`,start:Date.UTC(2024,8,2)}),Ut=[`redUp`,`auto`,`greenUp`]})))()}function Gt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,Kt.useRef)(null),[n,i]=(0,Kt.useState)(null),[a,s]=(0,Kt.useState)(5),c=!!n?.active,l=!!n?.playing,u=n?n.picking?e(`replayPicking`):n.active?e(`replayProgress`,{index:n.index,total:n.total}):e(`replayIdle`):e(`replayIdle`);return(0,K.jsxs)(`div`,{style:{width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`},children:[(0,K.jsxs)(`div`,{role:`toolbar`,"aria-label":e(`replayControls`),style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:6,padding:`6px 10px`,fontSize:13,background:`var(--surface-subtle-color)`},children:[(0,K.jsx)(o,{size:`small`,variant:c||n?.picking?`ghost`:`solid`,onClick:()=>t.current?.startReplay(),children:e(c?`replayRestart`:`replayStart`)}),(0,K.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,disabled:!c,"aria-label":e(l?`pause`:`play`),title:e(l?`pause`:`play`),onClick:()=>l?t.current?.replayPause():t.current?.replayPlay(a),children:(0,K.jsx)(Yt,{d:l?`M4 3h3v10H4zM9 3h3v10H9z`:`M4 2.5l9 5.5-9 5.5z`})}),(0,K.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,disabled:!c||l,"aria-label":e(`replayStep`),title:e(`replayStep`),onClick:()=>t.current?.replayStep(),children:(0,K.jsx)(Yt,{d:`M3 2.5l7 5.5-7 5.5zM11 3h2v10h-2z`})}),(0,K.jsx)(ee,{size:`small`,style:{width:120},"aria-label":e(`replaySpeed`),value:String(a),onChange:e=>{s(Number(e)),l&&t.current?.replayPlay(Number(e))},children:Jt.map(t=>(0,K.jsx)(te,{value:String(t),children:e(`barsPerSecond`,{count:t})},t))}),(0,K.jsx)(o,{size:`small`,variant:`ghost`,disabled:!c&&!n?.picking,onClick:()=>t.current?.stopReplay(),children:e(`replayExit`)}),(0,K.jsx)(`span`,{role:`status`,style:{marginInlineStart:`auto`,color:`var(--text-secondary-color)`},children:u})]}),(0,K.jsx)(_,{ref:t,bars:qt,timeframe:`1H`,symbol:e(`eth`),indicators:[{type:`ema`,period:20},{type:`ema`,period:50},{type:`volume`,height:80}],onReplayChange:i,ariaLabel:e(`replayAria`),height:460})]})}var Kt,K,qt,Jt,Yt;function Xt(){return(Xt=e((()=>{Kt=t(),i(),a(),h(),v(),x(),K=n(),qt=g({count:900,timeframe:y,seed:314,price:2480,volatility:.006,volume:800}),Jt=[2,5,10,30],Yt=({d:e})=>(0,K.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`currentColor`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,K.jsx)(`path`,{d:e})})})))()}function Zt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,Qt.useState)(`America/New_York`),[i,a]=(0,Qt.useState)(!0),o=(0,Qt.useMemo)(()=>[{type:`vwap`},{type:`volume`,height:80}],[]);return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:20,fontSize:13},children:[(0,q.jsx)(ee,{size:`small`,style:{width:220},"aria-label":e(`timeZone`),value:t,onChange:n,children:en.map(t=>(0,q.jsx)(te,{value:t,children:e(`zones.${t.replace(`/`,`_`)}`)},t))}),(0,q.jsx)(f,{size:`small`,checked:i,onChange:a,label:e(`sessionBreaks`)})]}),(0,q.jsx)(_,{bars:$t,timeframe:`5m`,symbol:e(`aapl`),timeZone:t,sessionBreaks:i,indicators:o,barSpacing:4,ariaLabel:e(`sessionsAria`),height:420})]})}var Qt,q,$t,en;function tn(){return(tn=e((()=>{Qt=t(),i(),h(),d(),v(),x(),q=n(),$t=g({count:780,timeframe:5*b,seed:1515,price:228,volatility:.0016,volume:52e3,market:`stock`,start:Date.UTC(2025,0,6)}).map(e=>({...e,time:e.time+5*y})),en=[`America/New_York`,`Europe/London`,`Asia/Shanghai`,`Asia/Tokyo`,`UTC`]})))()}function nn(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,J.useRef)(null),[i]=(0,J.useState)(an),[a,s]=(0,J.useState)(!0),[c,l]=(0,J.useState)({rate:0,price:0});(0,J.useEffect)(()=>{if(!a)return;let e=n.current?.getBar((n.current?.getBarCount()??0)-1),t=e?{...e}:{...i[i.length-1]},r=de(Date.now()%1e3,t.close,12e-5),o=0,s=performance.now(),c=setInterval(()=>{let e=r(),i=Math.floor(Date.now()/b)*b,a=Math.round(e.price*100)/100;t=i===t.time?{...t,high:Math.max(t.high,a),low:Math.min(t.low,a),close:a,volume:(t.volume??0)+e.size}:{time:i,open:t.close,high:a,low:a,close:a,volume:e.size},n.current?.update(t),o++},rn),u=setInterval(()=>{let e=performance.now();l({rate:o*1e3/(e-s),price:t.close}),o=0,s=e},1e3);return()=>{clearInterval(c),clearInterval(u)}},[a,i]);let u=new Intl.NumberFormat(t.language,{minimumFractionDigits:2,maximumFractionDigits:2});return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,flexWrap:`wrap`},children:[(0,Y.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>s(e=>!e),children:e(a?`pause`:`resume`)}),(0,Y.jsx)(`span`,{role:`status`,style:{fontVariantNumeric:`tabular-nums`,color:`var(--text-secondary-color)`},children:a?e(`streamStatus`,{rate:Math.round(c.rate),price:c.price?u.format(c.price):`–`}):e(`paused`)})]}),(0,Y.jsx)(_,{ref:n,bars:i,timeframe:`1m`,symbol:e(`eth`),indicators:[{type:`ema`,period:9},{type:`ema`,period:21},{type:`volume`,height:90}],countdown:!0,barSpacing:9,ariaLabel:e(`streamAria`),height:440})]})}var J,Y,rn,an;function on(){return(on=e((()=>{J=t(),i(),a(),v(),x(),Y=n(),rn=20,an=()=>{let e=Math.floor(Date.now()/b)*b;return g({count:400,timeframe:b,seed:7,price:3420,volatility:.0012,volume:120,start:e-399*b})}})))()}function sn(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,X.useRef)(null),[{bars:i,next:a}]=(0,X.useState)(un),[o,s]=(0,X.useState)(i.length);return(0,X.useEffect)(()=>{let e=i[i.length-1],t=i.length,r=setInterval(()=>{let r=1+Math.floor(Math.random()*2);for(let i=0;i<r;i++){let r=a(),i=Math.max(Date.now(),e.time+1),o=Math.round(r.price*100)/100;e=ln(i,e.close,o,r.size*40),n.current?.update(e),t++}},15),o=setInterval(()=>s(t),500);return()=>{clearInterval(r),clearInterval(o)}},[i,a]),(0,cn.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,cn.jsx)(_,{ref:n,bars:i,symbol:e(`sol`),chartStyle:`area`,indicators:[{type:`vwap`,reset:`none`},{type:`volume`,height:80}],barSpacing:4,rightOffset:12,highLowMarkers:!1,ariaLabel:e(`tickAria`),height:380}),(0,cn.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:e(`tickStatus`,{trades:new Intl.NumberFormat(t.language).format(o)})})]})}var X,cn,ln,un;function dn(){return(dn=e((()=>{X=t(),i(),v(),x(),cn=n(),ln=(e,t,n,r)=>({time:e,open:t,high:Math.max(t,n),low:Math.min(t,n),close:n,volume:r}),un=()=>{let e=de(3,172.4,18e-5),t=[],n=Date.now()-6e3,r=172.4;for(let i=0;i<600;i++){let i=e();n+=10;let a=Math.round(i.price*100)/100;t.push(ln(n,r,a,i.size*40)),r=a}return{bars:t,next:e}}})))()}function fn(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[n,i]=(0,Z.useState)(!0),[a,o]=(0,Z.useState)(48),[c,l]=(0,Z.useState)(`right`),[d,p]=(0,Z.useState)(null),m=(0,Z.useMemo)(()=>({rows:a,side:c}),[a,c]),h=(0,Z.useMemo)(()=>{if(!d)return null;let n=oe(pn,{...d,rows:a});if(n.poc<0)return null;let r=new Intl.NumberFormat(t.language,{maximumFractionDigits:0}),i=e=>n.low+e*n.step;return e(`profileStatus`,{poc:r.format(i(n.poc+.5)),low:r.format(i(n.valueAreaFrom)),high:r.format(i(n.valueAreaTo+1))})},[d,a,e,t.language]);return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Q.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:20,fontSize:13},children:[(0,Q.jsx)(f,{size:`small`,checked:n,onChange:i,label:e(`volumeProfile`)}),(0,Q.jsx)(s,{"aria-label":e(`profileRows`),direction:`horizontal`,value:String(a),onChange:e=>o(Number(e)),children:mn.map(t=>(0,Q.jsx)(u,{value:String(t),label:e(`rowCount`,{count:t})},t))}),(0,Q.jsxs)(s,{"aria-label":e(`profileSide`),direction:`horizontal`,value:c,onChange:e=>l(e),children:[(0,Q.jsx)(u,{value:`right`,label:e(`sides.right`)}),(0,Q.jsx)(u,{value:`left`,label:e(`sides.left`)})]})]}),(0,Q.jsx)(_,{bars:pn,timeframe:`15m`,symbol:e(`btc`),volumeProfile:n?m:!1,indicators:[{type:`volume`,overlay:!0}],onVisibleRangeChange:e=>{let t=Math.max(0,Math.ceil(e.from)),n=Math.min(pn.close.length-1,Math.floor(e.to));p(e=>e&&e.from===t&&e.to===n?e:{from:t,to:n})},barSpacing:5,precision:0,ariaLabel:e(`profileAria`),height:460}),(0,Q.jsx)(`span`,{role:`status`,style:{fontSize:13,color:`var(--text-secondary-color)`},children:h})]})}var Z,Q,pn,mn;function hn(){return(hn=e((()=>{Z=t(),i(),c(),l(),d(),v(),ae(),x(),Q=n(),pn=fe({count:1344,timeframe:15*b,seed:77,price:63400,volatility:.0028,volume:120}),mn=[24,48,96]})))()}var gn;function _n(){return(_n=e((()=>{gn=`import { useState } from "react";
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
`})))()}var vn;function yn(){return(yn=e((()=>{vn=`import { useMemo, useState } from "react";
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
`})))()}var bn;function xn(){return(xn=e((()=>{bn=`import { useTranslation } from "react-i18next";
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
          background: "var(--surface-subtle-color)",
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
`})))()}var Sn;function Cn(){return(Cn=e((()=>{Sn=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Switch } from "minerva-design";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingDrawing,
  type TradingDrawingTool,
  type TradingUndoState,
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

// drawings made from the data: a channel around the last rally, a long
// position on the last bar, a note and a line on the RSI pane
const recent = bars.slice(-100);
const bottom = recent.reduce((a, b) => (b.low < a.low ? b : a));
const rally = recent.slice(recent.indexOf(bottom));
const top = rally.reduce((a, b) => (b.high > a.high ? b : a));
const secondLow = rally
  .slice(Math.floor(rally.length / 2))
  .reduce((a, b) => (b.low < a.low ? b : a));
const lastBar = bars[bars.length - 1];
const entry = Math.round(lastBar.close);
const end = lastBar.time + 16 * 4 * HOUR;

const initialDrawings = (note: string): TradingDrawing[] => [
  {
    id: "channel",
    type: "parallelChannel",
    color: "#a855f7",
    points: [
      { time: bottom.time, price: bottom.low },
      { time: secondLow.time, price: secondLow.low },
      { time: top.time, price: top.high },
    ],
  },
  {
    id: "long",
    type: "longPosition",
    quantity: 2,
    points: [
      { time: lastBar.time, price: entry },
      { time: end, price: Math.round(entry * 1.035) },
      { time: end, price: Math.round(entry * 0.9825) },
    ],
  },
  {
    id: "note",
    type: "text",
    color: "#0ea5e9",
    text: note,
    points: [{ time: bottom.time, price: top.high }],
  },
  {
    id: "rsi-line",
    type: "horizontalLine",
    pane: "rsi:14",
    color: "#f59e0b",
    lineStyle: "dashed",
    points: [{ time: bottom.time, price: 50 }],
  },
];

/** 18 px icons of the tools */
const ICONS: Record<TradingDrawingTool, string> = {
  cursor: "M4 3l10 5-4.5 1.5L8 14z",
  trendLine: "M3 15L15 3",
  ray: "M3 14L16 4",
  extendedLine: "M1 16L17 2",
  arrow: "M3 15L14 4M8 4h6v6",
  horizontalLine: "M1 9h16",
  verticalLine: "M9 1v16",
  parallelChannel: "M2 11L11 3M7 16l9-8",
  pitchfork: "M2 9h5M7 9l9-6M7 9h9M7 9l9 6",
  rectangle: "M3 4h12v10H3z",
  fibRetracement: "M2 3h14M2 7h14M2 10h14M2 15h14",
  text: "M4 4h10M9 4v11",
  longPosition: "M3 10h12M9 15V4M5.5 7.5L9 4l3.5 3.5",
  shortPosition: "M3 8h12M9 3v11M5.5 10.5L9 14l3.5-3.5",
  measure: "M9 2v14M5 6l4-4 4 4M5 12l4 4 4-4",
};

const TOOLS = Object.keys(ICONS) as TradingDrawingTool[];

const Icon = ({ d }: { d: string }) => (
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
    <path d={d} />
  </svg>
);

export default function DrawingToolsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [tool, setTool] = useState<TradingDrawingTool>("cursor");
  const [keep, setKeep] = useState(false);
  const [fitDrawings, setFitDrawings] = useState(true);
  const [history, setHistory] = useState<TradingUndoState>({
    canUndo: false,
    canRedo: false,
  });
  const [drawings, setDrawings] = useState<readonly TradingDrawing[]>(() =>
    initialDrawings(t("noteText")),
  );

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
          background: "var(--surface-subtle-color)",
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
            <Icon d={ICONS[name]} />
          </Button>
        ))}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            padding: "6px 10px",
            fontSize: 13,
            background: "var(--surface-subtle-color)",
          }}
        >
          <Button
            size="small"
            variant="ghost"
            shape="square"
            aria-label={t("undo")}
            title={t("undo")}
            disabled={!history.canUndo}
            onClick={() => chart.current?.undo()}
          >
            <Icon d="M7 4L3 8l4 4M3 8h8a4 4 0 0 1 0 8H9" />
          </Button>
          <Button
            size="small"
            variant="ghost"
            shape="square"
            aria-label={t("redo")}
            title={t("redo")}
            disabled={!history.canRedo}
            onClick={() => chart.current?.redo()}
          >
            <Icon d="M11 4l4 4-4 4M15 8H7a4 4 0 0 0 0 8h2" />
          </Button>
          <Switch
            size="small"
            checked={keep}
            onChange={setKeep}
            label={t("keepDrawing")}
          />
          <Switch
            size="small"
            checked={fitDrawings}
            onChange={setFitDrawings}
            label={t("fitDrawings")}
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
          ref={chart}
          bars={bars}
          timeframe="4H"
          symbol={t("eth")}
          drawings={drawings}
          onDrawingsChange={setDrawings}
          onUndoChange={setHistory}
          drawingMode={tool}
          keepDrawingMode={keep}
          // the price scale keeps the visible drawings in view
          autoscaleIncludesDrawings={fitDrawings}
          onDrawingToolChange={setTool}
          indicators={[
            { type: "ema", period: 50 },
            { type: "rsi", height: 100 },
          ]}
          rightOffset={20}
          barSpacing={5}
          ariaLabel={t("drawingAria")}
          height={560}
        />
      </div>
    </div>
  );
}
`})))()}var wn;function Tn(){return(Tn=e((()=>{wn=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { TradingChart, type TradingChartHandle } from "minerva-design/charts";
import { DAY, generateBars } from "../data";

const bars = generateBars({
  count: 400,
  timeframe: DAY,
  seed: 2_718,
  price: 870,
  volatility: 0.021,
  volume: 3.2e7,
  market: "stock",
});

const Icon = ({ d }: { d: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export default function ExportDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [preview, setPreview] = useState("");

  const download = async () => {
    const blob = await chart.current?.toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nvda-1d.png";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => setPreview(chart.current?.toDataURL() ?? "")}
          startIcon={
            <Icon d="M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          }
        >
          {t("snapshot")}
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => void download()}
          startIcon={<Icon d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" />}
        >
          {t("downloadImage")}
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => void chart.current?.requestFullscreen()}
          startIcon={<Icon d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />}
        >
          {t("fullscreen")}
        </Button>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1D"
        symbol={t("nvda")}
        indicators={[
          { type: "ma", period: 50 },
          { type: "ma", period: 200 },
          { type: "volume", height: 80 },
        ]}
        watermark={t("nvda")}
        ariaLabel={t("exportAria")}
        height={400}
      />
      {preview && (
        <figure style={{ margin: 0, display: "grid", gap: 6 }}>
          <img
            src={preview}
            alt={t("snapshotAlt")}
            style={{
              width: "min(100%, 420px)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
            }}
          />
          <figcaption
            style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
          >
            {t("snapshotCaption")}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
`})))()}var En;function Dn(){return(Dn=e((()=>{En=`import { useRef, useState } from "react";
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
`})))()}var On;function kn(){return(kn=e((()=>{On=`import { useRef, useState } from "react";
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
`})))()}var An;function jn(){return(jn=e((()=>{An=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingChartHandle,
  type TradingChartInstance,
} from "minerva-design/charts";
import { syncCharts } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../data";

const hourly = (seed: number, price: number, volatility: number) =>
  generateBars({
    count: 500,
    timeframe: HOUR,
    seed,
    price,
    volatility,
    volume: 400,
  });

const btc = hourly(61, 63_200, 0.005);

// four charts over the same hours; the last one in 4-hour bars
const PANELS = [
  { symbol: "btc", bars: btc, timeframe: "1H" },
  { symbol: "eth", bars: hourly(62, 2_480, 0.0065), timeframe: "1H" },
  { symbol: "sol", bars: hourly(63, 142, 0.009), timeframe: "1H" },
  { symbol: "btc", bars: resampleBars(btc, "4H"), timeframe: "4H" },
] as const;

export default function MultiChartDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const first = useRef<TradingChartHandle>(null);
  const second = useRef<TradingChartHandle>(null);
  const third = useRef<TradingChartHandle>(null);
  const fourth = useRef<TradingChartHandle>(null);
  const [crosshair, setCrosshair] = useState(true);
  const [timeRange, setTimeRange] = useState(true);

  useEffect(() => {
    const charts = [first, second, third, fourth]
      .map((ref) => ref.current?.getInstance())
      .filter((chart): chart is TradingChartInstance => !!chart);
    return syncCharts(charts, { crosshair, timeRange });
  }, [crosshair, timeRange]);

  const refs = [first, second, third, fourth];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <Switch
          size="small"
          checked={crosshair}
          onChange={setCrosshair}
          label={t("syncCrosshair")}
        />
        <Switch
          size="small"
          checked={timeRange}
          onChange={setTimeRange}
          label={t("syncTime")}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 1,
          background: "var(--border-color)",
          border: "1px solid var(--border-color)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {PANELS.map((panel, i) => (
          <div key={i} style={{ background: "var(--background-color)" }}>
            <TradingChart
              ref={refs[i]}
              bars={panel.bars}
              timeframe={panel.timeframe}
              symbol={t(panel.symbol)}
              indicators={[{ type: "ema", period: 21 }]}
              highLowMarkers={false}
              barSpacing={panel.timeframe === "4H" ? 9 : 5}
              precision={panel.symbol === "sol" ? 2 : 0}
              ariaLabel={t("layoutAria", {
                symbol: t(panel.symbol),
                timeframe: panel.timeframe,
              })}
              height={260}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
`})))()}var Mn;function Nn(){return(Nn=e((()=>{Mn=`import { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingOrderCreateEvent,
  type TradingOrderType,
  type TradingPriceLine,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

const bars = generateBars(
  {
    count: 360,
    timeframe: 5 * MINUTE,
    seed: 909,
    price: 63_480,
    volatility: 0.0018,
    volume: 40,
  },
  1,
);

const last = bars[bars.length - 1].close;

interface Order {
  id: string;
  side: "buy" | "sell";
  type: TradingOrderType;
  price: number;
  quantity: number;
}

// keyboard order entry: focus the chart (Tab), then these keys
const SHORTCUTS = [
  "arm",
  "type",
  "move",
  "confirm",
  "cancel",
  "select",
  "remove",
];

const LINE_TITLES = {
  buy: { limit: "lines.limitBuy", stop: "lines.stopBuy" },
  sell: { limit: "lines.limitSell", stop: "lines.stopSell" },
} as const;

const PLACED = {
  buy: { limit: "orderPlacedBuy", stop: "orderPlacedBuyStop" },
  sell: { limit: "orderPlacedSell", stop: "orderPlacedSellStop" },
} as const;

const kbd: React.CSSProperties = {
  minWidth: 20,
  padding: "0 5px",
  border: "1px solid var(--border-color)",
  borderRadius: 4,
  background: "var(--surface-subtle-color)",
  font: "inherit",
  fontSize: 11,
  lineHeight: "18px",
  textAlign: "center",
};

const INITIAL: Order[] = [
  {
    id: "o1",
    side: "buy",
    type: "limit",
    price: Math.round(last * 0.996),
    quantity: 0.25,
  },
  {
    id: "o2",
    side: "sell",
    type: "limit",
    price: Math.round(last * 1.006),
    quantity: 0.1,
  },
  {
    id: "o3",
    side: "sell",
    type: "stop",
    price: Math.round(last * 0.991),
    quantity: 0.05,
  },
];

export default function OrderEntryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [orders, setOrders] = useState<Order[]>(INITIAL);
  const [log, setLog] = useState("");

  const usd = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  });

  const lines = useMemo(
    (): TradingPriceLine[] =>
      orders.map((order) => ({
        id: order.id,
        kind: "order",
        side: order.side,
        title: t(LINE_TITLES[order.side][order.type]),
        lineStyle: order.type === "stop" ? "dotted" : "dashed",
        price: order.price,
        quantity: order.quantity,
        draggable: true,
        cancellable: true,
      })),
    [orders, t],
  );

  const onCreate = (event: TradingOrderCreateEvent) => {
    const order = {
      id: \`order-\${Date.now().toString(36)}\`,
      side: event.side,
      type: event.orderType,
      price: event.price,
      quantity: 0.1,
    };
    setOrders((list) => [...list, order]);
    setLog(
      t(PLACED[event.side][event.orderType], {
        price: usd.format(event.price),
      }),
    );
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: "100%" }}>
      <div style={{ flex: "1 1 520px", minWidth: 0 }}>
        <TradingChart
          bars={bars}
          timeframe="5m"
          symbol={t("btcPerp")}
          orderEntry
          priceLines={lines}
          onOrderCreate={onCreate}
          onOrderMove={(event) => {
            setOrders((list) =>
              list.map((order) =>
                order.id === event.id
                  ? { ...order, price: event.price }
                  : order,
              ),
            );
            setLog(
              t("orderModified", {
                from: usd.format(event.previousPrice),
                to: usd.format(event.price),
              }),
            );
          }}
          onOrderCancel={(event) => {
            setOrders((list) => list.filter((order) => order.id !== event.id));
            setLog(
              t("orderCancelled", { price: usd.format(event.line.price) }),
            );
          }}
          ariaLabel={t("orderEntryAria")}
          height={440}
        />
      </div>
      <div
        style={{
          flex: "1 1 220px",
          display: "grid",
          alignContent: "start",
          gap: 8,
          fontSize: 13,
        }}
      >
        <strong>{t("ordersTitle")}</strong>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order.id}
                style={{
                  background: i % 2 ? undefined : "var(--surface-subtle-color)",
                }}
              >
                <td
                  style={{
                    padding: "6px 8px",
                    color:
                      order.side === "buy"
                        ? "var(--success-color)"
                        : "var(--danger-color)",
                  }}
                >
                  {t(LINE_TITLES[order.side][order.type])}
                </td>
                <td
                  style={{
                    padding: "6px 8px",
                    textAlign: "end",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {order.quantity}
                </td>
                <td style={{ padding: "6px 8px", textAlign: "end" }}>
                  {usd.format(order.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {log || t("orderEntryHint")}
        </span>
        <strong style={{ marginTop: 8 }}>{t("keyboard.title")}</strong>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "6px 10px",
            margin: 0,
          }}
        >
          {SHORTCUTS.map((name) => (
            <Fragment key={name}>
              <dt style={{ display: "flex", gap: 4 }}>
                {t(\`keyboard.\${name}Keys\`)
                  .split(" ")
                  .map((key) => (
                    <kbd key={key} style={kbd}>
                      {key}
                    </kbd>
                  ))}
              </dt>
              <dd style={{ margin: 0, color: "var(--text-secondary-color)" }}>
                {t(\`keyboard.\${name}\`)}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}
`})))()}var Pn;function Fn(){return(Fn=e((()=>{Pn=`import { useMemo, useState } from "react";
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
            {lines.map((line, i) => (
              <tr
                key={line.id}
                style={{
                  background: i % 2 ? undefined : "var(--surface-subtle-color)",
                }}
              >
                <td style={{ padding: "6px 8px" }}>{line.title}</td>
                <td
                  style={{
                    padding: "6px 8px",
                    textAlign: "end",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {line.quantity ?? ""}
                </td>
                <td style={{ padding: "6px 8px", textAlign: "end" }}>
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
`})))()}var In;function Ln(){return(Ln=e((()=>{In=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select, SelectItem } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingChartHandle,
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
  ichimoku: [{ type: "ichimoku" }],
  st: [{ type: "supertrend" }],
  vpvr: [],
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
  background: "var(--surface-subtle-color)",
};

const divider: React.CSSProperties = {
  width: 1,
  height: 20,
  margin: "0 6px",
  background: "var(--border-color)",
};

const Icon = ({ d }: { d: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export default function ProTerminalDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [timeframe, setTimeframe] = useState<Timeframe>("15m");
  const [chartStyle, setChartStyle] = useState<TradingChartStyle>("candles");
  const [scaleMode, setScaleMode] = useState<TradingScaleMode>("linear");
  const [studies, setStudies] = useState(["ma", "vpvr", "vol", "macd", "rsi"]);
  const chart = useRef<TradingChartHandle>(null);

  const download = async () => {
    const blob = await chart.current?.toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = \`btcusdt-\${timeframe}.png\`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

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
        <span style={divider} />
        <Button
          size="small"
          variant="ghost"
          shape="square"
          aria-label={t("downloadImage")}
          title={t("downloadImage")}
          onClick={() => void download()}
        >
          <Icon d="M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </Button>
        <Button
          size="small"
          variant="ghost"
          shape="square"
          aria-label={t("fullscreen")}
          title={t("fullscreen")}
          onClick={() => void chart.current?.requestFullscreen()}
        >
          <Icon d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
        </Button>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe={timeframe}
        symbol={t("btc")}
        chartStyle={chartStyle}
        scaleMode={scaleMode}
        indicators={indicators}
        volumeProfile={studies.includes("vpvr")}
        sessionBreaks
        watermark={\`\${t("btc")} · \${t(\`timeframes.\${timeframe}\`)}\`}
        labels={{ timeframe: t(\`timeframes.\${timeframe}\`) }}
        ariaLabel={t("terminalAria")}
        height={600}
      />
    </div>
  );
}
`})))()}var Rn;function zn(){return(zn=e((()=>{Rn=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TradingChart,
  type TradingColorConvention,
} from "minerva-design/charts";
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

const CONVENTIONS: TradingColorConvention[] = ["redUp", "auto", "greenUp"];

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  // "auto": red up when the page is in Chinese or Japanese
  const [convention, setConvention] = useState<TradingColorConvention>("redUp");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("colorConvention")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(value as TradingColorConvention)}
      >
        {CONVENTIONS.map((value) => (
          <Radio key={value} value={value} label={t(\`conventions.\${value}\`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("moutai")}
        colorConvention={convention}
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
    </div>
  );
}
`})))()}var Bn;function Vn(){return(Vn=e((()=>{Bn=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select, SelectItem } from "minerva-design";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingReplayState,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

const bars = generateBars({
  count: 900,
  timeframe: HOUR,
  seed: 314,
  price: 2_480,
  volatility: 0.006,
  volume: 800,
});

const SPEEDS = [2, 5, 10, 30] as const;

const Icon = ({ d }: { d: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export default function ReplayDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [state, setState] = useState<TradingReplayState | null>(null);
  const [speed, setSpeed] = useState(5);

  const active = !!state?.active;
  const playing = !!state?.playing;

  const status = !state
    ? t("replayIdle")
    : state.picking
      ? t("replayPicking")
      : state.active
        ? t("replayProgress", { index: state.index, total: state.total })
        : t("replayIdle");

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div
        role="toolbar"
        aria-label={t("replayControls")}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          fontSize: 13,
          background: "var(--surface-subtle-color)",
        }}
      >
        <Button
          size="small"
          variant={active || state?.picking ? "ghost" : "solid"}
          onClick={() => chart.current?.startReplay()}
        >
          {active ? t("replayRestart") : t("replayStart")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          shape="square"
          disabled={!active}
          aria-label={playing ? t("pause") : t("play")}
          title={playing ? t("pause") : t("play")}
          onClick={() =>
            playing
              ? chart.current?.replayPause()
              : chart.current?.replayPlay(speed)
          }
        >
          <Icon
            d={playing ? "M4 3h3v10H4zM9 3h3v10H9z" : "M4 2.5l9 5.5-9 5.5z"}
          />
        </Button>
        <Button
          size="small"
          variant="ghost"
          shape="square"
          disabled={!active || playing}
          aria-label={t("replayStep")}
          title={t("replayStep")}
          onClick={() => chart.current?.replayStep()}
        >
          <Icon d="M3 2.5l7 5.5-7 5.5zM11 3h2v10h-2z" />
        </Button>
        <Select
          size="small"
          style={{ width: 120 }}
          aria-label={t("replaySpeed")}
          value={String(speed)}
          onChange={(value) => {
            setSpeed(Number(value));
            if (playing) chart.current?.replayPlay(Number(value));
          }}
        >
          {SPEEDS.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("barsPerSecond", { count: value })}
            </SelectItem>
          ))}
        </Select>
        <Button
          size="small"
          variant="ghost"
          disabled={!active && !state?.picking}
          onClick={() => chart.current?.stopReplay()}
        >
          {t("replayExit")}
        </Button>
        <span
          role="status"
          style={{
            marginInlineStart: "auto",
            color: "var(--text-secondary-color)",
          }}
        >
          {status}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1H"
        symbol={t("eth")}
        indicators={[
          { type: "ema", period: 20 },
          { type: "ema", period: 50 },
          { type: "volume", height: 80 },
        ]}
        onReplayChange={setState}
        ariaLabel={t("replayAria")}
        height={460}
      />
    </div>
  );
}
`})))()}var Hn;function Un(){return(Un=e((()=>{Hn=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem, Switch } from "minerva-design";
import { TradingChart, type TradingBar } from "minerva-design/charts";
import { HOUR, MINUTE, generateBars } from "../data";

// ten New York sessions of 5-minute bars (9:30-16:00 EST = 14:30-21:00 UTC)
const bars: TradingBar[] = generateBars({
  count: 780,
  timeframe: 5 * MINUTE,
  seed: 1_515,
  price: 228,
  volatility: 0.0016,
  volume: 52_000,
  market: "stock",
  start: Date.UTC(2025, 0, 6),
}).map((bar) => ({ ...bar, time: bar.time + 5 * HOUR }));

const ZONES = [
  "America/New_York",
  "Europe/London",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "UTC",
] as const;

export default function SessionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [zone, setZone] = useState<string>("America/New_York");
  const [breaks, setBreaks] = useState(true);
  const indicators = useMemo(
    () => [{ type: "vwap" as const }, { type: "volume" as const, height: 80 }],
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
          fontSize: 13,
        }}
      >
        <Select
          size="small"
          style={{ width: 220 }}
          aria-label={t("timeZone")}
          value={zone}
          onChange={setZone}
        >
          {ZONES.map((name) => (
            <SelectItem key={name} value={name}>
              {t(\`zones.\${name.replace("/", "_")}\`)}
            </SelectItem>
          ))}
        </Select>
        <Switch
          size="small"
          checked={breaks}
          onChange={setBreaks}
          label={t("sessionBreaks")}
        />
      </div>
      <TradingChart
        bars={bars}
        timeframe="5m"
        symbol={t("aapl")}
        timeZone={zone}
        sessionBreaks={breaks}
        indicators={indicators}
        barSpacing={4}
        ariaLabel={t("sessionsAria")}
        height={420}
      />
    </div>
  );
}
`})))()}var Wn;function Gn(){return(Gn=e((()=>{Wn=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Kn;function qn(){return(qn=e((()=>{Kn=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Jn;function Yn(){return(Yn=e((()=>{Jn=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import {
  TradingChart,
  type TradingVisibleRange,
  type TradingVolumeProfileOptions,
} from "minerva-design/charts";
import { volumeProfile } from "minerva-design/charts/core";
import { MINUTE, generateColumns } from "../data";

// two weeks of 15-minute bars
const bars = generateColumns({
  count: 1_344,
  timeframe: 15 * MINUTE,
  seed: 77,
  price: 63_400,
  volatility: 0.0028,
  volume: 120,
});

const ROWS = [24, 48, 96] as const;

export default function VolumeProfileDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [enabled, setEnabled] = useState(true);
  const [rows, setRows] = useState<number>(48);
  const [side, setSide] = useState<"right" | "left">("right");
  const [range, setRange] = useState<{ from: number; to: number } | null>(null);

  const profileOptions = useMemo(
    (): TradingVolumeProfileOptions => ({ rows, side }),
    [rows, side],
  );

  // the same numbers as the chart, from the pure function
  const summary = useMemo(() => {
    if (!range) return null;
    const profile = volumeProfile(bars, { ...range, rows });
    if (profile.poc < 0) return null;
    const price = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    const at = (row: number) => profile.low + row * profile.step;
    return t("profileStatus", {
      poc: price.format(at(profile.poc + 0.5)),
      low: price.format(at(profile.valueAreaFrom)),
      high: price.format(at(profile.valueAreaTo + 1)),
    });
  }, [range, rows, t, i18n.language]);

  const onRange = (visible: TradingVisibleRange) => {
    const from = Math.max(0, Math.ceil(visible.from));
    const to = Math.min(bars.close.length - 1, Math.floor(visible.to));
    setRange((current) =>
      current && current.from === from && current.to === to
        ? current
        : { from, to },
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
          fontSize: 13,
        }}
      >
        <Switch
          size="small"
          checked={enabled}
          onChange={setEnabled}
          label={t("volumeProfile")}
        />
        <RadioGroup
          aria-label={t("profileRows")}
          direction="horizontal"
          value={String(rows)}
          onChange={(value) => setRows(Number(value))}
        >
          {ROWS.map((count) => (
            <Radio
              key={count}
              value={String(count)}
              label={t("rowCount", { count })}
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("profileSide")}
          direction="horizontal"
          value={side}
          onChange={(value) => setSide(value as "right" | "left")}
        >
          <Radio value="right" label={t("sides.right")} />
          <Radio value="left" label={t("sides.left")} />
        </RadioGroup>
      </div>
      <TradingChart
        bars={bars}
        timeframe="15m"
        symbol={t("btc")}
        volumeProfile={enabled ? profileOptions : false}
        indicators={[{ type: "volume", overlay: true }]}
        onVisibleRangeChange={onRange}
        barSpacing={5}
        precision={0}
        ariaLabel={t("profileAria")}
        height={460}
      />
      <span
        role="status"
        style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
      >
        {summary}
      </span>
    </div>
  );
}
`})))()}var $,Xn,Zn,Qn;function $n(){return($n=e((()=>{be(),Oe(),Le(),Xe(),tt(),at(),lt(),mt(),Ct(),At(),zt(),Wt(),Xt(),tn(),on(),dn(),hn(),_n(),yn(),xn(),Cn(),Tn(),Dn(),kn(),jn(),Nn(),Fn(),Ln(),zn(),Vn(),Un(),Gn(),qn(),Yn(),t(),i(),ce(),p(),ue(),$=n(),Xn=se(Object.assign({"./demos/chart-styles.tsx":ge,"./demos/compare.tsx":xe,"./demos/dark-terminal.tsx":ke,"./demos/drawing-tools.tsx":Re,"./demos/export.tsx":Ze,"./demos/history.tsx":nt,"./demos/million-bars.tsx":ot,"./demos/multi-chart.tsx":ut,"./demos/order-entry.tsx":ht,"./demos/orders.tsx":wt,"./demos/pro-terminal.tsx":jt,"./demos/red-up.tsx":Bt,"./demos/replay.tsx":Gt,"./demos/sessions.tsx":Zt,"./demos/streaming.tsx":nn,"./demos/tick-chart.tsx":sn,"./demos/volume-profile.tsx":fn}),Object.assign({"./demos/chart-styles.tsx":gn,"./demos/compare.tsx":vn,"./demos/dark-terminal.tsx":bn,"./demos/drawing-tools.tsx":Sn,"./demos/export.tsx":wn,"./demos/history.tsx":En,"./demos/million-bars.tsx":On,"./demos/multi-chart.tsx":An,"./demos/order-entry.tsx":Mn,"./demos/orders.tsx":Pn,"./demos/pro-terminal.tsx":In,"./demos/red-up.tsx":Rn,"./demos/replay.tsx":Bn,"./demos/sessions.tsx":Hn,"./demos/streaming.tsx":Wn,"./demos/tick-chart.tsx":Kn,"./demos/volume-profile.tsx":Jn})),Zn=`import { TradingChart } from "minerva-design/charts";
// framework-free engine, layouts and pure indicator functions
import { createTradingChart, syncCharts, resampleBars, ema } from "minerva-design/charts/core";`,Qn=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:m.section,"aria-labelledby":`trading-overview`,children:[(0,$.jsx)(`h2`,{id:`trading-overview`,children:e(`docs.trading-chart.intro.overview.title`)}),(0,$.jsx)(`p`,{className:m.prose,children:e(`docs.trading-chart.intro.overview.text`)}),(0,$.jsxs)(`ul`,{className:m.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.axis`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.panes`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.trading`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.drawings`)})]})]}),(0,$.jsxs)(`section`,{className:m.section,"aria-labelledby":`trading-streaming`,children:[(0,$.jsx)(`h2`,{id:`trading-streaming`,children:e(`docs.trading-chart.intro.streaming.title`)}),(0,$.jsx)(`p`,{className:m.prose,children:e(`docs.trading-chart.intro.streaming.text`)}),(0,$.jsx)(`p`,{className:m.prose,children:e(`docs.trading-chart.intro.streaming.performance`)})]}),(0,$.jsxs)(`section`,{className:m.section,"aria-labelledby":`trading-workflow`,children:[(0,$.jsx)(`h2`,{id:`trading-workflow`,children:e(`docs.trading-chart.intro.workflow.title`)}),(0,$.jsxs)(`ul`,{className:m.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.layouts`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.replay`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.time`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.export`)})]})]}),(0,$.jsxs)(`section`,{className:m.section,"aria-labelledby":`trading-controls`,children:[(0,$.jsx)(`h2`,{id:`trading-controls`,children:e(`docs.trading-chart.intro.controls.title`)}),(0,$.jsxs)(`ul`,{className:m.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.pointer`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.axes`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.keyboard`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.orders`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.touch`)})]})]}),(0,$.jsxs)(`section`,{className:m.section,"aria-labelledby":`trading-languages`,children:[(0,$.jsx)(`h2`,{id:`trading-languages`,children:e(`docs.trading-chart.intro.languages.title`)}),(0,$.jsx)(`p`,{className:m.prose,children:e(`docs.trading-chart.intro.languages.text`)}),(0,$.jsx)(`p`,{className:m.prose,children:e(`docs.trading-chart.intro.languages.colors`)})]})]});return(0,$.jsx)(le,{id:`trading-chart`,demos:Xn,intro:t,importCode:Zn})}})))()}$n();export{Qn as default};