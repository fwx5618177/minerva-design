import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BzoVi22c.js";import{i as a,n as o,r as s,t as c}from"./Radio-DnNachfg.js";import{l,n as u,t as d,u as f}from"./DocPage-B2iACtLP.js";import{a as p,c as m,l as h,n as g,r as _,s as v,u as ee}from"./feed-6-CmBDu_.js";function y(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,b.useMemo)(()=>g({seed:1}).snapshot(),[]);return(0,x.jsx)(v,{book:t,height:420,pricePrecision:1,sizePrecision:4,labels:{price:e(`price`),size:e(`size`),total:e(`total`)},ariaLabel:e(`aria`)})}var b,x;function S(){return(S=e((()=>{b=t(),i(),m(),_(),x=n()})))()}function C(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,w.useRef)(null),n=(0,w.useRef)(null),[i]=(0,w.useState)(()=>g({seed:5})),[a]=(0,w.useState)(()=>i.snapshot());return p(n,e=>{let{delta:n,trades:r}=i.step(e);t.current?.applyDeltas(n),r.length&&t.current?.setLastPrice(i.last())}),(0,T.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:300},children:(0,T.jsx)(v,{ref:t,book:a,height:300,rowHeight:17,fontSize:11,columns:[`price`,`size`],imbalance:!1,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var w,T;function E(){return(E=e((()=>{w=t(),i(),m(),_(),T=n()})))()}function te(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,D.useRef)(null),n=(0,D.useRef)(null),[i]=(0,D.useState)(()=>g({seed:4})),[a]=(0,D.useState)(()=>i.snapshot());return p(n,e=>{let{delta:n,trades:r}=i.step(e);t.current?.applyDeltas(n),r.length&&t.current?.setLastPrice(i.last())}),(0,O.jsxs)(`div`,{ref:n,style:k,children:[(0,O.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,padding:`0 10px 8px`,fontSize:13},children:[(0,O.jsx)(`strong`,{children:e(`pair`)}),(0,O.jsx)(`span`,{style:{color:`#848e9c`},children:e(`title`)})]}),(0,O.jsx)(v,{ref:t,book:a,height:440,pricePrecision:1,sizePrecision:4,total:`quote`,depthBars:`level`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})]})}var D,O,k;function A(){return(A=e((()=>{D=t(),i(),m(),_(),O=n(),k={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:`12px 4px 4px`,width:`100%`,boxSizing:`border-box`}})))()}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,j.useRef)(null),i=(0,j.useRef)(null),[o,s]=(0,j.useState)(1),[l,u]=(0,j.useState)(`cumulative`),[d]=(0,j.useState)(()=>g({seed:3})),[f]=(0,j.useState)(()=>d.snapshot());return p(i,e=>{let{delta:t,trades:r}=d.step(e);n.current?.applyDeltas(t),r.length&&n.current?.setLastPrice(d.last())}),(0,M.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,M.jsx)(a,{"aria-label":e(`grouping`),direction:`horizontal`,value:o,onChange:e=>s(Number(e)),children:N.map(e=>(0,M.jsx)(c,{value:e,label:new Intl.NumberFormat(t.language).format(e)},e))}),(0,M.jsxs)(a,{"aria-label":e(`depthBars`),direction:`horizontal`,value:l,onChange:e=>u(e),children:[(0,M.jsx)(c,{value:`cumulative`,label:e(`barsCumulative`)}),(0,M.jsx)(c,{value:`level`,label:e(`barsLevel`)})]})]}),(0,M.jsx)(v,{ref:n,book:f,grouping:o,depthBars:l,sizePrecision:3,height:420,ariaLabel:e(`aria`)})]})}var j,M,N;function P(){return(P=e((()=>{j=t(),i(),o(),s(),m(),_(),M=n(),N=[.1,.5,1,10,50]})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,F.useRef)(null),i=(0,F.useRef)(null),[o,s]=(0,F.useState)(5),[l,u]=(0,F.useState)(null),[d]=(0,F.useState)(()=>g({seed:8,whales:.03})),[f]=(0,F.useState)(()=>d.snapshot());p(i,e=>{let{delta:t,trades:r}=d.step(e);n.current?.applyDeltas(t),r.length&&n.current?.setLastPrice(d.last())});let m=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),h=new Intl.NumberFormat(t.language,{maximumFractionDigits:4});return(0,I.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(a,{"aria-label":e(`threshold`),direction:`horizontal`,value:o,onChange:e=>s(Number(e)),children:L.map(t=>(0,I.jsx)(c,{value:t,label:e(`atLeast`,{value:h.format(t)})},t))}),(0,I.jsx)(v,{ref:n,book:f,largeOrderThreshold:o,depthBars:`level`,height:420,pricePrecision:1,sizePrecision:4,onLevelClick:u,ariaLabel:e(`aria`)}),(0,I.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:l?e(l.side===`bid`?`pickedBid`:`pickedAsk`,{price:m.format(l.price),size:h.format(l.size),sum:h.format(l.sum)}):e(`pickHint`)})]})}var F,I,L;function R(){return(R=e((()=>{F=t(),i(),o(),s(),m(),_(),I=n(),L=[2,5,10]})))()}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,z.useRef)(null),i=(0,z.useRef)(null),[o,s]=(0,z.useState)(50),[l]=(0,z.useState)(()=>g({seed:2})),[u]=(0,z.useState)(()=>l.snapshot()),[d,f]=(0,z.useState)({updates:0,levels:0}),m=(0,z.useRef)({updates:0,levels:0,since:0});p(i,e=>{let{delta:t,trades:r}=l.step(e);n.current?.applyDeltas(t),r.length&&n.current?.setLastPrice(l.last());let i=m.current;i.updates++,i.levels+=t.bids.length+t.asks.length;let a=performance.now();if(a-i.since>=1e3){let e=i.since?(a-i.since)/1e3:1;f({updates:Math.round(i.updates/e),levels:Math.round(i.levels/e)}),m.current={updates:0,levels:0,since:a}}},{interval:1e3/o});let h=new Intl.NumberFormat(t.language);return(0,B.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsx)(a,{"aria-label":e(`updateRate`),direction:`horizontal`,value:o,onChange:e=>s(Number(e)),children:[10,50,200].map(t=>(0,B.jsx)(c,{value:t,label:e(`perSecond`,{value:t})},t))}),(0,B.jsx)(v,{ref:n,book:u,height:440,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,B.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:e(`liveStats`,{updates:h.format(d.updates),levels:h.format(d.levels)})})]})}var z,B;function V(){return(V=e((()=>{z=t(),i(),o(),s(),m(),_(),B=n()})))()}function ae(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,H.useRef)(null),n=(0,H.useRef)(null),[i,o]=(0,H.useState)(`both`),[s]=(0,H.useState)(()=>g({seed:9})),[l]=(0,H.useState)(()=>s.snapshot());return p(n,e=>{let{delta:n,trades:r}=s.step(e);t.current?.applyDeltas(n),r.length&&t.current?.setLastPrice(s.last())}),(0,U.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,U.jsxs)(a,{"aria-label":e(`mode`),direction:`horizontal`,value:i,onChange:e=>o(e),children:[(0,U.jsx)(c,{value:`both`,label:e(`modeBoth`)}),(0,U.jsx)(c,{value:`bids`,label:e(`modeBids`)}),(0,U.jsx)(c,{value:`asks`,label:e(`modeAsks`)})]}),(0,U.jsx)(v,{ref:t,book:l,mode:i,height:380,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var H,U;function W(){return(W=e((()=>{H=t(),i(),o(),s(),m(),_(),U=n()})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,G.useRef)(null),n=(0,G.useRef)(null),[i,o]=(0,G.useState)(`red-up`),[s]=(0,G.useState)(()=>g({seed:6})),[l]=(0,G.useState)(()=>s.snapshot());return p(n,e=>{let{delta:n,trades:r}=s.step(e);t.current?.applyDeltas(n),r.length&&t.current?.setLastPrice(s.last())}),(0,K.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsxs)(a,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>o(e),children:[(0,K.jsx)(c,{value:`red-up`,label:e(`redUp`)}),(0,K.jsx)(c,{value:`green-up`,label:e(`greenUp`)})]}),(0,K.jsx)(v,{ref:t,book:l,colorConvention:i,height:400,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var G,K;function q(){return(q=e((()=>{G=t(),i(),o(),s(),m(),_(),K=n()})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=t.language,i=(0,J.useRef)(null),a=(0,J.useRef)(null),o=(0,J.useRef)(null),s=(0,J.useRef)(null),[c]=(0,J.useState)(()=>g({seed:10})),[l]=(0,J.useState)(()=>c.snapshot()),[u,d]=(0,J.useState)({last:c.last(),open:c.last()}),[f,m]=(0,J.useState)(null),_=(0,J.useRef)(0);p(s,e=>{let{delta:t,trades:n}=c.step(e);if(i.current?.applyDeltas(t),a.current?.applyDeltas(t),!n.length)return;o.current?.addTrades(n),i.current?.setLastPrice(c.last());let r=performance.now();r-_.current>250&&(_.current=r,d(e=>({...e,last:c.last()})))});let y=e(`limit`),b=(0,J.useMemo)(()=>f===null?[]:[{price:f,label:y}],[f,y]),x=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),S=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`always`}),C=u.last/u.open-1,w={pricePrecision:1,sizePrecision:4,fontFamily:X},T={border:`1px solid var(--border-color)`,borderRadius:10,padding:`8px 4px 4px`,minWidth:0},E={margin:`0 10px 6px`,fontSize:12,fontWeight:600,color:`var(--text-secondary-color)`};return(0,Y.jsxs)(`div`,{ref:s,style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`baseline`,gap:`4px 16px`,fontVariantNumeric:`tabular-nums`},children:[(0,Y.jsx)(`strong`,{style:{fontSize:16},children:e(`pair`)}),(0,Y.jsx)(`span`,{style:{fontSize:20,fontWeight:700,fontFamily:X,color:C>=0?`var(--success-color)`:`var(--danger-color)`},children:x.format(u.last)}),(0,Y.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`sessionChange`,{value:S.format(C)})}),(0,Y.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:f===null?e(`pickHint`):e(`limitAt`,{price:x.format(f)})})]}),(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`},children:[(0,Y.jsxs)(`section`,{style:T,"aria-label":e(`title`),children:[(0,Y.jsx)(`h4`,{style:E,children:e(`title`)}),(0,Y.jsx)(v,{ref:i,book:l,height:472,onLevelClick:e=>m(e.price),labels:{price:e(`price`),size:e(`size`),total:e(`total`)},ariaLabel:e(`aria`),...w})]}),(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,minWidth:0},children:[(0,Y.jsxs)(`section`,{style:T,"aria-label":e(`depth`),children:[(0,Y.jsx)(`h4`,{style:E,children:e(`depth`)}),(0,Y.jsx)(h,{ref:a,book:l,height:200,range:.002,legend:!1,priceLines:b,ariaLabel:e(`depthAria`),...w})]}),(0,Y.jsxs)(`section`,{style:T,"aria-label":e(`trades`),children:[(0,Y.jsx)(`h4`,{style:E,children:e(`trades`)}),(0,Y.jsx)(ee,{ref:o,height:220,largeTradeThreshold:1,ariaLabel:e(`tradesAria`),...w})]})]})]})]})}var J,Y,X;function ce(){return(ce=e((()=>{J=t(),i(),m(),_(),Y=n(),X=`ui-monospace, SFMono-Regular, Menlo, monospace`})))()}var Z;function le(){return(le=e((()=>{Z=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook } from "minerva-design/charts";
import { createMarketFeed } from "../feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  // a BTC/USDT book: 0.1 USDT price tick, sizes in BTC
  const book = useMemo(() => createMarketFeed({ seed: 1 }).snapshot(), []);
  return (
    <OrderBook
      book={book}
      height={420}
      pricePrecision={1}
      sizePrecision={4}
      labels={{ price: t("price"), size: t("size"), total: t("total") }}
      ariaLabel={t("aria")}
    />
  );
}
`})))()}var ue;function de(){return(de=e((()=>{ue=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 5 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  // a phone-sized panel: two columns, smaller rows, as many as fit
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <OrderBook
        ref={bookRef}
        book={book}
        height={300}
        rowHeight={17}
        fontSize={11}
        columns={["price", "size"]}
        imbalance={false}
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var fe;function pe(){return(pe=e((()=>{fe=`import { useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

// a trading terminal palette: the ladder reads its colors from these
// variables (a dark site theme works the same way, without the wrapper)
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
  padding: "12px 4px 4px",
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 4 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  return (
    <div ref={boxRef} style={TERMINAL}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px 8px",
          fontSize: 13,
        }}
      >
        <strong>{t("pair")}</strong>
        <span style={{ color: "#848e9c" }}>{t("title")}</span>
      </div>
      <OrderBook
        ref={bookRef}
        book={book}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        // the total column in USDT, bars per level
        total="quote"
        depthBars="level"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var me;function he(){return(he=e((()=>{me=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

const STEPS = [0.1, 0.5, 1, 10, 50];

export default function GroupingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [grouping, setGrouping] = useState(1);
  const [bars, setBars] = useState<"cumulative" | "level">("cumulative");
  const [feed] = useState(() => createMarketFeed({ seed: 3 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("grouping")}
          direction="horizontal"
          value={grouping}
          onChange={(value) => setGrouping(Number(value))}
        >
          {STEPS.map((step) => (
            <Radio
              key={step}
              value={step}
              label={new Intl.NumberFormat(i18n.language).format(step)}
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("depthBars")}
          direction="horizontal"
          value={bars}
          onChange={(value) => setBars(value as "cumulative" | "level")}
        >
          <Radio value="cumulative" label={t("barsCumulative")} />
          <Radio value="level" label={t("barsLevel")} />
        </RadioGroup>
      </div>
      <OrderBook
        ref={bookRef}
        book={book}
        // bids are rounded down to the step, asks up: buckets never cross
        grouping={grouping}
        depthBars={bars}
        // the price decimals follow the step (1 → "64,012")
        sizePrecision={3}
        height={420}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var ge;function Q(){return(Q=e((()=>{ge=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

const THRESHOLDS = [2, 5, 10];

export default function LargeOrdersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(5);
  const [picked, setPicked] = useState<OrderBookLevelEvent | null>(null);
  // more whales than usual: walls of 5 to 30 BTC
  const [feed] = useState(() => createMarketFeed({ seed: 8, whales: 0.03 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 4,
  });
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
      <OrderBook
        ref={bookRef}
        book={book}
        largeOrderThreshold={threshold}
        depthBars="level"
        height={420}
        pricePrecision={1}
        sizePrecision={4}
        onLevelClick={setPicked}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {picked
          ? t(picked.side === "bid" ? "pickedBid" : "pickedAsk", {
              price: price.format(picked.price),
              size: size.format(picked.size),
              sum: size.format(picked.sum),
            })
          : t("pickHint")}
      </span>
    </div>
  );
}
`})))()}var _e;function ve(){return(ve=e((()=>{_e=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [rate, setRate] = useState(50);
  // the simulated exchange: one snapshot, then a stream of deltas
  const [feed] = useState(() => createMarketFeed({ seed: 2 }));
  const [book] = useState(() => feed.snapshot());
  const [stats, setStats] = useState({ updates: 0, levels: 0 });
  const counter = useRef({ updates: 0, levels: 0, since: 0 });

  // every message goes straight to the ladder: it draws once per frame
  useFeedLoop(
    boxRef,
    (elapsed) => {
      const { delta, trades } = feed.step(elapsed);
      bookRef.current?.applyDeltas(delta);
      if (trades.length) bookRef.current?.setLastPrice(feed.last());
      const c = counter.current;
      c.updates++;
      c.levels += delta.bids.length + delta.asks.length;
      const now = performance.now();
      if (now - c.since >= 1000) {
        const seconds = c.since ? (now - c.since) / 1000 : 1;
        setStats({
          updates: Math.round(c.updates / seconds),
          levels: Math.round(c.levels / seconds),
        });
        counter.current = { updates: 0, levels: 0, since: now };
      }
    },
    { interval: 1000 / rate },
  );

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("updateRate")}
        direction="horizontal"
        value={rate}
        onChange={(value) => setRate(Number(value))}
      >
        {[10, 50, 200].map((value) => (
          <Radio key={value} value={value} label={t("perSecond", { value })} />
        ))}
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        book={book}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("liveStats", {
          updates: number.format(stats.updates),
          levels: number.format(stats.levels),
        })}
      </span>
    </div>
  );
}
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookMode,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

export default function ModesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<OrderBookMode>("both");
  const [feed] = useState(() => createMarketFeed({ seed: 9 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("mode")}
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(value as OrderBookMode)}
      >
        <Radio value="both" label={t("modeBoth")} />
        <Radio value="bids" label={t("modeBids")} />
        <Radio value="asks" label={t("modeAsks")} />
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        book={book}
        // one side fills the whole height: twice the levels
        mode={mode}
        height={380}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookColorConvention,
  type OrderBookHandle,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  const [feed] = useState(() => createMarketFeed({ seed: 6 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
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
      <OrderBook
        ref={bookRef}
        book={book}
        // red bids and green asks (mainland China, Japan, Korea)
        colorConvention={convention}
        height={400}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DepthChart,
  OrderBook,
  TimeAndSales,
  type DepthChartHandle,
  type OrderBookHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function TerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const bookRef = useRef<OrderBookHandle>(null);
  const depthRef = useRef<DepthChartHandle>(null);
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // one feed for the three widgets, like one exchange WebSocket
  const [feed] = useState(() => createMarketFeed({ seed: 10 }));
  const [book] = useState(() => feed.snapshot());
  const [ticker, setTicker] = useState({
    last: feed.last(),
    open: feed.last(),
  });
  const [limit, setLimit] = useState<number | null>(null);
  const shownAt = useRef(0);

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    depthRef.current?.applyDeltas(delta);
    if (!trades.length) return;
    tapeRef.current?.addTrades(trades);
    bookRef.current?.setLastPrice(feed.last());
    // React only renders the header, four times a second
    const now = performance.now();
    if (now - shownAt.current > 250) {
      shownAt.current = now;
      setTicker((previous) => ({ ...previous, last: feed.last() }));
    }
  });

  const limitLabel = t("limit");
  const limitLines = useMemo(
    () => (limit === null ? [] : [{ price: limit, label: limitLabel }]),
    [limit, limitLabel],
  );
  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    signDisplay: "always",
  });
  const change = ticker.last / ticker.open - 1;
  const common = {
    pricePrecision: 1,
    sizePrecision: 4,
    fontFamily: MONO,
  };
  const panel = {
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    padding: "8px 4px 4px",
    minWidth: 0,
  };
  const heading = {
    margin: "0 10px 6px",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-secondary-color)",
  };

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "4px 16px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong style={{ fontSize: 16 }}>{t("pair")}</strong>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            fontFamily: MONO,
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {price.format(ticker.last)}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("sessionChange", { value: percent.format(change) })}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {limit === null
            ? t("pickHint")
            : t("limitAt", { price: price.format(limit) })}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <section style={panel} aria-label={t("title")}>
          <h4 style={heading}>{t("title")}</h4>
          <OrderBook
            ref={bookRef}
            book={book}
            height={472}
            onLevelClick={(level) => setLimit(level.price)}
            labels={{ price: t("price"), size: t("size"), total: t("total") }}
            ariaLabel={t("aria")}
            {...common}
          />
        </section>
        <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
          <section style={panel} aria-label={t("depth")}>
            <h4 style={heading}>{t("depth")}</h4>
            <DepthChart
              ref={depthRef}
              book={book}
              height={200}
              range={0.002}
              legend={false}
              // the price picked in the ladder
              priceLines={limitLines}
              ariaLabel={t("depthAria")}
              {...common}
            />
          </section>
          <section style={panel} aria-label={t("trades")}>
            <h4 style={heading}>{t("trades")}</h4>
            <TimeAndSales
              ref={tapeRef}
              height={220}
              largeTradeThreshold={1}
              ariaLabel={t("tradesAria")}
              {...common}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
`})))()}var Te,Ee,De;function $(){return($=e((()=>{S(),E(),A(),P(),R(),V(),W(),q(),ce(),le(),de(),pe(),he(),Q(),ve(),be(),Se(),we(),t(),u(),f(),Te=n(),Ee=l(Object.assign({"./demos/basic.tsx":y,"./demos/compact.tsx":C,"./demos/dark.tsx":te,"./demos/grouping.tsx":ne,"./demos/large-orders.tsx":re,"./demos/live.tsx":ie,"./demos/modes.tsx":ae,"./demos/red-up.tsx":oe,"./demos/terminal.tsx":se}),Object.assign({"./demos/basic.tsx":Z,"./demos/compact.tsx":ue,"./demos/dark.tsx":fe,"./demos/grouping.tsx":me,"./demos/large-orders.tsx":ge,"./demos/live.tsx":_e,"./demos/modes.tsx":ye,"./demos/red-up.tsx":xe,"./demos/terminal.tsx":Ce})),De=()=>(0,Te.jsx)(d,{id:`order-book`,demos:Ee})})))()}$();export{De as default};