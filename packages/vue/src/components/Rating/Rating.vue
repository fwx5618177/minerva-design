<script setup lang="ts">
/**
 * Rating: displays a score as 5 stars (any 0..max scale), optionally with
 * the value and the number of ratings. With a `change` / `update:modelValue`
 * listener (`v-model`) it becomes an interactive slider (hover preview,
 * half-star clicks, keyboard): arrows step half a star (`max / 10`; in RTL
 * ArrowLeft increases), PageUp / PageDown one whole star, Home / End jump to
 * 0 / `max`; all clamped to 0..max.
 */
import { computed, getCurrentInstance, useAttrs } from "vue";
import {
  createRatingMachine,
  getRatingKeyValue,
  getRatingStarFills,
  RATING_STAR_COUNT,
} from "@minerva/core";
import styles from "@react-styles/components/Rating/rating.module.scss";
import { hooks } from "../../internal/hooks";
import { useMachine } from "../../internal/machine";
import { logicalArrowKey } from "../../internal/direction";
import RatingStar from "./RatingStar.vue";
import type { RatingProps } from "./types";

defineOptions({ name: "Rating", inheritAttrs: false });

const SIZE_PX = { small: 12, medium: 16, large: 20 } as const;
const STARS = Array.from({ length: RATING_STAR_COUNT }, (_, i) => i);

const props = withDefaults(defineProps<RatingProps>(), {
  max: 10,
  size: "medium",
  showValue: false,
  ratingCount: undefined,
  readOnly: false,
});
const emit = defineEmits<{
  "update:modelValue": [value: number];
  /** The user changed the score */
  change: [value: number];
}>();

const attrs = useAttrs();
const vnodeProps = getCurrentInstance()?.vnode.props ?? {};
const interactive = computed(
  () =>
    !props.readOnly &&
    ("onChange" in vnodeProps || "onUpdate:modelValue" in vnodeProps),
);

// Hover preview, picks and keys: core's rating machine (the score stays
// controlled by `modelValue`).
const { state, send } = useMachine(createRatingMachine, () => ({
  value: props.modelValue,
  max: props.max,
  readOnly: !interactive.value,
  onValueChange: (value: number) => {
    emit("update:modelValue", value);
    emit("change", value);
  },
}));
const fills = computed(() => getRatingStarFills(state.value, props.max));

function onStarClick(event: MouseEvent, index: number) {
  // Left half of a star -> half star, right half -> full star.
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const leftHalf = event.clientX - rect.left < rect.width / 2;
  send({ type: "PICK", index, half: leftHalf });
}

function onKeyDown(event: KeyboardEvent) {
  // The consumer's @keydown ran first; preventDefault() takes over the key.
  if (event.defaultPrevented || !interactive.value) return;
  // Stars follow the reading direction: in RTL ArrowLeft increases.
  const key = logicalArrowKey(event.key, event.currentTarget as Element);
  if (getRatingKeyValue(key, props.modelValue, props.max) === null) return;
  event.preventDefault();
  send({ type: "KEY", key });
}

const px = computed(() => SIZE_PX[props.size]);
const rootAttrs = computed(() => {
  const label =
    (attrs["aria-label"] as string | undefined) ??
    `${props.modelValue.toFixed(1)} / ${props.max}`;
  const base = {
    ...attrs,
    class: [
      styles.rating,
      styles[props.size],
      interactive.value && styles.interactive,
      attrs.class,
    ],
    "aria-label": label,
  };
  const a11y = interactive.value
    ? {
        role: "slider",
        "aria-valuenow": props.modelValue,
        "aria-valuemin": 0,
        "aria-valuemax": props.max,
        tabindex: 0,
      }
    : { role: "img" };
  return {
    ...base,
    ...a11y,
    ...hooks("rating", "root", {
      readonly: !interactive.value,
      size: props.size,
    }),
  };
});
</script>

<template>
  <span
    v-bind="rootAttrs"
    @keydown="onKeyDown"
    @mouseleave="interactive && send({ type: 'HOVER_END' })"
  >
    <span
      :class="styles.stars"
      aria-hidden="true"
      v-bind="hooks('rating', 'stars')"
    >
      <template v-if="interactive">
        <button
          v-for="i in STARS"
          :key="i"
          type="button"
          tabindex="-1"
          :class="styles.starButton"
          @click="onStarClick($event, i)"
          @mouseenter="send({ type: 'HOVER', index: i })"
        >
          <RatingStar :fill="fills[i]" :size="px" />
        </button>
      </template>
      <template v-else>
        <RatingStar v-for="i in STARS" :key="i" :fill="fills[i]" :size="px" />
      </template>
    </span>
    <span
      v-if="showValue"
      :class="styles.value"
      v-bind="hooks('rating', 'value')"
    >
      <strong>{{ modelValue.toFixed(1) }}</strong>
      <span
        v-if="ratingCount !== undefined"
        :class="styles.count"
        v-bind="hooks('rating', 'count')"
      >
        ({{ ratingCount.toLocaleString("en-US") }})
      </span>
    </span>
  </span>
</template>
