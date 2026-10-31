import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{n as a,t as o}from"./useTranslation-rkoeN8eS.js";import{n as s,t as c}from"./CodeBlock-umVQqAKy.js";import{i as l,r as u}from"./DemoBlock-DvPmV2UV.js";import{n as d,t as f}from"./DocPage-BbPSunu1.js";var p,m,h,g,_;function v(){return(v=e((()=>{t(),o(),r(),s(),d(),l(),p=n(),m=`https://cdn.jsdelivr.net/npm/minerva-design@0/dist`,h=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minerva without a build step</title>
    <link rel="stylesheet" href="${m}/core/tokens.css" />
    <script type="module" src="${m}/web-components/cdn/minerva.js"><\/script>
    <style>
      body {
        margin: 0;
        font-family: var(--font-family-sans);
        background: var(--background-color);
        color: var(--foreground-color);
      }
      form {
        display: grid;
        gap: var(--space-4);
        max-width: 420px;
        margin: var(--space-8) auto;
      }
      /* hide the tags until the bundle has defined them */
      :not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <!-- theme, palette and language of everything inside -->
    <minerva-config theme="system" palette="cool" locale="en" root>
      <form id="signup">
        <label for="email">Email</label>
        <minerva-input id="email" name="email" type="email" required clearable></minerva-input>

        <label for="plan">Plan</label>
        <minerva-select id="plan" name="plan" value="pro" required>
          <minerva-option value="free">Free</minerva-option>
          <minerva-option value="pro">Pro</minerva-option>
          <minerva-option value="team">Team</minerva-option>
        </minerva-select>

        <minerva-checkbox name="terms" required>I accept the terms</minerva-checkbox>
        <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>

        <minerva-button type="submit">Create account</minerva-button>
        <minerva-button type="reset" variant="ghost">Reset</minerva-button>
        <output id="last-change" aria-live="polite"></output>
      </form>

      <minerva-modal id="done" label="Welcome!">
        <p id="summary"></p>
        <minerva-button slot="footer" id="close">Close</minerva-button>
      </minerva-modal>
    </minerva-config>

    <script type="module">
      const form = document.querySelector("#signup");
      const modal = document.querySelector("#done");

      // custom events bubble: one listener on the form sees every control
      form.addEventListener("minerva-change", (event) => {
        document.querySelector("#last-change").textContent =
          \`\${event.target.name} changed\`;
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // runs only when every control is valid
        const data = new FormData(form);
        document.querySelector("#summary").textContent =
          \`\${data.get("email")} — \${data.get("plan")} plan\`;
        modal.open = true;
      });

      document.querySelector("#close").addEventListener("click", () => {
        modal.open = false;
      });
    <\/script>
  </body>
</html>`,g=`<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "${m}/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
<\/script>
<link rel="stylesheet" href="${m}/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
<\/script>`,_=()=>{let{t:e}=a(),t=t=>e(`docs.wc-plain-html.${t}`),n=(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`page`,children:[(0,p.jsx)(`h2`,{id:`page`,children:t(`page.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`page.text`)}),(0,p.jsx)(c,{code:h,language:`html`,title:`index.html`}),(0,p.jsxs)(`ul`,{className:u.prose,children:[(0,p.jsx)(`li`,{children:t(`page.tokens`)}),(0,p.jsx)(`li`,{children:t(`page.config`)}),(0,p.jsx)(`li`,{children:t(`page.form`)}),(0,p.jsx)(`li`,{children:t(`page.events`)}),(0,p.jsx)(`li`,{children:t(`page.modal`)})]})]}),(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`import-maps`,children:[(0,p.jsx)(`h2`,{id:`import-maps`,children:t(`importMaps.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`importMaps.text`)}),(0,p.jsx)(c,{code:g,language:`html`}),(0,p.jsx)(`p`,{className:u.prose,children:t(`importMaps.deps`)}),(0,p.jsx)(`p`,{className:u.callout,children:t(`importMaps.note`)})]}),(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`next`,children:[(0,p.jsx)(`h2`,{id:`next`,children:t(`next.title`)}),(0,p.jsxs)(`div`,{className:u.cardGrid,children:[(0,p.jsxs)(i,{to:`/wc-forms`,className:u.linkCard,children:[(0,p.jsx)(`strong`,{children:e(`docs.wc-forms.title`)}),(0,p.jsx)(`span`,{children:e(`docs.wc-forms.description`)})]}),(0,p.jsxs)(i,{to:`/wc-theming`,className:u.linkCard,children:[(0,p.jsx)(`strong`,{children:e(`docs.wc-theming.title`)}),(0,p.jsx)(`span`,{children:e(`docs.wc-theming.description`)})]})]})]})]});return(0,p.jsx)(f,{id:`wc-plain-html`,intro:n})}})))()}v();export{_ as default};