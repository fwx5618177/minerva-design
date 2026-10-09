<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { watch, onBeforeUnmount } from "vue";
const props = withDefaults(
  defineProps<{
    open?: boolean;
    message?: string;
    status?: string;
    duration?: number;
  }>(),
  { open: true, status: "info", duration: 3000 },
);
const emit = defineEmits(["close", "update:open"]);
let timer: ReturnType<typeof setTimeout> | undefined;
function close() {
  emit("close");
  emit("update:open", false);
}
watch(
  () => [props.open, props.duration],
  () => {
    clearTimeout(timer);
    if (props.open && props.duration > 0)
      timer = setTimeout(close, props.duration);
  },
  { immediate: true },
);
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <view v-if="open" class="mn-toast" :class="`mn-status-${status}`"
    ><text>{{ message }}</text
    ><slot /><button
      class="mn-close"
      :aria-label="t('toast.close')"
      @tap="close"
    >
      ×
    </button></view
  >
</template>
