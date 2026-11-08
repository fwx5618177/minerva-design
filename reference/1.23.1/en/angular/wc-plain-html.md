# Plain HTML

A complete page without a build step: the CDN bundle, the design tokens, <minerva-config>, a validated form and event listeners. Import maps for the per-element modules.

Package: minerva-design@1.23.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### A complete page

Two tags in the  are enough: the design tokens stylesheet and the self-contained module bundle (every element, Lit and minerva-design/core). Copy this file and open it in a browser:

tokens.css defines the design tokens (colors, spacing, radii, fonts) that the elements and your own CSS can use with var().

 with root applies the theme (here following the operating system), the palette and the language of the built-in texts to the whole document.

The controls are form-associated: name, required, the value / checked attributes, , type="submit" and type="reset" buttons, FormData and the browser's validation work as with native inputs. The submit event only fires once every control is valid.

minerva-* events bubble, so a single listener on the form (or on document) receives the changes of every control; event.target is the element and event.detail holds the new value.

Setting a property from script (modal.open = true) never fires an event; the close button and Escape close the modal and fire minerva-open-change.

### Charts and icons

The chart and icon elements load an engine (the charts of minerva-design/charts/core, the icon set), so they are not part of minerva.js. Each of these optional entries has a self-contained file of its own in the same cdn folder: chart.js (cartesian and shape charts), trading-chart.js, order-book.js, chart-3d.js, graph.js, quadrant-task-board.js and icon.js. Load the ones a page uses next to minerva.js:

Without a bundler or an import map, a module script cannot import "minerva-design/web-components/chart": the browser does not resolve bare specifiers and the chart stays undefined (0 × 0). Load the CDN file with a  instead. Elements that two files both contain are registered once, by the first file that loads.

### Per-element modules with an import map

The CDN bundle contains every element. To download only the elements a page uses, load the per-element modules of the package (dist/elements/.js) instead. They are the files bundlers use, with bare imports of their dependencies, which an import map resolves in the browser:

The modules import lit (including lit/decorators.js and lit/directives/*, hence the "lit/" prefix), minerva-design/core (which itself depends on @floating-ui/dom), and, for the HTML preview and JSON field only, dompurify and jsonc-parser. esm.sh resolves the dependencies of those packages for you; when you host the files yourself, map @floating-ui/dom, @floating-ui/core and @floating-ui/utils as well.

Use exact versions in production, and make sure every module loads the same copy of lit and minerva-design/core: mixing the CDN bundle with the per-element modules on one page downloads the shared code twice, and each tag keeps the first definition that registered it.

### Next steps

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minerva without a build step</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/minerva.js"></script>
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
          `${event.target.name} changed`;
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // runs only when every control is valid
        const data = new FormData(form);
        document.querySelector("#summary").textContent =
          `${data.get("email")} — ${data.get("plan")} plan`;
        modal.open = true;
      });

      document.querySelector("#close").addEventListener("click", () => {
        modal.open = false;
      });
    </script>
  </body>
</html>
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/minerva.js"></script>
<!-- the chart elements and their engine (not part of minerva.js) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/chart.js"></script>

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
</script>
```

```html
<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
</script>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
