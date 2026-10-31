import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{n as l,t as u}from"./Switch-CHbzff3y.js";import{c as d,o as f}from"./DemoBlock-CrPVu7R1.js";import{l as p,n as m,t as h,u as g}from"./DocPage-BdPOW9nQ.js";import{d as _,i as v,n as y,r as b,s as x,u as S}from"./feed-YwnTBj_b.js";function C(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,w.useMemo)(()=>y({seed:1}).snapshot(),[]);return(0,ee.jsx)(_,{book:t,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})}var w,ee;function te(){return(te=e((()=>{w=t(),i(),S(),b(),ee=n()})))()}function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,T.useRef)(null),n=(0,T.useRef)(null);return x(n,{seed:5},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)}),(0,E.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,E.jsx)(_,{ref:t,height:190,legend:!1,fontSize:10,range:.003,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var T,E;function re(){return(re=e((()=>{T=t(),i(),S(),b(),E=n()})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,D.useRef)(null),n=(0,D.useRef)(null);x(n,{seed:4,price:k},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)});let i=e(`myBid`),a=e(`myAsk`),o=e(`liquidation`),s=(0,D.useMemo)(()=>[{price:Math.round(k*.9992),label:i,color:`#0ecb81`},{price:Math.round(k*1.0012),label:a,color:`#f6465d`},{price:Math.round(k*.9978),label:o,color:`#f0b90b`}],[i,a,o]);return(0,O.jsx)(`div`,{ref:n,style:A,children:(0,O.jsx)(_,{ref:t,height:360,range:.003,priceLines:s,fillOpacity:.35,pricePrecision:1,sizePrecision:4,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var D,O,k,A;function j(){return(j=e((()=>{D=t(),i(),S(),b(),O=n(),k=64e3,A={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:12,width:`100%`,boxSizing:`border-box`}})))()}function ae(e,t,n){let r=v(e),i=(e,t)=>Array.from({length:n},(n,i)=>{let a=e+t*i,o=a%100==0?8:a%50==0?4:1,s=Math.ceil((.2+r()**3*12)*o);return[a/100,s*100]});return{bids:i(t,-1),asks:i(t+2,1)}}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>ae(17,22844,300),[]),[a,o]=(0,M.useState)(!1),s=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`});return t=>e.format(t)},[n]),c=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`,maximumFractionDigits:1});return t=>e.format(t)},[n]);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsx)(u,{checked:a,onChange:e=>o(e),label:e(`showNotional`)}),(0,N.jsx)(_,{book:i,range:.008,amount:a?`quote`:`base`,formatPrice:s,formatSize:c,labels:{amount:e(a?`notionalUsd`:`shares`)},height:320,ariaLabel:e(`equityAria`)})]})}var M,N;function se(){return(se=e((()=>{M=t(),i(),l(),S(),b(),N=n()})))()}function ce(e,t){let n=e.mid();if(Number.isNaN(n))return null;let r=r=>{let i=0;for(let a=0;a<e.count(r);a++){let o=e.priceAt(r,a);if(Math.abs(o/n-1)>t)break;i+=e.sizeAt(r,a)}return i};return{spread:e.spread(),spreadBp:e.spread()/n*1e4,bids:r(`bid`),asks:r(`ask`)}}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),n=t.language,i=(0,P.useRef)(null),o=(0,P.useRef)(null),[s,l]=(0,P.useState)(.001),[u,d]=(0,P.useState)(null),f=(0,P.useRef)(0),p=(0,P.useRef)(s);(0,P.useEffect)(()=>{p.current=s}),x(o,{seed:15},{load:e=>i.current?.setBook(e.snapshot()),update:({delta:e})=>{i.current?.applyDeltas(e);let t=performance.now();if(t-f.current<1e3)return;f.current=t;let n=i.current?.getInstance()?.getStore();n&&d(ce(n,p.current))}});let m=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:2}),h=new Intl.NumberFormat(n,{maximumFractionDigits:2}),g=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:2}),v=u?u.bids/(u.bids+u.asks||1):.5,y=2*v-1;return(0,F.jsxs)(`div`,{ref:o,style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsx)(a,{"aria-label":e(`band`),direction:`horizontal`,value:s,onChange:e=>{l(Number(e));let t=i.current?.getInstance()?.getStore();t&&d(ce(t,Number(e)))},children:ue.map(t=>(0,F.jsx)(c,{value:t,label:e(`plusMinus`,{value:m.format(t)})},t))}),(0,F.jsx)(_,{ref:i,range:s,height:300,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,F.jsxs)(`div`,{"aria-hidden":`true`,style:{display:`flex`,height:8,borderRadius:4,overflow:`hidden`,background:`var(--border-color)`},children:[(0,F.jsx)(`div`,{style:{width:`${v*100}%`,background:`var(--success-color)`,transition:`width 0.4s`}}),(0,F.jsx)(`div`,{style:{flex:1,background:`var(--danger-color)`}})]}),(0,F.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:u?e(`imbalanceStatus`,{band:e(`plusMinus`,{value:m.format(s)}),bids:h.format(u.bids),asks:h.format(u.asks),imbalance:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0,signDisplay:`exceptZero`}).format(y),spread:g.format(u.spread),spreadBp:g.format(u.spreadBp)}):e(`imbalanceWaiting`)})]})}var P,F,ue;function de(){return(de=e((()=>{P=t(),i(),o(),s(),S(),b(),F=n(),ue=[5e-4,.001,.002]})))()}function fe(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,I.useRef)(null),n=(0,I.useRef)(null),[i,a]=(0,I.useState)(!0);return x(n,{seed:2},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)},{interval:10,running:i}),(0,L.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsx)(u,{checked:i,onChange:e=>a(e),label:e(`stream`)}),(0,L.jsx)(_,{ref:t,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var I,L;function R(){return(R=e((()=>{I=t(),i(),l(),S(),b(),L=n()})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),[n]=(0,z.useState)(()=>y({seed:3}).snapshot()),[i,o]=(0,z.useState)(`0.001`),[s,l]=(0,z.useState)(null),[u,d]=(0,z.useState)(`base`),[f,p]=(0,z.useState)(`step`),m=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:2});return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsx)(a,{"aria-label":e(`range`),direction:`horizontal`,value:i,onChange:e=>{o(String(e)),l(null)},children:V.map(t=>(0,B.jsx)(c,{value:t,label:t===`auto`?e(`auto`):e(`plusMinus`,{value:m.format(Number(t))})},t))}),(0,B.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,B.jsxs)(a,{"aria-label":e(`amountAxis`),direction:`horizontal`,value:u,onChange:e=>d(e),children:[(0,B.jsx)(c,{value:`base`,label:e(`base`)}),(0,B.jsx)(c,{value:`quote`,label:e(`quote`)})]}),(0,B.jsxs)(a,{"aria-label":e(`curve`),direction:`horizontal`,value:f,onChange:e=>p(e),children:[(0,B.jsx)(c,{value:`step`,label:e(`step`)}),(0,B.jsx)(c,{value:`linear`,label:e(`linear`)})]})]}),(0,B.jsx)(_,{book:n,range:i===`auto`?void 0:Number(i),amount:u,curve:f,onRangeChange:l,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,B.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:s===null?e(`zoomHint`):e(`zoomed`,{value:e(`plusMinus`,{value:m.format(s)})})})]})}var z,B,V;function me(){return(me=e((()=>{z=t(),i(),o(),s(),S(),b(),B=n(),V=[`auto`,`0.0005`,`0.001`,`0.002`,`0.004`]})))()}function he(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,H.useRef)(null),n=(0,H.useRef)(null),[i,o]=(0,H.useState)(`red-up`);return x(n,{seed:6},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)}),(0,U.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,U.jsxs)(a,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>o(e),children:[(0,U.jsx)(c,{value:`red-up`,label:e(`redUp`)}),(0,U.jsx)(c,{value:`green-up`,label:e(`greenUp`)})]}),(0,U.jsx)(_,{ref:t,colorConvention:i,height:320,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var H,U;function ge(){return(ge=e((()=>{H=t(),i(),o(),s(),S(),b(),U=n()})))()}function _e(e,t){let n=0,r=0,i=NaN,a=0;for(let[o,s]of e){if(n>=t)break;let e=Math.min(s,t-n);n+=e,r+=e*o,i=o,a++}return{filled:n,cost:r,average:n?r/n:NaN,worst:i,levels:a}}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),n=t.language,i=(0,W.useMemo)(()=>y({seed:14}).snapshot(),[]),[o,s]=(0,W.useState)(`buy`),[l,u]=(0,W.useState)(5),d=(i.bids[0][0]+i.asks[0][0])/2,f=(0,W.useMemo)(()=>_e(o===`buy`?i.asks:i.bids,l),[i,o,l]),p=f.filled>=l-1e-9,m=Math.abs(f.worst/d-1),h=e(`averageFill`),g=e(`worstFill`),v=(0,W.useMemo)(()=>[{price:f.average,label:h,color:`var(--primary-color)`},{price:f.worst,label:g,color:`var(--warning-color)`}],[f,h,g]),b=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),x=new Intl.NumberFormat(n,{maximumFractionDigits:4}),S=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),C=new Intl.NumberFormat(n,{maximumFractionDigits:1}),w=Math.abs(f.average/d-1)*1e4;return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,G.jsxs)(a,{"aria-label":e(`orderSide`),direction:`horizontal`,value:o,onChange:e=>s(e),children:[(0,G.jsx)(c,{value:`buy`,label:e(`marketBuy`)}),(0,G.jsx)(c,{value:`sell`,label:e(`marketSell`)})]}),(0,G.jsx)(a,{"aria-label":e(`orderSize`),direction:`horizontal`,value:l,onChange:e=>u(Number(e)),children:ye.map(t=>(0,G.jsx)(c,{value:t,label:e(`btcAmount`,{value:x.format(t)})},t))})]}),(0,G.jsx)(_,{book:i,range:Math.max(5e-4,m*1.4),priceLines:v,height:320,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,G.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:e(p?`fillSummary`:`fillPartial`,{size:x.format(l),filled:x.format(f.filled),levels:f.levels,average:b.format(f.average),worst:b.format(f.worst),cost:S.format(f.cost),slippage:C.format(w)})})]})}var W,G,ye;function be(){return(be=e((()=>{W=t(),i(),o(),s(),S(),b(),G=n(),ye=[1,5,25,100]})))()}function xe(e){let t=t=>{let n=new Map;for(let r of e)for(let[e,i]of r[t])n.set(e,(n.get(e)??0)+i);return[...n]};return{bids:t(`bids`),asks:t(`asks`)}}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),n=t.language,[i,o]=(0,K.useState)(`all`),s=(0,K.useMemo)(()=>{let e=Object.fromEntries(J.map(({id:e,seed:t,scale:n})=>{let{bids:r,asks:i}=y({seed:t}).snapshot(),a=e=>e.map(([e,t])=>[e,t*n]);return[e,{bids:a(r),asks:a(i)}]}));return{...e,all:xe(Object.values(e))}},[]),l=(0,K.useMemo)(()=>[`all`,...J.map(e=>e.id)].map(e=>{let{bids:t,asks:n}=s[e],r=Math.max(...t.map(([e])=>e)),i=Math.min(...n.map(([e])=>e)),a=(r+i)/2;return{id:e,bid:r,ask:i,depth:Y(t,a)+Y(n,a)}}),[s]),u=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),d=new Intl.NumberFormat(n,{maximumFractionDigits:2}),p=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),m=l[0].depth,h=t=>t===`all`?e(`consolidated`):e(`venue`,{name:t.toUpperCase()}),g=[{key:`venue`,header:e(`venueColumn`),render:e=>h(e.id)},{key:`bid`,header:e(`bestBid`),align:`right`,render:e=>u.format(e.bid)},{key:`ask`,header:e(`bestAsk`),align:`right`,render:e=>u.format(e.ask)},{key:`depth`,header:e(`depthNearMid`),align:`right`,render:t=>t.id===`all`?d.format(t.depth):e(`depthShare`,{value:d.format(t.depth),share:p.format(t.depth/m)})}];return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsx)(a,{"aria-label":e(`venueColumn`),direction:`horizontal`,value:i,onChange:e=>o(e),children:l.map(e=>(0,q.jsx)(c,{value:e.id,label:h(e.id)},e.id))}),(0,q.jsx)(_,{book:s[i],range:.002,height:300,pricePrecision:1,sizePrecision:4,ariaLabel:e(`venuesAria`,{name:h(i)})}),(0,q.jsx)(f,{"aria-label":e(`venuesTable`),size:`small`,columns:g,data:l,rowKey:e=>e.id})]})}var K,q,J,Y;function Ce(){return(Ce=e((()=>{K=t(),i(),o(),s(),d(),S(),b(),q=n(),J=[{id:`a`,seed:41,scale:1.6},{id:`b`,seed:42,scale:1},{id:`c`,seed:43,scale:.5}],Y=(e,t,n=.001)=>e.reduce((e,[r,i])=>Math.abs(r/t-1)<=n?e+i:e,0)})))()}function we(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),n=t.language,[i]=(0,X.useState)(()=>{let{bids:e,asks:t}=y({seed:12}).snapshot();return{bids:Q(e,Te),asks:Q(t,Ee)}}),[a,o]=(0,X.useState)(null),s=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),c=new Intl.NumberFormat(n,{maximumFractionDigits:3}),l=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2}),u=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:3});return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsx)(_,{book:i,height:340,range:.003,onHover:o,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,Z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(a.side===`ask`?`sweepBuy`:`sweepSell`,{amount:c.format(a.amount),price:s.format(a.price),total:l.format(a.total),average:s.format(a.average),slippage:u.format(Math.abs(a.distance))}):e(`sweepHint`)})]})}var X,Z,Te,Ee,Q;function De(){return(De=e((()=>{X=t(),i(),S(),b(),Z=n(),Te=new Map([[80,140],[330,260]]),Ee=new Map([[140,180],[420,320]]),Q=(e,t)=>e.map(([e,n],r)=>[e,t.get(r)??n])})))()}var Oe;function ke(){return(ke=e((()=>{Oe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  // a BTC/USDT book: [price, size] levels, best first
  const book = useMemo(() => createMarketFeed({ seed: 1 }).snapshot(), []);
  return (
    <DepthChart
      book={book}
      height={340}
      pricePrecision={1}
      sizePrecision={4}
      ariaLabel={t("aria")}
    />
  );
}
`})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 5 },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => chartRef.current?.applyDeltas(delta),
    },
  );

  // a phone-sized card: no legend, smaller texts; pinch to zoom, tap to read
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 360 }}>
      <DepthChart
        ref={chartRef}
        height={190}
        legend={false}
        fontSize={10}
        range={0.003}
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { useMemo, useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** Price the simulated market starts at (BTC/USDT) */
const PRICE = 64000;

// a trading terminal palette, read by the chart from these variables
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
  padding: 12,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 4, price: PRICE },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => chartRef.current?.applyDeltas(delta),
    },
  );

  // your resting orders and the liquidation price of a position
  const myBid = t("myBid");
  const myAsk = t("myAsk");
  const liquidation = t("liquidation");
  const priceLines = useMemo(
    () => [
      { price: Math.round(PRICE * 0.9992), label: myBid, color: "#0ecb81" },
      { price: Math.round(PRICE * 1.0012), label: myAsk, color: "#f6465d" },
      {
        price: Math.round(PRICE * 0.9978),
        label: liquidation,
        color: "#f0b90b",
      },
    ],
    [myBid, myAsk, liquidation],
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <DepthChart
        ref={chartRef}
        height={360}
        range={0.003}
        priceLines={priceLines}
        fillOpacity={0.35}
        pricePrecision={1}
        sizePrecision={4}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Pe;function Fe(){return(Fe=e((()=>{Pe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { DepthChart, type OrderBookLevel } from "minerva-design/charts";
import { mulberry32 } from "../../order-book/feed";

/**
 * A US equity book: one-cent ticks, sizes in round lots of 100 shares,
 * more shares resting on whole and half dollars
 */
function equityBook(seed: number, bidCents: number, levels: number) {
  const random = mulberry32(seed);
  const side = (from: number, step: 1 | -1): OrderBookLevel[] =>
    Array.from({ length: levels }, (_, i) => {
      const cents = from + step * i;
      const round = cents % 100 === 0 ? 8 : cents % 50 === 0 ? 4 : 1;
      const lots = Math.ceil((0.2 + random() ** 3 * 12) * round);
      return [cents / 100, lots * 100];
    });
  return { bids: side(bidCents, -1), asks: side(bidCents + 2, 1) };
}

export default function EquityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  // bid $228.44, ask $228.46
  const book = useMemo(() => equityBook(17, 22844, 300), []);
  const [notional, setNotional] = useState(false);

  // dollars with cents and compact share counts, in the page language
  const formatPrice = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    });
    return (value: number) => usd.format(value);
  }, [locale]);
  const formatSize = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => compact.format(value);
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={notional}
        onChange={(checked) => setNotional(checked)}
        label={t("showNotional")}
      />
      <DepthChart
        book={book}
        range={0.008}
        // cumulate shares, or dollars (price × shares)
        amount={notional ? "quote" : "base"}
        formatPrice={formatPrice}
        formatSize={formatSize}
        labels={{ amount: notional ? t("notionalUsd") : t("shares") }}
        height={320}
        ariaLabel={t("equityAria")}
      />
    </div>
  );
}
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  DepthChart,
  type DepthChartHandle,
  type OrderBookStore,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** Bands around the mid, as fractions (0.001 = ±0.1%) */
const BANDS = [0.0005, 0.001, 0.002];

interface Reading {
  spread: number;
  spreadBp: number;
  bids: number;
  asks: number;
}

/** Size resting within \`band\` of the mid on each side */
function read(store: OrderBookStore, band: number): Reading | null {
  const mid = store.mid();
  if (Number.isNaN(mid)) return null;
  const sum = (side: "bid" | "ask") => {
    let total = 0;
    for (let i = 0; i < store.count(side); i++) {
      const price = store.priceAt(side, i);
      if (Math.abs(price / mid - 1) > band) break;
      total += store.sizeAt(side, i);
    }
    return total;
  };
  return {
    spread: store.spread(),
    spreadBp: (store.spread() / mid) * 1e4,
    bids: sum("bid"),
    asks: sum("ask"),
  };
}

export default function ImbalanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [band, setBand] = useState(0.001);
  const [reading, setReading] = useState<Reading | null>(null);
  const readAt = useRef(0);
  const bandRef = useRef(band);
  useEffect(() => {
    bandRef.current = band;
  });

  // a fresh market on every mount; the readout comes from the chart's own
  // store (getInstance().getStore()), once a second
  useMarketStream(
    boxRef,
    { seed: 15 },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => {
        chartRef.current?.applyDeltas(delta);
        const now = performance.now();
        if (now - readAt.current < 1000) return;
        readAt.current = now;
        const store = chartRef.current?.getInstance()?.getStore();
        if (store) setReading(read(store, bandRef.current));
      },
    },
  );

  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 2,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const decimal = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  const share = reading
    ? reading.bids / (reading.bids + reading.asks || 1)
    : 0.5;
  const imbalance = 2 * share - 1;

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("band")}
        direction="horizontal"
        value={band}
        onChange={(value) => {
          setBand(Number(value));
          const store = chartRef.current?.getInstance()?.getStore();
          if (store) setReading(read(store, Number(value)));
        }}
      >
        {BANDS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("plusMinus", { value: percent.format(value) })}
          />
        ))}
      </RadioGroup>
      <DepthChart
        ref={chartRef}
        // the chart shows exactly the band that is measured
        range={band}
        height={300}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      {/* bid share of the liquidity within the band */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
          background: "var(--border-color)",
        }}
      >
        <div
          style={{
            width: \`\${share * 100}%\`,
            background: "var(--success-color)",
            transition: "width 0.4s",
          }}
        />
        <div style={{ flex: 1, background: "var(--danger-color)" }} />
      </div>
      <output
        aria-live="polite"
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {reading
          ? t("imbalanceStatus", {
              band: t("plusMinus", { value: percent.format(band) }),
              bids: btc.format(reading.bids),
              asks: btc.format(reading.asks),
              imbalance: new Intl.NumberFormat(locale, {
                style: "percent",
                maximumFractionDigits: 0,
                signDisplay: "exceptZero",
              }).format(imbalance),
              spread: decimal.format(reading.spread),
              spreadBp: decimal.format(reading.spreadBp),
            })
          : t("imbalanceWaiting")}
      </output>
    </div>
  );
}
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);

  // a fresh market on every mount; ~100 deltas a second: the chart eases
  // to the latest book once per frame
  useMarketStream(
    boxRef,
    { seed: 2 },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => chartRef.current?.applyDeltas(delta),
    },
    { interval: 10, running },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={running}
        onChange={(checked) => setRunning(checked)}
        label={t("stream")}
      />
      <DepthChart
        ref={chartRef}
        height={340}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { DepthChart } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

const RANGES = ["auto", "0.0005", "0.001", "0.002", "0.004"];

export default function RangeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const [book] = useState(() => createMarketFeed({ seed: 3 }).snapshot());
  const [range, setRange] = useState("0.001");
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [amount, setAmount] = useState<"base" | "quote">("base");
  const [curve, setCurve] = useState<"step" | "linear">("step");
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 2,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("range")}
        direction="horizontal"
        value={range}
        onChange={(value) => {
          setRange(String(value));
          setZoomed(null);
        }}
      >
        {RANGES.map((value) => (
          <Radio
            key={value}
            value={value}
            label={
              value === "auto"
                ? t("auto")
                : t("plusMinus", { value: percent.format(Number(value)) })
            }
          />
        ))}
      </RadioGroup>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("amountAxis")}
          direction="horizontal"
          value={amount}
          onChange={(value) => setAmount(value as "base" | "quote")}
        >
          <Radio value="base" label={t("base")} />
          <Radio value="quote" label={t("quote")} />
        </RadioGroup>
        <RadioGroup
          aria-label={t("curve")}
          direction="horizontal"
          value={curve}
          onChange={(value) => setCurve(value as "step" | "linear")}
        >
          <Radio value="step" label={t("step")} />
          <Radio value="linear" label={t("linear")} />
        </RadioGroup>
      </div>
      <DepthChart
        book={book}
        // half width around the mid: 0.001 = mid ± 0.1% (undefined fits the book)
        range={range === "auto" ? undefined : Number(range)}
        amount={amount}
        curve={curve}
        onRangeChange={setZoomed}
        height={340}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {zoomed === null
          ? t("zoomHint")
          : t("zoomed", {
              value: t("plusMinus", { value: percent.format(zoomed) }),
            })}
      </span>
    </div>
  );
}
`})))()}var $;function He(){return(He=e((()=>{$=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  DepthChart,
  type DepthChartHandle,
  type OrderBookColorConvention,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 6 },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => chartRef.current?.applyDeltas(delta),
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
      <DepthChart
        ref={chartRef}
        // red bids, green asks
        colorConvention={convention}
        height={320}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { DepthChart, type OrderBookLevel } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

/** Market order sizes, in BTC */
const SIZES = [1, 5, 25, 100];

interface Fill {
  /** Size the book can fill */
  filled: number;
  /** Notional paid (buy) or received (sell) */
  cost: number;
  /** Average fill price */
  average: number;
  /** Price of the last level touched */
  worst: number;
  /** Levels consumed */
  levels: number;
}

/** Walks one side of the book from the best level until \`size\` is filled */
function sweep(levels: readonly OrderBookLevel[], size: number): Fill {
  let filled = 0;
  let cost = 0;
  let worst = Number.NaN;
  let count = 0;
  for (const [price, available] of levels) {
    if (filled >= size) break;
    const take = Math.min(available, size - filled);
    filled += take;
    cost += take * price;
    worst = price;
    count++;
  }
  return {
    filled,
    cost,
    average: filled ? cost / filled : Number.NaN,
    worst,
    levels: count,
  };
}

export default function SlippageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  // a BTC/USDT book, best levels first
  const book = useMemo(() => createMarketFeed({ seed: 14 }).snapshot(), []);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [size, setSize] = useState(5);

  const mid = (book.bids[0][0] + book.asks[0][0]) / 2;
  // a buy lifts the asks, a sell hits the bids
  const fill = useMemo(
    () => sweep(side === "buy" ? book.asks : book.bids, size),
    [book, side, size],
  );
  const complete = fill.filled >= size - 1e-9;
  const impact = Math.abs(fill.worst / mid - 1);

  const averageLabel = t("averageFill");
  const worstLabel = t("worstFill");
  const priceLines = useMemo(
    () => [
      {
        price: fill.average,
        label: averageLabel,
        color: "var(--primary-color)",
      },
      { price: fill.worst, label: worstLabel, color: "var(--warning-color)" },
    ],
    [fill, averageLabel, worstLabel],
  );

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 4 });
  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const bp = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  // distance of the average fill from the mid, in basis points
  const slippage = Math.abs(fill.average / mid - 1) * 1e4;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("orderSide")}
          direction="horizontal"
          value={side}
          onChange={(value) => setSide(value as "buy" | "sell")}
        >
          <Radio value="buy" label={t("marketBuy")} />
          <Radio value="sell" label={t("marketSell")} />
        </RadioGroup>
        <RadioGroup
          aria-label={t("orderSize")}
          direction="horizontal"
          value={size}
          onChange={(value) => setSize(Number(value))}
        >
          {SIZES.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t("btcAmount", { value: btc.format(value) })}
            />
          ))}
        </RadioGroup>
      </div>
      <DepthChart
        book={book}
        // wide enough to show the last level the order reaches
        range={Math.max(0.0005, impact * 1.4)}
        priceLines={priceLines}
        height={320}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <output
        aria-live="polite"
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t(complete ? "fillSummary" : "fillPartial", {
          size: btc.format(size),
          filled: btc.format(fill.filled),
          levels: fill.levels,
          average: price.format(fill.average),
          worst: price.format(fill.worst),
          cost: usd.format(fill.cost),
          slippage: bp.format(slippage),
        })}
      </output>
    </div>
  );
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Table, type TableColumn } from "minerva-design";
import { DepthChart, type OrderBookLevel } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

