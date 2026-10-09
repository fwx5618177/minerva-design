<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useI18n } from "./i18n";
import ProgressIndicator from "./ProgressIndicator.vue";
const props = withDefaults(
  defineProps<{
    closable?: boolean;
    disabled?: boolean;
    color?: string;
    variant?: "subtle" | "outline" | "solid";
    status?: string;
    size?: "small" | "medium" | "large";
    shape?: "square" | "rounded" | "circle";
    clickable?: boolean;
    pressed?: boolean;
    loading?: boolean;
    elevation?: boolean;
    icon?: string;
    closeIcon?: string;
    closeLabel?: string | ((label: string) => string);
    ripple?: boolean;
  }>(),
  {
    color: "neutral",
    variant: "subtle",
    size: "medium",
    shape: "rounded",
    pressed: undefined,
    ripple: true,
  },
);
const emit = defineEmits<{
  click: [event: unknown];
  close: [event: unknown];
}>();
const slots = useSlots();
const { t } = useI18n();
function textOf(nodes: any[]): string {
  return nodes
    .map((node) =>
      typeof node.children === "string"
        ? node.children
        : Array.isArray(node.children)
          ? textOf(node.children)
          : "",
    )
    .join("");
}
const label = computed(() => textOf(slots.default?.() ?? []));
const closeText = computed(() =>
  typeof props.closeLabel === "function"
    ? props.closeLabel(label.value)
    : (props.closeLabel ??
      (label.value
        ? t("tag.closeWithLabel", { label: label.value })
        : t("tag.close"))),
);
const color = computed(() =>
  props.status
    ? props.status === "error"
      ? "danger"
      : props.status
    : props.color,
);
function click(event: unknown) {
  if (props.clickable && !props.disabled && !props.loading)
    emit("click", event);
}
function close(event: unknown) {
  if (!props.disabled && !props.loading) emit("close", event);
}
</script>
<template>
  <view
    class="mn-tag mn-uni-tag"
    :class="[
      `mn-tone-${color}`,
      `mn-tag-${variant}`,
      `mn-tag-${size}`,
      `mn-tag-${shape}`,
      {
        'mn-disabled': disabled,
        'mn-tag-elevated': elevation,
        'mn-tag-pressed': pressed,
      },
    ]"
    :data-color="color"
    :aria-busy="loading || undefined"
  >
    <ProgressIndicator
      v-if="loading"
      decorative
      size="xsmall"
      color="current"
    /><template v-else
      ><slot name="avatar" /><slot name="icon"
        ><text v-if="icon">{{ icon }}</text></slot
      ></template
    >
    <button
      v-if="clickable"
      data-tag-action
      class="mn-tag-action"
      :hover-class="ripple ? 'mn-tag-ripple' : 'none'"
      :disabled="disabled || loading"
      :aria-pressed="pressed"
      @tap="click"
    >
      <slot /></button
    ><slot v-else />
    <button
      v-if="closable && !loading"
      class="mn-close"
      :disabled="disabled"
      :aria-label="closeText"
      @tap.stop="close"
    >
      <slot name="close-icon">{{ closeIcon ?? "×" }}</slot>
    </button>
  </view>
</template>
