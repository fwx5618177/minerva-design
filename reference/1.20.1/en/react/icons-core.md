# Icons core

minerva-design/icons/core: the icon set without a framework. SVG strings, Canvas2D drawing, GPU canvases, custom icons, the global renderer default and the geometry pipeline behind the GPU backends.

Package: minerva-design@1.20.1

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Framework-free

Importing the core has no side effects and touches no browser API until something is drawn, so it works in server code, workers, any framework and plain scripts. Icons are plain objects: { name, paths, category, tags }.

The React, Vue, Angular, Web Components, React Native (minerva-design/native/icons) and Taro (minerva-design/taro/icons) components are thin layers over this core; toSvg and createIconCanvas cover any other framework.

Drawn with {{backend}}

Starting the renderer…

Next icons

Thirty icons drawn by createIconCanvas

Icon

Tolerance

Triangles of the {{name}} icon

{{triangles}} triangles, {{points}} centerline points

```ts
// Any framework (or none): the core only needs an element
import { createIconCanvas, searchIcon, toSvg } from "minerva-design/icons/core";

// markup: a string of SVG for templates, innerHTML, server rendering
element.innerHTML = toSvg(searchIcon, { size: 20, title: "Search" });

// many icons on the GPU, following the global default renderer
const canvas = createIconCanvas(container, {
  items: [{ icon: searchIcon, x: 8, y: 8, size: 24 }],
});
canvas.setItems(nextItems); // redrawn on the next animation frame
canvas.destroy(); // releases the GPU context
```

## API

