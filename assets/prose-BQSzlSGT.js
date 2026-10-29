import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{gt as r,ht as i}from"./io5-CvrBnF9y.js";import{It as a,ut as o}from"./angular-preview-l4x8c_2r.js";import{B as s}from"./ProgressIndicator-BhPa7d9i.js";import{n as c,t as l}from"./prose.module.scss-Bzf-VY-Q.js";import{l as u,n as d,t as f,u as p}from"./DocPage-DCMfehF7.js";var m,h;function g(){return(g=e((()=>{a(),i(),l(),m=n(),h=({asChild:e=!1,className:t,ref:n,...i})=>(0,m.jsx)(e?r:`div`,{ref:n,className:o(c.prose,t),...i,...s(`prose`,`root`)})})))()}function _(){return(0,v.jsx)(h,{asChild:!0,children:(0,v.jsxs)(`article`,{"aria-label":`Release notes`,children:[(0,v.jsx)(`h3`,{children:`Release notes`}),(0,v.jsx)(`p`,{children:`With asChild the typography is applied to your own element (an article or an editor host) without an extra wrapper.`})]})})}var v;function y(){return(y=e((()=>{g(),v=n()})))()}function b(){return(0,x.jsxs)(h,{children:[(0,x.jsx)(`h2`,{children:`Chapter one`}),(0,x.jsxs)(`p`,{children:[`Prose styles `,(0,x.jsx)(`a`,{href:`#notes`,children:`links`}),`, `,(0,x.jsx)(`code`,{children:`inline code`}),`, lists, quotes and tables written as plain semantic HTML.`]}),(0,x.jsx)(`blockquote`,{children:`Sanitize untrusted HTML before rendering it.`}),(0,x.jsxs)(`ul`,{children:[(0,x.jsx)(`li`,{children:`No wrapper surface or padding`}),(0,x.jsx)(`li`,{children:`Author inline styles stay authoritative`})]}),(0,x.jsx)(`pre`,{children:(0,x.jsx)(`code`,{children:`const answer = 42;`})})]})}var x;function S(){return(S=e((()=>{g(),x=n()})))()}var C;function w(){return(w=e((()=>{C=`import { Prose } from "minerva-design";

export default function AsChildDemo() {
  return (
    <Prose asChild>
      <article aria-label="Release notes">
        <h3>Release notes</h3>
        <p>
          With asChild the typography is applied to your own element (an article
          or an editor host) without an extra wrapper.
        </p>
      </article>
    </Prose>
  );
}
`})))()}var T;function E(){return(E=e((()=>{T=`import { Prose } from "minerva-design";

export default function BasicDemo() {
  return (
    <Prose>
      <h2>Chapter one</h2>
      <p>
        Prose styles <a href="#notes">links</a>, <code>inline code</code>,
        lists, quotes and tables written as plain semantic HTML.
      </p>
      <blockquote>Sanitize untrusted HTML before rendering it.</blockquote>
      <ul>
        <li>No wrapper surface or padding</li>
        <li>Author inline styles stay authoritative</li>
      </ul>
      <pre>
        <code>{"const answer = 42;"}</code>
      </pre>
    </Prose>
  );
}
`})))()}var D,O,k;function A(){return(A=e((()=>{y(),S(),w(),E(),t(),d(),p(),D=n(),O=u(Object.assign({"./demos/as-child.tsx":_,"./demos/basic.tsx":b}),Object.assign({"./demos/as-child.tsx":C,"./demos/basic.tsx":T})),k=()=>(0,D.jsx)(f,{id:`prose`,demos:O})})))()}A();export{k as default};