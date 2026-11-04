# Theming

Built-in light and dark themes, design tokens as CSS variables, and how to create your own theme.

Package: minerva-design@1.20.4

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### Built-in themes

The React library ships three themes: light, dark and github-dark. Pick one with the theme prop of ConfigProvider, or keep the default "auto", which follows the operating system's color scheme and updates live when it changes.

### Try it

This switcher drives the theme of the whole documentation site. The components below, and every page, update instantly because they only read CSS variables.

Applied theme:

Components re-theme without re-rendering: only the CSS variables on  change.

### Accepted theme values

The theme prop of ConfigProvider (and useAutoTheme / applyThemeStyles) accepts:

Value

Default. Uses light or dark according to prefers-color-scheme and follows changes.

The built-in light theme.

The built-in dark theme.

A dark theme based on GitHub's dark palette.

A complete theme object (every base token, plus optional semantic and component tokens). Usually built by spreading a built-in theme.

Two theme objects; the one matching the system color scheme is applied and switches automatically.

### How it works

A theme is a flat map of token names to CSS values. ConfigProvider writes every entry as a CSS custom property named -- in the inline style of the  element:

Component styles only reference these variables (for example background: var(--primary-color)), so changing theme never re-renders React components. The stylesheet also declares every token on :root, so components are styled with the light values even before (or without) a ConfigProvider.

### Custom themes

Create a theme by spreading a built-in one and overriding the tokens you need, then pass it to ConfigProvider. Pass a { light, dark } pair to keep following the system color scheme. Semantic tokens such as hover, subtle background and focus ring colors are derived from the base tokens, so overriding primary-color is usually enough.

### Color and variant props

Every component picks its semantic color with the same color prop, typed from the shared ColorScheme: primary, neutral, success, warning, danger or info (some components accept a documented subset). It is always a theme role, never a raw CSS color: to recolor a component, change the theme tokens or the component's CSS custom properties.

variant only selects the visual style, with the same meaning everywhere: solid (filled with the color, inverse text), subtle (tinted background), outline (transparent background, colored border and text) and ghost (transparent, no border). Components add their own styles where needed (Tabs line / enclosed, Input filled ...).

### Overriding tokens with CSS

You can also set tokens from a plain stylesheet. Keep in mind where each value is defined:

ConfigProvider writes the active theme as inline styles on , which take precedence over :root rules in a stylesheet. Tokens set by the theme need !important to be overridden globally; component tokens (btn-*, card-*, avatar-*) are not set by the built-in themes and can be defined normally.

### Token reference

Every token is available as var(--). Swatches show the value of the current theme.

CSS variable

Base tokens

Required in every theme object (ThemeProps).

Semantic tokens

Optional (SemanticThemeProps). Their defaults are derived from the base tokens with color-mix(); the built-in dark themes set some of them explicitly.

Role tokens

Each role color gets derived hover, active, subtle (tinted background), border and text tokens, e.g. --primary-color-hover or --danger-color-subtle.

Role

Component tokens

Optional per-component overrides (ComponentThemeProps). Components fall back to the semantic tokens when they are not set.

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // "auto" (default) follows the operating system's color scheme
  return <ConfigProvider theme="github-dark">{/* your app */}</ConfigProvider>;
}
```

```html
<!-- what ConfigProvider writes on the document root -->
<html style="--primary-color: #58a6ff; --background-color: #0d1117; ...">
```

```tsx
import { ConfigProvider, themes, type ComponentTheme } from "minerva-design";

// Start from a built-in theme and override the tokens you need.
// Derived tokens (hover, subtle, focus ring...) follow automatically.
const brandLight: ComponentTheme = {
  ...themes.light,
  "primary-color": "#7c3aed",
  "link-color": "#6d28d9",
};

const brandDark: ComponentTheme = {
  ...themes.dark,
  "primary-color": "#a78bfa",
  "focus-ring-color": "rgba(167, 139, 250, 0.55)",
};

export default function App() {
  return (
    // a single object: always this theme
    // <ConfigProvider theme={brandLight}>
    // a { light, dark } pair: follows the system color scheme
    <ConfigProvider theme={{ light: brandLight, dark: brandDark }}>
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
import { Button, Badge, Alert, Tooltip, toast } from "minerva-design";
import type { ColorScheme } from "minerva-design";
// "primary" | "neutral" | "success" | "warning" | "danger" | "info"

<Button color="danger" variant="outline">Delete</Button>
<Badge color="success" variant="subtle" content="Live" />
<Alert color="warning" variant="solid" title="Quota almost reached" />
<Tooltip color="info" content="Synced"><Button>Status</Button></Tooltip>
toast.success("Saved"); // toast({ color: "success", title: "Saved" })
```

```scss
/* Component-level tokens are not set by the built-in themes,
   so a plain stylesheet can define them */
:root {
  --card-bg-color: #fdf6e3;
  --btn-bg-color-hover: #1e40af;
}

/* Theme tokens are written as inline styles on <html> by ConfigProvider,
   which beat :root rules: use !important to force a value globally... */
:root {
  --radius-md: 10px !important;
}

/* ...or override them for one part of the page */
.checkout {
  --primary-color: #16a34a;
  /* derived tokens are computed on :root: redeclare the ones you need */
  --primary-color-hover: color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color));
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
