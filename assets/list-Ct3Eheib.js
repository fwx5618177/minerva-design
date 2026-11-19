import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{St as r,X as i,bt as a,yt as o}from"./icons-BnhBUHMa.js";import{Nn as s,it as c}from"./angular-preview-Bvv51cL-.js";import{R as l,z as u}from"./ProgressIndicator-CXNTCbma.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{i as f,r as p}from"./CodeBlock-CuxMOUBV.js";import{n as m,t as h}from"./list.module.scss-DF6P0Ck0.js";import{l as g,n as _,t as v,u as y}from"./DocPage-B93OiV4a.js";var b,x;function S(){return(S=e((()=>{s(),m(),b=n(),x=({density:e=`default`,dividers:t=!0,bordered:n=!1,role:r=`list`,className:i,ref:a,...o})=>(0,b.jsx)(`ul`,{ref:a,role:r,className:c(h.list,e===`compact`&&h.compact,e===`comfortable`&&h.comfortable,n&&h.bordered,t&&h.dividers,i),...o,...d(`list`,`root`)})})))()}var C,w,T;function E(){return(E=e((()=>{s(),m(),C=n(),w=e=>e!=null&&typeof e!=`boolean`&&e!==``,T=({primary:e,secondary:t,icon:n,actions:r,className:i,ref:a,...o})=>(0,C.jsxs)(`li`,{ref:a,className:c(h.item,i),...o,...d(`list-item`,`root`),children:[w(n)&&(0,C.jsx)(`div`,{className:h.icon,"aria-hidden":`true`,...d(`list-item`,`icon`),children:n}),(0,C.jsxs)(`div`,{className:h.content,children:[(0,C.jsx)(`div`,{className:h.primary,...d(`list-item`,`label`),children:e}),w(t)&&(0,C.jsx)(`div`,{className:h.secondary,...d(`list-item`,`description`),children:t})]}),w(r)&&(0,C.jsx)(`div`,{className:h.actions,...d(`list-item`,`actions`),children:r})]})})))()}function D(){let[e,t]=(0,O.useState)(A);return(0,k.jsx)(x,{"aria-label":`Registered devices`,style:{width:`100%`},children:e.map(e=>(0,k.jsx)(T,{icon:(0,k.jsx)(o,{size:`1em`}),primary:(0,k.jsx)(`span`,{id:`device-${e.id}`,children:e.name}),secondary:e.lastUsed,actions:(0,k.jsx)(p,{"aria-label":`Delete ${e.name}`,onClick:()=>t(t=>t.filter(t=>t.id!==e.id)),"aria-describedby":`device-${e.id}`,children:(0,k.jsx)(a,{size:`1em`})})},e.id))})}var O,k,A;function j(){return(j=e((()=>{i(),O=t(),f(),S(),E(),k=n(),A=[{id:`phone`,name:`iPhone 16`,lastUsed:`Used 2 hours ago`},{id:`laptop`,name:`MacBook Air`,lastUsed:`Used yesterday`}]})))()}function M(){return(0,N.jsx)(x,{bordered:!0,density:`comfortable`,"aria-label":`Branches`,style:{maxWidth:560},children:P.map(e=>(0,N.jsx)(T,{icon:(0,N.jsx)(r,{size:`1em`}),primary:(0,N.jsx)(`span`,{id:`branch-${e.id}`,children:e.name}),secondary:e.meta,actions:(0,N.jsx)(u,{size:`small`,variant:`outline`,"aria-describedby":`branch-${e.id}`,children:`Visit`})},e.id))})}var N,P;function F(){return(F=e((()=>{i(),l(),S(),E(),N=n(),P=[{id:`main`,name:`main`,meta:`Production · deployed 3 min ago`},{id:`preview`,name:`feat/checkout`,meta:`Preview · 2 commits ahead`},{id:`docs`,name:`docs/install`,meta:`Preview · building`}]})))()}function I(){return(0,L.jsxs)(x,{density:`compact`,dividers:!1,"aria-label":`Queue totals`,children:[(0,L.jsx)(T,{primary:`Pending`,secondary:0}),(0,L.jsx)(T,{primary:`Completed`,secondary:24})]})}var L;function R(){return(R=e((()=>{S(),E(),L=n()})))()}var z;function B(){return(B=e((()=>{z=`import { SmartphoneIcon, TrashIcon } from "minerva-design/icons";
import { useState } from "react";
import { IconButton, List, ListItem } from "minerva-design";

const initialDevices = [
  { id: "phone", name: "iPhone 16", lastUsed: "Used 2 hours ago" },
  { id: "laptop", name: "MacBook Air", lastUsed: "Used yesterday" },
];

export default function BasicDemo() {
  const [devices, setDevices] = useState(initialDevices);
  return (
    <List aria-label="Registered devices" style={{ width: "100%" }}>
      {devices.map((device) => (
        <ListItem
          key={device.id}
          icon={<SmartphoneIcon size="1em" />}
          primary={<span id={\`device-\${device.id}\`}>{device.name}</span>}
          secondary={device.lastUsed}
          actions={
            <IconButton
              aria-label={\`Delete \${device.name}\`}
              onClick={() =>
                setDevices((prev) => prev.filter((d) => d.id !== device.id))
              }
              aria-describedby={\`device-\${device.id}\`}
            >
              <TrashIcon size="1em" />
            </IconButton>
          }
        />
      ))}
    </List>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { GitBranchIcon } from "minerva-design/icons";
import { Button, List, ListItem } from "minerva-design";

const branches = [
  { id: "main", name: "main", meta: "Production · deployed 3 min ago" },
  { id: "preview", name: "feat/checkout", meta: "Preview · 2 commits ahead" },
  { id: "docs", name: "docs/install", meta: "Preview · building" },
];

export default function BorderedDemo() {
  return (
    <List
      bordered
      density="comfortable"
      aria-label="Branches"
      style={{ maxWidth: 560 }}
    >
      {branches.map((branch) => (
        <ListItem
          key={branch.id}
          icon={<GitBranchIcon size="1em" />}
          primary={<span id={\`branch-\${branch.id}\`}>{branch.name}</span>}
          secondary={branch.meta}
          actions={
            <Button
              size="small"
              variant="outline"
              aria-describedby={\`branch-\${branch.id}\`}
            >
              Visit
            </Button>
          }
        />
      ))}
    </List>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { List, ListItem } from "minerva-design";

export default function CompactDemo() {
  return (
    <List density="compact" dividers={false} aria-label="Queue totals">
      <ListItem primary="Pending" secondary={0} />
      <ListItem primary="Completed" secondary={24} />
    </List>
  );
}
`})))()}var G,K,q;function J(){return(J=e((()=>{j(),F(),R(),B(),H(),W(),t(),_(),y(),G=n(),K=g(Object.assign({"./demos/basic.tsx":D,"./demos/bordered.tsx":M,"./demos/compact.tsx":I}),Object.assign({"./demos/basic.tsx":z,"./demos/bordered.tsx":V,"./demos/compact.tsx":U})),q=()=>(0,G.jsx)(v,{id:`list`,demos:K})})))()}J();export{q as default};