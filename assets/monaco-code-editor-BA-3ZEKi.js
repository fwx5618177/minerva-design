const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/monaco-Cb0RDX3E.js","assets/rolldown-runtime-B0Z9INg1.js","assets/native-preview-BRFLbKzw.js","assets/angular-preview-l4x8c_2r.js","assets/angular-preview-C5Jw8NN6.js","assets/angular-preview-D4TkZMvb.js","assets/ProgressIndicator-BhPa7d9i.js","assets/progressIndicator.module.scss-7dRYy1Kl.js","assets/dataAttributes-CDHeJa9q.js","assets/ConfigProvider-DZkhWQzR.js","assets/monacoCodeEditor.module.scss-BDC5AoLU.js","assets/engine-CyuagcTB.js","assets/monaco-engine-Brb2DQk2.js","assets/monaco-engine-DI_bDgdc.js","assets/monaco-engine-BWwIN3vf.js","assets/monaco-engine-E1tzvcwy.js","assets/monaco-engine-wJzf1aGO.js","assets/monaco-engine-CU78wajI.js","assets/monaco-engine-BbRiPixL.js","assets/monaco-engine-BkMOoRbC.js","assets/monaco-engine-D-3spfJQ.js","assets/monaco-engine-Cmolsdsg.js","assets/monaco-engine-DmnaZnvK.js","assets/monaco-engine-C0iCSpLB.js","assets/monaco-engine-DhaDnnbF.js","assets/monaco-engine-Mf75QLBh.js","assets/monaco-engine-sSCY0URy.css","assets/monaco-engine-D39yyjwm.css","assets/monaco-engine-VGNzxeVh.css","assets/monaco-engine-BeQZ53F5.js","assets/monaco-engine-PMdj0iu5.css","assets/monaco-engine-jt3SqIi3.css","assets/monaco-engine-BmHmrlSo.js","assets/monaco-engine-DYT8Vzym.js","assets/angular-preview-DOigT0Hs.js","assets/monaco-engine-EuRug2Pk.js","assets/monaco-engine-BizV0Jh1.js","assets/monaco-engine-hfY4I5B5.js","assets/monaco-engine-OLk5mznz.js","assets/monaco-engine-B1VdyB9Q.css","assets/monaco-engine-nXZs1I9G.js","assets/monaco-engine-CGlZGCbA.css","assets/monaco-engine-YeUeWD1w.css","assets/monaco-engine-CYNHQSph.js","assets/monaco-engine-D7WTepIa.js","assets/monaco-engine-0TjAt57z.js","assets/monaco-engine-Dod_7K5-.js","assets/monaco-engine-DjkGWYaY.js","assets/monaco-engine-CfRhgr0R.css","assets/monaco-engine-BNpQG2uU.js","assets/monaco-engine-dXFam9gk.css","assets/monaco-engine-0A84Z1qe.css","assets/monaco-engine-DJPlimjL.js","assets/monaco-engine-D8sixQkX.css","assets/monaco-engine-HBEXS-6R.css","assets/monaco-engine-4G8xK6-e.css","assets/monaco-engine-DcFTlG0o.css","assets/monaco-engine-8abbCoA5.js","assets/monaco-engine-DQUu-T8p.js","assets/monaco-engine-DZrmUXlO.js","assets/monaco-engine-Buom4OEt.js","assets/monaco-engine-DCoCMNNL.js","assets/monaco-engine-CQwDAmTo.css","assets/monaco-engine-C2KGlji2.js","assets/monaco-engine-uPAAwZJh.css","assets/monaco-engine-CxFEix49.js","assets/monaco-engine-DnvFQ7hy.css","assets/monaco-engine-DQ8RDiSK.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./angular-preview-DOigT0Hs.js";import{l as a,n as o,t as s,u as c}from"./DocPage-BoAp0gXb.js";function l(){let[e,t]=(0,u.useState)(`<h1>Hello</h1>
<p>Edit me.</p>
`);return(0,d.jsx)(u.Suspense,{fallback:(0,d.jsx)(`p`,{children:`Loading editor…`}),children:(0,d.jsx)(f,{label:`HTML source`,language:`html`,value:e,onChange:t,height:240})})}var u,d,f;function p(){return(p=e((()=>{u=t(),d=n(),r(),f=(0,u.lazy)(async()=>{let{MonacoCodeEditor:e}=await i(async()=>{let{MonacoCodeEditor:e}=await import(`./monaco-Cb0RDX3E.js`);return{MonacoCodeEditor:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])),t=await i(()=>import(`./engine-CyuagcTB.js`).then(e=>e.monaco,()=>void 0),__vite__mapDeps([11,1,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67]));return{default:n=>(0,d.jsx)(e,{...n,monaco:t})}})})))()}var m;function h(){return(h=e((()=>{m=`import { lazy, Suspense, useState } from "react";
import type { MonacoCodeEditorProps } from "minerva-design/monaco";

type EditorProps = Omit<MonacoCodeEditorProps, "monaco">;

// The editor and the local Monaco engine load on demand, in their own chunks.
const Editor = lazy(async () => {
  const { MonacoCodeEditor } = await import("minerva-design/monaco");
  // (A failed chunk load rejects here; wrap the Suspense in an error
  // boundary in apps that must survive it.)
  // If the engine cannot load (offline build, blocked worker...), the editor
  // degrades to its editable textarea fallback.
  const engine = await import("../engine").then(
    (m) => m.monaco,
    () => undefined,
  );
  return {
    default: (props: EditorProps) => (
      <MonacoCodeEditor
        {...props}
        monaco={engine as unknown as MonacoCodeEditorProps["monaco"]}
      />
    ),
  };
});

export default function BasicDemo() {
  const [html, setHtml] = useState("<h1>Hello</h1>\\n<p>Edit me.</p>\\n");
  return (
    <Suspense fallback={<p>Loading editor…</p>}>
      <Editor
        label="HTML source"
        language="html"
        value={html}
        onChange={setHtml}
        height={240}
      />
    </Suspense>
  );
}
`})))()}var g,_,v,y;function b(){return(b=e((()=>{p(),h(),t(),o(),c(),g=n(),_=`import { MonacoCodeEditor } from "minerva-design/monaco";`,v=a(Object.assign({"./demos/basic.tsx":l}),Object.assign({"./demos/basic.tsx":m})),y=()=>(0,g.jsx)(s,{id:`monaco-code-editor`,demos:v,importCode:_})})))()}b();export{y as default};