<script setup lang="ts">
/** The drawer's accessible description (`aria-describedby`); internal. */
import { useDialogText } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "DrawerDescription" });
defineSlots<{ default?: () => unknown }>();
const id = useDialogText("description", "DrawerDescription");
</script>

<template>
  <p :id="id" v-bind="hooks('drawer', 'description')">
    <slot />
  </p>
</template>
