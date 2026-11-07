# Card 卡片

将相关内容和操作组合在一起的容器，由 CardHeader、CardTitle、CardDescription、CardContent 和 CardFooter 组成。

Package: minerva-design@1.22.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Card

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/card",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"default\" | \"outline\" | \"elevated\" | \"filled\" | \"ghost\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "attribute": "padding",
    "required": false
  },
  {
    "name": "interactive",
    "typeText": "boolean",
    "attribute": "interactive",
    "required": false
  },
  {
    "name": "as",
    "typeText": "\"div\" | \"article\" | \"section\" | \"a\" | \"button\"",
    "attribute": "as",
    "required": false
  },
  {
    "name": "href",
    "typeText": "string | undefined",
    "attribute": "href",
    "required": false
  },
  {
    "name": "target",
    "typeText": "string | undefined",
    "attribute": "target",
    "required": false
  },
  {
    "name": "rel",
    "typeText": "string | undefined",
    "attribute": "rel",
    "required": false
  },
  {
    "name": "download",
    "typeText": "string | undefined",
    "attribute": "download",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"button\" | \"submit\" | \"reset\"",
    "attribute": "type",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Sections (`<minerva-card-header>`, `<minerva-card-content>`, `<minerva-card-footer>`) or any content"
  }
]
```

## CardContent

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/card-content",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "\"fadeIn\" | \"slideIn\" | \"zoomIn\" | undefined",
    "attribute": "animation",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "attribute": "padding",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Body content"
  }
]
```

## CardDescription

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/card-description",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "Description text"
  }
]
```

## CardFooter

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/card-footer",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "padding",
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "attribute": "padding",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Footer content"
  }
]
```

## CardHeader

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/card-header",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "padding",
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "attribute": "padding",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Header content"
  }
]
```

## CardTitle

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/card-title",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "as",
    "typeText": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"",
    "attribute": "as",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Title text"
  }
]
```

## API

