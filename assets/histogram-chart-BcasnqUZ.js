import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{T as p,b as m,h as ee,m as h}from"./angular-preview-DXuT9H-w.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-BNEhhzRL.js";import{a as g,m as _,v as ae,y as oe}from"./charts-JJDQ3gS7.js";function se(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,i=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`year`,unitDisplay:`long`});return t=>e.format(t)},[n]);return(0,le.jsx)(g,{values:ue,domain:[15,85],bins:14,name:e(`customers`),color:`var(--chart-series-2, #10b981)`,formatBin:i,xAxis:{title:e(`age`)},height:280,ariaLabel:e(`agesAria`)})}var v,le,ue;function de(){return(de=e((()=>{v=t(),i(),_(),le=n(),ue=(()=>{let e=se(21),t=new Int32Array(2e4);for(let n=0;n<t.length;n++){let r=e();t[n]=Math.round(r<.6?22+e()*18+e()*6:35+e()*40)}return t})()})))()}function fe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pe(){let{t:e}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),[t,n]=(0,me.useState)(`auto`);return(0,y.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,width:`100%`},children:[(0,y.jsxs)(s,{"aria-label":e(`binning`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[(0,y.jsx)(u,{value:`auto`,label:e(`rules.auto`)}),(0,y.jsx)(u,{value:`sturges`,label:e(`rules.sturges`)}),(0,y.jsx)(u,{value:`ten`,label:e(`rules.ten`)}),(0,y.jsx)(u,{value:`forty`,label:e(`rules.forty`)})]}),(0,y.jsx)(g,{values:he,bins:ge[t],domain:[0,100],name:e(`students`),color:`var(--chart-series-6, #8b5cf6)`,xAxis:{title:e(`score`)},height:280,ariaLabel:e(`scoresAria`)})]})}var me,y,he,ge;function _e(){return(_e=e((()=>{me=t(),i(),c(),l(),_(),y=n(),he=(()=>{let e=fe(5);return Array.from({length:600},(t,n)=>{let r=Math.sqrt(-2*Math.log(e()||1e-12))*Math.cos(2*Math.PI*e()),i=n%3==0?48:71;return Math.max(0,Math.min(100,i+r*9))})})(),ge={auto:`auto`,sturges:`sturges`,ten:10,forty:40}})))()}function ve(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ye(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,[i,a]=(0,b.useState)(null),o=(0,b.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`short`});return t=>e.format(t)},[n]),s=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),c=(0,b.useMemo)(()=>new Intl.NumberFormat(n),[n]),l=(0,b.useMemo)(()=>{if(i===null)return[];let t=T.edges[i+1]??0;return[{type:`rect`,x1:t,color:`var(--primary-color)`,opacity:.1,label:e(`withinShare`,{share:s.format(E[i]??0)})},{type:`line`,axis:`x`,value:t,color:`var(--primary-color)`}]},[i,s,e]),u=t=>{let n=t.items.find(e=>e.seriesIndex===0);return n?(0,x.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,x.jsx)(`strong`,{children:n.label}),(0,x.jsx)(`span`,{children:e(`employeesInBin`,{value:c.format(n.y),share:s.format(n.y/T.total)})}),(0,x.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`clickForCumulative`)})]}):null},d=i===null?0:T.edges[i+1]??0;return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:i===null?e(`clickBin`):e(`cumulativeStatus`,{share:s.format(E[i]??0),employees:c.format(Math.round((E[i]??0)*T.total)),limit:o(d)})}),(0,x.jsx)(g,{values:w,domain:S,bins:C,name:e(`employees`),formatBin:o,xAxis:{title:e(`commute`),format:o},annotations:l,renderTooltip:u,onPointClick:e=>{let t=e.items.find(e=>e.seriesIndex===0);t&&a(t.index)},onPlotClick:()=>a(null),height:320,ariaLabel:e(`commuteAria`)})]})}var b,x,S,C,w,T,E;function D(){return(D=e((()=>{b=t(),i(),_(),p(),x=n(),S=[0,90],C=18,w=(()=>{let e=ve(2026);return Float64Array.from({length:1200},()=>{let t=Math.sqrt(-2*Math.log(e()||1e-12))*Math.cos(2*Math.PI*e()),n=e()<.45?16+6*t:46+12*t;return Math.min(89.9,Math.max(2,n))})})(),T=m(w,{domain:S,bins:C}),E=T.counts.map((e,t)=>T.counts.slice(0,t+1).reduce((e,t)=>e+t,0)/T.total)})))()}function be(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function xe(){let{t:e}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),t=(0,O.useMemo)(()=>{let t={domain:[0,30],bins:15};return[{...ee(j,{...t,name:e(`control`)}),id:`a`},{...ee(M,{...t,name:e(`variant`)}),id:`b`,color:`var(--chart-series-3, #f59e0b)`}]},[e]);return(0,k.jsx)(oe,{series:t,xAxis:{title:e(`minutes`)},height:300,ariaLabel:e(`abAria`)})}var O,k,A,j,M;function N(){return(N=e((()=>{O=t(),i(),ae(),p(),k=n(),A=(e,t)=>{let n=be(e);return Float64Array.from({length:8e3},()=>-Math.log(1-n())*t)},j=A(1,6),M=A(2,7.4)})))()}function Se(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,i=(0,P.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0});return t=>e.format(t)},[n]),a=(0,P.useMemo)(()=>h(I,[.5,.95,.99]),[]),o=(0,P.useMemo)(()=>[`p50`,`p95`,`p99`].map((e,t)=>({type:`line`,axis:`x`,value:a[t]??0,color:t===0?`var(--success-color, #16a34a)`:t===1?`var(--warning-color, #f59e0b)`:`var(--danger-color, #dc2626)`,label:`${e} ${i(a[t]??0)}`})),[a,i]);return(0,F.jsx)(g,{values:I,domain:[0,400],bins:80,name:e(`requests`),formatBin:i,xAxis:{format:i},annotations:o,height:320,ariaLabel:e(`latencyAria`)})}var P,F,I;function we(){return(we=e((()=>{P=t(),i(),_(),p(),F=n(),I=(()=>{let e=Se(11),t=new Float64Array(1e6);for(let n=0;n<t.length;n++){let r=Math.sqrt(-2*Math.log(e()||1e-12))*Math.cos(2*Math.PI*e());t[n]=Math.exp(4.1+.42*r)+(e()<.02?250*e():0)}return t})()})))()}function Te(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,[i,a]=(0,L.useState)(0),[s,c]=(0,L.useState)(!0);(0,L.useEffect)(()=>{if(!s)return;let e=setInterval(()=>a(e=>e+1),500);return()=>clearInterval(e)},[s]);let l=(0,L.useMemo)(()=>{let e=z+i*De,t=new Float64Array(z);for(let n=0;n<z;n++)t[n]=Oe(e-z+n);return t},[i]),[u=0]=(0,L.useMemo)(()=>h(l,[.9]),[l]),d=l.reduce((e,t)=>e+ +(t<=B),0)/z,f=(0,L.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`short`,maximumFractionDigits:1});return t=>e.format(t)},[n]),p=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),m=d>=.8;return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,R.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[(0,R.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(e=>!e),children:e(s?`pause`:`resume`)}),(0,R.jsx)(o,{size:`small`,variant:`ghost`,onClick:()=>a(0),children:e(`reset`)}),(0,R.jsxs)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:[e(`serviceLevel`,{share:p.format(d),target:f(B),p90:f(u)}),` `,(0,R.jsx)(`strong`,{style:{color:m?`var(--success-color)`:`var(--danger-color)`},children:e(m?`targetMet`:`targetMissed`)})]})]}),(0,R.jsx)(g,{values:l,domain:[0,20],bins:40,nice:!1,name:e(`calls`),formatBin:f,xAxis:{title:e(`waitTime`),format:f},yAxis:{min:0,max:160},annotations:[{type:`line`,axis:`x`,value:B,color:`var(--danger-color)`,dash:[4,4],label:e(`target`)},{type:`line`,axis:`x`,value:u,color:`var(--warning-color)`,label:e(`p90`)}],height:300,ariaLabel:e(`callsAria`)})]})}var L,R,z,De,B,Oe;function ke(){return(ke=e((()=>{L=t(),i(),a(),_(),p(),R=n(),z=600,De=12,B=5,Oe=e=>{let t=Te(e*7919+1);return-(3.5+1.5*Math.sin(e/400))*Math.log(1-t())}})))()}function Ae(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,i=(0,V.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumSignificantDigits:2});return t=>e.format(10**t)},[n]),a=(0,V.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),[o,s]=(0,V.useMemo)(()=>h(W,[.5,.99]),[]),c=(0,V.useMemo)(()=>W.filter(e=>e>=U).length/W.length,[]),l=(0,V.useMemo)(()=>[{type:`rect`,x0:Math.log10(U),color:`var(--success-color)`,opacity:.08,label:e(`freeShipping`),labelPosition:`top-right`},{type:`line`,axis:`x`,value:Math.log10(o??1),dash:[4,4],label:e(`medianOrder`,{value:i(Math.log10(o??1))})},{type:`line`,axis:`x`,value:Math.log10(s??1),dash:[4,4],color:`var(--warning-color)`,label:e(`p99Order`,{value:i(Math.log10(s??1))})}],[e,i,o,s]);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,H.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`eligibleShare`,{share:a.format(c),threshold:i(Math.log10(U))})}),(0,H.jsx)(g,{values:Me,domain:[.5,4],bins:35,nice:!1,name:e(`orders`),formatBin:i,xAxis:{title:e(`orderValue`),format:i,tickCount:8},annotations:l,height:320,ariaLabel:e(`ordersAria`)})]})}var V,H,U,W,Me;function Ne(){return(Ne=e((()=>{V=t(),i(),_(),p(),H=n(),U=50,W=(()=>{let e=Ae(7),t=new Float64Array(4e4);for(let n=0;n<t.length;n++){let r=Math.sqrt(-2*Math.log(e()||1e-12))*Math.cos(2*Math.PI*e()),i=e()<.04;t[n]=Math.exp(i?6.2+.7*r:3.6+.65*r)}return t})(),Me=W.map(Math.log10)})))()}function Pe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,[i,a]=(0,G.useState)(!1),o=i?ze:Re,s=(0,G.useMemo)(()=>Be(o),[o]),c=(0,G.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`,minimumFractionDigits:3,maximumFractionDigits:3});return t=>e.format(t)},[n]),l=(0,G.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}),[n]),u=(0,G.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:0}),[n]),d=(0,G.useMemo)(()=>{let{mean:t,sd:n}=s,r=o.length*Le/(n*Math.sqrt(2*Math.PI)),i=Array.from({length:121},(e,i)=>{let a=Y[0]+(Y[1]-Y[0])*i/120;return[a,r*Math.exp(-(((a-t)/n)**2)/2)]});return[{name:e(`normalFit`),type:`line`,curve:`smooth`,data:i,color:`var(--text-color)`,tooltip:!1}]},[s,o,e]),p=(0,G.useMemo)(()=>[{type:`rect`,x1:q,color:`var(--danger-color)`,opacity:.1},{type:`rect`,x0:J,color:`var(--danger-color)`,opacity:.1},{type:`line`,axis:`x`,value:q,color:`var(--danger-color)`,label:e(`lsl`)},{type:`line`,axis:`x`,value:J,color:`var(--danger-color)`,label:e(`usl`)},{type:`line`,axis:`x`,value:Ie,dash:[4,4],label:e(`nominal`)}],[e]),m=s.cpk>=1.33;return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,K.jsx)(f,{checked:i,onChange:a,label:e(`adjustTool`)}),(0,K.jsxs)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:[e(`capability`,{mean:c(s.mean),sd:c(s.sd),cpk:l.format(s.cpk),ppm:u.format(s.ppm)}),` `,(0,K.jsx)(`strong`,{style:{color:m?`var(--success-color)`:`var(--danger-color)`},children:e(m?`capable`:`notCapable`)})]}),(0,K.jsx)(g,{values:o,domain:Y,bins:X,nice:!1,name:e(`parts`),formatBin:c,series:d,xAxis:{title:e(`diameter`),format:c},annotations:p,height:320,ariaLabel:e(`qualityAria`)})]})}var G,K,Ie,q,J,Y,X,Le,Z,Re,ze,Be;function Ve(){return(Ve=e((()=>{G=t(),i(),d(),_(),K=n(),Ie=25,q=24.95,J=25.05,Y=[24.94,25.06],X=48,Le=(Y[1]-Y[0])/X,Z=(e,t)=>{let n=Pe(42),r=new Float64Array(5e3);for(let i=0;i<r.length;i++){let a=Math.sqrt(-2*Math.log(n()||1e-12))*Math.cos(2*Math.PI*n());r[i]=e+t*a}return r},Re=Z(25.021,.0125),ze=Z(25.001,.0115),Be=e=>{let t=0,n=0;for(let r of e)t+=r,(r<q||r>J)&&n++;let r=t/e.length,i=0;for(let t of e)i+=(t-r)**2;let a=Math.sqrt(i/(e.length-1));return{mean:r,sd:a,cpk:Math.min(J-r,r-q)/(3*a),ppm:n/e.length*1e6}}})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HistogramChart } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Ages of 20,000 customers, in an Int32Array (any array of numbers works)
const ages = (() => {
  const random = mulberry32(21);
  const out = new Int32Array(20_000);
  for (let i = 0; i < out.length; i++) {
    const r = random();
    out[i] = Math.round(
      r < 0.6 ? 22 + random() * 18 + random() * 6 : 35 + random() * 40,
    );
  }
  return out;
})();

export default function AgesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const years = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "year",
      unitDisplay: "long",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // a fixed domain and 14 bins: one bin per 5 years from 15 to 85
  return (
    <HistogramChart
      values={ages}
      domain={[15, 85]}
      bins={14}
      name={t("customers")}
      color="var(--chart-series-2, #10b981)"
      formatBin={years}
      xAxis={{ title: t("age") }}
      height={280}
      ariaLabel={t("agesAria")}
    />
  );
}
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { HistogramChart, type HistogramBinning } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Scores of 600 students in an exam out of 100: two groups of levels
const scores = (() => {
  const random = mulberry32(5);
  return Array.from({ length: 600 }, (_, i) => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const mean = i % 3 === 0 ? 48 : 71;
    return Math.max(0, Math.min(100, mean + z * 9));
  });
})();

const rules: Record<string, HistogramBinning> = {
  auto: "auto",
  sturges: "sturges",
  ten: 10,
  forty: 40,
};

export default function BinningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const [rule, setRule] = useState("auto");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
      }}
    >
      <RadioGroup
        aria-label={t("binning")}
        direction="horizontal"
        value={rule}
        onChange={(value) => setRule(String(value))}
      >
        <Radio value="auto" label={t("rules.auto")} />
        <Radio value="sturges" label={t("rules.sturges")} />
        <Radio value="ten" label={t("rules.ten")} />
        <Radio value="forty" label={t("rules.forty")} />
      </RadioGroup>
      <HistogramChart
        values={scores}
        bins={rules[rule]}
        domain={[0, 100]}
        name={t("students")}
        color="var(--chart-series-6, #8b5cf6)"
        xAxis={{ title: t("score") }}
        height={280}
        ariaLabel={t("scoresAria")}
      />
    </div>
  );
}
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  binValues,
  type ChartAnnotation,
  type ChartHoverEvent,
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

const DOMAIN = [0, 90] as const;
const BINS = 18;

// One-way commute (minutes) of 1,200 employees: walkers and cyclists around
// a quarter of an hour, train commuters around 45 minutes
const commutes = (() => {
  const random = mulberry32(2026);
  return Float64Array.from({ length: 1200 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const value = random() < 0.45 ? 16 + 6 * z : 46 + 12 * z;
    return Math.min(89.9, Math.max(2, value));
  });
})();

// the same options as the chart: the same bins, with their edges
const bins = binValues(commutes, { domain: DOMAIN, bins: BINS });
// share of the employees at or below the upper edge of every bin
const cumulative = bins.counts.map(
  (_, k) => bins.counts.slice(0, k + 1).reduce((a, b) => a + b, 0) / bins.total,
);

export default function CommuteDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const annotations = useMemo((): ChartAnnotation[] => {
    if (selected === null) return [];
    const edge = bins.edges[selected + 1] ?? 0;
    return [
      {
        type: "rect",
        x1: edge,
        color: "var(--primary-color)",
        opacity: 0.1,
        label: t("withinShare", {
          share: percent.format(cumulative[selected] ?? 0),
        }),
      },
      { type: "line", axis: "x", value: edge, color: "var(--primary-color)" },
    ];
  }, [selected, percent, t]);

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items.find((i) => i.seriesIndex === 0);
    if (!item) return null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{item.label}</strong>
        <span>
          {t("employeesInBin", {
            value: number.format(item.y),
            share: percent.format(item.y / bins.total),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("clickForCumulative")}
        </span>
      </div>
    );
  };

  const edge = selected === null ? 0 : (bins.edges[selected + 1] ?? 0);
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {selected === null
          ? t("clickBin")
          : t("cumulativeStatus", {
              share: percent.format(cumulative[selected] ?? 0),
              employees: number.format(
                Math.round((cumulative[selected] ?? 0) * bins.total),
              ),
              limit: minutes(edge),
            })}
      </output>
      <HistogramChart
        values={commutes}
        domain={DOMAIN}
        bins={BINS}
        name={t("employees")}
        formatBin={minutes}
        xAxis={{ title: t("commute"), format: minutes }}
        annotations={annotations}
        renderTooltip={tooltip}
        // the index of a bar is the index of its bin
        onPointClick={(event) => {
          const item = event.items.find((i) => i.seriesIndex === 0);
          if (item) setSelected(item.index);
        }}
        onPlotClick={() => setSelected(null)}
        height={320}
        ariaLabel={t("commuteAria")}
      />
    </div>
  );
}
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  histogramSeries,
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

// Session duration (minutes) of an A/B test: the new onboarding keeps the
// users a little longer
const sample = (seed: number, scale: number) => {
  const random = mulberry32(seed);
  return Float64Array.from(
    { length: 8000 },
    () => -Math.log(1 - random()) * scale,
  );
};
const control = sample(1, 6);
const variant = sample(2, 7.4);

export default function ComparisonDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });

  // the same domain and bin count: both samples get the same bins, and the
  // bars of each bin sit side by side
  const series = useMemo((): ChartSeries[] => {
    const options = { domain: [0, 30] as const, bins: 15 };
    return [
      {
        ...histogramSeries(control, { ...options, name: t("control") }),
        id: "a",
      },
      {
        ...histogramSeries(variant, { ...options, name: t("variant") }),
        id: "b",
        color: "var(--chart-series-3, #f59e0b)",
      },
    ];
  }, [t]);

  return (
    <Chart
      series={series}
      xAxis={{ title: t("minutes") }}
      height={300}
      ariaLabel={t("abAria")}
    />
  );
}
`})))()}var Q;function Xe(){return(Xe=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  quantiles,
  type ChartAnnotation,
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

// One million request latencies (ms): log-normal, with a slow tail
const latencies = (() => {
  const random = mulberry32(11);
  const values = new Float64Array(1_000_000);
  for (let i = 0; i < values.length; i++) {
    // Box-Muller
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    values[i] =
      Math.exp(4.1 + 0.42 * z) + (random() < 0.02 ? 250 * random() : 0);
  }
  return values;
})();

export default function LatencyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
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

  // exact percentiles: one sort of the million values
  const marks = useMemo(() => quantiles(latencies, [0.5, 0.95, 0.99]), []);
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      (["p50", "p95", "p99"] as const).map((name, i) => ({
        type: "line",
        axis: "x",
        value: marks[i] ?? 0,
        color:
          i === 0
            ? "var(--success-color, #16a34a)"
            : i === 1
              ? "var(--warning-color, #f59e0b)"
              : "var(--danger-color, #dc2626)",
        label: \`\${name} \${ms(marks[i] ?? 0)}\`,
      })),
    [marks, ms],
  );

  return (
    <HistogramChart
      values={latencies}
      domain={[0, 400]}
      bins={80}
      name={t("requests")}
      formatBin={ms}
      xAxis={{ format: ms }}
      annotations={annotations}
      height={320}
      ariaLabel={t("latencyAria")}
    />
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { HistogramChart, quantiles } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WINDOW = 600; // calls kept in the histogram
const PER_TICK = 12; // calls answered every tick
const TARGET = 5; // minutes, the service level target

/**
 * Wait (minutes) of the call number \`n\` of a support line: exponential, its
 * mean rising and falling with the waves of callers. Derived from \`n\` alone,
 * so the stream is deterministic.
 */
const waitOf = (n: number) => {
  const random = mulberry32(n * 7919 + 1);
  const mean = 3.5 + 1.5 * Math.sin(n / 400);
  return -mean * Math.log(1 - random());
};

export default function LiveSamplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  // 12 new calls every 500 ms, the oldest ones leave the window
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 500);
    return () => clearInterval(timer);
  }, [running]);

  // the last WINDOW calls
  const waits = useMemo(() => {
    const last = WINDOW + tick * PER_TICK;
    const values = new Float64Array(WINDOW);
    for (let i = 0; i < WINDOW; i++) values[i] = waitOf(last - WINDOW + i);
    return values;
  }, [tick]);
  const [p90 = 0] = useMemo(() => quantiles(waits, [0.9]), [waits]);
  const withinTarget =
    waits.reduce((n, value) => n + (value <= TARGET ? 1 : 0), 0) / WINDOW;

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const met = withinTarget >= 0.8;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={() => setTick(0)}>
          {t("reset")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("serviceLevel", {
            share: percent.format(withinTarget),
            target: minutes(TARGET),
            p90: minutes(p90),
          })}{" "}
          <strong
            style={{
              color: met ? "var(--success-color)" : "var(--danger-color)",
            }}
          >
            {met ? t("targetMet") : t("targetMissed")}
          </strong>
        </output>
      </div>
      <HistogramChart
        values={waits}
        // fixed bins and y range: the bars move, the axes stay still
        domain={[0, 20]}
        bins={40}
        nice={false}
        name={t("calls")}
        formatBin={minutes}
        xAxis={{ title: t("waitTime"), format: minutes }}
        yAxis={{ min: 0, max: 160 }}
        annotations={[
          {
            type: "line",
            axis: "x",
            value: TARGET,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("target"),
          },
          {
            type: "line",
            axis: "x",
            value: p90,
            color: "var(--warning-color)",
            label: t("p90"),
          },
        ]}
        height={300}
        ariaLabel={t("callsAria")}
      />
    </div>
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  quantiles,
  type ChartAnnotation,
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

const FREE_SHIPPING = 50; // $

// 40,000 orders of an online shop ($): most baskets are small, a few
// business orders reach thousands of dollars
const orders = (() => {
  const random = mulberry32(7);
  const values = new Float64Array(40_000);
  for (let i = 0; i < values.length; i++) {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const business = random() < 0.04;
    values[i] = business ? Math.exp(6.2 + 0.7 * z) : Math.exp(3.6 + 0.65 * z);
  }
  return values;
})();
// binned on log10($): every bin is the same ratio wide (×1.26)
const logOrders = orders.map(Math.log10);

export default function OrderValuesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;

  // the bins and the axis are in log10($): format them back to dollars
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 2,
    });
    return (log: number) => format.format(10 ** log);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const [median, p99] = useMemo(() => quantiles(orders, [0.5, 0.99]), []);
  const eligible = useMemo(
    () =>
      orders.filter((value) => value >= FREE_SHIPPING).length / orders.length,
    [],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: Math.log10(FREE_SHIPPING),
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("freeShipping"),
        labelPosition: "top-right",
      },
      {
        type: "line",
        axis: "x",
        value: Math.log10(median ?? 1),
        dash: [4, 4],
        label: t("medianOrder", { value: usd(Math.log10(median ?? 1)) }),
      },
      {
        type: "line",
        axis: "x",
        value: Math.log10(p99 ?? 1),
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("p99Order", { value: usd(Math.log10(p99 ?? 1)) }),
      },
    ],
    [t, usd, median, p99],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("eligibleShare", {
          share: percent.format(eligible),
          threshold: usd(Math.log10(FREE_SHIPPING)),
        })}
      </output>
      <HistogramChart
        values={logOrders}
        domain={[0.5, 4]}
        bins={35}
        nice={false}
        name={t("orders")}
        formatBin={usd}
        xAxis={{ title: t("orderValue"), format: usd, tickCount: 8 }}
        annotations={annotations}
        height={320}
        ariaLabel={t("ordersAria")}
      />
    </div>
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  HistogramChart,
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

// Specification of a machined shaft: 25 mm ± 0.05 mm
const NOMINAL = 25;
const LSL = 24.95;
const USL = 25.05;
const DOMAIN = [24.94, 25.06] as const;
const BINS = 48;
const WIDTH = (DOMAIN[1] - DOMAIN[0]) / BINS;

/** 5,000 measured diameters, around \`mean\` */
const measure = (mean: number, sd: number) => {
  const random = mulberry32(42);
  const values = new Float64Array(5000);
  for (let i = 0; i < values.length; i++) {
    // Box-Muller
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    values[i] = mean + sd * z;
  }
  return values;
};
// the worn tool cuts a little wide; after the adjustment the process is centered
const drifted = measure(25.021, 0.0125);
const centered = measure(25.001, 0.0115);

const statsOf = (values: Float64Array) => {
  let sum = 0;
  let out = 0;
  for (const v of values) {
    sum += v;
    if (v < LSL || v > USL) out++;
  }
  const mean = sum / values.length;
  let squares = 0;
  for (const v of values) squares += (v - mean) ** 2;
  const sd = Math.sqrt(squares / (values.length - 1));
  const cpk = Math.min(USL - mean, mean - LSL) / (3 * sd);
  return { mean, sd, cpk, ppm: (out / values.length) * 1e6 };
};

export default function QualityControlDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [adjusted, setAdjusted] = useState(false);
  const values = adjusted ? centered : drifted;
  const stats = useMemo(() => statsOf(values), [values]);

  const mm = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millimeter",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const integer = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    [locale],
  );

  // the fitted normal curve, scaled to counts per bin
  const fit = useMemo((): ChartSeries[] => {
    const { mean, sd } = stats;
    const scale = (values.length * WIDTH) / (sd * Math.sqrt(2 * Math.PI));
    const data = Array.from({ length: 121 }, (_, i) => {
      const x = DOMAIN[0] + ((DOMAIN[1] - DOMAIN[0]) * i) / 120;
      return [x, scale * Math.exp(-(((x - mean) / sd) ** 2) / 2)] as const;
    });
    return [
      {
        name: t("normalFit"),
        type: "line",
        curve: "smooth",
        data,
        color: "var(--text-color)",
        tooltip: false,
      },
    ];
  }, [stats, values, t]);

  const annotations = useMemo(
    (): ChartAnnotation[] => [
      // out of specification on both sides
      { type: "rect", x1: LSL, color: "var(--danger-color)", opacity: 0.1 },
      { type: "rect", x0: USL, color: "var(--danger-color)", opacity: 0.1 },
      {
        type: "line",
        axis: "x",
        value: LSL,
        color: "var(--danger-color)",
        label: t("lsl"),
      },
      {
        type: "line",
        axis: "x",
        value: USL,
        color: "var(--danger-color)",
        label: t("usl"),
      },
      {
        type: "line",
        axis: "x",
        value: NOMINAL,
        dash: [4, 4],
        label: t("nominal"),
      },
    ],
    [t],
  );
  const capable = stats.cpk >= 1.33;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch
        checked={adjusted}
        onChange={setAdjusted}
        label={t("adjustTool")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("capability", {
          mean: mm(stats.mean),
          sd: mm(stats.sd),
          cpk: decimal.format(stats.cpk),
          ppm: integer.format(stats.ppm),
        })}{" "}
        <strong
          style={{
            color: capable ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {capable ? t("capable") : t("notCapable")}
        </strong>
      </output>
      <HistogramChart
        values={values}
        domain={DOMAIN}
        bins={BINS}
        nice={false}
        name={t("parts")}
        formatBin={mm}
        series={fit}
        xAxis={{ title: t("diameter"), format: mm }}
        annotations={annotations}
        height={320}
        ariaLabel={t("qualityAria")}
      />
    </div>
  );
}
`})))()}var rt,it,at;function $(){return($=e((()=>{de(),_e(),D(),N(),we(),ke(),Ne(),Ve(),Ue(),Ge(),qe(),Ye(),Xe(),Qe(),et(),nt(),t(),ne(),ie(),rt=n(),it=te(Object.assign({"./demos/ages.tsx":ce,"./demos/binning.tsx":pe,"./demos/commute.tsx":ye,"./demos/comparison.tsx":xe,"./demos/latency.tsx":Ce,"./demos/live-samples.tsx":Ee,"./demos/order-values.tsx":je,"./demos/quality-control.tsx":Fe}),Object.assign({"./demos/ages.tsx":He,"./demos/binning.tsx":We,"./demos/commute.tsx":Ke,"./demos/comparison.tsx":Je,"./demos/latency.tsx":Q,"./demos/live-samples.tsx":Ze,"./demos/order-values.tsx":$e,"./demos/quality-control.tsx":tt})),at=()=>(0,rt.jsx)(re,{id:`histogram-chart`,demos:it})})))()}$();export{at as default};