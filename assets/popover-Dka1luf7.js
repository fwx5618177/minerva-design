import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ct as r,Et as i,St as a,Tt as o,at as s,ct as c,dt as l,et as u,ft as d,gt as f,ht as p,it as ee,lt as te,nt as ne,ot as re,rt as m,st as ie,ut as ae,vt as h}from"./io5-CqGZWNm2.js";import{It as g,T as _,h as oe,n as se,ut as ce}from"./angular-preview-l4x8c_2r.js";import{B as v,R as y,z as b}from"./ProgressIndicator-BhPa7d9i.js";import{n as x,t as S}from"./Checkbox-D3-cVuqf.js";import{n as le,r as ue,t as C}from"./tabbing-BcZx0LHW.js";import{a as w,i as T,n as de,o as fe,r as pe,t as E}from"./useScrollLock-BWY9Ht75.js";import{n as D,t as O}from"./popover.module.scss-DtLmhdM_.js";import{l as me,n as k,t as A,u as j}from"./DocPage-BoAp0gXb.js";var M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{g(),o(),r(),p(),l(),s(),c(),m(),u(),C(),w(),T(),E(),D(),M=t(),N=n(),_(),P=10,F=5,I=(0,M.createContext)(null),L=e=>{let t=(0,M.useContext)(I);if(!t)throw Error(`<${e}> must be used inside <Popover>`);return t},R=({open:e,defaultOpen:t,onOpenChange:n,modal:r=!1,children:i})=>{let[o,s]=a({value:e,defaultValue:t??!1,onChange:n,name:`Popover`,prop:`open`}),c=(0,M.useId)(),[l,u]=(0,M.useState)(null),[d,f]=(0,M.useState)(null),p=(0,M.useMemo)(()=>({open:o,setOpen:s,modal:r,contentId:c,trigger:l,setTrigger:u,anchor:d,setAnchor:f}),[o,s,r,c,l,d]);return(0,N.jsx)(I.Provider,{value:p,children:i})},z=({asChild:e=!1,onClick:t,ref:n,...r})=>{let{open:a,setOpen:o,contentId:s,setTrigger:c}=L(`PopoverTrigger`),l=i(c,n),u={"aria-haspopup":`dialog`,"aria-expanded":a,"aria-controls":a?s:void 0,...r,...e?void 0:v(`popover`,`trigger`,{state:a?`open`:`closed`}),onClick:h(t,()=>o(!a))};return e?(0,N.jsx)(f,{ref:l,...u}):(0,N.jsx)(`button`,{type:`button`,ref:l,...u})},B=({asChild:e=!1,ref:t,...n})=>{let{setAnchor:r}=L(`PopoverAnchor`),a=i(r,t);return(0,N.jsx)(e?f:`div`,{ref:a,...n})},V=({asChild:e=!1,onClick:t,...n})=>{let{setOpen:r}=L(`PopoverClose`),i={...n,onClick:h(t,()=>r(!1))};return e?(0,N.jsx)(f,{...i}):(0,N.jsx)(`button`,{type:`button`,...i})},H={transform:`translate(0, -200%)`},U=({ref:e,className:t,style:n,children:r,side:a=`bottom`,align:o=`center`,sideOffset:s=6,alignOffset:c=0,collisionPadding:l=8,matchAnchorWidth:u=!1,arrow:f=!1,portal:p=!0,forceMount:m=!1,onOpenAutoFocus:g,onCloseAutoFocus:_,onEscapeKeyDown:y,onPointerDownOutside:b,onFocusOutside:x,onInteractOutside:S,onKeyDown:C,...w})=>{let{open:T,setOpen:E,modal:D,contentId:me,trigger:k,anchor:A}=L(`PopoverContent`),j=te(),[I,R]=(0,M.useState)(null),[z,B]=(0,M.useState)(null),V=pe(T,I),U=T&&!!I,{setFloating:W,floatingStyles:G,placement:K,arrowStyles:q,isPositioned:he}=re({open:V,anchor:A??k,placement:oe(a,o),offset:{mainAxis:s+(f?F:0),crossAxis:c},matchAnchorWidth:u,padding:l,arrowElement:f?z:null}),J=i(R,e),Y=ne(I,A??k,T),X=se(K);ae(I,{enabled:U,disableOutsidePointerEvents:D,branches:()=>[k],onEscapeKeyDown:y,onPointerDownOutside:b,onFocusOutside:e=>{x?.(e),D&&e.preventDefault()},onInteractOutside:S,onDismiss:()=>E(!1)}),ee(I,{enabled:U,trapped:D,loop:D,restoreFocus:()=>k,onMountAutoFocus:g,onUnmountAutoFocus:_}),de(U&&D),fe(I,U&&D);let ge=e=>{if(D||!I||!k||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let t=e.shiftKey;if(!le(I,e.target,t))return;e.preventDefault();let n=j??k.ownerDocument.body;(ue(k,n,t)??k).focus(),E(!1)};if(!V&&!m)return null;let Z=T?`open`:`closed`,Q=(0,N.jsx)(`div`,{ref:W,className:O.positioner,style:he?G:{...G,...H},"data-side":X.side,"data-align":X.align,children:(0,N.jsx)(ie.Provider,{value:I,children:(0,N.jsxs)(`div`,{ref:J,id:me,role:`dialog`,"aria-modal":D||void 0,tabIndex:-1,dir:Y,className:ce(O.content,t),style:n,...w,...v(`popover`,`content`,{state:Z,side:X.side,align:X.align,placement:K}),onKeyDown:h(C,ge),children:[r,f&&(0,N.jsx)(`span`,{ref:B,className:O.arrowWrapper,style:q,"aria-hidden":`true`,...v(`popover`,`arrow`),children:(0,N.jsx)(`svg`,{className:O.arrow,width:P,height:F,viewBox:`0 0 30 10`,preserveAspectRatio:`none`,children:(0,N.jsx)(`polygon`,{points:`0,0 30,0 15,10`})})})]})})});return p?(0,N.jsx)(d,{children:Q}):Q}})))()}function G(){return(0,K.jsxs)(R,{children:[(0,K.jsx)(z,{asChild:!0,children:(0,K.jsx)(b,{color:`neutral`,variant:`outline`,children:`Filter`})}),(0,K.jsxs)(U,{"aria-label":`Filters`,arrow:!0,children:[(0,K.jsx)(S,{defaultChecked:!0,label:`Read`}),(0,K.jsx)(S,{label:`Unread`}),(0,K.jsx)(V,{asChild:!0,children:(0,K.jsx)(b,{size:`small`,children:`Apply`})})]})]})}var K;function q(){return(q=e((()=>{y(),x(),W(),K=n()})))()}function he(){let[e,t]=(0,J.useState)(!1);return(0,Y.jsxs)(R,{open:e,onOpenChange:t,children:[(0,Y.jsx)(B,{asChild:!0,children:(0,Y.jsx)(`div`,{style:{display:`inline-flex`,gap:8,padding:8,border:`1px dashed`},children:(0,Y.jsx)(z,{asChild:!0,children:(0,Y.jsxs)(b,{children:[e?`Close`:`Open`,` account menu`]})})})}),(0,Y.jsx)(U,{align:`end`,"aria-label":`Account`,children:`Signed in as reader@example.com`})]})}var J,Y;function X(){return(X=e((()=>{J=t(),y(),W(),Y=n()})))()}function ge(){return(0,Z.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:Q.map(e=>(0,Z.jsxs)(R,{children:[(0,Z.jsx)(z,{asChild:!0,children:(0,Z.jsx)(b,{color:`neutral`,variant:`outline`,children:e})}),(0,Z.jsxs)(U,{side:e,align:`start`,sideOffset:10,arrow:!0,children:[`Placed on the `,e,`, aligned to the start.`]})]},e))})}var Z,Q;function _e(){return(_e=e((()=>{y(),W(),Z=n(),Q=[`top`,`right`,`bottom`,`left`]})))()}var ve;function ye(){return(ye=e((()=>{ve=`import {
  Button,
  Checkbox,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "minerva-design";

export default function BasicDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button color="neutral" variant="outline">
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Filters" arrow>
        <Checkbox defaultChecked label="Read" />
        <Checkbox label="Unread" />
        <PopoverClose asChild>
          <Button size="small">Apply</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useState } from "react";
import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "minerva-design";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div
          style={{
            display: "inline-flex",
            gap: 8,
            padding: 8,
            border: "1px dashed",
          }}
        >
          <PopoverTrigger asChild>
            <Button>{open ? "Close" : "Open"} account menu</Button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      <PopoverContent align="end" aria-label="Account">
        Signed in as reader@example.com
      </PopoverContent>
    </Popover>
  );
}
`})))()}var Se;function $(){return($=e((()=>{Se=`import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverSide,
} from "minerva-design";

const SIDES: PopoverSide[] = ["top", "right", "bottom", "left"];

export default function PlacementDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {SIDES.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button color="neutral" variant="outline">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} align="start" sideOffset={10} arrow>
            Placed on the {side}, aligned to the start.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
`})))()}var Ce,we,Te;function Ee(){return(Ee=e((()=>{q(),X(),_e(),ye(),xe(),$(),t(),k(),j(),Ce=n(),we=me(Object.assign({"./demos/basic.tsx":G,"./demos/controlled.tsx":he,"./demos/placement.tsx":ge}),Object.assign({"./demos/basic.tsx":ve,"./demos/controlled.tsx":be,"./demos/placement.tsx":Se})),Te=()=>(0,Ce.jsx)(A,{id:`popover`,demos:we})})))()}Ee();export{Te as default};