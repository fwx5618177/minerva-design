import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./CodeBlock-v_lQ8awf.js";import{l as a,n as o,t as s,u as c}from"./DocPage-DH5L-FI8.js";function l(){return(0,u.jsx)(r,{"aria-label":`Response payload`,language:`json`,children:d})}var u,d;function f(){return(f=e((()=>{i(),u=n(),d=JSON.stringify({id:42,title:`The Three-Body Problem`,tags:[`sci-fi`,`classic`]},null,2)})))()}function p(){let[e,t]=(0,m.useState)(``);return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,h.jsx)(r,{"aria-label":`Install command`,copyable:!0,onCopied:e=>t(`Copied ${e.length} characters`),children:g}),(0,h.jsx)(`output`,{children:e})]})}var m,h,g;function _(){return(_=e((()=>{m=t(),i(),h=n(),g=`pnpm add minerva-design minerva-design/core`})))()}function v(){return(0,y.jsx)(`div`,{style:{display:`grid`,gap:12},children:b.map(({language:e,code:t})=>(0,y.jsx)(r,{"aria-label":`${e} example`,language:e,showLanguage:!0,children:t},e))})}var y,b;function x(){return(x=e((()=>{i(),y=n(),b=[{language:`ts`,code:`interface Book {
  id: number;
  title: string;
}

export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\`/api/books/\${id}\`);
  return response.json(); // typed by the caller
}`},{language:`css`,code:`.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  padding: 1rem 1.5rem;
  color: #1f2937 !important;
}`},{language:`html`,code:`<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
  <button type="submit">Join &amp; continue</button>
</form>`},{language:`bash`,code:`# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"`},{language:`python`,code:`@dataclass
class Point:
    x: float = 0.0

    def norm(self) -> float:
        return abs(self.x)  # distance to 0`},{language:`diff`,code:`--- a/config.json
+++ b/config.json
@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }`}]})))()}function S(){return(0,C.jsx)(r,{"aria-label":`Counter component`,language:`tsx`,showLineNumbers:!0,showLanguage:!0,copyable:!0,children:w})}var C,w;function T(){return(T=e((()=>{i(),C=n(),w=`import { useState } from "react";
import { Button } from "minerva-design";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount((n) => n + 1)}>
      Clicked {count} times
    </Button>
  );
}`})))()}function E(){return(0,D.jsx)(r,{"aria-label":`Server log`,wrap:!1,maxHeight:160,children:O})}var D,O;function k(){return(k=e((()=>{i(),D=n(),O=[`2026-10-07T09:12:01Z INFO  request id=7f3a path=/api/books?page=1&size=20&sort=rating`,`2026-10-07T09:12:02Z WARN  slow query took=1834ms table=reviews`].join(`
`)})))()}var A;function j(){return(j=e((()=>{A=`import { CodeBlock } from "minerva-design";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

export default function BasicDemo() {
  return (
    <CodeBlock aria-label="Response payload" language="json">
      {payload}
    </CodeBlock>
  );
}
`})))()}var M;function N(){return(N=e((()=>{M=`import { useState } from "react";
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
`})))()}var P;function F(){return(F=e((()=>{P=`import { CodeBlock } from "minerva-design";

const samples = [
  {
    language: "ts",
    code: \`interface Book {
  id: number;
  title: string;
}

export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\\\`/api/books/\\\${id}\\\`);
  return response.json(); // typed by the caller
}\`,
  },
  {
    language: "css",
    code: \`.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  padding: 1rem 1.5rem;
  color: #1f2937 !important;
}\`,
  },
  {
    language: "html",
    code: \`<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
  <button type="submit">Join &amp; continue</button>
</form>\`,
  },
  {
    language: "bash",
    code: \`# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"\`,
  },
  {
    language: "python",
    code: \`@dataclass
class Point:
    x: float = 0.0

    def norm(self) -> float:
        return abs(self.x)  # distance to 0\`,
  },
  {
    language: "diff",
    code: \`--- a/config.json
+++ b/config.json
@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }\`,
  },
];

export default function LanguagesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {samples.map(({ language, code }) => (
        <CodeBlock
          key={language}
          aria-label={\`\${language} example\`}
          language={language}
          showLanguage
        >
          {code}
        </CodeBlock>
      ))}
    </div>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { CodeBlock } from "minerva-design";

const source = \`import { useState } from "react";
import { Button } from "minerva-design";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount((n) => n + 1)}>
      Clicked {count} times
    </Button>
  );
}\`;

export default function LineNumbersDemo() {
  return (
    <CodeBlock
      aria-label="Counter component"
      language="tsx"
      showLineNumbers
      showLanguage
      copyable
    >
      {source}
    </CodeBlock>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { CodeBlock } from "minerva-design";

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
`})))()}var B,V,H;function U(){return(U=e((()=>{f(),_(),x(),T(),k(),j(),N(),F(),L(),z(),t(),o(),c(),B=n(),V=a(Object.assign({"./demos/basic.tsx":l,"./demos/copyable.tsx":p,"./demos/languages.tsx":v,"./demos/line-numbers.tsx":S,"./demos/no-wrap.tsx":E}),Object.assign({"./demos/basic.tsx":A,"./demos/copyable.tsx":M,"./demos/languages.tsx":P,"./demos/line-numbers.tsx":I,"./demos/no-wrap.tsx":R})),H=()=>(0,B.jsx)(s,{id:`code-block`,demos:V})})))()}U();export{H as default};