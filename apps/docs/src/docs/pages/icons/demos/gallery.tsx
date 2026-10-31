import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Empty,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "minerva-design";
import { Icon, type IconDefinition } from "minerva-design/icons";
import { iconCategories, searchIcons } from "minerva-design/icons/core";
import styles from "../icons.module.scss";

const SIZES = [16, 20, 24, 32];
const STROKES = [1.5, 2, 2.5];

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
  const [copied, setCopied] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      searchIcons(query).filter(
        (icon) => category === "all" || icon.category === category,
      ),
    [query, category],
  );

  const copy = (icon: IconDefinition) => {
    const code = snippet(icon);
    void navigator.clipboard?.writeText(code).then(
      () => setCopied(code),
      () => setCopied(null),
    );
  };

  return (
    <div className={styles.stage}>
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
        {shown.length ? (
          <div className={styles.grid}>
            {shown.map((icon) => (
              <button
                key={icon.name}
                type="button"
                className={styles.tile}
                title={t("copy", { code: snippet(icon) })}
                onClick={() => copy(icon)}
              >
                <Icon
                  icon={icon}
                  size={size}
                  strokeWidth={stroke}
                  renderer={mode === "svg" ? "svg" : "auto"}
                />
                <span className={styles.tileName}>{icon.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <Empty description={t("empty", { query })} />
        )}
      </div>
      <div className={styles.footer}>
        <p>{t("count", { n: shown.length })}</p>
        <p role="status">{copied ? t("copied", { code: copied }) : ""}</p>
      </div>
    </div>
  );
}
