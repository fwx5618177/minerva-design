import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{Dt as a,Ot as o}from"./io5-CvrBnF9y.js";import{n as s,t as c}from"./Alert-DLn7brCp.js";import{n as l,t as u}from"./CodeBlock-Bfhf7f9G.js";import{i as d,r as f}from"./DemoBlock-3GMi3Uss.js";import{n as p,t as m}from"./DocPage-DCMfehF7.js";var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{t(),s(),a(),r(),l(),p(),d(),h=n(),g=`pnpm add minerva-design`,_=`npm install minerva-design`,v=`yarn add minerva-design`,y=`// src/main.tsx — the only place that imports Minerva's CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "minerva-design/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`,b=`// app/layout.tsx — global CSS belongs in the root layout
import type { ReactNode } from "react";
import "minerva-design/style.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,x=`// src/main.ts — register the elements and load the design tokens, once
import "minerva-design/web-components";
import "minerva-design/tokens.css";`,S=`// any component file: import the component only, no CSS
import { Tag } from "minerva-design";`,C=`// optional, in your own .scss: long-form typography mixins
@use "minerva-design/prose.scss" as prose;`,w=`// src/main.tsx — optional, instead of "minerva-design/style.css":
import "minerva-design/styles/tokens.css"; // design tokens, once
import "minerva-design/styles/button.css";
import "minerva-design/styles/input.css";
import "minerva-design/styles/modal.css";`,T=`pnpm add @monaco-editor/react monaco-editor`,E=`import { MonacoCodeEditor } from "minerva-design/monaco";`,D=`import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, ToastProvider, toast } from "minerva-design";
import "minerva-design/style.css";

