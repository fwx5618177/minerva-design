import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-CTpEXLD_.js";import{F as o,Mn as ee,rt as s,st as te}from"./angular-preview-B7Uzpk8P.js";import{n as ne,t as re}from"./ProgressIndicator-CLQ5GhV8.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{n as l,t as ie}from"./context-ESLv39g4.js";import{Q as u,St as d,Tt as ae,Z as oe,wt as se,xt as ce}from"./io5-BsjRfO9T.js";import{n as le,t as f}from"./Input-B-_C7F3z.js";import{n as p,t as ue}from"./Empty-DwRDS5tj.js";import{n as m,t as de}from"./autoComplete.module.scss-DijMEPfF.js";import{i as h,r as g}from"./DemoBlock-CKPAG9ef.js";import{l as fe,n as _,t as pe,u as me}from"./DocPage-BRhBrKSt.js";import{g as he,h as ge,l as _e,n as ve,t as ye}from"./fa-DmOlDxSO.js";var v,y,be,b,xe,x;function S(){return(S=t((()=>{ee(),ne(),se(),d(),l(),u(),f(),p(),de(),v=e(n(),1),y=r(),o(),be=Object.freeze({x:0,y:4}),b=[],xe={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},x=({ref:e,name:t,label:n,mode:r=`basic`,value:i,onChange:a,options:o=b,defaultValue:ee,onSelect:ne,filterOption:l,groupBy:u,renderOption:d,renderEmpty:se,loading:f=!1,inputProps:p,emptyProps:de,placement:h=`bottom`,offset:g=be,animation:fe=!0,sortOption:_,onOptionClick:pe,onDropdownVisibleChange:me,dropdownClassName:he,onSubmit:ge,autoHighlight:_e=!1,fillOnSelect:ve=!0,className:ye,groupMode:x=`first`})=>{let[S,C]=ce({value:i,defaultValue:ee??``,onChange:a,name:`AutoComplete`}),[w,T]=ce({defaultValue:!1,onChange:me,name:`AutoComplete`,prop:`open`}),[E,D]=(0,v.useState)(null),[Se,O]=(0,v.useState)(-1),[k,Ce]=(0,v.useState)(null),[A,we]=(0,v.useState)(null),j=ae(we,e),[Te,Ee]=(0,v.useState)(null),De=h===`top`||h===`bottom`,M=(0,v.useId)(),N=`${M}-listbox`,P=(0,v.useRef)(!1),F=ie({id:p?.id,disabled:p?.disabled,readOnly:p?.readOnly}),Oe=F.id??`${M}-input`,I=!!F.disabled||!!F.readOnly,L=w&&!I,R=()=>{I||T(!0)},z=()=>{T(!1),D(null)},B=(0,v.useMemo)(()=>{let e=S.toLowerCase(),t=o.filter(t=>l?l(S,t):t.label.toLowerCase().includes(e));return _?[...t].sort(_):t},[o,S,l,_]),V=(0,v.useMemo)(()=>{if(!u)return null;if(x===`adjacent`){let e=[];return B.forEach(t=>{let n=u(t),r=e[e.length-1];r&&r[0]===n?r[1].push(t):e.push([n,[t]])}),e}let e=new Map;return B.forEach(t=>{let n=u(t),r=e.get(n);r?r.push(t):e.set(n,[t])}),Array.from(e.entries())},[B,u,x]),H=(0,v.useMemo)(()=>V?V.flatMap(([,e])=>e):B,[V,B]),U=f?b:H,W=te(U,E,_e&&L),G=e=>{let t=U.length;if(t===0)return;let n=W>=0?W:e===1?-1:t;for(let r=0;r<t;r+=1)if(n=(n+e+t)%t,!U[n].disabled){D(U[n].value);return}},K=e=>{e.disabled||(ve&&C(e.label),z(),ne?.(e))},ke=e=>{if(!(I||P.current||e.nativeEvent.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:e.preventDefault(),w||R(),G(1);break;case`ArrowUp`:e.preventDefault(),w||R(),G(-1);break;case`Enter`:{let t=L?U[W]:void 0;t?(e.preventDefault(),K(t)):ge&&S.trim()&&(e.preventDefault(),ge(S.trim()),z());break}case`Escape`:!L&&S!==``&&(e.preventDefault(),C(``),D(null))}},q=e=>{C(e),D(null),R()},Ae=e=>{let t=e.relatedTarget;t&&(Te?.contains(t)||k?.contains(t))||z()},J=e=>{e.disabled||P.current||(K(e),pe?.(e),A?.focus())},Y=L&&W>=0?`${N}-option-${W}`:void 0;(0,v.useEffect)(()=>{A&&(A.setAttribute(`role`,`combobox`),A.setAttribute(`aria-autocomplete`,`list`),A.setAttribute(`aria-expanded`,String(L)),!L&&S!==``?A.setAttribute(`data-minerva-escape-consumer`,``):A.removeAttribute(`data-minerva-escape-consumer`),L?A.setAttribute(`aria-controls`,N):A.removeAttribute(`aria-controls`),Y?A.setAttribute(`aria-activedescendant`,Y):A.removeAttribute(`aria-activedescendant`))},[A,L,N,Y,S]);let X=(0,v.useRef)(()=>{});(0,v.useEffect)(()=>{X.current=()=>{w||R()}}),(0,v.useEffect)(()=>{if(!A)return;let e=()=>X.current();return A.addEventListener(`click`,e),()=>A.removeEventListener(`click`,e)},[A]),(0,v.useEffect)(()=>{Y&&document.getElementById(Y)?.scrollIntoView?.({block:`nearest`})},[Y]);let Z=e=>(0,y.jsxs)(`div`,{className:m.basicOption,children:[e.icon&&(0,y.jsx)(`span`,{className:m.icon,children:e.icon}),(0,y.jsxs)(`div`,{className:m.content,children:[(0,y.jsx)(`div`,{className:m.label,children:e.label}),e.description&&(0,y.jsx)(`div`,{className:m.description,children:e.description})]})]}),Q=(e,t)=>{let n=W===t,i=Se===t||n;return(0,y.jsx)(`div`,{className:s(m.optionItem,{[m.disabled]:e.disabled,[m.highlight]:e.highlight,[m.active]:i}),style:e.style,role:`option`,tabIndex:-1,id:`${N}-option-${t}`,"aria-selected":n,"aria-disabled":e.disabled||void 0,onMouseDown:e=>e.preventDefault(),onClick:()=>J(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),J(e))},onMouseEnter:()=>O(t),onMouseLeave:()=>O(-1),...c(`autocomplete`,`item`,{highlighted:i,disabled:e.disabled}),children:r===`custom`&&d?d(e):Z(e)},e.value)};return(0,y.jsxs)(`div`,{ref:Ce,className:s(m.autoComplete,ye),onCompositionStart:()=>{P.current=!0},onCompositionEnd:()=>{P.current=!1},...c(`autocomplete`,`root`,{state:L?`open`:`closed`,disabled:!!F.disabled,readonly:!!F.readOnly,loading:f}),children:[n&&(0,y.jsx)(`label`,{htmlFor:Oe,className:m.label,...c(`autocomplete`,`label`),children:n}),(0,y.jsx)(le,{...p,id:Oe,disabled:F.disabled,readOnly:F.readOnly,name:t,ref:j,value:S,onChange:e=>q(e.target.value),onFocus:e=>{R(),p?.onFocus?.(e)},onBlur:e=>{Ae(e),p?.onBlur?.(e)},onKeyDown:e=>{ke(e),p?.onKeyDown?.(e)}}),(0,y.jsx)(oe,{ref:Ee,open:L,anchor:k,placement:xe[h],offset:{mainAxis:De?g.y:g.x,crossAxis:De?g.x:g.y},matchAnchorWidth:`min`,branches:()=>[k],onEscapeKeyDown:e=>{(P.current||e.isComposing)&&e.preventDefault()},onDismiss:z,returnFocusOnEscape:()=>A,className:s(m.popup,he),...c(`autocomplete`,`content`,{state:`open`}),children:(0,y.jsx)(`div`,{className:s(m.dropdown,fe&&m.animated),children:(0,y.jsx)(`div`,{className:m.optionList,role:`listbox`,id:N,"aria-label":n,"aria-busy":f||void 0,...c(`autocomplete`,`list`),children:f?(0,y.jsx)(`div`,{role:`presentation`,className:m.loading,...c(`autocomplete`,`loading`),children:(0,y.jsx)(re,{})}):B.length>0?(0,y.jsx)(y.Fragment,{children:V?V.map(([e,t],n)=>e===``?(0,y.jsx)(v.Fragment,{children:t.map(e=>Q(e,H.indexOf(e)))},`${n}-`):(0,y.jsxs)(`div`,{className:m.optionGroup,role:`group`,"aria-label":e,children:[(0,y.jsx)(`div`,{className:m.groupLabel,"aria-hidden":`true`,...c(`autocomplete`,`group-label`),children:e}),t.map(e=>Q(e,H.indexOf(e)))]},`${n}-${e}`)):B.map((e,t)=>Q(e,t))}):(0,y.jsx)(`div`,{role:`presentation`,className:m.empty,...c(`autocomplete`,`empty`),children:se?.()||(0,y.jsx)(ue,{...de})})})})})]})}})))()}function C(){return(0,w.jsxs)(`div`,{style:{width:280,marginTop:180},children:[(0,w.jsx)(`style`,{children:E}),(0,w.jsx)(x,{name:`priority`,label:`Priority (opens above)`,options:T,placement:`top`,offset:{x:0,y:8},animation:!1,dropdownClassName:`priority-dropdown`})]})}var w,T,E;function D(){return(D=t((()=>{S(),w=r(),T=[{label:`Low`,value:`low`},{label:`Medium`,value:`medium`,highlight:!0},{label:`High`,value:`high`},{label:`Critical`,value:`critical`}],E=`
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
`})))()}function Se(){let[e,t]=(0,O.useState)(``),[n,r]=(0,O.useState)(!0),[i,a]=(0,O.useState)([]);return(0,O.useEffect)(()=>{let t=setTimeout(()=>{a(Ce.filter(t=>t.toLowerCase().includes(e.toLowerCase())).map(e=>({label:e,value:e}))),r(!1)},600);return()=>clearTimeout(t)},[e]),(0,k.jsx)(`div`,{style:{width:280},children:(0,k.jsx)(x,{name:`mission`,label:`Space mission`,options:i,value:e,onChange:e=>{t(e),r(!0)},loading:n})})}var O,k,Ce;function A(){return(A=t((()=>{O=n(),S(),k=r(),Ce=[`Apollo`,`Artemis`,`Gemini`,`Mercury`,`Skylab`,`Voyager`]})))()}function we(){return(0,j.jsx)(`div`,{style:{width:280},children:(0,j.jsx)(x,{name:`framework`,label:`Framework`,options:Te,inputProps:{placeholder:`Type to search…`}})})}var j,Te;function Ee(){return(Ee=t((()=>{S(),j=r(),Te=[{label:`React`,value:`react`},{label:`Vue`,value:`vue`},{label:`Angular`,value:`angular`},{label:`Svelte`,value:`svelte`},{label:`Solid`,value:`solid`}]})))()}function De(){let[e,t]=(0,M.useState)(``),[n,r]=(0,M.useState)(),[i,a]=(0,M.useState)(!1);return(0,N.jsxs)(`div`,{style:{width:280},children:[(0,N.jsx)(x,{name:`city`,label:`City`,options:P,value:e,onChange:t,onSelect:r,onDropdownVisibleChange:a}),(0,N.jsxs)(`p`,{children:[`Input: “`,e,`”`]}),(0,N.jsxs)(`p`,{children:[`Selected value: `,n?n.value:`none`]}),(0,N.jsxs)(`p`,{children:[`Dropdown: `,i?`open`:`closed`]})]})}var M,N,P;function F(){return(F=t((()=>{M=n(),S(),N=r(),P=[{label:`Paris`,value:`par`},{label:`London`,value:`lon`},{label:`Tokyo`,value:`tyo`},{label:`New York`,value:`nyc`}]})))()}function Oe(){return(0,I.jsx)(`div`,{style:{width:320},children:(0,I.jsx)(x,{name:`assignee`,label:`Assignee`,mode:`custom`,options:L,renderOption:e=>(0,I.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:12},children:[(0,I.jsx)(`strong`,{children:e.label}),(0,I.jsx)(`span`,{style:{opacity:.7},children:e.description})]}),renderEmpty:()=>(0,I.jsx)(`div`,{style:{padding:12},children:`No user found`})})})}var I,L;function R(){return(R=t((()=>{S(),I=r(),L=[{label:`Ada Lovelace`,value:`ada`,description:`ada@example.com`},{label:`Alan Turing`,value:`alan`,description:`alan@example.com`},{label:`Grace Hopper`,value:`grace`,description:`grace@example.com`}]})))()}function z(){return(0,B.jsx)(`div`,{style:{width:280},children:(0,B.jsx)(x,{name:`country`,label:`Country (starts with)`,options:V,filterOption:(e,t)=>t.label.toLowerCase().startsWith(e.toLowerCase()),sortOption:(e,t)=>e.label.localeCompare(t.label)})})}var B,V;function H(){return(H=t((()=>{S(),B=r(),V=[{label:`Germany`,value:`de`},{label:`Denmark`,value:`dk`},{label:`France`,value:`fr`},{label:`Finland`,value:`fi`},{label:`Greece`,value:`gr`}]})))()}function U(){return(0,W.jsx)(`div`,{style:{width:280},children:(0,W.jsx)(x,{name:`food`,label:`Food`,options:G,groupBy:e=>e.group??`Other`})})}var W,G;function K(){return(K=t((()=>{S(),W=r(),G=[{label:`Apple`,value:`apple`,group:`Fruits`},{label:`Banana`,value:`banana`,group:`Fruits`},{label:`Carrot`,value:`carrot`,group:`Vegetables`},{label:`Broccoli`,value:`broccoli`,group:`Vegetables`},{label:`Almond`,value:`almond`,group:`Nuts`}]})))()}function ke(){return(0,q.jsx)(`div`,{style:{width:320},children:(0,q.jsx)(x,{name:`platform`,label:`Platform`,options:Ae})})}var q,Ae;function J(){return(J=t((()=>{S(),he(),q=r(),Ae=[{label:`macOS`,value:`macos`,icon:(0,q.jsx)(ve,{}),description:`Recommended for this device`,highlight:!0},{label:`Windows`,value:`windows`,icon:(0,q.jsx)(ge,{}),description:`Windows 10 and later`},{label:`Linux`,value:`linux`,icon:(0,q.jsx)(_e,{}),description:`deb and rpm packages`},{label:`Android`,value:`android`,icon:(0,q.jsx)(ye,{}),description:`Coming soon`,disabled:!0}]})))()}function Y(){let[e,t]=(0,X.useState)(``),[n,r]=(0,X.useState)(``);return(0,Z.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,Z.jsx)(x,{options:Q,value:e,onChange:t,autoHighlight:!0,fillOnSelect:!1,onSelect:e=>r(`Open book #${e.value}`),onSubmit:e=>r(`Search for "${e}"`),inputProps:{"aria-label":`Search books`,placeholder:`Title or author`,clearable:!0}}),(0,Z.jsx)(`span`,{children:n})]})}var X,Z,Q;function je(){return(je=t((()=>{X=n(),S(),Z=r(),Q=[{value:`1`,label:`Lord of the Mysteries`,description:`Cuttlefish`},{value:`2`,label:`Sword of Coming`,description:`Fenghuo`},{value:`3`,label:`A Record of a Mortal`,description:`Wangyu`}]})))()}var Me;function Ne(){return(Ne=t((()=>{Me=`import { AutoComplete } from "minerva-design";

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
`})))()}var $,Xe,Ze;function Qe(){return(Qe=t((()=>{D(),A(),Ee(),F(),R(),H(),K(),J(),je(),Ne(),Fe(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),n(),a(),_(),me(),h(),$=r(),Xe=fe(Object.assign({"./demos/appearance.tsx":C,"./demos/async-loading.tsx":Se,"./demos/basic.tsx":we,"./demos/controlled.tsx":De,"./demos/custom-render.tsx":Oe,"./demos/filter-sort.tsx":z,"./demos/grouped.tsx":U,"./demos/rich-options.tsx":ke,"./demos/search-box.tsx":Y}),Object.assign({"./demos/appearance.tsx":Me,"./demos/async-loading.tsx":Pe,"./demos/basic.tsx":Ie,"./demos/controlled.tsx":Re,"./demos/custom-render.tsx":Be,"./demos/filter-sort.tsx":He,"./demos/grouped.tsx":We,"./demos/rich-options.tsx":Ke,"./demos/search-box.tsx":Je})),Ze=()=>{let{t:e}=i();return(0,$.jsx)(pe,{id:`auto-complete`,demos:Xe,children:(0,$.jsxs)(`section`,{className:g.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.auto-complete.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:g.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.arrows`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.enter`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.escape`)}),(0,$.jsx)(`li`,{children:e(`docs.auto-complete.keyboard.aria`)})]})]})})}})))()}Qe();export{Ze as default};