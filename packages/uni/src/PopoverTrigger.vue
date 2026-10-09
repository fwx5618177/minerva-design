<script setup lang="ts">
// #ifdef H5
import H5Slot from "./H5Slot";
// #endif
import {
  inject,
  ref,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import type { MiniPopoverContext } from "./popover-context";
const props = defineProps<{ disabled?: boolean; asChild?: boolean }>();
const h5 = typeof document !== "undefined";
function activate(event: Event) {
  if (!props.disabled && !event.defaultPrevented)
    root?.setOpen(!root.open.value);
}
const root = inject<MiniPopoverContext | undefined>(
  "minerva:popover",
  undefined,
);
const element = ref<any>();
const instance = getCurrentInstance();
onMounted(() => {
  if (root) {
    root.trigger.value = element.value;
    root.measureTrigger = (callback) => {
      uni
        .createSelectorQuery?.()
        .in(instance?.proxy)
        .select(`#${root.triggerId}`)
        .boundingClientRect((rect) => {
          if (
            !Array.isArray(rect) &&
            typeof rect.width === "number" &&
            typeof rect.height === "number"
          ) {
            callback({
              left: rect.left ?? 0,
              right: rect.right ?? (rect.left ?? 0) + rect.width,
              top: rect.top ?? 0,
              bottom: rect.bottom ?? (rect.top ?? 0) + rect.height,
              width: rect.width,
              height: rect.height,
            });
          }
        })
        .exec();
    };
  }
});
onBeforeUnmount(() => {
  if (root && root.trigger.value === element.value)
    root.trigger.value = undefined;
});
</script>
<template>
  <!-- #ifdef H5 -->
  <H5Slot
    v-if="asChild && h5"
    ref="element"
    :id="root?.triggerId"
    class="mn-popover-trigger"
    :disabled="disabled || root?.disabled.value"
    :aria-expanded="root?.open.value"
    @click="activate"
    ><slot
  /></H5Slot>
  <!-- #endif -->
  <button
    v-if="!(asChild && h5)"
    ref="element"
    :id="root?.triggerId"
    class="mn-button mn-popover-trigger"
    :disabled="disabled || root?.disabled.value"
    :class="{ 'mn-disabled': disabled || root?.disabled.value }"
    :aria-expanded="root?.open.value"
    @tap.stop="!disabled && root?.setOpen(!root.open.value)"
  >
    <slot />
  </button>
</template>
