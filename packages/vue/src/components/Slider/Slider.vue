<script setup lang="ts">
/**
 * Slider: picks a number (or a `[start, end]` range with `range`) on a
 * track. `v-model` (or `defaultValue`); emits `change(value)` while
 * dragging and on each key press, and `changeEnd(value)` once the
 * interaction ends (pointer release, key press). Each thumb is a
 * `role="slider"`: arrows step (mirrored in RTL), PageUp / PageDown move by
 * 10%, Home / End jump to the bounds; clicking the track moves the closest
 * thumb.
 */
import { computed, ref, useAttrs, type CSSProperties } from "vue";
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
  type SliderScale,
  type SliderValue,
} from "@minerva/core";
import styles from "@react-styles/components/Slider/slider.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { getDirection, logicalArrowKey } from "../../internal/direction";
import { useI18n } from "../../config/useI18n";
import {
  useFormControlContext,
  useFormControlProps,
} from "../../internal/form-control";
import type { SliderProps } from "./types";

defineOptions({ name: "Slider", inheritAttrs: false });

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  range: false,
  min: 0,
  max: 100,
  step: 1,
  marks: undefined,
  snapToMarks: false,
  disabled: undefined,
  readOnly: undefined,
  size: "medium",
  color: "primary",
  showValue: false,
  tooltip: false,
  formatValue: undefined,
  orientation: "horizontal",
  name: undefined,
  getAriaValueText: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [value: SliderValue];
  /** The value changed (while dragging, on each key press) */
  change: [value: SliderValue];
  /** The interaction ended (pointer release, key press): the final value */
  changeEnd: [value: SliderValue];
}>();

const attrs = useAttrs();
const { t } = useI18n();

const model = useControllable<SliderValue | undefined>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: undefined,
  name: "Slider",
});

const fc = useFormControlContext();
const field = useFormControlProps(() => ({
  "aria-describedby": attrs["aria-describedby"] as string | undefined,
}));
const isDisabled = computed(
  () => props.disabled ?? fc?.disabled.value ?? false,
);
const readOnly = computed(() => props.readOnly ?? fc?.readOnly.value ?? false);
const blocked = computed(() => isDisabled.value || readOnly.value);
const vertical = computed(() => props.orientation === "vertical");

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
const value = computed(() =>
  normalizeSliderValue(model.value, props.range, scale.value),
);
const values = computed(() => sliderValues(value.value));
const format = (v: number) => (props.formatValue ?? String)(v);

const controlRef = ref<HTMLElement | null>(null);
const thumbRefs: (HTMLElement | null)[] = [];
const dragging = ref<number | null>(null);
// Latest value of the interaction (a controlled parent may lag an update)
let latest: SliderValue | null = null;
const current = () => latest ?? value.value;

function update(next: SliderValue): boolean {
  if (sliderValuesEqual(next, current())) return false;
  latest = next;
  model.value = next;
  emit("change", next);
  return true;
}

function valueAtPointer(event: PointerEvent): number {
  const control = controlRef.value!;
  const rect = control.getBoundingClientRect();
  let ratio: number;
  if (vertical.value) {
    ratio = rect.height ? (rect.bottom - event.clientY) / rect.height : 0;
  } else {
    ratio = rect.width ? (event.clientX - rect.left) / rect.width : 0;
    if (getDirection(control) === "rtl") ratio = 1 - ratio;
  }
  return sliderValueFromRatio(ratio, scale.value);
}

