<script setup lang="ts">
/**
 * Light / dark / system switch (a group of toggle buttons) bound to the
 * closest `ConfigProvider` (through `useTheme`).
 */
import { computed, useAttrs } from "vue";
import type { ThemeMode } from "@minerva/core";
import styles from "@react-styles/components/ThemeToggle/themeToggle.module.scss";
import { hooks } from "../../internal/hooks";
import { useTheme } from "../../config/useTheme";
import { useI18n } from "../../config/useI18n";
import type { ThemeToggleProps } from "./types";

defineOptions({ name: "ThemeToggle", inheritAttrs: false });

const props = withDefaults(defineProps<ThemeToggleProps>(), {
  showSystem: true,
  labels: undefined,
});

const attrs = useAttrs();
const theme = useTheme();
const { t } = useI18n();

const items = computed<ThemeMode[]>(() =>
  props.showSystem ? ["light", "dark", "system"] : ["light", "dark"],
);
const rootAttrs = computed(() => ({
  "aria-label": t("themeToggle.label", { theme: theme.resolvedTheme }),
  ...attrs,
  ...hooks("theme-toggle", "root"),
}));
</script>

<template>
  <div :class="styles.group" role="group" v-bind="rootAttrs">
    <button
      v-for="item in items"
      :key="item"
      type="button"
      :class="styles.item"
      :aria-pressed="theme.theme === item"
      v-bind="
        hooks('theme-toggle', 'item', {
          state: theme.theme === item ? 'active' : 'inactive',
        })
      "
      @click="theme.setTheme(item)"
    >
      {{ labels?.[item] ?? t(`themeToggle.${item}`) }}
    </button>
  </div>
</template>
