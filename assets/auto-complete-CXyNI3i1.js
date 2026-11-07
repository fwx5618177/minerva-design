import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{J as i,_t as a,bt as ee,q as te,vt as ne,xt as re}from"./io5-DGxLJ5Qx.js";import{n as ie,t as ae}from"./useTranslation-ss8R85Lm.js";import{F as o,Mn as s,rt as c,st as oe}from"./angular-preview-CxN7u9Fp.js";import{n as l,t as se}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as u}from"./stylingHooks-PqiNJdev.js";import{n as ce,t as le}from"./context-ESLv39g4.js";import{n as ue,t as d}from"./Input-7FBYvGJB.js";import{n as f,t as de}from"./Empty-CKig4Ef6.js";import{n as p,t as fe}from"./autoComplete.module.scss-DijMEPfF.js";import{i as m,r as h}from"./DemoBlock-kQ5yzRIZ.js";import{l as pe,n as g,t as me,u as he}from"./DocPage-CHK7u0tQ.js";import{g as ge,h as _e,l as ve,n as ye,t as be}from"./fa-CS6fBfeQ.js";var _,v,xe,y,Se,b;function x(){return(x=t((()=>{s(),l(),ee(),ne(),ce(),i(),d(),f(),fe(),_=e(n(),1),v=r(),o(),xe=Object.freeze({x:0,y:4}),y=[],Se={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},b=({ref:e,name:t,label:n,mode:r=`basic`,value:i,onChange:ee,options:ne=y,defaultValue:ie,onSelect:ae,filterOption:o,groupBy:s,renderOption:l,renderEmpty:ce,loading:d=!1,inputProps:f,emptyProps:fe,placement:m=`bottom`,offset:h=xe,animation:pe=!0,sortOption:g,onOptionClick:me,onDropdownVisibleChange:he,dropdownClassName:ge,onSubmit:_e,autoHighlight:ve=!1,fillOnSelect:ye=!0,className:be,groupMode:b=`first`})=>{let[x,S]=a({value:i,defaultValue:ie??``,onChange:ee,name:`AutoComplete`}),[C,w]=a({defaultValue:!1,onChange:he,name:`AutoComplete`,prop:`open`}),[T,E]=(0,_.useState)(null),[Ce,D]=(0,_.useState)(-1),[O,k]=(0,_.useState)(null),[A,we]=(0,_.useState)(null),j=re(we,e),[Te,Ee]=(0,_.useState)(null),De=m===`top`||m===`bottom`,M=(0,_.useId)(),N=`${M}-listbox`,P=(0,_.useRef)(!1),F=le({id:f?.id,disabled:f?.disabled,readOnly:f?.readOnly}),Oe=F.id??`${M}-input`,I=!!F.disabled||!!F.readOnly,L=C&&!I,R=()=>{I||w(!0)},z=()=>{w(!1),E(null)},B=(0,_.useMemo)(()=>{let e=x.toLowerCase(),t=ne.filter(t=>o?o(x,t):t.label.toLowerCase().includes(e));return g?[...t].sort(g):t},[ne,x,o,g]),V=(0,_.useMemo)(()=>{if(!s)return null;if(b===`adjacent`){let e=[];return B.forEach(t=>{let n=s(t),r=e[e.length-1];r&&r[0]===n?r[1].push(t):e.push([n,[t]])}),e}let e=new Map;return B.forEach(t=>{let n=s(t),r=e.get(n);r?r.push(t):e.set(n,[t])}),Array.from(e.entries())},[B,s,b]),H=(0,_.useMemo)(()=>V?V.flatMap(([,e])=>e):B,[V,B]),U=d?y:H,W=oe(U,T,ve&&L),G=e=>{let t=U.length;if(t===0)return;let n=W>=0?W:e===1?-1:t;for(let r=0;r<t;r+=1)if(n=(n+e+t)%t,!U[n].disabled){E(U[n].value);return}},K=e=>{e.disabled||(ye&&S(e.label),z(),ae?.(e))},ke=e=>{if(!(I||P.current||e.nativeEvent.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:e.preventDefault(),C||R(),G(1);break;case`ArrowUp`:e.preventDefault(),C||R(),G(-1);break;case`Enter`:{let t=L?U[W]:void 0;t?(e.preventDefault(),K(t)):_e&&x.trim()&&(e.preventDefault(),_e(x.trim()),z());break}case`Escape`:!L&&x!==``&&(e.preventDefault(),S(``),E(null))}},q=e=>{S(e),E(null),R()},Ae=e=>{let t=e.relatedTarget;t&&(Te?.contains(t)||O?.contains(t))||z()},J=e=>{e.disabled||P.current||(K(e),me?.(e),A?.focus())},Y=L&&W>=0?`${N}-option-${W}`:void 0;(0,_.useEffect)(()=>{A&&(A.setAttribute(`role`,`combobox`),A.setAttribute(`aria-autocomplete`,`list`),A.setAttribute(`aria-expanded`,String(L)),!L&&x!==``?A.setAttribute(`data-minerva-escape-consumer`,``):A.removeAttribute(`data-minerva-escape-consumer`),L?A.setAttribute(`aria-controls`,N):A.removeAttribute(`aria-controls`),Y?A.setAttribute(`aria-activedescendant`,Y):A.removeAttribute(`aria-activedescendant`))},[A,L,N,Y,x]);let X=(0,_.useRef)(()=>{});(0,_.useEffect)(()=>{X.current=()=>{C||R()}}),(0,_.useEffect)(()=>{if(!A)return;let e=()=>X.current();return A.addEventListener(`click`,e),()=>A.removeEventListener(`click`,e)},[A]),(0,_.useEffect)(()=>{Y&&document.getElementById(Y)?.scrollIntoView?.({block:`nearest`})},[Y]);let Z=e=>(0,v.jsxs)(`div`,{className:p.basicOption,children:[e.icon&&(0,v.jsx)(`span`,{className:p.icon,children:e.icon}),(0,v.jsxs)(`div`,{className:p.content,children:[(0,v.jsx)(`div`,{className:p.label,children:e.label}),e.description&&(0,v.jsx)(`div`,{className:p.description,children:e.description})]})]}),Q=(e,t)=>{let n=W===t,i=Ce===t||n;return(0,v.jsx)(`div`,{className:c(p.optionItem,{[p.disabled]:e.disabled,[p.highlight]:e.highlight,[p.active]:i}),style:e.style,role:`option`,tabIndex:-1,id:`${N}-option-${t}`,"aria-selected":n,"aria-disabled":e.disabled||void 0,onMouseDown:e=>e.preventDefault(),onClick:()=>J(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),J(e))},onMouseEnter:()=>D(t),onMouseLeave:()=>D(-1),...u(`autocomplete`,`item`,{highlighted:i,disabled:e.disabled}),children:r===`custom`&&l?l(e):Z(e)},e.value)};return(0,v.jsxs)(`div`,{ref:k,className:c(p.autoComplete,be),onCompositionStart:()=>{P.current=!0},onCompositionEnd:()=>{P.current=!1},...u(`autocomplete`,`root`,{state:L?`open`:`closed`,disabled:!!F.disabled,readonly:!!F.readOnly,loading:d}),children:[n&&(0,v.jsx)(`label`,{htmlFor:Oe,className:p.label,...u(`autocomplete`,`label`),children:n}),(0,v.jsx)(ue,{...f,id:Oe,disabled:F.disabled,readOnly:F.readOnly,name:t,ref:j,value:x,onChange:e=>q(e.target.value),onFocus:e=>{R(),f?.onFocus?.(e)},onBlur:e=>{Ae(e),f?.onBlur?.(e)},onKeyDown:e=>{ke(e),f?.onKeyDown?.(e)}}),(0,v.jsx)(te,{ref:Ee,open:L,anchor:O,placement:Se[m],offset:{mainAxis:De?h.y:h.x,crossAxis:De?h.x:h.y},matchAnchorWidth:`min`,branches:()=>[O],onEscapeKeyDown:e=>{(P.current||e.isComposing)&&e.preventDefault()},onDismiss:z,returnFocusOnEscape:()=>A,className:c(p.popup,ge),...u(`autocomplete`,`content`,{state:`open`}),children:(0,v.jsx)(`div`,{className:c(p.dropdown,pe&&p.animated),children:(0,v.jsx)(`div`,{className:p.optionList,role:`listbox`,id:N,"aria-label":n,"aria-busy":d||void 0,...u(`autocomplete`,`list`),children:d?(0,v.jsx)(`div`,{role:`presentation`,className:p.loading,...u(`autocomplete`,`loading`),children:(0,v.jsx)(se,{})}):B.length>0?(0,v.jsx)(v.Fragment,{children:V?V.map(([e,t],n)=>e===``?(0,v.jsx)(_.Fragment,{children:t.map(e=>Q(e,H.indexOf(e)))},`${n}-`):(0,v.jsxs)(`div`,{className:p.optionGroup,role:`group`,"aria-label":e,children:[(0,v.jsx)(`div`,{className:p.groupLabel,"aria-hidden":`true`,...u(`autocomplete`,`group-label`),children:e}),t.map(e=>Q(e,H.indexOf(e)))]},`${n}-${e}`)):B.map((e,t)=>Q(e,t))}):(0,v.jsx)(`div`,{role:`presentation`,className:p.empty,...u(`autocomplete`,`empty`),children:ce?.()||(0,v.jsx)(de,{...fe})})})})})]})}})))()}function S(){return(0,C.jsxs)(`div`,{style:{width:280,marginTop:180},children:[(0,C.jsx)(`style`,{children:T}),(0,C.jsx)(b,{name:`priority`,label:`Priority (opens above)`,options:w,placement:`top`,offset:{x:0,y:8},animation:!1,dropdownClassName:`priority-dropdown`})]})}var C,w,T;function E(){return(E=t((()=>{x(),C=r(),w=[{label:`Low`,value:`low`},{label:`Medium`,value:`medium`,highlight:!0},{label:`High`,value:`high`},{label:`Critical`,value:`critical`}],T=`
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
`})))()}function Ce(){let[e,t]=(0,D.useState)(``),[n,r]=(0,D.useState)(!0),[i,a]=(0,D.useState)([]);return(0,D.useEffect)(()=>{let t=setTimeout(()=>{a(k.filter(t=>t.toLowerCase().includes(e.toLowerCase())).map(e=>({label:e,value:e}))),r(!1)},600);return()=>clearTimeout(t)},[e]),(0,O.jsx)(`div`,{style:{width:280},children:(0,O.jsx)(b,{name:`mission`,label:`Space mission`,options:i,value:e,onChange:e=>{t(e),r(!0)},loading:n})})}var D,O,k;function A(){return(A=t((()=>{D=n(),x(),O=r(),k=[`Apollo`,`Artemis`,`Gemini`,`Mercury`,`Skylab`,`Voyager`]})))()}function we(){return(0,j.jsx)(`div`,{style:{width:280},children:(0,j.jsx)(b,{name:`framework`,label:`Framework`,options:Te,inputProps:{placeholder:`Type to search…`}})})}var j,Te;function Ee(){return(Ee=t((()=>{x(),j=r(),Te=[{label:`React`,value:`react`},{label:`Vue`,value:`vue`},{label:`Angular`,value:`angular`},{label:`Svelte`,value:`svelte`},{label:`Solid`,value:`solid`}]})))()}function De(){let[e,t]=(0,M.useState)(``),[n,r]=(0,M.useState)(),[i,a]=(0,M.useState)(!1);return(0,N.jsxs)(`div`,{style:{width:280},children:[(0,N.jsx)(b,{name:`city`,label:`City`,options:P,value:e,onChange:t,onSelect:r,onDropdownVisibleChange:a}),(0,N.jsxs)(`p`,{children:[`Input: “`,e,`”`]}),(0,N.jsxs)(`p`,{children:[`Selected value: `,n?n.value:`none`]}),(0,N.jsxs)(`p`,{children:[`Dropdown: `,i?`open`:`closed`]})]})}var M,N,P;function F(){return(F=t((()=>{M=n(),x(),N=r(),P=[{label:`Paris`,value:`par`},{label:`London`,value:`lon`},{label:`Tokyo`,value:`tyo`},{label:`New York`,value:`nyc`}]})))()}function Oe(){return(0,I.jsx)(`div`,{style:{width:320},children:(0,I.jsx)(b,{name:`assignee`,label:`Assignee`,mode:`custom`,options:L,renderOption:e=>(0,I.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:12},children:[(0,I.jsx)(`strong`,{children:e.label}),(0,I.jsx)(`span`,{style:{opacity:.7},children:e.description})]}),renderEmpty:()=>(0,I.jsx)(`div`,{style:{padding:12},children:`No user found`})})})}var I,L;function R(){return(R=t((()=>{x(),I=r(),L=[{label:`Ada Lovelace`,value:`ada`,description:`ada@example.com`},{label:`Alan Turing`,value:`alan`,description:`alan@example.com`},{label:`Grace Hopper`,value:`grace`,description:`grace@example.com`}]})))()}function z(){return(0,B.jsx)(`div`,{style:{width:280},children:(0,B.jsx)(b,{name:`country`,label:`Country (starts with)`,options:V,filterOption:(e,t)=>t.label.toLowerCase().startsWith(e.toLowerCase()),sortOption:(e,t)=>e.label.localeCompare(t.label)})})}var B,V;function H(){return(H=t((()=>{x(),B=r(),V=[{label:`Germany`,value:`de`},{label:`Denmark`,value:`dk`},{label:`France`,value:`fr`},{label:`Finland`,value:`fi`},{label:`Greece`,value:`gr`}]})))()}function U(){return(0,W.jsx)(`div`,{style:{width:280},children:(0,W.jsx)(b,{name:`food`,label:`Food`,options:G,groupBy:e=>e.group??`Other`})})}var W,G;function K(){return(K=t((()=>{x(),W=r(),G=[{label:`Apple`,value:`apple`,group:`Fruits`},{label:`Banana`,value:`banana`,group:`Fruits`},{label:`Carrot`,value:`carrot`,group:`Vegetables`},{label:`Broccoli`,value:`broccoli`,group:`Vegetables`},{label:`Almond`,value:`almond`,group:`Nuts`}]})))()}function ke(){return(0,q.jsx)(`div`,{style:{width:320},children:(0,q.jsx)(b,{name:`platform`,label:`Platform`,options:Ae})})}var q,Ae;function J(){return(J=t((()=>{x(),ge(),q=r(),Ae=[{label:`macOS`,value:`macos`,icon:(0,q.jsx)(ye,{}),description:`Recommended for this device`,highlight:!0},{label:`Windows`,value:`windows`,icon:(0,q.jsx)(_e,{}),description:`Windows 10 and later`},{label:`Linux`,value:`linux`,icon:(0,q.jsx)(ve,{}),description:`deb and rpm packages`},{label:`Android`,value:`android`,icon:(0,q.jsx)(be,{}),description:`Coming soon`,disabled:!0}]})))()}function Y(){let[e,t]=(0,X.useState)(``),[n,r]=(0,X.useState)(``);return(0,Z.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,Z.jsx)(b,{options:Q,value:e,onChange:t,autoHighlight:!0,fillOnSelect:!1,onSelect:e=>r(`Open book #${e.value}`),onSubmit:e=>r(`Search for "${e}"`),inputProps:{"aria-label":`Search books`,placeholder:`Title or author`,clearable:!0}}),(0,Z.jsx)(`span`,{children:n})]})}var X,Z,Q;function je(){return(je=t((()=>{X=n(),x(),Z=r(),Q=[{value:`1`,label:`Lord of the Mysteries`,description:`Cuttlefish`},{value:`2`,label:`Sword of Coming`,description:`Fenghuo`},{value:`3`,label:`A Record of a Mortal`,description:`Wangyu`}]})))()}var Me;function Ne(){return(Ne=t((()=>{Me=`import { AutoComplete } from "minerva-design";

const options = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium", highlight: true },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

// The dropdown is portalled to <body>: set the custom properties on the
// dropdown itself through dropdownClassName.
const css = \`
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
\`;

export default function AppearanceDemo() {
  return (
    <div style={{ width: 280, marginTop: 180 }}>
      <style>{css}</style>
      <AutoComplete
        name="priority"
        label="Priority (opens above)"
        options={options}
        placement="top"
        offset={{ x: 0, y: 8 }}
        animation={false}
        dropdownClassName="priority-dropdown"
      />
    </div>
  );
}
`})))()}var Pe;function Fe(){return(Fe=t((()=>{Pe=`import { useEffect, useState } from "react";
import { AutoComplete, type AutoCompleteOption } from "minerva-design";

const all = ["Apollo", "Artemis", "Gemini", "Mercury", "Skylab", "Voyager"];

export default function AsyncLoadingDemo() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);

  const search = (next: string) => {
    setQuery(next);
    setLoading(true);
  };

  useEffect(() => {
    // Simulate a request to a search API
    const timer = setTimeout(() => {
      setOptions(
        all
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((name) => ({ label: name, value: name })),
      );
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="mission"
        label="Space mission"
        options={options}
        value={query}
        onChange={search}
        loading={loading}
      />
    </div>
  );
}
`})))()}var Ie;function Le(){return(Le=t((()=>{Ie=`import { AutoComplete } from "minerva-design";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
];

export default function BasicDemo() {
  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="framework"
        label="Framework"
        options={options}
        inputProps={{ placeholder: "Type to search…" }}
      />
    </div>
  );
}
`})))()}var Re;function ze(){return(ze=t((()=>{Re=`import { useState } from "react";
import { AutoComplete, type AutoCompleteOption } from "minerva-design";

const options = [
  { label: "Paris", value: "par" },
  { label: "London", value: "lon" },
  { label: "Tokyo", value: "tyo" },
  { label: "New York", value: "nyc" },
];

export default function ControlledDemo() {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<AutoCompleteOption>();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="city"
        label="City"
        options={options}
        value={text}
        onChange={setText}
        onSelect={setSelected}
        onDropdownVisibleChange={setOpen}
      />
      <p>Input: “{text}”</p>
      <p>Selected value: {selected ? selected.value : "none"}</p>
      <p>Dropdown: {open ? "open" : "closed"}</p>
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=t((()=>{Be=`import { AutoComplete } from "minerva-design";

const users = [
  { label: "Ada Lovelace", value: "ada", description: "ada@example.com" },
  { label: "Alan Turing", value: "alan", description: "alan@example.com" },
  { label: "Grace Hopper", value: "grace", description: "grace@example.com" },
];

export default function CustomRenderDemo() {
  return (
    <div style={{ width: 320 }}>
      <AutoComplete
        name="assignee"
        label="Assignee"
        mode="custom"
        options={users}
        renderOption={(option) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <strong>{option.label}</strong>
            <span style={{ opacity: 0.7 }}>{option.description}</span>
          </div>
        )}
        renderEmpty={() => <div style={{ padding: 12 }}>No user found</div>}
      />
    </div>
  );
}
`})))()}var He;function Ue(){return(Ue=t((()=>{He=`import { AutoComplete } from "minerva-design";

const options = [
  { label: "Germany", value: "de" },
  { label: "Denmark", value: "dk" },
  { label: "France", value: "fr" },
  { label: "Finland", value: "fi" },
  { label: "Greece", value: "gr" },
];

export default function FilterSortDemo() {
  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="country"
        label="Country (starts with)"
        options={options}
        filterOption={(input, option) =>
          option.label.toLowerCase().startsWith(input.toLowerCase())
        }
        sortOption={(a, b) => a.label.localeCompare(b.label)}
      />
    </div>
  );
}
`})))()}var We;function Ge(){return(Ge=t((()=>{We=`import { AutoComplete } from "minerva-design";

const options = [
  { label: "Apple", value: "apple", group: "Fruits" },
  { label: "Banana", value: "banana", group: "Fruits" },
  { label: "Carrot", value: "carrot", group: "Vegetables" },
  { label: "Broccoli", value: "broccoli", group: "Vegetables" },
  { label: "Almond", value: "almond", group: "Nuts" },
];

export default function GroupedDemo() {
  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="food"
        label="Food"
        options={options}
        groupBy={(option) => option.group ?? "Other"}
      />
    </div>
  );
}
`})))()}var Ke;function qe(){return(qe=t((()=>{Ke=`import { AutoComplete } from "minerva-design";
import { FaApple, FaAndroid, FaLinux, FaWindows } from "react-icons/fa";

const options = [
  {
    label: "macOS",
    value: "macos",
    icon: <FaApple />,
    description: "Recommended for this device",
    highlight: true,
  },
  {
    label: "Windows",
    value: "windows",
    icon: <FaWindows />,
    description: "Windows 10 and later",
  },
  {
    label: "Linux",
    value: "linux",
    icon: <FaLinux />,
    description: "deb and rpm packages",
  },
  {
    label: "Android",
    value: "android",
    icon: <FaAndroid />,
    description: "Coming soon",
    disabled: true,
  },
];

export default function RichOptionsDemo() {
  return (
    <div style={{ width: 320 }}>
      <AutoComplete name="platform" label="Platform" options={options} />
    </div>
  );
}
`})))()}var Je;function Ye(){return(Ye=t((()=>{Je=`import { useState } from "react";
import { AutoComplete } from "minerva-design";

const books = [
  { value: "1", label: "Lord of the Mysteries", description: "Cuttlefish" },
  { value: "2", label: "Sword of Coming", description: "Fenghuo" },
  { value: "3", label: "A Record of a Mortal", description: "Wangyu" },
];

export default function SearchBoxDemo() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AutoComplete
        options={books}
        value={query}
        onChange={setQuery}
        autoHighlight
        fillOnSelect={false}
        onSelect={(book) => setResult(\`Open book #\${book.value}\`)}
        onSubmit={(text) => setResult(\`Search for "\${text}"\`)}
        inputProps={{
          "aria-label": "Search books",
          placeholder: "Title or author",
          clearable: true,
        }}
      />
      <span>{result}</span>
    </div>
  );
}
`})))()}var $,Xe,Ze;function Qe(){return(Qe=t((()=>{E(),A(),Ee(),F(),R(),H(),K(),J(),je(),Ne(),Fe(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),n(),ae(),g(),he(),m(),$=r(),Xe=pe(Object.assign({"./demos/appearance.tsx":S,"./demos/async-loading.tsx":Ce,"./demos/basic.tsx":we,"./demos/controlled.tsx":De,"./demos/custom-render.tsx":Oe,"./demos/filter-sort.tsx":z,"./demos/grouped.tsx":U,"./demos/rich-options.tsx":ke,"./demos/search-box.tsx":Y}),Object.assign({"./demos/appearance.tsx":Me,"./demos/async-loading.tsx":Pe,"./demos/basic.tsx":Ie,"./demos/controlled.tsx":Re,"./demos/custom-render.tsx":Be,"./demos/filter-sort.tsx":He,"./demos/grouped.tsx":We,"./demos/rich-options.tsx":Ke,"./demos/search-box.tsx":Je})),Ze=()=>{let{t:e}=ie();return(0,$.jsx)(me,{id:`auto-complete`,demos:Xe,children:(0,$.jsxs)(`section`,{className:h.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.auto-complete.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:h.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.arrows`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.enter`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.escape`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.aria`)})]})]})})}})))()}Qe();export{Ze as default};