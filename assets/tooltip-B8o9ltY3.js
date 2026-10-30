import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BhPa7d9i.js";import{X as a,Y as o,bt as ee,xt as te}from"./io5-DF7HdQ2g.js";import{l as ne,n as re,t as ie,u as ae}from"./DocPage-B2iACtLP.js";function oe(){return(0,s.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:c.map(e=>(0,s.jsx)(o,{content:e,animation:e,children:(0,s.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:e})},e))})}var s,c;function l(){return(l=e((()=>{r(),a(),s=n(),c=[`fade`,`scale`,`shift-away`,`shift-toward`,`perspective`]})))()}function se(){return(0,u.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,u.jsx)(o,{content:`Attached to the button itself`,asChild:!0,children:(0,u.jsx)(i,{color:`neutral`,variant:`outline`,children:`No wrapper`})}),(0,u.jsx)(o,{content:`Frosted, follows the theme`,variant:`glass`,placement:`bottom-start`,contentClassName:`my-tooltip`,asChild:!0,children:(0,u.jsx)(i,{color:`neutral`,variant:`outline`,children:`Glass variant`})})]})}var u;function d(){return(d=e((()=>{r(),a(),u=n()})))()}function ce(){return(0,f.jsx)(o,{content:`Save your changes`,children:(0,f.jsx)(i,{children:`Hover or focus me`})})}var f;function le(){return(le=e((()=>{r(),a(),f=n()})))()}function ue(){return(0,p.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:m.map(e=>(0,p.jsx)(o,{content:`A ${e} tooltip`,color:e,children:(0,p.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:e})},e))})}var p,m;function h(){return(h=e((()=>{r(),a(),p=n(),m=[`neutral`,`info`,`success`,`warning`,`danger`]})))()}function de(){let[e,t]=(0,g.useState)(!1),n=(0,g.useRef)(null);return(0,_.jsxs)(`div`,{style:{display:`flex`,gap:32,flexWrap:`wrap`},children:[(0,_.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,_.jsx)(o,{content:`Controlled with the open prop`,open:e,onOpenChange:t,placement:`bottom`,children:(0,_.jsx)(`span`,{children:`Controlled`})}),(0,_.jsx)(i,{size:`small`,onClick:()=>t(e=>!e),children:e?`Hide`:`Show`})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,_.jsx)(o,{ref:n,content:`Opened through the ref`,placement:`bottom`,children:(0,_.jsx)(`span`,{children:`Imperative`})}),(0,_.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>n.current?.toggle(),children:`Toggle via ref`})]})]})}var g,_;function v(){return(v=e((()=>{g=t(),r(),a(),_=n()})))()}function fe(){return(0,y.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,y.jsx)(`style`,{children:b}),(0,y.jsx)(o,{content:`Solid color`,contentClassName:`brand-tooltip`,arrow:!0,children:(0,y.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:`Solid`})}),(0,y.jsx)(o,{content:`Gradient background`,contentClassName:`gradient-tooltip`,arrow:!0,children:(0,y.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:`Gradient`})}),(0,y.jsx)(o,{content:`Further away`,offset:[0,20],children:(0,y.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:`Offset 20px`})})]})}var y,b;function x(){return(x=e((()=>{r(),a(),y=n(),b=`
.brand-tooltip {
  --tooltip-bg: #7c3aed;
  --tooltip-color: #fff;
}
.gradient-tooltip {
  --tooltip-bg: linear-gradient(135deg, #ec4899, #f59e0b);
  --tooltip-color: #fff;
}
`})))()}function pe(){return(0,S.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,S.jsx)(o,{content:`Shows immediately`,enterDelay:0,children:(0,S.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:`No delay`})}),(0,S.jsx)(o,{content:`Shows after 800ms, hides after 500ms`,enterDelay:800,leaveDelay:500,children:(0,S.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:`Slow`})}),(0,S.jsx)(o,{content:`Never shown`,disabled:!0,children:(0,S.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:`Disabled tooltip`})})]})}var S;function C(){return(C=e((()=>{r(),a(),S=n()})))()}function me(){let[e,t]=(0,w.useState)(0),[n,r]=(0,w.useState)(0);return(0,T.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,T.jsx)(o,{content:`Press Escape to close`,onOpen:()=>t(e=>e+1),onClose:()=>r(e=>e+1),children:(0,T.jsx)(i,{color:`neutral`,variant:`outline`,children:`Hover or focus me`})}),(0,T.jsxs)(`span`,{children:[`onOpen: `,e,` · onClose: `,n]})]})}var w,T;function E(){return(E=e((()=>{w=t(),r(),a(),T=n()})))()}function he(){return(0,D.jsx)(o,{content:`I follow your cursor`,followCursor:!0,children:(0,D.jsx)(i,{color:`neutral`,variant:`outline`,type:`button`,style:{width:280,height:100,display:`grid`,placeItems:`center`,border:`1px dashed currentColor`,borderRadius:8,background:`transparent`,color:`inherit`,font:`inherit`},children:`Move the mouse here`})})}var D;function O(){return(O=e((()=>{r(),a(),D=n()})))()}function ge(){return(0,k.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, max-content)`,gap:8},children:A.map(e=>(0,k.jsx)(o,{content:e,placement:e,arrow:!0,children:(0,k.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:e})},e))})}var k,A;function j(){return(j=e((()=>{r(),a(),k=n(),A=[`top-start`,`top`,`top-end`,`left-start`,`left`,`left-end`,`right-start`,`right`,`right-end`,`bottom-start`,`bottom`,`bottom-end`]})))()}function _e(){return(0,M.jsx)(te,{enterDelay:500,skipDelay:300,children:(0,M.jsx)(`div`,{style:{display:`flex`,gap:8},children:[`Bold`,`Italic`,`Underline`].map(e=>(0,M.jsx)(o,{content:e,asChild:!0,children:(0,M.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:e[0]})},e))})})}var M;function N(){return(N=e((()=>{r(),a(),ee(),M=n()})))()}function ve(){return(0,P.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:F.map(e=>(0,P.jsx)(o,{content:`Shape: ${e}`,shape:e,children:(0,P.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,children:e})},e))})}var P,F;function I(){return(I=e((()=>{r(),a(),P=n(),F=[`default`,`rounded`,`square`,`thought`]})))()}function ye(){return(0,L.jsx)(`div`,{style:{display:`grid`,gap:8},children:R.map(e=>(0,L.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:be.map(t=>(0,L.jsx)(o,{content:`${e} · ${t}`,variant:e,color:t,children:(0,L.jsxs)(i,{color:`neutral`,variant:`outline`,size:`small`,children:[e,` `,t]})},t))},e))})}var L,R,be;function z(){return(z=e((()=>{r(),a(),L=n(),R=[`solid`,`subtle`,`glass`],be=[`neutral`,`info`,`danger`]})))()}var B;function V(){return(V=e((()=>{B=`import { Button, Tooltip } from "minerva-design";

const animations = [
  "fade",
  "scale",
  "shift-away",
  "shift-toward",
  "perspective",
] as const;

export default function AnimationsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {animations.map((animation) => (
        <Tooltip key={animation} content={animation} animation={animation}>
          <Button color="neutral" variant="outline" size="small">
            {animation}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { Button, Tooltip } from "minerva-design";

export default function AsChildDemo() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Tooltip content="Attached to the button itself" asChild>
        <Button color="neutral" variant="outline">
          No wrapper
        </Button>
      </Tooltip>
      <Tooltip
        content="Frosted, follows the theme"
        variant="glass"
        placement="bottom-start"
        contentClassName="my-tooltip"
        asChild
      >
        <Button color="neutral" variant="outline">
          Glass variant
        </Button>
      </Tooltip>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Button, Tooltip } from "minerva-design";

export default function BasicDemo() {
  return (
    <Tooltip content="Save your changes">
      <Button>Hover or focus me</Button>
    </Tooltip>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Button, Tooltip } from "minerva-design";

const colors = ["neutral", "info", "success", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {colors.map((color) => (
        <Tooltip key={color} content={\`A \${color} tooltip\`} color={color}>
          <Button color="neutral" variant="outline" size="small">
            {color}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useRef, useState } from "react";
import { Button, Tooltip, type TooltipRef } from "minerva-design";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<TooltipRef>(null);

  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tooltip
          content="Controlled with the open prop"
          open={open}
          onOpenChange={setOpen}
          placement="bottom"
        >
          <span>Controlled</span>
        </Tooltip>
        <Button size="small" onClick={() => setOpen((prev) => !prev)}>
          {open ? "Hide" : "Show"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tooltip
          ref={tooltipRef}
          content="Opened through the ref"
          placement="bottom"
        >
          <span>Imperative</span>
        </Tooltip>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => tooltipRef.current?.toggle()}
        >
          Toggle via ref
        </Button>
      </div>
    </div>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { Button, Tooltip } from "minerva-design";

// The tooltip is portalled to <body>: set the custom properties on the
// tooltip itself through contentClassName.
const css = \`
.brand-tooltip {
  --tooltip-bg: #7c3aed;
  --tooltip-color: #fff;
}
.gradient-tooltip {
  --tooltip-bg: linear-gradient(135deg, #ec4899, #f59e0b);
  --tooltip-color: #fff;
}
\`;

export default function CustomColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <style>{css}</style>
      <Tooltip content="Solid color" contentClassName="brand-tooltip" arrow>
        <Button color="neutral" variant="outline" size="small">
          Solid
        </Button>
      </Tooltip>
      <Tooltip
        content="Gradient background"
        contentClassName="gradient-tooltip"
        arrow
      >
        <Button color="neutral" variant="outline" size="small">
          Gradient
        </Button>
      </Tooltip>
      <Tooltip content="Further away" offset={[0, 20]}>
        <Button color="neutral" variant="outline" size="small">
          Offset 20px
        </Button>
      </Tooltip>
    </div>
  );
}
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import { Button, Tooltip } from "minerva-design";

export default function DelaysDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tooltip content="Shows immediately" enterDelay={0}>
        <Button color="neutral" variant="outline" size="small">
          No delay
        </Button>
      </Tooltip>
      <Tooltip
        content="Shows after 800ms, hides after 500ms"
        enterDelay={800}
        leaveDelay={500}
      >
        <Button color="neutral" variant="outline" size="small">
          Slow
        </Button>
      </Tooltip>
      <Tooltip content="Never shown" disabled>
        <Button color="neutral" variant="outline" size="small">
          Disabled tooltip
        </Button>
      </Tooltip>
    </div>
  );
}
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useState } from "react";
import { Button, Tooltip } from "minerva-design";

export default function EventsDemo() {
  const [opened, setOpened] = useState(0);
  const [closed, setClosed] = useState(0);

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Tooltip
        content="Press Escape to close"
        onOpen={() => setOpened((prev) => prev + 1)}
        onClose={() => setClosed((prev) => prev + 1)}
      >
        <Button color="neutral" variant="outline">
          Hover or focus me
        </Button>
      </Tooltip>
      <span>
        onOpen: {opened} · onClose: {closed}
      </span>
    </div>
  );
}
`})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`import { Button, Tooltip } from "minerva-design";

export default function FollowCursorDemo() {
  return (
    <Tooltip content="I follow your cursor" followCursor>
      <Button
        color="neutral"
        variant="outline"
        type="button"
        style={{
          width: 280,
          height: 100,
          display: "grid",
          placeItems: "center",
          border: "1px dashed currentColor",
          borderRadius: 8,
          background: "transparent",
          color: "inherit",
          font: "inherit",
        }}
      >
        Move the mouse here
      </Button>
    </Tooltip>
  );
}
`})))()}var De;function Oe(){return(Oe=e((()=>{De=`import { Button, Tooltip } from "minerva-design";

const placements = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
] as const;

export default function PlacementsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, max-content)",
        gap: 8,
      }}
    >
      {placements.map((placement) => (
        <Tooltip
          key={placement}
          content={placement}
          placement={placement}
          arrow
        >
          <Button color="neutral" variant="outline" size="small">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
`})))()}var Q;function ke(){return(ke=e((()=>{Q=`import { Button, Tooltip, TooltipProvider } from "minerva-design";

export default function ProviderDemo() {
  return (
    <TooltipProvider enterDelay={500} skipDelay={300}>
      <div style={{ display: "flex", gap: 8 }}>
        {["Bold", "Italic", "Underline"].map((label) => (
          <Tooltip key={label} content={label} asChild>
            <Button color="neutral" variant="outline" size="small">
              {label[0]}
            </Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
`})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { Button, Tooltip } from "minerva-design";

const shapes = ["default", "rounded", "square", "thought"] as const;

export default function ShapesDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {shapes.map((shape) => (
        <Tooltip key={shape} content={\`Shape: \${shape}\`} shape={shape}>
          <Button color="neutral" variant="outline" size="small">
            {shape}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { Button, Tooltip } from "minerva-design";

const variants = ["solid", "subtle", "glass"] as const;
const colors = ["neutral", "info", "danger"] as const;

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          {colors.map((color) => (
            <Tooltip
              key={color}
              content={\`\${variant} · \${color}\`}
              variant={variant}
              color={color}
            >
              <Button color="neutral" variant="outline" size="small">
                {variant} {color}
              </Button>
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  );
}
`})))()}var Pe,Fe,Ie;function $(){return($=e((()=>{l(),d(),le(),h(),v(),x(),C(),E(),O(),j(),N(),I(),z(),V(),U(),G(),q(),Y(),Z(),Se(),we(),Ee(),Oe(),ke(),je(),Ne(),t(),re(),ae(),Pe=n(),Fe=ne(Object.assign({"./demos/animations.tsx":oe,"./demos/as-child.tsx":se,"./demos/basic.tsx":ce,"./demos/colors.tsx":ue,"./demos/controlled.tsx":de,"./demos/custom-colors.tsx":fe,"./demos/delays.tsx":pe,"./demos/events.tsx":me,"./demos/follow-cursor.tsx":he,"./demos/placements.tsx":ge,"./demos/provider.tsx":_e,"./demos/shapes.tsx":ve,"./demos/variants.tsx":ye}),Object.assign({"./demos/animations.tsx":B,"./demos/as-child.tsx":H,"./demos/basic.tsx":W,"./demos/colors.tsx":K,"./demos/controlled.tsx":J,"./demos/custom-colors.tsx":X,"./demos/delays.tsx":xe,"./demos/events.tsx":Ce,"./demos/follow-cursor.tsx":Te,"./demos/placements.tsx":De,"./demos/provider.tsx":Q,"./demos/shapes.tsx":Ae,"./demos/variants.tsx":Me})),Ie=()=>(0,Pe.jsx)(ie,{id:`tooltip`,demos:Fe})})))()}$();export{Ie as default};