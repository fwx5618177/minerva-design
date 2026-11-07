import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./SegmentedControl-D7YOQTQn.js";import{l as a,n as o,t as s,u as c}from"./DocPage-BC6BZEJM.js";import{A as l,g as u,m as d,u as f}from"./lu-BQw33M53.js";function p(){let[e,t]=(0,m.useState)(`week`);return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`},children:[(0,h.jsx)(i,{"aria-label":`Calendar view`,options:[{value:`day`,label:`Day`},{value:`week`,label:`Week`},{value:`month`,label:`Month`}],value:e,onChange:t}),(0,h.jsxs)(`output`,{children:[`Showing the `,e,` view`]})]})}var m,h;function g(){return(g=e((()=>{m=t(),r(),h=n()})))()}function _(){return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:16,justifyItems:`start`},children:[(0,v.jsx)(i,{"aria-label":`Theme (neutral)`,options:y,defaultValue:`light`}),(0,v.jsx)(i,{color:`primary`,"aria-label":`Theme (primary)`,options:y,defaultValue:`dark`}),(0,v.jsx)(i,{disabled:!0,"aria-label":`Theme (disabled)`,options:y,defaultValue:`light`})]})}var v,y;function b(){return(b=e((()=>{r(),v=n(),y=[{value:`light`,label:`Light`},{value:`dark`,label:`Dark`},{value:`system`,label:`System`,disabled:!0}]})))()}function x(){return(0,S.jsxs)(`form`,{style:{display:`grid`,gap:12,maxWidth:420},onSubmit:e=>e.preventDefault(),children:[(0,S.jsx)(i,{fullWidth:!0,name:`billing`,"aria-label":`Billing period`,defaultValue:`yearly`,options:[{value:`monthly`,label:`Monthly`},{value:`yearly`,label:`Yearly (−20%)`}]}),(0,S.jsx)(i,{fullWidth:!0,"aria-label":`Status filter`,defaultValue:`all`,options:[`all`,`open`,`closed`,`archived`]})]})}var S;function C(){return(C=e((()=>{r(),S=n()})))()}function w(){return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:16,justifyItems:`start`},children:[(0,T.jsx)(i,{"aria-label":`Layout`,defaultValue:`list`,options:[{value:`list`,label:`List`,icon:(0,T.jsx)(d,{})},{value:`grid`,label:`Grid`,icon:(0,T.jsx)(f,{})},{value:`map`,label:`Map`,icon:(0,T.jsx)(u,{})}]}),(0,T.jsx)(i,{"aria-label":`Layout (compact)`,defaultValue:`grid`,options:[{value:`list`,icon:(0,T.jsx)(d,{}),"aria-label":`List`},{value:`grid`,icon:(0,T.jsx)(f,{}),"aria-label":`Grid`},{value:`map`,icon:(0,T.jsx)(u,{}),"aria-label":`Map`}]})]})}var T;function E(){return(E=e((()=>{l(),r(),T=n()})))()}function D(){return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:16,justifyItems:`start`},children:[(0,O.jsx)(i,{size:`small`,"aria-label":`Small`,options:k,defaultValue:`Daily`}),(0,O.jsx)(i,{"aria-label":`Medium`,options:k,defaultValue:`Weekly`}),(0,O.jsx)(i,{size:`large`,"aria-label":`Large`,options:k,defaultValue:`Monthly`})]})}var O,k;function A(){return(A=e((()=>{r(),O=n(),k=[`Daily`,`Weekly`,`Monthly`]})))()}var j;function M(){return(M=e((()=>{j=`import { useState } from "react";
import { SegmentedControl } from "minerva-design";

type View = "day" | "week" | "month";

export default function BasicDemo() {
  const [view, setView] = useState<View>("week");
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <SegmentedControl<View>
        aria-label="Calendar view"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        value={view}
        onChange={setView}
      />
      <output>Showing the {view} view</output>
    </div>
  );
}
`})))()}var N;function P(){return(P=e((()=>{N=`import { SegmentedControl } from "minerva-design";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System", disabled: true },
];

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Theme (neutral)"
        options={options}
        defaultValue="light"
      />
      <SegmentedControl
        color="primary"
        aria-label="Theme (primary)"
        options={options}
        defaultValue="dark"
      />
      <SegmentedControl
        disabled
        aria-label="Theme (disabled)"
        options={options}
        defaultValue="light"
      />
    </div>
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { SegmentedControl } from "minerva-design";

export default function FullWidthDemo() {
  return (
    <form
      style={{ display: "grid", gap: 12, maxWidth: 420 }}
      onSubmit={(event) => event.preventDefault()}
    >
      <SegmentedControl
        fullWidth
        name="billing"
        aria-label="Billing period"
        defaultValue="yearly"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly (−20%)" },
        ]}
      />
      <SegmentedControl
        fullWidth
        aria-label="Status filter"
        defaultValue="all"
        options={["all", "open", "closed", "archived"]}
      />
    </form>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { LuGrid2X2, LuList, LuMap } from "react-icons/lu";
import { SegmentedControl } from "minerva-design";

export default function IconsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Layout"
        defaultValue="list"
        options={[
          { value: "list", label: "List", icon: <LuList /> },
          { value: "grid", label: "Grid", icon: <LuGrid2X2 /> },
          { value: "map", label: "Map", icon: <LuMap /> },
        ]}
      />
      {/* Icon-only segments need an aria-label */}
      <SegmentedControl
        aria-label="Layout (compact)"
        defaultValue="grid"
        options={[
          { value: "list", icon: <LuList />, "aria-label": "List" },
          { value: "grid", icon: <LuGrid2X2 />, "aria-label": "Grid" },
          { value: "map", icon: <LuMap />, "aria-label": "Map" },
        ]}
      />
    </div>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { SegmentedControl } from "minerva-design";

const options = ["Daily", "Weekly", "Monthly"];

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        size="small"
        aria-label="Small"
        options={options}
        defaultValue="Daily"
      />
      <SegmentedControl
        aria-label="Medium"
        options={options}
        defaultValue="Weekly"
      />
      <SegmentedControl
        size="large"
        aria-label="Large"
        options={options}
        defaultValue="Monthly"
      />
    </div>
  );
}
`})))()}var V,H,U;function W(){return(W=e((()=>{g(),b(),C(),E(),A(),M(),P(),I(),R(),B(),t(),o(),c(),V=n(),H=a(Object.assign({"./demos/basic.tsx":p,"./demos/colors.tsx":_,"./demos/full-width.tsx":x,"./demos/icons.tsx":w,"./demos/sizes.tsx":D}),Object.assign({"./demos/basic.tsx":j,"./demos/colors.tsx":N,"./demos/full-width.tsx":F,"./demos/icons.tsx":L,"./demos/sizes.tsx":z})),U=()=>(0,V.jsx)(s,{id:`segmented-control`,demos:H})})))()}W();export{U as default};