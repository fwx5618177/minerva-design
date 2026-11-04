# Avatar

Représente une personne par une photo ou, à défaut, par l'initiale de son nom.

Package: minerva-design@1.20.6

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## Avatar

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Avatar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "src",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "union",
    "typeText": "string | ImageSourcePropType | undefined",
    "typeRef": "type:69f95e44a49476e4fc15",
    "required": false,
    "description": "Image: a URL or an `Image` source (`require(\"./me.png\")`). When omitted (or when it fails to load), the initials of `name` are shown"
  },
  {
    "name": "name",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false,
    "description": "Name of the person: initials (first letters of the first two words, or the first CJK character), the accessible label and the fallback color"
  },
  {
    "name": "alt",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Alternative text of the image; pass \"\" for a decorative avatar"
  },
  {
    "name": "aria-label",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the avatar (alias of `accessibilityLabel`)"
  },
  {
    "name": "fallback",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom fallback content shown instead of the initials"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "AvatarShape | undefined",
    "typeRef": "type:81f0394108a1915a4579",
    "default": "circle",
    "required": false,
    "description": "Avatar shape"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "union",
    "typeText": "AvatarSize | undefined",
    "typeRef": "type:d2c1e5ff2faeefde540d",
    "default": "medium",
    "required": false,
    "description": "A preset (xsmall 24, small 32, medium 48, large 64, xlarge 80, xxlarge 96) or a number of dp"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "SemanticColor | undefined",
    "typeRef": "type:fb510f224f696f21d0ad",
    "required": false,
    "description": "Color of the initials fallback; picked from the name when omitted (the same name always gets the same color)"
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

## AvatarGroup

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "AvatarGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "max",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Maximum number of avatars to display; the others are counted in the \"+N\" avatar"
  },
  {
    "name": "count",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of additional avatars (not rendered), added to the \"+N\" avatar"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "union",
    "typeText": "AvatarSize | undefined",
    "typeRef": "type:d2c1e5ff2faeefde540d",
    "default": "medium",
    "required": false,
    "description": "Size of every avatar of the group"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "AvatarShape | undefined",
    "typeRef": "type:81f0394108a1915a4579",
    "default": "circle",
    "required": false,
    "description": "Shape of every avatar of the group"
  },
  {
    "name": "spacing",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Overlap between avatars in dp"
  },
  {
    "name": "aria-label",
    "source": "packages/native/src/components/Avatar/Avatar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the group (alias of `accessibilityLabel`)"
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
  "native:AvatarProps": {
    "source": "native/src/components/Avatar/Avatar.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "src",
        "type": "string | ImageSourcePropType",
        "required": false,
        "description": "Image: a URL or an `Image` source (`require(\"./me.png\")`). When omitted (or when it fails to load), the initials of `name` are shown"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Name of the person: initials (first letters of the first two words, or the first CJK character), the accessible label and the fallback color"
      },
      {
        "name": "alt",
        "type": "string",
        "required": false,
        "description": "Alternative text of the image; pass \"\" for a decorative avatar"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the avatar (alias of `accessibilityLabel`)"
      },
      {
        "name": "fallback",
        "type": "ReactNode",
        "required": false,
        "description": "Custom fallback content shown instead of the initials"
      },
      {
        "name": "shape",
        "type": "AvatarShape",
        "required": false,
        "default": "\"circle\"",
        "description": "Avatar shape"
      },
      {
        "name": "size",
        "type": "AvatarSize",
        "required": false,
        "default": "\"medium\"",
        "description": "A preset (xsmall 24, small 32, medium 48, large 64, xlarge 80, xxlarge 96) or a number of dp"
      },
      {
        "name": "color",
        "type": "SemanticColor",
        "required": false,
        "description": "Color of the initials fallback; picked from the name when omitted (the same name always gets the same color)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Fallback content when there is neither an image nor a name"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the avatar"
      }
    ]
  },
  "native:AvatarGroupProps": {
    "source": "native/src/components/Avatar/Avatar.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "The Avatar elements"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Maximum number of avatars to display; the others are counted in the \"+N\" avatar"
      },
      {
        "name": "count",
        "type": "number",
        "required": false,
        "description": "Number of additional avatars (not rendered), added to the \"+N\" avatar"
      },
      {
        "name": "size",
        "type": "AvatarSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of every avatar of the group"
      },
      {
        "name": "shape",
        "type": "AvatarShape",
        "required": false,
        "default": "\"circle\"",
        "description": "Shape of every avatar of the group"
      },
      {
        "name": "spacing",
        "type": "number",
        "required": false,
        "default": "a quarter of the avatar size",
        "description": "Overlap between avatars in dp"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the group (alias of `accessibilityLabel`)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the group"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Avatar": {
    "kind": "cssVars",
    "source": "react/src/components/Avatar",
    "vars": [
      {
        "name": "--avatar-size",
        "description": "Width and height of every avatar (overrides the size presets; a numeric size prop wins)"
      },
      {
        "name": "--avatar-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--avatar-bg-color",
        "description": "Background color when no color is set (defaults to --info-color)"
      },
      {
        "name": "--avatar-text-color",
        "description": "Color of the initials"
      },
      {
        "name": "--avatar-border-color",
        "description": "Border color"
      },
      {
        "name": "--avatar-stacked-overlap",
        "description": "How far a stacked avatar overlaps the previous one"
      },
      {
        "name": "--avatar-group-overlap",
        "description": "How far each avatar overlaps the previous one"
      },
      {
        "name": "--avatar-group-count-bg-color",
        "description": "Background color of the \"+N\" counter"
      },
      {
        "name": "--avatar-group-count-text-color",
        "description": "Text color of the \"+N\" counter"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Emma affiche une image, Liam ses initiales ; Noah montre un échec de chargement et le dernier avatar ne reçoit aucun nom.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/native/basic.tsx

```tsx
import { View } from "react-native";
import { Avatar } from "minerva-design/native";

export default function BasicDemo() {
  return (
    <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
      <Avatar
        src="https://randomuser.me/api/portraits/women/44.jpg"
        name="Emma Wilson"
      />
      <Avatar name="Liam Chen" />
      {/* The image cannot be decoded, so the initial is shown instead */}
      <Avatar src="data:image/png;base64,broken" name="Noah Park" />
      <Avatar />
    </View>
  );
}

```

## Example: Groupe d'avatars

Les quatre mêmes personnes sont regroupées avec chevauchement et un indicateur +5.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/native/group.tsx

```tsx
import { Avatar, AvatarGroup } from "minerva-design/native";

const people = [
  { name: "Olivia", src: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "James", src: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Sophia" },
  { name: "Lucas" },
];

export default function GroupDemo() {
  return (
    <AvatarGroup count={5}>
      {people.map((person) => (
        <Avatar key={person.name} name={person.name} src={person.src} />
      ))}
    </AvatarGroup>
  );
}

```

## Example: sizes-shapes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/native/sizes-shapes.tsx

```tsx
import { View } from "react-native";
import { Avatar } from "minerva-design/native";

const SIZES = ["xsmall", "small", "medium", "large", "xlarge"] as const;
const SHAPES = ["circle", "rounded", "square"] as const;
const PHOTO = "https://randomuser.me/api/portraits/men/32.jpg";

export default function SizesShapes() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} name="Noah Kim" src={PHOTO} />
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        {SHAPES.map((shape) => (
          <Avatar key={shape} shape={shape} size="large" name="Noah Kim" />
        ))}
        <Avatar size={56} shape="rounded" name="Noah Kim" src={PHOTO} />
      </View>
    </View>
  );
}

```
