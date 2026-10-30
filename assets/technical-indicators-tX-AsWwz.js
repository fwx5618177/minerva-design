import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,r as i}from"./DemoBlock-BJ0_y9F8.js";import{n as a,t as o}from"./useTranslation-BzoVi22c.js";import{i as s,n as c,r as l,t as u}from"./Radio-DnNachfg.js";import{n as ee,t as d}from"./CodeBlock-BXt_Axjy.js";import{a as te,d as f,f as ne,i as re,l as p,o as ie,r as ae,s as oe}from"./angular-preview-B5skLbni.js";import{l as se,n as ce,t as le,u as ue}from"./DocPage-B2iACtLP.js";import{a as m,c as h,l as g,n as _,r as de,s as v,t as y}from"./data-CPr3f9Xw.js";function fe(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`}),t=(0,pe.useMemo)(()=>[{id:`long`,kind:`stopLoss`,price:S-2*C,title:e(`longStop`)},{id:`short`,kind:`stopLoss`,side:`sell`,price:S+2*C,title:e(`shortStop`),color:`#a855f7`}],[e]);return(0,me.jsx)(h,{bars:b,timeframe:`1H`,symbol:e(`gold`),indicators:[{type:`atr`,period:14,height:120}],priceLines:t,ariaLabel:e(`atrAria`),height:440})}var pe,me,b,x,S,C;function he(){return(he=e((()=>{pe=t(),o(),g(),p(),v(),me=n(),b=m({count:360,timeframe:_,seed:61,price:2330,volatility:.0035,volume:12e3}),x=ne(b.map(e=>e.high),b.map(e=>e.low),b.map(e=>e.close),14),S=b[b.length-1].close,C=x[x.length-1]})))()}function ge(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,_e.useState)(`2`);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,w.jsx)(s,{"aria-label":e(`multiplier`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[`1.5`,`2`,`2.5`].map(t=>(0,w.jsx)(u,{value:t,label:e(`deviations`,{value:t})},t))}),(0,w.jsx)(h,{bars:ve,timeframe:`1H`,symbol:e(`eth`),indicators:[{type:`boll`,period:20,multiplier:Number(t)}],ariaLabel:e(`bollAria`),height:380})]})}var _e,w,ve;function ye(){return(ye=e((()=>{_e=t(),o(),c(),l(),g(),v(),w=n(),ve=m({count:500,timeframe:_,seed:14,price:3150,volatility:.006,volume:800})})))()}function be(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,T.useState)(`heikinAshi`);return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,E.jsxs)(s,{"aria-label":e(`chartStyle`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,E.jsx)(u,{value:`heikinAshi`,label:e(`heikinAshi`)}),(0,E.jsx)(u,{value:`candles`,label:e(`candles`)})]}),(0,E.jsx)(h,{bars:D,timeframe:`4H`,symbol:e(`ada`),chartStyle:t,indicators:[{type:`ema`,period:34}],ariaLabel:e(`haAria`),height:400}),(0,E.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e(A?`haRising`:`haFalling`,{count:j})})]})}var T,E,D,O,k,A,j;function M(){return(M=e((()=>{for(T=t(),o(),c(),l(),g(),p(),v(),E=n(),D=m({count:300,timeframe:4*_,seed:90,price:.62,volatility:.011,volume:2e7},4),O=te({open:D.map(e=>e.open),high:D.map(e=>e.high),low:D.map(e=>e.low),close:D.map(e=>e.close)}),k=O.close.length,A=O.close[k-1]>=O.open[k-1],j=0;j<k&&O.close[k-1-j]>=O.open[k-1-j]===A;)j++})))()}function xe(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,N.jsx)(h,{bars:P,timeframe:`1D`,symbol:e(`catl`),colorConvention:`redUp`,utcOffset:480,indicators:[{type:`ma`,period:5},{type:`ma`,period:20},{type:`kdj`,period:9,kPeriod:3,dPeriod:3,height:150}],barSpacing:7,ariaLabel:e(`kdjAria`),height:440})}var N,P;function F(){return(F=e((()=>{o(),g(),v(),N=n(),P=m({count:240,timeframe:y,seed:300750,price:236,volatility:.022,volume:4e6,market:`stock`})})))()}function Se(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,I.jsx)(h,{bars:L,timeframe:`1D`,symbol:e(`btc`),indicators:[{type:`ema`,period:12,color:`#0ea5e9`},{type:`ema`,period:26,color:`#f59e0b`},{type:`macd`,fast:12,slow:26,signal:9,height:150}],barSpacing:6,ariaLabel:e(`macdAria`),height:460})}var I,L;function Ce(){return(Ce=e((()=>{o(),g(),v(),I=n(),L=m({count:300,timeframe:y,seed:36,price:58e3,volatility:.024,volume:3e4})})))()}function we(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Te.useState)(`20`),r=Number(t);return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,R.jsx)(s,{"aria-label":e(`period`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[`10`,`20`,`50`].map(t=>(0,R.jsx)(u,{value:t,label:e(`periodValue`,{period:t})},t))}),(0,R.jsx)(h,{bars:Ee,timeframe:`1D`,symbol:e(`msft`),indicators:[{type:`ma`,period:r,color:`#f59e0b`},{type:`ema`,period:r,color:`#a855f7`},{type:`wma`,period:r,color:`#0ea5e9`}],barSpacing:6,ariaLabel:e(`maAria`),height:380})]})}var Te,R,Ee;function De(){return(De=e((()=>{Te=t(),o(),c(),l(),g(),v(),R=n(),Ee=m({count:400,timeframe:y,seed:8,price:412,volatility:.015,volume:2e7,market:`stock`})})))()}function Oe(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,ke.useState)(`70-30`),[r,i]=B[t];return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsx)(s,{"aria-label":e(`bands`),direction:`horizontal`,value:t,onChange:e=>n(e),children:Object.keys(B).map(t=>(0,z.jsx)(u,{value:t,label:e(`bandValues.${t}`)},t))}),(0,z.jsx)(h,{bars:Ae,timeframe:`4H`,symbol:e(`sol`),indicators:[{type:`rsi`,period:14,overbought:r,oversold:i,height:140},{type:`rsi`,period:6,overbought:r,oversold:i,color:`#f59e0b`,height:100}],ariaLabel:e(`rsiAria`),height:460})]})}var ke,z,Ae,B;function je(){return(je=e((()=>{ke=t(),o(),c(),l(),g(),v(),z=n(),Ae=m({count:400,timeframe:4*_,seed:44,price:142,volatility:.012,volume:5e5}),B={"70-30":[70,30],"80-20":[80,20]}})))()}function Me(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,Ne.useMemo)(()=>K.map(t=>({time:H[t.index].time,side:t.side,text:e(t.side===`buy`?`buy`:`sell`)})),[e]),r=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`});return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,V.jsx)(h,{bars:H,timeframe:`1H`,symbol:e(`btc`),indicators:[{type:`ema`,period:9,color:`#0ea5e9`},{type:`ema`,period:21,color:`#f59e0b`},{type:`rsi`,period:14,height:100}],markers:n,ariaLabel:e(`signalsAria`),height:460}),(0,V.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:e(`signalsSummary`,{trades:q.length,wins:Fe,result:r.format(Ie)})})]})}var Ne,V,H,U,W,G,Pe,K,q,Fe,Ie;function Le(){return(Le=e((()=>{Ne=t(),o(),g(),p(),v(),V=n(),H=m({count:600,timeframe:_,seed:128,price:64800,volatility:.0045,volume:300}),U=H.map(e=>e.close),W=f(U,9),G=f(U,21),Pe=ie(U,14),K=[];for(let e=1;e<H.length;e++){let t=W[e]>G[e],n=W[e-1]>G[e-1];if(Number.isNaN(G[e-1])||t===n)continue;let r=K.length>0&&K[K.length-1].side===`buy`;t&&!r&&Pe[e]>50&&K.push({index:e,side:`buy`,price:U[e]}),!t&&r&&K.push({index:e,side:`sell`,price:U[e]})}q=K.filter(e=>e.side===`sell`).map(e=>{let t=K[K.indexOf(e)-1];return{buy:t,sell:e,result:e.price/t.price-1}}),Fe=q.filter(e=>e.result>0).length,Ie=q.reduce((e,t)=>e*(1+t.result),1)-1})))()}function Re(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,J.useRef)(null),r=(0,J.useRef)(null);return(0,J.useEffect)(()=>{if(!n.current)return;let i=re(n.current,{bars:X,timeframe:`1D`,symbol:e(`xom`),indicators:[{type:`ma`,period:50},{type:`volume`,maPeriod:20}],locale:t.language,ariaLabel:e(`vanillaAria`)}),a=i.on(`crosshairMove`,n=>{let i=n?.bar?n.index:X.length-1,a=X[i].close/ze[i]-1;r.current&&(r.current.textContent=Number.isNaN(a)?e(`vanillaWarmup`):e(a>=0?`vanillaAbove`:`vanillaBelow`,{value:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}).format(Math.abs(a))}))});return()=>{a(),i.destroy()}},[e,t.language]),(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Y.jsx)(`div`,{ref:n,style:{height:380}}),(0,Y.jsx)(`span`,{ref:r,role:`status`,style:{color:`var(--text-secondary-color)`}})]})}var J,Y,X,ze;function Be(){return(Be=e((()=>{J=t(),o(),ae(),p(),v(),Y=n(),X=m({count:250,timeframe:y,seed:4,price:96,volatility:.016,volume:8e6,market:`stock`}),ze=oe(X.map(e=>e.close),50)})))()}function Ve(){let{t:e}=a(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,He.jsx)(h,{bars:Ue,timeframe:`5m`,symbol:e(`nvda`),utcOffset:0,indicators:[{type:`vwap`,reset:`day`},{type:`volume`,height:90}],barSpacing:5,ariaLabel:e(`vwapAria`),height:420})}var He,Ue;function We(){return(We=e((()=>{o(),g(),v(),He=n(),Ue=m({count:390,timeframe:5*de,seed:21,price:188,volatility:.0022,volume:9e4,market:`stock`,start:Date.UTC(2025,2,10,9,30)})})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart, type TradingPriceLine } from "minerva-design/charts";
import { atr } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 360,
  timeframe: HOUR,
  seed: 61,
  price: 2_330,
  volatility: 0.0035,
  volume: 1.2e4,
});

