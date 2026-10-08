<script setup lang="ts">
/** SelectItem: an option of a Select. */
import { computed, onMounted, shallowRef, useAttrs, watch } from "vue";
import styles from "@react-styles/components/Select/select.module.scss";
import { hooks } from "../../internal/hooks";
import { IconCheck } from "../../internal/icons";
import { useSelectContext } from "./context";
import type { SelectItemProps } from "./types";

defineOptions({ name: "SelectItem", inheritAttrs: false });

const props = withDefaults(defineProps<SelectItemProps>(), {
  disabled: false,
  textValue: undefined,
});

const slots = defineSlots<{
  /** Content of the option */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const ctx = useSelectContext("SelectItem");
const selected = computed(() => ctx.value.value === props.value);
const highlighted = computed(() => ctx.highlighted.value === props.value);

// Registers options the Select could not find in its slot (custom wrappers).
// (the text is read from the rendered label: slots are not called outside
// of the render)
const labelEl = shallowRef<HTMLElement | null>(null);
const register = () =>
  ctx.registerItem({
    value: props.value,
    disabled: props.disabled,
    text: props.textValue ?? labelEl.value?.textContent ?? "",
    label: () => slots.default?.(),
  });
onMounted(register);
watch(() => [props.value, props.disabled, props.textValue], register);

function onPointerMove() {
  if (!props.disabled && !highlighted.value) ctx.highlight(props.value);
}
function onClick() {
  if (!props.disabled) ctx.select(props.value);
}

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("option", "root", {
    selected: selected.value,
    highlighted: highlighted.value,
    disabled: props.disabled,
  }),
}));
</script>

<template>
  <!-- Keyboard selection is handled by the listbox (focus moves between
       options), so options need no key listener of their own. -->
  <div
    role="option"
    tabindex="-1"
    :aria-selected="selected"
    :aria-disabled="disabled || undefined"
    :data-value="value"
    :data-text-value="textValue"
    :class="styles.item"
    v-bind="rootAttrs"
    @pointermove="onPointerMove"
    @click="onClick"
  >
    <span
      ref="labelEl"
      :class="styles.itemText"
      v-bind="hooks('option', 'label')"
    >
      <slot />
    </span>
    <span
      v-if="selected"
      :class="styles.itemIndicator"
      aria-hidden="true"
      v-bind="hooks('option', 'indicator')"
    >
      <IconCheck />
    </span>
  </div>
</template>
