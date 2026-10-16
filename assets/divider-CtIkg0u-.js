import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./Divider-D6jUWnQI.js";import{l as a,n as o,t as s,u as c}from"./DocPage-BJtkZ4N3.js";function l(){return(0,u.jsxs)(`div`,{style:{width:`100%`},children:[(0,u.jsx)(`p`,{children:`Content above the divider.`}),(0,u.jsx)(i,{}),(0,u.jsx)(`p`,{children:`Content below the divider.`})]})}var u;function d(){return(d=e((()=>{r(),u=n()})))()}function f(){return(0,p.jsxs)(`div`,{style:{width:`100%`},children:[(0,p.jsx)(i,{style:m,thickness:2}),(0,p.jsx)(i,{style:h,thickness:3,variant:`dashed`,length:`50%`}),(0,p.jsx)(i,{style:m,children:`Section`}),(0,p.jsx)(i,{spacing:32,elevation:!0})]})}var p,m,h;function g(){return(g=e((()=>{r(),p=n(),m={"--divider-color":`#7c3aed`},h={"--divider-color":`#16a34a`}})))()}function _(){return(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,height:48},children:[(0,v.jsx)(`span`,{children:`Edit`}),(0,v.jsx)(i,{orientation:`vertical`,flexItem:!0,spacing:0}),(0,v.jsx)(`span`,{children:`Share`}),(0,v.jsx)(i,{orientation:`vertical`,flexItem:!0,spacing:0}),(0,v.jsx)(`span`,{children:`Delete`})]})}var v;function y(){return(y=e((()=>{r(),v=n()})))()}function b(){return(0,x.jsxs)(`div`,{style:{width:`100%`},children:[(0,x.jsx)(i,{variant:`solid`}),(0,x.jsx)(i,{variant:`dashed`}),(0,x.jsx)(i,{variant:`dotted`})]})}var x;function S(){return(S=e((()=>{r(),x=n()})))()}function C(){return(0,w.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`},children:[(0,w.jsx)(`span`,{children:`Home`}),(0,w.jsx)(i,{orientation:`vertical`,length:16,spacing:12}),(0,w.jsx)(`span`,{children:`Products`}),(0,w.jsx)(i,{orientation:`vertical`,length:16,spacing:12}),(0,w.jsx)(`span`,{children:`About`})]})}var w;function T(){return(T=e((()=>{r(),w=n()})))()}function E(){return(0,D.jsxs)(`div`,{style:{width:`100%`},children:[(0,D.jsx)(i,{textAlign:`left`,children:`Left`}),(0,D.jsx)(i,{children:`Center`}),(0,D.jsx)(i,{textAlign:`right`,variant:`dashed`,thickness:3,children:`Right`})]})}var D;function O(){return(O=e((()=>{r(),D=n()})))()}var k;function A(){return(A=e((()=>{k=`import { Divider } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ width: "100%" }}>
      <p>Content above the divider.</p>
      <Divider />
      <p>Content below the divider.</p>
    </div>
  );
}
`})))()}var j;function M(){return(M=e((()=>{j=`import type { CSSProperties } from "react";
import { Divider } from "minerva-design";

// The line color comes from the --divider-color custom property; set it
// inline, in a class or on an ancestor.
const violet = { "--divider-color": "#7c3aed" } as CSSProperties;
const green = { "--divider-color": "#16a34a" } as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider style={violet} thickness={2} />
      <Divider style={green} thickness={3} variant="dashed" length="50%" />
      <Divider style={violet}>Section</Divider>
      <Divider spacing={32} elevation />
    </div>
  );
}
`})))()}var N;function P(){return(P=e((()=>{N=`import { Divider } from "minerva-design";

export default function FlexItemDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 48 }}>
      <span>Edit</span>
      <Divider orientation="vertical" flexItem spacing={0} />
      <span>Share</span>
      <Divider orientation="vertical" flexItem spacing={0} />
      <span>Delete</span>
    </div>
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { Divider } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider variant="solid" />
      <Divider variant="dashed" />
      <Divider variant="dotted" />
    </div>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { Divider } from "minerva-design";

export default function VerticalDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>Home</span>
      <Divider orientation="vertical" length={16} spacing={12} />
      <span>Products</span>
      <Divider orientation="vertical" length={16} spacing={12} />
      <span>About</span>
    </div>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { Divider } from "minerva-design";

export default function WithTextDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider textAlign="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider textAlign="right" variant="dashed" thickness={3}>
        Right
      </Divider>
    </div>
  );
}
`})))()}var V,H,U;function W(){return(W=e((()=>{d(),g(),y(),S(),T(),O(),A(),M(),P(),I(),R(),B(),t(),o(),c(),V=n(),H=a(Object.assign({"./demos/basic.tsx":l,"./demos/custom-style.tsx":f,"./demos/flex-item.tsx":_,"./demos/variants.tsx":b,"./demos/vertical.tsx":C,"./demos/with-text.tsx":E}),Object.assign({"./demos/basic.tsx":k,"./demos/custom-style.tsx":j,"./demos/flex-item.tsx":N,"./demos/variants.tsx":F,"./demos/vertical.tsx":L,"./demos/with-text.tsx":z})),U=()=>(0,V.jsx)(s,{id:`divider`,demos:H})})))()}W();export{U as default};