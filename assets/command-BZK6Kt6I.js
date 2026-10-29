import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BhPa7d9i.js";import{n as a,t as o}from"./Command-B4p4gv-o.js";import{r as s,t as c}from"./Stack-CiM4m4jI.js";import{l,n as u,t as d,u as f}from"./DocPage-PfpTBKws.js";import{D as p,v as m}from"./lu-QnZt6OIj.js";function h(){let[e,t]=(0,g.useState)(!1),[n,r]=(0,g.useState)(`—`);return(0,_.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,_.jsx)(i,{onClick:()=>t(!0),children:`Search…`}),(0,_.jsxs)(`span`,{children:[`Selected: `,n]}),(0,_.jsx)(a,{open:e,onOpenChange:t,items:v,onSelect:e=>r(e.title)})]})}var g,_,v;function y(){return(y=e((()=>{g=t(),r(),o(),_=n(),v=[{id:`books`,title:`Books`,description:`/books`,group:`Content`},{id:`reviews`,title:`Reviews`,description:`/reviews`,group:`Content`},{id:`users`,title:`Users`,description:`/users`,group:`Admin`},{id:`seo`,title:`SEO settings`,description:`/seo`,keywords:`sitemap meta`}]})))()}function b(){let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(`—`);return(0,S.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,S.jsx)(i,{onClick:()=>t(!0),children:`Search “invoice”…`}),(0,S.jsxs)(`span`,{children:[`Selected: `,n]}),(0,S.jsx)(a,{open:e,onOpenChange:t,items:C,filter:T,onSelect:e=>r(e.title)})]})}var x,S,C,w,T;function E(){return(E=e((()=>{x=t(),r(),o(),S=n(),C=[{id:`billing`,title:`Billing history`,keywords:`invoice`},{id:`invoices`,title:`Invoices`,group:`Billing`},{id:`new-invoice`,title:`New invoice`,keywords:`create`},{id:`tax`,title:`Tax settings`,description:`Invoice numbering`}],w=(e,t)=>{let n=e.title.toLowerCase();return n.startsWith(t)?0:n.split(` `).some(e=>e.startsWith(t))?1:2},T=(e,t)=>{let n=t.toLowerCase();return e.filter(e=>[e.title,e.description,e.group,e.keywords].join(` `).toLowerCase().includes(n)).sort((e,t)=>w(e,n)-w(t,n))}})))()}function D(){let[e,t]=(0,O.useState)(null);return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(`p`,{children:[`Press `,(0,k.jsx)(`kbd`,{children:`Ctrl`}),` / `,(0,k.jsx)(`kbd`,{children:`⌘`}),` + `,(0,k.jsx)(`kbd`,{children:`K`}),` to open the palette.`]}),(0,k.jsx)(a,{items:A,shortcut:`mod+k`,shortcutLabel:`⌘K`,title:`Quick actions`,onSelect:e=>t(e.title)}),(0,k.jsx)(`p`,{"aria-live":`polite`,children:e?`Selected: ${e}`:`Nothing selected yet`})]})}var O,k,A;function j(){return(j=e((()=>{O=t(),o(),k=n(),A=[{id:`new`,title:`New document`},{id:`open`,title:`Open recent`,description:`Last 10 documents`},{id:`theme`,title:`Toggle theme`,keywords:`dark light`}]})))()}function M(){let[e,t]=(0,N.useState)(!1),[n,r]=(0,N.useState)(`No page selected`);return(0,P.jsxs)(c,{gap:3,style:{width:`100%`,maxWidth:420},children:[(0,P.jsx)(i,{color:`neutral`,variant:`outline`,startIcon:(0,P.jsx)(m,{}),endIcon:(0,P.jsx)(`kbd`,{children:`Ctrl ⇧ K`}),onClick:()=>t(!0),"aria-haspopup":`dialog`,"aria-expanded":e,style:{justifyContent:`space-between`},children:`Search documentation`}),(0,P.jsx)(`output`,{"aria-live":`polite`,children:n}),(0,P.jsx)(a,{open:e,onOpenChange:t,title:`Search documentation`,description:`Search titles, descriptions or keywords. Use the arrow keys and Enter to choose a page.`,placeholder:`Search components or guides…`,emptyText:`No matching page. Try another keyword.`,items:F,maxResults:8,shortcut:`ctrl+shift+k`,shortcutLabel:`Ctrl ⇧ K`,onSelect:e=>r(`Selected: ${e.title}`)})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),r(),o(),s(),p(),P=n(),F=[{id:`button`,title:`Button`,description:`Actions, loading and variants`,group:`Components`,keywords:`click action submit`},{id:`input`,title:`Input`,description:`Text fields and validation`,group:`Components`,keywords:`form text search`},{id:`installation`,title:`Installation`,description:`Install and configure Minerva`,group:`Getting started`,keywords:`npm pnpm css`}]})))()}var L;function R(){return(R=e((()=>{L=`import { useState } from "react";
import { Button, CommandDialog, type CommandItem } from "minerva-design";

