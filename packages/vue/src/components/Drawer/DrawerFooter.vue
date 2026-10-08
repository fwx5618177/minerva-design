<script setup lang="ts">
/** DrawerFooter: right-aligned, wrapping action row. */
import { useAttrs } from "vue";
import styles from "@react-styles/components/Drawer/drawer.module.scss";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "DrawerFooter", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <div
    :class="styles.footer"
    v-bind="{ ...attrs, ...hooks('drawer', 'footer') }"
  >
    <slot />
  </div>
</template>
