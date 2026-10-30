import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BzoVi22c.js";import{i as a,n as o,r as s,t as c}from"./Radio-DnNachfg.js";import{n as l,t as u}from"./Switch-DyBWzlhy.js";import{l as d,n as f,t as p,u as m}from"./DocPage-B2iACtLP.js";import{a as h,c as g,l as _,n as v,r as y}from"./feed-6-CmBDu_.js";function ee(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,b.useMemo)(()=>v({seed:1}).snapshot(),[]);return(0,x.jsx)(_,{book:t,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})}var b,x;function S(){return(S=e((()=>{b=t(),i(),g(),y(),x=n()})))()}function te(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,C.useRef)(null),n=(0,C.useRef)(null),[i]=(0,C.useState)(()=>v({seed:5})),[a]=(0,C.useState)(()=>i.snapshot());return h(n,e=>t.current?.applyDeltas(i.step(e).delta)),(0,w.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,w.jsx)(_,{ref:t,book:a,height:190,legend:!1,fontSize:10,range:.003,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var C,w;function T(){return(T=e((()=>{C=t(),i(),g(),y(),w=n()})))()}function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,E.useRef)(null),n=(0,E.useRef)(null),[i]=(0,E.useState)(()=>v({seed:4})),[a]=(0,E.useState)(()=>i.snapshot());h(n,e=>t.current?.applyDeltas(i.step(e).delta));let o=i.last(),s=e(`myBid`),c=e(`myAsk`),l=e(`liquidation`),u=(0,E.useMemo)(()=>[{price:Math.round(o*.9992),label:s,color:`#0ecb81`},{price:Math.round(o*1.0012),label:c,color:`#f6465d`},{price:Math.round(o*.9978),label:l,color:`#f0b90b`}],[o,s,c,l]);return(0,D.jsx)(`div`,{ref:n,style:O,children:(0,D.jsx)(_,{ref:t,book:a,height:360,range:.003,priceLines:u,fillOpacity:.35,pricePrecision:1,sizePrecision:4,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var E,D,O;function re(){return(re=e((()=>{E=t(),i(),g(),y(),D=n(),O={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:12,width:`100%`,boxSizing:`border-box`}})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,k.useRef)(null),n=(0,k.useRef)(null),[i,a]=(0,k.useState)(!0),[o]=(0,k.useState)(()=>v({seed:2})),[s]=(0,k.useState)(()=>o.snapshot());return h(n,e=>t.current?.applyDeltas(o.step(e).delta),{interval:10,running:i}),(0,A.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsx)(u,{checked:i,onChange:e=>a(e),label:e(`stream`)}),(0,A.jsx)(_,{ref:t,book:s,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var k,A;function j(){return(j=e((()=>{k=t(),i(),l(),g(),y(),A=n()})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),[n]=(0,M.useState)(()=>v({seed:3}).snapshot()),[i,o]=(0,M.useState)(`0.001`),[s,l]=(0,M.useState)(null),[u,d]=(0,M.useState)(`base`),[f,p]=(0,M.useState)(`step`),m=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:2});return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsx)(a,{"aria-label":e(`range`),direction:`horizontal`,value:i,onChange:e=>{o(String(e)),l(null)},children:P.map(t=>(0,N.jsx)(c,{value:t,label:t===`auto`?e(`auto`):e(`plusMinus`,{value:m.format(Number(t))})},t))}),(0,N.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,N.jsxs)(a,{"aria-label":e(`amountAxis`),direction:`horizontal`,value:u,onChange:e=>d(e),children:[(0,N.jsx)(c,{value:`base`,label:e(`base`)}),(0,N.jsx)(c,{value:`quote`,label:e(`quote`)})]}),(0,N.jsxs)(a,{"aria-label":e(`curve`),direction:`horizontal`,value:f,onChange:e=>p(e),children:[(0,N.jsx)(c,{value:`step`,label:e(`step`)}),(0,N.jsx)(c,{value:`linear`,label:e(`linear`)})]})]}),(0,N.jsx)(_,{book:n,range:i===`auto`?void 0:Number(i),amount:u,curve:f,onRangeChange:l,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,N.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:s===null?e(`zoomHint`):e(`zoomed`,{value:e(`plusMinus`,{value:m.format(s)})})})]})}var M,N,P;function F(){return(F=e((()=>{M=t(),i(),o(),s(),g(),y(),N=n(),P=[`auto`,`0.0005`,`0.001`,`0.002`,`0.004`]})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,I.useRef)(null),n=(0,I.useRef)(null),[i,o]=(0,I.useState)(`red-up`),[s]=(0,I.useState)(()=>v({seed:6})),[l]=(0,I.useState)(()=>s.snapshot());return h(n,e=>t.current?.applyDeltas(s.step(e).delta)),(0,L.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsxs)(a,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>o(e),children:[(0,L.jsx)(c,{value:`red-up`,label:e(`redUp`)}),(0,L.jsx)(c,{value:`green-up`,label:e(`greenUp`)})]}),(0,L.jsx)(_,{ref:t,book:l,colorConvention:i,height:320,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var I,L;function R(){return(R=e((()=>{I=t(),i(),o(),s(),g(),y(),L=n()})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),n=t.language,[i]=(0,z.useState)(()=>{let{bids:e,asks:t}=v({seed:12}).snapshot();return{bids:U(e,V),asks:U(t,H)}}),[a,o]=(0,z.useState)(null),s=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),c=new Intl.NumberFormat(n,{maximumFractionDigits:3}),l=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2}),u=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:3});return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsx)(_,{book:i,height:340,range:.003,onHover:o,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,B.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(a.side===`ask`?`sweepBuy`:`sweepSell`,{amount:c.format(a.amount),price:s.format(a.price),total:l.format(a.total),average:s.format(a.average),slippage:u.format(Math.abs(a.distance))}):e(`sweepHint`)})]})}var z,B,V,H,U;function W(){return(W=e((()=>{z=t(),i(),g(),y(),B=n(),V=new Map([[80,140],[330,260]]),H=new Map([[140,180],[420,320]]),U=(e,t)=>e.map(([e,n],r)=>[e,t.get(r)??n])})))()}var G;function K(){return(K=e((()=>{G=`import { useMemo } from "react";
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
`})))()}var q;function J(){return(J=e((()=>{q=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 5 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) =>
    chartRef.current?.applyDeltas(feed.step(elapsed).delta),
  );

  // a phone-sized card: no legend, smaller texts; pinch to zoom, tap to read
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 360 }}>
      <DepthChart
        ref={chartRef}
        book={book}
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
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { useMemo, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

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
  const [feed] = useState(() => createMarketFeed({ seed: 4 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) =>
    chartRef.current?.applyDeltas(feed.step(elapsed).delta),
  );

  // your resting orders and the liquidation price of a position
  const mid = feed.last();
  const myBid = t("myBid");
  const myAsk = t("myAsk");
  const liquidation = t("liquidation");
  const priceLines = useMemo(
    () => [
      { price: Math.round(mid * 0.9992), label: myBid, color: "#0ecb81" },
      { price: Math.round(mid * 1.0012), label: myAsk, color: "#f6465d" },
      { price: Math.round(mid * 0.9978), label: liquidation, color: "#f0b90b" },
    ],
    [mid, myBid, myAsk, liquidation],
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <DepthChart
        ref={chartRef}
        book={book}
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
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);
  const [feed] = useState(() => createMarketFeed({ seed: 2 }));
  const [book] = useState(() => feed.snapshot());

  // ~100 deltas a second: the chart eases to the latest book once per frame
  useFeedLoop(
    boxRef,
    (elapsed) => chartRef.current?.applyDeltas(feed.step(elapsed).delta),
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
        book={book}
        height={340}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var ce;function le(){return(le=e((()=>{ce=`import { useState } from "react";
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
`})))()}var ue;function de(){return(de=e((()=>{ue=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  DepthChart,
  type DepthChartHandle,
  type OrderBookColorConvention,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  const [feed] = useState(() => createMarketFeed({ seed: 6 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) =>
    chartRef.current?.applyDeltas(feed.step(elapsed).delta),
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
        book={book}
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
`})))()}var fe;function pe(){return(pe=e((()=>{fe=`import { useState } from "react";
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
`})))()}var me,he,ge;function $(){return($=e((()=>{S(),T(),re(),j(),F(),R(),W(),K(),J(),X(),Q(),le(),de(),pe(),t(),f(),m(),me=n(),he=d(Object.assign({"./demos/basic.tsx":ee,"./demos/compact.tsx":te,"./demos/dark.tsx":ne,"./demos/live.tsx":ie,"./demos/range.tsx":ae,"./demos/red-up.tsx":oe,"./demos/walls.tsx":se}),Object.assign({"./demos/basic.tsx":G,"./demos/compact.tsx":q,"./demos/dark.tsx":Y,"./demos/live.tsx":Z,"./demos/range.tsx":ce,"./demos/red-up.tsx":ue,"./demos/walls.tsx":fe})),ge=()=>(0,me.jsx)(p,{id:`depth-chart`,demos:he})})))()}$();export{ge as default};