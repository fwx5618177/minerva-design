import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-DxNxqLAt.js";import{n as a,t as o}from"./useTranslation-QEOA_yX_.js";import{R as s,z as c}from"./ProgressIndicator-CXNTCbma.js";import{n as l,t as u}from"./Input-BxW6PX1k.js";import{a as d,i as ee,n as te,o as ne,r as re,s as f,t as p}from"./CodeBlock-By8zueSp.js";import{n as ie,t as ae}from"./Pagination-BJgW86XM.js";import{a as oe,c as se,o as ce,r as le,s as ue,t as de}from"./Modal-C0pt58WZ.js";import{n as fe,t as pe}from"./Command-CdSzkmxk.js";import{i as m,n as h,r as g,t as me}from"./Stack-NslbKtAY.js";import{n as he,t as ge}from"./Menu-DvIWdeeE.js";import{a as _e,i as ve,n as ye,r as be}from"./Toast-LMGxSHwd.js";import{a as xe,r as _}from"./FormControl-Ftl_hIhJ.js";import{n as Se,t as Ce}from"./Textarea-CX_Ya4R7.js";import{a as v,c as we,d as Te,f as Ee,i as De,l as y,o as b,r as x,s as S,u as C}from"./DemoBlock-DmrttXPt.js";import{a as Oe,n as ke,o as Ae}from"./Select-I6y89_0c.js";import{n as je,t as Me}from"./DatePicker-DJg92Acz.js";import{a as w,c as Ne,i as T,l as Pe,n as Fe,o as Ie,r as E,s as Le,t as Re,u as ze}from"./DocPage-BAXF5LSw.js";import{a as D}from"./minerva-web-components-BDy_xAfk.js";function Be(){let{t:e}=a(),t=t=>e(`docs.styling.focusDemo.${t}`),n=(0,O.useRef)(null),[r,i]=(0,O.useState)(``),[o,s]=(0,O.useState)(!1),[l,d]=(0,O.useState)(``);return(0,k.jsxs)(me,{gap:4,style:{width:`100%`,maxWidth:760},children:[(0,k.jsxs)(`div`,{style:{display:`grid`,gap:20,gridTemplateColumns:`repeat(auto-fit, minmax(min(100%, 240px), 1fr))`},children:[(0,k.jsx)(_,{label:t(`name`),children:(0,k.jsx)(u,{placeholder:t(`placeholder`)})}),(0,k.jsx)(_,{label:t(`date`),children:(0,k.jsx)(je,{ref:n,"aria-label":t(`date`),value:r,onChange:i})}),(0,k.jsx)(_,{label:t(`invalid`),errorMessage:t(`error`),children:(0,k.jsx)(u,{defaultValue:`hello@`})}),(0,k.jsx)(_,{label:t(`readonly`),children:(0,k.jsx)(u,{readOnly:!0,defaultValue:`Minerva Studio`})})]}),(0,k.jsx)(_,{label:t(`notes`),children:(0,k.jsx)(Se,{rows:2,placeholder:t(`notesPlaceholder`)})}),(0,k.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,flexWrap:`wrap`,gap:12},children:[(0,k.jsx)(c,{variant:`outline`,onClick:()=>s(!0),children:t(`commands`)}),(0,k.jsx)(`output`,{"aria-live":`polite`,children:l})]}),(0,k.jsx)(pe,{open:o,onOpenChange:s,title:t(`commands`),shortcut:[],items:[{id:`schedule`,title:t(`schedule`),keywords:`schedule date calendar`},{id:`clear`,title:t(`clear`),keywords:`clear reset date`}],onSelect:e=>{d(e.title),e.id===`clear`?i(``):requestAnimationFrame(()=>n.current?.focus())}})]})}var O,k;function A(){return(A=e((()=>{O=t(),o(),s(),fe(),Me(),xe(),l(),g(),Ce(),k=n()})))()}function Ve(){return(0,j.jsxs)(m,{gap:16,wrap:!0,className:`accent-menu-demo`,children:[(0,j.jsx)(`style`,{children:M}),(0,j.jsx)(ge,{className:`accent-menu`,items:[{key:`edit`,label:`Edit`,shortcut:`⌘E`},{key:`copy`,label:`Duplicate`,shortcut:`⌘D`},{type:`checkbox`,key:`pin`,label:`Pinned`,defaultChecked:!0},{key:`delete`,label:`Delete`,disabled:!0}],children:(0,j.jsx)(c,{color:`neutral`,variant:`outline`,children:`React menu`})}),(0,j.jsxs)(`minerva-menu`,{class:`accent-menu`,children:[(0,j.jsx)(`minerva-button`,{slot:`trigger`,color:`neutral`,variant:`outline`,children:`Web Component menu`}),(0,j.jsx)(`minerva-menu-item`,{value:`edit`,shortcut:`⌘E`,children:`Edit`}),(0,j.jsx)(`minerva-menu-item`,{value:`copy`,shortcut:`⌘D`,children:`Duplicate`}),(0,j.jsx)(`minerva-menu-checkbox-item`,{value:`pin`,checked:!0,children:`Pinned`}),(0,j.jsx)(`minerva-menu-item`,{value:`delete`,disabled:!0,children:`Delete`})]})]})}var j,M;function N(){return(N=e((()=>{s(),g(),he(),D(),j=n(),M=`
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
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
`})))()}function He(){return(0,P.jsxs)(h,{className:`ring-pages`,gap:16,children:[(0,P.jsx)(`style`,{children:F}),(0,P.jsx)(ie,{defaultCurrent:1,total:50,"aria-label":`React pages`}),(0,P.jsx)(`minerva-pagination`,{current:1,total:50,"aria-label":`Web Component pages`})]})}var P,F;function I(){return(I=e((()=>{ae(),g(),D(),P=n(),F=`
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
`})))()}function Ue(){return(0,L.jsxs)(m,{gap:16,wrap:!0,children:[(0,L.jsx)(`style`,{children:z}),(0,L.jsx)(`div`,{style:{width:200},children:(0,L.jsx)(ke,{"aria-label":`Language (React)`,defaultValue:`zh`,contentClassName:`bold-options`,children:R.map(e=>(0,L.jsx)(Ae,{value:e.value,disabled:e.disabled,children:e.label},e.value))})}),(0,L.jsx)(`div`,{style:{width:200},children:(0,L.jsx)(`minerva-select`,{class:`bold-options`,"aria-label":`Language (options property)`,value:`zh`,options:R})}),(0,L.jsx)(`div`,{style:{width:200},children:(0,L.jsx)(`minerva-select`,{"aria-label":`Language (minerva-option)`,value:`zh`,children:R.map(e=>(0,L.jsx)(`minerva-option`,{class:`bold-option`,value:e.value,disabled:e.disabled||void 0,children:e.label},e.value))})})]})}var L,R,z;function B(){return(B=e((()=>{g(),Oe(),D(),L=n(),R=[{value:`en`,label:`English`},{value:`zh`,label:`Chinese`},{value:`fr`,label:`French`},{value:`ja`,label:`Japanese`,disabled:!0}],z=`
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
`})))()}function We(){return(0,V.jsxs)(h,{className:`sorted-headers`,gap:24,children:[(0,V.jsx)(`style`,{children:Ge}),(0,V.jsx)(v,{"aria-label":`Services (React)`,columns:U,data:H,rowKey:e=>e.id,defaultSortState:{key:`latency`,order:`ascend`},rowSelection:{defaultSelectedRowKeys:[2]}}),(0,V.jsx)(`minerva-data-table`,{"aria-label":`Services (Web Component)`,"row-key":`id`,columns:U,rows:H,sortState:{key:`latency`,order:`ascend`},selectable:!0,selectedRowKeys:[2]})]})}var V,H,U,Ge;function Ke(){return(Ke=e((()=>{y(),g(),D(),V=n(),H=[{id:1,name:`auth-api`,latency:42},{id:2,name:`billing`,latency:118},{id:3,name:`search`,latency:73}],U=[{key:`name`,header:`Service`,sortable:!0},{key:`latency`,header:`Latency`,align:`right`,sortable:(e,t)=>e.latency-t.latency}],Ge=`
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
`})))()}function qe(){let e=(0,Je.useRef)(null);return(0,W.jsxs)(m,{gap:8,wrap:!0,children:[(0,W.jsx)(`style`,{children:Ye}),(0,W.jsx)(ye,{position:`bottom-right`}),(0,W.jsx)(c,{color:`success`,onClick:()=>ve.success(`Saved (React)`),children:`React success toast`}),(0,W.jsx)(c,{color:`success`,variant:`outline`,onClick:()=>e.current?.toast.success(`Saved (Web Component)`),children:`Web Component success toast`}),(0,W.jsx)(`minerva-toast-region`,{ref:e,class:`success-toasts`,position:`bottom-left`})]})}var Je,W,Ye;function Xe(){return(Xe=e((()=>{Je=t(),s(),g(),be(),_e(),D(),W=n(),Ye=`
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
`})))()}function Ze(){return(0,G.jsxs)(h,{className:`pill-buttons`,gap:12,children:[(0,G.jsx)(`style`,{children:Qe}),(0,G.jsxs)(m,{gap:8,wrap:!0,children:[(0,G.jsx)(c,{children:`React`}),(0,G.jsx)(c,{variant:`outline`,children:`Outline`}),(0,G.jsx)(c,{loading:!0,variant:`ghost`,children:`Saving`})]}),(0,G.jsxs)(m,{gap:8,wrap:!0,children:[(0,G.jsx)(`minerva-button`,{children:`Web Component`}),(0,G.jsx)(`minerva-button`,{variant:`outline`,children:`Outline`}),(0,G.jsx)(`minerva-button`,{loading:!0,variant:`ghost`,children:`Saving`})]})]})}var G,Qe;function $e(){return($e=e((()=>{s(),g(),D(),G=n(),Qe=`
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
`})))()}function et(){return(0,K.jsxs)(m,{gap:8,wrap:!0,children:[(0,K.jsx)(`style`,{children:tt}),(0,K.jsxs)(ue,{children:[(0,K.jsx)(ce,{asChild:!0,children:(0,K.jsx)(c,{variant:`outline`,children:`React modal`})}),(0,K.jsxs)(le,{className:`glass-content`,overlayClassName:`glass-overlay`,children:[(0,K.jsx)(de,{children:`Restyled with hooks`}),(0,K.jsx)(se,{children:`The overlay, panel and title are styled from the page.`})]})]}),(0,K.jsxs)(`minerva-modal`,{class:`glass`,label:`Restyled with hooks`,children:[(0,K.jsx)(`minerva-button`,{slot:`trigger`,variant:`outline`,children:`Web Component modal`}),`The overlay, panel and title are styled from the page.`]})]})}var K,tt;function nt(){return(nt=e((()=>{s(),g(),oe(),D(),K=n(),tt=`
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
`})))()}function rt(){return(0,q.jsxs)(h,{className:`ledger`,gap:24,children:[(0,q.jsx)(`style`,{children:it}),(0,q.jsx)(v,{"aria-label":`Books (React)`,columns:Y,data:J,rowKey:e=>e.id}),(0,q.jsx)(`minerva-data-table`,{"aria-label":`Books (Web Component)`,"row-key":`id`,columns:Y,rows:J})]})}var q,J,Y,it;function at(){return(at=e((()=>{y(),g(),D(),q=n(),J=[{id:1,title:`Dune`,author:`Frank Herbert`,score:9.1},{id:2,title:`Solaris`,author:`Stanisław Lem`,score:8.7},{id:3,title:`Hyperion`,author:`Dan Simmons`,score:8.9}],Y=[{key:`title`,header:`Title`},{key:`author`,header:`Author`},{key:`score`,header:`Score`,align:`right`}],it=`
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
`})))()}function ot(){return(0,X.jsxs)(h,{className:`pill-tabs`,gap:24,children:[(0,X.jsx)(`style`,{children:st}),(0,X.jsxs)(ee,{defaultValue:`overview`,variant:`soft`,children:[(0,X.jsxs)(re,{"aria-label":`React tabs`,children:[(0,X.jsx)(d,{value:`overview`,children:`Overview`}),(0,X.jsx)(d,{value:`activity`,children:`Activity`}),(0,X.jsx)(d,{value:`archive`,disabled:!0,children:`Archive`})]}),(0,X.jsx)(f,{value:`overview`,children:`React: data-* hooks`}),(0,X.jsx)(f,{value:`activity`,children:`Activity`}),(0,X.jsx)(f,{value:`archive`,children:`Archive`})]}),(0,X.jsxs)(`minerva-tabs`,{value:`overview`,variant:`soft`,label:`Web Component tabs`,children:[(0,X.jsx)(`minerva-tab`,{value:`overview`,children:`Overview`}),(0,X.jsx)(`minerva-tab`,{value:`activity`,children:`Activity`}),(0,X.jsx)(`minerva-tab`,{value:`archive`,disabled:!0,children:`Archive`}),(0,X.jsx)(`minerva-tab-panel`,{value:`overview`,children:`Web Components: ::part() and :state()`}),(0,X.jsx)(`minerva-tab-panel`,{value:`activity`,children:`Activity`}),(0,X.jsx)(`minerva-tab-panel`,{value:`archive`,children:`Archive`})]})]})}var X,st;function ct(){return(ct=e((()=>{ne(),g(),D(),X=n(),st=`
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
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  CommandDialog,
  DatePicker,
  FormField,
  Input,
  Stack,
  Textarea,
} from "minerva-design";

