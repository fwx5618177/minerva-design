<script setup lang="ts">
import { computed, ref } from "vue";
import type { ThemeMode } from "@minerva/core";
import { useOptionalTheme } from "./theme-context";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    value?: ThemeMode;
    modelValue?: ThemeMode;
    defaultValue?: ThemeMode;
    disabled?: boolean;
    showSystem?: boolean;
    labels?: Partial<Record<ThemeMode, string>>;
  }>(),
  { showSystem: true, labels: () => ({}) },
);
const emit = defineEmits<{
  change: [value: ThemeMode];
  "update:modelValue": [value: ThemeMode];
}>();
const theme = useOptionalTheme();
const local = ref<ThemeMode>(props.defaultValue ?? "light");
const { t } = useI18n();
const current = computed(
  () => props.modelValue ?? props.value ?? theme?.mode.value ?? local.value,
);
const modes = computed<ThemeMode[]>(() =>
  props.showSystem ? ["light", "dark", "system"] : ["light", "dark"],
);
function select(mode: ThemeMode) {
  if (props.disabled || mode === current.value) return;
  if (props.value === undefined && props.modelValue === undefined) {
    local.value = mode;
    theme?.setTheme(mode);
  }
  emit("change", mode);
  emit("update:modelValue", mode);
}
</script>
<template>
  <view class="mn-theme-toggle" role="radiogroup"
    ><button
      v-for="mode in modes"
      :key="mode"
      class="mn-button mn-variant-ghost"
      :class="{ 'mn-active': current === mode }"
      role="radio"
      :aria-checked="current === mode"
      :disabled="disabled"
      @tap="select(mode)"
    >
      <slot name="option" :mode="mode" :active="current === mode">{{
        labels[mode] ?? t(`themeToggle.${mode}`)
      }}</slot>
    </button></view
  >
</template>
