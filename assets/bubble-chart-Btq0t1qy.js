import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{n as s,t as c}from"./Switch-CHbzff3y.js";import{l,n as u,t as d,u as ee}from"./DocPage-BNEhhzRL.js";import{f,m as p}from"./charts-JJDQ3gS7.js";function te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,i=(0,m.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),a=(0,m.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{month:`short`,timeZone:`UTC`});return t=>e.format(t)},[n]),o=(0,m.useMemo)(()=>{let e=new Intl.NumberFormat(n,{maximumFractionDigits:1});return t=>`${e.format(t)}×`},[n]),s=(0,m.useMemo)(()=>{let t=new Intl.DateTimeFormat(n,{month:`short`,day:`numeric`,timeZone:`UTC`});return Object.keys(g).map(n=>({name:e(`channels.${n}`),valueName:e(`budget`),format:i,data:g[n].map(([n,r,i,a])=>{let o=Date.UTC(2026,n,r);return{x:o,y:i,value:a,label:e(`launchedOn`,{date:t.format(o)})}})}))},[e,n,i]);return(0,h.jsx)(f,{series:s,minSize:8,maxSize:48,legend:{position:`bottom`,toggle:!0},xAxis:{type:`time`,min:Date.UTC(2025,11,15),max:Date.UTC(2026,11,20),format:a,title:e(`launch`)},yAxis:{title:e(`roas`),min:0,max:8,format:o},annotations:[{type:`rect`,y1:1,color:`var(--danger-color)`,opacity:.08},{type:`line`,axis:`y`,value:1,color:`var(--danger-color)`,dash:[4,4],label:e(`breakEven`)}],height:380,ariaLabel:e(`campaignsAria`)})}var m,h,g;function _(){return(_=e((()=>{m=t(),i(),p(),h=n(),g={search:[[0,12,3.4,42],[2,3,2.9,55],[4,20,3.8,38],[7,8,3.1,61],[9,15,4.2,47]],social:[[1,6,1.6,70],[3,18,.8,85],[5,2,1.9,52],[8,11,2.3,64],[10,24,1.2,90]],video:[[2,22,.6,120],[6,1,1.4,140],[9,4,.9,110]],email:[[0,28,5.6,8],[3,9,4.8,12],[5,27,6.3,6],[8,2,5.1,10],[11,1,7.2,14]]}})))()}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,i=(0,v.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=new Intl.NumberFormat(n,{notation:`compact`});return Object.keys(b).map(n=>({name:e(`continents.${n}`),valueName:e(`population`),format:e=>r.format(e*1e6),data:b[n].map(([e,n,r,i])=>({x:n,y:r,value:i,label:t.of(e)??e}))}))},[e,n]),a=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,y.jsx)(f,{series:i,maxSize:64,xAxis:{title:e(`gdp`),format:a,min:0,max:90},yAxis:{title:e(`lifeExpectancy`)},height:380,ariaLabel:e(`countriesAria`)})}var v,y,b;function x(){return(x=e((()=>{v=t(),i(),p(),y=n(),b={asia:[[`CN`,23.3,78.6,1410],[`IN`,9.2,70.8,1430],[`JP`,47,84.7,124],[`ID`,15,71.9,278],[`KR`,51,83.7,52]],europe:[[`DE`,66,81,84],[`FR`,58,82.8,68],[`GB`,54,81.3,68],[`PL`,45,78.6,37]],americas:[[`US`,80,77.5,335],[`BR`,20,75.9,216],[`MX`,23,75.1,129],[`CA`,58,82.6,40]],africa:[[`NG`,5.9,54.5,224],[`EG`,17,71.6,113],[`ZA`,15,64.9,60],[`ET`,3,66.6,127]]}})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,[i,a]=(0,S.useState)(null),o=(0,S.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=new Intl.NumberFormat(n,{notation:`compact`});return Object.keys(w).map(n=>({name:e(`continents.${n}`),valueName:e(`population`),format:e=>r.format(e*1e6),data:w[n].map(([e,n,r,i])=>({x:n,y:r,value:i,label:t.of(e)??e}))}))},[e,n]),s=(0,S.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t)},[n]);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,C.jsx)(f,{series:o,maxSize:56,xAxis:{type:`log`,title:e(`gdpLog`),format:s,grid:!0},yAxis:{title:e(`lifeExpectancy`)},annotations:[{type:`line`,axis:`x`,value:13845,label:e(`highIncome`)}],onZoom:a,height:400,ariaLabel:e(`logAria`)}),(0,C.jsx)(`span`,{style:{fontSize:13,color:`var(--text-secondary-color)`},children:i?e(`visibleIncomes`,{from:s(i.x[0]),to:s(i.x[1])}):e(`zoomHint`)})]})}var S,C,w;function T(){return(T=e((()=>{S=t(),i(),p(),C=n(),w={africa:[[`BI`,900,62,13],[`CD`,1500,59.7,102],[`ET`,3e3,66.6,127],[`NG`,5900,54.5,224],[`KE`,6e3,62.7,55],[`MA`,9800,75,37],[`ZA`,15e3,64.9,60],[`EG`,17e3,71.6,113]],asia:[[`PK`,6400,66.4,240],[`BD`,8600,73.7,173],[`IN`,9200,70.8,1430],[`ID`,15e3,71.9,278],[`CN`,23300,78.6,1410],[`JP`,47e3,84.7,124],[`SG`,133e3,83.7,6]],europe:[[`UA`,15e3,73,37],[`PL`,45e3,78.6,37],[`FR`,58e3,82.8,68],[`DE`,66e3,81,84],[`NO`,9e4,83.2,5.5],[`LU`,14e4,83,.7]],americas:[[`HT`,3200,63.7,12],[`BR`,2e4,75.9,216],[`MX`,23e3,75.1,129],[`AR`,27e3,76.1,46],[`CA`,58e3,82.6,40],[`US`,8e4,77.5,335]]}})))()}function ie(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,[i,a]=(0,E.useState)(null),o=(0,E.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),s=(0,E.useMemo)(()=>O.map((t,n)=>({name:e(`stages.${t}`),valueName:e(`amount`),format:o,data:(k[n]??[]).map(t=>({x:t.days,y:t.probability,value:t.amount,label:e(`deal`,{id:t.id.split(`-`)[1]})}))})),[e,o]);return(0,D.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,width:`100%`},children:[(0,D.jsx)(f,{series:s,maxSize:44,xAxis:{title:e(`daysInPipeline`)},yAxis:{title:e(`winProbability`),format:e=>`${e}%`,min:0,max:100},onPointClick:t=>{let n=t.items[0];n?.value!==void 0&&a(e(`dealStatus`,{deal:n.label,stage:n.seriesName,amount:o(n.value)}))},height:340,ariaLabel:e(`pipelineAria`)}),(0,D.jsx)(`div`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:i??e(`clickBubble`)})]})}var E,D,O,k;function A(){return(A=e((()=>{E=t(),i(),p(),D=n(),O=[`qualified`,`proposal`,`negotiation`],k=(()=>{let e=ie(3);return O.map((t,n)=>Array.from({length:14},(r,i)=>({id:`${t}-${i}`,days:Math.round(5+e()*40+n*18),probability:Math.min(95,Math.round(15+n*25+e()*25)),amount:Math.round(8+e()**2*180)})))})()})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,[i,a]=(0,j.useState)(N),[s,c]=(0,j.useState)(!1),l=i>=P;(0,j.useEffect)(()=>{if(!s)return;let e=setInterval(()=>a(e=>Math.min(e+1,P)),300);return()=>clearInterval(e)},[s]);let u=(0,j.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=new Intl.NumberFormat(n,{notation:`compact`});return Object.keys(F).map(n=>({name:e(`continents.${n}`),valueName:e(`population`),format:e=>r.format(e*1e6),data:F[n].map(([e,n,r,a,o,s,c])=>({x:L(n,r,i),y:L(a,o,i),value:L(s,c,i),label:t.of(e)??e}))}))},[e,n,i]),d=new Intl.NumberFormat(n,{useGrouping:!1}).format(i);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,M.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,M.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{l&&a(N),c(l||!s)},children:e(l?`replay`:s?`pause`:`play`)}),(0,M.jsx)(o,{size:`small`,variant:`ghost`,onClick:()=>{c(!1),a(N)},children:e(`restart`)}),(0,M.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:e(`yearStatus`,{year:d})})]}),(0,M.jsx)(f,{series:u,minSize:6,maxSize:64,maxValue:I,xAxis:{title:e(`fertility`),min:.5,max:8},yAxis:{title:e(`lifeExpectancy`),min:40,max:90},annotations:[{type:`text`,x:7.8,y:88,text:d,anchor:`right`,weight:700}],height:380,ariaLabel:e(`playbackAria`)})]})}var j,M,N,P,F,I,L;function R(){return(R=e((()=>{j=t(),i(),a(),p(),M=n(),N=1990,P=2025,F={asia:[[`CN`,2.5,1,69,78,1135,1410],[`IN`,4,2,58,72,870,1450],[`BD`,4.5,2,58,74,107,175],[`JP`,1.5,1.2,79,85,124,123]],europe:[[`DE`,1.5,1.4,75,81,79,84],[`IT`,1.3,1.2,77,84,57,59],[`PL`,2,1.2,71,78,38,37]],americas:[[`US`,2.1,1.6,75,79,250,345],[`BR`,2.8,1.6,66,76,150,212],[`MX`,3.4,1.8,70,75,84,131]],africa:[[`NG`,6.4,4.5,46,55,95,233],[`ET`,7.1,3.9,47,67,48,132],[`EG`,4.4,2.7,64,72,57,117],[`KE`,6,3.2,57,64,24,57]]},I=Math.max(...Object.values(F).flatMap(e=>e.map(e=>e[6]))),L=(e,t,n)=>{let r=(n-N)/35;return e+(t-e)*(r*r*(3-2*r))}})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,i=(0,z.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`});return t=>e.format(t*1e6)},[n]),a=(0,z.useMemo)(()=>[{name:e(`products`),valueName:e(`revenue`),format:i,showLabels:!0,data:V.map(([t,n,r,i])=>({x:n,y:r,value:i,label:e(`portfolio.${t}`)}))}],[e,i]);return(0,B.jsx)(f,{series:a,minSize:10,maxSize:70,xAxis:{title:e(`marketShare`),min:0,max:3},yAxis:{title:e(`marketGrowth`),format:e=>`${e}%`},annotations:[{type:`line`,axis:`x`,value:1,label:e(`leader`)},{type:`line`,axis:`y`,value:8,label:e(`highGrowth`)}],legend:!1,height:380,ariaLabel:e(`portfolioAria`)})}var z,B,V;function H(){return(H=e((()=>{z=t(),i(),p(),B=n(),V=[[`cloudStorage`,1.8,14,120],[`analytics`,.6,18,45],[`mobileSdk`,.3,11,12],[`payments`,2.4,4,210],[`desktop`,1.2,1.5,95],[`hardware`,.4,-2,30],[`consulting`,.8,6,38]]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,i=(0,U.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`});return t=>e.format(t*1e3)},[n]),a=(0,U.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:1}),[n]),o=(0,U.useMemo)(()=>Object.keys(G).map(t=>({name:e(`teams.${t}`),valueName:e(`exposure`),format:i,data:G[t].map(([t,n,r,i])=>({x:n,y:r,value:i,label:e(`risks.${t}`)}))})),[e,i]),s=(0,U.useMemo)(()=>[{type:`rect`,x1:2.5,y1:2.5,color:`var(--success-color)`,opacity:.1,label:e(`zones.low`),labelPosition:`bottom-left`},{type:`rect`,x0:3.5,y0:3.5,color:`var(--danger-color)`,opacity:.12,label:e(`zones.high`),labelPosition:`top-right`}],[e]);return(0,W.jsx)(f,{series:o,minSize:10,maxSize:60,annotations:s,xAxis:{title:e(`likelihood`),min:1,max:5,tickCount:5},yAxis:{title:e(`impact`),min:1,max:5,tickCount:5},renderTooltip:t=>{let n=t.items[0];return n?(0,W.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,W.jsx)(`strong`,{children:n.label}),(0,W.jsx)(`span`,{children:n.seriesName}),(0,W.jsx)(`span`,{children:e(`riskScore`,{likelihood:a.format(n.x),impact:a.format(n.y),score:a.format(n.x*n.y)})}),(0,W.jsx)(`span`,{children:e(`exposureRow`,{value:i(n.value??0)})})]}):null},height:380,ariaLabel:e(`riskAria`)})}var U,W,G;function K(){return(K=e((()=>{U=t(),i(),p(),W=n(),G={infrastructure:[[`powerOutage`,1.9,4.6,420],[`hardwareDelay`,3.7,3.2,180],[`networkCutover`,3.1,4.1,260]],security:[[`dataLeak`,1.6,4.9,650],[`accessReview`,3.9,2.2,45]],people:[[`keyPerson`,2.6,3.4,120],[`vendorSkills`,4.2,2.8,90],[`trainingGap`,4.4,1.6,30]],budget:[[`licenseCost`,3.4,2.6,140],[`exchangeRate`,2.2,1.8,60]]}})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bubble-chart.data`}),n=t.language,[i,a]=(0,q.useState)(!0),o=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e6)},[n]),s=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`});return t=>e.format(t*1e3)},[n]),l=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0});return t=>e.format(t/100)},[n]),u=(0,q.useMemo)(()=>t=>ue.map((n,r)=>{let[i,a,s]=Y[t][r];return{name:e(`regions.${n}`),valueName:e(`revenue`),format:o,data:[{x:i,y:a,value:s}]}}),[e,o]);return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,J.jsx)(c,{checked:i,onChange:a,label:e(`sharedScale`)}),(0,J.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:i?e(`sharedScaleOn`,{value:o(X)}):e(`sharedScaleOff`)}),(0,J.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:16},children:Object.keys(Y).map(t=>(0,J.jsxs)(`figure`,{style:{margin:0},children:[(0,J.jsx)(`figcaption`,{style:{fontWeight:600,marginBottom:4},children:new Intl.NumberFormat(n,{useGrouping:!1}).format(Number(t))}),(0,J.jsx)(f,{series:u(t),maxSize:56,maxValue:i?X:void 0,legend:{position:`bottom`},xAxis:{title:e(`salesPerMeter`),min:3,max:8.5,format:s},yAxis:{title:e(`margin`),min:10,max:30,format:l},height:280,ariaLabel:e(`sharedScaleAria`,{year:t})})]},t))})]})}var q,J,ue,Y,X;function Z(){return(Z=e((()=>{q=t(),i(),s(),p(),J=n(),ue=[`north`,`south`,`east`,`west`,`center`],Y={2025:[[5.2,18,24],[4.1,22,15],[6.3,15,31],[3.8,26,9],[7,20,40]],2026:[[5.9,19,52],[4.6,24,33],[6.8,14,61],[4.4,27,22],[7.6,21,88]]},X=Math.max(...Object.values(Y).flatMap(e=>e.map(e=>e[2])))})))()}var Q;function de(){return(de=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Marketing campaigns of 2026: launch (month, day), return on ad spend and
// budget (k$), by channel
const campaigns = {
  search: [
    [0, 12, 3.4, 42],
    [2, 3, 2.9, 55],
    [4, 20, 3.8, 38],
    [7, 8, 3.1, 61],
    [9, 15, 4.2, 47],
  ],
  social: [
    [1, 6, 1.6, 70],
    [3, 18, 0.8, 85],
    [5, 2, 1.9, 52],
    [8, 11, 2.3, 64],
    [10, 24, 1.2, 90],
  ],
  video: [
    [2, 22, 0.6, 120],
    [6, 1, 1.4, 140],
    [9, 4, 0.9, 110],
  ],
  email: [
    [0, 28, 5.6, 8],
    [3, 9, 4.8, 12],
    [5, 27, 6.3, 6],
    [8, 2, 5.1, 10],
    [11, 1, 7.2, 14],
  ],
} as const;
type Channel = keyof typeof campaigns;

export default function CampaignsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const month = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const roas = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => \`\${format.format(value)}×\`;
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const day = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return (Object.keys(campaigns) as Channel[]).map((channel) => ({
      name: t(\`channels.\${channel}\`),
      valueName: t("budget"),
      format: usd,
      data: campaigns[channel].map(([m, d, ratio, budget]) => {
        const launch = Date.UTC(2026, m, d);
        return {
          x: launch,
          y: ratio,
          value: budget,
          label: t("launchedOn", { date: day.format(launch) }),
        };
      }),
    }));
  }, [t, locale, usd]);

  // click the legend items to hide or show a channel
  return (
    <BubbleChart
      series={series}
      minSize={8}
      maxSize={48}
      legend={{ position: "bottom", toggle: true }}
      xAxis={{
        type: "time",
        min: Date.UTC(2025, 11, 15),
        max: Date.UTC(2026, 11, 20),
        format: month,
        title: t("launch"),
      }}
      yAxis={{ title: t("roas"), min: 0, max: 8, format: roas }}
      annotations={[
        {
          type: "rect",
          y1: 1,
          color: "var(--danger-color)",
          opacity: 0.08,
        },
        {
          type: "line",
          axis: "y",
          value: 1,
          color: "var(--danger-color)",
          dash: [4, 4],
          label: t("breakEven"),
        },
      ]}
      height={380}
      ariaLabel={t("campaignsAria")}
    />
  );
}
`})))()}var fe;function pe(){return(pe=e((()=>{fe=`import { useMemo } from "react";
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
`})))()}var me;function he(){return(he=e((()=>{me=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BubbleChart,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";

// GDP per capita (US$, PPP), life expectancy (years) and population
// (millions): incomes span two orders of magnitude, a log axis spreads them
const countries = {
  africa: [
    ["BI", 900, 62.0, 13],
    ["CD", 1_500, 59.7, 102],
    ["ET", 3_000, 66.6, 127],
    ["NG", 5_900, 54.5, 224],
    ["KE", 6_000, 62.7, 55],
    ["MA", 9_800, 75.0, 37],
    ["ZA", 15_000, 64.9, 60],
    ["EG", 17_000, 71.6, 113],
  ],
  asia: [
    ["PK", 6_400, 66.4, 240],
    ["BD", 8_600, 73.7, 173],
    ["IN", 9_200, 70.8, 1430],
    ["ID", 15_000, 71.9, 278],
    ["CN", 23_300, 78.6, 1410],
    ["JP", 47_000, 84.7, 124],
    ["SG", 133_000, 83.7, 6],
  ],
  europe: [
    ["UA", 15_000, 73.0, 37],
    ["PL", 45_000, 78.6, 37],
    ["FR", 58_000, 82.8, 68],
    ["DE", 66_000, 81.0, 84],
    ["NO", 90_000, 83.2, 5.5],
    ["LU", 140_000, 83.0, 0.7],
  ],
  americas: [
    ["HT", 3_200, 63.7, 12],
    ["BR", 20_000, 75.9, 216],
    ["MX", 23_000, 75.1, 129],
    ["AR", 27_000, 76.1, 46],
    ["CA", 58_000, 82.6, 40],
    ["US", 80_000, 77.5, 335],
  ],
} as const;

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [view, setView] = useState<ChartView | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const people = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as (keyof typeof countries)[]).map((c) => ({
      name: t(\`continents.\${c}\`),
      valueName: t("population"),
      format: (value: number) => people.format(value * 1e6),
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
    return (value: number) => format.format(value);
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BubbleChart
        series={series}
        maxSize={56}
        // ×10 income = the same distance anywhere on the axis
        xAxis={{
          type: "log",
          title: t("gdpLog"),
          format: usd,
          grid: true,
        }}
        yAxis={{ title: t("lifeExpectancy") }}
        annotations={[
          {
            type: "line",
            axis: "x",
            value: 13_845,
            label: t("highIncome"),
          },
        ]}
        // the view is in dollars, not in logarithms
        onZoom={setView}
        height={400}
        ariaLabel={t("logAria")}
      />
      <span style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
        {view
          ? t("visibleIncomes", { from: usd(view.x[0]), to: usd(view.x[1]) })
          : t("zoomHint")}
      </span>
    </div>
  );
}
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useMemo, useState } from "react";
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
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

const START = 1990;
const END = 2025;

// Fertility (children per woman), life expectancy (years) and population
// (millions) in 1990 and 2025, approximate, by continent
const countries = {
  asia: [
    ["CN", 2.5, 1.0, 69, 78, 1135, 1410],
    ["IN", 4.0, 2.0, 58, 72, 870, 1450],
    ["BD", 4.5, 2.0, 58, 74, 107, 175],
    ["JP", 1.5, 1.2, 79, 85, 124, 123],
  ],
  europe: [
    ["DE", 1.5, 1.4, 75, 81, 79, 84],
    ["IT", 1.3, 1.2, 77, 84, 57, 59],
    ["PL", 2.0, 1.2, 71, 78, 38, 37],
  ],
  americas: [
    ["US", 2.1, 1.6, 75, 79, 250, 345],
    ["BR", 2.8, 1.6, 66, 76, 150, 212],
    ["MX", 3.4, 1.8, 70, 75, 84, 131],
  ],
  africa: [
    ["NG", 6.4, 4.5, 46, 55, 95, 233],
    ["ET", 7.1, 3.9, 47, 67, 48, 132],
    ["EG", 4.4, 2.7, 64, 72, 57, 117],
    ["KE", 6.0, 3.2, 57, 64, 24, 57],
  ],
} as const;
type Continent = keyof typeof countries;
const largest = Math.max(
  ...Object.values(countries).flatMap((rows) => rows.map((row) => row[6])),
);

/** Smooth interpolation between the 1990 and the 2025 values */
const between = (from: number, to: number, year: number) => {
  const p = (year - START) / (END - START);
  return from + (to - from) * (p * p * (3 - 2 * p));
};

export default function PlaybackDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [year, setYear] = useState(START);
  const [playing, setPlaying] = useState(false);
  const atEnd = year >= END;

  // one year every 300 ms, stops on the last year
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setYear((value) => Math.min(value + 1, END)),
      300,
    );
    return () => clearInterval(timer);
  }, [playing]);

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const people = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as Continent[]).map((continent) => ({
      name: t(\`continents.\${continent}\`),
      valueName: t("population"),
      format: (value: number) => people.format(value * 1e6),
      data: countries[continent].map(
        ([code, f0, f1, life0, life1, pop0, pop1]) => ({
          x: between(f0, f1, year),
          y: between(life0, life1, year),
          value: between(pop0, pop1, year),
          label: names.of(code) ?? code,
        }),
      ),
    }));
  }, [t, locale, year]);
  const yearText = new Intl.NumberFormat(locale, {
    useGrouping: false,
  }).format(year);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => {
            if (atEnd) setYear(START);
            setPlaying(atEnd || !playing);
          }}
        >
          {atEnd ? t("replay") : playing ? t("pause") : t("play")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          onClick={() => {
            setPlaying(false);
            setYear(START);
          }}
        >
          {t("restart")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("yearStatus", { year: yearText })}
        </output>
      </div>
      <BubbleChart
        series={series}
        minSize={6}
        maxSize={64}
        // constant maxValue: a bubble grows only when its population does
        maxValue={largest}
        // fixed ranges, so the bubbles move and the axes stay still
        xAxis={{ title: t("fertility"), min: 0.5, max: 8 }}
        yAxis={{ title: t("lifeExpectancy"), min: 40, max: 90 }}
        annotations={[
          {
            type: "text",
            x: 7.8,
            y: 88,
            text: yearText,
            anchor: "right",
            weight: 700,
          },
        ]}
        height={380}
        ariaLabel={t("playbackAria")}
      />
    </div>
  );
}
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useMemo } from "react";
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
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BubbleChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Risk register of a data-center migration: likelihood and impact (1-5) and
// the cost exposure (k€) of each risk, by owning team
const risks = {
  infrastructure: [
    ["powerOutage", 1.9, 4.6, 420],
    ["hardwareDelay", 3.7, 3.2, 180],
    ["networkCutover", 3.1, 4.1, 260],
  ],
  security: [
    ["dataLeak", 1.6, 4.9, 650],
    ["accessReview", 3.9, 2.2, 45],
  ],
  people: [
    ["keyPerson", 2.6, 3.4, 120],
    ["vendorSkills", 4.2, 2.8, 90],
    ["trainingGap", 4.4, 1.6, 30],
  ],
  budget: [
    ["licenseCost", 3.4, 2.6, 140],
    ["exchangeRate", 2.2, 1.8, 60],
  ],
} as const;
type Team = keyof typeof risks;

export default function RiskMatrixDemo() {
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
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const decimal = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );

  const series = useMemo(
    (): ChartSeries[] =>
      (Object.keys(risks) as Team[]).map((team) => ({
        name: t(\`teams.\${team}\`),
        valueName: t("exposure"),
        format: euros,
        data: risks[team].map(([key, likelihood, impact, exposure]) => ({
          x: likelihood,
          y: impact,
          value: exposure,
          label: t(\`risks.\${key}\`),
        })),
      })),
    [t, euros],
  );
  // green, amber and red zones of the classic 5 × 5 matrix
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x1: 2.5,
        y1: 2.5,
        color: "var(--success-color)",
        opacity: 0.1,
        label: t("zones.low"),
        labelPosition: "bottom-left",
      },
      {
        type: "rect",
        x0: 3.5,
        y0: 3.5,
        color: "var(--danger-color)",
        opacity: 0.12,
        label: t("zones.high"),
        labelPosition: "top-right",
      },
    ],
    [t],
  );

  // bubbles are drawn largest first: read the hovered risk from the item
  // itself (label, x, y, value) rather than from its index
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{item.label}</strong>
        <span>{item.seriesName}</span>
        <span>
          {t("riskScore", {
            likelihood: decimal.format(item.x),
            impact: decimal.format(item.y),
            score: decimal.format(item.x * item.y),
          })}
        </span>
        <span>{t("exposureRow", { value: euros(item.value ?? 0) })}</span>
      </div>
    );
  };

  return (
    <BubbleChart
      series={series}
      minSize={10}
      maxSize={60}
      annotations={annotations}
      xAxis={{ title: t("likelihood"), min: 1, max: 5, tickCount: 5 }}
      yAxis={{ title: t("impact"), min: 1, max: 5, tickCount: 5 }}
      renderTooltip={tooltip}
      height={380}
      ariaLabel={t("riskAria")}
    />
  );
}
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Store regions: sales per m² (k$), margin (%) and yearly revenue (M$);
// the 2026 network is about twice as big as in 2025
const regions = ["north", "south", "east", "west", "center"] as const;
const years = {
  2025: [
    [5.2, 18, 24],
    [4.1, 22, 15],
    [6.3, 15, 31],
    [3.8, 26, 9],
    [7.0, 20, 40],
  ],
  2026: [
    [5.9, 19, 52],
    [4.6, 24, 33],
    [6.8, 14, 61],
    [4.4, 27, 22],
    [7.6, 21, 88],
  ],
} as const;
type Year = keyof typeof years;
const largest = Math.max(
  ...Object.values(years).flatMap((rows) => rows.map((row) => row[2])),
);

export default function SharedScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [shared, setShared] = useState(true);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const perMeter = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const seriesOf = useMemo(
    () =>
      (year: Year): ChartSeries[] =>
        regions.map((region, i) => {
          const [sales, margin, revenue] = years[year][i];
          return {
            name: t(\`regions.\${region}\`),
            valueName: t("revenue"),
            format: usd,
            data: [{ x: sales, y: margin, value: revenue }],
          };
        }),
    [t, usd],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch checked={shared} onChange={setShared} label={t("sharedScale")} />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {shared
          ? t("sharedScaleOn", { value: usd(largest) })
          : t("sharedScaleOff")}
      </output>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {(Object.keys(years) as unknown as Year[]).map((year) => (
          <figure key={year} style={{ margin: 0 }}>
            <figcaption style={{ fontWeight: 600, marginBottom: 4 }}>
              {new Intl.NumberFormat(locale, { useGrouping: false }).format(
                Number(year),
              )}
            </figcaption>
            <BubbleChart
              series={seriesOf(year)}
              maxSize={56}
              // the same maxValue draws the same revenue with the same area
              // in both charts; without it, each chart scales to its own max
              maxValue={shared ? largest : undefined}
              legend={{ position: "bottom" }}
              // same axis ranges, so the positions are comparable too
              xAxis={{
                title: t("salesPerMeter"),
                min: 3,
                max: 8.5,
                format: perMeter,
              }}
              yAxis={{ title: t("margin"), min: 10, max: 30, format: percent }}
              height={280}
              ariaLabel={t("sharedScaleAria", { year })}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
`})))()}var Ee,De,Oe;function $(){return($=e((()=>{_(),x(),T(),A(),R(),H(),K(),Z(),de(),pe(),he(),_e(),ye(),xe(),Ce(),Te(),t(),u(),ee(),Ee=n(),De=l(Object.assign({"./demos/campaigns.tsx":te,"./demos/countries.tsx":ne,"./demos/log-scale.tsx":re,"./demos/pipeline.tsx":ae,"./demos/playback.tsx":oe,"./demos/portfolio.tsx":se,"./demos/risk-matrix.tsx":ce,"./demos/shared-scale.tsx":le}),Object.assign({"./demos/campaigns.tsx":Q,"./demos/countries.tsx":fe,"./demos/log-scale.tsx":me,"./demos/pipeline.tsx":ge,"./demos/playback.tsx":ve,"./demos/portfolio.tsx":be,"./demos/risk-matrix.tsx":Se,"./demos/shared-scale.tsx":we})),Oe=()=>(0,Ee.jsx)(d,{id:`bubble-chart`,demos:De})})))()}$();export{Oe as default};