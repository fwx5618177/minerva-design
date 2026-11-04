import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ht as r,K as i,Mn as a,rt as ee}from"./angular-preview-B7Uzpk8P.js";import{t as o}from"./stylingHooks-PqiNJdev.js";import{$ as s,St as c,xt as te}from"./io5-BsjRfO9T.js";import{n as l,t as u}from"./segmentedControl.module.scss-WiS0_q7Q.js";import{l as d,n as f,t as p,u as m}from"./DocPage-B3QbO8Wp.js";import{A as h,g,m as _,u as v}from"./lu-BtHpX5rX.js";var y,b,x,S;function C(){return(C=e((()=>{a(),c(),s(),u(),y=t(),b=n(),x=e=>typeof e==`string`?{value:e}:e,S=({options:e,value:t,defaultValue:n,onChange:a,size:s=`medium`,color:c=`neutral`,fullWidth:u=!1,disabled:d=!1,name:f,"aria-label":p,"aria-labelledby":m,id:h,className:g,ref:_})=>{let[v,S]=te({value:t,defaultValue:n,onChange:e=>{e!==void 0&&a?.(e)},name:`SegmentedControl`}),C=e.map(x),w=(0,y.useRef)([]),T=e=>d||!!C[e]?.disabled,E=C.findIndex(e=>e.value===v),D=E>=0&&!T(E)?E:C.findIndex((e,t)=>!T(t)),O=e=>{if(T(e))return;let t=C[e].value;t!==v&&S(t)},k=(e,t)=>{if(d)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||O(t);return}let n=r({currentIndex:t,count:C.length,key:e.key,orientation:`both`,dir:i(e.currentTarget),isDisabled:T});n!==null&&(e.preventDefault(),O(n),w.current[n]?.focus())};return(0,b.jsxs)(`div`,{ref:_,id:h,role:`radiogroup`,"aria-label":p,"aria-labelledby":m,"aria-disabled":d||void 0,className:ee(l.segmentedControl,l[s],l[c],u&&l.fullWidth,d&&l.disabled,g),style:{"--_segmented-control-count":Math.max(C.length,1),"--_segmented-control-index":Math.max(E,0)},...o(`segmented-control`,`root`,{disabled:d,size:s,color:c}),children:[(0,b.jsx)(`span`,{className:l.indicator,hidden:E<0,"aria-hidden":!0,...o(`segmented-control`,`indicator`)}),C.map((e,t)=>{let n=t===E,r=T(t),i=e.label??(e.icon===void 0?e.value:void 0);return(0,b.jsxs)(`div`,{ref:e=>{w.current[t]=e},role:`radio`,"aria-checked":n,"aria-disabled":r||void 0,"aria-label":e[`aria-label`],tabIndex:!d&&t===D?0:-1,className:l.item,"data-value":e.value,...o(`segmented-control`,`item`,{selected:n,disabled:r}),onClick:()=>O(t),onKeyDown:e=>k(e,t),children:[e.icon!==void 0&&e.icon!==null?(0,b.jsx)(`span`,{className:l.icon,"aria-hidden":!0,...o(`segmented-control`,`icon`),children:e.icon}):null,i==null?null:(0,b.jsx)(`span`,{className:l.label,...o(`segmented-control`,`label`),children:i})]},e.value)}),f?(0,b.jsx)(`input`,{type:`hidden`,name:f,value:v??``,disabled:d}):null]})}})))()}function w(){let[e,t]=(0,T.useState)(`week`);return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`},children:[(0,E.jsx)(S,{"aria-label":`Calendar view`,options:[{value:`day`,label:`Day`},{value:`week`,label:`Week`},{value:`month`,label:`Month`}],value:e,onChange:t}),(0,E.jsxs)(`output`,{children:[`Showing the `,e,` view`]})]})}var T,E;function D(){return(D=e((()=>{T=t(),C(),E=n()})))()}function O(){return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:16,justifyItems:`start`},children:[(0,k.jsx)(S,{"aria-label":`Theme (neutral)`,options:A,defaultValue:`light`}),(0,k.jsx)(S,{color:`primary`,"aria-label":`Theme (primary)`,options:A,defaultValue:`dark`}),(0,k.jsx)(S,{disabled:!0,"aria-label":`Theme (disabled)`,options:A,defaultValue:`light`})]})}var k,A;function j(){return(j=e((()=>{C(),k=n(),A=[{value:`light`,label:`Light`},{value:`dark`,label:`Dark`},{value:`system`,label:`System`,disabled:!0}]})))()}function M(){return(0,N.jsxs)(`form`,{style:{display:`grid`,gap:12,maxWidth:420},onSubmit:e=>e.preventDefault(),children:[(0,N.jsx)(S,{fullWidth:!0,name:`billing`,"aria-label":`Billing period`,defaultValue:`yearly`,options:[{value:`monthly`,label:`Monthly`},{value:`yearly`,label:`Yearly (−20%)`}]}),(0,N.jsx)(S,{fullWidth:!0,"aria-label":`Status filter`,defaultValue:`all`,options:[`all`,`open`,`closed`,`archived`]})]})}var N;function P(){return(P=e((()=>{C(),N=n()})))()}function ne(){return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:16,justifyItems:`start`},children:[(0,F.jsx)(S,{"aria-label":`Layout`,defaultValue:`list`,options:[{value:`list`,label:`List`,icon:(0,F.jsx)(_,{})},{value:`grid`,label:`Grid`,icon:(0,F.jsx)(v,{})},{value:`map`,label:`Map`,icon:(0,F.jsx)(g,{})}]}),(0,F.jsx)(S,{"aria-label":`Layout (compact)`,defaultValue:`grid`,options:[{value:`list`,icon:(0,F.jsx)(_,{}),"aria-label":`List`},{value:`grid`,icon:(0,F.jsx)(v,{}),"aria-label":`Grid`},{value:`map`,icon:(0,F.jsx)(g,{}),"aria-label":`Map`}]})]})}var F;function I(){return(I=e((()=>{h(),C(),F=n()})))()}function re(){return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:16,justifyItems:`start`},children:[(0,L.jsx)(S,{size:`small`,"aria-label":`Small`,options:R,defaultValue:`Daily`}),(0,L.jsx)(S,{"aria-label":`Medium`,options:R,defaultValue:`Weekly`}),(0,L.jsx)(S,{size:`large`,"aria-label":`Large`,options:R,defaultValue:`Monthly`})]})}var L,R;function z(){return(z=e((()=>{C(),L=n(),R=[`Daily`,`Weekly`,`Monthly`]})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
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
`})))()}var H;function U(){return(U=e((()=>{H=`import { SegmentedControl } from "minerva-design";

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
`})))()}var W;function G(){return(G=e((()=>{W=`import { SegmentedControl } from "minerva-design";

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
`})))()}var K;function q(){return(q=e((()=>{K=`import { LuGrid2X2, LuList, LuMap } from "react-icons/lu";
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { SegmentedControl } from "minerva-design";

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
`})))()}var X,Z,Q;function $(){return($=e((()=>{D(),j(),P(),I(),z(),V(),U(),G(),q(),Y(),t(),f(),m(),X=n(),Z=d(Object.assign({"./demos/basic.tsx":w,"./demos/colors.tsx":O,"./demos/full-width.tsx":M,"./demos/icons.tsx":ne,"./demos/sizes.tsx":re}),Object.assign({"./demos/basic.tsx":B,"./demos/colors.tsx":H,"./demos/full-width.tsx":W,"./demos/icons.tsx":K,"./demos/sizes.tsx":J})),Q=()=>(0,X.jsx)(p,{id:`segmented-control`,demos:Z})})))()}$();export{Q as default};