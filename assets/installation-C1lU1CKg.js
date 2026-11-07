import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-DxNxqLAt.js";import{n as a,t as o}from"./useTranslation-B0qPOCL4.js";import{n as s,t as c}from"./Alert-C6APEdS0.js";import{n as l,t as u}from"./CodeBlock-CBYTg-l3.js";import{i as d,r as f}from"./DemoBlock-wJsKBAzK.js";import{n as p,t as m}from"./package-DZFGPf9j.js";import{n as h,t as g}from"./DocPage-NsvUwyMh.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{m(),t(),s(),o(),r(),l(),h(),d(),_=n(),v=`pnpm add minerva-design`,y=`npm install minerva-design`,b=`yarn add minerva-design`,x=`// src/main.tsx — the only place that imports Minerva's CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "minerva-design/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`,S=`// app/layout.tsx — global CSS belongs in the root layout
import type { ReactNode } from "react";
import "minerva-design/style.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,C=`// src/main.ts — register the elements and load the design tokens, once
import "minerva-design/web-components";
import "minerva-design/tokens.css";`,w=`// any component file: import the component only, no CSS
import { Tag } from "minerva-design";`,T=`// optional, in your own .scss: long-form typography mixins
@use "minerva-design/prose.scss" as prose;`,E=`// src/main.tsx — optional, instead of "minerva-design/style.css":
import "minerva-design/styles/tokens.css"; // design tokens, once
import "minerva-design/styles/button.css";
import "minerva-design/styles/input.css";
import "minerva-design/styles/modal.css";`,D=`pnpm add @monaco-editor/react monaco-editor`,O=`import { MonacoCodeEditor } from "minerva-design/monaco";`,k=`import { createRoot } from "react-dom/client";
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

createRoot(document.getElementById("root")!).render(<App />);`,A=`# the same package: the Web Components need no React
pnpm add minerva-design`,j=`// every element at once...
import "minerva-design/web-components";
// ...or only the elements you use (each entry registers one element and its parts)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";`,M=`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@${p}/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@${p}/dist/web-components/cdn/minerva.js"><\/script>`,N=`// React 19 JSX (global.d.ts)
/// <reference types="minerva-design/web-components/react" />
// Svelte: ".../svelte", Solid: ".../solid"
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types`,P=`import { themes } from "minerva-design";
import type { ButtonProps, ComponentTheme } from "minerva-design";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { color: "success", size: "large" };

// themes are typed too: missing or misspelled tokens are compile errors
const brand: ComponentTheme = { ...themes.light, "primary-color": "#7c3aed" };`,F=()=>{let{t:e}=a(),t=(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(c,{color:`warning`,title:e(`docs.installation.migration.title`),role:`alert`,children:e(`docs.installation.migration.text`)}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`requirements`,children:[(0,_.jsx)(`h2`,{id:`requirements`,children:e(`docs.installation.requirements.title`)}),(0,_.jsxs)(`ul`,{children:[(0,_.jsx)(`li`,{children:e(`docs.installation.requirements.react`)}),(0,_.jsx)(`li`,{children:e(`docs.installation.requirements.bundler`)}),(0,_.jsx)(`li`,{children:e(`docs.installation.requirements.browsers`)})]})]}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`install-core`,children:[(0,_.jsx)(`h2`,{id:`install-core`,children:e(`docs.installation.core.title`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.core.text`)}),(0,_.jsx)(u,{tabs:[{label:`pnpm`,code:v,language:`bash`},{label:`npm`,code:y,language:`bash`},{label:`yarn`,code:b,language:`bash`}]}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.core.peers`)})]}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`global-stylesheet`,children:[(0,_.jsx)(`h2`,{id:`global-stylesheet`,children:e(`docs.installation.styles.title`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.text`)}),(0,_.jsx)(`p`,{className:f.callout,children:e(`docs.installation.styles.note`)}),(0,_.jsx)(`h3`,{id:`stylesheet-vite`,children:e(`docs.installation.styles.vite.title`)}),(0,_.jsx)(u,{code:x,language:`tsx`,title:`src/main.tsx`}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.vite.note`)}),(0,_.jsx)(`h3`,{id:`stylesheet-next`,children:e(`docs.installation.styles.next.title`)}),(0,_.jsx)(u,{code:S,language:`tsx`,title:`app/layout.tsx`}),(0,_.jsxs)(`p`,{className:f.prose,children:[e(`docs.installation.styles.next.note`),` `,(0,_.jsx)(i,{to:`/rsc-guide`,children:e(`docs.installation.optional.rsc`)})]}),(0,_.jsx)(`h3`,{id:`stylesheet-wc`,children:e(`docs.installation.styles.wc.title`)}),(0,_.jsx)(u,{code:C,language:`ts`,title:`src/main.ts`}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.wc.note`)}),(0,_.jsx)(`h3`,{id:`stylesheet-components`,children:e(`docs.installation.styles.components.title`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.components.text`)}),(0,_.jsx)(u,{code:w,language:`tsx`}),(0,_.jsx)(`h3`,{id:`per-component-styles`,children:e(`docs.installation.styles.perComponentTitle`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.perComponent`)}),(0,_.jsx)(u,{code:E,language:`tsx`}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.styles.extras`)}),(0,_.jsx)(u,{code:T,language:`scss`})]}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`optional-entries`,children:[(0,_.jsx)(`h2`,{id:`optional-entries`,children:e(`docs.installation.optional.title`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.optional.text`)}),(0,_.jsx)(u,{code:D,language:`bash`}),(0,_.jsx)(u,{code:O,language:`tsx`}),(0,_.jsx)(`p`,{className:f.prose,children:(0,_.jsx)(i,{to:`/rsc-guide`,children:e(`docs.installation.optional.rsc`)})})]}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`first-app`,children:[(0,_.jsx)(`h2`,{id:`first-app`,children:e(`docs.installation.app.title`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.app.text`)}),(0,_.jsx)(u,{code:k,language:`tsx`}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.app.provider`)})]}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`install-wc`,children:[(0,_.jsx)(`h2`,{id:`install-wc`,children:e(`docs.installation.webComponents.title`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.text`)}),(0,_.jsx)(u,{code:A,language:`bash`}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.entries`)}),(0,_.jsx)(u,{code:j,language:`ts`}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.cdn`)}),(0,_.jsx)(u,{code:M,language:`html`}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.webComponents.typings`)}),(0,_.jsx)(u,{code:N,language:`ts`}),(0,_.jsx)(`p`,{className:f.prose,children:(0,_.jsx)(i,{to:`/web-components`,children:e(`docs.installation.webComponents.more`)})})]}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`typescript`,children:[(0,_.jsx)(`h2`,{id:`typescript`,children:e(`docs.installation.typescript.title`)}),(0,_.jsx)(`p`,{className:f.prose,children:e(`docs.installation.typescript.text`)}),(0,_.jsx)(u,{code:P,language:`tsx`})]}),(0,_.jsxs)(`section`,{className:f.section,"aria-labelledby":`next-steps`,children:[(0,_.jsx)(`h2`,{id:`next-steps`,children:e(`docs.installation.next.title`)}),(0,_.jsxs)(`div`,{className:f.cardGrid,children:[(0,_.jsxs)(i,{to:`/introduction`,className:f.linkCard,children:[(0,_.jsx)(`strong`,{children:e(`docs.introduction.title`)}),(0,_.jsx)(`span`,{children:e(`docs.installation.next.introduction`)})]}),(0,_.jsxs)(i,{to:`/theming`,className:f.linkCard,children:[(0,_.jsx)(`strong`,{children:e(`docs.theming.title`)}),(0,_.jsx)(`span`,{children:e(`docs.installation.next.theming`)})]}),(0,_.jsxs)(i,{to:`/button`,className:f.linkCard,children:[(0,_.jsx)(`strong`,{children:e(`docs.button.title`)}),(0,_.jsx)(`span`,{children:e(`docs.installation.next.components`)})]})]})]})]});return(0,_.jsx)(g,{id:`installation`,intro:t})}})))()}I();export{F as default};