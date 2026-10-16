import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{$ as i,Ct as a,Dt as o,Et as ee,J as te,Ot as ne,Q as re,St as ie,Tt as ae,ct as oe,et as se,lt as ce,q as le}from"./io5-BAuU0sG1.js";import{Et as s,H as ue,It as de,Wt as c,Zt as fe,qt as l,tn as u,ut as pe,x as me}from"./angular-preview-l4x8c_2r.js";import{H as he,R as ge,S as _e,T as ve,U as d,g as ye,r as be,w as xe,z as Se}from"./ProgressIndicator-BhPa7d9i.js";import{i as Ce,n as we,r as Te,t as Ee}from"./context-ESLv39g4.js";import{t as De}from"./dataAttributes-CDHeJa9q.js";import{n as Oe,t as f}from"./Input-CKvZRF7q.js";import{n as ke,r as Ae,t as je}from"./tabbing-BcZx0LHW.js";import{a as Me,r as p}from"./FormControl-BkwPT394.js";import{i as Ne,r as m}from"./DemoBlock-B5Eyqqua.js";import{l as h,n as Pe,t as g,u as _}from"./DocPage-BJtkZ4N3.js";var v,y,b,Fe,Ie,x,S,C,w,T,E,D,O,k,Le,A;function Re(){return(Re=t((()=>{v=`_datePicker_6el17_1`,y=`_clearButton_6el17_6`,b=`_calendarIcon_6el17_22`,Fe=`_popup_6el17_29`,Ie=`_panel_6el17_34`,x=`_header_6el17_46`,S=`_heading_6el17_54`,C=`_navGroup_6el17_61`,w=`_navButton_6el17_67`,T=`_grid_6el17_92`,E=`_week_6el17_96`,D=`_weekday_6el17_103`,O=`_day_6el17_111`,k=`_footer_6el17_157`,Le=`_footerButton_6el17_165`,A={datePicker:v,clearButton:y,calendarIcon:b,popup:Fe,panel:Ie,header:x,heading:S,navGroup:C,navButton:w,grid:T,week:E,weekday:D,day:O,footer:k,footerButton:Le}})))()}var j,M,ze,Be,N;function P(){return(P=t((()=>{de(),d(),ve(),ae(),a(),we(),oe(),se(),i(),te(),f(),je(),Re(),j=e(n(),1),M=r(),ze=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],Be=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":o,"aria-labelledby":te,"aria-describedby":ne,id:ae,required:oe,readOnly:se,invalid:de,name:ge=`date-picker`,disabled:ve,clearable:d=!0,size:Se=`medium`,minDate:we,maxDate:f,locale:je,className:Me=``,style:p,onOpenChange:Ne,...m})=>{let{t:h,language:Pe}=he(),g=(0,j.useId)(),_=Ce(),v=Ee({id:ae,"aria-describedby":ne}),y=ve??_?.disabled??!1,b=se??_?.readOnly??!1,Fe=oe??_?.required??!1,Ie=de??_?.invalid??!1,x=a??o??h(`datePicker.label`),S=te??(_&&!a&&!o?_.labelId:void 0),[C,w]=ie({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[T,E]=ie({defaultValue:!1,onChange:Ne,name:`DatePicker`,prop:`open`}),[D,O]=(0,j.useState)(null),[k,Le]=(0,j.useState)(null),[Re,Be]=(0,j.useState)(null),N=ee(Le,e),P=(0,j.useRef)(null),Ve=ce(),F=l(C||``)??new Date,[I,L]=(0,j.useState)(()=>c(F)),[He,R]=(0,j.useState)(``),[z,B]=(0,j.useState)(!1),V=(0,j.useRef)(new Map),H=(0,j.useRef)(null),U=e=>!!(we&&e<we||f&&e>f),W=e=>{w(e),r?.(e)},G=e=>{let t=l(e);t&&L(c(t))},Ue=e=>{if(O(e),e===``){W(``);return}let t=l(e,!0);if(t){let e=s(t);U(e)||(W(e),L(c(t)))}},We=()=>{if(D===null)return;let e=D.trim();if(e===``)C&&W(``);else{let t=l(e,!1);if(t){let e=s(t);!U(e)&&e!==C&&(W(e),L(c(t)))}}O(null)},K=()=>{O(null),W(``),k?.focus()},q=e=>{let t=s(e);y||b||U(t)||(O(null),W(t),L(c(e)),E(!1),k?.focus())},Ge=()=>{y||b||(B(!1),T||G(C),E(e=>!e))},J=c(I),Ke=u(J,-((J.getDay()+6)%7)),qe=Array.from({length:42},(e,t)=>u(Ke,t)),Y=qe.map(s),X=new Date,Z=s(X),Q=[He,C,fe(X,I)?Z:``,s(J)].find(e=>e&&Y.includes(e)),Je=s(J);(0,j.useEffect)(()=>{if(!T||y||!H.current)return;let e=V.current.get(H.current);e&&(H.current=null,e.focus())},[T,Je,He,y]);let Ye=(e,t)=>{if(y||b)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||q(t);return}let n,r=(t.getDay()+6)%7;switch(me(e.key,e.currentTarget)){case`ArrowLeft`:n=u(t,-1);break;case`ArrowRight`:n=u(t,1);break;case`ArrowUp`:n=u(t,-7);break;case`ArrowDown`:n=u(t,7);break;case`Home`:n=u(t,-r);break;case`End`:n=u(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=c(t,r),a=u(c(i,1),-1).getDate();n=ue(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=s(n);H.current=i,R(i),fe(n,I)||L(c(n))},Xe=e=>{let t=e.currentTarget;!k||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!ke(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?k:Ae(k,Ve??k.ownerDocument.body,!1)??k).focus(),E(!1))},Ze=new Intl.DateTimeFormat(je??Pe,{year:`numeric`,month:`long`}).format(J),Qe=D??C;return(0,M.jsxs)(`div`,{...De(m),ref:Be,className:pe(A.datePicker,Me),style:p,onClick:e=>{e.target===k&&Ge()},children:[(0,M.jsx)(Te.Provider,{value:null,children:(0,M.jsx)(Oe,{ref:N,value:Qe,placeholder:i??h(`datePicker.placeholder`),id:v.id,"aria-label":x,"aria-labelledby":S,"aria-describedby":v[`aria-describedby`],"aria-invalid":Ie||void 0,"aria-readonly":b||void 0,required:Fe,readOnly:b,onChange:e=>Ue(e.target.value),onBlur:We,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),T?P.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(G(C),R(C||Z),B(!0),E(!0)))},name:ge,disabled:y,size:Se,suffix:d&&C&&!y&&!b?(0,M.jsx)(le,{icon:(0,M.jsx)(xe,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":h(`datePicker.clear`),onClick:K,className:A.clearButton}):(0,M.jsx)(`span`,{className:A.calendarIcon,"aria-hidden":`true`,children:(0,M.jsx)(be,{})})})}),(0,M.jsx)(re,{ref:P,open:T&&!y&&!b,anchor:k,placement:`bottom-start`,branches:()=>[Re],onDismiss:()=>E(!1),returnFocusOnEscape:()=>k,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":x,"aria-labelledby":S,className:A.popup,onKeyDown:Xe,children:(0,M.jsxs)(`div`,{className:A.panel,children:[(0,M.jsxs)(`div`,{className:A.header,children:[(0,M.jsx)(`h2`,{id:g,className:A.heading,"aria-live":`polite`,children:Ze}),(0,M.jsxs)(`div`,{className:A.navGroup,children:[(0,M.jsx)(`button`,{type:`button`,className:A.navButton,"aria-label":h(`monthCalendar.previousMonth`),onClick:()=>L(c(I,-1)),children:(0,M.jsx)(_e,{"aria-hidden":!0,focusable:!1})}),(0,M.jsx)(`button`,{type:`button`,className:A.navButton,"aria-label":h(`monthCalendar.nextMonth`),onClick:()=>L(c(I,1)),children:(0,M.jsx)(ye,{"aria-hidden":!0,focusable:!1})})]})]}),(0,M.jsxs)(`div`,{role:`grid`,"aria-labelledby":g,className:A.grid,children:[(0,M.jsx)(`div`,{role:`row`,className:A.week,children:ze.map(e=>(0,M.jsx)(`div`,{role:`columnheader`,className:A.weekday,children:h(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,M.jsx)(`div`,{role:`row`,className:A.week,children:qe.slice(t*7,t*7+7).map(e=>{let t=s(e),n=C===t,r=!fe(e,I),i=t===Z,a=U(t);return(0,M.jsx)(`div`,{role:`gridcell`,className:A.day,ref:e=>{e?(V.current.set(t,e),(z&&t===Q||H.current===t)&&(H.current=null,e.focus())):V.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===Q?0:-1,onFocus:()=>R(t),onClick:()=>q(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,M.jsxs)(`div`,{className:A.footer,children:[(0,M.jsx)(`button`,{type:`button`,className:A.footerButton,disabled:U(Z),onClick:()=>q(X),children:h(`datePicker.today`)}),d&&C&&(0,M.jsx)(`button`,{type:`button`,className:A.footerButton,onClick:()=>{K(),E(!1)},children:h(`datePicker.clear`)})]})]})})]})},N=j.memo(Be)})))()}function Ve(){let[e,t]=(0,F.useState)(``);return(0,I.jsxs)(`div`,{style:{maxWidth:280},children:[(0,I.jsx)(N,{onChange:t}),(0,I.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var F,I;function L(){return(L=t((()=>{F=n(),P(),I=r()})))()}function He(){let[e,t]=(0,R.useState)(`2026-04-17`);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,z.jsx)(N,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,z.jsx)(Se,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,z.jsx)(Se,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,z.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var R,z;function B(){return(B=t((()=>{R=n(),ge(),P(),z=r()})))()}function V(){return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,H.jsx)(N,{defaultValue:`2026-04-17`}),(0,H.jsx)(N,{defaultValue:`2026-04-17`,clearable:!1})]})}var H;function U(){return(U=t((()=>{P(),H=r()})))()}function W(){return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,G.jsx)(N,{defaultValue:`2026-04-17`,disabled:!0}),(0,G.jsx)(N,{defaultValue:`2026-04-17`,readOnly:!0})]})}var G;function Ue(){return(Ue=t((()=>{P(),G=r()})))()}function We(){return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,K.jsx)(p,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,K.jsx)(N,{})}),(0,K.jsx)(p,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,K.jsx)(N,{defaultValue:`2026-01-01`})})]})}var K;function q(){return(q=t((()=>{P(),Me(),K=r()})))()}function Ge(){return(0,J.jsx)(`div`,{style:{maxWidth:280},children:(0,J.jsx)(N,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var J;function Ke(){return(Ke=t((()=>{P(),J=r()})))()}function qe(){return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,Y.jsx)(N,{size:`small`,placeholder:`Small`}),(0,Y.jsx)(N,{size:`medium`,placeholder:`Medium`}),(0,Y.jsx)(N,{size:`large`,placeholder:`Large`})]})}var Y;function X(){return(X=t((()=>{P(),Y=r()})))()}var Z;function Q(){return(Q=t((()=>{Z=`import { useState } from "react";
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
`})))()}var Je;function Ye(){return(Ye=t((()=>{Je=`import { useState } from "react";
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
`})))()}var Xe;function Ze(){return(Ze=t((()=>{Xe=`import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}
`})))()}var Qe;function $e(){return($e=t((()=>{Qe=`import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}
`})))()}var et;function tt(){return(tt=t((()=>{et=`import { DatePicker, FormField } from "minerva-design";

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
`})))()}var nt;function rt(){return(rt=t((()=>{nt=`import { DatePicker } from "minerva-design";

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
`})))()}var it;function at(){return(at=t((()=>{it=`import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var $,ot,st;function ct(){return(ct=t((()=>{L(),B(),U(),Ue(),q(),Ke(),X(),Q(),Ye(),Ze(),$e(),tt(),rt(),at(),n(),o(),Pe(),_(),Ne(),$=r(),ot=h(Object.assign({"./demos/basic.tsx":Ve,"./demos/controlled.tsx":He,"./demos/default-value.tsx":V,"./demos/disabled.tsx":W,"./demos/form-control.tsx":We,"./demos/min-max.tsx":Ge,"./demos/sizes.tsx":qe}),Object.assign({"./demos/basic.tsx":Z,"./demos/controlled.tsx":Je,"./demos/default-value.tsx":Xe,"./demos/disabled.tsx":Qe,"./demos/form-control.tsx":et,"./demos/min-max.tsx":nt,"./demos/sizes.tsx":it})),st=()=>{let{t:e}=ne();return(0,$.jsx)(g,{id:`date-picker`,demos:ot,children:(0,$.jsxs)(`section`,{className:m.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:m.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,$.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}ct();export{st as default};