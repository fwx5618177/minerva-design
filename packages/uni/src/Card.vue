<script setup lang="ts">
import { useSlots, computed, Fragment } from "vue";
const slots = useSlots();
function hasSection(nodes: any[]): boolean {
  return nodes.some((v) =>
    v.type === Fragment
      ? hasSection(v.children ?? [])
      : typeof v.type === "object" &&
        String(v.type.__name ?? v.type.name ?? "").startsWith("Card"),
  );
}
const authored = computed(() => hasSection(slots.default?.() ?? []));
const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    variant?: string;
    padding?: "none" | "small" | "medium" | "large";
    interactive?: boolean;
    hoverable?: boolean;
    disabled?: boolean;
    as?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
  }>(),
  { variant: "default" },
);
const emit = defineEmits<{ click: [event: unknown] }>();
function activate(event: unknown) {
  if (props.disabled) return;
  emit("click", event);
  if (props.href?.startsWith("/") && !props.href.startsWith("//"))
    uni.navigateTo?.({ url: props.href });
}
function keydown(e: KeyboardEvent) {
  if (
    (props.interactive || props.as === "button" || props.href) &&
    (e.key === "Enter" || e.key === " ")
  ) {
    e.preventDefault();
    activate(e);
  }
}
</script>
<template>
  <view
    class="mn-card mn-uni-card"
    :class="[
      `mn-padding-${padding}`,
      'mn-card-padded',
      `mn-card-${variant}`,
      { 'mn-hoverable': hoverable || interactive, 'mn-disabled': disabled },
    ]"
    :data-padding="padding"
    :role="as === 'button' ? 'button' : href ? 'link' : undefined"
    :tabindex="
      (interactive || as === 'button' || href) && !disabled ? 0 : undefined
    "
    :aria-disabled="disabled || undefined"
    @tap="activate"
    @keydown="keydown"
    ><view v-if="title || description || $slots.header" class="mn-card-header"
      ><text v-if="title" class="mn-title">{{ title }}</text
      ><text v-if="description" class="mn-muted">{{ description }}</text
      ><slot name="header" /></view
    ><slot v-if="authored" /><view v-else class="mn-card-content"><slot /></view
    ><view v-if="$slots.footer" class="mn-card-footer"
      ><slot name="footer" /></view
  ></view>
</template>
