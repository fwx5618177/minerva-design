<script setup lang="ts">
/** Positions the popover against this element instead of the trigger. */
import { Slot, unrefElement } from "../../internal/Slot";
import { usePopoverContext } from "./context";
import type { PopoverAnchorProps } from "./types";

defineOptions({ name: "PopoverAnchor" });

withDefaults(defineProps<PopoverAnchorProps>(), { asChild: false });
defineSlots<{ default?: () => unknown }>();

const context = usePopoverContext("PopoverAnchor");
const setAnchor = (el: unknown) => {
  context.anchor.value = unrefElement(el);
};
</script>

<template>
  <Slot v-if="asChild" :ref="setAnchor"><slot /></Slot>
  <div v-else :ref="setAnchor"><slot /></div>
</template>
