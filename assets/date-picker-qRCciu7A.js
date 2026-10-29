import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{$ as i,Ct as a,Dt as ee,Et as te,J as ne,Ot as re,Q as ie,St as ae,Tt as oe,ct as se,et as ce,lt as le,q as ue}from"./io5-CvrBnF9y.js";import{Et as o,H as de,It as fe,Wt as s,Zt as pe,qt as c,tn as l,ut as me,x as he}from"./angular-preview-l4x8c_2r.js";import{B as u,H as ge,R as _e,S as ve,T as ye,U as be,g as xe,r as Se,w as Ce,z as d}from"./ProgressIndicator-BhPa7d9i.js";import{i as we,n as Te,r as Ee,t as De}from"./context-ESLv39g4.js";import{t as Oe}from"./dataAttributes-CDHeJa9q.js";import{n as ke,t as Ae}from"./Input-BZHQ_8a-.js";import{n as je,r as Me,t as Ne}from"./tabbing-BcZx0LHW.js";import{a as Pe,r as Fe}from"./FormControl-BkwPT394.js";import{i as Ie,r as f}from"./DemoBlock-3GMi3Uss.js";import{n as p,t as m}from"./datePicker.module.scss-DX9bDRIx.js";import{l as Le,n as h,t as g,u as _}from"./DocPage-DCMfehF7.js";var v,y,Re,b,x;function S(){return(S=t((()=>{fe(),be(),ye(),oe(),a(),Te(),se(),ce(),i(),ne(),Ae(),Ne(),p(),v=e(n(),1),y=r(),Re=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],b=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":ee,"aria-labelledby":ne,"aria-describedby":re,id:oe,required:se,readOnly:ce,invalid:fe,name:_e=`date-picker`,disabled:ye,clearable:be=!0,size:d=`medium`,minDate:Te,maxDate:Ae,locale:Ne,className:Pe=``,style:Fe,onOpenChange:Ie,...f})=>{let{t:p,language:Le}=ge(),h=(0,v.useId)(),g=we(),_=De({id:oe,"aria-describedby":re}),b=ye??g?.disabled??!1,x=ce??g?.readOnly??!1,S=se??g?.required??!1,C=fe??g?.invalid??!1,w=a??ee??p(`datePicker.label`),T=ne??(g&&!a&&!ee?g.labelId:void 0),[E,ze]=ae({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[D,O]=ae({defaultValue:!1,onChange:Ie,name:`DatePicker`,prop:`open`}),[k,A]=(0,v.useState)(null),[j,M]=(0,v.useState)(null),[Be,N]=(0,v.useState)(null),Ve=te(M,e),He=(0,v.useRef)(null),P=le(),Ue=c(E||``)??new Date,[F,I]=(0,v.useState)(()=>s(Ue)),[L,R]=(0,v.useState)(``),[z,B]=(0,v.useState)(!1),V=(0,v.useRef)(new Map),H=(0,v.useRef)(null),U=e=>!!(Te&&e<Te||Ae&&e>Ae),W=e=>{ze(e),r?.(e)},G=e=>{let t=c(e);t&&I(s(t))},We=e=>{if(A(e),e===``){W(``);return}let t=c(e,!0);if(t){let e=o(t);U(e)||(W(e),I(s(t)))}},Ge=()=>{if(k===null)return;let e=k.trim();if(e===``)E&&W(``);else{let t=c(e,!1);if(t){let e=o(t);!U(e)&&e!==E&&(W(e),I(s(t)))}}A(null)},K=()=>{A(null),W(``),j?.focus()},q=e=>{let t=o(e);b||x||U(t)||(A(null),W(t),I(s(e)),O(!1),j?.focus())},J=()=>{b||x||(B(!1),D||G(E),O(e=>!e))},Y=s(F),Ke=l(Y,-((Y.getDay()+6)%7)),X=Array.from({length:42},(e,t)=>l(Ke,t)),qe=X.map(o),Z=new Date,Q=o(Z),$=[L,E,pe(Z,F)?Q:``,o(Y)].find(e=>e&&qe.includes(e)),Je=o(Y);(0,v.useEffect)(()=>{if(!D||b||!H.current)return;let e=V.current.get(H.current);e&&(H.current=null,e.focus())},[D,Je,L,b]);let Ye=(e,t)=>{if(b||x)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||q(t);return}let n,r=(t.getDay()+6)%7;switch(he(e.key,e.currentTarget)){case`ArrowLeft`:n=l(t,-1);break;case`ArrowRight`:n=l(t,1);break;case`ArrowUp`:n=l(t,-7);break;case`ArrowDown`:n=l(t,7);break;case`Home`:n=l(t,-r);break;case`End`:n=l(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=s(t,r),a=l(s(i,1),-1).getDate();n=de(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=o(n);H.current=i,R(i),pe(n,F)||I(s(n))},Xe=e=>{let t=e.currentTarget;!j||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!je(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?j:Me(j,P??j.ownerDocument.body,!1)??j).focus(),O(!1))},Ze=new Intl.DateTimeFormat(Ne??Le,{year:`numeric`,month:`long`}).format(Y),Qe=k??E;return(0,y.jsxs)(`div`,{...Oe(f),...u(`date-picker`,`root`,{state:D&&!b&&!x?`open`:`closed`,disabled:b,readonly:x,invalid:C,size:d}),ref:N,className:me(m.datePicker,Pe),style:Fe,onClick:e=>{e.target===j&&J()},children:[(0,y.jsx)(Ee.Provider,{value:null,children:(0,y.jsx)(ke,{ref:Ve,value:Qe,placeholder:i??p(`datePicker.placeholder`),id:_.id,"aria-label":w,"aria-labelledby":T,"aria-describedby":_[`aria-describedby`],"aria-invalid":C||void 0,"aria-readonly":x||void 0,required:S,readOnly:x,onChange:e=>We(e.target.value),onBlur:Ge,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),D?He.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(G(E),R(E||Q),B(!0),O(!0)))},name:_e,disabled:b,size:d,suffix:be&&E&&!b&&!x?(0,y.jsx)(ue,{icon:(0,y.jsx)(Ce,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":p(`datePicker.clear`),onClick:K,className:m.clearButton}):(0,y.jsx)(`span`,{className:m.calendarIcon,"aria-hidden":`true`,...u(`date-picker`,`icon`),children:(0,y.jsx)(Se,{})})})}),(0,y.jsx)(ie,{ref:He,open:D&&!b&&!x,anchor:j,placement:`bottom-start`,branches:()=>[Be],onDismiss:()=>O(!1),returnFocusOnEscape:()=>j,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":w,"aria-labelledby":T,className:m.popup,onKeyDown:Xe,...u(`date-picker`,`content`,{state:`open`}),children:(0,y.jsxs)(`div`,{className:m.panel,children:[(0,y.jsxs)(`div`,{className:m.header,children:[(0,y.jsx)(`h2`,{id:h,className:m.heading,"aria-live":`polite`,children:Ze}),(0,y.jsxs)(`div`,{className:m.navGroup,children:[(0,y.jsx)(`button`,{type:`button`,className:m.navButton,"aria-label":p(`monthCalendar.previousMonth`),onClick:()=>I(s(F,-1)),children:(0,y.jsx)(ve,{"aria-hidden":!0,focusable:!1})}),(0,y.jsx)(`button`,{type:`button`,className:m.navButton,"aria-label":p(`monthCalendar.nextMonth`),onClick:()=>I(s(F,1)),children:(0,y.jsx)(xe,{"aria-hidden":!0,focusable:!1})})]})]}),(0,y.jsxs)(`div`,{role:`grid`,"aria-labelledby":h,className:m.grid,children:[(0,y.jsx)(`div`,{role:`row`,className:m.week,children:Re.map(e=>(0,y.jsx)(`div`,{role:`columnheader`,className:m.weekday,children:p(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,y.jsx)(`div`,{role:`row`,className:m.week,children:X.slice(t*7,t*7+7).map(e=>{let t=o(e),n=E===t,r=!pe(e,F),i=t===Q,a=U(t);return(0,y.jsx)(`div`,{role:`gridcell`,className:m.day,ref:e=>{e?(V.current.set(t,e),(z&&t===$||H.current===t)&&(H.current=null,e.focus())):V.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===$?0:-1,onFocus:()=>R(t),onClick:()=>q(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,y.jsxs)(`div`,{className:m.footer,children:[(0,y.jsx)(`button`,{type:`button`,className:m.footerButton,disabled:U(Q),onClick:()=>q(Z),children:p(`datePicker.today`)}),be&&E&&(0,y.jsx)(`button`,{type:`button`,className:m.footerButton,onClick:()=>{K(),O(!1)},children:p(`datePicker.clear`)})]})]})})]})},x=v.memo(b)})))()}function C(){let[e,t]=(0,w.useState)(``);return(0,T.jsxs)(`div`,{style:{maxWidth:280},children:[(0,T.jsx)(x,{onChange:t}),(0,T.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var w,T;function E(){return(E=t((()=>{w=n(),S(),T=r()})))()}function ze(){let[e,t]=(0,D.useState)(`2026-04-17`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,O.jsx)(x,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,O.jsx)(d,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,O.jsx)(d,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,O.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var D,O;function k(){return(k=t((()=>{D=n(),_e(),S(),O=r()})))()}function A(){return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,j.jsx)(x,{defaultValue:`2026-04-17`}),(0,j.jsx)(x,{defaultValue:`2026-04-17`,clearable:!1})]})}var j;function M(){return(M=t((()=>{S(),j=r()})))()}function Be(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,N.jsx)(x,{defaultValue:`2026-04-17`,disabled:!0}),(0,N.jsx)(x,{defaultValue:`2026-04-17`,readOnly:!0})]})}var N;function Ve(){return(Ve=t((()=>{S(),N=r()})))()}function He(){return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,P.jsx)(Fe,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,P.jsx)(x,{})}),(0,P.jsx)(Fe,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,P.jsx)(x,{defaultValue:`2026-01-01`})})]})}var P;function Ue(){return(Ue=t((()=>{S(),Pe(),P=r()})))()}function F(){return(0,I.jsx)(`div`,{style:{maxWidth:280},children:(0,I.jsx)(x,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var I;function L(){return(L=t((()=>{S(),I=r()})))()}function R(){return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,z.jsx)(x,{size:`small`,placeholder:`Small`}),(0,z.jsx)(x,{size:`medium`,placeholder:`Medium`}),(0,z.jsx)(x,{size:`large`,placeholder:`Large`})]})}var z;function B(){return(B=t((()=>{S(),z=r()})))()}var V;function H(){return(H=t((()=>{V=`import { useState } from "react";
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
`})))()}var q;function J(){return(J=t((()=>{q=`import { DatePicker, FormField } from "minerva-design";

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
`})))()}var Y;function Ke(){return(Ke=t((()=>{Y=`import { DatePicker } from "minerva-design";

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
`})))()}var X;function qe(){return(qe=t((()=>{X=`import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var Z,Q,$;function Je(){return(Je=t((()=>{E(),k(),M(),Ve(),Ue(),L(),B(),H(),W(),We(),K(),J(),Ke(),qe(),n(),ee(),h(),_(),Ie(),Z=r(),Q=Le(Object.assign({"./demos/basic.tsx":C,"./demos/controlled.tsx":ze,"./demos/default-value.tsx":A,"./demos/disabled.tsx":Be,"./demos/form-control.tsx":He,"./demos/min-max.tsx":F,"./demos/sizes.tsx":R}),Object.assign({"./demos/basic.tsx":V,"./demos/controlled.tsx":U,"./demos/default-value.tsx":G,"./demos/disabled.tsx":Ge,"./demos/form-control.tsx":q,"./demos/min-max.tsx":Y,"./demos/sizes.tsx":X})),$=()=>{let{t:e}=re();return(0,Z.jsx)(g,{id:`date-picker`,demos:Q,children:(0,Z.jsxs)(`section`,{className:f.section,"aria-labelledby":`keyboard`,children:[(0,Z.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,Z.jsxs)(`ul`,{className:f.prose,children:[(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}Je();export{$ as default};