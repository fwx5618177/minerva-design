# Icon 图标组件

图标集中的单个图标：默认为内联 SVG，也可以是由 WebGPU、WebGL2、WebGL 或 Canvas2D 绘制的画布。包括具名组件（SearchIcon…）、通用的 Icon、自定义图标以及按名称选择的图标。

Package: minerva-design@1.20.2

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### SVG 还是画布

默认情况下，图标是一个内联 ：它可在服务端渲染，通过 currentColor 跟随文字颜色，设置 size="1em" 时跟随字号；除非设置了 title 或 aria-label，否则对辅助技术隐藏。

将 renderer 设为 "auto"、"webgpu"、"webgl2"、"webgl" 或 "canvas2d" 时，同一个图标会绘制在画布上。浏览器将同时存活的 WebGL 上下文限制在 16 个左右，因此同一页面的画布图标共享一个后端：发生变化的图标被打包进一张图集，一次绘制完成后再复制到各自的画布。"auto" 跟随全局默认值（setDefaultIconRenderer），在本页即渲染器栏。

只打包你导入的内容：SearchIcon 只带上自己的路径数据，画布渲染器随第一个画布图标加载，而 DynamicIcon（名称在运行时决定）是唯一会打包整套图标的组件。

### React Native 与小程序

minerva-design/native/icons 为 React Native 提供同一套组件（Icon、createIcon、DynamicIcon、SearchIcon…），使用 react-native-svg 绘制相同的 24×24 路径数据。react-native-svg 是可选的 peer 依赖，只有这个入口需要它（minerva-design/native 从不导入它）：在 Expo 中用 npx expo install react-native-svg 安装，其他项目用 npm install react-native-svg。图标默认使用主题的文字颜色描边（可用 color 覆盖），size 的单位是 dp，设置 title 后图标成为可访问的图片。

minerva-design/taro/icons 为 Taro 提供这些组件。小程序无法渲染内联 SVG，微信的  也不接受百分号编码的 SVG，因此每个图标都是一个 Image，其 src 为 base64 编码的 SVG data URI（toSvgBase64DataUri，不依赖 btoa）。图片没有 currentColor：颜色直接写入 SVG，默认是当前浅色或深色模式下主题的文字颜色，颜色或模式变化时会重新生成图片。size 的单位是 px，也可以是任意 CSS 长度，例如 "48rpx"。

小程序的 tabBar 只接受 PNG 或 JPG 文件：请在构建时用你选择的 SVG 光栅化工具，从 toSvg 的输出生成这些文件（每个图标、颜色和状态各一个）。Minerva 不内置光栅化工具。

启动中…

```tsx
// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set
```

```tsx
import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode
```

```ts
// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(`src/assets/tab-home-${state}.png`, await rasterize(svg));
}
```

## Icon

Support: n/a

React component Icon of minerva-design/icons (separate entry, outside this contract scan).

## API

