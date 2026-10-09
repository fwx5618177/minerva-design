<script setup lang="ts">
import {
  resolveTokens,
  githubDark,
  type ComponentTheme,
  type DesignOptions,
  type Palette,
  getRatingKeyValue,
} from "@minerva/core";
import { useI18n } from "./i18n";
import { inheritForm } from "./form-context";
import {
  computed,
  ref,
  getCurrentInstance,
  useAttrs,
  inject,
  type ComputedRef,
} from "vue";
const rawProps = withDefaults(
  defineProps<{
    value?: number;
    max?: number;
    size?: string;
    disabled?: boolean;
    readOnly?: boolean;
    allowClear?: boolean;
    showValue?: boolean;
    ratingCount?: number;
    ariaLabel?: string;
    onChange?: (value: number) => void;
  }>(),
  { value: 0, max: 10, size: "medium", allowClear: false },
);
const props = inheritForm(rawProps);
const fieldDisabled = computed(() => props.disabled || props.readOnly);
const emit = defineEmits(["change", "update:modelValue", "keydown"]);
const instance = getCurrentInstance(),
  attrs = useAttrs(),
  { dir } = useI18n();
const hover = ref<number | null>(null);
const interactive = computed(
  () =>
    !fieldDisabled.value &&
    !!(props.onChange || instance?.vnode.props?.["onUpdate:modelValue"]),
);
function keys(event: KeyboardEvent) {
  emit("keydown", event);
  if (event.defaultPrevented || !interactive.value) return;
  let key = event.key;
  const direction =
    attrs.dir ??
    (event.currentTarget as HTMLElement)
      ?.closest?.("[dir]")
      ?.getAttribute("dir") ??
    dir.value;
  if (direction === "rtl") {
    if (key === "ArrowLeft") key = "ArrowRight";
    else if (key === "ArrowRight") key = "ArrowLeft";
  }
  const value = getRatingKeyValue(key, props.value, props.max);
  if (value !== null) {
    event.preventDefault();
    emit("change", value);
    emit("update:modelValue", value);
  }
}

const display = computed(() => {
  if (interactive.value && hover.value !== null) return hover.value;
  const v =
    props.max > 0 ? Math.max(0, Math.min(5, (props.value / props.max) * 5)) : 0;
  const f = v - Math.floor(v);
  return Math.floor(v) + (f >= 0.75 ? 1 : f >= 0.25 ? 0.5 : 0);
});
const theme = inject<
  ComputedRef<{
    mode?: "light" | "dark";
    theme?: string | Partial<ComponentTheme>;
    palette?: Palette | null;
    design?: DesignOptions;
  }>
>(
  "minerva:config",
  computed(() => ({ mode: "light" })),
);
const starColors = computed(() => {
  const c = theme.value;
  return resolveTokens({
    mode: c.mode ?? "light",
    palette: c.palette,
    design: c.design,
    overrides:
      c.theme === "github-dark"
        ? githubDark
        : typeof c.theme === "object"
          ? c.theme
          : undefined,
  }).colors;
});
const starPath =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";
function starImage(index: number) {
  const colors = starColors.value,
    full = index <= display.value,
    half = index - 0.5 === display.value;
  const accent = colors["accent-color"],
    empty = colors["border-strong-color"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="${starPath}" fill="${full ? accent : "none"}" stroke="${full ? accent : empty}"/>${half ? `<defs><clipPath id="half"><rect width="12" height="24"/></clipPath></defs><path d="${starPath}" fill="${accent}" stroke="${accent}" clip-path="url(#half)"/>` : ""}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
function choose(stars: number) {
  if (!interactive.value) return;
  const v = Math.round((stars / 5) * props.max * 10) / 10;
  const n = props.allowClear && v === props.value ? 0 : v;
  emit("change", n);
  emit("update:modelValue", n);
}
</script>
<template>
  <view
    class="mn-rating"
    :class="[`mn-size-${size}`, `mn-rating-${size}`]"
    :role="interactive ? 'slider' : 'img'"
    :tabindex="interactive ? 0 : undefined"
    :aria-label="ariaLabel ?? `${value.toFixed(1)} / ${max}`"
    :aria-valuenow="interactive ? value : undefined"
    :aria-valuemin="interactive ? 0 : undefined"
    :aria-valuemax="interactive ? max : undefined"
    @keydown="keys"
    @mouseleave="hover = null"
    ><view
      v-for="n in 5"
      :key="n"
      class="mn-star"
      @mouseenter="interactive && (hover = n)"
      :class="{
        'mn-active': n <= display,
        'mn-rating-half': n > display && n - 0.5 === display,
      }"
      ><image
        :src="starImage(n)"
        class="mn-rating-image"
        aria-hidden="true" /><button
        v-if="interactive"
        tabindex="-1"
        aria-hidden="true"
        class="mn-rating-target mn-rating-target-left"
        :class="{ 'mn-disabled': fieldDisabled }"
        :disabled="fieldDisabled"
        :aria-label="`${((n - 0.5) / 5) * max}`"
        @tap="choose(n - 0.5)" /><button
        v-if="interactive"
        tabindex="-1"
        aria-hidden="true"
        class="mn-rating-target mn-rating-target-right"
        :class="{ 'mn-disabled': fieldDisabled }"
        :disabled="fieldDisabled"
        :aria-label="`${(n / 5) * max}`"
        @tap="choose(n)" /></view
    ><text v-if="showValue" class="mn-rating-value"
      >{{ value.toFixed(1)
      }}<text v-if="ratingCount !== undefined"> ({{ ratingCount }})</text></text
    ></view
  >
</template>
