<script setup lang="ts">
import { inject } from "vue";
import Modal from "./Modal.vue";
import type { ModalProps } from "./dialog-types";
import type { DrawerContext as ModalContext } from "./drawer-types";
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<ModalProps>(), {
  open: undefined,
  modal: undefined,
  closeOnOverlayClick: undefined,
});
const root = inject<ModalContext | undefined>("minerva:modal", undefined);
</script>
<template>
  <Modal
    v-bind="{ ...$attrs, ...props }"
    :open="root?.open.value ?? props.open"
    :modal="props.modal ?? root?.modal.value"
    @open-change="root?.setOpen"
    ><template v-if="$slots.default" #default><slot name="default" /></template
    ><template v-if="$slots.trigger" #trigger><slot name="trigger" /></template
    ><template v-if="$slots.title" #title><slot name="title" /></template
    ><template v-if="$slots.description" #description
      ><slot name="description" /></template
    ><template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </Modal>
</template>
