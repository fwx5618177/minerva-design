import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BhPa7d9i.js";import{n as a,t as o}from"./Input-gaYbdyz5.js";import{a as s,c,i as l,l as u,n as d,o as f,r as p,s as m,t as h}from"./Modal-CoYSbOrd.js";import{a as g,r as _}from"./FormControl-BkwPT394.js";import{l as v,n as y,t as b,u as x}from"./DocPage-D-H5cPcd.js";function S(){let[e,t]=(0,C.useState)(!1),[n,r]=(0,C.useState)(!1);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(i,{onClick:()=>t(!0),children:`Delete record`}),n&&(0,w.jsx)(`p`,{role:`status`,children:`Record deleted`}),(0,w.jsxs)(d,{open:e,onOpenChange:t,title:`Delete this record?`,description:`The record and its history are removed permanently.`,size:`small`,children:[(0,w.jsx)(c,{children:`Other team members lose access immediately.`}),(0,w.jsxs)(u,{children:[(0,w.jsx)(i,{color:`neutral`,variant:`outline`,onClick:()=>t(!1),children:`Cancel`}),(0,w.jsx)(i,{color:`danger`,onClick:()=>{r(!0),t(!1)},children:`Delete`})]})]})]})}var C,w;function T(){return(T=e((()=>{C=t(),r(),s(),w=n()})))()}function E(){return(0,D.jsxs)(m,{children:[(0,D.jsx)(f,{asChild:!0,children:(0,D.jsx)(i,{color:`neutral`,variant:`outline`,children:`Open compound modal`})}),(0,D.jsxs)(p,{size:`large`,description:`Built from the individual parts.`,children:[(0,D.jsx)(h,{children:`Workspace settings`}),(0,D.jsx)(c,{children:`Compose header, body and footer freely.`}),(0,D.jsx)(u,{children:(0,D.jsx)(l,{asChild:!0,children:(0,D.jsx)(i,{children:`Done`})})})]})]})}var D;function O(){return(O=e((()=>{r(),s(),D=n()})))()}function k(){let[e,t]=(0,A.useState)(!1),[n,r]=(0,A.useState)(`Quarterly report`);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(i,{onClick:()=>t(!0),children:[`Rename “`,n,`”`]}),(0,j.jsx)(d,{open:e,onOpenChange:t,title:`Rename document`,children:(0,j.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),r(new FormData(e.currentTarget).get(`name`)),t(!1)},children:[(0,j.jsx)(c,{children:(0,j.jsx)(_,{label:`Name`,children:(0,j.jsx)(a,{name:`name`,defaultValue:n})})}),(0,j.jsx)(u,{children:(0,j.jsx)(i,{type:`submit`,children:`Save`})})]})})]})}var A,j;function M(){return(M=e((()=>{A=t(),r(),o(),g(),s(),j=n()})))()}function N(){return(0,P.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:F.map(e=>(0,P.jsx)(d,{size:e,title:`Size: ${e}`,trigger:(0,P.jsx)(i,{color:`neutral`,variant:`outline`,children:e}),children:(0,P.jsx)(c,{children:`On narrow screens every size becomes a bottom sheet.`})},e))})}var P,F;function I(){return(I=e((()=>{r(),s(),P=n(),F=[`small`,`medium`,`large`,`xlarge`,`full`]})))()}function L(){return(0,R.jsx)(d,{trigger:(0,R.jsx)(i,{color:`neutral`,variant:`outline`,children:`Show details`}),title:`Release notes`,children:(0,R.jsx)(c,{children:`Version 2.0 adds dialogs, drawers and a command palette. Close with the × button, Escape or a click on the backdrop.`})})}var R;function z(){return(z=e((()=>{r(),s(),R=n()})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "minerva-design";

export default function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete record</Button>
      {deleted && <p role="status">Record deleted</p>}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Delete this record?"
        description="The record and its history are removed permanently."
        size="small"
      >
        <ModalBody>Other team members lose access immediately.</ModalBody>
        <ModalFooter>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setDeleted(true);
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import {
  Button,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "minerva-design";

export default function CompoundDemo() {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button color="neutral" variant="outline">
          Open compound modal
        </Button>
      </ModalTrigger>
      <ModalContent size="large" description="Built from the individual parts.">
        <ModalHeader>Workspace settings</ModalHeader>
        <ModalBody>Compose header, body and footer freely.</ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button>Done</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import {
  Button,
  Input,
  FormField,
  Modal,
  ModalBody,
  ModalFooter,
} from "minerva-design";

export default function FormDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Quarterly report");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Rename “{name}”</Button>
      <Modal open={open} onOpenChange={setOpen} title="Rename document">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setName(new FormData(event.currentTarget).get("name") as string);
            setOpen(false);
          }}
        >
          <ModalBody>
            <FormField label="Name">
              <Input name="name" defaultValue={name} />
            </FormField>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Button, Modal, ModalBody, type ModalSize } from "minerva-design";

const SIZES: ModalSize[] = ["small", "medium", "large", "xlarge", "full"];

export default function SizesDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {SIZES.map((size) => (
        <Modal
          key={size}
          size={size}
          title={\`Size: \${size}\`}
          trigger={
            <Button color="neutral" variant="outline">
              {size}
            </Button>
          }
        >
          <ModalBody>
            On narrow screens every size becomes a bottom sheet.
          </ModalBody>
        </Modal>
      ))}
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Button, Modal, ModalBody } from "minerva-design";

export default function UncontrolledDemo() {
  return (
    <Modal
      trigger={
        <Button color="neutral" variant="outline">
          Show details
        </Button>
      }
      title="Release notes"
    >
      <ModalBody>
        Version 2.0 adds dialogs, drawers and a command palette. Close with the
        × button, Escape or a click on the backdrop.
      </ModalBody>
    </Modal>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{T(),O(),M(),I(),z(),V(),U(),G(),q(),Y(),t(),y(),x(),X=n(),Z=v(Object.assign({"./demos/basic.tsx":S,"./demos/compound.tsx":E,"./demos/form.tsx":k,"./demos/sizes.tsx":N,"./demos/uncontrolled.tsx":L}),Object.assign({"./demos/basic.tsx":B,"./demos/compound.tsx":H,"./demos/form.tsx":W,"./demos/sizes.tsx":K,"./demos/uncontrolled.tsx":J})),Q=()=>(0,X.jsx)(b,{id:`modal`,demos:Z})})))()}$();export{Q as default};