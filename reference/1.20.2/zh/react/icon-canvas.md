# IconCanvas 图标画布

在一块画布上绘制大量图标，由 WebGPU、WebGL2 或 WebGL 通过少量实例化绘制调用完成，或由 Canvas2D 绘制：适用于密集图形、地图、粒子以及包含成千上万个图标的动画。

Package: minerva-design@1.20.2

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### 绘制原理

IconCanvas 以 CSS 像素为单位，按位置、尺寸、旋转、颜色和不透明度摆放图标，并用可用的最佳后端（WebGPU -> WebGL2 -> WebGL -> Canvas2D）将它们全部绘制在一块画布上。

几何：每个图标以四分之一设备像素的精度展平，其描边被转换为三角形（每段一个四边形，连接处和线帽使用圆形扇面），每种图标、描边宽度和细节级别只处理一次。

批处理：所有网格存放在同一个顶点缓冲区中，每个图标都是一个实例（位置、尺寸、旋转、颜色）；连续的相同图标合并为一次实例化绘制调用。

质量：4× MSAA 平滑边缘，逐图标的深度测试让图标的每个像素只绘制一次，因此半透明图标的混合效果与 SVG 描边完全一致。

健壮性：auto 会跳过软件 GPU，GPU 上下文丢失时会重启后端（丢失两次的后端会被跳过），画布根元素通过 data-renderer 报告当前后端。

界面中的图标请使用 Icon：SVG 更轻量、可访问，并支持服务端渲染。当图标本身就是画面时，再使用 IconCanvas。

图标数量

暂停

播放

已暂停

每秒 {{fps}} 帧

由 {{backend}} 绘制

正在启动渲染器…

{{n}} 个动画图标

由 {{backend}} 绘制的 40 个图标

由 {{backend}} 绘制

已回退到 {{backend}}

## IconCanvas

Support: n/a

React component IconCanvas of minerva-design/icons (separate entry, outside this contract scan).

## API

```json
{
  "IconCanvasProps": {
    "source": "icons/src/react/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"title\">"
    ],
    "props": [
      {
        "name": "items",
        "type": "readonly IconCanvasItem[]",
        "required": true,
        "description": "Icons to draw, in painting order (later ones on top), positions in CSS pixels"
      },
      {
        "name": "renderer",
        "type": "IconRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend preference; \"auto\" follows the global default"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "\"100%\"",
        "description": "Width (a number is in pixels)"
      },
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "default": "240",
        "description": "Height (a number is in pixels)"
      },
      {
        "name": "pixelRatio",
        "type": "number",
        "required": false,
        "default": "window.devicePixelRatio",
        "description": "Device pixel ratio"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Accessible name of the whole picture (`role=\"img\"`); without it the canvas is hidden from assistive technologies"
      },
      {
        "name": "onRendererChange",
        "type": "(kind: IconRendererKind) => void",
        "required": false,
        "description": "Called with the backend once it started, and again after a fallback"
      },
      {
        "name": "ref",
        "type": "Ref<IconCanvasHandle>",
        "required": false,
        "description": "Imperative handle"
      }
    ]
  },
  "IconCanvasItem": {
    "source": "icons/src/engine/types.ts",
    "description": "One icon drawn by an icon canvas",
    "kind": "interface",
    "extends": [
      "IconStyle"
    ],
    "props": [
      {
        "name": "icon",
        "type": "IconDefinition",
        "required": true,
        "description": "The icon to draw"
      },
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Left edge in CSS pixels, from the canvas' top-left corner"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Top edge in CSS pixels, from the canvas' top-left corner"
      }
    ]
  },
  "IconStyle": {
    "source": "icons/src/engine/types.ts",
    "description": "Shared drawing options (sizes in CSS pixels)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "size",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Width and height in CSS pixels"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "\"currentColor\"",
        "description": "Any CSS color; `currentColor` reads the color of the host element"
      },
      {
        "name": "strokeWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size)"
      },
      {
        "name": "rotation",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Clockwise rotation in degrees, around the center"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Opacity between 0 and 1"
      }
    ]
  },
  "IconCanvasHandle": {
    "source": "icons/src/react/types.ts",
    "description": "Imperative handle of `IconCanvas`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "getRenderer",
        "type": "() => IconRendererKind | null",
        "required": true,
        "description": "The backend drawing (null until it started)"
      },
      {
        "name": "getCanvas",
        "type": "() => HTMLCanvasElement | null",
        "required": true,
        "description": "The `<canvas>` element (null before mount)"
      },
      {
        "name": "ready",
        "type": "() => Promise<IconRendererKind>",
        "required": true,
        "description": "Resolves once the backend started and the current items are drawn"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

以 CSS 像素摆放的图标，各自拥有尺寸、颜色（包括主题变量）、旋转、描边宽度和不透明度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/demos/basic.tsx

```tsx
import {
  IconCanvas,
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
  type IconCanvasItem,
} from "minerva-design/icons";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

// one canvas, one GPU draw per run of identical icons; positions in CSS px
const items: IconCanvasItem[] = [
  ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 64,
    size: 32,
    color: "var(--primary-color)",
    rotation: i * 15,
  })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 112,
    strokeWidth: 1.5,
    opacity: 0.35 + i * 0.13,
  })),
];

export default function BasicDemo() {
  return (
    <IconCanvas items={items} height={160} title="Six icons, three ways" />
  );
}

```

## Example: 所有后端

在每个后端上强制绘制相同的图标；每块画布下方显示绘制它的后端（此浏览器不支持的后端会回退到下一个）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/demos/renderers.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCanvas,
  icons,
  type IconCanvasItem,
  type IconRendererKind,
  type IconRendererPreference,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const BACKENDS: IconRendererPreference[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

// the same 40 icons on every backend: the geometry is shared, only the
// rasterizer differs (MSAA triangles on the GPU, native strokes on Canvas2D)
const items: IconCanvasItem[] = icons.slice(0, 40).map((icon, i) => ({
  icon,
  x: 8 + (i % 8) * 30,
  y: 8 + Math.floor(i / 8) * 30,
  size: 24,
}));

function Panel({ renderer }: { renderer: IconRendererPreference }) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.icon-canvas.data",
  });
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  return (
    <figure style={{ margin: 0 }}>
      <IconCanvas
        className={styles.canvasFrame}
        items={items}
        renderer={renderer}
        width={256}
        height={160}
        onRendererChange={setDrawn}
        title={t("panelAria", { backend: renderer })}
      />
      <figcaption className={styles.cell} style={{ marginTop: 6 }}>
        <code>renderer=&quot;{renderer}&quot;</code>
        <span className={styles.kind}>
          {drawn === null
            ? t("starting")
            : drawn === renderer
              ? t("drawnBy", { backend: drawn })
              : t("fellBack", { backend: drawn })}
        </span>
      </figcaption>
    </figure>
  );
}

