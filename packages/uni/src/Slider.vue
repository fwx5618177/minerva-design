<script setup lang="ts">
import { computed, getCurrentInstance, ref, useId } from "vue";
import {
  closestSliderThumb,
  getSliderKeyValue,
  getSliderMarks,
  isSliderMarkActive,
  normalizeSliderValue,
  setSliderThumb,
  sliderPercent,
  sliderValueFromRatio,
  sliderValues,
  sliderValuesEqual,
  type SliderMark,
  type SliderScale,
  type SliderValue,
} from "@minerva/core";
import { useI18n } from "./i18n";
import { inheritForm } from "./form-context";

/**
 * Slider: a custom touch slider (not the built-in `<slider>`, for marks,
 * ranges and theming) with one thumb, or two non-crossing thumbs with
 * `range`. Touch the track to move the closest thumb, then drag: `change` /
 * `update:modelValue` follow the drag and `changeEnd` fires on release. The
 * track is measured with `uni.createSelectorQuery` (the DOM on H5). On H5
 * each thumb is a focusable `role="slider"` with arrow / PageUp / PageDown /
 * Home / End keys (mirrored in RTL).
 */
const rawProps = withDefaults(
  defineProps<{
    modelValue?: SliderValue;
    value?: SliderValue;
    defaultValue?: SliderValue;
    range?: boolean;
    min?: number;
    max?: number;
    step?: number | null;
    marks?: SliderMark[] | boolean;
    snapToMarks?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    size?: "small" | "medium" | "large";
    color?: "primary" | "success" | "info" | "warning" | "danger";
    showValue?: boolean;
    tooltip?: boolean;
    formatValue?: (value: number) => string;
    name?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    getAriaValueText?: (value: number, index: number) => string;
  }>(),
  {
    modelValue: undefined,
    value: undefined,
    defaultValue: undefined,
    range: false,
    min: 0,
    max: 100,
    step: 1,
    marks: false,
    snapToMarks: false,
    size: "medium",
    color: "primary",
    showValue: false,
    tooltip: false,
    formatValue: undefined,
    name: undefined,
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    getAriaValueText: undefined,
  },
);
const props = inheritForm(rawProps);
const emit = defineEmits<{
  change: [value: SliderValue];
  "update:modelValue": [value: SliderValue];
  changeEnd: [value: SliderValue];
}>();
const { t, dir } = useI18n();
const instance = getCurrentInstance();
const id = `mn-slider-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const controlId = `${id}-control`;

const local = ref<SliderValue | undefined>(props.defaultValue);
const blocked = computed(() => !!props.disabled || !!props.readOnly);
const markList = computed(() =>
  getSliderMarks(props.marks, props.min, props.max, props.step),
);
const scale = computed<SliderScale>(() => ({
  min: props.min,
  max: props.max,
  step: props.step,
  marks: markList.value,
  snapToMarks: props.snapToMarks,
}));
const current = computed(() =>
  normalizeSliderValue(
    props.modelValue ?? props.value ?? local.value,
    props.range,
    scale.value,
  ),
);
const values = computed(() => sliderValues(current.value));
const format = (v: number) => (props.formatValue ?? String)(v);
const rtl = computed(() => dir.value === "rtl");
const dragging = ref<number | null>(null);

interface Rect {
  left: number;
  width: number;
}
let rect: Rect | null = null;
let gesture: { index: number; latest: SliderValue } | null = null;

function measure(done: (rect: Rect) => void) {
  const el = (instance?.proxy?.$el as HTMLElement | undefined)?.querySelector?.(
    ".mn-slider__control",
  );
  if (el?.getBoundingClientRect) {
    const box = el.getBoundingClientRect();
    if (box.width > 0) done({ left: box.left, width: box.width });
    return;
  }
  try {
    if (typeof uni === "undefined") return;
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .select(`#${controlId}`)
      .boundingClientRect((result: any) => {
        if (result?.width > 0)
          done({ left: result.left ?? 0, width: result.width });
      })
      .exec();
  } catch {}
}
function withRect(fn: (rect: Rect) => void) {
  const cached = rect;
  if (cached) fn(cached);
  measure((measured) => {
    rect = measured;
    if (!cached) fn(measured);
  });
}

function set(next: SliderValue, from: SliderValue): boolean {
  if (sliderValuesEqual(next, from)) return false;
  if (props.modelValue === undefined && props.value === undefined)
    local.value = next;
  emit("update:modelValue", next);
  emit("change", next);
  return true;
}
function touchX(event: any): number | undefined {
  const touch = event?.touches?.[0] ?? event?.changedTouches?.[0];
  return touch?.clientX ?? touch?.pageX ?? touch?.x;
}
function valueAt(x: number, box: Rect) {
  let ratio = box.width ? (x - box.left) / box.width : 0;
  if (rtl.value) ratio = 1 - ratio;
  return sliderValueFromRatio(ratio, scale.value);
}
function onTouchStart(event: any) {
  if (blocked.value) return;
  const x = touchX(event);
  if (x === undefined) return;
  withRect((box) => {
    const from = current.value;
    const pointed = valueAt(x, box);
    const index = closestSliderThumb(from, pointed);
    const next = setSliderThumb(from, index, pointed);
    gesture = { index, latest: next };
    dragging.value = index;
    set(next, from);
  });
}
function onTouchMove(event: any) {
  const x = touchX(event);
  if (!gesture || !rect || x === undefined) return;
  const next = setSliderThumb(gesture.latest, gesture.index, valueAt(x, rect));
  if (set(next, gesture.latest)) gesture.latest = next;
}
function onTouchEnd() {
  if (!gesture) return;
  const final = gesture.latest;
  gesture = null;
  dragging.value = null;
  emit("changeEnd", final);
}
function onKeydown(event: KeyboardEvent, index: number) {
  if (blocked.value) return;
  let key = event.key;
  if (rtl.value && (key === "ArrowLeft" || key === "ArrowRight"))
    key = key === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
  const target = getSliderKeyValue(key, values.value[index]!, scale.value);
  if (target === null) return;
  event.preventDefault();
  const from = current.value;
  const next = setSliderThumb(from, index, target);
  if (set(next, from)) emit("changeEnd", next);
}

