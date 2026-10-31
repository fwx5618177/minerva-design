import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-rkoeN8eS.js";import{It as o,T as ee,ut as s}from"./angular-preview-l4x8c_2r.js";import{n as te,t as ne}from"./ProgressIndicator-BMZ0rR7D.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{n as l,t as re}from"./context-ESLv39g4.js";import{Q as u,St as d,Tt as ie,Z as ae,wt as oe,xt as se}from"./io5-DWV9qlxB.js";import{n as ce,t as f}from"./Input-LfOOMgLE.js";import{n as p,t as le}from"./Empty-wk4o-NOT.js";import{n as m,t as ue}from"./autoComplete.module.scss-DijMEPfF.js";import{i as h,r as g}from"./DemoBlock-DvPmV2UV.js";import{l as de,n as _,t as fe,u as pe}from"./DocPage-BbPSunu1.js";import{g as me,h as he,l as ge,n as _e,t as ve}from"./fa-BbGgo7YE.js";var v,y,ye,be,xe,b;function x(){return(x=t((()=>{o(),te(),oe(),d(),l(),u(),f(),p(),ue(),v=e(n(),1),y=r(),ee(),ye=Object.freeze({x:0,y:4}),be=[],xe={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},b=({ref:e,name:t,label:n,mode:r=`basic`,value:i,onChange:a,options:o=be,defaultValue:ee,onSelect:te,filterOption:l,groupBy:u,renderOption:d,renderEmpty:oe,loading:f=!1,inputProps:p,emptyProps:ue,placement:h=`bottom`,offset:g=ye,animation:de=!0,sortOption:_,onOptionClick:fe,onDropdownVisibleChange:pe,dropdownClassName:me,onSubmit:he,autoHighlight:ge=!1,fillOnSelect:_e=!0,className:ve,groupMode:b=`first`})=>{let[x,S]=se({value:i,defaultValue:ee??``,onChange:a,name:`AutoComplete`}),[C,w]=se({defaultValue:!1,onChange:pe,name:`AutoComplete`,prop:`open`}),[T,E]=(0,v.useState)(-1),[Se,D]=(0,v.useState)(-1),[O,k]=(0,v.useState)(null),[A,Ce]=(0,v.useState)(null),j=ie(Ce,e),[M,N]=(0,v.useState)(null),we=h===`top`||h===`bottom`,P=(0,v.useId)(),F=`${P}-listbox`,I=(0,v.useRef)(!1),L=re({id:p?.id,disabled:p?.disabled,readOnly:p?.readOnly}),Te=L.id??`${P}-input`,R=!!L.disabled||!!L.readOnly,z=C&&!R,B=()=>{R||w(!0)},V=()=>{w(!1),E(-1)},H=(0,v.useMemo)(()=>{let e=x.toLowerCase(),t=o.filter(t=>l?l(x,t):t.label.toLowerCase().includes(e));return _?[...t].sort(_):t},[o,x,l,_]),U=(0,v.useMemo)(()=>{if(!u)return null;if(b===`adjacent`){let e=[];return H.forEach(t=>{let n=u(t),r=e[e.length-1];r&&r[0]===n?r[1].push(t):e.push([n,[t]])}),e}let e=new Map;return H.forEach(t=>{let n=u(t),r=e.get(n);r?r.push(t):e.set(n,[t])}),Array.from(e.entries())},[H,u,b]),W=(0,v.useMemo)(()=>U?U.flatMap(([,e])=>e):H,[U,H]),G=T>=0?T:ge&&z?W.findIndex(e=>!e.disabled):-1,K=e=>{let t=W.length;if(t===0)return;let n=G>=0?G:e===1?-1:t;for(let r=0;r<t;r+=1)if(n=(n+e+t)%t,!W[n].disabled){E(n);return}},q=e=>{e.disabled||(_e&&S(e.label),V(),te?.(e))},Ee=e=>{if(!(R||I.current||e.nativeEvent.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:e.preventDefault(),C||B(),K(1);break;case`ArrowUp`:e.preventDefault(),C||B(),K(-1);break;case`Enter`:{let t=z?W[G]:void 0;t?(e.preventDefault(),q(t)):he&&x.trim()&&(e.preventDefault(),he(x.trim()),V());break}case`Escape`:!z&&x!==``&&(e.preventDefault(),S(``),E(-1))}},De=e=>{S(e),E(-1),B()},J=e=>{let t=e.relatedTarget;t&&(M?.contains(t)||O?.contains(t))||V()},Y=e=>{e.disabled||I.current||(q(e),fe?.(e),A?.focus())},X=z&&G>=0?`${F}-option-${G}`:void 0;(0,v.useEffect)(()=>{A&&(A.setAttribute(`role`,`combobox`),A.setAttribute(`aria-autocomplete`,`list`),A.setAttribute(`aria-expanded`,String(z)),!z&&x!==``?A.setAttribute(`data-minerva-escape-consumer`,``):A.removeAttribute(`data-minerva-escape-consumer`),z?A.setAttribute(`aria-controls`,F):A.removeAttribute(`aria-controls`),X?A.setAttribute(`aria-activedescendant`,X):A.removeAttribute(`aria-activedescendant`))},[A,z,F,X,x]);let Oe=(0,v.useRef)(()=>{});(0,v.useEffect)(()=>{Oe.current=()=>{C||B()}}),(0,v.useEffect)(()=>{if(!A)return;let e=()=>Oe.current();return A.addEventListener(`click`,e),()=>A.removeEventListener(`click`,e)},[A]),(0,v.useEffect)(()=>{X&&document.getElementById(X)?.scrollIntoView?.({block:`nearest`})},[X]);let Z=e=>(0,y.jsxs)(`div`,{className:m.basicOption,children:[e.icon&&(0,y.jsx)(`span`,{className:m.icon,children:e.icon}),(0,y.jsxs)(`div`,{className:m.content,children:[(0,y.jsx)(`div`,{className:m.label,children:e.label}),e.description&&(0,y.jsx)(`div`,{className:m.description,children:e.description})]})]}),Q=(e,t)=>{let n=G===t,i=Se===t||n;return(0,y.jsx)(`div`,{className:s(m.optionItem,{[m.disabled]:e.disabled,[m.highlight]:e.highlight,[m.active]:i}),style:e.style,role:`option`,tabIndex:-1,id:`${F}-option-${t}`,"aria-selected":n,"aria-disabled":e.disabled||void 0,onMouseDown:e=>e.preventDefault(),onClick:()=>Y(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),Y(e))},onMouseEnter:()=>D(t),onMouseLeave:()=>D(-1),...c(`autocomplete`,`item`,{highlighted:i,disabled:e.disabled}),children:r===`custom`&&d?d(e):Z(e)},e.value)};return(0,y.jsxs)(`div`,{ref:k,className:s(m.autoComplete,ve),onCompositionStart:()=>{I.current=!0},onCompositionEnd:()=>{I.current=!1},...c(`autocomplete`,`root`,{state:z?`open`:`closed`,disabled:!!L.disabled,readonly:!!L.readOnly,loading:f}),children:[n&&(0,y.jsx)(`label`,{htmlFor:Te,className:m.label,...c(`autocomplete`,`label`),children:n}),(0,y.jsx)(ce,{...p,id:Te,disabled:L.disabled,readOnly:L.readOnly,name:t,ref:j,value:x,onChange:e=>De(e.target.value),onFocus:e=>{B(),p?.onFocus?.(e)},onBlur:e=>{J(e),p?.onBlur?.(e)},onKeyDown:e=>{Ee(e),p?.onKeyDown?.(e)}}),(0,y.jsx)(ae,{ref:N,open:z,anchor:O,placement:xe[h],offset:{mainAxis:we?g.y:g.x,crossAxis:we?g.x:g.y},matchAnchorWidth:`min`,branches:()=>[O],onEscapeKeyDown:e=>{(I.current||e.isComposing)&&e.preventDefault()},onDismiss:V,returnFocusOnEscape:()=>A,className:s(m.popup,me),...c(`autocomplete`,`content`,{state:`open`}),children:(0,y.jsx)(`div`,{className:s(m.dropdown,de&&m.animated),children:(0,y.jsx)(`div`,{className:m.optionList,role:`listbox`,id:F,"aria-label":n,"aria-busy":f||void 0,...c(`autocomplete`,`list`),children:f?(0,y.jsx)(`div`,{role:`presentation`,className:m.loading,...c(`autocomplete`,`loading`),children:(0,y.jsx)(ne,{})}):H.length>0?(0,y.jsx)(y.Fragment,{children:U?U.map(([e,t],n)=>e===``?(0,y.jsx)(v.Fragment,{children:t.map(e=>Q(e,W.indexOf(e)))},`${n}-`):(0,y.jsxs)(`div`,{className:m.optionGroup,role:`group`,"aria-label":e,children:[(0,y.jsx)(`div`,{className:m.groupLabel,"aria-hidden":`true`,...c(`autocomplete`,`group-label`),children:e}),t.map(e=>Q(e,W.indexOf(e)))]},`${n}-${e}`)):H.map((e,t)=>Q(e,t))}):(0,y.jsx)(`div`,{role:`presentation`,className:m.empty,...c(`autocomplete`,`empty`),children:oe?.()||(0,y.jsx)(le,{...ue})})})})})]})}})))()}function S(){return(0,C.jsxs)(`div`,{style:{width:280,marginTop:180},children:[(0,C.jsx)(`style`,{children:T}),(0,C.jsx)(b,{name:`priority`,label:`Priority (opens above)`,options:w,placement:`top`,offset:{x:0,y:8},animation:!1,dropdownClassName:`priority-dropdown`})]})}var C,w,T;function E(){return(E=t((()=>{x(),C=r(),w=[{label:`Low`,value:`low`},{label:`Medium`,value:`medium`,highlight:!0},{label:`High`,value:`high`},{label:`Critical`,value:`critical`}],T=`
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
`})))()}function Se(){let[e,t]=(0,D.useState)(``),[n,r]=(0,D.useState)(!0),[i,a]=(0,D.useState)([]);return(0,D.useEffect)(()=>{let t=setTimeout(()=>{a(k.filter(t=>t.toLowerCase().includes(e.toLowerCase())).map(e=>({label:e,value:e}))),r(!1)},600);return()=>clearTimeout(t)},[e]),(0,O.jsx)(`div`,{style:{width:280},children:(0,O.jsx)(b,{name:`mission`,label:`Space mission`,options:i,value:e,onChange:e=>{t(e),r(!0)},loading:n})})}var D,O,k;function A(){return(A=t((()=>{D=n(),x(),O=r(),k=[`Apollo`,`Artemis`,`Gemini`,`Mercury`,`Skylab`,`Voyager`]})))()}function Ce(){return(0,j.jsx)(`div`,{style:{width:280},children:(0,j.jsx)(b,{name:`framework`,label:`Framework`,options:M,inputProps:{placeholder:`Type to search…`}})})}var j,M;function N(){return(N=t((()=>{x(),j=r(),M=[{label:`React`,value:`react`},{label:`Vue`,value:`vue`},{label:`Angular`,value:`angular`},{label:`Svelte`,value:`svelte`},{label:`Solid`,value:`solid`}]})))()}function we(){let[e,t]=(0,P.useState)(``),[n,r]=(0,P.useState)(),[i,a]=(0,P.useState)(!1);return(0,F.jsxs)(`div`,{style:{width:280},children:[(0,F.jsx)(b,{name:`city`,label:`City`,options:I,value:e,onChange:t,onSelect:r,onDropdownVisibleChange:a}),(0,F.jsxs)(`p`,{children:[`Input: “`,e,`”`]}),(0,F.jsxs)(`p`,{children:[`Selected value: `,n?n.value:`none`]}),(0,F.jsxs)(`p`,{children:[`Dropdown: `,i?`open`:`closed`]})]})}var P,F,I;function L(){return(L=t((()=>{P=n(),x(),F=r(),I=[{label:`Paris`,value:`par`},{label:`London`,value:`lon`},{label:`Tokyo`,value:`tyo`},{label:`New York`,value:`nyc`}]})))()}function Te(){return(0,R.jsx)(`div`,{style:{width:320},children:(0,R.jsx)(b,{name:`assignee`,label:`Assignee`,mode:`custom`,options:z,renderOption:e=>(0,R.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:12},children:[(0,R.jsx)(`strong`,{children:e.label}),(0,R.jsx)(`span`,{style:{opacity:.7},children:e.description})]}),renderEmpty:()=>(0,R.jsx)(`div`,{style:{padding:12},children:`No user found`})})})}var R,z;function B(){return(B=t((()=>{x(),R=r(),z=[{label:`Ada Lovelace`,value:`ada`,description:`ada@example.com`},{label:`Alan Turing`,value:`alan`,description:`alan@example.com`},{label:`Grace Hopper`,value:`grace`,description:`grace@example.com`}]})))()}function V(){return(0,H.jsx)(`div`,{style:{width:280},children:(0,H.jsx)(b,{name:`country`,label:`Country (starts with)`,options:U,filterOption:(e,t)=>t.label.toLowerCase().startsWith(e.toLowerCase()),sortOption:(e,t)=>e.label.localeCompare(t.label)})})}var H,U;function W(){return(W=t((()=>{x(),H=r(),U=[{label:`Germany`,value:`de`},{label:`Denmark`,value:`dk`},{label:`France`,value:`fr`},{label:`Finland`,value:`fi`},{label:`Greece`,value:`gr`}]})))()}function G(){return(0,K.jsx)(`div`,{style:{width:280},children:(0,K.jsx)(b,{name:`food`,label:`Food`,options:q,groupBy:e=>e.group??`Other`})})}var K,q;function Ee(){return(Ee=t((()=>{x(),K=r(),q=[{label:`Apple`,value:`apple`,group:`Fruits`},{label:`Banana`,value:`banana`,group:`Fruits`},{label:`Carrot`,value:`carrot`,group:`Vegetables`},{label:`Broccoli`,value:`broccoli`,group:`Vegetables`},{label:`Almond`,value:`almond`,group:`Nuts`}]})))()}function De(){return(0,J.jsx)(`div`,{style:{width:320},children:(0,J.jsx)(b,{name:`platform`,label:`Platform`,options:Y})})}var J,Y;function X(){return(X=t((()=>{x(),me(),J=r(),Y=[{label:`macOS`,value:`macos`,icon:(0,J.jsx)(_e,{}),description:`Recommended for this device`,highlight:!0},{label:`Windows`,value:`windows`,icon:(0,J.jsx)(he,{}),description:`Windows 10 and later`},{label:`Linux`,value:`linux`,icon:(0,J.jsx)(ge,{}),description:`deb and rpm packages`},{label:`Android`,value:`android`,icon:(0,J.jsx)(ve,{}),description:`Coming soon`,disabled:!0}]})))()}function Oe(){let[e,t]=(0,Z.useState)(``),[n,r]=(0,Z.useState)(``);return(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,Q.jsx)(b,{options:ke,value:e,onChange:t,autoHighlight:!0,fillOnSelect:!1,onSelect:e=>r(`Open book #${e.value}`),onSubmit:e=>r(`Search for "${e}"`),inputProps:{"aria-label":`Search books`,placeholder:`Title or author`,clearable:!0}}),(0,Q.jsx)(`span`,{children:n})]})}var Z,Q,ke;function Ae(){return(Ae=t((()=>{Z=n(),x(),Q=r(),ke=[{value:`1`,label:`Lord of the Mysteries`,description:`Cuttlefish`},{value:`2`,label:`Sword of Coming`,description:`Fenghuo`},{value:`3`,label:`A Record of a Mortal`,description:`Wangyu`}]})))()}var je;function Me(){return(Me=t((()=>{je=`import { AutoComplete } from "minerva-design";

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
`})))()}var $,Ye,Xe;function Ze(){return(Ze=t((()=>{E(),A(),N(),L(),B(),W(),Ee(),X(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),Je(),n(),a(),_(),pe(),h(),$=r(),Ye=de(Object.assign({"./demos/appearance.tsx":S,"./demos/async-loading.tsx":Se,"./demos/basic.tsx":Ce,"./demos/controlled.tsx":we,"./demos/custom-render.tsx":Te,"./demos/filter-sort.tsx":V,"./demos/grouped.tsx":G,"./demos/rich-options.tsx":De,"./demos/search-box.tsx":Oe}),Object.assign({"./demos/appearance.tsx":je,"./demos/async-loading.tsx":Ne,"./demos/basic.tsx":Fe,"./demos/controlled.tsx":Le,"./demos/custom-render.tsx":ze,"./demos/filter-sort.tsx":Ve,"./demos/grouped.tsx":Ue,"./demos/rich-options.tsx":Ge,"./demos/search-box.tsx":qe})),Xe=()=>{let{t:e}=i();return(0,$.jsx)(fe,{id:`auto-complete`,demos:Ye,children:(0,$.jsxs)(`section`,{className:g.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.auto-complete.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:g.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.arrows`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.enter`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.escape`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.aria`)})]})]})})}})))()}Ze();export{Xe as default};