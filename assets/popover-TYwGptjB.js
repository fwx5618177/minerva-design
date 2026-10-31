import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,T as i,h as a,n as o,ut as s}from"./angular-preview-l4x8c_2r.js";import{R as c,z as l}from"./ProgressIndicator-BMZ0rR7D.js";import{t as u}from"./stylingHooks-PqiNJdev.js";import{$ as d,St as f,Tt as p,_t as m,at as ee,ct as te,dt as ne,ht as h,it as g,lt as re,mt as ie,nt as _,ot as ae,rt as oe,st as v,tt as se,ut as y,wt as ce,xt as le}from"./io5-DWV9qlxB.js";import{n as ue,t as b}from"./Checkbox-Xe4Vj-fa.js";import{n as de,r as fe,t as x}from"./tabbing-BcZx0LHW.js";import{a as S,i as C,n as pe,o as me,r as he,t as w}from"./useScrollLock-BWY9Ht75.js";import{n as T,t as E}from"./popover.module.scss-DtLmhdM_.js";import{l as D,n as O,t as k,u as A}from"./DocPage-BdPOW9nQ.js";var j,M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{r(),ce(),f(),ie(),y(),g(),v(),_(),d(),x(),S(),C(),w(),T(),j=t(),M=n(),i(),N=10,P=5,F=(0,j.createContext)(null),I=e=>{let t=(0,j.useContext)(F);if(!t)throw Error(`<${e}> must be used inside <Popover>`);return t},L=({open:e,defaultOpen:t,onOpenChange:n,modal:r=!1,children:i})=>{let[a,o]=le({value:e,defaultValue:t??!1,onChange:n,name:`Popover`,prop:`open`}),s=(0,j.useId)(),[c,l]=(0,j.useState)(null),[u,d]=(0,j.useState)(null),f=(0,j.useMemo)(()=>({open:a,setOpen:o,modal:r,contentId:s,trigger:c,setTrigger:l,anchor:u,setAnchor:d}),[a,o,r,s,c,u]);return(0,M.jsx)(F.Provider,{value:f,children:i})},R=({asChild:e=!1,onClick:t,ref:n,...r})=>{let{open:i,setOpen:a,contentId:o,setTrigger:s}=I(`PopoverTrigger`),c=p(s,n),l={"aria-haspopup":`dialog`,"aria-expanded":i,"aria-controls":i?o:void 0,...r,...e?void 0:u(`popover`,`trigger`,{state:i?`open`:`closed`}),onClick:m(t,()=>a(!i))};return e?(0,M.jsx)(h,{ref:c,...l}):(0,M.jsx)(`button`,{type:`button`,ref:c,...l})},z=({asChild:e=!1,ref:t,...n})=>{let{setAnchor:r}=I(`PopoverAnchor`),i=p(r,t);return(0,M.jsx)(e?h:`div`,{ref:i,...n})},B=({asChild:e=!1,onClick:t,...n})=>{let{setOpen:r}=I(`PopoverClose`),i={...n,onClick:m(t,()=>r(!1))};return e?(0,M.jsx)(h,{...i}):(0,M.jsx)(`button`,{type:`button`,...i})},V={transform:`translate(0, -200%)`},H=({ref:e,className:t,style:n,children:r,side:i=`bottom`,align:c=`center`,sideOffset:l=6,alignOffset:d=0,collisionPadding:f=8,matchAnchorWidth:h=!1,arrow:g=!1,portal:ie=!0,forceMount:_=!1,onOpenAutoFocus:v,onCloseAutoFocus:y,onEscapeKeyDown:ce,onPointerDownOutside:le,onFocusOutside:ue,onInteractOutside:b,onKeyDown:x,...S})=>{let{open:C,setOpen:w,modal:T,contentId:D,trigger:O,anchor:k}=I(`PopoverContent`),A=te(),[F,L]=(0,j.useState)(null),[R,z]=(0,j.useState)(null),B=he(C,F),H=C&&!!F,{setFloating:U,floatingStyles:W,placement:G,arrowStyles:K,isPositioned:q}=ee({open:B,anchor:k??O,placement:a(i,c),offset:{mainAxis:l+(g?P:0),crossAxis:d},matchAnchorWidth:h,padding:f,arrowElement:g?R:null}),J=p(L,e),Y=se(F,k??O,C),X=o(G);re(F,{enabled:H,disableOutsidePointerEvents:T,branches:()=>[O],onEscapeKeyDown:ce,onPointerDownOutside:le,onFocusOutside:e=>{ue?.(e),T&&e.preventDefault()},onInteractOutside:b,onDismiss:()=>w(!1)}),oe(F,{enabled:H,trapped:T,loop:T,restoreFocus:()=>O,onMountAutoFocus:v,onUnmountAutoFocus:y}),pe(H&&T),me(F,H&&T);let ge=e=>{if(T||!F||!O||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let t=e.shiftKey;if(!de(F,e.target,t))return;e.preventDefault();let n=A??O.ownerDocument.body;(fe(O,n,t)??O).focus(),w(!1)};if(!B&&!_)return null;let Z=C?`open`:`closed`,Q=(0,M.jsx)(`div`,{ref:U,className:E.positioner,style:q?W:{...W,...V},"data-side":X.side,"data-align":X.align,children:(0,M.jsx)(ae.Provider,{value:F,children:(0,M.jsxs)(`div`,{ref:J,id:D,role:`dialog`,"aria-modal":T||void 0,tabIndex:-1,dir:Y,className:s(E.content,t),style:n,...S,...u(`popover`,`content`,{state:Z,side:X.side,align:X.align,placement:G}),onKeyDown:m(x,ge),children:[r,g&&(0,M.jsx)(`span`,{ref:z,className:E.arrowWrapper,style:K,"aria-hidden":`true`,...u(`popover`,`arrow`),children:(0,M.jsx)(`svg`,{className:E.arrow,width:N,height:P,viewBox:`0 0 30 10`,preserveAspectRatio:`none`,children:(0,M.jsx)(`polygon`,{points:`0,0 30,0 15,10`})})})]})})});return ie?(0,M.jsx)(ne,{children:Q}):Q}})))()}function W(){return(0,G.jsxs)(L,{children:[(0,G.jsx)(R,{asChild:!0,children:(0,G.jsx)(l,{color:`neutral`,variant:`outline`,children:`Filter`})}),(0,G.jsxs)(H,{"aria-label":`Filters`,arrow:!0,children:[(0,G.jsx)(b,{defaultChecked:!0,label:`Read`}),(0,G.jsx)(b,{label:`Unread`}),(0,G.jsx)(B,{asChild:!0,children:(0,G.jsx)(l,{size:`small`,children:`Apply`})})]})]})}var G;function K(){return(K=e((()=>{c(),ue(),U(),G=n()})))()}function q(){let[e,t]=(0,J.useState)(!1);return(0,Y.jsxs)(L,{open:e,onOpenChange:t,children:[(0,Y.jsx)(z,{asChild:!0,children:(0,Y.jsx)(`div`,{style:{display:`inline-flex`,gap:8,padding:8,border:`1px dashed`},children:(0,Y.jsx)(R,{asChild:!0,children:(0,Y.jsxs)(l,{children:[e?`Close`:`Open`,` account menu`]})})})}),(0,Y.jsx)(H,{align:`end`,"aria-label":`Account`,children:`Signed in as reader@example.com`})]})}var J,Y;function X(){return(X=e((()=>{J=t(),c(),U(),Y=n()})))()}function ge(){return(0,Z.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:Q.map(e=>(0,Z.jsxs)(L,{children:[(0,Z.jsx)(R,{asChild:!0,children:(0,Z.jsx)(l,{color:`neutral`,variant:`outline`,children:e})}),(0,Z.jsxs)(H,{side:e,align:`start`,sideOffset:10,arrow:!0,children:[`Placed on the `,e,`, aligned to the start.`]})]},e))})}var Z,Q;function _e(){return(_e=e((()=>{c(),U(),Z=n(),Q=[`top`,`right`,`bottom`,`left`]})))()}var ve;function ye(){return(ye=e((()=>{ve=`import {
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
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import {
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
`})))()}var we,Te,Ee;function $(){return($=e((()=>{K(),X(),_e(),ye(),xe(),Ce(),t(),O(),A(),we=n(),Te=D(Object.assign({"./demos/basic.tsx":W,"./demos/controlled.tsx":q,"./demos/placement.tsx":ge}),Object.assign({"./demos/basic.tsx":ve,"./demos/controlled.tsx":be,"./demos/placement.tsx":Se})),Ee=()=>(0,we.jsx)(k,{id:`popover`,demos:Te})})))()}$();export{Ee as default};