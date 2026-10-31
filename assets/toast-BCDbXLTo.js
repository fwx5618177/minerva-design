import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as ee,t as te}from"./useTranslation-CsvLrYUR.js";import{R as r,z as i}from"./ProgressIndicator-BMZ0rR7D.js";import{n as ne,t as re}from"./CodeBlock-Cbwktov2.js";import{r as ie,t as ae}from"./ConfigProvider-DxH0x8eF.js";import{i as a,n as oe,r as o}from"./Stack-B3Kr9X_e.js";import{a as s,i as c,n as l,r as u,t as d}from"./Toast-UfZ7kXcX.js";import{i as se,r as f}from"./DemoBlock-DnM97CAJ.js";import{a as ce,t as le}from"./fi-BmU156XB.js";import{l as ue,n as de,t as fe,u as pe}from"./DocPage-CmQtD5jg.js";function me(){return(0,p.jsxs)(a,{gap:2,wrap:!0,children:[(0,p.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c.info(`Conversation archived`,{duration:8e3,action:{label:`Undo`,onClick:()=>c.success(`Conversation restored`)}}),children:`With action`}),(0,p.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c.info(`Reminder set for 9:00`,{icon:(0,p.jsx)(le,{}),closable:!1}),children:`Custom icon, no close button`}),(0,p.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c.success(`Exported`,{onClose:()=>c.info(`Export toast closed`)}),children:`onClose`})]})}var p;function m(){return(m=e((()=>{r(),o(),s(),ce(),p=n()})))()}function he(){let[e,t]=(0,h.useState)(`top-right`);return(0,g.jsx)(l,{position:e,max:3,children:(0,g.jsxs)(oe,{gap:4,align:`start`,children:[(0,g.jsxs)(a,{gap:2,wrap:!0,children:[(0,g.jsx)(i,{color:`success`,onClick:()=>c.success(`Saved`),children:`Success`}),(0,g.jsx)(i,{color:`danger`,onClick:()=>c.danger(`Request failed`),children:`Danger`}),(0,g.jsx)(i,{color:`warning`,onClick:()=>c.warning(`Unsaved changes`),children:`Warning`}),(0,g.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c.info(`New version`),children:`Info`})]}),(0,g.jsx)(a,{attached:!0,wrap:!0,"aria-label":`Position`,children:_.map(n=>(0,g.jsx)(i,{size:`small`,color:n===e?`primary`:`neutral`,variant:n===e?`solid`:`outline`,"aria-pressed":n===e,onClick:()=>t(n),children:n},n))})]})})}var h,g,_;function v(){return(v=e((()=>{h=t(),r(),o(),u(),s(),g=n(),_=[`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`]})))()}function ge(){return(0,y.jsx)(a,{gap:2,wrap:!0,children:b.map(e=>(0,y.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c({color:e,title:`A ${e} toast`,description:`color sets the accent, the icon and the role.`}),children:e},e))})}var y,b;function x(){return(x=e((()=>{r(),o(),s(),y=n(),b=[`info`,`success`,`warning`,`danger`]})))()}function _e(){let e=d();return(0,S.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>e.danger(`Sync failed at ${new Date().toLocaleTimeString()}`,{id:`sync-error`}),children:`Fail again`})}var S;function C(){return(C=e((()=>{r(),u(),S=n()})))()}function ve(){return(0,w.jsxs)(a,{gap:2,wrap:!0,children:[(0,w.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>{c.info(`Build started`,{duration:0}),c.success(`Tests passed`,{duration:0}),c.warning(`Coverage dropped by 2%`,{duration:0,action:{label:`Details`,onClick:()=>{}}})},children:`Show three toasts, then press F8`}),(0,w.jsx)(i,{color:`neutral`,variant:`ghost`,onClick:()=>c.dismiss(),children:`Dismiss all`})]})}var w;function T(){return(T=e((()=>{r(),o(),s(),w=n()})))()}function ye(){return(0,E.jsxs)(a,{gap:2,wrap:!0,children:[(0,E.jsx)(i,{onClick:()=>{let e=c.loading(`Saving…`);setTimeout(()=>{c.update(e,{color:`success`,loading:!1,title:`Saved!`})},1500)},children:`Save (update)`}),(0,E.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c.promise(new Promise((e,t)=>setTimeout(()=>Math.random()>.3?e(3):t(Error()),1500)),{loading:`Uploading files…`,success:e=>`${e} files uploaded`,error:`Upload failed, try again`}).catch(()=>void 0),children:`Upload (promise)`}),(0,E.jsx)(i,{color:`danger`,variant:`outline`,onClick:()=>{let e=c({color:`danger`,loading:!0,title:`Deleting…`});setTimeout(()=>{c.update(e,{loading:!1,title:`Project deleted`})},1500)},children:`Delete (loading option)`})]})}var E;function D(){return(D=e((()=>{r(),o(),s(),E=n()})))()}function be(){return(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,O.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c({color:`success`,title:`Book published`,description:`Readers can now find it in the catalog.`,duration:8e3}),children:`With description`}),(0,O.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c.warning(`Stays until closed`,{duration:0}),children:`Persistent`}),(0,O.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>c.dismiss(),children:`Dismiss all`})]})}var O;function k(){return(k=e((()=>{r(),s(),O=n()})))()}function xe(){let e=d();return(0,A.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[(0,A.jsx)(i,{onClick:()=>e.success(`Saved (useToast(): dark, tech, 中文)`),children:`useToast()`}),(0,A.jsx)(i,{color:`neutral`,variant:`outline`,onClick:j,children:`toast()`})]})}function Se(){return(0,A.jsx)(ae,{theme:`dark`,palette:`tech`,locale:{language:`zh`},children:(0,A.jsx)(xe,{})})}var A,j;function M(){return(M=e((()=>{r(),ie(),s(),u(),A=n(),j=()=>c.info(`Synced (toast(): root scope)`)})))()}var N;function P(){return(P=e((()=>{N=`import { Button, HStack, toast } from "minerva-design";
import { FiBell } from "react-icons/fi";

export default function ActionDemo() {
  return (
    <HStack gap={2} wrap>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast.info("Conversation archived", {
            duration: 8000,
            action: {
              label: "Undo",
              onClick: () => toast.success("Conversation restored"),
            },
          })
        }
      >
        With action
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast.info("Reminder set for 9:00", {
            icon: <FiBell />,
            closable: false,
          })
        }
      >
        Custom icon, no close button
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast.success("Exported", {
            onClose: () => toast.info("Export toast closed"),
          })
        }
      >
        onClose
      </Button>
    </HStack>
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { useState } from "react";
import {
  Button,
  HStack,
  ToastProvider,
  VStack,
  toast,
  type ToastPosition,
} from "minerva-design";

const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export default function BasicDemo() {
  const [position, setPosition] = useState<ToastPosition>("top-right");
  return (
    // Mount one ToastProvider near the root of the app; max={3} closes the
    // oldest toast when a fourth one appears
    <ToastProvider position={position} max={3}>
      <VStack gap={4} align="start">
        <HStack gap={2} wrap>
          <Button color="success" onClick={() => toast.success("Saved")}>
            Success
          </Button>
          <Button color="danger" onClick={() => toast.danger("Request failed")}>
            Danger
          </Button>
          <Button
            color="warning"
            onClick={() => toast.warning("Unsaved changes")}
          >
            Warning
          </Button>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => toast.info("New version")}
          >
            Info
          </Button>
        </HStack>
        <HStack attached wrap aria-label="Position">
          {positions.map((name) => (
            <Button
              key={name}
              size="small"
              color={name === position ? "primary" : "neutral"}
              variant={name === position ? "solid" : "outline"}
              aria-pressed={name === position}
              onClick={() => setPosition(name)}
            >
              {name}
            </Button>
          ))}
        </HStack>
      </VStack>
    </ToastProvider>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { Button, HStack, toast } from "minerva-design";

const colors = ["info", "success", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <HStack gap={2} wrap>
      {colors.map((color) => (
        <Button
          key={color}
          color="neutral"
          variant="outline"
          onClick={() =>
            toast({
              color,
              title: \`A \${color} toast\`,
              description: "color sets the accent, the icon and the role.",
            })
          }
        >
          {color}
        </Button>
      ))}
    </HStack>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { Button, useToast } from "minerva-design";

export default function DedupeDemo() {
  const toast = useToast();
  return (
    <Button
      color="neutral"
      variant="outline"
      onClick={() =>
        // Same id: replaces the visible toast and restarts its timer
        toast.danger(\`Sync failed at \${new Date().toLocaleTimeString()}\`, {
          id: "sync-error",
        })
      }
    >
      Fail again
    </Button>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { Button, HStack, toast } from "minerva-design";

// The ToastProvider of the first demo uses the default hotkey (F8); set
// \`hotkey\` (e.g. ["altKey", "KeyT"]) to change it. Show a
// few toasts, press F8 to jump to them, Tab between them, then Escape (or a
// close button): focus moves to the next toast, then back here.
export default function KeyboardDemo() {
  return (
    <HStack gap={2} wrap>
      <Button
        color="neutral"
        variant="outline"
        onClick={() => {
          toast.info("Build started", { duration: 0 });
          toast.success("Tests passed", { duration: 0 });
          toast.warning("Coverage dropped by 2%", {
            duration: 0,
            action: { label: "Details", onClick: () => {} },
          });
        }}
      >
        Show three toasts, then press F8
      </Button>
      <Button color="neutral" variant="ghost" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </HStack>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { Button, HStack, toast } from "minerva-design";

export default function LoadingDemo() {
  const save = () => {
    // Loading toasts stay open until they are updated or dismissed
    const id = toast.loading("Saving…");
    setTimeout(() => {
      // loading: false swaps the spinner for the icon and starts the timer
      toast.update(id, { color: "success", loading: false, title: "Saved!" });
    }, 1500);
  };

  const remove = () => {
    // Any color can be loading; it stays a polite status while pending
    const id = toast({ color: "danger", loading: true, title: "Deleting…" });
    setTimeout(() => {
      toast.update(id, { loading: false, title: "Project deleted" });
    }, 1500);
  };

  const upload = () =>
    toast
      .promise(
        new Promise<number>((resolve, reject) =>
          setTimeout(
            () => (Math.random() > 0.3 ? resolve(3) : reject(new Error())),
            1500,
          ),
        ),
        {
          loading: "Uploading files…",
          success: (count) => \`\${count} files uploaded\`,
          error: "Upload failed, try again",
        },
      )
      .catch(() => undefined);

  return (
    <HStack gap={2} wrap>
      <Button onClick={save}>Save (update)</Button>
      <Button color="neutral" variant="outline" onClick={upload}>
        Upload (promise)
      </Button>
      <Button color="danger" variant="outline" onClick={remove}>
        Delete (loading option)
      </Button>
    </HStack>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { Button, toast } from "minerva-design";

export default function OptionsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast({
            color: "success",
            title: "Book published",
            description: "Readers can now find it in the catalog.",
            duration: 8000,
          })
        }
      >
        With description
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={() => toast.warning("Stays until closed", { duration: 0 })}
      >
        Persistent
      </Button>
      <Button color="neutral" variant="outline" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { Button, ConfigProvider, toast, useToast } from "minerva-design";

// Code outside React (API client, event bus...): no hook available, so it
// uses toast(), rendered with the root theme and language.
const notifySyncDone = () => toast.info("Synced (toast(): root scope)");

function Actions() {
  // Inside a component: bound to the nearest ConfigProvider scope
  const scopedToast = useToast();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        onClick={() =>
          scopedToast.success("Saved (useToast(): dark, tech, 中文)")
        }
      >
        useToast()
      </Button>
      <Button color="neutral" variant="outline" onClick={notifySyncDone}>
        toast()
      </Button>
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
`})))()}var Y,X,Z,Q;function $(){return($=e((()=>{m(),v(),x(),C(),T(),D(),k(),M(),P(),I(),R(),B(),H(),W(),K(),J(),t(),te(),ne(),de(),se(),pe(),Y=n(),X=ue(Object.assign({"./demos/action.tsx":me,"./demos/basic.tsx":he,"./demos/colors.tsx":ge,"./demos/dedupe.tsx":_e,"./demos/keyboard.tsx":ve,"./demos/loading.tsx":ye,"./demos/options.tsx":be,"./demos/scoped.tsx":Se}),Object.assign({"./demos/action.tsx":N,"./demos/basic.tsx":F,"./demos/colors.tsx":L,"./demos/dedupe.tsx":z,"./demos/keyboard.tsx":V,"./demos/loading.tsx":U,"./demos/options.tsx":G,"./demos/scoped.tsx":q})),Z=`// Inside a component: follows the nearest ConfigProvider scope
function SaveButton() {
  const toast = useToast();
  return <Button onClick={() => toast.success("Saved")}>Save</Button>;
}

// Outside React (API client, event bus, store...): root scope
import { toast } from "minerva-design";
apiClient.onError((error) => toast.danger(error.message));`,Q=()=>{let{t:e}=ee(),t=(0,Y.jsxs)(`section`,{className:f.section,"aria-labelledby":`when-to-use`,children:[(0,Y.jsx)(`h2`,{id:`when-to-use`,children:e(`docs.toast.usage.title`)}),(0,Y.jsxs)(`ul`,{className:f.prose,children:[(0,Y.jsx)(`li`,{children:e(`docs.toast.usage.hook`)}),(0,Y.jsx)(`li`,{children:e(`docs.toast.usage.function`)}),(0,Y.jsx)(`li`,{children:e(`docs.toast.usage.modal`)})]}),(0,Y.jsx)(re,{code:Z,language:`tsx`})]});return(0,Y.jsx)(fe,{id:`toast`,demos:X,intro:t})}})))()}$();export{Q as default};