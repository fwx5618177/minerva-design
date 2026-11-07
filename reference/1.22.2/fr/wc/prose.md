# Prose

Typographie sans cadre et adaptée au thème pour du HTML sémantique : articles, Markdown rendu, éditeurs de texte riche. Les mêmes règles sont publiées en mixin Sass : @use "minerva-design/prose.scss" as typography; puis @include typography.prose; sur votre propre sélecteur.

Package: minerva-design@1.22.2

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Prose

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/prose",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "Semantic HTML content (headings, paragraphs, lists, tables, code...)"
  }
]
```

## API

```json
{
  "wc:minerva-prose": {
    "kind": "element",
    "source": "web-components/src/components/prose/prose.ts",
    "className": "MinervaProse",
    "summary": "Typography for long-form HTML content (articles, Markdown).",
    "description": "Unframed, theme-aware typography for semantic HTML: articles, rendered Markdown, rich-text editor output (`<Prose>` of React). It does not parse or sanitize HTML. Why light DOM styling: the content is slotted, and shadow DOM styles can only reach slotted top-level elements (`::slotted(p)`), never their descendants (`li > code`, `table td`...). So the element injects the React library's compiled prose rules, scoped with a `minerva-prose` selector, into its root node (the document, or the shadow root it is rendered in) once per root, via `adoptedStyleSheets` (a `<style>` element where constructable stylesheets are unsupported). Injection happens on connect only, so importing the module is SSR / Node safe. The same rules are published as the React library's `prose` Sass mixin, and read the same CSS variables (`--prose-font-size`, `--prose-border-color`, ...).",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Semantic HTML content (headings, paragraphs, lists, tables, code...)"
      }
    ],
    "parts": [],
    "cssProperties": []
  }
}
```

## CSS variables

```json
{
  "css:Prose": {
    "kind": "cssVars",
    "source": "react/src/components/Prose",
    "vars": [
      {
        "name": "--prose-font-size",
        "description": "Base font size of the body text"
      },
      {
        "name": "--prose-border-color",
        "description": "Color of the blockquote, table, code block and rule borders"
      },
      {
        "name": "--prose-code-bg",
        "description": "Background color of inline code and table headers"
      },
      {
        "name": "--prose-pre-bg",
        "description": "Background color of code blocks"
      },
      {
        "name": "--prose-radius",
        "description": "Corner radius of code blocks (defaults to --radius-sm)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Du HTML sémantique dans <minerva-prose> : titres, paragraphes, listes imbriquées, code en ligne et citations sont stylés à toute profondeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/prose/wc/basic.html

```html
<minerva-prose style="max-width: 640px">
  <h2>Release notes</h2>
  <p>
    Version 2.4 brings <strong>Web Components</strong> for every primitive,
    sharing the <a href="https://example.com/tokens">design tokens</a> of the
    React library. Install it with <code>npm install</code>.
  </p>
  <h3>Highlights</h3>
  <ul>
    <li>
      Form-associated inputs that work in a plain <code>&lt;form&gt;</code>
    </li>
    <li>
      Theme scopes with <code>&lt;minerva-config&gt;</code>
      <ul>
        <li>Light, dark and system modes</li>
        <li>Four palettes</li>
      </ul>
    </li>
  </ul>
  <blockquote>
    <p>Nested descendants are styled too: the rules live in the light DOM.</p>
  </blockquote>
</minerva-prose>

```

## Example: Markdown rendu

HTML produit par un moteur Markdown ou un éditeur riche, avec tableaux et blocs de code. Prose ne nettoie rien : n'insérez que du HTML de confiance.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/prose/wc/rich-content.html

```html
<minerva-prose id="article" style="max-width: 640px"></minerva-prose>

```

### apps/docs/src/docs/pages/prose/wc/rich-content.ts

```tsx
// Typical use: HTML rendered from Markdown or a rich-text editor. Prose does
// not sanitize: only insert trusted (or sanitized) HTML.
const rendered = `
<h2>Migration guide</h2>
<ol>
  <li>Install the package.</li>
  <li>Import <code>tokens.css</code> once.</li>
  <li>Replace the components one page at a time.</li>
</ol>
<table>
  <thead><tr><th>React</th><th>Web Component</th></tr></thead>
  <tbody>
    <tr><td><code>&lt;Button&gt;</code></td><td><code>&lt;minerva-button&gt;</code></td></tr>
    <tr><td><code>&lt;Prose&gt;</code></td><td><code>&lt;minerva-prose&gt;</code></td></tr>
  </tbody>
</table>
<pre><code>import "minerva-design/web-components";</code></pre>
<hr />
<p><small>Last updated in March 2026.</small></p>`;

export function setup(root: HTMLElement) {
  root.querySelector<HTMLElement>("#article")!.innerHTML = rendered;
}

```

## Example: Variables et shadow roots

Les variables --prose-* règlent une instance ; dans une shadow root, les règles y sont injectées une seule fois.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/prose/wc/scopes.html

```html
<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  "
>
  <minerva-prose style="--prose-font-size: 0.875rem">
    <h4>Small print</h4>
    <p>
      CSS variables such as <code>--prose-font-size</code> tune the rules per
      instance.
    </p>
  </minerva-prose>
  <div id="host"></div>
</div>

```

### apps/docs/src/docs/pages/prose/wc/scopes.ts

```tsx
// Inside a shadow root, the element injects its rules into that root (once),
// so it works in other components too.
export function setup(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>("#host")!;
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  shadow.innerHTML = `<minerva-prose>
    <h4>In a shadow root</h4>
    <ul><li>Lists, <code>code</code> and <a href="https://example.com">links</a></li></ul>
  </minerva-prose>`;
}

```
