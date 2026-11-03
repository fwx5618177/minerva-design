# Page

Page scaffolding: Page, PageHeader, PageSection, StatCard and Toolbar for consistent screens.

Package: minerva-design@1.20.0

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Page

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/page",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "maxWidth",
    "typeText": "string | number | undefined",
    "attribute": "max-width",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Page content"
  }
]
```

## PageHeader

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/page-header",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "heading",
    "typeText": "string",
    "attribute": "heading",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string",
    "attribute": "description",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "heading",
    "description": "Heading content (alternative to the `heading` attribute)"
  },
  {
    "name": "description",
    "description": "Supporting text (alternative to the `description` attribute)"
  },
  {
    "name": "actions",
    "description": "Actions next to the heading (wrap below it on narrow widths)"
  }
]
```

## PageSection

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/page-section",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "heading",
    "typeText": "string",
    "attribute": "heading",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string",
    "attribute": "description",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Section content"
  },
  {
    "name": "heading",
    "description": "Heading content (alternative to the `heading` attribute)"
  },
  {
    "name": "description",
    "description": "Supporting text (alternative to the `description` attribute)"
  },
  {
    "name": "actions",
    "description": "Actions next to the heading"
  },
  {
    "name": "icon",
    "description": "Decorative icon before the heading (hidden from assistive technologies)"
  }
]
```

## StatCard

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/stat-card",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "attribute": "description",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "label",
    "description": "Metric name (alternative to the `label` attribute)"
  },
  {
    "name": "value",
    "description": "Metric value (alternative to the `value` attribute)"
  },
  {
    "name": "description",
    "description": "Explanatory text under the value"
  },
  {
    "name": "icon",
    "description": "Decorative icon (hidden from assistive technologies)"
  }
]
```

## Toolbar

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/toolbar",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "nowrap",
    "typeText": "boolean",
    "attribute": "nowrap",
    "required": false
  },
  {
    "name": "density",
    "typeText": "\"default\" | \"compact\"",
    "attribute": "density",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Controls"
  }
]
```

## API

```json
{
  "wc:minerva-page": {
    "kind": "element",
    "source": "web-components/src/components/page/page.ts",
    "className": "MinervaPage",
    "summary": "Padded column of a screen's content.",
    "description": "The padded, vertically spaced column of a screen's content (`<Page>` of React). Children (`<minerva-page-header>`, `<minerva-page-section>`...) are the flex items of the React library's `.page` column.",
    "properties": [
      {
        "name": "maxWidth",
        "attribute": "max-width",
        "type": "string | number | undefined",
        "description": "Maximum width: numbers are pixels, strings are CSS lengths"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Page content"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The page column"
      }
    ],
    "cssProperties": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  },
  "wc:minerva-page-header": {
    "kind": "element",
    "source": "web-components/src/components/page/page.ts",
    "className": "MinervaPageHeader",
    "summary": "Page heading with description and actions.",
    "description": "The page's `h1` with an optional description and actions (`<PageHeader>` of React). the React library's `title` prop is `heading` here (`title` is a global HTML attribute that shows a native tooltip).",
    "properties": [
      {
        "name": "heading",
        "attribute": "heading",
        "type": "string",
        "default": "\"\"",
        "description": "Heading text"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string",
        "default": "\"\"",
        "description": "Supporting text under the heading"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "heading",
        "description": "Heading content (alternative to the `heading` attribute)"
      },
      {
        "name": "description",
        "description": "Supporting text (alternative to the `description` attribute)"
      },
      {
        "name": "actions",
        "description": "Actions next to the heading (wrap below it on narrow widths)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The `<header>`"
      },
      {
        "name": "title",
        "description": "The `<h1>`"
      },
      {
        "name": "description",
        "description": "The description paragraph"
      },
      {
        "name": "actions",
        "description": "The actions wrapper"
      }
    ],
    "cssProperties": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  },
  "wc:minerva-page-section": {
    "kind": "element",
    "source": "web-components/src/components/page/page.ts",
    "className": "MinervaPageSection",
    "summary": "Page region with an h2 heading, description and actions.",
    "description": "A region named by its `h2` heading, with optional description, icon and actions (`<PageSection>` of React). The `<section>` is labelled by its heading. the React library's `title` prop is `heading` here. React keeps Tags at their intrinsic width in a section (`> [data-component=\"tag\"]`); here the same rule targets slotted `minerva-tag` / `[data-component=\"tag\"]` children.",
    "properties": [
      {
        "name": "heading",
        "attribute": "heading",
        "type": "string",
        "default": "\"\"",
        "description": "Heading text"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string",
        "default": "\"\"",
        "description": "Supporting text under the heading"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Section content"
      },
      {
        "name": "heading",
        "description": "Heading content (alternative to the `heading` attribute)"
      },
      {
        "name": "description",
        "description": "Supporting text (alternative to the `description` attribute)"
      },
      {
        "name": "actions",
        "description": "Actions next to the heading"
      },
      {
        "name": "icon",
        "description": "Decorative icon before the heading (hidden from assistive technologies)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The `<section>`"
      },
      {
        "name": "header",
        "description": "The title row (title, description and actions)"
      },
      {
        "name": "title",
        "description": "The `<h2>`"
      },
      {
        "name": "icon",
        "description": "The decorative icon wrapper, inside the title"
      },
      {
        "name": "description",
        "description": "The description paragraph"
      },
      {
        "name": "actions",
        "description": "The actions wrapper"
      }
    ],
    "cssProperties": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  },
  "wc:minerva-toolbar": {
    "kind": "element",
    "source": "web-components/src/components/page/page.ts",
    "className": "MinervaToolbar",
    "summary": "Wrapping row of related controls (role=\"group\").",
    "description": "Groups related controls in a wrapping flex row with `role=\"group\"` (`<Toolbar>` of React). It adds no arrow-key navigation. Name it with `aria-label`. the React library's direct-child rules are applied with `::slotted()` (top-level children only): inputs (`minerva-input`, `[data-component=\"input\"]`) grow from 16rem, selects (`minerva-select`, `[data-component=\"select\"]`) take 12rem, and in `compact` density vertical dividers (`minerva-divider[orientation=\"vertical\"]`, `hr` / `[role=\"separator\"]` with `aria-orientation=\"vertical\"`) are centered at a fixed height. the React library's `asChild` has no equivalent.",
    "properties": [
      {
        "name": "nowrap",
        "attribute": "nowrap",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the controls on one bounded row instead of wrapping"
      },
      {
        "name": "density",
        "attribute": "density",
        "type": "\"default\" | \"compact\"",
        "default": "\"default\"",
        "description": "Gap between controls: default (space-3) or compact (space-1)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Controls"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The group"
      }
    ],
    "cssProperties": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  },
  "wc:minerva-stat-card": {
    "kind": "element",
    "source": "web-components/src/components/page/page.ts",
    "className": "MinervaStatCard",
    "summary": "Labelled metric card.",
    "description": "A labelled metric (`<dl>`) with optional icon and description (`<StatCard>` of React).",
    "properties": [
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Metric name"
      },
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Metric value (0 is rendered)"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string | undefined",
        "description": "Explanatory text under the value"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "label",
        "description": "Metric name (alternative to the `label` attribute)"
      },
      {
        "name": "value",
        "description": "Metric value (alternative to the `value` attribute)"
      },
      {
        "name": "description",
        "description": "Explanatory text under the value"
      },
      {
        "name": "icon",
        "description": "Decorative icon (hidden from assistive technologies)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The card"
      },
      {
        "name": "icon",
        "description": "The decorative icon wrapper"
      },
      {
        "name": "label",
        "description": "The metric name (`<dt>`)"
      },
      {
        "name": "value",
        "description": "The metric value (`<dd>`)"
      },
      {
        "name": "description",
        "description": "The description paragraph"
      }
    ],
    "cssProperties": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Page": {
    "kind": "cssVars",
    "source": "react/src/components/Page",
    "vars": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

