import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-CQZAxIX3.js";import{n as a,t as o}from"./Checkbox-CbTtg99U.js";import{a as s,c,i as l,l as u,n as d,o as f,r as p,s as m,t as h}from"./Drawer-BoTX0VFK.js";import{l as g,n as _,t as v,u as y}from"./DocPage-CHJwIegD.js";function b(){let[e,t]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(i,{onClick:()=>t(!0),children:`Filters`}),(0,S.jsxs)(d,{open:e,onOpenChange:t,title:`Filters`,description:`Narrow the list of books.`,children:[(0,S.jsx)(c,{children:(0,S.jsx)(o,{defaultChecked:!0,label:`Completed only`})}),(0,S.jsxs)(u,{children:[(0,S.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>t(!1),children:`Reset`}),(0,S.jsx)(i,{onClick:()=>t(!1),children:`Apply`})]})]})]})}var x,S;function C(){return(C=e((()=>{x=t(),r(),a(),s(),S=n()})))()}function w(){return(0,T.jsxs)(m,{children:[(0,T.jsx)(f,{asChild:!0,children:(0,T.jsx)(i,{color:`neutral`,variant:`outline`,children:`Open compound drawer`})}),(0,T.jsxs)(p,{side:`left`,size:`large`,hideCloseButton:!0,children:[(0,T.jsx)(h,{children:`Navigation`}),(0,T.jsx)(c,{children:`Build the drawer from its parts.`}),(0,T.jsx)(u,{children:(0,T.jsx)(l,{asChild:!0,children:(0,T.jsx)(i,{children:`Close`})})})]})]})}var T;function E(){return(E=e((()=>{r(),s(),T=n()})))()}function D(){return(0,O.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:k.map(e=>(0,O.jsx)(d,{side:e,size:`small`,title:`From the ${e}`,trigger:(0,O.jsx)(i,{color:`neutral`,variant:`outline`,children:e}),children:(0,O.jsx)(c,{children:`Sizes: small, medium (default), large and full.`})},e))})}var O,k;function A(){return(A=e((()=>{r(),s(),O=n(),k=[`left`,`right`,`top`,`bottom`]})))()}var j;function M(){return(M=e((()=>{j=`import { useState } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerFooter,
} from "minerva-design";

export default function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Filters</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Filters"
        description="Narrow the list of books."
      >
        <DrawerBody>
          <Checkbox defaultChecked label="Completed only" />
        </DrawerBody>
        <DrawerFooter>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Reset
          </Button>
          <Button onClick={() => setOpen(false)}>Apply</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
`})))()}var N;function P(){return(P=e((()=>{N=`import {
  Button,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "minerva-design";

export default function CompoundDemo() {
  return (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button color="neutral" variant="outline">
          Open compound drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left" size="large" hideCloseButton>
        <DrawerHeader>Navigation</DrawerHeader>
        <DrawerBody>Build the drawer from its parts.</DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { Button, Drawer, DrawerBody, type DrawerSide } from "minerva-design";

const SIDES: DrawerSide[] = ["left", "right", "top", "bottom"];

export default function SidesDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {SIDES.map((side) => (
        <Drawer
          key={side}
          side={side}
          size="small"
          title={\`From the \${side}\`}
          trigger={
            <Button color="neutral" variant="outline">
              {side}
            </Button>
          }
        >
          <DrawerBody>
            Sizes: small, medium (default), large and full.
          </DrawerBody>
        </Drawer>
      ))}
    </div>
  );
}
`})))()}var L,R,z;function B(){return(B=e((()=>{C(),E(),A(),M(),P(),I(),t(),_(),y(),L=n(),R=g(Object.assign({"./demos/basic.tsx":b,"./demos/compound.tsx":w,"./demos/sides.tsx":D}),Object.assign({"./demos/basic.tsx":j,"./demos/compound.tsx":N,"./demos/sides.tsx":F})),z=()=>(0,L.jsx)(v,{id:`drawer`,demos:R})})))()}B();export{z as default};