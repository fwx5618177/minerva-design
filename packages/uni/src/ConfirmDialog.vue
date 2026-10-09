<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "./i18n";
import type { ConfirmOptions } from "./feedback-store";
import Modal from "./Modal.vue";
import Button from "./Button.vue";
const { t } = useI18n();
const props = defineProps<
  ConfirmOptions & { open?: boolean; onConfirm?: () => void | Promise<void> }
>();
const emit = defineEmits<{
  openChange: [open: boolean];
  "update:open": [open: boolean];
  cancel: [];
  error: [error: unknown];
}>();
const pending = ref(false),
  busy = computed(() => props.loading || pending.value);
function close() {
  if (busy.value) return;
  emit("cancel");
  emit("openChange", false);
  emit("update:open", false);
}
async function accept() {
  if (busy.value || props.confirmDisabled) return;
  pending.value = true;
  try {
    await props.onConfirm?.();
  } catch (error) {
    emit("error", error);
  } finally {
    pending.value = false;
  }
}
</script>
<template>
  <Modal
    :open="open ?? false"
    :title="title"
    :description="description"
    size="small"
    role="alertdialog"
    :close-label="closeLabel"
    :loading="busy"
    @open-change="!$event && close()"
  >
    <slot />
    <template #footer
      ><view class="mn-dialog-footer">
        <Button
          data-action="cancel"
          variant="outline"
          color="neutral"
          :disabled="busy"
          @click="close"
          >{{ cancelLabel ?? t("confirm.cancel") }}</Button
        >
        <Button
          data-action="confirm"
          :color="color ?? 'primary'"
          :loading="busy"
          :disabled="confirmDisabled"
          @click="accept"
          >{{
            confirmLabel ??
            t(color === "danger" ? "confirm.delete" : "confirm.confirm")
          }}</Button
        >
      </view></template
    >
  </Modal>
</template>
