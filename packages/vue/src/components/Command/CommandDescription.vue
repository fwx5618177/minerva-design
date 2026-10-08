<script setup lang="ts">
/** Description of CommandDialog (`aria-describedby`); internal. */
import modalStyles from "@react-styles/components/Modal/modal.module.scss";
import { useDialogText } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "CommandDescription" });
defineSlots<{ default?: () => unknown }>();
const id = useDialogText("description", "CommandDescription");
</script>

<template>
  <p
    :id="id"
    :class="modalStyles.description"
    v-bind="hooks('command-dialog', 'description')"
  >
    <slot />
  </p>
</template>
