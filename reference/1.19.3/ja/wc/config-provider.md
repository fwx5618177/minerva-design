# ConfigProvider

React 版のテーマと言語をアプリケーションに提供し、useConfig() から参照できるようにします。

Package: minerva-design@1.19.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 使い方

アプリケーションのルートに ConfigProvider を 1 つ配置します。テーマを CSS 変数として  に適用し、React 版内蔵テキストの言語を設定し、両方を useConfig() に提供します。

どちらのプロパティもリアクティブです。state に保持すれば、実行時にテーマや言語をユーザーが切り替えられます。

グローバルな状態を変更するのは最も外側の ConfigProvider だけです。 に data-theme、data-palette とテーマ変数を書き込み、Cookie を保存し、React 版のグローバルな言語を設定します。入れ子の Provider はこれらを一切行わず、自身の設定をサブツリーにだけ適用します（「Provider の入れ子」を参照）。

### パレット、永続化、コールバック

palette は light、dark、system テーマの上に配色パレット（"editorial"、"tech"、"graphite"、"cool"）を重ねます。persist はテーマとパレットの変更を theme と palette の Cookie に保存し、ハイドレーション後に復元します。onThemeChange と onPaletteChange は setTheme と setPalette が値を変更した後に呼ばれます。

useConfig() は mode、resolvedMode、palette と、setTheme、setPalette のセッターも返すので、state を持ち上げなくてもどのコンポーネントからでもテーマを切り替えられます。サーバーレンダリング、Cookie、ちらつき防止の初期化スクリプトについては次のページを参照してください：

### ブランドカラー

primaryColor を使うと、--primary-color を手動で上書きせずにブランドカラーを設定できます。両モード共通の CSS カラー（"#4f46e5"、rgb()、色名）か、{ light, dark } のペアを渡します。テーマは明示的なままです。theme は "light"、"dark"、"system" のままなので、data-theme、useConfig().mode、ThemeToggle はそのまま動作します。

派生トークン：primary-color から派生するすべてのトークン（hover、active、subtle、border、text、フォーカスリング、選択色、およびパレットが独自のアクセントを持たない場合の accent トークン）が、デフォルトテーマと同じ式でブランドカラーから再計算されます。単色の場合、ダークモードの値は暗い面で 4.5:1 のコントラストに達するまで OKLab で白に向けて混色されます（#4f46e5 は #7b85f2 になります）。すでに基準を満たす色はそのまま使われます。

優先順位：primaryColor はパレットやテーマのプライマリカラーより優先され、パレットのその他のトークンは維持されます。無効な色は無視され、開発時に警告が出ます。

入れ子：入れ子の Provider はブランドカラーを継承し、入れ子の primaryColor はそのサブツリー（オーバーレイを含む）にだけ適用されます。null でテーマ本来のプライマリカラーに戻ります。

サーバーレンダリング：ルート Provider はライトとダークのブランドカラーを data-theme で切り替える  として出力するため、ハイドレーション前のサーバーマークアップにもブランドカラーが含まれます（テーマ初期化スクリプトと組み合わせればちらつきません）。React Native（MinervaProvider）、Taro・uni-app・WeChat ミニプログラムの Provider（ConfigProvider / ThemeProvider）、Vue（ConfigProvider / ThemeProvider）、Angular（、provideMinerva({ primaryColor })）、 も同じ値を同じ意味で受け付けます。

### ConfigContext

上位に ConfigProvider がない場合、useConfig() は例外を投げるため、設定ミスを早期に発見できます。Provider が任意の場合は ConfigContext を直接読み取ってください。例外ではなく undefined が返ります。

### Provider の入れ子

別の ConfigProvider の内側にある ConfigProvider を入れ子の Provider と呼びます。ページの一部の領域、プレビュー、デモだけに別のテーマ・パレット・言語を適用したいときに使い、ページの他の部分には影響しません。

継承：上にある最も近い Provider から theme、palette、locale を継承します。上書きされるのは指定した props だけで、その下の useConfig() はマージされた値を返します。継承した設定は親の変更に追従します。

スコープ付きテーマ：theme や palette の上書きはサブツリーにだけ適用されます。Provider は display: contents のラッパー要素（レイアウトは変わりません）を描画し、そこに data-theme、data-palette とテーマ変数を設定します。theme も palette も上書きしない場合、ラッパーは描画されません。