<minerva-page> is the padded column (max-width caps it); <minerva-page-header> renders the h1 with a description and actions, <minerva-page-section> a region labelled by its h2. the React library's title is heading here.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/page/wc/basic.html

```html
<minerva-page max-width="960">
  <minerva-page-header
    heading="Projects"
    description="Everything your team is working on."
  >
    <minerva-button slot="actions">New project</minerva-button>
  </minerva-page-header>
  <minerva-page-section
    heading="Recent"
    description="Opened in the last 7 days."
  >
    <p style="margin: 0">Atlas, Borealis and Cygnus.</p>
  </minerva-page-section>
  <minerva-page-section heading="Archived">
    <minerva-button slot="actions" size="small" variant="ghost"
      >Show all</minerva-button
    >
    <p style="margin: 0">No archived projects.</p>
  </minerva-page-section>
</minerva-page>

```

## Example: Stat cards

<minerva-stat-card> renders a labelled metric (<dl>) from label / value / description attributes or slots, with an optional icon slot. The section also has an icon.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/page/wc/stat-cards.html

```html
<minerva-page-section
  heading="This month"
  description="Compared with last month."
>
  <span slot="icon">📈</span>
  <minerva-responsive-grid columns="1 2 3" gap="3">
    <minerva-stat-card
      label="Revenue"
      value="$48,200"
      description="+12% vs. last month"
    >
      <span slot="icon">💰</span>
    </minerva-stat-card>
    <minerva-stat-card label="Active users" value="3,104">
      <span slot="icon">👥</span>
    </minerva-stat-card>
    <minerva-stat-card label="Churn">
      <span slot="value">1.8<small>%</small></span>
      <span slot="description">Down from <strong>2.4%</strong></span>
    </minerva-stat-card>
  </minerva-responsive-grid>
</minerva-page-section>

```

## Example: Toolbar

<minerva-toolbar> groups controls in a wrapping row (role="group", name it with aria-label); inputs grow, density="compact" tightens the gap and centers vertical dividers, nowrap keeps one row.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/page/wc/toolbar.html

```html
<minerva-toolbar aria-label="Filter orders">
  <minerva-input
    aria-label="Search orders"
    placeholder="Search orders"
    clearable
  ></minerva-input>
  <minerva-button variant="outline" color="neutral">Status</minerva-button>
  <minerva-button variant="outline" color="neutral">Date</minerva-button>
  <minerva-button>Export</minerva-button>
</minerva-toolbar>
<minerva-toolbar
  density="compact"
  nowrap
  aria-label="Formatting"
  style="margin-top: 16px"
>
  <minerva-icon-button label="Bold" toggle>B</minerva-icon-button>
  <minerva-icon-button label="Italic" toggle>I</minerva-icon-button>
  <minerva-divider orientation="vertical" spacing="4"></minerva-divider>
  <minerva-icon-button label="Undo">↶</minerva-icon-button>
  <minerva-icon-button label="Redo">↷</minerva-icon-button>
</minerva-toolbar>

```
