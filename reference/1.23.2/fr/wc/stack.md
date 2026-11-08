# Stack

Primitives de mise en page flex (Stack, HStack, VStack) avec des espacements par jetons, des séparateurs et des groupes accolés. Les enfants ne sont pas enveloppés.

Package: minerva-design@1.23.2

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## HStack

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/hstack",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "attribute": "align",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "attribute": "justify",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "attribute": "wrap",
    "required": false
  },
  {
    "name": "separator",
    "typeText": "StackSeparator | undefined",
    "attribute": "separator",
    "required": false
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "attribute": "attached",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Items"
  }
]
```

## Stack

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/stack",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "attribute": "align",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "attribute": "justify",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "attribute": "wrap",
    "required": false
  },
  {
    "name": "separator",
    "typeText": "StackSeparator | undefined",
    "attribute": "separator",
    "required": false
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "attribute": "attached",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Items"
  }
]
```

## VStack

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/vstack",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "attribute": "align",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "attribute": "justify",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "attribute": "wrap",
    "required": false
  },
  {
    "name": "separator",
    "typeText": "StackSeparator | undefined",
    "attribute": "separator",
    "required": false
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "attribute": "attached",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Items"
  }
]
```

## API

```json
{
  "wc:minerva-stack": {
    "kind": "element",
    "source": "web-components/src/components/stack/stack.ts",
    "className": "MinervaStack",
    "summary": "Flex row / column layout with gap, alignment, separators and attached groups.",
    "description": "A flex container laying out its children in a row or column with a token-based gap (`<Stack>` of React). Children are not wrapped; a `separator` is inserted between them, and `attached` joins them into one group (shared borders, outer corners only, `role=\"group\"`). Shadow DOM notes: the children stay in the light DOM and are slotted into the React library's `.stack` flex container. Separators are interleaved with manual slot assignment (one slot per child). Where `HTMLSlotElement.assign()` is missing (Safari < 16.4 and other older engines) the stack falls back to named slots: each element child gets a `slot=\"minerva-stack-item-<n>\"` attribute (only while a separator is set; removed again afterwards), so separators render between element children in both modes. Bare text children cannot carry a `slot` attribute: in the fallback they render after the element children without separators (wrap them in an element, e.g. a `<span>`). The `attached` rules style the children through `::slotted()` (top-level children only); their radius rules reach elements whose own box has the radius (native buttons / inputs), not the inner control of a custom element.",
    "properties": [
      {
        "name": "direction",
        "attribute": "direction",
        "type": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
        "default": "\"column\"",
        "description": "Flex direction"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number | undefined",
        "description": "Gap between items: numbers select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
        "description": "Cross-axis alignment (`align-items`); unset when omitted"
      },
      {
        "name": "justify",
        "attribute": "justify",
        "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
        "description": "Main-axis distribution (`justify-content`); unset when omitted"
      },
      {
        "name": "wrap",
        "attribute": "wrap",
        "type": "boolean",
        "default": "false",
        "description": "Wraps items onto multiple lines"
      },
      {
        "name": "separator",
        "attribute": "separator",
        "type": "StackSeparator | undefined",
        "description": "Rendered between every two items: a text (attribute) or a function returning fresh content (e.g. a new `<minerva-divider orientation=\"vertical\">`) per gap"
      },
      {
        "name": "attached",
        "attribute": "attached",
        "type": "boolean",
        "default": "false",
        "description": "Joins the items into one attached group: no gap, shared borders and outer-only corner radii, `role=\"group\"` (name it with `aria-label`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Items"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The flex container"
      }
    ],
    "cssProperties": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  },
  "wc:minerva-hstack": {
    "kind": "element",
    "source": "web-components/src/components/stack/stack.ts",
    "className": "MinervaHStack",
    "summary": "Horizontal stack.",
    "description": "A horizontal stack (`<HStack>` of React): `direction` is always `row` and items are centered on the cross axis unless `align` is set.",
    "properties": [
      {
        "name": "direction",
        "attribute": "direction",
        "type": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
        "default": "\"row\"",
        "description": "Flex direction"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number | undefined",
        "description": "Gap between items: numbers select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
        "description": "Cross-axis alignment (`align-items`); unset when omitted"
      },
      {
        "name": "justify",
        "attribute": "justify",
        "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
        "description": "Main-axis distribution (`justify-content`); unset when omitted"
      },
      {
        "name": "wrap",
        "attribute": "wrap",
        "type": "boolean",
        "default": "false",
        "description": "Wraps items onto multiple lines"
      },
      {
        "name": "separator",
        "attribute": "separator",
        "type": "StackSeparator | undefined",
        "description": "Rendered between every two items: a text (attribute) or a function returning fresh content (e.g. a new `<minerva-divider orientation=\"vertical\">`) per gap"
      },
      {
        "name": "attached",
        "attribute": "attached",
        "type": "boolean",
        "default": "false",
        "description": "Joins the items into one attached group: no gap, shared borders and outer-only corner radii, `role=\"group\"` (name it with `aria-label`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Items"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The flex container"
      }
    ],
    "cssProperties": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  },
  "wc:minerva-vstack": {
    "kind": "element",
    "source": "web-components/src/components/stack/stack.ts",
    "className": "MinervaVStack",
    "summary": "Vertical stack.",
    "description": "A vertical stack (`<VStack>` of React): `direction` is always `column` and items stretch on the cross axis unless `align` is set.",
    "properties": [
      {
        "name": "direction",
        "attribute": "direction",
        "type": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
        "default": "\"column\"",
        "description": "Flex direction"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number | undefined",
        "description": "Gap between items: numbers select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
        "description": "Cross-axis alignment (`align-items`); unset when omitted"
      },
      {
        "name": "justify",
        "attribute": "justify",
        "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
        "description": "Main-axis distribution (`justify-content`); unset when omitted"
      },
      {
        "name": "wrap",
        "attribute": "wrap",
        "type": "boolean",
        "default": "false",
        "description": "Wraps items onto multiple lines"
      },
      {
        "name": "separator",
        "attribute": "separator",
        "type": "StackSeparator | undefined",
        "description": "Rendered between every two items: a text (attribute) or a function returning fresh content (e.g. a new `<minerva-divider orientation=\"vertical\">`) per gap"
      },
      {
        "name": "attached",
        "attribute": "attached",
        "type": "boolean",
        "default": "false",
        "description": "Joins the items into one attached group: no gap, shared borders and outer-only corner radii, `role=\"group\"` (name it with `aria-label`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Items"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The flex container"
      }
    ],
    "cssProperties": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Stack": {
    "kind": "cssVars",
    "source": "react/src/components/Stack",
    "vars": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Groupes accolés

attached réunit les éléments en un seul groupe (sans espacement, bordures partagées) exposé en role="group" ; nommez-le avec aria-label.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/attached.html

```html
<minerva-hstack attached aria-label="Text alignment">
  <button
    type="button"
    style="
      padding: 6px 12px;
      border: 1px solid var(--border-color);
      background: var(--surface-color);
      color: inherit;
    "
  >
    Left
  </button>
  <button
    type="button"
    style="
      padding: 6px 12px;
      border: 1px solid var(--border-color);
      background: var(--surface-color);
      color: inherit;
    "
  >
    Center
  </button>
  <button
    type="button"
    style="
      padding: 6px 12px;
      border: 1px solid var(--border-color);
      background: var(--surface-color);
      color: inherit;
    "
  >
    Right
  </button>
</minerva-hstack>
<minerva-vstack
  attached
  aria-label="Account fields"
  style="margin-top: 16px; max-width: 280px"
>
  <input
    aria-label="Email"
    placeholder="Email"
    style="padding: 8px; border: 1px solid var(--border-color)"
  />
  <input
    aria-label="Password"
    type="password"
    placeholder="Password"
    style="padding: 8px; border: 1px solid var(--border-color)"
  />
</minerva-vstack>

```

## Example: Utilisation de base

Une colonne d'éléments avec un espacement issu des jetons (gap="3" vaut var(--space-3)). Les enfants sont insérés tels quels, sans enveloppe.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/basic.html

```html
<minerva-stack gap="3">
  <minerva-box p="3" bg="bg.muted" rounded="md">First</minerva-box>
  <minerva-box p="3" bg="bg.muted" rounded="md">Second</minerva-box>
  <minerva-box p="3" bg="bg.muted" rounded="md">Third</minerva-box>
</minerva-stack>

```

## Example: HStack, VStack et alignement

<minerva-hstack> est une ligne centrée sur l'axe secondaire, <minerva-vstack> une colonne étirée ; align, justify et direction (y compris les sens inversés) les ajustent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/hstack-vstack.html

```html
<minerva-vstack gap="4">
  <minerva-hstack gap="2">
    <minerva-button size="small">Save</minerva-button>
    <minerva-button size="small" variant="outline" color="neutral"
      >Cancel</minerva-button
    >
    <span>HStack centers its items</span>
  </minerva-hstack>
  <minerva-hstack
    gap="2"
    justify="between"
    style="padding: 8px; border: 1px dashed var(--border-color)"
  >
    <span>justify="between"</span>
    <minerva-button size="small" variant="ghost">Edit</minerva-button>
  </minerva-hstack>
  <minerva-stack direction="row-reverse" gap="2" align="end">
    <minerva-box p="2" bg="bg.muted" rounded="sm">1</minerva-box>
    <minerva-box p="4" bg="bg.muted" rounded="sm">2</minerva-box>
    <minerva-box p="6" bg="bg.muted" rounded="sm"
      >3 (row-reverse, align end)</minerva-box
    >
  </minerva-stack>
</minerva-vstack>

```

## Example: Séparateurs et retour à la ligne

separator insère un texte entre les éléments ou, défini comme propriété JS, une fonction qui renvoie un contenu neuf à chaque intervalle (ici un séparateur vertical). wrap permet aux éléments de passer sur plusieurs lignes. Les séparateurs utilisent l'assignation manuelle des slots ; dans les navigateurs sans slot.assign() (Safari < 16.4), la pile se rabat sur des slots nommés (un attribut slot="minerva-stack-item-n" sur chaque enfant élément tant qu'un séparateur est défini), si bien que les séparateurs apparaissent toujours entre les enfants éléments (enveloppez le texte nu dans un élément).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/wrap-separator.html

```html
<minerva-hstack id="breadcrumb" gap="2" separator="/">
  <a href="#home">Home</a>
  <a href="#library">Library</a>
  <span aria-current="page">Data</span>
</minerva-hstack>
<minerva-hstack id="links" gap="3" style="margin-top: 12px">
  <span>Profile</span>
  <span>Billing</span>
  <span>Team</span>
</minerva-hstack>
<minerva-stack
  direction="row"
  wrap
  gap="2"
  style="margin-top: 12px; max-width: 320px"
>
  <minerva-tag>design</minerva-tag>
  <minerva-tag>accessibility</minerva-tag>
  <minerva-tag>web components</minerva-tag>
  <minerva-tag>tokens</minerva-tag>
  <minerva-tag>layout</minerva-tag>
  <minerva-tag>shadow DOM</minerva-tag>
</minerva-stack>

```

### apps/docs/src/docs/pages/stack/wc/wrap-separator.ts

```tsx
// `separator` set as a property can be a function: it returns fresh content
// for every gap (here a vertical divider).
export function setup(root: HTMLElement) {
  const links = root.querySelector<HTMLElement & { separator: () => Node }>(
    "#links",
  )!;
  links.separator = () => {
    const divider = document.createElement("minerva-divider");
    divider.setAttribute("orientation", "vertical");
    divider.setAttribute("spacing", "0");
    return divider;
  };
  // The docs use hash routing: keep the demo links from navigating
  const onClick = (event: Event) => {
    if ((event.target as Element).closest("a")) event.preventDefault();
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}

```
