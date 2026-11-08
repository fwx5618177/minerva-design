# Avatar 头像

以图片表示用户；没有图片时显示名字的首字母。

Package: minerva-design@1.23.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Avatar

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/avatar",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "src",
    "typeText": "string | undefined",
    "attribute": "src",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "alt",
    "typeText": "string | undefined",
    "attribute": "alt",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"square\" | \"rounded\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "size",
    "typeText": "AvatarSize",
    "attribute": "size",
    "required": false
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Fallback content used when there is no name (e.g. an icon)"
  },
  {
    "name": "fallback",
    "description": "Custom fallback content shown instead of the initials"
  }
]
```

## AvatarGroup

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/avatar-group",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "count",
    "typeText": "number | undefined",
    "attribute": "count",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "attribute": "max",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "`<minerva-avatar>` elements"
  }
]
```

## API

```json
{
  "wc:minerva-avatar": {
    "kind": "element",
    "source": "web-components/src/components/avatar/avatar.ts",
    "className": "MinervaAvatar",
    "summary": "Picture of a person with an initials / icon fallback.",
    "description": "A picture of a person, falling back to their initials (or custom fallback content) when there is no image or it fails to load (`<Avatar>` of React). The fallback is exposed as a single image (`role=\"img\"`) named after the person, so screen readers announce \"Ada Lovelace\" rather than the letters \"AL\".",
    "properties": [
      {
        "name": "src",
        "attribute": "src",
        "type": "string | undefined",
        "description": "Image URL; the initials of `name` are shown without it or when it fails to load"
      },
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Name of the person: initials, alt text and accessible label"
      },
      {
        "name": "alt",
        "attribute": "alt",
        "type": "string | undefined",
        "description": "Alternative text of the image (\"\" for a decorative avatar); defaults to the label"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"circle\" | \"square\" | \"rounded\"",
        "default": "\"circle\"",
        "description": "Avatar shape"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "AvatarSize",
        "default": "\"medium\"",
        "description": "Size preset, or a number of pixels"
      },
      {
        "name": "stacked",
        "attribute": "stacked",
        "type": "boolean",
        "default": "false",
        "description": "Uses tighter margins for overlapping avatars"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Fallback content used when there is no name (e.g. an icon)"
      },
      {
        "name": "fallback",
        "description": "Custom fallback content shown instead of the initials"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The avatar box (role=img while the fallback is shown); no size state for a size in pixels"
      },
      {
        "name": "image",
        "description": "The <img>"
      },
      {
        "name": "fallback",
        "description": "The initials / fallback content wrapper (no image)"
      }
    ],
    "cssProperties": [
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
  },
  "wc:minerva-avatar-group": {
    "kind": "element",
    "source": "web-components/src/components/avatar/avatar.ts",
    "className": "MinervaAvatarGroup",
    "summary": "Overlapping group of avatars with a \"+N\" indicator.",
    "description": "Overlapping avatars with an optional \"+N\" indicator (`<AvatarGroup>` of React). `max` limits the visible avatars (the hidden ones are added to the indicator); `count` adds avatars that are not rendered at all. Each child element is wrapped in its own item box inside the shadow root (manual slot assignment), exactly like the React component, so the overlap / hover styles of React apply unchanged.",
    "properties": [
      {
        "name": "count",
        "attribute": "count",
        "type": "number | undefined",
        "description": "Number of additional avatars, shown in the \"+N\" indicator"
      },
      {
        "name": "max",
        "attribute": "max",
        "type": "number | undefined",
        "description": "Maximum number of avatars displayed; the others are counted in \"+N\""
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "`<minerva-avatar>` elements"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The group (role=group)"
      },
      {
        "name": "item",
        "description": "The wrapper of each visible avatar"
      },
      {
        "name": "count",
        "description": "The \"+N\" indicator of the hidden avatars"
      }
    ],
    "cssProperties": [
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

## Example: 基础用法

显示图片（src），没有图片时显示 name 的首字母。没有 name 时，默认插槽提供后备内容；请用 aria-label 命名。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
  <minerva-avatar
    src="https://randomuser.me/api/portraits/women/44.jpg"
    name="Ada Lovelace"
  ></minerva-avatar>
  <minerva-avatar name="Grace Hopper"></minerva-avatar>
  <minerva-avatar name="李小龙"></minerva-avatar>
  <minerva-avatar aria-label="Unknown user">
    <span aria-hidden="true">?</span>
  </minerva-avatar>
</div>

```

## Example: 后备内容

图片加载失败时显示首字母；若填充了 fallback 插槽则显示该插槽内容。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/wc/fallback.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
  <minerva-avatar
    src="data:image/png;base64,broken"
    name="Grace Hopper"
  ></minerva-avatar>
  <minerva-avatar src="data:image/png;base64,broken" name="Support team">
    <span slot="fallback" aria-hidden="true">🎧</span>
  </minerva-avatar>
  <minerva-avatar shape="rounded" aria-label="Robot">
    <span aria-hidden="true">🤖</span>
  </minerva-avatar>
</div>

```

## Example: 头像组

minerva-avatar-group 让 stacked 头像相互重叠；max 限制可见数量，count 将未渲染的头像计入 +N 指示器。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/wc/group.html

```html
<div style="display: grid; gap: 16px">
  <minerva-avatar-group aria-label="Project members" max="3">
    <minerva-avatar
      stacked
      name="Ada Lovelace"
      src="https://randomuser.me/api/portraits/women/44.jpg"
    ></minerva-avatar>
    <minerva-avatar
      stacked
      name="Alan Turing"
      src="https://randomuser.me/api/portraits/men/32.jpg"
    ></minerva-avatar>
    <minerva-avatar stacked name="Grace Hopper"></minerva-avatar>
    <minerva-avatar stacked name="Linus Torvalds"></minerva-avatar>
    <minerva-avatar stacked name="Margaret Hamilton"></minerva-avatar>
  </minerva-avatar-group>
  <minerva-avatar-group aria-label="Reviewers" count="12">
    <minerva-avatar stacked size="small" name="Ken Thompson"></minerva-avatar>
    <minerva-avatar stacked size="small" name="Dennis Ritchie"></minerva-avatar>
  </minerva-avatar-group>
</div>

```

## Example: 形状与尺寸

三种形状、六种预设尺寸，或以像素为单位的数值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/avatar/wc/shapes-sizes.html

```html
<div style="display: grid; gap: 12px">
  <div style="display: flex; gap: 12px; align-items: center">
    <minerva-avatar shape="circle" name="Alan Turing"></minerva-avatar>
    <minerva-avatar shape="rounded" name="Alan Turing"></minerva-avatar>
    <minerva-avatar shape="square" name="Alan Turing"></minerva-avatar>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
    <minerva-avatar size="xsmall" name="Linus Torvalds"></minerva-avatar>
    <minerva-avatar size="small" name="Linus Torvalds"></minerva-avatar>
    <minerva-avatar size="medium" name="Linus Torvalds"></minerva-avatar>
    <minerva-avatar size="large" name="Linus Torvalds"></minerva-avatar>
    <minerva-avatar size="xlarge" name="Linus Torvalds"></minerva-avatar>
    <minerva-avatar size="xxlarge" name="Linus Torvalds"></minerva-avatar>
    <minerva-avatar size="72" name="Linus Torvalds"></minerva-avatar>
  </div>
</div>

```
