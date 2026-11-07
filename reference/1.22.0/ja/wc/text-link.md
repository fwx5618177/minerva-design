# TextLink テキストリンク

インラインリンク、控えめなナビゲーション、設定行のためのスタイル付きネイティブリンク。asChild でアンカーを入れ子にせずルーターリンクにスタイルを適用します。

Package: minerva-design@1.22.0

Renderer: wc

Locale: ja

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

## TextLink

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/text-link",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"default\" | \"subtle\" | \"action\"",
    "attribute": "variant",
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
    "name": "hreflang",
    "typeText": "string | undefined",
    "attribute": "hreflang",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Link text (and icons)"
  }
]
```

## API

```json
{
  "wc:minerva-text-link": {
    "kind": "element",
    "source": "web-components/src/components/text-link/text-link.ts",
    "className": "MinervaTextLink",
    "summary": "Styled native link (default, subtle, action row).",
    "description": "A styled native link (`<TextLink>` of React). Renders an `<a>` in its shadow root (one tab stop, activated with Enter); the subtle variant appends a decorative chevron as a non-color cue. To style a router link instead, put the router's anchor inside and use the CSS variables, or use the element's `href` with your router's click interception.",
    "properties": [
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"default\" | \"subtle\" | \"action\"",
        "default": "\"default\"",
        "description": "Visual style"
      },
      {
        "name": "href",
        "attribute": "href",
        "type": "string | undefined",
        "description": "URL of the link (`javascript:` / `vbscript:` URLs are not rendered)"
      },
      {
        "name": "target",
        "attribute": "target",
        "type": "string | undefined",
        "description": "Browsing context (`_blank`...)"
      },
      {
        "name": "rel",
        "attribute": "rel",
        "type": "string | undefined",
        "description": "Link relationship (`noopener`...); defaults to `noopener noreferrer` with `target=\"_blank\"`"
      },
      {
        "name": "download",
        "attribute": "download",
        "type": "string | undefined",
        "description": "Downloads the target instead of navigating (optional file name)"
      },
      {
        "name": "hreflang",
        "attribute": "hreflang",
        "type": "string | undefined",
        "description": "Language of the linked resource"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "blur",
        "signature": "() => void"
      },
      {
        "name": "click",
        "signature": "() => void"
      }
    ],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Link text (and icons)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The native <a> (React: the slotted child with asChild)"
      }
    ],
    "cssProperties": [
      {
        "name": "--text-link-color",
        "description": "Color of the default variant (falls back to --link-color, then --primary-color)"
      },
      {
        "name": "--text-link-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--text-link-text-decoration",
        "description": "Text decoration of the default variant (default: underline)"
      },
      {
        "name": "--text-link-underline-offset",
        "description": "Distance between the text and its underline"
      },
      {
        "name": "--text-link-action-min-height",
        "description": "Minimum height of the action variant"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:TextLink": {
    "kind": "cssVars",
    "source": "react/src/components/TextLink",
    "vars": [
      {
        "name": "--text-link-color",
        "description": "Color of the default variant (falls back to --link-color, then --primary-color)"
      },
      {
        "name": "--text-link-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--text-link-text-decoration",
        "description": "Text decoration of the default variant (default: underline)"
      },
      {
        "name": "--text-link-underline-offset",
        "description": "Distance between the text and its underline"
      },
      {
        "name": "--text-link-action-min-height",
        "description": "Minimum height of the action variant"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

シャドウルート内のネイティブ <a>。href、target、rel、hreflang、download がそのまま渡されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/wc/basic.html

```html
<p style="margin: 0">
  Read the
  <minerva-text-link
    href="https://developer.mozilla.org/docs/Web/HTML/Element/a"
    target="_blank"
    rel="noopener noreferrer"
    hreflang="en"
    >anchor reference</minerva-text-link
  >
  before writing your own links, or
  <minerva-text-link href="data:text/plain,Minerva" download="minerva.txt"
    >download a sample file</minerva-text-link
  >.
</p>

```

## Example: CSS 変数

色、太さ、下線とそのオフセットを CSS 変数でリンクごとに調整できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/wc/styling.html

```html
<div
  style="
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    --text-link-color: var(--success-color);
    --text-link-font-weight: 600;
    --text-link-underline-offset: 4px;
  "
>
  <minerva-text-link href="https://example.com" target="_blank" rel="noopener"
    >Custom color</minerva-text-link
  >
  <minerva-text-link
    href="https://example.com"
    target="_blank"
    rel="noopener"
    style="--text-link-text-decoration: none"
    >No underline</minerva-text-link
  >
</div>

```

## Example: バリアントとルーティング

default は下線付き、subtle は山形アイコン付き、action は設定行です。クリックはクライアントサイドルーターのようにホスト要素で横取りされます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/wc/variants.html

```html
<div style="display: grid; gap: 16px; width: 320px">
  <p style="margin: 0">
    Read the
    <minerva-text-link href="/guide">community guide</minerva-text-link>
    first.
  </p>
  <minerva-text-link href="/reviews" variant="subtle"
    >View all reviews</minerva-text-link
  >
  <div>
    <minerva-text-link href="/account" variant="action"
      >Account settings</minerva-text-link
    >
    <minerva-text-link href="/security" variant="action"
      >Security</minerva-text-link
    >
  </div>
  <output id="route">Click a link: the navigation is intercepted.</output>
</div>

```

### apps/docs/src/docs/pages/text-link/wc/variants.ts

```tsx
// Client-side routing: the click is composed out of the shadow root, so a
// router can intercept it on the host and read its `href`.
export function setup(root: HTMLElement) {
  const route = root.querySelector<HTMLOutputElement>("#route")!;
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element).closest<
      HTMLElement & { href?: string }
    >("minerva-text-link");
    if (!link) return;
    event.preventDefault();
    route.value = `Navigated to ${link.href}`;
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}

```
