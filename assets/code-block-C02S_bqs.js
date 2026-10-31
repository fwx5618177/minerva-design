import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./CodeBlock-BAcNaQ2n.js";import{l as a,n as o,t as s,u as c}from"./DocPage-CHJwIegD.js";function l(){return(0,u.jsx)(r,{"aria-label":`Response payload`,children:d})}var u,d;function f(){return(f=e((()=>{i(),u=n(),d=JSON.stringify({id:42,title:`The Three-Body Problem`,tags:[`sci-fi`,`classic`]},null,2)})))()}function p(){let[e,t]=(0,m.useState)(``);return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,h.jsx)(r,{"aria-label":`Install command`,copyable:!0,onCopied:e=>t(`Copied ${e.length} characters`),children:g}),(0,h.jsx)(`output`,{children:e})]})}var m,h,g;function _(){return(_=e((()=>{m=t(),i(),h=n(),g=`pnpm add minerva-design minerva-design/core`})))()}function v(){return(0,y.jsx)(r,{"aria-label":`Server log`,wrap:!1,maxHeight:160,children:b})}var y,b;function x(){return(x=e((()=>{i(),y=n(),b=[`2026-10-07T09:12:01Z INFO  request id=7f3a path=/api/books?page=1&size=20&sort=rating`,`2026-10-07T09:12:02Z WARN  slow query took=1834ms table=reviews`].join(`
`)})))()}var S;function C(){return(C=e((()=>{S=`import { CodeBlock } from "minerva-design";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

export default function BasicDemo() {
  return <CodeBlock aria-label="Response payload">{payload}</CodeBlock>;
}
`})))()}var w;function T(){return(T=e((()=>{w=`import { useState } from "react";
import { CodeBlock } from "minerva-design";

const command = "pnpm add minerva-design minerva-design/core";

export default function CopyableDemo() {
  const [copied, setCopied] = useState("");
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <CodeBlock
        aria-label="Install command"
        copyable
        onCopied={(text) => setCopied(\`Copied \${text.length} characters\`)}
      >
        {command}
      </CodeBlock>
      <output>{copied}</output>
    </div>
  );
}
`})))()}var E;function D(){return(D=e((()=>{E=`import { CodeBlock } from "minerva-design";

const log = [
  "2026-10-07T09:12:01Z INFO  request id=7f3a path=/api/books?page=1&size=20&sort=rating",
  "2026-10-07T09:12:02Z WARN  slow query took=1834ms table=reviews",
].join("\\n");

export default function NoWrapDemo() {
  return (
    <CodeBlock aria-label="Server log" wrap={false} maxHeight={160}>
      {log}
    </CodeBlock>
  );
}
`})))()}var O,k,A;function j(){return(j=e((()=>{f(),_(),x(),C(),T(),D(),t(),o(),c(),O=n(),k=a(Object.assign({"./demos/basic.tsx":l,"./demos/copyable.tsx":p,"./demos/no-wrap.tsx":v}),Object.assign({"./demos/basic.tsx":S,"./demos/copyable.tsx":w,"./demos/no-wrap.tsx":E})),A=()=>(0,O.jsx)(s,{id:`code-block`,demos:k})})))()}j();export{A as default};