# デザインプリセット

いくつかのプロパティだけで、アプリ全体（またはその一部）の見た目を切り替えられます。プリセット（minerva、editorial、compact、touch）か、個別のデザイン軸（密度・角丸・影・文字サイズ）を指定します。SSR とネストしたスコープに対応しています。

Package: minerva-design@1.21.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### デザイン軸

属性

デザイン軸はカラーモード（theme）やパレットとは独立しています。各軸は data 属性を通じてデザイントークンのブロックを選択し、コンポーネントはそのトークン（コントロールの高さ、余白、角丸、影、文字サイズ）を参照するため、ライブラリ全体が追従します。プリセットは 4 つの軸と既定のパレットを組み合わせた名前付きの設定で、明示した軸やパレットはプリセットより優先されます。

minerva：Minerva の既定の見た目。editorial：控えめで読みやすさ重視（editorial パレット、ゆったりした密度、小さな角丸、控えめな影、大きめの文字）。compact：情報量の多い画面向け（詰めた密度、小さな角丸、小さめの文字）。touch：一般向けモバイルアプリ（ゆったりした密度と最小 44px のタッチターゲット、大きな角丸）。

コントロールの高さと左右の余白（--control-height-*、--control-padding-x-*）、およびメニュー項目・選択肢・表のセルなど行の余白（--row-padding-y / --row-padding-x）、およびタッチターゲットの最小サイズ（--touch-target-min：compact は 24px、standard は 32px、comfortable は 44px）。

角丸のスケール：--radius-sm、--radius-md、--radius-lg、--radius-xl、--radius-2xl。

エレベーションの影 --shadow-sm から --shadow-xl。standard はテーマまたはパレットの影を維持します。

文字サイズのスケール：--font-size-* と基本／ゆったりした行の高さ。large は読み物向けです。

### アプリ全体

ルートの ConfigProvider にプロパティを設定します。標準以外の軸を data 属性として  に書き込み（プリセットのパレットは data-palette として）、アンマウント時に  を元に戻します。useConfig().design は解決済みの軸を返します。

### サーバーレンダリング

ルート provider はハイドレーション後に属性を適用します。最初の描画から正しい見た目にするには、サーバーセーフなエントリ minerva-design/theme-utils の designAttributes() で属性をサーバー HTML に出力するか、同じデザインを createThemeInitScript({ design }) に渡します（プリセットのパレットも既定のパレットとして使われます）。

### ネストしたスコープ

ネストした ConfigProvider は親のデザインを継承し、上書きをそのサブツリーにだけ適用します。display: contents のラッパーとスコープのポータルコンテナがすべてのデザイン属性を持つため、サブツリーから表示されるモーダル、ポップオーバー、トーストも同じ見た目になります。ネストしたプリセットは、指定していない軸をすべてリセットします。

### 独自の CSS でトークンを使う

デザイン軸はデザイントークンを変えるだけなので、独自のスタイルでも同じ変数を使えばコンポーネントと一貫性を保てます。コンポーネント単位の調整は各コンポーネントの CSS 変数で行えます（各コンポーネントページの「CSS 変数」セクションを参照）。

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

## Example: 個別の軸

各軸は個別に設定でき、プリセットの値を上書きします。

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

## Example: プリセット

同じ画面を各プリセットで表示します。ネストした ConfigProvider がプリセットをデモ内に限定します。ルート provider に指定するとドキュメント全体に適用されます。

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
