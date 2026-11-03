# IconButton

A compact button that only shows an icon. With pressed / defaultPressed it becomes a toggle button (favorite, like, mute...).

Package: minerva-design@1.20.0

Renderer: react

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

## IconButton

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "IconButton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon element to display (children are used when omitted)"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the button, also shown as its tooltip (unless showTooltip is false). Takes precedence over aria-label"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/IconButton/types.ts",
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
    "description": "Semantic color of the button"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "enum",
    "values": [
      "ghost",
      "outline",
      "solid"
    ],
    "typeText": "\"solid\" | \"outline\" | \"ghost\" | undefined",
    "typeRef": "type:da3cbf1bd0de7cd633f9",
    "default": "ghost",
    "required": false,
    "description": "Visual style: `ghost` (transparent until hovered), `solid` (filled with the color) or `outline` (bordered)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xsmall"
    ],
    "typeText": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:f0e395a4986e48b320c4",
    "default": "medium",
    "required": false,
    "description": "Button size"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "square"
    ],
    "typeText": "\"circle\" | \"square\" | undefined",
    "typeRef": "type:53f830419be13b669ce8",
    "default": "circle",
    "required": false,
    "description": "Button shape"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the button and removes it from the tab order"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Replaces the icon with a spinner and ignores activation (click, Enter, Space, form submission) while staying focusable: exposed as aria-busy + aria-disabled instead of the native disabled attribute"
  },
  {
    "name": "pressed",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Pressed state of a toggle button (controlled; pair with onPressedChange). Setting pressed, defaultPressed or onPressedChange makes the button a toggle: clicking flips the state and it is exposed as aria-pressed"
  },
  {
    "name": "defaultPressed",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Initial pressed state of an uncontrolled toggle button"
  },
  {
    "name": "tooltip",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "object",
    "typeText": "IconButtonTooltip | undefined",
    "typeRef": "type:9a52846262864f9be3a9",
    "required": false,
    "description": "Tooltip configuration (content, color, variant, shape, arrow); requires showTooltip"
  },
  {
    "name": "showTooltip",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the tooltip on hover and focus (its content is tooltip.content, or the label)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label; always set it, since the button only contains an icon"
  }
]
```

### events

```json
[
  {
    "name": "onPressedChange",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "function",
    "typeText": "((pressed: boolean) => void) | undefined",
    "typeRef": "type:709b19c66c1362e8395c",
    "parameters": [
      {
        "name": "pressed",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new pressed state when a toggle button is activated"
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

### bindings

```json
[
  {
    "prop": "pressed",
    "event": "onPressedChange",
    "syntax": "pressed={pressed} onPressedChange={handler}"
  }
]
```

## API

```json
{
  "IconButtonProps": {
    "source": "react/src/components/IconButton/types.ts",
    "description": "Styling hooks (CSS custom properties, set them on the button or an ancestor): `--icon-button-color` (icon color), `--icon-button-hover-bg` (hover background), `--icon-button-pressed-color` and `--icon-button-pressed-bg` (pressed toggle state).",
    "kind": "interface",
    "extends": [
      "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"color\">"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLButtonElement>",
        "required": false,
        "description": "Ref to the <button> element"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon element to display (children are used when omitted)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon element, alternative to the icon prop"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Accessible name of the button, also shown as its tooltip (unless showTooltip is false). Takes precedence over aria-label"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "default": "\"neutral\"",
        "description": "Semantic color of the button"
      },
      {
        "name": "variant",
        "type": "\"ghost\" | \"solid\" | \"outline\"",
        "required": false,
        "default": "\"ghost\"",
        "description": "Visual style: `ghost` (transparent until hovered), `solid` (filled with the color) or `outline` (bordered)"
      },
      {
        "name": "size",
        "type": "\"xsmall\" | \"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Button size"
      },
      {
        "name": "shape",
        "type": "\"circle\" | \"square\"",
        "required": false,
        "default": "\"circle\"",
        "description": "Button shape"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the button and removes it from the tab order"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Replaces the icon with a spinner and ignores activation (click, Enter, Space, form submission) while staying focusable: exposed as aria-busy + aria-disabled instead of the native disabled attribute"
      },
      {
        "name": "pressed",
        "type": "boolean",
        "required": false,
        "description": "Pressed state of a toggle button (controlled; pair with onPressedChange). Setting pressed, defaultPressed or onPressedChange makes the button a toggle: clicking flips the state and it is exposed as aria-pressed"
      },
      {
        "name": "defaultPressed",
        "type": "boolean",
        "required": false,
        "description": "Initial pressed state of an uncontrolled toggle button"
      },
      {
        "name": "onPressedChange",
        "type": "(pressed: boolean) => void",
        "required": false,
        "description": "Called with the new pressed state when a toggle button is activated"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "tooltip",
        "type": "IconButtonTooltip",
        "required": false,
        "description": "Tooltip configuration (content, color, variant, shape, arrow); requires showTooltip"
      },
      {
        "name": "showTooltip",
        "type": "boolean",
        "required": false,
        "default": "true when label is set, otherwise false",
        "description": "Shows the tooltip on hover and focus (its content is tooltip.content, or the label)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"icon button\" (localized)",
        "description": "Accessible label; always set it, since the button only contains an icon"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:IconButton": {
    "kind": "cssVars",
    "source": "react/src/components/IconButton",
    "vars": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Add increases the item counter. Settings and Delete illustrate accessible icon action labels.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/basic.tsx

```tsx
import { useState } from "react";
import { HStack, IconButton } from "minerva-design";
import { IoAdd, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";

export default function BasicDemo() {
  const [count, setCount] = useState(0);
  return (
    <HStack gap={3} align="center" wrap>
      <IconButton
        icon={<IoAdd />}
        aria-label="Add"
        onClick={() => setCount((n) => n + 1)}
      />
      <IconButton icon={<IoSettingsOutline />} aria-label="Settings" />
      <IconButton icon={<IoTrashOutline />} aria-label="Delete" />
      <output aria-live="polite">
        {count === 0 ? "Nothing added yet" : `Added ${count} item(s)`}
      </output>
    </HStack>
  );
}

```

## Example: Colors

color applies a semantic color: neutral (default), primary, success, warning, danger or info.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/colors.tsx

```tsx
import { IconButton } from "minerva-design";
import { IoHeart } from "react-icons/io5";

const colors = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function ColorsDemo() {
  return (
    <>
      {colors.map((color) => (
        <IconButton
          key={color}
          icon={<IoHeart />}
          color={color}
          label={color}
        />
      ))}
    </>
  );
}

```

## Example: Custom colors

Override the resolved colors with CSS custom properties: --icon-button-color (icon), --icon-button-hover-bg (hover background), --icon-button-pressed-color and --icon-button-pressed-bg (pressed toggle). Set them inline, in a class or on an ancestor.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/custom-colors.tsx

```tsx
import type { CSSProperties } from "react";
import { IconButton } from "minerva-design";
import { IoFlash, IoWater } from "react-icons/io5";

// CSS custom properties override the resolved colors; set them inline, in a
// class, or on an ancestor to restyle a whole toolbar.
const amber = {
  "--icon-button-color": "#b45309",
  "--icon-button-hover-bg": "rgba(245, 158, 11, 0.16)",
} as CSSProperties;

const sky = {
  "--icon-button-color": "#0ea5e9",
  "--icon-button-pressed-color": "#ffffff",
  "--icon-button-pressed-bg": "#0369a1",
} as CSSProperties;

export default function CustomColorsDemo() {
  return (
    <>
      <IconButton icon={<IoFlash />} style={amber} label="Energy" />
      <IconButton icon={<IoWater />} style={sky} defaultPressed label="Water" />
    </>
  );
}

```

## Example: Label and tooltip

label names the button and is shown as its tooltip; the icon can be passed as children. variant sets the visual style and color the semantic color.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/label.tsx

```tsx
import { IconButton } from "minerva-design";
import { LuPencil, LuRefreshCw, LuTrash2 } from "react-icons/lu";

export default function LabelDemo() {
  return (
    <>
      <IconButton label="Refresh" shape="square">
        <LuRefreshCw />
      </IconButton>
      <IconButton label="Edit" variant="outline" color="primary">
        <LuPencil />
      </IconButton>
      <IconButton label="Delete" variant="solid" color="danger" size="small">
        <LuTrash2 />
      </IconButton>
    </>
  );
}

```

## Example: Search button

A search action is an IconButton with a search icon and a label; with type="submit" it submits its form, and loading blocks it while the search runs. Use a Button when the action needs visible text.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/search.tsx

```tsx
import { useState } from "react";
import { Button, IconButton, Input } from "minerva-design";
import { IoSearch } from "react-icons/io5";

export default function SearchDemo() {
  const [loading, setLoading] = useState(false);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form
      onSubmit={search}
      style={{ display: "flex", gap: 8, alignItems: "center" }}
    >
      <Input aria-label="Query" placeholder="Search books" clearable />
      <IconButton
        type="submit"
        icon={<IoSearch />}
        label="Search"
        color="primary"
        variant="solid"
        loading={loading}
      />
      <Button type="submit" color="neutral" variant="outline" loading={loading}>
        Search
      </Button>
    </form>
  );
}

```

## Example: Sizes and shapes

Three sizes (small, medium, large) and two shapes (circle, square).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/sizes-and-shapes.tsx

```tsx
import { IconButton } from "minerva-design";
import { IoStar } from "react-icons/io5";

export default function SizesAndShapesDemo() {
  return (
    <>
      <IconButton icon={<IoStar />} size="small" aria-label="Small" />
      <IconButton icon={<IoStar />} size="medium" aria-label="Medium" />
      <IconButton icon={<IoStar />} size="large" aria-label="Large" />
      <IconButton
        icon={<IoStar />}
        shape="square"
        size="small"
        aria-label="Small square"
      />
      <IconButton icon={<IoStar />} shape="square" aria-label="Medium square" />
      <IconButton
        icon={<IoStar />}
        shape="square"
        size="large"
        aria-label="Large square"
      />
    </>
  );
}

```

## Example: States

loading replaces the icon with a spinner and keeps the button focusable (aria-busy + aria-disabled) while ignoring activation, pressed marks a toggle as on and disabled sets the native disabled attribute, which removes the button from the tab order.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/states.tsx

```tsx
import { useState } from "react";
import { IconButton } from "minerva-design";
import { IoCloudUploadOutline, IoMic, IoTrashOutline } from "react-icons/io5";

export default function StatesDemo() {
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);

  const upload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <IconButton
        icon={<IoCloudUploadOutline />}
        color="primary"
        loading={loading}
        onClick={upload}
        aria-label="Upload"
      />
      <IconButton
        icon={<IoMic />}
        pressed={muted}
        onPressedChange={setMuted}
        aria-label="Mute microphone"
      />
      <IconButton icon={<IoTrashOutline />} disabled aria-label="Delete" />
    </>
  );
}

```

## Example: Toggle button

Like starts off and updates its feedback; Bookmark starts on and Mute starts off.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/toggle.tsx

```tsx
import { useState } from "react";
import { IconButton } from "minerva-design";
import { IoBookmark, IoHeart, IoMicOff } from "react-icons/io5";

export default function ToggleDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      {/* controlled: the button exposes aria-pressed={liked} */}
      <IconButton
        icon={<IoHeart />}
        label="Like"
        color="danger"
        pressed={liked}
        onPressedChange={setLiked}
      />
      <span>{liked ? "Liked" : "Not liked yet"}</span>
      {/* uncontrolled */}
      <IconButton icon={<IoBookmark />} label="Bookmark" defaultPressed />
      <IconButton
        icon={<IoMicOff />}
        label="Mute"
        shape="square"
        defaultPressed={false}
      />
    </>
  );
}