/** The frame owns focus; native fields must not add another outline. */
export default function FocusTreatment() {
  const { t } = useTranslation();
  const text = (key: string) => t(\`docs.styling.focusDemo.\${key}\`);
  const dateRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  return (
    <Stack gap={4} style={{ width: "100%", maxWidth: 760 }}>
      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        }}
      >
        <FormField label={text("name")}>
          <Input placeholder={text("placeholder")} />
        </FormField>
        <FormField label={text("date")}>
          <DatePicker
            ref={dateRef}
            aria-label={text("date")}
            value={date}
            onChange={setDate}
          />
        </FormField>
        <FormField label={text("invalid")} errorMessage={text("error")}>
          <Input defaultValue="hello@" />
        </FormField>
        <FormField label={text("readonly")}>
          <Input readOnly defaultValue="Minerva Studio" />
        </FormField>
      </div>
      <FormField label={text("notes")}>
        <Textarea rows={2} placeholder={text("notesPlaceholder")} />
      </FormField>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Button variant="outline" onClick={() => setOpen(true)}>
          {text("commands")}
        </Button>
        <output aria-live="polite">{selected}</output>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={text("commands")}
        shortcut={[]}
        items={[
          {
            id: "schedule",
            title: text("schedule"),
            keywords: "schedule date calendar",
          },
          { id: "clear", title: text("clear"), keywords: "clear reset date" },
        ]}
        onSelect={(item) => {
          setSelected(item.title);
          if (item.id === "clear") setDate("");
          else requestAnimationFrame(() => dateRef.current?.focus());
        }}
      />
    </Stack>
  );
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { Button, HStack, Menu } from "minerva-design";
import "minerva-design/web-components";

const css = \`
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
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
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`import { Pagination, VStack } from "minerva-design";
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
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { HStack, Select, SelectItem } from "minerva-design";
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
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { Table, VStack, type TableColumn } from "minerva-design";
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
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useRef } from "react";
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
`})))()}var xt;function St(){return(St=e((()=>{xt=`import { Button, HStack, VStack } from "minerva-design";
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
`})))()}var Ct;function wt(){return(wt=e((()=>{Ct=`import {
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
`})))()}var Tt;function Et(){return(Et=e((()=>{Tt=`import { Table, VStack, type TableColumn } from "minerva-design";
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
`})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`import { Tab, TabList, TabPanel, Tabs, VStack } from "minerva-design";
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
`})))()}var Z,kt,At,jt,Mt,Nt,Q,Pt,Ft,It,Lt;function $(){return($=e((()=>{A(),N(),I(),B(),Ke(),Xe(),$e(),nt(),at(),ct(),ut(),ft(),mt(),gt(),vt(),bt(),St(),wt(),Et(),Ot(),y(),t(),o(),r(),Ie(),te(),Fe(),De(),ze(),Z=n(),kt=Pe(Object.assign({"./demos/focus-treatment.tsx":Be,"./demos/items-menu.tsx":Ve,"./demos/items-pagination.tsx":He,"./demos/items-select.tsx":Ue,"./demos/items-table.tsx":We,"./demos/items-toast.tsx":qe,"./demos/restyle-button.tsx":Ze,"./demos/restyle-modal.tsx":et,"./demos/restyle-table.tsx":rt,"./demos/restyle-tabs.tsx":ot}),Object.assign({"./demos/focus-treatment.tsx":lt,"./demos/items-menu.tsx":dt,"./demos/items-pagination.tsx":pt,"./demos/items-select.tsx":ht,"./demos/items-table.tsx":_t,"./demos/items-toast.tsx":yt,"./demos/restyle-button.tsx":xt,"./demos/restyle-modal.tsx":Ct,"./demos/restyle-table.tsx":Tt,"./demos/restyle-tabs.tsx":Dt})),At=`/* 1. Design tokens: the whole app (or a theme scope) */
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
}`,jt=`/* component root */
[data-minerva="tabs"] { }
/* a part (also matches portalled parts: popups, dialogs) */
[data-minerva="select"][data-part="content"] { }
/* a part in a state */
[data-minerva="modal"][data-part="content"][data-state="open"] { }
/* a part of a component in a state (state on the root) */
[data-minerva="button"][data-loading] [data-part="spinner"] { }`,Mt=`/* component: the tag */
minerva-tabs { }
/* a part: ::part() */
minerva-select::part(content) { }
/* states are custom states of the host: :state() */
minerva-modal:state(open)::part(content) { }
minerva-button:state(loading)::part(spinner) { }
minerva-button:state(size-small):state(variant-ghost) { }`,Nt=`/* React: item states are attributes of the item element itself */
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
minerva-menu:state(open) > [slot="trigger"] { }`,Q=`/* Default: pointer focus changes the border; keyboard navigation adds
   one 2px ring. The frame owns the indicator, including composed controls. */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: var(--success-color-text);
}