スコープ付き言語：locale の上書きはサブツリーの内蔵テキストだけを変更します。locale だけを指定した Provider はテーマに一切触れません。

オーバーレイ：スコープ付きサブツリーからポータルで描画されるコンテンツ（Modal、Drawer、Popover、Select、Menu、Tooltip、Toast など）は、同じスコープを持つ  上のコンテナに描画されるため、オーバーレイにもスコープ付きテーマが適用されます。React ツリーの外で描画される命令的 API（スタンドアロンの confirm() など）はルートのテーマを使います。

グローバルな状態：入れ子の Provider は  への書き込み、Cookie の読み書き（persist は無視されます）、React 版のグローバルな言語の変更を一切行いません。アンマウントしてもページはルート Provider が設定した状態のままで、ルート Provider をアンマウントすると変更した内容が元に戻ります。入れ子の Provider の setTheme と setPalette は自身の上書き値を変更し、上書きしていない設定については親の値を変更します。

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      <App />
    </ConfigProvider>
  );
}
```

```tsx
import { useState } from "react";
import { Button, ConfigProvider, type Theme } from "minerva-design";

export default function Root() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ConfigProvider theme={theme}>
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </Button>
    </ConfigProvider>
  );
}
```

```tsx
import { Button, ConfigProvider, useConfig } from "minerva-design";

export default function Root() {
  return (
    // "system" is an alias of "auto". palette applies with light / dark / system.
    <ConfigProvider
      theme="system"
      palette="editorial"
      persist // restore / save the "theme" and "palette" cookies
      onThemeChange={(theme) => analytics.track("theme", theme)}
      onPaletteChange={(palette) => analytics.track("palette", palette)}
    >
      <App />
    </ConfigProvider>
  );
}

function Settings() {
  const { mode, resolvedMode, palette, setTheme, setPalette } = useConfig();
  // mode: "light" | "dark" | "system"; resolvedMode: "light" | "dark"
  return (
    <>
      <Button onClick={() => setTheme(resolvedMode === "dark" ? "light" : "dark")}>
        {mode}
      </Button>
      <Button onClick={() => setPalette(palette === "tech" ? null : "tech")}>
        {palette ?? "default"}
      </Button>
    </>
  );
}
```

```tsx
import { ConfigProvider, ThemeToggle } from "minerva-design";

// Indigo brand: no --primary-color overrides, no !important.
// theme stays "light" | "dark" | "system", so data-theme and ThemeToggle work.
export default function Root() {
  return (
    <ConfigProvider theme="system" persist primaryColor="#4f46e5">
      {/* dark mode derives #7b85f2 from #4f46e5 */}
      <ThemeToggle />
      <App />
    </ConfigProvider>
  );
}

// Or pick both values:
<ConfigProvider theme="light" primaryColor={{ light: "#4f46e5", dark: "#818cf8" }} />

// The palette keeps its surfaces and text colors, primaryColor wins:
<ConfigProvider palette="tech" primaryColor="#4f46e5" />
```

```tsx
import { ConfigProvider } from "minerva-design";

export default function Root() {
  return (
    // root provider: owns <html>, the cookies and the React library's global language
    <ConfigProvider theme="system" palette="editorial" persist>
      <App />

      {/* inherits theme + palette, only this subtree is in Japanese */}
      <ConfigProvider locale={{ language: "ja" }}>
        <Sidebar />
      </ConfigProvider>

      {/* dark + inherited palette for this card and its overlays only */}
      <ConfigProvider theme="dark">
        <PreviewCard />
      </ConfigProvider>
    </ConfigProvider>
  );
}
```

```tsx
import { useContext } from "react";
import { ConfigContext } from "minerva-design";

