import { Button } from "minerva-design";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  IoContrastOutline,
  IoLogoGithub,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { Menu, type MenuEntry } from "minerva-design";
import {
  PALETTE_CHOICES,
  THEME_MODES,
  useThemeMode,
  type PaletteChoice,
  type ThemeMode,
} from "../theme/ThemeModeContext";
import styles from "./site.module.scss";

const LABEL_KEYS: Record<ThemeMode, string> = {
  auto: "header.theme.auto",
  light: "header.theme.light",
  dark: "header.theme.dark",
  "github-dark": "header.theme.githubDark",
};

const ICONS: Record<
  ThemeMode,
  React.ComponentType<{ "aria-hidden"?: boolean }>
> = {
  auto: IoContrastOutline,
  light: IoSunnyOutline,
  dark: IoMoonOutline,
  "github-dark": IoLogoGithub,
};

/**
 * Theme (system / light / dark / GitHub dark) and palette picker of the top
 * navigation: a Minerva Menu with two radio groups. Choices persist in
 * localStorage (ThemeModeProvider).
 */
const ThemeMenu: React.FC = () => {
  const { t } = useTranslation();
  const { mode, setMode, palette, setPalette } = useThemeMode();
  const Icon = ICONS[mode];
  const label = t("header.theme.label");

  const items: MenuEntry[] = [
    {
      type: "radio-group",
      key: "theme",
      label,
      value: mode,
      onValueChange: (value) => setMode(value as ThemeMode),
      closeOnSelect: true,
      items: THEME_MODES.map((m) => ({ value: m, label: t(LABEL_KEYS[m]) })),
    },
    { type: "separator", key: "sep" },
    {
      type: "radio-group",
      key: "palette",
      label: t("header.palette.label"),
      value: palette,
      onValueChange: (value) => setPalette(value as PaletteChoice),
      closeOnSelect: true,
      items: PALETTE_CHOICES.map((p) => ({
        value: p,
        label: t(`header.palette.${p}`),
      })),
    },
  ];

  return (
    <Menu
      items={items}
      size="small"
      align="end"
      aria-label={label}
      className={styles.menuPanel}
    >
      <Button
        variant="ghost"
        color="neutral"
        size="small"
        type="button"
        className={styles.iconButton}
        aria-label={`${label}: ${t(LABEL_KEYS[mode])}`}
        title={label}
      >
        <Icon aria-hidden />
      </Button>
    </Menu>
  );
};

export default ThemeMenu;
