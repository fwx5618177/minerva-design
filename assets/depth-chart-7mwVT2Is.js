import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{n as l,t as u}from"./Switch-CHbzff3y.js";import{l as d,n as f,t as p,u as m}from"./DocPage-BbPSunu1.js";import{d as h,n as g,r as _,s as v,u as y}from"./feed-a3uhDZjB.js";function ee(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,b.useMemo)(()=>g({seed:1}).snapshot(),[]);return(0,te.jsx)(h,{book:t,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})}var b,te;function x(){return(x=e((()=>{b=t(),i(),y(),_(),te=n()})))()}function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,S.useRef)(null),n=(0,S.useRef)(null);return v(n,{seed:5},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)}),(0,C.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,C.jsx)(h,{ref:t,height:190,legend:!1,fontSize:10,range:.003,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var S,C;function w(){return(w=e((()=>{S=t(),i(),y(),_(),C=n()})))()}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,T.useRef)(null),n=(0,T.useRef)(null);v(n,{seed:4,price:D},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)});let i=e(`myBid`),a=e(`myAsk`),o=e(`liquidation`),s=(0,T.useMemo)(()=>[{price:Math.round(D*.9992),label:i,color:`#0ecb81`},{price:Math.round(D*1.0012),label:a,color:`#f6465d`},{price:Math.round(D*.9978),label:o,color:`#f0b90b`}],[i,a,o]);return(0,E.jsx)(`div`,{ref:n,style:O,children:(0,E.jsx)(h,{ref:t,height:360,range:.003,priceLines:s,fillOpacity:.35,pricePrecision:1,sizePrecision:4,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var T,E,D,O;function k(){return(k=e((()=>{T=t(),i(),y(),_(),E=n(),D=64e3,O={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:12,width:`100%`,boxSizing:`border-box`}})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,A.useRef)(null),n=(0,A.useRef)(null),[i,a]=(0,A.useState)(!0);return v(n,{seed:2},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)},{interval:10,running:i}),(0,j.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsx)(u,{checked:i,onChange:e=>a(e),label:e(`stream`)}),(0,j.jsx)(h,{ref:t,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var A,j;function M(){return(M=e((()=>{A=t(),i(),l(),y(),_(),j=n()})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),[n]=(0,N.useState)(()=>g({seed:3}).snapshot()),[i,o]=(0,N.useState)(`0.001`),[s,l]=(0,N.useState)(null),[u,d]=(0,N.useState)(`base`),[f,p]=(0,N.useState)(`step`),m=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:2});return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(a,{"aria-label":e(`range`),direction:`horizontal`,value:i,onChange:e=>{o(String(e)),l(null)},children:F.map(t=>(0,P.jsx)(c,{value:t,label:t===`auto`?e(`auto`):e(`plusMinus`,{value:m.format(Number(t))})},t))}),(0,P.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,P.jsxs)(a,{"aria-label":e(`amountAxis`),direction:`horizontal`,value:u,onChange:e=>d(e),children:[(0,P.jsx)(c,{value:`base`,label:e(`base`)}),(0,P.jsx)(c,{value:`quote`,label:e(`quote`)})]}),(0,P.jsxs)(a,{"aria-label":e(`curve`),direction:`horizontal`,value:f,onChange:e=>p(e),children:[(0,P.jsx)(c,{value:`step`,label:e(`step`)}),(0,P.jsx)(c,{value:`linear`,label:e(`linear`)})]})]}),(0,P.jsx)(h,{book:n,range:i===`auto`?void 0:Number(i),amount:u,curve:f,onRangeChange:l,height:340,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,P.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:s===null?e(`zoomHint`):e(`zoomed`,{value:e(`plusMinus`,{value:m.format(s)})})})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),i(),o(),s(),y(),_(),P=n(),F=[`auto`,`0.0005`,`0.001`,`0.002`,`0.004`]})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),t=(0,L.useRef)(null),n=(0,L.useRef)(null),[i,o]=(0,L.useState)(`red-up`);return v(n,{seed:6},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e})=>t.current?.applyDeltas(e)}),(0,R.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,R.jsxs)(a,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>o(e),children:[(0,R.jsx)(c,{value:`red-up`,label:e(`redUp`)}),(0,R.jsx)(c,{value:`green-up`,label:e(`greenUp`)})]}),(0,R.jsx)(h,{ref:t,colorConvention:i,height:320,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var L,R;function z(){return(z=e((()=>{L=t(),i(),o(),s(),y(),_(),R=n()})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.depth-chart.data`}),n=t.language,[i]=(0,B.useState)(()=>{let{bids:e,asks:t}=g({seed:12}).snapshot();return{bids:W(e,H),asks:W(t,U)}}),[a,o]=(0,B.useState)(null),s=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),c=new Intl.NumberFormat(n,{maximumFractionDigits:3}),l=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2}),u=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:3});return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,V.jsx)(h,{book:i,height:340,range:.003,onHover:o,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,V.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(a.side===`ask`?`sweepBuy`:`sweepSell`,{amount:c.format(a.amount),price:s.format(a.price),total:l.format(a.total),average:s.format(a.average),slippage:u.format(Math.abs(a.distance))}):e(`sweepHint`)})]})}var B,V,H,U,W;function G(){return(G=e((()=>{B=t(),i(),y(),_(),V=n(),H=new Map([[80,140],[330,260]]),U=new Map([[140,180],[420,320]]),W=(e,t)=>e.map(([e,n],r)=>[e,t.get(r)??n])})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useRef } from "react";
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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useMemo, useRef, type CSSProperties } from "react";
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
`})))()}var Q;function ce(){return(ce=e((()=>{Q=`import { useRef, useState } from "react";
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
`})))()}var le;function ue(){return(ue=e((()=>{le=`import { useState } from "react";
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
`})))()}var de;function fe(){return(fe=e((()=>{de=`import { useRef, useState } from "react";
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
`})))()}var pe;function me(){return(me=e((()=>{pe=`import { useState } from "react";
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
`})))()}var he,ge,_e;function $(){return($=e((()=>{x(),w(),k(),M(),I(),z(),G(),q(),Y(),Z(),ce(),ue(),fe(),me(),t(),f(),m(),he=n(),ge=d(Object.assign({"./demos/basic.tsx":ee,"./demos/compact.tsx":ne,"./demos/dark.tsx":re,"./demos/live.tsx":ie,"./demos/range.tsx":ae,"./demos/red-up.tsx":oe,"./demos/walls.tsx":se}),Object.assign({"./demos/basic.tsx":K,"./demos/compact.tsx":J,"./demos/dark.tsx":X,"./demos/live.tsx":Q,"./demos/range.tsx":le,"./demos/red-up.tsx":de,"./demos/walls.tsx":pe})),_e=()=>(0,he.jsx)(p,{id:`depth-chart`,demos:ge})})))()}$();export{_e as default};