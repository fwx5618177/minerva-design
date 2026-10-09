<script setup lang="ts">
import { inject, computed, ref, onBeforeUnmount } from "vue";
import { useNativeId as useId } from "./native-id";
import { inheritForm } from "./form-context";
import type { RadioContext } from "./radio-context";
const raw = withDefaults(
  defineProps<{
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    label?: string;
    value?: string | number;
    name?: string;
    id?: string;
    size?: "small" | "medium" | "large";
    color?: "primary" | "success" | "warning" | "danger";
    required?: boolean;
    invalid?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    errorIcon?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
  }>(),
  {
    checked: undefined,
    disabled: undefined,
    readOnly: undefined,
    error: undefined,
  },
);
const props = inheritForm(raw),
  group = inject<RadioContext | undefined>("minerva:radio", undefined);
const local = ref(props.defaultChecked ?? false),
  helpId = `mn-radio-${useId().replace(/[^a-z0-9]/gi, "")}`;
const chosen = computed(() =>
    group ? group.value.value === props.value : (props.checked ?? local.value),
  ),
  disabled = computed(() => !!group?.disabled.value || props.disabled),
  readOnly = computed(() => !!group?.readOnly.value || props.readOnly),
  invalid = computed(
    () => group?.error.value ?? props.error ?? props.invalid ?? false,
  ),
  size = computed(() => group?.size.value ?? props.size ?? "medium"),
  color = computed(() => group?.color.value ?? props.color ?? "primary"),
  help = computed(() =>
    invalid.value && props.errorMessage ? props.errorMessage : props.helperText,
  ),
  described = computed(
    () =>
      [
        props.ariaDescribedby,
        group?.describedBy.value,
        help.value ? helpId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined,
  );
if (group) {
  const unregister = group.register(
    helpId,
    computed(() => props.value),
    disabled,
  );
  onBeforeUnmount(unregister);
}
const emit = defineEmits<{
  change: [checked: boolean, event?: unknown];
  "update:checked": [checked: boolean];
}>();
function choose(event?: unknown) {
  if (disabled.value || readOnly.value || chosen.value) return;
  if (group) {
    if (props.value !== undefined) group.select(props.value, event);
    return;
  }
  if (props.checked === undefined) local.value = true;
  emit("update:checked", true);
  emit("change", true, event);
}
</script>
<template>
  <view
    class="mn-choice mn-uni-radio"
    :class="[
      `mn-radio-${size}`,
      `mn-choice-size-${size}`,
      `mn-choice-color-${color}`,
      { 'mn-disabled': disabled, 'mn-invalid': invalid },
    ]"
    role="radio"
    :id="id"
    :name="group?.name.value ?? name"
    :value="value"
    :aria-label="props.ariaLabel ?? label"
    :aria-labelledby="props.ariaLabelledby"
    :aria-describedby="described"
    :aria-checked="chosen"
    :aria-disabled="disabled"
    :aria-readonly="readOnly"
    :aria-required="group?.required.value ?? props.required"
    :aria-invalid="invalid"
    :tabindex="disabled ? -1 : group ? (group.tabStop(helpId) ? 0 : -1) : 0"
    @tap="choose"
    @keydown.space.prevent="choose($event)"
    ><input
      v-if="!group && name && chosen"
      class="mn-uni-visually-hidden"
      :name="name"
      :value="value ?? 'on'"
      :disabled="disabled"
      aria-hidden="true"
      :tabindex="-1"
    /><text
      class="mn-choice-indicator mn-radio"
      :class="{ 'mn-active': chosen }"
      aria-hidden="true"
      >{{ chosen ? "●" : "" }}</text
    ><view class="mn-choice-content"
      ><text v-if="label">{{ label }}</text
      ><slot v-else /></view
    ><text
      v-if="help"
      :id="helpId"
      class="mn-choice-helper"
      :class="{ 'mn-error': invalid }"
      ><slot v-if="invalid" name="error-icon">{{ errorIcon ?? "ⓘ" }}</slot
      >{{ help }}</text
    ></view
  >
</template>
