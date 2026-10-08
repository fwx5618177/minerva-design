import { inject, type InjectionKey, type Ref } from "vue";
import type { SupportedLanguage } from "@minerva/core";

/**
 * Internal state shared by nested `ConfigProvider`s (not public API).
 * Missing outside of any provider: the first provider is the root one and
 * owns the document-level side effects (`<html>` attributes, cookies, the
 * global language).
 */
export interface ThemeScope {
  /** A nested provider overrides the theme / palette / design of its subtree */
  readonly scoped: boolean;
  /**
   * Element teleported content (Modal, Popover, Select, Toast...) renders
   * into, so it gets the scoped theme. `null` = `document.body`.
   */
  readonly portalContainer: HTMLElement | null;
  /** Language of the closest provider setting one (root included) */
  readonly language: SupportedLanguage | undefined;
}

export const THEME_SCOPE_KEY: InjectionKey<Ref<ThemeScope>> = Symbol(
  "minerva-theme-scope",
);

/** Attribute marking a theme scope element (wrapper or portal container). */
export const THEME_SCOPE_ATTRIBUTE = "data-minerva-theme-scope";

export const useThemeScope = (): Ref<ThemeScope> | null =>
  inject(THEME_SCOPE_KEY, null);

/**
 * The element of the closest dismissable layer (Modal content, Popover
 * panel...): nested layers register as its children, so Escape / outside
 * clicks only close the topmost one.
 */
export const LAYER_KEY: InjectionKey<Ref<Element | null>> =
  Symbol("minerva-layer");

export const useLayerParent = (): Ref<Element | null> | null =>
  inject(LAYER_KEY, null);
