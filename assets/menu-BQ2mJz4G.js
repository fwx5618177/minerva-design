import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BMZ0rR7D.js";import{G as a,_ as o}from"./io5-DWV9qlxB.js";import{i as ee,r as te}from"./CodeBlock-D5dsgj-R.js";import{i as s,n as ne,r as c}from"./Stack-B3Kr9X_e.js";import{n as l,t as u}from"./Menu-Bcz3Jn4n.js";import{n as re,t as ie}from"./ContextMenu-CqrVIRx3.js";import{l as ae,n as oe,t as se,u as ce}from"./DocPage-CmQtD5jg.js";import{C as le,D as d,a as ue,b as de,c as fe,h as pe}from"./lu-C56zB3NB.js";function me(){let[e,t]=(0,f.useState)();return(0,p.jsxs)(s,{gap:4,wrap:!0,children:[(0,p.jsx)(u,{items:[{key:`edit`,label:`Edit`,icon:(0,p.jsx)(pe,{}),shortcut:`⌘E`},{key:`copy`,label:`Duplicate`,icon:(0,p.jsx)(ue,{}),shortcut:`⌘D`},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`,icon:(0,p.jsx)(le,{})}],onSelect:e=>t(e.key),children:(0,p.jsx)(i,{color:`neutral`,variant:`outline`,children:`Actions`})}),(0,p.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var f,p;function m(){return(m=e((()=>{f=t(),r(),c(),l(),d(),p=n()})))()}function he(){let[e,t]=(0,h.useState)(!0),[n,r]=(0,h.useState)(!1),[a,o]=(0,h.useState)(`100`);return(0,g.jsxs)(s,{gap:4,wrap:!0,children:[(0,g.jsx)(u,{align:`start`,items:[{type:`checkbox`,key:`grid`,label:`Show grid`,shortcut:`⌘'`,checked:e,onCheckedChange:t},{type:`checkbox`,key:`rulers`,label:`Show rulers`,checked:n,onCheckedChange:r},{type:`separator`,key:`sep`},{type:`radio-group`,key:`zoom`,label:`Zoom`,value:a,onValueChange:o,items:[{value:`50`,label:`50%`},{value:`100`,label:`100%`},{value:`200`,label:`200%`}]}],children:(0,g.jsx)(i,{color:`neutral`,variant:`outline`,children:`View`})}),(0,g.jsxs)(`span`,{role:`status`,children:[`Grid: `,e?`on`:`off`,` · Rulers: `,n?`on`:`off`,` · Zoom: `,a,`%`]})]})}var h,g;function _(){return(_=e((()=>{h=t(),r(),c(),l(),g=n()})))()}function ge(){let[e,t]=(0,v.useState)(),[n,r]=(0,v.useState)(!1);return(0,y.jsxs)(ne,{gap:4,children:[(0,y.jsx)(ie,{items:[{key:`open`,label:`Open in new tab`},{key:`rename`,label:`Rename`,shortcut:`F2`},{type:`checkbox`,key:`pin`,label:`Pinned`,checked:n,onCheckedChange:r},{key:`copy`,label:`Copy`,children:[{key:`copy-link`,label:`Link`},{key:`copy-path`,label:`Path`}]},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`}],onSelect:e=>t(e.key),children:(0,y.jsxs)(`div`,{style:{display:`grid`,placeItems:`center`,alignContent:`center`,gap:8,height:120,border:`1px dashed var(--border-color)`,borderRadius:8},children:[(0,y.jsx)(`span`,{children:`Right-click here`}),(0,y.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:`Or focus me and press Shift+F10`})]})}),(0,y.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`,` · Pinned: `,n?`yes`:`no`]})]})}var v,y;function b(){return(b=e((()=>{v=t(),r(),re(),c(),y=n()})))()}function _e(){let[e,t]=(0,x.useState)(!1);return(0,S.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,S.jsx)(u,{open:e,onOpenChange:t,items:[{key:`a`,label:`Archive`},{key:`b`,label:`Move…`}],children:(0,S.jsx)(i,{color:`neutral`,variant:`outline`,children:`Menu`})}),(0,S.jsx)(`span`,{children:e?`Open`:`Closed`})]})}var x,S;function C(){return(C=e((()=>{x=t(),r(),l(),S=n()})))()}function ve(){return(0,w.jsxs)(s,{gap:4,children:[(0,w.jsx)(u,{items:T,align:`start`,children:(0,w.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:`Disabled item`})}),(0,w.jsx)(u,{items:T,disabled:!0,children:(0,w.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:`Disabled menu`})})]})}var w,T;function E(){return(E=e((()=>{r(),c(),l(),w=n(),T=[{key:`copy`,label:`Copy`},{key:`paste`,label:`Paste (clipboard empty)`,disabled:!0},{key:`delete`,label:`Delete`}]})))()}function ye(){let[e,t]=(0,D.useState)();return(0,O.jsxs)(s,{gap:4,wrap:!0,children:[(0,O.jsx)(u,{size:`small`,side:`bottom`,align:`start`,items:[{type:`group`,key:`file`,label:`File`,items:[{key:`new`,label:`New`},{key:`open`,label:`Open…`}]},{type:`separator`,key:`sep`},{key:`export`,label:`Export as`,children:[{key:`csv`,label:`CSV`},{key:`json`,label:`JSON`},{key:`pdf`,label:`PDF`,disabled:!0}]}],onSelect:e=>t(e.key),children:(0,O.jsx)(i,{color:`neutral`,variant:`outline`,children:`File`})}),(0,O.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var D,O;function k(){return(k=e((()=>{D=t(),r(),c(),l(),O=n()})))()}function be(){return(0,A.jsx)(s,{gap:4,wrap:!0,style:{padding:`120px 96px`},children:j.map(e=>(0,A.jsx)(u,{items:xe,side:e,align:`start`,children:(0,A.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:e})},e))})}var A,j,xe;function M(){return(M=e((()=>{r(),c(),l(),A=n(),j=[`bottom`,`top`,`left`,`right`],xe=[{key:`first`,label:`First`},{key:`second`,label:`Second`},{key:`third`,label:`Third`}]})))()}function Se(){let[e,t]=(0,N.useState)();return(0,P.jsxs)(s,{gap:4,wrap:!0,children:[(0,P.jsx)(u,{align:`start`,items:F,onSelect:e=>t(e.key),children:(0,P.jsx)(i,{color:`neutral`,variant:`outline`,children:`File actions`})}),(0,P.jsx)(u,{dir:`rtl`,align:`start`,items:F,onSelect:e=>t(e.key),children:(0,P.jsx)(i,{color:`neutral`,variant:`outline`,children:`RTL`})}),(0,P.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),r(),c(),l(),d(),P=n(),F=[{key:`rename`,label:`Rename`,shortcut:`F2`},{key:`move`,label:`Move to`,icon:(0,P.jsx)(fe,{}),children:[{key:`inbox`,label:`Inbox`},{key:`archive`,label:`Archive`},{key:`projects`,label:`Projects`,children:[{key:`alpha`,label:`Alpha`},{key:`beta`,label:`Beta`}]}]},{key:`share`,label:`Share`,icon:(0,P.jsx)(de,{}),children:[{key:`email`,label:`Email`},{key:`link`,label:`Copy link`}]},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`}]})))()}function Ce(){return(0,L.jsxs)(s,{gap:4,children:[(0,L.jsx)(u,{items:R,align:`start`,children:(0,L.jsx)(i,{color:`neutral`,variant:`outline`,children:`Account ▾`})}),(0,L.jsx)(u,{items:R,"aria-label":`More actions`,children:(0,L.jsx)(te,{icon:(0,L.jsx)(o,{}),label:`More actions`})})]})}var L,R;function z(){return(z=e((()=>{r(),c(),ee(),l(),a(),L=n(),R=[{key:`profile`,label:`Profile`},{key:`settings`,label:`Settings`},{type:`separator`,key:`sep`},{key:`sign-out`,label:`Sign out`}]})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";
import { LuCopy, LuPencil, LuTrash2 } from "react-icons/lu";

