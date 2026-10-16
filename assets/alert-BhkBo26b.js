import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{H as r,d as ee}from"./io5-BAuU0sG1.js";import{R as i,z as a}from"./ProgressIndicator-BhPa7d9i.js";import{n as o,t as s}from"./Alert-DjM4h90c.js";import{a as te,n as ne}from"./fi-D8K__0G2.js";import{l as re,n as ie,t as ae,u as oe}from"./DocPage-BJtkZ4N3.js";function se(){let[e,t]=(0,c.useState)(0);return(0,l.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,l.jsx)(a,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(e=>e+1),children:`Replay`}),(0,l.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[u.map(e=>(0,l.jsxs)(s,{animationName:e,children:[`animationName="`,e,`"`]},e)),(0,l.jsx)(s,{animation:!1,children:`animation={false}`})]},e)]})}var c,l,u;function d(){return(d=e((()=>{c=t(),o(),i(),l=n(),u=[`slideIn`,`fadeIn`,`bounce`,`zoom`]})))()}function ce(){return(0,f.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,f.jsx)(s,{color:`success`,icon:(0,f.jsx)(ne,{}),elevation:!0,children:`Custom icon with an elevated shadow.`}),(0,f.jsx)(s,{color:`info`,variant:`outline`,rounded:!1,children:`Outline variant with square corners.`}),(0,f.jsx)(s,{color:`info`,variant:`solid`,borderRadius:16,children:`Solid variant with a 16px radius.`})]})}var f;function p(){return(p=e((()=>{o(),te(),f=n()})))()}function le(){return(0,m.jsx)(s,{color:`warning`,banner:!0,closable:!0,children:`You are viewing a read-only copy of this document.`})}var m;function h(){return(h=e((()=>{o(),m=n()})))()}function ue(){let[e,t]=(0,g.useState)(0),[n,r]=(0,g.useState)(0);return(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,_.jsx)(s,{color:`info`,closable:!0,onClose:()=>r(e=>e+1),children:`Close me with the button on the right.`}),(0,_.jsx)(s,{color:`warning`,closable:!0,closeIcon:(0,_.jsx)(ee,{}),onClose:()=>r(e=>e+1),children:`This alert uses a custom close icon.`})]},e),(0,_.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,_.jsx)(a,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(e=>e+1),children:`Reset`}),(0,_.jsxs)(`span`,{children:[`Closed: `,n]})]})]})}var g,_;function v(){return(v=e((()=>{g=t(),o(),i(),r(),_=n()})))()}function de(){let[e,t]=(0,y.useState)(!1);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,b.jsx)(s,{color:`info`,title:`Release notes (${e?`expanded`:`collapsed`})`,collapsible:!0,expanded:e,onExpand:t,children:`Added dark mode, improved keyboard navigation and fixed several layout issues on small screens.`}),(0,b.jsx)(s,{color:`success`,title:`Uncontrolled`,collapsible:!0,children:`defaultExpanded (true by default) sets the initial state; the alert then manages it on its own.`})]})}var y,b;function x(){return(x=e((()=>{y=t(),o(),b=n()})))()}function fe(){return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,S.jsx)(s,{color:`info`,children:`A new version is available.`}),(0,S.jsx)(s,{color:`success`,children:`Your changes have been saved.`}),(0,S.jsx)(s,{color:`warning`,children:`Your trial ends in 3 days.`}),(0,S.jsx)(s,{color:`danger`,children:`The payment could not be processed.`})]})}var S;function C(){return(C=e((()=>{o(),S=n()})))()}function pe(){let[e,t]=(0,w.useState)(0),n=(0,w.useRef)(null);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsx)(s,{color:`info`,closable:!0,children:`Closing this alert moves focus to the next focusable element.`}),(0,T.jsx)(s,{color:`success`,closable:!0,returnFocus:n,children:`Closing this alert moves focus to the Reset button (returnFocus).`})]},e),(0,T.jsxs)(`div`,{style:{display:`flex`,gap:12},children:[(0,T.jsx)(a,{size:`small`,variant:`outline`,color:`neutral`,children:`Next focusable`}),(0,T.jsx)(a,{ref:n,size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t(e=>e+1),children:`Reset`})]})]})}var w,T;function E(){return(E=e((()=>{w=t(),o(),i(),T=n()})))()}function me(){return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,D.jsx)(s,{size:`small`,children:`Small alert`}),(0,D.jsx)(s,{size:`medium`,children:`Medium alert`}),(0,D.jsx)(s,{size:`large`,children:`Large alert`})]})}var D;function O(){return(O=e((()=>{o(),D=n()})))()}function he(){return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,k.jsx)(s,{color:`warning`,variant:`subtle`,children:`Subtle (default): tinted background.`}),(0,k.jsx)(s,{color:`warning`,variant:`outline`,children:`Outline: transparent background with a colored border.`}),(0,k.jsx)(s,{color:`warning`,variant:`solid`,children:`Solid: filled with the color.`})]})}var k;function A(){return(A=e((()=>{o(),k=n()})))()}function ge(){return(0,j.jsx)(s,{color:`danger`,title:`Sync failed`,action:(0,j.jsx)(a,{size:`small`,color:`danger`,children:`Retry`}),children:`We could not reach the server. Check your connection and try again.`})}var j;function _e(){return(_e=e((()=>{o(),i(),j=n()})))()}function ve(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsx)(s,{color:`success`,title:`Deployment complete`,children:`Version 2.4.0 is now live in production.`}),(0,M.jsx)(s,{color:`info`,title:`Scheduled maintenance`,showIcon:!1,children:`The service will be unavailable on Sunday from 02:00 to 04:00 UTC.`})]})}var M;function N(){return(N=e((()=>{o(),M=n()})))()}var P;function F(){return(F=e((()=>{P=`import { useState } from "react";
import { Alert, Button } from "minerva-design";

const names = ["slideIn", "fadeIn", "bounce", "zoom"] as const;

export default function AnimationsDemo() {
  const [key, setKey] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Button
        size="small"
        color="neutral"
        variant="outline"
        onClick={() => setKey((k) => k + 1)}
      >
        Replay
      </Button>
      <div key={key} style={{ display: "grid", gap: 12, width: "100%" }}>
        {names.map((name) => (
          <Alert key={name} animationName={name}>
            animationName=&quot;{name}&quot;
          </Alert>
        ))}
        <Alert animation={false}>animation=&#123;false&#125;</Alert>
      </div>
    </div>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { Alert } from "minerva-design";
import { FiGift } from "react-icons/fi";

export default function AppearanceDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="success" icon={<FiGift />} elevation>
        Custom icon with an elevated shadow.
      </Alert>
      <Alert color="info" variant="outline" rounded={false}>
        Outline variant with square corners.
      </Alert>
      <Alert color="info" variant="solid" borderRadius={16}>
        Solid variant with a 16px radius.
      </Alert>
    </div>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { Alert } from "minerva-design";

export default function BannerDemo() {
  return (
    <Alert color="warning" banner closable>
      You are viewing a read-only copy of this document.
    </Alert>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import { Alert, Button } from "minerva-design";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function ClosableDemo() {
  const [key, setKey] = useState(0);
  const [closed, setClosed] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div key={key} style={{ display: "grid", gap: 12, width: "100%" }}>
        <Alert color="info" closable onClose={() => setClosed((n) => n + 1)}>
          Close me with the button on the right.
        </Alert>
        <Alert
          color="warning"
          closable
          closeIcon={<IoCloseCircleOutline />}
          onClose={() => setClosed((n) => n + 1)}
        >
          This alert uses a custom close icon.
        </Alert>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setKey((k) => k + 1)}
        >
          Reset
        </Button>
        <span>Closed: {closed}</span>
      </div>
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
import { Alert } from "minerva-design";

export default function CollapsibleDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert
        color="info"
        title={\`Release notes (\${expanded ? "expanded" : "collapsed"})\`}
        collapsible
        expanded={expanded}
        onExpand={setExpanded}
      >
        Added dark mode, improved keyboard navigation and fixed several layout
        issues on small screens.
      </Alert>
      <Alert color="success" title="Uncontrolled" collapsible>
        defaultExpanded (true by default) sets the initial state; the alert then
        manages it on its own.
      </Alert>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Alert } from "minerva-design";

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="info">A new version is available.</Alert>
      <Alert color="success">Your changes have been saved.</Alert>
      <Alert color="warning">Your trial ends in 3 days.</Alert>
      <Alert color="danger">The payment could not be processed.</Alert>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useRef, useState } from "react";
import { Alert, Button } from "minerva-design";

export default function ReturnFocusDemo() {
  const [key, setKey] = useState(0);
  const resetRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div key={key} style={{ display: "grid", gap: 12, width: "100%" }}>
        <Alert color="info" closable>
          Closing this alert moves focus to the next focusable element.
        </Alert>
        <Alert color="success" closable returnFocus={resetRef}>
          Closing this alert moves focus to the Reset button (returnFocus).
        </Alert>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Button size="small" variant="outline" color="neutral">
          Next focusable
        </Button>
        <Button
          ref={resetRef}
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setKey((k) => k + 1)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Alert } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert size="small">Small alert</Alert>
      <Alert size="medium">Medium alert</Alert>
      <Alert size="large">Large alert</Alert>
    </div>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { Alert } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="warning" variant="subtle">
        Subtle (default): tinted background.
      </Alert>
      <Alert color="warning" variant="outline">
        Outline: transparent background with a colored border.
      </Alert>
      <Alert color="warning" variant="solid">
        Solid: filled with the color.
      </Alert>
    </div>
  );
}
`})))()}var Q;function $(){return($=e((()=>{Q=`import { Alert, Button } from "minerva-design";

export default function WithActionDemo() {
  return (
    <Alert
      color="danger"
      title="Sync failed"
      action={
        <Button size="small" color="danger">
          Retry
        </Button>
      }
    >
      We could not reach the server. Check your connection and try again.
    </Alert>
  );
}
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { Alert } from "minerva-design";

export default function WithTitleDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="success" title="Deployment complete">
        Version 2.4.0 is now live in production.
      </Alert>
      <Alert color="info" title="Scheduled maintenance" showIcon={false}>
        The service will be unavailable on Sunday from 02:00 to 04:00 UTC.
      </Alert>
    </div>
  );
}
`})))()}var xe,Se,Ce;function we(){return(we=e((()=>{d(),p(),h(),v(),x(),C(),E(),O(),A(),_e(),N(),F(),L(),z(),V(),U(),G(),q(),Y(),Z(),$(),be(),t(),ie(),oe(),xe=n(),Se=re(Object.assign({"./demos/animations.tsx":se,"./demos/appearance.tsx":ce,"./demos/banner.tsx":le,"./demos/closable.tsx":ue,"./demos/collapsible.tsx":de,"./demos/colors.tsx":fe,"./demos/return-focus.tsx":pe,"./demos/sizes.tsx":me,"./demos/variants.tsx":he,"./demos/with-action.tsx":ge,"./demos/with-title.tsx":ve}),Object.assign({"./demos/animations.tsx":P,"./demos/appearance.tsx":I,"./demos/banner.tsx":R,"./demos/closable.tsx":B,"./demos/collapsible.tsx":H,"./demos/colors.tsx":W,"./demos/return-focus.tsx":K,"./demos/sizes.tsx":J,"./demos/variants.tsx":X,"./demos/with-action.tsx":Q,"./demos/with-title.tsx":ye})),Ce=()=>(0,xe.jsx)(ae,{id:`alert`,demos:Se})})))()}we();export{Ce as default};