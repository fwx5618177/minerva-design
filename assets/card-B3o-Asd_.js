import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BMZ0rR7D.js";import{a,i as o,n as s,o as c,r as l,s as u,t as d}from"./Card-Cm83NXvy.js";import{l as f,n as p,t as m,u as h}from"./DocPage-CmQtD5jg.js";function g(){let[e,t]=(0,_.useState)(0);return(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:`100%`},children:[(0,v.jsx)(`div`,{children:(0,v.jsx)(i,{size:`small`,onClick:()=>t(e=>e+1),children:`Replay`})}),(0,v.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`,gap:16},children:y.map(t=>(0,v.jsxs)(d,{children:[(0,v.jsx)(a,{children:(0,v.jsx)(u,{children:t})}),(0,v.jsx)(l,{animation:t,children:`Animated content`},e)]},t))})]})}var _,v,y;function b(){return(b=e((()=>{_=t(),r(),o(),v=n(),y=[`fadeIn`,`slideIn`,`zoomIn`]})))()}function x(){let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(`div`,{style:{width:340},children:[(0,C.jsxs)(d,{children:[(0,C.jsxs)(a,{children:[(0,C.jsx)(u,{children:`Project Apollo`}),(0,C.jsx)(s,{children:`Updated 2 hours ago`})]}),(0,C.jsx)(l,{children:`A design system for building accessible, themeable interfaces.`}),(0,C.jsx)(c,{children:(0,C.jsx)(i,{size:`small`,onClick:()=>t(!0),children:`Open`})})]}),e&&(0,C.jsx)(`p`,{role:`status`,children:`Opened Project Apollo`})]})}var S,C;function w(){return(w=e((()=>{S=t(),r(),o(),C=n()})))()}function T(){return(0,E.jsx)(`div`,{style:{width:340},children:(0,E.jsxs)(d,{variant:`outline`,children:[(0,E.jsxs)(a,{style:{backgroundColor:`#4f46e5`,color:`#ffffff`},children:[(0,E.jsx)(u,{children:`Pro plan`}),(0,E.jsx)(s,{children:`Everything in Free, plus more`})]}),(0,E.jsx)(l,{style:{backgroundColor:`#eef2ff`,color:`#312e81`},children:`Unlimited projects, priority support and advanced analytics.`}),(0,E.jsx)(c,{style:{backgroundColor:`#e0e7ff`,color:`#312e81`},children:(0,E.jsx)(i,{size:`small`,children:`Upgrade`})})]})})}var E;function D(){return(D=e((()=>{r(),o(),E=n()})))()}function O(){return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,width:320},children:[(0,k.jsxs)(d,{as:`a`,href:`#books/1`,variant:`outline`,padding:`small`,interactive:!0,children:[(0,k.jsx)(u,{as:`h4`,children:`The Three-Body Problem`}),(0,k.jsx)(s,{children:`A link card with hover and focus feedback`})]}),(0,k.jsxs)(d,{as:`button`,variant:`ghost`,padding:`small`,interactive:!0,children:[(0,k.jsx)(u,{as:`h4`,children:`Ghost button card`}),(0,k.jsx)(s,{children:`Transparent until hovered`})]})]})}var k;function A(){return(A=e((()=>{o(),k=n()})))()}function j(){return(0,M.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:16,width:`100%`},children:[`outline`,`elevated`,`filled`,`ghost`].map(e=>(0,M.jsxs)(d,{variant:e,padding:`medium`,children:[(0,M.jsxs)(a,{children:[(0,M.jsx)(u,{children:e}),(0,M.jsx)(s,{children:`padding="medium"`})]}),(0,M.jsx)(l,{children:`The card pads itself; sections sit flush.`}),(0,M.jsx)(c,{children:(0,M.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:`Details`})})]},e))})}var M;function N(){return(N=e((()=>{r(),o(),M=n()})))()}function P(){return(0,F.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`,gap:16,width:`100%`},children:I.map(e=>(0,F.jsxs)(d,{variant:e,children:[(0,F.jsx)(a,{children:(0,F.jsx)(u,{children:e})}),(0,F.jsxs)(l,{children:[`variant="`,e,`"`]})]},e))})}var F,I;function L(){return(L=e((()=>{o(),F=n(),I=[`default`,`outline`,`elevated`,`filled`,`ghost`]})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "minerva-design";