```json
{
  "IconDefinition": {
    "source": "icons/src/engine/types.ts",
    "description": "An icon: SVG path data on a 24×24 grid, always stroked (never filled) with round caps and joins. The built-in icons and `defineIcon` both produce it.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Unique kebab-case name, e.g. `arrow-up`"
      },
      {
        "name": "paths",
        "type": "readonly string[]",
        "required": true,
        "description": "SVG path `d` strings (M L H V C S Q T A Z, absolute or relative) on the 24×24 grid"
      },
      {
        "name": "colors",
        "type": "readonly (string | undefined)[]",
        "required": false,
        "description": "Stroke color of each path, parallel to `paths`; `undefined` keeps the drawing color (`color` option, `currentColor` by default). Colors apply to strokes only."
      },
      {
        "name": "category",
        "type": "string",
        "required": false,
        "description": "Group of the icon, e.g. `arrows` (built-in icons always have one)"
      },
      {
        "name": "tags",
        "type": "readonly string[]",
        "required": false,
        "description": "Search words besides the name"
      }
    ]
  },
  "IconSvgOptions": {
    "source": "icons/src/engine/types.ts",
    "description": "Options of `toSvg`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "size",
        "type": "number | string",
        "required": false,
        "default": "24",
        "description": "Width and height (a number is in pixels)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "\"currentColor\"",
        "description": "Stroke color"
      },
      {
        "name": "strokeWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Stroke width on the 24×24 grid"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Accessible name: adds `role=\"img\"` and a `<title>`; without it the SVG is `aria-hidden`"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "`class` attribute"
      },
      {
        "name": "attributes",
        "type": "Record<string, string | number>",
        "required": false,
        "description": "Extra attributes, escaped (e.g. `{ \"data-icon\": \"x\" }`)"
      }
    ]
  },
  "DrawIconOptions": {
    "source": "icons/src/engine/types.ts",
    "description": "Options of `drawIcon` (Canvas2D)",
    "kind": "interface",
    "extends": [
      "IconStyle"
    ],
    "props": [
      {
        "name": "x",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Left edge in the context's current units"
      },
      {
        "name": "y",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Top edge in the context's current units"
      }
    ]
  },
  "IconCanvasOptions": {
    "source": "icons/src/engine/types.ts",
    "description": "Options of `createIconCanvas`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "items",
        "type": "readonly IconCanvasItem[]",
        "required": false,
        "description": "Icons to draw, in painting order (later ones on top)"
      },
      {
        "name": "renderer",
        "type": "IconRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend preference"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "description": "Fixed width in CSS pixels; by default the container's width"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "description": "Fixed height in CSS pixels; by default the container's height"
      },
      {
        "name": "pixelRatio",
        "type": "number",
        "required": false,
        "default": "window.devicePixelRatio",
        "description": "Device pixel ratio"
      },
      {
        "name": "onRendererChange",
        "type": "(kind: IconRendererKind) => void",
        "required": false,
        "description": "Called with the backend once it started, and again after a fallback"
      }
    ]
  },
  "IconCanvasController": {
    "source": "icons/src/engine/types.ts",
    "description": "A canvas drawing many icons in one GPU draw (or Canvas2D)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "renderer",
        "type": "IconRendererKind | null",
        "required": true,
        "description": "The backend drawing (null until it started)"
      },
      {
        "name": "canvas",
        "type": "HTMLCanvasElement",
        "required": true,
        "description": "The `<canvas>` element inside the container"
      },
      {
        "name": "setItems",
        "type": "(items: readonly IconCanvasItem[]) => void",
        "required": true,
        "description": "Replaces the icons; drawn on the next animation frame"
      },
      {
        "name": "setOptions",
        "type": "(options: Omit<IconCanvasOptions, \"items\">) => void",
        "required": true,
        "description": "Updates options; a new `renderer` restarts the backend"
      },
      {
        "name": "render",
        "type": "() => void",
        "required": true,
        "description": "Draws now (instead of the next animation frame)"
      },
      {
        "name": "ready",
        "type": "() => Promise<IconRendererKind>",
        "required": true,
        "description": "Resolves once the backend started and the current items are drawn"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Removes the canvas and releases the GPU resources"
      }
    ]
  },
  "IconSurfaceOptions": {
    "source": "icons/src/engine/types.ts",
    "description": "Options of `createIconSurface`",
    "kind": "interface",
    "extends": [
      "Omit<IconStyle, \"rotation\">"
    ],
    "props": [
      {
        "name": "icon",
        "type": "IconDefinition",
        "required": true,
        "description": "The icon to draw"
      },
      {
        "name": "renderer",
        "type": "IconRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend preference"
      },
      {
        "name": "pixelRatio",
        "type": "number",
        "required": false,
        "default": "window.devicePixelRatio",
        "description": "Device pixel ratio"
      },
      {
        "name": "onRendererChange",
        "type": "(kind: IconRendererKind) => void",
        "required": false,
        "description": "Called with the backend once it drew, and again after a fallback"
      }
    ]
  },
  "IconSurface": {
    "source": "icons/src/engine/types.ts",
    "description": "A single icon on its own `<canvas>`, drawn by a backend shared by the page",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "renderer",
        "type": "IconRendererKind | null",
        "required": true,
        "description": "The backend that drew it (null until the first frame)"
      },
      {
        "name": "update",
        "type": "(options: IconSurfaceOptions) => void",
        "required": true,
        "description": "Replaces the options; redrawn on the next animation frame"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Stops drawing (the canvas is left in place)"
      }
    ]
  },
  "IconMeshOptions": {
    "source": "icons/src/engine/tessellate.ts",
    "description": "Options of `tessellateIcon`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "strokeWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Stroke width on the 24×24 grid"
      },
      {
        "name": "tolerance",
        "type": "number",
        "required": false,
        "default": "0.05",
        "description": "Largest distance between the mesh and the exact outline, in grid units"
      }
    ]
  },
  "IconPolyline": {
    "source": "icons/src/engine/path.ts",
    "description": "A flattened subpath: `points` is `[x0, y0, x1, y1, …]`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "points",
        "type": "number[]",
        "required": true
      },
      {
        "name": "closed",
        "type": "boolean",
        "required": true,
        "description": "Ends with Z (the last point joins the first)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Canvas2D

drawIcon strokes an icon on any 2D context (DOM canvas, OffscreenCanvas, mini-program canvases) with native strokes, in the context's transform.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/icons-core/demos/canvas2d.tsx

```tsx
import { useEffect, useRef } from "react";
import {
  drawIcon,
  heartIcon,
  starIcon,
  sunIcon,
  zapIcon,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

const WIDTH = 320;
const HEIGHT = 96;

// a plain 2D context (a game, a map, a mini-program canvas): native strokes,
// identical to the SVG
export default function Canvas2dDemo() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);
    const icons = [sunIcon, starIcon, heartIcon, zapIcon];
    const colors = ["#f59e0b", "#eab308", "#ef4444", "#6366f1"];
    icons.forEach((icon, i) => {
      drawIcon(ctx, icon, {
        x: 16 + i * 76,
        y: 16,
        size: 64,
        color: colors[i],
        rotation: i * 12,
        strokeWidth: 1.5,
      });
    });
  }, []);
  return (
    <canvas
      ref={ref}
      className={styles.canvasFrame}
      style={{ width: WIDTH, height: HEIGHT }}
      role="img"
      aria-label="Sun, star, heart and lightning icons drawn with drawIcon"
    />
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

## Example: Icon canvas controller

createIconCanvas, the controller under IconCanvas: appends a canvas to any element, picks the backend, follows the renderer bar, redraws on setItems and frees the GPU context on destroy.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/icons-core/demos/controller.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createIconCanvas,
  icons,
  type IconCanvasController,
  type IconRendererKind,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

// the framework-free controller under IconCanvas: any element, any framework
export default function ControllerDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons-core.data" });
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<IconCanvasController | null>(null);
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!host.current) return;
    const instance = createIconCanvas(host.current, {
      height: 120,
      onRendererChange: setDrawn,
    });
    controller.current = instance;
    return () => instance.destroy();
  }, []);

  // new items: drawn on the next animation frame
  useEffect(() => {
    controller.current?.setItems(
      icons.slice(offset, offset + 30).map((icon, i) => ({
        icon,
        x: 12 + (i % 15) * 36,
        y: 16 + Math.floor(i / 15) * 48,
        size: 28,
        color: "currentColor",
      })),
    );
  }, [offset]);

  return (
    <div className={styles.stage}>
      <div
        ref={host}
        style={{ height: 120 }}
        role="img"
        aria-label={t("controllerAria")}
      />
      <div className={styles.footer}>
        <p role="status">
          {drawn ? t("status", { backend: drawn }) : t("starting")}
        </p>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setOffset((value) => (value + 30) % icons.length)}
        >
          {t("next")}
        </Button>
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

## Example: GPU geometry

What the GPU backends draw: tessellateIcon turns the stroke into triangles (quads, round joins and caps), from curves flattened by flattenIconPath within the tolerance. Dots: flattened centerline.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/icons-core/demos/geometry.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Select, SelectItem } from "minerva-design";
import {
  cloudIcon,
  flattenIconPath,
  heartIcon,
  settingsIcon,
  tessellateIcon,
  type IconDefinition,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

const ICONS: Record<string, IconDefinition> = {
  settings: settingsIcon,
  heart: heartIcon,
  cloud: cloudIcon,
};
const TOLERANCES = ["0.5", "0.1", "0.02"];
const SCALE = 12;
const SIDE = 24 * SCALE;

// what the GPU backends draw: the stroke as triangles (quads per segment,
// round joins and caps as fans), from curves flattened within a tolerance
export default function GeometryDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons-core.data" });
  const ref = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("settings");
  const [tolerance, setTolerance] = useState("0.1");
  const icon = ICONS[name]!;

  const mesh = useMemo(
    () => tessellateIcon(icon, { tolerance: Number(tolerance) }),
    [icon, tolerance],
  );
  const lines = useMemo(
    () => icon.paths.flatMap((d) => flattenIconPath(d, Number(tolerance))),
    [icon, tolerance],
  );

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIDE * dpr;
    canvas.height = SIDE * dpr;
    ctx.setTransform(dpr * SCALE, 0, 0, dpr * SCALE, 0, 0);
    ctx.clearRect(0, 0, 24, 24);
    const style = getComputedStyle(canvas);
    ctx.lineWidth = 1 / SCALE;
    ctx.fillStyle = "rgba(99, 102, 241, 0.18)";
    ctx.strokeStyle = "rgba(99, 102, 241, 0.75)";
    for (let i = 0; i < mesh.length; i += 6) {
      ctx.beginPath();
      ctx.moveTo(mesh[i]!, mesh[i + 1]!);
      ctx.lineTo(mesh[i + 2]!, mesh[i + 3]!);
      ctx.lineTo(mesh[i + 4]!, mesh[i + 5]!);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = style.color;
    for (const line of lines) {
      for (let i = 0; i < line.points.length; i += 2) {
        ctx.beginPath();
        ctx.arc(line.points[i]!, line.points[i + 1]!, 1.6 / SCALE, 0, 7);
        ctx.fill();
      }
    }
  }, [mesh, lines]);

  const points = lines.reduce((sum, line) => sum + line.points.length / 2, 0);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <Select
          size="small"
          style={{ width: 140 }}
          aria-label={t("icon")}
          value={name}
          onChange={setName}
        >
          {Object.keys(ICONS).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </Select>
        <RadioGroup
          aria-label={t("tolerance")}
          direction="horizontal"
          size="small"
          value={tolerance}
          onChange={(value) => setTolerance(String(value))}
        >
          {TOLERANCES.map((value) => (
            <Radio key={value} value={value} label={value} />
          ))}
        </RadioGroup>
      </div>
      <div className={styles.body}>
        <canvas
          ref={ref}
          className={styles.canvasFrame}
          style={{ width: SIDE, height: SIDE, maxWidth: "100%" }}
          role="img"
          aria-label={t("geometryAria", { name })}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.kind}>
          {t("geometryStats", { triangles: mesh.length / 6, points })}
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

## Example: SVG strings

toSvg returns a standalone <svg> (escaped, labelled when given a title) for templates, innerHTML or server rendering; toSvgDataUri makes an image URI for <img>, CSS backgrounds and favicons, and toSvgBase64DataUri a base64 one for image hosts that reject percent-encoded SVG (mini programs).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/icons-core/demos/svg-string.tsx

```tsx
import { useMemo } from "react";
import {
  checkCircleIcon,
  toSvg,
  toSvgDataUri,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

export default function SvgStringDemo() {
  const svg = useMemo(
    () => toSvg(checkCircleIcon, { size: 32, title: "Done", strokeWidth: 1.5 }),
    [],
  );
  // an <img>, a CSS background or a favicon: no currentColor there
  const uri = useMemo(
    () => toSvgDataUri(checkCircleIcon, { size: 48, color: "#16a34a" }),
    [],
  );
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div className={styles.row}>
        <img src={uri} width={48} height={48} alt="Done" />
        <code>toSvgDataUri(checkCircleIcon, …)</code>
      </div>
      <pre className={styles.code}>{svg}</pre>
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
