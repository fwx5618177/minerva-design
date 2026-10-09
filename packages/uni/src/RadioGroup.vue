<script setup lang="ts">
import { ref, computed, provide, shallowReactive } from "vue";
import { useNativeId as useId } from "./native-id";
import { inheritForm } from "./form-context";
import Radio from "./Radio.vue";
import type { RadioContext } from "./radio-context";
const raw = withDefaults(
  defineProps<{
    value?: string | number | null;
    modelValue?: string | number | null;
    defaultValue?: string | number;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
    label?: string;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    size?: "small" | "medium" | "large";
    color?: "primary" | "success" | "warning" | "danger";
    error?: boolean;
    invalid?: boolean;
    helperText?: string;
    required?: boolean;
    options?: { value: string | number; label: string; disabled?: boolean }[];
    direction?: "horizontal" | "vertical";
  }>(),
  { options: () => [], direction: "vertical", error: undefined },
);
const props = inheritForm(raw),
  local = ref<string | number | undefined>(props.defaultValue);
const value = computed(() =>
    props.modelValue !== undefined
      ? props.modelValue
      : props.value !== undefined
        ? props.value
        : local.value,
  ),
  id = `mn-radios-${useId().replace(/[^a-z0-9]/gi, "")}`;
const invalid = computed(() => props.error ?? props.invalid ?? false),
  described = computed(
    () =>
      [props.ariaDescribedby, props.helperText ? `${id}-help` : undefined]
        .filter(Boolean)
        .join(" ") || undefined,
  );
const emit = defineEmits<{
  change: [value: string | number, event?: unknown];
  "update:modelValue": [value: string | number];
}>();
function select(next: string | number, event?: unknown) {
  if (props.disabled || props.readOnly || value.value === next) return;
  if (props.value === undefined && props.modelValue === undefined)
    local.value = next;
  emit("change", next, event);
  emit("update:modelValue", next);
}
const entries = shallowReactive(
  new Map<
    string,
    {
      value: { value: string | number | undefined };
      disabled: { value: boolean | undefined };
    }
  >(),
);
function register(id: string, value: any, disabled: any) {
  entries.set(id, { value, disabled });
  return () => {
    entries.delete(id);
  };
}
function tabStop(id: string) {
  const enabled = [...entries.entries()].filter(
    ([, entry]) => !entry.disabled.value,
  );
  return (
    (enabled.find(([, entry]) => entry.value.value === value.value) ??
      enabled[0])?.[0] === id
  );
}
provide<RadioContext>("minerva:radio", {
  value,
  disabled: computed(() => props.disabled),
  readOnly: computed(() => props.readOnly),
  name: computed(() => props.name ?? id),
  size: computed(() => props.size),
  color: computed(() => props.color),
  error: invalid,
  required: computed(() => props.required),
  describedBy: described,
  register,
  tabStop,
  select,
});
function keys(event: KeyboardEvent) {
  if (
    ![
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ].includes(event.key) ||
    props.disabled ||
    props.readOnly
  )
    return;
  const root = event.currentTarget as HTMLElement;
  const radios = Array.from(
    root.querySelectorAll<HTMLElement>('[role="radio"]'),
  ).filter((r) => r.getAttribute("aria-disabled") !== "true");
  const at = radios.indexOf(event.target as HTMLElement);
  let index =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? radios.length - 1
        : (at +
            (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) +
            radios.length) %
          radios.length;
  const target = radios[index];
  if (target) {
    event.preventDefault();
    target.focus();
    target.click();
  }
}
</script>
<template>
  <view
    class="mn-radio-group mn-uni-radio-group"
    :class="`mn-${direction}`"
    role="radiogroup"
    :id="props.id"
    :aria-label="props.ariaLabel ?? label"
    :aria-labelledby="
      props.ariaLabelledby ?? (label ? `${id}-label` : undefined)
    "
    :aria-describedby="described"
    :aria-required="props.required"
    :aria-invalid="invalid"
    :aria-disabled="props.disabled"
    @keydown="keys"
    ><input
      v-if="name && value != null"
      class="mn-uni-visually-hidden"
      :name="name"
      :value="value"
      :disabled="props.disabled"
      aria-hidden="true"
      :tabindex="-1"
    /><text v-if="label" :id="`${id}-label`" class="mn-title">{{ label }}</text
    ><view class="mn-radio-options" :class="`mn-${direction}`"
      ><Radio
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
        :disabled="option.disabled" /><slot /></view
    ><text
      v-if="helperText"
      :id="`${id}-help`"
      class="mn-choice-helper"
      :class="{ 'mn-error': invalid }"
      >{{ helperText }}</text
    ></view
  >
</template>
