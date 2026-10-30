import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BhPa7d9i.js";import{n as a,t as o}from"./Divider-D6jUWnQI.js";import{n as s,t as c}from"./Tag-vE6Ajh98.js";import{i as l,n as u,r as d,t as f}from"./Stack-CiM4m4jI.js";import{l as p,n as m,t as h,u as g}from"./DocPage-B2iACtLP.js";function ee(){let[e,t]=(0,_.useState)(`Week`);return(0,v.jsx)(l,{attached:!0,"aria-label":`Calendar view`,children:y.map(n=>(0,v.jsx)(i,{size:`small`,color:n===e?`primary`:`neutral`,variant:n===e?`solid`:`outline`,"aria-pressed":n===e,onClick:()=>t(n),children:n},n))})}var _,v,y;function b(){return(b=e((()=>{_=t(),r(),d(),v=n(),y=[`Day`,`Week`,`Month`]})))()}function x(){return(0,S.jsxs)(u,{gap:3,style:{maxWidth:240},children:[(0,S.jsx)(i,{children:`First`}),(0,S.jsx)(i,{color:`neutral`,variant:`outline`,children:`Second`}),(0,S.jsx)(i,{color:`neutral`,variant:`outline`,children:`Third`})]})}var S;function C(){return(C=e((()=>{r(),d(),S=n()})))()}function w(){return(0,T.jsxs)(u,{gap:4,align:`start`,children:[E.map(e=>(0,T.jsxs)(l,{gap:e,children:[(0,T.jsx)(`code`,{style:{minWidth:120},children:`gap={${e}}`}),(0,T.jsx)(i,{size:`small`,children:`One`}),(0,T.jsx)(i,{size:`small`,children:`Two`}),(0,T.jsx)(i,{size:`small`,children:`Three`})]},e)),(0,T.jsxs)(l,{gap:`12px`,children:[(0,T.jsx)(`code`,{style:{minWidth:120},children:`gap="12px"`}),(0,T.jsx)(i,{size:`small`,children:`One`}),(0,T.jsx)(i,{size:`small`,children:`Two`})]})]})}var T,E;function D(){return(D=e((()=>{r(),d(),T=n(),E=[2,4,6]})))()}function O(){return(0,k.jsxs)(l,{gap:2,justify:`between`,style:{width:`100%`},children:[(0,k.jsx)(`span`,{children:`Unsaved changes`}),(0,k.jsxs)(l,{gap:2,children:[(0,k.jsx)(i,{color:`neutral`,variant:`outline`,children:`Discard`}),(0,k.jsx)(i,{children:`Save`})]})]})}var k;function A(){return(A=e((()=>{r(),d(),k=n()})))()}function j(){return(0,M.jsxs)(l,{as:`nav`,"aria-label":`Resources`,gap:2,separator:(0,M.jsx)(o,{orientation:`vertical`,length:16,spacing:0}),children:[(0,M.jsx)(`a`,{href:`#docs`,children:`Docs`}),(0,M.jsx)(`a`,{href:`#blog`,children:`Blog`}),(0,M.jsx)(`a`,{href:`#changelog`,children:`Changelog`})]})}var M;function N(){return(N=e((()=>{a(),d(),M=n()})))()}function P(){return(0,F.jsx)(f,{as:`ul`,direction:`row`,gap:`0.5rem`,wrap:!0,style:{padding:0,maxWidth:260,listStyle:`none`},children:I.map(e=>(0,F.jsx)(`li`,{children:(0,F.jsx)(c,{children:e})},e))})}var F,I;function L(){return(L=e((()=>{d(),s(),F=n(),I=[`Fantasy`,`Mystery`,`Romance`,`Sci-fi`,`History`,`Poetry`]})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import { Button, HStack } from "minerva-design";

const views = ["Day", "Week", "Month"] as const;

export default function AttachedDemo() {
  const [view, setView] = useState<(typeof views)[number]>("Week");
  return (
    <HStack attached aria-label="Calendar view">
      {views.map((name) => (
        <Button
          key={name}
          size="small"
          color={name === view ? "primary" : "neutral"}
          variant={name === view ? "solid" : "outline"}
          aria-pressed={name === view}
          onClick={() => setView(name)}
        >
          {name}
        </Button>
      ))}
    </HStack>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { Button, VStack } from "minerva-design";

export default function BasicDemo() {
  return (
    <VStack gap={3} style={{ maxWidth: 240 }}>
      <Button>First</Button>
      <Button color="neutral" variant="outline">
        Second
      </Button>
      <Button color="neutral" variant="outline">
        Third
      </Button>
    </VStack>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { Button, HStack, VStack } from "minerva-design";

const gaps = [2, 4, 6] as const;

export default function GapDemo() {
  return (
    <VStack gap={4} align="start">
      {gaps.map((gap) => (
        <HStack key={gap} gap={gap}>
          <code style={{ minWidth: 120 }}>{\`gap={\${gap}}\`}</code>
          <Button size="small">One</Button>
          <Button size="small">Two</Button>
          <Button size="small">Three</Button>
        </HStack>
      ))}
      <HStack gap="12px">
        <code style={{ minWidth: 120 }}>gap=&quot;12px&quot;</code>
        <Button size="small">One</Button>
        <Button size="small">Two</Button>
      </HStack>
    </VStack>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Button, HStack } from "minerva-design";

export default function HorizontalDemo() {
  return (
    <HStack gap={2} justify="between" style={{ width: "100%" }}>
      <span>Unsaved changes</span>
      <HStack gap={2}>
        <Button color="neutral" variant="outline">
          Discard
        </Button>
        <Button>Save</Button>
      </HStack>
    </HStack>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Divider, HStack } from "minerva-design";

export default function SeparatorDemo() {
  return (
    <HStack
      as="nav"
      aria-label="Resources"
      gap={2}
      separator={<Divider orientation="vertical" length={16} spacing={0} />}
    >
      <a href="#docs">Docs</a>
      <a href="#blog">Blog</a>
      <a href="#changelog">Changelog</a>
    </HStack>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Stack, Tag } from "minerva-design";

const tags = ["Fantasy", "Mystery", "Romance", "Sci-fi", "History", "Poetry"];

export default function WrapDemo() {
  return (
    <Stack
      as="ul"
      direction="row"
      gap="0.5rem"
      wrap
      style={{ padding: 0, maxWidth: 260, listStyle: "none" }}
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </Stack>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{b(),C(),D(),A(),N(),L(),z(),V(),U(),G(),q(),Y(),t(),m(),g(),X=n(),Z=p(Object.assign({"./demos/attached.tsx":ee,"./demos/basic.tsx":x,"./demos/gap.tsx":w,"./demos/horizontal.tsx":O,"./demos/separator.tsx":j,"./demos/wrap.tsx":P}),Object.assign({"./demos/attached.tsx":R,"./demos/basic.tsx":B,"./demos/gap.tsx":H,"./demos/horizontal.tsx":W,"./demos/separator.tsx":K,"./demos/wrap.tsx":J})),Q=()=>(0,X.jsx)(h,{id:`stack`,demos:Z})})))()}$();export{Q as default};