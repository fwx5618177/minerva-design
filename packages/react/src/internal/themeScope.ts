import { createContext, useContext } from "react";
import type { SupportedLanguage } from "../contexts/types";

/**
 * Internal state shared by nested `ConfigProvider`s (not part of the public
 * API). `null` outside of any provider: the first provider is the root one and
 * owns the document-level side effects (`<html>` attributes, cookies, the
 * global language of React).
 */
export interface ThemeScope {
  /** A nested provider overrides the theme / palette for its subtree */
  scoped: boolean;
  /**
   * Element portalled content (Modal, Popover, Select, Toast...) is rendered
   * into, so it gets the scoped theme. `null` = `document.body`.
   */
  portalContainer: HTMLElement | null;
  /** Language set by a nested provider, `undefined` = the global language */
  language: SupportedLanguage | undefined;
}

export const ThemeScopeContext = createContext<ThemeScope | null>(null);

/** Attribute marking a theme scope element (wrapper or portal container). */
export const THEME_SCOPE_ATTRIBUTE = "data-minerva-theme-scope";

export const useThemeScope = (): ThemeScope | null =>
  useContext(ThemeScopeContext);

/**
 * Container for portalled content: the portal host of the closest scoped
 * `ConfigProvider`, `undefined` (= `document.body`) otherwise.
 */
export const usePortalContainer = (): HTMLElement | undefined =>
  useContext(ThemeScopeContext)?.portalContainer ?? undefined;
