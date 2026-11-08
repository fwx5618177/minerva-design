# Design presets

Switch the look of a whole app, or of one part of it, with a few props: a preset (minerva, editorial, compact, touch) or the individual design axes density, radius, shadow and font scale. Works with SSR and nested scopes.

Package: minerva-design@1.23.1

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Design axes

Attribute

The design axes are orthogonal to the color mode (theme) and the palette. Each one selects a block of design tokens through a data attribute; components read the tokens (control heights, paddings, radii, shadows, font sizes), so the whole library follows. A preset is a named combination of the four axes plus a default palette; explicit axes and an explicit palette win over the preset.

minerva: Minerva's default look. editorial: restrained and reading-oriented (editorial palette, comfortable density, small radius, subtle shadows, large type). compact: dense, data-heavy screens (compact density, small radius, small type). touch: consumer mobile apps (comfortable density with 44px minimum touch targets, large radius).

Control heights and horizontal paddings (--control-height-*, --control-padding-x-*) and the padding of rows such as menu items, options and table cells (--row-padding-y / --row-padding-x), and the minimum size of touch targets (--touch-target-min: 24px compact, 32px standard, 44px comfortable).

Corner radius scale: --radius-sm, --radius-md, --radius-lg, --radius-xl and --radius-2xl.

Elevation shadows --shadow-sm to --shadow-xl. standard keeps the shadows of the theme or palette.

Type scale: --font-size-* and the base / relaxed line heights. large is meant for reading.

### Whole app

