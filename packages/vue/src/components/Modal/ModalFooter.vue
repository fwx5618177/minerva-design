<script setup lang="ts">
/** ModalFooter: right-aligned, wrapping action row. */
import { useAttrs } from "vue";
import styles from "@react-styles/components/Modal/modal.module.scss";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "ModalFooter", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <div
    :class="styles.footer"
    v-bind="{ ...attrs, ...hooks('modal', 'footer') }"
  >
    <slot />
  </div>
</template>
