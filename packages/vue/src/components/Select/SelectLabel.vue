<script setup lang="ts">
/** SelectLabel: the (non-selectable) heading labelling its SelectGroup. */
import { computed, inject, onBeforeUnmount, onMounted, useAttrs } from "vue";
import styles from "@react-styles/components/Select/select.module.scss";
import { hooks } from "../../internal/hooks";
import { GROUP_KEY } from "./context";

defineOptions({ name: "SelectLabel", inheritAttrs: false });
defineSlots<{
  /** Label content */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const group = inject(GROUP_KEY, null);
onMounted(() => {
  if (group) group.hasLabel.value = true;
});
onBeforeUnmount(() => {
  if (group) group.hasLabel.value = false;
});

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("select-label", "root"),
}));
</script>

<template>
  <div :id="group?.labelId" :class="styles.label" v-bind="rootAttrs">
    <slot />
  </div>
</template>
