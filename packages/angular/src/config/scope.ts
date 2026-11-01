import { DOCUMENT } from "@angular/common";
import {
  DestroyRef,
  Injectable,
  InjectionToken,
  computed,
  effect,
  inject,
  isDevMode,
  linkedSignal,
  signal,
  untracked,
  type Signal,
} from "@angular/core";
import {
  DEFAULT_LANGUAGE,
  designAttributes,
  formatDevMessage,
  invalidPrimaryColorMessage,
  isPalette,
  isSupportedLanguage,
  palettes,
  presetPalette,
  resolveDesign,
  resolvePrimaryColor,
  translate,
  messages,
  type ComponentTheme,
  type CustomBilingualTheme,
  type DefaultTheme,
  type Density,
  type DesignPreset,
  type FontScale,
  type Palette,
  type PrimaryColor,
  type PrimaryColorPair,
  type RadiusScale,
  type ResolvedDesign,
  type ResolvedThemeMode,
  type ShadowScale,
  type SupportTheme,
  type SupportedLanguage,
  type ThemeMap,
  type ThemeMode,
  type ThemeName,
  type TranslateOptions,
} from "@minerva/core";
import {
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_NAME,
  applyDesignAttributes,
  generateCSSVariables,
  getSystemTheme,
  isBilingualTheme,
  parsePaletteCookie,
  parseThemeCookie,
  primaryColorCss,
  primaryColorTheme,
  readCookieValue,
  resolveTheme,
  serializeThemeCookie,
} from "@minerva/dom";
import { injectIsBrowser } from "../internal/platform";

/**
 * Accepted `theme` values: "auto" / "system" (follow
 * `prefers-color-scheme`), a built-in theme name, a theme object, or a
 * `{ light, dark }` pair (same union as React's `ConfigProvider`).
 */
export type ConfigTheme =
  | "auto"
  | "system"
  | CustomBilingualTheme
  | SupportTheme
  | ThemeMap
  | DefaultTheme;

/** Locale of the built-in texts */
export interface Locale {
  /** @default "en" */
  language?: SupportedLanguage;
}

/** Options of `provideMinerva()` and the inputs of `<mn-config>` */
export interface MinervaConfig {
  /**
   * Theme to apply ("auto" follows `prefers-color-scheme`). The root
   * configuration applies it to `<html>`; a nested `<mn-config>` inherits its
   * parent's theme unless set, and scopes an override to its subtree.
   * @default "auto"
   */
  theme?: ConfigTheme;
  /**
   * Palette applied with the light / dark / system themes; `null` keeps
   * Minerva's default look.
   * @default null
   */
  palette?: Palette | null;
  /**
   * Brand color: a CSS color for both modes (the dark-mode value is derived
   * for contrast on dark surfaces) or a `{ light, dark }` pair. Recomputes
   * every token derived from `primary-color` and wins over the palette's
   * primary color; the theme mode stays explicit. A nested `<mn-config>`
   * inherits it unless set and scopes an override to its subtree; `null`
   * restores the theme's own. Invalid colors are ignored with a development
   * warning.
   * @default undefined
   */
  primaryColor?: PrimaryColor | null;
  /**
   * Persist theme / palette changes in the `theme` / `palette` cookies and
   * restore them after hydration (root only).
   * @default false
   */
  persist?: boolean;
  /**
   * Language of the built-in texts (`"zh"` or `{ language: "zh" }`).
   * @default "en"
   */
  locale?: Locale | SupportedLanguage;
  /** Design preset ("minerva", "editorial", "compact", "touch") */
  preset?: DesignPreset;
  /** Spacing density (`data-density`) */
  density?: Density;
  /** Corner radius scale (`data-radius`) */
  radius?: RadiusScale;
  /** Elevation shadows (`data-shadow`) */
  shadow?: ShadowScale;
  /** Type scale (`data-font-scale`) */
  fontScale?: FontScale;
}

/** Reactive sources of a scope's own settings (`undefined`: inherit) */
export type ScopeInputs = {
  [K in keyof MinervaConfig]-?: () => MinervaConfig[K] | undefined;
};

/** Called after `setTheme()` / `setPalette()` changed the scope */
export interface ScopeCallbacks {
  themeChange?: (theme: ConfigTheme) => void;
  paletteChange?: (palette: Palette | null) => void;
}

