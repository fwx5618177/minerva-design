import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Nn as r,it as i}from"./angular-preview-Bvv51cL-.js";import{B as a,N as o,R as s,T as c,V as l,z as u}from"./ProgressIndicator-CXNTCbma.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{n as ee,t as f}from"./Pagination-CZaY1AQx.js";import{a as p,c as te,d as ne,f as re,l as m,o as h,s as g,u as _}from"./DemoBlock-CoZ9ZZJE.js";import{n as v,t as y}from"./table.module.scss-8bTghYEs.js";import{l as ie,n as ae,t as oe,u as se}from"./DocPage-BpQ6pUEt.js";function ce({pagination:e,error:t,onRetry:n,retryLabel:r,loading:i,...s}){let{t:c}=a(),l=!!t&&!i;return(0,b.jsx)(`div`,{className:y.dataTable,"aria-busy":i||void 0,...d(`data-table`,`root`,{loading:i,size:s.size??`medium`,variant:s.variant??`simple`}),children:l?(0,b.jsxs)(`div`,{className:y.error,role:`alert`,...d(`data-table`,`error`),children:[(0,b.jsx)(`div`,{className:y.errorTitle,children:t}),n&&(0,b.jsxs)(u,{color:`neutral`,variant:`outline`,size:`small`,onClick:n,children:[(0,b.jsx)(o,{"aria-hidden":`true`,className:y.retryIcon}),r??c(`table.retry`)]})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(p,{...s,loading:i}),e&&(0,b.jsx)(ee,{...e})]})})}var b;function x(){return(x=e((()=>{l(),s(),c(),f(),v(),m(),b=n()})))()}var S,C;function le(){return(le=e((()=>{r(),v(),S=n(),C=({primary:e,secondary:t,monospace:n=!1,maxWidth:r=360,className:a,style:o,ref:s,...c})=>{let l=n?`code`:`div`,u=t!=null;return(0,S.jsxs)(`div`,{ref:s,className:i(y.cellContent,a),style:{maxWidth:r,...o},...c,...d(`table-cell-content`,`root`),children:[(0,S.jsx)(l,{className:i(y.cellPrimary,n&&y.cellMono,u&&y.cellStrong),...d(`table-cell-content`,`primary`),children:e}),u&&(0,S.jsx)(`div`,{className:y.cellSecondary,...d(`table-cell-content`,`secondary`),children:t})]})}})))()}function ue(){return(0,de.jsx)(p,{"aria-label":`Books`,columns:pe,data:fe,rowKey:e=>e.id,hoverable:!0})}var de,fe,pe;function w(){return(w=e((()=>{m(),de=n(),fe=[{id:1,title:`Dune`,author:`Frank Herbert`,score:9.1},{id:2,title:`Solaris`,author:`Stanisław Lem`,score:8.7},{id:3,title:`Hyperion`,author:`Dan Simmons`,score:8.9}],pe=[{key:`title`,header:`Title`},{key:`author`,header:`Author`},{key:`score`,header:`Score`,align:`right`}]})))()}function me(){return(0,T.jsx)(p,{"aria-label":`Pages`,rowKey:e=>e.id,data:E,columns:[{key:`title`,header:`Page`,render:e=>(0,T.jsx)(C,{primary:e.title,secondary:e.description})},{key:`url`,header:`URL`,render:e=>(0,T.jsx)(C,{primary:e.url,monospace:!0,maxWidth:260})}]})}var T,E;function D(){return(D=e((()=>{m(),le(),T=n(),E=[{id:1,title:`Getting started`,description:`Install the package, load the stylesheet and render your first component.`,url:`https://example.com/docs/getting-started/installation?ref=sidebar`},{id:2,title:`Theming`,description:`Customize tokens, palettes and the dark theme.`,url:`https://example.com/docs/theming`}]})))()}function he(){return(0,O.jsxs)(re,{"aria-label":`Quarterly sales`,variant:`bordered`,size:`small`,children:[(0,O.jsxs)(te,{children:[(0,O.jsxs)(h,{children:[(0,O.jsx)(_,{scope:`col`,rowSpan:2,children:`Region`}),(0,O.jsx)(_,{scope:`colgroup`,colSpan:2,children:`2025`})]}),(0,O.jsxs)(h,{children:[(0,O.jsx)(_,{scope:`col`,children:`H1`}),(0,O.jsx)(_,{scope:`col`,children:`H2`})]})]}),(0,O.jsxs)(ne,{children:[(0,O.jsxs)(h,{children:[(0,O.jsx)(g,{children:`Europe`}),(0,O.jsx)(g,{children:`1.2M`}),(0,O.jsx)(g,{children:`1.5M`})]}),(0,O.jsxs)(h,{children:[(0,O.jsx)(g,{children:`Asia`}),(0,O.jsx)(g,{colSpan:2,children:`2.9M (full year)`})]})]})]})}var O;function k(){return(k=e((()=>{m(),O=n()})))()}function ge(){let[e,t]=(0,A.useState)(1),[n,r]=(0,A.useState)(5),[i,a]=(0,A.useState)(!1),o=M.slice((e-1)*n,e*n);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,j.jsx)(u,{color:`neutral`,variant:`outline`,size:`small`,onClick:()=>a(!0),children:`Simulate an error`}),(0,j.jsx)(ce,{"aria-label":`Users`,columns:N,data:o,rowKey:e=>e.id,error:i?`Could not load the users.`:void 0,onRetry:()=>a(!1),pagination:{current:e,pageSize:n,showSizeChanger:!0,pageSizeOptions:[5,10,20],showQuickJumper:!0,showTotal:!0,totalRender:(e,[t,n])=>`${t}–${n} of ${e} users`,total:M.length,onChange:(e,n)=>{t(Math.min(e,Math.max(1,Math.ceil(M.length/n)))),r(n)}}})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),s(),x(),j=n(),M=Array.from({length:42},(e,t)=>({id:t+1,name:`User ${t+1}`,email:`user${t+1}@example.com`})),N=[{key:`id`,header:`ID`,width:60},{key:`name`,header:`Name`},{key:`email`,header:`Email`}]})))()}function _e(){return(0,F.jsx)(p,{"aria-label":`Orders`,columns:L,data:I,rowKey:e=>e.id,scroll:{x:1100,y:240}})}var F,I,L;function R(){return(R=e((()=>{s(),m(),F=n(),I=Array.from({length:6},(e,t)=>({id:`#10${t+1}`,customer:[`Alice`,`Bob`,`Carol`][t%3],address:`221B Baker Street, Marylebone, London NW1 6XE, United Kingdom`,note:`Leave the parcel with the concierge if nobody answers the door`,total:`€${(t+1)*42}.00`})),L=[{key:`id`,header:`Order`,width:90,fixed:`left`},{key:`customer`,header:`Customer`,width:120,fixed:`left`},{key:`address`,header:`Address`,width:320},{key:`note`,header:`Note`,width:240,ellipsis:!0},{key:`total`,header:`Total`,width:100,align:`right`},{key:`actions`,header:`Actions`,width:110,fixed:`right`,render:()=>(0,F.jsx)(u,{size:`small`,color:`neutral`,variant:`outline`,children:`Details`})}]})))()}function ve(){let[e,t]=(0,z.useState)(1),[n,r]=(0,z.useState)(5),i=V.slice((e-1)*n,e*n);return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,B.jsx)(p,{"aria-label":`Paginated orders`,columns:H,data:i,rowKey:e=>e.id}),(0,B.jsx)(ee,{current:e,pageSize:n,total:V.length,showSizeChanger:!0,pageSizeOptions:[5,10,20],showQuickJumper:!0,showTotal:!0,totalRender:(e,[t,n])=>`${t}–${n} of ${e} orders`,onChange:(e,n)=>{t(Math.min(e,Math.max(1,Math.ceil(V.length/n)))),r(n)}})]})}var z,B,V,H;function U(){return(U=e((()=>{z=t(),f(),m(),B=n(),V=Array.from({length:42},(e,t)=>({id:t+1,order:`ORD-${String(t+1).padStart(3,`0`)}`,customer:[`Alex Morgan`,`Sam Rivera`,`Taylor Chen`,`Jordan Lee`][t%4],amount:`$${(125+t*17.5).toFixed(2)}`})),H=[{key:`order`,header:`Order`,width:140},{key:`customer`,header:`Customer`},{key:`amount`,header:`Amount`,align:`right`}]})))()}function ye(){let[e,t]=(0,W.useState)([2]);return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,G.jsx)(p,{"aria-label":`Members`,rowKey:e=>e.id,data:K,hoverable:!0,rowSelection:{selectedRowKeys:e,onChange:e=>t(e),getCheckboxProps:e=>({disabled:e.role===`Owner`}),getRowLabel:e=>e.name},columns:[{key:`name`,header:`Name`,sortable:!0},{key:`role`,header:`Role`}]}),(0,G.jsx)(`small`,{children:`${e.length} selected`})]})}var W,G,K;function q(){return(q=e((()=>{W=t(),m(),G=n(),K=[{id:1,name:`Ada Lovelace`,role:`Owner`},{id:2,name:`Alan Turing`,role:`Admin`},{id:3,name:`Grace Hopper`,role:`Editor`},{id:4,name:`Linus Torvalds`,role:`Viewer`}]})))()}function be(){let[e,t]=(0,xe.useState)({key:`latency`,order:`ascend`});return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[(0,J.jsx)(p,{"aria-label":`Services`,rowKey:e=>e.id,data:Se,sortState:e,onSortChange:t,columns:[{key:`name`,header:`Service`,sortable:!0},{key:`region`,header:`Region`,sortable:!0},{key:`latency`,header:`Latency`,align:`right`,sortable:(e,t)=>e.latency-t.latency,render:e=>`${e.latency} ms`}]}),(0,J.jsx)(`small`,{children:e?.order?`Sorted by ${e.key} (${e.order})`:`Unsorted`})]})}var xe,J,Se;function Ce(){return(Ce=e((()=>{xe=t(),m(),J=n(),Se=[{id:1,name:`auth-api`,region:`eu-west`,latency:42},{id:2,name:`billing`,region:`us-east`,latency:118},{id:3,name:`search`,region:`ap-south`,latency:73},{id:4,name:`gateway`,region:`eu-west`,latency:9}]})))()}function we(){let[e,t]=(0,Te.useState)(!0);return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,Y.jsx)(u,{color:`neutral`,variant:`outline`,size:`small`,onClick:()=>t(e=>!e),children:e?`Show empty state`:`Show loading state`}),(0,Y.jsx)(p,{"aria-label":`Jobs`,columns:Ee,data:[],loading:e,loadingRows:3,emptyText:`No jobs yet`})]})}var Te,Y,Ee;function De(){return(De=e((()=>{Te=t(),s(),m(),Y=n(),Ee=[{key:`name`,header:`Name`},{key:`status`,header:`Status`}]})))()}function Oe(){return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,X.jsx)(p,{"aria-label":`Striped`,columns:Q,data:Z,variant:`striped`,size:`small`}),(0,X.jsx)(p,{"aria-label":`Bordered`,columns:Q,data:Z,variant:`bordered`}),(0,X.jsx)(p,{"aria-label":`Large`,columns:Q,data:Z,size:`large`,hoverable:!0})]})}var X,Z,Q;function ke(){return(ke=e((()=>{m(),X=n(),Z=[{id:1,name:`Alice`,role:`Admin`},{id:2,name:`Bob`,role:`Editor`},{id:3,name:`Carol`,role:`Viewer`}],Q=[{key:`name`,header:`Name`},{key:`role`,header:`Role`}]})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { Table, type TableColumn } from "minerva-design";

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
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { Table, TableCellContent } from "minerva-design";

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
`})))()}var Pe;function Fe(){return(Fe=e((()=>{Pe=`import {
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
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useState } from "react";
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
  const [pageSize, setPageSize] = useState(5);
  const [failed, setFailed] = useState(false);
  // Rows are paginated by the data owner (here: a slice of a local array).
  const rows = all.slice((page - 1) * pageSize, page * pageSize);
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
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
          showQuickJumper: true,
          showTotal: true,
          totalRender: (total, [from, to]) => \`\${from}–\${to} of \${total} users\`,
          total: all.length,
          onChange: (nextPage, nextSize) => {
            setPage(
              Math.min(nextPage, Math.max(1, Math.ceil(all.length / nextSize))),
            );
            setPageSize(nextSize);
          },
        }}
      />
    </div>
  );
}
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { Button, Table, type TableColumn } from "minerva-design";

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
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useState } from "react";
import { Pagination, Table } from "minerva-design";

const orders = Array.from({ length: 42 }, (_, index) => ({
  id: index + 1,
  order: \`ORD-\${String(index + 1).padStart(3, "0")}\`,
  customer: ["Alex Morgan", "Sam Rivera", "Taylor Chen", "Jordan Lee"][
    index % 4
  ],
  amount: \`$\${(125 + index * 17.5).toFixed(2)}\`,
}));
const columns = [
  { key: "order", header: "Order", width: 140 },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount", align: "right" as const },
];

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const rows = orders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Table
        aria-label="Paginated orders"
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        total={orders.length}
        showSizeChanger
        pageSizeOptions={[5, 10, 20]}
        showQuickJumper
        showTotal
        totalRender={(total, [from, to]) => \`\${from}–\${to} of \${total} orders\`}
        onChange={(nextPage, nextSize) => {
          setPage(
            Math.min(
              nextPage,
              Math.max(1, Math.ceil(orders.length / nextSize)),
            ),
          );
          setPageSize(nextSize);
        }}
      />
    </div>
  );
}
`})))()}var $;function He(){return(He=e((()=>{$=`import { useState } from "react";
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
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useState } from "react";
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
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useState } from "react";
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
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { Table } from "minerva-design";

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
`})))()}var Ye,Xe,Ze;function Qe(){return(Qe=e((()=>{w(),D(),k(),P(),R(),U(),q(),Ce(),De(),ke(),je(),Ne(),Fe(),Le(),ze(),Ve(),He(),We(),Ke(),Je(),t(),ae(),se(),Ye=n(),Xe=ie(Object.assign({"./demos/basic.tsx":ue,"./demos/cell-content.tsx":me,"./demos/compound.tsx":he,"./demos/data-table.tsx":ge,"./demos/fixed-columns.tsx":_e,"./demos/pagination.tsx":ve,"./demos/selection.tsx":ye,"./demos/sorting.tsx":be,"./demos/states.tsx":we,"./demos/variants.tsx":Oe}),Object.assign({"./demos/basic.tsx":Ae,"./demos/cell-content.tsx":Me,"./demos/compound.tsx":Pe,"./demos/data-table.tsx":Ie,"./demos/fixed-columns.tsx":Re,"./demos/pagination.tsx":Be,"./demos/selection.tsx":$,"./demos/sorting.tsx":Ue,"./demos/states.tsx":Ge,"./demos/variants.tsx":qe})),Ze=()=>(0,Ye.jsx)(oe,{id:`table`,demos:Xe})})))()}Qe();export{Ze as default};