import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{H as r,J as i,_ as a,q as ee}from"./io5-CsJcK0E2.js";import{R as o,z as s}from"./ProgressIndicator-BhPa7d9i.js";import{i as c,n as te,r as l}from"./Stack-CiM4m4jI.js";import{n as u,t as d}from"./Menu-D9tC1IuS.js";import{n as ne,t as re}from"./ContextMenu-DrSH5Bdb.js";import{l as ie,n as ae,t as oe,u as se}from"./DocPage-PfpTBKws.js";import{C as ce,D as f,a as le,b as ue,c as de,h as fe}from"./lu-QnZt6OIj.js";function pe(){let[e,t]=(0,p.useState)();return(0,m.jsxs)(c,{gap:4,wrap:!0,children:[(0,m.jsx)(d,{items:[{key:`edit`,label:`Edit`,icon:(0,m.jsx)(fe,{}),shortcut:`⌘E`},{key:`copy`,label:`Duplicate`,icon:(0,m.jsx)(le,{}),shortcut:`⌘D`},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`,icon:(0,m.jsx)(ce,{})}],onSelect:e=>t(e.key),children:(0,m.jsx)(s,{color:`neutral`,variant:`outline`,children:`Actions`})}),(0,m.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var p,m;function h(){return(h=e((()=>{p=t(),o(),l(),u(),f(),m=n()})))()}function me(){let[e,t]=(0,g.useState)(!0),[n,r]=(0,g.useState)(!1),[i,a]=(0,g.useState)(`100`);return(0,_.jsxs)(c,{gap:4,wrap:!0,children:[(0,_.jsx)(d,{align:`start`,items:[{type:`checkbox`,key:`grid`,label:`Show grid`,shortcut:`⌘'`,checked:e,onCheckedChange:t},{type:`checkbox`,key:`rulers`,label:`Show rulers`,checked:n,onCheckedChange:r},{type:`separator`,key:`sep`},{type:`radio-group`,key:`zoom`,label:`Zoom`,value:i,onValueChange:a,items:[{value:`50`,label:`50%`},{value:`100`,label:`100%`},{value:`200`,label:`200%`}]}],children:(0,_.jsx)(s,{color:`neutral`,variant:`outline`,children:`View`})}),(0,_.jsxs)(`span`,{role:`status`,children:[`Grid: `,e?`on`:`off`,` · Rulers: `,n?`on`:`off`,` · Zoom: `,i,`%`]})]})}var g,_;function v(){return(v=e((()=>{g=t(),o(),l(),u(),_=n()})))()}function he(){let[e,t]=(0,y.useState)(),[n,r]=(0,y.useState)(!1);return(0,b.jsxs)(te,{gap:4,children:[(0,b.jsx)(re,{items:[{key:`open`,label:`Open in new tab`},{key:`rename`,label:`Rename`,shortcut:`F2`},{type:`checkbox`,key:`pin`,label:`Pinned`,checked:n,onCheckedChange:r},{key:`copy`,label:`Copy`,children:[{key:`copy-link`,label:`Link`},{key:`copy-path`,label:`Path`}]},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`}],onSelect:e=>t(e.key),children:(0,b.jsxs)(`div`,{style:{display:`grid`,placeItems:`center`,alignContent:`center`,gap:8,height:120,border:`1px dashed var(--border-color)`,borderRadius:8},children:[(0,b.jsx)(`span`,{children:`Right-click here`}),(0,b.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:`Or focus me and press Shift+F10`})]})}),(0,b.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`,` · Pinned: `,n?`yes`:`no`]})]})}var y,b;function x(){return(x=e((()=>{y=t(),o(),ne(),l(),b=n()})))()}function ge(){let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,C.jsx)(d,{open:e,onOpenChange:t,items:[{key:`a`,label:`Archive`},{key:`b`,label:`Move…`}],children:(0,C.jsx)(s,{color:`neutral`,variant:`outline`,children:`Menu`})}),(0,C.jsx)(`span`,{children:e?`Open`:`Closed`})]})}var S,C;function w(){return(w=e((()=>{S=t(),o(),u(),C=n()})))()}function _e(){return(0,T.jsxs)(c,{gap:4,children:[(0,T.jsx)(d,{items:E,align:`start`,children:(0,T.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:`Disabled item`})}),(0,T.jsx)(d,{items:E,disabled:!0,children:(0,T.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:`Disabled menu`})})]})}var T,E;function D(){return(D=e((()=>{o(),l(),u(),T=n(),E=[{key:`copy`,label:`Copy`},{key:`paste`,label:`Paste (clipboard empty)`,disabled:!0},{key:`delete`,label:`Delete`}]})))()}function ve(){let[e,t]=(0,O.useState)();return(0,k.jsxs)(c,{gap:4,wrap:!0,children:[(0,k.jsx)(d,{size:`small`,side:`bottom`,align:`start`,items:[{type:`group`,key:`file`,label:`File`,items:[{key:`new`,label:`New`},{key:`open`,label:`Open…`}]},{type:`separator`,key:`sep`},{key:`export`,label:`Export as`,children:[{key:`csv`,label:`CSV`},{key:`json`,label:`JSON`},{key:`pdf`,label:`PDF`,disabled:!0}]}],onSelect:e=>t(e.key),children:(0,k.jsx)(s,{color:`neutral`,variant:`outline`,children:`File`})}),(0,k.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var O,k;function A(){return(A=e((()=>{O=t(),o(),l(),u(),k=n()})))()}function ye(){return(0,j.jsx)(c,{gap:4,wrap:!0,style:{padding:`120px 96px`},children:M.map(e=>(0,j.jsx)(d,{items:N,side:e,align:`start`,children:(0,j.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:e})},e))})}var j,M,N;function be(){return(be=e((()=>{o(),l(),u(),j=n(),M=[`bottom`,`top`,`left`,`right`],N=[{key:`first`,label:`First`},{key:`second`,label:`Second`},{key:`third`,label:`Third`}]})))()}function xe(){let[e,t]=(0,P.useState)();return(0,F.jsxs)(c,{gap:4,wrap:!0,children:[(0,F.jsx)(d,{align:`start`,items:I,onSelect:e=>t(e.key),children:(0,F.jsx)(s,{color:`neutral`,variant:`outline`,children:`File actions`})}),(0,F.jsx)(d,{dir:`rtl`,align:`start`,items:I,onSelect:e=>t(e.key),children:(0,F.jsx)(s,{color:`neutral`,variant:`outline`,children:`RTL`})}),(0,F.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var P,F,I;function L(){return(L=e((()=>{P=t(),o(),l(),u(),f(),F=n(),I=[{key:`rename`,label:`Rename`,shortcut:`F2`},{key:`move`,label:`Move to`,icon:(0,F.jsx)(de,{}),children:[{key:`inbox`,label:`Inbox`},{key:`archive`,label:`Archive`},{key:`projects`,label:`Projects`,children:[{key:`alpha`,label:`Alpha`},{key:`beta`,label:`Beta`}]}]},{key:`share`,label:`Share`,icon:(0,F.jsx)(ue,{}),children:[{key:`email`,label:`Email`},{key:`link`,label:`Copy link`}]},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`}]})))()}function Se(){return(0,R.jsxs)(c,{gap:4,children:[(0,R.jsx)(d,{items:z,align:`start`,children:(0,R.jsx)(s,{color:`neutral`,variant:`outline`,children:`Account ▾`})}),(0,R.jsx)(d,{items:z,"aria-label":`More actions`,children:(0,R.jsx)(ee,{icon:(0,R.jsx)(a,{}),label:`More actions`})})]})}var R,z;function B(){return(B=e((()=>{o(),l(),i(),u(),r(),R=n(),z=[{key:`profile`,label:`Profile`},{key:`settings`,label:`Settings`},{type:`separator`,key:`sep`},{key:`sign-out`,label:`Sign out`}]})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { useState } from "react";
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
`})))()}var G;function K(){return(K=e((()=>{G=`import { useState } from "react";
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
`})))()}var q;function J(){return(J=e((()=>{q=`import { useState } from "react";
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
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { Button, HStack, Menu } from "minerva-design";

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
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useState } from "react";
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
`})))()}var $;function Ce(){return(Ce=e((()=>{$=`import { Button, HStack, Menu, type MenuSide } from "minerva-design";

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
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useState } from "react";
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
`})))()}var Ee;function De(){return(De=e((()=>{Ee=`import { Button, HStack, IconButton, Menu } from "minerva-design";
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
`})))()}var Oe,ke,Ae;function je(){return(je=e((()=>{h(),v(),x(),w(),D(),A(),be(),L(),B(),H(),W(),K(),J(),X(),Q(),Ce(),Te(),De(),t(),ae(),se(),Oe=n(),ke=ie(Object.assign({"./demos/basic.tsx":pe,"./demos/checkbox-radio.tsx":me,"./demos/context-menu.tsx":he,"./demos/controlled.tsx":ge,"./demos/disabled.tsx":_e,"./demos/groups.tsx":ve,"./demos/placement.tsx":ye,"./demos/submenus.tsx":xe,"./demos/triggers.tsx":Se}),Object.assign({"./demos/basic.tsx":V,"./demos/checkbox-radio.tsx":U,"./demos/context-menu.tsx":G,"./demos/controlled.tsx":q,"./demos/disabled.tsx":Y,"./demos/groups.tsx":Z,"./demos/placement.tsx":$,"./demos/submenus.tsx":we,"./demos/triggers.tsx":Ee})),Ae=()=>(0,Oe.jsx)(oe,{id:`menu`,demos:ke})})))()}je();export{Ae as default};