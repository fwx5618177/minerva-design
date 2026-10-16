import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{J as r,q as i}from"./io5-BAuU0sG1.js";import{Ht as a,It as o,ut as s}from"./angular-preview-l4x8c_2r.js";import{B as c,H as l,O as u,R as d,T as f,U as p,b as m,w as h,z as g}from"./ProgressIndicator-BhPa7d9i.js";import{n as _,t as v}from"./Alert-DjM4h90c.js";import{n as y,t as b}from"./upload.module.scss-WAx7689S.js";import{l as x,n as S,t as C,u as w}from"./DocPage-BJtkZ4N3.js";var T,E,D;function O(){return(O=e((()=>{o(),p(),d(),f(),r(),_(),y(),T=t(),E=n(),D=({label:e,value:t,onFilesSelected:n,onRemove:r,onRetry:o,accept:d=`*`,multiple:f=!1,replace:p=!1,maxCount:_=f?50:1,maxSize:y,loading:x=!1,disabled:S=!1,labels:C,className:w,ref:D,...O})=>{let{t:k}=l(),A=`${(0,T.useId)()}-label`,j=(0,T.useRef)(null),M=(0,T.useRef)(null),N=(0,T.useRef)(new Map),P=(0,T.useRef)(null);(0,T.useEffect)(()=>{let e=P.current;if(!e||t.some(t=>t.id===e.id))return;P.current=null;let n=document.activeElement;n&&n!==document.body||(e.nextId&&N.current.get(e.nextId)||M.current)?.focus()},[t]);let[F,I]=(0,T.useState)(``),[L,R]=(0,T.useState)(!1),z=p&&!f?0:t.length,B=S||x||z>=_,V=e=>{if(B||e.length===0)return;if(!f&&e.length>1||e.length+z>_){I(C?.tooMany?.(_)??k(`upload.tooMany`,{count:_}));return}let t=e.find(e=>!a(e,d));if(t){I(C?.invalidType?.(t.name)??k(`upload.invalidType`,{name:t.name}));return}let r=y===void 0?void 0:e.find(e=>e.size>y);if(r){I(C?.tooLarge?.(r.name)??k(`upload.tooLarge`,{name:r.name}));return}I(``),n(e)},H=e=>e.status===`uploading`?C?.uploading??k(`upload.uploading`):e.status===`error`?e.error||(C?.failed??k(`upload.failed`)):C?.done??k(`upload.done`);return(0,E.jsxs)(`div`,{...O,ref:D,className:s(b.upload,w),role:`group`,"aria-labelledby":A,"aria-busy":x,...c(`upload`,`root`,{disabled:S,loading:x,dragging:L&&!B}),children:[(0,E.jsx)(`span`,{id:A,className:b.label,...c(`upload`,`label`),children:e}),(0,E.jsxs)(`div`,{className:s(b.dropzone,{[b.dragging]:L&&!B}),...c(`upload`,`dropzone`),onDragOver:e=>{e.preventDefault(),B||R(!0)},onDragLeave:e=>{e.currentTarget.contains(e.relatedTarget)||R(!1)},onDrop:e=>{e.preventDefault(),R(!1),V(Array.from(e.dataTransfer.files))},children:[(0,E.jsx)(g,{type:`button`,variant:`outline`,disabled:B,loading:x,ref:M,startIcon:(0,E.jsx)(m,{"aria-hidden":`true`}),onClick:()=>j.current?.click(),children:C?.select??k(`upload.select`)}),(0,E.jsx)(`input`,{ref:j,type:`file`,hidden:!0,tabIndex:-1,"aria-label":e,disabled:B,accept:d,multiple:f,onChange:e=>{let t=Array.from(e.currentTarget.files??[]);e.currentTarget.value=``,V(t)}})]}),F&&(0,E.jsx)(v,{color:`danger`,animation:!1,className:b.error,children:F}),t.length>0&&(0,E.jsx)(`ul`,{className:b.list,...c(`upload`,`list`),children:t.map(e=>(0,E.jsxs)(`li`,{className:b.item,...c(`upload`,`item`,{status:e.status}),children:[e.previewUrl&&(0,E.jsx)(`img`,{src:e.previewUrl,alt:``,className:b.preview}),(0,E.jsxs)(`div`,{className:b.info,children:[(0,E.jsx)(`span`,{children:e.name}),(0,E.jsx)(`span`,{role:e.status===`error`?`alert`:`status`,className:s(b.status,{[b.statusError]:e.status===`error`}),children:H(e)})]}),(0,E.jsxs)(`div`,{className:b.actions,children:[e.status===`error`&&o&&(0,E.jsx)(i,{label:C?.retry?.(e.name)??k(`upload.retry`,{name:e.name}),size:`small`,shape:`square`,disabled:S||x,onClick:()=>o(e),icon:(0,E.jsx)(u,{"aria-hidden":`true`})}),r&&(0,E.jsx)(i,{label:C?.remove?.(e.name)??k(`upload.remove`,{name:e.name}),size:`small`,shape:`square`,disabled:S,ref:t=>{t?N.current.set(e.id,t):N.current.delete(e.id)},onClick:()=>{let n=t.indexOf(e),i=t[n+1]??t[n-1];P.current={id:e.id,nextId:i?.id},r(e)},icon:(0,E.jsx)(h,{"aria-hidden":`true`})})]})]},e.id))})]})}})))()}function k(){let[e,t]=(0,A.useState)([]);return(0,j.jsx)(D,{label:`Cover image`,accept:`image/*`,maxSize:5242880,replace:!0,value:e,onFilesSelected:e=>{let n=e[0],r={id:crypto.randomUUID(),name:n.name,status:`uploading`,previewUrl:URL.createObjectURL(n)};t([r]),setTimeout(()=>t([{...r,status:`done`}]),1e3)},onRemove:()=>t([])})}var A,j;function M(){return(M=e((()=>{A=t(),O(),j=n()})))()}function N(){let[e,t]=(0,P.useState)(I);return(0,F.jsx)(D,{label:`Attachments`,accept:`.pdf,.csv`,multiple:!0,maxCount:5,value:e,onFilesSelected:e=>t(t=>[...t,...e.map(e=>({id:crypto.randomUUID(),name:e.name,status:`done`}))]),onRetry:e=>t(t=>t.map(t=>t.id===e.id?{...t,status:`done`}:t)),onRemove:e=>t(t=>t.filter(t=>t.id!==e.id))})}var P,F,I;function L(){return(L=e((()=>{P=t(),O(),F=n(),I=[{id:`1`,name:`report.pdf`,status:`done`},{id:`2`,name:`data.csv`,status:`error`,error:`Network error`}]})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import { Upload, type UploadItem } from "minerva-design";

export default function BasicDemo() {
  const [items, setItems] = useState<UploadItem[]>([]);

  const upload = (files: File[]) => {
    const file = files[0];
    const item: UploadItem = {
      id: crypto.randomUUID(),
      name: file.name,
      status: "uploading",
      previewUrl: URL.createObjectURL(file),
    };
    setItems([item]);
    // simulate the transfer; a real app uploads the file here
    setTimeout(() => setItems([{ ...item, status: "done" }]), 1000);
  };

  return (
    <Upload
      label="Cover image"
      accept="image/*"
      maxSize={5 * 1024 * 1024}
      replace
      value={items}
      onFilesSelected={upload}
      onRemove={() => setItems([])}
    />
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import { Upload, type UploadItem } from "minerva-design";

const initial: UploadItem[] = [
  { id: "1", name: "report.pdf", status: "done" },
  { id: "2", name: "data.csv", status: "error", error: "Network error" },
];

export default function MultipleDemo() {
  const [items, setItems] = useState(initial);

  return (
    <Upload
      label="Attachments"
      accept=".pdf,.csv"
      multiple
      maxCount={5}
      value={items}
      onFilesSelected={(files) =>
        setItems((prev) => [
          ...prev,
          ...files.map((file) => ({
            id: crypto.randomUUID(),
            name: file.name,
            status: "done" as const,
          })),
        ])
      }
      onRetry={(item) =>
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: "done" } : it,
          ),
        )
      }
      onRemove={(item) =>
        setItems((prev) => prev.filter((it) => it.id !== item.id))
      }
    />
  );
}
`})))()}var H,U,W;function G(){return(G=e((()=>{M(),L(),z(),V(),t(),S(),w(),H=n(),U=x(Object.assign({"./demos/basic.tsx":k,"./demos/multiple.tsx":N}),Object.assign({"./demos/basic.tsx":R,"./demos/multiple.tsx":B})),W=()=>(0,H.jsx)(C,{id:`upload`,demos:U})})))()}G();export{W as default};