import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{i as s,n as c,r as l,t as u}from"./Radio-D2wZ9q6z.js";import{l as d,n as f,t as p,u as m}from"./DocPage-CHJwIegD.js";import{_ as h,m as g}from"./charts-JJDQ3gS7.js";function ee(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,[i,a]=(0,_.useState)(`95`),o=(0,_.useMemo)(()=>ne.map(e=>{let t=Math.log(1+e.lift);return{day:e.day,lift:e.lift,low:Math.exp(t-x[i]*e.se)-1,high:Math.exp(t+x[i]*e.se)-1}}),[i]),c=(0,_.useMemo)(()=>{let e;for(let t of o)t.low>0?e??=t.day:e=void 0;return e},[o]),l=(0,_.useMemo)(()=>({percent:new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`}),level:new Intl.NumberFormat(n,{style:`percent`}),day:new Intl.NumberFormat(n)}),[n]),d=l.level.format(Number(i)/100),f=(0,_.useMemo)(()=>[{name:e(`confidenceInterval`,{level:d}),color:`var(--chart-series-1, #4f46e5)`,opacity:.2,lineWidth:0,data:o.map(e=>({x:e.day,y0:e.low,y:e.high}))},{name:e(`lift`),type:`line`,color:`var(--chart-series-1, #4f46e5)`,data:o.map(e=>[e.day,e.lift])}],[e,o,d]),p=(0,_.useMemo)(()=>{let t={type:`line`,axis:`y`,value:0,color:`var(--text-secondary-color)`,label:e(`noDifference`)};return c===void 0?[t]:[t,{type:`rect`,x0:c,color:`var(--success-color)`,opacity:.08,label:e(`significant`),labelPosition:`top-right`}]},[e,c]),m=o[o.length-1];return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,v.jsx)(s,{"aria-label":e(`confidenceLevel`),direction:`horizontal`,value:i,onChange:e=>a(e),children:Object.keys(x).map(e=>(0,v.jsx)(u,{value:e,children:l.level.format(Number(e)/100)},e))}),(0,v.jsx)(h,{series:f,curve:`linear`,annotations:p,tooltip:{mode:`axis`},xAxis:{title:e(`testDay`),format:e=>l.day.format(e)},yAxis:{title:e(`liftOfB`),format:e=>l.percent.format(e)},height:300,ariaLabel:e(`abTestAria`)}),m&&(0,v.jsx)(`output`,{"aria-live":`polite`,children:c===void 0?e(`notSignificant`,{lift:l.percent.format(m.lift),level:d}):e(`significantSince`,{lift:l.percent.format(m.lift),low:l.percent.format(m.low),high:l.percent.format(m.high),level:d,day:l.day.format(c)})})]})}var _,v,y,b,x,S,C,ne;function re(){return(re=e((()=>{_=t(),i(),c(),l(),g(),v=n(),y=28,b=1200,x={80:1.2816,90:1.6449,95:1.96,99:2.5758},S=ee(15),C=()=>S()+S()+S()-1.5,ne=(()=>{let e=0,t=0;return Array.from({length:y},(n,r)=>{e+=Math.round(b*.04+C()*13),t+=Math.round(b*.046+C()*14);let i=b*(r+1),a=t/e-1,o=Math.sqrt(1/e-1/i+1/t-1/i);return{day:r+1,lift:a,se:o}})})()})))()}function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,[i,a]=(0,w.useState)(`3`),o=(0,w.useMemo)(()=>O.filter(e=>Math.abs(e.actual-e.expected)>Number(i)*e.sigma),[i]),c=(0,w.useMemo)(()=>{let t=Number(i);return[{name:e(`expectedBand`,{k:t}),color:`var(--chart-series-1, #4f46e5)`,opacity:.18,lineWidth:0,data:O.map(e=>({x:e.time,y0:e.expected-t*e.sigma,y:e.expected+t*e.sigma}))},{name:e(`measured`),type:`line`,color:`var(--text-color, #1f2937)`,lineWidth:1.25,data:O.map(e=>[e.time,Math.round(e.actual)])},{name:e(`anomalies`),type:`scatter`,color:`var(--danger-color)`,pointSize:8,data:o.map(e=>[e.time,Math.round(e.actual)])}]},[e,i,o]),l=(0,w.useMemo)(()=>({number:new Intl.NumberFormat(n,{notation:`compact`}),date:new Intl.DateTimeFormat(n,{weekday:`short`,hour:`2-digit`,minute:`2-digit`})}),[n]);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsxs)(s,{"aria-label":e(`sensitivity`),direction:`horizontal`,value:i,onChange:e=>a(String(e)),children:[(0,T.jsx)(u,{value:`2`,children:e(`sigmaOption`,{k:2})}),(0,T.jsx)(u,{value:`3`,children:e(`sigmaOption`,{k:3})})]}),(0,T.jsx)(h,{series:c,curve:`linear`,tooltip:{mode:`axis`},xAxis:{type:`time`},yAxis:{title:e(`requestsPerMinute`),format:e=>l.number.format(e)},locale:n,height:320,ariaLabel:e(`anomalyAria`)}),(0,T.jsx)(`output`,{"aria-live":`polite`,children:o.length===0?e(`noAnomaly`):e(`anomalyCount`,{n:o.length,latest:l.date.format(o[o.length-1]?.time??E)})})]})}var w,T,oe,E,se,ce,D,O;function le(){return(le=e((()=>{w=t(),i(),c(),l(),g(),T=n(),oe=36e5,E=new Date(2026,9,19).getTime(),se=168,ce=new Map([[31,.55],[58,-.42],[104,-.6],[105,-.5],[139,.48]]),D=ie(2026),O=Array.from({length:se},(e,t)=>{let n=E+t*oe,r=new Date(n),i=r.getHours(),a=[0,6].includes(r.getDay()),o=Math.max(0,Math.sin((i-7)/24*2*Math.PI)),s=(a?.65:1)*(1200+3400*o**1.5),c=60+s*.05;return{time:n,expected:s,sigma:c,actual:s+(D()+D()+D()-1.5)*2*c+s*(ce.get(t)??0)}})})))()}function ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,[i,a]=(0,k.useState)(N),[s,c]=(0,k.useState)(!1);(0,k.useEffect)(()=>{if(s)return;let e=window.setInterval(()=>{a(e=>{let t=e[e.length-1];return t?[...e.slice(1),M(t)]:e})},j);return()=>window.clearInterval(e)},[s]);let l=(0,k.useMemo)(()=>{let t=e=>pe+e.i*j;return[{name:e(`bidAsk`),color:`var(--chart-series-5, #0ea5e9)`,opacity:.3,lineWidth:1,data:i.map(e=>({x:t(e),y0:e.mid-e.spread/2,y:e.mid+e.spread/2}))},{name:e(`mid`),type:`line`,color:`var(--text-color, #1f2937)`,lineWidth:1.25,data:i.map(e=>[t(e),e.mid])}]},[e,i]),u=(0,k.useMemo)(()=>({price:new Intl.NumberFormat(n,{minimumFractionDigits:5,maximumFractionDigits:5}),bps:new Intl.NumberFormat(n,{maximumFractionDigits:1}),time:new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}),[n]),d=i[i.length-1]??N[0],f=d?d.spread/d.mid*1e4:0,p=f>3;return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:12},children:[(0,A.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(e=>!e),children:e(s?`resume`:`pause`)}),d&&(0,A.jsxs)(`output`,{"aria-live":`off`,style:{fontVariantNumeric:`tabular-nums`},children:[e(`quote`,{bid:u.price.format(d.mid-d.spread/2),ask:u.price.format(d.mid+d.spread/2)}),` · `,(0,A.jsx)(`span`,{style:{color:p?`var(--danger-color)`:`var(--success-color)`},children:e(`spreadBps`,{value:u.bps.format(f)})})]})]}),(0,A.jsx)(h,{series:l,curve:`step`,xAxis:{type:`time`,format:e=>u.time.format(e)},yAxis:{zero:!1,format:e=>u.price.format(e)},tooltip:{mode:`axis`},height:300,ariaLabel:e(`bidAskAria`)})]})}var k,A,j,fe,pe,M,N;function me(){return(me=e((()=>{k=t(),i(),a(),g(),A=n(),j=500,fe=120,pe=new Date(2026,9,30,15,59,0).getTime(),M=e=>{let t=ue(e.i+1),n=e.mid+(t()-.5)*4e-4,r=t()<.04?6e-4+t()*6e-4:0,i=Math.max(8e-5,e.spread*.8+2e-5+r);return{i:e.i+1,mid:n,spread:i}},N=(()=>{let e=[{i:0,mid:1.0842,spread:1e-4}];for(let t=1;t<fe;t++){let t=e[e.length-1];t&&e.push(M(t))}return e})()})))()}function he(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,P.useMemo)(()=>{let t=e=>e.map(e=>({x:e.year,y0:e.low,y:e.high})),n=e=>e.map(e=>[e.year,e.median]);return[{id:`ssp585-range`,name:e(`ssp585Range`),color:`var(--danger-color)`,opacity:.18,lineWidth:0,data:t(H)},{id:`ssp126-range`,name:e(`ssp126Range`),color:`var(--chart-series-5, #0ea5e9)`,opacity:.22,lineWidth:0,data:t(V)},{id:`ssp585`,name:e(`ssp585`),type:`line`,color:`var(--danger-color)`,data:n(H)},{id:`ssp126`,name:e(`ssp126`),type:`line`,color:`var(--chart-series-5, #0ea5e9)`,data:n(V)},{id:`observed`,name:e(`observed`),type:`line`,curve:`linear`,color:`var(--text-color, #1f2937)`,lineWidth:1.25,data:R}]},[e]),a=(0,P.useMemo)(()=>({degrees:new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1,signDisplay:`exceptZero`}),year:new Intl.NumberFormat(n,{useGrouping:!1})}),[n]),o=(0,P.useMemo)(()=>[1.5,2].map(t=>({type:`line`,axis:`y`,value:t,dash:[4,4],color:`var(--warning-color)`,label:e(`parisLimit`,{value:a.degrees.format(t)})})),[e,a]),s=e=>e===void 0?`–`:a.year.format(e),c=Math.max(...V.map(e=>e.median));return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsx)(h,{series:i,annotations:o,tooltip:{mode:`axis`},xAxis:{format:e=>a.year.format(e)},yAxis:{title:e(`warming`),format:e=>a.degrees.format(e)},height:340,ariaLabel:e(`climateAria`)}),(0,F.jsx)(`p`,{style:{margin:0,color:`var(--text-secondary-color)`},children:e(`crossings`,{lowLimit:a.degrees.format(1.5),low:s(U(V,1.5)),peak:a.degrees.format(c),highLimit:a.degrees.format(2),high:s(U(H,2))})})]})}var P,F,I,L,R,z,B,V,H,U;function _e(){return(_e=e((()=>{P=t(),i(),g(),F=n(),I=2024,L=he(1850),R=Array.from({length:75},(e,t)=>[1950+t,.28+.97*(t/74)**1.9+(L()-.5)*.2]),z=1.25,B=(e,t,n)=>Array.from({length:20},(r,i)=>{let a=I+i*4,o=(a-I)/76,s=z+(e-z)*(1-(1-o)**t),c=n*o**.8;return{year:a,median:s,low:s-c*.8,high:s+c}}),V=B(1.8,3.2,.55),H=B(4.4,1.15,1.25),U=(e,t)=>e.find(e=>e.median>=t)?.year})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,W.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0});return t=>e.format(t)},[n]),a=(0,W.useMemo)(()=>[{name:e(`p5p95`),color:`var(--chart-series-5, #0ea5e9)`,opacity:.16,lineWidth:0,format:i,data:G.map(e=>({x:e.x,y0:e.p5,y:e.p95}))},{name:e(`p25p75`),color:`var(--chart-series-5, #0ea5e9)`,opacity:.32,lineWidth:0,format:i,data:G.map(e=>({x:e.x,y0:e.p25,y:e.p75}))},{name:e(`median`),type:`line`,color:`var(--chart-series-5, #0ea5e9)`,format:i,data:G.map(e=>[e.x,e.p50])}],[e,i]);return(0,ye.jsx)(h,{series:a,yAxis:{format:i,zero:!0},height:300,ariaLabel:e(`latencyAria`)})}var W,ye,G;function be(){return(be=e((()=>{W=t(),i(),g(),ye=n(),G=Array.from({length:144},(e,t)=>{let n=t/6,r=Math.exp(-((n-11)**2)/8)+.7*Math.exp(-((n-19)**2)/5),i=42+30*r+2*Math.sin(t/2.3);return{x:new Date(2026,2,12,0,t*10),p5:i*.55,p25:i*.8,p50:i,p75:i*(1.3+.2*r),p95:i*(2+1.4*r)}})})))()}function xe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,K.useMemo)(()=>{let t=q.length-1,n=Array.from({length:13},(e,n)=>{let r=t+n;return{i:r,mean:n===0?q[t]??0:(q[r-12]??0)*1.12,sd:2.4*Math.sqrt(n)}});return[{name:e(`interval95`),color:`var(--chart-series-1, #4f46e5)`,opacity:.14,lineWidth:0,data:n.map(e=>({x:J(e.i),y0:e.mean-1.96*e.sd,y:e.mean+1.96*e.sd}))},{name:e(`interval80`),color:`var(--chart-series-1, #4f46e5)`,opacity:.22,lineWidth:0,data:n.map(e=>({x:J(e.i),y0:e.mean-1.28*e.sd,y:e.mean+1.28*e.sd}))},{name:e(`actual`),type:`line`,color:`var(--text-color, #1f2937)`,data:q.map((e,t)=>[J(t),e])},{name:e(`forecast`),type:`line`,color:`var(--chart-series-1, #4f46e5)`,data:n.map(e=>[J(e.i),e.mean])}]},[e]),a=(0,K.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(Math.round(t)*1e3)},[n]);return(0,Se.jsx)(h,{series:i,curve:`linear`,yAxis:{format:a,title:e(`orders`)},annotations:[{type:`line`,axis:`x`,value:J(q.length-1).getTime(),label:e(`today`)}],height:320,ariaLabel:e(`forecastAria`)})}var K,Se,q,J;function Y(){return(Y=e((()=>{K=t(),i(),g(),Se=n(),q=[41,39,44,47,52,55,53,51,56,60,68,74,49,46,52,55,61,64,62,60,66,71,79,86],J=e=>new Date(2024,e,1)})))()}function Ce(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function we(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,X.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`});return t=>e.format(t)},[n]),a=(0,X.useMemo)(()=>[{name:e(`dayRange`),color:`var(--chart-series-2, #10b981)`,lineWidth:0,opacity:.3,format:i,data:Z.map(e=>({x:e.x,y0:e.low,y:e.high}))},{name:e(`close`),type:`line`,color:`var(--chart-series-2, #10b981)`,format:i,data:Z.map(e=>[e.x,e.close])}],[e,i]);return(0,Te.jsx)(h,{series:a,curve:`linear`,yAxis:{format:i},height:300,ariaLabel:e(`priceAria`)})}var X,Te,Z;function Ee(){return(Ee=e((()=>{X=t(),i(),g(),Te=n(),Z=(()=>{let e=Ce(42),t=[],n=182;for(let r=0;t.length<126;r++){let i=new Date(2026,0,2+r);if(i.getDay()===0||i.getDay()===6)continue;let a=n;n=Math.max(120,a*(1+(e()-.48)*.035));let o=Math.max(a,n)*(1+e()*.012),s=Math.min(a,n)*(1-e()*.012);t.push({x:i,low:s,high:o,close:n})}return t})()})))()}function De(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.range-area-chart.data`}),n=t.language,i=(0,Q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:1});return t=>e.format(t)},[n]),a=(0,Q.useMemo)(()=>[{name:e(`dailyRange`),color:`var(--chart-series-4, #ef4444)`,lineWidth:0,opacity:.45,format:i,data:$.map(e=>({x:e.x,y0:e.low,y:e.high}))},{name:e(`normal`),type:`line`,curve:`smooth`,color:`var(--text-secondary-color, #6b7280)`,lineWidth:1.5,format:i,data:$.map(e=>[e.x,e.normal])}],[e,i]);return(0,ke.jsx)(h,{series:a,curve:`linear`,yAxis:{format:i},height:300,ariaLabel:e(`temperatureAria`)})}var Q,ke,$;function Ae(){return(Ae=e((()=>{Q=t(),i(),g(),ke=n(),$=(()=>{let e=De(7);return Array.from({length:365},(t,n)=>{let r=-Math.cos((n-18)/365*Math.PI*2),i=(e()-.5)*6,a=11.5+r*8.5+i,o=6+r*2.5+e()*3;return{x:new Date(2025,0,n+1),low:a-o/2,high:a+o/2,normal:11.5+r*8.5}})})()})))()}var je;function Me(){return(Me=e((()=>{je=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  RangeAreaChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAYS = 28;
const VISITORS = 1200; // per variant and per day
// two-sided z values of the confidence levels
const Z = { "80": 1.2816, "90": 1.6449, "95": 1.96, "99": 2.5758 } as const;
type Level = keyof typeof Z;

// A checkout test: variant B converts about 15% better than A. Cumulative
// conversions per day, with a roughly normal daily noise
const random = mulberry32(15);
const noise = () => random() + random() + random() - 1.5;
const days = (() => {
  let a = 0;
  let b = 0;
  return Array.from({ length: DAYS }, (_, i) => {
    a += Math.round(VISITORS * 0.04 + noise() * 13);
    b += Math.round(VISITORS * 0.046 + noise() * 14);
    const n = VISITORS * (i + 1);
    // relative lift B / A - 1 and the standard error of its logarithm
    const lift = b / a - 1;
    const se = Math.sqrt(1 / a - 1 / n + 1 / b - 1 / n);
    return { day: i + 1, lift, se };
  });
})();

export default function AbTestDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [level, setLevel] = useState<Level>("95");

  const intervals = useMemo(
    () =>
      days.map((d) => {
        const log = Math.log(1 + d.lift);
        return {
          day: d.day,
          lift: d.lift,
          low: Math.exp(log - Z[level] * d.se) - 1,
          high: Math.exp(log + Z[level] * d.se) - 1,
        };
      }),
    [level],
  );
  // first day from which the whole interval stays above zero
  const significantFrom = useMemo(() => {
    let from: number | undefined;
    for (const d of intervals) {
      if (d.low > 0) from ??= d.day;
      else from = undefined;
    }
    return from;
  }, [intervals]);

  const formats = useMemo(
    () => ({
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      level: new Intl.NumberFormat(locale, { style: "percent" }),
      day: new Intl.NumberFormat(locale),
    }),
    [locale],
  );
  const confidence = formats.level.format(Number(level) / 100);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("confidenceInterval", { level: confidence }),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.2,
        lineWidth: 0,
        data: intervals.map((d) => ({ x: d.day, y0: d.low, y: d.high })),
      },
      {
        name: t("lift"),
        type: "line",
        color: "var(--chart-series-1, #4f46e5)",
        data: intervals.map((d) => [d.day, d.lift] as const),
      },
    ],
    [t, intervals, confidence],
  );
  const annotations = useMemo((): ChartAnnotation[] => {
    const zero: ChartAnnotation = {
      type: "line",
      axis: "y",
      value: 0,
      color: "var(--text-secondary-color)",
      label: t("noDifference"),
    };
    if (significantFrom === undefined) return [zero];
    return [
      zero,
      {
        type: "rect",
        x0: significantFrom,
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("significant"),
        labelPosition: "top-right",
      },
    ];
  }, [t, significantFrom]);

  const last = intervals[intervals.length - 1];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("confidenceLevel")}
        direction="horizontal"
        value={level}
        onChange={(value) => setLevel(value as Level)}
      >
        {(Object.keys(Z) as Level[]).map((key) => (
          <Radio key={key} value={key}>
            {formats.level.format(Number(key) / 100)}
          </Radio>
        ))}
      </RadioGroup>
      <RangeAreaChart
        series={series}
        curve="linear"
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{
          title: t("testDay"),
          format: (x) => formats.day.format(x),
        }}
        yAxis={{
          title: t("liftOfB"),
          format: (y) => formats.percent.format(y),
        }}
        height={300}
        ariaLabel={t("abTestAria")}
      />
      {last && (
        <output aria-live="polite">
          {significantFrom === undefined
            ? t("notSignificant", {
                lift: formats.percent.format(last.lift),
                level: confidence,
              })
            : t("significantSince", {
                lift: formats.percent.format(last.lift),
                low: formats.percent.format(last.low),
                high: formats.percent.format(last.high),
                level: confidence,
                day: formats.day.format(significantFrom),
              })}
        </output>
      )}
    </div>
  );
}
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HOUR = 60 * 60 * 1000;
const START = new Date(2026, 9, 19).getTime(); // a Monday, local midnight
const HOURS = 7 * 24;
// incidents injected into the data: hour index and relative change
const INCIDENTS = new Map([
  [31, 0.55],
  [58, -0.42],
  [104, -0.6],
  [105, -0.5],
  [139, 0.48],
]);

