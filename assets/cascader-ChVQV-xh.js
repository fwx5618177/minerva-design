import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,r as i}from"./DemoBlock-BJ0_y9F8.js";import{n as a,t as o}from"./useTranslation-BzoVi22c.js";import{It as s,gt as c,in as l,ut as u,x as d}from"./angular-preview-l4x8c_2r.js";import{B as f,H as ee,T as p,U as m,g as te,j as ne,w as re}from"./ProgressIndicator-BhPa7d9i.js";import{i as ie,n as ae,r as h,t as g}from"./context-ESLv39g4.js";import{$ as _,Ct as v,Et as y,Q as b,St as oe,Tt as se,et as ce}from"./io5-DF7HdQ2g.js";import{t as le}from"./dataAttributes-CDHeJa9q.js";import{n as ue,t as de}from"./Input-DboHcSJW.js";import{n as x,t as fe}from"./cascader.module.scss-DF2RyuIq.js";import{l as pe,n as me,t as S,u as C}from"./DocPage-B2iACtLP.js";import{c as he,g as ge,u as _e}from"./fa-CUc9lZFb.js";var w,T,E,ve;function ye(){return(ye=e((()=>{s(),m(),p(),ce(),fe(),w=t(),T=n(),E=`[role="option"]:not([aria-disabled="true"])`,ve=({label:e,options:t,expandedPath:n,selectedPath:r,expandTrigger:i=`click`,maxLevel:a=6,optionRender:o,optionStyle:s,autoFocus:c=!1,onActivate:l,onHoverExpand:p,onExit:m})=>{let{t:ne}=ee(),re=(0,w.useRef)(null),ie=(0,w.useId)(),ae=e=>`${ie}-column-${e}`,h=(0,w.useRef)(c?-1:null),g=[t];for(let e=0;e<n.length&&e<a-1;e+=1){let t=n[e].children;if(!t?.length)break;g.push(t)}let _=e=>re.current?.querySelector(`[data-level="${e}"]`),v=e=>{let t=_(e);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(E);return n?.focus(),!!n};(0,w.useEffect)(()=>{let e=h.current;if(e===null)return;let t=e===-1?g.length-1:e;v(t)&&(h.current=null)});let y=(e,t)=>[...n.slice(0,t),e],b=(e,t)=>t<a-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0),oe=(e,t,n)=>{let r=Array.from(e.currentTarget.parentElement?.querySelectorAll(E)??[]),i=r.indexOf(e.currentTarget),a=e=>r[(e+r.length)%r.length]?.focus();switch(d(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),a(i+1);break;case`ArrowUp`:e.preventDefault(),a(i-1);break;case`Home`:e.preventDefault(),a(0);break;case`End`:e.preventDefault(),a(r.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!b(t,n))break;h.current=n+1,l(y(t,n),n);break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;b(t,n)&&(h.current=n+1),l(y(t,n),n);break;case`ArrowLeft`:e.preventDefault(),n===0?m?.():v(n-1)}};return(0,T.jsx)(`div`,{className:x.panel,ref:re,children:g.map((t,c)=>(0,T.jsx)(`ul`,{id:ae(c),"data-level":c,className:x.column,...f(`cascader`,`column`),role:`listbox`,"aria-label":ne(`cascader.level`,{label:e??ne(`cascader.options`),level:c+1}),children:t.map(e=>{let t=n[c]?.value===e.value,d=r[c]?.value===e.value,ee=d&&c===r.length-1,m=b(e,c)&&!(!e.children?.length&&e.isLeaf);return(0,T.jsx)(`li`,{className:u(x.option,{[x.active]:t||d,[x.disabled]:e.disabled,[x.loading]:e.loading}),style:s,...f(`cascader`,`item`,{selected:d,expanded:t&&!ee,disabled:e.disabled,loading:e.loading}),role:`option`,"aria-selected":d,"aria-disabled":e.disabled||void 0,"aria-busy":e.loading||void 0,"aria-controls":t&&c+1<g.length?ae(c+1):void 0,tabIndex:e.disabled?-1:0,onKeyDown:t=>oe(t,e,c),onClick:()=>{e.disabled||l(y(e,c),c)},onMouseEnter:()=>{i===`hover`&&!e.disabled&&e.children?.length&&c<a-1&&p?.(y(e,c))},children:o?o(e,c):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`span`,{className:x.label,children:e.label}),e.loading?(0,T.jsx)(`span`,{className:x.loadingIndicator,"aria-hidden":!0,children:`...`}):m&&(0,T.jsx)(te,{className:x.expandIcon,"aria-hidden":!0})]})},e.value)})},c))})}})))()}var D,O,be,xe,k;function A(){return(A=e((()=>{s(),m(),p(),se(),v(),ae(),_(),de(),fe(),ye(),D=t(),O=n(),be=[],xe=[],k=({ref:e,label:t,name:n,options:r=be,value:i,defaultValue:a,onChange:o,displayRender:s,disabled:d,readOnly:p,required:m,invalid:te,id:ae,"aria-label":_,"aria-labelledby":v,"aria-describedby":se,style:ce,placeholder:de,allowClear:fe=!0,expandTrigger:pe=`click`,className:me,showSearch:S=!1,filter:C,loadData:he,dropdownClassName:ge,optionRender:_e,width:w=240,maxLevel:T=6,dropdownStyle:E,optionStyle:ye,...k})=>{let{t:A}=ee(),j=ie(),M=g({id:ae,"aria-describedby":se}),N=d??j?.disabled??!1,P=p??j?.readOnly??!1,Se=m??j?.required??!1,F=te??j?.invalid??!1,I=v??(j&&!_?j.labelId:void 0),[L,Ce]=oe({value:i,defaultValue:a??xe,name:`Cascader`}),R=(0,D.useMemo)(()=>c(r,L),[r,L]),[z,B]=(0,D.useState)(!1),[V,we]=(0,D.useState)(!1),[H,U]=(0,D.useState)([]),Te=(0,D.useMemo)(()=>c(r,H),[r,H]),[W,G]=(0,D.useState)(``),[K,Ee]=(0,D.useState)(null),[q,De]=(0,D.useState)(null),Oe=y(De,e),J=(0,D.useRef)(null),Y=S&&W!==``,X=(0,D.useMemo)(()=>{if(!Y)return[];let e=W.toLowerCase();return l(r).filter(({path:t})=>C?C(W,t):t.some(t=>String(t.label).toLowerCase().includes(e)))},[Y,W,r,C]),Z=(e=!1)=>{N||P||(U(L),we(e),B(!0))},Q=(e=!1)=>{B(!1),G(``),e&&q?.focus()},ke=e=>{let t=e.map(e=>e.value);Ce(t),o?.(t,e),Q(!0)},Ae=(e,t)=>{let n=e[e.length-1];if(n.disabled)return;let r=t>=T-1,i=!!n.children?.length,a=!!he&&!n.isLeaf&&!n.children;if(!r&&(i||a)){U(e.map(e=>e.value)),a&&!n.loading&&he?.(e);return}ke(e)},je=()=>{Ce(xe),o?.([],[]),G(``),q?.focus()};(0,D.useEffect)(()=>{q&&(q.setAttribute(`role`,`combobox`),q.setAttribute(`aria-haspopup`,`listbox`),q.setAttribute(`aria-expanded`,String(z)),S&&q.setAttribute(`aria-autocomplete`,`list`))},[q,z,S]);let Me=e=>{let t=e.relatedTarget;z&&t&&(K?.contains(t)||J.current?.contains(t)||Q())},Ne=()=>J.current?.querySelector(`[role="option"]`)?.focus(),Pe=e=>{switch(e.key){case`ArrowDown`:e.preventDefault(),z?Y?Ne():we(!0):Z(!0);break;case`Enter`:e.preventDefault(),z||Z(!0);break;case` `:if(S)break;e.preventDefault(),z||Z(!0)}},Fe=R.map(e=>String(e.label)),Ie=Y?W:s?s(Fe,R):Fe.join(` / `),Le=()=>(0,O.jsx)(`div`,{className:x.searchResults,role:`listbox`,"aria-label":t,tabIndex:-1,onKeyDown:e=>{let t=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)),n=t.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),t[(n+(e.key===`ArrowDown`?1:-1)+t.length)%t.length]?.focus())},children:X.length>0?X.map(({path:e})=>(0,O.jsx)(`div`,{className:x.searchOption,...f(`cascader`,`item`),role:`option`,"aria-selected":!1,tabIndex:0,onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),ke(e))},onClick:()=>ke(e),children:e.map(e=>e.label).join(` / `)},e.map(e=>e.value).join(`/`))):(0,O.jsx)(`div`,{className:x.empty,role:`status`,children:A(`cascader.noResults`)})}),Re=(0,O.jsx)(b,{ref:J,open:z,anchor:K,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[K],onDismiss:()=>Q(),returnFocusOnEscape:()=>q,focusable:!0,className:u(x.dropdown,ge),style:E,onMouseDown:e=>{e.target.closest(`[role="option"]`)||e.preventDefault()},onBlur:Me,onKeyDown:e=>{e.key===`Tab`&&Q()},...f(`cascader`,`content`,{state:`open`}),children:Y?Le():(0,O.jsx)(ve,{label:t,options:r,expandedPath:Te,selectedPath:R,expandTrigger:pe,maxLevel:T,optionStyle:ye,optionRender:_e,autoFocus:V,onActivate:Ae,onHoverExpand:e=>U(e.map(e=>e.value)),onExit:()=>Q(!0)},V?`keyboard`:`pointer`)});return(0,O.jsxs)(`div`,{...le(k),className:u(x.cascader,me),ref:Ee,style:{width:w,...ce},onBlur:Me,...f(`cascader`,`root`,{state:z?`open`:`closed`,disabled:N,readonly:P,invalid:F}),children:[(0,O.jsxs)(`div`,{className:u(x.selector,{[x.disabled]:N,[x.focused]:z}),onClick:()=>{N||P||(z?S||Q():Z())},...f(`cascader`,`control`),children:[(0,O.jsx)(h.Provider,{value:null,children:(0,O.jsx)(ue,{ref:Oe,variant:`unstyled`,id:M.id,"aria-label":_??t,"aria-labelledby":I,"aria-describedby":M[`aria-describedby`],"aria-invalid":F||void 0,"aria-required":Se||void 0,"aria-readonly":S&&P||void 0,required:Se,name:n,value:Ie,readOnly:!S||P,disabled:N,placeholder:de??A(`cascader.placeholder`),className:x.input,onChange:e=>{S&&!P&&(G(e.target.value),z||Z())},onKeyDown:Pe})}),fe&&L.length>0&&!N&&!P&&(0,O.jsx)(`button`,{type:`button`,className:x.clearIcon,"aria-label":A(`cascader.clear`),...f(`cascader`,`clear-button`),onClick:e=>{e.stopPropagation(),je()},children:(0,O.jsx)(re,{className:x.icon,"aria-hidden":!0,focusable:!1})}),(0,O.jsx)(`span`,{className:u(x.arrow,z&&x.open),"aria-hidden":`true`,...f(`cascader`,`icon`),children:(0,O.jsx)(ne,{className:x.icon})})]}),Re]})}})))()}function j(){return(0,M.jsx)(k,{name:`city`,label:`City`,options:N})}var M,N;function P(){return(P=e((()=>{A(),M=n(),N=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Se(){let[e,t]=(0,F.useState)([`fr`,`idf`,`paris`]);return(0,I.jsxs)(`div`,{children:[(0,I.jsx)(k,{name:`city-controlled`,label:`City`,options:L,value:e,onChange:e=>t(e),width:300}),(0,I.jsxs)(`p`,{children:[`Value: `,e.length?JSON.stringify(e):`(empty)`]})]})}var F,I,L;function Ce(){return(Ce=e((()=>{F=t(),A(),I=n(),L=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function R(){return(0,z.jsx)(k,{name:`region`,label:`Region (2 levels)`,options:B,maxLevel:2,optionRender:(e,t)=>(0,z.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[t===0?(0,z.jsx)(he,{}):(0,z.jsx)(_e,{}),e.label]}),dropdownStyle:{minWidth:360},optionStyle:{fontWeight:500}})}var z,B;function V(){return(V=e((()=>{A(),ge(),z=n(),B=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function we(){return(0,H.jsx)(k,{name:`city-default`,label:`City`,options:U,defaultValue:[`jp`,`kansai`,`kyoto`],width:300})}var H,U;function Te(){return(Te=e((()=>{A(),H=n(),U=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function W(){return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(k,{name:`location`,label:`Location`,options:K}),(0,G.jsx)(k,{name:`location-disabled`,label:`Disabled`,options:K,defaultValue:[`a`,`a1`],disabled:!0})]})}var G,K;function Ee(){return(Ee=e((()=>{A(),G=n(),K=[{value:`a`,label:`Warehouse A`,children:[{value:`a1`,label:`Shelf 1`},{value:`a2`,label:`Shelf 2 (full)`,disabled:!0}]},{value:`b`,label:`Warehouse B (closed)`,disabled:!0}]})))()}function q(){return(0,De.jsx)(k,{name:`city-display`,label:`City (last level only)`,options:Oe,defaultValue:[`fr`,`ara`,`lyon`],displayRender:e=>e[e.length-1]??``,allowClear:!1})}var De,Oe;function J(){return(J=e((()=>{A(),De=n(),Oe=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Y(){return(0,X.jsx)(k,{name:`city-hover`,label:`City`,options:Z,expandTrigger:`hover`})}var X,Z;function Q(){return(Q=e((()=>{A(),X=n(),Z=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function ke(){let[e,t]=(0,Ae.useState)(Me);return(0,je.jsx)(k,{name:`team`,label:`Team`,options:e,loadData:e=>{let n=e[e.length-1],r=e=>t(t=>t.map(t=>t.value===n.value?{...t,...e}:t));r({loading:!0}),setTimeout(()=>{r({loading:!1,children:[{value:`${n.value}-team-a`,label:`${n.label} team A`,isLeaf:!0},{value:`${n.value}-team-b`,label:`${n.label} team B`,isLeaf:!0}]})},800)},width:300})}var Ae,je,Me;function Ne(){return(Ne=e((()=>{Ae=t(),A(),je=n(),Me=[{value:`frontend`,label:`Frontend`},{value:`backend`,label:`Backend`},{value:`docs`,label:`Documentation`,isLeaf:!0}]})))()}function Pe(){return(0,Fe.jsx)(k,{name:`city-search`,label:`City`,placeholder:`Type to search`,options:Ie,showSearch:!0,filter:(e,t)=>t.some(t=>String(t.label).toLowerCase().includes(e.toLowerCase())),width:300})}var Fe,Ie;function Le(){return(Le=e((()=>{A(),Fe=n(),Ie=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var $,nt,rt;function it(){return(it=e((()=>{P(),Ce(),V(),Te(),Ee(),J(),Q(),Ne(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),t(),o(),me(),C(),r(),$=n(),nt=pe(Object.assign({"./demos/basic.tsx":j,"./demos/controlled.tsx":Se,"./demos/custom-option.tsx":R,"./demos/default-value.tsx":we,"./demos/disabled.tsx":W,"./demos/display-render.tsx":q,"./demos/hover.tsx":Y,"./demos/lazy-load.tsx":ke,"./demos/search.tsx":Pe}),Object.assign({"./demos/basic.tsx":Re,"./demos/controlled.tsx":Be,"./demos/custom-option.tsx":He,"./demos/default-value.tsx":We,"./demos/disabled.tsx":Ke,"./demos/display-render.tsx":Je,"./demos/hover.tsx":Xe,"./demos/lazy-load.tsx":Qe,"./demos/search.tsx":et})),rt=()=>{let{t:e}=a();return(0,$.jsx)(S,{id:`cascader`,demos:nt,children:(0,$.jsxs)(`section`,{className:i.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.cascader.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:i.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.expand`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.aria`)})]})]})})}})))()}it();export{rt as default};