```json
{
  "wc:minerva-card": {
    "kind": "element",
    "source": "web-components/src/components/card/card.ts",
    "className": "MinervaCard",
    "summary": "Content container with header, content and footer sections.",
    "description": "A content container composed of `<minerva-card-header>`, `<minerva-card-content>` and `<minerva-card-footer>` (`<Card>` of React; omit a section to leave it out). `padding` switches to the padded layout (the card pads itself, sections sit flush), `interactive` adds hover / focus feedback, and `as=\"a\"` (with `href`) / `as=\"button\"` make the whole card a link / button. Shadow DOM notes: React styles the sections with descendant / sibling selectors (`.card.padded > .cardHeader + .cardContent`). Each section is its own element here, so the card tells its sections (and titles / descriptions) whether it is padded and which section precedes them, and they render the React library's rules in their own shadow roots — same visuals and `--card-*` variables.",
    "properties": [
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"default\" | \"outline\" | \"elevated\" | \"filled\" | \"ghost\"",
        "default": "\"default\"",
        "description": "Visual style: bordered, shadowed, a muted block or transparent"
      },
      {
        "name": "padding",
        "attribute": "padding",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
        "description": "Pads the card itself (sections then sit flush, separated by spacing and a footer rule). When omitted each section pads itself"
      },
      {
        "name": "interactive",
        "attribute": "interactive",
        "type": "boolean",
        "default": "false",
        "description": "Adds hover and focus-visible feedback (combine with `as=\"a\"` / `as=\"button\"`)"
      },
      {
        "name": "as",
        "attribute": "as",
        "type": "\"div\" | \"article\" | \"section\" | \"a\" | \"button\"",
        "default": "\"div\"",
        "description": "Element rendered as the root: div, article, section, a (link) or button"
      },
      {
        "name": "href",
        "attribute": "href",
        "type": "string | undefined",
        "description": "URL of a link card (`as=\"a\"`)"
      },
      {
        "name": "target",
        "attribute": "target",
        "type": "string | undefined",
        "description": "Link target (`as=\"a\"`)"
      },
      {
        "name": "rel",
        "attribute": "rel",
        "type": "string | undefined",
        "description": "Link relationship (`as=\"a\"`)"
      },
      {
        "name": "download",
        "attribute": "download",
        "type": "string | undefined",
        "description": "Downloads the link target (`as=\"a\"`)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables a button card (`as=\"button\"`)"
      },
      {
        "name": "type",
        "attribute": "type",
        "type": "\"button\" | \"submit\" | \"reset\"",
        "default": "\"button\"",
        "description": "Native type of a button card: plain button, submit or reset its form"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      }
    ],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Sections (`<minerva-card-header>`, `<minerva-card-content>`, `<minerva-card-footer>`) or any content"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The card root (div, article, section, a or button)"
      }
    ],
    "cssProperties": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  },
  "wc:minerva-card-header": {
    "kind": "element",
    "source": "web-components/src/components/card/card.ts",
    "className": "MinervaCardHeader",
    "summary": "Card header section.",
    "description": "Top section of a `<minerva-card>`, usually holding `<minerva-card-title>` and `<minerva-card-description>` (`<CardHeader>` of React).",
    "properties": [
      {
        "name": "padding",
        "attribute": "padding",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
        "description": "Overrides the inner spacing of this section"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Header content"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The section box"
      }
    ],
    "cssProperties": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  },
  "wc:minerva-card-content": {
    "kind": "element",
    "source": "web-components/src/components/card/card.ts",
    "className": "MinervaCardContent",
    "summary": "Card body section.",
    "description": "Main body of a `<minerva-card>` (`<CardContent>` of React), with an optional entrance animation.",
    "properties": [
      {
        "name": "animation",
        "attribute": "animation",
        "type": "\"fadeIn\" | \"slideIn\" | \"zoomIn\" | undefined",
        "description": "Entrance animation of the content"
      },
      {
        "name": "padding",
        "attribute": "padding",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
        "description": "Overrides the inner spacing of this section"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Body content"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The section box"
      }
    ],
    "cssProperties": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  },
  "wc:minerva-card-footer": {
    "kind": "element",
    "source": "web-components/src/components/card/card.ts",
    "className": "MinervaCardFooter",
    "summary": "Card footer section.",
    "description": "Bottom section of a `<minerva-card>`, e.g. for actions (`<CardFooter>` of React).",
    "properties": [
      {
        "name": "padding",
        "attribute": "padding",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
        "description": "Overrides the inner spacing of this section"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Footer content"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The section box"
      }
    ],
    "cssProperties": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  },
  "wc:minerva-card-title": {
    "kind": "element",
    "source": "web-components/src/components/card/card.ts",
    "className": "MinervaCardTitle",
    "summary": "Card heading.",
    "description": "Heading of a card (`<CardTitle>` of React), `h3` by default. Truncates with an ellipsis (wraps in a padded card).",
    "properties": [
      {
        "name": "as",
        "attribute": "as",
        "type": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"",
        "default": "\"h3\"",
        "description": "Heading level rendered"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Title text"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The heading element"
      }
    ],
    "cssProperties": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  },
  "wc:minerva-card-description": {
    "kind": "element",
    "source": "web-components/src/components/card/card.ts",
    "className": "MinervaCardDescription",
    "summary": "Card description text.",
    "description": "Secondary text shown below a card title (`<CardDescription>` of React).",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Description text"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The paragraph"
      }
    ],
    "cssProperties": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Card": {
    "kind": "cssVars",
    "source": "react/src/components/Card",
    "vars": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本用法

用页眉（标题 + 描述）、内容和页脚区块组合 <minerva-card>；省略某个区块即不显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/card/wc/basic.html

```html
<minerva-card style="max-width: 360px">
  <minerva-card-header>
    <minerva-card-title>Project Atlas</minerva-card-title>
    <minerva-card-description>Updated 2 hours ago</minerva-card-description>
  </minerva-card-header>
  <minerva-card-content>
    Migrate the billing service to the new event pipeline before the end of the
    quarter.
  </minerva-card-content>
  <minerva-card-footer>
    <minerva-button size="small" variant="outline" color="neutral"
      >Details</minerva-button
    >
  </minerva-card-footer>
</minerva-card>

```

## Example: 链接卡片与按钮卡片

