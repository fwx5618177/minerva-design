import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,ut as i}from"./angular-preview-l4x8c_2r.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{t as c}from"./dataAttributes-CDHeJa9q.js";import{n as l,t as u}from"./previewDocument-BJeBpqAv.js";import{n as d,t as f}from"./htmlPreview.module.scss-LxdH_dp3.js";import{l as p,n as m,t as h,u as g}from"./DocPage-BbPSunu1.js";var _,v,y;function b(){return(b=e((()=>{r(),l(),f(),_=t(),v=n(),y=({html:e,title:t,viewport:n=`desktop`,mobileWidth:r=375,height:a=600,className:o,style:l,ref:f,...p})=>{let[m,h]=(0,_.useState)(()=>u());(0,_.useEffect)(()=>h(u(e)),[e]);let g=Number.isFinite(r)&&r>0?r:375,y=Number.isFinite(a)&&a>0?a:600;return(0,v.jsx)(`div`,{...c(p),ref:f,className:i(d.preview,o),style:l,...s(`html-preview`,`root`),children:(0,v.jsx)(`iframe`,{title:t,sandbox:``,referrerPolicy:`no-referrer`,srcDoc:m,className:d.frame,...s(`html-preview`,`frame`),style:{width:n===`mobile`?g:`100%`,height:y}},m)})}})))()}function x(){return(0,S.jsx)(y,{title:`Welcome email preview`,html:C,height:320})}var S,C;function w(){return(w=e((()=>{b(),S=n(),C=`
<style>
  .card { font-family: sans-serif; max-width: 480px; margin: 24px auto; padding: 24px;
          border: 1px solid #ddd; border-radius: 8px; }
  .cta { display: inline-block; padding: 8px 16px; background: #4f46e5; color: #fff; }
</style>
<div class="card">
  <h2>Welcome aboard!</h2>
  <p>Thanks for signing up. Scripts, forms and remote images are removed.</p>
  <script>alert("never runs")<\/script>
  <img src="https://example.com/tracking-pixel.png" alt="tracking pixel">
  <span class="cta">Get started</span>
</div>`})))()}function T(){let[e,t]=(0,E.useState)(`mobile`);return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,D.jsxs)(o,{color:`neutral`,variant:`outline`,size:`small`,onClick:()=>t(e=>e===`mobile`?`desktop`:`mobile`),children:[`Switch to `,e===`mobile`?`desktop`:`mobile`]}),(0,D.jsx)(y,{title:`Newsletter preview`,html:O,viewport:e,mobileWidth:360,height:240})]})}var E,D,O;function k(){return(k=e((()=>{E=t(),a(),b(),D=n(),O=`<div style="font-family: sans-serif; padding: 16px">
  <h3>Responsive newsletter</h3>
  <p>Resize the preview between desktop and mobile widths.</p>
</div>`})))()}var A;function j(){return(j=e((()=>{A=`import { HtmlPreview } from "minerva-design";

const email = \`
<style>
  .card { font-family: sans-serif; max-width: 480px; margin: 24px auto; padding: 24px;
          border: 1px solid #ddd; border-radius: 8px; }
  .cta { display: inline-block; padding: 8px 16px; background: #4f46e5; color: #fff; }
</style>
<div class="card">
  <h2>Welcome aboard!</h2>
  <p>Thanks for signing up. Scripts, forms and remote images are removed.</p>
  <script>alert("never runs")<\/script>
  <img src="https://example.com/tracking-pixel.png" alt="tracking pixel">
  <span class="cta">Get started</span>
</div>\`;

export default function BasicDemo() {
  return (
    <HtmlPreview title="Welcome email preview" html={email} height={320} />
  );
}
`})))()}var M;function N(){return(N=e((()=>{M=`import { useState } from "react";
import { Button, HtmlPreview, type HtmlPreviewViewport } from "minerva-design";

const html = \`<div style="font-family: sans-serif; padding: 16px">
  <h3>Responsive newsletter</h3>
  <p>Resize the preview between desktop and mobile widths.</p>
</div>\`;

export default function ViewportsDemo() {
  const [viewport, setViewport] = useState<HtmlPreviewViewport>("mobile");
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() =>
          setViewport((v) => (v === "mobile" ? "desktop" : "mobile"))
        }
      >
        Switch to {viewport === "mobile" ? "desktop" : "mobile"}
      </Button>
      <HtmlPreview
        title="Newsletter preview"
        html={html}
        viewport={viewport}
        mobileWidth={360}
        height={240}
      />
    </div>
  );
}
`})))()}var P,F,I;function L(){return(L=e((()=>{w(),k(),j(),N(),t(),m(),g(),P=n(),F=p(Object.assign({"./demos/basic.tsx":x,"./demos/viewports.tsx":T}),Object.assign({"./demos/basic.tsx":A,"./demos/viewports.tsx":M})),I=()=>(0,P.jsx)(h,{id:`html-preview`,demos:F})})))()}L();export{I as default};