```json
{
  "IconProps": {
    "source": "icons/src/react/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<SVGProps<SVGSVGElement>, \"ref\" | \"color\" | \"stroke\" | \"strokeWidth\" | \"children\" | \"name\">"
    ],
    "props": [
      {
        "name": "icon",
        "type": "IconDefinition",
        "required": true,
        "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result"
      },
      {
        "name": "size",
        "type": "number | string",
        "required": false,
        "default": "24",
        "description": "Width and height (a number is in pixels; canvas renderers also follow CSS sizes such as `\"1em\"`)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "\"currentColor\"",
        "description": "Stroke color, any CSS color"
      },
      {
        "name": "strokeWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size)"
      },
      {
        "name": "absoluteStrokeWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps `strokeWidth` in pixels whatever the size"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Accessible name: the icon becomes `role=\"img\"`; without it (or an `aria-label`) the icon is hidden from assistive technologies"
      },
      {
        "name": "renderer",
        "type": "IconRenderer",
        "required": false,
        "default": "\"svg\"",
        "description": "Inline SVG (default), or a `<canvas>` drawn by a backend shared by every canvas icon of the page: \"auto\" (the global default, see `setDefaultIconRenderer`), \"webgpu\", \"webgl2\", \"webgl\" or \"canvas2d\""
      },
      {
        "name": "onRendererChange",
        "type": "(kind: IconRendererKind) => void",
        "required": false,
        "description": "Canvas renderers: called with the backend that drew the icon"
      },
      {
        "name": "ref",
        "type": "Ref<SVGSVGElement | HTMLCanvasElement>",
        "required": false,
        "description": "The `<svg>` element, or the `<canvas>` with a canvas renderer"
      }
    ]
  },
  "DynamicIconProps": {
    "source": "icons/src/react/types.ts",
    "kind": "interface",
    "extends": [
      "NamedIconProps"
    ],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of a built-in icon (e.g. `\"arrow-up\"`); unknown names render nothing"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 无障碍

装饰性图标为 aria-hidden；单独出现的图标应设置 title（role="img"）；位于控件内部时，应改为给控件添加标签。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/demos/accessibility.tsx

```tsx
import { IconButton } from "minerva-design";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  SettingsIcon,
} from "minerva-design/icons";

export default function AccessibilityDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {/* decorative: the text says it all (aria-hidden) */}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <CheckCircleIcon size={18} color="var(--success-color)" />
        Saved
      </span>
      {/* meaningful on its own: a title makes it role="img" */}
      <AlertTriangleIcon color="var(--warning-color)" title="Warning" />
      {/* inside a control: the control carries the name */}
      <IconButton icon={<SettingsIcon size={18} />} aria-label="Settings" />
    </div>
  );
}

```

## Example: 基础用法

每个图标都是以其名称命名的组件；图标可以与文字同行显示，也可以放在按钮中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/demos/basic.tsx

```tsx
import { Button } from "minerva-design";
import {
  DownloadIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "minerva-design/icons";

export default function BasicDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <HomeIcon />
      <SearchIcon />
      <SettingsIcon />
      <Button startIcon={<DownloadIcon size={16} />}>Download</Button>
      <Button
        color="danger"
        variant="outline"
        startIcon={<TrashIcon size={16} />}
      >
        Delete
      </Button>
    </div>
  );
}

```

## Example: 渲染器

同一个图标分别以 SVG 和各画布后端绘制；每个下方显示实际绘制它的后端。"auto" 跟随渲染器栏；强制指定的后端若在此浏览器中不可用，则回退到下一个。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/icon/demos/canvas.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Icon,
  settingsIcon,
  type IconRenderer,
  type IconRendererKind,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const RENDERERS: IconRenderer[] = [
  "svg",
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

function Cell({ renderer }: { renderer: IconRenderer }) {
  const { t } = useTranslation("common", { keyPrefix: "docs.icon.data" });
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  return (
    <span className={styles.cell}>
      <Icon
        icon={settingsIcon}
        size={40}
        color="var(--primary-color)"
        renderer={renderer}
        onRendererChange={setDrawn}
      />
      <code>{renderer}</code>
      <span className={styles.kind}>
        {renderer === "svg" ? "SVG" : (drawn ?? t("starting"))}
      </span>
    </span>
  );
}

// "auto" follows the renderer bar at the top of the page; a forced backend
// that cannot start here falls back to the next one
export default function CanvasDemo() {
  return (
    <div className={styles.row}>
      {RENDERERS.map((renderer) => (
        <Cell key={renderer} renderer={renderer} />
      ))}
    </div>
  );
}

```

### apps/docs/src/docs/pages/icons/icons.module.scss

```scss
// Shared by the demos of the icon pages (icons, icon, icon-canvas, icons-core)

.stage {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 14px;
  background: var(--surface-subtle-color);
}

.search {
  flex: 1 1 220px;
  min-width: 180px;
}

.body {
  padding: 12px 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: 6px;
  padding: 2px;
}

.categoryGroup + .categoryGroup {
  margin-top: 20px;
}

.categoryTitle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.categoryCount {
  padding: 0 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-muted-color);
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary-color);
}

.tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 92px;
  padding: 12px 6px 8px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  cursor: pointer;

  &:hover {
    border-color: var(--border-color);
    background: var(--hover-color);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: 1px;
  }
}

.tileName {
  max-width: 100%;
  overflow: hidden;
  font-size: 11px;
  line-height: 1.3;
  color: var(--text-secondary-color);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  background: var(--surface-subtle-color);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
}

.cell {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 72px;
  font-size: 12px;
  color: var(--text-secondary-color);
}

