<script setup lang="ts">
/** Closes the drawer: a `<button>`, or with `asChild` the slot's child. */
import { useDialogContext } from "../../internal/dialog";
import { Slot } from "../../internal/Slot";
import type { DrawerTriggerProps } from "./types";

defineOptions({ name: "DrawerClose" });
withDefaults(defineProps<DrawerTriggerProps>(), { asChild: false });
defineSlots<{ default?: () => unknown }>();
const { setOpen } = useDialogContext("DrawerClose");
const onClick = (event: MouseEvent) => {
  if (!event.defaultPrevented) setOpen(false);
};
</script>

<template>
  <Slot v-if="asChild" @click="onClick"><slot /></Slot>
  <button v-else type="button" @click="onClick"><slot /></button>
</template>
