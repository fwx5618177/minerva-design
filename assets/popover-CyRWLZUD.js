import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,T as i,h as a,n as o,ut as s}from"./angular-preview-l4x8c_2r.js";import{R as c,z as l}from"./ProgressIndicator-BMZ0rR7D.js";import{t as u}from"./stylingHooks-PqiNJdev.js";import{Ct as d,Q as f,at as ee,bt as p,ct as te,et as ne,gt as m,it as re,lt as h,mt as g,nt as ie,ot as _,pt as v,rt as y,st as ae,tt as b,ut as oe,wt as x,xt as S}from"./io5-BlmswBy7.js";import{n as se,t as C}from"./Checkbox-J_8ZSvM_.js";import{n as ce,r as le,t as ue}from"./tabbing-BcZx0LHW.js";import{a as de,i as w,n as fe,o as pe,r as me,t as T}from"./useScrollLock-BWY9Ht75.js";import{n as E,t as D}from"./popover.module.scss-DtLmhdM_.js";import{l as O,n as k,t as A,u as j}from"./DocPage-CfPUO8JU.js";var M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{r(),d(),S(),v(),h(),y(),_(),b(),f(),ue(),de(),w(),T(),E(),M=t(),N=n(),i(),P=10,F=5,I=(0,M.createContext)(null),L=e=>{let t=(0,M.useContext)(I);if(!t)throw Error(`<${e}> must be used inside <Popover>`);return t},R=({open:e,defaultOpen:t,onOpenChange:n,modal:r=!1,children:i})=>{let[a,o]=p({value:e,defaultValue:t??!1,onChange:n,name:`Popover`,prop:`open`}),s=(0,M.useId)(),[c,l]=(0,M.useState)(null),[u,d]=(0,M.useState)(null),f=(0,M.useMemo)(()=>({open:a,setOpen:o,modal:r,contentId:s,trigger:c,setTrigger:l,anchor:u,setAnchor:d}),[a,o,r,s,c,u]);return(0,N.jsx)(I.Provider,{value:f,children:i})},z=({asChild:e=!1,onClick:t,ref:n,...r})=>{let{open:i,setOpen:a,contentId:o,setTrigger:s}=L(`PopoverTrigger`),c=x(s,n),l={"aria-haspopup":`dialog`,"aria-expanded":i,"aria-controls":i?o:void 0,...r,...e?void 0:u(`popover`,`trigger`,{state:i?`open`:`closed`}),onClick:m(t,()=>a(!i))};return e?(0,N.jsx)(g,{ref:c,...l}):(0,N.jsx)(`button`,{type:`button`,ref:c,...l})},B=({asChild:e=!1,ref:t,...n})=>{let{setAnchor:r}=L(`PopoverAnchor`),i=x(r,t);return(0,N.jsx)(e?g:`div`,{ref:i,...n})},V=({asChild:e=!1,onClick:t,...n})=>{let{setOpen:r}=L(`PopoverClose`),i={...n,onClick:m(t,()=>r(!1))};return e?(0,N.jsx)(g,{...i}):(0,N.jsx)(`button`,{type:`button`,...i})},H={transform:`translate(0, -200%)`},U=({ref:e,className:t,style:n,children:r,side:i=`bottom`,align:c=`center`,sideOffset:l=6,alignOffset:d=0,collisionPadding:f=8,matchAnchorWidth:p=!1,arrow:h=!1,portal:g=!0,forceMount:_=!1,onOpenAutoFocus:v,onCloseAutoFocus:y,onEscapeKeyDown:b,onPointerDownOutside:S,onFocusOutside:se,onInteractOutside:C,onKeyDown:ue,...de})=>{let{open:w,setOpen:T,modal:E,contentId:O,trigger:k,anchor:A}=L(`PopoverContent`),j=ae(),[I,R]=(0,M.useState)(null),[z,B]=(0,M.useState)(null),V=me(w,I),U=w&&!!I,{setFloating:W,floatingStyles:G,placement:K,arrowStyles:q,isPositioned:J}=re({open:V,anchor:A??k,placement:a(i,c),offset:{mainAxis:l+(h?F:0),crossAxis:d},matchAnchorWidth:p,padding:f,arrowElement:h?z:null}),Y=x(R,e),X=ne(I,A??k,w),Z=o(K);te(I,{enabled:U,disableOutsidePointerEvents:E,branches:()=>[k],onEscapeKeyDown:b,onPointerDownOutside:S,onFocusOutside:e=>{se?.(e),E&&e.preventDefault()},onInteractOutside:C,onDismiss:()=>T(!1)}),ie(I,{enabled:U,trapped:E,loop:E,restoreFocus:()=>k,onMountAutoFocus:v,onUnmountAutoFocus:y}),fe(U&&E),pe(I,U&&E);let he=e=>{if(E||!I||!k||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let t=e.shiftKey;if(!ce(I,e.target,t))return;e.preventDefault();let n=j??k.ownerDocument.body;(le(k,n,t)??k).focus(),T(!1)};if(!V&&!_)return null;let Q=w?`open`:`closed`,$=(0,N.jsx)(`div`,{ref:W,className:D.positioner,style:J?G:{...G,...H},"data-side":Z.side,"data-align":Z.align,children:(0,N.jsx)(ee.Provider,{value:I,children:(0,N.jsxs)(`div`,{ref:Y,id:O,role:`dialog`,"aria-modal":E||void 0,tabIndex:-1,dir:X,className:s(D.content,t),style:n,...de,...u(`popover`,`content`,{state:Q,side:Z.side,align:Z.align,placement:K}),onKeyDown:m(ue,he),children:[r,h&&(0,N.jsx)(`span`,{ref:B,className:D.arrowWrapper,style:q,"aria-hidden":`true`,...u(`popover`,`arrow`),children:(0,N.jsx)(`svg`,{className:D.arrow,width:P,height:F,viewBox:`0 0 30 10`,preserveAspectRatio:`none`,children:(0,N.jsx)(`polygon`,{points:`0,0 30,0 15,10`})})})]})})});return g?(0,N.jsx)(oe,{children:$}):$}})))()}function G(){return(0,K.jsxs)(R,{children:[(0,K.jsx)(z,{asChild:!0,children:(0,K.jsx)(l,{color:`neutral`,variant:`outline`,children:`Filter`})}),(0,K.jsxs)(U,{"aria-label":`Filters`,arrow:!0,children:[(0,K.jsx)(C,{defaultChecked:!0,label:`Read`}),(0,K.jsx)(C,{label:`Unread`}),(0,K.jsx)(V,{asChild:!0,children:(0,K.jsx)(l,{size:`small`,children:`Apply`})})]})]})}var K;function q(){return(q=e((()=>{c(),se(),W(),K=n()})))()}function J(){let[e,t]=(0,Y.useState)(!1);return(0,X.jsxs)(R,{open:e,onOpenChange:t,children:[(0,X.jsx)(B,{asChild:!0,children:(0,X.jsx)(`div`,{style:{display:`inline-flex`,gap:8,padding:8,border:`1px dashed`},children:(0,X.jsx)(z,{asChild:!0,children:(0,X.jsxs)(l,{children:[e?`Close`:`Open`,` account menu`]})})})}),(0,X.jsx)(U,{align:`end`,"aria-label":`Account`,children:`Signed in as reader@example.com`})]})}var Y,X;function Z(){return(Z=e((()=>{Y=t(),c(),W(),X=n()})))()}function he(){return(0,Q.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:$.map(e=>(0,Q.jsxs)(R,{children:[(0,Q.jsx)(z,{asChild:!0,children:(0,Q.jsx)(l,{color:`neutral`,variant:`outline`,children:e})}),(0,Q.jsxs)(U,{side:e,align:`start`,sideOffset:10,arrow:!0,children:[`Placed on the `,e,`, aligned to the start.`]})]},e))})}var Q,$;function ge(){return(ge=e((()=>{c(),W(),Q=n(),$=[`top`,`right`,`bottom`,`left`]})))()}var _e;function ve(){return(ve=e((()=>{_e=`import {
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
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { useState } from "react";
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
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import {
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
`})))()}var Ce,we,Te;function Ee(){return(Ee=e((()=>{q(),Z(),ge(),ve(),be(),Se(),t(),k(),j(),Ce=n(),we=O(Object.assign({"./demos/basic.tsx":G,"./demos/controlled.tsx":J,"./demos/placement.tsx":he}),Object.assign({"./demos/basic.tsx":_e,"./demos/controlled.tsx":ye,"./demos/placement.tsx":xe})),Te=()=>(0,Ce.jsx)(A,{id:`popover`,demos:we})})))()}Ee();export{Te as default};