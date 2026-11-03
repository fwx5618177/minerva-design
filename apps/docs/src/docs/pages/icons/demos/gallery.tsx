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
