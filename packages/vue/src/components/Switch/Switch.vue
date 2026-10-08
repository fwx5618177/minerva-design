<script setup lang="ts">
/**
 * Switch: toggles between two mutually exclusive states. Renders a native
 * checkbox with role="switch". `v-model` (or `defaultChecked`); emits
 * `change(checked, event)`. `offLabel` + `onLabel` add clickable labels on
 * both sides of the slider, or build a two-segment control with
 * `variant="segmented"`.
 */
import { computed, onBeforeUnmount, ref, useAttrs } from "vue";
import styles from "@react-styles/components/Switch/switch.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import {
  useFormControlContext,
  useFormControlProps,
} from "../../internal/form-control";
import { splitRootAttrs } from "../Checkbox/attrs";
import type { SwitchProps } from "./types";

defineOptions({ name: "Switch", inheritAttrs: false });

const RIPPLE_DURATION = 400;

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: undefined,
  defaultChecked: undefined,
  disabled: undefined,
  size: "medium",
  color: "primary",
  shape: "round",
  variant: "slider",
  label: undefined,
  offLabel: undefined,
  onLabel: undefined,
  name: undefined,
  id: undefined,
  value: undefined,
  labelPlacement: "end",
  loading: false,
  ripple: true,
  trackStyle: undefined,
  thumbStyle: undefined,
  iconPlacement: "start",
});
const emit = defineEmits<{
  "update:modelValue": [checked: boolean];
  /** The user toggled the switch: the new state and the change event */
  change: [checked: boolean, event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();
const slots = defineSlots<{
  /** Label content (alternative to the `label` prop / slot) */
  default?: () => unknown;
  /** Label content (the `label` prop) */
  label?: () => unknown;
  /** Custom icon (inside the thumb or after the switch: `iconPlacement`) */
  icon?: () => unknown;
  /** Label of the "off" state (the `offLabel` prop) */
  "off-label"?: () => unknown;
  /** Label of the "on" state (the `onLabel` prop) */
  "on-label"?: () => unknown;
}>();

const attrs = useAttrs();
const inputRef = ref<HTMLInputElement | null>(null);
const rippleActive = ref(false);
let rippleTimer: ReturnType<typeof setTimeout> | undefined;
onBeforeUnmount(() => clearTimeout(rippleTimer));

const checked = useControllable<boolean>(props, "modelValue", {
  defaultProp: "defaultChecked",
  fallback: false,
  name: "Switch",
});

// FormControl wiring; an explicit `disabled` wins (so `false` opts out).
const fc = useFormControlContext();
const field = useFormControlProps(() => ({
  id: props.id,
  "aria-describedby": attrs["aria-describedby"] as string | undefined,
}));
const isDisabled = computed(
  () => props.disabled ?? fc?.disabled.value ?? false,
);
const readOnly = computed(() => !!fc?.readOnly.value);
const blocked = computed(
  () => isDisabled.value || props.loading || readOnly.value,
);

function onChange(event: Event) {
  const input = event.target as HTMLInputElement;
  /* v8 ignore next */
  if (blocked.value) return;
  const next = input.checked;
  checked.value = next;
  emit("change", next, event);
  // A controlled state wins: the DOM follows the prop, not the click.
  input.checked = checked.value;
}

// Native checkboxes toggle on Space only; the switch pattern also allows Enter.
function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "Enter") return;
  event.preventDefault();
  if (blocked.value) return;
  (event.currentTarget as HTMLInputElement).click();
}

// Clicks reach the input also when the wrapping label is clicked, and the
// Space key fires a click too: the ripple follows every toggle.
function onClick(event: MouseEvent) {
  if (readOnly.value) {
    event.preventDefault();
    return;
  }
  if (!props.ripple || blocked.value) return;
  clearTimeout(rippleTimer);
  rippleActive.value = true;
  rippleTimer = setTimeout(() => {
    rippleActive.value = false;
  }, RIPPLE_DURATION);
}

// Side labels / segments set a state directly: they click the input so the
// regular change event fires.
function setState(next: boolean) {
  if (blocked.value || next === checked.value) return;
  inputRef.value?.click();
}

const hasOff = computed(() => !!props.offLabel || !!slots["off-label"]);
const hasOn = computed(() => !!props.onLabel || !!slots["on-label"]);
const bilateral = computed(() => hasOff.value && hasOn.value);
const segmented = computed(
  () => props.variant === "segmented" && bilateral.value,
);
const hasLabel = computed(
  () => !!props.label || !!slots.label || !!slots.default,
);
const labelFirst = computed(
  () => props.labelPlacement === "start" || props.labelPlacement === "top",
);

const split = computed(() => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": _describedBy,
    ...rest
  } = attrs;
  return {
    ...splitRootAttrs(rest),
    ariaLabel: ariaLabel as string | undefined,
    ariaLabelledBy: ariaLabelledBy as string | undefined,
  };
});

const inputAttrs = computed(() => {
  const seg = segmented.value;
  const wired = field.value;
  return {
    ...split.value.control,
    type: "checkbox",
    role: seg ? undefined : "switch",
    class: seg ? styles.hiddenInput : undefined,
    id: seg ? undefined : wired.id,
    name: props.name,
    value: props.value,
    "aria-label": seg ? undefined : split.value.ariaLabel,
    "aria-labelledby": seg ? undefined : split.value.ariaLabelledBy,
    "aria-checked": seg ? undefined : checked.value,
    "aria-disabled": seg
      ? undefined
      : isDisabled.value || props.loading || undefined,
    "aria-busy": props.loading || undefined,
    "aria-invalid": seg ? undefined : wired["aria-invalid"],
    "aria-required": seg ? undefined : wired["aria-required"],
    "aria-readonly": seg ? undefined : wired["aria-readonly"],
    "aria-describedby": seg ? undefined : wired["aria-describedby"],
    "aria-hidden": seg || undefined,
    tabindex: seg ? -1 : undefined,
    checked: checked.value,
    disabled: isDisabled.value || props.loading,
    ...hooks("switch", "input"),
  };
});

