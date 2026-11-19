import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ft as r,Nt as i,O as a,Pt as o,X as s,in as c,o as l,on as ee,rn as u,sn as d}from"./icons-BnhBUHMa.js";import{n as f,t as te}from"./useTranslation-BuRShUHp.js";import{Bt as ne,Nn as p,Tt as m,it as h,q as re}from"./angular-preview-Bvv51cL-.js";import{B as ie,T as g,V as _,g as ae,j as v,w as y}from"./ProgressIndicator-CXNTCbma.js";import{t as b}from"./stylingHooks-PqiNJdev.js";import{i as oe,n as se,r as ce,t as le}from"./context-ESLv39g4.js";import{t as ue}from"./dataAttributes-CDHeJa9q.js";import{n as de,t as fe}from"./useFocusModality-PNhyC6fY.js";import{n as pe,t as me}from"./Input-CczNyxGC.js";import{n as x,t as he}from"./cascader.module.scss-CIh4vjki.js";import{i as S,r as C}from"./DemoBlock-yJ6oj9cP.js";import{l as ge,n as _e,t as ve,u as ye}from"./DocPage-B93OiV4a.js";var w,T,E,be;function xe(){return(xe=e((()=>{p(),_(),g(),r(),he(),w=t(),T=n(),E=`[role="option"]:not([aria-disabled="true"])`,be=({label:e,options:t,expandedPath:n,selectedPath:r,expandTrigger:i=`click`,maxLevel:a=6,optionRender:o,optionStyle:s,autoFocus:c=!1,onActivate:l,onHoverExpand:ee,onExit:u})=>{let{t:d}=ie(),f=(0,w.useRef)(null),te=(0,w.useId)(),ne=e=>`${te}-column-${e}`,p=(0,w.useRef)(c?-1:null),m=[t];for(let e=0;e<n.length&&e<a-1;e+=1){let t=n[e].children;if(!t?.length)break;m.push(t)}let g=e=>f.current?.querySelector(`[data-level="${e}"]`),_=e=>{let t=g(e);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(E);return n?.focus(),!!n};(0,w.useEffect)(()=>{let e=p.current;if(e===null)return;let t=e===-1?m.length-1:e;_(t)&&(p.current=null)});let v=(e,t)=>[...n.slice(0,t),e],y=(e,t)=>t<a-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0),oe=(e,t,n)=>{let r=Array.from(e.currentTarget.parentElement?.querySelectorAll(E)??[]),i=r.indexOf(e.currentTarget),a=e=>r[(e+r.length)%r.length]?.focus();switch(re(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),a(i+1);break;case`ArrowUp`:e.preventDefault(),a(i-1);break;case`Home`:e.preventDefault(),a(0);break;case`End`:e.preventDefault(),a(r.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!y(t,n))break;p.current=n+1,l(v(t,n),n);break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;y(t,n)&&(p.current=n+1),l(v(t,n),n);break;case`ArrowLeft`:e.preventDefault(),n===0?u?.():_(n-1)}};return(0,T.jsx)(`div`,{className:x.panel,ref:f,children:m.map((t,c)=>(0,T.jsx)(`ul`,{id:ne(c),"data-level":c,className:x.column,...b(`cascader`,`column`),role:`listbox`,"aria-label":d(`cascader.level`,{label:e??d(`cascader.options`),level:c+1}),children:t.map(e=>{let t=n[c]?.value===e.value,u=r[c]?.value===e.value,d=u&&c===r.length-1,f=y(e,c)&&!(!e.children?.length&&e.isLeaf);return(0,T.jsx)(`li`,{className:h(x.option,{[x.active]:t||u,[x.disabled]:e.disabled,[x.loading]:e.loading}),style:s,...b(`cascader`,`item`,{selected:u,expanded:t&&!d,disabled:e.disabled,loading:e.loading}),role:`option`,"aria-selected":u,"aria-disabled":e.disabled||void 0,"aria-busy":e.loading||void 0,"aria-controls":t&&c+1<m.length?ne(c+1):void 0,tabIndex:e.disabled?-1:0,onKeyDown:t=>oe(t,e,c),onClick:()=>{e.disabled||l(v(e,c),c)},onMouseEnter:()=>{i===`hover`&&!e.disabled&&e.children?.length&&c<a-1&&ee?.(v(e,c))},children:o?o(e,c):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`span`,{className:x.label,children:e.label}),e.loading?(0,T.jsx)(`span`,{className:x.loadingIndicator,"aria-hidden":!0,children:`...`}):f&&(0,T.jsx)(ae,{className:x.expandIcon,"aria-hidden":!0})]})},e.value)})},c))})}})))()}var D,O,Se,Ce,k;function A(){return(A=e((()=>{p(),_(),g(),ee(),c(),se(),o(),fe(),pe(),he(),xe(),D=t(),O=n(),Se=[],Ce=[],k=({ref:e,label:t,name:n,options:r=Se,value:a,defaultValue:o,onChange:s,displayRender:c,disabled:l,readOnly:ee,required:f,invalid:te,id:p,"aria-label":re,"aria-labelledby":g,"aria-describedby":_,style:ae,placeholder:se,allowClear:fe=!0,expandTrigger:pe=`click`,className:he,showSearch:S=!1,filter:C,loadData:ge,dropdownClassName:_e,optionRender:ve,width:ye=240,maxLevel:w=6,dropdownStyle:T,optionStyle:E,...xe})=>{let{t:k}=ie(),A=oe(),we=le({id:p,"aria-describedby":_}),j=l??A?.disabled??!1,M=ee??A?.readOnly??!1,N=f??A?.required??!1,Te=te??A?.invalid??!1,Ee=g??(A&&!re?A.labelId:void 0),[P,F]=u({value:a,defaultValue:o??Ce,name:`Cascader`}),I=(0,D.useMemo)(()=>m(r,P),[r,P]),[L,R]=(0,D.useState)(!1),[z,B]=(0,D.useState)(!1),[De,V]=(0,D.useState)([]),Oe=(0,D.useMemo)(()=>m(r,De),[r,De]),[H,U]=(0,D.useState)(``),[W,G]=(0,D.useState)(null),ke=de(),Ae=d(ke,G),[K,je]=(0,D.useState)(null),Me=d(je,e),q=(0,D.useRef)(null),J=S&&H!==``,Y=(0,D.useMemo)(()=>{if(!J)return[];let e=H.toLowerCase();return ne(r).filter(({path:t})=>C?C(H,t):t.some(t=>String(t.label).toLowerCase().includes(e)))},[J,H,r,C]),X=(e=!1)=>{j||M||(V(P),B(e),R(!0))},Z=(e=!1)=>{R(!1),U(``),e&&K?.focus()},Q=e=>{let t=e.map(e=>e.value);F(t),s?.(t,e),Z(!0)},Ne=(e,t)=>{let n=e[e.length-1];if(n.disabled)return;let r=t>=w-1,i=!!n.children?.length,a=!!ge&&!n.isLeaf&&!n.children;if(!r&&(i||a)){V(e.map(e=>e.value)),a&&!n.loading&&ge?.(e);return}Q(e)},Pe=()=>{F(Ce),s?.([],[]),U(``),K?.focus()};(0,D.useEffect)(()=>{K&&(K.setAttribute(`role`,`combobox`),K.setAttribute(`aria-haspopup`,`listbox`),K.setAttribute(`aria-expanded`,String(L)),S&&K.setAttribute(`aria-autocomplete`,`list`))},[K,L,S]);let Fe=e=>{let t=e.relatedTarget;L&&t&&(W?.contains(t)||q.current?.contains(t)||Z())},Ie=()=>q.current?.querySelector(`[role="option"]`)?.focus(),Le=e=>{switch(e.key){case`ArrowDown`:e.preventDefault(),L?J?Ie():B(!0):X(!0);break;case`Enter`:e.preventDefault(),L||X(!0);break;case` `:if(S)break;e.preventDefault(),L||X(!0)}},Re=I.map(e=>String(e.label)),ze=J?H:c?c(Re,I):Re.join(` / `),Be=()=>(0,O.jsx)(`div`,{className:x.searchResults,role:`listbox`,"aria-label":t,tabIndex:-1,onKeyDown:e=>{let t=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)),n=t.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),t[(n+(e.key===`ArrowDown`?1:-1)+t.length)%t.length]?.focus())},children:Y.length>0?Y.map(({path:e})=>(0,O.jsx)(`div`,{className:x.searchOption,...b(`cascader`,`item`),role:`option`,"aria-selected":!1,tabIndex:0,onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),Q(e))},onClick:()=>Q(e),children:e.map(e=>e.label).join(` / `)},e.map(e=>e.value).join(`/`))):(0,O.jsx)(`div`,{className:x.empty,role:`status`,children:k(`cascader.noResults`)})}),Ve=(0,O.jsx)(i,{ref:q,open:L,anchor:W,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[W],onDismiss:()=>Z(),returnFocusOnEscape:()=>K,focusable:!0,className:h(x.dropdown,_e),style:T,onMouseDown:e=>{e.target.closest(`[role="option"]`)||e.preventDefault()},onBlur:Fe,onKeyDown:e=>{e.key===`Tab`&&Z()},...b(`cascader`,`content`,{state:`open`}),children:J?Be():(0,O.jsx)(be,{label:t,options:r,expandedPath:Oe,selectedPath:I,expandTrigger:pe,maxLevel:w,optionStyle:E,optionRender:ve,autoFocus:z,onActivate:Ne,onHoverExpand:e=>V(e.map(e=>e.value)),onExit:()=>Z(!0)},z?`keyboard`:`pointer`)});return(0,O.jsxs)(`div`,{...ue(xe),className:h(x.cascader,he),ref:Ae,style:{width:ye,...ae},onBlur:Fe,...b(`cascader`,`root`,{state:L?`open`:`closed`,disabled:j,readonly:M,invalid:Te}),children:[(0,O.jsxs)(`div`,{className:h(x.selector,{[x.disabled]:j,[x.focused]:L}),onClick:()=>{j||M||(L?S||Z():X())},...b(`cascader`,`control`),children:[(0,O.jsx)(ce.Provider,{value:null,children:(0,O.jsx)(me,{ref:Me,variant:`unstyled`,id:we.id,"aria-label":re??t,"aria-labelledby":Ee,"aria-describedby":we[`aria-describedby`],"aria-invalid":Te||void 0,"aria-required":N||void 0,"aria-readonly":S&&M||void 0,required:N,name:n,value:ze,readOnly:!S||M,disabled:j,placeholder:se??k(`cascader.placeholder`),className:x.input,onChange:e=>{S&&!M&&(U(e.target.value),L||X())},onKeyDown:Le})}),fe&&P.length>0&&!j&&!M&&(0,O.jsx)(`button`,{type:`button`,className:x.clearIcon,"aria-label":k(`cascader.clear`),...b(`cascader`,`clear-button`),onClick:e=>{e.stopPropagation(),Pe()},children:(0,O.jsx)(y,{className:x.icon,"aria-hidden":!0,focusable:!1})}),(0,O.jsx)(`span`,{className:h(x.arrow,L&&x.open),"aria-hidden":`true`,...b(`cascader`,`icon`),children:(0,O.jsx)(v,{className:x.icon})})]}),Ve]})}})))()}function we(){return(0,j.jsx)(k,{name:`city`,label:`City`,options:M})}var j,M;function N(){return(N=e((()=>{A(),j=n(),M=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Te(){let[e,t]=(0,Ee.useState)([`fr`,`idf`,`paris`]);return(0,P.jsxs)(`div`,{children:[(0,P.jsx)(k,{name:`city-controlled`,label:`City`,options:F,value:e,onChange:e=>t(e),width:300}),(0,P.jsxs)(`p`,{children:[`Value: `,e.length?JSON.stringify(e):`(empty)`]})]})}var Ee,P,F;function I(){return(I=e((()=>{Ee=t(),A(),P=n(),F=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function L(){return(0,R.jsx)(k,{name:`region`,label:`Region (2 levels)`,options:z,maxLevel:2,optionRender:(e,t)=>(0,R.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[t===0?(0,R.jsx)(a,{size:`1em`}):(0,R.jsx)(l,{size:`1em`}),e.label]}),dropdownStyle:{minWidth:360},optionStyle:{fontWeight:500}})}var R,z;function B(){return(B=e((()=>{s(),A(),R=n(),z=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function De(){return(0,V.jsx)(k,{name:`city-default`,label:`City`,options:Oe,defaultValue:[`jp`,`kansai`,`kyoto`],width:300})}var V,Oe;function H(){return(H=e((()=>{A(),V=n(),Oe=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function U(){return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(k,{name:`location`,label:`Location`,options:G}),(0,W.jsx)(k,{name:`location-disabled`,label:`Disabled`,options:G,defaultValue:[`a`,`a1`],disabled:!0})]})}var W,G;function ke(){return(ke=e((()=>{A(),W=n(),G=[{value:`a`,label:`Warehouse A`,children:[{value:`a1`,label:`Shelf 1`},{value:`a2`,label:`Shelf 2 (full)`,disabled:!0}]},{value:`b`,label:`Warehouse B (closed)`,disabled:!0}]})))()}function Ae(){return(0,K.jsx)(k,{name:`city-display`,label:`City (last level only)`,options:je,defaultValue:[`fr`,`ara`,`lyon`],displayRender:e=>e[e.length-1]??``,allowClear:!1})}var K,je;function Me(){return(Me=e((()=>{A(),K=n(),je=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function q(){return(0,J.jsx)(k,{name:`city-hover`,label:`City`,options:Y,expandTrigger:`hover`})}var J,Y;function X(){return(X=e((()=>{A(),J=n(),Y=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}function Z(){let[e,t]=(0,Q.useState)(Pe);return(0,Ne.jsx)(k,{name:`team`,label:`Team`,options:e,loadData:e=>{let n=e[e.length-1],r=e=>t(t=>t.map(t=>t.value===n.value?{...t,...e}:t));r({loading:!0}),setTimeout(()=>{r({loading:!1,children:[{value:`${n.value}-team-a`,label:`${n.label} team A`,isLeaf:!0},{value:`${n.value}-team-b`,label:`${n.label} team B`,isLeaf:!0}]})},800)},width:300})}var Q,Ne,Pe;function Fe(){return(Fe=e((()=>{Q=t(),A(),Ne=n(),Pe=[{value:`frontend`,label:`Frontend`},{value:`backend`,label:`Backend`},{value:`docs`,label:`Documentation`,isLeaf:!0}]})))()}function Ie(){return(0,Le.jsx)(k,{name:`city-search`,label:`City`,placeholder:`Type to search`,options:Re,showSearch:!0,filter:(e,t)=>t.some(t=>String(t.label).toLowerCase().includes(e.toLowerCase())),width:300})}var Le,Re;function ze(){return(ze=e((()=>{A(),Le=n(),Re=[{value:`fr`,label:`France`,children:[{value:`idf`,label:`Île-de-France`,children:[{value:`paris`,label:`Paris`},{value:`versailles`,label:`Versailles`}]},{value:`ara`,label:`Auvergne-Rhône-Alpes`,children:[{value:`lyon`,label:`Lyon`},{value:`grenoble`,label:`Grenoble`}]}]},{value:`jp`,label:`Japan`,children:[{value:`kanto`,label:`Kantō`,children:[{value:`tokyo`,label:`Tokyo`},{value:`yokohama`,label:`Yokohama`}]},{value:`kansai`,label:`Kansai`,children:[{value:`osaka`,label:`Osaka`},{value:`kyoto`,label:`Kyoto`}]}]}]})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { Cascader, type CascaderOption } from "minerva-design";

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
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { GlobeIcon, MapPinIcon } from "minerva-design/icons";
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

export default function CustomOptionDemo() {
  return (
    <Cascader
      name="region"
      label="Region (2 levels)"
      options={options}
      maxLevel={2}
      optionRender={(option, level) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {level === 0 ? <GlobeIcon size="1em" /> : <MapPinIcon size="1em" />}
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
`})))()}var $,it,at;function ot(){return(ot=e((()=>{N(),I(),B(),H(),ke(),Me(),X(),Fe(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),rt(),t(),te(),_e(),ye(),S(),$=n(),it=ge(Object.assign({"./demos/basic.tsx":we,"./demos/controlled.tsx":Te,"./demos/custom-option.tsx":L,"./demos/default-value.tsx":De,"./demos/disabled.tsx":U,"./demos/display-render.tsx":Ae,"./demos/hover.tsx":q,"./demos/lazy-load.tsx":Z,"./demos/search.tsx":Ie}),Object.assign({"./demos/basic.tsx":Be,"./demos/controlled.tsx":He,"./demos/custom-option.tsx":We,"./demos/default-value.tsx":Ke,"./demos/disabled.tsx":Je,"./demos/display-render.tsx":Xe,"./demos/hover.tsx":Qe,"./demos/lazy-load.tsx":et,"./demos/search.tsx":nt})),at=()=>{let{t:e}=f();return(0,$.jsx)(ve,{id:`cascader`,demos:it,children:(0,$.jsxs)(`section`,{className:C.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.cascader.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:C.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.expand`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.cascader.keyboard.aria`)})]})]})})}})))()}ot();export{at as default};