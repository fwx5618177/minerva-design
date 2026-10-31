import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{At as ee,It as r,Mt as te,ut as ne}from"./angular-preview-l4x8c_2r.js";import{B as re,M as ie,T as i,V as a,w as ae}from"./ProgressIndicator-BMZ0rR7D.js";import{t as o}from"./stylingHooks-PqiNJdev.js";import{i as oe,n as se}from"./context-ESLv39g4.js";import{St as s,Tt as ce,wt as c,xt as le}from"./io5-DWV9qlxB.js";import{t as ue}from"./dataAttributes-CDHeJa9q.js";import{i as l,r as u}from"./CodeBlock-D5dsgj-R.js";import{n as de,t as d}from"./Input-LfOOMgLE.js";import{n as fe,t as pe}from"./Tag-D6SUzaZT.js";import{a as me,r as f}from"./FormControl-4On8EIM5.js";import{n as p,t as m}from"./tagInput.module.scss-DOr9Jhgr.js";import{l as h,n as he,t as ge,u as _e}from"./DocPage-BbPSunu1.js";var g,_,v,y,ve,b;function x(){return(x=e((()=>{r(),a(),i(),c(),s(),se(),l(),d(),fe(),m(),g=t(),_=n(),v=[],y=`Enter`,ve=[`\r
`,`
`,`\r`],b=({value:e,defaultValue:t,onChange:n,options:r=v,commitOnBlur:i=!0,separators:a=te,id:se,name:s,placeholder:c,"aria-label":l,"aria-labelledby":d,"aria-describedby":fe,disabled:me,readOnly:f,invalid:m,size:h=`medium`,emptyText:he,addLabel:ge,clearLabel:_e,removeLabel:b,createLabel:x,className:ye,style:S,ref:C,...w})=>{let{t:T}=re(),E=oe(),D=!!(me||E?.disabled),O=!!(f||E?.readOnly),k=D||O,A=(0,g.useRef)(null),j=ce(A,C),M=(0,g.useRef)(!1),N=(0,g.useRef)(!1),P=(0,g.useId)(),[F,I]=le({value:e,defaultValue:t??v,onChange:n,name:`TagInput`}),[L,R]=(0,g.useState)(``),[z,B]=(0,g.useState)(!1),[V,H]=(0,g.useState)(0),U=z&&!k,W=L.trim(),be=[...new Set(r.map(e=>e.trim()).filter(Boolean))].filter(e=>!F.includes(e)),G=be.map(e=>({tag:e,label:e,filterValue:e}));W&&!F.includes(W)&&!be.includes(W)&&G.unshift({tag:W,label:x?x(W):T(`tagInput.create`,{tag:W}),filterValue:W});let xe=W.toLowerCase(),K=xe?G.filter(e=>e.filterValue.toLowerCase().includes(xe)):G,q=`${K.length}\u0000${L}`,[Se,Ce]=(0,g.useState)(q);Se!==q&&(Ce(q),H(0));let J=a.includes(y),Y=a.filter(e=>e!==y&&e!==``),we=J?[...Y,...ve]:Y,X=(e,t=``)=>{if(k||M.current)return;let n=[...F];for(let t of e){let e=t.trim();e&&!n.includes(e)&&n.push(e)}n.length!==F.length&&I(n),N.current=!1,R(t)},Z=e=>X([e]),Te=e=>{if(k||M.current)return;let t=e.clipboardData.getData(`text`);if(!we.some(e=>t.includes(e)))return;e.preventDefault();let n=e.currentTarget,r=n.selectionStart??L.length,te=n.selectionEnd??L.length,ne=L.slice(0,r)+t+L.slice(te);X(ee(ne,we)),B(!1)},Q=e=>{Z(e.tag),B(!1)},Ee=e=>{if(k||M.current||e.nativeEvent.isComposing||e.keyCode===229)return;let t=K.length;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),N.current=!0,B(!0),t>0){let n=e.key===`ArrowDown`?1:-1;H(e=>(e+n+t)%t)}break;case`Enter`:e.preventDefault(),J?!N.current&&(!W||F.includes(W))?Z(L):U&&K[V]?Q(K[V]):(Z(L),B(!1)):N.current&&U&&K[V]&&Q(K[V]);break;case`Escape`:N.current=!1,R(``),U&&(e.preventDefault(),B(!1));break;case`Backspace`:L===``&&F.length>0&&(e.preventDefault(),I(F.slice(0,-1)))}},De=e=>b?b(e):T(`tagInput.remove`,{tag:e}),Oe=U?K[V]:void 0,$=e=>`${P}-option-${e}`;return(0,_.jsxs)(`div`,{...ue(w),className:ne(p.root,ye),style:S,...o(`tag-input`,`root`,{state:U?`open`:`closed`,disabled:D,invalid:m||!!E?.invalid,readonly:O,required:!!E?.required,size:h}),children:[F.length>0&&(0,_.jsx)(`div`,{className:p.values,...o(`tag-input`,`tags`),children:F.map((e,t)=>(0,_.jsx)(pe,{className:p.tag,size:`large`,disabled:D,closable:!O,closeLabel:De(e),onClose:()=>{k||(I(F.filter((e,n)=>n!==t)),A.current?.focus())},children:(0,_.jsx)(`span`,{className:p.label,children:e})},`${t}-${e}`))}),(0,_.jsxs)(`div`,{className:p.entry,children:[(0,_.jsxs)(`div`,{className:p.combobox,children:[(0,_.jsx)(de,{ref:j,id:se,size:h,invalid:m,type:`text`,role:`combobox`,"aria-label":l,"aria-labelledby":d,"aria-describedby":fe,"aria-expanded":U,"aria-controls":U?P:void 0,"aria-autocomplete":`list`,"aria-activedescendant":Oe?$(V):void 0,autoComplete:`off`,spellCheck:!1,placeholder:c,value:L,disabled:D,readOnly:O,onChange:e=>{if(k)return;N.current=!1;let t=e.target.value,n=M.current||Y.length===0?[t]:ee(t,Y);n.length>1?X(n.slice(0,-1),n[n.length-1]):R(t),B(!0)},onFocus:()=>{k||B(!0)},onClick:()=>{k||B(!0)},onBlur:()=>{B(!1),i&&Z(L)},onCompositionStart:()=>{M.current=!0},onCompositionEnd:()=>{M.current=!1},onKeyDown:Ee,onPaste:Te}),U&&(0,_.jsxs)(`ul`,{id:P,role:`listbox`,"aria-label":l,"aria-labelledby":d,className:p.list,...o(`tag-input`,`list`),children:[K.length===0&&(0,_.jsx)(`li`,{className:p.empty,role:`presentation`,...o(`tag-input`,`empty`),children:he??T(`tagInput.empty`)}),K.map((e,t)=>(0,_.jsx)(`li`,{id:$(t),role:`option`,"aria-selected":t===V,tabIndex:-1,className:p.option,onMouseDown:t=>{t.preventDefault(),Q(e)},onMouseEnter:()=>H(t),...o(`tag-input`,`option`,{highlighted:t===V}),children:e.label},`${e.label}-${e.tag}`))]})]}),!O&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(u,{type:`button`,label:ge??T(`tagInput.add`),shape:`square`,icon:(0,_.jsx)(ie,{"aria-hidden":!0}),disabled:D||!W||F.includes(W),onMouseDown:e=>e.preventDefault(),onClick:()=>{Z(L),A.current?.focus()}}),(0,_.jsx)(u,{type:`button`,label:_e??T(`tagInput.clear`),shape:`square`,icon:(0,_.jsx)(ae,{"aria-hidden":!0}),disabled:D||F.length===0,onMouseDown:e=>e.preventDefault(),onClick:()=>{R(``),I([]),A.current?.focus()}})]})]}),s&&F.map((e,t)=>(0,_.jsx)(`input`,{type:`hidden`,name:s,value:e,disabled:D},`${t}-${e}`))]})}})))()}function ye(){let[e,t]=(0,S.useState)([`React`]);return(0,C.jsx)(b,{"aria-label":`Tags`,placeholder:`Type a tag and press Enter`,value:e,onChange:t,options:[`React`,`Vue`,`Svelte`,`Solid`]})}var S,C;function w(){return(w=e((()=>{x(),S=t(),C=n()})))()}function T(){return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(f,{label:`Article tags`,helperText:`Submitted as repeated tags fields.`,children:(0,E.jsx)(b,{name:`tags`,defaultValue:[`news`,`tech`],size:`small`})}),(0,E.jsx)(f,{label:`Read-only tags`,readOnly:!0,children:(0,E.jsx)(b,{defaultValue:[`archived`]})})]})}var E;function D(){return(D=e((()=>{me(),x(),E=n()})))()}function O(){let[e,t]=(0,k.useState)([`alice@example.com`]);return(0,A.jsx)(b,{"aria-label":`Recipients`,placeholder:`Type or paste "a; b, c"`,value:e,onChange:t,separators:[`,`,`;`,`Enter`]})}var k,A;function j(){return(j=e((()=>{x(),k=t(),A=n()})))()}var M;function N(){return(N=e((()=>{M=`import { TagInput } from "minerva-design";
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
`})))()}var P;function F(){return(F=e((()=>{P=`import { FormField, TagInput } from "minerva-design";

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
`})))()}var I;function L(){return(L=e((()=>{I=`import { TagInput } from "minerva-design";
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
`})))()}var R,z,B;function V(){return(V=e((()=>{w(),D(),j(),N(),F(),L(),t(),he(),_e(),R=n(),z=h(Object.assign({"./demos/basic.tsx":ye,"./demos/form-control.tsx":T,"./demos/separators.tsx":O}),Object.assign({"./demos/basic.tsx":M,"./demos/form-control.tsx":P,"./demos/separators.tsx":I})),B=()=>(0,R.jsx)(ge,{id:`tag-input`,demos:z})})))()}V();export{B as default};