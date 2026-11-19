import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{$t as r,Bt as i,Ft as a,Gt as o,Ht as s,Kt as c,Lt as l,Rt as u,Ut as d,Vt as ee,Wt as te,Xt as ne,Zt as f,in as p,on as m,qt as re,rn as h,sn as g,zt as ie}from"./icons-BnhBUHMa.js";import{C as ae,Nn as oe,Z as se,it as ce,j as le}from"./angular-preview-Bvv51cL-.js";import{R as _,z as v}from"./ProgressIndicator-CXNTCbma.js";import{t as y}from"./stylingHooks-PqiNJdev.js";import{n as b,t as x}from"./Checkbox-BYSlQoZx.js";import{n as ue,r as de,t as S}from"./tabbing-B7sQ4G2K.js";import{a as C,i as w,n as fe,o as pe,r as me,t as T}from"./useScrollLock-B-uUSxWs.js";import{n as E,t as D}from"./popover.module.scss-DtLmhdM_.js";import{l as he,n as O,t as k,u as A}from"./DocPage--2U8TgOE.js";var j,M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{oe(),m(),p(),ne(),c(),i(),d(),u(),a(),S(),C(),w(),T(),E(),j=t(),M=n(),le(),N=10,P=5,F=(0,j.createContext)(null),I=e=>{let t=(0,j.useContext)(F);if(!t)throw Error(`<${e}> must be used inside <Popover>`);return t},L=({open:e,defaultOpen:t,onOpenChange:n,modal:r=!1,children:i})=>{let[a,o]=h({value:e,defaultValue:t??!1,onChange:n,name:`Popover`,prop:`open`}),s=(0,j.useId)(),[c,l]=(0,j.useState)(null),[u,d]=(0,j.useState)(null),ee=(0,j.useMemo)(()=>({open:a,setOpen:o,modal:r,contentId:s,trigger:c,setTrigger:l,anchor:u,setAnchor:d}),[a,o,r,s,c,u]);return(0,M.jsx)(F.Provider,{value:ee,children:i})},R=({asChild:e=!1,onClick:t,ref:n,...i})=>{let{open:a,setOpen:o,contentId:s,setTrigger:c}=I(`PopoverTrigger`),l=g(c,n),u={"aria-haspopup":`dialog`,"aria-expanded":a,"aria-controls":a?s:void 0,...i,...e?void 0:y(`popover`,`trigger`,{state:a?`open`:`closed`}),onClick:r(t,()=>o(!a))};return e?(0,M.jsx)(f,{ref:l,...u}):(0,M.jsx)(`button`,{type:`button`,ref:l,...u})},z=({asChild:e=!1,ref:t,...n})=>{let{setAnchor:r}=I(`PopoverAnchor`),i=g(r,t);return(0,M.jsx)(e?f:`div`,{ref:i,...n})},B=({asChild:e=!1,onClick:t,...n})=>{let{setOpen:i}=I(`PopoverClose`),a={...n,onClick:r(t,()=>i(!1))};return e?(0,M.jsx)(f,{...a}):(0,M.jsx)(`button`,{type:`button`,...a})},V={transform:`translate(0, -200%)`},H=({ref:e,className:t,style:n,children:i,side:a=`bottom`,align:c=`center`,sideOffset:u=6,alignOffset:d=0,collisionPadding:ne=8,matchAnchorWidth:f=!1,arrow:p=!1,portal:m=!0,forceMount:h=!1,onOpenAutoFocus:oe,onCloseAutoFocus:le,onEscapeKeyDown:_,onPointerDownOutside:v,onFocusOutside:b,onInteractOutside:x,onKeyDown:S,...C})=>{let{open:w,setOpen:T,modal:E,contentId:he,trigger:O,anchor:k}=I(`PopoverContent`),A=te(),[F,L]=(0,j.useState)(null),[R,z]=(0,j.useState)(null),B=me(w,F),H=w&&!!F,{setFloating:U,floatingStyles:W,placement:G,arrowStyles:K,isPositioned:q}=ee({open:B,anchor:k??O,placement:se(a,c),offset:{mainAxis:u+(p?P:0),crossAxis:d},matchAnchorWidth:f,padding:ne,arrowElement:p?R:null}),J=g(L,e),Y=l(F,k??O,w),X=ae(G);o(F,{enabled:H,disableOutsidePointerEvents:E,branches:()=>[O],onEscapeKeyDown:_,onPointerDownOutside:v,onFocusOutside:e=>{b?.(e),E&&e.preventDefault()},onInteractOutside:x,onDismiss:()=>T(!1)}),ie(F,{enabled:H,trapped:E,loop:E,restoreFocus:()=>O,onMountAutoFocus:oe,onUnmountAutoFocus:le}),fe(H&&E),pe(F,H&&E);let ge=e=>{if(E||!F||!O||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let t=e.shiftKey;if(!ue(F,e.target,t))return;e.preventDefault();let n=A??O.ownerDocument.body;(de(O,n,t)??O).focus(),T(!1)};if(!B&&!h)return null;let Z=w?`open`:`closed`,Q=(0,M.jsx)(`div`,{ref:U,className:D.positioner,style:q?W:{...W,...V},"data-side":X.side,"data-align":X.align,children:(0,M.jsx)(s.Provider,{value:F,children:(0,M.jsxs)(`div`,{ref:J,id:he,role:`dialog`,"aria-modal":E||void 0,tabIndex:-1,dir:Y,className:ce(D.content,t),style:n,...C,...y(`popover`,`content`,{state:Z,side:X.side,align:X.align,placement:G}),onKeyDown:r(S,ge),children:[i,p&&(0,M.jsx)(`span`,{ref:z,className:D.arrowWrapper,style:K,"aria-hidden":`true`,...y(`popover`,`arrow`),children:(0,M.jsx)(`svg`,{className:D.arrow,width:N,height:P,viewBox:`0 0 30 10`,preserveAspectRatio:`none`,children:(0,M.jsx)(`polygon`,{points:`0,0 30,0 15,10`})})})]})})});return m?(0,M.jsx)(re,{children:Q}):Q}})))()}function W(){return(0,G.jsxs)(L,{children:[(0,G.jsx)(R,{asChild:!0,children:(0,G.jsx)(v,{color:`neutral`,variant:`outline`,children:`Filter`})}),(0,G.jsxs)(H,{"aria-label":`Filters`,arrow:!0,children:[(0,G.jsx)(x,{defaultChecked:!0,label:`Read`}),(0,G.jsx)(x,{label:`Unread`}),(0,G.jsx)(B,{asChild:!0,children:(0,G.jsx)(v,{size:`small`,children:`Apply`})})]})]})}var G;function K(){return(K=e((()=>{_(),b(),U(),G=n()})))()}function q(){let[e,t]=(0,J.useState)(!1);return(0,Y.jsxs)(L,{open:e,onOpenChange:t,children:[(0,Y.jsx)(z,{asChild:!0,children:(0,Y.jsx)(`div`,{style:{display:`inline-flex`,gap:8,padding:8,border:`1px dashed`},children:(0,Y.jsx)(R,{asChild:!0,children:(0,Y.jsxs)(v,{children:[e?`Close`:`Open`,` account menu`]})})})}),(0,Y.jsx)(H,{align:`end`,"aria-label":`Account`,children:`Signed in as reader@example.com`})]})}var J,Y;function X(){return(X=e((()=>{J=t(),_(),U(),Y=n()})))()}function ge(){return(0,Z.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:Q.map(e=>(0,Z.jsxs)(L,{children:[(0,Z.jsx)(R,{asChild:!0,children:(0,Z.jsx)(v,{color:`neutral`,variant:`outline`,children:e})}),(0,Z.jsxs)(H,{side:e,align:`start`,sideOffset:10,arrow:!0,children:[`Placed on the `,e,`, aligned to the start.`]})]},e))})}var Z,Q;function _e(){return(_e=e((()=>{_(),U(),Z=n(),Q=[`top`,`right`,`bottom`,`left`]})))()}var ve;function ye(){return(ye=e((()=>{ve=`import {
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
`})))()}var be;function $(){return($=e((()=>{be=`import { useState } from "react";
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
`})))()}var Ce,we,Te;function Ee(){return(Ee=e((()=>{K(),X(),_e(),ye(),$(),Se(),t(),O(),A(),Ce=n(),we=he(Object.assign({"./demos/basic.tsx":W,"./demos/controlled.tsx":q,"./demos/placement.tsx":ge}),Object.assign({"./demos/basic.tsx":ve,"./demos/controlled.tsx":be,"./demos/placement.tsx":xe})),Te=()=>(0,Ce.jsx)(k,{id:`popover`,demos:we})})))()}Ee();export{Te as default};