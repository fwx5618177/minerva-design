<script setup lang="ts">
import { inject, provide, shallowRef, onBeforeUnmount, computed } from "vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import {
  createConfirmStore,
  globalConfirmStore,
  type ConfirmEntry,
} from "./feedback-store";
const parent = inject<ReturnType<typeof createConfirmStore> | null>(
  "minerva:confirm-store",
  null,
);
const store = parent ? createConfirmStore() : globalConfirmStore;
const entries = shallowRef<ConfirmEntry[]>([]);
const stop = store.subscribe((value) => (entries.value = value));
const current = computed(() => entries.value[0]);
provide("minerva:confirm-store", store);
provide("minerva:confirm", store.request);
onBeforeUnmount(() => {
  stop();
  store.clear();
});
defineExpose({ confirm: store.request });
</script>
<template>
  <view class="mn-confirm-provider"
    ><slot /><ConfirmDialog
      v-if="current"
      v-bind="current"
      :open="true"
      @confirm="store.settle(current!.id, true)"
      @cancel="store.settle(current!.id, false)"
  /></view>
</template>