export default function BasicDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        items={[
          { key: "edit", label: "Edit", icon: <LuPencil />, shortcut: "⌘E" },
          { key: "copy", label: "Duplicate", icon: <LuCopy />, shortcut: "⌘D" },
          { type: "separator", key: "sep" },
          { key: "delete", label: "Delete", icon: <LuTrash2 /> },
        ]}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          Actions
        </Button>
      </Menu>
      <span role="status">Selected: {selected ?? "none"}</span>
    </HStack>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";

export default function CheckboxRadioDemo() {
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(false);
  const [zoom, setZoom] = useState("100");
  return (
    <HStack gap={4} wrap>
      <Menu
        align="start"
        items={[
          {
            type: "checkbox",
            key: "grid",
            label: "Show grid",
            shortcut: "⌘'",
            checked: showGrid,
            onCheckedChange: setShowGrid,
          },
          {
            type: "checkbox",
            key: "rulers",
            label: "Show rulers",
            checked: showRulers,
            onCheckedChange: setShowRulers,
          },
          { type: "separator", key: "sep" },
          {
            type: "radio-group",
            key: "zoom",
            label: "Zoom",
            value: zoom,
            onValueChange: setZoom,
            items: [
              { value: "50", label: "50%" },
              { value: "100", label: "100%" },
              { value: "200", label: "200%" },
            ],
          },
        ]}
      >
        <Button color="neutral" variant="outline">
          View
        </Button>
      </Menu>
      <span role="status">
        Grid: {showGrid ? "on" : "off"} · Rulers: {showRulers ? "on" : "off"} ·
        Zoom: {zoom}%
      </span>
    </HStack>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import { Button, ContextMenu, VStack } from "minerva-design";

export default function ContextMenuDemo() {
  const [selected, setSelected] = useState<string>();
  const [pinned, setPinned] = useState(false);
  return (
    <VStack gap={4}>
      <ContextMenu
        items={[
          { key: "open", label: "Open in new tab" },
          { key: "rename", label: "Rename", shortcut: "F2" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            checked: pinned,
            onCheckedChange: setPinned,
          },
          {
            key: "copy",
            label: "Copy",
            children: [
              { key: "copy-link", label: "Link" },
              { key: "copy-path", label: "Path" },
            ],
          },
          { type: "separator", key: "sep" },
          { key: "delete", label: "Delete" },
        ]}
        onSelect={(item) => setSelected(item.key)}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
            alignContent: "center",
            gap: 8,
            height: 120,
            border: "1px dashed var(--border-color)",
            borderRadius: 8,
          }}
        >
          <span>Right-click here</span>
          <Button size="small" color="neutral" variant="outline">
            Or focus me and press Shift+F10
          </Button>
        </div>
      </ContextMenu>
      <span role="status">
        Selected: {selected ?? "none"} · Pinned: {pinned ? "yes" : "no"}
      </span>
    </VStack>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useState } from "react";
import { Button, Menu } from "minerva-design";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Menu
        open={open}
        onOpenChange={setOpen}
        items={[
          { key: "a", label: "Archive" },
          { key: "b", label: "Move…" },
        ]}
      >
        <Button color="neutral" variant="outline">
          Menu
        </Button>
      </Menu>
      <span>{open ? "Open" : "Closed"}</span>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Button, HStack, Menu } from "minerva-design";

