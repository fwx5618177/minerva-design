# Icons

The icon set of Minerva: original icons drawn for the library on a 24×24 grid, rendered as inline SVG by default and also drawn on Canvas2D, WebGL, WebGL2 or WebGPU canvases.

Package: minerva-design@1.23.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Overview

minerva-design/icons ships {{count}} icons in {{categories}} categories, with no third-party icon set: every icon is SVG path data owned by the library, the same data for every renderer and every framework.

One visual language: a 24×24 grid with about 2px of padding, 2px strokes with round caps and joins, no fills, so icons sit well next to text and scale from 12 to 96 pixels. Some icons carry a color per stroke (colors); the others follow the color prop.

SVG by default: crisp at any size, server-rendered, colored by the text color (currentColor), hidden from assistive technologies unless given a title.

The same geometry on the GPU: Icon draws on a canvas with renderer="auto", "webgpu", "webgl2", "webgl" or "canvas2d", and IconCanvas draws thousands of icons in a few instanced draws, with the WebGPU -> WebGL2 -> WebGL -> Canvas2D fallback of the charts.

Pay for what you use: each icon is its own constant (searchIcon) and component (SearchIcon), and the canvas renderers load only with the first canvas icon.

Framework-free core: minerva-design/icons/core has the icon data, SVG strings, Canvas2D drawing and the GPU canvases for any framework; the React components are built on it.

See Icon for the component, IconCanvas for GPU batches, and Icons core for the framework-free API.

Search icons

Search by name or tag…

Category

All categories

Size

Stroke width

Rendering

SVG

Canvas

Copy {{code}}

Copied {{code}}

Could not copy {{code}}: the clipboard is unavailable

Kind

All kinds

Monochrome

Multicolor

Color

Text color

Primary

Success

Warning

Danger

{{n}} icons

No icon matches "{{query}}"

Arrows

Actions

Interface

Media

Files

Communication

Data and charts

Finance

Status

Devices

Weather

Nature

Food

People

Places

Shapes

Text

Education

Health

Shopping

Music

Tools

Sports

