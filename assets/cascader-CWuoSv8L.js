import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{It as a,gt as o,in as ee,ut as s,x as c}from"./angular-preview-l4x8c_2r.js";import{B as l,T as u,V as d,g as te,j as ne,w as re}from"./ProgressIndicator-BMZ0rR7D.js";import{t as f}from"./stylingHooks-PqiNJdev.js";import{i as ie,n as p,r as ae,t as oe}from"./context-ESLv39g4.js";import{Ct as m,Q as h,X as se,Z as g,bt as _,wt as v,xt as ce}from"./io5-BlmswBy7.js";import{t as le}from"./dataAttributes-CDHeJa9q.js";import{n as ue,t as de}from"./Input-BNZ0fzl-.js";import{n as y,t as fe}from"./cascader.module.scss-DF2RyuIq.js";import{i as pe,r as me}from"./DemoBlock-C9SrrBKM.js";import{l as he,n as ge,t as b,u as x}from"./DocPage-JhXgs5p-.js";import{c as _e,g as ve,u as ye}from"./fa-BYHYWfxZ.js";var S,C,w,be;function xe(){return(xe=e((()=>{a(),d(),u(),h(),fe(),S=t(),C=n(),w=`[role="option"]:not([aria-disabled="true"])`,be=({label:e,options:t,expandedPath:n,selectedPath:r,expandTrigger:i=`click`,maxLevel:a=6,optionRender:o,optionStyle:ee,autoFocus:u=!1,onActivate:d,onHoverExpand:ne,onExit:re})=>{let{t:ie}=l(),p=(0,S.useRef)(null),ae=(0,S.useId)(),oe=e=>`${ae}-column-${e}`,m=(0,S.useRef)(u?-1:null),h=[t];for(let e=0;e<n.length&&e<a-1;e+=1){let t=n[e].children;if(!t?.length)break;h.push(t)}let se=e=>p.current?.querySelector(`[data-level="${e}"]`),g=e=>{let t=se(e);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(w);return n?.focus(),!!n};(0,S.useEffect)(()=>{let e=m.current;if(e===null)return;let t=e===-1?h.length-1:e;g(t)&&(m.current=null)});let _=(e,t)=>[...n.slice(0,t),e],v=(e,t)=>t<a-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0),ce=(e,t,n)=>{let r=Array.from(e.currentTarget.parentElement?.querySelectorAll(w)??[]),i=r.indexOf(e.currentTarget),a=e=>r[(e+r.length)%r.length]?.focus();switch(c(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),a(i+1);break;case`ArrowUp`:e.preventDefault(),a(i-1);break;case`Home`:e.preventDefault(),a(0);break;case`End`:e.preventDefault(),a(r.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!v(t,n))break;m.current=n+1,d(_(t,n),n);break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;v(t,n)&&(m.current=n+1),d(_(t,n),n);break;case`ArrowLeft`:e.preventDefault(),n===0?re?.():g(n-1)}};return(0,C.jsx)(`div`,{className:y.panel,ref:p,children:h.map((t,c)=>(0,C.jsx)(`ul`,{id:oe(c),"data-level":c,className:y.column,...f(`cascader`,`column`),role:`listbox`,"aria-label":ie(`cascader.level`,{label:e??ie(`cascader.options`),level:c+1}),children:t.map(e=>{let t=n[c]?.value===e.value,l=r[c]?.value===e.value,u=l&&c===r.length-1,re=v(e,c)&&!(!e.children?.length&&e.isLeaf);return(0,C.jsx)(`li`,{className:s(y.option,{[y.active]:t||l,[y.disabled]:e.disabled,[y.loading]:e.loading}),style:ee,...f(`cascader`,`item`,{selected:l,expanded:t&&!u,disabled:e.disabled,loading:e.loading}),role:`option`,"aria-selected":l,"aria-disabled":e.disabled||void 0,"aria-busy":e.loading||void 0,"aria-controls":t&&c+1<h.length?oe(c+1):void 0,tabIndex:e.disabled?-1:0,onKeyDown:t=>ce(t,e,c),onClick:()=>{e.disabled||d(_(e,c),c)},onMouseEnter:()=>{i===`hover`&&!e.disabled&&e.children?.length&&c<a-1&&ne?.(_(e,c))},children:o?o(e,c):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`span`,{className:y.label,children:e.label}),e.loading?(0,C.jsx)(`span`,{className:y.loadingIndicator,"aria-hidden":!0,children:`...`}):re&&(0,C.jsx)(te,{className:y.expandIcon,"aria-hidden":!0})]})},e.value)})},c))})}})))()}var T,E,Se,Ce,D;function O(){return(O=e((()=>{a(),d(),u(),m(),ce(),p(),g(),de(),fe(),xe(),T=t(),E=n(),Se=[],Ce=[],D=({ref:e,label:t,name:n,options:r=Se,value:i,defaultValue:a,onChange:c,displayRender:u,disabled:d,readOnly:te,required:p,invalid:m,id:h,"aria-label":g,"aria-labelledby":ce,"aria-describedby":de,style:fe,placeholder:pe,allowClear:me=!0,expandTrigger:he=`click`,className:ge,showSearch:b=!1,filter:x,loadData:_e,dropdownClassName:ve,optionRender:ye,width:S=240,maxLevel:C=6,dropdownStyle:w,optionStyle:xe,...D})=>{let{t:O}=l(),k=ie(),A=oe({id:h,"aria-describedby":de}),j=d??k?.disabled??!1,M=te??k?.readOnly??!1,we=p??k?.required??!1,N=m??k?.invalid??!1,P=ce??(k&&!g?k.labelId:void 0),[F,I]=_({value:i,defaultValue:a??Ce,name:`Cascader`}),L=(0,T.useMemo)(()=>o(r,F),[r,F]),[R,z]=(0,T.useState)(!1),[B,Te]=(0,T.useState)(!1),[V,H]=(0,T.useState)([]),Ee=(0,T.useMemo)(()=>o(r,V),[r,V]),[U,W]=(0,T.useState)(``),[G,De]=(0,T.useState)(null),[K,Oe]=(0,T.useState)(null),ke=v(Oe,e),q=(0,T.useRef)(null),J=b&&U!==``,Y=(0,T.useMemo)(()=>{if(!J)return[];let e=U.toLowerCase();return ee(r).filter(({path:t})=>x?x(U,t):t.some(t=>String(t.label).toLowerCase().includes(e)))},[J,U,r,x]),X=(e=!1)=>{j||M||(H(F),Te(e),z(!0))},Z=(e=!1)=>{z(!1),W(``),e&&K?.focus()},Q=e=>{let t=e.map(e=>e.value);I(t),c?.(t,e),Z(!0)},Ae=(e,t)=>{let n=e[e.length-1];if(n.disabled)return;let r=t>=C-1,i=!!n.children?.length,a=!!_e&&!n.isLeaf&&!n.children;if(!r&&(i||a)){H(e.map(e=>e.value)),a&&!n.loading&&_e?.(e);return}Q(e)},je=()=>{I(Ce),c?.([],[]),W(``),K?.focus()};(0,T.useEffect)(()=>{K&&(K.setAttribute(`role`,`combobox`),K.setAttribute(`aria-haspopup`,`listbox`),K.setAttribute(`aria-expanded`,String(R)),b&&K.setAttribute(`aria-autocomplete`,`list`))},[K,R,b]);let Me=e=>{let t=e.relatedTarget;R&&t&&(G?.contains(t)||q.current?.contains(t)||Z())},Ne=()=>q.current?.querySelector(`[role="option"]`)?.focus(),Pe=e=>{switch(e.key){case`ArrowDown`:e.preventDefault(),R?J?Ne():Te(!0):X(!0);break;case`Enter`:e.preventDefault(),R||X(!0);break;case` `:if(b)break;e.preventDefault(),R||X(!0)}},Fe=L.map(e=>String(e.label)),Ie=J?U:u?u(Fe,L):Fe.join(` / `),Le=()=>(0,E.jsx)(`div`,{className:y.searchResults,role:`listbox`,"aria-label":t,tabIndex:-1,onKeyDown:e=>{let t=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)),n=t.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),t[(n+(e.key===`ArrowDown`?1:-1)+t.length)%t.length]?.focus())},children:Y.length>0?Y.map(({path:e})=>(0,E.jsx)(`div`,{className:y.searchOption,...f(`cascader`,`item`),role:`option`,"aria-selected":!1,tabIndex:0,onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),Q(e))},onClick:()=>Q(e),children:e.map(e=>e.label).join(` / `)},e.map(e=>e.value).join(`/`))):(0,E.jsx)(`div`,{className:y.empty,role:`status`,children:O(`cascader.noResults`)})}),Re=(0,E.jsx)(se,{ref:q,open:R,anchor:G,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[G],onDismiss:()=>Z(),returnFocusOnEscape:()=>K,focusable:!0,className:s(y.dropdown,ve),style:w,onMouseDown:e=>{e.target.closest(`[role="option"]`)||e.preventDefault()},onBlur:Me,onKeyDown:e=>{e.key===`Tab`&&Z()},...f(`cascader`,`content`,{state:`open`}),children:J?Le():(0,E.jsx)(be,{label:t,options:r,expandedPath:Ee,selectedPath:L,expandTrigger:he,maxLevel:C,optionStyle:xe,optionRender:ye,autoFocus:B,onActivate:Ae,onHoverExpand:e=>H(e.map(e=>e.value)),onExit:()=>Z(!0)},B?`keyboard`:`pointer`)});return(0,E.jsxs)(`div`,{...le(D),className:s(y.cascader,ge),ref:De,style:{width:S,...fe},onBlur:Me,...f(`cascader`,`root`,{state:R?`open`:`closed`,disabled:j,readonly:M,invalid:N}),children:[(0,E.jsxs)(`div`,{className:s(y.selector,{[y.disabled]:j,[y.focused]:R}),onClick:()=>{j||M||(R?b||Z():X())},...f(`cascader`,`control`),children:[(0,E.jsx)(ae.Provider,{value:null,children:(0,E.jsx)(ue,{ref:ke,variant:`unstyled`,id:A.id,"aria-label":g??t,"aria-labelledby":P,"aria-describedby":A[`aria-describedby`],"aria-invalid":N||void 0,"aria-required":we||void 0,"aria-readonly":b&&M||void 0,required:we,name:n,value:Ie,readOnly:!b||M,disabled:j,placeholder:pe??O(`cascader.placeholder`),className:y.input,onChange:e=>{b&&!M&&(W(e.target.value),R||X())},onKeyDown:Pe})}),me&&F.length>0&&!j&&!M&&(0,E.jsx)(`button`,{type:`button`,className:y.clearIcon,"aria-label":O(`cascader.clear`),...f(`cascader`,`clear-button`),onClick:e=>{e.stopPropagation(),je()},children:(0,E.jsx)(re,{className:y.icon,"aria-hidden":!0,focusable:!1})}),(0,E.jsx)(`span`,{className:s(y.arrow,R&&y.open),"aria-hidden":`true`,...f(`cascader`,`icon`),children:(0,E.jsx)(ne,{className:y.icon})})]}),Re]})}})))()}function k(){return(0,A.jsx)(D,{name:`city`,label:`City`,options:j})}var A,j;function M(){return(M=e((()=>{O(),A=n(),j=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function we(){let[e,t]=(0,N.useState)([`fr`,`idf`,`paris`]);return(0,P.jsxs)(`div`,{children:[(0,P.jsx)(D,{name:`city-controlled`,label:`City`,options:F,value:e,onChange:e=>t(e),width:300}),(0,P.jsxs)(`p`,{children:[`Value: `,e.length?JSON.stringify(e):`(empty)`]})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),O(),P=n(),F=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function L(){return(0,R.jsx)(D,{name:`region`,label:`Region (2 levels)`,options:z,maxLevel:2,optionRender:(e,t)=>(0,R.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[t===0?(0,R.jsx)(_e,{}):(0,R.jsx)(ye,{}),e.label]}),dropdownStyle:{minWidth:360},optionStyle:{fontWeight:500}})}var R,z;function B(){return(B=e((()=>{O(),ve(),R=n(),z=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Te(){return(0,V.jsx)(D,{name:`city-default`,label:`City`,options:H,defaultValue:[`jp`,`kansai`,`kyoto`],width:300})}var V,H;function Ee(){return(Ee=e((()=>{O(),V=n(),H=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function U(){return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(D,{name:`location`,label:`Location`,options:G}),(0,W.jsx)(D,{name:`location-disabled`,label:`Disabled`,options:G,defaultValue:[`a`,`a1`],disabled:!0})]})}var W,G;function De(){return(De=e((()=>{O(),W=n(),G=[{value:`a`,label:`Warehouse A`,children:[{value:`a1`,label:`Shelf 1`},{value:`a2`,label:`Shelf 2 (full)`,disabled:!0}]},{value:`b`,label:`Warehouse B (closed)`,disabled:!0}]})))()}function K(){return(0,Oe.jsx)(D,{name:`city-display`,label:`City (last level only)`,options:ke,defaultValue:[`fr`,`ara`,`lyon`],displayRender:e=>e[e.length-1]??``,allowClear:!1})}var Oe,ke;function q(){return(q=e((()=>{O(),Oe=n(),ke=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function J(){return(0,Y.jsx)(D,{name:`city-hover`,label:`City`,options:X,expandTrigger:`hover`})}var Y,X;function Z(){return(Z=e((()=>{O(),Y=n(),X=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Q(){let[e,t]=(0,Ae.useState)(Me);return(0,je.jsx)(D,{name:`team`,label:`Team`,options:e,loadData:e=>{let n=e[e.length-1],r=e=>t(t=>t.map(t=>t.value===n.value?{...t,...e}:t));r({loading:!0}),setTimeout(()=>{r({loading:!1,children:[{value:`${n.value}-team-a`,label:`${n.label} team A`,isLeaf:!0},{value:`${n.value}-team-b`,label:`${n.label} team B`,isLeaf:!0}]})},800)},width:300})}var Ae,je,Me;function Ne(){return(Ne=e((()=>{Ae=t(),O(),je=n(),Me=[{value:`frontend`,label:`Frontend`},{value:`backend`,label:`Backend`},{value:`docs`,label:`Documentation`,isLeaf:!0}]})))()}function Pe(){return(0,Fe.jsx)(D,{name:`city-search`,label:`City`,placeholder:`Type to search`,options:Ie,showSearch:!0,filter:(e,t)=>t.some(t=>String(t.label).toLowerCase().includes(e.toLowerCase())),width:300})}var Fe,Ie;function Le(){return(Le=e((()=>{O(),Fe=n(),Ie=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var $,nt,rt;function it(){return(it=e((()=>{M(),I(),B(),Ee(),De(),q(),Z(),Ne(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),t(),i(),ge(),x(),pe(),$=n(),nt=he(Object.assign({"./demos/basic.tsx":k,"./demos/controlled.tsx":we,"./demos/custom-option.tsx":L,"./demos/default-value.tsx":Te,"./demos/disabled.tsx":U,"./demos/display-render.tsx":K,"./demos/hover.tsx":J,"./demos/lazy-load.tsx":Q,"./demos/search.tsx":Pe}),Object.assign({"./demos/basic.tsx":Re,"./demos/controlled.tsx":Be,"./demos/custom-option.tsx":He,"./demos/default-value.tsx":We,"./demos/disabled.tsx":Ke,"./demos/display-render.tsx":Je,"./demos/hover.tsx":Xe,"./demos/lazy-load.tsx":Qe,"./demos/search.tsx":et})),rt=()=>{let{t:e}=r();return(0,$.jsx)(b,{id:`cascader`,demos:nt,children:(0,$.jsxs)(`section`,{className:me.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.cascader.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:me.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.expand`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.aria`)})]})]})})}})))()}it();export{rt as default};