const side = computed(() => (rtl.value ? "right" : "left"));
const position = (v: number) => sliderPercent(v, props.min, props.max);
const at = (v: number) => ({ [side.value]: `${position(v)}%` });
const rangeStyle = computed(() => {
  const list = values.value;
  const start = props.range ? position(list[0]!) : 0;
  const end = position(list[list.length - 1]!);
  return { [side.value]: `${start}%`, width: `${end - start}%` };
});
const labelOf = (index: number) => {
  if (!props.range) return props.ariaLabel;
  const suffix = t(index === 0 ? "slider.minimum" : "slider.maximum");
  return props.ariaLabel ? `${props.ariaLabel} ${suffix}` : suffix;
};
const thumbs = computed(() =>
  values.value.map((v, index) => ({
    value: v,
    label: labelOf(index),
    min: props.range && index === 1 ? values.value[0] : props.min,
    max: props.range && index === 0 ? values.value[1] : props.max,
    text: props.getAriaValueText ? props.getAriaValueText(v, index) : format(v),
    style: at(v),
    dragging: dragging.value === index,
  })),
);
const marksView = computed(() =>
  markList.value.map((mark) => {
    const active = isSliderMarkActive(mark.value, current.value);
    const edge = position(mark.value);
    const atStart = edge <= 0;
    const atEnd = edge >= 100;
    // Labels are positioned with physical `left`/`right`, so swap in RTL.
    const labelClass = {
      "mn-start": rtl.value ? atEnd : atStart,
      "mn-end": rtl.value ? atStart : atEnd,
    };
    return { ...mark, active, labelClass, style: at(mark.value) };
  }),
);
const valueText = computed(() => values.value.map(format).join(" – "));
</script>
<template>
  <view
    :id="id"
    class="mn-slider"
    :class="[
      `mn-size-${size}`,
      `mn-color-${color}`,
      {
        'mn-labelled': marksView.some((m) => m.label),
        'mn-disabled': props.disabled,
        'mn-readonly': props.readOnly,
        'mn-dragging': dragging !== null,
      },
    ]"
    data-minerva="slider"
    data-part="root"
    :data-size="size"
    :data-color="color"
    data-orientation="horizontal"
    :data-variant="range ? 'range' : 'single'"
    :data-disabled="props.disabled ? '' : undefined"
    :data-readonly="props.readOnly ? '' : undefined"
    :data-invalid="props.invalid ? '' : undefined"
    :data-dragging="dragging !== null ? '' : undefined"
    ><view
      :id="controlId"
      class="mn-slider__control"
      data-minerva="slider"
      data-part="control"
      @touchstart="onTouchStart"
      @touchmove.stop="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      ><view
        class="mn-slider__rail"
        data-minerva="slider"
        data-part="rail"
      /><view
        class="mn-slider__range"
        data-minerva="slider"
        data-part="range"
        :style="rangeStyle"
      /><view
        v-for="mark in marksView"
        :key="mark.value"
        class="mn-slider__mark"
        :class="{ 'mn-active': mark.active }"
        data-minerva="slider"
        data-part="mark"
        :data-state="mark.active ? 'active' : 'inactive'"
        aria-hidden="true"
        :style="mark.style"
        ><text
          v-if="mark.label"
          class="mn-slider__mark-label"
          :class="mark.labelClass"
          data-minerva="slider"
          data-part="mark-label"
          >{{ mark.label }}</text
        ></view
      ><view
        v-for="(thumb, index) in thumbs"
        :key="index"
        class="mn-slider__thumb"
        :class="{ 'mn-dragging': thumb.dragging }"
        role="slider"
        :tabindex="props.disabled ? -1 : 0"
        :aria-label="thumb.label"
        :aria-labelledby="ariaLabelledby"
        :aria-valuemin="thumb.min"
        :aria-valuemax="thumb.max"
        :aria-valuenow="thumb.value"
        :aria-valuetext="thumb.text"
        aria-orientation="horizontal"
        :aria-disabled="props.disabled || undefined"
        :aria-readonly="props.readOnly || undefined"
        :aria-invalid="props.invalid || undefined"
        data-minerva="slider"
        data-part="thumb"
        :data-index="index"
        :data-dragging="thumb.dragging ? '' : undefined"
        :data-disabled="props.disabled ? '' : undefined"
        :style="thumb.style"
        @keydown="onKeydown($event, index)"
        ><text
          v-if="tooltip && thumb.dragging"
          class="mn-slider__tooltip"
          data-minerva="slider"
          data-part="tooltip"
          aria-hidden="true"
          >{{ format(thumb.value) }}</text
        ></view
      ></view
    ><text
      v-if="showValue"
      class="mn-slider__value"
      data-minerva="slider"
      data-part="value"
      aria-hidden="true"
      >{{ valueText }}</text
    ><template v-if="name"
      ><input
        v-for="(v, index) in values"
        :key="index"
        class="mn-slider__input"
        data-minerva="slider"
        data-part="input"
        :name="name"
        :value="String(v)"
        :disabled="props.disabled"
        hidden
    /></template>
  </view>
</template>
