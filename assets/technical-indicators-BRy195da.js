import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Tag-D6SUzaZT.js";import{n as ee,t as te}from"./Switch-CHbzff3y.js";import{n as ne,t as re}from"./CodeBlock-DoGcue8j.js";import{c as ie,i as ae,o as oe,r as p}from"./DemoBlock-CrPVu7R1.js";import{_ as se,a as ce,c as le,d as ue,f as m,g as de,l as fe,m as h,o as pe,r as me,s as he,u as ge}from"./angular-preview-CPOhk_AS.js";import{l as _e,n as ve,t as ye,u as be}from"./DocPage-BdPOW9nQ.js";import{a as g,c as _,l as v,n as y,r as xe,s as b,t as x}from"./data-BxaEtaE9.js";function Se(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),t=(0,Ce.useMemo)(()=>[{id:`long`,kind:`stopLoss`,price:Ee-2*De,title:e(`longStop`)},{id:`short`,kind:`stopLoss`,side:`sell`,price:Ee+2*De,title:e(`shortStop`),color:`#a855f7`}],[e]);return(0,we.jsx)(_,{bars:S,timeframe:`1H`,symbol:e(`gold`),indicators:[{type:`atr`,period:14,height:120}],priceLines:t,ariaLabel:e(`atrAria`),height:440})}var Ce,we,S,Te,Ee,De;function Oe(){return(Oe=e((()=>{Ce=t(),i(),v(),h(),b(),we=n(),S=g({count:360,timeframe:y,seed:61,price:2330,volatility:.0035,volume:12e3}),Te=pe(S.map(e=>e.high),S.map(e=>e.low),S.map(e=>e.close),14),Ee=S[S.length-1].close,De=Te[Te.length-1]})))()}function ke(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Ae.useState)(`2`);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,C.jsx)(s,{"aria-label":e(`multiplier`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[`1.5`,`2`,`2.5`].map(t=>(0,C.jsx)(u,{value:t,label:e(`deviations`,{value:t})},t))}),(0,C.jsx)(_,{bars:je,timeframe:`1H`,symbol:e(`eth`),indicators:[{type:`boll`,period:20,multiplier:Number(t)}],ariaLabel:e(`bollAria`),height:380})]})}var Ae,C,je;function Me(){return(Me=e((()=>{Ae=t(),i(),c(),l(),v(),b(),C=n(),je=g({count:500,timeframe:y,seed:14,price:3150,volatility:.006,volume:800})})))()}function Ne(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Pe.useState)(`keltner`);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,w.jsx)(s,{label:e(`channel`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:Object.keys(Ie).map(t=>(0,w.jsx)(u,{value:t,label:e(`channels.${t}`)},t))}),(0,w.jsx)(_,{bars:Fe,timeframe:`1H`,symbol:e(`eurusd`),indicators:[Ie[t]],ariaLabel:e(`channelsAria`),height:420})]})}var Pe,w,Fe,Ie;function Le(){return(Le=e((()=>{Pe=t(),i(),c(),l(),v(),b(),w=n(),Fe=g({count:360,timeframe:y,seed:1717,price:1.0842,volatility:.0012,volume:9e3},5),Ie={keltner:{type:`keltner`,period:20,multiplier:2},donchian:{type:`donchian`,period:20},boll:{type:`boll`,period:20}}})))()}function Re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=t.language,[i,a]=(0,ze.useState)(`all`),o=(0,ze.useMemo)(()=>k.filter(e=>i===`all`||e.kind===i).flatMap(({kind:e,from:t,to:n})=>{let r=t=>e===`bullish`?E[t].low:E[t].high,i={type:`trendLine`,color:He[e],lineWidth:2,locked:!0};return[{...i,id:`price-${t}`,pane:`price`,points:[{time:E[t].time,price:r(t)},{time:E[n].time,price:r(n)}]},{...i,id:`rsi-${t}`,pane:`rsi:14`,points:[{time:E[t].time,price:D[t]},{time:E[n].time,price:D[n]}]}]}),[i]),c=new Intl.NumberFormat(n),l=new Intl.DateTimeFormat(n,{dateStyle:`medium`}),d=e=>c.format(k.filter(t=>t.kind===e).length),f=k.filter(e=>i===`all`||e.kind===i).at(-1);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsxs)(s,{"aria-label":e(`divergenceKind`),direction:`horizontal`,value:i,onChange:e=>a(e),children:[(0,T.jsx)(u,{value:`all`,label:e(`divergenceKinds.all`)}),(0,T.jsx)(u,{value:`bullish`,label:e(`divergenceKinds.bullish`)}),(0,T.jsx)(u,{value:`bearish`,label:e(`divergenceKinds.bearish`)})]}),(0,T.jsx)(_,{bars:E,timeframe:`4H`,symbol:e(`sol`),indicators:[{type:`rsi`,id:`rsi:14`,period:14,height:120}],drawings:o,ariaLabel:e(`divergenceAria`),height:460}),(0,T.jsxs)(`span`,{style:{color:`var(--text-secondary-color)`,fontSize:13},children:[e(`divergenceSummary`,{bullish:d(`bullish`),bearish:d(`bearish`)}),f&&` ${e(`divergenceLatest`,{kind:e(`divergenceKinds.${f.kind}`),date:l.format(E[f.to].time)})}`]})]})}var ze,T,E,D,O,Be,k,Ve,He;function Ue(){return(Ue=e((()=>{ze=t(),i(),c(),l(),v(),h(),b(),T=n(),E=g({count:400,timeframe:4*y,seed:311,price:142,volatility:.012,volume:1e5}),D=fe(E.map(e=>e.close),14),O=5,Be=e=>{let t=[];for(let n=O;n<E.length-O;n++){let r=Number.isFinite(D[n]);for(let t=n-O;t<=n+O&&r;t++)t!==n&&(e===`high`?E[t].high>=E[n].high:E[t].low<=E[n].low)&&(r=!1);r&&t.push(n)}return t},k=[],Ve=(e,t)=>{for(let n=1;n<e.length;n++){let[r,i]=[e[n-1],e[n]];if(i-r>40)continue;let a=t===`bullish`?E[i].low<E[r].low:E[i].high>E[r].high,o=t===`bullish`?D[i]>D[r]:D[i]<D[r];a&&o&&k.push({kind:t,from:r,to:i})}},Ve(Be(`low`),`bullish`),Ve(Be(`high`),`bearish`),k.sort((e,t)=>e.to-t.to),He={bullish:`var(--success-color)`,bearish:`var(--danger-color)`}})))()}function We(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,Ge.useMemo)(()=>{let n=new Intl.NumberFormat(t.language,{maximumFractionDigits:1}),r=Ye[j]>=25?`strong`:`weak`,i=qe[j]>=Je[j]?`up`:`down`;return e(`dmiSummary.${r}`,{adx:n.format(Ye[j]),direction:e(`directions.${i}`)})},[e,t.language]);return(0,Ke.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Ke.jsx)(_,{bars:A,timeframe:`1D`,symbol:e(`msft`),indicators:[{type:`dmi`,height:130}],ariaLabel:e(`dmiAria`),height:440}),(0,Ke.jsx)(`span`,{role:`status`,style:{fontSize:13,color:`var(--text-secondary-color)`},children:n})]})}var Ge,Ke,A,qe,Je,Ye,j;function Xe(){return(Xe=e((()=>{Ge=t(),i(),v(),h(),b(),Ke=n(),A=g({count:300,timeframe:x,seed:3030,price:412,volatility:.017,volume:21e6,market:`stock`}),{plus:qe,minus:Je,adx:Ye}=ue(A.map(e=>e.high),A.map(e=>e.low),A.map(e=>e.close)),j=A.length-1})))()}function Ze(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Qe.useState)(`heikinAshi`);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsxs)(s,{"aria-label":e(`chartStyle`),direction:`horizontal`,value:t,onChange:e=>n(e),children:[(0,M.jsx)(u,{value:`heikinAshi`,label:e(`heikinAshi`)}),(0,M.jsx)(u,{value:`candles`,label:e(`candles`)})]}),(0,M.jsx)(_,{bars:N,timeframe:`4H`,symbol:e(`ada`),chartStyle:t,indicators:[{type:`ema`,period:34}],ariaLabel:e(`haAria`),height:400}),(0,M.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e($e?`haRising`:`haFalling`,{count:I})})]})}var Qe,M,N,P,F,$e,I;function et(){return(et=e((()=>{for(Qe=t(),i(),c(),l(),v(),h(),b(),M=n(),N=g({count:300,timeframe:4*y,seed:90,price:.62,volatility:.011,volume:2e7},4),P=ge({open:N.map(e=>e.open),high:N.map(e=>e.high),low:N.map(e=>e.low),close:N.map(e=>e.close)}),F=P.close.length,$e=P.close[F-1]>=P.open[F-1],I=0;I<F&&P.close[F-1-I]>=P.open[F-1-I]===$e;)I++})))()}function tt(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,nt.useState)(!0);return(0,rt.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,rt.jsx)(te,{size:`small`,checked:t,onChange:n,label:e(`cloud`)}),(0,rt.jsx)(_,{bars:it,timeframe:`1D`,symbol:e(`nikkei`),indicators:[{type:`ichimoku`,cloud:t}],rightOffset:30,barSpacing:6,precision:0,ariaLabel:e(`ichimokuAria`),height:440})]})}var nt,rt,it;function at(){return(at=e((()=>{nt=t(),i(),ee(),v(),b(),rt=n(),it=g({count:320,timeframe:x,seed:808,price:38e3,volatility:.022,volume:24e3})})))()}function ot(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,st.jsx)(_,{bars:ct,timeframe:`1D`,symbol:e(`catl`),colorConvention:`redUp`,utcOffset:480,indicators:[{type:`ma`,period:5},{type:`ma`,period:20},{type:`kdj`,period:9,kPeriod:3,dPeriod:3,height:150}],barSpacing:7,ariaLabel:e(`kdjAria`),height:440})}var st,ct;function lt(){return(lt=e((()=>{i(),v(),b(),st=n(),ct=g({count:240,timeframe:x,seed:300750,price:236,volatility:.022,volume:4e6,market:`stock`})})))()}function ut(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,dt.jsx)(_,{bars:ft,timeframe:`1D`,symbol:e(`btc`),indicators:[{type:`ema`,period:12,color:`#0ea5e9`},{type:`ema`,period:26,color:`#f59e0b`},{type:`macd`,fast:12,slow:26,signal:9,height:150}],barSpacing:6,ariaLabel:e(`macdAria`),height:460})}var dt,ft;function pt(){return(pt=e((()=>{i(),v(),b(),dt=n(),ft=g({count:300,timeframe:x,seed:36,price:58e3,volatility:.024,volume:3e4})})))()}function mt(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,ht.useState)(`20`),i=Number(t);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsx)(s,{"aria-label":e(`period`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[`10`,`20`,`50`].map(t=>(0,L.jsx)(u,{value:t,label:e(`periodValue`,{period:t})},t))}),(0,L.jsx)(_,{bars:gt,timeframe:`1D`,symbol:e(`msft`),indicators:[{type:`ma`,period:i,color:`#f59e0b`},{type:`ema`,period:i,color:`#a855f7`},{type:`wma`,period:i,color:`#0ea5e9`}],barSpacing:6,ariaLabel:e(`maAria`),height:380})]})}var ht,L,gt;function _t(){return(_t=e((()=>{ht=t(),i(),c(),l(),v(),b(),L=n(),gt=g({count:400,timeframe:x,seed:8,price:412,volatility:.015,volume:2e7,market:`stock`})})))()}function vt(e,t){let n=de(B,e),r=m(xt(n),z),i=new Float64Array(B.length).fill(NaN),a=-1;return B.forEach((e,o)=>{for(;a+1<n.length&&n[a+1].time+t<=e.time+36e5;)a++;a>=0&&(i[o]=r[a])}),i}function yt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=t.language,[i,a]=(0,bt.useState)(null),o=(0,bt.useMemo)(()=>[`4H`,`1D`].map(t=>({id:t,name:e(`emaOn`,{period:z,frame:t}),color:Ct[t],data:B.flatMap((e,n)=>Number.isNaN(V[t][n])?[]:[{time:e.time,value:V[t][n]}])})),[e]),s=i!==null&&i>=0&&i<B.length?i:B.length-1,c=B[s].close,l=St.map(e=>{let t=V[e][s];return{frame:e,value:t,above:Number.isNaN(t)?null:c>t}}),u=l.every(e=>e.above===!0)?`alignedUp`:l.every(e=>e.above===!1)?`alignedDown`:`mixed`,d=new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}),ee=new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`});return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,R.jsx)(_,{bars:B,timeframe:`1H`,symbol:e(`eth`),indicators:[{type:`ema`,period:z,color:Ct[`1H`],lineWidth:1.5}],compare:o,onCrosshairMove:e=>a(e?.bar?e.index:null),ariaLabel:e(`mtfAria`),height:420}),(0,R.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8,fontSize:13,fontVariantNumeric:`tabular-nums`},children:[(0,R.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`mtfAt`,{time:ee.format(B[s].time),close:d.format(c)})}),l.map(t=>(0,R.jsx)(f,{color:t.above===null?`neutral`:t.above?`success`:`danger`,children:e(t.above===null?`mtfWarmup`:t.above?`mtfAbove`:`mtfBelow`,{frame:t.frame,value:Number.isNaN(t.value)?``:d.format(t.value)})},t.frame)),(0,R.jsx)(`strong`,{children:e(`mtfVerdict.${u}`)})]})]})}var bt,R,z,B,xt,V,St,Ct;function wt(){return(wt=e((()=>{bt=t(),i(),d(),v(),h(),b(),R=n(),z=20,B=g({count:1440,timeframe:y,seed:2420,price:3350,volatility:.006,volume:2400}),xt=e=>e.map(e=>e.close),V={"1H":m(xt(B),z),"4H":vt(`4H`,4*y),"1D":vt(`1D`,x)},St=Object.keys(V),Ct={"1H":`#0ea5e9`,"4H":`#f59e0b`,"1D":`#a855f7`}})))()}function Tt(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,Et.jsx)(_,{bars:Dt,timeframe:`1D`,symbol:e(`aapl`),indicators:[{type:`volume`,height:80},{type:`obv`,maPeriod:20,height:120}],ariaLabel:e(`obvAria`),height:460})}var Et,Dt;function Ot(){return(Ot=e((()=>{i(),v(),b(),Et=n(),Dt=g({count:260,timeframe:x,seed:6060,price:182,volatility:.016,volume:54e6,market:`stock`})})))()}function kt(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,At.useState)([`stochRsi`,`cci`]),i=(0,At.useMemo)(()=>Object.keys(Mt).filter(e=>t.includes(e)).map(e=>Mt[e]),[t]),a=e=>n(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,H.jsx)(`div`,{role:`group`,"aria-label":e(`oscillators`),style:{display:`flex`,flexWrap:`wrap`,gap:6},children:Object.keys(Mt).map(n=>(0,H.jsx)(o,{size:`small`,variant:`outline`,active:t.includes(n),"aria-pressed":t.includes(n),onClick:()=>a(n),children:e(`oscillatorNames.${n}`)},n))}),(0,H.jsx)(_,{bars:jt,timeframe:`4H`,symbol:e(`btc`),indicators:i,precision:0,ariaLabel:e(`oscillatorsAria`),height:260+i.length*100})]})}var At,H,jt,Mt;function Nt(){return(Nt=e((()=>{At=t(),i(),a(),v(),b(),H=n(),jt=g({count:400,timeframe:4*y,seed:5151,price:63800,volatility:.008,volume:900}),Mt={stochRsi:{type:`stochRsi`,height:100},cci:{type:`cci`,height:100},williamsR:{type:`williamsR`,height:100},mfi:{type:`mfi`,height:100}}})))()}function Pt(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Ft.useState)(`70-30`),[i,a]=Lt[t];return(0,U.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,U.jsx)(s,{"aria-label":e(`bands`),direction:`horizontal`,value:t,onChange:e=>n(e),children:Object.keys(Lt).map(t=>(0,U.jsx)(u,{value:t,label:e(`bandValues.${t}`)},t))}),(0,U.jsx)(_,{bars:It,timeframe:`4H`,symbol:e(`sol`),indicators:[{type:`rsi`,period:14,overbought:i,oversold:a,height:140},{type:`rsi`,period:6,overbought:i,oversold:a,color:`#f59e0b`,height:100}],ariaLabel:e(`rsiAria`),height:460})]})}var Ft,U,It,Lt;function Rt(){return(Rt=e((()=>{Ft=t(),i(),c(),l(),v(),b(),U=n(),It=g({count:400,timeframe:4*y,seed:44,price:142,volatility:.012,volume:5e5}),Lt={"70-30":[70,30],"80-20":[80,20]}})))()}function zt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=t.language,[i,a]=(0,Bt.useState)(`aapl`),s=Ht.find(e=>e.id===i)??Ht[0],{columns:c,percent:l}=(0,Bt.useMemo)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,maximumFractionDigits:1,signDisplay:`exceptZero`}),r=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,maximumFractionDigits:1}),s=new Intl.NumberFormat(n,{maximumFractionDigits:1}),c=new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}),l=new Intl.NumberFormat(n,{maximumSignificantDigits:3,signDisplay:`exceptZero`}),u=e=>e>0?`var(--success-color)`:`var(--danger-color)`;return{columns:[{key:`symbol`,header:e(`screenSymbol`),render:t=>(0,W.jsx)(o,{size:`small`,variant:t.id===i?`solid`:`ghost`,"aria-pressed":t.id===i,onClick:()=>a(t.id),children:e(t.id)})},{key:`close`,header:e(`screenClose`),align:`right`,render:e=>c.format(e.close)},{key:`change`,header:e(`screenChange`),align:`right`,sortable:(e,t)=>e.change-t.change,render:e=>(0,W.jsx)(`span`,{style:{color:u(e.change)},children:t.format(e.change)})},{key:`rsi`,header:e(`screenRsi`),align:`right`,sortable:(e,t)=>e.rsi-t.rsi,render:e=>s.format(e.rsi)},{key:`histogram`,header:e(`screenMacd`),align:`right`,sortable:(e,t)=>e.histogram/e.close-t.histogram/t.close,render:e=>(0,W.jsx)(`span`,{style:{color:u(e.histogram)},children:l.format(e.histogram)})},{key:`atr`,header:e(`screenAtr`),align:`right`,sortable:(e,t)=>e.atrPercent-t.atrPercent,render:e=>r.format(e.atrPercent)},{key:`sma`,header:e(`screenSma`),align:`right`,sortable:(e,t)=>e.fromSma-t.fromSma,render:e=>(0,W.jsx)(`span`,{style:{color:u(e.fromSma)},children:t.format(e.fromSma)})},{key:`signal`,header:e(`screenSignal`),sortable:(e,t)=>e.signal.localeCompare(t.signal),render:t=>(0,W.jsx)(f,{color:Ut[t.signal],size:`small`,children:e(`screenSignals.${t.signal}`)})}],percent:t}},[n,i,e]);return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsx)(oe,{"aria-label":e(`screenTable`),columns:c,data:Ht,rowKey:e=>e.id,size:`small`,scroll:{x:`max-content`}}),(0,W.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`,fontSize:13},children:e(`screenShowing`,{name:e(s.id),signal:e(`screenSignals.${s.signal}`),distance:l.format(s.fromSma)})}),(0,W.jsx)(_,{bars:s.bars,timeframe:`1D`,symbol:e(s.id),indicators:[{type:`ma`,period:50,color:`#f59e0b`},{type:`rsi`,period:14,height:90},{type:`macd`,height:90}],ariaLabel:e(`screenChartAria`,{name:e(s.id)}),height:460})]})}var Bt,W,Vt,G,Ht,Ut;function Wt(){return(Wt=e((()=>{Bt=t(),i(),a(),ie(),d(),v(),h(),b(),W=n(),Vt=[[`aapl`,507,228,.014,`stock`],[`msft`,552,415,.012,`stock`],[`nvda`,512,138,.026,`stock`],[`xom`,516,118,.011,`stock`],[`btc`,502,64e3,.028,`crypto`],[`eth`,500,3350,.034,`crypto`]],G=e=>e[e.length-1],Ht=Vt.map(([e,t,n,r,i])=>{let a=g({count:220,timeframe:x,seed:t,price:n,volatility:r,volume:1e6,market:i}),o=a.map(e=>e.close),s=a.map(e=>e.high),c=a.map(e=>e.low),l=o[o.length-1],u=G(fe(o,14)),d=G(se(o).histogram),f=l/G(le(o,50))-1,ee=u>=70?`overbought`:u<=30?`oversold`:d>0&&f>0?`uptrend`:d<0&&f<0?`downtrend`:`neutral`;return{id:e,bars:a,close:l,change:l/o[o.length-2]-1,rsi:u,histogram:d,atrPercent:G(pe(s,c,o,14))/l,fromSma:f,signal:ee}}),Ut={overbought:`warning`,oversold:`info`,uptrend:`success`,downtrend:`danger`,neutral:`neutral`}})))()}function Gt(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,Kt.useMemo)(()=>J.map(t=>({time:K[t.index].time,side:t.side,text:e(t.side===`buy`?`buy`:`sell`)})),[e]),i=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`});return(0,qt.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,qt.jsx)(_,{bars:K,timeframe:`1H`,symbol:e(`btc`),indicators:[{type:`ema`,period:9,color:`#0ea5e9`},{type:`ema`,period:21,color:`#f59e0b`},{type:`rsi`,period:14,height:100}],markers:n,ariaLabel:e(`signalsAria`),height:460}),(0,qt.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`,fontVariantNumeric:`tabular-nums`},children:e(`signalsSummary`,{trades:Zt.length,wins:Qt,result:i.format($t)})})]})}var Kt,qt,K,q,Jt,Yt,Xt,J,Zt,Qt,$t;function en(){return(en=e((()=>{Kt=t(),i(),v(),h(),b(),qt=n(),K=g({count:600,timeframe:y,seed:128,price:64800,volatility:.0045,volume:300}),q=K.map(e=>e.close),Jt=m(q,9),Yt=m(q,21),Xt=fe(q,14),J=[];for(let e=1;e<K.length;e++){let t=Jt[e]>Yt[e],n=Jt[e-1]>Yt[e-1];if(Number.isNaN(Yt[e-1])||t===n)continue;let r=J.length>0&&J[J.length-1].side===`buy`;t&&!r&&Xt[e]>50&&J.push({index:e,side:`buy`,price:q[e]}),!t&&r&&J.push({index:e,side:`sell`,price:q[e]})}Zt=J.filter(e=>e.side===`sell`).map(e=>{let t=J[J.indexOf(e)-1];return{buy:t,sell:e,result:e.price/t.price-1}}),Qt=Zt.filter(e=>e.result>0).length,$t=Zt.reduce((e,t)=>e*(1+t.result),1)-1})))()}function tn(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),[t,n]=(0,Y.useState)(3),[i,a]=(0,Y.useState)(!1),o=(0,Y.useMemo)(()=>{let{direction:n}=he(nn,rn,an,10,t),r=[];for(let t=1;t<Z.length;t++)n[t-1]===-1&&n[t]===1&&r.push({time:Z[t].time,side:`buy`,text:e(`buy`)}),n[t-1]===1&&n[t]===-1&&r.push({time:Z[t].time,side:`sell`,text:e(`sell`)});return r},[t,e]),c=(0,Y.useMemo)(()=>[{type:`supertrend`,multiplier:t},...i?[{type:`psar`}]:[]],[t,i]);return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:20,fontSize:13},children:[(0,X.jsx)(s,{label:e(`bandDistance`),direction:`horizontal`,value:String(t),onChange:e=>n(Number(e)),children:on.map(t=>(0,X.jsx)(u,{value:String(t),label:e(`atrs`,{value:t})},t))}),(0,X.jsx)(te,{size:`small`,checked:i,onChange:a,label:e(`parabolicSar`)}),(0,X.jsx)(`span`,{role:`status`,style:{marginInlineStart:`auto`,color:`var(--text-secondary-color)`},children:e(`flips`,{count:o.length})})]}),(0,X.jsx)(_,{bars:Z,timeframe:`4H`,symbol:e(`sol`),indicators:c,markers:o,ariaLabel:e(`supertrendAria`),height:440})]})}var Y,X,Z,nn,rn,an,on;function sn(){return(sn=e((()=>{Y=t(),i(),c(),l(),ee(),v(),h(),b(),X=n(),Z=g({count:420,timeframe:4*y,seed:4242,price:142,volatility:.011,volume:6e4}),nn=Z.map(e=>e.high),rn=Z.map(e=>e.low),an=Z.map(e=>e.close),on=[2,3,4]})))()}function cn(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.technical-indicators.data`}),n=(0,ln.useRef)(null),i=(0,ln.useRef)(null);return(0,ln.useEffect)(()=>{if(!n.current)return;let r=me(n.current,{bars:Q,timeframe:`1D`,symbol:e(`xom`),indicators:[{type:`ma`,period:50},{type:`volume`,maPeriod:20}],locale:t.language,ariaLabel:e(`vanillaAria`)}),a=r.on(`crosshairMove`,n=>{let r=n?.bar?n.index:Q.length-1,a=Q[r].close/dn[r]-1;i.current&&(i.current.textContent=Number.isNaN(a)?e(`vanillaWarmup`):e(a>=0?`vanillaAbove`:`vanillaBelow`,{value:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}).format(Math.abs(a))}))});return()=>{a(),r.destroy()}},[e,t.language]),(0,un.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,un.jsx)(`div`,{ref:n,style:{height:380}}),(0,un.jsx)(`span`,{ref:i,role:`status`,style:{color:`var(--text-secondary-color)`}})]})}var ln,un,Q,dn;function fn(){return(fn=e((()=>{ln=t(),i(),ce(),h(),b(),un=n(),Q=g({count:250,timeframe:x,seed:4,price:96,volatility:.016,volume:8e6,market:`stock`}),dn=le(Q.map(e=>e.close),50)})))()}function pn(){let{t:e}=r(`common`,{keyPrefix:`docs.technical-indicators.data`});return(0,mn.jsx)(_,{bars:hn,timeframe:`5m`,symbol:e(`nvda`),utcOffset:0,indicators:[{type:`vwap`,reset:`day`},{type:`volume`,height:90}],barSpacing:5,ariaLabel:e(`vwapAria`),height:420})}var mn,hn;function gn(){return(gn=e((()=>{i(),v(),b(),mn=n(),hn=g({count:390,timeframe:5*xe,seed:21,price:188,volatility:.0022,volume:9e4,market:`stock`,start:Date.UTC(2025,2,10,9,30)})})))()}var _n;function vn(){return(vn=e((()=>{_n=`import { useMemo } from "react";
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
`})))()}var yn;function bn(){return(bn=e((()=>{yn=`import { useState } from "react";
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
`})))()}var xn;function Sn(){return(Sn=e((()=>{xn=`import { useState } from "react";
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
`})))()}var Cn;function wn(){return(wn=e((()=>{Cn=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingDrawing } from "minerva-design/charts";
import { rsi } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

type Kind = "bullish" | "bearish";
type Filter = "all" | Kind;

const bars = generateBars({
  count: 400,
  timeframe: 4 * HOUR,
  seed: 311,
  price: 142,
  volatility: 0.012,
  volume: 1e5,
});
const strength = rsi(
  bars.map((bar) => bar.close),
  14,
);

/** Swing points: the highest high (lowest low) of the 5 bars on each side */
const WING = 5;
const swings = (kind: "high" | "low") => {
  const found: number[] = [];
  for (let i = WING; i < bars.length - WING; i++) {
    let swing = Number.isFinite(strength[i]);
    for (let j = i - WING; j <= i + WING && swing; j++)
      if (
        j !== i &&
        (kind === "high"
          ? bars[j].high >= bars[i].high
          : bars[j].low <= bars[i].low)
      )
        swing = false;
    if (swing) found.push(i);
  }
  return found;
};

interface Divergence {
  kind: Kind;
  from: number;
  to: number;
}

// regular divergences between two neighbouring swings at most 40 bars
// apart: a lower low with a higher RSI low (bullish), a higher high with a
// lower RSI high (bearish)
const DIVERGENCES: Divergence[] = [];
const pairs = (list: number[], kind: Kind) => {
  for (let k = 1; k < list.length; k++) {
    const [from, to] = [list[k - 1], list[k]];
    if (to - from > 40) continue;
    const priceDiverges =
      kind === "bullish"
        ? bars[to].low < bars[from].low
        : bars[to].high > bars[from].high;
    const rsiDiverges =
      kind === "bullish"
        ? strength[to] > strength[from]
        : strength[to] < strength[from];
    if (priceDiverges && rsiDiverges) DIVERGENCES.push({ kind, from, to });
  }
};
pairs(swings("low"), "bullish");
pairs(swings("high"), "bearish");
DIVERGENCES.sort((a, b) => a.to - b.to);

const COLORS: Record<Kind, string> = {
  bullish: "var(--success-color)",
  bearish: "var(--danger-color)",
};

export default function DivergenceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [filter, setFilter] = useState<Filter>("all");

  // each divergence is a pair of locked trend lines: one on the price
  // pane, one on the RSI pane (its indicator id)
  const drawings = useMemo(
    (): TradingDrawing[] =>
      DIVERGENCES.filter(
        (divergence) => filter === "all" || divergence.kind === filter,
      ).flatMap(({ kind, from, to }) => {
        const price = (i: number) =>
          kind === "bullish" ? bars[i].low : bars[i].high;
        const style = {
          type: "trendLine" as const,
          color: COLORS[kind],
          lineWidth: 2,
          locked: true,
        };
        return [
          {
            ...style,
            id: \`price-\${from}\`,
            pane: "price",
            points: [
              { time: bars[from].time, price: price(from) },
              { time: bars[to].time, price: price(to) },
            ],
          },
          {
            ...style,
            id: \`rsi-\${from}\`,
            pane: "rsi:14",
            points: [
              { time: bars[from].time, price: strength[from] },
              { time: bars[to].time, price: strength[to] },
            ],
          },
        ];
      }),
    [filter],
  );

  const integer = new Intl.NumberFormat(locale);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const count = (kind: Kind) =>
    integer.format(DIVERGENCES.filter((d) => d.kind === kind).length);
  const latest = DIVERGENCES.filter(
    (divergence) => filter === "all" || divergence.kind === filter,
  ).at(-1);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("divergenceKind")}
        direction="horizontal"
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
      >
        <Radio value="all" label={t("divergenceKinds.all")} />
        <Radio value="bullish" label={t("divergenceKinds.bullish")} />
        <Radio value="bearish" label={t("divergenceKinds.bearish")} />
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("sol")}
        indicators={[{ type: "rsi", id: "rsi:14", period: 14, height: 120 }]}
        drawings={drawings}
        ariaLabel={t("divergenceAria")}
        height={460}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        {t("divergenceSummary", {
          bullish: count("bullish"),
          bearish: count("bearish"),
        })}
        {latest &&
          \` \${t("divergenceLatest", {
            kind: t(\`divergenceKinds.\${latest.kind}\`),
            date: date.format(bars[latest.to].time),
          })}\`}
      </span>
    </div>
  );
}
`})))()}var Tn;function En(){return(En=e((()=>{Tn=`import { useMemo } from "react";
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
`})))()}var Dn;function On(){return(On=e((()=>{Dn=`import { useState } from "react";
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
`})))()}var kn;function An(){return(An=e((()=>{kn=`import { useState } from "react";
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
`})))()}var jn;function Mn(){return(Mn=e((()=>{jn=`import { useTranslation } from "react-i18next";
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
`})))()}var Nn;function Pn(){return(Pn=e((()=>{Nn=`import { useTranslation } from "react-i18next";
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
`})))()}var Fn;function In(){return(In=e((()=>{Fn=`import { useState } from "react";
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
`})))()}var Ln;function Rn(){return(Rn=e((()=>{Ln=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingBar,
  type TradingCompareSeries,
} from "minerva-design/charts";
import { ema } from "minerva-design/charts/core";
import { DAY, HOUR, generateBars } from "../../trading-chart/data";

const PERIOD = 20;

// two months of hourly bars
const bars = generateBars({
  count: 1_440,
  timeframe: HOUR,
  seed: 2_420,
  price: 3_350,
  volatility: 0.006,
  volume: 2_400,
});
const closes = (list: readonly TradingBar[]) => list.map((bar) => bar.close);

/**
 * EMA of a higher timeframe, seen from each hourly bar: the value of the
 * last higher bar already closed when the hourly bar closes (no look-ahead,
 * so the line steps once per 4 hours or per day)
 */
function higher(timeframe: "4H" | "1D", duration: number) {
  const coarse = resampleBars(bars, timeframe);
  const average = ema(closes(coarse), PERIOD);
  const values = new Float64Array(bars.length).fill(NaN);
  let j = -1;
  bars.forEach((bar, i) => {
    while (
      j + 1 < coarse.length &&
      coarse[j + 1].time + duration <= bar.time + HOUR
    )
      j++;
    if (j >= 0) values[i] = average[j];
  });
  return values;
}

const LINES = {
  "1H": ema(closes(bars), PERIOD),
  "4H": higher("4H", 4 * HOUR),
  "1D": higher("1D", DAY),
};
type Frame = keyof typeof LINES;
const FRAMES = Object.keys(LINES) as Frame[];
const COLORS: Record<Frame, string> = {
  "1H": "#0ea5e9",
  "4H": "#f59e0b",
  "1D": "#a855f7",
};

export default function MultiTimeframeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<number | null>(null);

  // the higher timeframes are comparison lines on the same price scale
  const compare = useMemo(
    (): TradingCompareSeries[] =>
      (["4H", "1D"] as const).map((frame) => ({
        id: frame,
        name: t("emaOn", { period: PERIOD, frame }),
        color: COLORS[frame],
        data: bars.flatMap((bar, i) =>
          Number.isNaN(LINES[frame][i])
            ? []
            : [{ time: bar.time, value: LINES[frame][i] }],
        ),
      })),
    [t],
  );

  const index =
    hovered !== null && hovered >= 0 && hovered < bars.length
      ? hovered
      : bars.length - 1;
  const close = bars[index].close;
  const sides = FRAMES.map((frame) => {
    const value = LINES[frame][index];
    return {
      frame,
      value,
      above: Number.isNaN(value) ? null : close > value,
    };
  });
  const verdict = sides.every((side) => side.above === true)
    ? "alignedUp"
    : sides.every((side) => side.above === false)
      ? "alignedDown"
      : "mixed";

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const when = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eth")}
        indicators={[
          { type: "ema", period: PERIOD, color: COLORS["1H"], lineWidth: 1.5 },
        ]}
        compare={compare}
        onCrosshairMove={(event) => setHovered(event?.bar ? event.index : null)}
        ariaLabel={t("mtfAria")}
        height={420}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("mtfAt", {
            time: when.format(bars[index].time),
            close: price.format(close),
          })}
        </span>
        {sides.map((side) => (
          <Tag
            key={side.frame}
            color={
              side.above === null
                ? "neutral"
                : side.above
                  ? "success"
                  : "danger"
            }
          >
            {t(
              side.above === null
                ? "mtfWarmup"
                : side.above
                  ? "mtfAbove"
                  : "mtfBelow",
              {
                frame: side.frame,
                value: Number.isNaN(side.value) ? "" : price.format(side.value),
              },
            )}
          </Tag>
        ))}
        <strong>{t(\`mtfVerdict.\${verdict}\`)}</strong>
      </div>
    </div>
  );
}
`})))()}var zn;function Bn(){return(Bn=e((()=>{zn=`import { useTranslation } from "react-i18next";
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
`})))()}var Vn;function Hn(){return(Hn=e((()=>{Vn=`import { useMemo, useState } from "react";
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
`})))()}var Un;function Wn(){return(Wn=e((()=>{Un=`import { useState } from "react";
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
`})))()}var Gn;function Kn(){return(Kn=e((()=>{Gn=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Table, Tag, type TableColumn } from "minerva-design";
import { TradingChart, type TradingBar } from "minerva-design/charts";
import { atr, macd, rsi, sma } from "minerva-design/charts/core";
import { DAY, generateBars } from "../../trading-chart/data";

type SymbolId = "aapl" | "msft" | "nvda" | "xom" | "btc" | "eth";
type Signal = "overbought" | "oversold" | "uptrend" | "downtrend" | "neutral";

interface Row {
  id: SymbolId;
  bars: TradingBar[];
  close: number;
  change: number;
  rsi: number;
  histogram: number;
  atrPercent: number;
  fromSma: number;
  signal: Signal;
}

const UNIVERSE: [SymbolId, number, number, number, "stock" | "crypto"][] = [
  // id, seed, price, daily volatility, market
  ["aapl", 507, 228, 0.014, "stock"],
  ["msft", 552, 415, 0.012, "stock"],
  ["nvda", 512, 138, 0.026, "stock"],
  ["xom", 516, 118, 0.011, "stock"],
  ["btc", 502, 64_000, 0.028, "crypto"],
  ["eth", 500, 3_350, 0.034, "crypto"],
];

const last = (values: Float64Array) => values[values.length - 1];

/** The last values of the indicators, from the pure functions */
const ROWS: Row[] = UNIVERSE.map(([id, seed, price, volatility, market]) => {
  const bars = generateBars({
    count: 220,
    timeframe: DAY,
    seed,
    price,
    volatility,
    volume: 1e6,
    market,
  });
  const close = bars.map((bar) => bar.close);
  const high = bars.map((bar) => bar.high);
  const low = bars.map((bar) => bar.low);
  const now = close[close.length - 1];
  const strength = last(rsi(close, 14));
  const histogram = last(macd(close).histogram);
  const fromSma = now / last(sma(close, 50)) - 1;
  const signal: Signal =
    strength >= 70
      ? "overbought"
      : strength <= 30
        ? "oversold"
        : histogram > 0 && fromSma > 0
          ? "uptrend"
          : histogram < 0 && fromSma < 0
            ? "downtrend"
            : "neutral";
  return {
    id,
    bars,
    close: now,
    change: now / close[close.length - 2] - 1,
    rsi: strength,
    histogram,
    atrPercent: last(atr(high, low, close, 14)) / now,
    fromSma,
    signal,
  };
});

const SIGNAL_COLORS = {
  overbought: "warning",
  oversold: "info",
  uptrend: "success",
  downtrend: "danger",
  neutral: "neutral",
} as const;

export default function ScreenerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<SymbolId>("aapl");
  const row = ROWS.find((item) => item.id === selected) ?? ROWS[0];

  const { columns, percent } = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    const plain = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const one = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    const price = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const signed = new Intl.NumberFormat(locale, {
      maximumSignificantDigits: 3,
      signDisplay: "exceptZero",
    });
    const tone = (value: number) =>
      value > 0 ? "var(--success-color)" : "var(--danger-color)";
    const columns: TableColumn<Row>[] = [
      {
        key: "symbol",
        header: t("screenSymbol"),
        render: (item) => (
          <Button
            size="small"
            variant={item.id === selected ? "solid" : "ghost"}
            aria-pressed={item.id === selected}
            onClick={() => setSelected(item.id)}
          >
            {t(item.id)}
          </Button>
        ),
      },
      {
        key: "close",
        header: t("screenClose"),
        align: "right",
        render: (item) => price.format(item.close),
      },
      {
        key: "change",
        header: t("screenChange"),
        align: "right",
        sortable: (a, b) => a.change - b.change,
        render: (item) => (
          <span style={{ color: tone(item.change) }}>
            {percent.format(item.change)}
          </span>
        ),
      },
      {
        key: "rsi",
        header: t("screenRsi"),
        align: "right",
        sortable: (a, b) => a.rsi - b.rsi,
        render: (item) => one.format(item.rsi),
      },
      {
        key: "histogram",
        header: t("screenMacd"),
        align: "right",
        sortable: (a, b) => a.histogram / a.close - b.histogram / b.close,
        render: (item) => (
          <span style={{ color: tone(item.histogram) }}>
            {signed.format(item.histogram)}
          </span>
        ),
      },
      {
        key: "atr",
        header: t("screenAtr"),
        align: "right",
        sortable: (a, b) => a.atrPercent - b.atrPercent,
        render: (item) => plain.format(item.atrPercent),
      },
      {
        key: "sma",
        header: t("screenSma"),
        align: "right",
        sortable: (a, b) => a.fromSma - b.fromSma,
        render: (item) => (
          <span style={{ color: tone(item.fromSma) }}>
            {percent.format(item.fromSma)}
          </span>
        ),
      },
      {
        key: "signal",
        header: t("screenSignal"),
        sortable: (a, b) => a.signal.localeCompare(b.signal),
        render: (item) => (
          <Tag color={SIGNAL_COLORS[item.signal]} size="small">
            {t(\`screenSignals.\${item.signal}\`)}
          </Tag>
        ),
      },
    ];
    return { columns, percent };
  }, [locale, selected, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Table
        aria-label={t("screenTable")}
        columns={columns}
        data={ROWS}
        rowKey={(item) => item.id}
        size="small"
        scroll={{ x: "max-content" }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {t("screenShowing", {
          name: t(row.id),
          signal: t(\`screenSignals.\${row.signal}\`),
          distance: percent.format(row.fromSma),
        })}
      </output>
      <TradingChart
        bars={row.bars}
        timeframe="1D"
        symbol={t(row.id)}
        indicators={[
          { type: "ma", period: 50, color: "#f59e0b" },
          { type: "rsi", period: 14, height: 90 },
          { type: "macd", height: 90 },
        ]}
        ariaLabel={t("screenChartAria", { name: t(row.id) })}
        height={460}
      />
    </div>
  );
}
`})))()}var qn;function Jn(){return(Jn=e((()=>{qn=`import { useMemo } from "react";
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
`})))()}var Yn;function Xn(){return(Xn=e((()=>{Yn=`import { useMemo, useState } from "react";
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
`})))()}var Zn;function Qn(){return(Qn=e((()=>{Zn=`import { useEffect, useRef } from "react";
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
`})))()}var $n;function er(){return(er=e((()=>{$n=`import { useTranslation } from "react-i18next";
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
`})))()}var $,tr,nr,rr,ir;function ar(){return(ar=e((()=>{Oe(),Me(),Le(),Ue(),Xe(),et(),at(),lt(),pt(),_t(),wt(),Ot(),Nt(),Rt(),Wt(),en(),sn(),fn(),gn(),vn(),bn(),Sn(),wn(),En(),On(),An(),Mn(),Pn(),In(),Rn(),Bn(),Hn(),Wn(),Kn(),Jn(),Xn(),Qn(),er(),t(),i(),ne(),ve(),ae(),be(),$=n(),tr=_e(Object.assign({"./demos/atr.tsx":Se,"./demos/bollinger.tsx":ke,"./demos/channels.tsx":Ne,"./demos/divergence.tsx":Re,"./demos/dmi.tsx":We,"./demos/heikin-ashi.tsx":Ze,"./demos/ichimoku.tsx":tt,"./demos/kdj.tsx":ot,"./demos/macd.tsx":ut,"./demos/moving-averages.tsx":mt,"./demos/multi-timeframe.tsx":yt,"./demos/obv.tsx":Tt,"./demos/oscillators.tsx":kt,"./demos/rsi.tsx":Pt,"./demos/screener.tsx":zt,"./demos/signals.tsx":Gt,"./demos/supertrend.tsx":tn,"./demos/vanilla.tsx":cn,"./demos/vwap.tsx":pn}),Object.assign({"./demos/atr.tsx":_n,"./demos/bollinger.tsx":yn,"./demos/channels.tsx":xn,"./demos/divergence.tsx":Cn,"./demos/dmi.tsx":Tn,"./demos/heikin-ashi.tsx":Dn,"./demos/ichimoku.tsx":kn,"./demos/kdj.tsx":jn,"./demos/macd.tsx":Nn,"./demos/moving-averages.tsx":Fn,"./demos/multi-timeframe.tsx":Ln,"./demos/obv.tsx":zn,"./demos/oscillators.tsx":Vn,"./demos/rsi.tsx":Un,"./demos/screener.tsx":Gn,"./demos/signals.tsx":qn,"./demos/supertrend.tsx":Yn,"./demos/vanilla.tsx":Zn,"./demos/vwap.tsx":$n})),nr=`<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>`,rr=`import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");`,ir=()=>{let{t:e}=r(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`indicators-declarative`,children:[(0,$.jsx)(`h2`,{id:`indicators-declarative`,children:e(`docs.technical-indicators.intro.declarative.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.technical-indicators.intro.declarative.text`)}),(0,$.jsx)(re,{code:nr,language:`tsx`}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.technical-indicators.intro.declarative.ids`)})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`indicators-functions`,children:[(0,$.jsx)(`h2`,{id:`indicators-functions`,children:e(`docs.technical-indicators.intro.functions.title`)}),(0,$.jsx)(`p`,{className:p.prose,children:e(`docs.technical-indicators.intro.functions.text`)}),(0,$.jsx)(re,{code:rr,language:`tsx`})]}),(0,$.jsxs)(`section`,{className:p.section,"aria-labelledby":`indicators-conventions`,children:[(0,$.jsx)(`h2`,{id:`indicators-conventions`,children:e(`docs.technical-indicators.intro.conventions.title`)}),(0,$.jsxs)(`ul`,{className:p.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.averages`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.wilder`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.kdj`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.ichimoku`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.vwap`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.incremental`)}),(0,$.jsx)(`li`,{children:e(`docs.technical-indicators.intro.conventions.zoom`)})]})]})]});return(0,$.jsx)(ye,{id:`technical-indicators`,demos:tr,intro:t})}})))()}ar();export{ir as default};