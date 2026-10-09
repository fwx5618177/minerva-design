<script setup lang="ts">
/**
 * ThemeProvider: a `ConfigProvider` preset for light / dark / system modes
 * with persistence (cookies) on by default, like the React `ThemeProvider`.
 * The root one defaults to the system mode; nested ones inherit what they do
 * not set.
 */
import type { Palette, ThemeMode } from "@minerva/core";
import ConfigProvider from "./ConfigProvider.vue";
import { useThemeScope } from "../internal/scope";
import type { ConfigProviderTheme, Locale } from "./context";

defineOptions({ name: "ThemeProvider" });

withDefaults(
  defineProps<{
    /** Initial mode (root default: "system") */
    defaultTheme?: ThemeMode;
    /** Initial palette */
    defaultPalette?: Palette | null;
    /** Do not persist the choice in cookies. @default false */
    disableStorage?: boolean;
    /** Language of the built-in texts */
    locale?: Locale;
  }>(),
  {
    defaultTheme: undefined,
    defaultPalette: undefined,
    disableStorage: false,
    locale: undefined,
  },
);
const emit = defineEmits<{
  /** The mode changed (light / dark / system) */
  themeChange: [theme: ThemeMode];
  paletteChange: [palette: Palette | null];
}>();
defineSlots<{ default?: () => unknown }>();

const isRoot = useThemeScope() === null;
const onThemeChange = (theme: ConfigProviderTheme) => {
  if (theme === "light" || theme === "dark") emit("themeChange", theme);
  else if (theme === "auto" || theme === "system")
    emit("themeChange", "system");
};
</script>

<template>
  <ConfigProvider
    :theme="defaultTheme ?? (isRoot ? 'system' : undefined)"
    :palette="defaultPalette"
    :persist="!disableStorage"
    :locale="locale"
    @theme-change="onThemeChange"
    @palette-change="emit('paletteChange', $event)"
  >
    <slot />
  </ConfigProvider>
</template>
