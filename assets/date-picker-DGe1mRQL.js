import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-DCfTAA6w.js";import{Ct as ee,Pt as o,Zt as te,_ as ne,hr as s,mt as c,rt as l,wn as re,zt as ie}from"./angular-preview-BdNkX8l5.js";import{B as ae,R as oe,S as se,T as ce,V as le,g as ue,r as de,w as fe,z as u}from"./ProgressIndicator-Har2Rnl4.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{i as pe,n as me,r as he,t as ge}from"./context-ESLv39g4.js";import{$ as _e,Q as ve,St as ye,Tt as be,Z as xe,ct as Se,st as Ce,wt as f,xt as we}from"./io5-Bd77grqv.js";import{t as Te}from"./dataAttributes-CDHeJa9q.js";import{i as p,r as Ee}from"./CodeBlock-BJ07eATS.js";import{n as De,t as m}from"./Input-vrV6fRUF.js";import{n as Oe,r as ke,t as Ae}from"./tabbing-Et9fEEZY.js";import{a as je,r as Me}from"./FormControl-D6cmtn4I.js";import{i as Ne,r as Pe}from"./DemoBlock-3GeNGDfh.js";import{n as h,t as g}from"./datePicker.module.scss-DX9bDRIx.js";import{l as Fe,n as Ie,t as _,u as v}from"./DocPage-B9A8Jzu-.js";var y,b,Le,x,S;function C(){return(C=t((()=>{re(),le(),ce(),f(),ye(),me(),Ce(),_e(),ve(),p(),m(),Ae(),h(),y=e(n(),1),b=r(),Le=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],x=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":re,"aria-labelledby":oe,"aria-describedby":ce,id:le,required:u,readOnly:me,invalid:_e,name:ve=`date-picker`,disabled:ye,clearable:Ce=!0,size:f=`medium`,minDate:p,maxDate:m,locale:Ae,className:je=``,style:Me,onOpenChange:Ne,...Pe})=>{let{t:h,language:Fe}=ae(),Ie=(0,y.useId)(),_=pe(),v=ge({id:le,"aria-describedby":ce}),x=ye??_?.disabled??!1,S=me??_?.readOnly??!1,C=u??_?.required??!1,w=_e??_?.invalid??!1,T=a??re??h(`datePicker.label`),E=oe??(_&&!a&&!re?_.labelId:void 0),[D,Re]=we({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[O,k]=we({defaultValue:!1,onChange:Ne,name:`DatePicker`,prop:`open`}),[A,j]=(0,y.useState)(null),[M,ze]=(0,y.useState)(null),[Be,N]=(0,y.useState)(null),Ve=be(ze,e),He=(0,y.useRef)(null),P=Se(),Ue=c(D||``)??new Date,[F,I]=(0,y.useState)(()=>l(Ue)),[L,R]=(0,y.useState)(``),[z,B]=(0,y.useState)(!1),V=(0,y.useRef)(new Map),H=(0,y.useRef)(null),U=e=>!!(p&&e<p||m&&e>m),W=e=>{Re(e),r?.(e)},G=e=>{let t=c(e);t&&I(l(t))},K=e=>{if(j(e),e===``){W(``);return}let t=c(e,!0);if(t){let e=o(t);U(e)||(W(e),I(l(t)))}},We=()=>{if(A===null)return;let e=A.trim();if(e===``)D&&W(``);else{let t=c(e,!1);if(t){let e=o(t);!U(e)&&e!==D&&(W(e),I(l(t)))}}j(null)},q=()=>{j(null),W(``),M?.focus()},J=e=>{let t=o(e);x||S||U(t)||(j(null),W(t),I(l(e)),k(!1),M?.focus())},Ge=()=>{x||S||(B(!1),O||G(D),k(e=>!e))},Y=l(F),Ke=s(Y,-((Y.getDay()+6)%7)),X=Array.from({length:42},(e,t)=>s(Ke,t)),qe=X.map(o),Z=new Date,Q=o(Z),$=[L,D,ie(Z,F)?Q:``,o(Y)].find(e=>e&&qe.includes(e)),Je=o(Y);(0,y.useEffect)(()=>{if(!O||x||!H.current)return;let e=V.current.get(H.current);e&&(H.current=null,e.focus())},[O,Je,L,x]);let Ye=(e,t)=>{if(x||S)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||J(t);return}let n,r=(t.getDay()+6)%7;switch(ne(e.key,e.currentTarget)){case`ArrowLeft`:n=s(t,-1);break;case`ArrowRight`:n=s(t,1);break;case`ArrowUp`:n=s(t,-7);break;case`ArrowDown`:n=s(t,7);break;case`Home`:n=s(t,-r);break;case`End`:n=s(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=l(t,r),a=s(l(i,1),-1).getDate();n=ee(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=o(n);H.current=i,R(i),ie(n,F)||I(l(n))},Xe=e=>{let t=e.currentTarget;!M||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!Oe(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?M:ke(M,P??M.ownerDocument.body,!1)??M).focus(),k(!1))},Ze=new Intl.DateTimeFormat(Ae??Fe,{year:`numeric`,month:`long`}).format(Y),Qe=A??D;return(0,b.jsxs)(`div`,{...Te(Pe),...d(`date-picker`,`root`,{state:O&&!x&&!S?`open`:`closed`,disabled:x,readonly:S,invalid:w,size:f}),ref:N,className:te(g.datePicker,je),style:Me,onClick:e=>{e.target===M&&Ge()},children:[(0,b.jsx)(he.Provider,{value:null,children:(0,b.jsx)(De,{ref:Ve,value:Qe,placeholder:i??h(`datePicker.placeholder`),id:v.id,"aria-label":T,"aria-labelledby":E,"aria-describedby":v[`aria-describedby`],"aria-invalid":w||void 0,"aria-readonly":S||void 0,required:C,readOnly:S,onChange:e=>K(e.target.value),onBlur:We,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),O?He.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(G(D),R(D||Q),B(!0),k(!0)))},name:ve,disabled:x,size:f,suffix:Ce&&D&&!x&&!S?(0,b.jsx)(Ee,{icon:(0,b.jsx)(fe,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":h(`datePicker.clear`),onClick:q,className:g.clearButton}):(0,b.jsx)(`span`,{className:g.calendarIcon,"aria-hidden":`true`,...d(`date-picker`,`icon`),children:(0,b.jsx)(de,{})})})}),(0,b.jsx)(xe,{ref:He,open:O&&!x&&!S,anchor:M,placement:`bottom-start`,branches:()=>[Be],onDismiss:()=>k(!1),returnFocusOnEscape:()=>M,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":T,"aria-labelledby":E,className:g.popup,onKeyDown:Xe,...d(`date-picker`,`content`,{state:`open`}),children:(0,b.jsxs)(`div`,{className:g.panel,children:[(0,b.jsxs)(`div`,{className:g.header,children:[(0,b.jsx)(`h2`,{id:Ie,className:g.heading,"aria-live":`polite`,children:Ze}),(0,b.jsxs)(`div`,{className:g.navGroup,children:[(0,b.jsx)(`button`,{type:`button`,className:g.navButton,"aria-label":h(`monthCalendar.previousMonth`),onClick:()=>I(l(F,-1)),children:(0,b.jsx)(se,{"aria-hidden":!0,focusable:!1})}),(0,b.jsx)(`button`,{type:`button`,className:g.navButton,"aria-label":h(`monthCalendar.nextMonth`),onClick:()=>I(l(F,1)),children:(0,b.jsx)(ue,{"aria-hidden":!0,focusable:!1})})]})]}),(0,b.jsxs)(`div`,{role:`grid`,"aria-labelledby":Ie,className:g.grid,children:[(0,b.jsx)(`div`,{role:`row`,className:g.week,children:Le.map(e=>(0,b.jsx)(`div`,{role:`columnheader`,className:g.weekday,children:h(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,b.jsx)(`div`,{role:`row`,className:g.week,children:X.slice(t*7,t*7+7).map(e=>{let t=o(e),n=D===t,r=!ie(e,F),i=t===Q,a=U(t);return(0,b.jsx)(`div`,{role:`gridcell`,className:g.day,ref:e=>{e?(V.current.set(t,e),(z&&t===$||H.current===t)&&(H.current=null,e.focus())):V.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===$?0:-1,onFocus:()=>R(t),onClick:()=>J(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,b.jsxs)(`div`,{className:g.footer,children:[(0,b.jsx)(`button`,{type:`button`,className:g.footerButton,disabled:U(Q),onClick:()=>J(Z),children:h(`datePicker.today`)}),Ce&&D&&(0,b.jsx)(`button`,{type:`button`,className:g.footerButton,onClick:()=>{q(),k(!1)},children:h(`datePicker.clear`)})]})]})})]})},S=y.memo(x)})))()}function w(){let[e,t]=(0,T.useState)(``);return(0,E.jsxs)(`div`,{style:{maxWidth:280},children:[(0,E.jsx)(S,{onChange:t}),(0,E.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var T,E;function D(){return(D=t((()=>{T=n(),C(),E=r()})))()}function Re(){let[e,t]=(0,O.useState)(`2026-04-17`);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,k.jsx)(S,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,k.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,k.jsx)(u,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,k.jsx)(u,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,k.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var O,k;function A(){return(A=t((()=>{O=n(),oe(),C(),k=r()})))()}function j(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,M.jsx)(S,{defaultValue:`2026-04-17`}),(0,M.jsx)(S,{defaultValue:`2026-04-17`,clearable:!1})]})}var M;function ze(){return(ze=t((()=>{C(),M=r()})))()}function Be(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,N.jsx)(S,{defaultValue:`2026-04-17`,disabled:!0}),(0,N.jsx)(S,{defaultValue:`2026-04-17`,readOnly:!0})]})}var N;function Ve(){return(Ve=t((()=>{C(),N=r()})))()}function He(){return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,P.jsx)(Me,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,P.jsx)(S,{})}),(0,P.jsx)(Me,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,P.jsx)(S,{defaultValue:`2026-01-01`})})]})}var P;function Ue(){return(Ue=t((()=>{C(),je(),P=r()})))()}function F(){return(0,I.jsx)(`div`,{style:{maxWidth:280},children:(0,I.jsx)(S,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var I;function L(){return(L=t((()=>{C(),I=r()})))()}function R(){return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,z.jsx)(S,{size:`small`,placeholder:`Small`}),(0,z.jsx)(S,{size:`medium`,placeholder:`Medium`}),(0,z.jsx)(S,{size:`large`,placeholder:`Large`})]})}var z;function B(){return(B=t((()=>{C(),z=r()})))()}var V;function H(){return(H=t((()=>{V=`import { useState } from "react";
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
`})))()}var G;function K(){return(K=t((()=>{G=`import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}
`})))()}var We;function q(){return(q=t((()=>{We=`import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}
`})))()}var J;function Ge(){return(Ge=t((()=>{J=`import { DatePicker, FormField } from "minerva-design";

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
`})))()}var Z,Q,$;function Je(){return(Je=t((()=>{D(),A(),ze(),Ve(),Ue(),L(),B(),H(),W(),K(),q(),Ge(),Ke(),qe(),n(),a(),Ie(),v(),Ne(),Z=r(),Q=Fe(Object.assign({"./demos/basic.tsx":w,"./demos/controlled.tsx":Re,"./demos/default-value.tsx":j,"./demos/disabled.tsx":Be,"./demos/form-control.tsx":He,"./demos/min-max.tsx":F,"./demos/sizes.tsx":R}),Object.assign({"./demos/basic.tsx":V,"./demos/controlled.tsx":U,"./demos/default-value.tsx":G,"./demos/disabled.tsx":We,"./demos/form-control.tsx":J,"./demos/min-max.tsx":Y,"./demos/sizes.tsx":X})),$=()=>{let{t:e}=i();return(0,Z.jsx)(_,{id:`date-picker`,demos:Q,children:(0,Z.jsxs)(`section`,{className:Pe.section,"aria-labelledby":`keyboard`,children:[(0,Z.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,Z.jsxs)(`ul`,{className:Pe.prose,children:[(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}Je();export{$ as default};