// Unlike useConfig(), reading the context directly does not throw outside a
// provider: it returns undefined, which is handy for optional integrations.
function useOptionalConfig() {
  return useContext(ConfigContext);
}
```

## ConfigProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/config",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "theme",
    "typeText": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
    "attribute": "theme",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "Palette | undefined",
    "attribute": "palette",
    "required": false
  },
  {
    "name": "design",
    "typeText": "DesignPreset | undefined",
    "attribute": "design",
    "required": false
  },
  {
    "name": "density",
    "typeText": "Density | undefined",
    "attribute": "density",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "RadiusScale | undefined",
    "attribute": "radius",
    "required": false
  },
  {
    "name": "shadow",
    "typeText": "ShadowScale | undefined",
    "attribute": "shadow",
    "required": false
  },
  {
    "name": "fontScale",
    "typeText": "FontScale | undefined",
    "attribute": "font-scale",
    "required": false
  },
  {
    "name": "primaryColor",
    "typeText": "PrimaryColor | undefined",
    "attribute": "primary-color",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "SupportedLanguage | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "root",
    "typeText": "boolean",
    "attribute": "root",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-theme-change",
    "typeText": "CustomEvent<{ mode: \"light\" | \"dark\"; }>",
    "detailType": {
      "typeText": "{ mode: \"light\" | \"dark\"; }",
      "typeRef": "type:9bfa840eb7f37b20f5e9"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Scoped content"
  }
]
```

## API

```json
{
  "wc:minerva-config": {
    "kind": "element",
    "source": "web-components/src/components/config/config.ts",
    "className": "MinervaConfig",
    "summary": "Theme / palette / design / locale scope (ConfigProvider for Web Components).",
    "description": "Theme, palette, design and language scope for the Minerva elements inside it (and any other content): the Web Component counterpart of the React library's `ConfigProvider`. It renders as `display: contents` and writes the same attributes as a nested `ConfigProvider` (`data-theme`, `data-palette`, `data-density` / `data-radius` / `data-shadow` / `data-font-scale`, `data-minerva-theme-scope`, `lang`), so the design tokens of `minerva-design/tokens.css` (also published as `minerva-design/tokens.css`) resolve for its subtree. Scopes nest: the closest one wins. Overlays opened inside stay in the scope (they use the top layer without being moved). With `root`, the attributes go on `<html>` instead (whole page). Without `<minerva-config>`, the same attributes set on any ancestor (e.g. `<html data-theme=\"dark\" lang=\"fr\">`) work too.",
    "properties": [
      {
        "name": "theme",
        "attribute": "theme",
        "type": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
        "description": "Light, dark, follow the system, or the github-dark theme"
      },
      {
        "name": "palette",
        "attribute": "palette",
        "type": "Palette | undefined",
        "description": "Color palette (light and dark variants)"
      },
      {
        "name": "design",
        "attribute": "design",
        "type": "DesignPreset | undefined",
        "description": "Design preset (its palette applies unless `palette` is set)"
      },
      {
        "name": "density",
        "attribute": "density",
        "type": "Density | undefined",
        "description": "Spacing density (overrides the preset)"
      },
      {
        "name": "radius",
        "attribute": "radius",
        "type": "RadiusScale | undefined",
        "description": "Corner radius scale (overrides the preset)"
      },
      {
        "name": "shadow",
        "attribute": "shadow",
        "type": "ShadowScale | undefined",
        "description": "Elevation shadow scale (overrides the preset)"
      },
      {
        "name": "fontScale",
        "attribute": "font-scale",
        "type": "FontScale | undefined",
        "description": "Type scale (overrides the preset)"
      },
      {
        "name": "primaryColor",
        "attribute": "primary-color",
        "type": "PrimaryColor | undefined",
        "description": "Brand color: a CSS color (`primary-color=\"#4f46e5\"`) whose dark-mode value is derived for contrast on dark surfaces, or (as a property) a `{ light, dark }` pair. Recomputes every token derived from `primary-color` and wins over the palette's. The value of the applied mode is written inline: without `theme`, the mode of the closest ancestor with `data-theme` when applied (light when the element scopes a palette, design or scale, whose tokens render light). A brand color alone does not scope the subtree."
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "SupportedLanguage | undefined",
        "description": "Language of the built-in texts of the elements inside"
      },
      {
        "name": "root",
        "attribute": "root",
        "type": "boolean",
        "default": "false",
        "description": "Apply to the whole document (`<html>`) instead of this subtree"
      },
      {
        "name": "resolvedMode",
        "type": "\"light\" | \"dark\" | null",
        "readonly": true,
        "description": "Light / dark mode currently applied (`null` when no theme is set)."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-theme-change",
        "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Scoped content"
      }
    ],
    "parts": [],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

