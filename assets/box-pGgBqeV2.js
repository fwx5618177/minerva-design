import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./Box-CTjErU_p.js";import{l as a,n as o,t as s,u as c}from"./DocPage-CfPUO8JU.js";function l(){return(0,u.jsx)(r,{p:4,bg:`bg.subtle`,rounded:`md`,border:`1px solid var(--border-color)`,children:`Padding token 4, subtle surface, medium radius.`})}var u;function d(){return(d=e((()=>{i(),u=n()})))()}function f(){return(0,p.jsxs)(r,{as:`ul`,m:0,pl:5,mt:2,children:[(0,p.jsx)(r,{as:`li`,mb:1,children:`Rendered as a list item`}),(0,p.jsx)(r,{as:`li`,children:`Spacing props still apply`})]})}var p;function m(){return(m=e((()=>{i(),p=n()})))()}function h(){return(0,g.jsx)(r,{as:`section`,"aria-label":`Centered`,w:`100%`,py:6,bg:`bg.muted`,children:(0,g.jsx)(r,{maxW:360,mx:`auto`,p:4,bg:`bg`,rounded:`lg`,boxShadow:`md`,children:`maxW=360 with mx="auto" centers the card.`})})}var g;function _(){return(_=e((()=>{i(),g=n()})))()}var v;function y(){return(y=e((()=>{v=`import { Box } from "minerva-design";

export default function BasicDemo() {
  return (
    <Box
      p={4}
      bg="bg.subtle"
      rounded="md"
      border="1px solid var(--border-color)"
    >
      Padding token 4, subtle surface, medium radius.
    </Box>
  );
}
`})))()}var b;function x(){return(x=e((()=>{b=`import { Box } from "minerva-design";

export default function PolymorphicDemo() {
  return (
    <Box as="ul" m={0} pl={5} mt={2}>
      <Box as="li" mb={1}>
        Rendered as a list item
      </Box>
      <Box as="li">Spacing props still apply</Box>
    </Box>
  );
}
`})))()}var S;function C(){return(C=e((()=>{S=`import { Box } from "minerva-design";

export default function SizingDemo() {
  return (
    <Box as="section" aria-label="Centered" w="100%" py={6} bg="bg.muted">
      <Box maxW={360} mx="auto" p={4} bg="bg" rounded="lg" boxShadow="md">
        maxW=360 with mx=&quot;auto&quot; centers the card.
      </Box>
    </Box>
  );
}
`})))()}var w,T,E;function D(){return(D=e((()=>{d(),m(),_(),y(),x(),C(),t(),o(),c(),w=n(),T=a(Object.assign({"./demos/basic.tsx":l,"./demos/polymorphic.tsx":f,"./demos/sizing.tsx":h}),Object.assign({"./demos/basic.tsx":v,"./demos/polymorphic.tsx":b,"./demos/sizing.tsx":S})),E=()=>(0,w.jsx)(s,{id:`box`,demos:T})})))()}D();export{E as default};