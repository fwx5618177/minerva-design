<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { ref, computed } from "vue";
const props = withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
    title?: string;
    description?: string;
    closeOnOverlayClick?: boolean;
    disabled?: boolean;
    loading?: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    placement?: string;
  }>(),
  {
    open: undefined,
    closeOnOverlayClick: true,
    placement: "right",
  },
);
const emit = defineEmits([
  "openChange",
  "update:open",
  "close",
  "confirm",
  "cancel",
]);
const local = ref(props.defaultOpen ?? false);
const visible = computed(() => props.open ?? local.value);
function close(reason: string) {
  if (props.loading) return;
  local.value = false;
  emit("update:open", false);
  emit("openChange", false);
  emit("close", reason);
}
function confirm() {
  if (props.disabled || props.loading) return;
  emit("confirm");
}
</script>
<template>
  <view v-if="visible" class="mn-overlay"
    ><view
      class="mn-backdrop"
      data-part="backdrop"
      @tap="closeOnOverlayClick&amp;&amp;close('overlay')"
    /><view class="mn-dialog" :class="`mn-placement-${placement}`"
      ><view class="mn-row"
        ><text class="mn-title">{{ title }}</text
        ><button
          class="mn-close"
          :aria-label="t('modal.close')"
          :class="{ 'mn-disabled': loading }"
          :disabled="loading"
          @tap="close('close')"
        >
          ×
        </button></view
      ><text v-if="description" class="mn-muted">{{ description }}</text
      ><view class="mn-dialog-content"><slot /></view
      ><view class="mn-dialog-footer"
        ><button
          class="mn-button mn-variant-outline"
          :class="{ 'mn-disabled': loading }"
          :disabled="loading"
          @tap="
            emit('cancel');
            close('cancel');
          "
        >
          {{ cancelLabel ?? t("confirm.cancel") }}</button
        ><button
          class="mn-button"
          :loading="loading"
          :class="{ 'mn-disabled': disabled || loading }"
          :disabled="disabled || loading"
          @tap="confirm"
        >
          {{ confirmLabel ?? t("confirm.confirm") }}
        </button></view
      ></view
    ></view
  >
</template>
