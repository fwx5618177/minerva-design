<script setup lang="ts">
import { computed, ref, provide, onMounted } from "vue";
import ConfigProvider from "./ConfigProvider.vue";
import type { DesignOptions, Palette, ThemeMode } from "@minerva/core";
const props = withDefaults(
  defineProps<{
    mode?: ThemeMode;
    palette?: Palette | null;
    design?: DesignOptions;
    defaultTheme?: ThemeMode;
    defaultPalette?: Palette | null;
    disableStorage?: boolean;
    storageKey?: string;
    locale?: string;
  }>(),
  {
    defaultTheme: "system",
    defaultPalette: null,
    storageKey: "minerva-theme",
  },
);
const emit = defineEmits([
  "themeChange",
  "paletteChange",
  "update:mode",
  "update:palette",
]);
const current = ref<ThemeMode>(props.defaultTheme),
  chosen = ref<Palette | null>(props.defaultPalette);
const mode = computed(() => props.mode ?? current.value),
  palette = computed(() =>
    props.palette === undefined ? chosen.value : props.palette,
  );
function persist() {
  if (!props.disableStorage)
    try {
      uni.setStorageSync(props.storageKey, {
        mode: mode.value,
        palette: palette.value,
      });
    } catch {
      /* Storage can be disabled by the host. */
    }
}
function setTheme(v: ThemeMode) {
  current.value = v;
  emit("themeChange", v);
  emit("update:mode", v);
  persist();
}
function setPalette(v: Palette | null) {
  chosen.value = v;
  emit("paletteChange", v);
  emit("update:palette", v);
  persist();
}
provide("minerva:theme", { mode, palette, setTheme, setPalette });
onMounted(() => {
  if (!props.disableStorage)
    try {
      const saved = uni.getStorageSync(props.storageKey);
      if (saved && ["light", "dark", "system"].includes(saved.mode))
        current.value = saved.mode;
      if (
        saved &&
        (saved.palette === null ||
          ["editorial", "tech", "graphite", "cool"].includes(saved.palette))
      )
        chosen.value = saved.palette;
    } catch {
      /* Missing storage does not prevent rendering. */
    }
});
defineExpose({ setTheme, setPalette });
</script>
<template>
  <ConfigProvider
    :mode="mode"
    :palette="palette"
    :design="design"
    :locale="locale"
    ><template #default="theme"
      ><slot
        :mode="theme.mode"
        :palette="theme.palette"
        :set-theme="setTheme"
        :set-palette="setPalette" /></template
  ></ConfigProvider>
</template>
