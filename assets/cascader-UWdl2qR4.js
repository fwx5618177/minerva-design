import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{It as a,gt as o,in as ee,ut as s,x as c}from"./angular-preview-l4x8c_2r.js";import{B as l,T as u,V as d,g as te,j as ne,w as re}from"./ProgressIndicator-BMZ0rR7D.js";import{t as f}from"./stylingHooks-PqiNJdev.js";import{i as ie,n as p,r as ae,t as oe}from"./context-ESLv39g4.js";import{$ as m,Q as h,St as se,Tt as ce,Z as g,wt as _,xt as le}from"./io5-DWV9qlxB.js";import{t as ue}from"./dataAttributes-CDHeJa9q.js";import{n as de,t as fe}from"./Input-LfOOMgLE.js";import{n as v,t as pe}from"./cascader.module.scss-DF2RyuIq.js";import{i as me,r as he}from"./DemoBlock-Ev3eU-vB.js";import{l as ge,n as _e,t as y,u as b}from"./DocPage-BNEhhzRL.js";import{c as ve,g as ye,u as be}from"./fa-BbGgo7YE.js";var x,S,C,xe;function Se(){return(Se=e((()=>{a(),d(),u(),m(),pe(),x=t(),S=n(),C=`[role="option"]:not([aria-disabled="true"])`,xe=({label:e,options:t,expandedPath:n,selectedPath:r,expandTrigger:i=`click`,maxLevel:a=6,optionRender:o,optionStyle:ee,autoFocus:u=!1,onActivate:d,onHoverExpand:ne,onExit:re})=>{let{t:ie}=l(),p=(0,x.useRef)(null),ae=(0,x.useId)(),oe=e=>`${ae}-column-${e}`,m=(0,x.useRef)(u?-1:null),h=[t];for(let e=0;e<n.length&&e<a-1;e+=1){let t=n[e].children;if(!t?.length)break;h.push(t)}let se=e=>p.current?.querySelector(`[data-level="${e}"]`),ce=e=>{let t=se(e);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(C);return n?.focus(),!!n};(0,x.useEffect)(()=>{let e=m.current;if(e===null)return;let t=e===-1?h.length-1:e;ce(t)&&(m.current=null)});let g=(e,t)=>[...n.slice(0,t),e],_=(e,t)=>t<a-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0),le=(e,t,n)=>{let r=Array.from(e.currentTarget.parentElement?.querySelectorAll(C)??[]),i=r.indexOf(e.currentTarget),a=e=>r[(e+r.length)%r.length]?.focus();switch(c(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),a(i+1);break;case`ArrowUp`:e.preventDefault(),a(i-1);break;case`Home`:e.preventDefault(),a(0);break;case`End`:e.preventDefault(),a(r.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!_(t,n))break;m.current=n+1,d(g(t,n),n);break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;_(t,n)&&(m.current=n+1),d(g(t,n),n);break;case`ArrowLeft`:e.preventDefault(),n===0?re?.():ce(n-1)}};return(0,S.jsx)(`div`,{className:v.panel,ref:p,children:h.map((t,c)=>(0,S.jsx)(`ul`,{id:oe(c),"data-level":c,className:v.column,...f(`cascader`,`column`),role:`listbox`,"aria-label":ie(`cascader.level`,{label:e??ie(`cascader.options`),level:c+1}),children:t.map(e=>{let t=n[c]?.value===e.value,l=r[c]?.value===e.value,u=l&&c===r.length-1,re=_(e,c)&&!(!e.children?.length&&e.isLeaf);return(0,S.jsx)(`li`,{className:s(v.option,{[v.active]:t||l,[v.disabled]:e.disabled,[v.loading]:e.loading}),style:ee,...f(`cascader`,`item`,{selected:l,expanded:t&&!u,disabled:e.disabled,loading:e.loading}),role:`option`,"aria-selected":l,"aria-disabled":e.disabled||void 0,"aria-busy":e.loading||void 0,"aria-controls":t&&c+1<h.length?oe(c+1):void 0,tabIndex:e.disabled?-1:0,onKeyDown:t=>le(t,e,c),onClick:()=>{e.disabled||d(g(e,c),c)},onMouseEnter:()=>{i===`hover`&&!e.disabled&&e.children?.length&&c<a-1&&ne?.(g(e,c))},children:o?o(e,c):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(`span`,{className:v.label,children:e.label}),e.loading?(0,S.jsx)(`span`,{className:v.loadingIndicator,"aria-hidden":!0,children:`...`}):re&&(0,S.jsx)(te,{className:v.expandIcon,"aria-hidden":!0})]})},e.value)})},c))})}})))()}var w,T,Ce,we,E;function D(){return(D=e((()=>{a(),d(),u(),_(),se(),p(),h(),fe(),pe(),Se(),w=t(),T=n(),Ce=[],we=[],E=({ref:e,label:t,name:n,options:r=Ce,value:i,defaultValue:a,onChange:c,displayRender:u,disabled:d,readOnly:te,required:p,invalid:m,id:h,"aria-label":se,"aria-labelledby":_,"aria-describedby":fe,style:pe,placeholder:me,allowClear:he=!0,expandTrigger:ge=`click`,className:_e,showSearch:y=!1,filter:b,loadData:ve,dropdownClassName:ye,optionRender:be,width:x=240,maxLevel:S=6,dropdownStyle:C,optionStyle:Se,...E})=>{let{t:D}=l(),O=ie(),k=oe({id:h,"aria-describedby":fe}),A=d??O?.disabled??!1,j=te??O?.readOnly??!1,Te=p??O?.required??!1,M=m??O?.invalid??!1,N=_??(O&&!se?O.labelId:void 0),[P,F]=le({value:i,defaultValue:a??we,name:`Cascader`}),I=(0,w.useMemo)(()=>o(r,P),[r,P]),[L,R]=(0,w.useState)(!1),[z,Ee]=(0,w.useState)(!1),[B,V]=(0,w.useState)([]),De=(0,w.useMemo)(()=>o(r,B),[r,B]),[H,U]=(0,w.useState)(``),[W,Oe]=(0,w.useState)(null),[G,ke]=(0,w.useState)(null),Ae=ce(ke,e),K=(0,w.useRef)(null),q=y&&H!==``,J=(0,w.useMemo)(()=>{if(!q)return[];let e=H.toLowerCase();return ee(r).filter(({path:t})=>b?b(H,t):t.some(t=>String(t.label).toLowerCase().includes(e)))},[q,H,r,b]),Y=(e=!1)=>{A||j||(V(P),Ee(e),R(!0))},X=(e=!1)=>{R(!1),U(``),e&&G?.focus()},Z=e=>{let t=e.map(e=>e.value);F(t),c?.(t,e),X(!0)},je=(e,t)=>{let n=e[e.length-1];if(n.disabled)return;let r=t>=S-1,i=!!n.children?.length,a=!!ve&&!n.isLeaf&&!n.children;if(!r&&(i||a)){V(e.map(e=>e.value)),a&&!n.loading&&ve?.(e);return}Z(e)},Me=()=>{F(we),c?.([],[]),U(``),G?.focus()};(0,w.useEffect)(()=>{G&&(G.setAttribute(`role`,`combobox`),G.setAttribute(`aria-haspopup`,`listbox`),G.setAttribute(`aria-expanded`,String(L)),y&&G.setAttribute(`aria-autocomplete`,`list`))},[G,L,y]);let Q=e=>{let t=e.relatedTarget;L&&t&&(W?.contains(t)||K.current?.contains(t)||X())},Ne=()=>K.current?.querySelector(`[role="option"]`)?.focus(),Pe=e=>{switch(e.key){case`ArrowDown`:e.preventDefault(),L?q?Ne():Ee(!0):Y(!0);break;case`Enter`:e.preventDefault(),L||Y(!0);break;case` `:if(y)break;e.preventDefault(),L||Y(!0)}},Fe=I.map(e=>String(e.label)),Ie=q?H:u?u(Fe,I):Fe.join(` / `),Le=()=>(0,T.jsx)(`div`,{className:v.searchResults,role:`listbox`,"aria-label":t,tabIndex:-1,onKeyDown:e=>{let t=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)),n=t.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),t[(n+(e.key===`ArrowDown`?1:-1)+t.length)%t.length]?.focus())},children:J.length>0?J.map(({path:e})=>(0,T.jsx)(`div`,{className:v.searchOption,...f(`cascader`,`item`),role:`option`,"aria-selected":!1,tabIndex:0,onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),Z(e))},onClick:()=>Z(e),children:e.map(e=>e.label).join(` / `)},e.map(e=>e.value).join(`/`))):(0,T.jsx)(`div`,{className:v.empty,role:`status`,children:D(`cascader.noResults`)})}),Re=(0,T.jsx)(g,{ref:K,open:L,anchor:W,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[W],onDismiss:()=>X(),returnFocusOnEscape:()=>G,focusable:!0,className:s(v.dropdown,ye),style:C,onMouseDown:e=>{e.target.closest(`[role="option"]`)||e.preventDefault()},onBlur:Q,onKeyDown:e=>{e.key===`Tab`&&X()},...f(`cascader`,`content`,{state:`open`}),children:q?Le():(0,T.jsx)(xe,{label:t,options:r,expandedPath:De,selectedPath:I,expandTrigger:ge,maxLevel:S,optionStyle:Se,optionRender:be,autoFocus:z,onActivate:je,onHoverExpand:e=>V(e.map(e=>e.value)),onExit:()=>X(!0)},z?`keyboard`:`pointer`)});return(0,T.jsxs)(`div`,{...ue(E),className:s(v.cascader,_e),ref:Oe,style:{width:x,...pe},onBlur:Q,...f(`cascader`,`root`,{state:L?`open`:`closed`,disabled:A,readonly:j,invalid:M}),children:[(0,T.jsxs)(`div`,{className:s(v.selector,{[v.disabled]:A,[v.focused]:L}),onClick:()=>{A||j||(L?y||X():Y())},...f(`cascader`,`control`),children:[(0,T.jsx)(ae.Provider,{value:null,children:(0,T.jsx)(de,{ref:Ae,variant:`unstyled`,id:k.id,"aria-label":se??t,"aria-labelledby":N,"aria-describedby":k[`aria-describedby`],"aria-invalid":M||void 0,"aria-required":Te||void 0,"aria-readonly":y&&j||void 0,required:Te,name:n,value:Ie,readOnly:!y||j,disabled:A,placeholder:me??D(`cascader.placeholder`),className:v.input,onChange:e=>{y&&!j&&(U(e.target.value),L||Y())},onKeyDown:Pe})}),he&&P.length>0&&!A&&!j&&(0,T.jsx)(`button`,{type:`button`,className:v.clearIcon,"aria-label":D(`cascader.clear`),...f(`cascader`,`clear-button`),onClick:e=>{e.stopPropagation(),Me()},children:(0,T.jsx)(re,{className:v.icon,"aria-hidden":!0,focusable:!1})}),(0,T.jsx)(`span`,{className:s(v.arrow,L&&v.open),"aria-hidden":`true`,...f(`cascader`,`icon`),children:(0,T.jsx)(ne,{className:v.icon})})]}),Re]})}})))()}function O(){return(0,k.jsx)(E,{name:`city`,label:`City`,options:A})}var k,A;function j(){return(j=e((()=>{D(),k=n(),A=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Te(){let[e,t]=(0,M.useState)([`fr`,`idf`,`paris`]);return(0,N.jsxs)(`div`,{children:[(0,N.jsx)(E,{name:`city-controlled`,label:`City`,options:P,value:e,onChange:e=>t(e),width:300}),(0,N.jsxs)(`p`,{children:[`Value: `,e.length?JSON.stringify(e):`(empty)`]})]})}var M,N,P;function F(){return(F=e((()=>{M=t(),D(),N=n(),P=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function I(){return(0,L.jsx)(E,{name:`region`,label:`Region (2 levels)`,options:R,maxLevel:2,optionRender:(e,t)=>(0,L.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[t===0?(0,L.jsx)(ve,{}):(0,L.jsx)(be,{}),e.label]}),dropdownStyle:{minWidth:360},optionStyle:{fontWeight:500}})}var L,R;function z(){return(z=e((()=>{D(),ye(),L=n(),R=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Ee(){return(0,B.jsx)(E,{name:`city-default`,label:`City`,options:V,defaultValue:[`jp`,`kansai`,`kyoto`],width:300})}var B,V;function De(){return(De=e((()=>{D(),B=n(),V=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function H(){return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(E,{name:`location`,label:`Location`,options:W}),(0,U.jsx)(E,{name:`location-disabled`,label:`Disabled`,options:W,defaultValue:[`a`,`a1`],disabled:!0})]})}var U,W;function Oe(){return(Oe=e((()=>{D(),U=n(),W=[{value:`a`,label:`Warehouse A`,children:[{value:`a1`,label:`Shelf 1`},{value:`a2`,label:`Shelf 2 (full)`,disabled:!0}]},{value:`b`,label:`Warehouse B (closed)`,disabled:!0}]})))()}function G(){return(0,ke.jsx)(E,{name:`city-display`,label:`City (last level only)`,options:Ae,defaultValue:[`fr`,`ara`,`lyon`],displayRender:e=>e[e.length-1]??``,allowClear:!1})}var ke,Ae;function K(){return(K=e((()=>{D(),ke=n(),Ae=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function q(){return(0,J.jsx)(E,{name:`city-hover`,label:`City`,options:Y,expandTrigger:`hover`})}var J,Y;function X(){return(X=e((()=>{D(),J=n(),Y=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Z(){let[e,t]=(0,je.useState)(Q);return(0,Me.jsx)(E,{name:`team`,label:`Team`,options:e,loadData:e=>{let n=e[e.length-1],r=e=>t(t=>t.map(t=>t.value===n.value?{...t,...e}:t));r({loading:!0}),setTimeout(()=>{r({loading:!1,children:[{value:`${n.value}-team-a`,label:`${n.label} team A`,isLeaf:!0},{value:`${n.value}-team-b`,label:`${n.label} team B`,isLeaf:!0}]})},800)},width:300})}var je,Me,Q;function Ne(){return(Ne=e((()=>{je=t(),D(),Me=n(),Q=[{value:`frontend`,label:`Frontend`},{value:`backend`,label:`Backend`},{value:`docs`,label:`Documentation`,isLeaf:!0}]})))()}function Pe(){return(0,Fe.jsx)(E,{name:`city-search`,label:`City`,placeholder:`Type to search`,options:Ie,showSearch:!0,filter:(e,t)=>t.some(t=>String(t.label).toLowerCase().includes(e.toLowerCase())),width:300})}var Fe,Ie;function Le(){return(Le=e((()=>{D(),Fe=n(),Ie=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var $,nt,rt;function it(){return(it=e((()=>{j(),F(),z(),De(),Oe(),K(),X(),Ne(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),t(),i(),_e(),b(),me(),$=n(),nt=ge(Object.assign({"./demos/basic.tsx":O,"./demos/controlled.tsx":Te,"./demos/custom-option.tsx":I,"./demos/default-value.tsx":Ee,"./demos/disabled.tsx":H,"./demos/display-render.tsx":G,"./demos/hover.tsx":q,"./demos/lazy-load.tsx":Z,"./demos/search.tsx":Pe}),Object.assign({"./demos/basic.tsx":Re,"./demos/controlled.tsx":Be,"./demos/custom-option.tsx":He,"./demos/default-value.tsx":We,"./demos/disabled.tsx":Ke,"./demos/display-render.tsx":Je,"./demos/hover.tsx":Xe,"./demos/lazy-load.tsx":Qe,"./demos/search.tsx":et})),rt=()=>{let{t:e}=r();return(0,$.jsx)(y,{id:`cascader`,demos:nt,children:(0,$.jsxs)(`section`,{className:he.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.cascader.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:he.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.expand`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.aria`)})]})]})})}})))()}it();export{rt as default};