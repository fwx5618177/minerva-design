import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ct as r,Et as ee,J as i,St as te,Tt as a,q as o}from"./io5-CqGZWNm2.js";import{At as ne,It as re,Mt as ie,ut as ae}from"./angular-preview-l4x8c_2r.js";import{B as s,H as oe,M as se,T as c,U as l,w as ce}from"./ProgressIndicator-BhPa7d9i.js";import{i as le,n as u}from"./context-ESLv39g4.js";import{t as ue}from"./dataAttributes-CDHeJa9q.js";import{n as de,t as d}from"./Input-UDQ86mkQ.js";import{n as fe,t as pe}from"./Tag-vE6Ajh98.js";import{a as me,r as f}from"./FormControl-BkwPT394.js";import{n as p,t as m}from"./tagInput.module.scss-DOr9Jhgr.js";import{l as h,n as g,t as he,u as ge}from"./DocPage-BoAp0gXb.js";var _,v,y,b,_e,x;function S(){return(S=e((()=>{re(),l(),c(),a(),r(),u(),i(),d(),fe(),m(),_=t(),v=n(),y=[],b=`Enter`,_e=[`\r
`,`
`,`\r`],x=({value:e,defaultValue:t,onChange:n,options:r=y,commitOnBlur:i=!0,separators:a=ie,id:re,name:c,placeholder:l,"aria-label":u,"aria-labelledby":d,"aria-describedby":fe,disabled:me,readOnly:f,invalid:m,size:h=`medium`,emptyText:g,addLabel:he,clearLabel:ge,removeLabel:x,createLabel:S,className:ve,style:C,ref:w,...T})=>{let{t:E}=oe(),D=le(),O=!!(me||D?.disabled),k=!!(f||D?.readOnly),A=O||k,j=(0,_.useRef)(null),M=ee(j,w),N=(0,_.useRef)(!1),P=(0,_.useRef)(!1),F=(0,_.useId)(),[I,L]=te({value:e,defaultValue:t??y,onChange:n,name:`TagInput`}),[R,z]=(0,_.useState)(``),[B,V]=(0,_.useState)(!1),[H,U]=(0,_.useState)(0),W=B&&!A,G=R.trim(),ye=[...new Set(r.map(e=>e.trim()).filter(Boolean))].filter(e=>!I.includes(e)),K=ye.map(e=>({tag:e,label:e,filterValue:e}));G&&!I.includes(G)&&!ye.includes(G)&&K.unshift({tag:G,label:S?S(G):E(`tagInput.create`,{tag:G}),filterValue:G});let be=G.toLowerCase(),q=be?K.filter(e=>e.filterValue.toLowerCase().includes(be)):K,J=`${q.length}\u0000${R}`,[xe,Se]=(0,_.useState)(J);xe!==J&&(Se(J),U(0));let Y=a.includes(b),X=a.filter(e=>e!==b&&e!==``),Ce=Y?[...X,..._e]:X,Z=(e,t=``)=>{if(A||N.current)return;let n=[...I];for(let t of e){let e=t.trim();e&&!n.includes(e)&&n.push(e)}n.length!==I.length&&L(n),P.current=!1,z(t)},Q=e=>Z([e]),we=e=>{if(A||N.current)return;let t=e.clipboardData.getData(`text`);if(!Ce.some(e=>t.includes(e)))return;e.preventDefault();let n=e.currentTarget,r=n.selectionStart??R.length,ee=n.selectionEnd??R.length,i=R.slice(0,r)+t+R.slice(ee);Z(ne(i,Ce)),V(!1)},$=e=>{Q(e.tag),V(!1)},Te=e=>{if(A||N.current||e.nativeEvent.isComposing||e.keyCode===229)return;let t=q.length;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),P.current=!0,V(!0),t>0){let n=e.key===`ArrowDown`?1:-1;U(e=>(e+n+t)%t)}break;case`Enter`:e.preventDefault(),Y?!P.current&&(!G||I.includes(G))?Q(R):W&&q[H]?$(q[H]):(Q(R),V(!1)):P.current&&W&&q[H]&&$(q[H]);break;case`Escape`:P.current=!1,z(``),W&&(e.preventDefault(),V(!1));break;case`Backspace`:R===``&&I.length>0&&(e.preventDefault(),L(I.slice(0,-1)))}},Ee=e=>x?x(e):E(`tagInput.remove`,{tag:e}),De=W?q[H]:void 0,Oe=e=>`${F}-option-${e}`;return(0,v.jsxs)(`div`,{...ue(T),className:ae(p.root,ve),style:C,...s(`tag-input`,`root`,{state:W?`open`:`closed`,disabled:O,invalid:m||!!D?.invalid,readonly:k,required:!!D?.required,size:h}),children:[I.length>0&&(0,v.jsx)(`div`,{className:p.values,...s(`tag-input`,`tags`),children:I.map((e,t)=>(0,v.jsx)(pe,{className:p.tag,size:`large`,disabled:O,closable:!k,closeLabel:Ee(e),onClose:()=>{A||(L(I.filter((e,n)=>n!==t)),j.current?.focus())},children:(0,v.jsx)(`span`,{className:p.label,children:e})},`${t}-${e}`))}),(0,v.jsxs)(`div`,{className:p.entry,children:[(0,v.jsxs)(`div`,{className:p.combobox,children:[(0,v.jsx)(de,{ref:M,id:re,size:h,invalid:m,type:`text`,role:`combobox`,"aria-label":u,"aria-labelledby":d,"aria-describedby":fe,"aria-expanded":W,"aria-controls":W?F:void 0,"aria-autocomplete":`list`,"aria-activedescendant":De?Oe(H):void 0,autoComplete:`off`,spellCheck:!1,placeholder:l,value:R,disabled:O,readOnly:k,onChange:e=>{if(A)return;P.current=!1;let t=e.target.value,n=N.current||X.length===0?[t]:ne(t,X);n.length>1?Z(n.slice(0,-1),n[n.length-1]):z(t),V(!0)},onFocus:()=>{A||V(!0)},onClick:()=>{A||V(!0)},onBlur:()=>{V(!1),i&&Q(R)},onCompositionStart:()=>{N.current=!0},onCompositionEnd:()=>{N.current=!1},onKeyDown:Te,onPaste:we}),W&&(0,v.jsxs)(`ul`,{id:F,role:`listbox`,"aria-label":u,"aria-labelledby":d,className:p.list,...s(`tag-input`,`list`),children:[q.length===0&&(0,v.jsx)(`li`,{className:p.empty,role:`presentation`,...s(`tag-input`,`empty`),children:g??E(`tagInput.empty`)}),q.map((e,t)=>(0,v.jsx)(`li`,{id:Oe(t),role:`option`,"aria-selected":t===H,tabIndex:-1,className:p.option,onMouseDown:t=>{t.preventDefault(),$(e)},onMouseEnter:()=>U(t),...s(`tag-input`,`option`,{highlighted:t===H}),children:e.label},`${e.label}-${e.tag}`))]})]}),!k&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{type:`button`,label:he??E(`tagInput.add`),shape:`square`,icon:(0,v.jsx)(se,{"aria-hidden":!0}),disabled:O||!G||I.includes(G),onMouseDown:e=>e.preventDefault(),onClick:()=>{Q(R),j.current?.focus()}}),(0,v.jsx)(o,{type:`button`,label:ge??E(`tagInput.clear`),shape:`square`,icon:(0,v.jsx)(ce,{"aria-hidden":!0}),disabled:O||I.length===0,onMouseDown:e=>e.preventDefault(),onClick:()=>{z(``),L([]),j.current?.focus()}})]})]}),c&&I.map((e,t)=>(0,v.jsx)(`input`,{type:`hidden`,name:c,value:e,disabled:O},`${t}-${e}`))]})}})))()}function ve(){let[e,t]=(0,C.useState)([`React`]);return(0,w.jsx)(x,{"aria-label":`Tags`,placeholder:`Type a tag and press Enter`,value:e,onChange:t,options:[`React`,`Vue`,`Svelte`,`Solid`]})}var C,w;function T(){return(T=e((()=>{S(),C=t(),w=n()})))()}function E(){return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(f,{label:`Article tags`,helperText:`Submitted as repeated tags fields.`,children:(0,D.jsx)(x,{name:`tags`,defaultValue:[`news`,`tech`],size:`small`})}),(0,D.jsx)(f,{label:`Read-only tags`,readOnly:!0,children:(0,D.jsx)(x,{defaultValue:[`archived`]})})]})}var D;function O(){return(O=e((()=>{me(),S(),D=n()})))()}function k(){let[e,t]=(0,A.useState)([`alice@example.com`]);return(0,j.jsx)(x,{"aria-label":`Recipients`,placeholder:`Type or paste "a; b, c"`,value:e,onChange:t,separators:[`,`,`;`,`Enter`]})}var A,j;function M(){return(M=e((()=>{S(),A=t(),j=n()})))()}var N;function P(){return(P=e((()=>{N=`import { TagInput } from "minerva-design";
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
`})))()}var F;function I(){return(I=e((()=>{F=`import { FormField, TagInput } from "minerva-design";

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
`})))()}var L;function R(){return(R=e((()=>{L=`import { TagInput } from "minerva-design";
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
`})))()}var z,B,V;function H(){return(H=e((()=>{T(),O(),M(),P(),I(),R(),t(),g(),ge(),z=n(),B=h(Object.assign({"./demos/basic.tsx":ve,"./demos/form-control.tsx":E,"./demos/separators.tsx":k}),Object.assign({"./demos/basic.tsx":N,"./demos/form-control.tsx":F,"./demos/separators.tsx":L})),V=()=>(0,z.jsx)(he,{id:`tag-input`,demos:B})})))()}H();export{V as default};