<script setup lang="ts">
/**
 * Palette switch (editorial / tech / graphite / cool), orthogonal to the
 * light / dark mode. Bound to the closest `ConfigProvider` (through
 * `useTheme`).
 */
import { computed, useAttrs } from "vue";
import { PALETTES, type Palette } from "@minerva/core";
import styles from "@react-styles/components/ThemeToggle/themeToggle.module.scss";
import { hooks } from "../../internal/hooks";
import { useTheme } from "../../config/useTheme";
import { useI18n } from "../../config/useI18n";
import type { PaletteToggleProps } from "./types";

defineOptions({ name: "PaletteToggle", inheritAttrs: false });

const props = withDefaults(defineProps<PaletteToggleProps>(), {
  palettes: () => [...PALETTES],
  showDefault: false,
  labels: undefined,
});

const attrs = useAttrs();
const theme = useTheme();
const { t } = useI18n();

const items = computed<Array<Palette | null>>(() =>
  props.showDefault ? [null, ...props.palettes] : props.palettes,
);
const rootAttrs = computed(() => ({
  "aria-label": t("paletteToggle.label", {
    palette: theme.palette ?? t("paletteToggle.default"),
  }),
  ...attrs,
  ...hooks("palette-toggle", "root"),
}));
</script>

<template>
  <div :class="styles.group" role="group" v-bind="rootAttrs">
    <button
      v-for="item in items"
      :key="item ?? 'default'"
      type="button"
      :class="styles.item"
      :aria-pressed="theme.palette === item"
      v-bind="
        hooks('palette-toggle', 'item', {
          state: theme.palette === item ? 'active' : 'inactive',
        })
      "
      @click="theme.setPalette(item)"
    >
      {{
        labels?.[item ?? "default"] ?? t(`paletteToggle.${item ?? "default"}`)
      }}
    </button>
  </div>
</template>
