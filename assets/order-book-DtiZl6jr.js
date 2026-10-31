import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Tag-D6SUzaZT.js";import{n as p,t as m}from"./NumberInput-BHmNKshL.js";import{l as h,n as g,t as _,u as v}from"./DocPage-BNEhhzRL.js";import{d as y,f as b,i as x,l as S,n as C,r as w,s as T,u as E}from"./feed-YwnTBj_b.js";function ee(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,te.useMemo)(()=>C({seed:1}).snapshot(),[]);return(0,ne.jsx)(S,{book:t,height:420,pricePrecision:1,sizePrecision:4,labels:{price:e(`price`),size:e(`size`),total:e(`total`)},ariaLabel:e(`aria`)})}var te,ne;function re(){return(re=e((()=>{te=t(),i(),E(),w(),ne=n()})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,D.useRef)(null),n=(0,D.useRef)(null);return T(n,{seed:5},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,O.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:300},children:(0,O.jsx)(S,{ref:t,height:300,rowHeight:17,fontSize:11,columns:[`price`,`size`],imbalance:!1,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var D,O;function ae(){return(ae=e((()=>{D=t(),i(),E(),w(),O=n()})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,k.useRef)(null),n=(0,k.useRef)(null);return T(n,{seed:4},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,A.jsxs)(`div`,{ref:n,style:j,children:[(0,A.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,padding:`0 10px 8px`,fontSize:13},children:[(0,A.jsx)(`strong`,{children:e(`pair`)}),(0,A.jsx)(`span`,{style:{color:`#848e9c`},children:e(`title`)})]}),(0,A.jsx)(S,{ref:t,height:440,pricePrecision:1,sizePrecision:4,total:`quote`,depthBars:`level`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})]})}var k,A,j;function se(){return(se=e((()=>{k=t(),i(),E(),w(),A=n(),j={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:`12px 4px 4px`,width:`100%`,boxSizing:`border-box`}})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,M.useRef)(null),i=(0,M.useRef)(null),[a,o]=(0,M.useState)(1),[c,l]=(0,M.useState)(`cumulative`);return T(i,{seed:3},{load:e=>n.current?.setBook(e.snapshot()),update:({delta:e,trades:t},r)=>{n.current?.applyDeltas(e),t.length&&n.current?.setLastPrice(r.last())}}),(0,N.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,N.jsx)(s,{"aria-label":e(`grouping`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:le.map(e=>(0,N.jsx)(u,{value:e,label:new Intl.NumberFormat(t.language).format(e)},e))}),(0,N.jsxs)(s,{"aria-label":e(`depthBars`),direction:`horizontal`,value:c,onChange:e=>l(e),children:[(0,N.jsx)(u,{value:`cumulative`,label:e(`barsCumulative`)}),(0,N.jsx)(u,{value:`level`,label:e(`barsLevel`)})]})]}),(0,N.jsx)(S,{ref:n,grouping:a,depthBars:c,sizePrecision:3,height:420,ariaLabel:e(`aria`)})]})}var M,N,le;function ue(){return(ue=e((()=>{M=t(),i(),c(),l(),E(),w(),N=n(),le=[.1,.5,1,10,50]})))()}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,P.useRef)(null),i=(0,P.useRef)(null),[a,o]=(0,P.useState)(5),[c,l]=(0,P.useState)(null);T(i,{seed:8,whales:.03},{load:e=>n.current?.setBook(e.snapshot()),update:({delta:e,trades:t},r)=>{n.current?.applyDeltas(e),t.length&&n.current?.setLastPrice(r.last())}});let d=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),f=new Intl.NumberFormat(t.language,{maximumFractionDigits:4});return(0,F.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsx)(s,{"aria-label":e(`threshold`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:fe.map(t=>(0,F.jsx)(u,{value:t,label:e(`atLeast`,{value:f.format(t)})},t))}),(0,F.jsx)(S,{ref:n,largeOrderThreshold:a,depthBars:`level`,height:420,pricePrecision:1,sizePrecision:4,onLevelClick:l,ariaLabel:e(`aria`)}),(0,F.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:c?e(c.side===`bid`?`pickedBid`:`pickedAsk`,{price:d.format(c.price),size:f.format(c.size),sum:f.format(c.sum)}):e(`pickHint`)})]})}var P,F,fe;function pe(){return(pe=e((()=>{P=t(),i(),c(),l(),E(),w(),F=n(),fe=[2,5,10]})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,I.useRef)(null),i=(0,I.useRef)(null),[a,o]=(0,I.useState)(50),[c,l]=(0,I.useState)({updates:0,levels:0}),d=(0,I.useRef)({updates:0,levels:0,since:0});T(i,{seed:2},{load:e=>n.current?.setBook(e.snapshot()),update:({delta:e,trades:t},r)=>{n.current?.applyDeltas(e),t.length&&n.current?.setLastPrice(r.last());let i=d.current;i.updates++,i.levels+=e.bids.length+e.asks.length;let a=performance.now();if(a-i.since>=1e3){let e=i.since?(a-i.since)/1e3:1;l({updates:Math.round(i.updates/e),levels:Math.round(i.levels/e)}),d.current={updates:0,levels:0,since:a}}}},{interval:1e3/a});let f=new Intl.NumberFormat(t.language);return(0,L.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsx)(s,{"aria-label":e(`updateRate`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:[10,50,200].map(t=>(0,L.jsx)(u,{value:t,label:e(`perSecond`,{value:t})},t))}),(0,L.jsx)(S,{ref:n,height:440,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,L.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:e(`liveStats`,{updates:f.format(c.updates),levels:f.format(c.levels)})})]})}var I,L;function he(){return(he=e((()=>{I=t(),i(),c(),l(),E(),w(),L=n()})))()}function ge(e){let t=x(e.seed),n=(n,r)=>Array.from({length:60},(i,a)=>{let o=n+r*a;return[Number((o*e.tick).toFixed(e.decimals)),e.size(t,o)]});return{bids:n(e.bid,-1),asks:n(e.bid+e.spread,1)}}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=t.language,[i,a]=(0,R.useState)(`crypto`),o=B.find(e=>e.id===i)??B[0],c=(0,R.useMemo)(()=>ge(o),[o]),{formatPrice:l,formatSize:d,spread:f}=(0,R.useMemo)(()=>{let t=new Intl.NumberFormat(n,{...o.id===`equity`?{style:`currency`,currency:`USD`}:{},minimumFractionDigits:o.decimals,maximumFractionDigits:o.decimals}),r=o.id===`crypto`?new Intl.NumberFormat(n,{maximumFractionDigits:4}):o.id===`futures`?new Intl.NumberFormat(n):new Intl.NumberFormat(n,{notation:`compact`,maximumFractionDigits:1}),i=o.spread,a=i*o.tick,s=new Intl.NumberFormat(n,{maximumFractionDigits:2});return{formatPrice:e=>t.format(e),formatSize:e=>r.format(e),spread:o.id===`fx`?e(`spreadPips`,{value:s.format(a/1e-4)}):o.id===`equity`?e(`spreadCents`,{value:s.format(a*100)}):o.id===`futures`?e(`spreadTicks`,{value:s.format(i)}):e(`spreadUsdt`,{value:t.format(a)})}},[n,o,e]);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsx)(s,{"aria-label":e(`market`),direction:`horizontal`,value:i,onChange:e=>a(e),children:B.map(t=>(0,z.jsx)(u,{value:t.id,label:e(`markets.${t.id}.name`)},t.id))}),(0,z.jsx)(S,{book:c,formatPrice:l,formatSize:d,largeOrderThreshold:o.large,labels:{price:e(`markets.${i}.price`),size:e(`markets.${i}.size`),total:e(`markets.${i}.total`)},height:400,ariaLabel:e(`markets.${i}.aria`)}),(0,z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:e(`marketStatus`,{tick:l(o.tick),spread:f,large:d(o.large)})})]})}var R,z,B;function ve(){return(ve=e((()=>{R=t(),i(),c(),l(),E(),w(),z=n(),B=[{id:`crypto`,tick:.1,decimals:1,bid:640125,spread:1,size:e=>Math.round((.002+e()**4*3+(e()<.03?9:0))*1e4)/1e4,large:5,seed:101},{id:`equity`,tick:.01,decimals:2,bid:22844,spread:2,size:(e,t)=>Math.ceil((.2+e()**3*10)*(t%100==0?6:1))*100,large:3e3,seed:102},{id:`fx`,tick:1e-5,decimals:5,bid:108541,spread:2,size:e=>(1+Math.floor(e()**2*12))*1e6,large:1e7,seed:103},{id:`futures`,tick:.25,decimals:2,bid:23211,spread:1,size:e=>20+Math.floor(e()**2*260),large:250,seed:104}]})))()}function ye(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,V.useRef)(null),n=(0,V.useRef)(null),[i,a]=(0,V.useState)(`both`);return T(n,{seed:9},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,H.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsxs)(s,{"aria-label":e(`mode`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,H.jsx)(u,{value:`both`,label:e(`modeBoth`)}),(0,H.jsx)(u,{value:`bids`,label:e(`modeBids`)}),(0,H.jsx)(u,{value:`asks`,label:e(`modeAsks`)})]}),(0,H.jsx)(S,{ref:t,mode:i,height:380,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var V,H;function be(){return(be=e((()=>{V=t(),i(),c(),l(),E(),w(),H=n()})))()}function xe(e,t,n,r,i){let a=n===`buy`?t:e,o=e=>n===`buy`?e<=r:e>=r,s=0,c=0;for(let[e,t]of a){if(s>=i||!o(e))break;let n=Math.min(t,i-s);s+=n,c+=n*e}let l=0;for(let[i,a]of n===`buy`?e:t){if(n===`buy`?i<r:i>r)break;l+=a}return{filled:s,average:s?c/s:NaN,rest:Math.max(0,i-s),ahead:s?0:l}}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=t.language,i=(0,U.useMemo)(()=>C({seed:23}).snapshot(),[]),[a,c]=(0,U.useState)(`buy`),[l,d]=(0,U.useState)(i.bids[0][0]),[p,h]=(0,U.useState)(1),[g,_]=(0,U.useState)([]),[v,y]=(0,U.useState)(``),b=e=>{c(e.side===`ask`?`buy`:`sell`),d(e.price),h(Math.round(e.sum*1e4)/1e4)},x=l&&p?xe(i.bids,i.asks,a,l,p):null,w=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),T=new Intl.NumberFormat(n,{maximumFractionDigits:4}),E=t=>e(t===`buy`?`buy`:`sell`);return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,width:`100%`},children:[(0,W.jsx)(S,{book:i,height:400,pricePrecision:1,sizePrecision:4,onLevelClick:b,ariaLabel:e(`aria`)}),(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12,alignContent:`start`},children:[(0,W.jsx)(`strong`,{children:e(`ticket`)}),(0,W.jsxs)(s,{"aria-label":e(`side`),direction:`horizontal`,value:a,onChange:e=>c(e),children:[(0,W.jsx)(u,{value:`buy`,label:e(`buy`)}),(0,W.jsx)(u,{value:`sell`,label:e(`sell`)})]}),(0,W.jsxs)(`label`,{style:{display:`grid`,gap:4,fontSize:13},children:[e(`limitPrice`),(0,W.jsx)(m,{value:l,onChange:d,min:0,step:.1,precision:1})]}),(0,W.jsxs)(`label`,{style:{display:`grid`,gap:4,fontSize:13},children:[e(`quantity`),(0,W.jsx)(m,{value:p,onChange:h,min:0,step:.1,precision:4})]}),(0,W.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:x?x.filled>0?e(x.rest>0?`previewPartial`:`previewFill`,{filled:T.format(x.filled),average:w.format(x.average),rest:T.format(x.rest),price:w.format(l??0)}):e(`previewRest`,{price:w.format(l??0),ahead:T.format(x.ahead)}):e(`ticketHint`)}),(0,W.jsx)(o,{disabled:!x,onClick:()=>{l&&p&&(_(e=>[...e,{id:(e.at(-1)?.id??0)+1,side:a,price:l,size:p}]),y(e(`orderPlaced`,{side:E(a),size:T.format(p),price:w.format(l)})))},children:e(`placeOrder`,{side:E(a)})}),(0,W.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:6},children:g.map(t=>(0,W.jsx)(f,{color:t.side===`buy`?`success`:`danger`,closable:!0,closeLabel:e(`cancelOrder`),onClose:()=>{_(e=>e.filter(e=>e.id!==t.id)),y(e(`orderCancelled`,{price:w.format(t.price)}))},children:e(`orderTag`,{side:E(t.side),size:T.format(t.size),price:w.format(t.price)})},t.id))}),(0,W.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13},children:g.length===0&&!v?e(`noOrders`):v})]})]})}var U,W;function Ce(){return(Ce=e((()=>{U=t(),i(),a(),p(),c(),l(),d(),E(),w(),W=n()})))()}function we(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,G.useRef)(null),n=(0,G.useRef)(null),[i,a]=(0,G.useState)(`red-up`);return T(n,{seed:6},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,K.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,K.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,K.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,K.jsx)(S,{ref:t,colorConvention:i,height:400,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var G,K;function Te(){return(Te=e((()=>{G=t(),i(),c(),l(),E(),w(),K=n()})))()}function Ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=t.language,i=(0,q.useRef)(null),a=(0,q.useRef)(null),o=(0,q.useRef)(null),s=(0,q.useRef)(null),[c,l]=(0,q.useState)(null),[u,d]=(0,q.useState)(null),f=(0,q.useRef)(0);T(s,{seed:10},{load:e=>{let t=e.snapshot();i.current?.setBook(t),i.current?.setLastPrice(e.last()),a.current?.setBook(t),o.current?.clear(),l({last:e.last(),open:e.last()})},update:({delta:e,trades:t},n)=>{if(i.current?.applyDeltas(e),a.current?.applyDeltas(e),!t.length)return;o.current?.addTrades(t),i.current?.setLastPrice(n.last());let r=performance.now();r-f.current>250&&(f.current=r,l(e=>e&&{...e,last:n.last()}))}});let p=e(`limit`),m=(0,q.useMemo)(()=>u===null?[]:[{price:u,label:p}],[u,p]),h=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),g=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`always`}),_=c?c.last/c.open-1:0,v={pricePrecision:1,sizePrecision:4,fontFamily:Y},x={border:`1px solid var(--border-color)`,borderRadius:10,padding:`8px 4px 4px`,minWidth:0},C={margin:`0 10px 6px`,fontSize:12,fontWeight:600,color:`var(--text-secondary-color)`};return(0,J.jsxs)(`div`,{ref:s,style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`baseline`,gap:`4px 16px`,fontVariantNumeric:`tabular-nums`},children:[(0,J.jsx)(`strong`,{style:{fontSize:16},children:e(`pair`)}),(0,J.jsx)(`span`,{style:{fontSize:20,fontWeight:700,fontFamily:Y,color:_>=0?`var(--success-color)`:`var(--danger-color)`},children:c?h.format(c.last):`—`}),(0,J.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`sessionChange`,{value:g.format(_)})}),(0,J.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:u===null?e(`pickHint`):e(`limitAt`,{price:h.format(u)})})]}),(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`},children:[(0,J.jsxs)(`section`,{style:x,"aria-label":e(`title`),children:[(0,J.jsx)(`h4`,{style:C,children:e(`title`)}),(0,J.jsx)(S,{ref:i,height:472,onLevelClick:e=>d(e.price),labels:{price:e(`price`),size:e(`size`),total:e(`total`)},ariaLabel:e(`aria`),...v})]}),(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12,minWidth:0},children:[(0,J.jsxs)(`section`,{style:x,"aria-label":e(`depth`),children:[(0,J.jsx)(`h4`,{style:C,children:e(`depth`)}),(0,J.jsx)(y,{ref:a,height:200,range:.002,legend:!1,priceLines:m,ariaLabel:e(`depthAria`),...v})]}),(0,J.jsxs)(`section`,{style:x,"aria-label":e(`trades`),children:[(0,J.jsx)(`h4`,{style:C,children:e(`trades`)}),(0,J.jsx)(b,{ref:o,height:220,largeTradeThreshold:1,ariaLabel:e(`tradesAria`),...v})]})]})]})]})}var q,J,Y;function De(){return(De=e((()=>{q=t(),i(),E(),w(),J=n(),Y=`ui-monospace, SFMono-Regular, Menlo, monospace`})))()}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=t.language,i=(0,X.useRef)(null),a=(0,X.useRef)(null),[o,s]=(0,X.useState)([]),[c,l]=(0,X.useState)({resting:0,pulled:0,filled:0}),u=(0,X.useRef)({bid:new Map,ask:new Map}),d=(0,X.useRef)([]),p=(0,X.useRef)(0);T(a,{seed:18,whales:.03},{load:e=>{let t=e.snapshot();u.current={bid:new Map(t.bids),ask:new Map(t.asks)},d.current=[],s([]),l({resting:0,pulled:0,filled:0}),i.current?.setBook(t)},update:({delta:e,trades:t},n)=>{i.current?.applyDeltas(e),t.length&&i.current?.setLastPrice(n.last());for(let e of t)for(let t of d.current)e.price===t.price&&(t.traded+=e.size);let r=[],a=(t,n)=>{let i=u.current[t];for(let[a,o]of n){let n=i.get(a)??0;if(o-n>=Q){let i={id:p.current++,side:t,price:a,size:o-n,base:n,traded:0,time:e.time};d.current.push(i),r.push({...i,kind:`new`,rested:0})}o===0?i.delete(a):i.set(a,o)}};a(`bid`,e.bids),a(`ask`,e.asks);let o=0,c=0;d.current=d.current.filter(t=>{if((u.current[t.side].get(t.price)??0)>t.base+t.size*.3)return!0;let n=t.traded>=t.size*.3?`filled`:`pulled`;return n===`filled`?c++:o++,r.push({...t,kind:n,id:p.current++,rested:(e.time-t.time)/1e3}),!1}),r.length&&(s(e=>[...r.reverse(),...e].slice(0,6)),l(e=>({resting:d.current.length,pulled:e.pulled+o,filled:e.filled+c})))}});let m=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),h=new Intl.NumberFormat(n,{maximumFractionDigits:2}),g=new Intl.NumberFormat(n,{style:`unit`,unit:`second`,maximumFractionDigits:0}),_=new Intl.NumberFormat(n,{style:`percent`}),v=new Intl.NumberFormat(n),y=c.pulled+c.filled,b={new:{color:`info`,label:e(`wallNew`)},pulled:{color:`warning`,label:e(`wallPulled`)},filled:{color:`success`,label:e(`wallFilled`)}};return(0,Z.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,width:`100%`},children:[(0,Z.jsx)(S,{ref:i,largeOrderThreshold:Q,depthBars:`level`,height:420,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,alignContent:`start`},children:[(0,Z.jsx)(`strong`,{children:e(`wallLog`)}),(0,Z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:e(`wallStats`,{size:h.format(Q),resting:v.format(c.resting),pulled:v.format(c.pulled),filled:v.format(c.filled),ratio:_.format(y?c.pulled/y:0)})}),(0,Z.jsxs)(`output`,{"aria-live":`polite`,style:{display:`grid`,gap:6,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[o.length===0&&(0,Z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`wallWaiting`)}),o.map(t=>(0,Z.jsxs)(`span`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,Z.jsx)(f,{color:b[t.kind].color,children:b[t.kind].label}),e(t.side===`bid`?`wallBid`:`wallAsk`,{price:m.format(t.price),size:h.format(t.size)}),t.kind!==`new`&&(0,Z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`wallRested`,{value:g.format(t.rested)})})]},t.id))]})]})]})}var X,Z,Q;function ke(){return(ke=e((()=>{X=t(),i(),d(),E(),w(),Z=n(),Q=5})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook } from "minerva-design/charts";
import { createMarketFeed } from "../feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  // a BTC/USDT book: 0.1 USDT price tick, sizes in BTC
  const book = useMemo(() => createMarketFeed({ seed: 1 }).snapshot(), []);
  return (
    <OrderBook
      book={book}
      height={420}
      pricePrecision={1}
      sizePrecision={4}
      labels={{ price: t("price"), size: t("size"), total: t("total") }}
      ariaLabel={t("aria")}
    />
  );
}
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 5 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  // a phone-sized panel: two columns, smaller rows, as many as fit
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <OrderBook
        ref={bookRef}
        height={300}
        rowHeight={17}
        fontSize={11}
        columns={["price", "size"]}
        imbalance={false}
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Pe;function Fe(){return(Fe=e((()=>{Pe=`import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

// a trading terminal palette: the ladder reads its colors from these
// variables (a dark site theme works the same way, without the wrapper)
const TERMINAL = {
  "--background-color": "#0b0e11",
  "--surface-color": "#0b0e11",
  "--surface-elevated-color": "#1b2028",
  "--text-color": "#eaecef",
  "--text-secondary-color": "#848e9c",
  "--border-color": "#2b3139",
  "--success-color": "#0ecb81",
  "--danger-color": "#f6465d",
  "--primary-color": "#f0b90b",
  background: "#0b0e11",
  color: "#eaecef",
  borderRadius: 12,
  padding: "12px 4px 4px",
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 4 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px 8px",
          fontSize: 13,
        }}
      >
        <strong>{t("pair")}</strong>
        <span style={{ color: "#848e9c" }}>{t("title")}</span>
      </div>
      <OrderBook
        ref={bookRef}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        // the total column in USDT, bars per level
        total="quote"
        depthBars="level"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

const STEPS = [0.1, 0.5, 1, 10, 50];

export default function GroupingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [grouping, setGrouping] = useState(1);
  const [bars, setBars] = useState<"cumulative" | "level">("cumulative");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 3 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("grouping")}
          direction="horizontal"
          value={grouping}
          onChange={(value) => setGrouping(Number(value))}
        >
          {STEPS.map((step) => (
            <Radio
              key={step}
              value={step}
              label={new Intl.NumberFormat(i18n.language).format(step)}
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("depthBars")}
          direction="horizontal"
          value={bars}
          onChange={(value) => setBars(value as "cumulative" | "level")}
        >
          <Radio value="cumulative" label={t("barsCumulative")} />
          <Radio value="level" label={t("barsLevel")} />
        </RadioGroup>
      </div>
      <OrderBook
        ref={bookRef}
        // bids are rounded down to the step, asks up: buckets never cross
        grouping={grouping}
        depthBars={bars}
        // the price decimals follow the step (1 → "64,012")
        sizePrecision={3}
        height={420}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

const THRESHOLDS = [2, 5, 10];

export default function LargeOrdersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(5);
  const [picked, setPicked] = useState<OrderBookLevelEvent | null>(null);
  // a fresh market on every mount: its snapshot, then its deltas; more
  // whales than usual: walls of 5 to 30 BTC
  useMarketStream(
    boxRef,
    { seed: 8, whales: 0.03 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 4,
  });
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("threshold")}
        direction="horizontal"
        value={threshold}
        onChange={(value) => setThreshold(Number(value))}
      >
        {THRESHOLDS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("atLeast", { value: size.format(value) })}
          />
        ))}
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        largeOrderThreshold={threshold}
        depthBars="level"
        height={420}
        pricePrecision={1}
        sizePrecision={4}
        onLevelClick={setPicked}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {picked
          ? t(picked.side === "bid" ? "pickedBid" : "pickedAsk", {
              price: price.format(picked.price),
              size: size.format(picked.size),
              sum: size.format(picked.sum),
            })
          : t("pickHint")}
      </span>
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [rate, setRate] = useState(50);
  const [stats, setStats] = useState({ updates: 0, levels: 0 });
  const counter = useRef({ updates: 0, levels: 0, since: 0 });

  // the simulated exchange, created on mount: one snapshot, then a stream
  // of deltas; every message goes straight to the ladder (it draws once
  // per frame)
  useMarketStream(
    boxRef,
    { seed: 2 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
        const c = counter.current;
        c.updates++;
        c.levels += delta.bids.length + delta.asks.length;
        const now = performance.now();
        if (now - c.since >= 1000) {
          const seconds = c.since ? (now - c.since) / 1000 : 1;
          setStats({
            updates: Math.round(c.updates / seconds),
            levels: Math.round(c.levels / seconds),
          });
          counter.current = { updates: 0, levels: 0, since: now };
        }
      },
    },
    { interval: 1000 / rate },
  );

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("updateRate")}
        direction="horizontal"
        value={rate}
        onChange={(value) => setRate(Number(value))}
      >
        {[10, 50, 200].map((value) => (
          <Radio key={value} value={value} label={t("perSecond", { value })} />
        ))}
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("liveStats", {
          updates: number.format(stats.updates),
          levels: number.format(stats.levels),
        })}
      </span>
    </div>
  );
}
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookLevel } from "minerva-design/charts";
import { mulberry32 } from "../feed";

type MarketId = "crypto" | "equity" | "fx" | "futures";

interface Market {
  id: MarketId;
  /** Price increment */
  tick: number;
  /** Decimals of the prices */
  decimals: number;
  /** Best bid, in ticks */
  bid: number;
  /** Spread, in ticks */
  spread: number;
  /** Size of a level, in base units (contracts, shares, euros, BTC) */
  size: (random: () => number, ticks: number) => number;
  /** Highlighted resting size */
  large: number;
  seed: number;
}

const MARKETS: Market[] = [
  {
    id: "crypto",
    tick: 0.1,
    decimals: 1,
    bid: 640_125,
    spread: 1,
    size: (random) =>
      Math.round(
        (0.002 + random() ** 4 * 3 + (random() < 0.03 ? 9 : 0)) * 1e4,
      ) / 1e4,
    large: 5,
    seed: 101,
  },
  {
    // one-cent ticks, round lots of 100 shares, more on whole dollars
    id: "equity",
    tick: 0.01,
    decimals: 2,
    bid: 22_844,
    spread: 2,
    size: (random, ticks) =>
      Math.ceil((0.2 + random() ** 3 * 10) * (ticks % 100 === 0 ? 6 : 1)) * 100,
    large: 3_000,
    seed: 102,
  },
  {
    // a tenth of a pip, sizes in whole millions of euros
    id: "fx",
    tick: 0.00001,
    decimals: 5,
    bid: 108_541,
    spread: 2,
    size: (random) => (1 + Math.floor(random() ** 2 * 12)) * 1_000_000,
    large: 10_000_000,
    seed: 103,
  },
  {
    // E-mini S&P 500: quarter-point ticks, hundreds of contracts per level
    id: "futures",
    tick: 0.25,
    decimals: 2,
    bid: 23_211,
    spread: 1,
    size: (random) => 20 + Math.floor(random() ** 2 * 260),
    large: 250,
    seed: 104,
  },
];

function marketBook(market: Market) {
  const random = mulberry32(market.seed);
  const side = (from: number, step: 1 | -1): OrderBookLevel[] =>
    Array.from({ length: 60 }, (_, i) => {
      const ticks = from + step * i;
      return [
        Number((ticks * market.tick).toFixed(market.decimals)),
        market.size(random, ticks),
      ];
    });
  return {
    bids: side(market.bid, -1),
    asks: side(market.bid + market.spread, 1),
  };
}

export default function MarketsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const [id, setId] = useState<MarketId>("crypto");
  const market = MARKETS.find((item) => item.id === id) ?? MARKETS[0];
  const book = useMemo(() => marketBook(market), [market]);

  // each market has its own price and size conventions
  const { formatPrice, formatSize, spread } = useMemo(() => {
    const price = new Intl.NumberFormat(locale, {
      ...(market.id === "equity" ? { style: "currency", currency: "USD" } : {}),
      minimumFractionDigits: market.decimals,
      maximumFractionDigits: market.decimals,
    });
    const size =
      market.id === "crypto"
        ? new Intl.NumberFormat(locale, { maximumFractionDigits: 4 })
        : market.id === "futures"
          ? new Intl.NumberFormat(locale)
          : new Intl.NumberFormat(locale, {
              notation: "compact",
              maximumFractionDigits: 1,
            });
    const ticks = market.spread;
    const width = ticks * market.tick;
    const unit = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
    return {
      formatPrice: (value: number) => price.format(value),
      formatSize: (value: number) => size.format(value),
      // spreads are quoted in the unit of each market
      spread:
        market.id === "fx"
          ? t("spreadPips", { value: unit.format(width / 0.0001) })
          : market.id === "equity"
            ? t("spreadCents", { value: unit.format(width * 100) })
            : market.id === "futures"
              ? t("spreadTicks", { value: unit.format(ticks) })
              : t("spreadUsdt", { value: price.format(width) }),
    };
  }, [locale, market, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("market")}
        direction="horizontal"
        value={id}
        onChange={(value) => setId(value as MarketId)}
      >
        {MARKETS.map((item) => (
          <Radio
            key={item.id}
            value={item.id}
            label={t(\`markets.\${item.id}.name\`)}
          />
        ))}
      </RadioGroup>
      <OrderBook
        book={book}
        formatPrice={formatPrice}
        formatSize={formatSize}
        largeOrderThreshold={market.large}
        labels={{
          price: t(\`markets.\${id}.price\`),
          size: t(\`markets.\${id}.size\`),
          total: t(\`markets.\${id}.total\`),
        }}
        height={400}
        ariaLabel={t(\`markets.\${id}.aria\`)}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("marketStatus", {
          tick: formatPrice(market.tick),
          spread,
          large: formatSize(market.large),
        })}
      </span>
    </div>
  );
}
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookMode,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function ModesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<OrderBookMode>("both");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 9 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("mode")}
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(value as OrderBookMode)}
      >
        <Radio value="both" label={t("modeBoth")} />
        <Radio value="bids" label={t("modeBids")} />
        <Radio value="asks" label={t("modeAsks")} />
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        // one side fills the whole height: twice the levels
        mode={mode}
        height={380}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, NumberInput, Radio, RadioGroup, Tag } from "minerva-design";
import {
  OrderBook,
  type OrderBookLevel,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { createMarketFeed } from "../feed";

type Side = "buy" | "sell";

interface Order {
  id: number;
  side: Side;
  price: number;
  size: number;
}

/**
 * What a limit order would do against the book (best levels first): the
 * part that crosses fills at once, the rest joins the queue of its side
 */
function preview(
  bids: OrderBookLevel[],
  asks: OrderBookLevel[],
  side: Side,
  price: number,
  size: number,
) {
  const opposite = side === "buy" ? asks : bids;
  const crosses = (level: number) =>
    side === "buy" ? level <= price : level >= price;
  let filled = 0;
  let notional = 0;
  for (const [level, available] of opposite) {
    if (filled >= size || !crosses(level)) break;
    const fill = Math.min(available, size - filled);
    filled += fill;
    notional += fill * level;
  }
  // size resting at the same or a better price, filled before the order
  let ahead = 0;
  for (const [level, resting] of side === "buy" ? bids : asks) {
    if (side === "buy" ? level < price : level > price) break;
    ahead += resting;
  }
  return {
    filled,
    average: filled ? notional / filled : NaN,
    rest: Math.max(0, size - filled),
    ahead: filled ? 0 : ahead,
  };
}

export default function OrderTicketDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const book = useMemo(() => createMarketFeed({ seed: 23 }).snapshot(), []);
  const [side, setSide] = useState<Side>("buy");
  const [price, setPrice] = useState<number | null>(book.bids[0][0]);
  const [size, setSize] = useState<number | null>(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState("");

  // a click on an ask prepares a buy at that price for everything above
  // it down to the spread (sum), a click on a bid a sell
  const pick = (level: OrderBookLevelEvent) => {
    setSide(level.side === "ask" ? "buy" : "sell");
    setPrice(level.price);
    setSize(Math.round(level.sum * 1e4) / 1e4);
  };

  const result =
    price && size ? preview(book.bids, book.asks, side, price, size) : null;
  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 4 });
  const sideLabel = (value: Side) => (value === "buy" ? t("buy") : t("sell"));

  const place = () => {
    if (!price || !size) return;
    setOrders((list) => [
      ...list,
      { id: (list.at(-1)?.id ?? 0) + 1, side, price, size },
    ]);
    setStatus(
      t("orderPlaced", {
        side: sideLabel(side),
        size: btc.format(size),
        price: usd.format(price),
      }),
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <OrderBook
        book={book}
        height={400}
        pricePrecision={1}
        sizePrecision={4}
        onLevelClick={pick}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
        <strong>{t("ticket")}</strong>
        <RadioGroup
          aria-label={t("side")}
          direction="horizontal"
          value={side}
          onChange={(value) => setSide(value as Side)}
        >
          <Radio value="buy" label={t("buy")} />
          <Radio value="sell" label={t("sell")} />
        </RadioGroup>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          {t("limitPrice")}
          <NumberInput
            value={price}
            onChange={setPrice}
            min={0}
            step={0.1}
            precision={1}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          {t("quantity")}
          <NumberInput
            value={size}
            onChange={setSize}
            min={0}
            step={0.1}
            precision={4}
          />
        </label>
        <span
          style={{
            color: "var(--text-secondary-color)",
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {!result
            ? t("ticketHint")
            : result.filled > 0
              ? t(result.rest > 0 ? "previewPartial" : "previewFill", {
                  filled: btc.format(result.filled),
                  average: usd.format(result.average),
                  rest: btc.format(result.rest),
                  price: usd.format(price ?? 0),
                })
              : t("previewRest", {
                  price: usd.format(price ?? 0),
                  ahead: btc.format(result.ahead),
                })}
        </span>
        <Button disabled={!result} onClick={place}>
          {t("placeOrder", { side: sideLabel(side) })}
        </Button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {orders.map((order) => (
            <Tag
              key={order.id}
              color={order.side === "buy" ? "success" : "danger"}
              closable
              closeLabel={t("cancelOrder")}
              onClose={() => {
                setOrders((list) => list.filter((o) => o.id !== order.id));
                setStatus(
                  t("orderCancelled", { price: usd.format(order.price) }),
                );
              }}
            >
              {t("orderTag", {
                side: sideLabel(order.side),
                size: btc.format(order.size),
                price: usd.format(order.price),
              })}
            </Tag>
          ))}
        </div>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
        >
          {orders.length === 0 && !status ? t("noOrders") : status}
        </output>
      </div>
    </div>
  );
}
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookColorConvention,
  type OrderBookHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 6 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

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
      <OrderBook
        ref={bookRef}
        // red bids and green asks (mainland China, Japan, Korea)
        colorConvention={convention}
        height={400}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DepthChart,
  OrderBook,
  TimeAndSales,
  type DepthChartHandle,
  type OrderBookHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function TerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const bookRef = useRef<OrderBookHandle>(null);
  const depthRef = useRef<DepthChartHandle>(null);
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // one market for the three widgets, like one exchange WebSocket; a
  // fresh one on every mount (snapshot first, then the stream)
  const [ticker, setTicker] = useState<{ last: number; open: number } | null>(
    null,
  );
  const [limit, setLimit] = useState<number | null>(null);
  const shownAt = useRef(0);

  useMarketStream(
    boxRef,
    { seed: 10 },
    {
      load: (feed) => {
        const book = feed.snapshot();
        bookRef.current?.setBook(book);
        bookRef.current?.setLastPrice(feed.last());
        depthRef.current?.setBook(book);
        tapeRef.current?.clear();
        setTicker({ last: feed.last(), open: feed.last() });
      },
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        depthRef.current?.applyDeltas(delta);
        if (!trades.length) return;
        tapeRef.current?.addTrades(trades);
        bookRef.current?.setLastPrice(feed.last());
        // React only renders the header, four times a second
        const now = performance.now();
        if (now - shownAt.current > 250) {
          shownAt.current = now;
          setTicker(
            (previous) => previous && { ...previous, last: feed.last() },
          );
        }
      },
    },
  );

  const limitLabel = t("limit");
  const limitLines = useMemo(
    () => (limit === null ? [] : [{ price: limit, label: limitLabel }]),
    [limit, limitLabel],
  );
  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    signDisplay: "always",
  });
  const change = ticker ? ticker.last / ticker.open - 1 : 0;
  const common = {
    pricePrecision: 1,
    sizePrecision: 4,
    fontFamily: MONO,
  };
  const panel = {
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    padding: "8px 4px 4px",
    minWidth: 0,
  };
  const heading = {
    margin: "0 10px 6px",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-secondary-color)",
  };

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "4px 16px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong style={{ fontSize: 16 }}>{t("pair")}</strong>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            fontFamily: MONO,
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {ticker ? price.format(ticker.last) : "\\u2014"}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("sessionChange", { value: percent.format(change) })}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {limit === null
            ? t("pickHint")
            : t("limitAt", { price: price.format(limit) })}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <section style={panel} aria-label={t("title")}>
          <h4 style={heading}>{t("title")}</h4>
          <OrderBook
            ref={bookRef}
            height={472}
            onLevelClick={(level) => setLimit(level.price)}
            labels={{ price: t("price"), size: t("size"), total: t("total") }}
            ariaLabel={t("aria")}
            {...common}
          />
        </section>
        <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
          <section style={panel} aria-label={t("depth")}>
            <h4 style={heading}>{t("depth")}</h4>
            <DepthChart
              ref={depthRef}
              height={200}
              range={0.002}
              legend={false}
              // the price picked in the ladder
              priceLines={limitLines}
              ariaLabel={t("depthAria")}
              {...common}
            />
          </section>
          <section style={panel} aria-label={t("trades")}>
            <h4 style={heading}>{t("trades")}</h4>
            <TimeAndSales
              ref={tapeRef}
              height={220}
              largeTradeThreshold={1}
              ariaLabel={t("tradesAria")}
              {...common}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevel,
} from "minerva-design/charts";
import { useMarketStream, type MarketFeed } from "../feed";

/** A level growing by at least this much at once is a new wall (BTC) */
const WALL = 5;

type Side = "bid" | "ask";

interface Wall {
  id: number;
  side: Side;
  price: number;
  /** Size the wall added */
  size: number;
  /** Size of the level before the wall */
  base: number;
  /** Volume traded at the wall's price since it appeared */
  traded: number;
  time: number;
}

interface WallEvent {
  id: number;
  kind: "new" | "pulled" | "filled";
  side: Side;
  price: number;
  size: number;
  /** Seconds the wall rested (when it left) */
  rested: number;
}

export default function WallWatchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<WallEvent[]>([]);
  const [counts, setCounts] = useState({ resting: 0, pulled: 0, filled: 0 });
  // our own copy of the book, to see each level's change, and the walls
  const sizes = useRef<Record<Side, Map<number, number>>>({
    bid: new Map(),
    ask: new Map(),
  });
  const walls = useRef<Wall[]>([]);
  const nextId = useRef(0);

  const load = (feed: MarketFeed) => {
    const snapshot = feed.snapshot();
    sizes.current = {
      bid: new Map(snapshot.bids),
      ask: new Map(snapshot.asks),
    };
    walls.current = [];
    setEvents([]);
    setCounts({ resting: 0, pulled: 0, filled: 0 });
    bookRef.current?.setBook(snapshot);
  };

  useMarketStream(
    boxRef,
    // more whales than usual, and some of their walls are spoofs
    { seed: 18, whales: 0.03 },
    {
      load,
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
        for (const trade of trades)
          for (const wall of walls.current)
            if (trade.price === wall.price) wall.traded += trade.size;

        const found: WallEvent[] = [];
        const scan = (side: Side, levels: OrderBookLevel[]) => {
          const map = sizes.current[side];
          for (const [price, size] of levels) {
            const before = map.get(price) ?? 0;
            if (size - before >= WALL) {
              const wall: Wall = {
                id: nextId.current++,
                side,
                price,
                size: size - before,
                base: before,
                traded: 0,
                time: delta.time,
              };
              walls.current.push(wall);
              found.push({ ...wall, kind: "new", rested: 0 });
            }
            if (size === 0) map.delete(price);
            else map.set(price, size);
          }
        };
        scan("bid", delta.bids);
        scan("ask", delta.asks);

        // a wall is gone once 70% of it left the level: eaten by trades at
        // its price, or pulled before the price got there (spoofing)
        let pulled = 0;
        let filled = 0;
        walls.current = walls.current.filter((wall) => {
          const now = sizes.current[wall.side].get(wall.price) ?? 0;
          if (now > wall.base + wall.size * 0.3) return true;
          const kind = wall.traded >= wall.size * 0.3 ? "filled" : "pulled";
          if (kind === "filled") filled++;
          else pulled++;
          found.push({
            ...wall,
            kind,
            id: nextId.current++,
            rested: (delta.time - wall.time) / 1000,
          });
          return false;
        });
        if (!found.length) return;
        setEvents((list) => [...found.reverse(), ...list].slice(0, 6));
        setCounts((c) => ({
          resting: walls.current.length,
          pulled: c.pulled + pulled,
          filled: c.filled + filled,
        }));
      },
    },
  );

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const seconds = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "second",
    maximumFractionDigits: 0,
  });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const integer = new Intl.NumberFormat(locale);
  const gone = counts.pulled + counts.filled;
  const tags = {
    new: { color: "info", label: t("wallNew") },
    pulled: { color: "warning", label: t("wallPulled") },
    filled: { color: "success", label: t("wallFilled") },
  } as const;

  return (
    <div
      ref={boxRef}
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <OrderBook
        ref={bookRef}
        largeOrderThreshold={WALL}
        depthBars="level"
        height={420}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        <strong>{t("wallLog")}</strong>
        <span
          style={{
            color: "var(--text-secondary-color)",
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {t("wallStats", {
            size: btc.format(WALL),
            resting: integer.format(counts.resting),
            pulled: integer.format(counts.pulled),
            filled: integer.format(counts.filled),
            ratio: percent.format(gone ? counts.pulled / gone : 0),
          })}
        </span>
        <output
          aria-live="polite"
          style={{
            display: "grid",
            gap: 6,
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {events.length === 0 && (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("wallWaiting")}
            </span>
          )}
          {events.map((event) => (
            <span
              key={event.id}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <Tag color={tags[event.kind].color}>{tags[event.kind].label}</Tag>
              {t(event.side === "bid" ? "wallBid" : "wallAsk", {
                price: price.format(event.price),
                size: btc.format(event.size),
              })}
              {event.kind !== "new" && (
                <span style={{ color: "var(--text-secondary-color)" }}>
                  {t("wallRested", { value: seconds.format(event.rested) })}
                </span>
              )}
            </span>
          ))}
        </output>
      </div>
    </div>
  );
}
`})))()}var et,tt,nt;function $(){return($=e((()=>{re(),ae(),se(),ue(),pe(),he(),ve(),be(),Ce(),Te(),De(),ke(),je(),Ne(),Fe(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),t(),g(),v(),et=n(),tt=h(Object.assign({"./demos/basic.tsx":ee,"./demos/compact.tsx":ie,"./demos/dark.tsx":oe,"./demos/grouping.tsx":ce,"./demos/large-orders.tsx":de,"./demos/live.tsx":me,"./demos/markets.tsx":_e,"./demos/modes.tsx":ye,"./demos/order-ticket.tsx":Se,"./demos/red-up.tsx":we,"./demos/terminal.tsx":Ee,"./demos/wall-watch.tsx":Oe}),Object.assign({"./demos/basic.tsx":Ae,"./demos/compact.tsx":Me,"./demos/dark.tsx":Pe,"./demos/grouping.tsx":Ie,"./demos/large-orders.tsx":Re,"./demos/live.tsx":Be,"./demos/markets.tsx":He,"./demos/modes.tsx":We,"./demos/order-ticket.tsx":Ke,"./demos/red-up.tsx":Je,"./demos/terminal.tsx":Xe,"./demos/wall-watch.tsx":Qe})),nt=()=>(0,et.jsx)(_,{id:`order-book`,demos:tt})})))()}$();export{nt as default};