import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{F as r,Mn as i,r as a,rt as o}from"./angular-preview-B7Uzpk8P.js";import{B as s,R as c,V as l,z as u}from"./ProgressIndicator-CLQ5GhV8.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{St as f,xt as p}from"./io5-BsjRfO9T.js";import{n as m,t as h}from"./flashcard.module.scss-ilFvQemh.js";import{l as g,n as _,t as v,u as y}from"./DocPage-7MIpr1Mz.js";var b,x,S,C;function w(){return(w=e((()=>{i(),l(),f(),h(),b=t(),x=n(),r(),S=e=>e!=null&&e!==!1&&e!==``,C=({front:e,back:t,footer:n,frontLabel:r,backLabel:i,hint:c,showHint:l=!1,flipped:u,defaultFlipped:f=!1,onFlippedChange:h,flipOnClick:g=!0,disabled:_=!1,axis:v=`y`,variant:y=`elevated`,size:C=`medium`,minHeight:w=`12rem`,"aria-label":T,className:E,ref:D})=>{let{t:O}=s(),k=(0,b.useId)(),[A,j]=p({value:u,defaultValue:f,onChange:h,name:`Flashcard`,prop:`flipped`}),M=g&&!_,N=r===void 0?O(`flashcard.frontLabel`):r,P=i===void 0?O(`flashcard.backLabel`):i,F=A?P:N,I=typeof F==`string`&&F?F:O(A?`flashcard.backLabel`:`flashcard.frontLabel`),L=c===void 0?O(`flashcard.hint`):c,R=()=>{M&&j(!A)},z=e=>{a(e.nativeEvent,e.currentTarget)||R()},B=e=>{e.target===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),e.repeat||R())},V=typeof w==`number`?`${w}px`:w,H=n=>{let r=n===`back`,i=r?!A:A,a=r?P:N;return(0,x.jsxs)(`div`,{className:o(m.face,m[n]),...d(`flashcard`,n),"aria-hidden":i||void 0,inert:i,"aria-live":r?`polite`:void 0,"aria-atomic":r?!0:void 0,children:[S(a)?(0,x.jsx)(`span`,{className:m.label,...d(`flashcard`,`label`),children:a}):null,(0,x.jsx)(`div`,{id:`${k}-${n}`,className:m.content,children:r?t:e}),!r&&l&&g&&S(L)?(0,x.jsx)(`span`,{className:m.hint,...d(`flashcard`,`hint`),children:L}):null]})};return(0,x.jsxs)(`div`,{ref:D,className:o(m.flashcard,m[y],m[C],v===`x`&&m.axisX,A&&m.flipped,_&&m.disabled,E),style:{"--flashcard-min-height":V},...d(`flashcard`,`root`,{state:A?`active`:`inactive`,disabled:_,variant:y,size:C}),children:[(0,x.jsx)(`div`,{className:o(m.card,g&&m.interactive),...g?{role:`button`,tabIndex:_?-1:0,"aria-pressed":A,"aria-disabled":_||void 0,onClick:z,onKeyDown:B}:{role:`group`},"aria-label":T??O(`flashcard.label`,{face:I}),"aria-describedby":`${k}-${A?`back`:`front`}`,...d(`flashcard`,`card`,{state:A?`active`:`inactive`,disabled:_}),children:(0,x.jsxs)(`div`,{className:m.inner,children:[H(`front`),H(`back`)]})}),S(n)?(0,x.jsx)(`div`,{className:m.footer,...d(`flashcard`,`footer`),children:n}):null]})}})))()}function T(){return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fill, minmax(200px, 1fr))`},children:[(0,E.jsx)(C,{variant:`elevated`,front:`elevated · axis y`,back:`Flips horizontally`,minHeight:140}),(0,E.jsx)(C,{variant:`outline`,axis:`x`,front:`outline · axis x`,back:`Flips vertically`,minHeight:140}),(0,E.jsx)(C,{variant:`filled`,size:`small`,front:`filled · small`,back:`Less padding, smaller type`,minHeight:140}),(0,E.jsx)(C,{size:`large`,front:`large`,back:(0,E.jsx)(E.Fragment,{children:`The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides.`}),minHeight:140})]})}var E;function D(){return(D=e((()=>{w(),E=n()})))()}function O(){return(0,k.jsx)(`div`,{style:{maxWidth:420},children:(0,k.jsx)(C,{front:`What is the capital of Australia?`,back:`Canberra`,showHint:!0})})}var k;function A(){return(A=e((()=>{w(),k=n()})))()}function j(){let[e,t]=(0,M.useState)(0),[n,r]=(0,M.useState)(!1),[i,a]=(0,M.useState)([]),o=P[e],s=e=>{a(t=>[...t,`${o.front}: ${e}`].slice(-3)),r(!1),t(e=>(e+1)%P.length)};return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:420},children:[(0,N.jsx)(C,{front:(0,N.jsx)(`strong`,{style:{fontSize:`1.5rem`},children:o.front}),back:o.back,frontLabel:`Card ${e+1} / ${P.length}`,backLabel:`Definition`,flipped:n,onFlippedChange:r,footer:n?F.map(e=>(0,N.jsx)(u,{size:`small`,variant:e===`Good`?`solid`:`outline`,onClick:()=>s(e),children:e},e)):(0,N.jsx)(u,{size:`small`,onClick:()=>r(!0),children:`Show answer`})}),(0,N.jsx)(`output`,{style:{fontSize:13},children:i.length?i.join(` · `):`Flip the card, then rate it.`})]})}var M,N,P,F;function I(){return(I=e((()=>{M=t(),c(),w(),N=n(),P=[{front:`ephemeral`,back:`Lasting for a very short time`},{front:`ubiquitous`,back:`Present, appearing or found everywhere`},{front:`laconic`,back:`Using very few words`}],F=[`Again`,`Hard`,`Good`,`Easy`]})))()}function L(){let[e,t]=(0,R.useState)(!1);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`},children:[(0,z.jsx)(C,{front:`Disabled`,back:`Never shown by a click`,disabled:!0,minHeight:140}),(0,z.jsx)(C,{front:`flipOnClick={false}`,back:`Flipped by the button below`,flipOnClick:!1,flipped:e,frontLabel:null,backLabel:null,minHeight:140,footer:(0,z.jsx)(u,{size:`small`,onClick:()=>t(e=>!e),children:e?`Hide answer`:`Reveal answer`})})]})}var R,z;function B(){return(B=e((()=>{R=t(),c(),w(),z=n()})))()}var V;function H(){return(H=e((()=>{V=`import { Flashcard } from "minerva-design";

