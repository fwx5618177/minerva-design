import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-JhXgs5p-.js";import{c as d,o as f,r as p,u as m}from"./feed-CGHorric.js";function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,h.useRef)(null),n=(0,h.useRef)(null);return f(n,t,{seed:21},12e4),(0,g.jsx)(`div`,{ref:n,style:{width:`100%`},children:(0,g.jsx)(d,{ref:t,height:400,interval:250,window:12e4,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var h,g;function _(){return(_=e((()=>{h=t(),i(),m(),p(),g=n()})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,v.useRef)(null),i=(0,v.useRef)(null),[a,o]=(0,v.useState)(`log`),[c,l]=(0,v.useState)(1);f(i,n,{seed:23,whales:.015},6e4);let ee=new Intl.NumberFormat(t.language);return(0,y.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,y.jsxs)(s,{"aria-label":e(`scale`),direction:`horizontal`,value:a,onChange:e=>o(e),children:[(0,y.jsx)(u,{value:`log`,label:e(`scaleLog`)}),(0,y.jsx)(u,{value:`sqrt`,label:e(`scaleSqrt`)}),(0,y.jsx)(u,{value:`linear`,label:e(`scaleLinear`)})]}),(0,y.jsx)(s,{"aria-label":e(`contrast`),direction:`horizontal`,value:c,onChange:e=>l(Number(e)),children:b.map(t=>(0,y.jsx)(u,{value:t,label:e(`times`,{value:ee.format(t)})},t))})]}),(0,y.jsx)(d,{ref:n,height:380,colorScale:a,contrast:c,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})]})}var v,y,b;function x(){return(x=e((()=>{v=t(),i(),c(),l(),m(),p(),y=n(),b=[.5,1,2,4]})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,S.useRef)(null),n=(0,S.useRef)(null);return f(n,t,{seed:25},3e4),(0,C.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,C.jsx)(d,{ref:t,height:240,interval:150,window:3e4,profile:!1,bubbleSize:16,fontSize:10,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var S,C;function w(){return(w=e((()=>{S=t(),i(),m(),p(),C=n()})))()}function se(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,T.useRef)(null),n=(0,T.useRef)(null);return f(n,t,{seed:24,whales:.012},9e4),(0,E.jsx)(`div`,{ref:n,style:D,children:(0,E.jsx)(d,{ref:t,height:420,colors:O,contrast:.7,timeZone:`utc`,interval:200,window:9e4,pricePrecision:1,sizePrecision:3,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var T,E,D,O;function k(){return(k=e((()=>{T=t(),i(),m(),p(),E=n(),D={"--background-color":`#06080d`,"--surface-color":`#06080d`,"--surface-elevated-color":`#151a22`,"--text-color":`#e6e8eb`,"--text-secondary-color":`#7d8590`,"--border-color":`#262c36`,"--success-color":`#26d07c`,"--danger-color":`#ff4d6a`,background:`#06080d`,color:`#e6e8eb`,borderRadius:12,padding:8,width:`100%`,boxSizing:`border-box`},O=[`#050b18`,`#0a2a5c`,`#0f6fb5`,`#19c2d6`,`#f5e663`,`#ff9a1f`,`#ff3b1f`]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,A.useRef)(null),i=(0,A.useRef)(null),[a,o]=(0,A.useState)(null);f(i,n,{seed:27,whales:.03,activity:180},9e4);let s=new Intl.NumberFormat(t.language,{maximumFractionDigits:3});return(0,j.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsx)(d,{ref:n,height:400,interval:1e3,window:9e4,bubbleSize:30,bubbleVolume:12,contrast:.6,onHover:o,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)}),(0,j.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(`volumeAt`,{buys:s.format(a.buyVolume),sells:s.format(a.sellVolume)}):e(`volumeHint`)})]})}var A,j;function M(){return(M=e((()=>{A=t(),i(),m(),p(),j=n()})))()}function le(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,N.useRef)(null),n=(0,N.useRef)(null),[i,a]=(0,N.useState)(null),[s,c]=(0,N.useState)(!0);return f(n,t,{seed:22,activity:200},15e3,{step:10,interval:10}),(0,P.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(d,{ref:t,height:400,interval:50,window:15e3,onRendererChange:a,onFollowChange:c,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)}),(0,P.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,color:`var(--text-secondary-color)`,fontSize:13},children:[(0,P.jsx)(`span`,{children:e(`rendererIs`,{value:i?e(`renderers.${i}`):`…`})}),(0,P.jsx)(`span`,{children:e(s?`following`:`panned`)}),(0,P.jsx)(o,{size:`small`,variant:`outline`,disabled:s,onClick:()=>t.current?.resetView(),children:e(`followMarket`)})]})]})}var N,P;function F(){return(F=e((()=>{N=t(),i(),a(),m(),p(),P=n()})))()}function ue(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,I.useRef)(null),n=(0,I.useRef)(null),[i,a]=(0,I.useState)(`red-up`);return f(n,t,{seed:26},6e4),(0,L.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,L.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,L.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,L.jsx)(d,{ref:t,colorConvention:i,height:360,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})]})}var I,L;function R(){return(R=e((()=>{I=t(),i(),c(),l(),m(),p(),L=n()})))()}var z;function B(){return(B=e((()=>{z=`import { useRef } from "react";
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
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { useRef, useState } from "react";
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
  const [scale, setScale] = useState<OrderBookHeatmapScale>("log");
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { useRef } from "react";
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
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useRef, type CSSProperties } from "react";
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
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useRef, useState } from "react";
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
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { useRef, useState } from "react";
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
  // the last 15 s at 200 messages a second (one update every 10 ms), then
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
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useRef, useState } from "react";
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
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var $,de,fe;function pe(){return(pe=e((()=>{_(),x(),w(),k(),M(),F(),R(),B(),H(),W(),K(),J(),X(),Q(),t(),te(),re(),$=n(),de=ee(Object.assign({"./demos/basic.tsx":ie,"./demos/color-scale.tsx":ae,"./demos/compact.tsx":oe,"./demos/dark.tsx":se,"./demos/large-trades.tsx":ce,"./demos/live.tsx":le,"./demos/red-up.tsx":ue}),Object.assign({"./demos/basic.tsx":z,"./demos/color-scale.tsx":V,"./demos/compact.tsx":U,"./demos/dark.tsx":G,"./demos/large-trades.tsx":q,"./demos/live.tsx":Y,"./demos/red-up.tsx":Z})),fe=()=>(0,$.jsx)(ne,{id:`order-book-heatmap`,demos:de})})))()}pe();export{fe as default};