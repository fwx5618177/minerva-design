# Tag

Small labels for marking and categorizing content; can be closable or clickable.

Package: minerva-design@1.22.3

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Accessibility

With clickable, the tag gets role="button" and tabIndex=0, and Enter or Space trigger onClick just like a mouse click. Use it for actions or toggles, not for navigation (use a link instead).

The close button is a native  with its own tab stop. Its accessible name defaults to "Close"; set closeLabel (e.g. "Remove React") so screen-reader users know which tag it removes.

A disabled clickable tag keeps role="button" with aria-disabled="true" and is skipped by Tab. When the selected state matters, also convey it in text or with aria attributes, not only with color.

## Tag

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Tag"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "ColorScheme | undefined",
    "typeRef": "type:67f905b25ade366da2d8",
    "default": "neutral",
    "required": false,
    "description": "Semantic color of the tag"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "enum",
    "values": [
      "outline",
      "solid",
      "subtle"
    ],
    "typeText": "\"solid\" | \"subtle\" | \"outline\" | undefined",
    "typeRef": "type:2399c7b51bc7a672b1d1",
    "default": "subtle",
    "required": false,
    "description": "Visual style: `subtle` (tinted background), `outline` (tinted background with a border) or `solid` (filled with the color, inverse text)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "TagSize | undefined",
    "typeRef": "type:1b50c44a085ea5bc5559",
    "default": "medium",
    "required": false,
    "description": "Tag size"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "TagShape | undefined",
    "typeRef": "type:af174b62ef533e028049",
    "default": "rounded",
    "required": false,
    "description": "Tag shape"
  },
  {
    "name": "closable",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a close button"
  },
  {
    "name": "clickable",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the tag content as a native button (focusable, activated with Enter / Space). With closable, the close button is a sibling button"
  },
  {
    "name": "pressed",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Pressed (selected) state of a toggle tag, e.g. a selectable filter (requires clickable); sets aria-pressed and the selected style"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon displayed before the content"
  },
  {
    "name": "avatar",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Avatar (e.g. a small Avatar or image) displayed before the content"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner instead of the icon / avatar, marks the tag busy and blocks its action; the close button is hidden"
  },
  {
    "name": "elevation",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a shadow"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the tag and its close button"
  },
  {
    "name": "closeIcon",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom close icon"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "union",
    "typeText": "string | ((label: string) => string) | undefined",
    "typeRef": "type:e1462d484de2d1b228ea",
    "parameters": [
      {
        "name": "label",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible label of the close button: a string, or a function of the tag's text label (the text of its children)"
  },
  {
    "name": "ripple",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows a ripple effect when a clickable tag is activated"
  }
]
```

### events

```json
[
  {
    "name": "onClose",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "function",
    "typeText": "((e: MouseEvent<HTMLElement, MouseEvent>) => void) | undefined",
    "typeRef": "type:b4c67073b20324f2ff46",
    "parameters": [
      {
        "name": "e",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLElement, MouseEvent>",
        "typeRef": "type:8a31e3515c88e9f54069"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the close button is clicked"
  },
  {
    "name": "onClick",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "function",
    "typeText": "((e: MouseEvent<HTMLElement, MouseEvent>) => void) | undefined",
    "typeRef": "type:e4d4f3dc8f62a537d140",
    "parameters": [
      {
        "name": "e",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLElement, MouseEvent>",
        "typeRef": "type:8a31e3515c88e9f54069"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the tag is activated (requires clickable)"
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
  "TagProps": {
    "source": "react/src/components/Tag/types.ts",
    "description": "Props of the Tag. The colors of each `color` can be overridden with CSS custom properties (e.g. through `style`, a class or a theme): `--tag-<color>-bg` (background of the `subtle` and `outline` variants) and `--tag-<color>-text` (text and border color of those variants), e.g. `--tag-danger-bg`, `--tag-neutral-text`.",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"onClick\" | \"color\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Content of the tag"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "default": "\"neutral\"",
        "description": "Semantic color of the tag"
      },
      {
        "name": "variant",
        "type": "\"subtle\" | \"outline\" | \"solid\"",
        "required": false,
        "default": "\"subtle\"",
        "description": "Visual style: `subtle` (tinted background), `outline` (tinted background with a border) or `solid` (filled with the color, inverse text)"
      },
      {
        "name": "size",
        "type": "TagSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Tag size"
      },
      {
        "name": "shape",
        "type": "TagShape",
        "required": false,
        "default": "\"rounded\"",
        "description": "Tag shape"
      },
      {
        "name": "closable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a close button"
      },
      {
        "name": "onClose",
        "type": "(e: React.MouseEvent<HTMLElement>) => void",
        "required": false,
        "description": "Called when the close button is clicked"
      },
      {
        "name": "clickable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders the tag content as a native button (focusable, activated with Enter / Space). With closable, the close button is a sibling button"
      },
      {
        "name": "onClick",
        "type": "(e: React.MouseEvent<HTMLElement>) => void",
        "required": false,
        "description": "Called when the tag is activated (requires clickable)"
      },
      {
        "name": "pressed",
        "type": "boolean",
        "required": false,
        "description": "Pressed (selected) state of a toggle tag, e.g. a selectable filter (requires clickable); sets aria-pressed and the selected style"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon displayed before the content"
      },
      {
        "name": "avatar",
        "type": "React.ReactNode",
        "required": false,
        "description": "Avatar (e.g. a small Avatar or image) displayed before the content"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner instead of the icon / avatar, marks the tag busy and blocks its action; the close button is hidden"
      },
      {
        "name": "elevation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a shadow"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the tag and its close button"
      },
      {
        "name": "closeIcon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Custom close icon"
      },
      {
        "name": "closeLabel",
        "type": "string | ((label: string) => string)",
        "required": false,
        "default": "\"Remove {label}\" (localized), or \"Close\" when the tag has no text",
        "description": "Accessible label of the close button: a string, or a function of the tag's text label (the text of its children)"
      },
      {
        "name": "ripple",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows a ripple effect when a clickable tag is activated"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Tag": {
    "kind": "cssVars",
    "source": "react/src/components/Tag",
    "vars": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Avatar and loading

avatar shows an avatar before the content. loading replaces the icon / avatar with a spinner, marks the tag busy, blocks its action and hides the close button.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/avatar-loading.tsx

```tsx
import { Avatar, Tag } from "minerva-design";
import { LuCode } from "react-icons/lu";

export default function AvatarLoadingDemo() {
  return (
    <>
      <Tag avatar={<Avatar name="Mia Rossi" size="xsmall" />} shape="circle">
        Mia Rossi
      </Tag>
      <Tag icon={<LuCode />} color="info" variant="outline">
        Frontend
      </Tag>
      <Tag loading color="info">
        Uploading
      </Tag>
      <Tag loading closable>
        Saving
      </Tag>
    </>
  );
}

```

## Example: Clickable (selectable)

clickable renders the content as a native button: focus it with Tab and activate it with a click, Enter or Space. Here the tags toggle a selection, exposed to assistive technologies with pressed.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/clickable.tsx

```tsx
import { useState } from "react";
import { Tag } from "minerva-design";

const topics = ["Design", "Frontend", "Backend", "Testing", "DevOps"];

export default function ClickableDemo() {
  const [selected, setSelected] = useState<string[]>(["Frontend"]);

  const toggle = (topic: string) =>
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {topics.map((topic) => (
          <Tag
            key={topic}
            clickable
            pressed={selected.includes(topic)}
            color={selected.includes(topic) ? "primary" : "neutral"}
            variant="outline"
            onClick={() => toggle(topic)}
          >
            {topic}
          </Tag>
        ))}
      </div>
      <p>Selected: {selected.join(", ") || "none"}</p>
    </div>
  );
}

```

## Example: Closable

Remove Tag 1, Tag 2 and Tag 3. After all tags are removed, Reset restores them.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/closable.tsx

```tsx
import { useState } from "react";
import { Tag, Button } from "minerva-design";
import { FaTimesCircle } from "react-icons/fa";

const initialTags = ["Tag 1", "Tag 2", "Tag 3"];

export default function ClosableDemo() {
  const [tags, setTags] = useState(initialTags);
  const [opened, setOpened] = useState<string>();

  return (
    <>
      {tags.map((tag, index) => (
        <Tag
          key={tag}
          closable
          closeLabel={(label) => `Remove ${label}`}
          closeIcon={index === 2 ? <FaTimesCircle aria-hidden /> : undefined}
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
          // clickable + closable: the tag and its close button are two
          // separate buttons, both reachable with Tab
          clickable={index === 0}
          onClick={() => setOpened(tag)}
        >
          {tag}
        </Tag>
      ))}
      {opened && <span>Opened: {opened}</span>}
      {tags.length === 0 && (
        <Button type="button" onClick={() => setTags(initialTags)}>
          Reset
        </Button>
      )}
    </>
  );
}

```

## Example: Colors

color conveys meaning: neutral (default), primary, success, warning, danger and info.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/colors.tsx

```tsx
import { Tag } from "minerva-design";

export default function ColorsDemo() {
  return (
    <>
      <Tag>Neutral</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="danger">Danger</Tag>
      <Tag color="info">Info</Tag>
    </>
  );
}

```

## Example: Custom colors

The CSS custom properties --tag-<color>-bg and --tag-<color>-text override the colors of a color (inline, in a class or in a theme); ripple={false} disables the click ripple.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/custom-colors.tsx

```tsx
import type { CSSProperties } from "react";
import { Tag } from "minerva-design";

// --tag-<color>-bg and --tag-<color>-text override the colors of a color; set
// them inline, in a class or in a theme to restyle every tag of that color.
const violet = {
  "--tag-primary-bg": "#ede9fe",
  "--tag-primary-text": "#5b21b6",
} as CSSProperties;

const dark = {
  "--tag-neutral-bg": "#0f172a",
  "--tag-neutral-text": "#f8fafc",
} as CSSProperties;

export default function CustomColorsDemo() {
  return (
    <>
      <Tag color="primary" variant="outline" style={violet}>
        Violet
      </Tag>
      <Tag style={dark}>Dark</Tag>
      <Tag style={{ fontStyle: "italic" }} ripple={false} clickable>
        No ripple
      </Tag>
    </>
  );
}

```

## Example: Disabled

Disabled tags ignore clicks, are removed from the tab order and disable their close button.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/disabled.tsx

```tsx
import { Tag } from "minerva-design";

export default function DisabledDemo() {
  return (
    <>
      <Tag disabled>Disabled</Tag>
      <Tag disabled closable color="primary">
        Disabled closable
      </Tag>
      <Tag disabled clickable color="info">
        Disabled clickable
      </Tag>
    </>
  );
}

```

## Example: Sizes and shapes

Three sizes and three shapes: square, rounded (default) and circle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/sizes-shapes.tsx

```tsx
import { Tag } from "minerva-design";

export default function SizesShapesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag size="small" color="primary">
          Small
        </Tag>
        <Tag size="medium" color="primary">
          Medium
        </Tag>
        <Tag size="large" color="primary">
          Large
        </Tag>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag shape="square" color="info">
          Square
        </Tag>
        <Tag shape="rounded" color="info">
          Rounded
        </Tag>
        <Tag shape="circle" color="info">
          Circle
        </Tag>
      </div>
    </div>
  );
}

```

## Example: Variants

variant sets the visual style: subtle (default, tinted background), outline (adds a border) or solid (filled with the color). elevation adds a shadow to any variant.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/variants.tsx

```tsx
import { HStack, Tag, VStack } from "minerva-design";

const variants = ["subtle", "outline", "solid"] as const;
const colors = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {variants.map((variant) => (
        <HStack key={variant} gap={2} wrap>
          {colors.map((color) => (
            <Tag key={color} variant={variant} color={color}>
              {variant}
            </Tag>
          ))}
        </HStack>
      ))}
      <HStack gap={2} wrap>
        <Tag elevation color="success">
          Elevation
        </Tag>
        <Tag variant="outline" elevation>
          Outline + elevation
        </Tag>
      </HStack>
    </VStack>
  );
}

```

## Example: With icon

icon is displayed before the content.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/with-icon.tsx

```tsx
import { Tag } from "minerva-design";
import { FaBug, FaCheck, FaClock } from "react-icons/fa";

export default function WithIconDemo() {
  return (
    <>
      <Tag icon={<FaCheck />} color="success">
        Done
      </Tag>
      <Tag icon={<FaClock />} color="warning">
        In progress
      </Tag>
      <Tag icon={<FaBug />} color="danger">
        Bug
      </Tag>
    </>
  );
}

```
