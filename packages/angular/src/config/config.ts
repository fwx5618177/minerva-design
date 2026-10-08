import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  makeEnvironmentProviders,
  output,
  provideEnvironmentInitializer,
  type EnvironmentProviders,
} from "@angular/core";
import type {
  Density,
  DesignPreset,
  FontScale,
  Palette,
  RadiusScale,
  ShadowScale,
  SupportedLanguage,
} from "@minerva/core";
import {
  MN_SCOPE,
  MinervaScope,
  injectScope,
  staticInputs,
  type ConfigTheme,
  type Locale,
  type MinervaConfig,
} from "./scope";

/**
 * Configures Minerva for the application (root configuration): theme,
 * palette, design axes and the language of the built-in texts.
 *
 * In the browser the root applies `data-theme`, `data-palette`, the theme
 * tokens and the design attributes to `<html>` (restored when the
 * application is destroyed) and, with `persist`, restores / writes the
 * `theme` / `palette` cookies. On the server it changes nothing (pair it with
 * `THEME_INIT_SCRIPT` from `minerva-design/core` to avoid a flash).
 *
 * @example
 * bootstrapApplication(App, {
 *   providers: [provideMinerva({ theme: "system", locale: "zh" })],
 * });
 */
export function provideMinerva(
  config: MinervaConfig = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: MN_SCOPE,
      useFactory: () => new MinervaScope(null, staticInputs(config)),
    },
    provideEnvironmentInitializer(() => {
      inject(MN_SCOPE);
    }),
  ]);
}

/**
 * The configuration of the current injector (closest `<mn-config>`, else the
 * root): theme, palette, design and language signals, plus `setTheme()` /
 * `setPalette()` (call in an injection context).
 */
export const injectMinerva = (): MinervaScope => injectScope();

/**
 * Nested configuration scope (React's nested `ConfigProvider`): settings it
 * does not set follow the parent. Overriding `theme`, `palette` or a design
 * axis applies it to its content only (the host element carries
 * `data-theme` / `data-palette` / the design attributes / the tokens, with
 * `display: contents`) and to a matching portal container for overlays; an
 * overridden `locale` applies to the components inside.
 *
 * Without `provideMinerva()`, the outermost `<mn-config>` is the root: it
 * owns the document like `provideMinerva()`.
 */
@Component({
  selector: "mn-config",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MN_SCOPE,
      useFactory: (config: MnConfig) => config.scope,
      deps: [forwardRef(() => MnConfig)],
    },
  ],
  host: {
    style: "display: contents",
    "[attr.data-minerva-theme-scope]": 'scope.scoped() ? "" : null',
    "[attr.data-theme]":
      "scope.scoped() ? (scope.resolvedMode() ?? null) : null",
    "[attr.data-palette]": "scope.scoped() ? scope.activePalette() : null",
    "[attr.data-density]": "design()?.['data-density'] ?? null",
    "[attr.data-radius]": "design()?.['data-radius'] ?? null",
    "[attr.data-shadow]": "design()?.['data-shadow'] ?? null",
    "[attr.data-font-scale]": "design()?.['data-font-scale'] ?? null",
    "[style.color-scheme]":
      "scope.scoped() ? (scope.resolvedMode() ?? null) : null",
    "[style]": "scope.scopeVariables()",
  },
  template: `<ng-content />`,
})
export class MnConfig {
  /** Theme of the scope (inherits the parent's when unset) */
  readonly theme = input<ConfigTheme | undefined>(undefined);
  /** Palette of the scope (`null`: Minerva's default look) */
  readonly palette = input<Palette | null | undefined>(undefined);
  /** Persist theme / palette changes in cookies (root only) */
  readonly persist = input<boolean | undefined>(undefined);
  /** Language of the built-in texts (`"zh"` or `{ language: "zh" }`) */
  readonly locale = input<Locale | SupportedLanguage | undefined>(undefined);
  /** Design preset */
  readonly preset = input<DesignPreset | undefined>(undefined);
  /** Spacing density */
  readonly density = input<Density | undefined>(undefined);
  /** Corner radius scale */
  readonly radius = input<RadiusScale | undefined>(undefined);
  /** Elevation shadows */
  readonly shadow = input<ShadowScale | undefined>(undefined);
  /** Type scale */
  readonly fontScale = input<FontScale | undefined>(undefined);

  /** The theme changed through `setTheme()` (e.g. a theme toggle) */
  readonly themeChange = output<ConfigTheme>();
  /** The palette changed through `setPalette()` */
  readonly paletteChange = output<Palette | null>();

  /** The scope provided to the content */
  readonly scope = new MinervaScope(
    inject(MN_SCOPE, { skipSelf: true }),
    {
      theme: this.theme,
      palette: this.palette,
      persist: this.persist,
      locale: this.locale,
      preset: this.preset,
      density: this.density,
      radius: this.radius,
      shadow: this.shadow,
      fontScale: this.fontScale,
    },
    false,
    {
      themeChange: (theme) => this.themeChange.emit(theme),
      paletteChange: (palette) => this.paletteChange.emit(palette),
    },
  );

  protected readonly design = computed(() =>
    this.scope.scopeDesignAttributes(),
  );
}
