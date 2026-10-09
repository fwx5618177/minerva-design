<script setup lang="ts">
import { inject } from "vue";
import type { TabsContext } from "./tabs-context";
const props = withDefaults(defineProps<{ label?: string; loop?: boolean }>(), {
  loop: true,
});
const root = inject<TabsContext | undefined>("minerva:tabs", undefined);
function keys(event: KeyboardEvent) {
  const vertical = root?.orientation.value === "vertical";
  const previous = vertical
      ? "ArrowUp"
      : root?.dir.value === "rtl"
        ? "ArrowRight"
        : "ArrowLeft",
    next = vertical
      ? "ArrowDown"
      : root?.dir.value === "rtl"
        ? "ArrowLeft"
        : "ArrowRight";
  if (![previous, next, "Home", "End"].includes(event.key)) return;
  const el = event.currentTarget as HTMLElement;
  const tabs = Array.from(
    el.querySelectorAll<HTMLElement>('[role="tab"]'),
  ).filter((tab) => tab.getAttribute("aria-disabled") !== "true");
  const at = tabs.indexOf(event.target as HTMLElement);
  let target =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : at + (event.key === next ? 1 : -1);
  target = props.loop
    ? (target + tabs.length) % tabs.length
    : Math.max(0, Math.min(tabs.length - 1, target));
  if (tabs[target]) {
    event.preventDefault();
    tabs[target].focus();
  }
}
</script>
<template>
  <view
    class="mn-tabs-list"
    role="tablist"
    :aria-orientation="root?.orientation.value ?? 'horizontal'"
    :aria-label="label"
    @keydown="keys"
    ><slot>{{ label }}</slot></view
  >
</template>
