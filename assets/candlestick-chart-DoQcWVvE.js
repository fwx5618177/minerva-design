import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{i as s,n as c,r as l,t as u}from"./Radio-D2wZ9q6z.js";import{n as d,t as ee}from"./Tag-C33GIXr-.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-CHJwIegD.js";import{g as ae,m as f,t as p}from"./charts-JJDQ3gS7.js";import{a as m,c as h,i as oe,l as g,n as _,r as se,s as v,t as y}from"./data-BxaEtaE9.js";function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,le.jsx)(h,{bars:ue,timeframe:`1D`,symbol:e(`catl`),colorConvention:`redUp`,indicators:[{type:`ma`,period:5},{type:`ma`,period:10},{type:`ma`,period:20},{type:`ma`,period:60},{type:`volume`,maPeriod:5,height:90},{type:`macd`,height:110}],ariaLabel:e(`aShareAria`),height:540})}var le,ue;function de(){return(de=e((()=>{i(),g(),v(),le=n(),ue=m({count:240,timeframe:y,seed:300750,price:186,volatility:.019,volume:26e6,market:`stock`})})))()}function fe(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,b.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`,gap:12,width:`100%`},children:me.map(t=>(0,b.jsxs)(`figure`,{style:{margin:0,display:`grid`,gap:6},children:[(0,b.jsx)(h,{bars:pe,timeframe:`1D`,chartStyle:t,legend:!1,highLowMarkers:!1,barSpacing:7,rightOffset:2,ariaLabel:e(`styleAria.${t}`),height:240}),(0,b.jsxs)(`figcaption`,{style:{fontSize:13},children:[(0,b.jsx)(`strong`,{children:e(`styleNames.${t}`)}),(0,b.jsxs)(`span`,{style:{color:`var(--text-secondary-color)`},children:[` · `,e(`styleHints.${t}`)]})]})]},t))})}var b,pe,me;function he(){return(he=e((()=>{i(),g(),v(),b=n(),pe=m({count:70,timeframe:y,seed:128,price:96,volatility:.02,volume:1e6,market:`stock`}),me=[`bars`,`candles`,`hollowCandles`]})))()}function ge(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function _e(e,t,n,r){let i=ge(e),a=[],o=n;for(let e=Date.UTC(2026,2,2);a.length<t;e+=ye){if(new Date(e).getUTCDay()%6==0)continue;let t=o*(1+(i()-.5)*.012);o=t*(1+(i()+i()-1)*.035+.001);let n=Math.max(t,o)*(1+i()*.012),s=Math.min(t,o)*(1-i()*.012);a.push({x:r.format(e),open:t,high:n,low:s,y:o})}return a}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,a]=(0,x.useState)(`green-up`),o=(0,x.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),c=(0,x.useMemo)(()=>_e(42,60,182,new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`})),[n]),l=(0,x.useMemo)(()=>[{name:`ACME`,data:c,...i===`red-up`?{upColor:`var(--danger-color)`,downColor:`var(--success-color)`}:{}}],[c,i]);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsxs)(s,{"aria-label":e(`candleColors`),direction:`horizontal`,value:i,onChange:e=>a(String(e)),children:[(0,S.jsx)(u,{value:`green-up`,label:e(`greenUp`)}),(0,S.jsx)(u,{value:`red-up`,label:e(`redUp`)})]}),(0,S.jsx)(p,{series:l,yAxis:{format:e=>o.format(e)},renderTooltip:t=>{let n=t.items[0];if(!n||n.open===void 0)return null;let r=[[e(`open`),n.open],[e(`high`),n.high??n.y],[e(`low`),n.low??n.y],[e(`close`),n.y]];return(0,S.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,S.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),r.map(([e,t])=>(0,S.jsxs)(`span`,{style:{display:`contents`},children:[(0,S.jsx)(`span`,{children:e}),(0,S.jsx)(`span`,{style:{textAlign:`end`},children:o.format(t)})]},e))]})},height:320,ariaLabel:e(`acmeAria`)})]})}var x,S,ye;function be(){return(be=e((()=>{x=t(),i(),c(),l(),f(),S=n(),ye=864e5})))()}function xe(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,Se.jsx)(`div`,{style:we,children:(0,Se.jsx)(h,{bars:Ce,timeframe:`30m`,symbol:e(`nasdaq`),chartStyle:`hollowCandles`,indicators:[{type:`ema`,period:21,color:`#7c8cff`},{type:`volume`,overlay:!0}],watermark:e(`nasdaq`),ariaLabel:e(`darkAria`),height:420})})}var Se,Ce,we;function Te(){return(Te=e((()=>{i(),g(),v(),Se=n(),Ce=m({count:300,timeframe:30*se,seed:1999,price:18420,volatility:.0032,volume:3200},1),we={"--background-color":`#0f1424`,"--surface-color":`#0f1424`,"--surface-elevated-color":`#1a2136`,"--text-color":`#dbe1f1`,"--text-secondary-color":`#7d87a3`,"--border-color":`#242c44`,"--success-color":`#26c6da`,"--danger-color":`#ff5c8a`,"--warning-color":`#ffb74d`,"--primary-color":`#7c8cff`,color:`#dbe1f1`,background:`#0f1424`,border:`1px solid #242c44`,borderRadius:12,overflow:`hidden`,width:`100%`}})))()}function Ee(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),t=(0,De.useMemo)(()=>ke.map(([t,n])=>({id:`${n}-${t}`,time:Oe[t].time,side:n===`guidance`?`buy`:`sell`,color:w[n],text:e(`events.${n}`)})),[e]);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:10,width:`100%`},children:[(0,C.jsx)(h,{bars:Oe,timeframe:`1D`,symbol:e(`orbt`),markers:t,indicators:[{type:`ma`,period:50}],ariaLabel:e(`eventsAria`),height:420}),(0,C.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16,fontSize:13,color:`var(--text-secondary-color)`},children:Object.keys(w).map(t=>(0,C.jsxs)(`span`,{style:{display:`inline-flex`,gap:6},children:[(0,C.jsx)(`span`,{"aria-hidden":`true`,style:{width:10,height:10,marginTop:4,borderRadius:2,background:w[t]}}),e(`eventNames.${t}`)]},t))})]})}var De,C,Oe,ke,w;function Ae(){return(Ae=e((()=>{De=t(),i(),g(),v(),C=n(),Oe=m({count:260,timeframe:y,seed:2026,price:182,volatility:.015,volume:5e7,market:`stock`}),ke=[[38,`earnings`],[64,`dividend`],[101,`earnings`],[128,`dividend`],[150,`split`],[164,`earnings`],[192,`dividend`],[226,`earnings`],[240,`guidance`]],w={earnings:`var(--primary-color)`,dividend:`#a855f7`,split:`var(--warning-color)`,guidance:`var(--danger-color)`}})))()}function je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,a]=(0,T.useState)(null),o=(0,T.useMemo)(()=>{let e=new Intl.NumberFormat(n,{minimumFractionDigits:5,maximumFractionDigits:5});return t=>e.format(t)},[n]),s=(0,T.useMemo)(()=>Object.keys(A).map(t=>({id:t,price:A[t],title:e(`pivots.${t}`),color:t===`r1`?`var(--danger-color)`:t===`s1`?`var(--success-color)`:`var(--warning-color)`,lineStyle:`dashed`})),[e]),c=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1,signDisplay:`exceptZero`}),l=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),u=new Intl.DateTimeFormat(n,{weekday:`short`,hour:`2-digit`,minute:`2-digit`,timeZone:`UTC`,timeZoneName:`short`}),d=i?.bar,ee=i&&i.index>0?O[i.index-1]:null,te=O[O.length-1].close;return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,E.jsx)(h,{bars:O,timeframe:`1H`,symbol:e(`eurusd`),formatPrice:o,timeZone:`UTC`,sessionBreaks:!0,priceLines:s,onCrosshairMove:a,ariaLabel:e(`fxAria`),height:400}),(0,E.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:d&&i?e(`pipReadout`,{time:u.format(d.time),range:l.format((d.high-d.low)/D),body:c.format((d.close-d.open)/D),change:ee?c.format((d.close-ee.close)/D):`…`,distance:c.format((i.price-te)/D)}):e(`pipHint`,{pivot:o(A.pivot),r1:o(A.r1),s1:o(A.s1)})})]})}var T,E,D,O,k,Me,Ne,Pe,Fe,A;function Ie(){return(Ie=e((()=>{T=t(),i(),g(),v(),E=n(),D=1e-4,O=m({count:120,timeframe:_,seed:1085,price:1.0854,volatility:.0011,volume:4e3,start:Date.UTC(2026,9,26)},5),k=O.slice(72,96),Me=Math.max(...k.map(e=>e.high)),Ne=Math.min(...k.map(e=>e.low)),Pe=k[k.length-1].close,Fe=(Me+Ne+Pe)/3,A={r1:2*Fe-Ne,pivot:Fe,s1:2*Fe-Me}})))()}function Le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,j.useMemo)(()=>[{name:`ORBT`,data:Be},{name:e(`vwap`),type:`line`,data:Ve,lineWidth:1.5,color:`var(--warning-color)`}],[e]),a=(0,j.useMemo)(()=>[{type:`line`,axis:`x`,value:P,dash:[4,4],color:`var(--danger-color)`,label:e(`guidanceCut`)}],[e]),o=(0,j.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,timeZone:`America/New_York`}),[n]),s=(0,j.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]);return(0,M.jsx)(p,{series:i,annotations:a,xAxis:{type:`time`,format:e=>o.format(e)},yAxis:{format:e=>s.format(e)},renderTooltip:t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,s.format(r.y)]):n.push([e(`open`),s.format(r.open)],[e(`high`),s.format(r.high??r.y)],[e(`low`),s.format(r.low??r.y)],[e(`close`),s.format(r.y)]);return(0,M.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,M.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:o.format(t.x)}),n.map(([e,t])=>(0,M.jsxs)(`span`,{style:{display:`contents`},children:[(0,M.jsx)(`span`,{children:e}),(0,M.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},height:340,ariaLabel:e(`intradayAria`)})}var j,M,N,ze,P,F,Be,Ve,He,Ue,We;function Ge(){return(Ge=e((()=>{j=t(),i(),f(),M=n(),N=6e4,ze=Date.UTC(2026,9,29,13,30),P=ze+150*N,F=Le(23),Be=[],Ve=[],He=212,Ue=0,We=0;for(let e=0;e<78;e++){let t=ze+e*5*N,n=t===P?-.025:0,r=He,i=r*(1+(F()+F()-1)*.004+n),a=Math.max(r,i)*(1+F()*.002),o=Math.min(r,i)*(1-F()*.002),s=1+3*Math.exp(-e/6)+2*Math.exp((e-77)/6)+(t>=P&&t<P+30*N?3:0);Ue+=s,We+=s*((a+o+i)/3),Be.push({x:t,open:r,high:a,low:o,y:i}),Ve.push([t,We/Ue]),He=i}})))()}function Ke(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function qe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,a]=(0,I.useState)(null),o=(0,I.useMemo)(()=>{let e=Ke(50),t=new Float64Array(R),n=new Float64Array(R),r=new Float64Array(R),i=new Float64Array(R),a=new Float64Array(R),o=3200,s=.0012;for(let c=0;c<R;c++){s=Math.min(.004,Math.max(5e-4,s*(1+(e()-.5)*.1)));let l=o,u=l*(1+(e()+e()-1)*s);t[c]=Ye+c*Je,n[c]=l,a[c]=u,r[c]=Math.max(l,u)*(1+e()*s*.6),i[c]=Math.min(l,u)*(1-e()*s*.6),o=u}return[{name:`ETH / USD`,data:{x:t,open:n,high:r,low:i,y:a}}]},[]),s=(0,I.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}),[n]),c=(0,I.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}),[n]);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,L.jsx)(p,{series:o,xAxis:{type:`time`},yAxis:{format:e=>s.format(e)},renderTooltip:t=>{let n=t.items[0];if(!n||n.open===void 0)return null;let r=[[e(`open`),n.open],[e(`high`),n.high??n.y],[e(`low`),n.low??n.y],[e(`close`),n.y]];return(0,L.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,L.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:c.format(n.x)}),r.map(([e,t])=>(0,L.jsxs)(`span`,{style:{display:`contents`},children:[(0,L.jsx)(`span`,{children:e}),(0,L.jsx)(`span`,{style:{textAlign:`end`},children:s.format(t)})]},e))]})},onRendererChange:a,height:340,ariaLabel:e(`candlesAria`)}),(0,L.jsx)(`p`,{role:`status`,children:e(`largeStatus`,{candles:new Intl.NumberFormat(n).format(R),renderer:i??`…`})})]})}var I,L,R,Je,Ye;function Xe(){return(Xe=e((()=>{I=t(),i(),f(),L=n(),R=5e4,Je=6e4,Ye=new Date(2026,4,1).getTime()})))()}function Ze(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),t=(0,z.useRef)(null),[n]=(0,z.useState)(Qe),[i,a]=(0,z.useState)(!0);return(0,z.useEffect)(()=>{if(!i)return;let e=t.current?.getBarCount()??0,r=t.current?.getBar(e-1)??{...n[n.length-1]},a=oe(Date.now()%997,r.close,2e-4),o=setInterval(()=>{let e=a(),n=Math.floor(Date.now()/V)*V,i=Math.round(e.price*1e4)/1e4,o=e.size*4e3;r=n===r.time?{...r,high:Math.max(r.high,i),low:Math.min(r.low,i),close:i,volume:(r.volume??0)+o}:{time:n,open:r.close,high:i,low:i,close:i,volume:o},t.current?.update(r)},100);return()=>clearInterval(o)},[i,n]),(0,B.jsxs)(`div`,{style:{display:`grid`,gap:10,width:`100%`},children:[(0,B.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,B.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>a(e=>!e),children:e(i?`pause`:`resume`)}),(0,B.jsx)(`span`,{role:`status`,style:{fontSize:13,color:`var(--text-secondary-color)`},children:e(i?`liveStatus`:`livePaused`)})]}),(0,B.jsx)(h,{ref:t,bars:n,timeframe:V,symbol:e(`ada`),labels:{timeframe:e(`fiveSeconds`)},countdown:!0,indicators:[{type:`volume`,overlay:!0}],barSpacing:9,ariaLabel:e(`liveAria`),height:380})]})}var z,B,V,Qe;function $e(){return($e=e((()=>{z=t(),i(),a(),g(),v(),B=n(),V=5e3,Qe=()=>{let e=Math.floor(Date.now()/V)*V;return m({count:240,timeframe:V,seed:99,price:.6245,volatility:6e-4,volume:14e3,start:e-239*V},4)}})))()}function et(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`});return(0,tt.jsx)(h,{bars:nt,timeframe:`4H`,symbol:e(`eth`),indicators:rt,ariaLabel:e(`ribbonAria`),height:440})}var tt,nt,rt;function it(){return(it=e((()=>{i(),g(),v(),tt=n(),nt=m({count:360,timeframe:4*_,seed:3141,price:2480,volatility:.008,volume:900}),rt=[`#f97316`,`#f59e0b`,`#eab308`,`#84cc16`,`#22c55e`,`#14b8a6`,`#0ea5e9`,`#6366f1`].map((e,t)=>({type:`ema`,period:10+t*10,color:e,lineWidth:1.25}))})))()}function at(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ot(e,t,n,r){let i=at(e),a=[],o=n;for(let e=Date.UTC(2026,0,5);a.length<t;e+=ct){if(new Date(e).getUTCDay()%6==0)continue;let t=a.length,n=t<50?.004:t<80?-.005:.003,s=o*(1+(i()-.5)*.012);o=s*(1+(i()+i()-1)*.032+n);let c=Math.max(s,o)*(1+i()*.014),l=Math.min(s,o)*(1-i()*.014);a.push({x:r.format(e),open:s,high:c,low:l,y:o})}return a}function st(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,H.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),a=(0,H.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`exceptZero`}),[n]),o=(0,H.useMemo)(()=>{let t=ot(7,120,64,new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`}));return[{name:`NOVA`,data:t},{name:e(`ma`,{days:5}),type:`line`,data:lt(t,5),curve:`smooth`,lineWidth:1.5,color:`var(--warning-color)`},{name:e(`ma`,{days:20}),type:`line`,data:lt(t,20),curve:`smooth`,lineWidth:2,color:`var(--primary-color)`}]},[e,n]);return(0,U.jsx)(p,{series:o,yAxis:{format:e=>i.format(e)},renderTooltip:t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,i.format(r.y)]):n.push([e(`open`),i.format(r.open)],[e(`high`),i.format(r.high??r.y)],[e(`low`),i.format(r.low??r.y)],[e(`close`),i.format(r.y)],[e(`change`),a.format(r.y/r.open-1)]);return(0,U.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,U.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),n.map(([e,t])=>(0,U.jsxs)(`span`,{style:{display:`contents`},children:[(0,U.jsx)(`span`,{children:e}),(0,U.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},height:360,ariaLabel:e(`novaAria`)})}var H,U,ct,lt;function ut(){return(ut=e((()=>{H=t(),i(),f(),U=n(),ct=864e5,lt=(e,t)=>e.map((n,r)=>{if(r<t-1)return[n.x,null];let i=0;for(let n=r-t+1;n<=r;n++)i+=e[n].y;return[n.x,i/t]})})))()}function dt(e,t){let n=e[t],r=e[t-1];if(!r||t<5)return null;let i=n.high-n.low;if(i<=0)return null;let a=Math.abs(n.close-n.open),o=n.high-Math.max(n.open,n.close),s=Math.min(n.open,n.close)-n.low,c=n.close-e[t-5].close;return r.close<r.open&&n.close>n.open&&n.open<=r.close&&n.close>=r.open?`bullishEngulfing`:r.close>r.open&&n.close<n.open&&n.open>=r.close&&n.close<=r.open?`bearishEngulfing`:a<=i*.35&&s>=a*2&&o<=i*.15?c<0?`hammer`:null:a<=i*.35&&o>=a*2&&s<=i*.15?c>0?`shootingStar`:null:a<=i*.06?`doji`:null}function ft(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,[i,a]=(0,W.useState)(`all`),[o,c]=(0,W.useState)(null),l=(0,W.useMemo)(()=>K.flatMap((t,n)=>{let r=gt[n];return!r||!vt(r,i)?[]:[{id:`${r}-${n}`,time:t.time,side:ht.has(r)?`buy`:`sell`,color:_t[r],text:e(`patternCodes.${r}`)}]}),[i,e]),d=(0,W.useMemo)(()=>{let e=Object.fromEntries(mt.map(e=>[e,0]));for(let t of gt)t&&e[t]++;return e},[]),te=e=>{let t=e?gt[e.index]:null;c(e&&t&&vt(t,i)?{pattern:t,time:e.time}:null)},ne=new Intl.DateTimeFormat(n,{dateStyle:`medium`,timeZone:`UTC`}),re=new Intl.NumberFormat(n);return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsx)(s,{"aria-label":e(`patternFilter`),direction:`horizontal`,value:i,onChange:e=>a(e),children:pt.map(t=>(0,G.jsx)(u,{value:t,label:e(`patternFilters.${t}`)},t))}),(0,G.jsx)(h,{bars:K,timeframe:`1D`,symbol:e(`orbt`),markers:l,onCrosshairMove:te,ariaLabel:e(`patternsAria`),height:400}),(0,G.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:mt.map(t=>(0,G.jsxs)(ee,{color:`neutral`,variant:`outline`,children:[(0,G.jsx)(`span`,{"aria-hidden":`true`,style:{display:`inline-block`,width:8,height:8,marginInlineEnd:6,borderRadius:2,background:_t[t]}}),e(`patternCount`,{name:e(`patternNames.${t}`),value:re.format(d[t])})]},t))}),(0,G.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:o?e(`patternAt`,{name:e(`patternNames.${o.pattern}`),date:ne.format(o.time),meaning:e(`patternMeanings.${o.pattern}`)}):e(`patternHint`)})]})}var W,G,pt,mt,ht,K,gt,_t,vt;function yt(){return(yt=e((()=>{W=t(),i(),c(),l(),d(),g(),v(),G=n(),pt=[`all`,`doji`,`hammer`,`shootingStar`,`engulfing`],mt=[`doji`,`hammer`,`shootingStar`,`bullishEngulfing`,`bearishEngulfing`],ht=new Set([`hammer`,`bullishEngulfing`]),K=m({count:180,timeframe:y,seed:707,price:96,volatility:.018,volume:2e7,market:`stock`}),gt=K.map((e,t)=>dt(K,t)),_t={doji:`var(--warning-color)`,hammer:`var(--success-color)`,shootingStar:`var(--danger-color)`,bullishEngulfing:`var(--primary-color)`,bearishEngulfing:`#a855f7`},vt=(e,t)=>t===`all`||e===t||t===`engulfing`&&e.endsWith(`Engulfing`)})))()}function bt(){let{t:e}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),[t,n]=(0,xt.useState)(`pane`);return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsxs)(s,{label:e(`volumeLayout`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[(0,q.jsx)(u,{value:`pane`,label:e(`volumePane`)}),(0,q.jsx)(u,{value:`overlay`,label:e(`volumeOverlay`)})]}),(0,q.jsx)(h,{bars:St,timeframe:`1H`,symbol:e(`btc`),indicators:[{type:`volume`,maPeriod:20,overlay:t===`overlay`,height:110}],ariaLabel:e(`volumeColorsAria`),height:420})]})}var xt,q,St;function Ct(){return(Ct=e((()=>{xt=t(),i(),c(),l(),g(),v(),q=n(),St=m({count:240,timeframe:_,seed:4096,price:63200,volatility:.0045,volume:260})})))()}function wt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Tt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),n=t.language,i=(0,J.useRef)(null),a=(0,J.useRef)(null),{candles:o,bars:s}=(0,J.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`});return{candles:[{name:`ORBT`,data:Z.map(e=>({x:t.format(e.time),open:e.open,high:e.high,low:e.low,y:e.close}))}],bars:[{name:e(`volume`),data:Z.map(e=>({x:t.format(e.time),y:e.volume,color:e.close>=e.open?`var(--success-color)`:`var(--danger-color)`}))}]}},[e,n]),c=(0,J.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`}),[n]),l=(0,J.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),u=t=>{let n=[];for(let r of t.items)r.open===void 0?n.push([r.seriesName,c.format(r.y)]):n.push([e(`open`),c.format(r.open)],[e(`high`),c.format(r.high??r.y)],[e(`low`),c.format(r.low??r.y)],[e(`close`),c.format(r.y)]);return(0,Y.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`auto auto`,gap:`2px 12px`},children:[(0,Y.jsx)(`strong`,{style:{gridColumn:`1 / -1`},children:t.xLabel}),n.map(([e,t])=>(0,Y.jsxs)(`span`,{style:{display:`contents`},children:[(0,Y.jsx)(`span`,{children:e}),(0,Y.jsx)(`span`,{style:{textAlign:`end`},children:t})]},e))]})},[d,ee]=(0,J.useState)({prices:0,volumes:0});return(0,J.useEffect)(()=>{let e=i.current?.getInstance(),t=a.current?.getInstance();if(!e||!t)return;let n=()=>{let n=e.getPlotRect(),r=t.getPlotRect();n&&r&&ee(e=>{let t=n.x-e.prices,i=r.x-e.volumes,a=Math.max(t,i),o={prices:a-t,volumes:a-i};return o.prices===e.prices&&o.volumes===e.volumes?e:o})},r=[e.on(`layout`,n),t.on(`layout`,n)];return n(),()=>r.forEach(e=>e())},[]),(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:0,width:`100%`},children:[(0,Y.jsx)(p,{ref:i,series:o,yAxis:{format:e=>c.format(e)},xAxis:{visible:!1},renderTooltip:u,onZoom:e=>a.current?.setView({x:e.x}),legend:!1,padding:{left:4+d.prices},height:260,ariaLabel:e(`pricesAria`)}),(0,Y.jsx)(ae,{ref:a,series:s,yAxis:{format:e=>l.format(e),tickCount:2},onZoom:e=>i.current?.setView({x:e.x}),legend:!1,padding:{left:4+d.volumes},height:120,ariaLabel:e(`volumeAria`)})]})}var J,Y,Et,X,Z,Dt;function Ot(){return(Ot=e((()=>{J=t(),i(),f(),Y=n(),Et=864e5,X=wt(19),Z=[],Dt=48;for(let e=Date.UTC(2026,5,1);Z.length<90;e+=Et){if(new Date(e).getUTCDay()%6==0)continue;let t=Dt*(1+(X()-.5)*.01),n=(X()+X()-1)*.04,r=t*(1+n),i=Math.max(t,r)*(1+X()*.015),a=Math.min(t,r)*(1-X()*.015),o=Math.round(2e6*(.6+X()*.6+Math.abs(n)*25));Z.push({time:e,open:t,high:i,low:a,close:r,volume:o}),Dt=r}})))()}function kt({asset:e}){let{t,i18n:n}=r(`common`,{keyPrefix:`docs.candlestick-chart.data`}),i=n.language,a=e.candles[0].open,o=e.candles[e.candles.length-1].y,s=o/a-1,{price:c,when:l}=(0,jt.useMemo)(()=>({price:new Intl.NumberFormat(i,{...e.currency?{style:`currency`,currency:e.currency}:{},minimumFractionDigits:e.decimals,maximumFractionDigits:e.decimals}),when:new Intl.DateTimeFormat(i,e.intraday?{weekday:`short`,hour:`2-digit`,minute:`2-digit`,timeZone:`UTC`}:{dateStyle:`medium`,timeZone:`UTC`})}),[i,e]),u=(0,jt.useMemo)(()=>[{name:t(`assets.${e.id}`),data:e.candles}],[e,t]),d=new Intl.NumberFormat(i,{style:`percent`,minimumFractionDigits:2,maximumFractionDigits:2,signDisplay:`exceptZero`});return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:4,padding:12,border:`1px solid var(--border-color)`,borderRadius:8},children:[(0,Q.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`baseline`,gap:8},children:[(0,Q.jsx)(`strong`,{children:t(`assets.${e.id}`)}),(0,Q.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:12},children:e.intraday?t(`lastHours`):t(`lastDays`)})]}),(0,Q.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:8,fontVariantNumeric:`tabular-nums`},children:[(0,Q.jsx)(`span`,{style:{fontSize:18,fontWeight:600},children:c.format(o)}),(0,Q.jsx)(`span`,{style:{fontSize:13,color:s>=0?`var(--success-color)`:`var(--danger-color)`},children:d.format(s)})]}),(0,Q.jsx)(p,{series:u,annotations:[{type:`line`,axis:`y`,value:a,dash:[3,3],color:`var(--text-secondary-color)`}],xAxis:{type:`time`,visible:!1},yAxis:{visible:!1},legend:!1,padding:{top:4,right:4,bottom:4,left:4},renderTooltip:e=>{let t=e.items[0];return t?(0,Q.jsxs)(`span`,{style:{whiteSpace:`nowrap`},children:[l.format(e.x),` · `,c.format(t.y)]}):null},height:120,ariaLabel:t(`watchAria`,{name:t(`assets.${e.id}`),change:d.format(s)})})]})}function At(){return(0,Q.jsx)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,width:`100%`},children:Mt.map(e=>(0,Q.jsx)(kt,{asset:e},e.id))})}var jt,Q,$,Mt;function Nt(){return(Nt=e((()=>{jt=t(),i(),f(),v(),Q=n(),$=(e,t)=>m(e,t).map(e=>({x:e.time,open:e.open,high:e.high,low:e.low,y:e.close})),Mt=[{id:`btc`,intraday:!0,decimals:0,currency:`USD`,candles:$({count:48,timeframe:_,seed:81,price:64e3,volatility:.006},0)},{id:`aapl`,intraday:!1,decimals:2,currency:`USD`,candles:$({count:30,timeframe:y,seed:82,price:228,volatility:.014,market:`stock`},2)},{id:`eurusd`,intraday:!0,decimals:5,candles:$({count:48,timeframe:_,seed:83,price:1.0854,volatility:.0012},5)},{id:`gold`,intraday:!1,decimals:2,currency:`USD`,candles:$({count:30,timeframe:y,seed:84,price:2640,volatility:.009,market:`stock`},2)}]})))()}var Pt;function Ft(){return(Ft=e((()=>{Pt=`import { useTranslation } from "react-i18next";
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
`})))()}var It;function Lt(){return(Lt=e((()=>{It=`import { useTranslation } from "react-i18next";
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
`})))()}var Rt;function zt(){return(zt=e((()=>{Rt=`import { useMemo, useState } from "react";
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
`})))()}var Bt;function Vt(){return(Vt=e((()=>{Bt=`import { useTranslation } from "react-i18next";
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
`})))()}var Ht;function Ut(){return(Ut=e((()=>{Ht=`import { useMemo } from "react";
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
`})))()}var Wt;function Gt(){return(Gt=e((()=>{Wt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingCrosshairEvent,
  type TradingPriceLine,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

/** One pip of EUR/USD */
const PIP = 0.0001;

// Monday to Friday, hourly, in UTC like most FX platforms
const bars = generateBars(
  {
    count: 120,
    timeframe: HOUR,
    seed: 1_085,
    price: 1.0854,
    volatility: 0.0011,
    volume: 4_000,
    start: Date.UTC(2026, 9, 26),
  },
  5,
);

// classic floor pivots of Thursday, the levels traded on Friday
const thursday = bars.slice(72, 96);
const high = Math.max(...thursday.map((bar) => bar.high));
const low = Math.min(...thursday.map((bar) => bar.low));
const close = thursday[thursday.length - 1].close;
const pivot = (high + low + close) / 3;
const PIVOTS = {
  r1: 2 * pivot - low,
  pivot,
  s1: 2 * pivot - high,
};

export default function FxPipsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [hover, setHover] = useState<TradingCrosshairEvent | null>(null);

  const formatPrice = useMemo(() => {
    const rate = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    });
    return (value: number) => rate.format(value);
  }, [locale]);
  const priceLines = useMemo(
    (): TradingPriceLine[] =>
      (Object.keys(PIVOTS) as (keyof typeof PIVOTS)[]).map((key) => ({
        id: key,
        price: PIVOTS[key],
        title: t(\`pivots.\${key}\`),
        color:
          key === "r1"
            ? "var(--danger-color)"
            : key === "s1"
              ? "var(--success-color)"
              : "var(--warning-color)",
        lineStyle: "dashed",
      })),
    [t],
  );

  const pips = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });
  const unsigned = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const clock = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
  const bar = hover?.bar;
  const previous = hover && hover.index > 0 ? bars[hover.index - 1] : null;
  const last = bars[bars.length - 1].close;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eurusd")}
        formatPrice={formatPrice}
        timeZone="UTC"
        sessionBreaks
        priceLines={priceLines}
        onCrosshairMove={setHover}
        ariaLabel={t("fxAria")}
        height={400}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {bar && hover
          ? t("pipReadout", {
              time: clock.format(bar.time),
              range: unsigned.format((bar.high - bar.low) / PIP),
              body: pips.format((bar.close - bar.open) / PIP),
              change: previous
                ? pips.format((bar.close - previous.close) / PIP)
                : "…",
              distance: pips.format((hover.price - last) / PIP),
            })
          : t("pipHint", {
              pivot: formatPrice(PIVOTS.pivot),
              r1: formatPrice(PIVOTS.r1),
              s1: formatPrice(PIVOTS.s1),
            })}
      </span>
    </div>
  );
}
`})))()}var Kt;function qt(){return(qt=e((()=>{Kt=`import { useMemo } from "react";
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
`})))()}var Jt;function Yt(){return(Yt=e((()=>{Jt=`import { useMemo, useState } from "react";
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
`})))()}var Xt;function Zt(){return(Zt=e((()=>{Xt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Qt;function $t(){return($t=e((()=>{Qt=`import { useTranslation } from "react-i18next";
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
`})))()}var en;function tn(){return(tn=e((()=>{en=`import { useMemo } from "react";
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
`})))()}var nn;function rn(){return(rn=e((()=>{nn=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Tag } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingCrosshairEvent,
  type TradingMarker,
} from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

type Pattern =
  "doji" | "hammer" | "shootingStar" | "bullishEngulfing" | "bearishEngulfing";

type Filter = "all" | "doji" | "hammer" | "shootingStar" | "engulfing";

const FILTERS: Filter[] = [
  "all",
  "doji",
  "hammer",
  "shootingStar",
  "engulfing",
];
const PATTERNS: Pattern[] = [
  "doji",
  "hammer",
  "shootingStar",
  "bullishEngulfing",
  "bearishEngulfing",
];
const BULLISH = new Set<Pattern>(["hammer", "bullishEngulfing"]);

const bars = generateBars({
  count: 180,
  timeframe: DAY,
  seed: 707,
  price: 96,
  volatility: 0.018,
  volume: 2e7,
  market: "stock",
});

/**
 * Classic single and two-candle patterns; a hammer needs a decline before
 * it, a shooting star a rise (closes 5 bars earlier)
 */
function detect(list: readonly TradingBar[], i: number): Pattern | null {
  const bar = list[i];
  const prev = list[i - 1];
  if (!prev || i < 5) return null;
  const range = bar.high - bar.low;
  if (range <= 0) return null;
  const body = Math.abs(bar.close - bar.open);
  const upper = bar.high - Math.max(bar.open, bar.close);
  const lower = Math.min(bar.open, bar.close) - bar.low;
  const trend = bar.close - list[i - 5].close;
  if (
    prev.close < prev.open &&
    bar.close > bar.open &&
    bar.open <= prev.close &&
    bar.close >= prev.open
  )
    return "bullishEngulfing";
  if (
    prev.close > prev.open &&
    bar.close < bar.open &&
    bar.open >= prev.close &&
    bar.close <= prev.open
  )
    return "bearishEngulfing";
  if (body <= range * 0.35 && lower >= body * 2 && upper <= range * 0.15)
    return trend < 0 ? "hammer" : null;
  if (body <= range * 0.35 && upper >= body * 2 && lower <= range * 0.15)
    return trend > 0 ? "shootingStar" : null;
  if (body <= range * 0.06) return "doji";
  return null;
}

const found = bars.map((_, i) => detect(bars, i));

const COLORS: Record<Pattern, string> = {
  doji: "var(--warning-color)",
  hammer: "var(--success-color)",
  shootingStar: "var(--danger-color)",
  bullishEngulfing: "var(--primary-color)",
  bearishEngulfing: "#a855f7",
};

const matches = (pattern: Pattern, filter: Filter) =>
  filter === "all" ||
  pattern === filter ||
  (filter === "engulfing" && pattern.endsWith("Engulfing"));

export default function PatternsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<{
    pattern: Pattern;
    time: number;
  } | null>(null);

  const markers = useMemo(
    (): TradingMarker[] =>
      bars.flatMap((bar, i) => {
        const pattern = found[i];
        if (!pattern || !matches(pattern, filter)) return [];
        // bullish patterns below the candle, the others above it
        return [
          {
            id: \`\${pattern}-\${i}\`,
            time: bar.time,
            side: BULLISH.has(pattern) ? "buy" : "sell",
            color: COLORS[pattern],
            text: t(\`patternCodes.\${pattern}\`),
          },
        ];
      }),
    [filter, t],
  );
  const counts = useMemo(() => {
    const result = Object.fromEntries(PATTERNS.map((p) => [p, 0])) as Record<
      Pattern,
      number
    >;
    for (const pattern of found) if (pattern) result[pattern]++;
    return result;
  }, []);

  const onCrosshairMove = (event: TradingCrosshairEvent | null) => {
    const pattern = event ? found[event.index] : null;
    setHovered(
      event && pattern && matches(pattern, filter)
        ? { pattern, time: event.time }
        : null,
    );
  };

  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  const integer = new Intl.NumberFormat(locale);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("patternFilter")}
        direction="horizontal"
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
      >
        {FILTERS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t(\`patternFilters.\${value}\`)}
          />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("orbt")}
        markers={markers}
        onCrosshairMove={onCrosshairMove}
        ariaLabel={t("patternsAria")}
        height={400}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {PATTERNS.map((pattern) => (
          <Tag key={pattern} color="neutral" variant="outline">
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                marginInlineEnd: 6,
                borderRadius: 2,
                background: COLORS[pattern],
              }}
            />
            {t("patternCount", {
              name: t(\`patternNames.\${pattern}\`),
              value: integer.format(counts[pattern]),
            })}
          </Tag>
        ))}
      </div>
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {hovered
          ? t("patternAt", {
              name: t(\`patternNames.\${hovered.pattern}\`),
              date: date.format(hovered.time),
              meaning: t(\`patternMeanings.\${hovered.pattern}\`),
            })
          : t("patternHint")}
      </span>
    </div>
  );
}
`})))()}var an;function on(){return(on=e((()=>{an=`import { useState } from "react";
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
`})))()}var sn;function cn(){return(cn=e((()=>{sn=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var ln;function un(){return(un=e((()=>{ln=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";
import { DAY, HOUR, generateBars } from "../../trading-chart/data";

type AssetId = "btc" | "aapl" | "eurusd" | "gold";

interface Asset {
  id: AssetId;
  /** Intraday assets show hours, the others dates */
  intraday: boolean;
  decimals: number;
  /** ISO currency of the quote, or none for a rate */
  currency?: string;
  candles: { x: number; open: number; high: number; low: number; y: number }[];
}

const candles = (
  options: Parameters<typeof generateBars>[0],
  decimals: number,
) =>
  generateBars(options, decimals).map((bar) => ({
    x: bar.time,
    open: bar.open,
    high: bar.high,
    low: bar.low,
    y: bar.close,
  }));

// two days of hourly candles for the 24-hour markets, six weeks of daily
// candles for the others
const ASSETS: Asset[] = [
  {
    id: "btc",
    intraday: true,
    decimals: 0,
    currency: "USD",
    candles: candles(
      {
        count: 48,
        timeframe: HOUR,
        seed: 81,
        price: 64_000,
        volatility: 0.006,
      },
      0,
    ),
  },
  {
    id: "aapl",
    intraday: false,
    decimals: 2,
    currency: "USD",
    candles: candles(
      {
        count: 30,
        timeframe: DAY,
        seed: 82,
        price: 228,
        volatility: 0.014,
        market: "stock",
      },
      2,
    ),
  },
  {
    id: "eurusd",
    intraday: true,
    decimals: 5,
    candles: candles(
      {
        count: 48,
        timeframe: HOUR,
        seed: 83,
        price: 1.0854,
        volatility: 0.0012,
      },
      5,
    ),
  },
  {
    id: "gold",
    intraday: false,
    decimals: 2,
    currency: "USD",
    candles: candles(
      {
        count: 30,
        timeframe: DAY,
        seed: 84,
        price: 2_640,
        volatility: 0.009,
        market: "stock",
      },
      2,
    ),
  },
];

function AssetCard({ asset }: { asset: Asset }) {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const first = asset.candles[0].open;
  const last = asset.candles[asset.candles.length - 1].y;
  const change = last / first - 1;

  const { price, when } = useMemo(
    () => ({
      price: new Intl.NumberFormat(locale, {
        ...(asset.currency
          ? { style: "currency", currency: asset.currency }
          : {}),
        minimumFractionDigits: asset.decimals,
        maximumFractionDigits: asset.decimals,
      }),
      when: new Intl.DateTimeFormat(
        locale,
        asset.intraday
          ? {
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            }
          : { dateStyle: "medium", timeZone: "UTC" },
      ),
    }),
    [locale, asset],
  );
  const series = useMemo(
    (): ChartSeries[] => [
      { name: t(\`assets.\${asset.id}\`), data: asset.candles },
    ],
    [asset, t],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });

  // a one-line tooltip fits a small card
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <span style={{ whiteSpace: "nowrap" }}>
        {when.format(event.x)} · {price.format(item.y)}
      </span>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 4,
        padding: 12,
        border: "1px solid var(--border-color)",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <strong>{t(\`assets.\${asset.id}\`)}</strong>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
          {asset.intraday ? t("lastHours") : t("lastDays")}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600 }}>
          {price.format(last)}
        </span>
        <span
          style={{
            fontSize: 13,
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {percent.format(change)}
        </span>
      </div>
      <CandlestickChart
        series={series}
        // the dashed line is where the period opened
        annotations={[
          {
            type: "line",
            axis: "y",
            value: first,
            dash: [3, 3],
            color: "var(--text-secondary-color)",
          },
        ]}
        xAxis={{ type: "time", visible: false }}
        yAxis={{ visible: false }}
        legend={false}
        padding={{ top: 4, right: 4, bottom: 4, left: 4 }}
        renderTooltip={tooltip}
        height={120}
        ariaLabel={t("watchAria", {
          name: t(\`assets.\${asset.id}\`),
          change: percent.format(change),
        })}
      />
    </div>
  );
}

export default function WatchlistDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        width: "100%",
      }}
    >
      {ASSETS.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
`})))()}var dn,fn,pn;function mn(){return(mn=e((()=>{de(),he(),be(),Te(),Ae(),Ie(),Ge(),Xe(),$e(),it(),ut(),yt(),Ct(),Ot(),Nt(),Ft(),Lt(),zt(),Vt(),Ut(),Gt(),qt(),Yt(),Zt(),$t(),tn(),rn(),on(),cn(),un(),t(),ne(),ie(),dn=n(),fn=te(Object.assign({"./demos/a-share.tsx":ce,"./demos/bar-styles.tsx":fe,"./demos/basic.tsx":ve,"./demos/dark.tsx":xe,"./demos/events.tsx":Ee,"./demos/fx-pips.tsx":je,"./demos/intraday.tsx":Re,"./demos/large-data.tsx":qe,"./demos/live.tsx":Ze,"./demos/ma-ribbon.tsx":et,"./demos/moving-average.tsx":st,"./demos/patterns.tsx":ft,"./demos/volume-colors.tsx":bt,"./demos/volume.tsx":Tt,"./demos/watchlist.tsx":At}),Object.assign({"./demos/a-share.tsx":Pt,"./demos/bar-styles.tsx":It,"./demos/basic.tsx":Rt,"./demos/dark.tsx":Bt,"./demos/events.tsx":Ht,"./demos/fx-pips.tsx":Wt,"./demos/intraday.tsx":Kt,"./demos/large-data.tsx":Jt,"./demos/live.tsx":Xt,"./demos/ma-ribbon.tsx":Qt,"./demos/moving-average.tsx":en,"./demos/patterns.tsx":nn,"./demos/volume-colors.tsx":an,"./demos/volume.tsx":sn,"./demos/watchlist.tsx":ln})),pn=()=>(0,dn.jsx)(re,{id:`candlestick-chart`,demos:fn})})))()}mn();export{pn as default};