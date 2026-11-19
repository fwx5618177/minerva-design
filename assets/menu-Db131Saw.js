import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{D as r,X as i,bt as a,i as ee,n as te,nt as ne,st as re}from"./icons-BnhBUHMa.js";import{R as o,z as s}from"./ProgressIndicator-CXNTCbma.js";import{i as ie,r as ae}from"./CodeBlock-CuxMOUBV.js";import{i as c,n as oe,r as l}from"./Stack-NslbKtAY.js";import{n as u,t as d}from"./Menu-CKWq-3_6.js";import{n as se,t as ce}from"./ContextMenu-Bon7Cnp8.js";import{l as le,n as ue,t as de,u as fe}from"./DocPage--2U8TgOE.js";function pe(){let[e,t]=(0,me.useState)();return(0,f.jsxs)(c,{gap:4,wrap:!0,children:[(0,f.jsx)(d,{items:[{key:`edit`,label:`Edit`,icon:(0,f.jsx)(ee,{size:`1em`}),shortcut:`⌘E`},{key:`copy`,label:`Duplicate`,icon:(0,f.jsx)(r,{size:`1em`}),shortcut:`⌘D`},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`,icon:(0,f.jsx)(a,{size:`1em`})}],onSelect:e=>t(e.key),children:(0,f.jsx)(s,{color:`neutral`,variant:`outline`,children:`Actions`})}),(0,f.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var me,f;function p(){return(p=e((()=>{i(),me=t(),o(),l(),u(),f=n()})))()}function he(){let[e,t]=(0,m.useState)(!0),[n,r]=(0,m.useState)(!1),[i,a]=(0,m.useState)(`100`);return(0,h.jsxs)(c,{gap:4,wrap:!0,children:[(0,h.jsx)(d,{align:`start`,items:[{type:`checkbox`,key:`grid`,label:`Show grid`,shortcut:`⌘'`,checked:e,onCheckedChange:t},{type:`checkbox`,key:`rulers`,label:`Show rulers`,checked:n,onCheckedChange:r},{type:`separator`,key:`sep`},{type:`radio-group`,key:`zoom`,label:`Zoom`,value:i,onValueChange:a,items:[{value:`50`,label:`50%`},{value:`100`,label:`100%`},{value:`200`,label:`200%`}]}],children:(0,h.jsx)(s,{color:`neutral`,variant:`outline`,children:`View`})}),(0,h.jsxs)(`span`,{role:`status`,children:[`Grid: `,e?`on`:`off`,` · Rulers: `,n?`on`:`off`,` · Zoom: `,i,`%`]})]})}var m,h;function g(){return(g=e((()=>{m=t(),o(),l(),u(),h=n()})))()}function ge(){let[e,t]=(0,_.useState)(),[n,r]=(0,_.useState)(!1);return(0,v.jsxs)(oe,{gap:4,children:[(0,v.jsx)(ce,{items:[{key:`open`,label:`Open in new tab`},{key:`rename`,label:`Rename`,shortcut:`F2`},{type:`checkbox`,key:`pin`,label:`Pinned`,checked:n,onCheckedChange:r},{key:`copy`,label:`Copy`,children:[{key:`copy-link`,label:`Link`},{key:`copy-path`,label:`Path`}]},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`}],onSelect:e=>t(e.key),children:(0,v.jsxs)(`div`,{style:{display:`grid`,placeItems:`center`,alignContent:`center`,gap:8,height:120,border:`1px dashed var(--border-color)`,borderRadius:8},children:[(0,v.jsx)(`span`,{children:`Right-click here`}),(0,v.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:`Or focus me and press Shift+F10`})]})}),(0,v.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`,` · Pinned: `,n?`yes`:`no`]})]})}var _,v;function y(){return(y=e((()=>{_=t(),o(),se(),l(),v=n()})))()}function _e(){let[e,t]=(0,b.useState)(!1);return(0,x.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,x.jsx)(d,{open:e,onOpenChange:t,items:[{key:`a`,label:`Archive`},{key:`b`,label:`Move…`}],children:(0,x.jsx)(s,{color:`neutral`,variant:`outline`,children:`Menu`})}),(0,x.jsx)(`span`,{children:e?`Open`:`Closed`})]})}var b,x;function S(){return(S=e((()=>{b=t(),o(),u(),x=n()})))()}function ve(){return(0,C.jsxs)(c,{gap:4,children:[(0,C.jsx)(d,{items:w,align:`start`,children:(0,C.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:`Disabled item`})}),(0,C.jsx)(d,{items:w,disabled:!0,children:(0,C.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:`Disabled menu`})})]})}var C,w;function T(){return(T=e((()=>{o(),l(),u(),C=n(),w=[{key:`copy`,label:`Copy`},{key:`paste`,label:`Paste (clipboard empty)`,disabled:!0},{key:`delete`,label:`Delete`}]})))()}function ye(){let[e,t]=(0,E.useState)();return(0,D.jsxs)(c,{gap:4,wrap:!0,children:[(0,D.jsx)(d,{size:`small`,side:`bottom`,align:`start`,items:[{type:`group`,key:`file`,label:`File`,items:[{key:`new`,label:`New`},{key:`open`,label:`Open…`}]},{type:`separator`,key:`sep`},{key:`export`,label:`Export as`,children:[{key:`csv`,label:`CSV`},{key:`json`,label:`JSON`},{key:`pdf`,label:`PDF`,disabled:!0}]}],onSelect:e=>t(e.key),children:(0,D.jsx)(s,{color:`neutral`,variant:`outline`,children:`File`})}),(0,D.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var E,D;function O(){return(O=e((()=>{E=t(),o(),l(),u(),D=n()})))()}function be(){return(0,k.jsx)(c,{gap:4,wrap:!0,style:{padding:`120px 96px`},children:A.map(e=>(0,k.jsx)(d,{items:j,side:e,align:`start`,children:(0,k.jsx)(s,{size:`small`,color:`neutral`,variant:`outline`,children:e})},e))})}var k,A,j;function M(){return(M=e((()=>{o(),l(),u(),k=n(),A=[`bottom`,`top`,`left`,`right`],j=[{key:`first`,label:`First`},{key:`second`,label:`Second`},{key:`third`,label:`Third`}]})))()}function xe(){let[e,t]=(0,N.useState)();return(0,P.jsxs)(c,{gap:4,wrap:!0,children:[(0,P.jsx)(d,{align:`start`,items:F,onSelect:e=>t(e.key),children:(0,P.jsx)(s,{color:`neutral`,variant:`outline`,children:`File actions`})}),(0,P.jsx)(d,{dir:`rtl`,align:`start`,items:F,onSelect:e=>t(e.key),children:(0,P.jsx)(s,{color:`neutral`,variant:`outline`,children:`RTL`})}),(0,P.jsxs)(`span`,{role:`status`,children:[`Selected: `,e??`none`]})]})}var N,P,F;function I(){return(I=e((()=>{i(),N=t(),o(),l(),u(),P=n(),F=[{key:`rename`,label:`Rename`,shortcut:`F2`},{key:`move`,label:`Move to`,icon:(0,P.jsx)(re,{size:`1em`}),children:[{key:`inbox`,label:`Inbox`},{key:`archive`,label:`Archive`},{key:`projects`,label:`Projects`,children:[{key:`alpha`,label:`Alpha`},{key:`beta`,label:`Beta`}]}]},{key:`share`,label:`Share`,icon:(0,P.jsx)(te,{size:`1em`}),children:[{key:`email`,label:`Email`},{key:`link`,label:`Copy link`}]},{type:`separator`,key:`sep`},{key:`delete`,label:`Delete`}]})))()}function Se(){return(0,L.jsxs)(c,{gap:4,children:[(0,L.jsx)(d,{items:R,align:`start`,children:(0,L.jsx)(s,{color:`neutral`,variant:`outline`,children:`Account ▾`})}),(0,L.jsx)(d,{items:R,"aria-label":`More actions`,children:(0,L.jsx)(ae,{icon:(0,L.jsx)(ne,{size:`1em`}),label:`More actions`})})]})}var L,R;function z(){return(z=e((()=>{i(),o(),l(),ie(),u(),L=n(),R=[{key:`profile`,label:`Profile`},{key:`settings`,label:`Settings`},{type:`separator`,key:`sep`},{key:`sign-out`,label:`Sign out`}]})))()}var B;function V(){return(V=e((()=>{B=`import { CopyIcon, EditIcon, TrashIcon } from "minerva-design/icons";
import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";

export default function BasicDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        items={[
          {
            key: "edit",
            label: "Edit",
            icon: <EditIcon size="1em" />,
            shortcut: "⌘E",
          },
          {
            key: "copy",
            label: "Duplicate",
            icon: <CopyIcon size="1em" />,
            shortcut: "⌘D",
          },
          { type: "separator", key: "sep" },
          { key: "delete", label: "Delete", icon: <TrashIcon size="1em" /> },
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
`})))()}var Q;function Ce(){return(Ce=e((()=>{Q=`import { Button, HStack, Menu, type MenuSide } from "minerva-design";

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
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { FolderOpenIcon, ShareIcon } from "minerva-design/icons";
import { useState } from "react";
import { Button, HStack, Menu, type MenuEntry } from "minerva-design";

const items: MenuEntry[] = [
  { key: "rename", label: "Rename", shortcut: "F2" },
  {
    key: "move",
    label: "Move to",
    icon: <FolderOpenIcon size="1em" />,
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
    icon: <ShareIcon size="1em" />,
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
`})))()}var Ee;function De(){return(De=e((()=>{Ee=`import { MoreVerticalIcon } from "minerva-design/icons";
import { Button, HStack, IconButton, Menu } from "minerva-design";

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
        <IconButton
          icon={<MoreVerticalIcon size="1em" />}
          label="More actions"
        />
      </Menu>
    </HStack>
  );
}
`})))()}var Oe,ke,Ae;function $(){return($=e((()=>{p(),g(),y(),S(),T(),O(),M(),I(),z(),V(),U(),G(),q(),Y(),Z(),Ce(),Te(),De(),t(),ue(),fe(),Oe=n(),ke=le(Object.assign({"./demos/basic.tsx":pe,"./demos/checkbox-radio.tsx":he,"./demos/context-menu.tsx":ge,"./demos/controlled.tsx":_e,"./demos/disabled.tsx":ve,"./demos/groups.tsx":ye,"./demos/placement.tsx":be,"./demos/submenus.tsx":xe,"./demos/triggers.tsx":Se}),Object.assign({"./demos/basic.tsx":B,"./demos/checkbox-radio.tsx":H,"./demos/context-menu.tsx":W,"./demos/controlled.tsx":K,"./demos/disabled.tsx":J,"./demos/groups.tsx":X,"./demos/placement.tsx":Q,"./demos/submenus.tsx":we,"./demos/triggers.tsx":Ee})),Ae=()=>(0,Oe.jsx)(de,{id:`menu`,demos:ke})})))()}$();export{Ae as default};