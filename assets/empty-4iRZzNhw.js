import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BhPa7d9i.js";import{n as a,t as o}from"./Empty-CH2Z71iV.js";import{a as s,r as c}from"./fi-Dl-M6h-Q.js";import{l,n as u,t as d,u as f}from"./DocPage-PfpTBKws.js";function p(){return(0,m.jsx)(o,{})}var m;function h(){return(h=e((()=>{a(),m=n()})))()}function g(){return(0,_.jsx)(o,{icon:(0,_.jsx)(c,{size:36}),description:(0,_.jsxs)(`span`,{children:[`No matches for `,(0,_.jsx)(`strong`,{children:`“minerva”`})]})})}var _;function v(){return(v=e((()=>{a(),s(),_=n()})))()}function y(){return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:24},children:[(0,b.jsx)(o,{size:`small`,title:`No results`,description:`Try another keyword.`}),(0,b.jsx)(o,{size:`medium`,title:`No reviews yet`,description:`The first reader to write one will be featured here.`,action:(0,b.jsx)(i,{size:`small`,children:`Write a review`}),secondaryAction:(0,b.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:`Browse books`})})]})}var b;function x(){return(x=e((()=>{r(),a(),b=n()})))()}function S(){return(0,C.jsx)(o,{useSvg:!0,showShadow:!0,width:320,height:200,style:{backgroundColor:`#f0f7ff`,color:`#1d4ed8`},description:`Inbox zero`})}var C;function w(){return(w=e((()=>{a(),C=n()})))()}function T(){return(0,E.jsx)(o,{useSvg:!0,description:`No results found`})}var E;function D(){return(D=e((()=>{a(),E=n()})))()}function O(){return(0,k.jsx)(o,{description:`You have no projects yet`,children:(0,k.jsx)(i,{size:`small`,children:`Create project`})})}var k;function A(){return(A=e((()=>{r(),a(),k=n()})))()}var j;function M(){return(M=e((()=>{j=`import { Empty } from "minerva-design";

export default function BasicDemo() {
  return <Empty />;
}
`})))()}var N;function P(){return(P=e((()=>{N=`import { Empty } from "minerva-design";
import { FiSearch } from "react-icons/fi";

export default function CustomIconDemo() {
  return (
    <Empty
      icon={<FiSearch size={36} />}
      description={
        <span>
          No matches for <strong>“minerva”</strong>
        </span>
      }
    />
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { Button, Empty } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Empty
        size="small"
        title="No results"
        description="Try another keyword."
      />
      <Empty
        size="medium"
        title="No reviews yet"
        description="The first reader to write one will be featured here."
        action={<Button size="small">Write a review</Button>}
        secondaryAction={
          <Button size="small" color="neutral" variant="outline">
            Browse books
          </Button>
        }
      />
    </div>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { Empty } from "minerva-design";

export default function StyledDemo() {
  return (
    <Empty
      useSvg
      showShadow
      width={320}
      height={200}
      style={{ backgroundColor: "#f0f7ff", color: "#1d4ed8" }}
      description="Inbox zero"
    />
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { Empty } from "minerva-design";

export default function SvgDemo() {
  return <Empty useSvg description="No results found" />;
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { Button, Empty } from "minerva-design";

export default function WithActionDemo() {
  return (
    <Empty description="You have no projects yet">
      <Button size="small">Create project</Button>
    </Empty>
  );
}
`})))()}var U,W,G;function K(){return(K=e((()=>{h(),v(),x(),w(),D(),A(),M(),P(),I(),R(),B(),H(),t(),u(),f(),U=n(),W=l(Object.assign({"./demos/basic.tsx":p,"./demos/custom-icon.tsx":g,"./demos/sizes.tsx":y,"./demos/styled.tsx":S,"./demos/svg.tsx":T,"./demos/with-action.tsx":O}),Object.assign({"./demos/basic.tsx":j,"./demos/custom-icon.tsx":N,"./demos/sizes.tsx":F,"./demos/styled.tsx":L,"./demos/svg.tsx":z,"./demos/with-action.tsx":V})),G=()=>(0,U.jsx)(d,{id:`empty`,demos:W})})))()}K();export{G as default};