export default function RenderersDemo() {
  return (
    <div className={styles.row}>
      {BACKENDS.map((renderer) => (
        <Panel key={renderer} renderer={renderer} />
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

## Example: 成千上万个图标

最多 20,000 个动画图标，每帧重建，用几十次实例化绘制调用完成（每种图标一次）。后端跟随渲染器栏；可以比较不同后端之间的帧率。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/demos/thousands.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup } from "minerva-design";
import {
  IconCanvas,
  icons,
  type IconCanvasItem,
  type IconRendererKind,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const COUNTS = [1000, 5000, 20000];
const HEIGHT = 360;
const PICKED = icons.filter((_, i) => i % 8 === 0);
// a few dozen distinct colors: resolved once each, not once per icon
const HUES = Array.from({ length: 36 }, (_, i) => `hsl(${i * 10} 70% 55%)`);

/** Icons grouped by kind so each kind is one instanced draw */
const layout = (count: number, width: number, time: number) => {
  const cell = Math.max(6, Math.sqrt((width * HEIGHT) / count));
  const columns = Math.max(1, Math.floor(width / cell));
  const size = cell * 0.8;
  const items: IconCanvasItem[] = [];
  const perKind = Math.ceil(count / PICKED.length);
  for (let i = 0; i < count; i++) {
    const kind = Math.floor(i / perKind);
    const slot = (i % perKind) * PICKED.length + kind;
    const column = slot % columns;
    const row = Math.floor(slot / columns);
    const wave = Math.sin(time * 2 + column * 0.25 + row * 0.35);
    items.push({
      icon: PICKED[kind]!,
      x: column * cell + (cell - size) / 2,
      y: row * cell + (cell - size) / 2,
      size: size * (0.85 + 0.15 * wave),
      rotation: wave * 25,
      color: HUES[(column + row) % HUES.length],
      opacity: 0.55 + 0.45 * wave * wave,
    });
  }
  return items;
};

export default function ThousandsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.icon-canvas.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(5000);
  const [running, setRunning] = useState(true);
  const [width, setWidth] = useState(640);
  const [time, setTime] = useState(0);
  const [fps, setFps] = useState<number | null>(null);
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new ResizeObserver(() =>
      setWidth(element.clientWidth || 640),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let frames = 0;
    let since = performance.now();
    const tick = (now: number) => {
      setTime(now / 1000);
      frames++;
      if (now - since >= 500) {
        setFps(Math.round((frames * 1000) / (now - since)));
        frames = 0;
        since = now;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const items = useMemo(() => layout(count, width, time), [count, width, time]);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("count")}
          direction="horizontal"
          size="small"
          value={String(count)}
          onChange={(value) => setCount(Number(value))}
        >
          {COUNTS.map((value) => (
            <Radio
              key={value}
              value={String(value)}
              label={value.toLocaleString()}
            />
          ))}
        </RadioGroup>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("play")}
        </Button>
      </div>
      <div ref={host}>
        <IconCanvas
          items={items}
          height={HEIGHT}
          onRendererChange={setDrawn}
          title={t("aria", { n: count.toLocaleString() })}
        />
      </div>
      <div className={styles.footer}>
        <p role="status">
          {drawn ? t("status", { backend: drawn }) : t("starting")}
        </p>
        <p className={styles.kind}>
          {running && fps !== null ? t("fps", { fps }) : t("paused")}
        </p>
      </div>
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