as="a" 配合 href 让整张卡片成为链接，as="button" 则成为按钮（点击第二张卡片切换选中）；interactive 添加悬停和聚焦反馈。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/card/wc/interactive.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-card as="a" href="#card-link" interactive padding="medium">
    <minerva-card-title>Link card</minerva-card-title>
    <minerva-card-description
      >as="a" with href: the whole card is a link.</minerva-card-description
    >
  </minerva-card>
  <minerva-card
    id="select"
    as="button"
    interactive
    padding="medium"
    aria-pressed="false"
  >
    <minerva-card-title>Button card</minerva-card-title>
    <minerva-card-description
      >Click or press Enter to select.</minerva-card-description
    >
  </minerva-card>
  <minerva-card as="button" interactive disabled padding="medium">
    <minerva-card-title>Disabled</minerva-card-title>
    <minerva-card-description>Clicks are ignored.</minerva-card-description>
  </minerva-card>
</div>

```

### apps/docs/src/docs/pages/card/wc/interactive.ts

```tsx
// A link card renders a native <a>, a button card a native <button>
// (aria-pressed on the host is forwarded to it).
export function setup(root: HTMLElement) {
  const link = root.querySelector<HTMLElement>("minerva-card[as='a']")!;
  const card = root.querySelector<HTMLElement>("#select")!;
  // The docs use hash routing: keep the demo link from navigating
  const onLink = (event: Event) => event.preventDefault();
  const onClick = () => {
    const pressed = card.getAttribute("aria-pressed") === "true";
    card.setAttribute("aria-pressed", String(!pressed));
    card.setAttribute("variant", pressed ? "default" : "filled");
  };
  link.addEventListener("click", onLink);
  card.addEventListener("click", onClick);
  return () => {
    link.removeEventListener("click", onLink);
    card.removeEventListener("click", onClick);
  };
}

```

## Example: 内边距与动画

在卡片上设置 padding 会切换为内边距布局（各区块紧贴）；在区块上设置 padding 则覆盖其自身间距。animation 为内容添加入场动画。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/card/wc/padded.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  "
>
  <minerva-card padding="large" variant="outline">
    <minerva-card-header>
      <minerva-card-title as="h4">Padded layout</minerva-card-title>
      <minerva-card-description
        >The card pads itself; sections sit flush and the footer gets a
        rule.</minerva-card-description
      >
    </minerva-card-header>
    <minerva-card-content animation="fadeIn">
      Content fades in when the card is rendered.
    </minerva-card-content>
    <minerva-card-footer>
      <minerva-button size="small">Continue</minerva-button>
    </minerva-card-footer>
  </minerva-card>
  <minerva-card>
    <minerva-card-header padding="small">
      <minerva-card-title as="h4">Section padding</minerva-card-title>
    </minerva-card-header>
    <minerva-card-content padding="large" animation="slideIn">
      Each section can override its own spacing.
    </minerva-card-content>
    <minerva-card-footer padding="none">
      <minerva-button size="small" variant="ghost" full-width
        >Flush footer</minerva-button
      >
    </minerva-card-footer>
  </minerva-card>
</div>

```

## Example: 变体

default、outline、elevated、filled 和 ghost，这里使用带内边距的布局。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/card/wc/variants.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  "
>
  <minerva-card variant="default" padding="medium">
    <minerva-card-title>Default</minerva-card-title>
    <minerva-card-description>Border and surface</minerva-card-description>
  </minerva-card>
  <minerva-card variant="outline" padding="medium">
    <minerva-card-title>Outline</minerva-card-title>
    <minerva-card-description>Border only</minerva-card-description>
  </minerva-card>
  <minerva-card variant="elevated" padding="medium">
    <minerva-card-title>Elevated</minerva-card-title>
    <minerva-card-description>Shadowed</minerva-card-description>
  </minerva-card>
  <minerva-card variant="filled" padding="medium">
    <minerva-card-title>Filled</minerva-card-title>
    <minerva-card-description>Muted block</minerva-card-description>
  </minerva-card>
  <minerva-card variant="ghost" padding="medium">
    <minerva-card-title>Ghost</minerva-card-title>
    <minerva-card-description>Transparent</minerva-card-description>
  </minerva-card>
</div>

```
