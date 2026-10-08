<script setup lang="ts">
/**
 * ConfirmDialog: a small modal asking the user to confirm an action, a
 * themed replacement for the native `window.confirm`. The markup of a small
 * Modal (same styles) with its own styling hooks; an `alertdialog` labelled by
 * its title and described by its description. It does not close by itself on
 * confirm: the `confirm` handler decides.
 */
import { computed, useSlots } from "vue";
import styles from "@react-styles/components/Modal/modal.module.scss";
import DialogContent from "../../internal/DialogContent.vue";
import { provideDialog } from "../../internal/dialog";
import { useControllable } from "../../internal/controllable";
import { hooks } from "../../internal/hooks";
import { IconX } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { Button } from "../Button";
import ConfirmTitle from "./ConfirmTitle.vue";
import ConfirmDescription from "./ConfirmDescription.vue";
import RenderContent from "./RenderContent";
import type { ConfirmDialogProps } from "./types";

defineOptions({ name: "ConfirmDialog", inheritAttrs: false });

const props = withDefaults(defineProps<ConfirmDialogProps>(), {
  title: undefined,
  description: undefined,
  confirmLabel: undefined,
  cancelLabel: undefined,
  closeLabel: undefined,
  color: "primary",
  loading: false,
  confirmDisabled: false,
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** Requested `false` on cancel (cancel button, close, Escape, overlay click) */
  openChange: [open: boolean];
  /** The confirm button was pressed (the dialog does not close by itself) */
  confirm: [];
}>();
defineSlots<{
  /** Extra content (in the body) */
  default?: () => unknown;
  title?: () => unknown;
  description?: () => unknown;
  "confirm-label"?: () => unknown;
  "cancel-label"?: () => unknown;
}>();
const slots = useSlots();
const { t } = useI18n();

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  name: "ConfirmDialog",
  onChange: (value) => emit("openChange", value),
});
const setOpen = (value: boolean) => {
  open.value = value;
};
provideDialog({
  open: computed(() => open.value),
  setOpen,
  modal: computed(() => true),
});
</script>

<template>
  <DialogContent
    role="alertdialog"
    :overlay-class="styles.overlay"
    :overlay-attrs="hooks('confirm-dialog', 'overlay')"
    :class="[styles.content, styles.small]"
    v-bind="{
      ...$attrs,
      ...hooks('confirm-dialog', 'content', { color, loading }),
    }"
  >
    <ConfirmDescription v-if="description || slots.description">
      <slot name="description"><RenderContent :content="description" /></slot>
    </ConfirmDescription>
    <ConfirmTitle v-if="title || slots.title">
      <slot name="title"><RenderContent :content="title" /></slot>
    </ConfirmTitle>
    <div :class="styles.body" v-bind="hooks('confirm-dialog', 'body')">
      <slot />
    </div>
    <div :class="styles.footer" v-bind="hooks('confirm-dialog', 'footer')">
      <Button
        type="button"
        color="neutral"
        variant="outline"
        :disabled="loading"
        @click="setOpen(false)"
      >
        <slot name="cancel-label">
          <RenderContent v-if="cancelLabel" :content="cancelLabel" />
          <template v-else>{{ t("confirm.cancel") }}</template>
        </slot>
      </Button>
      <Button
        type="button"
        :color="color"
        variant="solid"
        :loading="loading"
        :disabled="confirmDisabled"
        @click="emit('confirm')"
      >
        <slot name="confirm-label">
          <RenderContent v-if="confirmLabel" :content="confirmLabel" />
          <template v-else>{{
            color === "danger" ? t("confirm.delete") : t("confirm.confirm")
          }}</template>
        </slot>
      </Button>
    </div>
    <button
      type="button"
      :class="styles.close"
      :aria-label="closeLabel ?? t('modal.close')"
      v-bind="hooks('confirm-dialog', 'close-button')"
      @click="setOpen(false)"
    >
      <IconX :size="16" aria-hidden="true" />
    </button>
  </DialogContent>
</template>
