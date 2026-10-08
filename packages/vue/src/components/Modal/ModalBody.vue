<script setup lang="ts">
/** ModalBody: the scrollable content area. */
import { useAttrs } from "vue";
import styles from "@react-styles/components/Modal/modal.module.scss";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "ModalBody", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <div :class="styles.body" v-bind="{ ...attrs, ...hooks('modal', 'body') }">
    <slot />
  </div>
</template>
