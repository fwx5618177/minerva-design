import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{l as r,n as i,t as a,u as o}from"./DocPage-DmpxYJhU.js";import{r as s,s as c}from"./shapes-BpdzBut9.js";function l(){let[e,t]=(0,u.useState)(null);return(0,d.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,d.jsx)(c,{data:f,format:p,onClick:t,height:380,ariaLabel:`Disk usage by folder`}),(0,d.jsx)(`p`,{role:`status`,children:e?`${(e.path??[e.name]).join(` › `)}: ${p(e.value)} (${(e.percent*100).toFixed(1)}% of the disk)`:`Click a cell to see where it lives`})]})}var u,d,f,p;function m(){return(m=e((()=>{u=t(),s(),d=n(),f=[{name:`Media`,children:[{name:`Videos`,value:31.2},{name:`Photos`,value:24.3},{name:`Music`,value:6.4}]},{name:`Applications`,children:[{name:`Xcode`,value:12.4},{name:`Docker`,value:9.8},{name:`Figma`,value:1.2},{name:`Chrome`,value:1.1},{name:`Slack`,value:.6}]},{name:`Projects`,children:[{name:`monorepo`,value:14.2},{name:`design-assets`,value:4.3},{name:`side-project`,value:1.6}]},{name:`System`,children:[{name:`Library`,value:11.8},{name:`Caches`,value:7.6},{name:`Logs`,value:2.1}]},{name:`Downloads`,children:[{name:`Installers`,value:5.3},{name:`Archives`,value:3.9}]}],p=e=>`${e.toFixed(1)} GB`})))()}function h(){return(0,g.jsx)(c,{data:_,format:y,gap:4,height:320,ariaLabel:`Annual budget by department`})}var g,_,v,y;function b(){return(b=e((()=>{s(),g=n(),_=[{name:`Engineering`,value:42e5},{name:`Sales`,value:28e5},{name:`Marketing`,value:19e5},{name:`Customer success`,value:12e5},{name:`Operations`,value:9e5},{name:`Finance`,value:6e5},{name:`People`,value:5e5},{name:`Legal`,value:3e5}],v=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),y=e=>v.format(e)})))()}var x;function S(){return(S=e((()=>{x=`import { useState } from "react";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Disk usage of a laptop, in gigabytes
const disk: TreemapNode[] = [
  {
    name: "Media",
    children: [
      { name: "Videos", value: 31.2 },
      { name: "Photos", value: 24.3 },
      { name: "Music", value: 6.4 },
    ],
  },
  {
    name: "Applications",
    children: [
      { name: "Xcode", value: 12.4 },
      { name: "Docker", value: 9.8 },
      { name: "Figma", value: 1.2 },
      { name: "Chrome", value: 1.1 },
      { name: "Slack", value: 0.6 },
    ],
  },
  {
    name: "Projects",
    children: [
      { name: "monorepo", value: 14.2 },
      { name: "design-assets", value: 4.3 },
      { name: "side-project", value: 1.6 },
    ],
  },
  {
    name: "System",
    children: [
      { name: "Library", value: 11.8 },
      { name: "Caches", value: 7.6 },
      { name: "Logs", value: 2.1 },
    ],
  },
  {
    name: "Downloads",
    children: [
      { name: "Installers", value: 5.3 },
      { name: "Archives", value: 3.9 },
    ],
  },
];

const gigabytes = (value: number) => \`\${value.toFixed(1)} GB\`;

export default function BasicDemo() {
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={disk}
        format={gigabytes}
        onClick={setSelected}
        height={380}
        ariaLabel="Disk usage by folder"
      />
      <p role="status">
        {selected
          ? \`\${(selected.path ?? [selected.name]).join(" › ")}: \${gigabytes(
              selected.value,
            )} (\${(selected.percent * 100).toFixed(1)}% of the disk)\`
          : "Click a cell to see where it lives"}
      </p>
    </div>
  );
}
`})))()}var C;function w(){return(w=e((()=>{C=`import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Annual budget by department, in US dollars
const budget: TreemapNode[] = [
  { name: "Engineering", value: 4_200_000 },
  { name: "Sales", value: 2_800_000 },
  { name: "Marketing", value: 1_900_000 },
  { name: "Customer success", value: 1_200_000 },
  { name: "Operations", value: 900_000 },
  { name: "Finance", value: 600_000 },
  { name: "People", value: 500_000 },
  { name: "Legal", value: 300_000 },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const format = (value: number) => currency.format(value);

export default function FlatDemo() {
  return (
    <TreemapChart
      data={budget}
      format={format}
      gap={4}
      height={320}
      ariaLabel="Annual budget by department"
    />
  );
}
`})))()}var T,E,D;function O(){return(O=e((()=>{m(),b(),S(),w(),t(),i(),o(),T=n(),E=r(Object.assign({"./demos/basic.tsx":l,"./demos/flat.tsx":h}),Object.assign({"./demos/basic.tsx":x,"./demos/flat.tsx":C})),D=()=>(0,T.jsx)(a,{id:`treemap-chart`,demos:E})})))()}O();export{D as default};