.code {
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--surface-muted-color);
  font-family: var(--font-family-mono, monospace);
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

.canvasFrame {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--canvas-color);
}

.kind {
  font-variant-numeric: tabular-nums;
}

```

## Example: 自定义图标

defineIcon 对你自己的路径数据做一次校验；createIcon 将其转换为与内置图标一样的组件，Icon 可在所有渲染器上绘制它。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/demos/custom.tsx

```tsx
import { createIcon, defineIcon, Icon } from "minerva-design/icons";

// a custom icon on the same 24×24 grid (strokes only, round caps and joins)
const rocketIcon = defineIcon({
  name: "rocket",
  category: "custom",
  tags: ["launch", "ship"],
  paths: [
    "M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z",
    "M12 9.5h.01",
    "M7 13l-3 3v3h3",
    "M17 13l3 3v3h-3",
    "M10 19.5l2 1.5 2-1.5",
  ],
});

// a component like the built-in ones
const RocketIcon = createIcon(rocketIcon);

export default function CustomDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <RocketIcon />
      <RocketIcon size={40} color="var(--primary-color)" />
      {/* or through the generic Icon, on any renderer */}
      <Icon icon={rocketIcon} size={40} renderer="auto" />
    </div>
  );
}

```

## Example: 按名称使用图标

DynamicIcon 根据仅在运行时才知道的名称选择内置图标；未知名称不渲染任何内容。它会打包整套图标。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/demos/dynamic.tsx

```tsx
import { DynamicIcon } from "minerva-design/icons";

// icon names coming from data (an API, a CMS, a settings file…)
const services = [
  { name: "Storage", icon: "database", status: "check-circle" },
  { name: "Mail", icon: "mail", status: "alert-triangle" },
  { name: "Payments", icon: "credit-card", status: "x-circle" },
];

const COLORS: Record<string, string> = {
  "check-circle": "var(--success-color)",
  "alert-triangle": "var(--warning-color)",
  "x-circle": "var(--danger-color)",
};

export default function DynamicDemo() {
  return (
    <ul style={{ display: "grid", gap: 8, margin: 0, padding: 0 }}>
      {services.map((service) => (
        <li
          key={service.name}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <DynamicIcon name={service.icon} size={18} />
          <span style={{ minWidth: 80 }}>{service.name}</span>
          <DynamicIcon
            name={service.status}
            size={18}
            color={COLORS[service.status]}
            title={service.status}
          />
        </li>
      ))}
    </ul>
  );
}

```

## Example: 尺寸与颜色

size 接受像素值或任意 CSS 长度（1em 跟随字号）；color 接受任意 CSS 颜色，包括主题变量，默认为文字颜色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/demos/size-color.tsx

```tsx
import { BellIcon, HeartIcon, StarIcon } from "minerva-design/icons";

const SIZES = [16, 20, 24, 32, 48];

export default function SizeColorDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {SIZES.map((size) => (
          <StarIcon key={size} size={size} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <HeartIcon color="var(--danger-color)" />
        <StarIcon color="var(--warning-color)" />
        <BellIcon color="var(--primary-color)" />
        {/* currentColor: follows the text color, here a link color */}
        <span style={{ color: "var(--link-color)", fontSize: 20 }}>
          <BellIcon size="1em" /> 1em follows the font size
        </span>
      </div>
    </div>
  );
}

```

## Example: 描边宽度

strokeWidth 基于 24×24 网格，因此会随图标缩放。absoluteStrokeWidth 则无论尺寸如何都保持固定的像素值（见最下面一行的后半部分）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/demos/stroke.tsx

```tsx
import { CloudIcon } from "minerva-design/icons";

const STROKES = [1, 1.5, 2, 2.5, 3];
const SIZES = [16, 24, 48];

export default function StrokeDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {STROKES.map((strokeWidth) => (
          <CloudIcon key={strokeWidth} size={32} strokeWidth={strokeWidth} />
        ))}
      </div>
      {/* scaled stroke (default) vs. a constant 1.5px stroke */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {SIZES.map((size) => (
          <CloudIcon key={size} size={size} strokeWidth={1.5} />
        ))}
        {SIZES.map((size) => (
          <CloudIcon
            key={`absolute-${size}`}
            size={size}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        ))}
      </div>
    </div>
  );
}

```
