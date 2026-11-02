import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-CjOVvDRm.js";import{L as ee,Lt as o,Z as s,er as c,gt as l,kt as te,mn as ne,st as re,ut as u}from"./angular-preview-DXAccp5O.js";import{B as ie,R as ae,S as oe,T as se,V as ce,g as le,r as ue,w as de,z as d}from"./ProgressIndicator-DMdtmsv7.js";import{t as f}from"./stylingHooks-PqiNJdev.js";import{i as fe,n as pe,r as me,t as he}from"./context-ESLv39g4.js";import{$ as ge,Q as _e,St as ve,Tt as ye,Z as be,ct as xe,st as Se,wt as Ce,xt as we}from"./io5-nkQQnVMp.js";import{t as Te}from"./dataAttributes-CDHeJa9q.js";import{i as Ee,r as De}from"./CodeBlock-v_lQ8awf.js";import{n as Oe,t as ke}from"./Input-xgKn31jP.js";import{n as Ae,r as je,t as Me}from"./tabbing-D9Bcdpcp.js";import{a as Ne,r as Pe}from"./FormControl-CdgmUsAy.js";import{i as Fe,r as p}from"./DemoBlock-COfkti2e.js";import{n as m,t as h}from"./datePicker.module.scss-DX9bDRIx.js";import{l as Ie,n as g,t as _,u as v}from"./DocPage-BetfypGI.js";var y,b,Le,x,S;function C(){return(C=t((()=>{ne(),ce(),se(),Ce(),ve(),pe(),Se(),ge(),_e(),Ee(),ke(),Me(),m(),y=e(n(),1),b=r(),Le=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],x=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":ne,"aria-labelledby":ae,"aria-describedby":se,id:ce,required:d,readOnly:pe,invalid:ge,name:_e=`date-picker`,disabled:ve,clearable:Se=!0,size:Ce=`medium`,minDate:Ee,maxDate:ke,locale:Me,className:Ne=``,style:Pe,onOpenChange:Fe,...p})=>{let{t:m,language:Ie}=ie(),g=(0,y.useId)(),_=fe(),v=he({id:ce,"aria-describedby":se}),x=ve??_?.disabled??!1,S=pe??_?.readOnly??!1,C=d??_?.required??!1,w=ge??_?.invalid??!1,T=a??ne??m(`datePicker.label`),E=ae??(_&&!a&&!ne?_.labelId:void 0),[D,Re]=we({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[O,k]=we({defaultValue:!1,onChange:Fe,name:`DatePicker`,prop:`open`}),[A,j]=(0,y.useState)(null),[M,ze]=(0,y.useState)(null),[Be,N]=(0,y.useState)(null),Ve=ye(ze,e),He=(0,y.useRef)(null),P=xe(),Ue=l(D||``)??new Date,[F,I]=(0,y.useState)(()=>o(Ue)),[L,R]=(0,y.useState)(``),[z,B]=(0,y.useState)(!1),V=(0,y.useRef)(new Map),H=(0,y.useRef)(null),U=e=>!!(Ee&&e<Ee||ke&&e>ke),W=e=>{Re(e),r?.(e)},G=e=>{let t=l(e);t&&I(o(t))},We=e=>{if(j(e),e===``){W(``);return}let t=l(e,!0);if(t){let e=c(t);U(e)||(W(e),I(o(t)))}},Ge=()=>{if(A===null)return;let e=A.trim();if(e===``)D&&W(``);else{let t=l(e,!1);if(t){let e=c(t);!U(e)&&e!==D&&(W(e),I(o(t)))}}j(null)},K=()=>{j(null),W(``),M?.focus()},q=e=>{let t=c(e);x||S||U(t)||(j(null),W(t),I(o(e)),k(!1),M?.focus())},Ke=()=>{x||S||(B(!1),O||G(D),k(e=>!e))},J=o(F),qe=s(J,-((J.getDay()+6)%7)),Y=Array.from({length:42},(e,t)=>s(qe,t)),Je=Y.map(c),X=new Date,Z=c(X),Q=[L,D,u(X,F)?Z:``,c(J)].find(e=>e&&Je.includes(e)),$=c(J);(0,y.useEffect)(()=>{if(!O||x||!H.current)return;let e=V.current.get(H.current);e&&(H.current=null,e.focus())},[O,$,L,x]);let Ye=(e,t)=>{if(x||S)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||q(t);return}let n,r=(t.getDay()+6)%7;switch(ee(e.key,e.currentTarget)){case`ArrowLeft`:n=s(t,-1);break;case`ArrowRight`:n=s(t,1);break;case`ArrowUp`:n=s(t,-7);break;case`ArrowDown`:n=s(t,7);break;case`Home`:n=s(t,-r);break;case`End`:n=s(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=o(t,r),a=s(o(i,1),-1).getDate();n=te(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=c(n);H.current=i,R(i),u(n,F)||I(o(n))},Xe=e=>{let t=e.currentTarget;!M||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!Ae(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?M:je(M,P??M.ownerDocument.body,!1)??M).focus(),k(!1))},Ze=new Intl.DateTimeFormat(Me??Ie,{year:`numeric`,month:`long`}).format(J),Qe=A??D;return(0,b.jsxs)(`div`,{...Te(p),...f(`date-picker`,`root`,{state:O&&!x&&!S?`open`:`closed`,disabled:x,readonly:S,invalid:w,size:Ce}),ref:N,className:re(h.datePicker,Ne),style:Pe,onClick:e=>{e.target===M&&Ke()},children:[(0,b.jsx)(me.Provider,{value:null,children:(0,b.jsx)(Oe,{ref:Ve,value:Qe,placeholder:i??m(`datePicker.placeholder`),id:v.id,"aria-label":T,"aria-labelledby":E,"aria-describedby":v[`aria-describedby`],"aria-invalid":w||void 0,"aria-readonly":S||void 0,required:C,readOnly:S,onChange:e=>We(e.target.value),onBlur:Ge,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),O?He.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(G(D),R(D||Z),B(!0),k(!0)))},name:_e,disabled:x,size:Ce,suffix:Se&&D&&!x&&!S?(0,b.jsx)(De,{icon:(0,b.jsx)(de,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":m(`datePicker.clear`),onClick:K,className:h.clearButton}):(0,b.jsx)(`span`,{className:h.calendarIcon,"aria-hidden":`true`,...f(`date-picker`,`icon`),children:(0,b.jsx)(ue,{})})})}),(0,b.jsx)(be,{ref:He,open:O&&!x&&!S,anchor:M,placement:`bottom-start`,branches:()=>[Be],onDismiss:()=>k(!1),returnFocusOnEscape:()=>M,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":T,"aria-labelledby":E,className:h.popup,onKeyDown:Xe,...f(`date-picker`,`content`,{state:`open`}),children:(0,b.jsxs)(`div`,{className:h.panel,children:[(0,b.jsxs)(`div`,{className:h.header,children:[(0,b.jsx)(`h2`,{id:g,className:h.heading,"aria-live":`polite`,children:Ze}),(0,b.jsxs)(`div`,{className:h.navGroup,children:[(0,b.jsx)(`button`,{type:`button`,className:h.navButton,"aria-label":m(`monthCalendar.previousMonth`),onClick:()=>I(o(F,-1)),children:(0,b.jsx)(oe,{"aria-hidden":!0,focusable:!1})}),(0,b.jsx)(`button`,{type:`button`,className:h.navButton,"aria-label":m(`monthCalendar.nextMonth`),onClick:()=>I(o(F,1)),children:(0,b.jsx)(le,{"aria-hidden":!0,focusable:!1})})]})]}),(0,b.jsxs)(`div`,{role:`grid`,"aria-labelledby":g,className:h.grid,children:[(0,b.jsx)(`div`,{role:`row`,className:h.week,children:Le.map(e=>(0,b.jsx)(`div`,{role:`columnheader`,className:h.weekday,children:m(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,b.jsx)(`div`,{role:`row`,className:h.week,children:Y.slice(t*7,t*7+7).map(e=>{let t=c(e),n=D===t,r=!u(e,F),i=t===Z,a=U(t);return(0,b.jsx)(`div`,{role:`gridcell`,className:h.day,ref:e=>{e?(V.current.set(t,e),(z&&t===Q||H.current===t)&&(H.current=null,e.focus())):V.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===Q?0:-1,onFocus:()=>R(t),onClick:()=>q(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,b.jsxs)(`div`,{className:h.footer,children:[(0,b.jsx)(`button`,{type:`button`,className:h.footerButton,disabled:U(Z),onClick:()=>q(X),children:m(`datePicker.today`)}),Se&&D&&(0,b.jsx)(`button`,{type:`button`,className:h.footerButton,onClick:()=>{K(),k(!1)},children:m(`datePicker.clear`)})]})]})})]})},S=y.memo(x)})))()}function w(){let[e,t]=(0,T.useState)(``);return(0,E.jsxs)(`div`,{style:{maxWidth:280},children:[(0,E.jsx)(S,{onChange:t}),(0,E.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var T,E;function D(){return(D=t((()=>{T=n(),C(),E=r()})))()}function Re(){let[e,t]=(0,O.useState)(`2026-04-17`);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,k.jsx)(S,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,k.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,k.jsx)(d,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,k.jsx)(d,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,k.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var O,k;function A(){return(A=t((()=>{O=n(),ae(),C(),k=r()})))()}function j(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,M.jsx)(S,{defaultValue:`2026-04-17`}),(0,M.jsx)(S,{defaultValue:`2026-04-17`,clearable:!1})]})}var M;function ze(){return(ze=t((()=>{C(),M=r()})))()}function Be(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,N.jsx)(S,{defaultValue:`2026-04-17`,disabled:!0}),(0,N.jsx)(S,{defaultValue:`2026-04-17`,readOnly:!0})]})}var N;function Ve(){return(Ve=t((()=>{C(),N=r()})))()}function He(){return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,P.jsx)(Pe,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,P.jsx)(S,{})}),(0,P.jsx)(Pe,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,P.jsx)(S,{defaultValue:`2026-01-01`})})]})}var P;function Ue(){return(Ue=t((()=>{C(),Ne(),P=r()})))()}function F(){return(0,I.jsx)(`div`,{style:{maxWidth:280},children:(0,I.jsx)(S,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var I;function L(){return(L=t((()=>{C(),I=r()})))()}function R(){return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,z.jsx)(S,{size:`small`,placeholder:`Small`}),(0,z.jsx)(S,{size:`medium`,placeholder:`Medium`}),(0,z.jsx)(S,{size:`large`,placeholder:`Large`})]})}var z;function B(){return(B=t((()=>{C(),z=r()})))()}var V;function H(){return(H=t((()=>{V=`import { useState } from "react";
import { DatePicker } from "minerva-design";

export default function BasicDemo() {
  const [date, setDate] = useState("");

  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker onChange={setDate} />
      <p>Selected: {date || "none"}</p>
    </div>
  );
}
`})))()}var U;function W(){return(W=t((()=>{U=`import { useState } from "react";
import { Button, DatePicker } from "minerva-design";

export default function ControlledDemo() {
  const [date, setDate] = useState<string | null>("2026-04-17");

  return (
    <div
      style={{ display: "grid", gap: 12, justifyItems: "start", maxWidth: 280 }}
    >
      <DatePicker
        label="Target date"
        value={date}
        onChange={(next) => setDate(next || null)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="small" onClick={() => setDate("2026-05-01")}>
          Set to 2026-05-01
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setDate(null)}
        >
          Reset
        </Button>
      </div>
      <p>Value: {date ?? "null"}</p>
    </div>
  );
}
`})))()}var G;function We(){return(We=t((()=>{G=`import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}
`})))()}var Ge;function K(){return(K=t((()=>{Ge=`import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}
`})))()}var q;function Ke(){return(Ke=t((()=>{q=`import { DatePicker, FormField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <FormField label="Start date" helperText="Format: YYYY-MM-DD" required>
        <DatePicker />
      </FormField>
      <FormField
        label="Deadline"
        errorMessage="Please choose a date in the future."
      >
        <DatePicker defaultValue="2026-01-01" />
      </FormField>
    </div>
  );
}
`})))()}var J;function qe(){return(qe=t((()=>{J=`import { DatePicker } from "minerva-design";

export default function MinMaxDemo() {
  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue="2026-04-15"
        minDate="2026-04-10"
        maxDate="2026-04-20"
        placeholder="2026-04-10 – 2026-04-20"
      />
    </div>
  );
}
`})))()}var Y;function Je(){return(Je=t((()=>{Y=`import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=t((()=>{D(),A(),ze(),Ve(),Ue(),L(),B(),H(),W(),We(),K(),Ke(),qe(),Je(),n(),a(),g(),v(),Fe(),X=r(),Z=Ie(Object.assign({"./demos/basic.tsx":w,"./demos/controlled.tsx":Re,"./demos/default-value.tsx":j,"./demos/disabled.tsx":Be,"./demos/form-control.tsx":He,"./demos/min-max.tsx":F,"./demos/sizes.tsx":R}),Object.assign({"./demos/basic.tsx":V,"./demos/controlled.tsx":U,"./demos/default-value.tsx":G,"./demos/disabled.tsx":Ge,"./demos/form-control.tsx":q,"./demos/min-max.tsx":J,"./demos/sizes.tsx":Y})),Q=()=>{let{t:e}=i();return(0,X.jsx)(_,{id:`date-picker`,demos:Z,children:(0,X.jsxs)(`section`,{className:p.section,"aria-labelledby":`keyboard`,children:[(0,X.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,X.jsxs)(`ul`,{className:p.prose,children:[(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}$();export{Q as default};