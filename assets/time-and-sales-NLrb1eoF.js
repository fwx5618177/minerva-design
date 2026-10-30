import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{n as d,t as f}from"./Switch-DL9RsLtd.js";import{a as p,o as ee}from"./angular-preview-CRBX9cKI.js";import{l as m,n as h,t as g,u as te}from"./DocPage-JhXgs5p-.js";import{f as _,i as ne,r as v,s as y,t as re,u as b}from"./feed-CGHorric.js";function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),[t]=(0,x.useState)(()=>re({seed:31},6e4).updates.flatMap(e=>e.trades));return(0,S.jsx)(_,{trades:t,height:360,columns:[`time`,`price`,`size`,`side`],pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})}var x,S;function C(){return(C=e((()=>{x=t(),i(),b(),v(),S=n()})))()}function ae(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,w.useRef)(null),n=(0,w.useRef)(null);return y(n,{seed:36},{load:()=>t.current?.clear(),update:({trades:e})=>{e.length&&t.current?.addTrades(e)}}),(0,T.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:300},children:(0,T.jsx)(_,{ref:t,height:260,rowHeight:17,fontSize:11,milliseconds:!1,aggregate:!0,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var w,T;function oe(){return(oe=e((()=>{w=t(),i(),b(),v(),T=n()})))()}function se(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,E.useRef)(null),n=(0,E.useRef)(null);return y(n,{seed:35,activity:180},{load:()=>t.current?.clear(),update:({trades:e})=>{e.length&&t.current?.addTrades(e)}}),(0,D.jsx)(`div`,{ref:n,style:O,children:(0,D.jsx)(_,{ref:t,height:380,rowHeight:19,largeTradeThreshold:1,priceColor:`tick`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})})}var E,D,O;function k(){return(k=e((()=>{E=t(),i(),b(),v(),D=n(),O={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:`8px 4px 4px`,width:`100%`,boxSizing:`border-box`}})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,A.useRef)(null),i=(0,A.useRef)(null),[a,o]=(0,A.useState)(0),[c,l]=(0,A.useState)(!0),[d,p]=(0,A.useState)(!1),[ee,m]=(0,A.useState)(0),h=(0,A.useRef)(0);y(i,{seed:34,activity:200},{load:()=>n.current?.clear(),update:({trades:e})=>{if(!e.length)return;let t=n.current;t?.addTrades(e);let r=performance.now();r-h.current<250||(h.current=r,m(t?.getInstance()?.getCount()??0))}});let g=new Intl.NumberFormat(t.language);return(0,j.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsx)(s,{"aria-label":e(`minSize`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:M.map(t=>(0,j.jsx)(u,{value:t,label:t?e(`atLeast`,{value:g.format(t)}):e(`all`)},t))}),(0,j.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,j.jsx)(f,{checked:c,onChange:e=>l(e),label:e(`aggregate`)}),(0,j.jsx)(f,{checked:d,onChange:e=>p(e),label:e(`tickColors`)})]}),(0,j.jsx)(_,{ref:n,height:340,minSize:a,aggregate:c,priceColor:d?`tick`:`side`,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,j.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`rows`,{value:g.format(ee)})})]})}var A,j,M;function N(){return(N=e((()=>{A=t(),i(),c(),l(),d(),b(),v(),j=n(),M=[0,.01,.1,1]})))()}function P(e,t,n=Date.now()){let r=ne(t),i=Array(e),a=64e3,o=n-e*12;for(let t=0;t<e;t++){r()>.3&&(o+=Math.floor(r()*24)),a=Math.max(1,a+Math.round((r()-.5)*3)/10);let e=r()<.004;i[t]={time:o,price:Math.round(a*10)/10,size:Math.round((e?2+r()*20:5e-4+r()**4*1.5)*1e4)/1e4,side:r()<.5?`buy`:`sell`}}return i}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,F.useRef)(null),i=(0,F.useRef)(null),[a,s]=(0,F.useState)({count:0,ms:0}),c={capacity:5e5,columns:[`time`,`price`,`size`,`side`],largeTradeThreshold:2,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)},l=(0,F.useRef)(c);(0,F.useEffect)(()=>{l.current=c}),(0,F.useEffect)(()=>{let e=n.current;if(!e)return;let t=p(e,l.current);i.current=t;let r=P(1e5,38),a=performance.now();return t.setTrades(r),s({count:t.getCount(),ms:performance.now()-a}),()=>{t.destroy(),i.current=null}},[]),(0,F.useEffect)(()=>{i.current?.setOptions(l.current)},[t.language]);let u=()=>{let e=i.current;if(!e)return;let t=P(1e5,a.count+1),n=performance.now();e.addTrades(t),s({count:e.getCount(),ms:performance.now()-n})},d=new Intl.NumberFormat(t.language);return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,fontSize:13,color:`var(--text-secondary-color)`},children:[(0,I.jsx)(o,{size:`small`,variant:`outline`,onClick:u,children:e(`add`,{value:d.format(1e5)})}),(0,I.jsx)(`span`,{children:e(`loaded`,{rows:d.format(a.count),ms:d.format(Math.round(a.ms))})})]}),(0,I.jsx)(`div`,{ref:n,style:{height:380,width:`100%`}})]})}var F,I;function L(){return(L=e((()=>{F=t(),i(),a(),ee(),v(),I=n()})))()}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,R.useRef)(null),i=(0,R.useRef)(null),[a,o]=(0,R.useState)(1);y(i,{seed:33,whales:.03,activity:160},{load:()=>n.current?.clear(),update:({trades:e})=>{e.length&&n.current?.addTrades(e)}});let c=new Intl.NumberFormat(t.language);return(0,z.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsx)(s,{"aria-label":e(`threshold`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:B.map(t=>(0,z.jsx)(u,{value:t,label:e(`atLeast`,{value:c.format(t)})},t))}),(0,z.jsx)(_,{ref:n,height:360,largeTradeThreshold:a,aggregate:!0,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var R,z,B;function V(){return(V=e((()=>{R=t(),i(),c(),l(),b(),v(),z=n(),B=[.5,1,5]})))()}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,H.useRef)(null),i=(0,H.useRef)(null),[a,o]=(0,H.useState)(!1),[s,c]=(0,H.useState)(null);y(i,{seed:32,activity:220},{load:()=>n.current?.clear(),update:({trades:e})=>{e.length&&n.current?.addTrades(e)}});let l=new Intl.NumberFormat(t.language,{minimumFractionDigits:1}),u=new Intl.NumberFormat(t.language,{maximumFractionDigits:4});return(0,U.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,U.jsx)(_,{ref:n,height:380,columns:[`time`,`price`,`size`,`side`],pauseOnHover:!0,onPause:o,onTradeClick:c,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,U.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:s?e(s.trade.side===`buy`?`pickedBuy`:`pickedSell`,{size:u.format(s.trade.size),price:l.format(s.trade.price)}):e(a?`pausedHint`:`liveHint`)})]})}var H,U;function W(){return(W=e((()=>{H=t(),i(),b(),v(),U=n()})))()}function fe(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,G.useRef)(null),n=(0,G.useRef)(null),[i,a]=(0,G.useState)(`red-up`);return y(n,{seed:37},{load:()=>t.current?.clear(),update:({trades:e})=>{e.length&&t.current?.addTrades(e)}}),(0,K.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,K.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,K.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,K.jsx)(_,{ref:t,colorConvention:i,height:340,columns:[`time`,`price`,`size`,`side`],largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var G,K;function q(){return(q=e((()=>{G=t(),i(),c(),l(),b(),v(),K=n()})))()}var J;function Y(){return(Y=e((()=>{J=`import { useState } from "react";
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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useMarketStream(
    boxRef,
    { seed: 36 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

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
`})))()}var pe;function me(){return(me=e((()=>{pe=`import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

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

  useMarketStream(
    boxRef,
    { seed: 35, activity: 180 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

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
`})))()}var he;function ge(){return(ge=e((()=>{he=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

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
  useMarketStream(
    boxRef,
    { seed: 34, activity: 200 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (!trades.length) return;
        const tape = tapeRef.current;
        tape?.addTrades(trades);
        // the row count, four times a second
        const now = performance.now();
        if (now - countedAt.current < 250) return;
        countedAt.current = now;
        setCount(tape?.getInstance()?.getCount() ?? 0);
      },
    },
  );

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
`})))()}var _e;function ve(){return(ve=e((()=>{_e=`import { useEffect, useRef, useState } from "react";
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
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

const THRESHOLDS = [0.5, 1, 5];

export default function LargeTradesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(1);

  useMarketStream(
    boxRef,
    { seed: 33, whales: 0.03, activity: 160 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

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
`})))()}var xe;function Q(){return(Q=e((()=>{xe=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TimeAndSales,
  type TimeAndSalesHandle,
  type TimeAndSalesRowEvent,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [picked, setPicked] = useState<TimeAndSalesRowEvent | null>(null);

  // trades go to the tape through the ref: React does not re-render
  useMarketStream(
    boxRef,
    { seed: 32, activity: 220 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

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
import { useMarketStream } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");

  useMarketStream(
    boxRef,
    { seed: 37 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
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
`})))()}var we,Te,Ee;function $(){return($=e((()=>{C(),oe(),k(),N(),L(),V(),W(),q(),Y(),Z(),me(),ge(),ve(),be(),Q(),Ce(),t(),h(),te(),we=n(),Te=m(Object.assign({"./demos/basic.tsx":ie,"./demos/compact.tsx":ae,"./demos/dark.tsx":se,"./demos/filters.tsx":ce,"./demos/large-data.tsx":le,"./demos/large-trades.tsx":ue,"./demos/live.tsx":de,"./demos/red-up.tsx":fe}),Object.assign({"./demos/basic.tsx":J,"./demos/compact.tsx":X,"./demos/dark.tsx":pe,"./demos/filters.tsx":he,"./demos/large-data.tsx":_e,"./demos/large-trades.tsx":ye,"./demos/live.tsx":xe,"./demos/red-up.tsx":Se})),Ee=()=>(0,we.jsx)(g,{id:`time-and-sales`,demos:Te})})))()}$();export{Ee as default};