/** Constant inputs from a static configuration (`provideMinerva()`) */
export const staticInputs = (config: MinervaConfig = {}): ScopeInputs => ({
  theme: () => config.theme,
  palette: () => config.palette,
  primaryColor: () => config.primaryColor,
  persist: () => config.persist,
  locale: () => config.locale,
  preset: () => config.preset,
  density: () => config.density,
  radius: () => config.radius,
  shadow: () => config.shadow,
  fontScale: () => config.fontScale,
});

const languageOf = (locale: Locale | SupportedLanguage | undefined) =>
  typeof locale === "string" ? locale : locale?.language;

/** "light" / "dark" / "system" for mode-like themes, undefined otherwise */
export const themeModeOf = (theme: ConfigTheme): ThemeMode | undefined => {
  if (theme === "light" || theme === "dark") return theme;
  if (theme === "auto" || theme === "system" || isBilingualTheme(theme))
    return "system";
  return undefined;
};

const supportsPalette = (theme: ConfigTheme) =>
  theme === "light" ||
  theme === "dark" ||
  theme === "auto" ||
  theme === "system";

const warnedPrimaryColors = new Set<string>();
/** Development warning (once per value) for an invalid `primaryColor` */
const warnInvalidPrimaryColor = (value: unknown) => {
  if (!isDevMode()) return;
  const key = JSON.stringify(value);
  if (warnedPrimaryColors.has(key)) return;
  warnedPrimaryColors.add(key);
  console.error(
    formatDevMessage("mn-config", invalidPrimaryColorMessage(value)),
  );
};

/** Attribute of the root brand color style sheet (in `<head>`) */
const BRAND_STYLE_ATTRIBUTE = "data-minerva-primary-color";

/** The user's color scheme (`prefers-color-scheme`), "light" on the server */
@Injectable({ providedIn: "root" })
export class MnSystemTheme {
  private readonly state = signal<DefaultTheme>("light");
  readonly value: Signal<DefaultTheme> = this.state.asReadonly();

  constructor() {
    if (!injectIsBrowser() || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => this.state.set(getSystemTheme());
    update();
    query.addEventListener("change", update);
    inject(DestroyRef).onDestroy(() =>
      query.removeEventListener("change", update),
    );
  }
}

/** Attribute marking a theme scope element (host or portal container) */
export const THEME_SCOPE_ATTRIBUTE = "data-minerva-theme-scope";

/**
 * One level of configuration: the root (`provideMinerva()` or the outermost
 * `<mn-config>`), a nested `<mn-config>`, or the passive default used when
 * the application configured nothing (it never touches the document).
 *
 * Mirrors React's `ConfigProvider`: settings that are not set follow the
 * parent; a nested scope that overrides the theme, palette or a design axis
 * applies it to its subtree (its host element) and to a portal container on
 * `document.body` for overlays.
 */
export class MinervaScope {
  readonly isRoot: boolean;
  private readonly isBrowser = injectIsBrowser();
  private readonly document = inject(DOCUMENT);
  private readonly systemTheme = inject(MnSystemTheme).value;

  private readonly themeInput: Signal<ConfigTheme | undefined>;
  private readonly paletteInput: Signal<Palette | null | undefined>;
  private readonly themeState;
  private readonly paletteState;
  private readonly hasDesign: Signal<boolean>;

  /** Theme as configured (may be "auto" or a light / dark pair) */
  readonly theme: Signal<ConfigTheme>;
  /** Active palette, `null` for Minerva's default look */
  readonly palette: Signal<Palette | null>;
  /** Applied design axes */
  readonly design: Signal<ResolvedDesign>;
  /** Language of the built-in texts */
  readonly language: Signal<SupportedLanguage>;
  /** "light" / "dark" / "system" for mode-like themes */
  readonly mode: Signal<ThemeMode | undefined>;
  /** Applied light / dark mode, when it can be determined */
  readonly resolvedMode: Signal<ResolvedThemeMode | undefined>;
  /** Theme currently applied (after resolving "auto" / pairs) */
  readonly resolvedTheme: Signal<ThemeName | ComponentTheme | ThemeMap>;
  /** Palette actually applied (palettes only apply to light / dark / system) */
  readonly activePalette: Signal<Palette | null>;
  /** Brand color of the scope (own or inherited), `null`: the theme's own */
  readonly primaryColor: Signal<PrimaryColorPair | null>;
  /** Inline tokens: the theme's (none with a palette) and the brand color's */
  private readonly inlineTheme: Signal<ThemeMap>;
  /** This scope overrides the theme, palette or design of its subtree */
  readonly scoped: Signal<boolean>;
  /** Theme tokens of a scoped subtree (inline CSS variables) */
  readonly scopeVariables: Signal<Record<string, string> | null>;
  /** Design attributes of a scoped subtree (every axis) */
  readonly scopeDesignAttributes: Signal<Record<string, string> | null>;
  /** Element overlays are rendered into (`null`: `document.body`) */
  readonly portalContainer: Signal<HTMLElement | null>;
  private readonly ownPortal = signal<HTMLElement | null>(null);

