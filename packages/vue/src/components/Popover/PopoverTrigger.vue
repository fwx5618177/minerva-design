<script setup lang="ts">
/**
 * Toggles the popover (`aria-haspopup="dialog"`, `aria-expanded`,
 * `aria-controls` while open, `data-state`); a `<button>` or, with
 * `asChild`, the single child of the slot. Clicking it while open closes the
 * popover.
 */
import { computed, useAttrs } from "vue";
import { hooks } from "../../internal/hooks";
import { Slot, unrefElement } from "../../internal/Slot";
import { composeListener, usePopoverContext } from "./context";
import type { PopoverTriggerProps } from "./types";

defineOptions({ name: "PopoverTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  asChild: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const context = usePopoverContext("PopoverTrigger");
const setTrigger = (el: unknown) => {
  context.trigger.value = unrefElement(el);
};
const bindings = computed(() => ({
  "aria-haspopup": "dialog" as const,
  "aria-expanded": context.open.value,
  "aria-controls": context.open.value ? context.contentId : undefined,
  ...composeListener(attrs, "onClick", () =>
    context.setOpen(!context.open.value),
  ),
  // The native button only: with asChild the child keeps its own hooks.
  ...(props.asChild
    ? undefined
    : hooks("popover", "trigger", {
        state: context.open.value ? "open" : "closed",
      })),
}));
</script>

<template>
  <Slot v-if="asChild" :ref="setTrigger" v-bind="bindings"><slot /></Slot>
  <button v-else :ref="setTrigger" type="button" v-bind="bindings">
    <slot />
  </button>
</template>
