import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BzoVi22c.js";import{R as a,z as o}from"./ProgressIndicator-BhPa7d9i.js";import{i as s,n as c,r as l,t as u}from"./Radio-DnNachfg.js";import{l as d,n as f,t as ee,u as te}from"./DocPage-B2iACtLP.js";import{a as p,c as m,o as h,r as g,t as _}from"./feed-6-CmBDu_.js";function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,v.useRef)(null),n=(0,v.useRef)(null),[i]=(0,v.useState)(()=>_({seed:21},12e4));return(0,v.useEffect)(()=>{let e=t.current;if(e){e.setBook(i.snapshot);for(let{delta:t,trades:n}of i.updates)e.applyDeltas(t),e.addTrades(n)}},[i]),p(n,e=>{let{delta:n,trades:r}=i.feed.step(e);t.current?.applyDeltas(n),t.current?.addTrades(r)}),(0,y.jsx)(`div`,{ref:n,style:{width:`100%`},children:(0,y.jsx)(h,{ref:t,height:400,interval:250,window:12e4,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var v,y;function b(){return(b=e((()=>{v=t(),i(),m(),g(),y=n()})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,x.useRef)(null),i=(0,x.useRef)(null),[a,o]=(0,x.useState)(`log`),[c,l]=(0,x.useState)(1),[d]=(0,x.useState)(()=>_({seed:23,whales:.015},6e4));(0,x.useEffect)(()=>{let e=n.current;if(e){e.setBook(d.snapshot);for(let{delta:t,trades:n}of d.updates)e.applyDeltas(t),e.addTrades(n)}},[d]),p(i,e=>{let{delta:t,trades:r}=d.feed.step(e);n.current?.applyDeltas(t),n.current?.addTrades(r)});let f=new Intl.NumberFormat(t.language);return(0,S.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,S.jsxs)(s,{"aria-label":e(`scale`),direction:`horizontal`,value:a,onChange:e=>o(e),children:[(0,S.jsx)(u,{value:`log`,label:e(`scaleLog`)}),(0,S.jsx)(u,{value:`sqrt`,label:e(`scaleSqrt`)}),(0,S.jsx)(u,{value:`linear`,label:e(`scaleLinear`)})]}),(0,S.jsx)(s,{"aria-label":e(`contrast`),direction:`horizontal`,value:c,onChange:e=>l(Number(e)),children:C.map(t=>(0,S.jsx)(u,{value:t,label:e(`times`,{value:f.format(t)})},t))})]}),(0,S.jsx)(h,{ref:n,height:380,colorScale:a,contrast:c,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})]})}var x,S,C;function w(){return(w=e((()=>{x=t(),i(),c(),l(),m(),g(),S=n(),C=[.5,1,2,4]})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,T.useRef)(null),n=(0,T.useRef)(null),[i]=(0,T.useState)(()=>_({seed:25},3e4));return(0,T.useEffect)(()=>{let e=t.current;if(e){e.setBook(i.snapshot);for(let{delta:t,trades:n}of i.updates)e.applyDeltas(t),e.addTrades(n)}},[i]),p(n,e=>{let{delta:n,trades:r}=i.feed.step(e);t.current?.applyDeltas(n),t.current?.addTrades(r)}),(0,E.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,E.jsx)(h,{ref:t,height:240,interval:150,window:3e4,profile:!1,bubbleSize:16,fontSize:10,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var T,E;function ae(){return(ae=e((()=>{T=t(),i(),m(),g(),E=n()})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,D.useRef)(null),n=(0,D.useRef)(null),[i]=(0,D.useState)(()=>_({seed:24,whales:.012},9e4));return(0,D.useEffect)(()=>{let e=t.current;if(e){e.setBook(i.snapshot);for(let{delta:t,trades:n}of i.updates)e.applyDeltas(t),e.addTrades(n)}},[i]),p(n,e=>{let{delta:n,trades:r}=i.feed.step(e);t.current?.applyDeltas(n),t.current?.addTrades(r)}),(0,O.jsx)(`div`,{ref:n,style:k,children:(0,O.jsx)(h,{ref:t,height:420,colors:A,contrast:.7,interval:200,window:9e4,pricePrecision:1,sizePrecision:3,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var D,O,k,A;function j(){return(j=e((()=>{D=t(),i(),m(),g(),O=n(),k={"--background-color":`#06080d`,"--surface-color":`#06080d`,"--surface-elevated-color":`#151a22`,"--text-color":`#e6e8eb`,"--text-secondary-color":`#7d8590`,"--border-color":`#262c36`,"--success-color":`#26d07c`,"--danger-color":`#ff4d6a`,background:`#06080d`,color:`#e6e8eb`,borderRadius:12,padding:8,width:`100%`,boxSizing:`border-box`},A=[`#0a2a5c`,`#0f6fb5`,`#19c2d6`,`#f5e663`,`#ff9a1f`,`#ff3b1f`]})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,M.useRef)(null),i=(0,M.useRef)(null),[a,o]=(0,M.useState)(null),[s]=(0,M.useState)(()=>_({seed:27,whales:.03,activity:180},9e4));(0,M.useEffect)(()=>{let e=n.current;if(e){e.setBook(s.snapshot);for(let{delta:t,trades:n}of s.updates)e.applyDeltas(t),e.addTrades(n)}},[s]),p(i,e=>{let{delta:t,trades:r}=s.feed.step(e);n.current?.applyDeltas(t),n.current?.addTrades(r)});let c=new Intl.NumberFormat(t.language,{maximumFractionDigits:3});return(0,N.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsx)(h,{ref:n,height:400,interval:1e3,window:9e4,bubbleSize:30,bubbleVolume:12,contrast:.6,onHover:o,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)}),(0,N.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(`volumeAt`,{buys:c.format(a.buyVolume),sells:c.format(a.sellVolume)}):e(`volumeHint`)})]})}var M,N;function P(){return(P=e((()=>{M=t(),i(),m(),g(),N=n()})))()}function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,F.useRef)(null),n=(0,F.useRef)(null),[i]=(0,F.useState)(()=>_({seed:22,activity:200},15e3,10)),[a,s]=(0,F.useState)(null),[c,l]=(0,F.useState)(!0);return(0,F.useEffect)(()=>{let e=t.current;if(e){e.setBook(i.snapshot);for(let{delta:t,trades:n}of i.updates)e.applyDeltas(t),e.addTrades(n)}},[i]),p(n,e=>{let{delta:n,trades:r}=i.feed.step(e);t.current?.applyDeltas(n),t.current?.addTrades(r)},{interval:10}),(0,I.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(h,{ref:t,height:400,interval:50,window:15e3,onRendererChange:s,onFollowChange:l,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)}),(0,I.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,color:`var(--text-secondary-color)`,fontSize:13},children:[(0,I.jsx)(`span`,{children:e(`rendererIs`,{value:a?e(`renderers.${a}`):`…`})}),(0,I.jsx)(`span`,{children:e(c?`following`:`panned`)}),(0,I.jsx)(o,{size:`small`,variant:`outline`,disabled:c,onClick:()=>t.current?.resetView(),children:e(`followMarket`)})]})]})}var F,I;function L(){return(L=e((()=>{F=t(),i(),a(),m(),g(),I=n()})))()}function le(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,R.useRef)(null),n=(0,R.useRef)(null),[i,a]=(0,R.useState)(`red-up`),[o]=(0,R.useState)(()=>_({seed:26},6e4));return(0,R.useEffect)(()=>{let e=t.current;if(e){e.setBook(o.snapshot);for(let{delta:t,trades:n}of o.updates)e.applyDeltas(t),e.addTrades(n)}},[o]),p(n,e=>{let{delta:n,trades:r}=o.feed.step(e);t.current?.applyDeltas(n),t.current?.addTrades(r)}),(0,z.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,z.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,z.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,z.jsx)(h,{ref:t,colorConvention:i,height:360,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})]})}var R,z;function B(){return(B=e((()=>{R=t(),i(),c(),l(),m(),g(),z=n()})))()}var V;function H(){return(H=e((()=>{V=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { createHistory, useFeedLoop } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // two minutes of market recorded before the page opened, then live
  const [market] = useState(() => createHistory({ seed: 21 }, 120_000));

  // backfill: the book at the start, then every update with its exchange time
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
    <div ref={boxRef} style={{ width: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        // one column every 250 ms, two minutes on screen
        interval={250}
        window={120_000}
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapScale,
} from "minerva-design/charts";
import { createHistory, useFeedLoop } from "../../order-book/feed";

const CONTRASTS = [0.5, 1, 2, 4];

export default function ColorScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<OrderBookHeatmapScale>("log");
  const [contrast, setContrast] = useState(1);
  const [market] = useState(() =>
    createHistory({ seed: 23, whales: 0.015 }, 60_000),
  );

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
          <Radio value="log" label={t("scaleLog")} />
          <Radio value="sqrt" label={t("scaleSqrt")} />
          <Radio value="linear" label={t("scaleLinear")} />
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
        // log reveals thin liquidity next to the walls; contrast > 1 brightens it
        colorScale={scale}
        contrast={contrast}
        interval={200}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { createHistory, useFeedLoop } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
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
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { createHistory, useFeedLoop } from "../../order-book/feed";

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

// a classic liquidity ramp: deep blue, cyan, yellow, orange, red
const RAMP = ["#0a2a5c", "#0f6fb5", "#19c2d6", "#f5e663", "#ff9a1f", "#ff3b1f"];

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [market] = useState(() =>
    createHistory({ seed: 24, whales: 0.012 }, 90_000),
  );

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
    <div ref={boxRef} style={TERMINAL}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={420}
        colors={RAMP}
        contrast={0.7}
        interval={200}
        window={90_000}
        pricePrecision={1}
        sizePrecision={3}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import { createHistory, useFeedLoop } from "../../order-book/feed";

export default function LargeTradesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);
  // block trades: aggressive whales sweeping several levels at once
  const [market] = useState(() =>
    createHistory({ seed: 27, whales: 0.03, activity: 180 }, 90_000),
  );

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
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  OrderBookHeatmap,
  type ChartRendererKind,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { createHistory, useFeedLoop } from "../../order-book/feed";

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // the last 15 s at 100 messages a second, then live at the same pace
  const [market] = useState(() =>
    createHistory({ seed: 22, activity: 200 }, 15_000, 10),
  );
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    heatmap.setBook(market.snapshot);
    for (const { delta, trades } of market.updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
  }, [market]);

  // the heatmap samples the book every 50 ms: 20 columns a second
  useFeedLoop(
    boxRef,
    (elapsed) => {
      const { delta, trades } = market.feed.step(elapsed);
      heatmapRef.current?.applyDeltas(delta);
      heatmapRef.current?.addTrades(trades);
    },
    { interval: 10 },
  );

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
`})))()}var ue;function de(){return(de=e((()=>{ue=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookColorConvention,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { createHistory, useFeedLoop } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  const [market] = useState(() => createHistory({ seed: 26 }, 60_000));

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
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var fe,pe,me;function $(){return($=e((()=>{b(),w(),ae(),j(),P(),L(),B(),H(),W(),K(),J(),X(),Q(),de(),t(),f(),te(),fe=n(),pe=d(Object.assign({"./demos/basic.tsx":ne,"./demos/color-scale.tsx":re,"./demos/compact.tsx":ie,"./demos/dark.tsx":oe,"./demos/large-trades.tsx":se,"./demos/live.tsx":ce,"./demos/red-up.tsx":le}),Object.assign({"./demos/basic.tsx":V,"./demos/color-scale.tsx":U,"./demos/compact.tsx":G,"./demos/dark.tsx":q,"./demos/large-trades.tsx":Y,"./demos/live.tsx":Z,"./demos/red-up.tsx":ue})),me=()=>(0,fe.jsx)(ee,{id:`order-book-heatmap`,demos:pe})})))()}$();export{me as default};