import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{i,r as a}from"./DemoBlock-BJ0_y9F8.js";import{n as o,t as s}from"./useTranslation-BzoVi22c.js";import{It as c,K as l,Lt as u,dt as d,nt as f,on as p,ut as ee,x as te}from"./angular-preview-l4x8c_2r.js";import{B as m,E as h,H as ne,R as g,T as _,U as v,w as y,z as b}from"./ProgressIndicator-BhPa7d9i.js";import{i as re,n as x,r as ie,t as ae}from"./context-ESLv39g4.js";import{$ as S,Ct as C,Et as w,J as oe,Q as se,St as ce,Tt as le,ct as ue,et as de,lt as fe,q as pe}from"./io5-DF7HdQ2g.js";import{t as me}from"./dataAttributes-CDHeJa9q.js";import{n as he,t as ge}from"./Input-DboHcSJW.js";import{i as T,n as _e,r as ve,t as E}from"./timePicker.module.scss-D4rKepBP.js";import{n as ye,r as be,t as xe}from"./tabbing-BcZx0LHW.js";import{l as Se,n as Ce,t as we,u as D}from"./DocPage-B2iACtLP.js";var O,k,A,Te;function j(){return(j=t((()=>{c(),v(),de(),ve(),O=e(n(),1),k=r(),A=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},Te=O.memo(({value:e,hasValue:t=!0,use12Hours:n,showSecond:r,hourStep:i=1,minuteStep:a=1,secondStep:o=1,minTime:s,maxTime:c,onTimeChange:l,visible:u,focusOnOpen:d=!1})=>{let{t:f}=ne(),p=(0,O.useRef)(null),h=(0,O.useMemo)(()=>e??new Date(0),[e]),g=h.getHours(),_=h.getMinutes(),v=h.getSeconds(),y=g>=12,b=e=>n?e%12+(y?12:0):e,re=A(n?12:24,i,+!!n,e=>{let t=n?e%12+(y?12:0):e;return!!(s&&t<s.getHours()||c&&t>c.getHours())}),x=A(60,a,0,e=>!!(s&&g===s.getHours()&&e<s.getMinutes()||c&&g===c.getHours()&&e>c.getMinutes())),ie=A(60,o,0,e=>{let t=s&&g===s.getHours()&&_===s.getMinutes(),n=c&&g===c.getHours()&&_===c.getMinutes();return!!(t&&e<s.getSeconds()||n&&e>c.getSeconds())}),ae=[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],S=[{kind:`hour`,label:f(`timePicker.hours`),items:re,selected:n?g%12||12:g,toValue:b},{kind:`minute`,label:f(`timePicker.minutes`),items:x,selected:_,toValue:e=>e}];r&&S.push({kind:`second`,label:f(`timePicker.seconds`),items:ie,selected:v,toValue:e=>e}),n&&S.push({kind:`ampm`,label:f(`timePicker.period`),items:ae,selected:+!!y,toValue:e=>e}),(0,O.useEffect)(()=>{u&&p.current?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`}))},[u]),(0,O.useEffect)(()=>{u&&d&&p.current?.querySelector(`[role="option"][tabindex="0"]`)?.focus()},[u,d]);let C=(e,t)=>{let n=e.target,r=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),i=r.indexOf(n),a=e=>{(p.current?.querySelectorAll(`[role="listbox"]`)[e])?.querySelector(`[tabindex="0"]`)?.focus()};switch(te(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),r[Math.min(r.length-1,i+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),r[Math.max(0,i-1)]?.focus();break;case`Home`:e.preventDefault(),r[0]?.focus();break;case`End`:e.preventDefault(),r[r.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),a(Math.min(S.length-1,t+1));break;case`ArrowLeft`:e.preventDefault(),a(Math.max(0,t-1))}},w=(e,t,n)=>{n.disabled||l(e,t(n.value))};return(0,k.jsx)(`div`,{className:T.timePickerPanel,ref:p,children:(0,k.jsx)(`div`,{className:T.timeColumns,children:S.map((e,n)=>{let r=e.items.find(e=>!e.disabled)?.value,i=e.items.some(t=>t.value===e.selected&&!t.disabled)?e.selected:r;return(0,k.jsx)(`div`,{className:T.timeColumn,...m(`time-picker`,`column`),role:`listbox`,"aria-label":e.label,tabIndex:-1,onKeyDown:e=>C(e,n),children:e.items.map(n=>{let r=t&&n.value===e.selected;return(0,k.jsx)(`div`,{...m(`time-picker`,`item`,{selected:r,disabled:n.disabled}),role:`option`,"aria-selected":r,"aria-disabled":n.disabled||void 0,tabIndex:n.value===i?0:-1,className:ee(T.timeUnit,{[T.selected]:r,[T.disabled]:n.disabled}),onClick:()=>w(e.kind,e.toValue,n),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),w(e.kind,e.toValue,n))},children:n.label},n.value)})},e.kind)})})})})})))()}var M,N,P;function F(){return(F=t((()=>{c(),v(),_(),le(),C(),x(),ue(),S(),oe(),ge(),j(),xe(),_e(),M=e(n(),1),N=r(),P=M.memo(({ref:e,value:t,defaultValue:n,onChange:r,format:i=`HH:mm:ss`,use12Hours:a=!1,placeholder:o,label:s,"aria-label":c,"aria-labelledby":te,"aria-describedby":g,id:_,required:v,readOnly:b,invalid:x,name:S=`time-picker`,disabled:C,clearable:oe=!0,size:le=`medium`,className:ue=``,style:de,minTime:ge,maxTime:T,showSecond:_e=!0,hourStep:ve=1,minuteStep:xe=1,secondStep:Se=1,onOpenChange:Ce,...we})=>{let D=f(i,_e),O=u(D),{t:k}=ne(),A=re(),j=ae({id:_,"aria-describedby":g}),P=C??A?.disabled??!1,F=b??A?.readOnly??!1,Ee=v??A?.required??!1,I=x??A?.invalid??!1,L=s??c??k(`timePicker.label`),R=te??(A&&!s&&!c?A.labelId:void 0),[z,B]=ce({value:t,defaultValue:n??null,name:`TimePicker`}),[V,H]=ce({defaultValue:!1,onChange:Ce,name:`TimePicker`,prop:`open`}),[U,W]=(0,M.useState)(null),[G,K]=(0,M.useState)(null),[q,De]=(0,M.useState)(null),Oe=w(K,e),J=(0,M.useRef)(null),ke=fe(),[Ae,Y]=(0,M.useState)(!1),X=e=>{B(e),r?.(e??void 0)},je=(e,t)=>{let n=new Date(z??l());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}W(null),X(n)},Me=e=>{W(e);let t=d(e,D,{strict:!0,base:z??void 0});t&&X(t)},Z=()=>{if(U!==null){if(U.trim()===``)z&&X(null);else{let e=d(U,D,{strict:!1,base:z??void 0});e&&e.getTime()!==z?.getTime()&&X(e)}W(null)}},Ne=()=>{W(null),X(null),G?.focus()},Pe=()=>{P||F||(Y(!1),H(e=>!e))},Fe=e=>{let t=e.currentTarget;!G||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!ye(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?G:be(G,ke??G.ownerDocument.body,!1)??G).focus(),H(!1))},Ie=U??(z?p(z,D):``);return(0,N.jsxs)(`div`,{...me(we),ref:De,className:ee(E.timePicker,ue),style:de,onClick:e=>{e.target===G&&Pe()},...m(`time-picker`,`root`,{state:V&&!P&&!F?`open`:`closed`,disabled:P,readonly:F,invalid:I,size:le}),children:[(0,N.jsx)(ie.Provider,{value:null,children:(0,N.jsx)(he,{ref:Oe,value:Ie,placeholder:o??k(`timePicker.placeholder`),id:j.id,"aria-label":L,"aria-labelledby":R,"aria-describedby":j[`aria-describedby`],"aria-invalid":I||void 0,"aria-readonly":F||void 0,required:Ee,readOnly:F,onChange:e=>Me(e.target.value),onBlur:Z,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),V?J.current?.querySelector(`[role="option"][tabindex="0"]`)?.focus():(Y(!0),H(!0)))},name:S,disabled:P,size:le,suffix:oe&&z&&!P&&!F?(0,N.jsx)(pe,{icon:(0,N.jsx)(y,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":k(`timePicker.clear`),onClick:Ne,className:E.clearButton}):(0,N.jsx)(`span`,{className:E.clockIcon,"aria-hidden":`true`,...m(`time-picker`,`icon`),children:(0,N.jsx)(h,{})})})}),(0,N.jsx)(se,{ref:J,open:V&&!P&&!F,anchor:G,placement:`bottom-start`,branches:()=>[q],onDismiss:()=>H(!1),returnFocusOnEscape:()=>G,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":L,"aria-labelledby":R,className:E.popup,onKeyDown:Fe,...m(`time-picker`,`content`,{state:`open`}),children:(0,N.jsx)(Te,{value:z??l(),hasValue:z!==null,format:D,use12Hours:a,showSecond:O,hourStep:ve,minuteStep:xe,secondStep:Se,minTime:ge,maxTime:T,onTimeChange:je,visible:V,focusOnOpen:Ae})})]})})})))()}function Ee(){let[e,t]=(0,I.useState)();return(0,L.jsxs)(`div`,{children:[(0,L.jsx)(P,{onChange:t}),(0,L.jsxs)(`p`,{children:[`Selected: `,e?e.toLocaleTimeString():`none`]})]})}var I,L;function R(){return(R=t((()=>{I=n(),F(),L=r()})))()}function z(){let[e,t]=(0,B.useState)(null);return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`},children:[(0,V.jsx)(P,{label:`Meeting time`,value:e,onChange:e=>t(e??null)}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,V.jsx)(b,{size:`small`,onClick:()=>t(H()),children:`Set to noon`}),(0,V.jsx)(b,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,V.jsxs)(`p`,{children:[`Value: `,e?e.toLocaleTimeString():`null`]})]})}var B,V,H;function U(){return(U=t((()=>{B=n(),g(),F(),V=r(),H=()=>{let e=new Date;return e.setHours(12,0,0,0),e}})))()}function W(){return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,G.jsx)(P,{defaultValue:K}),(0,G.jsx)(P,{defaultValue:K,clearable:!1})]})}var G,K;function q(){return(q=t((()=>{F(),G=r(),K=new Date,K.setHours(9,30,0)})))()}function De(){return(0,Oe.jsx)(P,{defaultValue:J,disabled:!0})}var Oe,J;function ke(){return(ke=t((()=>{F(),Oe=r(),J=new Date,J.setHours(12,0,0)})))()}function Ae(){return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Y.jsx)(P,{defaultValue:X,format:`HH:mm:ss`}),(0,Y.jsx)(P,{defaultValue:X,format:`HH:mm`,showSecond:!1})]})}var Y,X;function je(){return(je=t((()=>{F(),Y=r(),X=new Date})))()}function Me(){return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Z.jsx)(P,{size:`small`,placeholder:`Small`}),(0,Z.jsx)(P,{size:`medium`,placeholder:`Medium`}),(0,Z.jsx)(P,{size:`large`,placeholder:`Large`})]})}var Z;function Ne(){return(Ne=t((()=>{F(),Z=r()})))()}function Pe(){return(0,Fe.jsx)(P,{format:`HH:mm`,showSecond:!1,hourStep:2,minuteStep:15,placeholder:`Every 2 h / 15 min`})}var Fe;function Ie(){return(Ie=t((()=>{F(),Fe=r()})))()}function Le(){return(0,Re.jsx)(P,{format:`HH:mm`,showSecond:!1,minTime:ze(9),maxTime:ze(17,30),placeholder:`Office hours 09:00–17:30`})}var Re,ze;function Be(){return(Be=t((()=>{F(),Re=r(),ze=(e,t=0)=>{let n=new Date;return n.setHours(e,t,0,0),n}})))()}function Ve(){return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Q.jsx)(P,{use12Hours:!0,format:`hh:mm:ss a`,placeholder:`hh:mm:ss AM`}),(0,Q.jsx)(P,{use12Hours:!0,format:`hh:mm a`,showSecond:!1,placeholder:`hh:mm AM`})]})}var Q;function He(){return(He=t((()=>{F(),Q=r()})))()}var Ue;function We(){return(We=t((()=>{Ue=`import { useState } from "react";
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
`})))()}var $,st,ct;function lt(){return(lt=t((()=>{R(),U(),q(),ke(),je(),Ne(),Ie(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),it(),ot(),n(),s(),Ce(),D(),i(),$=r(),st=Se(Object.assign({"./demos/basic.tsx":Ee,"./demos/controlled.tsx":z,"./demos/default-value.tsx":W,"./demos/disabled.tsx":De,"./demos/formats.tsx":Ae,"./demos/sizes.tsx":Me,"./demos/steps.tsx":Pe,"./demos/time-range.tsx":Le,"./demos/twelve-hour.tsx":Ve}),Object.assign({"./demos/basic.tsx":Ue,"./demos/controlled.tsx":Ge,"./demos/default-value.tsx":qe,"./demos/disabled.tsx":Ye,"./demos/formats.tsx":Ze,"./demos/sizes.tsx":$e,"./demos/steps.tsx":tt,"./demos/time-range.tsx":rt,"./demos/twelve-hour.tsx":at})),ct=()=>{let{t:e}=o();return(0,$.jsx)(we,{id:`time-picker`,demos:st,children:(0,$.jsxs)(`section`,{className:a.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.time-picker.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:a.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.select`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.typing`)})]})]})})}})))()}lt();export{ct as default};