import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{$ as r,Q as i,Y as a,Z as o,_t as s,at as c,bt as l,dt as u,et as d,it as f,nt as ee,ot as p,pt as m,rt as h,st as te,tt as ne,ut as re,vt as g,xt as _}from"./io5-DGxLJ5Qx.js";import{F as v,Mn as y,U as ie,rt as ae,z as oe}from"./angular-preview-CxN7u9Fp.js";import{R as b,z as x}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as S}from"./stylingHooks-PqiNJdev.js";import{n as se,t as C}from"./Checkbox-DGuOPerB.js";import{n as ce,r as le,t as ue}from"./tabbing-2MXSv0Wd.js";import{a as w,i as T,n as de,o as fe,r as pe,t as E}from"./useScrollLock-CAfey2Ce.js";import{n as D,t as O}from"./popover.module.scss-DtLmhdM_.js";import{l as me,n as k,t as A,u as j}from"./DocPage-D3s4i75Z.js";var M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{y(),l(),g(),re(),p(),d(),h(),i(),a(),ue(),w(),T(),E(),D(),M=t(),N=n(),v(),P=10,F=5,I=(0,M.createContext)(null),L=e=>{let t=(0,M.useContext)(I);if(!t)throw Error(`<${e}> must be used inside <Popover>`);return t},R=({open:e,defaultOpen:t,onOpenChange:n,modal:r=!1,children:i})=>{let[a,o]=s({value:e,defaultValue:t??!1,onChange:n,name:`Popover`,prop:`open`}),c=(0,M.useId)(),[l,u]=(0,M.useState)(null),[d,f]=(0,M.useState)(null),ee=(0,M.useMemo)(()=>({open:a,setOpen:o,modal:r,contentId:c,trigger:l,setTrigger:u,anchor:d,setAnchor:f}),[a,o,r,c,l,d]);return(0,N.jsx)(I.Provider,{value:ee,children:i})},z=({asChild:e=!1,onClick:t,ref:n,...r})=>{let{open:i,setOpen:a,contentId:o,setTrigger:s}=L(`PopoverTrigger`),c=_(s,n),l={"aria-haspopup":`dialog`,"aria-expanded":i,"aria-controls":i?o:void 0,...r,...e?void 0:S(`popover`,`trigger`,{state:i?`open`:`closed`}),onClick:m(t,()=>a(!i))};return e?(0,N.jsx)(u,{ref:c,...l}):(0,N.jsx)(`button`,{type:`button`,ref:c,...l})},B=({asChild:e=!1,ref:t,...n})=>{let{setAnchor:r}=L(`PopoverAnchor`),i=_(r,t);return(0,N.jsx)(e?u:`div`,{ref:i,...n})},V=({asChild:e=!1,onClick:t,...n})=>{let{setOpen:r}=L(`PopoverClose`),i={...n,onClick:m(t,()=>r(!1))};return e?(0,N.jsx)(u,{...i}):(0,N.jsx)(`button`,{type:`button`,...i})},H={transform:`translate(0, -200%)`},U=({ref:e,className:t,style:n,children:i,side:a=`bottom`,align:s=`center`,sideOffset:l=6,alignOffset:u=0,collisionPadding:d=8,matchAnchorWidth:p=!1,arrow:h=!1,portal:re=!0,forceMount:g=!1,onOpenAutoFocus:v,onCloseAutoFocus:y,onEscapeKeyDown:b,onPointerDownOutside:x,onFocusOutside:se,onInteractOutside:C,onKeyDown:ue,...w})=>{let{open:T,setOpen:E,modal:D,contentId:me,trigger:k,anchor:A}=L(`PopoverContent`),j=f(),[I,R]=(0,M.useState)(null),[z,B]=(0,M.useState)(null),V=pe(T,I),U=T&&!!I,{setFloating:W,floatingStyles:G,placement:K,arrowStyles:q,isPositioned:J}=ne({open:V,anchor:A??k,placement:oe(a,s),offset:{mainAxis:l+(h?F:0),crossAxis:u},matchAnchorWidth:p,padding:d,arrowElement:h?z:null}),Y=_(R,e),X=o(I,A??k,T),Z=ie(K);c(I,{enabled:U,disableOutsidePointerEvents:D,branches:()=>[k],onEscapeKeyDown:b,onPointerDownOutside:x,onFocusOutside:e=>{se?.(e),D&&e.preventDefault()},onInteractOutside:C,onDismiss:()=>E(!1)}),r(I,{enabled:U,trapped:D,loop:D,restoreFocus:()=>k,onMountAutoFocus:v,onUnmountAutoFocus:y}),de(U&&D),fe(I,U&&D);let he=e=>{if(D||!I||!k||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let t=e.shiftKey;if(!ce(I,e.target,t))return;e.preventDefault();let n=j??k.ownerDocument.body;(le(k,n,t)??k).focus(),E(!1)};if(!V&&!g)return null;let Q=T?`open`:`closed`,$=(0,N.jsx)(`div`,{ref:W,className:O.positioner,style:J?G:{...G,...H},"data-side":Z.side,"data-align":Z.align,children:(0,N.jsx)(ee.Provider,{value:I,children:(0,N.jsxs)(`div`,{ref:Y,id:me,role:`dialog`,"aria-modal":D||void 0,tabIndex:-1,dir:X,className:ae(O.content,t),style:n,...w,...S(`popover`,`content`,{state:Q,side:Z.side,align:Z.align,placement:K}),onKeyDown:m(ue,he),children:[i,h&&(0,N.jsx)(`span`,{ref:B,className:O.arrowWrapper,style:q,"aria-hidden":`true`,...S(`popover`,`arrow`),children:(0,N.jsx)(`svg`,{className:O.arrow,width:P,height:F,viewBox:`0 0 30 10`,preserveAspectRatio:`none`,children:(0,N.jsx)(`polygon`,{points:`0,0 30,0 15,10`})})})]})})});return re?(0,N.jsx)(te,{children:$}):$}})))()}function G(){return(0,K.jsxs)(R,{children:[(0,K.jsx)(z,{asChild:!0,children:(0,K.jsx)(x,{color:`neutral`,variant:`outline`,children:`Filter`})}),(0,K.jsxs)(U,{"aria-label":`Filters`,arrow:!0,children:[(0,K.jsx)(C,{defaultChecked:!0,label:`Read`}),(0,K.jsx)(C,{label:`Unread`}),(0,K.jsx)(V,{asChild:!0,children:(0,K.jsx)(x,{size:`small`,children:`Apply`})})]})]})}var K;function q(){return(q=e((()=>{b(),se(),W(),K=n()})))()}function J(){let[e,t]=(0,Y.useState)(!1);return(0,X.jsxs)(R,{open:e,onOpenChange:t,children:[(0,X.jsx)(B,{asChild:!0,children:(0,X.jsx)(`div`,{style:{display:`inline-flex`,gap:8,padding:8,border:`1px dashed`},children:(0,X.jsx)(z,{asChild:!0,children:(0,X.jsxs)(x,{children:[e?`Close`:`Open`,` account menu`]})})})}),(0,X.jsx)(U,{align:`end`,"aria-label":`Account`,children:`Signed in as reader@example.com`})]})}var Y,X;function Z(){return(Z=e((()=>{Y=t(),b(),W(),X=n()})))()}function he(){return(0,Q.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:$.map(e=>(0,Q.jsxs)(R,{children:[(0,Q.jsx)(z,{asChild:!0,children:(0,Q.jsx)(x,{color:`neutral`,variant:`outline`,children:e})}),(0,Q.jsxs)(U,{side:e,align:`start`,sideOffset:10,arrow:!0,children:[`Placed on the `,e,`, aligned to the start.`]})]},e))})}var Q,$;function ge(){return(ge=e((()=>{b(),W(),Q=n(),$=[`top`,`right`,`bottom`,`left`]})))()}var _e;function ve(){return(ve=e((()=>{_e=`import {
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
`})))()}var Ce,we,Te;function Ee(){return(Ee=e((()=>{q(),Z(),ge(),ve(),be(),Se(),t(),k(),j(),Ce=n(),we=me(Object.assign({"./demos/basic.tsx":G,"./demos/controlled.tsx":J,"./demos/placement.tsx":he}),Object.assign({"./demos/basic.tsx":_e,"./demos/controlled.tsx":ye,"./demos/placement.tsx":xe})),Te=()=>(0,Ce.jsx)(A,{id:`popover`,demos:we})})))()}Ee();export{Te as default};