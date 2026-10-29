import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DCMfehF7.js";import{a as s,n as c}from"./charts-CejCSz4V.js";function l(){return(0,u.jsx)(s,{points:d,quadrants:f,xLabel:`Effort`,yLabel:`Impact`,name:`Feature`,height:320,ariaLabel:`Features by effort and impact`})}var u,d,f;function p(){return(p=e((()=>{c(),u=n(),d=[{label:`Dark mode`,x:2,y:7.5},{label:`SSO`,x:6.5,y:9},{label:`CSV export`,x:1.5,y:6},{label:`Offline sync`,x:9,y:8},{label:`New icons`,x:2.5,y:2},{label:`Plugin API`,x:8,y:6.5},{label:`Custom fonts`,x:7,y:2.5},{label:`Tooltips`,x:1,y:3.5}],f={topLeft:{label:`Quick wins`},topRight:{label:`Big bets`},bottomLeft:{label:`Fill-ins`},bottomRight:{label:`Time sinks`}}})))()}function m(){let[e,t]=(0,h.useState)(null);return(0,g.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,g.jsx)(s,{points:_,quadrants:v,reverseX:!0,xLabel:`Urgency`,yLabel:`Importance`,name:`Task`,onPointClick:e=>t(e),height:320,ariaLabel:`Eisenhower matrix of tasks`}),(0,g.jsx)(`p`,{role:`status`,children:e?`${e.label}: urgency ${e.x}, importance ${e.y}`:`Click a task`})]})}var h,g,_,v;function y(){return(y=e((()=>{h=t(),c(),g=n(),_=[{label:`Fix login outage`,x:9,y:7.2},{label:`Tax filing`,x:7.5,y:8.6},{label:`Quarterly planning`,x:3,y:8.5},{label:`Mentoring`,x:2,y:7},{label:`Book travel`,x:8.5,y:3},{label:`Most meetings`,x:7,y:2},{label:`Inbox zero`,x:3,y:2.5},{label:`Social media`,x:1.5,y:1}],v={topLeft:{label:`Do first`},topRight:{label:`Schedule`},bottomLeft:{label:`Delegate`},bottomRight:{label:`Eliminate`}}})))()}var b;function x(){return(x=e((()=>{b=`import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

const features: QuadrantPoint[] = [
  { label: "Dark mode", x: 2, y: 7.5 },
  { label: "SSO", x: 6.5, y: 9 },
  { label: "CSV export", x: 1.5, y: 6 },
  { label: "Offline sync", x: 9, y: 8 },
  { label: "New icons", x: 2.5, y: 2 },
  { label: "Plugin API", x: 8, y: 6.5 },
  { label: "Custom fonts", x: 7, y: 2.5 },
  { label: "Tooltips", x: 1, y: 3.5 },
];

const quadrants: QuadrantRegions = {
  topLeft: { label: "Quick wins" },
  topRight: { label: "Big bets" },
  bottomLeft: { label: "Fill-ins" },
  bottomRight: { label: "Time sinks" },
};

export default function BasicDemo() {
  return (
    <QuadrantChart
      points={features}
      quadrants={quadrants}
      xLabel="Effort"
      yLabel="Impact"
      name="Feature"
      height={320}
      ariaLabel="Features by effort and impact"
    />
  );
}
`})))()}var S;function C(){return(C=e((()=>{S=`import { useState } from "react";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10)
const tasks: QuadrantPoint[] = [
  { label: "Fix login outage", x: 9, y: 7.2 },
  { label: "Tax filing", x: 7.5, y: 8.6 },
  { label: "Quarterly planning", x: 3, y: 8.5 },
  { label: "Mentoring", x: 2, y: 7 },
  { label: "Book travel", x: 8.5, y: 3 },
  { label: "Most meetings", x: 7, y: 2 },
  { label: "Inbox zero", x: 3, y: 2.5 },
  { label: "Social media", x: 1.5, y: 1 },
];

const quadrants: QuadrantRegions = {
  topLeft: { label: "Do first" },
  topRight: { label: "Schedule" },
  bottomLeft: { label: "Delegate" },
  bottomRight: { label: "Eliminate" },
};

export default function EisenhowerDemo() {
  const [selected, setSelected] = useState<QuadrantPoint | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={tasks}
        quadrants={quadrants}
        reverseX
        xLabel="Urgency"
        yLabel="Importance"
        name="Task"
        onPointClick={(point) => setSelected(point)}
        height={320}
        ariaLabel="Eisenhower matrix of tasks"
      />
      <p role="status">
        {selected
          ? \`\${selected.label}: urgency \${selected.x}, importance \${selected.y}\`
          : "Click a task"}
      </p>
    </div>
  );
}
`})))()}var w,T,E;function D(){return(D=e((()=>{p(),y(),x(),C(),t(),i(),o(),w=n(),T=r(Object.assign({"./demos/basic.tsx":l,"./demos/eisenhower.tsx":m}),Object.assign({"./demos/basic.tsx":b,"./demos/eisenhower.tsx":S})),E=()=>(0,w.jsx)(a,{id:`quadrant-chart`,demos:T})})))()}D();export{E as default};