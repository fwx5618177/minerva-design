import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-DNQTyaNH.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{i as d,r as f}from"./DemoBlock-CUoEzVo9.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-CfPUO8JU.js";import{c as p,o as m,r as h,u as g}from"./feed-a3uhDZjB.js";function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,_.useRef)(null),n=(0,_.useRef)(null);return m(n,t,{seed:21},12e4),(0,v.jsx)(`div`,{ref:n,style:{width:`100%`},children:(0,v.jsx)(p,{ref:t,height:400,interval:250,window:12e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var _,v;function y(){return(y=e((()=>{_=t(),i(),g(),h(),v=n()})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,b.useRef)(null),i=(0,b.useRef)(null),[a,o]=(0,b.useState)(`sqrt`),[c,l]=(0,b.useState)(1);m(i,n,{seed:23,whales:.015},6e4);let d=new Intl.NumberFormat(t.language);return(0,x.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,x.jsxs)(s,{"aria-label":e(`scale`),direction:`horizontal`,value:a,onChange:e=>o(e),children:[(0,x.jsx)(u,{value:`sqrt`,label:e(`scaleSqrt`)}),(0,x.jsx)(u,{value:`linear`,label:e(`scaleLinear`)}),(0,x.jsx)(u,{value:`log`,label:e(`scaleLog`)})]}),(0,x.jsx)(s,{"aria-label":e(`contrast`),direction:`horizontal`,value:c,onChange:e=>l(Number(e)),children:S.map(t=>(0,x.jsx)(u,{value:t,label:e(`times`,{value:d.format(t)})},t))})]}),(0,x.jsx)(p,{ref:n,height:380,colorScale:a,contrast:c,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var b,x,S;function C(){return(C=e((()=>{b=t(),i(),c(),l(),g(),h(),x=n(),S=[.5,1,2,4]})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,w.useRef)(null),n=(0,w.useRef)(null);return m(n,t,{seed:25},3e4),(0,T.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:360},children:(0,T.jsx)(p,{ref:t,height:240,interval:150,window:3e4,profile:!1,bubbleSize:16,fontSize:10,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})})}var w,T;function E(){return(E=e((()=>{w=t(),i(),g(),h(),T=n()})))()}function se(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,D.useRef)(null),n=(0,D.useRef)(null);return m(n,t,{seed:24,whales:.012},9e4),(0,O.jsx)(`div`,{ref:n,style:k,children:(0,O.jsx)(p,{ref:t,height:420,colors:A,contrast:.7,timeZone:`utc`,interval:200,window:9e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})})}var D,O,k,A;function j(){return(j=e((()=>{D=t(),i(),g(),h(),O=n(),k={"--background-color":`#06080d`,"--surface-color":`#06080d`,"--surface-elevated-color":`#151a22`,"--text-color":`#e6e8eb`,"--text-secondary-color":`#7d8590`,"--border-color":`#262c36`,"--success-color":`#26d07c`,"--danger-color":`#ff4d6a`,background:`#06080d`,color:`#e6e8eb`,borderRadius:12,padding:8,width:`100%`,boxSizing:`border-box`},A=[`#050b18`,`#0a2a5c`,`#0f6fb5`,`#19c2d6`,`#f5e663`,`#ff9a1f`,`#ff3b1f`]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),n=(0,M.useRef)(null),i=(0,M.useRef)(null),[a,o]=(0,M.useState)(null);m(i,n,{seed:27,whales:.03,activity:180},9e4);let s=new Intl.NumberFormat(t.language,{maximumFractionDigits:3});return(0,N.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsx)(p,{ref:n,height:400,interval:1e3,window:9e4,bubbleSize:30,bubbleVolume:12,contrast:.6,onHover:o,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,N.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:a?e(`volumeAt`,{buys:s.format(a.buyVolume),sells:s.format(a.sellVolume)}):e(`volumeHint`)})]})}var M,N;function P(){return(P=e((()=>{M=t(),i(),g(),h(),N=n()})))()}function le(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,F.useRef)(null),n=(0,F.useRef)(null),[i,a]=(0,F.useState)(null),[s,c]=(0,F.useState)(!0);return m(n,t,{seed:22,activity:200},15e3,{step:10,interval:10}),(0,I.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(p,{ref:t,height:400,interval:50,window:15e3,onRendererChange:a,onFollowChange:c,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)}),(0,I.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,color:`var(--text-secondary-color)`,fontSize:13},children:[(0,I.jsx)(`span`,{children:e(`rendererIs`,{value:i?e(`renderers.${i}`):`…`})}),(0,I.jsx)(`span`,{children:e(s?`following`:`panned`)}),(0,I.jsx)(o,{size:`small`,variant:`outline`,disabled:s,onClick:()=>t.current?.resetView(),children:e(`followMarket`)})]})]})}var F,I;function L(){return(L=e((()=>{F=t(),i(),a(),g(),h(),I=n()})))()}function ue(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.data`}),t=(0,R.useRef)(null),n=(0,R.useRef)(null),[i,a]=(0,R.useState)(`red-up`);return m(n,t,{seed:26},6e4),(0,z.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,z.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,z.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,z.jsx)(p,{ref:t,colorConvention:i,height:360,interval:200,window:6e4,pricePrecision:1,sizePrecision:3,sizeUnit:`BTC`,ariaLabel:e(`aria`)})]})}var R,z;function B(){return(B=e((()=>{R=t(),i(),c(),l(),g(),h(),z=n()})))()}var V;function H(){return(H=e((()=>{V=`import { useRef } from "react";
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { useRef, useState } from "react";
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
`})))()}var G;function K(){return(K=e((()=>{G=`import { useRef } from "react";
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
`})))()}var q;function J(){return(J=e((()=>{q=`import { useRef, type CSSProperties } from "react";
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
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { useRef, useState } from "react";
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
`})))()}var Z;function de(){return(de=e((()=>{Z=`import { useRef, useState } from "react";
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
`})))()}var fe;function pe(){return(pe=e((()=>{fe=`import { useRef, useState } from "react";
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
`})))()}var Q,$,me,he,ge;function _e(){return(_e=e((()=>{y(),C(),E(),j(),P(),L(),B(),H(),W(),K(),J(),X(),de(),pe(),t(),i(),te(),d(),re(),Q=n(),$=ee(Object.assign({"./demos/basic.tsx":ie,"./demos/color-scale.tsx":ae,"./demos/compact.tsx":oe,"./demos/dark.tsx":se,"./demos/large-trades.tsx":ce,"./demos/live.tsx":le,"./demos/red-up.tsx":ue}),Object.assign({"./demos/basic.tsx":V,"./demos/color-scale.tsx":U,"./demos/compact.tsx":G,"./demos/dark.tsx":q,"./demos/large-trades.tsx":Y,"./demos/live.tsx":Z,"./demos/red-up.tsx":fe})),me=[`axes`,`color`,`walls`,`lines`,`bubbles`,`profile`],he=[`hold`,`pull`,`sweep`,`thin`],ge=()=>{let{t:e}=r(`common`,{keyPrefix:`docs.order-book-heatmap.read`}),t=(0,Q.jsxs)(`section`,{className:f.section,"aria-labelledby":`heatmap-read`,children:[(0,Q.jsx)(`h2`,{id:`heatmap-read`,children:e(`title`)}),(0,Q.jsx)(`p`,{className:f.prose,children:e(`text`)}),(0,Q.jsx)(`ul`,{className:f.prose,children:me.map(t=>(0,Q.jsx)(`li`,{children:e(t)},t))}),(0,Q.jsx)(`h3`,{children:e(`patterns.title`)}),(0,Q.jsx)(`ul`,{className:f.prose,children:he.map(t=>(0,Q.jsx)(`li`,{children:e(`patterns.${t}`)},t))})]});return(0,Q.jsx)(ne,{id:`order-book-heatmap`,demos:$,intro:t})}})))()}_e();export{ge as default};