// the same ATR as the pane, computed with the pure function for the stops
const range = atr(
  bars.map((bar) => bar.high),
  bars.map((bar) => bar.low),
  bars.map((bar) => bar.close),
  14,
);
const last = bars[bars.length - 1].close;
const volatility = range[range.length - 1];

export default function AtrDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  // volatility stops: 2 ATR under the price for a long, 2 ATR above for a short
  const priceLines = useMemo(
    (): TradingPriceLine[] => [
      {
        id: "long",
        kind: "stopLoss",
        price: last - 2 * volatility,
        title: t("longStop"),
      },
      {
        id: "short",
        kind: "stopLoss",
        side: "sell",
        price: last + 2 * volatility,
        title: t("shortStop"),
        color: "#a855f7",
      },
    ],
    [t],
  );
  return (
    <TradingChart
      bars={bars}
      timeframe="1H"
      symbol={t("gold")}
      indicators={[{ type: "atr", period: 14, height: 120 }]}
      priceLines={priceLines}
      ariaLabel={t("atrAria")}
      height={440}
    />
  );
}
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 500,
  timeframe: HOUR,
  seed: 14,
  price: 3_150,
  volatility: 0.006,
  volume: 800,
});

export default function BollingerDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [multiplier, setMultiplier] = useState("2");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("multiplier")}
        direction="horizontal"
        value={multiplier}
        onChange={(value) => setMultiplier(String(value))}
      >
        {["1.5", "2", "2.5"].map((value) => (
          <Radio key={value} value={value} label={t("deviations", { value })} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eth")}
        indicators={[
          { type: "boll", period: 20, multiplier: Number(multiplier) },
        ]}
        ariaLabel={t("bollAria")}
        height={380}
      />
    </div>
  );
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingChartStyle } from "minerva-design/charts";
import { heikinAshi } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars(
  {
    count: 300,
    timeframe: 4 * HOUR,
    seed: 90,
    price: 0.62,
    volatility: 0.011,
    volume: 2e7,
  },
  4,
);

// the pure function: how many Heikin-Ashi bars the current trend has lasted
const ha = heikinAshi({
  open: bars.map((bar) => bar.open),
  high: bars.map((bar) => bar.high),
  low: bars.map((bar) => bar.low),
  close: bars.map((bar) => bar.close),
});
const n = ha.close.length;
const rising = ha.close[n - 1] >= ha.open[n - 1];
let streak = 0;
while (
  streak < n &&
  ha.close[n - 1 - streak] >= ha.open[n - 1 - streak] === rising
)
  streak++;

export default function HeikinAshiDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [style, setStyle] = useState<TradingChartStyle>("heikinAshi");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("chartStyle")}
        direction="horizontal"
        value={style}
        onChange={(value) => setStyle(value as TradingChartStyle)}
      >
        <Radio value="heikinAshi" label={t("heikinAshi")} />
        <Radio value="candles" label={t("candles")} />
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("ada")}
        chartStyle={style}
        indicators={[{ type: "ema", period: 34 }]}
        ariaLabel={t("haAria")}
        height={400}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t(rising ? "haRising" : "haFalling", { count: streak })}
      </span>
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 240,
  timeframe: DAY,
  seed: 300_750,
  price: 236,
  volatility: 0.022,
  volume: 4e6,
  market: "stock",
});

