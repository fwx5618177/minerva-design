import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{l as a,n as o,t as s,u as c}from"./DocPage-6WUEs69-.js";import{d as l,m as u}from"./charts-D752pe3-.js";function d(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,i=(0,f.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=new Intl.NumberFormat(n,{notation:`compact`});return Object.keys(m).map(n=>({name:e(`continents.${n}`),valueName:e(`population`),format:e=>r.format(e*1e6),data:m[n].map(([e,n,r,i])=>({x:n,y:r,value:i,label:t.of(e)??e}))}))},[e,n]),a=(0,f.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,p.jsx)(l,{series:i,maxSize:64,xAxis:{title:e(`gdp`),format:a,min:0,max:90},yAxis:{title:e(`lifeExpectancy`)},height:380,ariaLabel:e(`countriesAria`)})}var f,p,m;function h(){return(h=e((()=>{f=t(),i(),u(),p=n(),m={asia:[[`CN`,23.3,78.6,1410],[`IN`,9.2,70.8,1430],[`JP`,47,84.7,124],[`ID`,15,71.9,278],[`KR`,51,83.7,52]],europe:[[`DE`,66,81,84],[`FR`,58,82.8,68],[`GB`,54,81.3,68],[`PL`,45,78.6,37]],americas:[[`US`,80,77.5,335],[`BR`,20,75.9,216],[`MX`,23,75.1,129],[`CA`,58,82.6,40]],africa:[[`NG`,5.9,54.5,224],[`EG`,17,71.6,113],[`ZA`,15,64.9,60],[`ET`,3,66.6,127]]}})))()}function g(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function _(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,[i,a]=(0,v.useState)(null),o=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),s=(0,v.useMemo)(()=>b.map((t,n)=>({name:e(`stages.${t}`),valueName:e(`amount`),format:o,data:(x[n]??[]).map(t=>({x:t.days,y:t.probability,value:t.amount,label:e(`deal`,{id:t.id.split(`-`)[1]})}))})),[e,o]);return(0,y.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,width:`100%`},children:[(0,y.jsx)(l,{series:s,maxSize:44,xAxis:{title:e(`daysInPipeline`)},yAxis:{title:e(`winProbability`),format:e=>`${e}%`,min:0,max:100},onPointClick:t=>{let n=t.items[0];n?.value!==void 0&&a(e(`dealStatus`,{deal:n.label,stage:n.seriesName,amount:o(n.value)}))},height:340,ariaLabel:e(`pipelineAria`)}),(0,y.jsx)(`div`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:i??e(`clickBubble`)})]})}var v,y,b,x;function S(){return(S=e((()=>{v=t(),i(),u(),y=n(),b=[`qualified`,`proposal`,`negotiation`],x=(()=>{let e=g(3);return b.map((t,n)=>Array.from({length:14},(r,i)=>({id:`${t}-${i}`,days:Math.round(5+e()*40+n*18),probability:Math.min(95,Math.round(15+n*25+e()*25)),amount:Math.round(8+e()**2*180)})))})()})))()}function C(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,i=(0,w.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,w.useMemo)(()=>[{name:e(`products`),valueName:e(`revenue`),format:i,showLabels:!0,data:E.map(([t,n,r,i])=>({x:n,y:r,value:i,label:e(`portfolio.${t}`)}))}],[e,i]);return(0,T.jsx)(l,{series:a,minSize:10,maxSize:70,xAxis:{title:e(`marketShare`),min:0,max:3},yAxis:{title:e(`marketGrowth`),format:e=>`${e}%`},annotations:[{type:`line`,axis:`x`,value:1,label:e(`leader`)},{type:`line`,axis:`y`,value:8,label:e(`highGrowth`)}],legend:!1,height:380,ariaLabel:e(`portfolioAria`)})}var w,T,E;function D(){return(D=e((()=>{w=t(),i(),u(),T=n(),E=[[`cloudStorage`,1.8,14,120],[`analytics`,.6,18,45],[`mobileSdk`,.3,11,12],[`payments`,2.4,4,210],[`desktop`,1.2,1.5,95],[`hardware`,.4,-2,30],[`consulting`,.8,6,38]]})))()}var O;function k(){return(k=e((()=>{O=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// GDP per capita (k$, PPP), life expectancy (years) and population
// (millions) of a few countries, by continent
const countries = {
  asia: [
    ["CN", 23.3, 78.6, 1410],
    ["IN", 9.2, 70.8, 1430],
    ["JP", 47.0, 84.7, 124],
    ["ID", 15.0, 71.9, 278],
    ["KR", 51.0, 83.7, 52],
  ],
  europe: [
    ["DE", 66.0, 81.0, 84],
    ["FR", 58.0, 82.8, 68],
    ["GB", 54.0, 81.3, 68],
    ["PL", 45.0, 78.6, 37],
  ],
  americas: [
    ["US", 80.0, 77.5, 335],
    ["BR", 20.0, 75.9, 216],
    ["MX", 23.0, 75.1, 129],
    ["CA", 58.0, 82.6, 40],
  ],
  africa: [
    ["NG", 5.9, 54.5, 224],
    ["EG", 17.0, 71.6, 113],
    ["ZA", 15.0, 64.9, 60],
    ["ET", 3.0, 66.6, 127],
  ],
} as const;

export default function CountriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const millions = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as (keyof typeof countries)[]).map((c) => ({
      name: t(\`continents.\${c}\`),
      valueName: t("population"),
      format: (value: number) => millions.format(value * 1e6),
      data: countries[c].map(([code, gdp, life, population]) => ({
        x: gdp,
        y: life,
        value: population,
        label: names.of(code) ?? code,
      })),
    }));
  }, [t, locale]);
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  // the bubble areas are proportional to the populations
  return (
    <BubbleChart
      series={series}
      maxSize={64}
      xAxis={{ title: t("gdp"), format: usd, min: 0, max: 90 }}
      yAxis={{ title: t("lifeExpectancy") }}
      height={380}
      ariaLabel={t("countriesAria")}
    />
  );
}
`})))()}var A;function j(){return(j=e((()=>{A=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const stages = ["qualified", "proposal", "negotiation"] as const;

// Open deals of a sales team: days in the pipeline, win probability and
// amount (k$)
const deals = (() => {
  const random = mulberry32(3);
  return stages.map((stage, s) =>
    Array.from({ length: 14 }, (_, i) => ({
      id: \`\${stage}-\${i}\`,
      days: Math.round(5 + random() * 40 + s * 18),
      probability: Math.min(95, Math.round(15 + s * 25 + random() * 25)),
      amount: Math.round(8 + random() ** 2 * 180),
    })),
  );
})();

export default function PipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<string | null>(null);
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] =>
      stages.map((stage, s) => ({
        name: t(\`stages.\${stage}\`),
        valueName: t("amount"),
        format: usd,
        data: (deals[s] ?? []).map((d) => ({
          x: d.days,
          y: d.probability,
          value: d.amount,
          label: t("deal", { id: d.id.split("-")[1] }),
        })),
      })),
    [t, usd],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <BubbleChart
        series={series}
        maxSize={44}
        xAxis={{ title: t("daysInPipeline") }}
        yAxis={{
          title: t("winProbability"),
          format: (v) => \`\${v}%\`,
          min: 0,
          max: 100,
        }}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item?.value !== undefined)
            setSelected(
              t("dealStatus", {
                deal: item.label,
                stage: item.seriesName,
                amount: usd(item.value),
              }),
            );
        }}
        height={340}
        ariaLabel={t("pipelineAria")}
      />
      <div role="status" style={{ color: "var(--text-secondary-color)" }}>
        {selected ?? t("clickBubble")}
      </div>
    </div>
  );
}
`})))()}var M;function N(){return(N=e((()=>{M=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Product portfolio: relative market share (x), market growth (y, %) and
// yearly revenue (M€, the bubbles), split in four quadrants
const products = [
  ["cloudStorage", 1.8, 14, 120],
  ["analytics", 0.6, 18, 45],
  ["mobileSdk", 0.3, 11, 12],
  ["payments", 2.4, 4, 210],
  ["desktop", 1.2, 1.5, 95],
  ["hardware", 0.4, -2, 30],
  ["consulting", 0.8, 6, 38],
] as const;

export default function PortfolioDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("products"),
        valueName: t("revenue"),
        format: euros,
        showLabels: true,
        data: products.map(([key, share, growth, revenue]) => ({
          x: share,
          y: growth,
          value: revenue,
          label: t(\`portfolio.\${key}\`),
        })),
      },
    ],
    [t, euros],
  );

  return (
    <BubbleChart
      series={series}
      minSize={10}
      maxSize={70}
      xAxis={{ title: t("marketShare"), min: 0, max: 3 }}
      yAxis={{ title: t("marketGrowth"), format: (v) => \`\${v}%\` }}
      annotations={[
        { type: "line", axis: "x", value: 1, label: t("leader") },
        { type: "line", axis: "y", value: 8, label: t("highGrowth") },
      ]}
      legend={false}
      height={380}
      ariaLabel={t("portfolioAria")}
    />
  );
}
`})))()}var P,F,I;function L(){return(L=e((()=>{h(),S(),D(),k(),j(),N(),t(),o(),c(),P=n(),F=a(Object.assign({"./demos/countries.tsx":d,"./demos/pipeline.tsx":_,"./demos/portfolio.tsx":C}),Object.assign({"./demos/countries.tsx":O,"./demos/pipeline.tsx":A,"./demos/portfolio.tsx":M})),I=()=>(0,P.jsx)(s,{id:`bubble-chart`,demos:F})})))()}L();export{I as default};