```

## Example: Tooltip

Set showTooltip and tooltip to describe the action on hover and keyboard focus.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/tooltip.tsx

```tsx
import { IconButton } from "minerva-design";
import { IoCopyOutline, IoInformationCircleOutline } from "react-icons/io5";

export default function TooltipDemo() {
  return (
    <>
      <IconButton
        icon={<IoCopyOutline />}
        aria-label="Copy"
        showTooltip
        tooltip={{ content: "Copy to clipboard" }}
      />
      <IconButton
        icon={<IoInformationCircleOutline />}
        color="info"
        aria-label="More information"
        showTooltip
        tooltip={{ content: "Hover or focus to see me", arrow: true }}
      />
    </>
  );
}

```

## Example: Variants

variant sets the visual style: ghost (default, transparent until hovered), solid (filled with the color) or outline (bordered).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/variants.tsx

```tsx
import { HStack, IconButton, VStack } from "minerva-design";
import { IoHeart } from "react-icons/io5";

const variants = ["ghost", "solid", "outline"] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {(["neutral", "primary", "danger"] as const).map((color) => (
        <HStack key={color} gap={2} wrap>
          {variants.map((variant) => (
            <IconButton
              key={variant}
              icon={<IoHeart />}
              color={color}
              variant={variant}
              label={`${color} ${variant}`}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

```
