# Plain HTML

A complete page without a build step: the CDN bundle, the design tokens, <minerva-config>, a validated form and event listeners. Import maps for the per-element modules.

Package: minerva-design@1.20.4

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### A complete page

Two tags in the  are enough: the design tokens stylesheet and the self-contained module bundle (every element, Lit and minerva-design/core). Copy this file and open it in a browser:

tokens.css defines the design tokens (colors, spacing, radii, fonts) that the elements and your own CSS can use with var().

 with root applies the theme (here following the operating system), the palette and the language of the built-in texts to the whole document.

The controls are form-associated: name, required, the value / checked attributes, , type="submit" and type="reset" buttons, FormData and the browser's validation work as with native inputs. The submit event only fires once every control is valid.

minerva-* events bubble, so a single listener on the form (or on document) receives the changes of every control; event.target is the element and event.detail holds the new value.

Setting a property from script (modal.open = true) never fires an event; the close button and Escape close the modal and fire minerva-open-change.

### Per-element modules with an import map

The CDN bundle contains every element. To download only the elements a page uses, load the per-element modules of the package (dist/elements/.js) instead. They are the files bundlers use, with bare imports of their dependencies, which an import map resolves in the browser:

The modules import lit (including lit/decorators.js and lit/directives/*, hence the "lit/" prefix), minerva-design/core (which itself depends on @floating-ui/dom), and, for the HTML preview and JSON field only, dompurify and jsonc-parser. esm.sh resolves the dependencies of those packages for you; when you host the files yourself, map @floating-ui/dom, @floating-ui/core and @floating-ui/utils as well.

Use exact versions in production, and make sure every module loads the same copy of lit and minerva-design/core: mixing the CDN bundle with the per-element modules on one page downloads the shared code twice, and each tag keeps the first definition that registered it.

### Next steps

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
