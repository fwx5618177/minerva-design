<script setup lang="ts">
/** The modal's accessible description (`aria-describedby`). */
import styles from "@react-styles/components/Modal/modal.module.scss";
import { useDialogText } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "ModalDescription" });
defineSlots<{ default?: () => unknown }>();
const id = useDialogText("description", "ModalDescription");
</script>

<template>
  <p
    :id="id"
    :class="styles.description"
    v-bind="hooks('modal', 'description')"
  >
    <slot />
  </p>
</template>
