import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{N as r,T as ee,V as i,X as a,et as te,gt as ne}from"./icons-BnhBUHMa.js";import{n as o,t as s}from"./Badge-DZQiOR_5.js";import{i as c,n as re,r as l}from"./Stack-NslbKtAY.js";import{l as ie,n as ae,t as oe,u as se}from"./DocPage-B93OiV4a.js";function ce(){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s,{content:5,"aria-label":`5 unread notifications`,children:(0,u.jsx)(r,{size:24,"aria-label":`Notifications`})}),(0,u.jsx)(s,{content:`99+`,"aria-label":`More than 99 messages`,children:(0,u.jsx)(ee,{size:24,"aria-label":`Messages`})}),(0,u.jsxs)(`span`,{children:[`Inbox `,(0,u.jsx)(s,{content:12,color:`info`,"aria-label":`12 unread`}),` and changelog `,(0,u.jsx)(s,{color:`success`,children:`New`})]})]})}var u;function d(){return(d=e((()=>{a(),o(),u=n()})))()}function le(){return(0,f.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:24},children:p.map((e,t)=>(0,f.jsx)(s,{color:e,content:t+1,"aria-label":`${e} badge`,children:(0,f.jsx)(r,{size:24,title:e})},e))})}var f,p;function m(){return(m=e((()=>{a(),o(),f=n(),p=[`primary`,`neutral`,`success`,`warning`,`danger`,`info`]})))()}function ue(){return(0,h.jsxs)(`div`,{style:{display:`flex`,gap:24},children:[(0,h.jsx)(s,{content:1,borderRadius:`12px`,style:g,children:(0,h.jsx)(r,{size:24})}),(0,h.jsx)(s,{content:2,variant:`outline`,borderWidth:`2px`,style:_,children:(0,h.jsx)(r,{size:24})})]})}var h,g,_;function v(){return(v=e((()=>{a(),o(),h=n(),g={"--badge-bg":`#7c3aed`,"--badge-fg":`#ffffff`},_={"--badge-fg":`#e65100`,"--badge-border":`#e65100`}})))()}function de(){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{dot:!0,color:`primary`,"aria-label":`New activity`,children:(0,y.jsx)(r,{size:24})}),(0,y.jsx)(s,{dot:!0,color:`success`,"aria-label":`Online`,children:(0,y.jsx)(r,{size:24})}),(0,y.jsx)(s,{dot:!0,color:`danger`,"aria-label":`Danger`,children:(0,y.jsx)(r,{size:24})})]})}var y;function b(){return(b=e((()=>{a(),o(),y=n()})))()}function fe(){return(0,x.jsx)(`div`,{style:{display:`flex`,gap:32},children:S.map((e,t)=>(0,x.jsx)(s,{position:e,content:t+1,children:(0,x.jsx)(r,{size:24})},e))})}var x,S;function C(){return(C=e((()=>{a(),o(),x=n(),S=[`top-right`,`top-left`,`bottom-right`,`bottom-left`]})))()}function pe(){return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{size:`small`,content:`S`,children:(0,w.jsx)(r,{size:24})}),(0,w.jsx)(s,{size:`medium`,content:`M`,children:(0,w.jsx)(r,{size:24})}),(0,w.jsx)(s,{size:`large`,content:`L`,children:(0,w.jsx)(r,{size:24})})]})}var w;function T(){return(T=e((()=>{a(),o(),w=n()})))()}function me(){return(0,E.jsx)(c,{gap:4,wrap:!0,children:D.map(({color:e,label:t})=>(0,E.jsxs)(c,{gap:2,align:`center`,children:[(0,E.jsx)(s,{dot:!0,color:e,role:`presentation`}),(0,E.jsx)(`span`,{children:t})]},t))})}var E,D;function O(){return(O=e((()=>{o(),l(),E=n(),D=[{color:`success`,label:`Online`},{color:`warning`,label:`Away`},{color:`danger`,label:`Busy`},{color:`neutral`,label:`Offline`}]})))()}function he(){return(0,k.jsx)(re,{gap:3,children:ge.map(e=>(0,k.jsx)(c,{gap:2,wrap:!0,children:A.map(t=>(0,k.jsxs)(s,{variant:e,color:t,children:[e,` `,t]},t))},e))})}var k,ge,A;function j(){return(j=e((()=>{o(),l(),k=n(),ge=[`solid`,`subtle`,`outline`],A=[`primary`,`neutral`,`success`,`warning`,`danger`,`info`]})))()}function _e(){return(0,M.jsxs)(`div`,{style:{display:`flex`,gap:48},children:[(0,M.jsx)(s,{color:`success`,icon:(0,M.jsx)(ne,{size:`1em`}),content:`OK`,"aria-label":`Verified`,children:(0,M.jsx)(i,{size:24})}),(0,M.jsx)(s,{color:`warning`,icon:(0,M.jsx)(te,{size:`1em`}),content:`Top`,"aria-label":`Top rated`,children:(0,M.jsx)(i,{size:24})})]})}var M;function N(){return(N=e((()=>{a(),o(),M=n()})))()}var P;function F(){return(F=e((()=>{P=`import { BellIcon, MailIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Badge content={5} aria-label="5 unread notifications">
        <BellIcon size={24} aria-label="Notifications" />
      </Badge>
      <Badge content="99+" aria-label="More than 99 messages">
        <MailIcon size={24} aria-label="Messages" />
      </Badge>
      <span>
        Inbox <Badge content={12} color="info" aria-label="12 unread" /> and
        changelog <Badge color="success">New</Badge>
      </span>
    </>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { BellIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

const colors = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {colors.map((color, index) => (
        <Badge
          key={color}
          color={color}
          content={index + 1}
          aria-label={\`\${color} badge\`}
        >
          <BellIcon size={24} title={color} />
        </Badge>
      ))}
    </div>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { BellIcon } from "minerva-design/icons";
import type { CSSProperties } from "react";
import { Badge } from "minerva-design";

// --badge-bg, --badge-fg and --badge-border override the theme colors; they
// can also be set from a stylesheet, for a single badge or a whole subtree.
const brand = {
  "--badge-bg": "#7c3aed",
  "--badge-fg": "#ffffff",
} as CSSProperties;

const outlined = {
  "--badge-fg": "#e65100",
  "--badge-border": "#e65100",
} as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <Badge content={1} borderRadius="12px" style={brand}>
        <BellIcon size={24} />
      </Badge>
      <Badge content={2} variant="outline" borderWidth="2px" style={outlined}>
        <BellIcon size={24} />
      </Badge>
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { BellIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function DotDemo() {
  return (
    <>
      <Badge dot color="primary" aria-label="New activity">
        <BellIcon size={24} />
      </Badge>
      <Badge dot color="success" aria-label="Online">
        <BellIcon size={24} />
      </Badge>
      <Badge dot color="danger" aria-label="Danger">
        <BellIcon size={24} />
      </Badge>
    </>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { BellIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

const positions = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;

export default function PositionsDemo() {
  return (
    <div style={{ display: "flex", gap: 32 }}>
      {positions.map((position, index) => (
        <Badge key={position} position={position} content={index + 1}>
          <BellIcon size={24} />
        </Badge>
      ))}
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { BellIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Badge size="small" content="S">
        <BellIcon size={24} />
      </Badge>
      <Badge size="medium" content="M">
        <BellIcon size={24} />
      </Badge>
      <Badge size="large" content="L">
        <BellIcon size={24} />
      </Badge>
    </>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Badge, HStack } from "minerva-design";

const statuses = [
  { color: "success", label: "Online" },
  { color: "warning", label: "Away" },
  { color: "danger", label: "Busy" },
  { color: "neutral", label: "Offline" },
] as const;

export default function StatusDemo() {
  return (
    <HStack gap={4} wrap>
      {statuses.map(({ color, label }) => (
        <HStack key={label} gap={2} align="center">
          {/* The visible text names the status, so the dot is decorative */}
          <Badge dot color={color} role="presentation" />
          <span>{label}</span>
        </HStack>
      ))}
    </HStack>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Badge, HStack, VStack } from "minerva-design";

const variants = ["solid", "subtle", "outline"] as const;
const colors = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {variants.map((variant) => (
        <HStack key={variant} gap={2} wrap>
          {colors.map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {variant} {color}
            </Badge>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { CheckIcon, StarIcon, UserIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function WithIconDemo() {
  return (
    <div style={{ display: "flex", gap: 48 }}>
      <Badge
        color="success"
        icon={<CheckIcon size="1em" />}
        content="OK"
        aria-label="Verified"
      >
        <UserIcon size={24} />
      </Badge>
      <Badge
        color="warning"
        icon={<StarIcon size="1em" />}
        content="Top"
        aria-label="Top rated"
      >
        <UserIcon size={24} />
      </Badge>
    </div>
  );
}
`})))()}var Q,ve,ye;function $(){return($=e((()=>{d(),m(),v(),b(),C(),T(),O(),j(),N(),F(),L(),z(),V(),U(),G(),q(),Y(),Z(),t(),ae(),se(),Q=n(),ve=ie(Object.assign({"./demos/basic.tsx":ce,"./demos/colors.tsx":le,"./demos/custom-style.tsx":ue,"./demos/dot.tsx":de,"./demos/positions.tsx":fe,"./demos/sizes.tsx":pe,"./demos/status.tsx":me,"./demos/variants.tsx":he,"./demos/with-icon.tsx":_e}),Object.assign({"./demos/basic.tsx":P,"./demos/colors.tsx":I,"./demos/custom-style.tsx":R,"./demos/dot.tsx":B,"./demos/positions.tsx":H,"./demos/sizes.tsx":W,"./demos/status.tsx":K,"./demos/variants.tsx":J,"./demos/with-icon.tsx":X})),ye=()=>(0,Q.jsx)(oe,{id:`badge`,demos:ve})})))()}$();export{ye as default};