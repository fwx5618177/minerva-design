import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DmpxYJhU.js";import{n as s,r as c}from"./shapes-BpdzBut9.js";function l(){return(0,u.jsx)(s,{indicators:d,series:f,format:p,height:340,ariaLabel:`Interview scorecard of a candidate`})}var u,d,f,p;function m(){return(m=e((()=>{c(),u=n(),d=[{name:`Problem solving`,max:10},{name:`Coding`,max:10},{name:`System design`,max:10},{name:`Communication`,max:10},{name:`Collaboration`,max:10},{name:`Ownership`,max:10}],f=[{name:`Candidate`,values:[8.5,9,6.5,7,8,9]}],p=e=>`${e} / 10`})))()}function h(){return(0,g.jsx)(s,{indicators:_,series:v,shape:`circle`,levels:5,dots:!1,height:360,ariaLabel:`Flavor profiles of two coffees`})}var g,_,v;function y(){return(y=e((()=>{c(),g=n(),_=[{name:`Aroma`,max:5},{name:`Acidity`,max:5},{name:`Sweetness`,max:5},{name:`Body`,max:5},{name:`Bitterness`,max:5},{name:`Aftertaste`,max:5}],v=[{name:`Ethiopia Yirgacheffe`,values:[4.6,4.4,3.8,2.4,1.6,3.9],opacity:.25},{name:`Sumatra Mandheling`,values:[3.6,1.8,3.1,4.7,3.9,4.2],opacity:.25}]})))()}function b(){let[e,t]=(0,x.useState)(null);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,S.jsx)(s,{indicators:C,series:w,onHover:t,height:380,ariaLabel:`Review scores of three phones`}),(0,S.jsx)(`p`,{role:`status`,children:e&&e.indicator!==void 0?`${e.name} · ${C[e.indicator].name}: ${e.value} / 100`:`Hover a polygon or use the arrow keys to compare the phones`})]})}var x,S,C,w;function T(){return(T=e((()=>{x=t(),c(),S=n(),C=[{name:`Performance`,max:100},{name:`Battery`,max:100},{name:`Camera`,max:100},{name:`Display`,max:100},{name:`Value`,max:100},{name:`Build`,max:100}],w=[{name:`Aurora X`,values:[92,68,88,90,55,86]},{name:`Nimbus 5`,values:[74,91,70,78,88,72]},{name:`Vertex Pro`,values:[85,80,94,84,66,93]}]})))()}var E;function D(){return(D=e((()=>{E=`import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Interview scorecard of one candidate, each skill rated out of 10
const indicators: RadarIndicator[] = [
  { name: "Problem solving", max: 10 },
  { name: "Coding", max: 10 },
  { name: "System design", max: 10 },
  { name: "Communication", max: 10 },
  { name: "Collaboration", max: 10 },
  { name: "Ownership", max: 10 },
];

const series: RadarSeries[] = [
  { name: "Candidate", values: [8.5, 9, 6.5, 7, 8, 9] },
];

const format = (value: number) => \`\${value} / 10\`;

export default function BasicDemo() {
  return (
    <RadarChart
      indicators={indicators}
      series={series}
      format={format}
      height={340}
      ariaLabel="Interview scorecard of a candidate"
    />
  );
}
`})))()}var O;function k(){return(k=e((()=>{O=`import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Cupping notes of two coffees, each attribute scored from 0 to 5
const indicators: RadarIndicator[] = [
  { name: "Aroma", max: 5 },
  { name: "Acidity", max: 5 },
  { name: "Sweetness", max: 5 },
  { name: "Body", max: 5 },
  { name: "Bitterness", max: 5 },
  { name: "Aftertaste", max: 5 },
];

const series: RadarSeries[] = [
  {
    name: "Ethiopia Yirgacheffe",
    values: [4.6, 4.4, 3.8, 2.4, 1.6, 3.9],
    opacity: 0.25,
  },
  {
    name: "Sumatra Mandheling",
    values: [3.6, 1.8, 3.1, 4.7, 3.9, 4.2],
    opacity: 0.25,
  },
];

export default function CircleDemo() {
  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      dots={false}
      height={360}
      ariaLabel="Flavor profiles of two coffees"
    />
  );
}
`})))()}var A;function j(){return(j=e((()=>{A=`import { useState } from "react";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Review scores (0-100) of three phones
const indicators: RadarIndicator[] = [
  { name: "Performance", max: 100 },
  { name: "Battery", max: 100 },
  { name: "Camera", max: 100 },
  { name: "Display", max: 100 },
  { name: "Value", max: 100 },
  { name: "Build", max: 100 },
];

const series: RadarSeries[] = [
  { name: "Aurora X", values: [92, 68, 88, 90, 55, 86] },
  { name: "Nimbus 5", values: [74, 91, 70, 78, 88, 72] },
  { name: "Vertex Pro", values: [85, 80, 94, 84, 66, 93] },
];

export default function CompareDemo() {
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        onHover={setHovered}
        height={380}
        ariaLabel="Review scores of three phones"
      />
      <p role="status">
        {hovered && hovered.indicator !== undefined
          ? \`\${hovered.name} · \${indicators[hovered.indicator].name}: \${hovered.value} / 100\`
          : "Hover a polygon or use the arrow keys to compare the phones"}
      </p>
    </div>
  );
}
`})))()}var M,N,P;function F(){return(F=e((()=>{m(),y(),T(),D(),k(),j(),t(),i(),o(),M=n(),N=r(Object.assign({"./demos/basic.tsx":l,"./demos/circle.tsx":h,"./demos/compare.tsx":b}),Object.assign({"./demos/basic.tsx":E,"./demos/circle.tsx":O,"./demos/compare.tsx":A})),P=()=>(0,M.jsx)(a,{id:`radar-chart`,demos:N})})))()}F();export{P as default};