import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B0qPOCL4.js";import{R as a,z as o}from"./ProgressIndicator-Ve8Z1qBV.js";import{i as s,t as c}from"./Card-BACH_PxY.js";import{i as l,n as u,r as d,t as f}from"./Radio-DZ0GJqPj.js";import{n as p,t as m}from"./Alert-C6APEdS0.js";import{n as h,t as g}from"./Switch-DyiiEE7x.js";import{n as _,t as v}from"./Slider-BGLHCIbS.js";import{n as y,r as ee}from"./ConfigProvider-hfZxH_FH.js";import{i as te,r as b}from"./DemoBlock-wJsKBAzK.js";import{i as ne,o as re,t as x}from"./Select-Bx8KKx4S.js";import{a as ie,c as S,f as ae,l as oe,o as C,r as w,t as se,u as T}from"./feed-C1IXjHua.js";import{l as ce,n as le,t as ue,u as de}from"./DocPage-NsvUwyMh.js";function fe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,pe.useRef)(null),n=(0,pe.useRef)(null);return C(n,t,{seed:21},12e4),(0,me.jsx)(`div`,{ref:n,style:{width:`100%`},children:(0,me.jsx)(S,{ref:t,height:400,interval:250,window:12e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var pe,me;function he(){return(he=e((()=>{pe=t(),i(),T(),w(),me=n()})))()}function ge(e,t){let n=Number.isFinite(e)&&e>0?e:1e3,r=Number.isFinite(t)?Math.max(1,Math.floor(t)):180,i=new Map;return{add(e){for(let t of e){if(![t.time,t.price,t.size].every(Number.isFinite)||t.price<=0||t.size<=0)continue;let e=Math.floor(t.time/n)*n,a=i.get(e);a?(a.bar.high=Math.max(a.bar.high,t.price),a.bar.low=Math.min(a.bar.low,t.price),a.bar.volume=(a.bar.volume??0)+t.size,t.time<a.first&&(a.first=t.time,a.bar.open=t.price),t.time>=a.last&&(a.last=t.time,a.bar.close=t.price)):i.set(e,{first:t.time,last:t.time,bar:{time:e,open:t.price,high:t.price,low:t.price,close:t.price,volume:t.size}}),i.size>r&&i.delete(Math.min(...i.keys()))}},values(){return[...i.values()].map(({bar:e})=>({...e})).sort((e,t)=>e.time-t.time)}}}function E(e,t,n,r=!0){let i=(0,D.useRef)(null),a=(0,D.useRef)(ge(2e3,180)),o=(0,D.useRef)(0),s=(0,D.useRef)(0),[c,l]=(0,D.useState)(null),u=e=>{let n=e.snapshot(),r=n.bids.reduce((e,t)=>e+t[1],0),i=n.asks.reduce((e,t)=>e+t[1],0);l({latest:e.last(),bidDepth:r,askDepth:i,imbalance:(r-i)/(r+i||1),bidWall:Math.max(0,...n.bids.map(e=>e[1])),askWall:Math.max(0,...n.asks.map(e=>e[1])),start:Math.max(s.current,e.time()-18e4),end:e.time(),closes:a.current.values().map(e=>e.close),viewport:t.current?.getView()??null}),o.current=performance.now()},d=(0,D.useRef)(u);return(0,D.useEffect)(()=>{d.current=u}),(0,D.useEffect)(()=>{let r=t.current,o=!1,c=!1,l=()=>{if(c||o||!t.current)return;c=!0;let e=se({seed:71,price:76e3,tick:1,levels:180,activity:90,whales:.01},9e4,250);a.current=ge(2e3,180),s.current=e.snapshot.time??e.feed.time()-9e4;let r=t.current;r.clear(),r.setBook(e.snapshot);for(let t of e.updates)r.applyDeltas(t.delta),r.addTrades(t.trades),a.current.add(t.trades);r.setBars(a.current.values()),i.current=e.feed,n?.current?.setBook(e.feed.snapshot()),n?.current?.setLastPrice(e.feed.last()),d.current(e.feed)},u=typeof IntersectionObserver==`function`?new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&l()}):null;return e.current&&u?u.observe(e.current):l(),()=>{o=!0,u?.disconnect(),i.current=null,r?.clear()}},[e,t,n]),ie(e,e=>{let r=i.current,s=t.current;if(!r||!s)return;let c=r.step(e);s.applyDeltas(c.delta),s.addTrades(c.trades),a.current.add(c.trades);let l=a.current.values();l.length&&s.updateBar(l[l.length-1]),n?.current?.applyDeltas(c.delta),n?.current?.setLastPrice(r.last()),performance.now()-o.current>=1e3&&d.current(r)},{interval:50,running:r}),c}var D;function O(){return(O=e((()=>{D=t(),w()})))()}var _e,ve,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,k;function A(){return(A=e((()=>{_e=`_demo_1ru31_1`,ve=`_controls_1ru31_8`,ye=`_control_1ru31_8`,be=`_terminal_1ru31_24`,xe=`_heading_1ru31_47`,Se=`_badge_1ru31_61`,Ce=`_metrics_1ru31_70`,we=`_metric_1ru31_70`,Te=`_workspace_1ru31_96`,Ee=`_chart_1ru31_102`,De=`_ladder_1ru31_106`,Oe=`_navigator_1ru31_120`,ke=`_navigatorHeader_1ru31_134`,Ae=`_caption_1ru31_143`,k={demo:_e,controls:ve,control:ye,terminal:be,heading:xe,badge:Se,metrics:Ce,metric:we,workspace:Te,chart:Ee,ladder:De,navigator:Oe,navigatorHeader:ke,caption:Ae}})))()}function je(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,Me.useRef)(null),n=(0,Me.useRef)(null),[i,a]=(0,Me.useState)(!0);return E(t,n),(0,j.jsxs)(`div`,{ref:t,className:k.demo,"data-testid":`heatmap-candles-demo`,children:[(0,j.jsxs)(`div`,{className:k.controls,children:[(0,j.jsx)(`span`,{className:k.badge,children:e(`simulated`)}),(0,j.jsx)(g,{checked:i,onChange:a,label:e(`showCandles`)})]}),(0,j.jsx)(S,{ref:n,candles:i,lastPriceLine:!0,height:420,interval:250,window:6e4,maxColumns:720,maxBars:180,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`candlesAria`)}),(0,j.jsx)(`p`,{className:k.caption,children:e(`executionsOnly`)})]})}var Me,j;function Ne(){return(Ne=e((()=>{Me=t(),i(),h(),T(),O(),A(),j=n()})))()}function Pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,M.useRef)(null),i=(0,M.useRef)(null),[a,o]=(0,M.useState)(`sqrt`),[s,c]=(0,M.useState)(1);C(i,n,{seed:23,whales:.015},6e4);let u=new Intl.NumberFormat(t.language);return(0,N.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,N.jsxs)(l,{"aria-label":e(`scale`),direction:`horizontal`,value:a,onChange:e=>o(e),children:[(0,N.jsx)(f,{value:`sqrt`,label:e(`scaleSqrt`)}),(0,N.jsx)(f,{value:`linear`,label:e(`scaleLinear`)}),(0,N.jsx)(f,{value:`log`,label:e(`scaleLog`)})]}),(0,N.jsx)(l,{"aria-label":e(`contrast`),direction:`horizontal`,value:s,onChange:e=>c(Number(e)),children:Fe.map(t=>(0,N.jsx)(f,{value:t,label:e(`times`,{value:u.format(t)})},t))})]}),(0,N.jsx)(S,{ref:n,height:380,colorScale:a,contrast:s,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var M,N,Fe;function Ie(){return(Ie=e((()=>{M=t(),i(),u(),d(),T(),w(),N=n(),Fe=[.5,1,2,4]})))()}function Le(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,Re.useRef)(null),n=(0,Re.useRef)(null);return C(n,t,{seed:25},3e4),(0,ze.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,ze.jsx)(S,{ref:t,height:240,interval:150,window:3e4,profile:!1,bubbleSize:16,fontSize:10,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var Re,ze;function Be(){return(Be=e((()=>{Re=t(),i(),T(),w(),ze=n()})))()}function Ve(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,He.useRef)(null),n=(0,He.useRef)(null);return C(n,t,{seed:24,whales:.012},9e4),(0,Ue.jsx)(`div`,{ref:n,style:We,children:(0,Ue.jsx)(S,{ref:t,height:420,colors:Ge,contrast:.7,timeZone:`utc`,interval:200,window:9e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var He,Ue,We,Ge;function Ke(){return(Ke=e((()=>{He=t(),i(),T(),w(),Ue=n(),We={"--background-color":`#06080d`,"--surface-color":`#06080d`,"--surface-elevated-color":`#151a22`,"--text-color":`#e6e8eb`,"--text-secondary-color":`#7d8590`,"--border-color":`#262c36`,"--success-color":`#26d07c`,"--danger-color":`#ff4d6a`,background:`#06080d`,color:`#e6e8eb`,borderRadius:12,padding:8,width:`100%`,boxSizing:`border-box`},Ge=[`#050b18`,`#0a2a5c`,`#0f6fb5`,`#19c2d6`,`#f5e663`,`#ff9a1f`,`#ff3b1f`]})))()}function qe({heatmap:e,summary:t}){let{t:n}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),[i,a]=(0,Je.useState)({range:[0,100],follow:!0,ready:!1});(0,Je.useEffect)(()=>{let t=e.current?.getInstance();if(!t)return;let n=e=>{let t=e.availableTime,n=!!t&&t[1]>t[0],r=n?e.view.time.map(e=>Math.max(0,Math.min(100,Math.round((e-t[0])/(t[1]-t[0])*100)))):[0,100];a(t=>t.ready===n&&t.follow===e.view.follow&&t.range[0]===r[0]&&t.range[1]===r[1]?t:{range:r,follow:e.view.follow,ready:n})},r=t.on(`view`,n),i=requestAnimationFrame(()=>n(t.getView()));return()=>{cancelAnimationFrame(i),r()}},[e]);let{range:s,follow:c,ready:l}=i,u=t?.closes??[],d=Math.min(...u),f=Math.max(...u),p=u.map((e,t)=>`${t*100/Math.max(1,u.length-1)},${40-(e-d)/(f-d||1)*34}`).join(` `);return(0,P.jsxs)(`div`,{className:k.navigator,"data-testid":`heatmap-history-navigator`,"data-follow":c,children:[(0,P.jsxs)(`div`,{className:k.navigatorHeader,children:[(0,P.jsx)(`span`,{children:n(`historyNavigator`)}),(0,P.jsx)(o,{size:`small`,"data-testid":`heatmap-follow`,onClick:()=>{e.current?.resetView()},children:n(`followMarket`)})]}),(0,P.jsx)(`svg`,{viewBox:`0 0 100 44`,preserveAspectRatio:`none`,"aria-hidden":`true`,children:(0,P.jsx)(`polyline`,{points:p,fill:`none`,stroke:`var(--success-color, #30d6a3)`,strokeWidth:`1`,vectorEffect:`non-scaling-stroke`})}),(0,P.jsx)(v,{range:!0,disabled:!l,"aria-label":n(`historyNavigator`),min:0,max:100,step:1,value:s,onChange:t=>{let n=t,r=e.current?.getView()?.availableTime;if(!r||n[1]<=n[0])return;a(e=>({...e,range:n,follow:!1}));let i=r[1]-r[0];e.current?.setView({time:[r[0]+i*n[0]/100,r[0]+i*n[1]/100]})}}),(0,P.jsx)(`p`,{className:k.caption,children:n(c?`following`:`panned`)})]})}var Je,P;function Ye(){return(Ye=e((()=>{Je=t(),i(),a(),_(),A(),P=n()})))()}function Xe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,Ze.useRef)(null),n=(0,Ze.useRef)(null),i=E(t,n);return(0,F.jsxs)(`div`,{ref:t,className:k.demo,"data-testid":`heatmap-navigation-demo`,children:[(0,F.jsx)(`span`,{className:k.badge,children:e(`simulated`)}),(0,F.jsx)(S,{ref:n,candles:!0,lastPriceLine:!0,height:420,interval:250,window:45e3,maxColumns:720,maxBars:180,pricePrecision:1,sizeUnit:`BTC`,ariaLabel:e(`navigationAria`)}),(0,F.jsx)(qe,{heatmap:n,summary:i}),(0,F.jsx)(`p`,{className:k.caption,children:e(`navigatorHint`)})]})}var Ze,F;function Qe(){return(Qe=e((()=>{Ze=t(),i(),T(),O(),Ye(),A(),F=n()})))()}function $e(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,I.useRef)(null),n=(0,I.useRef)(null),[i,a]=(0,I.useState)([.25,1]);return E(t,n),(0,L.jsxs)(`div`,{ref:t,className:k.demo,"data-testid":`heatmap-intensity-demo`,children:[(0,L.jsx)(`span`,{className:k.badge,children:e(`simulated`)}),(0,L.jsxs)(`label`,{className:k.control,children:[e(`intensityFilter`),(0,L.jsx)(v,{range:!0,"aria-label":e(`intensityFilter`),min:0,max:1,step:.05,value:i,onChange:e=>a(e),formatValue:e=>`${Math.round(e*100)}%`,showValue:!0})]}),(0,L.jsx)(S,{ref:n,intensityRange:i,candles:!0,lastPriceLine:!0,height:400,interval:250,window:6e4,maxColumns:720,maxBars:180,pricePrecision:1,sizeUnit:`BTC`,ariaLabel:e(`filterAria`)}),(0,L.jsx)(`p`,{className:k.caption,children:e(`filterHint`)})]})}var I,L;function et(){return(et=e((()=>{I=t(),i(),_(),T(),O(),A(),L=n()})))()}function tt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,R.useRef)(null),i=(0,R.useRef)(null),[a,o]=(0,R.useState)(null);C(i,n,{seed:27,whales:.03,activity:180},9e4);let s=new Intl.NumberFormat(t.language,{maximumFractionDigits:3});return(0,nt.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,nt.jsx)(S,{ref:n,height:400,interval:1e3,window:9e4,bubbleSize:30,bubbleVolume:12,contrast:.6,onHover:o,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,nt.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(`volumeAt`,{buys:s.format(a.buyVolume),sells:s.format(a.sellVolume)}):e(`volumeHint`)})]})}var R,nt;function rt(){return(rt=e((()=>{R=t(),i(),T(),w(),nt=n()})))()}function it(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,z.useRef)(null),a=(0,z.useRef)(null),o=(0,z.useRef)(null),s=(0,z.useRef)(null),c=(0,z.useRef)(null),[l,u]=(0,z.useState)({last:NaN,spread:NaN,trades:0}),d=(0,z.useRef)(0);(0,z.useEffect)(()=>{let e=i.current,t=o.current;if(!e)return;let{feed:n,snapshot:r,updates:s}=se({seed:34},6e4);e.clear(),e.setBook(r);for(let{delta:t,trades:n}of s)e.applyDeltas(t),e.addTrades(n);return t?.setTrades(s.flatMap(e=>e.trades)),a.current?.setBook(n.snapshot()),a.current?.setLastPrice(n.last()),c.current=n,()=>{c.current=null,e.clear(),t?.clear()}},[]),ie(s,e=>{let t=c.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r),a.current?.applyDeltas(n),r.length&&(a.current?.setLastPrice(t.last()),o.current?.addTrades(r));let s=performance.now();if(s-d.current<250)return;d.current=s;let l=i.current?.getInstance()?.getStore();u({last:t.last(),spread:l?l.spread():NaN,trades:o.current?.getInstance()?.getCount()??0})});let f=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),p=new Intl.NumberFormat(n);return(0,B.jsxs)(`div`,{ref:s,style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px 16px`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,B.jsx)(`strong`,{children:e(`pair`)}),(0,B.jsx)(`span`,{children:e(`lastPrice`,{value:Number.isNaN(l.last)?`…`:f.format(l.last)})}),(0,B.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`spreadIs`,{value:Number.isNaN(l.spread)?`…`:f.format(l.spread)})}),(0,B.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`tradesOnTape`,{value:p.format(l.trades)})})]}),(0,B.jsx)(S,{ref:i,height:320,interval:250,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`},children:[(0,B.jsx)(oe,{ref:a,height:300,pricePrecision:1,sizePrecision:4,ariaLabel:e(`bookAria`)}),(0,B.jsx)(ae,{ref:o,height:300,aggregate:!0,largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`tapeAria`)})]})]})}var z,B;function at(){return(at=e((()=>{z=t(),i(),T(),w(),B=n()})))()}function ot(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,V.useRef)(null),n=(0,V.useRef)(null),[i,a]=(0,V.useState)(null),[s,c]=(0,V.useState)(!0);return C(n,t,{seed:22,activity:200},15e3,{step:10,interval:10}),(0,H.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsx)(S,{ref:t,height:400,interval:50,window:15e3,onRendererChange:a,onFollowChange:c,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,H.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,color:`var(--text-secondary-color)`,fontSize:13},children:[(0,H.jsx)(`span`,{children:e(`rendererIs`,{value:i?e(`renderers.${i}`):`…`})}),(0,H.jsx)(`span`,{children:e(s?`following`:`panned`)}),(0,H.jsx)(o,{size:`small`,variant:`outline`,disabled:s,onClick:()=>t.current?.resetView(),children:e(`followMarket`)})]})]})}var V,H;function st(){return(st=e((()=>{V=t(),i(),a(),T(),w(),H=n()})))()}function ct(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,U.useRef)(null),a=(0,U.useRef)(null),[o,s]=(0,U.useState)(null),[c,l]=(0,U.useState)(null);C(a,i,{seed:35},9e4,{interval:50}),(0,U.useEffect)(()=>{let e=setInterval(()=>l(Date.now()),1e3);return()=>clearInterval(e)},[]);let{formatPrice:u,formatSize:d,contracts:f,usd:p}=(0,U.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,minimumFractionDigits:1,maximumFractionDigits:1}),t=new Intl.NumberFormat(n,{notation:`compact`,maximumFractionDigits:1}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2});return{formatPrice:t=>e.format(t),formatSize:e=>t.format(e/lt),contracts:e=>t.format(Math.round(e/lt)),usd:e=>r.format(e)}},[n]),m=c===null?null:Math.ceil(c/ut)*ut,h=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,timeZone:`UTC`,timeZoneName:`short`}),g=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hourCycle:`h23`,timeZone:`UTC`}),_=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:4,signDisplay:`always`});return(0,W.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px 16px`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,W.jsx)(`strong`,{children:e(`perpName`)}),(0,W.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`contractSize`,{value:new Intl.NumberFormat(n).format(lt)})}),(0,W.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:m===null||c===null?e(`fundingRate`,{rate:_.format(dt)}):e(`funding`,{rate:_.format(dt),time:h.format(m),countdown:g.format(m-c)})})]}),(0,W.jsx)(S,{ref:i,height:380,interval:250,window:9e4,formatPrice:u,formatSize:d,sizeUnit:e(`contracts`),timeZone:`utc`,labels:{liquidity:e(`restingContracts`),buys:e(`takerBuys`),sells:e(`takerSells`)},onHover:s,ariaLabel:e(`perpAria`)}),(0,W.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:o?e(`perpReadout`,{price:u(o.price),contracts:f(o.size),notional:p(o.size*o.price)}):e(`perpHint`)})]})}var U,W,lt,ut,dt;function ft(){return(ft=e((()=>{U=t(),i(),T(),w(),W=n(),lt=.001,ut=288e5,dt=1e-4})))()}function pt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,G.useRef)(null),a=(0,G.useRef)(null),o=(0,G.useRef)(null),[s,c]=(0,G.useState)(0),[u,d]=(0,G.useState)(0),[p,m]=(0,G.useState)(null);(0,G.useEffect)(()=>{let e=i.current;if(!e)return;let{feed:t,snapshot:n,updates:r}=se({seed:31},12e4);e.clear(),e.setBook(n);for(let{delta:t,trades:n}of r)e.applyDeltas(t),e.addTrades(n);return o.current=t,()=>{o.current=null,e.clear()}},[s]),ie(a,e=>{let t=o.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r)});let h=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),g=new Intl.NumberFormat(n),_=new Intl.NumberFormat(n,{maximumFractionDigits:3}),v=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`});return(0,K.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,K.jsx)(l,{"aria-label":e(`rowHeight`),direction:`horizontal`,value:s,onChange:e=>c(Number(e)),children:mt.map(t=>(0,K.jsx)(f,{value:t,label:t?e(`usdtValue`,{value:g.format(t)}):e(`auto`)},t))}),(0,K.jsx)(l,{"aria-label":e(`priceSpan`),direction:`horizontal`,value:u,onChange:e=>d(Number(e)),children:ht.map(t=>(0,K.jsx)(f,{value:t,label:t?e(`usdtValue`,{value:g.format(t)}):e(`fitBook`)},t))})]}),(0,K.jsx)(S,{ref:i,height:400,interval:500,window:12e4,tickSize:s||void 0,priceSpan:u||void 0,tooltip:!1,onHover:m,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,K.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:p?e(`cellReadout`,{time:v.format(p.time),price:p.priceHigh>p.price?e(`priceRange`,{low:h.format(p.price),high:h.format(p.priceHigh)}):h.format(p.price),size:_.format(p.size),side:p.side===`bid`?e(`sideBid`):p.side===`ask`?e(`sideAsk`):e(`sideSpread`),buys:_.format(p.buyVolume),sells:_.format(p.sellVolume)}):e(`cellHint`)})]})}var G,K,mt,ht;function gt(){return(gt=e((()=>{G=t(),i(),u(),d(),T(),w(),K=n(),mt=[0,1,5],ht=[0,60,250]})))()}function _t(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,q.useRef)(null),n=(0,q.useRef)(null),[i,a]=(0,q.useState)(`red-up`);return C(n,t,{seed:26},6e4),(0,J.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsxs)(l,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,J.jsx)(f,{value:`red-up`,label:e(`redUp`)}),(0,J.jsx)(f,{value:`green-up`,label:e(`greenUp`)})]}),(0,J.jsx)(S,{ref:t,colorConvention:i,height:360,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var q,J;function vt(){return(vt=e((()=>{q=t(),i(),u(),d(),T(),w(),J=n()})))()}function yt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,Y.useRef)(null),i=(0,Y.useRef)(null),a=(0,Y.useRef)(null),[s,l]=(0,Y.useState)(!0),u=E(n,i,a,s),[d,f]=(0,Y.useState)(`ocean`),[p,m]=(0,Y.useState)(`60000`),[h,_]=(0,Y.useState)(.15),[y,te]=(0,Y.useState)(!0),b=new Intl.NumberFormat(t.language,{maximumFractionDigits:2}),ne=[[`latest`,u?.latest,`USDT`],[`bidDepth`,u?.bidDepth,`BTC`],[`askDepth`,u?.askDepth,`BTC`],[`imbalance`,u?u.imbalance*100:void 0,`%`],[`bidWall`,u?.bidWall,`BTC`],[`askWall`,u?.askWall,`BTC`]];return(0,X.jsx)(ee,{theme:`dark`,children:(0,X.jsxs)(`div`,{ref:n,className:k.terminal,"data-theme":`dark`,"data-testid":`heatmap-terminal`,children:[(0,X.jsxs)(`header`,{className:k.heading,children:[(0,X.jsxs)(`h3`,{children:[`BTC / USDT`,` `,(0,X.jsx)(`span`,{style:{color:`#99aac0`,fontSize:12},children:e(`liquidityTerminal`)})]}),(0,X.jsx)(`span`,{className:k.badge,children:e(`simulated`)})]}),(0,X.jsx)(`div`,{className:k.metrics,"data-testid":`heatmap-terminal-metrics`,children:ne.map(([t,n,r])=>(0,X.jsxs)(c,{className:k.metric,children:[(0,X.jsx)(`span`,{children:e(t)}),(0,X.jsxs)(`strong`,{"data-metric":t,children:[n===void 0?`—`:b.format(n),` `,(0,X.jsx)(`small`,{style:{fontSize:10,color:`#99aac0`},children:r})]})]},t))}),(0,X.jsxs)(`div`,{className:k.controls,children:[(0,X.jsx)(g,{checked:s,onChange:l,label:e(`liveFeed`),"data-testid":`heatmap-live`}),(0,X.jsxs)(`div`,{className:k.control,children:[(0,X.jsx)(`span`,{children:e(`palette`)}),(0,X.jsxs)(re,{"aria-label":e(`palette`),value:d,onChange:e=>f(e),children:[(0,X.jsx)(x,{value:`ocean`,children:e(`ocean`)}),(0,X.jsx)(x,{value:`ember`,children:e(`ember`)})]})]}),(0,X.jsxs)(`div`,{className:k.control,children:[(0,X.jsx)(`span`,{children:e(`timeWindow`)}),(0,X.jsxs)(re,{"aria-label":e(`timeWindow`),value:p,onChange:m,children:[(0,X.jsx)(x,{value:`30000`,children:`30 s`}),(0,X.jsx)(x,{value:`60000`,children:`60 s`}),(0,X.jsx)(x,{value:`90000`,children:`90 s`})]})]}),(0,X.jsxs)(`div`,{className:k.control,children:[(0,X.jsx)(`span`,{children:e(`intensityFilter`)}),(0,X.jsx)(v,{"aria-label":e(`intensityFilter`),min:0,max:.9,step:.05,value:h,onChange:e=>_(Number(e)),formatValue:e=>`${Math.round(e*100)}%`,tooltip:!0})]}),(0,X.jsx)(g,{checked:y,onChange:te,label:e(`showCandles`),"data-testid":`heatmap-show-candles`}),(0,X.jsx)(o,{size:`small`,onClick:()=>i.current?.resetView(),children:e(`resetViewport`)})]}),(0,X.jsxs)(`div`,{className:k.workspace,children:[(0,X.jsxs)(`div`,{className:k.chart,"data-testid":`heatmap-terminal-chart`,children:[(0,X.jsx)(S,{ref:i,height:500,candles:y,lastPriceLine:!0,colors:bt[d],intensityRange:[h,1],window:Number(p),interval:250,maxColumns:720,maxBars:180,profile:!1,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,timeZone:`utc`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,fontSize:11,ariaLabel:e(`terminalAria`)}),(0,X.jsx)(qe,{heatmap:i,summary:u})]}),(0,X.jsxs)(`aside`,{className:k.ladder,"data-testid":`heatmap-terminal-ladder`,children:[(0,X.jsx)(`h4`,{children:e(`currentBook`)}),(0,X.jsx)(oe,{ref:a,height:560,pricePrecision:1,sizePrecision:3,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,fontSize:11,ariaLabel:e(`ladderAria`)})]})]}),(0,X.jsx)(`p`,{className:k.caption,children:e(`terminalHint`)})]})})}var Y,X,bt;function xt(){return(xt=e((()=>{Y=t(),i(),a(),s(),y(),ne(),_(),h(),T(),O(),Ye(),A(),X=n(),bt={ocean:[`#080d15`,`#12355e`,`#087fa4`,`#31d7d7`,`#e9e58a`,`#ffb35c`,`#fff4db`],ember:[`#080d15`,`#302152`,`#74336a`,`#d85b67`,`#f69d63`,`#ffe0a0`,`#fff8db`]}})))()}function St(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,Z.useRef)(null),a=(0,Z.useRef)(null),s=(0,Z.useRef)(null),[c,u]=(0,Z.useState)(12e4),[d,p]=(0,Z.useState)(!0),[m,h]=(0,Z.useState)(``);(0,Z.useEffect)(()=>{let e=i.current;if(!e)return;let{feed:t,snapshot:n,updates:r}=se({seed:33},3e5,200);e.clear(),e.setBook(n);for(let{delta:t,trades:n}of r)e.applyDeltas(t),e.addTrades(n);return s.current=t,()=>{s.current=null,e.clear()}},[]),ie(a,e=>{let t=s.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r)},{running:d});let _=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),v=e=>e<6e4?new Intl.NumberFormat(n,{style:`unit`,unit:`second`}).format(e/1e3):new Intl.NumberFormat(n,{style:`unit`,unit:`minute`}).format(e/6e4),y=()=>_.format(s.current?.time()??0);return(0,Q.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,Q.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`8px 24px`},children:[(0,Q.jsx)(l,{"aria-label":e(`timeWindow`),direction:`horizontal`,value:c,onChange:e=>{u(Number(e)),h(``)},children:Ct.map(e=>(0,Q.jsx)(f,{value:e,label:v(e)},e))}),(0,Q.jsx)(g,{checked:d,onChange:t=>{p(t),h(e(t?`resumedAt`:`pausedAt`,{time:y()}))},label:e(`liveFeed`)}),(0,Q.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{let t=s.current;t&&(i.current?.clear(),i.current?.setBook(t.snapshot()),h(e(`clearedAt`,{time:y()})))},children:e(`clearHistory`)})]}),(0,Q.jsx)(S,{ref:i,height:400,interval:250,window:c,history:3e5,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,Q.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13},children:m||e(`windowStatus`,{window:v(c),history:v(3e5)})})]})}var Z,Q,Ct;function wt(){return(wt=e((()=>{Z=t(),i(),a(),u(),d(),h(),T(),w(),Q=n(),Ct=[3e4,12e4,3e5]})))()}var Tt;function Et(){return(Et=e((()=>{Tt=`import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // two minutes of market recorded before the page opened (backfilled with
  // the exchange times), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 21 }, 120_000);

  return (
    <div ref={boxRef} style={{ width: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        // one column every 250 ms, two minutes on screen
        interval={250}
        window={120_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import styles from "../market.module.scss";

export default function CandlesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const [candles, setCandles] = useState(true);
  useTerminalMarket(host, heatmap);
  return (
    <div ref={host} className={styles.demo} data-testid="heatmap-candles-demo">
      <div className={styles.controls}>
        <span className={styles.badge}>{t("simulated")}</span>
        <Switch
          checked={candles}
          onChange={setCandles}
          label={t("showCandles")}
        />
      </div>
      <OrderBookHeatmap
        ref={heatmap}
        candles={candles}
        lastPriceLine
        height={420}
        interval={250}
        window={60_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("candlesAria")}
      />
      <p className={styles.caption}>{t("executionsOnly")}</p>
    </div>
  );
}
`})))()}var kt;function At(){return(At=e((()=>{kt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapScale,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

const CONTRASTS = [0.5, 1, 2, 4];

export default function ColorScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<OrderBookHeatmapScale>("sqrt");
  const [contrast, setContrast] = useState(1);

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 23, whales: 0.015 }, 60_000);

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("scale")}
          direction="horizontal"
          value={scale}
          onChange={(value) => setScale(value as OrderBookHeatmapScale)}
        >
          <Radio value="sqrt" label={t("scaleSqrt")} />
          <Radio value="linear" label={t("scaleLinear")} />
          <Radio value="log" label={t("scaleLog")} />
        </RadioGroup>
        <RadioGroup
          aria-label={t("contrast")}
          direction="horizontal"
          value={contrast}
          onChange={(value) => setContrast(Number(value))}
        >
          {CONTRASTS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t("times", { value: number.format(value) })}
            />
          ))}
        </RadioGroup>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={380}
        // sqrt keeps typical levels dim and lets the walls glow; contrast > 1 brightens
        colorScale={scale}
        contrast={contrast}
        interval={200}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var jt;function Mt(){return(Mt=e((()=>{jt=`import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 25 }, 30_000);

  // phone-sized: 30 s, no book profile, smaller bubbles; drag to pan
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 360 }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={240}
        interval={150}
        window={30_000}
        profile={false}
        bubbleSize={16}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Nt;function Pt(){return(Pt=e((()=>{Nt=`import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

const TERMINAL = {
  "--background-color": "#06080d",
  "--surface-color": "#06080d",
  "--surface-elevated-color": "#151a22",
  "--text-color": "#e6e8eb",
  "--text-secondary-color": "#7d8590",
  "--border-color": "#262c36",
  "--success-color": "#26d07c",
  "--danger-color": "#ff4d6a",
  background: "#06080d",
  color: "#e6e8eb",
  borderRadius: 12,
  padding: 8,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

// a classic liquidity ramp: from the empty field (near black navy) through
// deep blue, cyan, yellow and orange to red
const RAMP = [
  "#050b18",
  "#0a2a5c",
  "#0f6fb5",
  "#19c2d6",
  "#f5e663",
  "#ff9a1f",
  "#ff3b1f",
];

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 24, whales: 0.012 }, 90_000);

  return (
    <div ref={boxRef} style={TERMINAL}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={420}
        colors={RAMP}
        contrast={0.7}
        // exchange clock
        timeZone="utc"
        interval={200}
        window={90_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Ft;function It(){return(It=e((()=>{Ft=`import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import { HistoryNavigator } from "../HistoryNavigator";
import styles from "../market.module.scss";

export default function HistoryNavigationDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const summary = useTerminalMarket(host, heatmap);
  return (
    <div
      ref={host}
      className={styles.demo}
      data-testid="heatmap-navigation-demo"
    >
      <span className={styles.badge}>{t("simulated")}</span>
      <OrderBookHeatmap
        ref={heatmap}
        candles
        lastPriceLine
        height={420}
        interval={250}
        window={45_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizeUnit="BTC"
        ariaLabel={t("navigationAria")}
      />
      <HistoryNavigator heatmap={heatmap} summary={summary} />
      <p className={styles.caption}>{t("navigatorHint")}</p>
    </div>
  );
}
`})))()}var Lt;function Rt(){return(Rt=e((()=>{Lt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import styles from "../market.module.scss";

export default function IntensityFilterDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const [range, setRange] = useState<[number, number]>([0.25, 1]);
  useTerminalMarket(host, heatmap);
  return (
    <div
      ref={host}
      className={styles.demo}
      data-testid="heatmap-intensity-demo"
    >
      <span className={styles.badge}>{t("simulated")}</span>
      <label className={styles.control}>
        {t("intensityFilter")}
        <Slider
          range
          aria-label={t("intensityFilter")}
          min={0}
          max={1}
          step={0.05}
          value={range}
          onChange={(value) => setRange(value as [number, number])}
          formatValue={(value) => \`\${Math.round(value * 100)}%\`}
          showValue
        />
      </label>
      <OrderBookHeatmap
        ref={heatmap}
        intensityRange={range}
        candles
        lastPriceLine
        height={400}
        interval={250}
        window={60_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizeUnit="BTC"
        ariaLabel={t("filterAria")}
      />
      <p className={styles.caption}>{t("filterHint")}</p>
    </div>
  );
}
`})))()}var zt;function Bt(){return(Bt=e((()=>{zt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function LargeTradesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);
  // block trades: aggressive whales sweeping several levels at once

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(
    boxRef,
    heatmapRef,
    { seed: 27, whales: 0.03, activity: 180 },
    90_000,
  );

  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 3,
  });
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={1000}
        window={90_000}
        // bubbles grow with the volume of the column: 12 BTC fills 30 px
        bubbleSize={30}
        bubbleVolume={12}
        // dim the book so the trades stand out
        contrast={0.6}
        onHover={setHover}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {hover
          ? t("volumeAt", {
              buys: size.format(hover.buyVolume),
              sells: size.format(hover.sellVolume),
            })
          : t("volumeHint")}
      </span>
    </div>
  );
}
`})))()}var Vt;function Ht(){return(Ht=e((()=>{Vt=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBook,
  OrderBookHeatmap,
  TimeAndSales,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

export default function LinkedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const bookRef = useRef<OrderBookHandle>(null);
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [quote, setQuote] = useState({ last: NaN, spread: NaN, trades: 0 });
  const quotedAt = useRef(0);

  // one recorded minute: the heatmap replays it column by column, the tape
  // gets its trades at once, the ladder only needs the book of now
  useEffect(() => {
    const heatmap = heatmapRef.current;
    const tape = tapeRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory({ seed: 34 }, 60_000);
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    tape?.setTrades(updates.flatMap((update) => update.trades));
    bookRef.current?.setBook(feed.snapshot());
    bookRef.current?.setLastPrice(feed.last());
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
      tape?.clear();
    };
  }, []);

  // then every message goes to the three widgets, like one WebSocket
  useFeedLoop(boxRef, (elapsed) => {
    const feed = marketRef.current;
    if (!feed) return;
    const { delta, trades } = feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) {
      bookRef.current?.setLastPrice(feed.last());
      tapeRef.current?.addTrades(trades);
    }
    const now = performance.now();
    if (now - quotedAt.current < 250) return;
    quotedAt.current = now;
    const store = heatmapRef.current?.getInstance()?.getStore();
    setQuote({
      last: feed.last(),
      spread: store ? store.spread() : NaN,
      trades: tapeRef.current?.getInstance()?.getCount() ?? 0,
    });
  });

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const integer = new Intl.NumberFormat(locale);

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong>{t("pair")}</strong>
        <span>
          {t("lastPrice", {
            value: Number.isNaN(quote.last) ? "…" : usd.format(quote.last),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("spreadIs", {
            value: Number.isNaN(quote.spread) ? "…" : usd.format(quote.spread),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("tradesOnTape", { value: integer.format(quote.trades) })}
        </span>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={320}
        interval={250}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <OrderBook
          ref={bookRef}
          height={300}
          pricePrecision={1}
          sizePrecision={4}
          ariaLabel={t("bookAria")}
        />
        <TimeAndSales
          ref={tapeRef}
          height={300}
          aggregate
          largeTradeThreshold={1}
          pricePrecision={1}
          sizePrecision={4}
          ariaLabel={t("tapeAria")}
        />
      </div>
    </div>
  );
}
`})))()}var Ut;function Wt(){return(Wt=e((()=>{Ut=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  OrderBookHeatmap,
  type ChartRendererKind,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);
  const [follow, setFollow] = useState(true);
  // the last 15 s with one book update every 10 ms (100 a second), then
  // live at the same pace; the heatmap samples the book every 50 ms
  useHeatmapReplay(boxRef, heatmapRef, { seed: 22, activity: 200 }, 15_000, {
    step: 10,
    interval: 10,
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={50}
        window={15_000}
        onRendererChange={setRenderer}
        onFollowChange={setFollow}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        <span>
          {t("rendererIs", {
            value: renderer ? t(\`renderers.\${renderer}\`) : "…",
          })}
        </span>
        <span>{follow ? t("following") : t("panned")}</span>
        <Button
          size="small"
          variant="outline"
          disabled={follow}
          onClick={() => heatmapRef.current?.resetView()}
        >
          {t("followMarket")}
        </Button>
      </div>
    </div>
  );
}
`})))()}var Gt;function Kt(){return(Kt=e((()=>{Gt=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

/** One contract of the perpetual is worth 0.001 BTC */
const CONTRACT = 0.001;
/** Funding is exchanged every 8 hours: 00:00, 08:00 and 16:00 UTC */
const FUNDING = 8 * 3_600_000;
const FUNDING_RATE = 0.0001;

export default function PerpetualDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);
  const [now, setNow] = useState<number | null>(null);
  useHeatmapReplay(boxRef, heatmapRef, { seed: 35 }, 90_000, {
    interval: 50,
  });

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // the feed counts BTC; the venue quotes contracts and dollars
  const { formatPrice, formatSize, contracts, usd } = useMemo(() => {
    const price = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const count = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const compactUsd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return {
      formatPrice: (value: number) => price.format(value),
      formatSize: (value: number) => count.format(value / CONTRACT),
      contracts: (btc: number) => count.format(Math.round(btc / CONTRACT)),
      usd: (value: number) => compactUsd.format(value),
    };
  }, [locale]);

  const next = now === null ? null : Math.ceil(now / FUNDING) * FUNDING;
  const utc = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
  const countdown = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });
  const rate = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 4,
    signDisplay: "always",
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong>{t("perpName")}</strong>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("contractSize", {
            value: new Intl.NumberFormat(locale).format(CONTRACT),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {next === null || now === null
            ? t("fundingRate", { rate: rate.format(FUNDING_RATE) })
            : t("funding", {
                rate: rate.format(FUNDING_RATE),
                time: utc.format(next),
                countdown: countdown.format(next - now),
              })}
        </span>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={380}
        interval={250}
        window={90_000}
        formatPrice={formatPrice}
        formatSize={formatSize}
        sizeUnit={t("contracts")}
        // exchanges run on UTC
        timeZone="utc"
        labels={{
          liquidity: t("restingContracts"),
          buys: t("takerBuys"),
          sells: t("takerSells"),
        }}
        onHover={setHover}
        ariaLabel={t("perpAria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hover
          ? t("perpReadout", {
              price: formatPrice(hover.price),
              contracts: contracts(hover.size),
              notional: usd(hover.size * hover.price),
            })
          : t("perpHint")}
      </span>
    </div>
  );
}
`})))()}var qt;function Jt(){return(Jt=e((()=>{qt=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

/** Row heights, in USDT (0: about 0.1 basis point, chosen by the heatmap) */
const TICKS = [0, 1, 5];
/** Visible price spans, in USDT (0: fits the best bid and ask) */
const SPANS = [0, 60, 250];

export default function PriceResolutionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [tickSize, setTickSize] = useState(0);
  const [priceSpan, setPriceSpan] = useState(0);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);

  // a new tickSize resamples the book from scratch (the heatmap drops its
  // columns): the two recorded minutes are replayed at the new resolution
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory({ seed: 31 }, 120_000);
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [tickSize]);
  useFeedLoop(boxRef, (elapsed) => {
    const feed = marketRef.current;
    if (!feed) return;
    const { delta, trades } = feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
  });

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const whole = new Intl.NumberFormat(locale);
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("rowHeight")}
          direction="horizontal"
          value={tickSize}
          onChange={(value) => setTickSize(Number(value))}
        >
          {TICKS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={
                value
                  ? t("usdtValue", { value: whole.format(value) })
                  : t("auto")
              }
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("priceSpan")}
          direction="horizontal"
          value={priceSpan}
          onChange={(value) => setPriceSpan(Number(value))}
        >
          {SPANS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={
                value
                  ? t("usdtValue", { value: whole.format(value) })
                  : t("fitBook")
              }
            />
          ))}
        </RadioGroup>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={500}
        window={120_000}
        tickSize={tickSize || undefined}
        priceSpan={priceSpan || undefined}
        // the readout below replaces the built-in tooltip
        tooltip={false}
        onHover={setHover}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hover
          ? t("cellReadout", {
              time: clock.format(hover.time),
              price:
                hover.priceHigh > hover.price
                  ? t("priceRange", {
                      low: usd.format(hover.price),
                      high: usd.format(hover.priceHigh),
                    })
                  : usd.format(hover.price),
              size: btc.format(hover.size),
              side:
                hover.side === "bid"
                  ? t("sideBid")
                  : hover.side === "ask"
                    ? t("sideAsk")
                    : t("sideSpread"),
              buys: btc.format(hover.buyVolume),
              sells: btc.format(hover.sellVolume),
            })
          : t("cellHint")}
      </span>
    </div>
  );
}
`})))()}var Yt;function Xt(){return(Xt=e((()=>{Yt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookColorConvention,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 26 }, 60_000);

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("colors")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(value as OrderBookColorConvention)}
      >
        <Radio value="red-up" label={t("redUp")} />
        <Radio value="green-up" label={t("greenUp")} />
      </RadioGroup>
      <OrderBookHeatmap
        ref={heatmapRef}
        // red buy bubbles and best bid line, green sells and best ask
        colorConvention={convention}
        height={360}
        interval={200}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Zt;function Qt(){return(Qt=e((()=>{Zt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  ConfigProvider,
  Select,
  SelectItem,
  Slider,
  Switch,
} from "minerva-design";
import {
  OrderBook,
  OrderBookHeatmap,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import { HistoryNavigator } from "../HistoryNavigator";
import styles from "../market.module.scss";

const PALETTES = {
  ocean: [
    "#080d15",
    "#12355e",
    "#087fa4",
    "#31d7d7",
    "#e9e58a",
    "#ffb35c",
    "#fff4db",
  ],
  ember: [
    "#080d15",
    "#302152",
    "#74336a",
    "#d85b67",
    "#f69d63",
    "#ffe0a0",
    "#fff8db",
  ],
};

export default function TerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const ladder = useRef<OrderBookHandle>(null);
  const [running, setRunning] = useState(true);
  const summary = useTerminalMarket(host, heatmap, ladder, running);
  const [palette, setPalette] = useState<keyof typeof PALETTES>("ocean");
  const [windowMs, setWindowMs] = useState("60000");
  const [filter, setFilter] = useState(0.15);
  const [candles, setCandles] = useState(true);
  const number = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 2,
  });
  const metrics = [
    ["latest", summary?.latest, "USDT"],
    ["bidDepth", summary?.bidDepth, "BTC"],
    ["askDepth", summary?.askDepth, "BTC"],
    ["imbalance", summary ? summary.imbalance * 100 : undefined, "%"],
    ["bidWall", summary?.bidWall, "BTC"],
    ["askWall", summary?.askWall, "BTC"],
  ] as const;
  return (
    <ConfigProvider theme="dark">
      <div
        ref={host}
        className={styles.terminal}
        data-theme="dark"
        data-testid="heatmap-terminal"
      >
        <header className={styles.heading}>
          <h3>
            BTC / USDT{" "}
            <span style={{ color: "#99aac0", fontSize: 12 }}>
              {t("liquidityTerminal")}
            </span>
          </h3>
          <span className={styles.badge}>{t("simulated")}</span>
        </header>
        <div className={styles.metrics} data-testid="heatmap-terminal-metrics">
          {metrics.map(([key, value, unit]) => (
            <Card key={key} className={styles.metric}>
              <span>{t(key)}</span>
              <strong data-metric={key}>
                {value === undefined ? "—" : number.format(value)}{" "}
                <small style={{ fontSize: 10, color: "#99aac0" }}>{unit}</small>
              </strong>
            </Card>
          ))}
        </div>
        <div className={styles.controls}>
          <Switch
            checked={running}
            onChange={setRunning}
            label={t("liveFeed")}
            data-testid="heatmap-live"
          />
          <div className={styles.control}>
            <span>{t("palette")}</span>
            <Select
              aria-label={t("palette")}
              value={palette}
              onChange={(value) => setPalette(value as keyof typeof PALETTES)}
            >
              <SelectItem value="ocean">{t("ocean")}</SelectItem>
              <SelectItem value="ember">{t("ember")}</SelectItem>
            </Select>
          </div>
          <div className={styles.control}>
            <span>{t("timeWindow")}</span>
            <Select
              aria-label={t("timeWindow")}
              value={windowMs}
              onChange={setWindowMs}
            >
              <SelectItem value="30000">30 s</SelectItem>
              <SelectItem value="60000">60 s</SelectItem>
              <SelectItem value="90000">90 s</SelectItem>
            </Select>
          </div>
          <div className={styles.control}>
            <span>{t("intensityFilter")}</span>
            <Slider
              aria-label={t("intensityFilter")}
              min={0}
              max={0.9}
              step={0.05}
              value={filter}
              onChange={(value) => setFilter(Number(value))}
              formatValue={(value) => \`\${Math.round(value * 100)}%\`}
              tooltip
            />
          </div>
          <Switch
            checked={candles}
            onChange={setCandles}
            label={t("showCandles")}
            data-testid="heatmap-show-candles"
          />
          <Button size="small" onClick={() => heatmap.current?.resetView()}>
            {t("resetViewport")}
          </Button>
        </div>
        <div className={styles.workspace}>
          <div className={styles.chart} data-testid="heatmap-terminal-chart">
            <OrderBookHeatmap
              ref={heatmap}
              height={500}
              candles={candles}
              lastPriceLine
              colors={PALETTES[palette]}
              intensityRange={[filter, 1]}
              window={Number(windowMs)}
              interval={250}
              maxColumns={720}
              maxBars={180}
              profile={false}
              pricePrecision={1}
              sizePrecision={3}
              sizeUnit="BTC"
              timeZone="utc"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize={11}
              ariaLabel={t("terminalAria")}
            />
            <HistoryNavigator heatmap={heatmap} summary={summary} />
          </div>
          <aside
            className={styles.ladder}
            data-testid="heatmap-terminal-ladder"
          >
            <h4>{t("currentBook")}</h4>
            <OrderBook
              ref={ladder}
              height={560}
              pricePrecision={1}
              sizePrecision={3}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize={11}
              ariaLabel={t("ladderAria")}
            />
          </aside>
        </div>
        <p className={styles.caption}>{t("terminalHint")}</p>
      </div>
    </ConfigProvider>
  );
}
`})))()}var $t;function en(){return(en=e((()=>{$t=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup, Switch } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

/** Visible spans, in ms */
const WINDOWS = [30_000, 120_000, 300_000];

export default function TimeWindowDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [span, setSpan] = useState(120_000);
  const [running, setRunning] = useState(true);
  const [status, setStatus] = useState("");

  // five minutes of recorded market: all of it fits in \`history\`, the
  // window only picks how much of it is on screen
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      { seed: 33 },
      300_000,
      200,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, []);
  // paused, the market stops too: it resumes where it was, without a gap
  useFeedLoop(
    boxRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (!feed) return;
      const { delta, trades } = feed.step(elapsed);
      heatmapRef.current?.applyDeltas(delta);
      heatmapRef.current?.addTrades(trades);
    },
    { running },
  );

  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const duration = (ms: number) =>
    ms < 60_000
      ? new Intl.NumberFormat(locale, { style: "unit", unit: "second" }).format(
          ms / 1000,
        )
      : new Intl.NumberFormat(locale, { style: "unit", unit: "minute" }).format(
          ms / 60_000,
        );
  const marketTime = () => clock.format(marketRef.current?.time() ?? 0);

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px 24px",
        }}
      >
        <RadioGroup
          aria-label={t("timeWindow")}
          direction="horizontal"
          value={span}
          onChange={(value) => {
            setSpan(Number(value));
            setStatus("");
          }}
        >
          {WINDOWS.map((value) => (
            <Radio key={value} value={value} label={duration(value)} />
          ))}
        </RadioGroup>
        <Switch
          checked={running}
          onChange={(checked) => {
            setRunning(checked);
            setStatus(
              t(checked ? "resumedAt" : "pausedAt", { time: marketTime() }),
            );
          }}
          label={t("liveFeed")}
        />
        <Button
          size="small"
          variant="outline"
          onClick={() => {
            const feed = marketRef.current;
            if (!feed) return;
            // drop the history, keep the current book as the first column
            heatmapRef.current?.clear();
            heatmapRef.current?.setBook(feed.snapshot());
            setStatus(t("clearedAt", { time: marketTime() }));
          }}
        >
          {t("clearHistory")}
        </Button>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={250}
        window={span}
        history={300_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {status ||
          t("windowStatus", {
            window: duration(span),
            history: duration(300_000),
          })}
      </output>
    </div>
  );
}
`})))()}var $,tn,nn,rn,an;function on(){return(on=e((()=>{he(),Ne(),Ie(),Be(),Ke(),Qe(),et(),rt(),at(),st(),ft(),gt(),vt(),xt(),wt(),Et(),Ot(),At(),Mt(),Pt(),It(),Rt(),Bt(),Ht(),Wt(),Kt(),Jt(),Xt(),Qt(),en(),t(),p(),i(),le(),te(),de(),$=n(),tn=ce(Object.assign({"./demos/basic.tsx":fe,"./demos/candles.tsx":je,"./demos/color-scale.tsx":Pe,"./demos/compact.tsx":Le,"./demos/dark.tsx":Ve,"./demos/history-navigation.tsx":Xe,"./demos/intensity-filter.tsx":$e,"./demos/large-trades.tsx":tt,"./demos/linked.tsx":it,"./demos/live.tsx":ot,"./demos/perpetual.tsx":ct,"./demos/price-resolution.tsx":pt,"./demos/red-up.tsx":_t,"./demos/terminal.tsx":yt,"./demos/time-window.tsx":St}),Object.assign({"./demos/basic.tsx":Tt,"./demos/candles.tsx":Dt,"./demos/color-scale.tsx":kt,"./demos/compact.tsx":jt,"./demos/dark.tsx":Nt,"./demos/history-navigation.tsx":Ft,"./demos/intensity-filter.tsx":Lt,"./demos/large-trades.tsx":zt,"./demos/linked.tsx":Vt,"./demos/live.tsx":Ut,"./demos/perpetual.tsx":Gt,"./demos/price-resolution.tsx":qt,"./demos/red-up.tsx":Yt,"./demos/terminal.tsx":Zt,"./demos/time-window.tsx":$t})),nn=[`axes`,`color`,`walls`,`lines`,`bubbles`,`profile`,`candles`,`navigation`,`intensity`],rn=[`hold`,`pull`,`sweep`,`thin`],an=()=>{let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.read`}),t=(0,$.jsxs)(`section`,{className:b.section,"aria-labelledby":`heatmap-read`,children:[(0,$.jsx)(`h2`,{id:`heatmap-read`,children:e(`title`)}),(0,$.jsx)(`p`,{className:b.prose,children:e(`text`)}),(0,$.jsx)(m,{color:`info`,title:e(`dataTitle`),children:e(`dataSemantics`)}),(0,$.jsx)(`ul`,{className:b.prose,children:nn.map(t=>(0,$.jsx)(`li`,{children:e(t)},t))}),(0,$.jsx)(`h3`,{children:e(`patterns.title`)}),(0,$.jsx)(`ul`,{className:b.prose,children:rn.map(t=>(0,$.jsx)(`li`,{children:e(`patterns.${t}`)},t))})]});return(0,$.jsx)(ue,{id:`order-book-heatmap`,demos:tn,intro:t})}})))()}on();export{an as default};