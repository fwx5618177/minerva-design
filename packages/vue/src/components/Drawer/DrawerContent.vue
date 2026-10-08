<script setup lang="ts">
/**
 * DrawerContent: teleported overlay + a panel sliding in from one edge, on the
 * internal dialog foundation (focus trap, Escape / overlay click dismissal,
 * scroll lock, rest of the page hidden, focus returned to the opener).
 */
import { useSlots } from "vue";
import styles from "@react-styles/components/Drawer/drawer.module.scss";
import DialogContent from "../../internal/DialogContent.vue";
import { useDialogContext } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";
import { IconX } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import DrawerDescription from "./DrawerDescription.vue";
import type { DrawerContentProps } from "./types";

defineOptions({ name: "DrawerContent", inheritAttrs: false });

withDefaults(defineProps<DrawerContentProps>(), {
  role: "dialog",
  forceMount: false,
  side: "right",
  size: "medium",
  hideCloseButton: false,
  closeLabel: undefined,
  hiddenDescription: undefined,
  description: undefined,
  overlayClass: undefined,
});
const emit = defineEmits<{
  /** Before focus moves into the panel; `preventDefault()` keeps it where it is */
  openAutoFocus: [event: Event];
  /** Before focus returns to the opener; `preventDefault()` skips it */
  closeAutoFocus: [event: Event];
  /** Escape while topmost; `preventDefault()` keeps it open */
  escapeKeyDown: [event: KeyboardEvent];
  /** Pointer pressed outside (the overlay); `preventDefault()` keeps it open */
  pointerDownOutside: [event: PointerEvent];
  /** Pointer down or focus outside; `preventDefault()` keeps it open */
  interactOutside: [event: PointerEvent | FocusEvent];
}>();
defineSlots<{
  default?: () => unknown;
  /** Visible description (instead of the `description` prop) */
  description?: () => unknown;
}>();
const slots = useSlots();
const { t } = useI18n();
const { setOpen } = useDialogContext("DrawerContent");
</script>

<template>
  <DialogContent
    :role="role"
    :force-mount="forceMount"
    :overlay-class="[styles.overlay, overlayClass]"
    :overlay-attrs="hooks('drawer', 'overlay')"
    :class="[styles.content, styles[side], styles[size]]"
    v-bind="{ ...$attrs, ...hooks('drawer', 'content', { side, size }) }"
    @open-auto-focus="emit('openAutoFocus', $event)"
    @close-auto-focus="emit('closeAutoFocus', $event)"
    @escape-key-down="emit('escapeKeyDown', $event)"
    @pointer-down-outside="emit('pointerDownOutside', $event)"
    @interact-outside="emit('interactOutside', $event)"
  >
    <DrawerDescription
      :class="
        description || slots.description
          ? styles.description
          : styles.visuallyHidden
      "
    >
      <slot name="description">{{
        description ?? hiddenDescription ?? t("drawer.description")
      }}</slot>
    </DrawerDescription>
    <slot />
    <button
      v-if="!hideCloseButton"
      type="button"
      :class="styles.close"
      :aria-label="closeLabel ?? t('drawer.close')"
      v-bind="hooks('drawer', 'close-button')"
      @click="setOpen(false)"
    >
      <IconX :size="16" aria-hidden="true" />
    </button>
  </DialogContent>
</template>
