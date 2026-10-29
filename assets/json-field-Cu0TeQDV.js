import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{_ as r,g as i,h as a,m as o}from"./native-preview-C-OsNMso.js";import{Ct as s,J as c,St as ee,q as l}from"./io5-CvrBnF9y.js";import{It as u,ut as d}from"./angular-preview-l4x8c_2r.js";import{B as f,H as p,I as m,L as h,T as g,U as _,x as te}from"./ProgressIndicator-BhPa7d9i.js";import{i as ne,n as v}from"./context-ESLv39g4.js";import{a as y,r as b}from"./FormControl-BkwPT394.js";import{n as x,t as S}from"./Textarea-a_5o3gYH.js";import{n as C,t as w}from"./jsonField.module.scss-BtPR-0-M.js";import{l as T,n as E,t as D,u as O}from"./DocPage-DCMfehF7.js";function k(e){if(!e.trim())return{status:`empty`};try{return JSON.parse(e),{status:`valid`}}catch(e){return{status:`invalid`,error:e instanceof Error?e.message:String(e)}}}function re(e,t){let n=Math.min(10,Math.max(0,Math.trunc(t)||0));if(n>0)return o(e,i(e,void 0,{tabSize:n,insertSpaces:!0,eol:`
`}));let r=a(e,!0),s=[];for(;r.getPosition()<e.length;){r.scan();let t=r.getTokenOffset();s.push(e.slice(t,t+r.getTokenLength()))}return s.join(``)}var A,j,M;function N(){return(N=e((()=>{u(),_(),g(),s(),v(),c(),S(),C(),A=t(),j=n(),r(),M=({value:e,defaultValue:t,onChange:n,rows:r=8,hideToolbar:i=!1,indent:a=2,className:o,formatLabel:s,validLabel:c,invalidLabel:u,disabled:g,readOnly:_,required:v,invalid:y=!1,onFocus:b,onBlur:S,"aria-describedby":C,"aria-invalid":T,spellCheck:E=!1,...D})=>{let{t:O}=p(),M=ne(),N=!!(g||M?.disabled),P=!!(_||M?.readOnly),F=!!(v||M?.required),I=`json-status-${(0,A.useId)()}`,[L,R]=ee({value:e,defaultValue:t??``,onChange:n,name:`JsonField`}),[z,B]=(0,A.useState)(!1),V=z?{status:`empty`}:k(L),H=V.status===`invalid`,U=()=>{N||P||k(L).status!==`valid`||R(re(L,a))};return(0,j.jsxs)(`div`,{className:d(w.root,o),...f(`json-field`,`root`,{disabled:N,invalid:H||y||!!M?.invalid,readonly:P,required:F}),children:[!i&&(0,j.jsx)(`div`,{className:w.toolbar,...f(`json-field`,`toolbar`),children:(0,j.jsx)(l,{type:`button`,label:s??O(`jsonField.format`),size:`small`,shape:`square`,icon:(0,j.jsx)(te,{size:18,"aria-hidden":!0}),disabled:N||P||!L.trim(),onClick:U})}),(0,j.jsx)(x,{...D,rows:r,value:L,disabled:N,readOnly:P,required:F,spellCheck:E,className:w.textarea,"aria-invalid":H||y?!0:T!==`false`&&T,"aria-describedby":[C,H?I:void 0].filter(Boolean).join(` `)||void 0,onChange:e=>{!N&&!P&&R(e.target.value)},onFocus:e=>{B(!0),b?.(e)},onBlur:e=>{B(!1),S?.(e)}}),(0,j.jsxs)(`div`,{id:I,role:`status`,"aria-live":`polite`,className:d(w.status,H&&w.statusInvalid),...f(`json-field`,`status`),children:[V.status===`valid`&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(h,{size:16,"aria-hidden":!0}),(0,j.jsx)(`span`,{children:c??O(`jsonField.valid`)})]}),V.status===`invalid`&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(m,{size:16,"aria-hidden":!0}),(0,j.jsxs)(`span`,{children:[u??O(`jsonField.invalid`),`: `,V.error]})]})]})]})}})))()}function P(){let[e,t]=(0,F.useState)(`{"title":"Draft","tags":["a","b"]}`);return(0,I.jsx)(M,{"aria-label":`Response body`,value:e,onChange:t,rows:6})}var F,I;function L(){return(L=e((()=>{N(),F=t(),I=n()})))()}function R(){return(0,z.jsx)(b,{label:`Dictionary`,helperText:`Public translation dictionary.`,required:!0,children:(0,z.jsx)(M,{name:`dictionary`,defaultValue:`{"hello":"world"}`,rows:5})})}var z;function B(){return(B=e((()=>{y(),N(),z=n()})))()}function V(){return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(M,{"aria-label":`Four spaces`,defaultValue:`{"a":[1,2]}`,indent:4,rows:4}),(0,H.jsx)(M,{"aria-label":`Compact`,defaultValue:`{
  "a": [1, 2]
}`,indent:0,rows:4}),(0,H.jsx)(M,{"aria-label":`Without toolbar`,defaultValue:`{`,hideToolbar:!0,rows:2})]})}var H;function U(){return(U=e((()=>{N(),H=n()})))()}var W;function G(){return(G=e((()=>{W=`import { JsonField } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [text, setText] = useState('{"title":"Draft","tags":["a","b"]}');
  return (
    <JsonField
      aria-label="Response body"
      value={text}
      onChange={setText}
      rows={6}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { FormField, JsonField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <FormField
      label="Dictionary"
      helperText="Public translation dictionary."
      required
    >
      <JsonField name="dictionary" defaultValue='{"hello":"world"}' rows={5} />
    </FormField>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { JsonField } from "minerva-design";

export default function IndentDemo() {
  return (
    <>
      <JsonField
        aria-label="Four spaces"
        defaultValue='{"a":[1,2]}'
        indent={4}
        rows={4}
      />
      <JsonField
        aria-label="Compact"
        defaultValue={'{\\n  "a": [1, 2]\\n}'}
        indent={0}
        rows={4}
      />
      <JsonField
        aria-label="Without toolbar"
        defaultValue="{"
        hideToolbar
        rows={2}
      />
    </>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{L(),B(),U(),G(),q(),Y(),t(),E(),O(),X=n(),Z=T(Object.assign({"./demos/basic.tsx":P,"./demos/form-control.tsx":R,"./demos/indent.tsx":V}),Object.assign({"./demos/basic.tsx":W,"./demos/form-control.tsx":K,"./demos/indent.tsx":J})),Q=()=>(0,X.jsx)(D,{id:`json-field`,demos:Z})})))()}$();export{Q as default};