import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{a,c as o,d as s,f as ee,i as te,l as ne,o as c,r as l,s as re,u}from"./DemoBlock-BJ0_y9F8.js";import{n as ie,t as ae}from"./useTranslation-BzoVi22c.js";import{R as d,z as f}from"./ProgressIndicator-BhPa7d9i.js";import{a as p,i as oe,n as se,o as ce,r as le,s as m,t as h}from"./CodeBlock-BXt_Axjy.js";import{n as ue,t as de}from"./Pagination-YkAwIz4H.js";import{a as fe,c as pe,o as me,r as he,s as ge,t as _e}from"./Modal-CguYJU5k.js";import{i as g,n as _,r as v}from"./Stack-CiM4m4jI.js";import{n as ve,t as ye}from"./Menu-BUYXOLHm.js";import{a as be,i as xe,n as Se,r as Ce}from"./Toast-BcYcTmSx.js";import{i as we,o as Te,t as Ee}from"./Select-BfUcg0dC.js";import{a as y,c as De,i as b,l as Oe,n as ke,o as Ae,r as x,s as je,t as Me,u as Ne}from"./DocPage-B2iACtLP.js";import{r as S}from"./minerva-web-components-C-nc289P.js";function Pe(){return(0,C.jsxs)(g,{gap:16,wrap:!0,className:`accent-menu-demo`,children:[(0,C.jsx)(`style`,{children:w}),(0,C.jsx)(ye,{className:`accent-menu`,items:[{key:`edit`,label:`Edit`,shortcut:`⌘E`},{key:`copy`,label:`Duplicate`,shortcut:`⌘D`},{type:`checkbox`,key:`pin`,label:`Pinned`,defaultChecked:!0},{key:`delete`,label:`Delete`,disabled:!0}],children:(0,C.jsx)(f,{color:`neutral`,variant:`outline`,children:`React menu`})}),(0,C.jsxs)(`minerva-menu`,{class:`accent-menu`,children:[(0,C.jsx)(`minerva-button`,{slot:`trigger`,color:`neutral`,variant:`outline`,children:`Web Component menu`}),(0,C.jsx)(`minerva-menu-item`,{value:`edit`,shortcut:`⌘E`,children:`Edit`}),(0,C.jsx)(`minerva-menu-item`,{value:`copy`,shortcut:`⌘D`,children:`Duplicate`}),(0,C.jsx)(`minerva-menu-checkbox-item`,{value:`pin`,checked:!0,children:`Pinned`}),(0,C.jsx)(`minerva-menu-item`,{value:`delete`,disabled:!0,children:`Delete`})]})]})}var C,w;function T(){return(T=e((()=>{d(),v(),ve(),S(),C=n(),w=`
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 3px 0 0 var(--primary-color);
}
/* checked checkbox / radio items, disabled items */
.accent-menu [data-minerva="menu"][data-part="item"][data-state="checked"],
minerva-menu.accent-menu::part(item item--checked) {
  font-weight: 600;
}
.accent-menu [data-minerva="menu"][data-part="item"][data-disabled],
minerva-menu.accent-menu::part(item item--disabled) {
  text-decoration: line-through;
}
`})))()}function Fe(){return(0,E.jsxs)(_,{className:`ring-pages`,gap:16,children:[(0,E.jsx)(`style`,{children:D}),(0,E.jsx)(ue,{defaultCurrent:1,total:50,"aria-label":`React pages`}),(0,E.jsx)(`minerva-pagination`,{current:1,total:50,"aria-label":`Web Component pages`})]})}var E,D;function O(){return(O=e((()=>{de(),v(),S(),E=n(),D=`
.ring-pages [data-minerva="pagination"][data-part="item"],
.ring-pages minerva-pagination::part(item) {
  border-radius: 999px;
}
/* the current page: aria-current="page" mirrored as a public hook */
.ring-pages [data-minerva="pagination"][data-part="item"][data-current],
.ring-pages minerva-pagination::part(item item--current) {
  background: transparent;
  color: var(--primary-color);
  box-shadow: inset 0 0 0 2px var(--primary-color);
  font-weight: 700;
}
.ring-pages [data-minerva="pagination"][data-part="item"][data-disabled],
.ring-pages minerva-pagination::part(item item--disabled) {
  opacity: 0.3;
}
`})))()}function Ie(){return(0,k.jsxs)(g,{gap:16,wrap:!0,children:[(0,k.jsx)(`style`,{children:j}),(0,k.jsx)(`div`,{style:{width:200},children:(0,k.jsx)(Te,{"aria-label":`Language (React)`,defaultValue:`zh`,contentClassName:`bold-options`,children:A.map(e=>(0,k.jsx)(Ee,{value:e.value,disabled:e.disabled,children:e.label},e.value))})}),(0,k.jsx)(`div`,{style:{width:200},children:(0,k.jsx)(`minerva-select`,{class:`bold-options`,"aria-label":`Language (options property)`,value:`zh`,options:A})}),(0,k.jsx)(`div`,{style:{width:200},children:(0,k.jsx)(`minerva-select`,{"aria-label":`Language (minerva-option)`,value:`zh`,children:A.map(e=>(0,k.jsx)(`minerva-option`,{class:`bold-option`,value:e.value,disabled:e.disabled||void 0,children:e.label},e.value))})})]})}var k,A,j;function M(){return(M=e((()=>{v(),we(),S(),k=n(),A=[{value:`en`,label:`English`},{value:`zh`,label:`Chinese`},{value:`fr`,label:`French`},{value:`ja`,label:`Japanese`,disabled:!0}],j=`
/* React options are SelectItem components: data-minerva="option" */
.bold-options [data-minerva="option"][data-selected],
minerva-select.bold-options::part(item item--selected),
minerva-option.bold-option:state(selected)::part(root) {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
}
.bold-options [data-minerva="option"][data-highlighted]:not([data-selected]),
minerva-select.bold-options::part(item item--highlighted),
minerva-option.bold-option:state(highlighted)::part(root) {
  outline: 2px dashed var(--primary-color);
  outline-offset: -2px;
}
`})))()}function Le(){return(0,N.jsxs)(_,{className:`sorted-headers`,gap:24,children:[(0,N.jsx)(`style`,{children:I}),(0,N.jsx)(c,{"aria-label":`Services (React)`,columns:F,data:P,rowKey:e=>e.id,defaultSortState:{key:`latency`,order:`ascend`},rowSelection:{defaultSelectedRowKeys:[2]}}),(0,N.jsx)(`minerva-data-table`,{"aria-label":`Services (Web Component)`,"row-key":`id`,columns:F,rows:P,sortState:{key:`latency`,order:`ascend`},selectable:!0,selectedRowKeys:[2]})]})}var N,P,F,I;function L(){return(L=e((()=>{o(),v(),S(),N=n(),P=[{id:1,name:`auth-api`,latency:42},{id:2,name:`billing`,latency:118},{id:3,name:`search`,latency:73}],F=[{key:`name`,header:`Service`,sortable:!0},{key:`latency`,header:`Latency`,align:`right`,sortable:(e,t)=>e.latency-t.latency}],I=`
/* sorted column header: data-sort / header-cell--sort-<direction> */
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"],
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="descending"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-ascending),
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-descending) {
  color: var(--primary-color);
  box-shadow: inset 0 -3px 0 var(--primary-color);
}
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="none"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-none) {
  color: var(--text-secondary-color);
}
/* selected rows */
.sorted-headers [data-minerva="data-table"][data-part="row"][data-selected] [data-part="cell"],
.sorted-headers minerva-data-table::part(row row--selected) {
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}
`})))()}function Re(){let e=(0,R.useRef)(null);return(0,z.jsxs)(g,{gap:8,wrap:!0,children:[(0,z.jsx)(`style`,{children:B}),(0,z.jsx)(Se,{position:`bottom-right`}),(0,z.jsx)(f,{color:`success`,onClick:()=>xe.success(`Saved (React)`),children:`React success toast`}),(0,z.jsx)(f,{color:`success`,variant:`outline`,onClick:()=>e.current?.toast.success(`Saved (Web Component)`),children:`Web Component success toast`}),(0,z.jsx)(`minerva-toast-region`,{ref:e,class:`success-toasts`,position:`bottom-left`})]})}var R,z,B;function V(){return(V=e((()=>{R=t(),d(),v(),Ce(),be(),S(),z=n(),B=`
/* React toasts are portalled to the toast region: the compound selector
   matches them wherever they render */
[data-minerva="toast-region"][data-part="toast"][data-color="success"],
minerva-toast-region.success-toasts::part(toast toast--color-success) {
  /* a full outline, not a one-sided stripe */
  border-color: var(--success-color);
  box-shadow: inset 0 0 0 1px var(--success-color);
  background: var(--success-color-subtle);
}
/* leaving toast (data-state="closed" during its exit animation) */
[data-minerva="toast-region"][data-part="toast"][data-state="closed"],
minerva-toast-region.success-toasts::part(toast toast--closed) {
  opacity: 0.4;
}
`})))()}function ze(){return(0,H.jsxs)(_,{className:`pill-buttons`,gap:12,children:[(0,H.jsx)(`style`,{children:U}),(0,H.jsxs)(g,{gap:8,wrap:!0,children:[(0,H.jsx)(f,{children:`React`}),(0,H.jsx)(f,{variant:`outline`,children:`Outline`}),(0,H.jsx)(f,{loading:!0,variant:`ghost`,children:`Saving`})]}),(0,H.jsxs)(g,{gap:8,wrap:!0,children:[(0,H.jsx)(`minerva-button`,{children:`Web Component`}),(0,H.jsx)(`minerva-button`,{variant:`outline`,children:`Outline`}),(0,H.jsx)(`minerva-button`,{loading:!0,variant:`ghost`,children:`Saving`})]})]})}var H,U;function W(){return(W=e((()=>{d(),v(),S(),H=n(),U=`
.pill-buttons [data-minerva="button"][data-part="root"],
.pill-buttons minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}
.pill-buttons [data-minerva="button"][data-part="root"][data-variant="outline"] {
  border-width: 2px;
}
.pill-buttons minerva-button:state(variant-outline)::part(root) {
  border-width: 2px;
}
.pill-buttons [data-minerva="button"][data-part="label"],
.pill-buttons minerva-button::part(label) {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.pill-buttons [data-minerva="button"][data-loading] [data-part="spinner"],
.pill-buttons minerva-button:state(loading)::part(spinner) {
  color: var(--warning-color);
}
`})))()}function Be(){return(0,G.jsxs)(g,{gap:8,wrap:!0,children:[(0,G.jsx)(`style`,{children:K}),(0,G.jsxs)(ge,{children:[(0,G.jsx)(me,{asChild:!0,children:(0,G.jsx)(f,{variant:`outline`,children:`React modal`})}),(0,G.jsxs)(he,{className:`glass-content`,overlayClassName:`glass-overlay`,children:[(0,G.jsx)(_e,{children:`Restyled with hooks`}),(0,G.jsx)(pe,{children:`The overlay, panel and title are styled from the page.`})]})]}),(0,G.jsxs)(`minerva-modal`,{class:`glass`,label:`Restyled with hooks`,children:[(0,G.jsx)(`minerva-button`,{slot:`trigger`,variant:`outline`,children:`Web Component modal`}),`The overlay, panel and title are styled from the page.`]})]})}var G,K;function q(){return(q=e((()=>{d(),v(),fe(),S(),G=n(),K=`
[data-minerva="modal"][data-part="overlay"].glass-overlay,
minerva-modal.glass::part(overlay) {
  backdrop-filter: blur(6px);
}
[data-minerva="modal"][data-part="content"].glass-content,
minerva-modal.glass::part(content) {
  border: 1px solid var(--primary-color);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--primary-color) 25%, transparent);
}
[data-minerva="modal"][data-part="content"][data-state="open"].glass-content [data-part="header"],
minerva-modal.glass:state(open)::part(header) {
  color: var(--primary-color);
}
`})))()}function Ve(){return(0,J.jsxs)(_,{className:`ledger`,gap:24,children:[(0,J.jsx)(`style`,{children:Z}),(0,J.jsx)(c,{"aria-label":`Books (React)`,columns:X,data:Y,rowKey:e=>e.id}),(0,J.jsx)(`minerva-data-table`,{"aria-label":`Books (Web Component)`,"row-key":`id`,columns:X,rows:Y})]})}var J,Y,X,Z;function He(){return(He=e((()=>{o(),v(),S(),J=n(),Y=[{id:1,title:`Dune`,author:`Frank Herbert`,score:9.1},{id:2,title:`Solaris`,author:`Stanisław Lem`,score:8.7},{id:3,title:`Hyperion`,author:`Dan Simmons`,score:8.9}],X=[{key:`title`,header:`Title`},{key:`author`,header:`Author`},{key:`score`,header:`Score`,align:`right`}],Z=`
.ledger [data-minerva="data-table"][data-part="header-cell"],
.ledger minerva-data-table::part(header-cell) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--primary-color);
}
/* ::part() only takes user-action pseudo-classes (:hover, :focus-visible...):
   keep structural ones (:nth-child) in a React-only rule */
.ledger [data-minerva="data-table"][data-part="row"]:nth-child(even) [data-part="cell"] {
  background: color-mix(in srgb, var(--primary-color) 6%, transparent);
}
.ledger [data-minerva="data-table"][data-part="row"]:hover [data-part="cell"],
.ledger minerva-data-table::part(row):hover {
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}
`})))()}function Ue(){return(0,Q.jsxs)(_,{className:`pill-tabs`,gap:24,children:[(0,Q.jsx)(`style`,{children:We}),(0,Q.jsxs)(oe,{defaultValue:`overview`,variant:`soft`,children:[(0,Q.jsxs)(le,{"aria-label":`React tabs`,children:[(0,Q.jsx)(p,{value:`overview`,children:`Overview`}),(0,Q.jsx)(p,{value:`activity`,children:`Activity`}),(0,Q.jsx)(p,{value:`archive`,disabled:!0,children:`Archive`})]}),(0,Q.jsx)(m,{value:`overview`,children:`React: data-* hooks`}),(0,Q.jsx)(m,{value:`activity`,children:`Activity`}),(0,Q.jsx)(m,{value:`archive`,children:`Archive`})]}),(0,Q.jsxs)(`minerva-tabs`,{value:`overview`,variant:`soft`,label:`Web Component tabs`,children:[(0,Q.jsx)(`minerva-tab`,{value:`overview`,children:`Overview`}),(0,Q.jsx)(`minerva-tab`,{value:`activity`,children:`Activity`}),(0,Q.jsx)(`minerva-tab`,{value:`archive`,disabled:!0,children:`Archive`}),(0,Q.jsx)(`minerva-tab-panel`,{value:`overview`,children:`Web Components: ::part() and :state()`}),(0,Q.jsx)(`minerva-tab-panel`,{value:`activity`,children:`Activity`}),(0,Q.jsx)(`minerva-tab-panel`,{value:`archive`,children:`Archive`})]})]})}var Q,We;function Ge(){return(Ge=e((()=>{ce(),v(),S(),Q=n(),We=`
/* Library rule: no one-sided borders. The active tab is a full shape (a
   tinted pill with a full ring), not an underline. */
.pill-tabs [data-minerva="tabs"][data-part="list"],
.pill-tabs minerva-tabs::part(list) {
  gap: 4px;
}
.pill-tabs [data-minerva="tab"][data-part="root"],
.pill-tabs minerva-tab::part(root) {
  border-radius: 999px;
  font-weight: 500;
}
.pill-tabs [data-minerva="tab"][data-state="active"],
.pill-tabs minerva-tab:state(active)::part(root) {
  color: var(--primary-color-text);
  background: var(--primary-color-subtle);
  box-shadow: inset 0 0 0 1px var(--primary-color);
}
.pill-tabs [data-minerva="tab"][data-disabled],
.pill-tabs minerva-tab:state(disabled)::part(root) {
  opacity: 0.4;
}
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { Button, HStack, Menu } from "minerva-design";
import "minerva-design/web-components";

const css = \`
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 3px 0 0 var(--primary-color);
}
/* checked checkbox / radio items, disabled items */
.accent-menu [data-minerva="menu"][data-part="item"][data-state="checked"],
minerva-menu.accent-menu::part(item item--checked) {
  font-weight: 600;
}
.accent-menu [data-minerva="menu"][data-part="item"][data-disabled],
minerva-menu.accent-menu::part(item item--disabled) {
  text-decoration: line-through;
}
\`;

export default function ItemsMenu() {
  return (
    <HStack gap={16} wrap className="accent-menu-demo">
      <style>{css}</style>
      <Menu
        className="accent-menu"
        items={[
          { key: "edit", label: "Edit", shortcut: "⌘E" },
          { key: "copy", label: "Duplicate", shortcut: "⌘D" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            defaultChecked: true,
          },
          { key: "delete", label: "Delete", disabled: true },
        ]}
      >
        <Button color="neutral" variant="outline">
          React menu
        </Button>
      </Menu>
      <minerva-menu class="accent-menu">
        <minerva-button slot="trigger" color="neutral" variant="outline">
          Web Component menu
        </minerva-button>
        <minerva-menu-item value="edit" shortcut="⌘E">
          Edit
        </minerva-menu-item>
        <minerva-menu-item value="copy" shortcut="⌘D">
          Duplicate
        </minerva-menu-item>
        <minerva-menu-checkbox-item value="pin" checked>
          Pinned
        </minerva-menu-checkbox-item>
        <minerva-menu-item value="delete" disabled>
          Delete
        </minerva-menu-item>
      </minerva-menu>
    </HStack>
  );
}
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { Pagination, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = \`
.ring-pages [data-minerva="pagination"][data-part="item"],
.ring-pages minerva-pagination::part(item) {
  border-radius: 999px;
}
/* the current page: aria-current="page" mirrored as a public hook */
.ring-pages [data-minerva="pagination"][data-part="item"][data-current],
.ring-pages minerva-pagination::part(item item--current) {
  background: transparent;
  color: var(--primary-color);
  box-shadow: inset 0 0 0 2px var(--primary-color);
  font-weight: 700;
}
.ring-pages [data-minerva="pagination"][data-part="item"][data-disabled],
.ring-pages minerva-pagination::part(item item--disabled) {
  opacity: 0.3;
}
\`;

export default function ItemsPagination() {
  return (
    <VStack className="ring-pages" gap={16}>
      <style>{css}</style>
      <Pagination defaultCurrent={1} total={50} aria-label="React pages" />
      <minerva-pagination
        current={1}
        total={50}
        aria-label="Web Component pages"
      />
    </VStack>
  );
}
`})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { HStack, Select, SelectItem } from "minerva-design";
import "minerva-design/web-components";

const options = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese" },
  { value: "fr", label: "French" },
  { value: "ja", label: "Japanese", disabled: true },
];

const css = \`
/* React options are SelectItem components: data-minerva="option" */
.bold-options [data-minerva="option"][data-selected],
minerva-select.bold-options::part(item item--selected),
minerva-option.bold-option:state(selected)::part(root) {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
}
.bold-options [data-minerva="option"][data-highlighted]:not([data-selected]),
minerva-select.bold-options::part(item item--highlighted),
minerva-option.bold-option:state(highlighted)::part(root) {
  outline: 2px dashed var(--primary-color);
  outline-offset: -2px;
}
\`;

export default function ItemsSelect() {
  return (
    <HStack gap={16} wrap>
      <style>{css}</style>
      <div style={{ width: 200 }}>
        <Select
          aria-label="Language (React)"
          defaultValue="zh"
          contentClassName="bold-options"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ width: 200 }}>
        {/* options property: items rendered in the shadow root (::part) */}
        <minerva-select
          class="bold-options"
          aria-label="Language (options property)"
          value="zh"
          options={options}
        />
      </div>
      <div style={{ width: 200 }}>
        {/* <minerva-option> children: elements of their own (:state) */}
        <minerva-select aria-label="Language (minerva-option)" value="zh">
          {options.map((option) => (
            <minerva-option
              key={option.value}
              class="bold-option"
              value={option.value}
              disabled={option.disabled || undefined}
            >
              {option.label}
            </minerva-option>
          ))}
        </minerva-select>
      </div>
    </HStack>
  );
}
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Service {
  id: number;
  name: string;
  latency: number;
}

const services: Service[] = [
  { id: 1, name: "auth-api", latency: 42 },
  { id: 2, name: "billing", latency: 118 },
  { id: 3, name: "search", latency: 73 },
];

const columns: TableColumn<Service>[] = [
  { key: "name", header: "Service", sortable: true },
  {
    key: "latency",
    header: "Latency",
    align: "right",
    sortable: (a, b) => a.latency - b.latency,
  },
];

const css = \`
/* sorted column header: data-sort / header-cell--sort-<direction> */
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"],
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="descending"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-ascending),
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-descending) {
  color: var(--primary-color);
  box-shadow: inset 0 -3px 0 var(--primary-color);
}
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="none"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-none) {
  color: var(--text-secondary-color);
}
/* selected rows */
.sorted-headers [data-minerva="data-table"][data-part="row"][data-selected] [data-part="cell"],
.sorted-headers minerva-data-table::part(row row--selected) {
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}
\`;

export default function ItemsTable() {
  return (
    <VStack className="sorted-headers" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Services (React)"
        columns={columns}
        data={services}
        rowKey={(row) => row.id}
        defaultSortState={{ key: "latency", order: "ascend" }}
        rowSelection={{ defaultSelectedRowKeys: [2] }}
      />
      <minerva-data-table
        aria-label="Services (Web Component)"
        row-key="id"
        columns={columns}
        rows={services}
        sortState={{ key: "latency", order: "ascend" }}
        selectable
        selectedRowKeys={[2]}
      />
    </VStack>
  );
}
`})))()}var et;function tt(){return(tt=e((()=>{et=`import { useRef } from "react";
import { Button, HStack, ToastProvider, toast } from "minerva-design";
import "minerva-design/web-components";

type Region = HTMLElement & {
  toast: { success: (title: string) => void; info: (title: string) => void };
};

const css = \`
/* React toasts are portalled to the toast region: the compound selector
   matches them wherever they render */
[data-minerva="toast-region"][data-part="toast"][data-color="success"],
minerva-toast-region.success-toasts::part(toast toast--color-success) {
  /* a full outline, not a one-sided stripe */
  border-color: var(--success-color);
  box-shadow: inset 0 0 0 1px var(--success-color);
  background: var(--success-color-subtle);
}
/* leaving toast (data-state="closed" during its exit animation) */
[data-minerva="toast-region"][data-part="toast"][data-state="closed"],
minerva-toast-region.success-toasts::part(toast toast--closed) {
  opacity: 0.4;
}
\`;

export default function ItemsToast() {
  const region = useRef<Region>(null);
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      {/* mount one ToastProvider near the root of an app */}
      <ToastProvider position="bottom-right" />
      <Button color="success" onClick={() => toast.success("Saved (React)")}>
        React success toast
      </Button>
      <Button
        color="success"
        variant="outline"
        onClick={() => region.current?.toast.success("Saved (Web Component)")}
      >
        Web Component success toast
      </Button>
      <minerva-toast-region
        ref={region}
        class="success-toasts"
        position="bottom-left"
      />
    </HStack>
  );
}
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { Button, HStack, VStack } from "minerva-design";
import "minerva-design/web-components";

// Plain, unlayered CSS: it wins over the library (inside @layer minerva)
// without !important. Variables and hooks combine.
const css = \`
.pill-buttons [data-minerva="button"][data-part="root"],
.pill-buttons minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}
.pill-buttons [data-minerva="button"][data-part="root"][data-variant="outline"] {
  border-width: 2px;
}
.pill-buttons minerva-button:state(variant-outline)::part(root) {
  border-width: 2px;
}
.pill-buttons [data-minerva="button"][data-part="label"],
.pill-buttons minerva-button::part(label) {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.pill-buttons [data-minerva="button"][data-loading] [data-part="spinner"],
.pill-buttons minerva-button:state(loading)::part(spinner) {
  color: var(--warning-color);
}
\`;

export default function RestyleButton() {
  return (
    <VStack className="pill-buttons" gap={12}>
      <style>{css}</style>
      <HStack gap={8} wrap>
        <Button>React</Button>
        <Button variant="outline">Outline</Button>
        <Button loading variant="ghost">
          Saving
        </Button>
      </HStack>
      <HStack gap={8} wrap>
        <minerva-button>Web Component</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
        <minerva-button loading variant="ghost">
          Saving
        </minerva-button>
      </HStack>
    </VStack>
  );
}
`})))()}var it;function at(){return(at=e((()=>{it=`import {
  Button,
  HStack,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "minerva-design";
import "minerva-design/web-components";

// The React content is portalled to <body>: the compound selector
// [data-minerva][data-part] matches it wherever it renders (a class on the
// trigger's container would not).
const css = \`
[data-minerva="modal"][data-part="overlay"].glass-overlay,
minerva-modal.glass::part(overlay) {
  backdrop-filter: blur(6px);
}
[data-minerva="modal"][data-part="content"].glass-content,
minerva-modal.glass::part(content) {
  border: 1px solid var(--primary-color);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--primary-color) 25%, transparent);
}
[data-minerva="modal"][data-part="content"][data-state="open"].glass-content [data-part="header"],
minerva-modal.glass:state(open)::part(header) {
  color: var(--primary-color);
}
\`;

export default function RestyleModal() {
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      <ModalRoot>
        <ModalTrigger asChild>
          <Button variant="outline">React modal</Button>
        </ModalTrigger>
        <ModalContent
          className="glass-content"
          overlayClassName="glass-overlay"
        >
          <ModalHeader>Restyled with hooks</ModalHeader>
          <ModalBody>
            The overlay, panel and title are styled from the page.
          </ModalBody>
        </ModalContent>
      </ModalRoot>
      <minerva-modal class="glass" label="Restyled with hooks">
        <minerva-button slot="trigger" variant="outline">
          Web Component modal
        </minerva-button>
        The overlay, panel and title are styled from the page.
      </minerva-modal>
    </HStack>
  );
}
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

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

const css = \`
.ledger [data-minerva="data-table"][data-part="header-cell"],
.ledger minerva-data-table::part(header-cell) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--primary-color);
}
/* ::part() only takes user-action pseudo-classes (:hover, :focus-visible...):
   keep structural ones (:nth-child) in a React-only rule */
.ledger [data-minerva="data-table"][data-part="row"]:nth-child(even) [data-part="cell"] {
  background: color-mix(in srgb, var(--primary-color) 6%, transparent);
}
.ledger [data-minerva="data-table"][data-part="row"]:hover [data-part="cell"],
.ledger minerva-data-table::part(row):hover {
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}
\`;

export default function RestyleTable() {
  return (
    <VStack className="ledger" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Books (React)"
        columns={columns}
        data={books}
        rowKey={(book) => book.id}
      />
      <minerva-data-table
        aria-label="Books (Web Component)"
        row-key="id"
        columns={columns}
        rows={books}
      />
    </VStack>
  );
}
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { Tab, TabList, TabPanel, Tabs, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = \`
/* Library rule: no one-sided borders. The active tab is a full shape (a
   tinted pill with a full ring), not an underline. */
.pill-tabs [data-minerva="tabs"][data-part="list"],
.pill-tabs minerva-tabs::part(list) {
  gap: 4px;
}
.pill-tabs [data-minerva="tab"][data-part="root"],
.pill-tabs minerva-tab::part(root) {
  border-radius: 999px;
  font-weight: 500;
}
.pill-tabs [data-minerva="tab"][data-state="active"],
.pill-tabs minerva-tab:state(active)::part(root) {
  color: var(--primary-color-text);
  background: var(--primary-color-subtle);
  box-shadow: inset 0 0 0 1px var(--primary-color);
}
.pill-tabs [data-minerva="tab"][data-disabled],
.pill-tabs minerva-tab:state(disabled)::part(root) {
  opacity: 0.4;
}
\`;

export default function RestyleTabs() {
  return (
    <VStack className="pill-tabs" gap={24}>
      <style>{css}</style>
      <Tabs defaultValue="overview" variant="soft">
        <TabList aria-label="React tabs">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="archive" disabled>
            Archive
          </Tab>
        </TabList>
        <TabPanel value="overview">React: data-* hooks</TabPanel>
        <TabPanel value="activity">Activity</TabPanel>
        <TabPanel value="archive">Archive</TabPanel>
      </Tabs>
      <minerva-tabs value="overview" variant="soft" label="Web Component tabs">
        <minerva-tab value="overview">Overview</minerva-tab>
        <minerva-tab value="activity">Activity</minerva-tab>
        <minerva-tab value="archive" disabled>
          Archive
        </minerva-tab>
        <minerva-tab-panel value="overview">
          Web Components: ::part() and :state()
        </minerva-tab-panel>
        <minerva-tab-panel value="activity">Activity</minerva-tab-panel>
        <minerva-tab-panel value="archive">Archive</minerva-tab-panel>
      </minerva-tabs>
    </VStack>
  );
}
`})))()}var $,ut,dt,ft,pt,mt,ht,gt,_t,vt;function yt(){return(yt=e((()=>{T(),O(),M(),L(),V(),W(),q(),He(),Ge(),qe(),Ye(),Ze(),$e(),tt(),rt(),at(),st(),lt(),o(),t(),ae(),r(),Ae(),se(),ke(),te(),Ne(),$=n(),ut=Oe(Object.assign({"./demos/items-menu.tsx":Pe,"./demos/items-pagination.tsx":Fe,"./demos/items-select.tsx":Ie,"./demos/items-table.tsx":Le,"./demos/items-toast.tsx":Re,"./demos/restyle-button.tsx":ze,"./demos/restyle-modal.tsx":Be,"./demos/restyle-table.tsx":Ve,"./demos/restyle-tabs.tsx":Ue}),Object.assign({"./demos/items-menu.tsx":Ke,"./demos/items-pagination.tsx":Je,"./demos/items-select.tsx":Xe,"./demos/items-table.tsx":Qe,"./demos/items-toast.tsx":et,"./demos/restyle-button.tsx":nt,"./demos/restyle-modal.tsx":it,"./demos/restyle-table.tsx":ot,"./demos/restyle-tabs.tsx":ct})),dt=`/* 1. Design tokens: the whole app (or a theme scope) */
:root {
  --primary-color: #7c3aed;
  --radius-md: 10px;
}

/* 2. Component variables (listed on each component page)... */
.toolbar {
  --button-height: 32px;
}

/* 3. ...combined with hooks: variables for one variant / state */
[data-minerva="button"][data-variant="ghost"] {
  --button-radius: 999px;
}
minerva-button:state(variant-ghost) {
  --button-radius: 999px; /* variables inherit into the shadow root */
}`,ft=`/* component root */
[data-minerva="tabs"] { }
/* a part (also matches portalled parts: popups, dialogs) */
[data-minerva="select"][data-part="content"] { }
/* a part in a state */
[data-minerva="modal"][data-part="content"][data-state="open"] { }
/* a part of a component in a state (state on the root) */
[data-minerva="button"][data-loading] [data-part="spinner"] { }`,pt=`/* component: the tag */
minerva-tabs { }
/* a part: ::part() */
minerva-select::part(content) { }
/* states are custom states of the host: :state() */
minerva-modal:state(open)::part(content) { }
minerva-button:state(loading)::part(spinner) { }
minerva-button:state(size-small):state(variant-ghost) { }`,mt=`/* React: item states are attributes of the item element itself */
[data-minerva="menu"][data-part="item"][data-highlighted] { }
[data-minerva="menu"][data-part="item"][data-state="checked"] { }
[data-minerva="option"][data-selected] { }
[data-minerva="pagination"][data-part="item"][data-current] { }
[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"] { }
[data-minerva="toast-region"][data-part="toast"][data-color="success"] { }
/* the trigger of a menu (a native element child) while the menu is open */
[data-minerva="menu"][data-part="trigger"][data-state="open"] { }

/* Web components, items in the shadow root: <part>--<state> part names */
minerva-menu::part(item item--highlighted) { }
minerva-menu::part(item item--checked) { }
minerva-select::part(item item--selected) { }
minerva-pagination::part(item item--current) { }
minerva-data-table::part(header-cell header-cell--sort-ascending) { }
minerva-toast-region::part(toast toast--color-success) { }
minerva-upload::part(item item--status-error) { }

/* Web components, items that are elements of their own: :state() */
minerva-option:state(selected)::part(root) { }
minerva-tab:state(active)::part(root) { }
minerva-page-tab:state(current) { }
/* your slotted trigger, from the states of its host */
minerva-menu:state(open) > [slot="trigger"] { }`,ht=`/* The focus ring of every text-like control. Unset by default: the
   ring falls back to the theme's --focus-ring-color (per palette, light
   and dark), a 3px width and --primary-color for the border */
:root {
  --minerva-focus-ring-width: 4px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* One control: component variables still win for the border */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: color-mix(in srgb, var(--success-color) 45%, transparent);
}

/* Restyling the ring yourself? Keep the transparent outline:
   forced colors (High Contrast) paint it, box-shadows are dropped */
[data-minerva="input"][data-part="root"]:focus-within {
  box-shadow: 0 0 0 2px var(--primary-color);
  outline: 2px solid transparent;
}`,gt=`/* The library ships inside @layer minerva: unlayered rules win,
   whatever their specificity or order */
.my-button {
  border-radius: 0; /* beats the library, no !important */
}

/* Layered app? Declare the order once, before any stylesheet */
@layer reset, minerva, app;

/* Tailwind CSS v4 */
@layer theme, base, minerva, components, utilities;

/* Unlayered resets now beat the library too: layer them */
@import url("modern-normalize.css") layer(reset);`,_t=`import { stylingHooks, wcSelector } from "minerva-design/styling-hooks";

stylingHooks.modal.parts; // overlay, content, header, description, body, footer, close-button
stylingHooks.modal.states; // { state: ["open", "closed"], size: [...] }
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"`,vt=()=>{let{t:e}=ie(),t=t=>e(`docs.styling.${t}`),n=[[`state`,b.map(e=>`[data-state="${e}"]`).join(` `),b.map(e=>`:state(${x(`state`,e)})`).join(` `),e(`hooks.states.state`)],...De.map(t=>[t,`[${y(t)}]`,`:state(${x(t)})`,e(`hooks.states.${t}`)]),...je.map(t=>[t,`[${y(t)}="…"]`,`:state(${x(t,`…`)})`,e(`hooks.states.${t}`)])],r=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`overview`,children:[(0,$.jsx)(`h2`,{id:`overview`,children:t(`overview.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`overview.text`)}),(0,$.jsxs)(`ol`,{className:l.prose,children:[(0,$.jsx)(`li`,{children:t(`overview.variables`)}),(0,$.jsx)(`li`,{children:t(`overview.hooks`)}),(0,$.jsx)(`li`,{children:t(`overview.layer`)})]})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`variables`,children:[(0,$.jsx)(`h2`,{id:`variables`,children:t(`variables.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`variables.text`)}),(0,$.jsx)(h,{code:dt,language:`css`})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`hooks`,children:[(0,$.jsx)(`h2`,{id:`hooks`,children:t(`hooks.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`hooks.text`)}),(0,$.jsx)(h,{code:ft,language:`css`}),(0,$.jsx)(`p`,{className:l.prose,children:t(`hooks.selector`)})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`vocabulary`,children:[(0,$.jsx)(`h2`,{id:`vocabulary`,children:t(`vocabulary.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`vocabulary.text`)}),(0,$.jsx)(`div`,{className:l.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`vocabulary.title`),children:(0,$.jsxs)(ne,{className:l.propsTable,children:[(0,$.jsx)(ee,{children:(0,$.jsxs)(s,{children:[(0,$.jsx)(a,{scope:`col`,children:e(`hooks.state`)}),(0,$.jsx)(a,{scope:`col`,children:`React`}),(0,$.jsx)(a,{scope:`col`,children:`Web Components`}),(0,$.jsx)(a,{scope:`col`,children:e(`doc.description`)})]})}),(0,$.jsx)(re,{children:n.map(([e,t,n,r])=>(0,$.jsxs)(s,{children:[(0,$.jsx)(a,{scope:`row`,children:(0,$.jsx)(`code`,{className:l.propName,children:e})}),(0,$.jsx)(u,{children:(0,$.jsx)(`code`,{className:l.propType,children:t})}),(0,$.jsx)(u,{children:(0,$.jsx)(`code`,{className:l.propType,children:n})}),(0,$.jsx)(u,{children:r})]},e))})]})}),(0,$.jsx)(`p`,{className:l.prose,children:t(`vocabulary.parts`)})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`web-components`,children:[(0,$.jsx)(`h2`,{id:`web-components`,children:t(`wc.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`wc.text`)}),(0,$.jsx)(h,{code:pt,language:`css`}),(0,$.jsx)(`p`,{className:l.callout,children:t(`wc.support`)})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`items`,children:[(0,$.jsx)(`h2`,{id:`items`,children:t(`items.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`items.text`)}),(0,$.jsxs)(`ul`,{className:l.prose,children:[(0,$.jsx)(`li`,{children:t(`items.react`)}),(0,$.jsx)(`li`,{children:t(`items.wc`)}),(0,$.jsx)(`li`,{children:t(`items.elements`)})]}),(0,$.jsx)(h,{code:mt,language:`css`}),(0,$.jsx)(`p`,{className:l.prose,children:t(`items.dynamic`)}),(0,$.jsx)(`p`,{className:l.callout,children:t(`items.examples`)})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`layers`,children:[(0,$.jsx)(`h2`,{id:`layers`,children:t(`layers.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`layers.text`)}),(0,$.jsx)(h,{code:gt,language:`css`}),(0,$.jsx)(`p`,{className:l.callout,children:t(`layers.resets`)})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`visual-rules`,children:[(0,$.jsx)(`h2`,{id:`visual-rules`,children:t(`rules.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`rules.borders`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`rules.focus`)}),(0,$.jsx)(h,{code:ht,language:`css`}),(0,$.jsx)(`p`,{className:l.callout,children:t(`rules.forced`)})]})]});return(0,$.jsxs)(Me,{id:`styling`,demos:ut,intro:r,children:[(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`stability`,children:[(0,$.jsx)(`h2`,{id:`stability`,children:t(`stability.title`)}),(0,$.jsx)(`p`,{className:l.prose,children:t(`stability.text`)}),(0,$.jsx)(h,{code:_t,language:`ts`}),(0,$.jsxs)(`ul`,{className:l.prose,children:[(0,$.jsx)(`li`,{children:t(`stability.minor`)}),(0,$.jsx)(`li`,{children:t(`stability.major`)}),(0,$.jsx)(`li`,{children:t(`stability.private`)})]})]}),(0,$.jsxs)(`section`,{className:l.section,"aria-labelledby":`next`,children:[(0,$.jsx)(`h2`,{id:`next`,children:t(`next.title`)}),(0,$.jsxs)(`div`,{className:l.cardGrid,children:[(0,$.jsxs)(i,{to:`/theming`,className:l.linkCard,children:[(0,$.jsx)(`strong`,{children:e(`docs.theming.title`)}),(0,$.jsx)(`span`,{children:t(`next.theming`)})]}),(0,$.jsxs)(i,{to:`/wc-theming`,className:l.linkCard,children:[(0,$.jsx)(`strong`,{children:e(`docs.wc-theming.title`)}),(0,$.jsx)(`span`,{children:t(`next.wcTheming`)})]})]})]})]})}})))()}yt();export{vt as default};