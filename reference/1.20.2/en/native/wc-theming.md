# Theming Web Components

Design tokens, themes, palettes and design presets with <minerva-config> or plain attributes, nested scopes, per-component CSS variables, ::part() and locales.

Package: minerva-design@1.20.2

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Design tokens

Every element reads the design tokens (colors, spacing, radii, shadows, fonts, control heights) as CSS custom properties, which inherit into shadow roots. Load tokens.css once: it defines the light theme on :root and the rules that switch tokens on the attributes below. It is the same file as minerva-design/tokens.css and is included in minerva-design/style.css, so React and Web Components on one page share one theme.

### Theme attributes

Themes are attributes, read by tokens.css: data-theme (light or dark), data-palette, data-density, data-radius, data-shadow and data-font-scale. On  they need no script at all, which also makes them easy to render on the server:

Below , also add data-minerva-theme-scope to the element carrying the attributes: the derived tokens (hover, subtle and border shades, focus ring...) are computed where the base colors are declared, and that attribute makes the scope recompute them.  does it for you.

### <minerva-config>

 is the Web Component counterpart of ConfigProvider. It renders as display: contents and writes the theme attributes on itself (a scope for its content) or, with root, on . Scopes nest, the closest one wins:

Attribute

Values

Light, dark, follow the operating system, or the github-dark theme. Unset: inherit from the enclosing scope.

Color palette, with a light and a dark variant.

Design preset: sets density, radius, shadow and font scale together (and its palette unless palette is set).

Spacing and control heights; overrides the preset.

Corner radius scale; overrides the preset.

Elevation shadows; overrides the preset.

Type scale; overrides the preset.

Language of the built-in texts (close buttons, empty states, validation messages...) of the elements inside.

Apply everything to  (the whole page, with lang) instead of the element's subtree.

minerva-theme-change fires when the resolved light / dark mode changes (also when the operating system switches with theme="system"); resolvedMode returns the current mode:

### Dark mode

theme="system" follows prefers-color-scheme and updates live. To let users choose, set theme to light, dark or system from your own control and persist the choice. Without , toggling data-theme="dark" on  switches the default dark theme; to avoid a flash of the light theme, write the attribute on the server or in an inline script before the page renders.

### Styling internals with ::part() and :state()

Elements expose their key internals as CSS parts (root, label, content, overlay, list, item, input, control...) and their states as custom states (:state(open), :state(disabled), :state(size-small)...): the same names as the data-part and data-* hooks of the React components. They are public API, unlike internal class names. Each component page lists them in its "Styling hooks" section; see Styling & customization for the whole vocabulary.

### Overlays stay in their scope

Popups (select listboxes, popovers, tooltips, menus) and dialogs are rendered in the element's own shadow root and shown in the top layer with the Popover API, instead of being moved to the end of . They stay in the DOM tree where you wrote them, so they inherit the tokens, the theme scope, the locale and your CSS variables, and overflow: hidden or z-index on an ancestor cannot clip or cover them. Browsers without the Popover API fall back to fixed positioning.

### Languages

Built-in texts and validation messages follow the closest , else the closest lang attribute (crossing shadow roots), else English. English, Chinese, Japanese and French are supported; regional tags are reduced to their language (fr-CA uses French). Changing lang or locale updates the elements immediately. Texts that an element shows from attributes (labels, placeholders, close-label...) are yours to translate.

### Next steps

Built-in themes, every design token and custom themes.

Palettes and design presets in detail.

```html
<link rel="stylesheet" href="/node_modules/minerva-design/dist/core/tokens.css" />
<!-- or, with a bundler -->
<script type="module">
  import "minerva-design/tokens.css";
</script>
```

```html
<!-- the attributes work on <html> (whole page) without any script -->
<html lang="fr" data-theme="dark" data-palette="cool" data-density="compact" data-radius="large">
```

```html
<minerva-config theme="system" palette="tech" design="editorial" locale="ja" root>
  <!-- root: the attributes go on <html>, for the whole page -->
</minerva-config>

<!-- nested scopes: the closest one wins -->
<minerva-config theme="light">
  <minerva-button>Light</minerva-button>

  <minerva-config theme="dark" palette="graphite" density="compact">
    <minerva-button>Dark, graphite, compact</minerva-button>
  </minerva-config>
</minerva-config>
```

```ts
const config = document.querySelector("minerva-config");
const status = document.querySelector("#theme-status");
config.addEventListener("minerva-theme-change", (event) => {
  // "light" | "dark", e.g. when the OS switches
  status.textContent = `${event.detail.mode} mode`;
});
config.resolvedMode; // the mode currently applied
```

```css
/* the same --<component>-* variables as the React components,
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
}
```

```html
<section class="brand" data-minerva-theme-scope>
  <minerva-button>Violet</minerva-button>
</section>
```

```css
/* ::part() reaches the parts an element exposes, :state() its states
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
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