  constructor(
    readonly parent: MinervaScope | null,
    private readonly inputs: ScopeInputs,
    /** The default scope of an unconfigured application: no document effects */
    readonly passive = false,
    private readonly callbacks: ScopeCallbacks = {},
    /** Embedded island: configuration and portals belong to the subtree. */
    embedded = false,
  ) {
    this.isRoot = !embedded && (!parent || parent.passive);
    const isRoot = this.isRoot;

    this.themeInput = computed(() => inputs.theme());
    this.paletteInput = computed(() => {
      const palette = inputs.palette();
      if (palette !== undefined) return palette;
      const preset = inputs.preset();
      return preset !== undefined ? presetPalette(preset) : undefined;
    });
    this.themeState = linkedSignal<ConfigTheme>(
      () => this.themeInput() ?? "auto",
    );
    this.paletteState = linkedSignal<Palette | null>(
      () => this.paletteInput() ?? null,
    );
    const ownsTheme = () => isRoot || this.themeInput() !== undefined;
    const ownsPalette = () => isRoot || this.paletteInput() !== undefined;
    this.hasDesign = computed(
      () =>
        inputs.preset() !== undefined ||
        inputs.density() !== undefined ||
        inputs.radius() !== undefined ||
        inputs.shadow() !== undefined ||
        inputs.fontScale() !== undefined,
    );

    this.theme = computed(() =>
      ownsTheme() ? this.themeState() : (parent?.theme() ?? "auto"),
    );
    this.palette = computed(() =>
      ownsPalette() ? this.paletteState() : (parent?.palette() ?? null),
    );
    this.design = computed(() =>
      resolveDesign(
        {
          preset: inputs.preset(),
          density: inputs.density(),
          radius: inputs.radius(),
          shadow: inputs.shadow(),
          fontScale: inputs.fontScale(),
        },
        isRoot ? undefined : parent?.design(),
      ),
    );
    this.language = computed(() => {
      const own = languageOf(inputs.locale());
      const language = own ?? (isRoot ? undefined : parent?.language());
      return language && isSupportedLanguage(language)
        ? language
        : DEFAULT_LANGUAGE;
    });
    this.mode = computed(() => themeModeOf(this.theme()));
    this.resolvedMode = computed(() => {
      const theme = this.theme();
      if (theme === "github-dark") return "dark";
      const mode = themeModeOf(theme);
      return mode === "system" ? this.systemTheme() : mode;
    });
    this.resolvedTheme = computed(() => {
      const theme = this.theme();
      if (theme === "auto" || theme === "system") return this.systemTheme();
      return typeof theme === "string"
        ? theme
        : resolveTheme(theme, this.systemTheme());
    });
    this.activePalette = computed(() => {
      const palette = this.palette();
      return palette && supportsPalette(this.theme()) ? palette : null;
    });
    // Brand color: an invalid one is ignored (inherited, like an unset one)
    const ownBrand = computed(() => {
      const value = inputs.primaryColor();
      const pair = resolvePrimaryColor(value);
      if (pair === undefined) warnInvalidPrimaryColor(value);
      return pair;
    });
    const ownsBrand = () =>
      isRoot ||
      (inputs.primaryColor() !== undefined && ownBrand() !== undefined);
    this.primaryColor = computed(
      () =>
        ownsBrand() ? (ownBrand() ?? null) : (parent?.primaryColor() ?? null),
      {
        equal: (a, b) => a?.light === b?.light && a?.dark === b?.dark,
      },
    );
    this.inlineTheme = computed(() => {
      const palette = this.activePalette();
      const base = palette
        ? undefined
        : resolveTheme(this.theme(), this.systemTheme());
      const brand = this.primaryColor();
      if (!brand) return base ?? ({} as ThemeMap);
      const mode = this.resolvedMode() ?? "light";
      return {
        ...base,
        ...primaryColorTheme(
          brand,
          mode,
          palette ? palettes[palette][mode] : base,
        ),
      } as ThemeMap;
    });
    this.scoped = computed(
      () =>
        !isRoot &&
        (this.themeInput() !== undefined ||
          this.paletteInput() !== undefined ||
          (inputs.primaryColor() !== undefined && ownBrand() !== undefined) ||
          this.hasDesign()),
    );
    this.scopeVariables = computed(() => {
      if (!this.scoped()) return null;
      const entries = Object.entries(this.inlineTheme())
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(([key, value]) => [`--${key}`, String(value)]);
      return entries.length ? Object.fromEntries(entries) : null;
    });
    this.scopeDesignAttributes = computed(() =>
      this.scoped() ? designAttributes(this.design(), { all: true }) : null,
    );
    this.portalContainer = computed(() =>
      this.scoped() ? this.ownPortal() : (parent?.portalContainer() ?? null),
    );

    if (passive) return;
    // Root brand color style sheet: also on the server (no flash)
    if (isRoot) this.manageBrandStyle();
    if (!this.isBrowser) return;
    if (isRoot) this.applyToDocument();
    else this.managePortalHost();
  }

