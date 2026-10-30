import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{At as r,It as i,Mt as ee,ut as te}from"./angular-preview-l4x8c_2r.js";import{B as a,H as ne,M as re,T as ie,U as o,w as ae}from"./ProgressIndicator-BhPa7d9i.js";import{i as oe,n as se}from"./context-ESLv39g4.js";import{Ct as s,Et as ce,J as c,St as le,Tt as l,q as ue}from"./io5-DF7HdQ2g.js";import{t as de}from"./dataAttributes-CDHeJa9q.js";import{n as fe,t as u}from"./Input-DboHcSJW.js";import{n as pe,t as me}from"./Tag-vE6Ajh98.js";import{a as he,r as d}from"./FormControl-BkwPT394.js";import{n as f,t as p}from"./tagInput.module.scss-DOr9Jhgr.js";import{l as m,n as h,t as ge,u as _e}from"./DocPage-B2iACtLP.js";var g,_,v,y,b,x;function S(){return(S=e((()=>{i(),o(),ie(),l(),s(),se(),c(),u(),pe(),p(),g=t(),_=n(),v=[],y=`Enter`,b=[`\r
`,`
`,`\r`],x=({value:e,defaultValue:t,onChange:n,options:i=v,commitOnBlur:ie=!0,separators:o=ee,id:se,name:s,placeholder:c,"aria-label":l,"aria-labelledby":u,"aria-describedby":pe,disabled:he,readOnly:d,invalid:p,size:m=`medium`,emptyText:h,addLabel:ge,clearLabel:_e,removeLabel:x,createLabel:S,className:C,style:w,ref:T,...E})=>{let{t:D}=ne(),O=oe(),k=!!(he||O?.disabled),A=!!(d||O?.readOnly),j=k||A,M=(0,g.useRef)(null),N=ce(M,T),P=(0,g.useRef)(!1),F=(0,g.useRef)(!1),I=(0,g.useId)(),[L,R]=le({value:e,defaultValue:t??v,onChange:n,name:`TagInput`}),[z,B]=(0,g.useState)(``),[V,H]=(0,g.useState)(!1),[U,W]=(0,g.useState)(0),G=V&&!j,K=z.trim(),ve=[...new Set(i.map(e=>e.trim()).filter(Boolean))].filter(e=>!L.includes(e)),q=ve.map(e=>({tag:e,label:e,filterValue:e}));K&&!L.includes(K)&&!ve.includes(K)&&q.unshift({tag:K,label:S?S(K):D(`tagInput.create`,{tag:K}),filterValue:K});let ye=K.toLowerCase(),J=ye?q.filter(e=>e.filterValue.toLowerCase().includes(ye)):q,Y=`${J.length}\u0000${z}`,[be,xe]=(0,g.useState)(Y);be!==Y&&(xe(Y),W(0));let Se=o.includes(y),X=o.filter(e=>e!==y&&e!==``),Ce=Se?[...X,...b]:X,Z=(e,t=``)=>{if(j||P.current)return;let n=[...L];for(let t of e){let e=t.trim();e&&!n.includes(e)&&n.push(e)}n.length!==L.length&&R(n),F.current=!1,B(t)},Q=e=>Z([e]),we=e=>{if(j||P.current)return;let t=e.clipboardData.getData(`text`);if(!Ce.some(e=>t.includes(e)))return;e.preventDefault();let n=e.currentTarget,i=n.selectionStart??z.length,ee=n.selectionEnd??z.length,te=z.slice(0,i)+t+z.slice(ee);Z(r(te,Ce)),H(!1)},$=e=>{Q(e.tag),H(!1)},Te=e=>{if(j||P.current||e.nativeEvent.isComposing||e.keyCode===229)return;let t=J.length;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),F.current=!0,H(!0),t>0){let n=e.key===`ArrowDown`?1:-1;W(e=>(e+n+t)%t)}break;case`Enter`:e.preventDefault(),Se?!F.current&&(!K||L.includes(K))?Q(z):G&&J[U]?$(J[U]):(Q(z),H(!1)):F.current&&G&&J[U]&&$(J[U]);break;case`Escape`:F.current=!1,B(``),G&&(e.preventDefault(),H(!1));break;case`Backspace`:z===``&&L.length>0&&(e.preventDefault(),R(L.slice(0,-1)))}},Ee=e=>x?x(e):D(`tagInput.remove`,{tag:e}),De=G?J[U]:void 0,Oe=e=>`${I}-option-${e}`;return(0,_.jsxs)(`div`,{...de(E),className:te(f.root,C),style:w,...a(`tag-input`,`root`,{state:G?`open`:`closed`,disabled:k,invalid:p||!!O?.invalid,readonly:A,required:!!O?.required,size:m}),children:[L.length>0&&(0,_.jsx)(`div`,{className:f.values,...a(`tag-input`,`tags`),children:L.map((e,t)=>(0,_.jsx)(me,{className:f.tag,size:`large`,disabled:k,closable:!A,closeLabel:Ee(e),onClose:()=>{j||(R(L.filter((e,n)=>n!==t)),M.current?.focus())},children:(0,_.jsx)(`span`,{className:f.label,children:e})},`${t}-${e}`))}),(0,_.jsxs)(`div`,{className:f.entry,children:[(0,_.jsxs)(`div`,{className:f.combobox,children:[(0,_.jsx)(fe,{ref:N,id:se,size:m,invalid:p,type:`text`,role:`combobox`,"aria-label":l,"aria-labelledby":u,"aria-describedby":pe,"aria-expanded":G,"aria-controls":G?I:void 0,"aria-autocomplete":`list`,"aria-activedescendant":De?Oe(U):void 0,autoComplete:`off`,spellCheck:!1,placeholder:c,value:z,disabled:k,readOnly:A,onChange:e=>{if(j)return;F.current=!1;let t=e.target.value,n=P.current||X.length===0?[t]:r(t,X);n.length>1?Z(n.slice(0,-1),n[n.length-1]):B(t),H(!0)},onFocus:()=>{j||H(!0)},onClick:()=>{j||H(!0)},onBlur:()=>{H(!1),ie&&Q(z)},onCompositionStart:()=>{P.current=!0},onCompositionEnd:()=>{P.current=!1},onKeyDown:Te,onPaste:we}),G&&(0,_.jsxs)(`ul`,{id:I,role:`listbox`,"aria-label":l,"aria-labelledby":u,className:f.list,...a(`tag-input`,`list`),children:[J.length===0&&(0,_.jsx)(`li`,{className:f.empty,role:`presentation`,...a(`tag-input`,`empty`),children:h??D(`tagInput.empty`)}),J.map((e,t)=>(0,_.jsx)(`li`,{id:Oe(t),role:`option`,"aria-selected":t===U,tabIndex:-1,className:f.option,onMouseDown:t=>{t.preventDefault(),$(e)},onMouseEnter:()=>W(t),...a(`tag-input`,`option`,{highlighted:t===U}),children:e.label},`${e.label}-${e.tag}`))]})]}),!A&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(ue,{type:`button`,label:ge??D(`tagInput.add`),shape:`square`,icon:(0,_.jsx)(re,{"aria-hidden":!0}),disabled:k||!K||L.includes(K),onMouseDown:e=>e.preventDefault(),onClick:()=>{Q(z),M.current?.focus()}}),(0,_.jsx)(ue,{type:`button`,label:_e??D(`tagInput.clear`),shape:`square`,icon:(0,_.jsx)(ae,{"aria-hidden":!0}),disabled:k||L.length===0,onMouseDown:e=>e.preventDefault(),onClick:()=>{B(``),R([]),M.current?.focus()}})]})]}),s&&L.map((e,t)=>(0,_.jsx)(`input`,{type:`hidden`,name:s,value:e,disabled:k},`${t}-${e}`))]})}})))()}function C(){let[e,t]=(0,w.useState)([`React`]);return(0,T.jsx)(x,{"aria-label":`Tags`,placeholder:`Type a tag and press Enter`,value:e,onChange:t,options:[`React`,`Vue`,`Svelte`,`Solid`]})}var w,T;function E(){return(E=e((()=>{S(),w=t(),T=n()})))()}function D(){return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(d,{label:`Article tags`,helperText:`Submitted as repeated tags fields.`,children:(0,O.jsx)(x,{name:`tags`,defaultValue:[`news`,`tech`],size:`small`})}),(0,O.jsx)(d,{label:`Read-only tags`,readOnly:!0,children:(0,O.jsx)(x,{defaultValue:[`archived`]})})]})}var O;function k(){return(k=e((()=>{he(),S(),O=n()})))()}function A(){let[e,t]=(0,j.useState)([`alice@example.com`]);return(0,M.jsx)(x,{"aria-label":`Recipients`,placeholder:`Type or paste "a; b, c"`,value:e,onChange:t,separators:[`,`,`;`,`Enter`]})}var j,M;function N(){return(N=e((()=>{S(),j=t(),M=n()})))()}var P;function F(){return(F=e((()=>{P=`import { TagInput } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [tags, setTags] = useState<readonly string[]>(["React"]);
  return (
    <TagInput
      aria-label="Tags"
      placeholder="Type a tag and press Enter"
      value={tags}
      onChange={setTags}
      options={["React", "Vue", "Svelte", "Solid"]}
    />
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { FormField, TagInput } from "minerva-design";

export default function FormControlDemo() {
  return (
    <>
      <FormField
        label="Article tags"
        helperText="Submitted as repeated tags fields."
      >
        <TagInput name="tags" defaultValue={["news", "tech"]} size="small" />
      </FormField>
      <FormField label="Read-only tags" readOnly>
        <TagInput defaultValue={["archived"]} />
      </FormField>
    </>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { TagInput } from "minerva-design";
import { useState } from "react";

export default function SeparatorsDemo() {
  const [tags, setTags] = useState<readonly string[]>(["alice@example.com"]);
  return (
    <TagInput
      aria-label="Recipients"
      placeholder='Type or paste "a; b, c"'
      value={tags}
      onChange={setTags}
      separators={[",", ";", "Enter"]}
    />
  );
}
`})))()}var B,V,H;function U(){return(U=e((()=>{E(),k(),N(),F(),L(),z(),t(),h(),_e(),B=n(),V=m(Object.assign({"./demos/basic.tsx":C,"./demos/form-control.tsx":D,"./demos/separators.tsx":A}),Object.assign({"./demos/basic.tsx":P,"./demos/form-control.tsx":I,"./demos/separators.tsx":R})),H=()=>(0,B.jsx)(ge,{id:`tag-input`,demos:V})})))()}U();export{H as default};