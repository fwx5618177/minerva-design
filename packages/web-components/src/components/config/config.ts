import { css, html, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import {
  isDensity,
  isDesignPreset,
  isFontScale,
  isPalette,
  isRadiusScale,
  isShadowScale,
  isThemeName,
  presetPalette,
  themes,
  type Density,
  type DesignPreset,
  type FontScale,
  type Palette,
  type RadiusScale,
  type ShadowScale,
  type SupportedLanguage,
  type ThemeMap,
} from "@minerva/core";
import { applyDesignAttributes, generateCSSVariables } from "@minerva/dom";
import { MinervaElement } from "../../internal/minerva-element";

/** Theme of a `<minerva-config>` scope */
export type ConfigTheme = "light" | "dark" | "system" | "github-dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Attribute of the React library's theme scopes (recomputes the derived tokens) */
const SCOPE_ATTRIBUTE = "data-minerva-theme-scope";

/**
 * Theme, palette, design and language scope for the Minerva elements inside
 * it (and any other content): the Web Component counterpart of the React library's
 * `ConfigProvider`.
 *
 * It renders as `display: contents` and writes the same attributes as a
 * nested `ConfigProvider` (`data-theme`, `data-palette`,
 * `data-density` / `data-radius` / `data-shadow` / `data-font-scale`,
 * `data-minerva-theme-scope`, `lang`), so the design tokens of
 * `minerva-design/tokens.css` (also published as
 * `minerva-design/tokens.css`) resolve for its subtree. Scopes
 * nest: the closest one wins. Overlays opened inside stay in the scope (they
 * use the top layer without being moved). With `root`, the attributes go on
 * `<html>` instead (whole page).
 *
 * Without `<minerva-config>`, the same attributes set on any ancestor (e.g.
 * `<html data-theme="dark" lang="fr">`) work too.
 *
 * @summary Theme / palette / design / locale scope (ConfigProvider for Web Components).
 * @tag minerva-config
 * @slot - Scoped content
 * @fires minerva-theme-change - The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme="system"`
 */
export class MinervaConfig extends MinervaElement {
  static override tagName = "minerva-config";
  static override styles = css`
    :host {
      display: contents;
    }
  `;

  /** Light, dark, follow the system, or the github-dark theme */
  @property({ reflect: true })
  theme?: ConfigTheme;

  /** Color palette (light and dark variants) */
  @property({ reflect: true })
  palette?: Palette;

  /** Design preset (its palette applies unless `palette` is set) */
  @property({ reflect: true })
  design?: DesignPreset;

  /** Spacing density (overrides the preset) */
  @property({ reflect: true })
  density?: Density;

  /** Corner radius scale (overrides the preset) */
  @property({ reflect: true })
  radius?: RadiusScale;

  /** Elevation shadow scale (overrides the preset) */
  @property({ reflect: true })
  shadow?: ShadowScale;

  /** Type scale (overrides the preset) */
  @property({ reflect: true, attribute: "font-scale" })
  fontScale?: FontScale;

  /** Language of the built-in texts of the elements inside */
  @property({ reflect: true })
  locale?: SupportedLanguage;

  /** Apply to the whole document (`<html>`) instead of this subtree */
  @property({ type: Boolean, reflect: true })
  root = false;

  private media: MediaQueryList | null = null;
  private mode: "light" | "dark" | null = null;

  /** Light / dark mode currently applied (`null` when no theme is set). */
  get resolvedMode(): "light" | "dark" | null {
    return this.mode;
  }

  private readonly onSchemeChange = () => this.apply();

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== "undefined" && window.matchMedia) {
      this.media = window.matchMedia(DARK_QUERY);
      this.media.addEventListener("change", this.onSchemeChange);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.media?.removeEventListener("change", this.onSchemeChange);
    this.media = null;
    if (this.root) this.clear(document.documentElement);
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("root") && changed.get("root") !== undefined) {
      this.clear(changed.get("root") ? document.documentElement : this);
    }
    this.apply();
  }

  private target(): HTMLElement {
    return this.root ? document.documentElement : this;
  }

  private clear(el: HTMLElement) {
    for (const name of [
      "data-theme",
      "data-palette",
      SCOPE_ATTRIBUTE,
      "lang",
    ]) {
      if (el !== this || name !== "lang") el.removeAttribute(name);
    }
    applyDesignAttributes(el, null);
    generateCSSVariables(el.style, {} as ThemeMap);
    el.style.removeProperty("color-scheme");
  }

  private apply() {
    const el = this.target();
    const set = (name: string, value: string | null | undefined) => {
      if (value === null || value === undefined) el.removeAttribute(name);
      else el.setAttribute(name, value);
    };
    const theme = this.theme;
    const system = this.media?.matches ? "dark" : "light";
    const mode =
      theme === "system"
        ? system
        : theme === "github-dark"
          ? "dark"
          : theme === "light" || theme === "dark"
            ? theme
            : null;

    const design = isDesignPreset(this.design) ? this.design : undefined;
    const palette = isPalette(this.palette)
      ? this.palette
      : presetPalette(design);
    const usesPalette = !!palette && theme !== "github-dark";

    set("data-theme", mode);
    set("data-palette", usesPalette ? palette : null);
    if (!this.root) {
      const scoped =
        mode !== null ||
        usesPalette ||
        design !== undefined ||
        [this.density, this.radius, this.shadow, this.fontScale].some(Boolean);
      set(SCOPE_ATTRIBUTE, scoped ? "" : null);
    }
    if (mode) el.style.colorScheme = mode;
    else el.style.removeProperty("color-scheme");
    // github-dark (and future named themes) are inline token sets
    generateCSSVariables(
      el.style,
      theme === "github-dark" && isThemeName(theme)
        ? themes[theme]
        : ({} as ThemeMap),
    );
    applyDesignAttributes(
      el,
      {
        preset: design,
        density: isDensity(this.density) ? this.density : undefined,
        radius: isRadiusScale(this.radius) ? this.radius : undefined,
        shadow: isShadowScale(this.shadow) ? this.shadow : undefined,
        fontScale: isFontScale(this.fontScale) ? this.fontScale : undefined,
      },
      { all: !this.root && design !== undefined },
    );
    if (this.root && this.locale) {
      document.documentElement.lang = this.locale;
    }
    if (mode !== this.mode) {
      this.mode = mode;
      if (mode) this.emit("minerva-theme-change", { mode });
    }
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-config": MinervaConfig;
  }
}
