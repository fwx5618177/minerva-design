<script setup lang="ts">
/**
 * Modal: a dialog with title, description and close button in one component.
 * Controlled (`v-model:open`) or uncontrolled (`defaultOpen`, `trigger`
 * slot). Focus returns to the element focused before opening.
 */
import ModalRoot from "./ModalRoot.vue";
import ModalTrigger from "./ModalTrigger.vue";
import ModalContent from "./ModalContent.vue";
import ModalHeader from "./ModalHeader.vue";
import type { ModalProps } from "./types";

defineOptions({ name: "Modal", inheritAttrs: false });

withDefaults(defineProps<ModalProps>(), {
  open: undefined,
  defaultOpen: undefined,
  title: undefined,
  description: undefined,
  size: "medium",
  hideCloseButton: false,
  closeLabel: undefined,
  role: "dialog",
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** Open state requested to change (trigger, Escape, overlay, close) */
  openChange: [open: boolean];
}>();
const slots = defineSlots<{
  /** Body */
  default?: () => unknown;
  /** Element opening the modal (its single child gets the trigger props) */
  trigger?: () => unknown;
  title?: () => unknown;
  description?: () => unknown;
}>();
</script>

<template>
  <ModalRoot
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
    @open-change="emit('openChange', $event)"
  >
    <ModalTrigger v-if="slots.trigger" as-child>
      <slot name="trigger" />
    </ModalTrigger>
    <ModalContent
      v-bind="$attrs"
      :size="size"
      :hide-close-button="hideCloseButton"
      :close-label="closeLabel"
      :description="description"
      :role="role"
    >
      <template v-if="slots.description" #description>
        <slot name="description" />
      </template>
      <ModalHeader v-if="title || slots.title">
        <slot name="title">{{ title }}</slot>
      </ModalHeader>
      <slot />
    </ModalContent>
  </ModalRoot>
</template>
