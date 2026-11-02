<script setup lang="ts">
import { computed, ref } from "vue";
import { getNextIndex } from "@minerva/core";
import { useI18n } from "./i18n";
interface SegmentedControlOptionObject {
  value: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
  "aria-label"?: string;
}
type SegmentedControlOption = string | SegmentedControlOptionObject;
const props = withDefaults(
  defineProps<{
    options?: readonly SegmentedControlOption[];
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    size?: "small" | "medium" | "large";
    color?: "neutral" | "primary";
    fullWidth?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    options: () => [],
    size: "medium",
    color: "neutral",
    fullWidth: false,
    disabled: false,
  },
);
const emit = defineEmits<{
  change: [value: string];
  "update:modelValue": [value: string];
}>();
const { dir } = useI18n();
const localValue = ref(props.defaultValue ?? "");
const selected = computed(
  () => props.modelValue ?? props.value ?? localValue.value,
);
const items = computed(() =>
  props.options.map((option) =>
    typeof option === "string" ? { value: option } : option,
  ),
);
const isDisabled = (index: number) =>
  props.disabled || Boolean(items.value[index]?.disabled);
const selectedIndex = computed(() =>
  items.value.findIndex((item) => item.value === selected.value),
);
// Roving tab stop: the selection, else the first enabled segment.
const tabStop = computed(() =>
  selectedIndex.value >= 0 && !isDisabled(selectedIndex.value)
    ? selectedIndex.value
    : items.value.findIndex((_, index) => !isDisabled(index)),
);
const segments = computed(() =>
  items.value.map((item, index) => ({
    value: item.value,
    icon: item.icon,
    label: item.label ?? (item.icon ? undefined : item.value),
    ariaLabel: item["aria-label"],
    selected: index === selectedIndex.value,
    disabled: isDisabled(index),
    tabindex: !props.disabled && index === tabStop.value ? 0 : -1,
  })),
);
// Equal segments: the thumb is one segment wide and slides by whole
// segments (mirrored in RTL).
const thumbStyle = computed(() => {
  const count = Math.max(items.value.length, 1);
  const offset =
    Math.max(selectedIndex.value, 0) * 100 * (dir.value === "rtl" ? -1 : 1);
  return {
    width: `calc((100% - 4px) / ${count})`,
    transform: `translateX(${offset}%)`,
    ...(dir.value === "rtl" && { left: "auto", right: "2px" }),
    ...(selectedIndex.value < 0 && { display: "none" }),
  };
});
function choose(index: number) {
  if (isDisabled(index)) return;
  const next = items.value[index]!.value;
  if (next === selected.value) return;
  if (props.value === undefined && props.modelValue === undefined)
    localValue.value = next;
  emit("change", next);
  emit("update:modelValue", next);
}
function keydown(event: KeyboardEvent, index: number) {
  if (props.disabled || event.isComposing) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) choose(index);
    return;
  }
  const next = getNextIndex({
    currentIndex: index,
    count: items.value.length,
    key: event.key,
    orientation: "both",
    dir: dir.value === "rtl" ? "rtl" : "ltr",
    isDisabled,
  });
  if (next === null) return;
  event.preventDefault();
  choose(next);
  const target = (
    event.currentTarget as HTMLElement | null
  )?.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]')[next];
  target?.focus?.();
}
</script>
<template>
  <view
    class="mn-segmented-control"
    :class="[
      `mn-size-${size}`,
      `mn-color-${color}`,
      { 'mn-full-width': fullWidth, 'mn-disabled': disabled },
    ]"
    role="radiogroup"
    data-minerva="segmented-control"
    data-part="root"
    :data-size="size"
    :data-color="color"
    :data-disabled="disabled ? '' : undefined"
    :aria-label="ariaLabel"
    :aria-disabled="disabled || undefined"
    ><view
      class="mn-segmented-control__indicator"
      data-minerva="segmented-control"
      data-part="indicator"
      aria-hidden="true"
      :style="thumbStyle"
    /><view
      v-for="(segment, index) in segments"
      :key="segment.value"
      class="mn-segmented-control__item"
      :class="{
        'mn-selected': segment.selected,
        'mn-disabled': segment.disabled,
      }"
      role="radio"
      data-minerva="segmented-control"
      data-part="item"
      :data-value="segment.value"
      :data-selected="segment.selected ? '' : undefined"
      :data-disabled="segment.disabled ? '' : undefined"
      :aria-checked="segment.selected"
      :aria-disabled="segment.disabled || undefined"
      :aria-label="segment.ariaLabel"
      :tabindex="segment.tabindex"
      @tap="choose(index)"
      @keydown="keydown($event, index)"
      ><text
        v-if="segment.icon"
        class="mn-segmented-control__icon"
        data-minerva="segmented-control"
        data-part="icon"
        aria-hidden="true"
        >{{ segment.icon }}</text
      ><text
        v-if="segment.label"
        class="mn-segmented-control__label"
        data-minerva="segmented-control"
        data-part="label"
        >{{ segment.label }}</text
      ></view
    ></view
  >
</template>
