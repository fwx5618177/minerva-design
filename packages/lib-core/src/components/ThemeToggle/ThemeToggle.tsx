import { cn } from "../../utils/cn";
import { useTheme } from "../../contexts/ThemeProvider";
import useI18n from "../../hooks/useI18n";
import type { ThemeMode } from "../../theme-utils";
import type { ThemeToggleProps } from "./types";
import { hooks } from "../../internal/stylingHooks";
import styles from "./themeToggle.module.scss";

/**
 * Light / dark / system switch (a group of toggle buttons) bound to the
 * closest `ThemeProvider` / `ConfigProvider`.
 */
const ThemeToggle = ({
  showSystem = true,
  labels,
  className,
  ref,
  ...rest
}: ThemeToggleProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();
  const items: ThemeMode[] = showSystem
    ? ["light", "dark", "system"]
    : ["light", "dark"];

  return (
    <div
      ref={ref}
      className={cn(styles.group, className)}
      role="group"
      aria-label={t("themeToggle.label", { theme: resolvedTheme })}
      {...rest}
      {...hooks("theme-toggle", "root")}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={styles.item}
          data-active={theme === item || undefined}
          aria-pressed={theme === item}
          onClick={() => setTheme(item)}
          {...hooks("theme-toggle", "item")}
        >
          {labels?.[item] ?? t(`themeToggle.${item}`)}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
