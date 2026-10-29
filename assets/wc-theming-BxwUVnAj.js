import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{Dt as a,Ot as o}from"./io5-CvrBnF9y.js";import{n as s,t as c}from"./CodeBlock-Bfhf7f9G.js";import{a as l,c as u,d,f,i as p,l as m,r as h,s as g,u as _}from"./DemoBlock-3GMi3Uss.js";import{n as v,t as y}from"./DocPage-DCMfehF7.js";var b,x,S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{u(),t(),a(),r(),s(),v(),p(),b=n(),x=[[`theme`,`light | dark | system | github-dark`],[`palette`,`editorial | tech | graphite | cool`],[`design`,`minerva | editorial | compact | touch`],[`density`,`compact | standard | comfortable`],[`radius`,`none | small | medium | large`],[`shadow`,`none | subtle | standard`],[`font-scale`,`small | standard | large`],[`locale`,`en | zh | ja | fr`],[`root`,`boolean`]],S=`<link rel="stylesheet" href="/node_modules/minerva-design/dist/core/tokens.css" />
<!-- or, with a bundler -->
<script type="module">
  import "minerva-design/tokens.css";
<\/script>`,C=`<!-- the attributes work on <html> (whole page) without any script -->
<html lang="fr" data-theme="dark" data-palette="cool" data-density="compact" data-radius="large">`,w=`<minerva-config theme="system" palette="tech" design="editorial" locale="ja" root>
  <!-- root: the attributes go on <html>, for the whole page -->
</minerva-config>

<!-- nested scopes: the closest one wins -->
<minerva-config theme="light">
  <minerva-button>Light</minerva-button>

  <minerva-config theme="dark" palette="graphite" density="compact">
    <minerva-button>Dark, graphite, compact</minerva-button>
  </minerva-config>
</minerva-config>`,T=`const config = document.querySelector("minerva-config");
const status = document.querySelector("#theme-status");
config.addEventListener("minerva-theme-change", (event) => {
  // "light" | "dark", e.g. when the OS switches
  status.textContent = \`\${event.detail.mode} mode\`;
});
config.resolvedMode; // the mode currently applied`,E=`/* the same --<component>-* variables as the React components,
   on the element, any ancestor or :root */
.toolbar minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}

minerva-input {
  --input-radius: 6px;
}

/* theme tokens for one area: data-minerva-theme-scope recomputes the
   derived tokens (hover, subtle, focus ring...) from the new base colors */
.brand {
  --primary-color: #7c3aed;
}`,D=`<section class="brand" data-minerva-theme-scope>
  <minerva-button>Violet</minerva-button>
</section>`,O=`/* ::part() reaches the parts an element exposes, :state() its states
   (both listed in the "Styling hooks" section of each component page) */
minerva-select::part(content) {
  max-height: 240px;
}

minerva-modal:state(open)::part(overlay) {
  backdrop-filter: blur(4px);
}

minerva-tabs:state(variant-pills)::part(list) {
  gap: var(--space-1);
}

minerva-button:state(loading)::part(label) {
  opacity: 0.6;
}`,k=()=>{let{t:e}=o(),t=t=>e(`docs.wc-theming.${t}`),n=(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`tokens`,children:[(0,b.jsx)(`h2`,{id:`tokens`,children:t(`tokens.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`tokens.text`)}),(0,b.jsx)(c,{code:S,language:`html`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`attributes`,children:[(0,b.jsx)(`h2`,{id:`attributes`,children:t(`attributes.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`attributes.text`)}),(0,b.jsx)(c,{code:C,language:`html`}),(0,b.jsx)(`p`,{className:h.callout,children:t(`attributes.nested`)})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`config`,children:[(0,b.jsx)(`h2`,{id:`config`,children:t(`config.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`config.text`)}),(0,b.jsx)(`div`,{className:h.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`config.title`),children:(0,b.jsxs)(m,{className:h.propsTable,children:[(0,b.jsx)(f,{children:(0,b.jsxs)(d,{children:[(0,b.jsx)(l,{scope:`col`,children:t(`config.attribute`)}),(0,b.jsx)(l,{scope:`col`,children:t(`config.values`)}),(0,b.jsx)(l,{scope:`col`,children:e(`doc.description`)})]})}),(0,b.jsx)(g,{children:x.map(([e,n])=>(0,b.jsxs)(d,{children:[(0,b.jsx)(l,{scope:`row`,children:(0,b.jsx)(`code`,{className:h.propName,children:e})}),(0,b.jsx)(_,{children:(0,b.jsx)(`code`,{className:h.propType,children:n})}),(0,b.jsx)(_,{children:t(`config.attrs.${e}`)})]},e))})]})}),(0,b.jsx)(c,{code:w,language:`html`}),(0,b.jsx)(`p`,{className:h.prose,children:t(`config.event`)}),(0,b.jsx)(c,{code:T,language:`ts`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`dark-mode`,children:[(0,b.jsx)(`h2`,{id:`dark-mode`,children:t(`dark.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`dark.text`)})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`css-vars`,children:[(0,b.jsx)(`h2`,{id:`css-vars`,children:t(`cssVars.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`cssVars.text`)}),(0,b.jsx)(c,{code:E,language:`css`}),(0,b.jsx)(c,{code:D,language:`html`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`parts`,children:[(0,b.jsx)(`h2`,{id:`parts`,children:t(`parts.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`parts.text`)}),(0,b.jsx)(c,{code:O,language:`css`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`overlays`,children:[(0,b.jsx)(`h2`,{id:`overlays`,children:t(`overlays.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`overlays.text`)})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`i18n`,children:[(0,b.jsx)(`h2`,{id:`i18n`,children:t(`i18n.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`i18n.text`)})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`next`,children:[(0,b.jsx)(`h2`,{id:`next`,children:t(`next.title`)}),(0,b.jsxs)(`div`,{className:h.cardGrid,children:[(0,b.jsxs)(i,{to:`/theming`,className:h.linkCard,children:[(0,b.jsx)(`strong`,{children:e(`docs.theming.title`)}),(0,b.jsx)(`span`,{children:t(`next.theming`)})]}),(0,b.jsxs)(i,{to:`/design-presets`,className:h.linkCard,children:[(0,b.jsx)(`strong`,{children:e(`docs.design-presets.title`)}),(0,b.jsx)(`span`,{children:t(`next.presets`)})]})]})]})]});return(0,b.jsx)(y,{id:`wc-theming`,intro:n})}})))()}A();export{k as default};