  /** Whether overlays must wait for a scoped portal host (not created yet) */
  readonly waitsForPortal = (): boolean =>
    this.inScopedTree() && this.portalContainer() === null;

  private inScopedTree(): boolean {
    return this.scoped() || (this.parent?.inScopedTree() ?? false);
  }

  /** Translates a key of the built-in texts in this scope's language */
  t(key: string, options?: TranslateOptions): string {
    return translate(
      {
        messages,
        language: this.language(),
        fallbackLanguage: DEFAULT_LANGUAGE,
      },
      key,
      options,
    );
  }

  /** Changes the theme of the scope that owns it (cookie when persisted) */
  setTheme(next: ConfigTheme): void {
    if (!this.isRoot && this.themeInput() === undefined && this.parent) {
      this.parent.setTheme(next);
      return;
    }
    this.themeState.set(next);
    this.callbacks.themeChange?.(next);
    const mode = themeModeOf(next);
    if (
      this.isRoot &&
      this.inputs.persist() &&
      mode &&
      typeof next === "string"
    )
      this.writeCookie(THEME_COOKIE_NAME, mode);
  }

  /** Changes the palette of the scope that owns it (cookie when persisted) */
  setPalette(next: Palette | null): void {
    if (!this.isRoot && this.paletteInput() === undefined && this.parent) {
      this.parent.setPalette(next);
      return;
    }
    const value = isPalette(next) ? next : null;
    this.paletteState.set(value);
    this.callbacks.paletteChange?.(value);
    if (this.isRoot && this.inputs.persist())
      this.writeCookie(PALETTE_COOKIE_NAME, value);
  }

  private writeCookie(name: string, value: string | null) {
    if (!this.isBrowser) return;
    this.document.cookie =
      value === null
        ? `${name}=; path=/; max-age=0; SameSite=Lax`
        : serializeThemeCookie(name, value);
  }

