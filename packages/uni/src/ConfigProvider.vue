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
  miniTokenClassNames,
  resolveTokens,
  githubDark,
  type ComponentTheme,
  type DesignOptions,
  type Palette,
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
  design?: DesignOptions;
  locale: string;
  dir: "ltr" | "rtl";
}
const props = defineProps<{
  mode?: ThemeMode;
  theme?: NativeTheme;
  palette?: Palette | null;
  design?: DesignOptions;
  locale?: string;
  dir?: "ltr" | "rtl";
}>();
const parent = inject<ComputedRef<Configuration> | null>(
  "minerva:config",
  null,
);
const emit = defineEmits(["themeChange"]);
const system = ref<"light" | "dark">("light");
const config = computed<Configuration>(() => ({
  mode: props.mode ?? parent?.value.mode ?? "light",
  theme:
    props.theme ?? (props.mode === undefined ? parent?.value.theme : undefined),
  palette: props.palette === undefined ? parent?.value.palette : props.palette,
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
  const overrides =
    theme === "github-dark"
      ? githubDark
      : typeof theme === "object"
        ? theme
        : undefined;
  return overrides
    ? Object.fromEntries(
        Object.entries(
          resolveTokens({
            mode: resolvedMode.value,
            palette: config.value.palette,
            design: config.value.design,
            overrides,
          }).css,
        ).map(([key, value]) => [`--${key}`, value]),
      )
    : {};
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
