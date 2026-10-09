<script setup lang="ts">
import { computed, nextTick, ref, useSlots, type CSSProperties } from "vue";
import { inheritForm } from "./form-context";
import ProgressIndicator from "./ProgressIndicator.vue";
const rawProps = withDefaults(
  defineProps<{
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
    value?: string;
    id?: string;
    color?: "primary" | "success" | "info" | "warning" | "danger";
    size?: "small" | "medium" | "large";
    shape?: "round" | "square";
    variant?: "slider" | "segmented";
    label?: string;
    offLabel?: string;
    onLabel?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    labelPlacement?: "start" | "end" | "top" | "bottom";
    loading?: boolean;
    ripple?: boolean;
    trackStyle?: CSSProperties;
    thumbStyle?: CSSProperties;
    icon?: string;
    iconPlacement?: "start" | "end";
  }>(),
  {
    checked: undefined,
    size: "medium",
    color: "primary",
    shape: "round",
    variant: "slider",
    labelPlacement: "end",
    ripple: true,
    iconPlacement: "start",
  },
);
const props = inheritForm(rawProps),
  slots = useSlots();
const local = ref(props.defaultChecked ?? false),
  nativeRevision = ref(0);
const current = computed(() => props.checked ?? local.value),
  blocked = computed(() => props.disabled || props.readOnly || props.loading),
  bilateral = computed(
    () =>
      !!(props.offLabel || slots.offLabel) &&
      !!(props.onLabel || slots.onLabel),
  ),
  segmented = computed(() => props.variant === "segmented" && bilateral.value);
const emit = defineEmits<{
  "update:checked": [checked: boolean];
  change: [checked: boolean, event?: unknown];
  focus: [event: unknown];
  blur: [event: unknown];
}>();
function change(value: boolean, event?: unknown) {
  if (blocked.value || value === current.value) return;
  if (props.checked === undefined) local.value = value;
  emit("update:checked", value);
  emit("change", value, event);
}
async function onChange(event: unknown) {
  const value = (event as { detail?: { value?: unknown } } | null)?.detail
    ?.value;
  if (typeof value !== "boolean") return;
  change(value, event);
  await nextTick();
  if (current.value !== value) nativeRevision.value++;
}
</script>
<template>
  <view
    class="mn-uni-switch"
    :class="[
      `mn-switch-${size}`,
      `mn-switch-${shape}`,
      `mn-switch-${color}`,
      `mn-switch-label-${labelPlacement}`,
      {
        'mn-switch-checked': current,
        'mn-disabled': blocked,
        'mn-switch-segmented': segmented,
      },
    ]"
    :role="segmented ? 'group' : undefined"
    :aria-label="segmented ? props.ariaLabel : undefined"
    :aria-labelledby="segmented ? props.ariaLabelledby : undefined"
    :aria-describedby="segmented ? props.ariaDescribedby : undefined"
    :style="{ '--mn-switch-tone': `var(--${color}-color)` }"
  >
    <template v-if="segmented"
      ><switch
        v-if="name"
        class="mn-uni-visually-hidden"
        :name="name"
        :value="value"
        :checked="current"
        :disabled="props.disabled"
        aria-hidden="true"
        :tabindex="-1"
      /><button
        v-for="state in [false, true]"
        :key="String(state)"
        class="mn-switch-segment"
        :class="{ 'mn-switch-segment-active': current === state }"
        :disabled="blocked"
        :aria-pressed="current === state"
        @tap="change(state, $event)"
      >
        <slot :name="state ? 'onLabel' : 'offLabel'">{{
          state ? onLabel : offLabel
        }}</slot>
      </button></template
    >
    <template v-else
      ><button
        v-if="bilateral"
        class="mn-switch-side"
        :class="{ 'mn-switch-side-active': !current }"
        :disabled="blocked"
        @tap="change(false, $event)"
      >
        <slot name="offLabel">{{ offLabel }}</slot></button
      ><view class="mn-switch-control"
        ><switch
          :key="nativeRevision"
          class="mn-switch mn-switch-native"
          role="switch"
          :id="id"
          :checked="current"
          :aria-checked="current"
          :aria-label="props.ariaLabel ?? label"
          :aria-labelledby="props.ariaLabelledby"
          :aria-describedby="props.ariaDescribedby"
          :aria-disabled="blocked"
          :aria-readonly="props.readOnly"
          :disabled="blocked"
          :name="name"
          :value="value"
          :color="color"
          data-minerva="switch"
          data-part="root"
          @change="onChange"
          @keydown.space.prevent="change(!current, $event)"
          @keydown.enter.prevent="change(!current, $event)"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        /><view
          data-switch-track
          class="mn-switch-track"
          :style="trackStyle"
          aria-hidden="true"
          :hover-class="ripple && !blocked ? 'mn-switch-ripple' : 'none'"
          ><view data-switch-thumb class="mn-switch-thumb" :style="thumbStyle"
            ><ProgressIndicator v-if="loading" size="xsmall" /><slot
              v-else-if="iconPlacement === 'start'"
              name="icon"
              >{{ icon }}</slot
            ></view
          ></view
        ></view
      ><button
        v-if="bilateral"
        class="mn-switch-side"
        :class="{ 'mn-switch-side-active': current }"
        :disabled="blocked"
        @tap="change(true, $event)"
      >
        <slot name="onLabel">{{ onLabel }}</slot></button
      ><view
        v-else-if="label || $slots.default"
        class="mn-switch-label"
        @tap="change(!current, $event)"
        >{{ label }}<slot v-if="!label" /></view
      ><slot v-if="iconPlacement === 'end'" name="icon"
        ><text>{{ icon }}</text></slot
      ></template
    >
  </view>
</template>
