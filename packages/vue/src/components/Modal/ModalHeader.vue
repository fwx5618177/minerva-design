<script setup lang="ts">
/** ModalHeader: the dialog title (its accessible name). */
import { useAttrs } from "vue";
import styles from "@react-styles/components/Modal/modal.module.scss";
import { hooks } from "../../internal/hooks";
import { useDialogText } from "../../internal/dialog";

defineOptions({ name: "ModalHeader", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const id = useDialogText("title", "ModalHeader");
</script>

<template>
  <div
    :id="id"
    :class="styles.header"
    v-bind="{ ...attrs, ...hooks('modal', 'header') }"
  >
    <slot />
  </div>
</template>
