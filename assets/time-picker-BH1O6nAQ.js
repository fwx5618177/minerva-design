import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{J as i,Y as a,_t as o,bt as s,it as c,q as ee,rt as l,vt as u,xt as d}from"./io5-DGxLJ5Qx.js";import{n as f,t as p}from"./useTranslation-bhnhDJ2z.js";import{G as te,Mn as m,Pn as h,Tn as ne,Zn as g,_n as re,ln as _,rt as ie}from"./angular-preview-CxN7u9Fp.js";import{B as ae,E as oe,R as v,T as y,V as b,w as se,z as x}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as S}from"./stylingHooks-PqiNJdev.js";import{i as ce,n as le,r as ue,t as de}from"./context-ESLv39g4.js";import{t as fe}from"./dataAttributes-CDHeJa9q.js";import{i as pe,r as me}from"./CodeBlock-Y-lIOv3H.js";import{n as he,t as ge}from"./Input-7FBYvGJB.js";import{i as C,n as _e,r as ve,t as w}from"./timePicker.module.scss-D4rKepBP.js";import{n as ye,r as be,t as xe}from"./tabbing-2MXSv0Wd.js";import{i as Se,r as T}from"./DemoBlock-CypD-g_s.js";import{l as Ce,n as we,t as Te,u as E}from"./DocPage-DYJi0cgu.js";var D,O,k,Ee;function A(){return(A=t((()=>{m(),b(),a(),ve(),D=e(n(),1),O=r(),k=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},Ee=D.memo(({value:e,hasValue:t=!0,use12Hours:n,showSecond:r,hourStep:i=1,minuteStep:a=1,secondStep:o=1,minTime:s,maxTime:c,onTimeChange:ee,visible:l,focusOnOpen:u=!1})=>{let{t:d}=ae(),f=(0,D.useRef)(null),p=(0,D.useMemo)(()=>e??new Date(0),[e]),m=p.getHours(),h=p.getMinutes(),ne=p.getSeconds(),g=m>=12,re=e=>n?e%12+(g?12:0):e,_=k(n?12:24,i,+!!n,e=>{let t=n?e%12+(g?12:0):e;return!!(s&&t<s.getHours()||c&&t>c.getHours())}),oe=k(60,a,0,e=>!!(s&&m===s.getHours()&&e<s.getMinutes()||c&&m===c.getHours()&&e>c.getMinutes())),v=k(60,o,0,e=>{let t=s&&m===s.getHours()&&h===s.getMinutes(),n=c&&m===c.getHours()&&h===c.getMinutes();return!!(t&&e<s.getSeconds()||n&&e>c.getSeconds())}),y=[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],b=[{kind:`hour`,label:d(`timePicker.hours`),items:_,selected:n?m%12||12:m,toValue:re},{kind:`minute`,label:d(`timePicker.minutes`),items:oe,selected:h,toValue:e=>e}];r&&b.push({kind:`second`,label:d(`timePicker.seconds`),items:v,selected:ne,toValue:e=>e}),n&&b.push({kind:`ampm`,label:d(`timePicker.period`),items:y,selected:+!!g,toValue:e=>e}),(0,D.useEffect)(()=>{l&&f.current?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`}))},[l]),(0,D.useEffect)(()=>{l&&u&&f.current?.querySelector(`[role="option"][tabindex="0"]`)?.focus()},[l,u]);let se=(e,t)=>{let n=e.target,r=Array.from(e.currentTarget.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),i=r.indexOf(n),a=e=>{(f.current?.querySelectorAll(`[role="listbox"]`)[e])?.querySelector(`[tabindex="0"]`)?.focus()};switch(te(e.key,e.currentTarget)){case`ArrowDown`:e.preventDefault(),r[Math.min(r.length-1,i+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),r[Math.max(0,i-1)]?.focus();break;case`Home`:e.preventDefault(),r[0]?.focus();break;case`End`:e.preventDefault(),r[r.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),a(Math.min(b.length-1,t+1));break;case`ArrowLeft`:e.preventDefault(),a(Math.max(0,t-1))}},x=(e,t,n)=>{n.disabled||ee(e,t(n.value))};return(0,O.jsx)(`div`,{className:C.timePickerPanel,ref:f,children:(0,O.jsx)(`div`,{className:C.timeColumns,children:b.map((e,n)=>{let r=e.items.find(e=>!e.disabled)?.value,i=e.items.some(t=>t.value===e.selected&&!t.disabled)?e.selected:r;return(0,O.jsx)(`div`,{className:C.timeColumn,...S(`time-picker`,`column`),role:`listbox`,"aria-label":e.label,tabIndex:-1,onKeyDown:e=>se(e,n),children:e.items.map(n=>{let r=t&&n.value===e.selected;return(0,O.jsx)(`div`,{...S(`time-picker`,`item`,{selected:r,disabled:n.disabled}),role:`option`,"aria-selected":r,"aria-disabled":n.disabled||void 0,tabIndex:n.value===i?0:-1,className:ie(C.timeUnit,{[C.selected]:r,[C.disabled]:n.disabled}),onClick:()=>x(e.kind,e.toValue,n),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),x(e.kind,e.toValue,n))},children:n.label},n.value)})},e.kind)})})})})})))()}var j,M,N;function P(){return(P=t((()=>{m(),b(),y(),s(),u(),le(),l(),i(),pe(),ge(),A(),xe(),_e(),j=e(n(),1),M=r(),N=j.memo(({ref:e,value:t,defaultValue:n,onChange:r,format:i=`HH:mm:ss`,use12Hours:a=!1,placeholder:s,label:l,"aria-label":u,"aria-labelledby":f,"aria-describedby":p,id:te,required:m,readOnly:v,invalid:y,name:b=`time-picker`,disabled:x,clearable:le=!0,size:pe=`medium`,className:ge=``,style:C,minTime:_e,maxTime:ve,showSecond:xe=!0,hourStep:Se=1,minuteStep:T=1,secondStep:Ce=1,onOpenChange:we,...Te})=>{let E=ne(i,xe),D=re(E),{t:O}=ae(),k=ce(),A=de({id:te,"aria-describedby":p}),N=x??k?.disabled??!1,P=v??k?.readOnly??!1,De=m??k?.required??!1,F=y??k?.invalid??!1,I=l??u??O(`timePicker.label`),L=f??(k&&!l&&!u?k.labelId:void 0),[R,z]=o({value:t,defaultValue:n??null,name:`TimePicker`}),[B,V]=o({defaultValue:!1,onChange:we,name:`TimePicker`,prop:`open`}),[H,U]=(0,j.useState)(null),[W,G]=(0,j.useState)(null),[K,Oe]=(0,j.useState)(null),q=d(G,e),J=(0,j.useRef)(null),ke=c(),[Ae,Y]=(0,j.useState)(!1),X=e=>{z(e),r?.(e??void 0)},je=(e,t)=>{let n=new Date(R??g());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}U(null),X(n)},Me=e=>{U(e);let t=_(e,E,{strict:!0,base:R??void 0});t&&X(t)},Z=()=>{if(H!==null){if(H.trim()===``)R&&X(null);else{let e=_(H,E,{strict:!1,base:R??void 0});e&&e.getTime()!==R?.getTime()&&X(e)}U(null)}},Ne=()=>{U(null),X(null),W?.focus()},Pe=()=>{N||P||(Y(!1),V(e=>!e))},Fe=e=>{let t=e.currentTarget;!W||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!ye(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?W:be(W,ke??W.ownerDocument.body,!1)??W).focus(),V(!1))},Ie=H??(R?h(R,E):``);return(0,M.jsxs)(`div`,{...fe(Te),ref:Oe,className:ie(w.timePicker,ge),style:C,onClick:e=>{e.target===W&&Pe()},...S(`time-picker`,`root`,{state:B&&!N&&!P?`open`:`closed`,disabled:N,readonly:P,invalid:F,size:pe}),children:[(0,M.jsx)(ue.Provider,{value:null,children:(0,M.jsx)(he,{ref:q,value:Ie,placeholder:s??O(`timePicker.placeholder`),id:A.id,"aria-label":I,"aria-labelledby":L,"aria-describedby":A[`aria-describedby`],"aria-invalid":F||void 0,"aria-readonly":P||void 0,required:De,readOnly:P,onChange:e=>Me(e.target.value),onBlur:Z,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),B?J.current?.querySelector(`[role="option"][tabindex="0"]`)?.focus():(Y(!0),V(!0)))},name:b,disabled:N,size:pe,suffix:le&&R&&!N&&!P?(0,M.jsx)(me,{icon:(0,M.jsx)(se,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":O(`timePicker.clear`),onClick:Ne,className:w.clearButton}):(0,M.jsx)(`span`,{className:w.clockIcon,"aria-hidden":`true`,...S(`time-picker`,`icon`),children:(0,M.jsx)(oe,{})})})}),(0,M.jsx)(ee,{ref:J,open:B&&!N&&!P,anchor:W,placement:`bottom-start`,branches:()=>[K],onDismiss:()=>V(!1),returnFocusOnEscape:()=>W,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":I,"aria-labelledby":L,className:w.popup,onKeyDown:Fe,...S(`time-picker`,`content`,{state:`open`}),children:(0,M.jsx)(Ee,{value:R??g(),hasValue:R!==null,format:E,use12Hours:a,showSecond:D,hourStep:Se,minuteStep:T,secondStep:Ce,minTime:_e,maxTime:ve,onTimeChange:je,visible:B,focusOnOpen:Ae})})]})})})))()}function De(){let[e,t]=(0,F.useState)();return(0,I.jsxs)(`div`,{children:[(0,I.jsx)(N,{onChange:t}),(0,I.jsxs)(`p`,{children:[`Selected: `,e?e.toLocaleTimeString():`none`]})]})}var F,I;function L(){return(L=t((()=>{F=n(),P(),I=r()})))()}function R(){let[e,t]=(0,z.useState)(null);return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`},children:[(0,B.jsx)(N,{label:`Meeting time`,value:e,onChange:e=>t(e??null)}),(0,B.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,B.jsx)(x,{size:`small`,onClick:()=>t(V()),children:`Set to noon`}),(0,B.jsx)(x,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,B.jsxs)(`p`,{children:[`Value: `,e?e.toLocaleTimeString():`null`]})]})}var z,B,V;function H(){return(H=t((()=>{z=n(),v(),P(),B=r(),V=()=>{let e=new Date;return e.setHours(12,0,0,0),e}})))()}function U(){return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,W.jsx)(N,{defaultValue:G}),(0,W.jsx)(N,{defaultValue:G,clearable:!1})]})}var W,G;function K(){return(K=t((()=>{P(),W=r(),G=new Date,G.setHours(9,30,0)})))()}function Oe(){return(0,q.jsx)(N,{defaultValue:J,disabled:!0})}var q,J;function ke(){return(ke=t((()=>{P(),q=r(),J=new Date,J.setHours(12,0,0)})))()}function Ae(){return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Y.jsx)(N,{defaultValue:X,format:`HH:mm:ss`}),(0,Y.jsx)(N,{defaultValue:X,format:`HH:mm`,showSecond:!1})]})}var Y,X;function je(){return(je=t((()=>{P(),Y=r(),X=new Date})))()}function Me(){return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Z.jsx)(N,{size:`small`,placeholder:`Small`}),(0,Z.jsx)(N,{size:`medium`,placeholder:`Medium`}),(0,Z.jsx)(N,{size:`large`,placeholder:`Large`})]})}var Z;function Ne(){return(Ne=t((()=>{P(),Z=r()})))()}function Pe(){return(0,Fe.jsx)(N,{format:`HH:mm`,showSecond:!1,hourStep:2,minuteStep:15,placeholder:`Every 2 h / 15 min`})}var Fe;function Ie(){return(Ie=t((()=>{P(),Fe=r()})))()}function Le(){return(0,Re.jsx)(N,{format:`HH:mm`,showSecond:!1,minTime:ze(9),maxTime:ze(17,30),placeholder:`Office hours 09:00–17:30`})}var Re,ze;function Be(){return(Be=t((()=>{P(),Re=r(),ze=(e,t=0)=>{let n=new Date;return n.setHours(e,t,0,0),n}})))()}function Ve(){return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Q.jsx)(N,{use12Hours:!0,format:`hh:mm:ss a`,placeholder:`hh:mm:ss AM`}),(0,Q.jsx)(N,{use12Hours:!0,format:`hh:mm a`,showSecond:!1,placeholder:`hh:mm AM`})]})}var Q;function He(){return(He=t((()=>{P(),Q=r()})))()}var Ue;function We(){return(We=t((()=>{Ue=`import { useState } from "react";
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
`})))()}var $,st,ct;function lt(){return(lt=t((()=>{L(),H(),K(),ke(),je(),Ne(),Ie(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),it(),ot(),n(),p(),we(),E(),Se(),$=r(),st=Ce(Object.assign({"./demos/basic.tsx":De,"./demos/controlled.tsx":R,"./demos/default-value.tsx":U,"./demos/disabled.tsx":Oe,"./demos/formats.tsx":Ae,"./demos/sizes.tsx":Me,"./demos/steps.tsx":Pe,"./demos/time-range.tsx":Le,"./demos/twelve-hour.tsx":Ve}),Object.assign({"./demos/basic.tsx":Ue,"./demos/controlled.tsx":Ge,"./demos/default-value.tsx":qe,"./demos/disabled.tsx":Ye,"./demos/formats.tsx":Ze,"./demos/sizes.tsx":$e,"./demos/steps.tsx":tt,"./demos/time-range.tsx":rt,"./demos/twelve-hour.tsx":at})),ct=()=>{let{t:e}=f();return(0,$.jsx)(Te,{id:`time-picker`,demos:st,children:(0,$.jsxs)(`section`,{className:T.section,"aria-labelledby":`keyboard`,children:[(0,$.jsx)(`h2`,{id:`keyboard`,children:e(`docs.time-picker.keyboard.title`)}),(0,$.jsxs)(`ul`,{className:T.prose,children:[(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.open`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.navigate`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.select`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.close`)}),(0,$.jsx)(`li`,{children:e(`docs.time-picker.keyboard.typing`)})]})]})})}})))()}lt();export{ct as default};