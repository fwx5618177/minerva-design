import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-Dn-CFiHX.js";import{It as o,K as s,Lt as c,dt as l,nt as u,on as d,ut as ee,x as f}from"./angular-preview-l4x8c_2r.js";import{B as te,E as p,R as m,T as h,V as g,w as _,z as v}from"./ProgressIndicator-BMZ0rR7D.js";import{t as y}from"./stylingHooks-PqiNJdev.js";import{i as b,n as x,r as ne,t as re}from"./context-ESLv39g4.js";import{$ as S,Q as C,St as w,Tt as ie,Z as ae,ct as oe,st as se,wt as ce,xt as le}from"./io5-DWV9qlxB.js";import{t as ue}from"./dataAttributes-CDHeJa9q.js";import{i as de,r as fe}from"./CodeBlock-D5dsgj-R.js";import{n as pe,t as me}from"./Input-LfOOMgLE.js";import{i as T,n as he,r as ge,t as E}from"./timePicker.module.scss-D4rKepBP.js";import{n as _e,r as ve,t as ye}from"./tabbing-BcZx0LHW.js";import{i as be,r as D}from"./DemoBlock-Ev3eU-vB.js";import{l as xe,n as Se,t as Ce,u as O}from"./DocPage-BNEhhzRL.js";var k,A,j,we;function M(){return(M=t((()=>{o(),g(),S(),ge(),k=e(n(),1),A=r(),j=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},we=k.memo(({value:e,hasValue:t=!0,use12Hours:n,showSecond:r,hourStep:i=1,minuteStep:a=1,secondStep:o=1,minTime:s,maxTime:c,onTimeChange:l,visible:u,focusOnOpen:d=!1})=>{let{t:p}=te(),m=(0,k.useRef)(null),h=(0,k.useMemo)(()=>e??new Date(0),[e]),g=h.getHours(),_=h.getMinutes(),v=h.getSeconds(),b=g>=12,x=e=>n?e%12+(b?12:0):e,ne=j(n?12:24,i,+!!n,e=>{let t=n?e%12+(b?12:0):e;return!!(s&&t<s.getHours()||c&&t>c.getHours())}),re=j(60,a,0,e=>!!(s&&g===s.getHours()&&e<s.getMinutes()||c&&g===c.getHours()&&e>c.getMinutes())),S=j(60,o,0,e=>{let t=s&&g===s.getHours()&&_===s.getMinutes(),n=c&&g===c.getHours()&&_===c.getMinutes();return!!(t&&e<s.getSeconds()||n&&e>c.getSeconds())}),C=[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],w=[{kind:`hour`,label:p(`timePicker.hours`),items:ne,selected:n?g%12||12:g,toValue:x},{kind:`minute`,label:p(`timePicker.minutes`),items:re,selected:_,toValue:e=>e}];r&&w.push({kind:`second`,label:p(`timePicker.seconds`),items:S,selected:v,toValue:e=>e}),n&&w.push({kind:`ampm`,label:p(`timePicker.period`),items:C,selected:+!!b,toValue:e=>e}),(0,k.useEffect)(()=>{u&&m.current?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`}))},[u]),(0,k.useEffect)(()=>{u&&d&&m.current?.querySelector(`[role="option"][tabindex="0"]`)?.focus()},[u,d]);let ie=(e,t)=>{let n=e.target,r=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),i=r.indexOf(n),a=e=>{(m.current?.querySelectorAll(`[role="listbox"]`)[e])?.querySelector(`[tabindex="0"]`)?.focus()};switch(f(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),r[Math.min(r.length-1,i+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),r[Math.max(0,i-1)]?.focus();break;case`Home`:e.preventDefault(),r[0]?.focus();break;case`End`:e.preventDefault(),r[r.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),a(Math.min(w.length-1,t+1));break;case`ArrowLeft`:e.preventDefault(),a(Math.max(0,t-1))}},ae=(e,t,n)=>{n.disabled||l(e,t(n.value))};return(0,A.jsx)(`div`,{className:T.timePickerPanel,ref:m,children:(0,A.jsx)(`div`,{className:T.timeColumns,children:w.map((e,n)=>{let r=e.items.find(e=>!e.disabled)?.value,i=e.items.some(t=>t.value===e.selected&&!t.disabled)?e.selected:r;return(0,A.jsx)(`div`,{className:T.timeColumn,...y(`time-picker`,`column`),role:`listbox`,"aria-label":e.label,tabIndex:-1,onKeyDown:e=>ie(e,n),children:e.items.map(n=>{let r=t&&n.value===e.selected;return(0,A.jsx)(`div`,{...y(`time-picker`,`item`,{selected:r,disabled:n.disabled}),role:`option`,"aria-selected":r,"aria-disabled":n.disabled||void 0,tabIndex:n.value===i?0:-1,className:ee(T.timeUnit,{[T.selected]:r,[T.disabled]:n.disabled}),onClick:()=>ae(e.kind,e.toValue,n),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),ae(e.kind,e.toValue,n))},children:n.label},n.value)})},e.kind)})})})})})))()}var N,P,F;function I(){return(I=t((()=>{o(),g(),h(),ce(),w(),x(),se(),C(),de(),me(),M(),ye(),he(),N=e(n(),1),P=r(),F=N.memo(({ref:e,value:t,defaultValue:n,onChange:r,format:i=`HH:mm:ss`,use12Hours:a=!1,placeholder:o,label:f,"aria-label":m,"aria-labelledby":h,"aria-describedby":g,id:v,required:x,readOnly:S,invalid:C,name:w=`time-picker`,disabled:se,clearable:ce=!0,size:de=`medium`,className:me=``,style:T,minTime:he,maxTime:ge,showSecond:ye=!0,hourStep:be=1,minuteStep:D=1,secondStep:xe=1,onOpenChange:Se,...Ce})=>{let O=u(i,ye),k=c(O),{t:A}=te(),j=b(),M=re({id:v,"aria-describedby":g}),F=se??j?.disabled??!1,I=S??j?.readOnly??!1,Te=x??j?.required??!1,L=C??j?.invalid??!1,R=f??m??A(`timePicker.label`),z=h??(j&&!f&&!m?j.labelId:void 0),[B,V]=le({value:t,defaultValue:n??null,name:`TimePicker`}),[H,U]=le({defaultValue:!1,onChange:Se,name:`TimePicker`,prop:`open`}),[W,G]=(0,N.useState)(null),[K,q]=(0,N.useState)(null),[Ee,De]=(0,N.useState)(null),Oe=ie(q,e),J=(0,N.useRef)(null),ke=oe(),[Ae,Y]=(0,N.useState)(!1),X=e=>{V(e),r?.(e??void 0)},je=(e,t)=>{let n=new Date(B??s());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}G(null),X(n)},Me=e=>{G(e);let t=l(e,O,{strict:!0,base:B??void 0});t&&X(t)},Z=()=>{if(W!==null){if(W.trim()===``)B&&X(null);else{let e=l(W,O,{strict:!1,base:B??void 0});e&&e.getTime()!==B?.getTime()&&X(e)}G(null)}},Ne=()=>{G(null),X(null),K?.focus()},Pe=()=>{F||I||(Y(!1),U(e=>!e))},Fe=e=>{let t=e.currentTarget;!K||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!_e(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?K:ve(K,ke??K.ownerDocument.body,!1)??K).focus(),U(!1))},Ie=W??(B?d(B,O):``);return(0,P.jsxs)(`div`,{...ue(Ce),ref:De,className:ee(E.timePicker,me),style:T,onClick:e=>{e.target===K&&Pe()},...y(`time-picker`,`root`,{state:H&&!F&&!I?`open`:`closed`,disabled:F,readonly:I,invalid:L,size:de}),children:[(0,P.jsx)(ne.Provider,{value:null,children:(0,P.jsx)(pe,{ref:Oe,value:Ie,placeholder:o??A(`timePicker.placeholder`),id:M.id,"aria-label":R,"aria-labelledby":z,"aria-describedby":M[`aria-describedby`],"aria-invalid":L||void 0,"aria-readonly":I||void 0,required:Te,readOnly:I,onChange:e=>Me(e.target.value),onBlur:Z,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),H?J.current?.querySelector(`[role="option"][tabindex="0"]`)?.focus():(Y(!0),U(!0)))},name:w,disabled:F,size:de,suffix:ce&&B&&!F&&!I?(0,P.jsx)(fe,{icon:(0,P.jsx)(_,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":A(`timePicker.clear`),onClick:Ne,className:E.clearButton}):(0,P.jsx)(`span`,{className:E.clockIcon,"aria-hidden":`true`,...y(`time-picker`,`icon`),children:(0,P.jsx)(p,{})})})}),(0,P.jsx)(ae,{ref:J,open:H&&!F&&!I,anchor:K,placement:`bottom-start`,branches:()=>[Ee],onDismiss:()=>U(!1),returnFocusOnEscape:()=>K,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":R,"aria-labelledby":z,className:E.popup,onKeyDown:Fe,...y(`time-picker`,`content`,{state:`open`}),children:(0,P.jsx)(we,{value:B??s(),hasValue:B!==null,format:O,use12Hours:a,showSecond:k,hourStep:be,minuteStep:D,secondStep:xe,minTime:he,maxTime:ge,onTimeChange:je,visible:H,focusOnOpen:Ae})})]})})})))()}function Te(){let[e,t]=(0,L.useState)();return(0,R.jsxs)(`div`,{children:[(0,R.jsx)(F,{onChange:t}),(0,R.jsxs)(`p`,{children:[`Selected: `,e?e.toLocaleTimeString():`none`]})]})}var L,R;function z(){return(z=t((()=>{L=n(),I(),R=r()})))()}function B(){let[e,t]=(0,V.useState)(null);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`},children:[(0,H.jsx)(F,{label:`Meeting time`,value:e,onChange:e=>t(e??null)}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,H.jsx)(v,{size:`small`,onClick:()=>t(U()),children:`Set to noon`}),(0,H.jsx)(v,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,H.jsxs)(`p`,{children:[`Value: `,e?e.toLocaleTimeString():`null`]})]})}var V,H,U;function W(){return(W=t((()=>{V=n(),m(),I(),H=r(),U=()=>{let e=new Date;return e.setHours(12,0,0,0),e}})))()}function G(){return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,K.jsx)(F,{defaultValue:q}),(0,K.jsx)(F,{defaultValue:q,clearable:!1})]})}var K,q;function Ee(){return(Ee=t((()=>{I(),K=r(),q=new Date,q.setHours(9,30,0)})))()}function De(){return(0,Oe.jsx)(F,{defaultValue:J,disabled:!0})}var Oe,J;function ke(){return(ke=t((()=>{I(),Oe=r(),J=new Date,J.setHours(12,0,0)})))()}function Ae(){return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Y.jsx)(F,{defaultValue:X,format:`HH:mm:ss`}),(0,Y.jsx)(F,{defaultValue:X,format:`HH:mm`,showSecond:!1})]})}var Y,X;function je(){return(je=t((()=>{I(),Y=r(),X=new Date})))()}function Me(){return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Z.jsx)(F,{size:`small`,placeholder:`Small`}),(0,Z.jsx)(F,{size:`medium`,placeholder:`Medium`}),(0,Z.jsx)(F,{size:`large`,placeholder:`Large`})]})}var Z;function Ne(){return(Ne=t((()=>{I(),Z=r()})))()}function Pe(){return(0,Fe.jsx)(F,{format:`HH:mm`,showSecond:!1,hourStep:2,minuteStep:15,placeholder:`Every 2 h / 15 min`})}var Fe;function Ie(){return(Ie=t((()=>{I(),Fe=r()})))()}function Le(){return(0,Re.jsx)(F,{format:`HH:mm`,showSecond:!1,minTime:ze(9),maxTime:ze(17,30),placeholder:`Office hours 09:00–17:30`})}var Re,ze;function Be(){return(Be=t((()=>{I(),Re=r(),ze=(e,t=0)=>{let n=new Date;return n.setHours(e,t,0,0),n}})))()}function Ve(){return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Q.jsx)(F,{use12Hours:!0,format:`hh:mm:ss a`,placeholder:`hh:mm:ss AM`}),(0,Q.jsx)(F,{use12Hours:!0,format:`hh:mm a`,showSecond:!1,placeholder:`hh:mm AM`})]})}var Q;function He(){return(He=t((()=>{I(),Q=r()})))()}var Ue;function We(){return(We=t((()=>{Ue=`import { useState } from "react";
import { TimePicker } from "minerva-design";

export default function BasicDemo() {
  const [time, setTime] = useState<Date>();

  return (
    <div>
      <TimePicker onChange={setTime} />
      <p>Selected: {time ? time.toLocaleTimeString() : "none"}</p>
    </div>
  );
}
`})))()}var Ge;function Ke(){return(Ke=t((()=>{Ge=`import { useState } from "react";
import { Button, TimePicker } from "minerva-design";

const noon = () => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  return date;
};

export default function ControlledDemo() {
  // null keeps the picker controlled while it is empty
  const [time, setTime] = useState<Date | null>(null);

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <TimePicker
        label="Meeting time"
        value={time}
        onChange={(date) => setTime(date ?? null)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="small" onClick={() => setTime(noon())}>
          Set to noon
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setTime(null)}
        >
          Reset
        </Button>
      </div>
      <p>Value: {time ? time.toLocaleTimeString() : "null"}</p>
    </div>
  );
}
`})))()}var qe;function Je(){return(Je=t((()=>{qe=`import { TimePicker } from "minerva-design";