  /** Root: `data-theme`, palette, tokens and design attributes on `<html>` */
  private applyToDocument() {
    const root = this.document.documentElement;
    const initial = {
      theme: root.getAttribute("data-theme"),
      palette: root.getAttribute("data-palette"),
      scheme: root.style.getPropertyValue("color-scheme"),
      design: [
        "data-density",
        "data-radius",
        "data-shadow",
        "data-font-scale",
      ].map((name) => [name, root.getAttribute(name)] as const),
    };
    // Cookies are restored once, after hydration (the server cannot see them)
    if (this.inputs.persist()) {
      const cookies = this.document.cookie;
      const storedTheme = readCookieValue(cookies, THEME_COOKIE_NAME);
      const storedPalette = readCookieValue(cookies, PALETTE_COOKIE_NAME);
      const configured = this.themeInput() ?? "auto";
      const configuredMode = themeModeOf(configured);
      if (storedTheme !== undefined && configuredMode !== undefined) {
        const mode = parseThemeCookie(storedTheme, configuredMode);
        this.themeState.set(
          mode === "system" && configuredMode === "system" ? configured : mode,
        );
      }
      if (storedPalette !== undefined)
        this.paletteState.set(
          parsePaletteCookie(storedPalette, this.paletteInput() ?? null),
        );
    }
    effect(() => {
      const mode = this.resolvedMode();
      const palette = this.activePalette();
      const inlineTheme = this.inlineTheme();
      const design = this.design();
      untracked(() => {
        if (mode) {
          root.setAttribute("data-theme", mode);
          root.style.setProperty("color-scheme", mode);
        } else {
          root.removeAttribute("data-theme");
          root.style.removeProperty("color-scheme");
        }
        if (palette) root.setAttribute("data-palette", palette);
        else root.removeAttribute("data-palette");
        generateCSSVariables(root.style, inlineTheme);
        applyDesignAttributes(root, design);
      });
    });
    inject(DestroyRef).onDestroy(() => {
      const set = (name: string, value: string | null) =>
        value === null
          ? root.removeAttribute(name)
          : root.setAttribute(name, value);
      set("data-theme", initial.theme);
      set("data-palette", initial.palette);
      for (const [name, value] of initial.design) set(name, value);
      if (initial.scheme)
        root.style.setProperty("color-scheme", initial.scheme);
      else root.style.removeProperty("color-scheme");
      generateCSSVariables(root.style, {} as ThemeMap);
      if (!root.getAttribute("style")) root.removeAttribute("style");
    });
  }

  /** Scoped: a portal container on `document.body` carrying the scope */
  private managePortalHost() {
    let host: HTMLElement | null = null;
    effect(() => {
      const scoped = this.scoped();
      untracked(() => {
        if (scoped && !host) {
          host = this.document.createElement("div");
          host.setAttribute("data-minerva-portal-host", "");
          host.setAttribute(THEME_SCOPE_ATTRIBUTE, "");
          host.style.display = "contents";
          this.document.body.appendChild(host);
          this.ownPortal.set(host);
        } else if (!scoped && host) {
          host.remove();
          host = null;
          this.ownPortal.set(null);
        }
      });
    });
    effect(() => {
      const el = this.ownPortal();
      if (!el) return;
      const mode = this.resolvedMode();
      const palette = this.activePalette();
      const inlineTheme = this.inlineTheme();
      const design = this.design();
      untracked(() => {
        if (mode) el.setAttribute("data-theme", mode);
        else el.removeAttribute("data-theme");
        if (palette) el.setAttribute("data-palette", palette);
        else el.removeAttribute("data-palette");
        applyDesignAttributes(el, design, { all: true });
        if (mode) el.style.setProperty("color-scheme", mode);
        else el.style.removeProperty("color-scheme");
        generateCSSVariables(el.style, inlineTheme);
      });
    });
    inject(DestroyRef).onDestroy(() => host?.remove());
  }

  /**
   * Root: the brand color of both modes as a `<style>` in `<head>` keyed on
   * `data-theme`, so server-rendered pages have it before hydration (the
   * client reuses the server's element). Colors are normalized: safe CSS.
   */
  private manageBrandStyle() {
    const doc = this.document;
    let style: HTMLStyleElement | null = null;
    effect(() => {
      const brand = this.primaryColor();
      const palette = this.activePalette();
      const theme = this.theme();
      untracked(() => {
        if (!brand) {
          style?.remove();
          style = null;
          return;
        }
        const baseOf = (mode: ResolvedThemeMode) =>
          palette ? palettes[palette][mode] : resolveTheme(theme, mode);
        style ??=
          doc.head.querySelector<HTMLStyleElement>(
            `style[${BRAND_STYLE_ATTRIBUTE}]`,
          ) ?? doc.head.appendChild(doc.createElement("style"));
        style.setAttribute(BRAND_STYLE_ATTRIBUTE, "");
        style.textContent = primaryColorCss(brand, {
          base: { light: baseOf("light"), dark: baseOf("dark") },
        });
      });
    });
    inject(DestroyRef).onDestroy(() => style?.remove());
  }
}

/**
 * The configuration scope of the current injector: the closest
 * `<mn-config>`, else the application's `provideMinerva()` root, else a
 * passive default (English, "auto" theme, no document changes).
 */
export const MN_SCOPE = new InjectionToken<MinervaScope>("MN_SCOPE", {
  providedIn: "root",
  factory: () => new MinervaScope(null, staticInputs(), true),
});

/** The configuration scope (call in an injection context) */
export const injectScope = (): MinervaScope => inject(MN_SCOPE);
