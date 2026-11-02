<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { isInteractiveEventTarget } from "@minerva/dom";
import { useI18n } from "./i18n";
import { useNativeId as useId } from "./native-id";
const props = withDefaults(
  defineProps<{
    front?: string;
    back?: string;
    frontLabel?: string | null;
    backLabel?: string | null;
    hint?: string;
    showHint?: boolean;
    flipped?: boolean;
    defaultFlipped?: boolean;
    flipOnClick?: boolean;
    disabled?: boolean;
    axis?: "y" | "x";
    variant?: "elevated" | "outline" | "filled";
    size?: "small" | "medium" | "large";
    minHeight?: number | string;
    ariaLabel?: string;
  }>(),
  {
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
    ariaLabel: undefined,
  },
);
const emit = defineEmits<{
  flippedChange: [flipped: boolean];
  "update:flipped": [flipped: boolean];
}>();
const slots = useSlots();
const { t } = useI18n();
const uid = `mn-flashcard-${useId().replace(/[^a-z0-9]/gi, "")}`;
const local = ref(props.defaultFlipped);
const isFlipped = computed(() => props.flipped ?? local.value);
const frontCaption = computed(() =>
  props.frontLabel === undefined ? t("flashcard.frontLabel") : props.frontLabel,
);
const backCaption = computed(() =>
  props.backLabel === undefined ? t("flashcard.backLabel") : props.backLabel,
);
const hintText = computed(() => props.hint ?? t("flashcard.hint"));
const label = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  const caption = isFlipped.value ? backCaption.value : frontCaption.value;
  const face =
    caption ||
    t(isFlipped.value ? "flashcard.backLabel" : "flashcard.frontLabel");
  return t("flashcard.label", { face });
});
const minHeightValue = computed(() =>
  typeof props.minHeight === "number"
    ? `${props.minHeight}px`
    : props.minHeight,
);
const state = computed(() => (isFlipped.value ? "active" : "inactive"));
function toggle() {
  if (!props.flipOnClick || props.disabled) return;
  const next = !isFlipped.value;
  if (props.flipped === undefined) local.value = next;
  emit("flippedChange", next);
  emit("update:flipped", next);
}
function tap(event: Event) {
  const card = event.currentTarget;
  if (
    typeof Element !== "undefined" &&
    card instanceof Element &&
    isInteractiveEventTarget(event, card)
  )
    return;
  toggle();
}
function keydown(event: KeyboardEvent) {
  if (event.target !== event.currentTarget || event.isComposing) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  if (!event.repeat) toggle();
}
</script>
<template>
  <view
    class="mn-flashcard"
    :class="[
      `mn-variant-${variant}`,
      `mn-size-${size}`,
      {
        'mn-axis-x': axis === 'x',
        'mn-flipped': isFlipped,
        'mn-disabled': disabled,
      },
    ]"
    :style="{ '--flashcard-min-height': minHeightValue }"
    data-minerva="flashcard"
    data-part="root"
    :data-state="state"
    :data-disabled="disabled ? '' : undefined"
    :data-variant="variant"
    :data-size="size"
  >
    <view
      class="mn-flashcard__card"
      :class="{ 'mn-interactive': flipOnClick }"
      data-minerva="flashcard"
      data-part="card"
      :data-state="state"
      :data-disabled="disabled ? '' : undefined"
      :role="flipOnClick ? 'button' : 'group'"
      :tabindex="flipOnClick ? (disabled ? -1 : 0) : undefined"
      :aria-pressed="flipOnClick ? isFlipped : undefined"
      :aria-disabled="flipOnClick && disabled ? true : undefined"
      :aria-label="label"
      :aria-describedby="`${uid}-${isFlipped ? 'back' : 'front'}`"
      @tap="tap"
      @keydown="keydown"
    >
      <view class="mn-flashcard__inner">
        <view
          class="mn-flashcard__face mn-flashcard__front"
          :class="{ 'mn-hidden-face': isFlipped }"
          data-minerva="flashcard"
          data-part="front"
          :aria-hidden="isFlipped || undefined"
        >
          <text
            v-if="frontCaption"
            class="mn-flashcard__label"
            data-minerva="flashcard"
            data-part="label"
            >{{ frontCaption }}</text
          >
          <view :id="`${uid}-front`" class="mn-flashcard__content"
            ><slot name="front">{{ front }}</slot></view
          >
          <text
            v-if="showHint && flipOnClick && hintText"
            class="mn-flashcard__hint"
            data-minerva="flashcard"
            data-part="hint"
            >{{ hintText }}</text
          >
        </view>
        <view
          class="mn-flashcard__face mn-flashcard__back"
          :class="{ 'mn-hidden-face': !isFlipped }"
          data-minerva="flashcard"
          data-part="back"
          :aria-hidden="!isFlipped || undefined"
          aria-live="polite"
          aria-atomic="true"
        >
          <text
            v-if="backCaption"
            class="mn-flashcard__label"
            data-minerva="flashcard"
            data-part="label"
            >{{ backCaption }}</text
          >
          <view :id="`${uid}-back`" class="mn-flashcard__content"
            ><slot name="back">{{ back }}</slot></view
          >
        </view>
      </view>
    </view>
    <view
      v-if="slots.footer"
      class="mn-flashcard__footer"
      data-minerva="flashcard"
      data-part="footer"
      ><slot name="footer"
    /></view>
  </view>
</template>
