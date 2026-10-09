<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { computed } from "vue";
import { PALETTES, type Palette } from "@minerva/core";
import { useOptionalTheme } from "./theme-context";
const props = withDefaults(
  defineProps<{
    value?: Palette | null;
    palettes?: Palette[];
    showDefault?: boolean;
    disabled?: boolean;
    labels?: Partial<Record<Palette | "default", string>>;
  }>(),
  { palettes: () => [...PALETTES] },
);
const emit = defineEmits(["change", "update:modelValue"]);
const theme = useOptionalTheme();
const current = computed(() =>
  props.value === undefined ? (theme?.palette.value ?? null) : props.value,
);
const items = computed(() =>
  props.showDefault ? [null, ...props.palettes] : props.palettes,
);
function choose(value: Palette | null) {
  if (props.disabled) return;
  emit("change", value);
  emit("update:modelValue", value);
  if (props.value === undefined) theme?.setPalette(value);
}
</script>
<template>
  <view class="mn-palette-toggle"
    ><button
      v-for="item in items"
      :key="item ?? 'default'"
      class="mn-button mn-variant-outline"
      :data-palette="item ?? 'default'"
      :class="{ 'mn-active': item === current, 'mn-disabled': disabled }"
      :disabled="disabled"
      :aria-pressed="item === current"
      @tap="choose(item)"
    >
      {{
        labels?.[item ?? "default"] ?? t(`paletteToggle.${item ?? "default"}`)
      }}
    </button></view
  >
</template>
