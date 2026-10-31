import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,ut as i}from"./angular-preview-l4x8c_2r.js";import{B as a,V as o}from"./ProgressIndicator-BMZ0rR7D.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{St as c,xt as l}from"./io5-DWV9qlxB.js";import{n as u,t as d}from"./steps.module.scss-rZ9boK3a.js";import{l as f,n as p,t as m,u as h}from"./DocPage-BbPSunu1.js";var g,_;function v(){return(v=e((()=>{r(),o(),c(),d(),g=n(),_=({items:e,value:t,defaultValue:n,onChange:r,readOnly:o=r===void 0,"aria-label":c,className:d,ref:f,...p})=>{let{t:m}=a(),[h,_]=l({value:t,defaultValue:n??``,onChange:r,name:`Steps`}),v=e.findIndex(e=>e.value===h);return(0,g.jsx)(`ol`,{"aria-label":c??m(`steps.label`),...p,ref:f,className:i(u.steps,d),...s(`steps`,`root`,{readonly:o}),children:e.map((e,t)=>{let n=t===v,r=v>-1&&t<v,a=(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`span`,{className:u.number,"aria-hidden":`true`,...s(`steps`,`indicator`),children:t+1}),(0,g.jsx)(`span`,{className:u.label,...s(`steps`,`label`),children:e.label})]});return(0,g.jsx)(`li`,{className:i(u.step,{[u.current]:n,[u.complete]:r}),"aria-current":o&&n?`step`:void 0,...s(`steps`,`item`,{current:n,disabled:!o&&e.disabled,status:n?void 0:r?`complete`:`upcoming`}),children:o?(0,g.jsx)(`span`,{className:i(u.button,u.static),...s(`steps`,`button`),children:a}):(0,g.jsx)(`button`,{type:`button`,className:u.button,disabled:e.disabled,"aria-current":n?`step`:void 0,...s(`steps`,`button`),onClick:()=>{n||_(e.value)},children:a})},e.value)})})}})))()}function y(){let[e,t]=(0,b.useState)(`review`);return(0,x.jsx)(_,{items:S,value:e,onChange:t})}var b,x,S;function C(){return(C=e((()=>{b=t(),v(),x=n(),S=[{value:`draft`,label:`Draft`},{value:`review`,label:`Review`},{value:`publish`,label:`Publish`,disabled:!0}]})))()}function w(){return(0,T.jsx)(_,{"aria-label":`Order progress`,value:`shipped`,items:[{value:`paid`,label:`Paid`},{value:`shipped`,label:`Shipped`},{value:`delivered`,label:`Delivered`}]})}var T;function E(){return(E=e((()=>{v(),T=n()})))()}function D(){return(0,O.jsx)(_,{"aria-label":`Deployment`,value:`deploy`,style:k,items:[{value:`build`,label:`Build`},{value:`test`,label:`Test`},{value:`deploy`,label:`Deploy`},{value:`verify`,label:`Verify`}]})}var O,k;function A(){return(A=e((()=>{v(),O=n(),k={"--steps-accent-color":`var(--success-color)`,"--steps-connector-min-width":`3rem`}})))()}var j;function M(){return(M=e((()=>{j=`import { useState } from "react";
import { Steps } from "minerva-design";

const items = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish", disabled: true },
];

export default function BasicDemo() {
  const [step, setStep] = useState("review");
  return <Steps items={items} value={step} onChange={setStep} />;
}
`})))()}var N;function P(){return(P=e((()=>{N=`import { Steps } from "minerva-design";

export default function ReadOnlyDemo() {
  return (
    <Steps
      aria-label="Order progress"
      value="shipped"
      items={[
        { value: "paid", label: "Paid" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
      ]}
    />
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import type { CSSProperties } from "react";
import { Steps } from "minerva-design";

// Completed steps show a check on a solid disc, the current one a halo;
// connectors fill in as the steps complete.
const style = {
  "--steps-accent-color": "var(--success-color)",
  "--steps-connector-min-width": "3rem",
} as CSSProperties;

export default function StylingDemo() {
  return (
    <Steps
      aria-label="Deployment"
      value="deploy"
      style={style}
      items={[
        { value: "build", label: "Build" },
        { value: "test", label: "Test" },
        { value: "deploy", label: "Deploy" },
        { value: "verify", label: "Verify" },
      ]}
    />
  );
}
`})))()}var L,R,z;function B(){return(B=e((()=>{C(),E(),A(),M(),P(),I(),t(),p(),h(),L=n(),R=f(Object.assign({"./demos/basic.tsx":y,"./demos/read-only.tsx":w,"./demos/styling.tsx":D}),Object.assign({"./demos/basic.tsx":j,"./demos/read-only.tsx":N,"./demos/styling.tsx":F})),z=()=>(0,L.jsx)(m,{id:`steps`,demos:R})})))()}B();export{z as default};