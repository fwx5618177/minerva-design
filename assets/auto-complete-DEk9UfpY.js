import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{$ as i,Ct as a,Dt as o,Et as ee,Ot as te,Q as ne,St as re,Tt as ie}from"./io5-CsJcK0E2.js";import{It as s,T as c,ut as l}from"./angular-preview-l4x8c_2r.js";import{B as u,n as ae,t as oe}from"./ProgressIndicator-BhPa7d9i.js";import{n as se,t as ce}from"./context-ESLv39g4.js";import{n as le,t as d}from"./Input-DXZX7PAI.js";import{n as f,t as ue}from"./Empty-CH2Z71iV.js";import{n as p,t as de}from"./autoComplete.module.scss-DijMEPfF.js";import{i as m,r as h}from"./DemoBlock-BlhGv9r1.js";import{l as fe,n as g,t as pe,u as me}from"./DocPage-PfpTBKws.js";import{g as he,h as ge,l as _e,n as ve,t as ye}from"./fa-DoQG16TN.js";var _,v,be,xe,Se,y;function b(){return(b=t((()=>{s(),ae(),ie(),a(),se(),i(),d(),f(),de(),_=e(n(),1),v=r(),c(),be=Object.freeze({x:0,y:4}),xe=[],Se={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},y=({ref:e,name:t,label:n,mode:r=`basic`,value:i,onChange:a,options:o=xe,defaultValue:te,onSelect:ie,filterOption:s,groupBy:c,renderOption:ae,renderEmpty:se,loading:d=!1,inputProps:f,emptyProps:de,placement:m=`bottom`,offset:h=be,animation:fe=!0,sortOption:g,onOptionClick:pe,onDropdownVisibleChange:me,dropdownClassName:he,onSubmit:ge,autoHighlight:_e=!1,fillOnSelect:ve=!0,className:ye,groupMode:y=`first`})=>{let[b,x]=re({value:i,defaultValue:te??``,onChange:a,name:`AutoComplete`}),[S,C]=re({defaultValue:!1,onChange:me,name:`AutoComplete`,prop:`open`}),[w,T]=(0,_.useState)(-1),[Ce,E]=(0,_.useState)(-1),[D,O]=(0,_.useState)(null),[k,we]=(0,_.useState)(null),A=ee(we,e),[j,M]=(0,_.useState)(null),N=m===`top`||m===`bottom`,P=(0,_.useId)(),F=`${P}-listbox`,I=(0,_.useRef)(!1),L=ce({id:f?.id,disabled:f?.disabled,readOnly:f?.readOnly}),Te=L.id??`${P}-input`,R=!!L.disabled||!!L.readOnly,z=S&&!R,B=()=>{R||C(!0)},V=()=>{C(!1),T(-1)},H=(0,_.useMemo)(()=>{let e=b.toLowerCase(),t=o.filter(t=>s?s(b,t):t.label.toLowerCase().includes(e));return g?[...t].sort(g):t},[o,b,s,g]),U=(0,_.useMemo)(()=>{if(!c)return null;if(y===`adjacent`){let e=[];return H.forEach(t=>{let n=c(t),r=e[e.length-1];r&&r[0]===n?r[1].push(t):e.push([n,[t]])}),e}let e=new Map;return H.forEach(t=>{let n=c(t),r=e.get(n);r?r.push(t):e.set(n,[t])}),Array.from(e.entries())},[H,c,y]),W=(0,_.useMemo)(()=>U?U.flatMap(([,e])=>e):H,[U,H]),G=w>=0?w:_e&&z?W.findIndex(e=>!e.disabled):-1,K=e=>{let t=W.length;if(t===0)return;let n=G>=0?G:e===1?-1:t;for(let r=0;r<t;r+=1)if(n=(n+e+t)%t,!W[n].disabled){T(n);return}},q=e=>{e.disabled||(ve&&x(e.label),V(),ie?.(e))},Ee=e=>{if(!(R||I.current||e.nativeEvent.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:e.preventDefault(),S||B(),K(1);break;case`ArrowUp`:e.preventDefault(),S||B(),K(-1);break;case`Enter`:{let t=z?W[G]:void 0;t?(e.preventDefault(),q(t)):ge&&b.trim()&&(e.preventDefault(),ge(b.trim()),V());break}case`Escape`:!z&&b!==``&&(e.preventDefault(),x(``),T(-1))}},De=e=>{x(e),T(-1),B()},J=e=>{let t=e.relatedTarget;t&&(j?.contains(t)||D?.contains(t))||V()},Y=e=>{e.disabled||I.current||(q(e),pe?.(e),k?.focus())},X=z&&G>=0?`${F}-option-${G}`:void 0;(0,_.useEffect)(()=>{k&&(k.setAttribute(`role`,`combobox`),k.setAttribute(`aria-autocomplete`,`list`),k.setAttribute(`aria-expanded`,String(z)),!z&&b!==``?k.setAttribute(`data-minerva-escape-consumer`,``):k.removeAttribute(`data-minerva-escape-consumer`),z?k.setAttribute(`aria-controls`,F):k.removeAttribute(`aria-controls`),X?k.setAttribute(`aria-activedescendant`,X):k.removeAttribute(`aria-activedescendant`))},[k,z,F,X,b]);let Oe=(0,_.useRef)(()=>{});(0,_.useEffect)(()=>{Oe.current=()=>{S||B()}}),(0,_.useEffect)(()=>{if(!k)return;let e=()=>Oe.current();return k.addEventListener(`click`,e),()=>k.removeEventListener(`click`,e)},[k]),(0,_.useEffect)(()=>{X&&document.getElementById(X)?.scrollIntoView?.({block:`nearest`})},[X]);let Z=e=>(0,v.jsxs)(`div`,{className:p.basicOption,children:[e.icon&&(0,v.jsx)(`span`,{className:p.icon,children:e.icon}),(0,v.jsxs)(`div`,{className:p.content,children:[(0,v.jsx)(`div`,{className:p.label,children:e.label}),e.description&&(0,v.jsx)(`div`,{className:p.description,children:e.description})]})]}),Q=(e,t)=>{let n=G===t,i=Ce===t||n;return(0,v.jsx)(`div`,{className:l(p.optionItem,{[p.disabled]:e.disabled,[p.highlight]:e.highlight,[p.active]:i}),style:e.style,role:`option`,tabIndex:-1,id:`${F}-option-${t}`,"aria-selected":n,"aria-disabled":e.disabled||void 0,onMouseDown:e=>e.preventDefault(),onClick:()=>Y(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),Y(e))},onMouseEnter:()=>E(t),onMouseLeave:()=>E(-1),...u(`autocomplete`,`item`,{highlighted:i,disabled:e.disabled}),children:r===`custom`&&ae?ae(e):Z(e)},e.value)};return(0,v.jsxs)(`div`,{ref:O,className:l(p.autoComplete,ye),onCompositionStart:()=>{I.current=!0},onCompositionEnd:()=>{I.current=!1},...u(`autocomplete`,`root`,{state:z?`open`:`closed`,disabled:!!L.disabled,readonly:!!L.readOnly,loading:d}),children:[n&&(0,v.jsx)(`label`,{htmlFor:Te,className:p.label,...u(`autocomplete`,`label`),children:n}),(0,v.jsx)(le,{...f,id:Te,disabled:L.disabled,readOnly:L.readOnly,name:t,ref:A,value:b,onChange:e=>De(e.target.value),onFocus:e=>{B(),f?.onFocus?.(e)},onBlur:e=>{J(e),f?.onBlur?.(e)},onKeyDown:e=>{Ee(e),f?.onKeyDown?.(e)}}),(0,v.jsx)(ne,{ref:M,open:z,anchor:D,placement:Se[m],offset:{mainAxis:N?h.y:h.x,crossAxis:N?h.x:h.y},matchAnchorWidth:`min`,branches:()=>[D],onEscapeKeyDown:e=>{(I.current||e.isComposing)&&e.preventDefault()},onDismiss:V,returnFocusOnEscape:()=>k,className:l(p.popup,he),...u(`autocomplete`,`content`,{state:`open`}),children:(0,v.jsx)(`div`,{className:l(p.dropdown,fe&&p.animated),children:(0,v.jsx)(`div`,{className:p.optionList,role:`listbox`,id:F,"aria-label":n,"aria-busy":d||void 0,...u(`autocomplete`,`list`),children:d?(0,v.jsx)(`div`,{role:`presentation`,className:p.loading,...u(`autocomplete`,`loading`),children:(0,v.jsx)(oe,{})}):H.length>0?(0,v.jsx)(v.Fragment,{children:U?U.map(([e,t],n)=>e===``?(0,v.jsx)(_.Fragment,{children:t.map(e=>Q(e,W.indexOf(e)))},`${n}-`):(0,v.jsxs)(`div`,{className:p.optionGroup,role:`group`,"aria-label":e,children:[(0,v.jsx)(`div`,{className:p.groupLabel,"aria-hidden":`true`,...u(`autocomplete`,`group-label`),children:e}),t.map(e=>Q(e,W.indexOf(e)))]},`${n}-${e}`)):H.map((e,t)=>Q(e,t))}):(0,v.jsx)(`div`,{role:`presentation`,className:p.empty,...u(`autocomplete`,`empty`),children:se?.()||(0,v.jsx)(ue,{...de})})})})})]})}})))()}function x(){return(0,S.jsxs)(`div`,{style:{width:280,marginTop:180},children:[(0,S.jsx)(`style`,{children:w}),(0,S.jsx)(y,{name:`priority`,label:`Priority (opens above)`,options:C,placement:`top`,offset:{x:0,y:8},animation:!1,dropdownClassName:`priority-dropdown`})]})}var S,C,w;function T(){return(T=t((()=>{b(),S=r(),C=[{label:`Low`,value:`low`},{label:`Medium`,value:`medium`,highlight:!0},{label:`High`,value:`high`},{label:`Critical`,value:`critical`}],w=`
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
`})))()}function Ce(){let[e,t]=(0,E.useState)(``),[n,r]=(0,E.useState)(!0),[i,a]=(0,E.useState)([]);return(0,E.useEffect)(()=>{let t=setTimeout(()=>{a(O.filter(t=>t.toLowerCase().includes(e.toLowerCase())).map(e=>({label:e,value:e}))),r(!1)},600);return()=>clearTimeout(t)},[e]),(0,D.jsx)(`div`,{style:{width:280},children:(0,D.jsx)(y,{name:`mission`,label:`Space mission`,options:i,value:e,onChange:e=>{t(e),r(!0)},loading:n})})}var E,D,O;function k(){return(k=t((()=>{E=n(),b(),D=r(),O=[`Apollo`,`Artemis`,`Gemini`,`Mercury`,`Skylab`,`Voyager`]})))()}function we(){return(0,A.jsx)(`div`,{style:{width:280},children:(0,A.jsx)(y,{name:`framework`,label:`Framework`,options:j,inputProps:{placeholder:`Type to search…`}})})}var A,j;function M(){return(M=t((()=>{b(),A=r(),j=[{label:`React`,value:`react`},{label:`Vue`,value:`vue`},{label:`Angular`,value:`angular`},{label:`Svelte`,value:`svelte`},{label:`Solid`,value:`solid`}]})))()}function N(){let[e,t]=(0,P.useState)(``),[n,r]=(0,P.useState)(),[i,a]=(0,P.useState)(!1);return(0,F.jsxs)(`div`,{style:{width:280},children:[(0,F.jsx)(y,{name:`city`,label:`City`,options:I,value:e,onChange:t,onSelect:r,onDropdownVisibleChange:a}),(0,F.jsxs)(`p`,{children:[`Input: “`,e,`”`]}),(0,F.jsxs)(`p`,{children:[`Selected value: `,n?n.value:`none`]}),(0,F.jsxs)(`p`,{children:[`Dropdown: `,i?`open`:`closed`]})]})}var P,F,I;function L(){return(L=t((()=>{P=n(),b(),F=r(),I=[{label:`Paris`,value:`par`},{label:`London`,value:`lon`},{label:`Tokyo`,value:`tyo`},{label:`New York`,value:`nyc`}]})))()}function Te(){return(0,R.jsx)(`div`,{style:{width:320},children:(0,R.jsx)(y,{name:`assignee`,label:`Assignee`,mode:`custom`,options:z,renderOption:e=>(0,R.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:12},children:[(0,R.jsx)(`strong`,{children:e.label}),(0,R.jsx)(`span`,{style:{opacity:.7},children:e.description})]}),renderEmpty:()=>(0,R.jsx)(`div`,{style:{padding:12},children:`No user found`})})})}var R,z;function B(){return(B=t((()=>{b(),R=r(),z=[{label:`Ada Lovelace`,value:`ada`,description:`ada@example.com`},{label:`Alan Turing`,value:`alan`,description:`alan@example.com`},{label:`Grace Hopper`,value:`grace`,description:`grace@example.com`}]})))()}function V(){return(0,H.jsx)(`div`,{style:{width:280},children:(0,H.jsx)(y,{name:`country`,label:`Country (starts with)`,options:U,filterOption:(e,t)=>t.label.toLowerCase().startsWith(e.toLowerCase()),sortOption:(e,t)=>e.label.localeCompare(t.label)})})}var H,U;function W(){return(W=t((()=>{b(),H=r(),U=[{label:`Germany`,value:`de`},{label:`Denmark`,value:`dk`},{label:`France`,value:`fr`},{label:`Finland`,value:`fi`},{label:`Greece`,value:`gr`}]})))()}function G(){return(0,K.jsx)(`div`,{style:{width:280},children:(0,K.jsx)(y,{name:`food`,label:`Food`,options:q,groupBy:e=>e.group??`Other`})})}var K,q;function Ee(){return(Ee=t((()=>{b(),K=r(),q=[{label:`Apple`,value:`apple`,group:`Fruits`},{label:`Banana`,value:`banana`,group:`Fruits`},{label:`Carrot`,value:`carrot`,group:`Vegetables`},{label:`Broccoli`,value:`broccoli`,group:`Vegetables`},{label:`Almond`,value:`almond`,group:`Nuts`}]})))()}function De(){return(0,J.jsx)(`div`,{style:{width:320},children:(0,J.jsx)(y,{name:`platform`,label:`Platform`,options:Y})})}var J,Y;function X(){return(X=t((()=>{b(),he(),J=r(),Y=[{label:`macOS`,value:`macos`,icon:(0,J.jsx)(ve,{}),description:`Recommended for this device`,highlight:!0},{label:`Windows`,value:`windows`,icon:(0,J.jsx)(ge,{}),description:`Windows 10 and later`},{label:`Linux`,value:`linux`,icon:(0,J.jsx)(_e,{}),description:`deb and rpm packages`},{label:`Android`,value:`android`,icon:(0,J.jsx)(ye,{}),description:`Coming soon`,disabled:!0}]})))()}function Oe(){let[e,t]=(0,Z.useState)(``),[n,r]=(0,Z.useState)(``);return(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,Q.jsx)(y,{options:ke,value:e,onChange:t,autoHighlight:!0,fillOnSelect:!1,onSelect:e=>r(`Open book #${e.value}`),onSubmit:e=>r(`Search for "${e}"`),inputProps:{"aria-label":`Search books`,placeholder:`Title or author`,clearable:!0}}),(0,Q.jsx)(`span`,{children:n})]})}var Z,Q,ke;function Ae(){return(Ae=t((()=>{Z=n(),b(),Q=r(),ke=[{value:`1`,label:`Lord of the Mysteries`,description:`Cuttlefish`},{value:`2`,label:`Sword of Coming`,description:`Fenghuo`},{value:`3`,label:`A Record of a Mortal`,description:`Wangyu`}]})))()}var je;function Me(){return(Me=t((()=>{je=`import { AutoComplete } from "minerva-design";

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
`})))()}var Ne;function Pe(){return(Pe=t((()=>{Ne=`import { useEffect, useState } from "react";
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
`})))()}var Fe;function Ie(){return(Ie=t((()=>{Fe=`import { AutoComplete } from "minerva-design";

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
`})))()}var Le;function Re(){return(Re=t((()=>{Le=`import { useState } from "react";
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
`})))()}var ze;function Be(){return(Be=t((()=>{ze=`import { AutoComplete } from "minerva-design";

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
`})))()}var Ve;function He(){return(He=t((()=>{Ve=`import { AutoComplete } from "minerva-design";

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
`})))()}var Ue;function We(){return(We=t((()=>{Ue=`import { AutoComplete } from "minerva-design";

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
`})))()}var Ge;function Ke(){return(Ke=t((()=>{Ge=`import { AutoComplete } from "minerva-design";
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
`})))()}var qe;function Je(){return(Je=t((()=>{qe=`import { useState } from "react";
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
`})))()}var $,Ye,Xe;function Ze(){return(Ze=t((()=>{T(),k(),M(),L(),B(),W(),Ee(),X(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),Je(),n(),o(),g(),me(),m(),$=r(),Ye=fe(Object.assign({"./demos/appearance.tsx":x,"./demos/async-loading.tsx":Ce,"./demos/basic.tsx":we,"./demos/controlled.tsx":N,"./demos/custom-render.tsx":Te,"./demos/filter-sort.tsx":V,"./demos/grouped.tsx":G,"./demos/rich-options.tsx":De,"./demos/search-box.tsx":Oe}),Object.assign({"./demos/appearance.tsx":je,"./demos/async-loading.tsx":Ne,"./demos/basic.tsx":Fe,"./demos/controlled.tsx":Le,"./demos/custom-render.tsx":ze,"./demos/filter-sort.tsx":Ve,"./demos/grouped.tsx":Ue,"./demos/rich-options.tsx":Ge,"./demos/search-box.tsx":qe})),Xe=()=>{let{t:e}=te();return(0,$.jsx)(pe,{id:`auto-complete`,demos:Ye,children:(0,$.jsxs)(`section`,{className:h.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.auto-complete.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:h.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.arrows`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.enter`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.escape`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.aria`)})]})]})})}})))()}Ze();export{Xe as default};