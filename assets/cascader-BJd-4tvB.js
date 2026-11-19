import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{J as r,Y as i,_t as a,bt as o,q as ee,vt as s,xt as c}from"./io5-CF00Dq3U.js";import{n as l,t as u}from"./useTranslation-ERkc1WxY.js";import{Bt as d,Nn as f,Tt as te,it as p,q as ne}from"./angular-preview-Bvv51cL-.js";import{B as re,T as m,V as h,g as ie,j as g,w as ae}from"./ProgressIndicator-CXNTCbma.js";import{t as _}from"./stylingHooks-PqiNJdev.js";import{i as oe,n as v,r as y,t as se}from"./context-ESLv39g4.js";import{t as ce}from"./dataAttributes-CDHeJa9q.js";import{n as le,t as ue}from"./useFocusModality-PNhyC6fY.js";import{n as de,t as fe}from"./Input-DpAzl0V0.js";import{n as b,t as pe}from"./cascader.module.scss-CIh4vjki.js";import{i as me,r as he}from"./DemoBlock-Sp3vCbQU.js";import{l as ge,n as x,t as S,u as _e}from"./DocPage-DXmtdqQB.js";import{c as ve,g as ye,u as be}from"./fa-Ec2jmNv0.js";var C,w,T,xe;function Se(){return(Se=e((()=>{f(),h(),m(),i(),pe(),C=t(),w=n(),T=`[role="option"]:not([aria-disabled="true"])`,xe=({label:e,options:t,expandedPath:n,selectedPath:r,expandTrigger:i=`click`,maxLevel:a=6,optionRender:o,optionStyle:ee,autoFocus:s=!1,onActivate:c,onHoverExpand:l,onExit:u})=>{let{t:d}=re(),f=(0,C.useRef)(null),te=(0,C.useId)(),m=e=>`${te}-column-${e}`,h=(0,C.useRef)(s?-1:null),g=[t];for(let e=0;e<n.length&&e<a-1;e+=1){let t=n[e].children;if(!t?.length)break;g.push(t)}let ae=e=>f.current?.querySelector(`[data-level="${e}"]`),oe=e=>{let t=ae(e);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(T);return n?.focus(),!!n};(0,C.useEffect)(()=>{let e=h.current;if(e===null)return;let t=e===-1?g.length-1:e;oe(t)&&(h.current=null)});let v=(e,t)=>[...n.slice(0,t),e],y=(e,t)=>t<a-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0),se=(e,t,n)=>{let r=Array.from(e.currentTarget.parentElement?.querySelectorAll(T)??[]),i=r.indexOf(e.currentTarget),a=e=>r[(e+r.length)%r.length]?.focus();switch(ne(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),a(i+1);break;case`ArrowUp`:e.preventDefault(),a(i-1);break;case`Home`:e.preventDefault(),a(0);break;case`End`:e.preventDefault(),a(r.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!y(t,n))break;h.current=n+1,c(v(t,n),n);break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;y(t,n)&&(h.current=n+1),c(v(t,n),n);break;case`ArrowLeft`:e.preventDefault(),n===0?u?.():oe(n-1)}};return(0,w.jsx)(`div`,{className:b.panel,ref:f,children:g.map((t,s)=>(0,w.jsx)(`ul`,{id:m(s),"data-level":s,className:b.column,..._(`cascader`,`column`),role:`listbox`,"aria-label":d(`cascader.level`,{label:e??d(`cascader.options`),level:s+1}),children:t.map(e=>{let t=n[s]?.value===e.value,u=r[s]?.value===e.value,d=u&&s===r.length-1,f=y(e,s)&&!(!e.children?.length&&e.isLeaf);return(0,w.jsx)(`li`,{className:p(b.option,{[b.active]:t||u,[b.disabled]:e.disabled,[b.loading]:e.loading}),style:ee,..._(`cascader`,`item`,{selected:u,expanded:t&&!d,disabled:e.disabled,loading:e.loading}),role:`option`,"aria-selected":u,"aria-disabled":e.disabled||void 0,"aria-busy":e.loading||void 0,"aria-controls":t&&s+1<g.length?m(s+1):void 0,tabIndex:e.disabled?-1:0,onKeyDown:t=>se(t,e,s),onClick:()=>{e.disabled||c(v(e,s),s)},onMouseEnter:()=>{i===`hover`&&!e.disabled&&e.children?.length&&s<a-1&&l?.(v(e,s))},children:o?o(e,s):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(`span`,{className:b.label,children:e.label}),e.loading?(0,w.jsx)(`span`,{className:b.loadingIndicator,"aria-hidden":!0,children:`...`}):f&&(0,w.jsx)(ie,{className:b.expandIcon,"aria-hidden":!0})]})},e.value)})},s))})}})))()}var E,D,Ce,we,O;function k(){return(k=e((()=>{f(),h(),m(),o(),s(),v(),r(),ue(),de(),pe(),Se(),E=t(),D=n(),Ce=[],we=[],O=({ref:e,label:t,name:n,options:r=Ce,value:i,defaultValue:o,onChange:s,displayRender:l,disabled:u,readOnly:f,required:ne,invalid:m,id:h,"aria-label":ie,"aria-labelledby":v,"aria-describedby":ue,style:de,placeholder:pe,allowClear:me=!0,expandTrigger:he=`click`,className:ge,showSearch:x=!1,filter:S,loadData:_e,dropdownClassName:ve,optionRender:ye,width:be=240,maxLevel:C=6,dropdownStyle:w,optionStyle:T,...Se})=>{let{t:O}=re(),k=oe(),Te=se({id:h,"aria-describedby":ue}),A=u??k?.disabled??!1,j=f??k?.readOnly??!1,M=ne??k?.required??!1,Ee=m??k?.invalid??!1,De=v??(k&&!ie?k.labelId:void 0),[N,P]=a({value:i,defaultValue:o??we,name:`Cascader`}),F=(0,E.useMemo)(()=>te(r,N),[r,N]),[I,L]=(0,E.useState)(!1),[R,z]=(0,E.useState)(!1),[Oe,B]=(0,E.useState)([]),ke=(0,E.useMemo)(()=>te(r,Oe),[r,Oe]),[V,H]=(0,E.useState)(``),[U,W]=(0,E.useState)(null),Ae=le(),je=c(Ae,W),[G,Me]=(0,E.useState)(null),Ne=c(Me,e),K=(0,E.useRef)(null),q=x&&V!==``,J=(0,E.useMemo)(()=>{if(!q)return[];let e=V.toLowerCase();return d(r).filter(({path:t})=>S?S(V,t):t.some(t=>String(t.label).toLowerCase().includes(e)))},[q,V,r,S]),Y=(e=!1)=>{A||j||(B(N),z(e),L(!0))},X=(e=!1)=>{L(!1),H(``),e&&G?.focus()},Z=e=>{let t=e.map(e=>e.value);P(t),s?.(t,e),X(!0)},Pe=(e,t)=>{let n=e[e.length-1];if(n.disabled)return;let r=t>=C-1,i=!!n.children?.length,a=!!_e&&!n.isLeaf&&!n.children;if(!r&&(i||a)){B(e.map(e=>e.value)),a&&!n.loading&&_e?.(e);return}Z(e)},Fe=()=>{P(we),s?.([],[]),H(``),G?.focus()};(0,E.useEffect)(()=>{G&&(G.setAttribute(`role`,`combobox`),G.setAttribute(`aria-haspopup`,`listbox`),G.setAttribute(`aria-expanded`,String(I)),x&&G.setAttribute(`aria-autocomplete`,`list`))},[G,I,x]);let Q=e=>{let t=e.relatedTarget;I&&t&&(U?.contains(t)||K.current?.contains(t)||X())},Ie=()=>K.current?.querySelector(`[role="option"]`)?.focus(),Le=e=>{switch(e.key){case`ArrowDown`:e.preventDefault(),I?q?Ie():z(!0):Y(!0);break;case`Enter`:e.preventDefault(),I||Y(!0);break;case` `:if(x)break;e.preventDefault(),I||Y(!0)}},Re=F.map(e=>String(e.label)),ze=q?V:l?l(Re,F):Re.join(` / `),Be=()=>(0,D.jsx)(`div`,{className:b.searchResults,role:`listbox`,"aria-label":t,tabIndex:-1,onKeyDown:e=>{let t=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)),n=t.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),t[(n+(e.key===`ArrowDown`?1:-1)+t.length)%t.length]?.focus())},children:J.length>0?J.map(({path:e})=>(0,D.jsx)(`div`,{className:b.searchOption,..._(`cascader`,`item`),role:`option`,"aria-selected":!1,tabIndex:0,onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),Z(e))},onClick:()=>Z(e),children:e.map(e=>e.label).join(` / `)},e.map(e=>e.value).join(`/`))):(0,D.jsx)(`div`,{className:b.empty,role:`status`,children:O(`cascader.noResults`)})}),Ve=(0,D.jsx)(ee,{ref:K,open:I,anchor:U,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[U],onDismiss:()=>X(),returnFocusOnEscape:()=>G,focusable:!0,className:p(b.dropdown,ve),style:w,onMouseDown:e=>{e.target.closest(`[role="option"]`)||e.preventDefault()},onBlur:Q,onKeyDown:e=>{e.key===`Tab`&&X()},..._(`cascader`,`content`,{state:`open`}),children:q?Be():(0,D.jsx)(xe,{label:t,options:r,expandedPath:ke,selectedPath:F,expandTrigger:he,maxLevel:C,optionStyle:T,optionRender:ye,autoFocus:R,onActivate:Pe,onHoverExpand:e=>B(e.map(e=>e.value)),onExit:()=>X(!0)},R?`keyboard`:`pointer`)});return(0,D.jsxs)(`div`,{...ce(Se),className:p(b.cascader,ge),ref:je,style:{width:be,...de},onBlur:Q,..._(`cascader`,`root`,{state:I?`open`:`closed`,disabled:A,readonly:j,invalid:Ee}),children:[(0,D.jsxs)(`div`,{className:p(b.selector,{[b.disabled]:A,[b.focused]:I}),onClick:()=>{A||j||(I?x||X():Y())},..._(`cascader`,`control`),children:[(0,D.jsx)(y.Provider,{value:null,children:(0,D.jsx)(fe,{ref:Ne,variant:`unstyled`,id:Te.id,"aria-label":ie??t,"aria-labelledby":De,"aria-describedby":Te[`aria-describedby`],"aria-invalid":Ee||void 0,"aria-required":M||void 0,"aria-readonly":x&&j||void 0,required:M,name:n,value:ze,readOnly:!x||j,disabled:A,placeholder:pe??O(`cascader.placeholder`),className:b.input,onChange:e=>{x&&!j&&(H(e.target.value),I||Y())},onKeyDown:Le})}),me&&N.length>0&&!A&&!j&&(0,D.jsx)(`button`,{type:`button`,className:b.clearIcon,"aria-label":O(`cascader.clear`),..._(`cascader`,`clear-button`),onClick:e=>{e.stopPropagation(),Fe()},children:(0,D.jsx)(ae,{className:b.icon,"aria-hidden":!0,focusable:!1})}),(0,D.jsx)(`span`,{className:p(b.arrow,I&&b.open),"aria-hidden":`true`,..._(`cascader`,`icon`),children:(0,D.jsx)(g,{className:b.icon})})]}),Ve]})}})))()}function Te(){return(0,A.jsx)(O,{name:`city`,label:`City`,options:j})}var A,j;function M(){return(M=e((()=>{k(),A=n(),j=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Ee(){let[e,t]=(0,De.useState)([`fr`,`idf`,`paris`]);return(0,N.jsxs)(`div`,{children:[(0,N.jsx)(O,{name:`city-controlled`,label:`City`,options:P,value:e,onChange:e=>t(e),width:300}),(0,N.jsxs)(`p`,{children:[`Value: `,e.length?JSON.stringify(e):`(empty)`]})]})}var De,N,P;function F(){return(F=e((()=>{De=t(),k(),N=n(),P=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function I(){return(0,L.jsx)(O,{name:`region`,label:`Region (2 levels)`,options:R,maxLevel:2,optionRender:(e,t)=>(0,L.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[t===0?(0,L.jsx)(ve,{}):(0,L.jsx)(be,{}),e.label]}),dropdownStyle:{minWidth:360},optionStyle:{fontWeight:500}})}var L,R;function z(){return(z=e((()=>{k(),ye(),L=n(),R=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Oe(){return(0,B.jsx)(O,{name:`city-default`,label:`City`,options:ke,defaultValue:[`jp`,`kansai`,`kyoto`],width:300})}var B,ke;function V(){return(V=e((()=>{k(),B=n(),ke=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function H(){return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(O,{name:`location`,label:`Location`,options:W}),(0,U.jsx)(O,{name:`location-disabled`,label:`Disabled`,options:W,defaultValue:[`a`,`a1`],disabled:!0})]})}var U,W;function Ae(){return(Ae=e((()=>{k(),U=n(),W=[{value:`a`,label:`Warehouse A`,children:[{value:`a1`,label:`Shelf 1`},{value:`a2`,label:`Shelf 2 (full)`,disabled:!0}]},{value:`b`,label:`Warehouse B (closed)`,disabled:!0}]})))()}function je(){return(0,G.jsx)(O,{name:`city-display`,label:`City (last level only)`,options:Me,defaultValue:[`fr`,`ara`,`lyon`],displayRender:e=>e[e.length-1]??``,allowClear:!1})}var G,Me;function Ne(){return(Ne=e((()=>{k(),G=n(),Me=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function K(){return(0,q.jsx)(O,{name:`city-hover`,label:`City`,options:J,expandTrigger:`hover`})}var q,J;function Y(){return(Y=e((()=>{k(),q=n(),J=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function X(){let[e,t]=(0,Z.useState)(Fe);return(0,Pe.jsx)(O,{name:`team`,label:`Team`,options:e,loadData:e=>{let n=e[e.length-1],r=e=>t(t=>t.map(t=>t.value===n.value?{...t,...e}:t));r({loading:!0}),setTimeout(()=>{r({loading:!1,children:[{value:`${n.value}-team-a`,label:`${n.label} team A`,isLeaf:!0},{value:`${n.value}-team-b`,label:`${n.label} team B`,isLeaf:!0}]})},800)},width:300})}var Z,Pe,Fe;function Q(){return(Q=e((()=>{Z=t(),k(),Pe=n(),Fe=[{value:`frontend`,label:`Frontend`},{value:`backend`,label:`Backend`},{value:`docs`,label:`Documentation`,isLeaf:!0}]})))()}function Ie(){return(0,Le.jsx)(O,{name:`city-search`,label:`City`,placeholder:`Type to search`,options:Re,showSearch:!0,filter:(e,t)=>t.some(t=>String(t.label).toLowerCase().includes(e.toLowerCase())),width:300})}var Le,Re;function ze(){return(ze=e((()=>{k(),Le=n(),Re=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useState } from "react";
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
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { Cascader, type CascaderOption } from "minerva-design";
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
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var et;function tt(){return(tt=e((()=>{et=`import { useState } from "react";
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
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var $,it,at;function ot(){return(ot=e((()=>{M(),F(),z(),V(),Ae(),Ne(),Y(),Q(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),rt(),t(),u(),x(),_e(),me(),$=n(),it=ge(Object.assign({"./demos/basic.tsx":Te,"./demos/controlled.tsx":Ee,"./demos/custom-option.tsx":I,"./demos/default-value.tsx":Oe,"./demos/disabled.tsx":H,"./demos/display-render.tsx":je,"./demos/hover.tsx":K,"./demos/lazy-load.tsx":X,"./demos/search.tsx":Ie}),Object.assign({"./demos/basic.tsx":Be,"./demos/controlled.tsx":He,"./demos/custom-option.tsx":We,"./demos/default-value.tsx":Ke,"./demos/disabled.tsx":Je,"./demos/display-render.tsx":Xe,"./demos/hover.tsx":Qe,"./demos/lazy-load.tsx":et,"./demos/search.tsx":nt})),at=()=>{let{t:e}=l();return(0,$.jsx)(S,{id:`cascader`,demos:it,children:(0,$.jsxs)(`section`,{className:he.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.cascader.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:he.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.expand`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.aria`)})]})]})})}})))()}ot();export{at as default};