Set the props on the root ConfigProvider: it writes the non-standard axes as data attributes on  (and the preset's palette as data-palette), and restores  when it unmounts. useConfig().design returns the resolved axes.

### Server rendering

The root provider applies the attributes after hydration. For a first paint with the right look, render them in the server HTML with designAttributes() from the server-safe minerva-design/theme-utils entry, and/or pass the same design to createThemeInitScript({ design }), which also uses the preset's palette as the default palette.

### Nested scopes

A nested ConfigProvider inherits the design of its parent and applies its overrides to its subtree only: a display: contents wrapper and the portal container of the scope carry every design attribute, so modals, popovers and toasts rendered from the subtree get the same look. A nested preset resets every axis it does not set.

### Using the tokens in your own CSS

The axes only change design tokens, so your own styles can use the same variables and stay consistent with the components. Per-component tweaks are available through each component's CSS variables (see the "CSS variables" section of every component page).

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // The whole app gets the editorial look: editorial palette, comfortable
  // density, small radius, subtle shadows and a reading-oriented type scale.
  return (
    <ConfigProvider preset="editorial" density="standard">
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
// app/layout.tsx (React Server Component, e.g. Next.js App Router)
import {
  createThemeInitScript,
  designAttributes,
} from "minerva-design/theme-utils";
import { Providers } from "./providers"; // "use client": <ConfigProvider preset="editorial">

const design = { preset: "editorial" } as const;
const themeScript = createThemeInitScript({ design });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-density / data-radius / data-shadow / data-font-scale in the HTML:
    // the first paint already has the right look
    <html lang="en" suppressHydrationWarning {...designAttributes(design)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
<ConfigProvider preset="compact">
  {/* dense admin screens */}
  <ConfigProvider preset="editorial">
    {/* an article preview: editorial look, portals (Modal, Popover...) included */}
  </ConfigProvider>
  <ConfigProvider radius="none">
    {/* inherits compact, only the radius changes */}
  </ConfigProvider>
</ConfigProvider>
```

```css
/* The axes only set design tokens, so your own CSS can use them too */
.panel {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--row-padding-y) var(--row-padding-x);
  font-size: var(--font-size-md);
}

/* ...or react to the active design */
[data-density="compact"] .panel {
  gap: var(--space-1);
}
```

## API

```json
{
  "DesignOptions": {
    "source": "core/src/theme/design.ts",
    "description": "Design axes chosen by the app; unset axes come from the preset.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"minerva\"",
        "description": "Named combination of the axes below and a default palette: \"minerva\" (default look), \"editorial\" (restrained, reading-oriented), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density with 44px touch targets, large radius)"
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "description": "Spacing density of controls and rows"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "description": "Corner radius scale"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "description": "Elevation shadow scale"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "description": "Type scale"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Individual axes

Each axis can be set on its own, and overrides the value of the preset.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/design-presets/demos/axes.tsx

```tsx
import { useState } from "react";
import { ConfigProvider, Radio, RadioGroup, VStack } from "minerva-design";
import type {
  Density,
  FontScale,
  RadiusScale,
  ShadowScale,
} from "minerva-design";
import { Showcase } from "../Showcase";

const AXES = {
  density: ["compact", "standard", "comfortable"],
  radius: ["none", "small", "medium", "large"],
  shadow: ["none", "subtle", "standard"],
  fontScale: ["small", "standard", "large"],
} as const;

type Design = {
  density: Density;
  radius: RadiusScale;
  shadow: ShadowScale;
  fontScale: FontScale;
};

// Each axis can be set on its own (and overrides the preset's value)
export default function AxesDemo() {
  const [design, setDesign] = useState<Design>({
    density: "standard",
    radius: "medium",
    shadow: "standard",
    fontScale: "standard",
  });
  return (
    <VStack gap={4} align="start">
      {(Object.keys(AXES) as Array<keyof Design>).map((axis) => (
        <RadioGroup
          key={axis}
          label={axis}
          direction="horizontal"
          value={design[axis]}
          onChange={(value) =>
            setDesign(
              (current) => ({ ...current, [axis]: String(value) }) as Design,
            )
          }
        >
          {AXES[axis].map((value) => (
            <Radio key={value} value={value} label={value} />
          ))}
        </RadioGroup>
      ))}
      <ConfigProvider {...design}>
        <Showcase />
      </ConfigProvider>
    </VStack>
  );
}

```

### apps/docs/src/docs/pages/design-presets/Showcase.tsx

```tsx
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  Input,
  Select,
  SelectItem,
  Switch,
  Tag,
  VStack,
} from "minerva-design";

/** The same screen, rendered under every design */
export function Showcase() {
  return (
    <Card style={{ maxWidth: 520, width: "100%" }}>
      <CardHeader>
        <CardTitle>Weekly digest</CardTitle>
      </CardHeader>
      <CardContent>
        <VStack gap={3}>
          <p style={{ margin: 0, lineHeight: "var(--line-height-base)" }}>
            A restrained, reading-oriented look keeps long texts comfortable; a
            compact one fits more data on dense screens.
          </p>
          <HStack gap={2} wrap>
            <Tag color="primary">Essay</Tag>
            <Tag color="success">Published</Tag>
          </HStack>
          <Input
            name="design-title"
            aria-label="Title"
            defaultValue="On craft"
          />
          <Select aria-label="Section" defaultValue="essays">
            <SelectItem value="essays">Essays</SelectItem>
            <SelectItem value="notes">Notes</SelectItem>
          </Select>
          <Switch label="Send as newsletter" defaultChecked />
          <Alert color="info" title="Scheduled for Monday" />
          <HStack gap={2}>
            <Button>Publish</Button>
            <Button color="neutral" variant="outline">
              Save draft
            </Button>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  );
}

```

## Example: Presets

The same screen under each preset. A nested ConfigProvider scopes the preset to the demo; on the root provider it applies to the whole document.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/design-presets/demos/presets.tsx

```tsx
import { useState } from "react";
import { Button, ConfigProvider, HStack, VStack } from "minerva-design";
import type { DesignPreset } from "minerva-design";
import { Showcase } from "../Showcase";

const PRESETS: DesignPreset[] = ["minerva", "editorial", "compact", "touch"];

// A nested ConfigProvider scopes the design to its subtree; at the root of
// an app the same props switch the whole document (<html data-*>).
export default function PresetsDemo() {
  const [preset, setPreset] = useState<DesignPreset>("editorial");
  return (
    <VStack gap={4} align="start">
      <HStack gap={2} role="group" aria-label="Design preset">
        {PRESETS.map((name) => (
          <Button
            key={name}
            size="small"
            color={name === preset ? "primary" : "neutral"}
            variant={name === preset ? "solid" : "outline"}
            aria-pressed={name === preset}
            onClick={() => setPreset(name)}
          >
            {name}
          </Button>
        ))}
      </HStack>
      <ConfigProvider preset={preset}>
        <Showcase />
      </ConfigProvider>
    </VStack>
  );
}

```

### apps/docs/src/docs/pages/design-presets/Showcase.tsx

```tsx
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  Input,
  Select,
  SelectItem,
  Switch,
  Tag,
  VStack,
} from "minerva-design";

/** The same screen, rendered under every design */
export function Showcase() {
  return (
    <Card style={{ maxWidth: 520, width: "100%" }}>
      <CardHeader>
        <CardTitle>Weekly digest</CardTitle>
      </CardHeader>
      <CardContent>
        <VStack gap={3}>
          <p style={{ margin: 0, lineHeight: "var(--line-height-base)" }}>
            A restrained, reading-oriented look keeps long texts comfortable; a
            compact one fits more data on dense screens.
          </p>
          <HStack gap={2} wrap>
            <Tag color="primary">Essay</Tag>
            <Tag color="success">Published</Tag>
          </HStack>
          <Input
            name="design-title"
            aria-label="Title"
            defaultValue="On craft"
          />
          <Select aria-label="Section" defaultValue="essays">
            <SelectItem value="essays">Essays</SelectItem>
            <SelectItem value="notes">Notes</SelectItem>
          </Select>
          <Switch label="Send as newsletter" defaultChecked />
          <Alert color="info" title="Scheduled for Monday" />
          <HStack gap={2}>
            <Button>Publish</Button>
            <Button color="neutral" variant="outline">
              Save draft
            </Button>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  );
}

```
