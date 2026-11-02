<script lang="ts">
import { h, isVNode, type Component, type VNodeChild } from "vue";
import type {
  SegmentedControlContent,
  SegmentedControlOption,
  SegmentedControlOptionObject,
} from "./types";

const normalize = (
  option: SegmentedControlOption,
): SegmentedControlOptionObject =>
  typeof option === "string" ? { value: option } : option;

const renderContent = (
  node: SegmentedControlContent | null | undefined,
): VNodeChild => {
  if (node === null || node === undefined) return null;
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (typeof node === "function") return (node as () => VNodeChild)();
  if (isVNode(node)) return node;
  return h(node as Component);
};

const Render = (p: { content: SegmentedControlContent | null | undefined }) =>
  renderContent(p.content);
Render.props = ["content"];
</script>

<script setup lang="ts">
/**
 * SegmentedControl: a single-choice segmented switch for modes and filters
 * (a `radiogroup` of `radio` segments sharing the width equally, with a
 * thumb sliding under the selected segment). Use Tabs when each choice has
 * its own content panel. The selection is `v-model`.
 * Keyboard: a roving tab stop (the selected segment, else the first enabled
 * one); the arrow keys move and select, skipping disabled segments and
 * wrapping around; Home / End select the first / last enabled segment.
 */
import { computed, nextTick, shallowRef, useAttrs } from "vue";
import { getNextIndex } from "@minerva/core";
import styles from "@react-styles/components/SegmentedControl/segmentedControl.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { getDirection } from "../../internal/direction";
import type { SegmentedControlProps } from "./types";

defineOptions({ name: "SegmentedControl", inheritAttrs: false });

const props = withDefaults(defineProps<SegmentedControlProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  size: "medium",
  color: "neutral",
  fullWidth: false,
  disabled: false,
  name: undefined,
  "aria-label": undefined,
});

const emit = defineEmits<{
  /** `v-model`: the selected value */
  "update:modelValue": [value: string];
  /** The selected value */
  change: [value: string];
}>();

const attrs = useAttrs();
const root = shallowRef<HTMLElement | null>(null);

const value = useControllable<string | undefined>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: undefined,
  onChange: (next) => {
    if (next !== undefined) emit("change", next);
  },
  name: "SegmentedControl",
});

// `aria-label` is a declared prop: Vue stores it camelized
const ariaLabel = computed(
  () => (props as unknown as { ariaLabel?: string }).ariaLabel,
);

const items = computed(() => props.options.map(normalize));
const isDisabled = (index: number) =>
  props.disabled || Boolean(items.value[index]?.disabled);
const selectedIndex = computed(() =>
  items.value.findIndex((item) => item.value === value.value),
);
// Roving tab stop: the selection, else the first enabled segment.
const tabStop = computed(() =>
  selectedIndex.value >= 0 && !isDisabled(selectedIndex.value)
    ? selectedIndex.value
    : items.value.findIndex((_, index) => !isDisabled(index)),
);

function select(index: number) {
  if (isDisabled(index)) return;
  const next = items.value[index]!.value;
  if (next !== value.value) value.value = next;
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (props.disabled) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) select(index);
    return;
  }
  const next = getNextIndex({
    currentIndex: index,
    count: items.value.length,
    key: event.key,
    orientation: "both",
    dir: getDirection(event.currentTarget as HTMLElement),
    isDisabled,
  });
  if (next === null) return;
  event.preventDefault();
  select(next);
  void nextTick(() =>
    root.value?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus(),
  );
}

const labelOf = (item: SegmentedControlOptionObject) =>
  item.label ?? (item.icon !== undefined ? undefined : item.value);

const rootAttrs = computed(() => ({
  ...attrs,
  class: [
    styles.segmentedControl,
    styles[props.size],
    styles[props.color],
    props.fullWidth && styles.fullWidth,
    props.disabled && styles.disabled,
    attrs.class,
  ],
  style: [
    {
      "--_segmented-control-count": String(Math.max(items.value.length, 1)),
      "--_segmented-control-index": String(Math.max(selectedIndex.value, 0)),
    },
    attrs.style as never,
  ],
  ...hooks("segmented-control", "root", {
    disabled: props.disabled,
    size: props.size,
    color: props.color,
  }),
}));
</script>

<template>
  <div
    ref="root"
    role="radiogroup"
    :aria-label="ariaLabel"
    :aria-disabled="disabled || undefined"
    v-bind="rootAttrs"
  >
    <span
      :class="styles.indicator"
      :hidden="selectedIndex < 0"
      aria-hidden="true"
      v-bind="hooks('segmented-control', 'indicator')"
    />
    <div
      v-for="(item, index) in items"
      :key="item.value"
      role="radio"
      :aria-checked="index === selectedIndex"
      :aria-disabled="isDisabled(index) || undefined"
      :aria-label="item['aria-label']"
      :tabindex="!disabled && index === tabStop ? 0 : -1"
      :class="styles.item"
      :data-value="item.value"
      v-bind="
        hooks('segmented-control', 'item', {
          selected: index === selectedIndex,
          disabled: isDisabled(index),
        })
      "
      @click="select(index)"
      @keydown="onKeydown($event, index)"
    >
      <span
        v-if="item.icon !== undefined && item.icon !== null"
        :class="styles.icon"
        aria-hidden="true"
        v-bind="hooks('segmented-control', 'icon')"
        ><Render :content="item.icon"
      /></span>
      <span
        v-if="labelOf(item) !== undefined && labelOf(item) !== null"
        :class="styles.label"
        v-bind="hooks('segmented-control', 'label')"
        ><Render :content="labelOf(item)"
      /></span>
    </div>
    <input
      v-if="name"
      type="hidden"
      :name="name"
      :value="value ?? ''"
      :disabled="disabled"
    />
  </div>
</template>
