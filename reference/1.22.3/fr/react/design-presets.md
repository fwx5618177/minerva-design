# Préréglages de design

Changez l'apparence de toute une application, ou d'une partie, avec quelques props : un préréglage (minerva, editorial, compact, touch) ou les axes de design individuels densité, rayon, ombre et échelle typographique. Compatible SSR et portées imbriquées.

Package: minerva-design@1.22.3

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Axes de design

Attribut

Les axes de design sont indépendants du mode de couleur (theme) et de la palette. Chacun sélectionne un bloc de jetons de design via un attribut data ; les composants lisent ces jetons (hauteurs de contrôle, marges, rayons, ombres, tailles de police), donc toute la bibliothèque suit. Un préréglage est une combinaison nommée des quatre axes et d'une palette par défaut ; les axes et la palette explicites l'emportent sur le préréglage.

minerva : l'apparence par défaut de Minerva. editorial : sobre et orientée lecture (palette editorial, densité confortable, petit rayon, ombres discrètes, grands caractères). compact : écrans denses, riches en données (densité compacte, petit rayon, petits caractères). touch : applications mobiles grand public (densité confortable avec des cibles tactiles d'au moins 44px, grand rayon).

Hauteurs et marges horizontales des contrôles (--control-height-*, --control-padding-x-*) et marges des lignes comme les éléments de menu, les options et les cellules de tableau (--row-padding-y / --row-padding-x), ainsi que la taille minimale des cibles tactiles (--touch-target-min : 24px en compact, 32px en standard, 44px en confortable).

Échelle des rayons : --radius-sm, --radius-md, --radius-lg, --radius-xl et --radius-2xl.

Ombres d'élévation --shadow-sm à --shadow-xl. standard conserve les ombres du thème ou de la palette.

Échelle typographique : --font-size-* et les hauteurs de ligne de base / aérée. large est pensé pour la lecture.

### Toute l'application

Définissez les props sur le ConfigProvider racine : il écrit les axes non standard comme attributs data sur  (et la palette du préréglage comme data-palette), puis restaure  au démontage. useConfig().design renvoie les axes résolus.

### Rendu serveur

Le provider racine applique les attributs après l'hydratation. Pour un premier rendu avec la bonne apparence, écrivez-les dans le HTML serveur avec designAttributes() de l'entrée sans danger côté serveur minerva-design/theme-utils, et/ou passez le même design à createThemeInitScript({ design }), qui utilise aussi la palette du préréglage comme palette par défaut.

### Portées imbriquées

Un ConfigProvider imbriqué hérite du design de son parent et n'applique ses surcharges qu'à son sous-arbre : un conteneur display: contents et le conteneur de portail de la portée portent tous les attributs de design, donc les modales, popovers et toasts rendus depuis ce sous-arbre ont la même apparence. Un préréglage imbriqué réinitialise chaque axe qu'il ne définit pas.

### Utiliser les jetons dans votre CSS

Les axes ne changent que des jetons de design : vos propres styles peuvent utiliser les mêmes variables et rester cohérents avec les composants. Les ajustements par composant passent par les variables CSS de chaque composant (voir la section « Variables CSS » de chaque page de composant).

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

## Example: Axes individuels

Chaque axe peut être défini seul et remplace la valeur du préréglage.

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

## Example: Préréglages

Le même écran avec chaque préréglage. Un ConfigProvider imbriqué limite le préréglage à la démo ; sur le provider racine, il s'applique à tout le document.

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
