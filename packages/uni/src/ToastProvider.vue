<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { inject, provide, shallowRef, onBeforeUnmount, watch } from "vue";
import {
  createToastStore,
  globalToastStore,
  type ToastEntry,
} from "./feedback-store";
const props = withDefaults(
  defineProps<{
    position?: string;
    max?: number;
    pauseOnHover?: boolean;
    closeLabel?: string;
  }>(),
  {
    position: "top-right",
    max: Infinity,
    pauseOnHover: true,
  },
);
const parent = inject<ReturnType<typeof createToastStore> | null>(
  "minerva:toast-store",
  null,
);
const store = parent ? createToastStore() : globalToastStore;
const entries = shallowRef<ToastEntry[]>([]);
const stop = store.subscribe((value) => (entries.value = value));
watch(
  () => props.max,
  (value) => store.setLimit(value),
  { immediate: true },
);
provide("minerva:toast-store", store);
provide("minerva:toast", store.api);
onBeforeUnmount(() => {
  stop();
  store.api.dismiss();
});
defineExpose({ toast: store.api });
</script>
<template>
  <view class="mn-toast-provider"
    ><slot /><view class="mn-toast-viewport" :class="`mn-position-${position}`"
      ><view
        v-for="entry in entries"
        :key="entry.id"
        class="mn-toast"
        :class="`mn-status-${entry.color}`"
        @mouseenter="pauseOnHover && store.pause(entry.id)"
        @mouseleave="pauseOnHover && store.resume(entry.id)"
        @focusin="store.pause(entry.id)"
        @focusout="store.resume(entry.id)"
        ><view v-if="entry.loading" class="mn-spinner" /><view
          ><text class="mn-title">{{ entry.title }}</text
          ><text class="mn-muted">{{ entry.description }}</text></view
        ><button
          v-if="entry.action"
          class="mn-close mn-toast-action"
          @tap="store.action(entry.id)"
        >
          {{ entry.action.label }}</button
        ><button
          v-if="entry.closable !== false"
          class="mn-close"
          :aria-label="closeLabel ?? t('toast.close')"
          @tap="store.api.dismiss(entry.id)"
        >
          ×
        </button></view
      ></view
    ></view
  >
</template>
