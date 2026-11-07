import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{F as r,T as i}from"./angular-preview-CxN7u9Fp.js";import{R as a,z as o}from"./ProgressIndicator-Ve8Z1qBV.js";import{n as s,t as c}from"./CodeBlock-Y-lIOv3H.js";import{n as ee,t as te}from"./Textarea-B6V_u_Ec.js";import{l as ne,n as re,t as ie,u as l}from"./DocPage-BC6BZEJM.js";function ae(){let[e,t]=(0,u.useState)(`const total = items.reduce((sum, item) => sum + item.price, 0);`);return(0,d.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[f.map((e,t)=>(0,d.jsx)(c,{"aria-label":`Snippet ${t+1}`,language:`auto`,showLanguage:!0,children:e},t)),(0,d.jsx)(ee,{"aria-label":`Code to detect`,rows:4,placeholder:`Paste some code`,value:e,onChange:e=>t(e.target.value)}),(0,d.jsx)(c,{"aria-label":`Pasted code`,language:`auto`,showLanguage:!0,children:e})]})}var u,d,f;function p(){return(p=e((()=>{u=t(),s(),te(),d=n(),f=[`{
  "title": "The Little Prince",
  "year": 1943,
  "tags": ["novella", "classic"]
}`,`def word_count(path):
    with open(path) as f:
        return len(f.read().split())

print(word_count("book.txt"))`,`SELECT title, COUNT(*) AS readers
FROM books
JOIN reads ON reads.book_id = books.id
GROUP BY title
ORDER BY readers DESC;`,`$ mkdir -p out && cd out
$ curl -sSL https://example.com/book.epub -o book.epub
$ unzip -q book.epub | grep -v META-INF`,`server:
  port: 8080
  hosts:
    - reader.example.com
    - api.example.com`,`It was a dark and stormy night;
the rain fell in torrents.`]})))()}function oe(){return(0,m.jsx)(c,{"aria-label":`Response payload`,language:`json`,children:h})}var m,h;function g(){return(g=e((()=>{s(),m=n(),h=JSON.stringify({id:42,title:`The Three-Body Problem`,tags:[`sci-fi`,`classic`]},null,2)})))()}function se(){let[e,t]=(0,_.useState)(``);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,v.jsx)(c,{"aria-label":`Install command`,copyable:!0,onCopied:e=>t(`Copied ${e.length} characters`),children:y}),(0,v.jsx)(`output`,{children:e})]})}var _,v,y;function b(){return(b=e((()=>{_=t(),s(),v=n(),y=`pnpm add minerva-design minerva-design/core`})))()}function ce(){return(0,x.jsx)(`div`,{style:{display:`grid`,gap:12},children:S.map(({language:e,code:t})=>(0,x.jsx)(c,{"aria-label":`${e} example`,language:e,showLanguage:!0,children:t},e))})}var x,S;function C(){return(C=e((()=>{s(),x=n(),S=[{language:`ts`,code:`interface Book {
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
 }`}]})))()}function le(){return(0,w.jsx)(c,{"aria-label":`Counter component`,language:`tsx`,showLineNumbers:!0,showLanguage:!0,copyable:!0,children:T})}var w,T;function E(){return(E=e((()=>{s(),w=n(),T=`import { useState } from "react";
import { Button } from "minerva-design";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount((n) => n + 1)}>
      Clicked {count} times
    </Button>
  );
}`})))()}function D(){let e=(0,O.useRef)(null),[t,n]=(0,O.useState)(j),[r,a]=(0,O.useState)(``);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,k.jsx)(c,{ref:e,"aria-label":`Annotated function`,language:`ts`,showLineNumbers:!0,copyable:!0,marks:t,onMarkClick:e=>{n(t=>t.filter(t=>t.id!==e.id)),a(`Removed ${e.title??`highlight`}`)},children:A}),(0,k.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,k.jsx)(o,{size:`small`,variant:`outline`,onMouseDown:e=>e.preventDefault(),onClick:()=>{let t=e.current&&i(e.current);if(!t)return a(`Select some code first`);let r=`n${Date.now()}`;n(e=>[...e,{id:r,start:t.start,end:t.end,color:`success`}]),a(`Highlighted “${t.text}” (${t.start}–${t.end})`)},children:`Highlight selection`}),(0,k.jsx)(o,{size:`small`,variant:`ghost`,onClick:()=>n([]),children:`Clear`}),(0,k.jsx)(`output`,{children:r})]})]})}var O,k,A,j;function M(){return(M=e((()=>{O=t(),a(),s(),r(),k=n(),A=`export async function fetchUser(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}`,j=[{id:`n1`,start:71,end:96,title:`Template literal URL`},{id:`n2`,start:104,end:116,color:`danger`,title:`Check the status`}]})))()}function ue(){return(0,N.jsx)(c,{"aria-label":`Server log`,wrap:!1,maxHeight:160,children:P})}var N,P;function F(){return(F=e((()=>{s(),N=n(),P=[`2026-10-07T09:12:01Z INFO  request id=7f3a path=/api/books?page=1&size=20&sort=rating`,`2026-10-07T09:12:02Z WARN  slow query took=1834ms table=reviews`].join(`
`)})))()}var I;function L(){return(L=e((()=>{I=`import { useState } from "react";
import { CodeBlock, Textarea } from "minerva-design";

// Code extracted without a language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from the text (detectCodeLanguage of
// minerva-design/core) and the label shows what was detected.
const snippets = [
  \`{
  "title": "The Little Prince",
  "year": 1943,
  "tags": ["novella", "classic"]
}\`,
  \`def word_count(path):
    with open(path) as f:
        return len(f.read().split())

print(word_count("book.txt"))\`,
  \`SELECT title, COUNT(*) AS readers
FROM books
JOIN reads ON reads.book_id = books.id
GROUP BY title
ORDER BY readers DESC;\`,
  \`$ mkdir -p out && cd out
$ curl -sSL https://example.com/book.epub -o book.epub
$ unzip -q book.epub | grep -v META-INF\`,
  \`server:
  port: 8080
  hosts:
    - reader.example.com
    - api.example.com\`,
  \`It was a dark and stormy night;
the rain fell in torrents.\`,
];

export default function AutoLanguageDemo() {
  const [code, setCode] = useState(
    "const total = items.reduce((sum, item) => sum + item.price, 0);",
  );
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {snippets.map((snippet, i) => (
        <CodeBlock
          key={i}
          aria-label={\`Snippet \${i + 1}\`}
          language="auto"
          showLanguage
        >
          {snippet}
        </CodeBlock>
      ))}
      <Textarea
        aria-label="Code to detect"
        rows={4}
        placeholder="Paste some code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <CodeBlock aria-label="Pasted code" language="auto" showLanguage>
        {code}
      </CodeBlock>
    </div>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { CodeBlock } from "minerva-design";

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
`})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
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
`})))()}var H;function U(){return(U=e((()=>{H=`import { CodeBlock } from "minerva-design";

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
`})))()}var W;function G(){return(G=e((()=>{W=`import { CodeBlock } from "minerva-design";

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
`})))()}var K;function q(){return(q=e((()=>{K=`import { useRef, useState } from "react";
import { Button, CodeBlock, type CodeMark } from "minerva-design";
import { getCodeSelectionRange } from "minerva-design/core";

const source = \`export async function fetchUser(id: string) {
  const response = await fetch(\\\`/api/users/\\\${id}\\\`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}\`;

// offsets are UTF-16 offsets into \`source\` (e.g. from getCodeSelectionRange)
const initial: CodeMark[] = [
  { id: "n1", start: 71, end: 96, title: "Template literal URL" },
  {
    id: "n2",
    start: 104,
    end: 116,
    color: "danger",
    title: "Check the status",
  },
];

export default function MarksDemo() {
  const ref = useRef<HTMLPreElement>(null);
  const [marks, setMarks] = useState(initial);
  const [status, setStatus] = useState("");

  const highlightSelection = () => {
    const range = ref.current && getCodeSelectionRange(ref.current);
    if (!range) return setStatus("Select some code first");
    const id = \`n\${Date.now()}\`;
    setMarks((list) => [
      ...list,
      { id, start: range.start, end: range.end, color: "success" },
    ]);
    setStatus(\`Highlighted “\${range.text}” (\${range.start}–\${range.end})\`);
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <CodeBlock
        ref={ref}
        aria-label="Annotated function"
        language="ts"
        showLineNumbers
        copyable
        marks={marks}
        onMarkClick={(mark) => {
          setMarks((list) => list.filter((m) => m.id !== mark.id));
          setStatus(\`Removed \${mark.title ?? "highlight"}\`);
        }}
      >
        {source}
      </CodeBlock>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button
          size="small"
          variant="outline"
          // keep the selection: do not move the focus on press
          onMouseDown={(event) => event.preventDefault()}
          onClick={highlightSelection}
        >
          Highlight selection
        </Button>
        <Button size="small" variant="ghost" onClick={() => setMarks([])}>
          Clear
        </Button>
        <output>{status}</output>
      </div>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { CodeBlock } from "minerva-design";

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
`})))()}var X,Z,Q;function $(){return($=e((()=>{p(),g(),b(),C(),E(),M(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),re(),l(),X=n(),Z=ne(Object.assign({"./demos/auto-language.tsx":ae,"./demos/basic.tsx":oe,"./demos/copyable.tsx":se,"./demos/languages.tsx":ce,"./demos/line-numbers.tsx":le,"./demos/marks.tsx":D,"./demos/no-wrap.tsx":ue}),Object.assign({"./demos/auto-language.tsx":I,"./demos/basic.tsx":R,"./demos/copyable.tsx":B,"./demos/languages.tsx":H,"./demos/line-numbers.tsx":W,"./demos/marks.tsx":K,"./demos/no-wrap.tsx":J})),Q=()=>(0,X.jsx)(ie,{id:`code-block`,demos:Z})})))()}$();export{Q as default};