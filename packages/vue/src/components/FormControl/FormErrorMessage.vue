<script setup lang="ts">
/** FormErrorMessage: error message of the field; only rendered while the FormControl is invalid. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/FormControl/formControl.module.scss";
import { hooks } from "../../internal/hooks";
import { useFormControlContext } from "../../internal/form-control";
import { useRegistration } from "./registration";

defineOptions({ name: "FormErrorMessage", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ctx = useFormControlContext();
const visible = computed(() => !!ctx?.invalid.value);
useRegistration(ctx?.errorMessages, () => visible.value);

const errorAttrs = computed(() => ({
  id: ctx?.errorId.value,
  role: "alert",
  ...attrs,
  ...hooks("form-control", "error-message"),
}));
</script>

<template>
  <div v-if="visible" :class="styles.error" v-bind="errorAttrs">
    <slot />
  </div>
</template>
