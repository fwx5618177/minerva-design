<script setup lang="ts">
// #ifdef H5
import H5Slot from "./H5Slot";
// #endif
const h5 = typeof document !== "undefined";
import {
  inject,
  ref,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import { useNativeId as useId } from "./native-id";
import type { MiniPopoverContext } from "./popover-context";
const props = defineProps<{ id?: string; asChild?: boolean }>();
const generated = `mn-popover-anchor-${useId().replace(/[^a-z0-9]/gi, "")}`;
const root = inject<MiniPopoverContext | undefined>(
    "minerva:popover",
    undefined,
  ),
  element = ref<any>();
const instance = getCurrentInstance();
onMounted(() => {
  if (root) {
    root.anchor.value = element.value;
    root.anchorId.value = props.id ?? generated;
    root.measureAnchor = (callback) => {
      uni
        .createSelectorQuery?.()
        .in(instance?.proxy)
        .select(`#${props.id ?? generated}`)
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
  if (root && root.anchor.value === element.value) {
    root.anchor.value = undefined;
    root.anchorId.value = "";
    root.measureAnchor = undefined;
  }
});
</script>
<template>
  <!-- #ifdef H5 -->
  <H5Slot
    v-if="asChild && h5"
    ref="element"
    :id="id ?? generated"
    class="mn-popover-anchor"
    ><slot
  /></H5Slot>
  <!-- #endif -->
  <view
    v-if="!(asChild && h5)"
    ref="element"
    :id="id ?? generated"
    class="mn-popover-anchor"
    ><slot
  /></view>
</template>
