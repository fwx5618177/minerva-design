import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{n as ee,t as te}from"./Switch-DL9RsLtd.js";import{n as ne,t as re}from"./CodeBlock-CFVL8N6E.js";import{i as ie,r as d}from"./DemoBlock-Bk0bFt8p.js";import{a as ae,c as oe,d as se,f as ce,l as le,m as f,o as ue,r as de,s as fe,u as pe}from"./angular-preview-DLtNmLoq.js";import{l as me,n as he,t as ge,u as _e}from"./DocPage-6WUEs69-.js";import{a as p,c as m,l as h,n as g,r as ve,s as _,t as v}from"./data-BiPNHhW6.js";function ye(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),t=(0,be.useMemo)(()=>[{id:`long`,kind:`stopLoss`,price:Ce-2*b,title:e(`longStop`)},{id:`short`,kind:`stopLoss`,side:`sell`,price:Ce+2*b,title:e(`shortStop`),color:`#a855f7`}],[e]);return(0,xe.jsx)(m,{bars:y,timeframe:`1H`,symbol:e(`gold`),indicators:[{type:`atr`,period:14,height:120}],priceLines:t,ariaLabel:e(`atrAria`),height:440})}var be,xe,y,Se,Ce,b;function we(){return(we=e((()=>{be=t(),i(),h(),f(),_(),xe=n(),y=p({count:360,timeframe:g,seed:61,price:2330,volatility:.0035,volume:12e3}),Se=ue(y.map(e=>e.high),y.map(e=>e.low),y.map(e=>e.close),14),Ce=y[y.length-1].close,b=Se[Se.length-1]})))()}function Te(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Ee.useState)(`2`);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsx)(s,{"aria-label":e(`multiplier`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[`1.5`,`2`,`2.5`].map(t=>(0,x.jsx)(u,{value:t,label:e(`deviations`,{value:t})},t))}),(0,x.jsx)(m,{bars:De,timeframe:`1H`,symbol:e(`eth`),indicators:[{type:`boll`,period:20,multiplier:Number(t)}],ariaLabel:e(`bollAria`),height:380})]})}var Ee,x,De;function Oe(){return(Oe=e((()=>{Ee=t(),i(),c(),l(),h(),_(),x=n(),De=p({count:500,timeframe:g,seed:14,price:3150,volatility:.006,volume:800})})))()}function ke(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Ae.useState)(`keltner`);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsx)(s,{label:e(`channel`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:Object.keys(C).map(t=>(0,S.jsx)(u,{value:t,label:e(`channels.${t}`)},t))}),(0,S.jsx)(m,{bars:je,timeframe:`1H`,symbol:e(`eurusd`),indicators:[C[t]],ariaLabel:e(`channelsAria`),height:420})]})}var Ae,S,je,C;function Me(){return(Me=e((()=>{Ae=t(),i(),c(),l(),h(),_(),S=n(),je=p({count:360,timeframe:g,seed:1717,price:1.0842,volatility:.0012,volume:9e3},5),C={keltner:{type:`keltner`,period:20,multiplier:2},donchian:{type:`donchian`,period:20},boll:{type:`boll`,period:20}}})))()}function Ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,Pe.useMemo)(()=>{let n=new Intl.NumberFormat(t.language,{maximumFractionDigits:1}),r=Le[E]>=25?`strong`:`weak`,i=Fe[E]>=Ie[E]?`up`:`down`;return e(`dmiSummary.${r}`,{adx:n.format(Le[E]),direction:e(`directions.${i}`)})},[e,t.language]);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,w.jsx)(m,{bars:T,timeframe:`1D`,symbol:e(`msft`),indicators:[{type:`dmi`,height:130}],ariaLabel:e(`dmiAria`),height:440}),(0,w.jsx)(`span`,{role:`status`,style:{fontSize:13,color:`var(--text-secondary-color)`},children:n})]})}var Pe,w,T,Fe,Ie,Le,E;function Re(){return(Re=e((()=>{Pe=t(),i(),h(),f(),_(),w=n(),T=p({count:300,timeframe:v,seed:3030,price:412,volatility:.017,volume:21e6,market:`stock`}),{plus:Fe,minus:Ie,adx:Le}=se(T.map(e=>e.high),T.map(e=>e.low),T.map(e=>e.close)),E=T.length-1})))()}function ze(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Be.useState)(`heikinAshi`);return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,D.jsxs)(s,{"aria-label":e(`chartStyle`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,D.jsx)(u,{value:`heikinAshi`,label:e(`heikinAshi`)}),(0,D.jsx)(u,{value:`candles`,label:e(`candles`)})]}),(0,D.jsx)(m,{bars:O,timeframe:`4H`,symbol:e(`ada`),chartStyle:t,indicators:[{type:`ema`,period:34}],ariaLabel:e(`haAria`),height:400}),(0,D.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e(j?`haRising`:`haFalling`,{count:M})})]})}var Be,D,O,k,A,j,M;function Ve(){return(Ve=e((()=>{for(Be=t(),i(),c(),l(),h(),f(),_(),D=n(),O=p({count:300,timeframe:4*g,seed:90,price:.62,volatility:.011,volume:2e7},4),k=pe({open:O.map(e=>e.open),high:O.map(e=>e.high),low:O.map(e=>e.low),close:O.map(e=>e.close)}),A=k.close.length,j=k.close[A-1]>=k.open[A-1],M=0;M<A&&k.close[A-1-M]>=k.open[A-1-M]===j;)M++})))()}function He(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Ue.useState)(!0);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,N.jsx)(te,{size:`small`,checked:t,onChange:n,label:e(`cloud`)}),(0,N.jsx)(m,{bars:We,timeframe:`1D`,symbol:e(`nikkei`),indicators:[{type:`ichimoku`,cloud:t}],rightOffset:30,barSpacing:6,precision:0,ariaLabel:e(`ichimokuAria`),height:440})]})}var Ue,N,We;function Ge(){return(Ge=e((()=>{Ue=t(),i(),ee(),h(),_(),N=n(),We=p({count:320,timeframe:v,seed:808,price:38e3,volatility:.022,volume:24e3})})))()}function Ke(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,qe.jsx)(m,{bars:Je,timeframe:`1D`,symbol:e(`catl`),colorConvention:`redUp`,utcOffset:480,indicators:[{type:`ma`,period:5},{type:`ma`,period:20},{type:`kdj`,period:9,kPeriod:3,dPeriod:3,height:150}],barSpacing:7,ariaLabel:e(`kdjAria`),height:440})}var qe,Je;function Ye(){return(Ye=e((()=>{i(),h(),_(),qe=n(),Je=p({count:240,timeframe:v,seed:300750,price:236,volatility:.022,volume:4e6,market:`stock`})})))()}function Xe(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,Ze.jsx)(m,{bars:Qe,timeframe:`1D`,symbol:e(`btc`),indicators:[{type:`ema`,period:12,color:`#0ea5e9`},{type:`ema`,period:26,color:`#f59e0b`},{type:`macd`,fast:12,slow:26,signal:9,height:150}],barSpacing:6,ariaLabel:e(`macdAria`),height:460})}var Ze,Qe;function $e(){return($e=e((()=>{i(),h(),_(),Ze=n(),Qe=p({count:300,timeframe:v,seed:36,price:58e3,volatility:.024,volume:3e4})})))()}function et(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,tt.useState)(`20`),i=Number(t);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(s,{"aria-label":e(`period`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[`10`,`20`,`50`].map(t=>(0,P.jsx)(u,{value:t,label:e(`periodValue`,{period:t})},t))}),(0,P.jsx)(m,{bars:nt,timeframe:`1D`,symbol:e(`msft`),indicators:[{type:`ma`,period:i,color:`#f59e0b`},{type:`ema`,period:i,color:`#a855f7`},{type:`wma`,period:i,color:`#0ea5e9`}],barSpacing:6,ariaLabel:e(`maAria`),height:380})]})}var tt,P,nt;function rt(){return(rt=e((()=>{tt=t(),i(),c(),l(),h(),_(),P=n(),nt=p({count:400,timeframe:v,seed:8,price:412,volatility:.015,volume:2e7,market:`stock`})})))()}function it(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,at.jsx)(m,{bars:ot,timeframe:`1D`,symbol:e(`aapl`),indicators:[{type:`volume`,height:80},{type:`obv`,maPeriod:20,height:120}],ariaLabel:e(`obvAria`),height:460})}var at,ot;function st(){return(st=e((()=>{i(),h(),_(),at=n(),ot=p({count:260,timeframe:v,seed:6060,price:182,volatility:.016,volume:54e6,market:`stock`})})))()}function ct(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,F.useState)([`stochRsi`,`cci`]),i=(0,F.useMemo)(()=>Object.keys(L).filter(e=>t.includes(e)).map(e=>L[e]),[t]),a=e=>n(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(`div`,{role:`group`,"aria-label":e(`oscillators`),style:{display:`flex`,flexWrap:`wrap`,gap:6},children:Object.keys(L).map(n=>(0,I.jsx)(o,{size:`small`,variant:`outline`,active:t.includes(n),"aria-pressed":t.includes(n),onClick:()=>a(n),children:e(`oscillatorNames.${n}`)},n))}),(0,I.jsx)(m,{bars:lt,timeframe:`4H`,symbol:e(`btc`),indicators:i,precision:0,ariaLabel:e(`oscillatorsAria`),height:260+i.length*100})]})}var F,I,lt,L;function ut(){return(ut=e((()=>{F=t(),i(),a(),h(),_(),I=n(),lt=p({count:400,timeframe:4*g,seed:5151,price:63800,volatility:.008,volume:900}),L={stochRsi:{type:`stochRsi`,height:100},cci:{type:`cci`,height:100},williamsR:{type:`williamsR`,height:100},mfi:{type:`mfi`,height:100}}})))()}function dt(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,ft.useState)(`70-30`),[i,a]=z[t];return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,R.jsx)(s,{"aria-label":e(`bands`),direction:`horizontal`,value:t,onChange:e=>n(e),children:Object.keys(z).map(t=>(0,R.jsx)(u,{value:t,label:e(`bandValues.${t}`)},t))}),(0,R.jsx)(m,{bars:pt,timeframe:`4H`,symbol:e(`sol`),indicators:[{type:`rsi`,period:14,overbought:i,oversold:a,height:140},{type:`rsi`,period:6,overbought:i,oversold:a,color:`#f59e0b`,height:100}],ariaLabel:e(`rsiAria`),height:460})]})}var ft,R,pt,z;function mt(){return(mt=e((()=>{ft=t(),i(),c(),l(),h(),_(),R=n(),pt=p({count:400,timeframe:4*g,seed:44,price:142,volatility:.012,volume:5e5}),z={"70-30":[70,30],"80-20":[80,20]}})))()}function ht(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,gt.useMemo)(()=>G.map(t=>({time:V[t.index].time,side:t.side,text:e(t.side===`buy`?`buy`:`sell`)})),[e]),i=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`});return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsx)(m,{bars:V,timeframe:`1H`,symbol:e(`btc`),indicators:[{type:`ema`,period:9,color:`#0ea5e9`},{type:`ema`,period:21,color:`#f59e0b`},{type:`rsi`,period:14,height:100}],markers:n,ariaLabel:e(`signalsAria`),height:460}),(0,B.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:e(`signalsSummary`,{trades:K.length,wins:vt,result:i.format(yt)})})]})}var gt,B,V,H,U,W,_t,G,K,vt,yt;function bt(){return(bt=e((()=>{gt=t(),i(),h(),f(),_(),B=n(),V=p({count:600,timeframe:g,seed:128,price:64800,volatility:.0045,volume:300}),H=V.map(e=>e.close),U=ce(H,9),W=ce(H,21),_t=le(H,14),G=[];for(let e=1;e<V.length;e++){let t=U[e]>W[e],n=U[e-1]>W[e-1];if(Number.isNaN(W[e-1])||t===n)continue;let r=G.length>0&&G[G.length-1].side===`buy`;t&&!r&&_t[e]>50&&G.push({index:e,side:`buy`,price:H[e]}),!t&&r&&G.push({index:e,side:`sell`,price:H[e]})}K=G.filter(e=>e.side===`sell`).map(e=>{let t=G[G.indexOf(e)-1];return{buy:t,sell:e,result:e.price/t.price-1}}),vt=K.filter(e=>e.result>0).length,yt=K.reduce((e,t)=>e*(1+t.result),1)-1})))()}function xt(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,q.useState)(3),[i,a]=(0,q.useState)(!1),o=(0,q.useMemo)(()=>{let{direction:n}=fe(St,Ct,wt,10,t),r=[];for(let t=1;t<Y.length;t++)n[t-1]===-1&&n[t]===1&&r.push({time:Y[t].time,side:`buy`,text:e(`buy`)}),n[t-1]===1&&n[t]===-1&&r.push({time:Y[t].time,side:`sell`,text:e(`sell`)});return r},[t,e]),c=(0,q.useMemo)(()=>[{type:`supertrend`,multiplier:t},...i?[{type:`psar`}]:[]],[t,i]);return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:20,fontSize:13},children:[(0,J.jsx)(s,{label:e(`bandDistance`),direction:`horizontal`,value:String(t),onChange:e=>n(Number(e)),children:Tt.map(t=>(0,J.jsx)(u,{value:String(t),label:e(`atrs`,{value:t})},t))}),(0,J.jsx)(te,{size:`small`,checked:i,onChange:a,label:e(`parabolicSar`)}),(0,J.jsx)(`span`,{role:`status`,style:{marginInlineStart:`auto`,color:`var(--text-secondary-color)`},children:e(`flips`,{count:o.length})})]}),(0,J.jsx)(m,{bars:Y,timeframe:`4H`,symbol:e(`sol`),indicators:c,markers:o,ariaLabel:e(`supertrendAria`),height:440})]})}var q,J,Y,St,Ct,wt,Tt;function Et(){return(Et=e((()=>{q=t(),i(),c(),l(),ee(),h(),f(),_(),J=n(),Y=p({count:420,timeframe:4*g,seed:4242,price:142,volatility:.011,volume:6e4}),St=Y.map(e=>e.high),Ct=Y.map(e=>e.low),wt=Y.map(e=>e.close),Tt=[2,3,4]})))()}function Dt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,X.useRef)(null),i=(0,X.useRef)(null);return(0,X.useEffect)(()=>{if(!n.current)return;let r=de(n.current,{bars:Q,timeframe:`1D`,symbol:e(`xom`),indicators:[{type:`ma`,period:50},{type:`volume`,maPeriod:20}],locale:t.language,ariaLabel:e(`vanillaAria`)}),a=r.on(`crosshairMove`,n=>{let r=n?.bar?n.index:Q.length-1,a=Q[r].close/Ot[r]-1;i.current&&(i.current.textContent=Number.isNaN(a)?e(`vanillaWarmup`):e(a>=0?`vanillaAbove`:`vanillaBelow`,{value:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}).format(Math.abs(a))}))});return()=>{a(),r.destroy()}},[e,t.language]),(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,Z.jsx)(`div`,{ref:n,style:{height:380}}),(0,Z.jsx)(`span`,{ref:i,role:`status`,style:{color:`var(--text-secondary-color)`}})]})}var X,Z,Q,Ot;function kt(){return(kt=e((()=>{X=t(),i(),ae(),f(),_(),Z=n(),Q=p({count:250,timeframe:v,seed:4,price:96,volatility:.016,volume:8e6,market:`stock`}),Ot=oe(Q.map(e=>e.close),50)})))()}function At(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,jt.jsx)(m,{bars:Mt,timeframe:`5m`,symbol:e(`nvda`),utcOffset:0,indicators:[{type:`vwap`,reset:`day`},{type:`volume`,height:90}],barSpacing:5,ariaLabel:e(`vwapAria`),height:420})}var jt,Mt;function Nt(){return(Nt=e((()=>{i(),h(),_(),jt=n(),Mt=p({count:390,timeframe:5*ve,seed:21,price:188,volatility:.0022,volume:9e4,market:`stock`,start:Date.UTC(2025,2,10,9,30)})})))()}var Pt;function Ft(){return(Ft=e((()=>{Pt=`import { useMemo } from "react";
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
`})))()}var It;function Lt(){return(Lt=e((()=>{It=`import { useState } from "react";
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
`})))()}var Rt;function zt(){return(zt=e((()=>{Rt=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingIndicator } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars(
  {
    count: 360,
    timeframe: HOUR,
    seed: 1_717,
    price: 1.0842,
    volatility: 0.0012,
    volume: 9e3,
  },
  5,
);

const CHANNELS: Record<string, TradingIndicator> = {
  keltner: { type: "keltner", period: 20, multiplier: 2 },
  donchian: { type: "donchian", period: 20 },
  boll: { type: "boll", period: 20 },
};

export default function ChannelsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [channel, setChannel] = useState("keltner");
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        label={t("channel")}
        direction="horizontal"
        value={channel}
        onChange={(value) => setChannel(String(value))}
      >
        {Object.keys(CHANNELS).map((key) => (
          <Radio key={key} value={key} label={t(\`channels.\${key}\`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eurusd")}
        indicators={[CHANNELS[channel]]}
        ariaLabel={t("channelsAria")}
        height={420}
      />
    </div>
  );
}
`})))()}var Bt;function Vt(){return(Vt=e((()=>{Bt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { dmi } from "minerva-design/charts/core";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 300,
  timeframe: DAY,
  seed: 3_030,
  price: 412,
  volatility: 0.017,
  volume: 2.1e7,
  market: "stock",
});

// the last values, from the pure function
const { plus, minus, adx } = dmi(
  bars.map((bar) => bar.high),
  bars.map((bar) => bar.low),
  bars.map((bar) => bar.close),
);
const last = bars.length - 1;

export default function DmiDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const summary = useMemo(() => {
    const format = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 1,
    });
    const strength = adx[last] >= 25 ? "strong" : "weak";
    const direction = plus[last] >= minus[last] ? "up" : "down";
    return t(\`dmiSummary.\${strength}\`, {
      adx: format.format(adx[last]),
      direction: t(\`directions.\${direction}\`),
    });
  }, [t, i18n.language]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("msft")}
        indicators={[{ type: "dmi", height: 130 }]}
        ariaLabel={t("dmiAria")}
        height={440}
      />
      <span
        role="status"
        style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
      >
        {summary}
      </span>
    </div>
  );
}
`})))()}var Ht;function Ut(){return(Ut=e((()=>{Ht=`import { useState } from "react";
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
`})))()}var Wt;function Gt(){return(Gt=e((()=>{Wt=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 320,
  timeframe: DAY,
  seed: 808,
  price: 38_000,
  volatility: 0.022,
  volume: 2.4e4,
});

export default function IchimokuDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [cloud, setCloud] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={cloud}
        onChange={setCloud}
        label={t("cloud")}
      />
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("nikkei")}
        indicators={[{ type: "ichimoku", cloud }]}
        // room on the right for the cloud drawn 26 bars ahead
        rightOffset={30}
        barSpacing={6}
        precision={0}
        ariaLabel={t("ichimokuAria")}
        height={440}
      />
    </div>
  );
}
`})))()}var Kt;function qt(){return(qt=e((()=>{Kt=`import { useTranslation } from "react-i18next";
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
`})))()}var Jt;function Yt(){return(Yt=e((()=>{Jt=`import { useTranslation } from "react-i18next";
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
`})))()}var Xt;function Zt(){return(Zt=e((()=>{Xt=`import { useState } from "react";
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
`})))()}var Qt;function $t(){return($t=e((()=>{Qt=`import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 260,
  timeframe: DAY,
  seed: 6_060,
  price: 182,
  volatility: 0.016,
  volume: 5.4e7,
  market: "stock",
});

