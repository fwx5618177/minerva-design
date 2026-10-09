<script setup lang="ts">
import { h5Host, nativeAttribute } from "./host";
import { ref, computed, getCurrentInstance } from "vue";
import Tooltip from "./Tooltip.vue";
import MenuInline from "./MenuInline.vue";
import ProgressIndicator from "./ProgressIndicator.vue";
import { useI18n } from "./i18n";
defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    label?: string;
    ariaLabel?: string;
    disabled?: boolean;
    loading?: boolean;
    variant?: "ghost" | "solid" | "outline";
    size?: "xsmall" | "small" | "medium" | "large";
    shape?: "circle" | "square";
    color?: string;
    icon?: string;
    pressed?: boolean;
    defaultPressed?: boolean;
    showTooltip?: boolean;
    tooltip?: {
      content?: string;
      color?: "neutral" | "info" | "success" | "warning" | "danger";
      variant?: "solid" | "subtle" | "glass";
      shape?: "default" | "rounded" | "thought" | "square";
      arrow?: boolean;
    };
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "ghost",
    size: "medium",
    shape: "circle",
    color: "neutral",
    pressed: undefined,
    defaultPressed: undefined,
    showTooltip: undefined,
    type: "button",
  },
);
const emit = defineEmits<{
  click: [event: Event];
  pressedChange: [pressed: boolean];
  "update:pressed": [pressed: boolean];
}>();
const { t } = useI18n();
const instance = getCurrentInstance();
const local = ref(props.defaultPressed ?? false),
  current = computed(() => props.pressed ?? local.value),
  toggle = computed(
    () =>
      props.pressed !== undefined ||
      props.defaultPressed !== undefined ||
      !!instance?.vnode.props?.onPressedChange,
  );
const tooltip = computed(() => props.showTooltip ?? !!props.label);
const element = ref<any>();
function click(event: Event) {
  if (props.disabled || props.loading) {
    event.preventDefault?.();
    return;
  }
  if (toggle.value) {
    const next = !current.value;
    if (props.pressed === undefined) local.value = next;
    emit("pressedChange", next);
    emit("update:pressed", next);
  }
  emit("click", event);
}
defineExpose({ element });
</script>
<template>
  <!-- #ifdef H5 -->
  <template v-if="h5Host">
    <component
      class="mn-uni-icon-root"
      :is="tooltip ? Tooltip : MenuInline"
      v-bind="
        tooltip
          ? {
              ...props.tooltip,
              content: props.tooltip?.content ?? label,
              disabled,
            }
          : {}
      "
      ><button
        v-bind="$attrs"
        ref="element"
        class="mn-button mn-icon-button mn-uni-icon-button"
        :class="[
          `mn-icon-${size}`,
          `mn-icon-${shape}`,
          `mn-icon-${color}`,
          `mn-icon-${variant}`,
          {
            'mn-icon-pressed': toggle && current,
            'mn-disabled': disabled || loading,
          },
        ]"
        :style="{
          '--mn-icon-tone':
            color === 'neutral' ? 'var(--text-color)' : `var(--${color}-color)`,
        }"
        :aria-label="label ?? ariaLabel ?? t('iconButton.default')"
        :aria-pressed="toggle ? current : undefined"
        :aria-busy="loading || undefined"
        :aria-disabled="disabled || loading || undefined"
        :disabled="disabled"
        :tabindex="disabled ? -1 : undefined"
        :form-type="!loading && type !== 'button' ? type : undefined"
        @tap="click"
      >
        <ProgressIndicator v-if="loading" size="small" /><slot
          v-else
          name="icon"
          ><text v-if="icon">{{ icon }}</text
          ><slot v-else
        /></slot></button
    ></component>
  </template>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <template v-if="!h5Host">
    <Tooltip
      :disabled="!tooltip || disabled"
      class="mn-uni-icon-root"
      v-bind="
        tooltip
          ? {
              ...props.tooltip,
              content: props.tooltip?.content ?? label,
              disabled: !tooltip || disabled,
            }
          : {}
      "
      ><button
        :id="nativeAttribute($attrs['id'])"
        :role="nativeAttribute($attrs['role'])"
        :aria-labelledby="nativeAttribute($attrs['aria-labelledby'])"
        :aria-describedby="nativeAttribute($attrs['aria-describedby'])"
        :data-testid="nativeAttribute($attrs['data-testid'])"
        ref="element"
        class="mn-button mn-icon-button mn-uni-icon-button"
        :class="[
          `mn-icon-${size}`,
          `mn-icon-${shape}`,
          `mn-icon-${color}`,
          `mn-icon-${variant}`,
          {
            'mn-icon-pressed': toggle && current,
            'mn-disabled': disabled || loading,
          },
        ]"
        :style="{
          '--mn-icon-tone':
            color === 'neutral' ? 'var(--text-color)' : `var(--${color}-color)`,
        }"
        :aria-label="label ?? ariaLabel ?? t('iconButton.default')"
        :aria-pressed="toggle ? current : undefined"
        :aria-busy="loading || undefined"
        :aria-disabled="disabled || loading || undefined"
        :disabled="disabled"
        :tabindex="disabled ? -1 : undefined"
        :form-type="!loading && type !== 'button' ? type : undefined"
        @tap="click"
      >
        <ProgressIndicator v-if="loading" size="small" /><slot
          v-else
          name="icon"
          ><text v-if="icon">{{ icon }}</text
          ><slot v-else
        /></slot></button
    ></Tooltip>
  </template>
  <!-- #endif -->
</template>
