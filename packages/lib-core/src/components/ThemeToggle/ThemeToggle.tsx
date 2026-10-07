import classNames from "classnames";
import { useTheme } from "../../contexts/ThemeProvider";
import useI18n from "../../hooks/useI18n";
import type { ThemeMode } from "../../theme-utils";
import type { ThemeToggleProps } from "./types";
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
      className={classNames(styles.group, "ui-theme-toggle", className)}
      role="group"
      aria-label={t("themeToggle.label", { theme: resolvedTheme })}
      {...rest}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={classNames(styles.item, "ui-theme-toggle-item")}
          data-active={theme === item || undefined}
          aria-pressed={theme === item}
          onClick={() => setTheme(item)}
        >
          {labels?.[item] ?? t(`themeToggle.${item}`)}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