/** Three venues quoting BTC/USDT: seed of the book and its liquidity scale */
const VENUES = [
  { id: "a", seed: 41, scale: 1.6 },
  { id: "b", seed: 42, scale: 1 },
  { id: "c", seed: 43, scale: 0.5 },
] as const;

type VenueId = (typeof VENUES)[number]["id"];
type Book = { bids: OrderBookLevel[]; asks: OrderBookLevel[] };

/** Sums the sizes of several books price by price */
function consolidate(books: readonly Book[]): Book {
  const merge = (side: "bids" | "asks") => {
    const sizes = new Map<number, number>();
    for (const book of books)
      for (const [price, size] of book[side])
        sizes.set(price, (sizes.get(price) ?? 0) + size);
    return [...sizes];
  };
  return { bids: merge("bids"), asks: merge("asks") };
}

/** Size resting within \`band\` of the mid */
const depthWithin = (
  levels: readonly OrderBookLevel[],
  mid: number,
  band = 0.001,
) =>
  levels.reduce(
    (sum, [price, size]) =>
      Math.abs(price / mid - 1) <= band ? sum + size : sum,
    0,
  );

interface Row {
  id: VenueId | "all";
  bid: number;
  ask: number;
  depth: number;
}

export default function VenuesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  const [venue, setVenue] = useState<VenueId | "all">("all");

  const books = useMemo(() => {
    const venues = Object.fromEntries(
      VENUES.map(({ id, seed, scale }) => {
        const { bids, asks } = createMarketFeed({ seed }).snapshot();
        const scaled = (levels: OrderBookLevel[]): OrderBookLevel[] =>
          levels.map(([price, size]) => [price, size * scale]);
        return [id, { bids: scaled(bids), asks: scaled(asks) }];
      }),
    ) as Record<VenueId, Book>;
    return { ...venues, all: consolidate(Object.values(venues)) };
  }, []);

  const rows = useMemo(
    (): Row[] =>
      (["all", ...VENUES.map((v) => v.id)] as const).map((id) => {
        const { bids, asks } = books[id];
        const bid = Math.max(...bids.map(([price]) => price));
        const ask = Math.min(...asks.map(([price]) => price));
        const mid = (bid + ask) / 2;
        return {
          id,
          bid,
          ask,
          depth: depthWithin(bids, mid) + depthWithin(asks, mid),
        };
      }),
    [books],
  );

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const total = rows[0].depth;
  const name = (id: VenueId | "all") =>
    id === "all" ? t("consolidated") : t("venue", { name: id.toUpperCase() });

  const columns: TableColumn<Row>[] = [
    { key: "venue", header: t("venueColumn"), render: (row) => name(row.id) },
    {
      key: "bid",
      header: t("bestBid"),
      align: "right",
      render: (row) => price.format(row.bid),
    },
    {
      key: "ask",
      header: t("bestAsk"),
      align: "right",
      render: (row) => price.format(row.ask),
    },
    {
      key: "depth",
      header: t("depthNearMid"),
      align: "right",
      render: (row) =>
        row.id === "all"
          ? btc.format(row.depth)
          : t("depthShare", {
              value: btc.format(row.depth),
              share: percent.format(row.depth / total),
            }),
    },
  ];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("venueColumn")}
        direction="horizontal"
        value={venue}
        onChange={(value) => setVenue(value as VenueId | "all")}
      >
        {rows.map((row) => (
          <Radio key={row.id} value={row.id} label={name(row.id)} />
        ))}
      </RadioGroup>
      <DepthChart
        // a new book object: the chart eases from one venue to the other
        book={books[venue]}
        range={0.002}
        height={300}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("venuesAria", { name: name(venue) })}
      />
      <Table
        aria-label={t("venuesTable")}
        size="small"
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
      />
    </div>
  );
}
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DepthChart,
  type DepthChartHoverEvent,
  type OrderBookLevel,
} from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

