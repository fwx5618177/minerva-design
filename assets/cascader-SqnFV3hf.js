import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{Mn as a,_t as o,er as ee,fn as te,on as s}from"./angular-preview-CSWPEDZG.js";import{B as c,T as l,V as u,g as ne,j as re,w as ie}from"./ProgressIndicator-CQZAxIX3.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{i as ae,n as f,r as oe,t as se}from"./context-ESLv39g4.js";import{$ as p,Q as m,St as ce,Tt as le,Z as h,wt as g,xt as ue}from"./io5-BR_mMpVE.js";import{t as de}from"./dataAttributes-CDHeJa9q.js";import{n as fe,t as pe}from"./Input-Dtg6tHnj.js";import{n as _,t as me}from"./cascader.module.scss-DF2RyuIq.js";import{i as he,r as ge}from"./DemoBlock-BXdX6oLT.js";import{l as _e,n as ve,t as v,u as y}from"./DocPage-CHJwIegD.js";import{c as ye,g as be,u as xe}from"./fa-BvFqnURM.js";var b,x,S,Se;function Ce(){return(Ce=e((()=>{a(),u(),l(),p(),me(),b=t(),x=n(),S=`[role="option"]:not([aria-disabled="true"])`,Se=({label:e,options:t,expandedPath:n,selectedPath:r,expandTrigger:i=`click`,maxLevel:a=6,optionRender:ee,optionStyle:te,autoFocus:l=!1,onActivate:u,onHoverExpand:re,onExit:ie})=>{let{t:ae}=c(),f=(0,b.useRef)(null),oe=(0,b.useId)(),se=e=>`${oe}-column-${e}`,p=(0,b.useRef)(l?-1:null),m=[t];for(let e=0;e<n.length&&e<a-1;e+=1){let t=n[e].children;if(!t?.length)break;m.push(t)}let ce=e=>f.current?.querySelector(`[data-level="${e}"]`),le=e=>{let t=ce(e);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(S);return n?.focus(),!!n};(0,b.useEffect)(()=>{let e=p.current;if(e===null)return;let t=e===-1?m.length-1:e;le(t)&&(p.current=null)});let h=(e,t)=>[...n.slice(0,t),e],g=(e,t)=>t<a-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0),ue=(e,t,n)=>{let r=Array.from(e.currentTarget.parentElement?.querySelectorAll(S)??[]),i=r.indexOf(e.currentTarget),a=e=>r[(e+r.length)%r.length]?.focus();switch(o(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),a(i+1);break;case`ArrowUp`:e.preventDefault(),a(i-1);break;case`Home`:e.preventDefault(),a(0);break;case`End`:e.preventDefault(),a(r.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!g(t,n))break;p.current=n+1,u(h(t,n),n);break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;g(t,n)&&(p.current=n+1),u(h(t,n),n);break;case`ArrowLeft`:e.preventDefault(),n===0?ie?.():le(n-1)}};return(0,x.jsx)(`div`,{className:_.panel,ref:f,children:m.map((t,o)=>(0,x.jsx)(`ul`,{id:se(o),"data-level":o,className:_.column,...d(`cascader`,`column`),role:`listbox`,"aria-label":ae(`cascader.level`,{label:e??ae(`cascader.options`),level:o+1}),children:t.map(e=>{let t=n[o]?.value===e.value,c=r[o]?.value===e.value,l=c&&o===r.length-1,ie=g(e,o)&&!(!e.children?.length&&e.isLeaf);return(0,x.jsx)(`li`,{className:s(_.option,{[_.active]:t||c,[_.disabled]:e.disabled,[_.loading]:e.loading}),style:te,...d(`cascader`,`item`,{selected:c,expanded:t&&!l,disabled:e.disabled,loading:e.loading}),role:`option`,"aria-selected":c,"aria-disabled":e.disabled||void 0,"aria-busy":e.loading||void 0,"aria-controls":t&&o+1<m.length?se(o+1):void 0,tabIndex:e.disabled?-1:0,onKeyDown:t=>ue(t,e,o),onClick:()=>{e.disabled||u(h(e,o),o)},onMouseEnter:()=>{i===`hover`&&!e.disabled&&e.children?.length&&o<a-1&&re?.(h(e,o))},children:ee?ee(e,o):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`span`,{className:_.label,children:e.label}),e.loading?(0,x.jsx)(`span`,{className:_.loadingIndicator,"aria-hidden":!0,children:`...`}):ie&&(0,x.jsx)(ne,{className:_.expandIcon,"aria-hidden":!0})]})},e.value)})},o))})}})))()}var C,w,we,Te,T;function E(){return(E=e((()=>{a(),u(),l(),g(),ce(),f(),m(),pe(),me(),Ce(),C=t(),w=n(),we=[],Te=[],T=({ref:e,label:t,name:n,options:r=we,value:i,defaultValue:a,onChange:o,displayRender:l,disabled:u,readOnly:ne,required:f,invalid:p,id:m,"aria-label":ce,"aria-labelledby":g,"aria-describedby":pe,style:me,placeholder:he,allowClear:ge=!0,expandTrigger:_e=`click`,className:ve,showSearch:v=!1,filter:y,loadData:ye,dropdownClassName:be,optionRender:xe,width:b=240,maxLevel:x=6,dropdownStyle:S,optionStyle:Ce,...T})=>{let{t:E}=c(),D=ae(),O=se({id:m,"aria-describedby":pe}),k=u??D?.disabled??!1,A=ne??D?.readOnly??!1,Ee=f??D?.required??!1,j=p??D?.invalid??!1,M=g??(D&&!ce?D.labelId:void 0),[N,P]=ue({value:i,defaultValue:a??Te,name:`Cascader`}),F=(0,C.useMemo)(()=>te(r,N),[r,N]),[I,L]=(0,C.useState)(!1),[R,De]=(0,C.useState)(!1),[z,B]=(0,C.useState)([]),Oe=(0,C.useMemo)(()=>te(r,z),[r,z]),[V,H]=(0,C.useState)(``),[U,ke]=(0,C.useState)(null),[W,Ae]=(0,C.useState)(null),je=le(Ae,e),G=(0,C.useRef)(null),K=v&&V!==``,q=(0,C.useMemo)(()=>{if(!K)return[];let e=V.toLowerCase();return ee(r).filter(({path:t})=>y?y(V,t):t.some(t=>String(t.label).toLowerCase().includes(e)))},[K,V,r,y]),J=(e=!1)=>{k||A||(B(N),De(e),L(!0))},Y=(e=!1)=>{L(!1),H(``),e&&W?.focus()},X=e=>{let t=e.map(e=>e.value);P(t),o?.(t,e),Y(!0)},Me=(e,t)=>{let n=e[e.length-1];if(n.disabled)return;let r=t>=x-1,i=!!n.children?.length,a=!!ye&&!n.isLeaf&&!n.children;if(!r&&(i||a)){B(e.map(e=>e.value)),a&&!n.loading&&ye?.(e);return}X(e)},Ne=()=>{P(Te),o?.([],[]),H(``),W?.focus()};(0,C.useEffect)(()=>{W&&(W.setAttribute(`role`,`combobox`),W.setAttribute(`aria-haspopup`,`listbox`),W.setAttribute(`aria-expanded`,String(I)),v&&W.setAttribute(`aria-autocomplete`,`list`))},[W,I,v]);let Z=e=>{let t=e.relatedTarget;I&&t&&(U?.contains(t)||G.current?.contains(t)||Y())},Pe=()=>G.current?.querySelector(`[role="option"]`)?.focus(),Fe=e=>{switch(e.key){case`ArrowDown`:e.preventDefault(),I?K?Pe():De(!0):J(!0);break;case`Enter`:e.preventDefault(),I||J(!0);break;case` `:if(v)break;e.preventDefault(),I||J(!0)}},Q=F.map(e=>String(e.label)),Ie=K?V:l?l(Q,F):Q.join(` / `),Le=()=>(0,w.jsx)(`div`,{className:_.searchResults,role:`listbox`,"aria-label":t,tabIndex:-1,onKeyDown:e=>{let t=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)),n=t.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),t[(n+(e.key===`ArrowDown`?1:-1)+t.length)%t.length]?.focus())},children:q.length>0?q.map(({path:e})=>(0,w.jsx)(`div`,{className:_.searchOption,...d(`cascader`,`item`),role:`option`,"aria-selected":!1,tabIndex:0,onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),X(e))},onClick:()=>X(e),children:e.map(e=>e.label).join(` / `)},e.map(e=>e.value).join(`/`))):(0,w.jsx)(`div`,{className:_.empty,role:`status`,children:E(`cascader.noResults`)})}),Re=(0,w.jsx)(h,{ref:G,open:I,anchor:U,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[U],onDismiss:()=>Y(),returnFocusOnEscape:()=>W,focusable:!0,className:s(_.dropdown,be),style:S,onMouseDown:e=>{e.target.closest(`[role="option"]`)||e.preventDefault()},onBlur:Z,onKeyDown:e=>{e.key===`Tab`&&Y()},...d(`cascader`,`content`,{state:`open`}),children:K?Le():(0,w.jsx)(Se,{label:t,options:r,expandedPath:Oe,selectedPath:F,expandTrigger:_e,maxLevel:x,optionStyle:Ce,optionRender:xe,autoFocus:R,onActivate:Me,onHoverExpand:e=>B(e.map(e=>e.value)),onExit:()=>Y(!0)},R?`keyboard`:`pointer`)});return(0,w.jsxs)(`div`,{...de(T),className:s(_.cascader,ve),ref:ke,style:{width:b,...me},onBlur:Z,...d(`cascader`,`root`,{state:I?`open`:`closed`,disabled:k,readonly:A,invalid:j}),children:[(0,w.jsxs)(`div`,{className:s(_.selector,{[_.disabled]:k,[_.focused]:I}),onClick:()=>{k||A||(I?v||Y():J())},...d(`cascader`,`control`),children:[(0,w.jsx)(oe.Provider,{value:null,children:(0,w.jsx)(fe,{ref:je,variant:`unstyled`,id:O.id,"aria-label":ce??t,"aria-labelledby":M,"aria-describedby":O[`aria-describedby`],"aria-invalid":j||void 0,"aria-required":Ee||void 0,"aria-readonly":v&&A||void 0,required:Ee,name:n,value:Ie,readOnly:!v||A,disabled:k,placeholder:he??E(`cascader.placeholder`),className:_.input,onChange:e=>{v&&!A&&(H(e.target.value),I||J())},onKeyDown:Fe})}),ge&&N.length>0&&!k&&!A&&(0,w.jsx)(`button`,{type:`button`,className:_.clearIcon,"aria-label":E(`cascader.clear`),...d(`cascader`,`clear-button`),onClick:e=>{e.stopPropagation(),Ne()},children:(0,w.jsx)(ie,{className:_.icon,"aria-hidden":!0,focusable:!1})}),(0,w.jsx)(`span`,{className:s(_.arrow,I&&_.open),"aria-hidden":`true`,...d(`cascader`,`icon`),children:(0,w.jsx)(re,{className:_.icon})})]}),Re]})}})))()}function D(){return(0,O.jsx)(T,{name:`city`,label:`City`,options:k})}var O,k;function A(){return(A=e((()=>{E(),O=n(),k=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Ee(){let[e,t]=(0,j.useState)([`fr`,`idf`,`paris`]);return(0,M.jsxs)(`div`,{children:[(0,M.jsx)(T,{name:`city-controlled`,label:`City`,options:N,value:e,onChange:e=>t(e),width:300}),(0,M.jsxs)(`p`,{children:[`Value: `,e.length?JSON.stringify(e):`(empty)`]})]})}var j,M,N;function P(){return(P=e((()=>{j=t(),E(),M=n(),N=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function F(){return(0,I.jsx)(T,{name:`region`,label:`Region (2 levels)`,options:L,maxLevel:2,optionRender:(e,t)=>(0,I.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[t===0?(0,I.jsx)(ye,{}):(0,I.jsx)(xe,{}),e.label]}),dropdownStyle:{minWidth:360},optionStyle:{fontWeight:500}})}var I,L;function R(){return(R=e((()=>{E(),be(),I=n(),L=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function De(){return(0,z.jsx)(T,{name:`city-default`,label:`City`,options:B,defaultValue:[`jp`,`kansai`,`kyoto`],width:300})}var z,B;function Oe(){return(Oe=e((()=>{E(),z=n(),B=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function V(){return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(T,{name:`location`,label:`Location`,options:U}),(0,H.jsx)(T,{name:`location-disabled`,label:`Disabled`,options:U,defaultValue:[`a`,`a1`],disabled:!0})]})}var H,U;function ke(){return(ke=e((()=>{E(),H=n(),U=[{value:`a`,label:`Warehouse A`,children:[{value:`a1`,label:`Shelf 1`},{value:`a2`,label:`Shelf 2 (full)`,disabled:!0}]},{value:`b`,label:`Warehouse B (closed)`,disabled:!0}]})))()}function W(){return(0,Ae.jsx)(T,{name:`city-display`,label:`City (last level only)`,options:je,defaultValue:[`fr`,`ara`,`lyon`],displayRender:e=>e[e.length-1]??``,allowClear:!1})}var Ae,je;function G(){return(G=e((()=>{E(),Ae=n(),je=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function K(){return(0,q.jsx)(T,{name:`city-hover`,label:`City`,options:J,expandTrigger:`hover`})}var q,J;function Y(){return(Y=e((()=>{E(),q=n(),J=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function X(){let[e,t]=(0,Me.useState)(Z);return(0,Ne.jsx)(T,{name:`team`,label:`Team`,options:e,loadData:e=>{let n=e[e.length-1],r=e=>t(t=>t.map(t=>t.value===n.value?{...t,...e}:t));r({loading:!0}),setTimeout(()=>{r({loading:!1,children:[{value:`${n.value}-team-a`,label:`${n.label} team A`,isLeaf:!0},{value:`${n.value}-team-b`,label:`${n.label} team B`,isLeaf:!0}]})},800)},width:300})}var Me,Ne,Z;function Pe(){return(Pe=e((()=>{Me=t(),E(),Ne=n(),Z=[{value:`frontend`,label:`Frontend`},{value:`backend`,label:`Backend`},{value:`docs`,label:`Documentation`,isLeaf:!0}]})))()}function Fe(){return(0,Q.jsx)(T,{name:`city-search`,label:`City`,placeholder:`Type to search`,options:Ie,showSearch:!0,filter:(e,t)=>t.some(t=>String(t.label).toLowerCase().includes(e.toLowerCase())),width:300})}var Q,Ie;function Le(){return(Le=e((()=>{E(),Q=n(),Ie=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function BasicDemo() {
  return <Cascader name="city" label="City" options={options} />;
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useState } from "react";
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function ControlledDemo() {
  const [value, setValue] = useState<(string | number)[]>([
    "fr",
    "idf",
    "paris",
  ]);

  return (
    <div>
      <Cascader
        name="city-controlled"
        label="City"
        options={options}
        value={value}
        onChange={(next) => setValue(next)}
        width={300}
      />
      <p>Value: {value.length ? JSON.stringify(value) : "(empty)"}</p>
    </div>
  );
}
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { Cascader, type CascaderOption } from "minerva-design";
import { FaGlobeEurope, FaMapMarkerAlt } from "react-icons/fa";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function CustomOptionDemo() {
  return (
    <Cascader
      name="region"
      label="Region (2 levels)"
      options={options}
      maxLevel={2}
      optionRender={(option, level) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {level === 0 ? <FaGlobeEurope /> : <FaMapMarkerAlt />}
          {option.label}
        </span>
      )}
      dropdownStyle={{ minWidth: 360 }}
      optionStyle={{ fontWeight: 500 }}
    />
  );
}
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function DefaultValueDemo() {
  return (
    <Cascader
      name="city-default"
      label="City"
      options={options}
      defaultValue={["jp", "kansai", "kyoto"]}
      width={300}
    />
  );
}
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "a",
    label: "Warehouse A",
    children: [
      { value: "a1", label: "Shelf 1" },
      { value: "a2", label: "Shelf 2 (full)", disabled: true },
    ],
  },
  { value: "b", label: "Warehouse B (closed)", disabled: true },
];

