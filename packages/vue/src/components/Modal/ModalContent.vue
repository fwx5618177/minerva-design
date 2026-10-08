<script setup lang="ts">
/**
 * ModalContent: teleported overlay + centered dialog panel (a bottom sheet on
 * narrow screens): focus moves in and is trapped, Escape (topmost dialog
 * only) and an overlay click close it, page scroll is locked, the rest of
 * the page is hidden from assistive technology, and focus returns to the
 * opener on close.
 */
import { useSlots, type HTMLAttributes } from "vue";
import styles from "@react-styles/components/Modal/modal.module.scss";
import DialogContent from "../../internal/DialogContent.vue";
import { useDialogContext } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";
import { IconX } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import ModalDescription from "./ModalDescription.vue";
import type { ModalSize } from "./types";

defineOptions({ name: "ModalContent", inheritAttrs: false });

withDefaults(
  defineProps<{
    /** @default "medium" */
    size?: ModalSize;
    /** @default false */
    hideCloseButton?: boolean;
    /** Accessible name of the close button (default: translated "Close") */
    closeLabel?: string;
    /** Description under the title (or the `description` slot) */
    description?: string;
    /** @default "dialog" */
    role?: "dialog" | "alertdialog";
    /** Keep mounted while closed */
    forceMount?: boolean;
    /** Class of the overlay */
    overlayClass?: HTMLAttributes["class"];
  }>(),
  {
    size: "medium",
    hideCloseButton: false,
    closeLabel: undefined,
    description: undefined,
    role: "dialog",
    forceMount: false,
    overlayClass: undefined,
  },
);
const emit = defineEmits<{
  openAutoFocus: [event: Event];
  closeAutoFocus: [event: Event];
  escapeKeyDown: [event: KeyboardEvent];
  pointerDownOutside: [event: PointerEvent];
  interactOutside: [event: PointerEvent | FocusEvent];
}>();
const slots = useSlots();
const { t } = useI18n();
const { setOpen } = useDialogContext("ModalContent");
</script>

<template>
  <DialogContent
    :role="role"
    :force-mount="forceMount"
    :overlay-class="[styles.overlay, overlayClass]"
    :overlay-attrs="hooks('modal', 'overlay')"
    :class="[styles.content, styles[size]]"
    v-bind="{ ...$attrs, ...hooks('modal', 'content', { size }) }"
    @open-auto-focus="emit('openAutoFocus', $event)"
    @close-auto-focus="emit('closeAutoFocus', $event)"
    @escape-key-down="emit('escapeKeyDown', $event)"
    @pointer-down-outside="emit('pointerDownOutside', $event)"
    @interact-outside="emit('interactOutside', $event)"
  >
    <ModalDescription v-if="description || slots.description">
      <slot name="description">{{ description }}</slot>
    </ModalDescription>
    <slot />
    <button
      v-if="!hideCloseButton"
      type="button"
      :class="styles.close"
      :aria-label="closeLabel ?? t('modal.close')"
      v-bind="hooks('modal', 'close-button')"
      @click="setOpen(false)"
    >
      <IconX :size="16" aria-hidden="true" />
    </button>
  </DialogContent>
</template>
