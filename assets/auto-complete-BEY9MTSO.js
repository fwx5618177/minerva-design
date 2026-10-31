import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-eGG0J4pK.js";import{Mn as ee,on as o,xt as te}from"./angular-preview-CSWPEDZG.js";import{n as ne,t as re}from"./ProgressIndicator-CQZAxIX3.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{n as c,t as ie}from"./context-ESLv39g4.js";import{Q as l,St as u,Tt as ae,Z as oe,wt as se,xt as ce}from"./io5-BR_mMpVE.js";import{n as le,t as d}from"./Input-Dtg6tHnj.js";import{n as f,t as ue}from"./Empty-sMEMpnBg.js";import{n as p,t as de}from"./autoComplete.module.scss-DijMEPfF.js";import{i as m,r as h}from"./DemoBlock-BXdX6oLT.js";import{l as fe,n as g,t as pe,u as me}from"./DocPage-CHJwIegD.js";import{g as he,h as ge,l as _e,n as ve,t as ye}from"./fa-BvFqnURM.js";var _,v,be,xe,Se,y;function b(){return(b=t((()=>{ee(),ne(),se(),u(),c(),l(),d(),f(),de(),_=e(n(),1),v=r(),te(),be=Object.freeze({x:0,y:4}),xe=[],Se={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},y=({ref:e,name:t,label:n,mode:r=`basic`,value:i,onChange:a,options:ee=xe,defaultValue:te,onSelect:ne,filterOption:c,groupBy:l,renderOption:u,renderEmpty:se,loading:d=!1,inputProps:f,emptyProps:de,placement:m=`bottom`,offset:h=be,animation:fe=!0,sortOption:g,onOptionClick:pe,onDropdownVisibleChange:me,dropdownClassName:he,onSubmit:ge,autoHighlight:_e=!1,fillOnSelect:ve=!0,className:ye,groupMode:y=`first`})=>{let[b,x]=ce({value:i,defaultValue:te??``,onChange:a,name:`AutoComplete`}),[S,C]=ce({defaultValue:!1,onChange:me,name:`AutoComplete`,prop:`open`}),[w,T]=(0,_.useState)(-1),[Ce,E]=(0,_.useState)(-1),[D,O]=(0,_.useState)(null),[k,we]=(0,_.useState)(null),A=ae(we,e),[j,M]=(0,_.useState)(null),Te=m===`top`||m===`bottom`,N=(0,_.useId)(),P=`${N}-listbox`,F=(0,_.useRef)(!1),I=ie({id:f?.id,disabled:f?.disabled,readOnly:f?.readOnly}),Ee=I.id??`${N}-input`,L=!!I.disabled||!!I.readOnly,R=S&&!L,z=()=>{L||C(!0)},B=()=>{C(!1),T(-1)},V=(0,_.useMemo)(()=>{let e=b.toLowerCase(),t=ee.filter(t=>c?c(b,t):t.label.toLowerCase().includes(e));return g?[...t].sort(g):t},[ee,b,c,g]),H=(0,_.useMemo)(()=>{if(!l)return null;if(y===`adjacent`){let e=[];return V.forEach(t=>{let n=l(t),r=e[e.length-1];r&&r[0]===n?r[1].push(t):e.push([n,[t]])}),e}let e=new Map;return V.forEach(t=>{let n=l(t),r=e.get(n);r?r.push(t):e.set(n,[t])}),Array.from(e.entries())},[V,l,y]),U=(0,_.useMemo)(()=>H?H.flatMap(([,e])=>e):V,[H,V]),W=w>=0?w:_e&&R?U.findIndex(e=>!e.disabled):-1,G=e=>{let t=U.length;if(t===0)return;let n=W>=0?W:e===1?-1:t;for(let r=0;r<t;r+=1)if(n=(n+e+t)%t,!U[n].disabled){T(n);return}},K=e=>{e.disabled||(ve&&x(e.label),B(),ne?.(e))},De=e=>{if(!(L||F.current||e.nativeEvent.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:e.preventDefault(),S||z(),G(1);break;case`ArrowUp`:e.preventDefault(),S||z(),G(-1);break;case`Enter`:{let t=R?U[W]:void 0;t?(e.preventDefault(),K(t)):ge&&b.trim()&&(e.preventDefault(),ge(b.trim()),B());break}case`Escape`:!R&&b!==``&&(e.preventDefault(),x(``),T(-1))}},Oe=e=>{x(e),T(-1),z()},q=e=>{let t=e.relatedTarget;t&&(j?.contains(t)||D?.contains(t))||B()},J=e=>{e.disabled||F.current||(K(e),pe?.(e),k?.focus())},Y=R&&W>=0?`${P}-option-${W}`:void 0;(0,_.useEffect)(()=>{k&&(k.setAttribute(`role`,`combobox`),k.setAttribute(`aria-autocomplete`,`list`),k.setAttribute(`aria-expanded`,String(R)),!R&&b!==``?k.setAttribute(`data-minerva-escape-consumer`,``):k.removeAttribute(`data-minerva-escape-consumer`),R?k.setAttribute(`aria-controls`,P):k.removeAttribute(`aria-controls`),Y?k.setAttribute(`aria-activedescendant`,Y):k.removeAttribute(`aria-activedescendant`))},[k,R,P,Y,b]);let X=(0,_.useRef)(()=>{});(0,_.useEffect)(()=>{X.current=()=>{S||z()}}),(0,_.useEffect)(()=>{if(!k)return;let e=()=>X.current();return k.addEventListener(`click`,e),()=>k.removeEventListener(`click`,e)},[k]),(0,_.useEffect)(()=>{Y&&document.getElementById(Y)?.scrollIntoView?.({block:`nearest`})},[Y]);let Z=e=>(0,v.jsxs)(`div`,{className:p.basicOption,children:[e.icon&&(0,v.jsx)(`span`,{className:p.icon,children:e.icon}),(0,v.jsxs)(`div`,{className:p.content,children:[(0,v.jsx)(`div`,{className:p.label,children:e.label}),e.description&&(0,v.jsx)(`div`,{className:p.description,children:e.description})]})]}),Q=(e,t)=>{let n=W===t,i=Ce===t||n;return(0,v.jsx)(`div`,{className:o(p.optionItem,{[p.disabled]:e.disabled,[p.highlight]:e.highlight,[p.active]:i}),style:e.style,role:`option`,tabIndex:-1,id:`${P}-option-${t}`,"aria-selected":n,"aria-disabled":e.disabled||void 0,onMouseDown:e=>e.preventDefault(),onClick:()=>J(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),J(e))},onMouseEnter:()=>E(t),onMouseLeave:()=>E(-1),...s(`autocomplete`,`item`,{highlighted:i,disabled:e.disabled}),children:r===`custom`&&u?u(e):Z(e)},e.value)};return(0,v.jsxs)(`div`,{ref:O,className:o(p.autoComplete,ye),onCompositionStart:()=>{F.current=!0},onCompositionEnd:()=>{F.current=!1},...s(`autocomplete`,`root`,{state:R?`open`:`closed`,disabled:!!I.disabled,readonly:!!I.readOnly,loading:d}),children:[n&&(0,v.jsx)(`label`,{htmlFor:Ee,className:p.label,...s(`autocomplete`,`label`),children:n}),(0,v.jsx)(le,{...f,id:Ee,disabled:I.disabled,readOnly:I.readOnly,name:t,ref:A,value:b,onChange:e=>Oe(e.target.value),onFocus:e=>{z(),f?.onFocus?.(e)},onBlur:e=>{q(e),f?.onBlur?.(e)},onKeyDown:e=>{De(e),f?.onKeyDown?.(e)}}),(0,v.jsx)(oe,{ref:M,open:R,anchor:D,placement:Se[m],offset:{mainAxis:Te?h.y:h.x,crossAxis:Te?h.x:h.y},matchAnchorWidth:`min`,branches:()=>[D],onEscapeKeyDown:e=>{(F.current||e.isComposing)&&e.preventDefault()},onDismiss:B,returnFocusOnEscape:()=>k,className:o(p.popup,he),...s(`autocomplete`,`content`,{state:`open`}),children:(0,v.jsx)(`div`,{className:o(p.dropdown,fe&&p.animated),children:(0,v.jsx)(`div`,{className:p.optionList,role:`listbox`,id:P,"aria-label":n,"aria-busy":d||void 0,...s(`autocomplete`,`list`),children:d?(0,v.jsx)(`div`,{role:`presentation`,className:p.loading,...s(`autocomplete`,`loading`),children:(0,v.jsx)(re,{})}):V.length>0?(0,v.jsx)(v.Fragment,{children:H?H.map(([e,t],n)=>e===``?(0,v.jsx)(_.Fragment,{children:t.map(e=>Q(e,U.indexOf(e)))},`${n}-`):(0,v.jsxs)(`div`,{className:p.optionGroup,role:`group`,"aria-label":e,children:[(0,v.jsx)(`div`,{className:p.groupLabel,"aria-hidden":`true`,...s(`autocomplete`,`group-label`),children:e}),t.map(e=>Q(e,U.indexOf(e)))]},`${n}-${e}`)):V.map((e,t)=>Q(e,t))}):(0,v.jsx)(`div`,{role:`presentation`,className:p.empty,...s(`autocomplete`,`empty`),children:se?.()||(0,v.jsx)(ue,{...de})})})})})]})}})))()}function x(){return(0,S.jsxs)(`div`,{style:{width:280,marginTop:180},children:[(0,S.jsx)(`style`,{children:w}),(0,S.jsx)(y,{name:`priority`,label:`Priority (opens above)`,options:C,placement:`top`,offset:{x:0,y:8},animation:!1,dropdownClassName:`priority-dropdown`})]})}var S,C,w;function T(){return(T=t((()=>{b(),S=r(),C=[{label:`Low`,value:`low`},{label:`Medium`,value:`medium`,highlight:!0},{label:`High`,value:`high`},{label:`Critical`,value:`critical`}],w=`
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
`})))()}function Ce(){let[e,t]=(0,E.useState)(``),[n,r]=(0,E.useState)(!0),[i,a]=(0,E.useState)([]);return(0,E.useEffect)(()=>{let t=setTimeout(()=>{a(O.filter(t=>t.toLowerCase().includes(e.toLowerCase())).map(e=>({label:e,value:e}))),r(!1)},600);return()=>clearTimeout(t)},[e]),(0,D.jsx)(`div`,{style:{width:280},children:(0,D.jsx)(y,{name:`mission`,label:`Space mission`,options:i,value:e,onChange:e=>{t(e),r(!0)},loading:n})})}var E,D,O;function k(){return(k=t((()=>{E=n(),b(),D=r(),O=[`Apollo`,`Artemis`,`Gemini`,`Mercury`,`Skylab`,`Voyager`]})))()}function we(){return(0,A.jsx)(`div`,{style:{width:280},children:(0,A.jsx)(y,{name:`framework`,label:`Framework`,options:j,inputProps:{placeholder:`Type to search…`}})})}var A,j;function M(){return(M=t((()=>{b(),A=r(),j=[{label:`React`,value:`react`},{label:`Vue`,value:`vue`},{label:`Angular`,value:`angular`},{label:`Svelte`,value:`svelte`},{label:`Solid`,value:`solid`}]})))()}function Te(){let[e,t]=(0,N.useState)(``),[n,r]=(0,N.useState)(),[i,a]=(0,N.useState)(!1);return(0,P.jsxs)(`div`,{style:{width:280},children:[(0,P.jsx)(y,{name:`city`,label:`City`,options:F,value:e,onChange:t,onSelect:r,onDropdownVisibleChange:a}),(0,P.jsxs)(`p`,{children:[`Input: “`,e,`”`]}),(0,P.jsxs)(`p`,{children:[`Selected value: `,n?n.value:`none`]}),(0,P.jsxs)(`p`,{children:[`Dropdown: `,i?`open`:`closed`]})]})}var N,P,F;function I(){return(I=t((()=>{N=n(),b(),P=r(),F=[{label:`Paris`,value:`par`},{label:`London`,value:`lon`},{label:`Tokyo`,value:`tyo`},{label:`New York`,value:`nyc`}]})))()}function Ee(){return(0,L.jsx)(`div`,{style:{width:320},children:(0,L.jsx)(y,{name:`assignee`,label:`Assignee`,mode:`custom`,options:R,renderOption:e=>(0,L.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:12},children:[(0,L.jsx)(`strong`,{children:e.label}),(0,L.jsx)(`span`,{style:{opacity:.7},children:e.description})]}),renderEmpty:()=>(0,L.jsx)(`div`,{style:{padding:12},children:`No user found`})})})}var L,R;function z(){return(z=t((()=>{b(),L=r(),R=[{label:`Ada Lovelace`,value:`ada`,description:`ada@example.com`},{label:`Alan Turing`,value:`alan`,description:`alan@example.com`},{label:`Grace Hopper`,value:`grace`,description:`grace@example.com`}]})))()}function B(){return(0,V.jsx)(`div`,{style:{width:280},children:(0,V.jsx)(y,{name:`country`,label:`Country (starts with)`,options:H,filterOption:(e,t)=>t.label.toLowerCase().startsWith(e.toLowerCase()),sortOption:(e,t)=>e.label.localeCompare(t.label)})})}var V,H;function U(){return(U=t((()=>{b(),V=r(),H=[{label:`Germany`,value:`de`},{label:`Denmark`,value:`dk`},{label:`France`,value:`fr`},{label:`Finland`,value:`fi`},{label:`Greece`,value:`gr`}]})))()}function W(){return(0,G.jsx)(`div`,{style:{width:280},children:(0,G.jsx)(y,{name:`food`,label:`Food`,options:K,groupBy:e=>e.group??`Other`})})}var G,K;function De(){return(De=t((()=>{b(),G=r(),K=[{label:`Apple`,value:`apple`,group:`Fruits`},{label:`Banana`,value:`banana`,group:`Fruits`},{label:`Carrot`,value:`carrot`,group:`Vegetables`},{label:`Broccoli`,value:`broccoli`,group:`Vegetables`},{label:`Almond`,value:`almond`,group:`Nuts`}]})))()}function Oe(){return(0,q.jsx)(`div`,{style:{width:320},children:(0,q.jsx)(y,{name:`platform`,label:`Platform`,options:J})})}var q,J;function Y(){return(Y=t((()=>{b(),he(),q=r(),J=[{label:`macOS`,value:`macos`,icon:(0,q.jsx)(ve,{}),description:`Recommended for this device`,highlight:!0},{label:`Windows`,value:`windows`,icon:(0,q.jsx)(ge,{}),description:`Windows 10 and later`},{label:`Linux`,value:`linux`,icon:(0,q.jsx)(_e,{}),description:`deb and rpm packages`},{label:`Android`,value:`android`,icon:(0,q.jsx)(ye,{}),description:`Coming soon`,disabled:!0}]})))()}function X(){let[e,t]=(0,Z.useState)(``),[n,r]=(0,Z.useState)(``);return(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,Q.jsx)(y,{options:ke,value:e,onChange:t,autoHighlight:!0,fillOnSelect:!1,onSelect:e=>r(`Open book #${e.value}`),onSubmit:e=>r(`Search for "${e}"`),inputProps:{"aria-label":`Search books`,placeholder:`Title or author`,clearable:!0}}),(0,Q.jsx)(`span`,{children:n})]})}var Z,Q,ke;function Ae(){return(Ae=t((()=>{Z=n(),b(),Q=r(),ke=[{value:`1`,label:`Lord of the Mysteries`,description:`Cuttlefish`},{value:`2`,label:`Sword of Coming`,description:`Fenghuo`},{value:`3`,label:`A Record of a Mortal`,description:`Wangyu`}]})))()}var je;function Me(){return(Me=t((()=>{je=`import { AutoComplete } from "minerva-design";

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
`})))()}var $,Ye,Xe;function Ze(){return(Ze=t((()=>{T(),k(),M(),I(),z(),U(),De(),Y(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),Je(),n(),a(),g(),me(),m(),$=r(),Ye=fe(Object.assign({"./demos/appearance.tsx":x,"./demos/async-loading.tsx":Ce,"./demos/basic.tsx":we,"./demos/controlled.tsx":Te,"./demos/custom-render.tsx":Ee,"./demos/filter-sort.tsx":B,"./demos/grouped.tsx":W,"./demos/rich-options.tsx":Oe,"./demos/search-box.tsx":X}),Object.assign({"./demos/appearance.tsx":je,"./demos/async-loading.tsx":Ne,"./demos/basic.tsx":Fe,"./demos/controlled.tsx":Le,"./demos/custom-render.tsx":ze,"./demos/filter-sort.tsx":Ve,"./demos/grouped.tsx":Ue,"./demos/rich-options.tsx":Ge,"./demos/search-box.tsx":qe})),Xe=()=>{let{t:e}=i();return(0,$.jsx)(pe,{id:`auto-complete`,demos:Ye,children:(0,$.jsxs)(`section`,{className:h.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.auto-complete.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:h.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.arrows`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.enter`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.escape`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.aria`)})]})]})})}})))()}Ze();export{Xe as default};