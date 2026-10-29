import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./Checkbox-CIPaGJJZ.js";import{i as a,n as o,r as s,t as c}from"./Radio-DKdkHhxv.js";import{i as l,r as ee}from"./Stack-CiM4m4jI.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-DmpxYJhU.js";import{a as u,i as d,r as f}from"./shapes-BpdzBut9.js";function ae(){let[e,t]=(0,p.useState)(null);return(0,m.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,m.jsx)(u,{data:h,format:g,onClick:t,height:320,ariaLabel:`Website sessions by traffic source, last 30 days`}),(0,m.jsx)(`p`,{role:`status`,children:e?`${e.name}: ${g(e.value)} sessions (${(e.percent*100).toFixed(1)}% of the traffic)`:`Click a slice (or focus the chart and press Enter) to select a source`})]})}var p,m,h,g;function _(){return(_=e((()=>{p=t(),f(),m=n(),h=[{name:`Organic search`,value:48200},{name:`Direct`,value:23100},{name:`Social`,value:16400},{name:`Paid ads`,value:12700},{name:`Referral`,value:9800},{name:`Email`,value:6100}],g=e=>e.toLocaleString(`en-US`)})))()}function oe(){let[e,t]=(0,v.useState)(null);return(0,y.jsx)(d,{data:b,format:C,centerValue:C(e?e.value:x),centerLabel:e?`${e.name} · ${Math.round(e.percent*100)}%`:`Monthly revenue`,onHover:t,tooltip:!1,legend:T,labelContent:w,height:320,ariaLabel:`Monthly recurring revenue by plan`})}var v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{v=t(),f(),y=n(),b=[{name:`Enterprise`,value:48200},{name:`Business`,value:31500},{name:`Pro`,value:22800},{name:`Starter`,value:9400}],x=b.reduce((e,t)=>e+t.value,0),S=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),C=e=>S.format(e),w=[`name`,`value`],T={toggle:!1}})))()}function D(){let[e,t]=(0,O.useState)(`outside`),[n,r]=(0,O.useState)([`name`,`percent`]),o=(0,O.useMemo)(()=>j.filter(e=>n.includes(e)),[n]),s=(e,t)=>r(n=>t?[...n,e]:n.filter(t=>t!==e));return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,k.jsxs)(a,{"aria-label":`Label placement`,direction:`horizontal`,value:e,onChange:e=>t(e),children:[(0,k.jsx)(c,{value:`outside`,label:`Outside`}),(0,k.jsx)(c,{value:`inside`,label:`Inside`}),(0,k.jsx)(c,{value:`none`,label:`None`})]}),(0,k.jsx)(l,{gap:16,role:`group`,"aria-label":`Label content`,children:j.map(t=>(0,k.jsx)(i,{label:t,checked:n.includes(t),disabled:e===`none`||n.length===1&&n[0]===t,onChange:e=>s(t,e)},t))}),(0,k.jsx)(u,{data:A,labels:e,labelContent:o,height:340,ariaLabel:`Support tickets by channel`})]})}var O,k,A,j;function M(){return(M=e((()=>{O=t(),r(),ee(),o(),s(),f(),k=n(),A=[{name:`Email`,value:1240},{name:`Live chat`,value:980},{name:`Web form`,value:610},{name:`Phone`,value:430},{name:`Social`,value:150},{name:`Community`,value:90}],j=[`name`,`value`,`percent`]})))()}function N(){return(0,P.jsx)(u,{data:R,rose:!0,innerRadius:.18,padAngle:2,cornerRadius:4,labelContent:z,legend:!1,format:B,height:360,ariaLabel:`Average monthly rainfall`})}var P,F,I,L,R,z,B;function V(){return(V=e((()=>{f(),P=n(),F=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],I=[78,61,72,58,49,37,28,34,52,86,97,92],L=[`var(--primary-color)`,`var(--success-color)`,`var(--warning-color)`,`var(--danger-color)`],R=F.map((e,t)=>({name:e,value:I[t],color:L[Math.floor((t+1)%12/3)]})),z=[`name`],B=e=>`${e} mm`})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Website sessions over the last 30 days, by traffic source
const sessions: ShapeDatum[] = [
  { name: "Organic search", value: 48200 },
  { name: "Direct", value: 23100 },
  { name: "Social", value: 16400 },
  { name: "Paid ads", value: 12700 },
  { name: "Referral", value: 9800 },
  { name: "Email", value: 6100 },
];

const format = (value: number) => value.toLocaleString("en-US");

