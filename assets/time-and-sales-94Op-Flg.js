import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{n as d,t as f}from"./Switch-DL9RsLtd.js";import{a as p,o as m}from"./angular-preview-C1iguEH5.js";import{l as h,n as g,t as _,u as v}from"./DocPage-6WUEs69-.js";import{a as y,c as b,i as ee,n as x,r as S,t as te,u as C}from"./feed-DaPKtnvz.js";function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),[t]=(0,w.useState)(()=>te({seed:31},6e4).updates.flatMap(e=>e.trades));return(0,T.jsx)(C,{trades:t,height:360,columns:[`time`,`price`,`size`,`side`],pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})}var w,T;function E(){return(E=e((()=>{w=t(),i(),b(),S(),T=n()})))()}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,D.useRef)(null),n=(0,D.useRef)(null),[i]=(0,D.useState)(()=>x({seed:36}));return y(n,e=>{let{trades:n}=i.step(e);n.length&&t.current?.addTrades(n)}),(0,O.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:300},children:(0,O.jsx)(C,{ref:t,height:260,rowHeight:17,fontSize:11,milliseconds:!1,aggregate:!0,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var D,O;function ie(){return(ie=e((()=>{D=t(),i(),b(),S(),O=n()})))()}function ae(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,k.useRef)(null),n=(0,k.useRef)(null),[i]=(0,k.useState)(()=>x({seed:35,activity:180}));return y(n,e=>{let{trades:n}=i.step(e);n.length&&t.current?.addTrades(n)}),(0,A.jsx)(`div`,{ref:n,style:j,children:(0,A.jsx)(C,{ref:t,height:380,rowHeight:19,largeTradeThreshold:1,priceColor:`tick`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})})}var k,A,j;function M(){return(M=e((()=>{k=t(),i(),b(),S(),A=n(),j={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:`8px 4px 4px`,width:`100%`,boxSizing:`border-box`}})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,N.useRef)(null),i=(0,N.useRef)(null),[a,o]=(0,N.useState)(0),[c,l]=(0,N.useState)(!0),[d,p]=(0,N.useState)(!1),[m,h]=(0,N.useState)(0),g=(0,N.useRef)(0),[_]=(0,N.useState)(()=>x({seed:34,activity:200}));y(i,e=>{let{trades:t}=_.step(e);if(!t.length)return;let r=n.current;r?.addTrades(t);let i=performance.now();i-g.current<250||(g.current=i,h(r?.getInstance()?.getCount()??0))});let v=new Intl.NumberFormat(t.language);return(0,P.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(s,{"aria-label":e(`minSize`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:F.map(t=>(0,P.jsx)(u,{value:t,label:t?e(`atLeast`,{value:v.format(t)}):e(`all`)},t))}),(0,P.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,P.jsx)(f,{checked:c,onChange:e=>l(e),label:e(`aggregate`)}),(0,P.jsx)(f,{checked:d,onChange:e=>p(e),label:e(`tickColors`)})]}),(0,P.jsx)(C,{ref:n,height:340,minSize:a,aggregate:c,priceColor:d?`tick`:`side`,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,P.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`rows`,{value:v.format(m)})})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),i(),c(),l(),d(),b(),S(),P=n(),F=[0,.01,.1,1]})))()}function L(e,t,n=Date.now()){let r=ee(t),i=Array(e),a=64e3,o=n-e*12;for(let t=0;t<e;t++){r()>.3&&(o+=Math.floor(r()*24)),a=Math.max(1,a+Math.round((r()-.5)*3)/10);let e=r()<.004;i[t]={time:o,price:Math.round(a*10)/10,size:Math.round((e?2+r()*20:5e-4+r()**4*1.5)*1e4)/1e4,side:r()<.5?`buy`:`sell`}}return i}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,R.useRef)(null),i=(0,R.useRef)(null),[a,s]=(0,R.useState)({count:0,ms:0}),c={capacity:5e5,columns:[`time`,`price`,`size`,`side`],largeTradeThreshold:2,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)},l=(0,R.useRef)(c);(0,R.useEffect)(()=>{l.current=c}),(0,R.useEffect)(()=>{let e=n.current;if(!e)return;let t=p(e,l.current);i.current=t;let r=L(1e5,38),a=performance.now();return t.setTrades(r),s({count:t.getCount(),ms:performance.now()-a}),()=>{t.destroy(),i.current=null}},[]),(0,R.useEffect)(()=>{i.current?.setOptions(l.current)},[t.language]);let u=()=>{let e=i.current;if(!e)return;let t=L(1e5,a.count+1),n=performance.now();e.addTrades(t),s({count:e.getCount(),ms:performance.now()-n})},d=new Intl.NumberFormat(t.language);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,fontSize:13,color:`var(--text-secondary-color)`},children:[(0,z.jsx)(o,{size:`small`,variant:`outline`,onClick:u,children:e(`add`,{value:d.format(1e5)})}),(0,z.jsx)(`span`,{children:e(`loaded`,{rows:d.format(a.count),ms:d.format(Math.round(a.ms))})})]}),(0,z.jsx)(`div`,{ref:n,style:{height:380,width:`100%`}})]})}var R,z;function B(){return(B=e((()=>{R=t(),i(),a(),m(),S(),z=n()})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,V.useRef)(null),i=(0,V.useRef)(null),[a,o]=(0,V.useState)(1),[c]=(0,V.useState)(()=>x({seed:33,whales:.03,activity:160}));y(i,e=>{let{trades:t}=c.step(e);t.length&&n.current?.addTrades(t)});let l=new Intl.NumberFormat(t.language);return(0,H.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsx)(s,{"aria-label":e(`threshold`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:U.map(t=>(0,H.jsx)(u,{value:t,label:e(`atLeast`,{value:l.format(t)})},t))}),(0,H.jsx)(C,{ref:n,height:360,largeTradeThreshold:a,aggregate:!0,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var V,H,U;function W(){return(W=e((()=>{V=t(),i(),c(),l(),b(),S(),H=n(),U=[.5,1,5]})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,G.useRef)(null),i=(0,G.useRef)(null),[a]=(0,G.useState)(()=>x({seed:32,activity:220})),[o,s]=(0,G.useState)(!1),[c,l]=(0,G.useState)(null);y(i,e=>{let{trades:t}=a.step(e);t.length&&n.current?.addTrades(t)});let u=new Intl.NumberFormat(t.language,{minimumFractionDigits:1}),d=new Intl.NumberFormat(t.language,{maximumFractionDigits:4});return(0,K.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsx)(C,{ref:n,height:380,columns:[`time`,`price`,`size`,`side`],pauseOnHover:!0,onPause:s,onTradeClick:l,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,K.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:c?e(c.trade.side===`buy`?`pickedBuy`:`pickedSell`,{size:d.format(c.trade.size),price:u.format(c.trade.price)}):e(o?`pausedHint`:`liveHint`)})]})}var G,K;function q(){return(q=e((()=>{G=t(),i(),b(),S(),K=n()})))()}function ue(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,J.useRef)(null),n=(0,J.useRef)(null),[i,a]=(0,J.useState)(`red-up`),[o]=(0,J.useState)(()=>x({seed:37}));return y(n,e=>{let{trades:n}=o.step(e);n.length&&t.current?.addTrades(n)}),(0,Y.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,Y.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,Y.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,Y.jsx)(C,{ref:t,colorConvention:i,height:340,columns:[`time`,`price`,`size`,`side`],largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var J,Y;function X(){return(X=e((()=>{J=t(),i(),c(),l(),b(),S(),Y=n()})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales } from "minerva-design/charts";
import { createHistory } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  // the trades of the last minute, oldest first
  const [trades] = useState(() =>
    createHistory({ seed: 31 }, 60_000).updates.flatMap((u) => u.trades),
  );
  return (
    <TimeAndSales
      trades={trades}
      height={360}
      columns={["time", "price", "size", "side"]}
      pricePrecision={1}
      sizePrecision={4}
      ariaLabel={t("aria")}
    />
  );
}
`})))()}var $;function de(){return(de=e((()=>{$=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 36 }));

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  // phone-sized: seconds only, short rows; drag the scrollbar or swipe back
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <TimeAndSales
        ref={tapeRef}
        height={260}
        rowHeight={17}
        fontSize={11}
        milliseconds={false}
        aggregate
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var fe;function pe(){return(pe=e((()=>{fe=`import { useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

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
  padding: "8px 4px 4px",
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 35, activity: 180 }));

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  return (
    <div ref={boxRef} style={TERMINAL}>
      <TimeAndSales
        ref={tapeRef}
        height={380}
        rowHeight={19}
        largeTradeThreshold={1}
        // tick coloring: green on an uptick, red on a downtick
        priceColor="tick"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var me;function he(){return(he=e((()=>{me=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

const MIN_SIZES = [0, 0.01, 0.1, 1];

export default function FiltersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [minSize, setMinSize] = useState(0);
  const [aggregate, setAggregate] = useState(true);
  const [tick, setTick] = useState(false);
  const [count, setCount] = useState(0);
  const countedAt = useRef(0);
  const [feed] = useState(() => createMarketFeed({ seed: 34, activity: 200 }));

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (!trades.length) return;
    const tape = tapeRef.current;
    tape?.addTrades(trades);
    // the row count, four times a second
    const now = performance.now();
    if (now - countedAt.current < 250) return;
    countedAt.current = now;
    setCount(tape?.getInstance()?.getCount() ?? 0);
  });

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("minSize")}
        direction="horizontal"
        value={minSize}
        onChange={(value) => setMinSize(Number(value))}
      >
        {MIN_SIZES.map((value) => (
          <Radio
            key={value}
            value={value}
            label={
              value ? t("atLeast", { value: number.format(value) }) : t("all")
            }
          />
        ))}
      </RadioGroup>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <Switch
          checked={aggregate}
          onChange={(checked) => setAggregate(checked)}
          label={t("aggregate")}
        />
        <Switch
          checked={tick}
          onChange={(checked) => setTick(checked)}
          label={t("tickColors")}
        />
      </div>
      <TimeAndSales
        ref={tapeRef}
        height={340}
        // filters apply to the kept history too (up to \`capacity\` trades)
        minSize={minSize}
        aggregate={aggregate}
        priceColor={tick ? "tick" : "side"}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {t("rows", { value: number.format(count) })}
      </span>
    </div>
  );
}
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createTimeAndSales,
  type TimeAndSalesInstance,
  type MarketTrade,
} from "minerva-design/charts/core";
import { mulberry32 } from "../../order-book/feed";

/** \`count\` trades ending now: a random walk, sweeps sharing their millisecond */
function generate(
  count: number,
  seed: number,
  end = Date.now(),
): MarketTrade[] {
  const random = mulberry32(seed);
  const trades: MarketTrade[] = new Array(count);
  let price = 64000;
  let time = end - count * 12;
  for (let i = 0; i < count; i++) {
    if (random() > 0.3) time += Math.floor(random() * 24);
    price = Math.max(1, price + Math.round((random() - 0.5) * 3) / 10);
    const whale = random() < 0.004;
    trades[i] = {
      time,
      price: Math.round(price * 10) / 10,
      size:
        Math.round(
          (whale ? 2 + random() * 20 : 0.0005 + random() ** 4 * 1.5) * 1e4,
        ) / 1e4,
      side: random() < 0.5 ? "buy" : "sell",
    };
  }
  return trades;
}

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<TimeAndSalesInstance | null>(null);
  const [stats, setStats] = useState({ count: 0, ms: 0 });
  const options = {
    capacity: 500_000,
    columns: ["time", "price", "size", "side"] as const,
    largeTradeThreshold: 2,
    pricePrecision: 1,
    sizePrecision: 4,
    ariaLabel: t("aria"),
  };
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  // the framework-free engine (minerva-design/charts/core): typed-array
  // rings, only the visible rows are drawn
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tape = createTimeAndSales(container, optionsRef.current);
    tapeRef.current = tape;
    const trades = generate(100_000, 38);
    const start = performance.now();
    tape.setTrades(trades);
    setStats({ count: tape.getCount(), ms: performance.now() - start });
    return () => {
      tape.destroy();
      tapeRef.current = null;
    };
  }, []);

  // the built-in texts and number formats follow the page language
  // (<html lang>): apply the options again after a language switch
  useEffect(() => {
    tapeRef.current?.setOptions(optionsRef.current);
  }, [i18n.language]);

  const add = () => {
    const tape = tapeRef.current;
    if (!tape) return;
    const trades = generate(100_000, stats.count + 1);
    const start = performance.now();
    tape.addTrades(trades);
    setStats({ count: tape.getCount(), ms: performance.now() - start });
  };

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        <Button size="small" variant="outline" onClick={add}>
          {t("add", { value: number.format(100_000) })}
        </Button>
        <span>
          {t("loaded", {
            rows: number.format(stats.count),
            ms: number.format(Math.round(stats.ms)),
          })}
        </span>
      </div>
      <div ref={containerRef} style={{ height: 380, width: "100%" }} />
    </div>
  );
}
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

