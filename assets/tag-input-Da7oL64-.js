import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{in as r,on as i,rn as ee,sn as te}from"./icons-BnhBUHMa.js";import{Nn as a,ft as ne,it as re,vt as ie}from"./angular-preview-Bvv51cL-.js";import{B as ae,M as oe,T as se,V as o,w as ce}from"./ProgressIndicator-CXNTCbma.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{i as le,n as c}from"./context-ESLv39g4.js";import{t as ue}from"./dataAttributes-CDHeJa9q.js";import{i as l,r as de}from"./CodeBlock-CuxMOUBV.js";import{n as u,t as fe}from"./Input-CczNyxGC.js";import{n as pe,t as me}from"./Tag-CfzvQMS_.js";import{a as he,r as d}from"./FormControl-Ftl_hIhJ.js";import{n as f,t as p}from"./tagInput.module.scss-DOr9Jhgr.js";import{l as m,n as h,t as ge,u as _e}from"./DocPage-B93OiV4a.js";var g,_,v,y,ve,b;function x(){return(x=e((()=>{a(),o(),se(),i(),r(),c(),l(),u(),pe(),p(),g=t(),_=n(),v=[],y=`Enter`,ve=[`\r
`,`
`,`\r`],b=({value:e,defaultValue:t,onChange:n,options:r=v,commitOnBlur:i=!0,separators:a=ne,id:se,name:o,placeholder:c,"aria-label":l,"aria-labelledby":u,"aria-describedby":pe,disabled:he,readOnly:d,invalid:p,size:m=`medium`,emptyText:h,addLabel:ge,clearLabel:_e,removeLabel:b,createLabel:x,className:S,style:C,ref:w,...T})=>{let{t:E}=ae(),D=le(),O=!!(he||D?.disabled),k=!!(d||D?.readOnly),A=O||k,j=(0,g.useRef)(null),M=te(j,w),N=(0,g.useRef)(!1),P=(0,g.useRef)(!1),F=(0,g.useId)(),[I,L]=ee({value:e,defaultValue:t??v,onChange:n,name:`TagInput`}),[R,z]=(0,g.useState)(``),[B,V]=(0,g.useState)(!1),[H,U]=(0,g.useState)(0),W=B&&!A,G=R.trim(),ye=[...new Set(r.map(e=>e.trim()).filter(Boolean))].filter(e=>!I.includes(e)),K=ye.map(e=>({tag:e,label:e,filterValue:e}));G&&!I.includes(G)&&!ye.includes(G)&&K.unshift({tag:G,label:x?x(G):E(`tagInput.create`,{tag:G}),filterValue:G});let be=G.toLowerCase(),q=be?K.filter(e=>e.filterValue.toLowerCase().includes(be)):K,J=`${q.length}\u0000${R}`,[xe,Se]=(0,g.useState)(J);xe!==J&&(Se(J),U(0));let Y=a.includes(y),X=a.filter(e=>e!==y&&e!==``),Ce=Y?[...X,...ve]:X,Z=(e,t=``)=>{if(A||N.current)return;let n=[...I];for(let t of e){let e=t.trim();e&&!n.includes(e)&&n.push(e)}n.length!==I.length&&L(n),P.current=!1,z(t)},Q=e=>Z([e]),we=e=>{if(A||N.current)return;let t=e.clipboardData.getData(`text`);if(!Ce.some(e=>t.includes(e)))return;e.preventDefault();let n=e.currentTarget,r=n.selectionStart??R.length,i=n.selectionEnd??R.length,ee=R.slice(0,r)+t+R.slice(i);Z(ie(ee,Ce)),V(!1)},$=e=>{Q(e.tag),V(!1)},Te=e=>{if(A||N.current||e.nativeEvent.isComposing||e.keyCode===229)return;let t=q.length;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),P.current=!0,V(!0),t>0){let n=e.key===`ArrowDown`?1:-1;U(e=>(e+n+t)%t)}break;case`Enter`:e.preventDefault(),Y?!P.current&&(!G||I.includes(G))?Q(R):W&&q[H]?$(q[H]):(Q(R),V(!1)):P.current&&W&&q[H]&&$(q[H]);break;case`Escape`:P.current=!1,z(``),W&&(e.preventDefault(),V(!1));break;case`Backspace`:R===``&&I.length>0&&(e.preventDefault(),L(I.slice(0,-1)))}},Ee=e=>b?b(e):E(`tagInput.remove`,{tag:e}),De=W?q[H]:void 0,Oe=e=>`${F}-option-${e}`;return(0,_.jsxs)(`div`,{...ue(T),className:re(f.root,S),style:C,...s(`tag-input`,`root`,{state:W?`open`:`closed`,disabled:O,invalid:p||!!D?.invalid,readonly:k,required:!!D?.required,size:m}),children:[I.length>0&&(0,_.jsx)(`div`,{className:f.values,...s(`tag-input`,`tags`),children:I.map((e,t)=>(0,_.jsx)(me,{className:f.tag,size:`large`,disabled:O,closable:!k,closeLabel:Ee(e),onClose:()=>{A||(L(I.filter((e,n)=>n!==t)),j.current?.focus())},children:(0,_.jsx)(`span`,{className:f.label,children:e})},`${t}-${e}`))}),(0,_.jsxs)(`div`,{className:f.entry,children:[(0,_.jsxs)(`div`,{className:f.combobox,children:[(0,_.jsx)(fe,{ref:M,id:se,size:m,invalid:p,type:`text`,role:`combobox`,"aria-label":l,"aria-labelledby":u,"aria-describedby":pe,"aria-expanded":W,"aria-controls":W?F:void 0,"aria-autocomplete":`list`,"aria-activedescendant":De?Oe(H):void 0,autoComplete:`off`,spellCheck:!1,placeholder:c,value:R,disabled:O,readOnly:k,onChange:e=>{if(A)return;P.current=!1;let t=e.target.value,n=N.current||X.length===0?[t]:ie(t,X);n.length>1?Z(n.slice(0,-1),n[n.length-1]):z(t),V(!0)},onFocus:()=>{A||V(!0)},onClick:()=>{A||V(!0)},onBlur:()=>{V(!1),i&&Q(R)},onCompositionStart:()=>{N.current=!0},onCompositionEnd:()=>{N.current=!1},onKeyDown:Te,onPaste:we}),W&&(0,_.jsxs)(`ul`,{id:F,role:`listbox`,"aria-label":l,"aria-labelledby":u,className:f.list,...s(`tag-input`,`list`),children:[q.length===0&&(0,_.jsx)(`li`,{className:f.empty,role:`presentation`,...s(`tag-input`,`empty`),children:h??E(`tagInput.empty`)}),q.map((e,t)=>(0,_.jsx)(`li`,{id:Oe(t),role:`option`,"aria-selected":t===H,tabIndex:-1,className:f.option,onMouseDown:t=>{t.preventDefault(),$(e)},onMouseEnter:()=>U(t),...s(`tag-input`,`option`,{highlighted:t===H}),children:e.label},`${e.label}-${e.tag}`))]})]}),!k&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(de,{type:`button`,label:ge??E(`tagInput.add`),shape:`square`,icon:(0,_.jsx)(oe,{"aria-hidden":!0}),disabled:O||!G||I.includes(G),onMouseDown:e=>e.preventDefault(),onClick:()=>{Q(R),j.current?.focus()}}),(0,_.jsx)(de,{type:`button`,label:_e??E(`tagInput.clear`),shape:`square`,icon:(0,_.jsx)(ce,{"aria-hidden":!0}),disabled:O||I.length===0,onMouseDown:e=>e.preventDefault(),onClick:()=>{z(``),L([]),j.current?.focus()}})]})]}),o&&I.map((e,t)=>(0,_.jsx)(`input`,{type:`hidden`,name:o,value:e,disabled:O},`${t}-${e}`))]})}})))()}function S(){let[e,t]=(0,C.useState)([`React`]);return(0,w.jsx)(b,{"aria-label":`Tags`,placeholder:`Type a tag and press Enter`,value:e,onChange:t,options:[`React`,`Vue`,`Svelte`,`Solid`]})}var C,w;function T(){return(T=e((()=>{x(),C=t(),w=n()})))()}function E(){return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(d,{label:`Article tags`,helperText:`Submitted as repeated tags fields.`,children:(0,D.jsx)(b,{name:`tags`,defaultValue:[`news`,`tech`],size:`small`})}),(0,D.jsx)(d,{label:`Read-only tags`,readOnly:!0,children:(0,D.jsx)(b,{defaultValue:[`archived`]})})]})}var D;function O(){return(O=e((()=>{he(),x(),D=n()})))()}function k(){let[e,t]=(0,A.useState)([`alice@example.com`]);return(0,j.jsx)(b,{"aria-label":`Recipients`,placeholder:`Type or paste "a; b, c"`,value:e,onChange:t,separators:[`,`,`;`,`Enter`]})}var A,j;function M(){return(M=e((()=>{x(),A=t(),j=n()})))()}var N;function P(){return(P=e((()=>{N=`import { TagInput } from "minerva-design";
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
`})))()}var z,B,V;function H(){return(H=e((()=>{T(),O(),M(),P(),I(),R(),t(),h(),_e(),z=n(),B=m(Object.assign({"./demos/basic.tsx":S,"./demos/form-control.tsx":E,"./demos/separators.tsx":k}),Object.assign({"./demos/basic.tsx":N,"./demos/form-control.tsx":F,"./demos/separators.tsx":L})),V=()=>(0,z.jsx)(ge,{id:`tag-input`,demos:B})})))()}H();export{V as default};