// Requests per minute of an API: a daily cycle (busy afternoons, quiet nights,
// calmer weekends), measured values with noise and a few incidents
const random = mulberry32(2026);
const points = Array.from({ length: HOURS }, (_, i) => {
  const time = START + i * HOUR;
  const date = new Date(time);
  const hour = date.getHours();
  const weekend = [0, 6].includes(date.getDay());
  const daily = Math.max(0, Math.sin(((hour - 7) / 24) * 2 * Math.PI));
  const expected = (weekend ? 0.65 : 1) * (1200 + 3400 * daily ** 1.5);
  const sigma = 60 + expected * 0.05;
  // roughly normal noise: the sum of 3 uniforms has a standard deviation of 0.5
  const noise = (random() + random() + random() - 1.5) * 2;
  const actual = expected + noise * sigma + expected * (INCIDENTS.get(i) ?? 0);
  return { time, expected, sigma, actual };
});

export default function AnomalyBandDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [k, setK] = useState("3");

  const anomalies = useMemo(
    () =>
      points.filter(
        (p) => Math.abs(p.actual - p.expected) > Number(k) * p.sigma,
      ),
    [k],
  );
  const series = useMemo((): ChartSeries[] => {
    const width = Number(k);
    return [
      {
        name: t("expectedBand", { k: width }),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        lineWidth: 0,
        data: points.map((p) => ({
          x: p.time,
          y0: p.expected - width * p.sigma,
          y: p.expected + width * p.sigma,
        })),
      },
      {
        name: t("measured"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: points.map((p) => [p.time, Math.round(p.actual)] as const),
      },
      {
        name: t("anomalies"),
        type: "scatter",
        color: "var(--danger-color)",
        pointSize: 8,
        data: anomalies.map((p) => [p.time, Math.round(p.actual)] as const),
      },
    ];
  }, [t, k, anomalies]);

  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale, { notation: "compact" }),
      date: new Intl.DateTimeFormat(locale, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sensitivity")}
        direction="horizontal"
        value={k}
        onChange={(value) => setK(String(value))}
      >
        <Radio value="2">{t("sigmaOption", { k: 2 })}</Radio>
        <Radio value="3">{t("sigmaOption", { k: 3 })}</Radio>
      </RadioGroup>
      <RangeAreaChart
        series={series}
        curve="linear"
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{
          title: t("requestsPerMinute"),
          format: (y) => formats.number.format(y),
        }}
        locale={locale}
        height={320}
        ariaLabel={t("anomalyAria")}
      />
      <output aria-live="polite">
        {anomalies.length === 0
          ? t("noAnomaly")
          : t("anomalyCount", {
              n: anomalies.length,
              latest: formats.date.format(
                anomalies[anomalies.length - 1]?.time ?? START,
              ),
            })}
      </output>
    </div>
  );
}
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Quote {
  i: number;
  mid: number;
  spread: number;
}
const TICK = 500; // ms between two quotes
const WINDOW = 120; // quotes kept on screen: one minute
const START = new Date(2026, 9, 30, 15, 59, 0).getTime();

