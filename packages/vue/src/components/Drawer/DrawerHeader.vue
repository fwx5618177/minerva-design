<script setup lang="ts">
/** DrawerHeader: the drawer title (accessible name). */
import { useAttrs } from "vue";
import styles from "@react-styles/components/Drawer/drawer.module.scss";
import { hooks } from "../../internal/hooks";
import { useDialogText } from "../../internal/dialog";

defineOptions({ name: "DrawerHeader", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const id = useDialogText("title", "DrawerHeader");
</script>

<template>
  <div
    :id="id"
    :class="styles.header"
    v-bind="{ ...attrs, ...hooks('drawer', 'header') }"
  >
    <slot />
  </div>
</template>
