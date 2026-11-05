# TextLink テキストリンク

インラインリンク、控えめなナビゲーション、設定行のためのスタイル付きネイティブリンク。asChild でアンカーを入れ子にせずルーターリンクにスタイルを適用します。

Package: minerva-design@1.21.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## TextLink

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "TextLink"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "source": "packages/react/src/components/TextLink/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the link styling onto its single child element (e.g. a router `<Link>`) instead of rendering an extra `<a>`"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/TextLink/types.ts",
    "kind": "enum",
    "values": [
      "action",
      "default",
      "subtle"
    ],
    "typeText": "TextLinkVariant | undefined",
    "typeRef": "type:ab3160d6c0af67fa8e23",
    "default": "default",
    "required": false,
    "description": "default: underlined inline link; subtle: quiet link with a trailing chevron; action: full-width row link with a bottom rule (settings lists, menus)"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "TextLinkProps": {
    "source": "react/src/components/TextLink/types.ts",
    "kind": "interface",
    "extends": [
      "AnchorHTMLAttributes<HTMLAnchorElement>"
    ],
    "props": [
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Merges the link styling onto its single child element (e.g. a router `<Link>`) instead of rendering an extra `<a>`"
      },
      {
        "name": "variant",
        "type": "TextLinkVariant",
        "required": false,
        "default": "\"default\"",
        "description": "default: underlined inline link; subtle: quiet link with a trailing chevron; action: full-width row link with a bottom rule (settings lists, menus)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLAnchorElement>",
        "required": false,
        "description": "Ref to the anchor element"
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

## Example: ルーターリンク

asChild はスタイルを唯一の子要素にマージします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/demos/as-child.tsx

```tsx
import { TextLink } from "minerva-design";

// Stand-in for a router link component (e.g. react-router's <Link>)
const RouterLink = ({ children, ...props }: React.ComponentProps<"a">) => (
  <a {...props}>{children}</a>
);

export default function AsChildDemo() {
  return (
    <TextLink asChild variant="subtle">
      <RouterLink href="#articles">Articles</RouterLink>
    </TextLink>
  );
}

```

## Example: バリアント

default は下線付き、subtle は色以外の手がかりとして矢印を付け、action は全幅の行になります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/demos/variants.tsx

```tsx
import { TextLink } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: 320 }}>
      <p style={{ margin: 0 }}>
        Read the <TextLink href="#guide">community guide</TextLink> first.
      </p>
      <TextLink href="#all" variant="subtle">
        View all reviews
      </TextLink>
      <div>
        <TextLink href="#account" variant="action">
          Account settings
        </TextLink>
        <TextLink href="#security" variant="action">
          Security
        </TextLink>
      </div>
    </div>
  );
}

```
