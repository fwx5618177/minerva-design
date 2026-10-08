<script setup lang="ts">
/**
 * ConfigProvider: theme (+ palette), design axes (preset, density, radius,
 * shadow, font scale) and the language of the built-in texts.
 *
 * Root provider (no provider above it) owns the document, on the client:
 * `data-theme` / `color-scheme` / `data-palette` / the design attributes on
 * `<html>` (or the theme tokens as inline CSS variables), the `theme` /
 * `palette` cookies (`persist`) and the global language. Everything it wrote
 * on `<html>` is restored when it unmounts.
 *
 * Nested provider: never touches `<html>`, cookies or the global language and
 * inherits every setting it does not override. Overriding theme, palette or
 * a design axis scopes them to its subtree: a `display: contents` wrapper
 * carries the attributes / tokens, and teleported content (Modal, Popover,
 * Select, Toast...) renders into a matching scope host on `document.body`.
 * Same behaviour as the React `ConfigProvider`.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef,
  watch,
  watchEffect,
  type CSSProperties,
} from "vue";
import {
  designAttributes,
  isPalette,
  presetPalette,
  resolveDesign,
  type Density,
  type DefaultTheme,
  type DesignPreset,
  type FontScale,
  type Palette,
  type RadiusScale,
  type ResolvedDesign,
  type ResolvedThemeMode,
  type ShadowScale,
  type ThemeMap,
  type ThemeMode,
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
  readCookieValue,
  resolveTheme,
  serializeThemeCookie,
} from "@minerva/dom";
import {
  THEME_SCOPE_ATTRIBUTE,
  THEME_SCOPE_KEY,
  useThemeScope,
  type ThemeScope,
} from "../internal/scope";
import {
  CONFIG_KEY,
  useOptionalConfig,
  type ConfigContext,
  type ConfigProviderTheme,
  type Locale,
} from "./context";
import { DEFAULT_LANGUAGE, getLanguage, setLanguage } from "./i18n";

defineOptions({ name: "ConfigProvider" });

const props = withDefaults(
  defineProps<{
    /** Theme of the subtree (`v-model:theme`). Root default: `"auto"` */
    theme?: ConfigProviderTheme;
    /** Color palette (light / dark / system themes only); `null` for none */
    palette?: Palette | null;
    /** Root only: persist theme and palette in cookies. @default false */
    persist?: boolean;
    /** Language of the built-in texts */
    locale?: Locale;
    /** Design preset (brings its palette unless `palette` is set) */
    preset?: DesignPreset;
    density?: Density;
    radius?: RadiusScale;
    shadow?: ShadowScale;
    fontScale?: FontScale;
  }>(),
  {
    theme: undefined,
    palette: undefined,
    persist: false,
    locale: undefined,
    preset: undefined,
    density: undefined,
    radius: undefined,
    shadow: undefined,
    fontScale: undefined,
  },
);

const emit = defineEmits<{
  "update:theme": [theme: ConfigProviderTheme];
  "update:palette": [palette: Palette | null];
  /** The theme changed through `setTheme` (ThemeToggle, useTheme) */
  themeChange: [theme: ConfigProviderTheme];
  /** The palette changed through `setPalette` (PaletteToggle, useTheme) */
  paletteChange: [palette: Palette | null];
}>();

defineSlots<{ default?: () => unknown }>();

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const DESIGN_ATTRIBUTE_NAMES = [
  "data-density",
  "data-radius",
  "data-shadow",
  "data-font-scale",
];

const themeModeOf = (theme: ConfigProviderTheme): ThemeMode | undefined => {
  if (theme === "light" || theme === "dark") return theme;
  if (theme === "auto" || theme === "system" || isBilingualTheme(theme)) {
    return "system";
  }
  return undefined;
};
const supportsPalette = (theme: ConfigProviderTheme) =>
  theme === "light" ||
  theme === "dark" ||
  theme === "auto" ||
  theme === "system";
const setAttribute = (
  element: HTMLElement,
  name: string,
  value: string | null | undefined,
) => {
  if (value === null || value === undefined) element.removeAttribute(name);
  else element.setAttribute(name, value);
};
const writeCookie = (name: string, value: string | null) => {
  if (typeof document === "undefined") return;
  document.cookie =
    value === null
      ? `${name}=; path=/; max-age=0; SameSite=Lax`
      : serializeThemeCookie(name, value);
};

const parentScope = useThemeScope();
const parent = useOptionalConfig();
const isRoot = parentScope === null;