function App() {
  return (
    // theme: "auto" (default) | "light" | "dark" | "github-dark" | custom
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      {/* renders toast() calls inside the theme scope */}
      <ToastProvider>
        <Button color="primary" onClick={() => toast.success("Hello!")}>
          Say hello
        </Button>
      </ToastProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);`,O=`# the same package: the Web Components need no React
pnpm add minerva-design`,k=`// every element at once...
import "minerva-design/web-components";
// ...or only the elements you use (each entry registers one element and its parts)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";`,A=`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"><\/script>`,j=`// React 19 JSX (global.d.ts)
/// <reference types="minerva-design/web-components/react" />
// Svelte: ".../svelte", Solid: ".../solid"
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types`,M=`import { themes } from "minerva-design";
import type { ButtonProps, ComponentTheme } from "minerva-design";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { color: "success", size: "large" };

// themes are typed too: missing or misspelled tokens are compile errors
const brand: ComponentTheme = { ...themes.light, "primary-color": "#7c3aed" };`,N=()=>{let{t:e}=o(),t=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c,{color:`warning`,title:e(`docs.installation.migration.title`),role:`alert`,children:e(`docs.installation.migration.text`)}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`requirements`,children:[(0,h.jsx)(`h2`,{id:`requirements`,children:e(`docs.installation.requirements.title`)}),(0,h.jsxs)(`ul`,{children:[(0,h.jsx)(`li`,{children:e(`docs.installation.requirements.react`)}),(0,h.jsx)(`li`,{children:e(`docs.installation.requirements.bundler`)}),(0,h.jsx)(`li`,{children:e(`docs.installation.requirements.browsers`)})]})]}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`install-core`,children:[(0,h.jsx)(`h2`,{id:`install-core`,children:e(`docs.installation.core.title`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.core.text`)}),(0,h.jsx)(u,{tabs:[{label:`pnpm`,code:g,language:`bash`},{label:`npm`,code:_,language:`bash`},{label:`yarn`,code:v,language:`bash`}]}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.core.peers`)})]}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`global-stylesheet`,children:[(0,h.jsx)(`h2`,{id:`global-stylesheet`,children:e(`docs.installation.styles.title`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.text`)}),(0,h.jsx)(`p`,{className:f.callout,children:e(`docs.installation.styles.note`)}),(0,h.jsx)(`h3`,{id:`stylesheet-vite`,children:e(`docs.installation.styles.vite.title`)}),(0,h.jsx)(u,{code:y,language:`tsx`,title:`src/main.tsx`}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.vite.note`)}),(0,h.jsx)(`h3`,{id:`stylesheet-next`,children:e(`docs.installation.styles.next.title`)}),(0,h.jsx)(u,{code:b,language:`tsx`,title:`app/layout.tsx`}),(0,h.jsxs)(`p`,{className:f.prose,children:[e(`docs.installation.styles.next.note`),` `,(0,h.jsx)(i,{to:`/rsc-guide`,children:e(`docs.installation.optional.rsc`)})]}),(0,h.jsx)(`h3`,{id:`stylesheet-wc`,children:e(`docs.installation.styles.wc.title`)}),(0,h.jsx)(u,{code:x,language:`ts`,title:`src/main.ts`}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.wc.note`)}),(0,h.jsx)(`h3`,{id:`stylesheet-components`,children:e(`docs.installation.styles.components.title`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.components.text`)}),(0,h.jsx)(u,{code:S,language:`tsx`}),(0,h.jsx)(`h3`,{id:`per-component-styles`,children:e(`docs.installation.styles.perComponentTitle`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.perComponent`)}),(0,h.jsx)(u,{code:w,language:`tsx`}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.extras`)}),(0,h.jsx)(u,{code:C,language:`scss`})]}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`optional-entries`,children:[(0,h.jsx)(`h2`,{id:`optional-entries`,children:e(`docs.installation.optional.title`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.optional.text`)}),(0,h.jsx)(u,{code:T,language:`bash`}),(0,h.jsx)(u,{code:E,language:`tsx`}),(0,h.jsx)(`p`,{className:f.prose,children:(0,h.jsx)(i,{to:`/rsc-guide`,children:e(`docs.installation.optional.rsc`)})})]}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`first-app`,children:[(0,h.jsx)(`h2`,{id:`first-app`,children:e(`docs.installation.app.title`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.app.text`)}),(0,h.jsx)(u,{code:D,language:`tsx`}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.app.provider`)})]}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`install-wc`,children:[(0,h.jsx)(`h2`,{id:`install-wc`,children:e(`docs.installation.webComponents.title`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.text`)}),(0,h.jsx)(u,{code:O,language:`bash`}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.entries`)}),(0,h.jsx)(u,{code:k,language:`ts`}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.cdn`)}),(0,h.jsx)(u,{code:A,language:`html`}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.typings`)}),(0,h.jsx)(u,{code:j,language:`ts`}),(0,h.jsx)(`p`,{className:f.prose,children:(0,h.jsx)(i,{to:`/web-components`,children:e(`docs.installation.webComponents.more`)})})]}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`typescript`,children:[(0,h.jsx)(`h2`,{id:`typescript`,children:e(`docs.installation.typescript.title`)}),(0,h.jsx)(`p`,{className:f.prose,children:e(`docs.installation.typescript.text`)}),(0,h.jsx)(u,{code:M,language:`tsx`})]}),(0,h.jsxs)(`section`,{className:f.section,"aria-labelledby":`next-steps`,children:[(0,h.jsx)(`h2`,{id:`next-steps`,children:e(`docs.installation.next.title`)}),(0,h.jsxs)(`div`,{className:f.cardGrid,children:[(0,h.jsxs)(i,{to:`/introduction`,className:f.linkCard,children:[(0,h.jsx)(`strong`,{children:e(`docs.introduction.title`)}),(0,h.jsx)(`span`,{children:e(`docs.installation.next.introduction`)})]}),(0,h.jsxs)(i,{to:`/theming`,className:f.linkCard,children:[(0,h.jsx)(`strong`,{children:e(`docs.theming.title`)}),(0,h.jsx)(`span`,{children:e(`docs.installation.next.theming`)})]}),(0,h.jsxs)(i,{to:`/button`,className:f.linkCard,children:[(0,h.jsx)(`strong`,{children:e(`docs.button.title`)}),(0,h.jsx)(`span`,{children:e(`docs.installation.next.components`)})]})]})]})]});return(0,h.jsx)(m,{id:`installation`,intro:t})}})))()}P();export{N as default};