const items = [
  { key: "copy", label: "Copy" },
  { key: "paste", label: "Paste (clipboard empty)", disabled: true },
  { key: "delete", label: "Delete" },
];

export default function DisabledDemo() {
  return (
    <HStack gap={4}>
      <Menu items={items} align="start">
        <Button size="small" color="neutral" variant="outline">
          Disabled item
        </Button>
      </Menu>
      <Menu items={items} disabled>
        <Button size="small" color="neutral" variant="outline">
          Disabled menu
        </Button>
      </Menu>
    </HStack>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";

export default function GroupsDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        size="small"
        side="bottom"
        align="start"
        items={[
          {
            type: "group",
            key: "file",
            label: "File",
            items: [
              { key: "new", label: "New" },
              { key: "open", label: "Open…" },
            ],
          },
          { type: "separator", key: "sep" },
          {
            key: "export",
            label: "Export as",
            children: [
              { key: "csv", label: "CSV" },
              { key: "json", label: "JSON" },
              { key: "pdf", label: "PDF", disabled: true },
            ],
          },
        ]}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          File
        </Button>
      </Menu>
      <span role="status">Selected: {selected ?? "none"}</span>
    </HStack>
  );
}
`})))()}var Q;function we(){return(we=e((()=>{Q=`import { Button, HStack, Menu, type MenuSide } from "minerva-design";