const paletteInput = computed<Palette | null | undefined>(() =>
  props.palette !== undefined
    ? props.palette
    : props.preset !== undefined
      ? presetPalette(props.preset)
      : undefined,
);
const ownsTheme = computed(() => isRoot || props.theme !== undefined);
const ownsPalette = computed(() => isRoot || paletteInput.value !== undefined);
const ownsDesign = computed(
  () =>
    isRoot ||
    props.preset !== undefined ||
    props.density !== undefined ||
    props.radius !== undefined ||
    props.shadow !== undefined ||
    props.fontScale !== undefined,
);
const scoped = computed(
  () => !isRoot && (ownsTheme.value || ownsPalette.value || ownsDesign.value),
);

const design = computed<ResolvedDesign>(() =>
  resolveDesign(
    {
      preset: props.preset,
      density: props.density,
      radius: props.radius,
      shadow: props.shadow,
      fontScale: props.fontScale,
    },
    isRoot ? undefined : parent?.design,
  ),
);

// Own state, following new props
const themeState = ref<ConfigProviderTheme>(props.theme ?? "auto");
const paletteState = ref<Palette | null>(paletteInput.value ?? null);
watch(
  () => props.theme,
  (next) => {
    themeState.value = next ?? "auto";
  },
);
watch(paletteInput, (next) => {
  paletteState.value = next ?? null;
});

const theme = computed<ConfigProviderTheme>(() =>
  ownsTheme.value ? themeState.value : (parent?.theme ?? "auto"),
);
const palette = computed<Palette | null>(() =>
  ownsPalette.value ? paletteState.value : (parent?.palette ?? null),
);

// OS color scheme (light on the server and during hydration)
const systemTheme = shallowRef<DefaultTheme>("light");
const followsSystem = computed(() => themeModeOf(theme.value) === "system");
onMounted(() => {
  watchEffect((onCleanup) => {
    if (!followsSystem.value || !window.matchMedia) return;
    systemTheme.value = getSystemTheme();
    const query = window.matchMedia(DARK_SCHEME_QUERY);
    const onChange = () => {
      systemTheme.value = getSystemTheme();
    };
    query.addEventListener("change", onChange);
    onCleanup(() => query.removeEventListener("change", onChange));
  });
});

const resolvedMode = computed<ResolvedThemeMode | undefined>(() => {
  if (theme.value === "github-dark") return "dark";
  const mode = themeModeOf(theme.value);
  return mode === "system" ? systemTheme.value : mode;
});
const activePalette = computed(() =>
  palette.value && supportsPalette(theme.value) ? palette.value : null,
);

// Root: restore cookies once mounted (never during SSR / hydration)
onMounted(() => {
  if (!isRoot || !props.persist) return;
  const rootMode = themeModeOf(props.theme ?? "auto");
  const storedTheme = readCookieValue(document.cookie, THEME_COOKIE_NAME);
  const storedPalette = readCookieValue(document.cookie, PALETTE_COOKIE_NAME);
  if (storedTheme !== undefined && rootMode !== undefined) {
    const mode = parseThemeCookie(storedTheme, rootMode);
    themeState.value =
      mode === "system" && rootMode === "system"
        ? (props.theme ?? "auto")
        : mode;
  }
  if (storedPalette !== undefined) {
    paletteState.value = parsePaletteCookie(
      storedPalette,
      paletteInput.value ?? null,
    );
  }
});

// Root: own <html> while mounted, restore it on unmount
if (isRoot) {
  let restore: (() => void) | undefined;
  onMounted(() => {
    const root = document.documentElement;
    const initialTheme = root.getAttribute("data-theme");
    const initialPalette = root.getAttribute("data-palette");
    const initialScheme = root.style.getPropertyValue("color-scheme");
    const initialDesign = DESIGN_ATTRIBUTE_NAMES.map(
      (name) => [name, root.getAttribute(name)] as const,
    );
    const initialLanguage = getLanguage();
    restore = () => {
      setAttribute(root, "data-theme", initialTheme);
      setAttribute(root, "data-palette", initialPalette);
      for (const [name, value] of initialDesign) {
        setAttribute(root, name, value);
      }
      if (initialScheme) root.style.setProperty("color-scheme", initialScheme);
      else root.style.removeProperty("color-scheme");
      generateCSSVariables(root.style, {} as ThemeMap);
      if (!root.getAttribute("style")) root.removeAttribute("style");
      setLanguage(initialLanguage);
    };
    watchEffect(() => {
      if (resolvedMode.value) {
        root.dataset.theme = resolvedMode.value;
        root.style.colorScheme = resolvedMode.value;
      } else {
        delete root.dataset.theme;
        root.style.removeProperty("color-scheme");
      }
      if (activePalette.value) {
        root.dataset.palette = activePalette.value;
        generateCSSVariables(root.style, {} as ThemeMap);
      } else {
        delete root.dataset.palette;
        generateCSSVariables(
          root.style,
          resolveTheme(theme.value, systemTheme.value),
        );
      }
    });
    watchEffect(() => applyDesignAttributes(root, design.value));
    watchEffect(() => setLanguage(props.locale?.language ?? DEFAULT_LANGUAGE));
  });
  onBeforeUnmount(() => restore?.());
}

