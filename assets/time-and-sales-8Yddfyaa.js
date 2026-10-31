import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{i as s,n as c,r as l,t as u}from"./Radio-D2wZ9q6z.js";import{n as d,t as f}from"./Tag-C33GIXr-.js";import{n as p,t as m}from"./Switch-BCh7GKwc.js";import{a as h,o as g}from"./angular-preview-DXuT9H-w.js";import{l as _,n as ee,t as v,u as y}from"./DocPage-CHJwIegD.js";import{f as b,i as x,r as S,s as C,t as te,u as w}from"./feed-YwnTBj_b.js";function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),[t]=(0,re.useState)(()=>te({seed:31},6e4).updates.flatMap(e=>e.trades));return(0,ie.jsx)(b,{trades:t,height:360,columns:[`time`,`price`,`size`,`side`],pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})}var re,ie;function ae(){return(ae=e((()=>{re=t(),i(),w(),S(),ie=n()})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=t.language,i=(0,T.useRef)(null),a=(0,T.useRef)(null),[s,c]=(0,T.useState)([]),[l,u]=(0,T.useState)(0),d=(0,T.useRef)(0);C(a,{seed:38,whales:.03},{load:()=>i.current?.clear(),update:({trades:e})=>{if(!e.length)return;i.current?.addTrades(e);let t=[],n=null;for(let r of e){if(n&&n.time===r.time&&n.side===r.side){n.price=(n.price*n.size+r.price*r.size)/(n.size+r.size),n.size+=r.size,n.prints++;continue}n&&n.size>=D&&t.push(n),n={id:0,...r,prints:1}}if(n&&n.size>=D&&t.push(n),t.length){for(let e of t)e.id=d.current++;c(e=>[...t.reverse(),...e].slice(0,5)),u(e=>e+t.length)}}});let p=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),m=new Intl.NumberFormat(n,{maximumFractionDigits:2}),h=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),g=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return(0,E.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,width:`100%`},children:[(0,E.jsx)(b,{ref:i,height:360,columns:[`time`,`price`,`size`,`side`],aggregate:!0,largeTradeThreshold:D,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,E.jsxs)(`div`,{style:{display:`grid`,gap:8,alignContent:`start`},children:[(0,E.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,E.jsx)(`strong`,{children:e(`blocksTitle`,{value:m.format(D)})}),(0,E.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{i.current?.clear(),c([]),u(0)},children:e(`clearTape`)})]}),(0,E.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`blocksSeen`,{value:new Intl.NumberFormat(n).format(l)})}),(0,E.jsxs)(`output`,{"aria-live":`polite`,style:{display:`grid`,gap:6,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[s.length===0&&(0,E.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`blocksWaiting`)}),s.map(t=>(0,E.jsxs)(`span`,{style:{display:`flex`,flexWrap:`wrap`,gap:8,alignItems:`center`},children:[(0,E.jsx)(f,{color:t.side===`buy`?`success`:`danger`,children:t.side===`buy`?e(`blockBuy`):e(`blockSell`)}),e(`blockLine`,{time:p.format(t.time),size:m.format(t.size),price:h.format(t.price),notional:g.format(t.size*t.price)}),(0,E.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`blockPrints`,{value:new Intl.NumberFormat(n).format(t.prints)})})]},t.id))]})]})]})}var T,E,D;function O(){return(O=e((()=>{T=t(),i(),a(),d(),w(),S(),E=n(),D=2})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=t.language,[i,a]=(0,k.useState)(`utc`),[o]=(0,k.useState)(()=>te({seed:36},6e4).updates.flatMap(e=>e.trades)),c=j.find(e=>e.id===i)?.timeZone,l=(0,k.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,fractionalSecondDigits:3,hourCycle:`h23`,timeZone:c});return t=>e.format(t)},[n,c]),d=(0,k.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,minimumFractionDigits:1,maximumFractionDigits:1});return t=>e.format(t)},[n]),f=(0,k.useMemo)(()=>new Intl.DateTimeFormat(n,{timeZone:c,timeZoneName:`short`}).formatToParts(o.at(-1)?.time??0).find(e=>e.type===`timeZoneName`)?.value??``,[n,c,o]);return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsx)(s,{"aria-label":e(`timeZone`),direction:`horizontal`,value:i,onChange:e=>a(e),children:j.map(t=>(0,A.jsx)(u,{value:t.id,label:e(`zones.${t.id}`)},t.id))}),(0,A.jsx)(b,{trades:o,height:340,columns:[`time`,`price`,`size`,`side`],formatTime:l,formatPrice:d,sizePrecision:4,labels:{time:e(`timeIn`,{zone:f})},ariaLabel:e(`aria`)})]})}var k,A,j;function ce(){return(ce=e((()=>{k=t(),i(),c(),l(),w(),S(),A=n(),j=[{id:`local`},{id:`utc`,timeZone:`UTC`},{id:`newYork`,timeZone:`America/New_York`},{id:`tokyo`,timeZone:`Asia/Tokyo`}]})))()}function le(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,M.useRef)(null),n=(0,M.useRef)(null);return C(n,{seed:36},{load:()=>t.current?.clear(),update:({trades:e})=>{e.length&&t.current?.addTrades(e)}}),(0,N.jsx)(`div`,{ref:n,style:{width:`100%`,maxWidth:300},children:(0,N.jsx)(b,{ref:t,height:260,rowHeight:17,fontSize:11,milliseconds:!1,aggregate:!0,pricePrecision:1,sizePrecision:3,ariaLabel:e(`aria`)})})}var M,N;function ue(){return(ue=e((()=>{M=t(),i(),w(),S(),N=n()})))()}function de(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,P.useRef)(null),n=(0,P.useRef)(null);return C(n,{seed:35,activity:180},{load:()=>t.current?.clear(),update:({trades:e})=>{e.length&&t.current?.addTrades(e)}}),(0,F.jsx)(`div`,{ref:n,style:fe,children:(0,F.jsx)(b,{ref:t,height:380,rowHeight:19,largeTradeThreshold:1,priceColor:`tick`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, monospace`,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})})}var P,F,fe;function pe(){return(pe=e((()=>{P=t(),i(),w(),S(),F=n(),fe={"--background-color":`#0b0e11`,"--surface-color":`#0b0e11`,"--surface-elevated-color":`#1b2028`,"--text-color":`#eaecef`,"--text-secondary-color":`#848e9c`,"--border-color":`#2b3139`,"--success-color":`#0ecb81`,"--danger-color":`#f6465d`,"--primary-color":`#f0b90b`,background:`#0b0e11`,color:`#eaecef`,borderRadius:12,padding:`8px 4px 4px`,width:`100%`,boxSizing:`border-box`}})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,I.useRef)(null),i=(0,I.useRef)(null),[a,o]=(0,I.useState)(0),[c,l]=(0,I.useState)(!0),[d,f]=(0,I.useState)(!1),[p,h]=(0,I.useState)(0),g=(0,I.useRef)(0);C(i,{seed:34,activity:200},{load:()=>n.current?.clear(),update:({trades:e})=>{if(!e.length)return;let t=n.current;t?.addTrades(e);let r=performance.now();r-g.current<250||(g.current=r,h(t?.getInstance()?.getCount()??0))}});let _=new Intl.NumberFormat(t.language);return(0,L.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsx)(s,{"aria-label":e(`minSize`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:R.map(t=>(0,L.jsx)(u,{value:t,label:t?e(`atLeast`,{value:_.format(t)}):e(`all`)},t))}),(0,L.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 24px`},children:[(0,L.jsx)(m,{checked:c,onChange:e=>l(e),label:e(`aggregate`)}),(0,L.jsx)(m,{checked:d,onChange:e=>f(e),label:e(`tickColors`)})]}),(0,L.jsx)(b,{ref:n,height:340,minSize:a,aggregate:c,priceColor:d?`tick`:`side`,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,L.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`rows`,{value:_.format(p)})})]})}var I,L,R;function z(){return(z=e((()=>{I=t(),i(),c(),l(),p(),w(),S(),L=n(),R=[0,.01,.1,1]})))()}function he(e,t,n=Date.now()){let r=x(t),i=Array(e),a=64e3,o=n-e*12;for(let t=0;t<e;t++){r()>.3&&(o+=Math.floor(r()*24)),a=Math.max(1,a+Math.round((r()-.5)*3)/10);let e=r()<.004;i[t]={time:o,price:Math.round(a*10)/10,size:Math.round((e?2+r()*20:5e-4+r()**4*1.5)*1e4)/1e4,side:r()<.5?`buy`:`sell`}}return i}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,B.useRef)(null),i=(0,B.useRef)(null),[a,s]=(0,B.useState)({count:0,ms:0}),c={capacity:5e5,columns:[`time`,`price`,`size`,`side`],largeTradeThreshold:2,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)},l=(0,B.useRef)(c);(0,B.useEffect)(()=>{l.current=c}),(0,B.useEffect)(()=>{let e=n.current;if(!e)return;let t=h(e,l.current);i.current=t;let r=he(1e5,38),a=performance.now();return t.setTrades(r),s({count:t.getCount(),ms:performance.now()-a}),()=>{t.destroy(),i.current=null}},[]),(0,B.useEffect)(()=>{i.current?.setOptions(l.current)},[t.language]);let u=()=>{let e=i.current;if(!e)return;let t=he(1e5,a.count+1),n=performance.now();e.addTrades(t),s({count:e.getCount(),ms:performance.now()-n})},d=new Intl.NumberFormat(t.language);return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,V.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12,fontSize:13,color:`var(--text-secondary-color)`},children:[(0,V.jsx)(o,{size:`small`,variant:`outline`,onClick:u,children:e(`add`,{value:d.format(1e5)})}),(0,V.jsx)(`span`,{children:e(`loaded`,{rows:d.format(a.count),ms:d.format(Math.round(a.ms))})})]}),(0,V.jsx)(`div`,{ref:n,style:{height:380,width:`100%`}})]})}var B,V;function _e(){return(_e=e((()=>{B=t(),i(),a(),g(),S(),V=n()})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,H.useRef)(null),i=(0,H.useRef)(null),[a,o]=(0,H.useState)(1);C(i,{seed:33,whales:.03,activity:160},{load:()=>n.current?.clear(),update:({trades:e})=>{e.length&&n.current?.addTrades(e)}});let c=new Intl.NumberFormat(t.language);return(0,U.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,U.jsx)(s,{"aria-label":e(`threshold`),direction:`horizontal`,value:a,onChange:e=>o(Number(e)),children:ye.map(t=>(0,U.jsx)(u,{value:t,label:e(`atLeast`,{value:c.format(t)})},t))}),(0,U.jsx)(b,{ref:n,height:360,largeTradeThreshold:a,aggregate:!0,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var H,U,ye;function be(){return(be=e((()=>{H=t(),i(),c(),l(),w(),S(),U=n(),ye=[.5,1,5]})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=(0,W.useRef)(null),i=(0,W.useRef)(null),[a,o]=(0,W.useState)(!1),[s,c]=(0,W.useState)(null);C(i,{seed:32,activity:220},{load:()=>n.current?.clear(),update:({trades:e})=>{e.length&&n.current?.addTrades(e)}});let l=new Intl.NumberFormat(t.language,{minimumFractionDigits:1}),u=new Intl.NumberFormat(t.language,{maximumFractionDigits:4});return(0,G.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsx)(b,{ref:n,height:380,columns:[`time`,`price`,`size`,`side`],pauseOnHover:!0,onPause:o,onTradeClick:c,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,G.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:s?e(s.trade.side===`buy`?`pickedBuy`:`pickedSell`,{size:u.format(s.trade.size),price:l.format(s.trade.price)}):e(a?`pausedHint`:`liveHint`)})]})}var W,G;function Se(){return(Se=e((()=>{W=t(),i(),w(),S(),G=n()})))()}function Ce(e,t){let n={vwap:NaN,bought:0,sold:0,count:0,largest:null},r=e.at(-1)?.time??0,i=0;for(let a=e.length-1;a>=0;a--){let o=e[a];if(o.time<r-t)break;n.count++,i+=o.price*o.size,o.side===`buy`?n.bought+=o.size:n.sold+=o.size,(!n.largest||o.size>n.largest.size)&&(n.largest=o)}let a=n.bought+n.sold;return a&&(n.vwap=i/a),n}function we(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=t.language,i=(0,K.useRef)(null),a=(0,K.useRef)(null),[o,c]=(0,K.useState)(3e4),[l,d]=(0,K.useState)(null),f=(0,K.useRef)([]),p=(0,K.useRef)(0),m=(0,K.useRef)(o);C(a,{seed:37,activity:200},{load:()=>{i.current?.clear(),f.current=[]},update:({trades:e})=>{if(e.length){i.current?.addTrades(e);let t=f.current;t.push(...e);let n=t.findIndex(t=>t.time>=e[0].time-6e4);n>0&&t.splice(0,n)}let t=performance.now();t-p.current<500||(p.current=t,d(Ce(f.current,m.current)))}});let h=new Intl.NumberFormat(n,{minimumFractionDigits:1,maximumFractionDigits:1}),g=new Intl.NumberFormat(n,{maximumFractionDigits:3}),_=new Intl.NumberFormat(n,{maximumFractionDigits:1}),ee=new Intl.NumberFormat(n,{style:`percent`}),v=e=>new Intl.NumberFormat(n,{style:`unit`,unit:`second`}).format(e/1e3),y=l?l.bought+l.sold:0,x=y?(l?.bought??0)/y:.5,S=(e,t)=>(0,q.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,q.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:12},children:e}),(0,q.jsx)(`strong`,{style:{fontVariantNumeric:`tabular-nums`},children:t})]});return(0,q.jsxs)(`div`,{ref:a,style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,width:`100%`},children:[(0,q.jsx)(b,{ref:i,height:360,aggregate:!0,largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)}),(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,alignContent:`start`},children:[(0,q.jsx)(s,{"aria-label":e(`rollingWindow`),direction:`horizontal`,value:o,onChange:e=>{c(Number(e)),m.current=Number(e),d(Ce(f.current,Number(e)))},children:Te.map(t=>(0,q.jsx)(u,{value:t,label:e(`lastWindow`,{value:v(t)})},t))}),(0,q.jsxs)(`div`,{"aria-hidden":`true`,style:{display:`flex`,height:8,borderRadius:4,overflow:`hidden`,background:`var(--border-color)`},children:[(0,q.jsx)(`div`,{style:{width:`${x*100}%`,background:`var(--success-color)`,transition:`width 0.4s`}}),(0,q.jsx)(`div`,{style:{flex:1,background:`var(--danger-color)`}})]}),(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,gridTemplateColumns:`repeat(2, minmax(0, 1fr))`},children:[S(e(`vwap`),l&&y?h.format(l.vwap):`…`),S(e(`buyShare`),l&&y?ee.format(x):`…`),S(e(`bought`),l?e(`btcValue`,{value:g.format(l.bought)}):`…`),S(e(`sold`),l?e(`btcValue`,{value:g.format(l.sold)}):`…`),S(e(`tradesPerSecond`),l?_.format(l.count/(o/1e3)):`…`),S(e(`largest`),l?.largest?e(l.largest.side===`buy`?`largestBuy`:`largestSell`,{size:g.format(l.largest.size),price:h.format(l.largest.price)}):`…`)]}),(0,q.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(l&&y?x>=.6?`pressureBuy`:x<=.4?`pressureSell`:`pressureBalanced`:`pressureWaiting`)})]})]})}var K,q,Te;function Ee(){return(Ee=e((()=>{K=t(),i(),c(),l(),w(),S(),q=n(),Te=[1e4,3e4,6e4]})))()}function De(){let{t:e}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),t=(0,J.useRef)(null),n=(0,J.useRef)(null),[i,a]=(0,J.useState)(`red-up`);return C(n,{seed:37},{load:()=>t.current?.clear(),update:({trades:e})=>{e.length&&t.current?.addTrades(e)}}),(0,Y.jsxs)(`div`,{ref:n,style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(s,{"aria-label":e(`colors`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,Y.jsx)(u,{value:`red-up`,label:e(`redUp`)}),(0,Y.jsx)(u,{value:`green-up`,label:e(`greenUp`)})]}),(0,Y.jsx)(b,{ref:t,colorConvention:i,height:340,columns:[`time`,`price`,`size`,`side`],largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`aria`)})]})}var J,Y;function Oe(){return(Oe=e((()=>{J=t(),i(),c(),l(),w(),S(),Y=n()})))()}function ke(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.time-and-sales.data`}),n=t.language,i=(0,X.useRef)(null),a=(0,X.useRef)(null),o=(0,X.useRef)(null),[s,c]=(0,X.useState)(Q),l=(0,X.useRef)({...Q}),u=(0,X.useRef)(0);C(i,{seed:39,activity:200},{load:()=>{a.current?.clear(),o.current?.clear(),l.current={...Q},c(Q)},update:({trades:e})=>{if(!e.length)return;let t=e.filter(e=>e.side===`buy`),n=e.filter(e=>e.side===`sell`);t.length&&a.current?.addTrades(t),n.length&&o.current?.addTrades(n);let r=l.current;r.buys+=t.length,r.sells+=n.length;for(let e of t)r.bought+=e.size;for(let e of n)r.sold+=e.size;let i=performance.now();i-u.current<500||(u.current=i,c({...r}))}});let d=new Intl.NumberFormat(n),f=new Intl.NumberFormat(n,{maximumFractionDigits:2}),p=new Intl.NumberFormat(n,{maximumFractionDigits:2,signDisplay:`exceptZero`}),m=(t,n,r,i)=>(0,Z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,justifyContent:`space-between`,gap:8,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,Z.jsx)(`strong`,{style:{color:t},children:n}),(0,Z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`sideTotals`,{count:d.format(r),size:f.format(i)})})]});return(0,Z.jsxs)(`div`,{ref:i,style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`},children:[(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[m(`var(--success-color)`,e(`buysTape`),s.buys,s.bought),(0,Z.jsx)(b,{ref:a,height:300,aggregate:!0,largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`buysAria`)})]}),(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[m(`var(--danger-color)`,e(`sellsTape`),s.sells,s.sold),(0,Z.jsx)(b,{ref:o,height:300,aggregate:!0,largeTradeThreshold:1,pricePrecision:1,sizePrecision:4,ariaLabel:e(`sellsAria`)})]})]}),(0,Z.jsx)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13,fontVariantNumeric:`tabular-nums`},children:e(`netFlow`,{value:p.format(s.bought-s.sold)})})]})}var X,Z,Q;function Ae(){return(Ae=e((()=>{X=t(),i(),w(),S(),Z=n(),Q={buys:0,sells:0,bought:0,sold:0}})))()}var je;function Me(){return(Me=e((()=>{je=`import { useState } from "react";
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
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import {
  TimeAndSales,
  type MarketTrade,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** A sweep of at least this size is a block trade (BTC) */
const BLOCK = 2;

interface Block {
  id: number;
  time: number;
  side: MarketTrade["side"];
  size: number;
  /** Average price of the sweep */
  price: number;
  /** Prints merged into the block */
  prints: number;
}

export default function BlockAlertsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [total, setTotal] = useState(0);
  const nextId = useRef(0);

  useMarketStream(
    boxRef,
    // whales: aggressive orders of several BTC sweeping the book
    { seed: 38, whales: 0.03 },
    {
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (!trades.length) return;
        tapeRef.current?.addTrades(trades);
        // the prints of one sweep share a side and a millisecond, like the
        // rows merged by aggregate
        const found: Block[] = [];
        let open: Block | null = null;
        for (const trade of trades) {
          if (open && open.time === trade.time && open.side === trade.side) {
            open.price =
              (open.price * open.size + trade.price * trade.size) /
              (open.size + trade.size);
            open.size += trade.size;
            open.prints++;
            continue;
          }
          if (open && open.size >= BLOCK) found.push(open);
          open = { id: 0, ...trade, prints: 1 };
        }
        if (open && open.size >= BLOCK) found.push(open);
        if (!found.length) return;
        for (const block of found) block.id = nextId.current++;
        setBlocks((list) => [...found.reverse(), ...list].slice(0, 5));
        setTotal((count) => count + found.length);
      },
    },
  );

  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const notional = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });

  return (
    <div
      ref={boxRef}
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <TimeAndSales
        ref={tapeRef}
        height={360}
        columns={["time", "price", "size", "side"]}
        aggregate
        largeTradeThreshold={BLOCK}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <strong>{t("blocksTitle", { value: btc.format(BLOCK) })}</strong>
          <Button
            size="small"
            variant="outline"
            onClick={() => {
              tapeRef.current?.clear();
              setBlocks([]);
              setTotal(0);
            }}
          >
            {t("clearTape")}
          </Button>
        </div>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("blocksSeen", {
            value: new Intl.NumberFormat(locale).format(total),
          })}
        </span>
        <output
          aria-live="polite"
          style={{
            display: "grid",
            gap: 6,
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {blocks.length === 0 && (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("blocksWaiting")}
            </span>
          )}
          {blocks.map((block) => (
            <span
              key={block.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Tag color={block.side === "buy" ? "success" : "danger"}>
                {block.side === "buy" ? t("blockBuy") : t("blockSell")}
              </Tag>
              {t("blockLine", {
                time: clock.format(block.time),
                size: btc.format(block.size),
                price: usd.format(block.price),
                notional: notional.format(block.size * block.price),
              })}
              <span style={{ color: "var(--text-secondary-color)" }}>
                {t("blockPrints", {
                  value: new Intl.NumberFormat(locale).format(block.prints),
                })}
              </span>
            </span>
          ))}
        </output>
      </div>
    </div>
  );
}
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TimeAndSales } from "minerva-design/charts";
import { createHistory } from "../../order-book/feed";

type Zone = "local" | "utc" | "newYork" | "tokyo";

const ZONES: { id: Zone; timeZone?: string }[] = [
  { id: "local" },
  { id: "utc", timeZone: "UTC" },
  { id: "newYork", timeZone: "America/New_York" },
  { id: "tokyo", timeZone: "Asia/Tokyo" },
];

export default function ClockDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const [zone, setZone] = useState<Zone>("utc");
  // the trades of the last minute, oldest first
  const [trades] = useState(() =>
    createHistory({ seed: 36 }, 60_000).updates.flatMap((u) => u.trades),
  );

  // the tape's own clock is local or UTC; formatTime shows any time zone,
  // in the page language, still with milliseconds
  const timeZone = ZONES.find((item) => item.id === zone)?.timeZone;
  const formatTime = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hourCycle: "h23",
      timeZone,
    });
    return (time: number) => format.format(time);
  }, [locale, timeZone]);
  const formatPrice = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => usd.format(value);
  }, [locale]);
  const zoneName = useMemo(() => {
    const parts = new Intl.DateTimeFormat(locale, {
      timeZone,
      timeZoneName: "short",
    }).formatToParts(trades.at(-1)?.time ?? 0);
    return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
  }, [locale, timeZone, trades]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("timeZone")}
        direction="horizontal"
        value={zone}
        onChange={(value) => setZone(value as Zone)}
      >
        {ZONES.map((item) => (
          <Radio key={item.id} value={item.id} label={t(\`zones.\${item.id}\`)} />
        ))}
      </RadioGroup>
      <TimeAndSales
        trades={trades}
        height={340}
        columns={["time", "price", "size", "side"]}
        formatTime={formatTime}
        formatPrice={formatPrice}
        sizePrecision={4}
        // the header says which clock the times are in
        labels={{ time: t("timeIn", { zone: zoneName }) }}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { useRef } from "react";
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
`})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { useRef, type CSSProperties } from "react";
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
`})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { useRef, useState } from "react";
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
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useEffect, useRef, useState } from "react";
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
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useRef, useState } from "react";
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
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useRef, useState } from "react";
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
`})))()}var $;function Ye(){return(Ye=e((()=>{$=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TimeAndSales,
  type MarketTrade,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** Rolling windows, in ms */
const WINDOWS = [10_000, 30_000, 60_000];

interface Stats {
  vwap: number;
  bought: number;
  sold: number;
  count: number;
  largest: MarketTrade | null;
}

/** Tape statistics of the trades within \`span\` ms of the latest one */
function measure(trades: MarketTrade[], span: number): Stats {
  const stats: Stats = {
    vwap: NaN,
    bought: 0,
    sold: 0,
    count: 0,
    largest: null,
  };
  const end = trades.at(-1)?.time ?? 0;
  let notional = 0;
  for (let i = trades.length - 1; i >= 0; i--) {
    const trade = trades[i];
    if (trade.time < end - span) break;
    stats.count++;
    notional += trade.price * trade.size;
    if (trade.side === "buy") stats.bought += trade.size;
    else stats.sold += trade.size;
    if (!stats.largest || trade.size > stats.largest.size)
      stats.largest = trade;
  }
  const volume = stats.bought + stats.sold;
  if (volume) stats.vwap = notional / volume;
  return stats;
}

export default function PressureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(30_000);
  const [stats, setStats] = useState<Stats | null>(null);
  // the last minute of trades, for the statistics (the tape keeps its own)
  const recent = useRef<MarketTrade[]>([]);
  const measuredAt = useRef(0);
  const spanRef = useRef(span);

  useMarketStream(
    boxRef,
    { seed: 37, activity: 200 },
    {
      load: () => {
        tapeRef.current?.clear();
        recent.current = [];
      },
      update: ({ trades }) => {
        if (trades.length) {
          tapeRef.current?.addTrades(trades);
          const list = recent.current;
          list.push(...trades);
          const from = list.findIndex(
            (trade) => trade.time >= trades[0].time - 60_000,
          );
          if (from > 0) list.splice(0, from);
        }
        // twice a second is plenty for a human
        const now = performance.now();
        if (now - measuredAt.current < 500) return;
        measuredAt.current = now;
        setStats(measure(recent.current, spanRef.current));
      },
    },
  );

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const rate = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const seconds = (ms: number) =>
    new Intl.NumberFormat(locale, { style: "unit", unit: "second" }).format(
      ms / 1000,
    );
  const volume = stats ? stats.bought + stats.sold : 0;
  const share = volume ? (stats?.bought ?? 0) / volume : 0.5;
  const cell = (label: string, value: string) => (
    <div style={{ display: "grid", gap: 2 }}>
      <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
        {label}
      </span>
      <strong style={{ fontVariantNumeric: "tabular-nums" }}>{value}</strong>
    </div>
  );

  return (
    <div
      ref={boxRef}
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <TimeAndSales
        ref={tapeRef}
        height={360}
        aggregate
        largeTradeThreshold={1}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
        <RadioGroup
          aria-label={t("rollingWindow")}
          direction="horizontal"
          value={span}
          onChange={(value) => {
            setSpan(Number(value));
            spanRef.current = Number(value);
            setStats(measure(recent.current, Number(value)));
          }}
        >
          {WINDOWS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t("lastWindow", { value: seconds(value) })}
            />
          ))}
        </RadioGroup>
        {/* share of the volume bought by aggressive buyers */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            height: 8,
            borderRadius: 4,
            overflow: "hidden",
            background: "var(--border-color)",
          }}
        >
          <div
            style={{
              width: \`\${share * 100}%\`,
              background: "var(--success-color)",
              transition: "width 0.4s",
            }}
          />
          <div style={{ flex: 1, background: "var(--danger-color)" }} />
        </div>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          {cell(t("vwap"), stats && volume ? usd.format(stats.vwap) : "…")}
          {cell(t("buyShare"), stats && volume ? percent.format(share) : "…")}
          {cell(
            t("bought"),
            stats ? t("btcValue", { value: btc.format(stats.bought) }) : "…",
          )}
          {cell(
            t("sold"),
            stats ? t("btcValue", { value: btc.format(stats.sold) }) : "…",
          )}
          {cell(
            t("tradesPerSecond"),
            stats ? rate.format(stats.count / (span / 1000)) : "…",
          )}
          {cell(
            t("largest"),
            stats?.largest
              ? t(stats.largest.side === "buy" ? "largestBuy" : "largestSell", {
                  size: btc.format(stats.largest.size),
                  price: usd.format(stats.largest.price),
                })
              : "…",
          )}
        </div>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
        >
          {stats && volume
            ? t(
                share >= 0.6
                  ? "pressureBuy"
                  : share <= 0.4
                    ? "pressureSell"
                    : "pressureBalanced",
              )
            : t("pressureWaiting")}
        </output>
      </div>
    </div>
  );
}
`})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { useRef, useState } from "react";
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
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

interface Totals {
  buys: number;
  sells: number;
  bought: number;
  sold: number;
}

const EMPTY: Totals = { buys: 0, sells: 0, bought: 0, sold: 0 };

export default function SplitDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const boxRef = useRef<HTMLDivElement>(null);
  const buyTapeRef = useRef<TimeAndSalesHandle>(null);
  const sellTapeRef = useRef<TimeAndSalesHandle>(null);
  const [totals, setTotals] = useState<Totals>(EMPTY);
  const running = useRef<Totals>({ ...EMPTY });
  const shownAt = useRef(0);

  // one market, its trades split by aggressor side into two tapes
  useMarketStream(
    boxRef,
    { seed: 39, activity: 200 },
    {
      load: () => {
        buyTapeRef.current?.clear();
        sellTapeRef.current?.clear();
        running.current = { ...EMPTY };
        setTotals(EMPTY);
      },
      update: ({ trades }) => {
        if (!trades.length) return;
        const buys = trades.filter((trade) => trade.side === "buy");
        const sells = trades.filter((trade) => trade.side === "sell");
        if (buys.length) buyTapeRef.current?.addTrades(buys);
        if (sells.length) sellTapeRef.current?.addTrades(sells);
        const sum = running.current;
        sum.buys += buys.length;
        sum.sells += sells.length;
        for (const trade of buys) sum.bought += trade.size;
        for (const trade of sells) sum.sold += trade.size;
        const now = performance.now();
        if (now - shownAt.current < 500) return;
        shownAt.current = now;
        setTotals({ ...sum });
      },
    },
  );

  const integer = new Intl.NumberFormat(locale);
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const delta = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });
  const header = (
    color: string,
    title: string,
    count: number,
    size: number,
  ) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 8,
        fontSize: 13,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <strong style={{ color }}>{title}</strong>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {t("sideTotals", {
          count: integer.format(count),
          size: btc.format(size),
        })}
      </span>
    </div>
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          {header(
            "var(--success-color)",
            t("buysTape"),
            totals.buys,
            totals.bought,
          )}
          <TimeAndSales
            ref={buyTapeRef}
            height={300}
            aggregate
            largeTradeThreshold={1}
            pricePrecision={1}
            sizePrecision={4}
            ariaLabel={t("buysAria")}
          />
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {header(
            "var(--danger-color)",
            t("sellsTape"),
            totals.sells,
            totals.sold,
          )}
          <TimeAndSales
            ref={sellTapeRef}
            height={300}
            aggregate
            largeTradeThreshold={1}
            pricePrecision={1}
            sizePrecision={4}
            ariaLabel={t("sellsAria")}
          />
        </div>
      </div>
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("netFlow", { value: delta.format(totals.bought - totals.sold) })}
      </span>
    </div>
  );
}
`})))()}var et,tt,nt;function rt(){return(rt=e((()=>{ae(),O(),ce(),ue(),pe(),z(),_e(),be(),Se(),Ee(),Oe(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),Je(),Ye(),Ze(),$e(),t(),ee(),y(),et=n(),tt=_(Object.assign({"./demos/basic.tsx":ne,"./demos/block-alerts.tsx":oe,"./demos/clock.tsx":se,"./demos/compact.tsx":le,"./demos/dark.tsx":de,"./demos/filters.tsx":me,"./demos/large-data.tsx":ge,"./demos/large-trades.tsx":ve,"./demos/live.tsx":xe,"./demos/pressure.tsx":we,"./demos/red-up.tsx":De,"./demos/split.tsx":ke}),Object.assign({"./demos/basic.tsx":je,"./demos/block-alerts.tsx":Ne,"./demos/clock.tsx":Fe,"./demos/compact.tsx":Le,"./demos/dark.tsx":ze,"./demos/filters.tsx":Ve,"./demos/large-data.tsx":Ue,"./demos/large-trades.tsx":Ge,"./demos/live.tsx":qe,"./demos/pressure.tsx":$,"./demos/red-up.tsx":Xe,"./demos/split.tsx":Qe})),nt=()=>(0,et.jsx)(v,{id:`time-and-sales`,demos:tt})})))()}rt();export{nt as default};