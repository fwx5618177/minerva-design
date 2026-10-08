// Registers <minerva-theme-toggle> and <minerva-palette-toggle>.
import {
  MinervaPaletteToggle,
  MinervaThemeToggle,
} from "../components/theme-toggle/theme-toggle";
import { defineElement } from "../internal/define";
defineElement(MinervaThemeToggle);
defineElement(MinervaPaletteToggle);
export * from "../components/theme-toggle/theme-toggle";