/** Large resting orders ("walls"): level index from the best → size in BTC */
const BID_WALLS = new Map([
  [80, 140],
  [330, 260],
]);
const ASK_WALLS = new Map([
  [140, 180],
  [420, 320],
]);

const withWalls = (
  levels: readonly OrderBookLevel[],
  walls: Map<number, number>,
): OrderBookLevel[] =>
  levels.map(([price, size], i) => [price, walls.get(i) ?? size]);

export default function WallsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  // walls show up as cliffs of the curves
  const [book] = useState(() => {
    const { bids, asks } = createMarketFeed({ seed: 12 }).snapshot();
    return {
      bids: withWalls(bids, BID_WALLS),
      asks: withWalls(asks, ASK_WALLS),
    };
  });
  const [hover, setHover] = useState<DepthChartHoverEvent | null>(null);

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 3,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <DepthChart
        book={book}
        height={340}
        range={0.003}
        onHover={setHover}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      {/* what a market order sweeping to the hovered price would cost */}
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {hover
          ? t(hover.side === "ask" ? "sweepBuy" : "sweepSell", {
              amount: size.format(hover.amount),
              price: price.format(hover.price),
              total: usd.format(hover.total),
              average: price.format(hover.average),
              slippage: percent.format(Math.abs(hover.distance)),
            })
          : t("sweepHint")}
      </span>
    </div>
  );
}
`})))()}var Ye,Xe,Ze;function Qe(){return(Qe=e((()=>{te(),re(),j(),se(),de(),R(),me(),ge(),be(),Ce(),De(),ke(),je(),Ne(),Fe(),Le(),ze(),Ve(),He(),We(),Ke(),Je(),t(),m(),g(),Ye=n(),Xe=p(Object.assign({"./demos/basic.tsx":C,"./demos/compact.tsx":ne,"./demos/dark.tsx":ie,"./demos/equity.tsx":oe,"./demos/imbalance.tsx":le,"./demos/live.tsx":fe,"./demos/range.tsx":pe,"./demos/red-up.tsx":he,"./demos/slippage.tsx":ve,"./demos/venues.tsx":Se,"./demos/walls.tsx":we}),Object.assign({"./demos/basic.tsx":Oe,"./demos/compact.tsx":Ae,"./demos/dark.tsx":Me,"./demos/equity.tsx":Pe,"./demos/imbalance.tsx":Ie,"./demos/live.tsx":Re,"./demos/range.tsx":Be,"./demos/red-up.tsx":$,"./demos/slippage.tsx":Ue,"./demos/venues.tsx":Ge,"./demos/walls.tsx":qe})),Ze=()=>(0,Ye.jsx)(h,{id:`depth-chart`,demos:Xe})})))()}Qe();export{Ze as default};