const THRESHOLDS = [0.5, 1, 5];

export default function LargeTradesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(1);
  const [feed] = useState(() =>
    createMarketFeed({ seed: 33, whales: 0.03, activity: 160 }),
  );

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  const size = new Intl.NumberFormat(i18n.language);
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
      <TimeAndSales
        ref={tapeRef}
        height={360}
        // bold and tinted from the threshold, stronger up to 8x
        largeTradeThreshold={threshold}
        // one sweep of several levels = one row
        aggregate
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TimeAndSales,
  type TimeAndSalesHandle,
  type TimeAndSalesRowEvent,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 32, activity: 220 }));
  const [paused, setPaused] = useState(false);
  const [picked, setPicked] = useState<TimeAndSalesRowEvent | null>(null);

  // trades go to the tape through the ref: React does not re-render
  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 4,
  });
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <TimeAndSales
        ref={tapeRef}
        height={380}
        columns={["time", "price", "size", "side"]}
        // freezes while hovered: new trades are counted in the badge
        pauseOnHover
        onPause={setPaused}
        onTradeClick={setPicked}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {picked
          ? t(picked.trade.side === "buy" ? "pickedBuy" : "pickedSell", {
              size: size.format(picked.trade.size),
              price: price.format(picked.trade.price),
            })
          : paused
            ? t("pausedHint")
            : t("liveHint")}
      </span>
    </div>
  );
}
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TimeAndSales,
  type OrderBookColorConvention,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  const [feed] = useState(() => createMarketFeed({ seed: 37 }));

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
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
      <TimeAndSales
        ref={tapeRef}
        // red buys, green sells
        colorConvention={convention}
        height={340}
        columns={["time", "price", "size", "side"]}
        largeTradeThreshold={1}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var we,Te,Ee;function De(){return(De=e((()=>{E(),ie(),M(),I(),B(),W(),q(),X(),Q(),de(),pe(),he(),_e(),ye(),xe(),Ce(),t(),g(),v(),we=n(),Te=h(Object.assign({"./demos/basic.tsx":ne,"./demos/compact.tsx":re,"./demos/dark.tsx":ae,"./demos/filters.tsx":oe,"./demos/large-data.tsx":se,"./demos/large-trades.tsx":ce,"./demos/live.tsx":le,"./demos/red-up.tsx":ue}),Object.assign({"./demos/basic.tsx":Z,"./demos/compact.tsx":$,"./demos/dark.tsx":fe,"./demos/filters.tsx":me,"./demos/large-data.tsx":ge,"./demos/large-trades.tsx":ve,"./demos/live.tsx":be,"./demos/red-up.tsx":Se})),Ee=()=>(0,we.jsx)(_,{id:`time-and-sales`,demos:Te})})))()}De();export{Ee as default};