// next quote of a currency pair: a random walk of the mid price and a spread
// that widens now and then when liquidity dries up; seeded by the index so
// that the stream is the same on every visit
const next = (quote: Quote): Quote => {
  const random = mulberry32(quote.i + 1);
  const mid = quote.mid + (random() - 0.5) * 0.0004;
  const shock = random() < 0.04 ? 0.0006 + random() * 0.0006 : 0;
  const spread = Math.max(0.00008, quote.spread * 0.8 + 0.00002 + shock);
  return { i: quote.i + 1, mid, spread };
};
const initial = (() => {
  const quotes: Quote[] = [{ i: 0, mid: 1.0842, spread: 0.0001 }];
  for (let k = 1; k < WINDOW; k++) {
    const last = quotes[quotes.length - 1];
    if (last) quotes.push(next(last));
  }
  return quotes;
})();

export default function BidAskDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [quotes, setQuotes] = useState(initial);
  const [paused, setPaused] = useState(false);

  // a new quote every 500 ms, the oldest one drops out; cleared on pause and
  // on unmount
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setQuotes((current) => {
        const last = current[current.length - 1];
        return last ? [...current.slice(1), next(last)] : current;
      });
    }, TICK);
    return () => window.clearInterval(id);
  }, [paused]);

  const series = useMemo((): ChartSeries[] => {
    const time = (q: Quote) => START + q.i * TICK;
    return [
      {
        name: t("bidAsk"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.3,
        lineWidth: 1,
        data: quotes.map((q) => ({
          x: time(q),
          y0: q.mid - q.spread / 2,
          y: q.mid + q.spread / 2,
        })),
      },
      {
        name: t("mid"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: quotes.map((q) => [time(q), q.mid] as const),
      },
    ];
  }, [t, quotes]);
  const formats = useMemo(
    () => ({
      price: new Intl.NumberFormat(locale, {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      }),
      bps: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }),
    [locale],
  );

  const last = quotes[quotes.length - 1] ?? initial[0];
  const spreadBps = last ? (last.spread / last.mid) * 10000 : 0;
  const wide = spreadBps > 3;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? t("resume") : t("pause")}
        </Button>
        {last && (
          <output
            aria-live="off"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {t("quote", {
              bid: formats.price.format(last.mid - last.spread / 2),
              ask: formats.price.format(last.mid + last.spread / 2),
            })}
            {" · "}
            <span
              style={{
                color: wide ? "var(--danger-color)" : "var(--success-color)",
              }}
            >
              {t("spreadBps", { value: formats.bps.format(spreadBps) })}
            </span>
          </output>
        )}
      </div>
      <RangeAreaChart
        series={series}
        curve="step"
        xAxis={{ type: "time", format: (x) => formats.time.format(x) }}
        yAxis={{ zero: false, format: (y) => formats.price.format(y) }}
        tooltip={{ mode: "axis" }}
        height={300}
        ariaLabel={t("bidAskAria")}
      />
    </div>
  );
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RangeAreaChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Global warming above the 1850-1900 average, in °C: an illustrative
// observed record, then two emission scenarios with their likely ranges
const LAST_OBSERVED = 2024;
const random = mulberry32(1850);
const observed = Array.from({ length: LAST_OBSERVED - 1950 + 1 }, (_, i) => {
  const year = 1950 + i;
  const trend = 0.28 + 0.97 * (i / (LAST_OBSERVED - 1950)) ** 1.9;
  return [year, trend + (random() - 0.5) * 0.2] as const;
});
const now = 0.28 + 0.97;

