# Avatar アバター

画像、または画像がない場合は名前の頭文字で人物を表します。

Package: minerva-design@1.19.3

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Avatar

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Image URL. When omitted (or when it fails to load), the initials of name are shown"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false,
    "description": "Name of the person; used for the initials (first letters of the first two words, or the first CJK character), the alt text and the accessible label"
  },
  {
    "name": "alt",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Alternative text of the image; pass \"\" for a decorative avatar"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the avatar (and default alt text of its image)"
  },
  {
    "name": "fallback",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom fallback content shown instead of the initials when there is no image"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"circle\" | \"square\" | \"rounded\" | undefined",
    "typeRef": "type:76849e9a145c5140e0b1",
    "default": "circle",
    "required": false,
    "description": "Avatar shape"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "union",
    "typeText": "AvatarSize | undefined",
    "typeRef": "type:d2c1e5ff2faeefde540d",
    "default": "medium",
    "required": false,
    "description": "Avatar size: a preset (xsmall 24px, small 32px, medium 48px, large 64px, xlarge 80px, xxlarge 96px) or a number of pixels"
  },
  {
    "name": "stacked",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Uses tighter margins for overlapping avatars"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "count",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of additional avatars, shown as a \"+N\" indicator"
  },
  {
    "name": "max",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Maximum number of avatars to display; the others are counted in the \"+N\" indicator (added to count)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Avatar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the group"
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
  "AvatarProps": {
    "source": "react/src/components/Avatar/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLSpanElement>, \"children\">"
    ],
    "props": [
      {
        "name": "src",
        "type": "string",
        "required": false,
        "description": "Image URL. When omitted (or when it fails to load), the initials of name are shown"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Name of the person; used for the initials (first letters of the first two words, or the first CJK character), the alt text and the accessible label"
      },
      {
        "name": "alt",
        "type": "string",
        "required": false,
        "default": "name, or \"avatar\" (localized)",
        "description": "Alternative text of the image; pass \"\" for a decorative avatar"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "name, or \"avatar\" (localized)",
        "description": "Accessible label of the avatar (and default alt text of its image)"
      },
      {
        "name": "fallback",
        "type": "ReactNode",
        "required": false,
        "description": "Custom fallback content shown instead of the initials when there is no image"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Fallback content used when there is no name (e.g. an icon)"
      },
      {
        "name": "shape",
        "type": "\"circle\" | \"square\" | \"rounded\"",
        "required": false,
        "default": "\"circle\"",
        "description": "Avatar shape"
      },
      {
        "name": "size",
        "type": "AvatarSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Avatar size: a preset (xsmall 24px, small 32px, medium 48px, large 64px, xlarge 80px, xxlarge 96px) or a number of pixels"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "stacked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Uses tighter margins for overlapping avatars"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLSpanElement>",
        "required": false,
        "description": "Ref to the root <span> element"
      }
    ]
  },
  "AvatarGroupProps": {
    "source": "react/src/components/Avatar/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "count",
        "type": "number",
        "required": false,
        "description": "Number of additional avatars, shown as a \"+N\" indicator"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Maximum number of avatars to display; the others are counted in the \"+N\" indicator (added to count)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Avatar elements"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Avatar group\" / \"Avatar group with {count} more\" (localized)",
        "description": "Accessible label of the group"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
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

## Example: 基本的な使い方

Emma は画像、Liam はイニシャルを表示します。Noah は画像読み込み失敗を、最後のアバターは名前なしを示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/demos/basic.tsx

```tsx
import { Avatar } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Avatar
        src="https://randomuser.me/api/portraits/women/44.jpg"
        name="Emma Wilson"
      />
      <Avatar name="Liam Chen" />
      {/* The image cannot be decoded, so the initial is shown instead */}
      <Avatar src="data:image/png;base64,broken" name="Noah Park" />
      <Avatar />
    </>
  );
}

```

## Example: フォールバック・サイズ・max

イニシャルは最初の 2 語の頭文字（または最初の漢字）です。fallback や children で置き換えられます。size はピクセル値も受け付け、AvatarGroup の max は残りを +N にまとめます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/demos/fallback.tsx

```tsx
import { Avatar, AvatarGroup } from "minerva-design";
import { LuUser } from "react-icons/lu";

export default function FallbackDemo() {
  return (
    <>
      <Avatar name="Ada Lovelace" size="xsmall" />
      <Avatar name="张三" size={40} />
      <Avatar src="data:image/png;base64,broken" name="Grace Hopper" />
      <Avatar aria-label="Guest">
        <LuUser aria-hidden />
      </Avatar>
      <Avatar name="VIP" fallback="★" shape="rounded" size="xlarge" />
      <AvatarGroup max={2}>
        <Avatar name="Olivia" stacked />
        <Avatar name="James" stacked />
        <Avatar name="Sophia" stacked />
        <Avatar name="Lucas" stacked />
      </AvatarGroup>
    </>
  );
}

```

## Example: アバターグループ

同じ 4 人を重なったアバターで表示し、+5 で残りのメンバーを示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/demos/group.tsx

```tsx
import { Avatar, AvatarGroup } from "minerva-design";

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
        <Avatar key={person.name} name={person.name} src={person.src} stacked />
      ))}
    </AvatarGroup>
  );
}

```

## Example: 形状

circle（既定）、rounded、square。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/demos/shapes.tsx

```tsx
import { Avatar } from "minerva-design";

export default function ShapesDemo() {
  return (
    <>
      <Avatar shape="circle" name="Circle" />
      <Avatar shape="rounded" name="Rounded" />
      <Avatar shape="square" name="Square" />
      <Avatar
        shape="rounded"
        src="https://randomuser.me/api/portraits/men/32.jpg"
        name="Noah Martin"
      />
    </>
  );
}

```

## Example: サイズ

small、medium（既定）、large の 3 サイズ。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/demos/sizes.tsx

```tsx
import { Avatar } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Avatar size="small" name="Small" />
      <Avatar size="medium" name="Medium" />
      <Avatar size="large" name="Large" />
    </>
  );
}

```
