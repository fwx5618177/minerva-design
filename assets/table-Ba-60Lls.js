import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{a as r,c as i,d as a,f as o,l as s,o as c,s as l,u}from"./DemoBlock-BJ0_y9F8.js";import{It as ee,ut as d}from"./angular-preview-l4x8c_2r.js";import{B as f,H as te,N as ne,R as p,T as re,U as ie,z as m}from"./ProgressIndicator-BhPa7d9i.js";import{n as ae,t as oe}from"./Pagination-YkAwIz4H.js";import{n as h,t as g}from"./table.module.scss-DnPFitxi.js";import{l as se,n as ce,t as le,u as ue}from"./DocPage-B2iACtLP.js";function de({pagination:e,error:t,onRetry:n,retryLabel:r,loading:i,...a}){let{t:o}=te(),s=!!t&&!i;return(0,_.jsx)(`div`,{className:g.dataTable,"aria-busy":i||void 0,...f(`data-table`,`root`,{loading:i,size:a.size??`medium`,variant:a.variant??`simple`}),children:s?(0,_.jsxs)(`div`,{className:g.error,role:`alert`,...f(`data-table`,`error`),children:[(0,_.jsx)(`div`,{className:g.errorTitle,children:t}),n&&(0,_.jsxs)(m,{color:`neutral`,variant:`outline`,size:`small`,onClick:n,children:[(0,_.jsx)(ne,{"aria-hidden":`true`,className:g.retryIcon}),r??o(`table.retry`)]})]}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(c,{...a,loading:i}),e&&(0,_.jsx)(ae,{...e})]})})}var _;function fe(){return(fe=e((()=>{ie(),p(),re(),oe(),h(),i(),_=n()})))()}var v,y;function b(){return(b=e((()=>{ee(),h(),v=n(),y=({primary:e,secondary:t,monospace:n=!1,maxWidth:r=360,className:i,style:a,ref:o,...s})=>{let c=n?`code`:`div`,l=t!=null;return(0,v.jsxs)(`div`,{ref:o,className:d(g.cellContent,i),style:{maxWidth:r,...a},...s,...f(`table-cell-content`,`root`),children:[(0,v.jsx)(c,{className:d(g.cellPrimary,n&&g.cellMono,l&&g.cellStrong),...f(`table-cell-content`,`primary`),children:e}),l&&(0,v.jsx)(`div`,{className:g.cellSecondary,...f(`table-cell-content`,`secondary`),children:t})]})}})))()}function pe(){return(0,x.jsx)(c,{"aria-label":`Books`,columns:C,data:S,rowKey:e=>e.id,hoverable:!0})}var x,S,C;function w(){return(w=e((()=>{i(),x=n(),S=[{id:1,title:`Dune`,author:`Frank Herbert`,score:9.1},{id:2,title:`Solaris`,author:`Stanisław Lem`,score:8.7},{id:3,title:`Hyperion`,author:`Dan Simmons`,score:8.9}],C=[{key:`title`,header:`Title`},{key:`author`,header:`Author`},{key:`score`,header:`Score`,align:`right`}]})))()}function me(){return(0,T.jsx)(c,{"aria-label":`Pages`,rowKey:e=>e.id,data:E,columns:[{key:`title`,header:`Page`,render:e=>(0,T.jsx)(y,{primary:e.title,secondary:e.description})},{key:`url`,header:`URL`,render:e=>(0,T.jsx)(y,{primary:e.url,monospace:!0,maxWidth:260})}]})}var T,E;function D(){return(D=e((()=>{i(),b(),T=n(),E=[{id:1,title:`Getting started`,description:`Install the package, load the stylesheet and render your first component.`,url:`https://example.com/docs/getting-started/installation?ref=sidebar`},{id:2,title:`Theming`,description:`Customize tokens, palettes and the dark theme.`,url:`https://example.com/docs/theming`}]})))()}function he(){return(0,O.jsxs)(s,{"aria-label":`Quarterly sales`,variant:`bordered`,size:`small`,children:[(0,O.jsxs)(o,{children:[(0,O.jsxs)(a,{children:[(0,O.jsx)(r,{scope:`col`,rowSpan:2,children:`Region`}),(0,O.jsx)(r,{scope:`colgroup`,colSpan:2,children:`2025`})]}),(0,O.jsxs)(a,{children:[(0,O.jsx)(r,{scope:`col`,children:`H1`}),(0,O.jsx)(r,{scope:`col`,children:`H2`})]})]}),(0,O.jsxs)(l,{children:[(0,O.jsxs)(a,{children:[(0,O.jsx)(u,{children:`Europe`}),(0,O.jsx)(u,{children:`1.2M`}),(0,O.jsx)(u,{children:`1.5M`})]}),(0,O.jsxs)(a,{children:[(0,O.jsx)(u,{children:`Asia`}),(0,O.jsx)(u,{colSpan:2,children:`2.9M (full year)`})]})]})]})}var O;function k(){return(k=e((()=>{i(),O=n()})))()}function ge(){let[e,t]=(0,A.useState)(1),[n,r]=(0,A.useState)(!1),i=M.slice((e-1)*5,e*5);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,j.jsx)(m,{color:`neutral`,variant:`outline`,size:`small`,onClick:()=>r(!0),children:`Simulate an error`}),(0,j.jsx)(de,{"aria-label":`Users`,columns:N,data:i,rowKey:e=>e.id,error:n?`Could not load the users.`:void 0,onRetry:()=>r(!1),pagination:{current:e,pageSize:5,total:M.length,onChange:t}})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),p(),fe(),j=n(),M=Array.from({length:42},(e,t)=>({id:t+1,name:`User ${t+1}`,email:`user${t+1}@example.com`})),N=[{key:`id`,header:`ID`,width:60},{key:`name`,header:`Name`},{key:`email`,header:`Email`}]})))()}function _e(){return(0,F.jsx)(c,{"aria-label":`Orders`,columns:L,data:I,rowKey:e=>e.id,scroll:{x:1100,y:240}})}var F,I,L;function R(){return(R=e((()=>{p(),i(),F=n(),I=Array.from({length:6},(e,t)=>({id:`#10${t+1}`,customer:[`Alice`,`Bob`,`Carol`][t%3],address:`221B Baker Street, Marylebone, London NW1 6XE, United Kingdom`,note:`Leave the parcel with the concierge if nobody answers the door`,total:`€${(t+1)*42}.00`})),L=[{key:`id`,header:`Order`,width:90,fixed:`left`},{key:`customer`,header:`Customer`,width:120,fixed:`left`},{key:`address`,header:`Address`,width:320},{key:`note`,header:`Note`,width:240,ellipsis:!0},{key:`total`,header:`Total`,width:100,align:`right`},{key:`actions`,header:`Actions`,width:110,fixed:`right`,render:()=>(0,F.jsx)(m,{size:`small`,color:`neutral`,variant:`outline`,children:`Details`})}]})))()}function ve(){let[e,t]=(0,z.useState)([2]);return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,B.jsx)(c,{"aria-label":`Members`,rowKey:e=>e.id,data:V,hoverable:!0,rowSelection:{selectedRowKeys:e,onChange:e=>t(e),getCheckboxProps:e=>({disabled:e.role===`Owner`}),getRowLabel:e=>e.name},columns:[{key:`name`,header:`Name`,sortable:!0},{key:`role`,header:`Role`}]}),(0,B.jsx)(`small`,{children:`${e.length} selected`})]})}var z,B,V;function H(){return(H=e((()=>{z=t(),i(),B=n(),V=[{id:1,name:`Ada Lovelace`,role:`Owner`},{id:2,name:`Alan Turing`,role:`Admin`},{id:3,name:`Grace Hopper`,role:`Editor`},{id:4,name:`Linus Torvalds`,role:`Viewer`}]})))()}function ye(){let[e,t]=(0,be.useState)({key:`latency`,order:`ascend`});return(0,U.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,U.jsx)(c,{"aria-label":`Services`,rowKey:e=>e.id,data:W,sortState:e,onSortChange:t,columns:[{key:`name`,header:`Service`,sortable:!0},{key:`region`,header:`Region`,sortable:!0},{key:`latency`,header:`Latency`,align:`right`,sortable:(e,t)=>e.latency-t.latency,render:e=>`${e.latency} ms`}]}),(0,U.jsx)(`small`,{children:e?.order?`Sorted by ${e.key} (${e.order})`:`Unsorted`})]})}var be,U,W;function G(){return(G=e((()=>{be=t(),i(),U=n(),W=[{id:1,name:`auth-api`,region:`eu-west`,latency:42},{id:2,name:`billing`,region:`us-east`,latency:118},{id:3,name:`search`,region:`ap-south`,latency:73},{id:4,name:`gateway`,region:`eu-west`,latency:9}]})))()}function xe(){let[e,t]=(0,K.useState)(!0);return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,q.jsx)(m,{color:`neutral`,variant:`outline`,size:`small`,onClick:()=>t(e=>!e),children:e?`Show empty state`:`Show loading state`}),(0,q.jsx)(c,{"aria-label":`Jobs`,columns:J,data:[],loading:e,loadingRows:3,emptyText:`No jobs yet`})]})}var K,q,J;function Se(){return(Se=e((()=>{K=t(),p(),i(),q=n(),J=[{key:`name`,header:`Name`},{key:`status`,header:`Status`}]})))()}function Ce(){return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,Y.jsx)(c,{"aria-label":`Striped`,columns:Z,data:X,variant:`striped`,size:`small`}),(0,Y.jsx)(c,{"aria-label":`Bordered`,columns:Z,data:X,variant:`bordered`}),(0,Y.jsx)(c,{"aria-label":`Large`,columns:Z,data:X,size:`large`,hoverable:!0})]})}var Y,X,Z;function we(){return(we=e((()=>{i(),Y=n(),X=[{id:1,name:`Alice`,role:`Admin`},{id:2,name:`Bob`,role:`Editor`},{id:3,name:`Carol`,role:`Viewer`}],Z=[{key:`name`,header:`Name`},{key:`role`,header:`Role`}]})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`import { Table, type TableColumn } from "minerva-design";

interface Book {
  id: number;
  title: string;
  author: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", author: "Frank Herbert", score: 9.1 },
  { id: 2, title: "Solaris", author: "Stanisław Lem", score: 8.7 },
  { id: 3, title: "Hyperion", author: "Dan Simmons", score: 8.9 },
];

const columns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "score", header: "Score", align: "right" },
];

export default function BasicDemo() {
  return (
    <Table
      aria-label="Books"
      columns={columns}
      data={books}
      rowKey={(book) => book.id}
      hoverable
    />
  );
}
`})))()}var De;function Oe(){return(Oe=e((()=>{De=`import { Table, TableCellContent } from "minerva-design";

const pages = [
  {
    id: 1,
    title: "Getting started",
    description:
      "Install the package, load the stylesheet and render your first component.",
    url: "https://example.com/docs/getting-started/installation?ref=sidebar",
  },
  {
    id: 2,
    title: "Theming",
    description: "Customize tokens, palettes and the dark theme.",
    url: "https://example.com/docs/theming",
  },
];

export default function CellContentDemo() {
  return (
    <Table
      aria-label="Pages"
      rowKey={(row) => row.id}
      data={pages}
      columns={[
        {
          key: "title",
          header: "Page",
          render: (row) => (
            <TableCellContent primary={row.title} secondary={row.description} />
          ),
        },
        {
          key: "url",
          header: "URL",
          render: (row) => (
            <TableCellContent primary={row.url} monospace maxWidth={260} />
          ),
        },
      ]}
    />
  );
}
`})))()}var ke;function Ae(){return(Ae=e((()=>{ke=`import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "minerva-design";

export default function CompoundDemo() {
  return (
    <TableRoot aria-label="Quarterly sales" variant="bordered" size="small">
      <TableHead>
        <TableRow>
          <TableHeader scope="col" rowSpan={2}>
            Region
          </TableHeader>
          <TableHeader scope="colgroup" colSpan={2}>
            2025
          </TableHeader>
        </TableRow>
        <TableRow>
          <TableHeader scope="col">H1</TableHeader>
          <TableHeader scope="col">H2</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Europe</TableCell>
          <TableCell>1.2M</TableCell>
          <TableCell>1.5M</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Asia</TableCell>
          <TableCell colSpan={2}>2.9M (full year)</TableCell>
        </TableRow>
      </TableBody>
    </TableRoot>
  );
}
`})))()}var je;function Me(){return(Me=e((()=>{je=`import { useState } from "react";
import { Button, DataTable } from "minerva-design";

const all = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: \`User \${i + 1}\`,
  email: \`user\${i + 1}@example.com\`,
}));

const columns = [
  { key: "id", header: "ID", width: 60 },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
];

export default function DataTableDemo() {
  const [page, setPage] = useState(1);
  const [failed, setFailed] = useState(false);
  // Rows are paginated by the data owner (here: a slice of a local array).
  const rows = all.slice((page - 1) * 5, page * 5);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() => setFailed(true)}
      >
        Simulate an error
      </Button>
      <DataTable
        aria-label="Users"
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
        error={failed ? "Could not load the users." : undefined}
        onRetry={() => setFailed(false)}
        pagination={{
          current: page,
          pageSize: 5,
          total: all.length,
          onChange: setPage,
        }}
      />
    </div>
  );
}
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { Button, Table, type TableColumn } from "minerva-design";

interface Order {
  id: string;
  customer: string;
  address: string;
  note: string;
  total: string;
}

const orders: Order[] = Array.from({ length: 6 }, (_, i) => ({
  id: \`#10\${i + 1}\`,
  customer: ["Alice", "Bob", "Carol"][i % 3],
  address: "221B Baker Street, Marylebone, London NW1 6XE, United Kingdom",
  note: "Leave the parcel with the concierge if nobody answers the door",
  total: \`€\${(i + 1) * 42}.00\`,
}));

const columns: TableColumn<Order>[] = [
  { key: "id", header: "Order", width: 90, fixed: "left" },
  { key: "customer", header: "Customer", width: 120, fixed: "left" },
  { key: "address", header: "Address", width: 320 },
  { key: "note", header: "Note", width: 240, ellipsis: true },
  { key: "total", header: "Total", width: 100, align: "right" },
  {
    key: "actions",
    header: "Actions",
    width: 110,
    fixed: "right",
    render: () => (
      <Button size="small" color="neutral" variant="outline">
        Details
      </Button>
    ),
  },
];

export default function FixedColumnsDemo() {
  return (
    <Table
      aria-label="Orders"
      columns={columns}
      data={orders}
      rowKey={(order) => order.id}
      scroll={{ x: 1100, y: 240 }}
    />
  );
}
`})))()}var Fe;function Q(){return(Q=e((()=>{Fe=`import { useState } from "react";
import { Table, type TableRowKey } from "minerva-design";

interface Member {
  id: number;
  name: string;
  role: string;
}

const members: Member[] = [
  { id: 1, name: "Ada Lovelace", role: "Owner" },
  { id: 2, name: "Alan Turing", role: "Admin" },
  { id: 3, name: "Grace Hopper", role: "Editor" },
  { id: 4, name: "Linus Torvalds", role: "Viewer" },
];

export default function SelectionDemo() {
  const [selected, setSelected] = useState<TableRowKey[]>([2]);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Table
        aria-label="Members"
        rowKey={(row) => row.id}
        data={members}
        hoverable
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelected(keys),
          // The owner cannot be selected (skipped by "select all")
          getCheckboxProps: (row) => ({ disabled: row.role === "Owner" }),
          getRowLabel: (row) => row.name,
        }}
        columns={[
          { key: "name", header: "Name", sortable: true },
          { key: "role", header: "Role" },
        ]}
      />
      <small>{\`\${selected.length} selected\`}</small>
    </div>
  );
}
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useState } from "react";
import { Table, type TableSortState } from "minerva-design";

interface Service {
  id: number;
  name: string;
  region: string;
  latency: number;
}

const services: Service[] = [
  { id: 1, name: "auth-api", region: "eu-west", latency: 42 },
  { id: 2, name: "billing", region: "us-east", latency: 118 },
  { id: 3, name: "search", region: "ap-south", latency: 73 },
  { id: 4, name: "gateway", region: "eu-west", latency: 9 },
];

export default function SortingDemo() {
  // Controlled: the sort state lives here (a server could sort with manualSort).
  const [sort, setSort] = useState<TableSortState | null>({
    key: "latency",
    order: "ascend",
  });
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Table
        aria-label="Services"
        rowKey={(row) => row.id}
        data={services}
        sortState={sort}
        onSortChange={setSort}
        columns={[
          { key: "name", header: "Service", sortable: true },
          { key: "region", header: "Region", sortable: true },
          {
            key: "latency",
            header: "Latency",
            align: "right",
            // Custom compare: ascending order of two rows
            sortable: (a, b) => a.latency - b.latency,
            render: (row) => \`\${row.latency} ms\`,
          },
        ]}
      />
      <small>
        {sort?.order ? \`Sorted by \${sort.key} (\${sort.order})\` : "Unsorted"}
      </small>
    </div>
  );
}
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useState } from "react";
import { Button, Table } from "minerva-design";

const columns = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];

export default function StatesDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() => setLoading((v) => !v)}
      >
        {loading ? "Show empty state" : "Show loading state"}
      </Button>
      <Table
        aria-label="Jobs"
        columns={columns}
        data={[]}
        loading={loading}
        loadingRows={3}
        emptyText="No jobs yet"
      />
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { Table } from "minerva-design";

const rows = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" },
  { id: 3, name: "Carol", role: "Viewer" },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Table
        aria-label="Striped"
        columns={columns}
        data={rows}
        variant="striped"
        size="small"
      />
      <Table
        aria-label="Bordered"
        columns={columns}
        data={rows}
        variant="bordered"
      />
      <Table
        aria-label="Large"
        columns={columns}
        data={rows}
        size="large"
        hoverable
      />
    </div>
  );
}
`})))()}var He,Ue,We;function $(){return($=e((()=>{w(),D(),k(),P(),R(),H(),G(),Se(),we(),Ee(),Oe(),Ae(),Me(),Pe(),Q(),Le(),ze(),Ve(),t(),ce(),ue(),He=n(),Ue=se(Object.assign({"./demos/basic.tsx":pe,"./demos/cell-content.tsx":me,"./demos/compound.tsx":he,"./demos/data-table.tsx":ge,"./demos/fixed-columns.tsx":_e,"./demos/selection.tsx":ve,"./demos/sorting.tsx":ye,"./demos/states.tsx":xe,"./demos/variants.tsx":Ce}),Object.assign({"./demos/basic.tsx":Te,"./demos/cell-content.tsx":De,"./demos/compound.tsx":ke,"./demos/data-table.tsx":je,"./demos/fixed-columns.tsx":Ne,"./demos/selection.tsx":Fe,"./demos/sorting.tsx":Ie,"./demos/states.tsx":Re,"./demos/variants.tsx":Be})),We=()=>(0,He.jsx)(le,{id:`table`,demos:Ue})})))()}$();export{We as default};