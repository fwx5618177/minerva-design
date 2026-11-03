# Avatar 头像

以图片表示用户；没有图片时显示名字的首字母。

Package: minerva-design@1.20.0

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Avatar

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "type": "string",
    "required": false,
    "description": "Image URL. When omitted (or when it fails to load), the initials of name are shown",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "default": "\"\"",
    "required": false,
    "description": "Name of the person; used for the initials (first letters of the first two\nwords, or the first CJK character), the alt text and the accessible label",
    "typeText": "string"
  },
  {
    "name": "alt",
    "type": "string",
    "required": false,
    "description": "Alternative text of the image; pass \"\" for a decorative avatar",
    "typeText": "string"
  },
  {
    "name": "fallback",
    "type": "string",
    "required": false,
    "description": "Custom fallback text shown instead of the initials when there is no\nimage (or the `fallback` slot)",
    "typeText": "string"
  },
  {
    "name": "shape",
    "type": "\"rounded\" | \"circle\" | \"square\"",
    "default": "\"circle\"",
    "required": false,
    "description": "Avatar shape",
    "typeText": "\"rounded\" | \"circle\" | \"square\""
  },
  {
    "name": "size",
    "type": "AvatarSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Avatar size: a preset (xsmall 24px, small 32px, medium 48px, large 64px,\nxlarge 80px, xxlarge 96px) or a number of pixels",
    "typeText": "AvatarSize"
  },
  {
    "name": "stacked",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Uses tighter margins for overlapping avatars",
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Fallback content used when there is no name (e.g. an icon)",
    "typeText": "any"
  },
  {
    "name": "fallback",
    "type": "any",
    "description": "Custom fallback content shown instead of the initials (the `fallback` prop)",
    "typeText": "any"
  }
]
```

## AvatarGroup

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "type": "number",
    "required": false,
    "description": "Number of additional avatars, shown as a \"+N\" indicator",
    "typeText": "number"
  },
  {
    "name": "max",
    "type": "number",
    "required": false,
    "description": "Maximum number of avatars to display; the others are counted in the\n\"+N\" indicator (added to count)",
    "typeText": "number"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Avatars (`v-if`-ed avatars are not counted)",
    "typeText": "any"
  }
]
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/vue/basic.vue

```vue
<script setup lang="ts">
import { Avatar, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" align="center"
    ><Avatar
      src="https://randomuser.me/api/portraits/women/44.jpg"
      name="Emma Wilson" /><Avatar name="Liam Chen" /><Avatar
      src="data:image/png;base64,broken"
      name="Noah Park" /><Avatar
  /></HStack>
</template>

```

## Example: fallback

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/vue/fallback.vue

```vue
<script setup lang="ts">
import { Avatar, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Avatar name="Ada Lovelace" /><Avatar
      src="/missing-avatar.png"
      name="Grace Hopper" /><Avatar name=""
  /></HStack>
</template>

```

## Example: group

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/vue/group.vue

```vue
<script setup lang="ts">
import { Avatar, AvatarGroup } from "minerva-design/vue";
const people = [
  { name: "Olivia", src: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "James", src: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Sophia" },
  { name: "Lucas" },
];
</script>
<template>
  <AvatarGroup :count="5"
    ><Avatar
      v-for="person in people"
      :key="person.name"
      :name="person.name"
      :src="person.src"
      stacked
  /></AvatarGroup>
</template>

```

## Example: shapes-sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/vue/shapes-sizes.vue

```vue
<script setup lang="ts">
import { Avatar, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Avatar name="Ada" size="small" shape="circle" /><Avatar
      name="Grace"
      size="medium"
      shape="square" /><Avatar name="Alan" size="large" shape="rounded"
  /></HStack>
</template>

```
