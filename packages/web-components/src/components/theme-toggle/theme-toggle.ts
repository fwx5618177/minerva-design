import { css, html } from "lit";
import { property } from "lit/decorators.js";
import {
  PALETTES,
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_NAME,
  isPalette,
  isThemeMode,
  readCookieValue,
  serializeThemeCookie,
  type Palette,
  type ThemeMode,
} from "@minerva/core";
import styles from "@react-styles/components/ThemeToggle/themeToggle.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { closestComposed } from "../../internal/dom";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import type { MinervaConfig } from "../config/config";
import { sharedStyles } from "../../internal/styles";

export type { Palette, ThemeMode } from "@minerva/core";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** `{ value }` of `minerva-change` (`null` palette = Minerva's default look) */
export interface ThemeToggleChangeDetail<V> {
  value: V;
}

/**
 * Theme preference of the page when no `<minerva-config>` owns the toggle
 * ("system" cannot be read back from `<html data-theme>`, which holds the
 * resolved mode). Shared by every toggle of the document.
 */
let documentTheme: ThemeMode | null = null;

const systemMode = (): "light" | "dark" =>
  typeof window !== "undefined" && window.matchMedia?.(DARK_QUERY).matches
    ? "dark"
    : "light";

const writeCookie = (name: string, value: string | null) => {
  if (typeof document === "undefined") return;
  document.cookie =
    value === null
      ? `${name}=; path=/; max-age=0; SameSite=Lax`
      : serializeThemeCookie(name, value);
};

/**
 * Base of the toggles: finds the scope (closest `<minerva-config>`, else
 * `<html>`) and re-renders when its theme / palette changes.
 */
abstract class ThemeScopeElement extends MinervaElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
    `,
    sharedStyles(styles),
  ];

  /**
   * Persists the choice in the `theme` / `palette` cookies (like the React library's
   * ThemeProvider) when the toggle drives `<html>` (no `<minerva-config>`)
   */
  @property({ type: Boolean, reflect: true })
  persist = false;

  protected readonly locale = new LocaleController(this);
  private observer: MutationObserver | null = null;
  private media: MediaQueryList | null = null;

  /** The `<minerva-config>` scope the toggle drives, if any. */
  protected get config(): MinervaConfig | null {
    return closestComposed<MinervaConfig>(this, "minerva-config");
  }

  private readonly onScheme = () => this.onSystemChange();

  /** The OS color scheme changed. */
  protected onSystemChange(): void {
    this.requestUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof MutationObserver !== "undefined") {
      this.observer = new MutationObserver(() => this.requestUpdate());
      const config = this.config;
      this.observer.observe(config ?? document.documentElement, {
        attributes: true,
        attributeFilter: config
          ? ["theme", "palette", "data-theme"]
          : ["data-theme", "data-palette"],
      });
    }
    if (typeof window !== "undefined" && window.matchMedia) {
      this.media = window.matchMedia(DARK_QUERY);
      this.media.addEventListener?.("change", this.onScheme);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.observer = null;
    this.media?.removeEventListener?.("change", this.onScheme);
    this.media = null;
  }

  protected renderGroup<V>(
    label: string,
    items: { value: V; text: string; active: boolean }[],
    select: (value: V) => void,
  ) {
    return html`<div part="root" class="group" role="group" aria-label=${label}>
      ${items.map(
        (item) =>
          html`<button
            type="button"
            part=${itemParts("item", { state: item.active ? "active" : "inactive" })}
            class="item"
            data-state=${item.active ? "active" : "inactive"}
            aria-pressed=${item.active ? "true" : "false"}
            @click=${() => select(item.value)}
          >
            ${item.text}
          </button>`,
      )}
    </div>`;
  }
}

/**
 * Light / dark / system switch (`<ThemeToggle>` of React): a group of
 * toggle buttons (`aria-pressed`) bound to the `theme` of the closest
 * `<minerva-config>`, or, without one, to `<html data-theme>` (+ the
 * `color-scheme`; "system" follows the OS setting). With `persist` the
 * choice is stored in the `theme` cookie (core's `serializeThemeCookie`).
 *
 * @summary Light / dark / system theme switch.
 * @tag minerva-theme-toggle
 * @csspart root - The role=group wrapper
 * @csspart item - Every option button (aria-pressed on the selected one)
 * @csspart item--active - Item state of `item`: active
 * @csspart item--inactive - Item state of `item`: inactive
 * @fires minerva-change - The user picked a theme (`detail: { value }`); cancelable: `preventDefault()` keeps the current theme
 */
export class MinervaThemeToggle extends ThemeScopeElement {
  static override tagName = "minerva-theme-toggle";

  /** Hides the "system" (follow the OS) option */
  @property({ type: Boolean, reflect: true, attribute: "hide-system" })
  hideSystem = false;

  /** Overrides of the option labels (defaults are localized) */
  @property({ attribute: false })
  labels?: Partial<Record<ThemeMode, string>>;

  /** Current theme of the scope (`null` when the scope has none). */
  get theme(): ThemeMode | null {
    const config = this.config;
    if (config) {
      const theme = config.theme;
      return theme === "github-dark"
        ? "dark"
        : isThemeMode(theme)
          ? theme
          : null;
    }
    if (documentTheme) return documentTheme;
    const cookie = this.persist
      ? readCookieValue(document.cookie, THEME_COOKIE_NAME)
      : undefined;
    if (isThemeMode(cookie)) return cookie;
    const attr = document.documentElement.getAttribute("data-theme");
    return isThemeMode(attr) ? attr : "system";
  }

  /** Light / dark mode currently applied. */
  get resolvedTheme(): "light" | "dark" {
    const config = this.config;
    if (config) return config.resolvedMode ?? systemMode();
    const theme = this.theme;
    return theme === "light" || theme === "dark" ? theme : systemMode();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // restore a persisted preference on <html>
    if (!this.config && this.persist && !documentTheme) {
      const cookie = readCookieValue(document.cookie, THEME_COOKIE_NAME);
      if (isThemeMode(cookie)) this.apply(cookie, false);
    }
  }

  protected override onSystemChange(): void {
    if (!this.config && documentTheme === "system") this.apply("system", false);
    super.onSystemChange();
  }

  /** Applies `theme` to the scope (no event). */
  private apply(theme: ThemeMode, persist = this.persist) {
    const config = this.config;
    if (config) {
      config.theme = theme;
      return;
    }
    documentTheme = theme;
    const root = document.documentElement;
    const mode = theme === "system" ? systemMode() : theme;
    root.setAttribute("data-theme", mode);
    root.style.colorScheme = mode;
    if (persist) writeCookie(THEME_COOKIE_NAME, theme);
    this.requestUpdate();
  }

  private select = (theme: ThemeMode) => {
    if (theme === this.theme) return;
    if (!this.emit("minerva-change", { value: theme }, { cancelable: true })) {
      return;
    }
    this.apply(theme);
  };

  protected override render() {
    const t = this.locale.t;
    const theme = this.theme;
    const items: ThemeMode[] = this.hideSystem
      ? ["light", "dark"]
      : ["light", "dark", "system"];
    return this.renderGroup(
      t("themeToggle.label", { theme: this.resolvedTheme }),
      items.map((item) => ({
        value: item,
        text: this.labels?.[item] ?? t(`themeToggle.${item}`),
        active: theme === item,
      })),
      this.select,
    );
  }
}

/**
 * Palette switch (`<PaletteToggle>` of React), orthogonal to the light /
 * dark mode: bound to the `palette` of the closest `<minerva-config>`, or,
 * without one, to `<html data-palette>`. With `persist` the choice is stored
 * in the `palette` cookie.
 *
 * @summary Color palette switch.
 * @tag minerva-palette-toggle
 * @csspart root - The role=group wrapper
 * @csspart item - Every option button (aria-pressed on the selected one)
 * @csspart item--active - Item state of `item`: active
 * @csspart item--inactive - Item state of `item`: inactive
 * @fires minerva-change - The user picked a palette (`detail: { value }`, `null` = default look); cancelable: `preventDefault()` keeps the current palette
 */
export class MinervaPaletteToggle extends ThemeScopeElement {
  static override tagName = "minerva-palette-toggle";

  /** Palettes offered, in order (attribute: space / comma separated) */
  @property({
    converter: {
      fromAttribute: (value: string | null) =>
        (value ?? "").split(/[\s,]+/).filter(Boolean),
      toAttribute: (value: string[]) => value.join(" "),
    },
  })
  palettes: Palette[] = [...PALETTES];

  /** Also offers Minerva's default look (no palette) as the first option */
  @property({ type: Boolean, reflect: true, attribute: "show-default" })
  showDefault = false;

  /** Overrides of the option labels (`default` labels the no-palette option) */
  @property({ attribute: false })
  labels?: Partial<Record<Palette | "default", string>>;

  /** Current palette of the scope (`null` = default look). */
  get palette(): Palette | null {
    const config = this.config;
    const value = config
      ? config.palette
      : document.documentElement.getAttribute("data-palette");
    return isPalette(value) ? value : null;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.config && this.persist) {
      const cookie = readCookieValue(document.cookie, PALETTE_COOKIE_NAME);
      if (isPalette(cookie) && !this.palette) this.apply(cookie, false);
    }
  }

  protected override willUpdate(): void {
    if (DEV) {
      const unknown = (this.palettes ?? []).filter((p) => !isPalette(p));
      if (unknown.length) {
        devWarn(
          MinervaPaletteToggle.tagName,
          `unknown palette(s) ${unknown.join(", ")}: use ${PALETTES.join(", ")}.`,
        );
      }
    }
  }

  private apply(palette: Palette | null, persist = this.persist) {
    const config = this.config;
    if (config) {
      config.palette = palette ?? undefined;
      return;
    }
    const root = document.documentElement;
    if (palette) root.setAttribute("data-palette", palette);
    else root.removeAttribute("data-palette");
    if (persist) writeCookie(PALETTE_COOKIE_NAME, palette);
    this.requestUpdate();
  }

  private select = (palette: Palette | null) => {
    if (palette === this.palette) return;
    if (
      !this.emit("minerva-change", { value: palette }, { cancelable: true })
    ) {
      return;
    }
    this.apply(palette);
  };

  protected override render() {
    const t = this.locale.t;
    const palette = this.palette;
    const items: (Palette | null)[] = this.showDefault
      ? [null, ...this.palettes.filter(isPalette)]
      : this.palettes.filter(isPalette);
    return this.renderGroup(
      t("paletteToggle.label", {
        palette: palette ?? t("paletteToggle.default"),
      }),
      items.map((item) => {
        const key = item ?? "default";
        return {
          value: item,
          text: this.labels?.[key] ?? t(`paletteToggle.${key}`),
          active: palette === item,
        };
      }),
      this.select,
    );
  }
}

/** @internal Test helper: forgets the document theme preference. */
export function resetDocumentTheme(): void {
  documentTheme = null;
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-theme-toggle": MinervaThemeToggle;
    "minerva-palette-toggle": MinervaPaletteToggle;
  }
}
