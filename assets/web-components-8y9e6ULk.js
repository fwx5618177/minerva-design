import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{Dt as a,Ot as o}from"./io5-BMMdBk1L.js";import{n as s,t as c}from"./CodeBlock-D9t78HYk.js";import{i as l,r as u}from"./DemoBlock-Df7gWso6.js";import{l as d,n as f,t as p,u as m}from"./DocPage-D-H5cPcd.js";import{r as h}from"./minerva-web-components-B3AuthJ9.js";function g(){let[e,t]=(0,_.useState)(`Ada`),[n,r]=(0,_.useState)(`pro`),[i,a]=(0,_.useState)(!0),[o,s]=(0,_.useState)(``);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:360},children:[(0,v.jsx)(`minerva-input`,{"aria-label":`Name`,value:e,clearable:!0,"onminerva-input":e=>t(e.detail.value)}),(0,v.jsxs)(`minerva-select`,{"aria-label":`Plan`,value:n,"onminerva-change":e=>r(e.detail.value),children:[(0,v.jsx)(`minerva-option`,{value:`free`,children:`Free`}),(0,v.jsx)(`minerva-option`,{value:`pro`,children:`Pro`}),(0,v.jsx)(`minerva-option`,{value:`team`,children:`Team`})]}),(0,v.jsx)(`minerva-switch`,{label:`Email notifications`,checked:i,"onminerva-change":e=>a(e.detail.checked)}),(0,v.jsx)(`minerva-button`,{disabled:!e.trim(),onClick:()=>s(`${e} · ${n} · ${i?`emails on`:`emails off`}`),children:`Save`}),(0,v.jsx)(`output`,{"aria-live":`polite`,children:o||`Nothing saved yet`})]})}var _,v;function y(){return(y=e((()=>{_=t(),h(),v=n()})))()}var b;function x(){return(x=e((()=>{b=`import { useState } from "react";
// Registers every <minerva-*> element (later imports are no-ops). Typings:
// /// <reference types="minerva-design/web-components/react" /> in global.d.ts
import "minerva-design/web-components";

type ValueEvent = CustomEvent<{ value: string }>;
type CheckedEvent = CustomEvent<{ checked: boolean }>;

export default function ReactDemo() {
  const [name, setName] = useState("Ada");
  const [plan, setPlan] = useState("pro");
  const [notify, setNotify] = useState(true);
  const [saved, setSaved] = useState("");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      {/* React 19 sets value / checked / disabled as properties */}
      <minerva-input
        aria-label="Name"
        value={name}
        clearable
        onminerva-input={(e: ValueEvent) => setName(e.detail.value)}
      />
      <minerva-select
        aria-label="Plan"
        value={plan}
        onminerva-change={(e: ValueEvent) => setPlan(e.detail.value)}
      >
        <minerva-option value="free">Free</minerva-option>
        <minerva-option value="pro">Pro</minerva-option>
        <minerva-option value="team">Team</minerva-option>
      </minerva-select>
      <minerva-switch
        label="Email notifications"
        checked={notify}
        onminerva-change={(e: CheckedEvent) => setNotify(e.detail.checked)}
      />
      <minerva-button
        disabled={!name.trim()}
        onClick={() =>
          setSaved(\`\${name} · \${plan} · \${notify ? "emails on" : "emails off"}\`)
        }
      >
        Save
      </minerva-button>
      <output aria-live="polite">{saved || "Nothing saved yet"}</output>
    </div>
  );
}
`})))()}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{y(),x(),t(),a(),r(),s(),f(),l(),m(),S=n(),C=d(Object.assign({"./demos/react.tsx":g}),Object.assign({"./demos/react.tsx":b})),w=`// registers every <minerva-*> element
import "minerva-design/web-components";

// design tokens, once per page / app
import "minerva-design/tokens.css";`,T=`pnpm add minerva-design`,E=`npm install minerva-design`,D=`// main.ts: every element (Vite, webpack, Rspack, esbuild...)
import "minerva-design/web-components";
import "minerva-design/tokens.css";`,O=`// only what you use: each entry registers one element (and its parts,
// e.g. <minerva-option> with <minerva-select>) plus the Minerva elements it renders
import "minerva-design/web-components/button";
import "minerva-design/web-components/select";
import "minerva-design/web-components/modal";`,k=`<!-- no build step: a self-contained ES module (Lit and minerva-design/core included) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"
><\/script>
<!-- unpkg works too: https://unpkg.com/minerva-design@0/dist/web-components/cdn/minerva.js -->`,A=`<!-- attributes: strings, kebab-case; booleans are on when present -->
<minerva-input name="email" type="email" placeholder="you@example.com" clearable required></minerva-input>
<minerva-button color="danger" variant="outline" full-width>Delete</minerva-button>

<script type="module">
  const input = document.querySelector("minerva-input");
  input.value = "ada@example.com"; // properties: camelCase, any type
  input.disabled = true;

  // data (arrays, objects, functions) is set as a property only
  document.querySelector("minerva-select").options = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
<\/script>`,j=`const select = document.querySelector("minerva-select");
const output = document.querySelector("#plan-output");

// committed value change: bubbles and crosses shadow roots (composed)
select.addEventListener("minerva-change", (event) => {
  output.textContent = \`Plan: \${event.detail.value}\`;
});

// "controlled" pattern: open-change events are cancelable
const modal = document.querySelector("minerva-modal");
modal.addEventListener("minerva-open-change", (event) => {
  if (!event.detail.open && hasUnsavedChanges()) {
    event.preventDefault(); // the modal stays open
  }
});`,M=`<minerva-modal label="Delete project?">
  <p>This cannot be undone.</p>
  <div slot="footer">
    <minerva-button variant="ghost">Cancel</minerva-button>
    <minerva-button color="danger">Delete</minerva-button>
  </div>
</minerva-modal>

<style>
  /* style the parts an element exposes (::part) in its states (:state) */
  minerva-modal:state(open)::part(content) {
    border-radius: 24px;
  }
  minerva-input::part(input) {
    font-variant-numeric: tabular-nums;
  }
</style>`,N=`// every element is in HTMLElementTagNameMap: querySelector is typed
const select = document.querySelector("minerva-select"); // MinervaSelect | null
const output = document.querySelector("output"); // HTMLOutputElement | null
select?.addEventListener("minerva-change", () => {
  if (output) output.value = select.value; // string
});

// element classes and their string-literal unions are exported
import type { MinervaButton, ButtonVariant } from "minerva-design/web-components";`,P=`// React 19 (global.d.ts)
/// <reference types="minerva-design/web-components/react" />

// Svelte 5 (src/app.d.ts)
/// <reference types="minerva-design/web-components/svelte" />

// Solid (global.d.ts)
/// <reference types="minerva-design/web-components/solid" />

// Vue / Volar (tsconfig.json)
{ "compilerOptions": { "types": ["minerva-design/web-components/vue"] } }`,F=`// .vscode/settings.json: completion and hover docs in .html files
{
  "html.customData": [
    "./node_modules/minerva-design/dist/web-components/html-custom-data.json"
  ]
}`,I=`// global.d.ts
/// <reference types="minerva-design/web-components/react" />

// Settings.tsx
import { useState } from "react";
import "minerva-design/web-components/switch";

export function Settings() {
  const [on, setOn] = useState(false);
  return (
    <minerva-switch
      label="Email notifications"
      checked={on} // a property: React 19 passes it as is
      onminerva-change={(e: CustomEvent<{ checked: boolean }>) =>
        setOn(e.detail.checked)
      }
    />
  );
}`,L=`// Safe on the server: nothing touches the DOM when the module loads, and
// defineElement() skips registration when there is no customElements registry.
import "minerva-design/web-components";

// The markup is sent as is and upgraded in the browser:
// :where(minerva-select, minerva-tabs):not(:defined) { visibility: hidden; }`,R=`// Logged in development only, once per message:
// [minerva] <minerva-tabs>: value "billing" does not match any <minerva-tab>.

// Vite, webpack, Rollup (+ replace) and esbuild (define) replace
// process.env.NODE_ENV: production bundles drop the checks and messages.
// The CDN bundle is built for production: no warnings.`,z=`import { html, css } from "lit";
import {
  MinervaElement,
  RovingFocusController,
  defineElement,
  hostStyles,
} from "minerva-design/web-components";

/** A toolbar: one Tab stop, arrow keys / Home / End move between buttons. */
export class AppToolbar extends MinervaElement {
  static override tagName = "app-toolbar";
  static override styles = [
    hostStyles,
    css\`
      :host {
        display: flex;
        gap: var(--space-2, 8px);
      }
    \`,
  ];

  // core's createRovingFocus, attached / destroyed with the element
  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => [...this.querySelectorAll<HTMLElement>("minerva-button")],
    orientation: "horizontal",
  }));

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "toolbar");
  }

  protected override firstUpdated() {
    this.roving.attach(this);
  }

  protected override render() {
    return html\`<slot @slotchange=\${() => this.roving.refresh()}></slot>\`;
  }
}

defineElement(AppToolbar); // idempotent, no-op without customElements`,B=[`defineElement`,`emit`,`MinervaElement`,`hostStyles`,`FormAssociatedElement`,`LocaleController`,`resolveLanguage`,`AriaController`,`HasSlotController`,`controllers`,`popoverResetStyles`],V=[`wc-plain-html`,`wc-vue`,`wc-angular`,`wc-svelte`,`wc-forms`,`wc-theming`],H=[`refs`,`events`,`props`,`text`,`rest`],U=()=>{let{t:e}=o(),t=t=>e(`docs.web-components.${t}`),n=(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`what`,children:[(0,S.jsx)(`h2`,{id:`what`,children:t(`what.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`what.p1`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`what.p2`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`what.p3`)})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`install`,children:[(0,S.jsx)(`h2`,{id:`install`,children:t(`install.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`install.text`)}),(0,S.jsx)(c,{tabs:[{label:`pnpm`,code:T,language:`bash`},{label:`npm`,code:E,language:`bash`}]})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`load`,children:[(0,S.jsx)(`h2`,{id:`load`,children:t(`load.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`load.bundler`)}),(0,S.jsx)(c,{code:D,language:`ts`}),(0,S.jsx)(`p`,{className:u.prose,children:t(`load.perElement`)}),(0,S.jsx)(c,{code:O,language:`ts`}),(0,S.jsx)(`p`,{className:u.prose,children:t(`load.cdn`)}),(0,S.jsx)(c,{code:k,language:`html`}),(0,S.jsx)(`p`,{className:u.callout,children:t(`load.esm`)})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`tokens`,children:[(0,S.jsx)(`h2`,{id:`tokens`,children:t(`tokens.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`tokens.text`)})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`attributes`,children:[(0,S.jsx)(`h2`,{id:`attributes`,children:t(`attributes.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`attributes.text`)}),(0,S.jsx)(c,{code:A,language:`html`}),(0,S.jsx)(`p`,{className:u.prose,children:t(`attributes.value`)})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`events`,children:[(0,S.jsx)(`h2`,{id:`events`,children:t(`events.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`events.text`)}),(0,S.jsxs)(`ul`,{className:u.prose,children:[(0,S.jsx)(`li`,{children:t(`events.change`)}),(0,S.jsx)(`li`,{children:t(`events.input`)}),(0,S.jsx)(`li`,{children:t(`events.open`)}),(0,S.jsx)(`li`,{children:t(`events.other`)}),(0,S.jsx)(`li`,{children:t(`events.native`)})]}),(0,S.jsx)(c,{code:j,language:`ts`}),(0,S.jsx)(`p`,{className:u.prose,children:t(`events.programmatic`)})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`slots-parts`,children:[(0,S.jsx)(`h2`,{id:`slots-parts`,children:t(`slots.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`slots.text`)}),(0,S.jsx)(c,{code:M,language:`html`})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`typings`,children:[(0,S.jsx)(`h2`,{id:`typings`,children:t(`typings.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`typings.text`)}),(0,S.jsx)(c,{code:N,language:`ts`}),(0,S.jsx)(`p`,{className:u.prose,children:t(`typings.frameworks`)}),(0,S.jsx)(c,{code:P,language:`ts`}),(0,S.jsx)(`p`,{className:u.prose,children:t(`typings.vscode`)}),(0,S.jsx)(c,{code:F,language:`json`})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`react`,children:[(0,S.jsx)(`h2`,{id:`react`,children:t(`react.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`react.text`)}),(0,S.jsx)(c,{code:I,language:`tsx`}),(0,S.jsx)(`p`,{className:u.callout,children:t(`react.note`)})]})]});return(0,S.jsxs)(p,{id:`web-components`,demos:C,intro:n,importCode:w,children:[(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`ssr`,children:[(0,S.jsx)(`h2`,{id:`ssr`,children:t(`ssr.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`ssr.text`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`ssr.hydration`)}),(0,S.jsx)(c,{code:L,language:`ts`}),(0,S.jsx)(`p`,{className:u.callout,children:t(`ssr.fouc`)})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`dev-warnings`,children:[(0,S.jsx)(`h2`,{id:`dev-warnings`,children:t(`dev.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`dev.text`)}),(0,S.jsx)(c,{code:R,language:`ts`})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`authoring`,children:[(0,S.jsx)(`h2`,{id:`authoring`,children:t(`authoring.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`authoring.text`)}),(0,S.jsx)(`ul`,{className:u.prose,children:B.map(e=>(0,S.jsx)(`li`,{children:t(`authoring.exports.${e}`)},e))}),(0,S.jsx)(c,{code:z,language:`ts`})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`frameworks`,children:[(0,S.jsx)(`h2`,{id:`frameworks`,children:t(`frameworks.title`)}),(0,S.jsx)(`p`,{className:u.prose,children:t(`frameworks.text`)}),(0,S.jsx)(`ul`,{className:u.prose,children:H.map(e=>(0,S.jsx)(`li`,{children:t(`frameworks.rules.${e}`)},e))}),(0,S.jsx)(`p`,{className:u.prose,children:t(`frameworks.fallback`)})]}),(0,S.jsxs)(`section`,{className:u.section,"aria-labelledby":`guides`,children:[(0,S.jsx)(`h2`,{id:`guides`,children:t(`guides.title`)}),(0,S.jsx)(`div`,{className:u.cardGrid,children:V.map(t=>(0,S.jsxs)(i,{to:`/${t}`,className:u.linkCard,children:[(0,S.jsx)(`strong`,{children:e(`docs.${t}.title`)}),(0,S.jsx)(`span`,{children:e(`docs.${t}.description`)})]},t))})]})]})}})))()}W();export{U as default};