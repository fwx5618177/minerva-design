import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{l,n as u,t as d,u as f}from"./DocPage-BbPSunu1.js";import{d as ee,f as te,l as p,n as m,r as h,s as g,u as _}from"./feed-a3uhDZjB.js";function v(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,y.useMemo)(()=>m({seed:1}).snapshot(),[]);return(0,b.jsx)(p,{book:t,height:420,pricePrecision:1,sizePrecision:4,labels:{price:e(`price`),size:e(`size`),total:e(`total`)},ariaLabel:e(`aria`)})}var y,b;function x(){return(x=e((()=>{y=t(),i(),_(),h(),b=n()})))()}function S(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,C.useRef)(null),n=(0,C.useRef)(null);return g(n,{seed:5},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,w.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:300},children:(0,w.jsx)(p,{ref:t,height:300,rowHeight:17,fontSize:11,columns:[`price`,`size`],imbalance:!1,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var C,w;function T(){return(T=e((()=>{C=t(),i(),_(),h(),w=n()})))()}function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,E.useRef)(null),n=(0,E.useRef)(null);return g(n,{seed:4},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,D.jsxs)(`div`,{ref:n,style:re,children:[(0,D.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,padding:`0 10px 8px`,fontSize:13},children:[(0,D.jsx)(`strong`,{children:e(`pair`)}),(0,D.jsx)(`span`,{style:{color:`#848e9c`},children:e(`title`)})]}),(0,D.jsx)(p,{ref:t,height:440,pricePrecision:1,sizePrecision:4,total:`quote`,depthBars:`level`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,ariaLabel:e(`aria`)})]})}var E,D,re;function O(){return(O=e((()=>{E=t(),i(),_(),h(),D=n(),re={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:`12px 4px 4px`,width:`100%`,boxSizing:`border-box`}})))()}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,k.useRef)(null),i=(0,k.useRef)(null),[o,s]=(0,k.useState)(1),[l,u]=(0,k.useState)(`cumulative`);return g(i,{seed:3},{load:e=>n.current?.setBook(e.snapshot()),update:({delta:e,trades:t},r)=>{n.current?.applyDeltas(e),t.length&&n.current?.setLastPrice(r.last())}}),(0,A.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,A.jsx)(a,{"aria-label":e(`grouping`),direction:`horizontal`,value:o,onChange:e=>s(Number(e)),children:j.map(e=>(0,A.jsx)(c,{value:e,label:new Intl.NumberFormat(t.language).format(e)},e))}),(0,A.jsxs)(a,{"aria-label":e(`depthBars`),direction:`horizontal`,value:l,onChange:e=>u(e),children:[(0,A.jsx)(c,{value:`cumulative`,label:e(`barsCumulative`)}),(0,A.jsx)(c,{value:`level`,label:e(`barsLevel`)})]})]}),(0,A.jsx)(p,{ref:n,grouping:o,depthBars:l,sizePrecision:3,height:420,ariaLabel:e(`aria`)})]})}var k,A,j;function M(){return(M=e((()=>{k=t(),i(),o(),s(),_(),h(),A=n(),j=[.1,.5,1,10,50]})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,N.useRef)(null),i=(0,N.useRef)(null),[o,s]=(0,N.useState)(5),[l,u]=(0,N.useState)(null);g(i,{seed:8,whales:.03},{load:e=>n.current?.setBook(e.snapshot()),update:({delta:e,trades:t},r)=>{n.current?.applyDeltas(e),t.length&&n.current?.setLastPrice(r.last())}});let d=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),f=new Intl.NumberFormat(t.language,{maximumFractionDigits:4});return(0,P.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(a,{"aria-label":e(`threshold`),direction:`horizontal`,value:o,onChange:e=>s(Number(e)),children:F.map(t=>(0,P.jsx)(c,{value:t,label:e(`atLeast`,{value:f.format(t)})},t))}),(0,P.jsx)(p,{ref:n,largeOrderThreshold:o,depthBars:`level`,height:420,pricePrecision:1,sizePrecision:4,onLevelClick:u,ariaLabel:e(`aria`)}),(0,P.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:l?e(l.side===`bid`?`pickedBid`:`pickedAsk`,{price:d.format(l.price),size:f.format(l.size),sum:f.format(l.sum)}):e(`pickHint`)})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),i(),o(),s(),_(),h(),P=n(),F=[2,5,10]})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=(0,L.useRef)(null),i=(0,L.useRef)(null),[o,s]=(0,L.useState)(50),[l,u]=(0,L.useState)({updates:0,levels:0}),d=(0,L.useRef)({updates:0,levels:0,since:0});g(i,{seed:2},{load:e=>n.current?.setBook(e.snapshot()),update:({delta:e,trades:t},r)=>{n.current?.applyDeltas(e),t.length&&n.current?.setLastPrice(r.last());let i=d.current;i.updates++,i.levels+=e.bids.length+e.asks.length;let a=performance.now();if(a-i.since>=1e3){let e=i.since?(a-i.since)/1e3:1;u({updates:Math.round(i.updates/e),levels:Math.round(i.levels/e)}),d.current={updates:0,levels:0,since:a}}}},{interval:1e3/o});let f=new Intl.NumberFormat(t.language);return(0,R.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,R.jsx)(a,{"aria-label":e(`updateRate`),direction:`horizontal`,value:o,onChange:e=>s(Number(e)),children:[10,50,200].map(t=>(0,R.jsx)(c,{value:t,label:e(`perSecond`,{value:t})},t))}),(0,R.jsx)(p,{ref:n,height:440,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,R.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:e(`liveStats`,{updates:f.format(l.updates),levels:f.format(l.levels)})})]})}var L,R;function z(){return(z=e((()=>{L=t(),i(),o(),s(),_(),h(),R=n()})))()}function se(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,B.useRef)(null),n=(0,B.useRef)(null),[i,o]=(0,B.useState)(`both`);return g(n,{seed:9},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,V.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,V.jsxs)(a,{"aria-label":e(`mode`),direction:`horizontal`,value:i,onChange:e=>o(e),children:[(0,V.jsx)(c,{value:`both`,label:e(`modeBoth`)}),(0,V.jsx)(c,{value:`bids`,label:e(`modeBids`)}),(0,V.jsx)(c,{value:`asks`,label:e(`modeAsks`)})]}),(0,V.jsx)(p,{ref:t,mode:i,height:380,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var B,V;function H(){return(H=e((()=>{B=t(),i(),o(),s(),_(),h(),V=n()})))()}function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.order-book.data`}),t=(0,U.useRef)(null),n=(0,U.useRef)(null),[i,o]=(0,U.useState)(`red-up`);return g(n,{seed:6},{load:e=>t.current?.setBook(e.snapshot()),update:({delta:e,trades:n},r)=>{t.current?.applyDeltas(e),n.length&&t.current?.setLastPrice(r.last())}}),(0,W.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsxs)(a,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>o(e),children:[(0,W.jsx)(c,{value:`red-up`,label:e(`redUp`)}),(0,W.jsx)(c,{value:`green-up`,label:e(`greenUp`)})]}),(0,W.jsx)(p,{ref:t,colorConvention:i,height:400,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var U,W;function G(){return(G=e((()=>{U=t(),i(),o(),s(),_(),h(),W=n()})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.order-book.data`}),n=t.language,i=(0,K.useRef)(null),a=(0,K.useRef)(null),o=(0,K.useRef)(null),s=(0,K.useRef)(null),[c,l]=(0,K.useState)(null),[u,d]=(0,K.useState)(null),f=(0,K.useRef)(0);g(s,{seed:10},{load:e=>{let t=e.snapshot();i.current?.setBook(t),i.current?.setLastPrice(e.last()),a.current?.setBook(t),o.current?.clear(),l({last:e.last(),open:e.last()})},update:({delta:e,trades:t},n)=>{if(i.current?.applyDeltas(e),a.current?.applyDeltas(e),!t.length)return;o.current?.addTrades(t),i.current?.setLastPrice(n.last());let r=performance.now();r-f.current>250&&(f.current=r,l(e=>e&&{...e,last:n.last()}))}});let m=e(`limit`),h=(0,K.useMemo)(()=>u===null?[]:[{price:u,label:m}],[u,m]),_=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),v=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`always`}),y=c?c.last/c.open-1:0,b={pricePrecision:1,sizePrecision:4,fontFamily:J},x={border:`1px solid var(--border-color)`,borderRadius:10,padding:`8px 4px 4px`,minWidth:0},S={margin:`0 10px 6px`,fontSize:12,fontWeight:600,color:`var(--text-secondary-color)`};return(0,q.jsxs)(`div`,{ref:s,style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`baseline`,gap:`4px 16px`,fontVariantNumeric:`tabular-nums`},children:[(0,q.jsx)(`strong`,{style:{fontSize:16},children:e(`pair`)}),(0,q.jsx)(`span`,{style:{fontSize:20,fontWeight:700,fontFamily:J,color:y>=0?`var(--success-color)`:`var(--danger-color)`},children:c?_.format(c.last):`—`}),(0,q.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`sessionChange`,{value:v.format(y)})}),(0,q.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:u===null?e(`pickHint`):e(`limitAt`,{price:_.format(u)})})]}),(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`},children:[(0,q.jsxs)(`section`,{style:x,"aria-label":e(`title`),children:[(0,q.jsx)(`h4`,{style:S,children:e(`title`)}),(0,q.jsx)(p,{ref:i,height:472,onLevelClick:e=>d(e.price),labels:{price:e(`price`),size:e(`size`),total:e(`total`)},ariaLabel:e(`aria`),...b})]}),(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,minWidth:0},children:[(0,q.jsxs)(`section`,{style:x,"aria-label":e(`depth`),children:[(0,q.jsx)(`h4`,{style:S,children:e(`depth`)}),(0,q.jsx)(ee,{ref:a,height:200,range:.002,legend:!1,priceLines:h,ariaLabel:e(`depthAria`),...b})]}),(0,q.jsxs)(`section`,{style:x,"aria-label":e(`trades`),children:[(0,q.jsx)(`h4`,{style:S,children:e(`trades`)}),(0,q.jsx)(te,{ref:o,height:220,largeTradeThreshold:1,ariaLabel:e(`tradesAria`),...b})]})]})]})]})}var K,q,J;function Y(){return(Y=e((()=>{K=t(),i(),_(),h(),q=n(),J=`ui-monospace, SFMono-Regular, Menlo, monospace`})))()}var ue;function X(){return(X=e((()=>{ue=`import { useMemo } from "react";
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
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 5 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  // a phone-sized panel: two columns, smaller rows, as many as fit
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <OrderBook
        ref={bookRef}
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
`})))()}var de;function fe(){return(fe=e((()=>{de=`import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

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
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 4 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

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
`})))()}var pe;function me(){return(me=e((()=>{pe=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

const STEPS = [0.1, 0.5, 1, 10, 50];

export default function GroupingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [grouping, setGrouping] = useState(1);
  const [bars, setBars] = useState<"cumulative" | "level">("cumulative");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 3 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

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
`})))()}var he;function ge(){return(ge=e((()=>{he=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

const THRESHOLDS = [2, 5, 10];

export default function LargeOrdersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(5);
  const [picked, setPicked] = useState<OrderBookLevelEvent | null>(null);
  // a fresh market on every mount: its snapshot, then its deltas; more
  // whales than usual: walls of 5 to 30 BTC
  useMarketStream(
    boxRef,
    { seed: 8, whales: 0.03 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

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
`})))()}var $;function _e(){return(_e=e((()=>{$=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [rate, setRate] = useState(50);
  const [stats, setStats] = useState({ updates: 0, levels: 0 });
  const counter = useRef({ updates: 0, levels: 0, since: 0 });

  // the simulated exchange, created on mount: one snapshot, then a stream
  // of deltas; every message goes straight to the ladder (it draws once
  // per frame)
  useMarketStream(
    boxRef,
    { seed: 2 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
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
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookMode,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function ModesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<OrderBookMode>("both");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 9 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

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
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookColorConvention,
  type OrderBookHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 6 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
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
      <OrderBook
        ref={bookRef}
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
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DepthChart,
  OrderBook,
  TimeAndSales,
  type DepthChartHandle,
  type OrderBookHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

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
  // one market for the three widgets, like one exchange WebSocket; a
  // fresh one on every mount (snapshot first, then the stream)
  const [ticker, setTicker] = useState<{ last: number; open: number } | null>(
    null,
  );
  const [limit, setLimit] = useState<number | null>(null);
  const shownAt = useRef(0);

  useMarketStream(
    boxRef,
    { seed: 10 },
    {
      load: (feed) => {
        const book = feed.snapshot();
        bookRef.current?.setBook(book);
        bookRef.current?.setLastPrice(feed.last());
        depthRef.current?.setBook(book);
        tapeRef.current?.clear();
        setTicker({ last: feed.last(), open: feed.last() });
      },
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        depthRef.current?.applyDeltas(delta);
        if (!trades.length) return;
        tapeRef.current?.addTrades(trades);
        bookRef.current?.setLastPrice(feed.last());
        // React only renders the header, four times a second
        const now = performance.now();
        if (now - shownAt.current > 250) {
          shownAt.current = now;
          setTicker(
            (previous) => previous && { ...previous, last: feed.last() },
          );
        }
      },
    },
  );

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
  const change = ticker ? ticker.last / ticker.open - 1 : 0;
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
          {ticker ? price.format(ticker.last) : "\\u2014"}
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
`})))()}var we,Te,Ee;function De(){return(De=e((()=>{x(),T(),O(),M(),I(),z(),H(),G(),Y(),X(),Q(),fe(),me(),ge(),_e(),ye(),xe(),Ce(),t(),u(),f(),we=n(),Te=l(Object.assign({"./demos/basic.tsx":v,"./demos/compact.tsx":S,"./demos/dark.tsx":ne,"./demos/grouping.tsx":ie,"./demos/large-orders.tsx":ae,"./demos/live.tsx":oe,"./demos/modes.tsx":se,"./demos/red-up.tsx":ce,"./demos/terminal.tsx":le}),Object.assign({"./demos/basic.tsx":ue,"./demos/compact.tsx":Z,"./demos/dark.tsx":de,"./demos/grouping.tsx":pe,"./demos/large-orders.tsx":he,"./demos/live.tsx":$,"./demos/modes.tsx":ve,"./demos/red-up.tsx":be,"./demos/terminal.tsx":Se})),Ee=()=>(0,we.jsx)(d,{id:`order-book`,demos:Te})})))()}De();export{Ee as default};