// median and likely range of a scenario: a curve from today's warming to its
// level in 2100, with an uncertainty growing with the horizon
const scenario = (end: number, bend: number, spread: number) =>
  Array.from({ length: (2100 - LAST_OBSERVED) / 4 + 1 }, (_, k) => {
    const year = LAST_OBSERVED + k * 4;
    const f = (year - LAST_OBSERVED) / (2100 - LAST_OBSERVED);
    const median = now + (end - now) * (1 - (1 - f) ** bend);
    const half = spread * f ** 0.8;
    return { year, median, low: median - half * 0.8, high: median + half };
  });
const low = scenario(1.8, 3.2, 0.55);
const high = scenario(4.4, 1.15, 1.25);
const crossing = (path: typeof low, level: number) =>
  path.find((p) => p.median >= level)?.year;

export default function ClimateScenariosDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const band = (path: typeof low) =>
      path.map((p) => ({ x: p.year, y0: p.low, y: p.high }));
    const median = (path: typeof low) =>
      path.map((p) => [p.year, p.median] as const);
    return [
      {
        id: "ssp585-range",
        name: t("ssp585Range"),
        color: "var(--danger-color)",
        opacity: 0.18,
        lineWidth: 0,
        data: band(high),
      },
      {
        id: "ssp126-range",
        name: t("ssp126Range"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.22,
        lineWidth: 0,
        data: band(low),
      },
      {
        id: "ssp585",
        name: t("ssp585"),
        type: "line",
        color: "var(--danger-color)",
        data: median(high),
      },
      {
        id: "ssp126",
        name: t("ssp126"),
        type: "line",
        color: "var(--chart-series-5, #0ea5e9)",
        data: median(low),
      },
      {
        id: "observed",
        name: t("observed"),
        type: "line",
        curve: "linear",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: observed,
      },
    ];
  }, [t]);
  const formats = useMemo(
    () => ({
      degrees: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      year: new Intl.NumberFormat(locale, { useGrouping: false }),
    }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      [1.5, 2].map((level) => ({
        type: "line",
        axis: "y",
        value: level,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("parisLimit", { value: formats.degrees.format(level) }),
      })),
    [t, formats],
  );

  const year = (value: number | undefined) =>
    value === undefined ? "–" : formats.year.format(value);
  const peak = Math.max(...low.map((p) => p.median));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RangeAreaChart
        series={series}
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{ format: (x) => formats.year.format(x) }}
        yAxis={{
          title: t("warming"),
          format: (y) => formats.degrees.format(y),
        }}
        height={340}
        ariaLabel={t("climateAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("crossings", {
          lowLimit: formats.degrees.format(1.5),
          low: year(crossing(low, 1.5)),
          peak: formats.degrees.format(peak),
          highLimit: formats.degrees.format(2),
          high: year(crossing(high, 2)),
        })}
      </p>
    </div>
  );
}
`})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Percentiles of the response time of an API (ms) every 10 minutes over a
// day: busy hours widen the distribution
const points = Array.from({ length: 144 }, (_, i) => {
  const hour = i / 6;
  const load =
    Math.exp(-((hour - 11) ** 2) / 8) + 0.7 * Math.exp(-((hour - 19) ** 2) / 5);
  const p50 = 42 + 30 * load + 2 * Math.sin(i / 2.3);
  return {
    x: new Date(2026, 2, 12, 0, i * 10),
    p5: p50 * 0.55,
    p25: p50 * 0.8,
    p50,
    p75: p50 * (1.3 + 0.2 * load),
    p95: p50 * (2 + 1.4 * load),
  };
});

export default function FanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // nested bands: the outer one first, the median line on top
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("p5p95"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.16,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p5, y: p.p95 })),
      },
      {
        name: t("p25p75"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.32,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p25, y: p.p75 })),
      },
      {
        name: t("median"),
        type: "line",
        color: "var(--chart-series-5, #0ea5e9)",
        format: ms,
        data: points.map((p) => [p.x, p.p50] as const),
      },
    ],
    [t, ms],
  );

  return (
    <RangeAreaChart
      series={series}
      yAxis={{ format: ms, zero: true }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
`})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly orders (thousands): two years of history, then a 12-month
// forecast whose uncertainty widens with the horizon
const history = [
  41, 39, 44, 47, 52, 55, 53, 51, 56, 60, 68, 74, 49, 46, 52, 55, 61, 64, 62,
  60, 66, 71, 79, 86,
];
const month = (i: number) => new Date(2024, i, 1);

