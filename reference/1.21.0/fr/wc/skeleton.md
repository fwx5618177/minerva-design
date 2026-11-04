# Skeleton

Formes de remplacement affichées pendant le chargement du contenu.

Package: minerva-design@1.21.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Skeleton

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/skeleton",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"text\" | \"circular\" | \"rectangular\" | \"rounded\" | \"button\" | \"image\" | \"card\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "\"pulse\" | \"wave\" | \"false\"",
    "attribute": "animation",
    "required": false
  },
  {
    "name": "loaded",
    "typeText": "boolean",
    "attribute": "loaded",
    "required": false
  },
  {
    "name": "decorative",
    "typeText": "boolean",
    "attribute": "decorative",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | undefined",
    "attribute": "size",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | undefined",
    "attribute": "width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "borderRadius",
    "typeText": "string | undefined",
    "attribute": "border-radius",
    "required": false
  },
  {
    "name": "lines",
    "typeText": "number",
    "attribute": "lines",
    "required": false
  },
  {
    "name": "avatar",
    "typeText": "boolean",
    "attribute": "avatar",
    "required": false
  },
  {
    "name": "avatarSize",
    "typeText": "string",
    "attribute": "avatar-size",
    "required": false
  },
  {
    "name": "avatarShape",
    "typeText": "\"circle\" | \"square\"",
    "attribute": "avatar-shape",
    "required": false
  },
  {
    "name": "active",
    "typeText": "boolean",
    "attribute": "active",
    "required": false
  },
  {
    "name": "paragraph",
    "typeText": "boolean",
    "attribute": "paragraph",
    "required": false
  },
  {
    "name": "heading",
    "typeText": "boolean",
    "attribute": "heading",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Real content, rendered once `loaded` is set"
  }
]
```

## SkeletonText

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/skeleton-text",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "lines",
    "typeText": "number",
    "attribute": "lines",
    "required": false
  },
  {
    "name": "lineHeight",
    "typeText": "string",
    "attribute": "line-height",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "noShrinkLast",
    "typeText": "boolean",
    "attribute": "no-shrink-last",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "\"pulse\" | \"wave\" | \"false\"",
    "attribute": "animation",
    "required": false
  }
]
```

## API

