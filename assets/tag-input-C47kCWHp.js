import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Mn as r,_t as i,dt as ee,rt as a}from"./angular-preview-B7Uzpk8P.js";import{B as te,M as ne,T as re,V as o,w as ie}from"./ProgressIndicator-CLQ5GhV8.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{i as ae,n as oe}from"./context-ESLv39g4.js";import{St as c,Tt as se,wt as ce,xt as le}from"./io5-BsjRfO9T.js";import{t as ue}from"./dataAttributes-CDHeJa9q.js";import{i as l,r as de}from"./CodeBlock-BfjU5DKs.js";import{n as fe,t as u}from"./Input-B-_C7F3z.js";import{n as pe,t as me}from"./Tag-DNW1VEd2.js";import{a as he,r as d}from"./FormControl-CQnw3MB7.js";import{n as f,t as p}from"./tagInput.module.scss-DOr9Jhgr.js";import{l as m,n as h,t as g,u as _}from"./DocPage-B2bkh08E.js";var v,y,b,x,ge,S;function C(){return(C=e((()=>{r(),o(),re(),ce(),c(),oe(),l(),u(),pe(),p(),v=t(),y=n(),b=[],x=`Enter`,ge=[`\r
`,`
`,`\r`],S=({value:e,defaultValue:t,onChange:n,options:r=b,commitOnBlur:re=!0,separators:o=ee,id:oe,name:c,placeholder:ce,"aria-label":l,"aria-labelledby":u,"aria-describedby":pe,disabled:he,readOnly:d,invalid:p,size:m=`medium`,emptyText:h,addLabel:g,clearLabel:_,removeLabel:S,createLabel:C,className:_e,style:w,ref:T,...E})=>{let{t:D}=te(),O=ae(),k=!!(he||O?.disabled),A=!!(d||O?.readOnly),j=k||A,M=(0,v.useRef)(null),N=se(M,T),P=(0,v.useRef)(!1),F=(0,v.useRef)(!1),I=(0,v.useId)(),[L,R]=le({value:e,defaultValue:t??b,onChange:n,name:`TagInput`}),[z,B]=(0,v.useState)(``),[V,H]=(0,v.useState)(!1),[U,W]=(0,v.useState)(0),G=V&&!j,K=z.trim(),ve=[...new Set(r.map(e=>e.trim()).filter(Boolean))].filter(e=>!L.includes(e)),q=ve.map(e=>({tag:e,label:e,filterValue:e}));K&&!L.includes(K)&&!ve.includes(K)&&q.unshift({tag:K,label:C?C(K):D(`tagInput.create`,{tag:K}),filterValue:K});let ye=K.toLowerCase(),J=ye?q.filter(e=>e.filterValue.toLowerCase().includes(ye)):q,Y=`${J.length}\u0000${z}`,[be,xe]=(0,v.useState)(Y);be!==Y&&(xe(Y),W(0));let Se=o.includes(x),X=o.filter(e=>e!==x&&e!==``),Ce=Se?[...X,...ge]:X,Z=(e,t=``)=>{if(j||P.current)return;let n=[...L];for(let t of e){let e=t.trim();e&&!n.includes(e)&&n.push(e)}n.length!==L.length&&R(n),F.current=!1,B(t)},Q=e=>Z([e]),we=e=>{if(j||P.current)return;let t=e.clipboardData.getData(`text`);if(!Ce.some(e=>t.includes(e)))return;e.preventDefault();let n=e.currentTarget,r=n.selectionStart??z.length,ee=n.selectionEnd??z.length,a=z.slice(0,r)+t+z.slice(ee);Z(i(a,Ce)),H(!1)},$=e=>{Q(e.tag),H(!1)},Te=e=>{if(j||P.current||e.nativeEvent.isComposing||e.keyCode===229)return;let t=J.length;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),F.current=!0,H(!0),t>0){let n=e.key===`ArrowDown`?1:-1;W(e=>(e+n+t)%t)}break;case`Enter`:e.preventDefault(),Se?!F.current&&(!K||L.includes(K))?Q(z):G&&J[U]?$(J[U]):(Q(z),H(!1)):F.current&&G&&J[U]&&$(J[U]);break;case`Escape`:F.current=!1,B(``),G&&(e.preventDefault(),H(!1));break;case`Backspace`:z===``&&L.length>0&&(e.preventDefault(),R(L.slice(0,-1)))}},Ee=e=>S?S(e):D(`tagInput.remove`,{tag:e}),De=G?J[U]:void 0,Oe=e=>`${I}-option-${e}`;return(0,y.jsxs)(`div`,{...ue(E),className:a(f.root,_e),style:w,...s(`tag-input`,`root`,{state:G?`open`:`closed`,disabled:k,invalid:p||!!O?.invalid,readonly:A,required:!!O?.required,size:m}),children:[L.length>0&&(0,y.jsx)(`div`,{className:f.values,...s(`tag-input`,`tags`),children:L.map((e,t)=>(0,y.jsx)(me,{className:f.tag,size:`large`,disabled:k,closable:!A,closeLabel:Ee(e),onClose:()=>{j||(R(L.filter((e,n)=>n!==t)),M.current?.focus())},children:(0,y.jsx)(`span`,{className:f.label,children:e})},`${t}-${e}`))}),(0,y.jsxs)(`div`,{className:f.entry,children:[(0,y.jsxs)(`div`,{className:f.combobox,children:[(0,y.jsx)(fe,{ref:N,id:oe,size:m,invalid:p,type:`text`,role:`combobox`,"aria-label":l,"aria-labelledby":u,"aria-describedby":pe,"aria-expanded":G,"aria-controls":G?I:void 0,"aria-autocomplete":`list`,"aria-activedescendant":De?Oe(U):void 0,autoComplete:`off`,spellCheck:!1,placeholder:ce,value:z,disabled:k,readOnly:A,onChange:e=>{if(j)return;F.current=!1;let t=e.target.value,n=P.current||X.length===0?[t]:i(t,X);n.length>1?Z(n.slice(0,-1),n[n.length-1]):B(t),H(!0)},onFocus:()=>{j||H(!0)},onClick:()=>{j||H(!0)},onBlur:()=>{H(!1),re&&Q(z)},onCompositionStart:()=>{P.current=!0},onCompositionEnd:()=>{P.current=!1},onKeyDown:Te,onPaste:we}),G&&(0,y.jsxs)(`ul`,{id:I,role:`listbox`,"aria-label":l,"aria-labelledby":u,className:f.list,...s(`tag-input`,`list`),children:[J.length===0&&(0,y.jsx)(`li`,{className:f.empty,role:`presentation`,...s(`tag-input`,`empty`),children:h??D(`tagInput.empty`)}),J.map((e,t)=>(0,y.jsx)(`li`,{id:Oe(t),role:`option`,"aria-selected":t===U,tabIndex:-1,className:f.option,onMouseDown:t=>{t.preventDefault(),$(e)},onMouseEnter:()=>W(t),...s(`tag-input`,`option`,{highlighted:t===U}),children:e.label},`${e.label}-${e.tag}`))]})]}),!A&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(de,{type:`button`,label:g??D(`tagInput.add`),shape:`square`,icon:(0,y.jsx)(ne,{"aria-hidden":!0}),disabled:k||!K||L.includes(K),onMouseDown:e=>e.preventDefault(),onClick:()=>{Q(z),M.current?.focus()}}),(0,y.jsx)(de,{type:`button`,label:_??D(`tagInput.clear`),shape:`square`,icon:(0,y.jsx)(ie,{"aria-hidden":!0}),disabled:k||L.length===0,onMouseDown:e=>e.preventDefault(),onClick:()=>{B(``),R([]),M.current?.focus()}})]})]}),c&&L.map((e,t)=>(0,y.jsx)(`input`,{type:`hidden`,name:c,value:e,disabled:k},`${t}-${e}`))]})}})))()}function _e(){let[e,t]=(0,w.useState)([`React`]);return(0,T.jsx)(S,{"aria-label":`Tags`,placeholder:`Type a tag and press Enter`,value:e,onChange:t,options:[`React`,`Vue`,`Svelte`,`Solid`]})}var w,T;function E(){return(E=e((()=>{C(),w=t(),T=n()})))()}function D(){return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(d,{label:`Article tags`,helperText:`Submitted as repeated tags fields.`,children:(0,O.jsx)(S,{name:`tags`,defaultValue:[`news`,`tech`],size:`small`})}),(0,O.jsx)(d,{label:`Read-only tags`,readOnly:!0,children:(0,O.jsx)(S,{defaultValue:[`archived`]})})]})}var O;function k(){return(k=e((()=>{he(),C(),O=n()})))()}function A(){let[e,t]=(0,j.useState)([`alice@example.com`]);return(0,M.jsx)(S,{"aria-label":`Recipients`,placeholder:`Type or paste "a; b, c"`,value:e,onChange:t,separators:[`,`,`;`,`Enter`]})}var j,M;function N(){return(N=e((()=>{C(),j=t(),M=n()})))()}var P;function F(){return(F=e((()=>{P=`import { TagInput } from "minerva-design";
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
`})))()}var B,V,H;function U(){return(U=e((()=>{E(),k(),N(),F(),L(),z(),t(),h(),_(),B=n(),V=m(Object.assign({"./demos/basic.tsx":_e,"./demos/form-control.tsx":D,"./demos/separators.tsx":A}),Object.assign({"./demos/basic.tsx":P,"./demos/form-control.tsx":I,"./demos/separators.tsx":R})),H=()=>(0,B.jsx)(g,{id:`tag-input`,demos:V})})))()}U();export{H as default};