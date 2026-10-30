import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{n as d,t as f}from"./Switch-DL9RsLtd.js";import{i as ee,r as p}from"./DemoBlock-Bk0bFt8p.js";import{i as m,o as te,t as ne}from"./Select-DtAm90X-.js";import{a as re,g as ie,i as ae,m as oe,p as se}from"./angular-preview-DLtNmLoq.js";import{l as ce,n as le,t as ue,u as de}from"./DocPage-6WUEs69-.js";import{a as h,c as g,i as fe,l as _,n as v,o as pe,r as y,s as b,t as me}from"./data-BiPNHhW6.js";var he;function ge(){return(ge=e((()=>{re(),he=(e,t={})=>{let n=[];for(let r of e){let i=e.filter(e=>e!==r);t.crosshair!==!1&&n.push(r.on(`crosshairMove`,e=>{for(let t of i)t.setCrosshair(e?e.time:null)})),t.timeRange!==!1&&n.push(r.on(`visibleRangeChange`,()=>{let e=r.getVisibleTimeRange();for(let t of i){let n=ae.get(t);n?n.setTimeRange(e):t.setVisibleTimeRange(e)}}))}return()=>{n.forEach(e=>e());for(let t of e)t.setCrosshair(null)}}})))()}function _e(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,ve.useState)(`hollowCandles`);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsx)(s,{"aria-label":e(`chartStyle`),direction:`horizontal`,value:t,onChange:e=>n(e),children:be.map(t=>(0,x.jsx)(u,{value:t,label:e(`styles.${t}`)},t))}),(0,x.jsx)(g,{bars:ye,timeframe:`1D`,symbol:e(`aapl`),chartStyle:t,barSpacing:7,ariaLabel:e(`stylesAria`),height:400})]})}var ve,x,ye,be;function xe(){return(xe=e((()=>{ve=t(),i(),c(),l(),_(),b(),x=n(),ye=h({count:260,timeframe:me,seed:11,price:182,volatility:.014,volume:5e7,market:`stock`}),be=[`candles`,`hollowCandles`,`heikinAshi`,`bars`,`line`,`area`,`baseline`]})))()}function Se(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,Ce.useState)(`percent`),i=(0,Ce.useMemo)(()=>[{id:`eth`,name:e(`eth`),data:Oe(Ee)},{id:`sol`,name:e(`sol`),data:Oe(De)}],[e]);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsxs)(s,{"aria-label":e(`priceScale`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,S.jsx)(u,{value:`percent`,label:e(`scaleNames.percent`)}),(0,S.jsx)(u,{value:`log`,label:e(`scaleNames.log`)}),(0,S.jsx)(u,{value:`linear`,label:e(`scaleNames.linear`)})]}),(0,S.jsx)(g,{bars:Te,timeframe:`1D`,symbol:e(`btc`),chartStyle:`line`,scaleMode:t,compare:i,barSpacing:3,ariaLabel:e(`compareAria`),height:400})]})}var Ce,S,we,Te,Ee,De,Oe;function ke(){return(ke=e((()=>{Ce=t(),i(),c(),l(),_(),b(),S=n(),we=(e,t,n)=>h({count:365,timeframe:me,seed:e,price:t,volatility:n,volume:1e4}),Te=we(31,42e3,.026),Ee=we(32,2300,.032),De=we(33,98,.045),Oe=e=>e.map(e=>({time:e.time,value:e.close}))})))()}function Ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),i=new Intl.NumberFormat(t.language,{notation:`compact`,maximumFractionDigits:2}),a=(Me-Ne)/Ne,o=[[e(`change24h`),`${a>=0?`+`:``}${(a*100).toFixed(2)}%`,a>=0?`var(--success-color)`:`var(--danger-color)`],[e(`high24h`),n.format(Pe)],[e(`low24h`),n.format(Fe)],[e(`volume24h`),i.format(Ie)]];return(0,C.jsxs)(`div`,{style:Le,children:[(0,C.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:24,flexWrap:`wrap`,padding:`12px 16px`,borderBottom:`1px solid var(--border-color)`},children:[(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`div`,{style:{fontWeight:600,fontSize:15},children:e(`btcPerp`)}),(0,C.jsx)(`div`,{style:{fontSize:22,fontWeight:600,fontVariantNumeric:`tabular-nums`,color:a>=0?`var(--success-color)`:`var(--danger-color)`},children:n.format(Me)})]}),o.map(([e,t,n])=>(0,C.jsxs)(`div`,{style:{fontSize:12},children:[(0,C.jsx)(`div`,{style:{color:`var(--text-secondary-color)`},children:e}),(0,C.jsx)(`div`,{style:{fontVariantNumeric:`tabular-nums`,fontWeight:500,color:n},children:t})]},e))]}),(0,C.jsx)(g,{bars:je,timeframe:`15m`,symbol:e(`btcPerp`),indicators:[{type:`ema`,period:20},{type:`ema`,period:50},{type:`boll`,fill:!0},{type:`volume`,overlay:!0},{type:`rsi`,height:100}],watermark:e(`btcPerp`),ariaLabel:e(`darkAria`),height:520})]})}var C,je,w,Me,Ne,Pe,Fe,Ie,Le;function Re(){return(Re=e((()=>{i(),_(),b(),C=n(),je=h({count:900,timeframe:15*y,seed:77,price:66420,volatility:.0028,volume:420}),w=je.slice(-96),Me=w[w.length-1].close,Ne=w[0].open,Pe=Math.max(...w.map(e=>e.high)),Fe=Math.min(...w.map(e=>e.low)),Ie=w.reduce((e,t)=>e+(t.volume??0),0),Le={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1e2329`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--warning-color":`#f0b90b`,"--info-color":`#3d8bfd`,"--primary-color":`#f0b90b`,color:`#eaecef`,background:`#0b0e11`,borderRadius:12,overflow:`hidden`,width:`100%`,border:`1px solid #2b3139`}})))()}function ze(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,T.useRef)(null),[n,i]=(0,T.useState)(`cursor`),[a,s]=(0,T.useState)(!1),[c,l]=(0,T.useState)({canUndo:!1,canRedo:!1}),[u,d]=(0,T.useState)(()=>Ge(e(`noteText`)));return(0,E.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`},children:[(0,E.jsx)(`div`,{role:`toolbar`,"aria-label":e(`drawingTools`),"aria-orientation":`vertical`,style:{display:`flex`,flexDirection:`column`,gap:2,padding:6,borderRight:`1px solid var(--border-color)`},children:qe.map(t=>(0,E.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,active:n===t,"aria-pressed":n===t,"aria-label":e(`tools.${t}`),title:e(`tools.${t}`),onClick:()=>i(t),children:(0,E.jsx)(Je,{d:Ke[t]})},t))}),(0,E.jsxs)(`div`,{style:{minWidth:0},children:[(0,E.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,flexWrap:`wrap`,padding:`6px 10px`,fontSize:13,borderBottom:`1px solid var(--border-color)`},children:[(0,E.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`undo`),title:e(`undo`),disabled:!c.canUndo,onClick:()=>t.current?.undo(),children:(0,E.jsx)(Je,{d:`M7 4L3 8l4 4M3 8h8a4 4 0 0 1 0 8H9`})}),(0,E.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`redo`),title:e(`redo`),disabled:!c.canRedo,onClick:()=>t.current?.redo(),children:(0,E.jsx)(Je,{d:`M11 4l4 4-4 4M15 8H7a4 4 0 0 0 0 8h2`})}),(0,E.jsx)(f,{size:`small`,checked:a,onChange:s,label:e(`keepDrawing`)}),(0,E.jsx)(o,{size:`small`,variant:`ghost`,color:`danger`,disabled:!u.length,onClick:()=>d([]),children:e(`clearDrawings`)}),(0,E.jsx)(`span`,{role:`status`,style:{marginInlineStart:`auto`,color:`var(--text-secondary-color)`},children:e(`drawingsStatus`,{count:u.length})})]}),(0,E.jsx)(g,{ref:t,bars:D,timeframe:`4H`,symbol:e(`eth`),drawings:u,onDrawingsChange:d,onUndoChange:l,drawingMode:n,keepDrawingMode:a,onDrawingToolChange:i,indicators:[{type:`ema`,period:50},{type:`rsi`,height:100}],rightOffset:20,barSpacing:5,ariaLabel:e(`drawingAria`),height:560})]})]})}var T,E,D,O,k,A,Be,Ve,He,Ue,We,Ge,Ke,qe,Je;function Ye(){return(Ye=e((()=>{T=t(),i(),a(),d(),_(),b(),E=n(),D=h({count:420,timeframe:4*v,seed:23,price:2480,volatility:.009,volume:900}),O=D.slice(-100),k=O.reduce((e,t)=>t.low<e.low?t:e),A=O.slice(O.indexOf(k)),Be=A.reduce((e,t)=>t.high>e.high?t:e),Ve=A.slice(Math.floor(A.length/2)).reduce((e,t)=>t.low<e.low?t:e),He=D[D.length-1],Ue=Math.round(He.close),We=He.time+64*v,Ge=e=>[{id:`channel`,type:`parallelChannel`,color:`#a855f7`,points:[{time:k.time,price:k.low},{time:Ve.time,price:Ve.low},{time:Be.time,price:Be.high}]},{id:`long`,type:`longPosition`,quantity:2,points:[{time:He.time,price:Ue},{time:We,price:Math.round(Ue*1.035)},{time:We,price:Math.round(Ue*.9825)}]},{id:`note`,type:`text`,color:`#0ea5e9`,text:e,points:[{time:k.time,price:Be.high}]},{id:`rsi-line`,type:`horizontalLine`,pane:`rsi:14`,color:`#f59e0b`,lineStyle:`dashed`,points:[{time:k.time,price:50}]}],Ke={cursor:`M4 3l10 5-4.5 1.5L8 14z`,trendLine:`M3 15L15 3`,ray:`M3 14L16 4`,extendedLine:`M1 16L17 2`,arrow:`M3 15L14 4M8 4h6v6`,horizontalLine:`M1 9h16`,verticalLine:`M9 1v16`,parallelChannel:`M2 11L11 3M7 16l9-8`,pitchfork:`M2 9h5M7 9l9-6M7 9h9M7 9l9 6`,rectangle:`M3 4h12v10H3z`,fibRetracement:`M2 3h14M2 7h14M2 10h14M2 15h14`,text:`M4 4h10M9 4v11`,longPosition:`M3 10h12M9 15V4M5.5 7.5L9 4l3.5 3.5`,shortPosition:`M3 8h12M9 3v11M5.5 10.5L9 14l3.5-3.5`,measure:`M9 2v14M5 6l4-4 4 4M5 12l4 4 4-4`},qe=Object.keys(Ke),Je=({d:e})=>(0,E.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 18 18`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,E.jsx)(`path`,{d:e})})})))()}function Xe(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,Ze.useRef)(null),[n,i]=(0,Ze.useState)(``),a=async()=>{let e=await t.current?.toBlob();if(!e)return;let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=`nvda-1d.png`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)};return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[(0,j.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>i(t.current?.toDataURL()??``),startIcon:(0,j.jsx)($e,{d:`M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z`}),children:e(`snapshot`)}),(0,j.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>void a(),startIcon:(0,j.jsx)($e,{d:`M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10`}),children:e(`downloadImage`)}),(0,j.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>void t.current?.requestFullscreen(),startIcon:(0,j.jsx)($e,{d:`M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4`}),children:e(`fullscreen`)})]}),(0,j.jsx)(g,{ref:t,bars:Qe,timeframe:`1D`,symbol:e(`nvda`),indicators:[{type:`ma`,period:50},{type:`ma`,period:200},{type:`volume`,height:80}],watermark:e(`nvda`),ariaLabel:e(`exportAria`),height:400}),n&&(0,j.jsxs)(`figure`,{style:{margin:0,display:`grid`,gap:6},children:[(0,j.jsx)(`img`,{src:n,alt:e(`snapshotAlt`),style:{width:`min(100%, 420px)`,border:`1px solid var(--border-color)`,borderRadius:8}}),(0,j.jsx)(`figcaption`,{style:{fontSize:13,color:`var(--text-secondary-color)`},children:e(`snapshotCaption`)})]})]})}var Ze,j,Qe,$e;function et(){return(et=e((()=>{Ze=t(),i(),a(),_(),b(),j=n(),Qe=h({count:400,timeframe:me,seed:2718,price:870,volatility:.021,volume:32e6,market:`stock`}),$e=({d:e})=>(0,j.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,j.jsx)(`path`,{d:e})})})))()}function tt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,M.useRef)(null),[i]=(0,M.useState)(()=>N.slice(-200)),[a,o]=(0,M.useState)(rt),[s,c]=(0,M.useState)(!1),l=(0,M.useRef)(!1);return(0,nt.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,nt.jsx)(g,{ref:n,bars:i,timeframe:`1H`,symbol:e(`eurusd`),indicators:[{type:`ma`,period:50},{type:`atr`,height:80}],onHistoryRequest:({count:e})=>{l.current||e>=N.length||(l.current=!0,c(!0),setTimeout(()=>{let t=N.slice(Math.max(0,N.length-e-rt),N.length-e);n.current?.prependBars(t),l.current=!1,c(!1),o(e+t.length)},600))},ariaLabel:e(`historyAria`),height:400}),(0,nt.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:s?e(`historyLoading`):e(`historyStatus`,{loaded:new Intl.NumberFormat(t.language).format(a),total:new Intl.NumberFormat(t.language).format(N.length)})})]})}var M,nt,N,rt;function it(){return(it=e((()=>{M=t(),i(),_(),b(),nt=n(),N=h({count:3e3,timeframe:v,seed:57,price:1.0842,volatility:.0011,volume:3e3},5),rt=200})))()}function at(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,ot.useRef)(null),[i]=(0,ot.useState)(()=>pe({count:st,timeframe:y,seed:99,price:21e3,volatility:6e-4,volume:40,start:Date.UTC(2023,0,2)})),[a,s]=(0,ot.useState)(null);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`,flexWrap:`wrap`},children:[(0,P.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>n.current?.fitContent(),children:e(`showAll`)}),(0,P.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>n.current?.scrollToRealtime(),children:e(`latest`)}),(0,P.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e(`millionStatus`,{bars:new Intl.NumberFormat(t.language).format(st),renderer:a??`…`})})]}),(0,P.jsx)(g,{ref:n,bars:i,timeframe:`1m`,precision:2,symbol:e(`nq`),indicators:[{type:`ema`,period:200},{type:`volume`,height:80}],onRendererChange:s,ariaLabel:e(`millionAria`),height:440})]})}var ot,P,st;function ct(){return(ct=e((()=>{ot=t(),i(),a(),_(),b(),P=n(),st=1e6})))()}function lt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,F.useRef)(null),n=(0,F.useRef)(null),i=(0,F.useRef)(null),a=(0,F.useRef)(null),[o,s]=(0,F.useState)(!0),[c,l]=(0,F.useState)(!0);(0,F.useEffect)(()=>{let e=[t,n,i,a].map(e=>e.current?.getInstance()).filter(e=>!!e);return he(e,{crosshair:o,timeRange:c})},[o,c]);let u=[t,n,i,a];return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:20},children:[(0,I.jsx)(f,{size:`small`,checked:o,onChange:s,label:e(`syncCrosshair`)}),(0,I.jsx)(f,{size:`small`,checked:c,onChange:l,label:e(`syncTime`)})]}),(0,I.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:1,background:`var(--border-color)`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`},children:ft.map((t,n)=>(0,I.jsx)(`div`,{style:{background:`var(--background-color)`},children:(0,I.jsx)(g,{ref:u[n],bars:t.bars,timeframe:t.timeframe,symbol:e(t.symbol),indicators:[{type:`ema`,period:21}],highLowMarkers:!1,barSpacing:t.timeframe===`4H`?9:5,precision:t.symbol===`sol`?2:0,ariaLabel:e(`layoutAria`,{symbol:e(t.symbol),timeframe:t.timeframe}),height:260})},n))})]})}var F,I,ut,dt,ft;function pt(){return(pt=e((()=>{F=t(),i(),d(),_(),oe(),ge(),b(),I=n(),ut=(e,t,n)=>h({count:500,timeframe:v,seed:e,price:t,volatility:n,volume:400}),dt=ut(61,63200,.005),ft=[{symbol:`btc`,bars:dt,timeframe:`1H`},{symbol:`eth`,bars:ut(62,2480,.0065),timeframe:`1H`},{symbol:`sol`,bars:ut(63,142,.009),timeframe:`1H`},{symbol:`btc`,bars:ie(dt,`4H`),timeframe:`4H`}]})))()}function mt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[n,i]=(0,ht.useState)(vt),[a,o]=(0,ht.useState)(``),s=new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,maximumFractionDigits:1}),c=(0,ht.useMemo)(()=>n.map(e=>({id:e.id,kind:`order`,side:e.side,price:e.price,quantity:e.quantity,draggable:!0,cancellable:!0})),[n]);return(0,L.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,width:`100%`},children:[(0,L.jsx)(`div`,{style:{flex:`1 1 520px`,minWidth:0},children:(0,L.jsx)(g,{bars:gt,timeframe:`5m`,symbol:e(`btcPerp`),orderEntry:!0,priceLines:c,onOrderCreate:t=>{let n={id:`order-${Date.now().toString(36)}`,side:t.side,price:t.price,quantity:.1};i(e=>[...e,n]),o(e(t.side===`buy`?`orderPlacedBuy`:`orderPlacedSell`,{price:s.format(t.price)}))},onOrderMove:t=>{i(e=>e.map(e=>e.id===t.id?{...e,price:t.price}:e)),o(e(`orderModified`,{from:s.format(t.previousPrice),to:s.format(t.price)}))},onOrderCancel:t=>{i(e=>e.filter(e=>e.id!==t.id)),o(e(`orderCancelled`,{price:s.format(t.line.price)}))},ariaLabel:e(`orderEntryAria`),height:440})}),(0,L.jsxs)(`div`,{style:{flex:`1 1 220px`,display:`grid`,alignContent:`start`,gap:8,fontSize:13},children:[(0,L.jsx)(`strong`,{children:e(`ordersTitle`)}),(0,L.jsx)(`table`,{style:{borderCollapse:`collapse`,width:`100%`,fontVariantNumeric:`tabular-nums`},children:(0,L.jsx)(`tbody`,{children:n.map(t=>(0,L.jsxs)(`tr`,{style:{borderTop:`1px solid var(--border-color)`},children:[(0,L.jsx)(`td`,{style:{padding:`6px 0`,color:t.side===`buy`?`var(--success-color)`:`var(--danger-color)`},children:e(t.side===`buy`?`lines.limitBuy`:`lines.limitSell`)}),(0,L.jsx)(`td`,{style:{padding:`6px 0`,textAlign:`end`,color:`var(--text-secondary-color)`},children:t.quantity}),(0,L.jsx)(`td`,{style:{padding:`6px 0`,textAlign:`end`},children:s.format(t.price)})]},t.id))})}),(0,L.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:a||e(`orderEntryHint`)})]})]})}var ht,L,gt,_t,vt;function yt(){return(yt=e((()=>{ht=t(),i(),_(),b(),L=n(),gt=h({count:360,timeframe:5*y,seed:909,price:63480,volatility:.0018,volume:40},1),_t=gt[gt.length-1].close,vt=[{id:`o1`,side:`buy`,price:Math.round(_t*.996),quantity:.25},{id:`o2`,side:`sell`,price:Math.round(_t*1.006),quantity:.1}]})))()}function bt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[n,i]=(0,R.useState)(Tt),[a,o]=(0,R.useState)(null),s=(0,R.useMemo)(()=>wt.map(({label:t,...r})=>({...r,price:n[r.id],title:e(`lines.${t}`)})),[n,e]),c=(0,R.useMemo)(()=>Ct.map(([t,n,r])=>{let i=B[t];return{time:i.time,side:n,price:Math.round(n===`buy`?(i.low+i.close)/2:(i.high+i.close)/2),text:e(n===`buy`?`buyMarker`:`sellMarker`,{quantity:r})}}),[e]),l=new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,maximumFractionDigits:0});return(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,width:`100%`},children:[(0,z.jsx)(`div`,{style:{flex:`1 1 520px`,minWidth:0},children:(0,z.jsx)(g,{bars:B,timeframe:`1H`,symbol:e(`btc`),priceLines:s,markers:c,onOrderMove:e=>{i(t=>({...t,[e.id]:e.price})),o(e)},precision:0,ariaLabel:e(`ordersAria`),height:460})}),(0,z.jsxs)(`div`,{style:{flex:`1 1 200px`,display:`grid`,alignContent:`start`,gap:8,fontSize:13},children:[(0,z.jsx)(`strong`,{children:e(`openOrders`)}),(0,z.jsx)(`table`,{style:{borderCollapse:`collapse`,width:`100%`,fontVariantNumeric:`tabular-nums`},children:(0,z.jsx)(`tbody`,{children:s.map(e=>(0,z.jsxs)(`tr`,{style:{borderTop:`1px solid var(--border-color)`},children:[(0,z.jsx)(`td`,{style:{padding:`6px 0`},children:e.title}),(0,z.jsx)(`td`,{style:{padding:`6px 0`,textAlign:`end`,color:`var(--text-secondary-color)`},children:e.quantity??``}),(0,z.jsx)(`td`,{style:{padding:`6px 0`,textAlign:`end`},children:l.format(e.price)})]},e.id))})}),(0,z.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:a?e(`orderMoved`,{name:s.find(e=>e.id===a.id)?.title??a.id,from:l.format(a.previousPrice),to:l.format(a.price)}):e(`dragHint`)})]})]})}var R,z,B,V,xt,St,Ct,H,wt,Tt;function Et(){return(Et=e((()=>{R=t(),i(),_(),b(),z=n(),B=h({count:320,timeframe:v,seed:5,price:63200,volatility:.0045,volume:260}),V=B[B.length-1].close,xt=B[B.length-70],St=Math.round(xt.low+(xt.close-xt.low)/2),Ct=[[60,`buy`,.4],[95,`sell`,.4],[150,`buy`,1.2],[205,`sell`,1.2],[B.length-70,`buy`,.75]],H=e=>Math.round(e/10)*10,wt=[{id:`position`,kind:`position`,side:`buy`,quantity:.75,label:`position`},{id:`tp`,kind:`takeProfit`,quantity:.75,draggable:!0,label:`takeProfit`},{id:`sl`,kind:`stopLoss`,quantity:.75,draggable:!0,label:`stopLoss`},{id:`buy`,kind:`order`,side:`buy`,quantity:.5,draggable:!0,label:`limitBuy`},{id:`sell`,kind:`order`,side:`sell`,quantity:.3,draggable:!0,label:`limitSell`},{id:`alert`,kind:`alert`,label:`alert`}],Tt={position:St,tp:H(St*1.045),sl:H(St*.975),buy:H(V*.985),sell:H(V*1.02),alert:H(V*1.035)}})))()}function Dt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,U.useState)(`15m`),[i,a]=(0,U.useState)(`candles`),[s,c]=(0,U.useState)(`linear`),[l,u]=(0,U.useState)([`ma`,`vpvr`,`vol`,`macd`,`rsi`]),d=(0,U.useRef)(null),f=async()=>{let e=await d.current?.toBlob();if(!e)return;let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=`btcusdt-${t}.png`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)},ee=(0,U.useMemo)(()=>t===`1m`?Ot:ie(Ot,t),[t]),p=(0,U.useMemo)(()=>Object.keys(jt).flatMap(e=>l.includes(e)?jt[e]:[]),[l]),m=e=>u(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,W.jsxs)(`div`,{style:{width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`,background:`var(--surface-color)`},children:[(0,W.jsxs)(`div`,{style:Mt,role:`toolbar`,"aria-label":e(`toolbar`),children:[(0,W.jsx)(`strong`,{style:{padding:`0 8px 0 4px`,fontSize:14},children:e(`btc`)}),kt.map(r=>(0,W.jsx)(o,{size:`small`,variant:`ghost`,active:r===t,"aria-pressed":r===t,onClick:()=>n(r),children:e(`timeframes.${r}`)},r)),(0,W.jsx)(`span`,{style:Nt}),(0,W.jsx)(te,{size:`small`,style:{width:150},"aria-label":e(`chartStyle`),value:i,onChange:e=>a(e),children:At.map(t=>(0,W.jsx)(ne,{value:t,children:e(`styles.${t}`)},t))}),(0,W.jsx)(`span`,{style:Nt}),Object.keys(jt).map(t=>(0,W.jsx)(o,{size:`small`,variant:`ghost`,active:l.includes(t),"aria-pressed":l.includes(t),onClick:()=>m(t),children:e(`studies.${t}`)},t)),(0,W.jsx)(`span`,{style:{flex:1}}),[`linear`,`percent`,`log`].map(t=>(0,W.jsx)(o,{size:`small`,variant:`ghost`,active:s===t,"aria-pressed":s===t,onClick:()=>c(t),children:e(`scales.${t}`)},t)),(0,W.jsx)(`span`,{style:Nt}),(0,W.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`downloadImage`),title:e(`downloadImage`),onClick:()=>void f(),children:(0,W.jsx)(Pt,{d:`M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z`})}),(0,W.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,"aria-label":e(`fullscreen`),title:e(`fullscreen`),onClick:()=>void d.current?.requestFullscreen(),children:(0,W.jsx)(Pt,{d:`M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4`})})]}),(0,W.jsx)(g,{ref:d,bars:ee,timeframe:t,symbol:e(`btc`),chartStyle:i,scaleMode:s,indicators:p,volumeProfile:l.includes(`vpvr`),sessionBreaks:!0,watermark:`${e(`btc`)} · ${e(`timeframes.${t}`)}`,labels:{timeframe:e(`timeframes.${t}`)},ariaLabel:e(`terminalAria`),height:600})]})}var U,W,Ot,kt,At,jt,Mt,Nt,Pt;function Ft(){return(Ft=e((()=>{U=t(),i(),a(),m(),_(),oe(),b(),W=n(),Ot=h({count:129600,timeframe:y,seed:42,price:61850,volatility:.0011,volume:14},1),kt=[`1m`,`5m`,`15m`,`1H`,`4H`,`1D`,`1W`],At=[`candles`,`hollowCandles`,`heikinAshi`,`bars`,`line`,`area`,`baseline`],jt={ma:[{type:`ma`,period:7},{type:`ma`,period:25},{type:`ma`,period:99}],boll:[{type:`boll`}],ichimoku:[{type:`ichimoku`}],st:[{type:`supertrend`}],vpvr:[],vol:[{type:`volume`,maPeriod:20,height:90}],macd:[{type:`macd`}],rsi:[{type:`rsi`}],kdj:[{type:`kdj`}]},Mt={display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:4,padding:`6px 8px`,borderBottom:`1px solid var(--border-color)`},Nt={width:1,height:20,margin:`0 6px`,background:`var(--border-color)`},Pt=({d:e})=>(0,W.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,W.jsx)(`path`,{d:e})})})))()}function It(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`});return(0,Lt.jsx)(g,{bars:Rt,timeframe:`1D`,symbol:e(`moutai`),colorConvention:`redUp`,utcOffset:480,indicators:[{type:`ma`,period:5},{type:`ma`,period:10},{type:`ma`,period:20},{type:`ma`,period:60},{type:`volume`,maPeriod:5,height:90},{type:`kdj`,height:100}],barSpacing:7,ariaLabel:e(`redUpAria`),height:540})}var Lt,Rt;function zt(){return(zt=e((()=>{i(),_(),b(),Lt=n(),Rt=h({count:300,timeframe:me,seed:600519,price:1688,volatility:.017,volume:32e5,market:`stock`,start:Date.UTC(2024,8,2)})})))()}function Bt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),t=(0,Vt.useRef)(null),[n,i]=(0,Vt.useState)(null),[a,s]=(0,Vt.useState)(5),c=!!n?.active,l=!!n?.playing,u=n?n.picking?e(`replayPicking`):n.active?e(`replayProgress`,{index:n.index,total:n.total}):e(`replayIdle`):e(`replayIdle`);return(0,G.jsxs)(`div`,{style:{width:`100%`,border:`1px solid var(--border-color)`,borderRadius:10,overflow:`hidden`},children:[(0,G.jsxs)(`div`,{role:`toolbar`,"aria-label":e(`replayControls`),style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:6,padding:`6px 10px`,fontSize:13,borderBottom:`1px solid var(--border-color)`},children:[(0,G.jsx)(o,{size:`small`,variant:c||n?.picking?`ghost`:`solid`,onClick:()=>t.current?.startReplay(),children:e(c?`replayRestart`:`replayStart`)}),(0,G.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,disabled:!c,"aria-label":e(l?`pause`:`play`),title:e(l?`pause`:`play`),onClick:()=>l?t.current?.replayPause():t.current?.replayPlay(a),children:(0,G.jsx)(Wt,{d:l?`M4 3h3v10H4zM9 3h3v10H9z`:`M4 2.5l9 5.5-9 5.5z`})}),(0,G.jsx)(o,{size:`small`,variant:`ghost`,shape:`square`,disabled:!c||l,"aria-label":e(`replayStep`),title:e(`replayStep`),onClick:()=>t.current?.replayStep(),children:(0,G.jsx)(Wt,{d:`M3 2.5l7 5.5-7 5.5zM11 3h2v10h-2z`})}),(0,G.jsx)(te,{size:`small`,style:{width:120},"aria-label":e(`replaySpeed`),value:String(a),onChange:e=>{s(Number(e)),l&&t.current?.replayPlay(Number(e))},children:Ut.map(t=>(0,G.jsx)(ne,{value:String(t),children:e(`barsPerSecond`,{count:t})},t))}),(0,G.jsx)(o,{size:`small`,variant:`ghost`,disabled:!c&&!n?.picking,onClick:()=>t.current?.stopReplay(),children:e(`replayExit`)}),(0,G.jsx)(`span`,{role:`status`,style:{marginInlineStart:`auto`,color:`var(--text-secondary-color)`},children:u})]}),(0,G.jsx)(g,{ref:t,bars:Ht,timeframe:`1H`,symbol:e(`eth`),indicators:[{type:`ema`,period:20},{type:`ema`,period:50},{type:`volume`,height:80}],onReplayChange:i,ariaLabel:e(`replayAria`),height:460})]})}var Vt,G,Ht,Ut,Wt;function Gt(){return(Gt=e((()=>{Vt=t(),i(),a(),m(),_(),b(),G=n(),Ht=h({count:900,timeframe:v,seed:314,price:2480,volatility:.006,volume:800}),Ut=[2,5,10,30],Wt=({d:e})=>(0,G.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`currentColor`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,G.jsx)(`path`,{d:e})})})))()}function Kt(){let{t:e}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[t,n]=(0,qt.useState)(`America/New_York`),[i,a]=(0,qt.useState)(!0),o=(0,qt.useMemo)(()=>[{type:`vwap`},{type:`volume`,height:80}],[]);return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:20,fontSize:13},children:[(0,K.jsx)(te,{size:`small`,style:{width:220},"aria-label":e(`timeZone`),value:t,onChange:n,children:Yt.map(t=>(0,K.jsx)(ne,{value:t,children:e(`zones.${t.replace(`/`,`_`)}`)},t))}),(0,K.jsx)(f,{size:`small`,checked:i,onChange:a,label:e(`sessionBreaks`)})]}),(0,K.jsx)(g,{bars:Jt,timeframe:`5m`,symbol:e(`aapl`),timeZone:t,sessionBreaks:i,indicators:o,barSpacing:4,ariaLabel:e(`sessionsAria`),height:420})]})}var qt,K,Jt,Yt;function Xt(){return(Xt=e((()=>{qt=t(),i(),m(),d(),_(),b(),K=n(),Jt=h({count:780,timeframe:5*y,seed:1515,price:228,volatility:.0016,volume:52e3,market:`stock`,start:Date.UTC(2025,0,6)}).map(e=>({...e,time:e.time+5*v})),Yt=[`America/New_York`,`Europe/London`,`Asia/Shanghai`,`Asia/Tokyo`,`UTC`]})))()}function Zt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,q.useRef)(null),[i]=(0,q.useState)($t),[a,s]=(0,q.useState)(!0),[c,l]=(0,q.useState)({rate:0,price:0});(0,q.useEffect)(()=>{if(!a)return;let e=n.current?.getBar((n.current?.getBarCount()??0)-1),t=e?{...e}:{...i[i.length-1]},r=fe(Date.now()%1e3,t.close,12e-5),o=0,s=performance.now(),c=setInterval(()=>{let e=r(),i=Math.floor(Date.now()/y)*y,a=Math.round(e.price*100)/100;t=i===t.time?{...t,high:Math.max(t.high,a),low:Math.min(t.low,a),close:a,volume:(t.volume??0)+e.size}:{time:i,open:t.close,high:a,low:a,close:a,volume:e.size},n.current?.update(t),o++},Qt),u=setInterval(()=>{let e=performance.now();l({rate:o*1e3/(e-s),price:t.close}),o=0,s=e},1e3);return()=>{clearInterval(c),clearInterval(u)}},[a,i]);let u=new Intl.NumberFormat(t.language,{minimumFractionDigits:2,maximumFractionDigits:2});return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,flexWrap:`wrap`},children:[(0,J.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>s(e=>!e),children:e(a?`pause`:`resume`)}),(0,J.jsx)(`span`,{role:`status`,style:{fontVariantNumeric:`tabular-nums`,color:`var(--text-secondary-color)`},children:a?e(`streamStatus`,{rate:Math.round(c.rate),price:c.price?u.format(c.price):`–`}):e(`paused`)})]}),(0,J.jsx)(g,{ref:n,bars:i,timeframe:`1m`,symbol:e(`eth`),indicators:[{type:`ema`,period:9},{type:`ema`,period:21},{type:`volume`,height:90}],countdown:!0,barSpacing:9,ariaLabel:e(`streamAria`),height:440})]})}var q,J,Qt,$t;function en(){return(en=e((()=>{q=t(),i(),a(),_(),b(),J=n(),Qt=20,$t=()=>{let e=Math.floor(Date.now()/y)*y;return h({count:400,timeframe:y,seed:7,price:3420,volatility:.0012,volume:120,start:e-399*y})}})))()}function tn(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),n=(0,Y.useRef)(null),[{bars:i,next:a}]=(0,Y.useState)(rn),[o,s]=(0,Y.useState)(i.length);return(0,Y.useEffect)(()=>{let e=i[i.length-1],t=i.length,r=setInterval(()=>{let r=1+Math.floor(Math.random()*2);for(let i=0;i<r;i++){let r=a(),i=Math.max(Date.now(),e.time+1),o=Math.round(r.price*100)/100;e=nn(i,e.close,o,r.size*40),n.current?.update(e),t++}},15),o=setInterval(()=>s(t),500);return()=>{clearInterval(r),clearInterval(o)}},[i,a]),(0,X.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,X.jsx)(g,{ref:n,bars:i,symbol:e(`sol`),chartStyle:`area`,indicators:[{type:`vwap`,reset:`none`},{type:`volume`,height:80}],barSpacing:4,rightOffset:12,highLowMarkers:!1,ariaLabel:e(`tickAria`),height:380}),(0,X.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:e(`tickStatus`,{trades:new Intl.NumberFormat(t.language).format(o)})})]})}var Y,X,nn,rn;function an(){return(an=e((()=>{Y=t(),i(),_(),b(),X=n(),nn=(e,t,n,r)=>({time:e,open:t,high:Math.max(t,n),low:Math.min(t,n),close:n,volume:r}),rn=()=>{let e=fe(3,172.4,18e-5),t=[],n=Date.now()-6e3,r=172.4;for(let i=0;i<600;i++){let i=e();n+=10;let a=Math.round(i.price*100)/100;t.push(nn(n,r,a,i.size*40)),r=a}return{bars:t,next:e}}})))()}function on(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.trading-chart.data`}),[n,i]=(0,Z.useState)(!0),[a,o]=(0,Z.useState)(48),[c,l]=(0,Z.useState)(`right`),[d,ee]=(0,Z.useState)(null),p=(0,Z.useMemo)(()=>({rows:a,side:c}),[a,c]),m=(0,Z.useMemo)(()=>{if(!d)return null;let n=se(sn,{...d,rows:a});if(n.poc<0)return null;let r=new Intl.NumberFormat(t.language,{maximumFractionDigits:0}),i=e=>n.low+e*n.step;return e(`profileStatus`,{poc:r.format(i(n.poc+.5)),low:r.format(i(n.valueAreaFrom)),high:r.format(i(n.valueAreaTo+1))})},[d,a,e,t.language]);return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Q.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:20,fontSize:13},children:[(0,Q.jsx)(f,{size:`small`,checked:n,onChange:i,label:e(`volumeProfile`)}),(0,Q.jsx)(s,{"aria-label":e(`profileRows`),direction:`horizontal`,value:String(a),onChange:e=>o(Number(e)),children:cn.map(t=>(0,Q.jsx)(u,{value:String(t),label:e(`rowCount`,{count:t})},t))}),(0,Q.jsxs)(s,{"aria-label":e(`profileSide`),direction:`horizontal`,value:c,onChange:e=>l(e),children:[(0,Q.jsx)(u,{value:`right`,label:e(`sides.right`)}),(0,Q.jsx)(u,{value:`left`,label:e(`sides.left`)})]})]}),(0,Q.jsx)(g,{bars:sn,timeframe:`15m`,symbol:e(`btc`),volumeProfile:n?p:!1,indicators:[{type:`volume`,overlay:!0}],onVisibleRangeChange:e=>{let t=Math.max(0,Math.ceil(e.from)),n=Math.min(sn.close.length-1,Math.floor(e.to));ee(e=>e&&e.from===t&&e.to===n?e:{from:t,to:n})},barSpacing:5,precision:0,ariaLabel:e(`profileAria`),height:460}),(0,Q.jsx)(`span`,{role:`status`,style:{fontSize:13,color:`var(--text-secondary-color)`},children:m})]})}var Z,Q,sn,cn;function ln(){return(ln=e((()=>{Z=t(),i(),c(),l(),d(),_(),oe(),b(),Q=n(),sn=pe({count:1344,timeframe:15*y,seed:77,price:63400,volatility:.0028,volume:120}),cn=[24,48,96]})))()}var un;function dn(){return(dn=e((()=>{un=`import { useState } from "react";
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
`})))()}var fn;function pn(){return(pn=e((()=>{fn=`import { useMemo, useState } from "react";
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
`})))()}var mn;function hn(){return(hn=e((()=>{mn=`import { useTranslation } from "react-i18next";
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
`})))()}var gn;function _n(){return(_n=e((()=>{gn=`import { useRef, useState } from "react";
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
            borderBottom: "1px solid var(--border-color)",
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
`})))()}var vn;function yn(){return(yn=e((()=>{vn=`import { useRef, useState } from "react";
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
`})))()}var bn;function xn(){return(xn=e((()=>{bn=`import { useRef, useState } from "react";
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
`})))()}var Sn;function Cn(){return(Cn=e((()=>{Sn=`import { useRef, useState } from "react";
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
`})))()}var wn;function Tn(){return(Tn=e((()=>{wn=`import { useEffect, useRef, useState } from "react";
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
`})))()}var En;function Dn(){return(Dn=e((()=>{En=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingOrderCreateEvent,
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
  price: number;
  quantity: number;
}

const INITIAL: Order[] = [
  { id: "o1", side: "buy", price: Math.round(last * 0.996), quantity: 0.25 },
  { id: "o2", side: "sell", price: Math.round(last * 1.006), quantity: 0.1 },
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
        price: order.price,
        quantity: order.quantity,
        draggable: true,
        cancellable: true,
      })),
    [orders],
  );

  const onCreate = (event: TradingOrderCreateEvent) => {
    const order = {
      id: \`order-\${Date.now().toString(36)}\`,
      side: event.side,
      price: event.price,
      quantity: 0.1,
    };
    setOrders((list) => [...list, order]);
    setLog(
      t(event.side === "buy" ? "orderPlacedBuy" : "orderPlacedSell", {
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
            {orders.map((order) => (
              <tr
                key={order.id}
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                <td
                  style={{
                    padding: "6px 0",
                    color:
                      order.side === "buy"
                        ? "var(--success-color)"
                        : "var(--danger-color)",
                  }}
                >
                  {t(
                    order.side === "buy" ? "lines.limitBuy" : "lines.limitSell",
                  )}
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    textAlign: "end",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {order.quantity}
                </td>
                <td style={{ padding: "6px 0", textAlign: "end" }}>
                  {usd.format(order.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {log || t("orderEntryHint")}
        </span>
      </div>
    </div>
  );
}
`})))()}var On;function kn(){return(kn=e((()=>{On=`import { useMemo, useState } from "react";
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
`})))()}var An;function jn(){return(jn=e((()=>{An=`import { useMemo, useRef, useState } from "react";
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
  borderBottom: "1px solid var(--border-color)",
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
`})))()}var Mn;function Nn(){return(Nn=e((()=>{Mn=`import { useTranslation } from "react-i18next";
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
`})))()}var Pn;function Fn(){return(Fn=e((()=>{Pn=`import { useRef, useState } from "react";
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
          borderBottom: "1px solid var(--border-color)",
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
`})))()}var In;function Ln(){return(Ln=e((()=>{In=`import { useMemo, useState } from "react";
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
`})))()}var Rn;function zn(){return(zn=e((()=>{Rn=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Bn;function Vn(){return(Vn=e((()=>{Bn=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Hn;function Un(){return(Un=e((()=>{Hn=`import { useMemo, useState } from "react";
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
`})))()}var $,Wn,Gn,Kn;function qn(){return(qn=e((()=>{xe(),ke(),Re(),Ye(),et(),it(),ct(),pt(),yt(),Et(),Ft(),zt(),Gt(),Xt(),en(),an(),ln(),dn(),pn(),hn(),_n(),yn(),xn(),Cn(),Tn(),Dn(),kn(),jn(),Nn(),Fn(),Ln(),zn(),Vn(),Un(),t(),i(),le(),ee(),de(),$=n(),Wn=ce(Object.assign({"./demos/chart-styles.tsx":_e,"./demos/compare.tsx":Se,"./demos/dark-terminal.tsx":Ae,"./demos/drawing-tools.tsx":ze,"./demos/export.tsx":Xe,"./demos/history.tsx":tt,"./demos/million-bars.tsx":at,"./demos/multi-chart.tsx":lt,"./demos/order-entry.tsx":mt,"./demos/orders.tsx":bt,"./demos/pro-terminal.tsx":Dt,"./demos/red-up.tsx":It,"./demos/replay.tsx":Bt,"./demos/sessions.tsx":Kt,"./demos/streaming.tsx":Zt,"./demos/tick-chart.tsx":tn,"./demos/volume-profile.tsx":on}),Object.assign({"./demos/chart-styles.tsx":un,"./demos/compare.tsx":fn,"./demos/dark-terminal.tsx":mn,"./demos/drawing-tools.tsx":gn,"./demos/export.tsx":vn,"./demos/history.tsx":bn,"./demos/million-bars.tsx":Sn,"./demos/multi-chart.tsx":wn,"./demos/order-entry.tsx":En,"./demos/orders.tsx":On,"./demos/pro-terminal.tsx":An,"./demos/red-up.tsx":Mn,"./demos/replay.tsx":Pn,"./demos/sessions.tsx":In,"./demos/streaming.tsx":Rn,"./demos/tick-chart.tsx":Bn,"./demos/volume-profile.tsx":Hn})),Gn=`import { TradingChart } from "minerva-design/charts";
// framework-free engine, layouts and pure indicator functions
import { createTradingChart, syncCharts, resampleBars, ema } from "minerva-design/charts/core";`,Kn=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`trading-overview`,children:[(0,$.jsx)(`h2`,{id:`trading-overview`,children:e(`docs.trading-chart.intro.overview.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.trading-chart.intro.overview.text`)}),(0,$.jsxs)(`ul`,{className:p.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.axis`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.panes`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.trading`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.overview.drawings`)})]})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`trading-streaming`,children:[(0,$.jsx)(`h2`,{id:`trading-streaming`,children:e(`docs.trading-chart.intro.streaming.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.trading-chart.intro.streaming.text`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.trading-chart.intro.streaming.performance`)})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`trading-workflow`,children:[(0,$.jsx)(`h2`,{id:`trading-workflow`,children:e(`docs.trading-chart.intro.workflow.title`)}),(0,$.jsxs)(`ul`,{className:p.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.layouts`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.replay`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.time`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.workflow.export`)})]})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`trading-controls`,children:[(0,$.jsx)(`h2`,{id:`trading-controls`,children:e(`docs.trading-chart.intro.controls.title`)}),(0,$.jsxs)(`ul`,{className:p.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.pointer`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.axes`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.keyboard`)}),(0,$.jsx)(`li`,{children:e(`docs.trading-chart.intro.controls.touch`)})]})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`trading-languages`,children:[(0,$.jsx)(`h2`,{id:`trading-languages`,children:e(`docs.trading-chart.intro.languages.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.trading-chart.intro.languages.text`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.trading-chart.intro.languages.colors`)})]})]});return(0,$.jsx)(ue,{id:`trading-chart`,demos:Wn,intro:t,importCode:Gn})}})))()}qn();export{Kn as default};