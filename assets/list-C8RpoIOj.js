import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,ut as i}from"./angular-preview-l4x8c_2r.js";import{B as a,R as o,z as s}from"./ProgressIndicator-BhPa7d9i.js";import{J as c,q as l}from"./io5-DF7HdQ2g.js";import{n as u,t as d}from"./list.module.scss-DF6P0Ck0.js";import{l as f,n as p,t as m,u as h}from"./DocPage-B2iACtLP.js";import{C as g,D as _,l as v,x as y}from"./lu-ChIsH8jw.js";var b,x;function S(){return(S=e((()=>{r(),u(),b=n(),x=({density:e=`default`,dividers:t=!0,bordered:n=!1,role:r=`list`,className:o,ref:s,...c})=>(0,b.jsx)(`ul`,{ref:s,role:r,className:i(d.list,e===`compact`&&d.compact,e===`comfortable`&&d.comfortable,n&&d.bordered,t&&d.dividers,o),...c,...a(`list`,`root`)})})))()}var C,w,T;function E(){return(E=e((()=>{r(),u(),C=n(),w=e=>e!=null&&typeof e!=`boolean`&&e!==``,T=({primary:e,secondary:t,icon:n,actions:r,className:o,ref:s,...c})=>(0,C.jsxs)(`li`,{ref:s,className:i(d.item,o),...c,...a(`list-item`,`root`),children:[w(n)&&(0,C.jsx)(`div`,{className:d.icon,"aria-hidden":`true`,...a(`list-item`,`icon`),children:n}),(0,C.jsxs)(`div`,{className:d.content,children:[(0,C.jsx)(`div`,{className:d.primary,...a(`list-item`,`label`),children:e}),w(t)&&(0,C.jsx)(`div`,{className:d.secondary,...a(`list-item`,`description`),children:t})]}),w(r)&&(0,C.jsx)(`div`,{className:d.actions,...a(`list-item`,`actions`),children:r})]})})))()}function D(){let[e,t]=(0,O.useState)(A);return(0,k.jsx)(x,{"aria-label":`Registered devices`,style:{width:`100%`},children:e.map(e=>(0,k.jsx)(T,{icon:(0,k.jsx)(y,{}),primary:(0,k.jsx)(`span`,{id:`device-${e.id}`,children:e.name}),secondary:e.lastUsed,actions:(0,k.jsx)(l,{"aria-label":`Delete ${e.name}`,onClick:()=>t(t=>t.filter(t=>t.id!==e.id)),"aria-describedby":`device-${e.id}`,children:(0,k.jsx)(g,{})})},e.id))})}var O,k,A;function j(){return(j=e((()=>{O=t(),c(),S(),E(),_(),k=n(),A=[{id:`phone`,name:`iPhone 16`,lastUsed:`Used 2 hours ago`},{id:`laptop`,name:`MacBook Air`,lastUsed:`Used yesterday`}]})))()}function M(){return(0,N.jsx)(x,{bordered:!0,density:`comfortable`,"aria-label":`Branches`,style:{maxWidth:560},children:P.map(e=>(0,N.jsx)(T,{icon:(0,N.jsx)(v,{}),primary:(0,N.jsx)(`span`,{id:`branch-${e.id}`,children:e.name}),secondary:e.meta,actions:(0,N.jsx)(s,{size:`small`,variant:`outline`,"aria-describedby":`branch-${e.id}`,children:`Visit`})},e.id))})}var N,P;function F(){return(F=e((()=>{o(),S(),E(),_(),N=n(),P=[{id:`main`,name:`main`,meta:`Production · deployed 3 min ago`},{id:`preview`,name:`feat/checkout`,meta:`Preview · 2 commits ahead`},{id:`docs`,name:`docs/install`,meta:`Preview · building`}]})))()}function I(){return(0,L.jsxs)(x,{density:`compact`,dividers:!1,"aria-label":`Queue totals`,children:[(0,L.jsx)(T,{primary:`Pending`,secondary:0}),(0,L.jsx)(T,{primary:`Completed`,secondary:24})]})}var L;function R(){return(R=e((()=>{S(),E(),L=n()})))()}var z;function B(){return(B=e((()=>{z=`import { useState } from "react";
import { IconButton, List, ListItem } from "minerva-design";
import { LuSmartphone, LuTrash2 } from "react-icons/lu";

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
          icon={<LuSmartphone />}
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
              <LuTrash2 />
            </IconButton>
          }
        />
      ))}
    </List>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { Button, List, ListItem } from "minerva-design";
import { LuGitBranch } from "react-icons/lu";

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
          icon={<LuGitBranch />}
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
`})))()}var G,K,q;function J(){return(J=e((()=>{j(),F(),R(),B(),H(),W(),t(),p(),h(),G=n(),K=f(Object.assign({"./demos/basic.tsx":D,"./demos/bordered.tsx":M,"./demos/compact.tsx":I}),Object.assign({"./demos/basic.tsx":z,"./demos/bordered.tsx":V,"./demos/compact.tsx":U})),q=()=>(0,G.jsx)(m,{id:`list`,demos:K})})))()}J();export{q as default};