import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{H as r,M as ee,i as te,n as i,r as ne,z as re}from"./io5-CqGZWNm2.js";import{R as a,z as o}from"./ProgressIndicator-BhPa7d9i.js";import{n as ie,t as ae}from"./Input-UDQ86mkQ.js";import{i as s,n as oe,r as c}from"./Stack-CiM4m4jI.js";import{l as se,n as ce,t as le,u as ue}from"./DocPage-BoAp0gXb.js";function de(){let[e,t]=(0,l.useState)(0);return(0,u.jsxs)(s,{gap:3,wrap:!0,children:[(0,u.jsx)(o,{onClick:()=>t(e=>e+1),children:`Click me`}),(0,u.jsxs)(`output`,{"aria-live":`polite`,children:[`Clicked `,e,` times`]})]})}var l,u;function d(){return(d=e((()=>{l=t(),a(),c(),u=n()})))()}function fe(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(o,{color:`primary`,children:`Primary`}),(0,f.jsx)(o,{color:`neutral`,children:`Neutral`}),(0,f.jsx)(o,{color:`success`,children:`Success`}),(0,f.jsx)(o,{color:`warning`,children:`Warning`}),(0,f.jsx)(o,{color:`danger`,children:`Danger`}),(0,f.jsx)(o,{color:`info`,children:`Info`})]})}var f;function p(){return(p=e((()=>{a(),f=n()})))()}function pe(){let[e,t]=(0,m.useState)(`Nothing yet`);return(0,h.jsxs)(`form`,{onSubmit:e=>{e.preventDefault();let n=new FormData(e.currentTarget).get(`title`);t(`Submitted "${String(n)}"`)},onReset:()=>t(`Reset`),style:{display:`flex`,flexWrap:`wrap`,gap:8,alignItems:`center`},children:[(0,h.jsx)(ie,{name:`title`,"aria-label":`Title`,defaultValue:`Draft`}),(0,h.jsx)(o,{color:`neutral`,variant:`outline`,onClick:()=>t(`Preview opened (form not submitted)`),children:`Preview`}),(0,h.jsx)(o,{type:`reset`,color:`neutral`,variant:`ghost`,children:`Reset`}),(0,h.jsx)(o,{type:`submit`,children:`Save`}),(0,h.jsx)(`output`,{style:{flexBasis:`100%`},children:e})]})}var m,h;function g(){return(g=e((()=>{m=t(),a(),ae(),h=n()})))()}function me(){let[e,t]=(0,_.useState)(!1);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:320},children:[(0,v.jsx)(o,{startIcon:(0,v.jsx)(i,{"aria-hidden":!0}),children:`Add item`}),(0,v.jsx)(o,{variant:`outline`,endIcon:(0,v.jsx)(te,{"aria-hidden":!0}),children:`Continue`}),(0,v.jsx)(o,{color:`success`,fullWidth:!0,loading:e,loadingText:`Saving...`,onClick:()=>{t(!0),setTimeout(()=>t(!1),1500)},children:`Save`})]})}var _,v;function y(){return(y=e((()=>{_=t(),a(),r(),v=n()})))()}function he(){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{shape:`square`,children:`Square`}),(0,b.jsx)(o,{shape:`rounded`,children:`Rounded`}),(0,b.jsx)(o,{shape:`circle`,"aria-label":`Add`,children:`+`}),(0,b.jsx)(o,{borderRadius:`none`,children:`No radius`}),(0,b.jsx)(o,{borderRadius:12,children:`12px radius`})]})}var b;function x(){return(x=e((()=>{a(),b=n()})))()}function ge(){return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{size:`xsmall`,children:`XSmall`}),(0,S.jsx)(o,{size:`small`,children:`Small`}),(0,S.jsx)(o,{size:`medium`,children:`Medium`}),(0,S.jsx)(o,{size:`large`,children:`Large`}),(0,S.jsx)(o,{size:`xlarge`,children:`XLarge`})]})}var S;function C(){return(C=e((()=>{a(),S=n()})))()}function _e(){let[e,t]=(0,w.useState)(!1);return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{loading:e,onClick:()=>{t(!0),setTimeout(()=>t(!1),1500)},children:e?`Saving…`:`Save`}),(0,T.jsx)(o,{disabled:!0,children:`Disabled`}),(0,T.jsx)(o,{active:!0,children:`Active`})]})}var w,T;function E(){return(E=e((()=>{w=t(),a(),T=n()})))()}function ve(){return(0,D.jsx)(oe,{gap:3,children:[`primary`,`neutral`,`danger`].map(e=>(0,D.jsx)(s,{gap:2,wrap:!0,children:O.map(t=>(0,D.jsx)(o,{color:e,variant:t,children:t},t))},e))})}var D,O;function k(){return(k=e((()=>{a(),c(),D=n(),O=[`solid`,`outline`,`ghost`,`link`]})))()}function ye(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(o,{startIcon:(0,A.jsx)(i,{"aria-hidden":!0}),children:`Add`}),(0,A.jsx)(o,{color:`danger`,startIcon:(0,A.jsx)(ee,{"aria-hidden":!0}),children:`Retry`}),(0,A.jsx)(o,{color:`neutral`,variant:`ghost`,startIcon:(0,A.jsx)(ne,{"aria-hidden":!0}),children:`Back`}),(0,A.jsx)(o,{color:`danger`,variant:`outline`,"aria-label":`Delete item`,children:(0,A.jsx)(re,{"aria-hidden":!0})})]})}var A;function j(){return(j=e((()=>{a(),r(),A=n()})))()}var M;function N(){return(N=e((()=>{M=`import { useState } from "react";
import { Button, HStack } from "minerva-design";

export default function BasicDemo() {
  const [count, setCount] = useState(0);
  return (
    <HStack gap={3} wrap>
      <Button onClick={() => setCount((value) => value + 1)}>Click me</Button>
      <output aria-live="polite">Clicked {count} times</output>
    </HStack>
  );
}
`})))()}var P;function F(){return(F=e((()=>{P=`import { Button } from "minerva-design";

export default function ColorsDemo() {
  return (
    <>
      <Button color="primary">Primary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="info">Info</Button>
    </>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { useState } from "react";
import { Button, Input } from "minerva-design";

export default function FormDemo() {
  const [log, setLog] = useState("Nothing yet");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const title = new FormData(event.currentTarget).get("title");
        setLog(\`Submitted "\${String(title)}"\`);
      }}
      onReset={() => setLog("Reset")}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
      }}
    >
      <Input name="title" aria-label="Title" defaultValue="Draft" />
      {/* No type: defaults to "button", so it never submits the form */}
      <Button
        color="neutral"
        variant="outline"
        onClick={() => setLog("Preview opened (form not submitted)")}
      >
        Preview
      </Button>
      <Button type="reset" color="neutral" variant="ghost">
        Reset
      </Button>
      <Button type="submit">Save</Button>
      <output style={{ flexBasis: "100%" }}>{log}</output>
    </form>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import { Button } from "minerva-design";
import { IoAdd, IoArrowForward } from "react-icons/io5";

export default function IconsLoadingDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Button startIcon={<IoAdd aria-hidden />}>Add item</Button>
      <Button variant="outline" endIcon={<IoArrowForward aria-hidden />}>
        Continue
      </Button>
      <Button
        color="success"
        fullWidth
        loading={saving}
        loadingText="Saving..."
        onClick={save}
      >
        Save
      </Button>
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { Button } from "minerva-design";

export default function ShapesDemo() {
  return (
    <>
      <Button shape="square">Square</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="circle" aria-label="Add">
        +
      </Button>
      <Button borderRadius="none">No radius</Button>
      <Button borderRadius={12}>12px radius</Button>
    </>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { Button } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Button size="xsmall">XSmall</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">XLarge</Button>
    </>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import { Button } from "minerva-design";

export default function StatesDemo() {
  const [loading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <Button loading={loading} onClick={save}>
        {loading ? "Saving…" : "Save"}
      </Button>
      <Button disabled>Disabled</Button>
      <Button active>Active</Button>
    </>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Button, HStack, VStack } from "minerva-design";

const variants = ["solid", "outline", "ghost", "link"] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {(["primary", "neutral", "danger"] as const).map((color) => (
        <HStack key={color} gap={2} wrap>
          {variants.map((variant) => (
            <Button key={variant} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Button } from "minerva-design";
import { IoAdd, IoArrowBack, IoRefresh, IoTrash } from "react-icons/io5";

export default function WithIconDemo() {
  return (
    <>
      <Button startIcon={<IoAdd aria-hidden />}>Add</Button>
      <Button color="danger" startIcon={<IoRefresh aria-hidden />}>
        Retry
      </Button>
      <Button
        color="neutral"
        variant="ghost"
        startIcon={<IoArrowBack aria-hidden />}
      >
        Back
      </Button>
      <Button color="danger" variant="outline" aria-label="Delete item">
        <IoTrash aria-hidden />
      </Button>
    </>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{d(),p(),g(),y(),x(),C(),E(),k(),j(),N(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),ce(),ue(),X=n(),Z=se(Object.assign({"./demos/basic.tsx":de,"./demos/colors.tsx":fe,"./demos/form.tsx":pe,"./demos/icons-loading.tsx":me,"./demos/shapes.tsx":he,"./demos/sizes.tsx":ge,"./demos/states.tsx":_e,"./demos/variants.tsx":ve,"./demos/with-icon.tsx":ye}),Object.assign({"./demos/basic.tsx":M,"./demos/colors.tsx":P,"./demos/form.tsx":I,"./demos/icons-loading.tsx":R,"./demos/shapes.tsx":B,"./demos/sizes.tsx":H,"./demos/states.tsx":W,"./demos/variants.tsx":K,"./demos/with-icon.tsx":J})),Q=()=>(0,X.jsx)(le,{id:`button`,demos:Z})})))()}$();export{Q as default};