export default function ForecastDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const last = history.length - 1;
    const forecast = Array.from({ length: 13 }, (_, k) => {
      const i = last + k;
      // the same month of last year, plus 12% of growth
      const mean =
        k === 0 ? (history[last] ?? 0) : (history[i - 12] ?? 0) * 1.12;
      // standard error growing like √horizon
      const sd = 2.4 * Math.sqrt(k);
      return { i, mean, sd };
    });
    return [
      {
        name: t("interval95"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.14,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.96 * f.sd,
          y: f.mean + 1.96 * f.sd,
        })),
      },
      {
        name: t("interval80"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.22,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.28 * f.sd,
          y: f.mean + 1.28 * f.sd,
        })),
      },
      {
        name: t("actual"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        data: history.map((y, i) => [month(i), y] as const),
      },
      {
        name: t("forecast"),
        type: "line",
        color: "var(--chart-series-1, #4f46e5)",
        data: forecast.map((f) => [month(f.i), f.mean] as const),
      },
    ];
  }, [t]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(Math.round(value) * 1000);
  }, [locale]);

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: thousands, title: t("orders") }}
      annotations={[
        {
          type: "line",
          axis: "x",
          value: month(history.length - 1).getTime(),
          label: t("today"),
        },
      ]}
      height={320}
      ariaLabel={t("forecastAria")}
    />
  );
}
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Six months of daily trading: the low-high range of each day and the close
const days = (() => {
  const random = mulberry32(42);
  const out: { x: Date; low: number; high: number; close: number }[] = [];
  let close = 182;
  for (let d = 0; out.length < 126; d++) {
    const date = new Date(2026, 0, 2 + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const open = close;
    close = Math.max(120, open * (1 + (random() - 0.48) * 0.035));
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    out.push({ x: date, low, high, close });
  }
  return out;
})();

export default function PriceRangeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dayRange"),
        color: "var(--chart-series-2, #10b981)",
        lineWidth: 0,
        opacity: 0.3,
        format: usd,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("close"),
        type: "line",
        color: "var(--chart-series-2, #10b981)",
        format: usd,
        data: days.map((d) => [d.x, d.close] as const),
      },
    ],
    [t, usd],
  );

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: usd }}
      height={300}
      ariaLabel={t("priceAria")}
    />
  );
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A year of daily minimum and maximum temperatures (°C) of a temperate city
const days = (() => {
  const random = mulberry32(7);
  return Array.from({ length: 365 }, (_, d) => {
    const season = -Math.cos(((d - 18) / 365) * Math.PI * 2);
    const weather = (random() - 0.5) * 6;
    const mean = 11.5 + season * 8.5 + weather;
    const spread = 6 + season * 2.5 + random() * 3;
    return {
      x: new Date(2025, 0, d + 1),
      low: mean - spread / 2,
      high: mean + spread / 2,
      normal: 11.5 + season * 8.5,
    };
  });
})();

