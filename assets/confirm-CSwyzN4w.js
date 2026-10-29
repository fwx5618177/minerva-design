import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{d as r}from"./react-vendor-CVmG4vV9.js";import{Dt as i,Ot as a}from"./io5-CvrBnF9y.js";import{It as o,ut as ee}from"./angular-preview-l4x8c_2r.js";import{B as s,G as c,H as te,K as l,R as u,T as d,U as f,q as ne,w as re,z as p}from"./ProgressIndicator-BhPa7d9i.js";import{n as ie,t as ae}from"./CodeBlock-Bfhf7f9G.js";import{r as oe,t as se}from"./ConfigProvider-DZkhWQzR.js";import{a as ce,i as le,o as ue,r as de,s as fe,t as pe}from"./Dialog-yTBvhmpM.js";import{n as m,t as me}from"./modal.module.scss-B7v23URH.js";import{a as he,i as ge,n as _e,r as ve}from"./Toast-Dp6U5YiV.js";import{i as ye,r as h}from"./DemoBlock-3GMi3Uss.js";import{l as be,n as xe,t as Se,u as Ce}from"./DocPage-DCMfehF7.js";var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{o(),l(),f(),u(),d(),ce(),me(),g=t(),_=n(),v=r(),y=({open:e,onOpenChange:t,onConfirm:n,title:r,description:i,confirmLabel:a,cancelLabel:o,closeLabel:c,color:l=`primary`,loading:u=!1,confirmDisabled:d=!1})=>{let{t:f}=te();return(0,_.jsx)(le,{componentName:`ConfirmDialog`,open:e,onOpenChange:t,children:(0,_.jsxs)(ue,{overlayClassName:m.overlay,overlayAttributes:s(`confirm-dialog`,`overlay`),className:ee(m.content,m.small),role:`alertdialog`,...s(`confirm-dialog`,`content`,{color:l,loading:u}),children:[i&&(0,_.jsx)(fe,{className:m.description,...s(`confirm-dialog`,`description`),children:i}),r&&(0,_.jsx)(de,{asChild:!0,children:(0,_.jsx)(`div`,{className:m.header,...s(`confirm-dialog`,`header`),children:r})}),(0,_.jsx)(`div`,{className:m.body,...s(`confirm-dialog`,`body`)}),(0,_.jsxs)(`div`,{className:m.footer,...s(`confirm-dialog`,`footer`),children:[(0,_.jsx)(p,{type:`button`,color:`neutral`,variant:`outline`,onClick:()=>t(!1),disabled:u,children:o??f(`confirm.cancel`)}),(0,_.jsx)(p,{type:`button`,color:l,variant:`solid`,onClick:()=>void n(),loading:u,disabled:d,children:a??f(l===`danger`?`confirm.delete`:`confirm.confirm`)})]}),(0,_.jsx)(pe,{className:m.close,"aria-label":c??f(`modal.close`),...s(`confirm-dialog`,`close-button`),children:(0,_.jsx)(re,{size:16,"aria-hidden":`true`})})]})})},b=e=>e&&(e.portalContainer||e.language)?e:void 0,x=class{constructor(){this.requests=[],this.listeners=new Set,this.nextId=0,this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)}),this.getSnapshot=()=>this.requests,this.enqueue=(e,t)=>new Promise(n=>{this.requests=[...this.requests,{id:++this.nextId,options:e,resolve:n,scope:t}],this.emit()}),this.request=e=>this.enqueue(e)}settle(e,t){let[n,...r]=this.requests;n?.id===e&&(this.requests=r,n.resolve(t),this.emit())}cancelAll(){let e=this.requests;if(e.length!==0){this.requests=[];for(let t of e)t.resolve(!1);this.emit()}}emit(){for(let e of this.listeners)e()}},S=[],C=()=>S,w=({queue:e})=>{let t=(0,g.useSyncExternalStore)(e.subscribe,e.getSnapshot,C)[0];if(!t)return null;let n=(0,_.jsx)(y,{...t.options,open:!0,onOpenChange:n=>{n||e.settle(t.id,!1)},onConfirm:()=>e.settle(t.id,!0)},t.id);return t.scope?(0,_.jsx)(ne.Provider,{value:t.scope,children:n},t.id):n},T=(0,g.createContext)(null),E=[],D=null,O=(e,t)=>{if(!D){let e=document.createElement(`div`);e.setAttribute(`data-confirm-host`,``);let t=new x;(0,v.createRoot)(e).render((0,_.jsx)(w,{queue:t})),D={queue:t,container:e}}return D.container.isConnected||document.body.append(D.container),D.queue.enqueue(e,t)},k=(e,t)=>{let n=E[E.length-1];return n?n.enqueue(e,t):typeof document>`u`?Promise.resolve(!1):O(e,t)},A=e=>k(e),j=()=>{let e=(0,g.useContext)(T),t=b(c());return(0,g.useMemo)(()=>e?t?n=>e.enqueue(n,t):e.request:t?e=>k(e,t):A,[e,t])},M=({children:e})=>{let[t]=(0,g.useState)(()=>new x);return(0,g.useEffect)(()=>(E.push(t),()=>{let e=E.lastIndexOf(t);e>=0&&E.splice(e,1),t.cancelAll()}),[t]),(0,_.jsxs)(T.Provider,{value:t,children:[e,(0,_.jsx)(w,{queue:t})]})}})))()}function we(){let[e,t]=(0,P.useState)(`—`);return(0,F.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[I.map(({label:e,options:n})=>(0,F.jsx)(p,{color:n.color,variant:`outline`,onClick:async()=>{let r=await A(n);t(`${e}: ${r?`confirmed`:`cancelled`}`)},children:e},e)),(0,F.jsxs)(`span`,{children:[`Result: `,e]})]})}var P,F,I;function L(){return(L=e((()=>{P=t(),u(),N(),F=n(),I=[{label:`Publish`,options:{title:`Publish this chapter?`,color:`primary`}},{label:`Reset`,options:{title:`Reset all settings?`,description:`Your preferences go back to their defaults.`,color:`warning`,confirmLabel:`Reset`}},{label:`Delete`,options:{title:`Delete this draft?`,color:`danger`}}]})))()}function Te(){let[e,t]=(0,R.useState)(!1),[n,r]=(0,R.useState)(!1);return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(p,{color:`warning`,onClick:()=>t(!0),children:`Archive project`}),(0,z.jsx)(y,{open:e,onOpenChange:t,onConfirm:async()=>{r(!0),await new Promise(e=>setTimeout(e,1200)),r(!1),t(!1)},loading:n,color:`warning`,title:`Archive this project?`,description:`It becomes read-only for everyone.`,confirmLabel:`Archive`})]})}var R,z;function B(){return(B=e((()=>{R=t(),u(),N(),z=n()})))()}function Ee(){let[e,t]=(0,V.useState)(`—`);return(0,H.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,H.jsx)(p,{color:`danger`,onClick:async()=>{let e=await A({title:`Delete this book?`,description:`Reviews and ratings are deleted too.`,color:`danger`});t(e?`Deleted`:`Cancelled`)},children:`Delete book`}),(0,H.jsxs)(`span`,{children:[`Result: `,e]})]})}var V,H;function De(){return(De=e((()=>{V=t(),u(),N(),H=n()})))()}function Oe(){let e=j();return(0,U.jsx)(p,{onClick:async()=>{await e({title:`Publish chapter?`,confirmLabel:`Publish`})&&ge.success(`Published`)},children:`Publish`})}function ke(){return(0,U.jsx)(_e,{children:(0,U.jsx)(M,{children:(0,U.jsx)(Oe,{})})})}var U;function W(){return(W=e((()=>{u(),N(),ve(),he(),U=n()})))()}function Ae(){let e=j(),[t,n]=(0,G.useState)(`—`);return(0,K.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[(0,K.jsx)(p,{color:`danger`,onClick:async()=>{let t=await e({title:`Delete this chapter? (useConfirm(): dark, tech, 中文)`,color:`danger`});n(String(t))},children:`useConfirm()`}),(0,K.jsx)(p,{color:`neutral`,variant:`outline`,onClick:async()=>n(String(await q())),children:`confirm()`}),(0,K.jsx)(`output`,{style:{alignSelf:`center`},children:t})]})}function je(){return(0,K.jsx)(se,{theme:`dark`,palette:`tech`,locale:{language:`zh`},children:(0,K.jsx)(Ae,{})})}var G,K,q;function J(){return(J=e((()=>{G=t(),u(),oe(),N(),K=n(),q=()=>A({title:`Retry the upload? (confirm(): root scope)`})})))()}var Y;function X(){return(X=e((()=>{Y=`import { useState } from "react";
import { Button, confirm, type ConfirmOptions } from "minerva-design";

const examples: Array<{ label: string; options: ConfirmOptions }> = [
  {
    label: "Publish",
    options: { title: "Publish this chapter?", color: "primary" },
  },
  {
    label: "Reset",
    options: {
      title: "Reset all settings?",
      description: "Your preferences go back to their defaults.",
      color: "warning",
      confirmLabel: "Reset",
    },
  },
  {
    // color="danger" defaults the confirm label to "Delete"
    label: "Delete",
    options: { title: "Delete this draft?", color: "danger" },
  },
];

export default function ColorsDemo() {
  const [result, setResult] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {examples.map(({ label, options }) => (
        <Button
          key={label}
          color={options.color}
          variant="outline"
          onClick={async () => {
            const ok = await confirm(options);
            setResult(\`\${label}: \${ok ? "confirmed" : "cancelled"}\`);
          }}
        >
          {label}
        </Button>
      ))}
      <span>Result: {result}</span>
    </div>
  );
}
`})))()}var Z;function Me(){return(Me=e((()=>{Z=`import { useState } from "react";
import { Button, ConfirmDialog } from "minerva-design";

export default function DeclarativeDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const archive = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setOpen(false);
  };
  return (
    <>
      <Button color="warning" onClick={() => setOpen(true)}>
        Archive project
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={archive}
        loading={loading}
        color="warning"
        title="Archive this project?"
        description="It becomes read-only for everyone."
        confirmLabel="Archive"
      />
    </>
  );
}
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useState } from "react";
import { Button, confirm } from "minerva-design";

export default function ImperativeDemo() {
  const [result, setResult] = useState("—");
  const remove = async () => {
    const ok = await confirm({
      title: "Delete this book?",
      description: "Reviews and ratings are deleted too.",
      color: "danger",
    });
    setResult(ok ? "Deleted" : "Cancelled");
  };
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button color="danger" onClick={remove}>
        Delete book
      </Button>
      <span>Result: {result}</span>
    </div>
  );
}
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import {
  Button,
  ConfirmProvider,
  ToastProvider,
  toast,
  useConfirm,
} from "minerva-design";

function PublishButton() {
  const ask = useConfirm();
  return (
    <Button
      onClick={async () => {
        if (await ask({ title: "Publish chapter?", confirmLabel: "Publish" })) {
          toast.success("Published");
        }
      }}
    >
      Publish
    </Button>
  );
}

export default function ProviderDemo() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <PublishButton />
      </ConfirmProvider>
    </ToastProvider>
  );
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { useState } from "react";
import { Button, ConfigProvider, confirm, useConfirm } from "minerva-design";

// Code outside React (API client, event bus...): no hook available, so it
// uses confirm(), rendered with the root theme and language.
const askToRetry = () =>
  confirm({ title: "Retry the upload? (confirm(): root scope)" });

function Actions() {
  // Inside a component: bound to the nearest ConfigProvider scope
  const ask = useConfirm();
  const [answer, setAnswer] = useState<string>("—");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        color="danger"
        onClick={async () => {
          const ok = await ask({
            title: "Delete this chapter? (useConfirm(): dark, tech, 中文)",
            color: "danger",
          });
          setAnswer(String(ok));
        }}
      >
        useConfirm()
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={async () => setAnswer(String(await askToRetry()))}
      >
        confirm()
      </Button>
      <output style={{ alignSelf: "center" }}>{answer}</output>
    </div>
  );
}

export default function ScopedDemo() {
  return (
    <ConfigProvider theme="dark" palette="tech" locale={{ language: "zh" }}>
      <Actions />
    </ConfigProvider>
  );
}
`})))()}var Q,ze,Be,Ve;function $(){return($=e((()=>{L(),B(),De(),W(),J(),X(),Me(),Pe(),Ie(),Re(),t(),i(),ie(),xe(),ye(),Ce(),Q=n(),ze=be(Object.assign({"./demos/colors.tsx":we,"./demos/declarative.tsx":Te,"./demos/imperative.tsx":Ee,"./demos/provider.tsx":ke,"./demos/scoped.tsx":je}),Object.assign({"./demos/colors.tsx":Y,"./demos/declarative.tsx":Z,"./demos/imperative.tsx":Ne,"./demos/provider.tsx":Fe,"./demos/scoped.tsx":Le})),Be=`// Inside a component: follows the nearest ConfigProvider scope
function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button onClick={async () => (await confirm({ title: "Delete?" })) && remove()}>
      Delete
    </Button>
  );
}

// Outside React (API client, event bus, router guard...): root scope
import { confirm } from "minerva-design";
router.beforeLeave(() => confirm({ title: "Discard changes?" }));`,Ve=()=>{let{t:e}=a(),t=(0,Q.jsxs)(`section`,{className:h.section,"aria-labelledby":`when-to-use`,children:[(0,Q.jsx)(`h2`,{id:`when-to-use`,children:e(`docs.confirm.usage.title`)}),(0,Q.jsxs)(`ul`,{className:h.prose,children:[(0,Q.jsx)(`li`,{children:e(`docs.confirm.usage.hook`)}),(0,Q.jsx)(`li`,{children:e(`docs.confirm.usage.function`)})]}),(0,Q.jsx)(ae,{code:Be,language:`tsx`})]});return(0,Q.jsx)(Se,{id:`confirm`,demos:ze,intro:t})}})))()}$();export{Ve as default};