```tsx
import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Gallery

Every icon of the set. Search by name or tag, filter by category or by kind, try sizes, stroke widths and colors, and switch from SVG to canvas: in canvas mode every icon is drawn by the backend picked in the renderer bar at the top of the page. Monochrome icons (the interface ones: actions, arrows, status…) follow the text color, like text, so they fit buttons and inputs; multicolor icons keep their own accents and only their neutral strokes follow the color. Click an icon to copy its component.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/icons/demos/gallery.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Empty,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  ToastProvider,
  toast,
} from "minerva-design";
import { Icon, type IconDefinition } from "minerva-design/icons";
import { iconCategories, searchIcons } from "minerva-design/icons/core";
import styles from "../icons.module.scss";

const SIZES = [16, 20, 24, 32];
const STROKES = [1.5, 2, 2.5];
// the drawing color: what the paths without a color of their own follow
const TONES = {
  text: undefined,
  primary: "var(--primary-color)",
  success: "var(--success-color)",
  warning: "var(--warning-color)",
  danger: "var(--danger-color)",
} as const;
type Tone = keyof typeof TONES;

/** Icons whose paths carry colors of their own (`colors`) */
const isMulticolor = (icon: IconDefinition) =>
  Boolean(icon.colors?.some(Boolean));

/** `arrow-up` -> `<ArrowUpIcon />` */
const snippet = (icon: IconDefinition) =>
  `<${icon.name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) =>
    c.toUpperCase(),
  )}Icon />`;

export default function GalleryDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons.data" });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState(24);
  const [stroke, setStroke] = useState(2);
  // "canvas": every tile drawn by the backend of the renderer bar
  const [mode, setMode] = useState<"svg" | "canvas">("svg");
  // monochrome icons follow the color; multicolor ones keep their accents
  const [kind, setKind] = useState("all");
  const [tone, setTone] = useState<Tone>("text");

  // the whole set, grouped by category: the page scrolls, nothing is clipped
  const sections = useMemo(() => {
    const matches = searchIcons(query).filter(
      (icon) =>
        (category === "all" || icon.category === category) &&
        (kind === "all" || (kind === "multicolor") === isMulticolor(icon)),
    );
    return iconCategories
      .map((key) => ({
        key,
        icons: matches.filter((icon) => icon.category === key),
      }))
      .filter((section) => section.icons.length > 0);
  }, [query, category, kind]);

  const total = sections.reduce((sum, { icons }) => sum + icons.length, 0);

  const copy = async (icon: IconDefinition) => {
    const code = snippet(icon);
    try {
      // no clipboard outside secure contexts: report it instead of nothing
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(code);
      // one id: a new copy replaces the toast instead of stacking them
      toast.success(t("copied", { code }), { id: "icon-copy" });
    } catch {
      toast.danger(t("copyFailed", { code }), { id: "icon-copy" });
    }
  };

  return (
    <div className={styles.stage}>
      {/* mount one ToastProvider near the root of an app */}
      <ToastProvider position="top-center" />
      <div className={styles.toolbar}>
        <Input
          type="search"
          className={styles.search}
          size="small"
          clearable
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder={t("searchPlaceholder")}
          aria-label={t("search")}
        />
        <Select
          size="small"
          style={{ width: 170 }}
          aria-label={t("category")}
          value={category}
          onChange={setCategory}
        >
          <SelectItem value="all">{t("all")}</SelectItem>
          {iconCategories.map((key) => (
            <SelectItem key={key} value={key}>
              {t(`categories.${key}`)}
            </SelectItem>
          ))}
        </Select>
        <Select
          size="small"
          style={{ width: 130 }}
          aria-label={t("kind")}
          value={kind}
          onChange={setKind}
        >
          <SelectItem value="all">{t("kinds.all")}</SelectItem>
          <SelectItem value="monochrome">{t("kinds.monochrome")}</SelectItem>
          <SelectItem value="multicolor">{t("kinds.multicolor")}</SelectItem>
        </Select>
        <Select
          size="small"
          style={{ width: 130 }}
          aria-label={t("color")}
          value={tone}
          onChange={(value) => setTone(value as Tone)}
        >
          {Object.keys(TONES).map((key) => (
            <SelectItem key={key} value={key}>
              {t(`tones.${key}`)}
            </SelectItem>
          ))}
        </Select>
        <RadioGroup
          aria-label={t("size")}
          direction="horizontal"
          size="small"
          value={String(size)}
          onChange={(value) => setSize(Number(value))}
        >
          {SIZES.map((value) => (
            <Radio key={value} value={String(value)} label={`${value}px`} />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("stroke")}
          direction="horizontal"
          size="small"
          value={String(stroke)}
          onChange={(value) => setStroke(Number(value))}
        >
          {STROKES.map((value) => (
            <Radio key={value} value={String(value)} label={String(value)} />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("render")}
          direction="horizontal"
          size="small"
          value={mode}
          onChange={(value) => setMode(value as "svg" | "canvas")}
        >
          <Radio value="svg" label={t("svg")} />
          <Radio value="canvas" label={t("canvas")} />
        </RadioGroup>
      </div>
      <div className={styles.body}>
        {sections.length ? (
          sections.map(({ key, icons }) => (
            <section key={key} className={styles.categoryGroup}>
              <h3 className={styles.categoryTitle}>
                {t(`categories.${key}`)}
                <span className={styles.categoryCount}>{icons.length}</span>
              </h3>
              <div className={styles.grid}>
                {icons.map((icon) => (
                  <button
                    key={icon.name}
                    type="button"
                    className={styles.tile}
                    title={t("copy", { code: snippet(icon) })}
                    onClick={() => void copy(icon)}
                  >
                    <Icon
                      icon={icon}
                      size={size}
                      color={TONES[tone]}
                      strokeWidth={stroke}
                      renderer={mode === "svg" ? "svg" : "auto"}
                    />
                    <span className={styles.tileName}>{icon.name}</span>
                  </button>
                ))}
              </div>
            </section>
          ))
        ) : (
          <Empty description={t("empty", { query })} />
        )}
      </div>
      <div className={styles.footer}>
        <p>{t("count", { n: total })}</p>
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
