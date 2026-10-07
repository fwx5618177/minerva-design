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
<pre><code>import "@minerva/lib-web-components";</code></pre>
<hr />
<p><small>Last updated in March 2026.</small></p>`;

export function setup(root: HTMLElement) {
  root.querySelector<HTMLElement>("#article")!.innerHTML = rendered;
}
