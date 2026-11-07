# Icônes

Le jeu d’icônes de Minerva : des icônes originales dessinées pour la bibliothèque sur une grille 24×24, rendues en SVG inline par défaut et aussi dessinées sur des canvas Canvas2D, WebGL, WebGL2 ou WebGPU.

Package: minerva-design@1.22.3

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Vue d’ensemble

minerva-design/icons fournit {{count}} icônes réparties en {{categories}} catégories, sans jeu d’icônes tiers : chaque icône est une donnée de tracé SVG propre à la bibliothèque, la même pour tous les rendus et tous les frameworks.

Un seul langage visuel : une grille 24×24 avec environ 2px de marge, des traits de 2px aux extrémités et jointures arrondies, sans remplissage, pour que les icônes s’accordent au texte et s’adaptent de 12 à 96 pixels. Certaines icônes ont une couleur par trait (colors) ; les autres suivent la propriété color.

SVG par défaut : net à toutes les tailles, rendu côté serveur, coloré par la couleur du texte (currentColor), masqué aux technologies d’assistance sauf s’il reçoit un title.

La même géométrie sur le GPU : Icon dessine sur un canvas avec renderer="auto", "webgpu", "webgl2", "webgl" ou "canvas2d", et IconCanvas dessine des milliers d’icônes en quelques dessins instanciés, avec la chaîne de repli des graphiques WebGPU -> WebGL2 -> WebGL -> Canvas2D.

Ne payez que ce que vous utilisez : chaque icône a sa propre constante (searchIcon) et son propre composant (SearchIcon), et les rendus canvas ne se chargent qu’avec la première icône canvas.

Un cœur sans framework : minerva-design/icons/core contient les données des icônes, les chaînes SVG, le dessin Canvas2D et les canvas GPU pour n’importe quel framework ; les composants React reposent dessus.

Voir Icon pour le composant, IconCanvas pour les lots GPU et Cœur des icônes pour l’API sans framework.

Rechercher des icônes

Rechercher par nom ou par tag…

Catégorie

Toutes les catégories

Taille

Épaisseur du trait

Rendu

SVG

Canvas

Copier {{code}}

{{code}} copié

Impossible de copier {{code}} : le presse-papiers est indisponible

Type

Tous les types

Monochromes

Multicolores

Couleur

Couleur du texte

Primaire

Succès

Avertissement

Danger

{{n}} icônes

Aucune icône ne correspond à « {{query}} »

Flèches

Actions

Interface

Médias

Fichiers

Communication

Données et graphiques

Finance

État

Appareils

Météo

Nature

Alimentation

Personnes

Lieux

Formes

Texte

Éducation

Santé

Achats

Musique

Outils

Sports

```tsx
import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Galerie

Toutes les icônes du jeu. Recherchez par nom ou par tag, filtrez par catégorie ou par type, essayez tailles, épaisseurs de trait et couleurs, et passez du SVG au canvas : en mode canvas, chaque icône est dessinée par le backend choisi dans la barre de rendu en haut de la page. Les icônes monochromes (celles de l’interface : actions, flèches, statuts…) suivent la couleur du texte, comme du texte, pour s’intégrer aux boutons et aux champs ; les icônes multicolores gardent leurs propres accents et seuls leurs traits neutres suivent la couleur. Cliquez sur une icône pour copier son composant.

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