function onPointerDown(event: PointerEvent) {
  if (blocked.value || event.button !== 0) return;
  event.preventDefault();
  latest = null;
  const pointed = valueAtPointer(event);
  const thumbIndex = (event.target as HTMLElement).closest<HTMLElement>(
    "[data-index]",
  )?.dataset.index;
  const index =
    thumbIndex !== undefined
      ? Number(thumbIndex)
      : closestSliderThumb(current(), pointed);
  (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  dragging.value = index;
  thumbRefs[index]?.focus();
  if (thumbIndex === undefined)
    update(setSliderThumb(current(), index, pointed));
}

function onPointerMove(event: PointerEvent) {
  if (dragging.value === null) return;
  update(setSliderThumb(current(), dragging.value, valueAtPointer(event)));
}

function onPointerEnd(event: PointerEvent) {
  if (dragging.value === null) return;
  const target = event.currentTarget as HTMLElement;
  if (target.hasPointerCapture?.(event.pointerId))
    target.releasePointerCapture(event.pointerId);
  dragging.value = null;
  emit("changeEnd", current());
  latest = null;
}

function onKeyDown(event: KeyboardEvent, index: number) {
  if (blocked.value) return;
  const key = vertical.value
    ? event.key
    : logicalArrowKey(event.key, event.currentTarget as Element);
  const next = getSliderKeyValue(key, values.value[index], scale.value);
  if (next === null) return;
  event.preventDefault();
  latest = null;
  if (update(setSliderThumb(current(), index, next)))
    emit("changeEnd", current());
  latest = null;
}

const ariaLabel = computed(() => attrs["aria-label"] as string | undefined);
const labelOf = (index: number) => {
  if (!props.range) return ariaLabel.value;
  const suffix = t(index === 0 ? "slider.minimum" : "slider.maximum");
  return ariaLabel.value ? `${ariaLabel.value} ${suffix}` : suffix;
};
const labelledBy = computed(
  () =>
    (attrs["aria-labelledby"] as string | undefined) ??
    (fc && !ariaLabel.value ? fc.labelId.value : undefined),
);

const rootAttrs = computed(() => {
  const {
    "aria-label": _label,
    "aria-labelledby": _labelledBy,
    "aria-describedby": _describedBy,
    ...rest
  } = attrs;
  return rest;
});

const position = (v: number) => sliderPercent(v, props.min, props.max);
const at = (percent: number): CSSProperties =>
  vertical.value
    ? { bottom: `${percent}%` }
    : { insetInlineStart: `${percent}%` };
const rangeStyle = computed<CSSProperties>(() => {
  const list = values.value;
  const start = props.range ? position(list[0]) : 0;
  const end = position(list[list.length - 1]);
  return vertical.value
    ? { bottom: `${start}%`, height: `${end - start}%` }
    : { insetInlineStart: `${start}%`, width: `${end - start}%` };
});
const hasMarkLabels = computed(() => markList.value.some((m) => m.label));
const valueText = computed(() => values.value.map(format).join(" – "));

const rootClasses = computed(() => [
  styles.slider,
  styles[props.size],
  styles[props.color],
  {
    [styles.vertical]: vertical.value,
    [styles.labelled]: hasMarkLabels.value,
    [styles.disabled]: isDisabled.value,
    [styles.readOnly]: readOnly.value,
    [styles.dragging]: dragging.value !== null,
  },
]);
const rootHooks = computed(() =>
  hooks("slider", "root", {
    disabled: isDisabled.value,
    readonly: readOnly.value,
    invalid: !!fc?.invalid.value,
    dragging: dragging.value !== null,
    size: props.size,
    color: props.color,
    orientation: props.orientation,
    variant: props.range ? "range" : "single",
  }),
);

const thumbAttrs = (v: number, index: number) => ({
  "data-index": index,
  role: "slider",
  tabindex: isDisabled.value ? -1 : 0,
  id: index === 0 ? field.value.id : undefined,
  "aria-label": labelOf(index),
  "aria-labelledby": labelledBy.value,
  "aria-describedby": field.value["aria-describedby"],
  "aria-valuemin": props.range && index === 1 ? values.value[0] : props.min,
  "aria-valuemax": props.range && index === 0 ? values.value[1] : props.max,
  "aria-valuenow": v,
  "aria-valuetext": props.getAriaValueText
    ? props.getAriaValueText(v, index)
    : format(v),
  "aria-orientation": props.orientation,
  "aria-disabled": isDisabled.value || undefined,
  "aria-readonly": readOnly.value || undefined,
  "aria-invalid": field.value["aria-invalid"],
  ...hooks("slider", "thumb", {
    dragging: dragging.value === index,
    disabled: isDisabled.value,
  }),
});
const setThumbRef = (index: number) => (el: unknown) => {
  thumbRefs[index] = el as HTMLElement | null;
};
</script>

<template>
  <div :class="rootClasses" v-bind="{ ...rootAttrs, ...rootHooks }">
    <div
      ref="controlRef"
      :class="styles.control"
      v-bind="hooks('slider', 'control')"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerEnd"
      @pointercancel="onPointerEnd"
    >
      <span :class="styles.rail" v-bind="hooks('slider', 'rail')" />
      <span
        :class="styles.range"
        :style="rangeStyle"
        v-bind="hooks('slider', 'range')"
      />
      <span
        v-for="mark in markList"
        :key="mark.value"
        :class="[
          styles.mark,
          isSliderMarkActive(mark.value, value) && styles.markActive,
        ]"
        :style="at(position(mark.value))"
        aria-hidden="true"
        v-bind="
          hooks('slider', 'mark', {
            state: isSliderMarkActive(mark.value, value)
              ? 'active'
              : 'inactive',
          })
        "
      >
        <span
          v-if="mark.label"
          :class="[
            styles.markLabel,
            mark.value <= min && styles.markLabelStart,
            mark.value >= max && styles.markLabelEnd,
          ]"
          v-bind="hooks('slider', 'mark-label')"
          >{{ mark.label }}</span
        >
      </span>
      <span
        v-for="(v, index) in values"
        :key="index"
        :ref="setThumbRef(index)"
        :class="[styles.thumb, dragging === index && styles.thumbDragging]"
        :style="at(position(v))"
        v-bind="thumbAttrs(v, index)"
        @keydown="onKeyDown($event, index)"
      >
        <span
          v-if="tooltip"
          :class="styles.tooltip"
          aria-hidden="true"
          v-bind="hooks('slider', 'tooltip')"
          >{{ format(v) }}</span
        >
      </span>
    </div>
    <span
      v-if="showValue"
      :class="styles.value"
      aria-hidden="true"
      v-bind="hooks('slider', 'value')"
      >{{ valueText }}</span
    >
    <template v-if="name">
      <input
        v-for="(v, index) in values"
        :key="index"
        type="hidden"
        :name="name"
        :value="v"
        :disabled="isDisabled"
        v-bind="hooks('slider', 'input')"
      />
    </template>
  </div>
</template>
