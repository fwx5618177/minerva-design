<script setup lang="ts">
/**
 * Flashcard: a two-sided study card that flips between a front (the prompt)
 * and a back (the answer) with a 3D rotation (a crossfade under
 * `prefers-reduced-motion`). Both faces share one grid cell, so the card is
 * as tall as the taller face. The card is a toggle button (`aria-pressed`
 * while the back shows): click, Enter or Space flips it, except clicks on
 * interactive content inside a face. The hidden face is `inert`; the back is
 * a polite live region. Slots: `front`, `back` and `footer` (below the card,
 * not flipped, e.g. rating buttons). The flipped state is `v-model:flipped`.
 */
import { computed, useAttrs, useId, useSlots } from "vue";
import { isInteractiveEventTarget } from "@minerva/dom";
import styles from "@react-styles/components/Flashcard/flashcard.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { useI18n } from "../../config/useI18n";
import type { FlashcardProps } from "./types";

defineOptions({ name: "Flashcard", inheritAttrs: false });

const props = withDefaults(defineProps<FlashcardProps>(), {
  front: undefined,
  back: undefined,
  frontLabel: undefined,
  backLabel: undefined,
  hint: undefined,
  showHint: false,
  flipped: undefined,
  defaultFlipped: false,
  flipOnClick: true,
  disabled: false,
  axis: "y",
  variant: "elevated",
  size: "medium",
  minHeight: "12rem",
  "aria-label": undefined,
});

const emit = defineEmits<{
  /** `v-model:flipped`: the next flipped state */
  "update:flipped": [flipped: boolean];
  /** The next flipped state */
  flippedChange: [flipped: boolean];
}>();

defineSlots<{
  /** Content of the front face (the prompt) */
  front?: () => unknown;
  /** Content of the back face (the answer) */
  back?: () => unknown;
  /** Content below the card, not flipped (e.g. rating buttons) */
  footer?: () => unknown;
}>();

const attrs = useAttrs();
const slots = useSlots();
const { t } = useI18n();
const id = useId();

const flipped = useControllable<boolean>(props, "flipped", {
  fallback: false,
  onChange: (next) => emit("flippedChange", next),
  name: "Flashcard",
});

// `aria-label` is a declared prop: Vue stores it camelized
const ariaLabel = computed(
  () => (props as unknown as { ariaLabel?: string }).ariaLabel,
);

const interactive = computed(() => props.flipOnClick && !props.disabled);
const frontCaption = computed(() =>
  props.frontLabel === undefined ? t("flashcard.frontLabel") : props.frontLabel,
);
const backCaption = computed(() =>
  props.backLabel === undefined ? t("flashcard.backLabel") : props.backLabel,
);
const hintText = computed(() => props.hint ?? t("flashcard.hint"));
const cardLabel = computed(() => {
  if (ariaLabel.value) return ariaLabel.value;
  const caption = flipped.value ? backCaption.value : frontCaption.value;
  const face =
    caption ||
    t(flipped.value ? "flashcard.backLabel" : "flashcard.frontLabel");
  return t("flashcard.label", { face });
});

function toggle() {
  if (interactive.value) flipped.value = !flipped.value;
}

function onClick(event: MouseEvent) {
  if (!props.flipOnClick) return;
  if (isInteractiveEventTarget(event, event.currentTarget as Element)) return;
  toggle();
}

function onKeydown(event: KeyboardEvent) {
  if (!props.flipOnClick || event.target !== event.currentTarget) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  if (!event.repeat) toggle();
}

const state = computed(() => (flipped.value ? "active" : "inactive"));
const rootAttrs = computed(() => ({
  ...attrs,
  class: [
    styles.flashcard,
    styles[props.variant],
    styles[props.size],
    props.axis === "x" && styles.axisX,
    flipped.value && styles.flipped,
    props.disabled && styles.disabled,
    attrs.class,
  ],
  style: [
    {
      "--flashcard-min-height":
        typeof props.minHeight === "number"
          ? `${props.minHeight}px`
          : props.minHeight,
    },
    attrs.style,
  ],
  ...hooks("flashcard", "root", {
    state: state.value,
    disabled: props.disabled,
    variant: props.variant,
    size: props.size,
  }),
}));
const cardAttrs = computed(() => ({
  class: [styles.card, props.flipOnClick && styles.interactive],
  ...(props.flipOnClick
    ? {
        role: "button",
        tabindex: props.disabled ? -1 : 0,
        "aria-pressed": flipped.value,
        "aria-disabled": props.disabled || undefined,
      }
    : { role: "group" }),
  "aria-label": cardLabel.value,
  "aria-describedby": `${id}-${flipped.value ? "back" : "front"}`,
  ...hooks("flashcard", "card", {
    state: state.value,
    disabled: props.disabled,
  }),
}));
const showFooter = computed(() => Boolean(slots.footer));
</script>

<template>
  <div v-bind="rootAttrs">
    <div v-bind="cardAttrs" @click="onClick" @keydown="onKeydown">
      <div :class="styles.inner">
        <div
          :class="[styles.face, styles.front]"
          v-bind="hooks('flashcard', 'front')"
          :aria-hidden="flipped || undefined"
          :inert="flipped"
        >
          <span
            v-if="frontCaption"
            :class="styles.label"
            v-bind="hooks('flashcard', 'label')"
            >{{ frontCaption }}</span
          >
          <div :id="`${id}-front`" :class="styles.content">
            <slot name="front">{{ front }}</slot>
          </div>
          <span
            v-if="showHint && flipOnClick && hintText"
            :class="styles.hint"
            v-bind="hooks('flashcard', 'hint')"
            >{{ hintText }}</span
          >
        </div>
        <div
          :class="[styles.face, styles.back]"
          v-bind="hooks('flashcard', 'back')"
          :aria-hidden="!flipped || undefined"
          :inert="!flipped"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            v-if="backCaption"
            :class="styles.label"
            v-bind="hooks('flashcard', 'label')"
            >{{ backCaption }}</span
          >
          <div :id="`${id}-back`" :class="styles.content">
            <slot name="back">{{ back }}</slot>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showFooter"
      :class="styles.footer"
      v-bind="hooks('flashcard', 'footer')"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