```json
{
  "wc:minerva-skeleton": {
    "kind": "element",
    "source": "web-components/src/components/skeleton/skeleton.ts",
    "className": "MinervaSkeleton",
    "summary": "Loading placeholder (lines, avatar, title, paragraph, card).",
    "description": "Placeholder shapes shown while content loads (`<Skeleton>` of React). By default it is an announced busy region (`role=\"status\"`, `aria-busy`, named \"Loading\"); once `loaded` is set it renders its slotted content instead. `decorative` renders one bare `aria-hidden` block, to compose custom layouts inside a container that already announces the busy state.",
    "properties": [
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"text\" | \"circular\" | \"rectangular\" | \"rounded\" | \"button\" | \"image\" | \"card\"",
        "default": "\"text\"",
        "description": "Shape of the placeholder"
      },
      {
        "name": "animation",
        "attribute": "animation",
        "type": "\"pulse\" | \"wave\" | \"false\"",
        "default": "\"pulse\"",
        "description": "Loading animation (\"false\" disables it)"
      },
      {
        "name": "loaded",
        "attribute": "loaded",
        "type": "boolean",
        "default": "false",
        "description": "Shows the slotted content instead of the placeholder (the React library's `loading={false}`)"
      },
      {
        "name": "decorative",
        "attribute": "decorative",
        "type": "boolean",
        "default": "false",
        "description": "Renders one bare decorative block (`aria-hidden`) instead of the busy region"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "string | undefined",
        "description": "Edge length of a decorative circular block (numbers are pixels; default 32)"
      },
      {
        "name": "width",
        "attribute": "width",
        "type": "string | undefined",
        "description": "Width of each line (numbers are pixels)"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "string | undefined",
        "description": "Height of each line (numbers are pixels)"
      },
      {
        "name": "borderRadius",
        "attribute": "border-radius",
        "type": "string | undefined",
        "description": "Corner radius of each line (numbers are pixels)"
      },
      {
        "name": "lines",
        "attribute": "lines",
        "type": "number",
        "default": "1",
        "description": "Number of lines"
      },
      {
        "name": "avatar",
        "attribute": "avatar",
        "type": "boolean",
        "default": "false",
        "description": "Shows an avatar placeholder"
      },
      {
        "name": "avatarSize",
        "attribute": "avatar-size",
        "type": "string",
        "default": "\"40\"",
        "description": "Avatar size (numbers are pixels)"
      },
      {
        "name": "avatarShape",
        "attribute": "avatar-shape",
        "type": "\"circle\" | \"square\"",
        "default": "\"circle\"",
        "description": "Avatar shape"
      },
      {
        "name": "active",
        "attribute": "active",
        "type": "boolean",
        "default": "false",
        "description": "Highlights the card variant as active"
      },
      {
        "name": "paragraph",
        "attribute": "paragraph",
        "type": "boolean",
        "default": "false",
        "description": "Shows a paragraph placeholder (replaces the lines)"
      },
      {
        "name": "heading",
        "attribute": "heading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a title placeholder (replaces the lines; the React library's `title`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Real content, rendered once `loaded` is set"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The busy region (role=status), or the single block of a decorative skeleton"
      },
      {
        "name": "avatar",
        "description": "The avatar placeholder"
      },
      {
        "name": "title",
        "description": "The title placeholder"
      },
      {
        "name": "line",
        "description": "Each line placeholder (also the paragraph lines)"
      }
    ],
    "cssProperties": [
      {
        "name": "--skeleton-color",
        "description": "Base color of the placeholder blocks"
      },
      {
        "name": "--skeleton-highlight-color",
        "description": "Color of the moving highlight (wave animation)"
      },
      {
        "name": "--skeleton-radius",
        "description": "Corner radius of the lines and blocks (circles stay round, rectangular blocks square)"
      },
      {
        "name": "--skeleton-text-height",
        "description": "Height of a text line"
      },
      {
        "name": "--skeleton-gap",
        "description": "Space between the lines of a paragraph and next to the avatar"
      }
    ]
  },
  "wc:minerva-skeleton-text": {
    "kind": "element",
    "source": "web-components/src/components/skeleton/skeleton.ts",
    "className": "MinervaSkeletonText",
    "summary": "Decorative block of text-line placeholders.",
    "description": "A decorative block of text-line placeholders (`<SkeletonText>` of React); the last line is shortened to 70% unless `no-shrink-last` is set. Hidden from assistive technologies: expose the busy state on the surrounding container.",
    "properties": [
      {
        "name": "lines",
        "attribute": "lines",
        "type": "number",
        "default": "3",
        "description": "Number of text lines"
      },
      {
        "name": "lineHeight",
        "attribute": "line-height",
        "type": "string",
        "default": "\"1em\"",
        "description": "Height of each line (numbers are pixels)"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string",
        "default": "\"2\"",
        "description": "Space between lines: a spacing-scale step (\"2\" -> var(--space-2)) or a CSS length"
      },
      {
        "name": "noShrinkLast",
        "attribute": "no-shrink-last",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the last line at full width (the React library's `shrinkLast={false}`)"
      },
      {
        "name": "animation",
        "attribute": "animation",
        "type": "\"pulse\" | \"wave\" | \"false\"",
        "default": "\"pulse\"",
        "description": "Loading animation (\"false\" disables it)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The block of lines"
      },
      {
        "name": "line",
        "description": "Each line placeholder"
      }
    ],
    "cssProperties": [
      {
        "name": "--skeleton-color",
        "description": "Base color of the placeholder blocks"
      },
      {
        "name": "--skeleton-highlight-color",
        "description": "Color of the moving highlight (wave animation)"
      },
      {
        "name": "--skeleton-radius",
        "description": "Corner radius of the lines and blocks (circles stay round, rectangular blocks square)"
      },
      {
        "name": "--skeleton-text-height",
        "description": "Height of a text line"
      },
      {
        "name": "--skeleton-gap",
        "description": "Space between the lines of a paragraph and next to the avatar"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Skeleton": {
    "kind": "cssVars",
    "source": "react/src/components/Skeleton",
    "vars": [
      {
        "name": "--skeleton-color",
        "description": "Base color of the placeholder blocks"
      },
      {
        "name": "--skeleton-highlight-color",
        "description": "Color of the moving highlight (wave animation)"
      },
      {
        "name": "--skeleton-radius",
        "description": "Corner radius of the lines and blocks (circles stay round, rectangular blocks square)"
      },
      {
        "name": "--skeleton-text-height",
        "description": "Height of a text line"
      },
      {
        "name": "--skeleton-gap",
        "description": "Space between the lines of a paragraph and next to the avatar"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Des lignes, ou un avatar avec un titre et un paragraphe. Le squelette est une région status occupée nommée « Chargement » (ou par son aria-label).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/wc/basic.html

```html
<div style="display: grid; gap: 24px">
  <minerva-skeleton lines="3"></minerva-skeleton>
  <minerva-skeleton avatar heading paragraph></minerva-skeleton>
  <minerva-skeleton
    avatar
    avatar-shape="square"
    avatar-size="56"
    lines="2"
    animation="wave"
    aria-label="Loading profile"
  ></minerva-skeleton>
</div>

```

## Example: Composition personnalisée

Les squelettes decorative et minerva-skeleton-text sont masqués des technologies d'assistance : composez-les dans un conteneur qui annonce l'état occupé.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/wc/composition.html

```html
<div
  role="status"
  aria-busy="true"
  aria-label="Loading article"
  style="display: grid; gap: 16px; max-width: 480px"
>
  <div style="display: flex; gap: 12px; align-items: center">
    <minerva-skeleton
      decorative
      variant="circular"
      size="40"
    ></minerva-skeleton>
    <minerva-skeleton decorative width="160" height="16"></minerva-skeleton>
  </div>
  <minerva-skeleton
    decorative
    variant="rounded"
    width="100%"
    height="160"
  ></minerva-skeleton>
  <minerva-skeleton-text lines="4"></minerva-skeleton-text>
  <minerva-skeleton-text
    lines="2"
    line-height="12px"
    gap="1"
    no-shrink-last
    animation="wave"
  ></minerva-skeleton-text>
</div>

```

## Example: Chargement du contenu

Définissez loaded une fois les données arrivées : le squelette affiche alors son contenu slotté. Cliquez sur Reload pour rejouer.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/wc/loading.html

```html
<div style="display: grid; gap: 12px; max-width: 420px">
  <div>
    <minerva-button id="reload" size="small" variant="outline"
      >Reload</minerva-button
    >
  </div>
  <minerva-skeleton id="post" avatar heading paragraph>
    <article style="display: flex; gap: 12px">
      <minerva-avatar name="Ada Lovelace"></minerva-avatar>
      <div>
        <strong>Ada Lovelace</strong>
        <p style="margin: 4px 0 0">
          The Analytical Engine weaves algebraic patterns just as the Jacquard
          loom weaves flowers and leaves.
        </p>
      </div>
    </article>
  </minerva-skeleton>
</div>

```

### apps/docs/src/docs/pages/skeleton/wc/loading.ts

```tsx
// The skeleton is a busy region until `loaded` is set; then it renders its
// slotted content instead.
export function setup(root: HTMLElement) {
  const post = root.querySelector<HTMLElement & { loaded: boolean }>("#post")!;
  const reload = root.querySelector<HTMLElement>("#reload")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const load = () => {
    post.loaded = false;
    clearTimeout(timer);
    timer = setTimeout(() => (post.loaded = true), 1500);
  };
  load();
  reload.addEventListener("click", load);
  return () => {
    clearTimeout(timer);
    reload.removeEventListener("click", load);
  };
}

```

## Example: Variantes et animations

Formes de substitution (width / height acceptent des pixels), pulse / wave / sans animation, et la variante card.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/wc/variants.html

```html
<div style="display: grid; gap: 16px">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <minerva-skeleton
      variant="circular"
      width="48"
      height="48"
    ></minerva-skeleton>
    <minerva-skeleton
      variant="rectangular"
      width="120"
      height="48"
    ></minerva-skeleton>
    <minerva-skeleton
      variant="rounded"
      width="120"
      height="48"
    ></minerva-skeleton>
    <minerva-skeleton variant="button" width="96"></minerva-skeleton>
    <minerva-skeleton
      variant="image"
      width="120"
      height="80"
    ></minerva-skeleton>
  </div>
  <div style="display: grid; gap: 8px">
    <minerva-skeleton animation="pulse" width="80%"></minerva-skeleton>
    <minerva-skeleton animation="wave" width="80%"></minerva-skeleton>
    <minerva-skeleton
      animation="false"
      width="80%"
      border-radius="0"
    ></minerva-skeleton>
  </div>
  <minerva-skeleton
    variant="card"
    avatar
    heading
    paragraph
    active
  ></minerva-skeleton>
</div>

```
