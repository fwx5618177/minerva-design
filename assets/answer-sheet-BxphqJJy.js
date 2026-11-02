import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{At as r,Dt as i,E as a,V as o,Zt as s,_ as ee,_t as te,t as ne,ut as re,wn as c}from"./angular-preview-BdNkX8l5.js";import{B as ie,V as l}from"./ProgressIndicator-Har2Rnl4.js";import{t as u}from"./stylingHooks-PqiNJdev.js";import{$ as d,St as f,xt as ae}from"./io5-Bd77grqv.js";import{n as p,t as m}from"./answerSheet.module.scss-CnaPEgPL.js";import{l as h,n as g,t as _,u as v}from"./DocPage-CmI5o3x2.js";var y,b,x,S;function C(){return(C=e((()=>{c(),l(),f(),d(),m(),y=t(),b=n(),o(),x={ArrowLeft:`previous`,ArrowRight:`next`,ArrowUp:`up`,ArrowDown:`down`,Home:`first`,End:`last`},S=({items:e,groups:t,value:n,defaultValue:o,onChange:c,size:l=`medium`,layout:d=`wrap`,columns:f,showLegend:m=!1,showSummary:h=!1,getItemLabel:g,disabled:_=!1,"aria-label":v,className:S,ref:C})=>{let{t:w}=ie(),[T,E]=ae({value:n,defaultValue:o,onChange:e=>{e!==void 0&&c?.(e)},name:`AnswerSheet`}),D=(0,y.useId)(),[O,k]=(0,y.useState)(``),A=(0,y.useRef)(new Map),j=(0,y.useRef)(null),M=i(e,t),N=M.flatMap(e=>e.entries).map(e=>e.item.key),P=[O,T].find(e=>e&&N.includes(e))??N[0],F=d===`wrap`&&f&&f>0?Math.floor(f):void 0;(0,y.useEffect)(()=>{if(!j.current)return;let e=A.current.get(j.current);j.current=null,e?.focus()},[O]);let I=T!==void 0&&N.includes(T);(0,y.useEffect)(()=>{if(d!==`scroll`||!I||T===void 0)return;let e=A.current.get(T);e?.parentElement&&ne(e.parentElement,e)},[d,T,I]);let L=e=>{_||e.disabled||E(e.key)},R=e=>{j.current=e,k(e),e===O&&A.current.get(e)?.focus()},z=(e,t,n)=>{if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||L(t);return}let r=x[ee(e.key,e.currentTarget)];if(!r)return;e.preventDefault();let i;if((r===`up`||r===`down`)&&!F){if(d===`scroll`)return;let t=N.map(e=>A.current.get(e)).filter(e=>!!e);i=a(t,e.currentTarget,r===`down`?1:-1)?.dataset.key}else{let e=te(M,n,r,F);e!==null&&(i=N[e])}i&&R(i)},B=(e,t,n)=>g?g(e,t):w(e.flagged?`answerSheet.itemFlagged`:`answerSheet.item`,{number:e.label??t+1,status:w(`answerSheet.status.${n}`)}),V=r(e),H=m?re(e):[];return(0,b.jsxs)(`nav`,{ref:C,"aria-label":v??w(`answerSheet.label`),className:s(p.answerSheet,p[l],d===`scroll`&&p.scroll,S),...u(`answer-sheet`,`root`,{disabled:_,size:l,layout:d}),children:[h?(0,b.jsx)(`p`,{className:p.summary,...u(`answer-sheet`,`total`),children:w(`answerSheet.summary`,V)}):null,M.map((e,t)=>{let n=e.title?`${D}-group-${t}`:void 0;return(0,b.jsxs)(`div`,{className:p.section,role:e.title?`group`:void 0,"aria-labelledby":n,...u(`answer-sheet`,`group`),children:[e.title?(0,b.jsx)(`div`,{id:n,className:p.sectionTitle,...u(`answer-sheet`,`group-label`),children:e.title}):null,(0,b.jsx)(`div`,{className:s(p.grid,F&&p.columns),style:F?{gridTemplateColumns:`repeat(${F}, minmax(0, 1fr))`}:void 0,...u(`answer-sheet`,`grid`),children:e.entries.map(({item:e,index:t,status:n,label:r})=>{let i=T===e.key,a=_||!!e.disabled;return(0,b.jsxs)(`button`,{type:`button`,ref:t=>{t?A.current.set(e.key,t):A.current.delete(e.key)},className:s(p.item,p[n]),...u(`answer-sheet`,`item`,{current:i,disabled:a,flagged:!!e.flagged,status:n}),"data-key":e.key,"aria-label":B(e,t,n),"aria-current":i?`step`:void 0,"aria-disabled":a||void 0,tabIndex:e.key===P?0:-1,onFocus:()=>k(e.key),onClick:()=>L(e),onKeyDown:n=>z(n,e,t),children:[r,e.flagged?(0,b.jsx)(`span`,{className:p.flag,"aria-hidden":!0,...u(`answer-sheet`,`indicator`)}):null]},e.key)})})]},e.key||`-`)}),H.length?(0,b.jsx)(`ul`,{className:p.legend,...u(`answer-sheet`,`legend`),children:H.map(e=>(0,b.jsxs)(`li`,{className:p.legendItem,...u(`answer-sheet`,`legend-item`),children:[(0,b.jsx)(`span`,{className:s(p.swatch,p[e]),"aria-hidden":!0}),w(`answerSheet.legend.${e}`)]},e))}):null]})}})))()}function w(){let[e,t]=(0,T.useState)(`q6`);return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:420},children:[(0,E.jsx)(S,{items:D,value:e,onChange:t}),(0,E.jsxs)(`p`,{style:{margin:0},children:[`Current question: `,e.slice(1)]})]})}var T,E,D;function O(){return(O=e((()=>{T=t(),C(),E=n(),D=Array.from({length:12},(e,t)=>({key:`q${t+1}`,status:t<5?`answered`:`unanswered`}))})))()}function k(){let[e,t]=(0,A.useState)(`s3`);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:420},children:[(0,j.jsx)(S,{items:N,groups:M,value:e,onChange:t,showSummary:!0,showLegend:!0,"aria-label":`Review questions`}),(0,j.jsxs)(`p`,{style:{margin:0},children:[`Reviewing: `,e]})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),C(),j=n(),M=[{key:`single`,title:`Single choice`},{key:`multiple`,title:`Multiple choice`},{key:`short`,title:`Short answer`}],N=[{key:`s1`,group:`single`,status:`correct`},{key:`s2`,group:`single`,status:`correct`},{key:`s3`,group:`single`,status:`wrong`,flagged:!0},{key:`s4`,group:`single`,status:`correct`},{key:`s5`,group:`single`,status:`skipped`},{key:`s6`,group:`single`,status:`correct`},{key:`m1`,group:`multiple`,status:`wrong`},{key:`m2`,group:`multiple`,status:`correct`},{key:`m3`,group:`multiple`,status:`answered`,flagged:!0},{key:`a1`,group:`short`,status:`answered`},{key:`a2`,group:`short`},{key:`a3`,group:`short`,disabled:!0}]})))()}function F(){let[e,t]=(0,I.useState)(`q16`);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:360},children:[(0,L.jsx)(S,{items:R,value:e,onChange:t,layout:`scroll`,size:`small`}),(0,L.jsxs)(`p`,{style:{margin:0},children:[`Current question: `,e.slice(1)]})]})}var I,L,R;function z(){return(z=e((()=>{I=t(),C(),L=n(),R=Array.from({length:40},(e,t)=>({key:`q${t+1}`,status:t<14?`answered`:t===14?`skipped`:`unanswered`,flagged:t===8}))})))()}function B(){return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:420},children:[(0,V.jsx)(S,{items:H,size:`small`,defaultValue:`q5`,"aria-label":`Small sheet`}),(0,V.jsx)(S,{items:H,columns:5,defaultValue:`q5`,"aria-label":`Five columns`}),(0,V.jsx)(S,{items:H,disabled:!0,"aria-label":`Disabled sheet`})]})}var V,H;function U(){return(U=e((()=>{C(),V=n(),H=Array.from({length:10},(e,t)=>({key:`q${t+1}`,status:t<4?`answered`:`unanswered`}))})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
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
`})))()}var K;function q(){return(q=e((()=>{K=`import { useState } from "react";
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useState } from "react";
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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

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
`})))()}var Q,$,oe;function se(){return(se=e((()=>{O(),P(),z(),U(),G(),q(),Y(),Z(),t(),g(),v(),Q=n(),$=h(Object.assign({"./demos/basic.tsx":w,"./demos/groups.tsx":k,"./demos/scroll.tsx":F,"./demos/sizes.tsx":B}),Object.assign({"./demos/basic.tsx":W,"./demos/groups.tsx":K,"./demos/scroll.tsx":J,"./demos/sizes.tsx":X})),oe=()=>(0,Q.jsx)(_,{id:`answer-sheet`,demos:$})})))()}se();export{oe as default};