export default function KdjDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("catl")}
      colorConvention="redUp"
      utcOffset={480}
      indicators={[
        { type: "ma", period: 5 },
        { type: "ma", period: 20 },
        // J leaves the 0-100 range first: the earliest (and noisiest) signal
        { type: "kdj", period: 9, kPeriod: 3, dPeriod: 3, height: 150 },
      ]}
      barSpacing={7}
      ariaLabel={t("kdjAria")}
      height={440}
    />
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 300,
  timeframe: DAY,
  seed: 36,
  price: 58_000,
  volatility: 0.024,
  volume: 3e4,
});

export default function MacdDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("btc")}
      indicators={[
        { type: "ema", period: 12, color: "#0ea5e9" },
        { type: "ema", period: 26, color: "#f59e0b" },
        // bright bars when the histogram grows, faded when it shrinks
        { type: "macd", fast: 12, slow: 26, signal: 9, height: 150 },
      ]}
      barSpacing={6}
      ariaLabel={t("macdAria")}
      height={460}
    />
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 400,
  timeframe: DAY,
  seed: 8,
  price: 412,
  volatility: 0.015,
  volume: 2e7,
  market: "stock",
});

export default function MovingAveragesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [period, setPeriod] = useState("20");
  const p = Number(period);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(String(value))}
      >
        {["10", "20", "50"].map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("periodValue", { period: value })}
          />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("msft")}
        // the same period, three weightings: the EMA and WMA react faster
        indicators={[
          { type: "ma", period: p, color: "#f59e0b" },
          { type: "ema", period: p, color: "#a855f7" },
          { type: "wma", period: p, color: "#0ea5e9" },
        ]}
        barSpacing={6}
        ariaLabel={t("maAria")}
        height={380}
      />
    </div>
  );
}
`})))()}var rt;function Z(){return(Z=e((()=>{rt=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 400,
  timeframe: 4 * HOUR,
  seed: 44,
  price: 142,
  volatility: 0.012,
  volume: 5e5,
});

const BANDS = { "70-30": [70, 30], "80-20": [80, 20] } as const;

export default function RsiDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [bands, setBands] = useState<keyof typeof BANDS>("70-30");
  const [overbought, oversold] = BANDS[bands];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("bands")}
        direction="horizontal"
        value={bands}
        onChange={(value) => setBands(value as keyof typeof BANDS)}
      >
        {Object.keys(BANDS).map((value) => (
          <Radio key={value} value={value} label={t(\`bandValues.\${value}\`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("sol")}
        indicators={[
          { type: "rsi", period: 14, overbought, oversold, height: 140 },
          {
            type: "rsi",
            period: 6,
            overbought,
            oversold,
            color: "#f59e0b",
            height: 100,
          },
        ]}
        ariaLabel={t("rsiAria")}
        height={460}
      />
    </div>
  );
}
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart, type TradingMarker } from "minerva-design/charts";
import { ema, rsi } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 600,
  timeframe: HOUR,
  seed: 128,
  price: 64_800,
  volatility: 0.0045,
  volume: 300,
});

// a moving average cross, filtered by RSI, with the pure functions
const close = bars.map((bar) => bar.close);
const fast = ema(close, 9);
const slow = ema(close, 21);
const strength = rsi(close, 14);

interface Signal {
  index: number;
  side: "buy" | "sell";
  price: number;
}
const signals: Signal[] = [];
for (let i = 1; i < bars.length; i++) {
  const above = fast[i] > slow[i];
  const wasAbove = fast[i - 1] > slow[i - 1];
  if (Number.isNaN(slow[i - 1]) || above === wasAbove) continue;
  const holding =
    signals.length > 0 && signals[signals.length - 1].side === "buy";
  // buy crosses only when the RSI confirms the momentum, sell crosses close the trade
  if (above && !holding && strength[i] > 50)
    signals.push({ index: i, side: "buy", price: close[i] });
  if (!above && holding)
    signals.push({ index: i, side: "sell", price: close[i] });
}

// closed trades: a buy followed by a sell
const trades = signals
  .filter((signal) => signal.side === "sell")
  .map((sell) => {
    const buy = signals[signals.indexOf(sell) - 1];
    return { buy, sell, result: sell.price / buy.price - 1 };
  });
const wins = trades.filter((trade) => trade.result > 0).length;
const total =
  trades.reduce((product, trade) => product * (1 + trade.result), 1) - 1;

export default function SignalsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const markers = useMemo(
    (): TradingMarker[] =>
      signals.map((signal) => ({
        time: bars[signal.index].time,
        side: signal.side,
        text: t(signal.side === "buy" ? "buy" : "sell"),
      })),
    [t],
  );
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("btc")}
        indicators={[
          { type: "ema", period: 9, color: "#0ea5e9" },
          { type: "ema", period: 21, color: "#f59e0b" },
          { type: "rsi", period: 14, height: 100 },
        ]}
        markers={markers}
        ariaLabel={t("signalsAria")}
        height={460}
      />
      <span
        role="status"
        style={{
          color: "var(--text-secondary-color)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("signalsSummary", {
          trades: trades.length,
          wins,
          result: percent.format(total),
        })}
      </span>
    </div>
  );
}
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createTradingChart, sma } from "minerva-design/charts/core";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 250,
  timeframe: DAY,
  seed: 4,
  price: 96,
  volatility: 0.016,
  volume: 8e6,
  market: "stock",
});

// the 50-day average as a plain array, to report where the price stands
const average = sma(
  bars.map((bar) => bar.close),
  50,
);

export default function VanillaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const container = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!container.current) return;
    // the framework-free engine: a container, options, events, destroy
    const chart = createTradingChart(container.current, {
      bars,
      timeframe: "1D",
      symbol: t("xom"),
      indicators: [
        { type: "ma", period: 50 },
        { type: "volume", maPeriod: 20 },
      ],
      locale: i18n.language,
      ariaLabel: t("vanillaAria"),
    });
    const off = chart.on("crosshairMove", (event) => {
      const i = event?.bar ? event.index : bars.length - 1;
      const distance = bars[i].close / average[i] - 1;
      if (status.current) {
        status.current.textContent = Number.isNaN(distance)
          ? t("vanillaWarmup")
          : t(distance >= 0 ? "vanillaAbove" : "vanillaBelow", {
              value: new Intl.NumberFormat(i18n.language, {
                style: "percent",
                maximumFractionDigits: 1,
              }).format(Math.abs(distance)),
            });
      }
    });
    return () => {
      off();
      chart.destroy();
    };
  }, [t, i18n.language]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div ref={container} style={{ height: 380 }} />
      <span
        ref={status}
        role="status"
        style={{ color: "var(--text-secondary-color)" }}
      />
    </div>
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { MINUTE, generateBars } from "../../trading-chart/data";

// five sessions of 5-minute bars, 9:30 to 16:00 exchange time
const bars = generateBars({
  count: 78 * 5,
  timeframe: 5 * MINUTE,
  seed: 21,
  price: 188,
  volatility: 0.0022,
  volume: 9e4,
  market: "stock",
  start: Date.UTC(2025, 2, 10, 9, 30),
});

export default function VwapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="5m"
      symbol={t("nvda")}
      // the times are exchange times: show them as they are
      utcOffset={0}
      indicators={[
        { type: "vwap", reset: "day" },
        { type: "volume", height: 90 },
      ]}
      barSpacing={5}
      ariaLabel={t("vwapAria")}
      height={420}
    />
  );
}
`})))()}var Q,ut,dt,ft,pt;function $(){return($=e((()=>{he(),ye(),M(),F(),Ce(),De(),je(),Le(),Be(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),Z(),at(),st(),lt(),t(),o(),ee(),ce(),r(),ue(),Q=n(),ut=se(Object.assign({"./demos/atr.tsx":fe,"./demos/bollinger.tsx":ge,"./demos/heikin-ashi.tsx":be,"./demos/kdj.tsx":xe,"./demos/macd.tsx":Se,"./demos/moving-averages.tsx":we,"./demos/rsi.tsx":Oe,"./demos/signals.tsx":Me,"./demos/vanilla.tsx":Re,"./demos/vwap.tsx":Ve}),Object.assign({"./demos/atr.tsx":Ge,"./demos/bollinger.tsx":qe,"./demos/heikin-ashi.tsx":Ye,"./demos/kdj.tsx":Ze,"./demos/macd.tsx":$e,"./demos/moving-averages.tsx":tt,"./demos/rsi.tsx":rt,"./demos/signals.tsx":it,"./demos/vanilla.tsx":ot,"./demos/vwap.tsx":ct})),dt=`<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>`,ft=`import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");`,pt=()=>{let{t:e}=a(),t=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`section`,{className:i.section,"aria-labelledby":`indicators-declarative`,children:[(0,Q.jsx)(`h2`,{id:`indicators-declarative`,children:e(`docs.technical-indicators.intro.declarative.title`)}),(0,Q.jsx)(`p`,{className:i.prose,children:e(`docs.technical-indicators.intro.declarative.text`)}),(0,Q.jsx)(d,{code:dt,language:`tsx`}),(0,Q.jsx)(`p`,{className:i.prose,children:e(`docs.technical-indicators.intro.declarative.ids`)})]}),(0,Q.jsxs)(`section`,{className:i.section,"aria-labelledby":`indicators-functions`,children:[(0,Q.jsx)(`h2`,{id:`indicators-functions`,children:e(`docs.technical-indicators.intro.functions.title`)}),(0,Q.jsx)(`p`,{className:i.prose,children:e(`docs.technical-indicators.intro.functions.text`)}),(0,Q.jsx)(d,{code:ft,language:`tsx`})]}),(0,Q.jsxs)(`section`,{className:i.section,"aria-labelledby":`indicators-conventions`,children:[(0,Q.jsx)(`h2`,{id:`indicators-conventions`,children:e(`docs.technical-indicators.intro.conventions.title`)}),(0,Q.jsxs)(`ul`,{className:i.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.averages`)}),(0,Q.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.wilder`)}),(0,Q.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.kdj`)}),(0,Q.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.vwap`)}),(0,Q.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.incremental`)})]})]})]});return(0,Q.jsx)(le,{id:`technical-indicators`,demos:ut,intro:t})}})))()}$();export{pt as default};