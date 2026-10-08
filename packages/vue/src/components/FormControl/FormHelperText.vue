<script setup lang="ts">
/** FormHelperText: help text of the field; replaced by FormErrorMessage while invalid. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/FormControl/formControl.module.scss";
import { hooks } from "../../internal/hooks";
import { useFormControlContext } from "../../internal/form-control";
import { useRegistration } from "./registration";

defineOptions({ name: "FormHelperText", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ctx = useFormControlContext();
const visible = computed(() => !ctx?.invalid.value);
useRegistration(ctx?.helperTexts, () => visible.value);

const helperAttrs = computed(() => ({
  id: ctx?.helperId.value,
  ...attrs,
  ...hooks("form-control", "helper-text"),
}));
</script>

<template>
  <div v-if="visible" :class="styles.helper" v-bind="helperAttrs">
    <slot />
  </div>
</template>
