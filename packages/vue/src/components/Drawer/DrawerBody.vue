<script setup lang="ts">
/** DrawerBody: the scrollable content area. */
import { useAttrs } from "vue";
import styles from "@react-styles/components/Drawer/drawer.module.scss";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "DrawerBody", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <div :class="styles.body" v-bind="{ ...attrs, ...hooks('drawer', 'body') }">
    <slot />
  </div>
</template>
