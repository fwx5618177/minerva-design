<script setup lang="ts">
/** The confirmation description (`aria-describedby`); internal. */
import styles from "@react-styles/components/Modal/modal.module.scss";
import { useDialogText } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "ConfirmDescription" });
defineSlots<{ default?: () => unknown }>();
const id = useDialogText("description", "ConfirmDescription");
</script>

<template>
  <p
    :id="id"
    :class="styles.description"
    v-bind="hooks('confirm-dialog', 'description')"
  >
    <slot />
  </p>
</template>
