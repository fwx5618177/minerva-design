<script setup lang="ts">
/**
 * Drawer: a side panel with title, description and close button in one
 * component. Controlled (`v-model:open`) or uncontrolled (`defaultOpen`,
 * `trigger` slot). Restores focus to the opener after closing. Attributes
 * (class, style...) fall through to the panel.
 */
import DrawerRoot from "./DrawerRoot.vue";
import DrawerTrigger from "./DrawerTrigger.vue";
import DrawerContent from "./DrawerContent.vue";
import DrawerHeader from "./DrawerHeader.vue";
import type { DrawerProps } from "./types";

defineOptions({ name: "Drawer", inheritAttrs: false });

withDefaults(defineProps<DrawerProps>(), {
  open: undefined,
  defaultOpen: undefined,
  side: "right",
  size: "medium",
  title: undefined,
  description: undefined,
  hideCloseButton: false,
  closeLabel: undefined,
  hiddenDescription: undefined,
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** Open state requested to change (trigger, Escape, overlay, close) */
  openChange: [open: boolean];
}>();
const slots = defineSlots<{
  /** Content: usually `DrawerBody` + `DrawerFooter` */
  default?: () => unknown;
  /** Element opening the drawer (its single child gets the trigger props) */
  trigger?: () => unknown;
  title?: () => unknown;
  description?: () => unknown;
}>();
</script>

<template>
  <DrawerRoot
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
    @open-change="emit('openChange', $event)"
  >
    <DrawerTrigger v-if="slots.trigger" as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent
      v-bind="$attrs"
      :side="side"
      :size="size"
      :hide-close-button="hideCloseButton"
      :close-label="closeLabel"
      :description="description"
      :hidden-description="hiddenDescription"
    >
      <template v-if="slots.description" #description>
        <slot name="description" />
      </template>
      <DrawerHeader v-if="title || slots.title">
        <slot name="title">{{ title }}</slot>
      </DrawerHeader>
      <slot />
    </DrawerContent>
  </DrawerRoot>
</template>
