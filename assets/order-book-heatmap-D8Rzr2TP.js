import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BRiW5KpP.js";import{R as a,z as o}from"./ProgressIndicator-DJBhmBkg.js";import{i as s,n as c,r as l,t as u}from"./Radio-C3NWGnxg.js";import{n as d,t as f}from"./Switch-io2BNxIU.js";import{i as p,r as m}from"./DemoBlock-CuAcq4Nz.js";import{a as h,c as g,f as _,l as v,o as y,r as b,t as x,u as S}from"./feed-CIA5iBC8.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-Cww2i8I2.js";function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,C.useRef)(null),n=(0,C.useRef)(null);return y(n,t,{seed:21},12e4),(0,w.jsx)(`div`,{ref:n,style:{width:`100%`},children:(0,w.jsx)(g,{ref:t,height:400,interval:250,window:12e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var C,w;function ae(){return(ae=e((()=>{C=t(),i(),S(),b(),w=n()})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,T.useRef)(null),i=(0,T.useRef)(null),[a,o]=(0,T.useState)(`sqrt`),[c,l]=(0,T.useState)(1);y(i,n,{seed:23,whales:.015},6e4);let d=new Intl.NumberFormat(t.language);return(0,E.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,E.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,E.jsxs)(s,{"aria-label":e(`scale`),direction:`horizontal`,value:a,onChange:e=>o(e),children:[(0,E.jsx)(u,{value:`sqrt`,label:e(`scaleSqrt`)}),(0,E.jsx)(u,{value:`linear`,label:e(`scaleLinear`)}),(0,E.jsx)(u,{value:`log`,label:e(`scaleLog`)})]}),(0,E.jsx)(s,{"aria-label":e(`contrast`),direction:`horizontal`,value:c,onChange:e=>l(Number(e)),children:se.map(t=>(0,E.jsx)(u,{value:t,label:e(`times`,{value:d.format(t)})},t))})]}),(0,E.jsx)(g,{ref:n,height:380,colorScale:a,contrast:c,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var T,E,se;function D(){return(D=e((()=>{T=t(),i(),c(),l(),S(),b(),E=n(),se=[.5,1,2,4]})))()}function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,O.useRef)(null),n=(0,O.useRef)(null);return y(n,t,{seed:25},3e4),(0,k.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,k.jsx)(g,{ref:t,height:240,interval:150,window:3e4,profile:!1,bubbleSize:16,fontSize:10,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var O,k;function A(){return(A=e((()=>{O=t(),i(),S(),b(),k=n()})))()}function le(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,j.useRef)(null),n=(0,j.useRef)(null);return y(n,t,{seed:24,whales:.012},9e4),(0,M.jsx)(`div`,{ref:n,style:ue,children:(0,M.jsx)(g,{ref:t,height:420,colors:de,contrast:.7,timeZone:`utc`,interval:200,window:9e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var j,M,ue,de;function fe(){return(fe=e((()=>{j=t(),i(),S(),b(),M=n(),ue={"--background-color":`#06080d`,"--surface-color":`#06080d`,"--surface-elevated-color":`#151a22`,"--text-color":`#e6e8eb`,"--text-secondary-color":`#7d8590`,"--border-color":`#262c36`,"--success-color":`#26d07c`,"--danger-color":`#ff4d6a`,background:`#06080d`,color:`#e6e8eb`,borderRadius:12,padding:8,width:`100%`,boxSizing:`border-box`},de=[`#050b18`,`#0a2a5c`,`#0f6fb5`,`#19c2d6`,`#f5e663`,`#ff9a1f`,`#ff3b1f`]})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,N.useRef)(null),i=(0,N.useRef)(null),[a,o]=(0,N.useState)(null);y(i,n,{seed:27,whales:.03,activity:180},9e4);let s=new Intl.NumberFormat(t.language,{maximumFractionDigits:3});return(0,P.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(g,{ref:n,height:400,interval:1e3,window:9e4,bubbleSize:30,bubbleVolume:12,contrast:.6,onHover:o,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,P.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(`volumeAt`,{buys:s.format(a.buyVolume),sells:s.format(a.sellVolume)}):e(`volumeHint`)})]})}var N,P;function me(){return(me=e((()=>{N=t(),i(),S(),b(),P=n()})))()}function he(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,F.useRef)(null),a=(0,F.useRef)(null),o=(0,F.useRef)(null),s=(0,F.useRef)(null),c=(0,F.useRef)(null),[l,u]=(0,F.useState)({last:NaN,spread:NaN,trades:0}),d=(0,F.useRef)(0);(0,F.useEffect)(()=>{let e=i.current,t=o.current;if(!e)return;let{feed:n,snapshot:r,updates:s}=x({seed:34},6e4);e.clear(),e.setBook(r);for(let{delta:t,trades:n}of s)e.applyDeltas(t),e.addTrades(n);return t?.setTrades(s.flatMap(e=>e.trades)),a.current?.setBook(n.snapshot()),a.current?.setLastPrice(n.last()),c.current=n,()=>{c.current=null,e.clear(),t?.clear()}},[]),h(s,e=>{let t=c.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r),a.current?.applyDeltas(n),r.length&&(a.current?.setLastPrice(t.last()),o.current?.addTrades(r));let s=performance.now();if(s-d.current<250)return;d.current=s;let l=i.current?.getInstance()?.getStore();u({last:t.last(),spread:l?l.spread():NaN,trades:o.current?.getInstance()?.getCount()??0})});let f=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),p=new Intl.NumberFormat(n);return(0,I.jsxs)(`div`,{ref:s,style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px 16px`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,I.jsx)(`strong`,{children:e(`pair`)}),(0,I.jsx)(`span`,{children:e(`lastPrice`,{value:Number.isNaN(l.last)?`…`:f.format(l.last)})}),(0,I.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`spreadIs`,{value:Number.isNaN(l.spread)?`…`:f.format(l.spread)})}),(0,I.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`tradesOnTape`,{value:p.format(l.trades)})})]}),(0,I.jsx)(g,{ref:i,height:320,interval:250,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`},children:[(0,I.jsx)(v,{ref:a,height:300,pricePrecision:1,sizePrecision:4,ariaLabel:e(`bookAria`)}),(0,I.jsx)(_,{ref:o,height:300,aggregate:!0,largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`tapeAria`)})]})]})}var F,I;function L(){return(L=e((()=>{F=t(),i(),S(),b(),I=n()})))()}function ge(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,R.useRef)(null),n=(0,R.useRef)(null),[i,a]=(0,R.useState)(null),[s,c]=(0,R.useState)(!0);return y(n,t,{seed:22,activity:200},15e3,{step:10,interval:10}),(0,z.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsx)(g,{ref:t,height:400,interval:50,window:15e3,onRendererChange:a,onFollowChange:c,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,color:`var(--text-secondary-color)`,fontSize:13},children:[(0,z.jsx)(`span`,{children:e(`rendererIs`,{value:i?e(`renderers.${i}`):`…`})}),(0,z.jsx)(`span`,{children:e(s?`following`:`panned`)}),(0,z.jsx)(o,{size:`small`,variant:`outline`,disabled:s,onClick:()=>t.current?.resetView(),children:e(`followMarket`)})]})]})}var R,z;function B(){return(B=e((()=>{R=t(),i(),a(),S(),b(),z=n()})))()}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,V.useRef)(null),a=(0,V.useRef)(null),[o,s]=(0,V.useState)(null),[c,l]=(0,V.useState)(null);y(a,i,{seed:35},9e4,{interval:50}),(0,V.useEffect)(()=>{let e=setInterval(()=>l(Date.now()),1e3);return()=>clearInterval(e)},[]);let{formatPrice:u,formatSize:d,contracts:f,usd:p}=(0,V.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,minimumFractionDigits:1,maximumFractionDigits:1}),t=new Intl.NumberFormat(n,{notation:`compact`,maximumFractionDigits:1}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2});return{formatPrice:t=>e.format(t),formatSize:e=>t.format(e/U),contracts:e=>t.format(Math.round(e/U)),usd:e=>r.format(e)}},[n]),m=c===null?null:Math.ceil(c/W)*W,h=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,timeZone:`UTC`,timeZoneName:`short`}),_=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hourCycle:`h23`,timeZone:`UTC`}),v=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:4,signDisplay:`always`});return(0,H.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px 16px`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,H.jsx)(`strong`,{children:e(`perpName`)}),(0,H.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`contractSize`,{value:new Intl.NumberFormat(n).format(U)})}),(0,H.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:m===null||c===null?e(`fundingRate`,{rate:v.format(G)}):e(`funding`,{rate:v.format(G),time:h.format(m),countdown:_.format(m-c)})})]}),(0,H.jsx)(g,{ref:i,height:380,interval:250,window:9e4,formatPrice:u,formatSize:d,sizeUnit:e(`contracts`),timeZone:`utc`,labels:{liquidity:e(`restingContracts`),buys:e(`takerBuys`),sells:e(`takerSells`)},onHover:s,ariaLabel:e(`perpAria`)}),(0,H.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:o?e(`perpReadout`,{price:u(o.price),contracts:f(o.size),notional:p(o.size*o.price)}):e(`perpHint`)})]})}var V,H,U,W,G;function ve(){return(ve=e((()=>{V=t(),i(),S(),b(),H=n(),U=.001,W=288e5,G=1e-4})))()}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,K.useRef)(null),a=(0,K.useRef)(null),o=(0,K.useRef)(null),[c,l]=(0,K.useState)(0),[d,f]=(0,K.useState)(0),[p,m]=(0,K.useState)(null);(0,K.useEffect)(()=>{let e=i.current;if(!e)return;let{feed:t,snapshot:n,updates:r}=x({seed:31},12e4);e.clear(),e.setBook(n);for(let{delta:t,trades:n}of r)e.applyDeltas(t),e.addTrades(n);return o.current=t,()=>{o.current=null,e.clear()}},[c]),h(a,e=>{let t=o.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r)});let _=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),v=new Intl.NumberFormat(n),y=new Intl.NumberFormat(n,{maximumFractionDigits:3}),b=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`});return(0,q.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,q.jsx)(s,{"aria-label":e(`rowHeight`),direction:`horizontal`,value:c,onChange:e=>l(Number(e)),children:be.map(t=>(0,q.jsx)(u,{value:t,label:t?e(`usdtValue`,{value:v.format(t)}):e(`auto`)},t))}),(0,q.jsx)(s,{"aria-label":e(`priceSpan`),direction:`horizontal`,value:d,onChange:e=>f(Number(e)),children:xe.map(t=>(0,q.jsx)(u,{value:t,label:t?e(`usdtValue`,{value:v.format(t)}):e(`fitBook`)},t))})]}),(0,q.jsx)(g,{ref:i,height:400,interval:500,window:12e4,tickSize:c||void 0,priceSpan:d||void 0,tooltip:!1,onHover:m,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,q.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:p?e(`cellReadout`,{time:b.format(p.time),price:p.priceHigh>p.price?e(`priceRange`,{low:_.format(p.price),high:_.format(p.priceHigh)}):_.format(p.price),size:y.format(p.size),side:p.side===`bid`?e(`sideBid`):p.side===`ask`?e(`sideAsk`):e(`sideSpread`),buys:y.format(p.buyVolume),sells:y.format(p.sellVolume)}):e(`cellHint`)})]})}var K,q,be,xe;function Se(){return(Se=e((()=>{K=t(),i(),c(),l(),S(),b(),q=n(),be=[0,1,5],xe=[0,60,250]})))()}function Ce(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,J.useRef)(null),n=(0,J.useRef)(null),[i,a]=(0,J.useState)(`red-up`);return y(n,t,{seed:26},6e4),(0,Y.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,Y.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,Y.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,Y.jsx)(g,{ref:t,colorConvention:i,height:360,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var J,Y;function we(){return(we=e((()=>{J=t(),i(),c(),l(),S(),b(),Y=n()})))()}function Te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=t.language,i=(0,X.useRef)(null),a=(0,X.useRef)(null),c=(0,X.useRef)(null),[l,d]=(0,X.useState)(12e4),[p,m]=(0,X.useState)(!0),[_,v]=(0,X.useState)(``);(0,X.useEffect)(()=>{let e=i.current;if(!e)return;let{feed:t,snapshot:n,updates:r}=x({seed:33},3e5,200);e.clear(),e.setBook(n);for(let{delta:t,trades:n}of r)e.applyDeltas(t),e.addTrades(n);return c.current=t,()=>{c.current=null,e.clear()}},[]),h(a,e=>{let t=c.current;if(!t)return;let{delta:n,trades:r}=t.step(e);i.current?.applyDeltas(n),i.current?.addTrades(r)},{running:p});let y=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),b=e=>e<6e4?new Intl.NumberFormat(n,{style:`unit`,unit:`second`}).format(e/1e3):new Intl.NumberFormat(n,{style:`unit`,unit:`minute`}).format(e/6e4),S=()=>y.format(c.current?.time()??0);return(0,Z.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`8px 24px`},children:[(0,Z.jsx)(s,{"aria-label":e(`timeWindow`),direction:`horizontal`,value:l,onChange:e=>{d(Number(e)),v(``)},children:Ee.map(e=>(0,Z.jsx)(u,{value:e,label:b(e)},e))}),(0,Z.jsx)(f,{checked:p,onChange:t=>{m(t),v(e(t?`resumedAt`:`pausedAt`,{time:S()}))},label:e(`liveFeed`)}),(0,Z.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{let t=c.current;t&&(i.current?.clear(),i.current?.setBook(t.snapshot()),v(e(`clearedAt`,{time:S()})))},children:e(`clearHistory`)})]}),(0,Z.jsx)(g,{ref:i,height:400,interval:250,window:l,history:3e5,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,Z.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13},children:_||e(`windowStatus`,{window:b(l),history:b(3e5)})})]})}var X,Z,Ee;function De(){return(De=e((()=>{X=t(),i(),a(),c(),l(),d(),S(),b(),Z=n(),Ee=[3e4,12e4,3e5]})))()}var Oe;function ke(){return(ke=e((()=>{Oe=`import { useRef } from "react";
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
`})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { useRef, useState } from "react";
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
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { useRef } from "react";
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
`})))()}var Pe;function Fe(){return(Fe=e((()=>{Pe=`import { useRef, type CSSProperties } from "react";
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
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useRef, useState } from "react";
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
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useRef, useState } from "react";
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
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var Q;function We(){return(We=e((()=>{Q=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useRef, useState } from "react";
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
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useEffect, useRef, useState } from "react";
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
`})))()}var $,Ye,Xe,Ze,Qe;function $e(){return($e=e((()=>{ae(),D(),A(),fe(),me(),L(),B(),ve(),Se(),we(),De(),ke(),je(),Ne(),Fe(),Le(),ze(),Ve(),Ue(),We(),Ke(),Je(),t(),i(),te(),p(),re(),$=n(),Ye=ee(Object.assign({"./demos/basic.tsx":ie,"./demos/color-scale.tsx":oe,"./demos/compact.tsx":ce,"./demos/dark.tsx":le,"./demos/large-trades.tsx":pe,"./demos/linked.tsx":he,"./demos/live.tsx":ge,"./demos/perpetual.tsx":_e,"./demos/price-resolution.tsx":ye,"./demos/red-up.tsx":Ce,"./demos/time-window.tsx":Te}),Object.assign({"./demos/basic.tsx":Oe,"./demos/color-scale.tsx":Ae,"./demos/compact.tsx":Me,"./demos/dark.tsx":Pe,"./demos/large-trades.tsx":Ie,"./demos/linked.tsx":Re,"./demos/live.tsx":Be,"./demos/perpetual.tsx":He,"./demos/price-resolution.tsx":Q,"./demos/red-up.tsx":Ge,"./demos/time-window.tsx":qe})),Xe=[`axes`,`color`,`walls`,`lines`,`bubbles`,`profile`],Ze=[`hold`,`pull`,`sweep`,`thin`],Qe=()=>{let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.read`}),t=(0,$.jsxs)(`section`,{className:m.section,"aria-labelledby":`heatmap-read`,children:[(0,$.jsx)(`h2`,{id:`heatmap-read`,children:e(`title`)}),(0,$.jsx)(`p`,{className:m.prose,children:e(`text`)}),(0,$.jsx)(`ul`,{className:m.prose,children:Xe.map(t=>(0,$.jsx)(`li`,{children:e(t)},t))}),(0,$.jsx)(`h3`,{children:e(`patterns.title`)}),(0,$.jsx)(`ul`,{className:m.prose,children:Ze.map(t=>(0,$.jsx)(`li`,{children:e(`patterns.${t}`)},t))})]});return(0,$.jsx)(ne,{id:`order-book-heatmap`,demos:Ye,intro:t})}})))()}$e();export{Qe as default};