const sides: MenuSide[] = ["bottom", "top", "left", "right"];
const items = [
  { key: "first", label: "First" },
  { key: "second", label: "Second" },
  { key: "third", label: "Third" },
];

export default function PlacementDemo() {
  return (
    <HStack gap={4} wrap style={{ padding: "120px 96px" }}>
      {sides.map((side) => (
        <Menu key={side} items={items} side={side} align="start">
          <Button size="small" color="neutral" variant="outline">
            {side}
          </Button>
        </Menu>
      ))}
    </HStack>
  );
}
`})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`import { useState } from "react";
import { Button, HStack, Menu, type MenuEntry } from "minerva-design";
import { LuFolderInput, LuShare2 } from "react-icons/lu";

const items: MenuEntry[] = [
  { key: "rename", label: "Rename", shortcut: "F2" },
  {
    key: "move",
    label: "Move to",
    icon: <LuFolderInput />,
    children: [
      { key: "inbox", label: "Inbox" },
      { key: "archive", label: "Archive" },
      {
        key: "projects",
        label: "Projects",
        children: [
          { key: "alpha", label: "Alpha" },
          { key: "beta", label: "Beta" },
        ],
      },
    ],
  },
  {
    key: "share",
    label: "Share",
    icon: <LuShare2 />,
    children: [
      { key: "email", label: "Email" },
      { key: "link", label: "Copy link" },
    ],
  },
  { type: "separator", key: "sep" },
  { key: "delete", label: "Delete" },
];

export default function SubmenusDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        align="start"
        items={items}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          File actions
        </Button>
      </Menu>
      <Menu
        dir="rtl"
        align="start"
        items={items}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          RTL
        </Button>
      </Menu>
      <span role="status">Selected: {selected ?? "none"}</span>
    </HStack>
  );
}
`})))()}var De;function Oe(){return(Oe=e((()=>{De=`import { Button, HStack, IconButton, Menu } from "minerva-design";
import { IoEllipsisVertical } from "react-icons/io5";

const items = [
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
  { type: "separator" as const, key: "sep" },
  { key: "sign-out", label: "Sign out" },
];

export default function TriggersDemo() {
  return (
    <HStack gap={4}>
      <Menu items={items} align="start">
        <Button color="neutral" variant="outline">
          Account ▾
        </Button>
      </Menu>
      <Menu items={items} aria-label="More actions">
        <IconButton icon={<IoEllipsisVertical />} label="More actions" />
      </Menu>
    </HStack>
  );
}
`})))()}var ke,Ae,je;function $(){return($=e((()=>{m(),_(),b(),C(),E(),k(),M(),I(),z(),V(),U(),G(),q(),Y(),Z(),we(),Ee(),Oe(),t(),oe(),ce(),ke=n(),Ae=ae(Object.assign({"./demos/basic.tsx":me,"./demos/checkbox-radio.tsx":he,"./demos/context-menu.tsx":ge,"./demos/controlled.tsx":_e,"./demos/disabled.tsx":ve,"./demos/groups.tsx":ye,"./demos/placement.tsx":be,"./demos/submenus.tsx":Se,"./demos/triggers.tsx":Ce}),Object.assign({"./demos/basic.tsx":B,"./demos/checkbox-radio.tsx":H,"./demos/context-menu.tsx":W,"./demos/controlled.tsx":K,"./demos/disabled.tsx":J,"./demos/groups.tsx":X,"./demos/placement.tsx":Q,"./demos/submenus.tsx":Te,"./demos/triggers.tsx":De})),je=()=>(0,ke.jsx)(se,{id:`menu`,demos:Ae})})))()}$();export{je as default};