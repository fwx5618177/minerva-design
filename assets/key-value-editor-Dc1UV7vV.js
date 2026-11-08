import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{_t as r,vt as i}from"./io5-DGxLJ5Qx.js";import{Mn as a,rt as o}from"./angular-preview-CxN7u9Fp.js";import{B as s,M as c,R as l,T as u,V as d,w as f,z as p}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as m}from"./stylingHooks-PqiNJdev.js";import{i as h,r as g}from"./CodeBlock-Y-lIOv3H.js";import{a as _,r as v}from"./FormControl-DV6JijA1.js";import{n as y,t as b}from"./Textarea-B6V_u_Ec.js";import{n as x,t as S}from"./keyValueEditor.module.scss-BoWLNL6h.js";import{l as C,n as w,t as T,u as E}from"./DocPage-CLRVLliF.js";var D,O,k,A;function j(){return(j=e((()=>{a(),d(),l(),u(),i(),h(),_(),b(),S(),D=t(),O=n(),k=[],A=({entries:e,defaultEntries:t,onChange:n,disabled:i=!1,keyLabel:a,valueLabel:l,addLabel:u,removeLabel:d,errors:h,className:_,ref:b,...S})=>{let{t:C}=s(),w=(0,D.useId)(),T=(0,D.useRef)(0),[E,A]=r({value:e,defaultValue:t??k,onChange:n,name:`KeyValueEditor`,prop:`entries`}),j=a??C(`keyValueEditor.key`),M=l??C(`keyValueEditor.value`),N=d??C(`keyValueEditor.remove`),P=(0,D.useRef)(new Map),F=(0,D.useRef)(new Map),I=(0,D.useRef)(null),L=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=L.current;if(!e)return;L.current=null;let t=e=>E.some(t=>t.id===e);e.kind===`add`?t(e.id)&&P.current.get(e.id)?.focus():t(e.id)||(e.nextId&&F.current.get(e.nextId)||I.current)?.focus()},[E]);let R=()=>{if(i)return;let e;do e=`key-value-${w}-${T.current++}`;while(E.some(t=>t.id===e));L.current={kind:`add`,id:e},A([...E,{id:e,key:``,value:``}])},z=(e,t,n)=>{i||A(E.map(r=>r.id===e?{...r,[t]:n}:r))},B=e=>{if(i)return;let t=E.findIndex(t=>t.id===e),n=E[t+1]??E[t-1];L.current={kind:`remove`,id:e,nextId:n?.id},A(E.filter(t=>t.id!==e))},V=(e,t)=>(0,O.jsxs)(O.Fragment,{children:[e,(0,O.jsxs)(`span`,{className:x.srOnly,children:[` `,t+1]})]});return(0,O.jsxs)(`div`,{ref:b,...S,className:o(x.root,_),...m(`key-value-editor`,`root`,{disabled:i}),children:[E.map((e,t)=>{let n=h?.[e.id];return(0,O.jsxs)(`div`,{className:x.row,...m(`key-value-editor`,`row`,{invalid:!!(n?.key||n?.value)}),children:[(0,O.jsx)(v,{label:V(j,t),disabled:i,invalid:!!n?.key,errorMessage:n?.key,children:(0,O.jsx)(y,{ref:t=>{t?P.current.set(e.id,t):P.current.delete(e.id)},className:x.key,size:`small`,rows:1,value:e.key,onChange:t=>z(e.id,`key`,t.target.value)})}),(0,O.jsx)(v,{label:V(M,t),disabled:i,invalid:!!n?.value,errorMessage:n?.value,children:(0,O.jsx)(y,{size:`small`,rows:2,value:e.value,onChange:t=>z(e.id,`value`,t.target.value)})}),(0,O.jsx)(g,{ref:t=>{t?F.current.set(e.id,t):F.current.delete(e.id)},className:x.remove,type:`button`,label:`${N} ${t+1}`,size:`small`,shape:`square`,icon:(0,O.jsx)(f,{size:16,"aria-hidden":!0}),disabled:i,onClick:()=>B(e.id)})]},e.id)}),(0,O.jsxs)(p,{ref:I,className:x.add,type:`button`,color:`neutral`,variant:`outline`,size:`small`,disabled:i,onClick:R,children:[(0,O.jsx)(c,{size:16,"aria-hidden":!0}),(0,O.jsx)(`span`,{children:u??C(`keyValueEditor.add`)})]})]})}})))()}function M(){let[e,t]=(0,N.useState)([{id:`greeting`,key:`greeting`,value:`Hello
world`}]);return(0,P.jsx)(A,{entries:e,onChange:t,keyLabel:`Translation key`,valueLabel:`Translation`,addLabel:`Add translation`,removeLabel:`Remove translation`})}var N,P;function F(){return(F=e((()=>{j(),N=t(),P=n()})))()}function I(){let[e,t]=(0,L.useState)([{id:`a`,key:`Accept`,value:`application/json`},{id:`b`,key:`Accept`,value:``}]),n=Object.fromEntries(e.map(t=>[t.id,{key:e.some(e=>e!==t&&e.key===t.key)?`Duplicate header`:void 0,value:t.value?void 0:`Value required`}]));return(0,R.jsx)(A,{entries:e,onChange:t,errors:n})}var L,R;function z(){return(z=e((()=>{j(),L=t(),R=n()})))()}var B;function V(){return(V=e((()=>{B=`import { KeyValueEditor, type KeyValueEntry } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [entries, setEntries] = useState<KeyValueEntry[]>([
    { id: "greeting", key: "greeting", value: "Hello\\nworld" },
  ]);
  return (
    <KeyValueEditor
      entries={entries}
      onChange={setEntries}
      keyLabel="Translation key"
      valueLabel="Translation"
      addLabel="Add translation"
      removeLabel="Remove translation"
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { KeyValueEditor, type KeyValueEntry } from "minerva-design";
import { useState } from "react";

export default function ErrorsDemo() {
  const [entries, setEntries] = useState<KeyValueEntry[]>([
    { id: "a", key: "Accept", value: "application/json" },
    { id: "b", key: "Accept", value: "" },
  ]);
  const errors = Object.fromEntries(
    entries.map((entry) => [
      entry.id,
      {
        key: entries.some((other) => other !== entry && other.key === entry.key)
          ? "Duplicate header"
          : undefined,
        value: entry.value ? undefined : "Value required",
      },
    ]),
  );
  return (
    <KeyValueEditor entries={entries} onChange={setEntries} errors={errors} />
  );
}
`})))()}var W,G,K;function q(){return(q=e((()=>{F(),z(),V(),U(),t(),w(),E(),W=n(),G=C(Object.assign({"./demos/basic.tsx":M,"./demos/errors.tsx":I}),Object.assign({"./demos/basic.tsx":B,"./demos/errors.tsx":H})),K=()=>(0,W.jsx)(T,{id:`key-value-editor`,demos:G})})))()}q();export{K as default};