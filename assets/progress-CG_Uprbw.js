import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,n as i,t as a,z as o}from"./ProgressIndicator-DMdtmsv7.js";import{a as s,i as c}from"./fi-C7DFrave.js";import{l as ee,n as l,t as u,u as d}from"./DocPage-tb4CAOXP.js";function f(){return(0,p.jsxs)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[(0,p.jsx)(a,{"aria-label":`Loading`}),(0,p.jsx)(a,{color:`neutral`,"aria-label":`Refreshing`}),(0,p.jsx)(`span`,{style:{color:`var(--success-color)`},children:(0,p.jsx)(a,{color:`current`,"aria-label":`Saving`})})]})}var p;function m(){return(m=e((()=>{i(),p=n()})))()}function h(){let[e,t]=(0,g.useState)(2);return(0,_.jsxs)(`div`,{style:{display:`grid`,gap:20,width:`100%`},children:[(0,_.jsx)(a,{variant:`bar`,full:!0,value:e,max:5,showValue:!0,format:(e,t)=>`${e} / ${t}`,label:`Lessons completed`}),(0,_.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:24,alignItems:`center`},children:[(0,_.jsx)(a,{variant:`circle`,size:`xlarge`,value:e/5*100,showValue:!0,"aria-label":`Course progress`}),(0,_.jsx)(a,{variant:`bar`,color:`success`,value:100,showValue:!0,"aria-label":`Done`}),(0,_.jsx)(a,{variant:`bar`,color:`warning`,value:60,showValue:!0,"aria-label":`Due soon`}),(0,_.jsx)(a,{variant:`bar`,color:`danger`,value:15,showValue:!0,"aria-label":`Overdue`})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,_.jsx)(o,{size:`small`,variant:`outline`,disabled:e===0,onClick:()=>t(e=>Math.max(0,e-1)),children:`Undo lesson`}),(0,_.jsx)(o,{size:`small`,disabled:e===5,onClick:()=>t(e=>Math.min(5,e+1)),children:`Complete lesson`})]})]})}var g,_;function v(){return(v=e((()=>{g=t(),r(),i(),_=n()})))()}function y(){return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:[(0,b.jsx)(a,{size:`small`,label:`Syncing contacts…`}),(0,b.jsx)(a,{variant:`bar`,full:!0,label:`Uploading report.pdf`})]})}var b;function x(){return(x=e((()=>{i(),b=n()})))()}function S(){return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:[(0,C.jsx)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:w.map(e=>(0,C.jsx)(a,{size:e,"aria-label":`Loading`},e))}),w.map(e=>(0,C.jsx)(a,{variant:`bar`,size:e,full:!0,"aria-label":`Loading`},e))]})}var C,w;function T(){return(T=e((()=>{i(),C=n(),w=[`xsmall`,`small`,`medium`,`large`,`xlarge`]})))()}function E(){return(0,D.jsx)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:O.map(e=>(0,D.jsx)(a,{variant:e,"aria-label":`Loading (${e})`},e))})}var D,O;function k(){return(k=e((()=>{i(),D=n(),O=[`spinner`,`circle`,`wave`,`bar`,`dottedBar`]})))()}function A(){return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:[(0,j.jsx)(a,{variant:`bar`,width:`160px`,"aria-label":`Loading`}),(0,j.jsx)(a,{variant:`bar`,full:!0,"aria-label":`Loading`}),(0,j.jsx)(a,{variant:`dottedBar`,full:!0,"aria-label":`Loading`})]})}var j;function M(){return(M=e((()=>{i(),j=n()})))()}function N(){return(0,P.jsx)(a,{variant:`bar`,icon:(0,P.jsx)(c,{}),"aria-label":`Uploading files`})}var P;function F(){return(F=e((()=>{i(),s(),P=n()})))()}var I;function L(){return(L=e((()=>{I=`import { ProgressIndicator } from "minerva-design";

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
`})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import { Button, ProgressIndicator } from "minerva-design";

export default function DeterminateDemo() {
  const [lessons, setLessons] = useState(2);
  return (
    <div style={{ display: "grid", gap: 20, width: "100%" }}>
      <ProgressIndicator
        variant="bar"
        full
        value={lessons}
        max={5}
        showValue
        format={(value, max) => \`\${value} / \${max}\`}
        label="Lessons completed"
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "center",
        }}
      >
        <ProgressIndicator
          variant="circle"
          size="xlarge"
          value={(lessons / 5) * 100}
          showValue
          aria-label="Course progress"
        />
        <ProgressIndicator
          variant="bar"
          color="success"
          value={100}
          showValue
          aria-label="Done"
        />
        <ProgressIndicator
          variant="bar"
          color="warning"
          value={60}
          showValue
          aria-label="Due soon"
        />
        <ProgressIndicator
          variant="bar"
          color="danger"
          value={15}
          showValue
          aria-label="Overdue"
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          disabled={lessons === 0}
          onClick={() => setLessons((n) => Math.max(0, n - 1))}
        >
          Undo lesson
        </Button>
        <Button
          size="small"
          disabled={lessons === 5}
          onClick={() => setLessons((n) => Math.min(5, n + 1))}
        >
          Complete lesson
        </Button>
      </div>
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { ProgressIndicator } from "minerva-design";

export default function LabelDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator size="small" label="Syncing contacts…" />
      <ProgressIndicator variant="bar" full label="Uploading report.pdf" />
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { ProgressIndicator } from "minerva-design";

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
`})))()}var W;function G(){return(G=e((()=>{W=`import { ProgressIndicator } from "minerva-design";

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
`})))()}var K;function q(){return(q=e((()=>{K=`import { ProgressIndicator } from "minerva-design";

export default function WidthDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator variant="bar" width="160px" aria-label="Loading" />
      <ProgressIndicator variant="bar" full aria-label="Loading" />
      <ProgressIndicator variant="dottedBar" full aria-label="Loading" />
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { ProgressIndicator } from "minerva-design";
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
`})))()}var X,Z,Q;function $(){return($=e((()=>{m(),v(),x(),T(),k(),M(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),l(),d(),X=n(),Z=ee(Object.assign({"./demos/colors.tsx":f,"./demos/determinate.tsx":h,"./demos/label.tsx":y,"./demos/sizes.tsx":S,"./demos/variants.tsx":E,"./demos/width.tsx":A,"./demos/with-icon.tsx":N}),Object.assign({"./demos/colors.tsx":I,"./demos/determinate.tsx":R,"./demos/label.tsx":B,"./demos/sizes.tsx":H,"./demos/variants.tsx":W,"./demos/width.tsx":K,"./demos/with-icon.tsx":J})),Q=()=>(0,X.jsx)(u,{id:`progress`,demos:Z})})))()}$();export{Q as default};