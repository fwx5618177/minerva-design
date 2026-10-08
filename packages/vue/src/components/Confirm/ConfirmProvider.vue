<script setup lang="ts">
/**
 * ConfirmProvider: renders confirmations inside the application tree (shared
 * context, theme scope, test boundaries). Optional: `confirm()` works
 * without it. Pending requests resolve `false` when it unmounts.
 */
import { onBeforeUnmount, onMounted, provide } from "vue";
import { ConfirmQueue } from "./queue";
import { ConfirmQueueView } from "./ConfirmQueueView";
import { CONFIRM_KEY, providerStack } from "./confirm";

defineOptions({ name: "ConfirmProvider" });
defineSlots<{
  /** Application subtree; `useConfirm()` / `confirm()` dialogs render here */
  default?: () => unknown;
}>();

const queue = new ConfirmQueue();
provide(CONFIRM_KEY, queue);
onMounted(() => {
  providerStack.push(queue);
});
onBeforeUnmount(() => {
  const index = providerStack.lastIndexOf(queue);
  if (index >= 0) providerStack.splice(index, 1);
  queue.cancelAll();
});
</script>

<template>
  <slot />
  <ConfirmQueueView :queue="queue" />
</template>
