<script setup lang="ts">
/**
 * Tag: a small label for marking and categorizing.
 *
 * The root is a plain (non-interactive) element. When `clickable`, the
 * content is rendered as a native <button> (which also draws the ripple);
 * when `closable`, the close control is a sibling <button>, so interactive
 * elements are never nested. With `pressed` a clickable tag is a toggle
 * (aria-pressed), e.g. a selectable filter. Attributes go to the root.
 */
import {
  computed,
  onBeforeUnmount,
  ref,
  useAttrs,
  type CSSProperties,
} from "vue";
import styles from "@react-styles/components/Tag/tag.module.scss";
import { hooks } from "../../internal/hooks";
import { IconX } from "../../internal/icons";
import { textOf } from "../../internal/children";
import { useI18n } from "../../config/useI18n";
import type { TagProps } from "./types";

defineOptions({ name: "Tag", inheritAttrs: false });

const props = withDefaults(defineProps<TagProps>(), {
  color: "neutral",
  variant: "subtle",
  size: "medium",
  shape: "rounded",
  closable: false,
  clickable: false,
  pressed: undefined,
  loading: false,
  elevation: false,
  disabled: false,
  closeLabel: undefined,
  ripple: true,
});

const emit = defineEmits<{
  /** The tag was activated (clickable, not disabled / loading) */
  click: [event: MouseEvent];
  /** The close button was clicked (not while disabled) */
  close: [event: MouseEvent];
}>();

const slots = defineSlots<{
  /** Content of the tag */
  default?: () => unknown;
  /** Icon displayed before the content */
  icon?: () => unknown;
  /** Avatar (e.g. a small Avatar or image) displayed before the content */
  avatar?: () => unknown;
  /** Custom close icon */
  "close-icon"?: () => unknown;
}>();

const RIPPLE_DURATION = 600;

const attrs = useAttrs();
const { t } = useI18n();

interface Ripple {
  id: number;
  style: CSSProperties;
}
const ripples = ref<Ripple[]>([]);
let nextRippleId = 0;
const timers = new Set<ReturnType<typeof setTimeout>>();
onBeforeUnmount(() => {
  timers.forEach(clearTimeout);
  timers.clear();
});

const inactive = computed(() => props.disabled || props.loading);

/** The close button names the tag it removes: "Remove {label}" */
const closeLabelOf = (children: unknown) => {
  const label = textOf(children);
  if (typeof props.closeLabel === "function") return props.closeLabel(label);
  return (
    props.closeLabel ??
    (label ? t("tag.closeWithLabel", { label }) : t("tag.close"))
  );
};

// The ripple is drawn over the whole tag, from where its main action (the
// native button) was pressed.
const addRipple = (event: MouseEvent) => {
  if (!props.ripple) return;
  const tag = (event.currentTarget as HTMLElement).parentElement as HTMLElement;
  const rect = tag.getBoundingClientRect();
  // keyboard-activated clicks (detail === 0) ripple from the center
  const fromKeyboard = event.detail === 0;
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;
  const id = nextRippleId++;
  ripples.value.push({
    id,
    style: {
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${fromKeyboard ? rect.width / 2 - radius : event.clientX - rect.left - radius}px`,
      top: `${fromKeyboard ? rect.height / 2 - radius : event.clientY - rect.top - radius}px`,
    },
  });
  const timer = setTimeout(() => {
    timers.delete(timer);
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, RIPPLE_DURATION);
  timers.add(timer);
};

const onClick = (event: MouseEvent) => {
  if (inactive.value) return;
  addRipple(event);
  emit("click", event);
};

const onClose = (event: MouseEvent) => {
  // The close button is not part of the tag's main action / ripple.
  event.stopPropagation();
  if (!props.disabled) emit("close", event);
};

const classes = computed(() => [
  styles.tag,
  styles[props.color],
  styles[props.variant],
  styles[props.size],
  styles[props.shape],
  props.clickable && !inactive.value && styles.clickable,
  props.clickable && props.pressed && styles.pressed,
  props.elevation && styles.elevation,
  props.disabled && styles.disabled,
  props.loading && styles.loading,
]);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("tag", "root", {
    state: props.clickable && props.pressed ? "active" : "inactive",
    disabled: props.disabled,
    loading: props.loading,
    size: props.size,
    variant: props.variant,
    color: props.color,
    shape: props.shape,
  }),
}));
</script>

<template>
  <div
    :class="classes"
    :aria-busy="loading || undefined"
    data-component="tag"
    v-bind="rootAttrs"
  >
    <button
      v-if="clickable"
      type="button"
      :class="styles.action"
      :disabled="inactive"
      :aria-pressed="pressed"
      v-bind="hooks('tag', 'action')"
      @click="onClick"
    >
      <span
        v-if="loading"
        :class="styles.spinner"
        aria-hidden="true"
        v-bind="hooks('tag', 'spinner')"
      />
      <template v-else>
        <span
          v-if="slots.icon"
          :class="styles.icon"
          v-bind="hooks('tag', 'icon')"
        >
          <slot name="icon" />
        </span>
        <span
          v-if="slots.avatar"
          :class="styles.avatar"
          v-bind="hooks('tag', 'avatar')"
        >
          <slot name="avatar" />
        </span>
      </template>
      <span :class="styles.content" v-bind="hooks('tag', 'label')">
        <slot />
      </span>
    </button>
    <template v-else>
      <span
        v-if="loading"
        :class="styles.spinner"
        aria-hidden="true"
        v-bind="hooks('tag', 'spinner')"
      />
      <template v-else>
        <span
          v-if="slots.icon"
          :class="styles.icon"
          v-bind="hooks('tag', 'icon')"
        >
          <slot name="icon" />
        </span>
        <span
          v-if="slots.avatar"
          :class="styles.avatar"
          v-bind="hooks('tag', 'avatar')"
        >
          <slot name="avatar" />
        </span>
      </template>
      <span :class="styles.content" v-bind="hooks('tag', 'label')">
        <slot />
      </span>
    </template>
    <template v-if="closable && !loading">
      <button
        v-for="closeName in [closeLabelOf($slots.default?.())]"
        key="close"
        type="button"
        :class="styles.closeIcon"
        :disabled="disabled"
        :aria-label="closeName"
        :title="closeName"
        v-bind="hooks('tag', 'close-button')"
        @click="onClose"
      >
        <slot name="close-icon">
          <IconX aria-hidden="true" focusable="false" />
        </slot>
      </button>
    </template>
    <span
      v-for="r in ripples"
      :key="r.id"
      :class="styles.ripple"
      :style="r.style"
    />
  </div>
</template>
