import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,Tt as i,ut as a}from"./angular-preview-l4x8c_2r.js";import{B as o}from"./ProgressIndicator-BhPa7d9i.js";import{n as s,t as c}from"./Box-BJ4rMYdy.js";import{n as l,t as u}from"./splitLayout.module.scss-ClaoE_-S.js";import{l as d,n as f,t as p,u as m}from"./DocPage-D-H5cPcd.js";var h,g;function _(){return(_=e((()=>{r(),u(),h=n(),g=({aside:e,asideWidth:t=320,collapseBelow:n=`md`,gap:r=6,children:s,className:c,style:u,...d})=>{if(!Number.isFinite(t)||t<=0)throw RangeError(`SplitLayout asideWidth must be a finite positive number`);let f=e!=null&&e!==!1;return(0,h.jsx)(`div`,{className:a(l.root,c),style:{"--split-layout-aside-width":`${t}px`,"--split-layout-gap":i(r),...u},...d,...o(`split-layout`,`root`),children:(0,h.jsxs)(`div`,{className:a(l.grid,l[n],f&&l.hasAside),children:[(0,h.jsx)(`div`,{className:l.main,...o(`split-layout`,`main`),children:s}),f&&(0,h.jsx)(`div`,{className:l.aside,...o(`split-layout`,`aside`),children:e})]})})}})))()}function v(){return(0,y.jsx)(g,{aside:(0,y.jsx)(s,{as:`section`,"aria-label":`Properties`,p:4,bg:`bg.muted`,rounded:`md`,children:`Properties`}),children:(0,y.jsx)(s,{as:`section`,"aria-label":`Content`,p:4,bg:`bg.subtle`,rounded:`md`,children:`Main content comes first in reading order.`})})}var y;function b(){return(b=e((()=>{c(),_(),y=n()})))()}function x(){return(0,S.jsx)(g,{asideWidth:200,collapseBelow:`lg`,gap:3,aside:(0,S.jsx)(s,{p:4,bg:`bg.muted`,rounded:`md`,children:`200px aside`}),children:(0,S.jsx)(s,{p:4,bg:`bg.subtle`,rounded:`md`,children:`Splits only when the layout is at least 1200px wide.`})})}var S;function C(){return(C=e((()=>{c(),_(),S=n()})))()}var w;function T(){return(T=e((()=>{w=`import { Box, SplitLayout } from "minerva-design";

export default function BasicDemo() {
  return (
    <SplitLayout
      aside={
        <Box
          as="section"
          aria-label="Properties"
          p={4}
          bg="bg.muted"
          rounded="md"
        >
          Properties
        </Box>
      }
    >
      <Box as="section" aria-label="Content" p={4} bg="bg.subtle" rounded="md">
        Main content comes first in reading order.
      </Box>
    </SplitLayout>
  );
}
`})))()}var E;function D(){return(D=e((()=>{E=`import { Box, SplitLayout } from "minerva-design";

export default function OptionsDemo() {
  return (
    <SplitLayout
      asideWidth={200}
      collapseBelow="lg"
      gap={3}
      aside={
        <Box p={4} bg="bg.muted" rounded="md">
          200px aside
        </Box>
      }
    >
      <Box p={4} bg="bg.subtle" rounded="md">
        Splits only when the layout is at least 1200px wide.
      </Box>
    </SplitLayout>
  );
}
`})))()}var O,k,A;function j(){return(j=e((()=>{b(),C(),T(),D(),t(),f(),m(),O=n(),k=d(Object.assign({"./demos/basic.tsx":v,"./demos/options.tsx":x}),Object.assign({"./demos/basic.tsx":w,"./demos/options.tsx":E})),A=()=>(0,O.jsx)(p,{id:`split-layout`,demos:k})})))()}j();export{A as default};