const animations = ["fadeIn", "slideIn", "zoomIn"] as const;

export default function AnimationDemo() {
  const [round, setRound] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
      }}
    >
      <div>
        <Button size="small" onClick={() => setRound((r) => r + 1)}>
          Replay
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {animations.map((animation) => (
          <Card key={animation}>
            <CardHeader>
              <CardTitle>{animation}</CardTitle>
            </CardHeader>
            <CardContent key={round} animation={animation}>
              Animated content
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "minerva-design";

export default function BasicDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <div style={{ width: 340 }}>
      <Card>
        <CardHeader>
          <CardTitle>Project Apollo</CardTitle>
          <CardDescription>Updated 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          A design system for building accessible, themeable interfaces.
        </CardContent>
        <CardFooter>
          <Button size="small" onClick={() => setOpened(true)}>
            Open
          </Button>
        </CardFooter>
      </Card>
      {opened && <p role="status">Opened Project Apollo</p>}
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "minerva-design";

export default function CustomColorsDemo() {
  return (
    <div style={{ width: 340 }}>
      <Card variant="outline">
        <CardHeader style={{ backgroundColor: "#4f46e5", color: "#ffffff" }}>
          <CardTitle>Pro plan</CardTitle>
          <CardDescription>Everything in Free, plus more</CardDescription>
        </CardHeader>
        <CardContent style={{ backgroundColor: "#eef2ff", color: "#312e81" }}>
          Unlimited projects, priority support and advanced analytics.
        </CardContent>
        <CardFooter style={{ backgroundColor: "#e0e7ff", color: "#312e81" }}>
          <Button size="small">Upgrade</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Card, CardDescription, CardTitle } from "minerva-design";

export default function InteractiveDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      <Card
        as="a"
        href="#books/1"
        variant="outline"
        padding="small"
        interactive
      >
        <CardTitle as="h4">The Three-Body Problem</CardTitle>
        <CardDescription>
          A link card with hover and focus feedback
        </CardDescription>
      </Card>
      <Card as="button" variant="ghost" padding="small" interactive>
        <CardTitle as="h4">Ghost button card</CardTitle>
        <CardDescription>Transparent until hovered</CardDescription>
      </Card>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "minerva-design";

export default function PaddedDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {(["outline", "elevated", "filled", "ghost"] as const).map((variant) => (
        <Card key={variant} variant={variant} padding="medium">
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>padding=&quot;medium&quot;</CardDescription>
          </CardHeader>
          <CardContent>The card pads itself; sections sit flush.</CardContent>
          <CardFooter>
            <Button size="small" color="neutral" variant="outline">
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Card, CardContent, CardHeader, CardTitle } from "minerva-design";

const variants = ["default", "outline", "elevated", "filled", "ghost"] as const;

export default function VariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {variants.map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
          </CardHeader>
          <CardContent>variant=&quot;{variant}&quot;</CardContent>
        </Card>
      ))}
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{b(),w(),D(),A(),N(),L(),z(),V(),U(),G(),q(),Y(),t(),p(),h(),X=n(),Z=f(Object.assign({"./demos/animation.tsx":g,"./demos/basic.tsx":x,"./demos/custom-colors.tsx":T,"./demos/interactive.tsx":O,"./demos/padded.tsx":j,"./demos/variants.tsx":P}),Object.assign({"./demos/animation.tsx":R,"./demos/basic.tsx":B,"./demos/custom-colors.tsx":H,"./demos/interactive.tsx":W,"./demos/padded.tsx":K,"./demos/variants.tsx":J})),Q=()=>(0,X.jsx)(m,{id:`card`,demos:Z})})))()}$();export{Q as default};