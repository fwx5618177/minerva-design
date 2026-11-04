import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Bt as r,F as i,G as a,I as ee,Mn as o,Tt as te,_r as ne,it as re,rt as s,t as ie}from"./angular-preview-B7Uzpk8P.js";import{B as ae,V as c}from"./ProgressIndicator-CLQ5GhV8.js";import{t as l}from"./stylingHooks-PqiNJdev.js";import{$ as u,St as d,xt as oe}from"./io5-BsjRfO9T.js";import{n as f,t as p}from"./answerSheet.module.scss-CnaPEgPL.js";import{l as m,n as h,t as g,u as _}from"./DocPage-jLxsrsHM.js";var v,y,b,x;function S(){return(S=e((()=>{o(),c(),d(),u(),p(),v=t(),y=n(),i(),b={ArrowLeft:`previous`,ArrowRight:`next`,ArrowUp:`up`,ArrowDown:`down`,Home:`first`,End:`last`},x=({items:e,groups:t,value:n,defaultValue:i,onChange:o,size:c=`medium`,layout:u=`wrap`,columns:d,showLegend:p=!1,showSummary:m=!1,getItemLabel:h,disabled:g=!1,"aria-label":_,className:x,ref:S})=>{let{t:C}=ae(),[w,T]=oe({value:n,defaultValue:i,onChange:e=>{e!==void 0&&o?.(e)},name:`AnswerSheet`}),E=(0,v.useId)(),[D,O]=(0,v.useState)(``),k=(0,v.useRef)(new Map),A=(0,v.useRef)(null),j=te(e,t),M=j.flatMap(e=>e.entries).map(e=>e.item.key),N=[D,w].find(e=>e&&M.includes(e))??M[0],P=u===`wrap`&&d&&d>0?Math.floor(d):void 0;(0,v.useEffect)(()=>{if(!A.current)return;let e=k.current.get(A.current);A.current=null,e?.focus()},[D]);let F=w!==void 0&&M.includes(w);(0,v.useEffect)(()=>{if(u!==`scroll`||!F||w===void 0)return;let e=k.current.get(w);e?.parentElement&&ee(e.parentElement,e)},[u,w,F]);let I=e=>{g||e.disabled||T(e.key)},L=e=>{A.current=e,O(e),e===D&&k.current.get(e)?.focus()},R=(e,t,n)=>{if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||I(t);return}let r=b[a(e.key,e.currentTarget)];if(!r)return;e.preventDefault();let i;if((r===`up`||r===`down`)&&!P){if(u===`scroll`)return;let t=M.map(e=>k.current.get(e)).filter(e=>!!e);i=ie(t,e.currentTarget,r===`down`?1:-1)?.dataset.key}else{let e=re(j,n,r,P);e!==null&&(i=M[e])}i&&L(i)},z=(e,t,n)=>h?h(e,t):C(e.flagged?`answerSheet.itemFlagged`:`answerSheet.item`,{number:e.label??t+1,status:C(`answerSheet.status.${n}`)}),B=r(e),V=p?ne(e):[];return(0,y.jsxs)(`nav`,{ref:S,"aria-label":_??C(`answerSheet.label`),className:s(f.answerSheet,f[c],u===`scroll`&&f.scroll,x),...l(`answer-sheet`,`root`,{disabled:g,size:c,layout:u}),children:[m?(0,y.jsx)(`p`,{className:f.summary,...l(`answer-sheet`,`total`),children:C(`answerSheet.summary`,B)}):null,j.map((e,t)=>{let n=e.title?`${E}-group-${t}`:void 0;return(0,y.jsxs)(`div`,{className:f.section,role:e.title?`group`:void 0,"aria-labelledby":n,...l(`answer-sheet`,`group`),children:[e.title?(0,y.jsx)(`div`,{id:n,className:f.sectionTitle,...l(`answer-sheet`,`group-label`),children:e.title}):null,(0,y.jsx)(`div`,{className:s(f.grid,P&&f.columns),style:P?{gridTemplateColumns:`repeat(${P}, minmax(0, 1fr))`}:void 0,...l(`answer-sheet`,`grid`),children:e.entries.map(({item:e,index:t,status:n,label:r})=>{let i=w===e.key,a=g||!!e.disabled;return(0,y.jsxs)(`button`,{type:`button`,ref:t=>{t?k.current.set(e.key,t):k.current.delete(e.key)},className:s(f.item,f[n]),...l(`answer-sheet`,`item`,{current:i,disabled:a,flagged:!!e.flagged,status:n}),"data-key":e.key,"aria-label":z(e,t,n),"aria-current":i?`step`:void 0,"aria-disabled":a||void 0,tabIndex:e.key===N?0:-1,onFocus:()=>O(e.key),onClick:()=>I(e),onKeyDown:n=>R(n,e,t),children:[r,e.flagged?(0,y.jsx)(`span`,{className:f.flag,"aria-hidden":!0,...l(`answer-sheet`,`indicator`)}):null]},e.key)})})]},e.key||`-`)}),V.length?(0,y.jsx)(`ul`,{className:f.legend,...l(`answer-sheet`,`legend`),children:V.map(e=>(0,y.jsxs)(`li`,{className:f.legendItem,...l(`answer-sheet`,`legend-item`),children:[(0,y.jsx)(`span`,{className:s(f.swatch,f[e]),"aria-hidden":!0}),C(`answerSheet.legend.${e}`)]},e))}):null]})}})))()}function C(){let[e,t]=(0,w.useState)(`q6`);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:420},children:[(0,T.jsx)(x,{items:E,value:e,onChange:t}),(0,T.jsxs)(`p`,{style:{margin:0},children:[`Current question: `,e.slice(1)]})]})}var w,T,E;function D(){return(D=e((()=>{w=t(),S(),T=n(),E=Array.from({length:12},(e,t)=>({key:`q${t+1}`,status:t<5?`answered`:`unanswered`}))})))()}function O(){let[e,t]=(0,k.useState)(`s3`);return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:420},children:[(0,A.jsx)(x,{items:M,groups:j,value:e,onChange:t,showSummary:!0,showLegend:!0,"aria-label":`Review questions`}),(0,A.jsxs)(`p`,{style:{margin:0},children:[`Reviewing: `,e]})]})}var k,A,j,M;function N(){return(N=e((()=>{k=t(),S(),A=n(),j=[{key:`single`,title:`Single choice`},{key:`multiple`,title:`Multiple choice`},{key:`short`,title:`Short answer`}],M=[{key:`s1`,group:`single`,status:`correct`},{key:`s2`,group:`single`,status:`correct`},{key:`s3`,group:`single`,status:`wrong`,flagged:!0},{key:`s4`,group:`single`,status:`correct`},{key:`s5`,group:`single`,status:`skipped`},{key:`s6`,group:`single`,status:`correct`},{key:`m1`,group:`multiple`,status:`wrong`},{key:`m2`,group:`multiple`,status:`correct`},{key:`m3`,group:`multiple`,status:`answered`,flagged:!0},{key:`a1`,group:`short`,status:`answered`},{key:`a2`,group:`short`},{key:`a3`,group:`short`,disabled:!0}]})))()}function P(){let[e,t]=(0,F.useState)(`q16`);return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:360},children:[(0,I.jsx)(x,{items:L,value:e,onChange:t,layout:`scroll`,size:`small`}),(0,I.jsxs)(`p`,{style:{margin:0},children:[`Current question: `,e.slice(1)]})]})}var F,I,L;function R(){return(R=e((()=>{F=t(),S(),I=n(),L=Array.from({length:40},(e,t)=>({key:`q${t+1}`,status:t<14?`answered`:t===14?`skipped`:`unanswered`,flagged:t===8}))})))()}function z(){return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:420},children:[(0,B.jsx)(x,{items:V,size:`small`,defaultValue:`q5`,"aria-label":`Small sheet`}),(0,B.jsx)(x,{items:V,columns:5,defaultValue:`q5`,"aria-label":`Five columns`}),(0,B.jsx)(x,{items:V,disabled:!0,"aria-label":`Disabled sheet`})]})}var B,V;function H(){return(H=e((()=>{S(),B=n(),V=Array.from({length:10},(e,t)=>({key:`q${t+1}`,status:t<4?`answered`:`unanswered`}))})))()}var U;function W(){return(W=e((()=>{U=`import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 5 ? "answered" : "unanswered",
}));

export default function BasicDemo() {
  const [value, setValue] = useState("q6");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet items={items} value={value} onChange={setValue} />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useState } from "react";
import {
  AnswerSheet,
  type AnswerSheetGroup,
  type AnswerSheetItem,
} from "minerva-design";

const groups: AnswerSheetGroup[] = [
  { key: "single", title: "Single choice" },
  { key: "multiple", title: "Multiple choice" },
  { key: "short", title: "Short answer" },
];

const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "correct" },
  { key: "s3", group: "single", status: "wrong", flagged: true },
  { key: "s4", group: "single", status: "correct" },
  { key: "s5", group: "single", status: "skipped" },
  { key: "s6", group: "single", status: "correct" },
  { key: "m1", group: "multiple", status: "wrong" },
  { key: "m2", group: "multiple", status: "correct" },
  { key: "m3", group: "multiple", status: "answered", flagged: true },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short", disabled: true },
];

export default function GroupsDemo() {
  const [value, setValue] = useState("s3");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        groups={groups}
        value={value}
        onChange={setValue}
        showSummary
        showLegend
        aria-label="Review questions"
      />
      <p style={{ margin: 0 }}>Reviewing: {value}</p>
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 40 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
  flagged: i === 8,
}));

export default function ScrollDemo() {
  const [value, setValue] = useState("q16");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 360 }}>
      <AnswerSheet
        items={items}
        value={value}
        onChange={setValue}
        layout="scroll"
        size="small"
      />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 4 ? "answered" : "unanswered",
}));

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        size="small"
        defaultValue="q5"
        aria-label="Small sheet"
      />
      <AnswerSheet
        items={items}
        columns={5}
        defaultValue="q5"
        aria-label="Five columns"
      />
      <AnswerSheet items={items} disabled aria-label="Disabled sheet" />
    </div>
  );
}
`})))()}var Z,Q,$;function se(){return(se=e((()=>{D(),N(),R(),H(),W(),K(),J(),X(),t(),h(),_(),Z=n(),Q=m(Object.assign({"./demos/basic.tsx":C,"./demos/groups.tsx":O,"./demos/scroll.tsx":P,"./demos/sizes.tsx":z}),Object.assign({"./demos/basic.tsx":U,"./demos/groups.tsx":G,"./demos/scroll.tsx":q,"./demos/sizes.tsx":Y})),$=()=>(0,Z.jsx)(g,{id:`answer-sheet`,demos:Q})})))()}se();export{$ as default};