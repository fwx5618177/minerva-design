<script setup lang="ts">
import { ref } from "vue";
import DialogSurface from "./DialogSurface.vue";
import type { DrawerProps } from "./drawer-types";
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<DrawerProps>(), {
  open: undefined,
  modal: undefined,
  closeOnOverlayClick: undefined,
});
const emit = defineEmits([
  "openChange",
  "update:open",
  "close",
  "confirm",
  "cancel",
  "openAutoFocus",
  "closeAutoFocus",
  "escapeKeyDown",
  "pointerDownOutside",
  "interactOutside",
]);
const events = [
  "openChange",
  "update:open",
  "close",
  "confirm",
  "cancel",
  "openAutoFocus",
  "closeAutoFocus",
  "escapeKeyDown",
  "pointerDownOutside",
  "interactOutside",
] as const;
const handlers = Object.fromEntries(
  events.map((event) => [event, (...args: unknown[]) => emit(event, ...args)]),
);
const surface = ref<any>();
defineExpose({
  dismissOutside: (event?: Event) => surface.value?.dismissOutside(event),
  close: () => surface.value?.close(),
  element: () => surface.value?.element,
});
</script>
<template>
  <DialogSurface
    ref="surface"
    @openChange="handlers['openChange']"
    @update:open="handlers['update:open']"
    @close="handlers['close']"
    @confirm="handlers['confirm']"
    @cancel="handlers['cancel']"
    @openAutoFocus="handlers['openAutoFocus']"
    @closeAutoFocus="handlers['closeAutoFocus']"
    @escapeKeyDown="handlers['escapeKeyDown']"
    @pointerDownOutside="handlers['pointerDownOutside']"
    @interactOutside="handlers['interactOutside']"
    v-bind="{ ...$attrs, ...props }"
    kind="drawer"
    ><template v-if="$slots.default" #default><slot name="default" /></template
    ><template v-if="$slots.trigger" #trigger><slot name="trigger" /></template
    ><template v-if="$slots.title" #title><slot name="title" /></template
    ><template v-if="$slots.description" #description
      ><slot name="description" /></template
    ><template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </DialogSurface>
</template>