export default function ObvDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("aapl")}
      indicators={[
        { type: "volume", height: 80 },
        { type: "obv", maPeriod: 20, height: 120 },
      ]}
      ariaLabel={t("obvAria")}
      height={460}
    />
  );
}
`})))()}var en;function tn(){return(tn=e((()=>{en=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { TradingChart, type TradingIndicator } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 400,
  timeframe: 4 * HOUR,
  seed: 5_151,
  price: 63_800,
  volatility: 0.008,
  volume: 900,
});

const OSCILLATORS: Record<string, TradingIndicator> = {
  stochRsi: { type: "stochRsi", height: 100 },
  cci: { type: "cci", height: 100 },
  williamsR: { type: "williamsR", height: 100 },
  mfi: { type: "mfi", height: 100 },
};

export default function OscillatorsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [shown, setShown] = useState(["stochRsi", "cci"]);
  const indicators = useMemo(
    () =>
      Object.keys(OSCILLATORS)
        .filter((key) => shown.includes(key))
        .map((key) => OSCILLATORS[key]),
    [shown],
  );
  const toggle = (key: string) =>
    setShown((list) =>
      list.includes(key) ? list.filter((k) => k !== key) : [...list, key],
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        role="group"
        aria-label={t("oscillators")}
        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
      >
        {Object.keys(OSCILLATORS).map((key) => (
          <Button
            key={key}
            size="small"
            variant="outline"
            active={shown.includes(key)}
            aria-pressed={shown.includes(key)}
            onClick={() => toggle(key)}
          >
            {t(\`oscillatorNames.\${key}\`)}
          </Button>
        ))}
      </div>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("btc")}
        indicators={indicators}
        precision={0}
        ariaLabel={t("oscillatorsAria")}
        height={260 + indicators.length * 100}
      />
    </div>
  );
}
`})))()}var nn;function rn(){return(rn=e((()=>{nn=`import { useState } from "react";
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
`})))()}var an;function on(){return(on=e((()=>{an=`import { useMemo } from "react";
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
`})))()}var sn;function cn(){return(cn=e((()=>{sn=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import { TradingChart, type TradingMarker } from "minerva-design/charts";
import { supertrend } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 420,
  timeframe: 4 * HOUR,
  seed: 4_242,
  price: 142,
  volatility: 0.011,
  volume: 6e4,
});

const high = bars.map((bar) => bar.high);
const low = bars.map((bar) => bar.low);
const close = bars.map((bar) => bar.close);

const MULTIPLIERS = [2, 3, 4] as const;

export default function SupertrendDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [multiplier, setMultiplier] = useState(3);
  const [sar, setSar] = useState(false);

  // the flips of the trend, from the pure function: buy / sell markers
  const markers = useMemo((): TradingMarker[] => {
    const { direction } = supertrend(high, low, close, 10, multiplier);
    const flips: TradingMarker[] = [];
    for (let i = 1; i < bars.length; i++) {
      if (direction[i - 1] === -1 && direction[i] === 1)
        flips.push({ time: bars[i].time, side: "buy", text: t("buy") });
      if (direction[i - 1] === 1 && direction[i] === -1)
        flips.push({ time: bars[i].time, side: "sell", text: t("sell") });
    }
    return flips;
  }, [multiplier, t]);

  const indicators = useMemo(
    () => [
      { type: "supertrend" as const, multiplier },
      ...(sar ? [{ type: "psar" as const }] : []),
    ],
    [multiplier, sar],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
          fontSize: 13,
        }}
      >
        <RadioGroup
          label={t("bandDistance")}
          direction="horizontal"
          value={String(multiplier)}
          onChange={(value) => setMultiplier(Number(value))}
        >
          {MULTIPLIERS.map((value) => (
            <Radio
              key={value}
              value={String(value)}
              label={t("atrs", { value })}
            />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={sar}
          onChange={setSar}
          label={t("parabolicSar")}
        />
        <span
          role="status"
          style={{
            marginInlineStart: "auto",
            color: "var(--text-secondary-color)",
          }}
        >
          {t("flips", { count: markers.length })}
        </span>
      </div>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("sol")}
        indicators={indicators}
        markers={markers}
        ariaLabel={t("supertrendAria")}
        height={440}
      />
    </div>
  );
}
`})))()}var ln;function un(){return(un=e((()=>{ln=`import { useEffect, useRef } from "react";
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
`})))()}var dn;function fn(){return(fn=e((()=>{dn=`import { useTranslation } from "react-i18next";
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
`})))()}var $,pn,mn,hn,gn;function _n(){return(_n=e((()=>{we(),Oe(),Me(),Re(),Ve(),Ge(),Ye(),$e(),rt(),st(),ut(),mt(),bt(),Et(),kt(),Nt(),Ft(),Lt(),zt(),Vt(),Ut(),Gt(),qt(),Yt(),Zt(),$t(),tn(),rn(),on(),cn(),un(),fn(),t(),i(),ne(),he(),ie(),_e(),$=n(),pn=me(Object.assign({"./demos/atr.tsx":ye,"./demos/bollinger.tsx":Te,"./demos/channels.tsx":ke,"./demos/dmi.tsx":Ne,"./demos/heikin-ashi.tsx":ze,"./demos/ichimoku.tsx":He,"./demos/kdj.tsx":Ke,"./demos/macd.tsx":Xe,"./demos/moving-averages.tsx":et,"./demos/obv.tsx":it,"./demos/oscillators.tsx":ct,"./demos/rsi.tsx":dt,"./demos/signals.tsx":ht,"./demos/supertrend.tsx":xt,"./demos/vanilla.tsx":Dt,"./demos/vwap.tsx":At}),Object.assign({"./demos/atr.tsx":Pt,"./demos/bollinger.tsx":It,"./demos/channels.tsx":Rt,"./demos/dmi.tsx":Bt,"./demos/heikin-ashi.tsx":Ht,"./demos/ichimoku.tsx":Wt,"./demos/kdj.tsx":Kt,"./demos/macd.tsx":Jt,"./demos/moving-averages.tsx":Xt,"./demos/obv.tsx":Qt,"./demos/oscillators.tsx":en,"./demos/rsi.tsx":nn,"./demos/signals.tsx":an,"./demos/supertrend.tsx":sn,"./demos/vanilla.tsx":ln,"./demos/vwap.tsx":dn})),mn=`<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>`,hn=`import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");`,gn=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:d.section,"aria-labelledby":`indicators-declarative`,children:[(0,$.jsx)(`h2`,{id:`indicators-declarative`,children:e(`docs.technical-indicators.intro.declarative.title`)}),(0,$.jsx)(`p`,{className:d.prose,children:e(`docs.technical-indicators.intro.declarative.text`)}),(0,$.jsx)(re,{code:mn,language:`tsx`}),(0,$.jsx)(`p`,{className:d.prose,children:e(`docs.technical-indicators.intro.declarative.ids`)})]}),(0,$.jsxs)(`section`,{className:d.section,"aria-labelledby":`indicators-functions`,children:[(0,$.jsx)(`h2`,{id:`indicators-functions`,children:e(`docs.technical-indicators.intro.functions.title`)}),(0,$.jsx)(`p`,{className:d.prose,children:e(`docs.technical-indicators.intro.functions.text`)}),(0,$.jsx)(re,{code:hn,language:`tsx`})]}),(0,$.jsxs)(`section`,{className:d.section,"aria-labelledby":`indicators-conventions`,children:[(0,$.jsx)(`h2`,{id:`indicators-conventions`,children:e(`docs.technical-indicators.intro.conventions.title`)}),(0,$.jsxs)(`ul`,{className:d.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.averages`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.wilder`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.kdj`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.ichimoku`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.vwap`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.incremental`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.zoom`)})]})]})]});return(0,$.jsx)(ge,{id:`technical-indicators`,demos:pn,intro:t})}})))()}_n();export{gn as default};