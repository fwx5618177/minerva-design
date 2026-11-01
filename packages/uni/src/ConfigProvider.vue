<script setup lang="ts">
import {
  computed,
  ref,
  provide,
  inject,
  onMounted,
  onBeforeUnmount,
  type ComputedRef,
} from "vue";
import {
  formatDevMessage,
  invalidPrimaryColorMessage,
  miniTokenClassNames,
  PRIMARY_DERIVED_TOKENS,
  resolvePrimaryColor,
  resolveTokens,
  githubDark,
  type ComponentTheme,
  type DesignOptions,
  type Palette,
  type PrimaryColor,
  type PrimaryColorPair,
  type ThemeMode,
} from "@minerva/core";
type NativeTheme =
  | "light"
  | "dark"
  | "github-dark"
  | "auto"
  | "system"
  | Partial<ComponentTheme>;
interface Configuration {
  mode: ThemeMode;
  theme?: NativeTheme;
  palette?: Palette | null;
  /** Brand color of the tree (own valid one, else the parent's) */
  primaryColor: PrimaryColorPair | null;
  /** A provider of the tree wrote brand tokens (nested ones must re-write them) */
  brandScope: boolean;
  design?: DesignOptions;
  locale: string;
  dir: "ltr" | "rtl";
}
const props = withDefaults(
  defineProps<{
    mode?: ThemeMode;
    theme?: NativeTheme;
    palette?: Palette | null;
    /**
     * Brand color: one color (dark value derived) or `{ light, dark }`; wins
     * over the palette's primary (`null`: the theme's own primary)
     */
    primaryColor?: PrimaryColor | null;
    design?: DesignOptions;
    locale?: string;
    dir?: "ltr" | "rtl";
  }>(),
  { primaryColor: undefined },
);
const parent = inject<ComputedRef<Configuration> | null>(
  "minerva:config",
  null,
);
const emit = defineEmits(["themeChange"]);
const system = ref<"light" | "dark">("light");
const BRAND_TOKENS = ["primary-color", ...PRIMARY_DERIVED_TOKENS];
const warnedPrimaryColors = new Set<string>();
/** Own valid brand color, else the parent's (invalid ones warn once) */
const brand = computed<PrimaryColorPair | null>(() => {
  const value = props.primaryColor;
  const own = resolvePrimaryColor(value);
  if (process.env.NODE_ENV !== "production" && own === undefined) {
    const key = JSON.stringify(value);
    if (!warnedPrimaryColors.has(key)) {
      warnedPrimaryColors.add(key);
      console.error(
        formatDevMessage("ConfigProvider", invalidPrimaryColorMessage(value)),
      );
    }
  }
  return (
    (value !== undefined && own !== undefined
      ? own
      : parent?.value.primaryColor) ?? null
  );
});
const config = computed<Configuration>(() => ({
  mode: props.mode ?? parent?.value.mode ?? "light",
  theme:
    props.theme ?? (props.mode === undefined ? parent?.value.theme : undefined),
  palette: props.palette === undefined ? parent?.value.palette : props.palette,
  primaryColor: brand.value,
  brandScope: brand.value !== null || (parent?.value.brandScope ?? false),
  design: props.design?.preset
    ? props.design
    : { ...parent?.value.design, ...props.design },
  locale: props.locale ?? parent?.value.locale ?? "en",
  dir: props.dir ?? parent?.value.dir ?? "ltr",
}));
const resolvedMode = computed(() =>
  config.value.theme === "github-dark" || config.value.theme === "dark"
    ? "dark"
    : config.value.theme === "light"
      ? "light"
      : config.value.mode === "system" ||
          config.value.theme === "auto" ||
          config.value.theme === "system"
        ? system.value
        : config.value.mode,
);
const classes = computed(() =>
  miniTokenClassNames({
    mode: resolvedMode.value,
    palette: config.value.palette,
    design: config.value.design,
  }),
);
const variables = computed(() => {
  const theme = config.value.theme;
  const { primaryColor, brandScope } = config.value;
  const custom =
    theme === "github-dark"
      ? githubDark
      : typeof theme === "object"
        ? theme
        : undefined;
  // the brand color wins over a custom theme's primary tokens
  const overrides =
    custom && primaryColor
      ? (Object.fromEntries(
          Object.entries(custom).filter(([key]) => !BRAND_TOKENS.includes(key)),
        ) as Partial<ComponentTheme>)
      : custom;
  if (!overrides && !brandScope) return {};
  const css = resolveTokens({
    mode: resolvedMode.value,
    palette: config.value.palette,
    primaryColor,
    design: config.value.design,
    overrides,
  }).css;
  // Custom themes: every token inline. Brand color: its tokens (also when
  // only an ancestor has one, to restore / follow this provider's own mode)
  const keys = overrides
    ? Object.keys(css)
    : BRAND_TOKENS.filter((key) => key in css);
  return Object.fromEntries(keys.map((key) => [`--${key}`, css[key]]));
});
function onTheme(event: { theme?: string }) {
  system.value = event.theme === "dark" ? "dark" : "light";
  emit("themeChange", {
    mode: config.value.mode,
    resolvedMode: resolvedMode.value,
    palette: config.value.palette,
  });
}
provide(
  "minerva:config",
  computed(() => ({ ...config.value, mode: resolvedMode.value })),
);
onMounted(() => {
  try {
    system.value = uni.getSystemInfoSync().theme === "dark" ? "dark" : "light";
  } catch {
    /* Older hosts may not expose theme information. */
  }
  uni.onThemeChange?.(onTheme);
});
onBeforeUnmount(() => uni.offThemeChange?.(onTheme));
</script>
<template>
  <view
    :class="classes"
    :style="variables"
    :dir="config.dir"
    class="mn-provider"
    ><slot :mode="resolvedMode" :palette="config.palette"
  /></view>
</template>
