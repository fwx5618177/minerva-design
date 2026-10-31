import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,ut as i}from"./angular-preview-l4x8c_2r.js";import{t as a}from"./stylingHooks-PqiNJdev.js";import{n as o,t as s}from"./descriptionList.module.scss-DYciZmtM.js";import{l as c,n as l,t as u,u as d}from"./DocPage-BdPOW9nQ.js";var f,p;function m(){return(m=e((()=>{r(),o(),f=n(),p=({items:e,bordered:t=!1,striped:n=!1,className:r,ref:o,...c})=>(0,f.jsx)(`dl`,{ref:o,className:i(s.descriptionList,t&&s.bordered,n&&s.striped,r),...c,...a(`description-list`,`root`),children:e.map(e=>(0,f.jsxs)(`div`,{className:s.row,...a(`description-list`,`row`),children:[(0,f.jsx)(`dt`,{...a(`description-list`,`term`),children:e.label}),(0,f.jsx)(`dd`,{...a(`description-list`,`description`),children:e.value})]},e.key))})})))()}function h(){return(0,g.jsx)(p,{"aria-label":`Account`,items:[{key:`name`,label:`Display name`,value:`Lu Xun`},{key:`id`,label:`Account ID`,value:(0,g.jsx)(`code`,{children:`12345678-1234-4234-8234-123456789012`})},{key:`keys`,label:`Passkeys`,value:0}]})}var g;function _(){return(_=e((()=>{m(),g=n()})))()}function v(){return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:24,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,alignItems:`start`},children:[(0,y.jsx)(p,{bordered:!0,items:b}),(0,y.jsx)(p,{striped:!0,items:b})]})}var y,b;function x(){return(x=e((()=>{m(),y=n(),b=[{key:`project`,label:`Project`,value:`minerva-docs`},{key:`region`,label:`Region`,value:`Frankfurt (fra1)`},{key:`runtime`,label:`Runtime`,value:`Node.js 22`},{key:`updated`,label:`Updated`,value:`2 minutes ago`}]})))()}var S;function C(){return(C=e((()=>{S=`import { DescriptionList } from "minerva-design";

export default function BasicDemo() {
  return (
    <DescriptionList
      aria-label="Account"
      items={[
        { key: "name", label: "Display name", value: "Lu Xun" },
        {
          key: "id",
          label: "Account ID",
          value: <code>12345678-1234-4234-8234-123456789012</code>,
        },
        { key: "keys", label: "Passkeys", value: 0 },
      ]}
    />
  );
}
`})))()}var w;function T(){return(T=e((()=>{w=`import { DescriptionList } from "minerva-design";

const items = [
  { key: "project", label: "Project", value: "minerva-docs" },
  { key: "region", label: "Region", value: "Frankfurt (fra1)" },
  { key: "runtime", label: "Runtime", value: "Node.js 22" },
  { key: "updated", label: "Updated", value: "2 minutes ago" },
];

export default function VariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        alignItems: "start",
      }}
    >
      <DescriptionList bordered items={items} />
      <DescriptionList striped items={items} />
    </div>
  );
}
`})))()}var E,D,O;function k(){return(k=e((()=>{_(),x(),C(),T(),t(),l(),d(),E=n(),D=c(Object.assign({"./demos/basic.tsx":h,"./demos/variants.tsx":v}),Object.assign({"./demos/basic.tsx":S,"./demos/variants.tsx":w})),O=()=>(0,E.jsx)(u,{id:`description-list`,demos:D})})))()}k();export{O as default};