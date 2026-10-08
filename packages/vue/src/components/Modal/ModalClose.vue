<script setup lang="ts">
/** Closes the modal: a `<button>`, or with `asChild` the slot's child. */
import { useDialogContext } from "../../internal/dialog";
import { Slot } from "../../internal/Slot";

defineOptions({ name: "ModalClose" });
withDefaults(defineProps<{ asChild?: boolean }>(), { asChild: false });
defineSlots<{ default?: () => unknown }>();
const { setOpen } = useDialogContext("ModalClose");
const onClick = (event: MouseEvent) => {
  if (!event.defaultPrevented) setOpen(false);
};
</script>

<template>
  <Slot v-if="asChild" @click="onClick"><slot /></Slot>
  <button v-else type="button" @click="onClick"><slot /></button>
</template>
