import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{i as a,m as o,p as s,r as c}from"./DemoBlock-BJ0_y9F8.js";import{n as l,t as u}from"./useTranslation-BzoVi22c.js";import{a as ee,i as te,n as ne,r as re,s as ie,t as ae}from"./Card-BqfTCY3r.js";import{i as oe,n as se,r as ce,t as d}from"./Radio-DnNachfg.js";import{n as le,t as ue}from"./Skeleton-BV8byJJj.js";import{n as de,t as fe}from"./TextLink-BirPJ505.js";import{l as pe,n as me,t as he,u as ge}from"./DocPage-B2iACtLP.js";import{_ as _e,a as ve,c as ye,d as be,f as xe,g as Se,h as Ce,i as we,l as Te,m as f,n as Ee,o as De,p as Oe,r as p,s as ke,t as m,u as Ae,v as je,y as h}from"./charts-eaEG_eJd.js";import{a as Me,c as Ne,d as Pe,f as g,i as Fe,l as Ie,n as Le,o as Re,r as ze,s as _,t as Be,u as Ve}from"./shapes-s9T5lCRi.js";import{a as v,c as He,l as Ue,n as We,s as Ge,t as Ke}from"./data-CPr3f9Xw.js";import{a as y,c as qe,l as Je,n as Ye,o as Xe,r as Ze,s as Qe,t as $e,u as et}from"./feed-6-CmBDu_.js";import{a as tt,i as nt,n as rt,r as it,t as at}from"./three-d-nENKeh9v.js";function ot(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function st(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0}),[n]),i=(0,b.useMemo)(()=>[{name:e(`p95`),data:ut}],[e]),a=(0,b.useMemo)(()=>[{type:`rect`,y0:80,y1:150,color:`var(--success-color)`,label:e(`normalRange`)},{type:`rect`,x0:70,x1:82,color:`var(--warning-color)`,opacity:.12,label:e(`deploy`),labelPosition:`top-right`},{type:`line`,axis:`y`,value:200,color:`var(--danger-color)`,dash:[4,4],label:e(`slo`,{value:r.format(200)})}],[e,r]);return(0,ct.jsx)(h,{series:i,annotations:a,xAxis:{title:e(`minutes`)},yAxis:{min:0,max:260,format:e=>r.format(e)},height:300,ariaLabel:e(`latencyAria`)})}var b,ct,lt,ut;function dt(){return(dt=e((()=>{b=t(),u(),je(),ct=n(),lt=ot(42),ut=Array.from({length:120},(e,t)=>{let n=t>=70&&t<=82?90:0;return[t,105+lt()*40+n]})})))()}function ft(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pt(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,x.useMemo)(()=>({number:new Intl.NumberFormat(n),compact:new Intl.NumberFormat(n,{notation:`compact`}),usd:new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),date:new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`})}),[n]),i=(0,x.useMemo)(()=>[{name:e(`newVisitors`),data:w.map(e=>[e.time,e.fresh])},{name:e(`returningVisitors`),data:w.map(e=>[e.time,e.returning])}],[e]),a=(0,x.useMemo)(()=>gt.map(({key:t,value:n})=>({name:e(`devices.${t}`),value:n})),[e]),o=(0,x.useMemo)(()=>[{name:e(`pageViews`),data:_t.map(({path:e,views:t})=>[e,t])}],[e]),s=T(`fresh`)+T(`returning`),c=[{label:e(`visitors`),value:r.compact.format(s),data:w.map(e=>e.fresh+e.returning)},{label:e(`ordersLabel`),value:r.number.format(T(`orders`)),data:w.map(e=>e.orders)},{label:e(`revenueLabel`),value:r.usd.format(T(`revenue`)),data:w.map(e=>e.revenue)},{label:e(`conversion`),value:r.percent.format(T(`orders`)/s),data:w.map(e=>e.orders/(e.fresh+e.returning))}];return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`},children:[(0,S.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(160px, 1fr))`,gap:12},children:c.map(t=>(0,S.jsxs)(ae,{padding:`small`,children:[(0,S.jsxs)(ee,{children:[(0,S.jsx)(ne,{children:t.label}),(0,S.jsx)(`strong`,{style:{fontSize:22},children:t.value})]}),(0,S.jsx)(re,{children:(0,S.jsx)(m,{data:t.data,type:`area`,height:36,name:t.label,tooltip:!1,ariaLabel:e(`last30Aria`,{metric:t.label})})})]},t.label))}),(0,S.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16},children:[(0,S.jsx)(we,{series:i,stacked:!0,xAxis:{type:`time`,format:e=>r.date.format(e),tickCount:5},yAxis:{format:e=>r.compact.format(e)},legend:{position:`bottom`},height:260,ariaLabel:e(`trafficAria`)}),(0,S.jsx)(g,{data:a,labels:`none`,centerValue:r.compact.format(s),centerLabel:e(`visitors`),format:e=>r.percent.format(e/100),renderTooltip:e=>(0,S.jsxs)(`span`,{children:[e.name,` · `,r.percent.format(e.percent)]}),legend:{position:`bottom`},height:260,ariaLabel:e(`devicesAria`)})]}),(0,S.jsx)(p,{series:o,labels:!0,yAxis:{format:e=>r.compact.format(e)},legend:!1,height:220,ariaLabel:e(`topPagesAria`)})]})}var x,S,mt,ht,C,w,T,gt,_t;function vt(){return(vt=e((()=>{x=t(),u(),te(),f(),_(),S=n(),mt=864e5,ht=new Date(2026,9,1).getTime(),C=ft(30),w=Array.from({length:30},(e,t)=>{let n=([0,6].includes(new Date(ht+t*mt).getDay())?.75:1)*(1+t/60),r=Math.round(2400*n*(.9+C()*.2)),i=Math.round(1700*n*(.9+C()*.2)),a=Math.round((r+i)*(.028+C()*.006));return{time:ht+t*mt,fresh:r,returning:i,orders:a,revenue:a*64}}),T=e=>w.reduce((t,n)=>t+n[e],0),gt=[{key:`mobile`,value:58},{key:`desktop`,value:35},{key:`tablet`,value:7}],_t=[{path:`/`,views:41200},{path:`/sale`,views:26900},{path:`/shoes`,views:18300},{path:`/bags`,views:12700},{path:`/checkout`,views:9800}]})))()}function E({children:e}){return(0,k.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(min(100%, 240px), 1fr))`,gap:16,width:`100%`},children:e})}function yt(){let e=(0,O.useRef)(null),[t,n]=(0,O.useState)(()=>typeof IntersectionObserver!=`function`);return(0,O.useEffect)(()=>{let t=e.current;if(!t||typeof IntersectionObserver!=`function`)return;let r=new IntersectionObserver(e=>n(e.some(e=>e.isIntersecting)),{rootMargin:`400px 0px`});return r.observe(t),()=>r.disconnect()},[]),[e,t]}function D({title:e,page:t,component:n,description:r,children:a}){let[o,s]=yt();return(0,k.jsxs)(ae,{padding:`small`,style:{minWidth:0},children:[(0,k.jsxs)(ee,{children:[(0,k.jsx)(ie,{children:(0,k.jsx)(de,{asChild:!0,children:(0,k.jsx)(i,{to:`/${t}`,children:e})})}),(0,k.jsxs)(ne,{children:[(0,k.jsx)(`code`,{children:n}),` · `,r]})]}),(0,k.jsx)(re,{children:(0,k.jsx)(`div`,{ref:o,style:{height:180,minWidth:0},children:s?a:(0,k.jsx)(ue,{variant:`rounded`,decorative:!0,width:`100%`,height:`100%`})})})]})}var O,k;function A(){return(A=e((()=>{O=t(),r(),te(),le(),fe(),k=n()})))()}function bt(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,j.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),i=(0,j.useMemo)(()=>({scatter:xt.map((t,n)=>({name:e(`cluster`,{name:`ABC`[n]}),data:t,pointSize:6})),line:[{name:e(`trajectory`),data:St,lineWidth:2}],surface:[{name:e(`ripple`),data:Ct}],bars:[{name:e(`sales`),data:wt}],regionNames:P.map(t=>e(`regions.${t}`)),quarters:[1,2,3,4].map(t=>e(`quarter`,{n:t}))}),[e]);return(0,M.jsxs)(E,{children:[(0,M.jsx)(D,{title:e(`cards.scatter3d.title`),component:`Scatter3DChart`,page:`scatter-3d-chart`,description:e(`cards.scatter3d.description`),children:(0,M.jsx)(tt,{series:i.scatter,legend:!1,autoRotate:!0,locale:n,height:`100%`,ariaLabel:e(`cards.scatter3d.aria`)})}),(0,M.jsx)(D,{title:e(`cards.line3d.title`),component:`Line3DChart`,page:`scatter-3d-chart`,description:e(`cards.line3d.description`),children:(0,M.jsx)(it,{series:i.line,colorScale:`plasma`,colorBar:!1,locale:n,height:`100%`,ariaLabel:e(`cards.line3d.aria`)})}),(0,M.jsx)(D,{title:e(`cards.surface3d.title`),component:`Surface3DChart`,page:`surface-3d-chart`,description:e(`cards.surface3d.description`),children:(0,M.jsx)(rt,{series:i.surface,colorBar:!1,locale:n,height:`100%`,ariaLabel:e(`cards.surface3d.aria`)})}),(0,M.jsx)(D,{title:e(`cards.bar3d.title`),component:`Bar3DChart`,page:`bar-3d-chart`,description:e(`cards.bar3d.description`),children:(0,M.jsx)(at,{series:i.bars,xAxis:{categories:i.regionNames},yAxis:{categories:i.quarters},zAxis:{format:r},locale:n,height:`100%`,ariaLabel:e(`cards.bar3d.aria`)})})]})}var j,M,N,xt,St,Ct,P,wt;function Tt(){return(Tt=e((()=>{j=t(),u(),nt(),A(),M=n(),N=e=>()=>(e=e*16807%2147483647,(e-1)/2147483646),xt=(()=>{let e=N(5);return[[2,2,2],[6,3,5],[4,7,3]].map(([t,n,r])=>Array.from({length:60},()=>[t+(e()-.5)*2.5,n+(e()-.5)*2.5,r+(e()-.5)*2.5]))})(),St=(()=>{let e=Float64Array.from({length:600},(e,t)=>t/600*6*Math.PI);return{x:e.map(e=>Math.cos(e)*(1+e/10)),y:e.map(e=>Math.sin(e)*(1+e/10)),z:e.map(e=>e/4),value:e}})(),Ct=(()=>{let e=Float64Array.from({length:48},(e,t)=>-10+20*t/47),t=new Float32Array(2304);for(let n=0;n<48;n++)for(let r=0;r<48;r++){let i=Math.hypot(e[r],e[n]);t[n*48+r]=i===0?1:Math.sin(i)/i}return{rows:48,cols:48,x:e,y:e,z:t}})(),P=[`north`,`south`,`east`,`west`],wt=(()=>{let e=N(8);return P.flatMap((t,n)=>[0,1,2,3].map(t=>[n,t,Math.round(60+n*12+t*18+e()*30)]))})()})))()}function Et({ariaLabel:e}){let{i18n:t}=l(),n=(0,F.useRef)(null),r=(0,F.useRef)(null),[i]=(0,F.useState)(()=>Ye({seed:5})),[a]=(0,F.useState)(()=>i.snapshot());return y(r,e=>n.current?.applyDeltas(i.step(e).delta)),(0,I.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,I.jsx)(Je,{ref:n,book:a,range:.003,legend:!1,fontSize:10,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function Dt({ariaLabel:e}){let{i18n:t}=l(),n=(0,F.useRef)(null),r=(0,F.useRef)(null),[i]=(0,F.useState)(()=>Ye({seed:9})),[a]=(0,F.useState)(()=>i.snapshot());return y(r,e=>{let{delta:t,trades:r}=i.step(e);n.current?.applyDeltas(t),r.length&&n.current?.setLastPrice(i.last())}),(0,I.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,I.jsx)(Qe,{ref:n,book:a,rowHeight:16,fontSize:11,imbalance:!1,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function Ot({ariaLabel:e}){let{i18n:t}=l(),n=(0,F.useRef)(null),r=(0,F.useRef)(null),[i]=(0,F.useState)(()=>$e({seed:25},3e4));return(0,F.useEffect)(()=>{let e=n.current;if(e){e.setBook(i.snapshot);for(let{delta:t,trades:n}of i.updates)e.applyDeltas(t),e.addTrades(n)}},[i]),y(r,e=>{let{delta:t,trades:r}=i.feed.step(e);n.current?.applyDeltas(t),n.current?.addTrades(r)}),(0,I.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,I.jsx)(Xe,{ref:n,interval:150,window:3e4,profile:!1,bubbleSize:12,fontSize:10,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function kt({ariaLabel:e}){let{i18n:t}=l(),n=(0,F.useRef)(null),r=(0,F.useRef)(null),[i]=(0,F.useState)(()=>$e({seed:36},1e4)),[a]=(0,F.useState)(()=>i.updates.flatMap(e=>e.trades));return y(r,e=>{let{trades:t}=i.feed.step(e);t.length&&n.current?.addTrades(t)}),(0,I.jsx)(`div`,{ref:r,style:{height:`100%`},children:(0,I.jsx)(et,{ref:n,trades:a,rowHeight:16,fontSize:11,milliseconds:!1,aggregate:!0,pricePrecision:1,sizePrecision:3,locale:t.language,height:`100%`,ariaLabel:e})})}function At(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,F.useMemo)(()=>[{name:e(`price`),data:jt}],[e]),i=(0,F.useMemo)(()=>({open:e(`ohlcLabels.open`),high:e(`ohlcLabels.high`),low:e(`ohlcLabels.low`),close:e(`ohlcLabels.close`)}),[e]);return(0,I.jsxs)(E,{children:[(0,I.jsx)(D,{title:e(`cards.candlestick.title`),component:`CandlestickChart`,page:`candlestick-chart`,description:e(`cards.candlestick.description`),children:(0,I.jsx)(Te,{series:r,tooltip:{labels:i},height:`100%`,legend:!1,ariaLabel:e(`cards.candlestick.aria`)})}),(0,I.jsx)(D,{title:e(`cards.trading.title`),component:`TradingChart`,page:`trading-chart`,description:e(`cards.trading.description`),children:(0,I.jsx)(He,{bars:Mt,timeframe:`1H`,symbol:`BTC/USDT`,indicators:Pt,legend:!1,highLowMarkers:!1,barSpacing:5,wheel:`modifier`,locale:n,height:`100%`,ariaLabel:e(`cards.trading.aria`)})}),(0,I.jsx)(D,{title:e(`cards.indicators.title`),component:`TradingChart`,page:`technical-indicators`,description:e(`cards.indicators.description`),children:(0,I.jsx)(He,{bars:Nt,timeframe:`1D`,symbol:`BTC/USDT`,indicators:Ft,legend:!1,highLowMarkers:!1,barSpacing:4,wheel:`modifier`,locale:n,height:`100%`,ariaLabel:e(`cards.indicators.aria`)})}),(0,I.jsx)(D,{title:e(`cards.depth.title`),component:`DepthChart`,page:`depth-chart`,description:e(`cards.depth.description`),children:(0,I.jsx)(Et,{ariaLabel:e(`cards.depth.aria`)})}),(0,I.jsx)(D,{title:e(`cards.orderBook.title`),component:`OrderBook`,page:`order-book`,description:e(`cards.orderBook.description`),children:(0,I.jsx)(Dt,{ariaLabel:e(`cards.orderBook.aria`)})}),(0,I.jsx)(D,{title:e(`cards.orderBookHeatmap.title`),component:`OrderBookHeatmap`,page:`order-book-heatmap`,description:e(`cards.orderBookHeatmap.description`),children:(0,I.jsx)(Ot,{ariaLabel:e(`cards.orderBookHeatmap.aria`)})}),(0,I.jsx)(D,{title:e(`cards.timeSales.title`),component:`TimeAndSales`,page:`time-and-sales`,description:e(`cards.timeSales.description`),children:(0,I.jsx)(kt,{ariaLabel:e(`cards.timeSales.aria`)})})]})}var F,I,jt,Mt,Nt,Pt,Ft;function It(){return(It=e((()=>{F=t(),u(),f(),qe(),Ue(),A(),Ge(),Ze(),I=n(),jt=v({count:36,timeframe:Ke,seed:42}).map((e,t)=>({x:new Date(2026,8,1+t),open:e.open,high:e.high,low:e.low,y:e.close})),Mt=v({count:240,timeframe:We,seed:7,price:64e3,volatility:.006,volume:400}),Nt=v({count:200,timeframe:Ke,seed:36,price:58e3,volatility:.024,volume:3e4}),Pt=[{type:`ma`,period:20},{type:`volume`,height:40}],Ft=[{type:`boll`,period:20},{type:`rsi`,period:14,height:50}]})))()}function Lt(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,L.useMemo)(()=>{let e=new Intl.NumberFormat(n),t=new Intl.NumberFormat(n,{notation:`compact`}),r=new Intl.NumberFormat(n,{style:`percent`});return{number:t=>e.format(t),compact:e=>t.format(e),percent:e=>r.format(e),percentOf100:e=>r.format(e/100)}},[n]),i=(0,L.useMemo)(()=>{let t=[{name:e(`plans.free`),value:5400},{name:e(`plans.pro`),value:2100},{name:e(`plans.team`),value:860}],n=[`speed`,`quality`,`cost`,`support`,`scale`].map(t=>({name:e(`criteria.${t}`),max:10})),r=[{name:e(`vendor`,{name:`A`}),values:[8,6,7,5,9]},{name:e(`vendor`,{name:`B`}),values:[5,9,6,8,6]}],i=[{name:e(`stages.visited`),value:12e3},{name:e(`stages.signedUp`),value:4800},{name:e(`stages.activated`),value:2600},{name:e(`stages.paid`),value:900}],a=[{x:8,y:8.5,label:e(`tasks.release`)},{x:3,y:7.5,label:e(`tasks.roadmap`)},{x:7,y:3,label:e(`tasks.emails`)},{x:2,y:2,label:e(`tasks.cleanup`)}],o={topLeft:{label:e(`quadrants.plan`)},topRight:{label:e(`quadrants.doFirst`)},bottomLeft:{label:e(`quadrants.drop`)},bottomRight:{label:e(`quadrants.delegate`)}},s=[{name:e(`budget.product`),children:[{name:e(`budget.design`),value:18},{name:e(`budget.engineering`),value:42}]},{name:e(`budget.goToMarket`),children:[{name:e(`budget.sales`),value:24},{name:e(`budget.marketing`),value:16}]}],c=t=>t.map(([t,n])=>typeof n==`number`?{name:e(`org.${t}`),value:n}:{name:e(`org.${t}`),children:c(n)}),l=Bt.map(t=>({name:e(`flow.${t}`)}));return{plans:t,criteria:n,vendors:r,stages:i,tasks:a,regions:o,budget:s,org:c(zt),nodes:l}},[e]),a=(0,L.useMemo)(()=>t=>e(`people`,{value:t}),[e]),o=(0,L.useMemo)(()=>e=>r.compact(e*1e3),[r]);return(0,R.jsxs)(E,{children:[(0,R.jsx)(D,{title:e(`cards.pie.title`),component:`PieChart`,page:`pie-chart`,description:e(`cards.pie.description`),children:(0,R.jsx)(Ie,{data:Rt,height:`100%`,legend:!1,format:r.percentOf100,percentFormat:r.percent,ariaLabel:e(`cards.pie.aria`)})}),(0,R.jsx)(D,{title:e(`cards.donut.title`),component:`DonutChart`,page:`pie-chart`,description:e(`cards.donut.description`),children:(0,R.jsx)(g,{data:i.plans,height:`100%`,labels:`none`,centerValue:r.compact(8360),centerLabel:e(`users`),legend:{position:`bottom`},format:r.number,percentFormat:r.percent,ariaLabel:e(`cards.donut.aria`)})}),(0,R.jsx)(D,{title:e(`cards.radar.title`),component:`RadarChart`,page:`radar-chart`,description:e(`cards.radar.description`),children:(0,R.jsx)(Pe,{indicators:i.criteria,series:i.vendors,height:`100%`,legend:!1,format:r.number,ariaLabel:e(`cards.radar.aria`)})}),(0,R.jsx)(D,{title:e(`cards.funnel.title`),component:`FunnelChart`,page:`funnel-chart`,description:e(`cards.funnel.description`),children:(0,R.jsx)(Be,{data:i.stages,height:`100%`,legend:!1,format:r.compact,percentFormat:r.percent,ariaLabel:e(`cards.funnel.aria`)})}),(0,R.jsx)(D,{title:e(`cards.quadrant.title`),component:`QuadrantChart`,page:`quadrant-chart`,description:e(`cards.quadrant.description`),children:(0,R.jsx)(Ae,{points:i.tasks,quadrants:i.regions,showTicks:!1,xLabel:e(`urgency`),yLabel:e(`importance`),height:`100%`,ariaLabel:e(`cards.quadrant.aria`)})}),(0,R.jsx)(D,{title:e(`cards.treemap.title`),component:`TreemapChart`,page:`treemap-chart`,description:e(`cards.treemap.description`),children:(0,R.jsx)(Ve,{data:i.budget,height:`100%`,format:r.percentOf100,percentFormat:r.percent,ariaLabel:e(`cards.treemap.aria`)})}),(0,R.jsx)(D,{title:e(`cards.sunburst.title`),component:`SunburstChart`,page:`sunburst-chart`,description:e(`cards.sunburst.description`),children:(0,R.jsx)(ze,{data:i.org,innerRadius:.3,format:a,percentFormat:r.percent,height:`100%`,ariaLabel:e(`cards.sunburst.aria`)})}),(0,R.jsx)(D,{title:e(`cards.sankey.title`),component:`SankeyChart`,page:`sankey-chart`,description:e(`cards.sankey.description`),children:(0,R.jsx)(Re,{nodes:i.nodes,links:Vt,format:o,linkColor:`source`,nodeWidth:8,height:`100%`,ariaLabel:e(`cards.sankey.aria`)})})]})}var L,R,Rt,zt,Bt,Vt;function Ht(){return(Ht=e((()=>{L=t(),u(),_(),f(),A(),R=n(),Rt=[{name:`Chrome`,value:64},{name:`Safari`,value:19},{name:`Edge`,value:9},{name:`Firefox`,value:8}],zt=[[`engineering`,[[`platform`,18],[`web`,24],[`mobile`,16]]],[`sales`,[[`emea`,22],[`americas`,31]]],[`operations`,[[`support`,26],[`finance`,8]]]],Bt=[`search`,`social`,`email`,`site`,`signedUp`,`left`],Vt=[{source:0,target:3,value:52},{source:1,target:3,value:31},{source:2,target:3,value:17},{source:3,target:4,value:23},{source:3,target:5,value:77}]})))()}function Ut(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,z.useMemo)(()=>{let e=new Intl.NumberFormat(n),t=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),i=new Intl.NumberFormat(n,{style:`percent`});return{number:t=>e.format(Math.round(t)),ms:e=>t.format(e),millions:e=>r.format(e*1e6),percent:e=>i.format(e)}},[n]),i=(0,z.useMemo)(()=>{let t=U.map(([t],n)=>({x:e(`services.${t}`),values:Gt[n]})),r=Kt.map(([t,n])=>typeof n==`number`?{label:e(`bridge.${t}`),value:n}:{label:e(`bridge.${t}`),kind:n}),i=new Intl.DateTimeFormat(n,{weekday:`short`}),a=W.map((e,t)=>i.format(new Date(2026,0,5+t))),o=new Intl.DateTimeFormat(n,{hour:`numeric`}),s=W[0].map((e,t)=>o.format(new Date(2026,0,5,t*4)));return{groups:t,steps:r,days:a,slots:s,cells:a.flatMap((e,t)=>s.map((n,r)=>({x:e,y:n,value:W[t][r]}))),bullets:Yt.map(({key:t,...n})=>({name:e(`kpis.${t}`),...n,ranges:[...n.ranges]})),rings:Xt.map(([t,n,r])=>({name:e(`objectives.${t}`),value:n,max:r})),tasks:Zt.map(([t,n,r,i])=>({name:e(`plan.${t}`),start:new Date(2026,10,n),end:new Date(2026,10,r),progress:i}))}},[e,n]),a=(0,z.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]),o=(0,z.useMemo)(()=>({max:e(`stats.max`),q3:e(`stats.q3`),median:e(`stats.median`),q1:e(`stats.q1`),min:e(`stats.min`),outliers:e(`stats.outliers`)}),[e]);return(0,B.jsxs)(E,{children:[(0,B.jsx)(D,{title:e(`cards.histogram.title`),component:`HistogramChart`,page:`histogram-chart`,description:e(`cards.histogram.description`),children:(0,B.jsx)(_e,{values:Wt,domain:[0,200],bins:40,name:e(`requests`),formatBin:r.ms,xAxis:{format:r.ms},yAxis:{format:r.number},height:`100%`,legend:!1,ariaLabel:e(`cards.histogram.aria`)})}),(0,B.jsx)(D,{title:e(`cards.boxplot.title`),component:`BoxPlotChart`,page:`boxplot-chart`,description:e(`cards.boxplot.description`),children:(0,B.jsx)(Ee,{groups:i.groups,name:e(`responseTime`),yAxis:{format:r.ms},tooltip:{labels:o},height:`100%`,legend:!1,ariaLabel:e(`cards.boxplot.aria`)})}),(0,B.jsx)(D,{title:e(`cards.waterfall.title`),component:`WaterfallChart`,page:`waterfall-chart`,description:e(`cards.waterfall.description`),children:(0,B.jsx)(Oe,{steps:i.steps,start:120,name:e(`amount`),format:r.millions,yAxis:{format:r.millions},height:`100%`,legend:!1,ariaLabel:e(`cards.waterfall.aria`)})}),(0,B.jsx)(D,{title:e(`cards.heatmap.title`),component:`HeatmapChart`,page:`heatmap-chart`,description:e(`cards.heatmap.description`),children:(0,B.jsx)(Se,{data:i.cells,xCategories:i.days,yCategories:i.slots,name:e(`load`),radius:2,height:`100%`,ariaLabel:e(`cards.heatmap.aria`)})}),(0,B.jsx)(D,{title:e(`cards.calendar.title`),component:`CalendarHeatmap`,page:`calendar-heatmap`,description:e(`cards.calendar.description`),children:(0,B.jsx)(Fe,{data:qt,range:[`2026-06-01`,`2026-10-18`],locale:n,format:r.number,height:`100%`,ariaLabel:e(`cards.calendar.aria`)})}),(0,B.jsx)(D,{title:e(`cards.gauge.title`),component:`GaugeChart`,page:`gauge-chart`,description:e(`cards.gauge.description`),children:(0,B.jsx)(Me,{value:78,label:e(`uptimeScore`),bands:Jt,format:r.number,tooltip:!1,height:`100%`,ariaLabel:e(`uptimeScore`)})}),(0,B.jsx)(D,{title:e(`cards.bullet.title`),component:`BulletChart`,page:`bullet-chart`,description:e(`cards.bullet.description`),children:(0,B.jsx)(Ne,{data:i.bullets,rangeLabels:a,percentFormat:r.percent,height:`100%`,ariaLabel:e(`cards.bullet.aria`)})}),(0,B.jsx)(D,{title:e(`cards.radialBar.title`),component:`RadialBarChart`,page:`radial-bar-chart`,description:e(`cards.radialBar.description`),children:(0,B.jsx)(Le,{data:i.rings,sweep:270,innerRadius:.3,percentFormat:r.percent,legend:!1,height:`100%`,ariaLabel:e(`cards.radialBar.aria`)})}),(0,B.jsx)(D,{title:e(`cards.gantt.title`),component:`GanttChart`,page:`gantt-chart`,description:e(`cards.gantt.description`),children:(0,B.jsx)(De,{tasks:i.tasks,today:Qt,todayLabel:e(`today`),taskName:e(`taskName`),progressName:e(`progress`),height:`100%`,legend:!1,ariaLabel:e(`cards.gantt.aria`)})})]})}var z,B,V,H,Wt,U,Gt,Kt,W,qt,Jt,Yt,Xt,Zt,Qt;function $t(){return($t=e((()=>{z=t(),u(),f(),_(),A(),B=n(),V=e=>()=>(e=e*16807%2147483647,(e-1)/2147483646),H=(e,t,n,r)=>{let i=V(e);return Float64Array.from({length:r},()=>{let e=Math.sqrt(-2*Math.log(i()||1e-9))*Math.cos(2*Math.PI*i());return t*Math.exp(n*e)})},Wt=H(1,60,.45,5e3),U=[[`gateway`,20,.35],[`search`,90,.45],[`checkout`,140,.38],[`images`,60,.6]],Gt=U.map(([,e,t],n)=>H(10+n,e,t,400)),Kt=[[`lastYear`,`subtotal`],[`newCustomers`,38],[`expansion`,17],[`churn`,-21],[`pricing`,9],[`thisYear`,`total`]],W=(()=>{let e=V(3);return Array.from({length:7},(t,n)=>Array.from({length:6},(t,r)=>Math.round((n<5?40:15)+(r>=2&&r<=4?40:0)+e()*20)))})(),qt=(()=>{let e=V(11),t=[];for(let n=0;n<140;n++){let r=new Date(2026,5,1+n),i=r.getDay()===0||r.getDay()===6;if(e()<(i?.2:.85)){let n=String(r.getMonth()+1).padStart(2,`0`),a=String(r.getDate()).padStart(2,`0`);t.push({date:`${r.getFullYear()}-${n}-${a}`,value:1+Math.round(e()*(i?3:9))})}}return t})(),Jt=[{to:60,color:`var(--danger-color)`},{to:85,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}],Yt=[{key:`revenue`,value:270,target:250,ranges:[150,225,300]},{key:`profit`,value:22,target:26,ranges:[15,22,30]},{key:`satisfaction`,value:4.6,target:4.4,ranges:[3.5,4.2,5]}],Xt=[[`revenue`,82,100],[`users`,64,100],[`retention`,91,100]],Zt=[[`research`,1,6,1],[`design`,5,13,1],[`build`,10,27,.6],[`test`,22,31,.2]],Qt=new Date(2026,10,18)})))()}function en(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,G.useMemo)(()=>{let e=new Intl.NumberFormat(n),t=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),r=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),i=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`});return{number:t=>e.format(t),millions:e=>t.format(e*1e6),thousands:e=>t.format(e*1e3),percent:e=>r.format(e),percentOf100:e=>r.format(e/100),celsius:e=>i.format(e)}},[n]),i=(0,G.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`}),i=J.map((e,n)=>t.format(new Date(2026,n,1))),a=e=>e.map((e,t)=>[i[t],e]),o=cn.map((t,n)=>e(`quarter`,{n:n+1}));return{line:[{name:e(`visits`),data:a(nn)},{name:e(`signups`),data:a(rn)}],area:[{name:e(`web`),data:a(q.web)},{name:`iOS`,data:a(q.ios)},{name:`Android`,data:a(q.android)}],rangeArea:[{name:e(`temperature`),format:r.celsius,data:i.map((e,t)=>({x:e,y0:J[t],y:an[t]}))}],bar:[{name:e(`orders`),data:on.map((e,t)=>({x:o[t],y:e,color:t===2?`var(--success-color)`:void 0}))}],horizontalBar:[{name:e(`developers`),format:r.percentOf100,data:sn}],mixed:[{name:e(`revenue`),type:`bar`,format:r.millions,data:o.map((e,t)=>[e,cn[t]])},{name:e(`growth`),type:`line`,yAxis:`right`,format:r.percent,color:`var(--chart-series-3, #f59e0b)`,data:o.map((e,t)=>[e,ln[t]])}],scatter:un.map((t,n)=>({name:e(`team`,{name:n===0?`A`:`B`}),data:t})),bubble:[`email`,`social`].map(t=>({name:e(`channels.${t}`),valueName:e(`reach`),format:e=>r.number(e),data:dn[t].map(([e,t,n])=>({x:e,y:t,value:n}))}))}},[e,n,r]);return(0,K.jsxs)(E,{children:[(0,K.jsx)(D,{title:e(`cards.line.title`),component:`LineChart`,page:`line-chart`,description:e(`cards.line.description`),children:(0,K.jsx)(xe,{series:i.line,height:`100%`,legend:!1,ariaLabel:e(`cards.line.aria`)})}),(0,K.jsx)(D,{title:e(`cards.area.title`),component:`AreaChart`,page:`area-chart`,description:e(`cards.area.description`),children:(0,K.jsx)(we,{series:i.area,stacked:!0,height:`100%`,legend:!1,ariaLabel:e(`cards.area.aria`)})}),(0,K.jsx)(D,{title:e(`cards.rangeArea.title`),component:`RangeAreaChart`,page:`range-area-chart`,description:e(`cards.rangeArea.description`),children:(0,K.jsx)(ke,{series:i.rangeArea,yAxis:{format:r.celsius},height:`100%`,legend:!1,ariaLabel:e(`cards.rangeArea.aria`)})}),(0,K.jsx)(D,{title:e(`cards.bar.title`),component:`BarChart`,page:`bar-chart`,description:e(`cards.bar.description`),children:(0,K.jsx)(p,{series:i.bar,labels:!0,yAxis:{format:r.number},height:`100%`,legend:!1,ariaLabel:e(`cards.bar.aria`)})}),(0,K.jsx)(D,{title:e(`cards.horizontalBar.title`),component:`HorizontalBarChart`,page:`horizontal-bar-chart`,description:e(`cards.horizontalBar.description`),children:(0,K.jsx)(ve,{series:i.horizontalBar,labels:!0,yAxis:{format:r.percentOf100},height:`100%`,legend:!1,ariaLabel:e(`cards.horizontalBar.aria`)})}),(0,K.jsx)(D,{title:e(`cards.mixed.title`),component:`MixedChart`,page:`mixed-chart`,description:e(`cards.mixed.description`),children:(0,K.jsx)(ye,{series:i.mixed,yAxis:{format:r.millions},yAxis2:{format:r.percent},height:`100%`,legend:!1,ariaLabel:e(`cards.mixed.aria`)})}),(0,K.jsx)(D,{title:e(`cards.scatter.title`),component:`ScatterChart`,page:`scatter-chart`,description:e(`cards.scatter.description`),children:(0,K.jsx)(Ce,{series:i.scatter,height:`100%`,legend:!1,ariaLabel:e(`cards.scatter.aria`)})}),(0,K.jsx)(D,{title:e(`cards.bubble.title`),component:`BubbleChart`,page:`bubble-chart`,description:e(`cards.bubble.description`),children:(0,K.jsx)(be,{series:i.bubble,maxSize:36,xAxis:{format:r.thousands},yAxis:{format:r.number},height:`100%`,legend:!1,ariaLabel:e(`cards.bubble.aria`)})}),(0,K.jsx)(D,{title:e(`cards.sparkline.title`),component:`Sparkline`,page:`sparkline`,description:e(`cards.sparkline.description`),children:(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,K.jsxs)(`div`,{children:[(0,K.jsx)(`strong`,{style:{fontSize:22},children:r.thousands(46)}),` `,e(`revenueLabel`),(0,K.jsx)(m,{data:fn,type:`area`,reference:30,name:e(`revenueLabel`),format:r.thousands,ariaLabel:e(`revenueTrendAria`)})]}),(0,K.jsxs)(`div`,{children:[(0,K.jsx)(`strong`,{style:{fontSize:22},children:r.number(2)}),` `,e(`errorsLabel`),(0,K.jsx)(m,{data:pn,type:`bar`,name:e(`errorsLabel`),color:`var(--danger-color)`,ariaLabel:e(`errorsTrendAria`)})]})]})})]})}var G,K,tn,nn,rn,q,J,an,on,sn,cn,ln,un,dn,fn,pn;function mn(){return(mn=e((()=>{G=t(),u(),f(),A(),K=n(),tn=e=>()=>(e=e*16807%2147483647,(e-1)/2147483646),nn=[32,41,38,52,49,61,66,72],rn=[12,15,19,18,24,27,26,34],q={web:[20,24,22,30,34,31,38,42],ios:[12,14,18,17,20,24,23,27],android:[8,11,10,14,16,15,19,22]},J=[-1,0,3,6,10,13,15,15,12,8,4,1],an=[5,7,12,16,20,24,26,26,21,16,10,6],on=[128,164,212,187],sn=[[`JavaScript`,62],[`Python`,51],[`TypeScript`,43],[`Java`,30],[`Go`,18]],cn=[18,21,24,31],ln=[.04,.17,.14,.29],un=(()=>{let e=tn(7),t=(t,n)=>Array.from({length:40},()=>({x:t+(e()-.5)*30,y:n+(e()-.5)*30}));return[t(35,60),t(65,35)]})(),dn={email:[[4,320,12e3],[6,410,18e3],[9,380,15e3]],social:[[12,520,9e4],[18,760,14e4],[25,690,21e4]]},fn=[18,22,19,26,24,31,29,35,33,41,38,46],pn=[9,7,8,5,6,4,5,3,4,2,3,2]})))()}function hn(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),n=t.language,r=(0,gn.useMemo)(()=>{let t=bn(n);return[{name:e(`revenue`),type:`bar`,data:t.map((e,t)=>[e,vn[t]])},{name:e(`target`),type:`line`,data:t.map((e,t)=>[e,yn[t]])}]},[e,n]),i=(0,gn.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,_n.jsx)(h,{series:r,yAxis:{format:i},legend:{position:`bottom`},height:300,ariaLabel:e(`revenueAria`)})}var gn,_n,vn,yn,bn;function xn(){return(xn=e((()=>{gn=t(),u(),je(),_n=n(),vn=[42,48,51,47,58,63,61,70,74,69,81,92],yn=[45,47,50,53,56,59,62,65,68,71,74,77],bn=e=>{let t=new Intl.DateTimeFormat(e,{month:`short`});return Array.from({length:12},(e,n)=>t.format(new Date(2026,n,1)))}})))()}function Sn(){let{t:e,i18n:t}=l(`common`,{keyPrefix:`docs.charts.data`}),[n,r]=(0,Cn.useState)(`colorblind`),i=wn[n],{bars:a,shares:o}=(0,Cn.useMemo)(()=>{let t=Object.keys(X);return{bars:t.map(t=>({name:e(`channels.${t}`),data:X[t].map((t,n)=>[e(`quarter`,{n:n+1}),t])})),shares:t.map(t=>({name:e(`channels.${t}`),value:X[t].reduce((e,t)=>e+t,0)}))}},[e]),s=new Intl.NumberFormat(t.language,{style:`percent`});return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsx)(oe,{"aria-label":e(`palette`),direction:`horizontal`,value:n,onChange:e=>r(e),children:Object.keys(wn).map(t=>(0,Y.jsx)(d,{value:t,label:e(`palettes.${t}`)},t))}),(0,Y.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:16},children:[(0,Y.jsx)(p,{series:a,stacked:!0,palette:i,legend:{position:`bottom`},height:280,ariaLabel:e(`requestsAria`)}),(0,Y.jsx)(g,{data:o,palette:i,labels:`none`,legend:{position:`bottom`},renderTooltip:e=>(0,Y.jsxs)(`span`,{children:[e.name,` · `,s.format(e.percent)]}),height:280,ariaLabel:e(`channelsAria`)})]})]})}var Cn,Y,wn,X;function Tn(){return(Tn=e((()=>{Cn=t(),u(),se(),ce(),f(),_(),Y=n(),wn={theme:void 0,colorblind:[`#0072B2`,`#E69F00`,`#009E73`,`#CC79A7`,`#56B4E9`],blues:[`#08306b`,`#2171b5`,`#4292c6`,`#6baed6`,`#9ecae1`],warm:[`#7f1d1d`,`#c2410c`,`#f59e0b`,`#facc15`,`#fde68a`]},X={email:[420,380,410,360],chat:[310,360,420,480],phone:[180,170,150,140],social:[60,80,95,120],community:[40,55,70,90]}})))()}function En(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Dn(){let{t:e}=l(`common`,{keyPrefix:`docs.charts.data`}),[t,n]=(0,Z.useState)(`auto`),[r,i]=(0,Z.useState)(null),a=(0,Z.useMemo)(()=>{let t=En(7),n=new Float64Array(On),r=0;for(let e=0;e<On;e++)r+=t()-.5,n[e]=r;return[{name:e(`randomWalk`),data:{y:n}}]},[e]);return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Q.jsxs)(oe,{"aria-label":e(`renderer`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,Q.jsx)(d,{value:`auto`,label:`auto`}),(0,Q.jsx)(d,{value:`webgpu`,label:`webgpu`}),(0,Q.jsx)(d,{value:`webgl2`,label:`webgl2`}),(0,Q.jsx)(d,{value:`webgl`,label:`webgl`}),(0,Q.jsx)(d,{value:`canvas2d`,label:`canvas2d`})]}),(0,Q.jsx)(h,{series:a,renderer:t,onRendererChange:i,height:280,ariaLabel:e(`randomWalkAria`)}),(0,Q.jsx)(`p`,{role:`status`,children:e(`rendererStatus`,{requested:t,active:r??`…`})})]})}var Z,Q,On;function kn(){return(kn=e((()=>{Z=t(),u(),se(),ce(),je(),Q=n(),On=5e4})))()}var An;function jn(){return(jn=e((()=>{An=`import { useMemo } from "react";
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
`})))()}var Mn;function Nn(){return(Nn=e((()=>{Mn=`import { useMemo } from "react";
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
`})))()}var Pn;function Fn(){return(Fn=e((()=>{Pn=`import { useMemo } from "react";
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
    const regionNames = regions.map((key) => t(\`regions.\${key}\`));
    const quarters = [1, 2, 3, 4].map((n) => t("quarter", { n }));
    return { scatter, line, surface, bars, regionNames, quarters };
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
    </GalleryGrid>
  );
}
`})))()}var In;function Ln(){return(Ln=e((()=>{In=`import { useEffect, useMemo, useRef, useState } from "react";
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
  { type: "volume", height: 40 },
];
const dailyIndicators: TradingIndicator[] = [
  { type: "boll", period: 20 },
  { type: "rsi", period: 14, height: 50 },
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
`})))()}var Rn;function zn(){return(zn=e((()=>{Rn=`import { useMemo } from "react";
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
`})))()}var Bn;function Vn(){return(Vn=e((()=>{Bn=`import { useMemo } from "react";
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
`})))()}var Hn;function Un(){return(Un=e((()=>{Hn=`import { useMemo } from "react";
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
`})))()}var Wn;function Gn(){return(Gn=e((()=>{Wn=`import { useMemo } from "react";
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
`})))()}var Kn;function qn(){return(qn=e((()=>{Kn=`import { useMemo, useState } from "react";
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
`})))()}var Jn;function Yn(){return(Yn=e((()=>{Jn=`import { useMemo, useState } from "react";
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
`})))()}var $,Xn,Zn;function Qn(){return(Qn=e((()=>{dt(),vt(),Tt(),It(),Ht(),$t(),mn(),xn(),Tn(),kn(),jn(),Nn(),Fn(),Ln(),zn(),Vn(),Un(),Gn(),qn(),Yn(),t(),o(),u(),r(),me(),a(),ge(),$=n(),Xn=pe(Object.assign({"./demos/annotations.tsx":st,"./demos/dashboard.tsx":pt,"./demos/gallery-3d.tsx":bt,"./demos/gallery-finance.tsx":At,"./demos/gallery-relations.tsx":Lt,"./demos/gallery-statistics.tsx":Ut,"./demos/gallery.tsx":en,"./demos/mixed.tsx":hn,"./demos/palette.tsx":Sn,"./demos/renderers.tsx":Dn}),Object.assign({"./demos/annotations.tsx":An,"./demos/dashboard.tsx":Mn,"./demos/gallery-3d.tsx":Pn,"./demos/gallery-finance.tsx":In,"./demos/gallery-relations.tsx":Rn,"./demos/gallery-statistics.tsx":Bn,"./demos/gallery.tsx":Hn,"./demos/mixed.tsx":Wn,"./demos/palette.tsx":Kn,"./demos/renderers.tsx":Jn})),Zn=()=>{let{t:e}=l(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`chart-families`,children:[(0,$.jsx)(`h2`,{id:`chart-families`,children:e(`docs.charts.intro.families.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.families.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:(0,$.jsx)(s,{i18nKey:`docs.charts.intro.families.basic`,components:{line:(0,$.jsx)(i,{to:`/line-chart`}),area:(0,$.jsx)(i,{to:`/area-chart`}),rangeArea:(0,$.jsx)(i,{to:`/range-area-chart`}),bar:(0,$.jsx)(i,{to:`/bar-chart`}),horizontalBar:(0,$.jsx)(i,{to:`/horizontal-bar-chart`}),mixed:(0,$.jsx)(i,{to:`/mixed-chart`}),scatter:(0,$.jsx)(i,{to:`/scatter-chart`}),bubble:(0,$.jsx)(i,{to:`/bubble-chart`}),sparkline:(0,$.jsx)(i,{to:`/sparkline`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(s,{i18nKey:`docs.charts.intro.families.statistics`,components:{histogram:(0,$.jsx)(i,{to:`/histogram-chart`}),boxplot:(0,$.jsx)(i,{to:`/boxplot-chart`}),waterfall:(0,$.jsx)(i,{to:`/waterfall-chart`}),heatmap:(0,$.jsx)(i,{to:`/heatmap-chart`}),calendar:(0,$.jsx)(i,{to:`/calendar-heatmap`}),gauge:(0,$.jsx)(i,{to:`/gauge-chart`}),bullet:(0,$.jsx)(i,{to:`/bullet-chart`}),radialBar:(0,$.jsx)(i,{to:`/radial-bar-chart`}),gantt:(0,$.jsx)(i,{to:`/gantt-chart`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(s,{i18nKey:`docs.charts.intro.families.relations`,components:{pie:(0,$.jsx)(i,{to:`/pie-chart`}),radar:(0,$.jsx)(i,{to:`/radar-chart`}),funnel:(0,$.jsx)(i,{to:`/funnel-chart`}),quadrant:(0,$.jsx)(i,{to:`/quadrant-chart`}),treemap:(0,$.jsx)(i,{to:`/treemap-chart`}),sunburst:(0,$.jsx)(i,{to:`/sunburst-chart`}),sankey:(0,$.jsx)(i,{to:`/sankey-chart`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(s,{i18nKey:`docs.charts.intro.families.finance`,components:{candlestick:(0,$.jsx)(i,{to:`/candlestick-chart`}),trading:(0,$.jsx)(i,{to:`/trading-chart`}),indicators:(0,$.jsx)(i,{to:`/technical-indicators`}),depth:(0,$.jsx)(i,{to:`/depth-chart`}),orderBook:(0,$.jsx)(i,{to:`/order-book`}),orderBookHeatmap:(0,$.jsx)(i,{to:`/order-book-heatmap`}),timeSales:(0,$.jsx)(i,{to:`/time-and-sales`})}})}),(0,$.jsx)(`li`,{children:(0,$.jsx)(s,{i18nKey:`docs.charts.intro.families.threeD`,components:{scatter:(0,$.jsx)(i,{to:`/scatter-3d-chart`}),surface:(0,$.jsx)(i,{to:`/surface-3d-chart`}),bar:(0,$.jsx)(i,{to:`/bar-3d-chart`})}})})]}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.families.lazy`)}),(0,$.jsx)(`p`,{className:c.prose,children:(0,$.jsx)(s,{i18nKey:`docs.charts.intro.families.fallback`,components:{engine:(0,$.jsx)(i,{to:`/chart-engine`}),performance:(0,$.jsx)(i,{to:`/chart-performance`})}})})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`chart-rendering`,children:[(0,$.jsx)(`h2`,{id:`chart-rendering`,children:e(`docs.charts.intro.rendering.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.rendering.text`)}),(0,$.jsxs)(`ul`,{className:c.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.background`)}),(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.data`)}),(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.labels`)}),(0,$.jsx)(`li`,{children:e(`docs.charts.intro.rendering.dom`)})]})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`chart-large-data`,children:[(0,$.jsx)(`h2`,{id:`chart-large-data`,children:e(`docs.charts.intro.largeData.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.largeData.text`)})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`chart-interaction`,children:[(0,$.jsx)(`h2`,{id:`chart-interaction`,children:e(`docs.charts.intro.interaction.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.interaction.pointer`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.interaction.keyboard`)})]}),(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`chart-theming`,children:[(0,$.jsx)(`h2`,{id:`chart-theming`,children:e(`docs.charts.intro.theming.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.theming.text`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.charts.intro.theming.core`)})]})]});return(0,$.jsx)(he,{id:`charts`,demos:Xn,intro:t})}})))()}Qn();export{Zn as default};