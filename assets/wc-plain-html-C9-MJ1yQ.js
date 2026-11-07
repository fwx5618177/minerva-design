import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-DxNxqLAt.js";import{n as a,t as o}from"./useTranslation-DDU89y4T.js";import{n as s,t as c}from"./CodeBlock-D2noRCEy.js";import{i as l,r as u}from"./DemoBlock-p2BQC0HW.js";import{n as d,t as f}from"./package-Cp8FEG2u.js";import{n as p,t as m}from"./DocPage-HJVoVnnH.js";var h,g,_,v,y,b;function x(){return(x=e((()=>{f(),t(),o(),r(),s(),p(),l(),h=n(),g=`https://cdn.jsdelivr.net/npm/minerva-design@${d}/dist`,_=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minerva without a build step</title>
    <link rel="stylesheet" href="${g}/core/tokens.css" />
    <script type="module" src="${g}/web-components/cdn/minerva.js"><\/script>
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
</html>`,v=`<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "${g}/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
<\/script>
<link rel="stylesheet" href="${g}/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
<\/script>`,y=`<link rel="stylesheet" href="${g}/core/tokens.css" />
<script type="module" src="${g}/web-components/cdn/minerva.js"><\/script>
<!-- the chart elements and their engine (not part of minerva.js) -->
<script type="module" src="${g}/web-components/cdn/chart.js"><\/script>

<minerva-config theme="system" root>
  <minerva-chart id="sales" height="300"></minerva-chart>
</minerva-config>

<script type="module">
  // the data is the options property (no attribute)
  document.querySelector("#sales").options = {
    series: [
      { name: "Revenue", type: "bar", data: [42, 51, 48, 63, 72, 80] },
      { name: "Target", type: "line", curve: "smooth", data: [45, 50, 55, 60, 65, 70] },
    ],
    xAxis: { type: "category", categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  };
<\/script>`,b=()=>{let{t:e}=a(),t=t=>e(`docs.wc-plain-html.${t}`),n=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(`section`,{className:u.section,"aria-labelledby":`page`,children:[(0,h.jsx)(`h2`,{id:`page`,children:t(`page.title`)}),(0,h.jsx)(`p`,{className:u.prose,children:t(`page.text`)}),(0,h.jsx)(c,{code:_,language:`html`,title:`index.html`}),(0,h.jsxs)(`ul`,{className:u.prose,children:[(0,h.jsx)(`li`,{children:t(`page.tokens`)}),(0,h.jsx)(`li`,{children:t(`page.config`)}),(0,h.jsx)(`li`,{children:t(`page.form`)}),(0,h.jsx)(`li`,{children:t(`page.events`)}),(0,h.jsx)(`li`,{children:t(`page.modal`)})]})]}),(0,h.jsxs)(`section`,{className:u.section,"aria-labelledby":`charts-icons`,children:[(0,h.jsx)(`h2`,{id:`charts-icons`,children:t(`optional.title`)}),(0,h.jsx)(`p`,{className:u.prose,children:t(`optional.text`)}),(0,h.jsx)(c,{code:y,language:`html`}),(0,h.jsx)(`p`,{className:u.callout,children:t(`optional.note`)})]}),(0,h.jsxs)(`section`,{className:u.section,"aria-labelledby":`import-maps`,children:[(0,h.jsx)(`h2`,{id:`import-maps`,children:t(`importMaps.title`)}),(0,h.jsx)(`p`,{className:u.prose,children:t(`importMaps.text`)}),(0,h.jsx)(c,{code:v,language:`html`}),(0,h.jsx)(`p`,{className:u.prose,children:t(`importMaps.deps`)}),(0,h.jsx)(`p`,{className:u.callout,children:t(`importMaps.note`)})]}),(0,h.jsxs)(`section`,{className:u.section,"aria-labelledby":`next`,children:[(0,h.jsx)(`h2`,{id:`next`,children:t(`next.title`)}),(0,h.jsxs)(`div`,{className:u.cardGrid,children:[(0,h.jsxs)(i,{to:`/wc-forms`,className:u.linkCard,children:[(0,h.jsx)(`strong`,{children:e(`docs.wc-forms.title`)}),(0,h.jsx)(`span`,{children:e(`docs.wc-forms.description`)})]}),(0,h.jsxs)(i,{to:`/wc-theming`,className:u.linkCard,children:[(0,h.jsx)(`strong`,{children:e(`docs.wc-theming.title`)}),(0,h.jsx)(`span`,{children:e(`docs.wc-theming.description`)})]})]})]})]});return(0,h.jsx)(m,{id:`wc-plain-html`,intro:n})}})))()}x();export{b as default};