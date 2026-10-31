import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{i as s,n as c,r as l,t as u}from"./Radio-D2wZ9q6z.js";import{n as d,t as f}from"./Switch-BCh7GKwc.js";import{i as p,r as m}from"./DemoBlock-BXdX6oLT.js";import{l as h,n as g,t as _,u as v}from"./DocPage-CHJwIegD.js";import{a as y,c as b,f as x,l as ee,o as S,r as C,t as w,u as T}from"./feed-YwnTBj_b.js";function te(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,E.useRef)(null),n=(0,E.useRef)(null);return S(n,t,{seed:21},12e4),(0,D.jsx)(`div`,{ref:n,style:{width:`100%`},children:(0,D.jsx)(b,{ref:t,height:400,interval:250,window:12e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var E,D;function ne(){return(ne=e((()=>{E=t(),i(),T(),C(),D=n()})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,O.useRef)(null),i=(0,O.useRef)(null),[a,o]=(0,O.useState)(`sqrt`),[c,l]=(0,O.useState)(1);S(i,n,{seed:23,whales:.015},6e4);let d=new Intl.NumberFormat(t.language);return(0,k.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,k.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,k.jsxs)(s,{"aria-label":e(`scale`),direction:`horizontal`,value:a,onChange:e=>o(e),children:[(0,k.jsx)(u,{value:`sqrt`,label:e(`scaleSqrt`)}),(0,k.jsx)(u,{value:`linear`,label:e(`scaleLinear`)}),(0,k.jsx)(u,{value:`log`,label:e(`scaleLog`)})]}),(0,k.jsx)(s,{"aria-label":e(`contrast`),direction:`horizontal`,value:c,onChange:e=>l(Number(e)),children:ie.map(t=>(0,k.jsx)(u,{value:t,label:e(`times`,{value:d.format(t)})},t))})]}),(0,k.jsx)(b,{ref:n,height:380,colorScale:a,contrast:c,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var O,k,ie;function ae(){return(ae=e((()=>{O=t(),i(),c(),l(),T(),C(),k=n(),ie=[.5,1,2,4]})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,A.useRef)(null),n=(0,A.useRef)(null);return S(n,t,{seed:25},3e4),(0,j.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,j.jsx)(b,{ref:t,height:240,interval:150,window:3e4,profile:!1,bubbleSize:16,fontSize:10,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var A,j;function se(){return(se=e((()=>{A=t(),i(),T(),C(),j=n()})))()}function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,M.useRef)(null),n=(0,M.useRef)(null);return S(n,t,{seed:24,whales:.012},9e4),(0,N.jsx)(`div`,{ref:n,style:le,children:(0,N.jsx)(b,{ref:t,height:420,colors:ue,contrast:.7,timeZone:`utc`,interval:200,window:9e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var M,N,le,ue;function de(){return(de=e((()=>{M=t(),i(),T(),C(),N=n(),le={"--background-color":`#06080d`,"--surface-color":`#06080d`,"--surface-elevated-color":`#151a22`,"--text-color":`#e6e8eb`,"--text-secondary-color":`#7d8590`,"--border-color":`#262c36`,"--success-color":`#26d07c`,"--danger-color":`#ff4d6a`,background:`#06080d`,color:`#e6e8eb`,borderRadius:12,padding:8,width:`100%`,boxSizing:`border-box`},ue=[`#050b18`,`#0a2a5c`,`#0f6fb5`,`#19c2d6`,`#f5e663`,`#ff9a1f`,`#ff3b1f`]})))()}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,P.useRef)(null),i=(0,P.useRef)(null),[a,o]=(0,P.useState)(null);S(i,n,{seed:27,whales:.03,activity:180},9e4);let s=new Intl.NumberFormat(t.language,{maximumFractionDigits:3});return(0,F.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsx)(b,{ref:n,height:400,interval:1e3,window:9e4,bubbleSize:30,bubbleVolume:12,contrast:.6,onHover:o,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,F.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(`volumeAt`,{buys:s.format(a.buyVolume),sells:s.format(a.sellVolume)}):e(`volumeHint`)})]})}var P,F;function pe(){return(pe=e((()=>{P=t(),i(),T(),C(),F=n()})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,I.useRef)(null),a=(0,I.useRef)(null),o=(0,I.useRef)(null),s=(0,I.useRef)(null),c=(0,I.useRef)(null),[l,u]=(0,I.useState)({last:NaN,spread:NaN,trades:0}),d=(0,I.useRef)(0);(0,I.useEffect)(()=>{let e=i.current,t=o.current;if(!e)return;let{feed:n,snapshot:r,updates:s}=w({seed:34},6e4);e.clear(),e.setBook(r);for(let{delta:t,trades:n}of s)e.applyDeltas(t),e.addTrades(n);return t?.setTrades(s.flatMap(e=>e.trades)),a.current?.setBook(n.snapshot()),a.current?.setLastPrice(n.last()),c.current=n,()=>{c.current=null,e.clear(),t?.clear()}},[]),y(s,e=>{let t=c.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r),a.current?.applyDeltas(n),r.length&&(a.current?.setLastPrice(t.last()),o.current?.addTrades(r));let s=performance.now();if(s-d.current<250)return;d.current=s;let l=i.current?.getInstance()?.getStore();u({last:t.last(),spread:l?l.spread():NaN,trades:o.current?.getInstance()?.getCount()??0})});let f=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),p=new Intl.NumberFormat(n);return(0,L.jsxs)(`div`,{ref:s,style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px 16px`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,L.jsx)(`strong`,{children:e(`pair`)}),(0,L.jsx)(`span`,{children:e(`lastPrice`,{value:Number.isNaN(l.last)?`…`:f.format(l.last)})}),(0,L.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`spreadIs`,{value:Number.isNaN(l.spread)?`…`:f.format(l.spread)})}),(0,L.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`tradesOnTape`,{value:p.format(l.trades)})})]}),(0,L.jsx)(b,{ref:i,height:320,interval:250,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`},children:[(0,L.jsx)(ee,{ref:a,height:300,pricePrecision:1,sizePrecision:4,ariaLabel:e(`bookAria`)}),(0,L.jsx)(x,{ref:o,height:300,aggregate:!0,largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`tapeAria`)})]})]})}var I,L;function he(){return(he=e((()=>{I=t(),i(),T(),C(),L=n()})))()}function ge(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,R.useRef)(null),n=(0,R.useRef)(null),[i,a]=(0,R.useState)(null),[s,c]=(0,R.useState)(!0);return S(n,t,{seed:22,activity:200},15e3,{step:10,interval:10}),(0,z.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsx)(b,{ref:t,height:400,interval:50,window:15e3,onRendererChange:a,onFollowChange:c,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,color:`var(--text-secondary-color)`,fontSize:13},children:[(0,z.jsx)(`span`,{children:e(`rendererIs`,{value:i?e(`renderers.${i}`):`…`})}),(0,z.jsx)(`span`,{children:e(s?`following`:`panned`)}),(0,z.jsx)(o,{size:`small`,variant:`outline`,disabled:s,onClick:()=>t.current?.resetView(),children:e(`followMarket`)})]})]})}var R,z;function _e(){return(_e=e((()=>{R=t(),i(),a(),T(),C(),z=n()})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,B.useRef)(null),a=(0,B.useRef)(null),[o,s]=(0,B.useState)(null),[c,l]=(0,B.useState)(null);S(a,i,{seed:35},9e4,{interval:50}),(0,B.useEffect)(()=>{let e=setInterval(()=>l(Date.now()),1e3);return()=>clearInterval(e)},[]);let{formatPrice:u,formatSize:d,contracts:f,usd:p}=(0,B.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,minimumFractionDigits:1,maximumFractionDigits:1}),t=new Intl.NumberFormat(n,{notation:`compact`,maximumFractionDigits:1}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2});return{formatPrice:t=>e.format(t),formatSize:e=>t.format(e/H),contracts:e=>t.format(Math.round(e/H)),usd:e=>r.format(e)}},[n]),m=c===null?null:Math.ceil(c/U)*U,h=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,timeZone:`UTC`,timeZoneName:`short`}),g=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hourCycle:`h23`,timeZone:`UTC`}),_=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:4,signDisplay:`always`});return(0,V.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,V.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px 16px`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,V.jsx)(`strong`,{children:e(`perpName`)}),(0,V.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`contractSize`,{value:new Intl.NumberFormat(n).format(H)})}),(0,V.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:m===null||c===null?e(`fundingRate`,{rate:_.format(W)}):e(`funding`,{rate:_.format(W),time:h.format(m),countdown:g.format(m-c)})})]}),(0,V.jsx)(b,{ref:i,height:380,interval:250,window:9e4,formatPrice:u,formatSize:d,sizeUnit:e(`contracts`),timeZone:`utc`,labels:{liquidity:e(`restingContracts`),buys:e(`takerBuys`),sells:e(`takerSells`)},onHover:s,ariaLabel:e(`perpAria`)}),(0,V.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:o?e(`perpReadout`,{price:u(o.price),contracts:f(o.size),notional:p(o.size*o.price)}):e(`perpHint`)})]})}var B,V,H,U,W;function ye(){return(ye=e((()=>{B=t(),i(),T(),C(),V=n(),H=.001,U=288e5,W=1e-4})))()}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,G.useRef)(null),a=(0,G.useRef)(null),o=(0,G.useRef)(null),[c,l]=(0,G.useState)(0),[d,f]=(0,G.useState)(0),[p,m]=(0,G.useState)(null);(0,G.useEffect)(()=>{let e=i.current;if(!e)return;let{feed:t,snapshot:n,updates:r}=w({seed:31},12e4);e.clear(),e.setBook(n);for(let{delta:t,trades:n}of r)e.applyDeltas(t),e.addTrades(n);return o.current=t,()=>{o.current=null,e.clear()}},[c]),y(a,e=>{let t=o.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r)});let h=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),g=new Intl.NumberFormat(n),_=new Intl.NumberFormat(n,{maximumFractionDigits:3}),v=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`});return(0,K.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,K.jsx)(s,{"aria-label":e(`rowHeight`),direction:`horizontal`,value:c,onChange:e=>l(Number(e)),children:xe.map(t=>(0,K.jsx)(u,{value:t,label:t?e(`usdtValue`,{value:g.format(t)}):e(`auto`)},t))}),(0,K.jsx)(s,{"aria-label":e(`priceSpan`),direction:`horizontal`,value:d,onChange:e=>f(Number(e)),children:Se.map(t=>(0,K.jsx)(u,{value:t,label:t?e(`usdtValue`,{value:g.format(t)}):e(`fitBook`)},t))})]}),(0,K.jsx)(b,{ref:i,height:400,interval:500,window:12e4,tickSize:c||void 0,priceSpan:d||void 0,tooltip:!1,onHover:m,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,K.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:p?e(`cellReadout`,{time:v.format(p.time),price:p.priceHigh>p.price?e(`priceRange`,{low:h.format(p.price),high:h.format(p.priceHigh)}):h.format(p.price),size:_.format(p.size),side:p.side===`bid`?e(`sideBid`):p.side===`ask`?e(`sideAsk`):e(`sideSpread`),buys:_.format(p.buyVolume),sells:_.format(p.sellVolume)}):e(`cellHint`)})]})}var G,K,xe,Se;function Ce(){return(Ce=e((()=>{G=t(),i(),c(),l(),T(),C(),K=n(),xe=[0,1,5],Se=[0,60,250]})))()}function we(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,q.useRef)(null),n=(0,q.useRef)(null),[i,a]=(0,q.useState)(`red-up`);return S(n,t,{seed:26},6e4),(0,J.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,J.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,J.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,J.jsx)(b,{ref:t,colorConvention:i,height:360,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var q,J;function Te(){return(Te=e((()=>{q=t(),i(),c(),l(),T(),C(),J=n()})))()}function Ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,Y.useRef)(null),a=(0,Y.useRef)(null),c=(0,Y.useRef)(null),[l,d]=(0,Y.useState)(12e4),[p,m]=(0,Y.useState)(!0),[h,g]=(0,Y.useState)(``);(0,Y.useEffect)(()=>{let e=i.current;if(!e)return;let{feed:t,snapshot:n,updates:r}=w({seed:33},3e5,200);e.clear(),e.setBook(n);for(let{delta:t,trades:n}of r)e.applyDeltas(t),e.addTrades(n);return c.current=t,()=>{c.current=null,e.clear()}},[]),y(a,e=>{let t=c.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r)},{running:p});let _=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),v=e=>e<6e4?new Intl.NumberFormat(n,{style:`unit`,unit:`second`}).format(e/1e3):new Intl.NumberFormat(n,{style:`unit`,unit:`minute`}).format(e/6e4),x=()=>_.format(c.current?.time()??0);return(0,X.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`8px 24px`},children:[(0,X.jsx)(s,{"aria-label":e(`timeWindow`),direction:`horizontal`,value:l,onChange:e=>{d(Number(e)),g(``)},children:De.map(e=>(0,X.jsx)(u,{value:e,label:v(e)},e))}),(0,X.jsx)(f,{checked:p,onChange:t=>{m(t),g(e(t?`resumedAt`:`pausedAt`,{time:x()}))},label:e(`liveFeed`)}),(0,X.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{let t=c.current;t&&(i.current?.clear(),i.current?.setBook(t.snapshot()),g(e(`clearedAt`,{time:x()})))},children:e(`clearHistory`)})]}),(0,X.jsx)(b,{ref:i,height:400,interval:250,window:l,history:3e5,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,X.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13},children:h||e(`windowStatus`,{window:v(l),history:v(3e5)})})]})}var Y,X,De;function Oe(){return(Oe=e((()=>{Y=t(),i(),a(),c(),l(),d(),T(),C(),X=n(),De=[3e4,12e4,3e5]})))()}var ke;function Ae(){return(Ae=e((()=>{ke=`import { useRef } from "react";
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
`})))()}var je;function Me(){return(Me=e((()=>{je=`import { useRef, useState } from "react";
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
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useRef } from "react";
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
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useRef, type CSSProperties } from "react";
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
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { useRef, useState } from "react";
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
`})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { useRef, useState } from "react";
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
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Z;function qe(){return(qe=e((()=>{Z=`import { useRef, useState } from "react";
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
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Q,Xe,Ze,Qe,$e;function $(){return($=e((()=>{ne(),ae(),se(),de(),pe(),he(),_e(),ye(),Ce(),Te(),Oe(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),qe(),Ye(),t(),i(),g(),p(),v(),Q=n(),Xe=h(Object.assign({"./demos/basic.tsx":te,"./demos/color-scale.tsx":re,"./demos/compact.tsx":oe,"./demos/dark.tsx":ce,"./demos/large-trades.tsx":fe,"./demos/linked.tsx":me,"./demos/live.tsx":ge,"./demos/perpetual.tsx":ve,"./demos/price-resolution.tsx":be,"./demos/red-up.tsx":we,"./demos/time-window.tsx":Ee}),Object.assign({"./demos/basic.tsx":ke,"./demos/color-scale.tsx":je,"./demos/compact.tsx":Ne,"./demos/dark.tsx":Fe,"./demos/large-trades.tsx":Le,"./demos/linked.tsx":ze,"./demos/live.tsx":Ve,"./demos/perpetual.tsx":Ue,"./demos/price-resolution.tsx":Ge,"./demos/red-up.tsx":Z,"./demos/time-window.tsx":Je})),Ze=[`axes`,`color`,`walls`,`lines`,`bubbles`,`profile`],Qe=[`hold`,`pull`,`sweep`,`thin`],$e=()=>{let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.read`}),t=(0,Q.jsxs)(`section`,{className:m.section,"aria-labelledby":`heatmap-read`,children:[(0,Q.jsx)(`h2`,{id:`heatmap-read`,children:e(`title`)}),(0,Q.jsx)(`p`,{className:m.prose,children:e(`text`)}),(0,Q.jsx)(`ul`,{className:m.prose,children:Ze.map(t=>(0,Q.jsx)(`li`,{children:e(t)},t))}),(0,Q.jsx)(`h3`,{children:e(`patterns.title`)}),(0,Q.jsx)(`ul`,{className:m.prose,children:Qe.map(t=>(0,Q.jsx)(`li`,{children:e(`patterns.${t}`)},t))})]});return(0,Q.jsx)(_,{id:`order-book-heatmap`,demos:Xe,intro:t})}})))()}$();export{$e as default};