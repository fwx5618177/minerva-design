import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{J as r,q as i}from"./io5-cgJxWOM4.js";import{l as a,n as o,t as s,u as c}from"./DocPage-DmpxYJhU.js";import{D as l,g as u}from"./lu-CaJ0X5v7.js";import{d,o as f,t as p,u as m}from"./charts-BgMlJdRV.js";function h(){return(0,g.jsx)(p,{points:_,quadrants:v,xLabel:`Effort`,yLabel:`Impact`,name:`Feature`,height:320,ariaLabel:`Features by effort and impact`})}var g,_,v;function y(){return(y=e((()=>{f(),g=n(),_=[{label:`Dark mode`,x:2,y:7.5},{label:`SSO`,x:6.5,y:9},{label:`CSV export`,x:1.5,y:6},{label:`Offline sync`,x:9,y:8},{label:`New icons`,x:2.5,y:2},{label:`Plugin API`,x:8,y:6.5},{label:`Custom fonts`,x:7,y:2.5},{label:`Tooltips`,x:1,y:3.5}],v={topLeft:{label:`Quick wins`},topRight:{label:`Big bets`},bottomLeft:{label:`Fill-ins`},bottomRight:{label:`Time sinks`}}})))()}function b(){let[e,t]=(0,x.useState)(E),[n,r]=(0,x.useState)(`Drag a task to another quadrant, or click an empty area to add one`),a=(n,i)=>{let a=m(C,n),o=e.length%3-1,s=`Task ${e.length+1}`;t(e=>[...e,{label:s,x:D(i?.x??a.x+o),y:D(i?.y??a.y+o)}]),r(`${s} added to "${w[n]}"`)},o=e=>{let t=e.endsWith(`Right`),n=e.startsWith(`top`);return(0,S.jsxs)(`div`,{style:{position:`absolute`,[n?`top`:`bottom`]:6,[t?`right`:`left`]:8,display:`flex`,flexDirection:t?`row-reverse`:`row`,alignItems:`center`,gap:6,fontSize:12,fontWeight:600,color:T[e]},children:[(0,S.jsx)(`span`,{children:w[e]}),(0,S.jsx)(i,{size:`xsmall`,variant:`ghost`,label:`Add a task to "${w[e]}"`,icon:(0,S.jsx)(u,{}),onClick:()=>a(e),style:{pointerEvents:`auto`}})]})};return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,S.jsx)(p,{points:e,quadrants:{topLeft:{color:T.topLeft},topRight:{color:T.topRight},bottomLeft:{color:T.bottomLeft},bottomRight:{color:T.bottomRight}},reverseX:!0,showTicks:!1,axisLabels:{top:`Important`,bottom:`Not important`,left:`Urgent`,right:`Not urgent`},onPointDrop:(e,n,i)=>{t(e=>e.map((e,t)=>t===n?{...e,x:D(i.x),y:D(i.y)}:e)),r(`${e.label} moved to "${w[i.quadrant]}"`)},onQuadrantClick:(e,t)=>a(e,t),quadrantContent:{topLeft:o(`topLeft`),topRight:o(`topRight`),bottomLeft:o(`bottomLeft`),bottomRight:o(`bottomRight`)},renderTooltip:e=>(0,S.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,S.jsx)(`strong`,{children:e.label}),(0,S.jsxs)(`span`,{children:[`Urgency `,e.x.toFixed(1),` · Importance `,e.y.toFixed(1)]})]}),height:360,ariaLabel:`Task matrix: drag tasks between quadrants`}),(0,S.jsx)(`p`,{role:`status`,children:n})]})}var x,S,C,w,T,E,D;function O(){return(O=e((()=>{x=t(),r(),f(),d(),l(),S=n(),C={reverseX:!0},w={topLeft:`Do first`,topRight:`Schedule`,bottomLeft:`Delegate`,bottomRight:`Eliminate`},T={topLeft:`var(--danger-color, #ef4444)`,topRight:`var(--primary-color, #4f46e5)`,bottomLeft:`var(--warning-color, #f59e0b)`,bottomRight:`var(--text-secondary-color, #64748b)`},E=[{label:`Fix login outage`,x:9,y:8},{label:`Quarterly planning`,x:3,y:8.5},{label:`Book travel`,x:8,y:3},{label:`Inbox zero`,x:2.5,y:2}],D=e=>Math.min(9.5,Math.max(.5,e))})))()}function k(){let[e,t]=(0,A.useState)(null);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,j.jsx)(p,{points:M,quadrants:N,reverseX:!0,xLabel:`Urgency`,yLabel:`Importance`,name:`Task`,onPointClick:e=>t(e),height:320,ariaLabel:`Eisenhower matrix of tasks`}),(0,j.jsx)(`p`,{role:`status`,children:e?`${e.label}: urgency ${e.x}, importance ${e.y}`:`Click a task`})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),f(),j=n(),M=[{label:`Fix login outage`,x:9,y:7.2},{label:`Tax filing`,x:7.5,y:8.6},{label:`Quarterly planning`,x:3,y:8.5},{label:`Mentoring`,x:2,y:7},{label:`Book travel`,x:8.5,y:3},{label:`Most meetings`,x:7,y:2},{label:`Inbox zero`,x:3,y:2.5},{label:`Social media`,x:1.5,y:1}],N={topLeft:{label:`Do first`},topRight:{label:`Schedule`},bottomLeft:{label:`Delegate`},bottomRight:{label:`Eliminate`}}})))()}var F;function I(){return(I=e((()=>{F=`import {
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
`})))()}var L;function R(){return(R=e((()=>{L=`import { useState } from "react";
import { IconButton } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

type Corner = QuadrantCorner;

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

const titles: Record<Corner, string> = {
  topLeft: "Do first",
  topRight: "Schedule",
  bottomLeft: "Delegate",
  bottomRight: "Eliminate",
};

// Same tints as the default quadrant colors
const colors: Record<Corner, string> = {
  topLeft: "var(--danger-color, #ef4444)",
  topRight: "var(--primary-color, #4f46e5)",
  bottomLeft: "var(--warning-color, #f59e0b)",
  bottomRight: "var(--text-secondary-color, #64748b)",
};

const initial: QuadrantPoint[] = [
  { label: "Fix login outage", x: 9, y: 8 },
  { label: "Quarterly planning", x: 3, y: 8.5 },
  { label: "Book travel", x: 8, y: 3 },
  { label: "Inbox zero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function DraggableDemo() {
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState(
    "Drag a task to another quadrant, or click an empty area to add one",
  );

  const add = (corner: Corner, at?: { x: number; y: number }) => {
    const center = quadrantCenter(geometry, corner);
    // Offset new tasks a little so they do not stack on the same spot
    const jitter = (tasks.length % 3) - 1;
    const label = \`Task \${tasks.length + 1}\`;
    setTasks((current) => [
      ...current,
      {
        label,
        x: clamp(at?.x ?? center.x + jitter),
        y: clamp(at?.y ?? center.y + jitter),
      },
    ]);
    setStatus(\`\${label} added to "\${titles[corner]}"\`);
  };

  // Title + add button drawn over each quadrant, in its outer corner
  const header = (corner: Corner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 6,
          [right ? "right" : "left"]: 8,
          display: "flex",
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: colors[corner],
        }}
      >
        <span>{titles[corner]}</span>
        <IconButton
          size="xsmall"
          variant="ghost"
          label={\`Add a task to "\${titles[corner]}"\`}
          icon={<LuPlus />}
          onClick={() => add(corner)}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={tasks}
        quadrants={{
          topLeft: { color: colors.topLeft },
          topRight: { color: colors.topRight },
          bottomLeft: { color: colors.bottomLeft },
          bottomRight: { color: colors.bottomRight },
        }}
        reverseX
        showTicks={false}
        axisLabels={{
          top: "Important",
          bottom: "Not important",
          left: "Urgent",
          right: "Not urgent",
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(\`\${point.label} moved to "\${titles[target.quadrant]}"\`);
        }}
        onQuadrantClick={(corner, at) => add(corner, at)}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
        renderTooltip={(point) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{point.label}</strong>
            <span>
              Urgency {point.x.toFixed(1)} · Importance {point.y.toFixed(1)}
            </span>
          </div>
        )}
        height={360}
        ariaLabel="Task matrix: drag tasks between quadrants"
      />
      <p role="status">{status}</p>
    </div>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { useState } from "react";
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
`})))()}var V,H,U;function W(){return(W=e((()=>{y(),O(),P(),I(),R(),B(),t(),o(),c(),V=n(),H=a(Object.assign({"./demos/basic.tsx":h,"./demos/draggable.tsx":b,"./demos/eisenhower.tsx":k}),Object.assign({"./demos/basic.tsx":F,"./demos/draggable.tsx":L,"./demos/eisenhower.tsx":z})),U=()=>(0,V.jsx)(s,{id:`quadrant-chart`,demos:H})})))()}W();export{U as default};