import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{_t as r,vt as i}from"./io5-DGxLJ5Qx.js";import{Mn as a,rt as o}from"./angular-preview-CxN7u9Fp.js";import{B as s,V as c}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as l}from"./stylingHooks-PqiNJdev.js";import{n as u,t as d}from"./steps.module.scss-rZ9boK3a.js";import{l as f,n as p,t as m,u as h}from"./DocPage-C8sgoG-d.js";var g,_;function v(){return(v=e((()=>{a(),c(),i(),d(),g=n(),_=({items:e,value:t,defaultValue:n,onChange:i,readOnly:a=i===void 0,"aria-label":c,className:d,ref:f,...p})=>{let{t:m}=s(),[h,_]=r({value:t,defaultValue:n??``,onChange:i,name:`Steps`}),v=e.findIndex(e=>e.value===h);return(0,g.jsx)(`ol`,{"aria-label":c??m(`steps.label`),...p,ref:f,className:o(u.steps,d),...l(`steps`,`root`,{readonly:a}),children:e.map((e,t)=>{let n=t===v,r=v>-1&&t<v,i=(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`span`,{className:u.number,"aria-hidden":`true`,...l(`steps`,`indicator`),children:t+1}),(0,g.jsx)(`span`,{className:u.label,...l(`steps`,`label`),children:e.label})]});return(0,g.jsx)(`li`,{className:o(u.step,{[u.current]:n,[u.complete]:r}),"aria-current":a&&n?`step`:void 0,...l(`steps`,`item`,{current:n,disabled:!a&&e.disabled,status:n?void 0:r?`complete`:`upcoming`}),children:a?(0,g.jsx)(`span`,{className:o(u.button,u.static),...l(`steps`,`button`),children:i}):(0,g.jsx)(`button`,{type:`button`,className:u.button,disabled:e.disabled,"aria-current":n?`step`:void 0,...l(`steps`,`button`),onClick:()=>{n||_(e.value)},children:i})},e.value)})})}})))()}function y(){let[e,t]=(0,b.useState)(`review`);return(0,x.jsx)(_,{items:S,value:e,onChange:t})}var b,x,S;function C(){return(C=e((()=>{b=t(),v(),x=n(),S=[{value:`draft`,label:`Draft`},{value:`review`,label:`Review`},{value:`publish`,label:`Publish`,disabled:!0}]})))()}function w(){return(0,T.jsx)(_,{"aria-label":`Order progress`,value:`shipped`,items:[{value:`paid`,label:`Paid`},{value:`shipped`,label:`Shipped`},{value:`delivered`,label:`Delivered`}]})}var T;function E(){return(E=e((()=>{v(),T=n()})))()}function D(){return(0,O.jsx)(_,{"aria-label":`Deployment`,value:`deploy`,style:k,items:[{value:`build`,label:`Build`},{value:`test`,label:`Test`},{value:`deploy`,label:`Deploy`},{value:`verify`,label:`Verify`}]})}var O,k;function A(){return(A=e((()=>{v(),O=n(),k={"--steps-accent-color":`var(--success-color)`,"--steps-connector-min-width":`3rem`}})))()}var j;function M(){return(M=e((()=>{j=`import { useState } from "react";
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