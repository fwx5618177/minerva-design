import { cn } from "../../utils/cn";
import { useTheme } from "../../contexts/ThemeProvider";
import useI18n from "../../hooks/useI18n";
import { PALETTES, type Palette } from "../../theme-utils";
import type { PaletteToggleProps } from "./types";
import styles from "./themeToggle.module.scss";

/**
 * Palette switch (editorial / tech / graphite / cool), orthogonal to the
 * light / dark mode. Bound to the closest `ThemeProvider` / `ConfigProvider`.
 */
const PaletteToggle = ({
  palettes = [...PALETTES],
  showDefault = false,
  labels,
  className,
  ref,
  ...rest
}: PaletteToggleProps) => {
  const { palette, setPalette } = useTheme();
  const { t } = useI18n();
  const items: Array<Palette | null> = showDefault
    ? [null, ...palettes]
    : palettes;

  return (
    <div
      ref={ref}
      className={cn(styles.group, className)}
      role="group"
      aria-label={t("paletteToggle.label", {
        palette: palette ?? t("paletteToggle.default"),
      })}
      {...rest}
    >
      {items.map((item) => {
        const key = item ?? "default";
        const active = palette === item;
        return (
          <button
            key={key}
            type="button"
            className={styles.item}
            data-active={active || undefined}
            aria-pressed={active}
            onClick={() => setPalette(item)}
          >
            {labels?.[key] ?? t(`paletteToggle.${key}`)}
          </button>
        );
      })}
    </div>
  );
};

export default PaletteToggle;