export default function DisabledDemo() {
  return (
    <>
      <Cascader name="location" label="Location" options={options} />
      <Cascader
        name="location-disabled"
        label="Disabled"
        options={options}
        defaultValue={["a", "a1"]}
        disabled
      />
    </>
  );
}
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function DisplayRenderDemo() {
  return (
    <Cascader
      name="city-display"
      label="City (last level only)"
      options={options}
      defaultValue={["fr", "ara", "lyon"]}
      displayRender={(labels) => labels[labels.length - 1] ?? ""}
      allowClear={false}
    />
  );
}
`})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function HoverDemo() {
  return (
    <Cascader
      name="city-hover"
      label="City"
      options={options}
      expandTrigger="hover"
    />
  );
}
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useState } from "react";
import { Cascader, type CascaderOption } from "minerva-design";

const initialOptions: CascaderOption[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "docs", label: "Documentation", isLeaf: true },
];

export default function LazyLoadDemo() {
  const [options, setOptions] = useState(initialOptions);

  const loadData = (path: CascaderOption[]) => {
    const target = path[path.length - 1];
    const update = (patch: Partial<CascaderOption>) =>
      setOptions((prev) =>
        prev.map((option) =>
          option.value === target.value ? { ...option, ...patch } : option,
        ),
      );

    update({ loading: true });
    // Simulate a request
    setTimeout(() => {
      update({
        loading: false,
        // isLeaf: true marks the loaded options as selectable leaves;
        // without it, clicking them would call loadData again
        children: [
          {
            value: \`\${target.value}-team-a\`,
            label: \`\${target.label} team A\`,
            isLeaf: true,
          },
          {
            value: \`\${target.value}-team-b\`,
            label: \`\${target.label} team B\`,
            isLeaf: true,
          },
        ],
      });
    }, 800);
  };

  return (
    <Cascader
      name="team"
      label="Team"
      options={options}
      loadData={loadData}
      width={300}
    />
  );
}
`})))()}var et;function tt(){return(tt=e((()=>{et=`import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function SearchDemo() {
  return (
    <Cascader
      name="city-search"
      label="City"
      placeholder="Type to search"
      options={options}
      showSearch
      filter={(input, path) =>
        path.some((option) =>
          String(option.label).toLowerCase().includes(input.toLowerCase()),
        )
      }
      width={300}
    />
  );
}
`})))()}var $,nt,rt;function it(){return(it=e((()=>{A(),P(),R(),Oe(),ke(),G(),Y(),Pe(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),t(),i(),ve(),y(),he(),$=n(),nt=_e(Object.assign({"./demos/basic.tsx":D,"./demos/controlled.tsx":Ee,"./demos/custom-option.tsx":F,"./demos/default-value.tsx":De,"./demos/disabled.tsx":V,"./demos/display-render.tsx":W,"./demos/hover.tsx":K,"./demos/lazy-load.tsx":X,"./demos/search.tsx":Fe}),Object.assign({"./demos/basic.tsx":Re,"./demos/controlled.tsx":Be,"./demos/custom-option.tsx":He,"./demos/default-value.tsx":We,"./demos/disabled.tsx":Ke,"./demos/display-render.tsx":Je,"./demos/hover.tsx":Xe,"./demos/lazy-load.tsx":Qe,"./demos/search.tsx":et})),rt=()=>{let{t:e}=r();return(0,$.jsx)(v,{id:`cascader`,demos:nt,children:(0,$.jsxs)(`section`,{className:ge.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.cascader.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:ge.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.expand`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.aria`)})]})]})})}})))()}it();export{rt as default};