// Language: the closest provider setting one (the root one included, so SSR
// renders the right texts)
const language = computed(
  () =>
    props.locale?.language ??
    (isRoot ? undefined : parent?.locale.language) ??
    DEFAULT_LANGUAGE,
);
const scopeLanguage = computed(
  () => props.locale?.language ?? parentScope?.value.language,
);

// Scoped provider: portal host on document.body with the same scope
const portalHost = shallowRef<HTMLElement | null>(null);
onMounted(() => {
  watchEffect((onCleanup) => {
    if (!scoped.value) return;
    const host = document.createElement("div");
    host.setAttribute("data-minerva-portal-host", "");
    host.setAttribute(THEME_SCOPE_ATTRIBUTE, "");
    host.style.display = "contents";
    document.body.appendChild(host);
    portalHost.value = host;
    onCleanup(() => {
      host.remove();
      portalHost.value = null;
    });
  });
  watchEffect(() => {
    const host = portalHost.value;
    if (!host) return;
    setAttribute(host, "data-theme", resolvedMode.value);
    setAttribute(host, "data-palette", activePalette.value);
    applyDesignAttributes(host, design.value, { all: true });
    if (resolvedMode.value)
      host.style.setProperty("color-scheme", resolvedMode.value);
    else host.style.removeProperty("color-scheme");
    generateCSSVariables(
      host.style,
      activePalette.value
        ? ({} as ThemeMap)
        : resolveTheme(theme.value, systemTheme.value),
    );
  });
});

const setTheme = (next: ConfigProviderTheme) => {
  if (!ownsTheme.value) {
    parent?.setTheme(next);
    return;
  }
  themeState.value = next;
  const mode = themeModeOf(next);
  if (isRoot && props.persist && mode && typeof next === "string") {
    writeCookie(THEME_COOKIE_NAME, mode);
  }
  emit("update:theme", next);
  emit("themeChange", next);
};
const setPalette = (next: Palette | null) => {
  if (!ownsPalette.value) {
    parent?.setPalette(next);
    return;
  }
  const value = isPalette(next) ? next : null;
  paletteState.value = value;
  if (isRoot && props.persist) writeCookie(PALETTE_COOKIE_NAME, value);
  emit("update:palette", value);
  emit("paletteChange", value);
};

const context = reactive({
  theme,
  resolvedTheme: computed(() =>
    theme.value === "auto" || theme.value === "system"
      ? systemTheme.value
      : typeof theme.value === "string"
        ? theme.value
        : resolveTheme(theme.value, systemTheme.value),
  ),
  locale: computed<Locale>(() => ({ language: language.value })),
  mode: computed(() => themeModeOf(theme.value)),
  resolvedMode,
  palette,
  design,
  setTheme,
  setPalette,
}) as ConfigContext;
provide(CONFIG_KEY, context);

const scope = computed<ThemeScope>(() => ({
  scoped: scoped.value || (parentScope?.value.scoped ?? false),
  portalContainer: scoped.value
    ? portalHost.value
    : (parentScope?.value.portalContainer ?? null),
  language: scopeLanguage.value,
}));
provide(THEME_SCOPE_KEY, scope);

const scopeAttributes = computed(() =>
  scoped.value
    ? {
        [THEME_SCOPE_ATTRIBUTE]: "",
        "data-theme": resolvedMode.value,
        "data-palette": activePalette.value ?? undefined,
        ...designAttributes(design.value, { all: true }),
      }
    : {},
);
const scopeStyle = computed<CSSProperties>(() => {
  const style: Record<string, string> = { display: "contents" };
  if (resolvedMode.value) style.colorScheme = resolvedMode.value;
  if (!activePalette.value) {
    const tokens = resolveTheme(theme.value, systemTheme.value) as Record<
      string,
      unknown
    >;
    for (const [key, value] of Object.entries(tokens)) {
      if (value !== undefined && value !== null && value !== "") {
        style[`--${key}`] = String(value);
      }
    }
  }
  return style as CSSProperties;
});
</script>

<template>
  <div v-if="scoped" v-bind="scopeAttributes" :style="scopeStyle">
    <slot />
  </div>
  <slot v-else />
</template>