const ITEMS: CommandItem[] = [
  { id: "books", title: "Books", description: "/books", group: "Content" },
  {
    id: "reviews",
    title: "Reviews",
    description: "/reviews",
    group: "Content",
  },
  { id: "users", title: "Users", description: "/users", group: "Admin" },
  {
    id: "seo",
    title: "SEO settings",
    description: "/seo",
    keywords: "sitemap meta",
  },
];

export default function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button onClick={() => setOpen(true)}>Search…</Button>
      <span>Selected: {last}</span>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={ITEMS}
        onSelect={(item) => setLast(item.title)}
      />
    </div>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { useState } from "react";
import { Button, CommandDialog, type CommandItem } from "minerva-design";

const ITEMS: CommandItem[] = [
  { id: "billing", title: "Billing history", keywords: "invoice" },
  { id: "invoices", title: "Invoices", group: "Billing" },
  { id: "new-invoice", title: "New invoice", keywords: "create" },
  { id: "tax", title: "Tax settings", description: "Invoice numbering" },
];

// Rank: title starts with the query > a title word does > anywhere else
const rank = (item: CommandItem, query: string) => {
  const title = item.title.toLowerCase();
  if (title.startsWith(query)) return 0;
  if (title.split(" ").some((word) => word.startsWith(query))) return 1;
  return 2;
};

const filter = (items: CommandItem[], raw: string) => {
  const query = raw.toLowerCase();
  return items
    .filter((item) =>
      [item.title, item.description, item.group, item.keywords]
        .join(" ")
        .toLowerCase()
        .includes(query),
    )
    .sort((a, b) => rank(a, query) - rank(b, query));
};

export default function CustomFilterDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button onClick={() => setOpen(true)}>Search “invoice”…</Button>
      <span>Selected: {last}</span>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={ITEMS}
        filter={filter}
        onSelect={(item) => setLast(item.title)}
      />
    </div>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
import { CommandDialog, type CommandItem } from "minerva-design";

const ITEMS: CommandItem[] = [
  { id: "new", title: "New document" },
  { id: "open", title: "Open recent", description: "Last 10 documents" },
  { id: "theme", title: "Toggle theme", keywords: "dark light" },
];

export default function ShortcutDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <>
      <p>
        Press <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> to open the palette.
      </p>
      <CommandDialog
        items={ITEMS}
        shortcut="mod+k"
        shortcutLabel="⌘K"
        title="Quick actions"
        onSelect={(item) => setLast(item.title)}
      />
      <p aria-live="polite">
        {last ? \`Selected: \${last}\` : "Nothing selected yet"}
      </p>
    </>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useState } from "react";
import { Button, CommandDialog, Stack, type CommandItem } from "minerva-design";
import { LuSearch } from "react-icons/lu";

const pages: CommandItem[] = [
  {
    id: "button",
    title: "Button",
    description: "Actions, loading and variants",
    group: "Components",
    keywords: "click action submit",
  },
  {
    id: "input",
    title: "Input",
    description: "Text fields and validation",
    group: "Components",
    keywords: "form text search",
  },
  {
    id: "installation",
    title: "Installation",
    description: "Install and configure Minerva",
    group: "Getting started",
    keywords: "npm pnpm css",
  },
];

export default function SiteSearchDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("No page selected");
  return (
    <Stack gap={3} style={{ width: "100%", maxWidth: 420 }}>
      <Button
        color="neutral"
        variant="outline"
        startIcon={<LuSearch />}
        endIcon={<kbd>Ctrl ⇧ K</kbd>}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{ justifyContent: "space-between" }}
      >
        Search documentation
      </Button>
      <output aria-live="polite">{selected}</output>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search titles, descriptions or keywords. Use the arrow keys and Enter to choose a page."
        placeholder="Search components or guides…"
        emptyText="No matching page. Try another keyword."
        items={pages}
        maxResults={8}
        shortcut="ctrl+shift+k"
        shortcutLabel="Ctrl ⇧ K"
        onSelect={(item) => setSelected(\`Selected: \${item.title}\`)}
      />
    </Stack>
  );
}
`})))()}var G,K,q;function J(){return(J=e((()=>{y(),E(),j(),I(),R(),B(),H(),W(),t(),u(),f(),G=n(),K=l(Object.assign({"./demos/basic.tsx":h,"./demos/custom-filter.tsx":b,"./demos/shortcut.tsx":D,"./demos/site-search.tsx":M}),Object.assign({"./demos/basic.tsx":L,"./demos/custom-filter.tsx":z,"./demos/shortcut.tsx":V,"./demos/site-search.tsx":U})),q=()=>(0,G.jsx)(d,{id:`command`,demos:K})})))()}J();export{q as default};