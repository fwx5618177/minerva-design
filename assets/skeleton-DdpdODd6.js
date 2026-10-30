import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,Tt as ee,ut as i}from"./angular-preview-l4x8c_2r.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{n as c,t as l}from"./skeleton.module.scss-AfK2l25J.js";import{n as u,t as d}from"./Skeleton-DbQjCzwa.js";import{l as f,n as te,t as ne,u as re}from"./DocPage-JhXgs5p-.js";var p,m;function h(){return(h=e((()=>{r(),c(),p=n(),m=({lines:e=3,lineHeight:t=`1em`,gap:n=2,shrinkLast:r=!0,animation:a=`pulse`,className:o,style:c,ref:u,...d})=>{let f=Number.isFinite(e)?Math.max(0,Math.floor(e)):0;return(0,p.jsx)(`div`,{ref:u,"aria-hidden":`true`,...d,className:i(l.skeletonText,o),style:{gap:ee(n),...c},...s(`skeleton-text`,`root`),children:Array.from({length:f},(e,n)=>(0,p.jsx)(`span`,{"aria-hidden":`true`,className:i(l.skeleton,l.decorative,l.text,l[`animation-${a}`]),style:{width:r&&n===f-1?`70%`:`100%`,height:typeof t==`number`?`${t}px`:t},...s(`skeleton-text`,`line`)},n))})}})))()}function ie(){return(0,g.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`},children:[(0,g.jsx)(d,{animation:`pulse`,lines:2}),(0,g.jsx)(d,{animation:`wave`,lines:2}),(0,g.jsx)(d,{animation:`false`,lines:2})]})}var g;function _(){return(_=e((()=>{u(),g=n()})))()}function ae(){return(0,v.jsx)(d,{lines:3})}var v;function y(){return(y=e((()=>{u(),v=n()})))()}function b(){return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,x.jsx)(d,{variant:`card`,avatar:!0,title:!0,paragraph:!0}),(0,x.jsx)(d,{variant:`card`,avatar:!0,title:!0,paragraph:!0,active:!0,animation:`wave`})]})}var x;function S(){return(S=e((()=>{u(),x=n()})))()}function oe(){return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:24,width:`100%`},children:[(0,C.jsx)(d,{avatar:!0,title:!0,paragraph:!0}),(0,C.jsx)(d,{avatar:!0,avatarShape:`square`,avatarSize:56,lines:2})]})}var C;function w(){return(w=e((()=>{u(),C=n()})))()}function se(){return(0,T.jsxs)(`div`,{role:`status`,"aria-busy":`true`,"aria-label":`Loading profile`,style:{display:`flex`,gap:12,alignItems:`center`,width:320},children:[(0,T.jsx)(d,{decorative:!0,variant:`circular`,size:40,animation:`wave`}),(0,T.jsxs)(`div`,{style:{flex:1,display:`grid`,gap:8},children:[(0,T.jsx)(d,{decorative:!0,width:`60%`,animation:`wave`}),(0,T.jsx)(d,{decorative:!0,width:`90%`,animation:`wave`})]})]})}var T;function E(){return(E=e((()=>{u(),T=n()})))()}function ce(){let[e,t]=(0,D.useState)(!0);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,O.jsx)(o,{size:`small`,onClick:()=>t(e=>!e),children:e?`Show content`:`Show skeleton`}),(0,O.jsx)(d,{loading:e,avatar:!0,title:!0,paragraph:!0,children:(0,O.jsxs)(`article`,{children:[(0,O.jsx)(`h4`,{style:{margin:`0 0 8px`},children:`Minerva UI`}),(0,O.jsx)(`p`,{style:{margin:0},children:`The content is rendered as soon as loading becomes false.`})]})})]})}var D,O;function k(){return(k=e((()=>{D=t(),a(),u(),O=n()})))()}function le(){return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:24,width:360},children:[(0,A.jsx)(m,{}),(0,A.jsx)(m,{lines:5,lineHeight:12,gap:3,animation:`wave`})]})}var A;function j(){return(j=e((()=>{h(),A=n()})))()}function ue(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(120px, 1fr))`,gap:16,alignItems:`center`,width:`100%`},children:[(0,M.jsx)(d,{variant:`text`,width:120}),(0,M.jsx)(d,{variant:`circular`,width:48,height:48}),(0,M.jsx)(d,{variant:`rectangular`,width:120,height:60}),(0,M.jsx)(d,{variant:`rounded`,width:120,height:60}),(0,M.jsx)(d,{variant:`button`}),(0,M.jsx)(d,{variant:`image`,width:120,height:80})]})}var M;function N(){return(N=e((()=>{u(),M=n()})))()}var P;function F(){return(F=e((()=>{P=`import { Skeleton } from "minerva-design";

export default function AnimationsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      <Skeleton animation="pulse" lines={2} />
      <Skeleton animation="wave" lines={2} />
      <Skeleton animation="false" lines={2} />
    </div>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { Skeleton } from "minerva-design";

export default function BasicDemo() {
  return <Skeleton lines={3} />;
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { Skeleton } from "minerva-design";

export default function CardDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Skeleton variant="card" avatar title paragraph />
      <Skeleton variant="card" avatar title paragraph active animation="wave" />
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { Skeleton } from "minerva-design";

export default function CompositionDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <Skeleton avatar title paragraph />
      <Skeleton avatar avatarShape="square" avatarSize={56} lines={2} />
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { Skeleton } from "minerva-design";

export default function DecorativeDemo() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading profile"
      style={{ display: "flex", gap: 12, alignItems: "center", width: 320 }}
    >
      <Skeleton decorative variant="circular" size={40} animation="wave" />
      <div style={{ flex: 1, display: "grid", gap: 8 }}>
        <Skeleton decorative width="60%" animation="wave" />
        <Skeleton decorative width="90%" animation="wave" />
      </div>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import { Button, Skeleton } from "minerva-design";

export default function LoadingDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Button size="small" onClick={() => setLoading((prev) => !prev)}>
        {loading ? "Show content" : "Show skeleton"}
      </Button>
      <Skeleton loading={loading} avatar title paragraph>
        <article>
          <h4 style={{ margin: "0 0 8px" }}>Minerva UI</h4>
          <p style={{ margin: 0 }}>
            The content is rendered as soon as loading becomes false.
          </p>
        </article>
      </Skeleton>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { SkeletonText } from "minerva-design";

export default function SkeletonTextDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: 360 }}>
      <SkeletonText />
      <SkeletonText lines={5} lineHeight={12} gap={3} animation="wave" />
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Skeleton } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Skeleton variant="text" width={120} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rectangular" width={120} height={60} />
      <Skeleton variant="rounded" width={120} height={60} />
      <Skeleton variant="button" />
      <Skeleton variant="image" width={120} height={80} />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{_(),y(),S(),w(),E(),k(),j(),N(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),te(),re(),X=n(),Z=f(Object.assign({"./demos/animations.tsx":ie,"./demos/basic.tsx":ae,"./demos/card.tsx":b,"./demos/composition.tsx":oe,"./demos/decorative.tsx":se,"./demos/loading.tsx":ce,"./demos/skeleton-text.tsx":le,"./demos/variants.tsx":ue}),Object.assign({"./demos/animations.tsx":P,"./demos/basic.tsx":I,"./demos/card.tsx":R,"./demos/composition.tsx":B,"./demos/decorative.tsx":H,"./demos/loading.tsx":W,"./demos/skeleton-text.tsx":K,"./demos/variants.tsx":J})),Q=()=>(0,X.jsx)(ne,{id:`skeleton`,demos:Z})})))()}$();export{Q as default};