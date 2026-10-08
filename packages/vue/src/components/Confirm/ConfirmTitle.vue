<script setup lang="ts">
/** The confirmation title (`aria-labelledby`); internal. */
import styles from "@react-styles/components/Modal/modal.module.scss";
import { useDialogText } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "ConfirmTitle" });
defineSlots<{ default?: () => unknown }>();
const id = useDialogText("title", "ConfirmTitle");
</script>

<template>
  <div
    :id="id"
    :class="styles.header"
    v-bind="hooks('confirm-dialog', 'header')"
  >
    <slot />
  </div>
</template>
