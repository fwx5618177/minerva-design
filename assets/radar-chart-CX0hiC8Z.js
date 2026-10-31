import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{n as a,t as o}from"./Checkbox-J_8ZSvM_.js";import{i as ee,r as s}from"./Stack-B3Kr9X_e.js";import{l as c,n as l,t as te,u}from"./DocPage-4JD4uRu8.js";import{c as d,f}from"./shapes-CNzyZo__.js";function p(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),n=t.language,i=(0,m.useMemo)(()=>g.map(t=>({name:e(`skills.${t}`),max:10})),[e]),a=(0,m.useMemo)(()=>[{name:e(`candidate`),values:_}],[e]),o=(0,m.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,h.jsx)(f,{indicators:i,series:a,format:t=>e(`outOf`,{value:o.format(t),max:10}),height:340,ariaLabel:e(`scorecardAria`)})}var m,h,g,_;function v(){return(v=e((()=>{m=t(),i(),d(),h=n(),g=[`problemSolving`,`coding`,`systemDesign`,`communication`,`collaboration`,`ownership`],_=[8.5,9,6.5,7,8,9]})))()}function y(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),[n,i]=(0,b.useState)([]),a=(0,b.useMemo)(()=>S.map(t=>({name:e(`capabilities.${t}`),min:0,max:5})),[e]),s=(0,b.useMemo)(()=>C.map(({key:t,values:n})=>({name:e(`products.${t}`),values:n,opacity:t===`market`?.05:.2})),[e]),c=new Intl.NumberFormat(t.language,{minimumFractionDigits:1}),l=(e,t)=>i(n=>t?n.filter(t=>t!==e):[...n,e]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsx)(ee,{gap:16,role:`group`,"aria-label":e(`compareWith`),children:s.map((e,t)=>(0,x.jsx)(o,{label:e.name,checked:!n.includes(t),onChange:e=>l(t,e)},e.name))}),(0,x.jsx)(f,{indicators:a,series:s,hidden:n,onToggle:e=>i([...e.hiddenIndexes]),format:e=>c.format(e),height:380,ariaLabel:e(`capabilitiesAria`)})]})}var b,x,S,C;function w(){return(w=e((()=>{b=t(),i(),a(),s(),d(),x=n(),S=[`security`,`integrations`,`reporting`,`mobile`,`automation`,`support`,`pricing`],C=[{key:`ours`,values:[4.5,3.8,4.2,3.1,4.6,4.4,3.5]},{key:`competitor`,values:[3.9,4.7,3.6,4.4,3.2,3.5,3.9]},{key:`market`,values:[3.5,3.6,3.4,3.5,3.3,3.6,3.7]}]})))()}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),n=t.language,i=(0,T.useMemo)(()=>D.map(t=>({name:e(`flavor.${t}`),max:5})),[e]),a=(0,T.useMemo)(()=>O.map(({key:t,values:n})=>({name:e(`coffees.${t}`),values:n,opacity:.25})),[e]),o=(0,T.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,E.jsx)(f,{indicators:i,series:a,shape:`circle`,levels:5,dots:!1,format:e=>o.format(e),height:360,ariaLabel:e(`coffeeAria`)})}var T,E,D,O;function k(){return(k=e((()=>{T=t(),i(),d(),E=n(),D=[`aroma`,`acidity`,`sweetness`,`body`,`bitterness`,`aftertaste`],O=[{key:`ethiopia`,values:[4.6,4.4,3.8,2.4,1.6,3.9]},{key:`sumatra`,values:[3.6,1.8,3.1,4.7,3.9,4.2]}]})))()}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),[t,n]=(0,A.useState)(null),i=(0,A.useMemo)(()=>M.map(t=>({name:e(`criteria.${t}`),max:100})),[e]);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,j.jsx)(f,{indicators:i,series:N,onHover:n,height:380,ariaLabel:e(`phonesAria`)}),(0,j.jsx)(`p`,{role:`status`,children:t&&t.indicator!==void 0?`${t.name} · ${i[t.indicator].name}: ${e(`outOf`,{value:t.value,max:100})}`:e(`hoverPolygon`)})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),i(),d(),j=n(),M=[`performance`,`battery`,`camera`,`display`,`value`,`build`],N=[{name:`Aurora X`,values:[92,68,88,90,55,86]},{name:`Nimbus 5`,values:[74,91,70,78,88,72]},{name:`Vertex Pro`,values:[85,80,94,84,66,93]}]})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.radar-chart.data`}),t=(0,F.useMemo)(()=>L.map(t=>({name:e(`football.${t}`),min:30,max:99})),[e]),n=(0,F.useMemo)(()=>R.map(e=>({...e,opacity:.2})),[]);return(0,I.jsx)(f,{indicators:t,series:n,levels:3,height:360,ariaLabel:e(`playersAria`)})}var F,I,L,R;function z(){return(z=e((()=>{F=t(),i(),d(),I=n(),L=[`pace`,`shooting`,`passing`,`dribbling`,`defending`,`physical`],R=[{name:`L. Moreau`,values:[91,86,74,89,38,70],color:`#2563eb`},{name:`K. Adeyemi`,values:[78,90,82,80,52,86],color:`#dc2626`}]})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Interview scorecard of one candidate, each skill rated out of 10
const skills = [
  "problemSolving",
  "coding",
  "systemDesign",
  "communication",
  "collaboration",
  "ownership",
];
const scores = [8.5, 9, 6.5, 7, 8, 9];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      skills.map((skill) => ({ name: t(\`skills.\${skill}\`), max: 10 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [{ name: t("candidate"), values: scores }],
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      format={(value) => t("outOf", { value: decimal.format(value), max: 10 })}
      height={340}
      ariaLabel={t("scorecardAria")}
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Analyst ratings (1-5) of a product against a competitor and the market
const capabilities = [
  "security",
  "integrations",
  "reporting",
  "mobile",
  "automation",
  "support",
  "pricing",
];
const products = [
  { key: "ours", values: [4.5, 3.8, 4.2, 3.1, 4.6, 4.4, 3.5] },
  { key: "competitor", values: [3.9, 4.7, 3.6, 4.4, 3.2, 3.5, 3.9] },
  { key: "market", values: [3.5, 3.6, 3.4, 3.5, 3.3, 3.6, 3.7] },
];

export default function CapabilitiesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  // controlled visibility: the checkboxes and the legend share one state
  const [hidden, setHidden] = useState<number[]>([]);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      capabilities.map((key) => ({
        name: t(\`capabilities.\${key}\`),
        min: 0,
        max: 5,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      products.map(({ key, values }) => ({
        name: t(\`products.\${key}\`),
        values,
        opacity: key === "market" ? 0.05 : 0.2,
      })),
    [t],
  );
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
  });
  const toggle = (index: number, visible: boolean) =>
    setHidden((current) =>
      visible ? current.filter((i) => i !== index) : [...current, index],
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} role="group" aria-label={t("compareWith")}>
        {series.map((item, index) => (
          <Checkbox
            key={item.name}
            label={item.name}
            checked={!hidden.includes(index)}
            onChange={(checked) => toggle(index, checked)}
          />
        ))}
      </HStack>
      <RadarChart
        indicators={indicators}
        series={series}
        hidden={hidden}
        onToggle={(event) => setHidden([...event.hiddenIndexes])}
        format={(value) => decimal.format(value)}
        height={380}
        ariaLabel={t("capabilitiesAria")}
      />
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Cupping notes of two coffees, each attribute scored from 0 to 5
const attributes = [
  "aroma",
  "acidity",
  "sweetness",
  "body",
  "bitterness",
  "aftertaste",
];
const coffees = [
  { key: "ethiopia", values: [4.6, 4.4, 3.8, 2.4, 1.6, 3.9] },
  { key: "sumatra", values: [3.6, 1.8, 3.1, 4.7, 3.9, 4.2] },
];

export default function CircleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({ name: t(\`flavor.\${key}\`), max: 5 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      coffees.map(({ key, values }) => ({
        name: t(\`coffees.\${key}\`),
        values,
        opacity: 0.25,
      })),
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      dots={false}
      format={(value) => decimal.format(value)}
      height={360}
      ariaLabel={t("coffeeAria")}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Review scores (0-100) of three phones
const criteria = [
  "performance",
  "battery",
  "camera",
  "display",
  "value",
  "build",
];
const series: RadarSeries[] = [
  { name: "Aurora X", values: [92, 68, 88, 90, 55, 86] },
  { name: "Nimbus 5", values: [74, 91, 70, 78, 88, 72] },
  { name: "Vertex Pro", values: [85, 80, 94, 84, 66, 93] },
];

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      criteria.map((key) => ({ name: t(\`criteria.\${key}\`), max: 100 })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        onHover={setHovered}
        height={380}
        ariaLabel={t("phonesAria")}
      />
      <p role="status">
        {hovered && hovered.indicator !== undefined
          ? \`\${hovered.name} · \${indicators[hovered.indicator].name}: \${t(
              "outOf",
              { value: hovered.value, max: 100 },
            )}\`
          : t("hoverPolygon")}
      </p>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Season ratings (0-99) of two forwards, the way football games show them
const attributes = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physical",
];
const players = [
  { name: "L. Moreau", values: [91, 86, 74, 89, 38, 70], color: "#2563eb" },
  { name: "K. Adeyemi", values: [78, 90, 82, 80, 52, 86], color: "#dc2626" },
];

export default function PlayersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });

  // the same scale on every axis: 30 at the center, 99 at the rim
  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({
        name: t(\`football.\${key}\`),
        min: 30,
        max: 99,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => players.map((player) => ({ ...player, opacity: 0.2 })),
    [],
  );

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      levels={3}
      height={360}
      ariaLabel={t("playersAria")}
    />
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{v(),w(),k(),P(),z(),V(),U(),G(),q(),Y(),t(),l(),u(),X=n(),Z=c(Object.assign({"./demos/basic.tsx":p,"./demos/capabilities.tsx":y,"./demos/circle.tsx":ne,"./demos/compare.tsx":re,"./demos/players.tsx":ie}),Object.assign({"./demos/basic.tsx":B,"./demos/capabilities.tsx":H,"./demos/circle.tsx":W,"./demos/compare.tsx":K,"./demos/players.tsx":J})),Q=()=>(0,X.jsx)(te,{id:`radar-chart`,demos:Z})})))()}$();export{Q as default};