export default function BasicDemo() {
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <PieChart
        data={sessions}
        format={format}
        onClick={setSelected}
        height={320}
        ariaLabel="Website sessions by traffic source, last 30 days"
      />
      <p role="status">
        {selected
          ? \`\${selected.name}: \${format(selected.value)} sessions (\${(
              selected.percent * 100
            ).toFixed(1)}% of the traffic)\`
          : "Click a slice (or focus the chart and press Enter) to select a source"}
      </p>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import {
  DonutChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly recurring revenue by plan, in US dollars
const revenue: ShapeDatum[] = [
  { name: "Enterprise", value: 48200 },
  { name: "Business", value: 31500 },
  { name: "Pro", value: 22800 },
  { name: "Starter", value: 9400 },
];

const total = revenue.reduce((sum, d) => sum + d.value, 0);

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const format = (value: number) => currency.format(value);
const labelContent = ["name", "value"] as const;
// The total in the hole always covers every plan, so slices stay visible
const legend = { toggle: false } as const;

export default function DonutDemo() {
  // The hovered (or keyboard-highlighted) plan replaces the total in the hole
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  return (
    <DonutChart
      data={revenue}
      format={format}
      centerValue={format(hovered ? hovered.value : total)}
      centerLabel={
        hovered
          ? \`\${hovered.name} · \${Math.round(hovered.percent * 100)}%\`
          : "Monthly revenue"
      }
      onHover={setHovered}
      tooltip={false}
      legend={legend}
      labelContent={labelContent}
      height={320}
      ariaLabel="Monthly recurring revenue by plan"
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo, useState } from "react";
import { Checkbox, HStack, Radio, RadioGroup } from "minerva-design";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

type Placement = "outside" | "inside" | "none";
type Part = "name" | "value" | "percent";

// Support tickets opened this quarter, by channel
const tickets: ShapeDatum[] = [
  { name: "Email", value: 1240 },
  { name: "Live chat", value: 980 },
  { name: "Web form", value: 610 },
  { name: "Phone", value: 430 },
  { name: "Social", value: 150 },
  { name: "Community", value: 90 },
];

const PARTS: Part[] = ["name", "value", "percent"];

export default function LabelsDemo() {
  const [labels, setLabels] = useState<Placement>("outside");
  const [parts, setParts] = useState<Part[]>(["name", "percent"]);

  // Keep the array stable between renders: a new one would redraw the labels
  const labelContent = useMemo(
    () => PARTS.filter((part) => parts.includes(part)),
    [parts],
  );

  const togglePart = (part: Part, checked: boolean) =>
    setParts((current) =>
      checked ? [...current, part] : current.filter((p) => p !== part),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Label placement"
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Placement)}
      >
        <Radio value="outside" label="Outside" />
        <Radio value="inside" label="Inside" />
        <Radio value="none" label="None" />
      </RadioGroup>
      <HStack gap={16} role="group" aria-label="Label content">
        {PARTS.map((part) => (
          <Checkbox
            key={part}
            label={part}
            checked={parts.includes(part)}
            // at least one part stays selected
            disabled={
              labels === "none" || (parts.length === 1 && parts[0] === part)
            }
            onChange={(checked) => togglePart(part, checked)}
          />
        ))}
      </HStack>
      <PieChart
        data={tickets}
        labels={labels}
        labelContent={labelContent}
        height={340}
        ariaLabel="Support tickets by channel"
      />
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { PieChart, type ShapeDatum } from "minerva-design/charts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// Average rainfall per month, in millimeters
const rainfall = [78, 61, 72, 58, 49, 37, 28, 34, 52, 86, 97, 92];

// One color per season (Dec-Feb, Mar-May, Jun-Aug, Sep-Nov)
const seasons = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

const data: ShapeDatum[] = months.map((name, i) => ({
  name,
  value: rainfall[i],
  color: seasons[Math.floor(((i + 1) % 12) / 3)],
}));

const labelContent = ["name"] as const;
const format = (value: number) => \`\${value} mm\`;

export default function RoseDemo() {
  return (
    <PieChart
      data={data}
      rose
      innerRadius={0.18}
      padAngle={2}
      cornerRadius={4}
      labelContent={labelContent}
      legend={false}
      format={format}
      height={360}
      ariaLabel="Average monthly rainfall"
    />
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{_(),E(),M(),V(),U(),G(),q(),Y(),t(),ne(),ie(),X=n(),Z=te(Object.assign({"./demos/basic.tsx":ae,"./demos/donut.tsx":oe,"./demos/labels.tsx":D,"./demos/rose.tsx":N}),Object.assign({"./demos/basic.tsx":H,"./demos/donut.tsx":W,"./demos/labels.tsx":K,"./demos/rose.tsx":J})),Q=()=>(0,X.jsx)(re,{id:`pie-chart`,demos:Z})})))()}$();export{Q as default};