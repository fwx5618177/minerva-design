import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{o as a,s as o}from"./renderer.module-UIfVcUOg.js";import{n as s,t as c}from"./useTranslation-wxAap2cZ.js";import{a as l,i as u,n as d,r as ee,s as te,t as ne}from"./Card-Cm83NXvy.js";import{i as re,n as ie,r as ae,t as f}from"./Radio-Bpw4i9zQ.js";import{n as oe,t as se}from"./Skeleton-DbQjCzwa.js";import{n as ce,t as le}from"./TextLink-3oh0lhjd.js";import{i as ue,r as p}from"./DemoBlock-C9SrrBKM.js";import{l as de,n as fe,t as pe,u as me}from"./DocPage-JhXgs5p-.js";import{_ as he,a as ge,c as _e,d as ve,f as ye,g as be,h as xe,i as Se,l as Ce,m,n as we,o as Te,p as Ee,r as h,s as De,t as g,u as Oe,v as ke,y as Ae}from"./charts-D2ZjxGuy.js";import{a as je,c as _,d as Me,f as Ne,i as Pe,l as Fe,n as Ie,o as Le,p as Re,r as ze,s as Be,t as Ve,u as He}from"./shapes-LryspZMN.js";import{a as Ue,c as We,l as Ge,n as Ke,s as qe,t as Je}from"./data-BNIeKPPp.js";import{a as v,c as Ye,d as Xe,f as Ze,l as Qe,n as $e,r as et,t as tt,u as nt}from"./feed-CGHorric.js";import{a as rt,i as it,n as at,r as ot,t as st}from"./three-d-isGCf2Yj.js";import{i as ct,n as lt,r as ut,t as dt}from"./graph-BqbQWoD0.js";function ft(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pt(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,y.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0}),[n]),i=(0,y.useMemo)(()=>[{name:e(`p95`),data:gt}],[e]),a=(0,y.useMemo)(()=>[{type:`rect`,y0:80,y1:150,color:`var(--success-color)`,label:e(`normalRange`)},{type:`rect`,x0:70,x1:82,color:`var(--warning-color)`,opacity:.12,label:e(`deploy`),labelPosition:`top-right`},{type:`line`,axis:`y`,value:200,color:`var(--danger-color)`,dash:[4,4],label:e(`slo`,{value:r.format(200)})}],[e,r]);return(0,mt.jsx)(Ae,{series:i,annotations:a,xAxis:{title:e(`minutes`)},yAxis:{min:0,max:260,format:e=>r.format(e)},height:300,ariaLabel:e(`latencyAria`)})}var y,mt,ht,gt;function _t(){return(_t=e((()=>{y=t(),c(),ke(),mt=n(),ht=ft(42),gt=Array.from({length:120},(e,t)=>{let n=t>=70&&t<=82?90:0;return[t,105+ht()*40+n]})})))()}function vt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function yt(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,b.useMemo)(()=>({number:new Intl.NumberFormat(n),compact:new Intl.NumberFormat(n,{notation:`compact`}),usd:new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),date:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`})}),[n]),i=(0,b.useMemo)(()=>[{name:e(`newVisitors`),data:T.map(e=>[e.time,e.fresh])},{name:e(`returningVisitors`),data:T.map(e=>[e.time,e.returning])}],[e]),a=(0,b.useMemo)(()=>bt.map(({key:t,value:n})=>({name:e(`devices.${t}`),value:n})),[e]),o=(0,b.useMemo)(()=>[{name:e(`pageViews`),data:xt.map(({path:e,views:t})=>[e,t])}],[e]),c=E(`fresh`)+E(`returning`),u=[{label:e(`visitors`),value:r.compact.format(c),data:T.map(e=>e.fresh+e.returning)},{label:e(`ordersLabel`),value:r.number.format(E(`orders`)),data:T.map(e=>e.orders)},{label:e(`revenueLabel`),value:r.usd.format(E(`revenue`)),data:T.map(e=>e.revenue)},{label:e(`conversion`),value:r.percent.format(E(`orders`)/c),data:T.map(e=>e.orders/(e.fresh+e.returning))}];return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`},children:[(0,x.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(160px, 1fr))`,gap:12},children:u.map(t=>(0,x.jsxs)(ne,{padding:`small`,children:[(0,x.jsxs)(l,{children:[(0,x.jsx)(d,{children:t.label}),(0,x.jsx)(`strong`,{style:{fontSize:22},children:t.value})]}),(0,x.jsx)(ee,{children:(0,x.jsx)(g,{data:t.data,type:`area`,height:36,name:t.label,tooltip:!1,ariaLabel:e(`last30Aria`,{metric:t.label})})})]},t.label))}),(0,x.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16},children:[(0,x.jsx)(Se,{series:i,stacked:!0,xAxis:{type:`time`,format:e=>r.date.format(e),tickCount:5},yAxis:{format:e=>r.compact.format(e)},legend:{position:`bottom`},height:260,ariaLabel:e(`trafficAria`)}),(0,x.jsx)(Re,{data:a,labels:`none`,centerValue:r.compact.format(c),centerLabel:e(`visitors`),format:e=>r.percent.format(e/100),renderTooltip:e=>(0,x.jsxs)(`span`,{children:[e.name,` · `,r.percent.format(e.percent)]}),legend:{position:`bottom`},height:260,ariaLabel:e(`devicesAria`)})]}),(0,x.jsx)(h,{series:o,labels:!0,yAxis:{format:e=>r.compact.format(e)},legend:!1,height:220,ariaLabel:e(`topPagesAria`)})]})}var b,x,S,C,w,T,E,bt,xt;function St(){return(St=e((()=>{b=t(),c(),u(),m(),_(),x=n(),S=864e5,C=new Date(2026,9,1).getTime(),w=vt(30),T=Array.from({length:30},(e,t)=>{let n=([0,6].includes(new Date(C+t*S).getDay())?.75:1)*(1+t/60),r=Math.round(2400*n*(.9+w()*.2)),i=Math.round(1700*n*(.9+w()*.2)),a=Math.round((r+i)*(.028+w()*.006));return{time:C+t*S,fresh:r,returning:i,orders:a,revenue:a*64}}),E=e=>T.reduce((t,n)=>t+n[e],0),bt=[{key:`mobile`,value:58},{key:`desktop`,value:35},{key:`tablet`,value:7}],xt=[{path:`/`,views:41200},{path:`/sale`,views:26900},{path:`/shoes`,views:18300},{path:`/bags`,views:12700},{path:`/checkout`,views:9800}]})))()}function D({children:e}){return(0,A.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(min(100%, 240px), 1fr))`,gap:16,width:`100%`},children:e})}function Ct(){let e=(0,k.useRef)(null),[t,n]=(0,k.useState)(()=>typeof IntersectionObserver!=`function`);return(0,k.useEffect)(()=>{let t=e.current;if(!t||typeof IntersectionObserver!=`function`)return;let r=new IntersectionObserver(e=>n(e.some(e=>e.isIntersecting)),{rootMargin:`400px 0px`});return r.observe(t),()=>r.disconnect()},[]),[e,t]}function O({title:e,page:t,component:n,description:r,children:a}){let[o,s]=Ct();return(0,A.jsxs)(ne,{padding:`small`,style:{minWidth:0},children:[(0,A.jsxs)(l,{children:[(0,A.jsx)(te,{children:(0,A.jsx)(ce,{asChild:!0,children:(0,A.jsx)(i,{to:`/${t}`,children:e})})}),(0,A.jsxs)(d,{children:[(0,A.jsx)(`code`,{children:n}),` · `,r]})]}),(0,A.jsx)(ee,{children:(0,A.jsx)(`div`,{ref:o,style:{height:180,minWidth:0},children:s?a:(0,A.jsx)(se,{variant:`rounded`,decorative:!0,width:`100%`,height:`100%`})})})]})}var k,A;function j(){return(j=e((()=>{k=t(),r(),u(),oe(),le(),A=n()})))()}function wt(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,Tt.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),i=(0,Tt.useMemo)(()=>({scatter:Et.map((t,n)=>({name:e(`cluster`,{name:`ABC`[n]}),data:t,pointSize:6})),line:[{name:e(`trajectory`),data:Dt,lineWidth:2}],surface:[{name:e(`ripple`),data:Ot}],bars:[{name:e(`sales`),data:kt}],stars:[{name:e(`galaxyCore`),data:F.core,color:`#ffc477`,pointSize:2,opacity:.16,pointStyle:`glow`,blend:`additive`},{name:e(`galaxyArms`),data:F.arms,color:`#9cc4ff`,pointSize:2,opacity:.1,pointStyle:`glow`,blend:`additive`}],regionNames:P.map(t=>e(`regions.${t}`)),quarters:[1,2,3,4].map(t=>e(`quarter`,{n:t}))}),[e]);return(0,M.jsxs)(D,{children:[(0,M.jsx)(O,{title:e(`cards.scatter3d.title`),component:`Scatter3DChart`,page:`scatter-3d-chart`,description:e(`cards.scatter3d.description`),children:(0,M.jsx)(rt,{series:i.scatter,legend:!1,autoRotate:!0,locale:n,height:`100%`,ariaLabel:e(`cards.scatter3d.aria`)})}),(0,M.jsx)(O,{title:e(`cards.line3d.title`),component:`Line3DChart`,page:`scatter-3d-chart`,description:e(`cards.line3d.description`),children:(0,M.jsx)(ot,{series:i.line,colorScale:`plasma`,colorBar:!1,locale:n,height:`100%`,ariaLabel:e(`cards.line3d.aria`)})}),(0,M.jsx)(O,{title:e(`cards.surface3d.title`),component:`Surface3DChart`,page:`surface-3d-chart`,description:e(`cards.surface3d.description`),children:(0,M.jsx)(at,{series:i.surface,colorBar:!1,locale:n,height:`100%`,ariaLabel:e(`cards.surface3d.aria`)})}),(0,M.jsx)(O,{title:e(`cards.bar3d.title`),component:`Bar3DChart`,page:`bar-3d-chart`,description:e(`cards.bar3d.description`),children:(0,M.jsx)(st,{series:i.bars,xAxis:{categories:i.regionNames},yAxis:{categories:i.quarters},zAxis:{format:r},locale:n,height:`100%`,ariaLabel:e(`cards.bar3d.aria`)})}),(0,M.jsx)(O,{title:e(`cards.galaxy.title`),component:`Scatter3DChart`,page:`scatter-3d-chart`,description:e(`cards.galaxy.description`),children:(0,M.jsx)(rt,{series:i.stars,legend:!1,box:!1,aspect:Mt,camera:jt,autoRotate:6,locale:n,height:`100%`,style:At,ariaLabel:e(`cards.galaxy.aria`)})})]})}var Tt,M,N,Et,Dt,Ot,P,kt,F,At,jt,Mt;function Nt(){return(Nt=e((()=>{Tt=t(),c(),it(),j(),M=n(),N=e=>()=>(e=e*16807%2147483647,(e-1)/2147483646),Et=(()=>{let e=N(5);return[[2,2,2],[6,3,5],[4,7,3]].map(([t,n,r])=>Array.from({length:60},()=>[t+(e()-.5)*2.5,n+(e()-.5)*2.5,r+(e()-.5)*2.5]))})(),Dt=(()=>{let e=Float64Array.from({length:600},(e,t)=>t/600*6*Math.PI);return{x:e.map(e=>Math.cos(e)*(1+e/10)),y:e.map(e=>Math.sin(e)*(1+e/10)),z:e.map(e=>e/4),value:e}})(),Ot=(()=>{let e=Float64Array.from({length:48},(e,t)=>-10+20*t/47),t=new Float32Array(2304);for(let n=0;n<48;n++)for(let r=0;r<48;r++){let i=Math.hypot(e[r],e[n]);t[n*48+r]=i===0?1:Math.sin(i)/i}return{rows:48,cols:48,x:e,y:e,z:t}})(),P=[`north`,`south`,`east`,`west`],kt=(()=>{let e=N(8);return P.flatMap((t,n)=>[0,1,2,3].map(t=>[n,t,Math.round(60+n*12+t*18+e()*30)]))})(),F=(()=>{let e=N(11),t=()=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e()),n=(e,t)=>{let n=new Float32Array(e),r=new Float32Array(e),i=new Float32Array(e);for(let a=0;a<e;a++)[n[a],r[a],i[a]]=t(a);return{x:n,y:r,z:i}};return{core:n(6e3,()=>{let n=Math.abs(t())*1.4,r=2*Math.PI*e();return[n*Math.cos(r),n*Math.sin(r),t()*.5]}),arms:n(18e3,n=>{let r=1.5+10*e()**.7,i=n%2*Math.PI+Math.log(r)*2.6+t()*.22;return[r*Math.cos(i),r*Math.sin(i),t()*.25]})}})(),At={background:`radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)`,borderRadius:8,"--surface-color":`#05070f`,"--text-color":`#e6e9f2`,"--text-secondary-color":`#9aa3b8`,"--border-color":`#2a3247`},jt={azimuth:20,elevation:40,zoom:1.6},Mt=[1,1,.35]})))()}function Pt({ariaLabel:e}){let{i18n:t}=s(),n=(0,I.useRef)(null),r=(0,I.useRef)(null),[i]=(0,I.useState)(()=>$e({seed:5})),[a]=(0,I.useState)(()=>i.snapshot());return v(r,e=>n.current?.applyDeltas(i.step(e).delta)),(0,L.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,L.jsx)(Xe,{ref:n,book:a,range:.003,legend:!1,fontSize:10,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function Ft({ariaLabel:e}){let{i18n:t}=s(),n=(0,I.useRef)(null),r=(0,I.useRef)(null),[i]=(0,I.useState)(()=>$e({seed:9})),[a]=(0,I.useState)(()=>i.snapshot());return v(r,e=>{let{delta:t,trades:r}=i.step(e);n.current?.applyDeltas(t),r.length&&n.current?.setLastPrice(i.last())}),(0,L.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,L.jsx)(Qe,{ref:n,book:a,rowHeight:16,fontSize:11,imbalance:!1,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function It({ariaLabel:e}){let{i18n:t}=s(),n=(0,I.useRef)(null),r=(0,I.useRef)(null),[i]=(0,I.useState)(()=>tt({seed:25},3e4));return(0,I.useEffect)(()=>{let e=n.current;if(e){e.setBook(i.snapshot);for(let{delta:t,trades:n}of i.updates)e.applyDeltas(t),e.addTrades(n)}},[i]),v(r,e=>{let{delta:t,trades:r}=i.feed.step(e);n.current?.applyDeltas(t),n.current?.addTrades(r)}),(0,L.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,L.jsx)(Ye,{ref:n,interval:150,window:3e4,profile:!1,bubbleSize:12,fontSize:10,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function Lt({ariaLabel:e}){let{i18n:t}=s(),n=(0,I.useRef)(null),r=(0,I.useRef)(null),[i]=(0,I.useState)(()=>tt({seed:36},1e4)),[a]=(0,I.useState)(()=>i.updates.flatMap(e=>e.trades));return v(r,e=>{let{trades:t}=i.feed.step(e);t.length&&n.current?.addTrades(t)}),(0,L.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,L.jsx)(Ze,{ref:n,trades:a,rowHeight:16,fontSize:11,milliseconds:!1,aggregate:!0,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function Rt(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,I.useMemo)(()=>[{name:e(`price`),data:zt}],[e]),i=(0,I.useMemo)(()=>({open:e(`ohlcLabels.open`),high:e(`ohlcLabels.high`),low:e(`ohlcLabels.low`),close:e(`ohlcLabels.close`)}),[e]);return(0,L.jsxs)(D,{children:[(0,L.jsx)(O,{title:e(`cards.candlestick.title`),component:`CandlestickChart`,page:`candlestick-chart`,description:e(`cards.candlestick.description`),children:(0,L.jsx)(Ce,{series:r,tooltip:{labels:i},height:`100%`,legend:!1,ariaLabel:e(`cards.candlestick.aria`)})}),(0,L.jsx)(O,{title:e(`cards.trading.title`),component:`TradingChart`,page:`trading-chart`,description:e(`cards.trading.description`),children:(0,L.jsx)(We,{bars:Bt,timeframe:`1H`,symbol:`BTC/USDT`,indicators:Ht,volumeProfile:Ut,legend:!1,highLowMarkers:!1,barSpacing:5,wheel:`modifier`,locale:n,height:`100%`,ariaLabel:e(`cards.trading.aria`)})}),(0,L.jsx)(O,{title:e(`cards.indicators.title`),component:`TradingChart`,page:`technical-indicators`,description:e(`cards.indicators.description`),children:(0,L.jsx)(We,{bars:Vt,timeframe:`1D`,symbol:`BTC/USDT`,indicators:Wt,legend:!1,highLowMarkers:!1,barSpacing:4,wheel:`modifier`,locale:n,height:`100%`,ariaLabel:e(`cards.indicators.aria`)})}),(0,L.jsx)(O,{title:e(`cards.depth.title`),component:`DepthChart`,page:`depth-chart`,description:e(`cards.depth.description`),children:(0,L.jsx)(Pt,{ariaLabel:e(`cards.depth.aria`)})}),(0,L.jsx)(O,{title:e(`cards.orderBook.title`),component:`OrderBook`,page:`order-book`,description:e(`cards.orderBook.description`),children:(0,L.jsx)(Ft,{ariaLabel:e(`cards.orderBook.aria`)})}),(0,L.jsx)(O,{title:e(`cards.orderBookHeatmap.title`),component:`OrderBookHeatmap`,page:`order-book-heatmap`,description:e(`cards.orderBookHeatmap.description`),children:(0,L.jsx)(It,{ariaLabel:e(`cards.orderBookHeatmap.aria`)})}),(0,L.jsx)(O,{title:e(`cards.timeSales.title`),component:`TimeAndSales`,page:`time-and-sales`,description:e(`cards.timeSales.description`),children:(0,L.jsx)(Lt,{ariaLabel:e(`cards.timeSales.aria`)})})]})}var I,L,zt,Bt,Vt,Ht,Ut,Wt;function Gt(){return(Gt=e((()=>{I=t(),c(),m(),nt(),Ge(),j(),qe(),et(),L=n(),zt=Ue({count:36,timeframe:Je,seed:42}).map((e,t)=>({x:new Date(2026,8,1+t),open:e.open,high:e.high,low:e.low,y:e.close})),Bt=Ue({count:240,timeframe:Ke,seed:7,price:64e3,volatility:.006,volume:400}),Vt=Ue({count:200,timeframe:Je,seed:36,price:58e3,volatility:.024,volume:3e4}),Ht=[{type:`ma`,period:20},{type:`volume`,overlay:!0}],Ut={rows:24},Wt=[{type:`supertrend`,period:10,multiplier:3},{type:`macd`,height:50}]})))()}function Kt(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,R.useMemo)(()=>{let t=qt.map(([t,n,r])=>({id:t,label:e(`graph.services.${t}`),group:n,value:r})),n=Jt.map(([e,t])=>({source:e,target:t,directed:!0})),r=Yt.map(t=>({id:t,name:e(`graph.tiers.${t}`)})),i=Xt.map(t=>({id:t,label:e(`graph.topics.${t}`),group:t})),a=Zt.map(([e,t,n])=>({source:e,target:t,value:n})),o=Qt.map(([t,n])=>({id:t,label:e(`graph.steps.${t}`),value:n})),s=$t.map(([e,t])=>({source:e,target:t})),c=B.map(([t])=>({id:t,label:e(`graph.roles.${t}`)})),l=B.flatMap(([e,t])=>t?[{source:t,target:e}]:[]),u=[{id:`trip`,label:e(`graph.trip.trip`)}],d=[];for(let[t,n]of Object.entries(nn)){u.push({id:t,label:e(`graph.trip.${t}`)}),d.push({source:`trip`,target:t});for(let r of n)u.push({id:r,label:e(`graph.trip.${r}`)}),d.push({source:t,target:r})}return{serviceNodes:t,serviceEdges:n,serviceGroups:r,topicNodes:i,topicEdges:a,stepNodes:o,stepEdges:s,roleNodes:c,roleEdges:l,tripNodes:u,tripEdges:d,planNames:an.map(t=>e(`graph.plans.${t}`))}},[e]),i=(0,R.useMemo)(()=>{let t=new Intl.NumberFormat(n);return n=>e(`customers`,{value:t.format(n)})},[e,n]);return(0,z.jsxs)(D,{children:[(0,z.jsx)(O,{title:e(`cards.network.title`),component:`GraphChart`,page:`graph-chart`,description:e(`cards.network.description`),children:(0,z.jsx)(ct,{nodes:r.serviceNodes,edges:r.serviceEdges,groups:r.serviceGroups,nodeSize:[10,24],edgeColor:`source`,force:{linkDistance:50,charge:-260},legend:!1,controls:!1,fitPadding:12,locale:n,height:`100%`,ariaLabel:e(`cards.network.aria`)})}),(0,z.jsx)(O,{title:e(`cards.arc.title`),component:`GraphChart`,page:`graph-chart`,description:e(`cards.arc.description`),children:(0,z.jsx)(ct,{nodes:r.topicNodes,edges:r.topicEdges,layout:`arc`,edgeColor:`source`,edgeWidth:[1,5],edgeLabels:!1,legend:!1,controls:!1,fitPadding:12,locale:n,height:`100%`,ariaLabel:e(`cards.arc.aria`)})}),(0,z.jsx)(O,{title:e(`cards.dag.title`),component:`DependencyGraph`,page:`dependency-graph`,description:e(`cards.dag.description`),children:(0,z.jsx)(ut,{nodes:r.stepNodes,edges:r.stepEdges,direction:`LR`,edgeStyle:`orthogonal`,criticalPath:!0,dag:en,nodeLabels:!0,legend:!1,controls:!1,fitPadding:12,locale:n,height:`100%`,ariaLabel:e(`cards.dag.aria`)})}),(0,z.jsx)(O,{title:e(`cards.org.title`),component:`TreeChart`,page:`tree-chart`,description:e(`cards.org.description`),children:(0,z.jsx)(dt,{nodes:r.roleNodes,edges:r.roleEdges,layout:`org`,tree:tn,nodeLabels:!0,legend:!1,controls:!1,fitPadding:12,locale:n,height:`100%`,ariaLabel:e(`cards.org.aria`)})}),(0,z.jsx)(O,{title:e(`cards.mindMap.title`),component:`TreeChart`,page:`tree-chart`,description:e(`cards.mindMap.description`),children:(0,z.jsx)(dt,{nodes:r.tripNodes,edges:r.tripEdges,layout:`mindmap`,tree:rn,nodeLabels:!0,legend:!1,controls:!1,fitPadding:12,locale:n,height:`100%`,ariaLabel:e(`cards.mindMap.aria`)})}),(0,z.jsx)(O,{title:e(`cards.chord.title`),component:`ChordChart`,page:`chord-chart`,description:e(`cards.chord.description`),children:(0,z.jsx)(Ve,{groups:r.planNames,matrix:on,directed:!0,format:i,legend:!1,locale:n,height:`100%`,ariaLabel:e(`cards.chord.aria`)})})]})}var R,z,qt,Jt,Yt,Xt,Zt,Qt,$t,en,B,tn,nn,rn,an,on;function sn(){return(sn=e((()=>{R=t(),c(),_(),lt(),j(),z=n(),qt=[[`gateway`,`edge`,1200],[`web`,`edge`,640],[`auth`,`core`,520],[`users`,`core`,380],[`orders`,`core`,300],[`payments`,`core`,160],[`search`,`core`,420],[`inventory`,`core`,220],[`database`,`data`,900],[`cache`,`data`,1100],[`queue`,`data`,260]],Jt=[[`web`,`gateway`],[`gateway`,`auth`],[`gateway`,`users`],[`gateway`,`orders`],[`gateway`,`search`],[`orders`,`payments`],[`orders`,`inventory`],[`orders`,`queue`],[`auth`,`cache`],[`users`,`database`],[`users`,`cache`],[`orders`,`database`],[`search`,`cache`],[`inventory`,`database`],[`payments`,`queue`]],Yt=[`edge`,`core`,`data`],Xt=[`login`,`billing`,`export`,`mobile`,`speed`,`alerts`],Zt=[[`login`,`mobile`,9],[`login`,`alerts`,3],[`billing`,`export`,5],[`billing`,`login`,4],[`export`,`speed`,7],[`mobile`,`speed`,6],[`mobile`,`alerts`,8],[`speed`,`alerts`,2]],Qt=[[`extract`,12],[`clean`,8],[`enrich`,15],[`join`,6],[`train`,25],[`report`,4],[`publish`,3]],$t=[[`extract`,`clean`],[`extract`,`enrich`],[`clean`,`join`],[`enrich`,`join`],[`join`,`train`],[`join`,`report`],[`train`,`publish`],[`report`,`publish`]],en={layerGap:28,nodeGap:12},B=[[`ceo`,null],[`cto`,`ceo`],[`cfo`,`ceo`],[`coo`,`ceo`],[`platform`,`cto`],[`product`,`cto`],[`finance`,`cfo`],[`sales`,`coo`],[`support`,`coo`]],tn={cardSize:[104,34],levelGap:28,siblingGap:10},nn={transport:[`train`,`rentalCar`],stay:[`hotel`,`camping`],food:[`market`,`restaurants`],activities:[`museum`,`hiking`,`beach`]},rn={levelGap:24,siblingGap:6},an=[`free`,`starter`,`pro`,`enterprise`],on=[[0,120,40,4],[30,0,90,12],[10,25,0,36],[2,4,14,0]]})))()}function cn(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,V.useMemo)(()=>{let e=new Intl.NumberFormat(n),t=new Intl.NumberFormat(n,{notation:`compact`}),r=new Intl.NumberFormat(n,{style:`percent`});return{number:t=>e.format(t),compact:e=>t.format(e),percent:e=>r.format(e),percentOf100:e=>r.format(e/100)}},[n]),i=(0,V.useMemo)(()=>{let t=[{name:e(`plans.free`),value:5400},{name:e(`plans.pro`),value:2100},{name:e(`plans.team`),value:860}],n=[`speed`,`quality`,`cost`,`support`,`scale`].map(t=>({name:e(`criteria.${t}`),max:10})),r=[{name:e(`vendor`,{name:`A`}),values:[8,6,7,5,9]},{name:e(`vendor`,{name:`B`}),values:[5,9,6,8,6]}],i=[{name:e(`stages.visited`),value:12e3},{name:e(`stages.signedUp`),value:4800},{name:e(`stages.activated`),value:2600},{name:e(`stages.paid`),value:900}],a=[{x:8,y:8.5,label:e(`tasks.release`)},{x:3,y:7.5,label:e(`tasks.roadmap`)},{x:7,y:3,label:e(`tasks.emails`)},{x:2,y:2,label:e(`tasks.cleanup`)}],o={topLeft:{label:e(`quadrants.plan`)},topRight:{label:e(`quadrants.doFirst`)},bottomLeft:{label:e(`quadrants.drop`)},bottomRight:{label:e(`quadrants.delegate`)}},s=[{name:e(`budget.product`),children:[{name:e(`budget.design`),value:18},{name:e(`budget.engineering`),value:42}]},{name:e(`budget.goToMarket`),children:[{name:e(`budget.sales`),value:24},{name:e(`budget.marketing`),value:16}]}],c=t=>t.map(([t,n])=>typeof n==`number`?{name:e(`org.${t}`),value:n}:{name:e(`org.${t}`),children:c(n)}),l=dn.map(t=>({name:e(`flow.${t}`)}));return{plans:t,criteria:n,vendors:r,stages:i,tasks:a,regions:o,budget:s,org:c(un),nodes:l}},[e]),a=(0,V.useMemo)(()=>t=>e(`people`,{value:t}),[e]),o=(0,V.useMemo)(()=>e=>r.compact(e*1e3),[r]);return(0,H.jsxs)(D,{children:[(0,H.jsx)(O,{title:e(`cards.pie.title`),component:`PieChart`,page:`pie-chart`,description:e(`cards.pie.description`),children:(0,H.jsx)(He,{data:ln,height:`100%`,legend:!1,format:r.percentOf100,percentFormat:r.percent,ariaLabel:e(`cards.pie.aria`)})}),(0,H.jsx)(O,{title:e(`cards.donut.title`),component:`DonutChart`,page:`pie-chart`,description:e(`cards.donut.description`),children:(0,H.jsx)(Re,{data:i.plans,height:`100%`,labels:`none`,centerValue:r.compact(8360),centerLabel:e(`users`),legend:{position:`bottom`},format:r.number,percentFormat:r.percent,ariaLabel:e(`cards.donut.aria`)})}),(0,H.jsx)(O,{title:e(`cards.radar.title`),component:`RadarChart`,page:`radar-chart`,description:e(`cards.radar.description`),children:(0,H.jsx)(Ne,{indicators:i.criteria,series:i.vendors,height:`100%`,legend:!1,format:r.number,ariaLabel:e(`cards.radar.aria`)})}),(0,H.jsx)(O,{title:e(`cards.funnel.title`),component:`FunnelChart`,page:`funnel-chart`,description:e(`cards.funnel.description`),children:(0,H.jsx)(Ie,{data:i.stages,height:`100%`,legend:!1,format:r.compact,percentFormat:r.percent,ariaLabel:e(`cards.funnel.aria`)})}),(0,H.jsx)(O,{title:e(`cards.quadrant.title`),component:`QuadrantChart`,page:`quadrant-chart`,description:e(`cards.quadrant.description`),children:(0,H.jsx)(Oe,{points:i.tasks,quadrants:i.regions,showTicks:!1,xLabel:e(`urgency`),yLabel:e(`importance`),height:`100%`,ariaLabel:e(`cards.quadrant.aria`)})}),(0,H.jsx)(O,{title:e(`cards.treemap.title`),component:`TreemapChart`,page:`treemap-chart`,description:e(`cards.treemap.description`),children:(0,H.jsx)(Me,{data:i.budget,height:`100%`,format:r.percentOf100,percentFormat:r.percent,ariaLabel:e(`cards.treemap.aria`)})}),(0,H.jsx)(O,{title:e(`cards.sunburst.title`),component:`SunburstChart`,page:`sunburst-chart`,description:e(`cards.sunburst.description`),children:(0,H.jsx)(Pe,{data:i.org,innerRadius:.3,format:a,percentFormat:r.percent,height:`100%`,ariaLabel:e(`cards.sunburst.aria`)})}),(0,H.jsx)(O,{title:e(`cards.sankey.title`),component:`SankeyChart`,page:`sankey-chart`,description:e(`cards.sankey.description`),children:(0,H.jsx)(Be,{nodes:i.nodes,links:fn,format:o,linkColor:`source`,nodeWidth:8,height:`100%`,ariaLabel:e(`cards.sankey.aria`)})})]})}var V,H,ln,un,dn,fn;function pn(){return(pn=e((()=>{V=t(),c(),_(),m(),j(),H=n(),ln=[{name:`Chrome`,value:64},{name:`Safari`,value:19},{name:`Edge`,value:9},{name:`Firefox`,value:8}],un=[[`engineering`,[[`platform`,18],[`web`,24],[`mobile`,16]]],[`sales`,[[`emea`,22],[`americas`,31]]],[`operations`,[[`support`,26],[`finance`,8]]]],dn=[`search`,`social`,`email`,`site`,`signedUp`,`left`],fn=[{source:0,target:3,value:52},{source:1,target:3,value:31},{source:2,target:3,value:17},{source:3,target:4,value:23},{source:3,target:5,value:77}]})))()}function mn(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,U.useMemo)(()=>{let e=new Intl.NumberFormat(n),t=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),i=new Intl.NumberFormat(n,{style:`percent`});return{number:t=>e.format(Math.round(t)),ms:e=>t.format(e),millions:e=>r.format(e*1e6),percent:e=>i.format(e)}},[n]),i=(0,U.useMemo)(()=>{let t=_n.map(([t],n)=>({x:e(`services.${t}`),values:vn[n]})),r=yn.map(([t,n])=>typeof n==`number`?{label:e(`bridge.${t}`),value:n}:{label:e(`bridge.${t}`),kind:n}),i=new Intl.DateTimeFormat(n,{weekday:`short`}),a=K.map((e,t)=>i.format(new Date(2026,0,5+t))),o=new Intl.DateTimeFormat(n,{hour:`numeric`}),s=K[0].map((e,t)=>o.format(new Date(2026,0,5,t*4)));return{groups:t,steps:r,days:a,slots:s,cells:a.flatMap((e,t)=>s.map((n,r)=>({x:e,y:n,value:K[t][r]}))),bullets:Sn.map(({key:t,...n})=>({name:e(`kpis.${t}`),...n,ranges:[...n.ranges]})),rings:Cn.map(([t,n,r])=>({name:e(`objectives.${t}`),value:n,max:r})),tasks:wn.map(([t,n,r,i])=>({name:e(`plan.${t}`),start:new Date(2026,10,n),end:new Date(2026,10,r),progress:i}))}},[e,n]),a=(0,U.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]),o=(0,U.useMemo)(()=>({max:e(`stats.max`),q3:e(`stats.q3`),median:e(`stats.median`),q1:e(`stats.q1`),min:e(`stats.min`),outliers:e(`stats.outliers`)}),[e]);return(0,W.jsxs)(D,{children:[(0,W.jsx)(O,{title:e(`cards.histogram.title`),component:`HistogramChart`,page:`histogram-chart`,description:e(`cards.histogram.description`),children:(0,W.jsx)(he,{values:gn,domain:[0,200],bins:40,name:e(`requests`),formatBin:r.ms,xAxis:{format:r.ms},yAxis:{format:r.number},height:`100%`,legend:!1,ariaLabel:e(`cards.histogram.aria`)})}),(0,W.jsx)(O,{title:e(`cards.boxplot.title`),component:`BoxPlotChart`,page:`boxplot-chart`,description:e(`cards.boxplot.description`),children:(0,W.jsx)(we,{groups:i.groups,name:e(`responseTime`),yAxis:{format:r.ms},tooltip:{labels:o},height:`100%`,legend:!1,ariaLabel:e(`cards.boxplot.aria`)})}),(0,W.jsx)(O,{title:e(`cards.waterfall.title`),component:`WaterfallChart`,page:`waterfall-chart`,description:e(`cards.waterfall.description`),children:(0,W.jsx)(Ee,{steps:i.steps,start:120,name:e(`amount`),format:r.millions,yAxis:{format:r.millions},height:`100%`,legend:!1,ariaLabel:e(`cards.waterfall.aria`)})}),(0,W.jsx)(O,{title:e(`cards.heatmap.title`),component:`HeatmapChart`,page:`heatmap-chart`,description:e(`cards.heatmap.description`),children:(0,W.jsx)(be,{data:i.cells,xCategories:i.days,yCategories:i.slots,name:e(`load`),radius:2,height:`100%`,ariaLabel:e(`cards.heatmap.aria`)})}),(0,W.jsx)(O,{title:e(`cards.calendar.title`),component:`CalendarHeatmap`,page:`calendar-heatmap`,description:e(`cards.calendar.description`),children:(0,W.jsx)(je,{data:bn,range:[`2026-06-01`,`2026-10-18`],locale:n,format:r.number,height:`100%`,ariaLabel:e(`cards.calendar.aria`)})}),(0,W.jsx)(O,{title:e(`cards.gauge.title`),component:`GaugeChart`,page:`gauge-chart`,description:e(`cards.gauge.description`),children:(0,W.jsx)(Le,{value:78,label:e(`uptimeScore`),bands:xn,format:r.number,tooltip:!1,height:`100%`,ariaLabel:e(`uptimeScore`)})}),(0,W.jsx)(O,{title:e(`cards.bullet.title`),component:`BulletChart`,page:`bullet-chart`,description:e(`cards.bullet.description`),children:(0,W.jsx)(Fe,{data:i.bullets,rangeLabels:a,percentFormat:r.percent,height:`100%`,ariaLabel:e(`cards.bullet.aria`)})}),(0,W.jsx)(O,{title:e(`cards.radialBar.title`),component:`RadialBarChart`,page:`radial-bar-chart`,description:e(`cards.radialBar.description`),children:(0,W.jsx)(ze,{data:i.rings,sweep:270,innerRadius:.3,percentFormat:r.percent,legend:!1,height:`100%`,ariaLabel:e(`cards.radialBar.aria`)})}),(0,W.jsx)(O,{title:e(`cards.gantt.title`),component:`GanttChart`,page:`gantt-chart`,description:e(`cards.gantt.description`),children:(0,W.jsx)(Te,{tasks:i.tasks,today:Tn,todayLabel:e(`today`),taskName:e(`taskName`),progressName:e(`progress`),height:`100%`,legend:!1,ariaLabel:e(`cards.gantt.aria`)})})]})}var U,W,G,hn,gn,_n,vn,yn,K,bn,xn,Sn,Cn,wn,Tn;function En(){return(En=e((()=>{U=t(),c(),m(),_(),j(),W=n(),G=e=>()=>(e=e*16807%2147483647,(e-1)/2147483646),hn=(e,t,n,r)=>{let i=G(e);return Float64Array.from({length:r},()=>{let e=Math.sqrt(-2*Math.log(i()||1e-9))*Math.cos(2*Math.PI*i());return t*Math.exp(n*e)})},gn=hn(1,60,.45,5e3),_n=[[`gateway`,20,.35],[`search`,90,.45],[`checkout`,140,.38],[`images`,60,.6]],vn=_n.map(([,e,t],n)=>hn(10+n,e,t,400)),yn=[[`lastYear`,`subtotal`],[`newCustomers`,38],[`expansion`,17],[`churn`,-21],[`pricing`,9],[`thisYear`,`total`]],K=(()=>{let e=G(3);return Array.from({length:7},(t,n)=>Array.from({length:6},(t,r)=>Math.round((n<5?40:15)+(r>=2&&r<=4?40:0)+e()*20)))})(),bn=(()=>{let e=G(11),t=[];for(let n=0;n<140;n++){let r=new Date(2026,5,1+n),i=r.getDay()===0||r.getDay()===6;if(e()<(i?.2:.85)){let n=String(r.getMonth()+1).padStart(2,`0`),a=String(r.getDate()).padStart(2,`0`);t.push({date:`${r.getFullYear()}-${n}-${a}`,value:1+Math.round(e()*(i?3:9))})}}return t})(),xn=[{to:60,color:`var(--danger-color)`},{to:85,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}],Sn=[{key:`revenue`,value:270,target:250,ranges:[150,225,300]},{key:`profit`,value:22,target:26,ranges:[15,22,30]},{key:`satisfaction`,value:4.6,target:4.4,ranges:[3.5,4.2,5]}],Cn=[[`revenue`,82,100],[`users`,64,100],[`retention`,91,100]],wn=[[`research`,1,6,1],[`design`,5,13,1],[`build`,10,27,.6],[`test`,22,31,.2]],Tn=new Date(2026,10,18)})))()}function Dn(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,On.useMemo)(()=>{let e=new Intl.NumberFormat(n),t=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),r=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),i=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`});return{number:t=>e.format(t),millions:e=>t.format(e*1e6),thousands:e=>t.format(e*1e3),percent:e=>r.format(e),percentOf100:e=>r.format(e/100),celsius:e=>i.format(e)}},[n]),i=(0,On.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`}),i=Mn.map((e,n)=>t.format(new Date(2026,n,1))),a=e=>e.map((e,t)=>[i[t],e]),o=In.map((t,n)=>e(`quarter`,{n:n+1}));return{line:[{name:e(`visits`),data:a(An)},{name:e(`signups`),data:a(jn)}],area:[{name:e(`web`),data:a(J.web)},{name:`iOS`,data:a(J.ios)},{name:`Android`,data:a(J.android)}],rangeArea:[{name:e(`temperature`),format:r.celsius,data:i.map((e,t)=>({x:e,y0:Mn[t],y:Nn[t]}))}],bar:[{name:e(`orders`),data:Pn.map((e,t)=>({x:o[t],y:e,color:t===2?`var(--success-color)`:void 0}))}],horizontalBar:[{name:e(`developers`),format:r.percentOf100,data:Fn}],mixed:[{name:e(`revenue`),type:`bar`,format:r.millions,data:o.map((e,t)=>[e,In[t]])},{name:e(`growth`),type:`line`,yAxis:`right`,format:r.percent,color:`var(--chart-series-3, #f59e0b)`,data:o.map((e,t)=>[e,Ln[t]])}],scatter:Rn.map((t,n)=>({name:e(`team`,{name:n===0?`A`:`B`}),data:t})),bubble:[`email`,`social`].map(t=>({name:e(`channels.${t}`),valueName:e(`reach`),format:e=>r.number(e),data:zn[t].map(([e,t,n])=>({x:e,y:t,value:n}))}))}},[e,n,r]);return(0,q.jsxs)(D,{children:[(0,q.jsx)(O,{title:e(`cards.line.title`),component:`LineChart`,page:`line-chart`,description:e(`cards.line.description`),children:(0,q.jsx)(ye,{series:i.line,height:`100%`,legend:!1,ariaLabel:e(`cards.line.aria`)})}),(0,q.jsx)(O,{title:e(`cards.area.title`),component:`AreaChart`,page:`area-chart`,description:e(`cards.area.description`),children:(0,q.jsx)(Se,{series:i.area,stacked:!0,height:`100%`,legend:!1,ariaLabel:e(`cards.area.aria`)})}),(0,q.jsx)(O,{title:e(`cards.rangeArea.title`),component:`RangeAreaChart`,page:`range-area-chart`,description:e(`cards.rangeArea.description`),children:(0,q.jsx)(De,{series:i.rangeArea,yAxis:{format:r.celsius},height:`100%`,legend:!1,ariaLabel:e(`cards.rangeArea.aria`)})}),(0,q.jsx)(O,{title:e(`cards.bar.title`),component:`BarChart`,page:`bar-chart`,description:e(`cards.bar.description`),children:(0,q.jsx)(h,{series:i.bar,labels:!0,yAxis:{format:r.number},height:`100%`,legend:!1,ariaLabel:e(`cards.bar.aria`)})}),(0,q.jsx)(O,{title:e(`cards.horizontalBar.title`),component:`HorizontalBarChart`,page:`horizontal-bar-chart`,description:e(`cards.horizontalBar.description`),children:(0,q.jsx)(ge,{series:i.horizontalBar,labels:!0,yAxis:{format:r.percentOf100},height:`100%`,legend:!1,ariaLabel:e(`cards.horizontalBar.aria`)})}),(0,q.jsx)(O,{title:e(`cards.mixed.title`),component:`MixedChart`,page:`mixed-chart`,description:e(`cards.mixed.description`),children:(0,q.jsx)(_e,{series:i.mixed,yAxis:{format:r.millions},yAxis2:{format:r.percent},height:`100%`,legend:!1,ariaLabel:e(`cards.mixed.aria`)})}),(0,q.jsx)(O,{title:e(`cards.scatter.title`),component:`ScatterChart`,page:`scatter-chart`,description:e(`cards.scatter.description`),children:(0,q.jsx)(xe,{series:i.scatter,height:`100%`,legend:!1,ariaLabel:e(`cards.scatter.aria`)})}),(0,q.jsx)(O,{title:e(`cards.bubble.title`),component:`BubbleChart`,page:`bubble-chart`,description:e(`cards.bubble.description`),children:(0,q.jsx)(ve,{series:i.bubble,maxSize:36,xAxis:{format:r.thousands},yAxis:{format:r.number},height:`100%`,legend:!1,ariaLabel:e(`cards.bubble.aria`)})}),(0,q.jsx)(O,{title:e(`cards.sparkline.title`),component:`Sparkline`,page:`sparkline`,description:e(`cards.sparkline.description`),children:(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,q.jsxs)(`div`,{children:[(0,q.jsx)(`strong`,{style:{fontSize:22},children:r.thousands(46)}),` `,e(`revenueLabel`),(0,q.jsx)(g,{data:Bn,type:`area`,reference:30,name:e(`revenueLabel`),format:r.thousands,ariaLabel:e(`revenueTrendAria`)})]}),(0,q.jsxs)(`div`,{children:[(0,q.jsx)(`strong`,{style:{fontSize:22},children:r.number(2)}),` `,e(`errorsLabel`),(0,q.jsx)(g,{data:Vn,type:`bar`,name:e(`errorsLabel`),color:`var(--danger-color)`,ariaLabel:e(`errorsTrendAria`)})]})]})})]})}var On,q,kn,An,jn,J,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn;function Hn(){return(Hn=e((()=>{On=t(),c(),m(),j(),q=n(),kn=e=>()=>(e=e*16807%2147483647,(e-1)/2147483646),An=[32,41,38,52,49,61,66,72],jn=[12,15,19,18,24,27,26,34],J={web:[20,24,22,30,34,31,38,42],ios:[12,14,18,17,20,24,23,27],android:[8,11,10,14,16,15,19,22]},Mn=[-1,0,3,6,10,13,15,15,12,8,4,1],Nn=[5,7,12,16,20,24,26,26,21,16,10,6],Pn=[128,164,212,187],Fn=[[`JavaScript`,62],[`Python`,51],[`TypeScript`,43],[`Java`,30],[`Go`,18]],In=[18,21,24,31],Ln=[.04,.17,.14,.29],Rn=(()=>{let e=kn(7),t=(t,n)=>Array.from({length:40},()=>({x:t+(e()-.5)*30,y:n+(e()-.5)*30}));return[t(35,60),t(65,35)]})(),zn={email:[[4,320,12e3],[6,410,18e3],[9,380,15e3]],social:[[12,520,9e4],[18,760,14e4],[25,690,21e4]]},Bn=[18,22,19,26,24,31,29,35,33,41,38,46],Vn=[9,7,8,5,6,4,5,3,4,2,3,2]})))()}function Un(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,Wn.useMemo)(()=>{let t=Jn(n);return[{name:e(`revenue`),type:`bar`,data:t.map((e,t)=>[e,Kn[t]])},{name:e(`target`),type:`line`,data:t.map((e,t)=>[e,qn[t]])}]},[e,n]),i=(0,Wn.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,Gn.jsx)(Ae,{series:r,yAxis:{format:i},legend:{position:`bottom`},height:300,ariaLabel:e(`revenueAria`)})}var Wn,Gn,Kn,qn,Jn;function Yn(){return(Yn=e((()=>{Wn=t(),c(),ke(),Gn=n(),Kn=[42,48,51,47,58,63,61,70,74,69,81,92],qn=[45,47,50,53,56,59,62,65,68,71,74,77],Jn=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function Xn(){let{t:e,i18n:t}=s(`common`,{keyPrefix:`docs.charts.data`}),[n,r]=(0,Zn.useState)(`colorblind`),i=Qn[n],{bars:a,shares:o}=(0,Zn.useMemo)(()=>{let t=Object.keys(X);return{bars:t.map(t=>({name:e(`channels.${t}`),data:X[t].map((t,n)=>[e(`quarter`,{n:n+1}),t])})),shares:t.map(t=>({name:e(`channels.${t}`),value:X[t].reduce((e,t)=>e+t,0)}))}},[e]),c=new Intl.NumberFormat(t.language,{style:`percent`});return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsx)(re,{"aria-label":e(`palette`),direction:`horizontal`,value:n,onChange:e=>r(e),children:Object.keys(Qn).map(t=>(0,Y.jsx)(f,{value:t,label:e(`palettes.${t}`)},t))}),(0,Y.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:16},children:[(0,Y.jsx)(h,{series:a,stacked:!0,palette:i,legend:{position:`bottom`},height:280,ariaLabel:e(`requestsAria`)}),(0,Y.jsx)(Re,{data:o,palette:i,labels:`none`,legend:{position:`bottom`},renderTooltip:e=>(0,Y.jsxs)(`span`,{children:[e.name,` · `,c.format(e.percent)]}),height:280,ariaLabel:e(`channelsAria`)})]})]})}var Zn,Y,Qn,X;function $n(){return($n=e((()=>{Zn=t(),c(),ie(),ae(),m(),_(),Y=n(),Qn={theme:void 0,colorblind:[`#0072B2`,`#E69F00`,`#009E73`,`#CC79A7`,`#56B4E9`],blues:[`#08306b`,`#2171b5`,`#4292c6`,`#6baed6`,`#9ecae1`],warm:[`#7f1d1d`,`#c2410c`,`#f59e0b`,`#facc15`,`#fde68a`]},X={email:[420,380,410,360],chat:[310,360,420,480],phone:[180,170,150,140],social:[60,80,95,120],community:[40,55,70,90]}})))()}function er(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function tr(){let{t:e}=s(`common`,{keyPrefix:`docs.charts.data`}),[t,n]=(0,Z.useState)(`auto`),[r,i]=(0,Z.useState)(null),a=(0,Z.useMemo)(()=>{let t=er(7),n=new Float64Array(nr),r=0;for(let e=0;e<nr;e++)r+=t()-.5,n[e]=r;return[{name:e(`randomWalk`),data:{y:n}}]},[e]);return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Q.jsxs)(re,{"aria-label":e(`renderer`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,Q.jsx)(f,{value:`auto`,label:`auto`}),(0,Q.jsx)(f,{value:`webgpu`,label:`webgpu`}),(0,Q.jsx)(f,{value:`webgl2`,label:`webgl2`}),(0,Q.jsx)(f,{value:`webgl`,label:`webgl`}),(0,Q.jsx)(f,{value:`canvas2d`,label:`canvas2d`})]}),(0,Q.jsx)(Ae,{series:a,renderer:t,onRendererChange:i,height:280,ariaLabel:e(`randomWalkAria`)}),(0,Q.jsx)(`p`,{role:`status`,children:e(`rendererStatus`,{requested:t,active:r??`…`})})]})}var Z,Q,nr;function rr(){return(rr=e((()=>{Z=t(),c(),ie(),ae(),ke(),Q=n(),nr=5e4})))()}var ir;function ar(){return(ar=e((()=>{ir=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  type ChartAnnotation,
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

// p95 latency (ms) per minute, with an incident during a deploy
const random = mulberry32(42);
const latency = Array.from({ length: 120 }, (_, minute) => {
  const incident = minute >= 70 && minute <= 82 ? 90 : 0;
  return [minute, 105 + random() * 40 + incident] as const;
});

export default function AnnotationsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const ms = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "millisecond",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const series = useMemo(
    (): ChartSeries[] => [{ name: t("p95"), data: latency }],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: 80,
        y1: 150,
        color: "var(--success-color)",
        label: t("normalRange"),
      },
      {
        type: "rect",
        x0: 70,
        x1: 82,
        color: "var(--warning-color)",
        opacity: 0.12,
        label: t("deploy"),
        labelPosition: "top-right",
      },
      {
        type: "line",
        axis: "y",
        value: 200,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("slo", { value: ms.format(200) }),
      },
    ],
    [t, ms],
  );

  return (
    <Chart
      series={series}
      annotations={annotations}
      xAxis={{ title: t("minutes") }}
      yAxis={{ min: 0, max: 260, format: (value) => ms.format(value) }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
`})))()}var or;function sr(){return(sr=e((()=>{or=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader } from "minerva-design";
import {
  AreaChart,
  BarChart,
  DonutChart,
  Sparkline,
  type ChartSeries,
  type ShapeDatum,
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
const START = new Date(2026, 9, 1).getTime();

// 30 days of a web shop: visitors (new / returning), orders and revenue
const random = mulberry32(30);
const days = Array.from({ length: 30 }, (_, i) => {
  const weekend = [0, 6].includes(new Date(START + i * DAY).getDay());
  const base = (weekend ? 0.75 : 1) * (1 + i / 60);
  const fresh = Math.round(2400 * base * (0.9 + random() * 0.2));
  const returning = Math.round(1700 * base * (0.9 + random() * 0.2));
  const orders = Math.round((fresh + returning) * (0.028 + random() * 0.006));
  return {
    time: START + i * DAY,
    fresh,
    returning,
    orders,
    revenue: orders * 64,
  };
});
const sum = (key: "fresh" | "returning" | "orders" | "revenue") =>
  days.reduce((total, day) => total + day[key], 0);

const devices = [
  { key: "mobile", value: 58 },
  { key: "desktop", value: 35 },
  { key: "tablet", value: 7 },
];
const pages = [
  { path: "/", views: 41_200 },
  { path: "/sale", views: 26_900 },
  { path: "/shoes", views: 18_300 },
  { path: "/bags", views: 12_700 },
  { path: "/checkout", views: 9_800 },
];

export default function DashboardDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      compact: new Intl.NumberFormat(locale, { notation: "compact" }),
      usd: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );
  const traffic = useMemo(
    (): ChartSeries[] => [
      {
        name: t("newVisitors"),
        data: days.map((d) => [d.time, d.fresh] as const),
      },
      {
        name: t("returningVisitors"),
        data: days.map((d) => [d.time, d.returning] as const),
      },
    ],
    [t],
  );
  const deviceData = useMemo(
    (): ShapeDatum[] =>
      devices.map(({ key, value }) => ({ name: t(\`devices.\${key}\`), value })),
    [t],
  );
  const pageSeries = useMemo(
    (): ChartSeries[] => [
      {
        name: t("pageViews"),
        data: pages.map(({ path, views }) => [path, views] as const),
      },
    ],
    [t],
  );

  const visitors = sum("fresh") + sum("returning");
  const kpis = [
    {
      label: t("visitors"),
      value: formats.compact.format(visitors),
      data: days.map((d) => d.fresh + d.returning),
    },
    {
      label: t("ordersLabel"),
      value: formats.number.format(sum("orders")),
      data: days.map((d) => d.orders),
    },
    {
      label: t("revenueLabel"),
      value: formats.usd.format(sum("revenue")),
      data: days.map((d) => d.revenue),
    },
    {
      label: t("conversion"),
      value: formats.percent.format(sum("orders") / visitors),
      data: days.map((d) => d.orders / (d.fresh + d.returning)),
    },
  ];

  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {kpis.map((kpi) => (
          <Card key={kpi.label} padding="small">
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <strong style={{ fontSize: 22 }}>{kpi.value}</strong>
            </CardHeader>
            <CardContent>
              <Sparkline
                data={kpi.data}
                type="area"
                height={36}
                name={kpi.label}
                tooltip={false}
                ariaLabel={t("last30Aria", { metric: kpi.label })}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        <AreaChart
          series={traffic}
          stacked
          xAxis={{
            type: "time",
            format: (value) => formats.date.format(value),
            tickCount: 5,
          }}
          yAxis={{ format: (value) => formats.compact.format(value) }}
          legend={{ position: "bottom" }}
          height={260}
          ariaLabel={t("trafficAria")}
        />
        <DonutChart
          data={deviceData}
          labels="none"
          centerValue={formats.compact.format(visitors)}
          centerLabel={t("visitors")}
          format={(value) => formats.percent.format(value / 100)}
          renderTooltip={(slice) => (
            <span>
              {slice.name} · {formats.percent.format(slice.percent)}
            </span>
          )}
          legend={{ position: "bottom" }}
          height={260}
          ariaLabel={t("devicesAria")}
        />
      </div>
      <BarChart
        series={pageSeries}
        labels
        yAxis={{ format: (value) => formats.compact.format(value) }}
        legend={false}
        height={220}
        ariaLabel={t("topPagesAria")}
      />
    </div>
  );
}
`})))()}var cr;function lr(){return(lr=e((()=>{cr=`import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  Line3DChart,
  Scatter3DChart,
  Surface3DChart,
  type Bar3DSeries,
  type Line3DSeries,
  type Scatter3DSeries,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

// three clusters of 60 points
const clusters = (() => {
  const next = random(5);
  const centers = [
    [2, 2, 2],
    [6, 3, 5],
    [4, 7, 3],
  ];
  return centers.map(([cx, cy, cz]) =>
    Array.from(
      { length: 60 },
      () =>
        [
          cx + (next() - 0.5) * 2.5,
          cy + (next() - 0.5) * 2.5,
          cz + (next() - 0.5) * 2.5,
        ] as const,
    ),
  );
})();

// a rising spiral, colored by time
const spiral = (() => {
  const n = 600;
  const time = Float64Array.from(
    { length: n },
    (_, i) => (i / n) * 6 * Math.PI,
  );
  return {
    x: time.map((a) => Math.cos(a) * (1 + a / 10)),
    y: time.map((a) => Math.sin(a) * (1 + a / 10)),
    z: time.map((a) => a / 4),
    value: time,
  };
})();

// z = sin(r) / r sampled on a 48 × 48 grid
const ripple: Surface3DData = (() => {
  const size = 48;
  const axis = Float64Array.from(
    { length: size },
    (_, i) => -10 + (20 * i) / (size - 1),
  );
  const z = new Float32Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const d = Math.hypot(axis[c], axis[r]);
      z[r * size + c] = d === 0 ? 1 : Math.sin(d) / d;
    }
  }
  return { rows: size, cols: size, x: axis, y: axis, z };
})();

// sales (k$) per region and quarter: [region, quarter, sales]
const regions = ["north", "south", "east", "west"] as const;
const sales = (() => {
  const next = random(8);
  return regions.flatMap((_, r) =>
    [0, 1, 2, 3].map(
      (q) => [r, q, Math.round(60 + r * 12 + q * 18 + next() * 30)] as const,
    ),
  );
})();

// a two-armed spiral galaxy: a warm core and blue arms (columns of floats)
const galaxy = (() => {
  const next = random(11);
  const gauss = () =>
    Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
  const cloud = (count: number, place: (i: number) => number[]) => {
    const x = new Float32Array(count);
    const y = new Float32Array(count);
    const z = new Float32Array(count);
    for (let i = 0; i < count; i++) [x[i], y[i], z[i]] = place(i);
    return { x, y, z };
  };
  const core = cloud(6000, () => {
    const r = Math.abs(gauss()) * 1.4;
    const angle = 2 * Math.PI * next();
    return [r * Math.cos(angle), r * Math.sin(angle), gauss() * 0.5];
  });
  const arms = cloud(18000, (i) => {
    const r = 1.5 + 10 * next() ** 0.7;
    // logarithmic arms, scattered more and more outwards
    const angle = (i % 2) * Math.PI + Math.log(r) * 2.6 + gauss() * 0.22;
    return [r * Math.cos(angle), r * Math.sin(angle), gauss() * 0.25];
  });
  return { core, arms };
})();

/** Night-sky colors of the galaxy card (the chart theme reads them) */
const space = {
  background: "radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)",
  borderRadius: 8,
  "--surface-color": "#05070f",
  "--text-color": "#e6e9f2",
  "--text-secondary-color": "#9aa3b8",
  "--border-color": "#2a3247",
} as CSSProperties;
const galaxyCamera = { azimuth: 20, elevation: 40, zoom: 1.6 };
const flatAspect = [1, 1, 0.35] as const;

export default function Gallery3DDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    // values in thousands of dollars
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const data = useMemo(() => {
    const scatter: Scatter3DSeries[] = clusters.map((points, i) => ({
      name: t("cluster", { name: "ABC"[i] }),
      data: points,
      pointSize: 6,
    }));
    const line: Line3DSeries[] = [
      { name: t("trajectory"), data: spiral, lineWidth: 2 },
    ];
    const surface: Surface3DSeries[] = [{ name: t("ripple"), data: ripple }];
    const bars: Bar3DSeries[] = [{ name: t("sales"), data: sales }];
    // glowing dots whose light adds up where the stars are dense
    const stars: Scatter3DSeries[] = [
      {
        name: t("galaxyCore"),
        data: galaxy.core,
        color: "#ffc477",
        pointSize: 2,
        opacity: 0.16,
        pointStyle: "glow",
        blend: "additive",
      },
      {
        name: t("galaxyArms"),
        data: galaxy.arms,
        color: "#9cc4ff",
        pointSize: 2,
        opacity: 0.1,
        pointStyle: "glow",
        blend: "additive",
      },
    ];
    const regionNames = regions.map((key) => t(\`regions.\${key}\`));
    const quarters = [1, 2, 3, 4].map((n) => t("quarter", { n }));
    return { scatter, line, surface, bars, stars, regionNames, quarters };
  }, [t]);

  // the 3D charts pause their rendering and auto-rotation off screen
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.scatter3d.title")}
        component="Scatter3DChart"
        page="scatter-3d-chart"
        description={t("cards.scatter3d.description")}
      >
        <Scatter3DChart
          series={data.scatter}
          legend={false}
          autoRotate
          locale={locale}
          height="100%"
          ariaLabel={t("cards.scatter3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.line3d.title")}
        component="Line3DChart"
        page="scatter-3d-chart"
        description={t("cards.line3d.description")}
      >
        <Line3DChart
          series={data.line}
          colorScale="plasma"
          colorBar={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.line3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.surface3d.title")}
        component="Surface3DChart"
        page="surface-3d-chart"
        description={t("cards.surface3d.description")}
      >
        <Surface3DChart
          series={data.surface}
          colorBar={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.surface3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bar3d.title")}
        component="Bar3DChart"
        page="bar-3d-chart"
        description={t("cards.bar3d.description")}
      >
        <Bar3DChart
          series={data.bars}
          xAxis={{ categories: data.regionNames }}
          yAxis={{ categories: data.quarters }}
          zAxis={{ format: usd }}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.bar3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.galaxy.title")}
        component="Scatter3DChart"
        page="scatter-3d-chart"
        description={t("cards.galaxy.description")}
      >
        <Scatter3DChart
          series={data.stars}
          legend={false}
          box={false}
          aspect={flatAspect}
          camera={galaxyCamera}
          autoRotate={6}
          locale={locale}
          height="100%"
          style={space}
          ariaLabel={t("cards.galaxy.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
`})))()}var ur;function dr(){return(dr=e((()=>{ur=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  DepthChart,
  OrderBook,
  OrderBookHeatmap,
  TimeAndSales,
  TradingChart,
  type ChartSeries,
  type DepthChartHandle,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
  type TimeAndSalesHandle,
  type TradingIndicator,
  type TradingVolumeProfileOptions,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";
// simulated markets shared with the trading and order book pages
import { DAY, HOUR, generateBars } from "../../trading-chart/data";
import {
  createHistory,
  createMarketFeed,
  useFeedLoop,
} from "../../order-book/feed";

// 36 daily candles (local dates)
const candles = generateBars({ count: 36, timeframe: DAY, seed: 42 }).map(
  (bar, i) => ({
    x: new Date(2026, 8, 1 + i),
    open: bar.open,
    high: bar.high,
    low: bar.low,
    y: bar.close,
  }),
);
// hourly bars of a crypto pair, daily bars for the indicators
const hourly = generateBars({
  count: 240,
  timeframe: HOUR,
  seed: 7,
  price: 64_000,
  volatility: 0.006,
  volume: 400,
});
const daily = generateBars({
  count: 200,
  timeframe: DAY,
  seed: 36,
  price: 58_000,
  volatility: 0.024,
  volume: 3e4,
});
const hourlyIndicators: TradingIndicator[] = [
  { type: "ma", period: 20 },
  { type: "volume", overlay: true },
];
// traded volume per price level of the visible bars
const hourlyProfile: TradingVolumeProfileOptions = { rows: 24 };
const dailyIndicators: TradingIndicator[] = [
  { type: "supertrend", period: 10, multiplier: 3 },
  { type: "macd", height: 50 },
];

// the order book widgets stream a simulated market (paused off screen)
function LiveDepthChart({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 5 }));
  const [book] = useState(() => feed.snapshot());
  useFeedLoop(boxRef, (elapsed) =>
    chartRef.current?.applyDeltas(feed.step(elapsed).delta),
  );
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <DepthChart
        ref={chartRef}
        book={book}
        range={0.003}
        legend={false}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveOrderBook({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 9 }));
  const [book] = useState(() => feed.snapshot());
  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <OrderBook
        ref={bookRef}
        book={book}
        rowHeight={16}
        fontSize={11}
        imbalance={false}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveOrderBookHeatmap({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // 30 s of history, then live
  const [market] = useState(() => createHistory({ seed: 25 }, 30_000));
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    heatmap.setBook(market.snapshot);
    for (const { delta, trades } of market.updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
  }, [market]);
  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = market.feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        interval={150}
        window={30_000}
        profile={false}
        bubbleSize={12}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveTimeAndSales({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // 10 s of trades, then live
  const [market] = useState(() => createHistory({ seed: 36 }, 10_000));
  const [history] = useState(() =>
    market.updates.flatMap((update) => update.trades),
  );
  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = market.feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <TimeAndSales
        ref={tapeRef}
        trades={history}
        rowHeight={16}
        fontSize={11}
        milliseconds={false}
        aggregate
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

export default function GalleryFinanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const candleSeries = useMemo(
    (): ChartSeries[] => [{ name: t("price"), data: candles }],
    [t],
  );
  const ohlcLabels = useMemo(
    () => ({
      open: t("ohlcLabels.open"),
      high: t("ohlcLabels.high"),
      low: t("ohlcLabels.low"),
      close: t("ohlcLabels.close"),
    }),
    [t],
  );

  // wheel="modifier": the page scrolls over the thumbnails, Ctrl / ⌘ + wheel zooms
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.candlestick.title")}
        component="CandlestickChart"
        page="candlestick-chart"
        description={t("cards.candlestick.description")}
      >
        <CandlestickChart
          series={candleSeries}
          tooltip={{ labels: ohlcLabels }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.candlestick.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.trading.title")}
        component="TradingChart"
        page="trading-chart"
        description={t("cards.trading.description")}
      >
        <TradingChart
          bars={hourly}
          timeframe="1H"
          symbol="BTC/USDT"
          indicators={hourlyIndicators}
          volumeProfile={hourlyProfile}
          legend={false}
          highLowMarkers={false}
          barSpacing={5}
          wheel="modifier"
          locale={locale}
          height="100%"
          ariaLabel={t("cards.trading.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.indicators.title")}
        component="TradingChart"
        page="technical-indicators"
        description={t("cards.indicators.description")}
      >
        <TradingChart
          bars={daily}
          timeframe="1D"
          symbol="BTC/USDT"
          indicators={dailyIndicators}
          legend={false}
          highLowMarkers={false}
          barSpacing={4}
          wheel="modifier"
          locale={locale}
          height="100%"
          ariaLabel={t("cards.indicators.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.depth.title")}
        component="DepthChart"
        page="depth-chart"
        description={t("cards.depth.description")}
      >
        <LiveDepthChart ariaLabel={t("cards.depth.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.orderBook.title")}
        component="OrderBook"
        page="order-book"
        description={t("cards.orderBook.description")}
      >
        <LiveOrderBook ariaLabel={t("cards.orderBook.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.orderBookHeatmap.title")}
        component="OrderBookHeatmap"
        page="order-book-heatmap"
        description={t("cards.orderBookHeatmap.description")}
      >
        <LiveOrderBookHeatmap ariaLabel={t("cards.orderBookHeatmap.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.timeSales.title")}
        component="TimeAndSales"
        page="time-and-sales"
        description={t("cards.timeSales.description")}
      >
        <LiveTimeAndSales ariaLabel={t("cards.timeSales.aria")} />
      </GalleryCard>
    </GalleryGrid>
  );
}
`})))()}var fr;function pr(){return(pr=e((()=>{fr=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ChordChart,
  DependencyGraph,
  GraphChart,
  TreeChart,
  type GraphEdge,
  type GraphGroup,
  type GraphNode,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

// microservices: [id, tier, requests per second]
const services: [string, string, number][] = [
  ["gateway", "edge", 1200],
  ["web", "edge", 640],
  ["auth", "core", 520],
  ["users", "core", 380],
  ["orders", "core", 300],
  ["payments", "core", 160],
  ["search", "core", 420],
  ["inventory", "core", 220],
  ["database", "data", 900],
  ["cache", "data", 1100],
  ["queue", "data", 260],
];
const calls: [string, string][] = [
  ["web", "gateway"],
  ["gateway", "auth"],
  ["gateway", "users"],
  ["gateway", "orders"],
  ["gateway", "search"],
  ["orders", "payments"],
  ["orders", "inventory"],
  ["orders", "queue"],
  ["auth", "cache"],
  ["users", "database"],
  ["users", "cache"],
  ["orders", "database"],
  ["search", "cache"],
  ["inventory", "database"],
  ["payments", "queue"],
];
const tiers = ["edge", "core", "data"];

// support topics and how often they show up in the same ticket
const topics = ["login", "billing", "export", "mobile", "speed", "alerts"];
const together: [string, string, number][] = [
  ["login", "mobile", 9],
  ["login", "alerts", 3],
  ["billing", "export", 5],
  ["billing", "login", 4],
  ["export", "speed", 7],
  ["mobile", "speed", 6],
  ["mobile", "alerts", 8],
  ["speed", "alerts", 2],
];

// data pipeline: [step, duration in minutes] and dependencies
const steps: [string, number][] = [
  ["extract", 12],
  ["clean", 8],
  ["enrich", 15],
  ["join", 6],
  ["train", 25],
  ["report", 4],
  ["publish", 3],
];
const needs: [string, string][] = [
  ["extract", "clean"],
  ["extract", "enrich"],
  ["clean", "join"],
  ["enrich", "join"],
  ["join", "train"],
  ["join", "report"],
  ["train", "publish"],
  ["report", "publish"],
];
// tight spacing: the box labels stay readable once the graph is fitted
const pipelineLayout = { layerGap: 28, nodeGap: 12 };

// org chart: [role, manager]
const roles: [string, string | null][] = [
  ["ceo", null],
  ["cto", "ceo"],
  ["cfo", "ceo"],
  ["coo", "ceo"],
  ["platform", "cto"],
  ["product", "cto"],
  ["finance", "cfo"],
  ["sales", "coo"],
  ["support", "coo"],
];
const orgLayout = {
  cardSize: [104, 34],
  levelGap: 28,
  siblingGap: 10,
} as const;

// mind map of a trip: branch → ideas
const trip: Record<string, string[]> = {
  transport: ["train", "rentalCar"],
  stay: ["hotel", "camping"],
  food: ["market", "restaurants"],
  activities: ["museum", "hiking", "beach"],
};
const mindMapLayout = { levelGap: 24, siblingGap: 6 };

// customers moving between plans in a quarter: row = from, column = to
const plans = ["free", "starter", "pro", "enterprise"];
const moves = [
  [0, 120, 40, 4],
  [30, 0, 90, 12],
  [10, 25, 0, 36],
  [2, 4, 14, 0],
];

export default function GalleryGraphsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const data = useMemo(() => {
    const serviceNodes: GraphNode[] = services.map(([id, tier, rps]) => ({
      id,
      label: t(\`graph.services.\${id}\`),
      group: tier,
      value: rps,
    }));
    const serviceEdges: GraphEdge[] = calls.map(([source, target]) => ({
      source,
      target,
      directed: true,
    }));
    const serviceGroups: GraphGroup[] = tiers.map((id) => ({
      id,
      name: t(\`graph.tiers.\${id}\`),
    }));
    const topicNodes: GraphNode[] = topics.map((id) => ({
      id,
      label: t(\`graph.topics.\${id}\`),
      group: id,
    }));
    const topicEdges: GraphEdge[] = together.map(([source, target, value]) => ({
      source,
      target,
      value,
    }));
    const stepNodes: GraphNode[] = steps.map(([id, minutes]) => ({
      id,
      label: t(\`graph.steps.\${id}\`),
      value: minutes,
    }));
    const stepEdges: GraphEdge[] = needs.map(([source, target]) => ({
      source,
      target,
    }));
    const roleNodes: GraphNode[] = roles.map(([id]) => ({
      id,
      label: t(\`graph.roles.\${id}\`),
    }));
    const roleEdges: GraphEdge[] = roles.flatMap(([id, manager]) =>
      manager ? [{ source: manager, target: id }] : [],
    );
    const tripNodes: GraphNode[] = [
      { id: "trip", label: t("graph.trip.trip") },
    ];
    const tripEdges: GraphEdge[] = [];
    for (const [branch, ideas] of Object.entries(trip)) {
      tripNodes.push({ id: branch, label: t(\`graph.trip.\${branch}\`) });
      tripEdges.push({ source: "trip", target: branch });
      for (const idea of ideas) {
        tripNodes.push({ id: idea, label: t(\`graph.trip.\${idea}\`) });
        tripEdges.push({ source: branch, target: idea });
      }
    }
    const planNames = plans.map((id) => t(\`graph.plans.\${id}\`));
    return {
      serviceNodes,
      serviceEdges,
      serviceGroups,
      topicNodes,
      topicEdges,
      stepNodes,
      stepEdges,
      roleNodes,
      roleEdges,
      tripNodes,
      tripEdges,
      planNames,
    };
  }, [t]);

  const customers = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("customers", { value: number.format(value) });
  }, [t, locale]);

  // controls={false}: no zoom buttons in the thumbnails (Ctrl / ⌘ + wheel still zooms);
  // nodeLabels: labels even when the graph is zoomed out to fit
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.network.title")}
        component="GraphChart"
        page="graph-chart"
        description={t("cards.network.description")}
      >
        <GraphChart
          nodes={data.serviceNodes}
          edges={data.serviceEdges}
          groups={data.serviceGroups}
          nodeSize={[10, 24]}
          edgeColor="source"
          force={{ linkDistance: 50, charge: -260 }}
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.network.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.arc.title")}
        component="GraphChart"
        page="graph-chart"
        description={t("cards.arc.description")}
      >
        <GraphChart
          nodes={data.topicNodes}
          edges={data.topicEdges}
          layout="arc"
          edgeColor="source"
          edgeWidth={[1, 5]}
          edgeLabels={false}
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.arc.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.dag.title")}
        component="DependencyGraph"
        page="dependency-graph"
        description={t("cards.dag.description")}
      >
        <DependencyGraph
          nodes={data.stepNodes}
          edges={data.stepEdges}
          direction="LR"
          edgeStyle="orthogonal"
          criticalPath
          dag={pipelineLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.dag.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.org.title")}
        component="TreeChart"
        page="tree-chart"
        description={t("cards.org.description")}
      >
        <TreeChart
          nodes={data.roleNodes}
          edges={data.roleEdges}
          layout="org"
          tree={orgLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.org.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.mindMap.title")}
        component="TreeChart"
        page="tree-chart"
        description={t("cards.mindMap.description")}
      >
        <TreeChart
          nodes={data.tripNodes}
          edges={data.tripEdges}
          layout="mindmap"
          tree={mindMapLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.mindMap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.chord.title")}
        component="ChordChart"
        page="chord-chart"
        description={t("cards.chord.description")}
      >
        <ChordChart
          groups={data.planNames}
          matrix={moves}
          directed
          format={customers}
          legend={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.chord.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
`})))()}var mr;function hr(){return(hr=e((()=>{mr=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  FunnelChart,
  PieChart,
  QuadrantChart,
  RadarChart,
  SankeyChart,
  SunburstChart,
  TreemapChart,
  type QuadrantPoint,
  type QuadrantRegions,
  type RadarIndicator,
  type RadarSeries,
  type SankeyLink,
  type SankeyNode,
  type ShapeDatum,
  type TreemapNode,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

const browsers: ShapeDatum[] = [
  { name: "Chrome", value: 64 },
  { name: "Safari", value: 19 },
  { name: "Edge", value: 9 },
  { name: "Firefox", value: 8 },
];

type Unit = [key: string, headcount: number | Unit[]];
// headcount per department and team
const org: Unit[] = [
  [
    "engineering",
    [
      ["platform", 18],
      ["web", 24],
      ["mobile", 16],
    ],
  ],
  [
    "sales",
    [
      ["emea", 22],
      ["americas", 31],
    ],
  ],
  [
    "operations",
    [
      ["support", 26],
      ["finance", 8],
    ],
  ],
];

// visits from each source to the site, then sign-ups or exits (thousands)
const flowNodes = ["search", "social", "email", "site", "signedUp", "left"];
const flowLinks: SankeyLink[] = [
  { source: 0, target: 3, value: 52 },
  { source: 1, target: 3, value: 31 },
  { source: 2, target: 3, value: 17 },
  { source: 3, target: 4, value: 23 },
  { source: 3, target: 5, value: 77 },
];

export default function GalleryRelationsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      number: (value: number) => number.format(value),
      compact: (value: number) => compact.format(value),
      percent: (share: number) => percent.format(share),
      // values given in percent (64 = 64%)
      percentOf100: (value: number) => percent.format(value / 100),
    };
  }, [locale]);

  const data = useMemo(() => {
    const plans: ShapeDatum[] = [
      { name: t("plans.free"), value: 5400 },
      { name: t("plans.pro"), value: 2100 },
      { name: t("plans.team"), value: 860 },
    ];
    const criteria: RadarIndicator[] = [
      "speed",
      "quality",
      "cost",
      "support",
      "scale",
    ].map((key) => ({ name: t(\`criteria.\${key}\`), max: 10 }));
    const vendors: RadarSeries[] = [
      { name: t("vendor", { name: "A" }), values: [8, 6, 7, 5, 9] },
      { name: t("vendor", { name: "B" }), values: [5, 9, 6, 8, 6] },
    ];
    const stages: ShapeDatum[] = [
      { name: t("stages.visited"), value: 12000 },
      { name: t("stages.signedUp"), value: 4800 },
      { name: t("stages.activated"), value: 2600 },
      { name: t("stages.paid"), value: 900 },
    ];
    const tasks: QuadrantPoint[] = [
      { x: 8, y: 8.5, label: t("tasks.release") },
      { x: 3, y: 7.5, label: t("tasks.roadmap") },
      { x: 7, y: 3, label: t("tasks.emails") },
      { x: 2, y: 2, label: t("tasks.cleanup") },
    ];
    const regions: QuadrantRegions = {
      topLeft: { label: t("quadrants.plan") },
      topRight: { label: t("quadrants.doFirst") },
      bottomLeft: { label: t("quadrants.drop") },
      bottomRight: { label: t("quadrants.delegate") },
    };
    const budget: TreemapNode[] = [
      {
        name: t("budget.product"),
        children: [
          { name: t("budget.design"), value: 18 },
          { name: t("budget.engineering"), value: 42 },
        ],
      },
      {
        name: t("budget.goToMarket"),
        children: [
          { name: t("budget.sales"), value: 24 },
          { name: t("budget.marketing"), value: 16 },
        ],
      },
    ];
    const toNodes = (units: Unit[]): TreemapNode[] =>
      units.map(([key, size]) =>
        typeof size === "number"
          ? { name: t(\`org.\${key}\`), value: size }
          : { name: t(\`org.\${key}\`), children: toNodes(size) },
      );
    const nodes: SankeyNode[] = flowNodes.map((key) => ({
      name: t(\`flow.\${key}\`),
    }));
    return {
      plans,
      criteria,
      vendors,
      stages,
      tasks,
      regions,
      budget,
      org: toNodes(org),
      nodes,
    };
  }, [t]);

  const people = useMemo(() => (value: number) => t("people", { value }), [t]);
  const thousands = useMemo(
    () => (value: number) => formats.compact(value * 1000),
    [formats],
  );

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.pie.title")}
        component="PieChart"
        page="pie-chart"
        description={t("cards.pie.description")}
      >
        <PieChart
          data={browsers}
          height="100%"
          legend={false}
          format={formats.percentOf100}
          percentFormat={formats.percent}
          ariaLabel={t("cards.pie.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.donut.title")}
        component="DonutChart"
        page="pie-chart"
        description={t("cards.donut.description")}
      >
        <DonutChart
          data={data.plans}
          height="100%"
          labels="none"
          centerValue={formats.compact(8360)}
          centerLabel={t("users")}
          legend={{ position: "bottom" }}
          format={formats.number}
          percentFormat={formats.percent}
          ariaLabel={t("cards.donut.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.radar.title")}
        component="RadarChart"
        page="radar-chart"
        description={t("cards.radar.description")}
      >
        <RadarChart
          indicators={data.criteria}
          series={data.vendors}
          height="100%"
          legend={false}
          format={formats.number}
          ariaLabel={t("cards.radar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.funnel.title")}
        component="FunnelChart"
        page="funnel-chart"
        description={t("cards.funnel.description")}
      >
        <FunnelChart
          data={data.stages}
          height="100%"
          legend={false}
          format={formats.compact}
          percentFormat={formats.percent}
          ariaLabel={t("cards.funnel.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.quadrant.title")}
        component="QuadrantChart"
        page="quadrant-chart"
        description={t("cards.quadrant.description")}
      >
        <QuadrantChart
          points={data.tasks}
          quadrants={data.regions}
          showTicks={false}
          xLabel={t("urgency")}
          yLabel={t("importance")}
          height="100%"
          ariaLabel={t("cards.quadrant.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.treemap.title")}
        component="TreemapChart"
        page="treemap-chart"
        description={t("cards.treemap.description")}
      >
        <TreemapChart
          data={data.budget}
          height="100%"
          format={formats.percentOf100}
          percentFormat={formats.percent}
          ariaLabel={t("cards.treemap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sunburst.title")}
        component="SunburstChart"
        page="sunburst-chart"
        description={t("cards.sunburst.description")}
      >
        <SunburstChart
          data={data.org}
          innerRadius={0.3}
          format={people}
          percentFormat={formats.percent}
          height="100%"
          ariaLabel={t("cards.sunburst.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sankey.title")}
        component="SankeyChart"
        page="sankey-chart"
        description={t("cards.sankey.description")}
      >
        <SankeyChart
          nodes={data.nodes}
          links={flowLinks}
          format={thousands}
          linkColor="source"
          nodeWidth={8}
          height="100%"
          ariaLabel={t("cards.sankey.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
`})))()}var gr;function _r(){return(_r=e((()=>{gr=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  BulletChart,
  CalendarHeatmap,
  GanttChart,
  GaugeChart,
  HeatmapChart,
  HistogramChart,
  RadialBarChart,
  WaterfallChart,
  type BoxplotGroup,
  type BulletDatum,
  type CalendarDatum,
  type GanttTask,
  type HeatmapCell,
  type RadialBarDatum,
  type WaterfallStep,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
/** Log-normal samples around a median (Box-Muller) */
const logNormal = (seed: number, median: number, spread: number, n: number) => {
  const next = random(seed);
  return Float64Array.from({ length: n }, () => {
    const z =
      Math.sqrt(-2 * Math.log(next() || 1e-9)) * Math.cos(2 * Math.PI * next());
    return median * Math.exp(spread * z);
  });
};

// response times (ms) of all the requests, then per service
const latencies = logNormal(1, 60, 0.45, 5000);
const services = [
  ["gateway", 20, 0.35],
  ["search", 90, 0.45],
  ["checkout", 140, 0.38],
  ["images", 60, 0.6],
] as const;
const serviceSamples = services.map(([, median, spread], i) =>
  logNormal(10 + i, median, spread, 400),
);

// annual recurring revenue bridge (M$), from last year to this year
const bridge = [
  ["lastYear", "subtotal"],
  ["newCustomers", 38],
  ["expansion", 17],
  ["churn", -21],
  ["pricing", 9],
  ["thisYear", "total"],
] as const;

// load per weekday (Monday first) and 4-hour slot
const load = (() => {
  const next = random(3);
  return Array.from({ length: 7 }, (_, d) =>
    Array.from({ length: 6 }, (_, s) =>
      Math.round((d < 5 ? 40 : 15) + (s >= 2 && s <= 4 ? 40 : 0) + next() * 20),
    ),
  );
})();

// commits per day over 20 weeks (local dates, quiet weekends)
const commits: CalendarDatum[] = (() => {
  const next = random(11);
  const days: CalendarDatum[] = [];
  for (let i = 0; i < 140; i++) {
    const date = new Date(2026, 5, 1 + i);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    if (next() < (weekend ? 0.2 : 0.85)) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      days.push({
        date: \`\${date.getFullYear()}-\${month}-\${day}\`,
        value: 1 + Math.round(next() * (weekend ? 3 : 9)),
      });
    }
  }
  return days;
})();

const gaugeBands = [
  { to: 60, color: "var(--danger-color)" },
  { to: 85, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

// quarter-to-date KPIs: poor / fair / good ranges and the target
const kpis = [
  { key: "revenue", value: 270, target: 250, ranges: [150, 225, 300] },
  { key: "profit", value: 22, target: 26, ranges: [15, 22, 30] },
  { key: "satisfaction", value: 4.6, target: 4.4, ranges: [3.5, 4.2, 5] },
] as const;

// quarterly objectives: progress against each goal
const objectives = [
  ["revenue", 82, 100],
  ["users", 64, 100],
  ["retention", 91, 100],
] as const;

// a release plan (local dates)
const plan = [
  ["research", 1, 6, 1],
  ["design", 5, 13, 1],
  ["build", 10, 27, 0.6],
  ["test", 22, 31, 0.2],
] as const;
const today = new Date(2026, 10, 18);

export default function GalleryStatisticsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      number: (value: number) => number.format(Math.round(value)),
      ms: (value: number) => ms.format(value),
      // values in millions of dollars
      millions: (value: number) => usd.format(value * 1e6),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const data = useMemo(() => {
    const groups: BoxplotGroup[] = services.map(([key], i) => ({
      x: t(\`services.\${key}\`),
      values: serviceSamples[i],
    }));
    const steps: WaterfallStep[] = bridge.map(([key, value]) =>
      typeof value === "number"
        ? { label: t(\`bridge.\${key}\`), value }
        : { label: t(\`bridge.\${key}\`), kind: value },
    );
    const dayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // 5 January 2026 is a Monday
    const days = load.map((_, d) => dayFormat.format(new Date(2026, 0, 5 + d)));
    const hourFormat = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const slots = load[0].map((_, s) =>
      hourFormat.format(new Date(2026, 0, 5, s * 4)),
    );
    const cells: HeatmapCell[] = days.flatMap((day, d) =>
      slots.map((slot, s) => ({ x: day, y: slot, value: load[d][s] })),
    );
    const bullets: BulletDatum[] = kpis.map(({ key, ...kpi }) => ({
      name: t(\`kpis.\${key}\`),
      ...kpi,
      ranges: [...kpi.ranges],
    }));
    const rings: RadialBarDatum[] = objectives.map(([key, value, max]) => ({
      name: t(\`objectives.\${key}\`),
      value,
      max,
    }));
    const tasks: GanttTask[] = plan.map(([key, start, end, progress]) => ({
      name: t(\`plan.\${key}\`),
      start: new Date(2026, 10, start),
      end: new Date(2026, 10, end),
      progress,
    }));
    return { groups, steps, days, slots, cells, bullets, rings, tasks };
  }, [t, locale]);

  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );
  const boxLabels = useMemo(
    () => ({
      max: t("stats.max"),
      q3: t("stats.q3"),
      median: t("stats.median"),
      q1: t("stats.q1"),
      min: t("stats.min"),
      outliers: t("stats.outliers"),
    }),
    [t],
  );

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.histogram.title")}
        component="HistogramChart"
        page="histogram-chart"
        description={t("cards.histogram.description")}
      >
        <HistogramChart
          values={latencies}
          domain={[0, 200]}
          bins={40}
          name={t("requests")}
          formatBin={formats.ms}
          xAxis={{ format: formats.ms }}
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.histogram.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.boxplot.title")}
        component="BoxPlotChart"
        page="boxplot-chart"
        description={t("cards.boxplot.description")}
      >
        <BoxPlotChart
          groups={data.groups}
          name={t("responseTime")}
          yAxis={{ format: formats.ms }}
          tooltip={{ labels: boxLabels }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.boxplot.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.waterfall.title")}
        component="WaterfallChart"
        page="waterfall-chart"
        description={t("cards.waterfall.description")}
      >
        <WaterfallChart
          steps={data.steps}
          start={120}
          name={t("amount")}
          format={formats.millions}
          yAxis={{ format: formats.millions }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.waterfall.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.heatmap.title")}
        component="HeatmapChart"
        page="heatmap-chart"
        description={t("cards.heatmap.description")}
      >
        <HeatmapChart
          data={data.cells}
          xCategories={data.days}
          yCategories={data.slots}
          name={t("load")}
          radius={2}
          height="100%"
          ariaLabel={t("cards.heatmap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.calendar.title")}
        component="CalendarHeatmap"
        page="calendar-heatmap"
        description={t("cards.calendar.description")}
      >
        <CalendarHeatmap
          data={commits}
          range={["2026-06-01", "2026-10-18"]}
          locale={locale}
          format={formats.number}
          height="100%"
          ariaLabel={t("cards.calendar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.gauge.title")}
        component="GaugeChart"
        page="gauge-chart"
        description={t("cards.gauge.description")}
      >
        <GaugeChart
          value={78}
          label={t("uptimeScore")}
          bands={gaugeBands}
          format={formats.number}
          tooltip={false}
          height="100%"
          ariaLabel={t("uptimeScore")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bullet.title")}
        component="BulletChart"
        page="bullet-chart"
        description={t("cards.bullet.description")}
      >
        <BulletChart
          data={data.bullets}
          rangeLabels={rangeLabels}
          percentFormat={formats.percent}
          height="100%"
          ariaLabel={t("cards.bullet.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.radialBar.title")}
        component="RadialBarChart"
        page="radial-bar-chart"
        description={t("cards.radialBar.description")}
      >
        <RadialBarChart
          data={data.rings}
          sweep={270}
          innerRadius={0.3}
          percentFormat={formats.percent}
          legend={false}
          height="100%"
          ariaLabel={t("cards.radialBar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.gantt.title")}
        component="GanttChart"
        page="gantt-chart"
        description={t("cards.gantt.description")}
      >
        <GanttChart
          tasks={data.tasks}
          today={today}
          todayLabel={t("today")}
          taskName={t("taskName")}
          progressName={t("progress")}
          height="100%"
          legend={false}
          ariaLabel={t("cards.gantt.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
`})))()}var vr;function yr(){return(yr=e((()=>{vr=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  BarChart,
  BubbleChart,
  HorizontalBarChart,
  LineChart,
  MixedChart,
  RangeAreaChart,
  ScatterChart,
  Sparkline,
  type ChartSeries,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

// The numbers live at module level; the names are translated in the
// component (memoized, so the charts only update when the language changes)

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const visits = [32, 41, 38, 52, 49, 61, 66, 72];
const signups = [12, 15, 19, 18, 24, 27, 26, 34];
const platforms = {
  web: [20, 24, 22, 30, 34, 31, 38, 42],
  ios: [12, 14, 18, 17, 20, 24, 23, 27],
  android: [8, 11, 10, 14, 16, 15, 19, 22],
};
// average daily low and high of each month (°C)
const lows = [-1, 0, 3, 6, 10, 13, 15, 15, 12, 8, 4, 1];
const highs = [5, 7, 12, 16, 20, 24, 26, 26, 21, 16, 10, 6];
const orders = [128, 164, 212, 187];
// share of developers using each language (%)
const languages: [string, number][] = [
  ["JavaScript", 62],
  ["Python", 51],
  ["TypeScript", 43],
  ["Java", 30],
  ["Go", 18],
];
// quarterly revenue (M$) and growth over the previous quarter
const quarterRevenue = [18, 21, 24, 31];
const growth = [0.04, 0.17, 0.14, 0.29];

const scatterGroups = (() => {
  const next = random(7);
  const group = (cx: number, cy: number) =>
    Array.from({ length: 40 }, () => ({
      x: cx + (next() - 0.5) * 30,
      y: cy + (next() - 0.5) * 30,
    }));
  return [group(35, 60), group(65, 35)];
})();

// marketing campaigns: cost (k$), sign-ups and reach (people)
const campaigns = {
  email: [
    [4, 320, 12_000],
    [6, 410, 18_000],
    [9, 380, 15_000],
  ],
  social: [
    [12, 520, 90_000],
    [18, 760, 140_000],
    [25, 690, 210_000],
  ],
} as const;

const revenueTrend = [18, 22, 19, 26, 24, 31, 29, 35, 33, 41, 38, 46];
const errorTrend = [9, 7, 8, 5, 6, 4, 5, 3, 4, 2, 3, 2];

export default function GalleryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    const celsius = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
    });
    return {
      number: (value: number) => number.format(value),
      // values in millions of dollars
      millions: (value: number) => usd.format(value * 1e6),
      thousands: (value: number) => usd.format(value * 1e3),
      percent: (value: number) => percent.format(value),
      // values given in percent (62 = 62%)
      percentOf100: (value: number) => percent.format(value / 100),
      celsius: (value: number) => celsius.format(value),
    };
  }, [locale]);

  const data = useMemo(() => {
    // "Jan", "janv.", "1月"...
    const monthFormat = new Intl.DateTimeFormat(locale, { month: "short" });
    const months = lows.map((_, m) => monthFormat.format(new Date(2026, m, 1)));
    const pairs = (values: readonly number[]) =>
      values.map((value, i) => [months[i], value] as const);
    const quarters = quarterRevenue.map((_, i) => t("quarter", { n: i + 1 }));

    const line: ChartSeries[] = [
      { name: t("visits"), data: pairs(visits) },
      { name: t("signups"), data: pairs(signups) },
    ];
    const area: ChartSeries[] = [
      { name: t("web"), data: pairs(platforms.web) },
      { name: "iOS", data: pairs(platforms.ios) },
      { name: "Android", data: pairs(platforms.android) },
    ];
    const rangeArea: ChartSeries[] = [
      {
        name: t("temperature"),
        format: formats.celsius,
        data: months.map((x, i) => ({ x, y0: lows[i], y: highs[i] })),
      },
    ];
    const bar: ChartSeries[] = [
      {
        name: t("orders"),
        data: orders.map((y, i) => ({
          x: quarters[i],
          y,
          color: i === 2 ? "var(--success-color)" : undefined,
        })),
      },
    ];
    const horizontalBar: ChartSeries[] = [
      { name: t("developers"), format: formats.percentOf100, data: languages },
    ];
    const mixed: ChartSeries[] = [
      {
        name: t("revenue"),
        type: "bar",
        format: formats.millions,
        data: quarters.map((q, i) => [q, quarterRevenue[i]] as const),
      },
      {
        name: t("growth"),
        type: "line",
        yAxis: "right",
        format: formats.percent,
        color: "var(--chart-series-3, #f59e0b)",
        data: quarters.map((q, i) => [q, growth[i]] as const),
      },
    ];
    const scatter: ChartSeries[] = scatterGroups.map((group, i) => ({
      name: t("team", { name: i === 0 ? "A" : "B" }),
      data: group,
    }));
    const bubble: ChartSeries[] = (["email", "social"] as const).map(
      (channel) => ({
        name: t(\`channels.\${channel}\`),
        valueName: t("reach"),
        format: (value: number) => formats.number(value),
        data: campaigns[channel].map(([x, y, value]) => ({ x, y, value })),
      }),
    );
    return {
      line,
      area,
      rangeArea,
      bar,
      horizontalBar,
      mixed,
      scatter,
      bubble,
    };
  }, [t, locale, formats]);

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.line.title")}
        component="LineChart"
        page="line-chart"
        description={t("cards.line.description")}
      >
        <LineChart
          series={data.line}
          height="100%"
          legend={false}
          ariaLabel={t("cards.line.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.area.title")}
        component="AreaChart"
        page="area-chart"
        description={t("cards.area.description")}
      >
        <AreaChart
          series={data.area}
          stacked
          height="100%"
          legend={false}
          ariaLabel={t("cards.area.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.rangeArea.title")}
        component="RangeAreaChart"
        page="range-area-chart"
        description={t("cards.rangeArea.description")}
      >
        <RangeAreaChart
          series={data.rangeArea}
          yAxis={{ format: formats.celsius }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.rangeArea.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bar.title")}
        component="BarChart"
        page="bar-chart"
        description={t("cards.bar.description")}
      >
        <BarChart
          series={data.bar}
          labels
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.bar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.horizontalBar.title")}
        component="HorizontalBarChart"
        page="horizontal-bar-chart"
        description={t("cards.horizontalBar.description")}
      >
        <HorizontalBarChart
          series={data.horizontalBar}
          labels
          yAxis={{ format: formats.percentOf100 }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.horizontalBar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.mixed.title")}
        component="MixedChart"
        page="mixed-chart"
        description={t("cards.mixed.description")}
      >
        <MixedChart
          series={data.mixed}
          yAxis={{ format: formats.millions }}
          yAxis2={{ format: formats.percent }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.mixed.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.scatter.title")}
        component="ScatterChart"
        page="scatter-chart"
        description={t("cards.scatter.description")}
      >
        <ScatterChart
          series={data.scatter}
          height="100%"
          legend={false}
          ariaLabel={t("cards.scatter.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bubble.title")}
        component="BubbleChart"
        page="bubble-chart"
        description={t("cards.bubble.description")}
      >
        <BubbleChart
          series={data.bubble}
          maxSize={36}
          xAxis={{ format: formats.thousands }}
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.bubble.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sparkline.title")}
        component="Sparkline"
        page="sparkline"
        description={t("cards.sparkline.description")}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <strong style={{ fontSize: 22 }}>{formats.thousands(46)}</strong>{" "}
            {t("revenueLabel")}
            <Sparkline
              data={revenueTrend}
              type="area"
              reference={30}
              name={t("revenueLabel")}
              format={formats.thousands}
              ariaLabel={t("revenueTrendAria")}
            />
          </div>
          <div>
            <strong style={{ fontSize: 22 }}>{formats.number(2)}</strong>{" "}
            {t("errorsLabel")}
            <Sparkline
              data={errorTrend}
              type="bar"
              name={t("errorsLabel")}
              color="var(--danger-color)"
              ariaLabel={t("errorsTrendAria")}
            />
          </div>
        </div>
      </GalleryCard>
    </GalleryGrid>
  );
}
`})))()}var br;function xr(){return(xr=e((()=>{br=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chart, type ChartSeries } from "minerva-design/charts";

// Thousand USD per month, January to December
const revenue = [42, 48, 51, 47, 58, 63, 61, 70, 74, 69, 81, 92];
const target = [45, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function MixedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("revenue"),
        type: "bar",
        data: months.map((month, i) => [month, revenue[i]] as const),
      },
      {
        name: t("target"),
        type: "line",
        data: months.map((month, i) => [month, target[i]] as const),
      },
    ];
  }, [t, locale]);
  // "$92K", "9.2万 US$"...
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <Chart
      series={series}
      yAxis={{ format: usd }}
      legend={{ position: "bottom" }}
      height={300}
      ariaLabel={t("revenueAria")}
    />
  );
}
`})))()}var Sr;function Cr(){return(Cr=e((()=>{Sr=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  BarChart,
  DonutChart,
  type ChartSeries,
  type ShapeDatum,
} from "minerva-design/charts";

// Palettes: undefined = the theme (--chart-series-1..8, then theme colors)
const PALETTES = {
  theme: undefined,
  // Okabe-Ito: distinguishable with the common color vision deficiencies
  colorblind: ["#0072B2", "#E69F00", "#009E73", "#CC79A7", "#56B4E9"],
  blues: ["#08306b", "#2171b5", "#4292c6", "#6baed6", "#9ecae1"],
  warm: ["#7f1d1d", "#c2410c", "#f59e0b", "#facc15", "#fde68a"],
} as const;
type PaletteName = keyof typeof PALETTES;

// Support requests per quarter by channel
const channels = {
  email: [420, 380, 410, 360],
  chat: [310, 360, 420, 480],
  phone: [180, 170, 150, 140],
  social: [60, 80, 95, 120],
  community: [40, 55, 70, 90],
};
type Channel = keyof typeof channels;

export default function PaletteDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const [name, setName] = useState<PaletteName>("colorblind");
  const palette = PALETTES[name];

  const { bars, shares } = useMemo(() => {
    const keys = Object.keys(channels) as Channel[];
    const bars: ChartSeries[] = keys.map((key) => ({
      name: t(\`channels.\${key}\`),
      data: channels[key].map(
        (y, i) => [t("quarter", { n: i + 1 }), y] as const,
      ),
    }));
    const shares: ShapeDatum[] = keys.map((key) => ({
      name: t(\`channels.\${key}\`),
      value: channels[key].reduce((sum, v) => sum + v, 0),
    }));
    return { bars, shares };
  }, [t]);
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("palette")}
        direction="horizontal"
        value={name}
        onChange={(value) => setName(value as PaletteName)}
      >
        {(Object.keys(PALETTES) as PaletteName[]).map((key) => (
          <Radio key={key} value={key} label={t(\`palettes.\${key}\`)} />
        ))}
      </RadioGroup>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <BarChart
          series={bars}
          stacked
          palette={palette}
          legend={{ position: "bottom" }}
          height={280}
          ariaLabel={t("requestsAria")}
        />
        <DonutChart
          data={shares}
          palette={palette}
          labels="none"
          legend={{ position: "bottom" }}
          renderTooltip={(slice) => (
            <span>
              {slice.name} · {percent.format(slice.percent)}
            </span>
          )}
          height={280}
          ariaLabel={t("channelsAria")}
        />
      </div>
    </div>
  );
}
`})))()}var wr;function Tr(){return(Tr=e((()=>{wr=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartRendererKind,
  type ChartRendererPreference,
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

export default function RenderersDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.charts.data" });
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [active, setActive] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(7);
    const y = new Float64Array(COUNT);
    let value = 0;
    for (let i = 0; i < COUNT; i++) {
      value += random() - 0.5;
      y[i] = value;
    }
    return [{ name: t("randomWalk"), data: { y } }];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("renderer")}
        direction="horizontal"
        value={renderer}
        onChange={(value) => setRenderer(value as ChartRendererPreference)}
      >
        <Radio value="auto" label="auto" />
        <Radio value="webgpu" label="webgpu" />
        <Radio value="webgl2" label="webgl2" />
        <Radio value="webgl" label="webgl" />
        <Radio value="canvas2d" label="canvas2d" />
      </RadioGroup>
      <Chart
        series={series}
        renderer={renderer}
        onRendererChange={setActive}
        height={280}
        ariaLabel={t("randomWalkAria")}
      />
      <p role="status">
        {t("rendererStatus", { requested: renderer, active: active ?? "…" })}
      </p>
    </div>
  );
}
`})))()}var $,Er,Dr;function Or(){return(Or=e((()=>{_t(),St(),Nt(),Gt(),sn(),pn(),En(),Hn(),Yn(),$n(),rr(),ar(),sr(),lr(),dr(),pr(),hr(),_r(),yr(),xr(),Cr(),Tr(),t(),o(),c(),r(),fe(),ue(),me(),$=n(),Er=de(Object.assign({"./demos/annotations.tsx":pt,"./demos/dashboard.tsx":yt,"./demos/gallery-3d.tsx":wt,"./demos/gallery-finance.tsx":Rt,"./demos/gallery-graphs.tsx":Kt,"./demos/gallery-relations.tsx":cn,"./demos/gallery-statistics.tsx":mn,"./demos/gallery.tsx":Dn,"./demos/mixed.tsx":Un,"./demos/palette.tsx":Xn,"./demos/renderers.tsx":tr}),Object.assign({"./demos/annotations.tsx":ir,"./demos/dashboard.tsx":or,"./demos/gallery-3d.tsx":cr,"./demos/gallery-finance.tsx":ur,"./demos/gallery-graphs.tsx":fr,"./demos/gallery-relations.tsx":mr,"./demos/gallery-statistics.tsx":gr,"./demos/gallery.tsx":vr,"./demos/mixed.tsx":br,"./demos/palette.tsx":Sr,"./demos/renderers.tsx":wr})),Dr=()=>{let{t:e}=s(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`chart-families`,children:[(0,$.jsx)(`h2`,{id:`chart-families`,children:e(`docs.charts.intro.families.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.families.text`)}),(0,$.jsxs)(`ul`,{className:p.prose,children:[(0,$.jsx)(`li`,{children:(0,$.jsx)(a,{i18nKey:`docs.charts.intro.families.basic`,components:{line:(0,$.jsx)(i,{to:`/line-chart`}),area:(0,$.jsx)(i,{to:`/area-chart`}),rangeArea:(0,$.jsx)(i,{to:`/range-area-chart`}),bar:(0,$.jsx)(i,{to:`/bar-chart`}),horizontalBar:(0,$.jsx)(i,{to:`/horizontal-bar-chart`}),mixed:(0,$.jsx)(i,{to:`/mixed-chart`}),scatter:(0,$.jsx)(i,{to:`/scatter-chart`}),bubble:(0,$.jsx)(i,{to:`/bubble-chart`}),sparkline:(0,$.jsx)(i,{to:`/sparkline`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(a,{i18nKey:`docs.charts.intro.families.statistics`,components:{histogram:(0,$.jsx)(i,{to:`/histogram-chart`}),boxplot:(0,$.jsx)(i,{to:`/boxplot-chart`}),waterfall:(0,$.jsx)(i,{to:`/waterfall-chart`}),heatmap:(0,$.jsx)(i,{to:`/heatmap-chart`}),calendar:(0,$.jsx)(i,{to:`/calendar-heatmap`}),gauge:(0,$.jsx)(i,{to:`/gauge-chart`}),bullet:(0,$.jsx)(i,{to:`/bullet-chart`}),radialBar:(0,$.jsx)(i,{to:`/radial-bar-chart`}),gantt:(0,$.jsx)(i,{to:`/gantt-chart`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(a,{i18nKey:`docs.charts.intro.families.relations`,components:{pie:(0,$.jsx)(i,{to:`/pie-chart`}),radar:(0,$.jsx)(i,{to:`/radar-chart`}),funnel:(0,$.jsx)(i,{to:`/funnel-chart`}),quadrant:(0,$.jsx)(i,{to:`/quadrant-chart`}),treemap:(0,$.jsx)(i,{to:`/treemap-chart`}),sunburst:(0,$.jsx)(i,{to:`/sunburst-chart`}),sankey:(0,$.jsx)(i,{to:`/sankey-chart`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(a,{i18nKey:`docs.charts.intro.families.graphs`,components:{network:(0,$.jsx)(i,{to:`/graph-chart`}),dag:(0,$.jsx)(i,{to:`/dependency-graph`}),tree:(0,$.jsx)(i,{to:`/tree-chart`}),chord:(0,$.jsx)(i,{to:`/chord-chart`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(a,{i18nKey:`docs.charts.intro.families.finance`,components:{candlestick:(0,$.jsx)(i,{to:`/candlestick-chart`}),trading:(0,$.jsx)(i,{to:`/trading-chart`}),indicators:(0,$.jsx)(i,{to:`/technical-indicators`}),depth:(0,$.jsx)(i,{to:`/depth-chart`}),orderBook:(0,$.jsx)(i,{to:`/order-book`}),orderBookHeatmap:(0,$.jsx)(i,{to:`/order-book-heatmap`}),timeSales:(0,$.jsx)(i,{to:`/time-and-sales`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(a,{i18nKey:`docs.charts.intro.families.threeD`,components:{scatter:(0,$.jsx)(i,{to:`/scatter-3d-chart`}),surface:(0,$.jsx)(i,{to:`/surface-3d-chart`}),bar:(0,$.jsx)(i,{to:`/bar-3d-chart`})}})})]}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.families.lazy`)}),(0,$.jsx)(`p`,{className:p.prose,children:(0,$.jsx)(a,{i18nKey:`docs.charts.intro.families.fallback`,components:{engine:(0,$.jsx)(i,{to:`/chart-engine`}),performance:(0,$.jsx)(i,{to:`/chart-performance`})}})})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`chart-rendering`,children:[(0,$.jsx)(`h2`,{id:`chart-rendering`,children:e(`docs.charts.intro.rendering.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.rendering.text`)}),(0,$.jsxs)(`ul`,{className:p.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.background`)}),(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.data`)}),(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.labels`)}),(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.dom`)})]})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`chart-large-data`,children:[(0,$.jsx)(`h2`,{id:`chart-large-data`,children:e(`docs.charts.intro.largeData.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.largeData.text`)})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`chart-interaction`,children:[(0,$.jsx)(`h2`,{id:`chart-interaction`,children:e(`docs.charts.intro.interaction.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.interaction.pointer`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.interaction.keyboard`)})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`chart-theming`,children:[(0,$.jsx)(`h2`,{id:`chart-theming`,children:e(`docs.charts.intro.theming.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.theming.text`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.charts.intro.theming.core`)})]})]});return(0,$.jsx)(pe,{id:`charts`,demos:Er,intro:t})}})))()}Or();export{Dr as default};