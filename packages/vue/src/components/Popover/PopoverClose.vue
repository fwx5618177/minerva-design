<script setup lang="ts">
/** Closes the popover; a `<button>` or, with `asChild`, the slot's child. */
import { computed, useAttrs } from "vue";
import { Slot } from "../../internal/Slot";
import { composeListener, usePopoverContext } from "./context";
import type { PopoverTriggerProps } from "./types";

defineOptions({ name: "PopoverClose", inheritAttrs: false });

withDefaults(defineProps<PopoverTriggerProps>(), { asChild: false });
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { setOpen } = usePopoverContext("PopoverClose");
const bindings = computed(() =>
  composeListener(attrs, "onClick", () => setOpen(false)),
);
</script>

<template>
  <Slot v-if="asChild" v-bind="bindings"><slot /></Slot>
  <button v-else type="button" v-bind="bindings"><slot /></button>
</template>
