<script setup lang="ts">
/**
 * Avatar: a picture of a person, falling back to their initials (or custom
 * fallback content) when there is no image or it fails to load.
 */
import { computed, ref, useAttrs, type CSSProperties } from "vue";
import styles from "@react-styles/components/Avatar/avatar.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import type { AvatarProps } from "./types";

defineOptions({ name: "Avatar", inheritAttrs: false });

const props = withDefaults(defineProps<AvatarProps>(), {
  src: undefined,
  name: "",
  alt: undefined,
  fallback: undefined,
  shape: "circle",
  size: "medium",
  stacked: false,
});

const slots = defineSlots<{
  /** Fallback content used when there is no name (e.g. an icon) */
  default?: () => unknown;
  /** Custom fallback content shown instead of the initials (the `fallback` prop) */
  fallback?: () => unknown;
}>();

const CJK = /[㐀-鿿豈-﫿]/;

/**
 * Initials of a name: the first CJK character, otherwise the uppercased first
 * letters of the first two words ("Ada Lovelace" -> "AL", "张三" -> "张").
 */
function getAvatarInitials(name?: string): string {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return "";
  if (CJK.test(trimmed[0])) return trimmed[0];
  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

const attrs = useAttrs();
const { t } = useI18n();

// The src that failed to load: a new src is tried again automatically.
const failedSrc = ref<string | undefined>(undefined);
const showImage = computed(
  () => Boolean(props.src) && failedSrc.value !== props.src,
);
const label = computed(
  () =>
    (attrs["aria-label"] as string | undefined) ??
    (props.name || t("avatar.default")),
);
const initials = computed(() => getAvatarInitials(props.name));
const numericSize = computed(() => typeof props.size === "number");

const classes = computed(() => [
  styles.avatar,
  styles[props.shape],
  !numericSize.value && styles[props.size as string],
  props.stacked && styles.stacked,
]);
const sizeStyle = computed<CSSProperties | undefined>(() =>
  numericSize.value
    ? ({
        "--avatar-size": `${props.size}px`,
        width: `${props.size}px`,
        height: `${props.size}px`,
      } as CSSProperties)
    : undefined,
);
const rootAttrs = computed(() => {
  const { "aria-label": _label, ...rest } = attrs;
  return {
    ...rest,
    ...hooks("avatar", "root", {
      size: numericSize.value ? undefined : (props.size as string),
      shape: props.shape,
    }),
  };
});
// The fallback is exposed as a single image named after the person, so
// screen readers announce "Alice" instead of the letter "A".
const onError = () => {
  failedSrc.value = props.src;
};
</script>

<template>
  <span
    v-if="showImage"
    :class="classes"
    :style="sizeStyle"
    v-bind="rootAttrs"
  >
    <img
      :alt="alt ?? label"
      :class="styles.avatarImg"
      :src="src"
      draggable="false"
      v-bind="hooks('avatar', 'image')"
      @error="onError"
    />
  </span>
  <span
    v-else
    role="img"
    :aria-label="label"
    :class="classes"
    :style="sizeStyle"
    v-bind="rootAttrs"
  >
    <span
      :class="styles.avatarText"
      aria-hidden="true"
      v-bind="hooks('avatar', 'fallback')"
    >
      <slot v-if="fallback !== undefined || slots.fallback" name="fallback">{{
        fallback
      }}</slot>
      <template v-else-if="initials">{{ initials }}</template>
      <slot v-else />
    </span>
  </span>
</template>
