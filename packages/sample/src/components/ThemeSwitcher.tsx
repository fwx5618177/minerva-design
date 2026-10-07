import React from "react";
import { useTranslation } from "react-i18next";
import {
  IoContrastOutline,
  IoLogoGithub,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import styles from "@styles/components/theme-switcher.module.scss";
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  PALETTE_CHOICES,
  THEME_MODES,
  useThemeMode,
  type PaletteChoice,
  type ThemeMode,
} from "../theme/ThemeModeContext";

const LABEL_KEYS: Record<ThemeMode, string> = {
  auto: "header.theme.auto",
  light: "header.theme.light",
  dark: "header.theme.dark",
  "github-dark": "header.theme.githubDark",
};

const FALLBACK_LABELS: Record<ThemeMode, string> = {
  auto: "Auto",
  light: "Light",
  dark: "Dark",
  "github-dark": "GitHub Dark",
};

const ICONS: Record<ThemeMode, React.ComponentType<{ className?: string }>> = {
  auto: IoContrastOutline,
  light: IoSunnyOutline,
  dark: IoMoonOutline,
  "github-dark": IoLogoGithub,
};

/** Theme picker for the docs header: auto (system) / light / dark / github-dark. */
const ThemeSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { mode, setMode } = useThemeMode();
  const Icon = ICONS[mode];
  const label = t("header.theme.label", { defaultValue: "Theme" });

  return (
    <label className={styles.themeSwitcher}>
      <Icon className={styles.icon} aria-hidden="true" />
      <select
        className={styles.select}
        value={mode}
        aria-label={label}
        title={label}
        onChange={(e) => setMode(e.target.value as ThemeMode)}
      >
        {THEME_MODES.map((m) => (
          <option key={m} value={m}>
            {t(LABEL_KEYS[m], { defaultValue: FALLBACK_LABELS[m] })}
          </option>
        ))}
      </select>
    </label>
  );
};

/** Palette picker for the docs header: default / editorial / tech / graphite / cool. */
export const PaletteSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { palette, setPalette } = useThemeMode();
  const label = t("header.palette.label");

  return (
    <label className={styles.themeSwitcher}>
      <IoColorPaletteOutline className={styles.icon} aria-hidden="true" />
      <select
        className={styles.select}
        value={palette}
        aria-label={label}
        title={label}
        onChange={(e) => setPalette(e.target.value as PaletteChoice)}
      >
        {PALETTE_CHOICES.map((p) => (
          <option key={p} value={p}>
            {t(`header.palette.${p}`)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ThemeSwitcher;