export default function TemperatureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dailyRange"),
        color: "var(--chart-series-4, #ef4444)",
        // many narrow days: a filled band without edges reads better
        lineWidth: 0,
        opacity: 0.45,
        format: celsius,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("normal"),
        type: "line",
        curve: "smooth",
        color: "var(--text-secondary-color, #6b7280)",
        lineWidth: 1.5,
        format: celsius,
        data: days.map((d) => [d.x, d.normal] as const),
      },
    ],
    [t, celsius],
  );

  // zoom with Ctrl / ⌘ + wheel to read single days
  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: celsius }}
      height={300}
      ariaLabel={t("temperatureAria")}
    />
  );
}
`})))()}var qe,Je,Ye;function Xe(){return(Xe=e((()=>{re(),le(),me(),_e(),be(),Y(),Ee(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),t(),f(),m(),qe=n(),Je=d(Object.assign({"./demos/ab-test.tsx":te,"./demos/anomaly-band.tsx":ae,"./demos/bid-ask.tsx":de,"./demos/climate-scenarios.tsx":ge,"./demos/fan.tsx":ve,"./demos/forecast.tsx":xe,"./demos/price-range.tsx":we,"./demos/temperature.tsx":Oe}),Object.assign({"./demos/ab-test.tsx":je,"./demos/anomaly-band.tsx":Ne,"./demos/bid-ask.tsx":Fe,"./demos/climate-scenarios.tsx":Le,"./demos/fan.tsx":ze,"./demos/forecast.tsx":Ve,"./demos/price-range.tsx":Ue,"./demos/temperature.tsx":Ge})),Ye=()=>(0,qe.jsx)(p,{id:`range-area-chart`,demos:Je})})))()}Xe();export{Ye as default};