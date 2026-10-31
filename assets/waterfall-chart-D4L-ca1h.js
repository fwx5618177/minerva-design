import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{i as p,r as m}from"./Stack-B3Kr9X_e.js";import{l as h,n as ee,t as te,u as ne}from"./DocPage-BdPOW9nQ.js";import{m as g,p as _}from"./charts-JJDQ3gS7.js";function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,[i,a]=(0,v.useState)(3),o=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e6)},[n]),c=(0,v.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),l=b[i],d=ae[i],f=(0,v.useMemo)(()=>[{label:e(`arr.opening`),kind:`subtotal`},...x.map(t=>({label:e(`arr.${t}`),value:l[t]})),{label:e(`arr.closing`),kind:`total`}],[e,l]),p=x.reduce((e,t)=>e+l[t],0),m=(d+l.expansion+l.contraction+l.churn)/d,h=e(`arr.quarter`,{n:i+1});return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsx)(s,{"aria-label":e(`arr.quarterLabel`),direction:`horizontal`,value:i,onChange:e=>a(Number(e)),children:b.map((t,n)=>(0,y.jsx)(u,{value:n,label:e(`arr.quarter`,{n:n+1})},n))}),(0,y.jsx)(_,{steps:f,start:d,name:e(`arr.name`),format:o,yAxis:{format:o,min:Math.floor(d*.8)},height:320,ariaLabel:e(`arr.aria`,{quarter:h})}),(0,y.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-muted-color)`},children:e(`arr.summary`,{quarter:h,net:o(p),nrr:c.format(m)})})]})}var v,y,ie,b,x,ae;function oe(){return(oe=e((()=>{v=t(),i(),c(),l(),g(),y=n(),ie=12.4,b=[{newBusiness:1.8,expansion:.9,contraction:-.3,churn:-.6},{newBusiness:2.1,expansion:1.1,contraction:-.4,churn:-.5},{newBusiness:1.6,expansion:1.3,contraction:-.2,churn:-.9},{newBusiness:2.6,expansion:1.5,contraction:-.5,churn:-.7}],x=[`newBusiness`,`expansion`,`contraction`,`churn`],ae=b.reduce((e,t,n)=>[...e,n===0?ie:e[n-1]+x.reduce((e,t)=>e+b[n-1][t],0)],[])})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,S.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`});return t=>e.format(t*1e3)},[n]),a=(0,S.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`});return[{label:e(`opening`),kind:`subtotal`},...w.map((e,n)=>({label:t.format(new Date(2026,n,1)),value:e})),{label:e(`closing`),kind:`total`}]},[e,n]);return(0,C.jsx)(_,{steps:a,start:250,labels:!1,name:e(`cashFlow`),format:i,totalColor:`var(--chart-series-5, #0ea5e9)`,yAxis:{format:i,min:200},height:320,ariaLabel:e(`cashAria`)})}var S,C,w;function T(){return(T=e((()=>{S=t(),i(),g(),C=n(),w=[38,-22,54,-61,12,47,-15,66,-40,29,18,-9]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,E.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`emissions.kt`,{value:t.format(n)})},[n,e]),a=(0,E.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1,signDisplay:`exceptZero`});return n=>e(`emissions.kt`,{value:t.format(n)})},[n,e]),o=(0,E.useMemo)(()=>[{label:e(`emissions.baseline`),kind:`subtotal`},...ue.map(([t,n])=>({label:e(`emissions.${t}`),value:n})),{label:e(`emissions.current`),kind:`total`}],[e]);return(0,D.jsx)(_,{steps:o,start:le,name:e(`emissions.name`),format:i,upColor:`var(--danger-color, #dc2626)`,downColor:`var(--success-color, #16a34a)`,totalColor:`var(--text-secondary-color, #64748b)`,yAxis:{format:i,min:0},annotations:[{type:`line`,axis:`y`,value:O,color:`var(--success-color, #16a34a)`,dash:[6,4],label:e(`emissions.target`)}],renderTooltip:t=>{let n=t.items[0];if(!n)return null;let r=o[n.index],s=n.y0===void 0?null:n.y-n.y0;return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,D.jsx)(`strong`,{children:r?.label??t.xLabel}),s===null?(0,D.jsx)(`span`,{children:i(n.y)}):(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`span`,{children:e(`emissions.change`,{value:a(s)})}),(0,D.jsx)(`span`,{children:e(`emissions.range`,{from:i(n.y0??0),to:i(n.y)})})]}),(0,D.jsx)(`span`,{style:{color:`var(--text-muted-color)`},children:e(`emissions.gap`,{value:i(n.y-O)})})]})},height:340,ariaLabel:e(`emissions.aria`)})}var E,D,le,O,ue;function de(){return(de=e((()=>{E=t(),i(),g(),D=n(),le=5.2,O=2.6,ue=[[`growth`,.9],[`efficiency`,-.7],[`renewables`,-1.1],[`fleet`,-.4],[`refrigerants`,-.2],[`acquisition`,.3]]})))()}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,k.useMemo)(()=>{let e=new Intl.NumberFormat(n,{signDisplay:`auto`});return t=>e.format(t)},[n]),a=(0,k.useMemo)(()=>[{label:e(`startOfYear`),kind:`subtotal`},...me.map(([t,n])=>({label:e(`movements.${t}`),value:n})),{label:e(`endOfYear`),kind:`total`}],[e]);return(0,pe.jsx)(_,{steps:a,start:212,name:e(`people`),format:i,upColor:`var(--chart-series-1, #4f46e5)`,downColor:`var(--warning-color, #f59e0b)`,totalColor:`var(--text-secondary-color, #64748b)`,yAxis:{min:150},height:300,ariaLabel:e(`headcountAria`)})}var k,pe,me;function he(){return(he=e((()=>{k=t(),i(),g(),pe=n(),me=[[`hires`,46],[`internalIn`,9],[`resignations`,-21],[`internalOut`,-7],[`retirements`,-3]]})))()}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,A.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`day`,unitDisplay:`short`,maximumFractionDigits:1});return t=>e.format(t)},[n]),a=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),o=(0,A.useMemo)(()=>[...P.map(([t,n,r])=>({label:e(`lead.${t}`),value:n,color:r===`work`?M:N})),{label:e(`lead.total`),kind:`total`}],[e]);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,j.jsx)(_,{steps:o,name:e(`lead.name`),format:i,totalColor:`var(--text-secondary-color, #64748b)`,connector:{dash:[],color:`var(--border-color, #cbd5e1)`},yAxis:{format:i},height:320,ariaLabel:e(`lead.aria`)}),(0,j.jsxs)(`p`,{style:{margin:0,color:`var(--text-muted-color)`},children:[(0,j.jsx)(`span`,{"aria-hidden":!0,style:{color:M},children:`■`}),` `,e(`lead.work`),` `,(0,j.jsx)(`span`,{"aria-hidden":!0,style:{color:N},children:`■`}),` `,e(`lead.wait`),` ·`,` `,e(`lead.summary`,{work:i(I),total:i(F),share:a.format(I/F)})]})]})}var A,j,M,N,P,F,I;function L(){return(L=e((()=>{A=t(),i(),g(),j=n(),M=`var(--chart-series-1, #4f46e5)`,N=`var(--warning-color, #f59e0b)`,P=[[`orderEntry`,.5,`work`],[`creditCheck`,1,`wait`],[`picking`,1.5,`work`],[`quality`,.5,`work`],[`carrierWait`,2,`wait`],[`transit`,3.5,`work`],[`customs`,1,`wait`]],F=P.reduce((e,[,t])=>e+t,0),I=P.reduce((e,[,t,n])=>n===`work`?e+t:e,0)})))()}function _e(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,[i,a]=(0,R.useState)(xe),[s,c]=(0,R.useState)(!0);(0,R.useEffect)(()=>{if(!s)return;let e=window.setInterval(()=>a(H),2e3);return()=>window.clearInterval(e)},[s]);let l=(0,R.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e3)},[n]),u=(0,R.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0,signDisplay:`exceptZero`});return t=>e.format(t*1e3)},[n]),d=(0,R.useMemo)(()=>new Intl.DateTimeFormat(n,{hour:`2-digit`,minute:`2-digit`}),[n]),f=e=>d.format(U+e*6e4),p=(0,R.useMemo)(()=>[{label:e(`live.opening`),kind:`subtotal`},...i.shown.map(e=>({label:d.format(U+e.minute*6e4),value:e.amount})),{label:e(`live.now`),kind:`total`}],[e,i,d]),m=i.shown.reduce((e,t)=>{let n=e.running+t.amount;return{running:n,min:Math.min(e.min,n)}},{running:i.base,min:i.base}).min,h=i.shown[i.shown.length-1];return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,z.jsx)(_,{steps:p,start:i.base,name:e(`live.name`),format:l,labels:!1,yAxis:{format:l,min:Math.floor((m-120)/50)*50},height:320,ariaLabel:e(`live.aria`)}),(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,justifyContent:`space-between`,gap:8},children:[(0,z.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-muted-color)`},children:h&&e(`live.last`,{time:f(h.minute),kind:e(`live.kinds.${h.kind}`),amount:u(h.amount)})}),(0,z.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>c(e=>!e),children:e(s?`live.pause`:`live.resume`)})]})]})}var R,z,B,ye,V,be,H,xe,U;function Se(){return(Se=e((()=>{R=t(),i(),a(),g(),z=n(),B=[[`customer`,.45,6,42],[`supplier`,.3,-34,-5],[`card`,.13,-1.6,-.2],[`refund`,.08,-4,-1],[`payroll`,.04,-85,-60]],ye=(e,t)=>{let n=_e(1e3+e),r=n(),[i,,a,o]=B.find(([,e])=>(r-=e)<0)??B[0];return{kind:i,amount:Math.round((a+(o-a)*n())*10)/10,minute:t+2+Math.floor(n()*9)}},V=8,be=1240,H=e=>{let t=e.shown[e.shown.length-1],n=[...e.shown,ye(e.count,t?.minute??0)],r=n.length>V?n.shift():void 0;return{count:e.count+1,base:e.base+(r?.amount??0),shown:n}},xe=()=>{let e={count:0,base:be,shown:[]};for(let t=0;t<V;t++)e=H(e);return e},U=new Date(2026,9,30,9,0).getTime()})))()}function Ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,[i,a]=(0,W.useState)(!0),[o,c]=(0,W.useState)(!0),[l,d]=(0,W.useState)(`vertical`),m=(0,W.useMemo)(()=>{let e=new Intl.NumberFormat(n);return t=>e.format(t)},[n]),h=(0,W.useMemo)(()=>[{label:e(`scope.committed`),kind:`subtotal`},...we.map(([t,n])=>({label:e(`scope.${t}`),value:n})),{label:e(`scope.completed`),kind:`total`}],[e]);return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsxs)(p,{gap:16,wrap:!0,align:`center`,children:[(0,G.jsx)(s,{"aria-label":e(`scope.orientation`),direction:`horizontal`,value:l,onChange:e=>d(e),children:Ee.map(t=>(0,G.jsx)(u,{value:t,label:e(`scope.${t}`)},t))}),(0,G.jsx)(f,{checked:i,onChange:a,label:e(`scope.labels`)}),(0,G.jsx)(f,{checked:o,onChange:c,label:e(`scope.connector`)})]}),(0,G.jsx)(_,{steps:h,start:Te,name:e(`scope.name`),format:m,labels:i,connector:o,orientation:l,height:320,ariaLabel:e(`scope.aria`)})]})}var W,G,we,Te,Ee;function De(){return(De=e((()=>{W=t(),i(),m(),c(),l(),d(),g(),G=n(),we=[[`added`,9],[`removed`,-6],[`reestimated`,3],[`carriedOver`,-11]],Te=48,Ee=[`vertical`,`horizontal`]})))()}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,K.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,K.useMemo)(()=>Ae.map(([t,n])=>typeof n==`number`?{label:e(`pnl.${t}`),value:n}:{label:e(`pnl.${t}`),kind:n}),[e]);return(0,ke.jsx)(_,{steps:a,start:482,name:e(`amount`),format:i,yAxis:{format:i},height:340,ariaLabel:e(`pnlAria`)})}var K,ke,Ae;function je(){return(je=e((()=>{K=t(),i(),g(),ke=n(),Ae=[[`revenue`,`subtotal`],[`costOfSales`,-191],[`grossProfit`,`subtotal`],[`research`,-74],[`marketing`,-63],[`admin`,-38],[`operatingIncome`,`subtotal`],[`interest`,6],[`tax`,-27],[`netIncome`,`total`]]})))()}function Me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,[i,a]=(0,q.useState)(null),o=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:2});return t=>e.format(t)},[n]),s=(0,q.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),c=(0,q.useMemo)(()=>X.map(([t,n])=>typeof n==`number`?{label:e(`price.${t}`),value:n}:{label:e(`price.${t}`),kind:n}),[e]);return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,J.jsx)(_,{steps:c,start:Y,name:e(`price.name`),format:o,yAxis:{format:o,min:60},onPointClick:e=>{let t=e.items[0]?.index;t!==void 0&&X[t]&&a(t)},height:320,ariaLabel:e(`price.aria`)}),(0,J.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-muted-color)`},children:i===null?e(`price.hint`):e(`price.selected`,{step:c[i].label,value:o(Z[i]),share:s.format(Math.abs(Z[i])/Y)})})]})}var q,J,Y,X,Z;function Ne(){return(Ne=e((()=>{q=t(),i(),g(),J=n(),Y=120,X=[[`listPrice`,`subtotal`],[`dealerDiscount`,-12],[`promotion`,-6],[`invoicePrice`,`subtotal`],[`paymentTerms`,-2.4],[`freight`,-3.6],[`rebates`,-4.8],[`pocketPrice`,`total`]],Z=X.reduce((e,[,t])=>typeof t==`number`?{running:e.running+t,values:[...e.values,t]}:{running:e.running,values:[...e.values,e.running]},{running:Y,values:[]}).values})))()}function Pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,Q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:1,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,Q.useMemo)(()=>[{label:e(`budget`),kind:`subtotal`},...Ie.map(([t,n])=>({label:e(`drivers.${t}`),value:n})),{label:e(`actual`),kind:`total`}],[e]);return(0,Fe.jsx)(_,{steps:a,start:38,orientation:`horizontal`,name:e(`variance`),format:i,yAxis:{format:i,min:30},height:340,ariaLabel:e(`varianceAria`)})}var Q,Fe,Ie;function Le(){return(Le=e((()=>{Q=t(),i(),g(),Fe=n(),Ie=[[`volume`,4.2],[`price`,2.6],[`mix`,-1.1],[`exchangeRates`,-2.4],[`rawMaterials`,-3.3],[`savings`,1.8]]})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Annual recurring revenue of a SaaS company (M$): every quarter opens at
// the closing ARR of the previous one
const OPENING = 12.4;
const QUARTERS = [
  { newBusiness: 1.8, expansion: 0.9, contraction: -0.3, churn: -0.6 },
  { newBusiness: 2.1, expansion: 1.1, contraction: -0.4, churn: -0.5 },
  { newBusiness: 1.6, expansion: 1.3, contraction: -0.2, churn: -0.9 },
  { newBusiness: 2.6, expansion: 1.5, contraction: -0.5, churn: -0.7 },
];
const MOVES = ["newBusiness", "expansion", "contraction", "churn"] as const;

// opening ARR of every quarter
const openings = QUARTERS.reduce<number[]>(
  (list, q, i) => [
    ...list,
    i === 0
      ? OPENING
      : list[i - 1] + MOVES.reduce((sum, key) => sum + QUARTERS[i - 1][key], 0),
  ],
  [],
);

export default function ArrBridgeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [quarter, setQuarter] = useState(3);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const moves = QUARTERS[quarter];
  const opening = openings[quarter];
  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("arr.opening"), kind: "subtotal" },
      ...MOVES.map((key) => ({ label: t(\`arr.\${key}\`), value: moves[key] })),
      { label: t("arr.closing"), kind: "total" },
    ],
    [t, moves],
  );

  const net = MOVES.reduce((sum, key) => sum + moves[key], 0);
  // what the customers of the opening ARR pay at the end of the quarter
  const retention =
    (opening + moves.expansion + moves.contraction + moves.churn) / opening;
  const quarterName = t("arr.quarter", { n: quarter + 1 });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("arr.quarterLabel")}
        direction="horizontal"
        value={quarter}
        onChange={(value) => setQuarter(Number(value))}
      >
        {QUARTERS.map((_, i) => (
          <Radio key={i} value={i} label={t("arr.quarter", { n: i + 1 })} />
        ))}
      </RadioGroup>
      <WaterfallChart
        steps={steps}
        start={opening}
        name={t("arr.name")}
        format={usd}
        yAxis={{ format: usd, min: Math.floor(opening * 0.8) }}
        height={320}
        ariaLabel={t("arr.aria", { quarter: quarterName })}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {t("arr.summary", {
          quarter: quarterName,
          net: usd(net),
          nrr: percent.format(retention),
        })}
      </output>
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Net cash flow of every month (k€) from an opening balance of 250 k€
const flows = [38, -22, 54, -61, 12, 47, -15, 66, -40, 29, 18, -9];

export default function CashFlowDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const steps = useMemo((): WaterfallStep[] => {
    const month = new Intl.DateTimeFormat(locale, { month: "short" });
    return [
      // start: the first bar shows the opening balance from zero
      { label: t("opening"), kind: "subtotal" },
      ...flows.map((value, m) => ({
        label: month.format(new Date(2026, m, 1)),
        value,
      })),
      { label: t("closing"), kind: "total" },
    ];
  }, [t, locale]);

  return (
    <WaterfallChart
      steps={steps}
      start={250}
      labels={false}
      name={t("cashFlow")}
      format={euros}
      totalColor="var(--chart-series-5, #0ea5e9)"
      yAxis={{ format: euros, min: 200 }}
      height={320}
      ariaLabel={t("cashAria")}
    />
  );
}
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Greenhouse gas emissions of a manufacturer (kt CO₂e), from the 2019
// baseline to 2025, against the 2030 reduction target
const BASELINE = 5.2;
const TARGET = 2.6;
const DRIVERS = [
  ["growth", 0.9],
  ["efficiency", -0.7],
  ["renewables", -1.1],
  ["fleet", -0.4],
  ["refrigerants", -0.2],
  ["acquisition", 0.3],
] as const;

export default function EmissionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;

  const kt = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) =>
      t("emissions.kt", { value: number.format(value) });
  }, [locale, t]);
  const signed = useMemo(() => {
    const number = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) =>
      t("emissions.kt", { value: number.format(value) });
  }, [locale, t]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("emissions.baseline"), kind: "subtotal" },
      ...DRIVERS.map(([key, value]) => ({
        label: t(\`emissions.\${key}\`),
        value,
      })),
      { label: t("emissions.current"), kind: "total" },
    ],
    [t],
  );

  // more emissions are bad news: increases in red, reductions in green
  return (
    <WaterfallChart
      steps={steps}
      start={BASELINE}
      name={t("emissions.name")}
      format={kt}
      upColor="var(--danger-color, #dc2626)"
      downColor="var(--success-color, #16a34a)"
      totalColor="var(--text-secondary-color, #64748b)"
      yAxis={{ format: kt, min: 0 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: TARGET,
          color: "var(--success-color, #16a34a)",
          dash: [6, 4],
          label: t("emissions.target"),
        },
      ]}
      renderTooltip={(event) => {
        const item = event.items[0];
        if (!item) return null;
        const step = steps[item.index];
        const change = item.y0 === undefined ? null : item.y - item.y0;
        return (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{step?.label ?? event.xLabel}</strong>
            {change === null ? (
              <span>{kt(item.y)}</span>
            ) : (
              <>
                <span>{t("emissions.change", { value: signed(change) })}</span>
                <span>
                  {t("emissions.range", {
                    from: kt(item.y0 ?? 0),
                    to: kt(item.y),
                  })}
                </span>
              </>
            )}
            <span style={{ color: "var(--text-muted-color)" }}>
              {t("emissions.gap", { value: kt(item.y - TARGET) })}
            </span>
          </div>
        );
      }}
      height={340}
      ariaLabel={t("emissions.aria")}
    />
  );
}
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Headcount of the engineering department over the year
const movements = [
  ["hires", 46],
  ["internalIn", 9],
  ["resignations", -21],
  ["internalOut", -7],
  ["retirements", -3],
] as const;

export default function HeadcountDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const integer = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { signDisplay: "auto" });
    return (value: number) => format.format(value);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("startOfYear"), kind: "subtotal" },
      ...movements.map(([key, value]) => ({
        label: t(\`movements.\${key}\`),
        value,
      })),
      { label: t("endOfYear"), kind: "total" },
    ],
    [t],
  );

  // custom colors: arrivals in blue, departures in amber
  return (
    <WaterfallChart
      steps={steps}
      start={212}
      name={t("people")}
      format={integer}
      upColor="var(--chart-series-1, #4f46e5)"
      downColor="var(--warning-color, #f59e0b)"
      totalColor="var(--text-secondary-color, #64748b)"
      yAxis={{ min: 150 }}
      height={300}
      ariaLabel={t("headcountAria")}
    />
  );
}
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

const WORK = "var(--chart-series-1, #4f46e5)";
const WAIT = "var(--warning-color, #f59e0b)";

// Order-to-delivery lead time (days): each stage adds its duration; the
// stages where the order only waits get their own color
const STAGES = [
  ["orderEntry", 0.5, "work"],
  ["creditCheck", 1, "wait"],
  ["picking", 1.5, "work"],
  ["quality", 0.5, "work"],
  ["carrierWait", 2, "wait"],
  ["transit", 3.5, "work"],
  ["customs", 1, "wait"],
] as const;

const TOTAL = STAGES.reduce((sum, [, days]) => sum + days, 0);
const WORKING = STAGES.reduce(
  (sum, [, days, kind]) => (kind === "work" ? sum + days : sum),
  0,
);

export default function LeadTimeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;

  const days = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "day",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  const steps = useMemo(
    (): WaterfallStep[] => [
      ...STAGES.map(([key, value, kind]) => ({
        label: t(\`lead.\${key}\`),
        value,
        color: kind === "work" ? WORK : WAIT,
      })),
      { label: t("lead.total"), kind: "total" },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        name={t("lead.name")}
        format={days}
        totalColor="var(--text-secondary-color, #64748b)"
        connector={{ dash: [], color: "var(--border-color, #cbd5e1)" }}
        yAxis={{ format: days }}
        height={320}
        ariaLabel={t("lead.aria")}
      />
      <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
        <span aria-hidden style={{ color: WORK }}>
          ■
        </span>{" "}
        {t("lead.work")}{" "}
        <span aria-hidden style={{ color: WAIT }}>
          ■
        </span>{" "}
        {t("lead.wait")} ·{" "}
        {t("lead.summary", {
          work: days(WORKING),
          total: days(TOTAL),
          share: percent.format(WORKING / TOTAL),
        })}
      </p>
    </div>
  );
}
`})))()}var Je;function $(){return($=e((()=>{Je=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

/** Small seeded random generator: the same "transactions" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Kind = "customer" | "supplier" | "payroll" | "card" | "refund";
type Txn = { kind: Kind; amount: number; minute: number };

// amounts in k€: [kind, likelihood, min, max]
const KINDS: [Kind, number, number, number][] = [
  ["customer", 0.45, 6, 42],
  ["supplier", 0.3, -34, -5],
  ["card", 0.13, -1.6, -0.2],
  ["refund", 0.08, -4, -1],
  ["payroll", 0.04, -85, -60],
];

// transaction \`i\` only depends on \`i\`: pure, so the state updates are too
const transaction = (i: number, after: number): Txn => {
  const random = mulberry32(1000 + i);
  let roll = random();
  const [kind, , min, max] =
    KINDS.find(([, chance]) => (roll -= chance) < 0) ?? KINDS[0];
  const amount = Math.round((min + (max - min) * random()) * 10) / 10;
  return { kind, amount, minute: after + 2 + Math.floor(random() * 9) };
};

const WINDOW = 8;
const OPENING = 1240;

interface Ledger {
  count: number;
  // balance before the first transaction shown
  base: number;
  shown: Txn[];
}

const advance = (ledger: Ledger): Ledger => {
  const last = ledger.shown[ledger.shown.length - 1];
  const shown = [...ledger.shown, transaction(ledger.count, last?.minute ?? 0)];
  const dropped = shown.length > WINDOW ? shown.shift() : undefined;
  return {
    count: ledger.count + 1,
    base: ledger.base + (dropped?.amount ?? 0),
    shown,
  };
};

const initial = (): Ledger => {
  let ledger: Ledger = { count: 0, base: OPENING, shown: [] };
  for (let i = 0; i < WINDOW; i++) ledger = advance(ledger);
  return ledger;
};

// the simulated day starts at 09:00
const DAY_START = new Date(2026, 9, 30, 9, 0).getTime();

export default function LiveBalanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [ledger, setLedger] = useState(initial);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setLedger(advance), 2000);
    return () => window.clearInterval(timer);
  }, [running]);

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const signed = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const clock = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );
  const time = (minute: number) => clock.format(DAY_START + minute * 60_000);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("live.opening"), kind: "subtotal" },
      ...ledger.shown.map((txn) => ({
        label: clock.format(DAY_START + txn.minute * 60_000),
        value: txn.amount,
      })),
      { label: t("live.now"), kind: "total" },
    ],
    [t, ledger, clock],
  );

  // zoom on the changes: the lowest running total minus a margin
  const lowest = ledger.shown.reduce(
    (acc, txn) => {
      const running = acc.running + txn.amount;
      return { running, min: Math.min(acc.min, running) };
    },
    { running: ledger.base, min: ledger.base },
  ).min;
  const last = ledger.shown[ledger.shown.length - 1];

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        start={ledger.base}
        name={t("live.name")}
        format={euros}
        labels={false}
        yAxis={{ format: euros, min: Math.floor((lowest - 120) / 50) * 50 }}
        height={320}
        ariaLabel={t("live.aria")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
          {last &&
            t("live.last", {
              time: time(last.minute),
              kind: t(\`live.kinds.\${last.kind}\`),
              amount: signed(last.amount),
            })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("live.pause") : t("live.resume")}
        </Button>
      </div>
    </div>
  );
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  WaterfallChart,
  type WaterfallChartProps,
  type WaterfallStep,
} from "minerva-design/charts";

type Orientation = NonNullable<WaterfallChartProps["orientation"]>;

// Story points of a sprint: from the commitment to what was delivered
const CHANGES = [
  ["added", 9],
  ["removed", -6],
  ["reestimated", 3],
  ["carriedOver", -11],
] as const;
const COMMITTED = 48;
const ORIENTATIONS: Orientation[] = ["vertical", "horizontal"];

export default function OptionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [labels, setLabels] = useState(true);
  const [connector, setConnector] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("vertical");

  const points = useMemo(() => {
    const format = new Intl.NumberFormat(locale);
    return (value: number) => format.format(value);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("scope.committed"), kind: "subtotal" },
      ...CHANGES.map(([key, value]) => ({ label: t(\`scope.\${key}\`), value })),
      { label: t("scope.completed"), kind: "total" },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("scope.orientation")}
          direction="horizontal"
          value={orientation}
          onChange={(value) => setOrientation(value as Orientation)}
        >
          {ORIENTATIONS.map((value) => (
            <Radio key={value} value={value} label={t(\`scope.\${value}\`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labels}
          onChange={setLabels}
          label={t("scope.labels")}
        />
        <Switch
          checked={connector}
          onChange={setConnector}
          label={t("scope.connector")}
        />
      </HStack>
      <WaterfallChart
        steps={steps}
        start={COMMITTED}
        name={t("scope.name")}
        format={points}
        labels={labels}
        connector={connector}
        orientation={orientation}
        height={320}
        ariaLabel={t("scope.aria")}
      />
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Income statement of the year (M$): from the revenue (482 M$, the start)
// to the net income
const lines = [
  ["revenue", "subtotal"],
  ["costOfSales", -191],
  ["grossProfit", "subtotal"],
  ["research", -74],
  ["marketing", -63],
  ["admin", -38],
  ["operatingIncome", "subtotal"],
  ["interest", 6],
  ["tax", -27],
  ["netIncome", "total"],
] as const;

export default function PnlDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  // changes start where the previous bar ended; subtotals and totals
  // show the running total from zero
  const steps = useMemo(
    (): WaterfallStep[] =>
      lines.map(([key, value]) =>
        typeof value === "number"
          ? { label: t(\`pnl.\${key}\`), value }
          : { label: t(\`pnl.\${key}\`), kind: value },
      ),
    [t],
  );

  return (
    <WaterfallChart
      steps={steps}
      start={482}
      name={t("amount")}
      format={usd}
      yAxis={{ format: usd }}
      height={340}
      ariaLabel={t("pnlAria")}
    />
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Price waterfall of one unit (€): from the list price to the pocket price
// the company really keeps, through the on- and off-invoice leakages
const LIST_PRICE = 120;
const LINES = [
  ["listPrice", "subtotal"],
  ["dealerDiscount", -12],
  ["promotion", -6],
  ["invoicePrice", "subtotal"],
  ["paymentTerms", -2.4],
  ["freight", -3.6],
  ["rebates", -4.8],
  ["pocketPrice", "total"],
] as const;

// value shown by every bar: the change, or the running total of a subtotal
const VALUES = LINES.reduce<{ running: number; values: number[] }>(
  (acc, [, value]) =>
    typeof value === "number"
      ? {
          running: acc.running + value,
          values: [...acc.values, value],
        }
      : { running: acc.running, values: [...acc.values, acc.running] },
  { running: LIST_PRICE, values: [] },
).values;

export default function PriceBridgeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const steps = useMemo(
    (): WaterfallStep[] =>
      LINES.map(([key, value]) =>
        typeof value === "number"
          ? { label: t(\`price.\${key}\`), value }
          : { label: t(\`price.\${key}\`), kind: value },
      ),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        start={LIST_PRICE}
        name={t("price.name")}
        format={euros}
        yAxis={{ format: euros, min: 60 }}
        onPointClick={(event) => {
          const index = event.items[0]?.index;
          if (index !== undefined && LINES[index]) setSelected(index);
        }}
        height={320}
        ariaLabel={t("price.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {selected === null
          ? t("price.hint")
          : t("price.selected", {
              step: steps[selected].label,
              value: euros(VALUES[selected]),
              share: percent.format(Math.abs(VALUES[selected]) / LIST_PRICE),
            })}
      </output>
    </div>
  );
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// From the budgeted to the actual operating margin (M€): the drivers of
// the variance, one row each
const drivers = [
  ["volume", 4.2],
  ["price", 2.6],
  ["mix", -1.1],
  ["exchangeRates", -2.4],
  ["rawMaterials", -3.3],
  ["savings", 1.8],
] as const;

export default function VarianceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 1,
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("budget"), kind: "subtotal" },
      ...drivers.map(([key, value]) => ({ label: t(\`drivers.\${key}\`), value })),
      { label: t("actual"), kind: "total" },
    ],
    [t],
  );

  return (
    <WaterfallChart
      steps={steps}
      start={38}
      orientation="horizontal"
      name={t("variance")}
      format={euros}
      yAxis={{ format: euros, min: 30 }}
      height={340}
      ariaLabel={t("varianceAria")}
    />
  );
}
`})))()}var rt,it,at;function ot(){return(ot=e((()=>{oe(),T(),de(),he(),L(),Se(),De(),je(),Ne(),Le(),ze(),Ve(),Ue(),Ge(),qe(),$(),Xe(),Qe(),et(),nt(),t(),ee(),ne(),rt=n(),it=h(Object.assign({"./demos/arr-bridge.tsx":re,"./demos/cash-flow.tsx":se,"./demos/emissions.tsx":ce,"./demos/headcount.tsx":fe,"./demos/lead-time.tsx":ge,"./demos/live-balance.tsx":ve,"./demos/options.tsx":Ce,"./demos/pnl.tsx":Oe,"./demos/price-bridge.tsx":Me,"./demos/variance.tsx":Pe}),Object.assign({"./demos/arr-bridge.tsx":Re,"./demos/cash-flow.tsx":Be,"./demos/emissions.tsx":He,"./demos/headcount.tsx":We,"./demos/lead-time.tsx":Ke,"./demos/live-balance.tsx":Je,"./demos/options.tsx":Ye,"./demos/pnl.tsx":Ze,"./demos/price-bridge.tsx":$e,"./demos/variance.tsx":tt})),at=()=>(0,rt.jsx)(te,{id:`waterfall-chart`,demos:it})})))()}ot();export{at as default};