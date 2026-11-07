# Prose

Unframed, theme-aware typography for semantic HTML such as articles, rendered Markdown and rich-text editors. The same rules ship as a Sass mixin: @use "minerva-design/prose.scss" as typography; then @include typography.prose; on your own selector.

Package: minerva-design@1.22.0

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

## Example: Basic usage

Semantic HTML inside <minerva-prose>: headings, paragraphs, nested lists, inline code and quotes are styled, at any depth.

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

## Example: Rendered Markdown

HTML produced by a Markdown renderer or rich-text editor, with tables and code blocks. Prose does not sanitize: insert trusted HTML only.

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

## Example: Variables and shadow roots

--prose-* variables tune an instance; inside a shadow root the rules are injected into that root, once.

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