const rootHooks = computed(() =>
  hooks("switch", "root", {
    state: checked.value ? "checked" : "unchecked",
    disabled: isDisabled.value,
    loading: props.loading,
    invalid: !!fc?.invalid.value,
    readonly: readOnly.value,
    required: !!fc?.required.value,
    size: props.size,
    color: props.color,
    shape: props.shape,
    variant: segmented.value ? "segmented" : "slider",
  }),
);

const placementClass = {
  start: styles.labelStart,
  end: styles.labelEnd,
  top: styles.labelTop,
  bottom: styles.labelBottom,
} as const;

const switchClasses = computed(() => [
  styles.switch,
  styles[props.size],
  !bilateral.value && placementClass[props.labelPlacement],
  styles[props.color],
  {
    [styles.checked]: checked.value,
    [styles.checkedLarge]: checked.value && props.size === "large",
    [styles.disabled]: isDisabled.value,
    [styles.loading]: props.loading,
    [styles.square]: props.shape === "square",
    [styles.ripple]: props.ripple && rippleActive.value,
    [styles.bilateral]: bilateral.value,
  },
]);

const groupAttrs = computed(() => ({
  role: "group",
  id: field.value.id,
  "aria-label": split.value.ariaLabel,
  "aria-labelledby":
    split.value.ariaLabelledBy ??
    (fc && !split.value.ariaLabel ? fc.labelId.value : undefined),
  "aria-describedby": field.value["aria-describedby"],
  "aria-disabled": blocked.value || undefined,
  ...split.value.root,
  ...rootHooks.value,
}));
</script>

<template>
  <!--
    Segmented: the group carries the field wiring (its name and description);
    aria-invalid / aria-required are exposed by the data-* hooks.
  -->
  <span
    v-if="segmented"
    :class="[
      styles.segmented,
      styles[size],
      styles[color],
      blocked && styles.disabled,
    ]"
    v-bind="groupAttrs"
  >
    <input
      ref="inputRef"
      v-bind="inputAttrs"
      @change="onChange"
      @click="onClick"
      @keydown="onKeyDown"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <button
      v-for="segmentState in [false, true]"
      :key="String(segmentState)"
      type="button"
      :class="[
        styles.segment,
        checked === segmentState && styles.segmentActive,
      ]"
      :disabled="blocked"
      :aria-pressed="checked === segmentState"
      v-bind="hooks('switch', 'segment')"
      @click="setState(segmentState)"
    >
      <slot v-if="segmentState" name="on-label">{{ onLabel }}</slot>
      <slot v-else name="off-label">{{ offLabel }}</slot>
    </button>
  </span>
  <!-- A <span> root: the side buttons must not sit inside the input's label. -->
  <component
    :is="bilateral ? 'span' : 'label'"
    v-else
    :class="switchClasses"
    v-bind="{ ...split.root, ...rootHooks }"
  >
    <button
      v-if="bilateral"
      type="button"
      :class="[styles.side, !checked && styles.sideActive]"
      :disabled="blocked"
      v-bind="hooks('switch', 'side')"
      @click="setState(false)"
    >
      <slot name="off-label">{{ offLabel }}</slot>
    </button>
    <span
      v-if="!bilateral && labelFirst && hasLabel"
      :class="styles.label"
      v-bind="hooks('switch', 'label')"
    >
      <slot name="label">
        <template v-if="label">{{ label }}</template>
        <slot v-else />
      </slot>
    </span>
    <span :class="styles.switchBase" v-bind="hooks('switch', 'control')">
      <input
        ref="inputRef"
        v-bind="inputAttrs"
        @change="onChange"
        @click="onClick"
        @keydown="onKeyDown"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      <span
        :class="styles.track"
        :style="trackStyle"
        v-bind="hooks('switch', 'track')"
      />
      <span
        :class="styles.thumb"
        :style="thumbStyle"
        v-bind="hooks('switch', 'thumb')"
      >
        <span
          v-if="iconPlacement === 'start' && slots.icon"
          :class="styles.icon"
          v-bind="hooks('switch', 'icon')"
        >
          <slot name="icon" />
        </span>
      </span>
      <span v-if="ripple" :class="styles.rippleEffect" />
    </span>
    <button
      v-if="bilateral"
      type="button"
      :class="[styles.side, checked && styles.sideActive]"
      :disabled="blocked"
      v-bind="hooks('switch', 'side')"
      @click="setState(true)"
    >
      <slot name="on-label">{{ onLabel }}</slot>
    </button>
    <span
      v-if="iconPlacement === 'end' && slots.icon"
      :class="styles.icon"
      v-bind="hooks('switch', 'icon')"
    >
      <slot name="icon" />
    </span>
    <span
      v-if="!bilateral && !labelFirst && hasLabel"
      :class="styles.label"
      v-bind="hooks('switch', 'label')"
    >
      <slot name="label">
        <template v-if="label">{{ label }}</template>
        <slot v-else />
      </slot>
    </span>
  </component>
</template>
