# アイコン

Minerva のアイコンセット。ライブラリのために 24×24 グリッド上で描き起こしたオリジナルのアイコンで、既定ではインライン SVG として描画され、Canvas2D、WebGL、WebGL2、WebGPU のキャンバスにも描画できます。

Package: minerva-design@1.20.5

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### 概要

minerva-design/icons は {{categories}} カテゴリ、{{count}} 個のアイコンを収録し、サードパーティのアイコンセットは使いません。すべてのアイコンはライブラリ独自の SVG パスデータで、どのレンダラー・どのフレームワークでも同じデータを使います。

統一されたビジュアル言語。24×24 グリッド、約 2px の余白、丸い線端と結合部を持つ 2px のストローク、塗りなし。テキストと自然になじみ、12 から 96 ピクセルまで拡大縮小できます。一部のアイコンはストロークごとに色（colors）を持ち、それ以外は color プロパティに従います。

既定は SVG。どのサイズでも鮮明で、サーバーで描画でき、テキストの色（currentColor）で着色され、title を指定しない限り支援技術からは隠されます。

同じジオメトリを GPU でも。Icon は renderer="auto"、"webgpu"、"webgl2"、"webgl"、"canvas2d" でキャンバスに描画し、IconCanvas は数千個のアイコンを数回のインスタンス描画で描きます。フォールバックはチャートと同じ WebGPU -> WebGL2 -> WebGL -> Canvas2D です。

使った分だけ。各アイコンは個別の定数（searchIcon）とコンポーネント（SearchIcon）で、キャンバスレンダラーは最初のキャンバスアイコンが現れたときに初めて読み込まれます。

フレームワーク非依存のコア。minerva-design/icons/core にはアイコンデータ、SVG 文字列、Canvas2D 描画、GPU キャンバスが含まれ、どのフレームワークでも使えます。React コンポーネントはこの上に構築されています。

コンポーネントは Icon、GPU での一括描画は IconCanvas、フレームワーク非依存の API は アイコンコア を参照してください。

アイコンを検索

名前またはタグで検索…

カテゴリ

すべてのカテゴリ

サイズ

線幅

描画方式

SVG

キャンバス

{{code}} をコピー

{{code}} をコピーしました

{{code}} をコピーできません：クリップボードを利用できません

種類

すべての種類

単色

カラー

色

文字色

プライマリ

成功

警告

危険

{{n}} 個のアイコン

「{{query}}」に一致するアイコンはありません

矢印

操作

インターフェース

メディア

ファイル

コミュニケーション

データとチャート

金融

ステータス

デバイス

天気

自然

食べ物

人物

場所

図形

テキスト

教育

健康

ショッピング

音楽

ツール

スポーツ

```tsx
import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ギャラリー

セットのすべてのアイコン。名前やタグで検索し、カテゴリや種類で絞り込み、サイズ・線幅・色を試し、SVG とキャンバスを切り替えられます。キャンバスモードでは、ページ上部のレンダラーバーで選んだバックエンドが各アイコンを描画します。単色アイコン（操作・矢印・ステータスなどのインターフェース用）はテキストと同じく文字色に従うため、ボタンや入力欄にそのまま使えます。カラーアイコンは固有のアクセントカラーを保ち、ニュートラルな線だけが色に従います。アイコンをクリックするとコンポーネントをコピーします。

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
