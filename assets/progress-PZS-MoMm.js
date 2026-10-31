import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./ProgressIndicator-CQZAxIX3.js";import{a,i as o}from"./fi-CN8DHeRj.js";import{l as s,n as c,t as l,u}from"./DocPage-CHJwIegD.js";function d(){return(0,f.jsxs)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[(0,f.jsx)(i,{"aria-label":`Loading`}),(0,f.jsx)(i,{color:`neutral`,"aria-label":`Refreshing`}),(0,f.jsx)(`span`,{style:{color:`var(--success-color)`},children:(0,f.jsx)(i,{color:`current`,"aria-label":`Saving`})})]})}var f;function p(){return(p=e((()=>{r(),f=n()})))()}function m(){return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:[(0,h.jsx)(i,{size:`small`,label:`Syncing contacts…`}),(0,h.jsx)(i,{variant:`bar`,full:!0,label:`Uploading report.pdf`})]})}var h;function g(){return(g=e((()=>{r(),h=n()})))()}function _(){return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:[(0,v.jsx)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:y.map(e=>(0,v.jsx)(i,{size:e,"aria-label":`Loading`},e))}),y.map(e=>(0,v.jsx)(i,{variant:`bar`,size:e,full:!0,"aria-label":`Loading`},e))]})}var v,y;function b(){return(b=e((()=>{r(),v=n(),y=[`xsmall`,`small`,`medium`,`large`,`xlarge`]})))()}function x(){return(0,S.jsx)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:C.map(e=>(0,S.jsx)(i,{variant:e,"aria-label":`Loading (${e})`},e))})}var S,C;function w(){return(w=e((()=>{r(),S=n(),C=[`spinner`,`circle`,`wave`,`bar`,`dottedBar`]})))()}function T(){return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:[(0,E.jsx)(i,{variant:`bar`,width:`160px`,"aria-label":`Loading`}),(0,E.jsx)(i,{variant:`bar`,full:!0,"aria-label":`Loading`}),(0,E.jsx)(i,{variant:`dottedBar`,full:!0,"aria-label":`Loading`})]})}var E;function D(){return(D=e((()=>{r(),E=n()})))()}function O(){return(0,k.jsx)(i,{variant:`bar`,icon:(0,k.jsx)(o,{}),"aria-label":`Uploading files`})}var k;function A(){return(A=e((()=>{r(),a(),k=n()})))()}var j;function M(){return(M=e((()=>{j=`import { ProgressIndicator } from "minerva-design";

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <ProgressIndicator aria-label="Loading" />
      <ProgressIndicator color="neutral" aria-label="Refreshing" />
      <span style={{ color: "var(--success-color)" }}>
        <ProgressIndicator color="current" aria-label="Saving" />
      </span>
    </div>
  );
}
`})))()}var N;function P(){return(P=e((()=>{N=`import { ProgressIndicator } from "minerva-design";

export default function LabelDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator size="small" label="Syncing contacts…" />
      <ProgressIndicator variant="bar" full label="Uploading report.pdf" />
    </div>
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { ProgressIndicator } from "minerva-design";

const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {sizes.map((size) => (
          <ProgressIndicator key={size} size={size} aria-label="Loading" />
        ))}
      </div>
      {sizes.map((size) => (
        <ProgressIndicator
          key={size}
          variant="bar"
          size={size}
          full
          aria-label="Loading"
        />
      ))}
    </div>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { ProgressIndicator } from "minerva-design";

const variants = ["spinner", "circle", "wave", "bar", "dottedBar"] as const;

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      {variants.map((variant) => (
        <ProgressIndicator
          key={variant}
          variant={variant}
          aria-label={\`Loading (\${variant})\`}
        />
      ))}
    </div>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { ProgressIndicator } from "minerva-design";

export default function WidthDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator variant="bar" width="160px" aria-label="Loading" />
      <ProgressIndicator variant="bar" full aria-label="Loading" />
      <ProgressIndicator variant="dottedBar" full aria-label="Loading" />
    </div>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { ProgressIndicator } from "minerva-design";
import { FiUploadCloud } from "react-icons/fi";

export default function WithIconDemo() {
  return (
    <ProgressIndicator
      variant="bar"
      icon={<FiUploadCloud />}
      aria-label="Uploading files"
    />
  );
}
`})))()}var U,W,G;function K(){return(K=e((()=>{p(),g(),b(),w(),D(),A(),M(),P(),I(),R(),B(),H(),t(),c(),u(),U=n(),W=s(Object.assign({"./demos/colors.tsx":d,"./demos/label.tsx":m,"./demos/sizes.tsx":_,"./demos/variants.tsx":x,"./demos/width.tsx":T,"./demos/with-icon.tsx":O}),Object.assign({"./demos/colors.tsx":j,"./demos/label.tsx":N,"./demos/sizes.tsx":F,"./demos/variants.tsx":L,"./demos/width.tsx":z,"./demos/with-icon.tsx":V})),G=()=>(0,U.jsx)(l,{id:`progress`,demos:W})})))()}K();export{G as default};