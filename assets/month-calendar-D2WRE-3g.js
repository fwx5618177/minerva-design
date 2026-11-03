import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{An as r,Et as i,Gt as a,Zt as o,_t as s,at as c,gr as l,t as ee}from"./angular-preview-IwZi912s.js";import{B as te,S as ne,T as u,V as d,g as re,r as ie}from"./ProgressIndicator-DJBhmBkg.js";import{t as f}from"./stylingHooks-PqiNJdev.js";import{$ as p,St as m,xt as ae}from"./io5-CaMdkTnG.js";import{n as h,t as g}from"./monthCalendar.module.scss-DNVdVxZw.js";import{l as _,n as v,t as y,u as oe}from"./DocPage-Cww2i8I2.js";var b,x,S,se,C,w;function T(){return(T=e((()=>{r(),d(),u(),m(),p(),g(),b=t(),x=n(),S=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],se=[],C=/^\d{4}-\d{2}-\d{2}$/,w=({month:e,defaultMonth:t,onMonthChange:n,value:r,defaultValue:u,onChange:d,events:p=se,onEventClick:m,rangeStart:g,rangeEnd:_,size:v=`medium`,disabled:y=!1,showSelectedDayEvents:oe=!0,"aria-label":w,previousMonthLabel:T,nextMonthLabel:ce,todayLabel:E,emptyEventsText:D,locale:O,weekdayLabels:k,getDayLabel:A,getEventsLabel:j,className:M,ref:N})=>{let{t:P,language:F}=te(),I=(0,b.useId)(),[L,R]=ae({value:e,defaultValue:()=>o(t??new Date),onChange:n,name:`MonthCalendar`,prop:`month`}),[z,B]=ae({value:r,defaultValue:u,onChange:e=>{e!==void 0&&d?.(e)},name:`MonthCalendar`}),[V,H]=(0,b.useState)(``),U=(0,b.useRef)(new Map),W=(0,b.useRef)(null),G=o(L),K=c(G,-((G.getDay()+6)%7)),q=Array.from({length:42},(e,t)=>c(K,t)),J=q.map(l),Y=new Date,X=l(Y),le=[V,z,s(Y,L)?X:``,l(G)].find(e=>e&&J.includes(e)),ue=l(G),Z=new Map;for(let e of p)Z.set(e.date,(Z.get(e.date)??0)+1);let de=p.filter(e=>e.date===z),Q=g&&_&&C.test(g)&&C.test(_)?[g,_].sort():void 0;(0,b.useEffect)(()=>{if(y||!W.current)return;let e=U.current.get(W.current);e&&(W.current=null,e.focus())},[ue,V,y]);let $=e=>R(o(e)),fe=e=>{y||(B(l(e)),s(e,L)||$(e))},pe=(e,t)=>{if(y)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||fe(t);return}let n,r=(t.getDay()+6)%7;switch(ee(e.key,e.currentTarget)){case`ArrowLeft`:n=c(t,-1);break;case`ArrowRight`:n=c(t,1);break;case`ArrowUp`:n=c(t,-7);break;case`ArrowDown`:n=c(t,7);break;case`Home`:n=c(t,-r);break;case`End`:n=c(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=o(t,r),s=c(o(i,1),-1).getDate();n=a(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),s));break}default:return}e.preventDefault(),W.current=l(n),H(l(n)),s(n,L)||$(n)},me=new Intl.DateTimeFormat(O??F,{year:`numeric`,month:`long`}).format(G);return(0,x.jsxs)(`section`,{ref:N,className:i(h.monthCalendar,h[v],M),"aria-label":w??P(`monthCalendar.label`),...f(`month-calendar`,`root`,{disabled:y,size:v}),children:[(0,x.jsxs)(`div`,{className:h.toolbar,children:[(0,x.jsx)(`h2`,{id:I,className:h.heading,"aria-live":`polite`,...f(`month-calendar`,`heading`),children:me}),(0,x.jsxs)(`div`,{className:h.navigation,children:[(0,x.jsx)(`button`,{type:`button`,className:i(h.navButton,h.iconButton),"aria-label":T??P(`monthCalendar.previousMonth`),disabled:y,...f(`month-calendar`,`nav-button`),onClick:()=>$(o(L,-1)),children:(0,x.jsx)(ne,{"aria-hidden":!0,focusable:!1})}),(0,x.jsxs)(`button`,{type:`button`,className:h.navButton,disabled:y,...f(`month-calendar`,`nav-button`),onClick:()=>$(new Date),children:[(0,x.jsx)(ie,{"aria-hidden":!0,focusable:!1}),E??P(`monthCalendar.today`)]}),(0,x.jsx)(`button`,{type:`button`,className:i(h.navButton,h.iconButton),"aria-label":ce??P(`monthCalendar.nextMonth`),disabled:y,...f(`month-calendar`,`nav-button`),onClick:()=>$(o(L,1)),children:(0,x.jsx)(re,{"aria-hidden":!0,focusable:!1})})]})]}),(0,x.jsxs)(`div`,{role:`grid`,"aria-labelledby":I,"aria-disabled":y||void 0,className:h.grid,...f(`month-calendar`,`grid`),children:[(0,x.jsx)(`div`,{role:`row`,className:h.week,children:S.map((e,t)=>(0,x.jsx)(`div`,{role:`columnheader`,className:h.weekday,children:k?.[t]??P(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,x.jsx)(`div`,{role:`row`,className:h.week,children:q.slice(t*7,t*7+7).map(e=>{let t=l(e),n=Z.get(t)??0,r=z===t,a=!s(e,L),o=t===X,c=!!Q&&t>=Q[0]&&t<=Q[1];return(0,x.jsxs)(`div`,{role:`gridcell`,className:i(h.day,c&&h.inRange,c&&t===Q?.[0]&&h.rangeStart,c&&t===Q?.[1]&&h.rangeEnd),...f(`month-calendar`,`day`,{selected:r,today:o,outside:a,disabled:y}),ref:e=>{e?U.current.set(t,e):U.current.delete(t)},"data-date":t,"aria-label":A?A(t,n):n?P(`monthCalendar.dayWithEvents`,{date:t,count:n}):t,"aria-selected":r,"aria-current":o?`date`:void 0,"aria-disabled":y||void 0,tabIndex:!y&&t===le?0:-1,onFocus:()=>H(t),onClick:()=>fe(e),onKeyDown:t=>pe(t,e),children:[(0,x.jsx)(`span`,{className:h.dayNumber,children:e.getDate()}),(0,x.jsx)(`span`,{className:i(h.count,n>0&&h.hasEvents),"aria-hidden":!0,children:n?n>99?`99+`:n:` `})]},t)})},t))]}),oe&&z&&(0,x.jsxs)(`section`,{className:h.events,...f(`month-calendar`,`events`),"aria-label":j?j(z):P(`monthCalendar.eventsLabel`,{date:z}),children:[(0,x.jsx)(`h3`,{className:h.eventsHeading,children:z}),de.length?(0,x.jsx)(`ul`,{className:h.eventList,children:de.map(e=>(0,x.jsx)(`li`,{className:h.eventItem,children:m?(0,x.jsx)(`button`,{type:`button`,className:h.eventButton,...f(`month-calendar`,`event`),disabled:y,onClick:()=>m(e),children:e.title}):(0,x.jsx)(`span`,{...f(`month-calendar`,`event`),children:e.title})},e.id))}):(0,x.jsx)(`p`,{className:h.empty,...f(`month-calendar`,`empty`),children:D??P(`monthCalendar.noEvents`)})]})]})}})))()}function ce(){let[e,t]=(0,E.useState)(k(3)),[n,r]=(0,E.useState)(``);return(0,D.jsxs)(`div`,{style:{maxWidth:560},children:[(0,D.jsx)(w,{value:e,onChange:t,events:A,onEventClick:e=>r(e.title)}),n&&(0,D.jsxs)(`p`,{children:[`Clicked: `,n]})]})}var E,D,O,k,A;function j(){return(j=e((()=>{E=t(),T(),D=n(),O=new Date,k=e=>`${O.getFullYear()}-${String(O.getMonth()+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,A=[{id:`1`,date:k(3),title:`Release v2.0`},{id:`2`,date:k(3),title:`Retrospective`},{id:`3`,date:k(12),title:`Design review`}]})))()}function M(){let[e,t]=(0,N.useState)([`2026-03-09`,`2026-03-13`]),[n,r]=e;return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,P.jsx)(w,{defaultMonth:new Date(2026,2,1),value:r??n,onChange:e=>t(r===void 0?[n,e]:[e]),rangeStart:n,rangeEnd:r??n,events:F,showSelectedDayEvents:!1}),(0,P.jsx)(`output`,{children:r===void 0?`From ${n}: pick the last day`:`From ${[n,r].sort().join(` to `)}`})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),T(),P=n(),F=[{id:`1`,date:`2026-03-10`,title:`Offsite day 1`},{id:`2`,date:`2026-03-11`,title:`Offsite day 2`}]})))()}function L(){return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:24,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,alignItems:`start`},children:[(0,R.jsx)(w,{size:`small`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:z,showSelectedDayEvents:!1,"aria-label":`Compact calendar`}),(0,R.jsx)(w,{size:`large`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:z,"aria-label":`Comfortable calendar`})]})}var R,z;function B(){return(B=e((()=>{T(),R=n(),z=[{id:`1`,date:`2026-03-02`,title:`Sprint planning`},{id:`2`,date:`2026-03-12`,title:`Design review`},{id:`3`,date:`2026-03-12`,title:`Customer call`},{id:`4`,date:`2026-03-19`,title:`Release 2.4`}]})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
import { MonthCalendar } from "minerva-design";

const today = new Date();
const day = (d: number) =>
  \`\${today.getFullYear()}-\${String(today.getMonth() + 1).padStart(2, "0")}-\${String(d).padStart(2, "0")}\`;

const events = [
  { id: "1", date: day(3), title: "Release v2.0" },
  { id: "2", date: day(3), title: "Retrospective" },
  { id: "3", date: day(12), title: "Design review" },
];

export default function BasicDemo() {
  const [value, setValue] = useState(day(3));
  const [clicked, setClicked] = useState("");

  return (
    <div style={{ maxWidth: 560 }}>
      <MonthCalendar
        value={value}
        onChange={setValue}
        events={events}
        onEventClick={(event) => setClicked(event.title)}
      />
      {clicked && <p>Clicked: {clicked}</p>}
    </div>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useState } from "react";
import { MonthCalendar } from "minerva-design";

const events = [
  { id: "1", date: "2026-03-10", title: "Offsite day 1" },
  { id: "2", date: "2026-03-11", title: "Offsite day 2" },
];

export default function RangeDemo() {
  const [range, setRange] = useState<[string, string?]>([
    "2026-03-09",
    "2026-03-13",
  ]);
  const [start, end] = range;

  // First click starts a new range, the second one closes it.
  const pick = (day: string) =>
    setRange(end === undefined ? [start, day] : [day]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MonthCalendar
        defaultMonth={new Date(2026, 2, 1)}
        value={end ?? start}
        onChange={pick}
        rangeStart={start}
        rangeEnd={end ?? start}
        events={events}
        showSelectedDayEvents={false}
      />
      <output>
        {end === undefined
          ? \`From \${start}: pick the last day\`
          : \`From \${[start, end].sort().join(" to ")}\`}
      </output>
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { MonthCalendar } from "minerva-design";

const events = [
  { id: "1", date: "2026-03-02", title: "Sprint planning" },
  { id: "2", date: "2026-03-12", title: "Design review" },
  { id: "3", date: "2026-03-12", title: "Customer call" },
  { id: "4", date: "2026-03-19", title: "Release 2.4" },
];

export default function SizesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        alignItems: "start",
      }}
    >
      <MonthCalendar
        size="small"
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue="2026-03-12"
        events={events}
        showSelectedDayEvents={false}
        aria-label="Compact calendar"
      />
      <MonthCalendar
        size="large"
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue="2026-03-12"
        events={events}
        aria-label="Comfortable calendar"
      />
    </div>
  );
}
`})))()}var q,J,Y;function X(){return(X=e((()=>{j(),I(),B(),H(),W(),K(),t(),v(),oe(),q=n(),J=_(Object.assign({"./demos/basic.tsx":ce,"./demos/range.tsx":M,"./demos/sizes.tsx":L}),Object.assign({"./demos/basic.tsx":V,"./demos/range.tsx":U,"./demos/sizes.tsx":G})),Y=()=>(0,q.jsx)(y,{id:`month-calendar`,demos:J})})))()}X();export{Y as default};