const nineThirty = new Date();
nineThirty.setHours(9, 30, 0);

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker defaultValue={nineThirty} />
      <TimePicker defaultValue={nineThirty} clearable={false} />
    </div>
  );
}
`})))()}var Ye;function Xe(){return(Xe=t((()=>{Ye=`import { TimePicker } from "minerva-design";

const noon = new Date();
noon.setHours(12, 0, 0);

export default function DisabledDemo() {
  return <TimePicker defaultValue={noon} disabled />;
}
`})))()}var Ze;function Qe(){return(Qe=t((()=>{Ze=`import { TimePicker } from "minerva-design";

const now = new Date();

export default function FormatsDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker defaultValue={now} format="HH:mm:ss" />
      <TimePicker defaultValue={now} format="HH:mm" showSecond={false} />
    </div>
  );
}
`})))()}var $e;function et(){return(et=t((()=>{$e=`import { TimePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker size="small" placeholder="Small" />
      <TimePicker size="medium" placeholder="Medium" />
      <TimePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var tt;function nt(){return(nt=t((()=>{tt=`import { TimePicker } from "minerva-design";

export default function StepsDemo() {
  return (
    <TimePicker
      format="HH:mm"
      showSecond={false}
      hourStep={2}
      minuteStep={15}
      placeholder="Every 2 h / 15 min"
    />
  );
}
`})))()}var rt;function it(){return(it=t((()=>{rt=`import { TimePicker } from "minerva-design";

const at = (hours: number, minutes = 0) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export default function TimeRangeDemo() {
  return (
    <TimePicker
      format="HH:mm"
      showSecond={false}
      minTime={at(9)}
      maxTime={at(17, 30)}
      placeholder="Office hours 09:00–17:30"
    />
  );
}
`})))()}var at;function ot(){return(ot=t((()=>{at=`import { TimePicker } from "minerva-design";

export default function TwelveHourDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker use12Hours format="hh:mm:ss a" placeholder="hh:mm:ss AM" />
      <TimePicker
        use12Hours
        format="hh:mm a"
        showSecond={false}
        placeholder="hh:mm AM"
      />
    </div>
  );
}
`})))()}var $,st,ct;function lt(){return(lt=t((()=>{z(),W(),Ee(),ke(),je(),Ne(),Ie(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),it(),ot(),n(),a(),Se(),O(),be(),$=r(),st=xe(Object.assign({"./demos/basic.tsx":Te,"./demos/controlled.tsx":B,"./demos/default-value.tsx":G,"./demos/disabled.tsx":De,"./demos/formats.tsx":Ae,"./demos/sizes.tsx":Me,"./demos/steps.tsx":Pe,"./demos/time-range.tsx":Le,"./demos/twelve-hour.tsx":Ve}),Object.assign({"./demos/basic.tsx":Ue,"./demos/controlled.tsx":Ge,"./demos/default-value.tsx":qe,"./demos/disabled.tsx":Ye,"./demos/formats.tsx":Ze,"./demos/sizes.tsx":$e,"./demos/steps.tsx":tt,"./demos/time-range.tsx":rt,"./demos/twelve-hour.tsx":at})),ct=()=>{let{t:e}=i();return(0,$.jsx)(Ce,{id:`time-picker`,demos:st,children:(0,$.jsxs)(`section`,{className:D.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.time-picker.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:D.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.select`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.typing`)})]})]})})}})))()}lt();export{ct as default};