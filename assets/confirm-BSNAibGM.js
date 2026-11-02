import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as ee}from"./useTranslation-BWidUi7H.js";import{R as i,z as a}from"./ProgressIndicator-Har2Rnl4.js";import{n as te,t as o}from"./CodeBlock-D2it7n8h.js";import{n as s,r as c}from"./ConfigProvider-DSSh93Wv.js";import{a as l,i as ne,n as u,r as d,t as re}from"./Confirm-D9okUmXp.js";import{a as ie,i as f,n as p,r as m}from"./Toast-BnA_UMlp.js";import{i as h,r as g}from"./DemoBlock-X1Kpr0wG.js";import{l as ae,n as oe,t as se,u as _}from"./DocPage-B6BmLO7o.js";function v(){let[e,t]=(0,y.useState)(`—`);return(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[x.map(({label:e,options:n})=>(0,b.jsx)(a,{color:n.color,variant:`outline`,onClick:async()=>{let r=await u(n);t(`${e}: ${r?`confirmed`:`cancelled`}`)},children:e},e)),(0,b.jsxs)(`span`,{children:[`Result: `,e]})]})}var y,b,x;function S(){return(S=e((()=>{y=t(),i(),l(),b=n(),x=[{label:`Publish`,options:{title:`Publish this chapter?`,color:`primary`}},{label:`Reset`,options:{title:`Reset all settings?`,description:`Your preferences go back to their defaults.`,color:`warning`,confirmLabel:`Reset`}},{label:`Delete`,options:{title:`Delete this draft?`,color:`danger`}}]})))()}function C(){let[e,t]=(0,w.useState)(!1),[n,r]=(0,w.useState)(!1);return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(a,{color:`warning`,onClick:()=>t(!0),children:`Archive project`}),(0,T.jsx)(ne,{open:e,onOpenChange:t,onConfirm:async()=>{r(!0),await new Promise(e=>setTimeout(e,1200)),r(!1),t(!1)},loading:n,color:`warning`,title:`Archive this project?`,description:`It becomes read-only for everyone.`,confirmLabel:`Archive`})]})}var w,T;function E(){return(E=e((()=>{w=t(),i(),l(),T=n()})))()}function ce(){let[e,t]=(0,D.useState)(`—`);return(0,O.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,O.jsx)(a,{color:`danger`,onClick:async()=>{let e=await u({title:`Delete this book?`,description:`Reviews and ratings are deleted too.`,color:`danger`});t(e?`Deleted`:`Cancelled`)},children:`Delete book`}),(0,O.jsxs)(`span`,{children:[`Result: `,e]})]})}var D,O;function k(){return(k=e((()=>{D=t(),i(),l(),O=n()})))()}function le(){let e=d();return(0,j.jsx)(a,{onClick:async()=>{await e({title:`Publish chapter?`,confirmLabel:`Publish`})&&f.success(`Published`)},children:`Publish`})}function A(){return(0,j.jsx)(p,{children:(0,j.jsx)(re,{children:(0,j.jsx)(le,{})})})}var j;function M(){return(M=e((()=>{i(),l(),m(),ie(),j=n()})))()}function N(){let e=d(),[t,n]=(0,F.useState)(`—`);return(0,I.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[(0,I.jsx)(a,{color:`danger`,onClick:async()=>{let t=await e({title:`Delete this chapter? (useConfirm(): dark, tech, 中文)`,color:`danger`});n(String(t))},children:`useConfirm()`}),(0,I.jsx)(a,{color:`neutral`,variant:`outline`,onClick:async()=>n(String(await L())),children:`confirm()`}),(0,I.jsx)(`output`,{style:{alignSelf:`center`},children:t})]})}function P(){return(0,I.jsx)(c,{theme:`dark`,palette:`tech`,locale:{language:`zh`},children:(0,I.jsx)(N,{})})}var F,I,L;function R(){return(R=e((()=>{F=t(),i(),s(),l(),I=n(),L=()=>u({title:`Retry the upload? (confirm(): root scope)`})})))()}var z;function B(){return(B=e((()=>{z=`import { useState } from "react";
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
`})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { useState } from "react";
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
`})))()}var G;function K(){return(K=e((()=>{G=`import {
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
`})))()}var q;function J(){return(J=e((()=>{q=`import { useState } from "react";
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
`})))()}var Y,X,Z,Q;function $(){return($=e((()=>{S(),E(),k(),M(),R(),B(),H(),W(),K(),J(),t(),ee(),te(),oe(),h(),_(),Y=n(),X=ae(Object.assign({"./demos/colors.tsx":v,"./demos/declarative.tsx":C,"./demos/imperative.tsx":ce,"./demos/provider.tsx":A,"./demos/scoped.tsx":P}),Object.assign({"./demos/colors.tsx":z,"./demos/declarative.tsx":V,"./demos/imperative.tsx":U,"./demos/provider.tsx":G,"./demos/scoped.tsx":q})),Z=`// Inside a component: follows the nearest ConfigProvider scope
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
router.beforeLeave(() => confirm({ title: "Discard changes?" }));`,Q=()=>{let{t:e}=r(),t=(0,Y.jsxs)(`section`,{className:g.section,"aria-labelledby":`when-to-use`,children:[(0,Y.jsx)(`h2`,{id:`when-to-use`,children:e(`docs.confirm.usage.title`)}),(0,Y.jsxs)(`ul`,{className:g.prose,children:[(0,Y.jsx)(`li`,{children:e(`docs.confirm.usage.hook`)}),(0,Y.jsx)(`li`,{children:e(`docs.confirm.usage.function`)})]}),(0,Y.jsx)(o,{code:Z,language:`tsx`})]});return(0,Y.jsx)(se,{id:`confirm`,demos:X,intro:t})}})))()}$();export{Q as default};