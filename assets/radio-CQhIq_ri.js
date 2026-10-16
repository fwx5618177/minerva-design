import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,n as i,r as a,t as o}from"./Radio-BFRl15Vw.js";import{l as s,n as c,t as l,u}from"./DocPage-DpI9GKki.js";function d(){return(0,f.jsxs)(r,{name:`fruit`,label:`Favourite fruit`,defaultValue:`apple`,children:[(0,f.jsx)(o,{value:`apple`,label:`Apple`}),(0,f.jsx)(o,{value:`banana`,label:`Banana`}),(0,f.jsx)(o,{value:`cherry`,label:`Cherry`})]})}var f;function p(){return(p=e((()=>{i(),a(),f=n()})))()}function m(){return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,h.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:g.map(e=>(0,h.jsx)(o,{name:`color-${e}`,color:e,label:e,defaultChecked:!0},e))}),(0,h.jsxs)(r,{name:`group-color`,"aria-label":`Group color`,defaultValue:`approve`,direction:`horizontal`,color:`success`,children:[(0,h.jsx)(o,{value:`approve`,label:`Approve`}),(0,h.jsx)(o,{value:`later`,label:`Later`,color:`danger`})]})]})}var h,g;function _(){return(_=e((()=>{i(),a(),h=n(),g=[`primary`,`success`,`warning`,`danger`]})))()}function v(){let[e,t]=(0,y.useState)(`pro`);return(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(r,{name:`plan`,label:`Plan`,value:e,onChange:e=>t(e),children:[(0,b.jsx)(o,{value:`free`,label:`Free`}),(0,b.jsx)(o,{value:`pro`,label:`Pro`}),(0,b.jsx)(o,{value:`team`,label:`Team`})]}),(0,b.jsxs)(`p`,{children:[`Selected plan: `,e]})]})}var y,b;function x(){return(x=e((()=>{y=t(),i(),a(),b=n()})))()}function S(){return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,C.jsxs)(r,{name:`partly-disabled`,label:`Partly disabled`,defaultValue:`a`,direction:`horizontal`,children:[(0,C.jsx)(o,{value:`a`,label:`Available`}),(0,C.jsx)(o,{value:`b`,label:`Sold out`,disabled:!0})]}),(0,C.jsxs)(r,{name:`all-disabled`,label:`Disabled group`,defaultValue:`a`,direction:`horizontal`,disabled:!0,children:[(0,C.jsx)(o,{value:`a`,label:`Option A`}),(0,C.jsx)(o,{value:`b`,label:`Option B`})]})]})}var C;function w(){return(w=e((()=>{i(),a(),C=n()})))()}function T(){return(0,E.jsxs)(r,{name:`shipping`,label:`Shipping method`,defaultValue:`standard`,direction:`horizontal`,children:[(0,E.jsx)(o,{value:`standard`,label:`Standard`}),(0,E.jsx)(o,{value:`express`,label:`Express`}),(0,E.jsx)(o,{value:`pickup`,label:`Store pickup`})]})}var E;function D(){return(D=e((()=>{i(),a(),E=n()})))()}function O(){return(0,k.jsx)(`div`,{style:{display:`grid`,gap:12},children:A.map(e=>(0,k.jsxs)(r,{name:`size-${e}`,"aria-label":`${e} options`,defaultValue:`a`,direction:`horizontal`,size:e,children:[(0,k.jsx)(o,{value:`a`,label:`${e} A`}),(0,k.jsx)(o,{value:`b`,label:`${e} B`})]},e))})}var k,A;function j(){return(j=e((()=>{i(),a(),k=n(),A=[`small`,`medium`,`large`]})))()}function M(){let[e,t]=(0,N.useState)();return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,P.jsxs)(r,{name:`t-shirt`,label:`T-shirt size`,value:e,onChange:e=>t(e),direction:`horizontal`,required:!0,error:e===void 0,helperText:e===void 0?`Please choose a size`:`Size ${e} selected`,children:[(0,P.jsx)(o,{value:`S`,label:`S`}),(0,P.jsx)(o,{value:`M`,label:`M`}),(0,P.jsx)(o,{value:`L`,label:`L`})]}),(0,P.jsx)(o,{name:`terms`,label:`I accept the terms`,error:!0,errorMessage:`You must accept the terms to continue`}),(0,P.jsx)(o,{name:`newsletter`,label:`Subscribe to the newsletter`,helperText:`We send at most one email per month`})]})}var N,P;function F(){return(F=e((()=>{N=t(),i(),a(),P=n()})))()}var I;function L(){return(L=e((()=>{I=`import { Radio, RadioGroup } from "minerva-design";

export default function BasicDemo() {
  return (
    <RadioGroup name="fruit" label="Favourite fruit" defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="banana" label="Banana" />
      <Radio value="cherry" label="Cherry" />
    </RadioGroup>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { Radio, RadioGroup } from "minerva-design";

const colors = ["primary", "success", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {colors.map((color) => (
          <Radio
            key={color}
            name={\`color-\${color}\`}
            color={color}
            label={color}
            defaultChecked
          />
        ))}
      </div>
      <RadioGroup
        name="group-color"
        aria-label="Group color"
        defaultValue="approve"
        direction="horizontal"
        color="success"
      >
        <Radio value="approve" label="Approve" />
        <Radio value="later" label="Later" color="danger" />
      </RadioGroup>
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";

export default function ControlledDemo() {
  const [plan, setPlan] = useState<string | number>("pro");

  return (
    <div>
      <RadioGroup
        name="plan"
        label="Plan"
        value={plan}
        onChange={(value) => setPlan(value)}
      >
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="team" label="Team" />
      </RadioGroup>
      <p>Selected plan: {plan}</p>
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { Radio, RadioGroup } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <RadioGroup
        name="partly-disabled"
        label="Partly disabled"
        defaultValue="a"
        direction="horizontal"
      >
        <Radio value="a" label="Available" />
        <Radio value="b" label="Sold out" disabled />
      </RadioGroup>
      <RadioGroup
        name="all-disabled"
        label="Disabled group"
        defaultValue="a"
        direction="horizontal"
        disabled
      >
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Radio, RadioGroup } from "minerva-design";

export default function HorizontalDemo() {
  return (
    <RadioGroup
      name="shipping"
      label="Shipping method"
      defaultValue="standard"
      direction="horizontal"
    >
      <Radio value="standard" label="Standard" />
      <Radio value="express" label="Express" />
      <Radio value="pickup" label="Store pickup" />
    </RadioGroup>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Radio, RadioGroup } from "minerva-design";

const sizes = ["small", "medium", "large"] as const;

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {sizes.map((size) => (
        <RadioGroup
          key={size}
          name={\`size-\${size}\`}
          aria-label={\`\${size} options\`}
          defaultValue="a"
          direction="horizontal"
          size={size}
        >
          <Radio value="a" label={\`\${size} A\`} />
          <Radio value="b" label={\`\${size} B\`} />
        </RadioGroup>
      ))}
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";

export default function ValidationDemo() {
  const [size, setSize] = useState<string | number>();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <RadioGroup
        name="t-shirt"
        label="T-shirt size"
        value={size}
        onChange={(value) => setSize(value)}
        direction="horizontal"
        required
        error={size === undefined}
        helperText={
          size === undefined ? "Please choose a size" : \`Size \${size} selected\`
        }
      >
        <Radio value="S" label="S" />
        <Radio value="M" label="M" />
        <Radio value="L" label="L" />
      </RadioGroup>
      <Radio
        name="terms"
        label="I accept the terms"
        error
        errorMessage="You must accept the terms to continue"
      />
      <Radio
        name="newsletter"
        label="Subscribe to the newsletter"
        helperText="We send at most one email per month"
      />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{p(),_(),x(),w(),D(),j(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),c(),u(),X=n(),Z=s(Object.assign({"./demos/basic.tsx":d,"./demos/colors.tsx":m,"./demos/controlled.tsx":v,"./demos/disabled.tsx":S,"./demos/horizontal.tsx":T,"./demos/sizes.tsx":O,"./demos/validation.tsx":M}),Object.assign({"./demos/basic.tsx":I,"./demos/colors.tsx":R,"./demos/controlled.tsx":B,"./demos/disabled.tsx":H,"./demos/horizontal.tsx":W,"./demos/sizes.tsx":K,"./demos/validation.tsx":J})),Q=()=>(0,X.jsx)(l,{id:`radio`,demos:Z})})))()}$();export{Q as default};