export default function AxisVariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
    >
      <Flashcard
        variant="elevated"
        front="elevated · axis y"
        back="Flips horizontally"
        minHeight={140}
      />
      <Flashcard
        variant="outline"
        axis="x"
        front="outline · axis x"
        back="Flips vertically"
        minHeight={140}
      />
      <Flashcard
        variant="filled"
        size="small"
        front="filled · small"
        back="Less padding, smaller type"
        minHeight={140}
      />
      <Flashcard
        size="large"
        front="large"
        back={
          <>
            The card grows to fit the taller face: this answer is much longer
            than the question, and the card height follows it on both sides.
          </>
        }
        minHeight={140}
      />
    </div>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { Flashcard } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Flashcard
        front="What is the capital of Australia?"
        back="Canberra"
        showHint
      />
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useState } from "react";
import { Button, Flashcard } from "minerva-design";

const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"] as const;

export default function ControlledDemo() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const card = deck[index];

  const rate = (rating: (typeof ratings)[number]) => {
    setLog((prev) => [...prev, \`\${card.front}: \${rating}\`].slice(-3));
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <Flashcard
        front={<strong style={{ fontSize: "1.5rem" }}>{card.front}</strong>}
        back={card.back}
        frontLabel={\`Card \${index + 1} / \${deck.length}\`}
        backLabel="Definition"
        flipped={flipped}
        onFlippedChange={setFlipped}
        footer={
          flipped ? (
            ratings.map((rating) => (
              <Button
                key={rating}
                size="small"
                variant={rating === "Good" ? "solid" : "outline"}
                onClick={() => rate(rating)}
              >
                {rating}
              </Button>
            ))
          ) : (
            <Button size="small" onClick={() => setFlipped(true)}>
              Show answer
            </Button>
          )
        }
      />
      <output style={{ fontSize: 13 }}>
        {log.length ? log.join(" · ") : "Flip the card, then rate it."}
      </output>
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useState } from "react";
import { Button, Flashcard } from "minerva-design";

export default function ReducedDisabledDemo() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      }}
    >
      <Flashcard
        front="Disabled"
        back="Never shown by a click"
        disabled
        minHeight={140}
      />
      <Flashcard
        front="flipOnClick={false}"
        back="Flipped by the button below"
        flipOnClick={false}
        flipped={flipped}
        frontLabel={null}
        backLabel={null}
        minHeight={140}
        footer={
          <Button size="small" onClick={() => setFlipped((f) => !f)}>
            {flipped ? "Hide answer" : "Reveal answer"}
          </Button>
        }
      />
    </div>
  );
}
`})))()}var Y,X,Z;function Q(){return(Q=e((()=>{D(),A(),I(),B(),H(),W(),K(),J(),t(),_(),y(),Y=n(),X=g(Object.assign({"./demos/axis-variants.tsx":T,"./demos/basic.tsx":O,"./demos/controlled.tsx":j,"./demos/reduced-disabled.tsx":L}),Object.assign({"./demos/axis-variants.tsx":V,"./demos/basic.tsx":U,"./demos/controlled.tsx":G,"./demos/reduced-disabled.tsx":q})),Z=()=>(0,Y.jsx)(v,{id:`flashcard`,demos:X})})))()}Q();export{Z as default};