/* Optional explicit override: keeps a ring even for pointer focus.
   Prefer the automatic default for ordinary forms. */
.high-visibility {
  --minerva-focus-ring-width: 3px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* Keep the system-colored outline fallback in Windows High Contrast.
   Do not globally suppress :focus or add a second outline to inner inputs. */`,Pt=`/* The library ships inside @layer minerva: unlayered rules win,
   whatever their specificity or order */
.my-button {
  border-radius: 0; /* beats the library, no !important */
}

/* Layered app? Declare the order once, before any stylesheet */
@layer reset, minerva, app;

/* Tailwind CSS v4 */
@layer theme, base, minerva, components, utilities;

/* Unlayered resets now beat the library too: layer them */
@import url("modern-normalize.css") layer(reset);`,Ft=`import { acquireFocusModality } from "minerva-design/core";

// Custom DOM controls: acquire after mounting and release on teardown.
// Framework components already manage this lifecycle automatically.
export function mountCustomControl(element: HTMLElement) {
  const release = acquireFocusModality(element.ownerDocument);
  return () => release();
}`,It=`import { stylingHooks, wcSelector } from "minerva-design/styling-hooks";

stylingHooks.modal.parts; // overlay, content, header, description, body, footer, close-button
stylingHooks.modal.states; // { state: ["open", "closed"], size: [...] }
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"`,Lt=()=>{let{t:e}=a(),t=t=>e(`docs.styling.${t}`),n=[[`state`,T.map(e=>`[data-state="${e}"]`).join(` `),T.map(e=>`:state(${E(`state`,e)})`).join(` `),e(`hooks.states.state`)],...Ne.map(t=>[t,`[${w(t)}]`,`:state(${E(t)})`,e(`hooks.states.${t}`)]),...Le.map(t=>[t,`[${w(t)}="…"]`,`:state(${E(t,`…`)})`,e(`hooks.states.${t}`)])],r=(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`overview`,children:[(0,Z.jsx)(`h2`,{id:`overview`,children:t(`overview.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`overview.text`)}),(0,Z.jsxs)(`ol`,{className:x.prose,children:[(0,Z.jsx)(`li`,{children:t(`overview.variables`)}),(0,Z.jsx)(`li`,{children:t(`overview.hooks`)}),(0,Z.jsx)(`li`,{children:t(`overview.layer`)})]})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`variables`,children:[(0,Z.jsx)(`h2`,{id:`variables`,children:t(`variables.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`variables.text`)}),(0,Z.jsx)(p,{code:At,language:`css`})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`hooks`,children:[(0,Z.jsx)(`h2`,{id:`hooks`,children:t(`hooks.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`hooks.text`)}),(0,Z.jsx)(p,{code:jt,language:`css`}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`hooks.selector`)})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`vocabulary`,children:[(0,Z.jsx)(`h2`,{id:`vocabulary`,children:t(`vocabulary.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`vocabulary.text`)}),(0,Z.jsx)(`div`,{className:x.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`vocabulary.title`),children:(0,Z.jsxs)(Ee,{className:x.propsTable,children:[(0,Z.jsx)(we,{children:(0,Z.jsxs)(b,{children:[(0,Z.jsx)(C,{scope:`col`,children:e(`hooks.state`)}),(0,Z.jsx)(C,{scope:`col`,children:`React`}),(0,Z.jsx)(C,{scope:`col`,children:`Web Components`}),(0,Z.jsx)(C,{scope:`col`,children:e(`doc.description`)})]})}),(0,Z.jsx)(Te,{children:n.map(([e,t,n,r])=>(0,Z.jsxs)(b,{children:[(0,Z.jsx)(C,{scope:`row`,children:(0,Z.jsx)(`code`,{className:x.propName,children:e})}),(0,Z.jsx)(S,{children:(0,Z.jsx)(`code`,{className:x.propType,children:t})}),(0,Z.jsx)(S,{children:(0,Z.jsx)(`code`,{className:x.propType,children:n})}),(0,Z.jsx)(S,{children:r})]},e))})]})}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`vocabulary.parts`)})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`web-components`,children:[(0,Z.jsx)(`h2`,{id:`web-components`,children:t(`wc.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`wc.text`)}),(0,Z.jsx)(p,{code:Mt,language:`css`}),(0,Z.jsx)(`p`,{className:x.callout,children:t(`wc.support`)})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`items`,children:[(0,Z.jsx)(`h2`,{id:`items`,children:t(`items.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`items.text`)}),(0,Z.jsxs)(`ul`,{className:x.prose,children:[(0,Z.jsx)(`li`,{children:t(`items.react`)}),(0,Z.jsx)(`li`,{children:t(`items.wc`)}),(0,Z.jsx)(`li`,{children:t(`items.elements`)})]}),(0,Z.jsx)(p,{code:Nt,language:`css`}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`items.dynamic`)}),(0,Z.jsx)(`p`,{className:x.callout,children:t(`items.examples`)})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`layers`,children:[(0,Z.jsx)(`h2`,{id:`layers`,children:t(`layers.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`layers.text`)}),(0,Z.jsx)(p,{code:Pt,language:`css`}),(0,Z.jsx)(`p`,{className:x.callout,children:t(`layers.resets`)})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`visual-rules`,children:[(0,Z.jsx)(`h2`,{id:`visual-rules`,children:t(`rules.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`rules.borders`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`rules.focus`)}),(0,Z.jsx)(p,{code:Q,language:`css`}),(0,Z.jsx)(`p`,{className:x.callout,children:t(`rules.forced`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`rules.ownership`)}),(0,Z.jsx)(p,{code:Ft,language:`ts`})]})]});return(0,Z.jsxs)(Re,{id:`styling`,demos:kt,intro:r,children:[(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`stability`,children:[(0,Z.jsx)(`h2`,{id:`stability`,children:t(`stability.title`)}),(0,Z.jsx)(`p`,{className:x.prose,children:t(`stability.text`)}),(0,Z.jsx)(p,{code:It,language:`ts`}),(0,Z.jsxs)(`ul`,{className:x.prose,children:[(0,Z.jsx)(`li`,{children:t(`stability.minor`)}),(0,Z.jsx)(`li`,{children:t(`stability.major`)}),(0,Z.jsx)(`li`,{children:t(`stability.private`)})]})]}),(0,Z.jsxs)(`section`,{className:x.section,"aria-labelledby":`next`,children:[(0,Z.jsx)(`h2`,{id:`next`,children:t(`next.title`)}),(0,Z.jsxs)(`div`,{className:x.cardGrid,children:[(0,Z.jsxs)(i,{to:`/theming`,className:x.linkCard,children:[(0,Z.jsx)(`strong`,{children:e(`docs.theming.title`)}),(0,Z.jsx)(`span`,{children:t(`next.theming`)})]}),(0,Z.jsxs)(i,{to:`/wc-theming`,className:x.linkCard,children:[(0,Z.jsx)(`strong`,{children:e(`docs.wc-theming.title`)}),(0,Z.jsx)(`span`,{children:t(`next.wcTheming`)})]})]})]})]})}})))()}$();export{Lt as default};