<script setup lang="ts">
import { computed, ref } from "vue";
import { useNativeId as useId } from "./native-id";
import { inheritForm } from "./form-context";
const rawProps = withDefaults(
  defineProps<{
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    indeterminate?: boolean;
    label?: string;
    value?: string;
    name?: string;
    id?: string;
    color?: "primary" | "success" | "info" | "warning" | "danger";
    size?: "small" | "medium" | "large";
    shape?: "square" | "circle" | "rounded";
    labelPlacement?: "start" | "end" | "top" | "bottom";
    helperText?: string;
    error?: boolean;
    invalid?: boolean;
    required?: boolean;
  }>(),
  {
    checked: undefined,
    error: undefined,
    color: "primary",
    size: "medium",
    shape: "square",
    labelPlacement: "end",
  },
);
const props = inheritForm(rawProps);
const local = ref(props.defaultChecked ?? false);
const current = computed(() => props.checked ?? local.value);
const helperId = `mn-checkbox-${useId()}`;
const invalid = computed(() => props.error ?? props.invalid ?? false);
const emit = defineEmits(["change", "update:checked"]);
function toggle() {
  if (props.disabled || props.readOnly) return;
  const next = !current.value;
  if (props.checked === undefined) local.value = next;
  emit("update:checked", next);
  emit("change", next);
}
</script>
<template>
  <view
    class="mn-choice"
    role="checkbox"
    :id="id"
    :aria-label="label"
    :aria-invalid="invalid"
    :aria-required="props.required"
    :aria-describedby="helperText ? helperId : undefined"
    :aria-checked="indeterminate ? 'mixed' : current"
    :aria-disabled="props.disabled"
    :aria-readonly="props.readOnly"
    :tabindex="props.disabled ? -1 : 0"
    :class="[
      `mn-choice-color-${color}`,
      `mn-choice-size-${size}`,
      `mn-choice-shape-${shape}`,
      `mn-choice-label-${labelPlacement}`,
      { 'mn-disabled': props.disabled, 'mn-invalid': invalid },
    ]"
    @tap="toggle"
    @keydown.space.prevent="toggle"
    ><text
      aria-hidden="true"
      class="mn-choice-indicator"
      :class="{ 'mn-active': current || indeterminate }"
      ><template v-if="indeterminate">−</template
      ><slot v-else-if="current" name="icon">✓</slot></text
    ><view class="mn-choice-content"
      ><text>{{ label }}</text
      ><slot
    /></view>
    <text v-if="helperText" :id="helperId" class="mn-choice-helper"
      ><slot v-if="invalid" name="errorIcon" />{{ helperText }}</text
    >
  </view>
</template>
