import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{l as a,n as o,t as s,u as c}from"./DocPage-4JD4uRu8.js";import{m as l,p as u}from"./charts-BHPM8b2-.js";function d(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,f.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`});return t=>e.format(t*1e3)},[n]),a=(0,f.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`});return[{label:e(`opening`),kind:`subtotal`},...m.map((e,n)=>({label:t.format(new Date(2026,n,1)),value:e})),{label:e(`closing`),kind:`total`}]},[e,n]);return(0,p.jsx)(u,{steps:a,start:250,labels:!1,name:e(`cashFlow`),format:i,totalColor:`var(--chart-series-5, #0ea5e9)`,yAxis:{format:i,min:200},height:320,ariaLabel:e(`cashAria`)})}var f,p,m;function h(){return(h=e((()=>{f=t(),i(),l(),p=n(),m=[38,-22,54,-61,12,47,-15,66,-40,29,18,-9]})))()}function g(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>{let e=new Intl.NumberFormat(n,{signDisplay:`auto`});return t=>e.format(t)},[n]),a=(0,_.useMemo)(()=>[{label:e(`startOfYear`),kind:`subtotal`},...y.map(([t,n])=>({label:e(`movements.${t}`),value:n})),{label:e(`endOfYear`),kind:`total`}],[e]);return(0,v.jsx)(u,{steps:a,start:212,name:e(`people`),format:i,upColor:`var(--chart-series-1, #4f46e5)`,downColor:`var(--warning-color, #f59e0b)`,totalColor:`var(--text-secondary-color, #64748b)`,yAxis:{min:150},height:300,ariaLabel:e(`headcountAria`)})}var _,v,y;function b(){return(b=e((()=>{_=t(),i(),l(),v=n(),y=[[`hires`,46],[`internalIn`,9],[`resignations`,-21],[`internalOut`,-7],[`retirements`,-3]]})))()}function x(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,S.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,S.useMemo)(()=>w.map(([t,n])=>typeof n==`number`?{label:e(`pnl.${t}`),value:n}:{label:e(`pnl.${t}`),kind:n}),[e]);return(0,C.jsx)(u,{steps:a,start:482,name:e(`amount`),format:i,yAxis:{format:i},height:340,ariaLabel:e(`pnlAria`)})}var S,C,w;function T(){return(T=e((()=>{S=t(),i(),l(),C=n(),w=[[`revenue`,`subtotal`],[`costOfSales`,-191],[`grossProfit`,`subtotal`],[`research`,-74],[`marketing`,-63],[`admin`,-38],[`operatingIncome`,`subtotal`],[`interest`,6],[`tax`,-27],[`netIncome`,`total`]]})))()}function E(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.waterfall-chart.data`}),n=t.language,i=(0,D.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:1,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,D.useMemo)(()=>[{label:e(`budget`),kind:`subtotal`},...k.map(([t,n])=>({label:e(`drivers.${t}`),value:n})),{label:e(`actual`),kind:`total`}],[e]);return(0,O.jsx)(u,{steps:a,start:38,orientation:`horizontal`,name:e(`variance`),format:i,yAxis:{format:i,min:30},height:340,ariaLabel:e(`varianceAria`)})}var D,O,k;function A(){return(A=e((()=>{D=t(),i(),l(),O=n(),k=[[`volume`,4.2],[`price`,2.6],[`mix`,-1.1],[`exchangeRates`,-2.4],[`rawMaterials`,-3.3],[`savings`,1.8]]})))()}var j;function M(){return(M=e((()=>{j=`import { useMemo } from "react";
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
`})))()}var N;function P(){return(P=e((()=>{N=`import { useMemo } from "react";
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
`})))()}var F;function I(){return(I=e((()=>{F=`import { useMemo } from "react";
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
`})))()}var L;function R(){return(R=e((()=>{L=`import { useMemo } from "react";
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
`})))()}var z,B,V;function H(){return(H=e((()=>{h(),b(),T(),A(),M(),P(),I(),R(),t(),o(),c(),z=n(),B=a(Object.assign({"./demos/cash-flow.tsx":d,"./demos/headcount.tsx":g,"./demos/pnl.tsx":x,"./demos/variance.tsx":E}),Object.assign({"./demos/cash-flow.tsx":j,"./demos/headcount.tsx":N,"./demos/pnl.tsx":F,"./demos/variance.tsx":L})),V=()=>(0,z.jsx)(s,{id:`waterfall-chart`,demos:B})})))()}H();export{V as default};