<minerva-config> は display: contents で描画され、内側のすべてのテーマをスコープします。ここではライトとダークのスコープを並べています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/basic.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config theme="light">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Light scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Dark scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: ブランドカラー

primary-color を設定したスコープ：単一のインディゴ（ダーク値 #7b85f2 を自動導出）、ダークスコープのインディゴ、editorial パレットのプライマリより優先されるティール。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/brand-color.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config primary-color="#4f46e5">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#4f46e5" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#0d9488" palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Teal over palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: ロケール

locale は内側の要素の組み込みテキスト（ページネーションの合計、空状態）の言語を設定します。切り替えるとその場で更新されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/locale.html

```html
<label style="display: inline-flex; gap: 8px; align-items: center">
  Locale
  <select id="locale">
    <option value="en">English</option>
    <option value="fr">Français</option>
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
  </select>
</label>
<minerva-config id="scope" locale="en">
  <div style="display: grid; gap: 12px; margin-top: 12px">
    <minerva-pagination total="120" show-total></minerva-pagination>
    <minerva-empty></minerva-empty>
  </div>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/locale.ts

```tsx
// Built-in texts follow the `locale` of the closest <minerva-config>
// (or the closest `lang` attribute) and update live when it changes.
export function setup(root: HTMLElement) {
  const select = root.querySelector<HTMLSelectElement>("#locale")!;
  const scope = root.querySelector<HTMLElement & { locale: string }>("#scope")!;
  const onChange = () => (scope.locale = select.value);
  select.addEventListener("change", onChange);
  return () => select.removeEventListener("change", onChange);
}

```

## Example: ネストしたスコープとテーマイベント

スコープはネストでき、最も近いものが優先されます。内側のスコープは常にライトのまま、外側はボタンに従います。minerva-theme-change は解決後のモードを通知します（theme="system" でも同様）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/nested.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
  <minerva-button
    id="outer-light"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: light</minerva-button
  >
  <minerva-button id="outer-dark" size="small" variant="outline" color="neutral"
    >Outer: dark</minerva-button
  >
  <minerva-button
    id="outer-system"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: system</minerva-button
  >
  <output id="mode" aria-live="polite"></output>
</div>
<minerva-config id="outer" theme="dark">
  <minerva-card variant="outline" padding="medium" style="margin-top: 12px">
    <minerva-card-header>
      <minerva-card-title>Outer scope</minerva-card-title>
      <minerva-card-description
        >Follows the buttons above.</minerva-card-description
      >
    </minerva-card-header>
    <minerva-card-content>
      <minerva-config theme="light" palette="cool">
        <minerva-card variant="elevated" padding="small">
          <minerva-card-content>
            Nested scope: always light with the cool palette (the closest scope
            wins).
            <minerva-button size="small" style="margin-top: 8px"
              >Nested button</minerva-button
            >
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
    </minerva-card-content>
  </minerva-card>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/nested.ts

```tsx
// minerva-theme-change reports the resolved mode of a scope, including the
// system preference when theme="system".
type Config = HTMLElement & {
  theme: string;
  resolvedMode: "light" | "dark" | null;
};

export function setup(root: HTMLElement) {
  const outer = root.querySelector<Config>("#outer")!;
  const mode = root.querySelector<HTMLOutputElement>("#mode")!;
  const show = () => (mode.value = `Resolved mode: ${outer.resolvedMode}`);
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id?.startsWith("outer-")) outer.theme = id.slice("outer-".length);
  };
  root.addEventListener("click", onClick);
  outer.addEventListener("minerva-theme-change", show);
  const frame = requestAnimationFrame(show);
  return () => {
    cancelAnimationFrame(frame);
    root.removeEventListener("click", onClick);
    outer.removeEventListener("minerva-theme-change", show);
  };
}

```

## Example: パレットとデザイン

palette、design（プリセット）、および density / radius / shadow / font-scale の上書きはサブツリーにのみ適用されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/palette-design.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config palette="tech" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="tech" + dark</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config design="compact" radius="none">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>design="compact" radius="none"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config density="comfortable" radius="large" font-scale="large">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Comfortable, large</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```
