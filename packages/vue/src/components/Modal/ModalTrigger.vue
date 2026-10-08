<script setup lang="ts">
/**
 * Opens the modal: a `<button>`, or with `asChild` the single child of the
 * slot (`aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`).
 */
import { useDialogTrigger } from "../../internal/dialog";
import { Slot } from "../../internal/Slot";

defineOptions({ name: "ModalTrigger" });
withDefaults(defineProps<{ asChild?: boolean }>(), { asChild: false });
defineSlots<{ default?: () => unknown }>();
const trigger = useDialogTrigger("ModalTrigger");
</script>

<template>
  <Slot v-if="asChild" v-bind="trigger"><slot /></Slot>
  <button v-else type="button" v-bind="trigger"><slot /></button>
</template>
